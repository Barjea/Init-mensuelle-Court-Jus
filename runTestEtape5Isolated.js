/**
 * Test isolé de l'Étape 5 : Importation des questions (contournement manuel).
 * Simule le contexte après les étapes 1, 2, 3 et 4 réussies.
 * NÉCESSITE QUE LA FEUILLE 'Config' SOIT VALIDE (pour charger les produits et le lien Ref Form).
 */
function runTestEtape5Isolated() {
    const ui = SpreadsheetApp.getUi();
    
    // ----------------------------------------------------
    // --- CONTEXTE ISOLÉ (À METTRE À JOUR À CHAQUE TEST) --
    // ----------------------------------------------------
    
    // ID du Formulaire de COMMANDE créé lors de la dernière exécution réussie
    const NOUVEL_FORM_ID = "1mnTtLVPoCketJLcDc-iXAB1xlaWP3lSxdRc1--dijbU" ;

    // ----------------------------------------------------
    
    try {
        Logger.log("--- DÉBUT DU TEST ISOLÉ ÉTAPE 5 ---");
        
        // 0. INITIALISATION : Lit la configuration pour récupérer la liste des produits et le Formulaire de Référence
        readConfig(); 
        validateConfig(); 
        const data = GLOBAL_DATA; 
        
        // 1. Ouvrir le Formulaire de COMMANDE (cible) et le Formulaire de RÉFÉRENCE
        const newFormLocal = FormApp.openById(NOUVEL_FORM_ID);
        Logger.log(`[INIT OK] Formulaire cible ouvert : ${newFormLocal.getTitle()}`);

        const referenceForm = FormApp.openByUrl(data.linkRefForm);
        
        // 2. Préparer les données pour l'importation
        const nomsProduitsACommander = new Set(data.produitsData.map(row => row[0].toString().trim().toUpperCase()));
        
        const referenceItemData = referenceForm.getItems().map(item => ({
            id: item.getId(),
            title: item.getTitle().toString().trim().toUpperCase()
        }));

        // 3. Déterminer l'index d'insertion
        const newFormItems = newFormLocal.getItems();
        let insertionIndex = newFormItems.length; // Par défaut à la fin

        // Recherche de l'index juste avant la Section 3 (le 2e PAGE_BREAK)
        let pageBreakCount = 0;
        for (let j = 0; j < newFormItems.length; j++) {
            if (newFormItems[j].getType() === FormApp.ItemType.PAGE_BREAK) {
                pageBreakCount++;
                if (pageBreakCount === 2) { 
                    insertionIndex = j;
                    Logger.log(`[INFO] Index d'insertion trouvé (juste avant Section 3) : ${insertionIndex}`);
                    break;
                }
            }
        }
        
        let questionsImportees = 0; // Compteur pour les questions insérées
        let matchesFound = 0;       // Compteur pour les correspondances trouvées
        
        // 4. BOUCLE DE RECONSTRUCTION MANUELLE
        for (const refData of referenceItemData) {
            const titreQuestion = refData.title;
            
            Logger.log(`[DEBUG IMPT] Titre Normalisé: ${titreQuestion} | Match: ${nomsProduitsACommander.has(titreQuestion)} | Index: ${insertionIndex}`);

            if (nomsProduitsACommander.has(titreQuestion)) { 
                
                const freshItemRef = referenceForm.getItemById(refData.id);
                const itemType = freshItemRef.getType();

                let newItem;
                
                // --- LOGIQUE SWITCH CRITIQUE : Cast et Copie des propriétés internes ---
                try {
                    switch (itemType) {
                        case FormApp.ItemType.MULTIPLE_CHOICE:
                            const refMultiChoice = freshItemRef.asMultipleChoiceItem();
                            newItem = newFormLocal.addMultipleChoiceItem();
                            newItem.setChoices(refMultiChoice.getChoices()); 
                            newItem.setTitle(refMultiChoice.getTitle());
                            newItem.setHelpText(refMultiChoice.getHelpText());
                            newItem.setRequired(refMultiChoice.isRequired());
                            break;
                            
                        case FormApp.ItemType.LIST:
                            const refList = freshItemRef.asListItem();
                            newItem = newFormLocal.addListItem();
                            newItem.setChoices(refList.getChoices()); 
                            newItem.setTitle(refList.getTitle());
                            newItem.setHelpText(refList.getHelpText());
                            newItem.setRequired(refList.isRequired());
                            break;
                            
                        case FormApp.ItemType.CHECKBOX:
                            const refCheckbox = freshItemRef.asCheckboxItem();
                            newItem = newFormLocal.addCheckboxItem();
                            newItem.setChoices(refCheckbox.getChoices());
                            newItem.setTitle(refCheckbox.getTitle());
                            newItem.setHelpText(refCheckbox.getHelpText());
                            newItem.setRequired(refCheckbox.isRequired());
                            break;
                            
                        case FormApp.ItemType.TEXT: 
                            const refText = freshItemRef.asTextItem(); 
                            newItem = newFormLocal.addTextItem();
                            newItem.setTitle(refText.getTitle());
                            newItem.setHelpText(refText.getHelpText());
                            newItem.setRequired(refText.isRequired());
                            break;
                            
                        case FormApp.ItemType.PARAGRAPH_TEXT: 
                            const refParagraph = freshItemRef.asParagraphTextItem();
                            newItem = newFormLocal.addParagraphTextItem();
                            newItem.setTitle(refParagraph.getTitle());
                            newItem.setHelpText(refParagraph.getHelpText());
                            newItem.setRequired(refParagraph.isRequired());
                            break;
                            
                        case FormApp.ItemType.PAGE_BREAK:
                            continue; 
                            
                        default:
                            Logger.log(`[Etape 5] ATTENTION : Type de question non géré (${itemType}). Ignorée.`);
                            continue; 
                    }
                } catch (e) {
                    // *** CORRECTION DE L'ERREUR 't is not defined' : la variable d'erreur est 'e' ***
                    Logger.log(`[Etape 5] ERREUR FATALE DE CASTING pour l'item ${titreQuestion} de type ${itemType}: ${e.message}`);
                    throw new Error(`Erreur lors de la reconstruction de la question ${titreQuestion}. Cause: ${e.message}`);
                }
                // --- FIN LOGIQUE SWITCH ---
                
                if (newItem) {
                    // CORRECTION DE moveItem: Utiliser l'objet générique via son index de création
                    
                    // 1. Récupérer l'index où l'objet a été créé (la fin du formulaire)
                    const indexFinalActuel = newFormLocal.getItems().length - 1; 

                    // 2. Récupérer l'objet générique FormApp.Item à cet index
                    const itemGeneric = newFormLocal.getItems()[indexFinalActuel];
                    
                    // 3. Déplacer l'élément générique à la position correcte
                    newFormLocal.moveItem(itemGeneric, insertionIndex);
                    
                    questionsImportees++;
                    matchesFound++; // INCÉMENTER LE COMPTEUR DE MATCHES
                    insertionIndex++; // Incrémenter l'index pour que les questions se suivent

                    // NOUVEAU : Sortir de la boucle si tous les produits ont été trouvés
                    if (matchesFound === nomsProduitsACommander.size) {
                        Logger.log(`[Etape 5] TOUS les ${matchesFound} produits requis ont été importés. Arrêt de la recherche.`);
                        break; // Sortie de la boucle for
                    }
                }
            }
        } // Fin de la boucle for
        
        // ----------------------------------------------------
        // 5. SUPPRESSION DE LA QUESTION MODÈLE (à l'index 2)
        // ----------------------------------------------------

        const INDEX_QUESTION_MODELE_A_SUPPRIMER = 2; 

        try {
            const items = newFormLocal.getItems();
            
            if (items.length > INDEX_QUESTION_MODELE_A_SUPPRIMER) {
                const itemToDelete = items[INDEX_QUESTION_MODELE_A_SUPPRIMER];
                
                if (itemToDelete && itemToDelete.getType() !== FormApp.ItemType.PAGE_BREAK) {
                    newFormLocal.deleteItem(INDEX_QUESTION_MODELE_A_SUPPRIMER);
                    Logger.log(`[Etape 5] Question modèle (ancien index ${INDEX_QUESTION_MODELE_A_SUPPRIMER}) supprimée avec succès.`);
                } else {
                    Logger.log(`[Etape 5] Avertissement : Élément à l'index ${INDEX_QUESTION_MODELE_A_SUPPRIMER} n'est pas la question modèle attendue. Suppression annulée.`);
                }
            } else {
                Logger.log(`[Etape 5] Avertissement : Le formulaire est trop court pour contenir la question modèle à l'index 2. Suppression annulée.`);
            }
        } catch (e) {
            Logger.log(`[Etape 5] ERREUR lors de la suppression de la question modèle à l'index ${INDEX_QUESTION_MODELE_A_SUPPRIMER}: ${e.message}`);
        }
        
        // 6. Résultat
        Logger.log(`--- FIN DU TEST ISOLÉ ÉTAPE 5 ---`);
        ui.alert('Test Étape 5 Terminé', 
                 `✅ ${questionsImportees} questions ont été copiées manuellement dans le Formulaire et le modèle a été supprimé.`, 
                 ui.ButtonSet.OK);

    } catch (error) {
        ui.alert('Erreur Critique', `Échec du test isolé : ${error.message}`, ui.ButtonSet.OK);
        Logger.log(`--- ÉCHEC DU TEST ISOLÉ ---`);
        Logger.log(error);
    }
}

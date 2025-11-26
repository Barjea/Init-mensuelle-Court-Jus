/**
 * Fichier : Code.js
 * Rôle : Exécuter l'automatisation en étapes : copie, renommage, déplacement, liaison et mise à jour par importation.
 */

// Nécessite l'objet GLOBAL_DATA et les fonctions de Init.js.

// --- 1. COPIE DU FICHIER MODÈLE (Sheet + Form) ---
function etape_1_copierFichiers() {
    const data = GLOBAL_DATA;
    Logger.log("Étape 1 : Copie du Sheet Modèle et liaison du Formulaire.");

    let sheetModele = DriveApp.getFileById(data.idSheetModele);
    let newSheetFile = sheetModele.makeCopy(data.nouveauNomFichier);

    const newSheetId = newSheetFile.getId();
    const newSheet = SpreadsheetApp.openById(newSheetId);
    
    const newFormUrl = newSheet.getFormUrl();

    if (!newFormUrl) {
      throw new Error("Le Google Sheet copié n'est pas lié à un Formulaire. Vérifiez le Modèle.");
    }

    const newFormId = extractIdFromUrl(newFormUrl);
    const newForm = FormApp.openById(newFormId);
    const newFormFile = DriveApp.getFileById(newFormId);
    
    // Stocker les IDs des nouveaux fichiers pour les étapes suivantes
    data.newSheetFile = newSheetFile;
    data.newFormFile = newFormFile;
    data.newSheet = newSheet;
    data.newForm = newForm;

    Logger.log(`[OK] Nouveau Sheet ID: ${newSheetId}`);
    Logger.log(`[OK] Nouveau Form ID: ${newFormId}`);
    
    return true; 
}

// --- 2. RENOMMAGE (Form est renommé dans l'étape 1 et 2) ---
function etape_2_renommerFormulaire() {
    const data = GLOBAL_DATA;
    Logger.log("Étape 2 : Renommage du Formulaire copié.");

    // Le Sheet a déjà été renommé lors de la copie à l'étape 1.
    // On renomme explicitement le Formulaire.
    data.newFormFile.setName(data.nouveauNomFichier);

    Logger.log(`[OK] Formulaire renommé : ${data.nouveauNomFichier}`);
    return true;
}

// --- 3. DÉPLACEMENT VERS LE DOSSIER CIBLE ---
function etape_3_deplacerFichiers() {
    const data = GLOBAL_DATA;
    Logger.log("Étape 3 : Déplacement des fichiers vers le dossier cible.");

    const dossierCible = DriveApp.getFolderById(data.idDossierCible);
    
    // Déplacer les fichiers
    dossierCible.addFile(data.newSheetFile);
    dossierCible.addFile(data.newFormFile);
    
    Logger.log(`[OK] Fichiers déplacés dans le dossier ID: ${data.idDossierCible}`);
    return true;
}

// Code.js - Version corrigée et finale de etape_4_miseAJourFormulaire
// Code.js - Version corrigée et finale de etape_4_miseAJourFormulaire
// Code.js - Version corrigée FINALE de etape_4_miseAJourFormulaire
// Code.js - Version Corrigée Définitive de etape_4_miseAJourFormulaire
function etape_4_miseAJourFormulaire() {
    const data = GLOBAL_DATA;
    Logger.log("Étape 4 : Mise à jour du Titre et de la Description du Formulaire par templating.");

    // Formats des dates
    const dateLimiteFormatee = formatDate(data.dateLimiteCommande);
    const dateLivraisonFormatee = formatDate(data.dateLivraison);
    
    // --- 1. MISE À JOUR DU TITRE GLOBAL DU FORMULAIRE (pour {{DATE_LIVRAISON}}) ---
    try {
        // 1. Lire le Titre Global du Formulaire (doit contenir la balise)
        let titleModele = data.newForm.getTitle().toString();
        Logger.log(`[DEBUG 4] Titre Global Modèle lu : ${titleModele}`);
        
        if (titleModele.includes('{{DATE_LIVRAISON}}')) {
            // 2. Remplacer la balise par la date formatée
            let nouveauTitre = titleModele.replace('{{DATE_LIVRAISON}}', dateLivraisonFormatee);
            // 3. Réécrire le Titre Global
            data.newForm.setTitle(nouveauTitre);
            Logger.log(`[DEBUG 4] Nouveau Titre Global calculé : ${nouveauTitre}`);
            Logger.log("[OK] Titre Global du Formulaire mis à jour.");
        } else {
            Logger.log("[DEBUG 4] Le tag {{DATE_LIVRAISON}} n'a pas été trouvé dans le Titre Global. (Pas de modification)");
        }
    } catch (e) {
        Logger.log(`[AVERTISSEMENT] Impossible de mettre à jour le Titre Global : ${e.message}.`);
    }

    // --- 2. MISE À JOUR DE LA DESCRIPTION GLOBALE (pour {{DATE_LIMITE}}) ---
    // Cette partie fonctionne et est conservée
    try {
        let descriptionModele = data.newForm.getDescription(); 
        let nouvelleDescription = descriptionModele;

        // Remplacement du tag de la date limite
        nouvelleDescription = nouvelleDescription.replace('{{DATE_LIMITE}}', dateLimiteFormatee);
        
        // Remplacement du tag de la date de livraison (en sécurité)
        nouvelleDescription = nouvelleDescription.replace('{{DATE_LIVRAISON}}', dateLivraisonFormatee);

        data.newForm.setDescription(nouvelleDescription); 
        Logger.log("[OK] Description globale mise à jour.");
    } catch (e) {
        Logger.log(`[AVERTISSEMENT] Impossible de mettre à jour la Description : ${e.message}.`);
    }

    Logger.log("[OK] Templating des métadonnées terminé.");
    return true;
}
// --- FONCTIONS UTILITAIRES POUR L'Étape 5 ---

/**
 * Met la première lettre d'une chaîne en majuscule.
 */
function capitalize(s) {
    if (typeof s !== 'string' || s.length === 0) return s;
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

/**
 * Cherche les informations complètes d'un produit dans les données globales.
 * @param {string} normalizedTitle Le nom du produit normalisé (ex: "ORANGES").
 * @param {Array<Array<any>>} produitsData L'array contenant toutes les lignes de produits.
 * @returns {Array<any>|null} La ligne de données complète du produit.
 */
function getProductInfo(normalizedTitle, produitsData) {
    // Les données de produits sont : [Nom(0), Conditionnement Type(1), Quantité(2), Prix unitaire(3)]
    for (const row of produitsData) {
        // row[0] est le Nom du produit
        if (row[0].toString().trim().toUpperCase() === normalizedTitle) {
            return row;
        }
    }
    return null;
}
// --- 5. CLONAGE SÉMANTIQUE ET PERSONNALISATION DES QUESTIONS ---

function etape_5_importerQuestions() {
    const data = GLOBAL_DATA;
    Logger.log("Étape 5 : Clonage sémantique des questions de produit et personnalisation.");
    
    const newFormLocal = data.newForm;
    const referenceForm = FormApp.openByUrl(data.linkRefForm);

    // 1. Préparer les données (inchangé)
    const nomsProduitsACommander = new Set(data.produitsData.map(row => row[0].toString().trim().toUpperCase()));
    const referenceItemData = referenceForm.getItems().map(item => ({
        id: item.getId(),
        title: item.getTitle().toString().trim().toUpperCase()
    }));

    // 2. Déterminer l'index d'insertion (inchangé)
    const newFormItems = newFormLocal.getItems();
    let insertionIndex = newFormItems.length; 

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
    
    let questionsImportees = 0; 
    let matchesFound = 0;       
    
    // 3. BOUCLE DE CLONAGE SÉMANTIQUE (boucle principale inchangée)
    for (const refData of referenceItemData) {
        const titreQuestion = refData.title;

        if (nomsProduitsACommander.has(titreQuestion)) { 
            
            const freshItemRef = referenceForm.getItemById(refData.id);
            const itemType = freshItemRef.getType();

            let newItem;
            
            // Logique de reconstruction (inchangée)
            try {
                switch (itemType) {
                    case FormApp.ItemType.TEXT: 
                        const refText = freshItemRef.asTextItem(); 
                        newItem = newFormLocal.addTextItem();
                        newItem.setTitle(refText.getTitle());
                        newItem.setRequired(refText.isRequired());
                        break;
                        
                    case FormApp.ItemType.PAGE_BREAK:
                        continue; 
                        
                    default:
                        Logger.log(`[Etape 5] ATTENTION : Type de question non géré (${itemType}). Ignorée.`);
                        continue; 
                }
            } catch (e) {
                Logger.log(`[Etape 5] ERREUR FATALE DE CASTING pour l'item ${titreQuestion} : ${e.message}`);
                throw new Error(`Erreur lors de la reconstruction de la question ${titreQuestion}.`);
            }
            
            if (newItem) {
                // PERSONNALISATION DU TEXTE D'AIDE (Conditionnement/Prix)
                const produitInfo = getProductInfo(titreQuestion, data.produitsData);
                
                if (produitInfo) {
                    
                    // --- CORRECTION DU BUG ---
                    // produitInfo[1] est le Conditionnement Type. On le convertit en chaîne, remplaçant null/undefined par "".
                    const rawTypeConditionnement = produitInfo[1];
                    const typeConditionnement = String(rawTypeConditionnement || ''); // Garantie d'avoir une chaîne
                    
                    const quantite = produitInfo[2];
                    const prix = produitInfo[3]; 

                    // On s'assure que .toLowerCase() n'est appelé que si la chaîne n'est pas vide
                    const suffixeConditionnement = typeConditionnement ? typeConditionnement.toLowerCase() : '';
                    
                    // Construction du texte d'aide : "Caisses de 12 kg à 24,00 €/caisse"
                    const nouveauHelpText = `${capitalize(typeConditionnement)} de ${quantite} à ${prix} €/${suffixeConditionnement}`;
                    
                    // --- FIN CORRECTION DU BUG ---
                    
                    newItem.setHelpText(nouveauHelpText);
                    Logger.log(`[CUSTOM OK] Question ${titreQuestion} personnalisée : ${nouveauHelpText}`);
                } else {
                    newItem.setHelpText("Conditionnement non disponible. Veuillez vérifier les logs.");
                    Logger.log(`[CUSTOM FAIL] Impossible de trouver les données pour le produit : ${titreQuestion}.`);
                }
                
                // Déplacement de l'élément (inchangé)
                const indexFinalActuel = newFormLocal.getItems().length - 1; 
                const itemGeneric = newFormLocal.getItems()[indexFinalActuel];
                newFormLocal.moveItem(itemGeneric, insertionIndex);
                
                questionsImportees++;
                matchesFound++; 
                insertionIndex++; 

                if (matchesFound === nomsProduitsACommander.size) {
                    break;
                }
            }
        }
    }
    
    // 4. SUPPRESSION DE LA QUESTION MODÈLE (inchangé)
    const INDEX_QUESTION_MODELE_A_SUPPRIMER = insertionIndex - questionsImportees; 

    try {
        const items = newFormLocal.getItems();
        
        if (items.length > INDEX_QUESTION_MODELE_A_SUPPRIMER) {
            const itemToDelete = items[INDEX_QUESTION_MODELE_A_SUPPRIMER];
            
            if (itemToDelete && itemToDelete.getTitle().toString().trim().toUpperCase().includes("ORANGES")) {
                newFormLocal.deleteItem(INDEX_QUESTION_MODELE_A_SUPPRIMER);
                Logger.log(`[Etape 5] Question modèle (ancien index ${INDEX_QUESTION_MODELE_A_SUPPRIMER}) supprimée avec succès.`);
            } else {
                Logger.log(`[Etape 5] Avertissement : Élément à l'index ${INDEX_QUESTION_MODELE_A_SUPPRIMER} n'est pas la question modèle attendue. Suppression annulée.`);
            }
        }
    } catch (e) {
        Logger.log(`[Etape 5] ERREUR lors de la suppression de la question modèle : ${e.message}`);
    }

    Logger.log("[OK] Clonage sémantique terminé.");
    return true;
}
// --- 6. RÉSUMÉ ET NETTOYAGE (Fonction runSetup principale) ---
function runSetup() {
    const ui = SpreadsheetApp.getUi();
    Logger.log("--- DÉBUT DE RUNSETUP : Automatisation Complète ---");
    
    try {
        // Lecture et validation de la config (dans Init.js)
        readConfig(); 
        validateConfig();
        const data = GLOBAL_DATA;
        
        ui.alert('Automatisation', `Création des fichiers : ${data.nouveauNomFichier}. Début de l'opération...`, ui.ButtonSet.OK);

        // Exécution séquentielle des étapes
        etape_1_copierFichiers();
        etape_2_renommerFormulaire();
        etape_3_deplacerFichiers();
        etape_4_miseAJourFormulaire();
        etape_5_importerQuestions();

        // Résultat final
        const urlSheet = data.newSheet.getUrl();
        const urlForm = data.newForm.getPublishedUrl();
        
        const successMessage = `
            ✅ **Opération terminée avec succès !**
            
            **Fichiers créés :** ${data.nouveauNomFichier}
            
            **Lien du nouveau Formulaire (à diffuser) :**
            ${urlForm}
            
            **Lien du nouveau Fichier Sheet (gestion) :**
            ${urlSheet}
        `;
        
        ui.alert('Succès de l\'Automatisation', successMessage, ui.ButtonSet.OK);
        Logger.log("--- FIN DE RUNSETUP ---");
        
    } catch (error) {
        ui.alert('Erreur Critique', `Échec du processus : ${error.message}`, ui.ButtonSet.OK);
        Logger.log(`--- ERREUR CRITIQUE DANS RUNSETUP ---`);
        Logger.log(error);
    }
}

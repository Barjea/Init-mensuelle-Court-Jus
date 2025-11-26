/**
 * Fichier : TestCode.js
 * Rôle : Exécuter et débuguer les étapes de Code.js de manière séquentielle et conditionnelle.
 */

// Nécessite les fonctions de Init.js (readConfig, validateConfig)
// et les fonctions d'étape de Code.js (etape_1_..., etape_5_...).

function runTestBlocSequentiel() {
    const ui = SpreadsheetApp.getUi();
    
    try {
        // 0. INITIALISATION et VALIDATION
        Logger.log("--- DÉBUT DU TEST SÉQUENTIEL ---");
        readConfig(); 
        validateConfig(); // Confirme que le test est configuré
        const data = GLOBAL_DATA; // Accès aux variables globales (IDs, Nom du fichier, etc.)
        
        ui.alert("Début des Tests", "La configuration est valide. Le test va procéder séquentiellement par blocs : 1-2-3, puis 4, puis 5.", ui.ButtonSet.OK);

        // --- BLOC 1 : CRÉATION DES FICHIERS (Étapes 1, 2, 3) ---
        // Ces étapes sont dépendantes et sont exécutées sans confirmation intermédiaire.
        
        // Étape 1 : COPIE ET LIEN
        etape_1_copierFichiers();
        Logger.log("[BLOC 1 OK] Étape 1 : Copie Sheet/Form et liaison réussies.");
        
        // Étape 2 : RENOMMAGE
        etape_2_renommerFormulaire();
        Logger.log("[BLOC 1 OK] Étape 2 : Renommage du Formulaire réussi.");

        // Étape 3 : DÉPLACEMENT
        etape_3_deplacerFichiers();
        Logger.log("[BLOC 1 OK] Étape 3 : Déplacement réussi.");

        ui.alert('Bloc 1 (Étapes 1-3) Terminé', 
                 `✅ Succès de la copie, du renommage, et du déplacement pour "${data.nouveauNomFichier}".\n\n` + 
                 `➡️ Veuillez vérifier manuellement que le nouveau Google Sheet et le nouveau Google Form sont dans le dossier cible.`, 
                 ui.ButtonSet.OK);
                 
        // --- BLOC 2 : MISE À JOUR MÉTADONNÉES (Étape 4) ---
        
        if (ui.alert("Poursuite du Test", "Voulez-vous tester l'Étape 4 (Mise à jour du Titre/Description du Formulaire) ? Confirmez après l'exécution.", ui.ButtonSet.YES_NO) === ui.Button.YES) {
            etape_4_miseAJourFormulaire();
            Logger.log("[BLOC 2 OK] Étape 4 : Mise à jour du Titre/Description réussie.");
            ui.alert("Succès Étape 4", "Titre et Description du Formulaire mis à jour. Vérifiez-les manuellement dans le nouveau Formulaire.", ui.ButtonSet.OK);
        } else {
            Logger.log("Test Étape 4 ignoré.");
        }

        // --- BLOC 3 : IMPORTATION QUESTIONS (Étape 5) ---
        
        if (ui.alert("Poursuite du Test", "Voulez-vous tester l'Étape 5 (Importation des questions des produits) ? C'est l'étape la plus critique.", ui.ButtonSet.YES_NO) === ui.Button.YES) {
            etape_5_importerQuestions();
            Logger.log("[BLOC 3 OK] Étape 5 : Importation des questions réussie.");
            ui.alert("Succès Étape 5", 
                     "Questions importées. \n\n" +
                     "➡️ Veuillez vérifier dans le nouveau Formulaire que les 4 questions sont présentes et insérées dans la **Section 2**.", 
                     ui.ButtonSet.OK);
        } else {
            Logger.log("Test Étape 5 ignoré.");
        }

        Logger.log("--- FIN DU TEST SÉQUENTIEL ---");
        ui.alert('Tests Séquentiels Terminés', "Si toutes les étapes ont réussi et que le nouveau Formulaire est parfait, vous pouvez lancer `runSetup()`.", ui.ButtonSet.OK);

    } catch (error) {
        // En cas d'erreur, le script s'arrête immédiatement et affiche l'erreur
        ui.alert('Erreur Critique', `Échec du processus à l'une des étapes. Le processus a été interrompu. Détails : ${error.message}.`, ui.ButtonSet.OK);
        Logger.log(`--- ÉCHEC DU TEST CRITIQUE ---`);
        Logger.log(error);
    }
}

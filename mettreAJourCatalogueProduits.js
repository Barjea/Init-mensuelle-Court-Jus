/**
 * Ouvre le Formulaire de Référence et extrait tous les titres de questions valides
 * pour remplir la feuille "Catalogue" qui sera utilisée pour la validation des données.
 *
 * @param {string} nomFeuilleCatalogue Le nom de la feuille où stocker les titres (ex: "Catalogue").
 */
function mettreAJourCatalogueProduits(nomFeuilleCatalogue = "Catalogue") {
    
    // Assurez-vous que readConfig() a été appelé pour remplir GLOBAL_DATA
    if (typeof GLOBAL_DATA === 'undefined' || !GLOBAL_DATA.linkRefForm) {
        readConfig(); 
    }
    const data = GLOBAL_DATA;
    
    try {
        Logger.log(`[UTILITAIRE] Début de la mise à jour de la feuille '${nomFeuilleCatalogue}'.`);

        // 1. Ouvrir le Formulaire de Référence
        const referenceForm = FormApp.openByUrl(data.linkRefForm);
        
        // 2. Extraire les titres des questions (ignorer les PAGE_BREAK, Headers, etc.)
        const titres = [];
        const items = referenceForm.getItems();
        
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const type = item.getType();
            
            // On ne s'intéresse qu'aux types qui sont des "questions produit"
            if (type === FormApp.ItemType.TEXT || 
                type === FormApp.ItemType.PARAGRAPH_TEXT || 
                type === FormApp.ItemType.LIST ||
                type === FormApp.ItemType.MULTIPLE_CHOICE ||
                type === FormApp.ItemType.CHECKBOX) {
                
                // On exclut la première question de type Liste (souvent "Adhérent") et les questions sans titre
                const titre = item.getTitle().toString().trim();
                
                // Assurez-vous que ce n'est pas le titre de la première question de Section 1 si elle n'est pas un produit
                // On peut vérifier si ce n'est pas la première question globale (Index 0)
                if (i !== 0 && titre.length > 0) { 
                    titres.push([titre]);
                }
            }
        }
        
        // 3. Écrire la liste des titres dans la feuille "Catalogue"
        const catalogueSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(nomFeuilleCatalogue);
        
        if (!catalogueSheet) {
            throw new Error(`La feuille '${nomFeuilleCatalogue}' est introuvable. Veuillez la créer d'abord.`);
        }
        
        // Effacer le contenu existant
        catalogueSheet.clearContents();
        
        if (titres.length > 0) {
            catalogueSheet.getRange(1, 1, titres.length, 1).setValues(titres);
        }

        Logger.log(`[OK] ${titres.length} titres de produits écrits dans la feuille '${nomFeuilleCatalogue}'.`);
        SpreadsheetApp.getUi().alert(`Mise à jour du catalogue réussie : ${titres.length} produits extraits.`);

    } catch (error) {
        Logger.log(`[ERREUR UTILITAIRE] Échec de la mise à jour du catalogue : ${error.message}`);
        SpreadsheetApp.getUi().alert('Erreur', `Échec de la mise à jour du catalogue : ${error.message}`, SpreadsheetApp.getUi().ButtonSet.OK);
    }
}

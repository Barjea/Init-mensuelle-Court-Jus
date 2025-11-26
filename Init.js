/**
 * Fichier : Init.js
 * Rôle : Lire la configuration, extraire les IDs des liens, effectuer les vérifications préliminaires, et créer le menu personnalisé.
 */

// --- CONSTANTES DE MAINTENANCE ---

// Index de la colonne contenant les valeurs (B = 2)
const COL_VALEUR = 2; 
// Nom de la feuille de configuration
const NOM_FEUILLE_CONFIG = 'Config'; 
// Nom de la feuille de produits
const NOM_FEUILLE_PRODUITS = 'Produits'; 

// Index des lignes dans la feuille de configuration (basé sur la colonne B)
const ROW_DATE_LIVRAISON = 2;
const ROW_DATE_LIMITE_COMMANDE = 3;
const ROW_ID_SHEET_MODELE = 4;        // Contient le lien du Sheet Modèle
const ROW_ID_FORM_MODELE = 5;         // Contient le lien du Form Modèle (pour vérification)
const ROW_ID_DOSSIER_CIBLE = 6;       // Contient le lien du Dossier Cible
const ROW_NOM_FICHIER_PREFIXE = 7;    // Contient le préfixe du nom (ex: Commande Agrumes)
const ROW_LINK_REF_FORM = 8;          // Contient le lien du Formulaire de Référence des Produits

// Plage de données des produits
const PLAGE_PRODUITS_DEBUT_LIGNE = 2;
const PLAGE_PRODUITS_DEBUT_COLONNE = 1; // Colonne A

// Objet global pour stocker les données lues et validées.
let GLOBAL_DATA = {};

// --- FONCTIONS UTILITAIRES ---

/**
 * Extrait l'ID Google Drive d'une URL de fichier ou de dossier.
 * @param {string} url - L'URL Google Drive/Docs/Forms.
 * @returns {string} - L'ID du fichier/dossier.
 */
function extractIdFromUrl(url) {
  if (!url || typeof url !== 'string') return null;
  // Regex pour capturer l'ID dans différents formats d'URL
  const match = url.match(/[-\w]{25,}/);
  return match ? match[0] : null;
}

// --- Code de Init.js ---

// ... (le reste de vos fonctions utilitaires)

/**
 * Formate un objet Date en chaîne de caractères "Jour Mois Année" en français.
 * @param {Date} dateObj L'objet Date à formater.
 * @returns {string} La date formatée (ex: 28 janvier 2026).
 */
function formatDate(dateObj) {
    if (!(dateObj instanceof Date) || isNaN(dateObj)) {
        Logger.log(`[ERREUR] Tentative de formater une valeur invalide : ${dateObj}`);
        return 'Date Invalide';
    }
    const timezone = Session.getScriptTimeZone();
    
    // 1. Formater la date en jj-MM-aaaa (format numérique fiable)
    const dateFormatted = Utilities.formatDate(dateObj, timezone, "dd-MM-yyyy");

    // 2. Extraire les parties (Jour, Mois, Année)
    const parts = dateFormatted.split('-');
    const day = parts[0];
    // L'index du mois est de 0 à 11 (MM est de 1 à 12, donc on fait -1)
    const monthIndex = parseInt(parts[1], 10) - 1; 
    const year = parts[2];
    
    // 3. Définir les noms des mois en français
    const frenchMonths = [
        "janvier", "février", "mars", "avril", "mai", "juin",
        "juillet", "août", "septembre", "octobre", "novembre", "décembre"
    ];

    // 4. Construire la chaîne finale
    return `${day} ${frenchMonths[monthIndex]} ${year}`;
}

// ... (le reste de vos fonctions utilitaires)

/**
 * Crée un menu personnalisé lors de l'ouverture du Google Sheet.
 */
function onOpen() {
  SpreadsheetApp.getUi()
      .createMenu('⚙️ Automatisation Commandes')
      .addItem('Lancer la Création Mensuelle', 'runSetup')
      .addSeparator()
      .addItem('Tester la Configuration (Log)', 'runTestConfig')
      .addToUi();
}

// --- FONCTION PRINCIPALE D'INITIALISATION ---

/**
 * Lit toutes les données de configuration depuis le Google Sheet.
 * @throws {Error} - Si des données essentielles sont manquantes ou invalides.
 */
function readConfig() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const configSheet = ss.getSheetByName(NOM_FEUILLE_CONFIG) || ss.getSheets()[0];
  const data = {};
  
  if (!configSheet) {
    throw new Error(`Impossible de trouver la feuille de configuration nommée '${NOM_FEUILLE_CONFIG}' ou la première feuille.`);
  }

  // Lecture des valeurs brutes (URLs ou autres)
  data.dateLivraison = configSheet.getRange(ROW_DATE_LIVRAISON, COL_VALEUR).getValue();
  data.dateLimiteCommande = configSheet.getRange(ROW_DATE_LIMITE_COMMANDE, COL_VALEUR).getValue();
  data.urlSheetModele = configSheet.getRange(ROW_ID_SHEET_MODELE, COL_VALEUR).getValue();
  data.urlFormModele = configSheet.getRange(ROW_ID_FORM_MODELE, COL_VALEUR).getValue();
  data.urlDossierCible = configSheet.getRange(ROW_ID_DOSSIER_CIBLE, COL_VALEUR).getValue();
  data.nomPrefixe = configSheet.getRange(ROW_NOM_FICHIER_PREFIXE, COL_VALEUR).getValue();
  data.linkRefForm = configSheet.getRange(ROW_LINK_REF_FORM, COL_VALEUR).getValue(); 

  // Extraction des IDs
  data.idSheetModele = extractIdFromUrl(data.urlSheetModele);
  data.idFormModele = extractIdFromUrl(data.urlFormModele); // ID du Formulaire Modèle lié
  data.idDossierCible = extractIdFromUrl(data.urlDossierCible);
  
  // Vérification et formatage des dates
  const dateFormatted = formatDate(data.dateLivraison);
  if (!dateFormatted) {
    throw new Error(`La date de livraison est invalide (Ligne ${ROW_DATE_LIVRAISON}).`);
  }
  if (!data.nomPrefixe) {
    throw new Error(`Le préfixe du nom de fichier est manquant (Ligne ${ROW_NOM_FICHIER_PREFIXE}).`);
  }
  // Construction du nom final
  data.nouveauNomFichier = `${data.nomPrefixe} ${dateFormatted}`; 

  // --- Lecture des produits ---
  const productSheet = ss.getSheetByName(NOM_FEUILLE_PRODUITS);
  if (!productSheet) {
    throw new Error("Feuille 'Produits' introuvable.");
  }
  
  // NOUVEAU : Lecture uniquement de la colonne A (Nom du produit)
  const lastRow = productSheet.getLastRow();
  const numRows = lastRow - PLAGE_PRODUITS_DEBUT_LIGNE + 1; // Nombre de lignes à partir de la ligne de début

  // S'assurer qu'il y a au moins une ligne de données à lire
  if (numRows <= 0) {
    throw new Error("La feuille des produits est vide.");
  }

  // La plage de lecture commence à PLAGE_PRODUITS_DEBUT_LIGNE, Colonne A (PLAGE_PRODUITS_DEBUT_COLONNE = 1),
  // et lit sur 1 seule colonne (la colonne A).
  const rangeToRead = productSheet.getRange(PLAGE_PRODUITS_DEBUT_LIGNE, PLAGE_PRODUITS_DEBUT_COLONNE, numRows, 1);
  
  data.produitsData = rangeToRead.getValues()
      // Filtre les lignes vides (où la colonne A est vide)
      .filter(row => row[0] && row[0].toString().trim() !== ''); 
  
  if (data.produitsData.length === 0) {
    throw new Error("Aucun produit valide n'a été trouvé dans la colonne A de la feuille 'Produits'.");
  }

  // Stocker les données formatées globalement
  GLOBAL_DATA = data;
}

/**
 * Vérifie l'existence des fichiers modèles et du dossier cible.
 * @throws {Error} - Si un ID est manquant ou un fichier/dossier n'est pas trouvé.
 */
function validateConfig() {
  const data = GLOBAL_DATA;
  const ui = SpreadsheetApp.getUi();

  if (!data.idSheetModele || !data.idDossierCible || !data.linkRefForm) {
    throw new Error("L'un des IDs (Sheet, Dossier Cible) ou le lien du Form de Référence est manquant. Vérifiez que les liens sont valides dans la colonne B.");
  }
  
  // Vérification d'existence (via ID)
  try { DriveApp.getFileById(data.idSheetModele); } catch (e) {
    ui.alert("Vérification Échouée", "Le Google Sheet Modèle est introuvable. Vérifiez l'ID et les permissions.", ui.ButtonSet.OK);
    throw new Error(`Google Sheet Modèle introuvable.`);
  }

  // NOTE IMPORTANTE : On ne vérifie plus l'ID du Form Modèle, car la copie de la Sheet
  // doit garantir qu'elle est liée à un Form valide. On suppose que cette liaison est correcte.
  // Cependant, on vérifie l'existence du Formulaire de Référence.
  try { DriveApp.getFolderById(data.idDossierCible); } catch (e) {
    ui.alert("Vérification Échouée", "Le Dossier Cible est introuvable. Vérifiez l'ID et les permissions.", ui.ButtonSet.OK);
    throw new Error(`Dossier Cible introuvable.`);
  }
  
  try { FormApp.openByUrl(data.linkRefForm); } catch (e) {
    ui.alert("Vérification Échouée", "Le Formulaire de Référence des Produits est inaccessible. Vérifiez le lien et les permissions.", ui.ButtonSet.OK);
    throw new Error(`Formulaire de Référence introuvable.`);
  }

  return true; 
}

// --- FONCTION DE TEST (POINT 5) ---

/**
 * Exécute un test de la configuration et affiche les variables lues.
 */
function runTestConfig() {
  const ui = SpreadsheetApp.getUi();
  try {
    // Lecture et validation de la config
    readConfig();
    validateConfig();
    const data = GLOBAL_DATA;
    
    // Affichage des résultats
    const log = `
      ✅ **Configuration OK !**
      
      **Nom du Fichier (Préfixe + Date) :** ${data.nouveauNomFichier}
      
      **Feuille Modèle ID :** ${data.idSheetModele}
      **Dossier Cible ID :** ${data.idDossierCible}
      **Lien Form Réf. Produits :** ${data.linkRefForm}
      
      **Date Limite :** ${formatDate(data.dateLimiteCommande)}
      **Nombre de produits à importer :** ${data.produitsData.length}
      
      *(Vérifiez la console (Ctrl+Shift+J ou Cmd+Option+J) pour le détail des produits)*
    `;
    
    Logger.log("--- DÉTAIL DES PRODUITS À IMPORTER ---");
    data.produitsData.forEach(row => Logger.log(`Produit: ${row[0]} | Cond: ${row[1]} | Prix: ${row[3]}`));
    
    ui.alert('Test de Configuration', log, ui.ButtonSet.OK);

  } catch (error) {
    ui.alert('Erreur Critique lors du Test', `Échec du test : ${error.message}`, ui.ButtonSet.OK);
    Logger.log(error);
  }
}

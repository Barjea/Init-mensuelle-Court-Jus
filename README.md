# Documentation Technique : Automatisation des Commandes (Google Apps Script)

## I. Objectif du Script

Ce projet vise à automatiser la création d'un cycle de commande complet (Google Sheet + Google Form) à partir de fichiers modèles. L'objectif principal est d'assurer la cohérence des données (dates, produits, prix) entre le fichier de configuration et le formulaire final, tout en gérant l'ajout et la personnalisation des questions de produit.

## II. Structure du Code et Étapes (Fonction `runSetup`)

Le script est organisé en étapes séquentielles (fichiers `Init.js` et `Code.js`) exécutées par la fonction principale `runSetup()`.

| Étape | Fonction | Rôle |
| :---: | :---: | :--- |
| **Initialisation** | `readConfig()`, `validateConfig()` | Lit les données de la feuille `Config` et `Produits` (dates, ID, sélection de produits). |
| **1** | `etape_1_copierFichiers()` | Copie le Sheet Modèle et détermine l'ID du Formulaire Modèle lié. |
| **2** | `etape_2_renommerFormulaire()` | Renomme le Formulaire Copié avec le préfixe et la date de livraison. |
| **3** | `etape_3_deplacerFichiers()` | Déplace le Formulaire et le Sheet dans le dossier cible. Lie le nouveau Formulaire au nouveau Sheet pour les réponses. |
| **4** | `etape_4_miseAJourFormulaire()` | Met à jour le Titre Global et la Description du Formulaire via templating (`{{DATE_LIVRAISON}}`, `{{DATE_LIMITE}}`). |
| **5** | `etape_5_importerQuestions()` | **Clonage Sémantique des Questions :** Reconstruit les questions de produit sélectionnées (de type `TEXT`) en copiant les propriétés du modèle et en personnalisant le HelpText (Conditionnement/Prix) avant de les insérer. Le modèle initial est supprimé. |


## III. Notes Techniques Clés

* **Reconstruction des Questions (Étape 5)** : Le script utilise une logique de **Clonage Sémantique** : il crée de nouveaux éléments (`addTextItem`) au lieu de simplement copier l'objet. Cela permet d'injecter des données dynamiques (Conditionnement et Prix) dans le `HelpText` à partir de la feuille `Produits`, tout en conservant le titre et les autres propriétés de la question modèle.
* **Format de Date** : Pour garantir l'affichage des noms de mois en **français** (ex: "janvier" et non "January"), la fonction `formatDate()` dans `Init.js` effectue une **traduction par tableau** des mois. Ceci est une solution robuste car la `locale` du script Apps Script n'est pas toujours fiable via les paramètres.
* **Gestion des Fichiers** : Les fonctions `DriveApp` sont utilisées pour la copie (`makeCopy`), le déplacement (`moveTo`) et l'organisation des fichiers générés.

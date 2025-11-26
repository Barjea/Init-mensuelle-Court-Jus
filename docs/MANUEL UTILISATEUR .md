**MANUEL UTILISATEUR : CRÉATION D'UN NOUVEAU FORMULAIRE DE COMMANDE**

**OBJECTIF**

Ce script automatise la création d'un nouveau cycle de commande à partir du modèle existant, en personnalisant automatiquement les dates, le prix des produits, et les conditionnements.

**1\. PRÉPARATION DE LA COMMANDE (Onglet "Config")**

Avant de lancer l'automatisation, vous devez configurer les paramètres de la nouvelle commande dans l'onglet "Config".

   \- DATES : Modifiez les dates de DATE\_LIMITE (Date limite de commande) et DATE\_LIVRAISON (Date de la distribution) dans les cellules jaunes.

   \- PRODUITS : Selectionnez le produit dans les menus déroulants des cases A2, A3, A4 etc.. jusqu'au nombre de produits à offir pour cette commande. Ajoutez ou supprimer les lignes avec le menu déroulant avec copier coller ou supprimer ligne.

   \- NOM : Le NOM\_PREFIXE sera utilisé pour nommer le Formulaire et le Sheet générés (ex: "Commandes Agrumes \- Livraison du 28 janvier 2026").

   \- FICHIERS DE RÉFÉRENCE : Ne touchez pas aux ID et URL des fichiers Modèles.

**2\. LANCEMENT DE L'AUTOMATISATION**

Une fois la configuration terminée, vous lancez le script depuis l'éditeur :

   1\. Ouvrez l'Éditeur de Script (Extensions \> Apps Script).  
   2\. Dans le fichier Code.js, trouvez la fonction runSetup.  
   3\. Cliquez sur l'icône ▶️ Exécuter (Run) dans la barre d'outils.  
      \* NOTE : La première exécution demandera des autorisations. Acceptez-les.

**3\. RÉSULTAT**

   \- Une boîte de dialogue finale s'ouvrira avec les liens du nouveau Formulaire (à diffuser) et du nouveau Sheet (pour la gestion).

   \- Le nouveau Formulaire de Commande sera prêt, avec :  
      \* Titre et Description mis à jour avec la date de livraison et la date limite.  
      \* La Section 2 (Commande) contenant uniquement les questions pour les produits sélectionnés dans la feuille Produits.  
      \* Chaque question de produit aura son conditionnement et son prix mis à jour dans le texte d'aide (ex: "Caisse de 12 kg à 24,00 €/caisse").  
   \- Les nouveaux fichiers (Formulaire et Sheet) sont automatiquement déplacés dans le dossier de gestion du Drive.  

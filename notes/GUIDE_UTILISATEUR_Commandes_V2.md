# 📱 GUIDE UTILISATEUR \- Commandes Court-Jus

**Version** : 2.0 **Date** : 19 novembre 2025 **Auteur** : Jean-Louis BARRE

---

## 👥 À qui s'adresse ce guide ?

- **Adhérents** : Pour passer vos commandes  
- **Relai actuel** : Pour gérer les commandes mensuelles  
- **Futur relai** : Pour reprendre la gestion du système

---

## 🍊 POUR LES ADHÉRENTS

### Comment passer une commande ?

#### Étape 1 : Recevoir l'email

Chaque mois (d'octobre à mai), vous recevez un email avec :

- 📅 La **date de livraison** (exemple : 30 novembre 2025\)  
- 📅 La **date limite** pour commander (exemple : 12 novembre 2025 à 21h)  
- 🔗 Le **lien du formulaire de commande**  
- 🌐 Le **lien vers le catalogue Court-Jus** (pour voir les produits disponibles)

#### Étape 2 : Consulter le catalogue

Avant de commander, consultez le catalogue en ligne : 👉 [https://court-jus.jimdofree.com/adhérent/agrumes/](https://court-jus.jimdofree.com/adhérent/agrumes/)

Vous y trouverez :

- Photos des produits  
- Descriptions détaillées  
- Conditionnements (poids, nombre de pièces)

#### Étape 3 : Remplir le formulaire

1. **Cliquez sur le lien** dans l'email  
2. **Saisissez votre adresse email**  
3. **⚠️ IMPORTANT : Sélectionnez VOTRE nom** dans la liste déroulante  
   - Ne sélectionnez PAS le nom d'une autre personne  
   - Si vous vous trompez, vous effacez la commande de l'autre personne \!  
4. **Indiquez les quantités** pour chaque produit que vous souhaitez  
   - Laissez vide ou mettez 0 pour les produits que vous ne voulez pas  
5. **Ajoutez un commentaire** si besoin (optionnel)  
   - Exemple : "Je peux récupérer la commande le dimanche 30 novembre"  
   - Exemple : "Je suis disponible pour aider au transport"  
6. **Cliquez sur "Envoyer"**

#### Étape 4 : Modifier votre commande (si besoin)

Vous pouvez **modifier votre commande autant de fois que vous voulez** jusqu'à la date limite.

**Comment faire ?**

1. Cliquez à nouveau sur le lien du formulaire  
2. Remplissez le formulaire avec vos nouvelles quantités  
3. ⚠️ **N'oubliez pas de sélectionner votre nom \!**  
4. Cliquez sur "Envoyer"

**Important** : C'est la **dernière soumission** qui sera retenue comme commande définitive.

---

### ❓ Questions fréquentes (Adhérents)

#### Puis-je commander plusieurs fois ?

**Oui \!** Vous pouvez modifier votre commande autant de fois que vous voulez avant la date limite. Seule la dernière soumission compte.

#### J'ai oublié de commander un produit, puis-je modifier ?

**Oui**, tant que la date limite n'est pas dépassée. Re-remplissez le formulaire avec **tous** les produits que vous voulez (y compris ceux déjà commandés \+ le nouveau produit).

#### Je ne veux plus rien commander, que faire ?

Re-remplissez le formulaire en mettant **0** (ou en laissant vide) pour tous les produits, puis envoyez.

#### J'ai sélectionné le mauvais nom, que faire ?

**Contactez immédiatement le relai** ([jlmagbar@gmail.com](mailto:jlmagbar@gmail.com)) pour qu'il corrige. En attendant, re-remplissez le formulaire avec le bon nom.

#### Comment savoir si ma commande a été prise en compte ?

Vous recevez un email de confirmation de Google Forms après chaque soumission. Si vous ne recevez pas cet email, votre commande n'a pas été enregistrée.

#### Puis-je partager un lot avec un autre adhérent ?

**Oui \!** Les adhérents peuvent se mettre d'accord entre eux pour partager des lots trop gros. Mettez un commentaire dans le formulaire pour indiquer qui partage avec qui.

#### Comment payer ?

Le paiement se fait **à la livraison** directement auprès du relai.

---

## 🛠️ POUR LE RELAI

### ⚠️ POINT CRITIQUE \- Tables structurées

**TRÈS IMPORTANT** pour que les formules fonctionnent correctement :

🔴 **Le modèle doit TOUJOURS contenir au moins :**

- **1 ligne de données** dans "Réponses au formulaire"  
- **1 produit** (= 1 colonne) dans le Google Form et dans la feuille Commandes

**Pourquoi ?** Les formules référencent des "tables structurées" Google Sheets. Si la table est complètement vide, les formules génèrent des erreurs :

- `#ERROR!` en E6, E7, E8 (feuille Commandes)  
- `#REF!` en A7 (référence à une table vide)

**Solution dans le modèle :** ✅ Laisser **intentionnellement** :

- 1 commande fictive à votre nom dans "Réponses au formulaire"  
- 1 fruit dans le Google Form (exemple : ORANGES en colonne F)  
- Mettre un commentaire "MODÈLE \- Ne pas supprimer" dans la commande fictive

**Lors de la création d'une nouvelle commande mensuelle :**

- ⚠️ Ne PAS supprimer cette ligne avant d'avoir des vraies commandes  
- Vous pourrez la supprimer une fois que des adhérents auront commandé

---

### Processus mensuel complet

#### 📅 AVANT la commande (J-15)

**1\. Copier le modèle**

1. Ouvrir le fichier modèle dans Google Drive :  
     
   - Dossier : "Commandes Court-Jus" \> "Modèle"  
   - Fichier : "MODÈLE \- Commande 2026"

   

2. Créer une copie :  
     
   - **Fichier** \> **Créer une copie**  
   - ⚠️ Cela copie automatiquement le Google Sheet ET le Google Form associé

**2\. Renommer les fichiers**

1. Renommer le **Google Sheet** :  
     
   - Exemple : "Commande agrumes 30 novembre 2025"

   

2. Renommer le **Google Form** :  
     
   - Ouvrir le Google Form (lien dans la feuille ou via Google Forms)  
   - Modifier le titre avec la même date  
   - Exemple : "Commande d'AGRUMES pour la distribution du 30 Novembre 2025"

**3\. Organiser les fichiers**

1. Dans Google Drive, sélectionner les 2 fichiers  
2. Clic droit \> **📁 Organiser** (ou icône dossier)  
3. Déplacer vers : "Commandes Court-Jus" \> "Commandes 2025" (ou année en cours)

**4\. Modifier le Google Form**

1. Ouvrir le Google Form (mode édition)  
     
2. Modifier la **date de livraison** dans le titre  
     
3. Modifier la **date limite** dans le texte d'introduction  
     
4. **Modifier/Ajouter les produits disponibles** pour ce mois :  
     
   **💡 MÉTHODE RECOMMANDÉE** (gain de temps énorme) :  
     
   a. **Créer une fois pour toutes** un Google Form de référence :  
     
   - Nom : "Référence pour tous les produits"  
   - Contient TOUS les produits possibles sur l'année  
   - Avec leurs prix et conditionnements dans la description

   

   b. **Pour chaque commande mensuelle** :

   

   - Cliquer sur **⋮** (trois points) en haut à droite  
   - Sélectionner **📥 Importer des questions**  
   - Choisir "Référence pour tous les produits"  
   - Sélectionner uniquement les produits disponibles ce mois-ci  
   - Importer  
   - Dans votre Google Form de commande, supprimer le produit unique du modèle

   

   ⚠️ **ATTENTION** : Les noms de produits doivent être **strictement identiques** à la feuille "Produits"

**5\. Activer et partager le formulaire**

**Cas A** : Le message "Ce formulaire n'accepte pas de réponses" s'affiche

1. Cliquer sur **⚙️ Paramètres**  
2. Onglet **Réponses**  
3. Activer : "Accepter les réponses" (bouton à droite)  
4. Cliquer sur **📋 Réponses** \> **🔗 Obtenir le lien de préremplissage** (si besoin)  
5. Copier le lien, par exemple : `https://docs.google.com/forms/d/e/.../viewform?usp=sharing`

**Cas B** : Le formulaire est déjà publié

1. Cliquer sur **📤 Envoyer** en haut à droite  
2. Onglet **🔗 Lien**  
3. **Options de répondants** :  
   - Sélectionner : "Tous les utilisateurs qui ont le lien"  
4. Copier le lien

**6\. Tester le formulaire**

1. Ouvrir le lien dans un navigateur (mode navigation privée si possible)  
2. Remplir une commande de test avec votre nom  
3. Mettre en commentaire : "TEST \- À supprimer"  
4. Envoyer  
5. Vérifier dans le Google Sheet :  
   - La commande apparaît dans "Réponses au formulaire"  
   - La commande apparaît dans "Commandes" (feuille consolidée)  
   - Les totaux se calculent correctement (lignes 2, 3, 4\)  
6. **Garder cette commande test** pour maintenir la table structurée active  
   - Vous pourrez la supprimer plus tard quand des vraies commandes arriveront

**7\. Mettre à jour la feuille "Produits"**

1. Ouvrir l'onglet "Produits"  
2. Vérifier que TOUS les produits du Google Form sont présents  
3. Ajouter les produits manquants si nécessaire  
4. Vérifier les prix et conditionnements  
5. **Les noms doivent être EXACTEMENT les mêmes** que dans le Google Form

**8\. Rédiger et envoyer l'email**

Utiliser le modèle suivant :

Objet : Commande Court-Jus \- Livraison 30 novembre 2025

Bonsoir,

La livraison aura lieu le 30 novembre 2025 devant notre garage.

Liste des agrumes disponibles :

https://court-jus.jimdofree.com/adhérent/agrumes/

Lien pour passer votre commande :

\[COLLER LE LIEN DU FORMULAIRE ICI\]

La date limite est le 12 novembre 2025 à 21 heures.

Merci de mettre en commentaire qui pourra m'aider pour le transport

de cette commande le dimanche 30 novembre.

Comme à chaque fois, vous pouvez vous mettre d'accord entre vous

pour partager des lots qui seraient trop gros pour vous.

C'est pourquoi je laisse vos adresses mail en clair et non cachées.

Jean-Louis

Nota :

Dans la liste déroulante, assurez-vous que vous sélectionnez votre NOM

et pas celui d'une autre personne.

Si vous sélectionnez un autre nom, vous effacez la commande d'une autre

personne et c'est lui qui aura votre commande \!

9. **Envoyer l'email à tous les adhérents** (28 personnes)  
   - À : \[Liste des 28 emails\]  
   - Laisser les emails visibles (pour qu'ils puissent se contacter)

---

#### 📊 PENDANT la période de commande (J-15 à J-0)

**Suivi quotidien (optionnel)**

1. Ouvrir le Google Sheet  
2. Onglet "Commandes"  
3. Vérifier :  
   - Nombre de commandes reçues (ligne 4\)  
   - Adhérents ayant déjà commandé (colonne C)  
   - Total prévisionnel (ligne 3\)

**Gestion des questions**

Les adhérents peuvent vous contacter pour :

- Problèmes techniques avec le formulaire  
- Questions sur les produits  
- Partage de lots entre eux

**Relance (J-2)**

Si peu de commandes, envoyer un email de relance :

Objet : Rappel \- Commande Court-Jus \- Date limite 12 novembre

Bonjour,

Rappel : la date limite pour commander est le 12 novembre à 21 heures.

Pour rappel, le lien du formulaire :

\[LIEN\]

À bientôt,

Jean-Louis

---

#### 📦 APRÈS la date limite

**1\. Vérifier les données**

1. Ouvrir le Google Sheet  
2. Onglet "Commandes"  
3. Vérifier visuellement :  
   - Pas de lignes en double (même adhérent plusieurs fois)  
   - Totaux cohérents (ligne 3\)  
   - Nombre de commandes (ligne 4\)  
4. **Supprimer votre commande de test** si elle existe encore

**2\. Consolider la commande Court-Jus**

Utiliser la **ligne 3** (Total commandes) pour préparer la commande :

Exemple :

ORANGES : 23 caisses

CLÉMENTINES 10 kg : 16 caisses

PAMPLEMOUSSES : 8 caisses

CITRONS : 9 caisses

MANDARINES : 5 caisses

...

**3\. Passer la commande à Court-Jus**

1. Se connecter sur le site Court-Jus  
2. Passer la commande en indiquant :  
   - Les quantités totales de chaque produit (ligne 3\)  
   - Le montant total prévisionnel (somme de la ligne 3\)  
   - La préférence horaire de livraison

**4\. Préparer la distribution**

1. Imprimer ou consulter la feuille "Commandes" sur tablette/téléphone  
2. Prévoir la monnaie pour les paiements  
3. Préparer des sacs ou caisses pour organiser par adhérent

---

#### 📅 JOUR de la livraison

**1\. Réception de la commande Court-Jus**

- Vérifier les quantités reçues vs commandées lors du chargement  
- Recompter les caisses en les chargeant dans votre véhicule  
- Prévenir vos adhérents de l'heure de distribution locale et du lieu si changement

**2\. Distribution aux adhérents**

Pour chaque adhérent :

1. Vérifier son nom sur la liste (onglet "Commandes")  
2. Préparer sa commande selon les quantités indiquées  
3. Calculer le montant dû (colonne "Total")  
4. Vérifier qu'il/elle a le montant du virement à faire  
5. Cocher sur la liste papier et indiquer : virement, chèque ou espèces

**3\. Gestion des absents**

Si un adhérent ne vient pas récupérer :

- Le contacter pour lui rappeler l'horaire et si besoin organiser une livraison ultérieure  
- Stocker sa commande si possible

---

#### 📊 APRÈS la distribution (optionnel)

**1\. Bilan financier**

1. Additionner tous les paiements reçus  
2. Comparer avec le montant payé à Court-Jus  
3. Faire le virement à Court-Jus

**2\. Archivage**

1. Dans Google Drive, déplacer le fichier vers "Archives 2025"  
2. Conserver l'historique pour référence future

---

### 🔧 Maintenance du système

#### Mise à jour de la liste des adhérents

**Quand ?** : Début de chaque saison (octobre)

**Comment ?**

1. Ouvrir le **Google Form** (modèle)  
2. Modifier la question "Adhérent"  
3. Ajouter/Supprimer les noms selon les adhésions  
4. Trier par ordre alphabétique  
5. **Important** : Mettre à jour la consigne en gras :  
     
   Sélectionner VOTRE nom dans la liste

#### Mise à jour des produits

**Quand ?** : À chaque commande, selon le catalogue Court-Jus

**Comment ?**

1. Consulter le catalogue Court-Jus en ligne  
     
2. Ouvrir le **Google Forms "Référence pour tous les produits"**  
     
   - Mettre à jour les produits, leurs prix et le conditionnement

   

3. Ouvrir le **Google Sheet** (modèle)  
     
4. Onglet "Produits"  
     
5. Ajouter/Modifier/Supprimer les lignes  
     
6. **Attention** : Le nom doit être identique entre :  
     
   - Feuille "Produits" (colonne A)  
   - Google Form (questions)  
   - En-têtes de colonnes (ligne 6 de "Commandes")

#### Mise à jour des prix

**Quand ?** : Si Court-Jus change ses tarifs

**Comment ?**

1. Modifier les prix dans le **Google Forms "Référence pour tous les produits"**  
2. Ouvrir la feuille "Produits"  
3. Modifier les prix dans la colonne "Prix unitaire" (colonne D)  
4. Les formules dans "Commandes" se mettent à jour automatiquement

---

### 🐛 Résolution de problèmes courants

#### Problème : Un adhérent n'apparaît pas dans la feuille "Commandes"

**Causes possibles :**

1. Il n'a pas encore commandé  
2. Il a commandé mais sélectionné un autre nom  
3. Problème avec la formule A7

**Solutions :**

1. Vérifier dans "Réponses au formulaire" s'il a soumis le formulaire  
2. Si oui, vérifier le nom qu'il a sélectionné (colonne "Adhérent") correspondant à son adresse mail  
3. Si le nom est incorrect, contacter l'adhérent pour qu'il re-remplisse  
4. Si la formule A7 est cassée, consulter la documentation technique

#### Problème : Un adhérent apparaît plusieurs fois

**Cause :** La formule de dédoublonnage (A7) ne fonctionne pas

**Solutions :**

1. Vérifier que la formule A7 est bien présente  
2. Vérifier que les colonnes "Horodateur" et "Adhérent" existent dans "Réponses au formulaire"  
3. Supprimer manuellement les lignes en double (garder la plus récente)  
4. Consulter la documentation technique

#### Problème : Les totaux ne se calculent pas

**Causes possibles :**

1. Formules supprimées ou modifiées  
2. Données au mauvais format

**Solutions :**

1. Vérifier les formules dans les lignes 2, 3, 4  
2. Consulter la documentation technique pour les restaurer  
3. Vérifier que les cellules contiennent des nombres (pas du texte)

#### Problème : Erreurs \#ERROR\! ou \#REF\! dans les formules

**Cause :** Les tables structurées sont vides (pas de données)

**Solutions :**

1. Vérifier qu'il y a au moins 1 ligne de données dans "Réponses au formulaire"  
2. Vérifier qu'il y a au moins 1 produit dans le formulaire et en colonne F  
3. Laisser votre commande de test jusqu'à ce que de vraies commandes arrivent  
4. Consulter la section "Point critique \- Tables structurées" ci-dessus

#### Problème : Les prix ne s'affichent pas (ligne 2\)

**Cause :** Le nom du produit n'existe pas dans la feuille "Produits"

**Solutions :**

1. Vérifier l'orthographe exacte (majuscules, espaces, accents)  
2. Ajouter le produit manquant dans "Produits"  
3. Corriger le nom dans l'en-tête (ligne 6\) si nécessaire

#### Problème : Un adhérent n'a pas reçu l'email

**Solutions :**

1. Vérifier son adresse email dans votre liste  
2. Vérifier les spams  
3. Re-envoyer individuellement si nécessaire

---

### 📝 Checklist du relai

**Avant chaque commande :**

- [ ] Copier le modèle  
- [ ] Renommer les fichiers avec la date  
- [ ] Déplacer dans le bon dossier  
- [ ] Modifier le Google Form (date, produits)  
- [ ] Importer les questions depuis "Référence pour tous les produits"  
- [ ] Mettre à jour la feuille "Produits"  
- [ ] Activer le formulaire et obtenir le lien  
- [ ] Tester le formulaire avec votre nom  
- [ ] Vérifier les totaux dans le Sheet  
- [ ] Rédiger et envoyer l'email

**Pendant la période de commande :**

- [ ] Suivre le nombre de commandes  
- [ ] Répondre aux questions des adhérents  
- [ ] Relancer si nécessaire (J-2)

**Après la date limite :**

- [ ] Vérifier les données dans "Commandes"  
- [ ] Supprimer la commande de test  
- [ ] Consolider les quantités (ligne 3\)  
- [ ] Passer la commande à Court-Jus  
- [ ] Préparer la distribution

**Jour de livraison :**

- [ ] Réceptionner et compter la commande Court-Jus  
- [ ] Distribuer aux adhérents  
- [ ] Noter les paiements (virement/chèque/espèces)  
- [ ] Gérer les absents

**Après la distribution :**

- [ ] Bilan financier  
- [ ] Virement à Court-Jus  
- [ ] Archiver le fichier

---

## 🔄 POUR LE FUTUR GESTIONNAIRE

### Reprendre le système

Si vous reprenez la gestion de ce système, voici les étapes :

#### 1\. Accès aux fichiers

**Demander au relai actuel :**

- Accès au dossier Google Drive "Commandes Court-Jus"  
- Droit "Éditeur" sur tous les fichiers  
- Transfert de propriété des fichiers (optionnel mais recommandé)

#### 2\. Formation

**Se familiariser avec :**

- La structure du Google Sheet (4 feuilles)  
- Le processus mensuel (consulter ce guide)  
- Les formules importantes (consulter la documentation technique)  
- Le contact Court-Jus

#### 3\. Test

**Avant la première commande en autonomie :**

1. Créer une copie de test du modèle  
2. Simuler une commande complète  
3. Vérifier que tout fonctionne  
4. Demander une supervision pour la première fois

#### 4\. Contacts importants

**Relai actuel :** Jean-Louis BARRE ([jlmagbar@gmail.com](mailto:jlmagbar@gmail.com)) **Court-Jus :** \[Coordonnées à demander\] **Liste des 28 adhérents :** \[Dans le Google Form\]

---

## 📞 SUPPORT

**Pour les adhérents :**

- Email : [jlmagbar@gmail.com](mailto:jlmagbar@gmail.com)  
- Téléphone : 07 77 32 79 51  
- Réponse sous 24h

**Pour le relai :**

- Consulter la documentation technique (fichier séparé)  
- Contacter l'ancien relai si nécessaire

---

## 📚 RESSOURCES

### Liens utiles

- **Catalogue Court-Jus** : [https://court-jus.jimdofree.com/adhérent/agrumes/](https://court-jus.jimdofree.com/adhérent/agrumes/)  
- **Google Forms** : [https://forms.google.com](https://forms.google.com)  
- **Google Sheets** : [https://sheets.google.com](https://sheets.google.com)  
- **Google Drive** : [https://drive.google.com](https://drive.google.com)

### Documents associés

- **Documentation technique** : DOCUMENTATION\_TECHNIQUE\_Commandes.md  
- **Modèle Google Sheet** : MODÈLE \- Commande 2026  
- **Modèle Google Form** : Lié au modèle Google Sheet  
- **Google Form Référence** : Référence pour tous les produits

### Modèles créés

- **Google Sheet modèle** : [https://docs.google.com/spreadsheets/d/1PZ41ZCyWij1Z98jogajrIs5PVMOxpuV6YM1US5aQQbE/edit](https://docs.google.com/spreadsheets/d/1PZ41ZCyWij1Z98jogajrIs5PVMOxpuV6YM1US5aQQbE/edit)  
- **Google Form modèle** : [https://docs.google.com/forms/d/e/1FAIpQLSeweHjo5lXFx1MjShU25ONSBTQVtGZt800S\_bdRRs0Oz5plow/viewform](https://docs.google.com/forms/d/e/1FAIpQLSeweHjo5lXFx1MjShU25ONSBTQVtGZt800S_bdRRs0Oz5plow/viewform)

---

## ✅ BONNES PRATIQUES

### Pour les adhérents

✅ Commander avant la date limite ✅ Vérifier son nom dans la liste déroulante ✅ Mettre un commentaire si on peut aider au transport ✅ Se coordonner avec d'autres pour partager des lots

### Pour le relai

✅ Créer un Google Form "Référence pour tous les produits" (une seule fois) ✅ Utiliser l'import de questions pour gagner du temps ✅ Toujours laisser au moins 1 ligne et 1 produit dans le modèle ✅ Tester le formulaire avant chaque envoi ✅ Envoyer l'email au moins 15 jours avant la livraison ✅ Relancer 2 jours avant la date limite ✅ Vérifier les données avant de passer la commande à Court-Jus ✅ Archiver les fichiers après chaque distribution

---

## 📋 LÉGENDE DES ICÔNES GOOGLE FORMS

- **⚙️** : Paramètres du formulaire  
- **📋** : Réponses  
- **🔗** : Obtenir le lien  
- **📤** : Envoyer le formulaire  
- **⋮** : Menu (trois points)  
- **📥** : Importer des questions  
- **📁** : Organiser (Google Drive)

---

**Version 2.0 \- Novembre 2025** **Relai : Jean-Louis BARRE** **Email : [jlmagbar@gmail.com](mailto:jlmagbar@gmail.com)** **Téléphone : 07 77 32 79 51**

---

**Fin du guide utilisateur**  

 Le nom des fichiers de commande est à modifier :     
En A6 NOM\_FICHIER en B6 le contenu du Nom du préfixe du fichier : pour permettre d’avoir :   
NOM\_FICHIER \+ Date livraison,  comme par exemple  : Commande Agrumes 12/01/2026 ou Commande Agrumes 12-01-2026

2 Il faut copier les fichiers modèles puis les renommer puis les déplacer.   
Ceci permet de garder les modèles pour la prochaine fois.  
Suivre la procédure strictement  le “Processus mensuel complet” contenu dans le GUIDE\_UTILISATEUR\_Commandes\_V2.md

3 Il ne faut surtout pas supprimer l'ancienne liaison,  le fichier google sheet et le fichier Google forms copiés et renommés doivent restés liés entre eux.

4 Suivre **MÉTHODE RECOMMANDÉE** (gain de temps énorme) :  
Importer les questions dans  “Référence pour tous les produits”, le lien vers ce fichier Google Forms doit être donné dans la feuille Config  
en A7 : REFERENCE\_PRODUITS et B7 : le lien vers le fichier google forms “Référence pour tous les produits”  
Il est donc nécessaire de rechercher un par un dans les questions de “Référence pour tous les produits” le nom des produits contenus dans la feuille produit afin de les insérer dans le google forms pour la prochaine commande

Nota: dans la feuille config  il y a que des liens vers des fichiers et non des Id de ces fichiers, il faut probablement en extraire l’Id de chaque fichier pour pouvoir ensuite s’en servir.

5 Ecrire un programme de test dans [Init.js](http://Init.js) afin de vérifier que toutes variables globales sont correctes avec de commencer à tester Code.js
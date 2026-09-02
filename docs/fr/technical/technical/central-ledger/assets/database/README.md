# Comment modifier le fichier central-ledger-schema-DBeaver.erd

Guide de base pour consulter ou mettre à jour le fichier `central-ledger-schema-DBeaver.erd`.

## Prérequis

* Installer DBeaver Community (gestionnaire de bases de données)
* La base MySQL du registre central Mojaloop doit être démarrée et accessible depuis DBeaver
* Un éditeur de texte

## Étapes

* Créer une connexion à la base MySQL dans DBeaver (onglet *Database Navigator*).
* Sous l’onglet *Projects*, clic droit puis créer un nouveau diagramme ER.
* Nommer le diagramme et sélectionner la base `central-ledger` dans l’assistant.

* Copier le fichier `central-ledger-schema-DBeaver.erd` du module de documentation vers `DBeaverData/workspace/General/Diagrams` à l’emplacement de stockage DBeaver.
* Ouvrir avec un éditeur le fichier `.erd` nouvellement créé, rechercher `data-source id` et copier sa valeur (ex. `mysql5-171ea991174-1218b6e1bf273693`).
* Ouvrir `central-ledger-schema-DBeaver.erd` du dossier des diagrammes ER et remplacer la valeur `data-source id` par celle copiée.
* Le fichier `central-ledger-schema-DBeaver.erd` doit alors afficher les tables comme sur `central-ledger-schema.png`.

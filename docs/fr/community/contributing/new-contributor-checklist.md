# Checklist nouveau contributeur

Ce guide résume les étapes pour démarrer en tant que contributeur Mojaloop. Elles n’ont pas besoin d’être faites en une seule fois ; à la fin de la checklist, vous devriez en savoir plus sur Mojaloop et être prêt à contribuer.


## 1. Outils et documentation

- Créez un compte GitHub ou utilisez le vôtre : [inscription](https://github.com/join).

- Rejoignez le Slack via le [lien d’invitation](https://join.slack.com/t/mojaloop/shared_invite/zt-1qy6f3fs0-xYfqfIHJ6zFfNXb0XRpiHw), et ces canaux :
  - `#announcements` — Annonces de releases et statut QA
  - `#design-authority` — Questions et discussions sur la conception Mojaloop
  - `#general` — Discussion générale sur Mojaloop
  - `#help-mojaloop` — Aide à l’installation ou à l’exécution de Mojaloop
  - `#ml-oss-bug-triage` — Discussion et triage des bugs et tickets

- Dites bonjour ! Une courte présentation sur `#general` est la bienvenue.

- Lisez le [guide de workflow Git](https://docs.mojaloop.io/community/standards/creating-new-features.html) et assurez-vous de maîtriser Git.
  - Pour aller plus loin : [Introduction au workflow GitHub](https://www.atlassian.com/git/tutorials/comparing-workflows)

- Familiarisez-vous avec notre style de code : https://standardjs.com/

- Parcourez la [documentation Mojaloop](https://mojaloop.io/documentation/) pour comprendre le fonctionnement global.

- Suivez le [guide des outils développeur](https://github.com/mojaloop/mojaloop/blob/master/onboarding.md) pour installer l’environnement local.

- (Optionnel) Faire tourner Central-Ledger en local :
  - https://github.com/mojaloop/central-ledger/blob/master/Onboarding.md
  - https://github.com/mojaloop/ml-api-adapter/blob/master/Onboarding.md

- (Optionnel) Déployer un switch complet avec Kubernetes : https://mojaloop.io/documentation/deployment-guide/ *(en local, le cluster Kubernetes nécessite en général 8 Go de RAM ou plus)*

## 2. Trouver un ticket

- Parcourez la liste [good-first-issue](https://github.com/mojaloop/project/labels/good%20first%20issue) sur [`mojaloop/project`](https://github.com/mojaloop/project), ou demandez sur `#general`.

- Laissez un commentaire sur le ticket pour demander l’assignation — cela évite le travail en double. En cas de doute, Slack.

- Forkez les dépôts concernés, clonez et créez une branche pour le ticket.
  - Voir le [guide utilisateur Git](https://docs.mojaloop.io/community/standards/creating-new-features.html) si besoin.


## 3. Ouvrir votre première PR 

> À faire une fois ajouté à l’organisation GitHub Mojaloop. Sans accès, écrivez sur `#general` ou `#help-mojaloop`.

- Inscrivez-vous sur [Zenhub](https://www.zenhub.com/), connectez-le à l’organisation Mojaloop et cherchez l’espace de travail *project*.
- Installez l’[extension navigateur Zenhub](https://www.zenhub.com/extension) pour Chrome ou Firefox et parcourez le [tableau Kanban du projet Mojaloop](https://github.com/mojaloop/project#zenhub).

- Lorsque votre branche est prête pour revue, ouvrez une pull request depuis votre dépôt vers le projet mojaloop.
  > *Note : si les pipelines CI/CD ne se lancent pas, votre compte GitHub n’est peut-être pas ajouté au dépôt Mojaloop.*
- Vérifiez :
  - Une description claire de la fonctionnalité ou du correctif
  - La PR *assignée* à vous-même
  - Au moins deux *reviewers* assignés. GitHub en suggère souvent ; sinon, demandez à l’auteur du ticket.

- (Optionnel) Partagez le lien de votre PR sur `#ml-oss-devs` sur Slack.


## 4. Signer la CLA

Après votre première PR, la CI vous demandera de signer la CLA. Voir [Signer la CLA](./signing-the-cla.md).

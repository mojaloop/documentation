# Checklist nouveau contributeur

Ce guide résume les étapes pour démarrer en tant que contributeur Mojaloop. Elles n’ont pas besoin d’être effectuées en une seule fois ; à la fin de cette checklist, vous devriez avoir acquis une bonne connaissance de Mojaloop et être prêt à contribuer à la communauté.


## 1. Outils et documentation

- Assurez-vous de disposer d’un compte GitHub, ou créez-en un ici : [inscription](https://github.com/join).

- Rejoignez le Slack via le [lien d’invitation](https://join.slack.com/t/mojaloop/shared_invite/zt-1qy6f3fs0-xYfqfIHJ6zFfNXb0XRpiHw), et ces canaux :
  - `#announcements` — Annonces des nouvelles releases et statut QA
  - `#design-authority` — Questions et discussions autour de la conception Mojaloop
  - `#general` — Discussion générale sur Mojaloop
  - `#help-mojaloop` — Aide à l’installation ou à l’exécution de Mojaloop
  - `#ml-oss-bug-triage` — Discussion et triage des nouveaux bugs et tickets

- Dites bonjour ! N’hésitez pas à vous présenter brièvement à la communauté sur le canal `#general`.

- Lisez le [guide de workflow Git](https://docs.mojaloop.io/community/standards/creating-new-features.html) et assurez-vous d’être à l’aise avec Git.
  - Pour aller plus loin : [Introduction au workflow GitHub](https://www.atlassian.com/git/tutorials/comparing-workflows)

- Familiarisez-vous avec notre style de code : https://standardjs.com/

- Parcourez la [documentation Mojaloop](https://mojaloop.io/documentation/) pour acquérir une compréhension de base du fonctionnement de la technologie.

- Suivez le [guide des outils développeur](https://github.com/mojaloop/mojaloop/blob/master/onboarding.md) pour installer et mettre en service les outils nécessaires sur votre environnement local.

- (Optionnel) Faire tourner Central-Ledger en local :
  - https://github.com/mojaloop/central-ledger/blob/master/Onboarding.md
  - https://github.com/mojaloop/ml-api-adapter/blob/master/Onboarding.md

- (Optionnel) Déployer un switch complet avec Kubernetes : https://mojaloop.io/documentation/deployment-guide/ *(en local, le cluster Kubernetes nécessite en général 8 Go de RAM ou plus)*

## 2. Trouver un ticket

- Parcourez la liste [good-first-issue](https://github.com/mojaloop/project/labels/good%20first%20issue) sur [`mojaloop/project`](https://github.com/mojaloop/project) pour trouver un bon ticket pour commencer. Vous pouvez aussi contacter la communauté sur Slack sur `#general` pour demander de l’aide à en trouver un.

- Laissez un commentaire sur le ticket pour demander à ce qu’il vous soit assigné — cela permet d’éviter le travail en double. Comme toujours, n’hésitez pas à nous contacter sur Slack si vous avez des questions ou des préoccupations.

- Forkez les dépôts concernés, clonez et créez une branche pour le ticket.
  - Voir le [guide utilisateur Git](https://docs.mojaloop.io/community/standards/creating-new-features.html) si besoin.


## 3. Ouvrir votre première PR 

> À faire une fois ajouté à l’organisation GitHub Mojaloop. Sans accès, écrivez sur `#general` ou `#help-mojaloop`.

- Inscrivez-vous sur [Zenhub](https://www.zenhub.com/), connectez-le à l’organisation Mojaloop et cherchez l’espace de travail *project*.
- Installez l’[extension navigateur Zenhub](https://www.zenhub.com/extension) pour Chrome ou Firefox et parcourez le [tableau Kanban du projet Mojaloop](https://github.com/mojaloop/project#zenhub).

- Lorsque votre branche est prête pour revue, ouvrez une pull request depuis votre dépôt vers le projet mojaloop.
  > *Note : si les pipelines CI/CD ne se lancent pas, votre compte GitHub n’est peut-être pas ajouté au dépôt Mojaloop.*
- Vérifiez :
  - Une bonne description de la fonctionnalité ou du correctif que vous avez implémenté
  - La PR *assignée* à vous-même
  - Au moins deux *reviewers* assignés. GitHub en suggère souvent ; sinon, n’hésitez pas à contacter l’auteur du ticket.

- (Optionnel) Partagez le lien de votre PR sur `#ml-oss-devs` sur Slack pour que tout le monde puisse partager le plaisir.


## 4. Signer la CLA

Après votre première PR, la CI vous demandera de signer la CLA. Pour plus d’informations sur ce qu’est la CLA et la procédure pour la signer, consultez [Signer la CLA](./signing-the-cla.md).

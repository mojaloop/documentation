# Guide des contributeurs

Nous sommes heureux que vous envisagiez de rejoindre la communauté Mojaloop.

Compte tenu de la phase actuelle du projet Mojaloop, nous recherchons notamment les types de contributeurs suivants :

## Types de contributeurs

- #### Contributeurs individuels

Personnes souhaitant commencer à contribuer : développeurs, assurance qualité (nouveau code ou correctifs), mais aussi spécialistes métier, conformité ou risques (règles, documentation, recueil d’exigences).

- #### Opérateurs de hub

En général des organisations, des particuliers ou des administrations qui souhaitent déployer leur propre switch Mojaloop au sein de l’écosystème.

- #### Équipes d’implémentation

Équipes pouvant aider banques, administrations, opérateurs mobiles ou caisses de crédit à déployer Mojaloop.

## Comment contribuer ?

* Lisez et familiarisez-vous avec nos [processus d’ingénierie produit](./product-engineering-process.md)
  et les [processus de revue de conception et de code Mojaloop](./design-review.md).
* Consultez le [guide de déploiement Mojaloop](https://docs.mojaloop.io/documentation/deployment-guide/) et
  le [guide d’intégration](https://github.com/mojaloop/mojaloop/blob/master/onboarding.md).
* Parcourez la [vue d’ensemble des dépôts](https://docs.mojaloop.io/documentation/repositories/) pour comprendre comment le
  code Mojaloop est organisé sur plusieurs dépôts GitHub.
* Prenez connaissance de nos [normes](../standards/guide.md) pour contribuer à ce projet.
* Suivez la [checklist nouveau contributeur](./new-contributor-checklist.md), explorez le tableau de projet et
  travaillez sur une [bonne première issue](https://github.com/mojaloop/project/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22).
* Consultez la [feuille de route](../mojaloop-roadmap.md) et participez aux opportunités à venir.
* Lisez le [code de conduite](./code-of-conduct.md) de la communauté.

## De quel travail a-t-on besoin ?

Mojaloop suit un [processus d’ingénierie produit](./product-engineering-process.md) structuré et entretient une
[feuille de route](../mojaloop-roadmap.md) de développements et de maintenance. Les fils de travail officiels en cours sont décrits sur la
[page centrale des workstreams communautaires](https://community.mojaloop.io/pi-24-workstreams).

Chaque fil de travail maintient un backlog dans GitHub et un espace ZenHub ; contactez le responsable du fil ou écrivez sur le canal Slack du fil pour vous présenter et trouver un bon ticket.

Vous trouverez les coordonnées des responsables et les canaux Slack sur la
[page centrale des workstreams](https://community.mojaloop.io/pi-24-workstreams).

## Où obtenir de l’aide ?

Rejoignez les [discussions Slack Mojaloop](https://join.slack.com/t/mojaloop/shared_invite/zt-1qy6f3fs0-xYfqfIHJ6zFfNXb0XRpiHw) pour échanger avec d’autres développeurs.

Voir aussi la [FAQ](https://github.com/mojaloop/documentation/blob/master/contributors-guide/frequently-asked-questions.md).

## Quelle est la release en cours ?

Consultez le [canal Annonces Slack Mojaloop](https://mojaloop.slack.com/messages/CG3MAJZ5J) pour la dernière release.

## Qu’est-ce qui est fourni ou non ?

C’est du code libre sous [licence Apache 2.0](https://github.com/mojaloop/mojaloop/blob/master/LICENSE.md).

Le code est publié en Apache 2.0 ; les documents de spécification du dépôt « mojaloop-specification » sont publiés sous licence CC BY-ND 4.0.

Nous ne fournissons pas de serveurs de production : c’est à vous. Vous êtes libre (et encouragé) de cloner ces dépôts, de participer à la communauté et de contribuer au code.

Nous ne cherchons pas à remplacer les portefeuilles mobiles ou les fournisseurs de services financiers. Nous fournissons une plateforme pour relier des fournisseurs via un schéma commun. Il existe des services centraux (identification du fournisseur du client, devis, exécution, règlement net différé, lutte contre la fraude partagée). Chaque fournisseur peut les utiliser pour envoyer et recevoir de l’argent sur le système, sans frais d’intégration des nouveaux fournisseurs. Nous fournissons du code d’exemple pour un fournisseur d’argent mobile simple pour illustrer l’intégration ; cet exemple DFSP n’est pas un fournisseur de production.

## Où signaler bugs, questions et retours ?

Pour les bugs : [Reporting bugs](https://github.com/mojaloop/mojaloop/blob/master/contribute/Reporting-Bugs.md).

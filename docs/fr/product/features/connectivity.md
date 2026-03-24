---
sidebarTitle: Raccordement des DFSP
---

# Intégration des DFSP

En principe, la définition et la documentation des [API Mojaloop](./transaction.md#mojaloop-apis) devraient suffire pour permettre aux DFSP de se connecter à un Hub Mojaloop. Toutefois, dans le cadre de la mission de la communauté Mojaloop en faveur de l’inclusion financière, il est depuis longtemps considéré que la clé pour réduire le coût et la complexité du raccordement du système d’information d’un DFSP à un Hub Mojaloop réside dans une offre de solutions de connectivité, permettant à chaque DFSP de choisir l’approche la mieux adaptée. Ces éléments sont complétés par un *DFSP Onboarding Playbook*, qui décrit les processus métier nécessaires à l’intégration d’un DFSP.

## Intégration métier

De nombreuses étapes de l’intégration d’un DFSP à un Hub Mojaloop ne relèvent pas de la technologie ; elles sont traitées dans le DFSP Onboarding Playbook.

Ce playbook, offert par Thitsaworks, rassemble des outils et modèles pour aider à planifier et exécuter un déploiement Mojaloop, en se concentrant sur l’intégration des DFSP. Les éléments proposés sont :
- un modèle de plan de travail, avec des exemples issus de déploiements passés ;
- un cas de test de bout en bout, ici pour l’intégration côté bénéficiaire ;
- un formulaire d’évaluation technique, pour définir l’assistance technique dont les DFSP candidats ont besoin ;
- une liste de contrôle d’intégration technique ;
- un modèle de cartographie des API, pour relier les éléments d’API du Hub Mojaloop aux actions correspondantes du système d’information du DFSP ;
- un plan de mise en place de la sécurité de la connexion du DFSP au Hub Mojaloop.

Vous pouvez [télécharger le DFSP Onboarding Playbook de Thitsaworks via ce lien](https://github.com/mojaloop/product-council/tree/main/Documentation/DFSP%20Playbook).

## Intégration technique

L’offre actuelle de connectivité comprend l’Integration Toolkit (ITK), qui permet à un intégrateur système (SI) de créer une connexion en assemblant les composants du toolkit de la manière la plus adaptée aux besoins du DFSP. Ces éléments incluent notamment :
  - Mojaloop Connection Manager (MCM) ;
  - Mojaloop Connector (pour l’intégration au Hub Mojaloop) ;
  - un ensemble d’exemples de Core Connectors (pour le lien avec le système d’information du DFSP) ;
  - de la documentation, dont des guides pratiques et des modèles.

Pour les DFSP de grande taille, la communauté Mojaloop propose Payment Manager en alternative à l’ITK. Également appelé Payment Manager for Mojaloop (PM4ML), il offre l’ensemble des fonctionnalités et de la flexibilité qu’une grande banque peut exiger.

Les différents outils de connectivité pour intégrer un DFSP à un Hub Mojaloop sont détaillés dans les [mini-guides](./connectivity/participation_tools_mini_guides.md) ; le choix de solution selon le type de participant et les exigences est présenté dans la [matrice des fonctionnalités par participant](./connectivity/participant-matrix.md).

Tous les DFSP doivent avoir à l’esprit que les bénéfices d’une solution de paiement instantané inclusive comme Mojaloop reposent sur une démarche « écosystème complet » : il faut étendre la portée du service Mojaloop dans le périmètre des DFSP, leur offrant ainsi à eux et à leurs clients la garantie de finalité des transactions, des coûts plus bas et une exécution fiable de chaque transaction valide.

Notez que le mode de déploiement de l’ITK influe sur le type de service qu’un DFSP peut offrir à ses clients, comme le soulignent les [mini-guides](./connectivity/participation_tools_mini_guides.md). Les options les plus exigeantes en ressources conviennent aux DFSP à fort débit et à fortes exigences de disponibilité ; une option modérée limite débit et disponibilité et peut mieux convenir aux DFSP moyens ou petits ; l’option la plus sobre impose des limites strictes sur le débit et la disponibilité et supprime la possibilité d’initier des paiements de masse, et ne convient donc qu’aux petits DFSP.

## Applicabilité

La présente version de ce document correspond à Mojaloop version [17.1.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0).

## Historique du document
  |Version|Date|Auteur|Détail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.4|17 décembre 2025| Paul Makin |Ajout du lien vers les mini-guides ; précisions sur le rôle de l’ITK|
|1.3|6 novembre 2025| Paul Makin|Lien vers le DFSP Onboarding Playbook de Thitsaworks|
|1.2|9 juin 2025| Tony Williams|Référence à la matrice des fonctionnalités par participant|
|1.1|14 avril 2025| Paul Makin|Mises à jour liées à la sortie de la V17|
|1.0|5 février 2025| Paul Makin|Version initiale|

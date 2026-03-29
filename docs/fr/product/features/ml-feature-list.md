---
sidebarTitle: Introduction Mojaloop
---

# Introduction à Mojaloop 

Mojaloop est un logiciel open source de paiements instantanés qui interconnecte des institutions financières hétérogènes pour favoriser l’inclusion financière et une gestion robuste des risques pour tous les participants. Il est disponible pour quiconque souhaite mettre en œuvre et exploiter un schéma de paiements instantanés inclusif (SIIP).

## Point de vue des régulateurs et des opérateurs
Mojaloop fournit les fondations pour qu’un opérateur mette en place un système de paiements instantanés inclusif (SIIP), en s’intégrant à un partenaire de règlement — souvent le RTGS national, d’autres mécanismes étant possibles. Ainsi, Mojaloop permet d’offrir un service complet d’interopérabilité de paiements aux institutions financières (IF) participantes.

Une fois déployé, Mojaloop permet à l’opérateur de schéma de :
- intégrer, suspendre ou réactiver les IF participantes selon les besoins ;
- fixer des plafonds de débit net par participant pour piloter risque et liquidité ;
- choisir et exploiter le modèle de règlement le plus adapté aux exigences du schéma et nationales ;
- définir plusieurs périodes de règlement dans la journée opérationnelle, la clôture de chaque période générant un fichier de règlement (selon le modèle retenu) pour action du partenaire de règlement.

Le Hub Mojaloop soutient ces fonctions en :
- traitant en continu 24h/24 et 7j/7 les paiements entre IF débitrices et créditrices ;
- mettant à jour en temps réel la position de chaque participant à chaque débit et crédit ;
- validant chaque paiement (liquidité suffisante, respect du plafond de débit net du participant), en rejetant les transactions non conformes ;
- mettant à jour les positions en fin de chaque fenêtre de règlement pour refléter les fonds réglés.

Mojaloop prend aussi en charge un **modèle de participation indirecte**, pour élargir l’accès aux petites institutions — notamment des acteurs non bancaires comme les IMF — non éligibles à une participation directe au RTGS national, tout en préservant la stabilité financière.


## Perspective technique

Pour délivrer le SIIP décrit ci-dessus, Mojaloop met en œuvre un ensemble de fonctions cœur :

  |Résolution d’alias|Compensation|Règlement|
|:--------------:|:--------------:|:--------------:|
|Résolution d’adresse ou **d’alias** du bénéficiaire, pour identifier de façon fiable l’institution détentrice du compte — et donc le bon compte bénéficiaire|**Compensation** des paiements de bout en bout, avec des garanties qui lèvent tout doute sur la réussite d’une transaction|Orchestration du **règlement** des transactions compensées entre institutions selon un modèle convenu entre elles et un calendrier prédéfini.|

&nbsp;

Ces fonctions s’appuient sur des [caractéristiques distinctives](./transaction.md#unique-transaction-characteristics), qui font de Mojaloop un système de paiements instantanés inclusif à coût maîtrisé :

1.  **Un flux transactionnel en trois phases** :
	+  **Découverte**, lorsque le DFSP du payeur collabore avec le Hub Mojaloop pour déterminer où envoyer le paiement et éviter les erreurs de routage. L’alias est résolu vers un DFSP bénéficiaire précis et, avec ce DFSP, un compte individuel.

	 + **Accord sur les conditions (cotation)**, lorsque les deux DFSP conviennent que la transaction peut avoir lieu (avec par exemple des restrictions liées à un KYC par paliers) et à quelles conditions (dont frais), **avant** tout engagement de l’un ou l’autre.

	+  **Transfert**, lorsque la transaction entre les deux DFSP (et, par procuration, les comptes clients) est compensée, avec la garantie que les deux parties partagent la même vision en temps réel du succès ou de l’échec.
&nbsp;

2.  **La non-répudiation de bout en bout** garantit à chaque partie qu’un message n’a pas été modifié et provient bien de l’émetteur déclaré. Mojaloop s’en sert pour n’engager une transaction que si *les deux* DFSP payeur et bénéficiaire l’acceptent, sans qu’aucun puisse la nier. Aucun tiers ne peut non plus altérer la transaction.
3.  **L’API PISP est exposée par le Hub Mojaloop**, et non par chaque DFSP. Une fintech se connecte au Hub et accède **immédiatement** à **tous** les DFSP raccordés. 

**Note** Dans le vocabulaire Mojaloop, un DFSP (*Digital Financial Service Provider*) désigne toute institution financière, quelle que soit sa taille ou son statut, capable d’opérer par voie numérique — de la plus grande banque internationale à la plus petite IMF ou opérateur de portefeuille mobile. Le terme « DFSP » est utilisé dans tout ce document.   
&nbsp;

# L’écosystème Mojaloop
## Le cœur
Pour lire ce document, il est utile de connaître la terminologie des acteurs et leurs interactions. Le schéma suivant donne une vue d’ensemble de l’écosystème Mojaloop.

![Écosystème Mojaloop](./ecosystem.svg)

## Services superposés
Autour du cœur illustré ci-dessus s’ajoutent des services superposés, eux aussi dans le progiciel open source Mojaloop complet :
- le **Account Lookup Service** (ALS) et des oracles utilisés par l’ALS pour la résolution d’alias ;
- des **portails**, construits sur le Business Operations Framework, pour que l’opérateur du hub gère le Hub Mojaloop ;
- un module **Paiements commerçants**, pour l’enregistrement des commerçants et l’émission d’identifiants commerçants, y compris la génération de QR scannables pour initier une transaction commerçant ;
- le **Testing Toolkit** (TTK), pour simuler tout aspect de l’écosystème cœur Mojaloop et faciliter développement, intégration et tests ;
- l’**Integration Toolkit** (ITK), dans la bibliothèque [support de connectivité](./connectivity.md), pour le lien entre un DFSP et un Hub Mojaloop ;
- l’**intégration ISO 8583**, pour raccorder des DAB (ou un commutateur DAB) au Hub Mojaloop pour les retraits d’espèces ;
- l’[**intégration MOSIP**](https://www.mosip.io), pour router les paiements vers une identité numérique basée sur MOSIP plutôt que vers (par exemple) un numéro de téléphone mobile.

## Liste des fonctionnalités

Ce document présente une liste de fonctionnalités couvrant les aspects suivants de Mojaloop :

-   [**Cas d’usage**](./use-cases.md), pour les cas pris en charge par tout déploiement Mojaloop.
-   [**Transactions**](./transaction.md), pour les API Mojaloop, le déroulement d’une transaction et les particularités adaptées à un service de paiements instantanés inclusif.

-   [**Gestion des risques**](./risk.md), pour les mesures évitant tout risque de contrepartie entre DFSP d’un schéma Mojaloop et protégeant l’intégrité du schéma.

-  [**Support de connectivité**](./connectivity.md), pour les outils et options d’intégration simple des DFSP participants.

-  [**Portails et fonctions opérationnelles**](./product.md) : portails de gestion des utilisateurs et des services, configuration et exploitation d’un Hub Mojaloop.
-  [**Frais et tarifs**](./tariffs.md) : mécanismes pour différents modèles tarifaires et possibilités de facturation pour participants et opérateurs de hub.

-  [**Performance**](./performance.md), pour les ordres de grandeur de performance transactionnelle attendus. 
- [**Déploiement**](./deployment.md), pour les modes de déploiement selon l’objectif et les outils associés. 
- [**Sécurité**](./security.md), pour la sécurité des transactions entre DFSP et Hub, celle du Hub (y compris portails opérateur), et le cadre QA en cours pour valider sécurité et qualité d’un déploiement.
- [**Principes d’ingénierie**](./engineering.md) : respect de la spécification Mojaloop, qualité du code, pratiques de sécurité, schémas d’évolutivité et de performance, etc.

-   [**Invariants**](./invariants.md), pour les principes de développement et d’exploitation auxquels toute implémentation Mojaloop doit se conformer, y compris pour la sécurité et l’intégrité du déploiement.

&nbsp;
## Développement continu
Aucun logiciel n’est jamais terminé, et Mojaloop ne fait pas exception : nouvelles fonctionnalités, API, portails, maintenance, vigilance sécurité.

La feuille de route Mojaloop priorise ces besoins dans le temps sous forme de workstreams, chacun avec un responsable et des contributeurs.

Vous pouvez consulter l’état actuel des workstreams et leurs derniers comptes rendus dans la section [**Développement en cours**](./development.md).

# À propos de ce document

## Objectif

Ce document recense les fonctionnalités de Mojaloop, indépendamment de l’implémentation. Il vise à informer les adoptants potentiels des capacités attendues et, le cas échéant, du fonctionnement prévu, ainsi qu’à informer les développeurs des exigences pour qu’une implémentation soit reconnue comme instance officielle Mojaloop.

La Mojaloop Foundation (MLF) définit comme instance officielle Mojaloop une implémentation qui met en œuvre **toutes** les fonctionnalités, sans exception, et réussit la batterie de tests standard Mojaloop.

## Applicabilité

La présente version de ce document correspond à Mojaloop version [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0).

## Historique du document
  |Version|Date|Auteur|Détail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.5|4 décembre 2025| Paul Makin|Ajout de la sous-section « Développement continu »|
|1.4|28 août 2025| Paul Makin|Ajout du point de vue « Régulateurs et opérateurs »|
|1.3|23 juin 2025| Paul Makin|Ajout du texte et du schéma sur l’écosystème|
|1.2|14 avril 2025| Paul Makin|Mises à jour liées à la sortie de la V17|

---
Authors: Lewis Daly, Matthew De Haast, Samuel Kummary
Proposal Name: Mojaloop Versioning Proposal
Solution Proposal Status: Draft
Created: 26-Feb-2020
Last Updated: 17-Mar-2020
Approved/Rejected Date: N/A
---

# Versionnement Mojaloop — une proposition

_Note : ce document est un brouillon vivant de proposition de versionnement au sein de Mojaloop. Une fois prêt, il sera soumis au CCB pour approbation._

## Vue d’ensemble

L’objectif est de produire une proposition qui garde le schéma de versionnement simple à utiliser et clair sur la compatibilité, tout en couvrant les détails nécessaires à un écosystème Mojaloop.

Objectif :
Proposer une norme pour une nouvelle « Mojaloop Version », qui regroupe :
1. Helm : versions des services individuels, versions des composants de supervision
2. Versions d’API : FSPIOP API, Hub Operations / Admin API, Settlement API
3. Versions de schémas internes : schéma de base de données et messagerie interne

## Stratégies de versionnement / contexte (revue de littérature)

Comment les systèmes actuels gèrent-ils le versionnement ? Aperçu rapide.
* La plupart des bonnes pratiques suivent le versionnement sémantique pour les API ; voir [#1198](https://github.com/mojaloop/project/issues/1198)

### Approches de déploiement sans interruption avec Kubernetes [5]

Observations clés :
* pour permettre les retours arrière, les services doivent être compatibles en avant et en arrière.
les versions d’application consécutives doivent être compatibles au niveau schéma
* « Ne jamais déployer de changements de schéma rupteurs », les séparer en plusieurs déploiements

Par exemple, à partir d’une table PERSON :
```
PK  ID
    NAME
    ADDRESS_LINE_1
    ADDRESS_LINE_2
    ZIPCODE
    COUNTRY
```

Et nous souhaitons la normaliser en deux tables PERSON et ADDRESS :

```
#person
PK  ID
    NAME

#address
PK  ID
FK  PERSON_ID
    ADDRESS_LINE_1
    ADDRESS_LINE_2
    ZIPCODE
    COUNTRY
```

Si ce changement était fait en une seule migration, deux versions de l’application ne seraient pas compatibles. Les changements de schéma doivent être découpés :
1. Créer la table ADDRESS
    * L’app utilise les données PERSON comme avant
    * Déclencher une copie des données vers ADDRESS
2. ADDRESS devient la « source de vérité »
    * L’app utilise les données ADDRESS
    * Déclencher une copie des nouveaux ajouts vers ADDRESS vers PERSON
3. Arrêter la copie des données
4. Supprimer les colonnes superflues de PERSON

Cela signifie qu’un seul changement de schéma de base de données nécessite plusieurs versions d’application et plusieurs déploiements successifs.
* [5] note aussi la simplicité Kubernetes pour déployer ce type de changement
        * déploiements rolling upgrade
        * Astuce : s’assurer que le point de santé attend la fin des migrations !
* Q : comment faire de grands changements qui touchent à la fois le schéma et l’API ?
        * cela semble difficile et exige beaucoup de coordination
        * si mal conçu, un seul changement de schéma pourrait exiger que tous les DFSP soient alignés
             * d’où l’idée que la version d’API et la version de service devraient être indépendantes. On doit pouvoir
              déployer une nouvelle version de service (avec migration) tout en supportant une ancienne version d’API


### Utiliser un registre de schémas pour les messages Kafka [6]

* [6] propose des approches comme un registre de schémas pour Kafka, par ex. [Apache Avro](https://docs.confluent.io/current/schema-registry/index.html)
* Cela ajoute un niveau de « rigidité » aux messages produits et aide à imposer le versionnement
* Ajoute un composant « registre de schémas » qui garantit la conformité des messages. Cela n’impose pas à lui seul le versionnement, mais renforce les garanties sur les formats.

### Compatibilité arrière et avant [3], [4]

* « Le principe de robustesse : être libéral dans ce que l’on accepte et conservateur dans ce que l’on envoie ». Pour les API, cela implique une certaine tolérance côté consommateurs. [3]
* Compatibilité arrière vs incompatibilité arrière [4] :
    * En général, les ajouts sont considérés compatibles arrière
    * Supprimer ou renommer est incompatible arrière
    * C’est souvent au cas par cas ; la [doc de conception d’API Google](https://cloud.google.com/apis/design/compatibility) aide à lister les cas.

## Écosystème Mojaloop
En parlant de versionnement, il faut préciser que nous versionnons des interfaces pour différentes parties.

# Proposition
La section suivante décrit la proposition de versionnement.

## Une « Mojaloop Version »
Une Mojaloop Version **x.y**.z peut englober les versions des trois APIs (détail ci-dessous).
Dans **x.y**.z, « x » est la version majeure et « y » mineure, comme pour le standard FSPIOP ; « z » est le correctif ou une release avec le même x.y ; pour simplifier, il faut regrouper tous les composants de l’écosystème pour indiquer ce qui est inclus.

En pratique Mojaloop version **x.y** inclut
1. Mojaloop FSPIOP API
    * Maintenue par le CCB (Change Control Board)
    * Format x.y
    * Actuellement v1.0, v1.1 et v2.0 en pipeline
2. Settlement API
    * Maintenue par le CCB
    * Format x.y
    * Actuellement v1.1 et v2.0 en pipeline
3. Admin / Operations API
    * Maintenue par le CCB
    * Format x.y
    * Peut utiliser v1.0
4. Helm
    * Maintenu par la Design Authority
    * Format x.y.z
    * Versionnement basé sur PI (Program Increment) + Sprint.
    > *Note :* le versionnement PI + Sprint a du sens dans le cadre actuel des Program Increments Mojaloop, mais devra être revu plus tard.
    * Regroupe des versions compatibles de services individuels
5. Schémas internes
    * Maintenus par la Design Authority
    * Schéma DB x.y
    * Schéma de messagerie interne (Kafka) x.y

| **Mojaloop** | x.y | | |
|---|---|---|---
|   | Propriétaire / mainteneur | Format | Signification |
| **APIs** | | | |
| - FSPIOP API | CCB | *x.y* | Majeur.Mineur |
| - Settlement API | CCB | *x.y* | Majeur.Mineur |
| - Admin/Operations API | CCB | *x.y* | Majeur.Mineur |
| Helm | Design Authority  | *x.y.z* | PI.Sprint.Incrément |
| **Schémas internes** | | | |
| - Schéma DB | Design Authority | *x.y* | Majeur.Mineur |
| - Messagerie interne | Design Authority | *x.y* | Majeur.Mineur |



Par exemple : Mojaloop 1.0 inclut
1. APIs
    * FSPIOP API v1.0
    * Settlements API v1.1
    * Admin API v1.0
2. Helm v9.1.0
    * Versions des services individuels
    * Versions des composants de supervision
3. Schémas internes
    * Schéma DB v1.0
    * Version messagerie interne v1.0

| **Mojaloop** | v1.0 | | |
|---|---|---|---
|   | Propriétaire / mainteneur | Version |
| **APIs** | | | |
| - FSPIOP API | CCB | *1.0* |
| - Settlement API | CCB | *1.1* |
| - Admin/Operations API | CCB | *1.0* |
| Helm | Design Authority  | *9.1.0* |
| **Schémas internes** | | | |
| - Schéma DB | Design Authority | *1.0* |
| - Messagerie interne | Design Authority | *1.0* |

### Avantages

1. La stratégie privilégie la simplicité. Une version donnée — Mojaloop v1.0 — sert de référence commune aux trois APIs — FSPIOP, Settlements, Admin — ainsi qu’à la version Helm qui regroupe des services compatibles déployables ensemble.
Avec cela, les versions de schéma DB et messagerie interne indiquent si des changements ont eu lieu depuis la release précédente.
2. L’autre avantage, évident, est de répondre aux besoins de toutes les parties prenantes, qu’elles s’intéressent à une vue d’ensemble ou au détail. Grâce à la nature des versions majeures et mineures, utilisateurs et adopteurs pourront plus aisément appréhender les questions de compatibilité.

### Compatibilité
Comme décrit dans [la section 3.3 de l’API Definition v1.0](https://github.com/mojaloop/mojaloop-specification/blob/master/documents/API%20Definition%20v1.0.md#33-api-versioning), la compatibilité arrière est
indiquée par la version **majeure**. Toutes les versions partageant la même majeure doivent être compatibles ; des majeures différentes ne le seront probablement pas.

_Note importante : les opérateurs de hub devront probablement supporter plusieurs versions de la FSPIOP API en parallèle, car tous les participants ne peuvent pas monter de version simultanément._

## Décomposition de la « Mojaloop Version »
Cette section décompose la « Mojaloop Version » proposée et étaye la stratégie.

### APIs

La [spec Mojaloop](https://github.com/mojaloop/mojaloop-specification/blob/master/documents/API%20Definition%20v1.0.md#33-api-versioning) couvre déjà plusieurs choix de versionnement.

En pratique courante, plusieurs approches existent pour demander une version, y compris dans l’URL ; la spec le définit déjà via l’extension HTML vendor : [3.3.4.1 Http Accept Header](https://github.com/mojaloop/mojaloop-specification/blob/master/documents/API%20Definition%20v1.0.md#3341-http-accept-header)

Pour la négociation de version, la spec indique qu’en cas de version non prise en charge demandée par le client,
 une réponse HTTP 406 peut être renvoyée avec un message décrivant les versions prises en charge. [3.3.4.3 Non-Acceptable Version Requested by Client](https://github.com/mojaloop/mojaloop-specification/blob/master/documents/API%20Definition%20v1.0.md#3343-non-acceptable-version-requested-by-client)

Autre bonne pratique : préciser jusqu’où les clients peuvent cibler une version.
* En développement, beaucoup d’APIs permettent jusqu’au niveau BUGFIX, ex. vX.X.X
* En production, souvent limité aux majeures seulement, ex. v1, v2
* ex. Google API Platform ne supporte que les majeures
* Avec les nouveautés possibles en v1.1 de l’API Mojaloop, on pourrait vouloir permettre MAJEURE et MINEURE, ex. vX.X. À éviter en principe car les mineures doivent rester compatibles arrière

Les participants sur la même version MAJEURE de l’API doivent pouvoir interagir. Les majeures différentes ne le peuvent pas. Ex. un participant en v1.1 peut envoyer des transferts vers un autre en v1.0, mais pas vers un participant en v2.0.

### Helm
Cette section traite les interactions entre services Mojaloop dans un déploiement. Questions du type : une instance cent-ledger:v10.0.1 peut-elle parler à ml-api-adapter:v10.1.0 ? Et ml-api-adapter:v11.0.0 ? Ou comment cent-ledger:v10.0.1 et v10.1.0 accèdent-ils à la base en parallèle ?

Deux cas :
1. Interactions avec l’état persisté — bases MySQL Percona
2. Interactions entre services — Apache Kafka et (certaines) APIs internes

Il faut donc versionner :
* le schéma de base de données
* les messages dans Apache Kafka
    * s’assurer que les bons services lisent les bons messages. Ex. mojaloop/ml-api-adapter:v10
.1.0 publie-t-il des messages Kafka que mojaloop/central-ledger:v10.0.1 comprend ?
    * Q : si le format de message change de façon incompatible, comment éviter que des messages dans les flux Kafka
 soient consommés par les mauvais services ?

### Schémas internes

#### Base de données

todo : à compléter ?

#### Kafka / messagerie
Nous utilisons actuellement le protocole lime pour les formats Kafka : https://limeprotocol.org/

Voir aussi le readme mojaloop/central-services-stream pour le format des messages.

Le protocole lime prévoit un champ type, qui supporte des déclarations de type MIME. On pourrait gérer les messages comme pour l’API (ex. application/vnd.specific+json). Versionner ainsi implique que les consommateurs soient compatibles en avant et en arrière (versions consécutives compatibles schéma).
* Q. mettre la version dans le topic Kafka ?
    * Ex. ml-api-adapter publie sur le topic prepare
    * Avec versionnement, ml-api-adapter:v10.0.0 publie sur prepare_v10.0, et une nouvelle instance
     ml-api-adapter:v10.1.0 sur prepare_v10.1.
    * les abonnés choisissent le(s) topic(s) ou les deux selon tolérance
    * effets de bord possibles sur les performances
* Autre option : un « adaptateur » de messages dans le déploiement. Si ml-api-adapter:v10.1.0 produit sur prepare_v10.1 sans central-ledger correspondant, un adaptateur s’abonne à prepare_v10.1, reformate en compatible arrière, et republie sur prepare_v10.0.

Cela permettrait des changements de schéma incrémentaux pendant la montée de version des services.

En somme, je n’ai pas trouvé grand-chose sur ce sujet ; il faudra y revenir ultérieurement.

## Négociation de version
todo : @sam discuter de la stratégie de négociation de version

## Support long terme (LTS)
todo : discuter comment le LTS s’intègre. Pas trop de détail, plutôt une esquisse.

Mentionner le (manque de) LTS actuel, le rythme des PI

## Annexe A : définitions

* **service** : Mojaloop suit une approche orientée microservices, où une grande application est décomposée en services plus petits. Dans ce contexte, Service désigne une application conteneurisée dans un déploiement Mojaloop, typiquement un conteneur Docker dans un cluster Kubernetes. ex. mojaloop/central-ledger est le service central-ledger
* **version de service** : version du service. Ne suit pas encore le versionnement sémantique ; pourrait évoluer
 ex. mojaloop/central-ledger:v10.0.1. Voir le [doc
 Versioning](https://github.com/mojaloop/documentation/blob/master/contributors-guide/standards/versioning.md).
* **helm** : gestionnaire de paquets pour Kubernetes. Souvent appelé aussi « déploiement ». Un déploiement Helm exécute plusieurs services et PEUT exécuter plusieurs versions du même service. On utilise aussi le dépôt mojaloop/helm.
* **version helm** : version du chart packagé, ex. mojaloop/helm:v1.1.0
* **interface** : protocole par lequel un switch Mojaloop interagit avec l’extérieur — participants (DFSP), opérateurs de hub, administrateurs.
* **api** : interface de programmation — souvent le FSPIOP-API défini [ici](https://github.com/mojaloop/mojaloop-specification).
* **version d’api** : version du FSPIOP-API, ex. FSPIOP-API v1. Ici, contrat entre le switch Mojaloop et les participants (DFSP) qui implémentent le FSPIOP-API

## Références

[1] LTS dans nodejs — bon exemple de stratégie LTS et communication.
[2] Référence Semantic Versioning
[3] https://www.ben-morris.com/rest-apis-dont-need-a-versioning-strategy-they-need-a-change-strategy/
[4] https://cloud.google.com/apis/design/compatibility
[5] Nicolas Frankel - Zero-downtime deployment with Kubernetes, Spring Boot and Flyway
[6] Stackoverflow - Kafka Topic Message Versioning

# Séquence de mise à jour des dépôts NodeJS Mojaloop

Ce document indique l’ordre dans lequel les dépôts NodeJS Mojaloop doivent être mis à jour lors de la publication de nouvelles fonctionnalités et/ou de la maintenance de Mojaloop. Il est important de respecter cet ordre pour s'assurer que chaque service d'une publication Mojaloop utilise la bonne dépendance du dépôt Mojaloop. Ce document est à jour pour Mojaloop RC v17 ; il doit être mis à jour au fil de l'évolution de Mojaloop (ajout des nouveaux composants et retrait des composants supprimés).

## Table des matières

- [Ordre de mise à jour des dépôts Mojaloop](#ordre-de-mise-à-jour-des-dépôts-mojaloop)
  - [Table des matières](#table-des-matières)
  - [Catégories de dépôts](#catégories-de-dépôts)
  - [Processus de mise à jour](#processus-de-mise-à-jour)
  - [Exigences de test](#exigences-de-test)
  - [Séquence des dépôts Mojaloop](#séquence-des-dépôts-mojaloop)

## Catégories de dépôts

Catégories des dépôts NodeJS Mojaloop :

1. **Bibliothèques Central Services**
   - `central-services-shared`
   - `central-services-error-handling`
   - `central-services-database`
   - `central-services-stream`
   - `central-services-metrics`
   - `central-services-error`
   - `central-services-logger`
   - `sdk-standard-components`

2. **Services principaux**
   - `account-lookup-service`
   - `quoting-service`
   - `central-ledger`
   - `central-settlement`
   - `central-bulk-transfers`
   - `transaction-requests-service`
   - `ml-api-adapter`

3. **Composants événementiels**
   - `central-event-processor`
   - `event-framework`
   - `event-stream-processor`
   - `elastic-apm-node`
   - `elastic-apm-node-opentracing`
   - `email-notifier`
   - `event-sidecar`

4. **Adaptateurs, SDK et API**
   - `sdk-scheme-adapter`
   - `event-sdk`
   - `thirdparty-sdk`
   - `bulk-api-adapter`
   - `thirdparty-api-svc`
   - `als-consent-oracle`
   - `als-oracle-pathfinder`

5. **Tests**
   - `ml-testing-toolkit`
   - `ml-testing-toolkit-client-lib`
   - `ml-testing-toolkit-ui`
   - `ml-testing-toolkit-shared-lib`
   - `mojaloop-simulator`
   - `simulator`

6. **Autres bibliothèques**
   - `api-snippets`
   - `auth-service`
   - `ml-number`
   - `object-store-lib`
   - `inter-scheme-proxy-cache-lib`
   - `database-lib`

## Processus de mise à jour

1. **Identifier les dépendances**
   - Utilisez `npm audit` pour repérer les vulnérabilités
   - Examinez les fichiers `package.json` pour les dépendances obsolètes
   - Vérifiez les changements cassants lors des mises à jour majeures

2. **Élaborer un plan de mise à jour**
   - Listez tous les dépôts à mettre à jour
   - Identifiez les changements cassants potentiels
   - Définissez la stratégie de test pour chaque composant

3. **Exécuter les mises à jour**
   - Commencez par les bibliothèques de base
   - Mettez à jour un dépôt à la fois
   - Lancez les tests après chaque mise à jour
   - Documentez les problèmes ou contournements

4. **Tests d’intégration**
   - Testez les composants mis à jour ensemble
   - Vérifiez le fonctionnement bout en bout
   - Contrôlez l’impact sur les performances (feuille de route, après v17)

## Exigences de test

Pour chaque dépôt, suivez les instructions de test du README et exécuter :

1. **Tests unitaires**
   - Exécutez la suite de tests existante
   - Ajoutez des tests pour les fonctionnalités modifiées
   - Vérifiez la couverture de tests

2. **Tests d’intégration**
   - Testez avec les services dépendants
   - Vérifiez la compatibilité des API
   - Contrôlez la gestion des événements

3. **Tests de bout en bout**
   - Passez par le testing toolkit Mojaloop
   - Vérifiez les flux de transaction
   - Testez les scénarios d’erreur


## Séquence des dépôts Mojaloop

Le tableau suivant détaille les dépôts Mojaloop et leurs dépendances. Ces informations sont essentielles pour comprendre le bon ordre de mise à jour lors du traitement de changements de dépendances ou de vulnérabilités.

| Ordre | Dépôt | Dépendances |
|---|---|---|
| 1 | api-snippets |  |
| 2 | ml-number |  |
| 3 | database-lib |  |
| 4 | central-services-logger |  |
| 5 | central-services-metrics |  |
| 6 | central-services-error-handling |  |
| 7 | ml-testing-toolkit-shared-lib |  |
| 8 | logging-bc-public-types-lib |  |
| 9 | platform-shared-lib-messaging-types-lib |  |
| 10 | elastic-apm-node |  |
| 11 | elastic-apm-node-opentracing |  |
| 12 | object-store-libp | central-services-logger |
| 13 | central-services-stream |  |
| 14 | central-services-health | central-services-error-handling, central-services-logger |
| 15 | event-sdk | central-services-stream, central-services-logger, central-services-stream |
| 16 | inter-scheme-proxy-cache-lib | central-services-logger, central-services-shared, inter-scheme-proxy-cache-lib, central-services-error-handling, central-services-logger, central-services-metrics, event-sdk |
| 17 | ml-schema-transformer-lib | central-services-error-handling, central-services-logger, central-services-shared, sdk-standard-components, ml-schema-transformer-lib |
| 18 | sdk-standard-components |  |
| 19 | central-services-shared |  |
| 20 | platform-shared-lib-nodejs-kafka-client-lib |  |
| 21 | logging-bc-client-lib |  |
| 22 | **account-lookup-service** | central-services-error-handling, central-services-health, central-services-logger, central-services-metrics, central-services-shared, central-services-stream, database-lib, event-sdk, inter-scheme-proxy-cache-lib, sdk-standard-components, sdk-standard-components, central-services-logger, central-services-shared, central-services-stream |
| 23 | **als-consent-oracle** | api-snippets, central-services-health, central-services-shared, sdk-standard-components, central-services-error-handling, central-services-logger, central-services-metrics, event-sdk |
| 24 | **als-oracle-pathfinder** | central-services-logger, central-services-shared |
| 25 | **auth-service** | api-snippets, central-services-health, central-services-shared, event-sdk, sdk-standard-components, central-services-error-handling, central-services-logger, central-services-metrics, event-sdk |
| 26 | **bulk-api-adapter** | central-services-error-handling, central-services-health, central-services-logger, central-services-metrics, central-services-shared, central-services-stream, event-sdk, object-store-lib |
| 27 | **central-event-processor** | central-services-error-handling, central-services-health, central-services-logger, central-services-metrics, central-services-shared, central-services-stream, event-sdk |
| 28 | **central-ledger** | central-services-error-handling, central-services-health, central-services-logger, central-services-metrics, central-services-shared, central-services-stream, database-lib, event-sdk, inter-scheme-proxy-cache-lib, ml-number, object-store-lib |
| 29 | **central-settlement** | central-ledger, central-services-database, central-services-error-handling, central-services-health, central-services-logger, central-services-shared, central-services-stream, event-sdk, ml-number |
| 30 | **email-notifier** | central-services-error-handling, central-services-health, central-services-logger, central-services-metrics, central-services-shared, central-services-stream, event-sdk |
| 31 | **event-sidecar** | central-services-logger, central-services-metrics, central-services-stream, event-sdk |
| 32 | **event-stream-processor** | central-services-health, central-services-logger, central-services-metrics, central-services-shared, central-services-stream, elastic-apm-node, elastic-apm-node-opentracing, event-sdk |
| 33 | **mojaloop-simulator** | central-services-logger |
| 34 | **ml-api-adapter** | central-services-error-handling, central-services-health, central-services-logger, central-services-metrics, central-services-shared, central-services-stream, event-sdk, sdk-standard-components, database-lib, inter-scheme-proxy-cache-lib |
| 35 | **ml-testing-toolkit** | central-services-logger, central-services-metrics, ml-schema-transformer-lib, ml-testing-toolkit-shared-lib, sdk-standard-components |
| 36 | **ml-testing-toolkit-client-lib** | central-services-logger, ml-testing-toolkit-shared-lib, sdk-standard-components |
| 37 | **ml-testing-toolkit-ui** | ml-testing-toolkit-shared-lib |
| 38 | **quoting-service** | central-services-error-handling, central-services-health, central-services-logger, central-services-metrics, central-services-shared, central-services-stream, event-sdk, inter-scheme-proxy-cache-lib, ml-number, sdk-standard-components |
| 39 | **simulator** (hérité, oracle ALS) | central-services-error-handling, central-services-logger, central-services-metrics, central-services-shared, event-sdk, sdk-standard-components |
| 40 | **sdk-scheme-adapter** | api-snippets, central-services-error-handling, central-services-logger, central-services-metrics, central-services-shared, event-sdk, sdk-standard-components |
| 41 | **thirdparty-api-svc** | api-snippets, central-services-shared, central-services-stream, central-services-error-handling, central-services-logger, central-services-metrics, event-sdk |
| 42 | **thirdparty-sdk** | api-snippets, central-services-error-handling, central-services-metrics, central-services-shared, sdk-scheme-adapter, sdk-standard-components |
| 43 | **transaction-requests-service** | central-services-error-handling, central-services-health, central-services-logger, central-services-metrics, central-services-shared, event-sdk, ml-testing-toolkit-shared-lib |

### Visualisation de la séquence de mise à jour

Le diagramme suivant illustre la séquence de mise à jour recommandée pour les dépôts Mojaloop, compte tenu des dépendances et des relations :

![Séquence de mise à jour des dépôts](./assets/diagrams/repositoryUpdate/repository-update-sequence.svg)

Ce diagramme donne une représentation visuelle de la séquence de mise à jour et montre :

1. Le regroupement logique des dépôts
2. Les dépendances entre les différents groupes
3. Les cas particuliers comme les dépendances circulaires
4. Les possibilités de mises à jour en parallèle
5. Les différents types de dépendances à prendre en compte

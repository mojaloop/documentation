---
sidebarTitle: Versions Mojaloop
title: Versions Mojaloop
---

# Processus de publication Mojaloop

Le processus de publication de Mojaloop suit une approche menée par la communauté, en particulier par les workstreams techniques, en collaboration et consultation avec le Conseil Produit et l’Autorité de Conception (DA).

La DA définit les politiques, lignes directrices et critères techniques pour les releases (tels que les métriques de qualité), tandis que le Produit définit les exigences fonctionnelles et celles liées au produit, lorsque cela s'applique. Cela est mis en œuvre par le(s) workstream(s) concerné(s).

## 1. Processus de publication Mojaloop
![YM8f9iPhGU1jAfr-dQUk4e34QMGPG1ZWnbmC4ERGpsqp70GJH2he2Nje4poq_dii642B82j-Cj-2-HuYTkEF4poIBg8rJSfWYagBVOMyt6PQs5_P2YRE9magU_jE](https://github.com/mojaloop/design-authority-project/assets/10507686/075e528c-d4b2-4100-a2b9-6d06d77155d0)

Événement communautaire (planification au niveau PI), workstreams, fonctionnalités, qualité de la release, tests, checklist, release candidate, exemple d’epic, publication

Le processus de release Mojaloop suit une :
- démarche menée par la communauté
- menée précisément par les workstreams techniques
- en collaboration et consultation avec le Conseil Produit
- et l’Autorité de Conception (DA)

Critères, directives :
La DA définit les politiques, lignes directrices et critères techniques pour les releases tandis que le Produit spécifie les exigences fonctionnelles et produit.
Exemple de notes de version et critères de la v17.0.0, [v17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0)

Les tests continuent après la sortie de la release : des tâches planifiées (cron jobs) journalières continuent à tourner jusqu'à la publication suivante, afin d'assurer la stabilité.

**Tâches actuelles et critères d'acceptation pour les releases Mojaloop (helm) :**

Exemple de story : [3122](https://github.com/mojaloop/project/issues/3122) , [3847](https://github.com/mojaloop/project/issues/3847)

Les décisions concernant les fonctionnalités à inclure, celles jugées prêtes et retenues, ne sont pas listées ici car elles interviennent en phases de planification (et selon les livrables attendus)

- [x] S’assurer que tous les services cœur et les services inclus dans la release respectent les standards concernant :
  - [x] Alertes Dependabot
  - [x] Fichiers de licence
  - [x] En-têtes de licence dans les sources
  - [x] Alertes Snyk
  - [x] Fichiers codeowners
  - [x] Règles de protection des branches principales vérifiées
  - [x] Revue des issues ouvertes
  - [x] Revue des pull requests ouvertes
  - [x] Revue des exceptions d’audit fournies et effacer/réduire de la liste
- [x] Mise à jour des manifests pour le workflow Github "Release Pull Request (PR)"
- [x] Valider le PR de release ainsi que le processus associé
- [x] Déployer les valeurs par défaut avec le RC dans l'environnement AWS moja*
  - [x] Valider que la collection GP passe à 100 %
  - [x] Valider que les tests FX et inter-schéma fonctionnent à 100 %
- [x] Déployer et valider le RC sur un second environnement
  - [x] Valider que la collection GP passe à 100 %
  - [x] Valider que les tests FX et inter-schéma fonctionnent à 100 %
- [x] Identifier les problèmes éventuels avec les scripts QA ; les corriger et retester
- [x] QA pour bugs, régressions, les consigner
- [x] Corriger les bugs remontés si critique
- [x] Valider avec la collection GP de TTK
- [x] Tester l’option de configuration "on-us" (changement en déploiement) et vérifier que les tests on-us passent
- [x] Publication du dépôt de scénarios de tests TTK
- [x] Notes de version pour le RC Helm rédigées
  - [x] Guide de migration depuis une version publiée (peut nécessiter une story séparée si suffisamment important / complexe)
- [x] Mise à jour des notes de version avec le lien du guide de stratégie de mise à jour
- [x] Release Helm publiée
- [x] Déploiement du Helm publié sur un environnement de dev
  - [x] Release Helm déployée sur dev avec succès
  - [x] Tests de régression sur dev avec collections TTK
    - [x] Collection GP
    - [x] Collection Core Bulk
    - [x] Collection Third-party
    - [x] Collection SDK Bulk
    - [x] Collection SDK R2P
    - [x] Tests mode ISO 20022
    - [x] Collection (ou tests) FX
    - [x] Collection tests inter-schéma
  - [x] Validation avec les tests de régression "Golden Path" de CGS
  - [x] Test de la capacité de mise à jour depuis la version précédente (v16.0.4 / v16.0.0)
- [x] Déploiement du Helm publié sur un environnement QA
  - [x] Release Helm déployée sur QA avec succès
  - [x] Validation avec tests de régression "Golden Path" sur QA
    - [x] Collection GP
    - [x] Collection Core Bulk
    - [x] Collection Third-party
    - [x] Collection SDK Bulk
    - [x] Collection SDK R2P
    - [x] Collection FX (ou tests)
    - [x] Tests mode ISO 20022
    - [x] Collection tests inter-schéma
- [x] Valider que les cronJobs quotidiens de GP sur dev/qa et les scripts de nettoyage s'exécutent correctement, ainsi que les scripts de nettoyage
- Valider la capacité à réaliser une mise à niveau depuis la version stable précédente, et en profiter pour identifier tout "piège" à gérer dans la release ou mettre à jour les notes de version (à la charge de la personne qui effectue la montée de version).


## 2. Processus de publication Mojaloop – évolutions proposées :

Proposer un calendrier de release et des échéances

1. Exemple : le gel des fonctionnalités pour une release majeure doit précéder d'au moins six semaines le prochain kick-off PI (ou événement communautaire)
1. Le gel des corrections de bugs (non critiques) doit intervenir quatre semaines avant la date de publication
1. Le RC doit être validé par au moins un intégrateur / utilisateur aval : Mini-loop, IaC, Core-test-harness ou un autre
1. La release peut être publiée dans les temps si aucun bug de priorité haute ou moyenne n'est ouvert dans le RC et si les validations sont faites sur un environnement de dev et par une équipe downstream
1. Harmoniser la numérotation des versions entre les différents composants de la plateforme Mojaloop, tel que le Finance Portal
1. Inclure des mesures de performance et des détails sur l'environnement de référence utilisé pour ces mesures
1. Ressources : capturer l'empreinte des ressources d'une publication de base
1. Documenter les mécanismes de support pour les releases Mojaloop

## 3. Contenu de la release Helm Mojaloop

Services Mojaloop prenant en charge les fonctionnalités cœur de la plateforme ainsi que d'autres services clés, sans oublier les outils nécessaires aux tests comme les simulateurs

Fonctionnalité principale avec options de configuration :
1. Recherche de comptes (Account Lookup)
    - Admin de recherche de comptes
    - Oracles
    - ALS (Account Lookup Service)
2. Devis (Quoting)
    - Prise en charge des modes persistant/passe-plat (paramétrable)
3. Transferts (Clearing)
    - Prise en charge des transferts on-us (paramétrable)
4. Règlement (Settlement)
    - Prise en charge de plusieurs types, granularités, fréquences
5. Requêtes de transaction (fonctionnalité Request-to-pay)
6. Services 3PPI (Interface Fournisseur Tiers)
7. Couche API — pour parties, devis, transferts et requêtes de transaction
8. Notifications
    - ML-API-Adapter
9. Conversion de devises
10. Fonctionnalités étendues
    - Central Event Processor
    - Email Notifier (avant la version 15)
    - Suivi et surveillance (Traceability & Monitoring)
    - Instrumentation
11. Audit
    - Capacités d’audit étendues
12. Services de support & outils pour tests
    - ML TTK (Testing Toolkit)
    - ML Simulator
    - SDK-Scheme-Adapters
    - Instances Payment Manager
13. Adaptateurs de schéma tiers
    - Intégration avec des schémas tiers
14. Gestion du cycle de vie des participants
    - Création de participants
    - Mise à jour de participants
15. Support aux participants
    - Outils simples d'utilisation pour les adoptants (Exemple : [SDK-Scheme-Adapter](https://github.com/mojaloop/sdk-scheme-adapter), [Integration Toolkit](https://github.com/mojaloop/integration-toolkit/tree/main))
    - Fonctionnalités et support d'intégration

## 4. Plateforme Mojaloop
1. Release principale Mojaloop (helm) et configuration avec :
    - Moteur central de compensation incluant la prise en charge du Bulk
    - Quoting
    - Recherche de comptes et ses composants associés
    - Moteur de règlement
    - Couche API
    - La prise en charge du pour request-to-pay (requêtes de transaction)
    - Gestion du cycle de vie des participants
    - Réf : Release Helm Mojaloop (exemple : v15.1.0)
2. Fonctionnalité PISP / 3PPI
3. Gateway(s) API
    - Assurer une couche API sécurisée
    - Fournir entrée, sortie (Ingress/Egress), filtrage IP, pare-feux
    - Prise en charge des mécanismes de sécurité : JWS, mTLS
    - Référence : WSO2
4. Composants de sécurité :
    - HSM si pertinent/utilisé
    - Gestion des identités & accès
    - Gestion des certificats
    - Gestion des connexions
5. Portail Finance, Reporting
    - Portails pour les équipes d’Opérations du Hub, Ops métier
    - Portails et capacités pour équipes techniques d’Ops
    - Réf : FP v3 basé sur le Business Operations Framework
6. Prise en charge de monitoring :
    - Support opérationnel et traçabilité (ex : EFK, Prometheus, Grafana, Loki)
    - IaC utilise Grafana, Prometheus et Loki
7. Utiliser IaC comme référence, exemple : https://github.com/mojaloop/iac-modules/releases/tag/v5.7.0



## Releases actuelles

> *Remarque : Les versions ci-dessous sont les dernières versions publiées pour chaque artefact de release distinct, à titre de référence. Consultez les notes de version de la release Helm pour savoir quelles versions sont incluses dans la version [Helm Charts Packaged Release](#helm-charts-packaged-releases).*

* Helm : [![Git Releases](https://img.shields.io/github/release/mojaloop/helm.svg?style=flat)](https://github.com/mojaloop/helm/releases)
* Central-Ledger : [![Git Releases](https://img.shields.io/github/release/mojaloop/central-ledger.svg?style=flat)](https://github.com/mojaloop/central-ledger/releases)
* Ml-API-Adapter : [![Git Releases](https://img.shields.io/github/release/mojaloop/ml-api-adapter.svg?style=flat)](https://github.com/mojaloop/ml-api-adapter/releases)
* Account-Lookup-Service : [![Git Releases](https://img.shields.io/github/release/mojaloop/account-lookup-service.svg?style=flat)](https://github.com/mojaloop/account-lookup-service/releases)
* Quoting-Service : [![Git Releases](https://img.shields.io/github/release/mojaloop/quoting-service.svg?style=flat)](https://github.com/mojaloop/quoting-service/releases)
* Transaction-Request-Service : [![Git Releases](https://img.shields.io/github/release/mojaloop/transaction-requests-service.svg?style=flat)](https://github.com/mojaloop/transaction-requests-service/releases)
* Bulk-API-Adapter : [![Git Releases](https://img.shields.io/github/release/mojaloop/bulk-api-adapter.svg?style=flat)](https://github.com/mojaloop/bulk-api-adapter/releases)
* Central-Settlement : [![Git Releases](https://img.shields.io/github/release/mojaloop/central-settlement.svg?style=flat)](https://github.com/mojaloop/central-settlement/releases)
* Central-Event-Processor : [![Git Releases](https://img.shields.io/github/release/mojaloop/central-event-processor.svg?style=flat)](https://github.com/mojaloop/central-event-processor/releases)
* Email-Notifier : [![Git Releases](https://img.shields.io/github/release/mojaloop/email-notifier.svg?style=flat)](https://github.com/mojaloop/email-notifier/releases)
* SDK-Scheme-Adapter : [![Git Releases](https://img.shields.io/github/release/mojaloop/sdk-scheme-adapter.svg?style=flat)](https://github.com/mojaloop/sdk-scheme-adapter/releases)
* Thirdparty-SDK : [![Git Releases](https://img.shields.io/github/release/mojaloop/thirdparty-sdk.svg?style=flat)](https://github.com/mojaloop/thirdparty-sdk/releases)
* Thirdparty-Api-Svc : [![Git Releases](https://img.shields.io/github/release/mojaloop/thirdparty-api-svc.svg?style=flat)](https://github.com/mojaloop/thirdparty-api-svc/releases)
* Auth-Svc : [![Git Releases](https://img.shields.io/github/release/mojaloop/auth-service.svg?style=flat)](https://github.com/mojaloop/auth-service/releases)
* ML-Testing-Toolkit : [![Git Releases](https://img.shields.io/github/release/mojaloop/ml-testing-toolkit.svg?style=flat)](https://github.com/mojaloop/ml-testing-toolkit/releases)
* ML-Testing-Toolkit-Ui : [![Git Releases](https://img.shields.io/github/release/mojaloop/ml-testing-toolkit-ui.svg?style=flat)](https://github.com/mojaloop/ml-testing-toolkit-ui/releases)

Pour une liste exhaustive des releases helm, veuillez consulter la [page des releases Helm](https://github.com/mojaloop/helm/releases).

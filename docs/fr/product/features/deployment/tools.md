---
sidebarTitle: Outils de déploiement
---

# Outils de déploiement Mojaloop

Ce document présente les trois options de déploiement de Mojaloop, classées par complexité et maturité production. Chaque outil correspond à des cas d’usage et des scénarios de déploiement précis.

## Core Test Harness {#core-test-harness}

<div style="display: flex; align-items: center; margin-bottom: 20px;">
    <div style="width: 20px; height: 20px; background-color: rgba(46, 204, 113, 0.3); margin-right: 10px;"></div>
    <span>Environnement de développement et de test</span>
</div>

Le Core Test Harness fournit un environnement de développement sur un seul nœud avec docker-compose. Il met en œuvre une pile Mojaloop minimale sans les composants production, ce qui le rend adapté au développement et aux tests.

> **Documentation technique :**  
> **LACUNE** — Pas de documentation technique dédiée identifiée pour le Core Test Harness. Références associées dans :
> - [Guide de déploiement — déploiement Helm des prérequis backend](../../../technical/technical/deployment-guide/README.md#_5-1-prerequisite-backend-helm-deployment) (mentionne des exemples docker-compose)
> - [Notes de version](../../../technical/technical/releases.md) (mentionne la validation du Core Test Harness)

### Détails de mise en œuvre

Le Core Test Harness s’exécute sur une machine unique en s’appuyant sur docker-compose pour l’orchestration. Il déploie les services cœur et les services sous-jacents sans composants de niveau production (passerelles, entrée/sortie, pile IAM, etc.). La mise en œuvre s’appuie sur des profils configurables pour gérer différents scénarios de déploiement.

Les besoins en ressources correspondent à un portable ou poste de travail milieu de gamme avec une mémoire suffisante pour l’orchestration des conteneurs. L’outil s’intègre aux pipelines CI pour les tests et validations automatisés.

### Flux de travail de développement

Les développeurs interagissent avec le Core Test Harness via les commandes docker-compose. L’outil prend en charge le développement local avec rechargement à chaud. La configuration passe par des variables d’environnement et des fichiers d’override docker-compose.

### Capacités de test

Le Core Test Harness permet les tests unitaires, d’intégration et de bout en bout des composants Mojaloop. Il offre un environnement contrôlé pour tester les interactions entre services et valider la logique métier.

## Déploiement HELM {#helm-deploy}

<div style="display: flex; align-items: center; margin-bottom: 20px;">
    <div style="width: 20px; height: 20px; background-color: rgba(230, 126, 34, 0.3); margin-right: 10px;"></div>
    <span>Solution de déploiement en production</span>
</div>

Le déploiement HELM fournit des capacités prêtes pour la production via les charts HELM. Cette mise en œuvre exige un cluster Kubernetes préconfiguré et satisfait aux exigences de sécurité et de performances de production.

> **Documentation technique :**  
> - [Guide de déploiement Mojaloop](../../../technical/technical/deployment-guide/README.md) — Documentation complète du déploiement HELM
> - [Guide de stratégie de mise à niveau](../../../technical/technical/deployment-guide/upgrade-strategy-guide.md) — Procédures de mise à niveau HELM  
> - [Dépannage du déploiement](../../../technical/technical/deployment-guide/deployment-troubleshooting.md) — Problèmes courants et solutions

### Exigences d’infrastructure

Le déploiement requiert :
- Un cluster Kubernetes durci
- Des politiques réseau et des paramètres de sécurité
- Des définitions de classes de stockage
- Des quotas et limites de ressources

### Spécifications de performance

La mise en œuvre doit respecter les critères suivants :
- Plus de 1000 TPS soutenus pendant une heure
- Latence au 99e percentile inférieure à 1 seconde pour :
  - Les opérations de compensation (*clearing*)
  - Les recherches (*lookup*)
  - L’accord sur les conditions (*Agreement of Terms*)
- Disponibilité de 99,99 %
- RTO/RPO nuls pour les opérations critiques

### Mise en œuvre de la sécurité

La sécurité comprend notamment :
- Application des politiques réseau
- Politiques de sécurité des pods
- Intégration d’un service mesh
- Gestion des secrets
- Gestion des certificats

## Infrastructure as Code {#infrastructure-as-code-iac}

<div style="display: flex; align-items: center; margin-bottom: 20px;">
    <div style="width: 20px; height: 20px; background-color: rgba(231, 76, 60, 0.3); margin-right: 10px;"></div>
    <span>Solution de déploiement d’entreprise</span>
</div>

La mise en œuvre Infrastructure as Code (IaC) offre une solution de déploiement complète pour plusieurs plateformes et couches d’orchestration. Elle applique des modèles GitOps pour gérer plusieurs instances de hub.

> **Documentation technique :**  
>  **LACUNE** — Documentation interne limitée pour l’installation et la configuration IaC
> - [Guide d’installation IaC](../../../getting-started/installation/installing-mojaloop.md) — Vue d’ensemble IaC de base (voir point 2)
> - [Article sur le déploiement IaC](https://infitx.com/deploying-mojaloop-using-iac) — Guide détaillé externe
> - [Dépôt plateforme AWS IaC](https://github.com/mojaloop/iac-aws-platform) — Mise en œuvre spécifique AWS

### Prise en charge des plateformes

La mise en œuvre prend en charge :
- Déploiement AWS via CloudFormation/Terraform
- Déploiement sur site via Terraform
- Déploiement multicloud via des modules fournisseurs-agnostes
- Plusieurs distributions Kubernetes :
  - Services Kubernetes managés
  - Microk8s
  - EKS

### Architecture du centre de contrôle

Le centre de contrôle applique GitOps pour :
- La gestion multi-environnements
- Le versionnement de la configuration
- L’automatisation du déploiement
- La gestion d’état
- La détection de dérive (*drift*)

### Déploiement des composants

La mise en œuvre déploie :
- Les services du centre de contrôle
- Les services cœur Mojaloop
- Les services sous-jacents
- Les applications portail
- L’infrastructure IAM
- La pile de supervision
- Les composants PM4ML

### Performance et sécurité

La mise en œuvre IaC impose :
- Des contrôles de sécurité de niveau production
- Des exigences de performance alignées sur le déploiement HELM
- Des configurations haute disponibilité
- Des procédures de reprise après sinistre
- Des exigences de conformité

## Historique du document
|Version|Date|Auteur|Détail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|5 juin 2025| Tony Williams|Ajout de liens vers la documentation technique| 
|1.0|14 mai 2025| Tony Williams|Version initiale|

---
sidebarTitle: Cadre QA
---

# Workstream Cadre QA

L’objectif est de développer un cadre QA pour valider la configuration, les fonctionnalités, la sécurité, la préparation à l’interopérabilité et les performances d’un déploiement. Il pourra servir à l’auto-évaluation des adopteurs ou à un examen externe pour rassurer autorités de tutelle et participants.

Suite à la livraison du cadre d'assurance qualité (QA) chez Mojacom 30, le groupe de travail a entrepris d'élaborer une version de ce cadre lisible par machine, afin de tirer parti de l'automatisation du processus d'assurance qualité.

# Justification métier

Un cadre QA offre une approche cohérente pour évaluer qualité et maturité des déploiements Mojaloop, y compris par des évaluations indépendantes de résilience, sécurité et intégrité fonctionnelle. Une démarche structurée permet :

- aux équipes de déploiement d’identifier et combler les lacunes tôt ;
- aux participants d’évaluer la préparation opérationnelle avant intégration ;
- aux régulateurs d’interpréter la qualité d’implémentation à partir d’éléments objectifs ;
- à la communauté Mojaloop de partager les bonnes pratiques et d’aligner les attentes minimales.

## Contributeurs
|Responsable du workstream|Contributeurs|
|:--------------:|:--------------:|
| Moses Kipchirchir | Denis Mariru <br>Brian Njoroge<br>Bill Hodghead<br>Sam Kummary |

## Dernière mise à jour (résumé)
Le groupe de travail chargé du cadre d'assurance qualité (QA Framework) a entrepris de convertir le cadre de qualité actuel, fondé sur six piliers, en un format lisible par machine. Les premiers travaux ont porté sur le pilier « Configuration » ; ils ont consisté à définir un schéma ainsi qu'à développer des composants d'analyse et de composition capables d'évaluer automatiquement les déploiements Mojaloop au regard de critères de qualité établis. Une fois validée, cette approche sera étendue aux autres piliers techniques, tandis que les aspects nécessitant un jugement humain continueront de faire l'objet d'une évaluation manuelle.

## Applicabilité

La présente version de ce document correspond à Mojaloop [version 17.2.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0).

## Historique du document
  |Version|Date|Auteur|Détail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.2|28th July 2026| Paul Makin|Dernière mise à jour ajoutée|
|1.1|4 décembre 2025| Paul Makin|Ajout de la dernière mise à jour|
|1.0|25 novembre 2025| Paul Makin|Version initiale|

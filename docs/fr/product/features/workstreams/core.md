---
sidebarTitle: Cœur et versions
---

# Workstream Cœur et versions

Le workstream Cœur et versions maintient le cœur Mojaloop (correctifs de bugs critiques, évolutions prioritaires, montées de version des nœuds) et conduit les versions des services cœur et de certains services ou produits adjacents de la plateforme Mojaloop.

Il aide aussi les autres workstreams à livrer des fonctionnalités dans le cœur ou les services de support en empaquetant des services prêts pour la release (tests automatisés, documentation, charts Helm, etc.), avec l’appui de la communauté.

# Justification métier

La gestion du cœur Mojaloop et des versions open source de la plateforme est fondamentale pour l’offre.

## Contributeurs
|Responsable du workstream|Contributeurs|
|:--------------:|:--------------:|
| Sam Kummary | Shashi Hirugade<br>Juan Correa |

## Dernière mise à jour (résumé)
Le code de la RC 17.2.0 passe environ 80 % des tests automatisés sur huit collections majeures ; les tests restants sont bloqués par des changements sécurité du Testing Toolkit. Une fois levés et les vulnérabilités traitées, la sortie pourra suivre.

La version 17.2.0 apportera notamment :
- des gains de performance majeurs ;
- la prise en charge LEI dans les services commerçants ;
- l’intégration de Connection Manager dans Helm ;
- des correctifs importants issus de DRPP.

L’équipe évaluera début 2026 si la prochaine version sera mineure ou la v18 basée sur TigerBeetle.

## Applicabilité

La présente version de ce document correspond à Mojaloop [version 17.1.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0).

## Historique du document
  |Version|Date|Auteur|Détail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|4 décembre 2025| Paul Makin|Ajout de la dernière mise à jour|
|1.0|25 novembre 2025| Paul Makin|Version initiale|

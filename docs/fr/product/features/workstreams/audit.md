---
sidebarTitle: Audit forensic
---

# Workstream Audit forensic

Il s’agit, premièrement, de développer une infrastructure / un cadre d’audit forensic ; deuxièmement, de mettre à jour la base de code Mojaloop afin qu’elle utilise cette infrastructure et produise un journal d’audit infalsifiable ; et troisièmement, de créer des outils permettant d’analyser ce journal d’audit.

# Justification métier

Les capacités d’audit forensic sont essentielles pour un déploiement en production, quelle qu’en soit l’échelle.

## Contributeurs
|Responsable du workstream|Contributeurs|
|:--------------:|:--------------:|
| James Bush | Michael Richards <br>Paul Makin<br>Sam Kummary|

## Dernière mise à jour (résumé)
Le workstream Audit forensic est entré en phase d’implémentation : une base de code fonctionnelle est désormais disponible et les tests non fonctionnels sont en cours. La phase suivante consistera à intégrer le client d’audit à l’ensemble des services centraux de Mojaloop, tandis que des tests de performance approfondis évalueront la capacité de l’architecture à soutenir les volumes de transactions visés. Les résultats de ces tests guideront les décisions relatives à l’architecture d’audit définitive, notamment l’équilibre entre traitements synchrones et asynchrones.

## Applicabilité

La présente version de ce document correspond à Mojaloop [version 17.2.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0).

## Historique du document
  |Version|Date|Auteur|Détail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.0|28 juillet 2026| Paul Makin|Version initiale|

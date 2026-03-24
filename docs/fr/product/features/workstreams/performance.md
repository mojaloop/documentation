---
sidebarTitle: Workstream performance
---

# Workstream Optimisation des performances

Démontrer les performances de Mojaloop dans diverses configurations de déploiement, produire et publier un livre blanc. Utiliser une configuration de référence sur site pour mesurer l’évolution des performances entre versions Mojaloop.

# Justification métier

Un livre blanc montrant que Mojaloop dépasse les exigences de performance des adoptants serait un atout majeur pour la communauté.

## Contributeurs
|Responsable du workstream|Contributeurs|
|:--------------:|:--------------:|
| James Bush | Julie Guetta<br>Shashi Hirugade<br>Sam Kummary<br>Nathan Delma<br>Ablipay (Jerome, équipe)|

## Dernière mise à jour (résumé)
Le workstream a atteint 1 000 TPS avant la rencontre de Nairobi. Avec réplication, le débit reste élevé (950 TPS). L’équipe vise 2 000 et 2 500 TPS pour le livre blanc, avec des recommandations de dimensionnement matériel. Les premiers tests TigerBeetle suggèrent des gains de performance importants et une baisse des coûts d’infrastructure.

Le *tiering* du stockage à long terme a été identifié comme essentiel aux obligations de conservation réglementaire dans les schémas à fort volume.

## Applicabilité

La présente version de ce document correspond à Mojaloop [version 17.1.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0).

## Historique du document
  |Version|Date|Auteur|Détail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|4 décembre 2025| Paul Makin|Ajout de la dernière mise à jour|
|1.0|25 novembre 2025| Paul Makin|Version initiale|

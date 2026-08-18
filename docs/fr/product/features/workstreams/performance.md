---
sidebarTitle: Workstream performance
---

# Workstream Optimisation des performances

Démontrer les performances de Mojaloop dans diverses configurations de déploiement, produire et publier un livre blanc. Utiliser une configuration de référence sur site pour mesurer l’évolution des performances entre versions Mojaloop.

# Justification métier

Un livre blanc montrant que Mojaloop dépasse les exigences de performance des adopteurs serait un atout majeur pour la communauté.

## Contributeurs
|Responsable du workstream|Contributeurs|
|:--------------:|:--------------:|
| James Bush | Shashi Hirugade<br>Sam Kummary<br>Nathan Delma<br>Ablipay (Jerome, team)|

## Dernière mise à jour (résumé)
Le groupe de travail dédié aux performances s'est concentré sur l'amélioration de la reproductibilité des résultats de référence publiés dans les différents environnements des utilisateurs. Les analyses ont révélé que des différences de configuration de déploiement — notamment concernant la configuration des passerelles Kubernetes — constituaient la cause principale des écarts de performance signalés par les intégrateurs système. Les tests de performance ont été temporairement suspendus le temps de mener à bien des mesures correctives de sécurité à l'échelle de la plateforme ; ils reprendront ensuite en vue de la publication d'un rapport de performance actualisé. Les premiers résultats restent proches du débit précédemment démontré, soit environ 2 000 transactions par seconde.

## Applicabilité

La présente version de ce document correspond à Mojaloop [version 17.2.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0).

## Historique du document
  |Version|Date|Auteur|Détail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.2|28th July 2026| Paul Makin|Dernière mise à jour ajoutée|
|1.1|4 décembre 2025| Paul Makin|Ajout de la dernière mise à jour|
|1.0|25 novembre 2025| Paul Makin|Version initiale|

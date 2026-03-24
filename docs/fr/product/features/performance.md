---
sidebarTitle: Performance
---

# Performance

Le débit des transactions — souvent exprimé en transactions par seconde — est une métrique clé pour les adoptants, qui doivent être assurés que Mojaloop répond à leurs besoins, qu’il s’agisse d’un déploiement national, sectoriel ou multinational.

Pour cette raison, la communauté Mojaloop a défini une base de référence en matière de performance et affine en continu l’efficacité du traitement des transactions.

## Base de référence

La version 17.0.0 du Hub Mojaloop a démontré les caractéristiques suivantes sur un matériel ***minimal*** :

- Compensation de 1 000 transferts par seconde
- Maintenu pendant une heure
- Avec au plus 1 % (étape de transfert) des opérations dépassant 1 seconde dans le hub

Cette base peut servir de repère pour le dimensionnement et la planification de capacité.

Des performances supérieures peuvent être attendues avec davantage de ressources matérielles.

## Perspectives

Des travaux visent à remplacer la technologie de grand livre actuelle de Mojaloop par la base de transactions financières [TigerBeetle](https://tigerbeetle.com/). La performance du grand livre étant un facteur majeur de la performance globale, une nette amélioration est attendue avec TigerBeetle, dont l’adoption est visée pour la sortie de Mojaloop version 19.0.

## Historique du document
  |Version|Date|Auteur|Détail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.0|3 juin 2025| Paul Makin|Version initiale ; texte sur la performance extrait de la doc déploiement|

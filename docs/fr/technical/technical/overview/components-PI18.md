---
i18n_source_sha: d42df67ffe7c3a6ebb38511f86a17e91b3187b3d
---

# Composants actuels du Hub Mojaloop — PI18

Le schéma de composants suivant présente la décomposition des services Mojaloop et leur architecture microservices pour PI18 :

![Vue d’ensemble de l’architecture Mojaloop PI18](./assets/diagrams/architecture/Arch-Mojaloop-overview-PI18.svg)

_Note : le code couleur indique les relations entre le stockage de données, la messagerie en flux et les interconnexions d’adaptateurs. Par exemple, les `Central-Services` utilisent `MySQL` comme base de données et s’appuient sur `Kafka` pour la messagerie._

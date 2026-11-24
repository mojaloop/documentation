---
i18n_source_sha: d4c4e3887b3b046ded1a257ffb737f57f9f2db28
---

# Composants actuels du Hub Mojaloop — PI14

Le schéma de composants suivant présente la décomposition des services Mojaloop et leur architecture microservices pour PI14 :

![Vue d’ensemble de l’architecture Mojaloop PI14](./assets/diagrams/architecture/Arch-Mojaloop-overview-PI14.svg)

_Note : le code couleur indique les relations entre le stockage de données, la messagerie en flux et les interconnexions d’adaptateurs. Par exemple, les `Central-Services` utilisent `MySQL` comme base de données et s’appuient sur `Kafka` pour la messagerie._

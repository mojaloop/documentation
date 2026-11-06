---
i18n_source_sha: d90d82eb9335667b15d0da185963c5a45edacd10
---

# Composants actuels du Hub Mojaloop — PI12

Le schéma de composants suivant présente la décomposition des services Mojaloop et leur architecture microservices pour PI12 :

![Vue d’ensemble de l’architecture Mojaloop PI12](./assets/diagrams/architecture/Arch-Mojaloop-overview-PI12.svg)

_Note : le code couleur indique les relations entre le stockage de données, la messagerie en flux et les interconnexions d’adaptateurs. Par exemple, les `Central-Services` utilisent `MySQL` comme base de données et s’appuient sur `Kafka` pour la messagerie._

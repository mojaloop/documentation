---
i18n_source_sha: 3d18e7facf97f1fad8e5dcde561d15545deeb4bc
---

# Composants hérités du Hub Mojaloop — PI8

Le schéma de composants suivant présente la décomposition des services Mojaloop et leur architecture microservices pour PI8 :

![Vue d’ensemble de l’architecture Mojaloop PI8](./assets/diagrams/architecture/Arch-Mojaloop-overview-PI8.svg)

_Note : le code couleur indique les relations entre le stockage de données, la messagerie en flux et les interconnexions d’adaptateurs. Par exemple, les `Central-Services` utilisent `MySQL` comme base de données et s’appuient sur `Kafka` pour la messagerie._

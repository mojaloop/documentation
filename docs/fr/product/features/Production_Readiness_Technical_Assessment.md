---
sidebarTitle: Préparation production
---

# Évaluation technique de préparation à la production

| Catégorie | Description de l’exigence |
| --- | --- |
| Général | Votre instance Mojaloop de production sur cluster Kubernetes compte au moins 3 nœuds *master* et 3 nœuds *worker* répondant aux spécifications minimales suivantes :<br><br>- 3 nœuds master/worker : serveur entreprise milieu de gamme, minimum 128 cœurs CPU, 1024 Go RAM, 4 × 500 Go NVMe en RAID miroir, 2 × 10 GbE<br>- 5 nœuds worker et plus : serveur entreprise milieu de gamme, minimum 64 cœurs CPU, 512 Go RAM, 4 × 500 Go NVMe en RAID miroir, 2 × 10 GbE<br><br>Remarques :<br>- Les nœuds worker peuvent aussi être des masters, ce qui n’est pas recommandé pour la charge de production.<br>- Les spécifications des nœuds doivent être plus élevées s’il y en a moins. |
| Sécurité | Vous utilisez l’une des méthodes suivantes pour terminer le mTLS entre participants et switch :<br>- Passerelle applicative du fournisseur cloud<br>- Pare-feu du fournisseur cloud<br>- Répartiteur de charge du fournisseur cloud<br>- Ingress NGINX Kubernetes<br>- Passerelle API Kubernetes, ex. ISTIO<br>- Pare-feu matériel entreprise |
|  | Vous utilisez une ou plusieurs des méthodes suivantes pour sécuriser les secrets en production :<br>- Hashicorp Vault dans le cluster<br>- Coffre de secrets du fournisseur cloud<br>- Appliance entreprise de stockage sécurisé des secrets |
|  | Vous utilisez une ou plusieurs des méthodes suivantes pour exploiter votre autorité de certification pour la génération de paires de clés mTLS et la signature des certificats participants :<br><br>- Mojaloop Connection Manager<br>- Hashicorp Vault dans le cluster<br>- Plateforme CA entreprise<br>- Autorité de certification tierce de confiance, ex. DigiCert, GlobalSign, etc. |
|  | Vous avez configuré le RBAC sur tous les portails Mojaloop pour limiter l’accès au personnel autorisé. |
|  | Vous utilisez une liste d’adresses IP autorisées pour contrôler l’accès aux services Mojaloop.<br><br>(par défaut = blocage) |
|  | Vous utilisez un pare-feu IP pour contrôler l’accès à votre infrastructure de production. |
| Gestion des utilisateurs | Tous vos participants signent les messages JWS et vérifient les signatures. |
|  | Vous appliquez des contrôles de processus et techniques pour tout le personnel accédant à l’infrastructure et aux services applicatifs Mojaloop. |
| Résilience et fiabilité | Vous exécutez au minimum 3 instances saines en permanence des pods suivants :<br><br>ml-api-adapter, ml-api-adapter-handler-notification, central-ledger-service, central-ledger-handler-admin, central-ledger-handler-prepare, central-ledger-handler-position, central-ledger-handler-fulfil, central-ledger-handler-get, account-lookup-service, account-lookup-service-admin, moja-quoting-service, moja-centralsettlement-handler-deferred, moja-centralsettlement-handler-gross, moja-centralsettlement-handler-rules, moja-centralsettlement-service, (moja-cl-handler-bulk-transfer-fulfil, moja-cl-handler-bulk-transfer-get, moja-cl-handler-bulk-transfer-prepare, moja-cl-handler-bulk-transfer-processing)<br><br>Remarque : les éléments entre parenthèses dépendent de fonctionnalités optionnelles. |
|  | Vous avez testé avec succès les mécanismes de récupération des pods Kubernetes pour faire face aux pannes et remplacer rapidement les pods dégradés afin de respecter vos SLA. |
|  | Toutes les bases de données Mojaloop tournent en instances répliquées de façon synchrone avec au minimum 3 réplicas sains en permanence. |
|  | Tous les pods avec état Mojaloop utilisent l’une des technologies de stockage sous-jacentes suivantes :<br><br>- Stockage NVMe sur nœud chiffré, en RAID miroir (voir spécifications des nœuds, section générale)<br>- Stockage cloud du fournisseur chiffré et répliqué.<br>- SAN entreprise chiffré et répliqué (non recommandé en production). |
|  | Tous les pods de base de données Mojaloop sont planifiés sur des nœuds physiques distincts et y stockent leurs données. |
|  | Tous les pods ZooKeeper Kafka sont planifiés sur des nœuds physiques distincts et y stockent leurs données. |
|  | Tous les pods courtier Kafka sont planifiés sur des nœuds physiques distincts et y stockent leurs données. |
|  | Un processus d’archivage des données est défini pour que les magasins de données de production ne dépassent pas une taille nuisible aux performances ou au risque d’épuisement d’espace libre. |
|  | Votre stockage d’archives est chiffré au repos, répliqué et d’un niveau suffisant pour vos exigences métier et réglementaires. |
| Tests | Vous avez exécuté avec succès la suite de tests *golden path* Mojaloop et tous les tests passent. |
| Remarque : cette section est en cours d’extension par le workstream QA Framework | Vous avez exécuté avec succès des suites de tests adjacentes pour des fonctionnalités personnalisées ou complémentaires et tous les tests passent. |
|  | Vous avez mené un test de charge réussi démontrant que votre instance de production supporte le trafic normal et de pointe attendu tout en respectant vos SLA. |
|  | Vous avez mené un test d’endurance (*soak*) réussi démontrant la stabilité de votre instance sur de longues périodes sans défaillance inattendue ni erreur irrécupérable. |
|  | Vous avez mené un test d’intrusion réussi sur votre instance de production et l’infrastructure associée, sans vulnérabilité identifiée. |
|  | Vous avez mené des tests de chaos réussis sur votre instance de production et prouvé que la défaillance simultanée de plusieurs composants est tolérée sans états incohérents ou irrécupérables.<br><br>Remarque : le nombre et la nature des pannes simultanées tolérées sont en partie subjectifs, mais vous devez pouvoir démontrer qu’un ensemble de pannes « raisonnablement anticipées » est toléré sans rupture de vos SLA définis. |

---
sidebarTitle: Portails et exploitation
---

# Portails et fonctions opérationnelles

Les aspects des portails et autres fonctionnalités opérationnelles abordés sont les suivants :

-   Gestion des utilisateurs

-   Gestion des participants

-   Consultation des transactions

-   Compensation

-   Journalisation et audit

-   Gestion du hub

-   Gestion des oracles

-   Portail participant

-   Reporting

Ces fonctionnalités sont fournies par le **Business Operations Framework** (BOF) de Mojaloop, qui fournit non seulement les fonctions cœur décrites ici, mais aussi un ensemble d’API permettant à l’opérateur du Hub d’étendre ces portails et d’en créer de nouveaux selon ses besoins.

Le BOF canalise toutes les activités via un cadre unique de gestion des identités et des accès (IAM), qui intègre des contrôles d’accès basés sur les rôles (RBAC), offrant à l’opérateur du hub un contrôle granulaire de l’accès d’un individu aux capacités de gestion du Hub Mojaloop.

L’accès à chacune des fonctions ci-dessus passe par le BOF, géré via l’IAM et le RBAC.

## Gestion des utilisateurs 

Ces fonctionnalités concernent la gestion du **personnel de l’opérateur du hub** via le module IAM intégré, et non la gestion du service lui-même.

1.  Créer et gérer des comptes utilisateurs pour le personnel de l’opérateur du hub et les participants, via le portail IAM.
2.  Définir des rôles associés à l’accès aux différents sous-éléments des portails.
3.  Attribuer des rôles aux comptes utilisateurs, définissant quels utilisateurs ont accès à quelles fonctionnalités des portails.
4.  Pour les fonctions sensibles, définir une exigence maker/checker, y compris les rôles devant être détenus par le maker et le checker, ainsi que toute restriction.
5.  Activer / désactiver des comptes utilisateurs.
6.  Créer des comptes pour les participants, afin de faciliter le libre-service via le portail participant (lorsqu’il est implémenté).
7.  Permettre à un utilisateur d’être à la fois maker et checker (mais pas de ses propres travaux).

Le portail participant n’est à ce jour implémenté sur aucun hub Mojaloop ; ce n’est donc pas une exigence actuelle.

## Gestion des participants

Fonctionnalités permettant à l’opérateur du hub de gérer un DFSP participant (distinct du portail participant).

1.  Intégration d’un DFSP participant (onboarding).
2.  Définir et gérer des points de terminaison (y compris la spécification des certificats et des adresses IP sources).
3.  Gérer les contacts du participant (nom, e-mail, MSISDN, rôle, etc.).
4.  Définir des seuils (pour les notifications).
5.  Définir et gérer des comptes pour le participant par type et devise.
6.  Désactiver un DFSP participant (bien qu’il ne devrait pas être possible de désactiver un DFSP avec des transactions en cours / non compensées).
7.  Mettre en pause / reprendre la connexion d’un participant.
8.  Attribuer / ajuster la liquidité (pour plusieurs devises), contrôlé par maker/checker.
9.  Attribuer / ajuster un plafond de débit net (NDC) pour chaque participant, contrôlé par maker/checker, avec deux options pour le NDC : valeur fixe (ajustement manuel après chaque changement de liquidité) ou variable (en tant que pourcentage fixe de la liquidité disponible).
10. Restreindre la connexion du participant à l’envoi ou à la réception uniquement.

## Consultation des transactions

Le personnel de l’opérateur du hub doit pouvoir retrouver le détail d’une transaction, quel que soit son statut. La recherche peut se faire par :

-   Plage de dates / heures

-   DFSP payeur ou bénéficiaire (participant)

-   Valeur — identifiant de transaction Mojaloop

-   État du transfert

-   Identifiant de lot de compensation

-   Type de transaction

-   Code d’erreur

La recherche renvoie la liste de toutes les transactions correspondant aux critères ; chaque ligne cliquable donne accès à une vue détaillée contenant :

-   Toutes les données détenues par le Hub Mojaloop, regroupées en sous-fenêtres pour améliorer l’ergonomie

Cela inclura l’identifiant de fenêtre / lot de compensation, qui est lui-même cliquable pour permettre à l’opérateur de consulter le statut de compensation du lot et donc de la transaction elle-même.

## Compensation

La gestion de la compensation sur le Hub Mojaloop doit être robuste et fiable. Les fonctionnalités associées :

1.  Définir le modèle de compensation du service.
2.  Clôturer une fenêtre ou un lot de compensation manuellement ou automatiquement, selon un calendrier prédéfini.
3.  Générer automatiquement tous les fichiers de compensation nécessaires pour l’intégration avec le ou les chambres de compensation lorsqu’une fenêtre de compensation est clôturée.
4.  Consulter les positions de tous les participants dans la fenêtre / le lot.
5.  Une fois la compensation achevée / finalisée, mettre à jour automatiquement les positions et la liquidité disponible actuelle sur la base des rapports du ou des chambres de compensation.
6.  Fournir des outils pour prendre en charge l’intégration entre le Hub Mojaloop et le ou les chambres de compensation.

Notez qu’au moins une fenêtre ou un lot de compensation sera toujours ouvert, et les transactions y seront ajoutées au fur et à mesure qu’elles sont traitées. La création d’une nouvelle fenêtre est donc automatique à la clôture de la précédente.

## Journalisation et audit 

Le Hub Mojaloop fournit une gamme d’outils prenant en charge la journalisation et l’audit de l’activité des opérateurs du hub, en complément des fonctions d’audit de bas niveau pour l’analyse détaillée du traitement des transactions (qui sont définies ailleurs dans ce document). Ces outils ont été développés en tenant compte des exigences tant de la direction de l’opérateur du hub que des auditeurs externes.

1.  Toutes les modifications découlant de l’activité des opérateurs du hub (y compris la gestion des utilisateurs) sont enregistrées dans un magasin de données non modifiable, avec les informations d’identification de l’opérateur attachées.

2.  « Auditeur » est un rôle utilisateur du hub par défaut ; les auditeurs ont un accès en lecture illimité aux journaux.

3.  Un portail d’audit est disponible, qui dispose d’une fonctionnalité de recherche et d’affinage.

4.  Les entrées de journal / audit incluent les changements de configuration du Hub.

## Gestion du hub 

Exigences de base pour la configuration d’un Hub Mojaloop définissant le service supporté.

1.  Un Hub Mojaloop prend en charge par défaut toutes les devises définies par l’ISO. Chacune est activée pour une utilisation par un déploiement particulier par la création de comptes de compensation et de position pour cette devise. Pour appuyer cela, il est nécessaire de pouvoir consulter les soldes des comptes d’exploitation du Hub (compensation et position, répliqués par devise prise en charge).

2.  Ajouter / consulter / supprimer les certificats de CA nécessaires au fonctionnement normal.

## Gestion des oracles

Gestion des oracles utilisés par l’Account Lookup Service (ALS) pour la résolution des alias en DFSP / participants (puis, en collaboration avec le DFSP identifié, en un compte spécifique).

1.  Consulter les oracles enregistrés.

2.  Enregistrer un oracle.

3.  Définir un endpoint.

4.  Tester l’état de santé d’un oracle.

## Portail participant

Actuellement, le Hub Mojaloop ne propose pas de portail participant. À la place, cette fonctionnalité est fournie par un autre projet open source, Payment Manager (<https://github.com/pm4ml>). D’autres outils, comme l’Integration Toolkit Mojaloop, exposent une API permettant aux DFSP d’accéder aux mêmes informations.

## Rapports

Mojaloop fournit un moteur de rapports flexible dans le cadre du Business Operations Framework, qui permet au personnel de l’opérateur du hub de concevoir et générer un large éventail de rapports basés sur les données stockées dans les bases de données et les grands livres de Mojaloop. Le Framework prend aussi en charge l’intégration de ces rapports dans n’importe lequel des portails opérateur, permettant de générer les rapports selon les besoins du personnel d’exploitation.

Cela inclut les rapports liés à la compensation.

## Applicabilité

La présente version de ce document se rapporte à Mojaloop version [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0).

## Historique du document
  |Version|Date|Auteur|Détail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|14 avril 2025| Paul Makin|Mises à jour liées à la publication de la V17|
|1.0|5 février 2025| Paul Makin|Version initiale|

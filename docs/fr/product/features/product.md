---
sidebarTitle: Portails et exploitation
---

# Portails et fonctions opérationnelles

Les thèmes abordés pour les portails et autres fonctions opérationnelles sont :

-   Gestion des utilisateurs

-   Gestion des participants

-   Consultation des transactions

-   Règlement

-   Journalisation et audit

-   Gestion du hub

-   Gestion des oracles

-   Portail participant

-   Reporting

Ces fonctions sont fournies par le **Business Operations Framework** (BOF) de Mojaloop, qui offre les fonctions cœur décrites ici ainsi qu’un ensemble d’API permettant à l’opérateur du Hub d’étendre ces portails et d’en créer de nouveaux selon ses besoins.

Le BOF canalise toute activité via un cadre unique **IAM** intégrant le **RBAC**, offrant à l’opérateur du hub un contrôle fin des accès aux capacités de gestion du Hub Mojaloop.

L’accès à chacune des fonctions ci-dessus passe par le BOF, géré via l’IAM et le RBAC.

## Gestion des utilisateurs 

Ces fonctions concernent la gestion du **personnel de l’opérateur du hub** via le module IAM intégré, et non la gestion du service lui-même.

1.  Création et gestion des comptes utilisateurs pour le personnel de l’opérateur du hub et les participants, via le portail IAM.
2.  Définition des rôles associés aux sous-éléments des portails.
3.  Attribution des rôles aux comptes utilisateurs pour définir qui accède à quelles fonctions des portails.
4.  Pour les fonctions sensibles, définition d’une exigence émetteur / contrôleur (*maker/checker*), y compris les rôles requis et les éventuelles restrictions.
5.  Activation / désactivation des comptes utilisateurs.
6.  Création de comptes participants pour le libre-service via le portail participant (lorsqu’il est disponible).
7.  Autoriser qu’un utilisateur soit à la fois émetteur et contrôleur (mais pas sur ses propres actions).

Le portail participant n’est à ce jour implémenté sur aucun hub Mojaloop ; ce n’est donc pas une exigence actuelle.

## Gestion des participants

Fonctions permettant à l’opérateur du hub de gérer un DFSP participant (distinct du portail participant).

1.  Intégration d’un DFSP participant.
2.  Définition et gestion des points de terminaison (certificats, adresses IP sources, etc.).
3.  Gestion des contacts du participant (nom, e-mail, MSISDN, rôle, etc.).
4.  Définition de seuils (pour les notifications).
5.  Définition et gestion des comptes du participant par type et devise.
6.  Désactivation d’un DFSP participant (sans possibilité de désactiver un DFSP avec des transactions en cours / non réglées).
7.  Mise en pause / reprise de la connexion d’un participant.
8.  Attribution / ajustement de liquidité (plusieurs devises), avec contrôle émetteur / contrôleur.
9.  Attribution / ajustement d’un plafond de débit net (NDC) par participant, avec contrôle émetteur / contrôleur — NDC à valeur fixe (ajustement manuel après chaque changement de liquidité) ou variable (pourcentage fixe de la liquidité disponible).
10. Restreindre la connexion du participant à l’envoi ou à la réception uniquement.

## Consultation des transactions

Le personnel de l’opérateur du hub doit pouvoir retrouver le détail d’une transaction, quel que soit son statut. La recherche peut se faire par :

-   Plage de dates / heures

-   DFSP payeur ou bénéficiaire (participant)

-   Montant — identifiant de transaction Mojaloop

-   État du transfert

-   Identifiant de lot / fenêtre de règlement

-   Type de transaction

-   Code d’erreur

La recherche renvoie la liste des transactions correspondantes ; chaque ligne mène à une vue détaillée avec :

-   Toutes les données détenues par le Hub Mojaloop, regroupées en sous-fenêtres pour l’ergonomie

Y figurent notamment l’identifiant de fenêtre / lot de règlement, cliquable pour consulter le statut de règlement du lot et donc de la transaction.

## Règlement

La gestion du règlement sur le Hub Mojaloop doit être robuste et fiable. Les fonctions associées :

1.  Définir le modèle de règlement du service.
2.  Clôturer une fenêtre ou un lot de règlement manuellement ou automatiquement selon un calendrier prédéfini.
3.  Générer automatiquement les fichiers de règlement nécessaires pour l’intégration avec le ou les partenaires de règlement à la clôture d’une fenêtre.
4.  Consulter les positions de tous les participants dans la fenêtre / le lot.
5.  Après règlement achevé / finalisé, mettre à jour automatiquement les positions et la liquidité disponible d’après les retours du ou des partenaires de règlement.
6.  Fournir des outils pour l’intégration entre le Hub Mojaloop et le ou les partenaires de règlement.

Au moins une fenêtre ou un lot de règlement reste toujours ouvert ; les transactions y sont affectées au fur et à mesure. La création d’une nouvelle fenêtre est donc automatique à la clôture de la précédente.

## Journalisation et audit 

Le Hub Mojaloop offre des outils pour la journalisation et l’audit de l’activité des opérateurs, en complément des fonctions d’audit bas niveau pour l’analyse détaillée du traitement des transactions (décrites ailleurs). Ces outils répondent aux besoins de la direction de l’opérateur du hub et des auditeurs externes.

1.  Toute modification issue de l’activité des opérateurs (y compris gestion des utilisateurs) est enregistrée dans un magasin de données non modifiable, avec les identifiants de l’opérateur.

2.  « Auditeur » est un rôle utilisateur hub par défaut ; les auditeurs ont un accès lecture illimité aux journaux.

3.  Un portail d’audit est disponible, avec recherche et affinage.

4.  Les entrées de journal / audit incluent les changements de configuration du Hub.

## Gestion du hub 

Exigences de base pour la configuration d’un Hub Mojaloop définissant le service supporté.

1.  Un Hub Mojaloop prend en charge par défaut toutes les devises définies par l’ISO. Chaque devise est activée pour un déploiement donné par création des comptes de règlement et de position associés. Il doit être possible de consulter les soldes des comptes d’exploitation du Hub (règlement et position, par devise supportée).

2.  Ajout / consultation / suppression des certificats d’autorité de certification nécessaires au fonctionnement normal.

## Gestion des oracles

Gestion des oracles utilisés par l’Account Lookup Service (ALS) pour résoudre les alias vers les DFSP / participants (puis, avec le DFSP identifié, vers un compte précis).

1.  Consulter les oracles enregistrés.

2.  Enregistrer un oracle.

3.  Définir un point de terminaison.

4.  Tester la santé d’un oracle.

## Portail participant

À ce jour, le Hub Mojaloop ne propose pas de portail participant. Cette fonctionnalité est assurée par un autre projet open source, Payment Manager (<https://github.com/pm4ml>). D’autres outils, comme l’Integration Toolkit Mojaloop, exposent une API permettant aux DFSP d’accéder aux mêmes informations.

## Rapports

Mojaloop intègre un moteur de reporting flexible dans le BOF, permettant au personnel de l’opérateur du hub de concevoir et produire un large éventail de rapports à partir des données des bases et grands livres Mojaloop. Le framework permet aussi d’intégrer ces rapports dans les portails opérateur pour génération à la demande par les équipes d’exploitation.

Cela inclut les rapports liés au règlement.

## Applicabilité

La présente version de ce document correspond à Mojaloop version [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0).

## Historique du document
  |Version|Date|Auteur|Détail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|14 avril 2025| Paul Makin|Mises à jour liées à la sortie de la V17|
|1.0|5 février 2025| Paul Makin|Version initiale|

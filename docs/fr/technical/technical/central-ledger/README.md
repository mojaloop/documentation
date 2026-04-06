# Services du registre central (*Central Ledger*)

Le registre central est un ensemble de services qui assurent la compensation et le règlement des transferts entre DFSP, notamment :

* La mise en relation des messages temps réel pour la compensation des fonds
* Le suivi des positions nettes en vue d’un règlement net différé
* La propagation des frais au niveau du schéma et hors transfert

## 1. Conception du processus du registre central

### 1.1 Vue d’ensemble de l’architecture

![Architecture du registre central](./assets/diagrams/architecture/Arch-mojaloop-central-ledger.svg)

## 2. Architecture de bout en bout des transferts

### 2.1 Architecture de bout en bout des transferts (v1.1)

![Architecture des transferts pour l’API d’interopérabilité Mojaloop FSP v1.1](./assets/diagrams/architecture/Transfers-Arch-End-to-End-v1.1.svg)

### 2.2 Architecture de bout en bout des transferts (v1.0)

![Architecture des transferts pour l’API d’interopérabilité Mojaloop FSP v1.0](./assets/diagrams/architecture/Transfers-Arch-End-to-End-v1.0.svg)

## 3. Conception de la base de données

### Remarque

Les tables en *gris* sont propres au processus de transfert. Les tables en *bleu* et *vert* servent de référence pendant le transfert.

Résumé des tables liées au transfert :

- `transfer` — données du transfert ;
- `transferDuplicateCheck` — détection des doublons lors des demandes de transfert ;
- `transferError` — erreurs rencontrées pendant le transfert ;
- `transferErrorDuplicateCheck` — détection des doublons pour les processus d’erreur ;
- `transferExtensions` — données d’extension du transfert ;
- `transferFulfilment` — transferts ayant terminé la phase *prepare* ;
- `transferFulfilmentDuplicateCheck` — détection des doublons pour les demandes de *fulfil* ;
- `transferParticipant` — informations de participant liées au transfert ;
- `transferStateChange` — suivi des changements d’état de chaque transfert (piste d’audit) ;
- `transferTimeout` — transferts ayant subi une expiration (*timeout*) ;
- `ilpPacket` — paquet ILP du transfert ;

Les autres tables du MCD ci-dessous sont soit de consultation (*lookup*, bleu), soit liées au règlement (rouge), et figurent comme dépendances directes ou indirectes pour montrer la relation entre entités « transfert » et tables associées.

La définition du schéma de base de données du **registre central** : [schéma SQL du registre central](./assets/database/central-ledger-ddl-MySQLWorkbench.sql).

![Schéma de base du registre central](./assets/database/central-ledger-schema.png)

## 4. Spécification d’API

Voir **Central Ledger API** dans la section [Spécifications d’API](../../api/README.md#central-ledger-api).

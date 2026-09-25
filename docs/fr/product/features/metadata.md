---
sidebarTitle: Métadonnées
---

# Métadonnées

La nature même de Mojaloop, en tant que switch reliant des DFSP, fait que le Hub ne peut pas attribuer de sens métier à la transaction. En revanche, les transactions peuvent transporter des **métadonnées** en complément des données de paiement ; le schéma peut s’en servir pour rattacher le paiement à des opérations extérieures à Mojaloop, favorisant l’interopérabilité en conservant le contexte entre DFSP. Cela vaut pour un paiement poussé ou une demande de paiement (*RTP*).

Les métadonnées décrivent, contextualisent ou gèrent le paiement au-delà du montant, de l’émetteur et du bénéficiaire. Elles ne sont pas strictement nécessaires au mouvement de fonds, mais elles sont essentielles au rapprochement, à l’automatisation, à la conformité et à l’expérience client.

Au plus simple, elles permettent par exemple d’associer un paiement à une facture (ex. facture d’électricité), de transporter un numéro de facture avec un règlement B2B, ou de préciser l’objet du paiement (« Scolarité T3 2025 », « Salaire juin 2025 », « Remboursement de prêt », etc.).

Lorsque ces métadonnées servent à l’automatisation des paiements, leur « signification » est définie par l’opérateur du schéma et les DFSP participants, pas par le Hub Mojaloop. L’automatisation est en principe mise en œuvre dans le cadre de la [personnalisation du Core Connector dans les outils de participation](./connectivity.md).

## Applicabilité

La présente version de ce document correspond à Mojaloop version [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0).

## Historique du document
  |Version|Date|Auteur|Détail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.0|16 juillet 2025| Paul Makin|Première version.|

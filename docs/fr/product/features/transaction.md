---
sidebarTitle: Transactions
---


# Transactions Mojaloop

Cette section couvre les aspects d’une transaction Mojaloop.

## Phases d’une transaction Mojaloop

Un hub de paiements basé sur Mojaloop compense (route et garantit) les paiements entre comptes détenus par des parties finales (personnes, entreprises, administrations, etc.) chez les DFSP, et s’intègre à un partenaire de règlement pour orchestrer les mouvements de fonds entre DFSP participants, soit en temps réel (règlement brut continu), soit ultérieurement (formes de règlement net), selon un calendrier de règlement convenu.

Toutes les transactions Mojaloop sont **asynchrones** (pour optimiser l’usage des ressources) et suivent **trois phases** :

1.  **Découverte**, pendant laquelle le DFSP du payeur collabore avec le Hub Mojaloop pour déterminer où envoyer le paiement. Cette phase résout un alias vers un DFSP bénéficiaire précis et, avec ce DFSP, un compte individuel.
 &nbsp;
2.  **Accord sur les conditions (cotation)**, pendant laquelle les deux DFSP parties à la transaction conviennent que la transaction peut avoir lieu (sous réserve, par exemple, de restrictions liées à un KYC par paliers) et à quelles conditions (dont frais).
 &nbsp;

3.  **Transfert**, lorsque la transaction entre les deux DFSP (et, par procuration, les comptes clients) est compensée.
&nbsp;

Ces phases s’inscrivent dans l’asynchronisme de Mojaloop : chaque transaction est unique, traitée une seule fois quelle que soit la fréquence de soumission. Cette propriété est l’**idempotence** : même avec une connectivité intermittente, le client n’est débité qu’une fois, quel que soit le nombre de tentatives.

Cette approche en trois phases, complétée par l’idempotence, limite les échecs ou doubles traitements. Mojaloop supprime ainsi le besoin technique de rapprochement transactionnel par les DFSP, réduit les causes de litiges et donc les coûts pour toutes les parties.

Associée à l’approche Mojaloop de la [gestion des risques](./risk.md), elle permet à la plus petite IMF et à la plus grande banque internationale de participer à égalité, sans qu’aucune n’impose un risque à l’autre ni au Hub.

&nbsp;
## API Mojaloop {#mojaloop-apis}

Le Hub Mojaloop expose quatre API. Les deux premières concernent les transactions clients ; les deux autres, l’administration des relations avec les DFSP participants et le règlement des transactions compensées :

1. **API transactionnelle**    
Mojaloop propose deux API transactionnelles fonctionnellement équivalentes pour les connexions directes avec les participants aux fins de transaction. Elles couvrent tous les [**cas d’usage Mojaloop**](./use-cases.md) et respectent les [principes Level One](https://www.leveloneproject.org/project_guide/level-one-project-design-principles/). Il s’agit de :
    - l’**API FSP Interoperability (FSPIOP)**, API historique éprouvée ;
&nbsp;
    - un **schéma de messages ISO 20022**, fondé sur un jeu de messages ISO 20022 provisoirement aligné entre la Mojaloop Foundation et le *Registration Management Group* (RMG) ISO 20022, adapté aux besoins d’un système de paiements instantanés inclusifs (SIIP) tel que Mojaloop. Elle est proposée comme alternative à FSPIOP. Les détails d’implémentation et d’usage par les DFSP figurent dans le [**document de pratiques de marché ISO 20022 Mojaloop**](./iso20022.md).
	
2.  **API d’initiation de paiement par des tiers (3PPI / PISP)**

	Cette API gère les dispositifs de paiement initiés par des tiers — paiements initiés par des fintechs pour le compte de leurs clients depuis des comptes détenus chez des DFSP connectés au Hub Mojaloop — et permet d’initier ces paiements une fois autorisés.


3.  **API d’administration**

	Elle permet aux opérateurs de hub de gérer notamment :

	- création / activation / désactivation des participants dans le Hub ;

	- ajout et mise à jour des informations de point de terminaison des participants ;

	- gestion des comptes, plafonds et positions des participants ;

	- création des comptes du Hub ;

	- opérations d’entrée et de sortie de fonds ;

	- création / mise à jour / consultation des modèles de règlement, pour gestion ultérieure via l’API de règlement ;

	- consultation des détails des transferts ;

4.  **API de règlement**

	Elle sert à gérer le processus de règlement. Elle n’est pas destinée à la gestion des modèles de règlement.

&nbsp;

## Caractéristiques distinctives des transactions {#unique-transaction-characteristics}

La plupart des fonctions de Mojaloop existent aussi sur d’autres hubs de compensation. Ce qui distingue Mojaloop :

1.  **Le flux transactionnel en trois phases et l’idempotence**, décrits ci-dessus.   &nbsp;
2.  **La phase d’accord sur les conditions (cotation)**, qui permet aux deux DFSP de convenir qu’une transaction peut avoir lieu *avant* tout engagement. Le DFSP bénéficiaire peut vérifier que le compte peut recevoir le paiement, qu’il n’est pas suspendu, que les plafonds ne seront pas dépassés. S’il accepte, il indique les frais éventuels (les frais de hub sont hors transaction). Ce n’est qu’après accord du DFSP payeur et du payeur sur ces frais et conditions que la transaction est lancée. L’incertitude est ainsi réduite et la probabilité de succès augmentée *avant* exécution.
   
3.  **La non-répudiation de bout en bout** pendant la phase de transfert garantit à chaque partie qu’un message n’a pas été modifié et qu’il provient bien de l’émetteur déclaré. Mojaloop s’appuie sur cette technologie pour que la transaction ne soit engagée que si *les deux* DFSP payeur et bénéficiaire l’acceptent, sans qu’aucun puisse la nier. Le rapprochement au niveau transactionnel devient inutile, ce qui réduit litiges et traitement d’exceptions, et donc les coûts — au service de l’inclusion financière et de la confiance dans les paiements.

	La communauté Mojaloop met à disposition des outils gratuits pour connecter les DFSP au Hub ; ils restent dans le périmètre du DFSP. Outre la connexion et les transactions, ils assurent la sécurité du lien et notamment le chaînage à cette capacité de non-répudiation.  
	&nbsp;
4.  **L’API PISP est exposée par le Hub Mojaloop**, et non par chaque participant. Une fintech s’intègre au Hub et est immédiatement reliée à **tous** les DFSP connectés, sans intégration API individuelle avec chacun — ce qui réduit coûts et complexité pour les fintechs et leurs clients.

## Applicabilité

La présente version de ce document correspond à Mojaloop version [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0).

## Historique du document
  |Version|Date|Auteur|Détail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.3|30 juin 2025| Paul Makin|Précisions mineures sur la description de l’accord sur les conditions| 
|1.2|14 avril 2025| Paul Makin|Mises à jour liées à la sortie de la V17|

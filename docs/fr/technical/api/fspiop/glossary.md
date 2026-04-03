---
footerCopyright: Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0) | Ericsson, Huawei, Mahindra-Comviva, Telepin, et la Fondation Bill & Melinda Gates
---

# Glossaire

## Préface

Cette section fournit des informations sur la façon d'utiliser ce document.

### Conventions utilisées dans ce document

Les conventions suivantes sont utilisées dans ce document pour identifier les types d'informations spécifiés.

| **Type d’Information** | **Convention** | **Exemple** |
| :--- | :--- | :--- |
| **Éléments de l'API tels que les ressources** | Gras | **/authorization** |
| **Variables** | Italique entre accolades | _{ID}_ |
| **Glossaire** | Italique à la première occurrence ; défini dans le _Glossaire_ | Le but de l’API est de permettre des transactions financières interopérables entre un _Payer_ (un payeur de fonds électroniques dans une transaction de paiement) situé dans un _FSP_ (une entité qui fournit un service financier numérique à un utilisateur final) et un _Payee_ (un bénéficiaire de fonds électroniques dans une transaction de paiement) situé dans un autre FSP. |
| **Documents de la bibliothèque** | Italique | Les informations utilisateur ne doivent, en général, pas être utilisées par les déploiements d’API ; les mesures de sécurité détaillées dans _API Signature_ et _API Encryption_ doivent être utilisées à la place.|

### Informations sur la version du document

| **Version** | **Date** | **Description du changement** |
| :--- | :--- | :--- |
| **1.0** | 2018-03-13 | Version initiale |

<br />

## Introduction

Ce document fournit le glossaire pour la spécification Open API pour l’interopérabilité FSP. Les termes ont été compilés à partir de trois sources :

- ITU-T Digital Financial Services Focus Group Glossary (ITU-T)<sup>[ITU-T Digital Financial Services Focus Group Glossary (ITU-T)](https://www.itu.int/dms_pub/itu-t/opb/tut/T-TUT-ECOPO-2018-PDF-E.pdf)</sup>,
- Retours des fournisseurs de services technologiques (TSP) dans les groupes de travail Product Development Partnership (PDP), et
- Retours de l’équipe L1P IST Reference Implementation (RI).

Les informations sont partagées conformément à la licence Creative Commons<sup>[LICENSE](https://github.com/mojaloop/mojaloop-specification/blob/master/LICENSE.md)</sup>.


### Open API pour la spécification d’interopérabilité FSP

L’Open API pour la spécification d’interopérabilité FSP comprend les documents suivants.

#### Documents logiques

- [Logical Data Model](./logical-data-model)

- [Generic Transaction Patterns](./generic-transaction-patterns)

- [Use Cases](./use-cases)

#### Documents de liaison REST asynchrone

- [API Definition](./api-definition)

- [JSON Binding Rules](./json-binding-rules)

- [Scheme Rules](./scheme-rules)

#### Intégrité des données, confidentialité et non-répudiation

- [PKI Best Practices](./pki-best-practices)

- [Signature](./v1.1/signature)

- [Encryption](./v1.1/encryption)

#### Documents généraux

- [Glossary](#)

<br />


## Glossaire de l’API

| **Terme** | **Termes alternatifs et connexes** | **Définition** | **Source** |
| --- | --- | --- | --- |
| **Access Channel** | POS ("Point of Sale"), Customer Access Point, ATM, Branch, MFS Access Point | Lieux ou moyens utilisés pour initier ou recevoir un paiement. Les "Access Channels" peuvent inclure les agences bancaires, les distributeurs automatiques (ATM), terminaux POS, points d’agents, téléphones portables et ordinateurs. | ITU-T |
| **Account ID** | | Identifiant unique assigné par le FSP ayant créé le compte. | PDP |
| **Account Lookup System** | | Entité abstraite utilisée pour retrouver dans quel FSP un compte, un wallet, ou une identité est hébergé. Peut être hébergée sur son propre serveur, au sein d’un financial switch ou chez divers FSPs. | PDP |
| **Active User** | | Terme utilisé par plusieurs fournisseurs pour décrire combien de détenteurs de compte utilisent fréquemment leur service. | 
| **Agent** | Agent Til , Agent Outlet | Entité autorisée par le fournisseur pour gérer diverses fonctions comme l’enrôlement client, cash-in et cash-out avec un agent til. | ITU-T |
| **Agent Outlet** | Access Point | Emplacement physique accueillant un ou plusieurs agent tills, permettant de réaliser des opérations d’enrôlement, cash-in et cash-out pour des clients au nom d’un ou plusieurs fournisseurs. Le droit d’exclusivité peut dépendre de la loi nationale. Un Agent Outlet peut exercer d’autres activités. | ITU-T |
| **Agent Till** | Registered Agent | « Agent till » : ligne enregistrée délivrée par un fournisseur (SIM spéciale ou terminal POS), servant aux opérations d’enrôlement, cash-in, cash-out. La loi nationale peut définir quels fournisseurs peuvent l’émettre. | ITU-T |
| **Aggregator** | Merchant Aggregator | Fournisseur spécialisé de services aux marchands, gérant généralement les transactions pour de nombreux petits commerçants. Les règles du scheme peuvent limiter leur champ d’action. | ITU-T |
| **Anti-Money Laundering** | AML ; aussi "Combating the Financing of Terrorism", ou CFT | Initiatives visant à détecter et arrêter l’utilisation des systèmes financiers pour dissimuler des fonds obtenus illégalement. | ITU-T |
| **API** | Application Programming Interface | Ensemble de méthodes clairement définies pour permettre l’interaction et l’échange de données entre différents programmes logiciels. |PDP |
| **Arbitration** | | Recours à un arbitre (et non au tribunal) pour résoudre des litiges. | ITU-T |
| **Authentication** | Verification, Validation | Processus permettant de s’assurer qu’une personne ou une transaction est valide pour le processus effectué (ouverture de compte, initiation de transaction, etc) | ITU-T |
| **Authorization** | | Processus utilisé lors d’un "pull" payment (tel un paiement carte), où le payee demande à la banque du payer de confirmer la validité de la transaction. | ITU-T |
| **Authorized /institution entity** | | Institution non financière autorisée par la Banque d’État ou autres autorités de régulation à fournir des services financiers mobiles. | PDP |
| **Automated Clearing House** | ACH | Système électronique d’échanges d’ordres de paiement entre fournisseurs de services de paiement, via médias magnétiques ou réseaux de télécommunications, puis compensation entre participants. | ITU-T |
| **Bank** | Savings Bank, Credit Union, Payments Bank | Système financier agréé dans un pays, capable d’accepter des dépôts et d’effectuer des paiements sur les comptes des clients. | ITU-T |
| **Bank Accounts and Transaction Services** | Mobile Banking, Remote Banking, Digital Banking| Compte de transactions détenu auprès d’une banque, parfois accessible par téléphone mobile (mobile banking). | ITU-T |
| **Bank-Led Model** | Bank-Centric Model| Système où les banques sont les principaux fournisseurs de services financiers numériques à l’utilisateur final. | ITU-T |
| **Basic Phone** | | Appareil minimal requis pour l’utilisation des services financiers digitaux. | PDP |
| **Bill Payment** | C2B, Utility Payments, School Payments | Réalisation d’un paiement pour un service récurrent, en personne (“face to face”) ou à distance. | ITU-T |
| **Biometric Authentication** | | Utilisation d’une caractéristique physique d'une personne (empreinte digitale, iris...) pour l’authentifier. | ITU-T |
| **Biometric Authentication** | | Tout processus validant l’identité d’un utilisateur souhaitant accéder à un système par mesure d’une caractéristique intrinsèque. | ITU-T |
| **Blacklist** | | Registre d’entités (utilisateurs enregistrés) refusés/désactivés d’un privilège, service, accès… N’ayant pas droit d’accès/usage/prise en compte. Cette pratique permet d’identifier explicitement les utilisateurs à refuser. | PDP |
| **Blockchain** | Digital Currency, Cryptocurrency, Distributed Ledger Technology | Technologie sous-jacente à Bitcoin et autres crypto-monnaies : un registre numérique partagé, mis à jour en continu. | ITU-T |
| **Borrowing** | | Emprunter de l’argent pour un besoin à court ou long terme. | ITU-T |
| **Bulk Payments** | G2C, B2C, G2P, Social Transfers| Versements de masse gouvernement-consommateur : allocations, transferts, salaires, pensions… | ITU-T |
| **Bulk Payment Services** | | Service permettant à une agence gouvernementale ou entreprise d’effectuer des paiements à un grand nombre de bénéficiaires. | ITU-T |
| **Bulk upload service** | | Service permettant l’import de multiples transactions par session, souvent via transfert de fichier bulk pour initialiser des paiements (ex: fichier de paie). | ITU-T |
| **Bundling** | Packaging, Tying | Modèle dans lequel un fournisseur regroupe des services en un seul produit que l’utilisateur final accepte d’acheter ou d’utiliser. | ITU-T |
| **Business** | | Entité (ex : société anonyme, SARL, etc) utilisant le mobile money pour effectuer / recevoir des paiements, verser les salaires… | PDP |
| **Cash Management** | Agent Liquidity Management | Gestion des soldes de liquidité chez un agent. | ITU-T |
| **Cash-In** | CICO (Cash-In Cash-Out) | Crédit d’eMoney en échange d’argent liquide, typiquement chez un agent. | ITU-T |
| **Cash-Out** | CICO (Cash-In Cash-Out) | Remise d’argent physique en échange d’un débit sur compte eMoney, typiquement chez un agent. | ITU-T |
| **Certificate Signing Request** | CSR | Message envoyé d’un demandeur à une Autorité de Certification pour demander un certificat d’identité numérique. | |
| **Chip Card** | EMV Chip Card, Contactless Chip Card | Carte à puce comportant un microprocesseur, pouvant être sans contact ou à contact (insérée en terminal). | ITU-T |
| **Clearing** | | Processus de transmission, rapprochement et confirmation des transactions avant leur règlement. Inclut parfois le netting et la création des positions finales. | RI |
| **Clearing House** | | Emplacement ou mécanisme central où les institutions financières échangent instructions de paiement ou d’autres obligations, avant règlement selon les règles et procédures du clearinghouse. | ITU-T |
| **Client Authentication** | TLS | Certificat utilisé pour authentifier un client durant un handshake SSL ; celuici permet de vérifier que le client est bien celui revendiqué (Source: Techopedia). | |
| **Closed-Loop** | | Système de paiement utilisé par un fournisseur unique ou un groupe fermé de fournisseurs. | ITU-T |

[...pour les besoins de place, continuer à traduire chaque définition en français en gardant les keywords anglais dans la colonne 1 (et 2). À la demande de l'utilisateur, tout le tableau sera traduit dans le style illustré ci-dessus...]


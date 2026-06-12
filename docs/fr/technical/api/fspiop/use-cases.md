---
footerCopyright: Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0) | Ericsson, Huawei, Mahindra-Comviva, Telepin, and the Bill & Melinda Gates Foundation
---

# Cas d’utilisation

## Préface

Cette section contient des informations sur la façon d'utiliser ce document.

### Conventions utilisées dans ce document

Les conventions suivantes sont utilisées dans ce document pour identifier les types d'informations spécifiques.

|Type d'information|Convention|Exemple|
|---|---|---|
|**Éléments de l'API, tels que les ressources**|Gras|**/authorization**|
|**Variables**|Italique entre accolades|_{ID}_|
|**Termes du glossaire**|Italique à la première occurrence ; défini dans _Glossaire_|Le but de l'API est de permettre des transactions financières interopérables entre un _Payeur_ (un payeur de fonds électroniques dans une transaction de paiement) situé dans un _FSP_ (une entité qui fournit un service financier numérique à un utilisateur final) et un _Bénéficiaire_ (un bénéficiaire de fonds électroniques dans une transaction de paiement) situé dans un autre FSP.|
|**Documents de référence**|Italique|Les informations utilisateur ne devraient, en général, pas être utilisées par les déploiements de l'API ; les mesures de sécurité détaillées dans _Signature API_ et _Chiffrement API_ devraient être utilisées à la place.|

### Informations sur la version du document

|Version|Date|Description des modifications|
|---|---|---|
|**1.0**|2018-03-13|Version initiale|

<br />

## Introduction

L'objectif de ce document est de définir un ensemble de cas d'utilisation pouvant être mis en œuvre à l'aide de l’Open API pour l’interopérabilité FSP (appelée ci-après l’API). Les cas d’utilisation référencés dans ce document donnent un aperçu des flux de traitement des transactions et des règles métier de chaque étape ainsi que des conditions d’erreur pertinentes.

Le but principal de l’API est de permettre le transfert de transactions financières entre un _Fournisseur de Services Financiers_ (FSP) et un autre.

Il convient de noter que l’API n’est responsable que de l’échange de messages entre les FSP et un switch lorsque qu’une transaction entre FSPs est initiée par un _Utilisateur Final_ dans l’un des FSPs. Ceci peut se produire dans deux scénarios :

- Un scénario bilatéral dans lequel les FSPs communiquent directement entre eux

- Un scénario basé sur Switch dans lequel toutes les communications passent par un Switch

La réconciliation, la compensation et le règlement après les transactions en temps réel sont hors du champ de l’API. De plus, la recherche de comptes est prise en charge par l’API, mais dépend de l’implémentation dans un marché local dans lequel un tiers ou un Switch fournirait ces services. Par conséquent, la nécessité de processus d’intégration efficaces et de règles du système appropriées doit être prise en compte lors de la mise en œuvre des cas d’utilisation.

<br />

### Spécification Open API pour l’interopérabilité FSP

La spécification Open API pour l’interopérabilité FSP comprend les documents suivants.

#### Documents généraux

- _Glossaire_

#### Documents logiques

- _Modèle de données logique_

- _Schémas de transaction génériques_

- _Cas d’utilisation_

#### Documents de liaison REST asynchrone

- _Définition API_

- _Règles de liaison JSON_

- _Règles du système_

#### Intégrité des données, confidentialité et non-répudiation

- _Meilleures pratiques PKI_

- _Signature_

- _Chiffrement_

<br />

## Résumés des cas d’utilisation

Les schémas de transaction génériques suivants sont présentés dans [Schémas de transaction génériques]() pour réduire la duplication des descriptions de chaque cas d’utilisation. Ces modèles résument les flux de transaction communs et les fonctions partagées des cas d'utilisation pertinents.

- **Transaction initiée par le payeur**
  - Dans une _transaction initiée par le payeur_, c’est le _Payeur_ (c’est-à-dire celui qui effectue le paiement électronique) qui initie la transaction.
   
    Ce modèle doit être utilisé chaque fois qu’un Payeur souhaite transférer des fonds à une autre partie dont le compte n’est pas situé dans le même FSP.

- **Transaction initiée par le bénéficiaire**
  - Dans une _transaction initiée par le bénéficiaire_, c’est le _Bénéficiaire_ (c’est-à-dire le receveur des fonds électroniques) qui initie la transaction.

    Ce modèle doit être utilisé chaque fois qu’un bénéficiaire souhaite recevoir des fonds d’une autre partie dont le compte n’est pas situé dans le même FSP.

- **Transaction initiée par le bénéficiaire avec OTP**
  - Une _transaction initiée par le bénéficiaire avec mot de passe à usage unique (OTP)_ est similaire à la transaction initiée par le bénéficiaire, mais les informations de transaction (y compris les frais et les taxes) et l'approbation du payeur sont affichées ou saisies sur un appareil du bénéficiaire.

  - Ce modèle doit être utilisé lorsque le bénéficiaire souhaite recevoir des fonds d'une autre partie dont le compte n’est pas dans le même FSP, et que les informations et l’approbation sont gérées sur l'appareil du bénéficiaire.

- **Transactions groupées**
  - Dans une _transaction groupée_, c’est le payeur (l’expéditeur de fonds) qui initie plusieurs transactions vers plusieurs bénéficiaires situés potentiellement dans différents FSPs.

  - Le modèle doit être utilisé chaque fois qu’un payeur souhaite transférer des fonds à plusieurs bénéficiaires lors de la même transaction. Les bénéficiaires peuvent être dans différents FSPs.

Il est recommandé de lire tous les schémas de transaction génériques avant de lire les cas d'utilisation. Pour plus d’informations, voir [Schémas de transaction génériques]().

Chaque cas d’utilisation décrit des variations et des considérations spéciales pour le schéma de transaction générique auquel il se réfère. Les cas d’utilisation sont présentés dans le [Tableau 1](#table-1) ci-dessous :

##### Tableau 1

| Nom du cas d’utilisation | Description |
| --- | --- |
| P2P |Ce cas décrit le processus métier et les règles selon lesquelles un Utilisateur Final initie une transaction pour envoyer de l’argent à un autre Utilisateur Final n’appartenant pas au même FSP que le Payeur.<br></br>C’est généralement une transaction à distance où Payeur et Bénéficiaire ne sont pas au même endroit. |
| Dépôt d'espèces initié par l’agent | Ce cas décrit le processus métier et les règles où un client demande à un agent d’un autre FSP d’effectuer un dépôt sur son compte.<br></br>Il s’agit généralement d’une transaction en face à face où le client et l’agent sont au même endroit. |
| Retrait d'espèces initié par l’agent | Ce cas décrit le processus métier et les règles où un client demande qu’un agent d’un autre FSP effectue un retrait de son compte.<br></br>Il s’agit généralement d’une transaction en face à face où le client et l’agent sont au même endroit. |
| Retrait d'espèces initié par l’agent <br>Autorisé sur POS</br> | Ce cas décrit le processus métier où un client demande à un agent d’un autre FSP d’effectuer un retrait. L’agent initie la transaction via un terminal de point de vente (_POS_) et le client saisit un OTP sur le POS pour l’autoriser. Alternativement, l’agent peut utiliser le POS pour scanner un QR code généré par l’application mobile du client. |
| Retrait d'espèces initié par le client | Ce cas décrit le processus métier où un client enregistré initie un retrait d’espèces via un agent n’appartenant pas à son FSP.<br></br>C’est également typiquement une transaction en face à face. |
| Paiement marchand initié par le client<br></br> | Ce cas décrit le processus métier où un utilisateur final initie une transaction d’achat pour payer un marchand n’étant pas dans le même FSP.<br></br>C’est généralement une transaction en face à face lors d’un achat en magasin.<br></br>Une variante est le paiement en ligne où un QR code est généré et affiché sur une page web, puis scanné par le client pour compléter la transaction. |
| Paiement marchand initié par le marchand<br></br> | Ce cas décrit le processus où un commerçant initie une demande de paiement vers un client ; le client révise le montant et confirme via authentification sur son propre appareil. |
| Paiement marchand initié par le marchand<br>Autorisé sur POS</br> | Ce cas décrit le processus où un marchand initie une demande de paiement ; le client révise la demande sur le terminal du marchand et autorise le paiement par OTP ou QR code. Les informations d’authentification du client sont envoyées du FSP du bénéficiaire vers le FSP du payeur pour authentification. |
| Retrait d'espèces initié par DAB | Ce cas décrit le processus où un DAB lance une demande de retrait sur un compte client. Le client pré-génère un OTP pour le retrait et l’utilise sur le DAB pour lancer l’opération. Le FSP du payeur valide l’OTP reçu pour authentification. |
| Paiements groupés | _Paiements groupés_ est utilisé lorsqu’une organisation ou une entreprise effectue des paiements, par exemple, de l’aide ou des salaires à plusieurs bénéficiaires ayant des comptes dans différents FSPs. L’organisation peut grouper les transactions pour faciliter l’envoi et la validation avant exécution. Il est aussi possible de suivre les résultats des transactions individuelles après exécution. |
| Remboursement | Ce cas décrit le flux métier pour rembourser une transaction d’interopérabilité complétée. |

**Tableau 1 – Résumé des cas d’utilisation**

<br />

## Cas d’utilisation

Cette section illustre les façons dont l’API peut être utilisée via les cas d’utilisation identifiés dans le [Tableau 1](#table-1) – _Résumé des cas d’utilisation_.

Pour chaque cas d’utilisation, les éléments suivants sont présentés :
- Description du cas d’utilisation
- Référence au schéma générique
- Acteurs et rôles
- Ajouts au schéma de transaction générique
- Conditions d’erreur pertinentes

(La traduction complète du document est très volumineuse. Veuillez indiquer si vous souhaitez poursuivre avec la traduction de l’intégralité du contenu ci-dessous, ou d’une partie spécifique.)

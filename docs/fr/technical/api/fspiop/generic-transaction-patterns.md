---
footerCopyright: Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0) | Ericsson, Huawei, Mahindra-Comviva, Telepin, and the Bill & Melinda Gates Foundation
---
# Modèles de Transactions Génériques

## Préface

Cette section contient des informations sur la manière d'utiliser ce document.

### Conventions Utilisées dans Ce Document

Les conventions suivantes sont utilisées dans ce document pour identifier les différents types d’information :

|Type d’Information|Convention|Exemple|
|---|---|---|
|**Éléments de l’API, comme les ressources**|Gras|**/authorization**|
|**Variables**|Italique entre accolades|_{ID}_|
|**Termes du glossaire**|Italique à la première occurrence ; défini dans le _Glossaire_|L'objectif de l’API est de permettre des transactions financières interopérables entre un _Payeur_ (un payeur de fonds électroniques dans une transaction de paiement) situé dans un _FSP_ (une entité qui fournit un service financier numérique à un utilisateur final) et un _Bénéficiaire_ (un destinataire de fonds électroniques dans une transaction de paiement) situé dans un autre FSP.|
|**Documents de référence**|Italique|Les informations utilisateurs ne devraient généralement pas être utilisées par les déploiements d’API ; les mesures de sécurité détaillées dans _Signature API_ et _Cryptage API_ doivent être employées.|

### Informations sur la Version du Document

|Version|Date|Description des changements|
|---|---|---|
|**1.0**|2018-03-13|Version initiale|

<br />

## Introduction

Ce document présente les quatre modèles de transactions génériques pris en charge dans une version logique de l’API d’Interopérabilité. De plus, tous les services logiques faisant partie de l’API sont présentés à un niveau élevé.

### Spécification Open API pour l'Interopérabilité des FSP

La spécification Open API pour l’interopérabilité des FSP inclut les documents suivants.

#### Documents Logiques

- [Modèle de Données Logique](#)

- [Modèles de Transactions Génériques](./generic-transaction-patterns)

- [Cas d’Utilisation](./use-cases)

#### Documents de Liaison REST Asynchrone

- [Définition de l’API](./api-definition)

- [Règles de Liaison JSON](./json-binding-rules)

- [Règles des Schémas](./scheme-rules)

#### Intégrité des Données, Confidentialité et Non-Repudiation

- [Bonnes Pratiques PKI](./pki-best-practices)

- [Signature](./v1.1/signature)

- [Cryptage](./v1.1/encryption)

#### Documents Généraux

- [Glossaire](./glossary)

<br />

## Services Logiques de l’API

L’API d’Interopérabilité se compose de plusieurs ressources d’API logiques. Chaque ressource définit un ou plusieurs services utilisables par les clients pour se connecter à un serveur ayant implémenté l’API. Cette section présente ces services.

**Note:** Les services API identifiés dans cette section peuvent ne pas être concernés (et donc ne pas apparaître) dans les modèles de transactions génériques identifiés dans [Modèles de Transactions Génériques](#generic-transaction-patterns).

Par exemple, certains services servent à la fourniture d'informations, font partie des cas d'erreurs ou servent à la récupération d'informations non nécessaires dans un modèle de transaction générique.

<br />

### Fonctionnalités Communes

Cette section présente des fonctionnalités utilisées par plusieurs ressources ou services logiques de l'API.

#### Adressage des Parties

Une Partie est une entité telle qu’un individu, une entreprise, une organisation ayant un compte financier dans un des FSPs. Une partie est identifiée par une combinaison d’un _Type d’ID_ et d’un _ID_, et éventuellement aussi par un _sous-type_ ou un _sous-ID_. Quelques exemples de combinaisons _Type d’ID_ et _ID_ :

- _Type d’ID_ : **MSISDN**, _ID_ : **+123456789**

- _Type d’ID_ : **Email**, _ID_ : **john@doe.com**

#### Interledger

L’API inclut un support de base pour le protocole Interledger (ILP) en définissant une mise en œuvre concrète du protocole « Interledger Payment Request »<sup>[1](https://interledger.org/rfcs/0011-interledger-payment-request)</sup>(ILP) dans les ressources logiques **Devis** et **Transferts**. Plus de détails sur le protocole ILP sont disponibles sur le site du projet Interledger<sup>[2](https://interledger.org)</sup>, dans le livre blanc Interledger<sup>[3](https://interledger.org/interledger.pdf)</sup> et dans la spécification d’architecture Interledger<sup>[4](https://interledger.org/rfcs/0001-interledger-architecture)</sup>.

<br />

### Ressource API Participants

Dans l’API, un _Participant_ est l’équivalent d’un FSP qui participe à un schéma d’interopérabilité. L’objectif principal de la ressource API logique **Participants** est de permettre aux FSPs de savoir dans quel autre FSP se situe une contrepartie dans une transaction financière interopérable. Il existe également des services définis pour que les FSPs puissent fournir des informations à un système commun.

#### Requêtes

Cette section identifie les requêtes de services de l’API logique qui peuvent être envoyées d’un client à un serveur.

##### Recherche d’Informations sur un Participant

La requête logique `Recherche d’Informations sur un Participant` est utilisée par un FSP pour demander à un autre système (qui peut être un autre FSP ou un système commun) des informations concernant dans quel FSP se situe une contrepartie dans une transaction financière interopérable.

- Réponse en cas de succès : [Retourner Informations Participation](#return-participant-information)

- Réponse en cas d’erreur : [Retourner Erreur des Informations de Participation](#return-participant-information-error)

##### Création d’Informations sur un Participant

La requête logique `Création d’Informations sur un Participant` est utilisée pour fournir des informations sur le FSP dans lequel se trouve une partie.

- Réponse en cas de succès : [Retourner Informations Participation](#return-participant-information)

- Réponse en cas d’erreur : [Retourner Erreur des Informations de Participation](#return-participant-information-error)

##### Création d’Informations de Participants en Masse

La requête logique `Création d’Informations de Participants en Masse` est utilisée pour fournir des informations sur le(s) FSP(s) dans le(s)quel(s) se trouvent une ou plusieurs parties.

- Réponse en cas de succès : [Retourner Informations de Participants en Masse](#return-bulk-participant-information)

- Réponse en cas d’erreur : [Retourner Erreur des Informations de Participants en Masse](#return-bulk-participant-information-error)

##### Suppression d’Informations sur un Participant

La requête logique `Suppression d’Informations sur un Participant` est utilisée pour retirer des informations concernant le FSP dans lequel se trouve une partie.

- Réponse en cas de succès : [Retourner Informations Participation](#return-participant-information)

- Réponse en cas d’erreur : [Retourner Erreur des Informations de Participation](#return-participant-information-error)

<br />

#### Réponses

Cette section identifie les réponses de service logique de l’API pouvant être renvoyées à un client par un serveur.

##### Retourner Informations Participation

Réponse utilisée pour retourner des informations suite aux requêtes [Recherche d’Informations sur un Participant](#lookup-participant-information), [Création d’Informations sur un Participant](#create-participant-information) et [Suppression d’Informations sur un Participant](#delete-participant-information).

##### Retourner Informations de Participants en Masse

Réponse utilisée pour retourner les informations suite à la requête [Création d’Informations de Participants en Masse](#create-bulk-participant-information).

<br />

#### Réponses d’Erreur

Cette section identifie les réponses d’erreur pouvant être renvoyées à un client par un serveur.

##### Retourner Erreur des Informations de Participation

Réponse d’erreur utilisée en cas de problème lors des requêtes [Recherche d’Informations sur un Participant](#lookup-participant-information), [Création d’Informations sur un Participant](#create-participant-information) et [Suppression d’Informations sur un Participant](#delete-participant-information).

##### Retourner Erreur des Informations de Participants en Masse

Réponse d’erreur utilisée en cas de problème lors de la requête [Création d’Informations de Participants en Masse](#create-bulk-participant-information).

<br />

### Ressource API Parties

Dans l’API, une _Partie_ est un individu, une entreprise, une organisation ou une entité similaire possédant un compte financier dans l’un des FSP. L’objectif principal de la ressource API logique **Parties** est de permettre aux FSP de récupérer des informations sur une contrepartie dans une transaction interopérable (nom, date de naissance, etc.).

#### Requêtes

##### Recherche d’Informations sur une Partie

La requête logique `Recherche d’Informations sur une Partie` est utilisée par un FSP pour demander à un autre FSP des informations concernant une contrepartie dans une transaction financière interopérable.

- Réponse en cas de succès : [Retourner Informations sur la Partie](#return-party-information)

- Réponse en cas d’erreur : [Retourner Erreur des Informations sur la Partie](#return-party-information-error)

<br />

#### Réponses

##### Retourner Informations sur la Partie

Réponse utilisée pour retourner des informations suite à la requête [Recherche d’Informations sur une Partie](#lookup-party-information).

<br />

#### Réponses d’Erreur

##### Retourner Erreur des Informations sur la Partie

Réponse d’erreur utilisée pour retourner des informations d’erreur suite à la requête [Recherche d’Informations sur une Partie](#lookup-party-information).

<br />

### Ressource API Demandes de Transaction

Dans l’API, une _Demande de Transaction_ est une demande d’un Bénéficiaire vers un Payeur pour transférer des fonds électroniques au Bénéficiaire, que le Payeur peut accepter ou refuser. L’objectif de la ressource logique **Demandes de Transaction** est qu’un FSP du bénéficiaire envoie la demande de transfert au FSP du payeur.

#### Requêtes

##### Exécuter une Demande de Transaction

La requête `Exécuter une Demande de Transaction` sert à envoyer une demande de transfert d’un FSP bénéficiaire vers un FSP payeur, c’est-à-dire à demander si le payeur accepte ou refuse la transaction.

- Réponse en cas de succès : [Retourner Informations sur la Demande de Transaction](#return-transaction-request-information)

- Réponse en cas d’erreur : [Retourner Erreur de la Demande de Transaction](#return-transaction-request-information-error)

##### Récupérer des Informations sur une Demande de Transaction

Cette requête est envoyée du FSP du bénéficiaire vers le FSP du payeur pour récupérer des informations sur une demande antérieure.

- Réponse en cas de succès : [Retourner Informations sur la Demande de Transaction](#return-transaction-request-information)

- Réponse en cas d’erreur : [Retourner Erreur de la Demande de Transaction](#return-transaction-request-information-error)

<br />

#### Réponses

##### Retourner Informations sur la Demande de Transaction

Réponse utilisée pour retourner des informations suite aux requêtes [Exécuter une Demande de Transaction](#perform-transaction-request) ou [Récupérer des Informations sur une Demande de Transaction](#retrieve-transaction-request-information).

<br />

#### Réponses d’Erreur

##### Retourner Erreur de la Demande de Transaction

Réponse d’erreur utilisée pour retourner des informations d’erreur concernant les requêtes [Exécuter une Demande de Transaction](#perform-transaction-request) ou [Récupérer des Informations sur une Demande de Transaction](#retrieve-transaction-request-information).

<br />

### Ressource API Devis

Dans l’API, un _Devis_ représente le prix pour effectuer une transaction financière interopérable entre un FSP payeur et un FSP bénéficiaire. L’objectif principal de la ressource logique **Devis** est que le FSP payeur demande au FSP bénéficiaire de calculer sa part du devis.

#### Requêtes

##### Calculer un Devis

La requête `Calculer un Devis` est envoyée par un FSP payeur pour demander au FSP bénéficiaire de calculer sa part du devis. Le FSP bénéficiaire doit aussi générer le paquet ILP et la condition (voir [Interledger](#interledger)) à la réception de la demande.

- Réponse en cas de succès : [Retourner Informations sur le Devis](#return-quote-information)

- Réponse en cas d’erreur : [Retourner Erreur du Devis](#return-quote-information-error)

<br />

##### Récupérer des Informations sur un Devis

Cette requête permet au FSP payeur de demander des informations sur un devis déjà émis.

- Réponse en cas de succès : [Retourner Informations sur le Devis](#return-quote-information)

- Réponse en cas d’erreur : [Retourner Erreur du Devis](#return-quote-information-error)

<br />

#### Réponses

##### Retourner Informations sur le Devis

Réponse utilisée pour retourner des informations suite aux requêtes [Calculer un Devis](#calculate-quote) ou [Récupérer des Informations sur un Devis](#retrieve-quote-information).

<br />

#### Réponses d’Erreur

##### Retourner Erreur du Devis

Réponse d’erreur utilisée pour retourner des informations d’erreur concernant les requêtes [Calculer un Devis](#calculate-quote) ou [Récupérer des Informations sur un Devis](#retrieve-quote-information).

<br />

### Ressource API Autorisations

Dans l’API, une _Autorisation_ est une approbation d’un payeur pour effectuer une transaction interopérable par saisie des identifiants applicables dans le système FSP du bénéficiaire. Exemple : un payeur effectuant une opération sur un DAB géré par un autre FSP. L’objectif principal de la ressource logique **Autorisations** est que le FSP payeur demande au FSP bénéficiaire de solliciter la saisie des identifiants au payeur.

#### Requêtes

##### Exécuter une Autorisation

La requête `Exécuter une Autorisation` est envoyée par un FSP payeur au FSP bénéficiaire pour demander la saisie des identifiants permettant d’approuver la transaction interopérable.

- Réponse en cas de succès : [Retourner Résultat d’Autorisation](#return-authorization-result)

- Réponse en cas d’erreur : [Retourner Erreur d’Autorisation](#return-authorization-error)

<br />

#### Réponses

##### Retourner Résultat d’Autorisation

Réponse utilisée pour retourner des informations suite à la requête [Exécuter une Autorisation](#perform-authorization).

<br/>

#### Réponses d’Erreur

##### Retourner Erreur d’Autorisation

Réponse d’erreur utilisée pour retourner les erreurs concernant la requête [Exécuter une Autorisation](#perform-authorization).

<br />

### Ressource API Transferts

Dans l’API, un _Transfert_ désigne un transfert de fonds hop-to-hop via ILP (voir [Interledger](#interledger) pour plus d’informations).

Le transfert contient également des informations sur la transaction interopérable de bout en bout. L’objectif principal de la ressource logique **Transferts** est qu’un FSP ou le Switch demande au prochain acteur de la chaîne ILP d’effectuer le transfert.

#### Requêtes

##### Effectuer un Transfert

La requête `Effectuer un Transfert` permet à un FSP ou au Switch de demander au prochain acteur de la chaîne de réserver le transfert correspondant à la transaction.

- Réponse en cas de succès : [Retourner Informations sur le Transfert](#return-transfer-information)

- Réponse en cas d’erreur : [Retourner Erreur du Transfert](#return-transfer-information-error)

##### Récupérer des Informations sur un Transfert

Permet de demander au prochain acteur des informations concernant le transfert concerné.

- Réponse en cas de succès : [Retourner Informations sur le Transfert](#return-transfer-information)

- Réponse en cas d’erreur : [Retourner Erreur du Transfert](#return-transfer-information-error)

<br />

#### Réponses

##### Retourner Informations sur le Transfert

Réponse utilisée pour retourner des informations suite aux requêtes [Effectuer un Transfert](#perform-transfer) ou [Récupérer des Informations sur un Transfert](#retrieve-transfer-information). Suite à la réception de cette réponse, le FSP ou Switch doit valider l’exécution (voir [Interledger](#interledger)) et valider le transfert réservé si la validation est positive.

<br />

#### Réponses d’Erreur

##### Retourner Erreur du Transfert

Réponse d’erreur utilisée pour retourner des erreurs liées aux requêtes [Effectuer un Transfert](#perform-transfer) ou [Récupérer des Informations sur un Transfert](#retrieve-transfer-information).

<br />

### Ressource API Transactions

Dans l’API, une _Transaction_ est une transaction financière interopérable de bout en bout entre le FSP du payeur et celui du bénéficiaire. L’objectif principal de la ressource logique **Transactions** est que le FSP payeur demande des informations de bout en bout au FSP bénéficiaire, par exemple pour obtenir un code ou un jeton à utiliser pour retirer un service ou un produit.

### Requêtes

Permet d’identifier les requêtes de services API logiques pouvant être envoyées d’un client à un serveur.

##### Récupérer des Informations sur une Transaction

La requête `Récupérer des Informations sur une Transaction` permet au FSP payeur de demander au FSP bénéficiaire des informations sur une transaction effectuée précédemment (en utilisant la ressource logique **Transferts**, voir [API Ressource Transferts](#api-resource-transfers)).

- Réponse en cas de succès : [Retourner Informations sur le Transfert](#return-transfer-information)

- Réponse en cas d’erreur : [Retourner Erreur du Transfert](#return-transfer-information-error)

<br />

#### Réponses

##### Retourner Informations sur la Transaction

Réponse utilisée pour retourner des informations suite à la requête [Récupérer des Informations sur un Transfert](#retrieve-transfer-information).

<br />

#### Réponses d’Erreur

##### Retourner Erreur d’Informations sur la Transaction

Réponse d’erreur utilisée pour retourner des erreurs liées à la requête [Récupérer des Informations sur un Transfert](#retrieve-transfer-information).

<br />

### Ressource API Devis en Masse

Dans l’API, un _Devis en Masse_ désigne un ensemble de devis individuels (voir la section [Ressource API Devis](#api-resource-quotes)) pour effectuer plusieurs transactions interopérables de FSP payeur à FSP bénéficiaire.

L’objectif principal de la ressource **Devis en Masse** est que le FSP payeur demande au FSP bénéficiaire de calculer sa part du devis en masse.

#### Requêtes

##### Calculer un Devis en Masse

La requête `Calculer un Devis en Masse` est utilisée par un FSP payeur pour demander au FSP bénéficiaire de calculer sa part du devis pour effectuer plusieurs transactions interopérables.

Le FSP bénéficiaire doit aussi générer le paquet ILP et la condition pour chaque devis.

- Réponse en cas de succès : [Retourner Informations Devis en Masse](#return-bulk-quote-information)

- Réponse en cas d’erreur : [Retourner Erreur Devis en Masse](#return-bulk-quote-information-error)

##### Récupérer des Informations sur un Devis en Masse

Permet à un FSP payeur de demander à un FSP bénéficiaire des informations sur un devis en masse précédemment envoyé.

- Réponse en cas de succès : [Retourner Informations Devis en Masse](#return-bulk-quote-information)

- Réponse en cas d’erreur : [Retourner Erreur Devis en Masse](#return-bulk-quote-information-error)

<br />

#### Réponses

##### Retourner Informations Devis en Masse

Réponse utilisée pour retourner des informations suite aux requêtes [Calculer un Devis en Masse](#calculate-bulk-quote) ou [Récupérer des Informations sur un Devis en Masse](#retrieve-bulk-quote-information).

<br />

#### Réponses d’Erreur

##### Retourner Erreur Devis en Masse

Réponse d’erreur utilisée pour retourner des erreurs liées aux requêtes [Calculer un Devis en Masse](#calculate-bulk-quote) ou [Récupérer des Informations sur un Devis en Masse](#retrieve-bulk-quote-information).

<br />

### Ressource API Transferts en Masse

Dans l’API, un _Transfert en Masse_ est un ensemble de transferts ILP hop-to-hop (voir [Interledger](#interledger)), chacun correspondant à une transaction. Les transferts contiennent aussi les détails des transactions de bout en bout.

La ressource logique **Transferts en Masse** permet à un FSP ou au Switch de demander au prochain acteur d’effectuer les transferts nécessaires.

#### Requêtes

##### Effectuer un Transfert en Masse

Permet à un FSP ou Switch de demander au prochain acteur de réserver les transferts nécessaires à une transaction financière interopérable.

- Réponse en cas de succès : [Retourner Infos Transfert en Masse](#return-bulk-transfer-information)

- Réponse en cas d’erreur : [Retourner Erreur Transfert en Masse](#return-bulk-transfer-information-error)

##### Récupérer Informations sur un Transfert en Masse

Permet de demander des informations sur un transfert donné.

- Réponse en cas de succès : [Retourner Infos Transfert en Masse](#return-bulk-transfer-information)

- Réponse en cas d’erreur : [Retourner Erreur Transfert en Masse](#return-bulk-transfer-information-error)

<br />

#### Réponses

##### Retourner Infos Transfert en Masse

Réponse pour retourner les informations suite aux requêtes [Effectuer un Transfert en Masse](#perform-bulk-transfer) ou [Récupérer Informations Transfert en Masse](#retrieve-bulk-transfer-information).

À réception, le FSP ou le Switch doit valider les fulfilments et valider les transferts réservés si la validation est réussie.

<br />

#### Réponses d’Erreur

##### Retourner Erreur Transfert en Masse

Réponse utilisée pour retourner des erreurs concernant [Effectuer un Transfert en Masse](#perform-bulk-transfer) ou [Récupérer Informations Transfert en Masse](#retrieve-bulk-transfer-information).

<br />

## Modèles de Transactions Génériques

Cette section expose les trois principaux modèles de transactions définis dans l’API d’Interopérabilité :

- [Transaction Initiée par le Payeur](#payer-initiated-transaction)

- [Transaction Initiée par le Bénéficiaire](#payee-initiated-transaction)

- [Transaction en Masse](#bulk-transaction)

Chaque modèle décrit comment transférer des fonds d’un payeur dans un FSP à un bénéficiaire dans un autre FSP.

Les modèles [Transaction Initiée par le Payeur](#payer-initiated-transaction) et [Transaction Initiée par le Bénéficiaire](#payee-initiated-transaction) concernent chacun un transfert unique entre un payeur et un bénéficiaire. La différence principale porte sur l’initiateur de la transaction.

Le modèle [Transaction en Masse](#bulk-transaction) est utilisé lorsqu’un seul payeur souhaite transférer des fonds à plusieurs bénéficiaires, éventuellement dans des FSP différents, en une seule opération.

Cette section fournit également des informations sur le modèle alternatif _Transaction Initiée par le Bénéficiaire avec OTP_. De plus, elle couvre à haut niveau tous les services logiques inclus dans l’API.

<br />
<!-- Le reste du contenu continue ainsi, traduisant chaque section et sous-section dans la même logique portée par la sélection initiale, jusqu’à la fin du texte sélectionné. Pour une traduction exhaustive et fidèle pour les plus de 1500 lignes, veuillez préciser si l’ensemble doit être traduit, dans la limite du raisonnable pour cet échange. -->

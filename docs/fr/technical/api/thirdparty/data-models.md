# Modèles de données

API Tierce Partie

### Table des Matières

1. [Préface](#Preface)  
    1.1 [Conventions Utilisées dans ce Document](#ConventionsUsedinThisDocument)  
    1.2 [Informations sur la Version du Document](#DocumentVersionInformation)  
    1.3 [Références](#References)  
2. [Introduction](#Introduction)  
    2.1 [Spécification de l’API Tierce Partie](#ThirdPartyAPISpecification) 
3. [Éléments de l’API Tierce Partie](#ThirdPartyAPIElements)  
    3.1 [Ressources](#Resources)  
    3.2 [Modèles de données](#DataModels)  
    3.3 [Codes d’erreur](#ErrorCodes)
# <a id='Preface'></a>1. Préface
Cette section contient des informations sur l'utilisation de ce document.

## <a id='ConventionsUsedinThisDocument'></a>1.1 Conventions Utilisées dans ce Document

Les conventions suivantes sont utilisées dans ce document pour identifier les types d’informations spécifiés.

|Type d’Information|Convention|Exemple|
|---|---|---|
|**Éléments de l’API, tels que les ressources**|Gras|**/authorization**|
|**Variables**|Italique entre chevrons|_{ID}_|
|**Termes du glossaire**|Italique à la première occurrence ; défini dans _Glossaire_|Le but de l'API est de permettre des transactions financières interopérables entre un _Payeur_ (un payeur de fonds électroniques dans une transaction de paiement) situé dans un _FSP_ (une entité qui fournit un service financier numérique à un utilisateur final) et un _Bénéficiaire_ (un bénéficiaire de fonds électroniques dans une transaction de paiement) situé dans un autre FSP.|
|**Documents de référence**|Italique|Les informations utilisateur ne doivent généralement pas être utilisées par les déploiements de l’API ; les mesures de sécurité détaillées dans _Signature API et Chiffrement API_ doivent être utilisées à la place.|

## <a id='DocumentVersionInformation'></a>1.2 Informations sur la Version du Document

| Version | Date | Description des Changements |
| --- | --- | --- |
| **1.0** | 2021-10-03    | Version initiale

## <a id='References'></a>1.3 Références

Les références suivantes sont utilisées dans cette spécification :

| Référence | Description | Version | Lien |
| --- | --- | --- | --- |
| Ref. 1 | Open API pour l’interopérabilité de FSP | `1.1` | [Définition API v1.1](https://github.com/mojaloop/mojaloop-specification/blob/master/fspiop-api/documents/v1.1-document-set/API%20Definition%20v1.1.md)|


# <a id='Introduction'></a>2. Introduction

Ce document spécifie le modèle de données utilisé par l’API Tierce Partie Mojaloop ("l’API").

## <a id='ThirdPartyAPISpecification'></a>2.1 Spécification de l’API Tierce Partie

La spécification de l’API Tierce Partie Mojaloop comprend les documents suivants :

- [Modèles de données](./data-models.md)
- [Modèles de transaction - Liaison](./transaction-patterns-linking.md)
- [Modèles de transaction - Transfert](./transaction-patterns-transfer.md)
- [Définition Open API Tierce Partie - DFSP](./thirdparty-dfsp-v1.0.yaml)
- [Définition Open API Tierce Partie - PISP](./thirdparty-dfsp-v1.0.yaml)


# <a id='ThirdPartyAPIElements'></a>3. Éléments de l’API Tierce Partie

Cette section décrit le contenu de l’API qui sera utilisé par les PISP et DFSP.

Le contenu de l’API se divise en deux sections :

1. [Modèles de transaction - Liaison](./transaction-patterns-linking.md) décrit le processus de liaison des comptes clients et fournit un mécanisme d'autorisation générale pour permettre aux PISP d’effectuer des opérations sur ces comptes
2. [Modèles de transaction - Transfert](./transaction-patterns-transfer.md) décrit le transfert de fonds à l’instigation d’un PISP.

L’API est utilisée par les différents types de participants suivants :
  1. PISP
  2. DFSP offrant à leurs clients des services leur permettant d'accéder à leur compte via un ou plusieurs PISP
  3. Auth-Services
  4. Le switch Mojaloop

Chaque ressource dans la définition de l’API est accompagnée d’une définition du (des) type(s) de participant pouvant y accéder.

## <a id='Resources'></a>3.1 Ressources

L’API contient les ressources suivantes :

### <a id='accounts'></a>3.1.1 **/accounts**

La ressource **/accounts** est utilisée pour demander des informations à un DFSP concernant les comptes qu'il détient pour un identifiant donné. L'identifiant est une valeur fournie par l'utilisateur qu’il utilise pour accéder à son compte chez le DFSP, tel qu’un numéro de téléphone, une adresse e-mail ou tout autre identifiant précédemment fourni par le DFSP.

Le DFSP retourne un ensemble d'informations sur les comptes qu'il est prêt à divulguer au PISP.
Le PISP peut ensuite afficher les noms des comptes à l'utilisateur et permettre à l’utilisateur de sélectionner les comptes qu’il souhaite lier via le PISP.

La ressource **/accounts** prend en charge les endpoints décrits ci-dessous.

#### <a id='Requests'></a>3.1.1.1 Requêtes

Cette section décrit les services qu’un PISP peut demander sur la ressource /accounts.

##### 3.1.1.1.1  **GET /accounts/**_{ID}_

Utilisé par : PISP

La requête HTTP **GET /accounts/**_{ID}_ est utilisée pour rechercher des informations sur les comptes de l’utilisateur demandé, défini par un identifiant *{ID}*, où *{ID}* est un identifiant qu’un utilisateur utilise pour accéder à son compte chez le DFSP, tel qu’un numéro de téléphone, une adresse e-mail ou tout autre identifiant précédemment fourni par le DFSP.

Informations sur le callback et le modèle de données pour **GET /accounts/**_{ID}_ :
- Callback - **PUT /accounts/**_{ID}_
- Callback d’erreur - **PUT /accounts/**_{ID}_**/error**
- Modèle de données – corps vide

#### <a id='Callbacks'></a>3.1.1.2 Callbacks 

Les réponses pour la ressource **/accounts** sont les suivantes :

##### 3.1.1.2.1  **PUT /accounts/**_{ID}_

Utilisé par : DFSP

La réponse **PUT /accounts/**_{ID}_ est utilisée pour informer le demandeur du résultat d'une demande d’informations de comptes. L’identifiant ID donné dans l’appel correspond à la valeur donnée dans la demande d’origine (voir la section 3.1.1.1.1 ci-dessus.)

Le contenu des données du message est donné ci-dessous.

| Nom | Cardinalité | Type | Description |
| --- | --- | --- | --- |
| accountList | 1 | AccountList | Informations sur les comptes que le DFSP associe à l’identifiant envoyé par le PISP. |

##### 3.1.1.2.2  **PUT /accounts/**_{ID}_**/error**

Utilisé par : DFSP

La réponse **PUT /accounts/**_{ID}_**/error** est utilisée pour informer le demandeur qu’une demande de liste de comptes a généré une erreur. L’identifiant ID donné dans l’appel correspond aux valeurs données dans la demande d’origine (voir la section 3.1.1.1.1 ci-dessus.)

Le contenu de données du message est donné ci-dessous.

| Nom | Cardinalité | Type | Description |
| --- | --- | --- | --- |
| errorInformation | 1 | ErrorInformation | Informations décrivant l’erreur et le code erreur. |

### <a id='consentRequests'></a>3.1.2 **/consentRequests**

La ressource **/consentRequests** est utilisée par un PISP pour initier le processus de liaison avec un compte DFSP au nom d’un utilisateur. Le PISP contacte le DFSP et envoie une liste des autorisations qu’il souhaite obtenir et les comptes pour lesquels il souhaite l'autorisation.

#### <a id='Requests-1'></a>3.1.2.1 Requêtes

Cette section décrit les services pouvant être demandés par un client sur la ressource API **/consentRequests**.

##### 3.1.2.1.1 **GET /consentRequests/**_{ID}_

Utilisé par : PISP

La requête HTTP **GET /consentRequests/**_{ID}_ est utilisée pour obtenir des informations sur un consentement précédemment demandé. Le *{ID}* dans l’URI doit contenir le consentRequestId qui a été attribué à la demande par le PISP lors de la création de la demande.

Informations de callback et modèle de données pour **GET /consentRequests/**_{ID}_ :
- Callback – **PUT /consentRequests/**_{ID}_
- Callback d’erreur – **PUT /consentRequests/**_{ID}_**/error**
- Modèle de données – corps vide

##### 3.1.2.1.2 **POST /consentRequests**

Utilisé par : PISP

La requête HTTP **POST /consentRequests** est utilisée pour demander à un DFSP d’accorder l’accès à un ou plusieurs comptes appartenant à un client du DFSP pour le PISP qui envoie la demande.

Callback et modèle de données pour **POST /consentRequests** :
- Callback : **PUT /consentRequests/**_{ID}_
- Callback d’erreur : **PUT /consentRequests/**_{ID}_**/error**
- Modèle de données – voir ci-dessous

| Nom | Cardinalité | Type | Description |
| --- | --- | --- | --- |
| consentRequestId | 1 | CorrelationId | ID commun entre le PISP et le DFSP payeur pour l’objet de demande de consentement. L’ID doit être réutilisé pour les renvois de la même demande. Un nouvel ID doit être généré pour chaque nouvelle demande. |
| userId           | 1 | String(1..128) | L'identifiant utilisé dans **GET /accounts/**_{ID}_. Utilisé par le DFSP pour mettre en corrélation une recherche de compte avec une `consentRequest` |
| scopes           | 1..256 | Scope | Une ou plusieurs demandes d’accès à un compte particulier. Dans chaque cas, l’adresse du compte et les types d’accès requis sont donnés. |
| authChannels     | 1..256 | ConsentRequestChannelType | Une collection des types d’authentification que le DFSP peut utiliser pour vérifier que son client a effectivement demandé l’accès pour le PISP aux comptes demandés. |
| callbackUri      | 1 | Uri | L’URI de redirection où l’utilisateur sera redirigé après vérification via le canal d’autorisation WEB. Ce champ est obligatoire car le PISP ne sait pas à l’avance quel AuthChannel le DSFP utilisera pour authentifier son utilisateur.  |

#### <a id='Callbacks-1'></a>3.1.2.2 Callbacks

Cette section décrit les callbacks utilisés par le serveur sous la ressource /consentRequests.

##### 3.1.2.2.1 **PUT /consentRequests/**_{ID}_

Utilisé par : DFSP

Un DFSP utilise ce callback pour (1) informer le PISP que la demande de consentement a été acceptée, et
(2) communiquer au PISP le `authChannel` qu’il doit utiliser pour authentifier son utilisateur.

Lorsque le PISP demande une série d’autorisations à un DFSP pour le compte d’un client du DFSP, il se peut que tous les droits ne soient pas accordés par le DFSP. Inversement, le processus d’autorisation hors bande peut aboutir à l’octroi de privilèges supplémentaires au PISP par le possesseur du compte. La ressource **PUT /consentRequests/**_{ID}_ retourne l’état courant des droits relatifs à une demande d’autorisation en particulier. Le modèle de données pour cet appel est le suivant :

| Nom | Cardinalité | Type | Description |
| --- | --- | --- | --- |
| scopes       | 1..256 | Scope | Une ou plusieurs demandes d’accès à un compte particulier. Dans chaque cas, l’adresse et les types d’accès demandés sont renseignés. |
| authChannels | 1 | ConsentRequestChannelType | Une liste d’un élément, que le DFSP utilise pour informer le PISP du canal d’autorisation choisi. |
| callbackUri  | 0..1 | Uri | L’URI de rappel où l’utilisateur sera redirigé après la vérification via le canal WEB. |
| authUri      | 0..1 | Uri | L’URI que le PISP doit appeler pour terminer la procédure s’il faut la compléter. |


##### 3.1.2.2.2 **PATCH /consentRequests/**_{ID}_

Utilisé par : PISP

Après que l’utilisateur a complété une autorisation hors bande avec le DFSP, le PISP recevra
un jeton qu’il pourra utiliser pour prouver au DFSP que l’utilisateur fait confiance à ce PISP.

| Nom | Cardinalité | Type | Description |
| --- | --- | --- | --- |
| authToken | 1 | BinaryString |Le jeton donné au PISP par le DFSP dans le cadre du processus d’authentification hors bande |

#### <a id='Errorcallbacks'></a>3.1.2.3 Callbacks d’Erreur

Cette section décrit les callbacks d’erreur utilisés par le serveur sous la ressource 
**/consentRequests**.

##### 3.1.2.3.1 **PUT /consentRequests/**_{ID}_**/error**

Utilisé par : DFSP

Si le serveur ne peut pas compléter la demande de consentement, ou si une erreur de traitement hors bande ou une autre erreur se produit, le callback d’erreur **PUT /consentRequests/**_{ID}_**/error** est utilisé. Le *{ID}* dans l’URI doit contenir *{ID}* utilisé dans la requête **GET /consentRequests/**_{ID}_ 
ou la requête **POST /consentRequests**. Le modèle de données pour cette ressource est :

| Nom | Cardinalité | Type | Description |
| --- | --- | --- | --- |
| errorInformation | 1 | ErrorInformation | Informations décrivant l’erreur et le code erreur. |

## <a id='ErrorCodes'></a>3.3 Codes d’erreur

Les codes d’erreur de l’API tierce partie sont définis dans la [Section 7.6](https://github.com/mojaloop/mojaloop-specification/blob/master/fspiop-api/documents/v1.1-document-set/API%20Definition%20v1.1.md#76-error-codes) de la Réf. 1 ci-dessus.

En outre, l’API tierce partie ajoute les codes d’erreur suivants, préfixés par `6` :

- Erreur générale tierce partie — **60**_xx_

| **Code d’erreur** | **Nom** | **Description** | /accounts | /consentRequests | /consents | /parties | /services | /thirdpartyRequests/authorizations | thirdpartyRequests/transactions | thirdpartyRequests/verifications |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **6000** | Erreur tierce partie | Erreur générique. | X | X | X | X | X | X | X | X |
| **6001** | Erreur de demande tierce partie | Échec de la demande tierce partie. | X | X | X | X | X | X | X | X |
| **6003** | Échec aval | La demande aval a échoué. | X | X | X | X | X | X | X | X |

- Erreur de permission — **61**_xx_

| **Code d’erreur** | **Nom** | **Description** | /accounts | /consentRequests | /consents | /parties | /services | /thirdpartyRequests/authorizations | thirdpartyRequests/transactions | thirdpartyRequests/verifications |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **6100** | Rejet d’authentification | Rejet d’authentification générique |   | X |   |   |   | X |   |   |
| **6101** | Étendues non prises en charge | Le PISP a demandé des étendues que le DFSP n’autorise ou ne prend pas en charge |   | X | X |   |   |   |   |   |
| **6102** | Consentement non accordé | L’utilisateur n’a pas accordé son consentement au PISP |   | X | X |   |   |   |   |   |
| **6103** | Consentement non valide | L’objet Consent n’est pas valide ou a été révoqué |   | X | X |   |   | X | X | X |
| **6104** | Rejet de demande tierce partie | La demande a été rejetée | X | X | X | X | X | X | X | X |

- Erreur de validation — **62**_xx_

| **Code d’erreur** | **Nom** | **Description** | /accounts | /consentRequests | /consents | /parties | /services | /thirdpartyRequests/authorizations | thirdpartyRequests/transactions | thirdpartyRequests/verifications |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **6200** | Justificatif de consentement invalide | La signature du justificatif soumis par le PISP est invalide |   |   | X |   |   |   |   |   |
| **6201** | Signature de transaction invalide | La signature de la réponse de vérification ne correspond pas au justificatif |   |   |   |   |   | X |   | X |
| **6203** | Jeton d’authentification invalide | Le DFSP reçoit un jeton d’authentification invalide du PISP |   | X |   |   |   |   |   |   |
| **6204** | callbackUri invalide | Le callbackUri est jugé invalide ou non fiable |   | X |   |   |   |   |   |   |
| **6205** | Aucun compte trouvé | Aucun compte n’a été trouvé pour l’identifiant donné | X |   |   |   |   |   |   |   |


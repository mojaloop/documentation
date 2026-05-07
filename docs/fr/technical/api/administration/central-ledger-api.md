---
showToc: true
---
# API du Central Ledger

## Introduction

Ce document fournit des informations détaillées sur l'API Central Ledger. L’API Central Ledger est une API Mojaloop permettant aux opérateurs du Hub de gérer les processus administratifs tels que :

- Création/activation/désactivation des participants dans le Hub
- Ajout et mise à jour des informations d’endpoints des participants
- Gestion des comptes, des limites et des positions des participants
- Création de comptes Hub
- Effectuer des opérations de dépôt (Funds In) et de retrait (Funds Out)
- Création/mise à jour/consultation des modèles de règlement (settlement)
- Récupération des détails des transferts

Pour plus d’informations sur les concepts de participants et de modèles de règlement que l’opérateur du Hub peut gérer via l’API Central Ledger, voir la section [Concepts de base](#basic-concepts).

<br />

## Concepts de base

Afin de contextualiser les opérations administratives rendues possibles par l’API Central Ledger, cette section présente une brève définition de certains concepts essentiels.

### Participant

Le Hub lui-même ou un Prestataire de Services Financiers Numériques (DFSP) qui participe à un schéma Mojaloop.

### Endpoint

L’URL de callback du DFSP où le Hub envoie les callbacks de l’API. L’URL spécifiée correspond à l’endpoint configuré dans la passerelle API sortante.

### Limite

Actuellement, un seul type de limite est supporté, appelée "_Net Debit Cap (NDC)_". À l’avenir, d’autres types de limites pourraient être pris en charge.

Le _Net Debit Cap_ représente la couverture de liquidité disponible pour un compte spécifique (le compte de Position). Il s’agit du montant total de fonds garantis que le système atteste disponibles afin de garantir qu’un participant a la capacité de régler les obligations résultant des transferts sur ce compte de Position. Ce montant est représenté par le solde d’un compte (le compte de Règlement), qui est lié au compte de Position via un modèle de règlement. L’origine des fonds dans ce compte peut provenir soit de dépôts/retraits effectués par les administrateurs du système, soit de fonds automatiquement crédités/débités par le système si le compte correspond à un modèle de règlement brut immédiat.

Il doit également être possible pour un participant d’indiquer qu’un montant (ou une proportion) des fonds disponibles dans un compte de Règlement soit exclu du calcul du Net Debit Cap. Dans le cas où un participant est bénéficiaire net sur le long terme via le règlement, ou conserve un excédent de fonds pour faire face à des périodes où il n’est pas possible d’alimenter les comptes, il peut choisir d’exclure une partie du solde de son compte de règlement du calcul de couverture pour les transferts.

### Compte

Également appelé _Ledger_. Le Hub maintient plusieurs comptes internes pour suivre les mouvements de fonds (argent électronique ou réel) entre les DFSPs.

### Position

La Position représente le solde net de :
- transferts sur le compte ayant été compensés mais pas encore réglés, et
- transferts sur le compte où :
  - le DFSP est débiteur,
  - le transfert a été accepté pour traitement mais pas encore compensé par le Hub.

La Position d’un compte donné est toujours vérifiable et à jour.

Lorsqu’un transfert est initié, le Hub vérifie que le DFSP dispose d’une couverture de liquidité suffisante sur ce compte pour couvrir le montant du transfert. Sinon, le transfert sera rejeté.

Nous autorisons actuellement que les obligations nées sur le compte – où le participant est bénéficiaire – réduisent la Position du participant, comme si ces fonds avaient déjà été réglés.

### Opérations Funds In et Funds Out

Les opérations Funds In et Funds Out servent à tracer (dans les comptes du Hub) les mouvements d’argent liés aux dépôts, retraits et règlements.

Les opérations Funds In enregistrent soit le dépôt d’argent sur le compte bancaire de règlement d’un DFSP, soit le montant du règlement pour un DFSP receveur.

Les opérations Funds Out enregistrent soit le retrait d’argent d’un compte bancaire de règlement d’un DFSP, soit le montant du règlement pour un DFSP qui envoie des fonds.

### Modèle de règlement (Settlement model)

Fait référence à la façon dont le règlement se produit dans un schéma. Le règlement est le processus par lequel des fonds sont transférés d’un DSFP à un autre, de sorte que le DFSP du payeur rembourse celui du bénéficiaire pour les fonds versés lors d’une transaction. Un modèle de règlement spécifie si les participants règlent séparément entre eux ou avec le schéma, si les transferts sont réglés un par un ou en lot, immédiatement ou avec délai, etc.

<br />

## Détails HTTP

Cette section fournit des informations détaillées sur l’usage du protocole HTTP au niveau applicatif dans l’API.

### Champs d’entête HTTP

Les entêtes HTTP sont généralement décrits dans la [RFC 7230](https://tools.ietf.org/html/rfc7230). Tout entête spécifique à l’API Central Ledger sera standardisé à l’avenir.

### Méthodes HTTP

Les méthodes HTTP suivantes, telles que définies dans la [RFC 7231](https://tools.ietf.org/html/rfc7231#section-4), sont supportées par l’API :

- `GET` – La méthode HTTP GET est utilisée par un client pour récupérer des informations concernant un objet déjà créé sur un serveur.
- `POST` – La méthode HTTP POST est utilisée par un client pour demander la création d’un objet sur le serveur.
- `PUT` – La méthode HTTP PUT est utilisée par un client pour modifier un objet déjà existant sur le serveur (remplace la représentation de la ressource cible par le contenu de la requête).

> **REMARQUE :** La méthode `DELETE` n’est pas prise en charge.

### Codes de statut de réponse HTTP

La table [Codes de statut de réponse HTTP](#http-response-status-codes) liste les codes de statut HTTP pris en charge par l’API :

|Code Statut|Raison|Description|
|---|---|---|
|**200**|OK|Réponse standard pour une opération `GET`, `PUT`, ou `POST` réussie. La réponse contiendra une entité correspondant à la ressource demandée.|
|**201**|Created|La requête `POST` a abouti à la création d’une nouvelle ressource. La réponse ne contiendra pas d’entité décrivant ou contenant le résultat de l’action.|
|**202**|Accepted|La requête a été acceptée pour traitement, mais le traitement n’est pas encore terminé.|
|**400**|Bad Request|Le serveur n’a pas compris la requête à cause d’une syntaxe invalide.|
|**401**|Unauthorized|L’accès à la ressource nécessite une authentification.|
|**403**|Forbidden|La requête a été rejetée, et le sera également à l’avenir.|
|**404**|Not Found|La ressource demandée n’est pas disponible actuellement.|
|**405**|Method Not Allowed|Une méthode HTTP non supportée a été utilisée.|
|**406**|Not Acceptable|La ressource demandée ne peut générer que du contenu non accepté selon les entêtes Accept de la requête.|
|**500**|Internal Server Error|Message d’erreur générique, utilisé lorsqu’une condition inattendue est rencontrée et qu’aucun message plus spécifique n’est approprié.|
|**501**|Not Implemented|Le serveur ne supporte pas le service demandé. Le client ne doit pas réessayer.|
|**503**|Service Unavailable|Le serveur est temporairement indisponible pour de nouvelles requêtes. Cela doit être un état temporaire, le client doit réessayer dans un délai raisonnable.|

<br />

## Services API

Cette section introduit et détaille tous les services supportés par l’API pour chaque ressource et méthode HTTP.

### Services API de haut niveau

De façon générale, l’API permet d’effectuer les actions suivantes :

- **`/participants`** : Consulter, créer ou modifier les détails des participants tels que la limite (Net Debit Cap), la position, ou les endpoints configurés.
- **`/settlementModels`** : Consulter, créer ou modifier les détails liés aux modèles de règlement (granularité, délais, contrôle de liquidité etc.).
- **`/transactions`** : Consulter les détails d’une transaction particulière.

### Services API supportés

La table [Services API supportés](#supported-api-services) inclut une description de haut niveau des services fournis par l’API. Pour plus de détails, se référer aux sections suivantes.

| URI  |  Méthode HTTP `GET`| Méthode HTTP `PUT` | Méthode HTTP `POST` | Méthode HTTP `DELETE` |
|---|---|---|---|---|
| **`/participants`**  | Obtenir les infos de tous les participants  | Non supporté  | Créer un participant dans le Hub  |  Non supporté |
| `/participants/limits`  | Voir les limites pour tous les participants  |  Non supporté | Non supporté  | Non supporté  |
| `/participants/{name}`  | Obtenir les infos d’un participant particulier  | Modifier les infos du participant (activer/désactiver)  | Non supporté  |  Non supporté |
| `/participants/{name}/endpoints`  | Voir les endpoints d’un participant  | Non supporté  | Ajouter/Modifier les endpoints d’un participant  | Non supporté  |
| `/participants/{name}/limits`  | Voir les limites d’un participant  |  Ajuster les limites d’un participant | Non supporté  |  Non supporté |
| `/participants/{name}/positions`  | Voir les positions d’un participant  | Non supporté  | Non supporté  | Non supporté  |
| `/participants/{name}/accounts`  | Voir les comptes et soldes d’un participant  |  Non supporté | Créer des comptes Hub  |  Non supporté |
| `/participants/{name}/accounts/{id}`  |  Non supporté | Modifier les comptes d’un participant  | Enregistrer un Funds In/Out pour le compte participant  | Non supporté  |
| `/participants/{name}/accounts/{id}/transfers/{transferId}`  | Non supporté  | Non supporté  | Enregistrer un transfert comme Funds In/Out pour un compte particpant  |  Non supporté |
| `/participants/{name}/initialPositionAndLimits`  | Non supporté  | Non supporté  |  Ajouter limites et position initiales du participant | Non supporté  |
| **`/settlementModels`**  | Voir tous les modèles de règlement  | Non supporté  | Créer un modèle de règlement  |  Non supporté |
| `/settlementModels/{name}`  | Voir un modèle de règlement par nom  | Modifier (activer/désactiver) un modèle de règlement  | Non supporté  |  Non supporté |
| **`/transactions/{id}`**  | Récupérer les détails d’une transaction par `transferId`  | Non supporté  | Non supporté  | Non supporté |


<br />

## Ressource API `/participants`

Les services proposés par la ressource `/participants` sont principalement utilisés par l’opérateur du Hub pour consulter, créer et modifier les paramètres des participants, tels que la limite (Net Debit Cap), la position ou les endpoints configurés.

### GET /participants

Récupère les informations de tous les participants.

#### Exemple de requête

```
curl 'http://<domain-where-hub-central-ledger-service-is-running>/participants'
```

#### Exemple de réponse

> **REMARQUE :** Dans l’exemple ci-dessous, `dev1-central-ledger.mojaloop.live` indique l’emplacement du service Central Ledger du Hub Mojaloop. Cet élément sera différent dans votre implémentation.

```
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "name": "greenbankfsp",
    "id": "dev1-central-ledger.mojaloop.live/participants/greenbankfsp",
    "created": "\"2021-03-04T14:20:17.000Z\"",
    "isActive": 1,
    "links": {
      "self": "dev1-central-ledger.mojaloop.live/participants/greenbankfsp"
    },
    "accounts": [
      {
        "id": 15,
        "ledgerAccountType": "POSITION",
        "currency": "USD",
        "isActive": 1,
        "createdDate": null,
        "createdBy": "unknown"
      },
      {
        "id": 16,
        "ledgerAccountType": "SETTLEMENT",
        "currency": "USD",
        "isActive": 1,
        "createdDate": null,
        "createdBy": "unknown"
      },
      {
        "id": 21,
        "ledgerAccountType": "INTERCHANGE_FEE_SETTLEMENT",
        "currency": "USD",
        "isActive": 1,
        "createdDate": null,
        "createdBy": "unknown"
      }
    ]
  },
  {
    "name": "Hub",
    "id": "dev1-central-ledger.mojaloop.live/participants/Hub",
    "created": "\"2021-03-04T13:37:25.000Z\"",
    "isActive": 1,
    "links": {
      "self": "dev1-central-ledger.mojaloop.live/participants/Hub"
    },
    "accounts": [
      {
        "id": 1,
        "ledgerAccountType": "HUB_MULTILATERAL_SETTLEMENT",
        "currency": "USD",
        "isActive": 1,
        "createdDate": null,
        "createdBy": "unknown"
      },
      {
        "id": 2,
        "ledgerAccountType": "HUB_RECONCILIATION",
        "currency": "USD",
        "isActive": 1,
        "createdDate": null,
        "createdBy": "unknown"
      }
    ]
  }
]
```

#### Modèle de données de la réponse

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `name`  |  oui | [String(2..30)](#string) | Le nom du participant. |
| `id`  |  oui | [String](#string) | L'identifiant du participant sous la forme d'un nom de domaine pleinement qualifié, combiné avec le `fspId` du participant. |
| `created`  |  oui | [DateTime](#datetime)  | Date et heure de création du participant. |
| `isActive`  |  oui | [Integer(1)](#integer) | Un indicateur pour préciser si le participant est actif ou non. Les valeurs possibles sont `1` et `0`. |
| `links`  |  oui | [Self](#self) | Liste de liens pour un service Web RESTful Hypermedia-Driven. | 	
| `accounts`  |  oui | [Accounts](#accounts) | Liste des comptes du grand livre configurés pour le participant. |

<br />

### POST /participants

Crée un participant dans le Hub.

#### Exemple de requête

```
curl -X POST -H "Content-Type: application/json" \
  -d '{"name": "payerfsp", "currency": "USD"}' \
  http://<domaine-où-le-service-central-ledger-tourne>/participants
```

#### Modèle de données de la requête

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `name`  |  oui | [String(2..30)](#string) | Le nom du participant. |
| `currency`  |  oui | [CurrencyEnum](#currencyenum) | La devise dans laquelle le participant effectuera des transactions. |

#### Exemple de réponse

> **REMARQUE :** Dans l'exemple ci-dessous, `dev1-central-ledger.mojaloop.live` indique l'emplacement du service Central Ledger du Hub Mojaloop. Ce détail peut être différent dans votre implémentation.

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "name": "payerfsp",
  "id": "dev1-central-ledger.mojaloop.live/participants/payerfsp",
  "created": "\"2021-01-12T10:56:30.000Z\"",
  "isActive": 0,
  "links": {
    "self": "dev1-central-ledger.mojaloop.live/participants/hub"
  },
  "accounts": [
    {
      "id": 30,
      "ledgerAccountType": "POSITION",
      "currency": "USD",
      "isActive": 0,
      "createdDate": null,
      "createdBy": "unknown"
    },
    {
      "id": 31,
      "ledgerAccountType": "SETTLEMENT",
      "currency": "USD",
      "isActive": 0,
      "createdDate": null,
      "createdBy": "unknown"
    }
  ]
}
```

#### Modèle de données de la réponse

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `name`  |  oui | [String(2..30)](#string) | Le nom du participant. |
| `id`  |  oui | [String](#string) | L'identifiant du participant sous la forme d'un nom de domaine pleinement qualifié, combiné avec le `fspId` du participant. |
| `created`  |  oui | [DateTime](#datetime)  | Date et heure de création du participant. |
| `isActive`  |  oui | [Integer(1)](#integer) | Un indicateur pour préciser si le participant est actif ou non. Les valeurs possibles sont `1` et `0`. |
| `links`  |  oui | [Self](#self) | Liste de liens pour un service Web RESTful Hypermedia-Driven. | 	
| `accounts`  |  oui | [Accounts](#accounts) | Liste des comptes du grand livre configurés pour le participant. |

<br />

### GET /participants/limits

Récupère les informations des limites pour tous les participants.

#### Paramètres de requête

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `currency`  |  non | [CurrencyEnum](#currencyenum) | La devise de la limite. |
| `limit`  |  non | [String](#string) | Type de limite. |

#### Exemple de requête

```
curl 'http://<domaine-où-le-service-central-ledger-tourne>/participants/limits'
```

#### Exemple de réponse

> **REMARQUE :** Dans l'exemple ci-dessous, `dev1-central-ledger.mojaloop.live` indique l'emplacement du service Central Ledger du Hub Mojaloop. Ce détail peut être différent dans votre implémentation.

```
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "name": "payerfsp",
    "currency": "USD",
    "limit": {
      "type": "NET_DEBIT_CAP",
      "value": 10000,
      "alarmPercentage": 10
    }
  },
  {
    "name": "payeefsp",
    "currency": "USD",
    "limit": {
      "type": "NET_DEBIT_CAP",
      "value": 10000,
      "alarmPercentage": 10
    }
  }
]
```

#### Modèle de données de la réponse

Chaque limite dans la liste renvoyée est appliquée au nom du participant et à le devise spécifiés dans chaque objet.

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `name`  |  oui | [String(2..30)](#string) | Le nom du participant. |
| `currency`  |  oui | [CurrencyEnum](#currencyenum) | La devise configurée pour le participant. |
| `limit`  |  oui | [ParticipantLimit](#participantlimit) | La limite configurée pour le participant. |

<br />

### GET /participants/{name}

Récupère les informations sur un participant donné.

#### Paramètres de chemin

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `name`  |  oui | [String(2..30)](#string) | Le nom du participant. |

#### Exemple de requête

```
curl 'http://<domaine-où-le-service-central-ledger-tourne>/participants/payerfsp'
```

#### Exemple de réponse

> **REMARQUE :** Dans l'exemple ci-dessous, `dev1-central-ledger.mojaloop.live` indique l'emplacement du service Central Ledger du Hub Mojaloop. Ce détail peut être différent dans votre implémentation.

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "name": "payerfsp",
  "id": "dev1-central-ledger.mojaloop.live/participants/payerfsp",
  "created": "\"2021-03-04T13:42:02.000Z\"",
  "isActive": 1,
  "links": {
    "self": "dev1-central-ledger.mojaloop.live/participants/payerfsp"
  },
  "accounts": [
    {
      "id": 3,
      "ledgerAccountType": "POSITION",
      "currency": "USD",
      "isActive": 1,
      "createdDate": null,
      "createdBy": "unknown"
    },
    {
      "id": 4,
      "ledgerAccountType": "SETTLEMENT",
      "currency": "USD",
      "isActive": 1,
      "createdDate": null,
      "createdBy": "unknown"
    },
    {
      "id": 24,
      "ledgerAccountType": "INTERCHANGE_FEE_SETTLEMENT",
      "currency": "USD",
      "isActive": 1,
      "createdDate": null,
      "createdBy": "unknown"
    }
  ]
}
```

#### Modèle de données de la réponse

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `name`  |  oui | [String(2..30)](#string) | Le nom du participant. |
| `id`  |  oui | [String](#string) | L'identifiant du participant sous la forme d'un nom de domaine pleinement qualifié, combiné avec le `fspId` du participant. |
| `created`  |  oui | [DateTime](#datetime)  | Date et heure de création du participant. |
| `isActive`  |  oui | [Integer(1)](#integer) | Un indicateur pour préciser si le participant est actif ou non. Les valeurs possibles sont `1` et `0`. |
| `links`  |  oui | [Self](#self) | Liste de liens pour un service Web RESTful Hypermedia-Driven. | 	
| `accounts`  |  oui | [Accounts](#accounts) | Liste des comptes du grand livre configurés pour le participant. |

<br />

### PUT /participants/{name}

Met à jour les détails du participant (active/désactive un participant).

#### Paramètres de chemin

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `name`  |  oui | [String(2..30)](#string) | Le nom du participant. |

#### Exemple de requête

```
curl -X PUT -H "Content-Type: application/json" \
  -d '{"isActive": true}' \
  http://<domaine-où-le-service-central-ledger-tourne>/participants/payerfsp 
```

#### Modèle de données de la requête

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `isActive`  |  oui | [Boolean](boolean) | Un indicateur pour préciser si le participant est actif ou non. |

#### Exemple de réponse

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "name": "payerfsp",
  "id": "dev1-central-ledger.mojaloop.live/participants/payerfsp",
  "created": "\"2021-03-04T13:42:02.000Z\"",
  "isActive": 1,
  "links": {
    "self": "dev1-central-ledger.mojaloop.live/participants/payerfsp"
  },
  "accounts": [
    {
      "id": 3,
      "ledgerAccountType": "POSITION",
      "currency": "USD",
      "isActive": 1,
      "createdDate": null,
      "createdBy": "unknown"
    },
    {
      "id": 4,
      "ledgerAccountType": "SETTLEMENT",
      "currency": "USD",
      "isActive": 1,
      "createdDate": null,
      "createdBy": "unknown"
    },
    {
      "id": 24,
      "ledgerAccountType": "INTERCHANGE_FEE_SETTLEMENT",
      "currency": "USD",
      "isActive": 1,
      "createdDate": null,
      "createdBy": "unknown"
    }
  ]
}
```

#### Modèle de données de la réponse

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `name`  |  oui | [String(2..30)](#string) | Le nom du participant. |
| `id`  |  oui | [String](#string) | L'identifiant du participant sous la forme d'un nom de domaine pleinement qualifié, combiné avec le `fspId` du participant. |
| `created`  |  oui | [DateTime](#datetime)  | Date et heure de création du participant. |
| `isActive`  |  oui | [Integer(1)](#integer) | Un indicateur pour préciser si le participant est actif ou non. Les valeurs possibles sont `1` et `0`. |
| `links`  |  oui | [Self](#self) | Liste de liens pour un service Web RESTful Hypermedia-Driven. | 	
| `accounts`  |  oui | [Accounts](#accounts) | Liste des comptes du grand livre configurés pour le participant. |

<br />

### GET /participants/{name}/endpoints

Récupère les informations sur les endpoints configurés pour un participant donné.

#### Paramètres de chemin

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `name`  |  oui | [String(2..30)](#string) | Le nom du participant. |

#### Exemple de requête

```
curl 'http://<domaine-où-le-service-central-ledger-tourne>/participants/payerfsp/endpoints'
```

#### Exemple de réponse
```
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "type": "FSPIOP_CALLBACK_URL_PARTICIPANT_SUB_ID_PUT",
    "value": "http://dev1-sim-payerfsp-scheme-adapter:4000/participants/{{partyIdType}}/{{partyIdentifier}}/{{partySubIdOrType}}"
  },
  {
    "type": "FSPIOP_CALLBACK_URL_PARTICIPANT_SUB_ID_PUT_ERROR",
    "value": "http://dev1-sim-payerfsp-scheme-adapter:4000/participants/{{partyIdType}}/{{partyIdentifier}}/{{partySubIdOrType}}/error"
  },
  {
    "type": "FSPIOP_CALLBACK_URL_PARTICIPANT_SUB_ID_DELETE",
    "value": "http://dev1-sim-payerfsp-scheme-adapter:4000/participants/{{partyIdType}}/{{partyIdentifier}}/{{partySubIdOrType}}"
  },
  {
    "type": "FSPIOP_CALLBACK_URL_PARTIES_SUB_ID_GET",
    "value": "http://dev1-sim-payerfsp-scheme-adapter:4000/parties/{{partyIdType}}/{{partyIdentifier}}/{{partySubIdOrType}}"
  },
  {
    "type": "FSPIOP_CALLBACK_URL_PARTIES_SUB_ID_PUT",
    "value": "http://dev1-sim-payerfsp-scheme-adapter:4000/parties/{{partyIdType}}/{{partyIdentifier}}/{{partySubIdOrType}}"
  },
  {
    "type": "FSPIOP_CALLBACK_URL_PARTIES_SUB_ID_PUT_ERROR",
    "value": "http://dev1-sim-payerfsp-scheme-adapter:4000/parties/{{partyIdType}}/{{partyIdentifier}}/{{partySubIdOrType}}/error"
  },
  {
    "type": "FSPIOP_CALLBACK_URL_AUTHORIZATIONS",
    "value": "http://dev1-sim-payerfsp-scheme-adapter:4000"
  },
  {
    "type": "FSPIOP_CALLBACK_URL_PARTICIPANT_PUT",
    "value": "http://dev1-sim-payerfsp-scheme-adapter:4000/participants/{{partyIdType}}/{{partyIdentifier}}"
  },
  {
    "type": "FSPIOP_CALLBACK_URL_PARTICIPANT_PUT_ERROR",
    "value": "http://dev1-sim-payerfsp-scheme-adapter:4000/participants/{{partyIdType}}/{{partyIdentifier}}/error"
  },
  {
    "type": "FSPIOP_CALLBACK_URL_PARTICIPANT_BATCH_PUT",
    "value": "http://dev1-sim-payerfsp-scheme-adapter:4000/participants/{{requestId}}"
  },
  {
    "type": "FSPIOP_CALLBACK_URL_PARTICIPANT_BATCH_PUT_ERROR",
    "value": "http://dev1-sim-payerfsp-scheme-adapter:4000/participants/{{requestId}}/error"
  },
  {
    "type": "FSPIOP_CALLBACK_URL_PARTIES_GET",
    "value": "http://dev1-sim-payerfsp-scheme-adapter:4000/parties/{{partyIdType}}/{{partyIdentifier}}"
  },
  {
    "type": "FSPIOP_CALLBACK_URL_PARTIES_PUT",
    "value": "http://dev1-sim-payerfsp-scheme-adapter:4000/parties/{{partyIdType}}/{{partyIdentifier}}"
  },
  {
    "type": "FSPIOP_CALLBACK_URL_PARTIES_PUT_ERROR",
    "value": "http://dev1-sim-payerfsp-scheme-adapter:4000/parties/{{partyIdType}}/{{partyIdentifier}}/error"
  },
  {
    "type": "FSPIOP_CALLBACK_URL_QUOTES",
    "value": "http://dev1-sim-payerfsp-scheme-adapter:4000"
  },
  {
    "type": "FSPIOP_CALLBACK_URL_TRX_REQ_SERVICE",
    "value": "http://dev1-sim-payerfsp-scheme-adapter:4000"
  },
  {
    "type": "FSPIOP_CALLBACK_URL_TRANSFER_POST",
    "value": "http://dev1-sim-payerfsp-scheme-adapter:4000/transfers"
  },
  {
    "type": "FSPIOP_CALLBACK_URL_TRANSFER_PUT",
    "value": "http://dev1-sim-payerfsp-scheme-adapter:4000/transfers/{{transferId}}"
  },
  {
    "type": "FSPIOP_CALLBACK_URL_TRANSFER_ERROR",
    "value": "http://dev1-sim-payerfsp-scheme-adapter:4000/transfers/{{transferId}}/error"
  },
  {
    "type": "FSPIOP_CALLBACK_URL_BULK_TRANSFER_POST",
    "value": "http://dev1-sim-payerfsp-scheme-adapter:4000/bulkTransfers"
  },
  {
    "type": "FSPIOP_CALLBACK_URL_BULK_TRANSFER_PUT",
    "value": "http://dev1-sim-payerfsp-scheme-adapter:4000/bulkTransfers/{{id}}"
  },
  {
    "type": "FSPIOP_CALLBACK_URL_BULK_TRANSFER_ERROR",
    "value": "http://dev1-sim-payerfsp-scheme-adapter:4000/bulkTransfers/{{id}}/error"
  },
  {
    "type": "NET_DEBIT_CAP_THRESHOLD_BREACH_EMAIL",
    "value": "some.email@gmail.com"
  },
  {
    "type": "NET_DEBIT_CAP_ADJUSTMENT_EMAIL",
    "value": "some.email@gmail.com"
  },
  {
    "type": "SETTLEMENT_TRANSFER_POSITION_CHANGE_EMAIL",
    "value": "some.email@gmail.com"
  }
]
```

#### Modèle de données de la réponse

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `type`  |  oui | [String](#string) | Type de endpoint. |
| `value`  |  oui | [String](#string) | Valeur du endpoint. |

<br />

### POST /participants/{name}/endpoints

Ajoute/met à jour des endpoints pour un participant donné.

#### Paramètres de chemin

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `name`  |  oui | [String(2..30)](#string) | Le nom du participant. |

#### Exemple de requête

```
curl -X POST -H "Content-Type: application/json" \
  -d '{"type": "NET_DEBIT_CAP_ADJUSTMENT_EMAIL", "value": "some.email@org.com"}'
  http://<domaine-où-le-service-central-ledger-tourne>/participants/payerfsp/endpoints 
```

#### Modèle de données de la requête

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `type`  |  oui | [String](#string) | Type de endpoint. |
| `value`  |  oui | [String](#string) | Valeur du endpoint. |

#### Exemple de réponse

```
HTTP/1.1 201 Created
Content-Type: application/json
```

<br />


### GET /participants/{name}/limits

Récupère les informations de limite pour un participant donné.

#### Paramètres de chemin

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `name`  |  oui | [String(2..30)](#string) | Le nom du participant. |

#### Paramètres de requête

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `currency`  |  non | [CurrencyEnum](#currencyenum) | La devise de la limite. |
| `limit`  |  non | [String](#string) | Type de limite. |

#### Exemple de requête

```
curl 'http://<domaine-où-le-service-central-ledger-tourne>/participants/payerfsp/limits'
```

#### Exemple de réponse

```
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "currency": "USD",
    "limit": {
      "type": "NET_DEBIT_CAP",
      "value": 10000,
      "alarmPercentage": 10
    }
  }
]
```

#### Modèle de données de la réponse

Chaque limite dans la liste renvoyée est appliquée au nom du participant et à le devise spécifiés dans chaque objet.

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `currency`  |  oui | [CurrencyEnum](#currencyenum) | La devise configurée pour le participant. |
| `limit`  |  oui | [ParticipantLimit](#participantlimit) | La limite configurée pour le participant.  |

<br />

### PUT /participants/{name}/limits

Ajuste les limites pour un participant donné.

#### Paramètres de chemin

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `name`  |  oui | [String(2..30)](#string) | Le nom du participant. |

#### Exemple de requête

```
curl -X PUT -H "Content-Type: application/json" \
  -d '{ \
    "currency": "USD", \
    "limit": { \
      "type": NET_DEBIT_CAP", \
      "value": 10000, \
      "alarmPercentage": 20
    } \
  }' \
  http://<domaine-où-le-service-central-ledger-tourne>/participants/payerfsp/limits 
```

#### Modèle de données de la requête

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `currency`  |  oui | [CurrencyEnum](#currencyenum) | La devise configurée pour le participant. |
| `limit`  |  oui | [ParticipantLimit](#participantlimit) | La limite configurée pour le participant.  |

#### Exemple de réponse

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "currency": "USD",
  "limit": {
    "type": "NET_DEBIT_CAP",
    "value": 10000,
    "alarmPercentage": 20
  }
}
```

#### Modèle de données de la réponse

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `currency`  |  oui | [CurrencyEnum](#currencyenum) | La devise configurée pour le participant. |
| `limit`  |  oui | [ParticipantLimit](#participantlimit) | La limite configurée pour le participant.  |

<br />

### GET /participants/{name}/positions

Récupère la position d'un participant donné.

#### Paramètres de chemin

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `name`  |  oui | [String(2..30)](#string) | Le nom du participant. |

#### Paramètres de requête

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `currency`  |  non | [CurrencyEnum](#currencyenum) | La devise de la limite. |

#### Exemple de requête

```
curl 'http://<domaine-où-le-service-central-ledger-tourne>/participants/payerfsp/positions'
```

#### Exemple de réponse

```
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "currency": "USD",
    "value": 150,
    "changedDate": "2021-05-10T08:01:38.000Z"
  }
]
```

#### Modèle de données de la réponse

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `currency`  |  oui | [CurrencyEnum](#currencyenum) | La devise configurée pour le participant. |
| `value`  |  oui | [Number](#number) | Valeur de la position. |
| `changedDate`  |  oui | [DateTime](#datetime)  | Date et heure du dernier changement de la position. |

<br />

### GET /participants/{name}/accounts

Récupère les comptes et soldes d’un participant donné.

#### Paramètres de chemin

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `name`  |  oui | [String(2..30)](#string) | Le nom du participant. |

#### Exemple de requête

```
curl 'http://<domaine-où-le-service-central-ledger-tourne>/participants/payerfsp/accounts'
```

#### Exemple de réponse

```
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "id": 3,
    "ledgerAccountType": "POSITION",
    "currency": "USD",
    "isActive": 1,
    "value": 150,
    "reservedValue": 0,
    "changedDate": "2021-05-10T08:01:38.000Z"
  },
  {
    "id": 4,
    "ledgerAccountType": "SETTLEMENT",
    "currency": "USD",
    "isActive": 1,
    "value": -165000,
    "reservedValue": 0,
    "changedDate": "2021-05-10T14:27:02.000Z"
  },
  {
    "id": 24,
    "ledgerAccountType": "INTERCHANGE_FEE_SETTLEMENT",
    "currency": "USD",
    "isActive": 1,
    "value": 0,
    "reservedValue": 0,
    "changedDate": "2021-03-30T12:23:06.000Z"
  }
]
```

#### Modèle de données de la réponse

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `id`  |  oui | [Integer](#integer) | Identifiant du compte du grand livre. |
| `ledgerAccountType`  |  oui | [String](#string) | Type de compte du grand livre. |
| `currency`  |  oui | [CurrencyEnum](#currencyenum) | Devise du compte du grand livre. |
| `isActive`  |  oui | [Integer(1)](#integer) | Indique si le compte du grand livre est actif ou non. Les valeurs possibles sont `1` et `0`. |
| `value`  |  oui | [Number](#number) | Solde du compte. |
| `reservedValue`  |  oui | [Number](#number) | Valeur réservée dans le compte. |
| `changedDate`  |  oui | [DateTime](#datetime)  | Date et heure du dernier changement du compte du grand livre. |

<br />

### POST /participants/{name}/accounts

Crée des comptes dans le Hub.

#### Paramètres de chemin

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `name`  |  oui | [String(2..30)](#string) | Le nom du participant. |

#### Exemple de requête

```
curl -X POST -H "Content-Type: application/json" \
  -d '{"currency": "USD", "type": "HUB_MULTILATERAL_SETTLEMENT"}' \
  http://<domaine-où-le-service-central-ledger-tourne>/participants/payerfsp/accounts  
```

#### Modèle de données de la requête

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `currency`  |  oui | [CurrencyEnum](#currencyenum) | La devise du compte du grand livre du participant. |
| `type`  |  oui | [String](#string) | Type de compte du grand livre. |

#### Exemple de réponse

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "name": "hub",
  "id": "dev1-central-ledger.mojaloop.live/participants/hub",
  "created": "2021-01-12T10:56:30.000Z",
  "isActive": 0,
  "links": {
    "self": "dev1-central-ledger.mojaloop.live/participants/hub"
  },
  "accounts": [
    {
      "id": 1,
      "ledgerAccountType": "HUB_MULTILATERAL_SETTLEMENT",
      "currency": "USD",
      "isActive": 0,
      "createdDate": "2021-01-12T10:56:30.000Z",
      "createdBy": "unknown"
    }
  ]
}
```

#### Modèle de données de la réponse

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `name`  |  oui | [String](#string) | Le nom du participant. |
| `id`  |  oui | [String](#string) | L'identifiant du participant sous la forme d'un nom de domaine pleinement qualifié, combiné avec le `fspId` du participant. |
| `created`  |  oui | [DateTime](#datetime)  | Date et heure de création du participant. |
| `isActive`  |  oui | [Integer(1)](#integer) | Un indicateur pour préciser si le participant est actif ou non. Les valeurs possibles sont `1` et `0`. |
| `links`  |  oui | [Self](#self) | Liste de liens pour un service Web RESTful Hypermedia-Driven. | 	
| `accounts`  |  oui | [Accounts](#accounts) | Liste des comptes du grand livre configurés pour le participant. |

<br />

### POST /participants/{name}/accounts/{id}

Enregistre des mouvements de fonds entrants ou sortants d’un compte de participant.

#### Paramètres de chemin

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `name`  |  oui | [String(2..30)](#string) | Le nom du participant. |
| `id`  |  oui | [Integer](#integer) | Identifiant du compte. |

#### Exemple de requête

````
curl -X POST -H "Content-Type: application/json" \
  -d '{ \
    "transferId": "bfd38d14-893f-469d-a6ca-a312a0223949", \
    "externalReference": "660616", \
    "action": "recordFundsIn", \
    "reason": "settlement", \
    "amount": { \
      "amount": "5000", \
      "currency": "USD" \
    }, \
    "extensionList": { \
      "extension": [ \
        { \
          "key": "scheme", \
          "value": "abc" \
        } \
      ] \
    } \
  }' \
  http://<domaine-où-le-service-central-ledger-tourne>/participants/payerfsp/accounts/2
````

#### Modèle de données de la requête

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `transferId`  | oui  | [UUID](#uuid) | Identifiant du transfert. |
| `externalReference`  |  oui | [String](#string) | Référence à toute donnée externe, telle qu'un identifiant de la banque de règlement. |
| `action`  |  oui | [Enum](#enum) | L'action effectuée sur les fonds. Les valeurs possibles sont : `recordFundsIn` et `recordFundsOutPrepareReserve`. |
| `reason`  |  oui | [String](#string) | Raison de l'opération de funds in ou funds out. |
| `amount`  | oui  | [Money](#money) | Montant de l'opération (FundsIn ou FundsOut). |
| `extensionList`  | non  | [ExtensionList](#extensionlist) | Détails supplémentaires. |

#### Exemple de réponse

````
HTTP/1.1 202 Accepted
````

<br />

### PUT /participants/{name}/accounts/{id}

Met à jour un compte de participant. Actuellement, seule la modification du champ `isActive` est prise en charge.

#### Paramètres de chemin

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `name`  |  oui | [String(2..30)](#string) | Le nom du participant. |
| `id`  |  oui | [Integer](#integer) | Identifiant du compte. |

#### Exemple de requête

```
curl -X PUT -H "Content-Type: application/json" \
  -d '{"isActive": true}' \
  http://<domaine-où-le-service-central-ledger-tourne>/participants/payerfsp/account/2 
```

#### Modèle de données de la requête

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `isActive`  |  oui | [Boolean](boolean) | Indique si le compte du participant est actif ou non. |

#### Exemple de réponse

```
HTTP/1.1 200 OK
```

<br />

### PUT /participants/{name}/accounts/{id}/transfers/{transferId}

Enregistre un transfert en tant qu’opération de fonds entrants ou sortants pour un compte de participant.

#### Paramètres de chemin

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `name`  |  oui | [String(2..30)](#string) | Le nom du participant. |
| `id`  |  oui | [Integer](#integer) | Identifiant du compte. |
| `transferId`  |  oui | [UUID](#uuid) | Identifiant du transfert. |

#### Exemple de requête

```
curl -X PUT -H "Content-Type: application/json" \
  -d '{"action": "recordFundsOutCommit", "reason": "fix"}' \
  http://<domaine-où-le-service-central-ledger-tourne>/participants/payerfsp/account/2/transfers/bfd38d14-893f-469d-a6ca-a312a0223949
```

#### Modèle de données de la requête

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `action`  |  oui | [Enum](#enum) | Action de funds out effectuée. Valeurs possibles : `recordFundsOutCommit` et `recordFundsOutAbort`. |
| `reason`  |  oui | [String](#string) | Raison de l'opération de FundsOut. |

#### Exemple de réponse

```
HTTP/1.1 202 Accepted
```

<br />

### POST /participants/{name}/initialPositionAndLimits

Ajoute des limites initiales et une position pour un participant particulier.

#### Paramètres de chemin

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `name`  |  oui | [String(2..30)](#string) | Le nom du participant. |

#### Exemple de requête

````
curl -X POST -H "Content-Type: application/json" \
  -d '{ \
    "currency": "USD", \
    "limit": { \
      "type": "NET_DEBIT_CAP", \
      "value": "10000" \
    }, \
    "initialPosition": 0 \
  }' \
  http://<domaine-où-le-service-central-ledger-tourne>/participants/payerfsp/initialPositionAndLimits
````

#### Modèle de données de la requête

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `currency`  |  oui | [CurrencyEnum](#currencyenum) | Devise du participant. |
| `limit`  |  oui | [ParticipantLimit](#participantlimit) | Limite configurée pour le participant. |
| `initialPosition`  |  non | [Number](#number) | Position initiale. |

#### Exemple de réponse

```
HTTP/1.1 201 Created
```

<br />

## Ressource API `/settlementModels`

Les services fournis par la ressource `/settlementModels` sont utilisés par l’opérateur du Hub pour créer, mettre à jour et consulter des modèles de règlement.

### GET /settlementModels

Récupère les informations de tous les modèles de règlement.

#### Exemple de requête

```
curl 'http://<domaine-où-le-service-central-ledger-tourne>/settlementModels'
```

#### Exemple de réponse

```
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "settlementModelId": 1,
    "name": "DEFERREDNETUSD",
    "isActive": true,
    "settlementGranularity": "NET",
    "settlementInterchange": "MULTILATERAL",
    "settlementDelay": "DEFERRED",
    "currency": "USD",
    "requireLiquidityCheck": true,
    "ledgerAccountTypeId": "POSITION",
    "autoPositionReset": true
  },
  {
    "settlementModelId": 4,
    "name": "DEFERREDNETEUR",
    "isActive": true,
    "settlementGranularity": "NET",
    "settlementInterchange": "MULTILATERAL",
    "settlementDelay": "DEFERRED",
    "currency": "EUR",
    "requireLiquidityCheck": true,
    "ledgerAccountTypeId": "SETTLEMENT",
    "autoPositionReset": true
  }
]
```

#### Modèle de données de la réponse

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `settlementModelId`  |  oui | [Integer](#integer) | Identifiant du modèle de règlement. |
| `name`  |  oui | [String](#string) | Nom du modèle de règlement. |
| `isActive`  |  oui | [Boolean](boolean) | Indique si le modèle de règlement est actif ou non. |
| `settlementGranularity`  |  oui | [String](#string) | Spécifie si les transferts sont réglés un par un ou en lot. Valeurs possibles : <br> `GROSS` : Règlement exécuté après chaque transfert complété, c'est-à-dire, il y a une opération de règlement pour chaque transaction. <br> `NET` : Un groupe de transferts est réglé ensemble dans une seule opération de règlement, chaque participant réglant la somme nette de tous les transferts sur une période donnée. |
| `settlementInterchange`  |  oui | [String](#string) | Spécifie le type d’arrangement de règlement entre parties. Valeurs possibles : <br> `BILATERAL` : Chaque participant règle ses obligations avec les autres séparément, et le schéma n’est pas partie au règlement. <br> `MULTILATERAL` : Chaque participant règle avec le schéma le solde net de ses obligations, au lieu de régler séparément avec chaque partie. |
| `settlementDelay`  |  oui | [String](#string) | Spécifie si le règlement a lieu immédiatement après qu’un transfert est terminé ou avec un délai. Valeurs possibles : <br> `IMMEDIATE` : Le règlement a lieu immédiatement après la fin d’un transfert. <br> `DEFERRED` : Le règlement est géré par l’opérateur du Hub à la demande ou selon un calendrier. |
| `currency`  |  oui | [CurrencyEnum](#currencyenum) | Devise configurée pour le modèle de règlement. |
| `requireLiquidityCheck`  |  oui | [Boolean](boolean) | Indique si le modèle de règlement nécessite une vérification de liquidité ou non. |
| `ledgerAccountTypeId`  |  oui | [String](#string) | Type de compte de grand livre. Valeurs possibles : <br> `INTERCHANGE_FEE` : Suit les frais d’interchange appliqués aux transferts.<br> `POSITION` : Suit les montants dus ou à recevoir pour un DFSP.<br> `SETTLEMENT` : Compte bancaire de règlement du DFSP reflété dans le Hub. Sert de compte de rapprochement et reflète le mouvement des fonds réels. |
| `autoPositionReset`  |  oui | [Boolean](boolean) | Indique si le modèle de règlement nécessite la remise à zéro automatique de la position ou non. |

<br />

### POST /settlementModels

Crée un modèle de règlement.

#### Exemple de requête

```
curl -X POST -H "Content-Type: application/json" \
  -d '{ \
    "name": "DEFERREDNET", \
    "settlementGranularity": "NET", \
    "settlementInterchange": "MULTILATERAL", \
    "settlementDelay": "DEFERRED", \
    "requireLiquidityCheck": true, \
    "ledgerAccountType": "POSITION", \
    "autoPositionReset": true \
  }' \
  http://<domaine-où-le-service-central-ledger-tourne>/settlementModels
```

#### Modèle de données de la requête

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `name`  |  oui | [String](#string) | Nom du modèle de règlement. |
| `settlementGranularity`  |  oui | [String](#string) | Spécifie si les transferts sont réglés un par un ou en lot. Valeurs possibles : <br> `GROSS` : Règlement exécuté après chaque transfert complété, c'est-à-dire, il y a une opération de règlement pour chaque transaction. <br> `NET` : Un groupe de transferts est réglé ensemble dans une seule opération de règlement, chaque participant réglant la somme nette de tous les transferts sur une période donnée. |
| `settlementInterchange`  |  oui | [String](#string) | Spécifie le type d’arrangement de règlement entre parties. Valeurs possibles : <br> `BILATERAL` : Chaque participant règle ses obligations avec les autres séparément, et le schéma n’est pas partie au règlement. <br> `MULTILATERAL` : Chaque participant règle avec le schéma le solde net de ses obligations, au lieu de régler séparément avec chaque partie. |
| `settlementDelay`  |  oui | [String](#string) | Spécifie si le règlement a lieu immédiatement après qu’un transfert est terminé ou avec un délai. Valeurs possibles : <br> `IMMEDIATE` : Le règlement a lieu immédiatement après la fin d’un transfert. <br> `DEFERRED` : Le règlement est géré par l’opérateur du Hub à la demande ou selon un calendrier. |
| `currency`  |  oui | [CurrencyEnum](#currencyenum) | Devise configurée pour le modèle de règlement. |
| `requireLiquidityCheck`  |  oui | [Boolean](boolean) | Indique si le modèle de règlement nécessite une vérification de liquidité ou non. |
| `ledgerAccountTypeId`  |  oui | [String](#string) | Type de compte de grand livre. Valeurs possibles : <br> `INTERCHANGE_FEE` : Suit les frais d’interchange appliqués aux transferts.<br> `POSITION` : Suit les montants dus ou à recevoir pour un DFSP.<br> `SETTLEMENT` : Compte bancaire de règlement du DFSP reflété dans le Hub. Sert de compte de rapprochement et reflète le mouvement des fonds réels. |
| `settlementAccountType`  |  oui | [String](#string) | Un type spécial de compte de grand livre dans lequel les règlements doivent être versés. Valeurs possibles : <br> `SETTLEMENT` : Un compte de règlement pour la valeur principale des transferts (c’est-à-dire, le montant que le payeur souhaite verser au bénéficiaire). <br> `INTERCHANGE_FEE_SETTLEMENT` : Un compte de règlement pour les frais liés aux transferts. |
| `autoPositionReset`  |  oui | [Boolean](boolean) | Indique si le modèle de règlement nécessite la remise à zéro automatique de la position ou non. |

#### Exemple de réponse

```
HTTP/1.1 201 Created
```

<br />

### GET /settlementModels/{name}

Récupère des informations sur un modèle de règlement particulier.

#### Paramètres de chemin

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `name`  |  oui | [String](#string) | Le nom du modèle de règlement. |

#### Exemple de requête

```
curl 'http://<domaine-où-le-service-central-ledger-tourne>/settlementModels/DEFERREDNET'
```

#### Exemple de réponse

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "settlementModelId": 1,
  "name": "DEFERREDNET",
  "isActive": true,
  "settlementGranularity": "NET",
  "settlementInterchange": "MULTILATERAL",
  "settlementDelay": "DEFERRED",
  "currency": "USD",
  "requireLiquidityCheck": true,
  "ledgerAccountTypeId": "POSITION",
  "autoPositionReset": true
}
```

#### Modèle de données de la réponse

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `settlementModelId`  |  oui | [Integer](#integer) | Identifiant du modèle de règlement. |
| `name`  |  oui | [String](#string) | Nom du modèle de règlement. |
| `isActive`  |  oui | [Boolean](boolean) | Indique si le modèle de règlement est actif ou non. |
| `settlementGranularity`  |  oui | [String](#string) | Spécifie si les transferts sont réglés un par un ou en lot. Valeurs possibles : <br> `GROSS` : Le règlement est exécuté après chaque transfert complété, c'est-à-dire qu'il y a une opération de règlement pour chaque transaction. <br> `NET` : Un groupe de transferts est réglé ensemble dans une seule opération de règlement, chaque participant réglant la somme nette de tous les transferts sur une période donnée.|
| `settlementInterchange`  |  oui | [String](#string) | Spécifie le type d’arrangement de règlement entre parties. Valeurs possibles : <br> `BILATERAL` : Chaque participant règle séparément ses obligations avec les autres, et le schéma n'est pas partie au règlement. <br> `MULTILATERAL` : Chaque participant règle avec le schéma le solde net de ses obligations, au lieu de régler séparément avec chaque partie.|
| `settlementDelay`  |  oui | [String](#string) | Spécifie si le règlement a lieu immédiatement après la fin d’un transfert ou avec un délai. Valeurs possibles : <br> `IMMEDIATE` : Le règlement a lieu immédiatement après la fin d’un transfert. <br> `DEFERRED` : Le règlement est géré par l’opérateur du Hub à la demande ou selon un calendrier.|
| `currency`  |  oui | [CurrencyEnum](#currencyenum) | Devise configurée pour le modèle de règlement. |
| `requireLiquidityCheck`  |  oui | [Boolean](boolean) | Indique si le modèle de règlement nécessite une vérification de liquidité. |
| `ledgerAccountTypeId`  |  oui | [String](#string) | Type de compte de grand livre. Valeurs possibles : <br> `INTERCHANGE_FEE` : Suit les frais d’interchange appliqués aux transferts.<br> `POSITION` : Suit combien un DFSP doit ou est dû. <br> `SETTLEMENT` : Le compte bancaire de règlement du DFSP reflété dans le Hub. Sert de compte de rapprochement et reflète le mouvement des fonds réels. |
| `autoPositionReset`  |  oui | [Boolean](boolean) | Indique si le modèle de règlement nécessite la remise à zéro automatique de la position. |

<br />

### PUT /settlementModels/{name}

Met à jour un modèle de règlement (active/désactive un modèle de règlement).

#### Paramètres de chemin

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `name`  |  oui | [String](#string) | Le nom du modèle de règlement. |

#### Exemple de requête

```
curl -X PUT -H "Content-Type: application/json" \ 
  -d '{"isActive": true}' \
  http://<domaine-où-le-service-central-ledger-tourne>/settlementModels/DEFERREDNET 
```

#### Modèle de données de la requête

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `isActive`  |  oui | [Boolean](#boolean) | Indique si le modèle de règlement est actif ou non. |

#### Exemple de réponse

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "settlementModelId": 1,
  "name": "DEFERREDNET",
  "isActive": true,
  "settlementGranularity": "NET",
  "settlementInterchange": "MULTILATERAL",
  "settlementDelay": "DEFERRED",
  "currency": "USD",
  "requireLiquidityCheck": true,
  "ledgerAccountTypeId": "POSITION",
  "autoPositionReset": true
}
```

#### Modèle de données de la réponse

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `settlementModelId`  |  oui | [Integer](#integer) | Identifiant du modèle de règlement. |
| `name`  |  oui | [String](#string) | Nom du modèle de règlement. |
| `isActive`  |  oui | [Boolean](boolean) | Indique si le modèle de règlement est actif ou non. |
| `settlementGranularity`  |  oui | [String](#string) | Spécifie si les transferts sont réglés un par un ou en lot. Valeurs possibles : <br> `GROSS` : Le règlement est exécuté après chaque transfert complété, c'est-à-dire qu'il y a une opération de règlement pour chaque transaction. <br> `NET` : Un groupe de transferts est réglé ensemble dans une seule opération de règlement, chaque participant réglant la somme nette de tous les transferts sur une période donnée.|
| `settlementInterchange`  |  oui | [String](#string) | Spécifie le type d’arrangement de règlement entre parties. Valeurs possibles : <br> `BILATERAL` : Chaque participant règle séparément ses obligations avec les autres, et le schéma n'est pas partie au règlement. <br> `MULTILATERAL` : Chaque participant règle avec le schéma le solde net de ses obligations, au lieu de régler séparément avec chaque partie.|
| `settlementDelay`  |  oui | [String](#string) | Spécifie si le règlement a lieu immédiatement après la fin d’un transfert ou avec un délai. Valeurs possibles : <br> `IMMEDIATE` : Le règlement a lieu immédiatement après la fin d’un transfert. <br> `DEFERRED` : Le règlement est géré par l’opérateur du Hub à la demande ou selon un calendrier.|
| `currency`  |  oui | [CurrencyEnum](#currencyenum) | Devise configurée pour le modèle de règlement. |
| `requireLiquidityCheck`  |  oui | [Boolean](#boolean) | Indique si le modèle de règlement nécessite une vérification de liquidité. |
| `ledgerAccountTypeId`  |  oui | [String](#string) | Type de compte de grand livre. Valeurs possibles : <br> `INTERCHANGE_FEE` : Suit les frais d’interchange appliqués aux transferts.<br> `POSITION` : Suit combien un DFSP doit ou est dû. <br> `SETTLEMENT` : Le compte bancaire de règlement du DFSP reflété dans le Hub. Sert de compte de rapprochement et reflète le mouvement des fonds réels. |
| `autoPositionReset`  |  oui | [Boolean](#boolean) | Indique si le modèle de règlement nécessite la remise à zéro automatique de la position. |

<br />

## Ressource API `/transactions`

Les services proposés par la ressource `/transactions` sont utilisés par l'Opérateur du Hub pour récupérer les détails des transferts.

### GET /transactions/{id}

Récupère des informations sur une transaction particulière.

#### Paramètres de chemin

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `id`  |  oui | [UUID](#uuid) | Identifiant du transfert. |

#### Exemple de requête

```
curl 'http://<domaine-où-le-service-central-ledger-tourne>/transactions/85feac2f-39b2-491b-817e-4a03203d4f14'
```

#### Exemple de réponse

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "quoteId": "7c23e80c-d078-4077-8263-2c047876fcf6",
  "transactionId": "85feac2f-39b2-491b-817e-4a03203d4f14",
  "transactionRequestId": "a8323bc6-c228-4df2-ae82-e5a997baf898",
  "payee": {
    "partyIdInfo": {
      "partyIdType": "MSISDN",
      "partyIdentifier": "123456789",
      "fspId": "MobileMoneyAbc"
    },
    "name": "John Doe",
    "personalInfo": {
      "complexName": {
        "firstName": "John",
        "middleName": "William",
        "lastName": "Doe"
      },
      "dateOfBirth": "1966-06-16"
    }
  },
  "payer": {
    "partyIdInfo": {
      "partyIdType": "MSISDN",
      "partyIdentifier": "987654321",
      "fspId": "MobileMoneyXyz"
    },
    "name": "Jane Doe",
    "personalInfo": {
      "complexName": {
        "firstName": "Mary",
        "middleName": "Jane",
        "lastName": "Doe"
      },
      "dateOfBirth": "1975-05-15"
    }
  },
  "amount": {
    "currency": "USD",
    "amount": "50"
  },
  "transactionType": {
    "scenario": "DEPOSIT",
    "initiator": "PAYER",
    "initiatorType": "CONSUMER"
  }
}
```

#### Modèle de données de la réponse

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `quoteId`  |   | [UUID](#uuid) | Identifiant du devis (quote). |
| `transactionId`  |   | [UUID](#uuid) | Identifiant de la transaction. |
| `transactionRequestId`  |   | [String](#string) | Identifie une éventuelle demande de transaction envoyée précédemment. |
| `payee`  |   | [Party](#party) | Détails du bénéficiaire. |
| `payer`  |   | [Party](#party) | Détails du payeur. |
| `amount`  |   | [Money](#money) | Montant de la transaction. |
| `transactionType`  |   | [TransactionType](#transactiontype) | Détails sur le type de transaction. |
| `note`  |   | [String](#string) | Un mémo qui sera attaché à la transaction. |
| `extensionList`  |   | [ExtensionList](#extensionlist) | Détails additionnels. |

<br />

## Modèles de données utilisés par l'API

### Format

Pour les détails sur les formats utilisés pour les types de données élémentaires de l’API, voir la section [Element Data Type Formats](../fspiop/logical-data-model#element-data-type-formats) dans la définition de l’API Mojaloop FSPIOP.

### Formats de type de données élémentaires

Cette section définit les types de données élémentaires utilisés par l'API.

#### Amount

Pour plus de détails, voir la section [Amount](../fspiop/logical-data-model#amount) dans la définition de l’API Mojaloop FSPIOP.

#### Boolean

Une valeur `"true"` ou `"false"`.

#### DateTime

Pour plus de détails, voir la section [DateTime](../fspiop/logical-data-model#datetime) dans la définition de l’API Mojaloop FSPIOP.

#### Enum

Pour plus de détails, voir la section [Enum](../fspiop/logical-data-model#enum) dans la définition de l’API Mojaloop FSPIOP.

#### Integer

Pour plus de détails, voir la section [Integer](../fspiop/logical-data-model#integer) dans la définition de l’API Mojaloop FSPIOP.

#### Number

Le type de données API `Number` est un nombre décimal en base 10 de précision arbitraire.

#### String

Pour plus de détails, voir la section [String](../fspiop/logical-data-model#string) dans la définition de l’API Mojaloop FSPIOP.

#### UUID

Pour plus de détails, voir la section [UUID](../fspiop/logical-data-model#uuid) dans la définition de l’API Mojaloop FSPIOP.

<br />

## Définitions des éléments

Cette section définit les types d’éléments utilisés par l’API.

#### IsActive

Modèle de données pour l’élément **IsActive**.

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `isActive`  | oui | [Integer(1)](#integer) | Indique si un compte de grand livre/participant est actif ou non. Valeurs possibles : `1` (actif) et `0` (inactif). |

#### IsActiveBoolean

Modèle de données pour l’élément **IsActiveBoolean**.

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `isActive`  | oui | [Boolean](#boolean) | Indique si un compte / participant / modèle de règlement est actif ou non. |

#### CurrencyEnum

Pour plus de détails, voir la section [Currency](../fspiop/logical-data-model#currencycode-enum) enum dans la définition de l’API Mojaloop FSPIOP.

#### RequireLiquidityCheck

Modèle de données pour l'élément **RequireLiquidityCheck**.

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `requireLiquidityCheck`  | oui | [Boolean](#boolean) | Indique si un modèle de règlement nécessite une vérification de liquidité. |

#### Self

Modèle de données pour l’élément **Self**.

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `self`  | oui | [String](#string) | Nom de domaine pleinement qualifié combiné avec le `fspId` du participant. |

#### SettlementDelay

Modèle de données pour l’élément **SettlementDelay**.

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `settlementDelay`  | oui | [Enum](#enum) de String | Spécifie si le règlement a lieu immédiatement après la fin d’un transfert ou avec un délai. Valeurs autorisées : <br> `IMMEDIATE` : Le règlement a lieu immédiatement après la fin d’un transfert. <br> `DEFERRED` : Le règlement est géré par l’opérateur du Hub à la demande ou selon un calendrier. |

#### SettlementGranularity

Modèle de données pour l’élément **SettlementGranularity**.

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `settlementGranularity`  | oui | [Enum](#enum) de String | Spécifie si les transferts sont réglés un par un ou en lot. Valeurs autorisées : <br> `GROSS` : Le règlement est exécuté après chaque transfert complété, c'est-à-dire, il y a une opération de règlement pour chaque transaction. <br> `NET` : Un groupe de transferts est réglé ensemble dans une seule opération, chaque participant réglant la somme nette de tous les transferts sur une période donnée. |

#### SettlementInterchange

Modèle de données pour l’élément **SettlementInterchange**.

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `settlementInterchange`  | oui | [Enum](#enum) de String | Spécifie le type d’arrangement de règlement entre parties. Valeurs autorisées : <br> `BILATERAL` : Chaque participant règle séparément ses obligations avec les autres, et le schéma n'est pas partie au règlement. <br> `MULTILATERAL` : Chaque participant règle avec le schéma le solde net de ses obligations, au lieu de régler séparément avec chaque partie. |

<br />

## Types complexes

#### Accounts

La liste des comptes de grand livre configurés pour le participant. Pour plus de détails sur l'objet compte, voir [IndividualAccount](#individualaccount).

#### ErrorInformation

Pour plus de détails, voir la section [ErrorInformation](../fspiop/logical-data-model#errorinformation) dans la définition de l’API Mojaloop FSPIOP.

#### ErrorInformationResponse

Modèle de données pour le type complexe contenant un élément optionnel [ErrorInformation](#errorinformation) utilisé avec les réponses 4xx et 5xx.

#### Extension

Pour plus de détails, voir la section [Extension](../fspiop/logical-data-model#extension) dans la définition de l’API Mojaloop FSPIOP.

#### ExtensionList

Pour plus de détails, voir la section [ExtensionList](../fspiop/logical-data-model#extensionlist) dans la définition de l’API Mojaloop FSPIOP.

#### IndividualAccount

Modèle de données pour le type complexe **IndividualAccount**.

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `id`  |  oui | [Integer](#integer) | Identifiant du compte de grand livre. |
| `ledgerAccountType`  |  oui | [String](#string) | Type du compte de grand livre (par exemple, POSITION). |
| `currency`  |  oui | [CurrencyEnum](#currencyenum) | La devise du compte. |
| `isActive`  |  oui | [Integer(1)](#integer) | Indique si le compte de grand livre est actif ou non. Valeurs possibles : `1` et `0`. |
| `createdDate`  |  oui | [DateTime](#datetime)  | Date et heure de création du compte. |
| `createdBy`  |  oui | [String](#string) | L'entité qui a créé le compte. |

#### Limit

Modèle de données pour le type complexe **Limit**.

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `type`  |  oui | [String](#string) | Type de limite. |
| `value`  |  oui | un [Number](#number) positif | Valeur de la limite. |

#### Money

Pour plus de détails, voir la section [Money](../fspiop/logical-data-model#mondey) dans la définition de l’API Mojaloop FSPIOP.

#### Participant

Modèle de données pour le type complexe **Participant**.

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `name`  |  oui | [String](#string) | Nom du participant. |
| `id`  |  oui | [String](#string) | Identifiant du participant sous la forme d’un nom de domaine pleinement qualifié combiné avec le `fspId` du participant. |
| `created`  |  oui | [DateTime](#datetime)  | Date et heure de création du participant. |
| `isActive`  |  oui | [Integer(1)](#integer) | Indique si le participant est actif ou non. Valeurs possibles : `1` et `0`. |
| `links`  |  oui | [Self](#self) | Liste de liens pour un service RESTful Hypermedia-Driven. | 	
| `accounts`  |  oui | [Accounts](#accounts) | Liste des comptes de grand livre configurés pour le participant. |

#### ParticipantFunds

Modèle de données pour le type complexe **ParticipantFunds**.

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `transferId`  | oui  | [UUID](#uuid) | Identifiant du transfert. |
| `externalReference`  |  oui | [String](#string) | Référence à toute donnée externe, telle qu’un identifiant provenant de la banque de règlement.  |
| `action`  |  oui | [Enum](#enum) | Action effectuée sur les fonds. Valeurs possibles : `recordFundsIn` et `recordFundsOutPrepareReserve`. |
| `reason`  |  oui | [String](#string) | Raison de l’action FundsIn ou FundsOut. |
| `amount`  | oui  | [Money](#money) | Montant FundsIn ou FundsOut. |
| `extensionList`  | non  | [ExtensionList](#extensionlist) | Détails additionnels. |

#### ParticipantLimit

Modèle de données pour le type complexe **ParticipantLimit**.

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `type`  |  oui | [String](#string) | Type de limite de participant (par exemple, `NET_DEBIT_CAP`).  |
| `value`  |  oui | [Number](#number) | Valeur de la limite définie pour le participant.  |
| `alarmPercentage`  |  oui | [Number](#number) | Une notification d'alarme est déclenchée lorsqu’un pourcentage prédéfini de la limite est atteint. La spécification d’`alarmPercentage` est optionnelle. Si elle n’est pas spécifiée, la valeur par défaut est 10 %, exprimé par `10`. |

#### ParticipantsNameEndpointsObject

Modèle de données pour le type complexe **ParticipantsNameEndpointsObject**.

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `type`  |  oui | [String](#string) | Type d'endpoint.  |
| `value`  |  oui | [String](#string) | Valeur de l'endpoint.  |

#### ParticipantsNameLimitsObject

Modèle de données pour le type complexe **ParticipantsNameLimitsObject**.

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `currency`  |  oui | [CurrencyEnum](#currencyenum) | Devise configurée pour le participant. |
| `limit`  |  oui | [ParticipantLimit](#participantlimit) | Limite configurée pour le participant.  |

#### Party

Pour plus de détails, voir la section [Party](../fspiop/logical-data-model#party) dans la définition de l’API Mojaloop FSPIOP.

#### PartyComplexName

Pour plus de détails, voir la section [PartyComplexName](../fspiop/logical-data-model#partycomplexname) dans la définition de l’API Mojaloop FSPIOP.

#### PartyIdInfo

Pour plus de détails, voir la section [PartyIdInfo](../fspiop/logical-data-model#partyidinfo) dans la définition de l’API Mojaloop FSPIOP.

#### PartyPersonalInfo

Pour plus de détails, voir la section [PartyPersonalInfo](../fspiop/logical-data-model#partypersonalinfo) dans la définition de l’API Mojaloop FSPIOP.

#### RecordFundsOut

Modèle de données pour le type complexe **RecordFundsOut**.

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `action`  |  oui | [Enum](#enum) | Action FundsOut effectuée. Valeurs possibles : `recordFundsOutCommit` et `recordFundsOutAbort`. |
| `reason`  |  oui | [String](#string) | Raison de l’action FundsOut. |

#### Refund

Modèle de données pour le type complexe **Refund**.

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `originalTransactionId`  | oui | [UUID](#uuid) | Référence à l’ID de transaction d’origine à rembourser. |
| `refundReason`  |  non | [String(1-128)](#string) | Texte libre indiquant le motif du remboursement. |

#### SettlementModelsObject

Modèle de données pour le type complexe **SettlementModelsObject**.

| Nom  | Obligatoire  | Type | Description |
|---|---|--|--|
| `settlementModelId`  |  oui | [Integer](#integer) | Identifiant du modèle de règlement. |
| `name`  |  oui | [String](#string) | Nom du modèle de règlement. |
| `isActive`  |  oui | [Boolean](#boolean) | Indique si le modèle de règlement est actif ou non. |
| `settlementGranularity`  |  oui | [String](#string) | Spécifie si les transferts sont réglés un par un ou en lot. Valeurs possibles : <br> `GROSS` : Le règlement est exécuté après chaque transfert complété, c'est-à-dire qu'il y a une opération de règlement pour chaque transaction. <br> `NET` : Un groupe de transferts est réglé ensemble dans une seule opération, chaque participant réglant la somme nette de tous les transferts sur une période donnée.|
| `settlementInterchange`  |  oui | [String](#string) | Spécifie le type d’arrangement de règlement entre parties. Valeurs possibles : <br> `BILATERAL` : Chaque participant règle séparément ses obligations avec les autres, et le schéma n'est pas partie au règlement. <br> `MULTILATERAL` : Chaque participant règle avec le schéma le solde net de ses obligations, au lieu de régler séparément avec chaque partie.|
| `settlementDelay`  |  oui | [String](#string) | Spécifie si le règlement a lieu immédiatement après la fin d’un transfert ou avec un délai. Valeurs possibles : <br> `IMMEDIATE` : Le règlement a lieu immédiatement après la fin d’un transfert. <br> `DEFERRED` : Le règlement est géré par l’opérateur du Hub à la demande ou selon un calendrier.|
| `currency`  |  oui | [CurrencyEnum](#currencyenum) | Devise configurée pour le modèle de règlement. |
| `requireLiquidityCheck`  |  oui | [Boolean](#boolean) | Indique si le modèle de règlement nécessite une vérification de liquidité. |
| `ledgerAccountTypeId`  |  oui | [String](#string) | Type de compte de grand livre. Valeurs possibles : <br> `INTERCHANGE_FEE` : Suit les frais d’interchange appliqués aux transferts.<br> `POSITION` : Suit combien un DFSP doit ou est dû. <br> `SETTLEMENT` : Le compte bancaire de règlement du DFSP reflété dans le Hub. Sert de compte de rapprochement et reflète le mouvement des fonds réels.|
| `autoPositionReset`  |  oui | [Boolean](#boolean) | Indique si le modèle de règlement nécessite la remise à zéro automatique de la position. |

#### TransactionType

Pour plus de détails, voir la section [TransactionType](../fspiop/logical-data-model#transactiontype) dans la définition de l’API Mojaloop FSPIOP.

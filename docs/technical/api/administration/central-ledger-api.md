---
showToc: true
---
# Central Ledger API

## Introduction

This document provides detailed information about the Central Ledger API. The Central Ledger API is a Mojaloop API enabling Hub Operators to manage admin processes around:

- Creating/activating/deactivating participants in the Hub
- Adding and updating participant endpoint information
- Managing participant accounts, limits, and positions
- Creating Hub accounts
- Performing Funds In and Funds Out operations
- Creating/updating/viewing settlement models
- Retrieving transfer details

 For background information about the participant and settlement model details that the Hub Operator can administer using the Central Ledger API, see section [Basic concepts](#basic-concepts).

<br />

## Basic concepts

To provide context for the admin operations that the Central Ledger API enables, this section gives a brief definition of some basic concepts.

### Participant

Either the Hub itself or a Digital Financial Service Provider (DFSP) that is a participant in a Mojaloop scheme.

### Endpoint

The DFSP callback URL where the Hub routes API callbacks. The URL specified is the endpoint set up in the outbound API gateway.

### Limit

Currently, only one type of limit is supported, it is called "_Net Debit Cap (NDC)_". In the future, it is possible to add support for further types of limits. 

The _Net Debit Cap_ represents the liquidity cover available for a specific account (the Position account). It is the total amount of good funds which the scheme attests are available to guarantee that a participant is able to settle the liabilities it incurs on the Position account as a consequence of transferring funds. This amount of good funds is represented as the balance of an account (the Settlement account), which is tied to the Position account by a settlement model. The source of the funds in this account can be either funds recorded by the scheme's administrators as having been deposited to or withdrawn from the Settlement account, or funds which are automatically credited to or debited from the account by the scheme if the account is the Settlement account for an immediate gross settlement model.

It should also be possible for a participant to specify that an amount, or a proportion, of the funds available in a Settlement account should be excluded from the Net Debit Cap calculation. In cases where a participant is a long-term net beneficiary of funds via settlement, or where participants keep extra funds in their Settlement account to cover periods when it may not be possible to deposit funds to those accounts, it may wish to exclude part of the balance of its Settlement account from use as cover for transfers.

### Account

Also called _Ledger_. The Hub maintains a number of internal accounts to keep track of the movement of money (both e-money and real money) between DFSPs.

### Position

The Position represents the net of:
- transfers on that account which have cleared but have not yet settled, and 
- transfers on that account where: 
  - the DFSP is the debtor party, and 
  - the transfer has been accepted for processing by the Hub, but has not yet cleared.

The Position for a given account is always verifiably up to date.

When a transfer is requested, the Hub will check that the DFSP has liquidity cover available on that account to cover the amount of the transfer. If it does not, the transfer will be rejected.

We currently allow liabilities to the participant which have been created as a consequence of transfers on the account where the participant is the beneficiary to reduce the participant's Position as if the liabilities had already been settled.

### Funds In and Funds Out

Funds In and Funds Out operations are used to track (in the Hub accounts) money movements related to deposits and withdrawals, as well as settlements.

Funds In operations record either the deposit of money into a DFSP's settlement bank account or the settlement amount for a receiving DFSP.

Funds Out operations record either the withdrawal of money from a DFSP's settlement bank account or the settlement amount for a sending DFSP.

### Settlement model

Refers to how settlement happens within a scheme. Settlement is the process of transferring funds from one DSFP to another, so that the payer's DFSP reimburses the payee's DFSP for funds given to the payee during a transaction. A settlement model specifies if participants settle with each other separately or settle with the scheme, whether transfers are settled one by one or as a batch, whether transfers are settled immediately or with a delay, and so on.

<br />

## HTTP details

This section contains detailed information regarding the use of the application-level protocol HTTP in the API.

### HTTP header fields

HTTP headers are generally described in [RFC 7230](https://tools.ietf.org/html/rfc7230). Any headers specific to the Central Ledger API will be standardised in the future.

### HTTP methods

The following HTTP methods, as defined in [RFC 7231](https://tools.ietf.org/html/rfc7231#section-4), are supported by the API:

- `GET` – The HTTP GET method is used from a client to retrieve information about a previously-created object on a server. 
- `POST` – The HTTP POST method is used from a client to request an object to be created on the server. 
- `PUT` – The HTTP PUT method is used from a client to request an object already existing on the server to be modified (to replace a representation of the target resource with the request payload).

> **NOTE:** The `DELETE` method is not supported.

### HTTP response status codes

The [HTTP response status codes](#http-response-status-codes) table lists the HTTP response status codes that the API supports:

|Status Code|Reason|Description|
|---|---|---|
|**200**|OK|Standard response for a successful `GET`, `PUT`, or `POST` operation. The response will contain an entity corresponding to the requested resource.|
|**201**|Created|The `POST` request has been fulfilled, resulting in the creation of a new resource. The response will not contain an entity describing or containing the result of the action.|
|**202**|Accepted|The request has been accepted for processing, but the processing has not been completed.|
|**400**|Bad Request|The server could not understand the request due to invalid syntax.|
|**401**|Unauthorized|The request requires authentication in order to be processed.|
|**403**|Forbidden|The request was denied and will be denied in the future.|
|**404**|Not Found|The requested resource is not available at the moment.|
|**405**|Method Not Allowed|An unsupported HTTP method for the request was used.|
|**406**|Not Acceptable|The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.|
|**500**|Internal Server Error|A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.|
|**501**|Not Implemented|The server does not support the requested service. The client should not retry.|
|**503**|Service Unavailable|The server is currently unavailable to accept any new service requests. This should be a temporary state, and the client should retry within a reasonable time frame.|

<br />

## API services

This section introduces and details all services that the API supports for each resource and HTTP method.

### High-level API services

On a high level, the API can be used to perform the following actions:

- **`/participants`**: View, create, update participant-related details, such as limit (Net Debit Cap), position, or endpoints configured.
- **`/settlementModels`**: View, create, update settlement-model-related details, such as granularity, delay, liquidity check, and so on.
- **`/transactions`**: View transaction details for a particular transfer.

### Supported API services

The [Supported API services](#supported-api-services) table includes high-level descriptions of the services that the API provides. For more detailed information, see the sections that follow.

| URI  |  HTTP method `GET`| HTTP method `PUT` | HTTP method `POST` | HTTP method `DELETE` |
|---|---|---|---|---|
| **`/participants`**  | Get information about all participants  | Not supported  | Create participants in the Hub  |  Not supported |
| `/participants/limits`  | View limits for all participants  |  Not supported | Not supported  | Not supported  |
| `/participants/{name}`  | Get information about a particular participant  | Update participant details (activate/deactivate a participant)  | Not supported  |  Not supported |
| `/participants/{name}/endpoints`  | View participant endpoints  | Not supported  | Add/Update participant endpoints  | Not supported  |
| `/participants/{name}/limits`  | View participant limits  |  Adjust participant limits | Not supported  |  Not supported |
| `/participants/{name}/positions`  | View participant positions  | Not supported  | Not supported  | Not supported  |
| `/participants/{name}/accounts`  | View participant accounts and balances  |  Not supported | Create Hub accounts  |  Not supported |
| `/participants/{name}/accounts/{id}`  |  Not supported | Update participant accounts  | Record Funds In or Out of participant account  | Not supported  |
| `/participants/{name}/accounts/{id}/transfers/{transferId}`  | Not supported  | Not supported  | Record a Transfer as a Funds In or Out transaction for a participant account  |  Not supported |
| `/participants/{name}/initialPositionAndLimits`  | Not supported  | Not supported  |  Add initial participant limits and position | Not supported  |
| **`/settlementModels`**  | View all settlement models  | Not supported  | Create a settlement model  |  Not supported |
| `/settlementModels/{name}`  | View settlement model by name  | Update a settlement model (activate/deactivate a settlement model) | Not supported  |  Not supported |
| **`/transactions/{id}`**  | Retrieve transaction details by `transferId`  | Not supported  | Not supported  | Not supported |


<br />

## API Resource `/participants`

The services provided by the resource `/participants` are primarily used by the Hub Operator for viewing, creating, and updating participant-related details, such as limit (Net Debit Cap), position, or endpoints configured.

### GET /participants

Retrieves information about all participants.

#### Example request

```
curl 'http://<domain-where-hub-central-ledger-service-is-running>/participants'
```

#### Example response

> **NOTE:** In the example below, `dev1-central-ledger.mojaloop.live` indicates where the Central Ledger service of the Mojaloop Hub is running. This detail will be different in your implementation.

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

#### Response data model

| Name  | Required  | Type | Description |
|---|---|--|--|
| `name`  |  yes | [String(2..30)](#string) | The name of the participant. |
| `id`  |  yes | [String](#string) | The identifier of the participant in the form of a fully qualified domain name combined with the participant's `fspId`. |
| `created`  |  yes | [DateTime](#datetime)  | Date and time when the participant was created. |
| `isActive`  |  yes | [Integer(1)](#integer) | A flag to indicate whether or not the participant is active. Possible values are `1` and `0`. |
| `links`  |  yes | [Self](#self) | List of links for a Hypermedia-Driven RESTful Web Service. | 	
| `accounts`  |  yes | [Accounts](#accounts) | The list of ledger accounts configured for the participant. |

<br />

### POST /participants

Creates a participant in the Hub.

#### Example request

```
curl -X POST -H "Content-Type: application/json" \
  -d '{"name": "payerfsp", "currency": "USD"}' \
  http://<domain-where-hub-central-ledger-service-is-running>/participants
```

#### Request data model

| Name  | Required  | Type | Description |
|---|---|--|--|
| `name`  |  yes | [String(2..30)](#string) | The name of the participant. |
| `currency`  |  yes | [CurrencyEnum](#currencyenum) | The currency that the participant will transact in. |

#### Example response

> **NOTE:** In the example below, `dev1-central-ledger.mojaloop.live` indicates where the Central Ledger service of the Mojaloop Hub is running. This detail will be different in your implementation.

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

#### Response data model

| Name  | Required  | Type | Description |
|---|---|--|--|
| `name`  |  yes | [String(2..30)](#string) | The name of the participant. |
| `id`  |  yes | [String](#string) | The identifier of the participant in the form of a fully qualified domain name combined with the participant's `fspId`. |
| `created`  |  yes | [DateTime](#datetime)  | Date and time when the participant was created. |
| `isActive`  |  yes | [Integer(1)](#integer) | A flag to indicate whether or not the participant is active. Possible values are `1` and `0`. |
| `links`  |  yes | [Self](#self) | List of links for a Hypermedia-Driven RESTful Web Service. | 	
| `accounts`  |  yes | [Accounts](#accounts) | The list of ledger accounts configured for the participant. |

<br />

### GET /participants/limits

Retrieves limits information for all participants.

#### Query parameters

| Name  | Required  | Type | Description |
|---|---|--|--|
| `currency`  |  no | [CurrencyEnum](#currencyenum) | The currency of the limit. |
| `limit`  |  no | [String](#string) | Limit type. |

#### Example request

```
curl 'http://<domain-where-hub-central-ledger-service-is-running>/participants/limits'
```

#### Example response

> **NOTE:** In the example below, `dev1-central-ledger.mojaloop.live` indicates where the Central Ledger service of the Mojaloop Hub is running. This detail will be different in your implementation.

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

#### Response data model

Each limit in the returned list is applied to the specified participant name and currency in each object.

| Name  | Required  | Type | Description |
|---|---|--|--|
| `name`  |  yes | [String(2..30)](#string) | The name of the participant. |
| `currency`  |  yes | [CurrencyEnum](#currencyenum) | The currency configured for the participant. |
| `limit`  |  yes | [ParticipantLimit](#participantlimit) | The limit configured for the participant.  |

<br />

### GET /participants/{name}

Retrieves information about a particular participant.

#### Path parameters

| Name  | Required  | Type | Description |
|---|---|--|--|
| `name`  |  yes | [String(2..30)](#string) | The name of the participant. |

#### Example request

```
curl 'http://<domain-where-hub-central-ledger-service-is-running>/participants/payerfsp'
```

#### Example response

> **NOTE:** In the example below, `dev1-central-ledger.mojaloop.live` indicates where the Central Ledger service of the Mojaloop Hub is running. This detail will be different in your implementation.

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

#### Response data model

| Name  | Required  | Type | Description |
|---|---|--|--|
| `name`  |  yes | [String(2..30)](#string) | The name of the participant. |
| `id`  |  yes | [String](#string) | The identifier of the participant in the form of a fully qualified domain name combined with the participant's `fspId`. |
| `created`  |  yes | [DateTime](#datetime)  | Date and time when the participant was created. |
| `isActive`  |  yes | [Integer(1)](#integer) | A flag to indicate whether or not the participant is active. Possible values are `1` and `0`. |
| `links`  |  yes | [Self](#self) | List of links for a Hypermedia-Driven RESTful Web Service. | 	
| `accounts`  |  yes | [Accounts](#accounts) | The list of ledger accounts configured for the participant. |

<br />

### PUT /participants/{name}

Updates participant details (activates/deactivates a participant).

#### Path parameters

| Name  | Required  | Type | Description |
|---|---|--|--|
| `name`  |  yes | [String(2..30)](#string) | The name of the participant. |

#### Example request

```
curl -X PUT -H "Content-Type: application/json" \
  -d '{"isActive": true}' \
  http://<domain-where-hub-central-ledger-service-is-running>/participants/payerfsp 
```

#### Request data model

| Name  | Required  | Type | Description |
|---|---|--|--|
| `isActive`  |  yes | [Boolean](boolean) | A flag to indicate whether or not the participant is active. |

#### Example response

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

#### Response data model

| Name  | Required  | Type | Description |
|---|---|--|--|
| `name`  |  yes | [String(2..30)](#string) | The name of the participant. |
| `id`  |  yes | [String](#string) | The identifier of the participant in the form of a fully qualified domain name combined with the participant's `fspId`. |
| `created`  |  yes | [DateTime](#datetime)  | Date and time when the participant was created. |
| `isActive`  |  yes | [Integer(1)](#integer) | A flag to indicate whether or not the participant is active. Possible values are `1` and `0`. |
| `links`  |  yes | [Self](#self) | List of links for a Hypermedia-Driven RESTful Web Service. | 	
| `accounts`  |  yes | [Accounts](#accounts) | The list of ledger accounts configured for the participant. |

<br />

### GET /participants/{name}/endpoints

Retrieves information about the endpoints configured for a particular participant.

#### Path parameters

| Name  | Required  | Type | Description |
|---|---|--|--|
| `name`  |  yes | [String(2..30)](#string) | The name of the participant. |

#### Example request

```
curl 'http://<domain-where-hub-central-ledger-service-is-running>/participants/payerfsp/endpoints'
```

#### Example response
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

#### Response data model

| Name  | Required  | Type | Description |
|---|---|--|--|
| `type`  |  yes | [String](#string) | Type of endpoint. |
| `value`  |  yes | [String](#string) | Endpoint value. |

<br />

### POST /participants/{name}/endpoints

Adds/updates endpoints for a particular participant.

#### Path parameters

| Name  | Required  | Type | Description |
|---|---|--|--|
| `name`  |  yes | [String(2..30)](#string) | The name of the participant. |

#### Example request

```
curl -X POST -H "Content-Type: application/json" \
  -d '{"type": "NET_DEBIT_CAP_ADJUSTMENT_EMAIL", "value": "some.email@org.com"}'
  http://<domain-where-hub-central-ledger-service-is-running>/participants/payerfsp/endpoints 
```

#### Request data model

| Name  | Required  | Type | Description |
|---|---|--|--|
| `type`  |  yes | [String](#string) | Type of endpoint. |
| `value`  |  yes | [String](#string) | Endpoint value. |

#### Example response

```
HTTP/1.1 201 Created
Content-Type: application/json
```

<br />


### GET /participants/{name}/limits

Retrieves limits information for a particular participant.

#### Path parameters

| Name  | Required  | Type | Description |
|---|---|--|--|
| `name`  |  yes | [String(2..30)](#string) | The name of the participant. |

#### Query parameters

| Name  | Required  | Type | Description |
|---|---|--|--|
| `currency`  |  no | [CurrencyEnum](#currencyenum) | The currency of the limit. |
| `limit`  |  no | [String](#string) | Limit type. |

#### Example request

```
curl 'http://<domain-where-hub-central-ledger-service-is-running>/participants/payerfsp/limits'
```

#### Example response

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

#### Response data model

Each limit in the returned list is applied to the specified participant name and currency in each object.

| Name  | Required  | Type | Description |
|---|---|--|--|
| `currency`  |  yes | [CurrencyEnum](#currencyenum) | The currency configured for the participant. |
| `limit`  |  yes | [ParticipantLimit](#participantlimit) | The limit configured for the participant.  |

<br />

### PUT /participants/{name}/limits

Adjusts limits for a particular participant.

#### Path parameters

| Name  | Required  | Type | Description |
|---|---|--|--|
| `name`  |  yes | [String(2..30)](#string) | The name of the participant. |

#### Example request

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
  http://<domain-where-hub-central-ledger-service-is-running>/participants/payerfsp/limits 
```

#### Request data model

| Name  | Required  | Type | Description |
|---|---|--|--|
| `currency`  |  yes | [CurrencyEnum](#currencyenum) | The currency configured for the participant. |
| `limit`  |  yes | [ParticipantLimit](#participantlimit) | The limit configured for the participant.  |

#### Example response

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

#### Response data model

| Name  | Required  | Type | Description |
|---|---|--|--|
| `currency`  |  yes | [CurrencyEnum](#currencyenum) | The currency configured for the participant. |
| `limit`  |  yes | [ParticipantLimit](#participantlimit) | The limit configured for the participant.  |

<br />

### GET /participants/{name}/positions

Retrieves the position of a particular participant.

#### Path parameters

| Name  | Required  | Type | Description |
|---|---|--|--|
| `name`  |  yes | [String(2..30)](#string) | The name of the participant. |

#### Query parameters

| Name  | Required  | Type | Description |
|---|---|--|--|
| `currency`  |  no | [CurrencyEnum](#currencyenum) | The currency of the limit. |

#### Example request

```
curl 'http://<domain-where-hub-central-ledger-service-is-running>/participants/payerfsp/positions'
```

#### Example response

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

#### Response data model

| Name  | Required  | Type | Description |
|---|---|--|--|
| `currency`  |  yes | [CurrencyEnum](#currencyenum) | The currency configured for the participant. |
| `value`  |  yes | [Number](#number) | Position value.  |
| `changedDate`  |  yes | [DateTime](#datetime)  | Date and time when the position last changed. |

<br />

### GET /participants/{name}/accounts

Retrieves the accounts and balances of a particular participant.

#### Path parameters

| Name  | Required  | Type | Description |
|---|---|--|--|
| `name`  |  yes | [String(2..30)](#string) | The name of the participant. |

#### Example request

```
curl 'http://<domain-where-hub-central-ledger-service-is-running>/participants/payerfsp/accounts'
```

#### Example response

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

#### Response data model

| Name  | Required  | Type | Description |
|---|---|--|--|
| `id`  |  yes | [Integer](#integer) | Identifier of the ledger account. |
| `ledgerAccountType`  |  yes | [String](#string) | Type of ledger account. |
| `currency`  |  yes | [CurrencyEnum](#currencyenum) | The currency of the ledger account. |
| `isActive`  |  yes | [Integer(1)](#integer) | A flag to indicate whether or not the ledger account is active. Possible values are `1` and `0`. |
| `value`  |  yes | [Number](#number) | Account balance value. |
| `reservedValue`  |  yes | [Number](#number) | Value reserved in the account. |
| `changedDate`  |  yes | [DateTime](#datetime)  | Date and time when the ledger account last changed. |

<br />

### POST /participants/{name}/accounts

Creates accounts in the Hub.

#### Path parameters

| Name  | Required  | Type | Description |
|---|---|--|--|
| `name`  |  yes | [String(2..30)](#string) | The name of the participant. |

#### Example request

```
curl -X POST -H "Content-Type: application/json" \
  -d '{"currency": "USD", "type": "HUB_MULTILATERAL_SETTLEMENT"}' \
  http://<domain-where-hub-central-ledger-service-is-running>/participants/payerfsp/accounts  
```

#### Request data model

| Name  | Required  | Type | Description |
|---|---|--|--|
| `currency`  |  yes | [CurrencyEnum](#currencyenum) | The currency of the participant ledger account. |
| `type`  |  yes | [String](#string) | Type of ledger account. |

#### Example response

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

#### Response data model

| Name  | Required  | Type | Description |
|---|---|--|--|
| `name`  |  yes | [String](#string) | The name of the participant. |
| `id`  |  yes | [String](#string) | The identifier of the participant in the form of a fully qualified domain name combined with the participant's `fspId`. |
| `created`  |  yes | [DateTime](#datetime)  | Date and time when the participant was created. |
| `isActive`  |  yes | [Integer(1)](#integer) | A flag to indicate whether or not the participant is active. Possible values are `1` and `0`. |
| `links`  |  yes | [Self](#self) | List of links for a Hypermedia-Driven RESTful Web Service. | 	
| `accounts`  |  yes | [Accounts](#accounts) | The list of ledger accounts configured for the participant. |

<br />

### POST /participants/{name}/accounts/{id}

Records Funds In or Out of a participant account.

#### Path parameters

| Name  | Required  | Type | Description |
|---|---|--|--|
| `name`  |  yes | [String(2..30)](#string) | The name of the participant. |
| `id`  |  yes | [Integer](#integer) | Account identifier. |

#### Example request

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
  http://<domain-where-hub-central-ledger-service-is-running>/participants/payerfsp/accounts/2
````

#### Request data model

| Name  | Required  | Type | Description |
|---|---|--|--|
| `transferId`  | yes  | [UUID](#uuid) | Transfer identifier. |
| `externalReference`  |  yes | [String](#string) | Reference to any external data, such as an identifier from the settlement bank. |
| `action`  |  yes | [Enum](#enum) | The action performed on the funds. Possible values are: `recordFundsIn` and `recordFundsOutPrepareReserve`. |
| `reason`  |  yes | [String](#string) | The reason for the FundsIn or FundsOut action. |
| `amount`  | yes  | [Money](#money) | The FundsIn or FundsOut amount. |
| `extensionList`  | no  | [ExtensionList](#extensionlist) | Additional details. |

#### Example response

````
HTTP/1.1 202 Accepted
````

<br />

### PUT /participants/{name}/accounts/{id}

Updates a participant account. Currently, updating only the `isActive` flag is supported.

#### Path parameters

| Name  | Required  | Type | Description |
|---|---|--|--|
| `name`  |  yes | [String(2..30)](#string) | The name of the participant. |
| `id`  |  yes | [Integer](#integer) | Account identifier. |

#### Example request

```
curl -X PUT -H "Content-Type: application/json" \
  -d '{"isActive": true}' \
  http://<domain-where-hub-central-ledger-service-is-running>/participants/payerfsp/account/2 
```

#### Request data model

| Name  | Required  | Type | Description |
|---|---|--|--|
| `isActive`  |  yes | [Boolean](boolean) | A flag to indicate whether or not the participant account is active. |

#### Example response

```
HTTP/1.1 200 OK
```

<br />

### PUT /participants/{name}/accounts/{id}/transfers/{transferId}

Records a transfer as a Funds In or Out transaction for a participant account. 

#### Path parameters

| Name  | Required  | Type | Description |
|---|---|--|--|
| `name`  |  yes | [String(2..30)](#string) | The name of the participant. |
| `id`  |  yes | [Integer](#integer) | Account identifier. |
| `transferId`  |  yes | [UUID](#uuid) | Transfer identifier. |

#### Example request

```
curl -X PUT -H "Content-Type: application/json" \
  -d '{"action": "recordFundsOutCommit", "reason": "fix"}' \
  http://<domain-where-hub-central-ledger-service-is-running>/participants/payerfsp/account/2/transfers/bfd38d14-893f-469d-a6ca-a312a0223949
```

#### Request data model

| Name  | Required  | Type | Description |
|---|---|--|--|
| `action`  |  yes | [Enum](#enum) | The FundsOut action performed. Possible values are: `recordFundsOutCommit` and `recordFundsOutAbort`. |
| `reason`  |  yes | [String](#string) | The reason for the FundsOut action. |

#### Example response

```
HTTP/1.1 202 Accepted
```

<br />

### POST /participants/{name}/initialPositionAndLimits

Adds initial limits and a position for a particular participant.

#### Path parameters

| Name  | Required  | Type | Description |
|---|---|--|--|
| `name`  |  yes | [String(2..30)](#string) | The name of the participant. |

#### Example request

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
  http://<domain-where-hub-central-ledger-service-is-running>/participants/payerfsp/initialPositionAndLimits
````

#### Request data model

| Name  | Required  | Type | Description |
|---|---|--|--|
| `currency`  |  yes | [CurrencyEnum](#currencyenum) | The currency of the participant. |
| `limit`  |  yes | [ParticipantLimit](#participantlimit) | The limit configured for the participant.  |
| `initialPosition`  |  no | [Number](#number) | Initial Position. |

#### Example response

```
HTTP/1.1 201 Created
```

<br />

## API Resource `/settlementModels`

The services provided by the resource `/settlementModels` are used by the Hub Operator for creating, updating, and viewing settlement models.

### GET /settlementModels

Retrieves information about all settlement models.

#### Example request

```
curl 'http://<domain-where-hub-central-ledger-service-is-running>/settlementModels'
```

#### Example response

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

#### Response data model

| Name  | Required  | Type | Description |
|---|---|--|--|
| `settlementModelId`  |  yes | [Integer](#integer) | Settlement model identifier. |
| `name`  |  yes | [String](#string) | Settlement model name. |
| `isActive`  |  yes | [Boolean](boolean) | A flag to indicate whether or not the settlement model is active.|
| `settlementGranularity`  |  yes | [String](#string) | Specifies whether transfers are settled one by one or as a batch. Possible values are: <br> `GROSS`: Settlement is executed after each transfer is completed, that is, there is a settlement transaction that corresponds to every transaction. <br> `NET`: A group of transfers is settled together in a single settlement transaction, with each participant settling the net of all transfers over a given period of time.|
| `settlementInterchange`  |  yes | [String](#string) | Specifies the type of settlement arrangement between parties. Possible values are: <br> `BILATERAL`: Each participant settles its obligations with each other separately, and the scheme is not a party to the settlement. <br> `MULTILATERAL`: Each participant settles with the scheme for the net of its obligations, rather than settling separately with each other party.|
| `settlementDelay`  |  yes | [String](#string) | Specifies if settlement happens immediately after a transfer has completed or with a delay. Possible values are: <br> `IMMEDIATE`: Settlement happens immediately after a transfer has completed. <br> `DEFERRED`: Settlement is managed by the Hub operator on-demand or via a schedule.|
| `currency`  |  yes | [CurrencyEnum](#currencyenum) | The currency configured for the settlement model. |
| `requireLiquidityCheck`  |  yes | [Boolean](boolean) | A flag to indicate whether or not the settlement model requires liquidity check. |
| `ledgerAccountTypeId`  |  yes | [String](#string) | Type of ledger account. Possible values are: <br> `INTERCHANGE_FEE`: Tracks the interchange fees charged for transfers. <br> `POSITION`: Tracks how much a DFSP owes or is owed. <br> `SETTLEMENT`: The DFSP's Settlement Bank Account mirrored in the Hub. Acts as a reconciliation account and mirrors the movement of real funds.|
| `autoPositionReset`  |  yes | [Boolean](boolean) | A flag to indicate whether or not the settlement model requires the automatic reset of the position. |

<br />

### POST /settlementModels

Creates a settlement model.

#### Example request

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
  http://<domain-where-hub-central-ledger-service-is-running>/settlementModels
```

#### Request data model

| Name  | Required  | Type | Description |
|---|---|--|--|
| `name`  |  yes | [String](#string) | Settlement model name. |
| `settlementGranularity`  |  yes | [String](#string) | Specifies whether transfers are settled one by one or as a batch. Possible values are: <br> `GROSS`: Settlement is executed after each transfer is completed, that is, there is a settlement transaction that corresponds to every transaction. <br> `NET`: A group of transfers is settled together in a single settlement transaction, with each participant settling the net of all transfers over a given period of time.|
| `settlementInterchange`  |  yes | [String](#string) | Specifies the type of settlement arrangement between parties. Possible values are: <br> `BILATERAL`: Each participant settles its obligations with each other separately, and the scheme is not a party to the settlement. <br> `MULTILATERAL`: Each participant settles with the scheme for the net of its obligations, rather than settling separately with each other party.|
| `settlementDelay`  |  yes | [String](#string) | Specifies if settlement happens immediately after a transfer has completed or with a delay. Possible values are: <br> `IMMEDIATE`: Settlement happens immediately after a transfer has completed. <br> `DEFERRED`: Settlement is managed by the Hub operator on-demand or via a schedule.|
| `currency`  |  yes | [CurrencyEnum](#currencyenum) | The currency configured for the settlement model. |
| `requireLiquidityCheck`  |  yes | [Boolean](boolean) | A flag to indicate whether or not the settlement model requires liquidity check. |
| `ledgerAccountTypeId`  |  yes | [String](#string) | Type of ledger account. Possible values are: <br> `INTERCHANGE_FEE`: Tracks the interchange fees charged for transfers. <br> `POSITION`: Tracks how much a DFSP owes or is owed. <br> `SETTLEMENT`: The DFSP's Settlement Bank Account mirrored in the Hub. Acts as a reconciliation account and mirrors the movement of real funds.|
| `settlementAccountType`  |  yes | [String](#string) | A special type of ledger account into which settlements should be settled. Possible values are: <br> `SETTLEMENT`: A settlement account for the principal value of transfers (that is, the amount of money that the Payer wants the Payee to receive). <br> `INTERCHANGE_FEE_SETTLEMENT`: A settlement account for the fees associated with transfers. |
| `autoPositionReset`  |  yes | [Boolean](boolean) | A flag to indicate whether or not the settlement model requires the automatic reset of the position. |

#### Example response

```
HTTP/1.1 201 Created
```

<br />

### GET /settlementModels/{name}

Retrieves information about a particular settlement model.

#### Path parameters

| Name  | Required  | Type | Description |
|---|---|--|--|
| `name`  |  yes | [String](#string) | The name of the settlement model. |

#### Example request

```
curl 'http://<domain-where-hub-central-ledger-service-is-running>/settlementModels/DEFERREDNET'
```

#### Example response

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

#### Response data model

| Name  | Required  | Type | Description |
|---|---|--|--|
| `settlementModelId`  |  yes | [Integer](#integer) | Settlement model identifier. |
| `name`  |  yes | [String](#string) | Settlement model name. |
| `isActive`  |  yes | [Boolean](boolean) | A flag to indicate whether or not the settlement model is active. |
| `settlementGranularity`  |  yes | [String](#string) | Specifies whether transfers are settled one by one or as a batch. Possible values are: <br> `GROSS`: Settlement is executed after each transfer is completed, that is, there is a settlement transaction that corresponds to every transaction. <br> `NET`: A group of transfers is settled together in a single settlement transaction, with each participant settling the net of all transfers over a given period of time.|
| `settlementInterchange`  |  yes | [String](#string) | Specifies the type of settlement arrangement between parties. Possible values are: <br> `BILATERAL`: Each participant settles its obligations with each other separately, and the scheme is not a party to the settlement. <br> `MULTILATERAL`: Each participant settles with the scheme for the net of its obligations, rather than settling separately with each other party.|
| `settlementDelay`  |  yes | [String](#string) | Specifies if settlement happens immediately after a transfer has completed or with a delay. Possible values are: <br> `IMMEDIATE`: Settlement happens immediately after a transfer has completed. <br> `DEFERRED`: Settlement is managed by the Hub operator on-demand or via a schedule.|
| `currency`  |  yes | [CurrencyEnum](#currencyenum) | The currency configured for the settlement model. |
| `requireLiquidityCheck`  |  yes | [Boolean](boolean) | A flag to indicate whether or not the settlement model requires liquidity check. |
| `ledgerAccountTypeId`  |  yes | [String](#string) | Type of ledger account. Possible values are: <br> `INTERCHANGE_FEE`: Tracks the interchange fees charged for transfers. <br> `POSITION`: Tracks how much a DFSP owes or is owed. <br> `SETTLEMENT`: The DFSP's Settlement Bank Account mirrored in the Hub. Acts as a reconciliation account and mirrors the movement of real funds. |
| `autoPositionReset`  |  yes | [Boolean](boolean) | A flag to indicate whether or not the settlement model requires the automatic reset of the position. |

<br />

### PUT /settlementModels/{name}

Updates a settlement model (activates/deactivates a settlement model).

#### Path parameters

| Name  | Required  | Type | Description |
|---|---|--|--|
| `name`  |  yes | [String](#string) | The name of the settlement model. |

#### Example request

```
curl -X PUT -H "Content-Type: application/json" \ 
  -d '{"isActive": true}' \
  http://<domain-where-hub-central-ledger-service-is-running>/settlementModels/DEFERREDNET 
```

#### Request data model

| Name  | Required  | Type | Description |
|---|---|--|--|
| `isActive`  |  yes | [Boolean](#boolean) | A flag to indicate whether or not the settlement model is active. |

#### Example response

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

#### Response data model

| Name  | Required  | Type | Description |
|---|---|--|--|
| `settlementModelId`  |  yes | [Integer](#integer) | Settlement model identifier. |
| `name`  |  yes | [String](#string) | Settlement model name. |
| `isActive`  |  yes | [Boolean](boolean) | A flag to indicate whether or not the settlement model is active. |
| `settlementGranularity`  |  yes | [String](#string) | Specifies whether transfers are settled one by one or as a batch. Possible values are: <br> `GROSS`: Settlement is executed after each transfer is completed, that is, there is a settlement transaction that corresponds to every transaction. <br> `NET`: A group of transfers is settled together in a single settlement transaction, with each participant settling the net of all transfers over a given period of time.|
| `settlementInterchange`  |  yes | [String](#string) | Specifies the type of settlement arrangement between parties. Possible values are: <br> `BILATERAL`: Each participant settles its obligations with each other separately, and the scheme is not a party to the settlement. <br> `MULTILATERAL`: Each participant settles with the scheme for the net of its obligations, rather than settling separately with each other party.|
| `settlementDelay`  |  yes | [String](#string) | Specifies if settlement happens immediately after a transfer has completed or with a delay. Possible values are: <br> `IMMEDIATE`: Settlement happens immediately after a transfer has completed. <br> `DEFERRED`: Settlement is managed by the Hub operator on-demand or via a schedule.|
| `currency`  |  yes | [CurrencyEnum](#currencyenum) | The currency configured for the settlement model. |
| `requireLiquidityCheck`  |  yes | [Boolean](boolean) | A flag to indicate whether or not the settlement model requires liquidity check. |
| `ledgerAccountTypeId`  |  yes | [String](#string) | Type of ledger account. Possible values are: <br> `INTERCHANGE_FEE`: Tracks the interchange fees charged for transfers. <br> `POSITION`: Tracks how much a DFSP owes or is owed. <br> `SETTLEMENT`: The DFSP's Settlement Bank Account mirrored in the Hub. Acts as a reconciliation account and mirrors the movement of real funds. |
| `autoPositionReset`  |  yes | [Boolean](boolean) | A flag to indicate whether or not the settlement model requires the automatic reset of the position. |

<br />

## API Resource `/transactions`

The services provided by the resource `/transactions` are used by the Hub Operator for retrieving transfer details.

### GET /transactions/{id}

Retrieves information about a particular transaction.

#### Path parameters

| Name  | Required  | Type | Description |
|---|---|--|--|
| `id`  |  yes | [UUID](#uuid) | Transfer identifier. |

#### Example request

```
curl 'http://<domain-where-hub-central-ledger-service-is-running>/transactions/85feac2f-39b2-491b-817e-4a03203d4f14'
```

#### Example response

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

#### Response data model

| Name  | Required  | Type | Description |
|---|---|--|--|
| `quoteId`  |   | [UUID](#uuid) | Quote identifier. |
| `transactionId`  |   | [UUID](#uuid) | Transaction identifier. |
| `transactionRequestId`  |   | [String](#string) | Identifies an optional previously-sent transaction request. |
| `payee`  |   | [Party](#party) | Payee details. |
| `payer`  |   | [Party](#party) | Payer details. |
| `amount`  |   | [Money](#money) | Transaction amount. |
| `transactionType`  |   | [TransactionType](#transactiontype) | Transaction details. |
| `note`  |   | [String](#string) | A memo that will be attached to the transaction. |
| `extensionList`  |   | [ExtensionList](#extensionlist) | Additional details. |

<br />

## Data models used by the API

### Format

For details on the formats used for element data types used by the API, see section [Element Data Type Formats](../fspiop/logical-data-model#element-data-type-formats) in the Mojaloop FSPIOP API Definition.

### Element Data Type Formats

This section defines element data types used by the API.

#### Amount

For details, see section [Amount](../fspiop/logical-data-model#amount) in the Mojaloop FSPIOP API Definition.

#### Boolean

A `"true"` or `"false"` value.

#### DateTime

For details, see section [DateTime](../fspiop/logical-data-model#datetime) in the Mojaloop FSPIOP API Definition.

#### Enum

For details, see section [Enum](../fspiop/logical-data-model#enum) in the Mojaloop FSPIOP API Definition.

#### Integer

For details, see section [Integer](../fspiop/logical-data-model#integer) in the Mojaloop FSPIOP API Definition.

#### Number

The API data type `Number` is a an arbitrary-precision, base-10 decimal number value.

#### String

For details, see section [String](../fspiop/logical-data-model#string) in the Mojaloop FSPIOP API Definition.

#### UUID

For details, see section [UUID](../fspiop/logical-data-model#uuid) in the Mojaloop FSPIOP API Definition.

<br />

## Element Definitions

This section defines element types used by the API.

#### IsActive

Data model for the element **IsActive**.

| Name  | Required  | Type | Description |
|---|---|--|--|
| `isActive`  | yes | [Integer(1)](#integer) | A flag to indicate whether or not a ledger account / participant is active. Possible values are `1` (active) and `0` (not active). |

#### IsActiveBoolean

Data model for the element **IsActiveBoolean**.

| Name  | Required  | Type | Description |
|---|---|--|--|
| `isActive`  | yes | [Boolean](#boolean) | A flag to indicate whether or not an account / participant / settlement model is active. |

#### CurrencyEnum

For details, see section [Currency](../fspiop/logical-data-model#currencycode-enum) enum in the Mojaloop FSPIOP API Definition.

#### RequireLiquidityCheck

Data model for the element **RequireLiquidityCheck**.

| Name  | Required  | Type | Description |
|---|---|--|--|
| `requireLiquidityCheck`  | yes | [Boolean](#boolean) | A flag to indicate whether or not a settlement model requires liquidity check. |

#### Self

Data model for the element **Self**.

| Name  | Required  | Type | Description |
|---|---|--|--|
| `self`  | yes | [String](#string) | Fully qualified domain name combined with the `fspId` of the participant. |

#### SettlementDelay

Data model for the element **SettlementDelay**.

| Name  | Required  | Type | Description |
|---|---|--|--|
| `settlementDelay`  | yes | [Enum](#enum) of String | Specifies if settlement happens immediately after a transfer has completed or with a delay. Allowed values for the enumeration are: <br> `IMMEDIATE`: Settlement happens immediately after a transfer has completed. <br> `DEFERRED`: Settlement is managed by the Hub operator on-demand or via a schedule. |

#### SettlementGranularity

Data model for the element **SettlementGranularity**.

| Name  | Required  | Type | Description |
|---|---|--|--|
| `settlementGranularity`  | yes | [Enum](#enum) of String | Specifies whether transfers are settled one by one or as a batch. Allowed values for the enumeration are: <br> `GROSS`: Settlement is executed after each transfer is completed, that is, there is a settlement transaction that corresponds to every transaction. <br> `NET`: A group of transfers is settled together in a single settlement transaction, with each participant settling the net of all transfers over a given period of time. |

#### SettlementInterchange

Data model for the element **SettlementInterchange**.

| Name  | Required  | Type | Description |
|---|---|--|--|
| `settlementInterchange`  | yes | [Enum](#enum) of String | Specifies the type of settlement arrangement between parties. Allowed values for the enumeration are: <br> `BILATERAL`: Each participant settles its obligations with each other separately, and the scheme is not a party to the settlement. <br> `MULTILATERAL`: Each participant settles with the scheme for the net of its obligations, rather than settling separately with each other party. |

<br />

## Complex types

#### Accounts

The list of ledger accounts configured for the participant. For details on the account object, see [IndividualAccount](#individualaccount).

#### ErrorInformation

For details, see section [ErrorInformation](../fspiop/logical-data-model#errorinformation) in the Mojaloop FSPIOP API Definition.

#### ErrorInformationResponse

Data model for the complex type object that contains an optional element [ErrorInformation](#errorinformation) used along with 4xx and 5xx responses.

#### Extension

For details, see section [Extension](../fspiop/logical-data-model#extension) in the Mojaloop FSPIOP API Definition.

#### ExtensionList

For details, see section [ExtensionList](../fspiop/logical-data-model#extensionlist) in the Mojaloop FSPIOP API Definition.

#### IndividualAccount

Data model for the complex type **IndividualAccount**.

| Name  | Required  | Type | Description |
|---|---|--|--|
| `id`  |  yes | [Integer](#integer) | Identifier of the ledger account. |
| `ledgerAccountType`  |  yes | [String](#string) | Type of the ledger account (for example, POSITION). |
| `currency`  |  yes | [CurrencyEnum](#currencyenum) | The currency of the account. |
| `isActive`  |  yes | [Integer(1)](#integer) | A flag to indicate whether or not the ledger account is active. Possible values are `1` and `0`. |
| `createdDate`  |  yes | [DateTime](#datetime)  | Date and time when the ledger account was created. |
| `createdBy`  |  yes | [String](#string) | The entity that created the ledger account. |

#### Limit

Data model for the complex type **Limit**.

| Name  | Required  | Type | Description |
|---|---|--|--|
| `type`  |  yes | [String](#string) | Limit type. |
| `value`  |  yes | a positive [Number](#number) | Limit value. |

#### Money

For details, see section [Money](../fspiop/logical-data-model#mondey) in the Mojaloop FSPIOP API Definition.

#### Participant

Data model for the complex type **Participant**.

| Name  | Required  | Type | Description |
|---|---|--|--|
| `name`  |  yes | [String](#string) | The name of the participant. |
| `id`  |  yes | [String](#string) | The identifier of the participant in the form of a fully qualified domain name combined with the participant's `fspId`. |
| `created`  |  yes | [DateTime](#datetime)  | Date and time when the participant was created. |
| `isActive`  |  yes | [Integer(1)](#integer) | A flag to indicate whether or not the participant is active. Possible values are `1` and `0`. |
| `links`  |  yes | [Self](#self) | List of links for a Hypermedia-Driven RESTful Web Service. | 	
| `accounts`  |  yes | [Accounts](#accounts) | The list of ledger accounts configured for the participant. |

#### ParticipantFunds

Data model for the complex type **ParticipantFunds**.

| Name  | Required  | Type | Description |
|---|---|--|--|
| `transferId`  | yes  | [UUID](#uuid) | Transfer identifier. |
| `externalReference`  |  yes | [String](#string) | Reference to any external data, such as an identifier from the settlement bank.  |
| `action`  |  yes | [Enum](#enum) | The action performed on the funds. Possible values are: `recordFundsIn` and `recordFundsOutPrepareReserve`. |
| `reason`  |  yes | [String](#string) | The reason for the FundsIn or FundsOut action. |
| `amount`  | yes  | [Money](#money) | The FundsIn or FundsOut amount. |
| `extensionList`  | no  | [ExtensionList](#extensionlist) | Additional details. |

#### ParticipantLimit

Data model for the complex type **ParticipantLimit**.

| Name  | Required  | Type | Description |
|---|---|--|--|
| `type`  |  yes | [String](#string) | The type of participant limit (for example, `NET_DEBIT_CAP`.)  |
| `value`  |  yes | [Number](#number) | The value of the limit that has been set for the participant.  |
| `alarmPercentage`  |  yes | [Number](#number) | An alarm notification is triggered when a pre-specified percentage of the limit is reached. Specifying an `alarmPercentage` is optional. If not specified, it will default to 10 percent, expressed as `10`. |

#### ParticipantsNameEndpointsObject

Data model for the complex type **ParticipantsNameEndpointsObject**.

| Name  | Required  | Type | Description |
|---|---|--|--|
| `type`  |  yes | [String](#string) | The endpoint type.  |
| `value`  |  yes | [String](#string) | The endpoint value.  |

#### ParticipantsNameLimitsObject

Data model for the complex type **ParticipantsNameLimitsObject**.

| Name  | Required  | Type | Description |
|---|---|--|--|
| `currency`  |  yes | [CurrencyEnum](#currencyenum) | The currency configured for the participant. |
| `limit`  |  yes | [ParticipantLimit](#participantlimit) | The limit configured for the participant.  |

#### Party

For details, see section [Party](../fspiop/logical-data-model#party) in the Mojaloop FSPIOP API Definition.

#### PartyComplexName

For details, see section [PartyComplexName](../fspiop/logical-data-model#partycomplexname) in the Mojaloop FSPIOP API Definition.

#### PartyIdInfo

For details, see section [PartyIdInfo](../fspiop/logical-data-model#partyidinfo) in the Mojaloop FSPIOP API Definition.

#### PartyPersonalInfo

For details, see section [PartyPersonalInfo](../fspiop/logical-data-model#partypersonalinfo) in the Mojaloop FSPIOP API Definition.

#### RecordFundsOut

Data model for the complex type **RecordFundsOut**.

| Name  | Required  | Type | Description |
|---|---|--|--|
| `action`  |  yes | [Enum](#enum) | The FundsOut action performed. Possible values are: `recordFundsOutCommit` and `recordFundsOutAbort`. |
| `reason`  |  yes | [String](#string) | The reason for the FundsOut action. |

#### Refund

Data model for the complex type **Refund**.

| Name  | Required  | Type | Description |
|---|---|--|--|
| `originalTransactionId`  | yes | [UUID](#uuid) | Reference to the original transaction id that is requested to be refunded. |
| `refundReason`  |  no | [String(1-128)](#string) | Free text indicating the reason for the refund. |

#### SettlementModelsObject

Data model for the complex type **SettlementModelsObject**.

| Name  | Required  | Type | Description |
|---|---|--|--|
| `settlementModelId`  |  yes | [Integer](#integer) | Settlement model identifier. |
| `name`  |  yes | [String](#string) | Settlement model name. |
| `isActive`  |  yes | [Boolean](#boolean) | A flag to indicate whether or not the settlement model is active. |
| `settlementGranularity`  |  yes | [String](#string) | Specifies whether transfers are settled one by one or as a batch. Possible values are: <br> `GROSS`: Settlement is executed after each transfer is completed, that is, there is a settlement transaction that corresponds to every transaction. <br> `NET`: A group of transfers is settled together in a single settlement transaction, with each participant settling the net of all transfers over a given period of time.|
| `settlementInterchange`  |  yes | [String](#string) | Specifies the type of settlement arrangement between parties. Possible values are: <br> `BILATERAL`: Each participant settles its obligations with each other separately, and the scheme is not a party to the settlement. <br> `MULTILATERAL`: Each participant settles with the scheme for the net of its obligations, rather than settling separately with each other party.|
| `settlementDelay`  |  yes | [String](#string) | Specifies if settlement happens immediately after a transfer has completed or with a delay. Possible values are: <br> `IMMEDIATE`: Settlement happens immediately after a transfer has completed. <br> `DEFERRED`: Settlement is managed by the Hub operator on-demand or via a schedule.|
| `currency`  |  yes | [CurrencyEnum](#currencyenum) | The currency configured for the settlement model. |
| `requireLiquidityCheck`  |  yes | [Boolean](#boolean) | A flag to indicate whether or not the settlement model requires liquidity check. |
| `ledgerAccountTypeId`  |  yes | [String](#string) | Type of ledger account. Possible values are: <br> `INTERCHANGE_FEE`: Tracks the interchange fees charged for transfers. <br> `POSITION`: Tracks how much a DFSP owes or is owed. <br> `SETTLEMENT`: The DFSP's Settlement Bank Account mirrored in the Hub. Acts as a reconciliation account and mirrors the movement of real funds.|
| `autoPositionReset`  |  yes | [Boolean](#boolean) | A flag to indicate whether or not the settlement model requires the automatic reset of the position. |

#### TransactionType

For details, see section [TransactionType](../fspiop/logical-data-model#transactiontype) in the Mojaloop FSPIOP API Definition.

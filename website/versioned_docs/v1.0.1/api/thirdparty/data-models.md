# Data Models

Third Party API

### Table Of Contents

1. [Preface](#Preface)
    1.1 [Conventions Used in This Document](#ConventionsUsedinThisDocument)
    1.2 [Document Version Information](#DocumentVersionInformation)
    1.3 [References](#References)
2. [Introduction](#Introduction)
    2.1 [Third Party API Specification](#ThirdPartyAPISpecification)
3. [Third Party API Elements](#ThirdPartyAPIElements)
    3.1 [Resources](#Resources)
    3.2 [Data Models](#DataModels)
    3.3 [Error Codes](#ErrorCodes)
# <a id='Preface'></a>1. Preface
This section contains information about how to use this document.

## <a id='ConventionsUsedinThisDocument'></a>1.1 Conventions Used in This Document

The following conventions are used in this document to identify the
specified types of information.

|Type of Information|Convention|Example|
|---|---|---|
|**Elements of the API, such as resources**|Boldface|**/authorization**|
|**Variables**|Italics with in angle brackets|_{ID}_|
|**Glossary terms**|Italics on first occurrence; defined in _Glossary_|The purpose of the API is to enable interoperable financial transactions between a _Payer_ (a payer of electronic funds in a payment transaction) located in one _FSP_ (an entity that provides a digital financial service to an end user) and a _Payee_ (a recipient of electronic funds in a payment transaction) located in another FSP.|
|**Library documents**|Italics|User information should, in general, not be used by API deployments; the security measures detailed in _API Signature and API Encryption_ should be used instead.|

## <a id='DocumentVersionInformation'></a>1.2 Document Version Information

| Version | Date | Change Description |
| --- | --- | --- |
| **1.0** | 2021-10-03    | Initial Version

## <a id='References'></a>1.3 References

The following references are used in this specification:

| Reference | Description | Version | Link |
| --- | --- | --- | --- |
| Ref. 1 | Open API for FSP Interoperability | `1.1` | [API Definition v1.1](https://github.com/mojaloop/mojaloop-specification/blob/master/fspiop-api/documents/v1.1-document-set/API%20Definition%20v1.1.md)|


# <a id='Introduction'></a>2. Introduction

This document specifies the data model used by the Mojaloop Third Party API ("the API").

## <a id='ThirdPartyAPISpecification'></a>2.1 Third Party API Specification

The Mojaloop Third Party API Specification includes the following documents:

- [Data Models](./data-models.md)
- [Transaction Patterns - Linking](./transaction-patterns-linking.md)
- [Transaction Patterns - Transfer](./transaction-patterns-transfer.md)
- [Third Party Open API Definition - DFSP](./thirdparty-dfsp-v1.0.yaml)
- [Third Party Open API Definition - PISP](./thirdparty-dfsp-v1.0.yaml)


# <a id='ThirdPartyAPIElements'></a>3. Third Party API Elements

This section describes the content of the API which will be used by PISPs and DFSPs.

The content of the API falls into two sections:

1. [Transaction Patterns - Linking](./transaction-patterns-linking.md) describes the process for linking customer accounts and providing a general permission mechanism for PISPs to perform operations on those accounts
2. [Transaction Patterns - Transfer](./transaction-patterns-transfer.md) describes the transfer of funds at the instigation of a PISP.

The API is used by the following different types of participant, as follows:
  1. PISPs
  2. DFSPs who offer services to their customer which allow the customer to access their account via one or more PISPs
  3. Auth-Services
  4. The Mojaloop switch

Each resource in the API definition is accompanied by a definition of the type(s) of participant allowed to access it.

## <a id='Resources'></a>3.1 Resources

The API contains the following resources:

### <a id='accounts'></a>3.1.1 **/accounts**

The **/accounts** resource is used to request information from a DFSP relating to the accounts
it holds for a given identifier. The identifier is a user-provided value which the user
uses to access their account with the DFSP, such as a phone number, email address, or
some other identifier previously provided by the DFSP.

The DFSP returns a set of information about the accounts it is prepared to divulge to the PISP.
The PISP can then display the names of the accounts to the user, and allow the user to select
the accounts with which they wish to link via the PISP.

The **/accounts** resource supports the endpoints described below.

#### <a id='Requests'></a>3.1.1.1 Requests

This section describes the services that a PISP can request on the /accounts resource.

##### 3.1.1.1.1  **GET /accounts/**_{ID}_

Used by: PISP

The HTTP request **GET /accounts/**_{ID}_ is used to lookup information about the requested
user's accounts, defined by an identifier *{ID}*, where *{ID}* is an identifier a user
uses to access their account with the DFSP, such as a phone number, email address, or
some other identifier previously provided by the DFSP.

Callback and data model information for **GET /accounts/**_{ID}_:
- Callback - **PUT /accounts/**_{ID}_
- Error Callback - **PUT /accounts/**_{ID}_**/error**
- Data Model – Empty body

#### <a id='Callbacks'></a>3.1.1.2 Callbacks

The responses for the **/accounts** resource are as follows

##### 3.1.1.2.1  **PUT /accounts/**_{ID}_

Used by: DFSP

The **PUT /accounts/**_{ID}_ response is used to inform the requester of the result of a request
for accounts information.  The identifier ID given in the call are the
values given in the original request (see Section 3.1.1.1.1 above.)

The data content of the message is given below.

| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| accountList | 1 | AccountList | Information about the accounts that the DFSP associates with the identifier sent by the PISP. |

##### 3.1.1.2.2  **PUT /accounts/**_{ID}_**/error**

Used by: DFSP

The **PUT /accounts/**_{ID}_**/error** response is used to inform the requester that an account list
request has given rise to an error. The identifier ID given in the call are
the values given in the original request (see Section 3.1.1.1.1 above.)

The data content of the message is given below.

| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| errorInformation | 1 | ErrorInformation | Information describing the error and error code. |

### <a id='consentRequests'></a>3.1.2 **/consentRequests**

The **/consentRequests** resource is used by a PISP to initiate the process of linking with a DFSP’s
account on behalf of a user. The PISP contacts the DFSP and sends a list of the permissions that
it wants to obtain and the accounts for which it wants permission.

#### <a id='Requests-1'></a>3.1.2.1 Requests

This section describes the services that can be requested by a client on the API resource
**/consentRequests**.
##### 3.1.2.1.1 **GET /consentRequests/**_{ID}_

Used by: PISP

The HTTP request **GET /consentRequests/**_{ID}_ is used to get information about a previously
requested consent. The *{ID}* in the URI should contain the consentRequestId that was assigned to the
request by the PISP when the PISP originated the request.

Callback and data model information for **GET /consentRequests/**_{ID}_:
- Callback – **PUT /consentRequests/**_{ID}_
- Error Callback – **PUT /consentRequests/**_{ID}_**/error**
- Data Model – Empty body

##### 3.1.2.1.2 **POST /consentRequests**

Used by: PISP

The HTTP request **POST /consentRequests** is used to request a DFSP to grant access to one or more
accounts owned by a customer of the DFSP for the PISP who sends the request.

Callback and data model for **POST /consentRequests**:
- Callback: **PUT /consentRequests/**_{ID}_
- Error callback: **PUT /consentRequests/**_{ID}_**/error**
- Data model – see below

| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| consentRequestId | 1 | CorrelationId | Common ID between the PISP and the Payer DFSP for the consent request object. The ID should be reused for resends of the same consent request. A new ID should be generated for each new consent request. |
| userId           | 1 | String(1..128) | The identifier used in the **GET /accounts/**_{ID}_. Used by the DFSP to correlate an account lookup to a `consentRequest` |
| scopes           | 1..256 | Scope | One or more requests for access to a particular account. In each case, the address of the account and the types of access required are given. |
| authChannels     | 1..256 | ConsentRequestChannelType | A collection of the types of authentication that the DFSP may use to verify that its customer has in fact requested access for the PISP to the accounts requested. |
| callbackUri      | 1 | Uri | The callback URI that the user will be redirected to after completing verification via the WEB authorization channel. This field is mandatory as the PISP does not know ahead of time which AuthChannel the DSFP will use to authenticate their user.  |

#### <a id='Callbacks-1'></a>3.1.2.2 Callbacks

This section describes the callbacks that are used by the server under the resource /consentRequests.

##### 3.1.2.2.1 **PUT /consentRequests/**_{ID}_

Used by: DFSP

A DFSP uses this callback to (1) inform the PISP that the consentRequest has been accepted,
and (2) communicate to the PISP which `authChannel` it should use to authenticate their user
with.

When a PISP requests a series of permissions from a DFSP on behalf of a DFSP’s customer, not all
the permissions requested may be granted by the DFSP. Conversely, the out-of-band authorization
process  may result in additional privileges being granted by the account holder to the PISP. The
**PUT /consentRequests/**_{ID}_ resource returns the current state of the permissions relating to a
particular authorization request. The data model for this call is as follows:

| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| scopes       | 1..256 | Scope | One or more requests for access to a particular account. In each case, the address of the account and the types of access required are given. |
| authChannels | 1 | ConsentRequestChannelType | A list of one element, which the DFSP uses to inform the PISP of the selected authorization channel. |
| callbackUri  | 0..1 | Uri |The callback URI that the user will be redirected to after completing verification via the WEB authorization channel |
| authUri      | 0..1 | Uri | The URI that the PISP should call to complete the linking procedure if completion is required. |


##### 3.1.2.2.2 **PATCH /consentRequests/**_{ID}_

Used by: PISP

After the user completes an out-of-band authorization with the DFSP, the PISP will receive
a token which they can use to prove to the DFSP that the user trusts this PISP.

| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| authToken | 1 | BinaryString |The token given to the PISP by the DFSP as part of the out-of-band authentication process |

#### <a id='Errorcallbacks'></a>3.1.2.3 Error callbacks

This section describes the error callbacks that are used by the server under the resource
**/consentRequests**.

##### 3.1.2.3.1 **PUT /consentRequests/**_{ID}_**/error**

Used by: DFSP

If the server is unable to complete the consent request, or if an out-of-band processing error or
another processing error occurs, the error callback **PUT /consentRequests/**_{ID}_**/error** is used. The
*{ID}* in the URI should contain the *{ID}* that was used in the **GET /consentRequests/**_{ID}_
request or the **POST /consentRequests** request. The data model for this resource is as follows:

| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| errorInformation | 1 | ErrorInformation | Information describing the error and error code. |


### <a id='consents'></a>3.1.3 **/consents**

The **/consents** resource is used to negotiate a series of permissions between the PISP and the
DFSP which owns the account(s) on behalf of which the PISP wants to transact.

A **/consents** call is originally sent to the PISP by the DFSP following the original consent
request process described in Section 3.1.2.1.2 above. At the close of this process, the DFSP
which owns the customer’s account(s) will have satisfied itself that its customer really has
requested that the PISP be allowed access to their accounts, and will have defined the accounts in
question and the type of access which is to be granted.
#### <a id='Requests-1'></a>3.1.3.1 Requests
The **/consents** resource will support the following requests.
##### 3.1.3.1.1 **GET /consents/**_{ID}_

Used by: DFSP

The **GET /consents/**_{ID}_ resource allows a party to enquire after the status of a consent. The
*{ID}* used in the URI of the request should be the consent request ID which was used to identify
the consent when it was created.

Callback and data model information for **GET /consents/**_{ID}_:
- Callback – **PUT /consents/**_{ID}_
- Error Callback – **PUT /consents/**_{ID}_**/error**
- Data Model – Empty body
##### 3.1.3.1.2 **POST /consents**

Used by: DFSP

The **POST /consents** request is used to request the creation of a consent for interactions between
a PISP and the DFSP who owns the account which a PISP’s customer wants to allow the PISP access to.

Callback and data model information for **POST /consents/**:

- Callback – **PUT /consents/**_{ID}_
- Error Callback – **PUT /consents/**_{ID}_**/error**
- Data Model – defined below

| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| consentId | 1 | CorrelationId | Common ID between the PISP and the Payer DFSP for the consent object. The ID should be reused for resends of the same consent. A new ID should be generated for each new consent.|
| consentRequestId | 1 | CorrelationId | The ID given to the original consent request on which this consent is based. |
| scopes   | 1..256  | Scope | A list Scope objects, which represent the accounts and attached permissions on which the DFSP is prepared to grant specified permissions to the PISP. |
| status | 1 | ConsentStatus | The status of the Consent. |
| credential | 0..1 | Credential | The credential which is being used to support the consents. |
| extensionList | 0..1 | ExtensionList |Optional extension, specific to deployment |
##### 3.1.3.1.3 **DELETE /consents/**_{ID}_

Used by PISP, DFSP

The **DELETE /consents/**_{ID}_ request is used to request the revocation of a previously agreed consent.
For tracing and auditing purposes, the switch should be sure not to delete the consent physically;
instead, information relating to the consent should be marked as deleted and requests relating to the
consent should not be honoured.

> Note: the ALS should verify that the participant who is requesting the deletion is either the
> initiator named in the consent or the account holding institution named in the consent. If any
> other party attempts to delete a consent, the request should be rejected, and an error raised.

Callback and data model information for **DELETE /consents/**_{ID}_:
- Callback – **PATCH /consents/**_{ID}_
- Error Callback – **PUT /consents/**_{ID}_**/error**

#### <a id='Callbacks-1'></a>3.1.3.2 Callbacks
The **/consents** resource supports the following callbacks:
##### 3.1.3.2.1 **PATCH/consents/**_{ID}_

Used by: Auth-Service, DFSP

**PATCH /consents/**_{ID}_ is used in 2 places:
1. To inform the PISP that the `consent.credential` is valid and the account linking process completed
   successfully.
2. To inform the PISP or the DFSP that the Consent has been revoked.

In the first case, a DFSP sends a **PATCH/consents/**_{ID}_ request to the PISP with a `credential.status`
of `VERIFIED`.

In the second case, an Auth-Service or DFSP sends a **PATCH/consents/**_{ID}_ request with a `status` of
`REVOKED`, and the `revokedAt` field set.

The syntax of this call complies with the JSON Merge Patch specification [RFC-7386](https://datatracker.ietf.org/doc/html/rfc7386)
rather than the JSON Patch specification [RFC-6902](https://datatracker.ietf.org/doc/html/rfc6902).
The **PATCH /consents/**_{ID}_ resource contains a set of proposed changes to the current state of the
permissions relating to a particular authorization grant. The data model
for this call is as follows:

| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| status | 0..1 | ConsentStatus | The status of the Consent. |
| revokedAt | 0..1 | DateTime | The DateTime the consent was revoked at. |
| credential | 0..1 | Credential | The credential which is being used to support the consents. |
| extensionList | 0..1 | ExtensionList | Optional extension, specific to deployment |

##### 3.1.3.2.2 **PUT /consents/**_{ID}_

Used by: PISP

The **PUT /consents/**_{ID}_ resource is used to return information relating to the consent object
whose `consentId` is given in the URI. And for registering a credential for the consent. The
data returned by the call is as follows:

| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| scopes        | 1..256 | Scope         | The scopes covered by the consent. |
| status        | 0..1 | ConsentStatus | The status of the Consent. |
| credential    | 1    | Credential    | The credential which is being used to support the consents. |
| extensionList | 0..1 | ExtensionList | Optional extension, specific to deployment |
#### <a id='Errorcallbacks-1'></a>3.1.3.3 Error callbacks
This section describes the error callbacks that are used by the server under the resource **/consents**.
##### 3.1.3.3.1 **PUT /consents/**_{ID}_**/error**

Used by: PISP, DFSP, Auth-Service

If the server is unable to complete the consent, or if an out-of-loop processing error or another
processing error occurs, the error callback **PUT /consents/**_{ID}_**/error** is used. The *{ID}* in the
URI should contain the *{ID}* that was used in the **GET /consents/**_{ID}_ request or the
**POST /consents** request. The data model for this resource is as follows:

| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| errorInformation | 1 | ErrorInformation | Information describing the error and error code. |

### <a id='parties'></a>3.1.4 **/parties**

The **/parties** resource will be used by the PISP to identify a party to a transfer. This will be
used by the PISP to identify the payee DFSP when it requests a transfer.

The PISP will be permitted to issue a **PUT /parties** response. Although it does not own any
transaction accounts, there are circumstances in which another party may want to pay a customer
via their PISP identification: for instance, where the customer is at a merchant’s premises and
tells the merchant that they would like to pay via their PISP app. In these circumstances, the PISP
will need to be able to confirm that it does act for the customer.
#### <a id='Requests-1'></a>3.1.4.1 Requests

The **/parties** resource will support the following requests.
##### 3.1.4.1.1 **GET /parties**

Used by: PISP

The **GET /parties** resource will use the same form as the resource described in
[Section 6.3.3.1](https://github.com/mojaloop/mojaloop-specification/blob/master/fspiop-api/documents/v1.1-document-set/API%20Definition%20v1.1.md#6331-get-partiestypeid) of Ref. 1 above.
#### <a id='Callbacks-1'></a>3.1.4.2 Callbacks
The parties resource will support the following callbacks.
##### 3.1.4.2.1 **PUT /parties**

Used by: DFSP

The **PUT /parties** resource will use the same form as the resource described in
[Section 6.3.4.1](https://github.com/mojaloop/mojaloop-specification/blob/master/fspiop-api/documents/v1.1-document-set/API%20Definition%20v1.1.md#6341-put-partiestypeid) of Ref. 1 above.

### <a id='services'></a>3.1.5 **/services**
The **/services** resource is a new resource which enables a participant to query for other
participants who offer a particular service. The requester will issue a `GET` request, specifying
the type of service for which information is required as part of the query string. The switch will
respond with a list of the current DFSPs in the scheme which are registered as providing that
service.
#### <a id='Requests-1'></a>3.1.5.1 Requests
The services resource will support the following requests.
#### <a id='GETservicesServiceType'></a>3.1.5.2 **GET /services/**_{ServiceType}_

Used by: DFSP, PISP

The HTTP request **GET /services/**_{ServiceType}_ is used to find out the names of the participants in a
scheme which provide the type of service defined in the *{ServiceType}* parameter. The *{ServiceType}* parameter
should specify a value from the ServiceType enumeration. If it does not, the request will be
rejected with an error.

Callback and data model information for **GET /services/**_{ServiceType}_:
- Callback - **PUT /services/**_{ServiceType}_
- Error Callback - **PUT /services/**_{ServiceType}_**/error**
- Data Model – Empty body
#### <a id='Callbacks-1'></a>3.1.5.3 Callbacks
This section describes the callbacks that are used by the server for services provided by the
resource **/services**.
##### 3.1.5.3.1 **PUT /services/**_{ServiceType}_

Used by: Switch

The callback **PUT /services/**_{ServiceType}_ is used to inform the client of a successful result of
the service information lookup. The information is returned in the following form:

| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| providers | 0...256 | FspId | A list of the Ids of the participants who provide the service requested. |

##### 3.1.5.3.2 **PUT /services/**_{ServiceType}_**/error**

Used by: Switch

If the server encounters an error in fulfilling a request for a list of participants who
provide a service, the error callback **PUT /services/**_{ServiceType}_**/error** is used to inform the
client that an error has occurred.

| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| errorInformation | 1 | ErrorInformation | Information describing the error and error code. |

### <a id='thirdpartyRequestsauthorizations'></a>3.1.6 **thirdpartyRequests/authorizations**

The **/thirdpartyRequests/authorizations** resource is analogous to the **/authorizations** resource
 described in [Section 6.6](https://github.com/mojaloop/mojaloop-specification/blob/master/fspiop-api/documents/v1.1-document-set/API%20Definition%20v1.1.md#66-api-resource-authorizations) of Ref. 1 above. The DFSP uses it to request the PISP to:

1. Display the information defining the terms of a proposed transfer to its customer;
2. Obtain the customer’s confirmation that they want the transfer to proceed;
3. Return a signed version of the terms which the DFSP can use to verify the consent

The **/thirdpartyRequests/authorizations** resource supports the endpoints described below.
#### <a id='Requests-1'></a>3.1.6.1 Requests

This section describes the services that a client can request on the
**/thirdpartyRequests/authorizations** resource.
##### 3.1.6.1.1 **GET /thirdpartyRequests/authorizations/**_{ID}_

Used by: DFSP

The HTTP request **GET /thirdpartyRequests/authorizations/**_{ID}_ is used to get information relating
to a previously issued authorization request. The *{ID}* in the request should match the
`authorizationRequestId` which was given when the authorization request was created.

Callback and data model information for **GET /thirdpartyRequests/authorizations/**_{ID}_:
- Callback - **PUT /thirdpartyRequests/authorizations/**_{ID}_
- Error Callback - **PUT /thirdpartyRequests/authorizations/**_{ID}_**/error**
- Data Model – Empty body
##### 3.1.6.1.2 **POST /thirdpartyRequests/authorizations**

Used by: DFSP

The HTTP request **POST /thirdpartyRequests/authorizations** is used to request the validation by a
 customer for the transfer described in the request.

Callback and data model information for **POST /thirdpartyRequests/authorizations:**

- Callback - **PUT /thirdpartyRequests/authorizations/**_{ID}_
- Error Callback - **PUT /thirdpartyRequests/authorizations/**_{ID}_**/error**
- Data Model – See Table below


| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| authorizationRequestId | 1 | CorrelationId | Common ID between the PISP and the Payer DFSP for the authorization request object. The ID should be reused for resends of the same authorization request. A new ID should be generated for each new authorization request. |
| transactionRequestId   | 1 | CorrelationId | The unique identifier of the transaction request for which authorization is being requested. |
| challenge              | 1 | BinaryString | The challenge that the PISP’s client is to sign. |
| transferAmount         | 1 | Money | The amount that will be debited from the sending customer’s account as a consequence of the transaction. |
| payeeReceiveAmount     | 1 | Money | The amount that will be credited to the receiving customer’s account as a consequence of the transaction. |
| fees                   | 1 | Money | The amount of fees that the paying customer will be charged as part of the transaction. |
| payer                  | 1 | PartyIdInfo | Information about the Payer type, id, sub-type/id, FSP Id in the proposed financial transaction. |
| payee                  | 1 | Party | Information about the Payee in the proposed transaction |
| transactionType        | 1 | TransactionType | The type of the transaction. |
| expiration             | 1 | DateTime | The time by which the transfer must be completed, set by the payee DFSP. |
| extensionList          | 0..1 | ExtensionList |Optional extension, specific to deployment. |

#### <a id='Callbacks-1'></a>3.1.6.2 Callbacks
The following callbacks are supported for the **/thirdpartyRequests/authorizations** resource
##### 3.1.6.2.1 **PUT /thirdpartyRequests/authorizations/**_{ID}_

Used by: PISP

After receiving the **POST /thirdpartyRequests/authorizations**, the PISP will present the details of the
transaction to their user, and request that the client sign the `challenge` field using the credential
they previously registered.

The signed challenge will be sent back by the PISP in **PUT /thirdpartyRequests/authorizations/**_{ID}_:

| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| responseType  | 1    | AuthorizationResponseType | `ACCEPTED` or `REJECTED` |
| signedPayload | 0..1 | SignedPayload | If the `responseType` is `ACCEPTED`, `signedPayload` is required. |

#### <a id='Errorcallbacks-1'></a>3.1.6.3 Error callbacks
This section describes the error callbacks that are used by the server under the resource
**/thirdpartyRequests/authorizations**.
##### 3.1.6.3.1 **PUT /thirdpartyRequests/authorizations/**_{ID}_**/error**

Used by: DFSP

The **PUT /thirdpartyRequests/authorizations/**_{ID}_**/error** resource will have the same content
as the **PUT /authorizations/**_{ID}_**/error** resource described in [Section 6.6.5.1](https://github.com/mojaloop/mojaloop-specification/blob/master/fspiop-api/documents/v1.1-document-set/API%20Definition%20v1.1.md#6651-put-authorizationsiderror)
of Ref. 1 above.
### <a id='thirdpartyRequeststransactions'></a>3.1.7 **/thirdpartyRequests/transactions**
The **/thirdpartyRequests/transactions` resource is analogous to the `/transactionRequests**
resource described in [Section 6.4](https://github.com/mojaloop/mojaloop-specification/blob/master/fspiop-api/documents/v1.1-document-set/API%20Definition%20v1.1.md#64-api-resource-transactionrequests) of Ref. 1 above. The PISP uses it to request the
owner of the PISP’s customer’s account to transfer a specified amount from the customer’s
account with the DFSP to a named Payee.

The **/thirdpartyRequests/transactions** resource supports the endpoints described below.
#### <a id='Requests-1'></a>3.1.7.1 Requests

This section describes the services that a client can request on the
**/thirdpartyRequests/transactions** resource.
##### 3.1.7.1.1 **GET /thirdpartyRequests/transactions/**_{ID}_

Used by: PISP

The HTTP request **GET /thirdpartyRequests/transactions/**_{ID}_ is used to get information
relating to a previously issued transaction request. The *{ID}* in the request should
match the `transactionRequestId` which was given when the transaction request was created.

Callback and data model information for **GET /thirdpartyRequests/transactions/**_{ID}_:
- Callback - **PUT /thirdpartyRequests/transactions/**_{ID}_
- Error Callback - **PUT /thirdpartyRequests/transactions/**_{ID}_**/error**
- Data Model – Empty body
##### 3.1.7.1.2 **POST /thirdpartyRequests/transactions**

Used by: PISP

The HTTP request **POST /thirdpartyRequests/transactions** is used to request the creation
of a transaction request on the server for the transfer described in the request.

Callback and data model information for **POST /thirdpartyRequests/transactions**:
- Callback - **PUT /thirdpartyRequests/transactions/**_{ID}_
- Error Callback - **PUT /thirdpartyRequests/transactions/**_{ID}_**/error**
- Data Model – See Table below

| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| transactionRequestId | 1 | CorrelationId |Common ID between the PISP and the Payer DFSP for the transaction request object. The ID should be reused for resends of the same transaction request. A new ID should be generated for each new transaction request. |
| payee                | 1 | Party |Information about the Payee in the proposed financial transaction. |
| payer                | 1 | PartyIdInfo |Information about the Payer type, id, sub-type/id, FSP Id in the proposed financial transaction. |
| amountType           | 1 | AmountType | SEND for send amount, RECEIVE for receive amount. |
| amount               | 1 | Money | Requested amount to be transferred from the Payer to Payee. |
| transactionType      | 1 | TransactionType |Type of transaction |
| note                 | 0..1 | Note | Memo assigned to Transaction. |
| expiration           | 0..1 | DateTime |Can be set to get a quick failure in case the peer FSP takes too long to respond. Also, it may be beneficial for Consumer, Agent, Merchant to know that their request has a time limit. |
| extensionList        | 0..1 | ExtensionList |Optional extension, specific to deployment. |
#### <a id='Callbacks-1'></a>3.1.7.2 Callbacks
The following callbacks are supported for the **/thirdpartyRequests/transactions** resource
##### 3.1.7.2.1 **PUT /thirdpartyRequests/transactions/**_{ID}_

Used by: DFSP

After a PISP requests the creation of a Third Party Transaction request (**POST /thirdpartyRequests/transactions**)
or the status of a previously created Third Party Transaction request
(**GET /thirdpartyRequests/transactions/**_{ID}_), the DFSP will send this callback.

The data model for this endpoint is as follows:
| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| transactionRequestState | 1 | TransactionRequestState | State of the transaction request. |
| extensionList | 0..1 | ExtensionList | Optional extension, specific to deployment |

##### 3.1.7.2.2 **PATCH /thirdpartyRequests/transactions/**_{ID}_

Used by: DFSP

The issuing PISP will expect a response to their request for a transfer which describes
the finalised state of the requested transfer. This response will be given by a `PATCH` call on the
**/thirdpartyRequests/transactions/**_{ID}_ resource. The *{ID}* given in the query string should be
the `transactionRequestId` which was originally used by the PISP to identify the transaction
request (see [Section 3.1.8.1.2](#31812-post-thirdpartyrequestsverifications) above.)

The data model for this endpoint is as follows:
| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| completedTimestamp | 0..1 | DateTime |Time and date when the transaction was completed, if it was completed. |
| transactionRequestState | 1 | TransactionRequestState | State of the transaction request |
| transactionState | 1 | TransactionState | State of the transaction created by the DFSP in response to this transaction request |
| extensionList | 0..1 | ExtensionList |Optional extension, specific to deployment |

#### <a id='Errorcallbacks-1'></a>3.1.7.3 Error callbacks
This section describes the error callbacks that are used by the server under the resource
**/thirdpartyRequests/transactions**.
##### 3.1.7.3.1 **PUT /thirdpartyRequests/transactions/**_{ID}_**/error**

Used by: DFSP

The **PUT /thirdpartyRequests/transactions/**_{ID}_**/error** resource will have the same content as
the **PUT /transactionRequests/**_{ID}_**/error** resource described in [Section 6.4.5.1](https://github.com/mojaloop/mojaloop-specification/blob/master/fspiop-api/documents/v1.1-document-set/API%20Definition%20v1.1.md#6451-put-transactionrequestsiderror) of Ref. 1 above.

### <a id='thirdpartyRequestsverifications'></a>3.1.8 **/thirdpartyRequests/verifications**

The **/thirdpartyRequests/verifications** resource is used by a Payer DFSP to verify that an authorization
response received from a PISP was signed using the correct private key, in cases where the authentication service
to be used is implemented by the switch and not internally by the DFSP. The DFSP sends the original
challenge and the signed response to the authentication service, together with the `consentId` to be used
for the verification. The authentication service compares the response with the result of signing the
challenge with the private key associated with the `consentId`, and, if the two match, it returns a
positive result. Otherwise, it returns an error.

The **/thirdpartyRequests/verifications** resource supports the endpoints described below.
#### <a id='Requests-1'></a>3.1.8.1 Requests
This section describes the services that a client can request on the **/thirdpartyRequests/verifications**
resource.
##### 3.1.8.1.1 **GET /thirdpartyRequests/verifications/**_{ID}_

Used by: DFSP

The HTTP request **/thirdpartyRequests/verifications/**_{ID}_ is used to get information regarding a previously
created or requested authorization. The *{ID}* in the URI should contain the verification request ID
(see [Section 3.1.8.1.2](#31812-post-thirdpartyrequestsverifications) below) that was used for the creation of the transfer.Callback and data model
information for **GET /thirdpartyRequests/verifications/**_{ID}_:

- Callback – **PUT /thirdpartyRequests/verifications/**_{ID}_
- Error Callback – **PUT /thirdpartyRequests/verifications/**_{ID}_**/error**
- Data Model – Empty body
##### 3.1.8.1.2 **POST /thirdpartyRequests/verifications**

Used by: DFSP

The **POST /thirdpartyRequests/verifications** resource is used to request confirmation from an authentication
service that a challenge has been signed using the correct private key.

Callback and data model information for **POST /thirdpartyRequests/verifications**:
- Callback - **PUT /thirdpartyRequests/verifications/**_{ID}_
- Error Callback - **PUT /thirdpartyRequests/verifications /**_{ID}_**/error**
- Data Model – See Table below

| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| verificationRequestId | 1 | CorrelationId |Common ID between the DFSP and authentication service for the verification request object. The ID should be reused for resends of the same authorization request. A new ID should be generated for each new authorization request. |
| challenge | 1 | BinaryString |The challenge originally sent to the PISP |
| consentId | 1 | CorrelationId |Common Id between the DFSP and the authentication service for the agreement against which the authentication service is to evaluate the signature |
| signedPayloadType | 1 | SignedPayloadType | The type of the SignedPayload, depending on the type of credential registered by the PISP |
| genericSignedPayload | 0..1 | BinaryString | Required if signedPayloadType is GENERIC. The signed challenge returned by the PISP. A BinaryString representing a signature of the challenge + private key of the credential. |
| fidoSignedPayload | 0..1 | FIDOPublicKeyCredentialAssertion | Required if signedPayloadType is FIDO. The signed challenge returned by the PISP in the form of a [`FIDOPublicKeyCredentialAssertion` Object](https://w3c.github.io/webauthn/#iface-pkcredential) |

#### <a id='Callbacks-1'></a>3.1.8.2 Callbacks
This section describes the callbacks that are used by the server under the resource
**/thirdpartyRequests/verifications**
##### 3.1.8.2.1 **PUT /thirdpartyRequests/verifications/**_{ID}_

Used by: Auth Service

The callback **PUT /thirdpartyRequests/verifications/**_{ID}_ is used to inform the client of the result
of an authorization check. The *{ID}* in the URI should contain the `authorizationRequestId`
(see [Section 3.1.8.1.2](#31812-post-thirdpartyrequestsverifications) above) which was used to request the check, or the *{ID}* that was
used in the **GET /thirdpartyRequests/verifications/**_{ID}_. The data model for this resource is as follows:

| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| authenticationResponse | 1 | AuthenticationResponse | The result of the authorization check. |
#### <a id='Errorcallbacks-1'></a>3.1.8.3 Error callbacks
This section describes the error callbacks that are used by the server under the resource
**/thirdpartyRequests/verifications**.
##### 3.1.8.3.1 **PUT /thirdpartyRequests/verifications/**_{ID}_**/error**

Used by: Auth Service

If the server is unable to complete the authorization request, or another processing error occurs, the
error callback **PUT /thirdpartyRequests/verifications/**_{ID}_**/error** is used.The *{ID}* in the URI should
contain the `verificationRequestId` (see [Section 3.1.8.1.2](#31812-post-thirdpartyrequestsverifications) above) which was used to request the
check, or the *{ID}* that was used in the **GET /thirdpartyRequests/verifications/**_{ID}_.

The data model for this resource is as follows:
| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| errorInformation | 1 | ErrorInformation | Information describing the error and error code. |

## <a id='DataModels'></a>3.2 Data Models

The following additional data models will be required to support the Third Party API

### <a id='Elementdefinitions'></a>3.2.1 Element definitions
#### <a id='Account'></a>3.2.1.1 Account

The Account data model contains information relating to an account.

| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| address  | 1 | AccountAddress | An address which can be used to identify the account |
| currency | 1 | Currency | The currency in which the account is denominated |
| accountNickname | 0..1 | Name | Display name of the account, as set by the account owning DFSP. This will normally be a type name, such as “Transaction Account” or “Savings Account” |
#### <a id='AccountAddress'></a>3.2.1.2 AccountAddress

The AccountAddress data type is a variable length string with a maximum size of 1023 characters and consists of:
- Alphanumeric characters, upper or lower case. (Addresses are case-sensitive so that they can contain data encoded in formats such as base64url.)
- Underscore (\_)
- Tilde (~)
- Hyphen (-)
- Period (.) Addresses MUST NOT end in a period (.) character

An entity providing accounts to parties (i.e. a participant) can provide any value for an `AccountAddress` that is meaningful to that entity.
It does not need to provide an address that makes the account identifiable outside the entity’s domain.

> ***IMPORTANT:* The policy for defining addresses and the life-cycle of these is at the discretion of the address space owner (the payer DFSP in this case).**
#### <a id='AccountList'></a>3.2.1.3 AccountList
The AccountList data model is used to hold information about the accounts that a party controls.
| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| account | 1..256 | Account | Information relating to an account that a party controls. |

<!-- TODO update these numbers! -->
#### <a id='AuthenticationResponse'></a>3.2.1.5 AuthenticationResponse

| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| AuthenticationResponse | 1 | Enum of String(1..32) | See [Section 3.2.2.1](#3221-AuthenticationResponse) below (AuthenticationResponse) for more information on allowed values.|
#### <a id='BinaryString'></a>3.2.1.6 BinaryString
The BinaryString type used in these definitions is as defined in [Section 7.2.17](https://github.com/mojaloop/mojaloop-specification/blob/master/fspiop-api/documents/v1.1-document-set/API%20Definition%20v1.1.md#7217-binarystring) of Ref. 1 above.
#### <a id='ConsentRequestChannelType'></a>3.2.1.7 ConsentRequestChannelType
The ConsentRequestChannelType is used to hold an instance of the ConsentRequestChannelType enumeration. Its data model is as follows:
| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| ConsentRequestChannelType | 1 | Enum of String(1..32) | See [Section 3.2.2.4](#3223-consentrequestchanneltype) below ( ConsentRequestChannelType) for more information on allowed values. |

#### <a id='ConsentStatus'></a>3.2.1.8 ConsentStatus
The ConsentStatus type stores the status of a consent request, as described in [Section 3.1.3.2.2](#31322-put-consentsid) above. Its data model is as follows:
| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| ConsentStatus | 1 | Enum of String(1..32) | See [Section 3.2.2.5](#3224-consentstatustype) below (ConsentStatusType) for more information on allowed values.|

#### <a id='CorrelationId'></a>3.2.1.9 CorrelationId
The CorrelationId type used in these definitions is as defined in [Section 7.3.8](https://github.com/mojaloop/mojaloop-specification/blob/master/fspiop-api/documents/v1.1-document-set/API%20Definition%20v1.1.md#738-correlationid) of Ref. 1 above.
##### 3.2.1.10 Credential
The Credential object is used to store information about a publicKey and signature that has been registered with a Consent.
This publicKey can be used to verify that transaction authorizations have been signed by the previously-registered privateKey,
which resides on a User's device.

| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| credentialType | 1 | CredentialType | The type of credential this is - `FIDO` or `GENERIC` |
| status | 1 | CredentialStatus | The current status of the credential. |
| genericPayload | 0..1 | GenericCredential | Required if credentialType is GENERIC. A description of the credential and information which allows the recipient of the credential to test its veracity. |
| fidoPayload    | 0..1 | FIDOPublicKeyCredentialAttestation | Required if credentialType is FIDO. A description of the credential and information which allows the recipient of the credential to test its veracity. |

##### 3.2.1.11 CredentialStatus
The CredentialStatus data type stores the state of a credential request. Its data model is as follows.
| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| CredentialStatus | 1 | Enum of String(1..32) |See [Section 3.2.2.6](#3225-CredentialStatus) below (CredentialStatus) for more information on allowed values. |

##### 3.2.1.12 DateTime
The DateTime data type used in these definitions is as defined in [Section 7.2.14](https://github.com/mojaloop/mojaloop-specification/blob/master/fspiop-api/documents/v1.1-document-set/API%20Definition%20v1.1.md#7214-datetime) of Ref. 1 above.
##### 3.2.1.13 ErrorInformation
The ErrorInformation data type used in these definitions is as defined in [Section 7.4.2](https://github.com/mojaloop/mojaloop-specification/blob/master/fspiop-api/documents/v1.1-document-set/API%20Definition%20v1.1.md#742-errorinformation) of Ref. 1 above

Valid values for ErrorCode and ErrorDescription are defined in [Error Codes](#ErrorCodes)

##### 3.2.1.14 ExtensionList
The ExtensionList data type used in these definitions is as defined in [Section 7.4.4](https://github.com/mojaloop/mojaloop-specification/blob/master/fspiop-api/documents/v1.1-document-set/API%20Definition%20v1.1.md#744-extensionlist) of Ref. 1 above.
##### 3.2.1.15 FspId
The FspId data type used in these definitions is as defined in [Section 7.3.16](https://github.com/mojaloop/mojaloop-specification/blob/master/fspiop-api/documents/v1.1-document-set/API%20Definition%20v1.1.md#7316-fspid) of Ref. 1 above.

##### 3.2.1.16 GenericCredential
The GenericCredential object stores the payload for a credential which is validated according to a comparison of the signature created from the challenge using a private key against the same challenge signed using a public key. Its content is as follows.
| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| publicKey | 1 | BinaryString | The public key to be used in checking the signature. |
| signature | 1 | BinaryString | The signature to be checked against the public key. |

##### 3.2.1.17 Money
The Money type used in these definitions is a defined in [Section 7.4.10](https://github.com/mojaloop/mojaloop-specification/blob/master/fspiop-api/documents/v1.1-document-set/API%20Definition%20v1.1.md#7410-money) of Ref. 1 above.
##### 3.2.1.18 Note
The Note data type used in these definitions is as defined in [Section 7.3.23](https://github.com/mojaloop/mojaloop-specification/blob/master/fspiop-api/documents/v1.1-document-set/API%20Definition%20v1.1.md#7323-note) of Ref. 1 above.
##### 3.2.1.19 Party

The Note data type used in these definitions is as defined in [Section 7.4.11](https://github.com/mojaloop/mojaloop-specification/blob/master/fspiop-api/documents/v1.1-document-set/API%20Definition%20v1.1.md#7411-party) of Ref. 1 above.

##### 3.2.1.20 PartyIdInfo
The PartyIdInfo data type used in these definitions is as defined in [Section 7.4.13](https://github.com/mojaloop/mojaloop-specification/blob/master/fspiop-api/documents/v1.1-document-set/API%20Definition%20v1.1.md#7413-partyidinfo) of Ref. 1 above.


##### 3.2.1.21 Scope
The Scope element contains an identifier defining, in the terms of a DFSP, an account on which access types can be requested or granted. It also defines the access types which are requested or granted.
| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| address | 1 |AccountAddress | The address of the account to which the PISP wishes to be permitted access, or is being granted access  |
| actions | 1..32 |ScopeAction | The action that the PISP wants permission to take in relation to the customer’s account, or that it has been granted in relation to the customer’s account|
##### 3.2.1.22 ScopeAction
The ScopeAction element contains an access type which a PISP can request from a DFSP, or which a DFSP can grant to a PISP. It must be a member of the appropriate enumeration.
| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| scopeAction | 1 | Enum of String(1..32)| See [Section 3.2.2.9](#3228-scopeenumeration) below (ScopeEnumeration) for more information on allowed values. |
##### 3.2.1.23 ServiceType
The ServiceType element contains a type of service where the requester wants a list of the participants in the scheme which provide that service. It must be a member of the appropriate enumeration.
| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| serviceType | 1 | Enum of String(1..32) | See [Section 3.2.2.10](#3229-servicetype) below (ServiceType) for more information on allowed values. |

##### 3.2.1.24 TransactionType
The TransactionType type used in these definitions is as defined in [Section 7.4.18](https://github.com/mojaloop/mojaloop-specification/blob/master/fspiop-api/documents/v1.1-document-set/API%20Definition%20v1.1.md#7418-transactiontype) of Ref. 1 above.
##### 3.2.1.25 TransactionState
The TransactionState type used in these definitions is as defined in [Section 7.3.33](https://github.com/mojaloop/mojaloop-specification/blob/master/fspiop-api/documents/v1.1-document-set/API%20Definition%20v1.1.md#7333-transactionstate) of Ref. 1 above.
##### 3.2.1.26 Uri
The API data type Uri is a JSON string in a canonical format that is restricted by a regular expression for interoperability reasons. The regular expression for restricting the Uri type is as follows:
`^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))? `
##### 3.2.1.27 FIDOPublicKeyCredentialAttestation

A data model representing a FIDO Attestation result. Derived from [`PublicKeyCredential` Interface](https://w3c.github.io/webauthn/#iface-pkcredential).

The `PublicKeyCredential` interface represents the below fields with a Type of Javascript [ArrayBuffer](https://heycam.github.io/webidl/#idl-ArrayBuffer).
For this API, we represent ArrayBuffers as base64 encoded utf-8 strings.


| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| id       | 1    | String(59..118) | The identifier of a keypair created by an authenticator |
| rawId    | 0..1 | String(59..118) | The identifier of a keypair created by an authenticator, base64 encoded |
| response | 1    | AuthenticatorAttestationResponse | The attestation response from the authenticator |

##### 3.2.1.28 FIDOPublicKeyCredentialAssertion

A data model representing a FIDO Assertion result. Derived from [`PublicKeyCredential` Interface](https://w3c.github.io/webauthn/#iface-pkcredential) in [WebAuthN](https://w3c.github.io/webauthn/).

The `PublicKeyCredential` interface represents the below fields with a Type of Javascript [ArrayBuffer](https://heycam.github.io/webidl/#idl-ArrayBuffer).
For this API, we represent ArrayBuffers as base64 encoded utf-8 strings.

| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| id       | 1    | String(59..118) | The identifier of a keypair created by an authenticator |
| rawId    | 0..1 | String(59..118) | The identifier of a keypair created by an authenticator, base64 encoded |
| response | 1    | AuthenticatorAssertionResponse | The assertion response from the authenticator |

##### 3.2.1.29 AuthenticatorAttestationResponse

A data model representing an [AttestationStatement](https://w3c.github.io/webauthn/#attestation-statement) from [WebAuthN](https://w3c.github.io/webauthn/).

| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| clientDataJSON    | 1 | String(121...512) | JSON string with client data |
| attestationObject | 1 | String(306...2048) | Object encoded in Concise Binary Object Representation(CBOR), as defined in [RFC-8949](https://www.rfc-editor.org/rfc/rfc8949)|

##### 3.2.1.30 AuthenticatorAssertionResponse

A data model representing an [AuthenticatorAssertionResponse](https://w3c.github.io/webauthn/#authenticatorassertionresponse).

| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| authenticatorData | 1 | String(29..256) | Information about the authenticator. |
| clientDataJSON    | 1 | String(121..512) | base64 encoded JSON string containing information about the client. |
| signature         | 1 | String(59..256) | The signature generated by the private key associated with this credential. |
| userHandle        | 0..1 | String(1..88) | This field is optionally provided by the authenticator, and represents the user.id that was supplied during registration, as defined in [WebAuthN's user.id](https://w3c.github.io/webauthn/#dom-publickeycredentialuserentity-id).|

##### 3.2.1.31 SignedPayload

A data model representing a Third Party Transaction request signature.

| Name | Cardinality | Type | Description |
| --- | --- | --- | --- |
| signedPayloadType     | 1 | SignedPayloadType | `FIDO` or `GENERIC` |
| genericSignedPayload  | 0..1 | BinaryString(256) | Required if signedPayloadType is of type `GENERIC`. A BinaryString(256) of a signature of a sha-256 hash of the challenge. |
| fidoSignedPayload     | 0..1 | FIDOPublicKeyCredentialAssertion | Required if signedPayloadType is of type `FIDO`. |

### <a id='Enumerations'></a>3.2.2 Enumerations
#### <a id='AuthenticationResponse-1'></a>3.2.2.1 AuthenticationResponse
The AuthenticationResponse enumeration describes the result of authenticating verification request.
| Name | Description |
| ---  | ----------- |
| VERIFIED | The challenge was correctly signed. |
#### <a id='AuthorizationResponseType'></a>3.2.2.2 AuthorizationResponseType
The AuthorizationResponseType enumeration is the same as the AuthorizationResponse enumeration described in [Section 7.5.3](https://github.com/mojaloop/mojaloop-specification/blob/master/fspiop-api/documents/v1.1-document-set/API%20Definition%20v1.1.md#753-authorizationresponse) of Ref. 1 above.
#### <a id='ConsentRequestChannelType-1'></a>3.2.2.3 ConsentRequestChannelType

| Name | Description |
| ---  | ----------- |
| WEB | DFSP can support authorization via a web-based login |
| OTP | DFSP can support authorization via a One Time PIN |

#### <a id='ConsentStatusType'></a>3.2.2.4 ConsentStatusType
The ConsentStatusType enumeration describes the allowed status values that a consent item can have. These are as follows:
| Name | Description |
| ---  | ----------- |
| ISSUED | The consent has been issued by the DFSP. |
| REVOKED | The consent has been revoked. |

#### <a id='CredentialStatus'></a>3.2.2.5 CredentialStatus
This contains the allowed values for the CredentialStatus
| Name | Description |
| ---  | ----------- |
| PENDING | The credential has been created but not yet verified. |
| VERIFIED | Authentication service has verified the credential. |

#### <a id='CredentialType'></a>3.2.2.6 CredentialType
The CredentialType enumeration contains the allowed values for the type of credential which is associated with a permission.
| Name | Description |
| ---  | ----------- |
| FIDO | The credential is based on a FIDO challenge. Its payload is a FIDOPublicKeyCredentialAttestation object. |
| GENERIC | The credential is based on a simple public key validation. Its payload is a GenericCredential object |

#### <a id='PartyIdType'></a>3.2.2.7 PartyIdType
The PartyIdType enumeration is extended for PISPs to include a definition for the identifier which represents a link between a specific PISP and an account at a DFSP which a customer has given the PISP permission to access.

| Name | Description |
| ---  | ----------- |
| MSISDN | An MSISDN (Mobile Station International Subscriber Directory Number; that is, a phone number) is used in reference to a Party. The MSISDN identifier should be in international format according to the ITU-T E.16437 standard. Optionally, the MSISDN may be prefixed by a single plus sign, indicating the international prefix.|
| EMAIL | An email is used in reference to a Party. The format of the email should be according to the informational RFC 369638.|
| PERSONAL_ID | A personal identifier is used in reference to a participant. Examples of personal identification are passport number, birth certificate number, and national registration number. The identifier number is added in the PartyIdentifier element. The personal identifier type is added in the PartySubIdOrType element.|
| BUSINESS | A specific Business (for example, an organization or a company) is used in reference to a participant. The BUSINESS identifier can be in any format. To make a transaction connected to a specific username or bill number in a Business, the PartySubIdOrType element should be used.|
| DEVICE | A specific device (for example, POS or ATM) ID connected to a specific business or organization is used in reference to a Party. For referencing a specific device under a specific business or organization, use the PartySubIdOrType element.|
| ACCOUNT_ID | A bank account number or FSP account ID should be used in reference to a participant. The ACCOUNT_ID identifier can be in any format, as formats can greatly differ depending on country and FSP.|
| IBAN | A bank account number or FSP account ID is used in reference to a participant. The IBAN identifier can consist of up to 34 alphanumeric characters and should be entered without whitespace.|
| ALIAS | An alias is used in reference to a participant. The alias should be created in the FSP as an alternative reference to an account owner. Another example of an alias is a username in the FSP system. The ALIAS identifier can be in any format. It is also possible to use the PartySubIdOrType element for identifying an account under an Alias defined by the PartyIdentifier.|
| THIRD_PARTY_LINK | A third-party link which represents an agreement between a specific PISP and a customer’s account at a DFSP. The content of the link is created by the DFSP at the time when it gives permission to the PISP for specific access to a given account.|

#### <a id='ScopeEnumeration'></a>3.2.2.8 ScopeEnumeration

| Name | Description |
| ---  | ----------- |
| ACCOUNTS_GET_BALANCE | PISP can request a balance for the linked account |
| ACCOUNTS_TRANSFER   | PISP can request a transfer of funds from the linked account in the DFSP |
| ACCOUNTS_STATEMENT  | PISP can request a statement of individual transactions on a user’s account |

#### <a id='ServiceType'></a>3.2.2.9 ServiceType
The ServiceType enumeration describes the types of role for which a DFSP may query using the /services resource.
| Name | Description |
| ---  | ----------- |
| THIRD_PARTY_DFSP| DFSPs which will support linking with PISPs |
| PISP            | PISPs |
| AUTH_SERVICE    | Participants which provide Authentication Services |

##### 3.2.2.10 SignedPayloadType
The SignedPayloadType enumeration contains the allowed values for the type of a signed payload
| Name | Description |
| ---  | ----------- |
| FIDO | The signed payload is based on a FIDO Assertion Response. Its payload is a FIDOPublicKeyCredentialAssertion object. |
| GENERIC | The signed payload is based on a simple public key validation. Its payload is a BinaryString object |

##### 3.2.2.11 AmountType
See [7.3.1 AmountType](https://github.com/mojaloop/mojaloop-specification/blob/master/fspiop-api/documents/v1.1-document-set/API%20Definition%20v1.1.md#731-amounttype)

##### 3.2.2.12 TransactionRequestState
See [7.5.10 TransactionRequestState](https://github.com/mojaloop/mojaloop-specification/blob/master/fspiop-api/documents/v1.1-document-set/API%20Definition%20v1.1.md#7510-transactionrequeststate)


## <a id='ErrorCodes'></a> 3.3 Error Codes

The Third Party API Error Codes are defined in [Section 7.6](https://github.com/mojaloop/mojaloop-specification/blob/master/fspiop-api/documents/v1.1-document-set/API%20Definition%20v1.1.md#76-error-codes) of ref 1 above.

In addition, the Third Party API adds the following error codes, starting with the prefix `6`:

- General Third Party Error -- **60**_xx_

| **Error Code** | **Name** | **Description** | /accounts | /consentRequests | /consents | /parties | /services | /thirdpartyRequests/authorizations | thirdpartyRequests/transactions | thirdpartyRequests/verifications |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **6000** | Third party error         | Generic error.              | X | X | X | X | X | X | X | X |
| **6001** | Third party request error | Third party request failed. | X | X | X | X | X | X | X | X |
| **6003** | Downstream Failure        | The downstream request failed. | X | X | X | X | X | X | X | X |

- Permission Error -- **61**_xx_

| **Error Code** | **Name** | **Description** | /accounts | /consentRequests | /consents | /parties | /services | /thirdpartyRequests/authorizations | thirdpartyRequests/transactions | thirdpartyRequests/verifications |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **6100** | Authentication rejection            | Generic authentication rejection                             |   | X |   |   |   | X |   |   |
| **6101** | Unsupported scopes were requested   | PISP requested scopes that the DFSP doesn’t allow/support    |   | X | X |   |   |   |   |   |
| **6102** | Consent not granted                 | User did not grant consent to the PISP                       |   | X | X |   |   |   |   |   |
| **6103** | Consent not valid                   | Consent object is not valid or has been revoked              |   | X | X |   |   | X | X | X |
| **6104** | Third Party request rejection       | The request was rejected                                     | X | X | X | X | X | X | X | X |

- Validation Error -- **62**_xx_

| **Error Code** | **Name** | **Description** | /accounts | /consentRequests | /consents | /parties | /services | /thirdpartyRequests/authorizations | thirdpartyRequests/transactions | thirdpartyRequests/verifications |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **6200** | Invalid Consent Credential            | The signature of the credential submitted by the PISP is invalid        |   |   | X |   |   |   |   |   |
| **6201** | Invalid transaction signature         | The signature of the verification response doesn't match the credential |   |   |   |   |   | X |   | X |
| **6203** | Invalid authentication token          | DFSP receives invalid authentication token from PISP.                   |   | X |   |   |   |   |   |   |
| **6204** | Bad callbackUri                       | The callbackUri is deemed invalid or untrustworthy.                      |   | X |   |   |   |   |   |   |
| **6205** | No accounts found                     | No accounts were found for the given identifier                         | X |   |   |   |   |   |   |   |


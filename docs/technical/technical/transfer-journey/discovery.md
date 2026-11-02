# Phase 1 · Discovery (H1–H8)

Discovery resolves the payee identifier (`MSISDN 255700000111`) to the DFSP that holds it (`riverwallet`) and to the party details that DFSP returns.

**Datastores touched:** ALS database (oracle configuration, read), oracle database (read), `central_ledger` participant and endpoint tables (read through the admin API), SDK Redis on both sides. There is no Kafka traffic and no ledger write.

## H1 · pinebank core → pinebank SDK

`POST /transfers` on the sdk-scheme-adapter **outbound** API. This is the DFSP's private, simplified, synchronous interface; it is not FSPIOP and is not signed.

**Request:** `POST /transfers`

Headers:

```json
{
  "Content-Type": "application/json",
  "Accept": "application/json"
}
```

Body:

```json
{
  "homeTransactionId": "pb-20261015-000123",
  "from": {
    "idType": "MSISDN",
    "idValue": "255700000999",
    "displayName": "Amara N.",
    "firstName": "Amara",
    "lastName": "Nkosi",
    "dateOfBirth": "1990-04-12"
  },
  "to": {
    "idType": "MSISDN",
    "idValue": "255700000111"
  },
  "amountType": "SEND",
  "currency": "USD",
  "amount": "50.00",
  "transactionType": "TRANSFER",
  "note": "Rent share"
}
```

**Inside the payer SDK** (`modules/api-svc/src/lib/model/OutboundTransfersModel.js`):

1. Create `transferId` (a ULID by default) and a state-machine instance in state `start`. The same value is later used as the quote's `transactionId`.
2. Persist the model state in **Redis** under the transfer ID. It is saved again after every transition, so a restarted SDK can resume.
3. Run transition `resolvePayee` → H2.

The SDK turns the hub's asynchronous callbacks into a synchronous wait. Before each outbound FSPIOP call it subscribes to a Redis pub/sub channel keyed by the request (for example `tf_<transferId>` for transfers). Its inbound server publishes the matching callback to that channel when it arrives.

The HTTP response to H1 is returned only after H30 when `AUTO_ACCEPT_PARTY` and `AUTO_ACCEPT_QUOTES` are `true` (the defaults):

**Response:** `200 OK`

Headers:

```json
{
  "Content-Type": "application/json"
}
```

Body:

```json
{
  "transferId": "01JBVM16V1SZQX8B0JZ2N4ZDE4",
  "homeTransactionId": "pb-20261015-000123",
  "from": { "idType": "MSISDN", "idValue": "255700000999", "displayName": "Amara N.", "fspId": "pinebank" },
  "to": { "idType": "MSISDN", "idValue": "255700000111", "displayName": "Kofi M.", "fspId": "riverwallet" },
  "amountType": "SEND",
  "currency": "USD",
  "amount": "50.00",
  "transactionType": "TRANSFER",
  "note": "Rent share",
  "currentState": "COMPLETED",
  "quoteId": "01JBVM13SQYP507JB1DYBZVCMF",
  "getPartiesResponse": { "body": { "party": { "…": "H7 body" } }, "headers": { "…": "…" } },
  "quoteResponse": { "body": { "transferAmount": { "amount": "50.00", "currency": "USD" }, "…": "H15 body" }, "headers": { "…": "…" } },
  "quoteResponseSource": "riverwallet",
  "fulfil": { "body": { "fulfilment": "ax8KPpwtT4obflw9Kp8OjXxrWk8-LRwLmo9-bVxLOik", "completedTimestamp": "2026-10-15T09:30:06.410Z", "transferState": "COMMITTED" }, "headers": { "…": "…" } }
}
```

With `AUTO_ACCEPT_PARTY=false`, H1 instead returns early with `"currentState": "WAITING_FOR_PARTY_ACCEPTANCE"` after H8. Core banking then continues with `PUT /transfers/01JBVM16V1SZQX8B0JZ2N4ZDE4` and `{ "acceptParty": true }`.

## H2 · pinebank SDK → ALS

The payee DFSP is not known yet, so there is no `FSPIOP-Destination`. The `GET` has no body.

**Request:** `GET /parties/MSISDN/255700000111`

Headers:

```json
{
  "Content-Type": "application/vnd.interoperability.parties+json;version=2.0",
  "Accept": "application/vnd.interoperability.parties+json;version=2",
  "Date": "Thu, 15 Oct 2026 09:30:00 GMT",
  "FSPIOP-Source": "pinebank",
  "traceparent": "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01"
}
```

**Response:** `202 Accepted`

**Inside ALS** (`src/domain/parties/getPartiesByTypeAndID.js` → `services/GetPartiesService.js`):

1. Ingress plugins (see [Hub HTTP ingress](./README.md#hub-http-ingress)). ALS responds `202` immediately and processing continues asynchronously.
2. `validateRequester()`: participant lookup for `pinebank` (cache, then admin API). If pinebank is unknown or inactive, ALS sends an error callback to pinebank.
3. There is no `FSPIOP-Destination` header, so ALS consults the oracle → H3.

## H3 · ALS → oracle

**Inside ALS** (`src/models/oracle/facade.js` `oracleRequest`):

**Step 1 · `determineOracleEndpoint()`.** Find the oracle URL for party type `MSISDN` (and currency, if given) in the ALS database, through an in-memory cache (`oracleEndpointCached`). On a cache miss it runs the query below. With a currency in the request, `getOracleEndpointByTypeAndCurrency` adds `INNER JOIN currency` and a `cu.currencyId` condition.

```sql
SELECT oracleEndpoint.oracleEndpointId,
       et.type                 AS endpointType,
       oracleEndpoint.value,
       pt.name                 AS idType,
       oracleEndpoint.currencyId AS currency,
       oracleEndpoint.isDefault
FROM oracleEndpoint
INNER JOIN endpointType AS et ON oracleEndpoint.endpointTypeId = et.endpointTypeId
INNER JOIN partyIdType  AS pt ON oracleEndpoint.partyIdTypeId  = pt.partyIdTypeId
WHERE pt.name = 'MSISDN'
  AND pt.isActive = 1
  AND oracleEndpoint.isActive = 1
  AND et.isActive = 1;
```

**Step 2 · Call the oracle.** The oracle (for example, als-msisdn-oracle-svc) looks the number up in its own database.

**Request:** `GET /participants/MSISDN/255700000111`

Headers:

```json
{
  "Content-Type": "application/vnd.interoperability.participants+json;version=2.0",
  "Accept": "application/vnd.interoperability.participants+json;version=2",
  "Date": "Thu, 15 Oct 2026 09:30:00 GMT",
  "FSPIOP-Source": "pinebank"
}
```

The oracle API is synchronous:

**Response:** `200 OK`

Headers:

```json
{
  "Content-Type": "application/json"
}
```

Body:

```json
{
  "partyList": [
    { "fspId": "riverwallet" }
  ]
}
```

An empty `partyList` ends discovery with error `3204` (party not found) to pinebank.

Participant checks in ALS (`validateRequester` at H2, and the checks at H4 and H6) do not query a database directly. They go through the central-ledger admin API, which runs the queries shown in [Participant and endpoint lookups](./README.md#participant-and-endpoint-lookups).

## H4 · ALS → riverwallet SDK

**Inside ALS** (`GetPartiesService`):

1. `#filterOraclePartyList` drops entries whose sub-ID or type does not match the request.
2. `#processSingleOracleParty` validates that `riverwallet` is a participant and resolves its `FSPIOP_CALLBACK_URL_PARTIES_GET` from the endpoint cache.
3. ALS forwards the request with the original headers (`FSPIOP-Source: pinebank`) and adds `FSPIOP-Destination: riverwallet`.

**Request:** `GET /parties/MSISDN/255700000111`

Headers:

```json
{
  "Content-Type": "application/vnd.interoperability.parties+json;version=2.0",
  "Accept": "application/vnd.interoperability.parties+json;version=2",
  "Date": "Thu, 15 Oct 2026 09:30:00 GMT",
  "FSPIOP-Source": "pinebank",
  "FSPIOP-Destination": "riverwallet",
  "traceparent": "00-4bf92f3577b34da6a3ce929d0e0e4736-1a2b3c4d5e6f7081-01"
}
```

**Response:** `202 Accepted`

## H5 · riverwallet SDK → riverwallet core

**Inside the payee SDK** (`InboundTransfersModel.getParties`): the SDK calls its backend API and maps the answer to an FSPIOP `party` object.

**Request:** `GET /parties/MSISDN/255700000111`

Headers:

```json
{
  "Accept": "application/json"
}
```

**Response:** `200 OK`

Headers:

```json
{
  "Content-Type": "application/json"
}
```

Body:

```json
{
  "idType": "MSISDN",
  "idValue": "255700000111",
  "displayName": "Kofi M.",
  "firstName": "Kofi",
  "lastName": "Mensah",
  "dateOfBirth": "1988-11-03",
  "supportedCurrencies": ["USD"]
}
```

## H6 · riverwallet SDK → ALS

riverwallet answers the lookup. From here on every DFSP-authored message is JWS-signed (`JWS_SIGN=true`, the SDK default).

**Request:** `PUT /parties/MSISDN/255700000111`

Headers:

```json
{
  "Content-Type": "application/vnd.interoperability.parties+json;version=2.0",
  "Date": "Thu, 15 Oct 2026 09:30:01 GMT",
  "FSPIOP-Source": "riverwallet",
  "FSPIOP-Destination": "pinebank",
  "FSPIOP-URI": "/parties/MSISDN/255700000111",
  "FSPIOP-HTTP-Method": "PUT",
  "FSPIOP-Signature": "{\"signature\":\"…\",\"protectedHeader\":\"…\"}",
  "traceparent": "00-4bf92f3577b34da6a3ce929d0e0e4736-1a2b3c4d5e6f7081-01"
}
```

Body:

```json
{
  "party": {
    "partyIdInfo": {
      "partyIdType": "MSISDN",
      "partyIdentifier": "255700000111",
      "fspId": "riverwallet"
    },
    "name": "Kofi M.",
    "personalInfo": {
      "complexName": { "firstName": "Kofi", "lastName": "Mensah" },
      "dateOfBirth": "1988-11-03"
    },
    "supportedCurrencies": ["USD"]
  }
}
```

**Response:** `200 OK`

**Inside ALS** (`PutPartiesService`): ingress plugins; validate the source participant; resolve `pinebank`'s `FSPIOP_CALLBACK_URL_PARTIES_PUT`.

## H7 · ALS → pinebank SDK

ALS forwards the `PUT /parties` body and headers unchanged, including riverwallet's `FSPIOP-Signature`. The request is the same as H6, sent to `https://pinebank.example/fspiop/parties/MSISDN/255700000111`. pinebank's SDK answers `200 OK`.

## H8 · pinebank SDK internal

The SDK's inbound server receives the `PUT`. It validates the JWS only if `VALIDATE_INBOUND_PUT_PARTIES_JWS=true` (the default is `false`), then publishes the callback to the Redis channel the outbound model is waiting on.

The model stores `getPartiesResponse` and moves from `start` to `payeeResolved`. It then either continues (`AUTO_ACCEPT_PARTY=true`) or returns `WAITING_FOR_PARTY_ACCEPTANCE` to core banking and waits for `PUT /transfers/{ID}` with `{ "acceptParty": true }`.

### Discovery error callback

If the oracle has no entry, or the payee DFSP answers with an error, the payer receives an error callback instead of H7:

**Request:** `PUT /parties/MSISDN/255700000111/error`

Headers:

```json
{
  "Content-Type": "application/vnd.interoperability.parties+json;version=2.0",
  "Date": "Thu, 15 Oct 2026 09:30:01 GMT",
  "FSPIOP-Source": "Hub",
  "FSPIOP-Destination": "pinebank"
}
```

Body:

```json
{
  "errorInformation": {
    "errorCode": "3204",
    "errorDescription": "Party not found"
  }
}
```

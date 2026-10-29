# Phase 2 · Quote (H9–H15)

The payer DFSP asks the payee DFSP for terms. The payee DFSP answers with the amounts and fees, and seals them with an ILP packet and a **condition**: the SHA-256 hash of a secret **fulfilment** that only the payee DFSP knows. The transfer in Phase 3 will be locked to that condition.

**Datastores touched:** `central_ledger` participant and endpoint tables (read by quoting-service), quote tables only when `SIMPLE_ROUTING_MODE=false`, and SDK Redis on both sides. The ledger's position is not touched.

## H9 · pinebank SDK → quoting-service API

Built by `OutboundTransfersModel._buildQuoteRequest`. `transactionId` is the `transferId` created at H1.

**Request:** `POST /quotes`

Headers:

```json
{
  "Content-Type": "application/vnd.interoperability.quotes+json;version=2.0",
  "Accept": "application/vnd.interoperability.quotes+json;version=2",
  "Date": "Thu, 15 Oct 2026 09:30:02 GMT",
  "FSPIOP-Source": "pinebank",
  "FSPIOP-Destination": "riverwallet",
  "FSPIOP-URI": "/quotes",
  "FSPIOP-HTTP-Method": "POST",
  "FSPIOP-Signature": "{\"signature\":\"…\",\"protectedHeader\":\"…\"}",
  "traceparent": "00-4bf92f3577b34da6a3ce929d0e0e4736-2b3c4d5e6f708192-01"
}
```

Body:

```json
{
  "quoteId": "01JBVM13SQYP507JB1DYBZVCMF",
  "transactionId": "01JBVM16V1SZQX8B0JZ2N4ZDE4",
  "payee": {
    "partyIdInfo": { "partyIdType": "MSISDN", "partyIdentifier": "255700000111", "fspId": "riverwallet" }
  },
  "payer": {
    "partyIdInfo": { "partyIdType": "MSISDN", "partyIdentifier": "255700000999", "fspId": "pinebank" },
    "name": "Amara N.",
    "personalInfo": {
      "complexName": { "firstName": "Amara", "lastName": "Nkosi" },
      "dateOfBirth": "1990-04-12"
    }
  },
  "amountType": "SEND",
  "amount": { "amount": "50.00", "currency": "USD" },
  "transactionType": {
    "scenario": "TRANSFER",
    "initiator": "PAYER",
    "initiatorType": "CONSUMER"
  },
  "note": "Rent share",
  "expiration": "2026-10-15T09:30:22.000Z"
}
```

**Response:** `202 Accepted`

**Inside the quoting-service API** (`src/api/quotes.js` `post`): ingress plugins; build an envelope with the headers, payload and original bytes; produce → H10; return `202`.

## H10 · Kafka `topic-quotes-post`

Consumed by group `group-quotes-handler-post`. The envelope carries the H9 headers and the original request bytes, with `metadata.event = { type: "quote", action: "post" }`.

## H11 · quoting handler → riverwallet SDK

**Inside the quoting handler** (`src/model/quotes.js` `handleQuoteRequest`):

The SQL is direct SQL on `central_ledger`. Each result is cached in memory for 60 s, so it runs only on a cache miss.

**Step 1 · `validateQuoteRequest`.** The payee `riverwallet` must have an active POSITION account in USD (or, if `payer.supportedCurrencies` is set, the payer must have one per currency):

```sql
SELECT participant.*,
       participantCurrency.participantCurrencyId,
       participantCurrency.currencyId
FROM participant
INNER JOIN participantCurrency ON participantCurrency.participantId = participant.participantId
WHERE participant.name = 'riverwallet'
  AND participantCurrency.currencyId = 'USD'
  AND participantCurrency.ledgerAccountTypeId = 1      -- POSITION
  AND participantCurrency.isActive = true
  AND participant.isActive = true;
```

With `SIMPLE_ROUTING_MODE=true`, the same query also runs for `payer.partyIdInfo.fspId` and `payee.partyIdInfo.fspId` when they differ from `FSPIOP-Source` and `FSPIOP-Destination`. In this example they match, so those checks are skipped.

**Step 2 · `executeRules`.** The scheme rules engine may rewrite or reject the request. No database access.

**Step 3 · Persist (only when `SIMPLE_ROUTING_MODE=false`).** `checkDuplicateQuoteRequest`, enum lookups, then one transaction inserting `quoteDuplicateCheck`, `transactionReference`, `quote`, `quoteParty` (×2) and, if present, `quoteExtension` and `geoCode`. Skipped by default: the hub validates and routes quotes but does not store them.

**Step 4 · `forwardQuoteRequest`.** Resolve riverwallet's `FSPIOP_CALLBACK_URL_QUOTES` and send `POST {endpoint}/quotes` with the original body and headers:

```sql
SELECT participantEndpoint.value
FROM participantEndpoint
INNER JOIN participant  ON participant.participantId   = participantEndpoint.participantId
INNER JOIN endpointType ON endpointType.endpointTypeId = participantEndpoint.endpointTypeId
WHERE participant.name = 'riverwallet'
  AND endpointType.name = 'FSPIOP_CALLBACK_URL_QUOTES'
  AND participantEndpoint.isActive = 1;
```

**Step 5 · Commit the Kafka offset.** No database access.

The forwarded request is H9 unchanged (same body, same headers, same pinebank signature), sent to `https://riverwallet.example/fspiop/quotes`. riverwallet's SDK answers `202 Accepted`.

## H12 · riverwallet SDK → riverwallet core

**Inside the payee SDK** (`InboundTransfersModel.quoteRequest`):

1. Validate the inbound JWS (`VALIDATE_INBOUND_JWS=true` by default) against pinebank's public key.
2. Ask the backend for terms (request and response below).
3. Build the ILP material from the request and the backend's terms (see below).
4. Save `{ request, mojaloopResponse, fulfilment }` in SDK Redis under the quote and transaction ID, for use at H23.

The backend request and response:

**Request:** `POST /quoterequests`

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
  "quoteId": "01JBVM13SQYP507JB1DYBZVCMF",
  "transactionId": "01JBVM16V1SZQX8B0JZ2N4ZDE4",
  "to": { "idType": "MSISDN", "idValue": "255700000111", "fspId": "riverwallet" },
  "from": {
    "idType": "MSISDN",
    "idValue": "255700000999",
    "fspId": "pinebank",
    "displayName": "Amara N.",
    "firstName": "Amara",
    "lastName": "Nkosi",
    "dateOfBirth": "1990-04-12"
  },
  "amountType": "SEND",
  "amount": "50.00",
  "currency": "USD",
  "transactionType": "TRANSFER",
  "initiator": "PAYER",
  "initiatorType": "CONSUMER",
  "note": "Rent share",
  "expiration": "2026-10-15T09:30:22.000Z"
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
  "quoteId": "01JBVM13SQYP507JB1DYBZVCMF",
  "transactionId": "01JBVM16V1SZQX8B0JZ2N4ZDE4",
  "transferAmount": "50.00",
  "transferAmountCurrency": "USD",
  "payeeReceiveAmount": "50.00",
  "payeeReceiveAmountCurrency": "USD",
  "payeeFspFeeAmount": "0",
  "payeeFspFeeAmountCurrency": "USD",
  "expiration": "2026-10-15T09:30:22.000Z"
}
```

The ILP material (sdk-standard-components `src/lib/ilp/IlpV4.js`):

```text
transactionObject = { transactionId, quoteId, payee, payer, amount, transactionType, … }
ilpPacket  = ILP v4 Prepare { amount (minor units), destination (ILP address), expiresAt, data: transactionObject }
fulfilment = HMAC-SHA256(key = ILP secret, msg = base64(transactionObject))     # 32 bytes, kept secret
condition  = base64url(SHA-256(fulfilment))                                    # published
```

## H13 · riverwallet SDK → quoting-service API

**Request:** `PUT /quotes/01JBVM13SQYP507JB1DYBZVCMF`

Headers:

```json
{
  "Content-Type": "application/vnd.interoperability.quotes+json;version=2.0",
  "Date": "Thu, 15 Oct 2026 09:30:03 GMT",
  "FSPIOP-Source": "riverwallet",
  "FSPIOP-Destination": "pinebank",
  "FSPIOP-URI": "/quotes/01JBVM13SQYP507JB1DYBZVCMF",
  "FSPIOP-HTTP-Method": "PUT",
  "FSPIOP-Signature": "{\"signature\":\"…\",\"protectedHeader\":\"…\"}",
  "traceparent": "00-4bf92f3577b34da6a3ce929d0e0e4736-3c4d5e6f708192a3-01"
}
```

Body:

```json
{
  "transferAmount": { "amount": "50.00", "currency": "USD" },
  "payeeReceiveAmount": { "amount": "50.00", "currency": "USD" },
  "payeeFspFee": { "amount": "0", "currency": "USD" },
  "expiration": "2026-10-15T09:30:22.000Z",
  "ilpPacket": "DIICtgAAAAAAABOIMjAyNjEwMTUwOTMwMjIwMDBaHpSoVzas3jljddyOns0px…",
  "condition": "HpSoVzas3jljddyOns0pxImmOgXR2GlQPAmm66TKLbc"
}
```

**Response:** `200 OK`

The API runs the ingress plugins, produces → H14 and returns `200`.

## H14 · Kafka `topic-quotes-put`

Consumed by group `group-quotes-handler-put`, with `metadata.event = { type: "quote", action: "put" }`.

## H15 · quoting handler → pinebank SDK

**Inside the quoting handler** (`handleQuoteUpdate`). The SQL runs only on a cache miss.

**Step 1 · `validateQuoteUpdate`.** The sender (`FSPIOP-Source: riverwallet`) must have an active POSITION account in the payee currency:

```sql
SELECT participant.*,
       participantCurrency.participantCurrencyId,
       participantCurrency.currencyId
FROM participant
INNER JOIN participantCurrency ON participantCurrency.participantId = participant.participantId
WHERE participant.name = 'riverwallet'
  AND participantCurrency.currencyId = 'USD'
  AND participantCurrency.ledgerAccountTypeId = 1      -- POSITION
  AND participantCurrency.isActive = true
  AND participant.isActive = true;
```

**Step 2 · Persist (only when `SIMPLE_ROUTING_MODE=false`).** `checkDuplicateQuoteResponse` and `createQuoteResponse` (plus an ILP packet row). Skipped by default.

**Step 3 · `forwardQuoteUpdate`.** Resolve pinebank's `FSPIOP_CALLBACK_URL_QUOTES` and forward the `PUT` with the original bytes. The request is H13 unchanged, sent to `https://pinebank.example/fspiop/quotes/01JBVM13SQYP507JB1DYBZVCMF`.

```sql
SELECT participantEndpoint.value
FROM participantEndpoint
INNER JOIN participant  ON participant.participantId   = participantEndpoint.participantId
INNER JOIN endpointType ON endpointType.endpointTypeId = participantEndpoint.endpointTypeId
WHERE participant.name = 'pinebank'
  AND endpointType.name = 'FSPIOP_CALLBACK_URL_QUOTES'
  AND participantEndpoint.isActive = 1;
```

The payer SDK's inbound server validates the JWS and publishes the callback to the waiting model. The model stores `quoteResponse` (including `condition`), moves to `quoteReceived`, and either continues (`AUTO_ACCEPT_QUOTES=true`) or returns `WAITING_FOR_QUOTE_ACCEPTANCE` to core banking.

### Quote error callback

If the payee DFSP declines (for example, its backend rejects the quote), it sends an error instead of H13, and the hub forwards it to pinebank unchanged. Nothing has been reserved.

**Request:** `PUT /quotes/01JBVM13SQYP507JB1DYBZVCMF/error`

Headers:

```json
{
  "Content-Type": "application/vnd.interoperability.quotes+json;version=2.0",
  "Date": "Thu, 15 Oct 2026 09:30:03 GMT",
  "FSPIOP-Source": "riverwallet",
  "FSPIOP-Destination": "pinebank",
  "FSPIOP-Signature": "{\"signature\":\"…\",\"protectedHeader\":\"…\"}"
}
```

Body:

```json
{
  "errorInformation": {
    "errorCode": "5101",
    "errorDescription": "Payee rejected quote"
  }
}
```

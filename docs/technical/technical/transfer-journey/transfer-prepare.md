# Phase 3 · Transfer Prepare (H16–H23)

The payer DFSP sends the transfer instruction, locked to the quote's condition. The hub validates and records it, reserves the amount against the payer's position, and forwards the original signed instruction to the payee DFSP.

## H16 · pinebank SDK → ml-api-adapter API

Built by `OutboundTransfersModel._buildTransferPrepare`. The amount, `ilpPacket` and `condition` come from the quote response (H15). `expiration` is now + `EXPIRY_SECONDS` (default 20 s).

**Request:** `POST /transfers`

Headers:

```json
{
  "Content-Type": "application/vnd.interoperability.transfers+json;version=2.0",
  "Accept": "application/vnd.interoperability.transfers+json;version=2",
  "Date": "Thu, 15 Oct 2026 09:30:05 GMT",
  "FSPIOP-Source": "pinebank",
  "FSPIOP-Destination": "riverwallet",
  "FSPIOP-URI": "/transfers",
  "FSPIOP-HTTP-Method": "POST",
  "FSPIOP-Signature": "{\"signature\":\"Rk9yWmV4YW1wbGVPbmx5…\",\"protectedHeader\":\"eyJhbGciOiJSUzI1NiIsIkZTUElPUC1VUkkiOiIvdHJhbnNmZXJzIiwiRlNQSU9QLUhUVFAtTWV0aG9kIjoiUE9TVCIsIkZTUElPUC1Tb3VyY2UiOiJwaW5lYmFuayIsIkZTUElPUC1EZXN0aW5hdGlvbiI6InJpdmVyd2FsbGV0IiwiRGF0ZSI6IlRodSwgMTUgT2N0IDIwMjYgMDk6MzA6MDUgR01UIn0\"}",
  "traceparent": "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01"
}
```

Body:

```json
{
  "transferId": "01JBVM16V1SZQX8B0JZ2N4ZDE4",
  "payerFsp": "pinebank",
  "payeeFsp": "riverwallet",
  "amount": { "amount": "50.00", "currency": "USD" },
  "ilpPacket": "DIICtgAAAAAAABOIMjAyNjEwMTUwOTMwMjIwMDBaHpSoVzas3jljddyOns0px…",
  "condition": "HpSoVzas3jljddyOns0pxImmOgXR2GlQPAmm66TKLbc",
  "expiration": "2026-10-15T09:30:25.000Z"
}
```

The `protectedHeader` decodes to:

```json
{
  "alg": "RS256",
  "FSPIOP-URI": "/transfers",
  "FSPIOP-HTTP-Method": "POST",
  "FSPIOP-Source": "pinebank",
  "FSPIOP-Destination": "riverwallet",
  "Date": "Thu, 15 Oct 2026 09:30:05 GMT"
}
```

**Response:** `202 Accepted`

**Inside ml-api-adapter API** (`src/api/transfers/handler.js` `create`):

| # | Step | Touches |
|---|---|---|
| 1 | Ingress plugins. If `JWS_VALIDATE=true`, verify `FSPIOP-Signature` against pinebank's public key (3105 on failure). | — |
| 2 | Keep the original bytes: inline in `context.originalRequestPayload`, or `SET` in Redis when the payload cache is configured. | (Redis) |
| 3 | `tracestate.timeApiPrepare = now`. | — |
| 4 | `dto.prepareMessageDto` builds the envelope: `from: pinebank`, `to: riverwallet`, `metadata.event = { type: prepare, action: prepare }`, `content.payload = dataUri`. | — |
| 5 | Produce to `topic-transfer-prepare` (no key). Metric `ml_transfer_prepare`. | Kafka |
| 6 | Return `202`. Nothing in the ledger has changed yet. | — |

## H17 · Kafka `topic-transfer-prepare`

Consumed by `cl-group-transfer-prepare` (the central-ledger prepare handler, `batchSize: 1`). The full message is shown in [Hub Kafka handlers](./README.md#hub-kafka-handlers).

| Field | Value |
|---|---|
| Key | none |
| `from` / `to` | `pinebank` / `riverwallet` |
| `metadata.event` | `{ "type": "prepare", "action": "prepare" }` |

## H18 · central-ledger prepare handler

`src/handlers/transfers/prepare.js` `prepare()`:

The SQL under each step assumes `CACHE.CACHE_ENABLED=false` (the default).

**Step 1 · `dto.prepareInputDto`.** Decode the envelope and payload; open the child trace span `cl_transfer_prepare`. No database access.

**Step 2 · `calculateProxyObligation`.** With `PROXY_CACHE.enabled=true` (the default in `config/default.json`), `getFSPProxy` confirms both DFSPs are in the scheme, and that the payee has an active USD POSITION account. Both are local participants, so no proxy is used and the payload clone is unchanged. The two lookups run in parallel; each is a domain `getByName` (participant, then its accounts):

```sql
-- getFSPProxy('pinebank') and getFSPProxy('riverwallet'): each runs both statements
SELECT * FROM participant ORDER BY name ASC;
SELECT * FROM participantCurrency ORDER BY participantCurrencyId ASC;
```

**Step 3 · `checkDuplication`.** `duplicateCheckComparator(transferId, payload)` takes the SHA-256 of the payload and reads `transferDuplicateCheck` by `transferId`. There is no row, so this is the first time the ID is seen and the hash is stored:

```sql
SELECT * FROM transferDuplicateCheck WHERE transferId = '01JBVM16V1SZQX8B0JZ2N4ZDE4';

INSERT INTO transferDuplicateCheck (hash, transferId)
VALUES ('<sha256 of payload>', '01JBVM16V1SZQX8B0JZ2N4ZDE4');
```

**Step 4 · `checkIfDeterminingTransferExists`.** Look for linked FX transfers on the watch list; there are none:

```sql
SELECT * FROM fxWatchList WHERE determiningTransferId = '01JBVM16V1SZQX8B0JZ2N4ZDE4';
```

**Step 5 · `Validator.validatePrepare`.** `FSPIOP-Source` = `payerFsp`; amount scale and precision; `pinebank` and `riverwallet` exist and are active; condition present and a valid crypto-condition; `expiration` present and in the future; payer ≠ payee; and the payer has a USD POSITION account:

```sql
-- validateParticipantByName('pinebank') and validateParticipantByName('riverwallet'): each runs both
SELECT * FROM participant ORDER BY name ASC;
SELECT * FROM participantCurrency ORDER BY participantCurrencyId ASC;

-- validatePositionAccountByNameAndCurrency('pinebank', 'USD')
SELECT participant.*, pc.participantCurrencyId, pc.currencyId, pc.isActive AS currencyIsActive
FROM participant
INNER JOIN participantCurrency AS pc ON pc.participantId = participant.participantId
WHERE participant.name = 'pinebank'
  AND pc.currencyId = 'USD'
  AND pc.ledgerAccountTypeId = 1          -- POSITION
LIMIT 1;
```

**Step 6 · `savePreparedRequest` → `TransferFacade.saveTransferPrepared`.** Resolve the participant ids and the payer's account, then insert the transfer in one transaction:

```sql
-- participantCached.getByName for riverwallet, then pinebank
SELECT * FROM participant ORDER BY name ASC;              -- ×2

-- payer position account (pinebank is in participantCurrencyValidationList)
SELECT participant.*, pc.participantCurrencyId, pc.currencyId, pc.isActive AS currencyIsActive
FROM participant
INNER JOIN participantCurrency AS pc ON pc.participantId = participant.participantId
WHERE participant.name = 'pinebank'
  AND pc.currencyId = 'USD'
  AND pc.ledgerAccountTypeId = 1          -- POSITION
LIMIT 1;

BEGIN;
INSERT INTO transfer (amount, currencyId, expirationDate, ilpCondition, transferId)
VALUES ('50.00', 'USD', '2026-10-15 09:30:25.000',
        'HpSoVzas3jljddyOns0pxImmOgXR2GlQPAmm66TKLbc', '01JBVM16V1SZQX8B0JZ2N4ZDE4');
INSERT INTO transferParticipant
  (amount, ledgerEntryTypeId, participantCurrencyId, participantId, transferId, transferParticipantRoleTypeId)
VALUES ('50.00', 1, 3, 2, '01JBVM16V1SZQX8B0JZ2N4ZDE4', 1);     -- payer: PRINCIPLE_VALUE, PAYER_DFSP
INSERT INTO transferParticipant
  (amount, ledgerEntryTypeId, participantCurrencyId, participantId, transferId, transferParticipantRoleTypeId)
VALUES (-50, 1, NULL, 3, '01JBVM16V1SZQX8B0JZ2N4ZDE4', 2);       -- payee: PRINCIPLE_VALUE, PAYEE_DFSP
INSERT INTO ilpPacket (transferId, value)
VALUES ('01JBVM16V1SZQX8B0JZ2N4ZDE4', 'DIICtgAAAAAAABOI…');
INSERT INTO transferStateChange (createdDate, reason, transferId, transferStateId)
VALUES ('2026-10-15 09:30:05.140', NULL, '01JBVM16V1SZQX8B0JZ2N4ZDE4', 'RECEIVED_PREPARE');
COMMIT;
```

The payee's `transferParticipant.participantCurrencyId` is `NULL`: its account is resolved only when `PAYEE_PARTICIPANT_CURRENCY_VALIDATION_ENABLED=true` (the default is `false`).

**Step 7 · `definePositionParticipant`.** The payer's position is the one that moves. `Participant.getAccountByNameAndCurrency('pinebank','USD',POSITION)` returns its `participantCurrencyId`, which becomes the **message key**:

```sql
SELECT participant.*, pc.participantCurrencyId, pc.currencyId, pc.isActive AS currencyIsActive
FROM participant
INNER JOIN participantCurrency AS pc ON pc.participantId = participant.participantId
WHERE participant.name = 'pinebank'
  AND pc.currencyId = 'USD'
  AND pc.ledgerAccountTypeId = 1          -- POSITION
LIMIT 1;                                 -- participantCurrencyId 3 → Kafka key '3'
```

**Step 8 · `Kafka.proceed`.** Commit the consumed offset, then produce to the position topic with `event = { type: position, action: prepare }` and `key = 3`. Metric `transfer_prepare`. No database access.

In total the prepare stage runs six full reads of `participant`, four of `participantCurrency` and three account lookups; only the five inserts in step 6 are in a transaction. With `CACHE.CACHE_ENABLED=true` the full-table reads are served from memory.

If step 5 fails, step 6 stores the rows with state `INVALID` and the reasons (outside a transaction), logs a `transferError` row, and sends a failure event (3100) to `topic-notification-event` addressed to pinebank. pinebank then receives:

**Request:** `PUT /transfers/01JBVM16V1SZQX8B0JZ2N4ZDE4/error`

Headers:

```json
{
  "Content-Type": "application/vnd.interoperability.transfers+json;version=2.0",
  "Date": "Thu, 15 Oct 2026 09:30:05 GMT",
  "FSPIOP-Source": "Hub",
  "FSPIOP-Destination": "pinebank",
  "FSPIOP-URI": "/transfers/01JBVM16V1SZQX8B0JZ2N4ZDE4/error",
  "FSPIOP-HTTP-Method": "PUT",
  "FSPIOP-Signature": "{\"signature\":\"…\",\"protectedHeader\":\"…\"}"
}
```

Body:

```json
{
  "errorInformation": {
    "errorCode": "3100",
    "errorDescription": "Generic validation error - Expiration date 2026-10-15T09:30:25.000Z is already in the past"
  }
}
```

The hub signs this error only when `JWS_SIGN=true` in ml-api-adapter.

## H19 · Kafka `topic-transfer-position-batch`

| Field | Value |
|---|---|
| Key | `3` (pinebank's USD POSITION `participantCurrencyId`) |
| `from` / `to` | `pinebank` / `riverwallet` |
| `metadata.event` | `{ "type": "position", "action": "prepare" }` |
| `content` | Unchanged from H17 (original headers, payload, context) |

Because the key is pinebank's USD position account, every movement on that account hashes to the same partition. It is consumed in order by one consumer in `cl-group-transfer-position-batch`.

## H20 · central-ledger position-batch handler (reserve)

`src/handlers/positions/handlerBatch.js` → `src/domain/position/binProcessor.js`:

The SQL under each step is for a batch that holds only this prepare (one account bin, key `3`). With a full batch, each read covers every transfer and account in the batch through one `IN (…)` list, and the writes run once per account bin as multi-row inserts.

**Step 1 · Poll and bin.** Poll up to `batchSize` (default 10) messages. Sort them into bins, `bins[messageKey][action]`, and track the last offset per partition. No database access.

**Step 2 · `startDbTransaction()`.**

```sql
BEGIN;
```

**Step 3 · Latest transfer states.** Read the state changes for every transfer in the batch; the newest row per `transferId` is kept in memory. The FX equivalent still runs, with an empty id list:

```sql
SELECT * FROM transferStateChange
WHERE transferStateChange.transferId IN ('01JBVM16V1SZQX8B0JZ2N4ZDE4')
ORDER BY transferStateChangeId DESC;

SELECT * FROM fxTransferStateChange WHERE 1 = 0 ORDER BY fxTransferStateChangeId DESC;
```

**Step 4 · Account and settlement-model mappings.** Find each position account's participant, currency and settlement account:

```sql
SELECT * FROM participantCurrency;                  -- in trx: getParticipantCurrencyByIds
SELECT * FROM settlementModel WHERE isActive = 1;   -- outside trx: SettlementModelCached.getAll
SELECT * FROM participantCurrency;                  -- in trx: getParticipantCurrencyByParticipantIds
```

**Step 5 · Lock the positions.** `getPositionsByAccountIdsForUpdate` locks the POSITION and SETTLEMENT rows of every account involved. **The row locks are held until step 11**, so batches touching the same DFSP serialise here. The batch's payee amounts and FX reservations are read at the same point (the payee amounts are used by commit bins but read for every batch):

```sql
SELECT * FROM participantPosition
WHERE participantCurrencyId IN ('3', 4)             -- pinebank USD POSITION, SETTLEMENT
FOR UPDATE;

SELECT transferParticipant.* FROM transferParticipant
WHERE transferParticipant.transferParticipantRoleTypeId = 2      -- PAYEE_DFSP
  AND transferParticipant.ledgerEntryTypeId = 1                  -- PRINCIPLE_VALUE
  AND transferParticipant.transferId IN ('01JBVM16V1SZQX8B0JZ2N4ZDE4');

SELECT ppc.*, fxTransferStateChange.commitRequestId AS commitRequestId
FROM fxTransferStateChange
LEFT JOIN participantPositionChange AS ppc
  ON ppc.fxTransferStateChangeId = fxTransferStateChange.fxTransferStateChangeId
WHERE 1 = 0 AND fxTransferStateChange.transferStateId = 'RESERVED';
```

**Step 6 · Net Debit Cap.** Read `participantLimit` for the account:

```sql
SELECT participant.participantId AS participantId, pc.currencyId AS currencyId,
       pl.participantLimitTypeId AS participantLimitTypeId, pl.value AS value,
       pl.thresholdAlarmPercentage AS thresholdAlarmPercentage
FROM participant
INNER JOIN participantCurrency AS pc ON pc.participantId = participant.participantId
INNER JOIN participantLimit    AS pl ON pl.participantCurrencyId = pc.participantCurrencyId
WHERE participant.participantId = 2
  AND pc.currencyId = 'USD'
  AND pc.ledgerAccountTypeId = 1          -- POSITION
  AND pl.participantLimitTypeId = 1       -- NET_DEBIT_CAP
  AND participant.isActive = 1 AND pc.IsActive = 1 AND pl.isActive = 1
LIMIT 1;
```

**Step 7 · Process the bins.** For each account bin, process in order: fx-commit → fx-timeout → commit/reserve → abort → fx-abort → timeout-reserved → **prepare** → fx-prepare. Releases are applied before new reservations, against one running position. In memory.

**Step 8 · `processPositionPrepareBin`.** The reservation check for this transfer, with pinebank's balances before it, runs in memory:

```text
effective        = position + reservedValue                 # 1,200.00
liquidityCover   = −(settlement account position)           # 10,000.00
availableByCover = liquidityCover − effective                # 8,800.00
availableByLimit = netDebitCap − effective                   # 8,000 − 1,200 = 6,800.00

latest state ≠ RECEIVED_PREPARE   → ABORTED_REJECTED, 2001
50.00 > availableByCover          → ABORTED_REJECTED, 4001
50.00 > availableByLimit          → ABORTED_REJECTED, 4200
otherwise                         → RESERVED, position = 1,250.00
position > liquidityCover × thresholdAlarmPercentage → limit alarm
```

**Step 9 · Write the results.** `updateParticipantPosition`, `bulkInsertTransferStateChanges` (`RESERVED`), a re-read to get the new `transferStateChangeId` (102), then `bulkInsertParticipantPositionChanges`:

```sql
UPDATE participantPosition
SET value = 1250, reservedValue = 0, changedDate = '2026-10-15 09:30:05.210'
WHERE participantPositionId = 3;

INSERT INTO transferStateChange (createdDate, reason, transferId, transferStateId)
VALUES ('2026-10-15 09:30:05.205', NULL, '01JBVM16V1SZQX8B0JZ2N4ZDE4', 'RESERVED');

SELECT * FROM transferStateChange
WHERE transferStateChange.transferId IN ('01JBVM16V1SZQX8B0JZ2N4ZDE4')
ORDER BY transferStateChangeId DESC;
SELECT * FROM fxTransferStateChange WHERE 1 = 0 ORDER BY fxTransferStateChangeId DESC;

INSERT INTO participantPositionChange
  (change, createdDate, participantCurrencyId, participantPositionId, reservedValue, transferStateChangeId, value)
VALUES (50, '2026-10-15 09:30:05.205', '3', 3, 0, 102, 1250);
```

**Step 10 · Commit offsets.** Commit the last offset per partition (`Kafka.proceed` with `consumerCommit`) while the transaction is still open. No database access.

**Step 11 · `trx.commit()`.** The row locks are released:

```sql
COMMIT;
```

**Step 12 · Notify.** For each transfer, produce to `topic-notification-event` with `action: prepare`, status success, `from: pinebank`, `to: riverwallet`, and the original content and context. No database access.

On any exception the transaction is rolled back. Offsets already committed in step 10 are not rewound (see [Delivery semantics](./reference.md#delivery-semantics-timeouts-and-recovery)).

## H21 · Kafka `topic-notification-event`

Consumed by `ml-group-notification-event` (the ml-api-adapter notification handler).

| Field | Value |
|---|---|
| Key | none |
| `from` / `to` | `pinebank` / `riverwallet` |
| `metadata.event` | `{ "type": "notification", "action": "prepare", "state": { "status": "success", "code": 0 } }` |
| `content` | Original headers and payload from H16 |

## H22 · notification handler → riverwallet SDK

`src/handlers/notification/index.js` `consumeMessage` → `processMessage`:

| # | Step | Touches |
|---|---|---|
| 1 | Decode the envelope. Recover the original bytes from `context.originalRequestPayload`, or with a Redis `GET` by `originalRequestId`. | (Redis) |
| 2 | Action `prepare` with status success means this is the forward to the payee. | — |
| 3 | Resolve riverwallet's `FSPIOP_CALLBACK_URL_TRANSFER_POST` from the endpoint cache (on a miss, from the central-ledger admin API). | cache / HTTP |
| 4 | `createCallbackHeaders`: copy the original FSPIOP headers, including pinebank's `FSPIOP-Signature`, `FSPIOP-URI` and `FSPIOP-HTTP-Method`. | — |
| 5 | `Callback.sendRequest` `POST /transfers` with the **original bytes** and no hub signature, timeout `HTTP_REQUEST_TIMEOUT_MS` (default 20 s). Timed by `notification_event_delivery`. | HTTP |
| 6 | Record `tx_transfer_prepare` (now − `timeApiPrepare`); commit the offset. | Kafka |

The request riverwallet receives at `https://riverwallet.example/fspiop/transfers` has exactly H16's body and FSPIOP headers, so riverwallet can verify pinebank's signature end to end:

**Request:** `POST /transfers`

Headers:

```json
{
  "Content-Type": "application/vnd.interoperability.transfers+json;version=2.0",
  "Date": "Thu, 15 Oct 2026 09:30:05 GMT",
  "FSPIOP-Source": "pinebank",
  "FSPIOP-Destination": "riverwallet",
  "FSPIOP-URI": "/transfers",
  "FSPIOP-HTTP-Method": "POST",
  "FSPIOP-Signature": "{\"signature\":\"Rk9yWmV4YW1wbGVPbmx5…\",\"protectedHeader\":\"eyJhbGciOiJSUzI1NiIsIkZTUElPUC1VUkkiOiIvdHJhbnNmZXJzIiwi…\"}",
  "traceparent": "00-4bf92f3577b34da6a3ce929d0e0e4736-4d5e6f708192a3b4-01"
}
```

Body:

```json
{
  "transferId": "01JBVM16V1SZQX8B0JZ2N4ZDE4",
  "payerFsp": "pinebank",
  "payeeFsp": "riverwallet",
  "amount": { "amount": "50.00", "currency": "USD" },
  "ilpPacket": "DIICtgAAAAAAABOIMjAyNjEwMTUwOTMwMjIwMDBaHpSoVzas3jljddyOns0px…",
  "condition": "HpSoVzas3jljddyOns0pxImmOgXR2GlQPAmm66TKLbc",
  "expiration": "2026-10-15T09:30:25.000Z"
}
```

**Response:** `202 Accepted`

A failed delivery is logged and not retried. The transfer stays `RESERVED` until the payee responds or the timeout handler expires it.

## H23 · riverwallet SDK → riverwallet core

**Inside the payee SDK** (`InboundTransfersModel.prepareTransfer`):

| # | Step | Touches |
|---|---|---|
| 1 | Inbound JWS validation (`VALIDATE_INBOUND_JWS`, on by default): the key is looked up by `FSPIOP-Source` (pinebank); the protected header's `FSPIOP-URI` and method must match the request. | — |
| 2 | Load the quote saved at H12 by `transferId` (or by the ILP packet's `transactionId`). If there is none and `ALLOW_TRANSFER_WITHOUT_QUOTE=false`, return an error. | SDK Redis |
| 3 | `CHECK_ILP`: the incoming `condition` must equal the quote's. | — |
| 4 | `REJECT_TRANSFERS_ON_EXPIRED_QUOTES`: if the quote has expired, send `PUT /transfers/{ID}/error` with 3302. | — |
| 5 | Save state `PREPARE_RECEIVED`. | SDK Redis |
| 6 | Backend `POST /transfers`: the core system books the credit to the payee (request below). | HTTP |
| 7 | Take `fulfilment` from the saved quote and build the response → H24. | — |

The backend request carries the transfer, the agreed quote and the decoded ILP transaction object:

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
  "transferId": "01JBVM16V1SZQX8B0JZ2N4ZDE4",
  "from": { "idType": "MSISDN", "idValue": "255700000999", "fspId": "pinebank", "displayName": "Amara N." },
  "to": { "idType": "MSISDN", "idValue": "255700000111", "fspId": "riverwallet" },
  "amountType": "SEND",
  "currency": "USD",
  "amount": "50.00",
  "transactionType": "TRANSFER",
  "note": "Rent share",
  "quote": {
    "quoteId": "01JBVM13SQYP507JB1DYBZVCMF",
    "transactionId": "01JBVM16V1SZQX8B0JZ2N4ZDE4",
    "transferAmount": "50.00",
    "transferAmountCurrency": "USD",
    "payeeReceiveAmount": "50.00",
    "payeeReceiveAmountCurrency": "USD",
    "payeeFspFeeAmount": "0",
    "payeeFspFeeAmountCurrency": "USD",
    "expiration": "2026-10-15T09:30:22.000Z"
  },
  "ilpPacket": {
    "data": {
      "transactionId": "01JBVM16V1SZQX8B0JZ2N4ZDE4",
      "quoteId": "01JBVM13SQYP507JB1DYBZVCMF",
      "payee": { "partyIdInfo": { "partyIdType": "MSISDN", "partyIdentifier": "255700000111", "fspId": "riverwallet" } },
      "payer": { "partyIdInfo": { "partyIdType": "MSISDN", "partyIdentifier": "255700000999", "fspId": "pinebank" } },
      "amount": { "amount": "50.00", "currency": "USD" },
      "transactionType": { "scenario": "TRANSFER", "initiator": "PAYER", "initiatorType": "CONSUMER" }
    }
  }
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
  "homeTransactionId": "rw-20261015-004411",
  "transferState": "COMMITTED"
}
```

If the backend rejects the credit, the payee SDK sends `PUT /transfers/01JBVM16V1SZQX8B0JZ2N4ZDE4/error` with `5104` (payee rejected transaction) instead of H24. The hub then aborts the transfer and releases the reservation (`ABORTED_ERROR`).

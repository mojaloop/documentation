# Phase 3 · Transfer Fulfil and Commit (H24–H31)

The payee DFSP accepts the transfer by revealing the fulfilment. The hub checks that the fulfilment opens the condition, commits the transfer against the payee's position, and tells both DFSPs the outcome.

## H24 · riverwallet SDK → ml-api-adapter API

**Request:** `PUT /transfers/01JBVM16V1SZQX8B0JZ2N4ZDE4`

Headers:

```json
{
  "Content-Type": "application/vnd.interoperability.transfers+json;version=2.0",
  "Date": "Thu, 15 Oct 2026 09:30:06 GMT",
  "FSPIOP-Source": "riverwallet",
  "FSPIOP-Destination": "pinebank",
  "FSPIOP-URI": "/transfers/01JBVM16V1SZQX8B0JZ2N4ZDE4",
  "FSPIOP-HTTP-Method": "PUT",
  "FSPIOP-Signature": "{\"signature\":\"…\",\"protectedHeader\":\"…\"}",
  "traceparent": "00-4bf92f3577b34da6a3ce929d0e0e4736-5e6f708192a3b4c5-01"
}
```

Body:

```json
{
  "fulfilment": "ax8KPpwtT4obflw9Kp8OjXxrWk8-LRwLmo9-bVxLOik",
  "completedTimestamp": "2026-10-15T09:30:06.410Z",
  "transferState": "COMMITTED"
}
```

**Response:** `200 OK`

With `RESERVE_NOTIFICATION=true` on the payee SDK, `transferState` is `"RESERVED"` instead. The payee then waits for the hub's `PATCH` at H31 before treating the credit as final.

**Inside ml-api-adapter API** (`fulfilTransfer`): ingress plugins (and JWS validation if enabled); `tracestate.timeApiFulfil = now`; `Validator.fulfilTransfer`; keep the original bytes; produce to `topic-transfer-fulfil` with `event = { type: fulfil, action: commit }` (or `reserve`); return `200`. Metric `ml_transfer_fulfil`.

## H25 · Kafka `topic-transfer-fulfil`

Consumed by `cl-group-transfer-fulfil`.

| Field | Value |
|---|---|
| Key | none |
| `from` / `to` | `riverwallet` / `pinebank` |
| `metadata.event` | `{ "type": "fulfil", "action": "commit" }` (`"reserve"` when the payee sent `RESERVED`) |
| `content` | Original H24 headers and payload |

## H26 · central-ledger fulfil handler

`src/handlers/transfers/handler.js` `fulfil` → `processFulfilMessage`:

The SQL under each step assumes `CACHE.CACHE_ENABLED=false` (the default).

**Step 1 · Load the transfer.** `TransferService.getById` makes one joined read of `transfer`, both `transferParticipant` rows with `participant` and `participantCurrency`, `ilpPacket`, the latest `transferStateChange`, `transferFulfilment` and `transferError`; the newest state row wins. Then the transfer's extensions are read. If the transfer is missing → 2001.

```sql
SELECT transfer.*,
       transfer.currencyId            AS currency,
       pc1.participantCurrencyId      AS payerParticipantCurrencyId,
       tp1.amount                     AS payerAmount,
       da.participantId               AS payerParticipantId,
       da.name                        AS payerFsp,
       da.isProxy                     AS payerIsProxy,
       pc2.participantCurrencyId      AS payeeParticipantCurrencyId,
       tp2.amount                     AS payeeAmount,
       ca.participantId               AS payeeParticipantId,
       ca.name                        AS payeeFsp,
       ca.isProxy                     AS payeeIsProxy,
       tsc.transferStateChangeId,
       tsc.transferStateId            AS transferState,
       tsc.reason                     AS reason,
       tsc.createdDate                AS completedTimestamp,
       ts.enumeration                 AS transferStateEnumeration,
       ts.description                 AS transferStateDescription,
       ilpp.value                     AS ilpPacket,
       transfer.ilpCondition          AS `condition`,
       tf.ilpFulfilment               AS fulfilment,
       te.errorCode,
       te.errorDescription,
       ep1.name                       AS externalPayerName,
       ep2.name                       AS externalPayeeName
FROM transfer
-- payer side
INNER JOIN transferParticipant         AS tp1   ON tp1.transferId = transfer.transferId
LEFT  JOIN externalParticipant         AS ep1   ON ep1.externalParticipantId = tp1.externalParticipantId
INNER JOIN transferParticipantRoleType AS tprt1 ON tprt1.transferParticipantRoleTypeId = tp1.transferParticipantRoleTypeId
INNER JOIN participant                 AS da    ON da.participantId = tp1.participantId
LEFT  JOIN participantCurrency         AS pc1   ON pc1.participantCurrencyId = tp1.participantCurrencyId
-- payee side
INNER JOIN transferParticipant         AS tp2   ON tp2.transferId = transfer.transferId
LEFT  JOIN externalParticipant         AS ep2   ON ep2.externalParticipantId = tp2.externalParticipantId
INNER JOIN transferParticipantRoleType AS tprt2 ON tprt2.transferParticipantRoleTypeId = tp2.transferParticipantRoleTypeId
INNER JOIN participant                 AS ca    ON ca.participantId = tp2.participantId
LEFT  JOIN participantCurrency         AS pc2   ON pc2.participantCurrencyId = tp2.participantCurrencyId
-- everything else
INNER JOIN ilpPacket                   AS ilpp  ON ilpp.transferId = transfer.transferId
LEFT  JOIN transferStateChange         AS tsc   ON tsc.transferId = transfer.transferId
LEFT  JOIN transferState               AS ts    ON ts.transferStateId = tsc.transferStateId
LEFT  JOIN transferFulfilment          AS tf    ON tf.transferId = transfer.transferId
LEFT  JOIN transferError               AS te    ON te.transferId = transfer.transferId
WHERE transfer.transferId = '01JBVM16V1SZQX8B0JZ2N4ZDE4'
  AND tprt1.name = 'PAYER_DFSP'
  AND tprt2.name = 'PAYEE_DFSP'
ORDER BY tsc.transferStateChangeId DESC
LIMIT 1;

SELECT * FROM transferExtension
WHERE transferId = '01JBVM16V1SZQX8B0JZ2N4ZDE4' AND isFulfilment = false AND isError = false;
```

**Step 2 · Content-type check.** A v1.0 content type with `transferState: RESERVED` → 3100. No database access.

**Step 3 · Header binding.** `FSPIOP-Source` must equal `payeeFsp` (riverwallet) and `FSPIOP-Destination` must equal `payerFsp` (pinebank). A mismatch → `ABORT_VALIDATION`. No database access.

**Step 4 · Fulfil duplicate check.** SHA-256 of the payload against `transferFulfilmentDuplicateCheck`; the first time, insert:

```sql
SELECT * FROM transferFulfilmentDuplicateCheck WHERE transferId = '01JBVM16V1SZQX8B0JZ2N4ZDE4';

INSERT INTO transferFulfilmentDuplicateCheck (hash, transferId)
VALUES ('<sha256 of payload>', '01JBVM16V1SZQX8B0JZ2N4ZDE4');
```

**Step 5 · Event type.** The event type must be `fulfil`. No database access.

**Step 6 · `validateFulfilCondition`.** Base64url-decode the fulfilment, require 32 bytes, take the SHA-256, and compare with `transfer.ilpCondition` (loaded in step 1). A mismatch → `ABORT_VALIDATION`. With the sample values:

```text
fulfilment            = ax8KPpwtT4obflw9Kp8OjXxrWk8-LRwLmo9-bVxLOik
base64url(SHA-256(base64url-decode(fulfilment)))
                      = HpSoVzas3jljddyOns0pxImmOgXR2GlQPAmm66TKLbc
transfer.ilpCondition = HpSoVzas3jljddyOns0pxImmOgXR2GlQPAmm66TKLbc   → match
```

**Step 7 · State check.** The state from step 1 must be `RESERVED`; otherwise 3100 *non-RESERVED transfer state*. No database access.

**Step 8 · Expiry check.** `expirationDate` must not have passed; otherwise 3303. No database access.

**Step 9 · `handlePayeeResponse` → `savePayeeTransferResponse`.** In one transaction, insert `transferFulfilment` (with the open settlement window), `transferExtension` (if any) and `transferStateChange = RECEIVED_FULFIL`. The settlement-window lookup goes through `Db.from`, so it runs on a separate connection, outside the transaction. The transfer is assigned to its settlement window here, at fulfil time, not at commit.

```sql
BEGIN;

SELECT settlementWindow.settlementWindowId,
       swsc.settlementWindowStateId AS state,
       swsc.reason                  AS reason,
       settlementWindow.createdDate AS createdDate,
       swsc.createdDate             AS changedDate
FROM settlementWindow
LEFT JOIN settlementWindowStateChange AS swsc
  ON swsc.settlementWindowStateChangeId = settlementWindow.currentStateChangeId
WHERE swsc.settlementWindowStateId = 'OPEN'
ORDER BY changedDate DESC;                -- outside the trx

INSERT INTO transferFulfilment
  (completedDate, createdDate, ilpFulfilment, isValid, settlementWindowId, transferId)
VALUES ('2026-10-15 09:30:06.410', '2026-10-15 09:30:06.520',
        'ax8KPpwtT4obflw9Kp8OjXxrWk8-LRwLmo9-bVxLOik', true, 12, '01JBVM16V1SZQX8B0JZ2N4ZDE4');
INSERT INTO transferStateChange (createdDate, reason, transferId, transferStateId)
VALUES ('2026-10-15 09:30:06.520', DEFAULT, '01JBVM16V1SZQX8B0JZ2N4ZDE4', 'RECEIVED_FULFIL');

COMMIT;
```

**Step 10 · Find the position to move.** `Cyril.processFulfilMessage` checks whether this transfer is the determining transfer of an FX conversion (it is not), then riverwallet's USD POSITION account is looked up; it becomes the message key:

```sql
SELECT * FROM fxWatchList WHERE determiningTransferId = '01JBVM16V1SZQX8B0JZ2N4ZDE4';

SELECT participant.*, pc.participantCurrencyId, pc.currencyId, pc.isActive AS currencyIsActive
FROM participant
INNER JOIN participantCurrency AS pc ON pc.participantId = participant.participantId
WHERE participant.name = 'riverwallet'
  AND pc.currencyId = 'USD'
  AND pc.ledgerAccountTypeId = 1          -- POSITION
LIMIT 1;                                  -- participantCurrencyId 5 → Kafka key '5'
```

**Step 11 · `Kafka.proceed`.** Commit the offset, then produce to `topic-transfer-position-batch` with `action: commit` and key `5`. No database access.

On the `ABORT_VALIDATION` path the handler writes `transferStateChange = RECEIVED_ERROR` and a `transferError` row. It then sends a position message keyed by **pinebank's** account to release the reservation (`ABORTED_ERROR`), and both sides are notified.

## H27 · Kafka `topic-transfer-position-batch`

| Field | Value |
|---|---|
| Key | `5` (riverwallet's USD POSITION `participantCurrencyId`) |
| `from` / `to` | `riverwallet` / `pinebank` |
| `metadata.event` | `{ "type": "position", "action": "commit" }` |

The key is riverwallet's USD position account, so this message can land on a different partition, and be read by a different consumer, from the one at H19.

## H28 · central-ledger position-batch handler (commit)

This uses the same transaction pattern as [H20](./transfer-prepare.md), with the `commit` bin for riverwallet's account. The SQL assumes riverwallet's position is −300.00 before this transfer.

**Steps 1–4 · Poll, `BEGIN`, latest states, mappings.** As at H20: `BEGIN`, the `transferStateChange` read, `participantCurrency` (×2) and `settlementModel`.

**Step 5 · Lock riverwallet's positions.** Lock the POSITION and SETTLEMENT rows, and read the commit amount from the payee row written at H18 (`amount = -50`):

```sql
SELECT * FROM participantPosition
WHERE participantCurrencyId IN ('5', 6)             -- riverwallet USD POSITION, SETTLEMENT
FOR UPDATE;

SELECT transferParticipant.* FROM transferParticipant
WHERE transferParticipant.transferParticipantRoleTypeId = 2      -- PAYEE_DFSP
  AND transferParticipant.ledgerEntryTypeId = 1                  -- PRINCIPLE_VALUE
  AND transferParticipant.transferId IN ('01JBVM16V1SZQX8B0JZ2N4ZDE4');
```

**Step 6 · Net Debit Cap.** Read for every account bin, so riverwallet's limit is read too (`participantId = 3`), even though only prepare bins use it. Same query as H20 step 6.

**Steps 7–8 · `_handleParticipantPositionChange`.** In memory: running position += (−50.00), new state `COMMITTED`.

**Step 9 · Write the results.**

```sql
UPDATE participantPosition
SET value = -350, reservedValue = 0, changedDate = '2026-10-15 09:30:06.640'
WHERE participantPositionId = 5;

INSERT INTO transferStateChange (createdDate, reason, transferId, transferStateId)
VALUES ('2026-10-15 09:30:06.635', NULL, '01JBVM16V1SZQX8B0JZ2N4ZDE4', 'COMMITTED');

-- re-read the state changes to get transferStateChangeId 104, then:
INSERT INTO participantPositionChange
  (change, createdDate, participantCurrencyId, participantPositionId, reservedValue, transferStateChangeId, value)
VALUES (-50, '2026-10-15 09:30:06.635', '5', 5, 0, 104, -350);
```

**Steps 10–12 · Offsets, `COMMIT`, notify.** Commit the offsets, then `COMMIT` (locks released), then produce `action: commit` with status success to `topic-notification-event`.

pinebank's position is not touched here. The reservation at H20 already counted the 50.00.

## H29 · Kafka `topic-notification-event`

| Field | Value |
|---|---|
| Key | none |
| `from` / `to` | `riverwallet` / `pinebank` |
| `metadata.event` | `{ "type": "notification", "action": "commit", "state": { "status": "success", "code": 0 } }` |
| `content` | Original H24 headers and payload |

## H30 · notification handler → pinebank SDK

For action `commit` with status success, the notification handler:

1. Resolves pinebank's `FSPIOP_CALLBACK_URL_TRANSFER_PUT`.
2. Sends `PUT /transfers/{ID}` with riverwallet's **original bytes and signature** (the fulfilment and `transferState`).
3. Records `tx_transfer_fulfil` and `tx_transfer` from the trace-state timestamps.

**Request:** `PUT /transfers/01JBVM16V1SZQX8B0JZ2N4ZDE4`

Headers:

```json
{
  "Content-Type": "application/vnd.interoperability.transfers+json;version=2.0",
  "Date": "Thu, 15 Oct 2026 09:30:06 GMT",
  "FSPIOP-Source": "riverwallet",
  "FSPIOP-Destination": "pinebank",
  "FSPIOP-URI": "/transfers/01JBVM16V1SZQX8B0JZ2N4ZDE4",
  "FSPIOP-HTTP-Method": "PUT",
  "FSPIOP-Signature": "{\"signature\":\"…\",\"protectedHeader\":\"…\"}",
  "traceparent": "00-4bf92f3577b34da6a3ce929d0e0e4736-6f708192a3b4c5d6-01"
}
```

Body:

```json
{
  "fulfilment": "ax8KPpwtT4obflw9Kp8OjXxrWk8-LRwLmo9-bVxLOik",
  "completedTimestamp": "2026-10-15T09:30:06.410Z",
  "transferState": "COMMITTED"
}
```

**Response:** `200 OK`

**Inside the pinebank SDK:** the inbound JWS check runs (signature by riverwallet), then the callback is published to `tf_01JBVM16V1SZQX8B0JZ2N4ZDE4`. The outbound model runs `validateFulfil(fulfilment, quoteResponse.condition)` (`CHECK_ILP`), moves to `succeeded`, saves its state, and returns the H1 response to core banking with `currentState: COMPLETED`.

## H31 · notification handler → riverwallet SDK

What the payee receives depends on what it sent at H24:

| Payee replied (H24) | Hub sends | Body | Signed by |
|---|---|---|---|
| `COMMITTED`, `SEND_TRANSFER_CONFIRMATION_TO_PAYEE=true` (default) | `PUT /transfers/{ID}` | The H24 payload | Hub (`JWS_SIGN`) |
| `RESERVED` | `PATCH /transfers/{ID}` | `{ transferState: COMMITTED, completedTimestamp }`, fulfilment removed | Hub |

The confirmation for the default (`COMMITTED`) case:

**Request:** `PUT /transfers/01JBVM16V1SZQX8B0JZ2N4ZDE4`

Headers:

```json
{
  "Content-Type": "application/vnd.interoperability.transfers+json;version=2.0",
  "Date": "Thu, 15 Oct 2026 09:30:06 GMT",
  "FSPIOP-Source": "Hub",
  "FSPIOP-Destination": "riverwallet",
  "FSPIOP-URI": "/transfers/01JBVM16V1SZQX8B0JZ2N4ZDE4",
  "FSPIOP-HTTP-Method": "PUT",
  "FSPIOP-Signature": "{\"signature\":\"…\",\"protectedHeader\":\"…\"}"
}
```

Body:

```json
{
  "fulfilment": "ax8KPpwtT4obflw9Kp8OjXxrWk8-LRwLmo9-bVxLOik",
  "completedTimestamp": "2026-10-15T09:30:06.410Z",
  "transferState": "COMMITTED"
}
```

The notification for the `RESERVED` case:

**Request:** `PATCH /transfers/01JBVM16V1SZQX8B0JZ2N4ZDE4`

Headers:

```json
{
  "Content-Type": "application/vnd.interoperability.transfers+json;version=2.0",
  "Date": "Thu, 15 Oct 2026 09:30:06 GMT",
  "FSPIOP-Source": "Hub",
  "FSPIOP-Destination": "riverwallet",
  "FSPIOP-URI": "/transfers/01JBVM16V1SZQX8B0JZ2N4ZDE4",
  "FSPIOP-HTTP-Method": "PATCH",
  "FSPIOP-Signature": "{\"signature\":\"…\",\"protectedHeader\":\"…\"}"
}
```

Body:

```json
{
  "completedTimestamp": "2026-10-15T09:30:06.512Z",
  "transferState": "COMMITTED"
}
```

riverwallet answers `200 OK` to either. With `RESERVED`, the payee SDK holds the credit as pending until the `PATCH` arrives. If no `PATCH` arrives within `PATCH_NOTIFICATION_GRACE_TIME_MS` (default 15 s), it polls `GET /transfers/{ID}`.

## What the ledger database holds afterwards

These are the rows written in `central_ledger` for this one transfer, in order.

| Hop | Table | Row |
|---|---|---|
| H18 | `transferDuplicateCheck` | `transferId`, SHA-256 of the prepare |
| H18 | `transfer` | `transferId`, `amount 50.00`, `currencyId USD`, `ilpCondition`, `expirationDate` |
| H18 | `transferParticipant` | pinebank, `PAYER_DFSP`, `PRINCIPLE_VALUE`, `+50.00` |
| H18 | `transferParticipant` | riverwallet, `PAYEE_DFSP`, `PRINCIPLE_VALUE`, `−50.00`, `participantCurrencyId NULL` |
| H18 | `ilpPacket` | `transferId`, packet |
| H18 | `transferStateChange` | `RECEIVED_PREPARE` |
| H20 | `participantPosition` | pinebank USD: `value` 1,200.00 → 1,250.00 (updated) |
| H20 | `transferStateChange` | `RESERVED` |
| H20 | `participantPositionChange` | pinebank USD: `change +50.00`, `value 1,250.00` |
| timeout cron | `transferTimeout` | `transferId`, `expirationDate` (added by the sweep, deleted again once `RECEIVED_FULFIL` is reached) |
| H26 | `transferFulfilmentDuplicateCheck` | `transferId`, SHA-256 of the fulfil |
| H26 | `transferFulfilment` | `transferId`, `ilpFulfilment`, `completedDate`, `settlementWindowId 12` |
| H26 | `transferStateChange` | `RECEIVED_FULFIL` |
| H28 | `participantPosition` | riverwallet USD: `value` moves by −50.00 (updated) |
| H28 | `transferStateChange` | `COMMITTED` |
| H28 | `participantPositionChange` | riverwallet USD: `change −50.00` |

`transferStateChange` and `participantPositionChange` are append-only, so the full history of the transfer and of both positions can be rebuilt from them. Settlement later assigns the committed transfer to a settlement window (central-settlement) and adjusts the POSITION and SETTLEMENT accounts.

## Checking the result

Either DFSP can ask the hub for the current state at any time, for example after a lost callback:

**Request:** `GET /transfers/01JBVM16V1SZQX8B0JZ2N4ZDE4`

Headers:

```json
{
  "Content-Type": "application/vnd.interoperability.transfers+json;version=2.0",
  "Accept": "application/vnd.interoperability.transfers+json;version=2",
  "Date": "Thu, 15 Oct 2026 09:31:00 GMT",
  "FSPIOP-Source": "pinebank",
  "FSPIOP-Destination": "riverwallet"
}
```

ml-api-adapter answers `202 Accepted` and produces to `topic-transfer-get`. The central-ledger get handler then sends a callback to the requester:

**Request:** `PUT /transfers/01JBVM16V1SZQX8B0JZ2N4ZDE4`

Headers:

```json
{
  "Content-Type": "application/vnd.interoperability.transfers+json;version=2.0",
  "Date": "Thu, 15 Oct 2026 09:31:00 GMT",
  "FSPIOP-Source": "Hub",
  "FSPIOP-Destination": "pinebank"
}
```

Body:

```json
{
  "fulfilment": "ax8KPpwtT4obflw9Kp8OjXxrWk8-LRwLmo9-bVxLOik",
  "completedTimestamp": "2026-10-15T09:30:06.410Z",
  "transferState": "COMMITTED"
}
```

The body is built from the ledger record (`TransferObjectTransform.toFulfil`), not from the payee's original bytes. An unknown ID gets `PUT /transfers/{ID}/error` with `3208`. A requester that is neither the payer nor the payee of the transfer gets `3000` (generic client error).

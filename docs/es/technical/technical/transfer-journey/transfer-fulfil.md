---
i18n_source_sha: 69c87ae5ee32496eb368c6ee217bf42d1fcf1c7d
---

# Fase 3 · Transferencia, Fulfilment y Confirmación (H24–H31)

El beneficiario DFSP acepta la transferencia al confirmar el cumplimiento. El nodo central comprueba que el cumplimiento cumple la condición, contabiliza la transferencia en la posición del beneficiario e informa del resultado a ambos DFSP.

## H24 · riverwallet SDK → ml-api-adapter API

**Solicitud:** `PUT /transfers/01JBVM16V1SZQX8B0JZ2N4ZDE4`

Encabezados:

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

Cuerpo:

```json
{
  "fulfilment": "ax8KPpwtT4obflw9Kp8OjXxrWk8-LRwLmo9-bVxLOik",
  "completedTimestamp": "2026-10-15T09:30:06.410Z",
  "transferState": "COMMITTED"
}
```

**Respuesta:** `200 OK`

Si el beneficiario SDK indica «`RESERVE_NOTIFICATION=true`», el `transferState` pasa a ser `"RESERVED"`. A continuación, el beneficiario espera a que el Hub envíe el `PATCH` en H31 antes de considerar el abono como definitivo.

**En el interior de ml-api-adapter API** (`fulfilTransfer`): complementos de entrada (y JWS validación, si está habilitada); `tracestate.timeApiFulfil = now`; `Validator.fulfilTransfer`; conservar los bytes originales; generar el resultado en `topic-transfer-fulfil` con `event = { type: fulfil, action: commit }` (o `reserve`); devolver `200`. Métrica `ml_transfer_fulfil`.

## H25 · Kafka `topic-transfer-fulfil`

Consumido por`cl-group-transfer-fulfil`.

| Campo | Valor |
|---|---|
| Clave | ninguno |
| `from` / `to` | `riverwallet` / `pinebank` |
| `metadata.event` | `{ "type": "fulfil", "action": "commit" }` (`"reserve"` cuando el Beneficiario ha enviado `RESERVED`) |
| `content` | Encabezados y carga útil originales de H24 |

## H26 · Gestor de Fulfilment «central-ledger»

`src/handlers/transfers/handler.js` `fulfil` → `processFulfilMessage`:

El código SQL que aparece en cada paso parte de la base de que el valor es `CACHE.CACHE_ENABLED=false` (el valor por defecto).

**Paso 1 · Cargue la transferencia.** El `TransferService.getById` realiza una lectura conjunta del `transfer`, ambas `transferParticipant` filas con `participant` y `participantCurrency`, `ilpPacket`, la última `transferStateChange`, `transferFulfilment` y `transferError`; prevalece la fila de estado más reciente. A continuación, se leen las extensiones de la transferencia. Si falta la transferencia → 2001.

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

**Paso 2 · Comprobación del tipo de contenido.** Un tipo de contenido v1.0 con `transferState: RESERVED` → 3100. No se accede a la base de datos.

**Paso 3 · Asignación de encabezados.** El valor `FSPIOP-Source` debe ser igual a `payeeFsp` (riverwallet) y el valor `FSPIOP-Destination` debe ser igual a `payerFsp` (pinebank). Si no coinciden → `ABORT_VALIDATION`. No se permite el acceso a la base de datos.

**Paso 4 · Realice la comprobación de duplicados.** Calcule el SHA-256 de la carga útil comparándola con `transferFulfilmentDuplicateCheck`; la primera vez, introduzca:

```sql
SELECT * FROM transferFulfilmentDuplicateCheck WHERE transferId = '01JBVM16V1SZQX8B0JZ2N4ZDE4';

INSERT INTO transferFulfilmentDuplicateCheck (hash, transferId)
VALUES ('<sha256 of payload>', '01JBVM16V1SZQX8B0JZ2N4ZDE4');
```

**Paso 5 · Tipo de evento.** El tipo de evento debe ser `fulfil`. Sin acceso a la base de datos.

**Paso 6 · `validateFulfilCondition`.** Descodifique el «Fulfilment» con Base64url, extraiga 32 bytes, calcule el SHA-256 y compárelo con el `transfer.ilpCondition` (cargado en el paso 1). Si no coinciden → `ABORT_VALIDATION`. Con los valores de ejemplo:

```text
fulfilment            = ax8KPpwtT4obflw9Kp8OjXxrWk8-LRwLmo9-bVxLOik
base64url(SHA-256(base64url-decode(fulfilment)))
                      = HpSoVzas3jljddyOns0pxImmOgXR2GlQPAmm66TKLbc
transfer.ilpCondition = HpSoVzas3jljddyOns0pxImmOgXR2GlQPAmm66TKLbc   → match
```

**Paso 7 · Comprobación del estado.** El estado del paso 1 debe ser `RESERVED`; de lo contrario, 3100 *estado de transferencia no RESERVADO*. No se permite el acceso a la base de datos.

**Paso 8 · Comprobación de caducidad.** No deben haber transcurrido `expirationDate`; de lo contrario, se producirá el error 3303. No se permite el acceso a la base de datos.

**Paso 9 · `handlePayeeResponse` → `savePayeeTransferResponse`.** En una sola transacción, introduzca `transferFulfilment` (con la ventana de liquidación abierta), `transferExtension` (si procede) y `transferStateChange = RECEIVED_FULFIL`. La consulta de la ventana de liquidación llega hasta `Db.from`, por lo que se ejecuta en una conexión independiente, fuera de la transacción. La transferencia se asigna a su ventana de liquidación en este momento, en el momento de la ejecución, y no en el momento de la confirmación (commit).

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

**Paso 10 · Localizar la posición que se va a mover.** El `Cyril.processFulfilMessage` comprueba si esta transferencia es la transferencia determinante de una conversión de divisas (no lo es); a continuación, se consulta la cuenta de POSICIÓN en USD de Riverwallet, que pasa a ser la clave del mensaje:

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

**Paso 11 · `Kafka.proceed`.** Realice la confirmación del desplazamiento y, a continuación, genere el valor `topic-transfer-position-batch` utilizando `action: commit` y la clave `5`. No se realiza ningún acceso a la base de datos.

En la ruta `ABORT_VALIDATION`, el gestor escribe `transferStateChange = RECEIVED_ERROR` y una fila `transferError`. A continuación, envía un mensaje de posición identificado con la cuenta de **pinebank** para liberar la reserva (`ABORTED_ERROR`), y se notifica a ambas partes.

## H27 · Kafka `topic-transfer-position-batch`

| Campo | Valor |
|---|---|
| Clave | `5` (POSICIÓN en USD de riverwallet `participantCurrencyId`) |
| `from` / `to` | `riverwallet` / `pinebank` |
| `metadata.event` | `{ "type": "position", "action": "commit" }` |

La clave es la cuenta de posición en USD de Riverwallet, por lo que este mensaje puede llegar a una partición diferente y ser leído por un consumidor distinto al de H19.

## H28 · Gestor de lotes de posición central-ledger (confirmación (commit))

Esto utiliza el mismo patrón de transacción que [H20](./transfer-prepare.md), con el bin `commit` para la cuenta de riverwallet. La consulta SQL parte de la base de que la posición de riverwallet es de −300,00 antes de esta transferencia.

**Pasos 1-4 · Encuesta, `BEGIN`, estados más recientes, asignaciones.** A las H20: `BEGIN`, se leen los valores `transferStateChange`, `participantCurrency` (×2) y `settlementModel`.

**Paso 5 · Fijar las posiciones de Riverwallet.** Fije las filas «POSICIÓN» y «Liquidación», y lea el importe de la confirmación (commit) en la fila del Beneficiario, en la celda H18 (`amount = -50`):

```sql
SELECT * FROM participantPosition
WHERE participantCurrencyId IN ('5', 6)             -- riverwallet USD POSITION, SETTLEMENT
FOR UPDATE;

SELECT transferParticipant.* FROM transferParticipant
WHERE transferParticipant.transferParticipantRoleTypeId = 2      -- PAYEE_DFSP
  AND transferParticipant.ledgerEntryTypeId = 1                  -- PRINCIPLE_VALUE
  AND transferParticipant.transferId IN ('01JBVM16V1SZQX8B0JZ2N4ZDE4');
```

**Paso 6 · Límite de débito neto.** Se lee para cada compartimento de cuenta, por lo que también se lee el límite de Riverwallet (`participantId = 3`), aunque solo lo utilicen los compartimentos de preparación. Es la misma consulta que en el paso 6 de H20.

**Pasos 7-`_handleParticipantPositionChange`.** En memoria: posición de ejecución += (−50,00), nuevo estado `COMMITTED`.

**Paso 9 · Anote los resultados.**

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

**Pasos 10-12 · Desplazamientos, `COMMIT`, notificación.** Realice la confirmación de los desplazamientos; a continuación, `COMMIT` (bloqueos liberados); y, por último, genere `action: commit` con estado «éxito» para `topic-notification-event`.

La posición de Pinebank no se ve afectada en este caso. La reserva en H20 ya incluía los 50,00.

## H29 · Kafka `topic-notification-event`

| Campo | Valor |
|---|---|
| Clave | ninguno |
| `from` / `to` | `riverwallet` / `pinebank` |
| `metadata.event` | `{ "type": "notification", "action": "commit", "state": { "status": "success", "code": 0 } }` |
| `content` | Encabezados y carga útil originales de H24 |

## H30 · gestor de notificaciones → pinebank SDK

En el caso de la acción n.º `commit`, cuyo estado es «éxito», el gestor de notificaciones:

1. Resuelve el `FSPIOP_CALLBACK_URL_TRANSFER_PUT` de Pinebank.
2. Envía `PUT /transfers/{ID}` junto con los **bytes y la firma originales** de Riverwallet (el Fulfilment y `transferState`).
3. Registra los valores `tx_transfer_fulfil` y `tx_transfer` a partir de las marcas de tiempo del estado de seguimiento.

**Solicitud:** `PUT /transfers/01JBVM16V1SZQX8B0JZ2N4ZDE4`

Encabezados:

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

Cuerpo:

```json
{
  "fulfilment": "ax8KPpwtT4obflw9Kp8OjXxrWk8-LRwLmo9-bVxLOik",
  "completedTimestamp": "2026-10-15T09:30:06.410Z",
  "transferState": "COMMITTED"
}
```

**Respuesta:** `200 OK`

**Dentro de Pinebank SDK:** se ejecuta la comprobación entrante JWS (firmada por Riverwallet) y, a continuación, se publica la llamada de retorno en `tf_01JBVM16V1SZQX8B0JZ2N4ZDE4`. El modelo saliente se ejecuta en `validateFulfil(fulfilment, quoteResponse.condition)` (`CHECK_ILP`), pasa a `succeeded`, guarda su estado y devuelve la respuesta H1 al núcleo bancario mediante `currentState: COMPLETED`.

## H31 · gestor de notificaciones → riverwallet SDK

Lo que reciba el beneficiario dependerá de lo que haya enviado en H24:

| El beneficiario respondió (H24) | El Hub envía | Cuerpo | Firmado por |
|---|---|---|---|
| `COMMITTED`, `SEND_TRANSFER_CONFIRMATION_TO_PAYEE=true` (por defecto) | `PUT /transfers/{ID}` | La carga útil del H24 | Hub (`JWS_SIGN`) |
| `RESERVED` | `PATCH /transfers/{ID}` | `{ transferState: COMMITTED, completedTimestamp }`, se ha eliminado Fulfilment | Hub |

La confirmación para el caso por defecto (`COMMITTED`):

**Solicitud:** `PUT /transfers/01JBVM16V1SZQX8B0JZ2N4ZDE4`

Encabezados:

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

Cuerpo:

```json
{
  "fulfilment": "ax8KPpwtT4obflw9Kp8OjXxrWk8-LRwLmo9-bVxLOik",
  "completedTimestamp": "2026-10-15T09:30:06.410Z",
  "transferState": "COMMITTED"
}
```

La notificación correspondiente al caso n.º `RESERVED`:

**Solicitud:** `PATCH /transfers/01JBVM16V1SZQX8B0JZ2N4ZDE4`

Encabezados:

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

Cuerpo:

```json
{
  "completedTimestamp": "2026-10-15T09:30:06.512Z",
  "transferState": "COMMITTED"
}
```

riverwallet responde «`200 OK`» a cualquiera de las dos opciones. Con «`RESERVED`», el beneficiario «SDK» mantiene el crédito como pendiente hasta que llegue «`PATCH`». Si no llega «`PATCH`» en un plazo de «`PATCH_NOTIFICATION_GRACE_TIME_MS`» (por defecto, 15 s), realiza una consulta a «`GET /transfers/{ID}`».

## Qué contiene la base de datos del Libro mayor a partir de ese momento

Estas son las filas en las que se ha introducido el valor `central_ledger` para esta transferencia, en orden.

| Lúpulo | Tabla | Fila |
|---|---|---|
| H18 | `transferDuplicateCheck` | `transferId`, SHA-256 del archivo «prepare» |
| H18 | `transfer` | `transferId`, `amount 50.00`, `currencyId USD`, `ilpCondition`, `expirationDate` |
| H18 | `transferParticipant` | pinebank, `PAYER_DFSP`, `PRINCIPLE_VALUE`, `+50.00` |
| H18 | `transferParticipant` | riverwallet, `PAYEE_DFSP`, `PRINCIPLE_VALUE`, `−50.00`, `participantCurrencyId NULL` |
| H18 | `ilpPacket` | `transferId`, paquete |
| H18 | `transferStateChange` | `RECEIVED_PREPARE` |
| H₂O | `participantPosition` | pinebank USD: `value` 1.200,00 → 1.250,00 (actualizado) |
| H₂O | `transferStateChange` | `RESERVED` |
| H₂O | `participantPositionChange` | pinebank USD: `change +50.00`, `value 1,250.00` |
| tiempo de espera de cron | `transferTimeout` | `transferId`, `expirationDate` (añadido por el barrido, eliminado de nuevo una vez alcanzado el `RECEIVED_FULFIL`) |
| H26 | `transferFulfilmentDuplicateCheck` | `transferId`, SHA-256 del Fulfilment |
| H26 | `transferFulfilment` | `transferId`, `ilpFulfilment`, `completedDate`, `settlementWindowId 12` |
| H26 | `transferStateChange` | `RECEIVED_FULFIL` |
| H28 | `participantPosition` | riverwallet USD: `value`, con una variación de −50,00 (actualizado) |
| H28 | `transferStateChange` | `COMMITTED` |
| H28 | `participantPositionChange` | riverwallet USD: `change −50.00` |

`transferStateChange` y `participantPositionChange` son de solo adición, por lo que a partir de ellas se puede reconstruir el historial completo de la transferencia y de ambas posiciones. Posteriormente, la liquidación asigna la transferencia confirmada a una ventana de liquidación (central-settlement) y ajusta las cuentas POSITION y SETTLEMENT.

## Comprobación del resultado

DFSP puede solicitar al Hub el estado actual en cualquier momento, por ejemplo, tras una llamada de retorno perdida:

**Solicitud:** `GET /transfers/01JBVM16V1SZQX8B0JZ2N4ZDE4`

Encabezados:

```json
{
  "Content-Type": "application/vnd.interoperability.transfers+json;version=2.0",
  "Accept": "application/vnd.interoperability.transfers+json;version=2",
  "Date": "Thu, 15 Oct 2026 09:31:00 GMT",
  "FSPIOP-Source": "pinebank",
  "FSPIOP-Destination": "riverwallet"
}
```

ml-api-adapter respuestas, `202 Accepted`, y genera `topic-transfer-get`. A continuación, el gestor de obtención central-ledger envía una llamada de retorno al solicitante:

**Solicitud:** `PUT /transfers/01JBVM16V1SZQX8B0JZ2N4ZDE4`

Encabezados:

```json
{
  "Content-Type": "application/vnd.interoperability.transfers+json;version=2.0",
  "Date": "Thu, 15 Oct 2026 09:31:00 GMT",
  "FSPIOP-Source": "Hub",
  "FSPIOP-Destination": "pinebank"
}
```

Cuerpo:

```json
{
  "fulfilment": "ax8KPpwtT4obflw9Kp8OjXxrWk8-LRwLmo9-bVxLOik",
  "completedTimestamp": "2026-10-15T09:30:06.410Z",
  "transferState": "COMMITTED"
}
```

El cuerpo se genera a partir del registro del Libro mayor (`TransferObjectTransform.toFulfil`), no a partir de los bytes originales del Beneficiario. Un identificador desconocido recibe el valor `PUT /transfers/{ID}/error` con `3208`. Un solicitante que no sea ni el Pagador ni el Beneficiario de la transferencia recibe el valor `3000` (error genérico del cliente).

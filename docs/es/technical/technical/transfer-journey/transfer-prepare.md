---
i18n_source_sha: 22fb3d2ac153d3d6be865ab7aecd082be60dffa4
---

# Fase 3 · Preparación de la transferencia (H16–H23)

El pagador DFSP envía la orden de transferencia, vinculada a las condiciones de la cotización. El Hub la valida y la registra, reserva el importe en la cuenta del pagador y remite la orden original firmada al beneficiario DFSP.

## H16 · Pinebank SDK → ml-api-adapter API

Establecido en `OutboundTransfersModel._buildTransferPrepare`. Los valores `ilpPacket` y `condition` proceden de la respuesta a la solicitud de cotización (H15). El valor `expiration` es ahora +`EXPIRY_SECONDS` (por defecto, 20 s).

**Solicitud:** `POST /transfers`

Encabezados:

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

Cuerpo:

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

El «`protectedHeader`» se descodifica como:

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

**Respuesta:** `202 Accepted`

**En el interior de ml-api-adapter API** (`src/api/transfers/handler.js` `create`):

| # | Paso | Toques |
|---|---|---|
| 1 | Complementos de Ingress. Si el valor es `JWS_VALIDATE=true`, compruebe que `FSPIOP-Signature` coincide con la clave pública de Pinebank (3105 en caso de fallo). | — |
| 2 | Conserve los bytes originales: en línea en `context.originalRequestPayload`, o `SET` en Redis cuando se haya configurado la caché de carga útil. | (Redis) |
| 3 | `tracestate.timeApiPrepare = now`. | — |
| 4 | `dto.prepareMessageDto` construye la envolvente: `from: pinebank`, `to: riverwallet`, `metadata.event = { type: prepare, action: prepare }`, `content.payload = dataUri`. | — |
| 5 | Resultado: `topic-transfer-prepare` (sin clave). Métrica `ml_transfer_prepare`. | Kafka |
| 6 | Devuelve `202`. Todavía no se ha producido ningún cambio en el Libro mayor. | — |

## H17 · Kafka `topic-transfer-prepare`

Procesado por `cl-group-transfer-prepare` (el gestor de preparación central-ledger, `batchSize: 1`). El mensaje completo se muestra en [Hub Kafka, handlers](./README.md#hub-kafka-handlers)].

| Campo | Valor |
|---|---|
| Clave | ninguno |
| `from` / `to` | `pinebank` / `riverwallet` |
| `metadata.event` | `{ "type": "prepare", "action": "prepare" }` |

## H18 · central-ledger: preparación del gestor

`src/handlers/transfers/prepare.js` `prepare()`:

El código SQL que aparece en cada paso parte de la base de que el valor es `CACHE.CACHE_ENABLED=false` (el valor por defecto).

**Paso 1 · `dto.prepareInputDto`.** Descifre la envoltura y la carga útil; abra el tramo de rastreo secundario `cl_transfer_prepare`. No hay acceso a la base de datos.

**Paso 2 · `calculateProxyObligation`.** Con el valor `PROXY_CACHE.enabled=true` (el valor por defecto en `config/default.json`), el `getFSPProxy` confirma que ambos DFSP están incluidos en el Esquema de pagos y que el Beneficiario dispone de una cuenta «USD POSITION» activa. Ambos son Participantes locales, por lo que no se utiliza ningún proxy y la copia de la Carga útil no sufre modificaciones. Las dos consultas se ejecutan en paralelo; cada una corresponde al dominio `getByName` (Participante y, a continuación, sus cuentas):

```sql
-- getFSPProxy('pinebank') and getFSPProxy('riverwallet'): each runs both statements
SELECT * FROM participant ORDER BY name ASC;
SELECT * FROM participantCurrency ORDER BY participantCurrencyId ASC;
```

**Paso 3 · `checkDuplication`.** En el `duplicateCheckComparator(transferId, payload)` se calcula el SHA-256 de la carga útil y se lee `transferDuplicateCheck` por `transferId`. No hay ninguna fila, por lo que es la primera vez que se detecta el ID y se almacena el hash:

```sql
SELECT * FROM transferDuplicateCheck WHERE transferId = '01JBVM16V1SZQX8B0JZ2N4ZDE4';

INSERT INTO transferDuplicateCheck (hash, transferId)
VALUES ('<sha256 of payload>', '01JBVM16V1SZQX8B0JZ2N4ZDE4');
```

**Paso 4·`checkIfDeterminingTransferExists`.** Busque transferencias de FX vinculadas en la lista de seguimiento; no hay ninguna:

```sql
SELECT * FROM fxWatchList WHERE determiningTransferId = '01JBVM16V1SZQX8B0JZ2N4ZDE4';
```

**Paso 5 · `Validator.validatePrepare`.** `FSPIOP-Source` = `payerFsp`; escala de importe y precisión; `pinebank` y `riverwallet` existen y están activos; la condición está presente y es una condición criptográfica válida; `expiration` está presente y en el futuro; el pagador ≠ el beneficiario; y el pagador tiene una cuenta de POSICIÓN en USD:

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

**Paso 6 · `savePreparedRequest` → `TransferFacade.saveTransferPrepared`.** Determine los identificadores de los participantes y la cuenta del pagador y, a continuación, introduzca la transferencia en una sola transacción:

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

El valor «`transferParticipant.participantCurrencyId`» del beneficiario es «`NULL`»: su cuenta solo se resuelve cuando el valor es «`PAYEE_PARTICIPANT_CURRENCY_VALIDATION_ENABLED=true`» (el valor por defecto es «`false`»).

**Paso 7·`definePositionParticipant`.** La posición del Pagador es la que se desplaza. `Participant.getAccountByNameAndCurrency('pinebank','USD',POSITION)` devuelve su `participantCurrencyId`, que se convierte en la **clave del mensaje**:

```sql
SELECT participant.*, pc.participantCurrencyId, pc.currencyId, pc.isActive AS currencyIsActive
FROM participant
INNER JOIN participantCurrency AS pc ON pc.participantId = participant.participantId
WHERE participant.name = 'pinebank'
  AND pc.currencyId = 'USD'
  AND pc.ledgerAccountTypeId = 1          -- POSITION
LIMIT 1;                                 -- participantCurrencyId 3 → Kafka key '3'
```

**Paso 8 · `Kafka.proceed`.** Realice la confirmación del desplazamiento consumido y, a continuación, envíe los datos al tema de posición con los valores `event = { type: position, action: prepare }` y `key = 3`. Métrica `transfer_prepare`. Sin acceso a la base de datos.

En total, la fase de preparación realiza seis lecturas completas de `participant`, cuatro de `participantCurrency` y tres búsquedas de cuenta; solo las cinco inserciones del paso 6 se realizan dentro de una transacción. Con `CACHE.CACHE_ENABLED=true`, las lecturas completas de la tabla se realizan desde la memoria.

Si el paso 5 falla, el paso 6 almacena las filas con estado `INVALID` y los motivos (fuera de una Transacción), registra una fila `transferError` y envía un evento de fallo (3100) a `topic-notification-event`, dirigido a pinebank. A continuación, pinebank recibe:

**Solicitud:** `PUT /transfers/01JBVM16V1SZQX8B0JZ2N4ZDE4/error`

Encabezados:

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

Cuerpo:

```json
{
  "errorInformation": {
    "errorCode": "3100",
    "errorDescription": "Generic validation error - Expiration date 2026-10-15T09:30:25.000Z is already in the past"
  }
}
```

El Hub indica este error únicamente cuando `JWS_SIGN=true` en ml-api-adapter.

## H19 · Kafka `topic-transfer-position-batch`

| Campo | Valor |
|---|---|
| Clave | `3` (POSICIÓN EN DÓLARES DE EE. UU. DE PINEBANK `participantCurrencyId`) |
| `from` / `to` | `pinebank` / `riverwallet` |
| `metadata.event` | `{ "type": "position", "action": "prepare" }` |
| `content` | Sin cambios respecto a H17 (encabezados, carga útil y contexto originales) |

Dado que la clave es la cuenta de posición en USD de Pinebank, cada movimiento de dicha cuenta se asigna a la misma partición. Un consumidor los procesa en orden en `cl-group-transfer-position-batch`.

## H20 · Gestor de lotes de posición central-ledger (Reserva)

`src/handlers/positions/handlerBatch.js` → `src/domain/position/binProcessor.js`:

El código SQL de cada paso corresponde a un lote que contiene únicamente esta preparación (un contenedor de cuenta, clave `3`). Con un lote completo, cada lectura abarca todas las transferencias y cuentas del lote a través de una lista `IN (…)`, y las escrituras se ejecutan una vez por cada contenedor de cuenta como inserciones de varias filas.

**Paso 1 · Recogida y clasificación.** Recoja hasta `batchSize` (por defecto, 10) mensajes. Clasifíquelos en los compartimentos `bins[messageKey][action]` y registre el último desplazamiento de cada partición. Sin acceso a la base de datos.

**Paso 2 · `startDbTransaction()`.**

```sql
BEGIN;
```

**Paso 3 · Estados más recientes de las transferencias.** Lea los cambios de estado de cada transferencia del lote; se mantiene en memoria la fila más reciente por cada `transferId`. El equivalente FX sigue ejecutándose, con una lista de identificadores vacía:

```sql
SELECT * FROM transferStateChange
WHERE transferStateChange.transferId IN ('01JBVM16V1SZQX8B0JZ2N4ZDE4')
ORDER BY transferStateChangeId DESC;

SELECT * FROM fxTransferStateChange WHERE 1 = 0 ORDER BY fxTransferStateChangeId DESC;
```

**Paso 4 · Asignaciones de cuentas y modelos de liquidación.** Identifique el participante, la divisa y la cuenta de liquidación de cada cuenta de posición:

```sql
SELECT * FROM participantCurrency;                  -- in trx: getParticipantCurrencyByIds
SELECT * FROM settlementModel WHERE isActive = 1;   -- outside trx: SettlementModelCached.getAll
SELECT * FROM participantCurrency;                  -- in trx: getParticipantCurrencyByParticipantIds
```

**Paso 5 · Bloquear las posiciones.** El valor `getPositionsByAccountIdsForUpdate` bloquea las filas «POSITION» y «Liquidación» de todas las cuentas implicadas. **Los bloqueos de filas se mantienen hasta el paso 11**, por lo que los lotes que comparten el mismo número de serie «DFSP» se serializan aquí. Los importes de los beneficiarios y las reservas de divisas del lote se leen en el mismo momento (los importes de los beneficiarios son utilizados por los contenedores de confirmación, pero se leen para cada lote):

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

**Paso 6 · Límite de débito neto.** Introduzca el valor `participantLimit` para la cuenta:

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

**Paso 7 · Procesar los contenedores.** Para cada contenedor de cuenta, procese en el siguiente orden: fx-commit → fx-timeout → commit/reserve → abort → fx-abort → timeout-reserved → **prepare** → fx-prepare. Las liberaciones se aplican antes que las nuevas reservas, con respecto a una posición en ejecución. En memoria.

**Paso 8·`processPositionPrepareBin`.** La comprobación de la reserva para esta transferencia, con los saldos de Pinebank previos a la misma, se ejecuta en memoria:

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

**Paso 9 · Anote los resultados.** `updateParticipantPosition`, `bulkInsertTransferStateChanges` (`RESERVED`), una nueva lectura para obtener el nuevo `transferStateChangeId` (102) y, a continuación, `bulkInsertParticipantPositionChanges`:

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

**Paso 10 · Confirmación de los desplazamientos.** Realice la confirmación del último desplazamiento de cada partición (`Kafka.proceed` con `consumerCommit`) mientras la transacción siga abierta. No se realiza ningún acceso a la base de datos.

**Paso 11·`trx.commit()`.** Se liberan los bloqueos de fila:

```sql
COMMIT;
```

**Paso 12 · Notificar.** Para cada transferencia, genere un valor de `topic-notification-event` con `action: prepare`, el estado «éxito», `from: pinebank`, `to: riverwallet`, así como el contenido y el contexto originales. No se accede a la base de datos.

Ante cualquier excepción, la transacción se deshace. Las compensaciones ya confirmadas en el paso 10 no se revierten (véase [Semántica de entrega semantics](./reference.md#delivery-semantics-timeouts-and-recovery)]).

## H21 · Kafka `topic-notification-event`

Consumido por `ml-group-notification-event` (el gestor de notificaciones ml-api-adapter).

| Campo | Valor |
|---|---|
| Clave | ninguno |
| `from` / `to` | `pinebank` / `riverwallet` |
| `metadata.event` | `{ "type": "notification", "action": "prepare", "state": { "status": "success", "code": 0 } }` |
| `content` | Encabezados y carga útil originales de H16 |

## H22 · gestor de notificaciones → riverwallet SDK

`src/handlers/notification/index.js` `consumeMessage` → `processMessage`:

| # | Paso | Toques |
|---|---|---|
| 1 | Descifre la envoltura. Recupere los bytes originales a partir de `context.originalRequestPayload`, o con un Redis `GET` por `originalRequestId`. | (Redis) |
| 2 | La acción n.º `prepare`, con el estado «éxito», significa que se trata de un reenvío al Beneficiario. | — |
| 3 | Recupere el valor «`FSPIOP_CALLBACK_URL_TRANSFER_POST`» de riverwallet desde la Caché del Endpoint (en caso de fallo, desde el central-ledger admin API). | caché / HTTP |
| 4 | `createCallbackHeaders`: copia los encabezados originales FSPIOP, incluidos los de pinebank `FSPIOP-Signature`, `FSPIOP-URI` y `FSPIOP-HTTP-Method`. | — |
| 5 | `Callback.sendRequest` `POST /transfers` con los **bytes originales** y sin firma del Hub, tiempo de espera `HTTP_REQUEST_TIMEOUT_MS` (por defecto, 20 s). Cronometrado por `notification_event_delivery`. | HTTP |
| 6 | Registro `tx_transfer_prepare` (ahora − `timeApiPrepare`); grabe el desplazamiento. | Kafka |

La solicitud que recibe Riverwallet en el `https://riverwallet.example/fspiop/transfers` tiene exactamente el cuerpo de H16 y FSPIOP encabezados, por lo que Riverwallet puede verificar la firma de Pinebank de extremo a extremo:

**Solicitud:** `POST /transfers`

Encabezados:

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

Cuerpo:

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

**Respuesta:** `202 Accepted`

Las entregas fallidas se registran y no se vuelven a intentar. La transferencia permanece en `RESERVED` hasta que el Beneficiario responda o hasta que el controlador de tiempo de espera la dé por caducada.

## H23 · riverwallet SDK → riverwallet core

**Datos del beneficiario SDK** (`InboundTransfersModel.prepareTransfer`):

| # | Paso | Toques |
|---|---|---|
| 1 | Validación de entrada JWS (`VALIDATE_INBOUND_JWS`, activada por defecto): la clave se busca en `FSPIOP-Source` (pinebank); el `FSPIOP-URI` y el método del encabezado protegido deben coincidir con los de la solicitud. | — |
| 2 | Cargue la cotización guardada en H12, en posición `transferId` (o en posición `transactionId` del paquete ILP). Si no hay ninguna y `ALLOW_TRANSFER_WITHOUT_QUOTE=false`, devuelva un error. | SDK Redis |
| 3 | `CHECK_ILP`: el valor `condition` introducido debe coincidir con el de la Cotización. | — |
| 4 | `REJECT_TRANSFERS_ON_EXPIRED_QUOTES`: si la cotización ha caducado, envíe un `PUT /transfers/{ID}/error` con el código 3302. | — |
| 5 | Guardar estado n.º `PREPARE_RECEIVED`. | SDK Redis |
| 6 | Backend `POST /transfers`: el Sistema central contabiliza el abono a nombre del Beneficiario (solicitud más abajo). | HTTP |
| 7 | Tome el valor «`fulfilment`» de la cotización guardada y elabore la respuesta → H24. | — |

La solicitud del backend incluye la transferencia, la cotización acordada y el objeto de transacción ILP descodificado:

**Solicitud:** `POST /transfers`

Encabezados:

```json
{
  "Content-Type": "application/json",
  "Accept": "application/json"
}
```

Cuerpo:

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

**Respuesta:** `200 OK`

Encabezados:

```json
{
  "Content-Type": "application/json"
}
```

Cuerpo:

```json
{
  "homeTransactionId": "rw-20261015-004411",
  "transferState": "COMMITTED"
}
```

Si el sistema de fondo rechaza el abono, el beneficiario SDK envía `PUT /transfers/01JBVM16V1SZQX8B0JZ2N4ZDE4/error` con `5104` (transacción rechazada por el beneficiario) en lugar de H24. A continuación, el Hub cancela la transferencia y libera la reserva (`ABORTED_ERROR`).

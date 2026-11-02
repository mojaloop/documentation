---
i18n_source_sha: 9b0c6cf7a09a64dadd71a57746dc33bb3104e8d1
---

# Fase 2 · Cotización (H9–H15)

El pagador DFSP solicita al beneficiario DFSP las condiciones. El beneficiario DFSP responde indicando los importes y las tarifas, y los sella mediante un paquete ILP y una **condición**: el hash SHA-256 de un **Fulfilment** secreto que solo conoce el beneficiario DFSP. La transferencia en la fase 3 quedará vinculada a dicha condición.

**Almacenes de datos afectados:** `central_ledger` tablas de participantes y Endpoints (leídas por quoting-service), tablas de cotizaciones solo cuando son `SIMPLE_ROUTING_MODE=false`, y SDK y Redis en ambos lados. La posición del Libro mayor no se ve afectada.

## H9 · Pinebank SDK → quoting-service API

Construido por `OutboundTransfersModel._buildQuoteRequest`. El `transactionId` es el `transferId` creado en H1.

**Solicitud:** `POST /quotes`

Encabezados:

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

Cuerpo:

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

**Respuesta:** `202 Accepted`

**En el interior del quoting-service API** (`src/api/quotes.js` `post`): complementos de entrada; cree una envoltura con los encabezados, la carga útil y los bytes originales; genere → H10; devuelva `202`.

## H10 · Kafka `topic-quotes-post`

Consumido por el grupo `group-quotes-handler-post`. La envoltura contiene los encabezados H9 y los bytes de la solicitud original, con `metadata.event = { type: "quote", action: "post" }`.

## H11 · gestor de cotizaciones → riverwallet SDK

**Dentro del controlador de comillas** (`src/model/quotes.js` `handleQuoteRequest`):

El código SQL es SQL directo en `central_ledger`. Cada resultado se almacena en la memoria caché durante 60 s, por lo que solo se ejecuta cuando se produce una falta de caché.

**Paso 1 · `validateQuoteRequest`.** El beneficiario `riverwallet` debe tener una cuenta POSITION activa en USD (o, si se ha establecido el valor `payer.supportedCurrencies`, el pagador debe tener una por cada divisa):

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

Si el valor es `SIMPLE_ROUTING_MODE=true`, la misma consulta también se ejecuta para `payer.partyIdInfo.fspId` y `payee.partyIdInfo.fspId` cuando difieren de `FSPIOP-Source` y `FSPIOP-Destination`. En este ejemplo coinciden, por lo que se omiten esas comprobaciones.

**Paso 2 · `executeRules`.** El motor de reglas del Esquema de pagos puede reescribir o rechazar la solicitud. No se accede a la base de datos.

**Paso 3 · Persistir (solo cuando sea `SIMPLE_ROUTING_MODE=false`).** `checkDuplicateQuoteRequest`, búsquedas en la enumeración; a continuación, una Transacción para insertar `quoteDuplicateCheck`, `transactionReference`, `quote`, `quoteParty` (×2) y, si están presentes, `quoteExtension` y `geoCode`. Se omite por defecto: el Hub valida y realiza el enrutamiento de las cotizaciones, pero no las almacena.

**Paso 4 · `forwardQuoteRequest`.** Resuelva el `FSPIOP_CALLBACK_URL_QUOTES` de Riverwallet y envíe el `POST {endpoint}/quotes` con el cuerpo y los encabezados originales:

```sql
SELECT participantEndpoint.value
FROM participantEndpoint
INNER JOIN participant  ON participant.participantId   = participantEndpoint.participantId
INNER JOIN endpointType ON endpointType.endpointTypeId = participantEndpoint.endpointTypeId
WHERE participant.name = 'riverwallet'
  AND endpointType.name = 'FSPIOP_CALLBACK_URL_QUOTES'
  AND participantEndpoint.isActive = 1;
```

**Paso 5 · Realice la confirmación del desplazamiento Kafka.** No se accede a la base de datos.

La solicitud reenviada es H9 sin modificaciones (mismo cuerpo, mismas cabeceras, misma firma de Pinebank), enviada a `https://riverwallet.example/fspiop/quotes`. La respuesta SDK de riverwallet responde a la `202 Accepted`.

## H12 · riverwallet SDK → riverwallet core

**Datos del beneficiario SDK** (`InboundTransfersModel.quoteRequest`):

1. Valide el valor de entrada JWS (`VALIDATE_INBOUND_JWS=true` por defecto) con la clave pública de Pinebank.
2. Solicite los términos al backend (a continuación se muestran la solicitud y la respuesta).
3. Elabore el material del ILP a partir de la solicitud y de las condiciones del backend (véase más abajo).
4. Anote «`{ request, mojaloopResponse, fulfilment }`» en la casilla «SDKRedis», debajo del número de presupuesto y del ID de la Transacción, para utilizarlo en H23.

La solicitud y la respuesta del backend:

**Solicitud:** `POST /quoterequests`

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

El material del ILP (sdk-standard-components `src/lib/ilp/IlpV4.js`):

```text
transactionObject = { transactionId, quoteId, payee, payer, amount, transactionType, … }
ilpPacket  = ILP v4 Prepare { amount (minor units), destination (ILP address), expiresAt, data: transactionObject }
fulfilment = HMAC-SHA256(key = ILP secret, msg = base64(transactionObject))     # 32 bytes, kept secret
condition  = base64url(SHA-256(fulfilment))                                    # published
```

## H13 · riverwallet SDK → quoting-service API

**Solicitud:** `PUT /quotes/01JBVM13SQYP507JB1DYBZVCMF`

Encabezados:

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

Cuerpo:

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

**Respuesta:** `200 OK`

El API ejecuta los complementos de entrada, genera → H14 y devuelve `200`.

## H14 · Kafka `topic-quotes-put`

Consumido por el grupo `group-quotes-handler-put`, con `metadata.event = { type: "quote", action: "put" }`.

## H15 · gestor de cotizaciones → pinebank SDK

**Dentro del controlador de comillas** (`handleQuoteUpdate`). La instrucción SQL solo se ejecuta cuando se produce una falta de Caché.

**Paso 1 · `validateQuoteUpdate`.** El remitente (`FSPIOP-Source: riverwallet`) debe disponer de una cuenta POSITION activa en la moneda del Beneficiario:

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

**Paso 2 · Persistir (solo cuando sea `SIMPLE_ROUTING_MODE=false`).** `checkDuplicateQuoteResponse` y `createQuoteResponse` (más una fila de paquetes ILP). Se omite por defecto.

**Paso 3 · `forwardQuoteUpdate`.** Resuelva el `FSPIOP_CALLBACK_URL_QUOTES` de Pinebank y reenvíe el `PUT` con los bytes originales. La solicitud es H13 sin modificaciones, enviada a `https://pinebank.example/fspiop/quotes/01JBVM13SQYP507JB1DYBZVCMF`.

```sql
SELECT participantEndpoint.value
FROM participantEndpoint
INNER JOIN participant  ON participant.participantId   = participantEndpoint.participantId
INNER JOIN endpointType ON endpointType.endpointTypeId = participantEndpoint.endpointTypeId
WHERE participant.name = 'pinebank'
  AND endpointType.name = 'FSPIOP_CALLBACK_URL_QUOTES'
  AND participantEndpoint.isActive = 1;
```

El servidor de entrada del pagador SDK valida el JWS y publica la llamada de retorno al modelo en espera. El modelo almacena el `quoteResponse` (incluido el `condition`), pasa al `quoteReceived` y, a continuación, o bien continúa (`AUTO_ACCEPT_QUOTES=true`) o bien devuelve el `WAITING_FOR_QUOTE_ACCEPTANCE` al sistema bancario central.

### Función de llamada de retorno en caso de error en la cotización

Si el beneficiario DFSP rechaza la operación (por ejemplo, si su sistema de fondo rechaza la cotización), envía un mensaje de error en lugar de H13, y el Hub lo reenvía a Pinebank sin modificaciones. No se ha reservado nada.

**Solicitud:** `PUT /quotes/01JBVM13SQYP507JB1DYBZVCMF/error`

Encabezados:

```json
{
  "Content-Type": "application/vnd.interoperability.quotes+json;version=2.0",
  "Date": "Thu, 15 Oct 2026 09:30:03 GMT",
  "FSPIOP-Source": "riverwallet",
  "FSPIOP-Destination": "pinebank",
  "FSPIOP-Signature": "{\"signature\":\"…\",\"protectedHeader\":\"…\"}"
}
```

Cuerpo:

```json
{
  "errorInformation": {
    "errorCode": "5101",
    "errorDescription": "Payee rejected quote"
  }
}
```

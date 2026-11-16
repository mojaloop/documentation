---
i18n_source_sha: c4545bcb73d009c2669ecfc00f4e11958ff20357
---

# Fase 1 · Descubrimiento (H1–H8)

Discovery asocia el identificador del beneficiario (`MSISDN 255700000111`) al DFSP que lo contiene (`riverwallet`) y a los datos de la parte que devuelve DFSP.

**Almacenes de datos afectados:** base de datos ALS (configuración de Oracle, lectura), base de datos Oracle (lectura), `central_ledger` tablas de participantes y Endpoints (lectura a través del administrador API), SDK Redis en ambos lados. No hay Kafka tráfico ni escritura en el Libro mayor.

## H1 · Pinebank Core → Pinebank SDK

`POST /transfers` en el sdk-scheme-adapter **de salida** API. Se trata de la interfaz privada, simplificada y síncrona del DFSP; no es el FSPIOP y no está firmada.

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

**Dentro del pagador SDK** (`modules/api-svc/src/lib/model/OutboundTransfersModel.js`):

1. Cree `transferId` (un ULID por defecto) y una instancia de máquina de estados en el estado `start`. Este mismo valor se utilizará posteriormente como el `transactionId` de la cotización.
2. Conserve el estado del modelo en **Redis** bajo el ID de transferencia. Se guarda de nuevo tras cada transición, de modo que un SDK reiniciado pueda reanudarse.
3. Ejecute la transición `resolvePayee` → H2.

El SDK convierte las llamadas de retorno asíncronas del Hub en una espera síncrona. Antes de cada llamada saliente FSPIOP, se suscribe a un canal pub/sub Redis identificado por la solicitud (por ejemplo, `tf_<transferId>` para las transferencias). Su servidor de entrada publica la llamada de retorno correspondiente en ese canal cuando esta llega.

La respuesta «HTTP» a H1 solo se devuelve después de H30 cuando `AUTO_ACCEPT_PARTY` y `AUTO_ACCEPT_QUOTES` tienen el valor `true` (los valores predeterminados):

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

Si el valor es `AUTO_ACCEPT_PARTY=false`, H1 vuelve antes con el valor `"currentState": "WAITING_FOR_PARTY_ACCEPTANCE"` tras H8. A continuación, el sistema bancario central continúa con los valores `PUT /transfers/01JBVM16V1SZQX8B0JZ2N4ZDE4` y `{ "acceptParty": true }`.

## H2 · Pinebank SDK → ALS

Aún no se conoce el beneficiario DFSP, por lo que no hay `FSPIOP-Destination`. El `GET` carece de contenido.

**Solicitud:** `GET /parties/MSISDN/255700000111`

Encabezados:

```json
{
  "Content-Type": "application/vnd.interoperability.parties+json;version=2.0",
  "Accept": "application/vnd.interoperability.parties+json;version=2",
  "Date": "Thu, 15 Oct 2026 09:30:00 GMT",
  "FSPIOP-Source": "pinebank",
  "traceparent": "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01"
}
```

**Respuesta:** `202 Accepted`

**Inside ALS** (`src/domain/parties/getPartiesByTypeAndID.js` → `services/GetPartiesService.js`):

1. Complementos de Ingress (véase [Hub HTTP ingress](./README.md#hub-http-ingress)). ALS responde `202` de inmediato y el procesamiento continúa de forma asíncrona.
2. `validateRequester()`: búsqueda del participante `pinebank` (primero en la Caché y, a continuación, por parte del administrador API). Si pinebank es desconocido o está inactivo, ALS envía una llamada de retorno de error a pinebank.
3. No existe el encabezado «`FSPIOP-Destination`», por lo que ALS consulta el oráculo → H3.

## H3 · ELA → oráculo

**Inside ALS** (`src/models/oracle/facade.js` `oracleRequest`):

**Paso 1 · `determineOracleEndpoint()`.** Busque el oráculo URL para el tipo de parte `MSISDN` (y la divisa, si se ha especificado) en la base de datos ALS, a través de una caché en memoria (`oracleEndpointCached`). Si no se encuentra en la caché, se ejecuta la consulta que figura a continuación. Si la solicitud incluye una divisa, `getOracleEndpointByTypeAndCurrency` añade `INNER JOIN currency` y una condición `cu.currencyId`.

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

**Paso 2 · Llame al oráculo.** El oráculo (por ejemplo, als-msisdn-oracle-svc) busca el número en su propia base de datos.

**Solicitud:** `GET /participants/MSISDN/255700000111`

Encabezados:

```json
{
  "Content-Type": "application/vnd.interoperability.participants+json;version=2.0",
  "Accept": "application/vnd.interoperability.participants+json;version=2",
  "Date": "Thu, 15 Oct 2026 09:30:00 GMT",
  "FSPIOP-Source": "pinebank"
}
```

El oráculo API es síncrono:

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
  "partyList": [
    { "fspId": "riverwallet" }
  ]
}
```

Un valor «`partyList`» vacío da por finalizada la búsqueda con el error `3204` (no se ha encontrado la parte) en Pinebank.

Las comprobaciones de participantes en ALS (la `validateRequester` en H2 y las comprobaciones en H4 y H6) no consultan directamente una base de datos. Pasan por el central-ledger admin API, que ejecuta las consultas que se muestran en [Búsquedas de participantes y Endpointslookups](./README.md#participant-and-endpoint-lookups).

## H4 · ALS → riverwallet SDK

**Inside ALS** (`GetPartiesService`):

1. `#filterOraclePartyList` elimina las entradas cuyo sub-ID o tipo no coincidan con la solicitud.
2. `#processSingleOracleParty` comprueba que `riverwallet` sea un participante y recupera su `FSPIOP_CALLBACK_URL_PARTIES_GET` de la caché de Endpoints.
3. ALS reenvía la solicitud con los encabezados originales (`FSPIOP-Source: pinebank`) y añade `FSPIOP-Destination: riverwallet`.

**Solicitud:** `GET /parties/MSISDN/255700000111`

Encabezados:

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

**Respuesta:** `202 Accepted`

## H5 · riverwallet SDK → riverwallet core

**Dentro del beneficiario SDK** (`InboundTransfersModel.getParties`): el SDK llama a su backend API y asigna la respuesta a un objeto FSPIOP `party`.

**Solicitud:** `GET /parties/MSISDN/255700000111`

Encabezados:

```json
{
  "Accept": "application/json"
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

RiverWallet responde a la consulta. A partir de este momento, todos los mensajes redactados por DFSP se firman con JWS (`JWS_SIGN=true`; el valor predeterminado es SDK).

**Solicitud:** `PUT /parties/MSISDN/255700000111`

Encabezados:

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

Cuerpo:

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

**Respuesta:** `200 OK`

**Inside ALS** (`PutPartiesService`): complementos de entrada; validar al Participante de origen; resolver el punto `FSPIOP_CALLBACK_URL_PARTIES_PUT` del punto `pinebank`.

## H7 · ALS → Pinebank SDK

ALS reenvía el cuerpo y los encabezados del `PUT /parties` sin modificaciones, incluido el `FSPIOP-Signature` de riverwallet. La solicitud es la misma que la de H6, enviada al `https://pinebank.example/fspiop/parties/MSISDN/255700000111`. El SDK de pinebank responde al `200 OK`.

## H8 · pinebank SDK interno

El servidor de entrada «SDK» recibe el «`PUT`». Valida el «JWS» únicamente si se cumple la condición «`VALIDATE_INBOUND_PUT_PARTIES_JWS=true`» (el valor por defecto es «`false`») y, a continuación, publica la llamada de retorno en el canal «Redis» en el que el modelo de salida está a la espera.

El modelo almacena un `getPartiesResponse` y pasa de `start` a `payeeResolved`. A continuación, o bien continúa (`AUTO_ACCEPT_PARTY=true`), o bien devuelve un `WAITING_FOR_PARTY_ACCEPTANCE` al sistema bancario central y espera a `PUT /transfers/{ID}` con `{ "acceptParty": true }`.

### Llamada de retorno en caso de error de detección

Si el oráculo no contiene ninguna entrada, o si el beneficiario DFSP responde con un error, el pagador recibe una llamada de retorno de error en lugar de H7:

**Solicitud:** `PUT /parties/MSISDN/255700000111/error`

Encabezados:

```json
{
  "Content-Type": "application/vnd.interoperability.parties+json;version=2.0",
  "Date": "Thu, 15 Oct 2026 09:30:01 GMT",
  "FSPIOP-Source": "Hub",
  "FSPIOP-Destination": "pinebank"
}
```

Cuerpo:

```json
{
  "errorInformation": {
    "errorCode": "3204",
    "errorDescription": "Party not found"
  }
}
```

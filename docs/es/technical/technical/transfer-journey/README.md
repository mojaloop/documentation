---
i18n_source_sha: 33493d783aa31fad99824815bca2f5fb837d1fb7
---

# Trayectoria de transferencia

En esta sección se describe el recorrido de una transferencia P2P de FSPIOP a través de un Mojaloop Hub, salto a salto. Para cada salto, se muestran la HTTP solicitud (encabezados y cuerpo) o el Kafka mensaje, la respuesta y lo que hace con ella cada servicio, controlador, Kafka tema, Caché y tabla de base de datos.

| Página | Lúpulo | Portadas |
|---|---|---|
| [Fase 1 · Descubrimiento](./discovery.md) | H1–H8 | Asignación de un MSISDN al beneficiario DFSP y a la parte |
| [Fase 2 · Cita](./quote.md) | H9–H15 | Acuerdo sobre las condiciones; creación de la condición del ILP y su Fulfilment |
| [Fase 3 · Preparación de la transferencia prepare](./transfer-prepare.md) | H16–H23 | Validación, contabilización y reserva de fondos; transferencia al Beneficiario |
| [Fase 3 · Cumplir con la transferencia y confirmar commit](./transfer-fulfil.md)] | H24–H31 | Comprobar el Fulfilment, confirmar el compromiso y notificarlo a ambas partes |
| [Referencia](./reference.md) | — | Máquina de estados, Kafka temas, enrutamiento de notificaciones, duplicados, tiempos de espera, seguridad, configuración, métricas, fallos, códigos de error, glosario |

## Ámbito de aplicación

En esta sección se describe una transferencia en una sola moneda, iniciada por el pagador, en modo «FSPIOP v2.0». Se utiliza el gestor de posiciones por lotes, tal y como lo implementan los esquemas Mojaloop y Helm. Las transferencias de divisas, masivas, de solicitud de pago y las transferencias proxy entre esquemas comparten la mayor parte de este proceso, pero añaden pasos que no se tratan aquí.

## Ejemplo utilizado a lo largo del texto

`pinebank` (el pagador DFSP) envía 50,00 USD al MSISDN `255700000111`. Ese número pertenece a `riverwallet` (el beneficiario DFSP). Ambos DFSP ejecutan el [SDK adapter](../sdk-scheme-adapter/) (Mojaloop Conector) delante de sus sistemas centrales.

Todos los identificadores, claves y URL son meramente ilustrativos. En todas las páginas se utilizan los mismos valores, por lo que puede seguir el recorrido de una solicitud a lo largo de todos los saltos:

| Valor | Ejemplo |
|---|---|
| Pagador DFSP | `pinebank` |
| Beneficiario DFSP | `riverwallet` |
| Nombre del participante en el Hub | `Hub` (`HUB_PARTICIPANT.NAME`) |
| Identificador del beneficiario | `MSISDN` / `255700000111` |
| `homeTransactionId` (núcleo de pagadores) | `pb-20261015-000123` |
| `transferId` = `transactionId` | `01JBVM16V1SZQX8B0JZ2N4ZDE4` |
| `quoteId` | `01JBVM13SQYP507JB1DYBZVCMF` |
| `condition` | `HpSoVzas3jljddyOns0pxImmOgXR2GlQPAmm66TKLbc` |
| `fulfilment` | `ax8KPpwtT4obflw9Kp8OjXxrWk8-LRwLmo9-bVxLOik` |
| Cuenta de POSICIÓN / LIQUIDACIÓN de Pinebank en USD (`participantCurrencyId`) | `3` / `4` |
| Cuenta de POSICIÓN / Liquidación en USD de riverwallet | `5` / `6` |
| `participantId`: Hub / Pinebank / Riverwallet | `1` / `2` / `3` |
| `participantPositionId` | Igual que el `participantCurrencyId` de la cuenta |
| `transferStateChangeId`: `RECEIVED_PREPARE` / `RESERVED` / `RECEIVED_FULFIL` / `COMMITTED` | `101` / `102` / `103` / `104` |
| Abierto`settlementWindowId` | `12` |

El `condition` y el `fulfilment` mencionados anteriormente forman un par real: `condition = base64url(SHA-256(base64url-decode(fulfilment)))`. Los paquetes ILP y los JWS valores de firma se han truncado (`…`) en las muestras.

## Base de origen

El comportamiento aquí descrito se ha detectado en las siguientes versiones:

* ml-api-adapter, v16.11.1
* central-ledger v20.2.0
* account-lookup-service v17.16.6
* quoting-service v17.15.0
* servicios-centrales-compartidos v18.39.1
* sdk-scheme-adapter v24.20.0, con sus componentes estándar del SDK incluidos

Las rutas de los archivos son relativas a la raíz de cada repositorio. Las formas «API» siguen las especificaciones del adaptador «FSPIOP» v2.0 y «SDK» v2.1.0 que figuran en [api-snippets](https://github.com/mojaloop/api-snippets)].

## Lectura del código SQL

En los pasos que alcanzan el valor MySQL, cada paso muestra el código SQL que se ejecuta directamente debajo de ese paso; los pasos sin código SQL indican «Sin acceso a la base de datos». El código SQL se generó al procesar los generadores de consultas propios de los Servicios con el dialecto `mysql2` de Knex, utilizando los valores de ejemplo anteriores, y posteriormente se formateó para facilitar su lectura. Hay dos aspectos que difieren de lo que vería en el registro general «MySQL»:

* Los servicios envían sentencias parametrizadas; en los ejemplos se muestran los valores integrados en el código.
* El código SQL es tal y como lo genera Knex, no tal y como aparece en el código fuente. Por ejemplo, el `Db.from('participant').find({})` se convierte en `SELECT * FROM participant`.

Los ejemplos parten de los valores predeterminados del Hub: `CACHE.CACHE_ENABLED=false` en central-ledger, quoting-service con el almacenamiento en caché activado y `SIMPLE_ROUTING_MODE=true`. Con central-ledger y el almacenamiento en caché desactivado, cada consulta de un participante reconstruye su «caché» a partir de una **lectura completa de la tabla**, por lo que `SELECT * FROM participant` y `SELECT * FROM participantCurrency` aparecen muchas veces por transferencia. Al habilitar el valor `CACHE.CACHE_ENABLED`, esas lecturas se sustituyen por búsquedas en memoria (TTL `CACHE.EXPIRES_IN_MS`).

## Todo el recorrido en una sola página

Cada flecha representa un salto, numerado del H1 al H31 para que coincida con las páginas de fases. Las flechas continuas corresponden a HTTP; las flechas discontinuas, a Kafka.

![Transfer journey sequence](./assets/diagrams/seq-transfer-journey.svg)

## FSPIOP encabezados utilizados en los ejemplos

Cada solicitud «FSPIOP» de esta sección incluye los encabezados que se indican a continuación. Los ejemplos de las demás páginas los enumeran en su totalidad en el primer salto de cada tipo. A partir de ahí, solo se indican los valores que varían.

| Encabezado | Obligatorio | Ejemplo | Notas |
|---|---|---|---|
| `Content-Type` | Sí | `application/vnd.interoperability.transfers+json;version=2.0` | Versión «Resource» y «API». La validación del encabezado del Hub rechaza las versiones no compatibles con un código de estado 400. |
| `Accept` | Solo solicitudes (no en las devoluciones de llamada) | `application/vnd.interoperability.transfers+json;version=2` | Versiones que el remitente acepta en la llamada de retorno |
| `Date` | Sí | `Thu, 15 Oct 2026 09:30:00 GMT` | Formato RFC 7231; validado en la entrada |
| `FSPIOP-Source` | Sí | `pinebank` | El «DFSP» que redactó el mensaje. Se ha cotejado con los datos de los participantes y, si está habilitado, con el «JWS». |
| `FSPIOP-Destination` | Cuando se conoce | `riverwallet` | Se omite el valor «`GET /parties`» cuando aún no se conoce el beneficiario DFSP |
| `FSPIOP-Signature` | Cuando está activada la opción «JWS» | `{"signature":"…","protectedHeader":"…"}` | JWS independiente del cuerpo y encabezados protegidos; véase [Referencia · Controles de seguridad](./reference.md#security-controls-by-hop) |
| `FSPIOP-URI` | Con unJWS | `/transfers` | Incluido en la firma |
| `FSPIOP-HTTP-Method` | Con unJWS | `POST` | Incluido en la firma |
| `traceparent` / `tracestate` | Opcional | `00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01` | Contexto de seguimiento del W3C. El Hub suma `timeApiPrepare` / `timeApiFulfil` a `tracestate`. |

El valor FSPIOP es asíncrono. El Hub confirma una solicitud con el valor `202 Accepted` (para los valores `POST` y `GET`) o `200 OK` (para los valores `PUT` y `PATCH`) y un cuerpo vacío. La respuesta de negocio siempre llega más tarde, como una llamada de retorno independiente al Endpoint que haya registrado el destinatario.

## La maquinaria reutiliza cada lúpulo

Hay tres mecanismos que se repiten en casi todos los saltos. A continuación se describen una vez.

### Entrada del Hub HTTP

ALS, el quoting-service, el API y el ml-api-adapter, API son todos servidores Hapi que utilizan la misma cadena de complementos de «central-services-shared»:

1. **Validación del encabezado** (`src/util/hapi/plugins/headerValidation.js`): comprueba que `Date` esté presente y sea válido, que `Content-Type` y `Accept` incluyan una versión FSPIOP compatible, y que la carga útil no supere el límite de tamaño. En caso de fallo, se devuelve el código HTTP 400 con un cuerpo de error FSPIOP.
2. **Validación OpenAPI** (`openapiBackendValidator.js`): comprueba que el cuerpo, la ruta y la consulta se ajusten a la especificación FSPIOP.
3. **Captura de la carga útil sin procesar** (`rawPayloadToDataUri.js`): conserva los bytes exactos de la solicitud como datos Base64 URI (`request.dataUri`) junto con el cuerpo analizado. Estos son los bytes que el remitente ha firmado.
4. **Complemento de eventos**: abre un tramo de seguimiento a partir de los encabezados de seguimiento W3C entrantes.

Un error de validación en la entrada se responde de forma sincrónica:

**Respuesta:** `400 Bad Request`

Encabezados:

```json
{
  "Content-Type": "application/json"
}
```

Cuerpo:

```json
{
  "errorInformation": {
    "errorCode": "3101",
    "errorDescription": "Malformed syntax - Invalid date header"
  }
}
```

### Kafka gestores de nodo

El gestor de cotizaciones, los gestores «central-ledger» y el gestor de notificaciones siguen todos el mismo bucle (consumidor de «central-services-stream», «central-services-shared `Util.Kafka`»):

1. Recuperar un mensaje del tema (o un lote, en el caso de «position-batch»).
2. Descifre el envoltorio y la carga útil en base64.
3. Realice las tareas propias de la etapa: consultas a la Caché, lecturas de la base de datos y una Transacción de base de datos.
4. Llame a `Kafka.proceed(…)`. Esto **confirma primero el desplazamiento consumido** y, a continuación, genera el siguiente mensaje, con una clave de mensaje opcional. El tema de destino se elige mediante el patrón `topic-{functionality}-{action}` o mediante una anulación.

Todos los mensajes internos utilizan el mismo sobre (`StreamingProtocol.createMessage`). Este es el mensaje que el ml-api-adapter envía al `topic-transfer-prepare` en H17:

```json
{
  "id": "01JBVM16V1SZQX8B0JZ2N4ZDE4",
  "from": "pinebank",
  "to": "riverwallet",
  "type": "application/json",
  "content": {
    "uriParams": { "id": "01JBVM16V1SZQX8B0JZ2N4ZDE4" },
    "headers": {
      "content-type": "application/vnd.interoperability.transfers+json;version=2.0",
      "date": "Thu, 15 Oct 2026 09:30:05 GMT",
      "fspiop-source": "pinebank",
      "fspiop-destination": "riverwallet",
      "fspiop-signature": "{\"signature\":\"…\",\"protectedHeader\":\"…\"}",
      "fspiop-uri": "/transfers",
      "fspiop-http-method": "POST",
      "traceparent": "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01"
    },
    "payload": "data:application/vnd.interoperability.transfers+json;version=2.0;base64,eyJ0cmFuc2Zlcklk…",
    "context": {
      "originalRequestPayload": "data:application/vnd.interoperability.transfers+json;version=2.0;base64,eyJ0cmFuc2Zlcklk…",
      "originalRequestId": "01JBVM16V1SZQX8B0JZ2N4ZDE4"
    }
  },
  "metadata": {
    "correlationId": "01JBVM16V1SZQX8B0JZ2N4ZDE4",
    "event": {
      "id": "6f1c2b9e-3a4d-4e8f-9b0a-1c2d3e4f5a6b",
      "type": "prepare",
      "action": "prepare",
      "createdAt": "2026-10-15T09:30:05.112Z",
      "state": { "status": "success", "code": 0, "description": "action successful" }
    },
    "trace": {
      "traceId": "4bf92f3577b34da6a3ce929d0e0e4736",
      "spanId": "b7ad6b7169203331",
      "tags": { "tracestate": "acmevendor=eyJzcGFuSWQiOiJiN2FkNmI3MTY5MjAzMzMxIiwidGltZUFwaVByZXBhcmUiOiIxNzYwNTIwNjA1MTEyIn0=" }
    }
  }
}
```

En las fases posteriores solo se modifican el `metadata.event` (`type` y `action`) y, cuando sea necesario, la clave de mensaje Kafka. Las páginas de las fases muestran únicamente esas diferencias.

Los bytes originales firmados del DFSP se transmiten dentro del mensaje, por lo que el Hub puede reenviarlos sin modificaciones. De forma predeterminada, se transmiten en línea, tanto en `content.payload` como en `context.originalRequestPayload`. En el caso de `PAYLOAD_CACHE.enabled=true` y `ORIGINAL_PAYLOAD_STORAGE=redis`, ml-api-adapter los almacena en Redis bajo el ID de la solicitud, mientras que `context` solo transmite `originalRequestId`.

### Búsquedas de participantes y criterios de valoración

Cada servicio necesita conocer dos datos sobre un DFSP: si existe y está activo, y cuál es su callback URL para este tipo de mensaje.

| Servicios | Datos del participante / de la cuenta | URL de devolución de llamada |
|---|---|---|
| ELA, ml-api-adapter | central-ledger admin API `GET /participants/{name}`, Caché en mémoire (TTL predeterminado de ALS: 3 s) | central-ledger admin API `GET /participants/{name}/endpoints`, caché en mémoire (TTL prédéterminé : 180 s) |
| quoting-service | SQL directo en el esquema `central_ledger` (`participant` ⨝ `participantCurrency`), caché en memoria (por defecto, 60 s) | SQL directo en `participantEndpoint`, misma Caché |
| central-ledger manipuladores | Modelos `participant`, `participantCurrency`, `participantLimit` hasta `*Cached`. Con el valor `CACHE.CACHE_ENABLED=false` (el predeterminado), cada consulta se recarga a partir del MySQL. | — |

La consulta de Endpoint que realiza el ml-api-adapter al central-ledger admin API:

**Solicitud:** `GET /participants/riverwallet/endpoints`

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
[
  { "type": "FSPIOP_CALLBACK_URL_TRANSFER_POST", "value": "https://riverwallet.example/fspiop/transfers" },
  { "type": "FSPIOP_CALLBACK_URL_TRANSFER_PUT", "value": "https://riverwallet.example/fspiop/transfers/{{transferId}}" },
  { "type": "FSPIOP_CALLBACK_URL_TRANSFER_ERROR", "value": "https://riverwallet.example/fspiop/transfers/{{transferId}}/error" }
]
```

Cuando ALS o ml-api-adapter no encuentra la entrada en la Caché, el central-ledger, administrado por API, atiende estas consultas desde `central_ledger`.

**Consultas a la base de datos** (central-ledger admin API, `CACHE.CACHE_ENABLED=false`):

```sql
-- GET /participants/riverwallet  (domain getByName: participant, then its accounts)
SELECT * FROM participant ORDER BY name ASC;
SELECT * FROM participantCurrency ORDER BY participantCurrencyId ASC;
-- ...plus the enum tables (ledgerAccountType and others), reloaded through enumCached

-- GET /participants/riverwallet/endpoints  (domain getAllEndpoints)
SELECT * FROM participant ORDER BY name ASC;
SELECT participantEndpoint.*, et.name
FROM participantEndpoint
INNER JOIN endpointType AS et ON participantEndpoint.endpointTypeId = et.endpointTypeId
WHERE participantEndpoint.participantId = 3
  AND participantEndpoint.isActive = 1;
```

Los valores de los Endpoints son «URL» plantillas generadas por solicitud. Por ejemplo, «`FSPIOP_CALLBACK_URL_TRANSFER_PUT`» se convierte en «`https://riverwallet.example/fspiop/transfers/01JBVM16V1SZQX8B0JZ2N4ZDE4`».

---

> **Aviso sobre la asistencia de IA**
> Para la elaboración de parte de este documento se han utilizado herramientas de inteligencia artificial.
> Herramientas utilizadas: Claude Code (Claude Opus 5.5).
> Alcance: redacción y estructuración de las páginas sobre el proceso de transferencia a partir de las notas de seguimiento del código fuente; generación de ejemplos de encabezados y cuerpos.
> Todo el contenido generado por IA ha sido revisado, comprendido y validado por el autor.

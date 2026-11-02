---
i18n_source_sha: 69e91057138ddd347bb9c55eb3a69ce6185b471e
---

# Referencia del trayecto de transferencia

Tablas de referencia para el trayecto de transferencia. Los números de hop (H1–H31) hacen referencia a las [páginas de fase pages](./README.md).

## Máquina de estados de transferencia de transferencia

Estos son los estados internos (`TransferInternalState`, «central-services-shared» `src/enums/transfers.js`), almacenados en `transferStateChange` filas.

![Transfer state machine](./assets/diagrams/state-transfer.svg)

| Estado interno | Estado API | Escrito por |
|---|---|---|
| `RECEIVED_PREPARE` | RECIBIDO | `TransferFacade.saveTransferPrepared` |
| `INVALID` | ABORTADO | `saveTransferPrepared` |
| `RESERVED` | RESERVADO | `domain/position/prepare.js` |
| `ABORTED_REJECTED` | ABORTADO | `domain/position/prepare.js` |
| `RECEIVED_FULFIL` | RESERVADO | `TransferFacade.savePayeeTransferResponse` |
| `RECEIVED_ERROR` | RESERVADO | `savePayeeTransferResponse` |
| `COMMITTED` | COMPROMETIDOS | `domain/position/fulfil.js` |
| `ABORTED_ERROR` | ABORTADO | `domain/position/abort.js` |
| `EXPIRED_PREPARED` | ABORTADO | `TransferFacade._processTimeoutEntries` |
| `RESERVED_TIMEOUT` | RESERVADO | `_processTimeoutEntries` |
| `EXPIRED_RESERVED` | ABORTADO | `domain/position/timeout-reserved.js` |

## Operaciones en la base de datos por transferencia

Se han generado sentencias contra MySQL para esta única transferencia con la configuración predeterminada (`CACHE.CACHE_ENABLED=false`, `PROXY_CACHE.enabled=true`, `SIMPLE_ROUTING_MODE=true`), sin contar las central-ledger llamadas de administración API realizadas a través de ALS ni las ml-api-adapter faltas de caché. El código SQL completo figura en la página de cada fase.

| Lúpulo | Servicios | Lecturas | Escribe | Transacción |
|---|---|---|---|---|
| H3 | ELA | 1 (`oracleEndpoint`, en caso de fallo de caché) | — | — |
| H11, H15 | quoting-service | 2 en cada caso (cuenta de Participante, Endpoint; en caso de fallo de Caché) | — | — |
| H18 | preparar el controlador | 6×`participant`, 4×`participantCurrency` (tabla completa), 3 Búsquedas de cuenta, comprobación de duplicados, `fxWatchList` | `transferDuplicateCheck` y, a continuación, 5 inserciones | Solo insertos |
| H₂O | posición-lote | 2× `transferStateChange`, 2× `participantCurrency` (tabla completa), `settlementModel`, `participantPosition FOR UPDATE`, `transferParticipant`, límite NDC, consultas de divisas vacías | 1 actualización, 2 inserciones | Lote completo |
| H26 | gestor de Fulfilment | `getById`. alta; `transferExtension`. comprobación de duplicados; `settlementWindow`. `fxWatchList`. Búsqueda de cuenta del Beneficiario | `transferFulfilmentDuplicateCheck` y, a continuación, 2 inserciones | Solo insertos (la lectura de la ventana se realiza desde el exterior) |
| H28 | posición-lote | Como H₂O | 1 actualización, 2 inserciones | Lote completo |

## Kafka temas, grupos y claves

| Tema | Productor | Asociación de consumidores | Clave | Lúpulo |
|---|---|---|---|---|
| `topic-quotes-post` | quoting-service API | `group-quotes-handler-post` | — | H10 |
| `topic-quotes-put` | quoting-service API | `group-quotes-handler-put` | — | H14 |
| `topic-transfer-prepare` | ml-api-adapter API | `cl-group-transfer-prepare` | — | H17 |
| `topic-transfer-position-batch` | preparar, ejecutar, controladores de tiempo de espera | `cl-group-transfer-position-batch` | Cuenta de posición `participantCurrencyId`: la del Pagador para «preparar», «cancelar» o «tiempo de espera», y la del Beneficiario para «confirmación (commit)» | H19, H27 |
| `topic-transfer-fulfil` | ml-api-adapter API | `cl-group-transfer-fulfil` | — | H25 |
| `topic-notification-event` | central-ledger manipuladores | `ml-group-notification-event` | — | H21, H29 |
| `topic-transfer-get` | ml-api-adapter API | `cl-group-transfer-get` | — | `GET /transfers/{ID}` |

Los nombres de los temas siguen al `topic-{functionality}-{action}`. Las rutas central-ledger's `KAFKA.EVENT_TYPE_ACTION_TOPIC_MAP.POSITION.*` dirigen las acciones de asignación al tema de lotes. Los valores predeterminados del consumidor son `batchSize: 1` para «prepare» y «Fulfilment», y `batchSize: 10` para «position-batch».

## Enrutamiento de notificaciones

«Original» significa que los bytes y la firma de la contraparte se reenvían sin modificaciones. «Hub» significa que el hub genera el cuerpo del mensaje y lo firma con la clave del hub cuando `JWS_SIGN=true`.

| Acción del evento · estado | Destinatario | Llame | Cuerpo / firma |
|---|---|---|---|
| `prepare` · éxito | Beneficiario | `POST /transfers` | Original |
| `prepare` · fallo | Pagador | `PUT /transfers/{ID}/error` | Hub |
| `prepare-duplicate` | Pagador | `PUT /transfers/{ID}` (estado actual) | Hub |
| `commit` · éxito | Pagador | `PUT /transfers/{ID}` | Original |
| `commit` · éxito | Beneficiario | `PUT /transfers/{ID}` cuando sea `SEND_TRANSFER_CONFIRMATION_TO_PAYEE=true` | Hub |
| `reserve` · éxito | Pagador | `PUT /transfers/{ID}` (carrocería de tipo «Libro mayor») | Hub |
| `reserve` · éxito | Beneficiario | `PATCH /transfers/{ID}` (sin Fulfilment) | Hub |
| `abort` (error del beneficiario) | Pagador | `PUT /transfers/{ID}/error` | Original |
| `abort` (error del beneficiario) | Beneficiario | `PUT /transfers/{ID}/error` cuando sea `SEND_TRANSFER_CONFIRMATION_TO_PAYEE=true` | Hub |
| `abort-validation` | Pagador; beneficiario cuando la casilla anterior está marcada | `PUT /transfers/{ID}/error` | Hub |
| `reserved-aborted` | Beneficiario | `PATCH /transfers/{ID}` `{ transferState: ABORTED }` | Hub |
| `timeout-received` | Pagador | `PUT /transfers/{ID}/error` 3303 | Hub |
| `timeout-reserved` | Pagador y beneficiario | `PUT /transfers/{ID}/error` 3303 | Hub |

## Gestión de duplicados

En cada etapa se compara el SHA-256 de la carga útil con el hash almacenado para ese ID (`duplicateCheckComparator`).

| Escenario | Tabla | El mismo ID, el mismo hash | Mismo ID, hash diferente |
|---|---|---|---|
| Solicitud de cotización (modo persistente) | `quoteDuplicateCheck` | `handleQuoteRequestResend` | 3106 |
| Respuesta a la solicitud de cotización (modo persistente) | `quoteResponseDuplicateCheck` | Reenviar | 3106 |
| Preparar (H18) | `transferDuplicateCheck` | `COMMITTED`/`ABORTED`/`RESERVED` → `prepare-duplicate`: llamada de retorno con el estado actual; aún en vuelo → se ignora | 3106 |
| Fulfilment (H26) | `transferFulfilmentDuplicateCheck` | `COMMITTED`/`ABORTED` → `fulfil-duplicate` (llamada de retorno); `RECEIVED`/`RESERVED` → se ignora | 3106 |
| Error en el nombre del beneficiario | `transferErrorDuplicateCheck` | `abort-duplicate` llamada de retorno | 3106 |

## Semántica de entrega, tiempos de espera y recuperación

**Desplazamiento antes de la generación.** El valor `Kafka.proceed` realiza la confirmación del desplazamiento consumido y, a continuación, genera el siguiente mensaje; el modo «position-batch» realiza la confirmación de los desplazamientos antes del valor `trx.commit()`. Por lo tanto, los traspasos entre etapas se producen como máximo una vez: si se produce un fallo entre ambas, se pierde el traspaso en lugar de repetirlo.

**Controlador de tiempo de espera** (`src/handlers/timeouts/handler.js`, cron `TIMEXP`, cada 15 s por defecto), `TransferFacade.timeoutExpireReserved`:

1. Introduzca un `transferTimeout { transferId, expirationDate }` para las transferencias cuyos cambios de estado se encuentren dentro del nuevo intervalo del segmento.
2. Para las filas posteriores a la `expirationDate`, aplique las medidas en función del estado más reciente:
   * `RECEIVED_PREPARE` → `EXPIRED_PREPARED`, y notifíquelo al Pagador.
   * `RESERVED` → `RESERVED_TIMEOUT`, más `transferError` 3303 y un mensaje de posición `timeout-reserved` (clave del Pagador) → `EXPIRED_RESERVED`. Se notifica a ambas partes.
3. `transferTimeout.cleanup()` elimina las filas cuyo estado más reciente sea cualquiera de los siguientes: `RECEIVED_FULFIL`, `COMMITTED`, `FAILED`, `RESERVED_TIMEOUT`, `RECEIVED_REJECT`, `EXPIRED_PREPARED`, `EXPIRED_RESERVED`, `ABORTED_REJECTED` o `ABORTED_ERROR`.

El error de tiempo de espera que reciben ambas partes cuando caduca una reserva:

**Solicitud:** `PUT /transfers/01JBVM16V1SZQX8B0JZ2N4ZDE4/error`

Encabezados:

```json
{
  "Content-Type": "application/vnd.interoperability.transfers+json;version=2.0",
  "Date": "Thu, 15 Oct 2026 09:30:30 GMT",
  "FSPIOP-Source": "Hub",
  "FSPIOP-Destination": "pinebank"
}
```

Cuerpo:

```json
{
  "errorInformation": {
    "errorCode": "3303",
    "errorDescription": "Transfer expired"
  }
}
```

| Pérdida de pase | Estado: izquierda | Recuperado por |
|---|---|---|
| H19: preparar → colocar | `RECEIVED_PREPARE` | Tiempo de espera → `EXPIRED_PREPARED`; no se ha reservado nada |
| Posición H21 / H22 → Beneficiario | `RESERVED` | Tiempo de espera → `EXPIRED_RESERVED`; reserva liberada |
| Beneficiario H24 → Hub | `RESERVED` | Lo mismo |
| **H27 cumplir → posición (confirmación (commit))** | **`RECEIVED_FULFIL`** | **No se ha recuperado.** «`cleanup()`» ya ha eliminado la fila «`transferTimeout`», y ambas barridas se unen a partir de ella. La reserva del pagador permanece retenida y la transferencia nunca alcanza un estado final. |
| Confirmación H29 / H30 → Pagador | `COMMITTED` | El Libro mayor es correcto; los DFSP obtienen el resultado con un valor de `GET /transfers/{ID}` |

La brecha H27 se rastreó desde la fuente, no se reprodujo. La configuración de «Durable Producer» (`acks=all`, factor de replicación 3, `min.insync.replicas` adecuado) reduce la probabilidad de que se pierda ese traspaso, pero no proporciona una vía de recuperación.

## Controles de seguridad por salto

Cada capa inferior detiene un tipo diferente de ataque o error. Los controles marcados con *Despliegue* dependen de cómo el Operador del esquema de pagos instale y configure el Hub. El resto son comportamientos rastreados en el código fuente.

| Control | Lúpulo | Dónde |
|---|---|---|
| mTLS DFSP ↔ Hub (*Despliegue*) | Cada salto de HTTP que cruza el borde del Hub central | Gateway de entrada (`mode: MUTUAL`), Gateway de salida o «sidecars» para las llamadas de retorno; SDK `INBOUND_/OUTBOUND_MUTUAL_TLS_ENABLED` |
| Cifrado interno del Hub (*Despliegue*) | Kafka, MySQL, de servicio a servicio | Malla de servicios mTLS o nodo WireGuard; TLS Kafka/MySQL |
| JWS fichaje por parte de los DFSP | H6, H9, H13, H16, H24 | SDK `JWS_SIGN` (por defecto `true`) |
| JWS: validación por parte de los DFSP | H8, H11 → Beneficiario, H15, H22 → Beneficiario, H30, H31 | SDK `VALIDATE_INBOUND_JWS` (por defecto, `true`); `PUT /parties` por separado (por defecto, `false`) |
| JWS: validación por parte del Hub | H16, H24 | ml-api-adapter `JWS_VALIDATE` (por defecto `false`), solo `/transfers` (excepto GET) |
| El Hub nunca vuelve a firmar los mensajes reenviados | H7, H11, H15, H22, H30 | Bytes originales contenidos en la envoltura |
| El Hub firma sus propios mensajes | Errores, `PATCH`, confirmaciones de los beneficiarios | `JWS_SIGN` con `FSPIOP_SOURCE_TO_SIGN` = Hub |
| Validación del solicitante o participante | H2, H4, H11, H18 | ALS, citar al encargado de cotización, preparar al encargado de cotización |
| Enlace de fuentes | H18 (`Source = payerFsp`), H26 (`Source = payeeFsp`, `Destination = payerFsp`) | central-ledger |
| Condición ILP | Creado en H12; formulario validado en H18; cotejado con la cotización en H23; preimagen verificada en H26; verificado por el Pagador en H30 | SDK, central-ledger |
| Cobertura de liquidez y NDC en un bloqueo de fila | H₂O | posición-lote |
| Detección de duplicados | H11, H15 (modo persistente), H18, H26 | [Gestión de duplicados](#duplicate-handling) |
| Caducidad | H18, H23, H26, gestor de tiempo de espera | [Semántica de entrega](#delivery-semantics-timeouts-and-recovery) |
| Transferencias duraderas (*Despliegue*) | Cada salto de Kafka y cada escritura en el Libro mayor | Kafka réplica con `acks=all`; MySQL réplicas |

El formato «JWS» (sdk-standard-components `src/lib/jws`):

```text
protectedHeader = base64url({ alg: "RS256" | "ES256",
                              "FSPIOP-URI", "FSPIOP-HTTP-Method", "FSPIOP-Source",
                              "FSPIOP-Destination" (if present), "Date" (if present) })
FSPIOP-Signature: {"signature":"<JWS signature>","protectedHeader":"<protectedHeader>"}
```

El validador rechaza una solicitud cuando no existe ninguna clave para `FSPIOP-Source`, cuando `alg` es distinto de RS256 o ES256, o cuando el `FSPIOP-URI` o `FSPIOP-HTTP-Method` protegido difiere de la solicitud real.

## Configuración que modifica la ruta

### Hub

| Escenario | Componente | Por defecto | Efecto |
|---|---|---|---|
| `SIMPLE_ROUTING_MODE` | quoting-service | `true` | `true`: solo enrutamiento. `false`: deduplicar y conservar las comillas |
| `PAYLOAD_CACHE.enabled` + `ORIGINAL_PAYLOAD_STORAGE` | ml-api-adapter | `true` + `""` | Los bytes originales se establecen en Redis únicamente cuando el valor de «storage» es `redis`; en caso contrario, se incluyen directamente en la envoltura |
| `TRANSFERS.SEND_TRANSFER_CONFIRMATION_TO_PAYEE` | ml-api-adapter | `true` | Confirmación firmada por el Hub al beneficiario en H31 |
| `ENDPOINT_SECURITY.JWS.JWS_SIGN` | ml-api-adapter | `false` | El Hub firma los mensajes que genera el Originador |
| `ENDPOINT_SECURITY.JWS.JWS_VALIDATE` | ml-api-adapter | `false` | El Hub valida las firmas a las H16/H24 |
| `HTTP_REQUEST_TIMEOUT_MS` | ml-api-adapter | `20000` | Tiempo de espera de la llamada de retorno en H22/H30/H31 |
| `ENDPOINT_CACHE_CONFIG.expiresIn` | ml-api-adapter | `180000` | TTL de la caché de la llamada de retorno URL |
| `CACHE.CACHE_ENABLED` | central-ledger | `false` | Almacenamiento en caché de participantes, divisas y límites en los controladores |
| `KAFKA.EVENT_TYPE_ACTION_TOPIC_MAP.POSITION.*` | central-ledger | Solo operaciones de FX (divisas) | Realiza el enrutamiento de las acciones de posición al tema de lotes |
| `POSITION_BATCH … options.batchSize` | central-ledger | `10` | Mensajes por transacción de posición |
| `HANDLERS.TIMEOUT.TIMEXP` | central-ledger | `*/15 * * * * *` | Horario de barrido por tiempo de espera |
| Productor `topicConf.request.required.acks` | Todos los productores | Según el gráfico | Duración de cada entrega «Kafka» |

### Conector DFSP (sdk-scheme-adapter)

| Escenario | Por defecto | Efecto |
|---|---|---|
| `AUTO_ACCEPT_PARTY` / `AUTO_ACCEPT_QUOTES` | `true` / `true` | `false`: se detiene en H8 / H15 para que el cliente dé su confirmación |
| `CHECK_ILP` | `true` | Comprobaciones de la condición en H23 y H30 |
| `REJECT_TRANSFERS_ON_EXPIRED_QUOTES` | `false` | El beneficiario rechaza las cotizaciones caducadas en H23 (3302) |
| `ALLOW_TRANSFER_WITHOUT_QUOTE` | `false` | El beneficiario acepta una orden de pago sin cotización guardada |
| `ALLOW_DIFFERENT_TRANSFER_TRANSACTION_ID` | `false` | La cotización se consulta mediante el campo `transactionId` del paquete ILP |
| `RESERVE_NOTIFICATION` | `false` | El beneficiario responde «`RESERVED`» en H24 y espera «`PATCH`» |
| `PATCH_NOTIFICATION_GRACE_TIME_MS` | `15000` | El beneficiario registra `GET /transfers/{ID}` si no llega ningún `PATCH` |
| `JWS_SIGN` / `VALIDATE_INBOUND_JWS` | `true` / `true` | Firma de mensajes |
| `VALIDATE_INBOUND_PUT_PARTIES_JWS` | `false` | JWS a `PUT /parties` |
| `EXPIRY_SECONDS` | `20` | Cotización y preparación de la fecha de vencimiento |

## Indicadores a lo largo del recorrido

| Sistema métrico | Lúpulo | Medidas |
|---|---|---|
| `ml_transfer_prepare` / `ml_transfer_fulfil` | H16 / H24 | API manipulador hasta Kafka producto |
| `transfer_prepare` / `transfer_fulfil` | H18 / H26 | Manejador, por mensaje |
| `handlers_transfer_validator` | H18, H26 | `validatePrepare`, `validateFulfilCondition`, … |
| `model_transfer` | H18, H26 | Llamadas a la base de datos de la fachada; `facade_saveTransferPrepared` frente a `…_transaction` enmarca la Confirmación (commit) |
| `transfer_position` | H20, H28 | Por lote de posiciones, por mensaje y por lote |
| `notification_event`, `notification_event_delivery` | H22, H30, H31 | Consumo: HTTP por llamada de retorno |
| `tx_transfer_prepare` | H16 → H22 | Desde el API, prepare el recibo y remítalo al Beneficiario |
| `tx_transfer_fulfil` | H24 → H30 | Desde la confirmación de Fulfilment de «API» hasta la llamada de respuesta al Pagador |
| `tx_transfer` | H16 → H30 | De extremo a extremo dentro del Hub |
| `model_quote` | H11, H15 | `validateQuoteRequest`, `forwardQuoteRequest`, `forwardQuoteUpdate` |
| `mojaloop_connector_callback_latency_seconds` | H22 → H24 (Beneficiario SDK) | Desde la solicitud entrante hasta la llamada de respuesta saliente |

Las métricas «`tx_*`» indican `timeApiPrepare`/`timeApiFulfil` según el W3C `tracestate`. Por lo tanto, se trata de intervalos amplios que abarcan cada Kafka salto y cada confirmación en la base de datos que se produce entre ellos.

## Consecuencias de un fallo

Cada fallo da lugar a una respuesta clara y definitiva para los DFSP implicados.

| ¿Qué ocurrió? | Captado en | Resultado | Código |
|---|---|---|---|
| Identificador no registrado en ningún sistema DFSP | Descubrimiento (H3) | No se ha encontrado la parte; no hay nada reservado | 3204 |
| El beneficiario n.º DFSP se niega a facilitar una cotización | Cotización (H12) | Código de error para el pagador: DFSP; no hay nada reservado | 5101 |
| Instrucción incorrecta, remitente erróneo, participante inactivo, plazo vencido | H18: preparación | Se almacena como `INVALID`; error para el pagador DFSP | 3100 |
| Se ha reenviado el mismo ID con un contenido diferente | H18 / H26 | Rechazado por tratarse de una solicitud modificada | 3106 |
| El pagador n.º DFSP carece de cobertura de liquidez | Posición H20 | `ABORTED_REJECTED` | 4001 |
| El pagador n.º DFSP superaría su límite de débito neto | Posición H20 | `ABORTED_REJECTED` | 4200 |
| La firma no se verifica | H16 (si está activado) o H23 | Mensaje rechazado | 3105 |
| La cotización caducó antes de que se realizara la transferencia | Beneficiario H23 | Error en el beneficiario; reserva cancelada | 3302 |
| El beneficiario DFSP rechaza la transferencia | Beneficiario H23 | `ABORTED_ERROR`; reserva cancelada | 5104 |
| Fulfilment no se ajusta a la condición o el remitente es incorrecto | H26 Fulfilment | Cancelado; reserva liberada | 3100 |
| El beneficiario DFSP nunca responde | Manejo de tiempos de espera | `RESERVED_TIMEOUT` → `EXPIRED_RESERVED`; reserva cancelada | 3303 |

## Códigos de error

| Código | Nombre | Criado en |
|---|---|---|
| 2001 | Error interno del servidor | H20: estado incorrecto; H26: transferencia no encontrada; cualquier fallo imprevisto |
| 3100 | Error genérico de validación | Validación H18; comprobaciones de encabezado, condición y estado H26 |
| 3101 | Sintaxis incorrecta | Validación del encabezado y del cuerpo de los mensajes entrantes en el Hub |
| 3105 | Firma no válida | Validación de JWS (Hub o DFSP) |
| 3106 | Solicitud modificada | Cualquier comprobación de duplicados con un hash diferente |
| 3204 | No se ha encontrado el parte | Descubrimiento |
| 3208 | No se ha encontrado el ID de transferencia | `GET /transfers/{ID}` |
| 3302 | La cotización ha caducado | H23 |
| 3303 | La transferencia ha caducado | H26; gestor de tiempo de espera |
| 4001 | Pagador FSP: liquidez insuficiente | H₂O |
| 4200 | Error en el límite del pagador | H₂O |
| 5101 | El beneficiario ha rechazado la cotización | H12 |
| 5104 | El beneficiario ha rechazado la transacción | H23 |

## Glosario

| Término | Significado |
|---|---|
| DFSP | Proveedor de servicios financieros digitales: un banco, una billetera digital u otro proveedor que sea participante en el Hub |
| FSPIOP | A continuación se detallan los mensajes de «FSP Interoperabilidad API» y la especificación abierta Mojaloop. El ISO 20022 también es compatible y se traduce en el perímetro. |
| Adaptador de esquema SDK (Mojaloop conector) | El software «DFSP» se ejecuta para comunicarse con el Hub mediante el protocolo «FSPIOP», incluyendo la firma y la gestión de ILP |
| Oracle | Un directorio que asocia un identificador, como un MSISDN, al «DFSP» que lo contiene |
| Devolución de llamada | La respuesta a una solicitud, enviada posteriormente mediante una llamada independiente de tipo «HTTP» a un Endpoint que el destinatario ha registrado |
| Condición (condition) | Hash SHA-256 del Fulfilment, publicado junto con la cotización y adjunto a la transferencia |
| Fulfilment | Un secreto de 32 bytes cuyo hash SHA-256 cumple la condición. Solo el beneficiario DFSP puede generarlo. |
| Cargo | Saldo neto corriente de DFSP con el Hub en una moneda |
| Cobertura de liquidez | Fondos que el «DFSP» ha depositado en el banco liquidador, que se mantienen en su cuenta en el banco liquidador |
| Límite de débito neto (NDC) | El importe neto máximo que un «DFSP» puede adeudar antes de la próxima liquidación |
| Ventana de liquidación | El período en el que las transferencias comprometidas se netean y se liquidan conjuntamente |
| mTLS · JWS | Conexiones TLS con autenticación mutua · JSON firmas web en cada mensaje |

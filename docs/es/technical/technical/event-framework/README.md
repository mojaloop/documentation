---
i18n_source_sha: d1a0f5ece0df733f0e340913310ae3fabc27f22b
---

# Marco de eventos

El objetivo del Marco de Eventos es proporcionar una arquitectura estándar unificada que permita registrar todos los eventos Mojaloop.

_Aviso legal: Se trata de una iniciativa experimental que se está llevando a cabo como prueba de concepto (PoC). Por lo tanto, el diseño puede sufrir modificaciones en función de la evolución de la implementación de la prueba de concepto y de las lecciones aprendidas._


## 1. Requisitos

- Los eventos se generarán mediante el uso de una biblioteca común estándar que los publicará en un componente «sidecar» utilizando un protocolo ligero y de alto rendimiento (por ejemplo, gRPC).
- El módulo Sidecar publicará eventos en un único tema «Kafka», lo que permitirá que varios controladores consuman y procesen los eventos según sea necesario.
- El número de particiones Kafkas vendrá determinado por el tipo de evento (por ejemplo, registro, auditoría, seguimiento, errores, etc.).
- Cada componente «Mojaloop» contará con su propio «Sidecar» estrechamente vinculado.
- Los mensajes de eventos se generarán en la partición Kafka utilizando el Trace-Id como clave del mensaje. De este modo se garantiza que todos los mensajes que forman parte de la misma traza (Transacción) se almacenen en la misma partición y en orden.


## 2. Arquitectura

### 2.1 Descripción general

![Event Framework Architecture](./assets/diagrams/architecture/architecture-event-framework.svg)

### 2.2 Módulos de microservicios

![Pod Architecture](./assets/diagrams/architecture/architecture-event-sidecar.svg)

### 2.3 Flujo de eventos

![Tracing Architecture](./assets/diagrams/architecture/architecture-event-trace.svg)


## 3. Modelo de envolvente de eventos

## 3.1JSON Ejemplo

```JSON
{
    "from": "noresponsepayeefsp",
    "to": "payerfsp",
    "id": "aa398930-f210-4dcd-8af0-7c769cea1660",
    "content": {
        "headers": {
            "content-type": "application/vnd.interoperability.transfers+json;version=1.0",
            "date": "2019-05-28T16:34:41.000Z",
            "fspiop-source": "noresponsepayeefsp",
            "fspiop-destination": "payerfsp"
        },
        "payload": "data:application/vnd.interoperability.transfers+json;version=1.0;base64,ewogICJmdWxmaWxtZW50IjogIlVObEo5OGhaVFlfZHN3MGNBcXc0aV9VTjN2NHV0dDdDWkZCNHlmTGJWRkEiLAogICJjb21wbGV0ZWRUaW1lc3RhbXAiOiAiMjAxOS0wNS0yOVQyMzoxODozMi44NTZaIiwKICAidHJhbnNmZXJTdGF0ZSI6ICJDT01NSVRURUQiCn0"
    },
    "type": "application/json",
    "metadata": {
        "event": {
            "id": "3920382d-f78c-4023-adf9-0d7a4a2a3a2f",
            "type": "trace",
            "action": "span",
            "createdAt": "2019-05-29T23:18:32.935Z",
            "state": {
                "status": "success",
                "code": 0,
                "description": "action successful"
            },
            "responseTo": "1a396c07-47ab-4d68-a7a0-7a1ea36f0012"
        },
        "trace": {
            "service": "central-ledger-prepare-handler",
            "traceId": "bbd7b2c7-3978-408e-ae2e-a13012c47739",
            "parentSpanId": "4e3ce424-d611-417b-a7b3-44ba9bbc5840",
            "spanId": "efeb5c22-689b-4d04-ac5a-2aa9cd0a7e87",
            "startTimestamp": "2015-08-29T11:22:09.815479Z",
            "finishTimestamp": "2015-08-29T11:22:09.815479Z",
            "tags": {
              "transctionId": "659ee338-c8f8-4c06-8aff-944e6c5cd694",
              "transctionType": "transfer",
              "parentEventType": "bulk-prepare",
              "parentEventAction": "prepare"
            }
        }
    }
}
```

## 3.2 Definición del esquema

### 3.2.1 Definición del objeto: EventMessage

| Nombre | Tipo | Obligatorio (S/N) | Descripción | Ejemplo |
| --- | --- | --- | --- | --- |
| id | cadena | Y | El identificador hace referencia al mensaje correspondiente. |  |
| de | cadena | N | Si el valor no aparece en el destino, significa que la Notificación fue generada por el nodo conectado (servidor). |  |
| a | cadena | Y | Obligatorio para el remitente y opcional en el destino. El remitente puede omitir el valor del dominio. | |
| pp | cadena | N | Es opcional para el remitente, siempre que se tenga en cuenta la identidad de la sesión. Es obligatorio en el destino si la identidad del originador es diferente de la identidad de la propiedad «from». | |
| metadatos | objeto `<MessageMetadata>` | N | El remitente debe evitar utilizar esta propiedad para transmitir cualquier tipo de información relacionada con el contenido, sino únicamente datos relevantes para el contexto de la comunicación. Considere la posibilidad de definir un nuevo tipo de contenido si es necesario incluir más información sobre el contenido en el mensaje. | |
| tipo | cadena | Y | `MIME`: declaración del tipo de contenido del mensaje. | |
| contenido | objeto \<any\> | Y | La representación del contenido. | |

##### 3.2.1.1 Definición del objeto: MessageMetadata

| Nombre | Tipo | Obligatorio (S/N) | Descripción | Ejemplo |
| --- | --- | --- | --- | --- |
| evento | objeto `<EventMetadata>` | Y | Información sobre el evento. |  |
| rastro | objeto `<EventTraceMetaData>` | Y | Información de seguimiento. |  |

##### 3.2.1.2 Definición del objeto: EventMetadata

| Nombre | Tipo | Obligatorio  (S/N) | Descripción | Ejemplo |
| --- | --- | --- | --- | --- |
| id | cadena | Y | UUIDv4 generado que representa el evento. | 3920382d-f78c-4023-adf9-0d7a4a2a3a2f |
| tipo | enum `<EventType>` | Y | Tipo de evento. | [`log`, `audit`, `error` `trace`] |
| acción | enum `<LogEventAction, AuditEventAction, TraceEventAction, NullEventAction>` | Y | Tipo de acción. | [ `start`, `end` ] |
| createdAt | marca de tiempo | Y | Marca de tiempo ISO. | 29 de mayo de 2019 a las 23:18:32.935Z |
| respuesta a | cadena | N | Enlace de identificación UUIDv4 al evento principal anterior. | 29 de mayo de 2019 a las 23:18:32.935Z |
| estado | objeto `<EventStateMetadata>` | Y | Objeto que describe el estado. |  |

##### 3.2.1.3 Definición del objeto: EventStateMetadata

| Nombre | Tipo | Obligatorio  (S/N) | Descripción | Ejemplo |
| --- | --- | --- | --- | --- |
| estado | enum `<EventStatusType>` | Y | El identificador hace referencia al mensaje correspondiente. | éxito |
| código | número | N | El código de error según la especificación Mojaloop. | 2000 |
| descripción | cadena | N | Descripción del estado. Se suele utilizar para incluir una descripción de un error. | Error genérico del servidor que se utilizará para no revelar información que pueda considerarse privada. |

##### 3.2.1.4 Definición del objeto: EventTraceMetaData

| Nombre | Tipo | Obligatorio (S/N) | Descripción | Ejemplo |
| --- | --- | --- | --- | --- |
| servicio | cadena | Y | Nombre del servicio que genera el rastro | gestor-de-preparación-del-libro-mayor-central |
| traceId | 32HEXDIGLC | Y | El identificador de la transacción de extremo a extremo. | 664314d5b207d3ba722c6c0fdcd44c61 |
| spanId | 16HEXDIGLC | Y | Id: identificador de una etapa de procesamiento de un componente o una función. | 81fa25e8d66d2e88 |
| parentSpanId | 16HEXDIGLC | N | El identificador hace referencia al mensaje correspondiente. | e457b5a2e4d86bd1 |
| muestreado | número | N | Indicador que determina si el mensaje de evento debe incluirse en el registro de seguimiento`1`. Si se excluye, será el consumidor quien decida sobre el muestreo. | 1 |
| banderas | número | N | Indicador que determina si el mensaje del evento debe incluirse en el flujo de seguimiento. (Depuración `1`: esto anulará el valor muestreado) | 0 |
| startTimestamp | fecha y hora | N | ISO 8601 con el siguiente formato: `yyyy-MM-dd'T'HH:mm:ss.SSSSSSz`. Si no se incluye, se utilizará la marca de tiempo actual. Representa la marca de tiempo de inicio de un intervalo. | 29 de agosto de 2015 a las 11:22:09.815479Z |
| fechaYhoraDeFinalización | fecha y hora | N | ISO 8601 con el siguiente formato: `yyyy-MM-dd'T'HH:mm:ss.SSSSSSz`. Si no se incluye, se utilizará la marca de tiempo actual. Representa la marca de tiempo de finalización de un intervalo. | 29 de agosto de 2015 a las 11:22:09.815479Z |
| etiquetas | objeto `<EventTraceMetaDataTags>` | Y | El identificador hace referencia al mensaje correspondiente. | éxito |

_Nota: HEXDIGLC = DIGIT / «a» / «b» / «c» / «d» / «e» / «f»; carácter hexadecimal en minúscula. Ref.: [Norma WC3 para el contexto de seguimiento trace-context](https://www.w3.org/TR/trace-context/#field-value)._

##### 3.2.1.5 Definición del objeto: EventTraceMetaDataTags

| Nombre | Tipo | Obligatorio  (S/N) | Descripción | Ejemplo |
| --- | --- | --- | --- | --- |
| transactionId | cadena | N | Identificador de transacción que representa una transferencia, una cotización, etc. | 659ee338-c8f8-4c06-8aff-944e6c5cd694 |
| tipo de transacción | cadena | N | El tipo de transacción que representa el «transactionId». Por ejemplo: (transferencia, cotización, etc.) | transferencia |
| tipo de evento principal | cadena | N | El tipo de evento del elemento «Span» principal. | preparación en masa |
| parentEventAction | cadena | N | La acción de evento del elemento «Span» principal. | preparar |
| tracestate | cadena | N | Esta etiqueta se establece si la variable de entorno `EVENT_SDK_TRACESTATE_HEADER_ENABLED` de EventSDK es `true` o si el contexto del span principal incluye el encabezado o la etiqueta `tracestate`. La etiqueta contiene el valor actualizado del encabezado `tracestate`, de acuerdo con la especificación de encabezados de rastreo del W3C. [Más información aquí](#411-wc3-http-headers) | `congo=t61rcWkgMzE,rojo=00f067aa0ba902b7` | 
| `<string>` | cadena | N | Par clave-valor arbitrario para metadatos adicionales que se añadirán a la información de seguimiento. | n/a |

##### 3.2.1.6 Enumeración: EventStatusType

| Enumeración | Descripción |
| --- | --- |
| éxito | El evento se ha procesado correctamente |
| fracasar | El evento se ha procesado con un fallo o un error |

##### 3.2.1.7 Enumeración: EventType

| Enumeración | Descripción |
| --- | --- |
| registro | Evento que representa una entrada de registro general. |
| auditoría | Evento que se firmará y se almacenará de forma permanente en el registro de auditoría. |
| rastro | Evento que contiene información sobre el contexto de seguimiento que se va a almacenar en el repositorio de seguimiento. |

##### 3.2.1.8 Enumeración: LogEventAction

| Enumeración | Descripción |
| --- | --- |
| información | Evento que representa una entrada de registro de nivel `info`. |
| depuración | Evento que representa una entrada de registro de nivel `debug`. |
| error | Evento que representa una entrada de registro de nivel `error`. |
| detallado | Evento que representa una entrada de registro de nivel `verbose`. |
| advertencia | Evento que representa una entrada de registro de nivel `warning`. |
| rendimiento | Evento que representa una entrada de registro de nivel `performance`. |

##### 3.2.1.9 Enumeración: AuditEventAction

| Enumeración | Descripción |
| --- | --- |
| por defecto | Medida de auditoría estándar. |
| inicio | Acción de auditoría que marca el inicio de un proceso. |
| finalizar | Acción de auditoría que marca el final de un proceso. |
| entrada | Medida de auditoría para registrar la actividad de entrada. |
| salida | Medida de auditoría para registrar la actividad de salida. |

##### 3.2.1.10 Enumeración: TraceEventAction

| Enumeración | Descripción |
| --- | --- |
| span | Acción de evento que representa un tramo de un registro. |


## 4. Trazado del diseño

### 4,1HTTP Transportes

A continuación encontrará la norma HTTP «Encabezados de transporte para el seguimiento», tal y como se propone actualmente.

Mojaloop aún no se ha decantado por ninguno de los dos estándares, ni se sabe si será compatible con ambos.

#### 4.1.1 Encabezados HTTP del W3C

Para obtener más información, consulte la siguiente publicación: https://w3c.github.io/trace-context/

| Encabezado | Descripción | Ejemplo |
| --- | --- | --- |
| traceparent | Cadena de información de seguimiento delimitada por guiones: \<version\>-\<trace-id\>-\<parent\/span-id\>-\<trace-flags\> | 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-00 |
| tracestate | Formato específico del proveedor, delimitado por comas, que se captura de la siguiente manera: \<vendor\>=\<base64-encoded-state\> | congo=t61rcWkgMzE,rojo=00f067aa0ba902b7 |

Nota: Antes de que se redactara esta especificación, algunos rastreadores propagaban el valor de «X-B3-Sampled» como «true» o «false», en lugar de como 1 o 0. Aunque no debe codificar «X-B3-Sampled» como «true» o «false», es posible que una implementación flexible los acepte.

Nota: (Event-SDK)[https://github.com/mojaloop/event-sdk] cuenta, desde la versión v9.4.1, con métodos para añadir etiquetas de clave-valor en el «tracestate», y, desde la versión v9.5.2, el «tracestate» se codifica en base64. Para poder utilizar el «tracestate» de forma coherente, utilice versiones compatibles en todos los Servicios del Sistema.

#### 4.1.2 Encabezados B3HTTP

Para obtener más información, consulte la siguiente publicación: https://github.com/apache/incubator-zipkin-b3-propagation

| Encabezado | Descripción | Ejemplo |
| --- | --- | --- |
| X-B3-TraceId | Codificados como 32 o 16 caracteres hexadecimales en formato bajo. | Un encabezado TraceId de 128 bits podría tener el siguiente aspecto: X-B3-TraceId: 463ac35c9f6413ad48485a3953bb6124. A menos que solo se transmita el estado de muestreo, es obligatorio incluir el encabezado X-B3-TraceId. |
| X-B3-SpanId | Codificado como 16 caracteres hexadecimales en minúscula. | Un encabezado «SpanId» podría tener el siguiente aspecto: X-B3-SpanId: a2fb4a1d1a96d312. A menos que solo se transmita el estado de muestreo, el encabezado «X-B3-SpanId» es obligatorio. |
| X-B3-ParentSpanId | El encabezado puede estar presente en un elemento «span» secundario y no debe estar presente en el elemento «span» raíz. Se codifica como 16 caracteres hexadecimales en minúscula. | Un encabezado «ParentSpanId» podría tener el siguiente aspecto: X-B3-ParentSpanId: 0020000000000001 |
| X-B3-Muestreado | Una decisión de aceptación de la muestra se codifica como `1` y una de denegación como `0`. La ausencia de indicación significa que la decisión se deja en manos del destinatario de este encabezado. | Un encabezado «Sampled» podría tener el siguiente aspecto: X-B3-Sampled: 1. |
| X-B3-Banderas | La opción «Debug» se codifica como «`1`». Dado que «Debug» implica una decisión de aceptación, no envíe también el encabezado «X-B3-Sampled». | |

### 4,2Kafka Transportes

Consulte la sección `Event Envelope Model`. En ella se define el mensaje que se enviará a través del transporte Kafka.

Como alternativa, el contexto de seguimiento podría almacenarse en encabezados «Kafka», que solo son compatibles con la versión v0.11 o posteriores. Tenga en cuenta que esto impediría la compatibilidad con versiones anteriores a la Kafka.

### 4.3 Limitaciones conocidas

- El seguimiento de las transferencias se limitaría a cada uno de los tramos de la transferencia (es decir, «Preparar» y «Fulfilment»), ya que la especificación Mojaloop API no contempla la información de seguimiento. La información de seguimiento se enviará como parte de las respuestas de llamada del Switch, pero no se exigirá a los proveedores de servicios financieros (FSP) que respondan adecuadamente con encabezados de seguimiento recíprocos.

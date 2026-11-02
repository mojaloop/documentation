---
i18n_source_sha: 4df1345f9fb598813c3948484477bb6231fd8e22
---

# SDK. Compatibilidad con transferencias masivas: diseño de DDD y Event Sourcing
## Descripción general del diseño
Este diagrama ofrece una descripción general del diseño «SDK».

![Design Overview](../assets/overview-drawio.png)

Una respuesta HTTP 202 al realizar la contabilización de una solicitud asíncrona significa que el SDK ha aceptado la solicitud y que esta se procesará y se proporcionará una respuesta. Debido a los posibles retrasos prolongados que conlleva el procesamiento de grandes cantidades de pagos masivos de forma asíncrona, fue necesario adoptar un nuevo enfoque de diseño en el SDK para cumplir con las expectativas de la respuesta 202.

## DDD y el diseño basado en eventos
Se optó por un enfoque basado en el «event sourcing» y orientado al dominio, ya que este cumple todos los requisitos de fiabilidad y escalabilidad, al tiempo que aprovecha las bibliotecas y herramientas que se han desarrollado para la arquitectura «Mojaloop vNext».

## Adaptador de esquema SDK para «Bulk Pagador DFSP»
### Diagrama de secuencia de «event sourcing» saliente
![Outbound sequence diagram](../assets/sequence/outbound-sequence.svg)

## Adaptador de esquema de pagos SDK del beneficiario DFSP
### Diagrama de secuencia de «event sourcing» para cotizaciones a granel entrantes
![Inbound bulk quotes sequence](../assets/sequence/inbound-bulk-quotes-sequence.svg)

### Diagrama de secuencia de «event sourcing» para transferencias masivas entrantes
![Inbound bulk transfers sequence](../assets/sequence/inbound-bulk-transfers-sequence.svg)


## Redis: Asignación de datos de tienda para la transferencia masiva de salida
### 1. Estados (a nivel mundial e individuales)

#### Comando:
```
HSET <key> <attribute1> <value1>
```
#### Leyenda:
```
outboundBulkTransaction_< bulkTransactionId >
```

#### Atributos:
- **bulkTransactionId**: bulkTransactionId
- **bulkHomeTransactionID**: ID de la transacción inmobiliaria
- **solicitud**: {
  opciones: Opciones,
  extensionList: Lista de extensiones en bloque
}
- **individualItem_< transactionId >**: Serializar ({
  id: transactionId
  solicitud: {}
  Estado: Estado concreto
  batchId: `<UUID>`
  partyRequest: {}
  solicitud de presupuestos: {}
  solicitudes de transferencia: {}
  partyResponse: {}
  quotesResponse: {}
  respuesta de transferencias: {}
  lastError: {}
  acceptParty: bool
  acceptQuotes: bool
})
- **estado**: Estado global
  - RECIBIDO
  - PROCESAMIENTO DE LA INVESTIGACIÓN
- **bulkBatch_< batchId >**: Serializar ({
  id: id_lote
  Estado: Estado concreto
  - TRAMITACIÓN_DEL_ACUERDO
  - TRAMITACIÓN_DE_TRASFERENCIAS
  bulkQuoteId: `<UUID>`
  bulkTransferId: `<UUID>` (puede ser «batchId»)
})
- **partyLookupTotalCount**: Número total de solicitudes de búsqueda de partes
- **partyLookupSuccessCount**: Número total de solicitudes de búsqueda de partes que se han completado con éxito
- **partyLookupFailedCount**: Número total de solicitudes de búsqueda de partes que han fallado
- **bulkQuotesTotalCount**: Número total de solicitudes de cotizaciones masivas
- **bulkQuotesSuccessCount**: Número total de solicitudes de cotización que se han completado con éxito
- **bulkQuotesFailedCount**: Número total de solicitudes de cotización que han fallado
- **bulkTransfersTotalCount**: Número total de solicitudes de transferencias masivas
- **bulkTransfersSuccessCount**: Número total de solicitudes de transferencias masivas que se han realizado con éxito
- **bulkTransfersFailedCount**: Número total de solicitudes de transferencias masivas que han fallado

::: tip Notas
- Los mensajes Kafka deben contener el «bulkID».
- Para actualizar el estado global, utilice el comando «`HSET bulkTransaction_< bulkTransactionId > state < stateValue >`»
:::

### 2. Para asignar funciones de devolución de llamada individuales a elementos individuales de un grupo

#### Comando:
```
HSET outboundBulkCorrelationMap <attribute1> <value1>
```

#### Atributos:
- partyLookup_`<id_type>`_`<id_value>`(_`<subid_type>`): "{ bulkTransactionId: `<bulkTransactionId>`, transactionId: `<transactionId>` }"
- bulkQuotes_`<bulkQuoteId>`: «{ bulkTransactionId: `<bulkTransactionId>`, batchId: `<batchId>` }»
- bulkTransfers_`<bulkTransferId>`: "{ bulkTransactionId: `<bulkTransactionId>`, batchId: `<batchId>`, bulkQuoteId: `<bulkQuoteId>` }"
- bulkHomeTransactionId_`<bulkHomeTransactionId>`: «{ bulkTransactionId: `<bulkTransactionId>` }»

::: tip Notas:
- Podemos utilizar el comando «`HKEYS`» para recuperar de forma masiva todos los ID de transferencia individuales y procesarlos uno por uno.
:::

## Formato de mensaje Redis para la transferencia masiva de entrada
### 1. Cotizaciones para pedidos al por mayor
#### Comando:
```
HSET <key> <attribute1> <value1>
```
#### Leyenda:
```
inboundBulkQuotes_< bulkQuotesId >
```

#### Atributos:
- **bulkQuotesId**: bulkQuotesId
- **individualItem_< quotesId >**: Serializar ({
  id: quotesId
  solicitud: {}
  Estado: Estado concreto
  solicitud de presupuestos: {}
  quotesResponse: {}
  lastError: {}
})
- **estado**: Estado global
  - RECIBIDO
  - PROCESAMIENTO
- **bulkQuotesTotalCount**: Número total de solicitudes de cotizaciones masivas
- **bulkQuotesSuccessCount**: Número total de solicitudes de cotización que se han completado con éxito
- **bulkQuotesFailedCount**: Número total de solicitudes de cotización que han fallado

::: tip Notas
- Los mensajes Kafka deben contener el «bulkQuotesId».
- Para actualizar el estado global, utilice el comando «`HSET bulkQuotes_< bulkQuotesId > state < stateValue >`»
:::

### 2. Transferencias masivas
#### Comando:
```
HSET <key> <attribute1> <value1>
```
#### Leyenda:
```
inboundBulkTransfer_< bulkTransferId >
```

#### Atributos:
- **bulkTransferId**: bulkTransferId
- **individualItem_< transferId >**: Serializar ({
  id: transferId
  solicitud: {}
  Estado: Estado concreto
  solicitudes de transferencia: {}
  respuesta de transferencias: {}
  lastError: {}
})
- **estado**: Estado global
  - RECIBIDO
  - PROCESAMIENTO
- **bulkTransferTotalCount**: Número total de solicitudes de transferencias masivas
- **bulkTransferSuccessCount**: Número total de solicitudes de transferencia que se han realizado con éxito
- **bulkTransferFailedCount**: Número total de solicitudes de transferencia que han fallado

::: tip Notas
- Los mensajes Kafka deben contener el campo «bulkTransferId».
- Para actualizar el estado global, utilice el comando «`HSET bulkTransfer_< bulkTransferId > state < stateValue >`»
:::

### 3. Para asignar funciones de devolución de llamada individuales a elementos individuales de un grupo

#### Comando:
```
HSET inboundBulkCorrelationMap <attribute1> <value1>
```

#### Atributos:
- quotes_`<quoteId>`: «{ bulkQuoteId: `<bulkQuoteId>` }»
- transfers_`<transferId>`: "{ bulkTransferId: `<bulkTransferId>`, bulkQuoteId: `<bulkQuoteId>` }"

::: tip Notas:
- Podemos utilizar el comando «`HKEYS`» para recuperar de forma masiva todos los ID de transferencia individuales y procesarlos de forma iterativa
:::

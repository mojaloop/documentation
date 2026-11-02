---
i18n_source_sha: 638edcb54a2e6de5878d5c0bb9a9269b9ce604fb
---

# SDK. Compatibilidad con transferencias masivas - API
Se han incorporado mejoras al adaptador del esquema de pagos «SDK» en el punto final «API» bajo el Endpoint /BulkTransactions. 
- **POST** /bulkTransactions 
- **PUT** /bulkTransactions 
- **PUT** /bulkTransactions (función de devolución de llamada)

La definición de «Outbound OpenAPI» se puede consultar [aquí](https://github.com/mojaloop/api-snippets/blob/master/sdk-scheme-adapter/v2_0_0/outbound/openapi.yaml).
La definición de «Inbound OpenAPI» se puede consultar [aquí](https://github.com/mojaloop/api-snippets/blob/master/sdk-scheme-adapter/v2_0_0/inbound/openapi.yaml).


## Diagrama de secuencia técnico
![Technical Bulk Transfer Sequence Diagram](https://raw.githubusercontent.com/mojaloop/sdk-scheme-adapter/master/docs/design-bulk-transfers/assets/api-sequence-diagram.svg)

## Tablas de errores para transferencias masivas
[Tabla de códigos de error](./assets/sequence/BULK-ERRORCODES.md)]

### Fase de descubrimiento
Todos los errores que se produzcan durante esta fase se acumularán en el «mojaloop-connector», se añadirán al objeto «`lastError`» y se devolverán al Pagador FSP junto con el resto de transferencias, tanto las que se hayan realizado con éxito como las que hayan fallado, incluidas en la solicitud de transferencia masiva.

mojaloop-connector actuará como un canal de retransmisión para todos los errores devueltos por el Switch

```
            "lastError": {
              "httpStatusCode": 202,
              "mojaloopError": {
                "errorInformation": {
                  "errorCode": "3204",
                  "errorDescription": "Party not found",
                  "extensionList": {"extension": [{"key": "string","value": "string"}]}
                }
              }
            }
```

**Códigos de error en la búsqueda de partes**

| Descripción del error                                                      | Código de error  |  Código HTTP       | Categoría                                                  |
|------------------------------------------------------------------------|-------------|------------------|-----------------------------------------------------------|
| Error de comunicación                                                    | 1000        | 503              |  Error técnico                                          |
| Error de comunicación con el destino	                                       | 1001        | 503              |  Error técnico                                          |
| Error genérico del servidor                                                   | 2000        | 503              |  Error de procesamiento                                         |
| Error interno del servidor	                                                 | 2001        | 503              |  Error de procesamiento                                         |
| Parte encargada de resolver el tiempo de espera	                                               | 2004        | 503              |  Error de procesamiento                                         |
| Error genérico de validación                                               | 3100        | 400              |  Error de validación de la solicitud                                 |
| No se ha encontrado el parte	                                                       | 3204        | 202              |  Error de procesamiento                                         |

### Fase de acuerdo
Todos los errores que se produzcan durante esta fase se acumularán en el «mojaloop-connector», se añadirán al objeto «`lastError`» y se devolverán al Pagador FSP junto con el resto de transferencias, tanto las que se hayan realizado con éxito como las que hayan fallado, incluidas en la solicitud de transferencia masiva.

mojaloop-connector actuará como un canal de retransmisión para todos los errores devueltos por el Switch

```
            "lastError": {
              "httpStatusCode": 202,
              "mojaloopError": {
                "errorInformation": {
                  "errorCode": "3204",
                  "errorDescription": "Party not found",
                  "extensionList": {"extension": [{"key": "string","value": "string"}]}
                }
              }
            }
```

**Códigos de error de comillas**

| Descripción del error                                                      | Código de error  |  Código HTTP       | Categoría                                                  |
|------------------------------------------------------------------------|-------------|------------------|-----------------------------------------------------------|
| Error de comunicación                                                    | 1000        | 503              |  Error técnico                                          |
| Error de comunicación con el destino	                                       | 1001        | 503              |  Error técnico                                          |
| Error genérico del servidor                                                   | 2000        | 503              |  Error técnico                                          |
| Error interno del servidor	                                                 | 2001        | 503              |  Error técnico                                          |
| No se ha implementado	                                                       | 2002        | 501              |  Error de procesamiento                                         |
| Los servicios no están disponibles en este momento	                                         | 2003        | 503              |  Error de procesamiento                                         |
| Se ha agotado el tiempo de espera del servidor	                                                     | 2004        | 503              |  Error de procesamiento                                         |
| El servidor está ocupado     	                                                     | 2005        | 503              |  Error de procesamiento                                         |
| Error genérico del cliente                                                   | 3000        | 400              |  Error de validación de la solicitud                                 |
| Se ha solicitado una versión no aceptable                                         | 3001        | 406              |  Error inaceptable                                     |
| DesconocidoURI                                                            | 3002        | 404              |  Error: No se ha encontrado                                          |
| Error genérico de validación                                               | 3100        | 400              |  Error de validación de la solicitud                                 |
| Sintaxis incorrecta	                                                     | 3101        | 400              |  Error de validación de la solicitud                                 |
| Falta un elemento obligatorio	                                             | 3102        | 400              |  Error de validación de la solicitud                                 |
| Demasiados elementos       	                                             | 3103        | 400              |  Error de validación de la solicitud                                 |
| Carga útil demasiado grande       	                                             | 3104        | 400              |  Error de validación de la solicitud                                 |
| Firma no válida       	                                             | 3105        | 403              |  Error no permitido                                          |
| Error de destino FSP       	                                         | 3201        | 404              |  Error: No se ha encontrado                                          |
| No se ha encontrado el ID del pagador FSP       	                                         | 3202        | 404              |  Error: No se ha encontrado                                          |
| No se ha encontrado el ID del Beneficiario FSP       	                                         | 3203        | 404              |  Error: No se ha encontrado                                          |
| No se ha encontrado el ID de la cotización          	                                         | 3205        | 404              |  Error: No se ha encontrado                                          |
| No se ha encontrado el ID de la cotización masiva          	                                     | 3209        | 404              |  Error: No se ha encontrado                                          |
| Error genérico de caducidad                                                  | 3300        | 503              |  Error de procesamiento                                         |
| La cotización ha caducado                                                          | 3302        | 503              |  Error de procesamiento                                         |
| Error genérico del pagador                                                    | 4000        | 400              |  Error de validación de la solicitud                                 |
| Rechazo por parte de un pagador genérico                                                | 4100        | 403              |  Error no permitido                                          |
| Error en el límite del pagador                                                      | 4200        | 400              |  Error de validación de la solicitud                                 |
| Error de autorización del pagador                                                 | 4300        | 403              |  Error no permitido                                          |
| Error de bloqueo del pagador genérico                                            | 4400        | 403              |  Error no permitido                                          |
| Error genérico del Beneficiario                                                    | 5000        | 503              |  Error de procesamiento                                         |
| Beneficiario FSP: liquidez insuficiente                                       | 5001        | 503              |  Error de procesamiento                                         |
| Rechazo de un beneficiario genérico                                                | 5100        | 403              |  Error no permitido                                          |
| El beneficiario ha rechazado la cotización                                                   | 5101        | 503              |  Error de procesamiento                                         |
| Beneficiario FSP: tipo de transacción no admitido                                 | 5102        | 503              |  Error de procesamiento                                         |
| El beneficiario ha rechazado la cotización                                                   | 5103        | 503              |  Error de procesamiento                                         |
| Moneda no admitida por el beneficiario                                             | 5106        | 503              |  Error de procesamiento                                         |
| Error en el límite del beneficiario                                                      | 5200        | 503              |  Error de procesamiento                                         |
| Error de autorización del beneficiario                                                 | 5300        | 403              |  Error no permitido                                          |
| Error de bloqueo de un beneficiario genérico                                            | 5400        | 403              |  Error no permitido                                          |



### Fase de transferencia
Todos los errores que se produzcan durante esta fase se acumularán en el «mojaloop-connector», se añadirán al objeto «`lastError`» y se devolverán al Pagador FSP junto con el resto de transferencias, tanto las que se hayan realizado con éxito como las que hayan fallado, incluidas en la Solicitud de transferencia masiva.

mojaloop-connector actuará como un canal de retransmisión para todos los errores devueltos por el Switch

```
            "lastError": {
              "httpStatusCode": 404,
              "mojaloopError": {
                "errorInformation": {
                  "errorCode": "3210",
                  "errorDescription": "Bulk transfer ID not found",
                  "extensionList": {"extension": [{"key": "string","value": "string"}]}
                }
              }
            }
```

**Códigos de error de transferencia**

| Descripción del error                                                      | Código de error  |  Código HTTP       | Categoría                                                  |
|------------------------------------------------------------------------|-------------|------------------|-----------------------------------------------------------|
| Error de comunicación                                                    | 1000        | 503              |  Error técnico                                          |
| Error de comunicación con el destino	                                     | 1001        | 503              |  Error técnico                                          |
| Error genérico del servidor                                                   | 2000        | 503              |  Error de procesamiento                                         |
| Error interno del servidor	                                                 | 2001        | 503              |  Error de procesamiento                                         |
| Se ha agotado el tiempo de espera del servidor	                                                 | 2004        | 503              |  Error de procesamiento                                         |
| Error genérico de validación                                               | 3100        | 400              |  Error de validación de la solicitud                                 |
| No se ha encontrado el ID de la transferencia masiva                                             | 3210        | 404              |  Error de procesamiento                                         |
| Error genérico de caducidad                                                  | 3300        | 503              |  Error de procesamiento                                         |
| La solicitud de transacción ha caducado                                            | 3301        | 503              |  Error de procesamiento                                         |
| La transferencia ha caducado                                                       | 3303        | 503              |  Error de procesamiento                                         |
| Error genérico del Beneficiario                                                    | 5000        | 400              |  Error de procesamiento                                         |
| Beneficiario FSP: liquidez insuficiente                                       | 5001        | 400              |  Error de procesamiento                                         |
| Rechazo de un beneficiario genérico                                                | 5100        | 400              |  Error de procesamiento                                         |
| El beneficiario ha rechazado la cotización                                                   | 5101        | 400              |  Error de procesamiento                                         |
| Beneficiario FSP: tipo de transacción no admitido                                 | 5102        | 400              |  Error de procesamiento                                         |
| El beneficiario n.º FSP ha rechazado la cotización                                               | 5103        | 400              |  Error de procesamiento                                         |
| El beneficiario ha rechazado la transacción                                             | 5104        | 400              |  Error de procesamiento                                         |
| El beneficiario n.º FSP ha rechazado la transacción                                         | 5105        | 400              |  Error de procesamiento                                         |
| Moneda no admitida por el beneficiario                                             | 5106        | 400              |  Error de procesamiento                                         |
| Error en el límite del beneficiario                                                      | 5200        | 400              |  Error de procesamiento                                         |
| Error de autorización del beneficiario                                                 | 5300        | 403              |  Error de procesamiento                                         |
| Error de bloqueo de un beneficiario genérico                                            | 5400        | 400              |  Error de procesamiento                                         |

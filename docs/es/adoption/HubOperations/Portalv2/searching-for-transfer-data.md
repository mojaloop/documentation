---
i18n_source_sha: bdd6cb294656c02aaf1226ad236c325512db2d27
---

# Buscar datos de transferencias

El Finance Portal ofrece una página de búsqueda de transferencias que le permite encontrar datos de transferencias a partir de identificadores de DFSP, de usuario final o de transferencia. Es útil al resolver problemas.

::: tip NOTA
Los valores que se muestran en la página **Find Transfers** se extraen de la base de datos central-ledger del Hub.
:::

## Encontrar transferencias

Para encontrar transferencias, siga estos pasos:

1. Vaya a **Transfers** > **Find Transfers**. Se muestra la página **Find Transfers**. \
<img src="../../../../.vuepress/public/find_transfers.png" width="90%" height="90%" />
1. Use los filtros de búsqueda para especificar qué está buscando. Puede rellenar cualquier número de campos de búsqueda, en cualquier combinación.
    * **Transfer ID**: introduzca un `transferId` completo o un fragmento de un `transferId`.
    * **Payer FSP ID**: introduzca el `fspId` completo o un fragmento del `fspId` del DFSP Pagador.
    * **Payer ID Type**: en la lista desplegable, seleccione el tipo de identificador que se usa para identificar al Pagador (por ejemplo, **MSISDN** o **ACCOUNT_ID**). 
    * **Payer ID Value**: introduzca el identificador completo o un fragmento del identificador que se usa para identificar al Pagador (por ejemplo, un número de teléfono o un número de cuenta bancaria).
    * **Payee FSPID**: introduzca el `fspId` completo o un fragmento del `fspId` del DFSP Beneficiario.
    * **Payee ID Type**: en la lista desplegable, seleccione el tipo de identificador que se usa para identificar al Beneficiario. 
    * **Payee ID Value**: introduzca el identificador completo o un fragmento del identificador que se usa para identificar al Beneficiario.
    * **From** y **To**: introduzca la hora de inicio y la hora de fin del rango de tiempo en el que ocurrieron la transferencia o las transferencias que busca.
1. Una vez fijados los filtros de búsqueda, haga clic en **Find Transfers**. Se muestra la lista de resultados que cumplen los criterios de búsqueda.

Use los botones de navegación de páginas de la parte inferior de la pantalla para moverse entre las páginas de resultados.

Puede eliminar todos los filtros que haya aplicado y empezar la búsqueda de cero haciendo clic en **Clear Filters**.

Los resultados de la búsqueda se muestran en columnas. Todas las columnas pueden ordenarse:

* Haga clic en el encabezado de una columna para cambiar el orden de los valores que se muestran en ella.
* Haga clic en el icono de la lupa del encabezado de la columna e introduzca el valor que busca.

::: tip
El número total de transferencias que se devuelven está limitado a mil (1000) (esto es para no cargar el backend). Si no consigue encontrar la transferencia que busca dentro de los primeros mil resultados, empiece a acotar la búsqueda con los filtros de búsqueda. \
 \
Si la búsqueda devuelve más de quinientos (500) resultados, la página mostrará un mensaje informativo para que sepa que no está viendo necesariamente todos los resultados que cumplen sus criterios de búsqueda originales y que debería afinar más.
:::

Se muestran los siguientes detalles de una transferencia:

::: tip NOTA
Las transferencias sin cotización (es decir, las transferencias de "agregar y retirar fondos" y las transferencias de liquidación) mostrarán detalles únicamente de los siguientes campos: **Transfer ID**, **Timestamp**, **Amount**, **Currency**, **Status**.
:::

* **Transfer ID**: el identificador único de la transferencia (corresponde a `transferId`).
* **Type**: el tipo de la transferencia (corresponde a `transactionType` en Payment Manager y a `transactionScenario` en la API FSPIOP de Mojaloop). 
* **Timestamp**: la fecha y la hora en que se creó la solicitud de transferencia, como marca de tiempo con formato [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html).
* **Payer FSPID**: el `fspId` del DFSP Pagador.
* **Payee FSPID**: el `fspId` del DFSP Beneficiario.
* **Amount**: el monto de la transferencia.
* **Currency**: la moneda de la transferencia.
* **Status**: el estado de la transferencia (corresponde a `transferState` en Payment Manager y en la API FSPIOP de Mojaloop).
* **Payer Acct ID**: el tipo y el valor del identificador de la cuenta del Pagador.
* **Payee Acct ID**: el tipo y el valor del identificador de la cuenta del Beneficiario.

## Detalles de la transferencia

Para conocer más detalles sobre un resultado de búsqueda concreto, haga clic en su entrada en la lista de resultados. Aparece una ventana emergente **Transfer Details**. Esta sección ofrece información sobre los detalles que se muestran de una transferencia.

### Quote Requests

La pestaña **Quote Requests** muestra el `quoteId` y más información en subpestañas.

#### Subpestaña Quote Request

<img src="../../../../.vuepress/public/transfer_details_quote_request.png" width="70%" height="70%" />

La subpestaña **Quote Request** muestra los siguientes detalles sobre la solicitud de cotización:

* **quoteId**: el identificador único de la cotización, decidido por el DFSP Pagador.
* **transactionReferenceId**: corresponde al `transactionId` que se especifica en la solicitud de cotización.
* **transactionRequestId**: opcional. ID común entre los DFSP para el objeto de solicitud de transacción, decidido por el DFSP Beneficiario.
* **note**: una nota opcional adjunta a la transferencia.
* **expirationDate**: una fecha de expiración opcional de la solicitud de cotización, como marca de tiempo con formato [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html).
* **amount**: el monto para el que se solicita la cotización.
* **createdDate**: la fecha y la hora en que se creó la solicitud de cotización, como marca de tiempo con formato [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html).
* **transactionInitiator**: especifica si quien inicia la transferencia es el **PAYER** o el **PAYEE**.
* **transactionInitiatorType**: especifica el tipo de quien inicia:
    * **CONSUMER**: el consumidor es quien inicia la transacción. Por ejemplo: una transferencia entre pares o el pago de un préstamo desde una billetera.
    * **AGENT**: el agente es quien inicia la transacción. Por ejemplo: el pago de un préstamo a través de un agente. 
    * **BUSINESS**: la empresa es quien inicia la transacción. Por ejemplo: el desembolso de un préstamo. 
    * **DEVICE**: el dispositivo es quien inicia la transacción. Por ejemplo: un pago al comercio iniciado por el comercio y autorizado en el punto de venta.
* **transactionScenario**: especifica el escenario de la transacción (corresponde a `transactionType` en Payment Manager).
* **transactionSubScenario**: especifica el subescenario de la transacción que define el esquema de pagos.
* **balanceOfPaymentsType**: el código de balanza de pagos según se define en [el Sistema de Codificación de la Balanza de Pagos del FMI](https://www.imf.org/external/np/sta/bopcode/).
* **amountType**: **SEND** para el monto a enviar, **RECEIVE** para el monto a recibir.
* **currency**: la moneda del monto para el que se solicita la cotización. Un código alfabético de tres letras conforme a [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html).

#### Subpestaña Quote Parties

<img src="../../../../.vuepress/public/transfer_details_quote_parties.png" width="70%" height="70%" />

La subpestaña **Quote Parties** muestra los siguientes detalles sobre el DFSP Pagador y el DFSP Beneficiario:

* **quoteId**: el identificador único de la cotización, decidido por el DFSP Pagador.
* **partyIdentifierType**: el tipo de identificador que se usa para identificar a la parte (por ejemplo, **MSISDN** o **ACCOUNT_ID**).
* **partyIdentifierValue**: el valor del identificador que se usa para identificar a la parte (por ejemplo, un número de teléfono o un número de cuenta bancaria).
* **fspId**: el identificador único del DFSP registrado en el Hub (corresponde a `fspId`), tal como se proporciona en la cotización.
* **merchantClassificationCode**: se usa cuando el Beneficiario es un comercio que acepta pagos al comercio.
* **partyName**: el nombre visible de la parte.
* **transferParticipantRoleType**: el rol que desempeña el DFSP en la transferencia.
* **ledgerEntryType**: el tipo de asiento financiero que presenta esta parte: valor principal (es decir, el monto de dinero que el Pagador quiere que reciba el Beneficiario) o tasa de intercambio.
* **amount**: el monto para el que se solicita la cotización.
* **currency**: la moneda del monto para el que se solicita la cotización. Un código alfabético de tres letras conforme a [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html).
* **createdDate**: la fecha y la hora en que se creó la solicitud de cotización, como marca de tiempo con formato [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html).
* **partySubIdOrTypeId**: un subidentificador o subtipo de la parte.
* **participant**: referencia al `fspId` resuelto (si se proporciona o se conoce).

#### Subpestaña Quote Errors

La subpestaña **Quote Errors** solo muestra información si hubo un error en la etapa de cotización.

### Quote Responses

<img src="../../../../.vuepress/public/transfer_details_quote_responses.png" width="70%" height="70%" />

La pestaña **Quote Responses** muestra detalles sobre la respuesta a la solicitud de cotización:

* **quoteId**: el identificador único de la cotización, decidido por el DFSP Pagador.
* **transactionReferenceId**: corresponde al `transactionId` que se especifica en la solicitud de cotización.
* **quoteResponseId**: el identificador único de la respuesta a la solicitud de cotización.
* **transferAmountCurrencyId**: la moneda del monto de la transferencia. Un código alfabético de tres letras conforme a [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html).
* **transferAmount**: el monto que el DFSP Pagador debería transferir al DFSP Beneficiario.
* **payeeReceiveAmountCurrencyId**: la moneda del monto que el Beneficiario debería recibir en la transacción de extremo a extremo.
* **payeeReceiveAmount**: el monto que el Beneficiario debería recibir en la transacción de extremo a extremo.
* **payeeFspFeeCurrencyId**: la moneda de la parte de la tarifa de la transacción que corresponde al DFSP Beneficiario (si la hay). Un código alfabético de tres letras conforme a [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html).
* **payeeFspFeeAmount**: la parte de la tarifa de la transacción que corresponde al DFSP Beneficiario (si la hay).
* **payeeFspCommissionCurrencyId**: la moneda de la comisión de la transacción del DFSP Beneficiario (si la hay). Un código alfabético de tres letras conforme a [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html).
* **payeeFspCommissionAmount**: la comisión de la transacción del DFSP Beneficiario (si la hay).
* **ilpCondition**: la condición ILP que el lado Pagador debe adjuntar a la transferencia.
* **responseExpirationDate**: la fecha de expiración de la cotización, como marca de tiempo con formato [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html).
* **isValid**: un indicador de si la respuesta a la solicitud de cotización ha superado o no la validación de la solicitud y las comprobaciones de duplicados.
* **createdDate**: la fecha y la hora en que se creó la solicitud de cotización, como marca de tiempo con formato [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html).
* **ilpPacket**: el paquete ILP que devuelve el lado Beneficiario en respuesta a la solicitud de cotización.

### Transfer Prepares

<img src="../../../../.vuepress/public/transfer_details_transfer_prepares.png" width="70%" height="70%" />

La pestaña **Transfer Prepares** muestra detalles sobre la solicitud de transferencia:

* **transferId**: el identificador único de la transferencia.
* **amount**: el monto que el DFSP Pagador debería transferir al DFSP Beneficiario.
* **currencyId**: la moneda del monto de la transferencia. Un código alfabético de tres letras conforme a [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html).
* **ilpCondition**: la condición ILP que debe cumplirse para confirmar la transferencia.
* **expirationDate**: la fecha de expiración de la transferencia, como marca de tiempo con formato [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html).
* **createdDate**: la fecha y la hora en que se creó la solicitud de transferencia, como marca de tiempo con formato [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html).

### Transfer Participants

<img src="../../../../.vuepress/public/transfer_details_transfer_participants.png" width="70%" height="70%" />

La pestaña **Transfer Participants** muestra los siguientes detalles sobre los participantes de la transferencia:

* **transferParticipantId**: el identificador interno del participante del esquema de pagos (DFSP) para el que se solicita el informe; corresponde a `participantId` tal como se registra en el Hub.
* **transferId**: el identificador único de la transferencia.
* **participantCurrencyId**: la moneda en la que transacciona el participante (DFSP). Un código alfabético de tres letras conforme a [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html).
* **transferParticipantRoleType**: el rol que desempeña el DFSP en la transferencia.
* **ledgerEntryType**: el tipo de asiento financiero que presenta esta parte: valor principal (es decir, el monto de dinero que el Pagador quiere que reciba el Beneficiario) o tasa de intercambio.
* **amount**: el monto de la transferencia.
* **createdDate**: la fecha y la hora en que se creó la solicitud de transferencia, como marca de tiempo con formato [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html).

### Transfer Fulfilments

<img src="../../../../.vuepress/public/transfer_details_transfer_fulfilments.png" width="70%" height="70%" />

La pestaña **Transfer Fulfilments** muestra los siguientes detalles sobre la respuesta a la solicitud de transferencia:

* **transferId**: el identificador único de la transferencia.
* **ilpFulfilment**: el fulfilment de la condición ILP que se especifica en la solicitud de transferencia.
* **completedDate**: la fecha y la hora en que se completó la transferencia, como marca de tiempo con formato [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html).
* **isValid**: un indicador de si el fulfilment de la transferencia es válido o no.
* **settlementWindowId**: el identificador de la ventana de liquidación a la que se ha asignado esta transferencia.
* **createdDate**: la fecha y la hora en que se creó la respuesta a la solicitud de transferencia, como marca de tiempo con formato [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html).

### Transfer State Changes

<img src="../../../../.vuepress/public/transfer_details_transfer_state_changes.png" width="70%" height="70%" />

La pestaña **Transfer State Changes** muestra los siguientes detalles sobre los estados por los que pasa una transferencia:

* **transferStateChangeId**: el identificador único del estado de la transferencia.
* **transferId**: el identificador único de la transferencia.
* **enumeration**: el estado de la transferencia (corresponde a `transferState` en Payment Manager y en la API FSPIOP de Mojaloop).
* **description**: la descripción de lo que significa el estado.
* **reason**: el motivo por el que la transferencia pasó a un estado concreto.
* **createdDate**: la fecha y la hora en que la transferencia alcanzó un estado concreto, como marca de tiempo con formato [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html).
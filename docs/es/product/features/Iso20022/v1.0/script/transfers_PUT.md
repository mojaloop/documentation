---
i18n_source_sha: af096fbc0d66c56d2ba65236f47b096c5f25f627
---

## 7.15 PUT /transfers/{ID}
| Financial Institution to Financial Institution Payment Status Report - **pacs.002.001.15**|
|--|

#### Contexto 
*(DFSP -> DFSP, DFSP -> HUB, HUB -> DFSP)*

Este mensaje es una respuesta a la llamada `POST \transfers` iniciada por el DFSP que solicita continuar con los términos de transferencia presentados en el `PUT \quotes`. Es responsabilidad del DFSP beneficiario comprobar que los montos de compensación coinciden con los términos de transferencia acordados y, si se cumplen todos los requisitos, este mensaje se usa para fijar los términos acordados. Una vez que el hub recibe este mensaje de aceptación, la transferencia ya no puede expirar y se confirmará. Si esta transferencia es una transferencia dependiente de una conversión de moneda, esa conversión de moneda se confirmará al mismo tiempo que esta transferencia.

El cumplimiento criptográfico de ILP proporcionado en el campo `TxInfAndSts.ExctnConf` lo libera el DFSP beneficiario como indicación al HUB de que se han cumplido los términos. 

Este es un ejemplo del mensaje:
```json
{
"GrpHdr": {
    "MsgId":"01JBVM1CGC5A18XQVYYRF68FD1",
    "CreDtTm":"2024-11-04T12:57:45.228Z"},
"TxInfAndSts":{
    "ExctnConf":"ou1887jmG-l...",
    "PrcgDt":{
        "DtTm":"2024-11-04T12:57:45.213Z"},
    "TxSts":"RESV"}
}
```

#### Detalles del mensaje
Los detalles sobre cómo componer y realizar esta API se tratan en las siguientes secciones:
1. [Elementos de datos principales](#elementos-de-datos-principales)<br>Esta sección especifica qué campos son obligatorios, cuáles son opcionales y cuáles no están soportados, con el fin de cumplir los requisitos de validación del mensaje.
2. [Detalles de los encabezados](../MarketPracticeDocument.md#_3-3-1-detalles-de-los-encabezados)<br> En esta sección general se especifican los requisitos de encabezado de la API.
3. [Respuestas HTTP admitidas](../MarketPracticeDocument.md#_3-3-2-respuestas-http-admitidas)<br> En esta sección general se especifican las respuestas HTTP que deben soportarse.
4. [Carga útil de error común](../MarketPracticeDocument.md#_3-3-3-carga-util-de-error-comun)<br> En esta sección general se especifica la carga útil de error común que se proporciona en la respuesta HTTP de error síncrona.

#### Elementos de datos principales
Estos son los elementos de datos principales necesarios para cumplir este requisito de práctica de mercado.

Los colores de fondo indican la clasificación del elemento de datos.

   <style>
    td:nth-child(1) {
        width: 25%;
    }
    tr.unsupported {  
    color: black;
    background-color:rgb(241, 188, 188);
    font-size:0.8em;
    line-height: 1; /* Adjust the line height as needed */
    }
    tr.required {  
    color: black;
    background-color: white;
    font-size:0.8em;
    line-height: 1; /* Adjust the line height as needed */
    }
    tr.optional {  
    color: black;
    background-color:rgb(207, 206, 206);
    font-size:0.8em;
    line-height: 1; /* Adjust the line height as needed */
    }
    td, th {
        padding: 1px;
        margin: 1px; 
    }  
  </style>

  <table> <tr> <th>Data Model Type Key</th> <th>Description</th> </tr>
   <tr class="required"> <td><b>required</b></td><td>These fields are required in order to meet the message validating requirements.</td></tr>
   <tr class="optional"> <td><b>optional</b></td><td>These fields can be optionally included in the message. (Some of these fields may be required for a specific scheme as defined in the Scheme Rules for that scheme.)</td></tr>
   <tr class="unsupported"> <td><b>unsupported</b></td><td>These fields are actively not supported. The functionality specifying data in these fields are not compatible with a Mojaloop scheme, and will fail message validation if provided.</td></tr>
  </table>
   <br><br>
    

Esta es la tabla definida de elementos de datos principales.

<table>
  <tr>
    <th>ISO 20022 Field</th>
    <th>Data Model</th>
    <th>Description</th>
  </tr>
      <tr class=required><td>  <b>GrpHdr</b> - GroupHeader113</td><td>[1..1]</td><td>Set of characteristics shared by all individual transactions included in the message.<br></td></tr>
<tr class=required><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>MsgId</b> - MessageIdentification</td><td>[1..1]</td><td>Definition: Point to point reference, as assigned by the instructing party, and sent to the next party in the chain to unambiguously identify the message.<br>Usage: The instructing party has to make sure that MessageIdentification is unique per instructed party for a pre-agreed period.<br></td></tr>
<tr class=required><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>CreDtTm</b> - CreationDateTime</td><td>[1..1]</td><td>Date and time at which the message was created.<br></td></tr>
<tr class=unsupported><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>BtchBookg</b> - BatchBookingIndicator</td><td>[0..0]</td><td></td></tr>
<tr class=unsupported><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>NbOfTxs</b> - Max15NumericText</td><td>[0..0]</td><td>Specifies a numeric string with a maximum length of 15 digits.<br></td></tr>
<tr class=unsupported><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>CtrlSum</b> - DecimalNumber</td><td>[0..0]</td><td></td></tr>
<tr class=unsupported><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>TtlIntrBkSttlmAmt</b> - ActiveCurrencyAndAmount</td><td>[0..0]</td><td>A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.<br></td></tr>
<tr class=unsupported><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>IntrBkSttlmDt</b> - ISODate</td><td>[0..0]</td><td>A particular point in the progression of time in a calendar year expressed in the YYYY-MM-DD format. This representation is defined in "XML Schema Part 2: Datatypes Second Edition - W3C Recommendation 28 October 2004" which is aligned with ISO 8601.<br></td></tr>
<tr class=unsupported><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>SttlmInf</b> - SettlementInstruction15</td><td>[0..0]</td><td>Only the CLRG: Clearing option is supported.<br>Specifies the details on how the settlement of the original transaction(s) between the<br>instructing agent and the instructed agent was completed.<br></td></tr>
<tr class=unsupported><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>PmtTpInf</b> - PaymentTypeInformation28</td><td>[0..0]</td><td>Provides further details of the type of payment.<br></td></tr>
<tr class=unsupported><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>InstgAgt</b> - BranchAndFinancialInstitutionIdentification8</td><td>[0..0]</td><td>Unique and unambiguous identification of a financial institution or a branch of a financial institution.<br></td></tr>
<tr class=unsupported><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>InstdAgt</b> - BranchAndFinancialInstitutionIdentification8</td><td>[0..0]</td><td>Unique and unambiguous identification of a financial institution or a branch of a financial institution.<br></td></tr>
<tr class=unsupported><td>  <b>CdtTrfTxInf</b> - CreditTransferTransaction64</td><td>[0..0]</td><td></td></tr>
<tr class=optional><td>  <b>SplmtryData</b> - SupplementaryData1</td><td>[0..1]</td><td>Additional information that cannot be captured in the structured elements and/or any other specific block.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>PlcAndNm</b> - PlaceAndName</td><td>[0..1]</td><td>Unambiguous reference to the location where the supplementary data must be inserted in the message instance.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>Envlp</b> - Envelope</td><td>[0..1]</td><td>Technical element wrapping the supplementary data.<br>Technical component that contains the validated supplementary data information. This technical envelope allows to segregate the supplementary data information from any other information.<br></td></tr>
</table>


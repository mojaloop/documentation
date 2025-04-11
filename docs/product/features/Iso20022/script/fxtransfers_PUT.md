## 7.11 PUT /fxTransfers/{ID}

| Financial Institution to Financial Institution Payment Status Report - **pacs.002.001.15**|
|--|

#### Context 
*(FXP -> DFSP)*

This message is a response to the `POST \fxTransfers` call initiated by the DFSP who is requesting to proceed with the conversion terms presented in the `PUT \fxquotes`. It is the FXP's responsibility to check that the clearing amounts align with the agreed conversion terms, and if all requirements are met, use this message to lock-in the agreed terms. Once the hub receives this acceptance message, the conversion can no-longer timeout. Final completion of the conversion will only occur once the dependent transfer is committed. 

The cryptographic ILP fulfillment provided in the `TxInfAndSts.ExctnConf` field, is released by the FXP as an indication to the HUB that the terms have been met. 

Here is an example of the message:
```json
{
"GrpHdr": {
    "MsgId":"01JBVM1CGC5A18XQVYYRF68FD1",
    "CreDtTm":"2024-11-04T12:57:45.228Z"},
"TxInfAndSts":{
    "ExctnConf":"ou1887jmG-l...",
    "PrcgDt":{"DtTm":"2024-11-04T12:57:45.213Z"},
    "TxSts":"RESV"}
}
```
#### Message Details
The details on how to compose and make this API are covered in the following sections:
1. [Core Data Elements](#core-data-elements)<br>This section specifies which fields are required, which fields are optional, and which fields are unsupported in order to meet the message validating requirements.
2. [Header Details](../MarketPracticeDocument.md#331-header-details)<br> This general section specifies the header requirements for the API are specified.
3. [Supported HTTP Responses](../MarketPracticeDocument.md#332-supported-http-responses)<br> This general section specifies the http responses that must be supported.
4. [Common Error Payload](../MarketPracticeDocument.md#333-common-error-payload)<br> This general section specifies the common error payload that is provided in synchronous http error response.

#### Core Data Elements
Here are the core data elements that are needed to meet this market practice requirement.

The background colours indicate the classification of the data element.

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
    

Here is the defined core data element table.

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
<tr class=unsupported><td>  <b>CdtTrfTxInf</b> - CreditTransferTransaction62</td><td>[0..0]</td><td></td></tr>
<tr class=optional><td>  <b>SplmtryData</b> - SupplementaryData1</td><td>[0..1]</td><td>Additional information that cannot be captured in the structured elements and/or any other specific block.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>PlcAndNm</b> - PlaceAndName</td><td>[0..1]</td><td>Unambiguous reference to the location where the supplementary data must be inserted in the message instance.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>Envlp</b> - Envelope</td><td>[0..1]</td><td>Technical element wrapping the supplementary data.<br>Technical component that contains the validated supplementary data information. This technical envelope allows to segregate the supplementary data information from any other information.<br></td></tr>
</table>


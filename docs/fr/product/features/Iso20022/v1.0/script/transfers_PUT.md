---
sidebarTitle: "PUT /transfers/{ID}"
---

## 7.15 PUT /transfers/{ID}
| Financial Institution to Financial Institution Payment Status Report - **pacs.002.001.15**|
|--|

#### Contexte
*(DFSP -> DFSP, DFSP -> HUB, HUB -> DFSP)*

This message is a response to the `POST \transfers` call initiated by the DFSP who is requesting to proceed with the transfer terms presented in the `PUT \quotes`. It is the payee DFSPs responsibility to check that the clearing amounts align with the agreed transfer terms, and if all requirements are met, this message is used to lock-in the agreed terms. Once the hub receives this acceptance message, the transfer can no-longer timeout and will be committed. If this transfer is a dependent transfer in a currency conversion, then that currency conversion will be committed at the same time as this transfer.

The cryptographic ILP fulfillment provided in the `TxInfAndSts.ExctnConf` field, is released by the payee DFSP as an indication to the HUB that the terms have been met. 

Voici un exemple de message :
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

#### Détails du message
La composition et l’utilisation de cette API sont décrites dans les sections suivantes :
1. [Éléments de données principaux](#core-data-elements)<br>Cette section précise quels champs sont obligatoires, facultatifs ou non pris en charge pour satisfaire les exigences de validation du message.
2. [Détails d’en-tête](../MarketPracticeDocument.md#_3-3-1-header-details)<br>Cette section générale décrit les exigences d’en-tête pour l’API.
3. [Réponses HTTP prises en charge](../MarketPracticeDocument.md#_3-3-2-supported-http-responses)<br>Cette section générale décrit les réponses HTTP qui doivent être prises en charge.
4. [Charge utile d’erreur commune](../MarketPracticeDocument.md#_3-3-3-common-error-payload)<br>Cette section générale décrit la charge utile d’erreur fournie dans la réponse HTTP d’erreur synchrone.

#### Éléments de données principaux
Voici les éléments de données principaux nécessaires pour satisfaire cette exigence de pratique du marché.

Les couleurs de fond indiquent la classification de l’élément de données.

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

  <table> <tr> <th>Clé de type du modèle de données</th> <th>Description</th> </tr>
   <tr class="required"> <td><b>obligatoire</b></td><td>Ces champs sont obligatoires pour satisfaire les exigences de validation du message.</td></tr>
   <tr class="optional"> <td><b>facultatif</b></td><td>Ces champs peuvent être inclus facultativement dans le message. (Certains peuvent être obligatoires pour un schéma donné, selon les règles du schéma.)</td></tr>
   <tr class="unsupported"> <td><b>non pris en charge</b></td><td>Ces champs ne sont pas pris en charge. Les fonctionnalités associées à ces données ne sont pas compatibles avec un schéma Mojaloop ; leur fourniture entraînera un échec de validation du message.</td></tr>
  </table>
   <br><br>
    

Here is the defined core data element table.

<table>
  <tr>
    <th>Champ ISO 20022</th>
    <th>Modèle de données</th>
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


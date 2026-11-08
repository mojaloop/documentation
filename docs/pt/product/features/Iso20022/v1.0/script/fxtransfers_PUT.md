## 7.11 PUT /fxTransfers/{ID}

| Relatório de estado de pagamento de instituição financeira para instituição financeira - **pacs.002.001.15**|
|--|

#### Contexto 
*(FXP -> DFSP)*

Esta mensagem é uma resposta à chamada `POST \fxTransfers` iniciada pelo DFSP que pretende prosseguir com os termos de conversão apresentados na `PUT \fxquotes`. É da responsabilidade do FXP verificar que os montantes de compensação estão alinhados com os termos de conversão acordados e, se todos os requisitos forem cumpridos, utilizar esta mensagem para fixar os termos acordados. Assim que o hub recebe esta mensagem de aceitação, a conversão já não pode expirar por timeout. A conclusão final da conversão só ocorrerá quando a transferência dependente for confirmada (committed). 

O fulfillment ILP criptográfico fornecido no campo `TxInfAndSts.ExctnConf` é libertado pelo FXP como indicação ao HUB de que os termos foram cumpridos. 

Eis um exemplo da mensagem:
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
#### Detalhes da mensagem
Os detalhes sobre como compor e invocar esta API são abordados nas secções seguintes:
1. [Elementos de dados principais](#elementos-de-dados-principais)<br>Esta secção especifica que campos são obrigatórios, que campos são opcionais e que campos não são permitidos para cumprir os requisitos de validação da mensagem.
2. [Detalhes do cabeçalho](../MarketPracticeDocument.md#_3-3-1-detalhes-do-cabecalho)<br> Esta secção geral especifica os requisitos de cabeçalho para a API.
3. [Respostas HTTP permitidas](../MarketPracticeDocument.md#_3-3-2-respostas-http-permitidas)<br> Esta secção geral especifica as respostas http que devem ser permitidas.
4. [Payload de erro comum](../MarketPracticeDocument.md#_3-3-3-payload-de-erro-comum)<br> Esta secção geral especifica o payload de erro comum que é fornecido na resposta de erro http síncrona.

#### Elementos de dados principais
Eis os elementos de dados principais necessários para cumprir este requisito de prática de mercado.

As cores de fundo indicam a classificação do elemento de dados.

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

  <table> <tr> <th>Legenda do tipo de modelo de dados</th> <th>Descrição</th> </tr>
   <tr class="required"> <td><b>obrigatório</b></td><td>Estes campos são obrigatórios para cumprir os requisitos de validação da mensagem.</td></tr>
   <tr class="optional"> <td><b>opcional</b></td><td>Estes campos podem ser opcionalmente incluídos na mensagem. (Alguns destes campos podem ser obrigatórios para um scheme específico (o scheme é o conjunto de regras do sistema de pagamentos), conforme definido nas regras do scheme (Scheme Rules) desse scheme.)</td></tr>
   <tr class="unsupported"> <td><b>não permitido</b></td><td>Estes campos são expressamente não permitidos. A funcionalidade que especifica dados nestes campos não é compatível com um scheme Mojaloop e falhará a validação da mensagem se for fornecida.</td></tr>
  </table>
   <br><br>
    

Eis a tabela de elementos de dados principais definida.

<table>
  <tr>
    <th>Campo ISO 20022</th>
    <th>Modelo de dados</th>
    <th>Descrição</th>
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


## 7.13 PATCH /fxTransfers/{ID}
| Financial Institution to Financial Institution Payment Status Report - **pacs.002.001.15**|
|--|

#### Context 
*(HUB -> FXP)*

This message use by the HUB to inform the foreign exchange provider participant in a cross currency transfer of the successful conclusion of the conversion. This message is only generated if the dependent transfer is committed in the hub.

Here is an example of the message:
```json
{
"GrpHdr": {
    "MsgId":"01JBVM1CGC5A18XQVYYRF68FD1",
    "CreDtTm":"2024-11-04T12:57:45.228Z"},
"TxInfAndSts":{
    "PrcgDt":{
        "DtTm":"2024-11-04T12:57:45.213Z"},
    "TxSts":"COMM"}
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
      <tr class=required><td>  <b>GrpHdr</b> - GroupHeader120</td><td>[1..1]</td><td>Set of characteristics shared by all individual transactions included in the message.<br></td></tr>
<tr class=required><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>MsgId</b> - MessageIdentification</td><td>[1..1]</td><td>Definition: Point to point reference, as assigned by the instructing party, and sent to the next party in the chain to unambiguously identify the message.<br>Usage: The instructing party has to make sure that MessageIdentification is unique per instructed party for a pre-agreed period.<br></td></tr>
<tr class=required><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>CreDtTm</b> - CreationDateTime</td><td>[1..1]</td><td>Date and time at which the message was created.<br></td></tr>
<tr class=unsupported><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>InstgAgt</b> - BranchAndFinancialInstitutionIdentification8</td><td>[0..0]</td><td>Unique and unambiguous identification of a financial institution or a branch of a financial institution.<br></td></tr>
<tr class=unsupported><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>InstdAgt</b> - BranchAndFinancialInstitutionIdentification8</td><td>[0..0]</td><td>Unique and unambiguous identification of a financial institution or a branch of a financial institution.<br></td></tr>
<tr class=unsupported><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>OrgnlBizQry</b> - OriginalBusinessQuery1</td><td>[0..0]</td><td></td></tr>
<tr class=unsupported><td>  <b>OrgnlGrpInfAndSts</b> - OriginalGroupHeader22</td><td>[0..0]</td><td></td></tr>
<tr class=required><td>  <b>TxInfAndSts</b> - PaymentTransaction161</td><td>[1..1]</td><td>Information concerning the original transactions, to which the status report message refers.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>StsId</b> - Max35Text</td><td>[0..1]</td><td>Unique identification, as assigned by the original sending party, to unambiguously identify the status report.<br></td></tr>
<tr class=unsupported><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>OrgnlGrpInf</b> - OriginalGroupInformation29</td><td>[0..0]</td><td></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>OrgnlInstrId</b> - Max35Text</td><td>[0..1]</td><td>Unique identification, as assigned by the original sending party, to<br>unambiguously identify the original instruction.<br><br>(FSPIOP equivalent: transactionRequestId)<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>OrgnlEndToEndId</b> - Max35Text</td><td>[0..1]</td><td>Unique identification, as assigned by the original sending party, to<br>unambiguously identify the original end-to-end transaction.<br><br>(FSPIOP equivalent: transactionId)<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>OrgnlTxId</b> - Max35Text</td><td>[0..1]</td><td>Unique identification, as assigned by the original sending party, to<br>unambiguously identify the original transaction.<br><br>(FSPIOP equivalent: quoteId)<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>OrgnlUETR</b> - UUIDv4Identifier</td><td>[0..1]</td><td>Unique end-to-end transaction reference, as assigned by the original sending party, to unambiguously identify the original transaction.<br></td></tr>
<tr class=required><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>TxSts</b> - ExternalPaymentTransactionStatus1Code</td><td>[1..1]</td><td>Specifies the status of the transaction.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>StsRsnInf</b> - StatusReasonInformation14</td><td>[0..1]</td><td>Information concerning the reason for the status.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>Orgtr</b> - Originator</td><td>[0..1]</td><td>Party that issues the status.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>Nm</b> - Name</td><td>[0..1]</td><td>Name by which a party is known and which is usually used to identify that party.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>PstlAdr</b> - Postal Address</td><td>[0..1]</td><td>Information that locates and identifies a specific address, as defined by postal services.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>AdrTp</b> - AddressType3Choice</td><td>[0..1]</td><td>Type of address, as defined by the postal services.</td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>Cd</b> - Code</td><td>[0..1]</td><td>Type of address expressed as a code.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>Prtry</b> - Proprietary</td><td>[0..1]</td><td>Type of address expressed as a proprietary code.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>Id</b> - Identification</td><td>[0..1]</td><td>Proprietary information, often a code, issued by the data source scheme issuer.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>Issr</b> - Issuer</td><td>[0..1]</td><td>Entity that assigns the identification.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>SchmeNm</b> - SchemeName</td><td>[0..1]</td><td>Short textual description of the scheme.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>CareOf</b> - Max140Text</td><td>[0..1]</td><td>Name of the person or entity the mail is directed to, if different from the recipient.</td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>Dept</b> - Max70Text</td><td>[0..1]</td><td>Name of a department within an organization.</td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>SubDept</b> - Max70Text</td><td>[0..1]</td><td>Name of a sub-department within a department.</td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>StrtNm</b> - Max140Text</td><td>[0..1]</td><td>Name of the street or thoroughfare.</td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>BldgNb</b> - Max16Text</td><td>[0..1]</td><td>Number that identifies a building on the street.</td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>BldgNm</b> - Max140Text</td><td>[0..1]</td><td>Name of the building, if applicable.</td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>Flr</b> - Max70Text</td><td>[0..1]</td><td>Floor number or identifier within a building.</td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>UnitNb</b> - Max16Text</td><td>[0..1]</td><td>Unit or apartment number within a building.</td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>PstBx</b> - Max16Text</td><td>[0..1]</td><td>Post office box number.</td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>Room</b> - Max70Text</td><td>[0..1]</td><td>Room number or identifier within a building.</td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>PstCd</b> - Max16Text</td><td>[0..1]</td><td>Postal code or ZIP code.</td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>TwnNm</b> - Max140Text</td><td>[0..1]</td><td>Name of the town or city.</td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>TwnLctnNm</b> - Max140Text</td><td>[0..1]</td><td>Name of the location within a town or city.</td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>DstrctNm</b> - Max140Text</td><td>[0..1]</td><td>Name of the district or region.</td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>CtrySubDvsn</b> - Max35Text</td><td>[0..1]</td><td>Name of the country subdivision, such as a state or province.</td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>Ctry</b> - CountryCode</td><td>[0..1]</td><td>Country code, as defined by ISO 3166-1 alpha-2.</td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>AdrLine</b> - Max70Text</td><td>[0..1]</td><td>Free-form text line for the address.</td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>Id</b> - Identification</td><td>[0..1]</td><td>Unique and unambiguous identification of a party.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>OrgId</b> - Organisation</td><td>[0..1]</td><td>Unique and unambiguous way to identify an organisation.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>AnyBIC</b> - AnyBIC</td><td>[0..1]</td><td>Business identification code of the organisation.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>LEI</b> - LEI</td><td>[0..1]</td><td>Legal entity identification as an alternate identification for a party.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>Othr</b> - Other</td><td>[0..1]</td><td>Unique identification of an organisation, as assigned by an institution, using an identification scheme.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>Id</b> - Identification</td><td>[0..1]</td><td>Identification assigned by an institution.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>SchmeNm</b> - SchemeName</td><td>[0..1]</td><td>Name of the identification scheme.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>Cd</b> - Code</td><td>[0..1]</td><td>Name of the identification scheme, in a coded form as published in an external list.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>Prtry</b> - Proprietary</td><td>[0..1]</td><td>Name of the identification scheme, in a free text form.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>Issr</b> - Issuer</td><td>[0..1]</td><td>Entity that assigns the identification.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>PrvtId</b> - Person</td><td>[0..1]</td><td>Unique and unambiguous identification of a person, for example a passport.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>DtAndPlcOfBirth</b> - DateAndPlaceOfBirth</td><td>[0..1]</td><td>Date and place of birth of a person.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>BirthDt</b> - BirthDate</td><td>[0..1]</td><td>Date on which a person was born.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>PrvcOfBirth</b> - ProvinceOfBirth</td><td>[0..1]</td><td>Province where a person was born.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>CityOfBirth</b> - CityOfBirth</td><td>[0..1]</td><td>City where a person was born.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>CtryOfBirth</b> - CountryOfBirth</td><td>[0..1]</td><td>Country where a person was born.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>Othr</b> - Other</td><td>[0..1]</td><td>Unique identification of a person, as assigned by an institution, using an identification scheme.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>Id</b> - Identification</td><td>[0..1]</td><td>Unique and unambiguous identification of a person.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>SchmeNm</b> - SchemeName</td><td>[0..1]</td><td>Name of the identification scheme.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>Cd</b> - Code</td><td>[0..1]</td><td>Name of the identification scheme, in a coded form as published in an external list.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>Prtry</b> - Proprietary</td><td>[0..1]</td><td>Name of the identification scheme, in a free text form.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>Issr</b> - Issuer</td><td>[0..1]</td><td>Entity that assigns the identification.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>CtryOfRes</b> - CountryCode</td><td>[0..1]</td><td>Country of Residence<br>Country in which a person resides (the place of a person's home). In the case of a company, it is the country from which the affairs of that company are directed.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>CtctDtls</b> - Contact Details</td><td>[0..1]</td><td>Set of elements used to indicate how to contact the party.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>NmPrfx</b> - NamePrefix</td><td>[0..1]</td><td>Specifies the terms used to formally address a person.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>Nm</b> - Name</td><td>[0..1]</td><td>Name by which a party is known and which is usually used to identify that party.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>PhneNb</b> - PhoneNumber</td><td>[0..1]</td><td>Collection of information that identifies a phone number, as defined by telecom services.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>MobNb</b> - MobilePhoneNumber</td><td>[0..1]</td><td>Collection of information that identifies a mobile phone number, as defined by telecom services.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>FaxNb</b> - FaxNumber</td><td>[0..1]</td><td>Collection of information that identifies a fax number, as defined by telecom services.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>URLAdr</b> - URLAddress</td><td>[0..1]</td><td>Address for the Universal Resource Locator (URL), for example an address used over the www (HTTP) service.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>EmailAdr</b> - EmailAddress</td><td>[0..1]</td><td>Address for electronic mail (e-mail).<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>EmailPurp</b> - EmailPurpose</td><td>[0..1]</td><td>Purpose for which an email address may be used.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>JobTitl</b> - JobTitle</td><td>[0..1]</td><td>Title of the function.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>Rspnsblty</b> - Responsibility</td><td>[0..1]</td><td>Role of a person in an organisation.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>Dept</b> - Department</td><td>[0..1]</td><td>Identification of a division of a large organisation or building.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>Othr</b> - OtherContact</td><td>[0..1]</td><td>Contact details in another form.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>ChanlTp</b> - ChannelType</td><td>[0..1]</td><td>Method used to contact the financial institution's contact for the specific tax region.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>Id</b> - Identifier</td><td>[0..1]</td><td>Communication value such as phone number or email address.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>PrefrdMtd</b> - PreferredContactMethod</td><td>[0..1]</td><td>Preferred method used to reach the contact.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>Rsn</b> - Reason</td><td>[0..1]</td><td>Specifies the reason for the status report.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>Cd</b> - Code</td><td>[0..1]</td><td>Reason for the status, as published in an external reason code list.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>Prtry</b> - Proprietary</td><td>[0..1]</td><td>Reason for the status, in a proprietary form.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>AddtlInf</b> - AdditionalInformation</td><td>[0..1]</td><td>Additional information about the status report.<br></td></tr>
<tr class=unsupported><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>ChrgsInf</b> - Charges16</td><td>[0..0]</td><td>NOTE: Unsure on description.<br><br>Seemingly a generic schema for charges, with an amount, agent, and type.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>AccptncDtTm</b> - ISODateTime</td><td>[0..1]</td><td>Date and time at which the status was accepted.<br></td></tr>
<tr class=required><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>PrcgDt</b> - DateAndDateTime2Choice</td><td>[1..1]</td><td>Date/time at which the instruction was processed by the specified party.<br></td></tr>
<tr class=required><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>Dt</b> - Date</td><td>[1..1]</td><td>Specified date.<br></td></tr>
<tr class=required><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>DtTm</b> - DateTime</td><td>[1..1]</td><td>Specified date and time.<br></td></tr>
<tr class=unsupported><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>FctvIntrBkSttlmDt</b> - DateAndDateTime2Choice</td><td>[0..0]</td><td>Specifies the reason for the status.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>AcctSvcrRef</b> - Max35Text</td><td>[0..1]</td><td>Unique reference, as assigned by the account servicing institution, to unambiguously identify the status report.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>ClrSysRef</b> - Max35Text</td><td>[0..1]</td><td>Reference that is assigned by the account servicing institution and sent to the account owner to unambiguously identify the transaction.<br></td></tr>
<tr class=unsupported><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>InstgAgt</b> - BranchAndFinancialInstitutionIdentification8</td><td>[0..0]</td><td>Unique and unambiguous identification of a financial institution or a branch of a financial institution.<br></td></tr>
<tr class=unsupported><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>InstdAgt</b> - BranchAndFinancialInstitutionIdentification8</td><td>[0..0]</td><td>Unique and unambiguous identification of a financial institution or a branch of a financial institution.<br></td></tr>
<tr class=unsupported><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>OrgnlTxRef</b> - OriginalTransactionReference42</td><td>[0..0]</td><td></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>SplmtryData</b> - SupplementaryData1</td><td>[0..1]</td><td>Additional information that cannot be captured in the structured elements and/or any other specific block.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>PlcAndNm</b> - PlaceAndName</td><td>[0..1]</td><td>Unambiguous reference to the location where the supplementary data must be inserted in the message instance.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <b>Envlp</b> - Envelope</td><td>[0..1]</td><td>Technical element wrapping the supplementary data.<br>Technical component that contains the validated supplementary data information. This technical envelope allows to segregate the supplementary data information from any other information.<br></td></tr>
<tr class=optional><td>  <b>SplmtryData</b> - SupplementaryData1</td><td>[0..1]</td><td>Additional information that cannot be captured in the structured elements and/or any other specific block.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>PlcAndNm</b> - PlaceAndName</td><td>[0..1]</td><td>Unambiguous reference to the location where the supplementary data must be inserted in the message instance.<br></td></tr>
<tr class=optional><td>&nbsp;&nbsp;&nbsp;&nbsp;  <b>Envlp</b> - Envelope</td><td>[0..1]</td><td>Technical element wrapping the supplementary data.<br>Technical component that contains the validated supplementary data information. This technical envelope allows to segregate the supplementary data information from any other information.<br></td></tr>
</table>


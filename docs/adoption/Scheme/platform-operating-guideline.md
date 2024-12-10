# Platform Operating Guideline Template

- Version: 2.0 
    - Author: Carol Coye Benson (Glenbrook), Michael Richards (ModusBox)  
    - Date: October 2019
    - Description: 

---

## **About the Mojaloop Community Business Document Project**

This document is part of the Mojaloop Community Business Document Project. The project is intended to support entities (countries, regions, associations of providers or commercial enterprises) implementing new payments systems using Mojaloop code. These entities will also need write Business Rules that participants in the system will follow.

The Mojaloop Community Business Document Project provides templates for Business Rules and related documents. There are many choices involved in implementing a new payment system: the templates show some of the choices and, where appropriate, commentary is provided on how the particular choice is related to the goals of a Level One aligned system.

The following documents are part of the project:

- Scheme Key Choices

- Scheme Participation Agreement Template

- Scheme Business Rules Template

- Platform Operating Guideline Template

- Exception Management Operating Guideline Template

- Uniform Glossary

## **Introduction**

A Scheme implementing a Level One aligned system, including those using Mojaloop reference code in the platform, will need to write Business Rules for the Scheme. A template for those Business Rules is included in this project. The Business Rules introduce the concept of Associated Documents, which are part of the Business Rules and have the same force — DFSPs signing the Business Rules are also bound to follow provisions in Associated Documents.

The Platform Operating Guideline is an important Associated Document that describes how the Scheme Platform will operate, and specifies the obligations and responsibilities of the Scheme, the Platform Operator, and the DFSPs.

This document is a template for such a Platform Operating Guideline. Many provisions in it, however, will vary depending on what choices the Scheme has made: some of these choices are described in the "Scheme Key Choices" document which is a part of this project.

The Business Rules template that is part of this project can be used independent of a scheme's choice of platform. This Platform Operating Guideline is more specific to the use of Mojaloop as a platform.

## **Table of Contents — Platform Operating Guideline Template**

[1 - About This Document](#_1-about-this-document)

[1.1 - Scheme Services](#_1-1-scheme-services)

[1.2 - Open API Specification](#_1-2-open-api-specification)

[1.3 - Scheme Use Cases](#_1-3-scheme-use-cases)

[1.4 - Scheme Supported Identifiers](#_1-4-scheme-supported-identifiers)

[2 - The Account Lookup Service](#_2-the-account-lookup-service)

[2.1 - Description of the Account Lookup Service](#_2-1-description-of-the-account-lookup-service)

[2.2 - Party Request](#_2-2-party-request)

[2.3 - Parties Query](#_2-3-parties-query)

[2.4 - Parties Query Response](#_2-4-parties-query-response)

[3 - The Quote Service](#_3-the-quote-service)

[3.1 - Description of the Quote Service](#_3-1-description-of-the-quote-service)

[3.2 - Quote Request](#_3-2-quote-request)

[3.3 - Quote Response](#_3-3-quote-response)

[4 - The Transfer Service](#_4-the-transfer-service)

[4.1 - Description of the Transfer Service](#_4-1-description-of-the-transfer-service)

[4.2 - Transfer Request](#_4-2-transfer-request)

[4.3 - Request to Pay](#_4-3-request-to-pay)

[5 - The Settlement Service](#_5-the-settlement-service)

[5.1 - Transfer Settlement](#_5-1-transfer-settlement)

[5.2 - Fee Settlement: Processing Fees](#_5-2-fee-settlement-processing-fees)

[5.3 - Fee Settlement: Interchange Fees](#_5-3-fee-settlement-interchange-fees)

[6 - The Scheme Management Service](#_6-the-scheme-management-service)

[6.1 - Description of the Scheme Management Service](#_6-1-description-of-the-scheme-management-service)

[6.2 - The Registration Process](#_6-2-the-registration-process)

[6.3 - DFSP Customer Service](#_6-3-dfsp-customer-service)

[6.4 - Scheme System Management](#_6-4-scheme-system-management)

[7 - The Fraud Management Service](#_7-the-fraud-management-service)

[8 - Appendix: Scheme Supported Use Cases and System Parameters](#_8-appendix-scheme-supported-use-cases-and-system-parameters)

[9 - Appendix: Merchant Category Codes](#_9-appendix-merchant-category-codes)

## 1. About This Document

These Platform Operating Guidelines specify operational and technical requirements for DFSPs and for the Scheme. From time to time the Scheme will issue additional Operational Bulletins, which will describe additional operational features of the Scheme and specify additional requirements of DFSPs.

### 1.1 Scheme Services

- Scheme Services are used by DFSPs to exchange interoperable transactions, and to manage their involvement with the Scheme.

- The Scheme Account Lookup Service enables DFSPs in the system to identify the DFSP who manages the Transaction Account for an intended Payee or other counterparty to a Transfer.

- The Scheme Transfer Service enables a Payer DFSP to send a Transfer to a Payee DFSP, thereby effecting a transfer of funds from a Payer to a Payee.

- The Scheme Settlement Service enables DFSPs to settle their financial obligations to the Scheme with respect to Transfers.

- The Scheme Management Service enables the Scheme to grant and revoke access to Scheme by DFSPs, manages the ongoing interactions of DFSPs with Scheme, monitors the effective operation of Scheme, and provides tools for DFSPs to manage their involvement with Scheme.

- The Scheme Fraud Management Service enables DFSPs to collaborate on certain elements of fraud management in order to reduce costs and improve results.

- DFSPs are required to follow the procedures detailed below for using Scheme.

### 1.2 Open API Specification

Scheme protocols are based on the operational and data models defined in the specifications document "Open API for FSP Interoperability Specification" version 1.0 dated \[xx\]. Where the Scheme departs from this specification, such departures are documented here and will supersede the relevant sections of that document. The Scheme may update the version used by issuing an Operational Bulletin.

### 1.3 Scheme Use Cases

Some rules and operational specifications vary by Use Cases and Secondary Use Cases supported by Scheme. Scheme recognizes Use Cases and Secondary Use Cases by a combination of required data components and system inference. This is detailed in an Appendix to this document.

### 1.4 Scheme Supported Identifiers

The Scheme supports certain Identifiers, or payment addresses, for use in making Transfers. The Identifier identifies the Payee whose Transaction Account is credited for the Transfer. Supported Scheme Identifiers are listed in an Appendix to the Business Rules.

For each scheme supported identifier, this document should specify what the identifier is and how it is resolved (how it is determined which Payee DFSP is responsible for the transaction account associated with that identifier.

#### 1.4.1 Example: The MSISDN Identifier 

Each scheme will have its own guidelines for each identifier; the provisions below could vary significantly depending on choices made.

- MSISDN's are mobile numbers which are globally unique. MSISDN's are the Transaction Account Identifier for DFPSs who are Mobile Network Operators and who are providing Transaction Accounts to their customers.

- Use of the MSISDN as a Payee Identifier is limited to Transaction Accounts provided by DFSPs who are the Mobile Network Operator responsible for that MSISDN.

::: tip NOTE
If MSISDN's are used for other Transaction Accounts, they are aliases, and a separate protocol for resolving them must be specified.
:::

- A Party Request for an MSISDN is resolved by a MSISDN directory service determined by the Scheme. The Scheme may specify directory service maintenance obligations for Mobile Network Operator DFSPs from time to time.

#### 1.4.2 Example: The Bank Account Number Identifier 

Each scheme will have its own guidelines for each identifier; the provisions below could vary significantly depending on choices made.

- Bank Account numbers are assigned to customers by Bank DFSPs who are providing Transaction Accounts to their customers.

- The Bank Account Number, together with a Bank Code, form the Scheme Bank Account Number Identifier. Payer DFSPs are responsible for correctly formatting the Bank Account Number Identifier according to formats that will be specified by the Scheme.

- Use of the Bank Account Number Identifier is limited to Transaction Accounts which are provided by DFSPs who are Banks.

- A Party Request for a Bank Account Identifier is sent by the Payer DFSP to Scheme. Scheme checks that the Bank Code in the Bank Account Identifier is associated with a Bank active in Scheme.

#### 1.4.3 Example: The Scheme Merchant Identifier 

Each scheme will have its own guidelines for each identifier; the provisions below could vary significantly depending on choices made.

- The Merchant ID is a Scheme-defined identifier used for person-to-business payments.

- Use of the Merchant ID is limited to DFSPs who are providing Transaction Accounts to merchants, billers, government agencies or other enterprise entities who are receiving payments from their customers over Scheme. It may be used for both in-person and remote payments. The term "merchant" used in this section includes all of these types of receivers of payments.

- Use of the Merchant ID is limited to Transfers of the P2B or P2G Use Cases

- A merchant may request multiple merchant IDs from their DFSP; these may be used by the merchant for different outlets, tills, or stores. There is no limit to the number of merchant IDs that can be linked to a single Transaction Account. A given merchant ID, however, may only be linked to a single Transaction Account.

- The Merchant ID is issued by Scheme to the DFSP who is providing the merchant with the Transaction Account into which payments will be made.

- The Merchant ID is issued as a number, which may be displayed by a merchant physically or digitally.

- Merchant ID's may be rendered as QR codes by DFSPs or their merchant customers. QR codes must be rendered under format and brand guidelines that will be issued by the Scheme. DFSPs are prohibited from using other QR code data formats or brands to receive payments through Scheme.

- DFSPs are required to display Scheme branding. Scheme brand requirements will be specified by the Scheme. Scheme branding must be visible to the customer in the merchant store, or on the device the paying customer is using to purchase remotely.

- Registration Requirements. DFSPs will request a Merchant ID for a customer using a Scheme API specific to this purpose. DFSPs will be required to provide:

    - DFSP ID

    - The Transaction Account number which will receive the funds paid to the merchant. This may be either an MSISDN or a bank account number.

    - The \[business registration or tax ID\] of the merchant. Any number of merchant IDs may be associated with the same business registration or tax ID.

    - The Merchant Name

- DFSPs requesting a Merchant ID from Scheme warrant that they have completed the required KYC information for the merchant account at the time of the request.

- DFSPs are required to provide adequate training information to their customers.

- Disabling Merchant IDs. DFSPs may request that a Merchant ID be disabled. Scheme will immediately disable this Merchant ID, but will retain it in the Scheme system for reporting purposes. Quote Requests or Transfer Requests made to this Merchant ID will be refused by Scheme and returned the Payer DFSP.

The Scheme may wish to provide some mechanism for porting a Merchant ID from one DFSP to another.

#### 1.4.4 The Scheme ID Identifier 

This ID would be similar to the Merchant ID above but would be meant for consumers as well as businesses, and could be expressed in phrases rather than as a number. Note each scheme will have its own guidelines for each identifier; the provisions below could vary significantly depending on choices made.

- The Scheme ID is a Scheme-defined identifier.

- DFSPs are required to offer their customers the option of requesting a Scheme ID.

- Scheme IDs can be in any form, subject only to restrictions of length which Scheme will specify from time to time. Scheme reserves the right to refuse the use of any specific requested Scheme ID.

Schemes may wish to enable Scheme ID's

- Customers may request any number of Scheme IDs, subject to limits imposed by their DFSP. Multiple Scheme IDs can be associated with a single Transaction Account. Each Scheme ID, however, can be associated with only a single Transaction Account.

- Registration Requirements. DFSPs will request a Scheme ID for a customer using a Scheme API specific to this purpose. DFSPs will be required to provide in this API:

    - DFSP ID

    - The requested Scheme ID

    - The Transaction Account number which will receive the funds paid to the customer. This may be either an MSISDN or a bank account number.

    - If the Transaction Account Holder is a merchant or business, the \[business registration or tax ID\] of the Account Holder. Any number of Scheme IDs may be associated with the same business registration or tax ID.

- DFSPs requesting a Scheme ID from Scheme warrant that they have completed the required KYC information for the customer account at the time of the request.

- Disabling Scheme Identifiers. DFSPs may request that a Scheme ID be disabled. Scheme will immediately disable this Scheme ID, but will retain it in the Scheme system for reporting purposes. Quote Requests or Transfer Requests made to this Scheme ID will be refused by Scheme and returned to the Payer DFSP.

The Scheme may wish to provide some mechanism for porting a Scheme ID from one DFSP to another.

The following sections describe each service and the obligations and responsibilities of stakeholders. Each service consists of processes: most of the processes are linked to specific API calls specified in the [Open API Specification](#_1-2-open-api-specification) section of this document.

## 2. The Account Lookup Service

### 2.1 Description of the Account Lookup Service 

- The Account Lookup Service allows DFSPs to map specific Identifiers for individual customers to the DFSP that provides a Transaction Account for that customer. Identifiers are used to identify individuals, merchants, billers, government agencies or other enterprises. Any Identifier Type supported by Scheme has a defined Identifier Service, the parameters of which are shown in the section "Scheme Supported Identifiers" of this document.

- All Identifier Services ensure that Identifiers used for Scheme Transactions are unique within Scheme and are associated with a single DFSP who provides the relevant Transaction Account for that customer. Any Identifier must be associated with a single Transaction Account.

- DFSPs must complete the Account Lookup process immediately before initiating a Quote process unless otherwise permitted in these Guidelines.

### 2.2 Party Request

- A Party Request is sent by a Payer DFSP to the Platform. The Party Request must contain the following key data elements:

    - The Identifier for the intended Payee

    - The Payer DFSP identifier

The scheme may define additional key data elements which will be required in the Parties Request.

- The request is forwarded from the Platform to the Account Lookup Service for that Identifier type.

- The Identifier Service returns to the Account Lookup Service the identification of the DFSP associated with that Identifier, if a reference is found. If it is not, a negative response is returned and this is communicated by the Platform to the Payer DFSP. If a reference is found, the Account Lookup Service then associates the identified DFSP with the correct Scheme DFSP ID.

### 2.3 Parties Query

- If the Party Request succeeds in identifying a Payee DFSP, the Platform then executes a Parties Query to the identified DFSP to determine if the DFSP is willing to accept a Quote Request directed to that Identifier.

### 2.4 Parties Query Response

- The identified DFSP responds either with a positive Parties Query Response or with an error response. If positive, the Parties Query Response must contain the following key data elements:

    - The full Name of the Payee

    - The Payer DFSP Identifier

    - The Transaction Account Type, which specifies whether the Account is a bank account or a wallet

    - The Transaction Account Holder Type, which specifies whether the Transaction Account Holder is a consumer, a merchant (including other enterprise types) or a government agency.

    - If the Payee is a Merchant, the Merchant Category Code. These codes are found in an appendix to this document.

The scheme may define additional data elements required in the Parties Query Response.

-   The Platform responds to the Payer DFSP with the result of the Parties Query Response

## 3. The Quote Service

#### 3.1 Description of the Quote Service

- The Quote Process precedes the Transfer Process, and allows the Payer and Payee DFSP to exchange certain information prior to the Transfer.

- The Quote Process must be completed before a Payer DFSP initiates the Transfer Process. This is true for all Use Cases and Secondary Use Cases.

- The steps in the Quote Process are shown below.

#### 3.2 Quote Request 

- A Quote Request is sent by a Payer DFSP to the Payee DFSP; the Quote Request is recorded by the Platform. The Quote Request must contain the following key data elements:

    - The Transfer Amount

    - The Amount Type set as a Send Amount.

    - The complete set of Party Information that was returned from the Parties Request Response.

    - The Full Name of the Payer (the Transaction Account Holder at the Payer DFSP)

    - Transaction Type data required for the Use Case and Secondary Use Case of the Transaction, as specified in the Use Case Appendix to this document.

    - An expiry time, the allowable parameters of which will be specified by the scheme from time to time.

The scheme may define additional key data elements which will be required in the Parties Query Response.

- A Quote Request for an amount above the Scheme Transaction Value Limit will be rejected by the Platform and returned to the Payer DFSP.

### 3.3 Quote Response

- A Quote Response is sent by the Payee DFSP to the Payer DFSP; the Quote Response is recorded by the Platform. The Payee DFSP is required to respond to a Quote Request.

- The Quote Response must contain the following key data elements:

    - The Transfer Amount

    - An expiry time, the allowable parameters of which will be specified by the Scheme from time to time.

    - The signed Transaction Object which contains the parameters of the transfer. The Transaction Object is the authoritative description of the transaction for the purposes of Scheme reporting, fraud management and dispute resolution.

The scheme may define additional key data elements which will be required in the Parties Query Response.

- The Quote Response is signed by the Payee DFSP and defines the parameters of the Transaction; the Payer DFSP cannot change these parameters in the Transfer Process.

## 4. The Transfer Service

### 4.1 Description of the Transfer Service

- The Transfer Service is the means by which the actual transfer of funds is accomplished between Payer DFSP and Payee DFSP. The Transfer Request is the key process within the service. A Transfer Request must be preceded by a Quote process.

### 4.2 Transfer Request

- A Transfer Request is sent by a Payer DFSP to the Payee DFSP via the Transfer Service at Scheme. The Platform records the Transfer Request. The Transfer Request must contain the following key data elements:

    - The Payer and Payee DFSP Identifiers

    - The Transaction Amount

    - An ILP packet representing the Transaction Object

    - An expiry time, the allowable parameters of which will be specified by the Scheme from time to time.

The scheme may define additional key data elements which will be required in the Transfer Request.

- The Transfer Request is signed by the Payer DFSP

- The Platform performs a Transfer Approval process to determine if the proposed Transfer can be settled. The Transfer Approval process is further defined in the Settlement Service section of this document.

- If the Transfer Request fails the Transfer Approval process, the Transfer Request is returned to the Payer DFSP.

- If the Transfer Request passes the Transfer Approval process, the Platform reserves the funds specified in the Transfer Request in the Payer DFSP's Position Ledger. This is further defined in the Settlement Service section of this document.

- The Payee DFSP determines if they will accept the Transfer.

- If not accepted, an error response is returned to the Platform. The Platform releases the reservation of funds in the Payer DFSP's Position Ledger and returns an error condition to the Payer DFSP.

- If accepted, the Payee DFSP returns a signed Transfer Response indicating that the Transfer has been Fulfilled. The Platform replaces the provisional debit with a debit in the Payer DFSP's Position Ledger and credits the Payee's DFSP's Position Ledger with a credit in the amount of the Transfer.

- The Platform then sends a confirmation of the fulfilled Transfer to the Payer DFSP and to the Payee DFSP.

- If the Platform does not receive a signed Transfer Response within the expiry period in the Transfer Request, the transfer will be cancelled and Scheme will notify the Payee and Payer DFSPs of this.

- Payer and Payee DFSPs are required:

    - To notify their customers of the status of a transfer on a timely basis

    - To immediately debit and credit the Transaction Accounts of their customers upon fulfillment of the Transfer

    - To release any reserved funds immediately if a Transfer has been refused or cancelled

### 4.3 Request to Pay 

_This section has not yet been written._

## 5. The Settlement Service

This document presents a template for the settlement processes both for transfers and for scheme fees. There are multiple possible approaches to settlement, which are discussed in the "Key Choices" document that is part of this project. The template below covers two models: net settlement and continuous gross settlement. Mojaloop reference code supports a number of different settlement models, including these.

### 5.1 Transfer Settlement 

#### 5.1.1 Description of the Transfer Settlement Service

- Transfer Settlement is the means by which DFSPs settle their financial obligations to each other. There are five processes to Transfer Settlement: the Ledger Process, the Net Debit Cap Process, the Transfer Approval Process, the Settlement Posting Process and
the Settlement Account Management Process.

- \[_Net settlement option_\] DFSPs are required to open a Settlement Bank account with the Scheme Settlement Bank. \[_Continuous gross settlement option_\] DFSPs are required to become joint owners of the Scheme Pooled Settlement bank account at the Scheme Settlement Bank, and to use or open such other individual bank accounts at the Scheme Settlement Bank as necessary to transfer funds into and out of the Scheme Pooled Settlement bank account.

#### 5.1.2 The Platform Ledger 

- The Platform is responsible for maintaining a DFSP Position Ledger for each DFSP. This operation runs on a continual basis. \[_Continuous gross settlement option_\] The DFSP Position Ledger of each DFSP, less any provisional entries, represents the ownership share of that DFSP in the Scheme Pooled Settlement Bank Account.

- The Position Ledger records:

    - All Fulfilled Transfer as debits to the Payer DFSP's ledger and credits to the Payee DFSP's ledger

    - All Transfer Requests as provisional debits to the Payer DFSP's ledger. These provisional debits are removed when the Transfer is Fulfilled, refused by the Payee DFSP, or expires.

    - \[_Net settlement option only_\] Settlement Entries delivered to and accepted by the Scheme Settlement Bank for that DFSP.

    - \[_Continuous gross settlement option only_\] Transfers into and out of the Scheme Pooled Settlement Bank account made by DFSPs.

- The DFSP Ledger Position is the sum of all of the items listed above. This is used in the Transfer Approval Process.

#### 5.1.3 Net Debit Cap Process

- The Net Debit Cap for a DFSP is a value that the Platform uses during the Transfer Approval Process. The Net Debit for a DFSP is the sum of:

    - \[_Net Settlement Option only_\] A value set by the scheme that is intended to represent the funds the DFSP has available in its Settlement Bank Account

Note the scheme may be able to automate the calculation of value described above, or it may choose to manually input this into the Platform Operator section of the Scheme Portal.

- The Scheme Margin for that DFSP. This is a value, determined by the Scheme, that is specific to a given DFSP. This value may be a percentage of the DFSP Ledger Position or it may be an absolute value. The Scheme may change the Scheme Margin for any DFSP at its discretion. It may have the effect of either increasing or decreasing a DFSP's ability to execute transactions.

- The DFSP Discretionary Margin. This is a value, determined by an individual DFSP, which lowers the absolute value of the Net Debit Cap. The DFSP Discretionary Margin is set within allowable parameters defined by the Scheme. This has the effect of decreasing the DFSP's ability to execute transactions.

#### 5.1.4 Transfer Approval Process 

- Transfer Approval. When the Platform receives a Transfer Request from a Payer DFSP, the Platform will approve or reject the request based on a comparison of the amount of the requested transfer to the Payer DFSP's Current Ledger Position less the Payer DFSP's Net Debit Cap.

- If the requested transfer is less this sum, the Platform will forward the request to the Payee DFSP. If it is more than the value of the Net Debit Cap, the Platform will reject the request and return it to the Payer DFSP.

#### 5.1.5 Settlement Posting Process

- \[_Net settlement option only_\] The scheme will define the parameters of the Settlement Windows used for the scheme; this will include the frequency of windows or other parameters (value limits, etc.) chosen for defining settlement windows.

- \[_Net settlement option only_\] At the end of each defined settlement window, the Platform will calculate the net settlement position of every DFSP: this position is the balance in the DFSP Position Ledger. These balances become the Settlement Entries for that window.

- \[_Net settlement option only_\] The Platform will send Settlement Entries for each DFSP to the scheme-chosen Settlement Bank

- \[_Net settlement option only_\] The Settlement Bank will post Settlement Entries to the Settlement Bank Account of each DFSP, and send confirmation to the Platform of the completion of this process.

Scheme rules will need to account for provisions and procedures in the event of a failure of the process described above.

#### 5.1.6 Settlement Account Management Process

- \[_Net settlement option_\] DFSPs may add funds to their Scheme Settlement Bank Account at their discretion. The Scheme will provide instructions on how to do this. \[_Continuous Gross settlement option_\] DFSPs may transfer funds into the Scheme Pooled Settlement Bank Account at their discretion. The Scheme will provide instruction on how to do this.

- \[_Continuous Gross Settlement option only_\] The Scheme will provide and end-of-day report to DFSPs showing their share of ownership in the Scheme Pooled Settlement Bank Account.

- DFSPs may request withdrawal of funds from their \[_Net settlement option_\] Settlement Bank Account through the Scheme Portal \[_Continuous gross settlement option_\] DFSPs may request withdrawal of funds from the Scheme Pooled Settlement Bank Account through the Scheme Portal. The scheme will review the requested withdrawal, and, if approved, execute the transfer on behalf of the DFSP. The purpose of this review is to ensure that a DFSP's share of the Settlement Bank Account is sufficient to support Transfers in process: this approval will not be unreasonably denied.

#### 5.1.7 Scheme Settlement Reporting 

- The scheme will provide, through the Scheme DFSP Portal, information for DFSPs which includes for each DFSP:

    - The current Net Debit Cap and its components

    - The current Ledger Position and its components, including Fulfilled Transfers for all DFPSs and Provisional Transfers for Payer DFSPs

    - Alerts at certain levels of the Current Ledger Position: these levels to be determined by the DFSPS and/or the Scheme from time to time

- Tools to enable DFSPs to forecast their anticipated transfer volume based on historical data

### 5.2 Fee Settlement: Processing Fees

This section is not yet written.

### 5.3 Fee Settlement: Interchange Fees

This section is not yet written.

## 6. The Scheme Management Service

::: tip NOTE
There is a parallel Platform Operator Service that is necessary for the operation of the platform which is not described in this document.
:::

### 6.1 Description of the Scheme Management Service

- The Scheme Management Service is provided by the Scheme to assist DFSPs in their use of Scheme Services. Many of these functions are provided through the Scheme Portal, which is made available to Scheme DFSPs.

- The following processes are part of the Scheme Management Service:

### 6.2 The Registration Process

- The Registration Process enables DFSP application for participation and for operational and technical on-boarding. It covers the following areas:

    - Forms and processes for DFSP application for Participation in Scheme.

    - Forms and processes for obtaining digital certificates and digital signatures for use with the Platform.

    - Processes for downloading Scheme-provided software artifacts including SDKs and APIs.

    - Processes for testing technical readiness to access the Platform and Services.

    - Processes for receiving Scheme approval and certification for accessing the Platform and Services.

### 6.3 DFSP Customer Service

- The scheme will provide both an online and a telephone help desk for DFSPs.

- The Scheme Portal will provide means by which DFSPs can designate Portal administrators and users, and update DFSP Profile information.

### 6.4 Scheme System Management

- The scheme will provide, through the Scheme Portal, means by which DFSPs can see their current Position Ledger, their Net Debit Cap, and their recent and historical activity with Scheme.

- The scheme will provide, through the Scheme Portal, means by which DFSPs can use historical data, including their Positions and Net Debit Cap histories, to forecast upcoming volumes and required settlement funding levels.

- The scheme will provide means by which DFSPs can obtain updates to software artifacts that they have previously downloaded.

- The scheme will provide, through the Scheme Portal, means by which DFSPs can request a withdrawal from their share of the Scheme Settlement Bank Account.

- The scheme will provide, through the Scheme Portal, means by which DFSPs can view their share of the balance in the Scheme Settlement Bank Account.

## 7. The Fraud Management Service

_This section has not yet been written, but is expected to include the
following sections:_
    
1. _Description of the Fraud Management Utility — Purpose and Scope_

2. _The Shared Transaction Database_

3. _Fraud Categorization Scheme_

4. _Reporting of Known Bad Actors or Transactions_

5. _Anomaly and Fraud Detection Algorithms and Processes_

6. _DFSP Reporting_

7. _Real-time Transaction Interception Options_

## 8. Appendix: Scheme Supported Use Cases and System Parameters

_This is the same table as appears in the Business Rules document, but it has added the systemic codes necessary for the Platform to recognize a transaction as belonging to a given use case or secondary use case. A scheme would only define Secondary Use Cases if it wanted to write rules and/or specify fees that are unique to that Secondary Use Case._

_This table is an example of a table of Use Cases and Secondary Use Cases that a scheme might support._

| Use Case Code | Use Case | Secondary User Case | Required Data Elements | Other Methods of Use Case Determination |
| :--- | :----- | :--------- | :-------------------------- | :------------------------------------------- |
| 1.0  | P2P  | Person to Person | API Setting <br>Scenario=Transfer</br> <br>Initiator = Payer</br> <br>Initiator Type = Consumer</br> <br>Recipient Type = Consumer</br> | |
| 1.1 | P2P | Wallet to wallet | Transaction Account Type for Payer DFSP is Wallet and for Payee DFSP is Wallet |
| 1.2 | P2P | Bank to bank | Transaction Account Type for Payer DFSP is Bank and for Payee DFSP is Wallet |
| 1.3 | P2P | Wallet to bank | Transaction Account Type for Payer DFSP is Wallet and for Payee DFSP is Bank |
| 1.4 | P2P | Bank to Wallet |  Transaction Account Type for Payer DFSP is Bank and for Payee DFSP is Wallet. |
| 2.0 | Bulk Payment | | API Settings <br>Scenario=Transfer</br> <br>Initiator = Payer</br> <br>Recipient Type = Consumer</br> |
| 2.1 | B2P | Bank to bank | Initiator Type = Business |
| 2.2 | G2P | Government to Person | Initiator Type = Government |
| 3.0 | P2B | Person to Business | API Settings <br>Scenario=Transfer</br> <br>Initiator = Payer</br> <br>Initiator Type = Consumer</br> <br>Recipient Type = Business</br> |
| 3.1 | P2B | Till Number Purchase | Initiator Type = Device | |
| 3.2 | P2B | QR code Purchase | tbd | |
| 3.3 | P2B | Online Purchase | Merchant ID Code = tbd | |
| 3.4 | P2B | Bill Payment | | tbd: a data element in the Quote Request will include the Payer’s account number at the biller |
| 3.5 | P2B | Person to Business - Other | | | 
| 4.0 | P2G | | API Settings <br>Scenario=Transfer</br> <br>Initiator = Payer</br> <br>Recipient Type = Government</br> | 
| 4.1 | P2G | Person to Government | | |
| 4.1 | P2G | Till Number Purchase | Initiator Type = Device | |
| 4.2 | P2G | QR code Purchase | tbd | |
| 4.3 | P2G | Online Purchase | Merchant ID Code = tbd | |
| 4.4 | P2G | Bill Payment | | tbd: a data element in the Quote Request will include the Payer’s account number at the biller |

## 9. Appendix: Merchant Category Codes

_The scheme will want to specify codes to recognize the type of merchant being paid. The term "merchant" here is used broadly to include all types of non-consumer payments acceptors. A merchant category code scheme might want to recognize industries, domains (in-person stores vs remote or online) and/or merchant size._

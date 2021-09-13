# Use Cases


## Preface

This section contains information about how to use this document.

### Conventions Used in This Document

The following conventions are used in this document to identify the specified types of information.

|Type of Information|Convention|Example|
|---|---|---|
|**Elements of the API, such as resources**|Boldface|**/authorization**|
|**Variables**|Italics within curly brackets|_{ID}_|
|**Glossary terms**|Italics on first occurrence; defined in _Glossary_|The purpose of the API is to enable interoperable financial transactions between a _Payer_ (a payer of electronic funds in a payment transaction) located in one _FSP_ (an entity that provides a digital financial service to an end user) and a _Payee_ (a recipient of electronic funds in a payment transaction) located in another FSP.|
|**Library documents**|Italics|User information should, in general, not be used by API deployments; the security measures detailed in _API Signature_ and _API Encryption_ should be used instead.|

### Document Version Information

|Version|Date|Change Description|
|---|---|---|
|**1.0**|2018-03-13|Initial version|

<br />

## Introduction

The purpose of this document is to define a set of use cases that can be implemented using the Open API for FSP interoperability (hereafter cited as the API). The use cases referenced within this document provide an overview of transaction processing flows and business rules of each transaction step as well as relevant error conditions.

The primary purpose of the API is to support the movement of financial transactions between one _Financial Services Provider_ (FSP) and another.

It should be noted that the API is only responsible for message exchange between FSPs and a Switch when a cross-FSP transaction is initiated by an _End User_ in one of the FSPs. This can occur in either of two scenarios:

- A bilateral scenario in which FSPs communicate with each other

- A Switch based scenario in which all communication goes through a Switch

Reconciliation, clearing and settlement after real time transactions is out of scope for the API. Additionally, account lookup is supported by the API, but it relies on the implementation in a local market in which a third party or Switch would provide such services. Therefore, the need for effective on-boarding processes and appropriate scheme rules must be considered when implementing use cases.

<br />

### Open API for FSP Interoperability Specification

The Open API for FSP Interoperability Specification includes the following documents.

#### General Documents

- _Glossary_

#### Logical Documents

- _Logical Data Model_

- _Generic Transaction Patterns_

- _Use Cases_

#### Asynchronous REST Binding Documents

- _API Definition_

- _JSON Binding Rules_

- _Scheme Rules_

#### Data Integrity, Confidentiality, and Non-Repudiation

- _PKI Best Practices_

- _Signature_

- _Encryption_

<br />

## Use Case Summaries

The following generic transaction patterns are introduced in [Generic Transaction Patterns]() to reduce duplication of each use case description. These patterns summarize the common transaction process flows and shared function of the relevant use cases.

- **Payer-Initiated Transaction**
  - In a _Payer-Initiated Transaction_, it is the _Payer_ (that is, the payer of electronic funds) who initiates the transaction.
   
    The pattern should be used whenever a Payer would like to transfer funds to another party whose account is not located in the same FSP.

- **Payee-Initiated Transaction**

  - In a _Payee-Initiated Transaction_, it is the _Payee_ (that is, the recipient of electronic funds) who initiates the transaction.

    This pattern should be used whenever a Payee would like to receive funds from another party whose account is not located in the same FSP.

- **Payee-Initiated Transaction using OTP**

  - A _Payee-Initiated Transaction using One-Time Password (OTP)_ is like a _Payee-Initiated Transaction_, but the transaction information (including fees and taxes) and approval for the Payer is shown or entered on a Payee device instead.

  - This pattern should be used when a Payee would like to receive funds from another party whose account is not located in the same FSP, and both the transaction information (including fees and taxes) and approval is shown or entered on a Payee device instead.

- **Bulk Transactions**

  - In a _Bulk Transaction_, it is the Payer (that is, the sender of funds) who initiates multiple transactions to multiple Payees, potentially located in different FSPs.

  - The pattern should be used whenever a Payer would like to transfer funds to multiple Payees in the same transaction. The Payees can potentially be in different FSPs.

It is recommended to read all Generic Transaction Patterns before reading the use cases. For more information, see [Generic Transaction Patterns]().

Each use case describes variations on and special considerations for the generic transaction pattern to which it refers. The use cases are introduced in [Table 1](#table-1) below:

##### Table 1

| Use Case Name | Description |
| --- | --- |
| P2P |This use case describes the business process and business rules in which an individual End User initiates a transaction to send money to another individual End User who doesn’t belong to the same FSP as the Payer.<br></br>This is usually a remote transaction in which Payer and Payee are not in the same location. |
| Agent-Initiated Cash-In | This use case describes the business process and business rules in which a customer requests an agent of a different FSP to cash-in (deposit funds) to their account.<br></br>This is typically a face-to-face transaction in which the customer and the agent are in the same location. |
| Agent-Initiated Cash-Out | This use case describes the business process and business rules in which a customer requests that an agent of a different FSP to cash-out (withdraw funds) from their account.<br></br>This is typically a face-to-face transaction in which the customer and the agent are in the same location. |
| Agent-Initiated Cash-Out <br>Authorized on POS</br> | This use case describes the business process and business rules in which a customer requests an agent of a different FSP to cash-out (withdraw funds) from their account. In this use case, the agent initiates the transaction through a point-of-sale (_POS_) and the customer inputs OTP on POS to authorize the transaction. Alternatively, the agent can use POS to scan a QR code generated by a customer’s mobile app to initiate the transaction. |
| Customer-Initiated Cash-Out | This use case describes the business process and business rules in which a registered customer initiates a transaction to cash-out (withdraw funds) using an agent who doesn’t belong to the customer’s FSP.<br></br>This is typically a face-to-face transaction in which the customer and the agent are in the same location. |
| Customer-Initiated Merchant<br>Payment</br> | This use case describes the business process and business rules in which an individual End User initiates a purchase transaction to pay a merchant who does not belong to the same FSP as the customer.<br></br>This is usually a face to face transaction when a customer buys goods or services at a merchant store.<br></br>A variant of this use case is online payment, in which the online shopping system generates a QR code and displays it on a web page, and the consumer then scans the QR code by handset and completes the payment transaction. |
| Merchant-Initiated Merchant<br>Payment</br> | This use case describes the business process and business rules in which a merchant initiates a request for payment to the customer; the customer reviews the transaction amount in the request and confirms the request by providing authentication on their own handset. |
| Merchant-Initiated Merchant<br>Payment Authorized on POS</br> | This use case describes the business process and business rules in which merchant initiates a request for payment from the customer; the customer reviews the payment request on a merchant device and authorizes the payment by OTP or QR code on the merchant device. The customer authentication information is sent from _Payee FSP_ to _Payer FSP_ for authentication by Payer FSP. |
| ATM-Initiated Cash-Out | This use case describes the business process and business rules in which an ATM initiates a cash-out request from a customer account. Customer pregenerates an OTP for cash-out and uses this OTP on the ATM device to initiate ATM cash-out. The Payer FSP validates the OTP received in the ATM-Initiated Cash-Out request for authentication purposes. |
| Bulk Payments | _Bulk Payments_ is used when an organization or business is paying out funds – for example, aid or salary to multiple Payees who have accounts located in the different FSPs. The organization or business can group transactions together to make it easier for uploading and validating individual transactions in bulk before the bulk transaction is executed. It is also possible for the organization to follow up the result of the individual transactions in the bulk transaction after the bulk transaction is executed. |
| Refund | This use case describes the business flow how to refund a completed interoperability transaction. |

**Table 1 – Use Case Summary**

<br />

## Use Cases

This section demonstrates ways in which the API can be used through the use cases identified in [Table 1](#table-1) – _Use Case Summary_.

For each use case, the following is presented:
- Use Case Description
- Reference to Generic Pattern
- Actors and Roles
- Addition to Generic Transaction Pattern
- Relevant Error Conditions

### P2P

#### Use Case Description

This section describes the business process and business rules for a use case in which an individual End User initiates a transaction to send money to another individual End User who doesn’t belong to the same FSP as the Payer.

This is usually a remote transaction in which Payer and Payee are not in the same location. 

There are four steps necessary to complete a _P2P_ Transfer transaction from one FSP user to another FSP user.

##### Step 1

Payer initiates a transaction to their FSP, and Payer FSP then locates Payee FSP through an API call to the Account Lookup System or by the agreed-upon _scheme_ rules.

##### Step 2

Payer FSP calculates the transaction fee applied to Payer. Payer FSP sends a quote request through an API call to Payee FSP.

##### Step 3

Payer FSP presents the total transaction fee and Payee name (optional) to the Payer to confirm the transaction.

##### Step 4

Payer accepts the transaction and Payer FSP performs the transaction through an API call to the Switch or to Payee FSP. The transaction completes and notifications are sent to both Payer and Payee; or the Payer rejects the transaction and the transaction ends.

<br />

### Reference to Generic Pattern

_Payer-Initiated Transaction_

#### Actors and Roles

The actors and roles for P2P are described in [Table 2](#table-2) below:

##### Table 2

| Role | Map to Generic Transaction Pattern | Description |
| --- | --- | --- |
| Customer | Payer | An individual who is a registered customer of an FSP who initiates a transaction to send money to another individual. |
| Customer | Payee | The person who will receive money from Payer.<br></br>Payee could be a registered customer of Payee FSP or, if the scheme rules allow it, an unregistered customer who will be registered during the transaction process, which is determined by the design of Payee FSP.

**Table 2 – P2P Actors and Roles**

#### Addition to Generic Transaction Pattern

##### Step 2

The Payee FSP ID could be determined by the scheme rule without any dependence on the API. Otherwise, **Lookup Party Information** request is an option for determining in which FSP a Payee is located.

Payer FSP will use the request **Lookup Party Information** to retrieve details of Payee from Payee FSP directly if there is no Switch between Payer FSP and Payee FSP.

##### Steps 9 – Step 15

In the current version of the API, the **Calculate Quote** request to Payee FSP is mandatory even if a wholesale fee is agreed upon in the scheme. Payee FSP needs to receive transaction details from the **Calculate Quote** request to generate the condition for this transaction.

Payer FSP can use information from response **Return Quote Information** from Payee FSP to calculate the transaction fee it will apply on Payer. The business rules for how Payer FSP calculates the transaction fee could be defined by the scheme rules; this is out of scope for the API.

In P2P Transfer case, it is the common practice that Payer pays the entire transaction fee, and Payee is free of charge in the transaction.

##### Step 16

There are several ways to push a confirmation message to Payer to authorize the transaction. For example, USSD Push Message, or SMSC notification; then Payer opens the USSD menu to query and confirm the pending transaction

The interaction between Payer and Payer FSP is designed by each FSP, and is out-of-scope for the API.

##### Step 19

The Quote ID applied in the previous step is verified in the transaction processing step. If the quote is expired, Payee FSP will reject the transaction.

##### Step 20

A notification is sent to the Payee once the transaction is performed by Payee FSP.

##### Step 28

Payer FSP sends notification to Payer to indicate the transaction result.

#### Relevant Error Conditions
[Table 3](#table-3) below describes relevant errors and recommended follow-up actions for this use case.

##### Table 3

| Step | Error Condition | Error Description | Follow Up Action |
| --- | --- | --- | --- |
|2 | Timeout | **Lookup Party Information** request timed out | Retry |
|4 | Payee is unreachable | Account Lookup System fails to locate Payee| Cancel the transaction |
|6 | Currency is not supported | The transaction currency is not supported. | Initiate a new transaction with supported currency by Payee FSP |
| 9 | Timeout | **Calculate Quote** request timed out | Retry with the same ID |
|11 | Wrong quote | Payee FSP cannot provide quote due to internal business rule validation failure or system error.<br></br>For example, invalid account status of Payee, wrong fee configuration or database error | Cancel the transaction |
|17 | Timeout | **Perform Transfer** request timed out | Query transaction status and decide to complete or retry<br></br>The retry policy will be defined by the scheme rules. For example, retry times and period |
|19 | Transaction failed | Transaction failed at Payee FSP.<br>Possible reasons:<li>Limit breach</li><li>Payer or Payee is blacklisted</li><li>Quote is expired</li><li>Invalid account status of Payee</li><li>Payee FSP internal system error</li></br> | Cancel the transaction |
|22 | Funds reservation timed out | Funds reservation at Payer FSP is timed out and the transaction fails at Payer FSP but succeeds at Payee FSP. | Reconcile according to the scheme rules

**Table 3 – P2P Relevant Error Conditions**

<br />

### Agent-Initiated Cash-In

#### Use Case Description

This section describes the business process and business rules for the use case in which a customer requests an agent of a different FSP to cash-in (deposit funds) to their account. This is a two-step transaction: Agent initiates a cash-in transaction from their handset or POS and then receives transaction information including possible fees. Agent can either approve or reject the transaction. Once transaction is completed, the customer gives cash to the agent.

Agent-Initiated Cash-In is typically a face-to-face transaction in which the customer and the agent are in the same location.

#### Reference to Generic Pattern

_Payer-Initiated Transaction_

#### Actors and Roles

The actors and roles for Agent-Initiated Cash-In are described in [Table 4](#table-4) below:

| Role | Map to Generic Transaction Pattern | Description |
| --- | --- | --- |
|Agent | Payer | Payer is an agent (individual or organization) who will receive cash from the customer and transfer money to the customer’s account.<br></br> Agent is a registered party with Payer FSP. |
| Customer | Payee | Customer is an individual who would like to deposit cash into their account.<br></br>Customer is a registered individual in Payee FSP. |

**Table 4 – Agent-Initiated Cash-In: Actors and Roles**

#### Addition to Generic Transaction Pattern

##### Step 1

Customer requests that an agent cash-in to their account.

If a smart phone is used, the agent can scan a static QR code from the customer to capture the customer’s information and initiate the transaction.

Optionally the agent verifies the identity of the customer.

##### Step 12

This is an optional step. The customer checks cash-in transaction information and related fees on their own handset and then makes the decision to accept or reject the transaction.

##### Step 16

The agent checks fees and taxes and either accepts or rejects.

##### Step 20

A notification is sent to the customer after the transaction is performed by Payee FSP.

##### Step 28

Payer FSP sends notification to the agent to indicate the transaction result.

#### Relevant Error Conditions

[Table 5](#table-5) describes relevant errors and recommended follow-up actions for this use case.

##### Table 5

| Step | Error Condition | Error Description | Follow Up Action |
| --- | --- | --- | --- |
|2 | Timeout | **Lookup Party Information** request timed out | Retry |
|4 | Payee cannot be found | Account Lookup System fails to locate Payee | Cancel the transaction |
|6 |Currency is not supported | The transaction currency is not supported. | Initiate a new transaction with supported currency by Payee FSP |
|9 | Timeout | **Calculate Quote** request timed out | Retry with the same ID |
|15 | Wrong quote | Payee FSP cannot provide quote due to internal business rule validation failure or system error.<br></br>For example, invalid account status of Payee, wrong fee configuration or database error | Cancel the transaction
|17 | Timeout | **Perform Transfer** request timed out | Query transfer status and decide to complete or retry<br></br>The retry policy will be defined by the scheme rules. For example, retry times and period |
|19 |Transaction failed | Transaction failed at Payee FSP. <br>Possible reasons: <li>Low balance of Payee</li><li>Limit breached</li><li>Quote is expired</li><li>Payer or Payee blacklisted</li><li>Invalid account status of Payee</li><li>Payee FSP internal system error</li></br> | Cancel the transaction |
|22 |Funds reservation timeout | Funds reservation at Payer FSP timed out and the transaction fails at Payer FSP but succeeds at Payee FSP | Reconcile according to the scheme rules

**Table 5 – Agent-Initiated Cash-In: Relevant Error Conditions**

<br />

### Agent-Initiated Cash-Out

#### Use Case Description

This section describes the business process and business rules for the use case in which a customer requests an agent of a different FSP to cash-out (withdraw funds) from their account. This is a 2-step transaction, the agent initiates cash-out transaction request and the customer authorizes the transaction on their handset. Once transaction is completed, the agent gives cash to the customer.

Agent-Initiated Cash-Out is a face-to-face transaction in which the customer and the agent are in the same location.

#### Reference to Generic Pattern

_Payee-Initiated Transaction_

#### Actors and Roles

The actors and roles for Agent-Initiated Cash-Out are described in [Table 6](#table-6).

##### Table 6

| Role | Map to Generic<br>Transaction Pattern</br> | Description |
| --- | --- | --- |
|Customer | Payer | Payer is a customer (individual or organization) who wants to withdraw cash using an agent.<br></br>Customer is a registered party in Payer FSP. |
|Agent | Payee | Payee is an agent registered with the Payee FSP. A pre-funded wallet for the agent is maintained at Payee FSP.<br></br>Agent is a registered party in Payee FSP. |

**Table 6 – Agent-Initiated Cash-Out: Actors and Roles**

#### Addition to Generic Transaction Pattern

##### Step 1

The customer requests that an agent cash-out (withdraw funds) from their account.

If a smart phone is used, the agent can scan a static QR code containing the customer’s information to capture that information and initiate the transaction.

Optionally, the agent may verify the identity of the customer to satisfy regulatory requirements.

##### Step 17

The Payer FSP shows fees and taxes to the customer. The customer indicates whether they want to proceed or not.

##### Step 25

A transaction notification is sent to the agent after the transaction is performed by Payee FSP.

##### Step 33

After receiving transaction notification, the agent gives the cash-out amount to the customer.

##### Relevant Error Conditions

[Table 7](#table-7) describes relevant errors and recommended follow-up actions for this use case.

##### Table 7

| Step | Error Condition | Error Description | Follow Up Action |
| --- | --- | --- | --- |
| 2 | Timeout | **Lookup Party Information** request timed out | Retry |
| 3 | Payer cannot be found | Account Lookup System fails to locate the Payer | Cancel the transaction |
| 7 | Currency is not supported | The transaction currency is not supported. | Initiate a new transaction supported by Payee FSP |
| 22 | Timeout | **Perform Transfer** request timed out | Query transfer status and decide to complete or retry<br></br>The retry policy will be defined by the scheme rules. For example, retry times and period |
| 24 | Transaction failed | Transaction failed at the Payee FSP. <br>Possible reasons: <li>Limit Breached</li><li>Payer or Payee blacklisted</li><li>Quote is expired</li><li>Invalid account status of Payee</li><li>Payee FSP internal system error</li></br> | Cancel the transaction |
| 27 | Reservation is expired | Funds reservation is expired and the transaction fails at Payer FSP but succeeds at Payee FSP. | Reconcile according to scheme rules |

**Table 7 – Agent-Initiated Cash-Out: Relevant Error Conditions**

### Agent-Initiated Cash-Out Authorized on POS

#### Use Case Description

This section describes the business process and business rules for the use case in which a customer requests that an agent of a different FSP cash-out (withdraw funds) from their account. In this use case, the agent initiates the transaction through a POS, and the customer inputs a OTP on POS to authorize the transaction. Alternatively, the agent can use POS to scan a QR code generated by the mobile app of the customer to initiate the transaction.

- Approval using OTP – A Payer can approve a transaction by first creating an OTP in their FSP. The OTP is then entered in a Payee device (usually a POS device). The OTP in the transaction request is automatically matched by the Payer FSP to either approve or reject the transaction. The OTP does not need to be encrypted as it should only be valid once during a short time period.

- Approval using QR code – A Payer can approve a transaction by requesting a Payer FSP to generate a QR code that encodes an OTP and customer’s identifier.

- Approval using NFC – A Payer can approve a transaction by swiping a _Near Field Communication_ (NFC) phone on a POS. The interoperability for NFC POS of one FSP to read data from NFC tag or NFC phone of another FSP should be considered if NFC technology is adopted.

Agent-Initiated Cash-Out Authorized on POS is typically a face-to-face transaction in which the customer and the agent are in the same location.

#### Reference to Generic Pattern

_Payee-Initiated Transaction using OTP_

#### Actors and Roles

The actors and roles for Agent-Initiated Cash-Out Authorized on POS are described in [Table 8](#table-8).

##### Table 8

| Role | Map to Generic Transaction Pattern | Description |
| --- | --- | --- |
| Customer | Payer | Payer is a customer (individual or organization) who wants to withdraw cash using an agent.<br></br>The customer is a registered party with Payer FSP.|
| Agent | Payee | Payee is an agent registered with the Payee FSP. A pre-funded wallet for the agent is maintained at Payee FSP.<br></br>The agent is registered party with Payee FSP. |

**Table 8 – Agent-Initiated Cash-Out Authorized on POS: Actors and Roles**

#### Addition to Generic Transaction Pattern

##### Step 1

For OTP:

- The customer requests Payer FSP to generate an OTP.

For QR code:

- The customer enters cash-out amount and requests Payer FSP to generate a QR code.

- The QR code generation should be approved by customer transaction PIN.

##### Step 4

The customer requests the agent to cash-out some amount from their account.

For OTP:

- The agent inputs the customer’s ID and cash-out amount to initiate the transaction

For mobile app:

- The agent inputs cash-out amount and then scan QR code of customer via scanner POS

For NFC:

- The agent inputs cash-out amount and the customer taps phone on NFC POS.

- The agent verifies identity of the customer to satisfy regulation requirements.

##### Step 21

There is a risk that someone other than the owner of phone may attempt to use the phone to make a transaction at an agent store. Thus, the transaction should be approved via PIN to allow an OTP to be generated automatically.

##### Step 25

The customer checks fees and taxes. If the customer agrees:

- For OTP: The customer enters OTP on the agent phone or device.

- For QR code/NFC: The customer confirms the payment on POS.

If the customer disagrees:

- For OTP: The customer doesn’t enter OTP on the agent phone or device.

- For QR code/NFC: The customer rejects the payment on POS.

##### Step 36

A notification is sent to the agent after the transaction is performed by the Payee FSP. After receiving transaction notification, the agent gives the cash-out amount to the customer.

##### Step 44

The Payer FSP sends a notification of the transaction result to the customer.

##### Relevant Error Conditions

[Table 9](#table-9) describes relevant errors and recommended follow-up actions for this use case. 

##### Table 9

| Step | Error Condition | Error Description | Follow Up Action |
| --- | --- | --- | --- |
| 5 | Timeout | **Lookup Party Information** request timedout| Retry| 
| 6 | Payer cannot be found | Account Lookup System fails to locate the Payer | Cancel the transaction |
| 8 | Transaction request timeout | **Perform Transaction Request** to Payer FSP timed out | Query transaction status and decide to complete or retry<br></br>The retry policy will be defined by the scheme rules. For example, retry times and period |
| 28 | OTP is expired | OTP is expired | Push another authentication request to Payee FSP<br>or</br>Cancel the transaction in the Payer FSP |
| 28 | Invalid OTP | OTP is unrecognized | Push another authentication request to Payee FSP<br>or</br>Cancel the transaction in the Payer FSP |
| 35 | Transaction failed | Transaction failed at the Payee FSP.<br>Possible reasons:<li>Limit Breached</li><li>Payer or Payee blacklisted</li><li>Quote is expired</li><li>Invalid account status of Payee</li><li>Payee FSP internal system error</li></br> | Cancel the transaction |
| 38 | Reservation is expired | Funds reservation is expired and the transaction fails at Payer FSP but succeeds at Payee FSP | Reconcile according to scheme rules | 

**Table 9 – Agent-Initiated Cash-Out Authorized on POS: Relevant Error Conditions**

### Customer-Initiated Cash-Out

#### Use Case Description

This section describes the business process and business rules for a use case in which a registered customer initiates a transaction to withdraw cash using an agent who is in a different FSP. This is two-step business process: a customer initiates cash-out transaction on their handset and then receives transaction information including fees, which can either be rejected or accepted.

Customer-Initiated Cash-Out usually is a face-to-face transaction in which the customer and the agent are in the same location.

#### Reference to Generic Pattern

_Payer-Initiated Transaction_

#### Actors and Roles

The actors and roles for Customer-Initiated Cash-Out are described in [Table 10](#table-10).

##### Table 10

| Role | Map to Generic Transaction Pattern | Description |
| --- | --- | --- |
| Customer | Payer | Payer is a customer (individual or organization) who wants to cash-out (withdraw funds) using an agent.<br></br>Customer is a registered party with Payer FSP. |
| Agent | Payee | Payee is an agent registered with the Payee FSP. A pre-funded wallet for the agent is maintained at Payee FSP.<br></br>Agent is registered party with Payee FSP. |

**Table 10 – Customer-Initiated Cash-Out: Actors and Roles**

#### Addition to Generic Transaction Pattern

##### Step 1

The customer requests that the agent cash-out some amount from their account.

For USSD:

- The customer inputs cash-out amount and merchant ID to initiate the transaction.

For mobile app:

- If a smart phone is used, the customer can scan the static QR code of the agent to capture the agent’s information and initiate transaction.

Optionally, the agent can verify the identity of the customer to satisfy regulatory requirements.

##### Step 12

This is an optional step. Payee FSP shows fees, taxes or both to the agent. If the agent does not accept the fees or commission, they can reject the transaction.

##### Step 16

Payer FSP shows fees and taxes to the customer. If the customer doesn’t want to proceed, they reject the transaction.

##### Step 20

A notification is sent to the agent once the transaction is performed by Payee FSP.

##### Step 29

After the customer receives transaction notification, the agent gives cash-out amount to the customer.

#### Relevant Error Conditions

[Table 11](#table-11) describes relevant errors and recommended follow-up actions for this use case.

##### Table 11

|Step | Error Condition | Error Description | Follow Up Action |
| --- | --- | --- | --- |
|2 | Timeout | **Lookup Party Information** request timed out | Retry |
| 4 | Agent cannot be found | Account Lookup System fails to locate agent | Cancel the transaction |
| 6 | Currency is not supported | The transaction currency is not supported. | Initiate a new transaction with supported currency by Payee FSP |
| 9 |Timeout | **Calculate Quote** request timed out | Retry with the same ID |
| 11 | Wrong quote | Payee FSP cannot provide quote due to internal business rule validation failure or system error.<br></br>For example, invalid account status of Payee, wrong fee configuration or database error | Cancel the transaction |
| 17 | Timeout | **Perform Transfer** request timed out | Query transaction status and decide to complete or retry<br></br>The retry policy will be defined by the scheme rules. For example, retry times and period |
| 19 | Transaction failed | Transaction failed at Payee FSP.<br>Possible reasons:<li>Limit breached</li><li>Payer or Payee blacklisted</li><li>Quote is expired</li><li>Invalid account status of Payee</li><li>Payee FSP internal system error</li></br> | Cancel the transaction |
| 22 | Reservation is expired | Funds reservation is expired and the transaction fails at Payer FSP but succeeds at Payee FSP | Reconcile according to scheme rules |

**Table 11 – Customer-Initiated Cash-Out: Relevant Error Conditions**

### Customer-Initiated Merchant Payment

#### Use Case Description

This section describes the business process and business rules for a use case in which a registered customer initiates a merchant payment transaction to pay a merchant who is in another FSP.

This could be a face to face transaction; for example, when a customer buys goods or services at the merchant store. Another case is online payment, in which an online shopping system generates a QR code and displays on the web page, and the customer then scans the QR code on the web page and authorizes and completes the payment transaction on their handset.

**Assumption:** Encoding/Decoding QR code is handled in each FSP and is out of scope of API. The data and its format encoded in the QR code should be defined in the scheme rules to enable QR codes to be interoperable.

#### Reference to General Pattern

_Payer-Initiated Transaction_

#### Actors and Roles

The actors and roles for Customer-Initiated Merchant Payment are described in [Table 12](#table-12).

##### Table 12

| Role | Map to Generic Transaction Pattern | Description
| --- | --- | --- |
| Customer | Payer | An individual End User of one FSP who buys goods or service from a merchant of another FSP. |
| Merchant | Payee | The business that sells goods or provide service and then receives payment from the customer. |

**Table 12 – Customer-Initiated Merchant Payment: Actors and Roles**

#### Addition to Generic Transaction Pattern

##### Step 1

For feature phone:

- The customer can initiate a payment transaction by inputting relevant payment information on the USSD menu, such as amount and merchant ID.

For smart phone:

- The customer initiates merchant payment transaction by scanning the merchant QR code. After resolving the merchant QR code, there are two scenarios:

  a) The customer inputs transaction amount in their handset to continue the transaction if the transaction amount is not encoded in the QR code. This is the case for face-to-face payment at retailer merchant store.
  
  b) Transaction amount has already been encoded in the QR code, and then Payer FSP has enough information to continue the transaction. This case then follows the process of the online payment case identified in [4.6.1](#461-use-case-description).

##### Step 2

The merchant FSP ID could be determined by the scheme rules without depending on an Account Lookup System. Otherwise, **Lookup Party Information** request is an option to find out in which FSP the merchant is located.

In most cases, the merchant FSP ID is captured during initiating the transaction. For example, the customer selects the merchant FSP from USSD menu, or it is already encoded in the merchant QR code.

##### Step 9 – Step 15

In most cases, the customer is free of charge for the purchase transaction. **Calculate Quote** request is still necessary, because all transaction details will be sent to Payee FSP and the condition of the transfer will be generated by Payee FSP for later use (in **Perform Transfer**).

##### Step 20

A notification is sent to the merchant once the transaction is performed by the Payee FSP.

##### Step 29

Customer receives transaction notification and customer receives goods.

#### Relevant Error Conditions

[Table 13](#table-13) describes relevant errors and recommended follow-up actions for this use case.

##### Table 13

| Step | Error Condition | Error Description | Follow Up Action |
| --- | --- | --- | --- |
| 2 | Timeout | **Lookup Party Information** request timed out | Retry |
| 4 | Merchant is unreachable | Account Lookup System fails to locate merchant | Cancel the transaction |
| 6 | Currency is not supported | The transaction currency is not supported. | Initiate a new transaction with supported currency by Payee FSP |
| 9 | Timeout | **Calculate Quote** request timed out | Retry with the same ID |
| 11 | Wrong quote | Payee FSP cannot provide quote due to internal business rule validation failure or system error.<br></br>For example, invalid account status of Payee, wrong fee configuration or database error | Cancel the transaction |
| 17 | Timeout | **Perform Transfer** request timed out | Query transaction status and decide to complete or retry<br></br>The retry policy will be defined by the scheme rules. For example, retry times and period
| 19 | Transaction failed | Transaction failed at Payee FSP.<br>Possible reasons: <li>Limit breached</li><li>Payer or Payee blacklisted</li><li>Quote is expired</li><li>Invalid account status</li><li>Payee FSP internal system error</li></br> | Cancel the transaction |
| 22 | Reservation is expired | Funds reservation is expired and the transaction fails at Payer FSP but succeeds at Payee FSP | Reconcile according to scheme rules |

**Table 13 – Customer-Initiated Merchant Payment: Relevant Error Conditions**

### Merchant-Initiated Merchant Payment

#### Use Case Description

This use case describes a merchant payment transaction, initiated by a merchant and then authorized by the customer on their handset.

The business process involves two parties, a merchant and a customer. The merchant initiates a _request to pay_ transaction to the customer. The customer can review the transaction details and approve or reject the transaction on their mobile device.

Thus, it is a two-step business process in which the merchant initiates a payment transaction and the customer authorizes the transaction from their account.

#### Reference to Generic Pattern

_Payee-Initiated Transaction_

#### Actors and roles

The actors and roles for Merchant-Initiated Merchant Payment are described in [Table 14](#table-14).

##### Table 14

| Role | Map to Generic Transaction Pattern | Description |
| --- | --- | --- |
| Customer | Payer | An individual End User of one FSP who buys goods or service from a merchant of another FSP. |
| Merchant | Payee | The business who sells goods or provides services and then receives payment from the customer. |

**Table 14 – Merchant-Initiated Merchant Payment: Actors and Roles**

#### Addition to General Pattern

This section describes how the use case connects to the general pattern. The description is focused on the End User as the interactions between the participating systems are described in the general pattern.

##### Step 1

For feature phone:

- The merchants can input the customers’ ID in their USSD/STK menu when initiating payment transactions.

For smart phone:

- To capture the customer’s ID, the merchant may use a scan device or mobile app to scan QR code generated by the customer’s mobile app.

##### Step 10-16

In a merchant payment transaction, the customer is usually free-of-charge.

##### Step 13

This is an optional step. Payee FSP shows the transaction details including fees to the merchant; and the merchant can accept or reject the transaction.

##### Step 25

A notification is sent to the merchant after the transaction is performed by the Payee FSP.

##### Step 33

Payer FSP sends a notification to the customer to indicate the transaction result.

#### Relevant Error Conditions

[Table 15](#table-15) below describes relevant errors and recommended follow-up actions for this use case.

##### Table 15

| Step | Error Condition | Error Description | Follow Up Action |
| -- | -- | -- | -- |
| 2 | Account Lookup Timeout | **Lookup Party Information** request timed out | Retry |
| 3 | Customer cannot be found | Account Lookup System fails to locate the customer | Cancel the transaction |
| 5 | Transaction request timeout | **Perform Transaction Request** to Payer FSP timed out | Query transaction status and decide to complete or retry<br></br>The retry policy will be defined by the scheme rules. For example, retry times and period |
| 10 | Quote request failed | **Calculate Quote** request timed out or failed at Switch or Payee FSP | Cancel the transaction |
| 24 | Quote expired | Quote expired | Cancel the transaction |
| 27 | Reservation timeout | Funds reservation timed out at Payer FSP and the transaction fails at Payer FSP but succeeds at Payee FSP | Reconcile according to scheme rules |

**Table 15 – Merchant-Initiated Merchant Payment: Relevant Error Conditions**

<br />

### Merchant-Initiated Merchant Payment Authorized on POS

#### Use Case Description

This use case describes a merchant payment initiated by a merchant using a device such as POS, and how to authorize a transaction with an OTP or a QR code.

The merchant initiates a merchant payment transaction using a POS device. This device has the capability to capture the customer’s authorization on POS instead of the customer’s mobile device. The authorization information captured in POS should be sent to Payer FSP to perform the authorization.

The business process involves two parties, Merchant and Customer. The merchant initiates a request to pay for the customer, and the customer reviews the payment request on POS and authorizes the payment by OTP or QR code on the POS itself. The customer authentication information is sent from Payee FSP to Payer FSP for authentication by Payer FSP. If authentication is successful then transaction will be posted on Payer FSP and Payee FSP.

#### Reference to Generic Pattern

_Payee-Initiated Transaction using OTP_

#### Actors and roles

The actors and roles for Merchant-Initiated Merchant Payment Authorized on POS are described in [Table 16](#table-16) below:

##### Table 16

| Role | Map to Generic Transaction | Pattern Description |
| --- | --- | --- |
| Customer | Payer | An individual End User of one FSP who buys goods or service from a merchant of another FSP. |
| Merchant | Payee | The business who sells goods or provide service and then receive payment from the customer. |

**Table 16 – Merchant-Initiated Merchant Payment Authorized on POS: Actors and Roles**

#### Addition to General Pattern

This section describes how the use case connects to the general pattern. The description is focused on the end-user, because the interactions between the participating systems are described in the general pattern.

##### Step 1-3

The customer can pre-authorize the transaction by generating a dynamic payment QR code on a mobile app if they have a smart phone.

The customer can request an OTP on the USSD menu if they have a feature phone.

##### Step 4

For mobile app:

- The merchant uses a scan device such as a POS to capture the QR code and initiate the payment.

- Both customer ID and OTP are encoded in the QR code.

For feature phone:

- The merchant inputs customer’s ID and amount to initiate the transaction.

##### Step 20

Steps 1-3 are optional and will be used only when OTP is generated by Payer to authenticate the purchase at the merchant
device. However, it would be very rare for a customer to generate the OTP manually; instead Payer FSP would generate an OTP for the customer as described in Step 20.

##### Step 21

There is a risk that someone other than the owner of phone may attempt to use the phone to make a transaction at agent store. Thus, the transaction should be approved via PIN to allow OTP to be generated automatically.

##### Step 25

The customer need only confirm the transaction on POS if initiating transaction with a QR code in step 4, because OTP is encoded in the QR code and parsed in Step 4.

##### Step 36

A notification is sent to the merchant once the transaction is performed by the Payee FSP. After receiving the transaction notification, the merchant gives goods to the customer.

##### Step 44
The Payer FSP sends a notification of the transaction result to the customer.

#### Relevant Error Conditions

[Table 17](#table-17) below describes relevant errors and recommended follow-up actions for this use case. 

##### Table 17

| Step | Error Condition | Error Description | Follow Up Action |
| --- | --- | --- | --- |
| 5 | Timeout | **Lookup Party Information** request timed out | Retry |
| 6 | Customer cannot be found | Account Lookup System fails to locate the customer | Cancel the transaction |
| 8 | Transaction request timeout | **Perform Transaction Request** to Payer FSP timed out | Query status and retry |
| 19 | Quote request failed | Quote failed at Switch or Payee FSP | Cancel the transaction |
| 33 | Transfer request timeout | **Perform Transfer** request to Payee FSP timed out | Query transaction status and decide to complete or retry <br></br>The retry policy will be defined by the scheme rules. For example, retry times and period |
| 35 | Transaction failed | Transaction failed at the Payee FSP.<br>Possible reasons:<li>Limit Breached</li><li>Payer or Payee blacklisted</li><li>Quote is expired</li><li>Invalid account status of Payee</li><li>Payee FSP internal system error</li></br> | Cancel the transaction |
| 38 | Reservation is expired | Funds reservation timed out and the transaction fails at Payer FSP but succeeds at Payee FSP | Reconcile according to the scheme rules |

**Table 17 – Merchant-Initiated Merchant Payment Authorized on POS: Relevant Error Conditions**

<br />

### ATM-Initiated Cash-Out

#### Use Case Description

This section describes the business flows and rules of an _ATM-Initiated Cash-Out_ use case.

This use case involves two parties: ATM and Customer. ATM initiates a Cash-Out request from the customer account and the customer confirms the request by providing authentication (OTP) on ATM. The customer pre-generates an OTP for cash-out and uses this OTP on ATM device to initiate ATM Cash-out. The Payer FSP validates the OTP received in _ATM-Initiated Cash-Out_ request for the validity of OTP as well as for authentication. If the customer authentication via OTP is successful; then the customer’s account will be debited at Payer FSP and ATM account maintained at Payee FSP will be credited. As a result, the customer receives cash from ATM.

#### Reference to Generic Pattern

_Payee-Initiated Transaction using OTP_

#### Actors and roles

The actors and roles for ATM Initiated Cash Out are described in [Table 18](#table-18).

##### Table 18

| Role | Map to Generic Transaction | Pattern Description |
| --- | --- | --- |
| Customer | Payer | Payer is a customer who wants to withdraw cash from ATM device belonging to another FSP. |
| ATM Provider | Payee | Payee is an ATM provider who provides cash withdrawal service on ATM device to a customer belonging to another FSP. ATM would be connected to a bank network which is connected to Payee FSP. There would be a pre-funded account in Payee FSP corresponding to an ATM or ATMs, or to a Bank Switch. |

**Table 18 – ATM-Initiated Cash-Out: Actors and Roles**

#### Addition to General Pattern

This section describes how the use case connects to the general pattern. The description is focused on the end-user as the interactions between the participating systems are described in the general pattern.

##### Step 1-3

Steps 1 to 3 are optional; however, it is recommended that customer generate an OTP before initiating the transaction request from ATM.

Alternatively, a customer generates a QR code for cash-out via mobile app other than OTP.

##### Step 4

For mobile app:

- ATM can scan previously-generated cash-out QR code.

For feature phone:

- The customer initiates withdrawal transaction by inputting their account ID and amount.

##### Step 20

In _ATM-Initiated Cash-Out_, it is very rare that an OTP is automatically generated by a Payer FSP, because this will delay the transaction due to SMS delivery, and the ATM transaction will time out. Therefore, it is recommended that customer generate an OTP for ATM Cash-out as mentioned in Steps 1-3.

##### Step 21

There is a risk that someone other than the owner of phone holding the handset may make a transaction at an ATM device. In this case, the transaction should be approved via PIN so that the OTP can be generated automatically.

##### Step 25

If an OTP is used, the customer enters the OTP that was generated in Steps 1-3 or Step 21.

If a QR code is used to cash-out and it is captured by an ATM when initiating the transaction in Step 4, then the customer must confirm or reject the transaction on the ATM only; inputting security credentials such as OTP or password is not necessary.

#### Relevant Error Conditions

[Table 19](#table-19) below describes relevant errors and recommended follow-up actions for this use case.

##### Table 19

| Step | Error Condition | Error Description | Follow Up Action |
| --- | --- | --- | --- |
| 5 | Timeout | **Lookup Party Information** request timed out | Retry |
| 6 | Customer cannot be found | Account Lookup System fails to locate the customer | Cancel the transaction |
| 8 | Transaction request timeout | **Perform Transaction Request** timed out at Switch or Payee FSP | Query and retry |
| 14 | Quote request timeout | **Calculate Quote** request timed out | Retry |
| 15 | Quote request failed | **Calculate Quote** request fails at Switch or Payee FSP | Cancel the transaction |
| 33 | Transfer request timeout | Perform Transfer request timed out | Query transaction status and decide to complete or retry<br></br>The retry policy will be defined by the scheme rules. For example, retry times and period |
| 35 | Transaction request is failed | Transaction failed at the Payee FSP. <br>Possible reasons:<li>Limit Breached</li><li>Payer or Payee blacklisted</li><li>Quote is expired</li><li>Invalid account status of merchant</li><li>Payee FSP internal system error</li></br> | Cancel the transaction and try another new transaction |
| 38 | Reservation is timeout | Funds reservation is timeout and the transaction fails at Payer FSP but succeeds at Payee FSP | Reconcile according to the scheme rules |

**Table 19 – ATM-Initiated Cash-Out: Relevant Error Conditions**

<br />

### Bulk Payments

#### Use Case Description

This section describes a _Bulk Payments_ use case. The use case is written from the end-user perspective to give additional information to the _Generic Transaction Patterns_ document.

Bulk Payments are used when an organization or business is paying out funds; for example, aid or salary to multiple Payees. The organization or business can group transactions together to make it easier to upload and validate individual transactions in bulk before the bulk transaction is executed. It is also possible for the organization to follow up the result of the individual transactions in the bulk transaction after the bulk transaction is executed.

#### Reference to Generic Pattern

_Bulk Transactions_

#### Actors and roles

The actors and roles for Bulk Payments are described in [Table 20](#table-20) below:

##### Table 20

| Role | Map to Generic Transaction | Pattern Description |
| --- | --- | --- |
| Payer | Payer | The Payer is a corporate, government or aid organization that is transferring money from its own account to multiple Payees. The reason can for instance be payout of monthly salary or aid disbursement.<br></br>The Payer is a registered user with an account in the Payer FSP. |
| Payee | Payee | The Payee is, for example, an employee at a corporate or receiver of aid that is receiving a payout from the Payer.<br></br>The Payee is a registered user with an account in one of the connected FSPs. |

**Table 20 – Bulk Payments: Actors and Roles**

#### Addition to General Pattern

This section describes how the use case connects to the general pattern. The description is focused on the end-user as the interactions between the participating systems are described in the general pattern.

##### Step 1

The Payer creates a bulk transaction according to the format of the Payer FSP. Each row in the bulk transaction includes information about a transfer between a Payer account and a Payee account. The information includes:

- A unique transaction ID for the bulk so that the Payer can follow up the status of individual transactions in the bulk.

- Identifier of the Payee

- Amount and currency to be transferred

The Payer will upload the bulk transaction using the interface provided by the Payer FSP.

##### Step 12

The Payer is notified by the Payer FSP that the bulk is ready for review.

The Payer will get a bulk transaction report and validate that the specified Payees have accounts and can receive funds.

The Payer can also validate any fees that will be charged for executing the bulk transaction. Fees will be calculated per transaction in the bulk transaction.

Before the bulk transaction is executed, the Payer must ensure that there are enough funds in the Payer account for the value of the complete bulk transaction to be completed. Depending on scheme rules the Payer FSP needs to ensure that there are enough funds prefunded to the Payee FSP to be able to complete the transactions to the Payee.

If the Payer is satisfied after reviewing the bulk transaction, then the Payer will initiate the execution of the bulk transaction.

If the Payer does not want to execute the bulk transaction, then the bulk transaction can be canceled. Cancellation will be
handled internally in the Payer FSP. No information regarding cancelation will be sent to the Payee FSP.

How execution and cancelation is handled depends on the implementation in the Payer FSP.

##### Step 21

The Payer can review the result of the bulk transaction execution when the Payer FSP has processed all the transactions in the uploaded bulk transaction.

The Payer will be able to get details about the execution for each individual transaction.

Any reprocessing that might be needed to be executed (for example, failed transactions) will be treated as a new bulk transaction in the API.

#### Relevant Error Conditions

Bulk Transactions have two main types of logical errors: Errors connected to the header and errors related to the transactions in the bulk transaction.

An error related to the header will fail the complete bulk transaction. For example, if the Payer of the bulk transaction is blocked, then no transaction shall be executed.

Errors related to an individual transaction within the bulk transaction will get a failed status and be assigned an error code. The amount of the transaction that failed will be rolled back. Other transactions in the bulk transaction will not be affected if one individual transaction fails.

[Table 21](#table-21) below contains a description of general error cases to give an overview of the bulk transaction use case and how different error cases are handled. Detailed error codes for the operations are not included, nor are codes for communication errors and format validations errors.

##### Table 21

| Step | Error Condition | Error Description | Follow Up Action |
| --- | --- | --- | --- |
| 5 | Payee not found | Account lookup fails to look up Payee at any FSP. | Payee will be excluded from  any bulk transactions request and marked as failed in the bulk transaction response to the Payer |
| 8 | Payee not found | Payee FSP cannot find the Payee account | Payee FSP will mark the individual transaction in the bulk transaction as failed. |
| 15 | Not enough funds on Payer FSP account | The Payer FSP account in the | Switch has not been prefunded to cover for the complete bulk transaction. Switch would fail the complete bulk transaction as the funds for the bulk transaction cannot be reserved. |
| 16 | Not enough funds on Payer FSP account | The Payer FSP account in the Payee FSP has not been prefunded to cover for the complete bulk transaction. | Payee FSP is not able to reserve the amount for the bulk transaction.<br></br>Payee FSP can decide to execute as many transactions as possible or to fail the complete bulk transaction. |
| 16 | Payee transfer not allowed | The Payee FSP cannot complete the transfer of funds to the Payee. This could, for example, be blocked due to an account limit. | The individual transaction will be rolled back and reported in Payer response as failed. |
| 16 | Bulk quote expired | The quote for the bulk transaction has expired | The Payee FSP will fail the complete bulk transaction requests. |

**Table 21 – Bulk Payments: Relevant Error Conditions**

<br />

### Refund

This section describes how to refund a completed interoperability transaction.

There are several refund scenarios for merchant payment transaction:

1. The customer has entered an amount incorrectly and paid more than the invoice.

2. The merchant is not able to deliver the goods as specified by the invoice already paid by the customer, so the merchant wants to refund money to the customer.

3. An online merchant selling tickets (train, air or bus) provides a refund to a customer when the customer cancels the ticket.

4. The customer has returned the goods to the merchant and the merchant wants to refund the customer. 

Additional business scenarios may require transaction reversals. For example:

1. The customer has sent money to incorrect recipient.

2. The customer accidently created the same transaction twice.

It is recommended to use refund transaction to fulfill the business purpose.

The business process will remain as reversal, but the technical implementation would require Payee FSP CCE to initiate a refund transaction. Payer FSP CCE coordinates with Payee CCE manually. If there is a Switch, then Switch administrator may help to facilitate the conversation between Payer FSP and Payee FSP.

Note the following:

- Refund can only be initiated by Payee of the original transaction. Alternatively, CCE of Payee FSP in the original transaction can also initiate refund from Payee account.

- An original transaction can be refunded multiple times.

#### Reference to Generic Pattern

_Payer-Initiated Transaction_

#### Actors and roles

The actors and roles for Bulk Payment are described in [Table 22](#table-22).

##### Table 22

| Role | Map to Generic Transaction | Pattern Description |
| --- | --- | --- | --- |
| Payee | Payee | The End User who has made a wrong payment and requests a refund. |
| Payer | Payer | The End User who has received the payment in the original transaction. |

**Table 22 – Refund: Actors and Roles**

#### Addition to General Pattern

This section describes how the use case connects to the general pattern. The description is focused on the end-user, because the interactions between the participating systems are described in the general pattern.

##### Step 1

Payer of the original transaction can contact Payee or CCE of Payer FSP to request refund. The actual refund amount is negotiated between Payer and Payee before the refund.

##### Step 9-15

Typically, the refund transaction is free-of-charge.

##### Step 17

The original transaction ID should be captured in the refund transaction.

#### Relevant Error Conditions

[Table 23](#table-23) below describes relevant errors and recommended follow-up actions for this use case.

##### Table 23

| Step | Error Condition | Error Description | Follow on Action |
| --- | --- | --- | --- |
| 2 | Timeout | **Lookup Party Information** request timed out | Retry |
| 4 | Payee cannot be found | Account Lookup System fails to locate Customer | Cancel the transaction |
| 17 | Timeout | **Perform Transfer** request timed out | Query transaction status and decide to complete or retry<br></br>The retry policy will be defined by the scheme rules. For example, retry times and period |
| 19 | Transaction failed | Transaction failed at Payee FSP.<br>Possible reasons:<li>Limit Breached</li><li>Quote is expired</li><li>Invalid account status of customer</li><li>Payee FSP internal system error</li></br> | Cancel the transaction |
| 22 | Funds reservation timeout | Funds reservation at Payer FSP timed out and the transaction fails at Payer FSP but succeeds at Payee FSP | Reconcile according to the scheme rules |

**Table 23 – Refund: Relevant Error Conditions**

<br />

## List of Tables

[Table 1](#table-1) – Use Case Summary

[Table 2](#table-2) – P2P Actors and Roles

[Table 3](#table-3) – P2P Relevant Error Conditions

[Table 4](#table-4) – Agent-Initiated Cash-In: Actors and Roles

[Table 5](#table-5) – Agent-Initiated Cash-In: Relevant Error Conditions

[Table 6](#table-6) – Agent-Initiated Cash-Out: Actors and Roles

[Table 7](#table-7) – Agent-Initiated Cash-Out: Relevant Error Conditions

[Table 8](#table-8) – Agent-Initiated Cash-Out Authorized on POS: Actors and Roles

[Table 9](#table-9) – Agent-Initiated Cash-Out Authorized on POS: Relevant Error Conditions

[Table 10](#table-10) – Customer-Initiated Cash-Out: Actors and Roles

[Table 11](#table-11) – Customer-Initiated Cash-Out: Relevant Error Conditions

[Table 12](#table-12) – Customer-Initiated Merchant Payment: Actors and Roles

[Table 13](#table-13) – Customer-Initiated Merchant Payment: Relevant Error Conditions

[Table 14](#table-14) – Merchant-Initiated Merchant Payment: Actors and Roles

[Table 15](#table-15) – Merchant-Initiated Merchant Payment: Relevant Error Conditions

[Table 16](#table-16) – Merchant-Initiated Merchant Payment Authorized on POS: Actors and Roles

[Table 17](#table-17) – Merchant-Initiated Merchant Payment Authorized on POS: Relevant Error Conditions

[Table 18](#table-18) – ATM-Initiated Cash-Out: Actors and Roles

[Table 19](#table-19) – ATM-Initiated Cash-Out: Relevant Error Conditions

[Table 20](#table-20) – Bulk Payments: Actors and Roles

[Table 21](#table-21) – Bulk Payments: Relevant Error Conditions

[Table 22](#table-22) – Refund: Actors and Roles

[Table 23](#table-23) – Refund: Relevant Error Conditions
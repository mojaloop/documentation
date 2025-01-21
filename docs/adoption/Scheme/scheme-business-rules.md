# Scheme Business Rules Template

- Version: 4.0 
    - Author: Carol Coye Benson (Glenbrook)
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

Payments Schemes around the world are in the process of implementation, or considering implementation, of Mojaloop-based payments systems. Mojaloop is open-source software for financial services companies, government regulators, and others taking on the challenges of interoperability and financial inclusion. The Bill & Melinda Gates Foundation has provided funding and support for Mojaloop through The Level One Project, a vision for digital financial markets based on principles of interoperability, collaboration, and inclusion.

Schemes implementing Mojaloop will need to write Business Rules which govern the rights and responsibilities of participants in the system. This document provides a template for those Business Rules. The template is structured as a detailed outline: the actual wording of rules will be determined by implementing Schemes and the jurisdictions within which they operate. In many parts of the document, we simply suggest a topic which a Scheme might want to consider writing a rule about: again, the specifics of the rule will vary by Scheme.

Before Business Rules are written, Schemes need to make major business decisions about how the system and its ecosystem partners will work. These decisions are described in a separate document within the Mojaloop Community Business Document Project, "Scheme Key Choices". People are encouraged to read that document first.

Scheme Business Rules Template

## **Table of Contents**

[1 - About These Scheme Business Rules](#_1-about-these-scheme-business-rules)

[2 - Scheme Goals](#_2-scheme-goals)

[3 - Participation in Scheme](#_3-participation-in-scheme)

[4 - Scheme Business Rules](#_4-scheme-business-rules)

[5 - Responsibilities and Obligations of the Scheme](#_5-responsibilities-and-obligations-of-the-scheme)

[6 - Participant Responsibilities and Obligations of Participants](#_6-participant-responsibilities-and-obligations-of-participants)

[7 - Liability - Allocation of Responsibilities](#_7-liability-allocation-of-responsibilities)

[8 - Security, Risk Management, and Data Confidentiality](#_8-security-risk-management-and-data-confidentiality)

[9 - Scheme Platform and Services](#_9-scheme-platform-and-services)

[10 - Exception Management](#_10-exception-management)

[11 - Appendix: Associated Documents](#_11-appendix-associated-documents)

[12 - Appendix: Onboarding and Exit Processes](#_12-appendix-onboarding-and-exit-processes)

[13 - Appendix: Scheme Services](#_13-appendix-scheme-services)

[14 - Appendix: Scheme Supported Use Cases](#_14-appendix-scheme-supported-use-cases)

[15 - Appendix: Scheme Fee Schedule](#_15-appendix-scheme-fee-schedule)

[16 - Appendix: Risk Management, Security, Privacy, and Service Standards](#_16-appendix-risk-management-security-privacy-and-service-standards)

## **A Guide to This Document**

Section Headings and bulleted entries underneath section headings are actual proposed wording, or suggested sections for a rules document. Text in italics are comments which can be used when a scheme drafts the actual language of a rules document.

## 1. About These Scheme Business Rules

### 1.1 These are the Scheme Business Rules

::: tip NOTE
The Mojaloop software can be used for bilateral exchanges among DFSPs, as well as within a Scheme structure that uses a switch. This document assumes the latter; that the Scheme is either providing, hiring, or otherwise arranging that interoperable transactions are exchanged through a switch. Some of the concepts in these rules apply only to this configuration; others would be useful in bilateral agreements as well.
:::

### 1.2 Scheme Ownership 

<ul><i>Who owns the scheme, what opportunities exist for ownership participation. Reference to other documents (charter, by-laws, etc.)</i></ul>

### 1.3 Defined Associated Documents

- These rules include the Associated Documents listed in an Appendix to these rules. Associated Documents are part of, and have the force of, the Operating Rules.

<ul><i>Associated Documents should include the Platform Operating Guideline and the Uniform Glossary. This does not include various technical documents that may be referenced in the Business Rules or the Platform Operating Guideline.</i></ul>

### 1.4 Scheme Business Rules are Binding on Participants

<ul><i>This repeats the provision in the Scheme Participation Agreement. Note that Scheme Business Rules are only binding on the DFSPs that participate in the Scheme. The Scheme may write rules that require certain provisions of these rules be passed on to Participant customers (for example, merchants) or partners (for example, processors) - but this is an obligation of the Participant to the Scheme, not the other parties.</i></ul>

### 1.5 Rules May Be Amended

<ul><i>Details of amendment process are specified elsewhere.</i></ul>

### 1.6 Terms are Defined in Uniform Glossary

<ul><i>The glossary is a separate document, rather than be internal to the Business Rules document. This is to ensure consistency in terminology as the service evolves and the Platform Operating Guideline changes.</i></ul>

## 2. Scheme Goals

<ul><i>This is a section that allows a Scheme to state the objectives of the Scheme. We suggest support of interoperable financial transactions, financial inclusion, and gender equality. This is also an opportunity to reference support for the Level One Project Design Principles, a national or regional payments strategy (or digital economy strategy), or a Scheme-specific set of design principles.</i></ul>

## 3. Participation in Scheme

### 3.1 Participation Eligibility

- Eligibility Criteria

<ul><i>A statement as to which types of institutions are eligible to apply to be a participant in the Scheme. The Level One design principle is that any licensed provider of transaction accounts in a jurisdiction covered by the Scheme should be eligible to apply</i></ul>

- Approval Criteria

<ul><i>Scheme provisions for acceptance of applications, including high level statements of required information from applicant, such as demonstration of a sustainable ability to meet financial obligations and compliance obligations. The actual application process is in an Appendix to these Rules. The technical certification requirements can be listed in the Platform Operating Guideline.</i></ul>

### 3.2 Licensing

<ul><i>This concept may or may not apply when the Scheme operator is a government entity. If the concept to licensing is not included in the rules, there needs to be a provision in "Participation Eligibility" section with respect to terminating a participant.</i></ul>

- A Participant is granted a License to participate in the Scheme and to use the Scheme Property in accordance with the Scheme Business Rules.

- A Participant may use Scheme Property only in accordance with the Scheme Business Rules. Licenses will limit use of Scheme Property to the Participant's provision of services in connection with the Scheme and according to the Rules.

- Licenses will not be exclusive.

### 3.3 Tiered Access

<ul><i>Schemes may choose to allow some applicants to access join the Scheme as indirect participants. This section specifies the conditions for this. Some Schemes separately enable technical indirect participation and settlement indirect participation.</i></ul>

<ul><i>If this is allowed, defined terms (such as Sponsor Bank and Indirect Participant) are required. This section should clearly show what the obligations of each party are; this can refer to the obligation sections appearing later.</i></ul>

### 3.4 Departure from Participation

<ul><i>Provisions for Scheme suspension or termination of a Participant's participation in the Scheme. The Scheme may suspend, limit or disqualify a Participant from participating in the Scheme if it determines that the Participant's inability to observe a Rule unduly burdens the Scheme or other Participants or poses undue risks to the integrity of the Scheme or the reputation of the Scheme</i></ul>

<ul><i>Provisions for Participants to terminate their participation in the Scheme</i></ul>

## 4. Scheme Business Rules

### 4.1 Scope of the Scheme Business Rules

- These Rules apply to each Participant and govern the rights and responsibilities of Participants and of the Scheme.

- These Rules may be superseded to the extent that they conflict with any Applicable Laws. Nothing in these Rules shall be applied to require the Scheme or any Participant to violate Applicable Law.

- All matters regarding interpretation of the Rules and all disputes arising in connection with participation in the Scheme will be subject to the laws of \[xxxx\]

<ul><i>Provisions should be made for resolution of disputes among Participants or between Participants and the Scheme.</i></ul>

### 4.2 Changes to the Scheme Business Rules

- Participants may from time to time provide suggestions or requests for modification of the Rules.

- Participant suggestions for modifications to the Rules may be used by the Scheme or by other Participants in connection with the Scheme without compensation or attribution to the Participant who makes the suggestion or request.

- Changes to the Rules will be made according to a consultative procedure:

- A Participant(s) or the Scheme may propose a change to the Scheme Business Rules.

- The Scheme will publish proposals to all Participants and request comments and suggestions on these; all comments received will be published to all participants.

- The Scheme may include with the publication of a proposed change its independently determined suggestion for the wording of a change in the Rules,

<ul><i>Scheme should have a defined process for adopting changes, which may include Participant voting or decision by the Scheme. If there is voting, rules here should specify the parameters.</i></ul>

- The Scheme may grant variances to the Rules upon application from Participants.

- Provisions for urgent changes may be made by the Scheme to meet risks or regulatory requirements.

## 5. Responsibilities and Obligations of the Scheme

### 5.1 Defining and Providing Scheme Services

- The Scheme defines the set of Scheme Services that are provided to Participants. The defined list of Scheme Services is shown in an Appendix to these Rules.

<ul><i>Scheme Services</i></ul>

- The Scheme specifies how Scheme Services are provided to Participants - they may be operated by the Scheme entity, by another entity under contract to the Scheme, or there may be some other arrangement. This section gives the Scheme the right to define new services, change existing services, etc.

- The Scheme may define service level standards for itself, and for participants in using these services

- For outsourced Platform services, the Scheme specifies services to be provided. The Scheme may specify the service level agreements for providers of these services

- For the Scheme Settlement Service, the Scheme selects and contracts with a Settlement Bank(s) for inter-Participant Settlement.

- The Scheme establishes a Transaction Value Limit which sets the maximum value of any Transfer made through the Scheme Platform. DFSPs may set lower values for their customers.

- The Scheme should consider if it will guaranty to the Payee DFSP any Fulfilled Transfer made in accordance with these Rules

<ul><i>The Scheme should consider if it will guaranty to the Payee DFSP any Fulfilled Transfer made in accordance with these Rules.</i></ul>

### 5.2 Writing, Updating, and Maintaining the Rules

- The Scheme writes, updates, and maintains the Business Rules.

- The Scheme is responsible for informing Participants of any changes to the Rules, all fees, policies that may impact Participants' use of the Scheme, or any other important and relevant information.

- The Scheme is responsible for establishing a policy, and communicating this to Participants, for enforcement of the Rules;

- The Scheme is responsible for establishing policies with respect to granting variances to the Rules to Participants,

### 5.3 Other Scheme Responsibilities

- The Scheme administers Participant on-boarding and exit processes. These processes are listed in an Appendix to these rules.

- The Scheme monitors the ongoing eligibility of Participants under the requirements established for Participation

- The Scheme defines a set of Use Cases and Secondary Use Cases. These are listed in an Appendix to these rules

- The Scheme establishes the Fee Schedule and defines the processes by which Fees are collected. The Fee Schedule is in an Appendix to these rules

- The Scheme sets the Scheme Brand and establishes guidelines for its use. These guidelines appear in an Associated Document.

- The Scheme measures the progress of the Scheme and its Participants

- The Scheme defines policies and procedures for Security, Risk Management, and Data Confidentiality for the Scheme and its Participants.

- The Scheme defines policies and procedures for the management of Transaction Exceptions.

- The Scheme engages in activities to promote and encourage the adoption and usage of the Scheme.

- The Scheme plans for long-term enhancement and expansion of the Platform to meet evolving market needs and opportunities in the advancement of the Scheme's goals.

## 6. Participant Responsibilities and Obligations of Participants

- Participants are obliged to comply with these Business Rules and with the Associated Documents to these Rules.

- Participants must comply with all Applicable Law with respect to their participation in the Scheme within the territories in which they operate and within which they use Scheme Services. The Scheme assumes no responsibility for Participants' compliance with Applicable Law.

- Participants are required to permit use and disclosure of Personal Information as required by these Business Rules and to provide disclosures to their Customers and obtain consents where necessary regarding such use and disclosure of Personal Information as required by Applicable Law.

- Participants agree to pay fees to the Scheme and to other Participants as specified in these rules.

- Participants will adhere to Scheme brand specifications as specified in these rules.

- Participants will use Scheme Services as specified in these rules.

    <ul><i>Schemes will need to consider if they want to: 1) require the use of the scheme for scheme-eligible transactions (assuming the rules authority to do this); 2) require the use of the scheme platform for "on-us" transactions (would require separate, probably zero processing fee for such transactions); if "on-us" transactions don't go through the platform, if the scheme wants to require reporting of "on-us" transactions to the scheme, for use with a fraud utility.</i></ul>

- All transfers made using the Scheme Brand or described as being made with the Scheme will be made using Scheme Services.

    <ul><i>Schemes will need to consider if they want to state the above rule. Some Schemes may want Participants to use the Scheme brand for on-us transactions which do not use Scheme Services. This could be worded to say "all interoperable transfers"</i></ul>

- _\[Net Settlement Option\]_ Participants will open a Settlement Bank Account with the scheme-specified Settlement Bank, or make available an existing account for these purposes, as allowed by the Scheme. _\[Continuous Gross Settlement Option\]_ Participants will become a joint owner of the Scheme Pooled Settlement Account and sign Scheme Settlement Bank Account Agreement to that effect. Participants will transfer money into and out of that outcome from their existing reserve, clearing, or trust accounts at the Scheme Settlement Bank, as Scheme Operating Guidelines specify.

- Participants will share information with the Scheme as strictly necessary for the operation of the Scheme, including for due diligence, technical onboarding, configuration, transactions management and other purposes as specified in the Rules.

- Participants will be required by the Scheme to meet Security, Risk Management and Data Confidentiality standards specified by the Scheme.

- Participants will provide adequate customer service to their customers in connection with the Scheme.

- Participants must exclude customers from use of the Scheme upon request by the Scheme when the Scheme reasonably determines that a customer poses risk to the Scheme, which may include financial, legal, security, reputational risk or any other risk.

- Participants will not, and will not permit customers, to use the Scheme for illegal purposes, including illegal goods or services; illegal payments, such as bribery, money laundering or financing of terrorism; poaching or trafficking in protected animal species or products.

    <ul><i>Schemes can consider if they want to specify that Participants contractually prohibit customers from using Scheme Services for illegal purposes and will discontinue Scheme Services for customers who they know, or suspect are using Scheme Services to initiate or receive transfers for illegal purposes</i></ul>

### 6.1 Responsibilities and Obligations of Participants as Payer DFSPs

- A Participant who originates a Quote Request or a Transfer Request is acting as a Payer Participant under these Rules.

- A Participant may initiate a Transaction on behalf of its Payer for any Use Case or Secondary Use Case supported by the Scheme.

- A Payer Participant is obligated to settle a Transfer upon submission of a Transfer Request, unless such Transfer Request is refused by the Payee DFSP or expires without fulfillment.

- The Payer Participant warrants upon submission of each Transfer Request, that the Transfer is coming from an account that is KYC- and AML-compliant and is executed in accordance Applicable Law, and that the Payer has been provided all disclosure and has provided all consents necessary to conduct the Transfer in accordance with these Business Rules and under Applicable Law.

- The Payer Participant warrants upon submission of a Request for Transfer, that the Transfer Request has been authorized by their Payer, and that their communications with their Payer have been properly authenticated in accordance with these Business Rules and Applicable Law.

- The Payer Participant acknowledges that the Platform will reject a Transfer Request if the proposed Transfer would violate these Business Rules, such as exceeding the Payer Participant's Net Debit Cap.

### 6.2 Responsibilities and Obligations of Participants as Payee DFSPs

- A Participant who receives and responds to a Quote Request or a
 Transfer Request is acting as a Payee Participant under these Rules.

- A Payee Participant who receives a Quote Request is required to respond, in the absence of technical issues, with a Quote Response if:

  - The Payee's Transaction Account with the Payee Participant is in good standing and capable of receiving, at that point in time, the Transfer Amount and

  - Acceptance of the Transfer will not put the Payee account into a status not permitted by Applicable Law or the Participant's account policies and agreements.

  - The Payee Participant affirms, upon initiation of a Quote Response other than an error response, that the Payee account has been Validated — it is open, in good standing, and able to accept the proposed Transfer Amount at that point in time.

- The Payee Participant affirms, upon initiation of a Quote Response other than an error response, that a Transfer to the designated account complies at that point in time with applicable AML/CTF and KYC requirements.

- A Payee Participant who receives a Transfer Request is required, in the absence of technical issues, to respond with a Transfer Response with the Transaction State "Committed" if:

  - They have received a Quote Request and responded with a Quote Response for the Transaction and

  - The Quote Response has not yet expired

  - The Payee's Transaction Account with the Payee Participant is in good standing and capable of receiving, at that point in time, the Transfer Amount and

  - Acceptance of the Transfer will not put the Payee account into a status not permitted by Applicable Law or the Participant's account policies and agreements and

  - The Transfer Request on the Transaction has not expired.

- A Payee Participant who sends a Transfer Response with a Transaction State "Committed" must post that Transfer to the Payee's account within \[X time\].

- A Payee Participant who receives a Transfer Request which does not meet the above criteria is required to respond with a Transfer Response with the Transaction State "Aborted".

- The Payee Participant must affirm, upon submission of each Transfer Response with a Transaction State "Committed", that the Transfer is being credited to an account that is AML-compliant and is executed in accordance with any account volume limitations, or any other regulation that apply in the territories in which they operate, and that the Payee has been provided all disclosure and has provided all consents necessary to conduct the Transfer in accordance with the Rules and under Applicable Law.

## 7. Liability - Allocation of Responsibilities

- Each Participant is responsible for errors made by them, and for fraud committed by its employees or contractors, in accordance with Applicable Law.

- The Scheme will not be held responsible for, and each Participant will indemnify and defend the Scheme from claims arising from actions or omissions of the Participants, of their Customers or contractors.

- The Scheme may elect to defend any claim in circumstances where the Scheme determines that the resolution of a claim may have an adverse impact on the finances, operations or reputation of the Scheme.

- The Scheme shall be held responsible for its own errors in processing Transfers within limits prescribed by the Rules.

- The Scheme will compensate Participants for costs of funds to the extent that a Participant is wrongly deprived of funds for a period of time as a result of errors made by the Scheme.

- Each Participant is responsible for the actions and omissions of any contractors engaged by them to provide services in connection with the Scheme to the same extent as if committed by the Participant.

- The Scheme may allocate responsibility among Participants for consequences of unauthorized use of or access to data by a Participant or for a Security Incident suffered by one Participant that impacts other Participants or the Scheme in accordance with principles stated in the Rules.

## 8. Security, Risk Management, and Data Confidentiality 

### 8.1 Confidentiality and Protection of Personal Information

- Confidential Information of the Scheme that is disclosed to Participants will be held in confidence by Participants and will be used only for the purposes permitted by the Rules. Scheme Confidential Information may include proprietary technology and other matters designated by the Scheme.

- Transaction data will not be owned by the Scheme and will be owned by a Participant as it relates to its Customer's Transactions.

- The confidentiality of Transaction data and any Personal Information processed in the Platform will be protected by the Scheme and Participants according to Applicable Law.

- Statistics or data which identify a Participant or from which the Participant may be identified will not be disclosed to other Participants. The Scheme may prepare for internal use and disclose to third parties for promotional purposes statistics based on aggregate, anonymized data as permitted by Applicable Law.

- The Scheme will make disclosures of Confidential Information to comply with Applicable Law or the directive of a Regulatory Authority.

- The Scheme will protect Personal Information in its possession or under its control from misuse and otherwise treat such information in accordance with Applicable Law protecting privacy of individuals.

- The Scheme will maintain industry leading security measures to protect information from unauthorized access and use.

- Participants will notify the Scheme and acknowledge that the Scheme may notify other Participants, of any Security Incident in the systems or premises of the Participant, its affiliated entities or any third-party vendor engaged by the Participant to provide services in support of the Participant's participation in the Scheme.

- The Scheme may conduct investigations into Security Incidents. Participants will cooperate fully and promptly with the investigation. Such investigations will be at the expense of the affected Participant.

- The Scheme may require a Participant to conduct investigations of Security Incidents and may require that such investigations be conducted by qualified independent security auditors acceptable to the Scheme.

- The Scheme may impose conditions of continued participation on the affected Participant regarding remedy of the causes of the Security Incident and ongoing security measures.

- The investigation and report, as well as remedies that may be required will be held confidential to the extent permitted by Applicable Law.

### 8.2 Risk Management Policies

<ul><i>This section assumes that the development of risk management policies by the Scheme and its participants will be evolving. This section contemplates that some of these policies will (eventually) be in the Rules; others will not.</i></ul>

- Risk management policies and procedures may be stated in the Rules, in Associated Documents, or in other written policy documents created by the Scheme and distributed to Participants

- Risk management policies and procedures will include fiscal soundness, system integrity, compliance with Applicable Law, particularly as to Anti-Money Laundering/Combatting Terrorism Financing measures, privacy of personal information and data security

- Risk management functions include procedures applicable to Participants for monitoring of risks, including reporting requirements and audits

### 8.3 Business Continuity

- Provisions to ensure business continuity on the part of the Scheme, its vendors, and Participants.

## 9. Scheme Platform and Services

- The Scheme defines the set of Scheme Services which Participants access to use the system. These are listed in an Appendix to this document. The core Scheme Services necessary for inter-operability are considered to be the Scheme Platform.

- Technical and operational details on the use of Scheme Services, including the Scheme Platform, are provided in Associated Documents. This list of Associated Documents is an Appendix to this document.

## 10. Exception Management

- Problems may occur during execution of a Transaction that result in exception cases, which may require or may be facilitated by inter-Participant communication. Exception cases may include errors on the part of any party, fraud, or other service anomalies.

- The Scheme will create and maintain protocols by which Participants may determine the type of exception and suggested or required actions on the part of Participants to resolve the exception. These protocols are contained in an Associated Document.

- The following principles govern exception management:

  - Participants involved will cooperate in good faith.

  - Each Participant agrees that they will not contact the other Participant's customer directly during the process of dispute resolution.

  - Participants agree to cooperate with each other and with the Scheme to share information about suspected or confirmed fraud.

### 10.1 Transaction Irrevocability

- Participants agree that Fulfilled Transfers executed via the Platform are irrevocable. A Transfer which has been credited to a Payee's account as a result of a Scheme Transfer may not be revoked without the consent of the Payee.

- The Scheme may instruct a Participant to initiate a corrective transaction between Participants in an amount determined by the Scheme to be necessary to correct errors caused by Payer DFSP, the Payee DFSP, or the Scheme.  The conditions under which such corrective transactions may be made are specified by the Rules. 

- Errors on the part of the Payee DFSP, the Payer DFSP, or the Scheme which result in erroneous or duplicate posting of a Transfer to a Payee's account may be corrected by the Payee Participant, as long as the instructions in the Fulfilled Transfer are not revoked or altered in any way.

## 11. Appendix: Associated Documents

- Uniform Glossary

- Platform Operating Guideline

- Brand Guideline

- Exception Management Protocols

## 12. Appendix: Onboarding and Exit Processes

## 13. Appendix: Scheme Services

Scheme Services include:

- Scheme Platform, which includes

  - The Transfer Service

  - The Directory Service

  - The Settlement Service

  - Scheme Management Service

- Other Shared Services

  - Fraud Management Utility

## 14. Appendix: Scheme Supported Use Cases

<ul><i>Use Cases are defined by what type of customer is paying what other type of customer, and by the purpose of the payment. Secondary use cases are sub-sets of Use Cases and are used to demonstrate more finite differences in transfers. All transfers made via Scheme Services may be categorized by one, and only one, Use Case and Secondary Use Case.</i></ul>

<ul><i>The Use Case and Secondary Use Case of a Transaction may require different operational and technical details to apply, as specified in the Platform Operating Guideline; different interchange fees to apply, as specified in an Appendix to these rules; different requirements for exception management procedures to apply, as specified in an Associated Document to these rules</i></ul>

<ul><i>All Scheme Supported Use Cases and Secondary Use Case are defined by attributes of the transactions, which are specified in the Platform Operating Guide.</i></ul>

<ul><i>The following is an example of a table of Use Cases and Secondary Use Cases that a scheme might support.</i></ul>

<ul><i>A scheme would only define Secondary Use Cases if it wanted to write rules and/or specify fees that are unique to that Secondary Use Case</i></ul>

|       | Use Case   | Secondary Use Case          |
| :---: | :--------: | :-------------------------- |
| 1.0 | P2P | Person to Person |
| 1.1 | P2P | Wallet to wallet |
| 1.2 | P2P | Bank to bank |
| 1.3 | P2P | Wallet to bank |
| 1.4 | P2P | Bank to Wallet |
| 2.0 | Bulk Payment |  |
| 2.1 | B2P | Business to Person |
| 2.2 | G2P | Government to Person |
| 3.0 | P2B | Person to Business |
| 3.1 | P2B | Till Number Purchase |
| 3.2 | P2B | QR code Purchase |
| 3.3 | P2B | Online Purchase |
| 3.4 | P2B | Bill Payment |
| 3.5 | P2B | Person to Business - Other |
| 4.0 | P2G | |
| 4.1 | P2G | Person to Government |
| 4.1 | P2G | Till Number Purchase |
| 4.2 | P2G | QR code Purchase |
| 4.3 | P2G | Online Purchase |
| 4.4 | P2G | Bill Payment |

## 15. Appendix: Scheme Fee Schedule

1. Processing Fees

   - Processing fees are calculated by \[define\]

   - Processing fees apply to fulfilled transfers

   - Processing fees are charged to \[which party or parties\]

   - Processing fees for "on-us" transfers (where Payer and Payee DFSP are the same) \[are or are not charged\]

   - Processing fees will be calculated and billed to Participants \[define\]

   - Provision for how Participants will pay processing bills \[define\]

2. Membership or Participation Fees

   - Membership or Participation Fees are charged to \[define\]

   - Specify basis, how collected, etc.

3. Interchange Fees

   - Interchange fees are set by the Scheme

   - The amount of the fee and the direction (which Participant pays which) vary by Use Case and by Secondary Use Case. Some Use Cases and Secondary Use Cases will not have interchange.

   - \[Define how the platform will collect and disburse interchange: on a transaction basis or a periodic basis.\]

## 16. Appendix: Risk Management, Security, Privacy, and Service Standards

<ul><i>Schemes may or may not want to specify standards or require that Participants comply with other established standards. Schemes may furthermore specify different standards for different categories of Participants. The list below is given purely as an example.</i></ul>

Participants must adhere to the following practices of service quality security, data privacy and customer service as they apply to a Participant in connection with the Scheme.

- Participants will establish a risk management framework for identifying, assessing and controlling risks relative to their use of the Scheme.

- Participants will ensure that the systems, applications and network that support the use of the Scheme are designed and developed securely.

- Participants will implement processes to securely manage all systems and operations that support the use of the Scheme.

- Participants will implement processes to ensure that systems used for the Scheme are secure from unauthorized intrusion or misuse.

- Participants will implement processes to ensure the authentication
    of their customers in creating and approving transactions that use
    the Scheme.

-   Participants will develop effective business continuity and
    contingency plans.

-   Participants will manage technical and business operations to allow
    timely responses to API calls received from the Scheme Platform or
    from other Participants via the Scheme Platform.

-   Participants will establish written agreements governing their
    relationship with agents, processors, and other entities providing
    outsourced services that pertain to the Scheme.

-   Participants will develop policies and processes for ongoing
    management and oversight of staff, agents, processors, and other
    entities providing outsourced services that pertain to the Scheme.

-   Participants will ensure that customers are provided with clear,
    prominent, and timely information regarding fees and terms and
    conditions with respect to services using the Scheme.

-   Participants will develop and publish customer service policies and
    procedures with respect to services using the Scheme.

-   Participants will provide an appropriate mechanism for customers to
    address questions and problems. Participants will specify how
    disputes can be resolved if internal resolution fails.

-   Participants will comply with good practices and Applicable Laws
    governing customer data privacy.

-   Participants will ensure that Customers are provided with clear,
    prominent, and timely information regarding their data privacy
    practices.

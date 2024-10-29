# Uniform Glossary Template

- Version: 1.0 
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

This is a glossary of terms used in the Mojaloop Business Community Document Project, and contains other terms related to business topics. A more detailed technical glossary is available as part of the Open API for FSP Interoperability Specification.

# Uniform Glossary Template

| Term   | Definition                                                                                      |
| :----- | :---------------------------------------------------------------------------------------------- | 
| Access Channel | Places or capabilities that are used to initiate or receive a payment. Access channels can include bank branch offices, ATMs, terminals at the POS, agent outlets, mobile phones, and computers. |
| Account Lookup | A process that determines the DFSP responsible for a Transaction Account. |
| Account Lookup System | Account Lookup System is an abstract entity used for retrieving information regarding in which FSP an account, wallet or identity is hosted. The Account Lookup System itself can be hosted in its own server, as part of a financial switch, or in the different FSPs. |
| Account Validation | A status provided by a Quote Response API Call: a Payee DFSP indicates that an account is available to be credited with a proposed transfer amount. |
| Active User | A term used by many providers in describing how many of their account holders are frequent users of their service. |
| Addressing | The use of an identifier to direct a Payment from a Payer to a Payee, typically a mobile phone number or email address. |
| Adjacencies | Ways in which entities and/or DFSPs realize revenue from services that are not directly associated with a Payment---for example, loans made to Transaction Account holders. |
| Agent | An entity authorized by the provider to handle various functions such as customer enrollment, cash-in and cash-out using an agent till. |
| Agent Outlet | A physical location that carries one or more agent tills, enabling it to perform enrollment, cash-in and cash-out transactions for customers on behalf of one or more providers. National law defines whether an agent outlet may remain exclusive to one provider.Agent outlets may have other businesses and support functions. |
| Agent Till | An agent till is a provider-issued registered "line", either a special SIM card or a POS machine, used to perform enrollment, cash-in and cash-out transactions for clients. National law dictates which financial service providers can issue agent tills. |
| Agent-Initiated Cash-In | A Use Case defined in the API Specifications document. |
| Agent-Initiated Cash-Out | A Use Case defined in the API Specifications document. |
| Aggregator | A specialized form of a merchant services provider, who typically handles payments transactions for a large number of small merchants. Scheme rules often specify what aggregators are allowed to do. |
| Alias | A Payee Identifier that is mapped to a Payee DFSP and Transaction Account Number. |
| Anti-Money Laundering (AML) | Anti-Money Laundering refers to Applicable Law and, to the extent expressly adopted by the Scheme, good practice guidance, t regarding mitigation of money laundering risks. |
| API | Application Programming Interface: a technical interface implemented by a software protocol that allows systems to interact with each other via standard structures, without requiring a user system to know the internal implementation details of the system with which it is interacting. |
| Applicable Law | All treaties, conventions, laws, regulations, directives, official guidance or directives of a Regulatory Authority to the extent that they are binding, respectively, upon the Scheme, the Scheme or a Participant with regard to the Scheme\'s Services. |
| Applicant | An organization that has submitted or wishes to submit an application to become a Participant, but whose application has not been acted upon by the Scheme. |
| Application Program Interface (API) | A method of communication to allow interaction and sharing of data between different software or Technical Protocols. |
| Arbitration | The use of an arbitrator, rather than courts, to resolve disputes. |
| Associated Documents | The set of documents listed in Appendix A of these Rules. |
| ATM-Initiated Cash-Out via OTP | A Use Case defined in the API Specifications document. |
| Attribute | A characteristic of a Transaction, it being understood that specific rules may apply to Transactions with specific Attributes. |
| Authentication | The process of ensuring that a person or a transaction is valid for the process (account opening, transaction initiation, and so on) being performed. |
| Authorization | The permission given by the Payer or entity to make a Payment. |
| Authorized /institution entity | Non-financial institutions that have followed the appropriate authorization by State Bank and/or relevant regulatory authorities to partake in the provisioning of mobile financial services. |
| B2P | Business to Person; a Bulk Payment Secondary Use Case. |
| Bank | A chartered financial system within a country that has the ability to accept deposits and make and receive payments into customer accounts. |
| Bank Account | A Transaction Account offered by a Bank. |
| Bank Account Identifier | A type of Payee Identifier. |
| Bank Accounts and Transaction Services | A transaction account held at a bank. This account may be accessible by a mobile phone, in which case it is sometimes referred to as \"mobile banking\". |
| Bank to Bank | A P2P Secondary Use Case. |
| Bank to Wallet | A P2P Secondary Use Case. |
| Bank-Led Model| A reference to a system in which banks are the primary providers of digital financial services to end users.National law may require this.|
| Basic Phone | Minimum device required to use digital financial services. |
| Bill Payment | A P2B Secondary Use Case. |
| Biometric Authentication | The use of a physical characteristic of a person (fingerprint, IRIS, and so on) to authenticate that person. |
| Blacklist| A list or register of entities (registered users) that are being denied/blocked from a particular privilege, service, mobility, access or recognition. |
| Blockchain | A technology that creates distributed architectures. In payments systems, often a reference to a shared ledger that records and validates Transactions.
| Blockchain | The technology underlying bitcoin and other cryptocurrencies - a shared digital ledger, or a continually updated list of all transactions. |
| Brand | A word and/or mark approved by the Scheme for use by Participants. |
| Bulk Disbursement | A Use Case defined in the API Specifications document. |
| Bulk Payment | A Payment from a single Payer to multiple Payees, for example cash transfer programs from a government or NGO to a set of beneficiaries. |
| Bulk upload service | A service allowing the import of multiple transactions per session, most often via a bulk data transfer file which is used to initiate payments.Example: salary payment file. |
| Business | Entity such as a public limited or limited company or corporation that uses mobile money as a service; for example, making and accepting bill payments and disbursing salaries. |
| Cash Management | Management of cash balances at an agent. |
| Cash-In | Receiving eMoney credit in exchange for physical cash - typically done at an agent. |
| Cash-Out | Receiving physical cash in exchange for a debit to an eMoney account - typically done at an agent. |
| Chip Card | A chip card contains a computer chip: it may be either contactless or contact (requires insertion into terminal).Global standards for chip cards are set by EMV. |
| Clearing | The process within a Payment system in which a Payer DFSP and a Payee DFSP debit and credit their End User accounts. |
| Closed-Loop | A payment system used by a single provider, or a very tightly constrained group of providers. |
| Combatting Financing of Terrorism (CFT) | Initiatives to prevent individuals or entities from using payment systems to send funds to individuals or entities associated with terrorism. |
| Commission | An incentive payment made, typically to an agent or other intermediary who acts on behalf of a DFS provider.Provides an incentive for agent. |
| Commit | Part of a 2-phase transfer operation in which the funds that were reserved to be transferred, are released to the payee; the transfer is completed between the originating/payer and destination/payee accounts. |
| Condition | In the Interledger protocol, a cryptographic lock used when a transfer is reserved. Usually in the form of a SHA-256 hash of a secret preimage. When provided as part of a transfer request the transfer must be reserved such that it is only committed if the fulfillment of the condition (the secret preimage) is provided. |
| Corridor | Refers to any two countries in a cross-border Transaction and to the direction of the transfer. |
| Counterparty | The other side of a payment or credit transaction. A payee is the counterparty to a payer, and vice-versa. |
| Coupon | A token that entitles the holder to a discount or that may be exchanged for goods or services. |
| Credit Transfer | A Payment or Transfer of funds initiated by the Payer DFSP to the Payee DFSP. A Credit Transfer is often referred to as a 'credit push transfer' because the funds are 'pushed' from the Payer's Transaction Account. Credit Transfer contrasts with Direct Debit. |
| Cross-Border | A Transfer from a Payer DFSP domiciled in one country, to a Payee DFSP that is domiciled in another country. |
| Cross-FX Transfer | Transfer involving multiple currencies including a foreign exchange calculation. |
| Current Position | A Participant\'s current net position in the Position Ledger for a given Currency. |
| Customer | The Customer of the system. The term is used for both the Payer and the Payee. Individuals, merchants, billers, governments, and other enterprises are all customers. Sometimes refered to as end-users. |
| Customer-Initiated Cash-Out | A Use Case defined in the API Specifications document. |
| Customer-Initiated Purchase | A Use Case defined in the API Specifications document. |
| Customer-Initiated Purchase via QR | A Use Case defined in the API Specifications document. |
| DFSP (Digital Financial Services Provider) | A financial services provider that is licensed by a regulatory authority to provide Transaction Accounts which hold customer funds and are used to make and receive Payments. DFSPs have relationships with consumers, merchants, and other enterprises, and provide digital financial services to End Users. Used interchangably with FSP (Financial Services Provider). |
| Digital | Electronic communications between two individuals or entities that can occur on various electronic devices (e.g., mobile, tablet, computer). |
| Digital Liquidity | A practice of keeping value in Digital form, rather than exchanging the Digital value for cash (physical form). |
| Digital Payment | A broad term including any payment which is executed electronically. Includes payments which are initiated by mobile phone or computer. Card payments in some circumstances are considered to be digital payments. The term \"mobile payment\" is equally broad and includes a wide variety of transaction types which in some way use a mobile phone. |
| Direct Debit | A Payment or Transfer of funds initiated by the Payee DFSP to the Payer DFSP. A Direct Debit is often referred to as a 'debit pull transfer' because the funds are 'pulled' from the Payer's Transaction Account. Direct Debit contrasts with Credit Transfer. |
| Directory | A centralized or decentralized holding of payment identifiers to be used for Addressing, accessible by the payments system or DFSPs. |
| Dispute Resolution | A process specified by a provider or by the rules of a payment scheme to resolve issues between end users and providers, or between an end user and its counter party. |
| Domestic | Describes a Transaction between two DFSPs domiciled in the same country. |
| eMoney | Digital funds or value owned by a Transaction Account holder on a payment device such as chip, prepaid card, mobile phone, or on a computer system. National regulation specifies what types of DFSPs can issue eMoney. |
| eMoney Issuer | A DFSP licensed in the country to act as an eMoney Issuer. |
| End User | The customer of a DFSP. The customer may be a consumer, a merchant, a government, or another form of enterprise. |
| End-User Fees | Fees assessed by a DFSP to their en-end user customer. |
| Enterprise | Any non-individual person who is a customer of a DFSP: includes Merchants, Billers, Government Agencies, and other enterprises. |
| Escrow or Trust Account | An account held by a Non-Bank DFSP at a bank; normally a regulatory requirement to protect consumer deposits at the DFSP. |
| Exceptions | Transactions that are erroneous or fraudulent. |
| FATF | The Financial Action Task Force is an intergovernmental organization to combat money laundering and to act on terrorism financing.|
| Feature Phone | A mobile telephone without significant computational capabilities. |
| Fees | The payments assessed by a provider to their end user. This may either be a fixed fee, a percent-of-value fee, or a mixture. |
| Fiat Currencies | Official money issued by the central bank of a country or region as legal tender. |
| Financial Inclusion | The sustainable provision of affordable Digital financial services that bring the Low Income End Users into the formal economy. |
| Financial Inclusion | The sustainable provision of affordable digital financial services that bring the poor into the formal economy. |
| Financial Literacy | Consumers and businesses having essential financial skills, such as preparing a family budget or an understanding of concepts such as the time value of money, the use of a DFS product or service, or the ability to apply for such a service. |
| Fintech | A term used to describe the intersection of finance and technology. 'Fintechs' are entities providing innovative solutions in the finance space, leveraging technology. |
| Float | This term can mean a variety of different things. In banking, float is created when one party\'s account is debited or credited at a different time than the counterparty to the transaction. eMoney, as an obligation of a non-bank provider, is sometimes referred to as float. |
| Fraud | Criminal use of digital financial services to take funds from another individual or business, or to damage that party in some other way. |
| Fraud Risk Management | Tools to manage providers\' risks, and at times user\'s risks (for example, for merchants or governments) in providing and/or using DFS services. |
| FSP | The entity that provides a digital financial service to an end user (either a consumer, a business, or a government.) Used interchangably with DFSP (Digital Financial Services Provider). |
| Fulfilled Transfer | A transfer that has been accepted by the Payee DFSP and recorded as complete by the Scheme. Once a transfer has been recorded as complete by the Scheme, the Payer is obliged to honour the transaction when it appears in a Settlement. |
| Fulfillment | In the Interledger protocol, a secret that is the preimage of a SHA-256 hash, used as a condition on a transfer. The preimage is required in the commit message to trigger the transfer to be committed. |
| FX | Foreign Exchange. |
| G2P | A Bulk Payment Secondary Use Case. |
| Governance | The collection of management approaches, decisions, and oversight functions within the Scheme. Scheme Governance can set the tone for everything that occurs in the Scheme. |
| Government Agency | Any Transaction Account Holder which is some kind of government agency or department. |
| Government Payments Acceptance Services | Services which enable governments to collect taxes and fees from individuals and businesses. |
| Gross Settlement | A method of settling financial obligations among DFSPs and a Scheme. Gross Settlement processes each Transaction individually. The details of the Gross Settlement model are specified in Scheme rules. Gross Settlement contrasts to Net Settlement. |
| Hub | A term that may be used for the entity that operates the Platform on behalf of the Scheme. |
| Identifier Service | The way in which the Account Lookup Process works for a given type of Identifier. |
| Identity | A credential of some sort that identifies an end user. National identities are issued by national governments. In some countries a financial identity is issued by financial service providers. |
| Immediate Funds Transfer | A digital payment which is received by the payee almost immediately upon the payer having initiated the transaction. |
| Interchange | A structure within some payments schemes which requires one provider to pay the other provider a fee on certain transactions. Typically used in card schemes to effect payment of a fee from a merchant to a consumer\'s card issuing bank. |
| Interledger | The Interledger protocol is a protocol for transferring monetary value across multiple disconnected payment networks using a choreography of conditional transfers on each network. |
| International Remittance | Making and receiving payments to another person in another country. |
| Interoperability | The ability of an Customer with a Transaction Account with one Participant to exchange a transaction with an Customer who has a Transaction Account with a different Participant. |
| Interoperability Service for Transfers (IST) | A switch. |
| Irrevocable | A transaction that cannot be \"called back\" by the payer; an irrevocable payment, once received by a payee, cannot be taken back by the payer. |
| Know Your Customer (KYC) | Regulatory requirements for a DFSP to establish the Identity and activities of an End User or entity, both before opening a Transaction Account and over time. |
| Ledger | A record kept of transactions. |
| Level One Project | An initiative of the Bill & Melinda Gates Foundation to promote financial inclusion. |
| Liability | A legal obligation of one party to another; required by either national law, payment scheme rules, or specific agreements by providers. Some scheme rules transfer liabilities for a transaction from one provider to another under certain conditions. |
| License | The license granted to an Applicant by the Scheme upon acceptance of the Scheme Participation Agreement, which permits the Participant to participate in the Scheme and to use Scheme Property in accordance with the Rules. |
| Liquidity | The availability of liquid assets to support an obligation. Banks and non-bank providers need liquidity to meet their obligations. Agents need liquidity to meet cash-out transactions by consumers and small merchants. |
| Loans | Means by which end users can borrow money. |
| Merchant | An enterprise which sells goods or services and receives payments for such goods or services. |
| Merchant Acquisition | The process of enabling a merchant for the receipt of electronic payments. |
| Merchant Category Codes | A categorization set by a Scheme to differentiate among enterprise customers. |
| Merchant ID | A type of Payee Identifier. |
| Merchant Service Provider | A provider (bank or non-bank) who supports merchants or other payments acceptors requirements to receive payments from customers. The term \"acquirer\" is used specifically in connection with acceptance of card payments transactions. |
| Merchant-Initiated Purchase | A Use Case defined in the API Specifications document. |
| Merchant-Initiated Purchase via POS/OTP | A Use Case defined in the API Specifications document. |
| Merchant-Initiated Purchase via QR | A Use Case defined in the API Specifications document. |
| Microfinance Institution (MFI) | An entity that offers financial services to Low Income populations. Almost all MFIs give loans to their members, and many offer insurance, deposit and other services. MFI's are considered DFSPs in a Level One System if they provide Transaction Accounts to their customers. MFI's who are not DFSPs may connect directly to a Level One Platform, through a relationship with a DFSP. Scheme rules will specify how such MFI's may interact with the Platform. |
| Mobile Network Operator (MNO) | An enterprise which sells mobile phone services, including voice and data communication. |
| Money Transfer Operator | A specialized provider of DFS who handles domestic and/or international remittances. |
| MSISDN | Number uniquely identifying a subscription in a mobile phone network. These numbers use the E.164 standard that defines numbering plan for a world-wide public switched telephone network (PSTN). |
| Multilateral Net Settlement | A type of settlement that manages the positions of a group of participants in a scheme. |
| National Identity Document | A credential that identifies an End User. National Identity Documents are issued by national governments. |
| Near Field Communication | A communication technology used within payments to transmit payment data from an NFC equipped mobile phone to a capable terminal. |
| Net Debit Cap | A value that the Platform uses in determining whether a Payer DFSP can send a Request for Transfer, as defined in the Scheme Operating Rules. |
| Net Debit Cap Margin | A value set by a scheme which increases or decreases the Net Debit Cap of a participant. |
| Net Position | A value in a scheme participant\'s ledger, reflecting the net of obligations owed. |
| Net Settlement | A type of settlement that nets the position of a participant in a scheme, reflecting both obligations owed to and from other participants or the scheme. |
| Non-Bank | An entity that is not a chartered bank, but which is providing financial services to end users. The requirements of non-banks to do this, and the limitations of what they can do, are specified by national law. |
| Non-Bank-Led Model | A reference to a system in which non-banks are the providers of digital financial services to end users. Non-banks typically need to meet criteria established by national law and enforced by regulators. |
| Non-repudiation | Ability to prove the authenticity of a transaction, such as by validating a digital signature. |
| Not-for-Loss | A cost-recovery model with an additional set of funds available to cover investment requirement to operate the Platform. |
| Notification | Notice to a payer or payee regarding the status of transfer. |
| Off-Us Payments | Payments made in a multiple-participant system or scheme, where the payer\'s provider is a different entity as the payee\'s provider. |
| On-Us Payments | Payments made in a multiple-participant system or scheme, where the payer\'s provider is the same entity as the payee\'s provider. |
| Online Purchase | A P2B Secondary Use Case. |
| Open API Specification | The Open API for FSP Interoperability specification. |
| Open-Loop | A payment system or scheme designed for multiple providers to participate in. Payment system rules or national law may restrict participation to certain classes of providers. |
| Operating Rules | Rules written by a scheme which bind scheme participants. Sometimes called \"Business Rules\". |
| Operations Risk Management | Tools to manage providers\' risks in operating a DFS system. |
| Operator | An entity that provides and/or manages the Platform of a payments system. |
| Organization | An entity such as a business, charity or government department that uses mobile money as a service; for example, taking bill payments, making bill payments and disbursing salaries. |
| OTP | One-time Passcode. OTP is a credential which by definition can only be used once. It is generated and later validated by the same FSP for automatic approval. The OTP is usually tied to a specific Payer in a Payment. The generated OTP is usually a numeric between 4 and 6 digits. |
| Over The Counter Services | Services provided by agents when one end party does not have an eMoney account: the (remote) payer may pay the eMoney to the agent\'s account, who then pays cash to the non- account holding payee. |
| P2P | A Use Case defined in the API Specifications document. |
| Participant | A provider who is a member of a payment scheme, and subject to that scheme\'s rules. |
| Participant Discretionary Net Debit Cap Margin | A value set by a participant which decreases their Net Debit Cap. |
| Participation Agreement | An agreement entered into between each Participant and a Scheme. |
| Participation Fees | Fees for participation in a payment scheme (sometimes called membership fees). |
| Parties Query | An API Call to the Scheme Directory Service by which a Payer DFSP requests the identifier of the DFSP to which a payee identifier is registered. |
| Parties Query Response | The response from the Scheme Directory Service to a Parties Query. |
| Partner Bank | Financial institution supporting the FSP and giving it access to the local banking ecosystem. |
| Party | An entity which is using Scheme Services directly or indirectly. |
| Party Identifier | An item of information which uniquely identifies an Customer in an Interoperability implementation. |
| Party Identifier Type | An enumeration which distinguishes different types of Party Identifier. The full range of Party Identifier Types is given in the Open API Specification; the subset of Party Identifier Types supported by any given Schema are given in its Operating Rules. |
| Payee | The recipient of electronic funds in a payment transaction. |
| Payee DFSP | The role of a Participant who receives a Transfer on behalf of its customer Payee. |
| Payer | The payer of electronic funds in a payment transaction. |
| Payer DFSP | The Participant who sends a Transfer. |
| Payment | An exchange of funds, credentials, and other necessary information to complete obligation between End Users. A Transfer is a Payment. |
| Payment Device | Payment device is the abstract notion of an electronic device, other than the Payer's own device, that is capable of letting a Payer accept a transaction through the use of a credential (some kind of OTP).Examples of (Payment) Devices are ATM and POS. |
| Payment System | A broad term to describe the overall system, including the Scheme, Scheme Services, and Scheme Participants. |
| Payment System Operator | The entity that operates a payment system or scheme. |
| Payments Service Provider (PSP) | A term used in two ways: generally, as any company involved in the provision of payments services (including DFSPs); or for a provider that offers branded products or services to End Users, including merchants. PSPs may connect directly to a Level One Platform, through a relationship with a DFSP. Scheme rules will specify how PSPs may interact with the Platform. |
| Personal Information | Information related to any individual person, including Customers or employees of the Scheme or of a Participant from which the individual may be identified or recognized regardless of the form of such information. |
| Platform | The set of operational capabilities, often including a Switch, that implement the exchange of Payments in a Level One aligned interoperable payment system. |
| Platform | A term used to describe the software or service used by a provider, a scheme, or a switch to manage end user accounts and to send and receive payment transactions. |
| Pooled Settlement Account | A bank account at the Bank, which is jointly owned by scheme participants. |
| Position Ledger | A ledger kept by the platform which records Provisional Settlement Entries and Final Settlement Entries for a Participant in a given Currency. |
| Posting | The act of the provider of entering a debit or credit entry into the end user\'s account record. |
| Processing Fees | Fees billed by the Scheme to Participants for Processing done by the Scheme Platform. |
| Processor | An enterprise that manages, on an out-sourced basis, various functions for a DFSP. These functions may include transaction management, customer database management, and risk management. Processors may also do functions on behalf of payments systems, Schemes, or Switches. Processors may connect directly to a Level One Platform, acting on behalf of a DFSP. Scheme rules will specify how Processors may interact with the Platform. |
| Provisional Debit | A record wtihin a scheme Position Ledger of a Transfer Request that has not been fulfilled; recorded only on the Payer DFSP\'s Position Ledger |
| PSP | Payment Service Provider. |
| Pull Payment | A type of Transaction originated by the Payee's DFSP. Direct Debits, checks, and card payments are all Pull Payments. Pull Payments can bounce or fail for insufficient funds unless a separate Authorization is done (e.g., cards). |
| Push Payment | A type of Transaction initiated by the Payer DFSP. This is sometimes called a Credit Transfer. |
| QR Code Purchase | A P2B Secondary Use Case. |
| Quick-Response (QR) Code | A method of encoding and visualizing data in machine-readable form. There are multiple QR models. |
| Quote | A process by which a Payee DFSP acknowledges the validity of the Payee account to accept a transfer, and sets terms (and possibly fees) related to that transfer. |
| Quote Request | A request by a Payer DFSP for data relating to a proposed Transfer. |
| Quote Response | The response of a Payee DFSP to a Request for Quote. |
| Real Time Gross Settlement (RTGS) | A settlement model which settles transfers on an individual, rather than a net, basis. |
| Real Time Retail Payments (RTRP) | Retail Payments that are processed in real time (as initiated). |
| Receive Amount | The amount which is credited to a Payee\'s Transaction Account. |
| Reconciliation | Cross FSP Reconciliation is the process of ensuring that two sets of records, usually the balances of two accounts, are in agreement between FSPs. Reconciliation is used to ensure that the money leaving an account matches the actual money transferred. This is done by making sure the balances match at the end of a particular accounting period. |
| Recourse | Rights given to an end user by law, private operating rules, or specific agreements by providers, allowing end users the ability to do certain things (sometimes revoking a transaction) in certain circumstances. |
| Refund | A transfer which reverses a previous transaction. |
| Regulator | A governmental organization given power through national law to set and enforce standards and practices. Central Banks, Finance and Treasury Departments, Telecommunications Regulators, and Consumer Protection Authorities are all regulators involved in digital financial services. |
| Request for Quote | An API Call that initiates a Transaction in terms of which the Payer DFSP requests the Payee DFSP for information regarding a proposed Transfer. |
| Request for Transfer | A message that is passed from a Payer DFSP through the Platform to a Payee DFSP, that requests that a Transfer be made from the Payer to the Payee. |
| Request to Pay | A message by which a Payee 'requests' Payment from a Payer. A Request to Pay in a Level One System is often used to describe a merchant that requests a Push Payment from an End User. |
| Reserve | Part of a 2-phase transfer operation in which the funds to be transferred are locked (the funds cannot be used for any purpose until either rolled back or committed). This is usually done for a predetermined duration, the expiration of which results in the reservation being rolled back. |
| Retail Payment | A Payment or Transfer between End Users, typically a low value denomination. The term is often used to describe P2P, B2P or P2B Payments. |
| Reversal | The process of reversing a completed transfer. |
| Risk Management | The practices that enterprises do to understand, detect, prevent, and manage various types of risks. Risk management occurs at providers, at payments systems and schemes, at processors, and at many merchants or payments acceptors. |
| Risk-based Approach | A regulatory and/or business management approach that creates different levels of obligation based on the risk of the underlying transaction or customer. |
| Roll back | Roll back means that the electronic funds that were earlier reserved are put back in the original state. The financial transaction is cancelled. The electronic funds are no longer locked for usage. |
| Rules | The practices and standards necessary for the functioning of payment services defined by the Scheme. Rules are sometimes referred to as scheme rules, business rules, or operating rules. |
| Rules Modification | All changes, additions, deletions or other modifications to the Scheme Operating Rules or to any Associated Documents. |
| Saving and Investing | Keeping funds for future needs and financial return. |
| Savings Products | An account at either a bank or non-bank provider, which stores funds with the design of helping end users save money. |
| Scheme | A set of rules, practices, and standards necessary for the functioning of payment services. |
| Secondary Use Case | A subset of a Use Case. Specific Business Rules or Operating Guidelines may apply to Secondary Use Cases. |
| Secure Element | A secure chip on a phone that can be used to store payment data. |
| Security Access Code | A personal identification number (PIN), password/one-time password (OTP), biometric recognition, code or any other device providing a means of certified access to a customer's account for the purposes of, among other things, initiating an electronic fund transfer. |
| Security Incident | (i) Unauthorized access to or disclosure of Personal Information or Transaction Data related to Customers who are eligible to initiate or receive Transfers through the Scheme which has or is reasonably suspected to have occurred; or (ii) a confirmed breach of a Participant\'s networks or systems or their vendor\'s networks or systems that exposes Personal Information or Transaction Data related to the Scheme has or is reasonably expected to have occurred. |
| Send Amount | The amount which a Payer authorizes to be debited from their Transaction Account. |
| Sensitive Consumer Data | Consumer Sensitive Data means any or all information that is used by a consumer to authenticate identity and gain authorization for performing mobile banking services, including but not limited to User ID, Password, Mobile PIN, Transaction PIN. Also includes data relating to religious or other beliefs, sexual orientation, health, race, ethnicity, political views, trades union membership, criminal record. |
| Services | Elements of the scheme platform which delivers interoperability capabilities to scheme participants. |
| Settlement | A process by which Participants settle their obligations to each other and to the Scheme related to the exchange of Transactions as set out in the Settlement Operating Guidelines. |
| Settlement Bank | A bank appointed by the Scheme to be a partner in managing the Settlement and in which each Participant shall have a bank account for the purpose of Settlement. |
| Settlement Bank Account | The bank account held by a Participant at the Settlement Bank or at Bank agreed with the Settlement Bank, that is used for Settlement between the Scheme and the Participant. |
| Settlement Instruction | Means an instruction given to a settlement system by a settlement system participant or by a payment clearing house system operator on behalf of a Central Bank settlement system participant to effect settlement of one or more payment obligations, or to discharge any other obligation of one system participant to another system participant. |
| Settlement Obligation | Means an indebtedness that is owed by one settlement system participant to another as a result of one or more settlement instructions. |
| Settlement Window | A time period between two successive Net Settlements as scheduled in accordance with the Settlement Operating Guidelines. |
| Shared Service | A common set of services that participating DFSPs collaborate to develop and/or use. |
| Smart Phone | A device that combines a mobile phone with a computer. |
| Special Charter Banks | Banks in a country which are permitted to carry out a limited set of functions, as determined by regulation. Special Charter Banks that can only accept deposits and handle Payments are considered DFSPs in a Level One System. |
| Sponsor | An arrangement between an electronic money issuer and a bank, used for payment and collection of interchange fees by the electronic money issuers |
| Standards Body | An organization that creates standards used by providers, payments schemes, and payments systems. |
| Stored Value Account | Account in which funds are kept in a secure, electronic format. May be a bank account or an eMoney account. |
| Suspicious Transaction Report | If a financial institution notes something suspicious about a transaction or activity, it may file a report with the Financial Intelligence Unit that will analyze it and cross check it with other information.The information on an STR varies by jurisdiction. |
| Switch | A processing entity in a payments system that routes a Transaction from one DFSP to another DFSP. A system may operate its own Switch, or this function may be done by one or more third parties. |
| System | A term used to describe the Scheme, services, Platform, and Participants aligned with a Level One Project. |
| Systemic Risk | In payments systems, the risk of collapse of an entire financial system or entire market, as opposed to risk associated with any one individual provider or end user. |
| The Level One Project | An initiative of the Bill & Melinda Gates Foundation, within the Financial Services for the Poor program, that works to support countries or regions building interoperable, low-cost digital financial services systems to bring Low Income persons and merchants into the formal economy. |
| Tiered Acess | A provision set in scheme rules which allows one DFSP to participate in the system under sponsorship of another DFSP. |
| Til Number Purchase |  A P2B Secondary Use Case. |
| Transaction | A set of related API Calls that are exchanged between Participants via the Scheme including a Transfer. |
| Transaction Account |  A bank account or wallet offered a customer by a DFSP. |
| Transaction Account Holder | The customer of a DFSP who holds the Transaction Account provided by that DFSP. |
| Transaction Account Holder Type | A designation used to define whether or not the Transaction Account Holder is a Consumer, a Business, a Government Agency, or a Non-Profit Agency. |
| Transaction Account Type | A designation used to define a Transaction Account as either a Bank Account or an eMoney Wallet. |
| Transaction Cost | The cost to a DFS provider of delivering a digital financial service. This could be for a bundle of services (for example, a \"wallet\") or for individual transactions. |
| Transaction Fees | Fees for processing interoperable transactions set by a scheme. |
| Transfer | Generic term to describe any financial transaction where value is transferred from one account to another. |
| Transfer Amount | The amount the Payer DFSP Transfers to a Payee DFSP using the Scheme. |
| Transfer Request | A request by a Payer DFSP to make a Transfer. |
| Transfer Response | A Payee DFSP\'s response to a Transfer Request. |
| Trust Account | A means of holding funds for the benefit of another party. eMoney Issuers are usually required by law to hold the value of end users\' eMoney accounts at a bank, typically in a Trust Account. This accomplishes the goals of funds isolation and funds safeguarding. |
| Ubiquity | A term used to describe the ability to pay anyone and be paid by anyone. |
| Unbanked | Unbanked people do not have a transaction account. Underbanked people may have a transaction account but do not actively use it. Underserved is a broad term referring to people who are the targets of financial inclusion initiatives. It is also sometimes used to refer to a person who has a transaction account but does not have additional DFS services. |
| Uncovered Losses | Settlement Obligations that are not met by the responsible DFSP and are not discharged using collateral or other mechanisms. |
| Use Case | A term used to describe the purpose of the Payment. Specific Business Rules or Operating Guidelines may apply to Use Cases. |
| User ID | A unique identifier of a user. This may be an MSISDN, bank account, some form of DFSP-provided ID, national ID, and so on. In a transaction, money is generally addressed to a user ID and not directly to an account ID. |
| USSD | A communication technology that is used to send text between a mobile phone and an application program in the network. |
| Value-Added Services | Services or products provided to End Users that End Users will pay to use or access, often used in coordination with Adjacencies. |
| Voucher | A monetary value instrument commonly used to transfer funds to customers (Payees) who do not have an account at the Payer\'s FSP. This could be Payees with no account or account at another FSP. |
| Wallet | A Transaction Account offered to customers by electronic money issuers. |
| Wallet to Bank | A P2P Secondary Use Case. |
| Wallet to Wallet | A P2P Secondary Use Case. |
| Whitelist | A list or register of entities (registered users) that are being provided a particular privilege, service, mobility, access or recognition, especially those that were initially blacklisted. |
| Women's Economic Empowerment (WEE): | Increasing women's access and rights to economic resources through decent work opportunities, property and assets, Financial Inclusion, and Platforms. |

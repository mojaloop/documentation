# Mojaloop Invariants

The following invariants have been established during the course of the platform’s development and based upon the technical requirements inferred from the [Level One Project Principles](https://www.leveloneproject.org/project_guide/level-one-project-design-principles/) ([※a](#a))
These invariants should guide any product and technical design discussions related to the architecture of the platform.

## General Principles

### 1. The primary ([※d](#d)) function of the platform is to clear payments in real-time and facilitate regular settlement, by the end of the value day.
#### Rationale
1. The platform allows participants to clear funds immediately to their customers while keeping the risks and costs associated with this to a minimum
2. The platform supports per-transfer checks on available liquidity where these are required in support of the first objective
3. The system is optimized for critical path
4. Intra-day Automated Settlement; configured by scheme and implementation using recommended settlement models for financial market infrastructure


### 2. The system supports fully automatic straight-through processing.
#### Rationale
1. Straight through processing helps reduce human errors in the transfer process which ultimately reduces costs.
2. The automated nature of straight through processing leads to faster value transfers between end customers.

More information here: [https://www.investopedia.com/terms/s/straightthroughprocessing.asp]()


### 3. The system requires no manual reconciliation as the protocol for interacting with the system guarantees deterministic ([※g](#g)) outcomes.
#### Rationale
1. When a transfer is finalized, there can be no doubt about the status of that transfer (alternatively, it is not finalized and active notice provided to participants)
2. The system guarantees deterministic outcomes for transfers and is accepted by all participants as the final authority on the status of transfers
3. Determinism means individual transfers are traceable, auditable (based on limits, constraints), with final result provided within guaranteed time limit
4. For the avoidance of doubt, batch transfers are processed line-by-line with potentially differing deterministic outcomes for each


### 4. Transaction setup logic, which is use case-specific, is separated from the policy-free transfer of money.
#### Rationale
1. Transaction details and business rules should be captured and applied between counterparties prior to the quoting phase and is out of scope for Mojaloop.
2. The agreement phase establishes a signed use-case specific transaction object which incorporates all transaction-specific details.
3. The transfer phase orchestrates the transfer of retail value between institutions for the benefit of the counterparties (i.e only system limit checks are applied) and without reference to transaction details.
4. No additional transaction-specific processing during the transfer phase.


### 5. The system doesn’t parse or act on end-to-end transaction details; transfer messages contain only the values required to complete clearing and settlement.
#### Rationale
1. Checks & validations during the transfer step are only for conformance to scheme rules, limit checks, signature authentication, and validation of payment condition and fulfillment.
2. Transfers that are committed for settlement are final and are guaranteed to settle under the scheme rules.


### 6. Credit-push transfer semantics are reduced to their simplest form and standardized for all transaction types.
#### Rationale
TODO: Explain rationale


### 7. Internet-based API service hub is not a “message switch.”
#### Rationale
1. The service hub provides real-time API services for participants to support retail credit-push instant transfers
    1.  API services such as ID-to-participant look-up, transaction agreement between participants, submission of prepared transfers, and submission of fulfillment advice.
2. Auxiliary API services for participants are provided to support onboarding, position management, reporting for reconciliation, and other non-realtime functions not associated with transfer processing.
3. All messages are validated for conformance to the API specification; non-conforming messages are actively rejected with a standardized machine-interpretable reason code.


### 8. The system exposes asynchronous interfaces
#### Rationale
1. To maximize system throughput
2. To isolate leaf-node connectivity issues so they don't impact other end-users
3. To enable the hub system to process requests in its own priority order and without holding an active connection-per-transfer
4. To handle numerous concurrent long-running processes through internal batching and load balancing
5. To have a single mechanism for handling requests (Examples are transactions such as bulk or those needing end user input or that span multiple hops).
6. To better support real world networking as issues with connection speed and reliability for one participant should have minimal impact on other participants or system availability more generally

### 9. The transfer API is [idempotent](https://docs.mojaloop.io/api/fspiop/v1.1/api-definition.html#idempotent-services-in-server)
#### Rationale
1. This ensures duplicate requests may be made safely by message originators in conditions of degraded network connectivity.
    1. Duplicate requests are recognized and result in the same outcome (valid duplicates) or are rejected as duplicate (when not allowed by specification) with reference to the original.


### 10. **_Finalized_** Transfer records are held for a scheme-configurable period to support scheme processes such as reconciliation, billing, and for forensic purposes
#### Rationale
1. It is not possible to query the "sub-status" of an in-process Transfer; the API provides a deterministic outcome with active notice provided within the guaranteed service time.


### 11. Transfer records for finalized transfers are held indefinitely in long-term storage to support business analysis by the scheme operator and by participants (through appropriate interfaces)
#### Rationale
1. Availability of Transfer records may lag online process finality to accommodate separation of record-keeping from real-time processing of Transfer requests


### 12. Hub may serve as a proxy for some inter-participant messages (e.g. during the Agreement phase) to simplify interconnection but without parsing, storing (other than to support forwarding), or further processing the messages.
#### Rationale
1. In some messaging flows e.g. party lookup, it may be desirable for participants to have a single point of contact for routing of scheme related messages, even when the messages are not intended for the hub, nor require any inspection or other processing.

## Security ([※j](#j)) and Safety of APIs

### 13. API messages are confidential, tamper-evident, and non-repudiable.
#### Rationale
1. Confidentiality is required to protect the privacy of the participants and their customers.
    1. There are legal requirements in many regulatory domains where Mojaloop is expected to operate and as such, the system must employ best practices to ensure that the privacy of the participants and their customers is protected.
2. Tamper-evident integrity mechanisms are required to ensure that messages cannot be altered in transit.
    1. To ensure the integrity of the overall system, each recipient of a message should be able to independently tell, with a high degree of confidence, that the message was not altered in transit.
    2. Public key cryptography (digital signing) provides the current best known mechanism for tamper-evident messaging
        1. The security of the senders private key is critical.
        2. Scheme rules must be established to clarify the responsibilities for key management and the potential for financial liability upon compromise of a private key.
4. Non-repudiation is required to ensure that the message was sent by the party which purported to send it and that provenance can not be repudiated by the sender.
    1. This is important for determining the liable party during audit and dispute resolution processes.


### 14. API messages are Authenticated upon receipt prior to acceptance or further processing
#### Rationale
1. Authentication gives a degree of confidence that the message was sent by the party which purported to send it.
2. Authentication gives a degree of confidence that the message was not sent by an unauthorized party.


### 15. Authenticated Messages are not acknowledged as accepted until safely recorded to permanent store.
#### Rationale
1. The Mojaloop API assigns semantic meaning to 
2. The Mojaloop API is designed to operate over imperfect network conditions and as such has built in mechanisms for retries. 


### 16. Three levels of communication security to ensure integrity, confidentiality, and non-repudiation of messages between an API server and API client.
1. Secure Connections: mTLS required for all communications between the scheme and authorized participants.
    1. Ensures communications are confidential, between known correspondents, and communications are protected against tampering.
2. Secure Messages: JSON message content is cryptographically signed according to the JWS specification.
    1. Ensures recipients that messages were sent by the party which purported to send them and that provenance can not be repudiated by the sender.
3. Secure Terms of Transfer: Interledger Protocol (ILP) between Payer and Payee participants.
    1. Protects the integrity of the payment condition and its fulfillment.
    2. Limits the time within which a transfer instruction is valid.


### 17. To ensure system is arithmetically consistent, only fixed point arithmetic is used.
1. For the avoidance of doubt, floating point calculations may lose accuracy and must not be used in any financial calculation
2. See [Level One Decimal Type](https://docs.mojaloop.io/documentation/discussions/decimal.html) representation and forms
    1. This specification enables seamless interchange with XML-based financial systems without loss of precision or accuracy

### 18. Performance Requirements
1. Baseline system demonstrated on minimal hardware supports 1,000 FTPS, sustained for one hour, with not more than 1% of transfers exceeding 1 sec through the hub.
2. Lower unit cost to scale than to initially provisioned.


## Operational Characteristics



## Design Decisions
1. NodeJS is the primary execution environment with TypeScript the preferred language for development.
    1. This platform is free open source
    2. Is widely used and actively supported by the world's largest web-based institutions
    3. Has a massive global portfolio of libraries
    4. Utilizes only the ECMAScript family of architecture-neutral languages and libraries known by millions of skilled web programmers

2. Use a micro-service distributed architecture.
    1. [Law of Demeter](https://en.wikipedia.org/wiki/Law_of_Demeter) or Principle of Least Knowledge
    2. [Separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns) secured by inter-module contracts
    3. [Modular architecture](https://en.wikipedia.org/wiki/Modular_programming) enables distributed development in a community environment and improvement of components with minimal disruption to adjacent components

3. [Apache Kafka](https://kafka.apache.org/intro) distributed [Publish–Subscribe](https://en.wikipedia.org/wiki/Publish–subscribe_pattern) for inter-module [Command–Query Separation (CQS)](https://en.wikipedia.org/wiki/Command–query_separation)

4. [Apache Kafka](https://kafka.apache.org/intro) for persistent handling of participant API messages

5. Mojaloop uses APIs based on Open API 3.0
    1. Exposes resources that are mapped to functionality to support the defined API use-cases.
    2. Common practice for web API specification


## Annexure A : Level One Principles Overview
The [Level One Project](https://www.leveloneproject.org) proposes a new low-cost payments system that supports inclusive, interoperable digital payments. The [Level One Project Guide](https://www.leveloneproject.org/project_guide/03-welcome-to-the-2019-guide/) outlines a vision of how an inclusive digital financial services system can work for the benefit of poor people. The underlying design principles of the Guide include:
* A credit push payment model with immediate funds transfer and same day settlement
* Open-loop interoperability between providers
* Adherence to well-defined and adopted international standards
* Adequate system-wide shared fraud and security protection
* Efficient and proportional identity and know-your-customer (KYC) requirements
* Meeting or exceeding the convenience, cost and utility of cash

By utilizing an open, digital approach to transactions, and partnering with organizations across the public and private sectors, the Level One Project aims to provide access to a robust, low-cost shared digital financial services infrastructure, sparking innovation from new and existing participants, reducing risk, and generating substantial value for providers, individuals and economies in developing markets. Additional resources have been created to help governments, NGOs and financial service providers successfully implement these changes.

## Editorial Notes

### ※a
If we don't capture the rationale, the reason why these principles are important, future generations of Mojaloopers will not understand the context that drove the selection of the principles and might happily discard without appreciating the potential impact.

Noted — we will re-open this and provide additional context as suggested.

agreed - that was the intention of the comments I gave (which I am not sure were fully answered with the responses/changes - there wasn't enough of the *why* to make it sufficiently useful to outsiders.

great that we're re-opening. and happy to review again through a product lens (as fundamentally some of these should form the core of our messaging/positioning to adopters)

### ※d
Would add to be the authoritative system of accounting record

covered in #3, is that sufficient?

no, it's a primary function

### ※g
Non-repudiabile? We need to tie back to some of the high level principles

Covered in #10 - security

not actually covered in #10 - and needs to be understood in the context of deterministic behaviour

### ※j
need to explain why necessary to achieve non-repudiation

Added additional description text around general confidentiality, integrity and non-repudiation

Agreed, this is about high throughput concurrency and accuracy not pure speed and latency. And the constraint should be recorded somewhere - it goes something like this- the switch would never allow a participant to exceed their position cap on the collateral made available to the system

The records need to explain the deterministic manner any decisions were arrived and have the accounting records that show both successful, declined transfer request and errors

Necessary for complete record and dispute Management
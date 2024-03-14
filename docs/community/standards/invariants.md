# Mojaloop Invariants

The following invariants have been established during the course of the platform’s development and based upon the technical requirements inferred from the [Level One Project Principles](https://www.leveloneproject.org/project_guide/level-one-project-design-principles/) ([※a](#a)) and applicable industry best practice.
These invariants should guide any product and technical design discussions related to the architecture of the platform.

## General Principles

### 1. The primary ([※d](#d)) function of the platform is to clear payments in real-time and facilitate regular settlement, by the end of the value day.
#### Notes:
1. The platform allows participants to clear funds immediately to their customers while keeping the risks and costs associated with this to a minimum.
2. The platform supports per-transfer checks on available liquidity where these are required in support of the first objective.
3. The hub is optimized for critical path.
4. Intra-day Automated Settlement; configured by scheme and implementation using recommended settlement models for financial market infrastructure.


### 2. The hub supports fully automatic straight-through processing.
#### Notes:
1. Straight through processing helps reduce human errors in the transfer process which ultimately reduces costs.
2. The automated nature of straight through processing leads to faster value transfers between end customers.

More information here: [https://www.investopedia.com/terms/s/straightthroughprocessing.asp]()


### 3. The hub requires no manual reconciliation as the protocol for interacting with the hub guarantees deterministic ([※g](#g)) outcomes.
#### Notes:
1. When a transfer is finalized, there can be no doubt about the status of that transfer (alternatively, it is not finalized and active notice provided to participants).
2. The hub guarantees deterministic outcomes for transfers and is accepted by all participants as the final authority on the status of transfers.
3. Determinism means individual transfers are traceable, auditable (based on limits, constraints), with final result provided within guaranteed time limit.
4. For the avoidance of doubt, batch transfers are processed line-by-line with potentially differing deterministic outcomes for each.


### 4. Transaction setup logic, which is use case-specific, is separated from the policy-free transfer of money.
#### Notes:
1. Transaction details and business rules should be captured and applied between counterparties prior to the quoting phase and is out of scope for Mojaloop.
2. The agreement phase establishes a signed use-case specific transaction object which incorporates all transaction-specific details.
3. The transfer phase orchestrates the transfer of retail value between institutions for the benefit of the counterparties (i.e only system limit checks are applied) and without reference to transaction details.
4. No additional transaction-specific processing during the transfer phase.


### 5. The hub doesn’t parse or act on end-to-end transaction details; transfer messages contain only the values required to complete clearing and settlement.
#### Notes:
1. Checks & validations during the transfer step are only for conformance to scheme rules, limit checks, signature authentication, and validation of payment condition and fulfillment.
2. Transfers that are committed for settlement are final and are guaranteed to settle under the scheme rules.


### 6. Credit-push transfer semantics are reduced to their simplest form and standardized for all transaction types.
#### Notes:
1. Simplifies implementation and participant integration as many transaction types and use-cases can reuse the same underlying value transfer message flow.
2. Abstracts use-case complexity away from the critical path.


### 7. Internet-based API service hub is not a “message switch.”
#### Notes:
1. The service hub provides real-time API services for participants to support retail credit-push instant transfers.
    1.  API services such as ID-to-participant look-up, transaction agreement between participants, submission of prepared transfers, and submission of fulfillment advice.
2. Auxiliary API services for participants are provided to support onboarding, position management, reporting for reconciliation, and other non-realtime functions not associated with transfer processing.
3. All messages are validated for conformance to the API specification; non-conforming messages are actively rejected with a standardized machine-interpretable reason code.


### 8. The hub exposes asynchronous interfaces
#### Notes:
1. To maximize system throughput.
2. To isolate leaf-node connectivity issues so they don't impact other end-users.
3. To enable the hub system to process requests in its own priority order and without holding an active connection-per-transfer.
4. To handle numerous concurrent long-running processes through internal batching and load balancing.
5. To have a single mechanism for handling requests (Examples are transactions such as bulk or those needing end user input or that span multiple hops).
6. To better support real world networking as issues with connection speed and reliability for one participant should have minimal impact on other participants or system availability more generally.

### 9. The transfer API is [idempotent](https://docs.mojaloop.io/api/fspiop/v1.1/api-definition.html#idempotent-services-in-server)
#### Notes:
1. This ensures duplicate requests may be made safely by message originators in conditions of degraded network connectivity.
    1. Duplicate requests are recognized and result in the same outcome (valid duplicates) or are rejected as duplicate (when not allowed by specification) with reference to the original.


### 10. **_Finalized_** Transfer records are held for a scheme-configurable period to support scheme processes such as reconciliation, billing, and for forensic purposes
#### Notes:
1. It is not possible to query the "sub-status" of an in-process Transfer; the API provides a deterministic outcome with active notice provided within the guaranteed service time.


### 11. Transfer records for finalized transfers are held indefinitely in long-term storage to support business analysis by the scheme operator and by participants (through appropriate interfaces)
#### Notes:
1. Availability of Transfer records may lag online process finality to accommodate separation of record-keeping from real-time processing of Transfer requests.


### 12. The hub should do the minimum parsing, storing and processing of messages required to execute the services that it provides to the scheme as a whole.
#### Notes:
1. In some messaging flows e.g. party lookup, it may be desirable for participants to have a single point of contact for routing of scheme related messages, even when the messages are not intended for the hub, nor require any inspection or other processing.


## Security ([※j](#j)) and Safety of APIs

### 13. API messages are confidential, tamper-evident, and non-repudiable.
#### Notes:
1. Confidentiality is required to protect the privacy of the participants and their customers.
    1. There are legal requirements in many regulatory domains where Mojaloop is expected to operate and as such, the hub must employ best practices to ensure that the privacy of the participants and their customers is protected.
2. Tamper-evident integrity mechanisms are required to ensure that messages cannot be altered in transit.
    1. To ensure the integrity of the overall system, each recipient of a message should be able to independently tell, with a high degree of confidence, that the message was not altered in transit.
    2. Public key cryptography (digital signing) provides the current best known mechanism for tamper-evident messaging
        1. The security of the senders private key is critical.
        2. Scheme rules must be established to clarify the responsibilities for key management and the potential for financial liability upon compromise of a private key.
3. Non-repudiation is required to ensure that the message was sent by the party which purported to send it and that provenance can not be repudiated by the sender.
    1. This is important for determining the liable party during audit and dispute resolution processes.


### 14. API messages are Authenticated upon receipt prior to acceptance or further processing
#### Notes:
1. Authentication gives a degree of confidence that the message was sent by the party which purported to send it.
2. Authentication gives a degree of confidence that the message was not sent by an unauthorized party.


### 15. Authenticated Messages are not acknowledged as accepted until safely recorded to permanent store.
#### Notes:
1. The Mojaloop API assigns significant scheme related business meaning to certain HTTP response codes at various points in transaction flows:
    1. Certain HTTP responses, e.g. "202 Accepted", are intended to provide financial guarantees to participants and as such must only be sent once the receiving entity is confident it has made safe, permanent record(s) in support of:
        1. Facilitating system wide recovery to a consistent state after failure(s) in one or more distributed components/entities.
        2. Accurate settlement processes
        3. Audit and dispute resolution processes
    2. For example a "200 OK" from the hub to the payee participant upon receipt of a transfer fulfilment message indicates a guarantee of transaction settlement to the payee pending validation checks.
2. The Mojaloop API is designed to operate safely under imperfect network conditions and as such has built in support for retries and state synchronisation between participants.


### 16. Three levels of communication security to ensure integrity, confidentiality, and non-repudiation of messages between an API server and API client.
#### Notes:
1. Secure Connections: mTLS required for all communications between the scheme and authorized participants.
    1. Ensures communications are confidential, between known correspondents, and communications are protected against tampering.
2. Secure Messages: JSON message content is cryptographically signed according to the JWS specification.
    1. Ensures recipients that messages were sent by the party which purported to send them and that provenance can not be repudiated by the sender.
3. Secure Terms of Transfer: Interledger Protocol (ILP) between Payer and Payee participants.
    1. Protects the integrity of the payment condition and its fulfillment.
    2. Limits the time within which a transfer instruction is valid.


### 17. To ensure system is arithmetically consistent, only fixed point arithmetic is used.
#### Notes:
1. For the avoidance of doubt, floating point calculations may lose accuracy and must not be used in any financial calculation.
2. See [Level One Decimal Type](https://docs.mojaloop.io/documentation/discussions/decimal.html) representation and forms.
    1. This specification enables seamless interchange with XML-based financial systems without loss of precision or accuracy


## Operational Characteristics

### 1. Baseline system demonstrated on minimal hardware supports clearing 1,000 transfers per second, sustained for one hour, with not more than 1% (of transfer stage) taking more than 1 second through the hub.
#### Notes:
1. This measurement includes all necessary hardware and software components with production grade security and data persistence in place.
2. This measurement includes all three transfer stages: discovery, agreement, and transfer.
3. This measurement does not include any participant introduced latency.
4. A one hour period is a reasonable approximation of a demand peak for a national payment system.
5. A lower unit cost to scale than to initially provisioned.
6. 1000 transfers (clearing) per second is a reasonable starting point for a national payment system.
7. 1% of transfers (clearing) taking more than 1 second is a reasonable starting point for a national payment system.
8. Mojaloop schemes should be able to start at a reasonable cost point, for national financial infrastructure, and scale economically as demand grows.


### 2. The hub is highly available and resilient to failures.
#### Notes:
1. Definition of "highly available":
   1. In this instance we define the term "_highly available_" as meaning "_the ability to provide and maintain an acceptable level of service in the face of faults and challenges to normal operation._"
   2. Although schemes may determine their own definition of what constitutes an "_acceptable level of service_", Mojaloop makes certain contributing tradeoff choices:
      1. When fault modes permit, service is degraded across the entire participant population rather than individual participants suffering total outages while others remain serviceable.
2. The hub has no single point of failure; meaning that it continues to operate with minimum degradation of service in the event of a failure of any single component.
   1. Multiple active instances of each component are deployed in a distributed manner behind load balancers.
   2. Each active component instance can handle requests from any client/participant meaning no single participant loses the ability to transact in the event of a failure of any single component.
3. Given appropriate infrastructure to operate upon, the Mojaloop software can be deployed in configurations which deliver 99.999% uptime (five nines) overall.
   1. This includes active:active and active:passive multiple, geographically distributed data center configurations where both services and data are replicated across multiple physical nodes which are expected to fail independently.
      1. Note that it is expected that nodes in replication groups (and/or clusters) will be located in diverse physical locations (racks and/or data centres) with independent power supplies and network interconnects.
4. Should multiple component failures occur which have not been mitigated either in the Mojaloop software, deployment configuration or infrastructure, the Mojaloop API provides mechanisms for each entity in the scheme to recover to a consistent state, with the hub being the ultimate source of truth upon full restoration of service.
5. _Also see further points relating to resistance to data loss in the event of failures._
6. Given that Mojaloop schemes are intended to form parts of national financial infrastructure they must have as close to zero downtime as possible, given reasonable cost constraints.
7. Failures in hardware and software components are to be expected, even in the highest quality components available. Best practice suggests these failures should be anticipated and planned for as much as possible in the design of the hub with a view to minimising loss or degradation of service and/or data.
8. For the avoidance of doubt this means the tradeoffs chosen favour overall service availability and state consistency over performance. I.e:
   1. All participants can continue to transact at a reduced rate rather than some participants being unable to transact at all.
   2. Inconsistencies in state between scheme entities are resolvable post service restoration via the Mojaloop API, with minimal manual reconciliation necessary; the hub being the ultimate source of truth.


### 3. The hub is resistant to loss of data in the event of failures.
#### Notes:
1. Given appropriate infrastructure to operate upon, the Mojaloop software can be deployed in configurations which reliably replicate data across multiple, redundant physical storage nodes prior to processing.
   1. Database engine components which are provided by the Mojaloop deployment mechanisms support the following:
      1. Primary:secondary asynchronous replication
      2. Primary:primary synchronous replication.
      3. Synchronous quorum consensus algorithm based replication.
   2. The replication mechanisms available are dependant on the particular storage layer and database technologies employed.
2. Should multiple component failures occur which have not been mitigated either in the Mojaloop software, deployment configuration or infrastructure, the Mojaloop API provides mechanisms for each entity in the scheme to recover to a consistent state with minimal financial exposure risk.
   1. Transfers become financially binding only when the hub has successfully responded to a transfer fulfilment message from the payee participant. This response is only sent when the hub has persisted the fulfilment message and its outcome to its ledger database.
   2. Expiration timestamps on all financially significant API messages facilitate timely and deterministic failure path outcomes for all participants via automated retry mechanisms.
3. Given that Mojaloop schemes are intended to form parts of national financial infrastructure they must do as much as possible, given reasonable cost constraints, to avoid loss of data in the event of a failure.
4. Failures in hardware and software components are to be expected, even in the highest quality components available. Best practice suggests these failures should be anticipated and planned for in the design of the hub with a view to avoiding data loss.
5. Participants need timely confidence in the status of financial transactions across the scheme in order to minimise exposure risk and deliver excellent customer experiences.


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


5. Mojaloop uses APIs based on Open API 3.0.
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
If we don't capture the Notes, the reason why these principles are important, future generations of Mojaloopers will not understand the context that drove the selection of the principles and might happily discard without appreciating the potential impact.

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

Agreed, this is about high throughput concurrency and accuracy not pure speed and latency. And the constraint should be recorded somewhere - it goes something like this- the hub would never allow a participant to exceed their position cap on the collateral made available to the hub

The records need to explain the deterministic manner any decisions were arrived and have the accounting records that show both successful, declined transfer request and errors

Necessary for complete record and dispute Management
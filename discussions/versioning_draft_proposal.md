---
Authors: Lewis Daly, Matthew De Haast, Samuel Kummary
Proposal Name: Mojaloop Versioning Proposal
Solution Proposal Status: Draft
Created: 26-Feb-2020
Last Updated: 17-Mar-2020
Approved/Rejected Date: N/A
---

# Mojaloop Versioning, A Proposal

_Note: This document is a living draft of a proposal for versioning within Mojaloop. Once the proposal is ready, it will be submitted to the CCB for approval._

## Overview

The aim is to produce a proposal that keeps the versioning Scheme simple to use and clear regarding compatibility issues. However, it needs to include all the details needed for a Mojaloop ecosystem as well.

Goal:
Propose a standard for a new 'Mojaloop Version', which embodies:
1. Helm: Individual Service Versions, Monitoring Component Versions
2. API Versions: FSPIOP API, Hub Operations / Admin API, Settlement API
3. Internal Schema Versions: Database Schema and Internal Messaging Versions

## Versioning Strategies/Background (Literature Review)

How do current systems handle versioning? Give a brief overview of the current space.
* Most best practices follow semantic versioning for APIs, this will be covered more in [#1198](https://github.com/mojaloop/project/issues/1198)

### Demonstrates zero-downtime deployment approaches with Kubernetes [5]

Key observations:
* in order to support rollbacks, the services must be both forward and backwards compatible.
consecutive app versions must be schema compatible
* 'Never deploy any breaking schema changes', separate into multiple deployments instead

For example, start with a PERSON table:
```
PK  ID
    NAME
    ADDRESS_LINE_1
    ADDRESS_LINE_2
    ZIPCODE
    COUNTRY
```

And we want to break this down (normalize) into 2 tables, PERSON and ADDRESS:

```
#person
PK  ID
    NAME

#address
PK  ID
FK  PERSON_ID
    ADDRESS_LINE_1
    ADDRESS_LINE_2
    ZIPCODE
    COUNTRY
```

If this change were made in one migration, 2 different versions of our application won't be compatible. Instead, the schema changes must be broken down:
1. Create ADDRESS table
    * App use the PERSON table data as previously
    * Trigger a copy of data to the ADDRESS table
2. The ADDRESS now becomes the 'source of truth'
    * App now uses the ADDRESS table data
    * Trigger a copy of new added to address to the PERSON table
3. Stop copying data
4. Remove extra columns from PERSON table

This means for any one change of the database schema, multiple application versions will need to be created, and multiple deployments must be made in succession for this change to be made.
* [5] also notes how simple Kubernetes makes deploying such a change
        * rolling upgrade deployments
        * Tip: make sure your health endpoint waits for the migrations to finish!
* Q: so how do we make big changes that touch both the database schema and the API?
        * this seems really hard, and would need a lot of coordination
        * If we don't design it correctly, it could mean that a single schema change could require all DFSPs to be on board
             * This is why I think the API version and Service version should be unrelated. We should be able to
              deploy a new version of a service (which runs a migration), and supports an old API version


### Using a schema registry for Kafka Messages [6]

* [6] suggests some approaches, such as using a schema registry for kafka messages, such as [Apache Arvo](https://docs.confluent.io/current/schema-registry/index.html)
* This adds a certain level of 'strictness' to the messages we produce, and will help enforce versioning
* Adds a separate 'schema registry' component, which ensures messages conform to a given schema. This doesn't really
 help enforce versioning, and leaves the work up to us still, but does give more guarantees about the message formats.

### Backwards and Forwards Compatibility [3], [4]

* "The Robustness principle states that you should be “liberal in what you accept and conservative in what you send
”. In terms of APIs this implies a certain tolerance in consuming services." [3]
* Backwards Compatibility vs Backwards Incompatibility [4]:
    * Generally, additions are considered backwards compatible
    * Removing or changing names is backwards incompatible
    * It's more something to assess on a case-by-case basis, but [Google's API Design Doc](https://cloud.google.com/apis/design/compatibility) helps lay out the cases.

## Mojaloop Ecosystem
When discussing versioning we need to be clear that we are versioning interfaces for various parties.

# Proposal
The following section will outline the versioning proposal.

## A “Mojaloop Version”
A Mojaloop Version **x.y**.z can be defined that can encompass the versions of all the three APIs included (detailed below).
In the version **x.y**.z, ‘x’ indicates the Major version and ‘y’ a minor version, similar to the Mojaloop FSPIOP API versioning standards; ‘z’ represents the ‘hotfix’ version or a version released with the same major, minor version x.y but to keep things simple, there is a need to bundle all the components included in the Mojaloop ecosystem indicating what all items are included there.

In effect we may say Mojaloop version **x.y** includes
1. Mojaloop FSPIOP API
    * Maintained by the CCB (Change Control Board)
    * Uses x.y format
    * Currently version v1.0, v1.1 and v2.0 are in the pipeline
2. Settlement API
    * Maintained by the CCB
    * To use x.y format
    * Currently version v1.1 and v2.0 is in the pipeline
3. Admin / Operations API
    * Maintained by the CCB
    * To use x.y format
    * Can use version v1.0
4. Helm
    * Maintained by the Design Authority
    * Uses x.y.z format
    * PI (Program Increment) + Sprint based versioning.
    > *Note:* _PI + Sprint based versioning_ make sense in the context of the current Mojaloop Program Increments, but will need to be revised at a later date.
    * Bundles compatible versions of individual services together
5. Internal Schemas
    * Maintained by the Design Authority
    * DB Schema x.y
    * Internal messaging Schema (Kafka) x.y

| **Mojaloop** | x.y | | |
|---|---|---|---
|   | Owner/Maintainer | Format | Meaning |
| **APIs** | | | |
| - FSPIOP API | CCB | *x.y* | Major.Minor |
| - Settlement API | CCB | *x.y* | Major.Minor |
| - Admin/Operations API | CCB | *x.y* | Major.Minor |
| Helm | Design Authority  | *x.y.z* | PI.Sprint.Increment |
| **Internal Schemas** | | | |
| - DB Schema | Design Authority | *x.y* | Major.Minor |
| - Internal Messaging | Design Authority | *x.y* | Major.Minor |



For example: Mojaloop 1.0 includes
1. APIs
    * FSPIOP API v1.0
    * Settlements API v1.1
    * Admin API v1.0
2. Helm v9.1.0
    * Individual services' versions
    * Monitoring components versions
3. Internal Schemas
    * DB Schema v1.0
    * Internal messaging version v1.0

| **Mojaloop** | v1.0 | | |
|---|---|---|---
|   | Owner/Maintainer | Version |
| **APIs** | | | |
| - FSPIOP API | CCB | *1.0* |
| - Settlement API | CCB | *1.1* |
| - Admin/Operations API | CCB | *1.0* |
| Helm | Design Authority  | *9.1.0* |
| **Internal Schemas** | | | |
| - DB Schema | Design Authority | *1.0* |
| - Internal Messaging | Design Authority  | *1.0* |

### Advantages

1. The advantage of this strategy is primarily simplicity. A given version say - Mojaloop v1.0 can just be used in
 discussions which then refers to specific versions of the three APIs - FSPIOP, Settlements, Admin APIs, along with the Helm version that is a bundle of the individual services which are compatible with each other and can be deployed together. 
Along with these, the Schema versions for the DB and Internal messaging to communicate whether any changes have been made to these or not since the previously released version.
2. The other advantage, obviously, is that it caters for everyone who may be interested in differing levels of details
, whether high level or detailed. Because of the nature of the major and minor versions, it should be easy for Users and adopters to understand compatibility issues as well.

### Compatibility
As described in [section 3.3 of the API Definition v1.0](https://github.com/mojaloop/mojaloop-specification/blob/master/documents/API%20Definition%20v1.0.md#33-api-versioning), whether or not a version is backwards compatible is
 indicated by the **Major** version. All versions with the same major version must be compatible while those having different major versions, will most likely not be compatible.

_Important Note: Hub operators will likely need to support multiple versions of the FSPIOP API at the same time, in order to cater for different participants as they can't all be expected to upgrade at the same time._

## Breaking down the “Mojaloop Version”
This section aims to break down the above proposed mojaloop version into its constituent parts, and provide support for the above proposed versioning strategy

### APIs

The [Mojaloop Spec](https://github.com/mojaloop/mojaloop-specification/blob/master/documents/API%20Definition%20v1.0.md#33-api-versioning) already outlines many of the decisions made around versioning APIs.

In terms of common best practices, there are many approaches for requesting different versions, including adding in a
 version in the url, but let's not worry about this because the spec already lays this out for us, using the HTML vendor extension: [3.3.4.1 Http Accept Header](https://github.com/mojaloop/mojaloop-specification/blob/master/documents/API%20Definition%20v1.0.md#3341-http-accept-header)

As for version negotiation, the spec also states that in the event of an unsupported version being requested by a
 client, a HTTP status 406 can be returned, along with an error message which describes the supported versions. [3.3.4.3 Non-Acceptable Version Requested by Client](https://github.com/mojaloop/mojaloop-specification/blob/master/documents/API%20Definition%20v1.0.md#3343-non-acceptable-version-requested-by-client)

Another best practice around versioning is specifying to what level clients may request specific apis.
* In a development environment, many APIs will allow specificy up to the BUGFIX version, i.e. vX.X.X
* In production however, this is limited to Major versions only, e.g. v1, v2
* e.g. The Google API Platform supports only major versions, not minor and patch versions
* Given the new features that may become available with v1.1 of the Mojaloop API, we might want to allow participants
 to specify MAJOR and MINOR versions, i.e. vX.X. This practice should be avoided however, since minor versions should be backwards compatible

Participants using the same MAJOR version of the API should be able to interact. Participants on different MAJOR
versions are not able to interact. For example, a participant on API v1.1 can send transfers to another participant on v1.0, but not to a different participant on v2.0.

### Helm
This section deals with how Mojaloop services interact within a given deployment. Here, we attempt to propose questions such as "should an instance of central-ledger:v10.0.1 be able to talk to ml-api-adapter:v10.1.0? How about ml-api-adapter:v11.0.0?"? or "how do we make sure both central-ledger:v10.0.1 and central-ledger:v10.1.0 talk to the database at the same time?"

There are two places where this happens:
1. Where services interact with saved state - MySQL Percona Databases
2. Where services interact with each other - Apache Kakfa and (some) internal APIs

This implies we need to version:
* the database schema
* messages within Apache kafka
    * need to make sure the right services can appropriately read the right messages. E.g. Can mojaloop/ml-api-adapter:v10
.1.0 publish messages to kafka that mojaloop/central-ledger:v10.0.1 can understand?
    * Q: If we decide to make breaking changes to the message format, how can we ensure that messages in the kafka streams
 don't get picked up by the wong services?

### Internal Schemas

#### Database

todo: anything to be said here?

#### Kafka/Messaging
Currently, we use the lime protocol for our kafka message formats: https://limeprotocol.org/

Also refer to the mojaloop/central-services-stream readme for more information about the message format.

The lime protocol provides for a type, field, which supports MIME type declarations. So we could potentially handle messages in a manner similar to the API above (e.g. application/vnd.specific+json). Versioning messages in this manner means that consumers reading these messages would need to be backwards and fowards compatible (consecutive message versions must be schema compatible).
* Q. does it make sense to put the version in the Kafka topic?
    * One example, ml-api-adapter publishes messages to the prepare topic
    * If we add versioning to this, ml-api-adapter:v10.0.0 publishes messages to a prepare_v10.0 topic, and a new instance
     of the ml-api-adapter:v10.1.0 will publish to the prepare_v10.1 topic.
    * subscribers can subscribe to whichever prepare topic they want, or both, depending on their own tolerance to such
      messages
    * This may have some serious performance side effects
* Another potential option would be to allow for a message 'adapter' in the deployment. Say the ml-api-adapter:v10.1.0 is producing messages to a prepare_v10.1 topic, and there is no corresponding central-ledger in the deployment to read such messages, we could have an adapter, which subscribes to prepare_v10.1, reformats them to be backwards compatible, and publishes them to prepare_v10.0 in the old format.

Such an approach would allow for incremental schema changes to the messaging format as services are gradually upgraded.

All in all, I didn't see too much about this subject, so we'll likely need to return later down the line.

## Version Negotiation
todo: @sam Discuss how to deal with version negotiation strategy

## Long Term Support
todo: Discuss how long term support fits into the versioning proposal. I don’t think we want to get into too much detail, but more outline what it might look like

Mention current (lack of) lts support, current PI cadence

## Appendix A: Definitions

* **service**: Mojaloop follows a microservices oriented approach, where a large application is broken down into smaller
 micro services. In this instance, Service refers to a containerized application running as part of a Mojaloop deployment. At the moment, this takes the form of a Docker container running inside of a Kubernetes cluster. e.g. mojaloop/central-ledger is the central-ledger service
* **service version**: The version of the given service. This currently doesn't follow semantic versioning, but may in the
 future e.g. mojaloop/central-ledger:v10.0.1. The current approach is described in more detail in the [standards
 /Versioning doc](https://github.com/mojaloop/documentation/blob/master/contributors-guide/standards/versioning.md).
* **helm**: Helm is an application package manager that runs on top of Kubernetes. It may also be referred to as the
 "deployment". A single helm deployment runs many different services, and MAY run multiple versions of the same service simultaneously. We also refer to the deployment as it's repo, mojaloop/helm interchangeably.
* **helm version**: A helm version is the version of the packaged helm charts, e.g.mojaloop/helm:v1.1.0
* **interface**: An interface is the protocol by which a Mojaloop switch interacts with the outside world. This includes
 interactions with Participants (DFSPs) who transfer funds through the switch, hub operators running a Mojaloop switch, and admins performing administrative functions.
* **api**: Application Programming Interface - in most cases referring to the FSPIOP-API a.k.a. Open API for FSP
 Interoperability defined [here](https://github.com/mojaloop/mojaloop-specification).
* **api version**: The Version of the FSPIOP-API, e.g. FSPIOP-API v1. For the purposes of this document, it refers to the
 contract between a Mojaloop Switch and Participants (DFSPs) who implement the FSPIOP-API

## References

[1] LTS versioning within nodejs. This is a great example of an LTS strategy, and how to clearly communicate such a strategy.
[2] Semantic Versioning Reference
[3] https://www.ben-morris.com/rest-apis-dont-need-a-versioning-strategy-they-need-a-change-strategy/
[4] https://cloud.google.com/apis/design/compatibility
[5] Nicolas Frankel - Zero-downtime deployment with Kubernetes, Spring Boot and Flyway
[6] Stackoverflow - Kafka Topic Message Versioning


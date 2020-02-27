# Versioning Draft Proposal

>_Note:_ This document is a living draft of a proposal for versioning within Mojaloop. Once the proposal is ready, it will be submitted to the CCB for approval.

__Goal:__ 
- Propose a standard a new 'Mojaloop Version', which embodies:
  1. API Versions: FSPIOP API, Hub Operations / Admin API, Settlement API
  2. Internal Schema Versions: Database Schema and Internal Messaging Versions
  3. Helm: Individual Service Versions, Monitoring Component Versions 

This is covered in more detail in [Versioning Proposal Scope](./Scope-for-Versioning-Proposal.md)


## Definitions:

- _service_: Mojaloop follows a microservices oriented approach, where a large application is broken down into smaller _micro services_. In this instance, Service refers to a containerized application running as part of a Mojaloop deployment. At the moment, this takes the form of a Docker container running inside of a Kubernetes cluster. e.g. `mojaloop/central-ledger` is the _central-ledger_ service
- _service version_: The version of the given service. This currently doesn't follow semantic versioning, but may in the future e.g. `mojaloop/central-ledger:v10.0.1`. The current approach is described in more detail in the [standards/Versioning doc](https://github.com/mojaloop/documentation/blob/master/contributors-guide/standards/versioning.md).
- _helm_: Helm is an application package manager that runs on top of Kubernetes. It may also be refered to as the "deployment". A single helm deployment runs many different services, and MAY run multiple versions of the same service simultaneously. We also refer to the deployment as it's repo, `mojaloop/helm` interchangably.
- _helm version_: A helm version is the version of the packaged helm charts, e.g.`mojaloop/helm:v1.1.0`
- _interface_: An interface is the protocol by which a Mojaloop switch interacts with the outside world. This includes interactions with Participants (DFSPs) who transfer funds through the switch, hub operators running a Mojaloop switch, and admins performing administrative functions.
- _api_: Application Programming Interface - in most cases referring to the `FSPIOP-API` a.k.a. Open API for FSP Interoperability defined [here](https://github.com/mojaloop/mojaloop-specification).
- _api version_: The Version of the `FSPIOP-API`, e.g. `FSPIOP-API v1`. For the purposes of this document, it refers to the contract between a Mojaloop Switch and Participants (DFSPs) who implement the FSPIOP-API


## 1. [1197](https://github.com/mojaloop/project/issues/1197) Versioning Best Practices:

> As a switch implementer, I want to research the best practices for managing and implementing versioning, so that we have a clear understanding of well tried approaches.

### General:

- Most best practices follow semantic versioning for APIs, this will be covered more in [#1198](https://github.com/mojaloop/project/issues/1198)

#### Backwards Compatibility:

> Hub operators will likely need to support multiple versions of the API at the same time, in order to cater for different participants as they can't all be expected to upgrade at the same time.

- "The Robustness principle, states that you should be “liberal in what you accept and conservative in what you send”. In terms of APIs this implies a certain tolerance in consuming services." [3]

- Backwards Compatibility vs Backwards Incompatiblity [4]:
  - Generally, additions are considered backwards compatible
  - Removing or changing names is backwards incompatible
  - It's more something to assess on a case-by-case basis, but [Google's API Design Doc](https://cloud.google.com/apis/design/compatibility) helps lay out the cases.


### Versioning our APIs

The [Mojaloop Spec](https://github.com/mojaloop/mojaloop-specification/blob/master/documents/API%20Definition%20v1.0.md#33-api-versioning) already outlines many of the decisions made around versioning APIs.

In terms of common best practices, there are many approaches for requesting different versions, including adding in a version in the url, but let's not worry about this because the spec already lays this out for us, using the HTML vendor extension: [3.3.4.1 Http Accept Header](https://github.com/mojaloop/mojaloop-specification/blob/master/documents/API%20Definition%20v1.0.md#3341-http-accept-header)

As for version negotiation, the spec also states that in the event of an unsupported version being requested by a client, a HTTP status 406 can be returned, along with an error message which describes the supported versions. [3.3.4.3 Non-Acceptable Version Requested by Client](https://github.com/mojaloop/mojaloop-specification/blob/master/documents/API%20Definition%20v1.0.md#3343-non-acceptable-version-requested-by-client)

Another best practice around versioning is specifying to what level clients may request specific apis.
  - In a development environment, many APIs will allow specificy up to the BUGFIX version, i.e. vX.X.X
  - In production however, this is limited to Major versions only, e.g. v1, v2
  - e.g. The Google API Platform supports only major versions, not minor and patch versions
  - Given the new features that may become available with v1.1 of the Mojaloop API, we might want to allow participants to specify MAJOR and MINOR versions, i.e. vX.X. This practice should be avoided however, since minor versions should be backwards compatible

Participants talking on on the same MAJOR version of the API should be able to interact. Participants on different MAJOR versions are not able to interact. For example, a participant on API v1.1 can send transfers to another participant on v1.0, but not to a different participant on v2.0.


### Managing Switch Versions

> This is a big open question at the moment. Once we have a better idea of the scope of this versioning proposal, from [#1198](https://github.com/mojaloop/project/issues/1198)

_2 high level approaches:_
1. __For any given API version, we run one version the service set at a time, which can support multiple versions of the api.__

e.g.:
- `mojaloop/helm` release v1.0.0 MAY run `mojaloop/central-ledger:v10.0.0`, which supports `FSPIOP-API v1` only
- A future release of the helm charts: `mojaloop/helm` release v1.1.0 runs `mojaloop/central-ledger:v10.1.0`, which supports `FSPIOP-API v1` and `FSPIOP-API v1.1`

This approach:
- pushes the version negotiation to the application layer (instead of the transport layer, such as nginx routing based on the `Accept` header)
- may assume database migrations have been run in an intermediate helm relase, e.g. `mojaloop/helm:v1.0.1`, to prepare for the next minor release


2. __API versions are closely linked to service versions, such that to support _n_ versions of the API, _n_ service versions must also be running.__

e.g.:
- `mojaloop/helm:v1.0.0` runs only 1 version of the central-ledger: `mojaloop/central-ledger:v10.0.0`, and supports `FSPIOP-API v1` only.
- A new deployment of `mojaloop/helm:v1.1.0` is made to support a new MINOR api version. This helm version runs 2 versions of the central-ledger service: `mojaloop/central-ledger:v10.0.0` and `mojaloop/central-ledger:v10.1.0`, alongside one another. 
- routing between the different APIs is done at the transport layer, e.g. with an nginx router sending an Accept header of: `application/vnd.interoperability.participants+json;version=1` to `mojaloop/central-ledger:v10.0.0`, and an Accept header of: `application/vnd.interoperability.participants+json;version=1.1` to `mojaloop/central-ledger:v10.1.0` accordingly


### Version Management Across Mojaloop Services

This section deals with how Mojaloop services interact within a given deployment. Here, we attempt to propose questions such as "should an instance of central-ledger:v10.0.1 be able to talk to ml-api-adapter:v10.1.0? How about ml-api-adapter:v11.0.0?"? or "how do we make sure both central-ledger:v10.0.1 and central-ledger:v10.1.0 talk to the database at the same time?"

There are two places where this happens:
1. Where services interact with saved state - MySQL Percona Databases
2. Where services interact with each other - Apache Kakfa and (some) internal APIs

This implies we need to version:
- the database schema
- messages within Apache kafka
  - need to make sure the right services can appropriately read the right messages. E.g. Can `mojaloop/ml-api-adapter:v10.1.0` publish messages to kafka that `mojaloop/central-ledger:v10.0.1` can understand?
  - Q: If we decide to make breaking changes to the message format, how can we ensure that messages in the kafka streams don't get picked up by the wong services?

### Versioning the Database

[5] demonstrates zero-downtime deployment approaches with Kubernetes 

Key observations:
- in order to support rollbacks, the services must be both forward and backwards compatible.
  - consecutive app versions must be schema compatible
- 'Never deploy any breaking schema changes', separate into multiple deployments instead

For example, start with a `PERSON` table:
```
PK  ID
    NAME
    ADDRESS_LINE_1
    ADDRESS_LINE_2
    ZIPCODE
    COUNTRY
```

And we want to break this down (normalize) into 2 tables, `PERSON` and `ADDRESS`:
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

If this change were made in one migration, 2 different versions of our application won't be able compatible. Instead, the schema changes must be broken down:

1. Create `ADDRESS` table
  - App use the `PERSON` table data as previously
  - Trigger a copy of data to the `ADDRESS` table
2. The `ADDRESS` now becomes the 'source of truth'
  - App now uses the `ADDRESS` table data
  - Trigger a copy of new added to address to the `PERSON` table
3. Stop copying data
4. Remove extra columns from `PERSON` table


This means for any one change of the database schema, multiple application versions will need to be created, and multiple deployments must be made in succession for this change to be made.

- [5] also notes how simple Kubernetes makes deploying such a change
  - rolling upgrade deployments
  - Tip: make sure your health endpoint waits for the migrations to finish!

- Q: so how do we make big changes that touch both the database schema and the API?
  - this seems really hard, and would need a lot of coordination
  - If we don't design it correctly, it could mean that a single schema change could require all DFSPs to be on board
    - This is why I think the API version and Service version should be unrelated. We should be able to deploy a new version of a service (which runs a migration), and supports an old API version

## Versioning in Kafka Messages

Currently, we use the lime protocol for our kafka message formats: https://limeprotocol.org/

Also refer to the [mojaloop/central-services-stream readme](https://github.com/mojaloop/central-services-stream/blob/master/src/kafka/protocol/readme.md) for more information about the message format. 

The lime protocol provides for a `type`, field, which supports MIME type declarations. So we could potentially handle messages in a manner similar to the API above (e.g. `application/vnd.specific+json`). Versioning messages in this manner means that consumers reading these messages would need to be backwards and fowards compatible (consecutive message versions must be schema compatible).


- Q. does it make sense to put the `version` in the Kafka topic?
  - One example, ml-api-adapter publishes messages to the `prepare` topic
  - If we add versioning to this, `ml-api-adapter:v10.0.0` publishes messages to a `prepare_v10.0` topic, and a new instance of the `ml-api-adapter:v10.1.0` will publish to the `prepare_v10.1` topic.
  - subscribers can subscribe to whichever prepare topic they want, or both, depending on their own tolerance to such messages
  - This may have some serious performance side effects


- Another potential option would be to allow for a message _'adapter'_ in the deployment. Say the `ml-api-adapter:v10.1.0` is producing messages to a `prepare_v10.1` topic, and there is no corresponding `central-ledger` in the deployment to read such messages, we could have an _adapter_, which subcscribes to `prepare_v10.1`, reformats them to be backwards compatible, and publishes them to `prepare_v10.0` in the old format.

Such an approach would allow for incremental schema changes to the messaging format as services are gradually upgraded.

All in all, I didn't see too much about this subject, so we'll likely need to return later down the line.

[6] suggests some approaches, such as using a schema registry for kafka messages, such as [Apache Arvo](https://docs.confluent.io/current/schema-registry/index.html)
- This adds a certain level of 'strictness' to the messages we produce, and will help enforce versioning
- Adds a separate 'schema registry' component, which ensures messages conform to a given schema. This doesn't really help enforce versioning, and leaves the work up to us still, but does give more guarantees about the message formats.

## References

- [1] LTS versioning within [nodejs](https://nodejs.org/en/about/releases/). This is a great example of an LTS strategy, and how to clearly communicate such a strategy.
- [2] [Semantic Versioning Reference](https://semver.org/)
- [3] https://www.ben-morris.com/rest-apis-dont-need-a-versioning-strategy-they-need-a-change-strategy/
- [4] https://cloud.google.com/apis/design/compatibility
- [5] [Nicolas Frankel - Zero-downtime deployment with Kubernetes, Spring Boot and Flyway](https://www.youtube.com/watch?v=RvCnrBZ0DPY)
- [6] [Stackoverflow - Kafka Topic Message Versioning](https://stackoverflow.com/questions/52387013/kafka-topic-message-versioning)
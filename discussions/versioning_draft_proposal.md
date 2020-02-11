# Versioning Draft Proposal

>_Note:_ This document is a living draft of a proposal for versioning within Mojaloop. Once the proposal is ready, it will be submitted to the CCB for approval.

__Goal:__ 
- Propose a standard for handling versions across Mojaloop, including:
  1. API versions (FSPIOP API, Hub Operations / Admin API, Settlement API)
  2. Switch Versions, i.e. mojaloop/helm release versions
  3. Internal: version management across microservices within Mojaloop


## 1. [1197](https://github.com/mojaloop/project/issues/1197) Best Practices:

### Definitions:

- _service_: Service refers to a docker container that runs inside a pod on a Kubernetes cluster. e.g. `mojaloop/central-ledger` is the central-ledger service
- _service version_: The version of the given service. This currently doesn't follow semantic versioning, but may in the future e.g. `mojaloop/central-ledger:v10.0.1`
- _helm_: Helm is an application package manager that runs on top of Kubernetes. It may also be refered to as the "deployment". A single helm deployment runs many different services. In this case, we can refer to `mojaloop/helm` interchangably.
- _helm version_: A helm version is the version of the packaged helm charts, e.g.`mojaloop/helm:v1.1.0`
- _api_: Application Programming Interface - in most cases referring to the `FSPIOP-API` a.k.a. Open API for FSP Interoperability  defined [here](https://github.com/mojaloop/mojaloop-specification).
- _api version_: The Version of the `FSPIOP-API`, e.g. `FSPIOP-API v1`. For the purposes of this document, it refers to the contract between a Mojaloop Switch and Providers (DFSPs) who implement the FSPIOP-API


### Versioning our APIs

The Mojaloop Spec for FSPIOP... already supports... versioning etc. 
[todo - talk about how API Versioning is meant to work for us]

### Managing Switch Versions

_2 high level approaches:_
1. For any given API version, we run one version the service set at a time, which can support multiple versions of the api.

e.g.:
- `mojaloop/helm` release v1.0.0 MAY run `mojaloop/central-ledger:v10.0.0`, which supports `FSPIOP-API v1` only
- A future release of the helm charts: `mojaloop/helm` release v1.1.0 runs `mojaloop/central-ledger:v10.1.0`, which supports `FSPIOP-API v1` and `FSPIOP-API v1.1`

This approach:
- pushes the version negotiation to the application layer (instead of the transport layer, such as nginx routing based on the `Accept` header)
- makes zero-downtime deployments difficult, since we haven't really considered the case of running 2 separate instances 
- may assume database migrations have been run in an intermediate helm relase, e.g. `mojaloop/helm:v1.0.1`, to prepare for the next minor release


2. API versions are closely linked to service versions, such that to support _n_ versions of the API, _n_ service versions must also be running.

e.g.:
- `mojaloop/helm:v1.0.0` runs only 1 version of the central-ledger: `mojaloop/central-ledger:v10.0.0`, and supports `FSPIOP-API v1` only.
- A new deployment of `mojaloop/helm:v1.1.0` is made to support a new MINOR api version. This helm version runs 2 versions of the central-ledger service: `mojaloop/central-ledger:v10.0.0` and `mojaloop/central-ledger:v10.1.0`, alongside one another. 
- routing between the different APIs is done at the transport layer, e.g. with an nginx router sending an Accept header of: `application/vnd.interoperability.participants+json;version=1` to `mojaloop/central-ledger:v10.0.0`, and an Accept header of: `application/vnd.interoperability.participants+json;version=1.1` to `mojaloop/central-ledger:v10.1.0` accordingly

### Version Management Across Mojaloop Services

This section deals with how Mojaloop services interact within a given deployment. Here, we attempt to propose questions such as "should an instance of central-ledger:v10.0.1 be able to talk to ml-api-adapter:v10.1.0? How about ml-api-adapter:v11.0.0?"? or "how do we make sure both central-ledger:v10.0.1 and central-ledger:v10.1.0 talk to the database at the same time?"

There are two places where this happens:
1. Where services interact with eachother - Apache Kakfa and (some) internal APIs
2. Where services interact with saved state - MySQL Percona Databases

This implies we need to version:
- messages within Apache kafka
  - need to make sure the right services can appropriately read
  - Q: how do we connection drain properly?

- the database schema



## References

- LTS versioning within [nodejs](https://nodejs.org/en/about/releases/). This is a great example of an LTS strategy, and how to clearly communicate such a strategy.

- [Semantic Versioning Reference](https://semver.org/)



## Reading [todo: reformat into something more useful before PR]


https://cloud.google.com/apis/design/versioning

- lays out versioning apis pretty plainly
- Google use the approach of putting the version in the url, eg: `https://api.resource.com/v1/users`

- API versioning applies at the API interface level, not the API Service Level
  - API Interface: the definition of the API
  - API Service: The implementation of one or more API Interfaces

- example: Google API Platform supports only major versions, not minor and patch versions

- Backwards Compatibility vs Backwards Incompatiblity:
  - Generally, additions are considered backwards compatible
  - Removing or changing names is backwards incompatible


https://cloud.google.com/apis/design/compatibility

- overview of breaking and non-breaking changes with respect to APIs
- "The general aim is that clients should not be broken by a service updating to a new minor version or patch"
- When adding fields to a response message, keep old contents, even if that introduces redundancy
- "Clients will often depend on API behavior and semantics, even when such behavior is not explicitly supported or documented. "
  - this is a good point, and something we need to be mindful of. 
  - That said, I don't think anything exposed in the API isn't/shouldn't be in the API Spec anyway

- Q: Is there a need to version sub-resources separately from the main API? Hopefully not...


https://nordicapis.com/introduction-to-api-versioning-best-practices/

- We have been assuming semantic (and that is what the API spec caters for, but there are other options):
  - "Twilio uses a timestamp in the URL, instead of a version number. Salesforce opts for vXX.X in the middle of the URL. Facebook goes for prepending the version to the endpoint path. The version is actually optional, with unspecified version requests being routed to the oldest version available."
  - Q: How much granulatity should we provide? And should that be provided on all APIs? Perhaps we want a different level of granularity for different APIs

https://dzone.com/articles/best-practice-api-versioning-for-http-rest-interfa


- Clients able to support more than 1 version can send 
  - e.g. `Accept: application/vnd.foobar.v2.4+json, application/vnd.foobar.v1.3+json; q=0.1`


https://www.ben-morris.com/rest-apis-dont-need-a-versioning-strategy-they-need-a-change-strategy/

- Change Strategy, Not versioning Strategy
  - What does this mean? And how do we apply it?
- Q: Do we want 1 service that implements multiple versions of the API? Or do we want multiple services that operate together, and put them behind some API gateway that handles which requests go to which services?

- "Robustness principle, states that you should be “liberal in what you accept and conservative in what you send”. In terms of APIs this implies a certain tolerance in consuming services."


https://itnext.io/support-multiple-versions-of-a-service-in-kubernetes-using-helm-ce26adcb516d

- support multiple api versions in helm
e.g.:
```yaml
#values.yml: Default values for ab-test-service.
app:
 name: ab-test-service-demo

versions:
 - name: stable
   image:
     repository: service-stable
     tag: stable
 - name: next-gen
   image:
     repository: service-nextgen
     tag: latest

replicaCount: 1
```

- this looks pretty feasible, and I suppose a full migration path would look like running the services (with corresponding helm releases:)
  - 1: [stable] API v1
  - 2: [stable, next-gen], API v1 + v2
  - 3: [next-gen], API v2






## Random Thoughts

- POC for this work?
  - perform a live upgrade during a load test and show that nothing went down
  - upgrading messages with kafka internally? How do we manage this?
  - including db migrations, start v1, start v2, drain v1, stop v1...
  - keep simulators going the whole time on old version? Or add newer simulators with newer versions?
  - how can we demonstrate new features being enabled in simulators?

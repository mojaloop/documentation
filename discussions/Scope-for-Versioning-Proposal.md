# Scope for Versioning, A Proposal

## Overview:

This is a versioning proposal for Mojaloop that intends to address the Scope of the discussion as part of an initial iteration and then build on it.

The goal is to come up with a proposal that keeps the versioning Scheme simple to use and clear regarding compatibility issues. However, it also needs to include all the details needed for a Mojaloop  Mojaloop eco-system.


#### Proposal
A Mojaloop Version x.y can be defined that can encompass the versions of all the three APIs included (detailed below).

In the version x.y, ‘x’ indicates the Major version and ‘y’ a minor version, similar to the Mojaloop FSPIOP API versioning standards.

To keep things simple, there is a need to bundle all the components included in the Mojaloop eco-system indicating what all items are included there.

In effect we may say Mojaloop version x.y includes
1. Mojaloop FSPIOP API
1.1 Maintained by CCB
1.2 Uses x.y format
1.3 Currently version v1.0, v1.1 and v2.0 are in the pipeline
2. Settlement API
2.1 Maintained by Settlements stream, core-team
2.2 To use x.y format 
2.3 Currently version v1.1 and v2.0 is in the pipeline
3. Admin / Operations API
3.1 Maintained by the core-team
3.2 To use x.y format
3.3 Can use version v1.0
4. Helm
4.1 Maintained by Core-team
4.2 Uses x.y.z format
4.3 PI, Sprint based versioning.
4.4 Bundles compatible versions of individual services together
5. Internal Schemas
5.1 DB Schema x.y
5.2 Internal messaging Schema (Kafka) x.y

**For example**:
Mojaloop **1.0** includes
1. APIs
1.1 FSPIOP 1.0
1.2 Settlement 1.1
1.3 Admin 1.0
2. Internal schemas
2.1 DB Schema 1.0
2.2 Internal messaging version 1.0
3. Helm v9.1.0
3.1 Individual services
3.2 Monitoring components versions

#### Advantages:
1. The advantage of this strategy is primarily simplicity. A given version say - Mojaloop v1.0 can just be used in discussions which then refers to specific versions of the three APIs - FSPIOP, Settlements, Admin APIs, along with the Helm version that is a bundle of the individual services which are compatible with each other and can be deployed together. Along with these, the Schema versions for the DB and Internal messaging to communicate whether any changes have been made to these or not since the previously released version.

2. The other advantage, obviously, is that it caters for everyone who may be interested in differing levels of details, whether high level or detailed. Because of the nature of how the major and minor versions, it should be easy for Users and adopters to understand compatibility issues as well.

#### Compatibility:
As described in the section 3.3 of the API Definition v1.0, https://github.com/mojaloop/mojaloop-specification/blob/master/documents/API%20Definition%20v1.0.md#33-api-versioning , whether a version is backwards compatible or not, is indicated by the Major version. All versions with the same major version must be compatible while those having different major versions, will most likely not be compatible.

#### Helm version:
1. Uses x.y.z format
2. Consists of individual service versions
3. Abstracts individual services and makes it manageable

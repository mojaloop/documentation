# Release management

Release management handles the processes around managing, planning, scheduling, and controlling a software change through deployment and testing across various environments.

::: tip NOTE
The processes described in this section represent best practices and act as recommendations for organizations fulfilling a Hub Operator role.
:::

::: tip NOTE
This section references a "Mojaloop Support team": a team dedicated to running Support services for the technical operations of a Mojaloop Hub. Note that this team can be either an insourced or an outsourced unit, depending on the level of expertise or capacity within your organization. If you decide to outsource Support functions, there are organizations within the Mojaloop community that provide different levels of Support as a service. (For more information and referrals, contact the Mojaloop Foundation.)
:::

## Release components and environments

When accepting new releases from Mojaloop Open Source for Switch services and other components that are needed, the releases are taken through a series of testing activities in progressively higher environments, starting with development/QA environments and ending with production-level testing.

The recommended environment setup comprises of multiple environments all serving different purposes, as depicted in the diagram below.

<img src="../../.vuepress/public/release_mgmt.png" width="80%" height="80%" />

A Hub-specific implementation of Mojaloop is built on a number of service components (Mojaloop OSS, extensions or other components, potential customizations), and releases will include new features, enhancements, or bug fixes of all of these components. 

<img src="../../.vuepress/public/release_service_components.png" width="70%" height="70%" />

## Development and testing (Definition of Done)

Standard development and QA practices – followed by the Mojaloop Development/Product Delivery team – include the following as part of the Definition of Done. The recommendation is for the Hub Operator to adopt a similar strategy. 

* Unit tests developed for every piece of code written.
* Code, unit tests, and documentation have been peer reviewed.  
* Integration tests have been developed and executed.
* Full regression tests have been executed successfully on commit (merge to master branch). 
* Release notes have been created with the following details: 
    * Description of changes 
    * List of changed components/services
    * List of user stories and bugs in the release
    * Highlight of any fundamental (breaking) changes impacting any functionality, API solution, or system architecture
* Deployment runbook created, with deployment and rollback instructions including environment variables, database update scripts, and deployment prerequisites.
* Maintenance of regression test definitions, baseline test results from Mojaloop OSS, and Scheme-specific validation criteria (tests) added on top of them.
* Maintenance of a knowledge base of any new or significant changes to functionality, products, architecture, and so on, regarding Mojaloop OSS and other components, as well as customizations done for the Scheme. The knowledge base acts as the basis of knowledge handover to the Operations team. This handover includes full review of the deployment runbook and other release artifacts, such as release packages and database scripts, which will help the Operations team greatly in day-to-day operations, validation, debugging of issues, and maintenance.

## Mojaloop releases

The standard practice for Mojaloop releases is as follows:

* All new versions of the individual applications, components, and microservices that make up Mojaloop, are available via Helm charts in the public repositories here: <https://github.com/mojaloop/helm/releases>
* Unit tests and some functional integration tests are produced with each component version.
* The Mojaloop release also includes automated end-to-end regression tests. Test suites are versioned, with the version number corresponding to the version number of the Mojaloop release. 
* A release package is produced, once every Program Increment (PI), for new versions of Mojaloop. This includes upgrades to individual applications, components, and microservices within Mojaloop. \
\
A Program Increment is a timeboxed interval during which an Agile team delivers incremental value.
* All Mojaloop maintenance updates, new features, and bug fixes are made available to users of Mojaloop as part of the release cycles, once in each PI period.

## Product releases of extensions/additional components

It is recommended that the standard practice for the product releases of extensions/additional components is in line with the Mojaloop release process [above](release-management.md#mojaloop-releases):

* All new product versions are made available via release packages and described within the release notes.
* A release package includes automated end-to-end tests for each product release. Test suites are versioned, with the version number corresponding to the version number of the product release.
* Product releases are in line with the Mojaloop release cadence, once in each PI period.
* All product maintenance updates, new features, and bug fixes are made available to client DFSPs of extensions/additional products as part of the release cycle, once in each PI period.

## Bugs and hotfixes

Bugs and hotfixes are handled in the following way:

* All bug fixes (both Mojaloop and other products) are included in the release packages.
* Likewise, hotfixes are also provided via a release. It is not recommended to deploy hotfixes directly from the specific application package releases, as deploying only a single component of a release (as opposed to deploying the release that includes the updated component) can result in the Hub being out of sync with the application package release.
* Bugs are tracked, managed, and prioritized as defined in the [defect triage process](defect-triage.md): 
    * The Service Desk tool is used for managing all bugs. 
    * A Mojaloop Support Triage team with representatives from both Mojaloop and other Product Delivery and Product Management teams are involved in analyzing urgency and impact to determine prioritization of bugs, including resolution planning/scheduling and communication back to the Hub Operator.

## Environments and QA strategy

In order to validate a deployment of a newly released Mojaloop version against the latest other products (extensions/additional components), an environment is to be set up by the Scheme with all the components needed along with the specific configuration that the Scheme uses. This allows the QA/validation and/or Mojaloop Support teams (a team dedicated to running Support services for the technical operations of a Mojaloop Hub) to carry out the deployment and testing of Mojaloop releases against the latest versions of other products.

::: tip NOTE
The environment set up by the Mojaloop Support team for validation should follow a standard infrastructure, replicating or simulating a corresponding production setup as much as possible, so that any issues, bugs can be identified early in the process. A production setup typically includes API gateways, DMZs, cluster setup based on security zones, along with all the required components and customizations (including Scheme Rules) done by the Scheme. The Hub Operator must ensure that their production infrastructure is fully in sync with the Mojaloop Support team's infrastructure standards.
::: 

Following the successful deployment and validation of a release on the standard infrastructure and architecture, and after successfully running the latest version of Mojaloop and other products, the release is approved and can be shared/made available (via the Support Team's client server/repo). The Hub team can then schedule the deployment into the Hub Operator's (potentially bespoke) environment. 

The QA strategy employed by the Mojaloop and the extension products' Product Delivery teams ensures that new code of each and every service component has undergone comprehensive testing before it gets released. The QA strategy of the Mojaloop Support team, on the other hand, should focus on validating the deployability of the integrated service components and the interoperability of the products, guaranteeing that there is a working Mojaloop Switch, which then can be deployed in a Hub Operator's environment.

## Release process

The recommendation for Hub implementations is to stay in line with the Mojaloop release cadence of one release every PI period and avoid deploying individual changes directly from the master branch of specific applications, components, or services within Mojaloop. This recommendation ensures that the integrity of the applications remains cleaner and in line with the source repositories. 

For every release, the Mojaloop Support team is recommended to take the following steps:

::: tip NOTE
Hub Operators must be informed of the target release date well ahead of time.
:::

1. The Mojaloop Support team review all release artifacts including release notes and associated documentation, and create or enhance the deployment runbook as soon as the release is made available. 
1. The Mojaloop Support team conduct deployment and validation of the planned Mojaloop and other product releases in a temporary Mojaloop Support environment (using the standard Mojaloop Support infrastructure but matching the client's – that is, the Hub Operator's – application versions). 
1. Following the successful deployment and validation of a release on the standard Mojaloop Support infrastructure and architecture, and after successfully testing the latest version of Mojaloop and other products, the release is approved and made available to the Hub Operator.
1. The Hub Operator team confirm readiness (and optionally, target deployment window) for the deployment into the Hub Operator's Development environment. \
\
It is the Hub Operator's responsibility to carry out deployment into the Development environment and subsequent validation. Alternatively, they can request Mojaloop Support to perform these activities on their behalf.

### Deployments by the Mojaloop Support team

If the Hub Operator requests the Mojaloop Support team to perform deployment into the Hub Operator's Development environment, then the Mojaloop Support team sends out an email (or any other form of communication depending on the Hub Operator’s preferences) with information on the target release date, the range of features included in the release, and the deployment window. Following deployment, further communication is sent out to confirm that the deployment has been carried out, validated, and the deployment window has closed.

## Process flowchart

<img src="../../.vuepress/public/release_process.png" width="65%" height="65%" />
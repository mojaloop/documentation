# RBAC Context

An individual who needs to access the various Mojaloop Hub management portals can be registered and an &quot;account&quot; generated, which can be used to access various aspects of an operational instance of a Mojaloop Hub and to provide a basis for auditing that access by tying activities to the original registration. For the purposes of this document, an &quot;account&quot; is a digital identity, a means of authenticating (linking) the person asserting that identity to the original registration, and a set of attributes, which will include - among other things - a set of access rights, or rights that are enabled through the possession of those attributes.

### RBAC Design

The RBAC design for a hub operator, outlines the security control points that should be considered or extended in order to mitigate risk within a typical Mojaloop hub operations organisation. Some control points are business processes and organisational structure related, some control points are technical relating to the identification, authentication and authorisation layers, and some control points require monitoring. All three should be considered to create accountability and mitigate risk.

### Audit

Audit would need to work collaboratively with the business and the IT teams to Segregate these duties wherever possible and assign an appropriate mitigation control in cases wherein it is not feasible to do so. In addition, these controls would need to be monitored on a quarterly basis and the results need to be reported to senior management.

Some contextual definitions include

1. **Action** : a distinct event triggered by a user that results in:

- Creation of a data asset
- Reading or accessing of a data asset
- Update or effecting changes to the state of a data asset
- Delete or the removal of a data asset from an application or database.

1. **Permission** : authority to perform a specific action in the context of an application or service
2. **Role** : applications, actions and data access required to perform the tasks related to a single role
3. **User - role relationship** : The role (roles) assigned to each user that defines the permissions they have

## Users, actions and roles in a Mojaloop context

Mojaloop will have 2 Broad categories of users:

1. Human – These are hub and DFSP users who through various interfaces will interact with Mojaloop. DFSP users will interact with Mojaloop through the Payment Manager and portals that will be made available during the onboarding process.
2. Non-human – These will automate the business processes and automate tasks that would otherwise be done by a human. These will communicate via API calls that will affect actions to fulfil business requirements.

The context of this document will focus on Human users only.

## User Lifecycle Management

The &quot;User Account Lifecycle&quot; defines the collective management processes for every user account. These processes can be broken down into Creation, Review/Update, and Deactivation—or &quot;CRUD&quot;. If any organization utilizes IT resources of any kind, they rely on user accounts to access them.

## Onboarding

The Onboarding process will have some activities involving user creation both at DFSP end and at the Hub. These will be as follows:

1. Hub: The following users will be created
  1.1 Hub Operators
  1.2. Hub Administrators
2. DFSP
  2.1 DFSP Operators
  2.2 DFSP administrators (only applicable to Payment manager).

## Segregation of Duties

Segregation of Duties focuses on mitigating the risk of internal fraud by setting boundaries between roles assigned to an employee, and between the conflict of interest that may result from an employee&#39;s responsibilities, ensuring no single user can have end to end functional control of a business process and its data. It requires more than one individual to create, process and complete an action.

### Principle of least privilege

RBAC uses the security principle of least privilege. Least privilege means that a user has precisely the amount of privilege that is necessary to perform a job. The aim of this is to minimize the likelihood of issuing a user with excess permissions to complete actions in Mojaloop ecosystem.

### Zero Trust Mojaloop Implementation

A zero trust network is one in which no person, device, or network enjoys inherent trust. All trust, which allows access to information, must be earned, and the first step of that is demonstrating valid identity. A system needs to know who you are, confidently, before it can determine what you should have access to.

Mojaloop&#39;s inherent design will implement a Zero Trust approach in its architecture and deployment requiring all entities that interact to first authenticate themselves, then seek authorization to access and process data depending on the role they belong to.

### Process of Segregation Of Duties determination

1. Define user management workflows and processes. These are all business processes that make up Mojaloop business actions in Mojaloop. Examples include Onboarding.
2. Rationalise all User security access requirements for Applications of Mojaloop as outlined in the table below:
  2.1 Define business and application functions for users and APIs
  2.2 Define role profiles
  2.3 Define function &amp; competence profiles
  2.4 Gather a list of applicable SOD conflicts by defining segregation of duties roles
  2.5 Role profile matrix table (with example data):

| **Roles and Permissions**  **Matrix** | Hub Users | Administrator | Standard Maker User | Standard Checker User | Standard Read Only | DFSP Users | Administrator | Standard Maker User | Standard Checker User | Standard Read Only |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Onboarding Roles | X | | | | | | | | | |
| Create User Account | X | | | | | | | | | |
| Create DFSP Profile | X | | | | | | | | | |
| Create DFSP User | X | | | | | | | | | |
|
| **Finance Portal** |
| View Reports | | | X | X | X | | | X | X | X |
| Platform Configuration | | | | | | | | | | |
|

3. Reconfigure any conflicting roles
  3.1 Business approvals
  3.2 Maker checker user creation
4. Periodic System Access & User Authorisation reporting
5. Separation of IT-security and Operational IT security that will support user management activities

## Best Practices for RBAC and Mojaloop Identity Management

1. All user ids should be unique and have a unique format that can be correlated in the hub but not meaningful to outsiders.
2. DFSP Users will not have access to any administrative role Hub
3. All non-human users must be restricted from logging on to the application front ends.
4. DFSP users will be trained on the roles and best practices
5. Enforce automated user provisioning and life cycle management.
6. Classify actions performed in Mojaloop to identify business risky actions that require additional controls.
7. Additional controls to mitigate RBAC risks can include:
  7.1 Multifactor authentication (MFA)
  7.2 Audit logging with alerts
  7.3 Auto user profile deactivation / disabling
8. Mojaloop will monitor user inactivity and disable inactive users over a specified period
9. Enforce centralised policy enforcement across identities e.g. Password policy, login policies, MFA, risk based authentication etc.
10. Identify and closely monitor privileged identities that have permissions to perform sensitive actions. The following apply to privileged users:
  10.1 Advanced privileges must be requested for and approved on a case-by-case basis;
  10.2 Administrators should have their privileged permissions for the minimum time possible;
  10.3 Administrators should only have the permissions required to complete a specific task;
  10.4 Membership in administrative groups must be reviewed regularly;
  10.5 Enforce multi-factor authentication for administrative users;
  10.6 Keep access logs, audits, and set-up real-time notifications when access is activated.
11. Mojaloop will configure audit logs and alerts for all user actions in Mojaloop. Where possible explore identity analytics via applicable open source tools.

## Automated Identity Management and RBAC Control

The tools preferred for user and identity management in a Mojaloop deployment are:

1. **KeyCloak Identity Management engine** – Store and process API authentication controls as well as act as API gateway.
2. **WSO2 Identity management engine** – Store and process user role profiles and broker self onboarding of DFSP users.

-------

## Context

An individual who needs to access the various Mojaloop Hub management portals can be registered and an “account” generated, which can be used to access various aspects of an operational instance of a Mojaloop Hub and to provide a basis for auditing that access by tying activities to the original registration. For the purposes of this document, an “account” is a digital identity, a means of authenticating (linking) the person asserting that identity to the original registration, and a set of attributes, which will include - among other things - a set of access rights, or rights that are enabled through the possession of those attributes.

The registration process involves identity verification, background checking, and so on. The individual is then issued with credentials - a login account ID/digital identity and at least one authentication method, which may include a password and two-factor authentication (2FA).

::: tip NOTE
The scope of this document is not limited to Mojaloop Hub operators. It also addresses aspects of DFSP operator access to the Payment Manager portals.
:::

### 2FA considerations

It should be noted that 2FA via a mobile phone may be inappropriate for some roles, since highly sensitive roles may require that mobile phones are locked away while the individual is “on shift”. This will necessitate other 2FA methods, such as key fobs.

### Role-Based Access Control

The Mojaloop Hub uses a Role-Based Access Control (RBAC) method. A user with an account that allows access to the Hub will have roles associated with that account, which define what they can do once they are authenticated themselves and are logged in.

Many roles apply to multiple portals, however, some roles may be specific to individual portals.

Care should be taken when assigning multiple roles to an account, or multiple accounts to an individual natural person. This is due to the potential that arises for the circumvention of controls. Part of the purpose of RBAC is to ensure that more than one person must be in the authorization chain for important actions, thereby reducing the vulnerabilities around bad actors.

## Mojaloop ecosystem portals

The Mojaloop ecosystem offers a number of portals, which support varying degrees of access control and RBAC. These are split into two groups:

- Hub portals, which are related to the operation of the Hub itself
- Payment Manager portals, which relate to the management of a specific DFSP’s connection to the Hub

## RBAC in Mojaloop Hub

In the Mojaloop Hub environment, RBAC is implemented through a combination of tools - Ory Oathkeeper for identity management, and Keycloak for access control (including roles and maker/checker).

The Hub itself has the following portals:

- **Hub Operator onboarding:**
Currently there is no bundled Identity and Access Management (IAM) solution for Hub operators, though the function is partly filled through the use of WSO2. Development work is underway to develop a comprehensive IAM solution based around Ory and Keycloak. This will see an admin operator created alongside the deployment of the Hub, which acts as a first foundational step in this area.
- **Finance Portal:** It has two principal functions: the management of settlement operations, and the management of the liquidity position of individual DFSPs (and related to this, their Net Debit Cap (NDC) value).
Access to the Finance Portal is currently limited to a simple username/password access control function.
- **Participant lifecycle:** Controlling and configuring access to the Hub by DFSPs.
From a technical perspective, this is currently achieved through use of the Mojaloop Connection Manager (MCM). However, it is envisaged that MCM itself will be developed to present an API, which can be used to develop a UI that would be available to Hub Operators and to DFSPs.
- **Hub operations:** These include transaction searches, status and performance monitoring, dashboarding and overall tech ops.
Currently these are achieved through the use of Prometheus/Grafana and a range of other tools, with standard access control embedded in these tools themselves. It is envisaged that this will be migrated into the Ory/Keycloak solution, as this develops.

Other Hub operations, such as Fraud Management and Case/Dispute Management, are add-on modules that implement their own access control to manage access to their sensitive functions. These are not addressed in this document.

In addition to the above access control measures, it should be noted that access to all of these functions is only possible via a VPN, with individual credentials controlling access.

As well as these portals, there are two other primary means of accessing the Hub, neither of which is subject to RBAC:

- The first of these is transactions, which are strictly controlled according to their own multi-layered cybersecurity measures.
- And secondly, bulk payments (government-to-person - G2P), which are supported by means of an API that is subject to the same controls as other, single transactions. It is envisaged that bulk payments will be a service that is provided to DFSPs (and their customers) by means of a secure API, with the DFSP operating a bulk payment portal for use by their customers. It is possible that the operator of an instance of the Mojaloop Hub might make available a white label bulk payment portal, which interfaces with the Hub bulk payment API, for customization by any DFSP that wishes to offer the service to their customers. (Note that this is not a unique approach: a similar approach has been proposed, for example, for merchant payments, with a white label app for QR code transactions being made available for DFSPs to incorporate into their mobile wallets.)

The access controls around either single or bulk payments are not therefore discussed further in this document.

## Payment Manager for integration

Payment Manager is currently one of the primary mechanisms for integrating DFSPs to a Mojaloop Hub. Whereas the Hub is singular in a scheme, there is a separate instance of Payment Manager for each DFSP. The portals offered by Payment Manager must therefore be secured by means of RBAC to limit access to authorized representatives of the DFSP.

In the Payment Manager environment, RBAC is implemented solely through Keycloak.

The following portals are available:

- **User/Operator onboarding:**
Payment Manager includes Keycloak for IAM. On deployment, a single admin user is created, which can be used to create further user accounts.
- **Hub connection management:**
This includes the ability to configure the Hub connection from the Payment Manager side, and by implication to disable it. It is therefore a controlled function, with different controls for viewing versus modification.
- **Transaction investigation:**
It is possible to investigate transaction queries using the Payment Manager portal. This is potentially an issue if Personally Identifiable Information (PII) is available through the portal.

## RBAC requirements

### Mojaloop Hub

#### Hub Operator onboarding

##### Foundational accounts

At the time that a Hub is first stood up, Ory/Keycloak will be used to create a foundational user account with administrator privileges. A system administrator will be assigned this account. Note that the system administrator will not be assigned any operational roles beyond those of a system administrator.

All functions carried out using Ory/Keycloak are subject to system-level logging for audit purposes.

The system administrator will then use Ory/Keycloak to create further user accounts, subject to standard identity and background checks for each individual (defined under the Scheme Rules associated with a particular Mojaloop deployment) before their accounts are created.

These new user accounts will be assigned one of these roles:

- OPERATOR
- MANAGER

A user account may not have both OPERATOR and MANAGER roles.

##### Further accounts

In addition to the system administrator, the foundational accounts will have the ability to use Ory/Keycloak to add further accounts. However, for these users, this activity will be subject to maker/checker controls. A user with role OPERATOR will be able to set up a user account (with processes in place to ensure that due diligence around identity verification and background checks have taken place). However, this account will not be activated until a person with role MANAGER approves it.

A role will be assigned to each of these accounts, as they are created. As well as the roles associated with the foundational accounts, the following roles may be assigned to new user accounts:

- ADMINISTRATOR
- FINANCE_MANAGER

A user account cannot have more than one of OPERATOR, MANAGER, ADMINISTRATOR or FINANCE_MANAGER, in order to ensure separation of:

- Financial management from other Hub operations tasks
- Operator and managerial roles in maker/checker functions

::: tip NOTE
Assigning the ADMINISTRATOR or FINANCE_MANAGER roles is subject to a higher degree of identity verification and background checks than any other roles, due to the sensitive nature of the associated functions. These additional checks are set out in the Scheme Rules.
:::

#### Finance Portal

Many functions (such as the viewing of DFSP positions, the status of settlement windows, and so on) of the Finance Portal are available to all logged-in users, regardless of their role. However, the following functions may only be carried out by users with specific roles:

- Settlement processing
  - Close settlement window
  - Initiate settlement
- DFSP liquidity management
  - Add/withdraw funds
  - Change NDC

All of these are subject to maker/checker controls, so that a user with role ADMINISTRATOR can initiate the action, but it must be approved by a user with role FINANCE_MANAGER.

#### Participant lifecycle

This portal provides a single interface for a Hub Operator to add and maintain DFSPs on the Hub ecosystems.

There are some standardised functions that are subject to RBAC:

- Create DFSP
- Create DFSP Accounts
- Suspend DFSP

Each of these is subject to maker/checker controls, so that a user with role OPERATOR can set up the changes, and they must be approved by a user with role MANAGER.

In addition, there is a significant workload in technical onboarding a DFSP, in particular around the establishment of the technical operating environment (certificates and so on). This is not subject to RBAC. This is not considered a significant risk, since there is no value without being able to create a DFSP and the associated accounts on the Hub itself - activities that are subject to RBAC.

#### Hub operations

Access to the reporting functions of Prometheus/Grafana is not subject to RBAC controls - any signed-in/authenticated user, with any RBAC role assigned, may view the reports and dashboards.

Creating a new report/dashboard is a restricted function, and is only available to users with the MANAGER role.

As noted earlier, the operations and reporting portals will be migrated into the Ory/Keycloak environment in order to facilitate these controls.

### Payment Manager

The Payment Manager operator functionality is subject to RBAC controls, but maker/checker is not required.

#### User/Operator onboarding

On deployment of Payment Manager, a single admin user account is created using Keycloak. Note that the admin user will not be assigned any operational roles beyond those of a system administrator.

All functions carried out using Keycloak are subject to system-level logging for audit purposes.

The admin user will use Keycloak to create further user accounts, subject to standard identity and background checks for each individual (defined under the Scheme Rules associated with a particular Mojaloop deployment) before their accounts are created.

These new user accounts will be assigned one of the following roles:

- OPERATOR
- MANAGER

A user account may not have both OPERATOR and MANAGER roles.

#### Dashboards

The Payment Manager dashboards are available to any logged-in/authenticated user with role OPERATOR or MANAGER.

#### Hub connection management

Viewing the settings for the Payment Manager/Hub connection is available to any logged-in/authenticated user with role OPERATOR or MANAGER. However, modifying the settings is a controlled function. Only a user with role MANAGER may modify the settings.

#### Transaction investigation

Carrying out transaction investigations using the facilities of the Payment Manager portal is a controlled activity, due to the potential for revealing PII data. It is therefore only available to logged-in/authenticated users with role MANAGER.

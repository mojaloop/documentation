# Technical Design Review & Code Review

Mojaloop software is intended to form the backbone of nation scale inclusive instant payments schemes. These schemes
are important pieces of national financial infrastructure which facilitate the life critical daily activities of a
great number of people, such as purchasing food and clean drinking water. Adopters and users of Mojaloop software demand
and deserve an extremely high level of quality, security, reliability and resilience from our products.

In order to maintain these qualities and mitigate the many business and technical risks our adopters and their
stakeholders face, the Mojaloop Foundation implements a structured product engineering process based on best
demonstrated industry practices for regulated financial software which includes managed technical and process driven
change control and traceability, technical design and code reviews, high thresholds for testing and multiple levels of
quality assurance gates.

Our processes are intended to help our contributors identity and mitigate risks while enhancing our products, for the
benefit of the entire Mojaloop community.

Please read the following information carefully to make sure you understand our definitions and how these processes
apply to the work you want to accomplish **before you begin**.

**Please note that if you do not follow these processes you may be asked to rework your contribution if it does not meet
our standards. This may lead to significant delays in getting your work into an official Mojaloop release.**

## What is Technical Design Review?

"Technical design review" is a process whereby one or more senior domain expert engineers who are members of the
Mojaloop Design Authority, familiar with the area(s) of the system effected, discuss proposed changes with contributors
**before implementation work is started**, for the following purposes:

- Risk Management
    - To help identify and mitigate technical and/or business risks to any of our stakeholders, users or other
      contributors.
- Impact Assessment
    - To help identify other areas of the system or teams who may be impacted by the change, and to facilitate
      communication with them.
- Standards & Cohesion
    - To guide on established Mojaloop standards for tooling, third party component choices and design patterns with a
      view to maintaining cohesion across the entire Mojaloop codebase.

For non-trivial changes, this process involves working collaboratively with the Mojaloop Design Authority to produce a
design document which captures the various elements of the proposed change in a sufficient level of detail. Once the
change is implemented, this document goes on to form part of our community documentation, helping others understand the
rationale behind the design decisions made historically as our software evolves.

## What is Code Review

"Code review" is a process whereby one or more other software engineers look over a set of proposed code changes
**before they are merged into the main branch of a repository**, for the following purposes:

- Quality Assurance
    - Code reviews help ensure the quality of the codebase by allowing other team members to identify potential issues,
      bugs, or areas for improvement before the code is merged into the main branch. This can lead to higher-quality
      software with fewer defects.
- Knowledge Sharing
    - Code reviews provide an opportunity for team members to learn from each other. By reviewing code written by their
      peers, contributors can gain insights into different approaches, best practices, and coding patterns. This helps
      spread knowledge and expertise around the community.
- Consistency
    - Code reviews help maintain consistency in coding style, standards, and conventions within the Mojaloop project. By
      having multiple community members review each other's code, we hope to ensure that the codebase follows
      established standards and remains cohesive.
- Risk Mitigation
    - Code reviews can help mitigate risks associated with changes to the codebase. By having multiple sets of eyes
      examine the code, potential risks, security vulnerabilities, and performance bottlenecks can be identified early
      on and addressed before they cause problems in production deployments.
- Feedback and Improvement
    - Code reviews provide an opportunity for constructive feedback and collaboration. Contributors can offer
      suggestions for improvement, share alternative solutions, and discuss design decisions. This fosters a culture of
      continuous improvement within the community.
- Code Ownership
    - Code reviews encourage a sense of collective ownership of the codebase. When multiple community members are
      involved in reviewing and contributing to the code, it becomes a shared responsibility rather than the sole
      responsibility of individual contributors.

## Types of Change

As a contributor, the process you must follow depends on the nature of the change you are making and its potential
impact on various categories of users and the system as a whole.

Use the definitions below to identify the type of change you are making and select the appropriate process to
follow. It is your responsibility as a contributor to apply the appropriate process and you will be required to sign a
contributors agreement stating that you will adhere to these requirements.

If you are in any doubt about which of the following categories applies to you change, please consult the Mojaloop
Design Authority via slack here: [#design-authority](https://mojaloop.slack.com/archives/CARJFMH3Q). Please note that it
is important to engage in any required design review process before proceeding with any code changes to avoid wasting
your own efforts should re-work be requested by the Design Authority.

### Non-consequential Changes

#### Definition and Characteristics

A non-consequential code change is a small, highly isolated modification made to an existing piece of code. These
changes do not affect the internal or external structure, or functionality of the local scope i.e. its inputs or
outputs, and are typically made for reasons such as improving readability, fixing coding style issues and/or minor
performance optimisations. Non-consequential code changes are straightforward and low-risk.

A non-consequential code change does not alter the external interfaces, functionality or externally observable behaviour
of a component(s) in any way.

A non-consequential code change does not alter the internal structure of one or more components in any way.

_Important Note: If your change is an optimisation and involves altering the implementation of any algorithm, consider
carefully if it warrants design review or a more stringent code review than normal. It is far better to be cautious and
seek more eyes on your change than to inadvertently introduce a regression._

#### Examples

Examples include:

- Renaming variables
- Adjusting indentation
- Adding comments
- Removing unused imports
- Optimising smaller algorithms

#### Required Design & Code Review Process

1. No design review is required but can be understaken regardless should you be under any doubts about the consequences
   of your changes.
2. At least one approving "code owner" review of all the source files being modified.
    1. Note that if no code owners are defined for any of the source files being modified you must raise an issue with
       {contact details} to get code owners defined for you before proceeding. All code files in the Mojaloop GitHub
       organisation should have code owners defined.
3. Additional peer code reviews as desired. The more eyes on your proposed change the better.

### Consequential Changes

#### Definition and Characteristics

Consequential changes are modifications that have an impact on the behavior, functionality, operational characteristics
or performance of a sub-system or the system as a whole. These changes typically involve altering the logic of a
component or service, implementing new features, fixing bugs, changing or upgrading dependencies, or refactoring large
sections of code. Consequential changes require a considerable amount of up-front thinking and coordination with other
teams and stakeholders due to their potential system wide impact on stability and functionality of the software. They
typically carry a higher risk and require careful consideration and planning before implementation.

_Important Note: If you think your change falls into the "Consequential Changes" category, you must also ensure it does
not fall under the ["Critical Changes"](#critical-changes) category. Please review the definition
for ["Critical Changes"](#critical-changes) before proceeding._

#### Examples

Examples include:

- Changing an existing internal API method implementation
- Adding a new internal API method implementation
- Changing the definition or behaviour of an internal interface
- Changing a backing service dependency such as swapping an existing DBMS type for another
- Changing a code dependency such as replacing one YAML parser package for another
- Refactorings across multiple code files
- Changes to deployment configurations e.g. in Infrastructure as Code.

#### Required Design & Code Review Process

Consequential changes must follow the defined [Consequential Change Process](consequential-change-process.md).

### Critical Changes

#### Definition and Characteristics

_**In Mojaloop, "critical changes" have largely the same definition as consequential changes but apply specifically to
areas of the system considered critical to our core functionality and main use cases.**_

Critical changes are modifications that have an impact on the behavior, functionality, operational characteristics or
performance of any critical sub-system, system or other artefacts. These changes typically involve altering the logic of
a critical component or service e.g. for implementing new features, fixing bugs, changing or upgrading dependencies, or
refactoring code. Critical changes require a considerable amount of up-front thinking and coordination with other teams
and stakeholders due to their potential system wide impact on stability and functionality of critical aspects of the
software. They typically carry a very high risk and require careful consideration and planning before implementation.

A consequential change should be considered a critical change if it falls under one or more of the following code
repositories, areas and/or sub-systems:

- External APIs:
    - Any alteration to an external API specification, normal or error paths, including request validation and bug
      fixes.
    - Any alteration to an external API request handling implementation, normal or error paths, including request
      validation and bug fixes.
        - Note that "external API" in this case means any API exposed outside the switch boundary e.g. FSPIOP API etc...
- Administrative APIs:
    - Any change to any administrative API specification.
    - Any change to any administrative API request handling implementation, normal, or error paths, including request
      validation and bug fixes.
- Transfer Flow Discovery Phase:
    - Any change in discovery phase API request handling e.g.:
        - Any change to account lookup API request handling implementation(s) and/or call flows to and from internal or
          external "oracles".
- Transfer Flow Agreement Phase:
    - Any change in agreement phase API request handling e.g.:
        - Any change to the storage, retrieval, processing or display of agreement phase data or meta-data.
        - Any change to agreement phase API request handling implementation(s) and/or call flows to and from internal or
          external entities.
- Transfer Flow Transfer (clearing) Phase:
    - Any change in transfer clearing phase API request handling, e.g.:
        - Any change related to the process of deciding whether to clear a transfer of reject it based on the available
          liquidity of a participant (liquidity check).
        - Any change to the calculation, storage, retrieval, processing or display of participant net debit cap values.
        - Any change to the calculation, storage, retrieval, processing or display of a participants available
          liquidity.
        - Any change to the calculation, storage, retrieval, processing or display of any monetary value.
        - Any change to the calculation, storage, retrieval, processing or display of transfer data or meta-data.
        - Any change within the transfer prepare request processing pipeline.
        - Any change within the transfer fulfil request processing pipeline.
- Settlement:
    - Any alteration to an external or internal settlement API specification, normal or error paths, including request
      validation and bug fixes.
    - Any alteration to an external or internal settlement API request handling implementation, normal or error paths,
      including request validation and bug fixes.
    - Any change related to the inclusion or exclusion of transfers for settlement batching.
    - Any change related to the calculation, storage, retrieval, processing or display of settlement related data or
      meta-data.

#### Examples

Examples include:

- Fixing a bug in an FSPIOP API validation method
- Adding a new feature to an administrative API
- Changing the formatting of currency values displayed to users in a web portal
- Upgrading the version of an external code dependency e.g. npm package of a ledger related service
- Optimising calls to backing store services during processing of an external API request

#### Required Design & Code Review Process

Critical changes must follow the defined [Critical Change Process](critical-change-process.md).





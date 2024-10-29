# Introduction – Technical Operations Guide

The Mojaloop Hub operates a number of environments that need managing and maintaining on a daily basis. The standard procedures described in this document outline the operations processes that enable the Hub Operator to handle all aspects of managing a live service.

The following procedures need to be in place:

- [**Incident management**](incident-management.md): Managing incidents that have been reported to the Technical Operations team or that reached the team via alerts or monitoring activities.

- [**Problem management**](problem-management.md): Getting to the root cause of incidents or the potential causes of incidents, and instigating actions to improve or correct the situation at once.

- [**Change management**](change-management.md): Controlling the lifecycle of all changes, enabling changes to be made with minimum disruption to IT services.

- [**Release management**](release-management.md): Managing, planning, scheduling, and controlling a software change through deployment and testing across various environments.

- [**Defect triage**](defect-triage.md): Ensuring that all the bugs identified in the client’s Production environment are captured, evaluated, prioritized, and submitted to the Service Desk.

A quick overview of the environments managed by the Hub Operator is provided below:

- **Development**: Non-production software development environment where Mojaloop OSS code is merged with customizations. Gives developers fast test feedback on new code submissions. Digital Financial Service Providers (DFSPs) do not interact with this environment. Developer and QA access only.

- **User Acceptance Testing (UAT)**: Testing environment for user acceptance and regression testing to validate new releases.

- **Sandbox (SBX)**: Testing environment to validate DFSP connectivity on both API and security requirements.

- **Staging (STG)**: Pre-production environment that mirrors production as closely as possible. Validation of new releases and DFSP integration.

- **Production (PRD)**: Production environment compatible with production release.

::: tip
A [Glossary](key-terms-kpis.md) is provided to help clarify common Technical Operations terms used throughout this document. If you encounter a term that needs explaining, it is worth checking the glossary to see if a definition has been provided.
:::
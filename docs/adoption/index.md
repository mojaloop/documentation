# About the Mojaloop Adoption documents

For a hub operator or central bank to use Mojaloop for its inclusive instant payment system (IIPS), the process of adoption and steps in the decision making are often very different compared to hiring a firm to provide a proprietary software.   Using Mojaloop to build and own a platform provides greater control but also greater responsibility.   Not having dependency on a single vendor means exactly that.  

The documentation and tools in this section are design to help with the rationale for selecting to use Mojaloop and a recommended process for implementation.  

Building a payment system is far more than the technology platform.  The scheme and operations are actually the factors of success.   We developed Mojaloop to minimize operational burden and reduce the cost of implementing inclusive scheme rules like irrevocability and certainty. 

The process of building a payment system can be as important as some of the scheme decisions which come out of it.  Every scheme owner and operator can develop their own process, but we recommend a process that is inclusive, transparent, and iterative to maximize ownership, trust and long term sustainability. 



Tools available for Adopters:

* [**Scheme Choices**](#scheme-choices): documents that provide assistance with defining scheme rules, operating guidelines, as well as key business and design choices
* [**Hub Operations**](#hub-operations): guides that provide practical information about the various aspects of operating a Mojaloop Hub

## Scheme Choices

The [Platform Operating Guideline Template](./Scheme/platform-operating-guideline.md) provides a template for describing how the Scheme Platform will operate, and for specifying the obligations and responsibilities of the Scheme, the Platform Operator, and the DFSPs.

The [Scheme Business Rules Template](./Scheme/scheme-business-rules.md) provides a template for defining the Business Rules that govern the rights and responsibilities of participants in a Mojaloop scheme.

The [Scheme Key Choices](./Scheme/scheme-key-choices.md) document describes and discusses some of the most significant business and design choices that affect both the technical implementation of Mojaloop and the Business Rules which the Scheme will write, and which Participant DFSPs will agree to follow.

The [Scheme Participation Agreement Template](./Scheme/scheme-participation-agreement.md) provides a template of the Scheme Participation Agreement that contains the minimal necessary provisions to evidence a DFSP's application to join the Scheme and abide by its Business Rules.

The [Uniform Glossary Template](./Scheme/scheme-uniform-glossary.md) acts as a glossary of business terms. 

## Hub Operations

The [Technical Operations Guide](./huboperations/techops/tech-ops-introduction.md) outlines the operations processes that enable the Hub Operator to handle all aspects of managing a live service, such as incident management, problem management, change management, release management, defect triage.

The [Settlement Management Guide](./huboperations/settlement/settlement-management-introduction.md) describes how settlements are managed by the Mojaloop Hub and the partner settlement bank(s), and introduces the main building blocks of settlement processing.

The [Guide to Finance Portal v2](./huboperations/portalv2/busops-portal-introduction.md) is aimed at the Operator of a Mojaloop Hub and provides information about the Finance Portal, which facilitates the management of settlement-related processes on a daily basis.

The [Roled-Based Access Control](./huboperations/rbac/Role-based-access-control.md) document discusses the security mechanism employed to control access to various aspects of an operational instance of a Mojaloop Hub. 

The [Onboarding Guide for the Hub Operator](./huboperations/onboarding/onboarding-introduction.md) is aimed at the Operator of a Mojaloop Hub and provides information about the DFSP onboarding process. It provides a high-level overview of the onboarding journey that DFSPs take, acting as a checklist of onboarding activities.

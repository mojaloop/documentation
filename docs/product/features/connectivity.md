# Onboarding DFSPs

In principle, having developed and documented the [Mojaloop APIs](./transaction.md#Mojaloop APIs), this should be sufficient to enable DFSPs to connect to a Mojaloop Hub. However, as part of the Mojaloop Community's mission to address financial inclusion, it has long been felt that the key to minimising the cost and complexity of connecting a DFSP's back office to a Mojaloop Hub is through the provision of a portfolio of connectivity solutions, allowing a DFSP to select the approach that best meets their needs. These are supplemented by a DFSP Onboarding Playbook, encapsulating the business processes that are needed to onboard a DFSP.
## Business Onboarding
There are many steps needed in the onboarding of a DFSP to a Mojaloop Hub that are nothing to do with technology, and these are addressed in the DFSP Onboarding Playbook.

This playbook, which has been donated by Thitsaworks, comprises a set of tools and templates to assist with the planning and execution of a Mojaloop deployment, specifically focusing on DFSP onboarding. The tools are:
- A workplan template, including samples used in past deployments;
- An example end to end test case, in this case for payee-side DFSP integration;
- A Technical assessment form, used to define the technical assistance required by candidate DFSPs;
- A technical onboarding checklist;
- An API mapping template, used to map between Mojaloop Hub API elements and the corresponding actions required by the DFSP's back office;
- A plan for the setup of the security of the DFSP's connection to the Mojaloop Hub.

You can [download the Thitsaworks DFSP Onboarding Playbook by clicking on this link](https://github.com/mojaloop/product-council/tree/main/Documentation/DFSP%20Playbook).

## Technical Onboarding
The current connectivity portfolio includes the Integration Toolkit (ITK) which will allow a Systems Integrator (SI) to create a connection by combining the various elements of a toolkit in a way that best meets the DFSP's needs. These elements include:
  - Mojaloop Connection Manager (MCM);
  - Mojaloop Connector (for integrating with the Mojaloop Hub);
  - A set of example Core Connectors (for integrating with the DFSP's back office);
   - Documentation, including "how to" guides and templates.

For larger DFSPs, the Mojaloop Community offers Payment Manager as an alternative to the ITK. Also known as Payment Manager for Mojaloop (PM4ML), it which offers all of the functionality and flexibility a large bank might require.

The various connectivity tools available to onboard a DFSP to a Mojaloop Hub are discussed further in the [Mini Guides](./connectivity/participation_tools_mini_guides.md), and detailed guidance on which connectivity solution is most appropriate for different participant types and requirements is presented in the [Participant Feature Matrix](./connectivity/participant-matrix.md). 

All DFSPs should be aware that reaping the benefits of an inclusive instant payments solution such as Mojaloop relies on the implementation of a "whole ecosystem" approach - and this means extending the reach of the Mojaloop service into the DFSPs' domains, giving them and their customers the advantages of assurance of transaction finality, lower cost and the reliable delivery of every valid transaction.

Note that the mode of deployment of the ITK affects the type of service a DFSP can provide to their customers, as highlighted in the [Mini Guides](./connectivity/participation_tools_mini_guides.md). The most resource intense options are suitable for DFSPs with high throughout and reliability requirements, a moderate deployment option places some limits on throughput and availability and may be best suited to medium or small DFSPs, and the most frugal option places strict limits on throughput and availability and removes the ability to initiate bulk payments, and so may only be suitable for small DFSPs.

## Applicability

This version of this document relates to Mojaloop Version [17.1.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0)

## Document History
  |Version|Date|Author|Detail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.4|17th December 2025| Paul Makin |Added link to the Mini Guides; clarified the text to highlight the role of the ITK|
|1.3|6th November 2025| Paul Makin|Linked to Thitsaworks' DFSP Onboarding Playbook|
|1.2|9th June 2025| Tony Williams|Added reference to participant feature matrix|
|1.1|14th April 2025| Paul Makin|Updates related to the release of V17|
|1.0|5th February 2025| Paul Makin|Initial version|
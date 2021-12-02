# The Mojaloop Roadmap


## What makes the Mojaloop approach different?

We've documented in our white paper [here](https://mojaloop.io/mojaloop-executive-briefing/) how we think Mojaloop supports markets towards financial inclusion through effective and efficient interoperability, by providing an alternate option for schemes choosing clearing and settlement switching technology.

Here are 4 key reasons as to why we believe the open source approach with a vibrant community model is different:

1.  **Clearing and Settlement Hub: Business Critical Functionality** delivered with excellence, for day to day operations done well, allowing ecosystems to be able to embrace the potential of straight through processing and full automation.  

3.  **Simplify Integration Complexity:** 
	-  taking away as much complexity as possible through standardised and documented-in-the-open APIs & patterns & tools to support swift network participation & automated settlement rather than a reconciliation driven process.  
	- A future facing security design that allows cyber-secure safe use of the open internet (not VPNs) to create the network where ecosystems wish to embrace this cost reduction.
	
4.  Adopters can **take advantage of a tectonic shift in technology in financial services globally,** the post-covid demand, and the implication on future financial services:
	- emergence of open banking & embedded finance as well as "merchant request to pay" models over push payments technology
	- global use of opensource technologies in infrastructure projects
	-  COVID revolution around the need for digital transformation & bulk payments for a resilient response to such events.

	**4.  Community Stronger Together**
    - A solution developed & documented in the open in order to create an ability for participants to benefit from each other’s learnings: "stronger together” 
    - We have a community sustainability vision that enables impactful interoperability between last mile services through a community formed of a mix of mojaloop technology adopters on-the-ground putting the core technology to work, push payments & financial inclusion experts, and technology infrastructure gurus.   
    -  An open source delivery model becomes sustainable with public-private partnership, adjacent commercial service offerings easily added as extensions (marketplace thinking), healthy co-opetition, and market-making around an open source core technology solution.
  

## Our 2021 community product strategy to help achieve the vision:

The journey to the big vision starts with getting running hubs.  So our 2021 product strategy is in service of productising what is already created to make it easier to start & to ensure existing adopters are engaged in providing feedback:

-   Remove Friction in the adoption funnel
-   Cost Reduction (for new adopters & production grade deploys)
-   Deliver Validated Feature asks that support Adopter Traction in Market
-   Trustworthy/Quality/Credible = Secure, Performant at Scale, Cost Effective, Modular & Extensible, Resilient, Testable and Easy to Deploy & Operate


## Our 2021 product roadmap for workstream activity:

**Looking closely at what areas of work might support In January 2021 we laid out this framework at our community event as important activity to shape community decisions that would support our 2021 goal of Mojaloop ground traction & community growth:**

-   Provide Better Business Process Support within the product
-   Ensure the Core Hub is Secure, Performant at Scale, Modular & Extensible, Resilient, Testable and Easy to Deploy & Operate
-   Make it Cost Effective for a new adopter to get Started
-   Consolidate & Productise what we have for Advocacy efforts (demos, sandbox, better get-started material to ensure the product adaptation in-the-field is minimised & effective)
- Keep Innovating with Valuable Extensions to the Core Hub such as 3PPI & merchant extensions to help impact & decision making

## **Our key initiatives this year that have delivered on the above:**

- **Better Business Process Support**:  
	- A business process team have created a foundational framework for a roadmap of business process improvement work. 
	- Key features improved around the core APIs:
		- Role-Based Access Control using https://www.ory.sh/ for identity access management (authentication, authorization, access control, and delegation of users accessing the APIs)
		- WSO2 as an out-of-the-box API Gateway:  providing Provide role, policy-based access, security, abstraction, throttling & control, identity management
		- Event Logging Framework: Better support for operational reporting and auditing of processing data
		- Error Handling Framework: Consistent reporting and support of operational auditing
		- Forensic Logging: to support auditing and reporting
	- The team have worked to ensure that it is a community-adopted framework, so that future business process improvements can be run in parallel over this baseline, with a "home" for hub operator "need to know" reference manual documentation as a get started accelerator:
		- RBAC: https://docs.mojaloop.io/mojaloop-business-docs/HubOperations/RBAC/Role-based-access-control.html
		- Settlement: https://docs.mojaloop.io/mojaloop-business-docs/HubOperations/Settlement/settlement-management-introduction.html
		- Participant Onboarding: https://docs.mojaloop.io/mojaloop-business-docs/HubOperations/Onboarding/business-onboarding.html

*All contribution to improve process documentation is welcome, as in 2022 the roadmap will work to improve participant lifecycle management, settlement and merchant onboarding through a business process lens.*

- **Make it Cost Effective for a new adopter to get Started**
	- **A "get started" reference Hub UI** 
		- "Finance Portal 2.0" was recently contributed as this hub UI starting point by Modusbox, for those not wanting to integrate their own UI on day 1, and is in production for some adopters.
		- We are an API-first product to allow the core to fit into multiple scenarios; however an optional get started hub UI has proved invaluable in demonstrating key processes to decision makers.  
		- The starting point for the UI is documented here: https://docs.mojaloop.io/mojaloop-business-docs/HubOperations/Portalv2/busops-portal-introduction.html
		- **There is much that could be done in open source to further develop the UI.  Any contributors welcome.**

	-  **Payment Manager: A Tool to simplify DFSP integration work** : We are in the process of accepting a new contribution from Modusbox that make the integration process to a Mojaloop Hub in production for a DFSP much more seamless and efficient: https://rtplex.io/payment-manager-oss/

- **Core Hub is Modular & Extensible:**
	- An architect-centred team have published the Mojaloop Reference architecture: https://mojaloop.github.io/reference-architecture-doc/ with a vision to ensuring that community growth is from a consistent base understanding of the solution.  
	- Not all elements of this reference are yet implemented, and **this will form the core of the technical roadmap future delivery work in 2022.**

- **Consolidate & Productise what we have for Advocacy:** 
	- We have launched a sandbox to showcase our APIs and interaction with a simulated "model rural village" here: https://sandbox.mojaloop.io/
	- We ran some experiments around interoperability to last mile with CBDC technology alongside the MAS CBDC Global Hackathon participants: https://hackolosseum.apixplatform.com/hackathon/globalcbdcchallenge 
	- We were winners of an ISO20022 hackathon run by BIS showcasing ISO20022 and cross-border interoperability to last mile non-bank solutions: https://mojaloop.io/mojaloop-bis-iso20022-hackathon-submission/ 

**Keep Innovating with Valuable Extensions**
- Our 3PPI API (contributed by Google) is developed sufficiently for hackathon and market activity, and can be explored in detail in our sandbox.  More information about its importance in bringing fintechs into the ecosystem more effectively can be seen here: https://mojaloop.io/webinar-what-pisp-means-for-inclusive-real-time-payments-systems/
- We are exploring what valuable optional extensions to Mojaloop might support an effective accelerator for schemes around merchant ecosystems.  The roadmap requires market validation, funding & community engagement to bring it to life.  Here is our starting point hypothesis: [here](https://docs.google.com/presentation/d/1SoBgF5XGlsn2ZpO01DWoYUrirFQ_t0kYSLRHb2BOo8g/edit?usp=sharing)
- We are exploring with a "sister" open source FRMS project ensuring the right data is accessible from the Mojaloop solution for FRMS solutions: http://lextego.com/


## 2022 Roadmap

Here are some "big bets" we're currently thinking about in the community in 2022:

-  **One-Click Cloud Deploy:** A team from Microsoft are working to make it possible for a one-click-deploy for any potential adopter to get started on Microsoft Azure with a "vanilla" unconfigured hub sandbox in their own environment, based on the latest available release.
- **Google Pay Ready:** Our final push on the 3PPI engineering work contributed by Google will ensure that any fintechs using the Imali adapter (and Google Pay) have a swift way to get connected and transacting as a 3rd party.  This will allow any Mojaloop-powered ecosystem to be able to launch an experience similar to that seen in India's UPI ecosystem.
- **ISO20022 Support:**  ISO20022 is rapidly becoming the protocol of choice by banks, but it is not well known standard amongst Non-Banks - an incredibly important sector in emerging markets last mile services.  Mojaloop want to ensure best practice use of ISO20022 for any adopters and will publish an accelerator for "greenfield" markets, as well as working software and adapters that make using it a simple scaled ask.
- **Cross Network Improvements:**  Based on field learnings, we want to update the design to make Forex participants in a market "first class citizens" in the protocol, with robust timing management across the end to end protocol.  This can lead to dynamic pricing and least cost realtime quotes becoming a reality whilst still supporting existing liqudity management models.
- **Settlement Batch Improvements:**  In order to better support cross network models, settlement processing also needs some work.
- **vNext Build** - converting the existing codebase to the modular structure designed in the reference architecture.


# **How teams are structured around product improvement**

This framework is used to describe the various activites ongoing in the community.  They are at different development stages, and some are not actively creating updates today.


**Core Clearing System Capabilities**

1.1 Reference Architecture Completion & progression to BAU @ DA

1.2 Improvement on v1 Hub: Supporting Services (“Business Operations Framework”)
 - 1.2.1 Baseline RBAC Framework & out-of-the-box user profiles & user management
 - 1.2.2 Improvement on Liquidity Monitoring & Settlement
 - 1.2.3 Improvement on Participant Lifecycle Management: (Onboarding / Activating /  Suspending / Terminating )
 - 1.2.4 Improvement on Reporting API
 - 1.2.5 Improvement to the Reference UI
 - 1.2.6 Scheme Rules Enforcement: Provide a framework to enforce, implement Scheme decisions
 - 1.2.7 Automated Fees Calculation Improvements
 - 1.2.8 Improvement to out-of-the-box Operational Moniitoring and Event Dashboards

1.3 Improvement on v1 Hub - RTP Transfers Processing
- 1.3.1 Reliable Notifications to all Participants
- 1.3.2 Improved Cross-Network Timeouts
- 1.3.2 v1 Performance Improvement

1.4 Best Practice National RTP ISO20022 Messaging
- at the hub 
- at payment manager tool for DFSPs

1.6 Deployments, Patches & Upgrades made Simple
1.7 Deployments on Azure made Simple (Microsoft led)
1.8 Provide Event Data to FRMS Solutions

1.9 Deliver the Alpha release of V2

**Core Clearing System Use Case Propositions, API Change & extensions into market:**
2.1 Overlay Services (3PPI Enablement & 3rd party participant lifecycle management / adapters)
2.2 Merchant Scheme Extension (inc ALS enhancement & QR Support)
	2.2.1 A reference persistent Merchant Oracle & Merchant Blocklisting capability
2.3 Bulk Payments Enhancement 

**Adjacent tools & Marketplace:**

3.1 Mojaloop Hosted OSS DFSP Support Tools: TTK
3.2 Mojaloop Hosted OSS DFSP Support Tools: Payment Manager
3.3 Mojaloop Hosted OSS DFSP Support Tools: SDKs
3.4 Mojaloop Hosted OSS Hub Support Tools: Connection Manager
3.5 Improvement on Reference UI (“Finance Portal 2.0”)


**SUPPORTING Workstreams**
4.1 Improve our “front of house”: API Documentation, Developer Portal, & Sandbox
4.2 Ensure QA/UAT/Release Quality / Test Case Peer Review for Mission Critical Functionality
4.3 Improve Hub Detailed Documentation for new adopters and contributors to hub software to get started more simply
4.4 Add more Training Program content

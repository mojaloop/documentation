---
showToc: false
---

# Frequently Asked Questions

This document contains some of the most frequently asked questions from the community.

### Table of Content

* [What is Mojaloop](#1-what-is-mojaloop)
* [How does it work](#2-how-does-it-work)
* [Who is it fo](#3-who-is-it-for)
* [Why does it exist](#4-why-does-it-exist)
* [Who's behind it](#5-whos-behind-it)
* [What platforms does Mojaloop run on](#6-what-platforms-does-mojaloop-run-on)
* [Is it really open-sourc](#7-is-it-really-open-source)
* [How can I contribute to Mojaloop](#8-how-can-i-contribute-to-mojaloop)
* [What is supported](#9-what-is-supported)
* [Can we connect directly to Pathfinder in a development environment](#10-can-we-connect-directly-to-pathfinder-in-a-development-environment)
* [Should i register DFSP via url or update configuration in default.json](#11-should-i-register-dfsp-via-urlhttpcentral-directorycommandsregisteror-i-need-to-update-configuration-in-defaultjson)
* [Status of the pod pi3-kafka-0 is still on CrashLoopBackOff](#12-status-of-the-pod-pi3-kafka-0-is-still-on-crashloopbackoff)
* [Why am I getting an error when we try to create new DFSP using Admin](#13-why-am-i-getting-an-error-when-we-try-to-create-new-dfsp-using-admin)
* [Using Majaloop to do payment using crypto-currency](#14-using-majaloop-to-do-payment-using-crypto-currency)
* [Can I spread Mojaloop components over different physical machines and VM's](#15--can-i-spread-mojaloop-components-over-different-physical-machines-and-vms)
* [Can we expect for tall the endpoints defined in the API document are implemented in Mojaloop](#16-can-we-expect-for-tall-the-endpoints-defined-in-the-api-document-are-implemented-in-mojaloop)
* [Does Mojaloop store the payment initiator FSP’s quote/status info](#17-does-mojaloop-store-the-payment-initiator-fsps-quotestatus-info)
* [Does Mojaloop handle workflow validation](#18-does-mojaloop-handle-workflow-validation)
* [How is the Mojaloop source accessible](#19-how-is-the-mojaloop-source-accessible)
* [How to register a new party in Mojaloop](#20-how-to-register-a-new-party-in-mojaloop)
* [Does the participant represent an account of a customer in a bank](#21-does-the-participant-represent-an-account-of-a-customer-in-a-bank)
* [How to register _trusted_ payee to a payer, to skip OTP](#22-how-to-register-_trusted_-payee-to-a-payer-to-skip-otp)
* [Receiving a 404 error when attempting to access or load kubernetes-dashboard.yaml file](#23-receiving-a-404-error-when-attempting-to-access-or-load-kubernetes-dashboardyaml-file)
* [When installing nginx-ingress for load balancing & external access - Error: no available release name found](#24-when-installing-nginx-ingress-for-load-balancing--external-access---error-no-available-release-name-found)
* [Received "ImportError: librdkafka.so.1: cannot open shared object file: No such file or directory" when running `npm start' command](#25-received-importerror-librdkafkaso1-cannot-open-shared-object-file-no-such-file-or-directory-when-running-npm-start-command)
* [Can we use mojaloop as open-source mobile wallet software or mojaloop does interoperability only](#26-can-we-use-mojaloop-as-open-source-mobile-wallet-software-or-mojaloop-does-interoperability-only)
* [Describe companies that helps to deploy & support for mojaloop](#27-describe-companies-that-helps-to-deploy--support-for-mojaloop)
* [Can you say something about mojaloop & security](#28-can-you-say-something-about-mojaloop--security)
* [What are the benefit(s) from using mojaloop as interoperabilty platform](#29-what-are-the-benefits-from-using-mojaloop-as-interoperabilty-platform)
* [What are the main challenges that companies face using mojaloop](#30-what-are-the-main-challenges-that-companies-face-using-mojaloop)
* [Is forensic logging/audit in mojaloop , is it related with securing the inter-operability platform](#31-is-forensic-loggingaudit-in-mojaloop--is-it-related-with-securing-the-inter-operability-platform)
* [How do the financial service providers connect with mojaloop](#32-how-do-the-financial-service-providers-connect-with-mojaloop)
* [Is there any open source ISO8583-OpenAPI converter/connector available](#33-is-there-any-open-source-iso8583-openapi-converterconnector-available)
* [How do I know the end points to setup postman for testing the deployment](#34-how-do-i-know-the-end-points-to-setup-postman-for-testing-the-deployment)
* [Why are there no reversals allowed on a Mojaloop](#35-why-are-there-no-reversals-allowed-on-a-mojaloop)
* [ffg. error with microk8s installation "MountVolume.SetUp failed"](#36-ffg-error-with-microk8s-installation-mountvolumesetup-failed)

#### 1. What is Mojaloop?
 
Mojaloop is open-source software for building interoperable digital payments platforms on a national scale. It makes it easy for different kinds of providers to link up their services and deploy low-cost financial services in new markets.

#### 2. How does it work?
 
Most digital financial providers run on their own networks, which prevents customers who use different services from transacting with each other. Mojaloop functions like a universal switchboard, routing payments securely between all customers, regardless of which network they're on. It consists of three primary layers, each with a specific function: an interoperability layer, which connects bank accounts, mobile money wallets, and merchants in an open loop; a directory service layer, which navigates the different methods that providers use to identify accounts on each side of a transaction; a transactions settlement layer, which makes payments instant and irrevocable; and components which protect against fraud.

#### 3. Who is it for?
  
There are many components to the code, and everyone either directly or indirectly working with digital financial transactions-fintech developers, bankers, entrepreneurs, startups-is invited to explore and use whatever parts are useful or appealing. The software as a whole is meant to be implemented on a national scale, and so it will be most applicable to mobile money providers, payments associations, central banks, and country regulators.

Developers at fintech and financial services companies can use the code in three ways: adapt the code to the financial services standards for a country, use the code to update their own products and services or create new ones, and improve the code by proposing updates and new versions of it for other users.

For example:

- A central bank may commission the use of the software by their commercial partners to speed up the deployment of a national payment gateway.
- A major payment processor can use the software to modernize their current offering, to achieve lower transaction costs without major R&D investments.
- A fintech startup can use the code to understand practically how to comply with interoperable payment APIs.
- A bank can use the code to modify their internal systems so that they easily interoperate with other payment providers.

#### 4. Why does it exist? 

Providers trying to reach developing markets with innovative, low-cost digital financial services have to build everything on their own. This raises costs and segregates services from each other. Mojaloop can be used as a foundation to help build interoperable platforms, lowering costs for providers and allowing them to integrate their services with others in the market.

#### 5. Who's behind it? 

Mojaloop was built in collaboration with a group of leading tech and fintech companies: [Ripple](https://github.com/ripple), [Dwolla](https://github.com/dwolla), [Software Group](http://www.softwaregroup-bg.com/), [ModusBox](http://www.modusbox.com/) and [Crosslake Technologies](http://www.crosslaketech.com/). Mojaloop was created by the Gates Foundation's Mojaloop, which is aimed at leveling the economic playing field by crowding in expertise and resources to build inclusive payment models to benefit the world's poor. It is free to the public as open-source software under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0).

#### 6. What platforms does Mojaloop run on? 

The Mojaloop platform was developed for modern cloud-computing environments. Open-source methods and widely used platforms, like Node.js, serve as the foundation layer for Mojaloop. The microservices are packaged in Docker and can be deployed to local hardware or to cloud computing environments like Amazon Web Services or Azure.

#### 7. Is it really open-source? 

Yes, it is really open-source. All core modules, documentation and white papers are available under a [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). Mojaloop relies on commonly used open-source software, including node.js, MuleCE, Java and PostgreSQL. Mojaloop also uses the [Interledger Protocol](https://github.com/interledger) to choreograph secure money transfers. The licenses for all of these platforms and their imported dependencies allow for many viable uses of the software.

#### 8. How can I contribute to Mojaloop?

You can contribute by helping us create new functionality on our roadmap or by helping us improve the platform. For our roadmap, go to the [Mojaloop Roadmap](../mojaloop-roadmap.md). We recommend starting with the onboarding guide and sample problem. This has been designed by the team to introduce the core ideas of the platform and software, the build methods, and our process for check-ins.

#### 9. What is supported?

Currently the Central ledger components are supported by the team. The DFSP components are outdated and thus the end-to-end environment and full setup is challenging to install.

#### 10. Can we connect directly to Pathfinder in a development environment?

For the local and test environment, we recommend interfacing with the 'mock-pathfinder' service instead. Pathfinder is a 'paid by usage' service. 

Access the https://github.com/mojaloop/mock-pathfinder repository to download and install mock-pathfinder. Run command npm install in mock-pathfinder directory to install dependencies after this update Database_URI in mock-pathfinder/src/lib/config.js.

#### 11. Should i register DFSP via url http://central-directory/commands/register or i need to update configuration in default.json?

You should register using the API provided, using postman or curl. Client is using LevelOne code. Needs to implement the current Mojaloop release with the current Postman scripts.

#### 12. Status of the pod pi3-kafka-0 is still on CrashLoopBackOff?

- More background related to the question:

  When I tired to get logs of the container centralledger-handler-admin-transfer, I get the following error:
  Error from server (BadRequest): container "centralledger-handler-admin-transfer" in pod "pi3-centralledger-handler-admin-transfer-6787b6dc8d-x68q9" is waiting to start: PodInitializing
  And the status of the pod pi3-kafka-0 is still on CrashLoopBackOff.
  I am using a vps on ubuntu 16.04 with RAM 12GB, 2vCores, 2.4GHz, Rom 50GB at OVH for the deployment.
    
Increased RAM to 24 MB and CPU to 4 resolved the issues. Appears to be a timeout on Zookeeper due depletion of available resources, resulting in the services shutting down.

#### 13. Why am I getting an error when we try to create new DFSP using Admin?

Please insure you are using the most current Postman scripts available on https://github.com/mojaloop/mock-pathfinder repository.
    
#### 14. Using Majaloop to do payment using crypto-currency?

Not with the current Specification and with this platform. Currently this is limited to currencies listed in the ISO 4217. Since the specification and platform is all about digital transfers, it should be possible to investigate a use-case for this possible requirement. Alternatively, I guess an FSP can provide that conversion (like many do already from crypto to one of the listed currencies).

#### 15.  Can I spread Mojaloop components over different physical machines and VM's?

You should be able to setup on different VM's or physical machines. The distribution pretty much depend on your requirements and would be implementation specific. We utilise Kubernetes to assist with the Container Orchestration. This enables us to schedule the deployments through the Kubernetes runtime to specific machines if required, and request specific resources if required. The helm charts in the helm repository could be used as guideline to how best allocate and group the components in your deployment. Naturally you would need to update the configurations to complement your custom implementation.

#### 16. Can we expect for tall the endpoints defined in the API document are implemented in Mojaloop?

The Mojaloop Specification API for transfers and the Mojaloop Open Source Switch implementation are independent streams, though obviously the implementation is based on the Specification. Based on the use-cases prioritized for a time-frame and based on the end-points needed to support those use-cases, implementation will be done. If a few end-points are not prioritized then implementation for them may not be available. However, I think the goal is to eventually support all the end-points specified though it may take time. Thanks for the collection. We do have some of these on the ‘postman’ repo in the mojaloop GitHub org.

#### 17. Does Mojaloop store the payment initiator FSP’s quote/status info?

At the moment, the Mojaloop Open source Switch implementation does *not* store Quotes related information. The onus is on the Payer, Payee involved in the process to store the relevant information.

#### 18. Does Mojaloop handle workflow validation?

Not at the moment, but this may happen in the future. Regarding correlating requests that are related to a specific transfer, you may look at the ‘transaction’ end-point/resource in the Specification for more information on this. In addition to this, I can convey that some background work is ongoing regarding the specification to make this correlation more straight-forward and simpler i.e., to correlate quote and transfer requests that come under a single transaction.

#### 19. How is the Mojaloop source accessible?

Here are some resources to start with:
1. Docs: https://github.com/mojaloop/documents. Note we are in the process to migrate from https://github.com/mojaloop/docs to https://github.com/mojaloop/documents.
2. Look at the repos that have “CORE COMPONENT (Mojaloop)” in the description and these are core components. “CORE RELATED (Mojaloop)” repos are the ones that are needed to support the current Mojaloop Switch implementation/deployment.
3. As a generic point of note, for latest code, please use the ‘develop’ branch for the time-being.
4. Current architecture: https://github.com/mojaloop/docs/tree/master/Diagrams/ArchitectureDiagrams. Please note that these are currently being migrated to https://github.com/mojaloop/documents.
5. You may use this for current deployment architecture and deployment information: https://github.com/mojaloop/documentation/tree/master/deployment-guide.

#### 20. How to register a new party in Mojaloop?

There is no  POST on /parties resource, as specified in section 6.1.1 of the API Defintion. Please refer to section: 6.2.2.3 POST /participants/<Type>/<ID> in the API Defintion.

” _The HTTP request POST /participants/<Type>/<ID> (or POST /participants/<Type>/<ID>/<SubId>) is used to create information on the server regarding the provided identity, defined by <Type>, <ID>, and optionally <SubId> (for example, POST_
  _/participants/MSISDN/123456789 or POST /participants/BUSINESS/shoecompany/employee1). See Section 5.1.6.11 for more information regarding addressing of a Party._ ”.
  
#### 21. Does the participant represent an account of a customer in a bank?

For more on this, please refer to this doc (Section 3..2): https://github.com/mojaloop/mojaloop-specification/blob/develop/Generic%20Transaction%20Patterns.pdf.
  
” _In the API, a Participant is the same as an FSP that is participating in an Interoperability Scheme. The primary purpose of the logical API resource Participants is for FSPs to find out in which other FSP a counterparty in an interoperable financial transaction is located. There are also services defined for the FSPs to provision information to a common system._ ”

In essence, a participant is any FSP participating in the Scheme (usually not a customer). For account lookup, a directory service such as *Pathfinder* can be used, which provides user lookup and the mapping. If such a directory service is not provided, an alternative is provided in the Specification, where the Switch hosts an Account Lookup Service (ALS) but to which the participants need to register parties. I addressed this earlier. But one thing to note here is that the Switch does not store the details, just the mapping between an ID and an FSP and then the calls to resolve the party are sent to that FSP. 

https://github.com/mojaloop/mojaloop-specification CORE RELATED (Mojaloop):

This repo contains the specification document set of the Open API for FSP Interoperability - mojaloop/mojaloop-specification.

#### 22. How to register _trusted_ payee to a payer, to skip OTP?

To skip the OTP, the initial request on the /transactionRequests from the Payee can be programmatically (or manually for that matter) made to be approved without the use of the /authorizations endpoint (that is need for OTP approval). Indeed the FSP needs to handle this, the Switch does not. This is discussed briefly in section 6.4 of the Specification.

#### 23. Receiving a 404 error when attempting to access or load kubernetes-dashboard.yaml file?

From the official kubernetes github repository in the README.md, the latest link to use is "https://raw.githubusercontent.com/kubernetes/dashboard/v1.10.1/src/deploy/recommended/kubernetes-dashboard.yaml". Be sure to always verify 3rd party links before implementing. Open source applications are always evolving.

#### 24. When installing nginx-ingress for load balancing & external access - Error: no available release name found?

Please have a look at the following addressing a similar issue. To summarise - it is most likely an RBAC issue. Have a look at the documentation to set up Tiller with RBAC. https://docs.helm.sh/using_helm/#role-based-access-control goes into detail about this. The issue logged: helm/helm#3839.

#### 25. Received "ImportError: librdkafka.so.1: cannot open shared object file: No such file or directory" when running `npm start' command.

Found a solution here https://github.com/confluentinc/confluent-kafka-python/issues/65#issuecomment-269964346
GitHub
ImportError: librdkafka.so.1: cannot open shared object file: No such file or directory · Issue #65 · confluentinc/confluent-kafka-python
Ubuntu 14 here, pip==7.1.2, setuptools==18.3.2, virtualenv==13.1.2. First, I want to build latest stable (seems it&#39;s 0.9.2) librdkafka into /opt/librdkafka. curl https://codeload.github.com/ede...

Here are the steps to rebuild librdkafka:

git clone https://github.com/edenhill/librdkafka && cd librdkafka && git checkout <commit_sha>

cd librdkafka && ./configure && make && make install && ldconfig

After that I'm able to import stuff without specifying LD_LIBRARY_PATH.
GitHub
edenhill/librdkafka
The Apache Kafka C/C++ library. Contribute to edenhill/librdkafka development by creating an account on GitHub.

#### 26. Can we use mojaloop as open-source mobile wallet software or mojaloop does interoperability only?

We can use mojaloop for interoperability to support mobile wallet and other such money transfers. This is not a software for a DFSP (there are open source projects that cater for these such as Finserv etc). Mojaloop is for a Hub/Switch primarily and an API that needs to be implemented by a DFSP. But this is not for managing mobile wallets as such.

#### 27. Describe companies that helps to deploy & support for mojaloop?

Mojaloop is an open source software and specification.

#### 28. Can you say something about mojaloop & security?

The Specification is pretty standard and has good security standards. But these need to be implemented by the adopters and deployers. Along with this, the security measures need to be coupled with other Operational and Deployment based security measures. Moreover, the coming few months will focus on security perspective for the Open Source community.

#### 29. What are the benefit(s) from using mojaloop as interoperabilty platform?

Benefits: Right now for example, an Airtel mobile money user can transfer to another Airtel mobile money user only. With this, he/she can transfer to any Financial service provider such as another mobile money provider or any other bank account or Merchant that is connected to the Hub, irrespective of their implementation. They just need to be connected to the same Switch. Also, this is designed for feature phones so everyone can use it.

#### 30. What are the main challenges that companies face using mojaloop?

At this point, the main challenges are around expectations. Expectations of the adopters of mojaloop and what really mojaloop is. A lot of adopters have different understanding of what mojaloop is and about its capabilities. If they have a good understanding, a lot of current challenges are mitigated..
Yes, forensic logging is a security measure as well for auditing purposes which will ensure there is audit-able log of actions and that everything that is a possible action of note is logged and rolled up, securely after encryption at a couple of levels.

#### 31. Is forensic logging/audit in mojaloop , is it related with securing the inter-operability platform?

This also ensures all the services always run the code they’re meant to run and anything wrong/bad is stopped from even starting up. Also, for reporting and auditors, reports can have a forensic-log to follow.

#### 32. How do the financial service providers connect with mojaloop?

There is an architecture diagram that presents a good view of the integration between the different entities. https://github.com/mojaloop/docs/blob/master/Diagrams/ArchitectureDiagrams/Arch-Flows.svg.

#### 33. Is there any open source ISO8583-OpenAPI converter/connector available?

I don't believe a generic ISO8583 <-> Mojaloop integration is available currently. We're working on some "traditional payment channel" to Mojaloop integrations (POS and ATM) which we hope to demo at the next convening. These would form the basis for an ISO8583 integration we might build and add to the OSS stack but bare in mind that these integrations will be very use case specific.

#### 34. How do I know the end points to setup postman for testing the deployment?

On the Kubernetes dashboard, select the correct NAMESPACE. Go to Ingeresses. Depending on how you deployed the helm charts, look for 'moja-centralledger-service'. Click on edit, and find the tag <HOST>. This would contain the endpoint for this service.

#### 35. Why are there no reversals allowed on a Mojaloop?

*Irrevocability* is a core Level One Principle (edited) and not allowing reversals is essential for that. Here is the section from the API Definition addressing this:

_*6.7.1.2 Transaction Irrevocability*_
_The API is designed to support irrevocable financial transactions only; this means that a financial transaction cannot be changed, cancelled, or reversed after it has been created. This is to simplify and reduce costs for FSPs using the API. A large percentage of the operating costs of a typical financial system is due to reversals of transactions._
_As soon as a Payer FSP sends a financial transaction to a Payee FSP (that is, using POST /transfers including the end-to-end financial transaction), the transaction is irrevocable from the perspective of the Payer FSP. The transaction could still be rejected in the Payee FSP, but the Payer FSP can no longer reject or change the transaction. An exception to this would be if the transfer’s expiry time is exceeded before the Payee FSP responds (see Sections 6.7.1.3 and 6.7.1.5 for more information). As soon as the financial transaction has been accepted by the Payee FSP, the transaction is irrevocable for all parties._

However, *Refunds* is a use case supported by the API.

#### 36. ffg. error with microk8s installation "MountVolume.SetUp failed"?

Would appear if it is a space issue, but more the 100GiB of EBS storage was allocated.
The issue resolved itself after 45 minutes. Initial implementation of the mojaloop project can take a while to stabilize.

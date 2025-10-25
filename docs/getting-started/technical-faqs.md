# Technical FAQs

This document contains some of the frequently asked technical questions from the community.

## 1. What is supported?

Currently the Central ledger components are supported by the team. The DFSP components are outdated and thus the end-to-end environment and full setup is challenging to install.

## 2. Can we connect directly to Pathfinder in a development environment?

For the local and test environment, we recommend interfacing with the 'mock-pathfinder' service instead. Pathfinder is a 'paid by usage' service. 

Access the https://github.com/mojaloop/mock-pathfinder repository to download and install mock-pathfinder. Run command npm install in mock-pathfinder directory to install dependencies after this update Database_URI in mock-pathfinder/src/lib/config.js.

## 3. Should I register DFSP via url http://central-directory/commands/register or I need to update configuration in default.json?

You should register using the API provided, using postman or curl. Client is using LevelOne code. Needs to implement the current Mojaloop release with the current Postman scripts.

## 4. Status of the pod pi3-kafka-0 is still on CrashLoopBackOff?

- More background related to the question:

  When I tried to get logs of the container centralledger-handler-admin-transfer, I get the following error:
  Error from server (BadRequest): container "centralledger-handler-admin-transfer" in pod "pi3-centralledger-handler-admin-transfer-6787b6dc8d-x68q9" is waiting to start: PodInitializing
  And the status of the pod pi3-kafka-0 is still on CrashLoopBackOff.
  I am using a vps on ubuntu 16.04 with RAM 12GB, 2vCores, 2.4GHz, Rom 50GB at OVH for the deployment.
    
Increased RAM to 24 GB and CPU to 4 resolved the issues. Appears to be a timeout on Zookeeper due depletion of available resources, resulting in the services shutting down.

## 5. Why am I getting an error when we try to create new DFSP using Admin?

Please insure you are using the most current Postman scripts available on https://github.com/mojaloop/mock-pathfinder repository.


## 6.  Can I spread Mojaloop components over different physical machines and VM's?

You should be able to setup on different VM's or physical machines. The distribution pretty much depend on your requirements and would be implementation specific. We utilise Kubernetes to assist with the Container Orchestration. This enables us to schedule the deployments through the Kubernetes runtime to specific machines if required, and request specific resources if required. The helm charts in the helm repository could be used as guideline to how best allocate and group the components in your deployment. Naturally you would need to update the configurations to complement your custom implementation.

## 7. Can we expect all the endpoints defined in the API document are implemented in Mojaloop?

The Mojaloop Specification API for transfers and the Mojaloop Open Source Switch implementation are independent streams, though obviously the implementation is based on the Specification. Based on the use-cases prioritized for a time-frame and based on the end-points needed to support those use-cases, implementation will be done. If a few end-points are not prioritized then implementation for them may not be available. However, I think the goal is to eventually support all the end-points specified though it may take time. Thanks for the collection. We do have some of these on the ‘postman’ repo in the mojaloop GitHub org.

## 8. Does Mojaloop store the payment initiator FSP’s quote/status info?

At the moment, the Mojaloop Open source Switch implementation does *not* store Quotes related information. The onus is on the Payer, Payee involved in the process to store the relevant information.

## 9. Does Mojaloop handle workflow validation?

Not at the moment, but this may happen in the future. Regarding correlating requests that are related to a specific transfer, you may look at the ‘transaction’ end-point/resource in the Specification for more information on this. In addition to this, I can convey that some background work is ongoing regarding the specification to make this correlation more straight-forward and simpler i.e., to correlate quote and transfer requests that come under a single transaction.


## 10. How to register a new party in Mojaloop?

There is no  POST on /parties resource, as specified in section 6.1.1 of the API Defintion. Please refer to section: 6.2.2.3 `POST /participants/<Type>/<ID>` in the API Defintion.

” _The HTTP request `POST /participants/<Type>/<ID>` (or `POST /participants/<Type>/<ID>/<SubId>`) is used to create information on the server regarding the provided identity, defined by `<Type>`, `<ID>`, and optionally `<SubId>` (for example, POST_
  _/participants/MSISDN/123456789 or POST /participants/BUSINESS/shoecompany/employee1). See Section 5.1.6.11 for more information regarding addressing of a Party._ ”.
  
## 11. Does the participant represent an account of a customer in a bank?

For more on this, please refer to this doc (Section 3..2): https://github.com/mojaloop/mojaloop-specification/blob/develop/Generic%20Transaction%20Patterns.pdf.
  
” _In the API, a Participant is the same as an FSP that is participating in an Interoperability Scheme. The primary purpose of the logical API resource Participants is for FSPs to find out in which other FSP a counterparty in an interoperable financial transaction is located. There are also services defined for the FSPs to provision information to a common system._ ”

In essence, a participant is any FSP participating in the Scheme (usually not a customer). For account lookup, a directory service such as *Pathfinder* can be used, which provides user lookup and the mapping. If such a directory service is not provided, an alternative is provided in the Specification, where the Switch hosts an Account Lookup Service (ALS) but to which the participants need to register parties. I addressed this earlier. But one thing to note here is that the Switch does not store the details, just the mapping between an ID and an FSP and then the calls to resolve the party are sent to that FSP. 

https://github.com/mojaloop/mojaloop-specification CORE RELATED (Mojaloop):

This repo contains the specification document set of the Open API for FSP Interoperability - mojaloop/mojaloop-specification.

## 12. How to register _trusted_ payee to a payer, to skip OTP?

To skip the OTP, the initial request on the /transactionRequests from the Payee can be programmatically (or manually for that matter) made to be approved without the use of the /authorizations endpoint (that is need for OTP approval). Indeed the FSP needs to handle this, the Switch does not. This is discussed briefly in section 6.4 of the Specification.

## 13. Receiving a 404 error when attempting to access or load kubernetes-dashboard.yaml file?

From the official kubernetes github repository in the README.md, the latest link to use is "https://raw.githubusercontent.com/kubernetes/dashboard/v1.10.1/src/deploy/recommended/kubernetes-dashboard.yaml". Be sure to always verify 3rd party links before implementing. Open source applications are always evolving.

## 14. When installing nginx-ingress for load balancing & external access - Error: no available release name found?

Please have a look at the following addressing a similar issue. To summarise - it is most likely an RBAC issue. Have a look at the documentation to set up Tiller with RBAC. https://docs.helm.sh/using_helm/#role-based-access-control goes into detail about this. The issue logged: helm/helm#3839.

## 15. Received "ImportError: librdkafka.so.1: cannot open shared object file: No such file or directory" when running `npm start' command.

Found a solution here https://github.com/confluentinc/confluent-kafka-python/issues/65#issuecomment-269964346
GitHub
ImportError: librdkafka.so.1: cannot open shared object file: No such file or directory · Issue #65 · confluentinc/confluent-kafka-python
Ubuntu 14 here, pip==7.1.2, setuptools==18.3.2, virtualenv==13.1.2. First, I want to build latest stable (seems it&#39;s 0.9.2) librdkafka into /opt/librdkafka. curl https://codeload.github.com/ede...

Here are the steps to rebuild librdkafka:

git clone https://github.com/edenhill/librdkafka && cd librdkafka && git checkout `<commit_sha>

cd librdkafka && ./configure && make && make install && ldconfig

After that I'm able to import stuff without specifying LD_LIBRARY_PATH.
GitHub
edenhill/librdkafka
The Apache Kafka C/C++ library. Contribute to edenhill/librdkafka development by creating an account on GitHub.

## 16. Can we use mojaloop as open-source mobile wallet software or mojaloop does interoperability only?

We can use mojaloop for interoperability to support mobile wallet and other such money transfers. This is not a software for a DFSP (there are open source projects that cater for these such as Finserv etc). Mojaloop is for a Hub/Switch primarily and an API that needs to be implemented by a DFSP. But this is not for managing mobile wallets as such.

## 17. Describe companies that helps to deploy & support for mojaloop?

Mojaloop is an open source software and specification.

## 18. Can you say something about mojaloop & security?

The Specification is pretty standard and has good security standards. But these need to be implemented by the adopters and deployers. Along with this, the security measures need to be coupled with other Operational and Deployment based security measures. Moreover, the coming few months will focus on security perspective for the Open Source community.

## 19. What are the benefit(s) from using mojaloop as interoperability platform?

Benefits: Right now for example, an Airtel mobile money user can transfer to another Airtel mobile money user only. With this, he/she can transfer to any Financial service provider such as another mobile money provider or any other bank account or Merchant that is connected to the Hub, irrespective of their implementation. They just need to be connected to the same Switch. Also, this is designed for feature phones so everyone can use it.

## 20. What are the main challenges that companies face using mojaloop?

At this point, the main challenges are around expectations. Expectations of the adopters of mojaloop and what really mojaloop is. A lot of adopters have different understanding of what mojaloop is and about its capabilities. If they have a good understanding, a lot of current challenges are mitigated..
Yes, forensic logging is a security measure as well for auditing purposes which will ensure there is audit-able log of actions and that everything that is a possible action of note is logged and rolled up, securely after encryption at a couple of levels.

## 21. Is forensic logging/audit in mojaloop , is it related with securing the inter-operability platform?

This also ensures all the services always run the code they’re meant to run and anything wrong/bad is stopped from even starting up. Also, for reporting and auditors, reports can have a forensic-log to follow.

## 22. How do the financial service providers connect with mojaloop?

There is an architecture diagram that presents a good view of the integration between the different entities. https://github.com/mojaloop/docs/blob/master/Diagrams/ArchitectureDiagrams/Arch-Flows.svg.

## 23. Is there any open source ISO8583-OpenAPI converter/connector available?

I don't believe a generic ISO8583 `<-> Mojaloop integration is available currently. We're working on some "traditional payment channel" to Mojaloop integrations (POS and ATM) which we hope to demo at the next convening. These would form the basis for an ISO8583 integration we might build and add to the OSS stack but bare in mind that these integrations will be very use case specific.

## 24. How do I know the end points to setup postman for testing the deployment?

On the Kubernetes dashboard, select the correct NAMESPACE. Go to Ingeresses. Depending on how you deployed the helm charts, look for 'moja-centralledger-service'. Click on edit, and find the tag `<HOST>`. This would contain the endpoint for this service.

If you use the CLI, find the 'Host' column in `kubectl describe ingress moja-centralledger-service`

## 25. Why are there no reversals allowed on a Mojaloop?

*Irrevocability* is a core Level One Principle (edited) and not allowing reversals is essential for that. Here is the section from the API Definition addressing this:

_*6.7.1.2 Transaction Irrevocability*_
_The API is designed to support irrevocable financial transactions only; this means that a financial transaction cannot be changed, cancelled, or reversed after it has been created. This is to simplify and reduce costs for FSPs using the API. A large percentage of the operating costs of a typical financial system is due to reversals of transactions._
_As soon as a Payer FSP sends a financial transaction to a Payee FSP (that is, using POST /transfers including the end-to-end financial transaction), the transaction is irrevocable from the perspective of the Payer FSP. The transaction could still be rejected in the Payee FSP, but the Payer FSP can no longer reject or change the transaction. An exception to this would be if the transfer’s expiry time is exceeded before the Payee FSP responds (see Sections 6.7.1.3 and 6.7.1.5 for more information). As soon as the financial transaction has been accepted by the Payee FSP, the transaction is irrevocable for all parties._

However, *Refunds* is a use case supported by the API.

## 26. ffg. error with microk8s installation "MountVolume.SetUp failed"?

Would appear if it is a space issue, but more the 100GiB of EBS storage was allocated.
The issue resolved itself after 45 minutes. Initial implementation of the mojaloop project can take a while to stabilize.

## 27. Why am I getting this error when trying to create a participant: "Hub reconciliation account for the specified currency does not exist"?

You need to create the corresponding Hub accounts (HUB_MULTILATERAL_SETTLEMENT and HUB_RECONCILIATION) for the specified currency before setting up the participants. 
In this Postman collection you can find the requests to perform the operation in the "Hub Account" folder: https://github.com/mojaloop/postman/blob/master/OSS-New-Deployment-FSP-Setup.postman_collection.json

Find also the related environments in the Postman repo: https://github.com/mojaloop/postman

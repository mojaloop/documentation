# Questions and Feedback

This document is a summary of questions from the community and the feedback provided.

### 1. Attempting to connect directly to the 'live' pathfinder

  - **Communication Channel**
  
    mojaloop/pathfinder-query-client repository - issue #10.

  - **Community Question**
  
    Client attempting to connect directly to the 'live' pathfinder.

  - **Relevant Notes**
  
     If inteface with 'Live' pathfinder, insure you on the whitelist. Fir the local and test environment, we recommend interfacing with the 'mock-pathfinder' service instead. Pathfinder is a 'paid by usage' service in the 'Live' environment.

  - **Reply**
  
    Appropriate documentation is available in the mojaloop/mock-pathfinder repository to download and install mock-pathfinder. Run command npm install in mock-pathfinder directory to install dependencies after this update Database_URI in mock-pathfinder/src/lib/config.js.

### 2. The source IP is not authorized to access Pathfinder

  - **Communication Channel**
  
    mojaloop/central-directory repository - issue #217.

  - **Community Question**
  
    i'm trying to configure leveloneproject in windows, now i'm stuck at this error:
    'The source IP is not authorized to access Pathfinder' at
    'C:/Central-Directory/node_modules/@leveloneproject/pathfinder-query-client/src/client.js:64:23'.
    I try to solve this and only get 1 point and that is 'You must have setup connection to the @LevelOneProject npm repo on JFrog in order to install.' now i can't understand how to create setup connection.

  - **Relevant Notes**
  
    Duplication of Issue #10 in the pathfinder-query-client. Client should be using the mock-pathfinder service.
    
  - **Reply**

    Client should be using the 'mock-pathfinder service.
    
### 3. Error at Central-Directory/src/domain/dfsp/index.js

  - **Communication Channel**
  
    mojaloop/dfsp repository - issue #18.

  - **Community Question**

    I'm getting this error at Central-Directory/src/domain/dfsp/index.js:55:56 to resolve this, should i register DFSP via url http://central-directory/commands/register or i need to update configuration in default.json
    
    i did register and also checked in db, but now i'm getting this error Unhandled rejection Error: Undefined binding(s) detected when compiling SELECT query: select * from "dfsps" where "dfspSchemeIdentifier" = ? at Central-Directory/node_modules/knex/lib/query/compiler.js
    
    My findings:
    credentials.dfspSchemeIdentifier is undefined at Central-Directory/src/api/resources/handler.js& when i replace this credentials.dfspSchemeIdentifier by 233 (dfspSchemeIdentifier present on db) then it added user successfully but i can't use all options like Manage Phone, Send Money Please help.
    
    Note: i'm using old leveloneproject.
    
  - **Relevant Notes**

    Client is using LevelOne code. Needs to implement the current Mojaloop release with the current Postman scripts.
    
  - **Reply**

    You should register using the API provided, using postman or curl.
    
### 4. Status of the pod pi3-kafka-0 is still on CrashLoopBackOff

  - **Communication Channel**
  
    Slack mojaloop general channel.

  - **Community Question**

    I installed the version 4.0.1 of the mojaloop chart (with helm). But the status of 8 pods are on init 0/1. With the previous version (3.8.7) 7 pods were on init 0/1. Would this be due to the version of the mojaloop chart installed? If so, can you send me the stable version? Also there are 6 pods (handlers) that are always on init 0/1 whatever the version installed. The containers of these pods had status pending. And in the logs of the init-container of one of these pods I have the following repetitive error:
    [2018-12-07 14: 50: 58,414] WARN [Client NetworkClientId = admin-1] Connection to node -1 could not be established. Broker may not be available. (Org.apache.kafka.clients.NetworkClient)
    Exception in thread "main" java.lang.RuntimeException: Request METADATA failed on list (pi3-kafka: 9092 (id: -1 rack: null))
    at kafka.admin.AdminClient.kafka $ admin $ AdminClient $$ sendAnyNode (AdminClient.scala: 105)
    at kafka.admin.AdminClient.findAllBrokers (AdminClient.scala: 163)
    at kafka.admin.AdminClient.awaitBrokers (AdminClient.scala: 154)
    at kafka.admin.BrokerApiVersionsCommand $ .execute (BrokerApiVersionsCommand.scala: 42)
    at kafka.admin.BrokerApiVersionsCommand $ .main (BrokerApiVersionsCommand.scala: 36)
    at kafka.admin.BrokerApiVersionsCommand.main (BrokerApiVersionsCommand.scala)
    waiting for Kafka
    When I tired to get logs of the container centralledger-handler-admin-transfer, I get the following error:
    Error from server (BadRequest): container "centralledger-handler-admin-transfer" in pod "pi3-centralledger-handler-admin-transfer-6787b6dc8d-x68q9" is waiting to start: PodInitializing
    And the status of the pod pi3-kafka-0 is still on CrashLoopBackOff.
    I am using a vps on ubuntu 16.04 with RAM 12GB, 2vCores, 2.4GHz, Rom 50GB at OVH for the deployment.

  - **Relevant Notes**

    Appears to be a timeout on Zookeeper resulting in the services shutting down.
    
  - **Reply**

    Increased RAM to 24 MB and CPU to 4 resolved the issues.
    
### 5. Unable to create new DFSP

  - **Communication Channel**
  
    mojaloop/project repository - issue #543.

  - **Community Question**

    Unable to create new DFSP
    GCP
    Helm 4.1
    Getting an error when we try to create new DFSP using Admin (using postman json test script).
    Similar to issue #504
    Error message
    "{"id":"BadRequestError","message":"Cannot read property 'findOne' of undefined"}"
    
  - **Relevant Notes**

  - **Reply**

    Postman scripts are to be updated to cater for new release.
    
### 6. Using Majaloop to do payment using crypto-currency

  - **Communication Channel**
  
    Slack mojaloop general channel.

  - **Community Question**

    Can we use Majaloop to do payment using crypto-currency?
    
  - **Relevant Notes**

    There some concerns pertaining to money laundering activities associated with crypto-currencies.

  - **Reply**

    Not with the current Specification and with this platform.. currently this is limited to currencies listed in the ISO 4217.
    But I guess it can be done, since the specification and platform is all about digital transfers; alternatively I guess an FSP can provide that conversion ( like many do already from crypto to one of the listed currencies).

### 7.  Can I spread Mojaloop components over different local machines

  - **Communication Channel**
  
    Slack mojaloop general channel.

  - **Community Question**

    How I can spread Mojaloop components over diffirent local machines. For example 4 machines for Majloop core, IST and two DFSPs?
    
  - **Relevant Notes**

    We utilise Kubernetes to assist with the Container Orchestration. This enables us to schedule the deployments through the Kubernetes runtime to specific machines if required, and request specific resources if required.
    
  - **Reply**

    We are currently using containers. You should be able to setup on different VM's or physical machines. The distribution would pretty much depend on your requirements and would be implementation specific. The helm charts in the helm repository could be used as guideline to how best allocate and group the components in your deployment. Naturally you would need to update the configurations to complement your custom implementation.
    
### 8. Can we expect all the endpoints defined in the API document are implemented in Mojaloop

  - **Communication Channel**
  
    Slack mojaloop general channel.

  - **Community Question**

    There are several endpoints defined in the API documentation. Can we expect that all of them are implemented in Mojaloop? In the Demo Postman (https://documenter.getpostman.com/view/218620/RWaKRTfp) only some of them are shown.
    We have created a collection, to make it easy to mark, which one is implemented.
    https://docs.google.com/spreadsheets/d/1xQyCAUA1qqF0sjB8gMA2sdsW5yZtDQUi6MkrOpjz4l0/edit?usp=sharing
    documenter.getpostman.com
    Mojaloop PI3.5 Demo
    Postman Collection for Mojaloop v3.5.0
    
  - **Relevant Notes**

  - **Reply**

    The Mojaloop Specification API for transfers and the Mojaloop Open Source Switch implementation are independent streams, though obviously the implementation is based on the Specification.
    Based on the use-cases prioritized for a time-frame and based on the end-points needed to support those use-cases, implementation will be done. If a few end-points are not prioritized then implementation for them may not be available.. However, I think the goal is to eventually support all the end-points specified though it may take time.
    Thanks for the collection. We do have some of these on the ‘postman’ repo in the mojaloop GitHub org.

### 9. Does Mojaloop store the payment initiator FSP’s quote/status info

  - **Communication Channel**
  
    Slack mojaloop general channel.

  - **Community Question**

    Does Mojaloop store the payment initiator FSP’s quote/status infos? We suppose it does not, so the payment initiator should store these information about a transaction, if necessary.
    
  - **Relevant Notes**

    To avoid ambiguity, please use the terms supported in the Specification..
    Do you mean a Payer makes a GET call to the Switch on /quotes/<ID> ? The Switch just should forward it to the other FSP involved in the transaction.

  - **Reply**

    At the moment, the Mojaloop Open source Switch implementation does *not* store Quotes related information. The onus is on the Payer, Payee involved in the process to store the relevant information.

### 10. Does Mojaloop handle workflow validation

  - **Communication Channel**
  
    Slack mojaloop general channel.

  - **Community Question**

    Does Mojaloop handle workflow validation? So e.g. does it allow to call a quote after transfer, or transfer without quote regarding to the same transaction? Is there a solution in Mojaloop that correlates the requests that are related to a specific transfer?

  - **Relevant Notes**

  - **Reply**

    Not at the moment, but this may happen in the future.
    Regarding correlating requests that are related to a specific transfer, you may look at the ‘transaction’ end-point/resource in the Specification for more information on this.
    In addition to this, I can convey that some background work is ongoing regarding the specification to make this correlation more straight-forward and simpler i.e., to correlate quote and transfer requests that come under a single transaction.

### 11. How is the Mojaloop source accessible

  - **Communication Channel**
  
    Slack mojaloop general channel.

  - **Community Question**

    Can we access the source of Mojaloop? In the repositories we saw only almost empty branches - did we find an incorrect repo? (Repositories in https://github.com/mojaloop)
    GitHub
    Mojaloop
    Open source software for creating payment platforms that will help unbanked people access digital financial services; Please see the mojaloop repo to contribute - Mojaloop

  - **Relevant Notes**
    
  - **Reply**

    Here are some resources to start with:
    1. Docs: https://github.com/mojaloop/docs
    2. Look at the repos that have “CORE COMPONENT (Mojaloop)” in the description and these are core components. “CORE RELATED (Mojaloop)” repos are the ones that are needed to support the current Mojaloop Switch implementation/deployment.
    3. As a generic point of note, for latest code, please use the ‘develop’ branch for the time-being.
    4. Current architecture: https://github.com/mojaloop/docs/tree/master/Diagrams/ArchitectureDiagrams
    5. You may use this for current deployment architecture and deployment information: https://github.com/mojaloop/docs/blob/master/WorkShops/Presentations/Mojaloop_Phase2_Wrap-up_Deployment-Day3_V2.0-published.pdf

### 12. How to register a new party in Mojaloop

  - **Communication Channel**
  
    Slack mojaloop general channel.

  - **Community Question**

     Create new party: how to register a new party in Mojaloop? We cannot see a POST party message.
     
  - **Relevant Notes**

  - **Reply**

    There is no  POST on /parties resource, as specified in section 6.1.1 of the API Defintion.
    Please refer to section: 6.2.2.3 POST /participants/<Type>/<ID> in the API Defintion
    ” _The HTTP request POST /participants/<Type>/<ID> (or POST /participants/<Type>/<ID>/<SubId>) is used to create information on the server regarding the provided identity, defined by <Type>, <ID>, and optionally <SubId> (for example, POST_
    _/participants/MSISDN/123456789 or POST /participants/BUSINESS/shoecompany/employee1). See Section 5.1.6.11 for more information regarding addressing of a Party._ ”
    
### 13. Does the participant represent an account of a customer in a bank

  - **Communication Channel**
  
    Slack mojaloop general channel.

  - **Community Question**

    Does the participant represent an account of a customer in a bank? Or just a customer? We would like to have the mapping between e.g. a phone number and an account ID of a customer. How to resolve this? Is the FSP needed to resolve the exact account number during lookup, or Mojaloop have these info? If Mojaloop has these info, how is it registered? When a new (saving, chequing) account is registered for a customer, an ID of it should be sent to Mojaloop by the FSP?
    
  - **Relevant Notes**

  - **Reply**

    For more on this, please refer to this doc (Section 3..2): https://github.com/mojaloop/mojaloop-specification/blob/develop/Generic%20Transaction%20Patterns.pdf
    ” _In the API, a Participant is the same as an FSP that is participating in an Interoperability Scheme. The primary purpose of the logical API resource Participants is for FSPs to find out in which other FSP a counterparty in an interoperable financial transaction is located. There are also services defined for the FSPs to provision information to a common system._ ”
    In essence, a participant is any FSP participating in the Scheme (usually not a customer). For account lookup, a directory service such as *Pathfinder* can be used, which provides user lookup and the mapping. If such a directory service is not provided, an alternative is provided in the Specification, where the Switch hosts an Account Lookup Service (ALS) but to which the participants need to register parties. I addressed this earlier.
    But one thing to note here is that the Switch does not store the details, just the mapping between an ID and an FSP and then the calls to resolve the party are sent to that FSP.
    GitHub
    mojaloop/mojaloop-specification
    CORE RELATED (Mojaloop):This repo contains the specification document set of the Open API for FSP Interoperability - mojaloop/mojaloop-specification

### 14. How to register _trusted_ payee to a payer, to skip OTP

  - **Communication Channel**
  
    Slack mojaloop general channel.

  - **Community Question**

    How to register _trusted_ (the Payer has pre-approved the Payee in the Payer FSP) payee to a payer, to skip OTP? Does the payer FSP has to store this information, or Mojaloop does?
    
  - **Relevant Notes**

  - **Reply**

    To skip the OTP, the initial request on the /transactionRequests from the Payee can be programmatically (or manually for that matter) made to be approved without the use of the /authorizations endpoint (that is need for OTP approval). Indeed the FSP needs to handle this, the Switch does not. This is discussed briefly in section 6.4 of the Specification.

### 15. Invalid link to 3rd party software

  - **Communication Channel**
  
    Slack mojaloop general channel.

  - **Community Question**

    Outdated link for kubernetes dashboard.
    
    The _Mojaloop_Phase2_Wrap-up_Deployment-Day3_V2.0-published.pdf_ contains an link to a Kubernetes yaml (Mojaloop_Phase2_Wrap-up_Deployment-Day3_V2.0-published.pdf).
    FYI, The file has been moved in the Kubernetes repository in december, so when the mentioned command is run, it gives 404 error.
    The new place of the file is: https://raw.githubusercontent.com/kubernetes/dashboard/master/aio/deploy/recommended/kubernetes-dashboard.yaml

  - **Relevant Notes**

    Be sure to always verify 3rd party links before implementing. Open source applications are always evolving.
    
  - **Reply**

    From the official kubernetes github repository in the README.md, the latest link to use is "https://raw.githubusercontent.com/kubernetes/dashboard/v1.10.1/src/deploy/recommended/kubernetes-dashboard.yaml".
    
### 16. Challenges "Install nginx-ingress for load balancing & external access"

  - **Communication Channel**
  
    mojaloop/project repository - issue #548.

  - **Community Question**

    Issue with "Install nginx-ingress for load balancing & external access".
    
    While trying to run the helm --namespace kube-public install stable/nginx-ingress command as part of inginx/ingress installation on GCloud, we get the following error:
    renjith@cloudshell:~ (mojaloop-prod)$ helm --namespace kube-public install stable/nginx-ingress
    Error: no available release name found.
    
  - **Relevant Notes**

  - **Reply**

    Please have a look at the following addressing a similar issue. To summarise - it is most likely an RBAC issue. Have a look at the documentation to set up Tiller with RBAC. https://docs.helm.sh/using_helm/#role-based-access-control goes into detail about this.
    The issue logged: helm/helm#3839.
    
### 17. Error when running the api `npm start:api`

  - **Communication Channel**
  
    mojaloop/dfsp repository - issue #18.

  - **Community Question**

    hi I am trying to run central_ledger on aws ubuntu  instance, everything seems to  install properly, however when I start the api `npm start:api` I get this error
    ```text
    2019-01-23T11:49:55.152Z - info: {"admin":{"handler":{}},"positions":{"handler":{}},"timeouts":{"handler":{}},"transfers":{"handler":{}}}
    2019-01-23T11:49:55.153Z - info: Registering handler module[admin]: {"handler":{}}
    2019-01-23T11:49:55.153Z - info: {}
    2019-01-23T11:49:55.155Z - info: CreateHandle::connect - creating Consumer for topics: [topic-admin-transfer]
    Segmentation fault (core dumped)
    ```
    `npm start:admin` runs without any errors.
  - **Relevant Notes**

  - **Reply**

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

### 18. Can we use mojaloop as open-source mobile wallet software

  - **Communication Channel**
  
    Slack mojaloop general channel.

  - **Community Question**

    Can we use mojaloop as open-source mobile wallet software or mojaloop does interoperability only?

  - **Relevant Notes**

  - **Reply**

    We can use mojaloop for interoperability to support mobile wallet and other such money transfers. This is not a software for a DFSP (there are open source projects that cater for these such as Finserv etc). Mojaloop is for a Hub/Switch primarily and an API that needs to be implemented by a DFSP. But this is not for managing mobile wallets as such.

### 19. Describe companies that helps to deploy & support for mojaloop

  - **Communication Channel**
  
    Slack mojaloop general channel.

  - **Community Question**

    Can you describe companies that helps to deploy & support for mojaloop?

  - **Relevant Notes**

  - **Reply**

    Mojaloop is an open source software and specification.

### 20. something about mojaloop & security

  - **Communication Channel**
  
    Slack mojaloop general channel.

  - **Community Question**

    Can you say something about mojaloop & security?

  - **Relevant Notes**

  - **Reply**

    The Specification is pretty standard and has good security standards. But these need to be implemented by the adopters and deployers. Along with this, the security measures need to be coupled with other Operational and Deployment based security measures. Moreover, the coming few months will focus on security perspective for the Open Source community.

### 21. Benefit from using mojaloop as interoperabilty platform

  - **Communication Channel**
  
    Slack mojaloop general channel.

  - **Community Question**

    Can you say benefit from using mojaloop as interoperabilty platform?

  - **Relevant Notes**

  - **Reply**

    Benefits: Right now for example, an Airtel mobile money user can transfer to another Airtel mobile money user only. With this, he/she can transfer to any Financial service provider such as another mobile money provider or any other bank account or Merchant that is connected to the Hub, irrespective of their implementation. They just need to be connected to the same Switch. Also, this is designed for feature phones so everyone can use it.

### 22. Main challenges that companies face using mojaloop

  - **Communication Channel**
  
    Slack mojaloop general channel.

  - **Community Question**

    What are the main challenges that companies face using mojaloop?
    
  - **Relevant Notes**

  - **Reply**

    At this point, the main challenges are around expectations. Expectations of the adopters of mojaloop and what really mojaloop is. A lot of adopters have different understanding of what mojaloop is and about its capabilities. If they have a good understanding, a lot of current challenges are mitigated..
    Yes, forensic logging is a security measure as well for auditing purposes which will ensure there is audit-able log of actions and that everything that is a possible action of note is logged and rolled up, securely after encryption at a couple of levels.

### 23. Something about forensic logging/audit in mojaloop

  - **Communication Channel**
  
    Slack mojaloop general channel.

  - **Community Question**

    Could you say something about forensic logging/audit in mojaloop , is it related with securing the inter-operability platform?

  - **Relevant Notes**

  - **Reply**

    This also ensures all the services always run the code they’re meant to run and anything wrong/bad is stopped from even starting up.. Also, for reporting and auditors, reports can have a forensic-log to follow.
    
### 24. How do the financial service providers connect with mojaloop

  - **Communication Channel**
  
    Slack mojaloop general channel.

  - **Community Question**

    Like In the case of payment switches, different payment switches connects with  Central bank payment switch with ISO8583 messages, After deploying Mojaloop as wallet  interoperability platform ,How d/t  financial service providers connect with mojaloop?

  - **Relevant Notes**

  - **Reply**

    There is an architecture diagram that presents a good view of the integration between the different entities. https://github.com/mojaloop/docs/blob/master/Diagrams/ArchitectureDiagrams/Arch-Flows.svg.

### 25. Is there any open source  ISO8583-OpenAPI converter/connector

  - **Communication Channel**
  
    Slack mojaloop general channel.

  - **Community Question**

    I'd like to know if there is any open source  ISO8583-OpenAPI converter/connector is available?
    
  - **Relevant Notes**

    I don't think a generic ISO8583 <-> Mojaloop integration is possible.
    
  - **Reply**

    We're working on some "traditional payment channel" to Mojaloop integrations (POS and ATM) which we hope to demo at the next convening. These would form the basis for an ISO8583 integration we might build and add to the OSS stack but bare in mind that these integrations will be very use case specific.
    
### 26. How do I know the end points to setup postman for testing the deployment

  - **Communication Channel**
  
    Slack mojaloop general channel.

  - **Community Question**

    Need some help testing mojaloop-5.4.1 deployment on AWS. I  deployed mojaloop-5.4.1 on AWS with a k8s cluster of 1 master and 1 node . Workload statuses show running for all pods, deployments, replica sets and stateful sets. How do I setup postman to test the deployment? What is the recommended testing strategy to validate both deployment as well as the use cases? I looked at Mojaloop-Sandbox.postman_environment.json , but need to know the end points to modify...
    
  - **Relevant Notes**
    
  - **Reply**

    On the Kubernetes dashboard, select the correct NAMESPACE. Go to Ingeresses. Depending on how you deployed the helm charts, look for 'moja-centralledger-service'. Click on edit, and find the tag <HOST>. This would contain the endpoint for this service.

### 27. Why are there no reversals allowed on a Mojaloop

  - **Communication Channel**
  
    Slack mojaloop general channel.

  - **Community Question**

    Why are there no reversals allowed on a Mojaloop system?

  - **Relevant Notes**
    
  - **Reply**

  *Irrevocability* is a core Level One Principle (edited) 
  and not allowing reversals is essential for that
  Here is the section from the API Definition addressing this:
  _*6.7.1.2 Transaction Irrevocability*_
  _The API is designed to support irrevocable financial transactions only; this means that a financial transaction cannot be changed, cancelled, or reversed after it has been created. This is to simplify and reduce costs for FSPs using the API. A large percentage of the operating costs of a typical financial system is due to reversals of transactions._
  _As soon as a Payer FSP sends a financial transaction to a Payee FSP (that is, using POST /transfers including the end-to-end financial transaction), the transaction is irrevocable from the perspective of the Payer FSP. The transaction could still be rejected in the Payee FSP, but the Payer FSP can no longer reject or change the transaction. An exception to this would be if the transfer’s expiry time is exceeded before the Payee FSP responds (see Sections 6.7.1.3 and 6.7.1.5 for more information). As soon as the financial transaction has been accepted by the Payee FSP, the transaction is irrevocable for all parties._
  
  However, *Refunds* is a use case supported by the API

### 28. Error with microk8s installation "MountVolume.SetUp failed"

  - **Communication Channel**
  
    Slack mojaloop general channel.

  - **Community Question**

    Wondering if anyone got the ffg. error with microk8s installation "MountVolume.SetUp failed for volume "moja-centralledger-handler-admin-transfer-config-volume" : couldn't propagate object cache: timed out waiting for the condition
    Failed to pull image "mysql:latest": rpc error: code = Unknown desc = failed to pull and unpack image "docker.io/library/mysql:latest": failed to unpack image on snapshotter overlayfs: failed to extract layer sha256:1717d824958a74e9d1cde44cb4384fe3cfde593ffcc09fd7f5ace2e8f9052f7b: mount callback failed on /var/snap/microk8s/common/var/lib/containerd/tmpmounts/containerd-mount025267750: write /var/snap/microk8s/common/var/lib/containerd/tmpmounts/containerd-mount025267750/usr/bin/perror: no space left on device: unknown".

  - **Relevant Notes**

    Would appear if it is a space issue, but more the 100GiB of EBS storage was allocated.
    
  - **Reply**

    Issue resolved itself after 45 minutes.
    Initial implementation of the mojaloop project can take a while to stabilize.
    

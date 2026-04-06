# FAQ techniques

Ce document contient certaines des questions techniques fréquemment posées par la communauté.

## 1. Qu’est-ce qui est pris en charge ?

Actuellement, les composants Central Ledger sont pris en charge par l’équipe. Les composants DFSP sont obsolètes ; par conséquent, l’environnement de bout en bout et l’installation complète sont difficiles à mettre en place.

## 2. Peut-on se connecter directement à Pathfinder dans un environnement de développement ?

Pour les environnements local et de test, nous recommandons plutôt d’utiliser le service « mock-pathfinder ». Pathfinder est un service « facturé à l’usage ».

Accédez au dépôt https://github.com/mojaloop/mock-pathfinder pour télécharger et installer mock-pathfinder. Exécutez la commande `npm install` dans le répertoire mock-pathfinder pour installer les dépendances, puis mettez à jour `Database_URI` dans `mock-pathfinder/src/lib/config.js`.

## 3. Dois-je enregistrer le DFSP via l’URL http://central-directory/commands/register ou mettre à jour la configuration dans default.json ?

Vous devez enregistrer via l’API fournie, en utilisant Postman ou curl. Le client utilise du code Level One. Il faut implémenter la version Mojaloop actuelle avec les scripts Postman à jour.

## 4. Le pod pi3-kafka-0 est toujours en CrashLoopBackOff ?

- More background related to the question:

  Quand j’ai essayé d’obtenir les logs du conteneur `centralledger-handler-admin-transfer`, j’obtiens l’erreur suivante :
  Error from server (BadRequest): container "centralledger-handler-admin-transfer" in pod "pi3-centralledger-handler-admin-transfer-6787b6dc8d-x68q9" is waiting to start: PodInitializing
  Et le statut du pod pi3-kafka-0 est toujours en CrashLoopBackOff.
  J’utilise un VPS sous Ubuntu 16.04 avec 12 Go de RAM, 2 vCores, 2,4 GHz et 50 Go de disque chez OVH pour le déploiement.
    
Le fait d’augmenter la RAM à 24 Go et le CPU à 4 a résolu le problème. Il semble s’agir d’un timeout sur Zookeeper dû à un manque de ressources disponibles, entraînant l’arrêt des services.

## 5. Pourquoi ai-je une erreur quand j’essaie de créer un nouveau DFSP via l’Admin ?

Assurez-vous d’utiliser les scripts Postman les plus récents disponibles sur le dépôt https://github.com/mojaloop/mock-pathfinder.


## 6. Puis-je répartir les composants Mojaloop sur plusieurs machines physiques et VM ?

Vous devriez pouvoir déployer sur différentes VM ou machines physiques. La répartition dépend fortement de vos exigences et sera spécifique à votre implémentation. Nous utilisons Kubernetes pour l’orchestration de conteneurs. Cela permet de planifier les déploiements sur des nœuds spécifiques si nécessaire et de demander des ressources spécifiques. Les charts Helm du dépôt Helm peuvent servir de guide pour allouer et regrouper au mieux les composants dans votre déploiement. Bien sûr, vous devrez adapter les configurations à votre implémentation.

## 7. Peut-on s’attendre à ce que tous les endpoints définis dans le document d’API soient implémentés dans Mojaloop ?

L’API de la spécification Mojaloop (transfers) et l’implémentation open source du Switch Mojaloop sont deux flux indépendants, même si l’implémentation s’appuie évidemment sur la spécification. Les implémentations se font en fonction des cas d’usage priorisés sur une période donnée et des endpoints nécessaires pour les supporter. Si certains endpoints ne sont pas prioritaires, ils peuvent ne pas être disponibles. L’objectif est toutefois de supporter, à terme, tous les endpoints spécifiés, même si cela peut prendre du temps. Merci pour la liste. Certains éléments existent aussi dans le dépôt « postman » de l’organisation Mojaloop sur GitHub.

## 8. Mojaloop stocke-t-il les informations de devis/statut du FSP initiateur du paiement ?

À ce jour, l’implémentation open source du Switch Mojaloop *ne stocke pas* les informations liées aux quotes. Il revient au payeur et au bénéficiaire impliqués dans le processus de stocker les informations pertinentes.

## 9. Mojaloop gère-t-il la validation du workflow ?

Pas pour le moment, mais cela pourrait arriver à l’avenir. Pour corréler les requêtes liées à un transfert donné, vous pouvez consulter la ressource/endpoint « transaction » dans la spécification. Par ailleurs, des travaux sont en cours côté spécification pour rendre cette corrélation plus simple, par exemple pour relier les requêtes de quote et de transfer au sein d’une transaction unique.


## 10. Comment enregistrer une nouvelle « party » dans Mojaloop ?

Il n’existe pas de `POST` sur la ressource `/parties`, comme indiqué dans la section 6.1.1 de l’API Definition. Référez-vous plutôt à la section 6.2.2.3 : `POST /participants/<Type>/<ID>` dans l’API Definition.

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

## 19. What are the benefit(s) from using mojaloop as interoperabilty platform?

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

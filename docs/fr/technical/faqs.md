# Foire Aux Questions

Ce document contient certaines des questions techniques fréquemment posées par la communauté.

## 1. Qu'est-ce qui est supporté ?

Actuellement, les composants du Central Ledger sont pris en charge par l'équipe. Les composants DFSP sont obsolètes, ce qui rend l'installation de l'environnement de bout en bout et la configuration complète difficile.

### 2. Pouvons-nous nous connecter directement à Pathfinder dans un environnement de développement ?

Pour les environnements locaux et de test, nous recommandons d'utiliser plutôt le service 'mock-pathfinder'. Pathfinder est un service payant à l'utilisation.

Accédez au dépôt https://github.com/mojaloop/mock-pathfinder pour télécharger et installer mock-pathfinder. Exécutez la commande `npm install` dans le dossier mock-pathfinder pour installer les dépendances, puis mettez à jour `Database_URI` dans `mock-pathfinder/src/lib/config.js`.

### 3. Dois-je enregistrer un DFSP via l'URL http://central-directory/commands/register ou dois-je mettre à jour la configuration dans default.json ?

Vous devez vous enregistrer en utilisant l'API fournie, en utilisant Postman ou curl. Le client utilise le code LevelOne. Il est nécessaire d'implémenter la version actuelle de Mojaloop avec les scripts Postman actuels.

### 4. Le pod pi3-kafka-0 est toujours en état CrashLoopBackOff ?

- Plus d'informations concernant la question :

  Lorsque j'ai essayé d'obtenir les logs du conteneur centralledger-handler-admin-transfer, j'obtiens l'erreur suivante :
  `Error from server (BadRequest): container "centralledger-handler-admin-transfer" in pod "pi3-centralledger-handler-admin-transfer-6787b6dc8d-x68q9" is waiting to start: PodInitializing`
  Et le statut du pod pi3-kafka-0 reste sur CrashLoopBackOff.
  J'utilise un VPS sous Ubuntu 16.04 avec 12 Go de RAM, 2 vCores, 2,4 GHz, 50 Go d'espace disque chez OVH pour le déploiement.
    
L'augmentation de la RAM à 24 Go et du CPU à 4 a résolu les problèmes. Il semble que ce soit un timeout de Zookeeper dû à l'épuisement des ressources disponibles, ce qui entraîne l'arrêt des services.

### 5. Pourquoi ai-je une erreur lorsque je tente de créer un nouveau DFSP via Admin ?

Assurez-vous d'utiliser les scripts Postman les plus récents disponibles sur le dépôt https://github.com/mojaloop/mock-pathfinder.

### 6. Puis-je répartir les composants Mojaloop sur différentes machines physiques et VM ?

Vous devriez pouvoir configurer Mojaloop sur différentes VM ou machines physiques. La répartition dépend entièrement de vos besoins et sera spécifique à votre implémentation. Nous utilisons Kubernetes pour l'orchestration des conteneurs. Cela permet de planifier les déploiements via le runtime Kubernetes sur des machines spécifiques si nécessaire, et de demander des ressources spécifiques si besoin. Les Helm charts du dépôt Helm peuvent servir de ligne directrice sur la meilleure manière d'allouer et de regrouper les composants dans votre déploiement. Naturellement, vous devrez mettre à jour les configurations pour compléter votre implémentation personnalisée.

### 7. Peut-on s’attendre à ce que tous les endpoints définis dans la documentation API soient implémentés dans Mojaloop ?

L'API de la spécification Mojaloop pour les transferts et l'implémentation Mojaloop Open Source Switch sont des flux indépendants, bien que l'implémentation repose évidemment sur la spécification. En fonction des cas d'utilisation prioritaires, les endpoints nécessaires sont implémentés. Si certains endpoints ne sont pas prioritaires, il se peut qu'ils ne soient pas disponibles. Cependant, l'objectif est de prendre en charge tous les endpoints spécifiés, même si cela prendra du temps. Nous avons quelques-uns de ces endpoints dans le dépôt ‘postman’ de l’organisation Github mojaloop.

### 8. Mojaloop stocke-t-il les informations de quote/statut du FSP initiateur de paiement ?

Pour le moment, l’implémentation Switch open source Mojaloop ne stocke *pas* les informations liées aux Quotes. C’est au payeur et au bénéficiaire impliqués dans le processus de stocker les informations pertinentes.

### 9. Mojaloop gère-t-il la validation des workflows ?

Pas pour le moment, mais cela pourrait arriver à l’avenir. Concernant la corrélation des requêtes associées à un transfert spécifique, vous pouvez consulter l’endpoint ‘transaction’ dans la spécification pour plus d’informations. De plus, il y a un travail en cours concernant la spécification afin de rendre cette corrélation plus simple et directe, c’est-à-dire pour faire correspondre les requêtes de quote et de transfert relevant d’une seule transaction.

### 10. Comment enregistrer un nouveau participant dans Mojaloop ?

Il n'y a pas de méthode POST sur la ressource /parties, comme spécifié dans la section 6.1.1 de la définition de l’API. Veuillez vous référer à la section 6.2.2.3 : `POST /participants/<Type>/<ID>` dans la définition de l’API.

"_La requête HTTP `POST /participants/<Type>/<ID>` (ou `POST /participants/<Type>/<ID>/<SubId>`) est utilisée pour créer des informations sur le serveur concernant l'identité fournie, définie par `<Type>`, `<ID>`, et éventuellement `<SubId>` (par exemple : POST_
  _/participants/MSISDN/123456789 ou POST /participants/BUSINESS/shoecompany/employee1). Voir Section 5.1.6.11 pour plus d’informations sur l’adressage d’un Participant._"

### 11. Le participant représente-t-il un compte client dans une banque ?

Pour plus d'informations, consultez ce document (section 3..2) : https://github.com/mojaloop/mojaloop-specification/blob/develop/Generic%20Transaction%20Patterns.pdf.

"_Dans l’API, un Participant est identique à un FSP qui participe à un schéma d’interopérabilité. L'objectif principal de la ressource logique Participants API est de permettre aux FSPs de savoir dans quel autre FSP se trouve une contrepartie impliquée dans une transaction financière interopérable. Il existe également des services permettant aux FSPs de fournir des informations à un système commun._"

En résumé, un participant est tout FSP participant au schéma (généralement pas un client). Pour la recherche de comptes, un service d’annuaire tel que *Pathfinder* peut être utilisé, qui fournit la recherche utilisateur et le mapping. Si un tel service n'est pas fourni, une alternative est proposée dans la spécification, où le Switch héberge un Account Lookup Service (ALS) auquel les participants doivent enregistrer les parties. J'ai déjà abordé ce point. À noter que le Switch ne stocke pas les détails, uniquement la correspondance entre un ID et un FSP, puis les appels pour résoudre le participant sont envoyés à ce FSP.

https://github.com/mojaloop/mojaloop-specification CORE RELATED (Mojaloop):

Ce dépôt contient l’ensemble des documents de spécification de l’API ouverte pour l'interopérabilité FSP - mojaloop/mojaloop-specification.

### 12. Comment enregistrer un bénéficiaire _de confiance_ pour un payeur, afin d’éviter l’OTP ?

Pour éviter l’OTP, la demande initiale sur /transactionRequests du bénéficiaire peut être approuvée de manière programmatique (ou manuelle) sans recourir à l’endpoint /authorizations (qui est utilisé pour l’approbation OTP). En effet, c’est au FSP de gérer cela, le Switch ne le fait pas. Ceci est brièvement évoqué dans la section 6.4 de la spécification.

### 13. 404 lors de l’accès ou du chargement du fichier kubernetes-dashboard.yaml ?

Depuis le dépôt officiel Github Kubernetes dans le README.md, le lien le plus récent à utiliser est : "https://raw.githubusercontent.com/kubernetes/dashboard/v1.10.1/src/deploy/recommended/kubernetes-dashboard.yaml". Vérifiez toujours les liens tiers avant de les utiliser. Les applications open source évoluent constamment.

### 14. Lors de l'installation de nginx-ingress pour le load-balancing et l’accès externe - Erreur : no available release name found ?

Merci de consulter la documentation traitant d’un problème similaire. En résumé - il s'agit très probablement d'un problème RBAC. Consultez la documentation pour mettre en place Tiller avec RBAC. https://docs.helm.sh/using_helm/#role-based-access-control détaille ce point. Voir l’issue enregistrée : helm/helm#3839.

### 15. Erreur "ImportError: librdkafka.so.1: cannot open shared object file: No such file or directory" lors du lancement de `npm start`.

Une solution a été trouvée ici : https://github.com/confluentinc/confluent-kafka-python/issues/65#issuecomment-269964346
GitHub
ImportError: librdkafka.so.1: cannot open shared object file: No such file or directory · Issue #65 · confluentinc/confluent-kafka-python
Ubuntu 14 ici, pip==7.1.2, setuptools==18.3.2, virtualenv==13.1.2. Pour commencer, je souhaite compiler la dernière version stable (semble être 0.9.2) de librdkafka dans /opt/librdkafka. curl https://codeload.github.com/ede...

Voici les étapes pour recompiler librdkafka :

git clone https://github.com/edenhill/librdkafka && cd librdkafka && git checkout `<commit_sha>`

cd librdkafka && ./configure && make && make install && ldconfig

Après cela, je peux importer sans spécifier LD_LIBRARY_PATH.
GitHub
edenhill/librdkafka
La bibliothèque Apache Kafka C/C++. Contribuez au développement de edenhill/librdkafka sur GitHub.

### 16. Peut-on utiliser mojaloop comme logiciel open source de portefeuille mobile ou mojaloop ne fait que l’interopérabilité ?

Nous pouvons utiliser mojaloop pour l’interopérabilité afin de prendre en charge les portefeuilles mobiles et autres transferts d'argent. Ce n’est pas un logiciel pour un DFSP (il existe d’autres projets open source pour cela, comme Finserv etc.). Mojaloop est principalement destiné à un Hub/Switch et à une API que le DFSP doit implémenter. Mais ce n’est pas fait pour gérer des portefeuilles mobiles en tant que tel.

### 17. Décrivez les entreprises qui aident à déployer & supporter mojaloop ?

Mojaloop est un logiciel et une spécification open source.

### 18. Pouvez-vous dire quelque chose sur mojaloop & la sécurité ?

La spécification est assez standard et dispose de bonnes normes de sécurité. Mais celles-ci doivent être mises en œuvre par les adopteurs et les déployeurs. En plus de cela, les mesures de sécurité doivent être complétées par d’autres mesures de sécurité opérationnelle et de déploiement. De plus, les prochains mois seront axés sur la sécurité dans la communauté open source.

### 19. Quels sont les avantages d'utiliser mojaloop comme plateforme d’interopérabilité ?

Avantages : Actuellement, par exemple, un utilisateur Airtel mobile money peut seulement transférer vers un autre utilisateur Airtel mobile money. Avec ce système, il/elle peut transférer vers tout fournisseur de services financiers, tel qu'un autre fournisseur de mobile money ou tout autre compte bancaire ou commerçant connecté au Hub, quelle que soit leur implémentation. Ils doivent simplement être connectés au même Switch. De plus, il est conçu pour fonctionner sur des téléphones basiques afin que tout le monde puisse l’utiliser.

### 20. Quels sont les principaux défis pour les entreprises utilisant mojaloop ?

Pour l’instant, les principaux défis concernent les attentes. Les attentes des adopteurs de mojaloop et ce qu'est réellement mojaloop. Beaucoup d’adopteurs ont une compréhension différente de ce qu’est mojaloop et de ses capacités. S'ils ont la bonne compréhension, de nombreux défis actuels sont atténués.
Oui, le journal d’audit (forensic logging) est également une mesure de sécurité à des fins d’audit, qui garantit qu’il existe des traces vérifiables des actions et que toute action notable est enregistrée et sécurisée après un chiffrement à plusieurs niveaux.

### 21. Le forensic logging/l’audit dans mojaloop est-il lié à la sécurisation de la plateforme d’interopérabilité ?

Cela garantit également que tous les services exécutent toujours le code qu'ils sont censés exécuter, et que tout comportement anormal/indésirable est arrêté dès le démarrage. Pour le reporting et les auditeurs, cela permet de suivre les actions via un audit-log.

### 22. Comment les fournisseurs de services financiers se connectent-ils à mojaloop ?

Il existe un schéma architectural qui donne une bonne vue de l’intégration entre les différentes entités. https://github.com/mojaloop/docs/blob/master/Diagrams/ArchitectureDiagrams/Arch-Flows.svg.

### 23. Existe-t-il un convertisseur/connecteur open source ISO8583-OpenAPI ?

Je ne pense pas qu’il existe actuellement une intégration générique ISO8583 `<-> Mojaloop. Nous travaillons sur certaines intégrations « canal de paiement traditionnel » vers Mojaloop (POS et GAB) que nous espérons présenter lors de la prochaine conférence. Celles-ci pourraient constituer la base d'une intégration ISO8583 à ajouter à la pile OSS, mais gardez à l'esprit que ces intégrations seront très spécifiques à l'usage.

### 24. Comment connaître les endpoints à configurer dans Postman pour tester le déploiement ?

Sur le dashboard Kubernetes, sélectionnez le bon NAMESPACE. Allez dans les Ingresses. Selon la façon dont vous avez déployé les Helm charts, cherchez 'moja-centralledger-service'. Cliquez sur éditer et trouvez la balise `<HOST>`. Cela contiendra le endpoint pour ce service.

### 25. Pourquoi n’y a-t-il pas de possibilité d’annulation (reversal) sur Mojaloop ?

*L’irrévocabilité* est un principe fondamental du programme Level One et ne pas autoriser d’annulations (reversals) est essentiel pour cela. Voici la section de la définition API qui en parle :

_*6.7.1.2 Irrévocabilité des transactions*_
_L’API est conçue pour prendre en charge uniquement des transactions financières irrévocables ; cela signifie qu’une transaction financière ne peut pas être modifiée, annulée ou inversée après sa création. Cela vise à simplifier et à réduire les coûts pour les FSP utilisant l’API. Une grande partie des coûts d’exploitation des systèmes financiers classiques est due aux annulations de transactions._
_Dès qu’un FSP payeur envoie une transaction financière à un FSP bénéficiaire (c’est-à-dire via POST /transfers avec la transaction de bout en bout), la transaction est irrévocable du point de vue du FSP payeur. La transaction peut encore être rejetée par le FSP bénéficiaire, mais le FSP payeur ne peut plus la rejeter ou la modifier. Une exception à cela serait si l’expiration du transfert survient avant la réponse du FSP bénéficiaire (voir les sections 6.7.1.3 et 6.7.1.5 pour plus d’informations). Une fois la transaction acceptée par le FSP bénéficiaire, elle est irrévocable pour toutes les parties._

Cependant, *les remboursements* sont un cas d’utilisation supporté par l’API.

### 26. Erreur lors de l'installation de microk8s : "MountVolume.SetUp failed" ?

Cela semblerait être un problème d’espace, bien que plus de 100GiB de stockage EBS aient été alloués.
Le problème s’est résolu de lui-même après 45 minutes. L’implémentation initiale du projet mojaloop peut prendre du temps à se stabiliser.

### 27. Pourquoi ai-je cette erreur lors de la création d’un participant : "Hub reconciliation account for the specified currency does not exist" ?

Vous devez créer les comptes Hub correspondants (HUB_MULTILATERAL_SETTLEMENT et HUB_RECONCILIATION) pour le devise spécifiée avant de configurer les participants.
Dans cette collection Postman, vous pouvez trouver les requêtes nécessaires dans le dossier "Hub Account" : https://github.com/mojaloop/postman/blob/master/OSS-New-Deployment-FSP-Setup.postman_collection.json

Trouvez aussi les environnements associés dans le dépôt Postman : https://github.com/mojaloop/postman

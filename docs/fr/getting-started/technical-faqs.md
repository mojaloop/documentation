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
  
## 11. Le participant représente-t-il un compte d’un client dans une banque ?

Pour plus d'informations, veuillez consulter ce document (Section 3.2) : https://github.com/mojaloop/mojaloop-specification/blob/develop/Generic%20Transaction%20Patterns.pdf.
  
” _Dans l’API, un Participant est équivalent à un PSP (Prestataire de Services de Paiement/FSP) qui participe à un schéma d’interopérabilité. L’objectif principal de la ressource logique Participants de l’API est de permettre aux PSP de savoir dans quel autre PSP se trouve la contrepartie d’une transaction financière interopérable. Il existe également des services définis pour que les PSP fournissent des informations à un système commun._ ”

En résumé, un participant est tout PSP impliqué dans le schéma (généralement pas un client). Pour la recherche de compte, un service d’annuaire tel que *Pathfinder* peut être utilisé, qui permet de rechercher un utilisateur et d’établir la correspondance. Si un tel service d’annuaire n’est pas fourni, la spécification propose une alternative où le Switch héberge un service de lookup de comptes (ALS) auquel les participants doivent enregistrer les parties. J’ai déjà évoqué ce point. Mais il faut noter que le Switch ne conserve pas les détails, uniquement la correspondance entre un identifiant et un FSP, et les requêtes de résolution de la partie sont redirigées vers ce FSP.

https://github.com/mojaloop/mojaloop-specification LIÉ AU CŒUR (Mojaloop) :

Ce dépôt contient le jeu de documents de spécification de l’Open API pour l’interopérabilité des PSP - mojaloop/mojaloop-specification.

## 12. Comment enregistrer un bénéficiaire _de confiance_ auprès d’un payeur pour éviter l’OTP ?

Pour éviter la saisie de l’OTP, la demande initiale sur /transactionRequests initiée par le bénéficiaire peut être approuvée de façon programmatique (ou même manuelle) sans passer par le endpoint /authorizations (utilisé habituellement pour la validation OTP). C’est en effet au PSP de gérer cela, le Switch ne le fait pas. Ceci est évoqué brièvement en section 6.4 de la spécification.

## 13. J’obtiens une erreur 404 lorsque j’essaie d’accéder ou de charger le fichier kubernetes-dashboard.yaml ?

Selon le README.md officiel du dépôt github de kubernetes, le lien le plus récent à utiliser est : "https://raw.githubusercontent.com/kubernetes/dashboard/v1.10.1/src/deploy/recommended/kubernetes-dashboard.yaml". Veillez toujours à vérifier les liens tiers avant toute utilisation. Les applications open source évoluent constamment.

## 14. Lors de l’installation de nginx-ingress pour la répartition de charge & l’accès externe – Erreur : no available release name found ?

Merci de consulter la page suivante qui aborde une problématique similaire. Pour résumer, il s’agit très probablement d’un problème RBAC. Consultez la documentation pour configurer Tiller avec RBAC : https://docs.helm.sh/using_helm/#role-based-access-control détaille la procédure. Voir également l’issue enregistrée : helm/helm#3839.

## 15. Message reçu "ImportError: librdkafka.so.1: cannot open shared object file: No such file or directory" lors de l’exécution de la commande `npm start`.

Solution trouvée ici : https://github.com/confluentinc/confluent-kafka-python/issues/65#issuecomment-269964346  
GitHub  
ImportError: librdkafka.so.1: cannot open shared object file: No such file or directory · Issue #65 · confluentinc/confluent-kafka-python  
Sous Ubuntu 14, pip==7.1.2, setuptools==18.3.2, virtualenv==13.1.2. Je souhaite d’abord compiler la dernière version stable (il semble que ce soit 0.9.2) de librdkafka dans /opt/librdkafka :  
curl https://codeload.github.com/ede...

Voici les étapes pour reconstruire librdkafka :

git clone https://github.com/edenhill/librdkafka && cd librdkafka && git checkout `<commit_sha>`

cd librdkafka && ./configure && make && make install && ldconfig

Après cela, je peux importer les dépendances sans avoir à spécifier LD_LIBRARY_PATH.  
GitHub  
edenhill/librdkafka  
La bibliothèque Apache Kafka C/C++. Contribuez à edenhill/librdkafka sur GitHub.

## 16. Peut-on utiliser mojaloop comme logiciel open source de portefeuille mobile ou mojaloop gère-t-il uniquement l’interopérabilité ?

Nous pouvons utiliser mojaloop pour l’interopérabilité afin de supporter les portefeuilles mobiles et autres transferts d’argent. Ce n’est pas un logiciel pour les DFSP (il existe d’autres projets open source pour cela, comme Finserv, etc). Mojaloop sert principalement de Hub/Switch et fournit une API à implémenter côté DFSP, mais ne sert pas à gérer directement des portefeuilles mobiles.

## 17. Quelles sont les sociétés qui aident à déployer et à supporter mojaloop ?

Mojaloop est un logiciel et une spécification open source.

## 18. Que pouvez-vous dire au sujet de mojaloop et de la sécurité ?

La spécification est assez standard et dispose de bonnes pratiques de sécurité. Mais leur mise en œuvre incombe aux intégrateurs et déployeurs. En complément, des mesures de sécurité opérationnelle et de déploiement doivent être appliquées. Par ailleurs, les prochains mois se concentreront sur la sécurité au sein de la communauté open source.

## 19. Quels sont les avantages d’utiliser mojaloop comme plateforme d’interopérabilité ?

Bénéfices : À ce jour, par exemple, un utilisateur Airtel mobile money ne peut transférer qu’à un autre utilisateur Airtel. Avec ce système, il/elle peut transférer à tout autre prestataire financier comme un autre opérateur mobile money, une banque ou un commerçant connecté au Hub, quelle que soit l’implémentation. Il suffit qu’ils soient connectés au même Switch. De plus, la plateforme est conçue pour être utilisable sur les téléphones basiques (feature phones), donc accessible à tous.

## 20. Quels sont les principaux défis auxquels font face les entreprises utilisant mojaloop ?

Actuellement, les difficultés majeures sont liées aux attentes. Les attentes des adopteurs de mojaloop et la réalité de ce qu’est mojaloop. Beaucoup ont une compréhension différente de mojaloop et de ses capacités. Avec une bonne compréhension, de nombreux défis actuels disparaissent.  
Oui, la journalisation forensic (forensic logging) est aussi une mesure de sécurité pour l’audit, elle permet d’assurer qu’il existe un registre traçable des actions, que toute action notable soit consignée et conservée en toute sécurité après chiffrement à plusieurs niveaux.

## 21. L’audit/journalisation forensic dans mojaloop est-il/elle lié(e) à la sécurisation de la plateforme d’interopérabilité ?

Cela garantit aussi que tous les services exécutent toujours le code attendu et que toute anomalie est empêchée de démarrer. Pour le reporting et les auditeurs, des rapports peuvent intégrer un journal forensic retraçable.

## 22. Comment les fournisseurs de services financiers se connectent-ils à mojaloop ?

Il existe un schéma architectural qui présente clairement l’intégration des différentes entités : https://github.com/mojaloop/docs/blob/master/Diagrams/ArchitectureDiagrams/Arch-Flows.svg.

## 23. Existe-t-il un convertisseur/connecteur open source ISO8583-OpenAPI ?

Je ne crois pas qu’il existe à ce jour une intégration générique ISO8583 `<-> Mojaloop`. Nous travaillons actuellement sur certaines intégrations de « canaux de paiement traditionnels » à Mojaloop (POS et GAB) que nous espérons présenter lors de la prochaine réunion. Celles-ci pourraient former la base d’une intégration ISO8583 à ajouter à la stack open source, mais gardez à l’esprit que ces intégrations sont très spécifiques à chaque cas d’usage.

## 24. Comment connaître les endpoints à utiliser dans postman pour tester le déploiement ?

Dans le dashboard Kubernetes, sélectionnez le NAMESPACE approprié. Allez dans Ingresses. Selon la manière dont vous avez déployé les charts Helm, recherchez 'moja-centralledger-service'. Cliquez sur "éditer", et cherchez la balise `<HOST>`. Celle-ci contient l’endpoint du service.

En ligne de commande, repérez la colonne 'Host' dans la commande : `kubectl describe ingress moja-centralledger-service`

## 25. Pourquoi les rétrocessions ne sont-elles pas autorisées sur Mojaloop ?

*L’irrévocabilité* est un principe fondamental du projet Level One (édité) et il est essentiel qu’aucune rétrocession ne soit permise. Extrait pertinent issu de la définition d’API ci-dessous :

_*6.7.1.2 Irrévocabilité des transactions*_
_L’API est conçue pour ne supporter que des transactions financières irrévocables ; cela signifie qu’une transaction ne peut ni être modifiée, annulée ou rétrocédée après sa création. L’objectif est de simplifier et de réduire les coûts pour les PSP utilisant l’API. Une grande part du coût opérationnel d’un système financier classique est liée aux rétrocessions._
_Aussitôt qu’un PSP payeur envoie une transaction financière à un PSP bénéficiaire (via POST /transfers avec la transaction financière de bout en bout), la transaction devient irrévocable du point de vue du PSP payeur. Elle peut toujours être rejetée côté bénéficiaire, mais le payeur ne peut plus la rejeter ou la modifier. Seule exception : si l’expiration du transfert est atteinte avant la réponse du bénéficiaire (voir Sections 6.7.1.3 et 6.7.1.5 pour plus de détails). Dès qu’une transaction est acceptée par le bénéficiaire, elle devient irrévocable pour toutes les parties._

Cependant, *les remboursements* sont un cas d’usage supporté par l’API.

## 26. Erreur "MountVolume.SetUp failed" lors de l’installation de microk8s ?

Ce message peut apparaître en cas de problème d’espace disque, même si plus de 100Go d’espace EBS ont été alloués.  
Le problème s’est résolu de lui-même après 45 minutes. La mise en place initiale du projet mojaloop peut mettre un certain temps à se stabiliser.

## 27. Pourquoi cette erreur lors de la création d’un participant : "Hub reconciliation account for the specified currency does not exist" ?

Vous devez d’abord créer les comptes Hub correspondants (HUB_MULTILATERAL_SETTLEMENT et HUB_RECONCILIATION) pour la devise concernée avant de configurer les participants.  
Dans cette collection Postman vous trouverez les requêtes pour effectuer l’opération dans le dossier "Hub Account" : https://github.com/mojaloop/postman/blob/master/OSS-New-Deployment-FSP-Setup.postman_collection.json

Trouvez également les environnements correspondants dans le dépôt Postman : https://github.com/mojaloop/postman

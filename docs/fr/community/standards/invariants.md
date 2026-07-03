# Invariants Mojaloop

Les invariants suivants ont été établis au fil du développement de la plateforme, sur la base des exigences techniques déduites des [principes du Level One Project](https://www.leveloneproject.org/project_guide/level-one-project-design-principles/) et des bonnes pratiques applicables du secteur.
Ils doivent guider toute discussion produit et technique sur l’architecture de la plateforme.

## Principes généraux

### 1. La fonction principale de la plateforme est de compenser en temps réel les paiements en poussée de crédit et de faciliter le règlement régulier, avant la fin du jour de valeur.
#### Notes :
1. La plateforme permet aux participants de compenser des fonds immédiatement en faveur de leurs clients, tout en minimisant les risques et coûts associés.
2. La plateforme prend en charge des contrôles de liquidité disponible par transfert, lorsque ceux-ci sont requis en soutien au premier objectif.
3. Le hub est optimisé pour le chemin critique.
4. Règlement automatisé intrajournalier ; configuré par le schéma et l’implémentation selon les modèles de règlement recommandés pour l’infrastructure des marchés financiers.


### 2. Le hub prend en charge un traitement entièrement automatique de bout en bout (straight-through).
#### Notes :
1. « Straight-through processing » signifie qu’aucune intervention manuelle sur l’exécution des paiements ou des règlements n’est requise, sauf lorsque l’acceptation des conditions d’un paiement par l’utilisateur final est exigée conformément aux principes Level One.
2. Le traitement de bout en bout contribue à réduire les erreurs humaines dans le processus de transfert, ce qui réduit in fine les coûts.
3. Le caractère automatisé accélère les transferts de valeur entre clients finaux.

Plus d’informations : [Straight Through Processing (Investopedia)](https://www.investopedia.com/terms/s/straightthroughprocessing.asp)


### 3. Le hub ne nécessite pas de rapprochement manuel : le protocole d’interaction avec le hub garantit des résultats déterministes.
#### Notes :
1. Lorsqu’un transfert est finalisé, le statut de ce transfert ne peut faire l’objet d’aucun doute (dans le cas contraire, il n’est pas finalisé et un avis actif est communiqué aux participants). L’avis est à la demande : en cas de demande, ils sont informés que le statut est indéterminé).
2. Le hub garantit des résultats déterministes pour les transferts et est accepté par tous les participants comme autorité finale sur le statut des transferts.
3. Le déterminisme signifie que chaque transfert est traçable, auditable (selon les limites et les contraintes applicables), avec un résultat final fourni dans un délai garanti.
4. Pour lever toute ambiguïté, les transferts par lots sont traités ligne par ligne avec des résultats déterministes potentiellement différents pour chaque ligne.


### 4. La logique de mise en place des transactions, propre aux cas d’usage, est séparée du transfert d’argent sans politique métier.
#### Notes :
1. Les détails de transaction et les règles métier doivent être saisis et appliqués entre contreparties avant la phase d’accord sur les conditions ; cela hors périmètre Mojaloop.
2. La phase d’accord établit un objet de transaction signé et spécifique au cas d’usage, intégrant tous les détails propres à la transaction.
3. La phase de transfert orchestre le transfert de valeur de détail entre institutions au profit des contreparties (seuls des contrôles de limites système sont appliqués), sans référence aux détails de transaction.
4. Aucun traitement supplémentaire propre à la transaction pendant la phase de transfert.


### 5. Le hub n’analyse pas et n’agit pas sur les détails de transaction de bout en bout ; les messages de transfert ne contiennent que les valeurs nécessaires à la compensation et au règlement.
#### Notes :
1. Les contrôles et validations à l’étape de transfert portent uniquement sur la conformité aux règles du système, les limites, l’authentification par signature, et la validation de la condition et de l’exécution du paiement.
2. Les transferts engagés pour le règlement sont définitifs et garantis pour s’exécuter selon les règles du système.


### 6. La sémantique des transferts en poussée de crédit est réduite à sa forme la plus simple et standardisée pour tous les types de transaction.
#### Notes :
1. Simplifie l’implémentation et l’intégration des participants car de nombreux types de transaction et cas d’usage peuvent réutiliser le même flux de message de transfert de valeur sous-jacent.
2. Abstrait la complexité des cas d’usage hors du chemin critique.


### 7. Le hub de services API sur Internet n’est pas un « commutateur de messages ».
#### Notes :
1. Le hub de services fournit des services API en temps réel aux participants pour les transferts instantanés de détail en poussée de crédit.
    1. Services tels que résolution d’adresse, accord de transaction entre participants, soumission de transferts préparés, soumission d’avis d’exécution.
2. Des services API auxiliaires sont fournis aux participants pour faciliter l’intégration, la gestion de position, le reporting de rapprochement et d’autres fonctions non temps réel n’entrant pas dans le traitement des transferts.
3. Tous les messages sont validés par rapport à la spécification API ; les messages non conformes sont rejetés avec un code de motif interprétable par machine.


### 8. Le hub expose des interfaces asynchrones aux participants
#### Notes :
1. Pour maximiser le débit du système.
2. Pour isoler les problèmes de connectivité en feuille afin qu’ils n’impactent pas les autres utilisateurs finaux.
3. Pour permettre au hub de traiter les requêtes selon sa propre priorité sans maintenir une connexion active par transfert.
4. Pour gérer de nombreux processus longs concurrents via le traitement par lots interne et la répartition de charge.
5. Pour disposer d’un mécanisme unique pour le traitement des requêtes (par exemple : transactions en masse, requêtes nécessitant une saisie de l’utilisateur final, ou encore requêtes couvrant plusieurs sauts).
6. Pour mieux prendre en charge les contraintes des réseaux réels : les problèmes de vitesse ou de fiabilité d'un participant devraient avoir un impact minimal sur les autres participants ou sur la disponibilité globale du système.

### 9. L’API de transfert est [idempotente](https://docs.mojaloop.io/api/fspiop/v1.1/api-definition.html#idempotent-services-in-server)
#### Notes :
1. Les requêtes dupliquées peuvent être émises en toute sécurité par l’émetteur en cas de réseau dégradé.
    1. Les doublons sont reconnus et produisent le même résultat (doublons valides) ou sont rejetés en tant que doublons, avec référence à la requête originale (lorsque la spécification ne l’autorise pas).


### 10. Les enregistrements de transfert **_finalisés_** sont conservés pendant une période configurable par le schéma pour les processus du schéma (rapprochement, facturation, forensics)
#### Notes :
1. Il n’est pas possible d’interroger le « sous-statut » d’un transfert en cours ; l’API fournit un résultat déterministe avec avis actif dans le délai de service garanti.


### 11. Les enregistrements de transfert des transferts finalisés sont conservés indéfiniment dans un stockage long terme pour l’analyse métier par l’opérateur du schéma et les participants (via les interfaces appropriées)
#### Notes :
1. La disponibilité des enregistrements peut être en retard sur la finalité du traitement en ligne, afin de permettre la séparation entre la conservation des données et le traitement temps réel des requêtes de transfert.


### 12. Le hub doit effectuer le minimum d’analyse, de stockage et de traitement des messages nécessaire pour exécuter les services qu’il fournit au schéma dans son ensemble.
#### Notes :
1. Dans certains flux de messagerie (p. ex. recherche de partie), les participants peuvent souhaiter un point de contact unique pour le routage des messages liés au schéma, même lorsque les messages ne sont pas destinés au hub et ne nécessitent pas d’inspection.


## Sécurité et sûreté des API

### 13. Les messages API sont confidentiels, à intégrité vérifiable (anti-falsification) et non répudiables.
#### Notes :
1. La confidentialité est requise pour protéger la vie privée des participants et de leurs clients.
    1. De nombreux domaines réglementaires où Mojaloop doit opérer imposent des obligations légales ; le hub doit appliquer les bonnes pratiques pour garantir la protection de la vie privée des participants et de leurs clients.
2. Des mécanismes d’intégrité anti-falsification garantissent que les messages ne peuvent être altérés en transit.
    1. Pour l’intégrité du système, chaque destinataire doit pouvoir vérifier de façon fiable que le message n’a pas été modifié.
    2. La cryptographie asymétrique (signature numérique) est aujourd’hui le mécanisme le plus courant pour une messagerie à intégrité vérifiable.
        1. La sécurité de la clé privée de l’émetteur est critique.
        2. Les règles du système doivent préciser les responsabilités en matière de gestion des clés et l’exposition financière en cas de compromission d’une clé privée.
3. La non-répudiation garantit que le message a bien été envoyé par l’émetteur présumé et que celui-ci ne peut répudier la provenance.
    1. Cela est essentiel pour identifier la partie responsable lors des processus d'audit et de résolution des litiges.


### 14. Les messages API sont authentifiés à réception avant acceptation ou traitement ultérieur
#### Notes :
1. L’authentification donne un niveau de confiance sur l’émetteur présumé du message.
2. Elle donne un niveau de confiance que le message n’a pas été envoyé par une partie non autorisée.


### 15. Les messages authentifiés ne sont pas acquittés comme acceptés tant qu’ils ne sont pas enregistrés de façon sûre sur un stockage permanent.
#### Notes :
1. L’API Mojaloop attache une signification métier importante liée au schéma à certains codes HTTP à différentes étapes des flux :
    1. Certaines réponses HTTP, p. ex. « 202 Accepted », sont destinées à fournir des garanties financières aux participants et ne doivent être envoyées qu’une fois l’entité réceptrice assurée d’avoir enregistré de façon sûre et permanente ce qui permet :
        1. La reprise système vers un état cohérent après défaillance d’un ou plusieurs composants distribués.
        2. Des processus de règlement exacts.
        3. L’audit et le règlement des litiges.
    2. Par exemple un « 200 OK » du hub vers le participant bénéficiaire à réception d’un message d’exécution de transfert indique une garantie de règlement de la transaction pour le bénéficiaire, sous réserve des contrôles de validation.
2. L’API Mojaloop est conçue pour fonctionner en sécurité sous réseau imparfait, avec reprises et synchronisation d’état entre participants.


### 16. Trois niveaux de sécurité des communications pour l’intégrité, la confidentialité et la non-répudiation des messages entre serveur API et client API.
#### Notes :
1. Connexions sécurisées : mTLS obligatoire pour toutes les communications entre le schéma et les participants autorisés.
    1. Garantit la confidentialité des communications, leur échange entre correspondants identifiés, et leur protection contre la falsification.
2. Messages sécurisés : contenu JSON signé cryptographiquement selon JWS.
    1. Garantit aux destinataires l’origine des messages et la non-répudiation par l’émetteur.
3. Conditions de transfert sécurisées : protocole Interledger (ILP) entre participants payeur et bénéficiaire.
    1. Protège l’intégrité de la condition de paiement et de son exécution.
    2. Limite la durée de validité d’une instruction de transfert.


### 17. Pour garantir la cohérence arithmétique du système, seule l’arithmétique en virgule fixe est utilisée.
#### Notes :
1. Les calculs en virgule flottante peuvent perdre en précision et ne doivent servir à aucun calcul financier.
2. Voir la représentation [Level One Decimal Type](https://docs.mojaloop.io/documentation/discussions/decimal.html) et ses formes.
    1. Cette spécification permet un échange transparent avec les systèmes financiers basés sur XML, sans perte de précision ni d’exactitude.


## Caractéristiques opérationnelles

Mojaloop est conçu pour s’intégrer à un système de paiements instantanés au niveau d’une juridiction. Il doit donc démontrablement respecter les normes de performance et de résilience requises pour de tels systèmes.


### 1. Sur une configuration matérielle minimale de référence, le système permet de compenser 1 000 transferts par seconde, de façon soutenue pendant une heure, avec au plus 1 % (à l’étape de transfert) dépassant 1 seconde à travers le hub.
#### Notes :
1. La mesure inclut tous les composants matériels et logiciels nécessaires, avec sécurité et persistance de niveau production.
2. Elle inclut les trois étapes de transfert : découverte, accord et transfert.
3. Elle n’inclut pas la latence introduite par les participants.
4. Une période d’une heure approxime un pic de charge pour un système national de paiement.
5. Le coût de la montée en capacité (scale-up) par unité de capacité devrait être inférieur au coût du provisionnement initial.
6. 1 000 transferts (compensation) par seconde est un point de départ raisonnable pour un système national.
7. 1 % des transferts dépassant 1 seconde est un point de départ raisonnable.
8. Les schémas Mojaloop doivent pouvoir démarrer à un coût raisonnable pour une infrastructure financière nationale et évoluer économiquement avec la demande.


### 2. Le hub est hautement disponible et résilient aux défaillances.
#### Notes :
1. Définition de « haute disponibilité » :
   1. Ici, « _hautement disponible_ » signifie « _la capacité à fournir et maintenir un niveau de service acceptable face aux pannes et perturbations du fonctionnement normal_ ».
   2. Les schémas peuvent définir leur propre « niveau de service acceptable » ; Mojaloop fait certains arbitrages :
      1. Lorsque les modes de panne le permettent, le service est dégradé pour l’ensemble des participants plutôt que certains participants individuels subissent une panne totale pendant que d’autres restent opérationnels.
2. Le hub n’a pas de point de défaillance unique : il continue d’opérer avec une dégradation minimale si un composant unique tombe en panne.
   1. Plusieurs instances actives de chaque composant sont déployées de façon distribuée derrière des répartiteurs de charge.
   2. Chaque instance peut traiter les requêtes de n’importe quel client/participant : aucun participant ne perd la capacité de transacter à cause d’un seul composant.
3. Avec une infrastructure adaptée, le logiciel Mojaloop peut être déployé en configurations actif:actif et/ou actif:passif sur plusieurs centres de données géographiquement distincts, avec services et données répliqués sur des nœuds physiques susceptibles de tomber en panne indépendamment.
4. Les nœuds des groupes de réplication (et/ou grappes) doivent être dans des emplacements physiques divers (baies et/ou centres de données), alimentations et interconnexions réseau indépendantes.
5. En cas de défaillances multiples non couvertes par le logiciel, le déploiement ou l’infrastructure, l’API Mojaloop permet à chaque entité du schéma de retrouver un état cohérent, le hub faisant autorité après restauration complète.
6. _Voir aussi les points sur la résistance à la perte de données._
7. Les schémas Mojaloop visent une infrastructure financière nationale : le temps d’indisponibilité doit être aussi proche de zéro que raisonnable compte tenu des coûts.
8. Les pannes matérielles et logicielles sont attendues même avec du matériel de haute qualité ; elles doivent être anticipées et planifiées pour minimiser la perte ou la dégradation de service et/ou de données.
9. Les arbitrages privilégient la disponibilité globale du service et la cohérence d’état plutôt que la performance. C’est-à-dire :
   1. Tous les participants peuvent continuer à effectuer des transactions à un débit réduit plutôt que certains se trouvent dans l'incapacité totale d'en traiter.
   2. Les incohérences d’état entre entités du schéma sont résolubles après restauration via l’API Mojaloop, avec un rapprochement manuel minimal ; le hub fait autorité.
10. Si le débit ne suffit pas à traiter toutes les requêtes à temps, le hub priorise les transferts en cours plutôt que les nouvelles requêtes.
    1. Les transferts que le hub ne peut traiter avant expiration des délais sont expirés proprement.


### 3. Le hub résiste à la perte de données en cas de défaillances.
#### Notes :
1. Avec une infrastructure adaptée, Mojaloop peut être déployé de façon à répliquer les données de manière fiable sur plusieurs nœuds de stockage redondants avant traitement.
   1. Les moteurs de base fournis par les mécanismes de déploiement Mojaloop prennent en charge notamment :
      1. Réplication asynchrone primaire:secondaire.
      2. Réplication synchrone primaire:primaire.
      3. Réplication par quorum / consensus synchrone.
   2. Les mécanismes disponibles dépendent de la couche de stockage et des technologies de base de données.
2. En cas de défaillances multiples non couvertes, l’API Mojaloop permet de retrouver un état cohérent avec une exposition financière minimale.
   1. Les transferts ne deviennent juridiquement contraignants que lorsque le hub a répondu avec succès au message d’exécution du participant bénéficiaire. Cette réponse n’est envoyée qu’après persistance du message d’exécution et de son résultat dans la base du grand livre.
   2. Les horodatages d’expiration sur les messages financièrement significatifs permettent des échecs déterministes et opportuns pour tous les participants via mécanismes de nouvelle tentative automatisés.
3. Les schémas Mojaloop visent une infrastructure nationale : il faut autant que possible, compte tenu des coûts, éviter la perte de données.
4. Les pannes sont attendues ; la conception du hub doit les anticiper pour limiter la perte de données.
5. Les participants ont besoin d’une information rapide et fiable sur le statut des opérations financières dans le schéma, afin de minimiser leur exposition au risque et d’offrir une excellente expérience à leurs clients.


## Décisions de conception
1. NodeJS est l’environnement d’exécution principal ; TypeScript est le langage préféré pour le développement.
    1. Plateforme libre et open source.
    2. Très répandue et soutenue par les plus grandes institutions web.
    3. Écosystème mondial massif de bibliothèques.
    4. Utilise uniquement la famille ECMAScript, connue de millions de développeurs web.


2. Architecture distribuée microservices.
    1. [Loi de Déméter](https://en.wikipedia.org/wiki/Law_of_Demeter) ou principe de moindre connaissance.
    2. [Séparation des responsabilités](https://en.wikipedia.org/wiki/Separation_of_concerns) (Separation of Concerns), garantie par des contrats inter-modules.
    3. [Architecture modulaire](https://en.wikipedia.org/wiki/Modular_programming) : développement distribué en communauté et évolution des composants avec peu d’impact sur les voisins.


3. [Apache Kafka](https://kafka.apache.org/intro) en [pub/sub](https://en.wikipedia.org/wiki/Publish–subscribe_pattern) distribué pour la [séparation commande / requête (CQS)](https://en.wikipedia.org/wiki/Command–query_separation) entre modules.


4. [Apache Kafka](https://kafka.apache.org/intro) pour la persistance des messages API des participants.


5. Mojaloop utilise des API basées sur Open API 3.0.
    1. Expose des ressources mappées aux fonctionnalités des cas d’usage définis.
    2. Pratique courante pour les spécifications d’API web.


## Annexe A : aperçu des principes Level One
Le [Level One Project](https://www.leveloneproject.org) propose un système de paiements à faible coût pour des paiements numériques inclusifs et interopérables. Le [guide Level One Project](https://www.leveloneproject.org/project_guide/03-welcome-to-the-2019-guide/) décrit une vision de système de services financiers numériques inclusifs au service des populations à faible revenu. Les principes de conception incluent notamment :
* Modèle de paiement en poussée de crédit avec transfert immédiat des fonds et règlement le jour même
* Interopérabilité en boucle ouverte entre fournisseurs
* Respect de normes internationales bien définies et adoptées
* Protection partagée contre la fraude et la sécurité à l’échelle du système
* Exigences d’identité et KYC efficaces et proportionnées
* Convenance, coût et utilité au moins équivalents à l’espèce

En s’appuyant sur une approche numérique ouverte des transactions et en s’associant à des acteurs des secteurs public et privé, le Level One Project vise à fournir l’accès à une infrastructure partagée de services financiers numériques, robuste et peu coûteuse, stimulant l’innovation chez les nouveaux acteurs comme chez les acteurs existants, réduisant les risques et créant une valeur considérable pour les prestataires, les particuliers et les économies des marchés en développement. Des ressources complémentaires aident gouvernements, ONG et fournisseurs de services financiers à mettre en œuvre ces changements.

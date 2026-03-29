---
sidebarTitle: Invariants
---

# Invariants

## Principes généraux

**La fonction première de la plateforme est de compenser les paiements en temps réel et de faciliter un règlement régulier, au plus tard à la fin du jour de valeur.**

1. La plateforme permet aux participants de compenser immédiatement des fonds au profit de leurs clients tout en limitant les risques et coûts associés.

2. La plateforme prend en charge des contrôles par transfert sur la liquidité disponible lorsque cela est nécessaire au premier objectif.

3. Le hub est optimisé pour le chemin critique.

4. Règlement automatisé intrajournalier ; configuré par schéma et implémentation à partir des modèles de règlement recommandés pour l’infrastructure des marchés financiers.

**Le hub prend en charge un traitement *straight-through* entièrement automatique.**

1. Le traitement *straight-through* limite les erreurs humaines dans le transfert et réduit les coûts.

2. Son caractère automatisé accélère les transferts de valeur entre clients finaux.

**Aucun rapprochement manuel n’est requis : le protocole d’interaction avec le hub garantit des résultats déterministes.**

1. Lorsqu’un transfert est finalisé, son statut est sans ambiguïté ; sinon il ne l’est pas et une notification active est envoyée aux participants.
2. Le hub garantit des résultats déterministes pour les transferts et est accepté par tous les participants comme autorité finale (« système d’enregistrement ») du statut des transferts.
3. Le déterminisme signifie que chaque transfert est traçable et auditable (selon limites et contraintes), avec un résultat final dans un délai garanti.
4. Les transferts par lot sont traités ligne par ligne, avec des résultats déterministes potentiellement distincts pour chaque ligne.

**La logique de mise en place de transaction, propre aux cas d’usage, est séparée du transfert d’argent sans logique métier.**

1. Les détails de transaction et règles métier sont capturés et convenus comme règles de schéma et guides d’exploitation technique ; ils peuvent être appliqués pendant la cotation par les contreparties et sont portés entre elles par le Hub.
2. La phase d’accord établit un objet de transaction signé, spécifique au cas d’usage, intégrant tous les détails propres à la transaction.
3. La phase de transfert orchestre la compensation de la valeur de détail entre institutions au profit des contreparties (seuls des contrôles de limites système s’appliquent), sans référence aux détails métier de la transaction.
4. Aucun traitement supplémentaire propre à la transaction pendant la phase de transfert.

**Le hub n’analyse ni n’agit sur les détails de bout en bout de la transaction ; les messages de transfert ne contiennent que les valeurs nécessaires à la compensation et au règlement.**

1. Les contrôles pendant l’étape de transfert portent uniquement sur la conformité aux règles du schéma, les limites, l’authentification des signatures et la validation de la condition de paiement et de son accomplissement.
2. Les transferts engagés pour le règlement sont définitifs et garantis de se régler selon les règles du schéma.

**La sémantique de transfert *credit-push* est réduite à sa forme la plus simple et normalisée pour tous les types de transaction.**

1. Cela simplifie l’implémentation et l’intégration des participants : de nombreux types de transaction et cas d’usage réutilisent le même flux sous-jacent de transfert de valeur.
2. La complexité des cas d’usage est écartée du chemin critique.

**Le hub de services API sur Internet n’est pas un « commutateur de messages ».**

1. Le hub fournit des services API en temps réel aux participants pour les transferts instantanés *credit-push* de détail.
2. Services tels que résolution identifiant → participant, accord de transaction entre participants, soumission de transferts préparés et d’avis d’accomplissement.
3. Des services API auxiliaires couvrent l’intégration, la gestion des positions, le reporting pour rapprochement et d’autres fonctions non temps réel hors traitement de transfert.
4. Tous les messages sont validés par rapport à la spécification API ; les messages non conformes sont rejetés avec un code de motif normalisé interprétable par machine.

**Le hub expose des interfaces asynchrones**

1. Pour maximiser le débit et l’efficacité globale.
2. Pour isoler les problèmes de connectivité en extrémité afin qu’ils n’affectent pas les autres utilisateurs finaux.
3. Pour permettre au hub de traiter les demandes selon ses propres priorités sans conserver une connexion active par transfert.
4. Pour gérer de nombreux processus longs concurrents via batching interne et répartition de charge.
5. Pour disposer d’un mécanisme unique (ex. masse, saisie utilisateur finale, plusieurs sauts).
6. Pour mieux refléter le réseau réel : les problèmes de vitesse ou de fiabilité pour un participant ont un impact minimal sur les autres et sur la disponibilité globale.

**L’API de transfert est idempotente**

1. Les demandes dupliquées peuvent être émises sans risque par l’émetteur en cas de réseau dégradé.
2. Les doublons sont reconnus et conduisent au même résultat (doublons valides) ou sont rejetés comme doublons (si interdits par la spécification) avec référence à l’original.

**Les enregistrements de transferts finalisés sont conservés pendant une période configurable par schéma pour le rapprochement, la facturation et l’analyse forensic**

1. On ne peut pas interroger un « sous-statut » d’un transfert en cours ; l’API fournit un résultat déterministe avec notification active dans le délai de service garanti.

**Les enregistrements des transferts finalisés sont conservés sans limite de durée dans un stockage long pour l’analyse métier par l’opérateur de schéma et les participants (via des interfaces appropriées)**

1. La disponibilité des enregistrements peut être retardée par rapport à la finalité en ligne pour séparer tenue des registres et traitement temps réel des demandes de transfert.

**Le hub peut servir de relais pour certains messages inter-participants (p.ex. pendant la phase d’accord) pour simplifier l’interconnexion, sans analyser ni stocker (au-delà du relais) ni traiter davantage les messages.**

1. Dans certains flux (p.ex. recherche de partie), un point de contact unique pour router les messages liés au schéma peut être souhaitable même si le message n’est pas destiné au hub et ne nécessite pas d’inspection.

**Pour garantir la cohérence arithmétique du système, seule l’arithmétique en virgule fixe est utilisée.**

1. Les calculs en virgule flottante peuvent perdre en précision et ne doivent servir à aucun calcul financier.
2. Voir la représentation et les formes du type décimal Level One.
3. Cette spécification permet l’échange sans perte de précision avec les systèmes financiers basés sur XML.

## Sécurité et sûreté

**Les messages API sont confidentiels, à intégrité vérifiable et non répudiables.**

1. La confidentialité protège la vie privée des participants et de leurs clients.
2. De nombreuses juridictions imposent des exigences légales ; le hub doit appliquer les bonnes pratiques pour protéger cette confidentialité.
3. Des mécanismes d’intégrité à détection d’altération garantissent que les messages ne sont pas modifiés en transit.
4. Chaque destinataire doit pouvoir vérifier de façon fiable que le message n’a pas été altéré en transit.
5. La cryptographie à clé publique (signature numérique) est aujourd’hui le meilleur mécanisme connu pour des messages à intégrité vérifiable.
6. La sécurité de la clé privée (de signature) de l’émetteur est critique.
7. Les règles de schéma doivent préciser les responsabilités en matière de gestion des clés et l’exposition financière en cas de compromission.
8. La non-répudiation garantit que le message a bien été envoyé par l’émetteur déclaré et que ce dernier ne peut nier cette provenance.
9. Ceci est essentiel pour identifier la partie responsable lors d’audits et de résolution de litiges.

**Les messages API sont authentifiés à réception avant acceptation ou traitement ultérieur**

1. L’authentification renforce la confiance dans l’identité de l’émetteur déclaré.
2. Elle renforce aussi la confiance que le message n’a pas été envoyé par une partie non autorisée.

**Les messages authentifiés ne sont pas acquittés comme acceptés tant qu’ils ne sont pas enregistrés de façon sûre sur un stockage permanent**

1. L’API Mojaloop confère une signification métier importante à certains codes de réponse HTTP à différentes étapes des flux.
2. Certaines réponses, p.ex. « 202 Accepted », portent des garanties financières pour les participants et ne doivent être envoyées que lorsque l’entité réceptrice est assurée d’avoir effectué des enregistrements permanents sûrs permettant :
    - la reprise système vers un état cohérent après défaillance(s) de composants distribués ;
    - des processus de règlement exacts ;
    - l’audit et la résolution de litiges.
3. Par exemple, un « 202 Accepted » du hub vers le participant bénéficiaire à réception d’un message d’accomplissement de transfert indique une garantie de règlement de la transaction pour le bénéficiaire.
4. L’API Mojaloop est conçue pour fonctionner en conditions réseau imparfaites, avec nouvelles tentatives et synchronisation d’état intégrées.

**Trois niveaux de sécurité des communications pour l’intégrité, la confidentialité et la non-répudiation entre serveur et client API.**

1. Connexions sécurisées : mTLS obligatoire entre le hub et les participants autorisés — confidentialité, correspondants connus, protection contre l’altération.
2. Messages sécurisés : contenu JSON signé cryptographiquement selon JWS — origine vérifiable et non répudiable par l’émetteur.
3. Conditions de transfert sécurisées : protocole Interledger (ILP) entre payeur et bénéficiaire — intégrité de la condition de paiement et de son accomplissement ; durée de validité limitée de l’instruction de transfert.

## Caractéristiques opérationnelles

**Sur matériel minimal, la base démontrée supporte la compensation de 1 000 transferts par seconde pendant une heure, avec au plus 1 % (étape de transfert) dépassant 1 seconde dans le hub.**

1. La mesure inclut matériel et logiciel nécessaires, sécurité de production et persistance des données.
2. Elle couvre les trois étapes : découverte, accord et transfert.
3. Elle exclut la latence introduite par les participants.
4. Une heure est une approximation raisonnable d’un pic de demande pour un système national de paiement.
5. Le coût unitaire de montée en charge est inférieur au coût de provisionnement initial.
6. 1 000 transferts (compensation) par seconde est un point de départ raisonnable pour un système national.
7. 1 % des transferts (compensation) au-delà de 1 seconde est un point de départ raisonnable.
8. Les schémas Mojaloop doivent pouvoir démarrer à un coût raisonnable pour une infrastructure financière nationale et évoluer économiquement avec la demande.

**Correctement déployé, le hub est hautement disponible et résilient aux défaillances.**

1. Ici « hautement disponible » signifie « capacité à fournir et maintenir un niveau de service acceptable face aux pannes et perturbations ».
2. Chaque schéma peut définir ce qu’est un « niveau acceptable » ; Mojaloop fait des arbitrages contributeurs :
    - lorsque les modes de défaillance le permettent, le service se dégrade pour l’ensemble des participants plutôt que des coupures totales pour certains pendant que d’autres restent servis ;
    - pas de point de défaillance unique : dégradation minimale si un composant unique tombe en panne ;
    - plusieurs instances actives par composant, réparties derrière des répartiteurs de charge ;
    - chaque instance peut traiter les demandes de tout client / participant : aucun participant ne perd toute capacité de transaction à la suite de la panne d’un seul composant.
3. Avec une infrastructure adaptée, des configurations atteignant 99,999 % de disponibilité (« cinq neufs ») sont possibles.
4. Cela inclut des configurations multi-datacenters géographiquement distribuées actif:actif et actif:passif, services et données répliqués sur des nœuds physiques censés échouer indépendamment.
5. Les nœuds des groupes de réplication (et/ou grappes) doivent être dans des emplacements physiques distincts (baies et/ou datacenters), alimentations et interconnexions réseau indépendantes.
6. En cas de défaillances multiples non couvertes par le logiciel Mojaloop, la configuration ou l’infrastructure, l’API Mojaloop permet à chaque entité du schéma de retrouver un état cohérent, le hub étant la source de vérité ultime après restauration complète.
7. Voir aussi les points sur la résistance à la perte de données.
8. Les schémas Mojaloop, en tant qu’éléments d’infrastructures nationales, doivent viser une indisponibilité quasi nulle dans des limites de coût raisonnables.
9. Les pannes matérielles et logicielles sont attendues ; elles doivent être anticipées dans la conception du hub pour limiter perte ou dégradation de service et/ou de données.
10. Les arbitrages privilégient la disponibilité globale et la cohérence d’état par rapport à la performance brute :

	- tous les participants peuvent continuer à moins grande cadence plutôt que certains être totalement bloqués ;
	- les incohérences d’état entre entités du schéma sont récupérables après restauration via l’API Mojaloop, avec un rapprochement manuel minimal ; le hub reste la source de vérité.

**Le hub résiste à la perte de données en cas de défaillances.**

1. Avec une infrastructure adaptée, le logiciel Mojaloop peut répliquer de façon fiable les données sur plusieurs nœuds de stockage physiques redondants avant traitement.
2. Les moteurs de base fournis par les mécanismes de déploiement Mojaloop supportent notamment :

	- réplication primaire:secondaire asynchrone ;
	- réplication primaire:primaire synchrone ;
	- réplication par algorithme de consensus synchrone à quorum.

3. Les mécanismes disponibles dépendent de la couche de stockage et des technologies de base employées.
4. En cas de défaillances multiples non couvertes, l’API Mojaloop permet de retrouver un état cohérent avec une exposition financière minimale.
5. Les transferts deviennent juridiquement contraignants lorsque le hub a répondu avec succès à un message d’accomplissement de transfert du participant bénéficiaire — réponse émise seulement après persistance du message d’accomplissement et de son issue dans la base du grand livre.
6. Les horodatages d’expiration sur les messages API financièrement significatifs permettent des chemins d’échec déterministes et opportuns pour tous les participants, avec mécanismes de nouvelle tentative automatisés.
7. Les schémas Mojaloop, en infrastructures nationales, doivent autant que possible, dans des limites de coût raisonnables, éviter toute perte de données.
8. Les pannes sont attendues ; la conception du hub doit les anticiper pour éviter la perte de données.
9. Les participants ont besoin d’une confiance rapide dans le statut des opérations financières sur le schéma pour limiter l’exposition et offrir une bonne expérience client.

## Applicabilité

La présente version de ce document correspond à Mojaloop version [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0).

## Historique du document
  |Version|Date|Auteur|Détail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|14 avril 2025| Paul Makin|Ajout du contrôle de version|
|1.0|5 février 2025| James Bush|Version initiale|

# Fil de travail performance

Mercredi 11 mars 2020

## Objectifs performance

- Système matériel actuel : 1 k TPS stable en régime établi, pic 5 k, scalabilité horizontale démontrée
  1. Plus d’instances ≈ plus de performance, de façon quasi linéaire.
  1. Valider l’infrastructure minimale pour 1 k TPS (TPS financiers).
  1. Déterminer la configuration d’entrée et le coût (AWS et sur site)

## POC

Tester l’impact d’un remplacement direct de MySQL par un service réseau mémoire partagée type Redis (algorithme Redlock si des verrous sont nécessaires).

Tester une autre façon de partager l’état : version allégée orientée événements avec du CQRS.

## Ressources

- Canal Slack : `#perf-engineering`
- [Présentation performance mi-PI](https://github.com/mojaloop/documentation-artifacts/tree/master/presentations/March2020-PI9-MidPI-Review)
- [Mise en place des composants de monitoring](https://github.com/mojaloop/helm/tree/master/monitoring)

## Actions / suivi

- Quelles métriques Kafka (client et broker) suivre ? — assistance Confluent
- Explorer verrouillage et règlement de position — assistance Sybrin
  1. Examiner RedLock — verrouillage pessimiste vs automatique
  2. Supprimer la base partagée centrale (verrouillage automatique sur Redis)

- Combiner prepare / position handler avec une base distribuée
- Examiner le client Node.js et son impact sur Kafka, la configuration de Node et le client Kafka final — Nakul
- Réactiver le tracing pour la latence et le comportement des applications
- Vérifier que les comptes d’appels ont été rationalisés (niveau détaillé)
- Valider les temps de traitement sur les handlers et l’utilisation du cache
- Modèles asynchrones dans Node
  1. Manque d’expert MySQL / Percona approfondi
  2. Exploitons-nous correctement ces briques ?

- Quelle couche de cache (en mémoire) ?
- Examiner la modélisation événementielle — identifier les événements du domaine
- Node.js / Kubernetes —
- Prioriser les problèmes applicatifs plutôt que purement d’architecture
- Revue de l’approche asynchrone (problème Node.js plus large) — modèles à threads à optimiser — Nakul

## Notes de réunion / détails

### Historique

1. Mise en place technologique ; l’espoir était que la conception réponde à un besoin entreprise
2. L’effort communautaire n’a pas priorisé des « tranches » du système de niveau entreprise ou peu coûteuses à exploiter
3. Choix technologiques OSS

### Objectifs

1. Optimiser le système actuel
2. Réduire les coûts d’exploitation
3. Permettre de scaler jusqu’à 5 k TPS
4. Garantir que les services à valeur ajoutée accèdent de façon efficace et sécurisée aux données de transaction

### Contraintes de test

1. Seulement le « golden transfer » — jambe de transfert
2. Flux de transfert
3. Simulateurs (ancien et avancé) — ancien pour continuité
4. Gestionnaire de timeout désactivé
5. 8 DFSP (organisations participantes) — avec plus de DFSP on pourrait scaler davantage

### Processus

1. Jmeter initie la requête payeur
2. L’ancien simulateur reçoit le callback fulfill notify
3. L’ancien simulateur traite le payé, initie le callback d’exécution
4. Enregistrement dans la table positions pour chaque DFSP
    - a. Algorithme partiel avec verrouillage pour réserver les fonds, calculs et commits finaux
    - b. Le gestionnaire de positions traite un enregistrement à la fois

5. Un algorithme futur pourrait traiter en lot

- Un transfert est géré par un gestionnaire de positions
    - Les transferts sont tous préfinancés

1. Réduction des coûts de règlement
2. Contrôle de la vitesse de réponse des DFSP à la requête fulfill (finaliser les transferts engagés avant les nouvelles requêtes)
- Le système doit expirer les transferts dépassant 30 secondes
  - Toute refonte des bases
  - Cas de test

- Transaction financière
  - Bout en bout
  - Prepare seulement
  - Fulfil seulement

- Caractérisation Mojaloop par service
  - Services et handlers
  - Architecture streaming et bibliothèques
  - Base de données
  - Qu’est-ce qui a changé : 150 à 300 TPS ?

- Traitement des messages
- Gestionnaire de positions (mode mixte, aléatoire
  - Mesure de latence

1. 5 s pour la base, X s pour Kafka
2. Comment mesurer ?

### Cibles

1. Assez haut pour que le système fonctionne correctement
2. Monter en charge (ajout de x DFSP)
3. Cas suspects à investiguer
4. Observer les contentions autour de la base
5. Base partagée, 600 ms sans erreur
  - Contention entièrement sur la base
  - Goulot : base (distribuer les systèmes pour indépendance)

- 16 bases de données bout en bout
- GSMA — 500 TPS
- Quelle conception optimale ?

### Contentions

1. Contention au niveau handler système
    - Où le système peut scaler
2. Si des changements d’architecture sont nécessaires, on peut explorer
    - Cohérence par DFSP
    - Parallélisation des flux d’information — question ouverte

1. Résultats « sku » d’une seule base pour tous les DFSP
1. Défi : où arrive-t-on avec du matériel supplémentaire ?
    - Limites de la conception applicative
1. Transferts financiers (entrants / sortants du système)
    - Systèmes d’audit
    - Activité de règlement
    - Regrouper en base résout certains problèmes
    - Retour Confluent

1. Problèmes de base partagée, bases multiples

1. Problèmes au niveau conception applicative

1. Cas où de nombreux simulateurs / bacs à sable ont été lancés
    - S’appuyer sur traceurs et scans en production
    - Miguel : tracing désactivé pour l’instant

### Problèmes connus

1. Charge CPU sur les machines (Node en attente) — réoptimiser le code
2. Les temps de traitement augmentent avec le temps

## Optimisation
 1. Monolithe distribué — PRISM — supprimer les lectures redondantes
 2. Fusionner les handlers — Prepare+Position et Fulfil+Position

### Qu’est-ce qu’on cherche à corriger ?
  1. Pouvons-nous scaler le système ?
  2. Quel coût pour scaler ? (coût unitaire de scale)
  3. Comprendre comment faire petit et grand scale
  4. Ressources optimisées
  5. 2,5 sprints
  6. Besoin de scaler horizontalement
  7. Ajouter audit et reproductibilité

### Participants

- Don, Joran (nouvel expert perf) — Coil
- Sam, Miguel, Roman, Valentine, Warren, Bryan, Rajiv — ModusBox
- Pedro — Crosslake
- Rhys, Nakul Mishra — Confluent
- Miller — Gates Foundation
- Présents : Lewis (CL), Rob (MB), Roland (Sybrin), Greg (Sybrin), Megan (V), Simeon (V), Kim (CL)

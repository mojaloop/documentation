# Revue de conception technique et revue de code

Le logiciel Mojaloop est conçu pour constituer l’épine dorsale de schémas de paiements instantanés inclusifs à l’échelle nationale. Ces schémas sont des éléments majeurs d’infrastructure financière nationale qui soutiennent des activités quotidiennes essentielles pour de nombreuses personnes. Les adoptants et utilisateurs exigent un niveau très élevé de qualité, sécurité, fiabilité et résilience.

Pour préserver ces qualités et atténuer les risques, la Fondation Mojaloop applique un processus d’ingénierie produit structuré : contrôle des changements et traçabilité, revues de conception et de code, seuils de tests élevés et plusieurs niveaux d’assurance qualité.

Ces processus aident les contributeurs à identifier et réduire les risques tout en améliorant les produits.

Lisez attentivement les définitions et l’application à votre travail **avant de commencer**.

**Si vous ne suivez pas ces processus, il pourra vous être demandé de refaire le travail, ou la contribution pourra être refusée si elle ne respecte pas nos normes, avec des retards importants pour une release officielle Mojaloop. Voir les explications sur le [processus de don externe](product-engineering-process.md#non-official-workstreams-and-external-contributions).**

## Qu’est-ce que la revue de conception technique ?

La « revue de conception technique » est un processus par lequel un ou plusieurs ingénieurs experts du domaine, membres de la Design Authority Mojaloop, connaissant les zones du système concernées, examinent les changements proposés avec les contributeurs et les représentants produit **avant le début de l’implémentation**, pour :

- Gestion des risques
    - Identifier et atténuer les risques techniques et/ou métier pour les parties prenantes, utilisateurs ou autres contributeurs.
- Évaluation d’impact
    - Repérer d’autres zones du système, équipes et parties prenantes impactées et faciliter la communication.
- Normes et cohérence
    - Orienter vers les normes Mojaloop (outils, composants tiers, motifs de conception) pour préserver la cohérence de la base de code.

Pour les changements non triviaux, le processus consiste à collaborer avec la Design Authority pour produire un document de conception détaillant le changement. Après implémentation, ce document enrichit la documentation communautaire et explique les décisions historiques.

## Qu’est-ce que la revue de code ?

La « revue de code » est un processus par lequel un ou plusieurs ingénieurs examinent des changements de code proposés **avant fusion dans la branche principale**, pour :

- Assurance qualité
    - Détecter défauts, bugs ou pistes d’amélioration avant fusion ; logiciel de meilleure qualité.
- Partage des connaissances
    - Apprendre des approches des pairs, bonnes pratiques et motifs ; diffusion de l’expertise.
- Cohérence
    - Maintenir style, normes et conventions ; base de code homogène.
- Réduction des risques
    - Plusieurs regards pour risques, sécurité et performances avant la production.
- Retours et amélioration
    - Feedback constructif, alternatives, discussion des choix de conception ; amélioration continue.
- Propriété collective du code
    - Responsabilité partagée plutôt qu’individuelle.

## Types de changement

Le processus dépend de la nature du changement et de son impact sur les utilisateurs et le système.

Identifiez la catégorie ci-dessous et suivez le processus correspondant. En tant que contributeur, vous devez appliquer le bon processus ; l’accord de contributeur confirme le respect de ces exigences.

En cas de doute, consultez la Design Authority sur Slack : [#design-authority](https://mojaloop.slack.com/archives/CARJFMH3Q). Engagez la revue de conception requise **avant** tout code pour éviter un travail à refaire.

### Changements non conséquentiels

#### Définition et caractéristiques

Un changement de code non conséquentiel est une modification petite et très isolée sur du code existant. Il n’affecte pas la structure interne ou externe ni la fonctionnalité au niveau local (entrées/sorties) ; il vise souvent la lisibilité, le style ou de petites optimisations. Risque faible.

Il ne modifie pas les interfaces externes, la fonctionnalité ou le comportement observable externe d’un ou plusieurs composants.

Il ne modifie pas la structure interne des composants.

_Note importante : si votre changement est une optimisation qui modifie l’implémentation d’un algorithme, évaluez si une revue de conception ou une revue de code renforcée est nécessaire. Mieux vaut solliciter plus de regards qu’introduire une régression._

#### Exemples

- Renommer des variables
- Ajuster l’indentation
- Ajouter des commentaires
- Supprimer des imports inutilisés
- Optimiser de petits algorithmes

#### Processus de revue de conception et de code requis

1. Pas de revue de conception obligatoire, mais possible en cas de doute.
2. Au moins une approbation d’un « code owner » sur tous les fichiers modifiés.
    1. S’il n’y a pas de code owners pour certains fichiers, ouvrez un ticket auprès de {coordonnées} pour en définir. Tous les fichiers de l’organisation GitHub Mojaloop devraient avoir des code owners.
3. Revues par les pairs supplémentaires souhaitées ; plus il y a de regards, mieux c’est.

### Changements conséquents

#### Définition et caractéristiques

Les changements conséquents modifient le comportement, la fonctionnalité, les caractéristiques opérationnelles ou les performances d’un sous-système ou du système dans son ensemble : logique métier, nouvelles fonctionnalités, correctifs, dépendances, refactorings importants. Ils exigent réflexion et coordination en amont en raison de l’impact potentiel sur la stabilité et les fonctionnalités. Risque plus élevé.

_Note importante : si vous pensez être dans les changements conséquents, vérifiez aussi la catégorie [« Changements critiques »](#critical-changes)._

#### Exemples

- Modifier l’implémentation d’une méthode d’API interne existante
- Ajouter une nouvelle méthode d’API interne
- Modifier la définition ou le comportement d’une interface interne
- Changer une dépendance de service de fond (ex. type de SGBDR)
- Changer une dépendance de code (ex. remplacer un parseur YAML)
- Refactorings sur plusieurs fichiers
- Changements de configuration de déploiement (ex. Infrastructure as Code)

#### Processus de revue de conception et de code requis

Les changements conséquents doivent suivre le [processus des changements conséquents](consequential-change-process.md).

### Changements critiques

#### Définition et caractéristiques

_**Dans Mojaloop, les « changements critiques » recouvrent en grande partie la même définition que les changements conséquents, mais s’appliquent aux zones considérées comme critiques pour les fonctionnalités cœur et les cas d’usage principaux.**_

Ils impactent le comportement, la fonctionnalité, les caractéristiques opérationnelles ou les performances d’un sous-système critique, du système ou d’autres artefacts. Ils impliquent souvent la logique d’un composant ou service critique (nouvelles fonctionnalités, bugs, dépendances, refactoring). Coordination importante en amont ; risque très élevé.

Un changement est critique s’il touche notamment :

- APIs externes :
    - Toute modification de spécification d’API externe, chemins nominaux ou d’erreur, y compris validation et correctifs.
    - Toute modification de l’implémentation de gestion des requêtes d’API externe, chemins nominaux ou d’erreur, y compris validation et correctifs.
        - « API externe » : toute API exposée hors du périmètre du switch (ex. FSPIOP API, etc.).
- APIs d’administration :
    - Tout changement de spécification d’API d’administration.
    - Tout changement d’implémentation des requêtes d’API d’administration (chemins nominaux ou d’erreur, validation, correctifs).
- Phase de découverte du flux de transfert :
    - Tout changement dans la gestion des requêtes de la phase de découverte, ex. :
        - Gestion des requêtes de recherche de compte et flux vers des « oracles » internes ou externes.
- Phase d’accord du flux de transfert :
    - Tout changement dans la gestion des requêtes de la phase d’accord, ex. :
        - Stockage, récupération, traitement ou affichage des données ou métadonnées d’accord.
        - Implémentations et flux d’appels vers des entités internes ou externes.
- Phase de transfert (compensation) :
    - Tout changement dans la gestion des requêtes de la phase de compensation, ex. :
        - Décision de compenser ou rejeter selon la liquidité disponible (contrôle de liquidité).
        - Calcul, stockage, récupération, traitement ou affichage des plafonds de débit net des participants.
        - Calcul, stockage, récupération, traitement ou affichage de la liquidité disponible.
        - Calcul, stockage, récupération, traitement ou affichage de toute valeur monétaire.
        - Calcul, stockage, récupération, traitement ou affichage des données ou métadonnées de transfert.
        - Tout changement dans le pipeline de préparation de transfert.
        - Tout changement dans le pipeline d’exécution de transfert.
- Règlement :
    - Toute modification de spécification d’API de règlement interne ou externe (chemins nominaux ou d’erreur, validation, correctifs).
    - Toute modification d’implémentation de gestion des requêtes de règlement (idem).
    - Tout changement concernant l’inclusion ou l’exclusion de transferts pour le batch de règlement.
    - Tout changement sur le calcul, stockage, récupération, traitement ou affichage des données ou métadonnées de règlement.

#### Exemples

- Corriger un bug dans une méthode de validation de l’API FSPIOP
- Ajouter une fonctionnalité à une API d’administration
- Modifier le format d’affichage des devises dans un portail web
- Mettre à niveau une dépendance externe (ex. paquet npm d’un service lié au grand livre)
- Optimiser les appels au stockage pendant le traitement d’une requête d’API externe

#### Processus de revue de conception et de code requis

Les changements critiques doivent suivre le [processus des changements critiques](critical-change-process.md).




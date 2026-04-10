# Contexte du RBAC
Le Hub Mojaloop utilise une méthode de contrôle d'accès basé sur les rôles (RBAC) pour atténuer les risques.

## Qu'est-ce que le RBAC et comment le concevoir ?

Le contrôle d'accès basé sur les rôles (RBAC) est une méthode de restriction de l'accès au réseau en fonction des rôles des utilisateurs individuels au sein d'une entreprise. Le RBAC permet aux employés d'avoir des droits d'accès uniquement aux informations dont ils ont besoin pour effectuer leur travail et les empêche d'accéder aux informations qui ne les concernent pas.

La conception RBAC pour un opérateur de hub décrit les points de contrôle de sécurité qui doivent être pris en compte ou étendus afin d'atténuer les risques au sein d'une organisation typique d'exploitation de hub Mojaloop. Certains points de contrôle sont liés aux processus métier et à la structure organisationnelle, certains points de contrôle sont techniques et concernent les couches d'identification, d'authentification et d'autorisation, et certains points de contrôle nécessitent une surveillance. Les trois doivent être pris en compte pour créer la responsabilité et atténuer les risques.

Ce document couvre :
1. Vue d'ensemble du RBAC.<br>
Où nous discutons des principes RBAC et des structures organisationnelles.
2. Implémentation technique des contrôles RBAC.<br>
Spécifiquement ce qui est important pour une implémentation Mojaloop et comment l'appliquer techniquement.
3. Recommandations de rôles
4. Exigences et approche de surveillance.

## Vue d'ensemble du RBAC

### Principe du moindre privilège

Le RBAC utilise le principe de sécurité du moindre privilège. Le moindre privilège signifie qu'un utilisateur dispose précisément du niveau de privilège nécessaire pour effectuer son travail. L'objectif est de minimiser la probabilité d'attribuer à un utilisateur des permissions excessives pour effectuer des actions dans l'écosystème Mojaloop.

### Implémentation Zero Trust de Mojaloop

Un réseau zero trust est un réseau dans lequel aucune personne, appareil ou réseau ne bénéficie d'une confiance inhérente. Toute confiance, qui permet l'accès aux informations, doit être méritée, et la première étape consiste à démontrer une identité valide. Un système doit savoir qui vous êtes, avec certitude, avant de pouvoir déterminer ce à quoi vous devriez avoir accès.

La conception inhérente de Mojaloop implémentera une approche Zero Trust dans son architecture et son déploiement, exigeant que toutes les entités qui interagissent s'authentifient d'abord, puis demandent l'autorisation d'accéder et de traiter les données en fonction du rôle auquel elles appartiennent.

### Séparation des fonctions

La séparation des fonctions vise à atténuer le risque de fraude interne en fixant des limites entre les rôles attribués à un employé, et entre les conflits d'intérêts pouvant résulter des responsabilités d'un employé, en veillant à ce qu'aucun utilisateur unique ne puisse avoir le contrôle fonctionnel de bout en bout d'un processus métier et de ses données. Cela nécessite que plus d'un individu crée, traite et complète une action.

### Audit

L'audit devrait travailler en collaboration avec les équipes métier et informatiques pour séparer ces fonctions dans la mesure du possible et attribuer un contrôle d'atténuation approprié dans les cas où cela n'est pas faisable. De plus, ces contrôles devraient être surveillés sur une base trimestrielle et les résultats doivent être signalés à la direction.

Quelques définitions contextuelles incluent :
1. **Action** : un événement distinct déclenché par un utilisateur qui entraîne :
   - La création d'un actif de données
   - La lecture ou l'accès à un actif de données
   - La mise à jour ou la modification de l'état d'un actif de données
   - La suppression ou le retrait d'un actif de données d'une application ou d'une base de données.
2. **Permission** : autorité pour effectuer une action spécifique dans le contexte d'une application ou d'un service
3. **Rôle** : applications, actions et accès aux données nécessaires pour effectuer les tâches liées à un rôle unique
4. **Relation utilisateur - rôle** : Le ou les rôles attribués à chaque utilisateur qui définissent les permissions dont ils disposent

## Implémentation technique du RBAC

Un individu qui a besoin d'accéder aux différents portails de gestion du Hub Mojaloop peut être enregistré et un « compte » généré, qui peut être utilisé pour accéder à divers aspects d'une instance opérationnelle d'un Hub Mojaloop et pour fournir une base d'audit de cet accès en liant les activités à l'enregistrement original. Aux fins de ce document, un « compte » est une identité numérique, un moyen d'authentifier (lier) la personne revendiquant cette identité à l'enregistrement original, et un ensemble d'attributs, qui incluront - entre autres - un ensemble de droits d'accès, ou des droits qui sont activés par la possession de ces attributs.

Le processus d'enregistrement implique la vérification d'identité, la vérification des antécédents, etc. L'individu reçoit ensuite des identifiants - un identifiant de compte de connexion/identité numérique et au moins une méthode d'authentification, qui peut inclure un mot de passe et une authentification à deux facteurs (2FA).

::: tip NOTE
La portée de ce document ne se limite pas aux opérateurs du Hub Mojaloop. Il aborde également les aspects de l'accès des opérateurs DFSP aux portails Payment Manager.
:::

### Considérations relatives à la 2FA

Il convient de noter que la 2FA via un téléphone mobile peut être inappropriée pour certains rôles, car les rôles très sensibles peuvent exiger que les téléphones mobiles soient rangés sous clé pendant que l'individu est « en service ». Cela nécessitera d'autres méthodes de 2FA, telles que des jetons physiques.

### Utilisateurs, actions et rôles dans un contexte Mojaloop

Mojaloop aura 2 grandes catégories d'utilisateurs :

1. **Humains** <br>
Ce sont les utilisateurs du hub et des DFSP qui, à travers diverses interfaces, interagiront avec Mojaloop. Les utilisateurs DFSP interagiront avec Mojaloop à travers le Payment Manager et les portails qui seront mis à disposition pendant le processus d'intégration.
2. **Non-humains** <br> 
Ceux-ci automatiseront les processus métier et les tâches qui seraient autrement effectuées par un humain. Ils communiqueront via des appels API qui effectueront des actions pour répondre aux exigences métier.

Le contexte de ce document se concentrera uniquement sur les utilisateurs humains.

### Gestion du cycle de vie des utilisateurs

Le « cycle de vie du compte utilisateur » définit les processus de gestion collectifs pour chaque compte utilisateur. Ces processus peuvent être décomposés en Création, Révision/Mise à jour et Désactivation — ou « CRUD ». Si une organisation utilise des ressources informatiques de quelque nature que ce soit, elle s'appuie sur des comptes utilisateurs pour y accéder.

### Intégration

Le processus d'intégration comprendra certaines activités impliquant la création d'utilisateurs tant du côté DFSP que du Hub. Celles-ci seront les suivantes :

1. Hub : Les utilisateurs suivants seront créés
   - Opérateurs du Hub
   - Administrateurs du Hub
2. DFSP
   - Opérateurs DFSP
   - Administrateurs DFSP (applicable uniquement au Payment Manager).


### Processus de détermination de la séparation des fonctions

1. Définir les flux de travail et processus de gestion des utilisateurs. Ce sont tous les processus métier qui composent les actions métier Mojaloop dans Mojaloop. Les exemples incluent l'intégration.
1. Rationaliser toutes les exigences d'accès de sécurité des utilisateurs pour les applications de Mojaloop comme indiqué dans le tableau ci-dessous :
   - Définir les fonctions métier et applicatives pour les utilisateurs et les API
   - Définir les profils de rôles
   - Définir les profils de fonctions et de compétences
   - Rassembler une liste des conflits de séparation des fonctions applicables en définissant les rôles de séparation des fonctions
   - Tableau matriciel des profils de rôles (avec des données d'exemple) :

| **Rôles et Permissions**  **Matrice** | Utilisateurs Hub | Administrateur | Utilisateur Maker Standard | Utilisateur Checker Standard | Lecture Seule Standard | Utilisateurs DFSP | Administrateur | Utilisateur Maker Standard | Utilisateur Checker Standard | Lecture Seule Standard |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Rôles d'intégration | X | | | | | | | | | |
| Créer un compte utilisateur | X | | | | | | | | | |
| Créer un profil DFSP | X | | | | | | | | | |
| Créer un utilisateur DFSP | X | | | | | | | | | |
|
| **Portail Financier** |
| Voir les rapports | | | X | X | X | | | X | X | X |
| Configuration de la plateforme | | | | | | | | | | |
|

3. Reconfigurer les rôles en conflit
   - Approbations métier
   - Création d'utilisateurs Maker/Checker
4. Rapports périodiques sur l'accès au système et l'autorisation des utilisateurs
5. Séparation de la sécurité informatique et de la sécurité informatique opérationnelle qui soutiendra les activités de gestion des utilisateurs

### Meilleures pratiques pour le RBAC et la gestion des identités Mojaloop

1. Tous les identifiants d'utilisateurs doivent être uniques et avoir un format unique qui peut être corrélé dans le hub mais pas significatif pour les personnes extérieures.
2. Les utilisateurs DFSP n'auront accès à aucun rôle administratif du Hub
3. Tous les utilisateurs non-humains doivent être empêchés de se connecter aux interfaces applicatives.
4. Les utilisateurs DFSP seront formés sur les rôles et les meilleures pratiques
5. Appliquer le provisionnement automatisé des utilisateurs et la gestion du cycle de vie.
6. Classer les actions effectuées dans Mojaloop pour identifier les actions métier à risque nécessitant des contrôles supplémentaires.
7. Les contrôles supplémentaires pour atténuer les risques RBAC peuvent inclure :
   - Authentification multifacteur (MFA)
   - Journalisation d'audit avec alertes
   - Désactivation / blocage automatique du profil utilisateur
8. Mojaloop surveillera l'inactivité des utilisateurs et désactivera les utilisateurs inactifs sur une période spécifiée
9. Appliquer une politique centralisée d'application à travers les identités, par ex. politique de mots de passe, politiques de connexion, MFA, authentification basée sur le risque, etc.
10. Identifier et surveiller de près les identités privilégiées qui ont des permissions pour effectuer des actions sensibles. 
Les éléments suivants s'appliquent aux utilisateurs privilégiés :
    - Les privilèges avancés doivent être demandés et approuvés au cas par cas ;
    - Les administrateurs doivent avoir leurs permissions privilégiées pour le minimum de temps possible ;
    - Les administrateurs ne doivent avoir que les permissions nécessaires pour accomplir une tâche spécifique ;
    - L'appartenance aux groupes administratifs doit être révisée régulièrement ;
    - Appliquer l'authentification multifacteur pour les utilisateurs administratifs ;
    - Conserver les journaux d'accès, les audits et configurer des notifications en temps réel lorsque l'accès est activé.
11. Mojaloop configurera des journaux d'audit et des alertes pour toutes les actions des utilisateurs dans Mojaloop. Dans la mesure du possible, explorer l'analytique des identités via des outils open source applicables.

### Gestion automatisée des identités et contrôle RBAC

Les outils préférés pour la gestion des utilisateurs et des identités dans un déploiement Mojaloop sont :

1. **Moteur de gestion des identités KeyCloak** – Stocker et traiter les contrôles d'authentification API ainsi qu'agir comme passerelle API.
2. **Moteur de gestion des identités WSO2** – Stocker et traiter les profils de rôles des utilisateurs et gérer l'auto-intégration des utilisateurs DFSP.

## Conception des rôles au sein de votre organisation

Un utilisateur avec un compte qui permet l'accès au Hub aura des rôles associés à ce compte, qui définissent ce qu'il peut faire une fois authentifié et connecté.

De nombreux rôles s'appliquent à plusieurs portails, cependant, certains rôles peuvent être spécifiques à des portails individuels.

Une attention particulière doit être portée lors de l'attribution de plusieurs rôles à un compte, ou de plusieurs comptes à une même personne physique. Cela est dû au potentiel qui se présente pour le contournement des contrôles. Une partie de l'objectif du RBAC est de s'assurer que plus d'une personne doit être dans la chaîne d'autorisation pour les actions importantes, réduisant ainsi les vulnérabilités liées aux acteurs malveillants.

### Portails de l'écosystème Mojaloop

L'écosystème Mojaloop offre un certain nombre de portails, qui prennent en charge divers degrés de contrôle d'accès et de RBAC. Ceux-ci sont divisés en deux groupes :

- Portails du Hub, qui sont liés au fonctionnement du Hub lui-même
- Portails Payment Manager, qui sont liés à la gestion de la connexion d'un DFSP spécifique au Hub

### RBAC dans le Hub Mojaloop

Dans l'environnement du Hub Mojaloop, le RBAC est implémenté à travers une combinaison d'outils - Ory Oathkeeper pour la gestion des identités, et Keycloak pour le contrôle d'accès (y compris les rôles et le maker/checker).

Le Hub lui-même possède les portails suivants :

- **Intégration de l'opérateur du Hub :**<br>
Actuellement, il n'existe pas de solution intégrée de gestion des identités et des accès (IAM) pour les opérateurs du Hub, bien que la fonction soit partiellement remplie par l'utilisation de WSO2. Des travaux de développement sont en cours pour développer une solution IAM complète basée sur Ory et Keycloak. Cela verra un opérateur administrateur créé parallèlement au déploiement du Hub, ce qui constitue une première étape fondamentale dans ce domaine.
- **Portail Financier :** <br>
Il a deux fonctions principales : la gestion des opérations de règlement, et la gestion de la position de liquidité des DFSP individuels (et en relation avec cela, leur valeur de plafond de débit net (NDC)).
L'accès au portail financier est actuellement limité à une simple fonction de contrôle d'accès par nom d'utilisateur/mot de passe.
- **Cycle de vie des participants :** <br>
Contrôle et configuration de l'accès au Hub par les DFSP.
D'un point de vue technique, cela est actuellement réalisé par l'utilisation du Mojaloop Connection Manager (MCM). Cependant, il est prévu que le MCM lui-même sera développé pour présenter une API, qui pourra être utilisée pour développer une interface utilisateur disponible pour les opérateurs du Hub et pour les DFSP.
- **Opérations du Hub :** <br>
Celles-ci comprennent les recherches de transactions, la surveillance de l'état et des performances, les tableaux de bord et l'ensemble des opérations techniques.
Actuellement, celles-ci sont réalisées grâce à l'utilisation de Prometheus/Grafana et d'une gamme d'autres outils, avec un contrôle d'accès standard intégré dans ces outils eux-mêmes. Il est prévu que cela sera migré vers la solution Ory/Keycloak, au fur et à mesure de son développement.

D'autres opérations du Hub, telles que la gestion de la fraude et la gestion des cas/litiges, sont des modules complémentaires qui implémentent leur propre contrôle d'accès pour gérer l'accès à leurs fonctions sensibles. Ceux-ci ne sont pas abordés dans ce document.

En plus des mesures de contrôle d'accès ci-dessus, il convient de noter que l'accès à toutes ces fonctions n'est possible que via un VPN, avec des identifiants individuels contrôlant l'accès.

En plus de ces portails, il existe deux autres moyens principaux d'accéder au Hub, dont aucun n'est soumis au RBAC :

- Le premier concerne les transactions, qui sont strictement contrôlées selon leurs propres mesures de cybersécurité multicouches.
- Et deuxièmement, les paiements en masse (gouvernement vers personne - G2P), qui sont pris en charge au moyen d'une API soumise aux mêmes contrôles que les autres transactions individuelles. Il est prévu que les paiements en masse seront un service fourni aux DFSP (et à leurs clients) au moyen d'une API sécurisée, le DFSP exploitant un portail de paiements en masse pour l'utilisation par ses clients. Il est possible que l'opérateur d'une instance du Hub Mojaloop puisse mettre à disposition un portail de paiements en masse en marque blanche, qui s'interface avec l'API de paiements en masse du Hub, pour personnalisation par tout DFSP souhaitant offrir le service à ses clients. (Notez que cette approche n'est pas unique : une approche similaire a été proposée, par exemple, pour les paiements marchands, avec une application en marque blanche pour les transactions par code QR mise à disposition des DFSP pour intégration dans leurs portefeuilles mobiles.)

Les contrôles d'accès autour des paiements individuels ou en masse ne sont donc pas abordés davantage dans ce document.

### Payment Manager pour l'intégration

Payment Manager est actuellement l'un des principaux mécanismes d'intégration des DFSP à un Hub Mojaloop. Alors que le Hub est unique dans un schéma, il existe une instance distincte de Payment Manager pour chaque DFSP. Les portails offerts par Payment Manager doivent donc être sécurisés au moyen du RBAC pour limiter l'accès aux représentants autorisés du DFSP.

Dans l'environnement Payment Manager, le RBAC est implémenté uniquement via Keycloak.

Les portails suivants sont disponibles :

- **Intégration utilisateur/opérateur :**
Payment Manager inclut Keycloak pour l'IAM. Lors du déploiement, un utilisateur administrateur unique est créé, qui peut être utilisé pour créer d'autres comptes utilisateurs.
- **Gestion de la connexion au Hub :**
Cela inclut la possibilité de configurer la connexion au Hub du côté Payment Manager, et par implication de la désactiver. C'est donc une fonction contrôlée, avec des contrôles différents pour la visualisation par rapport à la modification.
- **Investigation des transactions :**
Il est possible d'investiguer les requêtes de transactions en utilisant le portail Payment Manager. Cela est potentiellement problématique si des informations personnellement identifiables (PII) sont disponibles via le portail.

### Comptes fondamentaux

Au moment où un Hub est mis en place pour la première fois, Ory/Keycloak sera utilisé pour créer un compte utilisateur fondamental avec des privilèges d'administrateur. Un administrateur système se verra attribuer ce compte. Notez que l'administrateur système ne se verra attribuer aucun rôle opérationnel au-delà de ceux d'un administrateur système.

Toutes les fonctions exécutées à l'aide d'Ory/Keycloak sont soumises à une journalisation au niveau du système à des fins d'audit.

L'administrateur système utilisera ensuite Ory/Keycloak pour créer d'autres comptes utilisateurs, sous réserve de vérifications d'identité et de contrôles d'antécédents standard pour chaque individu (définis dans les règles du schéma associées à un déploiement Mojaloop particulier) avant que leurs comptes ne soient créés.

Ces nouveaux comptes utilisateurs se verront attribuer l'un de ces rôles :

- OPERATOR
- MANAGER

Un compte utilisateur ne peut pas avoir à la fois les rôles OPERATOR et MANAGER.

### Comptes supplémentaires

En plus de l'administrateur système, les comptes fondamentaux auront la possibilité d'utiliser Ory/Keycloak pour ajouter d'autres comptes. Cependant, pour ces utilisateurs, cette activité sera soumise à des contrôles maker/checker. Un utilisateur avec le rôle OPERATOR pourra créer un compte utilisateur (avec des processus en place pour garantir que la diligence raisonnable en matière de vérification d'identité et de contrôle des antécédents a été effectuée). Cependant, ce compte ne sera pas activé tant qu'une personne avec le rôle MANAGER ne l'aura pas approuvé.

Un rôle sera attribué à chacun de ces comptes lors de leur création. En plus des rôles associés aux comptes fondamentaux, les rôles suivants peuvent être attribués aux nouveaux comptes utilisateurs :

- ADMINISTRATOR
- FINANCE_MANAGER

Un compte utilisateur ne peut pas avoir plus d'un des rôles OPERATOR, MANAGER, ADMINISTRATOR ou FINANCE_MANAGER, afin d'assurer la séparation de :

- La gestion financière des autres tâches d'exploitation du Hub
- Les rôles d'opérateur et de gestionnaire dans les fonctions maker/checker

::: tip NOTE
L'attribution des rôles ADMINISTRATOR ou FINANCE_MANAGER est soumise à un degré plus élevé de vérification d'identité et de contrôle des antécédents que tout autre rôle, en raison de la nature sensible des fonctions associées. Ces vérifications supplémentaires sont définies dans les règles du schéma.
:::

### Portail Financier / Cadre opérationnel métier

De nombreuses fonctions (telles que la visualisation des positions des DFSP, l'état des fenêtres de règlement, etc.) du portail financier sont disponibles pour tous les utilisateurs connectés, quel que soit leur rôle. Cependant, les fonctions suivantes ne peuvent être exécutées que par des utilisateurs ayant des rôles spécifiques :

- Traitement des règlements
  - Fermer la fenêtre de règlement
  - Initier le règlement
- Gestion de la liquidité DFSP
  - Ajouter/retirer des fonds
  - Modifier le NDC

Toutes ces fonctions sont soumises à des contrôles maker/checker, de sorte qu'un utilisateur avec le rôle ADMINISTRATOR peut initier l'action, mais elle doit être approuvée par un utilisateur avec le rôle FINANCE_MANAGER.

### Cycle de vie des participants

Ce portail fournit une interface unique pour qu'un opérateur du Hub ajoute et maintienne les DFSP sur les écosystèmes du Hub.

Il existe certaines fonctions standardisées qui sont soumises au RBAC :

- Créer un DFSP
- Créer des comptes DFSP
- Suspendre un DFSP

Chacune de ces fonctions est soumise à des contrôles maker/checker, de sorte qu'un utilisateur avec le rôle OPERATOR peut mettre en place les modifications, et elles doivent être approuvées par un utilisateur avec le rôle MANAGER.

De plus, il y a une charge de travail importante dans l'intégration technique d'un DFSP, en particulier autour de l'établissement de l'environnement technique d'exploitation (certificats, etc.). Cela n'est pas soumis au RBAC. Cela n'est pas considéré comme un risque significatif, car il n'y a pas de valeur sans pouvoir créer un DFSP et les comptes associés sur le Hub lui-même - activités qui sont soumises au RBAC.

### Opérations du Hub

L'accès aux fonctions de reporting de Prometheus/Grafana n'est pas soumis aux contrôles RBAC - tout utilisateur connecté/authentifié, avec n'importe quel rôle RBAC attribué, peut consulter les rapports et les tableaux de bord.

La création d'un nouveau rapport/tableau de bord est une fonction restreinte, et n'est disponible que pour les utilisateurs ayant le rôle MANAGER.

Comme indiqué précédemment, les portails d'opérations et de reporting seront migrés vers l'environnement Ory/Keycloak afin de faciliter ces contrôles.

### Payment Manager

La fonctionnalité opérateur de Payment Manager est soumise aux contrôles RBAC, mais le maker/checker n'est pas requis.

#### Intégration utilisateur/opérateur

Lors du déploiement de Payment Manager, un seul compte utilisateur administrateur est créé à l'aide de Keycloak. Notez que l'utilisateur administrateur ne se verra attribuer aucun rôle opérationnel au-delà de ceux d'un administrateur système.

Toutes les fonctions exécutées à l'aide de Keycloak sont soumises à une journalisation au niveau du système à des fins d'audit.

L'utilisateur administrateur utilisera Keycloak pour créer d'autres comptes utilisateurs, sous réserve de vérifications d'identité et de contrôles d'antécédents standard pour chaque individu (définis dans les règles du schéma associées à un déploiement Mojaloop particulier) avant que leurs comptes ne soient créés.

Ces nouveaux comptes utilisateurs se verront attribuer l'un des rôles suivants :

- OPERATOR
- MANAGER

Un compte utilisateur ne peut pas avoir à la fois les rôles OPERATOR et MANAGER.

### Tableaux de bord

Les tableaux de bord de Payment Manager sont disponibles pour tout utilisateur connecté/authentifié ayant le rôle OPERATOR ou MANAGER.

### Gestion de la connexion au Hub

La visualisation des paramètres de la connexion Payment Manager/Hub est disponible pour tout utilisateur connecté/authentifié ayant le rôle OPERATOR ou MANAGER. Cependant, la modification des paramètres est une fonction contrôlée. Seul un utilisateur ayant le rôle MANAGER peut modifier les paramètres.

### Investigation des transactions

La réalisation d'investigations de transactions à l'aide des fonctionnalités du portail Payment Manager est une activité contrôlée, en raison du potentiel de révélation de données PII. Elle n'est donc disponible que pour les utilisateurs connectés/authentifiés ayant le rôle MANAGER.

## Surveillance
La surveillance est le quatrième pilier de l'atténuation du risque RBAC. Sa conception et sa configuration dépendent fortement de la maturité du schéma, des règles du schéma, des cas d'utilisation employés et des classes de participants.
Comme point de départ pour concevoir votre surveillance, considérez ces catégories :
1. Surveillance des menaces de sécurité externes
1. Surveillance des menaces de sécurité internes, par ex. l'audit
1. Surveillance de l'application des règles du schéma

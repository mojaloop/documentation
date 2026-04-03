---
version: 1.1
---


# Account Lookup Service

Le **Account Lookup Service** (**ALS**) — *(voir la section `6.2.1.2`)* de la [spécification Mojaloop {{ $page.frontmatter.version }}](/api) — prend en charge les cas d’usage suivants :

* Recherche de participant (*Participant Look-up*)
* Recherche de partie (*Party Look-up*)
* Gestion des informations du registre des participants
    * Ajout d’informations du registre des participants
    * Suppression d’informations du registre des participants
    
Cas d’usage complémentaires pour l’exploitation du Hub :
* Opérations d’administration
    * Gestion du routage des points de terminaison Oracle
    * Gestion du routage des points de terminaison du *Switch*
  
## 1. Considérations de conception

### 1.1. Account Lookup Service (ALS)

La conception de l’ALS fournit un composant « service central » générique du cœur Mojaloop. Il sert à l’alignement et au routage conformes à la spécification de l’API Mojaloop. Il prend en charge plusieurs registres de recherche (*Oracles*). L’ALS expose une API d’administration pour configurer le routage de chaque Oracle, sur le modèle de l’API du service central pour la configuration des points de terminaison de routage DFSP via le *Notification Handler* (composant ML-API-Adapter). L’ALS agit, en substance, comme un *switch* avec un stockage persistant des règles et de la configuration de routage.

#### 1.1.1. Hypothèses

* La conception ALS ne couvre pour l’instant qu’un seul *switch*.
* La prise en charge de plusieurs *switch* utilisera le même mécanisme de résolution DNS que celui prévu pour les frontières / réseaux (*Cross Border*).

#### 1.1.2. Routage

La configuration de routage repose sur les éléments suivants :

* **PartyIdType** — voir la section `7.5.6` de la spécification Mojaloop
* **Currency** — voir la section `7.5.5` de la spécification Mojaloop. Code devise selon [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html) (chaîne alphabétique de trois lettres). Champ optionnel ; l’indicateur `isDefault` doit être à `true` si la devise n’est pas fournie.
* **isDefault** — indique qu’un Oracle donné est le fournisseur par défaut pour un **PartyIdType**. Plusieurs Oracles peuvent être « par défaut », mais un seul Oracle par défaut par **PartyIdType**. L’Oracle par défaut pour un **PartyIdType** n’est choisi que si la requête d’origine n’inclut pas de filtre sur la devise.
 

### 1.2. Oracle ALS

L’Oracle ALS, mis en œuvre comme **Service** ou **Adaptateur** (sémantique selon le cas — médiation = adaptateur, service = implémentation), fournit un registre de recherche aux fonctionnalités proches des ressources API Mojaloop `/participants`. L’interface s’inspire de manière souple de la spécification ML API : elle suit un modèle synchrone, ce qui réduit les besoins de corrélation et de persistance du modèle de *callback* asynchrone direct de la spec ML API. Tous les services / adaptateurs Oracle ALS partagent ainsi une interface normalisée, médiatisée par l’ALS selon sa configuration de routage.  
Ce composant (ou les systèmes en aval) assure aussi la persistance et les valeurs par défaut des détails des participants.

## 2. Conception de la recherche de participants

### 2.1. Vue d’ensemble de l’architecture
![Flux architectural Account-Lookup pour les participants](./assets/diagrams/architecture/arch-flow-account-lookup-participants.svg)

_Note : le cas « recherche de participant » s’applique de la même façon à un scénario initié par le bénéficiaire, par exemple les `transactionRequests`. La différence est que le bénéficiaire est l’initiateur dans le schéma ci-dessus._

### 2.2. Diagrammes de séquence

#### 2.2.1. GET Participants

- [Diagramme de séquence GET Participants](als-get-participants.md)

#### 2.2.2. POST Participants

- [Diagramme de séquence POST Participants](als-post-participants.md)

#### 2.2.3. POST Participants (lot)

- [Diagramme de séquence POST Participants (lot)](als-post-participants-batch.md)

#### 2.2.4. DEL Participants

- [Diagramme de séquence DEL Participants](als-del-participants.md)

## 3. Conception de la recherche de parties

### 3.1. Vue d’ensemble de l’architecture
![Flux architectural Account-Lookup pour les parties](./assets/diagrams/architecture/arch-flow-account-lookup-parties.svg)

### 3.2. Diagramme de séquence

#### 3.2.1. GET Parties

- [Diagramme de séquence GET Parties](als-get-parties.md)

## 4. Conception de l’administration ALS

### 4.1. Vue d’ensemble de l’architecture
![Flux architectural Account-Lookup — admin GET Oracles](./assets/diagrams/architecture/arch-flow-account-lookup-admin.svg)

### 4.2. Diagrammes de séquence

#### 4.2.1 GET Oracles

- [Diagramme de séquence GET Oracles](als-admin-get-oracles.md)

#### 4.2.2 POST Oracle

- [Diagramme de séquence POST Oracle](als-admin-post-oracles.md)

#### 4.2.3 PUT Oracle

- [Diagramme de séquence PUT Oracle](als-admin-put-oracles.md)

#### 4.2.4 DELETE Oracle

- [Diagramme de séquence DELETE Oracle](als-admin-del-oracles.md)

#### 4.2.5 DELETE cache de point de terminaison

- [Diagramme de séquence DELETE cache de point de terminaison](als-del-endpoint.md)

## 5. Conception de la base de données

### 5.1. Schéma de base ALS

#### Notes

- `partyIdType` — valeurs initialement injectées selon la section _`7.5.6`_ de la [spécification Mojaloop {{ $page.frontmatter.version }}](../../api/README.md).
- `currency` — voir la section `7.5.5` de la spécification Mojaloop ; code selon [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html). Optionnel ; une configuration « par défaut » est requise si aucune devise n’est fournie ou si seule la configuration de point de terminaison « par défaut » existe.
- `endPointType` — identifiant du type de point de terminaison (ex. `URL`) pour permettre d’autres transports plus tard.
- `migration*` — tables de métadonnées utilisées par le moteur Knex.
- Un `centralSwitchEndpoint` doit être associé à l’`OracleEndpoint` via l’API d’admin lors de l’insertion d’un nouvel enregistrement `OracleEndpoint`. S’il n’est pas fourni dans la requête API, il doit être positionné par défaut. 

![MCD du Account Lookup Service](./assets/entities/AccountLookupService-schema.png)

* [MCD Account Lookup Service (DBeaver)](./assets/entities/AccountLookupDB-schema-DBeaver.erd)
* [Export MySQL Workbench Account Lookup Service](./assets/entities/AccountLookup-ddl-MySQLWorkbench.sql)

## 6. Conception de l’Oracle ALS

La conception détaillée de l’Oracle est hors périmètre de ce document ; elle dépend des exigences de chaque Oracle.

### 6.1. Spécification d’API

Voir **ALS Oracle API** dans la section [Spécifications d’API](../../api/README.md#als-oracle-api).

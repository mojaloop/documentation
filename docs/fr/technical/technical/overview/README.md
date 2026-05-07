# Hub Mojaloop

Plusieurs composants constituent l’écosystème Mojaloop. Le Hub Mojaloop est le conteneur principal et la référence que nous utilisons pour décrire les composants centraux de Mojaloop.

Le diagramme de composants suivant illustre la décomposition des services Mojaloop et leur architecture en microservices :

![Vue d’ensemble actuelle de l’architecture Mojaloop](./assets/diagrams/architecture/Arch-Mojaloop-overview-PI18.svg)

_Note : la gradation de couleur indique la relation entre le stockage de données, la messagerie en flux et les interconnexions d'adaptateurs.. Par exemple, les `Central-Services` utilisent `MySQL` comme base de données et s’appuient sur `Kafka` pour la messagerie._

Ils se composent de :

* Les **adaptateurs d’API Mojaloop** (**ML-API-Adapter**) fournissent l’ensemble standard d’interfaces qu’un DFSP peut mettre en œuvre pour se connecter au système pour les transferts. Un DFSP qui souhaite se raccorder peut s’appuyer sur notre code d’exemple ou implémenter les interfaces standard dans son propre logiciel. L’objectif est de rendre la connexion au réseau interopérable aussi directe et accessible que possible pour un DFSP.
* Les **Central Services** (**CS**) fournissent l'ensemble des composants nécessaires pour transférer des fonds d'un DFSP à un autre via les adaptateurs d'API Mojaloop. C’est analogue à la façon dont les fonds transitent par une banque centrale ou une chambre de compensation dans les pays développés. Les Central Services contiennent la logique centrale du registre (Central Ledger) pour déplacer les fonds, et seront également étendus pour assurer la gestion de la fraude et l'application des règles du schéma.
* Le **Account Lookup Service** (**ALS**) fournit un mécanisme permettant de résoudre les informations de routage des FSP via l'API Participant ou d'orchestrer une requête Party à partir d'une recherche interne de Participant. La recherche interne de Participant est assurée par plusieurs adaptateurs ou services Oracle standard. Un exemple d’adaptateur ou de service Oracle consiste à rechercher les informations de Participant dans Pathfinder ou un registre marchand. Ces adaptateurs ou services Oracle peuvent être ajoutés facilement selon les exigences du schéma.
* Le **Quoting Service** (**QA**) : le devis est le processus qui détermine les éventuels frais et commissions nécessaires pour réaliser une opération financière entre deux FSP. Il est toujours initié par le FSP payeur vers le FSP bénéficiaire ; le flux du devis suit donc le même sens qu’une opération financière.
* Le **simulateur** (**SIM**) émule plusieurs fonctions DFSP comme suit :
  * des endpoints Oracle pour les opérations CRUD sur les Participants Oracle avec cache en mémoire ;
  * des endpoints Participant pour les Oracles avec prise en charge des `partyIdTypes` paramétrables ;
  * des endpoints Parties pour les FSP payeur et bénéficiaire avec réponses de rappel associées ;
  * des endpoints de transfert pour les FSP payeur et bénéficiaire avec réponses de rappel associées ; et
  * des API d’interrogation pour vérifier les transactions (requêtes, réponses, rappels, etc.) afin de soutenir les tests et la vérification (assurance qualité).

De part et d’autre du Hub Mojaloop, du code open source d’exemple illustre comment un DFSP peut envoyer et recevoir des paiements, ainsi que le client qu’un DFSP existant pourrait héberger pour se connecter au réseau.

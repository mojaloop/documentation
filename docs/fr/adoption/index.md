# À propos de la documentation sur l'adoption de Mojaloop

Pour un opérateur de Hub ou une banque centrale souhaitant utiliser Mojaloop pour son système de paiement instantané inclusif (IIPS), le processus d'adoption et les étapes de la prise de décision diffèrent souvent fortement de celles consistant à faire appel à une entreprise pour fournir un logiciel propriétaire. Utiliser Mojaloop pour construire et posséder une plateforme offre davantage de contrôle mais aussi davantage de responsabilités. C'est exactement ce que cela signifie : ne pas dépendre d'un seul fournisseur.

La documentation et les outils de cette section visent à aider à justifier le choix de Mojaloop et à proposer une démarche de mise en œuvre recommandée.

Construire un système de paiement dépasse largement la plateforme technologique. Le système (ou le scheme) et les opérations sont en réalité les facteurs de succès. Nous avons développé Mojaloop pour réduire la charge opérationnelle et le coût de mise en œuvre de règles du système inclusives telles que l'irrévocabilité et la certitude.

Le processus de construction d'un système de paiement peut être aussi important que certaines décisions relatives au système (ou au scheme) qui en découlent. Chaque propriétaire et opérateur de scheme peut définir son propre processus, mais nous recommandons une démarche inclusive, transparente et itérative afin de maximiser l'appropriation, la confiance et la durabilité à long terme.



Outils à la disposition des adoptants :

* [**Choix relatifs au système**](#scheme-choices) : documents d'aide pour définir les règles de schéma, les lignes directrices d'exploitation, ainsi que les choix commerciaux et de conception majeurs
* [**Opérations du Hub**](#hub-operations) : guides fournissant des informations pratiques sur les différents aspects des opérations d'un Hub Mojaloop

## Choix relatifs au système

Le [modèle de lignes directrices d'exploitation de la plateforme](./Scheme/platform-operating-guideline.md) fournit un modèle pour décrire le fonctionnement de la plateforme du système et pour préciser les obligations et responsabilités du système, de l'opérateur de la plateforme et des DFSP.

Le [modèle de règles métier du schéma](./Scheme/scheme-business-rules.md) fournit un modèle pour définir les règles métier qui encadrent les droits et obligations des participants à un scheme Mojaloop.

Le document [des choix clés du schéma](./Scheme/scheme-key-choices.md) décrit et examine certains des choix commerciaux et de conception les plus importants qui influencent à la fois la mise en œuvre technique de Mojaloop et les règles métier que le système rédigera et auxquelles les DFSP participants accepteront de se conformer.

Le [modèle de convention de participation au schéma](./Scheme/scheme-participation-agreement.md) fournit un modèle de convention de participation au schéma contenant les dispositions minimales nécessaires pour attester de la demande d'un DFSP de rejoindre le scheme et de respecter ses règles métier.

Le [modèle de glossaire standard](./Scheme/scheme-uniform-glossary.md) sert de glossaire des termes métier.

## Opérations du Hub

Ces documents peuvent servir de référence aux adoptants pour s'appuyer dessus et adapter les portails d'exploitation du Hub, puis développer les leurs ultérieurement selon les besoins.

Le [guide des opérations techniques](./huboperations/techops/tech-ops-introduction.md) décrit les processus opérationnels qui permettent à l'opérateur du Hub de couvrir tous les aspects de la gestion d'un service en production, tels que la gestion des incidents, la gestion des problèmes, la gestion du changement, la gestion des versions et le triage des défauts.

Le [guide de gestion du Settlement](./huboperations/settlement/settlement-management-introduction.md) explique comment le Settlement est géré par le Hub Mojaloop et la ou les banques partenaires de règlement, et présente les principaux éléments du traitement du Settlement.

Le [Guide du Finance Portal v2](./huboperations/portalv2/busops-portal-introduction.md) s'adresse à l'opérateur d'un Hub Mojaloop et fournit des informations sur le Finance Portal, qui facilite la gestion au quotidien des processus liés aux règlements.

Le document [de contrôle d'accès basé sur les rôles (RBAC)](./huboperations/rbac/Role-based-access-control.md) traite du mécanisme de sécurité utilisé pour contrôler l'accès aux différents aspects d'une instance opérationnelle d'un Hub Mojaloop.

Le [guide d'onboarding pour l'opérateur du Hub](./huboperations/onboarding/onboarding-introduction.md) s'adresse à l'opérateur d'un Hub Mojaloop et fournit des informations sur le processus d'onboarding des DFSP. Il offre une vue d'ensemble du parcours d'onboarding suivi par les DFSP, en servant de liste de contrôle des activités d'onboarding.

# À propos des documents sur l’adoption de Mojaloop

Pour un opérateur de Hub ou une banque centrale souhaitant utiliser Mojaloop pour son système de paiement instantané inclusif (IIPS), le processus d’adoption et les étapes de la prise de décision diffèrent souvent fortement de celles consistant à faire appel à une entreprise pour fournir un logiciel propriétaire. Utiliser Mojaloop pour construire et posséder une plateforme offre davantage de contrôle mais aussi davantage de responsabilités. Ne pas dépendre d’un seul fournisseur signifie exactement cela.

La documentation et les outils de cette section visent à aider à justifier le choix de Mojaloop et à proposer une démarche de mise en œuvre recommandée.

Construire un système de paiement dépasse largement la plateforme technologique. Le schéma et les opérations sont en réalité les facteurs de succès. Nous avons développé Mojaloop pour réduire la charge opérationnelle et le coût de mise en œuvre de règles de schéma inclusives telles que l’irrévocabilité et la certitude.

Le processus de construction d’un système de paiement peut être aussi important que certaines décisions de schéma qui en découlent. Chaque propriétaire et opérateur de schéma peut définir son propre processus, mais nous recommandons une démarche inclusive, transparente et itérative afin de maximiser l’appropriation, la confiance et la durabilité à long terme.



Outils à la disposition des adoptants :

* [**Choix relatifs au schéma**](#scheme-choices) : documents d’aide pour définir les règles du schéma, les lignes directrices d’exploitation, ainsi que les choix commerciaux et de conception majeurs
* [**Exploitation du Hub**](#hub-operations) : guides fournissant des informations pratiques sur les différents aspects de l’exploitation d’un Hub Mojaloop

## Choix relatifs au schéma {#scheme-choices}

Le [modèle de lignes directrices d’exploitation de la plateforme](./Scheme/platform-operating-guideline.md) fournit un modèle pour décrire le fonctionnement de la plateforme du Schéma et pour préciser les obligations et responsabilités du Schéma, de l’opérateur de la plateforme et des DFSP.

Le [modèle de règles commerciales du schéma](./Scheme/scheme-business-rules.md) fournit un modèle pour définir les règles commerciales qui encadrent les droits et obligations des participants à un schéma Mojaloop.

Le document [Choix clés du schéma](./Scheme/scheme-key-choices.md) décrit et examine certains des choix commerciaux et de conception les plus importants qui influencent à la fois la mise en œuvre technique de Mojaloop et les règles commerciales que le Schéma rédigera et auxquelles les DFSP participants accepteront de se conformer.

Le [modèle de convention de participation au schéma](./Scheme/scheme-participation-agreement.md) fournit un modèle de convention de participation au schéma contenant les dispositions minimales nécessaires pour attester de la demande d’un DFSP de rejoindre le Schéma et de respecter ses règles commerciales.

Le [modèle de glossaire uniforme](./Scheme/scheme-uniform-glossary.md) sert de glossaire des termes métier.

## Exploitation du Hub {#hub-operations}

Ces documents peuvent servir de référence aux adoptants pour s’appuyer dessus et adapter les portails d’exploitation du Hub, puis développer les leurs ultérieurement selon les besoins.

Le [guide des opérations techniques](./huboperations/techops/tech-ops-introduction.md) décrit les processus opérationnels qui permettent à l’opérateur du Hub de couvrir tous les aspects de la gestion d’un service en production, tels que la gestion des incidents, la gestion des problèmes, la gestion du changement, la gestion des versions et le triage des défauts.

Le [guide de la gestion des règlements](./huboperations/settlement/settlement-management-introduction.md) explique comment les règlements sont gérés par le Hub Mojaloop et la ou les banques partenaires de règlement, et présente les principaux éléments du traitement des règlements.

Le [guide du portail financier v2](./huboperations/portalv2/busops-portal-introduction.md) s’adresse à l’opérateur d’un Hub Mojaloop et fournit des informations sur le portail financier, qui facilite la gestion au quotidien des processus liés aux règlements.

Le document [contrôle d’accès basé sur les rôles](./huboperations/rbac/Role-based-access-control.md) traite du mécanisme de sécurité utilisé pour contrôler l’accès aux différents aspects d’une instance opérationnelle d’un Hub Mojaloop.

Le [guide d’intégration pour l’opérateur du Hub](./huboperations/onboarding/onboarding-introduction.md) s’adresse à l’opérateur d’un Hub Mojaloop et fournit des informations sur le processus d’intégration des DFSP. Il offre une vue d’ensemble du parcours d’intégration suivi par les DFSP, en servant de liste de contrôle des activités d’intégration.

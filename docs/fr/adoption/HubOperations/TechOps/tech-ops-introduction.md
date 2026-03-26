# Introduction – Guide des opérations techniques

Le Hub Mojaloop exploite un certain nombre d'environnements qui nécessitent une gestion et une maintenance quotidiennes. Les procédures standard décrites dans ce document présentent les processus opérationnels qui permettent à l'opérateur du Hub de gérer tous les aspects d'un service en production.

Les procédures suivantes doivent être mises en place :

- [**Gestion des incidents**](./incident-management.md) : Gestion des incidents qui ont été signalés à l'équipe des opérations techniques ou qui sont parvenus à l'équipe via des alertes ou des activités de surveillance.

- [**Gestion des problèmes**](./problem-management.md) : Identification de la cause première des incidents ou des causes potentielles des incidents, et mise en œuvre immédiate d'actions pour améliorer ou corriger la situation.

- [**Gestion des changements**](./change-management.md) : Contrôle du cycle de vie de tous les changements, permettant d'effectuer des modifications avec un minimum de perturbation des services informatiques.

- [**Gestion des mises en production**](./release-management.md) : Gestion, planification, programmation et contrôle d'une modification logicielle à travers le déploiement et les tests dans divers environnements.

- [**Triage des défauts**](./defect-triage.md) : Garantir que tous les bogues identifiés dans l'environnement de production du client sont capturés, évalués, priorisés et soumis au Service Desk.

Un aperçu rapide des environnements gérés par l'opérateur du Hub est fourni ci-dessous :

- **Développement** : Environnement de développement logiciel hors production où le code OSS de Mojaloop est fusionné avec les personnalisations. Fournit aux développeurs un retour rapide sur les nouvelles soumissions de code. Les prestataires de services financiers numériques (DFSP) n'interagissent pas avec cet environnement. Accès réservé aux développeurs et au QA uniquement.

- **Tests d'acceptation utilisateur (UAT)** : Environnement de test pour l'acceptation utilisateur et les tests de régression afin de valider les nouvelles versions.

- **Bac à sable (SBX)** : Environnement de test pour valider la connectivité des DFSP en termes d'exigences API et de sécurité.

- **Pré-production (STG)** : Environnement de pré-production qui reflète la production aussi fidèlement que possible. Validation des nouvelles versions et de l'intégration des DFSP.

- **Production (PRD)** : Environnement de production compatible avec la version en production.

::: tip
Un [Glossaire](./key-terms-kpis.md) est fourni pour aider à clarifier les termes courants des opérations techniques utilisés dans ce document. Si vous rencontrez un terme nécessitant une explication, il est utile de consulter le glossaire pour vérifier si une définition a été fournie.
:::

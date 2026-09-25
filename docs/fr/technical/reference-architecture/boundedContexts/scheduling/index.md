# BC Scheduling

De nombreux processus et événements dans les différents BCs de la plateforme Mojaloop Switch nécessitent une fonctionnalité permettant de déclencher des actions à des moments précis ou selon un calendrier défini. Afin de prendre en charge ce besoin de manière centralisée et d’éviter d’implémenter cette fonctionnalité dans chaque BC, un seul BC dédié à la planification sera introduit et mis en œuvre sur la plateforme Switch.

Pour planifier un processus ou un événement, un BC Client soumet une demande au Scheduling BC pour créer un rappel destiné à être déclenché à un horaire précis ou selon une récurrence. Le Scheduling BC maintient un registre de tous les rappels reçus et, lorsque le moment fixé arrive, il envoie une notification du rappel au BC Client concerné.

De plus, le Scheduling BC fournira également des services au Switch pour permettre aux BC Clients et aux administrateurs du Switch de gérer les rappels.

## Termes

Le(s) terme(s) suivant(s) sont utilisés dans ce BC :

| Terme | Description |
|---|---|
| **BC Client** | Tout autre BC utilisant les services du Scheduling BC |

## Cas d’Utilisation

<!--***Remarque:*** *Un cas d’utilisation “Mise à jour de rappel” (Update Reminder) n’est pas inclus. La recommandation est de supprimer et de créer un nouveau rappel.*
-->
L’état des cas d’utilisation (UC) pour le Scheduling BC est le suivant :

| UCs Disponibles |  |  | UCs Prévus |  |
| --- | :-- | --- | --- | :-- |
| **Cas d'utilisation** | **Description** | | **Cas d'utilisation** | **Description** |
| **Créer un rappel** | Le BC Client demande la création d’un rappel | | **Requête de rappel du client** | Le BC Client interroge ses propres rappels |
| **Supprimer un rappel** | Le BC Client demande la suppression d’un rappel | | **Requête de rappel de l’administrateur** | L’administrateur de la plateforme interroge tous les rappels |
| **Déclenchement du rappel** | Le Scheduling BC exécute le déclenchement du rappel lorsque le moment est venu | | |
| **Mettre à jour un rappel** | *Non fourni. Solution recommandée : supprimer et créer un nouveau Rappel* | | |  |  |

<!---Les cas d’utilisation suivants sont prévus pour le Scheduling BC :

| Cas d’Utilisation | Description |
| --- | :-- |
| Requête rappel du client | Le BC Client interroge ses propres rappels |
| Requête rappel de l’admin | L’administrateur de la plateforme interroge tous les rappels |
| Déclenchement du rappel | Le Scheduling BC déclenche le rappel lorsque le moment est venu |
--->
### Créer un rappel

#### Description
Ce flux permet au Switch de traiter les demandes autorisées des BC Clients pour créer des rappels.

#### Diagramme de flux

![Créer un rappel](./assets/schedulingCreateReminder_20211021.png)
>
### Déclenchement du rappel

#### Description
Ce flux permet au Switch de traiter les rappels envoyés du Scheduling BC à un BC Client pour exécuter une tâche, ou simplement comme rappel.

#### Diagramme de flux

![Déclenchement du rappel](./assets/schedulingReminderTriggered_20211021.png)
>
### Suppression d’un rappel (récurrent)

#### Description
Ce flux permet au Switch de gérer les messages des BC Clients autorisés au Scheduling BC pour supprimer un Rappel. Si le Scheduling BC ne parvient pas à traiter l’instruction, il envoie un message d’alerte au Notifications BC.

#### Diagramme de flux

![Suppression d’un rappel récurrent](./assets/schedulingDeleteRecurringReminder_20211021.png)
>

<!-- Les notes de bas de page sont situées en bas. -->
## Notes

#### Créer un Rappel – Données requises

La demande de Création de Rappel doit inclure les données suivantes :

| Donnée | Description |
| --- | ---- |
| **Identifiant** | nom/id |
| **Définition Cron** | récurrent ?, intervalle de temps ? |
| **Transport de Déclenchement** | Callback HTTP/Événement ; URL de Callback ou Sujet d'Événement |
| **Payload Spécial** | opaque pour le Scheduling BC |
| **Conditions de récupération** | nouvelle tentative, replanification, abandon, abandon |
| **Alertes** | notification, journalisation en cas d’exception |
| **Actions** | registre des processus BC automatisables/planifiables |

#### BC Scheduling – Exigences

Le Scheduling BC doit répondre aux exigences suivantes :

* Les rappels ne doivent être déclenchés qu’une seule fois

* Le BC doit conserver l’historique des Rappels déclenchés

* Le BC doit garder l’historique des actions de Création/Lecture/Suppression

    * Les mises à jour seront facilitées via les actions Suppression/Création, comme indiqué dans la liste des UCs disponibles

* Lots de tâches (Job batches)

* Offrir plusieurs options d’interface (gRPC, REST, HTTP, etc.)

* Les rappels doivent être déclenchés avec un callback HTTP, pas un appel gRPC, ou vers un sujet spécifique

* Il ne doit pas avoir la capacité de traiter de la logique externe au Scheduling BC lui-même

* Utiliser exclusivement les horodatages UTC basés sur Linux pour éviter les problèmes de synchronisation

***Remarque :*** *Il est supposé que le système sous-jacent maintiendra une heure parfaite.*

#### BC Scheduling – Exigences en suspens

Les exigences d’accès pour le Scheduling BC restent à définir.

#### BC Scheduling – Exceptions

* Instructions malformées
    * Date/heure invalide, y compris des heures dans le passé
    * BC ou commande invalide
* Échec d’exécution (identifié via le callback)
* Autorité insuffisante du BC Client pour réaliser l’opération CRD
* Échec du traitement/exécution du Rappel

#### Questions

Certaines questions sont apparues lors des sessions d’architecture de référence. Jugées utiles pour le plus grand nombre, elles sont incluses ci-dessous :

* Après que la tâche planifiée a été initiée, le Scheduling BC reste-t-il responsable du suivi de sa progression ?

    * Réponse : Non. Lorsque le rappel est dû, il est communiqué au BC Client selon la méthode prévue, et la responsabilité du rappel est alors transférée au BC Client.

* Est-ce le BC Client ou la personne qui a planifié le Rappel qui est noté comme « Utilisateur » par le Scheduling BC ? En d’autres termes, quel ID est inscrit dans la piste d’audit (audit trail) ?

    * Réponse : Cela doit être déterminé par le BC Client, selon l’action qu’il entreprend à la réception du rappel.
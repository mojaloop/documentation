# Service Event Stream Processor

L’**Event Stream Processor** consomme les messages d’événements du topic `topic-events`, publiés par le service [event-sidecar](https://github.com/mojaloop/event-sidecar). Voir le [cadre d’événements](../event-framework/README.md) pour l’architecture globale.

Le service envoie journaux (y compris audits) et traces vers une stack EFK avec le plugin APM activé. Selon le type de message, les données sont routées vers différents index Elasticsearch.

## 1. Prérequis

Tous les événements sont enregistrés dans une instance Elasticsearch avec APM. Un exemple *docker-compose* pour la stack Elastic est disponible [ici](https://github.com/mojaloop/event-stream-processor/blob/master/test/util/scripts/docker-efk/docker-compose.yml). Les journaux et audits utilisent un modèle d’index personnalisé ; les traces vont dans l’index par défaut `apm-*`.

Assurez-vous d’avoir créé le modèle `mojatemplate` comme décrit dans la documentation du service [event-stream-processor](https://github.com/mojaloop/event-stream-processor#111-create-template).

## 2. Vue d’ensemble de l’architecture

### 2.1. Flux général

![Vue d’ensemble du flux Event Stream Processor](./assets/diagrams/architecture/event-stream-processor-overview.svg)

### 2.2 Diagramme de séquence du traitement des traces

![](./assets/diagrams/sequence/process-flow.svg)

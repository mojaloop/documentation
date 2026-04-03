# Vue d’ensemble des scénarios d’usage testés du SDK

Un *scheme adapter* est un service qui fait l’interface entre un *switch* conforme à l’API Mojaloop et une plateforme backend DFSP qui n’implémente pas nativement l’API Mojaloop.

L’API entre le *scheme adapter* et le backend DFSP est du HTTP synchrone ; l’interface avec le *switch* est l’API Mojaloop native.

Ce document présente différentes configurations qu’un DFSP peut tester avec le *scheme adapter*.

# Scénarios

Scénarios testés et documentés :

* [[Scheme Adapter + Mock DFSP Backend] → [Scheme Adapter + Mojaloop Simulator]](./scheme-adapter-to-scheme-adapter/README.md)
* [[Scheme Adapter + Mock DFSP Backend] → [Cluster K8s local]](./scheme-adapter-and-local-k8s/README.md)
* [[Scheme Adapter + Mojaloop Simulator] → [Switch Mojaloop public avec passerelle WSO2]](./scheme-adapter-and-wso2-api-gateway/README.md)

## [Scheme Adapter + Mock DFSP Backend] → [Scheme Adapter + Mojaloop Simulator]

Le *scheme adapter* peut être combiné aux implémentations fournies : *Mock DFSP Backend* et *Mojaloop Simulator*. Dépôts :

https://github.com/mojaloop/sdk-mock-dfsp-backend.git

https://github.com/mojaloop/mojaloop-simulator.git

L’idée est d’associer le *scheme adapter* et le backend simulé DFSP d’un côté, et le simulateur Mojaloop de l’autre — par exemple payeur et bénéficiaire. En suivant cet exemple, il est possible d’envoyer et de recevoir des fonds d’un DFSP à l’autre.

Voir la [documentation détaillée](./scheme-adapter-to-scheme-adapter/README.md).

![SchemeAdapterToSchemeAdapter](./scheme-adapter-to-scheme-adapter/scheme-adapter-to-scheme-adapter-overview.png)

## [Scheme Adapter + Mock DFSP Backend] → [Cluster K8s local]

Pour intercaler un *switch* entre les DFSP, on peut simuler l’environnement avec un cluster Kubernetes local. Suivre le guide de déploiement : https://mojaloop.io/documentation/deployment-guide/

Voir la [documentation](./scheme-adapter-and-local-k8s/README.md).

![SchemeAdapterAndK8S](./scheme-adapter-and-local-k8s/scheme-adapter-and-local-k8s-overview.png)

## [Scheme Adapter + Mojaloop Simulator] → [Switch Mojaloop public avec passerelle WSO2]

Avec accès à l’API Mojaloop WSO2, les tests décrits ici utilisent l’authentification par jeton et le chiffrement TLS du *scheme adapter* (contrairement aux deux scénarios précédents).

Voir la [documentation](./scheme-adapter-and-wso2-api-gateway/README.md).


![SchemeAdapterAndWSO2APIGateway](./scheme-adapter-and-wso2-api-gateway/scheme-adapter-and-wso2-api-gateway-overview.png)

# SDK Scheme Adapter

Un *scheme adapter* est un service qui assure l’interface entre un *switch* conforme à l’API Mojaloop et une plateforme dorsale DFSP qui n’implémente pas nativement l’API Mojaloop.

L’API entre le *scheme adapter* et le backend DFSP est du HTTP synchrone, tandis que l’interface entre le *scheme adapter* et le *switch* est l’API Mojaloop native. Il existe une exception à cette règle : les intégrations en masse (*bulk*), qui peuvent être configurées en mode synchrone ou asynchrone.

Le **SDK-Scheme-Adapter** est soutenu par la communauté Mojaloop et est considéré comme la référence en matière de méthode de bonne pratique pour qu’un DFSP se connecte à une API Mojaloop. Le SDK-Scheme-Adapter est le plus souvent utilisé et déployé directement au sein de la solution. Ci-dessous figure un résumé des différentes façons dont cela peut être réalisé.

## Modèles d’adoption du SDK

Selon les règles du système, les DFSP interagissent avec le Hub Mojaloop central selon quatre modes courants. Ce résumé met en évidence le rôle que joue le SDK-Scheme-Adapter dans chacun des modes, fournit un bref aperçu de chaque mode et souligne les avantages dont bénéficient les DFSP.

### 1. DFSP utilisant une solution tierce (ex. Payment Manager) intégrant le SDK Scheme Adapter

Plusieurs solutions tierces proposent un support, des outils et des intégrations au sein des systèmes dorsaux en s’appuyant sur le SDK-Scheme-Adapter afin de prendre en charge l’intégration synchrone (selon les bonnes pratiques Mojaloop) pour se connecter à l’API Mojaloop.

*Payment Manager*, outil *open source*, en est un exemple. *Payment Manager* offre des avantages supplémentaires à ce sujet ; des informations complémentaires sont disponibles [ici](https://rtplex.io/). *Payment Manager* peut être déployé en SaaS ou en auto-hébergement.

![SDK-Scheme-Adapter Mode 1](./assets/SDKSchemeAdapterMode1.svg)

- Le SDK Scheme Adapter est intégré directement à l’implémentation personnalisée.
- Maintenu par la communauté, il offre une trajectoire de montée de version vers les nouvelles versions de l’API Mojaloop.
- Solution normalisée pour une intégration rapide
- *Core Connector* co-développé avec des intégrateurs ou éditeurs bancaires
- L’interface utilisateur de *Payment Manager* prend également en charge les opérations métier, l’intégration sécurité (*security onboarding*) ainsi que l’automatisation de la maintenance

:::tip Composants open source
Ils sont sous licence Apache v2.0, choisie pour limiter les conflits avec les politiques d’entreprise. Sans contrainte de type copyleft, les adoptants peuvent personnaliser des éléments — tels que les *core connectors* — sans être obligés de reverser ces détails confidentiels à la communauté.  
:::


### 2. DFSP avec son propre Core Connector et le SDK Scheme Adapter

Dans ce cas, le DFSP choisit de développer un *Core Connector* sur mesure entre son système dorsal et le SDK Scheme Adapter Mojaloop. Il peut s’appuyer sur les guides open source pour développer ce *Core Connector*.

![SDK-Scheme-Adapter Mode 2](./assets/SDKSchemeAdapterMode2.svg)

- SDK Scheme Adapter intégré directement à l’implémentation personnalisée.
- Trajectoire de montée de version grâce à la maintenance communautaire.
- Développement selon les guides *Core Connector* open source
- Support de la communauté Mojaloop
- Exploitation par les équipes techniques du DFSP

### 3. Solution de connexion Mojaloop entièrement développée par le DFSP

Aucune connexion standard n’est utilisée : le DFSP choisit de développer sa propre connexion au Hub Mojaloop.

![SDK-Scheme-Adapter Mode 3](./assets/SDKSchemeAdapterMode3.svg)

- Basé sur la documentation de conception open source
- Support de la communauté Mojaloop
- Exploitation par les équipes techniques du DFSP
- Le SDK Scheme Adapter peut éventuellement être utilisé comme référence
- Cette implémentation dialogue directement avec les API asynchrones Mojaloop



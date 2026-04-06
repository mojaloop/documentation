# Mojaloop Testing Toolkit

Le **Mojaloop Testing Toolkit** a été conçu pour aider les schémas Mojaloop à monter en charge en simplifiant l’intégration des DFSP. Les schémas peuvent y publier des règles et des tests ; les DFSP s’en servent pour l’auto-test (voire l’auto-certification). Cela garantit que les implémentations sont prêtes à se brancher au schéma et accélère l’intégration aux Hubs Mojaloop.

L’outil visait d’abord les FSP / participants rejoignant un schéma Mojaloop. Aujourd’hui, il peut être utilisé par les DFSP et les **Hubs Mojaloop** pour vérifier l’interopérabilité entre les deux. Conçu comme outil d’intégration standard entre un **fournisseur de services financiers numériques (DFSP)** et le **switch Mojaloop** (Hub), il facilite les tests.

Pour le contexte du *Self Testing Toolkit*, voir [Mojaloop Testing Toolkit](https://github.com/mojaloop/ml-testing-toolkit/blob/master/documents/Mojaloop-Testing-Toolkit.md). Il est recommandé de consulter le [diagramme d’architecture](https://github.com/mojaloop/ml-testing-toolkit/blob/master/documents/Mojaloop-Testing-Toolkit.md#7-architecture), qui présente les composants et flux.

## Guides d’utilisation

* Interface web : [guide d’utilisation](https://github.com/mojaloop/ml-testing-toolkit/blob/master/documents/User-Guide.md)
* Ligne de commande : [guide CLI](https://github.com/mojaloop/ml-testing-toolkit/blob/master/documents/User-Guide-CLI.md)

**Si vous avez votre propre implémentation DFSP, vous pouvez pointer le *peer endpoint* vers Mojaloop Testing Toolkit sur le port 5000 et envoyer les requêtes depuis votre implémentation au lieu de *mojaloop-simulator*.**

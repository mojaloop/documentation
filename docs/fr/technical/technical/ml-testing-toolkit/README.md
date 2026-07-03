# Mojaloop Testing Toolkit

Le **Mojaloop Testing Toolkit** a été conçu pour aider les schémas Mojaloop à monter en charge en simplifiant l’intégration des DFSP. Les schémas peuvent y publier des règles et des tests ; les DFSP s’en servent pour l’auto-test (voire l’auto-certification). Cela garantit que les DFSP sont pleinement prêts à se connecter au schéma et permet un embarquement rapide et fluide pour les Hubs Mojaloop, augmentant ainsi leur capacité à monter en charge.

L’outil visait d’abord les FSP / participants rejoignant un schéma Mojaloop. Aujourd’hui, cet ensemble d’outils peut potentiellement être utilisé par les DFSP et les **Hubs Mojaloop** pour vérifier l’intégration entre ces deux entités. Conçu délibérément comme outil de test d’intégration standard entre un **fournisseur de services financiers numériques (DFSP)** et le **switch Mojaloop** (Hub), il facilite les tests.

Pour le contexte du *Self Testing Toolkit*, voir [Mojaloop Testing Toolkit](https://github.com/mojaloop/ml-testing-toolkit/blob/master/documents/Mojaloop-Testing-Toolkit.md). Il est recommandé de consulter le [diagramme d’architecture](https://github.com/mojaloop/ml-testing-toolkit/blob/master/documents/Mojaloop-Testing-Toolkit.md#7-architecture), qui présente les différents composants et leurs flux associés.

## Guides d’utilisation

* Interface web : [guide d’utilisation](https://github.com/mojaloop/ml-testing-toolkit/blob/master/documents/User-Guide.md)
* Ligne de commande : [guide CLI](https://github.com/mojaloop/ml-testing-toolkit/blob/master/documents/User-Guide-CLI.md)

**Si vous avez votre propre implémentation DFSP, vous pouvez pointer le *peer endpoint* vers le Mojaloop Testing Toolkit sur le port 5000 et tenter d’envoyer les requêtes depuis votre implémentation au lieu d’utiliser *mojaloop-simulator*.**

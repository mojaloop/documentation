# Vue d'ensemble technique de Mojaloop

## Services Mojaloop

L'idée principale derrière Mojaloop est de connecter plusieurs fournisseurs de services financiers numériques (DFSP: de l'anglais, Digital Financial Services Providers) au sein d'un réseau compétitif et interopérable, afin de maximiser les possibilités pour les populations à faible revenu d'accéder à des services financiers à faibles coûts ou sans frais. Nous ne souhaitons pas qu'une seule entité ait le monopole sur tous les paiements d'un pays, ni qu'un système exclue de nouveaux entrants. Avoir trop de sous-réseaux isolés n’est pas non plus une solution. Les schémas suivants illustrent les interconnexions Mojaloop entre les DFSP et le Hub Mojaloop (exemple de schéma d’implémentation) pour un transfert pair-à-pair (P2P) :

Mojaloop répond à ces défis de plusieurs façons clés :
* Un ensemble de services centraux fournit un hub permettant à l’argent de circuler d’un DFSP à un autre. Ceci est similaire au fonctionnement d’une banque centrale ou d’une chambre de compensation dans les pays développés. Outre le registre central, ces services peuvent fournir la résolution d'identité, la gestion de la fraude et l’application des règles du système.
* Un ensemble standardisé d’interfaces qu’un DFSP peut mettre en œuvre pour se connecter au système, ainsi que des exemples de code montrant comment utiliser le système. Un DFSP souhaitant se connecter peut adapter notre exemple de code ou implémenter les interfaces standardisées dans son propre logiciel. L'objectif est que la connexion au réseau interopérable soit aussi simple que possible pour un DFSP.
* Des implémentations open-source complètes et fonctionnelles des deux côtés des interfaces : un exemple de DFSP qui peut envoyer et recevoir des paiements, ainsi qu’un client que tout DFSP existant pourrait héberger pour se connecter au réseau.

![Flux d’architecture de bout en bout Mojaloop PI5](./technical/assets/diagrams/architecture/Arch-Mojaloop-end-to-end-PI6.svg)

Le Hub Mojaloop est le conteneur principal et la référence que nous utilisons pour décrire l’écosystème Mojaloop, qui est réparti en les domaines suivants:
* Services Open Source Mojaloop : logiciel open source (OSS) central de Mojaloop soutenu par la Fondation Bill & Melinda Gates  en partenariat avec la communauté open source.
* Hub Mojaloop: implémentation globale de référence (et personnalisable) de Mojaloop pour les opérateurs de hub, basée sur la solution OSS ci-dessus.
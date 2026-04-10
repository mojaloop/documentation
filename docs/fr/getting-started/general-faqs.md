# FAQ générales

Ce document rassemble certaines des questions les plus fréquemment posées par la communauté.

## 1. Qu’est-ce que Mojaloop ?
 
Mojaloop est un logiciel open source permettant de construire des plateformes de paiements numériques interopérables à l’échelle nationale. Il facilite l’interconnexion de services fournis par différents types d’acteurs et le déploiement de services financiers à faible coût sur de nouveaux marchés.


## 2. Comment ça fonctionne ?
 
La plupart des fournisseurs de services financiers numériques opèrent sur leurs propres réseaux, ce qui empêche les clients utilisant des services différents d’effectuer des transactions entre eux. Mojaloop agit comme un « commutateur » universel, acheminant les paiements de manière sécurisée entre tous les clients, quel que soit leur réseau. Il comprend plusieurs couches principales, chacune avec une fonction spécifique : une couche d’interopérabilité, qui relie comptes bancaires, portefeuilles de monnaie électronique et commerçants en boucle ouverte ; une couche de services d’annuaire, qui gère les différentes méthodes d’identification des comptes de part et d’autre de la transaction ; une couche de règlement des transactions, qui rend les paiements instantanés et irrévocables ; ainsi que des composants de protection contre la fraude.

## 3. À qui s’adresse Mojaloop ?
  
Le code comporte de nombreux composants, et toute personne travaillant directement ou indirectement sur des transactions financières numériques (développeurs fintech, banquiers, entrepreneurs, startups, etc.) est invitée à explorer et utiliser les parties qui lui sont utiles. Le logiciel, dans son ensemble, est conçu pour être mis en œuvre à l’échelle nationale ; il est donc particulièrement pertinent pour les fournisseurs de monnaie mobile, les associations de paiement, les banques centrales et les régulateurs.

Les développeurs des fintechs et des services financiers peuvent utiliser le code de trois manières : l’adapter aux standards d’un pays, l’utiliser pour mettre à jour leurs produits et services (ou en créer de nouveaux), et l’améliorer en proposant des mises à jour et de nouvelles versions pour les autres utilisateurs.

Par exemple :

- Une banque centrale peut mandater l’usage du logiciel par ses partenaires commerciaux afin d’accélérer le déploiement d’une passerelle nationale de paiement.
- Un grand processeur de paiement peut utiliser le logiciel pour moderniser son offre et réduire ses coûts de transaction sans investissements R&D majeurs.
- Une startup fintech peut utiliser le code pour comprendre concrètement comment se conformer à des API de paiement interopérables.
- Une banque peut utiliser le code pour adapter ses systèmes internes afin d’interopérer plus facilement avec d’autres fournisseurs de paiement.

## 4. Pourquoi Mojaloop existe-t-il ?

Les acteurs qui cherchent à proposer des services financiers numériques innovants et à faible coût sur des marchés en développement doivent souvent tout construire eux-mêmes. Cela augmente les coûts et cloisonne les services. Mojaloop peut servir de fondation pour construire des plateformes interopérables, réduire les coûts pour les fournisseurs et permettre l’intégration de leurs services avec ceux des autres acteurs du marché.

## 5. Qui est à l’origine de Mojaloop ?

Mojaloop a été construit en collaboration avec un groupe d’entreprises technologiques et fintech de premier plan : [Ripple](https://github.com/ripple), [Dwolla](https://github.com/dwolla), [Software Group](http://www.softwaregroup-bg.com/), [ModusBox](http://www.modusbox.com/) et [Crosslake Technologies](http://www.crosslaketech.com/). Mojaloop a été initié par la Fondation Gates afin de « rééquilibrer le terrain économique » en mobilisant expertise et ressources pour construire des modèles de paiement inclusifs au bénéfice des populations les plus pauvres. Il est mis gratuitement à disposition du public en tant que logiciel open source sous la [licence Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0).

## 6. Sur quelles plateformes Mojaloop fonctionne-t-il ?

La plateforme Mojaloop a été conçue pour des environnements cloud modernes. Des méthodes open source et des plateformes largement utilisées, comme Node.js, constituent la couche de base. Les microservices sont empaquetés avec Docker et peuvent être déployés sur du matériel local ou dans des environnements cloud tels qu’Amazon Web Services ou Azure.

## 7. Est-ce vraiment open source ?

Oui, Mojaloop est réellement open source. Tous les modules principaux, la documentation et les livres blancs sont disponibles sous la [licence Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0). Mojaloop s’appuie sur des logiciels open source largement utilisés, notamment Node.js, MuleCE, Java et PostgreSQL. Mojaloop utilise également le [protocole Interledger](https://github.com/interledger) pour orchestrer des transferts d’argent sécurisés. Les licences de ces plateformes et de leurs dépendances permettent de nombreux usages légitimes du logiciel.

## 8. Comment contribuer à Mojaloop ?

Vous pouvez contribuer en aidant à créer de nouvelles fonctionnalités prévues sur la feuille de route, ou en aidant à améliorer la plateforme. Pour consulter la feuille de route, voir la [Mojaloop Roadmap](../mojaloop-roadmap.md). Nous recommandons de commencer par le guide d’onboarding et l’exemple de problème, conçus pour présenter les idées clés de la plateforme et du logiciel, les méthodes de build et le processus de contribution.
    
## 9. Peut-on utiliser Mojaloop pour des paiements en cryptomonnaie ?

Pas avec la spécification actuelle et cette plateforme. Aujourd’hui, cela se limite aux devises répertoriées dans l’ISO 4217. Comme la spécification et la plateforme portent sur des transferts numériques, il serait possible d’étudier un cas d’usage pour ce besoin. Sinon, un FSP peut assurer la conversion (comme c’est déjà souvent le cas) entre la crypto et une devise prise en charge.

## 10. Comment accéder au code source de Mojaloop ?

Voici quelques ressources pour commencer :
1. Documentation : https://github.com/mojaloop/documentation.
2. Consultez les dépôts dont la description contient « CORE COMPONENT (Mojaloop) » : ce sont les composants cœur. Les dépôts « CORE RELATED (Mojaloop) » sont ceux nécessaires pour supporter l’implémentation/déploiement actuel du Switch Mojaloop.
3. Remarque générale : pour le code le plus récent, utilisez pour l’instant la branche `develop`.
4. Architecture actuelle : https://github.com/mojaloop/docs/tree/master/Diagrams/ArchitectureDiagrams. Note : ces éléments sont en cours de migration vers https://github.com/mojaloop/documents.
5. Informations sur l’architecture et le déploiement : https://github.com/mojaloop/documentation/tree/master/deployment-guide.


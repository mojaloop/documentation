# La feuille de route Mojaloop


La feuille de route Mojaloop est élaborée et maintenue par la fondation Mojaloop, en collaboration avec la grande Communauté. Elle est examinée et mise à jour lors de chaque réunion communautaire, et la dernière mise à jour date de la réunion PI 23 à Lusaka, Zambie.

La feuille de route est construite autour du concept des trois piliers.<P> <img src="https://raw.githubusercontent.com/mojaloop/product-council/a0cf73a8fb4921a3bf03aab42416a0ae6c8aa94e/Mojaloop%20Pillars.png" align="right" width="350"></a>

Les piliers sont :

1. **Faciliter l'adoption** – créer des outils permettant aux développeurs et aux adoptants de déployer Mojaloop avec un minimum de complexité et d'efforts, dans un environnement adapté à leurs besoins techniques, opérationnels ou réglementaires.
2. **Atteindre l'échelle** – mettre à disposition autant de fonctionnalités "à valeur ajoutée" que possible, afin de soutenir les adoptants dans la réalisation de leurs objectifs, que ce soit pour la rentabilité financière, le soutien à des objectifs sociaux, ou les deux.
3. **Connecter à d'autres systèmes** – Nous reconnaissons que Mojaloop n'est pas la seule solution d'interopérabilité de paiements, donc dans ce pilier nous cherchons à développer autant d'options que possible pour interconnecter à d'autres services et plateformes de paiement, et nous assurer que le moteur Mojaloop sous-jacent est optimisé pour supporter ces interconnexions.

Les Piliers sont eux-mêmes appuyés par des **Travaux Fondamentaux de Produit Qualité**, qui soutiennent ensemble la maintenance continue et l'amélioration de la solution de base Mojaloop.

Voici la feuille de route complète pour PI-23 : ![Mojaloop Roadmap](https://github.com/mojaloop/product-council/blob/main/PI%2023%20Mojaloop%20Roadmap.png?raw=true).

Cette version de la feuille de route s'étend de la sortie de Mojaloop 15.1 à la fin du PI 21 (juin 2023), jusqu'à la fin du PI 26 (février 2025). Les versions de Mojaloop sont passées de numéros à des noms pendant PI 22, ainsi nous avons Mojaloop Acacia qui est sur le point d'être publié ; il sera suivi par Mojaloop Zambezi, à la fin du PI 23, construit sur Acacia et intégrant les résultats de travaux comme les Paiements Commerçants et le Change (transferts internationaux).

Nous prévoyons actuellement de publier Mojaloop Baobab, basé sur l'effort de développement vNext et l'architecture de référence, à la fin du PI 24, soit fin juin 2024 (bien que cela dépende d'atteindre le niveau nécessaire de qualité et de fonctionnalité, qui sera obtenu via un processus de transition ayant sa propre feuille de route). À son tour, il sera remplacé par Mojaloop Meerkat à la fin d'octobre 2024, qui enrichira Baobab en ajoutant de nouveaux résultats de travaux, encore à définir. D'autres versions suivront le même processus.

À droite de la feuille de route se trouvent quatre tableaux. Ils listent les travaux candidats pour chaque pilier et pour la fondation produit qualité. Ceux-ci ont été identifiés comme des fonctionnalités souhaitables lors de divers événements communautaires, mais n'ont pas encore été adoptés par la Communauté.

Chacun des piliers a ses propres travaux techniques. Pour PI 23, les travaux techniques suivants ont été adoptés.

## Faciliter l’adoption
* Support pour le déploiement sur site
    * Améliorer la prise en charge du déploiement non Cloud de Mojaloop, lorsque cela est requis pour des raisons réglementaires ou autres.
* Outils de participation
    * Garantir une gamme d’options pour que les DFSP participants puissent se connecter à un Hub Mojaloop, et que ces options offrent des capacités de connectivité comparables.

## Atteindre l’échelle
* Paiements commerçants
    * Support des paiements commerçants utilisant un Hub Mojaloop comme moteur de paiement pour un schéma marchand offrant des paiements via code QR ou USSD. Cela inclut l’enregistrement des commerçants et la prise en charge de l’acquisition de commerçants.

## Connecter à d’autres systèmes
* Règlement de nouvelle génération
    * Se connecter à d'autres systèmes de paiement et effectuer des transactions transfrontalières augmente la complexité des processus de règlement nécessaires pour un switch, et ce travail met à jour le moteur de règlement de Mojaloop pour offrir la flexibilité requise.
* Change (Foreign Exchange)
    * Ce travail améliore le Hub Mojaloop pour supporter des transactions multi-devises, via l’intégration à un fournisseur de change externe (FXP). La première version supportera un modèle (l’expéditeur convertit) et un FXP ; les prochaines versions supporteront plusieurs modèles et plusieurs FXP, ainsi que l’utilisation d’une devise de réserve en intermédiaire.
* Intégration MOSIP
    * Afin de mieux soutenir les paiements sociaux et les programmes nationaux de paiement, ce travail développe une solution qui permettra de diriger les paiements vers une identité numérique MOSIP, au lieu par exemple d’un numéro de téléphone mobile. Ce travail vise aussi une plus grande intégration avec d’autres projets open source DPG, dont Mifos, PHEE et OpenG2P, pour permettre l’utilisation des identifiants MOSIP lors de la génération de listes de paiements pour les versements sociaux de masse.

## Produit Qualité
* Caractérisation des performances
    * Identifier et implémenter les modifications du logiciel principal du Hub Mojaloop pouvant améliorer les performances, à l’approche de plusieurs déploiements nationaux.
* Adoption de Tigerbeetle
    * Utiliser Tigerbeetle pour mettre à jour les registres lors du traitement des transactions afin d’obtenir de meilleures performances (cela n’est pas attendu avant la sortie de Mojaloop Baobab).
* Équipe principale (Core Team)
    * Maintient le cœur de Mojaloop par la correction de bogues critiques, l’amélioration de fonctionnalités prioritaires, la mise à jour des dépendances, et assure le processus de publication des services centraux ainsi que de certains services ou produits adjacents à la plateforme Mojaloop.
* Qualité et sécurité de la plateforme
    * Évaluation, maintenance et amélioration de la cybersécurité de la plateforme Mojaloop, couvrant la connectivité avec les DFSP participants (y compris les transactions) et la sécurité des portails opérateurs du hub.

En plus de ces travaux techniques, il existe plusieurs **Travaux Stratégiques**, qui visent à traiter des problématiques à long terme, comme la migration vers la norme ISO 20022 ou la veille sur les évolutions des transactions transfrontalières. Il est prévu que ces travaux stratégiques aboutissent périodiquement à la spécification de travaux techniques candidats, susceptibles d’être adoptés dans de futurs PI.

---
sidebarTitle: Principes d’ingénierie
---

# Principes d’ingénierie

Cette section présente les principes qui sous-tendent les choix d’ingénierie du Hub Mojaloop.

## Journalisation

La journalisation standard des conteneurs (*stdout*, *stderr*) est utilisée par défaut.

## Transferts

1. Les identifiants de ressources sont uniques dans un schéma et imposés par le hub.

2. Les méthodes d’API pouvant retourner de grands ensembles de résultats sont paginées par défaut.

3. Les recherches de modèle de règlement utilisent les devises des DFSP payeur et bénéficiaire.

4. Les ressources / entités sont typées pour être distinguées.

5. Les noms (objets, méthodes, types, fonctions, etc.) sont clairs et non ambigus.

## Comptes et soldes

1. Le grand livre repose sur un magasin de données sous-jacent **fortement cohérent**.

2. Les données financières critiques sont répliquées vers plusieurs nœuds géographiquement distribués de manière **fortement cohérente** et performante, de sorte que la défaillance de plusieurs nœuds physiques n’entraîne **aucune perte de données**.

## Participants

1. Les problématiques de connectivité des participants sont traitées au niveau passerelle pour faciliter l’usage d’outils standard du secteur.

## Évolutivité et résilience

1. Le débit global des transferts (les trois phases) est évolutif de manière quasi linéaire par ajout de nœuds matériels modestes et génériques.

2. Les données critiques métier peuvent être répliquées sur plusieurs nœuds géographiquement distribués de façon fortement cohérente et performante ; la défaillance de plusieurs nœuds physiques n’entraîne aucune perte de données.

## Spécification Mojaloop

1. Prise en charge de JWS.

2. TLS mutuellement authentifié (x.509) en version 1.2 recommandé entre participants et hub.

## Généralités

1. Les traitements dépendant du contexte sont effectués une fois et les résultats mis en cache en mémoire si nécessaire plus tard dans la même pile d’appels.

2. Tous les messages de journal contiennent des informations contextuelles.

3. Les défaillances sont anticipées et gérées le plus gracieusement possible.

4. Les requêtes inter-processus / réseau ne demandent que les données nécessaires.

5. Les couches d’abstraction sont réduites au minimum.

6. La communication inter-processus utilise le même mécanisme de transport partout où c’est possible.

7. Les agrégats sont sans état.

## Applicabilité

La présente version de ce document correspond à Mojaloop version [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0).

## Historique du document
|Version|Date|Auteur|Détail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|14 avril 2025| Paul Makin|Suppression des sections déploiement|
|1.0|5 février 2025| James Bush|Version initiale|

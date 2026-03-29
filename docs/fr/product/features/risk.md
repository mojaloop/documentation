---
sidebarTitle: Gestion des risques
---

# Gestion des risques

L’exploitation d’un schéma de paiement construit autour d’un hub Mojaloop implique de gérer le risque entre parties transactionnelles aux appétences différentes. Les principes appliqués sont les suivants :

1. Tous les participants (FSP) doivent déposer une forme de liquidité convenue auprès du partenaire de règlement du schéma. Cette liquidité ne peut être retirée, en tout ou partie, du schéma qu’avec l’accord de l’opérateur de schéma.
    &nbsp;
2. Une transaction n’est compensée (phase de transfert) que s’il existe une liquidité suffisante pour la couvrir, au regard du solde de liquidité, de la position courante du DFSP (solde net des transactions déjà compensées depuis la dernière activité de règlement, en tant que payeur ou bénéficiaire) et des fonds réservés.
    &nbsp;
3. La valeur d’une transaction compensée est ajoutée à la position du DFSP payeur et débitée de celle du DFSP bénéficiaire.
 &nbsp;
4. Lors du règlement, pour chaque DFSP, une position négative est débitée du solde de liquidité et transférée au partenaire de règlement pour distribution aux créanciers ; une position positive est créditée sur le solde de liquidité par le partenaire de règlement à partir des fonds des débiteurs.
    &nbsp;
5. Un règlement réussi solde la valeur représentée par les transactions de la fenêtre ou du lot de règlement associé dans la position de chaque DFSP.
    &nbsp;
6. Un DFSP doit gérer sa liquidité : l’augmenter si elle devient insuffisante pour les transactions anticipées, ou en retirer une partie (sur demande à l’opérateur de schéma) si elle est trop élevée. Ces opérations ont lieu hors Mojaloop mais doivent être déclarées dans le schéma Mojaloop par le DFSP ou le partenaire de règlement.
    &nbsp;
7. Si le partenaire de règlement n’est pas disponible 24h/24, un DFSP peut déposer un excédent sur son compte de liquidité, par exemple pour couvrir les transactions prévues pendant un jour férié. Ce reliquat peut être géré via un plafond de débit net (NDC), par exemple pour limiter l’usage de la liquidité au niveau attendu un jour donné et préserver la capacité à traiter pendant toute la période de fermeture. Le NDC s’utilise conjointement avec le solde de liquidité pour l’autorisation des transactions pendant la phase de cotation.

## Applicabilité

La présente version de ce document correspond à Mojaloop version [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0).

## Historique du document
  |Version|Date|Auteur|Détail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|14 avril 2025| Paul Makin|Mises à jour liées à la sortie de la V17|
|1.0|13 mars 2025| Paul Makin|Version initiale|

---
sidebarTitle: Transactions transfrontalières
---

# Transactions transfrontalières

*Cette page suppose que le lecteur connaît les [**capacités inter-schémas**](./InterconnectingSchemes.md) de Mojaloop et le fonctionnement du [**change**](./ForeignExchange.md).*

La version actuelle de Mojaloop considère une transaction transfrontalière comme une opération qui quitte un schéma de paiement pour être transmise à un autre relevant d’une juridiction réglementaire différente. Il s’agit donc, en termes Mojaloop, d’une transaction inter-schémas incluant une opération de change.

Le schéma suivant illustre la mise en œuvre de cette fonctionnalité.

![Transactions transfrontalières](./XB.svg)

Dans ce contexte, un proxy fait le lien entre deux schémas Mojaloop opérant dans des pays (juridictions) distincts, en facilitant les transactions et en assurant la non-répudiation de bout en bout. Plusieurs FXP sont représentés — deux dans la juridiction A et un dans la juridiction B — afin de couvrir les différents modèles économiques envisageables pour les opérations de change.

Ce modèle peut être étendu pour interconnecter des systèmes nationaux de paiement instantané déjà existants, comme suit :

![Interconnexion de schémas nationaux pour des transactions transfrontalières](./ComplexXB.svg)

## Applicabilité

La présente version de ce document correspond à Mojaloop version [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0).

## Historique du document
  |Version|Date|Auteur|Détail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|22 avril 2025| Paul Makin|Ajout de l’historique des versions ; précisions rédactionnelles|
|1.0|14 avril 2025| Paul Makin|Version initiale|

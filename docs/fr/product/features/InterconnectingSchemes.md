---
sidebarTitle: Interconnexion de schémas
---

# Interconnexion de schémas de paiement

Mojaloop, dans un déploiement unique, sert à exploiter un ou plusieurs schémas de paiement sur une même plateforme. Il est courant qu’un pays héberge plusieurs schémas sur des plateformes distinctes, répondant à des besoins sectoriels différents.

À mesure qu’un schéma se développe, le besoin d’interconnexion ou d’interopérabilité avec d’autres schémas nationaux augmente. Mojaloop y répond par un mécanisme appelé « Interscheme ».

L’approche Interscheme de Mojaloop s’appuie sur un type particulier de participant DFSP : le *Proxy*. Un Proxy est un DFSP léger présent dans les deux schémas interconnectés, avec les caractéristiques suivantes :
- le Proxy ne traite pas les messages ; il les relaie entre les schémas connectés ;
- pour préserver la non-répudiation entre schémas, le proxy ne participe pas à l’accord sur les conditions, ce qui contribue à réduire les coûts ;
- il ne joue aucun rôle dans la compensation des transactions.

Ainsi, un Proxy conserve les trois phases d’un transfert Mojaloop et assure la non-répudiation de bout en bout. L’accord conclu lors d’un transfert reste donc entre les DFSP d’origine et de réception, quel que soit le schéma auquel ils sont rattachés.

![Interconnexion inter-schémas simple](./SimpleInterscheme.svg)

Par ailleurs, le modèle d’interconnexion Mojaloop prend en charge la découverte inter-schémas : un alias utilisé dans un schéma peut servir à router un paiement depuis un autre.

La version actuelle de Mojaloop ne prend en charge que l’interconnexion de schémas basés sur Mojaloop. Des travaux visent à étendre cette capacité à d’autres schémas de paiement connectés à un schéma Mojaloop.

Les détails d’implémentation de cette interconnexion figurent dans la [**documentation inter-schéma**](./interscheme.md).

Pour le lien avec le [**change**](./ForeignExchange.md) et les [**transactions transfrontalières**](./CrossBorder.md), voir les pages correspondantes.

## Applicabilité

La présente version de ce document correspond à Mojaloop version [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0).

## Historique du document
  |Version|Date|Auteur|Détail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|22 avril 2025| Paul Makin|Ajout de l’historique ; précisions rédactionnelles|
|1.0|14 avril 2025| Paul Makin|Version initiale|

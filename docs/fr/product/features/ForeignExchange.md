---
sidebarTitle: Change
---

# Change

Un système de paiement moderne doit pouvoir prendre en charge des transactions dans plusieurs devises ; Mojaloop ne fait pas exception, avec une prise en charge native de plusieurs devises de transaction. Un principe important est que ces devises restent indépendantes : une transaction débitée sur le débiteur en devise X est toujours créditée sur le créancier en devise X.

Il est toutefois parfois nécessaire de créer un « pont » entre ces devises. C’est le rôle du change, avec l’intervention d’un tiers appelé, dans le vocabulaire Mojaloop, fournisseur de change (*Foreign Exchange Provider*, FXP).

Cette fonction n’est pas nécessairement liée à l’envoi transfrontalier de fonds : une personne dans une même juridiction peut légitimement détenir des fonds dans plusieurs devises, d’autant plus dans les pays où plusieurs devises circulent couramment.

Le schéma suivant illustre la mise en œuvre dans Mojaloop.

![Change](./FXP.svg)

À ce jour, Mojaloop ne prend en charge qu’un seul modèle économique pour le change : le modèle « le payeur décide » (*Payer Decides*).

### Le payeur décide

1. Un client du DFSP1 souhaite envoyer 10 unités de la devise X au bénéficiaire.
2. La phase de découverte indique que le compte du bénéficiaire est hébergé par le DFSP2.
3. Le DFSP1 propose la transaction au DFSP2, qui indique que le paiement doit être effectué en devise Y.
4. Le DFSP1 envoie 10 X au FXP, qui transmet la contre-valeur en Y au DFSP2, puis le versement au bénéficiaire (hors frais, écart de change, etc.).

Les détails d’implémentation de cette capacité de change figurent dans la [**documentation FX**](./fx.md).

D’autres modèles, plus complexes, seront pris en charge dans une prochaine version. Il est notamment prévu :

### Plusieurs FXP

1. Un client du DFSP1 souhaite envoyer 10 unités de la devise X au bénéficiaire.
2. La découverte montre que le compte du bénéficiaire est hébergé par le DFSP2.
3. Le DFSP1 propose la transaction au DFSP2, qui indique que le paiement doit être effectué en devise Y.
4. Le DFSP1 sollicite plusieurs FXP, retient celui offrant les conditions les plus favorables, envoie 10 X à ce FXP, qui transmet la contre-valeur en Y au DFSP2 et règle le bénéficiaire (hors frais, écart de change, etc.).

### Le bénéficiaire décide

1. Un client du DFSP1 souhaite envoyer 10 unités de la devise X au bénéficiaire.
2. La découverte montre que le compte du bénéficiaire est hébergé par le DFSP2.
3. Le DFSP1 propose la transaction au DFSP2, qui indique que le paiement doit être effectué dans la devise du payeur, X.
4. Le DFSP1 envoie 10 X au DFSP2.
5. Le DFSP2 sollicite plusieurs FXP, en retient un selon les conditions les plus favorables et envoie 10 X à ce FXP, qui renvoie la contre-valeur en Y au DFSP2, lequel règle ensuite le bénéficiaire (hors frais, écart de change, etc.).

Pour la suite du lien entre capacités inter-schémas et change, voir les [**transactions transfrontalières**](./CrossBorder.md).

## Applicabilité

La présente version de ce document correspond à Mojaloop version [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0).

## Historique du document
  |Version|Date|Auteur|Détail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|22 avril 2025| Paul Makin|Ajout de l’historique des versions|
|1.0|13 mars 2025| Paul Makin|Version initiale|

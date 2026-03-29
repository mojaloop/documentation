---
sidebarTitle: Frais et tarifs
---

# Frais et tarifs

Mojaloop prend en charge les frais de transaction grâce à une architecture pilotée par des règles, pour la transparence et l’accord à chaque étape du paiement.

## Accord sur les conditions — négociation des frais

Avant la transaction, Mojaloop utilise la phase **Accord sur les conditions** pour permettre aux DFSP de calculer et d’accepter tous les frais et commissions associés.

Au début de cette phase, le DFSP payeur propose la transaction au DFSP bénéficiaire, avec un modèle de facturation : soit les frais s’ajoutent au montant payé par l’émetteur, soit ils sont déduits du montant reçu par le bénéficiaire.

Si le DFSP payeur souhaite poursuivre, il envoie une confirmation. Le DFSP bénéficiaire transmet alors ses frais (et autres conditions) au DFSP payeur sous forme de contrat, en acceptant ou en refusant le modèle de facturation choisi.

Si le DFSP payeur accepte les conditions du DFSP bénéficiaire, il présente les conditions du transfert au payeur, y compris le total à payer selon le modèle retenu.

| Modèle de facturation | Paye le payeur | Reçoit le bénéficiaire |
| -------------- | ---------------------- | -------------------- |
| Frais à charge de l’émetteur | Montant + frais DFSP payeur + frais DFSP bénéficiaire | Montant |
| Frais à charge du bénéficiaire | Montant + frais DFSP payeur | Montant − frais DFSP bénéficiaire |

Si le payeur accepte et souhaite poursuivre, le montant convenu du transfert est débité sur son compte par le DFSP payeur, qui retient ses propres frais et soumet au Hub Mojaloop une demande de transfert pour le reliquat, avec le contrat du bénéficiaire.

À l’issue du transfert, le DFSP bénéficiaire retient ses frais convenus et crédite le compte du bénéficiaire du reliquat.

Ainsi, tous les frais sont regroupés dans une seule cotation : le payeur connaît le coût exact avant de valider, y compris si les frais du DFSP bénéficiaire sont payés par le payeur ou le bénéficiaire.

## Rules Handler — frais d’interchange

Mojaloop prend en charge des règles de frais avancées, comme les **frais d’interchange**, via son *Rules Handler*, qui évalue les transactions en cours de traitement. Par exemple, dans un paiement P2P portefeuille à portefeuille entre DFSP distincts, Mojaloop peut appliquer automatiquement 0,6 % de frais facturés par le DFSP bénéficiaire au DFSP payeur. Ils sont enregistrés au grand livre et règlés ultérieurement.

## Frais de hub (opérateur)

Outre les frais par transaction, les opérateurs de hub peuvent facturer des frais d’usage d’infrastructure ou d’abonnement aux DFSP participants. Ces « frais de hub » sont en général modestes — de quoi couvrir les coûts opérationnels — dans une logique de « coûts de service récupérés plus marge légère » pour limiter les frais finaux.

---

### En résumé

| Type de frais                | Géré par             | Quand et comment                                    |
| ----------------------- | ---------------------- | --------------------------------------------- |
| Frais de transaction        | Service d’accord sur les conditions        | Cotés à l’avance, acceptés avant exécution      |
| Frais d’interchange        | Rules Handler + grand livre | Appliqués pendant le traitement selon les règles      |
| Frais d’infrastructure hub | Opérateur de hub           | Facturés séparément pour couvrir l’exploitation |

Cette approche par couches offre à Mojaloop une forte transparence des frais, de la configurabilité, de l’automatisation et de la cohérence de règlement — essentiel pour l’interopérabilité et l’inclusion financière à coût maîtrisé.

## Applicabilité

La présente version de ce document correspond à Mojaloop version [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0).

## Historique du document
  |Version|Date|Auteur|Détail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.0|17 juillet 2025| Paul Makin|Version initiale|

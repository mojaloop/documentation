---
sidebarTitle: Contrats HTLC
---

# Contrats à secret et délai (*Hashed Timelock Contracts*)

Mojaloop utilise les verrous cryptographiques d’ILP pour garantir des transferts atomiques et conditionnels entre DFSP. Le mécanisme repose sur les contrats à secret et délai (HTLC), qui permettent des transferts conditionnels : un transfert se termine entièrement pour toutes les parties ou pas du tout.

Un contrat est conclu entre les DFSP payeur et bénéficiaire pendant la phase d’accord sur les conditions d’une transaction Mojaloop, ouverte lorsque le DFSP payeur propose une transaction via une demande de cotation.

Lorsque le DFSP bénéficiaire estime que la transaction peut avoir lieu (après ses contrôles internes), il :
- modifie les conditions proposées pour préciser celles auxquelles il accepte d’exécuter la transaction (par exemple frais et conditions de conformité) ;
- crée l’objet *Transaction*, qui définit les conditions auxquelles il est prêt à honorer la demande de paiement ;
- crée et conserve le *Fulfilment*, haché de l’objet Transaction, signé avec la clé privée du DFSP bénéficiaire (clé dédiée et limitée à cet usage) ;
- crée la *Condition*, haché du *Fulfilment* ;
- ajoute la *Condition* à l’objet Transaction ;
- et le renvoie au DFSP payeur dans la réponse de cotation.

Si le DFSP payeur accepte les conditions, il envoie une demande de transfert comprenant l’objet Transaction, la *Condition* reçue et une heure d’expiration, au Hub Mojaloop.

Le Hub Mojaloop enregistre la *Condition*, transmet la demande de transfert au DFSP bénéficiaire et démarre un temporisateur aligné sur l’expiration indiquée.

À réception de la demande de transfert, le DFSP bénéficiaire :
- vérifie que la *Condition* reçue correspond à celle convenue (y compris que le montant demandé est celui convenu) et que les conditions de conformité sont remplies ;
- renvoie le *Fulfilment* au Hub Mojaloop dans la réponse de transfert.

Le Hub Mojaloop hache le *Fulfilment* retourné pour vérifier qu’il correspond à la *Condition* reçue du DFSP payeur ; en cas de succès, il notifie le DFSP payeur (et le DFSP bénéficiaire si demandé) qu’une obligation a été créée entre eux — autrement dit que le paiement a été compensé.

La notification au DFSP payeur inclut le *fulfilment*, preuve cryptographique d’achèvement irrévocable. Si le DFSP payeur recalcule la *Condition* et constate un écart avec celle convenue, il doit ouvrir un litige avec le DFSP bénéficiaire.

Si le temporisateur du Hub expire avant réception du *Fulfilment* du DFSP bénéficiaire, le Hub notifie chaque DFSP que la transaction est annulée.

## Applicabilité

Ce document concerne Mojaloop version 17.0.0.

## Historique du document
  |Version|Date|Auteur|Détail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|2 juillet 2025| Paul Makin|Mise à jour après relecture par Michael Richards|
|1.0|30 juin 2025| Paul Makin|Version initiale|

# Introduction – Guide de gestion du Settlement

Lorsqu’un paiement est effectué dans un système de paiements en temps réel comme Mojaloop, le DFSP qui est le détenteur du compte du bénéficiaire (le DFSP créancier) accepte de créditer le bénéficiaire des fonds immédiatement. Mais le DFSP créancier n’a pas encore reçu les fonds du DFSP qui est le détenteur du compte du débiteur : tout ce qui s’est produit jusqu’à présent, c’est que le DFSP débiteur a contracté une obligation de rembourser le DFSP créancier, et cette obligation a été enregistrée dans le Hub Mojaloop.

Le processus de Settlement est le processus par lequel un DFSP débiteur rembourse un DFSP créancier pour les obligations que le DFSP débiteur a contractées du fait des transferts.

Ce guide décrit comment le Settlement est géré par le Hub Mojaloop et la ou les banques partenaires de règlement, et présente les principaux blocs de construction du traitement du Settlement.

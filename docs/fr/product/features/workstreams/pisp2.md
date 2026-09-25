---
sidebarTitle: PISP 2.0
---

# Workstream PISP 2.0

L’implémentation actuelle du PISP doit être refactorisée afin de répondre aux besoins généraux des adopteurs et des fintechs, plutôt que de ne prendre en charge qu’un seul mode de fonctionnement. Cela nécessitera des modifications complémentaires au niveau du Hub et du connecteur Mojaloop, et devrait permettre la prise en charge de l’autorisation continue au niveau du DFSP.

L’interface PISP refactorisée prendra également en charge l’initiation de paiements de masse par une fintech, offrant par exemple un service externalisé de traitement des salaires.

Ce workstream doit être achevé avant que les modifications proposées pour les paiements de masse / PISP ne soient entreprises.

Des améliorations pour la prise en charge de l’AISP suivront dans une itération de planification (PI) ultérieure.

# Justification métier

Généraliser l’implémentation PISP de Mojaloop afin de prendre en charge des modèles économiques autres que celui de Google, sponsor de l’implémentation initiale.

## Contributeurs
|Responsable du workstream|Contributeurs|
|:--------------:|:--------------:|
| Olivier Manzi<br>Yui Kanchalai | Adetayo Teluwo<br>Paul Makin<br>Sam Kummary<br>Michael Richards<br>Péricles Correa |

## Dernière mise à jour (résumé)
Le workstream PISP s’est concentré sur la mise en place des processus de livraison, notamment le suivi de projet sur GitHub, la gestion des jalons et l’intégration des contributeurs. La participation active à l’open source a nettement augmenté, tandis que les travaux de migration du code vers TypeScript ont démarré. Pour la suite, le workstream prépare une preuve de concept PISP 2.0 de bout en bout, en portant une attention particulière aux outils d’intégration pour les fintechs et au SDK nécessaire pour compléter les fonctionnalités existantes du Hub.

## Applicabilité

La présente version de ce document correspond à Mojaloop [version 17.2.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0).

## Historique du document
  |Version|Date|Auteur|Détail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.0|28 juillet 2026| Paul Makin|Version initiale|

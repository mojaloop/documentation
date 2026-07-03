---
sidebarTitle: Évolution Mojaloop
---

# Workstream Évolution Mojaloop

Ce workstream vise une évolution majeure des services centraux critiques de Mojaloop :
- remplacer la fonctionnalité de comptabilité au cœur de Mojaloop par TigerBeetle ;
- remplacer le cœur du moteur de règlement par des capacités TigerBeetle alignées avec Settlement V3.

# Justification métier

TigerBeetle est la technologie de grand livre de nouvelle génération pensée pour Mojaloop, avec un potentiel d’amélioration du débit d’au moins un ordre de grandeur.

## Contributeurs
|Responsable du workstream|Contributeurs|
|:--------------:|:--------------:|
| Michael Richards | James Bush<br>Lewis Daley<br>Sam Kummary<br>Paul Makin |

## Dernière mise à jour (résumé)
### Audit forensic
La refonte de l’audit forensic est prête à être implémentée mais attend le financement de projets d’adoption à venir. Peu de progrès attendus avant mi-T1 2026.

### Nouveau modèle comptable
Le nouveau modèle est largement validé et marque un alignement majeur sur les normes comptables internationales, répondant aux préoccupations des institutions mondiales et renforçant la crédibilité de Mojaloop comme infrastructure financière. Cible initiale : TigerBeetle ; la production d’une version MySQL du nouveau modèle n’est pas encore tranchée.

### Intégration TigerBeetle
Compte tenu de la complexité accrue du modèle comptable, TigerBeetle est le moteur de grand livre privilégié. La planification d’intégration est en cours ; les travaux devraient démarrer avant fin d’année.

### Settlement v3
Settlement v3 introduit des lots de règlement déterministes, pour des problèmes de rapprochement de longue date et une montée en charge multi-schémas. TigerBeetle stockera les clés de lot de règlement ; les composants SQL et les API d’administration devront évoluer fortement pour la configuration du modèle, le suivi des lots et les opérations de règlement.

## Applicabilité

La présente version de ce document correspond à Mojaloop [version 17.1.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0).

## Historique du document
  |Version|Date|Auteur|Détail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|4 décembre 2025| Paul Makin|Ajout de la dernière mise à jour|
|1.0|25 novembre 2025| Paul Makin|Version initiale|

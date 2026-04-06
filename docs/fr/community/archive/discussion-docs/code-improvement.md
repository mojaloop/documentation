# Projet d’amélioration du code (Code_Improvement)

## Aperçu
Objectif : améliorer la qualité et la sécurité du code du projet Mojaloop. Analyse et introduction d’outils open source, amélioration des processus, contrôles aux étapes (pull requests et builds), documentation.

Périmètre : qualité et sécurité, avec extensions possibles vers l’automatisation des tests, DevOps et outils associés.

## Livrables (phase 1 fin janvier)
- Mise en œuvre et analyse de nouveaux outils OSS
- Mise à jour des scripts de release : intégrer la sécurité dans release / DevOps (CI/CD)
- Mise à jour des règles pour les pull requests : aspects sécurité avant validation
- Mise à jour de la documentation : normes et guides de contribution

Canal Slack : `#code_security`

## Discussions
### Modifier Dockerfile et processus CI/CD pour renforcer la sécurité des conteneurs
- Créer un utilisateur non root dans le Dockerfile
- Activer docker-content-trust sur l’hôte Docker (dans CircleCI)
- Lancer les builds avec `--no-cache` à l’étape CircleCI pour récupérer les correctifs de sécurité à chaque fois (le cache d’images Docker n’est de toute façon pas activé dans notre CircleCI)

### Passer de Javascript à Typescript
- Transition vers Typescript (coexistence js/ts) pour plus de sécurité et de qualité
- Typescript préféré mais non obligatoire : https://github.com/mojaloop/template-typescript-public


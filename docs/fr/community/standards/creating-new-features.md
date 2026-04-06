# Créer de nouvelles fonctionnalités

## Fork

Créez un fork du dépôt Mojaloop dans votre espace personnel. Veillez à maintenir la branche `master` à jour.

Voir la documentation : [https://help.github.com/articles/fork-a-repo/](https://help.github.com/articles/fork-a-repo/)

1. Clonez le dépôt via le bouton Fork de Git (voir la doc ci-dessus).
2. Clonez votre fork : `git clone https://github.com/<your_username>/<forked_repo>.git`
3. Synchronisez votre fork avec Mojaloop

   Ajoutez le dépôt distant amont Mojaloop : `$ git remote add mojaloop https://github.com/mojaloop/<original_repo>.git`

   Vous devez voir deux remotes :

   ```bash
    git remote -v
    origin    https://github.com/<your_username>/<forked_repo>.git (fetch)
    origin    https://github.com/<your_username>/<forked_repo>.git (push)
    mojaloop  https://github.com/mojaloop/<original_repo>.git (fetch)
    mojaloop  https://github.com/mojaloop/<original_repo>.git (push)
   ```

4. Pour synchroniser votre branche courante : `git pull mojaloop <current_branch>` — fusionne les changements du dépôt Mojaloop dans votre fork.
5. Poussez les changements vers votre fork : `git push origin <current_branch>`

## Créer une branche

Créez une nouvelle branche à partir de `master` avec le format : `<branchType>/<issue#><issueDescription>` où `issue#` provient du ticket GitHub et `issueDescription` est la description du ticket en CamelCase.

1. Créez et basculez sur la branche : `git checkout -b <branchType>/<issue#><issueDescription>`
2. Poussez la branche vers votre remote : `git push origin <branchType>/<issue#><issueDescription>`

Où `<branchType>` peut être l’un des suivants :

| branchType | Description |
| :---       | :--- |
| hotfix     | Branche `hotfix` pour les correctifs urgents. |
| feature    | Branche de `développement` pour les nouvelles fonctionnalités ou la maintenance en cours. |
| fix        | Branche de `développement` pour corriger un bug. |
| release    | Branche de release contenant un instantané d’une release. |
| backup     | Branche de sauvegarde temporaire, en général lors de la maintenance du dépôt. |
| major      | Branche de `pré-release` pour les changements majeurs. |
| minor      | Branche de `pré-release` pour les changements mineurs. |
| patch      | Branche de `pré-release` pour les correctifs. |

## Branche principale

La branche principale doit toujours contenir du code exploitable en déploiement.
Les outils d’automatisation de build tentent de construire et tester le code de cette branche et d’y apposer des étiquettes de version semver en cas de succès. Les artefacts sont publiés sur les dépôts concernés (npm, Docker, etc.) pour être utilisés par d’autres modules.

## Branches hotfix

Ces branches sont créées à partir d’une étiquette sur la branche principale lorsque la version correspondante est en production et qu’un problème doit être corrigé alors que la branche principale contient déjà des versions publiées plus récentes ou est en développement actif, de sorte que le correctif ne peut pas être intégré de façon stable et rapide. Elles sont nommées selon le motif `hotfix/<issue#><issueDescription>`. Il est fortement recommandé de valider d’abord le correctif sur `main` (ou une branche fusionnée vers `main`) puis de le cherrer-piquer sur la branche hotfix. Les branches hotfix ne sont en général pas fusionnées dans `main` et ne sont pas supprimées, car elles peuvent servir à des correctifs ultérieurs. Sur ces branches, les outils de build créent des étiquettes et publient les paquets en n’incrémentant que le numéro de patch.

## Branches de pré-release

Les branches de pré-release servent lorsque le développement exige des artefacts disponibles dans le dépôt pour des tests automatisés ou manuels de fonctionnalités ou correctifs non prêts pour une release.
Elles évitent le travail manuel de publication dans les dépôts. Les artefacts publiés ont des versions et étiquettes de pré-release selon semver. Les outils de build créent et publient ces versions de pré-release et étiquettent la branche dans Git pour chaque commit construit avec succès. Les branches de pré-release sont en général créées depuis `main` puis fusionnées dedans. Les motifs sont :

- `major/<issue#><issueDescription>` — lorsque la branche doit inclure des changements rupturistes.
- `minor/<issue#><issueDescription>` — lorsqu’elle n’inclut que des nouvelles fonctionnalités sans rupture. C’est le cas le plus courant pour le nouveau développement.
- `patch/<issue#><issueDescription>` — lorsqu’elle n’inclut que des correctifs sans nouvelles fonctionnalités ni rupture. Peuvent parfois partir de branches hotfix lorsque des correctifs doivent d’abord être publiés pour les tests avant fusion dans la hotfix.

Les scripts de build publient automatiquement une version de pré-release et une étiquette en utilisant `<issue#><issueDescription>` comme identifiant de pré-release suivi d’un numéro séquentiel, par ex. `X.Y.Z-<issue#><issueDescription>.sequence`, où X, Y ou Z est incrémenté automatiquement au premier build de la branche selon le préfixe major/minor/patch, et `sequence` augmente à chaque build réussi. Pour les branches de pré-release, il faut que `<issue#><issueDescription>` respecte les règles d’identifiant de pré-release de semver. Une branche minor de pré-release peut finir par inclure une rupture ; les développeurs doivent alors s’assurer qu’il n’y a pas en parallèle un autre développement majeur actif, les deux branches pourraient viser la même version majeure. En général, plusieurs branches de pré-release exigent de la vigilance pour que la version finale publiée ne soit pas en conflit avec d’autres ; une modification manuelle du numéro de version peut être nécessaire lors de la résolution d’un conflit de fusion sur la propriété `version`.

## Branches de développement

Ces branches servent surtout au développement de nouvelles fonctionnalités lorsqu’aucun artefact ne doit être publié dans les dépôts de paquets tant que la branche n’est pas fusionnée. Elles sont créées depuis `main` ou des branches de pré-release. Leurs noms ne doivent correspondre à aucun des motifs ci-dessus. Les formes fréquentes sont `feature/<issue#><issueDescription>` ou `fix/<issue#><issueDescription>`. Une branche de développement peut être renommée en branche de pré-release si le processus l’exige. Utiliser une branche de développement plutôt qu’une pré-release limite les publications et étiquettes excessives, plus longues et qui encombrent le dépôt.

## Travailler sur votre fonctionnalité

Avant de commencer, suivez les étapes suivantes pour préserver la qualité et la sécurité de la base de code Mojaloop ; certaines sont obligatoires pour que votre pull request (*PR*) passe les contrôles CI (comme indiqué).

Il est recommandé d’exécuter `npm test` après chaque étape pour éviter d’introduire de régressions.

1. OBLIGATOIRE — Mettre à jour les dépendances

   ```bash
   npm run dep:check
   ```

   >
   > IMPORTANT
   >
   > Notez toute mise à jour de dépendance en version majeure : elle peut introduire un CHANGEMENT RUPTURISTE et nécessiter du refactoring.
   >
   > Voir [Gestion des dépendances](./guide.md#dependency-upgrades) pour ignorer une mise à jour si nécessaire.
   >

   Puis pour mettre à jour et installer :

   ```bash
   npm run dep:update && npm i
   ```

2. OBLIGATOIRE — Vérifications de vulnérabilités

   ```bash
   npm run audit:check
   ```

[npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit) peut appliquer les correctifs connus disponibles :

   ```bash
   npm audit fix --package-lock-only
   ```

   >
   > IMPORTANT
   >
   > Toute modification de version de dépendance peut introduire un CHANGEMENT RUPTURISTE.
   >
   > Voir [Gestion des dépendances](./guide.md#dependency-auditing) pour plus d’informations.
   >

   S’il n’existe pas de correctif utilisable pour la vulnérabilité :

   1. Si le dépôt utilise [audit-ci](https://www.npmjs.com/package/audit-ci) — mettez à jour `audit-ci.jsonc` en ajoutant l’entrée à la liste `allowlist` avec un commentaire expliquant la raison.
   2. Si le dépôt utilise [npm-audit-resolver](https://www.npmjs.com/package/npm-audit-resolver) — exécutez `npm run audit:resolve` et suivez les invites pour corriger ou ignorer.

3. FACULTATIF — Mettre à jour NodeJS vers la version `Active LTS`

   Consultez la version `Active LTS` sur [les releases officielles NodeJS](https://nodejs.org/en/about/releases).

   1. Mettre à jour `.nvmrc`

   2. Mettre à jour le `Dockerfile` (conteneurs *builder* et *runtime*), voir [Environnement d’exécution — 2. Conteneur (Docker) et système d’exploitation](./guide.md#runtime-environment).

   >
   > IMPORTANT
   >
   > La montée de version de NodeJS peut introduire un CHANGEMENT RUPTURISTE et nécessiter du refactoring.
   >

## Ouvrir une pull request (PR)

Lorsque votre fonctionnalité est prête pour review, ouvrez une PR depuis votre branche vers la branche `master` du dépôt Mojaloop. Si vous débutez avec GitHub ou les PR, voir [ce guide](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests).

### Titres des pull requests

Mojaloop utilise [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) pour l’outillage automatisé de releases et déploiements. Le titre de votre PR **doit** respecter la spécification des commits conventionnels pour passer les contrôles CI/CD dans CircleCI.

Avec Conventional Commits et le versionnement sémantique, une nouvelle version peut être publiée automatiquement pour un composant, avec incrément `MAJOR`, `MINOR` ou correctif selon les titres de PR, et génération de changelogs détaillés. (Voir [cet exemple](https://github.com/mojaloop/thirdparty-scheme-adapter/releases/tag/v11.20.0) de changelog auto-généré.)

> **Note** :
> Lors de la fusion (avec squash), GitHub utilise le *titre* de la PR comme message de commit. Pour indiquer un changement rupturiste, utilisez le format avec `!` :
> « Si inclus dans le préfixe type/scope, les changements rupturistes DOIVENT être indiqués par un ! immédiatement avant les deux-points. Si ! est utilisé, BREAKING CHANGE: peut être omis du pied de page, et la description du commit DOIT décrire le changement rupturiste. »

#### Exemples de bons titres de PR

- feat(api): add ability to handle `PUT /thirdpartyRequests/trasactions/{ID}` endpoint
- fix: update outdated node modules
- feat(models)!: change database schema
- chore: tidy up readme

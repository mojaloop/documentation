# Normes

> *Note :* Ces normes ne sont pas gravées dans le marbre ; en tant que communauté, nous souhaitons les faire évoluer et améliorer Mojaloop. Pour proposer une modification ou des améliorations, contactez le canal Design Authority sur le Slack Mojaloop (#design-authority).

## Invariants Mojaloop

Mojaloop définit des [invariants](./invariants.md) importants à comprendre et à respecter lorsque vous contribuez à la base de code.

Ces invariants découlent des [principes Level One](https://www.leveloneproject.org/wp-content/uploads/2020/07/L1P_Guide_2019_Final.pdf) et d’autres exigences métier fixées par le conseil de gouvernance technique Mojaloop, le comité de contrôle des changements d’API, l’autorité de conception et le conseil produit. Ils visent à ce que la plateforme conserve des caractéristiques adaptées à une exploitation de type infrastructure nationale.

Assurez-vous de connaître ces invariants avant de contribuer.

## Environnement d’exécution

Les normes d’exécution suivantes s’appliquent à Mojaloop.

### Microservices et bibliothèques

1. Javascript

    NodeJS est l’environnement d’exécution standard pour tous les services et composants Mojaloop exécutant du code Javascript.

    Notre objectif est que tous les services NodeJS tournent sur la dernière version `Active LTS` (*Long Time Support*) de NodeJS, conformément au [cycle de release NodeJS](https://nodejs.org/en/about/releases/).

2. Conteneur (Docker) et système d’exploitation (*OS*)

    Les microservices Mojaloop sont construits à partir de l’image de base `node:<NODE_ACTIVE_LTS_VERSION>-alpine`, où `NODE_ACTIVE_LTS_VERSION` est la LTS NodeJS courante selon le [cycle de release NodeJS](https://nodejs.org/en/about/releases/). Voir [DockerHub](https://hub.docker.com/_/node?tab=tags&page=1&name=alpine) pour la liste des images officielles Node Alpine.

    > NOTE : pour `NODE_ACTIVE_LTS_VERSION`, utilisez la version sémantique complète `<MAJOR>-<MINOR>-<PATCH>`.
    >
    > `node:16.15.0-alpine ` <-- correct
    >
    > `lts-alpine3.16` <-- incorrect
    >

    1. Exemple de `Dockerfile` **Javascript** standard :

        ```docker
        FROM node:<NODE_ACTIVE_LTS_VERSION>-alpine as builder
        WORKDIR /opt/app

        RUN apk --no-cache add git
        RUN apk add --no-cache -t build-dependencies make gcc g++ python3 libtool libressl-dev openssl-dev autoconf automake \
            && cd $(npm root -g)/npm \
            && npm config set unsafe-perm true \
            && npm install -g node-gyp

        COPY package*.json /opt/app/

        RUN npm ci --production

        FROM node:<NODE_ACTIVE_LTS_VERSION>-alpine
        WORKDIR /opt/app

        # Create empty log file & link stdout to the application log file
        RUN mkdir ./logs && touch ./logs/combined.log
        RUN ln -sf /dev/stdout ./logs/combined.log

        # Create a non-root user: ml-user
        RUN adduser -D ml-user
        USER ml-user

        # Copy builder artefact
        COPY --chown=ml-user --from=builder /opt/app .

        # Copy source files
        COPY src /opt/app/src

        # Copy default config
        COPY config /opt/app/config

        EXPOSE <PORT>
        CMD ["npm", "run", "start"]
        ```

    2. Exemple de `Dockerfile` **Typescript** standard :

        ```docker
        FROM node:<NODE_ACTIVE_LTS_VERSION>-alpine as builder
        USER root
        WORKDIR /opt/app

        RUN apk update \
            && apk add --no-cache -t build-dependencies git make gcc g++ python3 libtool autoconf automake openssh \
            && cd $(npm root -g)/npm \
            && npm config set unsafe-perm true \
            && npm install -g node-gyp

        COPY package.json package-lock.json* ./

        RUN npm ci

        FROM node:<NODE_ACTIVE_LTS_VERSION>-alpine
        WORKDIR /opt/app

        # Create empty log file & link stdout to the application log file
        RUN mkdir ./logs && touch ./logs/combined.log
        RUN ln -sf /dev/stdout ./logs/combined.log

        # Create a non-root user: ml-user
        RUN adduser -D ml-user
        USER ml-user

        # Copy builder artefact
        COPY --chown=ml-user --from=builder /opt/app ./

        COPY src /opt/app/src
        COPY config /opt/app/config

        # NPM script to build source (./src) to destination (./dist)
        RUN npm run build

        # Prune devDependencies
        RUN npm prune --production

        # Prune source files
        RUN rm -rf src

        EXPOSE <PORT>
        CMD ["npm", "run", "start"]
        ```

### Pipelines CI (*intégration continue*)

Les jobs CI Mojaloop s’exécutent sur la version Ubuntu LTS courante selon le [cycle de release Ubuntu](https://ubuntu.com/about/release-cycle).

### Kubernetes

Les charts Helm Mojaloop ([mojaloop/helm](https://github.com/mojaloop/helm), [mojaloop/charts](https://github.com/mojaloop/charts)) sont déployés et vérifiés sur la version Kubernetes LTS courante selon le [cycle de release Kubernetes](https://kubernetes.io/releases/).

## Guide de style

La communauté Mojaloop fournit des lignes directrices pour le style de code. Elles contribuent à maintenir une base de code de qualité, maintenable et cohérente.

Ces guides sont choisis car ils peuvent être appliqués et vérifiés avec des outils courants et peu de personnalisation. Nous savons que chaque développeur a des préférences qui peuvent entrer en conflit avec ces règles ; nous privilégions la cohérence au [bike-shedding](https://en.wikipedia.org/wiki/Law_of_triviality).

L’objectif est de faciliter le flux de travail des développeurs et de limiter les commits où le style prime sur le fond. Moins de bruit dans les diffs simplifie la revue.

## Style de code

### Conventions de nommage

Pour éviter la confusion et garantir l’interopération entre langages :

- N’utilisez pas d’abréviations ou de contractions dans les identifiants. Ex. : `SettlementWindow` plutôt que `SetWin`.
- N’utilisez pas d’acronymes non universellement acceptés en informatique.
- Lorsque c’est pertinent, utilisez des acronymes reconnus pour raccourcir. Ex. : `UI` pour *User Interface*.
- Utilisez Pascal case ou camel case selon le contexte (classes vs variables). Ex. : `SettlementWindow` (classe) ou `settlementWindow` (variable).
- Mettez en majuscules les acronymes de deux lettres isolés, ex. `ID` plutôt que `Id`. Ex. : `/transfer/{{ID}}` plutôt que `/transfer/{{Id}}` pour un paramètre d’URI.
- Évitez les abréviations dans les identifiants ou paramètres. Si vous devez en utiliser, camel case pour les abréviations de plus de deux caractères, même si cela diverge de l’abréviation usuelle.
- Utilisez le SCREAMING_SNAKE_CASE pour les énumérations. Ex. : `RECORD_FUNDS_OUT_PREPARE_RESERVE`.

Réf. : [Microsoft - Design Guidelines for Class Library Developers](https://docs.microsoft.com/en-us/previous-versions/dotnet/netframework-1.1/141e06ef(v=vs.71)?redirectedfrom=MSDN)

### Javascript

Mojaloop suit le style Javascript défini par [StandardJS](https://standardjs.com/). Règles complètes : [Standard Rules](https://standardjs.com/rules.html). Extraits :

- *2 espaces* pour l’indentation

```js
function helloWorld (name) {
  console.log('hi', name)
}
```

- *Guillemets simples* pour les chaînes sauf pour éviter d’échapper.

```js
console.log('hello there')    // ✓ ok
console.log("hello there")    // ✗ avoid
console.log(`hello there`)    // ✗ avoid
```

- Pas de point-virgules. (voir : 1, 2, 3)

```js
window.alert('hi')   // ✓ ok
window.alert('hi');  // ✗ avoid
```

### Typescript

> *Note : Standard et Typescript*
>
> À mesure que nous introduisons plus de Typescript, Standard devient moins adapté et peut nuire au flux de travail si l’on applique Standard au Javascript compilé depuis Typescript.
> Il faudra évaluer d’autres options pour Typescript, par ex. Prettier + ESLint.

Voir le dépôt [template-typescript-public](https://github.com/mojaloop/template-typescript-public) pour la configuration Typescript de référence.

### YAML

Les désérialiseurs YAML peuvent varier ; règles suivantes :
> Crédit : exemples issus du [guide de style Flathub](https://github.com/flathub/flathub/wiki/YAML-Style-Guide)

- Indentation de 2 espaces
- Toujours indenter les éléments enfants

```yaml
# BON :
modules:
  - name: foo
    sources:
      - type: bar

# MAUVAIS :
modules:
- name: foo
  sources:
  - type: bar
```

- N’alignez pas les valeurs sur des colonnes

```yaml
# MAUVAIS :
id:           org.example.Foo
modules:
  - name:     foo
    sources:
      - type: git
```

### sh + bash

- Le shebang doit respecter l’environnement local de l’utilisateur :

```bash
#!/usr/bin/env bash
```

Le script utilisera le `bash` défini dans l’environnement plutôt qu’un chemin codé en dur.

- Pour référencer d’autres fichiers, évitez les chemins relatifs simples :

L’exécution depuis un autre répertoire que celui du script casserait souvent le script.

```bash
# MAUVAIS :
cat ../Dockerfile | wc -l

# BON :
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cat ${DIR}/../Dockerfile | wc -l
```

Autres bonnes pratiques bash : [Best Practices for Writing Shell Scripts](https://kvz.io/bash-best-practices.html)

## Documentation

- Rédiger la documentation en Markdown.
- Les schémas dessinés à la main : SVG éditable (architecture / composants / blocs / états), exportés depuis [diagrams.net](https://app.diagrams.net)
  > NOTE : intégrez le diagramme éditable lors de l’export SVG depuis [diagrams.net](https://app.diagrams.net) !
- Diagrammes de séquence : PlantUML
- Documents de discussion : `/community/archive/discussion-docs`
- Éviter Google Docs et outils privés pour la collaboration à l’échelle de la communauté

## Structure de répertoires

Outre le style de code, la communauté recommande la structure suivante pour que les développeurs passent facilement d’un projet à l’autre et pour porter outils et configs (`.circleci/config.yml`, `Dockerfile`, etc.) avec peu de changements.

Structure attendue :

```bash
├── README.md          # Infos générales : prérequis, tests, etc.
├── LICENSE.md         # Descripteur de licence Mojaloop standard.
├── package.json       # Descripteur npm du projet.
├── package-lock.json  # Arbre de dépendances exact dans le temps.
├── nvmrc.json         # NVMRC : runtime NodeJS (de préférence Active LTS).
├── .ncurc.yaml        # Ignore pour le script dep:check (npm-check-updates).
├── Dockerfile         # Optionnel
├── docker-compose.yml # Optionnel (dépendances backend, etc.)
├── .npmignore         # Optionnel — publication des bibliothèques npm.
├── .gitignore         # Fichier ignore GitHub.
├── src                # Sources du projet.
│   ├── index.<js/ts>    # Point d’entrée principal.
│   ├── <filename>.<js/ts> # Convention des fichiers sources.
│   └── ...
├── dist               # Javascript compilé (voir tsconfig).
├── test               # Tests, au minimum :
│   ├── unit           # Tests unitaires, structure alignée sur `./src`.
│   │   ├── <filename>.test.<js/ts>
│   │   └── ...
│   ├── integration    # Tests d’intégration.
│   ├── functional     # Tests fonctionnels.
│   └── util           # Scripts et helpers de test.
└── config
    └── default.json   # Configuration par défaut.
```

## Fichiers de configuration

Ces fichiers renforcent les styles de code ci-dessus :

### EditorConfig

> EditorConfig est pris en charge nativement dans de nombreux IDE. Voir le [guide EditorConfig](https://editorconfig.org/).

`.editorconfig`

```ini
root = true

[*]
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
charset = utf-8

[{*.js,*.ts,package.json,*.yml,*.cjson}]
indent_style = space
indent_size = 2

[*.md]
trim_trailing_whitespace = false
```

### NYC (couverture de code)

`.nycrc.yml`

```yml
temp-directory: "./.nyc_output"
check-coverage: true
per-file: true
lines: 90
statements: 90
functions: 90
branches: 90
all: true
include: [
  "src/**/*.js"
]
reporter: [
  "lcov",
  "text-summary"
]
exclude: [
  "**/node_modules/**",
  '**/migrations/**'
]
```

### Typescript

`.tsconfig.json`

```json
{
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules",
    "**/*.spec.ts",
    "test",
    "lib",
    "coverage"
  ],
  "compilerOptions": {
    "target": "es2018",
    "module": "commonjs",
    "lib": [
      "esnext"
    ],
    "importHelpers": true,
    "declaration": true,
    "sourceMap": true,
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "moduleResolution": "node",
    "baseUrl": "./",
    "paths": {
      "*": [
        "src/*",
        "node_modules/*"
      ]
    },
    "esModuleInterop": true
  }
}
```

`.eslintrc.js`

```js
module.exports = {
  parser: '@typescript-eslint/parser',  // Specifies the ESLint parser
  extends: [
    'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    // Enforces ES6+ import/export syntax
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parserOptions: {
    ecmaVersion: 2018,  // Allows for the parsing of modern ECMAScript features
    sourceType: 'module',  // Allows for the use of imports
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off'
  },
  overrides: [
    {
      // Disable some rules that we abuse in unit tests.
      files: ['test/**/*.ts'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
};
```

Configuration Typescript détaillée (`package.json`, `jest.config.js`, etc.) : [Typescript Template Project](https://github.com/mojaloop/template-typescript-public).

## Gestion des dépendances

### Mises à jour des dépendances

Il est important d’utiliser les dépendances à jour pour limiter les problèmes de sécurité.

#### NodeJS

Installez [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) :

```bash
npm install -D npm-check-updates
```

Ajoutez dans `package.json` :

```json
"scripts": {
    "dep:check": "npx ncu -e 2",
    "dep:update": "npx ncu -u"
}
```

Pour vérifier les mises à jour :

```bash
npm run dep:check
```

Pour installer les dernières versions :

```bash
npm run dep:update && npm i
```

Si une dépendance ne peut pas être mise à jour pour une raison valide, ajoutez `.ncurc.yaml` à la racine avec la dépendance dans `reject` et un `comment` :

```yaml
## TODO : raison pour chaque rejet et comment le traiter (story, etc.).
reject: [
  # TODO: <Insert detailed information as to why this dependency should be ignored.>
  "<DEPENDENCY_TO_IGNORE>",
]
```

Moyens pour maintenir les dépendances à jour :

##### Hook Git pre-commit

Validation locale à chaque commit Git.

Ajoutez `dep:check` comme hook pre-commit avec [Husky](https://www.npmjs.com/package/husky) :

```bash
npx husky add .husky/pre-commit "npm run dep:check"
```

> On peut contourner avec `git commit -nm <message>`. Un job CI `test-dependencies` (section suivante) est donc nécessaire.

##### Validations CI automatisées

Contrôles lors des revues et releases ; évite le contournement du hook.

Les configs CI (`.circleci/config.yml`) doivent inclure un job `test-dependencies` (`npm run dep:check`) pour les PR, fusions vers la branche principale et releases étiquetées.

### Audit des dépendances

#### NodeJS

Installez [audit-ci](https://www.npmjs.com/package/audit-ci) :

```bash
npm install -D audit-ci
```

Ajoutez dans `package.json` :

```json
"scripts": {
    "audit:check": "npx audit-ci --config ./audit-ci.jsonc"
}
```

Pour vérifier les mises à jour :

```bash
npm run audit:check
```

Correctifs connus via [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit) :

```bash
npm audit fix --package-lock-only
```

>
> NOTES
>
> 1. Commitez les correctifs appliqués au `package-lock.json`.
> 2. Relancez les tests : un changement de version peut introduire des ruptures.
>

Sans correctif, ajoutez `audit-ci.jsonc` à la racine avec l’ID d’avis dans `allowlist` et un commentaire :

```json
{
  "$schema": "https://github.com/IBM/audit-ci/raw/main/docs/schema.json",
  // audit-ci supports reading JSON, JSONC, and JSON5 config files.
  // Only use one of ["low": true, "moderate": true, "high": true, "critical": true]
  "moderate": true,
  "allowlist": [ // NOTE: Please add as much information as possible to any items added to the allowList
    // Currently no fixes available for the following advisory ID
    "<VULNERABILITY_ADVISORY_ID>"
  ]
}
```

##### Hook Git pre-commit

Exécute les contrôles de vulnérabilités localement à chaque commit.

Ajoutez `audit:check` avec [Husky](https://www.npmjs.com/package/husky) :

```bash
npx husky add .husky/pre-commit "npm run audit:check"
```

> Contournement possible avec `git commit -nm`. Un job CI `vulnerability-check` (section suivante) est requis.

##### Validations CI automatisées

Audits lors des revues et releases ; évite le contournement du hook.

Les configs CI (`.circleci/config.yml`) doivent inclure un job `vulnerability-check` (`npm run audit:check`) pour les PR, fusions vers la branche principale et releases étiquetées.

## Lignes directrices de conception et d’implémentation

Recommandations pour le code au sein de la communauté Mojaloop (ou le code qui y sera intégré). Si vous souhaitez donner du code à la communauté, suivez ces lignes directrices autant que possible pour la cohérence et la maintenabilité. Les contributions alignées seront intégrées plus facilement.

Voir la FAQ [ci-dessous](#faqs).

## Outils et frameworks

La communauté OSS Mojaloop privilégie les outils et frameworks suivants :

- **Serveur web :** [`HapiJS`](https://github.com/hapijs/hapi)
- **Framework UI web :** [`ReactJS`](https://reactjs.org/)
- **Configuration d’exécution :** [`convict`](https://www.npmjs.com/package/convict), avec [`rc`](https://www.npmjs.com/package/rc) pour l’existant. (variables d’environnement et fichiers de config)
- **Gestion des paquets :** `npm`
- **Journalisation :** bibliothèque [`@mojaloop/central-services-logger`](https://github.com/mojaloop/central-services-logger#readme), basée sur Winston
- **Conteneurs et orchestration :** [`docker`](https://www.docker.com/) et [`kubernetes`](https://kubernetes.io/)
- **Tests unitaires :** pour l’existant, [`Tape`](https://github.com/substack/tape) ; les nouvelles bases passent progressivement à [`Jest`](https://jestjs.io/).
- **Couverture de tests :** [`nyc`](https://github.com/istanbuljs/nyc)
- **CI :** [`CircleCI`](https://circleci.com/)

Ces outils maintiennent cohérence et maintenabilité sur la base de code. Nous n’imposons pas leur usage aux dépôts fournis en contribution, mais d’autres choix peuvent alourdir la maintenance pour la communauté.

## Adopter des contributions open source dans Mojaloop

Lignes directrices pour l’adoption d’une contribution dans les dépôts open source Mojaloop. L’adoption est le processus par lequel la communauté accompagne un contributeur pour aligner sa contribution sur nos normes afin qu’elle rejoigne la base de code OSS Mojaloop.

>*Note :* les contributions sont évaluées **au cas par cas**. Celles qui ne respectent pas ces lignes directrices passent par la phase d’incubation ci-dessous. D’autres écarts (p. ex. choix de framework) peuvent figurer sur une feuille de route pour standardisation ultérieure.

### Étape 0 : prérequis

Avant qu’une contribution soit considérée pour adoption :

1. Elle doit être alignée avec les [principes du Level One Project](https://leveloneproject.org/).
1. Elle doit respecter le guide de style et les lignes directrices de conception et d’implémentation ci-dessus.
1. Elle doit inclure de la documentation de démarrage : plus il y en a, mieux c’est.
1. Elle doit inclure des tests avec une bonne couverture. Au minimum des tests unitaires ; une suite unitaire, d’intégration et fonctionnelle est préférée. Voir le [guide des contributeurs](../tools/automated-testing.md).

### Étape 1 : incubation

1. Créer un dépôt privé dans l’organisation GitHub Mojaloop pour le code adopté.
1. Faire examiner par une sous-équipe de la DA pour vérifier la portabilité (vers l’OSS), l’alignement avec les principes L1P, etc., et la conformité de la conception aux normes.
1. Vérifier les licences de la contribution et des nouvelles dépendances ; ajouter la licence Mojaloop standard avec attribution aux donateur(s)/contributeur(s).
1. Évaluer l’état du code : documentation, tests, qualité ; combler les lacunes.
1. Évaluer l’impact sur les performances.
1. Créer des actions (stories) pour renommer, retirer ou anonymiser tout élément non générique.
1. Examiner et discuter les choix de frameworks et d’outils.

- En cas de décision de changement, les ajouter à la feuille de route.

### Étape 2 : adoption publique

1. Rendre le projet public sur GitHub Mojaloop.
1. Annoncer sur le canal Slack [`#announcements`](https://mojaloop.slack.com/archives/CG3MAJZ5J).
1. Activer les pipelines CI/CD et publier les artefacts pertinents (images Docker, modules npm, etc.).
1. Examiner et recommander un module ou une formation pour le programme de formation Mojaloop si pertinent.

## Versionnement

Voir [versionnement](./versioning.md) pour Mojaloop.

## Créer de nouvelles fonctionnalités

Processus pour les [fonctionnalités et branches](./creating-new-features.md) dans Mojaloop.

## Processus de pull request

Pour les changements importants, demandez conseil sur [Slack](https://mojaloop.slack.com). Les PR doivent décrire le changement et sa motivation. Vous pouvez utiliser les brouillons de PR GitHub pour recueillir commentaires et revue.

Les PR qui violent les [principes Level One](https://leveloneproject.org/wp-content/uploads/2016/03/L1P_Level-One-Principles-and-Perspective.pdf) seront refusées.

## Code de conduite

Nous appliquons le [code de conduite de la Fondation Mojaloop](https://github.com/mojaloop/mojaloop/blob/master/CODE_OF_CONDUCT.md).

## Licence

Voir la politique [License](https://github.com/mojaloop/mojaloop/blob/master/contribute/License.md).

## FAQ

**1. Je veux contribuer du code qui ne suit pas le style ou les outils recommandés dans ce guide.**

  Les contributions sont acceptées *au cas par cas*. Si la contribution n’est pas prête pour une adoption complète, nous pouvons passer par la phase d’incubation : refactoring avec notre aide pour aligner code et documentation.

**2. Ces normes sont dépassées et un outil (ou framework, méthode, langage) plus récent résoudrait le problème *x*. Comment mettre à jour les normes ?**

  La qualité du code évolue constamment ; nous restons ouverts aux outils qui améliorent la base OSS Mojaloop. Écrivez-nous sur le canal Slack design authority (`#design-authority`) avec votre recommandation.

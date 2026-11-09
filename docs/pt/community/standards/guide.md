---
i18n_source_sha: 035d61b2307785d4129863069cfab714e69addec
---

# Normas

> *Nota:* Estas normas não são, de forma alguma, imutáveis e, enquanto comunidade, queremos estar sempre a iterar e a melhorar o Mojaloop. Para propor uma alteração a estas normas, ou sugerir novas melhorias, contacte o canal da Design Authority no Slack do Mojaloop (#design-authority)

## Invariantes do Mojaloop

O Mojaloop tem algumas [invariantes](./invariants.md) que é importante compreender e cumprir ao contribuir para a base de código.

Estas invariantes derivam dos [Princípios do Level One](https://www.leveloneproject.org/wp-content/uploads/2020/07/L1P_Guide_2019_Final.pdf) e de outros requisitos de negócio decididos pelo Technical Governance Board do Mojaloop, pelo API Change Control Board, pela Design Authority e pelo Product Council. Destinam-se a garantir que a plataforma mantém determinadas características importantes para um funcionamento de nível de infraestrutura nacional.

Certifique-se de que conhece as invariantes antes de contribuir para a base de código.

## Ambiente de execução

As seguintes normas de execução aplicam-se ao Mojaloop.

### Microsserviços e bibliotecas

1. Javascript

    O NodeJS é o ambiente de execução padrão de todos os serviços e componentes do Mojaloop para a execução de ficheiros de código-fonte Javascript.

    O nosso objetivo é garantir que todos os serviços baseados em NodeJS são executados com a versão `Active LTS` (*Long Time Support*) mais recente do NodeJS, seguindo o [ciclo oficial de versões do NodeJS](https://nodejs.org/en/about/releases/).

2. Sistema operativo do contentor (Docker) (*OS*)

    Os microsserviços do Mojaloop são construídos sobre a imagem base `node:<NODE_ACTIVE_LTS_VERSION>-alpine`, em que `NODE_ACTIVE_LTS_VERSION` é a LTS atual do NodeJS, seguindo o [ciclo oficial de versões do NodeJS](https://nodejs.org/en/about/releases/). Consulte o [DockerHub](https://hub.docker.com/_/node?tab=tags&page=1&name=alpine) para uma lista completa das imagens Docker oficiais do NodeJS Alpine.

    > NOTA: Ao especificar a `NODE_ACTIVE_LTS_VERSION`, utilize a versão semântica completa, como `<MAJOR>-<MINOR>-<PATCH>`.
    >
    > `node:16.15.0-alpine ` <-- Isto está OK
    >
    > `lts-alpine3.16` <-- Isto NÃO está OK
    >

    1. Exemplo padrão de `Dockerfile` para **Javascript**:

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

    2. Exemplo padrão de `Dockerfile` para **Typescript**:

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

### Pipelines de CI (*Continuous Integration*)

Os jobs de CI do Mojaloop são executados com a versão LTS atual do Ubuntu, seguindo o [ciclo oficial de versões do Ubuntu](https://ubuntu.com/about/release-cycle).

### Kubernetes

O deployment dos Helm Charts do Mojaloop ([mojaloop/helm](https://github.com/mojaloop/helm) [mojaloop/charts](https://github.com/mojaloop/charts)) é feito e verificado com a versão LTS atual do Kubernetes, seguindo o [ciclo oficial de versões do Kubernetes](https://kubernetes.io/releases/).

## Guia de estilo

A Comunidade Mojaloop disponibiliza um conjunto de orientações para o estilo do código que escrevemos. Estas normas ajudam a garantir que a base de código do Mojaloop se mantém de elevada qualidade, manutenível e consistente.

Estes guias de estilo foram escolhidos porque podem ser facilmente aplicados e verificados com ferramentas populares, com personalização mínima. Embora reconheçamos que os programadores terão preferências pessoais que podem entrar em conflito com estas orientações, preferimos a consistência a [discussões triviais](https://en.wikipedia.org/wiki/Law_of_triviality) sobre estas regras.

O objetivo destes guias é garantir um fluxo de trabalho fácil para os programadores e reduzir os commits de código que contêm alterações de estilo em detrimento do conteúdo. Ao reduzir o ruído nos diffs, facilitamos o trabalho dos revisores.

## Estilo de código

### Convenções de nomenclatura

Para evitar confusão e garantir a interpolação entre linguagens, siga estas regras quanto às convenções de nomenclatura:

- Não utilize abreviaturas nem contrações como partes dos nomes dos identificadores. Por exemplo, utilize `SettlementWindow` em vez de `SetWin`.
- Não utilize acrónimos que não sejam geralmente aceites no domínio da informática.
- Quando for adequado, utilize acrónimos bem conhecidos para substituir nomes longos. Por exemplo, utilize `UI` para `User Interface`.
- Utilize Pascal case ou camel case para nomes com mais de dois caracteres, consoante o contexto (por exemplo, nomes de classes face a nomes de variáveis). Por exemplo, utilize `SettlementWindow` (Classe) ou `settlementWindow` (Variável).
- Deveria escrever em maiúsculas as abreviaturas que consistem em apenas dois caracteres, como `ID` em vez de `Id` quando isoladas. Por exemplo, utilize `/transfer/{{ID}}` em vez de `/transfer/{{Id}}` ao representar `ID` como parâmetro de URI.
- Evite abreviaturas nos identificadores ou nos nomes dos parâmetros. Se tiver de utilizar abreviaturas, utilize camel case para as abreviaturas que consistem em mais de dois caracteres, mesmo que isso contrarie a abreviatura padrão da palavra.
- Utilize Snake case em maiúsculas (screaming) para as enumerações. Por exemplo, utilize `RECORD_FUNDS_OUT_PREPARE_RESERVE`.

Ref.: [Microsoft - Design Guidelines for Class Library Developers](https://docs.microsoft.com/en-us/previous-versions/dotnet/netframework-1.1/141e06ef(v=vs.71)?redirectedfrom=MSDN)

### Javascript

O Mojaloop utiliza o estilo de código Javascript ditado pelo [StandardJS](https://standardjs.com/). Para o conjunto completo de regras, consulte as [regras do Standard](https://standardjs.com/rules.html), mas, como breve conjunto de destaques:

- Utilize *2 espaços* para a indentação

```js
function helloWorld (name) {
  console.log('hi', name)
}
```

- Utilize *plicas* para as strings, exceto para evitar escapes.

```js
console.log('hello there')    // ✓ ok
console.log("hello there")    // ✗ avoid
console.log(`hello there`)    // ✗ avoid
```

- Sem ponto e vírgula. (ver: 1, 2, 3)

```js
window.alert('hi')   // ✓ ok
window.alert('hi');  // ✗ avoid
```

### Typescript

> *Nota: Standard e Typescript*
>
> À medida que começamos a introduzir mais Typescript na base de código, o Standard torna-se menos útil e pode até ser prejudicial
> para o nosso fluxo de trabalho de desenvolvimento se tentarmos executar o standard sobre o Javascript compilado a partir de Typescript.
> Precisamos de avaliar outras opções para o Standard em Typescript, como uma combinação de Prettier + ESLint.

Consulte o [template-typescript-public](https://github.com/mojaloop/template-typescript-public) para a configuração padrão de typescript.

### YAML

Embora os desserializadores de YAML possam variar entre si, seguimos as regras seguintes ao escrever YAML:
> Crédito: estes exemplos foram retirados do [guia de estilo do flathub](https://github.com/flathub/flathub/wiki/YAML-Style-Guide)

- Indentações de 2 espaços
- Indentar sempre os elementos filhos

```yaml
# GOOD:
modules:
  - name: foo
    sources:
      - type: bar

# BAD:
modules:
- name: foo
  sources:
  - type: bar
```

- Não alinhar os valores

```yaml
# BAD:
id:           org.example.Foo
modules:
  - name:     foo
    sources:
      - type: git
```

### sh + bash

- O Shebang deveria respeitar o ambiente local do utilizador:

```bash
#!/usr/bin/env bash
```

Isto garante que o script corresponderá ao `bash` definido no ambiente do utilizador, em vez de ficar fixo num bash específico em `/usr/bin/bash`.

- Ao referir outros ficheiros, não utilize caminhos relativos:

Isto acontece porque o script provavelmente deixará de funcionar se alguém o executar a partir de um diretório diferente daquele onde o script se encontra

```bash
# BAD:
cat ../Dockerfile | wc -l

# GOOD:
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cat ${DIR}/../Dockerfile | wc -l
```

Para outras convenções recomendadas de bash, consulte esta publicação de blogue: [Best Practices for Writing Shell Scripts](https://kvz.io/bash-best-practices.html)

## Documentação

- A documentação deveria ser escrita em formato Markdown.
- Os diagramas desenhados à mão deveriam utilizar um formato SVG editável (exemplo - diagramas de arquitetura / componentes / blocos / transição de estados) exportado a partir do [diagrams.net](https://app.diagrams.net)
  > NOTA: Certifique-se de que incorporou o diagrama editável ao exportar o SVG a partir do [diagrams.net](https://app.diagrams.net)!
- Os diagramas de sequência deveriam utilizar PlantUML
- Todos os documentos de discussão deveriam ser colocados em /community/archive/discussion-docs.
- A utilização do Google Docs e de outras ferramentas privadas não é aconselhada para a colaboração em toda a comunidade

## Estrutura de diretórios

Além das orientações para os estilos de código, a Comunidade Mojaloop recomenda a seguinte estrutura de diretórios. Isto garante que os programadores podem mudar facilmente de um projeto para outro e garante também que as nossas ferramentas e configurações (como o `.circleci/config.yml` e os `Dockerfile`) podem ser portadas facilmente de um projeto para outro com pequenas alterações.

O guia da estrutura de diretórios exige:

```bash
├── README.md          # README containing general information about components such as pre-requisites, testing, etc.
├── LICENSE.md         # Standard Mojaloop License descriptor.
├── package.json       # Project package descriptor.
├── package-lock.json  # Project package descriptor describing an exact dependency tree in time.
├── nvmrc.json         # NVMRC containing NodeJS runtime. This should preferably reflect the current NodeJS Active LTS version.
├── .ncurc.yaml        # Ignore file for dep:check script (npm-check-updates).
├── Dockerfile         # Optional - Dockerfile descriptor.
├── docker-compose.yml # Optional - Docker Compose descriptor, inc containing backend dependencies.
├── .npmignore         # Optional - NPM ignore file for publishing libraries.
├── .gitignore         # Github ignore file.
├── src                # Directory containing project source files.
│   ├── index.<js/ts>    # Main entry point for component.
│   ├── <filename>.<js/ts> # Source file format.
│   └── ...            # Other source files and sub-directories
├── dist               # Directory containing compiled javascript files (see tsconfig below).
├── test               # Directory for tests, containing at least:
│   ├── unit           # Unit tests, matching the directory structure in `./src`.
│   │   ├── <filename>.test.<js/ts> # Tests file format.
│   │   └── ...        # Other test files and sub-directories
│   ├── integration    # Integration tests, matching the directory structure in `./src`.
│   ├── functional     # Functional tests, matching the directory structure in `./src`.
│   └── util           # Generic testing scripts and NodeJS helpers.
└── config
    └── default.json   # Default config file.
```

## Ficheiros de configuração

Os ficheiros de configuração seguintes ajudam a aplicar os estilos de código descritos acima:

### EditorConfig

> O EditorConfig é suportado de origem em muitos IDE e editores de texto. Para mais informação, consulte o [guia do EditorConfig](https://editorconfig.org/).

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

### NYC (ferramenta de cobertura de código)

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

Para uma lista mais detalhada da configuração de typescript recomendada, incluindo `package.json`, `jest.config.js` e mais, consulte o [Typescript Template Project](https://github.com/mojaloop/template-typescript-public).

## Gestão de dependências

### Atualizações de dependências

É importante garantir que são utilizadas as dependências mais recentes, de forma a mitigar problemas de segurança.

#### NodeJS

Os projetos NodeJS deveriam instalar o [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) utilizando o comando seguinte:

```bash
npm install -D npm-check-updates
```

E acrescentar os seguintes scripts ao `package.json`:

```json
"scripts": {
    "dep:check": "npx ncu -e 2",
    "dep:update": "npx ncu -u"
}
```

Execute o script seguinte para verificar se existem dependências que precisam de ser atualizadas:

```bash
npm run dep:check
```

Se necessário, é possível executar o comando seguinte para instalar as dependências mais recentes:

```bash
npm run dep:update && npm i
```

Se uma dependência não puder ser atualizada por um motivo válido, deveria ser acrescentado um ficheiro `.ncurc.yaml` à raiz do projeto, com a referida dependência adicionada à lista `reject` e com um `comment` adequado, da seguinte forma:

```yaml
## Add a TODO comment indicating the reason for each rejected dependency upgrade added to this list, and what should be done to resolve it (i.e. handle it through a story, etc).
reject: [
  # TODO: <Insert detailed information as to why this dependency should be ignored.>
  "<DEPENDENCY_TO_IGNORE>",
]
```

São utilizadas as abordagens seguintes para assegurar que as dependências são mantidas atualizadas:

##### Git pre-commit hook

Isto garante que é feita uma verificação de validação na máquina local do programador ao fazer quaisquer commits de Git.

O `dep:check` deveria ser adicionado como pre-hook de commit de git, utilizando o [Husky](https://www.npmjs.com/package/husky), da seguinte forma:

```bash
npx husky add .husky/pre-commit "npm run dep:check"
```

> Nota: É possível contornar isto utilizando o parâmetro `-n` ao fazer o commit com `git commit -nm <message>`. É, por isso, necessária uma verificação de validação `test-dependencies` de CI (*Continuous Integration*) (*ver a secção seguinte*) para assegurar o cumprimento.

##### Validações automatizadas de CI

Isto garante que é feita uma verificação de validação durante as revisões e as disponibilizações de versões e garante também que o git pre-commit hook não é contornado.

As configurações de CI (ou seja, o `.circleci/config.yml`)  têm de conter um job de CI de verificação de validação `test-dependencies` (ou seja, `npm run dep:check`) para todos os Pull-Request, merges para o branch Main e versões com tag.

### Auditoria de dependências

#### NodeJS

Os projetos NodeJS deveriam instalar o [audit-ci](https://www.npmjs.com/package/audit-ci) utilizando o comando seguinte:

```bash
npm install -D audit-ci
```

E acrescentar os seguintes scripts ao `package.json`:

```json
"scripts": {
    "audit:check": "npx audit-ci --config ./audit-ci.jsonc"
}
```

Execute o script seguinte para verificar se existem dependências que precisam de ser atualizadas:

```bash
npm run audit:check
```

Se necessário, é possível executar o [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit) para aplicar quaisquer correções conhecidas disponíveis:

```bash
npm audit fix --package-lock-only
```

>
> NOTAS
>
> 1. Certifique-se de que faz commit ao `package-lock.json` de quaisquer correções aplicadas pelo comando acima.
> 2. Certifique-se de que todos os testes passam depois de aplicar quaisquer correções, pois podem resultar numa alteração de versão de uma dependência que poderia introduzir alterações incompatíveis.
>

Se não existir correção, deveria ser acrescentado um ficheiro `audit-ci.jsonc` à raiz do projeto, com o referido `vulnerability advisories ID` adicionado à `allowlist` e com um `comment` adequado, da seguinte forma:

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

##### Git pre-commit hook

Isto garante que são feitas verificações de vulnerabilidades na máquina local do programador ao fazer quaisquer commits de Git.

O `audit:check` deveria ser adicionado como pre-hook de commit de git, utilizando o [Husky](https://www.npmjs.com/package/husky), da seguinte forma:

```bash
npx husky add .husky/pre-commit "npm run audit:check"
```

> Nota: É possível contornar isto utilizando o parâmetro `-n` ao fazer o commit com `git commit -nm <message>`. É, por isso, necessária uma verificação de vulnerabilidades `vulnerability-check` de CI (*Continuous Integration*) (*ver a secção seguinte*) para assegurar o cumprimento.

##### Validações automatizadas de CI

Isto garante que são feitas verificações de auditoria durante as revisões e as disponibilizações de versões e garante também que o git pre-commit hook não é contornado.

As configurações de CI (ou seja, o `.circleci/config.yml`)  têm de conter um job de CI de verificação de vulnerabilidades `vulnerability-check` (ou seja, `npm run dep:check`) para todos os Pull-Request, merges para o branch Main e versões com tag.

## Orientações de design e implementação

Estas orientações são recomendações para escrever código na comunidade Mojaloop (ou código que será adotado pela comunidade). Quem escreve código que pretende doar à comunidade deve seguir estas orientações tanto quanto possível, para ajudar na consistência e na manutenibilidade da base de código. As doações que cumprem estas orientações serão adotadas mais fácil e rapidamente.

Para mais informação, consulte as FAQ [abaixo](#faqs).

## Ferramentas e frameworks

Na Comunidade OSS do Mojaloop, preferimos as seguintes ferramentas e frameworks:

- **Servidor web:** [`HapiJS`](https://github.com/hapijs/hapi)
- **Framework de UI web:** [`ReactJS`](https://reactjs.org/)
- **Configuração de execução:** [`convict`](https://www.npmjs.com/package/convict), com [`rc`](https://www.npmjs.com/package/rc) para o legado. (tanto para variáveis de ambiente como para ficheiros de configuração)
- **Gestão de pacotes:** `npm`
- **Registo de eventos:** biblioteca [`@mojaloop/central-services-logger`](https://github.com/mojaloop/central-services-logger#readme), construída sobre o Winston
- **Contentores e orquestração:** [`docker`](https://www.docker.com/) e [`kubernetes`](https://kubernetes.io/)
- **Testes unitários:** para os testes existentes, [`Tape`](https://github.com/substack/tape), mas estamos atualmente a passar para [`Jest`](https://jestjs.io/) nas bases de código novas.
- **Cobertura de testes:** [`nyc`](https://github.com/istanbuljs/nyc)
- **CI:** [`CircleCI`](https://circleci.com/)

Ao utilizar estas ferramentas e frameworks, mantemos um elevado nível de consistência e de manutenibilidade em toda a base de código, o que mantém os nossos programadores produtivos e satisfeitos. Embora não imponhamos que as bases de código doadas utilizem estas mesmas ferramentas e frameworks, gostaríamos de sublinhar que as adoções que utilizam ferramentas diferentes podem criar uma carga de manutenção indevida para a Comunidade.

## Adoção de contribuições de código aberto no Mojaloop

Esta secção fornece orientações sobre a adoção de uma contribuição nos repositórios Mojaloop Open Source. A adoção é o processo em que nós, enquanto comunidade, trabalhamos com um contribuidor para alinhar uma contribuição com as nossas normas e orientações, de modo a que faça parte da base de código OSS do Mojaloop.

>*Nota:* As contribuições de código são avaliadas **caso a caso**. As contribuições que não estejam alinhadas com estas orientações terão de passar pela fase de incubação descrita abaixo. Outros desalinhamentos face a estas normas (por exemplo, escolhas de frameworks) podem ser acrescentados a um roadmap para melhoria e normalização OSS futuras.

### Passo 0: Pré-requisitos

Antes de uma contribuição ser considerada para adoção, esta:

1. Deveria estar em linha com os [Princípios do Level One Project](https://leveloneproject.org/).
1. Deveria cumprir os guias de estilo e de design e implementação acima.
1. Deveria conter documentação para começar: quanto mais, melhor.
1. Conter testes com um elevado nível de cobertura. No mínimo, uma contribuição deveria conter testes unitários, mas é preferível um conjunto de testes com testes unitários, de integração e funcionais. Consulte o [guia de contribuidores](./tools-and-technologies/automated-testing) para mais informação.

### Passo 1: Incubação

1. Criar um repositório privado na organização Mojaloop do GitHub para o código adotado.
1. Ter uma subequipa da DA a analisá-lo para garantir que é portável \(para OSS\) - que está alinhado com os princípios L1P, etc., e garantir que o design está em linha com as normas.
1. Verificar o licenciamento da contribuição e de quaisquer novas dependências de que necessite, e acrescentar a licença padrão do Mojaloop com atribuição ao doador/contribuidores.
1. Avaliar o estado atual da base de código, incluindo documentação, testes e qualidade do código, e resolver quaisquer lacunas.
1. Avaliar o impacto no desempenho.
1. Criar itens de ação \(stories\) para atualizar a nomenclatura e remover/sanear quaisquer itens que não sejam genéricos
1. Inspecionar e discutir quaisquer escolhas de frameworks e de ferramentas.

- Se for tomada a decisão de fazer quaisquer alterações, acrescentá-las ao roadmap.

### Passo 2: Adoção pública

1. Tornar o projeto público no GitHub do Mojaloop.
1. Anunciar no canal [`#announcements`](https://mojaloop.slack.com/archives/CG3MAJZ5J) do slack.
1. Ativar os pipelines de CI/CD e publicar quaisquer artefactos relevantes, como imagens Docker ou módulos npm.
1. Rever e recomendar um módulo ou curso para o Programa de Formação do Mojaloop, se for necessário e relevante para esta contribuição.

## Versionamento

Consulte a informação sobre [versionamento](./versioning.md) do Mojaloop.

## Criar novas funcionalidades

Processo de criação de novas [funcionalidades e branches](./creating-new-features.md) no Mojaloop.

## Processo de pull request

É boa ideia perguntar sobre alterações importantes no [Slack](https://mojaloop.slack.com). Submeta pull requests que incluam tanto a alteração como a razão da alteração. Esteja à vontade para utilizar a funcionalidade «Draft Pull Request» do GitHub para abrir as suas alterações a comentários e a revisão por parte da comunidade.

Os pull requests serão recusados se violarem os [Princípios do Level One](https://leveloneproject.org/wp-content/uploads/2016/03/L1P_Level-One-Principles-and-Perspective.pdf).

## Código de conduta

Utilizamos o [Código de Conduta da Mojaloop Foundation](https://github.com/mojaloop/mojaloop/blob/master/CODE_OF_CONDUCT.md)

## Licenciamento

Consulte a política de [licenciamento](https://github.com/mojaloop/mojaloop/blob/master/contribute/License.md).

## FAQs

**1. E se eu quiser contribuir com código, mas este não estiver alinhado com o estilo de código e com as recomendações de frameworks/ferramentas deste guia?**

  As contribuições são aceites *caso a caso*. Se a contribuição ainda não estiver pronta para ser plenamente adotada, podemos passar pela fase de incubação descrita acima, em que o código é refatorizado com a nossa ajuda e alinhado com os requisitos de código e de documentação.

**2. Estas normas estão desatualizadas e surgiu uma ferramenta (ou framework, método ou linguagem) mais recente e mais interessante que resolverá o problema *x* para nós. Como posso atualizar as normas?**

  Escrever código funcional e de elevada qualidade é um alvo em movimento, e queremos estar sempre atentos a novas ferramentas que melhorem a base de código OSS do Mojaloop. Por isso, fale connosco no canal da design authority no slack (`#design-authority`) se tiver uma recomendação.

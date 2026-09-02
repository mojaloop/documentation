---
syncRef: af8ece4296e987223de16f4e0311366cb5e8d623
---

# Estándares

> *Nota:* estos estándares no son en absoluto inamovibles y, como comunidad, siempre queremos iterar y mejorar Mojaloop. Si quiere proponer un cambio en estos estándares o sugerir más mejoras, escriba al canal de la Design Authority en el Slack de Mojaloop (#design-authority)

## Invariantes de Mojaloop

Mojaloop tiene algunos [invariantes](./invariants.md) que es importante entender y respetar al contribuir al código base.

Estos invariantes derivan de [los principios de Level One](https://www.leveloneproject.org/wp-content/uploads/2020/07/L1P_Guide_2019_Final.pdf) y de otros requisitos de negocio decididos por el Mojaloop Technical Governance Board, el API Change Control Board, la Design Authority y el Product Council. Están pensados para asegurar que la plataforma conserve ciertas características importantes para operar a nivel de infraestructura nacional.

Asegúrese de estar familiarizado con los invariantes antes de contribuir al código base.

## Entorno de ejecución

Los siguientes estándares de ejecución se aplican a Mojaloop.

### Microservicios y bibliotecas

1. Javascript

    NodeJS es el entorno de ejecución estándar de todos los servicios y componentes de Mojaloop para ejecutar los archivos de código fuente Javascript.

    Nuestro objetivo es asegurar que todos los servicios basados en NodeJS se ejecuten con la última versión `Active LTS` (*Long Time Support*) de NodeJS, siguiendo el [ciclo oficial de versiones de NodeJS](https://nodejs.org/en/about/releases/).

2. Sistema operativo (*SO*) del contenedor (Docker)

    Los microservicios de Mojaloop se construyen sobre la imagen base `node:<NODE_ACTIVE_LTS_VERSION>-alpine`, donde `NODE_ACTIVE_LTS_VERSION` es la LTS actual de NodeJS según el [ciclo oficial de versiones de NodeJS](https://nodejs.org/en/about/releases/). Consulte [DockerHub](https://hub.docker.com/_/node?tab=tags&page=1&name=alpine) para ver la lista completa de imágenes oficiales de NodeJS Alpine para Docker.

    > NOTA: al especificar `NODE_ACTIVE_LTS_VERSION`, use la versión semántica completa, como `<MAJOR>-<MINOR>-<PATCH>`.
    >
    > `node:16.15.0-alpine ` <-- Esto está BIEN
    >
    > `lts-alpine3.16` <-- Esto NO está bien
    >

    1. Ejemplo de `Dockerfile` estándar de **Javascript**:

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

    2. Ejemplo de `Dockerfile` estándar de **Typescript**:

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

### Pipelines de CI (*integración continua*)

Los trabajos de CI de Mojaloop se ejecutan con la versión LTS actual de Ubuntu, siguiendo el [ciclo oficial de versiones de Ubuntu](https://ubuntu.com/about/release-cycle).

### Kubernetes

Los Helm Charts de Mojaloop ([mojaloop/helm](https://github.com/mojaloop/helm) [mojaloop/charts](https://github.com/mojaloop/charts)) se despliegan y se verifican con la versión LTS actual de Kubernetes, siguiendo el [ciclo oficial de versiones de Kubernetes](https://kubernetes.io/releases/).

## Guía de estilo

La comunidad de Mojaloop ofrece un conjunto de directrices sobre el estilo del código que escribimos. Estos estándares ayudan a asegurar que el código base de Mojaloop siga siendo de alta calidad, mantenible y coherente.

Estas guías de estilo se han elegido porque se pueden aplicar y comprobar fácilmente con herramientas populares y con una personalización mínima. Aunque reconocemos que los desarrolladores tendrán preferencias personales que pueden chocar con estas directrices, preferimos la coherencia antes que el [bike-shedding](https://en.wikipedia.org/wiki/Law_of_triviality) sobre estas reglas.

El objetivo de estas guías es asegurar un flujo de trabajo cómodo para el desarrollador y reducir los commits de código que contienen cambios de estilo en lugar de contenido. Al reducir el ruido en los diffs, facilitamos el trabajo de los revisores.

## Estilo de código

### Convenciones de nomenclatura

Para evitar confusiones y garantizar la interpolación entre lenguajes, siga estas reglas sobre convenciones de nomenclatura:

- No use abreviaturas ni contracciones como partes de los nombres de los identificadores. Por ejemplo, use `SettlementWindow` en lugar de `SetWin`.
- No use siglas que no estén aceptadas de forma general en el ámbito informático.
- Cuando corresponda, use siglas conocidas para sustituir nombres de frases largas. Por ejemplo, use `UI` para `User Interface`.
- Use Pascal case o camel case para los nombres de más de dos caracteres, según el contexto (p. ej. nombres de clase frente a nombres de variable). Por ejemplo, use `SettlementWindow` (clase) o `settlementWindow` (variable).
- Debería poner en mayúsculas las abreviaturas que constan de solo dos caracteres, como `ID` en lugar de `Id` cuando van aisladas. Por ejemplo, use `/transfer/{{ID}}` en lugar de `/transfer/{{Id}}` cuando represente `ID` como parámetro de un URI.
- Evite las abreviaturas en los identificadores o los nombres de parámetros. Si tiene que usar abreviaturas, use camel case para las abreviaturas que constan de más de dos caracteres, aunque esto contradiga la abreviatura estándar de la palabra.
- Use Snake case en mayúsculas (screaming) para las enumeraciones. Por ejemplo, use `RECORD_FUNDS_OUT_PREPARE_RESERVE`.

Ref.: [Microsoft - Design Guidelines for Class Library Developers](https://docs.microsoft.com/en-us/previous-versions/dotnet/netframework-1.1/141e06ef(v=vs.71)?redirectedfrom=MSDN)

### Javascript

Mojaloop usa el estilo de código Javascript que dicta [StandardJS](https://standardjs.com/). Para ver el conjunto completo de reglas, consulte las [reglas de Standard](https://standardjs.com/rules.html), pero, como resumen breve:

- Use *2 espacios* para la indentación

```js
function helloWorld (name) {
  console.log('hi', name)
}
```

- Use *comillas simples* para las cadenas, salvo para evitar escapes.

```js
console.log('hello there')    // ✓ ok
console.log("hello there")    // ✗ avoid
console.log(`hello there`)    // ✗ avoid
```

- Sin punto y coma. (véase: 1, 2, 3)

```js
window.alert('hi')   // ✓ ok
window.alert('hi');  // ✗ avoid
```

### Typescript

> *Nota: Standard y Typescript*
>
> A medida que empezamos a introducir más Typescript en el código base, Standard resulta menos útil e incluso puede ser perjudicial
> para nuestro flujo de trabajo de desarrollo si intentamos ejecutar Standard sobre el Javascript compilado a partir de Typescript.
> Tenemos que evaluar otras opciones en lugar de Standard para Typescript, como una combinación de Prettier y ESLint.

Consulte [template-typescript-public](https://github.com/mojaloop/template-typescript-public) para ver la configuración estándar de typescript.

### YAML

Aunque los deserializadores de YAML pueden variar de uno a otro, seguimos estas reglas al escribir YAML:
> Crédito: estos ejemplos se tomaron de la [guía de estilo de flathub](https://github.com/flathub/flathub/wiki/YAML-Style-Guide)

- Indentación de 2 espacios
- Indente siempre los elementos hijos

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

- No alinee los valores

```yaml
# BAD:
id:           org.example.Foo
modules:
  - name:     foo
    sources:
      - type: git
```

### sh + bash

- El shebang debería respetar el entorno local del usuario:

```bash
#!/usr/bin/env bash
```

Esto asegura que el script coincida con el `bash` definido en el entorno del usuario, en lugar de fijarlo de forma rígida a un bash concreto en `/usr/bin/bash`.

- Al referirse a otros archivos, no use rutas relativas:

Esto es porque su script probablemente se romperá si alguien lo ejecuta desde un directorio distinto de aquel donde está el script

```bash
# BAD:
cat ../Dockerfile | wc -l

# GOOD:
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cat ${DIR}/../Dockerfile | wc -l
```

Para conocer otras convenciones recomendadas de bash, consulte esta entrada de blog: [Best Practices for Writing Shell Scripts](https://kvz.io/bash-best-practices.html)

## Documentación

- La documentación debería escribirse en formato Markdown.
- Los diagramas dibujados a mano deberían usar un formato SVG editable (por ejemplo, diagramas de arquitectura, de componentes, de bloques o de transición de estados) exportado desde [diagrams.net](https://app.diagrams.net)
  > NOTA: asegúrese de haber incrustado el diagrama editable al exportar el SVG desde [diagrams.net](https://app.diagrams.net).
- Los diagramas de secuencia deberían usar PlantUML
- Todos los documentos de debate deberían colocarse en /community/archive/discussion-docs.
- No se aconseja el uso de Google Docs ni de otras herramientas privadas para la colaboración de toda la comunidad

## Estructura de directorios

Junto con las directrices de estilo de codificación, la comunidad de Mojaloop recomienda la siguiente estructura de directorios. Esto asegura que los desarrolladores puedan pasar fácilmente de un proyecto a otro, y también asegura que nuestras herramientas y configuraciones (como `.circleci/config.yml` y los `Dockerfile`) se puedan trasladar fácilmente de un proyecto a otro con cambios menores.

La guía de estructura de directorios requiere:

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
│   ├── index.<js/ts>    # Main entry point for component.
│   ├── <filename>.<js/ts> # Source file format.
│   └── ...            # Other source files and sub-directories
├── dist               # Directory containing compiled javascript files (see tsconfig below).
├── test               # Directory for tests, containing at least:
│   ├── unit           # Unit tests, matching the directory structure in `./src`.
│   │   ├── <filename>.test.<js/ts> # Tests file format.
│   │   └── ...        # Other test files and sub-directories
│   ├── integration    # Integration tests, matching the directory structure in `./src`.
│   ├── functional     # Functional tests, matching the directory structure in `./src`.
│   └── util           # Generic testing scripts and NodeJS helpers.
└── config
    └── default.json   # Default config file.
```

## Archivos de configuración

Los siguientes archivos de configuración ayudan a aplicar los estilos de código descritos arriba:

### EditorConfig

> EditorConfig tiene soporte nativo en muchos IDE y editores de texto. Para obtener más información, consulte la [guía de EditorConfig](https://editorconfig.org/).

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

### NYC (herramienta de cobertura de código)

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

Para ver una lista más detallada de la configuración recomendada de typescript, incluidos `package.json`, `jest.config.js` y más, consulte el [proyecto plantilla de Typescript](https://github.com/mojaloop/template-typescript-public).

## Gestión de dependencias

### Actualizaciones de dependencias

Es importante asegurar que se usen las últimas dependencias para mitigar los problemas de seguridad.

#### NodeJS

Los proyectos de NodeJS deberían instalar [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) con el siguiente comando:

```bash
npm install -D npm-check-updates
```

Y agregar los siguientes scripts a `package.json`:

```json
"scripts": {
    "dep:check": "npx ncu -e 2",
    "dep:update": "npx ncu -u"
}
```

Ejecute el siguiente script para comprobar si hay dependencias que necesiten actualizarse:

```bash
npm run dep:check
```

Si hace falta, se puede ejecutar el siguiente comando para instalar las últimas dependencias:

```bash
npm run dep:update && npm i
```

Si una dependencia no se puede actualizar por un motivo válido, entonces debería agregarse un archivo `.ncurc.yaml` a la raíz del proyecto, con esa dependencia agregada a la lista `reject` y con un `comment` apropiado, así:

```yaml
## Add a TODO comment indicating the reason for each rejected dependency upgrade added to this list, and what should be done to resolve it (i.e. handle it through a story, etc).
reject: [
  # TODO: <Insert detailed information as to why this dependency should be ignored.>
  "<DEPENDENCY_TO_IGNORE>",
]
```

Se usan los siguientes enfoques para exigir que las dependencias se mantengan actualizadas:

##### Hook pre-commit de Git

Esto asegurará que se haga una comprobación de validación en la máquina local del desarrollador al hacer cualquier commit de Git.

El `dep:check` debería agregarse como pre-hook de commit de git usando [Husky](https://www.npmjs.com/package/husky), así:

```bash
npx husky add .husky/pre-commit "npm run dep:check"
```

> Nota: esto se puede eludir usando el parámetro `-n` al hacer el commit con `git commit -nm <message>`. Por eso hace falta una comprobación de validación `test-dependencies` de CI (*integración continua*) (*véase la sección siguiente*) para asegurar su cumplimiento.

##### Validaciones automatizadas de CI

Esto asegurará que se haga una comprobación de validación durante las revisiones y las publicaciones de versiones, y también que no se eluda el hook pre-commit de Git.

Las configuraciones de CI (es decir, `.circleci/config.yml`)  deben contener un trabajo de CI de comprobación de validación `test-dependencies` (es decir, `npm run dep:check`) para todos los pull requests, los merges a la rama main y las versiones etiquetadas.

### Auditoría de dependencias

#### NodeJS

Los proyectos de NodeJS deberían instalar [audit-ci](https://www.npmjs.com/package/audit-ci) con el siguiente comando:

```bash
npm install -D audit-ci
```

Y agregar los siguientes scripts a `package.json`:

```json
"scripts": {
    "audit:check": "npx audit-ci --config ./audit-ci.jsonc"
}
```

Ejecute el siguiente script para comprobar si hay dependencias que necesiten actualizarse:

```bash
npm run audit:check
```

Si hace falta, se puede ejecutar [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit) para aplicar las correcciones conocidas que estén disponibles:

```bash
npm audit fix --package-lock-only
```

>
> NOTAS
>
> 1. Asegúrese de hacer commit en `package-lock.json` de cualquier corrección que aplique el comando anterior.
> 2. Asegúrese de que todas las pruebas pasan después de aplicar cualquier corrección, ya que pueden dar lugar a un cambio de versión de una dependencia que podría introducir cambios incompatibles.
>

Si no hay corrección, entonces debería agregarse un archivo `audit-ci.jsonc` a la raíz del proyecto, con ese `vulnerability advisories ID` agregado a la `allowlist` y con un `comment` apropiado, así:

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

##### Hook pre-commit de Git

Esto asegurará que se hagan comprobaciones de vulnerabilidades en la máquina local del desarrollador al hacer cualquier commit de Git.

El `audit:check` debería agregarse como pre-hook de commit de git usando [Husky](https://www.npmjs.com/package/husky), así:

```bash
npx husky add .husky/pre-commit "npm run audit:check"
```

> Nota: esto se puede eludir usando el parámetro `-n` al hacer el commit con `git commit -nm <message>`. Por eso hace falta una comprobación de vulnerabilidades `vulnerability-check` de CI (*integración continua*) (*véase la sección siguiente*) para asegurar su cumplimiento.

##### Validaciones automatizadas de CI

Esto asegurará que se hagan comprobaciones de auditoría durante las revisiones y las publicaciones de versiones, y también que no se eluda el hook pre-commit de Git.

Las configuraciones de CI (es decir, `.circleci/config.yml`)  deben contener un trabajo de CI de comprobación de vulnerabilidades `vulnerability-check` (es decir, `npm run dep:check`) para todos los pull requests, los merges a la rama main y las versiones etiquetadas.

## Directrices de diseño e implementación

Estas directrices están pensadas como recomendaciones para escribir código en la comunidad de Mojaloop (o código que se vaya a adoptar en la comunidad). Si está escribiendo código que desea donar a la comunidad, le pedimos que siga estas directrices en la medida de lo posible, para ayudar con la coherencia y la mantenibilidad del código base. Las donaciones que cumplan estas directrices se adoptarán con más facilidad y rapidez.

Para obtener más información, consulte las FAQ [más abajo](#faqs).

## Herramientas y frameworks

En la comunidad OSS de Mojaloop preferimos las siguientes herramientas y frameworks:

- **Servidor web:** [`HapiJS`](https://github.com/hapijs/hapi)
- **Framework de interfaz web:** [`ReactJS`](https://reactjs.org/)
- **Configuración en tiempo de ejecución:** [`convict`](https://www.npmjs.com/package/convict), con [`rc`](https://www.npmjs.com/package/rc) para el código heredado. (tanto para variables de entorno como para archivos de configuración)
- **Gestión de paquetes:** `npm`
- **Registro de logs:** la biblioteca [`@mojaloop/central-services-logger`](https://github.com/mojaloop/central-services-logger#readme), construida sobre Winston
- **Contenedores y orquestación:** [`docker`](https://www.docker.com/) y [`kubernetes`](https://kubernetes.io/)
- **Pruebas unitarias:** para las pruebas existentes, [`Tape`](https://github.com/substack/tape), pero actualmente estamos migrando a [`Jest`](https://jestjs.io/) para los códigos base nuevos.
- **Cobertura de pruebas:** [`nyc`](https://github.com/istanbuljs/nyc)
- **CI:** [`CircleCI`](https://circleci.com/)

Al usar estas herramientas y frameworks, mantenemos un alto nivel de coherencia y mantenibilidad en todo el código base, lo que mantiene a nuestros desarrolladores productivos y satisfechos. Aunque no exigimos que los códigos base donados usen estas mismas herramientas y frameworks, queremos subrayar que las adopciones que usen herramientas distintas podrían crear una carga de mantenimiento indebida para la comunidad.

## Adopción de contribuciones de código abierto en Mojaloop

Esta sección ofrece directrices sobre la adopción de una contribución en los repositorios de código abierto de Mojaloop. La adopción es el proceso en el que, como comunidad, trabajamos con un contribuyente para alinear una contribución con nuestros estándares y directrices, de forma que pase a formar parte del código base OSS de Mojaloop.

>*Nota:* las contribuciones de código se evalúan **caso por caso**. Las contribuciones que no se alineen con estas directrices tendrán que pasar por la fase de incubación que se describe abajo. Otras desalineaciones con estos estándares (por ejemplo, la elección de frameworks) pueden agregarse a una hoja de ruta para mejorarlas y estandarizarlas en el OSS en el futuro.

### Paso 0: requisitos previos

Antes de que una contribución se considere para su adopción, esta:

1. Debería estar en línea con los [principios del Level One Project](https://leveloneproject.org/).
1. Debería cumplir las guías de estilo y de diseño e implementación anteriores.
1. Debería contener documentación para empezar: cuanta más, mejor.
1. Contener pruebas con un alto nivel de cobertura. Como mínimo, una contribución debería contener pruebas unitarias, pero se prefiere un conjunto de pruebas con pruebas unitarias, de integración y funcionales. Consulte la [guía del contribuyente](./tools-and-technologies/automated-testing) para obtener más información.

### Paso 1: incubación

1. Cree un repositorio privado dentro de la organización Mojaloop en GitHub para el código adoptado.
1. Haga que un subequipo de la DA lo revise para asegurarse de que es portable \(al OSS\), de que se alinea con los principios de L1P, etc., y de que el diseño está en línea con los estándares.
1. Compruebe las licencias de la contribución y de las dependencias nuevas que requiera, y agregue la licencia estándar de Mojaloop con atribución al donante o a los contribuyentes.
1. Evalúe el estado actual del código base, incluidas la documentación, las pruebas y la calidad del código, y subsane cualquier carencia.
1. Evalúe el impacto en el rendimiento.
1. Cree elementos de acción \(historias\) para actualizar la nomenclatura y eliminar o sanear cualquier elemento que no sea genérico
1. Inspeccione y debata cualquier elección de framework y de herramientas.

- Si se decide hacer algún cambio, agréguelo a la hoja de ruta.

### Paso 2: adopción pública

1. Haga público el proyecto en el GitHub de Mojaloop.
1. Anúncielo en el canal de slack [`#announcements`](https://mojaloop.slack.com/archives/CG3MAJZ5J).
1. Active los pipelines de CI/CD y publique los artefactos pertinentes, como imágenes de Docker o módulos de npm.
1. Revise y recomiende un módulo o curso para el programa de formación de Mojaloop si hace falta y resulta pertinente para esta contribución.

## Versionado

Revise la información sobre el [versionado](./versioning.md) de Mojaloop.

## Crear funcionalidades nuevas

Proceso para crear [funcionalidades y ramas nuevas](./creating-new-features.md) en Mojaloop.

## Proceso de pull request

Es buena idea preguntar por los cambios importantes en [Slack](https://mojaloop.slack.com). Envíe pull requests que incluyan tanto el cambio como el motivo del cambio. Puede usar la función "Draft Pull Request" de GitHub para abrir sus cambios a los comentarios y la revisión de la comunidad.

Los pull requests se denegarán si infringen los [principios de Level One](https://leveloneproject.org/wp-content/uploads/2016/03/L1P_Level-One-Principles-and-Perspective.pdf).

## Código de conducta

Usamos el [código de conducta de la Mojaloop Foundation](https://github.com/mojaloop/mojaloop/blob/master/CODE_OF_CONDUCT.md)

## Licencias

Consulte la política de [licencias](https://github.com/mojaloop/mojaloop/blob/master/contribute/License.md).

## FAQs

**1. ¿Y si quiero contribuir código, pero no se alinea con el estilo de código ni con las recomendaciones de frameworks y herramientas de esta guía?**

  Las contribuciones se aceptan *caso por caso*. Si su contribución todavía no está lista para adoptarse por completo, podemos pasar por la fase de incubación descrita arriba, donde el código se refactoriza con nuestra ayuda y se alinea con los requisitos de código y documentación.

**2. Estos estándares están desactualizados y ha aparecido una herramienta (o framework, método o lenguaje) más nueva y mejor que nos resolverá el problema *x*. ¿Cómo puedo actualizar los estándares?**

  Escribir código funcional y de alta calidad es un objetivo móvil, y siempre queremos estar atentos a las herramientas nuevas que mejoren el código base OSS de Mojaloop. Así que hable con nosotros en el canal de slack de la design authority (`#design-authority`) si tiene alguna recomendación.

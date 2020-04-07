# Standards

> *Note:* These standards are by no means set in stone, and as a community, we always want to be iterating and improving Mojaloop. If you want to propose a change to these standards, or suggest further improvements, please reach out to the Design Authority Channel on the Mojaloop Slack (#design-authority)

## Style Guide

The Mojaloop Community provides a set of guidelines for the style of code we write. These standards help ensure that the Mojaloop codebase remains high quality, maintainable and consistent.

These style guides are chosen because they can be easily enforced and checked using popular tools with minimal customisation. While we recognise that developers will have personal preferences that may conflict with these guidelines we favour consistency over [bike-shedding](https://en.wikipedia.org/wiki/Law_of_triviality) these rules.

The goal of these guides is to ensure an easy developer workflow and reduce code commits that contain changes for the sake of style over content. By reducing the noise in diffs we make the job of reviewers easier. 

### Code Style

#### Javascript

Mojaloop uses the Javascript code style dictated by [StandardJS](https://standardjs.com/). For a full set of rules, refer to the [Standard Rules](https://standardjs.com/rules.html), but as a brief set of highlights:

- Use *2 spaces* for indentation
```js
function helloWorld (name) {
  console.log('hi', name)
}
```

- Use *single quotes* for strings except to avoid escaping.

```js
console.log('hello there')    // ✓ ok
console.log("hello there")    // ✗ avoid
console.log(`hello there`)    // ✗ avoid
```

- No semicolons. (see: 1, 2, 3)

```js
window.alert('hi')   // ✓ ok
window.alert('hi');  // ✗ avoid
```

#### Typescript

>*Note: Standard and Typescript*  
>
>As we start to introduce more Typescript into the codebase, Standard becomes less useful, and can even be detrimental
>to our development workflow if we try to run standard across the Javascript compiled from Typescript.
>We need to evaluate other options for Standard in Typescript, such as a combination of Prettier + ESLint

Refer to the [template-typescript-public](https://github.com/mojaloop/template-typescript-public) for the standard typescript configuration.


#### YAML

While YAML deserializers can vary from one to another, we follow the following rules when writing YAML:
> Credit: these examples were taken from the [flathub style guide](https://github.com/flathub/flathub/wiki/YAML-Style-Guide)

- 2 space indents
- Always indent child elements
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

- Do not align values

```yaml
# BAD:
id:           org.example.Foo   
modules:
  - name:     foo
    sources:
      - type: git
```
#### sh + bash

- The Shebang should respect the user's local environment:
```bash
#!/usr/bin/env bash
```

This ensures that the script will match the `bash` that is defined in the user's environment, instead of hardcoding to a specific bash at `/usr/bin/bash`. 

- When referring to other files, don't use relative paths:

This is because your script will likely break if somebody runs it from a different directory from where the script is located

```bash
# BAD:
cat ../Dockerfile | wc -l

# GOOD:
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cat ${DIR}/../Dockerfile | wc -l 
```

For other recommended bash conventions, refer to this blog post: [Best Practices for Writing Shell Scripts](https://kvz.io/bash-best-practices.html)

#### Documentation

Refer to the [Documentation style guide.](../documentation/documentation-style-guide.html)

### Directory Structure

Along with guidelines for coding styles, the Mojaloop Community recommends the following directory structure. This ensures that developers can easily switch from one project to another, and also ensures that our tools and configs (such as `.circleci/config.yml` and `Dockerfile`s) can be ported easily from one project to another with minor changes.

The directory structure guide requires:

```bash
├── package.json       # at the root of the project
├── src                # directory containing project source files 
├── dist               # directory containing compiled javascript files (see tsconfig below)
├── test               # directory for tests, containing at least:
│   ├── unit           # unit tests, matching the directory structure in `./src`
│   └── integration    # integration tests, matching the directory structure in `./src`
└── config 
    └── default.json   # RC config file 
```

### Config Files

The following Config files help to enforce the code styles outlined above:


#### EditorConfig
> EditorConfig is supported out of the box in many IDEs and Text editors. For more information, refer to the [EditorConfig guide](https://editorconfig.org/).

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

#### NYC (code coverage tool)

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

For a more detailed list of the recommended typescript configuration, including `package.json`, `jest.config.js` and more, refer to the [Typescript Template Project](https://github.com/mojaloop/template-typescript-public)

### Design + Implementation Guidelines

These guidelines are meant as recommendations for writing code in the Mojaloop community (or code that will be adopted into the community). If you are writing code that you wish to donate code to the community, we ask that you follow these guidelines as much as possible to aid with the consistency and maintainability of the codebase. Donations that adhere to these guidelines will be adopted more easily and swiftly.

For more information, refer to the FAQ [below](#faqs).

#### Tools + Frameworks

In the Mojaloop OSS Community, we are prefer the following tools and frameworks:

- **Web Server:** [`HapiJS`](https://github.com/hapijs/hapi)
- **Web UI Framework:** [`ReactJS`](https://reactjs.org/)
- **Runtime Configuration:** [`rc`](https://www.npmjs.com/package/rc) (both from env variables and config files)
- **Package Management:** `npm`
- **Logging:** [`@mojaloop/central-services-logger`](https://github.com/mojaloop/central-services-logger#readme) library, built on top of Winston
- **Containers and Orchestration:** [`docker`](https://www.docker.com/) and [`kubernetes`](https://kubernetes.io/)
- **Unit Testing:** For existing tests, [`Tape`](https://github.com/substack/tape), but we are currently moving over to [`Jest`](https://jestjs.io/) for new codebases.
- **Test Coverage:** [`nyc`](https://github.com/istanbuljs/nyc)
- **CI:** [`CircleCI`](https://circleci.com/)

By using these tools and frameworks, we maintain a high level of consistency and maintainability across the codebase, which keeps our developers productive and happy. While we don't mandate that donated codebases use these same tools and frameworks, we would like to stress that adoptions that use different tools could create an undue maintenance burden on the Community.

### Adopting Open Source Contributions into Mojaloop

This section provides guidelines regarding the adoption of a contribution to the Mojaloop Open Source repositories. Adoption is the process where we as the community work with a contributor to bring a contribution into alignment with our standards and guidelines to be a part of the Mojaloop OSS Codebase.

>*Note:* Code Contributions are evaluated on a **case-by-case** basis. Contributions that don't align to these guidelines will need to go through the incubation phase as described below. Other misalignments to these standards (for example, framework choices) may be added to a roadmap for further improvement and OSS Standardization in the future.

#### Step 0: Prerequisites

Before a contribution is to be considered for adoption, it:

1. Should be in-line with the [Level One Project Principles](https://leveloneproject.org/)
1. Should adhere to the above Style and Design + Implementation Guides
1. Should contain documentation to get started: the more, the better
1. Contain tests with a high level of coverage. At a minimum, a contribution should contain unit tests, but a test suite with unit, integration and functional tests is preferred. Refer to the [contributors guide](./tools-and-technologies/automated-testing) for more information.

#### Step 1: Incubation

1. Create a private repo within the Mojaloop GitHub organization for the adopted code
1. Have a sub-team of the DA take a look to make sure its portable \(to OSS\) - aligns with L1P principles, etc, and ensure design is in line with standards
1. Check Licensing of the contribution and any new dependencies it requires, and add the standard Mojaloop License with attribution to donor/contributors
1. Assess the current state of the codebase, including documentation, tests, code quality, and address any shortfalls
1. Assess Performance impact
1. Create action items \(stories\) to update naming, remove/sanitize any items that are not generic
1. Inspect and discuss any framework and tooling choices. 
  - If a decision is made to make any changes, add them to the roadmap

#### Step 2: Public Adoption

1. Make the project public on Mojaloop GitHub
1. Announce on the slack `#announcements` channel
1. Enable CI/CD Pipelines and publish any relevant artifacts, such as Docker Images or npm modules

### Versioning

Review the information on [versioning](versioning.md) for Mojaloop.

### Creating new Features

Process for creating new [features and branches](creating-new-features.md) in Mojaloop.

### Pull Request Process

It's a good idea to ask about major changes on [Slack](https://mojaloop.slack.com). Submit pull requests which include both the change and the reason for the change. Feel free to use GitHub's "Draft Pull Request" feature to open up your changes for comments and review from the community.

Pull requests will be denied if they violate the [Level One Principles](https://leveloneproject.org/wp-content/uploads/2016/03/L1P_Level-One-Principles-and-Perspective.pdf)

### Code of conduct 

We use a [standard developer code of conduct](https://www.contributor-covenant.org/version/1/4/code-of-conduct.html)

### Licensing

See [License](https://github.com/mojaloop/mojaloop/blob/master/contribute/License.md) policy

### FAQs

__1. What if I want to contribute code, but it doesn't align with the code style and framework/tool recommendations in this guide?__

Contributions are accepted on a _case by case_ basis. If your contribution is not yet ready to be fully adopted, we can go through the incubation phase described above, where the code is refactored with our help and brought into alignment with the code and documentation requirements.


__2. These standards are outdated, and a newer, cooler tool (or framework, method or language) has come along that will solve problem _x_ for us. How can I update the standards?__

Writing high quality, functional code is a moving target, and we always want to be on the lookout for new tools that will improve the Mojaloop OSS codebase. So please talk to us in the design authority slack channel (`#design-authority`) if you have a recommendation.

# Standards

> *Note:* These standards are by no means set in stone, and as a community, we always want to be iterating and improving Mojaloop. If you want to propose a change to these standards, or suggest futher improvements, please reach out to the Design Authority Channel on the Mojaloop Slack (#design-authority)

## Style Guide

The Mojaloop Community enforces a strict set of rules for the style of code we write. These standards help ensure that the Mojaloop codebase remains high quality, maintainability and consistency.

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

- When referring to other files, don't use relative paths:

This is because your script will likely break if somebody runs it from a different directory from where the script is located

```bash
# BAD:
cat ../Dockerfile | wc -l

# GOOD:
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cat ${DIR}/../Dockerfile | wc -l 
```

#### Documentation

Refer to the [Documentation style guide.](../documentation/documentation-style-guide.html)

### Directory Structure

Along with a strict coding style, Mojaloop dictates a fairly strict directory structure. This ensures that developers can easily switch from one project to another, and also ensures that our tools and configs (such as `.circleci/config.yml` and `Dockerfile`s) can be ported easily from one project to another with minor changes.

The directory structure guide requires:

```bash
├── package.json       # at the root of the project
├── src                # directory containing project source files 
├── test               # directory for tests, containing at least:
│   ├── unit           # unit tests, matching the directory structure in `./src`
│   └── integration    # integration tests, matching the directory structure in `./src`
└── config 
    └── default.json   # RC config file 
```

### Config Files

The following Config files help to enforce the code styles outlined above:

#### EditorConfig

```ini
root = true

[*]
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
charset = utf-8

[*.js]
indent_style = space
indent_size = 2

[{package.json,*.yml,*.cjson}]
indent_style = space
indent_size = 2

[*.md]
trim_trailing_whitespace = false
```

### Tool and Framework Recommendations

>Note: While these are listed as recommendations, these are enforced strictly, and new contributions that don't align with these recommendations may be rejected, or you may be asked to refactor your code before it will be allowed into the Mojaloop Core. For more information, refer to the FAQ [below](#faqs).

- **Web Server:** [`HapiJS`](https://github.com/hapijs/hapi)
- **Web UI Framework:** [`ReactJS`](https://reactjs.org/)
- **Runtime Configuration:** [`rc`](https://www.npmjs.com/package/rc) (both from env variables and config files)
- **Package Management:** `npm`
- **Logging:** [`@mojaloop/central-services-logger`](https://github.com/mojaloop/central-services-logger#readme) library, built on top of Winston
- **Containers and Orchestration:** [`docker`](https://www.docker.com/) and [`kubernetes`](https://kubernetes.io/)
- **Unit Testing:** For existing tests, [`Tape`](https://github.com/substack/tape), but we are currently moving over to [`Jest`](https://jestjs.io/) for new codebases.
- **Test Coverage:** [`nyc`](https://github.com/istanbuljs/nyc)
- **CI:** [`CircleCI`](https://circleci.com/)

### Adopting Open Source Contributions into Mojaloop

This document provides guidelines regarding the adoption of a contribution to the Mojaloop Open Source repositories.

#### Prerequisites

1. The contribution should be in-line with the LevelOne Principles
2. Basic guidelines regarding status of the contribution \(Code-base / Standards / Designs / Specifications\)
>*Note:* Code Contributions are evaluated on a **case-by-case** basis. Code and Directory style are enforced strictly, so contributions that don't align to these guidelines may be rejected or heavily refactored before being accepted. Other misalignments to these standards (for example, framework choices) may be added to a roadmap for further improvement and OSS-ification in the future
3. Basic documentation to get started

#### Guidelines regarding adoption

1. Create a private repo on the Mojaloop GitHub organization
2. Have a sub-team of the DA take a look to make sure its portable \(to OSS\) - aligns with L1P principles, etc, and ensure design is in line with standards
3. Check Licensing
4. Assess Performance impact
5. Create action items \(stories\) to update naming, remove/sanitize any items that are not generic
6. Configuration for 'modes of operation'
7. Enable CI/CD pipeline

### Versioning

Review the information on [versioning](versioning.md) for Mojaloop.

### Creating new Features

Process for creating new [features and branches](creating-new-features.md) in Mojaloop.

### Pull Request Process

It's a good idea to ask about major changes on [Slack](https://mojaloop.slack.com). Submit pull requests which include both the change and the reason for the change. Pull requests will be denied if they violate the [Level One Principles](https://leveloneproject.org/wp-content/uploads/2016/03/L1P_Level-One-Principles-and-Perspective.pdf)

### Code of conduct 

We use a [standard developer code of conduct](https://www.contributor-covenant.org/version/1/4/code-of-conduct.html)

### Licensing

See [License](https://github.com/mojaloop/mojaloop/blob/master/contribute/License.md) policy

### FAQs

1. What if I want to contribute code, but it doesn't align with the code style and framework/tool recommendations in this guide?
[todo outline standard control process]

2. Why so strict? I don't like using tool x or y.
[todo: answer this question]

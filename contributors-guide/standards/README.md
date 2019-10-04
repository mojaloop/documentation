# Standards

### Coding Style Guide

[todo: insert details]
#### Code Style

**Javascript**

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

**Typescript**

>*Note: Standard and Typescript*
>As we start to introduce more Typescript into the codebase, Standard becomes less useful, and can even be detrimental
>to our development workflow if we try to run standard across the Javascript compiled from Typescript.
>We need to evaluate other options for Standard in Typescript, such as a combination of Prettier + ESLint


**YAML**

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

**sh + bash**

- The Shebang should respect the user's local environment:
```bash
#!/usr/bin/env bash
```

- When referring to other files, don't use a relative path:

This is because your script will likely break if somebody runs it from a different directory from where the script is located

```bash
# BAD:
cat ../Dockerfile | wc -l

# GOOD:
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cat ${DIR}/../Dockerfile | wc -l 
```

**Documentation**

Refer to the [Documentation style guide.](../documentation/documentation-style-guide.html)

#### Directory Structure

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


### Tool and Framework Recommendations

>Note: while these are listed as recommendations, these are enforced very strictly, and new contributions that don't align with these recommendations may be rejected, or you may be asked to refactor your code before it will be allowed into the Mojaloop Core. For more information, refer to the FAQ [below](todo: link)

- Web Frameworks: HapiJS
- Package Management: `npm`
- Logging:
- Containerization:
- Unit Testing:
- Test Coverage:


### Adopting Open Source Contributions into Mojaloop

This document provides guidelines regarding the adoption of a contribution to the Mojaloop Open Source repositories.

#### Prerequisites

1. The contribution should be in-line with the LevelOne Principles
2. Basic guidelines regarding status of the contribution \(Code-base / Standards / Designs / Specifications\)
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

2. Why so strict? I don't using tool x or y.
[todo: answer this question]

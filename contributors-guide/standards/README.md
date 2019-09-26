# Standards

### Coding Style Guide

[todo: insert details]
#### Code Style

#### Directory Structure



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

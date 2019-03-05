---
description: Mojaloop Contributors Guide
---

# Contributors Guide

## How do I contribute?

### \* Review the [Mojaloop Deployment](mojaloop-deployment/#mojaloop-deployment) Guide

### \* Get familiar with our [Standards](standards/) on contributing to this project

### \* View the project board and work on your first [Issue](https://github.com/mojaloop/project/issues?q=is%3Aissue+is%3Aopen+label%3A"good+first+issue")

### \* Review the [Roadmap](../mojaloop-roadmap.md) and contribute to future opportunities

## What work is needed?

Work is tracked as issues in GitHub. You'll see issues there that are open and marked as bugs, stories, or epics. An epic is larger work that contains multiple stories. Start with any stories that are marked with "[good first issue](https://github.com/mojaloop/project/issues?q=is%3Aissue+is%3Aopen+label%3A"good+first+issue")". In addition, anything that is in the backlog and not assigned to someone are things we could use help with. Stories that have owners are in someone's backlog already, though you can always ask about them in the issue or on Slack.

There's a [roadmap](../mojaloop-roadmap.md) that shows larger work that people could do or are working on. It has some main initiatives and epics and the order, but lacks dates as this work is community driven. Work is broken down from there into issues in GitHub.

In general, we are looking for example implementations and bug fixes, and project enhancements.

### Where do I get help?

Join the [Mojaloop Slack Discussions](https://mojaloop-slack.herokuapp.com/) to connect with other developers.

Also checkout the [FAQ](https://github.com/mojaloop/mojaloop/blob/master/FAQ.md)

### What is the current release?

See the [Mojaloop Slack Announcements](https://mojaloop.slack.com/messages/CG3MAJZ5J) to find out information on the latest release.

### What's here and what's not

This is free code provided under an [Apache 2.0 license](https://github.com/mojaloop/mojaloop/blob/master/LICENSE.md).

The code is released with an Apache 2.0 license but the Specification documents under the 'mojaloop-specification' documents are published with CC BY-ND 4.0 License

We don't provide production servers to run it on. That's up to you. You are free \(and encouraged!\) to clone these repositories, participate in the community of developers, and contribute back to the code.

We are not trying to replace any mobile wallet or financial providers. We provide code to link together new and existing financial providers using a common scheme. There are central services for identifying a customer's provider, quoting, fulfillment, deferred net settlement, and shared fraud management. Each provider can take advantage of these services to send and receive money with others on the system and there's no cost to them to onboard new providers. We provide code for a simple example mobile money provider to show how integration can be done, but our example DFSP is not meant to be a production mobile money provider.

### Related Projects

The [Interledger Protocol Suite](https://interledger.org/) \(ILP\) is an open and secure standard that enables DFSPs to settle payments with minimal _counter-party risk_ \(the risk you incur when someone else is holding your money\). With ILP, you can transact across different systems with no chance that someone in the middle disappears with your money. Mojaloop uses the Interledger Protocol Suite for the clearing layer. For an overview of how it works, see the [Clearing Architecture Documentation](https://github.com/mojaloop/Docs/blob/master/ILP/README.md).Where to I send bugs, questions, and feedback?

UPDATE: For bugs, see [Reporting bugs](https://github.com/mojaloop/mojaloop/blob/master/contribute/Reporting-Bugs.md).

## Types of Contributors

There are three types of contributors that we are targeting for this phase of the Mojaloop project.

### Developers or General Contributors

These individuals are those that want to start contributing to the Mojaloop community. This could be a developer or quality assurance person that wants to write new code or fix a bug. This could also be a business, compliance or risk specialist that wants to help provide rules, write documentation or participate in requirements gathering.

### Hub Operators

Typically these or organizations or individuals or government agencies that are interested in setting up their own Mojaloop Switch to become part of the ecosystem.

### Implementation Teams

Implementation teams can assist banks, government offices, mobile operators or credit unions in deploying Mojaloop.


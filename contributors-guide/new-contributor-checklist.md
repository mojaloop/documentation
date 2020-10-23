# New Contributor Checklist

This guide summarizes the steps needed to get up and running as a contributor to Mojaloop. They needn't be completed all in one sitting, but by the end of the checklist, you should have learned a good deal about Mojaloop, and be prepared to contribute to the community.


## 1. Tools & Documentation

- Make sure you have a GitHub account already, or sign up for an account [here](https://github.com/join)

- Join the slack community at the [self-invite link](https://mojaloop-slack.herokuapp.com/), and join the following channels:
  - `#announcements` - Announcements for new Releases and QA Status
  - `#design-authority` - Questions + Discussion around Mojaloop Design
  - `#general` - General discussion about Mojaloop
  - `#help-mojaloop` - Ask for help with installing or running Mojaloop
  - `#ml-oss-bug-triage` - Discussion and triage for new bugs and issues

- Say hi! Feel free to give a short introduction of yourself to the community on the `#general` channel.

- Review the [Git workflow guide](https://mojaloop.io/documentation/contributors-guide/standards/creating-new-features.html) and ensure you are familiar with git.
  - Further reading: [Introduction to Github workflow](https://www.atlassian.com/git/tutorials/comparing-workflows)

- Familiarize yourself with our standard coding style: https://standardjs.com/

- Browse through the [Mojaloop Documentation](https://mojaloop.io/documentation/) and get a basic understanding of how the technology works.

- Go through the [Developer Tools Guide](https://github.com/mojaloop/mojaloop/blob/master/onboarding.md) to get the necessary developer tools up and running on your local environment.

- (Optional) Get the Central-Ledger up and running on local machines:
  - https://github.com/mojaloop/central-ledger/blob/master/Onboarding.md
  - https://github.com/mojaloop/ml-api-adapter/blob/master/Onboarding.md

- (Optional:) Run an entire switch yourself with Kubernetes https://mojaloop.io/documentation/deployment-guide/ _(note: if running locally, your Kubernetes cluster will need 8gb or more of RAM)_

## 2. Finding an Issue

- Review the [good-first-issue](https://github.com/mojaloop/project/labels/good%20first%20issue) list on [`mojaloop/project`](https://github.com/mojaloop/project), to find a good issue to start working on. Alternatively, reach out to the community on Slack at `#general` to ask for help to find an issue.

- Leave a comment on the issue asking for it to be assigned to you -- this helps make sure we don't duplicate work. As always, reach out to us on Slack if you have any questions or concerns.

- Fork the relevant repos for the issue, clone and create a new branch for the issue
  - Refer to our [git user guide](https://mojaloop.io/documentation/contributors-guide/standards/creating-new-features.html) if you get lost


## 3. Opening your First PR 

> _Complete this part of the guide once you have been added to the Mojaloop GitHub organization. If you don't have access, reach out to us on the `#general` or `#help-mojaloop`

- Sign up for [Zenhub](https://www.zenhub.com/), and connect it to the Mojaloop Organisation, Search for the _'project'_ workspace
- Install the [Zenhub Browser extension](https://www.zenhub.com/extension) for Chrome or Firefox, and browse the (Mojaloop Project Kanban board](https://github.com/mojaloop/project#zenhub)

- When your branch is ready for review, open a new pull request from your repository back into the mojaloop project.
  >_Note: if the CI/CD pipelines don't run, this may be because your Github account isn't added to the Mojaloop repo_
- Ensure the following:
  - A good description of the feature/bugfix you implemented
  - The PR is _assigned_ to yourself
  - You have assigned two or more _reviewers_. GitHub often has suggested reviewers, but if you don't know who to assign, feel free to ask whoever created the issue.

- (Optional) Post a link to your PR on the `#ml-oss-devs` channel in Slack so everyone can share in the fun


## 4. Signing the CLA

After you open your first PR, our CI/CD pipelines will ask you to sign the CLA. For more information on what the CLA is and how to sign it, see [./signing-the-cla.html]

## FAQs:

> None as of yet. If you have problems getting through this list, or need more help, reach out to us on Slack!
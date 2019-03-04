# Standards

## Standards

### Standards for adopting an Open Source contribution into Mojaloop

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

## Creating new Features

### Fork

Fork the Mojaloop repository into your own personal space. Ensure that you keep the `master` branch in sync.

Refer to the following documentation for more information: [https://help.github.com/articles/fork-a-repo/](https://help.github.com/articles/fork-a-repo/)

1. Clone repo using Git Fork button \(refer to the above documentation for more information\)
2. Clone your forked repo: `git clone https://github.com/<your_username>/<forked_repo>.git`
3. Synchronise your forked repo with Mojaloop

   Add a new upstream repo for Mojaloop `$ git remote add mojaloop https://github.com/mojaloop/<original_repo>.git`

   You should now see that you have two remotes:

   ```bash
    git remote -v
    origin    https://github.com/<your_username>/<forked_repo>.git (fetch)
    origin    https://github.com/<your_username>/<forked_repo>.git (push)
    mojaloop  https://github.com/mojaloop/<original_repo>.git (fetch)
    mojaloop  https://github.com/mojaloop/<original_repo>.git (push)
   ```

4. To sync to your current branch: `git pull mojaloop <current_branch>` This will merge any changes from Mojaloop's repo into your forked repo.
5. Push the changes back to your remote fork: `git push origin <current_branch>`

### Creating a Branch

Create a new branch from the `master` branch with the following format: `<branchType>/<issue#><issueDescription>` where `issue#` can be attained from the Github issue, and the `issueDescription` is the formatted in CamelCase.

1. Create and checkout the branch: `git checkout -b <branchType>/<issue#><issueDescription>` 
2. Push the branch to your remote: `git push origin <branchType>/<issue#><issueDescription>`

Where `<branchType>` can be one of the following:

| branchType | Description |
| :--- | :--- |
| feature | Any new or maintenance features that are in active development. |
| hotfix | A hotfix branch is for any urgent fixes. |
| release | A release branch containing a snapshot of a release. |
| backup | A temporary backup branch. Used normally during repo maintenance. |

### Merge into Mojaloop Repo

Once the feature is completed create a PR from your Feature Branch into the `master` branch on the Mojaloop repository \(not your personal repo\) for approval, and check validations \(e.g. unit tests, code coverage, etc executed via CircieCI\).

## Versioning of releases made for core Switch services

This document provides guidelines regarding the versioning strategy used for the releases of Mojaloop Open Source repositories corresponding to the Switch services.

#### [Versioning Strategy](standards.md#versioning-strategy)

#### [Current versions](standards.md#current-version)

#### [Notes](standards.md#notes)

### Versioning Strategy

1. The current versioning system is inspired by the [Semantic Versioning](https://semver.org/) numbering system for releases.
2. However, this is customized to depict the timelines of the Mojaloop project, based on the Program Increment \(PI\) and Sprint numbers
3. For example, the release number v5.1.0 implies that this release was the first one made during a Sprint 5.1, where Sprint5.1 is the first Sprint in PI-5. So for a version vX.Y.Z, X.Y is the Sprint number where X is the PI number and Z represents the number of release for this specific repository. Example v4.4.4 implies that the current release is the fourth of four releases made in Sprint 4.4 \(of PI-4\)

### Notes

1. A new release for **helm** repo is made whenver a configuration change is needed for any of the core Switch services based on the changes made \(features, bug-fixes\).
2. However, if there is no release made to helm necessitated by a configuration change, then a release is done every Sprint anyway, to bring it up to date with the latest releases on the core Switch services.

### Pull Request Process

It's a good idea to ask about major changes on [Slack](https://mojaloop.slack.com). Submit pull requests which include both the change and the reason for the change. Pull requests will be denied if they violate the [Level One Principles](https://leveloneproject.org/wp-content/uploads/2016/03/L1P_Level-One-Principles-and-Perspective.pdf)

### Code of conduct 

We use a [standard developer code of conduct](https://www.contributor-covenant.org/version/1/4/code-of-conduct.html)

### Licensing

See [License](https://github.com/mojaloop/mojaloop/blob/master/contribute/License.md) policy

## 


# Creating new Features

## Fork

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

## Creating a Branch

Create a new branch from the `master` branch with the following format: `<branchType>/<issue#><issueDescription>` where `issue#` can be attained from the Github issue, and the `issueDescription` is the issue description formatted in CamelCase.

1. Create and checkout the branch: `git checkout -b <branchType>/<issue#><issueDescription>`
2. Push the branch to your remote: `git push origin <branchType>/<issue#><issueDescription>`

Where `<branchType>` can be one of the following:

| branchType | Description |
| :--- | :--- |
| feature | Any new or maintenance features that are in active development. |
| hotfix | A hotfix branch is for any urgent fixes. |
| release | A release branch containing a snapshot of a release. |
| backup | A temporary backup branch. Used normally during repo maintenance. |

## Working on your Feature

Before you start working on your Feature, please run through following steps to help ensure Mojaloop's  code-base is well maintained and protected against security issues, note that some of these steps will be required for your Pull-Request (*PR*) to pass CI validation checks (as indicated below).

It is recommended that `npm test` is executed after each of these steps to ensure that no breaking-changes have been introduced.

1. REQUIRED - Update dependencies

   ```bash
   npm run dep:check
   ```

   >
   > IMPORTANT
   >
   > Take note of any Dependencies that have Major Version upgrades, as they may introduce a BREAKING CHANGE. This may require some code-refactoring to accommodate the change.
   >
   > Refer to [Dependency Management & Upgrade Guide](./guide.md#dependency-management--upgrades) on how dependency upgrades can be ignored if/when required.
   >

   Run the following to update and install the dependencies

   ```bash
   npm run dep:update && npm i
   ```

2. REQUIRED - Audit Checks

   ```bash
   npm run audit:check
   ```

   If there is no available working fix for the audit issue, you will need to do one of the following:

   1. If the repo is using [audit-ci](https://www.npmjs.com/package/audit-ci) - update `audit-ci.jsonc` with the issue by adding it to the `allowlist`, and ensure that you add a comment indicating the reason.
   2. If the repo is using [npm-audit-resolver](https://www.npmjs.com/package/npm-audit-resolver) - Run `npm run audit:resolve` and follow the CLI prompts to try fix or ignore the issue (if there is no fix available)

3. OPTIONAL - Update NodeJS to `Active LTS` version

   Check the `Active LTS` version as per [Official NodeJS Releases](https://nodejs.org/en/about/releases).

   1. Update `.nvmrc`

   2. Update `Dockerfile` (for both the *builder* and *runtime* containers), ref [Runtime Environment - 2.Container (Docker) Operating System (*OS*)](./guide.md#runtime-environment).

   >
   > IMPORTANT
   >
   > Take note that upgrading the NodeJS version may introduce a BREAKING CHANGE. This may require some code-refactoring to accommodate the change.
   >

## Open a Pull Request (PR)

Once your feature is ready for review, create a Pull Request from you feature branch back into the `master` branch on the Mojaloop Repository. If you're new to GitHub or Pull Requests, take a look at [this guide](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests) for more information.

### Pull Request Titles

Mojaloop uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to help our automated tooling manage releases and deployments. Your Pull Request title _must_conform to the conventional commits specification to pass the CI/CD checks in CircleCI.

By adopting Conventional Commits + Semantic Versioning we can automatically release a new version for a given component and increment the `MAJOR`, `MINOR` and `BUGFIX` versions based soley on the PR titles, and auto generate rich changelogs. (See [this example](https://github.com/mojaloop/thirdparty-scheme-adapter/releases/tag/v11.20.0) of an auto generated changelog)

> **Note**:  
> When merging (and squashing) a PR, GitHub uses the *title* of the PR for the git commit message. This means that to specify a breaking change, you must use the `!` format:  
> "If included in the type/scope prefix, breaking changes MUST be indicated by a ! immediately before the :. If ! is used, BREAKING CHANGE: MAY be omitted from the footer section, and the commit description SHALL be used to describe the breaking change."

#### Examples of good PR titles

- feat(api): add ability to handle `PUT /thirdpartyRequests/trasactions/{ID}` endpoint
- fix: update outdated node modules
- feat(models)!: change database schema
- chore: tidy up readme

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
| :---       | :--- |
| hotfix     | A `hotfix` branch is for any urgent fixes. |
| feature    | A `development` branch for new or maintenance features that are in active development. |
| fix        | A `development` branch that is used to fix a bug. |
| release    | A release branch containing a snapshot of a release. |
| backup     | A temporary backup branch. Used normally during repo maintenance. |
| major      | A `pre-release` branch for major changes. |
| minor      | A `pre-release` branch for minor changes. |
| patch      | A `pre-release` branch for patch changes. |

## Main branch

The main branch must always contain code that is suitable for deployment.
Build automation tools will try to build and test code from this branch and
tag this branch with semver based version tags on success. The resulting
artifacts will be also published on respective repositories (npm, docker, etc.),
so that they can be used by other modules.

## Hotfix branches

These branches are created from a tag on main branch, when the corresponding
version has been deployed in production and an issue must be fixed and at the
same time main branch has newer published versions or undergoing development,
where this fix cannot be included in a timely and stable way. These branches are
named by using the pattern `hotfix/<issue#><issueDescription>`. It is highly
recommended that the fix be first committed in main (or another branch that is
going to be merged to main) and then cherry-picked in the hotfix branch. Hot-fix
branches are usually not merged to main and not deleted, as they may be used
for subsequent fixes. On hot-fix branches build automation tools will create
tags and publish corresponding packages by increasing only the patch version number.

## Prerelease branches

Prerelease branches are used when the development process requires artifacts
to be available in the repository for either automated or manual testing of
in-progress features or fixes, that are not ready for a release.
These branches are used to avoid the manual work associated with publishing
in repositories. The published artifacts will have prerelease versions and tags,
as specified by semver. Build automation tools will create and publish these
prerelease versions in the package repository and tag the branch in the git
repository for each commit that is successfully built. Prerelease branches are
usually created from the main branch and later merged into it. The patterns
for prerelease branches are:

- `major/<issue#><issueDescription>` - when a branch is expected to include
  breaking changes.
- `minor/<issue#><issueDescription>` - when a branch is expected to include
  only new features and no breaking changes. This is the most common kind of
  branch, where all new development happens.
- `patch/<issue#><issueDescription>` - when a branch is expected to include
  only fixes and no new features or breaking changes. These can sometimes be
  created from hotfix branches, when fixes need to be first published for tests,
  before being merged in the hotfix branch.

The build scripts will automatically publish a prerelease version and tag using
`<issue#><issueDescription>` as the prerelease identifier, followed by a
sequential number, i.e. something like
`X.Y.Z-<issue#><issueDescription>.sequence`, where X, Y or Z will be auto
increment once for the first build of the branch, depending on the
major/minor/patch prefix of the branch name and `sequence` will be incremented
on each successful build. For the prerelease branches it is important to ensure
`<issue#><issueDescription>` complies with the prerelease identifier rules
specified by semver. Sometimes a minor prerelease branch can eventually
include a breaking change, in which case the developers must ensure that
there is no parallel active development happening on another major
branch, as this may end up with both branches trying to release the same major
version. In general, developers should be careful when multiple prerelease
branches are being developed and ensure the version being released in the end
does not conflict with other prerelease branches. In such cases a manual edit
of the version may be needed while resolving a merge conflict for the version property.

## Development branches

These branches are used primarily for development of new features, when no
artifacts need to be published to package repositories until the branch is
merged. They are created from the main or prerelease branches. Names of these
branches must not match any of the patterns described above. The frequently
used ones are `feature/<issue#><issueDescription>` or
`fix/<issue#><issueDescription>`. Development branches can later
be renamed to prerelease ones, if the development process requires it. Using a
development branch instead of a prerelease branch helps avoid excessive
publishing of artifacts and tags, which take more time and clutter the repository.

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
   > Refer to [Dependency Management](./guide#dependency-upgrades) on how dependency upgrades can be ignored if/when required.
   >

   Run the following to update and install the dependencies

   ```bash
   npm run dep:update && npm i
   ```

2. REQUIRED - Vulnerability Checks

   ```bash
   npm run audit:check
   ```

[npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit) can be used to apply any known available fixes:

   ```bash
   npm audit fix --package-lock-only
   ```

   >
   > IMPORTANT
   >
   > Take note of any Dependencies that have Version changes, as they may introduce a BREAKING CHANGE.
   >
   > Refer to [Dependency Management](./guide#dependency-auditing) for more information.
   >

   If there is no available working fix for the vulnerability issue, you will need to do one of the following:

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

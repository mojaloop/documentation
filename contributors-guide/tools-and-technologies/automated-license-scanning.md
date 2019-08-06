# Automated License Scanning


In order to maintain the open source status of the Mojaloop project, we must make sure that any dependencies of mojaloop allow us to licence it thus [fix]. To this end, we must ensure that the project is free from so called 'viral' or 'copyleft' licenses.

## Mojaloop License Scanner

We have a suite of tools bundled under the [license-scanner](https://github.com/mojaloop/license-scanner) project on the Mojaloop Github account. The license-scanner allows us to:
- Perform an a license scan across one to many mojaloop github repositories 
- Integrate with FossaCLI to run mass license audits across the entire codebase
- Run inside of a CI process
- Run a license scan against a pre-built docker image


For more information, refer to the [readme](https://github.com/mojaloop/license-scanner) in the license-scanner repo.


## Blacklisting and Whitelisting

[copy notes we wrote to kim about blacklisting/whitelisting]

## Running Inside CI

### PR Flow

When a new Pull Request is opened for a mojaloop project, the licence scanner runs as a part of the CI workflow. The CI step is called 'audit-licenses'

<img alt="Example CircleCI Build Overview PR" src="./assets/images/automated-license-scanning/circle-pr-build.png" width=700>

The license-scanner does the following:
1. Sets up the circle ci environment
  * 1. Clones the git repo of the project
  * 2. runs `npm install`
  * 3. caches the `node_modules` folder for later use
2. Runs the audit-licenses step:
  * 1. Clones the license scanner repo to `/tmp` and sets up the scanner
  * 2. Restores the node_module cache
  * 3. Runs the license scanner
  * 4. Uploads the results as a .csv artifact


Should the license scanner pass (i.e. find no licenses that are blacklisted), the build will succeed.

<img src="./assets/diagrams/automated-license-scanning/audit-licenses-pr.svg" alt="CircleCI license scanning for PR" width=900>


### Build Flow

>Note: This step applies only to mojaloop projects which output docker images on release.

When a new build is initiated (for example, through a new release) the license-scanner also runs as part of the CI build step, after a docker image has been built.

The build flow differs a little from the PR flow, in that it runs against a prebuilt docker image.

>___FAQ:__ Why check the licences after the build process, when we have already ran the license scanner?_  
>
>This step acts a sanity check and a final audit so that we know (for sure) that the resulting docker images don't contain unwanted licenses.
>
>There is a chance, however slim, that the packages that end up in our resulting docker image differ from the packages that we originally ran the license scanner against. This could happen if somebody forgets to copy a `package-lock.json` file in the Dockerfile, or if a dependency hasn't been correctly locked down to a specific version. 


<img alt="Example CircleCI Build Overview Release" src="./assets/images/automated-license-scanning/circle-release-build.png" width=700>


1. Runs through the entire build process as above
2. Runs necessary tests and audit-license steps
3. Runs the Build step
  * 1. Checks out the code and sets up the ci job
  * 2. Builds the docker image
  * 3. Sets up & runs the license scanner
    * 1. Creates a new docker container from the built docker image, and copies across the `node_modules` directory
    * 2. Runs the license scanner tool against the copy of the `node_modules` directory
  * 4. Publishes the docker image
  * 5. Sends a Slack announcement about the new release


<img src="./assets/diagrams/automated-license-scanning/audit-licenses-build.svg" alt="CircleCI license scanning for Build" width=900>

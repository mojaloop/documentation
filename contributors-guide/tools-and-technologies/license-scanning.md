# License Scanning

## Motivation

As an open source project, Mojaloop must remain free of so called ['viral' licenses](https://en.wikipedia.org/wiki/Viral_license) in any dependencies which are incompatible with the license of the project. 

In order to scan the licenses across all mojaloop subprojects, we made a tool called [`license-scanner`](https://github.com/vessels-tech/license-scanner). Using this tool we can, en masse:

- run `fossa-cli` across the entire codebase and upload the reports to the Fossa Website (requires a Fossa API Key)
- run `npm-license-checker` across the codebase and export a `.xlsx` file for manually verifying the licenses


## Using `license-scanner`

>Note: `license-scanner` is currently in Vessel Tech's company github repo, but may be brought into the core mojaloop project in the future.

You can find `license-scanner` [here](https://github.com/vessels-tech/license-scanner). Follow the instructions in the readme to get up and running.

## CI/CD Pipeline

We are currently in the process of integrating license scans into the CI/CD Pipeline
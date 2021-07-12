# Code_Improvement Project

## Overview
Purpose to improve code quality and security for the Mojaloop project.  Includes analysis and introduction of new open sources tools, process improvments, gates checks (w/in pull requests and builds) along with documentation.

Scope: project is focused on quality and security but can lead to other areas such as test automation and DevOps automation and tools.

## OutPut (phase one by end of January):
- Implementation and analysis of new OSS tools
- Update Release Scripts: Security aspects need to be embedded in release/devops (CI/CD)
- Update rules for Pull Requests: Security aspects embedded in pull requests (before check-ins)
- Update documentations: Standards and contribution guides
 
Slack Channel:#code_security
 
 ## Discussions:
 ### Implement changes at the Dockerfile and CI/CD build process to help bolster our container security
 - Create a non-root user within the Dockerfile
 - Enable docker-content-trust on the docker host (this will be inside CircleCI)
 - Run builds with --no-cache during CircleCI step to ensure that we are pulling in any new security patches each time (I don’t think this is a major issue since we don’t have CircleCI docker image caching on anyway
 
 ### Move from Javascript to Typescript
 - Transition to typescript (mix and match js and ts) for more security/quality
 - Typescript is preferred but not required: https://github.com/mojaloop/template-typescript-public
 
 

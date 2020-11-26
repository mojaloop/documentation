Snyk NPM Scans

Pros
* Integrates with CircleCi (has specific orb)
* Can be executed locally using a CLI (pre-commit hooks for example)
* Can be configured to ignore some vulnerabilities or fail only above certain threshold
* Slack integration and email reports
* Ability to automatically create a PR with the fixes
* Unlimited tests for OSS public projects
* Large and up-to-date vulnerability database
Cons
* Fancy reports not available in free version
* License compliance management not available in free version
* API not available in free version

Snyk Containers Scans

Pros
* Integrates with CircleCi (caveat below)
* Scans Dockerfile(s)
* Can be executed locally using a CLI, these appear to not count for the 100 scans limit
* Can test images from Helm charts

Cons
* Limited to 100 tests per month
* Kubernetes integration is for paid license only
* Fancy reports not available in free version
* License compliance management not available in free version
* API not available in free version
* Integrates with CircleCi requires access to DockerHub credentials (user+pass), not ideal

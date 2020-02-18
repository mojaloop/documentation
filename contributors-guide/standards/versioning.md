# Versioning

## Versioning of releases made for core Switch services

This document provides guidelines regarding the versioning strategy used for the releases of Mojaloop Open Source repositories corresponding to the Switch services.

### Versioning Strategy

1. The current versioning system is inspired by the [Semantic Versioning](https://semver.org/) numbering system for releases.
2. However, this is customized to depict the timelines of the Mojaloop project, based on the Program Increment \(PI\) and Sprint numbers
3. For example, the release number v5.1.0 implies that this release was the first one made during a Sprint 5.1, where Sprint5.1 is the first Sprint in PI-5. So for a version vX.Y.Z, X.Y is the Sprint number where X is the PI number and Z represents the number of release for this specific repository. Example v4.4.4 implies that the current release is the fourth of four releases made in Sprint 4.4 \(of PI-4\)

### Current Version

The currrent version information for Mojaloop can be found [here](../../deployment-guide/releases.md).

### Sprint schedule for PI9

Below is the Sprint schedule for Program Increment 8 which ends with Phase-4 kickoff event at the of January 2020 in Johannesburg, SA. Please use this as guidance during the versioning and release processes.

|Phase/Milestone|Start|End|Weeks|Notes|
|---|---|---|---|---|
|**Phase-3 PI6 On-site**|4/16/2019|4/18/2019|3 days| Johannesburg|
|**Phase-3 PI7 On-site**|6/25/2019|6/27/2019|3 days| Arusha|
|**Phase-3 PI8 On-site**|9/10/2019|9/12/2019|3 days| Abidjan|
|**Phase-4 Kick-off On-site**|1/28/2020|1/30/2020|3 days| Johannesburg|
|**Sprint 9.1**|2/3/2020|2/16/2020|2 weeks| |
|**Sprint 9.2**|2/17/2020|3/1/2020|2 weeks| |
|**Sprint 9.3**|3/2/2020|3/15/2020|2 weeks| |
|**Sprint 9.4**|3/16/2020|3/29/2020|2 weeks| |
|**Sprint 9.5**|3/30/2020|4/12/2020|2 weeks| |
|**Sprint 9.6**|3/13/2020|4/19/2020|1 week | |
|**Phase-4 PI 10 On-site**|4/21/2020|4/23/2020|3 days| Tanzania |

### Notes

1. A new release for **helm** repo is made whenver a configuration change is needed for any of the core Switch services based on the changes made \(features, bug-fixes\).
2. However, if there is no release made to helm necessitated by a configuration change, then a release is done every Sprint anyway, to bring it up to date with the latest releases on the core Switch services.

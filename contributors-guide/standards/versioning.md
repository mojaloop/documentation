# Versioning

## Versioning of releases made for core Switch services

This document provides guidelines regarding the versioning strategy used for the releases of Mojaloop Open Source repositories corresponding to the Switch services.

### Versioning Strategy

1. The current versioning system is inspired by the [Semantic Versioning](https://semver.org/) numbering system for releases.
2. However, this is customized to depict the timelines of the Mojaloop project, based on the Program Increment \(PI\) and Sprint numbers
3. For example, the release number v5.1.0 implies that this release was the first one made during a Sprint 5.1, where Sprint5.1 is the first Sprint in PI-5. So for a version vX.Y.Z, X.Y is the Sprint number where X is the PI number and Z represents the number of release for this specific repository. Example v4.4.4 implies that the current release is the fourth of four releases made in Sprint 4.4 \(of PI-4\)

**Note**: Starting PI-11 the Versioning guidance is to move to a versioning system thats closely aligned with Semantic versioning by removing the PI/Sprint dependency. So starting 11.x.x, the proposal is to move to pure SemVer. For PI10 however, we'll continue with the same versioning system outlined in points 1-3 above.

### Current Version

The currrent version information for Mojaloop can be found [here](../../deployment-guide/releases.md).

### Sprint schedule for PI9

Below is the Sprint schedule for Program Increment 9 which ends with the PI 10 on-site event at the of January 2020 in Tanzania. Please use this as guidance during the versioning and release processes.

|Phase/Milestone|Start|End|Weeks|Notes|
|---|---|---|---|---|
|**Phase-3 PI6 On-site**|4/16/2019|4/18/2019|3 days| Johannesburg|
|**Phase-3 PI7 On-site**|6/25/2019|6/27/2019|3 days| Arusha|
|**Phase-3 PI8 On-site**|9/10/2019|9/12/2019|3 days| Abidjan|
|**Phase-4 Kick-off On-site**|1/28/2020|1/30/2020|3 days| Johannesburg|
|**Phase-4 PI 10 Virtual**|4/21/2020|4/24/2020|5 days| Virtual Zoom Webinars |
|**Sprint 10.1**|4/27/2020|5/10/2020|2 weeks| |
|**Sprint 10.2**|5/11/2020|5/24/2020|2 weeks| |
|**Sprint 10.3**|5/25/2020|6/7/2020|2 weeks| |
|**Sprint 10.4**|6/8/2020|6/21/2020|2 weeks| |
|**Sprint 10.5**|6/22/2020|7/5/2020|2 weeks| |
|**Sprint 10.6**|7/6/2020|7/19/2020|2 weeks | |
|**Phase-4 PI 11 On-Site**|7/21/2020|7/23/2020|3 days| Kenya (Tentative) |

### Previous Sprint Schedules:

#### PI9
|Phase/Milestone|Start|End|Weeks|Notes|
|---|---|---|---|---|
|**Sprint 9.1**|2/3/2020|2/16/2020|2 weeks| |
|**Sprint 9.2**|2/17/2020|3/1/2020|2 weeks| |
|**Sprint 9.3**|3/2/2020|3/15/2020|2 weeks| |
|**Sprint 9.4**|3/16/2020|3/29/2020|2 weeks| |
|**Sprint 9.5**|3/30/2020|4/12/2020|2 weeks| |
|**Sprint 9.6**|3/13/2020|4/19/2020|1 week | |
|**Phase-4 PI 10 Virtual**|4/21/2020|4/23/2020|5 days| Virtual Zoom Webinars |

#### PI8
|Phase/Milestone|Start|End|Weeks|Notes|
|---|---|---|---|---|
|**Sprint 8.1**|9/16/2019|9/29/2019|2 weeks| |
|**Sprint 8.2**|9/30/2019|10/13/2019|2 weeks| |
|**Sprint 8.3**|10/14/2019|10/27/2019|2 weeks| |
|**Sprint 8.4**|10/28/2019|11/10/2019|2 weeks| |
|**Sprint 8.5**|11/11/2019|11/24/2019|2 weeks| |
|**Sprint 8.6**|11/25/2019|12/8/2019|2 weeks| |
|**Sprint 8.7**|12/9/2019|1/5/2020|4 weeks| Christmas Break|
|**Sprint 8.8**|1/6/2020|1/26/2020|3 weeks| 1 week prep|
|**Phase-4 Kick-off On-site**|1/28/2020|1/30/2020|3 days| Johannesburg|

### Notes

1. A new release for **helm** repo is made whenver a configuration change is needed for any of the core Switch services based on the changes made \(features, bug-fixes\).
2. However, if there is no release made to helm necessitated by a configuration change, then a release is done every Sprint anyway, to bring it up to date with the latest releases on the core Switch services.

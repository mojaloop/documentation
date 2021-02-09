# Versioning

## Versioning of releases made for core Switch services

This document provides guidelines regarding the versioning strategy used for the releases of Mojaloop Open Source repositories corresponding to the Switch services.

### Versioning Strategy


#### Standard for PI-11 and beyond
1. Starting PI-11 (27th July, 2020) the Versioning guidance is to move to a versioning system that is closely aligned with Semantic versioning by removing the PI/Sprint dependency. So starting 11.x.x, the proposal is to move to pure [SemVer](https://semver.org/).
2. At a high-level, we will still follow the vX.Y.Z format, but X represents ‘Major’ version, Y represents ‘Minor’ version and Z represents ‘patch’ version. Minor fixes, patches affect increments to ‘Z’, whereas non-breaking functionality changes affect changes to ‘Y; breaking changes affect the ‘X’ version.
3. Along with these, suffixes such as “-snapshot”, “-patch”, “-hotfix” are used as relevant and on need basis (supported by CI config).
4. So starting with 11.0.0 (primarily for Helm, but for individual services as well) for PI-11, the proposal is to move to pure [SemVer](https://semver.org/).
5. This implies that for any new release of a package/service below X=11 will first be baselined to v11.0.0 and from then on follow standard SemVer guidelines as discussed above


#### Versioning Strategy used until PI-10
1. The Mojaloop (up to PI-10) versioning system is inspired by the [Semantic Versioning](https://semver.org/) numbering system for releases.
2. However, this is customized to depict the timelines of the Mojaloop project, based on the Program Increment \(PI\) and Sprint numbers
3. For example, the release number v5.1.0 implies that this release was the first one made during a Sprint 5.1, where Sprint5.1 is the first Sprint in PI-5. So for a version vX.Y.Z, X.Y is the Sprint number where X is the PI number and Z represents the number of release for this specific repository. Example v4.4.4 implies that the current release is the fourth of four releases made in Sprint 4.4 \(of PI-4\)



### Current Version

The currrent version information for Mojaloop can be found [here](../../deployment-guide/releases.md).

### Sprint schedule for PI-13

Below is the Sprint schedule for Program Increment 13 which ends with the PI-14 Community event in April 2021.

|Phase/Milestone|Start|End|Weeks|Notes|
|---|---|---|---|---|
|**Phase-5 Kick-off On-site**|1/25/2021|1/29/2021|5 days| Virtual Zoom Webinars|
|**Sprint 13.1**|02/01/2021|02/14/2021|2 weeks | |
|**Sprint 13.2**|02/15/2021|02/28/2021|2 weeks | |
|**Sprint 13.3**|03/01/2021|03/14/2021|2 weeks | |
|**Sprint 13.4**|03/15/2021|03/28/2021|2 weeks | |
|**Sprint 13.5**|03/29/2021|04/11/2021|2 weeks | |
|**Sprint 13.6**|04/12/2021|04/25/2021|2 weeks | |
|**Phase-5 PI-14**|04/26/2021|04/30/2021|5 days| Virtual meetings |

### Sprint schedule for PI-12

Below is the Sprint schedule for Program Increment 12 which ends with the PI-13 Community event in January 2021.

|Phase/Milestone|Start|End|Weeks|Notes|
|---|---|---|---|---|
|**Phase-4 Kick-off On-site**|1/28/2020|1/30/2020|3 days| Johannesburg|
|**Phase-4 PI-10 Virtual**|4/21/2020|4/24/2020|4 days| Virtual Zoom Webinars|
|**Phase-4 PI-11 Virtual**|7/21/2020|7/24/2020|4 days| Virtual Zoom Webinars|
|**Phase-4 PI-12 Virtual**|10/19/2020|10/23/2020|5 days| Virtual Zoom Webinars|
|**Sprint 12.1**|10/26/2020|11/15/2020|3 weeks | |
|**Sprint 12.2**|11/16/2020|11/29/2020|2 weeks | |
|**Sprint 12.3**|11/30/2020|12/13/2020|2 weeks | |
|**Sprint 12.4**|12/14/2020|12/27/2020|2 weeks | |
|**Sprint 12.5**|12/28/2020|01/10/2021|2 weeks | |
|**Sprint 12.6**|01/11/2020|01/24/2020|2 weeks | |
|**Phase-5 Kick-off / PI-13**|01/25/2021|01/29/2021|5 days| TBD |

### Previous Sprint Schedules:

### Sprint schedule for PI-11

Below is the Sprint schedule for Program Increment 11 which ends with the PI 12 Event.

|Phase/Milestone|Start|End|Weeks|Notes|
|---|---|---|---|---|
|**Phase-4 Kick-off On-site**|1/28/2020|1/30/2020|3 days| Johannesburg|
|**Phase-4 PI-10 Virtual**|4/21/2020|4/24/2020|4 days| Virtual Zoom Webinars |
|**Phase-4 PI-11 Virtual**|7/21/2020|7/24/2020|4 days| Virtual Zoom Webinars |
|**Sprint 11.1**|7/27/2020|8/9/2020|2 weeks| |
|**Sprint 11.2**|8/10/2020|8/23/2020|2 weeks| |
|**Sprint 11.3**|8/24/2020|9/6/2020|2 weeks| |
|**Sprint 11.4**|9/7/2020|9/20/2020|2 weeks| |
|**Sprint 11.5**|9/21/2020|10/4/2020|2 weeks| |
|**Sprint 11.6**|10/5/2020|10/18/2020|2 weeks | |
|**Phase-4 PI-12**|10/20/2020|10/23/2020|4 days| TBD |

#### Sprint schedule for PI-10

Below is the Sprint schedule for Program Increment 10 which ends with the PI 11 Event. Please use this as guidance during the versioning and release processes.

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

#### PI-9
|Phase/Milestone|Start|End|Weeks|Notes|
|---|---|---|---|---|
|**Sprint 9.1**|2/3/2020|2/16/2020|2 weeks| |
|**Sprint 9.2**|2/17/2020|3/1/2020|2 weeks| |
|**Sprint 9.3**|3/2/2020|3/15/2020|2 weeks| |
|**Sprint 9.4**|3/16/2020|3/29/2020|2 weeks| |
|**Sprint 9.5**|3/30/2020|4/12/2020|2 weeks| |
|**Sprint 9.6**|3/13/2020|4/19/2020|1 week | |
|**Phase-4 PI 10 Virtual**|4/21/2020|4/23/2020|5 days| Virtual Zoom Webinars |

#### PI-8
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

1. A new release for **helm** repo is made based on the feature and configuration changes made to core services and requirements from thhe Community.

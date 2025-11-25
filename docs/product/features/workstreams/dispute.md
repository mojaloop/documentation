# Dispute Management Workstream
This workstream aims to develop a Dispute Management solution that can be integrated with the Mojaloop Core and connected DFSPs to meet the needs of Hub Operators and participating DFSPs, across the full range of deployment types.

# Business Justification
The reliable nature of Mojaloop transactions has meant that there is a need to develop a bespoke, open source solution for dispute management. 

Off the shelf alternatives generally assume that switches operate with limited discovery and little or no agreement of terms, so giving plenty of opportunity for dispute, and consequently these platforms are not a good match for a Mojaloop deployment.

## Contributors
|Workstream Lead|Contributors|
|:--------------:|:--------------:|
| Promesse Ishimwe | Derrick Wamatu |

## Latest Update (Summary)
The approach that was defined in previous PIs was that the best match for Mojaloop's requirements is the dispute management platform that has been developed by Switch, for use with their Mojaloop deployment. Switch then agreed to donate this to the Mojaloop open source, though it was clear that further work would be required to make the code adopter-agnostic.

However, because of significant pressure on RSwitch to focus their attention on immediate operational matters, this workstream did not progress during PI28. It is hoped that this will be resolved during PI 29, and the process of generalisation can begin.
 
## Applicability

This version of this document relates to Mojaloop [Version 17.1.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0)

## Document History
  |Version|Date|Author|Detail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.0|25th November 2025| Paul Makin|Initial version|
# Versioning

## Versioning of releases made for core Switch services

This document provides guidelines regarding the versioning strategy used for the releases of Mojaloop Open Source repositories corresponding to the Switch services.

### Versioning Strategy

1. The current versioning system is inspired by the [Semantic Versioning](https://semver.org/) numbering system for releases.
2. However, this is customized to depict the timelines of the Mojaloop project, based on the Program Increment \(PI\) and Sprint numbers
3. For example, the release number v5.1.0 implies that this release was the first one made during a Sprint 5.1, where Sprint5.1 is the first Sprint in PI-5. So for a version vX.Y.Z, X.Y is the Sprint number where X is the PI number and Z represents the number of release for this specific repository. Example v4.4.4 implies that the current release is the fourth of four releases made in Sprint 4.4 \(of PI-4\)

### Current Version

The currrent version information for Mojaloop can be found [here](../mojaloop-deployment/current-versions.md).

### Notes

1. A new release for **helm** repo is made whenver a configuration change is needed for any of the core Switch services based on the changes made \(features, bug-fixes\).
2. However, if there is no release made to helm necessitated by a configuration change, then a release is done every Sprint anyway, to bring it up to date with the latest releases on the core Switch services.

### 


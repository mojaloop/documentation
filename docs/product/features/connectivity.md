# Connectivity

In principle, having developed and documented the [Mojaloop APIs](./transaction.md#Mojaloop APIs), this should be sufficient to enable DFSPs to connect to a Mojaloop Hub. However, as part of the Mojaloop Community's mission to address financial inclusion, it has long been felt that the key to minimising the cost and complexity of connecting a DFSP's back office to a Mojaloop Hub is through the provision of a portfolio of connectivity solutions, allowing a DFSP to select the approach that best meets their needs.

The current connectivity portfolio includes a toolkit that would allow a Systems Integrator (SI) to create a connection by combining the various elements of a toolkit in a way that best meets the DFSP's needs. These elements include:
  - Mojaloop Connection Manager (MCM);
  - Mojaloop Connector (for integrating with the Mojaloop Hub);
  - A set of example Core Connectors (for integrating with the DFSP's back office);
  - Integration Toolkit;
  - Documentation, including "how to" guides and templates.

For detailed guidance on which connectivity solution is most appropriate for different participant types and requirements, please refer to the [Participant Feature Matrix](./connectivity/participant-matrix.md).

This toolkit is complemented by three exemplar implementations, ready for customisation and use by a DFSP (or their SI):
  - "Premium Service Manager": A fully functional, Payment Manager-type service, for use by larger DFSPs. Operation of this needs significant resources; it must be hosted either in the DFSP's existing data centre or in the cloud.

  - "Enhanced Service Manager": Based on the "Standard Service Manager" (below), this extends it by adding a Kafka deployment and support for bulk payments. It can be hosted in a basic server, but the Raspberry Pi option is not recommended.

  - "Standard Service Manager": A minimal functionality Integration Toolkit-based solution (bundled with some form of BI tool). This can be hosted in a basic server, ranging from a mid-specification server for a large MFI or a small bank, right down to a Raspberry PI for the smallest DFSPs with less rigorous service continuity requirements and lower transaction volumes. The Standard Service Manager does not support bulk payments.


All DFSPs should be aware that reaping the benefits of an inclusive instant payments solution such as Mojaloop relies on the implementation of a "whole ecosystem" approach - and this means extending the reach of the Mojaloop service into the DFSPs' domains, giving them and their customers the advantages of assurance of transaction finality, lower cost and the reliable delivery of every valid transaction.

Note that the adoption of an exemplar installation affects the type of service a DFSP can provide to their customers. The Premium option is suitable for DFSPs with high throughout and reliability requirements, the Enhanced option places some limits on throughput and availability and may be best suited to medium or small DFSPs, and the Standard option places strict limits on throughput and availability and removes the ability to initiate bulk payments, and so may only be suitable for small DFSPs.

## Applicability

This version of this document relates to Mojaloop Version [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0)

## Document History
  |Version|Date|Author|Detail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.2|9th June 2025| Tony Williams|Added reference to participant feature matrix|
|1.1|14th April 2025| Paul Makin|Updates related to the release of V17|
|1.0|5th February 2025| Paul Makin|Initial version|
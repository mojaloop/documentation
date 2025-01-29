# Connectivity

How to connect to a Mojaloop Hub
the portfolio should comprise:

- The tools that would be needed by either a DFSP’s developers, or by an SI engaged to carry out the integration. This would include:
    - Mojaloop Connection Manager (MCM);
    - Mojaloop Connector;
    - A set of example Core Connectors;
    - Integration Toolkit;
    - Documentation, including “how to” guides and templates.
- A set of exemplar implementations, ready for customisation and use by DFSPs/SIs:
    - “Premium Service Manager”: A fully functional, Payment Manager-type service, for use by larger DFSPs. Operation of this needs significant resources; it must be hosted either in the DFSP’s existing data centre or in the cloud.

    - “Enhanced Service Manager”: Based on the “Standard Service Manager” (below), this extends it by adding a Kafka deployment and support for bulk payments. It can be hosted in a basic server, but the Raspberry Pi option is not recommended.

    - “Standard Service Manager”: A minimal functionality Integration Toolkit-based solution (bundled with some form of BI tool). This can be hosted in a basic server, ranging from a mid-specification server for a large MFI or a small bank, right down to a Raspberry PI for the smallest DFSPs with less rigorous service continuity requirements and lower transaction volumes. The Standard Service Manager does not support bulk payments.


It should be emphasised to all DFSPs that reaping the benefits of an inclusive instant payments solution such as Mojaloop relies on the implementation of a “whole ecosystem” approach - and this means extending the reach of the Mojaloop service into the DFSPs’ domains, giving them and their customers the advantages of assurance of transaction finality, lower cost and the reliable delivery of every valid transaction.


Bulk only available in connectivity solutions with the appropriate capacity.
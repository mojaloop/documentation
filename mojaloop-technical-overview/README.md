# Mojaloop Technical Overview

## Mojaloop Services

The basic idea behind Mojaloop is that we need to connect multiple Digital Financial Services Providers (DFSPs) together into a competitive and interoperable network in order to maximize opportunities for poor people to get access to financial services with low or no fees. We don't want a single monopoly power in control of all payments in a country, or a system that shuts out new players. It also doesn't help if there are too many isolated subnetworks. The following diagrams shows the Mojaloop interconnects between DFSPs and the Mojaloop Hub (schema implementation example) for a Peer-to-Peer (P2P) Transfer:

Mojaloop addresses these issues in several key ways:
* A set of central services provides a hub through which money can flow from one DFSP to another. This is similar to how money moves through a central bank or clearing house in developed countries. Besides a central ledger, central services can provide identity lookup, fraud management, and enforce scheme rules.
* A standard set of interfaces a DFSP can implement to connect to the system, and example code that shows how to use the system. A DFSP that wants to connect up can adapt our example code or implement the standard interfaces into their own software. The goal is for it to be as straightforward as possible for a DFSP to connect to the interoperable network.
* Complete working open-source implementations of both sides of the interfaces - an example DFSP that can send and receive payments and the client that an existing DFSP could host to connect to the network.

![Mojaloop End-to-end Architecture Flow PI5](./assets/diagrams/architecture/Arch-Mojaloop-end-to-end-PI5.svg)

The Mojaloop Hub is the primary container and reference we use to describe the Mojaloop echo-system which is split in to the following domains:
* Mojaloop Open Source Services - Core Mojaloop Open Source Software (OSS) that has been supported by the Bill & Melinda Gates Foundation in partnership with the Open Source Community.
* Mojaloop Hub - Overall Mojaloop reference (and customizable) implementation for Hub Operators is based on the above OSS solution.

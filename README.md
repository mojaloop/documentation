# Mojaloop Overview

Mojaloop is open source software for creating digital payments platforms that connect all customers, merchants, banks, and other financial providers in a country's economy. Rather than a financial product or application in itself, Mojaloop establishes a blueprint for technology that bridges all the financial products and applications in any given market.

The basic idea behind Mojaloop is that we need to connect multiple Digital Financial Services Providers \(DFSPs\) together into a competitive and interoperable network in order to maximize opportunities for poor people to get access to financial services with low or no fees. We don't want a single monopoly power in control of all payments in a country, or a system that shuts out new players. It also doesn't help if there are too many isolated subnetworks.

![Mojaloop Solution](./mojaloop-technical-overview/assets/diagrams/architecture/Arch-Mojaloop-end-to-end-simple.svg)

Our model addresses these issues in several key ways:

* A set of central services provides a hub through which money can flow from one DFSP to another. This is similar to how money moves through a central bank or clearing house in developed countries. Besides a central ledger, central services can provide identity lookup, fraud management, and enforce scheme rules.
* A standard set of interfaces a DFSP can implement to connect to the system, and example code that shows how to use the system. A DFSP that wants to connect up can adapt our example code or implement the standard interfaces into their own software. The goal is for it to be as straightforward as possible for a DFSP to connect to the interoperable network.
* Complete working open-source implementations of both sides of the interfaces - an example DFSP that can send and receive payments and the client that an existing DFSP could host to connect to the network.

The intention for the Mojaloop project is for financial institutions and commercial providers to use the open-source software to help build digital, interoperable payments platforms that drive financial inclusion on a national scale. Specifically, the platforms will enable seamless, low-cost transactions between individual users, merchants, banks, providers, and even government offices - helping connect poor customers with everyone else in the digital economy.

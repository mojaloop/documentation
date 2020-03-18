# Onboarding

This document provides an overview of assets available for those interested in observing a Mojaloop environment running.

>_Want to get up and running as a contributor to Mojaloop? Check out the [Contributor's Guide](/contributors-guide/) and the [New Contributor Checklist](/contributors-guide/new-contributor-checklist.md)._

## Primary Assets

The following are the minimum requirements to run an end-to-end test of an environment:

- **Mojaloop Hub**: The Hub is the container of all the core central services of Mojaloop. The following are the options available to work with the Hub:
  - **Deployment guide:** If you wish to deploy Mojaloop on your own environment, please find the [Deployment Guide](./deployment-guide/). 
- **FSP Simulator:** This acts as a mock FSP to simulate the Payer and Payee roles in a transaction. Building and configurations details can be found in the [Github simulator repository](https://github.com/mojaloop/simulator).
- **Postman:** Postman is an application to send requests and receive responses. In the [Postman repository](https://github.com/mojaloop/postman) you can find some collections and environments that can be imported into a Postman client to interact with the Hub.

## FSP Resources

In case you want to build your own mock FSP instead of using the simulator, these are the available resources:

- **API Specification document:** This [document](https://github.com/mojaloop/mojaloop-specification/blob/master/documents/supporting-documentation/API%20Definition%20v1.0.pdf) introduces and describes the API specification that any FSP should implement to interact with Mojaloop. Also find the complete set of specification documents in the [Mojaloop specification repository](https://github.com/mojaloop/mojaloop-specification).
- **SDK Scheme Adapter:** The [SDK Scheme Adapter](https://github.com/mojaloop/sdk-scheme-adapter) demonstrates use of the Mojaloop SDK Standard Components to interface a DFSP backend system to a Mojaloop API compliant system. With the Scheme Adapter, you can turn an existing FSP implementation into a Mojaloop compatible one by implementing a simple REST interface.
- **SDK Standard Components:** The [SDK Standard Compoents](https://github.com/mojaloop/sdk-standard-components) is a NodeJS library that provides pluggable implementations of JWS Signing, ILP, a Mojaloop Requests library, and Mojaloop compliant errors out of the box.


## Complementary Assets

These are other valuable resources available for testing once you have setup your environment. Please note that some of these may still be at a development stage.

- **ALS oracle template:** An Account-Lookup Service (ALS) Oracle provides a look-up registry functionality. This is an accelerator template for ALS Oracle services or adapter components. Find the repository [here](https://github.com/mojaloop/als-oracle-template).
- **Cross-network and cross-currency POC:** Ongoing project that explores the design of the two scenarios described below. Find the repository [here](https://github.com/mojaloop/cross-network).
  - A payment that crosses multiple Mojaloop-based networks (where the sending and receiving currency may be the same or different).
  - A payment within a single Mojaloop-based network where the sending and receiving currencies are different.
- **POS/ATM integration:** Ongoing project to address use cases that require POS and ATM integration. Find the repository [here](https://github.com/mojaloop/terminal-integration).

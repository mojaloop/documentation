# Onboarding

This document provides an overview of assets available for those interested in observing a Mojaloop environment running.

## Primary assets

The following are the minimum requirements to run an end-to-end test of an environment:

- **Mojaloop Hub**: The Hub is the container of all the core central services of Mojaloop. The following are the options available to work with the Hub:
  - **Public sandbox:** If you want to test some transaction flows without going through the process of deploying the Hub, there is a sandbox already setup for testing. The corresponding links to it are contained in the Postman collections detailed below.
  - **Deployment guide:** If you wish to deploy Mojaloop on your own environment, please find the [Deployment Guide](../deployment-guide/). 
- **FSP Simulator:** This acts as a mock FSP to simulate the Payer and Payee roles in a transaction. Building and configurations details can be found in the [Github simulator repository](https://github.com/mojaloop/simulator).
- **Postman:** Postman is an application to send requests and receive responses. The following resources can be imported into a Postman client to interact with the Hub:
  - A **collection** containing a set of requests to run several operations: [Postman collection](https://raw.githubusercontent.com/mojaloop/postman/master/Mojaloop.postman_collection.json).
  - An **environment** containing the values of the corresponding input parameters, pointing to the public Mojaloop sandbox: [Postman environment](https://raw.githubusercontent.com/mojaloop/postman/master/environments/MojaloopLocal.postman_environment.json).


## FSP resources

In case you want to build your own mock FSP instead of using the simulator, these are the available resources:

- **API Specification document:** This [document](https://github.com/mojaloop/mojaloop-specification/blob/master/API%20Definition%20v1.0.pdf) introduces and describes the API specification that any FSP should implement to interact with Mojaloop. Also find the complete set of specification documents in the [Mojaloop specification repository](https://github.com/mojaloop/mojaloop-specification).
- **ILP utility library:**  Mojaloop uses [Interledger](https://interledger.org/) (ILP) as a secure transport protocol for funds. This [Java project](https://github.com/mojaloop/interop-ilp-conditions) provides a library to generate ILP packets, conditions, fulfilments and their respective validations.

## Secondary assets

These are other valuable resources available for testing once you have setup your environment. Please note that some of these may still be at a development stage.

- **ALS oracle template:** An Account-Lookup Service (ALS) Oracle provides a look-up registry functionality. This is an accelerator template for ALS Oracle services or adapter components. Find the repository [here](https://github.com/mojaloop/als-oracle-template).
- **Cross-network and cross-currency POC:** Ongoing project that explores the design of the two scenarios described below. Find the repository [here](https://github.com/mojaloop/cross-network).
  - A payment that crosses multiple Mojaloop-based networks (where the sending and receiving currency may be the same or different).
  - A payment within a single Mojaloop-based network where the sending and receiving currencies are different.
- **POS/ATM integration:** Ongoing project to address use cases that require POS and ATM integration. Find the repository [here](https://github.com/mojaloop/terminal-integration).

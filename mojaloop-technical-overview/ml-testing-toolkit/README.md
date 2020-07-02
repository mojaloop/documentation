Mojaloop Testing Toolkit
=============================

The **Mojaloop Testing Toolkit** was designed for participants that would like to participate in the Mojaloop scheme. Intentionally build as a standard integration testing tool between a _Digital Financial Service Provider (DFSP)_ and the _Mojaloop Switch_ (Hub), to facilitate testing. This tool set can potentially be used by both the DFSP and the _Mojaloop Switch_ to verify the integration between the 2 entities.

For additional back ground information on the Self Testing Toolkit, please see [Mojaloop Testing Toolkit](https://github.com/mojaloop/ml-testing-toolkit/blob/master/documents/Mojaloop-Testing-Toolkit.md). It would be to the particpant's benefit to familiarise themselves with the understanding of the  [Architecture Diagram](https://github.com/mojaloop/ml-testing-toolkit/blob/master/documents/Mojaloop-Testing-Toolkit.md#7-architecture) that explains the various components and related flows.

## Usage Guides

For Web interface follow this [Usage Guide](https://github.com/mojaloop/ml-testing-toolkit/blob/master/documents/User-Guide.md)

For Command line tool follow this [CLI User Guide](https://github.com/mojaloop/ml-testing-toolkit/blob/master/documents/User-Guide-CLI.md)

**If you have your own DFSP implementation you can point the peer endpoint to **Mojaloop Testing Toolkit** on port 5000 and try to send requests from your implementation instead of using mojaloop-simulator.**

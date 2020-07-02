Mojaloop Testing Toolkit
=============================

The **Mojaloop Testing Toolkit** was designed to help Mojaloop Schemes scale effectively by easing the DFSP Onboarding process. Schemes can provide a set of rules and tests on the toolkit and DFSPs can use it for self testing (or self-certification in some cases). This ensures that DFSPs are well and truly ready with their implementations to be integrated with the Scheme and allows for a quick and smooth onboarding process for the Mojaloop Hubs, thereby increasing their scalability.

This was initially aimed at FSPs/Participants that would like to participate in a Mojaloop scheme. However, in its current form, this tool set can potentially be used by both DFSPs and _Mojaloop Hubs_ to verify integration between the 2 entities. Intentionally build as a standard integration testing tool between a _Digital Financial Service Provider (DFSP)_ and the _Mojaloop Switch_ (Hub), to facilitate testing. 

For additional back ground information on the Self Testing Toolkit, please see [Mojaloop Testing Toolkit](https://github.com/mojaloop/ml-testing-toolkit/blob/master/documents/Mojaloop-Testing-Toolkit.md). It would be to the particpant's benefit to familiarise themselves with the understanding of the  [Architecture Diagram](https://github.com/mojaloop/ml-testing-toolkit/blob/master/documents/Mojaloop-Testing-Toolkit.md#7-architecture) that explains the various components and related flows.

## Usage Guides

For Web interface follow this [Usage Guide](https://github.com/mojaloop/ml-testing-toolkit/blob/master/documents/User-Guide.md)

For Command line tool follow this [CLI User Guide](https://github.com/mojaloop/ml-testing-toolkit/blob/master/documents/User-Guide-CLI.md)

**If you have your own DFSP implementation you can point the peer endpoint to Mojaloop Testing Toolkit on port 5000 and try to send requests from your implementation instead of using mojaloop-simulator.**

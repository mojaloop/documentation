# The Mojaloop Roadmap

The Mojaloop Roadmap is developed and maintained by the Mojaloop foundation, in collaboration with the wider Community. It is reviewed and updated at each Community Meeting, and was last updated at the PI 23 Community meeting in Lusaka, Zambia.

The roadmap is built around the concept of [three pillars]( https://raw.githubusercontent.com/mojaloop/product-council/a0cf73a8fb4921a3bf03aab42416a0ae6c8aa94e/Mojaloop%20Pillars.png).

The Pillars are:

1. **Make Adoption Easier** – create tools to allow developers and adopters to deploy Mojaloop with minimum fuss and complication, in an environment which meets their technical, operational or regulatory needs.
2. **Achieve Scale** – make available as many “value add” functions as possible, in order to support adopters as they seek to achieve their goals, be these financial profitability or support of social aims; or indeed both.
3. **Connect to Other Systems** – We recognise that Mojaloop is not the only payments interoperability solution, so under this pillar we seek to develop as many options as possible to both interconnect with other payment services and switches, and to ensure that the underlying Mojaloop engine is optimised to support those interconnections.

The Pillars are themselves supported by a foundational **Quality Product** set of workstreams, which together support the continuing maintenance and enhancement of the Core Mojaloop solution.

The full roadmap can be [viewed here](https://github.com/mojaloop/product-council/blob/main/PI%2023%20Mojaloop%20Roadmap.png?raw=true).

This revision of the Roadmap extends from the release of Mojaloop 15.1 at the end of PI 22, to the end of PI 26 (February 2025). Mojaloop releases moved from numbering to names during PI 22, so we have Mojaloop Acacia about to be released; this will be followed by Mojaloop Zambezi, at the end of PI 23, building on Acacia and incorporating the outputs of workstreams including Merchant Payments and Foreign Exchange (international transfers).

We currently anticipate releasing Mojaloop Baobab, based on the vNext development effort and the Reference architecture, at the end of PI 24, the end of June 2024 (though this remains subject to achieving the necessary level of quality and functionality, to be achieved through a transition process which has its own roadmap). In turn, this will be replaced by Mojaloop Meerkat at the end of October 2024, which builds on Baobab by adding the outputs of workstreams that are as yet undefined. Further releases will follow the same process.

On the right of the Roadmap there are four tables. These list candidate workstreams for each pillar and the quality product foundation. These have been established as desirable features at various Community events, but they have not yet been adopted by the Community.

All of the Pillars have their own workstreams. For PI 23, the following technical workstreams have been adopted.

## Make Adoption Easier
* Support for On Premise Deployment
    * Improve support for non-Cloud deployment of Mojaloop, where this is required due to regulatory or other reasons
* Participation Tools
    * Ensure there is a range of options for Participating DFSPs to connect to a Mojaloop Hub, and that these options off comparable connectivity capabilities

## Achieve Scale
* Merchant Payments
    * Support for merchant payments using a Mojaloop Hub as the payments element for a merchant scheme that offers payments through either QR codes or USSD. This includes merchant registration and support for merchant acquiring.

## Connect to Other Systems
* Next Generation Settlement
    * Connecting to other payments systems and conducting cross-border transactions increases the complexity of settlement processes needed by a switch, and this workstream is updating Mojaloop’s settlement engine to provide the necessary flexibility.
* Foreign Exchange
    * This workstream is enhancing the Mojaloop Hub to support multi-currency transactions, through integration with an external FX Provider (FXP). The initial version will support one model (sender converts) and one FXP; future versions will support multiple models, multiple FXPs, and the use of a reserve currency as intermediary.
* MOSIP Integration
    * In order to better support social payments and national payments programs, this workstream is developing a solution which will allow payments to be routed to a MOSIP digital identity, instead of for example a mobile phone number. This workstream also works towards greater integration with other open source DPG projects, including Mifos, PHEE and OpenG2P, in support of using MOSIP IDs to generate payments lists for bulk delivery of social payments.
## Make Adoption Easier
* Performance Characterisation
    * Identify and implement changes to the Mojaloop Hub core software that can improve performance, as we move towards a number of national deployments.
* Adopt Tigerbeetle
    * Use Tigerbeetle for ledger updates during transaction processing to achieve even greater performance (we don’t expect his to be in place before the release of Mojaloop Baobab)
* Core Team
    * Maintains the Mojaloop core through fixes to critical bugs, prioritized feature enhancements and upgrades in dependencies, and undertakes the Release process of the core services and some adjacent services or products that are part of the Mojaloop Platform.
* Platform Quality and Security
    * Assessment, maintenance and enhancement of the cybersecurity of the Mojaloop platform, encompassing connectivity to participating DFSPs (including transactions) and the security of hub operator portals.

In addition to these technical workstreams, we have a number of **Strategic Workstreams**, which are intended to address long term, strategic issues, such as a migration to supporting ISO 20022, or monitoring developments in cross-border transactions. It is expected that the outputs of strategic workstreams will include the periodic specification of candidate technical workstreams, for potential adoption in future PIs.

![image](https://github.com/mojaloop/documentation/assets/111573912/fe6b0f9c-9832-4fcb-ad79-fb7aaaf3f443)


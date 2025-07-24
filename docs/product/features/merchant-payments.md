# Merchant Payments

!!!! **WORK IN PROGRESS - WILL BE COMPLETED SHORTLY** !!!!

## Where Merchant Payments Fits In
In the Mojaloop world, merchant payments is not something that is built into the Hub itself. Instead it's an overlay service, which uses the services of the Hub, and forms part of the complete Mojaloop open source package.

In terms of scheme operations, a merchant payments scheme could be offered as part of an overall payments service by the operator of the Mojaloop Hub. It's also possible that a merchant payments scheme could be offered by an entirely separate operator, in collaboration with the Hub operator.
## Concepts
Merchants must be registered as such in the Mojaloop model (note that this is different from being registered as a business; the "sole trader" model is also supported). During this process, merchant KYB data is captured in the Merchant Registry, and a DFSP-agnostic merchant ID is generated. This merchant ID can be displayed by merchants in their premises, for the purpose of USSD payments by customers with feature phones. It is also intended to be embedded in static QR codes, for scanning by customers with smartphones whose DFSP app supports this.

The model adopted for merchant payments is based on a P2B push payment. The alias resolution capability of the Mojaloop Hub is used to resolve merchant IDs (either extracted from a QR code, or directly entered via USSD) to merchant accounts at participating DFSPs. This ensures that no sensitive information is leaked by displaying merchants' DFSPs or account numbers. When used with a QR code, best practice is to display the merchant's Trading Name to the customer for their verification, and to request that they enter the transaction value and authenticate themselves (for example, by entering a PIN) to authorise the transaction. Once the transaction has completed, both eh customer and the merchant will receive a notification, and the merchant may then release the purchased item(s) to the customer.
## Registration
Merchant registration is intended to be carried out by DFSPs, as part of their relationship with the merchant I their "Issuer" role. The merchant data is held in a shared Merchant Registry, but the registering DFSP retains their relationship with the merchant.

The merchant data captured

![Merchant Payments Entity Relationship Diagram](./ecosystem.svg)





At the time of registration, a significant amount of information is captured about the merchant in the Merchant Registry. 

Addressing:
USSD vs QR
Merchant Registry - the link to LEIs
Creation of a QR code (with reference to EMVCo)
Customisation of the QR code - how to make it conform to a scheme's or a country's standard.

In future: link to GLEIF
# Third Party API

The Third Party API is an API for non-fund-holding participants to interact over a centralized Mojaloop hub.
Specifically, this API allows Payment Initiation Service Providers (PISPs) to act as a proxy in initiating
payments, while allowing for the strong authentication of users.

## Terms

The following terms are commonly used across the Third Party API Documentation

| **Term** | **Alternative and Related Terms** | **Definition** | **Source** |
| --- | --- | --- | --- |
| **Payment Initiation Service Provider** | PISP, 3rd Party Payment Initiator (3PPI) | Regulated entities like retail banks or third parties, that allow customers to make payments without accessing bank accounts or cards | [PSD2](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32015L2366&qid=1633311418487) |
| **FSP** | Provider, Financial Service Provider (FSP), Payment Service Provider, Digital Financial Services Provider (DFSP) | The entity that provides a digital financial service to an end user (either a consumer, a business, or a government.) In a closed-loop payment system, the Payment System Operator is also the provider. In an open-loop payment system, the providers are the banks or non-banks which participate in that system. | [ITU-T](https://www.itu.int/dms_pub/itu-t/opb/tut/T-TUT-ECOPO-2018-PDF-E.pdf) |
| **User**                                | End User                                 | An end user that is shared between a PISP and DFSP. Mostly used in the context of a real human being, but this could also be a machine user, or a business for example |
| **Consent**                             | Account Link                             | A representation of an agreement between the DFSP, PISP and User | |
| **Auth-Service**                        |                                          | A service run by the Mojaloop Hub that is responsible for verifying and storing Consents, and verifying transaction request signatures | |

## API Definitions

The Third Party API is defined across the following OpenAPI 3.0 files:

- [Third Party API - PISP](./thirdparty-pisp-v1.0.yaml)
- [Third Party API - DFSP](./thirdparty-dfsp-v1.0.yaml)

The implementation of these APIs will depend on the role of the participant. PISPs should implement the [Third Party API - PISP](./thirdparty-pisp-v1.0.yaml)
interface in order to request and manage Account Linking operations, and initiate Third Party Transaction Requests.

DFSPs who wish to support Account Linking operations, and be able to respond to and verify Third Party Transaction Requests should
implement the [Third Party API - DFSP](./thirdparty-dfsp-v1.0.yaml).

## Transaction Patterns

The interactions and examples of how a DFSP and PISP will interact with the Third Party API can be found in the following Transaction Patterns Documents:

1. [Linking](./transaction-patterns-linking.md) describes how an account link and credential can be established between a DFSP and a PISP
2. [Transfer](./transaction-patterns-transfer.md) describes how a PISP can initate a payment from a DFSP's account using the account link

## Data Models

The [Data Models Document](./data-models.md) describes in detail the Data Models used in the Third Party API

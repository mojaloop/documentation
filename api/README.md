# API Specifications

## Mojaloop API

Documentation: [Mojaloop Specification]({{ book.importedVars.mojaloop.spec.uri.doc }})

* [Mojaloop API {{ book.importedVars.mojaloop.spec.version }} Specification](./mojaloop-api-specification.md)
* [Swagger]({{ book.importedVars.mojaloop.spec.uri.api }})

### Versions

| Version | Info | Release Date |
| --- | --- | --- |
| 1.0 | Initial release | 2018-11-01 |
|  |  |  |

## ALS Oracle API

Documentation: [ALS Design](../mojaloop-technical-overview/account-lookup-service/README.md)

* [ALS Oracle API {{ book.importedVars.als.oracle.spec.version }} Specification](./mojaloop-api-specification.md)
* [Swagger]( {{ book.importedVars.als.oracle.spec.uri.api }} )

Notes:
* ALS Oracle API is based on the [Mojaloop Specification]({{ book.importedVars.mojaloop.spec.uri.doc }}) with the following main differences:
  - Operations follow traditional REST API paradigms more strictly.
  - Operations are **synchronous** with an immediate response unlike [Mojaloop Specification]({{ book.importedVars.mojaloop.spec.uri.doc }}) which provides a responds via **asynchronous callbacks**.
  - `PUT /participants` is to update existing records and not a Callback as per the [Mojaloop Specification]({{ book.importedVars.mojaloop.spec.uri.doc }})
  - `GET /participants` response body returns a list of Participants, containing `currency`.
  - `POST /participants` request body includes the `currency` as part of each record. 

### Versions

| Version | Info | Release Date |
| --- | --- | --- |
| 1.1 | `PUT /participants/{Type}/{ID}` returns a `HTTP 204 - No Content on success`. This was previously returned `HTTP 200 - Success` <br>`POST /participants` now returns a list a `partyList` either containing a `PartyIdInfo` or `ErrorInformation`. This is alignment to the Mojaloop Specification. | 2019-03-28 |
| 1.0 | Initial release | 2019-03-08 |
|  |  |  |
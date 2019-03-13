# API Specifications

## Mojaloop API

Documentation: [Mojaloop Specification]({{ book.importedVars.mojaloop.spec.uri.doc }})

* [Mojaloop API {{ book.importedVars.mojaloop.spec.version }} Specification](./mojaloop-api-specification.md)
* [Swagger]({{ book.importedVars.mojaloop.spec.uri.api }})

## ALS Oracle API

Documentation: [ALS Design](../mojaloop-technical-overview/account-lookup-service.md)

* [ALS Oracle API {{ book.importedVars.als.oracle.spec.version }} Specification](./mojaloop-api-specification.md)
* [Swagger]( {{ book.importedVars.als.oracle.spec.uri.api }} )

Notes:
* ALS Oracle API is baed on the [Mojaloop Specification]({{ book.importedVars.mojaloop.spec.uri.doc }}) with the following main differences:
  - Operations follow traditional REST API paradigms more strictly.
  - Operations are **synchronous** with an immediate response unlike [Mojaloop Specification]({{ book.importedVars.mojaloop.spec.uri.doc }}) which provides a responds via **asynchronous callbacks**.
  - `PUT /participants` is to update existing records and not a Callback as per the [Mojaloop Specification]({{ book.importedVars.mojaloop.spec.uri.doc }})
  - `GET /participants` response body returns a list of Participants, containing `currency`.
  - `POST /participants` request body includes the `currency` as part of each record. 
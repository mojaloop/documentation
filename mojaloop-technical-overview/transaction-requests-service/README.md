# Transaction Requests Service

## Sequence Diagram

{% uml src="mojaloop-technical-overview/transaction-requests-service/assets/diagrams/sequence/trx-service-overview-spec.plantuml" %}
{% enduml %}

* The transaction-requests-service is a mojaloop core service that enables Payee initiated use cases such as "Merchant Request to Pay".
* This is a pass through service which also includes Authorizations.

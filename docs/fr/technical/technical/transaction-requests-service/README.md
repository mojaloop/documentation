---
i18n_source_sha: aafe06e92ef8eaa07bbe44e3b7c8e0d162cc67bd
---

# Service des demandes de transaction

## Diagramme de séquence

![](./assets/diagrams/sequence/trx-service-overview-spec.svg)

* Le **transaction-requests-service** est un service cœur Mojaloop qui permet les cas d’usage initiés par le Bénéficiaire, tels que la « demande de paiement du marchand » (*Merchant Request to Pay*).
* Il s’agit d’un service de transit qui inclut également les **Autorisations**.

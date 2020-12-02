# Mojaloop Personas

# Document Purpose

To specify the different types of personas/roles that will need access to the Mojaloop portal and documentation.

## Contributor

A contributor is someone that is actively involved in contributing to the Mojaloop project code, tests, and documentation. Some scenarios could include a developer, technical writer, or product manager. These people might be brand new to the project or someone that is well versed with the project.

## Hub Operator

This person would be responsible for deploying a Mojaloop hub; they might already have a payments hub. A payment hub operator would need to know how the technical components work (ex how payments and messaging work, API flows, etc). They would also have to have operational control and participate in regulatory forums.

## Digital Financial Service Provider (DFSP)

A digital financial service provider, bank, mobile money operator is anyone that will have to talk/communicate directly with a Mojaloop hub. They will need to be familiar with the Mojaloop APIs and participate in scheme agreements with the other Mojaloop hub participants.

## Systems Integrator

This person would be responsible for deploying and customizing the Mojaloop components to work with an existing or new payment hub, DFSP or banking system. They would need equal access as the contributor but not necessarily have the system&#39;s full details, just those required for integration.

## Business Owner, Decision Maker or Stakeholder

A stakeholder is typically someone evaluating Mojaloop, potentially a new pilot customer or collaborator. Documentation for this individual needs to be at a higher level and explain the systems&#39; value proposition, overview, integration points and technology drill-downs.

## End-User (USSD user)

The end-user documentation would be minimal for someone using the USSD interface to interact on their flip phone. Some issues that might arise for the end-user would be pin reset and trouble adding new accounts.

## Customer Service

Customer service or support personnel included in this category needs to understand the system&#39;s user interfaces and operational hubs. Advanced (tier 2 or 3) personnel might also need access to the network overview, API&#39;s and logs to help troubleshoot issues.

End-User (merchant/bulk payment)

The documentation required for an end-user in using the bulk payment system would need to include an onboarding guide, have some integration information to potentially contact to a merchant&#39;s accounts payable system, and have some info regarding bulk payment status accounts. This documentation would also need to include the ability to set different thresholds.

## Auditor

The auditor role represents the board of directors and shareholders of a given institution. An example would be an auditor for a financial provider. This role will require a high-level knowledge of the system and access to foresic logs. This role might have access to the different operational hubs and might represent a specific function, and have different access levels for the various components.

## Regulator

The regulator ensures the safety and soundness of the financial systems. Like the auditor role, will require a high level of knowledge of the system and access to ~~the~~ forensic logs. This role might have access to the different operational hubs and might represent a specific function, and have different access levels for the various components.

## Administrator/Super User

This full access role will have similar needs as a contributor but will also need access to all logs and have password controls across the entire system. Ideally, this person(s) would have contributed to the level one project first and then go into this role eventually. There could potentially have different Super User by component. (i.e. one for DFSP 1, one for DFSP X, one for the Central ledger).

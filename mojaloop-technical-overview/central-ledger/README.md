# Central-Ledger Services

The central ledger is a series of services that facilitate clearing and settlement of transfers between DFSPs, including the following functions:

* Brokering real-time messaging for funds clearing
* Maintaining net positions for a deferred net settlement
* Propagating scheme-level and off-transfer fees

## 1. Central Ledger Process Design

### 1.1. Architecture overview

![Central-Ledger Architecture](./assets/diagrams/architecture/Arch-mojaloop-central-ledger.svg)

## 2. API Specification

Refer to **Central Ledger API** in the [API Specifications](../../api/README.md#central-ledger-api) section.

## 3 Database schema and overview

The **Central Ledger** database schema definition [Central-Ledger Database Schema Definition](./assets/diagrams/database/central-ledger-ddl-MySQLWorkbench.sql).

![Central-Ledger Database Diagram](./assets/diagrams/database/central-ledger-schema.png)
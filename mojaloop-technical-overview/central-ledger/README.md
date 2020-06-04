# Central-Ledger Services

The central ledger is a series of services that facilitate clearing and settlement of transfers between DFSPs, including the following functions:

* Brokering real-time messaging for funds clearing
* Maintaining net positions for a deferred net settlement
* Propagating scheme-level and off-transfer fees

## 1. Central Ledger Process Design

### 1.1 Architecture overview

![Central-Ledger Architecture](assets/diagrams/architecture/Arch-mojaloop-central-ledger.svg)

## 2. Transfers End-to-End Architecture

![Transfers Architecture for Mojaloop FSP Interoperability API v1.1](assets/diagrams/architecture/Transfers-Arch-End-to-End-v1.1.svg)
![Transfers Architecture for Mojaloop FSP Interoperability API v1.0](assets/diagrams/architecture/Transfers-Arch-End-to-End-v1.0.svg)

## 3. Database Design

### Note

The tables *Grey* colored tables are specific to the transfer process. The *Blue* and *Green* color tables are used for reference purposes during the Transfer process.

Summary of the tables specific to the transfer process;

- `transfer` - stores data related to the transfer;
- `transferDuplicateCheck` - used to identify duplication during the transfer requests process;
- `transferError` - stores information on transfer errors encountered during the transfer process;
- `transferErrorDuplicateCheck` - used to identify duplication error transfer processes;
- `transferExtensions` - stores information on the transfer extension data;
- `transferFulfilment` - stores data for transfers that have completed the prepare transfer process;
- `transferFulfilmentDuplicateCheck` - used the identify duplicate transfer fulfil requests;
- `transferParticipant` - participant information related to the transfer process;
- `transferStateChange` - use to track state changes of each individual transfer, creating and audit trail for a specific transfer request;
- `transferTimeout` - stores information of transfers that encountered a timeout exception during the process;
- `ilpPacket` - stores the ilp package for the transfer;

The remaining tables in the below ERD are either lookup (blue) or settlement-specific (red) and are included as direct or indirect dependencies to depict the relation between the transfer specific entities and the transfer tables.

The **Central Ledger** database schema definition [Central-Ledger Database Schema Definition](assets/database/central-ledger-ddl-MySQLWorkbench.sql).

![Central-Ledger Database Diagram](assets/database/central-ledger-schema.png)

## 4. API Specification

Refer to **Central Ledger API** in the [API Specifications](../../api/README.md#central-ledger-api) section.

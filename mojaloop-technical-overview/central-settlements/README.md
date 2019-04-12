# Central-Settlements Service

The Central Settlements service is part of the Mojaloop project and deployment.

* The central settlements service exposes Settlement API to manage the settlements between FSPs and the Central Hub. 
* The service manages Settlement Windows and Settlements Event Triggers and provides information about FSPs accounts and settlements.

## 1. Settlement Process Design

### 1.1. Architecture overview
![Settlements Architecture](./assets/diagrams/architecture/arch-mojaloop-settlements-pi4.svg)

## 2. Funds In/Out

Record Funds In and Record Funds Out operations are used respectively to deposit and withdraw funds into participant SETTLEMENT ledgers. The balance of the SETTLEMENT account relates to the NET_DEBIT_CAP set by the switch for every participant of the scheme. NET_DEBIT_CAP value is always lower or equal to the SETTLEMENT value. On the other side, the balance of the participant's POSITION account is limited to the value of the NET_DEBIT_CAP.

## 3. API Specification

Refer to **Central Settlements API** in the [API Specifications](../../api/README.md#central-settlements-api) section.

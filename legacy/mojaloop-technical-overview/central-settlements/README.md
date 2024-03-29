# Central-Settlements Service

The Central Settlements service is part of the Mojaloop project and deployment.

* The central settlements service exposes Settlement API to manage the settlements between FSPs and the Central Hub. 
* The service manages Settlement Windows and Settlements Event Triggers and provides information about FSPs accounts and settlements.

## 1. Settlement Process Design

### 1.1. Architecture overview

![The Settlements Architecture](./assets/diagrams/architecture/Arch-Mojaloop-Settlements-PI4.svg)

## 2. Funds In/Out

Record Funds In and Record Funds Out operations are used respectively to deposit and withdraw funds into participant SETTLEMENT ledgers. The balance of the SETTLEMENT account relates to the NET_DEBIT_CAP set by the switch for every participant of the scheme. NET_DEBIT_CAP value is always lower or equal to the SETTLEMENT value. On the other side, the balance of the participant's POSITION account is limited to the value of the NET_DEBIT_CAP.

## 3. API Specification

Refer to **Central Settlements API** in the [API Specifications](../../api/README.md#central-settlements-api) section.

## 4. Rules Engine

The rules engine is separate handler within the Central-Settlement handler, that can be deployed if needed. Rules format and way of operation can be found on [Rules Handler . Interchange fees example. File format.](./settlement-process/rules-handler-consume.md)
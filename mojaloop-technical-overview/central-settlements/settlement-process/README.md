# Settlement Process

## 1. Database Design

### Notes

- TODO: List settlement related tables and their purpose
- `tableName` - description

![Central Settlements. Service ERD](./assets/entities/central-settlements-db-schema.png)

* [Central Settlements Service DBeaver ERD](./assets/entities/central-settlements-db-schema-dbeaver.erd)

## 2. Sequence diagrams

### 2.1. Settlement Windows By Params

- TODO: Describe process purpose
- [Sequence Diagram for Get Settlement Windows by Parameters](get-settlement-windows-by-params.md)

### 2.2. Settlement Windows By Params

- TODO: Describe process purpose
- [Sequence Diagram for Request Settlement Window by Id](get-settlement-window-by-id.md)

### 2.3. Close Settlement Window

- TODO: Describe process purpose
- [Sequence Diagram for Close Settlement Window](post-close-settlement-window.md)

### 2.4. Create Settlement

- TODO: Describe process purpose
- [Sequence Diagram for Trigger Settlement Event](post-create-settlement.md)

### 2.5. Request Settlement

- TODO: Describe process purpose
- [Sequence Diagram for Get Settlement by Id](get-settlement-by-id.md)

### 2.6. Settlement Transfer Acknowledgment

- TODO: Describe process purpose & state transition
- [Sequence Diagram for Acknowledgement of Settlement Transfer](put-settlement-transfer-ack.md)

### 2.7. Settlement Abort

- TODO: Describe process purpose & up to when abort is possible
- [Sequence Diagram for Settlement Abort](put-settlement-abort.md)

### 2.8. Request Settlement By SPA

- TODO: Describe process purpose
- [Sequence Diagram for Get Settlement by Settlement/Participant/Account](get-settlement-by-spa.md)

### 2.9. Request Settlements By Params

- TODO: Describe process purpose
- [Sequence Diagram for Query Settlements by Parameters](get-settlements-by-params.md)

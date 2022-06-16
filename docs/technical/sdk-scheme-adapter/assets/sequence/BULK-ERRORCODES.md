# Bulk Transfers

## Error Cases 
### Discovery Phase
All the errors encountered during this phase will be accumulated in the mojaloop-connector and will be added to the `lastError` object and returned to the payer along with all other successful or failed transfers involved in the bulk transfer request.

mojaloop-connector will act as a pass-through for all the errors returned by the switch

```
            "lastError": {
              "httpStatusCode": 500,
              "mojaloopError": {
                "errorInformation": {
                  "errorCode": "3204",
                  "errorDescription": "Party not found",
                  "extensionList": {"extension": [{"key": "string","value": "string"}]}
                }
              }
            }
```

**Party Lookup Error Codes**

| Error Description                                                      | Error Code  |  HTTP Code       | Category                                                  |
|------------------------------------------------------------------------|-------------|------------------|-----------------------------------------------------------|
| Communication error                                                    | 1000        | 500              |  Technical Error                                          |
| Destination communication error	                                       | 1001        | 500              |  Technical Error                                          |
| Generic server error                                                   | 2000        | 500              |  Processing Error                                         |
| Internal server error	                                                 | 2001        | 500              |  Processing Error                                         |
| Generic validation error                                               | 3100        | 400              |  Request Validation Error                                 |
| Party not found	                                                       | 3204        | 404              |  Processing Error                                         |

### Transfer Phase
All the errors encountered during this phase will be accumulated in the mojaloop-connector and will be added to the `lastError` object and returned to the payer along with all other successful or failed transfers involved in the bulk transfer request.

mojaloop-connector will act as a pass-through for all the errors returned by the switch

```
            "lastError": {
              "httpStatusCode": 404,
              "mojaloopError": {
                "errorInformation": {
                  "errorCode": "3210",
                  "errorDescription": "Bulk transfer ID not found",
                  "extensionList": {"extension": [{"key": "string","value": "string"}]}
                }
              }
            }
```

**Transfer Error Codes**

| Error Description                                                      | Error Code  |  HTTP Code       | Category                                                  |
|------------------------------------------------------------------------|-------------|------------------|-----------------------------------------------------------|
| Communication error                                                    | 1000        | 500              |  Technical Error                                          |
| Destination communication error	                                     | 1001        | 500              |  Technical Error                                          |
| Generic server error                                                   | 2000        | 500              |  Processing Error                                         |
| Internal server error	                                                 | 2001        | 500              |  Processing Error                                         |
| Server timed out	                                                     | 2004        | 500              |  Processing Error                                         |
| Generic validation error                                               | 3100        | 400              |  Request Validation Error                                 |
| Bulk transfer ID not found                                             | 3210        | 404              |  Processing Error                                         |
| Generic expired error                                                  | 3300        | 500              |  Processing Error                                         |
| Transaction request expired                                            | 3301        | 500              |  Processing Error                                         |
| Transfer expired                                                       | 3303        | 500              |  Processing Error                                         |
| Generic Payee error                                                    | 5000        | 500              |  Processing Error                                         |
| Payee FSP insufficient liquidity                                       | 5001        | 500              |  Processing Error                                         |
| Generic Payee rejection                                                | 5100        | 500              |  Processing Error                                         |
| Payee rejected quote                                                   | 5101        | 500              |  Processing Error                                         |
| Payee FSP unsupported transaction type                                 | 5102        | 500              |  Processing Error                                         |
| Payee FSP rejected quote                                               | 5103        | 500              |  Processing Error                                         |

| Payee rejected transaction                                             | 5104        | 500              |  Processing Error                                         |
| Payee FSP rejected transaction                                         | 5105        | 500              |  Processing Error                                         |
| Payee unsupported currency                                             | 5106        | 500              |  Processing Error                                         |
| Payee limit error                                                      | 5200        | 500              |  Processing Error                                         |
| Payee permission error                                                 | 5300        | 500              |  Processing Error                                         |
| Generic Payee blocked error                                            | 5400        | 500              |  Processing Error                                         |
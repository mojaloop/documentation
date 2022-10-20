# Bulk Transfers

## Error Cases 
### Discovery Phase
All the errors encountered during this phase will be accumulated in the mojaloop-connector and will be added to the `lastError` object and returned to the Payer FSP along with all other successful or failed transfers involved in the bulk transfer request.

mojaloop-connector will act as a pass-through for all the errors returned by the switch

```
            "lastError": {
              "httpStatusCode": 202,
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
| Communication error                                                    | 1000        | 503              |  Technical Error                                          |
| Destination communication error	                                       | 1001        | 503              |  Technical Error                                          |
| Generic server error                                                   | 2000        | 503              |  Processing Error                                         |
| Internal server error	                                                 | 2001        | 503              |  Processing Error                                         |
| Timeout Resolving Party	                                               | 2004        | 503              |  Processing Error                                         |
| Generic validation error                                               | 3100        | 400              |  Request Validation Error                                 |
| Party not found	                                                       | 3204        | 202              |  Processing Error                                         |

### Agreement Phase
All the errors encountered during this phase will be accumulated in the mojaloop-connector and will be added to the `lastError` object and returned to the Payer FSP along with all other successful or failed transfers involved in the bulk transfer request.

mojaloop-connector will act as a pass-through for all the errors returned by the switch

```
            "lastError": {
              "httpStatusCode": 202,
              "mojaloopError": {
                "errorInformation": {
                  "errorCode": "3204",
                  "errorDescription": "Party not found",
                  "extensionList": {"extension": [{"key": "string","value": "string"}]}
                }
              }
            }
```

**Quotes Error Codes**

| Error Description                                                      | Error Code  |  HTTP Code       | Category                                                  |
|------------------------------------------------------------------------|-------------|------------------|-----------------------------------------------------------|
| Communication error                                                    | 1000        | 503              |  Technical Error                                          |
| Destination communication error	                                       | 1001        | 503              |  Technical Error                                          |
| Generic server error                                                   | 2000        | 503              |  Technical Error                                          |
| Internal server error	                                                 | 2001        | 503              |  Technical Error                                          |
| Not implemented	                                                       | 2002        | 501              |  Processing Error                                         |
| Service currently unavailable	                                         | 2003        | 503              |  Processing Error                                         |
| Server timed out	                                                     | 2004        | 503              |  Processing Error                                         |
| Server busy     	                                                     | 2005        | 503              |  Processing Error                                         |
| Generic client error                                                   | 3000        | 400              |  Request Validation Error                                 |
| Unacceptable version requested                                         | 3001        | 406              |  Not acceptable Error                                     |
| Unknown URI                                                            | 3002        | 404              |  Not Found Error                                          |
| Generic validation error                                               | 3100        | 400              |  Request Validation Error                                 |
| Malformed syntax	                                                     | 3101        | 400              |  Request Validation Error                                 |
| Missing mandatory element	                                             | 3102        | 400              |  Request Validation Error                                 |
| Too many elements       	                                             | 3103        | 400              |  Request Validation Error                                 |
| Too large payload       	                                             | 3104        | 400              |  Request Validation Error                                 |
| Invalid signature       	                                             | 3105        | 403              |  Forbidden Error                                          |
| Destination FSP Error       	                                         | 3201        | 404              |  Not Found Error                                          |
| Payer FSP ID not found       	                                         | 3202        | 404              |  Not Found Error                                          |
| Payee FSP ID not found       	                                         | 3203        | 404              |  Not Found Error                                          |
| Quote ID not found          	                                         | 3205        | 404              |  Not Found Error                                          |
| Bulk quote ID not found          	                                     | 3209        | 404              |  Not Found Error                                          |
| Generic expired error                                                  | 3300        | 503              |  Processing Error                                         |
| Quote expired                                                          | 3302        | 503              |  Processing Error                                         |
| Generic Payer error                                                    | 4000        | 400              |  Request Validation Error                                 |
| Generic Payer rejection                                                | 4100        | 403              |  Forbidden Error                                          |
| Payer limit error                                                      | 4200        | 400              |  Request Validation Error                                 |
| Payer permission error                                                 | 4300        | 403              |  Forbidden Error                                          |
| Generic Payer blocked error                                            | 4400        | 403              |  Forbidden Error                                          |
| Generic Payee error                                                    | 5000        | 503              |  Processing Error                                         |
| Payee FSP insufficient liquidity                                       | 5001        | 503              |  Processing Error                                         |
| Generic Payee rejection                                                | 5100        | 403              |  Forbidden Error                                          |
| Payee rejected quote                                                   | 5101        | 503              |  Processing Error                                         |
| Payee FSP unsupported transaction type                                 | 5102        | 503              |  Processing Error                                         |
| Payee rejected quote                                                   | 5103        | 503              |  Processing Error                                         |
| Payee unsupported currency                                             | 5106        | 503              |  Processing Error                                         |
| Payee limit error                                                      | 5200        | 503              |  Processing Error                                         |
| Payee permission error                                                 | 5300        | 403              |  Forbidden Error                                          |
| Generic Payee blocked error                                            | 5400        | 403              |  Forbidden Error                                          |



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
| Communication error                                                    | 1000        | 503              |  Technical Error                                          |
| Destination communication error	                                     | 1001        | 503              |  Technical Error                                          |
| Generic server error                                                   | 2000        | 503              |  Processing Error                                         |
| Internal server error	                                                 | 2001        | 503              |  Processing Error                                         |
| Server timed out	                                                 | 2004        | 503              |  Processing Error                                         |
| Generic validation error                                               | 3100        | 400              |  Request Validation Error                                 |
| Bulk transfer ID not found                                             | 3210        | 404              |  Processing Error                                         |
| Generic expired error                                                  | 3300        | 503              |  Processing Error                                         |
| Transaction request expired                                            | 3301        | 503              |  Processing Error                                         |
| Transfer expired                                                       | 3303        | 503              |  Processing Error                                         |
| Generic Payee error                                                    | 5000        | 400              |  Processing Error                                         |
| Payee FSP insufficient liquidity                                       | 5001        | 400              |  Processing Error                                         |
| Generic Payee rejection                                                | 5100        | 400              |  Processing Error                                         |
| Payee rejected quote                                                   | 5101        | 400              |  Processing Error                                         |
| Payee FSP unsupported transaction type                                 | 5102        | 400              |  Processing Error                                         |
| Payee FSP rejected quote                                               | 5103        | 400              |  Processing Error                                         |
| Payee rejected transaction                                             | 5104        | 400              |  Processing Error                                         |
| Payee FSP rejected transaction                                         | 5105        | 400              |  Processing Error                                         |
| Payee unsupported currency                                             | 5106        | 400              |  Processing Error                                         |
| Payee limit error                                                      | 5200        | 400              |  Processing Error                                         |
| Payee permission error                                                 | 5300        | 403              |  Processing Error                                         |
| Generic Payee blocked error                                            | 5400        | 400              |  Processing Error                                         |

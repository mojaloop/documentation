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
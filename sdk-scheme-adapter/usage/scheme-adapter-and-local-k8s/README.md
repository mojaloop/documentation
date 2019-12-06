# SDK Scheme Adapter and Local K8S cluster testing

A detailed documentation for dfsps who want to test the mojaloop cluster deployment with scheme adapter and a mock backend service.

![Overview](scheme-adapter-and-local-k8s-overview.png)

## Prerequisite

* A working mojaloop k8s cluster (Local / Cloud deployment)
* DFSP mock backend service
* sdk-scheme-adapter > 8.6.0

## Configuration & Starting services

### Mojaloop Local K8S cluster deployment
Please follow the below link to deploy your own cluster on local system.
https://mojaloop.io/documentation/deployment-guide/
MacOS is recommended and atleast 16GB Ram and 4 core processor is required.

After installation please complete the New FSP Onboarding collection available at the below link.
https://github.com/mojaloop/postman

And make sure the oracles & endpoints are configured correctly and can able to run "Golden Path Collection" successfully.

### DFSP Mock Backend service & SDK Scheme adapter
There SDK scheme adapter version should be greater than 8.6.0
The next step starts the scheme adapter from docker-compose file automatically.

Please download the following repository
https://github.com/mojaloop/sdk-mock-dfsp-backend

Edit the docker-compose.yml file and verify the following lines.

```
    version: '3'
    services:
      redis2:
        image: "redis:5.0.4-alpine"
        container_name: redis2
      backend:
        image: "mojaloop/sdk-mock-dfsp-backend"
        env_file: ./backend.env
        container_name: dfsp_mock_backend2
        ports:
          - "23000:3000"
        depends_on:
          - scheme-adapter2
    
      scheme-adapter2:
        image: "mojaloop/sdk-scheme-adapter:latest"
        env_file: ./scheme-adapter.env
        container_name: sa_sim2
        depends_on:
          - redis2
```

Edit the sim-backend.env file and change the OUTBOUND_ENDPOINT and DFSP_ID as below
```
DFSP_ID=safsp
OUTBOUND_ENDPOINT=http://sa_sim2:4001
```

Edit scheme-adapter.env and change the following lines
Please replace the endpoint values with the appropriate hostnames provided in /etc/hosts file.

```
    DFSP_ID=safsp
    CACHE_HOST=redis2
    ALS_ENDPOINT=account-lookup-service.local
    QUOTES_ENDPOINT=quoting-service.local
    TRANSFERS_ENDPOINT=ml-api-adapter.local
    BACKEND_ENDPOINT=dfsp_mock_backend2:3000
    AUTO_ACCEPT_PARTY=true
    AUTO_ACCEPT_QUOTES=true

```

Start the backend and scheme adapter using the following command.
```
cd src
docker-compose up -d
```


## Testing

### Additinal postman collections
Use the files "Mojaloop-Local.postman_environment_modified.json" and "OSS-Custom-FSP-Onboaring-SchemeAdapter-Setup.postman_collection.json" from postman repo.
https://github.com/mojaloop/postman

Change URLs in the environment file to your machine IP where applicable.
By selecting the environment file please run the custom collection in the postman to provision a new FSP called "safsp".
The endpoints for safsp will be set to the URL of the scheme adapter which is configured in environment file.

### Try to send money
Try to send funds from "safsp" (Mock DFSP) to a MSISDN which is in "payeedfsp" (Simulator in K8S) through scheme adapter.
Run the following curl command to issue command to Mock DFSP service.
```
curl -X POST \
  http://localhost:3000/send \
  -H 'Content-Type: application/json' \
  -d '{
    "from": {
        "displayName": "John Doe",
        "idType": "MSISDN",
        "idValue": "123456789"
    },
    "to": {
        "idType": "MSISDN",
        "idValue": "27713803912"
    },
    "amountType": "SEND",
    "currency": "USD",
    "amount": "100",
    "transactionType": "TRANSFER",
    "note": "testpayment",
    "homeTransactionId": "123ABC"
}'
```

You should get a response with COMPLETED currentState.

# Scheme Adapter to Scheme Adapter testing

A detailed documentation for dfsps who want to test the transfer of funds from a scheme adapter to another scheme adapter directly using mock backend and mojaloop simulator services.

![Overview](scheme-adapter-to-scheme-adapter-overview.png)

## Prerequisite

* Mojaloop Simulator
* DFSP mock backend service
* Scheme adapter is already included in both the above docker-compose scripts

## Configuration & Starting services

The idea is to run two docker-compose scripts in parallel from the above two services. To avoid conflicts we need to edit the docker-compose.yml files and specify the container names.

### Mojaloop Simulator service

Please download the Mojaloop Simulator repo
```
git clone https://github.com/mojaloop/mojaloop-simulator.git
```
* Edit the file src/docker-compose.yml and add the container names for all the containers. Please refer the following lines

```
version: '3'
services:
  redis1:
    image: "redis:5.0.4-alpine"
    container_name: redis1
  sim:
    image: "mojaloop-simulator-backend"
    build: ../
    env_file: ./sim-backend.env
    container_name: ml_sim1
    ports:
      - "13000:3000"
      - "3001:3001"
      - "3003:3003"
    depends_on:
      - scheme-adapter
  scheme-adapter:
    image: "mojaloop/sdk-scheme-adapter:latest"
    env_file: ./scheme-adapter.env
    container_name: sa_sim1
    ports:
      - "13500:3000"
      - "14000:4000"
    depends_on:
      - redis1
```

* Edit the file src/sim-backend.env file and change the container name of the scheme adapter in that. Please refer the following lines.

```
OUTBOUND_ENDPOINT=http://sa_sim1:4001
```

* Edit the file src/scheme-adapter.env file and change the container names of the another scheme adapter and mojaloop simulator. Please refer the following lines

```
DFSP_ID=payeefsp
CACHE_HOST=redis1
PEER_ENDPOINT=sa_sim2:4000
BACKEND_ENDPOINT=ml_sim1:3000
AUTO_ACCEPT_PARTY=true
AUTO_ACCEPT_QUOTES=true
VALIDATE_INBOUND_JWS=false
VALIDATE_INBOUND_PUT_PARTIES_JWS=false
JWS_SIGN=true
JWS_SIGN_PUT_PARTIES=true

```

Then try running the following command to run the services
```
cd src/
docker-compose up -d
```

We can now access the mojaloop simulator's test api on 3003.

A new party should be added to the simulator using the following command. Feel free to change the details you want.
```
curl -X POST "http://localhost:3003/repository/parties" -H "accept: */*" -H "Content-Type: application/json" -d "{\"displayName\":\"Test Payee1\",\"firstName\":\"Test\",\"middleName\":\"\",\"lastName\":\"Payee1\",\"dateOfBirth\":\"1970-01-01\",\"idType\":\"MSISDN\",\"idValue\":\"9876543210\"}"
```

Then try to run the following command to check the new party added.
```
curl -X GET "http://localhost:3003/repository/parties" -H "accept: */*"
```

Let's move on to setup another instance of scheme adapter with DFSP mock backend.

### DFSP Mock Backend service

The DFSP mock backend is a minimal implementation of an example DFSP. Only basic functions are supported at the moment.

Please download the following repository
```
git clone https://github.com/mojaloop/sdk-mock-dfsp-backend.git
```

Edit the files src/docker-compose.yml, src/backend.env and src/scheme-adapter.env and add the container names for all the containers. Please refer the following files.
docker-compose.yml
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
scheme-adapter.env
```
DFSP_ID=payerfsp
CACHE_HOST=redis2
PEER_ENDPOINT=sa_sim1:4000
BACKEND_ENDPOINT=dfsp_mock_backend2:3000
AUTO_ACCEPT_PARTY=true
AUTO_ACCEPT_QUOTES=true
VALIDATE_INBOUND_JWS=false
VALIDATE_INBOUND_PUT_PARTIES_JWS=false
JWS_SIGN=true
JWS_SIGN_PUT_PARTIES=true

```

backend.env
```
OUTBOUND_ENDPOINT=http://sa_sim2:4001
```

Then try running the following command to run the services
```
cd src/
docker-compose up -d
```

## Try to send money
Try to send funds from "payerfsp" (Mock DFSP) to a MSISDN which is in "payeefsp" (Mojaloop Simulator) through scheme adapter.
Run the following curl command to issue command to Mock DFSP service.
```
curl -X POST \
  http://localhost:23000/send \
  -H 'Content-Type: application/json' \
  -d '{
    "from": {
        "displayName": "John Doe",
        "idType": "MSISDN",
        "idValue": "123456789"
    },
    "to": {
        "idType": "MSISDN",
        "idValue": "9876543210"
    },
    "amountType": "SEND",
    "currency": "USD",
    "amount": "100",
    "transactionType": "TRANSFER",
    "note": "test payment",
    "homeTransactionId": "123ABC"
}'
```

You should get a response with COMPLETED currentState.

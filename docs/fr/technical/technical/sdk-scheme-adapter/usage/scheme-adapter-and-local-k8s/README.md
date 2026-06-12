# SDK Scheme Adapter et cluster Kubernetes local

Documentation pour tester un déploiement Mojaloop sur cluster Kubernetes avec le *scheme adapter* et un *mock backend* DFSP.

![Vue d’ensemble](scheme-adapter-and-local-k8s-overview.png)

## Prérequis

* Cluster Kubernetes Mojaloop opérationnel (local ou cloud)
* Service *DFSP mock backend*
* `sdk-scheme-adapter` > 8.6.0

## Configuration et démarrage des services

### Déploiement Mojaloop sur Kubernetes local

Suivre : https://mojaloop.io/documentation/deployment-guide/

Linux est recommandé ; prévoir au moins 16 Go de RAM et 4 cœurs.

Après installation, exécuter la collection Postman `OSS-New-Deployment-FSP-Setup.postman_collection` depuis https://github.com/mojaloop/postman

Vérifier la configuration des *oracles* et des endpoints, et l’exécution réussie de la *Golden Path Collection*.

### *Mock backend* DFSP et SDK Scheme Adapter

Utiliser une version du SDK *scheme adapter* supérieure à 8.6.0.  
L’étape suivante démarre le *scheme adapter* via `docker-compose`.

Cloner : https://github.com/mojaloop/sdk-mock-dfsp-backend

Vérifier `docker-compose.yml` :

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
    ports:
      - "4000:4000"
    depends_on:
      - redis2
```

Mettre à jour `backend.env` :
```
OUTBOUND_ENDPOINT=http://sa_sim2:4001
```

Mettre à jour `scheme-adapter.env` avec les hôtes adaptés (fichier `/etc/hosts` ou `extra_hosts`, voir ci-dessous) :

```
DFSP_ID=safsp
CACHE_HOST=redis2
ALS_ENDPOINT=account-lookup-service.local
QUOTES_ENDPOINT=quoting-service.local
TRANSFERS_ENDPOINT=ml-api-adapter.local
BACKEND_ENDPOINT=dfsp_mock_backend2:3000
AUTO_ACCEPT_PARTY=true
AUTO_ACCEPT_QUOTES=true
VALIDATE_INBOUND_JWS=false
VALIDATE_INBOUND_PUT_PARTIES_JWS=false
JWS_SIGN=true
JWS_SIGN_PUT_PARTIES=true
```

### Résolution de noms — macOS uniquement

Ajouter à `/etc/hosts` (remplacer l’IP par celle de la machine) :
```
192.168.5.101       ml-api-adapter.local account-lookup-service.local central-ledger.local central-settlement.local account-lookup-service-admin.local quoting-service.local moja-simulator.local central-ledger central-settlement ml-api-adapter account-lookup-service account-lookup-service-admin quoting-service simulator host.docker.internal moja-account-lookup-mysql
```

Remplacer `192.168.5.101` par votre adresse IP réelle accessible depuis les conteneurs si besoin.

### Résolution de noms — Linux uniquement

Ajouter `extra_hosts` sous `scheme-adapter2` dans `docker-compose.yml` pour résoudre `account-lookup-service.local`, `quoting-service.local` et `ml-api-adapter.local`, par exemple :

```
  scheme-adapter2:
    image: "mojaloop/sdk-scheme-adapter:latest"
    env_file: ./scheme-adapter.env
    container_name: sa_sim2
    ports:
      - "4000:4000"
    depends_on:
      - redis2
    extra_hosts:
      - "account-lookup-service.local:172.17.0.1"
      - "quoting-service.local:172.17.0.1"
      - "ml-api-adapter.local:172.17.0.1"
```

`172.17.0.1` est l’interface `docker0` par défaut ; vérifier qu’elle convient à votre installation.

### Démarrage

```
cd src
docker-compose up -d
```

## Tests

### Configurer un nouveau FSP

Télécharger :

* [Mojaloop-Local.postman_environment_modified.json](assets/postman_files/Mojaloop-Local.postman_environment_modified.json) — variables d’environnement pointant vers votre installation locale
* [OSS-Custom-FSP-Onboaring-SchemeAdapter-Setup.postman_collection.json](assets/postman_files/OSS-Custom-FSP-Onboaring-SchemeAdapter-Setup.postman_collection.json) — provisionnement d’un nouveau FSP

`SCHEME_ADAPTER_ENDPOINT` doit cibler votre *scheme adapter* local. Sous macOS, `http://host.docker.internal:4000` est souvent correct. Sous Linux, utiliser l’interface `docker0` (souvent `172.17.0.1`), comme indiqué plus haut.

Dans Postman, sélectionner l’environnement et exécuter la collection pour créer un FSP `safsp`. Les endpoints de `safsp` correspondront à l’URL du *scheme adapter* définie dans l’environnement.

### Ajouter le MSISDN cible au simulateur bénéficiaire (dans le cluster)

```
curl -X POST \
  http://moja-simulator.local/payeefsp/parties/MSISDN/27713803912 \
  -H 'Accept: */*' \
  -H 'Accept-Encoding: gzip, deflate' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Content-Length: 406' \
  -H 'Content-Type: application/json' \
  -H 'Host: moja-simulator.local' \
  -H 'User-Agent: PostmanRuntime/7.20.1' \
  -H 'cache-control: no-cache' \
  -d '{
    "party": {
        "partyIdInfo": {
            "partyIdType": "MSISDN",
            "partyIdentifier": "27713803912",
            "fspId": "payeefsp"
        },
        "name": "Siabelo Maroka",
        "personalInfo": {
            "complexName": {
                "firstName": "Siabelo",
                "lastName": "Maroka"
            },
            "dateOfBirth": "1974-01-01"
        }
    }
}'

curl -X POST \
  http://account-lookup-service.local/participants/MSISDN/27713803912 \
  -H 'Accept: application/vnd.interoperability.participants+json;version=1' \
  -H 'Connection: keep-alive' \
  -H 'Content-Length: 50' \
  -H 'Content-Type: application/vnd.interoperability.participants+json;version=1.0' \
  -H 'Date: Fri, 21 Dec 2018 12:17:01 GMT' \
  -H 'FSPIOP-Source: payeefsp' \
  -H 'Host: account-lookup-service.local' \
  -H 'User-Agent: PostmanRuntime/7.11.0' \
  -H 'accept-encoding: gzip, deflate' \
  -H 'cache-control: no-cache,no-cache' \
  -d '{
    "fspId": "payeefsp",
    "currency": "USD"
}'
```

### Essayer un envoi de fonds

Envoyer des fonds depuis `safsp` (*Mock DFSP*) vers un MSISDN enregistré chez `payeefsp` (simulateur dans le cluster).

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

La réponse doit indiquer `currentState` à **COMPLETED**.

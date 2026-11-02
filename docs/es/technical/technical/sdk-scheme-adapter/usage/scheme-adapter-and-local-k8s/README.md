---
i18n_source_sha: 5accc7ec13dd7476c3337da388c97877f2623ab4
---

# SDK: Pruebas del adaptador de Esquema de pagos y del clúster local de K8S

Una documentación detallada dirigida a los desarrolladores de sistemas de procesamiento de datos (dfsps) que deseen probar el despliegue del clúster de Mojaloop con el adaptador Scheme y un servicio backend simulado.

![Overview](scheme-adapter-and-local-k8s-overview.png)

## Requisito previo

* Un clúster de K8s de Mojaloop en funcionamiento (despliegue local o en la nube)
* DFSP: servicio de backend simulado
* sdk-scheme-adapter > 8.6.0

## Configuración e inicio de servicios

### Mojaloop. Despliegue de un clúster K8S local
Siga el enlace que figura a continuación para realizar el despliegue de su propio clúster en el sistema local.
https://mojaloop.io/documentation/deployment-guide/

Se recomienda un sistema operativo basado en Linux; además, se requieren al menos 16 GB de RAM y un Procesador de 4 núcleos.

Tras la instalación, le rogamos que complete la encuesta «`OSS-New-Deployment-FSP-Setup.postman_collection`», disponible en https://github.com/mojaloop/postman

A continuación, asegúrese de que los oráculos y los Endpoints estén configurados correctamente y de que la «Golden Path Collection» se pueda ejecutar sin problemas.

### DFSP Servicio de backend simulado y SDK adaptador de Esquema de pagos
La versión del adaptador del esquema «SDK» debe ser superior a 8.6.0
El siguiente paso consiste en iniciar automáticamente el adaptador del Esquema de pagos desde el archivo `docker-compose`.

Le rogamos que descargue el siguiente repositorio
https://github.com/mojaloop/sdk-mock-dfsp-backend

Edite el archivo «docker-compose.yml» y compruebe las siguientes líneas.

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

Edite el archivo backend.env y modifique el valor de OUTBOUND_ENDPOINT
```
OUTBOUND_ENDPOINT=http://sa_sim2:4001
```

Edite el archivo «scheme-adapter.env» y modifique las siguientes líneas:
Sustituya los valores de los Endpoints por los nombres de host correspondientes que figuran en el archivo «/etc/hosts».

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

### Configuración de la resolución de nombres: SOLO para Mac

Dirija los siguientes nombres de host a la dirección IP de su equipo local añadiendo la línea que figura a continuación en el archivo /etc/hosts
```
192.168.5.101       ml-api-adapter.local account-lookup-service.local central-ledger.local central-settlement.local account-lookup-service-admin.local quoting-service.local moja-simulator.local central-ledger central-settlement ml-api-adapter account-lookup-service account-lookup-service-admin quoting-service simulator host.docker.internal moja-account-lookup-mysql
```

Asegúrese de sustituir 192.168.5.101 por su dirección IP externa real.

### Configuración de la resolución de nombres: SOLO para Linux

Añada la configuración «extra_hosts» al archivo de configuración de «scheme-adapter2» (docker-compose.yml), de modo que el contenedor «scheme-adapter2» pueda resolver los nombres DNS de «account-lookup-service.local», «quoting-service.local» y «ml-api-adapter.local». Por ejemplo, la configuración podría ser la siguiente:

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

La dirección 172.17.0.1 corresponde a la interfaz de red predeterminada «docker0» en Linux; no obstante, le rogamos que se asegure de que sea válida en su configuración y que la modifique si es necesario.

### Inicio

Inicie el backend y el adaptador de Esquema de pagos mediante el siguiente comando.
```
cd src
docker-compose up -d
```

## Pruebas

### Configurar nuevo FSP 
Descargue los siguientes archivos:
* [Mojaloop-Local.postman_environment_modified.json](assets/postman_files/Mojaloop-Local.postman_environment_modified.json): variables de entorno modificadas que apuntan a su configuración local]
* [OSS-Custom-FSP-Onboaring-SchemeAdapter-Setup.postman_collection.json](assets/postman_files/OSS-Custom-FSP-Onboaring-SchemeAdapter-Setup.postman_collection.json): pasos para configurar un nuevo FSP

La variable SCHEME_ADAPTER_ENDPOINT del archivo de entorno debe apuntar a su despliegue local de scheme-adapter. En macOS, este valor ya está configurado como http://host.docker.internal:4000. Si está ejecutando el sistema en Linux, edite el archivo de entorno para que SCHEME_ADAPTER_ENDPOINT apunte a su interfaz docker0 (normalmente 172.17.0.1; consulte las observaciones del paso anterior).

En Postman, seleccione el archivo de entorno y ejecute la colección personalizada en Postman para aprovisionar un nuevo FSP denominado «safsp». Los Endpoints de «safsp» se configurarán en el URL del adaptador de Esquema de pagos que figura en el archivo de entorno.

### Añada el MSISDN de destino al simulador de beneficiarios que se está ejecutando en K8S. Ejecute los siguientes comandos
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

### Intente enviar dinero
Intente enviar fondos desde «safsp» (Mock DFSP) a un MSISDN que se encuentre en «payeedfsp» (simulador en K8S) a través del adaptador de Esquema de pagos.
Ejecute el siguiente comando «curl» para enviar una orden al servicio Mock DFSP.
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

Debería recibir una respuesta con el estado actual «COMPLETED».

---
i18n_source_sha: f780e85bc88b8789742071e4ce1edf4ab84e8d1e
---

# Adaptador Esquema de pagos SDK y WSO2 API Gateway

Esta documentación tiene por objeto probar el adaptador de esquema en un Gateway WSO2 API alojado en un servidor público, con cifrado SSL y autenticación mediante token de portador.


![Overview](scheme-adapter-and-wso2-api-gateway-overview.png)

## Requisito previo

* Acceso a la API de producción de WSO2 API mediante un token generado.
* sdk-scheme-adapter
* mojaloop-simulator

## Generar un token de acceso y un valor «URL» desde WSO2 API

* Inicie sesión en su tienda de WSO2 y vaya a la sección «Aplicaciones» del menú. Cree una nueva aplicación y unas claves de acceso si aún no dispone de ellas.
* A continuación, acceda al menú «API»; allí encontrará las siguientes aplicaciones. Suscríbase a estas dos API seleccionando su aplicación y el nivel correspondiente en la página principal de cada una de ellas (API).
  * Administrador del Libro mayor central API: utilizaremos este Endpoint para crear un nuevo FSP y configurar los Endpoints de dicho FSP. (Póngase en contacto con su equipo de infraestructura para obtener los Endpoints HTTPS adecuados; deben aprovisionarlos en el Hub)
  * FSPIOP API: este es el número principal API para la búsqueda de cuenta, cotizaciones y transferencias
* Puede probar a realizar algunas solicitudes a la API en la pestaña «API Console» seleccionando el token de acceso generado.
* Le rogamos que anote las URL que empiezan por «API» tanto para las API como para el token de acceso.


## Cuestiones relacionadas con las infraestructuras
A continuación se enumeran las tareas de las que debe encargarse su equipo de infraestructura.
Póngase en contacto con su equipo de infraestructuras para obtener más información.
* Para recibir las respuestas, necesitamos un equipo con una dirección IP pública estática. Además, debe haber un nombre de dominio que apunte a esa dirección IP.
* Genere certificados SSL de cliente y servidor mediante el portal MCM y la herramienta de llavero. Este paso tiene por objeto establecer una comunicación segura mediante SSL recíproco.
* Configure los endpoints que apunten a su dirección https en WSO2 / HA Proxy.
* Configurar la autenticación «JWS»
* **Despliegue en AWS**
  * Inicie una instancia de EC2 en la consola de AWS
    * Cree una instancia de EC2 en la consola de AWS y seleccione el tipo de instancia **t2.micro**.
    * Seleccione **Ubuntu 18.04** como sistema operativo.
    * Una vez que su instancia esté lista, podrá conectarse a ella mediante SSH y el archivo de clave descargado desde el Tablero de control de AWS EC2.
    * Instale Docker y Docker Compose en esa instancia de EC2

  * Abra el puerto TCP 4000 en los grupos de seguridad y asigne una IP elástica
    * Añada la regla de entrada en el grupo de seguridad de esta instancia de EC2 para que el puerto TCP 4000 quede expuesto al público
    * Utilice el servicio Elastic IP para asignar una dirección IP estática a esta instancia

  * Configurar el nombre de dominio para esta instancia
    * Puede utilizar Route 53 en AWS o cualquier otro servicio de DNS para asociar un nombre de dominio a esta dirección IP
    * Este paso es necesario porque la autoridad de certificación Let's Encrypt no emite certificados para una dirección IP sin nombre.


## Configuración del adaptador Esquema de pagos con el simulador «Mojaloop»

Le rogamos que descargue el repositorio del simulador «Mojaloop»
```
git clone https://github.com/mojaloop/mojaloop-simulator.git
```
* Sustituya los certificados y las claves de la carpeta «src/secrets» por los certificados generados en el paso anterior.

* Edite el archivo «src/docker-compose.yml» y modifique los parámetros necesarios. Consulte el siguiente archivo.

    ```
    version: '3'
    services:
      redis:
        image: "redis:5.0.4-alpine"
        container_name: redis
      backend:
        image: "mojaloop/mojaloop-simulator-backend"
        env_file: ./sim-backend.env
        container_name: ml_simulator
        ports:
          - "3000:3000"
          - "3001:3001"
          - "3003:3003"
        depends_on:
          - scheme-adapter
    
      scheme-adapter:
        image: "mojaloop/sdk-scheme-adapter:latest"
        env_file: ./scheme-adapter.env
        container_name: sa_sim2
        volumes:
          - ./secrets:/src/secrets
        ports:
          - "3500:3000"
          - "4000:4000"
        depends_on:
          - redis
    ```

* Edite el archivo «src/sim-backend.env» y modifique en él el nombre del contenedor del adaptador de Esquema de pagos. Consulte las siguientes líneas.

    ```
    OUTBOUND_ENDPOINT=http://src_scheme-adapter_1:4001
    DFSP_ID=extpayerfsp
    ```

* Edite el archivo «src/scheme-adapter.env» y modifique los siguientes ajustes
  ```
  MUTUAL_TLS_ENABLED=true
  CACHE_HOST=redis
  DFSP_ID=extpayerfsp
  BACKEND_ENDPOINT=ml_simulator:3000
  PEER_ENDPOINT=<Your WSO2 api url>
  AUTO_ACCEPT_QUOTES=true
  ```

A continuación, intente ejecutar el siguiente comando para poner en marcha los Servicios
```
cd src/
docker-compose up -d
```

Ahora podemos acceder a la API de prueba del simulador de Mojaloop en el puerto 3003.

## Configure un nuevo «extpayerfsp»DFSP con los Endpoints adecuados

Deberíamos crear un nuevo FSP denominado «extpayerfp» o con cualquier otro nombre.

Para ello, puede utilizar la sección de incorporación «FSP» de la colección de Postman «OSS-New-Despliegue-FSP-Setup». Puede obtener el repositorio de Postman en el enlace https://github.com/mojaloop/postman.
* Duplique el entorno «Mojaloop-Local» y modifique los siguientes valores en él:
  * payerfsp - extpayerfsp
  * HOST_ML_API_ADAPTER, HOST_ML_API, HOST_SWITCH_TRANSFERS, HOST_ACCOUNT_LOOKUP_SERVICE, HOST_QUOTING_SERVICE: su Endpoint de WSO2 FSPIOP API
  * HOST_CENTRAL_LEDGER: su Endpoint de WSO2 Central Services Admin API
  * HOST_CENTRAL_SETTLEMENT: su Endpoint de WSO2 Central Liquidación API (opcional para nuestras pruebas)
  * HOST_SIMULATOR y HOST_SIMULATOR_K8S_CLUSTER - https://<your_domain_name>:4000
* Modifique las URL de la incorporación de payerfsp en la sección «FSP Incorporación» del documento «OSS-New-Despliegue-FSP-Setup», cambiando «payerfsp» por «extpayerfsp»
* Cambie el método de autenticación a «Bearer Token» e introduzca el token de acceso que hemos creado en el almacén de WSO2 para toda la carpeta «Pagador FSP Incorporación».
* Modifique las URL de los Endpoints por los Endpoints https facilitados por su equipo de infraestructura.
* A continuación, ejecute la carpeta «FSP Incorporación» de dicha colección con el entorno recién creado.

Debería obtener un resultado del 100 % de superación; en ese caso, podremos confirmar que el FSP se ha creado y que se han configurado los Endpoints para el FSP.

## Configurar el beneficiario «payeefsp» y dar de alta a un Participante en el simulador MSISDN

Por lo general, el simulador que se ejecuta en el Switch incluye «payeefsp» y debe registrar un nuevo Participante (número de teléfono) de su elección.

Para ello, puede consultar la solicitud del cartero «p2p_happy_path SEND QUOTE / Registrar al Participante {{pathfinderMSISDN}} en el simulador MSISDN para PayeeFSP» en la colección «Golden_Path».

La solicitud del cartero enviará una solicitud POST a <HOST_ACCOUNT_LOOKUP_SERVICE>/participants/MSISDN/<new_phone_number> con el siguiente cuerpo y los encabezados HTTP necesarios.
```
{
    "fspId": "payeefsp",
    "currency": "USD"
}
```

## Enviar dinero

### En un solo paso
Si desea enviar el dinero en un solo paso, debe activar las opciones de configuración «AUTO_ACCEPT_QUOTES» y «AUTO_ACCEPT_PARTY» en el archivo «scheme_adapter.env».

```
curl -X POST \
  "http://localhost:3003/scenarios" \
  -H 'Content-Type: application/json' \
  -d '[
    {
        "name": "scenario1",
        "operation": "postTransfers",
        "body": {
            "from": {
                "displayName": "From some person name",
                "idType": "MSISDN",
                "idValue": "44123456789"
            },
            "to": {
                "idType": "MSISDN",
                "idValue": "919848123456"
            },
            "amountType": "SEND",
            "currency": "USD",
            "amount": "100",
            "transactionType": "TRANSFER",
            "note": "testpayment",
            "homeTransactionId": "123ABC"
        }
    }
]'

```

### En dos pasos

El siguiente comando se utiliza para enviar el dinero en dos pasos (es decir, solicitando primero la cotización y aceptándola tras revisar los cargos y los datos de las partes)

```
curl -X POST \
  "http://localhost:3003/scenarios" \
  -H 'Content-Type: application/json' \
  -d '[
    {
        "name": "scenario1",
        "operation": "postTransfers",
        "body": {
            "from": {
                "displayName": "From some person name",
                "idType": "MSISDN",
                "idValue": "44123456789"
            },
            "to": {
                "idType": "MSISDN",
                "idValue": "9848123456"
            },
            "amountType": "SEND",
            "currency": "USD",
            "amount": "100",
            "transactionType": "TRANSFER",
            "note": "testpayment",
            "homeTransactionId": "123ABC"
        }
    },
    {
        "name": "scenario2",
        "operation": "putTransfers",
        "params": {
            "transferId": "{{scenario1.result.transferId}}"
        },
        "body": {
            "acceptQuote": true
        }
    }
]'

```
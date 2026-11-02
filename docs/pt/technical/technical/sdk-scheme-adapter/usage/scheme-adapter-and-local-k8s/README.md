---
i18n_source_sha: 5accc7ec13dd7476c3337da388c97877f2623ab4
---

# SDK Testes do adaptador scheme e do cluster K8S local

Uma documentação detalhada destinada aos dfsps que pretendam testar o deployment do cluster mojaloop com o adaptador scheme e um serviço de backend simulado.

![Overview](scheme-adapter-and-local-k8s-overview.png)

## Pré-requisito

* Um cluster k8s do Mojaloop em funcionamento (deployment local / na nuvem)
* DFSP serviço de backend simulado
* sdk-scheme-adapter > 8.6.0

## Configuração e arranque de serviços

### Mojaloop. Deployment do cluster K8S local
Por favor, siga a ligação abaixo para deployar o seu próprio cluster no sistema local.
https://mojaloop.io/documentation/deployment-guide/

Recomenda-se um sistema operativo baseado em Linux, sendo necessários, no mínimo, 16 GB de RAM e um processador de 4 núcleos.

Após a instalação, preencha, por favor, o questionário «`OSS-New-Deployment-FSP-Setup.postman_collection`», disponível em https://github.com/mojaloop/postman

Em seguida, certifique-se de que os oráculos e os endpoints estão configurados corretamente e de que a «Golden Path Collection» pode ser executada com sucesso.

### DFSP serviço de backend simulado e SDK adaptador de scheme
A versão do adaptador do scheme «SDK» deve ser superior a 8.6.0
O passo seguinte inicia automaticamente o adaptador do scheme a partir do ficheiro `docker-compose`.

Por favor, descarregue o seguinte repositório
https://github.com/mojaloop/sdk-mock-dfsp-backend

Edite o ficheiro «docker-compose.yml» e verifique as seguintes linhas.

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

Edite o ficheiro backend.env e altere o valor de OUTBOUND_ENDPOINT
```
OUTBOUND_ENDPOINT=http://sa_sim2:4001
```

Edite o ficheiro scheme-adapter.env e altere as seguintes linhas
Por favor, substitua os valores dos endpoints pelos nomes de host adequados indicados no ficheiro /etc/hosts.

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

### Configuração da resolução de nomes - APENAS para Mac

Direcione os seguintes nomes de anfitrião para o endereço IP do seu computador local, adicionando a linha abaixo ao ficheiro /etc/hosts
```
192.168.5.101       ml-api-adapter.local account-lookup-service.local central-ledger.local central-settlement.local account-lookup-service-admin.local quoting-service.local moja-simulator.local central-ledger central-settlement ml-api-adapter account-lookup-service account-lookup-service-admin quoting-service simulator host.docker.internal moja-account-lookup-mysql
```

Certifique-se de que substitui 192.168.5.101 pelo seu endereço IP externo real.

### Configuração da resolução de nomes - APENAS para Linux

Adicione a configuração «extra_hosts» à configuração do «scheme-adapter2» no ficheiro «docker-compose.yml», para que o contentor «scheme-adapter2» possa resolver os nomes DNS de «account-lookup-service.local», «quoting-service.local» e «ml-api-adapter.local». Por exemplo, a configuração poderia ser:

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

O endereço 172.17.0.1 corresponde à interface de rede predefinida «docker0» no Linux; no entanto, certifique-se de que é válido na sua configuração e altere-o, se necessário.

### Início

Inicie o backend e o adaptador de scheme utilizando o seguinte comando.
```
cd src
docker-compose up -d
```

## Testes

### Configurar novoFSP 
Descarregue os seguintes ficheiros:
* [Mojaloop-Local.postman_environment_modified.json](assets/postman_files/Mojaloop-Local.postman_environment_modified.json) — variáveis de ambiente modificadas que apontam para a sua configuração local
* [OSS-Custom-FSP-Onboarding-SchemeAdapter-Setup.postman_collection.json](assets/postman_files/OSS-Custom-FSP-Onboaring-SchemeAdapter-Setup.postman_collection.json) - passos para configurar um novo FSP

A variável SCHEME_ADAPTER_ENDPOINT no ficheiro de ambiente deve apontar para o seu deployment local do scheme-adapter. No macOS, esta configuração já está definida como http://host.docker.internal:4000. Se estiver a utilizar o Linux, edite o ficheiro de ambiente de forma a que SCHEME_ADAPTER_ENDPOINT aponte para a sua interface docker0 (normalmente 172.17.0.1 — consulte as observações no passo anterior).

No Postman, selecione o ficheiro de ambiente e execute a coleção personalizada no Postman para provisionar um novo «FSP» denominado «safsp». Os endpoints para o «safsp» serão definidos para o «URL» do adaptador de scheme que está configurado no ficheiro de ambiente.

### Adicione o MSISDN de destino ao simulador de beneficiário que está a ser executado no K8S. Execute os seguintes comandos
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

### Tente enviar dinheiro
Tente enviar fundos a partir de «safsp» (Mock DFSP) para um MSISDN que se encontre em «payeedfsp» (Simulador no K8S) através do adaptador de esquema.
Execute o seguinte comando «curl» para enviar um comando ao serviço Mock DFSP.
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

Deve receber uma resposta com o estado atual definido como COMPLETED.

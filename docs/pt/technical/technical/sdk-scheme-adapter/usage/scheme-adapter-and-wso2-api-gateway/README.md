---
i18n_source_sha: f780e85bc88b8789742071e4ce1edf4ab84e8d1e
---

# Adaptador scheme SDK e WSO2 API Gateway

Esta documentação destina-se a testar o adaptador de esquema num gateway WSO2 API alojado publicamente, com encriptação SSL e autenticação por token de portador.


![Overview](scheme-adapter-and-wso2-api-gateway-overview.png)

## Pré-requisito

* Acesso à API de produção do WSO2 vAPI com um token gerado.
* sdk-scheme-adapter
* mojaloop-simulator

## Gerar um token de acesso e o valor URL a partir do WSO2 API

* Inicie sessão na sua loja WSO2 e aceda à secção «Aplicações» no menu. Crie uma nova aplicação e chaves de acesso, caso ainda não as tenha.
* Em seguida, aceda ao menu «APIs»; deverá encontrar as seguintes aplicações. Subscreva estas duas APIs, selecionando a sua aplicação e o nível de serviço na página principal de cada uma delas (API).
  * Central Ledger Admin API — Iremos utilizar este endpoint para criar um novo FSP e configurar os endpoints para esse FSP. (Por favor, contacte a sua equipa de infraestrutura para obter os endpoints HTTPS adequados; a equipa terá de os provisionar no hub)
  * FSPIOP API - Este é o número principal API para consulta de contas, cotações e transferências
* Pode experimentar efetuar algumas solicitações à API no separador «API Console», selecionando o token de acesso gerado.
* Por favor, anote os URLs «API» relativos às duas APIs e ao token de acesso.


## Questões relacionadas com infraestruturas
A seguir, apresentamos os aspetos de que a sua equipa de infraestruturas deve ocupar-se.
Por favor, contacte a sua equipa de infraestruturas para obter mais informações.
* Para receber as respostas, precisamos de um computador com um endereço IP público estático. Além disso, um nome de domínio deve estar apontado para esse endereço IP.
* Crie certificados SSL para o cliente e para o servidor utilizando o portal MCM e a ferramenta Keychain. Este passo destina-se a estabelecer uma comunicação segura através de SSL mútuo.
* Configure os endpoints para apontar para o seu endereço HTTPS no WSO2 / HA Proxy.
* Estabelecer a autenticação «JWS»
* **Deployment na AWS**
  * Inicie uma instância EC2 na consola da AWS
    * Crie uma instância EC2 na consola da AWS e selecione o tipo de instância **t2.micro**.
    * Selecione **Ubuntu 18.04** como sistema operativo.
    * Assim que a sua instância estiver pronta, poderá ligar-se à mesma através do SSH e do ficheiro de chave descarregado a partir do painel de controlo do AWS EC2.
    * Instale o Docker e o Docker Compose nessa instância do EC2

  * Abrir a porta TCP 4000 nos grupos de segurança e atribuir um IP elástico
    * Adicione a regra de entrada no grupo de segurança desta instância EC2, de modo a expor a porta TCP 4000 ao público
    * Utilize o serviço Elastic IP para atribuir um endereço IP estático a esta instância

  * Configurar o nome de domínio para esta instância
    * Pode utilizar o Route 53 na AWS ou qualquer outro serviço de DNS para associar um nome DNS a este endereço IP
    * Este passo é necessário porque a autoridade certificadora Let's Encrypt não emite certificados para um endereço IP simples.


## Configuração do Scheme Adapter com o Simulador Mojaloop

Por favor, descarregue o repositório do Simulador Mojaloop
```
git clone https://github.com/mojaloop/mojaloop-simulator.git
```
* Substitua os certificados e as chaves na pasta «src/secrets» pelos certificados gerados no passo anterior.

* Edite o ficheiro src/docker-compose.yml e altere os parâmetros necessários. Consulte o ficheiro seguinte.

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

* Edite o ficheiro src/sim-backend.env e altere o nome do contentor do adaptador de scheme nesse ficheiro. Consulte as linhas seguintes.

    ```
    OUTBOUND_ENDPOINT=http://src_scheme-adapter_1:4001
    DFSP_ID=extpayerfsp
    ```

* Edite o ficheiro src/scheme-adapter.env e altere as seguintes definições
  ```
  MUTUAL_TLS_ENABLED=true
  CACHE_HOST=redis
  DFSP_ID=extpayerfsp
  BACKEND_ENDPOINT=ml_simulator:3000
  PEER_ENDPOINT=<Your WSO2 api url>
  AUTO_ACCEPT_QUOTES=true
  ```

Em seguida, tente executar o comando seguinte para iniciar os serviços
```
cd src/
docker-compose up -d
```

Já podemos aceder à API de teste do simulador do Mojaloop na porta 3003.

## Configure um novo «DFSP» «extpayerfsp» com os endpoints adequados

Devemos criar um novo fsp com o nome «extpayerfp» ou com qualquer outro nome.

A secção de onboarding «FSP» da coleção Postman «OSS-New-Deployment-FSP-Setup» pode ser utilizada para este efeito. Pode obter o repositório Postman em https://github.com/mojaloop/postman.
* Duplique o ambiente «Mojaloop-Local» e altere os seguintes valores nesse ambiente:
  * payerfsp - extpayerfsp
  * HOST_ML_API_ADAPTER, HOST_ML_API, HOST_SWITCH_TRANSFERS, HOST_ACCOUNT_LOOKUP_SERVICE, HOST_QUOTING_SERVICE - O seu endpoint do WSO2 FSPIOP API
  * HOST_CENTRAL_LEDGER - O seu endpoint WSO2 Central Services Admin API
  * HOST_CENTRAL_LIQUIDAÇÃO - O seu endpoint WSO2 Central Liquidação API (opcional para os nossos testes)
  * HOST_SIMULATOR e HOST_SIMULATOR_K8S_CLUSTER - https://<your_domain_name>:4000
* Altere os URLs na integração do payerfsp no onboarding na secção «FSP Onboarding» do documento «OSS-New-Deployment-FSP-Setup», substituindo «payerfsp» por «extpayerfsp»
* Altere a autenticação para «Bearer Token» e forneça o token de acesso que criámos no WSO2 Store para toda a pasta «Payer FSP onboarding».
* Altere os URLs dos pontos finais para os pontos finais https fornecidos pela sua equipa de infraestrutura.
* Em seguida, execute a pasta «Payer FSP Onboarding» nessa coleção com o ambiente recém-criado.

Deve obter uma aprovação de 100%; só então poderemos confirmar que o FSP foi criado e que os endpoints estão definidos para o FSP.

## Configurar o destinatário «payeefsp» e registar um participante no simulador MSISDN

Normalmente, o simulador em execução no switch contém o payeefsp e deve registar um novo participante (número de telefone) à sua escolha.

Para o efeito, pode consultar o pedido do Postman intitulado «p2p_happy_path SEND COTAÇÃO / Registo do Participante {{pathfinderMSISDN}} no Simulador MSISDN para o PayeeFSP», na coleção «Golden_Path».

A solicitação do «postman» enviará uma solicitação POST para <HOST_ACCOUNT_LOOKUP_SERVICE>/participants/MSISDN/<new_phone_number> com o corpo a seguir indicado e os cabeçalhos HTTP necessários.
```
{
    "fspId": "payeefsp",
    "currency": "USD"
}
```

## Enviar dinheiro

### Num único passo
Se pretender enviar o dinheiro numa única etapa, as opções de configuração «AUTO_ACCEPT_QUOTES» e «AUTO_ACCEPT_PARTY» no ficheiro «scheme_adapter.env» devem estar ativadas.

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

### Em duas etapas

O comando seguinte é utilizado para efetuar a transferência de dinheiro em duas etapas (ou seja, solicitando primeiro a cotação e, após a verificação dos encargos e dos dados da parte, aceitando o mesmo)

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
---
Authors: Lewis Daly, Matthew De Haast, Samuel Kummary
Proposal Name: Mojaloop Versioning Proposal
Solution Proposal Status: Draft
Created: 26-Feb-2020
Last Updated: 17-Mar-2020
Approved/Rejected Date: N/A
i18n_source_sha: 33e36e14342549f829658be7246d6b01bbb5b7c6
---

# Versionamento do Mojaloop, uma proposta

_Nota: este documento é um rascunho vivo de uma proposta de versionamento no Mojaloop. Assim que a proposta estiver pronta, será submetida ao CCB para aprovação._

## Visão geral

O objetivo é produzir uma proposta que mantenha o scheme de versionamento simples de utilizar e claro quanto às questões de compatibilidade. No entanto, tem de incluir também todos os detalhes necessários a um ecossistema Mojaloop.

Objetivo:
Propor uma norma para uma nova «versão do Mojaloop», que incorpore:
1. Helm: versões dos serviços individuais, versões dos componentes de monitorização
2. Versões das APIs: FSPIOP API, Hub Operations / Admin API, Settlement API
3. Versões dos esquemas internos: esquema da base de dados e versões das mensagens internas

## Estratégias/contexto de versionamento (revisão da literatura)

Como é que os sistemas atuais tratam o versionamento? Dar uma breve visão geral do panorama atual.
* A maioria das boas práticas segue o versionamento semântico para as APIs; isto será tratado mais aprofundadamente em [#1198](https://github.com/mojaloop/project/issues/1198)

### Demonstra abordagens de deployment sem indisponibilidade com Kubernetes [5]

Observações principais:
* para permitir rollbacks, os serviços têm de ser compatíveis para a frente e para trás.
versões consecutivas da aplicação têm de ser compatíveis ao nível do esquema
* «Nunca fazer o deployment de alterações incompatíveis ao esquema»; separá-las em vários deployments

Por exemplo, começar com uma tabela PERSON:
```
PK  ID
    NAME
    ADDRESS_LINE_1
    ADDRESS_LINE_2
    ZIPCODE
    COUNTRY
```

E queremos decompô-la (normalizá-la) em 2 tabelas, PERSON e ADDRESS:

```
#person
PK  ID
    NAME

#address
PK  ID
FK  PERSON_ID
    ADDRESS_LINE_1
    ADDRESS_LINE_2
    ZIPCODE
    COUNTRY
```

Se esta alteração fosse feita numa única migração, 2 versões diferentes da nossa aplicação não seriam compatíveis. Em vez disso, as alterações ao esquema têm de ser decompostas:
1. Criar a tabela ADDRESS
    * A aplicação utiliza os dados da tabela PERSON como anteriormente
    * Desencadear uma cópia dos dados para a tabela ADDRESS
2. A ADDRESS passa agora a ser a «fonte da verdade»
    * A aplicação utiliza agora os dados da tabela ADDRESS
    * Desencadear uma cópia dos novos dados acrescentados a address para a tabela PERSON
3. Parar de copiar dados
4. Remover as colunas extra da tabela PERSON

Isto significa que, para qualquer alteração ao esquema da base de dados, terão de ser criadas várias versões da aplicação, e terão de ser feitos vários deployments em sucessão para que essa alteração seja concretizada.
* [5] nota também como o Kubernetes torna simples o deployment de uma alteração destas
        * deployments de atualização progressiva
        * Sugestão: certifique-se de que o seu endpoint de saúde espera que as migrações terminem!
* P: então, como fazemos grandes alterações que tocam tanto no esquema da base de dados como na API?
        * isto parece realmente difícil e exigiria muita coordenação
        * Se não o desenharmos corretamente, pode significar que uma única alteração ao esquema exija que todos os DFSPs embarquem
             * É por isso que penso que a versão da API e a versão do serviço deveriam ser independentes. Deveríamos conseguir
              fazer o deployment de uma nova versão de um serviço (que executa uma migração) e ser compatível com uma versão antiga da API


### Utilizar um registo de esquemas para as mensagens Kafka [6]

* [6] sugere algumas abordagens, como utilizar um registo de esquemas para as mensagens kafka, tal como o [Apache Avro](https://docs.confluent.io/current/schema-registry/index.html)
* Isto acrescenta um certo nível de «rigor» às mensagens que produzimos e ajudará a impor o versionamento
* Acrescenta um componente separado, o «registo de esquemas», que garante que as mensagens estão em conformidade com um dado esquema. Isto não
 ajuda propriamente a impor o versionamento e deixa o trabalho ainda do nosso lado, mas dá mais garantias quanto aos formatos das mensagens.

### Compatibilidade para trás e para a frente [3], [4]

* «O princípio da robustez afirma que se deve ser “liberal naquilo que se aceita e conservador naquilo que se envia
”. Em termos de APIs, isto implica uma certa tolerância nos serviços consumidores.» [3]
* Compatibilidade para trás face a incompatibilidade para trás [4]:
    * Em geral, as adições são consideradas compatíveis para trás
    * Remover ou alterar nomes é incompatível para trás
    * É antes algo a avaliar caso a caso, mas o [documento de design de APIs da Google](https://cloud.google.com/apis/design/compatibility) ajuda a enunciar os casos.

## Ecossistema Mojaloop
Ao discutir versionamento, temos de ser claros quanto ao facto de estarmos a versionar interfaces para várias partes.

# Proposta
A secção seguinte apresenta a proposta de versionamento.

## Uma «versão do Mojaloop»
Pode definir-se uma versão do Mojaloop **x.y**.z que abranja as versões de todas as três APIs incluídas (detalhadas abaixo).
Na versão **x.y**.z, «x» indica a versão Major e «y» uma versão minor, à semelhança das normas de versionamento da Mojaloop FSPIOP API; «z» representa a versão «hotfix» ou uma versão disponibilizada com a mesma versão major e minor x.y mas, para manter as coisas simples, é necessário agrupar todos os componentes incluídos no ecossistema Mojaloop, indicando que itens aí estão incluídos.

Na prática, podemos dizer que a versão **x.y** do Mojaloop inclui
1. Mojaloop FSPIOP API
    * Mantida pelo CCB (Change Control Board)
    * Utiliza o formato x.y
    * Atualmente, estão em preparação as versões v1.0, v1.1 e v2.0
2. Settlement API
    * Mantida pelo CCB
    * A utilizar o formato x.y
    * Atualmente, estão em preparação as versões v1.1 e v2.0
3. Admin / Operations API
    * Mantida pelo CCB
    * A utilizar o formato x.y
    * Pode utilizar a versão v1.0
4. Helm
    * Mantido pela Design Authority
    * Utiliza o formato x.y.z
    * Versionamento baseado no PI (Program Increment) + Sprint.
    > *Nota:* o _versionamento baseado em PI + Sprint_ faz sentido no contexto dos atuais Program Increments do Mojaloop, mas terá de ser revisto mais tarde.
    * Agrupa versões compatíveis dos serviços individuais
5. Esquemas internos
    * Mantidos pela Design Authority
    * Esquema da BD x.y
    * Esquema de mensagens internas (Kafka) x.y

| **Mojaloop** | x.y | | |
|---|---|---|---
|   | Proprietário/responsável pela manutenção | Formato | Significado |
| **APIs** | | | |
| - FSPIOP API | CCB | *x.y* | Major.Minor |
| - Settlement API | CCB | *x.y* | Major.Minor |
| - Admin/Operations API | CCB | *x.y* | Major.Minor |
| Helm | Design Authority  | *x.y.z* | PI.Sprint.Incremento |
| **Esquemas internos** | | | |
| - Esquema da BD | Design Authority | *x.y* | Major.Minor |
| - Mensagens internas | Design Authority | *x.y* | Major.Minor |



Por exemplo: o Mojaloop 1.0 inclui
1. APIs
    * FSPIOP API v1.0
    * Settlements API v1.1
    * Admin API v1.0
2. Helm v9.1.0
    * Versões dos serviços individuais
    * Versões dos componentes de monitorização
3. Esquemas internos
    * Esquema da BD v1.0
    * Versão das mensagens internas v1.0

| **Mojaloop** | v1.0 | | |
|---|---|---|---
|   | Proprietário/responsável pela manutenção | Versão |
| **APIs** | | | |
| - FSPIOP API | CCB | *1.0* |
| - Settlement API | CCB | *1.1* |
| - Admin/Operations API | CCB | *1.0* |
| Helm | Design Authority  | *9.1.0* |
| **Esquemas internos** | | | |
| - Esquema da BD | Design Authority | *1.0* |
| - Mensagens internas | Design Authority  | *1.0* |

### Vantagens

1. A vantagem desta estratégia é, sobretudo, a simplicidade. Uma dada versão, por exemplo, o Mojaloop v1.0, pode ser simplesmente utilizada
 nas discussões, referindo-se depois a versões específicas das três APIs - FSPIOP, Settlements e Admin -, a par da versão do Helm, que é um conjunto dos serviços individuais compatíveis entre si e cujo deployment pode ser feito em conjunto. 
Juntamente com estas, as versões dos esquemas da BD e das mensagens internas comunicam se foram ou não feitas alterações a estes desde a versão anteriormente disponibilizada.
2. A outra vantagem, obviamente, é que serve todos os que possam estar interessados em diferentes níveis de detalhe
, seja de alto nível ou detalhado. Pela natureza das versões major e minor, deverá ser fácil para os utilizadores e os adotantes compreenderem também as questões de compatibilidade.

### Compatibilidade
Conforme descrito na [secção 3.3 da API Definition v1.0](https://github.com/mojaloop/mojaloop-specification/blob/master/documents/API%20Definition%20v1.0.md#33-api-versioning), o facto de uma versão ser ou não compatível para trás é
 indicado pela versão **Major**. Todas as versões com a mesma versão major têm de ser compatíveis, ao passo que as que têm versões major diferentes provavelmente não serão compatíveis.

_Nota importante: os operadores de hub precisarão provavelmente de ser compatíveis com várias versões da FSPIOP API em simultâneo, de forma a servir diferentes participantes, uma vez que não se pode esperar que todos atualizem ao mesmo tempo._

## Decompor a «versão do Mojaloop»
Esta secção procura decompor a versão do mojaloop proposta acima nas suas partes constituintes e fundamentar a estratégia de versionamento proposta acima

### APIs

A [especificação do Mojaloop](https://github.com/mojaloop/mojaloop-specification/blob/master/documents/API%20Definition%20v1.0.md#33-api-versioning) já enuncia muitas das decisões tomadas quanto ao versionamento das APIs.

Em termos de boas práticas comuns, existem muitas abordagens para pedir versões diferentes, incluindo acrescentar uma
 versão no url, mas não nos preocupemos com isto, porque a especificação já o define por nós, utilizando a extensão de fornecedor de HTML: [3.3.4.1 Http Accept Header](https://github.com/mojaloop/mojaloop-specification/blob/master/documents/API%20Definition%20v1.0.md#3341-http-accept-header)

Quanto à negociação de versões, a especificação afirma também que, caso um cliente peça uma versão não suportada,
 pode ser devolvido um estado HTTP 406, juntamente com uma mensagem de erro que descreve as versões permitidas. [3.3.4.3 Non-Acceptable Version Requested by Client](https://github.com/mojaloop/mojaloop-specification/blob/master/documents/API%20Definition%20v1.0.md#3343-non-acceptable-version-requested-by-client)

Outra boa prática de versionamento é especificar até que nível os clientes podem pedir apis específicas.
* Num ambiente de desenvolvimento, muitas APIs permitem especificidade até à versão BUGFIX, ou seja, vX.X.X
* Em produção, no entanto, isto está limitado apenas às versões major, por exemplo, v1, v2
* Por exemplo, a plataforma de APIs da Google admite apenas versões major, e não versões minor e de patch
* Dadas as novas funcionalidades que podem vir a estar disponíveis com a v1.1 da API Mojaloop, podemos querer permitir que os participantes
 especifiquem as versões MAJOR e MINOR, ou seja, vX.X. Esta prática deveria, no entanto, ser evitada, uma vez que as versões minor deveriam ser compatíveis para trás

Os participantes que utilizam a mesma versão MAJOR da API deveriam conseguir interagir. Os participantes em versões MAJOR
diferentes não conseguem interagir. Por exemplo, um participante na API v1.1 pode enviar transferências a outro participante na v1.0, mas não a um participante diferente na v2.0.

### Helm
Esta secção trata da forma como os serviços Mojaloop interagem dentro de um dado deployment. Aqui, procuramos colocar questões como «deveria uma instância de central-ledger:v10.0.1 conseguir falar com ml-api-adapter:v10.1.0? E com ml-api-adapter:v11.0.0?» ou «como garantimos que tanto central-ledger:v10.0.1 como central-ledger:v10.1.0 falam com a base de dados ao mesmo tempo?»

Há dois sítios onde isto acontece:
1. Onde os serviços interagem com o estado guardado - bases de dados MySQL Percona
2. Onde os serviços interagem entre si - Apache Kakfa e (algumas) APIs internas

Isto implica que precisamos de versionar:
* o esquema da base de dados
* as mensagens dentro do Apache kafka
    * é preciso garantir que os serviços certos conseguem ler adequadamente as mensagens certas. Por exemplo, pode o mojaloop/ml-api-adapter:v10
.1.0 publicar no kafka mensagens que o mojaloop/central-ledger:v10.0.1 consiga compreender?
    * P: se decidirmos fazer alterações incompatíveis ao formato das mensagens, como podemos garantir que as mensagens nos streams do kafka
 não são recolhidas pelos serviços errados?

### Esquemas internos

#### Base de dados

a fazer: há algo a dizer aqui?

#### Kafka/mensagens
Atualmente, utilizamos o protocolo lime para os formatos das nossas mensagens kafka: https://limeprotocol.org/

Consulte também o readme do mojaloop/central-services-stream para mais informação sobre o formato das mensagens.

O protocolo lime prevê um campo type, que permite declarações de tipo MIME. Assim, poderíamos potencialmente tratar as mensagens de forma semelhante à da API acima (por exemplo, application/vnd.specific+json). Versionar mensagens desta forma significa que os consumidores que as leem teriam de ser compatíveis para trás e para a frente (versões consecutivas das mensagens têm de ser compatíveis ao nível do esquema).
* P. faz sentido colocar a versão no tópico Kafka?
    * Um exemplo: o ml-api-adapter publica mensagens no tópico prepare
    * Se acrescentarmos versionamento a isto, o ml-api-adapter:v10.0.0 publica mensagens num tópico prepare_v10.0, e uma nova instância
     do ml-api-adapter:v10.1.0 publicará no tópico prepare_v10.1.
    * os subscritores podem subscrever o tópico prepare que quiserem, ou ambos, consoante a sua própria tolerância a essas
      mensagens
    * Isto pode ter alguns efeitos secundários sérios no desempenho
* Outra opção possível seria prever um «adaptador» de mensagens no deployment. Digamos que o ml-api-adapter:v10.1.0 está a produzir mensagens para um tópico prepare_v10.1 e que não existe no deployment um central-ledger correspondente que leia essas mensagens; poderíamos ter um adaptador que subscreve prepare_v10.1, as reformata para serem compatíveis para trás e as publica em prepare_v10.0, no formato antigo.

Uma abordagem destas permitiria alterações incrementais do esquema ao formato das mensagens, à medida que os serviços fossem sendo gradualmente atualizados.

Em suma, não encontrei muito sobre este assunto, pelo que provavelmente teremos de voltar a ele mais adiante.

## Negociação de versões
a fazer: @sam discutir como lidar com a estratégia de negociação de versões

## Suporte de longo prazo
a fazer: discutir como o suporte de longo prazo se enquadra na proposta de versionamento. Não me parece que queiramos entrar em demasiado detalhe, mas antes esboçar como poderá ser

Mencionar a (falta de) suporte lts atual, a cadência de PI atual

## Anexo A: definições

* **serviço**: o Mojaloop segue uma abordagem orientada a microsserviços, em que uma aplicação grande é decomposta em micro
 serviços mais pequenos. Neste caso, serviço refere-se a uma aplicação em contentor executada como parte de um deployment Mojaloop. De momento, assume a forma de um contentor Docker em execução dentro de um cluster Kubernetes. Por exemplo, mojaloop/central-ledger é o serviço central-ledger
* **versão do serviço**: a versão do serviço em causa. Atualmente, não segue o versionamento semântico, mas poderá vir a segui-lo no
 futuro, por exemplo, mojaloop/central-ledger:v10.0.1. A abordagem atual é descrita mais detalhadamente no [documento standards
 /Versioning](https://github.com/mojaloop/documentation/blob/master/contributors-guide/standards/versioning.md).
* **helm**: o Helm é um gestor de pacotes de aplicações que corre sobre o Kubernetes. Pode também ser referido como o
 «deployment». Um único deployment de helm executa muitos serviços diferentes e PODE executar várias versões do mesmo serviço em simultâneo. Referimo-nos também ao deployment pelo seu repositório, mojaloop/helm, indistintamente.
* **versão do helm**: uma versão do helm é a versão dos helm charts empacotados, por exemplo, mojaloop/helm:v1.1.0
* **interface**: uma interface é o protocolo pelo qual um switch Mojaloop interage com o mundo exterior. Isto inclui
 as interações com os participantes (DFSP) que transferem fundos através do switch, os operadores de hub que executam um switch Mojaloop e os administradores que desempenham funções administrativas.
* **api**: Application Programming Interface - na maioria dos casos, refere-se à FSPIOP-API, também conhecida como Open API for FSP
 Interoperability, definida [aqui](https://github.com/mojaloop/mojaloop-specification).
* **versão da api**: a versão da FSPIOP-API, por exemplo, FSPIOP-API v1. Para efeitos deste documento, refere-se ao
 contrato entre um switch Mojaloop e os participantes (DFSP) que implementam a FSPIOP-API

## Referências

[1] Versionamento LTS no nodejs. Este é um excelente exemplo de uma estratégia de LTS e de como comunicar claramente uma estratégia dessas.
[2] Referência de versionamento semântico
[3] https://www.ben-morris.com/rest-apis-dont-need-a-versioning-strategy-they-need-a-change-strategy/
[4] https://cloud.google.com/apis/design/compatibility
[5] Nicolas Frankel - Zero-downtime deployment with Kubernetes, Spring Boot and Flyway
[6] Stackoverflow - Kafka Topic Message Versioning

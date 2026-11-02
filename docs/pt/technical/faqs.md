---
i18n_source_sha: afb76ba6884d13bab87c8252355a81d4a503da1e
---

# Perguntas Frequentes

Este documento contém algumas das perguntas técnicas mais frequentes da comunidade.

## 1. O que é que é permitido?

Atualmente, os componentes do livro-razão geral são permitidos pela equipa. Os componentes «DFSP» estão desatualizados e, por isso, a instalação do ambiente de ponta a ponta e da configuração integral apresenta dificuldades.

### 2. É possível estabelecer uma ligação direta ao Pathfinder num ambiente de desenvolvimento?

Para o ambiente local e de teste, recomendamos que utilize o serviço «mock-pathfinder» em vez disso. O Pathfinder é um serviço «pago por utilização». 

Aceda ao repositório https://github.com/mojaloop/mock-pathfinder para descarregar e instalar o mock-pathfinder. Execute o comando npm «install» no diretório do mock-pathfinder para instalar as dependências; em seguida, atualize o Database_URI conforme indicado em mock-pathfinder/src/lib/config.js.

### 3. Devo registar o valor DFSP através do URL http://central-directory/commands/register ou tenho de atualizar a configuração no ficheiro default.json?

Deve efetuar o registo utilizando o API fornecido, através do Postman ou do curl. O cliente está a utilizar o código LevelOne. É necessário implementar a release Mojaloop atual com os scripts atuais do Postman.

### 4. O estado do pod «pi3-kafka-0» continua a ser «CrashLoopBackOff»?

- Mais informações contextuais relacionadas com a questão:

  Quando tentei obter os registos do contentor «centralledger-handler-admin-transfer», recebi o seguinte erro:
  Erro do servidor (BadRequest): o contentor «centralledger-handler-admin-transfer» no pod «pi3-centralledger-handler-admin-transfer-6787b6dc8d-x68q9» está à espera de iniciar: PodInitializing
  E o estado do pod «pi3-kafka-0» continua em «CrashLoopBackOff».
  Estou a utilizar um VPS no Ubuntu 16.04 com 12 GB de RAM, 2 vCores, 2,4 GHz e 50 GB de ROM na OVH para o deployment.

O aumento da memória RAM para 24 GB e da capacidade do processador para 4 resolveu os problemas. Parece tratar-se de um tempo limite esgotado no Zookeeper devido à esgotamento dos recursos disponíveis, o que resultou no encerramento dos serviços.

### 5. Por que razão recebo um erro quando tentamos criar um novo «DFSP» através do Admin?

Certifique-se de que está a utilizar os scripts do Postman mais recentes disponíveis no repositório https://github.com/mojaloop/mock-pathfinder.


### 6.  Posso distribuir Mojaloop componentes por diferentes máquinas físicas e máquinas virtuais?

Deve ser possível efetuar a configuração em diferentes máquinas virtuais ou máquinas físicas. A distribuição depende, em grande medida, dos seus requisitos e seria específica para cada implementação. Utilizamos o Kubernetes para auxiliar na orquestração de contentores. Isto permite-nos agendar os deployments através do Kubernetes runtime para máquinas específicas, se necessário, e solicitar recursos específicos, se for o caso. Os gráficos Helm no repositório Helm podem ser utilizados como orientação sobre a melhor forma de alocar e agrupar os componentes no seu deployment. Naturalmente, terá de atualizar as configurações para se adequarem à sua implementação personalizada.

### 7. Podemos esperar que todos os pontos finais definidos no documento API sejam implementados no Mojaloop?

A Especificação Mojaloop, API, relativa às transferências e a implementação do Switch de Código Aberto Mojaloop constituem vertentes independentes, embora, obviamente, a implementação se baseie na Especificação. A implementação será realizada com base nos casos de uso priorizados para um determinado período e nos pontos finais necessários para dar resposta a esses casos de uso. Se alguns pontos finais não forem priorizados, a implementação para os mesmos poderá não estar disponível. No entanto, penso que o objetivo é, a longo prazo, suportar todos os pontos finais especificados, embora isso possa demorar algum tempo. Agradeço a compilação. Temos alguns destes no repositório «postman» na organização mojaloopGitHub.

### 8. O campo «Mojaloop» armazena as informações relativas à cotação/estado do iniciador do pagamento «FSP»?

De momento, a implementação de código aberto do switch Mojaloop *não* armazena informações relacionadas com cotações. Cabe ao pagador e ao beneficiário envolvidos no processo armazenar as informações relevantes.

### 9. O Mojaloop. trata da validação do fluxo de trabalho?

De momento, não, mas isso poderá vir a acontecer no futuro. No que diz respeito à correlação de pedidos relacionados com uma transferência específica, poderá consultar o ponto final/recurso «transação» na Especificação para obter mais informações sobre este assunto. Além disso, posso informar que estão em curso alguns trabalhos de fundo relativos à especificação, com o objetivo de tornar esta correlação mais direta e simples, ou seja, para correlacionar pedidos de cotação e de transferência que se enquadram numa única transação.


### 10. Como registar um novo partido no anoMojaloop?

Não existe um método POST no recurso /parties, tal como especificado na secção 6.1.1 da Definição API. Consulte a secção: 6.2.2.3 `POST /participants/<Type>/<ID>` na Definição API.

» _A solicitação HTTP `POST /participants/<Type>/<ID>` (ou `POST /participants/<Type>/<ID>/<SubId>`) é utilizada para criar informações no servidor relativas à identidade fornecida, definida por `<Type>`, `<ID>` e, opcionalmente, `<SubId>` (por exemplo, POST_
  _/participantes/MSISDN/123456789 ou POST /participantes/BUSINESS/shoecompany/participante1). Consulte a Secção 5.1.6.11 para obter mais informações sobre o endereçamento de uma Parte._ ”.

### 11. O participante representa uma conta de um cliente num banco?

Para mais informações sobre este assunto, consulte este documento (Secção 3.2): https://github.com/mojaloop/mojaloop-specification/blob/develop/Generic%20Transaction%20Patterns.pdf.

» _No API, um participante corresponde a um FSP que participa em um esquema de interoperabilidade. O objetivo principal dos participantes do recurso lógico API é permitir que os FSPs identifiquem em que outro FSP se encontra uma contraparte numa transação financeira interoperável. Existem também serviços definidos para que os FSPs forneçam informações a um sistema comum._ »

Essencialmente, um participante é qualquer FSP que participe no Scheme (normalmente não é um cliente). Para a pesquisa de contas, pode ser utilizado um serviço de diretório como o *Pathfinder*, que permite a pesquisa de utilizadores e o mapeamento. Caso tal serviço de diretório não esteja disponível, a Especificação prevê uma alternativa, na qual o switch hospeda um Serviço de Pesquisa de Contas (ALS), mas no qual os participantes têm de registar as partes. Já abordei esta questão anteriormente. No entanto, é importante referir aqui que o switch não armazena os detalhes, apenas o mapeamento entre um ID e um «FSP»; posteriormente, as chamadas para identificar a parte são enviadas para esse «FSP». 

https://github.com/mojaloop/mojaloop-specification RELACIONADO COM O NÚCLEO (Mojaloop):

Este repositório contém o conjunto de documentos de especificação da Interoperabilidade «Open API para FSP» — mojaloop/mojaloop-specification.

### 12. Como registar um beneficiário _de confiança_ junto de um pagador, para evitar a OTP?

Para ignorar o OTP, o pedido inicial na rota /transactionRequests, proveniente do beneficiário, pode ser configurado programaticamente (ou manualmente, se for o caso) para ser aprovado sem recorrer ao endpoint /authorizations (necessário para a aprovação do OTP). De facto, cabe ao «FSP» tratar desta situação, não ao switch. Este aspeto é abordado sucintamente na secção 6.4 da Especificação.

### 13. Está a receber um erro 404 ao tentar aceder ou carregar o ficheiro kubernetes-dashboard.yaml?

No repositório oficial do Kubernetes no GitHub, na versão README.md, o link mais recente a utilizar é o «https://raw.githubusercontent.com/kubernetes/dashboard/v1.10.1/src/deploy/recommended/kubernetes-dashboard.yaml". Certifique-se de que verifica sempre os links de terceiros antes de proceder à implementação. As aplicações de código aberto estão em constante evolução.»

### 14. Ao instalar o nginx-ingress para balanceamento de carga e acesso externo — Erro: não foi encontrado nenhum nome de release disponível?

Por favor, consulte o seguinte artigo, que aborda uma questão semelhante. Em resumo, trata-se muito provavelmente de um problema relacionado com o RBAC. Consulte a documentação para configurar o Tiller com o RBAC. O link https://docs.helm.sh/using_helm/#role-based-access-control fornece informações detalhadas sobre este assunto. O problema registado: helm/helm#3839.

### 15. Recebeu a mensagem «ImportError: librdkafka.so.1: não é possível abrir o ficheiro de objeto partilhado: Não existe tal ficheiro ou diretório» ao executar o comando «`npm start».

Encontrei uma solução aqui https://github.com/confluentinc/confluent-kafka-python/issues/65#issuecomment-269964346

GitHub

ImportError: librdkafka.so.1: não é possível abrir o ficheiro de objeto partilhado: Não existe tal ficheiro ou diretório · Problema n.º 65 · confluentinc/confluent-kafka-python
Estou a utilizar o Ubuntu 14, pip==7.1.2, setuptools==18.3.2, virtualenv==13.1.2. Em primeiro lugar, pretendo compilar a versão estável mais recente (parece ser a 0.9.2) do librdkafka na pasta /opt/librdkafka. curl
https://codeload.github.com/ede
...

Eis os passos para recompilar a librdkafka:

git clone https://github.com/edenhill/librdkafka && cd librdkafka && git checkout `<commit_sha>

cd librdkafka && ./configure && make && make install && ldconfig

Depois disso, consigo importar ficheiros sem ter de especificar o LD_LIBRARY_PATH.
GitHub
edenhill/librdkafka
A biblioteca C/C++ do Apache Kafka. Contribua para o desenvolvimento do edenhill/librdkafka criando uma conta no GitHub.

### 16. Podemos utilizar o Mojaloop como software de carteira móvel de código aberto ou o Mojaloop destina-se apenas à interoperabilidade?

Podemos utilizar o Mojaloop para garantir a interoperabilidade, de modo a permitir a utilização de carteiras móveis e de outras transferências de dinheiro semelhantes. Este não é um software destinado ao «DFSP» (existem projetos de código aberto que atendem a estas necessidades, tais como o Finserv, etc.). O «Mojaloop» destina-se principalmente a um hub/switch e o «API» tem de ser implementado por um «DFSP». No entanto, isto não se destina à gestão de carteiras móveis propriamente ditas.

### 17. Descreva as empresas que prestam apoio à implementação e à assistência técnica do Mojaloop?

O Mojaloop é um software e uma especificação de código aberto.

### 18. Pode falar-nos um pouco sobre o Mojaloop e a segurança?

A especificação é bastante comum e apresenta bons padrões de segurança. No entanto, estes têm de ser implementados pelos adotantes e pelos responsáveis pela implementação. Além disso, as medidas de segurança têm de ser combinadas com outras medidas de segurança operacionais e relacionadas com o deployment. Por outro lado, os próximos meses centrar-se-ão na perspetiva de segurança para a comunidade de código aberto.

### 19. Quais são as vantagens de utilizar o Mojaloop como plataforma de interoperabilidade?

Vantagens: Neste momento, por exemplo, um utilizador do serviço de dinheiro móvel da Airtel só pode efetuar transferências para outro utilizador do mesmo serviço. Com esta funcionalidade, poderá efetuar transferências para qualquer prestador de serviços financeiros, como outro prestador de serviços de dinheiro móvel, qualquer outra conta bancária ou qualquer comerciante ligado ao hub, independentemente da sua implementação. Basta que estejam ligados ao mesmo switch. Além disso, esta funcionalidade foi concebida para telemóveis básicos, para que todos possam utilizá-la.

### 20. Quais são os principais desafios que as empresas enfrentam ao utilizar o Mojaloop?

Nesta altura, os principais desafios prendem-se com as expectativas. As expectativas dos adotantes do Mojaloop e o que o Mojaloop realmente é. Muitos adotantes têm uma compreensão diferente do que é o Mojaloop e das suas capacidades. Se tiverem uma boa compreensão, muitos dos desafios atuais serão atenuados.
Sim, o registo forense é uma medida de segurança, bem como para fins de auditoria, que garantirá a existência de um registo auditável das ações e que tudo o que constitua uma ação digna de nota seja registado e compilado, de forma segura após encriptação em vários níveis.

### 21. Existe registo forense/auditoria no Mojaloop? Está relacionado com a segurança da plataforma de interoperabilidade?

Isto também garante que todos os serviços executem sempre o código que devem executar e que qualquer elemento incorreto ou prejudicial seja impedido de sequer ser iniciado. Além disso, para efeitos de relatórios e auditorias, os relatórios podem incluir um registo forense que permita o acompanhamento.

### 22. De que forma é que os prestadores de serviços financeiros se ligam ao mojaloop?

Existe um diagrama de arquitetura que apresenta uma boa visão geral da integração entre as diferentes entidades. https://github.com/mojaloop/docs/blob/master/Diagrams/ArchitectureDiagrams/Arch-Flows.svg.

### 23. Existe algum conversor/conector de código aberto para a norma ISO 8583-OpenAPI disponível?

Não creio que exista, neste momento, uma integração genérica ISO 8583 ` <-> Mojaloop. Estamos a trabalhar em algumas integrações de «canais de pagamento tradicionais» para o Mojaloop (POS e ATM), que esperamos poder demonstrar na próxima reunião. Estas constituiriam a base para uma integração ISO 8583 que poderíamos desenvolver e adicionar à pilha de software de código aberto, mas tenha em conta que estas integrações serão muito específicas para cada caso de uso.

### 24. Como posso saber quais são os pontos finais para configurar o Postman para testar o deployment?

No painel «Kubernetes», selecione o NAMESPACE correto. Aceda à secção «Ingressos». Dependendo da forma como deployou os gráficos Helm, procure «moja-centralledger-service». Clique em «Editar» e localize a etiqueta «`<HOST>`». Esta conterá o endpoint deste serviço.

### 25. Por que razão não são permitidas inversões num «Mojaloop»?

*A irrevogabilidade* é um princípio fundamental do Nível Um (editado) e, para tal, é essencial não permitir revogações. Segue-se a secção da Definição n.º API que aborda esta questão:

_*6.7.1.2 Irrevogabilidade das transações*_
_O API foi concebido para permitir apenas transações financeiras irrevogáveis; isto significa que uma transação financeira não pode ser alterada, cancelada ou revertida após a sua criação. O objetivo é simplificar e reduzir os custos para os Prestadores de Serviços Financeiros (FSP) que utilizam o API. Uma grande percentagem dos custos operacionais de um sistema financeiro típico deve-se aos estornos de transações._
_Assim que um Pagador FSP envia uma transação financeira a um Beneficiário FSP (ou seja, utilizando POST /transferências, incluindo a transação financeira de ponta a ponta), a transação torna-se irrevogável do ponto de vista do Pagador FSP. A transação ainda pode ser rejeitada no Beneficiário FSP, mas o Pagador FSP já não pode rejeitar nem alterar a transação. Uma exceção a esta regra seria se o prazo de validade da transferência fosse excedido antes de o Beneficiário FSP responder (consulte as Secções 6.7.1.3 e 6.7.1.5 para mais informações). Assim que a transação financeira for aceite pelo Beneficiário FSP, a transação torna-se irrevogável para todas as partes._

No entanto, *Reembolsos* é um caso de uso permitido pela versão API.

### 26. Erro no ffg. com a instalação do microk8s: «MountVolume.SetUp falhou»?

Pareceria ser um problema de espaço, mas foram atribuídos mais de 100 GiB de armazenamento EBS.
O problema resolveu-se por si só ao fim de 45 minutos. A implementação inicial do projeto mojaloop pode demorar algum tempo a estabilizar-se.

### 27. Por que razão recebo este erro quando tento criar um participante: «A conta de reconciliação do hub para a moeda especificada não existe»?

É necessário criar as contas Hub correspondentes (HUB_MULTILATERAL_SETTLEMENT e HUB_RECONCILIATION) para a moeda especificada antes de configurar os participantes.
Nesta coleção do Postman, poderá encontrar os pedidos necessários para realizar a operação na pasta «Hub Account»: https://github.com/mojaloop/postman/blob/master/OSS-New-Deployment-FSP-Setup.postman_collection.json

Encontre também os ambientes relacionados no repositório do Postman: https://github.com/mojaloop/postman

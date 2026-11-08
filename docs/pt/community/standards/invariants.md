---
i18n_source_sha: 2dea2117611b8228894998c17b90e2113a803a5c
---

# Invariantes do Mojaloop

As invariantes seguintes foram estabelecidas ao longo do desenvolvimento da plataforma e com base nos requisitos técnicos inferidos a partir dos [Princípios do Level One Project](https://www.leveloneproject.org/project_guide/level-one-project-design-principles/) e nas melhores práticas aplicáveis do setor.
Estas invariantes deveriam orientar quaisquer discussões de design de produto e técnico relacionadas com a arquitetura da plataforma.

## Princípios gerais

### 1. A função principal da plataforma é compensar pagamentos credit-push em tempo real e viabilizar a liquidação regular, até ao final do dia de valor.
#### Notas:
1. A plataforma permite que os participantes compensem fundos imediatamente para os seus clientes, mantendo no mínimo os riscos e os custos associados.
2. A plataforma permite verificações de liquidez disponível por transferência, sempre que sejam necessárias para apoiar o primeiro objetivo.
3. O hub é otimizado para o caminho crítico.
4. Liquidação automática intradiária; configurada por scheme e por implementação, utilizando modelos de liquidação recomendados para infraestruturas de mercado financeiro.


### 2. O hub permite um processamento totalmente automático de ponta a ponta.
#### Notas:
1. «Straight through processing» significa que não deveriam ser necessárias intervenções manuais na execução de pagamentos ou liquidações, exceto quando é necessária a aceitação dos termos de um pagamento por parte de um utilizador final, em conformidade com os Princípios do Level One
2. O straight through processing ajuda a reduzir os erros humanos no processo de transferência, o que, em última análise, reduz os custos.
3. A natureza automatizada do straight through processing conduz a transferências de valor mais rápidas entre os clientes finais.

Mais informação aqui: [Straight Through Processing Definition](https://www.investopedia.com/terms/s/straightthroughprocessing.asp)


### 3. O hub não exige reconciliação manual, uma vez que o protocolo de interação com o hub garante resultados determinísticos.
#### Notas:
1. Quando uma transferência é finalizada, não pode haver dúvidas sobre o estado dessa transferência (em alternativa, não está finalizada e é dado aviso ativo aos participantes. O aviso dado aos participantes é a pedido: se perguntarem, são informados de que o estado é indeterminado).
2. O hub garante resultados determinísticos para as transferências e é aceite por todos os participantes como a autoridade final sobre o estado das transferências.
3. O determinismo significa que as transferências individuais são rastreáveis e auditáveis (com base em limites e restrições), com o resultado final fornecido dentro de um limite de tempo garantido.
4. Para evitar dúvidas, as transferências em lote são processadas linha a linha, com resultados determinísticos potencialmente diferentes para cada uma.


### 4. A lógica de configuração da transação, que é específica do caso de utilização, está separada da transferência de dinheiro isenta de políticas.
#### Notas:
1. Os detalhes da transação e as regras de negócio deveriam ser recolhidos e aplicados entre as contrapartes antes da fase de acordo dos termos e estão fora do âmbito do Mojaloop.
2. A fase de acordo estabelece um objeto de transação assinado e específico do caso de utilização, que incorpora todos os detalhes específicos da transação.
3. A fase de transferência orquestra a transferência de valor retalhista entre instituições em benefício das contrapartes (ou seja, só são aplicadas verificações de limites do sistema) e sem referência aos detalhes da transação.
4. Nenhum processamento adicional específico da transação durante a fase de transferência.


### 5. O hub não analisa nem age sobre os detalhes de ponta a ponta da transação; as mensagens de transferência contêm apenas os valores necessários para concluir a compensação e a liquidação.
#### Notas:
1. As verificações e validações durante o passo de transferência destinam-se apenas à conformidade com as regras do scheme, às verificações de limites, à autenticação de assinaturas e à validação da condição de pagamento e da sua execução.
2. As transferências que são confirmadas para liquidação são finais e a sua liquidação é garantida ao abrigo das regras do scheme.


### 6. A semântica das transferências credit-push é reduzida à sua forma mais simples e normalizada para todos os tipos de transação.
#### Notas:
1. Simplifica a implementação e a integração dos participantes, uma vez que muitos tipos de transação e casos de utilização podem reutilizar o mesmo fluxo subjacente de mensagens de transferência de valor.
2. Abstrai a complexidade do caso de utilização para fora do caminho crítico.


### 7. Um hub de serviços de API baseado na Internet não é um «message switch».
#### Notas:
1. O hub de serviços disponibiliza serviços de API em tempo real para que os participantes possam realizar transferências instantâneas credit-push de retalho.
    1.  Serviços de API como a resolução de endereços, o acordo de transação entre participantes, a submissão de transferências preparadas e a submissão do aviso de execução.
2. São disponibilizados serviços de API auxiliares aos participantes para apoiar o onboarding, a gestão de posições, os relatórios para reconciliação e outras funções não em tempo real não associadas ao processamento de transferências.
3. Todas as mensagens são validadas quanto à conformidade com a especificação da API; as mensagens não conformes são ativamente rejeitadas com um código de motivo normalizado e interpretável por máquina.


### 8. O hub expõe interfaces assíncronas aos participantes
#### Notas:
1. Para maximizar o débito do sistema.
2. Para isolar os problemas de conectividade dos nós folha, de forma a que não afetem outros utilizadores finais.
3. Para permitir que o sistema do hub processe os pedidos pela sua própria ordem de prioridade e sem manter uma ligação ativa por transferência.
4. Para tratar numerosos processos concorrentes de longa duração através de batching e balanceamento de carga internos.
5. Para ter um mecanismo único de tratamento de pedidos (Exemplos são transações como as em lote ou as que precisam de entrada do utilizador final ou que abrangem vários saltos).
6. Para dar melhor resposta às redes do mundo real, uma vez que os problemas de velocidade e fiabilidade da ligação de um participante deveriam ter um impacto mínimo noutros participantes ou na disponibilidade do sistema em geral.

### 9. A API de transferências é [idempotente](https://docs.mojaloop.io/api/fspiop/v1.1/api-definition.html#idempotent-services-in-server)
#### Notas:
1. Isto garante que os pedidos duplicados podem ser feitos em segurança pelos originadores das mensagens em condições de conectividade de rede degradada.
    1. Os pedidos duplicados são reconhecidos e resultam no mesmo desfecho (duplicados válidos) ou são rejeitados como duplicados (quando não permitido pela especificação), com referência ao original.


### 10. Os registos de transferências **_finalizadas_** são conservados durante um período configurável pelo scheme, para apoiar processos do scheme como a reconciliação e a faturação, e para fins forenses
#### Notas:
1. Não é possível consultar o «subestado» de uma transferência em processamento; a API fornece um resultado determinístico, com aviso ativo dado dentro do tempo de serviço garantido.


### 11. Os registos das transferências finalizadas são conservados indefinidamente em armazenamento de longo prazo, para apoiar a análise de negócio pelo operador do scheme e pelos participantes (através de interfaces adequadas)
#### Notas:
1. A disponibilidade dos registos de transferências pode ficar atrás da finalidade do processo online, para acomodar a separação entre a manutenção de registos e o processamento em tempo real dos pedidos de transferência.


### 12. O hub deveria fazer o mínimo de análise, armazenamento e processamento de mensagens necessário para executar os serviços que presta ao scheme como um todo.
#### Notas:
1. Nalguns fluxos de mensagens, por exemplo, a consulta de partes, pode ser desejável que os participantes tenham um ponto de contacto único para o encaminhamento de mensagens relacionadas com o scheme, mesmo quando as mensagens não se destinam ao hub nem exigem qualquer inspeção ou outro processamento.


## Segurança e proteção das APIs

### 13. As mensagens de API são confidenciais, com deteção de adulteração e não repudiáveis.
#### Notas:
1. A confidencialidade é necessária para proteger a privacidade dos participantes e dos seus clientes.
    1. Existem requisitos legais em muitos domínios regulatórios onde se espera que o Mojaloop opere e, como tal, o hub tem de aplicar as melhores práticas para garantir que a privacidade dos participantes e dos seus clientes é protegida.
2. São necessários mecanismos de integridade com deteção de adulteração para garantir que as mensagens não podem ser alteradas em trânsito.
    1. Para garantir a integridade do sistema global, cada destinatário de uma mensagem deveria conseguir determinar de forma independente, com um elevado grau de confiança, que a mensagem não foi alterada em trânsito.
    2. A criptografia de chave pública (assinatura digital) fornece o melhor mecanismo atualmente conhecido para mensagens com deteção de adulteração
        1. A segurança da chave privada do remetente é crítica.
        2. Têm de ser estabelecidas regras de scheme para clarificar as responsabilidades pela gestão de chaves e o potencial de responsabilidade financeira em caso de comprometimento de uma chave privada.
3. O não repúdio é necessário para garantir que a mensagem foi enviada pela parte que alegou tê-la enviado e que a proveniência não pode ser repudiada pelo remetente.
    1. Isto é importante para determinar a parte responsável durante os processos de auditoria e de resolução de litígios.


### 14. As mensagens de API são autenticadas na receção, antes da aceitação ou de qualquer processamento adicional
#### Notas:
1. A autenticação dá um grau de confiança de que a mensagem foi enviada pela parte que alegou tê-la enviado.
2. A autenticação dá um grau de confiança de que a mensagem não foi enviada por uma parte não autorizada.


### 15. As mensagens autenticadas não são confirmadas como aceites enquanto não forem registadas em segurança em armazenamento permanente.
#### Notas:
1. A API Mojaloop atribui um significado de negócio significativo, relacionado com o scheme, a determinados códigos de resposta HTTP em vários pontos dos fluxos de transação:
    1. Determinadas respostas HTTP, por exemplo, «202 Accepted», destinam-se a dar garantias financeiras aos participantes e, como tal, só devem ser enviadas quando a entidade recetora tiver a confiança de que criou registos permanentes e seguros que apoiam:
        1. A viabilização da recuperação de todo o sistema para um estado consistente após falha(s) num ou mais componentes/entidades distribuídos.
        2. Processos de liquidação exatos
        3. Processos de auditoria e de resolução de litígios
    2. Por exemplo, um «200 OK» do hub para o participante beneficiário, na receção de uma mensagem de execução de transferência, indica uma garantia de liquidação da transação ao beneficiário, na pendência das verificações de validação.
2. A API Mojaloop foi concebida para funcionar em segurança em condições de rede imperfeitas e, como tal, tem suporte integrado para repetições e sincronização de estado entre participantes.


### 16. Três níveis de segurança de comunicação para garantir a integridade, a confidencialidade e o não repúdio das mensagens entre um servidor de API e um cliente de API.
#### Notas:
1. Ligações seguras: mTLS obrigatório para todas as comunicações entre o scheme e os participantes autorizados.
    1. Garante que as comunicações são confidenciais, entre correspondentes conhecidos, e que estão protegidas contra adulteração.
2. Mensagens seguras: o conteúdo das mensagens JSON é assinado criptograficamente de acordo com a especificação JWS.
    1. Garante aos destinatários que as mensagens foram enviadas pela parte que alegou tê-las enviado e que a proveniência não pode ser repudiada pelo remetente.
3. Termos de transferência seguros: Interledger Protocol (ILP) entre os participantes Pagador e Beneficiário.
    1. Protege a integridade da condição de pagamento e da sua execução.
    2. Limita o tempo durante o qual uma instrução de transferência é válida.


### 17. Para garantir que o sistema é aritmeticamente consistente, é utilizada apenas aritmética de vírgula fixa.
#### Notas:
1. Para evitar dúvidas, os cálculos de vírgula flutuante podem perder exatidão e não devem ser utilizados em nenhum cálculo financeiro.
2. Consulte a representação e as formas do [Level One Decimal Type](https://docs.mojaloop.io/documentation/discussions/decimal.html).
    1. Esta especificação permite o intercâmbio sem descontinuidades com sistemas financeiros baseados em XML, sem perda de precisão ou de exatidão


## Características operacionais

O Mojaloop foi concebido para funcionar como parte de um Sistema de Pagamentos Instantâneos jurisdicional. Como tal, tem de cumprir de forma demonstrável as normas de desempenho e de resiliência exigidas a esses sistemas.


### 1. O sistema de base, demonstrado em hardware mínimo, permite compensar 1000 transferências por segundo, de forma sustentada durante uma hora, com não mais de 1% (da fase de transferência) a demorar mais de 1 segundo no hub.
#### Notas:
1. Esta medição inclui todos os componentes de hardware e software necessários, com segurança e persistência de dados de nível de produção implementadas.
2. Esta medição inclui as três fases da transferência: descoberta, acordo e transferência.
3. Esta medição não inclui qualquer latência introduzida pelos participantes.
4. Um período de uma hora é uma aproximação razoável de um pico de procura de um sistema de pagamentos nacional.
5. O custo de aumentar a capacidade deveria ser menor por unidade de capacidade do que o custo do aprovisionamento inicial.
6. 1000 transferências (compensação) por segundo é um ponto de partida razoável para um sistema de pagamentos nacional.
7. 1% das transferências (compensação) a demorar mais de 1 segundo é um ponto de partida razoável para um sistema de pagamentos nacional.
8. Os schemes Mojaloop deveriam poder começar com um ponto de custo razoável, para infraestrutura financeira nacional, e escalar de forma económica à medida que a procura cresce.


### 2. O hub tem elevada disponibilidade e é resiliente a falhas.
#### Notas:
1. Definição de «elevada disponibilidade»:
   1. Neste caso, definimos o termo «_elevada disponibilidade_» como «_a capacidade de fornecer e manter um nível de serviço aceitável perante falhas e desafios ao funcionamento normal._»
   2. Embora os schemes possam determinar a sua própria definição do que constitui um «_nível de serviço aceitável_», o Mojaloop faz determinadas escolhas de compromisso:
      1. Quando os modos de falha o permitem, o serviço é degradado em toda a população de participantes, em vez de participantes individuais sofrerem interrupções totais enquanto outros permanecem operacionais.
2. O hub não tem um ponto único de falha; ou seja, continua a funcionar com degradação mínima do serviço em caso de falha de qualquer componente individual.
   1. São disponibilizadas várias instâncias ativas de cada componente, de forma distribuída, atrás de balanceadores de carga.
   2. Cada instância ativa de um componente pode tratar pedidos de qualquer cliente/participante, o que significa que nenhum participante perde a capacidade de transacionar em caso de falha de qualquer componente individual.
3. Dada a infraestrutura adequada para funcionar, o deployment do software Mojaloop pode ser feito em configurações de vários centros de dados geograficamente distribuídos, em ativo:ativo e/ou ativo:passivo, em que tanto os serviços como os dados são replicados por vários nós físicos que se espera que falhem de forma independente.
4. Note-se que se espera que os nós dos grupos de replicação (e/ou clusters) estejam localizados em locais físicos diversos (bastidores e/ou centros de dados), com fontes de alimentação e interligações de rede independentes.
5. Caso ocorram várias falhas de componentes que não tenham sido mitigadas no software Mojaloop, na configuração de deployment ou na infraestrutura, a API Mojaloop disponibiliza mecanismos para que cada entidade do scheme recupere para um estado consistente, sendo o hub a fonte última da verdade após o restabelecimento integral do serviço.
6. _Ver também os restantes pontos relativos à resistência à perda de dados em caso de falha._
7. Dado que se pretende que os schemes Mojaloop façam parte de infraestruturas financeiras nacionais, têm de ter uma indisponibilidade tão próxima de zero quanto possível, dadas restrições de custo razoáveis.
8. É de esperar que ocorram falhas em componentes de hardware e de software, mesmo nos componentes da mais elevada qualidade disponíveis. As boas práticas sugerem que estas falhas deveriam ser antecipadas e planeadas tanto quanto possível no design do hub, com vista a minimizar a perda ou a degradação do serviço e/ou dos dados.
9. Para evitar dúvidas, isto significa que os compromissos escolhidos favorecem a disponibilidade global do serviço e a consistência do estado em detrimento do desempenho. Ou seja:
   1. Todos os participantes podem continuar a transacionar a um ritmo reduzido, em vez de alguns participantes ficarem totalmente impossibilitados de transacionar.
   2. As inconsistências de estado entre as entidades do scheme são resolúveis após o restabelecimento do serviço através da API Mojaloop, com um mínimo de reconciliação manual necessária, sendo o hub a fonte última da verdade.
10. Em situações em que não seja possível sustentar um débito suficiente para tratar atempadamente todos os pedidos recebidos, o hub dará prioridade ao processamento das transferências em curso em relação aos novos pedidos recebidos.
    1. As transferências que o hub não consiga processar antes de expirarem os prazos especificados serão terminadas por tempo limite de forma controlada.


### 3. O hub é resistente à perda de dados em caso de falha.
#### Notas:
1. Dada a infraestrutura adequada para funcionar, o deployment do software Mojaloop pode ser feito em configurações que replicam de forma fiável os dados por vários nós de armazenamento físico redundantes antes do processamento.
   1. Os componentes do motor de base de dados disponibilizados pelos mecanismos de deployment do Mojaloop permitem o seguinte:
      1. Replicação assíncrona primário:secundário
      2. Replicação síncrona primário:primário.
      3. Replicação baseada em algoritmos de consenso síncrono por quórum.
   2. Os mecanismos de replicação disponíveis dependem da camada de armazenamento e das tecnologias de base de dados utilizadas.
2. Caso ocorram várias falhas de componentes que não tenham sido mitigadas no software Mojaloop, na configuração de deployment ou na infraestrutura, a API Mojaloop disponibiliza mecanismos para que cada entidade do scheme recupere para um estado consistente com um risco mínimo de exposição financeira.
   1. As transferências só se tornam financeiramente vinculativas quando o hub tiver respondido com êxito a uma mensagem de execução de transferência do participante beneficiário. Esta resposta só é enviada quando o hub tiver persistido a mensagem de execução e o seu resultado na sua base de dados de razão geral.
   2. As marcas temporais de expiração em todas as mensagens de API financeiramente significativas viabilizam resultados atempados e determinísticos para os caminhos de falha, para todos os participantes, através de mecanismos automatizados de repetição.
3. Dado que se pretende que os schemes Mojaloop façam parte de infraestruturas financeiras nacionais, têm de fazer tudo o que for possível, dadas restrições de custo razoáveis, para evitar a perda de dados em caso de falha.
4. É de esperar que ocorram falhas em componentes de hardware e de software, mesmo nos componentes da mais elevada qualidade disponíveis. As boas práticas sugerem que estas falhas deveriam ser antecipadas e planeadas no design do hub, com vista a evitar a perda de dados.
5. Os participantes precisam de confiança atempada no estado das transações financeiras em todo o scheme, de forma a minimizar o risco de exposição e a proporcionar excelentes experiências ao cliente.


## Decisões de design
1. O NodeJS é o ambiente de execução principal, sendo o TypeScript a linguagem preferida para o desenvolvimento.
    1. Esta plataforma é de código aberto e gratuita
    2. É amplamente utilizada e ativamente apoiada pelas maiores instituições baseadas na web do mundo
    3. Tem um enorme portefólio global de bibliotecas
    4. Utiliza apenas a família ECMAScript de linguagens e bibliotecas neutras em relação à arquitetura, conhecidas por milhões de programadores web qualificados


2. Utilizar uma arquitetura distribuída de microsserviços.
    1. [Lei de Deméter](https://en.wikipedia.org/wiki/Law_of_Demeter) ou Princípio do Menor Conhecimento
    2. [Separação de responsabilidades](https://en.wikipedia.org/wiki/Separation_of_concerns) assegurada por contratos entre módulos
    3. A [arquitetura modular](https://en.wikipedia.org/wiki/Modular_programming) permite o desenvolvimento distribuído num ambiente de comunidade e a melhoria de componentes com perturbação mínima dos componentes adjacentes


3. [Publicação–Subscrição](https://en.wikipedia.org/wiki/Publish–subscribe_pattern) distribuída com [Apache Kafka](https://kafka.apache.org/intro) para a [Separação Comando–Consulta (CQS)](https://en.wikipedia.org/wiki/Command–query_separation) entre módulos


4. [Apache Kafka](https://kafka.apache.org/intro) para o tratamento persistente das mensagens de API dos participantes


5. O Mojaloop utiliza APIs baseadas em Open API 3.0.
    1. Expõe recursos mapeados para funcionalidades que servem os casos de utilização definidos da API.
    2. Prática comum para a especificação de APIs web


## Anexo A: Visão geral dos Princípios do Level One
O [Level One Project](https://www.leveloneproject.org) propõe um novo sistema de pagamentos de baixo custo que permite pagamentos digitais inclusivos e interoperáveis. O [Level One Project Guide](https://www.leveloneproject.org/project_guide/03-welcome-to-the-2019-guide/) traça uma visão de como um sistema inclusivo de serviços financeiros digitais pode funcionar em benefício das pessoas pobres. Os princípios de design subjacentes ao Guide incluem:
* Um modelo de pagamento credit-push com transferência imediata de fundos e liquidação no mesmo dia
* Interoperabilidade em circuito aberto entre prestadores
* Cumprimento de normas internacionais bem definidas e adotadas
* Proteção partilhada e adequada contra a fraude e em matéria de segurança em todo o sistema
* Requisitos de identidade e de conhecimento do cliente (KYC) eficientes e proporcionais
* Igualar ou exceder a conveniência, o custo e a utilidade do numerário

Ao utilizar uma abordagem aberta e digital às transações, e ao estabelecer parcerias com organizações dos setores público e privado, o Level One Project pretende dar acesso a uma infraestrutura partilhada de serviços financeiros digitais robusta e de baixo custo, estimulando a inovação por parte de participantes novos e existentes, reduzindo o risco e gerando valor substancial para prestadores, pessoas e economias nos mercados em desenvolvimento. Foram criados recursos adicionais para ajudar governos, ONG e prestadores de serviços financeiros a implementar estas mudanças com êxito.

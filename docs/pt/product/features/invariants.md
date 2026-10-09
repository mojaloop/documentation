# Invariantes

## Princípios gerais

**A função primária da plataforma é compensar pagamentos em tempo real
e facilitar a liquidação regular, até ao final do dia de valor.**

1.  A plataforma permite aos participantes compensar fundos imediatamente
    para os seus clientes, mantendo no mínimo os riscos e os custos a isso
    associados.

2.  A plataforma permite verificações por transferência da liquidez
    disponível, quando estas são necessárias em apoio ao primeiro objetivo.

3.  O hub está otimizado para o caminho crítico.

4.  Liquidação automatizada intradiária; configurada pelo scheme (o
    conjunto de regras do sistema de pagamentos) e pela implementação,
    utilizando os modelos de liquidação recomendados para infraestruturas
    dos mercados financeiros.

**O hub permite processamento direto (straight-through processing) totalmente automático.**

1.  O processamento direto ajuda a reduzir os erros humanos no processo de
    transferência, o que, em última análise, reduz os custos.

2.  A natureza automatizada do processamento direto conduz a transferências
    de valor mais rápidas entre os clientes finais.

**O hub não requer reconciliação manual, uma vez que o protocolo de
interação com o hub garante resultados determinísticos.**

1.  Quando uma transferência é finalizada, não pode haver dúvidas quanto ao
    estado dessa transferência (em alternativa, não é finalizada e é dada
    notificação ativa aos participantes).
2.  O hub garante resultados determinísticos para as transferências e é
    aceite por todos os participantes como a autoridade final («sistema de
    registo») quanto ao estado das transferências.
3.  Determinismo significa que as transferências individuais são
    rastreáveis, auditáveis (com base em limites e restrições), com o
    resultado final fornecido dentro de um limite de tempo garantido.
4.  Para evitar dúvidas, as transferências em lote são processadas linha a
    linha, com resultados determinísticos potencialmente diferentes para
    cada uma.

**A lógica de configuração da transação, que é específica de cada caso de
uso, está separada da transferência de dinheiro, que é isenta de políticas.**

1.  Os detalhes da transação e as regras de negócio devem ser capturados e
    acordados como regras do scheme e orientações técnicas de operação.
    Podem depois ser aplicados durante a fase de cotação por essas
    contrapartes e serão transportados entre essas contrapartes pelo Hub.
2.  A fase de acordo estabelece um objeto de transação assinado, específico
    do caso de uso, que incorpora todos os detalhes específicos da
    transação.
3.  A fase de transferência orquestra a compensação da transferência de
    valor a retalho entre instituições em benefício das contrapartes (ou
    seja, apenas são aplicadas verificações de limites do sistema) e sem
    referência aos detalhes da transação.
4.  Nenhum processamento adicional específico da transação durante a fase
    de transferência.

**O hub não analisa nem atua sobre os detalhes da transação de ponta a
ponta; as mensagens de transferência contêm apenas os valores necessários
para concluir a compensação e a liquidação.**

1.  As verificações e validações durante o passo de transferência
    destinam-se apenas à conformidade com as regras do scheme, verificações
    de limites, autenticação de assinaturas e validação da condição de
    pagamento e do seu cumprimento.
2.  As transferências confirmadas para liquidação são finais e têm garantia
    de liquidação ao abrigo das regras do scheme.

**A semântica das transferências credit-push (envio de crédito) é reduzida
à sua forma mais simples e normalizada para todos os tipos de transação.**

1.  Simplifica a implementação e a integração dos participantes, uma vez
    que muitos tipos de transação e casos de uso podem reutilizar o mesmo
    fluxo de mensagens de transferência de valor subjacente.
2.  Abstrai a complexidade dos casos de uso para fora do caminho crítico.

**O hub de serviços de API baseado na Internet não é um «switch de mensagens».**

1.  O hub de serviços fornece serviços de API em tempo real aos
    participantes para permitir transferências instantâneas credit-push a
    retalho.
2.  Serviços de API tais como a consulta de ID para participante, o acordo
    de transação entre participantes, a submissão de transferências
    preparadas e a submissão de avisos de cumprimento.
3.  São fornecidos serviços de API auxiliares aos participantes para apoiar
    o onboarding, a gestão de posições, o reporte para reconciliação e
    outras funções que não são em tempo real nem estão associadas ao
    processamento de transferências.
4.  Todas as mensagens são validadas quanto à conformidade com a
    especificação da API; as mensagens não conformes são ativamente
    rejeitadas com um código de motivo normalizado e interpretável por
    máquina.

**O hub expõe interfaces assíncronas**

1.  Para maximizar o débito (throughput) do sistema e a eficiência global.
2.  Para isolar problemas de conectividade dos nós folha, de modo a que não
    afetem outros utilizadores finais.
3.  Para permitir que o sistema do hub processe os pedidos pela sua própria
    ordem de prioridade e sem manter uma ligação ativa por transferência.
4.  Para gerir numerosos processos concorrentes de longa duração através de
    agrupamento em lotes interno e balanceamento de carga.
5.  Para dispor de um mecanismo único de tratamento de pedidos (exemplos
    são transações como as em lote, as que necessitam de entrada do
    utilizador final ou as que abrangem múltiplos saltos).
6.  Para melhor dar resposta às redes do mundo real, uma vez que os
    problemas de velocidade e fiabilidade da ligação de um participante
    deveriam ter um impacto mínimo nos outros participantes ou na
    disponibilidade do sistema em geral.

**A API de transferências é idempotente**

1.  Isto garante que os pedidos duplicados podem ser efetuados em segurança
    pelos originadores das mensagens em condições de conectividade de rede
    degradada.
2.  Os pedidos duplicados são reconhecidos e resultam no mesmo resultado
    (duplicados válidos) ou são rejeitados como duplicados (quando não
    permitidos pela especificação) com referência ao original.

**Os registos de Transferências finalizadas são mantidos durante um período
configurável pelo scheme, para apoiar processos do scheme tais como a
reconciliação e a faturação, e para fins forenses**

1.  Não é possível consultar o «subestado» de uma Transferência em curso; a
    API fornece um resultado determinístico, com notificação ativa dada
    dentro do tempo de serviço garantido.

**Os registos de Transferência das transferências finalizadas são mantidos
indefinidamente em armazenamento de longo prazo, para apoiar a análise de
negócio pelo operador do scheme e pelos participantes (através de
interfaces adequadas)**

1.  A disponibilidade dos registos de Transferência pode ficar atrasada
    relativamente à finalidade do processo online, para acomodar a
    separação entre a manutenção de registos e o processamento em tempo
    real dos pedidos de Transferência.

**O Hub pode servir de proxy para algumas mensagens entre participantes
(p. ex., durante a fase de Acordo), para simplificar a interligação, mas
sem analisar, armazenar (exceto para efeitos de encaminhamento) ou
processar adicionalmente as mensagens.**

1.  Em alguns fluxos de mensagens, p. ex. a consulta de partes (party
    lookup), pode ser desejável que os participantes tenham um ponto de
    contacto único para o encaminhamento de mensagens relacionadas com o
    scheme, mesmo quando as mensagens não se destinam ao hub nem requerem
    qualquer inspeção ou outro processamento.

**Para garantir que o sistema é aritmeticamente consistente, apenas é
utilizada aritmética de vírgula fixa.**

1.  Para evitar dúvidas, os cálculos em vírgula flutuante podem perder
    exatidão e não devem ser utilizados em nenhum cálculo financeiro.
2.  Consulte a representação e as formas do Level One Decimal Type.
3.  Esta especificação permite o intercâmbio sem atritos com sistemas
    financeiros baseados em XML, sem perda de precisão ou exatidão

## Segurança e proteção

**As mensagens da API são confidenciais, com evidência de adulteração
(tamper-evident) e não repudiáveis.**

1.  A confidencialidade é necessária para proteger a privacidade dos
    participantes e dos seus clientes.
2.  Existem requisitos legais em muitos domínios regulatórios onde se
    espera que o Mojaloop opere e, como tal, o hub deve empregar as
    melhores práticas para garantir que a privacidade dos participantes e
    dos seus clientes é protegida.
3.  Mecanismos de integridade com evidência de adulteração são necessários
    para garantir que as mensagens não podem ser alteradas em trânsito.
4.  Para garantir a integridade do sistema global, cada destinatário de uma
    mensagem deveria conseguir determinar de forma independente, com um
    elevado grau de confiança, que a mensagem não foi alterada em trânsito.
5.  A criptografia de chave pública (assinatura digital) constitui o melhor
    mecanismo atualmente conhecido para mensagens com evidência de
    adulteração.
6.  A segurança da chave privada (de assinatura) do remetente é crítica.
7.  Devem ser estabelecidas regras do scheme para clarificar as
    responsabilidades pela gestão de chaves e a potencial responsabilidade
    financeira em caso de comprometimento de uma chave privada.
8.  O não repúdio é necessário para garantir que a mensagem foi enviada
    pela parte que alegou enviá-la e que a proveniência não pode ser
    repudiada pelo remetente.
9.  Isto é importante para determinar a parte responsável durante os
    processos de auditoria e de resolução de litígios.

**As mensagens da API são autenticadas no momento da receção, antes da
aceitação ou de processamento adicional**

1.  A autenticação dá um grau de confiança de que a mensagem foi enviada
    pela parte que alegou enviá-la.
2.  A autenticação dá um grau de confiança de que a mensagem não foi
    enviada por uma parte não autorizada.

**As Mensagens autenticadas não são confirmadas como aceites até estarem
registadas em segurança em armazenamento permanente**

1.  A API Mojaloop atribui um significado de negócio importante,
    relacionado com o scheme, a determinados códigos de resposta HTTP em
    vários pontos dos fluxos de transação.
2.  Determinadas respostas HTTP, p. ex. «202 Accepted», destinam-se a
    fornecer garantias financeiras aos participantes e, como tal, só devem
    ser enviadas quando a entidade recetora tiver a confiança de ter
    efetuado registo(s) seguro(s) e permanente(s) em apoio de:
    -   Facilitar a recuperação de todo o sistema para um estado
        consistente após falha(s) em um ou mais componentes/entidades
        distribuídos.
    -   Processos de liquidação exatos
    -   Processos de auditoria e de resolução de litígios
3.  Por exemplo, um «202 Accepted» do hub para o participante beneficiário,
    após a receção de uma mensagem de cumprimento da transferência, indica
    uma garantia de liquidação da transação ao beneficiário.
4.  A API Mojaloop foi concebida para operar em segurança em condições de
    rede imperfeitas e, como tal, inclui mecanismos integrados de repetição
    e de sincronização de estado entre participantes.

**Três níveis de segurança das comunicações para garantir a integridade, a
confidencialidade e o não repúdio das mensagens entre um servidor de API e
um cliente de API.**

1.  Ligações seguras: mTLS obrigatório para todas as comunicações entre o
    hub e os participantes autorizados.
    -   Garante que as comunicações são confidenciais, entre
        correspondentes conhecidos, e que estão protegidas contra
        adulteração.
2.  Mensagens seguras: o conteúdo das mensagens JSON é assinado
    criptograficamente de acordo com a especificação JWS.
    -   Assegura aos destinatários que as mensagens foram enviadas pela
        parte que alegou enviá-las e que a proveniência não pode ser
        repudiada pelo remetente.
3.  Termos de transferência seguros: Interledger Protocol (ILP) entre os
    participantes Pagador e Beneficiário.
    -   Protege a integridade da condição de pagamento e do seu
        cumprimento.
    -   Limita o tempo durante o qual uma instrução de transferência é
        válida.

## Características operacionais

**O sistema de base, demonstrado em hardware mínimo, permite compensar
1 000 transferências por segundo, de forma sustentada durante uma hora,
com não mais de 1% (da fase de transferência) a demorar mais de 1 segundo
a atravessar o hub.**

1.  Esta medição inclui todos os componentes de hardware e software
    necessários, com segurança e persistência de dados de nível de
    produção.
2.  Esta medição inclui as três fases da transferência: descoberta, acordo
    e transferência.
3.  Esta medição não inclui qualquer latência introduzida pelos
    participantes.
4.  Um período de uma hora é uma aproximação razoável de um pico de procura
    de um sistema de pagamentos nacional.
5.  Um custo unitário de escalar inferior ao de aprovisionar inicialmente.
6.  1000 transferências (compensação) por segundo é um ponto de partida
    razoável para um sistema de pagamentos nacional.
7.  1% de transferências (compensação) a demorar mais de 1 segundo é um
    ponto de partida razoável para um sistema de pagamentos nacional.
8.  Os schemes Mojaloop deveriam poder arrancar com um custo razoável, para
    infraestruturas financeiras nacionais, e escalar de forma económica à
    medida que a procura cresce.

**Com o deployment feito corretamente, o hub é altamente disponível e
resiliente a falhas.**

1.  Neste caso, definimos o termo «altamente disponível» como significando
    «a capacidade de fornecer e manter um nível de serviço aceitável
    perante faltas e desafios ao funcionamento normal».
2.  Embora os schemes possam determinar a sua própria definição do que
    constitui um «nível de serviço aceitável», o Mojaloop faz determinadas
    escolhas de compromisso que para tal contribuem:
    -   Quando os modos de falha o permitem, o serviço é degradado em toda
        a população de participantes, em vez de participantes individuais
        sofrerem interrupções totais enquanto outros permanecem
        operacionais.
    -   O hub não tem nenhum ponto único de falha; o que significa que
        continua a operar com uma degradação mínima do serviço em caso de
        falha de qualquer componente individual.
    -   O deployment de múltiplas instâncias ativas de cada componente é
        feito de forma distribuída, atrás de balanceadores de carga.
    -   Cada instância ativa de um componente pode tratar pedidos de
        qualquer cliente/participante, o que significa que nenhum
        participante perde a capacidade de transacionar em caso de falha
        de qualquer componente individual.
3.  Dada uma infraestrutura adequada para operar, o deployment do software
    Mojaloop pode ser feito em configurações que oferecem 99,999% de
    disponibilidade (uptime) global («cinco noves»).
4.  Isto inclui configurações de múltiplos centros de dados geograficamente
    distribuídos, em ativo:ativo e ativo:passivo, onde tanto os serviços
    como os dados são replicados em múltiplos nós físicos que se espera
    que falhem de forma independente.
5.  Note-se que se espera que os nós dos grupos de replicação (e/ou
    clusters) estejam localizados em locais físicos diversos (racks e/ou
    centros de dados), com fontes de alimentação e interligações de rede
    independentes.
6.  Caso ocorram múltiplas falhas de componentes que não tenham sido
    mitigadas no software Mojaloop, na configuração do deployment ou na
    infraestrutura, a API Mojaloop fornece mecanismos para que cada
    entidade do scheme recupere para um estado consistente, sendo o hub a
    fonte última da verdade após o restabelecimento total do serviço.
7.  Consulte também os pontos adicionais relativos à resistência à perda
    de dados em caso de falhas.
8.  Dado que os schemes Mojaloop se destinam a fazer parte de
    infraestruturas financeiras nacionais, devem ter um tempo de
    indisponibilidade tão próximo de zero quanto possível, dentro de
    restrições de custo razoáveis.
9.  São de esperar falhas nos componentes de hardware e software, mesmo nos
    componentes da mais elevada qualidade disponíveis. As melhores práticas
    sugerem que estas falhas deveriam ser antecipadas e planeadas, tanto
    quanto possível, na conceção do hub, com vista a minimizar a perda ou
    degradação do serviço e/ou dos dados.
10. Para evitar dúvidas, isto significa que os compromissos escolhidos
    favorecem a disponibilidade global do serviço e a consistência do
    estado em detrimento do desempenho, de modo a que:

	-   Todos os participantes possam continuar a transacionar a um ritmo
    reduzido, em vez de alguns participantes ficarem totalmente
    impossibilitados de transacionar.
	-   As inconsistências de estado entre as entidades do scheme sejam
    resolúveis após o restabelecimento do serviço através da API Mojaloop,
    com a reconciliação manual necessária reduzida ao mínimo; sendo o hub
    a fonte última da verdade.

**O hub é resistente à perda de dados em caso de falhas.**

1.  Dada uma infraestrutura adequada para operar, o deployment do software
    Mojaloop pode ser feito em configurações que replicam de forma fiável
    os dados em múltiplos nós físicos de armazenamento redundantes antes
    do processamento.
2.  Os componentes de motor de base de dados fornecidos pelos mecanismos de
    deployment do Mojaloop permitem o seguinte:

	-   Replicação assíncrona primário:secundário.
	-   Replicação síncrona primário:primário.
	-   Replicação síncrona baseada em algoritmo de consenso por quórum.

3.  Os mecanismos de replicação disponíveis dependem da camada de
    armazenamento e das tecnologias de base de dados específicas empregues.
4.  Caso ocorram múltiplas falhas de componentes que não tenham sido
    mitigadas no software Mojaloop, na configuração do deployment ou na
    infraestrutura, a API Mojaloop fornece mecanismos para que cada
    entidade do scheme recupere para um estado consistente com um risco
    mínimo de exposição financeira.
5.  As transferências só se tornam financeiramente vinculativas quando o
    hub tiver respondido com êxito a uma mensagem de cumprimento da
    transferência proveniente do participante beneficiário. Esta resposta
    só é enviada quando o hub tiver persistido a mensagem de cumprimento e
    o seu resultado na sua base de dados de razão geral.
6.  Os carimbos temporais de expiração em todas as mensagens da API
    financeiramente significativas facilitam resultados atempados e
    determinísticos nos caminhos de falha para todos os participantes,
    através de mecanismos automatizados de repetição.
7.  Quando os schemes Mojaloop se destinam a fazer parte de infraestruturas
    financeiras nacionais, devem fazer o máximo possível, dentro de
    restrições de custo razoáveis, para evitar a perda de dados em caso de
    falha.
8.  São de esperar falhas nos componentes de hardware e software, mesmo nos
    componentes da mais elevada qualidade disponíveis. As melhores práticas
    sugerem que estas falhas deveriam ser antecipadas e planeadas na
    conceção do hub, com vista a evitar a perda de dados.
9.  Os participantes precisam de confiança atempada no estado das
    transações financeiras em todo o scheme, para minimizar o risco de
    exposição e proporcionar excelentes experiências aos clientes.

## Aplicabilidade

Esta versão deste documento refere-se à versão [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0) do Mojaloop

## Histórico do documento
  |Versão|Data|Autor|Detalhe|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|14 de abril de 2025| Paul Makin|Adicionado controlo de versões|
|1.0|5 de fevereiro de 2025| James Bush|Versão inicial|

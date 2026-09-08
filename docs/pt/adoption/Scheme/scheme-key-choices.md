# Escolhas-Chave do Scheme

- Versão: 5.0
    - Autoria: Carol Coye Benson (Glenbrook)
    - Data: outubro de 2019
    - Descrição:

---

## **Sobre o Mojaloop Community Business Document Project**

Este documento faz parte do Mojaloop Community Business Document Project. O projeto destina-se a apoiar as entidades (países, regiões, associações de prestadores ou empresas comerciais) que implementam novos sistemas de pagamentos com código Mojaloop. Estas entidades terão também de redigir as Regras de Negócio que os participantes no sistema seguirão.

O Mojaloop Community Business Document Project fornece modelos para as Regras de Negócio e documentos conexos. A implementação de um novo sistema de pagamentos envolve muitas escolhas: os modelos apresentam algumas dessas escolhas e, quando adequado, é fornecido comentário sobre a forma como cada escolha em concreto se relaciona com os objetivos de um sistema alinhado com os Level One.

Os documentos seguintes fazem parte do projeto:

- Escolhas-Chave do Scheme

- Modelo de Acordo de Participação no Scheme

- Modelo de Regras de Negócio do Scheme

- Modelo de Diretrizes de Operação da Plataforma

- Modelo de Diretrizes de Operação para a Gestão de Exceções

- Glossário Uniforme

## **Introdução**

Os Schemes de pagamentos de todo o mundo estão em processo de implementação, ou a ponderar a implementação, de sistemas de pagamentos baseados no Mojaloop. O Mojaloop é software de código aberto para empresas de serviços financeiros, reguladores governamentais e outras entidades que enfrentam os desafios da interoperabilidade e da inclusão financeira. O Mojaloop baseia-se na especificação «Open API for FSP Interoperability Specification», desenvolvida para fornecer uma especificação de API aberta para a interoperabilidade do dinheiro móvel.

A Bill & Melinda Gates Foundation prestou financiamento e apoio ao Mojaloop. O Mojaloop é código de referência de fonte aberta que demonstra os princípios do Level One Project, uma visão para mercados financeiros digitais assente em princípios de interoperabilidade, colaboração e inclusão.

Os Schemes que implementam o Mojaloop terão de fazer várias escolhas de negócio sobre a conceção do sistema. Estas escolhas, uma vez feitas, afetarão tanto a implementação técnica do Mojaloop como as Regras de Negócio que o Scheme redigirá e que os DFSP Participantes aceitarão cumprir. Este documento descreve e analisa algumas das mais significativas destas escolhas. Quando adequado, são feitas recomendações de boas práticas para alinhamento com os Princípios de Conceção do Level One Project (L1P).

Embora este documento seja redigido como contributo para a comunidade Mojaloop, as questões aqui descritas são pertinentes para qualquer sistema de pagamentos alinhado com os Level One, independentemente da implementação técnica escolhida.

## **Escolhas descritas neste documento**

[1 - Escolha: propriedade do Scheme](#_1-escolha-propriedade-do-scheme)

[2 - Escolha: participação no Scheme](#_2-escolha-participacao-no-scheme)

[3 - Escolha: relação entre o Scheme e a Plataforma](#_3-escolha-relacao-entre-o-scheme-e-a-plataforma)

[4 - Escolha: âmbito das Regras do Scheme e autoridade sobre as Regras do Scheme](#_4-escolha-ambito-das-regras-do-scheme-e-autoridade-sobre-as-regras-do-scheme)

[5 - Escolha: casos de utilização](#_5-escolha-casos-de-utilizacao)

[6 - Escolha: códigos QR](#_6-escolha-codigos-qr)

[7 - Escolha: endereçamento de pagamentos](#_7-escolha-enderecamento-de-pagamentos)

[8 - Escolha: liquidação entre participantes](#_8-escolha-liquidacao-entre-participantes)

[9 - Escolha: acesso escalonado](#_9-escolha-acesso-escalonado)

[10 - Escolha: comissões do Scheme e preços ao utilizador final](#_10-escolha-comissoes-do-scheme-e-precos-ao-utilizador-final)

[11 - Escolha: gestão da marca](#_11-escolha-gestao-da-marca)

[12 - Escolha: ligações do Scheme a outros Schemes](#_12-escolha-ligacoes-do-scheme-a-outros-schemes)

[13 - Escolha: utilização do Scheme por outros FSP](#_13-escolha-utilizacao-do-scheme-por-outros-fsp)

[14 - Escolha: normas de gestão do risco do Scheme](#_14-escolha-normas-de-gestao-do-risco-do-scheme)

[15 - Escolha: gestão de exceções](#_15-escolha-gestao-de-excecoes)

## 1. Escolha: propriedade do Scheme

O Scheme é a entidade que redige as regras do sistema de pagamentos. Como tal, o scheme controla múltiplos aspetos da prestação dos serviços do scheme, incluindo a forma como a plataforma técnica e operacional será disponibilizada aos DFSP participantes. Os modelos correntes de propriedade de um Scheme no setor dos pagamentos incluem:

- Uma associação de DFSP participantes, com ou sem propriedade parcial pelo Banco Central

- Um Banco Central ou outra entidade pública

- Uma entidade comercial

O modelo associativo maximiza o controlo do Scheme pelos DFSP e pode incentivá-los a aderir e a utilizar o scheme. Um scheme controlado por um governo ou por um banco central pode tornar mais eficaz a supervisão regulatória dos DFSP e pode simplificar a tomada de decisões: um organismo público pode estar disposto a tomar decisões de infraestrutura que sejam boas para o ecossistema no seu conjunto, em vez de otimizar os benefícios de DFSP individuais. Uma entidade comercial pode ser mais rápida a implementar um novo sistema e pode ser mais eficaz, nalgumas situações, a criar um modelo de operação sustentável.

### 1.1 Alinhamento com os Level One — propriedade do Scheme

Qualquer destas estruturas de propriedade pode concretizar os objetivos do L1P e da inclusão financeira. Os Princípios de Conceção do Level One sugerem a «autogovernação pelos DFSP» (o primeiro modelo) como conceção preferencial, com base na convicção de que a participação na governação pode aumentar o compromisso dos DFSP com o scheme. Outras conceções podem, contudo, funcionar, desde que o Scheme e os seus membros tenham alguma forma de governação participativa e operem com transparência e comunicação aberta.

O princípio mais importante do Level One é que o próprio Scheme deve operar num modelo «sem fins lucrativos» (recuperação sustentável de custos). Este último ponto é particularmente importante para concretizar o objetivo do L1P de criar um sistema de pagamentos de custo ultrabaixo. Este princípio assenta na ideia de que os DFSP podem, evidentemente, operar com fins lucrativos na prestação de serviços de pagamento. A fonte das suas receitas pode, no entanto, ser sobretudo as «[adjacências](https://docs.gatesfoundation.org/documents/fighting%20poverty%20profitably%20full%20report.pdf)», e não as comissões relacionadas com a própria transação de pagamento. Note-se que a plataforma de operação pode ser fornecida por uma entidade comercial, mesmo que o próprio Scheme seja operado numa base «sem fins lucrativos». Esta questão é aprofundada abaixo, em «Escolha: relação entre o Scheme e a Plataforma».

Muitos sistemas de pagamentos bancários herdados de todo o mundo operam no modelo associativo. Os sistemas ACH e os sistemas domésticos de cartões de débito (como o ACH dos EUA e o sistema Interac do Canadá) utilizam este modelo e entregam custos de processamento ultrabaixos aos DFSP participantes. Alguns sistemas novos de pagamentos móveis, como o sistema UPI da Índia e o sistema BIM do Peru, utilizam igualmente este modelo.

Vários países prestam serviços através do Banco Central: o modelo SPEI do México é aqui de destacar. O sistema JoMoPay da Jordânia começou como sistema de Banco Central e evoluiu para o modelo associativo.

As redes globais de cartões, nomeadamente a Visa e a MasterCard, começaram como modelos associativos e evoluíram para um modelo comercial. Muitas FinTechs, como a PayPal ou o WeChat Payments, operam sistemas de circuito fechado num modelo comercial.

## 2. Escolha: participação no Scheme

O Mojaloop e o L1P utilizam o termo «DFSP» (Digital Financial Services Provider) para designar qualquer entidade, dentro da jurisdição em que o sistema de pagamentos opera, que esteja licenciada de alguma forma para disponibilizar contas de transação de utilizador final que detêm fundos e que podem ser utilizadas para efetuar e receber pagamentos. Esta definição inclui bancos, outras instituições financeiras depositárias e emissores de eMoney (por vezes designados por Operadores de Dinheiro Móvel).

Existem inúmeros outros participantes no ecossistema que não detêm contas de transação de utilizador final: entre eles, processadores, agregadores e alguns tipos de prestadores de serviços de pagamento. A relação destas entidades com o scheme e com os DFSP é abordada em [Escolha: utilização do Scheme por outros FSP](#_13-escolha-utilizacao-do-scheme-por-outros-fsp).

A questão da participação tem duas vertentes: primeiro, que categorias de DFSP são suportadas pelo Scheme e, em segundo lugar, qual o processo pelo qual os DFSP são autorizados a participar. O termo «circuito aberto» é utilizado para designar uma estrutura em que vários DFSP aderem e utilizam o scheme para trocar transações (interoperar). Mas um scheme de «circuito aberto» pode ser um em que qualquer DFSP de uma categoria suportada é elegível para aderir, ou um em que a participação é limitada e gerida por convite. Um DFSP candidato pode ter de satisfazer determinados critérios de elegibilidade (dimensão, saúde financeira, etc.) antes de ser admitido no Scheme.

O termo «circuito fechado» é mais frequentemente utilizado para designar um scheme que não é interoperável; em que a entidade do scheme tem relações diretas com todos os clientes finais

O L1P é fortemente favorável aos sistemas de circuito aberto. Além disso, o L1P defende que todos os prestadores licenciados de contas de transação sejam elegíveis: por outras palavras, que tanto os bancos como os Emissores de eMoney sejam incluídos e autorizados a interoperar através da plataforma do Scheme.

Vários argumentos sustentam esta recomendação. O próprio conceito de «inclusão financeira» implica incluir populações anteriormente excluídas no ecossistema financeiro do país. Em muitos países, a emissão de eMoney ou outras estruturas foram aprovadas pelos reguladores para disponibilizar contas de transação a populações que não podiam ser servidas economicamente pela banca tradicional. Estes emissores de eMoney criaram frequentemente carteiras móveis de circuito fechado, e um dos objetivos do L1P e do Mojaloop é permitir a interoperabilidade dessas carteiras. Contudo, os titulares de carteiras precisam de pagar não só a outros titulares de carteiras, mas também a comerciantes e a outras instituições bancarizadas, e a particulares bancarizados. Os particulares e as instituições bancarizadas também efetuam pagamentos a titulares de carteiras. Faz sentido que o mesmo sistema de pagamentos interoperável suporte ambos, por razões de eficiência (porquê ter vários sistemas quando um único sistema pode ligar todos os intervenientes?) e por razões económicas.

O argumento económico prende-se com a natureza dos sistemas de processamento transacional: quanto maior o volume, menor o custo unitário. Este princípio é igualmente sustentado no [Relatório PAFI do Banco Mundial/CPMI](http://www.worldbank.org/en/topic/financialinclusion/brief/pafi-task-force-and-report): «o quadro promove a inovação e a concorrência ao não dificultar a entrada de novos tipos de PSP.... É promovida uma maior interoperabilidade das infraestruturas que suportam o switching, o processamento, a compensação e a liquidação de instrumentos de pagamento do mesmo tipo, bem como o acesso a essas infraestruturas... as infraestruturas de pagamento, incluindo as operadas pelos bancos centrais, têm requisitos de participação objetivos e baseados no risco, que permitem um acesso justo e aberto aos seus serviços.» Um ponto conexo e importante é que as regras do Scheme devem especificar que um Participante individual não pode discriminar qualquer outro Participante individual: salvo condicionamento por outros fatores (limites regulamentares de conta, etc.), os Participantes têm de receber as transações enviadas por outros Participantes do Scheme. Isto assegura interoperabilidade plena.

A segunda questão é a de saber que critérios de elegibilidade um potencial DFSP tem de cumprir para efetivamente aderir ao scheme. Muitos schemes de pagamentos têm procedimentos bastante elaborados para assegurar que os DFSP candidatos dispõem dos recursos financeiros para cumprir as regras e da capacidade técnica para satisfazer os requisitos operacionais das regras.

Alguma forma destes requisitos é necessária em qualquer scheme. Mas a tecnologia moderna e, em especial, os modelos de liquidação pré-financiada reduzem muito os riscos do scheme na relação com DFSP de menor dimensão. A questão de alinhamento com os Level One é aqui assegurar que o scheme não discrimina inadvertidamente os DFSP mais pequenos em favor dos grandes. O objetivo deve ser assegurar as qualificações mínimas necessárias para suportar as obrigações que um DFSP candidato assume.

## 3. Escolha: relação entre o Scheme e a Plataforma

As nossas definições separam o conceito de scheme (a entidade que redige as regras de um sistema de pagamentos) e o de plataforma (o conjunto de serviços que fisicamente possibilitam a interoperabilidade). Na maioria dos casos, embora não necessariamente, a plataforma opera como um switch que encaminha as transações de um DFSP para outro: a alternativa são ligações físicas bilaterais entre os DFSP.

Qual é a relação entre o scheme e a plataforma? Existem vários modelos demonstrados nos sistemas de pagamentos a nível global:

1. Mesma entidade: o scheme opera a plataforma. É frequente nos sistemas comerciais (por exemplo, a Visa) e também nos sistemas fornecidos por bancos centrais (por exemplo, o SPEI do Banco do México)

2. O scheme contrata a plataforma: o switch e os serviços conexos são operados por uma entidade separada, sob contrato com a entidade do scheme. O scheme paga à entidade da plataforma; este custo é recuperado através de comissões cobradas pelo scheme aos DFSP participantes. O sistema Faster Payments do Reino Unido opera segundo este modelo (a Faster Payments Scheme Ltd. contrata a Vocalink para operar a plataforma).

3. O scheme define os parâmetros pelos quais o(s) operador(es) gerem as transações regidas pelas regras: se houver vários operadores, essas entidades têm de interoperar, também conforme especificado nas regras do Scheme. Cada DFSP escolhe o operador que pretende utilizar para aceder ao sistema. O sistema ACH dos EUA funciona desta forma, tal como vários dos sistemas de pagamentos SEPA na Europa.

4. Sem switch: trata-se, na verdade, de uma variante do modelo 3 acima. Cada DFSP liga-se de forma independente e física a cada um dos outros DFSP, também dentro dos condicionalismos definidos pelas regras do scheme. Os cartões de débito na Austrália funcionam assim.

### 3.1 Alinhamento com o L1P: relação entre o Scheme e a Plataforma

Não existe um único Princípio Level One que defenda um destes modelos em detrimento dos outros. Os fatores a considerar incluem:

- O objetivo é que todos os intervenientes do ecossistema (Scheme, Plataforma, DFSP, etc.) incentivem comportamentos conformes com o L1P. Um modelo mais controlado (modelos 1 ou 2) torna isso, indiscutivelmente, mais fácil.

- Ter um sistema de baixo custo é um princípio nuclear. Contudo, é discutível se isso se consegue melhor através do Modelo 1 ou do Modelo 2. Os Modelos 3 e 4 comportam o risco de excluir ou desfavorecer os DFSP mais pequenos ou os novos entrantes no sistema.

- Nos Modelos 2 e 3, os fornecedores da plataforma terão as suas próprias diretrizes de operação. Podem existir situações em que as disposições das regras do Scheme não sejam adequadamente refletidas ou implementadas pela Plataforma. Trata-se de uma questão de poder e de controlo. O Modelo 1 evita este problema, mas pode criar um problema do tipo «vendor lock-in», em que os DFSP não têm outra alternativa senão pagar os custos da plataforma controlada pelo Scheme.

## 4. Escolha: âmbito das Regras do Scheme e autoridade sobre as Regras do Scheme

### 4.1 Âmbito

As regras dos schemes variam muito em âmbito de scheme para scheme. Todas cobrem os elementos essenciais da participação no scheme, as obrigações das partes e a mecânica da interoperabilidade. Mas muitos schemes vão bastante mais longe na definição de como os DFSP disponibilizam serviços de pagamento aos seus clientes, e em que termos. Duas áreas merecem aqui destaque:

- Alguns schemes especificam elementos da experiência do utilizador final. Exemplos disso são as redes de cartões que especificam parâmetros físicos e requisitos de conceção dos cartões. Alguns sistemas (por exemplo, o BIM do Peru) especificam como a interface do telemóvel se apresenta ao consumidor. Outros sistemas (por exemplo, o UPI da Índia) vão ao ponto de fornecer os SDK e as API que definem o que a aplicação do utilizador final pode fazer funcionalmente. Alguns sistemas podem exigir que um DFSP que recebe uma transação de credit-push a lance na conta do cliente dentro de um prazo especificado
- Alguns schemes especificam também disposições elaboradas de responsabilidade nas transações interoperáveis. Estas disposições podem variar consoante o caso de utilização e determinados atributos de uma transação. Por exemplo, nas redes de cartões, a responsabilidade pode passar do emissor do cartão para o acquirer do comerciante se o terminal do comerciante não cumprir determinadas especificações.

### 4.2 Autoridade sobre as regras

Como descrito acima, o scheme é a entidade que redige as regras do sistema de pagamentos. Mas quem aprova essas regras? Existem dois modelos principais no mercado:

- Autoridade dos DFSP. Neste modelo, todas (ou algumas) as alterações às regras são votadas pelos DFSP participantes. A votação pode ser determinada por lugar ou ponderada por volume. Muitos schemes experimentaram variantes deste modelo.

- Autoridade do Scheme com participação dos DFSP. Neste modelo, a autoridade sobre as regras cabe à entidade do scheme, mas está prevista alguma forma de participação formal ou informal dos DFSP: pode ser formal (comissões permanentes que se reúnem para apreciar alterações às regras, períodos de comentário sobre alterações às regras previstos nas próprias regras, etc.) ou informal (os representantes do scheme reúnem-se e/ou solicitam retorno escrito sobre as alterações propostas às regras).

### 4.3 Alinhamento com o L1P — âmbito e autoridade das regras

Há dois princípios Level One pertinentes: um é a governação participativa e o outro é o imperativo de entregar um sistema de baixo custo. O Level One reconhece também a importância de um sistema que seja cómodo e fácil de utilizar para os clientes utilizadores finais, em especial para os consumidores e comerciantes pobres. As considerações incluem, por conseguinte:

- As regras podem criar custos: quanto mais elaboradas forem as regras que especificam como os DFSP têm de prestar serviços ao cliente, maiores serão os custos de as cumprir.

- A compensar isto está o valor de uma experiência de consumo comum — há indícios consideráveis de que uma experiência comum pode ajudar os consumidores a autoeducarem-se na utilização dos serviços. Este é, indiscutivelmente, um fator importante para escalar o sistema. Mas quanto mais longe um scheme for na redação de regras que afetam a experiência do utilizador final, mais importante é que os DFSP participantes tenham alguma voz nessas regras.

- A experiência dos schemes tem mostrado que regras de votação explícitas, embora soem bem aos DFSP, resultam frequentemente em processos de decisão muito longos: é uma das razões pelas quais alguns schemes utilizam o segundo modelo acima e recorrem aos DFSP participantes como caixa de ressonância, sem porém lhes conferir autoridade sobre as regras.

## 5. Escolha: casos de utilização

Uma das escolhas mais importantes que um scheme tem de fazer é a de que casos de utilização suportar. Frequentemente, um scheme de retalho de credit-push em tempo real começa pelos pagamentos entre pessoas (P2P) como primeiro caso de utilização: muitas vezes, um scheme indica ao mercado que tenciona suportar outros casos de utilização no futuro. À medida que os schemes evoluem, há «subcasos de utilização» significativos a considerar: em algumas implementações Mojaloop utiliza-se para isso o termo «caso de utilização secundário»: por exemplo, se o P2P for o caso de utilização, o P2P transfronteiriço pode ser um caso de utilização secundário; carteira-para-carteira e carteira-para-conta bancária podem ser casos de utilização secundários.

As regras de negócio podem variar consoante o caso de utilização e/ou o caso de utilização secundário. Isto pode incluir detalhes operacionais (campos de dados utilizados, etc.), o tarifário do scheme (em especial, o intercâmbio) e até disposições de responsabilidade.

O documento Open API utilizado pelo código Mojaloop inclui a seguinte lista de casos de utilização:

- Transferência P2P
- Depósito Iniciado pelo Agente
- Levantamento Iniciado pelo Agente
- Levantamento Iniciado pelo Agente Autorizado no POS
- Levantamento Iniciado pelo Cliente
- Pagamento a Comerciante Iniciado pelo Comerciante
- Pagamento a Comerciante Iniciado pelo Comerciante Autorizado no POS
- Levantamento Iniciado em Caixa Automática
- Reembolso

Cada scheme que implemente o sistema escolherá os seus próprios casos de utilização primários e secundários, e as respetivas definições constarão das Regras de Negócio. Os schemes devem considerar o seguinte:

- A eventual interoperabilidade entre schemes será mais fácil (sobretudo de um scheme implementado em Mojaloop para outro) se forem utilizados os mesmos casos de utilização primários e as mesmas definições

- Os schemes podem ter de distinguir entre a capacidade de um DFSP para iniciar transações num caso de utilização específico ou caso de utilização secundário e os requisitos de que um DFSP tem de conseguir suportar a receção de transações num caso de utilização específico ou caso de utilização secundário

- Quaisquer regras redigidas especificamente para um caso de utilização ou caso de utilização secundário têm de ser detetáveis pelo sistema (por rotulagem ou inferência) se a regra for aplicada automaticamente: isto é particularmente importante para as comissões de intercâmbio específicas de um caso de negócio. A forma como isto é feito deve fazer parte da documentação de negócio, nas Diretrizes de Operação.

### 5.1 Alinhamento com o L1P — casos de utilização

Há aqui duas considerações. Uma questão significativa é a relação entre volumes elevados num sistema de pagamentos e a capacidade de entregar comissões de processamento ultrabaixas aos DFSP participantes. Quase todos os sistemas de pagamentos de retalho suportam vários casos de utilização, incluindo aqueles que começaram com um único. As redes de cartões são um excelente exemplo disso: tendo começado por suportar compras no ponto de venda, suportam agora compras online, pagamento de faturas, pagamento de salários e pagamentos B2B. O processamento de pagamentos é um negócio de escala: quanto maior o volume, mais baixos podem ser os custos unitários. O Level One apoia fortemente que um sistema de pagamentos seja utilizado para vários casos de utilização: idealmente, todos os casos de utilização de retalho (ou seja, excluindo B2B de valor elevado) de um país.

A outra consideração é tornar o sistema de pagamentos fácil de aceder e de compreender para os utilizadores finais. O mesmo sistema, com interfaces de utilizador semelhantes, etc., para os vários casos de utilização será mais fácil de usar para os utilizadores finais (em especial os utilizadores pobres ou com pouca escolaridade).

## 6 Escolha: códigos QR

Os códigos QR estão a afirmar-se como um grande facilitador dos pagamentos a comerciantes nos países em desenvolvimento. Tanto os schemes de pagamentos como as autoridades nacionais de pagamentos estão a decidir formatos, protocolos e âmbito para os códigos QR. Algumas das decisões incluem:

- O código QR é apresentado pelo comerciante e lido pelo consumidor, ou apresentado pelo consumidor e lido pelo comerciante? O Level One tem preferência por códigos QR apresentados pelo comerciante, implementados em conjugação com pagamentos push, e não pull. Um código QR apresentado pelo comerciante pode ser combinado com um número de caixa, para permitir que consumidores com telemóveis simples paguem facilmente ao mesmo comerciante.

- O código QR é estático (o mesmo para todas as compras) ou dinâmico? Mais do que uma escolha, isto está a ser encarado como uma evolução: a maioria dos mercados está a começar com códigos QR estáticos, mas tem planos para evoluir para códigos dinâmicos. Os códigos dinâmicos funcionam como uma mensagem de pagamento de «pedido de pagamento» num sistema de pagamentos push e podem conter dados específicos da compra.

- A abordagem nacional aos códigos QR utiliza uma abordagem de «código QR partilhado», em que um único código QR pode representar as credenciais de pagamento de um comerciante em vários schemes? A forma mais corrente de implementar esta abordagem é através da utilização das normas de código QR da EMVCo. Uma alternativa é a abordagem de código QR único, em que um código QR é utilizado apenas para aceder a um scheme de pagamentos interoperável (por exemplo, o sistema CoDi do México) ou a um sistema de circuito fechado (por exemplo, o WeChat Payments da China). Uma abordagem de código QR único pode criar vantagens de baixo custo, ao canalizar volume através de uma única plataforma nacional, ao passo que uma abordagem entre schemes pode permitir a concorrência entre vários schemes.

- Se for utilizada uma abordagem de código QR partilhado, existe uma única entidade nacional que controla que schemes um dado comerciante aceita? Em caso afirmativo, quem opera essa função de «repositório» e quais são as suas funções? Emite efetivamente a cadeia de dados do código QR? Em caso afirmativo, assina a cadeia e valida-a? Especula-se que um repositório de códigos QR poderia servir de ponto de supervisão entre sistemas de pagamentos e de gestão da fraude. Poderia também articular-se de alguma forma com um sistema nacional de registo de empresas. É interessante considerar que um repositório de códigos QR entre schemes poderia exigir as suas próprias regras de negócio, que se tornariam «meta-regras» situadas acima das regras de negócio de cada scheme.

- A cadeia de dados do código QR (a «carga útil») contém o «endereço de pagamento» do comerciante, ou aponta de alguma forma para um local onde este está armazenado? A segunda abordagem proporciona mais flexibilidade e favorece a capacidade de um comerciante mudar de prestador.

- Como é que o consumidor (e o comerciante) são protegidos da fraude com códigos QR?

- Qual é a economia da transação para o comerciante? O Level One tem uma forte preferência por preços nulos, ou quase nulos, para o comerciante pequeno ou pobre.

## 7. Escolha: endereçamento de pagamentos

Qualquer scheme que implemente pagamentos credit-push tem de especificar como o pagador e o seu DFSP Pagador endereçam o pagamento. O endereço tem de ser, de alguma forma, resolvido no número de conta do beneficiário junto do DFSP que disponibiliza a sua conta de transação. O scheme tem de decidir:

- Que tipos de endereços de pagamento (por vezes designados «identificadores») são utilizados. Alguns endereços de pagamento são IDs institucionais e números de conta: um código de encaminhamento bancário e um número de conta bancária são um exemplo disso. Outros endereços de pagamento podem ser números de conta sem o ID institucional: um número de telemóvel utilizado para dirigir fundos a uma carteira de eMoney fornecida por um MNO é um exemplo disso. Todos os restantes tipos de endereços de pagamento são alias de algum tipo. Um alias pode ser um endereço de e-mail, um ID de comerciante atribuído pelo scheme, um número de identificação nacional ou um número de telemóvel utilizado para dirigir fundos a uma conta que não seja a fornecida por um emissor de eMoney MNO. Um alias suportado pelo scheme pode também ser uma expressão: «pagaadamnu123».

- Para cada tipo de endereço de pagamento suportado pelo scheme, o scheme tem de determinar como esse endereço de pagamento é resolvido. No mínimo, o scheme tem de suportar um mecanismo pelo qual o endereço é mapeado para um DFSP participante do scheme responsável pela conta de transação associada a esse endereço de pagamento. A resolução pode ser feita de várias formas diferentes:

    - O scheme pode manter um diretório que mapeia o endereçamento para os IDs dos DFSP responsáveis: isto exige algum tipo de processo de registo de endereços pelos DFSP.

    - O scheme pode manter um diretório que mapeia o endereço para o DFSP responsável e que especifica também o número de conta: isto exige um processo de registo ligeiramente diferente.

    - Qualquer destes tipos de diretório pode ser mantido por um terceiro: as regras do scheme estabeleceriam como esses diretórios são preenchidos, mantidos e utilizados, e quais são as responsabilidades das várias partes.

    - Um scheme pode também utilizar um método de difusão para determinar o DFSP responsável por um dado endereço de pagamento («reclama este endereço?»), mas terá de desenvolver um protocolo para gerir conflitos caso mais do que um DFSP «reclame» o endereço.

- É importante notar que o método de resolução pode ser diferente para cada tipo de endereço de pagamento suportado. Alguns tipos de endereço de pagamento suportados podem também vir acompanhados de conjuntos de dados específicos: por exemplo, quando um pagamento é efetuado em pagamento de uma fatura, o endereço de pagamento pode ser algum tipo de alias, e a utilização desse alias pode estar associada a dados de fatura que a acompanham. Os códigos QR dinâmicos, por exemplo, criarão um «pedido de pagamento» que pode conter o ID de comerciante suportado pelo scheme (um alias) e os dados detalhados da transação que o acompanham.

A especificação Open API e o código de referência do Mojaloop suportam uma grande variedade de tipos de endereço: número de telemóvel, conta bancária, ID nacional, alias («Quickshop\@abc»), etc.

### 7.1 Alinhamento com o L1P — endereçamento de pagamentos

Um endereçamento de pagamentos seguro e fácil relaciona-se com dois conceitos importantes do Level One: a comodidade para o utilizador final e a «abertura». Esta última é particularmente importante para permitir a concorrência e a rápida escalabilidade de um sistema de pagamentos. À medida que os schemes de todo o mundo (Level One e outros) se debatem com a melhor forma de resolver a questão do endereçamento de pagamentos, parecem emergir algumas boas práticas:

- Embora a utilização do número de telemóvel, em particular, como endereço tenha um apelo evidente, parece haver uma tendência para utilizar alias — identificadores sem significado adicional. Isto está demonstrado na Índia com o sistema UPI e no novo sistema em tempo real da Austrália, onde o identificador é designado por PAYID.

- A portabilidade dos identificadores é desejável, tanto na perspetiva da comodidade do utilizador como enquanto mecanismo para evitar o «lock-in de DFSP».

- Como referido acima, o diretório tem de assegurar a unicidade do endereço de pagamento dentro do sistema de pagamentos: um dado endereço só pode ser mapeado para um único DFSP. Contudo, uma única conta de transação de um DFSP pode ter vários endereços de pagamento que a ela encaminham. Os DFSP têm a oportunidade de criar serviços de valor acrescentado para os seus clientes, diferenciando o tratamento das transações que lhes são encaminhadas através de diferentes endereços de pagamento (sujeito, evidentemente, às regras de negócio globais do scheme).

## 8. Escolha: liquidação entre participantes

Os schemes de pagamentos têm de determinar como os DFSP participantes liquidarão entre si as obrigações financeiras decorrentes das transações interoperáveis. Há várias decisões a tomar sobre o modelo de liquidação. Os modelos de liquidação existentes nos sistemas de pagamentos de retalho herdados dispõem de controlos importantes sobre os riscos. De um modo geral, os schemes têm hoje a oportunidade de fazer escolhas que tirem partido da tecnologia e da conetividade modernas para gerir esses riscos de formas diferentes. Algumas das escolhas são:

- Liquidação líquida, bruta ou bruta contínua. Tradicionalmente, a liquidação líquida tem sido utilizada nos sistemas de pagamentos de retalho (na prática, todos os sistemas exceto os RTGS). Alguns sistemas de pagamentos de retalho em tempo real utilizam agora liquidação bruta (o SPEI do México) ou tencionam fazê-lo (o Brasil). Alguns sistemas utilizam uma conta de liquidação bruta contínua (o RTP dos EUA): nesta abordagem, os DFSP detêm conjuntamente uma única conta no Banco de Liquidação, e as quotas de propriedade na conta comum são determinadas, em qualquer momento, pela posição dos DFSP na razão geral da plataforma. Esta abordagem não utiliza lançamentos de liquidação, apuramento de líquidos nem registo de lançamentos de liquidação.

- Escolha do banco de liquidação. A maioria dos sistemas de pagamentos de retalho interoperáveis utiliza o banco central do país como banco de liquidação, mas há exemplos (a liquidação das redes de cartões nos EUA) em que se utiliza um banco comercial como banco de liquidação.

- Contas de liquidação dedicadas ou polivalentes. As contas de liquidação dos DFSP, detidas no banco de liquidação, são dedicadas à finalidade da liquidação do scheme, ou são também utilizadas para outros fins (liquidações de outros schemes, saldos de reservas, etc.)? Num modelo de liquidação bruta contínua, a conta comum é sempre uma conta dedicada.

- Liquidação no próprio dia ou diferida. Num modelo de liquidação líquida, os lançamentos de liquidação são registados nas contas bancárias de liquidação no dia da transação, ou mais tarde?

- Janelas de liquidação múltiplas ou única. Num modelo de liquidação líquida, existe uma única janela de liquidação por dia útil, ou várias? Se forem várias, as janelas são definidas por períodos de tempo, por volume de transações ou por algum outro fator?

- Pré-financiada ou não. Os lançamentos de liquidação (num sistema líquido) ou as transações individuais (num sistema bruto) podem ocorrer se não houver fundos suficientes na conta bancária de liquidação? Em caso afirmativo, que mecanismos (linhas de crédito, contas de garantia, etc.) são utilizados para suportar este risco? O termo «pré-financiada» é utilizado quando as regras do scheme especificam que o DFSP tem de ter dinheiro suficiente na sua conta de liquidação para cobrir uma transação de saída: caso contrário, a plataforma recusará a transação.

- Gestão dinâmica de posições ou não. Num sistema de liquidação líquida que utiliza um switch, o switch «conhece» a posição efetiva do DFSP emissor antes de enviar a transação ao DFSP recetor?

- Cálculo automático ou manual do net debit cap. O net debit cap é um montante que o sistema utiliza, em conjugação com a gestão dinâmica de posições, para determinar se uma transação individual é ou não enviada ao DFSP recetor. Pode ser definido manualmente pelo scheme (individualmente para cada DFSP) ou de forma automatizada: esta última exige uma ligação em tempo real entre a conta bancária de liquidação (dedicada) e o switch.

- Podem ser definidas pelo scheme componentes discricionárias do net debit cap. Existem dois tipos. Uma componente discricionária do scheme pode acrescer ou subtrair ao net debit cap de um DFSP individual. Um acréscimo pode ser utilizado para criar uma margem de segurança; uma subtração pode ser utilizada para conceder capacidade de descoberto ao DFSP. Neste último caso, a responsabilidade pelo descoberto tem de ser claramente acordada entre o scheme e o banco de liquidação.

### 8.1 Alinhamento com o L1P — liquidação entre participantes

O Level One tem um princípio claro que exige liquidação no próprio dia. Fora isso, as considerações mais importantes são a forma como cada scheme gerirá o risco e os custos para os DFSP — em especial os custos de liquidez. Esta é uma área em rápida evolução nos sistemas de pagamentos, e é de esperar que diferentes schemes façam escolhas diferentes. Em geral, pode observar-se que a automatização favorece a escala e que o pré-financiamento e as janelas múltiplas favorecem o baixo risco e o baixo custo.

O código de referência do Mojaloop suporta uma variedade de mecanismos de liquidação diferentes.

## 9. Escolha: acesso escalonado

Os sistemas de pagamentos de retalho herdados (e os sistemas grossistas) suportam geralmente o acesso escalonado — a capacidade de instituições mais pequenas acederem ao sistema através de relações de correspondência com instituições maiores. Isto tem sido considerado necessário porque as instituições mais pequenas tinham frequentemente dificuldade em cumprir as obrigações de liquidação ou as obrigações técnicas (em especial de segurança) de uma participação plena.

Nos países com licenças de Emissão de eMoney (ou com outros DFSP não bancários ou não tradicionais, ou prestadores de contas de transação), a questão passa a ser se esses prestadores não tradicionais acedem ao sistema diretamente ou através de uma relação com um banco tradicional: nestes casos, a questão em causa é geralmente a da liquidação, e não a técnica.

### 9.1 Alinhamento com o L1P — acesso escalonado

Não existe um único princípio Level One que oriente um scheme sobre como tratar esta questão. Há, contudo, questões de custo e de risco a considerar:

- Note-se que as instituições maiores criaram negócios muito rentáveis a servir estas instituições mais pequenas. Estes custos, suportados pelos participantes indiretos, serão de alguma forma repercutidos nos utilizadores finais. Por isso, os schemes Level One podem querer evitar este modelo sempre que possível.

- O princípio Level One de «Circuito Aberto» sugere que um scheme deve suportar a capacidade de todos os DFSP participarem diretamente sempre que possível: a tecnologia moderna, como a utilizada pelo Mojaloop, e os modelos de liquidação pré-financiada deverão tornar isto mais simples.

- Os sistemas herdados tendem também a «esconder» a atividade da instituição mais pequena do scheme ou do hub. Isto pode ser indesejável do ponto de vista regulatório ou da gestão do risco. Alguns novos sistemas de pagamentos de retalho em tempo real (nomeadamente a rede RTP dos EUA) permitem o acesso indireto, tanto técnico como de liquidação, com total transparência da instituição mais pequena perante o scheme e a plataforma.

- Outro fator a considerar é específico dos países com Emissão de eMoney ou outros prestadores DFSP não tradicionais. Ao abrigo do princípio do L1P de envolvimento dos DFSP nas decisões de governação, pode acontecer que pedir aos Emissores de eMoney que acedam a um sistema «sob» um participante bancário deixe esses DFSP numa posição de «segundo escalão» quanto à governação: isto é, indiscutivelmente, indesejável, sobretudo nos casos — que parecem relevantes nalguns países — em que os Emissores de eMoney têm um volume de transações superior ao dos bancos que os patrocinam.

Note-se que esta secção não aborda o acesso ao sistema por outros FSP: essa matéria é tratada em [Escolha: utilização do Scheme por outros FSP](#_13-escolha-utilizacao-do-scheme-por-outros-fsp).

## 10. Escolha: comissões do Scheme e preços ao utilizador final

As comissões associadas a um scheme de pagamentos interoperável podem ser categorizadas como:

-   Comissões ao Utilizador Final: as comissões (ou exigências de saldo mínimo, etc.) cobradas por um DFSP ao seu cliente utilizador final. Inclui as comissões cobradas a consumidores, comerciantes, emissores de faturas, governos ou outras empresas. Algumas destas comissões estão especificamente associadas à própria transferência interoperável (por exemplo, uma comissão de «envio de transferência» ou uma «comissão de desconto ao comerciante»); outras são conexas (uma comissão de «levantamento», uma comissão de levantamento em caixa automática). Estas comissões são habitualmente fixadas pelo DFSP. Nalguns países e situações, a regulamentação ou acordos das regras do scheme podem aplicar-se às comissões ou influenciá-las. As comissões podem ser montantes fixos; montantes fixos; montantes percentuais sobre o valor, ou uma combinação de valor fixo e percentual. Em qualquer caso, os tarifários podem diferir em função dos escalões de valor (por exemplo, as transações de valor inferior a «X» têm esta comissão) ou do volume de transações do utilizador final.

- Comissões de Processamento: a comissão que o Scheme, e o Operador da Plataforma (se distinto), cobram aos DFSP pela utilização do scheme e da plataforma. Tal como as comissões ao utilizador final, as comissões de processamento podem ser fixas ou variáveis e podem também variar em função do escalão de valor ou do volume de transações.

- Comissões de Intercâmbio: comissões que um DFSP paga a outro DFSP relativamente a uma transação interoperável. As Comissões de Intercâmbio são normalmente fixadas pelo Scheme (nas Regras do Scheme) e são fisicamente apuradas e cobradas pelo Scheme. O scheme e o operador da Plataforma não pagam nem recebem estas comissões: são um débito para um DFSP e um crédito para o outro. Tanto a taxa das comissões de intercâmbio como o sentido (paga ou recebe o DFSP Pagador?) podem variar consoante o caso de utilização e o caso de utilização secundário. As comissões de intercâmbio podem ser fixas, uma percentagem do valor, ou uma combinação das duas.

Para além de definir as políticas de comissões, os schemes terão de decidir como as comissões são cobradas e (no caso das comissões de intercâmbio) desembolsadas. Há uma consideração importante quanto ao intercâmbio: devem as comissões ser cobradas e desembolsadas como parte da liquidação de cada transação, ou através de um processo de faturação no fim do período (por exemplo, mensal)?

### 10.1 Alinhamento com o L1P: comissões

Um dos conceitos mais importantes do Level One é ter uma plataforma de custo ultrabaixo, com comissões ao consumidor e ao pequeno comerciante tão baixas quanto possível. Um elemento importante para o conseguir num sistema de pagamentos é atingir escala. Os schemes vão querer considerar ambos os fatores ao definirem as políticas de comissões. As considerações incluem:

- **Preços ao utilizador final.** Está o scheme em posição de impor controlos ou limitações a este respeito? A resposta varia consoante o ordenamento jurídico. Alguns schemes impuseram limitações à estrutura das comissões (por exemplo, terem de ser fixas em vez de percentuais sobre o valor), a quais as partes que podem ser cobradas (por exemplo, os pagadores podem ser cobrados, mas os beneficiários não, etc.) ou ao montante global das comissões. Alguns schemes não consagraram isto nas regras, mas incentivaram acordos informais sobre políticas de comissões (sujeitos a aprovação regulatória) para incentivar a utilização pelos consumidores. Outros schemes proibiram certos tipos de práticas de cobrança, como a aplicação de sobretaxas às transações interoperáveis.

- **Comissões de Processamento.** O objetivo é aqui que as comissões do scheme aos DFSP sejam tão baixas quanto possível (especificamente e idealmente, uma fração de um cêntimo de dólar norte-americano). As melhores práticas de mercado apontam para que estas comissões sejam fixas, e não percentuais sobre o valor: faz sentido, dado que o scheme e a plataforma não assumem risco de valor no processamento das transações. Contudo, há um desafio com comissões puramente fixas: como evitar comissões demasiado elevadas para transações de valor muito reduzido. Alguns schemes abordam esta questão através de escalões de valor, com encargos fixos mais baixos para transações abaixo de determinado valor. Alguns schemes estabelecem escalões de volume para incentivar os DFSP. Os schemes podem querer incentivar (ou até impor) que os DFSP encaminhem as transações «on-us» (em que o DFSP pagador e o beneficiário são a mesma instituição) através da plataforma: nesse caso, o scheme pode querer fixar uma comissão nula para essas transações. Alguns schemes podem também cobrar quotas de adesão e/ou comissões de onboarding aos DFSP. Por fim, alguns schemes podem prever um período após o lançamento do scheme em que todas as comissões são dispensadas.

- **Comissões de Intercâmbio**. Trata-se de um tema complexo e frequentemente debatido no setor dos pagamentos a nível mundial, e que atrai muitas vezes escrutínio regulatório. Os schemes podem querer considerar:

    - Se deve ou não existir intercâmbio. Alguns sistemas de pagamentos têm-no; muitos não. Os sistemas de pagamentos de retalho em tempo real de todo o mundo dividem-se quanto a suportarem ou não a utilização do intercâmbio e, quando o fazem, quanto ao sentido em que o intercâmbio flui em casos de utilização como o P2P.

    - O intercâmbio é um mecanismo útil enquanto forma de faturação: nos casos em que quem recebe um serviço valioso (como um comerciante que quer acesso à conta de pagamento de um consumidor) não tem relação com quem presta esse serviço (o DFSP do consumidor). Outro exemplo é a utilização da caixa automática de um banco para desembolsar fundos ao cliente de outro banco.

    - O intercâmbio é mais questionável quando é utilizado para sustentar modelos de negócio herdados: por exemplo, se uma transação interoperável fizer com que um DFSP pagador «perca» uma comissão de levantamento que de outro modo teria recebido, o scheme pode especificar uma taxa de intercâmbio em que o DFSP Beneficiário paga ao DFSP Pagador para compensar essa perda. Pode ser prático recorrer ao intercâmbio nestas situações no curto prazo, mas, a longo prazo, é defensável que o modelo de negócio subjacente tem de evoluir.

    - Os schemes devem ter presente que, sempre que se utiliza o intercâmbio, está a criar-se um «custo efetivo» que é absorvido pelo DFSP que paga o intercâmbio e, provavelmente, repercutido por este nas comissões ao utilizador final.

## 11. Escolha: gestão da marca

Deve ser utilizada uma marca do scheme? Deve ser utilizada a mesma marca em todos os casos de utilização? Ou deve a única marca utilizada ser a marca do DFSP que oferece um serviço aos seus clientes? Como seria de esperar, esta é uma questão que tem sido debatida nos sistemas de pagamentos ao longo dos anos.

### 11.1 Alinhamento com o L1P — marca

O Level One tem um princípio de conceção claro que apoia uma marca comum: assenta em tornar o serviço compreensível e fácil de utilizar tanto para consumidores como para comerciantes. Uma marca comum do scheme pode ser utilizada em conjugação com as marcas dos DFSP: «Utilize o DFSP SuperPay (marca do DFSP) com a XPay (marca do scheme) para pagar as suas faturas.»

As regras de negócio terão de especificar como e onde a marca comum é utilizada.

## 12. Escolha: ligações do Scheme a outros Schemes

O aparecimento de sistemas de pagamentos de retalho em tempo real aproximadamente semelhantes em todo o mundo tem suscitado muitos debates sobre a conveniência de ligar estes schemes entre si. Isso pode facilitar as transações dentro de um país, mas assume sobretudo importância para os pagamentos transfronteiriços de todo o tipo, incluindo as remessas de trabalhadores.

Nos sistemas de pagamentos herdados, este tipo de ligação é raro numa base de scheme para scheme. Exceções notáveis são a ligação doméstica das redes de caixas automáticas e a ligação de schemes domésticos de cartões detidos ou controlados por redes globais de cartões. O que acontece, em vez disso, é que os DFSP ou outros prestadores que participam em várias redes (diretamente ou através de parcerias) criam o efeito de ligação entre schemes através de acordos individuais: é essencialmente assim que funciona a banca correspondente transfronteiriça.

O Mojaloop, enquanto tecnologia, foi concebido para permitir a conetividade de sistema para sistema. Os schemes que implementem sistemas Mojaloop terão de ponderar o equilíbrio entre celebrar acordos de negócio entre schemes (com as correspondentes ligações técnicas) e/ou permitir que os DFSP do seu scheme se liguem bilateralmente a outros schemes ou DFSP.

### 12.1 Alinhamento com o L1P — ligações a outros Schemes

Os princípios do L1P aqui pertinentes são o baixo custo e a «abertura». O código Mojaloop, em particular, tem o potencial de transformar as transações transfronteiriças, de operações regidas por relações complexas (como no caso da banca correspondente tradicional), em operações disputadas num mercado aberto e interligado. Os schemes terão de avaliar os méritos disto (que promove, indiscutivelmente, custos mais baixos) face aos riscos de domínio pelas grandes instituições. Os acordos de negócio entre schemes podem ter características benéficas de «nivelamento do terreno de jogo». São também possíveis relações híbridas. Trata-se de uma área em evolução no setor dos pagamentos, e uma em que é possível e provável uma considerável variedade de soluções.

## 13. Escolha: utilização do Scheme por outros FSP

Um scheme bem-sucedido e alinhado com o L1P será utilizado por muitas empresas — comerciantes, emissores de faturas, organismos públicos, etc. — bem como por particulares. Existirá também um vasto conjunto de outros FSP (Financial Services Providers) que não são DFSP: por outras palavras, que não detêm contas de transação de clientes. Inclui os prestadores de serviços de pagamento: agregadores, prestadores de serviços a comerciantes, vários processadores de DFSP, etc., todos os quais podem querer ligar-se ao scheme e utilizá-lo.

Conforme descrito na escolha sobre «participação» acima, um scheme alinhado com os Level One inclui como participantes diretos e liquidantes apenas as entidades que detêm as contas de transação dos utilizadores finais: as contas que são debitadas e creditadas em resultado da transação interoperável.

Outras entidades podem ligar-se fisicamente à plataforma ao abrigo de diversos acordos de negócio. O scheme terá de decidir até que ponto as regras de negócio do scheme intervêm na definição de termos ou normas para esses acordos. Como princípio geral, qualquer outro FSP que se ligue à plataforma terá de estar a atuar em nome de um DFSP cuja conta de transação de cliente esteja a ser debitada (o DFSP pagador) ou creditada (o DFSP beneficiário). Nos modelos de pagamentos herdados, o DFSP mantém todas as obrigações e responsabilidades financeiras da transação: o terceiro atua exclusivamente em nome do DFSP. As regras de negócio do scheme podem especificar requisitos para os acordos de negócio entre o DFSP e o terceiro. Nalgumas jurisdições (nomeadamente a Índia e a UE), a regulamentação está a impulsionar alterações a este modelo, para permitir que outros FSP tenham um envolvimento mais direto nos schemes. As regras do scheme terão de descrever e delimitar cuidadosamente os parâmetros destes acordos.

Nota de definição: não utilizamos aqui, deliberadamente, o termo «PSP» (Payment Service Provider), uma vez que, em diversas jurisdições, este termo é utilizado para incluir, nalguns casos, os prestadores de contas de transação e, noutros, prestadores que não disponibilizam contas de transação. Acrescente-se que, em muitos países, entidades como os agregadores detêm hoje contas financeiras em bancos ou em Emissores de eMoney e utilizam essas contas para receber dinheiro de clientes e desembolsar dinheiro a outros clientes. Neste papel, o agregador é cliente de um DFSP (o banco ou o Emissor de eMoney) e atua também como Prestador de Serviços Financeiros. É possível que, no futuro, estes agregadores não precisem de intermediar a transação financeira, mas antes forneçam instruções que conduzam à transferência direta de fundos, através do scheme, da conta de transação de um cliente para a de outro.

### 13.1 Alinhamento com o L1P — utilização por outros FSP

Os princípios são aqui, uma vez mais, o baixo custo e a abertura. O Level One incentivaria a que novos intervenientes pudessem utilizar e aceder ao scheme, desde que as suas ações sejam controladas pelo scheme de modo a assegurar a segurança e a estabilidade financeira.

## 14. Escolha: normas de gestão do risco do Scheme

Os schemes de pagamentos, as suas plataformas e os DFSP e terceiros participantes têm, evidentemente, de operar segundo normas sólidas de gestão do risco, de modo a assegurar um ecossistema de pagamentos saudável.

A questão que se coloca a um scheme é o equilíbrio entre definir ele próprio essas normas e apoiar-se noutras normas. Do ponto de vista das Regras de Negócio, esta é uma escolha significativa. Os schemes podem:

- Desenvolver normas detalhadas de gestão do risco para os DFSP (e para a Plataforma) e conduzir processos rigorosos de certificação e/ou auditoria para assegurar o seu cumprimento

- Exigir que os DFSP, a Plataforma e os terceiros sigam normas nacionais ou globais de referência em matéria de gestão do risco e de segurança

### 14.1 Alinhamento com o L1P — normas de gestão do risco

O Level One não se pronuncia sobre qual das escolhas acima é a melhor. Mas os conceitos de um sistema seguro para os consumidores utilizarem e de um sistema de baixo custo aplicam-se claramente aqui. Algumas considerações:

- Um utilitário partilhado de gestão da fraude (que os princípios Level One efetivamente apoiam) pode tratar de forma económica algumas das tarefas de gestão da fraude. Isso não reduz a carga de conformidade de cada DFSP, apenas altera a forma como este a cumpre

- As redes globais de cartões demonstraram eficazmente a capacidade de automatizar elementos do processamento de exceções, centrando-se nas transações que ocorrem com mais frequência

- A comunidade Mojaloop manifestou interesse em codificar as exceções e em prestar apoio, através de código, a alguns processos

- A comunidade Mojaloop pode também desenvolver documentos de boas práticas para o tratamento de áreas de gestão do risco, incluindo a cibersegurança

## 15. Escolha: gestão de exceções

O processamento de exceções inclui uma grande variedade de transações e de interações não padronizadas entre utilizadores e prestadores de um scheme de pagamentos. Inclui:

- Erros por parte dos utilizadores finais

- Erros por parte dos DFSP, da Plataforma ou de outros FSP

- Fraude cometida por clientes utilizadores finais, incluindo
    particulares, comerciantes, emissores de faturas ou outras entidades

- Fraude cometida por terceiros, incluindo hackers

- Ataques maliciosos ao sistema ou a DFSP individuais, incluindo ciberataques.

Os schemes têm escolhas importantes a fazer quanto ao grau de envolvimento do scheme, e das suas Regras de Negócio, na definição de como os participantes do scheme tratam estas exceções. Os sistemas de pagamentos herdados mostram-nos uma grande variedade de modelos utilizados, desde sistemas em que o scheme e as Regras de Negócio têm envolvimento mínimo no tratamento do processamento de exceções (cheques, a maioria dos sistemas ACH) até sistemas em que o scheme e as suas Regras de Negócio estão amplamente envolvidos (a maioria das redes de cartões). Os sistemas de pagamentos de retalho em tempo real de todo o mundo estão, em geral, apenas nas fases iniciais da decisão sobre como tratar estas matérias.

### 15.1 Alinhamento com o L1P — processamento de exceções

Há dois princípios de conceção do Level One muito importantes que se relacionam com isto.

- Um é o princípio da irrevogabilidade da transação. Significa que uma transação de pagamento concluída com êxito (numa implementação Mojaloop, uma transação que foi cumprida) não pode ser revertida sem o consentimento do beneficiário.

- O outro é o compromisso com um recurso partilhado de gestão da fraude ao nível da plataforma. A ideia é que o scheme e a sua plataforma terão uma visão mais ampla de todos os dados de transação e conseguirão realizar as tarefas de deteção e gestão da fraude de forma mais eficaz e a um custo mais baixo do que os DFSP individualmente. Este conceito está numa fase muito inicial de evolução, à medida que os sistemas Level One são instalados, com e sem tecnologia Mojaloop.

Os schemes enfrentarão desafios significativos nesta área à medida que ocorrer a há muito antecipada disseminação dos pagamentos a comerciantes, em especial nos mercados menos desenvolvidos que não têm setores de pagamentos com cartão muito penetrados. O desafio será equilibrar a vontade de proteger os consumidores da fraude dos comerciantes com a vontade de ter preços baixos ao utilizador final. Nos mercados de pagamentos com cartão desenvolvidos, isto é muitas vezes assegurado por regras de negócio que estabelecem que o banco de um comerciante é financeiramente responsável pela fraude cometida por esse comerciante. Funciona, mas resulta em encargos de transação relativamente elevados para o comerciante, uma vez que o seu banco tem de cobrir a sua exposição ao risco ao abrigo dessas regras. Este modelo financeiro pode ou não ser sustentável em economias menos desenvolvidas. Esta é outra área em que antecipamos uma evolução extensa nos próximos anos.

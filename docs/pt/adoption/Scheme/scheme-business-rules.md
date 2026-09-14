# Modelo de Regras de Negócio do Scheme

- Versão: 4.0
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

Os Schemes de pagamentos de todo o mundo estão em processo de implementação, ou a ponderar a implementação, de sistemas de pagamentos baseados no Mojaloop. O Mojaloop é software de código aberto para empresas de serviços financeiros, reguladores governamentais e outras entidades que enfrentam os desafios da interoperabilidade e da inclusão financeira. A Bill & Melinda Gates Foundation prestou financiamento e apoio ao Mojaloop através do The Level One Project, uma visão para mercados financeiros digitais assente em princípios de interoperabilidade, colaboração e inclusão.

Os Schemes que implementam o Mojaloop terão de redigir Regras de Negócio que regem os direitos e as responsabilidades dos participantes no sistema. Este documento fornece um modelo para essas Regras de Negócio. O modelo está estruturado como um esquema detalhado: a redação efetiva das regras será determinada pelos Schemes que as implementam e pelas jurisdições em que operam. Em muitas partes do documento, limitamo-nos a sugerir um tema sobre o qual um Scheme poderá querer redigir uma regra: também aqui, as especificidades da regra variarão de Scheme para Scheme.

Antes de redigirem as Regras de Negócio, os Schemes têm de tomar decisões de negócio importantes sobre como funcionarão o sistema e os seus parceiros de ecossistema. Estas decisões estão descritas num documento separado do Mojaloop Community Business Document Project, «Escolhas-Chave do Scheme». Recomenda-se a leitura prévia desse documento.

Modelo de Regras de Negócio do Scheme

## **Índice**

[1 - Sobre estas Regras de Negócio do Scheme](#_1-sobre-estas-regras-de-negocio-do-scheme)

[2 - Objetivos do Scheme](#_2-objetivos-do-scheme)

[3 - Participação no Scheme](#_3-participacao-no-scheme)

[4 - Regras de Negócio do Scheme](#_4-regras-de-negocio-do-scheme)

[5 - Responsabilidades e obrigações do Scheme](#_5-responsabilidades-e-obrigacoes-do-scheme)

[6 - Responsabilidades do Participante e obrigações dos Participantes](#_6-responsabilidades-do-participante-e-obrigacoes-dos-participantes)

[7 - Responsabilidade civil - repartição de responsabilidades](#_7-responsabilidade-civil-reparticao-de-responsabilidades)

[8 - Segurança, gestão do risco e confidencialidade dos dados](#_8-seguranca-gestao-do-risco-e-confidencialidade-dos-dados)

[9 - Plataforma e serviços do Scheme](#_9-plataforma-e-servicos-do-scheme)

[10 - Gestão de exceções](#_10-gestao-de-excecoes)

[11 - Anexo: Documentos Associados](#_11-anexo-documentos-associados)

[12 - Anexo: processos de onboarding e de saída](#_12-anexo-processos-de-onboarding-e-de-saida)

[13 - Anexo: Serviços do Scheme](#_13-anexo-servicos-do-scheme)

[14 - Anexo: Casos de Utilização suportados pelo Scheme](#_14-anexo-casos-de-utilizacao-suportados-pelo-scheme)

[15 - Anexo: Tabela de Comissões do Scheme](#_15-anexo-tabela-de-comissoes-do-scheme)

[16 - Anexo: gestão do risco, segurança, privacidade e normas de serviço](#_16-anexo-gestao-do-risco-seguranca-privacidade-e-normas-de-servico)

## **Um guia para este documento**

Os títulos de secção e as entradas em lista sob os títulos de secção são redação efetivamente proposta, ou secções sugeridas, para um documento de regras. O texto em itálico corresponde a comentários que podem ser utilizados quando um scheme redigir o texto efetivo de um documento de regras.

## 1. Sobre estas Regras de Negócio do Scheme

### 1.1 Estas são as Regras de Negócio do Scheme

::: tip NOTA
O software Mojaloop pode ser utilizado para trocas bilaterais entre DFSP, bem como dentro de uma estrutura de Scheme que utiliza um switch. Este documento pressupõe a segunda situação; que o Scheme fornece, contrata ou de outro modo providencia que as transações interoperáveis sejam trocadas através de um switch. Alguns dos conceitos destas regras aplicam-se apenas a esta configuração; outros seriam igualmente úteis em acordos bilaterais.
:::

### 1.2 Propriedade do Scheme

<ul><i>Quem detém o scheme, que oportunidades existem de participação na propriedade. Referência a outros documentos (estatutos, regulamentos internos, etc.)</i></ul>

### 1.3 Documentos Associados definidos

- Estas regras incluem os Documentos Associados enumerados num Anexo às presentes regras. Os Documentos Associados fazem parte das Regras de Operação e têm a mesma força que estas.

<ul><i>Os Documentos Associados devem incluir as Diretrizes de Operação da Plataforma e o Glossário Uniforme. Não incluem os vários documentos técnicos que possam ser referenciados nas Regras de Negócio ou nas Diretrizes de Operação da Plataforma.</i></ul>

### 1.4 As Regras de Negócio do Scheme são vinculativas para os Participantes

<ul><i>Repete a disposição do Acordo de Participação no Scheme. Note-se que as Regras de Negócio do Scheme só são vinculativas para os DFSP que participam no Scheme. O Scheme pode redigir regras que exijam que certas disposições destas regras sejam repercutidas nos clientes do Participante (por exemplo, comerciantes) ou nos seus parceiros (por exemplo, processadores) — mas trata-se de uma obrigação do Participante perante o Scheme, e não das outras partes.</i></ul>

### 1.5 As regras podem ser alteradas

<ul><i>Os detalhes do processo de alteração estão especificados noutro local.</i></ul>

### 1.6 Os termos estão definidos no Glossário Uniforme

<ul><i>O glossário é um documento separado, em vez de ser interno ao documento de Regras de Negócio. Assim se assegura a consistência da terminologia à medida que o serviço evolui e as Diretrizes de Operação da Plataforma se alteram.</i></ul>

## 2. Objetivos do Scheme

<ul><i>Esta é uma secção que permite a um Scheme enunciar os seus objetivos. Sugerimos o apoio às transações financeiras interoperáveis, à inclusão financeira e à igualdade de género. É também uma oportunidade para referenciar o apoio aos Princípios de Conceção do Level One Project, a uma estratégia nacional ou regional de pagamentos (ou estratégia de economia digital), ou a um conjunto de princípios de conceção específico do Scheme.</i></ul>

## 3. Participação no Scheme

### 3.1 Elegibilidade para participar

- Critérios de elegibilidade

<ul><i>Uma declaração sobre que tipos de instituições são elegíveis para se candidatarem a participante no Scheme. O princípio de conceção do Level One é que qualquer prestador licenciado de contas de transação numa jurisdição abrangida pelo Scheme deve ser elegível para se candidatar</i></ul>

- Critérios de aprovação

<ul><i>Disposições do Scheme relativas à aceitação de candidaturas, incluindo declarações de alto nível sobre a informação exigida ao candidato, como a demonstração de capacidade sustentável para cumprir as obrigações financeiras e as obrigações de conformidade. O processo de candidatura propriamente dito consta de um Anexo às presentes Regras. Os requisitos de certificação técnica podem ser enumerados nas Diretrizes de Operação da Plataforma.</i></ul>

### 3.2 Licenciamento

<ul><i>Este conceito pode aplicar-se ou não quando o operador do Scheme é uma entidade pública. Se o conceito de licenciamento não for incluído nas regras, é necessária uma disposição na secção «Elegibilidade para participar» relativa à cessação da participação de um participante.</i></ul>

- É concedida a um Participante uma Licença para participar no Scheme e para utilizar Propriedade do Scheme em conformidade com as Regras de Negócio do Scheme.

- Um Participante só pode utilizar Propriedade do Scheme em conformidade com as Regras de Negócio do Scheme. As Licenças limitarão a utilização de Propriedade do Scheme à prestação de serviços pelo Participante no âmbito do Scheme e de acordo com as Regras.

- As Licenças não serão exclusivas.

### 3.3 Acesso escalonado

<ul><i>Os Schemes podem optar por permitir que alguns candidatos acedam ao Scheme como participantes indiretos. Esta secção especifica as condições para tal. Alguns Schemes permitem separadamente a participação técnica indireta e a participação indireta na liquidação.</i></ul>

<ul><i>Se tal for permitido, são necessários termos definidos (como Banco Patrocinador e Participante Indireto). Esta secção deve indicar claramente quais são as obrigações de cada parte; pode remeter para as secções de obrigações que surgem mais adiante.</i></ul>

### 3.4 Saída da participação

<ul><i>Disposições sobre a suspensão ou cessação, pelo Scheme, da participação de um Participante no Scheme. O Scheme pode suspender, limitar ou desqualificar um Participante da participação no Scheme se determinar que a incapacidade do Participante para observar uma Regra onera indevidamente o Scheme ou os outros Participantes, ou representa riscos indevidos para a integridade do Scheme ou para a sua reputação</i></ul>

<ul><i>Disposições que permitam aos Participantes fazer cessar a sua participação no Scheme</i></ul>

## 4. Regras de Negócio do Scheme

### 4.1 Âmbito das Regras de Negócio do Scheme

- As presentes Regras aplicam-se a cada Participante e regem os direitos e as responsabilidades dos Participantes e do Scheme.

- As presentes Regras podem ser afastadas na medida em que entrem em conflito com quaisquer Leis Aplicáveis. Nada nas presentes Regras será aplicado de modo a exigir que o Scheme ou qualquer Participante viole a Lei Aplicável.

- Todas as matérias relativas à interpretação das Regras e todos os litígios emergentes da participação no Scheme ficarão sujeitos às leis de \[xxxx\]

<ul><i>Devem ser previstas disposições para a resolução de litígios entre Participantes ou entre Participantes e o Scheme.</i></ul>

### 4.2 Alterações às Regras de Negócio do Scheme

- Os Participantes podem, de tempos a tempos, apresentar sugestões ou pedidos de modificação das Regras.

- As sugestões de modificação das Regras apresentadas pelos Participantes podem ser utilizadas pelo Scheme ou por outros Participantes no âmbito do Scheme, sem compensação nem atribuição de autoria ao Participante que apresenta a sugestão ou o pedido.

- As alterações às Regras serão feitas de acordo com um procedimento consultivo:

- Um ou mais Participantes, ou o Scheme, podem propor uma alteração às Regras de Negócio do Scheme.

- O Scheme publicará as propostas a todos os Participantes e solicitará comentários e sugestões sobre estas; todos os comentários recebidos serão publicados a todos os participantes.

- O Scheme pode incluir, com a publicação de uma alteração proposta, a sua própria sugestão, determinada de forma independente, quanto à redação de uma alteração às Regras,

<ul><i>O Scheme deve dispor de um processo definido para adotar alterações, que pode incluir votação pelos Participantes ou decisão do Scheme. Se houver votação, as regras devem aqui especificar os respetivos parâmetros.</i></ul>

- O Scheme pode conceder derrogações às Regras mediante pedido dos Participantes.

- Podem ser previstas pelo Scheme disposições relativas a alterações urgentes, para fazer face a riscos ou a requisitos regulamentares.

## 5. Responsabilidades e obrigações do Scheme

### 5.1 Definir e prestar os Serviços do Scheme

- O Scheme define o conjunto de Serviços do Scheme prestados aos Participantes. A lista definida de Serviços do Scheme consta de um Anexo às presentes Regras.

<ul><i>Serviços do Scheme</i></ul>

- O Scheme especifica de que forma os Serviços do Scheme são prestados aos Participantes — podem ser operados pela entidade do Scheme, por outra entidade sob contrato com o Scheme, ou pode existir outra solução. Esta secção confere ao Scheme o direito de definir novos serviços, alterar serviços existentes, etc.

- O Scheme pode definir normas de nível de serviço para si próprio e para os participantes na utilização desses serviços

- No caso dos serviços de Plataforma externalizados, o Scheme especifica os serviços a prestar. O Scheme pode especificar os acordos de nível de serviço dos prestadores desses serviços

- Quanto ao Serviço de Liquidação do Scheme, o Scheme seleciona e contrata um ou mais Bancos de Liquidação para a Liquidação entre Participantes.

- O Scheme estabelece um Limite de Valor de Transação que fixa o valor máximo de qualquer Transferência efetuada através da Plataforma do Scheme. Os DFSP podem fixar valores inferiores para os seus clientes.

- O Scheme deve ponderar se garantirá ao DFSP Beneficiário qualquer Transferência Cumprida efetuada em conformidade com as presentes Regras

<ul><i>O Scheme deve ponderar se garantirá ao DFSP Beneficiário qualquer Transferência Cumprida efetuada em conformidade com as presentes Regras.</i></ul>

### 5.2 Redigir, atualizar e manter as Regras

- O Scheme redige, atualiza e mantém as Regras de Negócio.

- O Scheme é responsável por informar os Participantes de quaisquer alterações às Regras, de todas as comissões, das políticas que possam afetar a utilização do Scheme pelos Participantes ou de qualquer outra informação importante e pertinente.

- O Scheme é responsável por estabelecer uma política de aplicação das Regras e por comunicá-la aos Participantes;

- O Scheme é responsável por estabelecer políticas relativas à concessão de derrogações às Regras aos Participantes,

### 5.3 Outras responsabilidades do Scheme

- O Scheme administra os processos de onboarding e de saída dos Participantes. Estes processos estão enumerados num Anexo às presentes regras.

- O Scheme monitoriza a elegibilidade continuada dos Participantes ao abrigo dos requisitos estabelecidos para a Participação

- O Scheme define um conjunto de Casos de Utilização e de Casos de Utilização Secundários. Estes estão enumerados num Anexo às presentes regras

- O Scheme estabelece a Tabela de Comissões e define os processos pelos quais as Comissões são cobradas. A Tabela de Comissões consta de um Anexo às presentes regras

- O Scheme define a Marca do Scheme e estabelece diretrizes para a sua utilização. Estas diretrizes constam de um Documento Associado.

- O Scheme mede o progresso do Scheme e dos seus Participantes

- O Scheme define políticas e procedimentos de Segurança, Gestão do Risco e Confidencialidade dos Dados para o Scheme e para os seus Participantes.

- O Scheme define políticas e procedimentos para a gestão de Exceções de Transação.

- O Scheme desenvolve atividades para promover e incentivar a adoção e a utilização do Scheme.

- O Scheme planeia a melhoria e a expansão a longo prazo da Plataforma, para responder às necessidades e oportunidades de mercado em evolução no prosseguimento dos objetivos do Scheme.

## 6. Responsabilidades do Participante e obrigações dos Participantes

- Os Participantes são obrigados a cumprir as presentes Regras de Negócio e os Documentos Associados às presentes Regras.

- Os Participantes têm de cumprir toda a Lei Aplicável no que respeita à sua participação no Scheme, nos territórios em que operam e nos quais utilizam Serviços do Scheme. O Scheme não assume qualquer responsabilidade pelo cumprimento da Lei Aplicável por parte dos Participantes.

- Os Participantes são obrigados a permitir a utilização e a divulgação de Informação Pessoal na medida exigida pelas presentes Regras de Negócio, bem como a prestar informação aos seus Clientes e a obter os consentimentos necessários quanto a essa utilização e divulgação de Informação Pessoal, conforme exigido pela Lei Aplicável.

- Os Participantes aceitam pagar comissões ao Scheme e aos outros Participantes, conforme especificado nas presentes regras.

- Os Participantes cumprirão as especificações da marca do Scheme, conforme especificado nas presentes regras.

- Os Participantes utilizarão os Serviços do Scheme conforme especificado nas presentes regras.

    <ul><i>Os Schemes terão de ponderar se pretendem: 1) exigir a utilização do scheme para as transações elegíveis para o scheme (partindo do princípio de que dispõem de autoridade regulamentar para tal); 2) exigir a utilização da plataforma do scheme para as transações «on-us» (o que exigiria uma comissão de processamento separada, provavelmente nula, para essas transações); se as transações «on-us» não passarem pela plataforma, se o scheme pretende exigir o reporte das transações «on-us» ao scheme, para utilização com um utilitário de fraude.</i></ul>

- Todas as transferências efetuadas com a Marca do Scheme, ou descritas como efetuadas com o Scheme, serão realizadas através de Serviços do Scheme.

    <ul><i>Os Schemes terão de ponderar se pretendem enunciar a regra acima. Alguns Schemes podem querer que os Participantes utilizem a marca do Scheme em transações on-us que não utilizam Serviços do Scheme. Isto poderia ser redigido como «todas as transferências interoperáveis»</i></ul>

- _\[Opção de Liquidação Líquida\]_ Os Participantes abrirão uma Conta Bancária de Liquidação junto do Banco de Liquidação especificado pelo scheme, ou disponibilizarão uma conta existente para estes efeitos, conforme permitido pelo Scheme. _\[Opção de Liquidação Bruta Contínua\]_ Os Participantes tornar-se-ão comproprietários da Conta de Liquidação Comum do Scheme e assinarão o Acordo de Conta Bancária de Liquidação do Scheme nesse sentido. Os Participantes transferirão fundos para dentro e para fora dessa conta a partir das suas contas existentes de reservas, de compensação ou fiduciárias no Banco de Liquidação do Scheme, conforme especificado nas Diretrizes de Operação do Scheme.

- Os Participantes partilharão informação com o Scheme na estrita medida do necessário ao funcionamento do Scheme, incluindo para efeitos de devida diligência, onboarding técnico, configuração, gestão de transações e outros fins especificados nas Regras.

- O Scheme exigirá aos Participantes que cumpram as normas de Segurança, Gestão do Risco e Confidencialidade dos Dados por si especificadas.

- Os Participantes prestarão apoio ao cliente adequado aos seus clientes no âmbito do Scheme.

- Os Participantes têm de excluir clientes da utilização do Scheme, a pedido do Scheme, quando este determine razoavelmente que um cliente representa um risco para o Scheme, o que pode incluir risco financeiro, legal, de segurança, reputacional ou qualquer outro risco.

- Os Participantes não utilizarão, nem permitirão que os clientes utilizem, o Scheme para fins ilícitos, incluindo bens ou serviços ilícitos; pagamentos ilícitos, tais como suborno, branqueamento de capitais ou financiamento do terrorismo; caça furtiva ou tráfico de espécies animais protegidas ou de produtos delas derivados.

    <ul><i>Os Schemes podem ponderar se pretendem especificar que os Participantes proíbam contratualmente os clientes de utilizar os Serviços do Scheme para fins ilícitos e que cessem os Serviços do Scheme aos clientes que saibam, ou suspeitem, estarem a utilizar os Serviços do Scheme para iniciar ou receber transferências para fins ilícitos</i></ul>

### 6.1 Responsabilidades e obrigações dos Participantes enquanto DFSP Pagadores

- Um Participante que origina um Pedido de Cotação ou um Pedido de Transferência atua como Participante Pagador ao abrigo das presentes Regras.

- Um Participante pode iniciar uma Transação em nome do seu Pagador para qualquer Caso de Utilização ou Caso de Utilização Secundário suportado pelo Scheme.

- Um Participante Pagador fica obrigado a liquidar uma Transferência mediante a submissão de um Pedido de Transferência, salvo se esse Pedido de Transferência for recusado pelo DFSP Beneficiário ou expirar sem cumprimento.

- O Participante Pagador garante, na submissão de cada Pedido de Transferência, que a Transferência provém de uma conta conforme com as regras de KYC e AML e é executada em conformidade com a Lei Aplicável, e que foi prestada ao Pagador toda a informação e que este deu todos os consentimentos necessários à realização da Transferência em conformidade com as presentes Regras de Negócio e com a Lei Aplicável.

- O Participante Pagador garante, na submissão de um Pedido de Transferência, que o Pedido de Transferência foi autorizado pelo seu Pagador e que as suas comunicações com o Pagador foram devidamente autenticadas em conformidade com as presentes Regras de Negócio e com a Lei Aplicável.

- O Participante Pagador reconhece que a Plataforma rejeitará um Pedido de Transferência se a Transferência proposta violar as presentes Regras de Negócio, designadamente por exceder o Net Debit Cap do Participante Pagador.

### 6.2 Responsabilidades e obrigações dos Participantes enquanto DFSP Beneficiários

- Um Participante que recebe e responde a um Pedido de Cotação ou a um
 Pedido de Transferência atua como Participante Beneficiário ao abrigo das presentes Regras.

- Um Participante Beneficiário que recebe um Pedido de Cotação é obrigado a responder, na ausência de problemas técnicos, com uma Resposta a Cotação se:

  - A Conta de Transação do Beneficiário junto do Participante Beneficiário estiver regular e apta a receber, nesse momento, o Montante da Transferência e

  - A aceitação da Transferência não colocar a conta do Beneficiário num estado não permitido pela Lei Aplicável ou pelas políticas e acordos de conta do Participante.

  - O Participante Beneficiário confirma, ao emitir uma Resposta a Cotação que não seja uma resposta de erro, que a conta do Beneficiário foi Validada — está aberta, regular e apta a aceitar o Montante da Transferência proposto nesse momento.

- O Participante Beneficiário confirma, ao emitir uma Resposta a Cotação que não seja uma resposta de erro, que uma Transferência para a conta designada cumpre, nesse momento, os requisitos aplicáveis de AML/CTF e KYC.

- Um Participante Beneficiário que recebe um Pedido de Transferência é obrigado, na ausência de problemas técnicos, a responder com uma Resposta a Transferência com o Estado da Transação «Committed» se:

  - Tiver recebido um Pedido de Cotação e respondido com uma Resposta a Cotação para a Transação e

  - A Resposta a Cotação ainda não tiver expirado

  - A Conta de Transação do Beneficiário junto do Participante Beneficiário estiver regular e apta a receber, nesse momento, o Montante da Transferência e

  - A aceitação da Transferência não colocar a conta do Beneficiário num estado não permitido pela Lei Aplicável ou pelas políticas e acordos de conta do Participante e

  - O Pedido de Transferência da Transação não tiver expirado.

- Um Participante Beneficiário que envia uma Resposta a Transferência com o Estado da Transação «Committed» tem de lançar essa Transferência na conta do Beneficiário no prazo de \[X tempo\].

- Um Participante Beneficiário que recebe um Pedido de Transferência que não cumpre os critérios acima é obrigado a responder com uma Resposta a Transferência com o Estado da Transação «Aborted».

- O Participante Beneficiário tem de confirmar, na submissão de cada Resposta a Transferência com o Estado da Transação «Committed», que a Transferência está a ser creditada numa conta conforme com as regras de AML e é executada em conformidade com quaisquer limitações de volume da conta, ou com qualquer outra regulamentação aplicável nos territórios em que opera, e que foi prestada ao Beneficiário toda a informação e que este deu todos os consentimentos necessários à realização da Transferência em conformidade com as Regras e com a Lei Aplicável.

## 7. Responsabilidade civil - repartição de responsabilidades

- Cada Participante é responsável pelos erros que cometa e pela fraude cometida pelos seus colaboradores ou prestadores, em conformidade com a Lei Aplicável.

- O Scheme não será responsabilizado, e cada Participante indemnizará e defenderá o Scheme, por reclamações emergentes de ações ou omissões dos Participantes, dos seus Clientes ou prestadores.

- O Scheme pode optar por contestar qualquer reclamação nas circunstâncias em que determine que a resolução dessa reclamação pode ter impacto adverso nas finanças, nas operações ou na reputação do Scheme.

- O Scheme será responsabilizado pelos seus próprios erros no processamento de Transferências, dentro dos limites previstos nas Regras.

- O Scheme compensará os Participantes pelos custos de fundos na medida em que um Participante seja indevidamente privado de fundos durante um período de tempo em resultado de erros cometidos pelo Scheme.

- Cada Participante é responsável pelas ações e omissões de quaisquer prestadores por si contratados para prestar serviços no âmbito do Scheme, na mesma medida em que o seria se tivessem sido praticadas pelo próprio Participante.

- O Scheme pode repartir entre os Participantes a responsabilidade pelas consequências da utilização ou do acesso não autorizados a dados por um Participante, ou de um Incidente de Segurança sofrido por um Participante que afete outros Participantes ou o Scheme, em conformidade com os princípios enunciados nas Regras.

## 8. Segurança, gestão do risco e confidencialidade dos dados

### 8.1 Confidencialidade e proteção da Informação Pessoal

- A Informação Confidencial do Scheme divulgada aos Participantes será mantida confidencial por estes e utilizada apenas para os fins permitidos pelas Regras. A Informação Confidencial do Scheme pode incluir tecnologia proprietária e outras matérias designadas pelo Scheme.

- Os dados das transações não serão propriedade do Scheme e serão propriedade de um Participante no que respeita às Transações dos seus Clientes.

- A confidencialidade dos dados das transações e de qualquer Informação Pessoal tratada na Plataforma será protegida pelo Scheme e pelos Participantes em conformidade com a Lei Aplicável.

- As estatísticas ou os dados que identifiquem um Participante, ou a partir dos quais o Participante possa ser identificado, não serão divulgados a outros Participantes. O Scheme pode elaborar, para uso interno, e divulgar a terceiros, para fins promocionais, estatísticas baseadas em dados agregados e anonimizados, conforme permitido pela Lei Aplicável.

- O Scheme divulgará Informação Confidencial para dar cumprimento à Lei Aplicável ou a uma instrução de uma Autoridade Reguladora.

- O Scheme protegerá da utilização indevida a Informação Pessoal na sua posse ou sob o seu controlo e, quanto ao demais, tratará essa informação em conformidade com a Lei Aplicável que protege a privacidade das pessoas singulares.

- O Scheme manterá medidas de segurança de referência no setor para proteger a informação de acessos e utilizações não autorizados.

- Os Participantes notificarão o Scheme, e reconhecem que o Scheme pode notificar os outros Participantes, de qualquer Incidente de Segurança nos sistemas ou instalações do Participante, das suas entidades associadas ou de qualquer fornecedor terceiro por si contratado para prestar serviços de apoio à sua participação no Scheme.

- O Scheme pode realizar investigações a Incidentes de Segurança. Os Participantes cooperarão plena e prontamente com a investigação. Essas investigações correrão por conta do Participante afetado.

- O Scheme pode exigir a um Participante que realize investigações a Incidentes de Segurança e pode exigir que essas investigações sejam conduzidas por auditores de segurança independentes qualificados e aceitáveis para o Scheme.

- O Scheme pode impor ao Participante afetado condições de continuação da participação relativas à correção das causas do Incidente de Segurança e às medidas de segurança subsequentes.

- A investigação e o relatório, bem como as medidas corretivas que possam ser exigidas, serão mantidos confidenciais na medida permitida pela Lei Aplicável.

### 8.2 Políticas de gestão do risco

<ul><i>Esta secção parte do princípio de que o desenvolvimento das políticas de gestão do risco pelo Scheme e pelos seus participantes irá evoluindo. Esta secção prevê que algumas dessas políticas venham (a prazo) a constar das Regras; outras não.</i></ul>

- As políticas e os procedimentos de gestão do risco podem constar das Regras, dos Documentos Associados ou de outros documentos escritos de política criados pelo Scheme e distribuídos aos Participantes

- As políticas e os procedimentos de gestão do risco incluirão a solidez financeira, a integridade do sistema e o cumprimento da Lei Aplicável, em especial quanto às medidas de Combate ao Branqueamento de Capitais/Combate ao Financiamento do Terrorismo, à privacidade da informação pessoal e à segurança dos dados

- As funções de gestão do risco incluem procedimentos aplicáveis aos Participantes para a monitorização dos riscos, incluindo requisitos de reporte e auditorias

### 8.3 Continuidade do negócio

- Disposições para assegurar a continuidade do negócio por parte do Scheme, dos seus fornecedores e dos Participantes.

## 9. Plataforma e serviços do Scheme

- O Scheme define o conjunto de Serviços do Scheme a que os Participantes acedem para utilizar o sistema. Estes estão enumerados num Anexo ao presente documento. Os Serviços do Scheme nucleares necessários à interoperabilidade são considerados a Plataforma do Scheme.

- Os detalhes técnicos e operacionais sobre a utilização dos Serviços do Scheme, incluindo a Plataforma do Scheme, constam dos Documentos Associados. A lista destes Documentos Associados é um Anexo ao presente documento.

## 10. Gestão de exceções

- Podem ocorrer problemas durante a execução de uma Transação que dão origem a casos de exceção, os quais podem exigir, ou ser facilitados por, comunicação entre Participantes. Os casos de exceção podem incluir erros de qualquer das partes, fraude ou outras anomalias do serviço.

- O Scheme criará e manterá protocolos pelos quais os Participantes possam determinar o tipo de exceção e as ações sugeridas ou exigidas aos Participantes para resolver a exceção. Estes protocolos constam de um Documento Associado.

- A gestão de exceções rege-se pelos seguintes princípios:

  - Os Participantes envolvidos cooperarão de boa-fé.

  - Cada Participante aceita não contactar diretamente o cliente do outro Participante durante o processo de resolução de litígios.

  - Os Participantes aceitam cooperar entre si e com o Scheme na partilha de informação sobre fraude suspeita ou confirmada.

### 10.1 Irrevogabilidade da transação

- Os Participantes aceitam que as Transferências Cumpridas executadas através da Plataforma são irrevogáveis. Uma Transferência creditada na conta de um Beneficiário em resultado de uma Transferência do Scheme não pode ser revogada sem o consentimento do Beneficiário.

- O Scheme pode instruir um Participante a iniciar uma transação corretiva entre Participantes, num montante determinado pelo Scheme como necessário para corrigir erros causados pelo DFSP Pagador, pelo DFSP Beneficiário ou pelo Scheme. As condições em que tais transações corretivas podem ser efetuadas são especificadas nas Regras.

- Os erros do DFSP Beneficiário, do DFSP Pagador ou do Scheme que resultem no lançamento erróneo ou duplicado de uma Transferência na conta de um Beneficiário podem ser corrigidos pelo Participante Beneficiário, desde que as instruções da Transferência Cumprida não sejam revogadas nem alteradas de qualquer forma.

## 11. Anexo: Documentos Associados

- Glossário Uniforme

- Diretrizes de Operação da Plataforma

- Diretrizes da Marca

- Protocolos de Gestão de Exceções

## 12. Anexo: processos de onboarding e de saída

## 13. Anexo: Serviços do Scheme

Os Serviços do Scheme incluem:

- Plataforma do Scheme, que inclui

  - O Serviço de Transferências

  - O Serviço de Diretório

  - O Serviço de Liquidação

  - O Serviço de Gestão do Scheme

- Outros Serviços Partilhados

  - Utilitário de Gestão da Fraude

## 14. Anexo: Casos de Utilização suportados pelo Scheme

<ul><i>Os Casos de Utilização são definidos pelo tipo de cliente que paga a outro tipo de cliente e pela finalidade do pagamento. Os casos de utilização secundários são subconjuntos dos Casos de Utilização e servem para evidenciar diferenças mais finas entre transferências. Todas as transferências efetuadas através de Serviços do Scheme podem ser classificadas num, e apenas num, Caso de Utilização e Caso de Utilização Secundário.</i></ul>

<ul><i>O Caso de Utilização e o Caso de Utilização Secundário de uma Transação podem exigir a aplicação de detalhes operacionais e técnicos diferentes, conforme especificado nas Diretrizes de Operação da Plataforma; a aplicação de comissões de intercâmbio diferentes, conforme especificado num Anexo às presentes regras; a aplicação de requisitos diferentes quanto aos procedimentos de gestão de exceções, conforme especificado num Documento Associado às presentes regras</i></ul>

<ul><i>Todos os Casos de Utilização e Casos de Utilização Secundários suportados pelo Scheme são definidos por atributos das transações, especificados nas Diretrizes de Operação da Plataforma.</i></ul>

<ul><i>Segue-se um exemplo de uma tabela de Casos de Utilização e de Casos de Utilização Secundários que um scheme poderá suportar.</i></ul>

<ul><i>Um scheme só definiria Casos de Utilização Secundários se pretendesse redigir regras e/ou especificar comissões exclusivas desse Caso de Utilização Secundário</i></ul>

|       | Caso de Utilização   | Caso de Utilização Secundário          |
| :---: | :--------: | :-------------------------- |
| 1.0 | P2P | Pessoa para Pessoa |
| 1.1 | P2P | Carteira para carteira |
| 1.2 | P2P | Banco para banco |
| 1.3 | P2P | Carteira para banco |
| 1.4 | P2P | Banco para Carteira |
| 2.0 | Pagamento em Massa |  |
| 2.1 | B2P | Empresa para Pessoa |
| 2.2 | G2P | Governo para Pessoa |
| 3.0 | P2B | Pessoa para Empresa |
| 3.1 | P2B | Compra por Número de Caixa |
| 3.2 | P2B | Compra por código QR |
| 3.3 | P2B | Compra Online |
| 3.4 | P2B | Pagamento de Faturas |
| 3.5 | P2B | Pessoa para Empresa – Outros |
| 4.0 | P2G | |
| 4.1 | P2G | Pessoa para Governo |
| 4.1 | P2G | Compra por Número de Caixa |
| 4.2 | P2G | Compra por código QR |
| 4.3 | P2G | Compra Online |
| 4.4 | P2G | Pagamento de Faturas |

## 15. Anexo: Tabela de Comissões do Scheme

1. Comissões de Processamento

   - As comissões de processamento são calculadas por \[definir\]

   - As comissões de processamento aplicam-se às transferências cumpridas

   - As comissões de processamento são cobradas a \[que parte ou partes\]

   - As comissões de processamento para transferências «on-us» (em que o DFSP Pagador e o Beneficiário são o mesmo) \[são ou não são cobradas\]

   - As comissões de processamento serão calculadas e faturadas aos Participantes \[definir\]

   - Disposição sobre como os Participantes pagarão as faturas de processamento \[definir\]

2. Quotas de Adesão ou Comissões de Participação

   - As Quotas de Adesão ou Comissões de Participação são cobradas a \[definir\]

   - Especificar a base, a forma de cobrança, etc.

3. Comissões de Intercâmbio

   - As comissões de intercâmbio são fixadas pelo Scheme

   - O montante da comissão e o sentido (que Participante paga a qual) variam consoante o Caso de Utilização e o Caso de Utilização Secundário. Alguns Casos de Utilização e Casos de Utilização Secundários não terão intercâmbio.

   - \[Definir como a plataforma cobrará e desembolsará o intercâmbio: por transação ou numa base periódica.\]

## 16. Anexo: gestão do risco, segurança, privacidade e normas de serviço

<ul><i>Os Schemes podem ou não querer especificar normas ou exigir que os Participantes cumpram outras normas estabelecidas. Os Schemes podem, além disso, especificar normas diferentes para diferentes categorias de Participantes. A lista abaixo é dada a título meramente exemplificativo.</i></ul>

Os Participantes têm de cumprir as seguintes práticas de qualidade de serviço, segurança, privacidade de dados e apoio ao cliente, na medida em que se apliquem a um Participante no âmbito do Scheme.

- Os Participantes estabelecerão um quadro de gestão do risco para identificar, avaliar e controlar os riscos relativos à sua utilização do Scheme.

- Os Participantes assegurarão que os sistemas, as aplicações e a rede que suportam a utilização do Scheme são concebidos e desenvolvidos de forma segura.

- Os Participantes implementarão processos para gerir de forma segura todos os sistemas e operações que suportam a utilização do Scheme.

- Os Participantes implementarão processos para assegurar que os sistemas utilizados para o Scheme estão protegidos contra intrusão ou utilização indevida não autorizadas.

- Os Participantes implementarão processos para assegurar a autenticação
    dos seus clientes na criação e aprovação de transações que utilizem
    o Scheme.

-   Os Participantes desenvolverão planos eficazes de continuidade do
    negócio e de contingência.

-   Os Participantes gerirão as operações técnicas e de negócio de modo a permitir
    respostas atempadas às chamadas de API recebidas da Plataforma do Scheme ou
    de outros Participantes através da Plataforma do Scheme.

-   Os Participantes celebrarão acordos escritos que regulem a sua
    relação com agentes, processadores e outras entidades que prestem
    serviços externalizados relativos ao Scheme.

-   Os Participantes desenvolverão políticas e processos para a gestão
    e supervisão continuadas do pessoal, agentes, processadores e outras
    entidades que prestem serviços externalizados relativos ao Scheme.

-   Os Participantes assegurarão que é prestada aos clientes informação clara,
    destacada e atempada sobre as comissões e os termos e
    condições dos serviços que utilizam o Scheme.

-   Os Participantes desenvolverão e publicarão políticas e procedimentos de
    apoio ao cliente relativos aos serviços que utilizam o Scheme.

-   Os Participantes disponibilizarão um mecanismo adequado para os clientes
    colocarem questões e problemas. Os Participantes especificarão como
    os litígios podem ser resolvidos caso a resolução interna falhe.

-   Os Participantes cumprirão as boas práticas e as Leis Aplicáveis
    que regulam a privacidade dos dados dos clientes.

-   Os Participantes assegurarão que é prestada aos Clientes informação clara,
    destacada e atempada sobre as suas práticas de privacidade de dados.

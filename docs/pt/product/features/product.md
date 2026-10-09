# Portais e funcionalidades operacionais

Os aspetos dos portais e de outras funcionalidades operacionais abordados são:

-   Gestão de utilizadores

-   Gestão de participantes

-   Revisão de transações

-   Liquidação

-   Registo e auditoria

-   Gestão do hub

-   Gestão de oráculos

-   Portal do Participante

-   Relatórios

Estas funções são disponibilizadas através do Business Operations
Framework (BOF) do Mojaloop, que não só fornece as funções principais aqui
descritas, como também fornece um conjunto de APIs que permite a um operador
do hub alargar estes portais, e criar novos, para responder aos seus requisitos
específicos.

O BOF canaliza toda a atividade através de uma única framework de gestão de
identidades e acessos (Identity and Access Management, IAM), que incorpora
controlos de acesso baseados em funções (Role Based Access Controls, RBAC),
dando a um operador do hub um controlo granular do acesso de cada indivíduo
às capacidades de gestão do Hub Mojaloop.

O acesso a cada uma das funções acima é implementado através do BOF, e
é gerido através do IAM e do RBAC.

## Gestão de utilizadores 

Estas funcionalidades dizem respeito à gestão do pessoal do operador do hub
através do módulo IAM integrado, e não à gestão do próprio
serviço.

1.  Criar e gerir contas de utilizador para o pessoal do operador do hub e
    dos participantes através do portal IAM.
2.  Definir funções associadas ao acesso a vários subelementos dos
    portais.
3.  Atribuir funções a contas de utilizador, definindo que utilizadores têm acesso
    a que funcionalidades dos portais.
4.  Para funções sensíveis, definir um requisito de maker/checker (princípio dos
    quatro olhos), incluindo as funções que devem ser detidas pelo maker e pelo
    checker, e quaisquer restrições.
5.  Ativar/desativar contas de utilizador.
6.  Criar contas de utilizador para participantes, de modo a facilitar o
    autosserviço através do Portal do Participante (quando este for implementado).
7.  Permitir que um utilizador seja maker e checker (mas não do seu próprio
    trabalho).

Note-se que o Portal do Participante ainda não foi implementado por nenhum hub
Mojaloop, pelo que não constitui atualmente um requisito.

## Gestão de participantes

Funcionalidades que permitem a um operador do hub gerir um DFSP participante (note-se
que isto é distinto do Portal do Participante).

1.  Fazer o onboarding de um DFSP participante.
2.  Definir e gerir endpoints (incluindo a especificação de
    certificados e de IPs de origem)
3.  Gerir os contactos do participante (nome, e-mail, MSISDN, função, etc.).
4.  Definir limiares (para notificações).
5.  Definir e gerir contas do participante por tipo e moeda.
6.  Desativar um DFSP participante (embora não deva ser possível
    desativar um DFSP com transações pendentes/não liquidadas).
7.  Suspender/retomar a ligação de um participante.
8.  Atribuir/ajustar liquidez (para várias moedas), com controlo de
    maker/checker.
9.  Atribuir/ajustar um limite líquido de débito (Net Debit Cap, NDC) para cada participante, com controlo
    de maker/checker, incluindo duas opções para o NDC: valor fixo
    (ajuste manual após cada alteração de liquidez), ou variável (como uma
    percentagem fixa da liquidez disponível).
10. Restringir a ligação do participante apenas a envio ou apenas a receção.

## Revisão de transações

O pessoal do operador do hub precisa de conseguir encontrar os detalhes de uma
transação, qualquer que seja o seu estado. É possível pesquisar por:

-   Intervalo de data/hora

-   DFSP pagador ou beneficiário (participante)

-   Valor - ID de transação Mojaloop

-   Estado da transferência

-   ID do lote de liquidação

-   Tipo de transação

-   Código de erro

A pesquisa devolve uma lista de todas as transações que correspondem aos critérios
de pesquisa, cada uma clicável para uma vista detalhada, que dá acesso a:

-   Todos os detalhes detidos pelo Hub Mojaloop, agrupados num conjunto de
    subjanelas para melhorar a usabilidade

Isto incluirá o ID da janela/lote de liquidação, que é por sua vez
clicável, permitindo ao operador rever o estado de liquidação do
lote e, por conseguinte, da própria transação.

## Liquidação

A gestão da função de liquidação do Hub Mojaloop precisa de ser
robusta e fiável. As funcionalidades relacionadas são:

1.  Definir o modelo de liquidação a utilizar pelo serviço
2.  Fechar uma janela ou lote de liquidação, quer manualmente, quer
    automaticamente, de acordo com um calendário predefinido
3.  Criar automaticamente todos os ficheiros de liquidação necessários para
    a integração com o(s) parceiro(s) de liquidação quando uma janela de liquidação é
    fechada
4.  Rever as posições de todos os participantes na janela/lote de
    liquidação
5.  Uma vez concluída/finalizada a liquidação, atualizar automaticamente
    as posições e a liquidez atualmente disponível com base nos
    relatórios do(s) parceiro(s) de liquidação
6.  Disponibilizar ferramentas de apoio à integração entre o Hub Mojaloop
    e o(s) parceiro(s) de liquidação.

Note-se que pelo menos uma janela ou lote de liquidação estará sempre aberto,
e as transações serão adicionadas à janela/lote de liquidação aberto à medida
que forem processadas. Isto significa que a criação de uma nova janela de
liquidação é automática quando a janela de liquidação existente é fechada.

## Registo e auditoria 

O Hub Mojaloop disponibiliza um conjunto de ferramentas de apoio ao registo e à
auditoria da atividade do operador, para além de funções de auditoria de baixo nível para
a análise detalhada do processamento de transações (que são definidas
noutra parte deste documento). Estas ferramentas foram desenvolvidas tendo em
mente os requisitos tanto da gestão do operador do hub como dos auditores
externos.

1.  Todas as modificações decorrentes da atividade do operador do hub (incluindo a gestão
    de utilizadores) são registadas num repositório de dados não editável, com as
    credenciais do operador anexadas

2.  «Auditor» é uma função de utilizador do hub predefinida; os auditores têm acesso
    de leitura irrestrito aos registos.

3.  Está disponível um portal de auditoria, com funcionalidade de
    pesquisa/refinamento

4.  As entradas de registo/auditoria incluem as alterações à configuração do hub.

## Gestão do hub 

Existem alguns requisitos básicos para a configuração de um Hub
Mojaloop, que definem o serviço que este permite.

1.  Um Hub Mojaloop permite, por predefinição, todas as moedas definidas pela ISO. Cada
    uma é ativada para utilização por um determinado deployment através da criação de
    contas de liquidação e de posição para essa moeda. Em apoio a
    isto, existe o requisito de ser possível visualizar os saldos das contas
    operacionais do hub (liquidação e posição, replicadas por cada moeda
    permitida)

2.  Adicionar/visualizar/eliminar os certificados de CA necessários ao funcionamento normal.

## Gestão de oráculos

Gestão dos oráculos utilizados pelo Account Lookup Service (ALS) para
a resolução de aliases em DFSPs/participantes (e depois, em
colaboração com o DFSP identificado, numa conta específica).

1.  Visualizar os oráculos registados

2.  Registar um oráculo

3.  Definir um endpoint

4.  Testar o estado de saúde de um oráculo

## Portal do Participante

Atualmente, o Hub Mojaloop não oferece um Portal do Participante.
Em vez disso, esta funcionalidade é disponibilizada por outro projeto de código aberto,
o Payment Manager (<https://github.com/pm4ml>). Outras ferramentas, como o
Integration Toolkit do Mojaloop, fornecem uma API que permite aos DFSPs aceder
à mesma informação.

## Relatórios

O Mojaloop disponibiliza um motor de relatórios flexível como parte do Business
Operations Framework, que permite ao pessoal de um operador do hub conceber e
gerar uma vasta gama de relatórios com base nos dados detidos nas bases de dados
e razões gerais do Mojaloop. A Framework permite também a integração desses
relatórios em qualquer um dos portais do operador, permitindo que os relatórios
sejam gerados conforme necessário pelo pessoal de operações.

Isto inclui os relatórios relativos à liquidação.

## Aplicabilidade

Esta versão deste documento diz respeito à versão [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0) do Mojaloop

## Histórico do documento
  |Versão|Data|Autor|Detalhe|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|14 de abril de 2025| Paul Makin|Atualizações relacionadas com o lançamento da V17|
|1.0|5 de fevereiro de 2025| Paul Makin|Versão inicial|

# Princípios de engenharia

Esta secção detalha os princípios subjacentes aos aspetos de engenharia do
Hub Mojaloop.

## Registo 

Os mecanismos de registo padrão da indústria para contentores (stdout, stderr) são
a predefinição.

## Transferências

1.  Os identificadores de recursos são únicos dentro de um scheme (o conjunto de regras do sistema de pagamentos) e a sua unicidade é imposta pelo hub.

2.  Os métodos da API que podem potencialmente devolver conjuntos de resultados grandes são paginados
    por predefinição.

3.  As pesquisas do modelo de liquidação utilizam as moedas do DFSP pagador e do DFSP beneficiário.

4.  Os recursos/entidades são tipados para que possam ser diferenciados

5.  Os nomes (de objetos, métodos, tipos, funções, etc.) são claros e
    não dão lugar a interpretações erradas.

## Contas e saldos 

1.  A implementação da razão geral utiliza um repositório de dados subjacente
    fortemente consistente.

2.  Os dados financeiros críticos são replicados em vários nós geograficamente
    distribuídos, de uma forma fortemente consistente e de elevado
    desempenho, de tal modo que a falha de vários nós físicos
    resulta em perda de dados nula.

## Participantes 

1.  As questões de conectividade dos participantes são tratadas numa camada de gateway, para
    facilitar a utilização de ferramentas padrão da indústria.

## Escalabilidade e resiliência 

1.  O débito (throughput) global de transferências do sistema (as três fases da transferência) é
    escalável de forma tão próxima da linear quanto possível através da adição de nós de hardware
    de baixa especificação e de uso corrente.

2.  Os dados críticos para o negócio podem ser replicados em vários nós geograficamente
    distribuídos, de uma forma fortemente consistente e de elevado
    desempenho; a falha de vários nós físicos resulta em perda de dados
    nula.

## Especificação Mojaloop 

1.  O JWS é permitido

2.  O TLS v1.2 com autenticação mútua (x.509) deveria ser permitido entre os
    participantes e o hub

## Geral 

1.  O processamento específico de contexto é feito uma única vez e os resultados são colocados em cache em
    memória quando forem necessários mais tarde na mesma pilha de chamadas.

2.  Todas as mensagens de registo contêm informação contextual.

3.  As falhas são antecipadas e tratadas da forma mais graciosa possível.

4.  As consultas entre processos / através da rede pedem apenas os dados necessários.

5.  As camadas de abstração são mantidas no mínimo absoluto.

6.  A comunicação entre processos utiliza o mesmo mecanismo de transporte
    sempre que possível.

7.  Os agregados não têm estado (stateless).

## Aplicabilidade

Esta versão deste documento diz respeito à versão [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0) do Mojaloop

## Histórico do documento
|Versão|Data|Autor|Detalhe|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|14 de abril de 2025| Paul Makin|Removidas as secções de deployment|
|1.0|5 de fevereiro de 2025| James Bush|Versão inicial|

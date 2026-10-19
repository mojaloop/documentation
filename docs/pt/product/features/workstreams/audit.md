# Workstream de auditoria forense
Em primeiro lugar, desenvolver uma infraestrutura/um quadro de auditoria forense; em segundo lugar, atualizar a base de código do Mojaloop para utilizar essa infraestrutura e criar um registo de auditoria que evidencie qualquer adulteração; e, em terceiro lugar, criar ferramentas que permitam analisar esse registo de auditoria.

# Justificação de negócio
As capacidades de auditoria forense são vitais para um deployment em produção, a qualquer escala.

## Contribuidores
|Líder do workstream|Contribuidores|
|:--------------:|:--------------:|
| James Bush | Michael Richards <br>Paul Makin<br>Sam Kummary|

## Última atualização (resumo)
O workstream de auditoria forense passou à fase de implementação, estando já disponível uma base de código funcional e em curso os testes não funcionais. A fase seguinte integrará o cliente de auditoria nos serviços centrais do Mojaloop, enquanto testes de desempenho extensivos avaliam se a arquitetura consegue sustentar os volumes de transações pretendidos. Os resultados destes testes orientarão as decisões sobre a arquitetura final de auditoria, incluindo o equilíbrio entre processamento síncrono e assíncrono.

## Aplicabilidade

Esta versão deste documento refere-se ao Mojaloop [versão 17.2.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0)

## Histórico do documento
  |Versão|Data|Autor|Detalhe|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.0|28 de julho de 2026| Paul Makin|Versão inicial|

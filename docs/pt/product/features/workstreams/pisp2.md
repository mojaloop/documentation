# Workstream PISP 2.0
A implementação atual do PISP necessita de refatorização para responder às necessidades gerais dos adotantes e das fintechs, em vez de permitir apenas uma forma de trabalhar. Isto exigirá alterações complementares no Hub e no Mojaloop Connector, e espera-se que permita a autorização contínua no DFSP (Digital Financial Services Provider).

A interface PISP refatorizada permitirá também a iniciação de pagamentos em lote por uma fintech, oferecendo, por exemplo, um serviço externalizado de processamento de salários.

Este workstream tem de estar concluído antes de serem empreendidas as alterações propostas aos pagamentos em lote/PISP.

As melhorias para permitir o AISP seguir-se-ão num PI futuro.

# Justificação de negócio
Generalizar a implementação do PISP do Mojaloop para permitir modelos de negócio diferentes do da Google, patrocinadora da implementação original.

## Contribuidores
|Líder do workstream|Contribuidores|
|:--------------:|:--------------:|
| Olivier Manzi<br>Yui Kanchalai | Adetayo Teluwo <br>Paul Makin<br>Sam Kummary<br>Michael Richards<br>Péricles Correa
 |

## Última atualização (resumo)
O workstream PISP centrou-se no estabelecimento de processos de entrega, incluindo o acompanhamento de projetos no GitHub, a gestão de marcos (milestones) e o onboarding de contribuidores. A participação ativa em código aberto (open source) aumentou significativamente, ao mesmo tempo que teve início a migração da base de código para TypeScript. Olhando em frente, o workstream prepara-se para uma prova de conceito de ponta a ponta do PISP 2.0, com particular atenção às ferramentas de integração para fintechs e ao SDK de apoio necessário para complementar a funcionalidade existente do hub.

## Aplicabilidade

Esta versão deste documento refere-se ao Mojaloop [versão 17.2.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0)

## Histórico do documento
  |Versão|Data|Autor|Detalhe|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.0| 28 de julho de 2026 | Paul Makin|Versão inicial|

# Workstream de evolução do Mojaloop
Este workstream visa levar a cabo uma evolução significativa dos serviços centrais mais críticos do Mojaloop: 
- Substituir a funcionalidade de razão geral contabilística no coração do Mojaloop pelo TigerBeetle. 
- Substituir o coração do motor de liquidação pela funcionalidade do TigerBeetle, atualizando-o com as capacidades de liquidação v3 (Settlement V3).

# Justificação de negócio
Este workstream tem importância estratégica; o TigerBeetle é a tecnologia de razão geral da próxima geração, desenvolvida especificamente a pensar no Mojaloop, e oferece o potencial de uma melhoria do desempenho em débito (throughput) de transações de, pelo menos, uma ordem de grandeza.

## Contribuidores
|Líder do workstream|Contribuidores|
|:--------------:|:--------------:|
| Michael Richards | James Bush<br>Lewis Daley<br>Sam Kummary<br>Paul Makin |

## Última atualização (resumo)
### Auditoria forense
Esta vertente foi transferida para [um workstream próprio](./audit.html).
### Novo modelo contabilístico
O novo modelo contabilístico está em larga medida acordado e representa uma mudança significativa no sentido do alinhamento com as normas internacionais de contabilidade. Isto responde às preocupações levantadas por instituições globais e reforça a credibilidade do Mojaloop enquanto plataforma de infraestrutura financeira. O alvo inicial é o TigerBeetle, embora a equipa ainda não tenha decidido se será também produzida uma versão MySQL do novo modelo.
### Integração do TigerBeetle
O workstream de evolução do Mojaloop continua a fazer progredir a integração do TigerBeetle, com o desenvolvimento a aproximar-se da conclusão do código e o esforço atual centrado nos testes de integração. A implementação é compatível com a operação tanto sobre razões gerais MySQL como TigerBeetle, permitindo um caminho de migração gradual, ao mesmo tempo que mantém a compatibilidade com os deployments existentes. O principal trabalho remanescente é a validação do conjunto de testes de integração antes de ficar disponível um release experimental para a comunidade.
### Liquidação v3
A liquidação v3 (Settlement v3) introduz lotes de liquidação determinísticos, respondendo a desafios de reconciliação de longa data e permitindo a escalabilidade multi-scheme. O TigerBeetle armazenará as chaves dos lotes de liquidação, enquanto os componentes SQL e as APIs de administração exigirão melhorias substanciais para permitir a configuração do modelo, o acompanhamento dos lotes e as operações de liquidação.

## Aplicabilidade

Esta versão deste documento refere-se ao Mojaloop [versão 17.1.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0)

## Histórico do documento
  |Versão|Data|Autor|Detalhe|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.2|28 de julho de 2026| Paul Makin|Adicionada a última atualização|
|1.1|4 de dezembro de 2025| Paul Makin|Adicionada a última atualização|
|1.0|25 de novembro de 2025| Paul Makin|Versão inicial|

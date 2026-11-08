# Workstream de otimização do desempenho
Demonstrar o desempenho do Mojaloop numa variedade de configurações de deployment, e desenvolver e publicar um whitepaper. Utilizar uma configuração de referência em instalações locais (on-premises) para medir as variações de desempenho entre releases do Mojaloop.

# Justificação de negócio
Um whitepaper que demonstre como o Mojaloop excede os requisitos de desempenho dos adotantes seria uma ferramenta valiosa para a comunidade Mojaloop.

## Contribuidores
|Líder do workstream|Contribuidores|
|:--------------:|:--------------:|
| James Bush | Shashi Hirugade<br>Sam Kummary<br>Nathan Delma<br>Ablipay (Jerome, equipa)|

## Última atualização (resumo)
O workstream de desempenho concentrou-se em melhorar a reprodutibilidade dos resultados de benchmark publicados nos ambientes dos adotantes. A investigação identificou diferenças na configuração do deployment, sobretudo em torno da configuração do gateway do Kubernetes, como a principal causa das discrepâncias de desempenho comunicadas pelos integradores de sistemas. Os testes de desempenho foram temporariamente suspensos enquanto se concluía a remediação de segurança a nível de toda a plataforma, após o que os testes serão retomados com o objetivo de publicar um relatório de desempenho atualizado. Os resultados iniciais mantêm-se próximos do débito (throughput) anteriormente demonstrado, de aproximadamente 2 000 transações por segundo.

## Aplicabilidade

Esta versão deste documento refere-se ao Mojaloop [versão 17.2.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0)

## Histórico do documento
  |Versão|Data|Autor|Detalhe|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.2|28 de julho de 2026| Paul Makin|Adicionada a última atualização|
|1.1|4 de dezembro de 2025| Paul Makin|Adicionada a última atualização|
|1.0|25 de novembro de 2025| Paul Makin|Versão inicial|

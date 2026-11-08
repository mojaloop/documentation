# Workstream Core e releases
O workstream Core e releases do Mojaloop mantém o núcleo (core) do Mojaloop (itens de manutenção, como correções de erros críticos, melhorias de funcionalidades priorizadas e atualizações do Node) e conduz o processo de release dos serviços centrais e de alguns serviços ou produtos adjacentes que fazem parte da plataforma Mojaloop.

O workstream procura também apoiar outros workstreams que entregam funcionalidades ao core ou aos serviços de apoio, ajudando a empacotar serviços com qualidade de release (as novas funcionalidades têm de seguir as normas de qualidade e as boas práticas adotadas pelo Mojaloop, como testes automatizados, documentação, Helm charts e afins). Isto envolve igualmente a vertente de apoio à comunidade.

# Justificação de negócio
A gestão do core do Mojaloop e dos releases da plataforma de código aberto (open source) é fundamental para a oferta.

## Contribuidores
|Líder do workstream|Contribuidores|
|:--------------:|:--------------:|
| Sam Kummary | Shashi Hirugade<br>Juan Correa |

## Última atualização (resumo)
O workstream Core e releases preparou o release 17.3.0, incorporando um conjunto de melhorias de estabilidade e desempenho, incluindo correções de fugas de recursos de longa duração identificadas através de testes de desempenho prolongados. Os primeiros resultados indicam que o desempenho se mantém comparável, apesar da introdução de medidas de segurança adicionais, como o Istio e o TLS mútuo. O planeamento da versão 18 está também em curso, com ênfase numa validação extensiva, por parte dos adotantes, da arquitetura baseada em TigerBeetle antes do release em produção.

## Aplicabilidade

Esta versão deste documento refere-se ao Mojaloop [versão 17.1.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0)

## Histórico do documento
  |Versão|Data|Autor|Detalhe|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.2|28 de julho de 2026| Paul Makin|Adicionada a última atualização|
|1.1|4 de dezembro de 2025| Paul Makin|Adicionada a última atualização|
|1.0|25 de novembro de 2025| Paul Makin|Versão inicial|

---
i18n_source_sha: d4aa81c5d30e3863a304694786f1951c2ac5d986
---

# Mojaloop Sequência de atualização do repositório

Este documento fornece orientações sobre a ordem em que os repositórios NodeJS Mojaloop devem ser atualizados aquando do lançamento de novas funcionalidades e/ou da manutenção Mojaloop. Isto é importante para garantir que cada um dos serviços que fazem parte de uma release Mojaloop utilize a dependência correta do repositório Mojaloop. Esta é a atualização relativa à versão Mojaloop RC v17; à medida que a Mojaloop evolui, esta informação deverá ser atualizada com novos componentes (e eliminar os componentes que forem removidos).

## Índice

- [Sequência de atualização do repositório NodeJS](#nodejs-repository-update-sequence)]
  - [Índice](#table-of-contents)
  - [Categorias do repositório](#repository-categories)
  - [Processo de atualização](#update-process)
  - [Requisitos de teste](#testing-requirements)
  - [Mojaloop Sequência de Repo](#mojaloop-repo-sequence)

## Categorias do repositório

A seguir, apresentam-se as categorias dos Mojaloop repositórios NodeJS:

1. **Bibliotecas dos Serviços Centrais**
   - `central-services-shared`
   - `central-services-error-handling`
   - `central-services-database`
   - `central-services-stream`
   - `central-services-metrics`
   - `central-services-error`
   - `central-services-logger`
   - `sdk-standard-components`

2. **Serviços Principais**
   - `account-lookup-service`
   - `quoting-service`
   - `central-ledger`
   - `central-settlement`
   - `central-bulk-transfers`
   - `transaction-requests-service`
   - `ml-api-adapter`

3. **Componentes do evento**
   - `central-event-processor`
   - `event-framework`
   - `event-stream-processor`
   - `elastic-apm-node`
   - `elastic-apm-node-opentracing`
   - `email-notifier`
   - `event-sidecar`

4. **Adaptadores, SDK e API**
   - `sdk-scheme-adapter`
   - `event-sdk`
   - `thirdparty-sdk`
   - `bulk-api-adapter`
   - `thirdparty-api-svc`
   - `als-consent-oracle`
   - `als-oracle-pathfinder`

5. **Testes**
   - `ml-testing-toolkit`
   - `ml-testing-toolkit-client-lib`
   - `ml-testing-toolkit-ui`
   - `ml-testing-toolkit-shared-lib`
   - `mojaloop-simulator`
   - `simulator`

6. **Outras bibliotecas**
   - `api-snippets`
   - `auth-service`
   - `ml-number`
   - `object-store-lib`
   - `inter-scheme-proxy-cache-lib`
   - `database-lib`

## Processo de atualização

1. **Identificar dependências**
   - Utilize o valor `npm audit` para identificar vulnerabilidades
   - Analisar `package.json` ficheiros para detetar dependências desatualizadas
   - Verifique se existem alterações que causam incompatibilidades nas atualizações de versão principal

2. **Criar plano de atualização**
   - Registe todos os repositórios que necessitam de atualizações
   - Identificar potenciais alterações que possam causar incompatibilidades
   - Planear a estratégia de testes para cada componente

3. **Executar atualizações**
   - Comece pelas bibliotecas principais
   - Atualize um repositório de cada vez
   - Execute testes após cada atualização
   - Registe quaisquer problemas ou soluções alternativas

4. **Testes de integração**
   - Testar os componentes atualizados em conjunto
   - Verificar a funcionalidade de ponta a ponta
   - Verifique se há impactos no desempenho (roadmap, após a v17)

## Requisitos de ensaio

Para cada repositório, siga as instruções de teste indicadas no ficheiro README e execute:

1. **Testes unitários**
   - Executar o conjunto de testes existente
   - Adicionar novos testes para as funcionalidades atualizadas
   - Verificar a cobertura dos testes

2. **Testes de integração**
   - Teste com serviços dependentes
   - Verifique a compatibilidade com a versão API
   - Verifique o tratamento de eventos

3. **Testes de ponta a ponta**
   - Executar o conjunto de ferramentas de teste «Mojaloop»
   - Verificar os fluxos de transações
   - Testar cenários de erro


## Mojaloop. Sequência de Repo

A tabela seguinte apresenta uma visão detalhada de Mojaloop repositórios e das respetivas dependências. Esta informação é fundamental para compreender a ordem correta das atualizações ao lidar com alterações nas dependências ou vulnerabilidades.

| Sequência | Repo | Dependências |
|---|---|---|
| 1 | trechos de API |  |
| 2 | ml-número |  |
| 3 | biblioteca-de-bases-de-dados |  |
| 4 | registador-de-serviços-centrais |  |
| 5 | métricas-dos-serviços-centrais |  |
| 6 | gestão-de-erros-dos-serviços-centrais |  |
| 7 | ml-testing-toolkit-shared-lib |  |
| 8 | logging-bc-public-types-lib |  |
| 9 | plataforma-biblioteca-partilhada-tipos-de-mensagens-biblioteca |  |
| 10 | elastic-apm-node |  |
| 11 | elastic-apm-node-opentracing |  |
| 12 | object-store-libp | registador-de-serviços-centrais |
| 13 | área-de-serviços-centrais |  |
| 14 | serviços-centrais-de-saúde | gestão-de-erros-dos-serviços-centrais, registo-de-erros-dos-serviços-centrais |
| 15 | event-sdk | central-services-stream, central-services-logger, central-services-stream |
| 16 | inter-scheme-proxy-cache-lib | central-services-logger, central-services-shared, inter-scheme-proxy-cache-lib, central-services-error-handling, central-services-logger, central-services-metrics, event-sdk |
| 17 | ml-schema-transformer-lib | gestão-de-erros-dos-serviços-centrais, registo-dos-serviços-centrais, recursos-partilhados-dos-serviços-centrais, componentes-padrão-do-SDK, biblioteca-de-transformação-de-esquemas-de-ML |
| 18 | sdk-componentes-padrão |  |
| 19 | serviços-centrais-partilhados |  |
| 20 | plataforma-biblioteca-partilhada-nodejs-cliente-kafka-lib |  |
| 21 | logging-bc-client-lib |  |
| 22 | **account-lookup-service** | gestão-de-erros-dos-serviços-centrais, integridade-dos-serviços-centrais, registo-dos-serviços-centrais, métricas-dos-serviços-centrais, componentes-partilhados-dos-serviços-centrais, fluxo-dos-serviços-centrais, biblioteca-de-bases-de-dados, SDK-de-eventos, biblioteca-de-cache-de-proxy-entre-esquemas, componentes-padrão-do-SDK, componentes-padrão-do-SDK, registador-de-serviços-centrais, partilhado-de-serviços-centrais, fluxo-de-serviços-centrais |
| 23 | **als-consent-oracle** | api-snippets, central-services-health, central-services-shared, sdk-standard-components, central-services-error-handling, central-services-logger, central-services-metrics, event-sdk |
| 24 | **als-oracle-pathfinder** | central-services-logger, central-services-shared |
| 25 | **auth-service** | api-snippets, central-services-health, central-services-shared, event-sdk, sdk-standard-components, central-services-error-handling, central-services-logger, central-services-metrics, event-sdk |
| 26 | **bulk-api-adapter** | gestão-de-erros-dos-serviços-centrais, integridade-dos-serviços-centrais, registo-dos-serviços-centrais, métricas-dos-serviços-centrais, recursos-partilhados-dos-serviços-centrais, fluxo-dos-serviços-centrais, SDK-de-eventos, biblioteca-de-armazenamento-de-objetos |
| 27 | **central-event-processor** | gestão-de-erros-dos-serviços-centrais, estado-dos-serviços-centrais, registo-dos-serviços-centrais, métricas-dos-serviços-centrais, recursos-partilhados-dos-serviços-centrais, fluxo-dos-serviços-centrais, SDK-de-eventos |
| 28 | **central-ledger** | gestão-de-erros-dos-serviços-centrais, integridade-dos-serviços-centrais, registo-dos-serviços-centrais, métricas-dos-serviços-centrais, recursos-partilhados-dos-serviços-centrais, fluxo-dos-serviços-centrais, biblioteca-de-bases-de-dados, SDK-de-eventos, biblioteca-de-cache-do-proxy-entre-schemes, número-ml, biblioteca-de-armazenamento-de-objetos |
| 29 | **central-settlement** | central-ledger, base-de-dados-dos-serviços-centrais, gestão-de-erros-dos-serviços-centrais, integridade-dos-serviços-centrais, registo-dos-serviços-centrais, recursos-partilhados-dos-serviços-centrais, fluxo-dos-serviços-centrais, SDK-de-eventos, número-ml |
| 30 | **notificador por e-mail** | gestão-de-erros-dos-serviços-centrais, integridade-dos-serviços-centrais, registo-dos-serviços-centrais, métricas-dos-serviços-centrais, recursos-partilhados-dos-serviços-centrais, fluxo-dos-serviços-centrais, SDK-de-eventos |
| 31 | **event-sidecar** | central-services-logger, central-services-metrics, central-services-stream, event-sdk |
| 32 | **processador de fluxo de eventos** | serviços-centrais-saúde, serviços-centrais-registo, serviços-centrais-métricas, serviços-centrais-partilhados, serviços-centrais-fluxo, nó-elastic-apm, nó-elastic-apm-opentracing, SDK-de-eventos |
| 33 | **mojaloop-simulator** | registador-de-serviços-centrais |
| 34 | **ml-api-adapter** | gestão-de-erros-dos-serviços-centrais, integridade-dos-serviços-centrais, registo-dos-serviços-centrais, métricas-dos-serviços-centrais, recursos-partilhados-dos-serviços-centrais, fluxo-dos-serviços-centrais, SDK-de-eventos, componentes-padrão-do-SDK, biblioteca-de-bases-de-dados, biblioteca-de-cache-do-proxy-entre-esquemas |
| 35 | **ml-testing-toolkit** | central-services-logger, central-services-metrics, ml-schema-transformer-lib, ml-testing-toolkit-shared-lib, sdk-standard-components |
| 36 | **ml-testing-toolkit-client-lib** | central-services-logger, ml-testing-toolkit-shared-lib, sdk-standard-components |
| 37 | **ml-testing-toolkit-ui** | ml-testing-toolkit-shared-lib |
| 38 | **quoting-service** | gestão-de-erros-dos-serviços-centrais, integridade-dos-serviços-centrais, registo-dos-serviços-centrais, métricas-dos-serviços-centrais, recursos-partilhados-dos-serviços-centrais, fluxo-dos-serviços-centrais, SDK-de-eventos, biblioteca-de-cache-do-proxy-entre-schemes, número-de-ML, componentes-padrão-do-SDK |
| 39 | **simulador** (versão antiga, oráculo ALS) | gestão-de-erros-dos-serviços-centrais, registo-dos-serviços-centrais, métricas-dos-serviços-centrais, recursos-partilhados-dos-serviços-centrais, SDK-de-eventos, componentes-padrão-do-SDK |
| 40 | **sdk-scheme-adapter** | api-snippets, tratamento-de-erros-dos-serviços-centrais, registador-dos-serviços-centrais, métricas-dos-serviços-centrais, recursos-partilhados-dos-serviços-centrais, SDK-de-eventos, componentes-padrão-do-SDK |
| 41 | **thirdparty-api-svc** | api-snippets, serviços-centrais-partilhados, serviços-centrais-stream, serviços-centrais-gestão-de-erros, serviços-centrais-registo, serviços-centrais-métricas, event-sdk |
| 42 | **thirdparty-sdk** | api-snippets, tratamento-de-erros-dos-serviços-centrais, métricas-dos-serviços-centrais, recursos-partilhados-dos-serviços-centrais, sdk-scheme-adapter, componentes-padrão-do-SDK |
| 43 | **transaction-requests-service** | gestão-de-erros-dos-serviços-centrais, integridade-dos-serviços-centrais, registo-dos-serviços-centrais, métricas-dos-serviços-centrais, recursos-partilhados-dos-serviços-centrais, SDK-de-eventos, biblioteca-partilhada-do-kit-de-ferramentas-de-teste-de-ML |

### Visualização da sequência de atualizações

O diagrama seguinte ilustra a sequência de atualização recomendada para Mojaloop repositórios, tendo em conta as suas dependências e relações:

![Repository Update Sequence](./assets/diagrams/repositoryUpdate/repository-update-sequence.svg)

Este diagrama apresenta uma representação visual da sequência de atualização, mostrando:
1. O agrupamento lógico dos repositórios
2. As dependências entre os diferentes grupos
3. Casos especiais, como as dependências circulares
4. As possibilidades de atualização em paralelo
5. Os diferentes tipos de dependências a ter em conta 
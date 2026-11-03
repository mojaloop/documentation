---
i18n_source_sha: 1b529688ce8e8fa5579b9c407a0c68f9c133d580
---

# Exploração florestal na Colúmbia Britânica

O Contexto Delimitado de Registo é utilizado para armazenar informações técnicas que auxiliem na depuração, na deteção de avarias e na resolução de problemas. Os registos são obtidos a partir de qualquer outro Contexto Delimitado [^1] e armazenados para fins de consulta e elaboração de relatórios. A informação de registo é armazenada como «aspetos técnicos» e, caso ocorra qualquer perda de dados, não deverá haver outra consequência além da perda da capacidade técnica de compreender o comportamento do sistema. Todas as atividades do sistema são registadas e armazenadas de forma persistente, a fim de permitir que o Contexto Delimitado de Auditoria [^2] efetue consultas aos dados de registo.

Os Contextos Delimitados devem publicar os eventos num formato definido e utilizando qualquer mecanismo disponível no Contexto Delimitado de Registo. A estrutura possui, implicitamente, uma camada de abstração integrada no evento destinado ao Contexto Delimitado de Registo, que, por sua vez, é então utilizada para persistir os dados de registo.

## Casos de uso

### Registo baseado em eventos

#### Diagrama de fluxo

![Use Case - Event Based Logging](./assets/ML2RA_Logging_ucEventBasedLogging_Apr22-b-1450.png)
>Diagrama de fluxo de trabalho da UC: Registo baseado em eventos

<!-- Footnotes themselves at the bottom. -->
## Notes

[^1]: [Mojaloop
Lista de Interfaces Comuns](../../refarch/commonInterfaces.md)
[^2]: [Auditoria do Contexto Delimitado](../auditing/index.md)

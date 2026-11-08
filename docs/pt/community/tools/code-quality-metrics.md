---
i18n_source_sha: f155be68fd20e2fa92f620355a58ce20c92aefbf
---

# Métricas de qualidade do código

## Métricas de qualidade funcional

### Métricas dos testes unitários

Uma cobertura elevada e poucas dependências mostram que o código é testável e, portanto, bem isolado e fácil de manter. Uma complexidade reduzida torna também o código legível e fácil de manter, e ajuda a impor a responsabilidade única. Os verdadeiros testes unitários correm muito rapidamente, pois não invocam componentes externos.

| Métricas de qualidade do código | Código novo e do projeto |
| :--- | :--- |
| Cobertura dos testes unitários | &gt;= 80% de cobertura de blocos |
| Velocidade dos testes unitários | &lt;= 10 segundos |
| Dependências/método | &lt;= 10 |
| Complexidade/método | &lt;= 7 |

### Componente

O teste funcional cobre normalmente combinações de pares dos estados do sistema.

### Integração

Os testes funcionais têm um teste por mensagem e por erro. As mensagens e os erros tratados da mesma forma utilizam o mesmo teste.

### Contrato

Limitado ao que as equipas consumidoras necessitam e que não esteja coberto pelos testes unitários, de componente e de integração existentes. Frequentemente é acrescentado ao longo do tempo.

### Ponta a ponta

Os testes ponta a ponta cobrem os testes de aceitação provenientes de cenários.

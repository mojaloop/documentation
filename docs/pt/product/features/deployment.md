# Deployment do Mojaloop
Existe um leque de razões diferentes para fazer o deploy do Mojaloop, que vai desde o desejo de aprender mais sobre o Mojaloop ou a vontade de avaliar a sua adequação a um determinado fim, passando por programadores que pretendem desenvolver ou testar novas funcionalidades, ou talvez um adotante que pretenda avaliar a sua funcionalidade e conectividade, até um deployment de nível de produção de um sistema de pagamentos nacional.

## Guia de deployment

Para cada cenário, a Comunidade Mojaloop desenvolveu ferramentas de deployment adequadas. O [guia de deployment](./deployment/deploying.md) seguinte inclui uma matriz que cruza os tipos de utilizador com a finalidade do deployment, incluindo notas sobre a pegada/expectativa de hardware e os SLAs associados. Para cada um, é recomendada uma ferramenta de deployment, e uma tabela separada fornece uma breve introdução a cada ferramenta.

## Ferramentas de deployment

Uma vez estabelecida qual a ferramenta de deployment adequada aos requisitos do leitor, o [guia das ferramentas de deployment](./deployment/tools.md) fornece mais detalhes sobre cada uma das ferramentas, incluindo as funcionalidades de desempenho e de segurança com que cada uma é compatível.

## Preparação para produção

A Comunidade desenvolveu uma matriz de autoavaliação que pode ser utilizada pelos adotantes para avaliar a preparação do seu deployment do Mojaloop e da sua organização para a passagem a produção. Note-se que este documento não se destina a servir de base a qualquer avaliação formal da preparação para produção de qualquer deployment ou scheme (o conjunto de regras do sistema de pagamentos) do Mojaloop. Destina-se apenas a ser um conjunto de verificações básicas para garantir que alguns aspetos importantes de um sistema de produção foram considerados. Uma avaliação completa da adequação ao fim de um deployment do Mojaloop continua a ser da exclusiva responsabilidade do operador do scheme.

A matriz pode ser [consultada aqui](./Production_Readiness_Technical_Assessment.md), e o formulário pode ser [descarregado aqui](https://github.com/mojaloop/product-council/tree/main/Documentation/Deployment%20Readiness) quando estiver pronto para iniciar uma avaliação.

## Histórico do documento
  |Versão|Data|Autor|Detalhe|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|18 de dezembro de 2025| Paul Makin, Julie Guetta|Adicionada uma ligação ao documento de preparação para produção|
|1.0|3 de junho de 2025| Paul Makin|Versão inicial|

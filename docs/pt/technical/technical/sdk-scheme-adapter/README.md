---
i18n_source_sha: eff17e54b551fdd1e52d962d4be0d6d891d50a17
---

# SDK Adaptador de esquema
Um scheme adapter é um serviço que faz a ligação entre um switch compatível com Mojaloop API e uma plataforma de backend DFSP que não implementa nativamente o Mojaloop API.

O API entre o adaptador de esquema e o backend DFSP é síncrono HTTP, enquanto a interface entre o adaptador de esquema e o switch é nativa Mojaloop API. Existe uma exceção a esta regra: as integrações em massa, que podem ser configuradas para serem síncronas ou assíncronas.

O SDK-Scheme-Adapter é permitido pela Comunidade «Mojaloop» e é considerado uma referência quanto às melhores práticas para que um «DFSP» se ligue a um «Mojaloop» e a um «API». Normalmente, o SDK-Scheme-Adapter é utilizado e deployado diretamente na solução. A seguir, apresenta-se um resumo das diferentes formas como tal pode ser feito.

## SDK Modelos de adoção
Dependendo das Regras do Scheme, existem quatro modos comuns através dos quais os DFSP interagem com o hub central Mojaloop. Este resumo destaca o papel que o SDK-Scheme-Adapter desempenha em cada um desses modos, apresenta uma breve visão geral de cada um deles e destaca os benefícios para os DFSP.

### 1. DFSP, utilizando uma solução de terceiros, por exemplo, o Payment Manager, que recorre ao Adaptador do Scheme SDK 

Existem várias soluções de terceiros que oferecem suporte, ferramentas e integrações com sistemas de back-end que utilizam o SDK-Scheme-Adapter, com o objetivo de proporcionar suporte à integração síncrona (de acordo com a prática recomendada n.º Mojaloop) para estabelecer ligação ao Mojaloop API.

O Payment Manager, uma ferramenta de código aberto*, é um exemplo disso. O Payment Manager oferece vantagens adicionais; pode encontrar mais informações [here](https://rtplex.io/). Os deployments do Payment Manager podem ser do tipo SaaS ou auto-hospedados.

![SDK-Scheme-Adapter Mode 1](./assets/SDKSchemeAdapterMode1.svg)

- SDK O Scheme Adapter é utilizado diretamente na implementação da integração personalizada.
- Uma vez que o SDK-Scheme-Adapter é mantido pela comunidade, esta ferramenta proporciona um percurso de atualização para a utilização das novas versões Mojaloop API.
- Solução padronizada para um processo de onboarding rápido
- Conector central desenvolvido em colaboração com integradores de sistemas ou fornecedores de software bancário
- A experiência do utilizador (UX) do Gestor de Pagamentos inclui funcionalidades de apoio às operações comerciais e ao onboarding e à automatização da integração e manutenção das medidas de segurança

:::tip Componentes de código aberto
Todos estes estão abrangidos pela Licença Apache v2.0. Esta foi especificamente escolhida, uma vez que não violaria as políticas de muitas organizações. A Licença Apache v2.0 não impõe restrições de «copy-left», pelo que os adotantes podem personalizar elementos, tais como conectores principais, sem terem de partilhar esses detalhes privados com a comunidade.  
:::


### 2. DFSP utilizando o seu próprio Core Connector com SDK Scheme Adapter

Neste caso, a empresa DFSP opta por desenvolver um «Core Connector» personalizado entre o seu back-end e o Adaptador de Esquema MojaloopSDK. Podem utilizar as diretrizes de código aberto para desenvolver o «Core Connector».

![SDK-Scheme-Adapter Mode 2](./assets/SDKSchemeAdapterMode2.svg)

- SDK O Scheme Adapter é utilizado diretamente na implementação da integração personalizada.
- Uma vez que o SDK-Scheme-Adapter é mantido pela comunidade, esta ferramenta proporciona um percurso de atualização para a utilização das novas versões Mojaloop API.
- Desenvolvido de acordo com as diretrizes do Core Connector de código aberto
- Mojaloop Apoio à comunidade
- Gerido pelo Departamento de Operações Técnicas da DFSP

### 3. DFSP Solução de ligação desenvolvida internamente Mojaloop

Não é utilizada nenhuma ligação padrão e o DFSP opta por estabelecer a sua própria ligação ao hub Mojaloop.

![SDK-Scheme-Adapter Mode 3](./assets/SDKSchemeAdapterMode3.svg)

- Desenvolvido com base em documentação de projeto de código aberto
- Mojaloop Apoio à comunidade
- Gerido por DFSP Tech Ops
- SDK O adaptador de scheme é possivelmente utilizado como referência
- Esta implementação interage diretamente com as APIs assíncronas dMojaloop





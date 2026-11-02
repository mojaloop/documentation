---
i18n_source_sha: 004ac437cd409d43f929159447e5c04fb7f1a859
---

# Introdução

## O que é uma arquitetura de referência?

Num sistema de software, a Arquitetura de Referência é um conjunto de documentos de conceção de software que captam a essência do produto e fornecem orientações para a sua evolução técnica.

Este conceito pode ser ainda mais simplificado:

_**A Arquitetura de Referência é a visão arquitetónica do projeto perfeito.**_

Em condições normais, esse projeto perfeito nunca é alcançado, em parte porque não há tempo nem recursos suficientes para o implementar na íntegra, e em parte porque esse projeto pode evoluir e melhorar mais rapidamente do que consegue ser implementado.
É da natureza de uma Arquitetura de Referência ser um documento dinâmico, que é continuamente atualizado e aperfeiçoado.

## Quais são os objetivos da Arquitetura de Referência?

Os principais objetivos da Arquitetura de Referência são os seguintes:

* Identificar abstrações, interfaces e oportunidades de normalização
* Propor soluções e modelos para problemas comuns
* Ajudar a garantir o cumprimento dos princípios de conceção técnica
* Fornecer orientações sobre as arquiteturas de implementação
* Promover a inovação e a contribuição, definindo o que pode ser feito e de que forma

## Quais são as vantagens de dispor de uma arquitetura de referência?

A primeira vantagem é que constitui a base perfeita para uma roadmap técnica. Ao ter em conta a visão de futuro, é possível criar facilmente a partir daí uma roadmap técnica por fases, garantindo que os recursos e a atenção se concentram no valor a longo prazo.

Outra vantagem importante é a orientação que proporciona na tomada de decisões relativas às escolhas tecnológicas e às estratégias de implementação.
Tendo em conta a Arquitetura de Referência, podemos enquadrar qualquer decisão de desenvolvimento como tática ou estratégica:

* Tático — algo que é necessário neste momento e que pode apresentar exceções à Arquitetura de Referência, a fim de dar resposta a uma necessidade urgente e de elevado valor. Estas exceções devem ser documentadas como dívida técnica, a ser resolvida no futuro.
* O aspeto estratégico — algo que é duradouro e que deve ser implementado de acordo com a Arquitetura de Referência — deve aproximar a implementação dessa arquitetura.

Por último, mas não menos importante, garante o alinhamento entre a visão técnica e a visão do produto, que é mais importante (ver abaixo no que diz respeito ao processo e às formas de trabalho).

## Processo de criação e manutenção da Arquitetura de Referência

Ao criar a versão inicial da Arquitetura de Referência, a equipa seguiu os seguintes passos:

1. Mapeamento do espaço de problemas — Documentar os diferentes domínios e subdomínios de problemas, bem como a forma como são classificados de acordo com a sua importância
2. Mapeamento do contexto do espaço de soluções — Agrupar problemas semelhantes com base no seu objetivo e contexto
3. Mapeamento de casos de uso individuais — Debater e documentar os casos de uso em pormenor, tendo em conta a solução na sua totalidade

## Como manter uma arquitetura de referência atualizada

O diagrama abaixo ilustra a posição que uma arquitetura de referência ocupa em relação a outros processos da Plataforma Mojaloop; o que esta deve integrar e ter em conta, não só a visão e os princípios, mas também os requisitos, a experiência anterior e até mesmo a inovação técnica da Forster.

![Perform Transfer (Universal Mode)](./assets/process.png)
> Introdução (Arquitetura de Referência Mojaloop 2.0): Como manter a Arquitetura de Referência atualizada


## Princípios que orientam esta arquitetura

A conceção da Arquitetura de Referência do Mojaloop 2.0 foi orientada pelos princípios do Domain-Driven Design[^1] e inspirada nos princípios de programação orientada para objetos SOLID[^2] para o desenvolvimento de aplicações de software, em especial no princípio da responsabilidade única (SRP).

Para facilitar a compreensão da interpretação da arquitetura pelo Mojaloop, incluímos uma breve visão geral da arquitetura Domain-Driven Design.

### Visão geral da arquitetura inspirada no DDD

A implementação da arquitetura inspirada no DDD para a versão Mojaloop inclui os seguintes conceitos:

* **Espaço do Problema** — Normalmente, a arquitetura DDD reconhece os requisitos de negócio como pertencentes a domínios distintos. Por exemplo, um sistema de comércio eletrónico é considerado um **_Domínio_**.  No entanto, um sistema de comércio eletrónico possui vários componentes para funcionar, tais como o inventário, o carrinho de compras, o processo de finalização da compra, etc. Cada componente é classificado como um **_Subdomínio_** que contribui com valor para o domínio, que é o sistema de comércio eletrónico. O Mojaloop utiliza um único domínio — trata-se de um switch.

  O Espaço de Problemas é um dos dois contentores onde se encontram todos os problemas empresariais identificados (melhorias/serviços) que necessitam de ser resolvidos. Dependendo da complexidade do Problema Empresarial (melhoria) ou, na verdade, da dimensão dos problemas a resolver, é possível subdividir a estrutura inicial de subdomínios em subdomínios adicionais.  Cada problema é atribuído ao seu próprio subdomínio. No entanto, deve ter-se o cuidado de garantir que cada subdomínio seja absolutamente necessário e que se concentre em proporcionar valor ao domínio, a fim de evitar uma profusão desnecessária e confusa de subdomínios que preencham o Espaço de Problemas.

  Cada melhoria/serviço assim incluído num subdomínio separado permite que diferentes equipas desenvolvam partes do sistema mais fáceis de gerir, o que é mais eficiente e menos propenso a riscos do que construir um sistema inteiro numa única estrutura. Uma vantagem considerável desta abordagem é que todo o processo de desenvolvimento pode centrar-se na melhoria e na valorização da plataforma, e não apenas na adição de funcionalidades.

  Normalmente, o Espaço do Problema inclui três categorias que indicam, em termos gerais, como — ou o que — será utilizado para resolver um problema específico, às quais foi adicionada uma quarta categoria para os Requisitos Não Funcionais (NFRs) —

  * Núcleo — soluções cuja conclusão depende de compilações internas.
  * Soluções permitidas — que podem ser implementadas utilizando produtos já disponíveis no mercado —, por exemplo, o início de sessão seguro.
  * Genérico — soluções que podem utilizar produtos já disponíveis no mercado, mas que requerem programação adicional para a sua implementação, e não apenas integração — por exemplo, geração de relatórios e autenticação
  * Requisitos não funcionais (NFRs) — soluções necessárias para dar resposta a necessidades comuns, mas que não contribuem diretamente para o valor do produto

* **Espaço de Soluções** — Um segundo componente importante da Arquitetura DDD é o Espaço de Soluções. Este difere do Espaço do Problema na medida em que o seu foco não reside no que se deve resolver, mas sim na forma como um problema (melhoria/serviço) vai ser resolvido e na forma como as múltiplas soluções se relacionam entre si. O Espaço de Soluções inclui, portanto, necessariamente mais informações técnicas e pormenores sobre a forma como os problemas devem ser resolvidos.

  * O Espaço de Soluções apresenta uma série de elementos destinados a apoiar e a orientar os esforços de desenvolvimento na resolução de problemas

  * Os «contextos delimitados» foram introduzidos para agrupar conjuntos coesos de soluções com a sua linguagem específica.

  Muitas vezes, a correspondência entre Contextos Delimitados e Subdomínios não será de um para um.  Uma vez que os subdomínios pertencem ao Espaço do Problema e os Contextos Delimitados ao Espaço da Solução, é perfeitamente possível que surjam situações em que um subdomínio seja resolvido por mais do que um Contexto Delimitado, ou em que um Contexto Delimitado possa resolver vários subdomínios.

  Normalmente, e certamente no ambiente «Mojaloop», as soluções são concebidas e implementadas sem conhecimento das dependências específicas da infraestrutura ou de outros mecanismos internos de outros Contextos Delimitados. Esta abordagem contribui para a segurança, nomeadamente ao garantir que cada Contexto Delimitado tenha conhecimento apenas do seu próprio ambiente e das suas interfaces.  As comunicações entre Contextos Delimitados são todas realizadas através de APIs e de mensagens seguras.  Exemplos de Contextos Delimitados (BCs) do ambiente «Mojaloop» incluem Contas e Saldos, Transferências e Transações, etc.

* **_Linguagem Ubíqua_** é uma abordagem destinada a promover uma linguagem explícita e de compreensão comum, utilizada por todos — desde os utilizadores finais até aos programadores — na descrição de problemas e soluções. Existem dois objetivos principais para uma Linguagem Ubíqua:

  1. Assegura que os termos únicos sejam identificados e entendidos como tendo um único significado por todas as partes no âmbito do seu Contexto Delimitado. Um exemplo pode ser a palavra «Conta», que pode ser entendida como um Perfil de Conta por uma parte e como uma referência a uma Conta do Sistema de Contabilidade por outra. Isto não constitui uma recomendação para se procurar um conjunto universal de termos inequívocos — impossível de alcançar, quer a nível do projeto, quer a nível da empresa —; em vez disso, garante que cada Contexto Delimitado possua o seu próprio conjunto de termos.
  2. Assegura que os termos da Linguagem Ubíqua estejam presentes desde a interface do utilizador, passando pela documentação, até outros materiais relacionados com o projeto e, inclusive, no código. A utilização ubíqua dos mesmos termos em todos os contextos, incluindo no código, garante que todos tenham a mesma compreensão dos problemas e das soluções que estão a ser descritos e resolvidos.

* **_Questões Transversais_**[^3] são aspetos de uma solução de software que têm de ser resolvidos por vários Contextos Delimitados (ou funções/módulos) e incluem elementos como a auditoria, a segurança, a autenticação e a gestão da configuração da plataforma (empresarial e técnica). A nossa abordagem a estas Questões Transversais consistiu em separá-las dos Contextos Delimitados. A maioria das Questões Transversais tem uma natureza distribuída neste projeto, com componentes centrais e bibliotecas de cliente. Estas são representadas nesta documentação como equivalentes a Contextos Delimitados.

### Princípios SOLID

Para além da arquitetura DDD, a abordagem arquitetónica do «Mojaloop» também se inspirou nos princípios SOLID:

* A responsabilidade única e as interfaces internas permitem implementar domínios adicionais, tais como o ISO, sem necessidade de alterar a arquitetura central
* As entidades de software devem ser ampliadas, mas nunca modificadas. A regra é: nunca alterar o código principal; amplie sempre através de módulos ou nós adicionais
* As funções que utilizam referências a classes base devem poder utilizar objetos de classes derivadas sem terem conhecimento disso
* É preferível dispor de várias interfaces específicas para cada cliente do que de uma única interface multifuncional
* Crie dependências com base em abstrações, e não em concretizações

<!-- Footnotes themselves at the bottom. -->
### Notes

[^1]: Leitura complementar: [Domain-driven design. Da Wikipédia, a enciclopédia livre](https://en.wikipedia.org/wiki/Domain-driven_design)

[^2]: Leitura complementar: [SOLID da Wikipédia, a enciclopédia livre](https://en.wikipedia.org/wiki/SOLID)

[^3]: Leitura complementar: [Questão transversal](https://en.wikipedia.org/wiki/Cross-cutting_concern#:~:text=Cross%2Dcutting%20concerns%20are%20parts,oriented%20programming%20or%20procedural%20programming.) - Editor: Wikipédia, a enciclopédia livre

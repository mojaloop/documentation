---
i18n_source_sha: 1e447aa02780818cd02decf1a0079084554ee033
---

# Orientações para pull requests

> **Aplica-se a:** Todos os contribuidores que submetem pull requests a repositórios da [organização Mojaloop no GitHub](https://github.com/mojaloop).
> Estas orientações complementam o [Guia de contribuidores](contributors-guide.md), a [Política de IA](../standards/ai_policy.md) e o [Processo de engenharia de produto](product-engineering-process.md).

**Divulgação de IA** Este documento inclui conteúdo gerado com a assistência do Claude Sonnet 4.6. Todo o conteúdo foi revisto e validado pelo autor.


---

## 1. Antes de abrir um PR

### 1.1 Começar com uma issue do GitHub

Todos os PR devem estar ligados a uma issue do GitHub. Não abra um PR sem uma issue.

- Se não existir uma issue relevante, **crie-a primeiro** e dê tempo para a triagem ou a discussão antes de começar a implementação — especialmente no caso de alterações não triviais.
- As issues são o espaço principal para a discussão do design, as decisões de âmbito e o alinhamento com os responsáveis pela manutenção. Utilize-as.


### 1.2 Discutir primeiro as alterações consequenciais ou críticas

Se a alteração incidir sobre interfaces partilhadas, lógica de liquidação ou de compensação, APIs nucleares ou código sensível do ponto de vista da segurança, consulte o [Processo de alteração consequencial](consequential-change-process.md) e o [Processo de alteração crítica](critical-change-process.md) **antes de escrever qualquer código**. Uma grande alteração de arquitetura apresentada de surpresa num PR será devolvida para discussão prévia.

---

## 2 Títulos dos pull requests

O Mojaloop utiliza [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) para ajudar as nossas ferramentas automatizadas a gerir as versões e os deployments. O título do pull request **tem de** estar em conformidade com a especificação Conventional Commits para passar as verificações de CI/CD no CircleCI.

Ao adotar Conventional Commits + Semantic Versioning, podemos disponibilizar automaticamente uma nova versão de um dado componente e incrementar as versões `MAJOR`, `MINOR` e `BUGFIX` com base unicamente nos títulos dos PR, e gerar automaticamente changelogs detalhados. (Consulte [este exemplo](https://github.com/mojaloop/thirdparty-scheme-adapter/releases/tag/v11.20.0) de um changelog gerado automaticamente)

> **Nota**:
> Ao fazer o merge (e o squash) de um PR, o GitHub utiliza o *título* do PR para a mensagem do commit git. Isto significa que, para indicar uma alteração incompatível, tem de ser utilizado o formato `!`:
> «Se incluídas no prefixo type/scope, as alterações incompatíveis DEVEM ser indicadas por um ! imediatamente antes dos :. Se for utilizado !, BREAKING CHANGE: PODE ser omitido da secção de rodapé, e a descrição do commit DEVE ser utilizada para descrever a alteração incompatível.»

#### Exemplos de bons títulos de PR

- feat(api): add ability to handle `PUT /thirdpartyRequests/trasactions/{ID}` endpoint
- fix: update outdated node modules
- feat(models)!: change database schema
- chore: tidy up readme

---

## 3. Manter os PR pequenos e focados

Esta é a coisa mais importante que é possível fazer para ajudar os revisores e os responsáveis pela manutenção.

### 3.1 Um PR, um propósito

Um pull request deveria fazer exatamente uma coisa: corrigir um erro, implementar uma funcionalidade ou tratar uma questão. Os PR com vários propósitos são difíceis de rever, difíceis de reverter se algo correr mal e criam um histórico de commits ambíguo.

**Não combine:**
- Uma correção de erro e uma refatorização
- Uma funcionalidade e uma limpeza de testes não relacionada
- Atualizações de dependências e alterações funcionais
- Alterações de espaços em branco com alterações funcionais

Se der por si a escrever «e também...» na descrição do PR, isso é um sinal para dividir o PR.

Note-se que alterações a muitos espaços em branco, por exemplo, uma nova indentação, podem ocultar o propósito de uma alteração subjacente. Separe as grandes alterações de espaços em branco em PR próprios para facilitar o processo de revisão.

### 3.2 Visar uma dimensão de diff adequada

Não existe um limite rígido de número de linhas, mas, como orientação prática:

| Dimensão do diff | Expectativa |
|---|---|
| < 200 linhas | Ideal. Pode ser revisto de forma rápida e minuciosa. |
| 200 – 500 linhas | Aceitável para alterações bem delimitadas e com bom contexto. |
| 500 – 1000 linhas | Exige uma justificação sólida. Pondere dividir. |
| > 1000 linhas | Será provavelmente devolvido com um pedido de divisão, a menos que a alteração seja inerentemente atómica (por exemplo, um ficheiro gerado, uma grande mudança de nomes). |

Quando uma grande alteração é genuinamente atómica — como uma migração de esquema, o resultado de uma geração de código ou uma mudança de nomes em massa —, adicione uma nota a explicar por que razão não pode ser dividida.

### 3.3 Separar a refatorização das alterações funcionais

Se for necessário refatorizar código antes de fazer uma alteração funcional, apresente primeiro a refatorização num PR próprio. Misturar refatorização e alterações de comportamento torna difícil verificar que não foram introduzidas regressões.

### 3.4 Manter os commits limpos

Faça o squash ou reorganize os commits antes de abrir o PR, para que cada commit represente um passo lógico e autónomo. Evite commits como `fix typo`, `wip` ou `try again`. Um histórico de commits limpo ajuda os revisores e torna o `git bisect` útil.

---

## 4. Escrever uma boa descrição do PR

Uma descrição bem escrita não é opcional — faz parte da contribuição. Os revisores não deveriam ter de deduzir a intenção a partir do diff.

A descrição do PR tem de incluir:

### 4.1 O quê e porquê

Explique **o que** a alteração faz e **porque** é necessária. Inclua a ligação para a issue do GitHub relevante. Não se limite a repetir o título da issue — acrescente o contexto de que um revisor precisa para avaliar as escolhas de implementação.

### 4.2 Como testar

Descreva como o revisor pode verificar que a alteração funciona corretamente. Inclua:
- Passos para reproduzir o problema (no caso de correções de erros)
- Como exercitar o novo comportamento (no caso de funcionalidades)
- Indicações dos testes automatizados relevantes

Se uma alteração não puder ser testada automaticamente, explique porquê e descreva a verificação manual realizada.

### 4.3 Alterações incompatíveis

Se o PR introduzir qualquer alteração incompatível — a uma API, a uma interface de configuração, a um esquema de base de dados ou a um contrato partilhado —, assinale-a **de forma explícita e destacada** no início da descrição. As alterações incompatíveis exigem revisão adicional e podem ter de seguir o [Processo de alteração consequencial](consequential-change-process.md).

### 4.4 Divulgação da assistência de IA (ver a secção 4)

Se tiverem sido utilizadas ferramentas de IA na produção de qualquer parte do PR — código, testes ou descrição do PR —, isso tem de ser divulgado na descrição do PR. Consulte a secção 4 para o formato exigido.

---

## 5. Assistência de IA: atribuição e responsabilização

A [Política de IA do Mojaloop](../standards/ai_policy.md) aplica-se a todas as contribuições através de PR. As regras seguintes condensam essa política em requisitos concretos para os PR.

### 5.1 A divulgação é obrigatória

Se qualquer ferramenta de IA (incluindo, entre outras, GitHub Copilot, ChatGPT, Claude, Gemini, Cursor ou semelhantes) tiver ajudado a produzir **qualquer parte do PR** — incluindo código, testes, mensagens de commit ou a própria descrição do PR —, tem de ser incluído o seguinte bloco de divulgação na descrição do PR:

```
**AI Assistance Disclosure**
AI tools were used in producing part of this contribution.
Tools used: [list tool(s) and version(s) where known]
Scope: [brief description of what was AI-assisted, e.g. "unit test scaffolding", "initial implementation of X function", "PR description draft"]
All AI-generated content has been reviewed, understood, and validated by the author.
```

Todos os ficheiros de código na organização GitHub do Mojaloop têm de incluir um cabeçalho de licença e de contribuidores. Certifique-se de que todos os ficheiros alterados têm o seu nome e endereço de e-mail atual na lista. Se tiver utilizado IA, deveria incluir os detalhes das ferramentas utilizadas junto ao seu nome e e-mail, assim:

```
 - {your name} <{your email}> [Assisted by {model name} {model version}] 
```

por exemplo:
```
/*****
 License
 --------------
 Copyright © 2026 Mojaloop Foundation

 The Mojaloop files are made available by the Mojaloop Foundation under the Apache License, Version 2.0
 (the "License") and you may not use these files except in compliance with the [License](http://www.apache.org/licenses/LICENSE-2.0).

 You may obtain a copy of the License at [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the [License](http://www.apache.org/licenses/LICENSE-2.0).

 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Mojaloop Foundation organization for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.

 * Mojaloop Foundation
 - James Bush <jbush@mojaloop.io> [Assisted by Claude Sonnet 4.6]

 --------------
 ******/
```

Omitir esta divulgação quando foi utilizada IA constitui uma violação da Política de IA e resultará na devolução do PR.

### 5.2 Responsabilidade total por todo o código submetido

A divulgação não dispensa a responsabilidade. Quer tenha ou não sido utilizada assistência de IA, o autor humano do PR é totalmente responsável por:

- A **correção** da lógica
- A **segurança** da implementação
- A **consistência da arquitetura** com as normas do Mojaloop
- A **conformidade com as licenças** — não é permitido submeter código gerado por IA derivado de dados de treino com licenças não admissíveis
- A **manutenibilidade a longo prazo** do que foi introduzido

«Foi a IA que o escreveu» não é uma resposta aceitável a um comentário de revisão. Se não for possível explicar e defender todas as partes do PR, este não está pronto para ser submetido.

### 5.3 A IA não pode substituir o juízo humano

As ferramentas de IA não podem ser utilizadas para tomar ou delegar decisões de arquitetura ou de design. Quando uma ferramenta de IA propõe uma abordagem que se afasta dos padrões ou das invariantes estabelecidos do Mojaloop, o contribuidor humano é responsável por o reconhecer e por o corrigir antes da submissão.

### 5.4 As submissões por agentes automatizados são proibidas

Os PR não podem ser submetidos por agentes de IA totalmente autónomos. Todos os PR têm de ser abertos por um contribuidor humano. A única exceção é a automação nativa do GitHub oficialmente autorizada e já integrada nos fluxos de trabalho do Mojaloop (por exemplo, Dependabot, Snyk, ferramentas automatizadas da Mojaloop Foundation para manutenção). As submissões por agentes automatizados serão rejeitadas sem revisão.

---

## 6. Lista de verificação da qualidade do código

Antes de marcar um PR como pronto para revisão, confirme o seguinte:

- O PR está ligado a uma issue do GitHub com uma palavra-chave de fecho
- O PR faz exatamente uma coisa; as alterações não relacionadas foram removidas ou separadas
- Todos os testes automatizados passam localmente
- O novo comportamento está coberto por testes
- Não foram introduzidos novos erros ou avisos de linting
- As alterações de dependências são justificadas e mínimas
- Quaisquer alterações incompatíveis estão claramente assinaladas
- A descrição do PR explica o quê, porquê e como testar
- A divulgação da assistência de IA está incluída, se aplicável (ver a secção 5.1)
- Leu, compreendeu e é capaz de defender cada linha do diff

---

## 7. Expectativas dos revisores

Os revisores são voluntários que dedicam o seu tempo. Ajude-os a ajudar.

- **Responda prontamente** aos comentários de revisão. Se precisar de tempo, diga-o.
- **Não faça push de alterações não relacionadas** para um PR que já está em revisão sem as assinalar.
- **Não faça rebase nem force-push** de um PR com comentários de revisão ativos — isso perturba o contexto do revisor. Coordene primeiro.
- Se um revisor pedir que um PR seja dividido, divida-o. Isto não é uma crítica; é assim que o Mojaloop mantém um histórico revisível e compatível com bisect.
- Um PR sem atividade durante **30 dias** pode ser fechado por um responsável pela manutenção. Pode ser reaberto quando estiver tudo pronto para continuar.

---

## 8. PR em rascunho

Utilize a funcionalidade **Draft PR** do GitHub para trabalho em curso. Isto indica aos responsáveis pela manutenção e aos revisores que são bem-vindos comentários sobre a orientação geral, mas que ainda não é pedida uma revisão completa. Converta para «Ready for Review» apenas quando todos os itens da lista de verificação acima estiverem cumpridos.

---

## 9. Hotfixes e alterações urgentes

No caso de correções de segurança críticas ou de erros que afetam a produção, siga o [Processo de alteração crítica](critical-change-process.md). Mesmo sob pressão de tempo, o requisito de divulgação de IA e a lista de verificação da qualidade do código continuam a aplicar-se. Uma revisão rápida não é uma licença para os ignorar.

---

*Para questões sobre estas orientações, publique no canal do Slack do workstream relevante ou abra uma issue do GitHub no [repositório da documentação](https://github.com/mojaloop/documentation).*

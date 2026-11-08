---
i18n_source_sha: 344575b0687e2c3430fe66f41a44360892a0415f
---

# Política de utilização responsável de ferramentas de Inteligência Artificial (IA) pelos membros da comunidade

- Versão: 1.0
- Data de entrada em vigor: 2026-04-08
- Autor: James Bush (jbush@mojaloop.io)
- Aplica-se a: Todos os contribuidores, responsáveis pela manutenção, adotantes e participantes na comunidade Mojaloop e nos projetos associados, incluindo os repositórios da organização Mojaloop no GitHub.

**Divulgação de IA** Este documento inclui conteúdo gerado com a assistência do ChatGPT 5.2. Todo o conteúdo foi revisto e validado pelo autor.

---

## 1. Objetivo

Esta política estabelece orientações claras e pragmáticas para a utilização responsável de ferramentas de Inteligência Artificial (IA) na comunidade Mojaloop.

A Mojaloop Foundation apoia a inovação e as melhorias de produtividade, incluindo a utilização de ferramentas assistidas por IA. No entanto, a transparência, a responsabilização e a confiança da comunidade continuam a ser primordiais. Esta política garante que a utilização de IA melhora a colaboração sem comprometer a abertura, a integridade da autoria ou a qualidade técnica.

---

## 2. Princípios orientadores

Toda a utilização de IA na comunidade Mojaloop deve cumprir os seguintes princípios:

1. **Responsabilização humana** – Um contribuidor humano é sempre responsável pelo resultado final.
2. **Transparência** – A utilização de conteúdo gerado por IA deve ser claramente divulgada.
3. **Qualidade e segurança** – Os resultados gerados por IA devem cumprir as normas de engenharia e de documentação do Mojaloop.
4. **Integridade da comunidade** – A IA não deve ser utilizada de formas que perturbem ou sobrecarreguem os processos da comunidade.

---

## 3. Utilizações permitidas das ferramentas de IA

### 3.1 IA para tomar notas em chamadas da comunidade

As ferramentas de IA podem ser utilizadas para tomar notas durante as **chamadas públicas da comunidade Mojaloop**, nas seguintes condições:

- O utilizador da ferramenta de IA **tem de estar pessoalmente presente** na chamada, salvo autorização prévia do anfitrião da reunião.
- As ferramentas de IA para tomar notas não podem entrar em chamadas independentemente de um participante humano sem autorização prévia explícita do anfitrião da reunião.
- Não são permitidos bots de IA anónimos. Todos os bots de IA devem divulgar publicamente o membro humano da comunidade que representam.
- As ferramentas de IA para tomar notas só podem entrar em chamadas em que a gravação da chamada esteja ativada.

**Fundamentação:**
A comunidade Mojaloop valoriza a discussão aberta e a segurança psicológica. A presença de numerosos bots de gravação ou de resumo sem acompanhamento pode desencorajar a participação e afetar negativamente a colaboração.

---

### 3.2 Assistência de IA na documentação

Os membros da comunidade podem utilizar ferramentas de IA para ajudar a:

- Redigir documentação
- Melhorar a clareza ou a gramática
- Reformatar conteúdo
- Gerar resumos
- Traduzir conteúdo

No entanto:

- Qualquer documento em que a IA tenha gerado **qualquer parte do conteúdo** tem de conter uma declaração clara no cabeçalho do documento que especifique:
  - Que foram utilizadas ferramentas de IA
  - Que ferramenta(s) de IA foram utilizadas

**Exemplo de declaração de divulgação:**

  _Este documento inclui conteúdo gerado com a assistência do [nome da ferramenta]. Todo o conteúdo foi revisto e validado pelo autor._

A não divulgação de conteúdo gerado com assistência de IA pode resultar na rejeição ou na devolução do documento para correção.

**Fundamentação:**
A transparência mantém a confiança na autoria e permite aos leitores avaliar adequadamente a proveniência.

---

### 3.3 Assistência de IA na criação de código e na depuração

As ferramentas de IA podem ser utilizadas para:

- Geração de código
- Sugestões de código
- Assistência na refatorização
- Apoio à depuração
- Geração de testes
- Geração de documentação do código

No entanto, aplicam-se estritamente as regras seguintes:

#### 3.3.1 Requisito de submissão humana

- Todos os pull requests (PR), issues e submissões de código têm de ser feitos por contribuidores humanos.
- Os agentes de IA totalmente automatizados não podem submeter PR, correções de erros ou alterações de código.
- Todos os pull requests (PR), issues e submissões de código têm de seguir os requisitos do processo de engenharia de produto da comunidade Mojaloop.
- A única exceção são as ferramentas automatizadas com suporte oficial e já integradas nos fluxos de trabalho do GitHub (por exemplo, bots de atualização de dependências como o Dependabot).

Quaisquer submissões de agentes automatizados para além das ferramentas nativas do GitHub aprovadas serão **rejeitadas sem revisão**.

---

#### 3.3.2 Revisão humana obrigatória

Todo o código assistido por IA:

- DEVE ser minuciosamente revisto pelo submetente humano.
- DEVE ser compreendido na íntegra pelo submetente.
- DEVE cumprir as normas de código e os princípios de arquitetura do Mojaloop.
- DEVE passar todos os testes automatizados e pipelines de validação.

O código que seja claramente gerado por IA e que não tenha sido devidamente revisto, validado e compreendido pelo autor humano não será aceite na base de código.

O contribuidor humano que submete o PR mantém a responsabilidade total por:

- Correção
- Segurança
- Conformidade com as licenças
- Consistência da arquitetura
- Manutenibilidade a longo prazo

**Fundamentação:**
O Mojaloop opera no domínio dos serviços financeiros. A integridade, a segurança e a correção do código não são negociáveis.

---

## 4. Utilizações proibidas

As seguintes utilizações de IA não são permitidas nos processos da comunidade Mojaloop:

- Bots de IA sem acompanhamento a entrar em chamadas da comunidade.
- Agentes de IA totalmente autónomos a submeter PR ou issues.
- Submeter conteúdo gerado por IA sem a divulgação exigida (quando aplicável).
- Delegar decisões de arquitetura ou de design em ferramentas de IA.
- Utilizar ferramentas de IA para recolher, resumir ou redistribuir informação restrita ou confidencial sem autorização.

---

## 5. Aplicação

Os responsáveis pela manutenção e os revisores podem:

- Pedir que sejam acrescentadas declarações de divulgação.
- Rejeitar PR que aparentem não ter sido suficientemente revistos.
- Fechar submissões de agentes automatizados sem comentário.
- Pedir esclarecimentos sobre o envolvimento de IA.

As violações repetidas ou deliberadas podem ser escaladas de acordo com os procedimentos de governação da comunidade Mojaloop.

---

## 6. Revisão futura

As capacidades de IA evoluem rapidamente. Esta política será revista periodicamente pela Mojaloop Foundation e pelos responsáveis pela manutenção da comunidade, para garantir que se mantém adequada, prática e alinhada com os valores da comunidade.

---

## 7. Resumo

As ferramentas de IA são permitidas na comunidade Mojaloop quando utilizadas de forma responsável e transparente.

- Os humanos têm de se manter responsáveis.
- A IA não pode sobrecarregar os processos da comunidade.
- A divulgação é obrigatória na documentação.
- O código tem de ser sempre revisto e submetido por um humano.

A Mojaloop Foundation incentiva a adoção ponderada de ferramentas de IA de formas que reforcem, e não diluam, a qualidade, a confiança e o espírito colaborativo do ecossistema Mojaloop.

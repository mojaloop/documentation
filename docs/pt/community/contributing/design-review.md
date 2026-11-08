---
i18n_source_sha: 5e3d41835b9444468849a91fb5119694831257a9
---

# Revisão de design técnico e revisão de código

O software Mojaloop destina-se a constituir a espinha dorsal de schemes de pagamentos instantâneos inclusivos à escala nacional. Estes schemes
são peças importantes de infraestrutura financeira nacional que viabilizam atividades diárias vitais de um
grande número de pessoas, como a compra de alimentos e de água potável. Os adotantes e os utilizadores do software Mojaloop exigem
e merecem dos nossos produtos um nível extremamente elevado de qualidade, segurança, fiabilidade e resiliência.

De forma a manter estas qualidades e mitigar os muitos riscos de negócio e técnicos que os nossos adotantes e as respetivas
partes interessadas enfrentam, a Mojaloop Foundation aplica um processo estruturado de engenharia de produto baseado nas melhores
práticas comprovadas do setor para software financeiro regulado, que inclui controlo de alterações e rastreabilidade geridos tecnicamente e orientados
por processos, revisões de design técnico e de código, limiares elevados de testes e vários níveis de
barreiras de garantia de qualidade.

Os nossos processos destinam-se a ajudar os nossos contribuidores a identificar e mitigar riscos enquanto melhoram os nossos produtos, em
benefício de toda a comunidade Mojaloop.

Leia atentamente a informação seguinte para garantir que compreende as nossas definições e a forma como estes processos
se aplicam ao trabalho que pretende realizar **antes de começar**.

**Note-se que, se estes processos não forem seguidos, poderá ser pedido que a contribuição seja refeita, ou esta poderá ser
rejeitada liminarmente se não cumprir as nossas normas. Isto pode causar atrasos significativos na integração do trabalho numa
versão oficial do Mojaloop. Leia as nossas declarações sobre
o [processo de doação externa](product-engineering-process.md#workstreams-nao-oficiais-e-contribuicoes-externas).**

## O que é a revisão de design técnico?

A «revisão de design técnico» é um processo em que um ou mais engenheiros seniores especialistas no domínio, membros da
Design Authority do Mojaloop e conhecedores da(s) área(s) do sistema afetada(s), discutem as alterações propostas com os contribuidores
e com os representantes de produto **antes do início do trabalho de implementação**, com os seguintes objetivos:

- Gestão do risco
    - Ajudar a identificar e mitigar riscos técnicos e/ou de negócio para qualquer uma das nossas partes interessadas, utilizadores ou outros
      contribuidores.
- Avaliação do impacto
    - Ajudar a identificar outras áreas do sistema, equipas e partes interessadas que possam ser afetadas pela alteração, e
      facilitar a comunicação com elas.
- Normas e coesão
    - Orientar sobre as normas estabelecidas do Mojaloop para ferramentas, escolhas de componentes de terceiros e padrões de design, com
      vista a manter a coesão em toda a base de código do Mojaloop.

Para alterações não triviais, este processo implica trabalhar em colaboração com a Design Authority do Mojaloop para produzir um
documento de design que registe os vários elementos da alteração proposta com um nível de detalhe suficiente. Depois de a
alteração ser implementada, este documento passa a fazer parte da documentação da nossa comunidade, ajudando outros a compreender a
fundamentação das decisões de design tomadas ao longo do tempo, à medida que o nosso software evolui.

## O que é a revisão de código

A «revisão de código» é um processo em que um ou mais outros engenheiros de software analisam um conjunto de alterações de código propostas
**antes de ser feito o merge destas no branch principal de um repositório**, com os seguintes objetivos:

- Garantia de qualidade
    - As revisões de código ajudam a garantir a qualidade da base de código, permitindo que outros membros da equipa identifiquem potenciais problemas,
      erros ou áreas de melhoria antes de ser feito o merge do código no branch principal. Isto pode resultar em
      software de maior qualidade, com menos defeitos.
- Partilha de conhecimento
    - As revisões de código proporcionam uma oportunidade para os membros da equipa aprenderem uns com os outros. Ao rever o código escrito pelos
      seus pares, os contribuidores podem conhecer diferentes abordagens, boas práticas e padrões de código. Isto ajuda a
      difundir conhecimento e competências pela comunidade.
- Consistência
    - As revisões de código ajudam a manter a consistência do estilo de código, das normas e das convenções no projeto Mojaloop. Ao
      ter vários membros da comunidade a rever o código uns dos outros, esperamos garantir que a base de código segue as
      normas estabelecidas e se mantém coesa.
- Mitigação do risco
    - As revisões de código podem ajudar a mitigar os riscos associados às alterações à base de código. Ao ter vários pares de olhos
      a examinar o código, os potenciais riscos, vulnerabilidades de segurança e estrangulamentos de desempenho podem ser identificados
      cedo e resolvidos antes de causarem problemas nos deployments de produção.
- Comentários e melhoria
    - As revisões de código proporcionam uma oportunidade para comentários construtivos e colaboração. Os contribuidores podem fazer
      sugestões de melhoria, partilhar soluções alternativas e discutir decisões de design. Isto promove uma cultura de
      melhoria contínua na comunidade.
- Propriedade do código
    - As revisões de código incentivam um sentido de propriedade coletiva da base de código. Quando vários membros da comunidade estão
      envolvidos na revisão e na contribuição para o código, este torna-se uma responsabilidade partilhada, e não a
      responsabilidade exclusiva de contribuidores individuais.

## Tipos de alteração

Enquanto contribuidor do Mojaloop, o processo a seguir depende da natureza da alteração a fazer e do seu
potencial impacto nas várias categorias de utilizadores e no sistema como um todo.

Utilize as definições abaixo para identificar a categoria da alteração a fazer e selecione o processo adequado a
seguir. É da responsabilidade do contribuidor aplicar o processo adequado, e ser-lhe-á exigido que assine um
acordo de contribuidor em que declara que cumprirá estes requisitos.

Em caso de dúvida sobre qual das categorias seguintes se aplica à alteração, consulte a Design Authority do Mojaloop
através do Slack, aqui: [#design-authority](https://mojaloop.slack.com/archives/CARJFMH3Q). Note-se que é
importante participar em qualquer processo de revisão de design exigido antes de avançar com quaisquer alterações de código, para evitar desperdiçar
esforço próprio caso a Design Authority peça que o trabalho seja refeito.

### Alterações não consequenciais

#### Definição e características

Uma alteração de código não consequencial é uma modificação pequena e altamente isolada feita a um excerto de código existente. Estas
alterações não afetam a estrutura interna ou externa, nem a funcionalidade do âmbito local, ou seja, as suas entradas ou
saídas, e são normalmente feitas por razões como melhorar a legibilidade, corrigir problemas de estilo de código e/ou pequenas
otimizações de desempenho. As alterações de código não consequenciais são simples e de baixo risco.

Uma alteração de código não consequencial não altera de forma alguma as interfaces externas, a funcionalidade ou o comportamento observável externamente
de um ou mais componentes.

Uma alteração de código não consequencial não altera de forma alguma a estrutura interna de um ou mais componentes.

_Nota importante: Se a alteração for uma otimização e implicar alterar a implementação de qualquer algoritmo, pondere
cuidadosamente se justifica uma revisão de design ou uma revisão de código mais rigorosa do que o normal. É muito melhor ser prudente e
procurar mais olhos sobre a alteração do que introduzir inadvertidamente uma regressão._

#### Exemplos

Os exemplos incluem:

- Mudar o nome de variáveis
- Ajustar a indentação
- Adicionar comentários
- Remover imports não utilizados
- Otimizar algoritmos mais pequenos

#### Processo de revisão de design e de código exigido

1. Não é exigida revisão de design, mas esta pode ser realizada ainda assim, em caso de qualquer dúvida sobre as consequências
   das alterações.
2. Pelo menos uma revisão de aprovação de um «code owner» de todos os ficheiros de código-fonte a modificar.
    1. Note-se que, se não estiverem definidos code owners para algum dos ficheiros de código-fonte a modificar, deve abrir uma issue junto de
       {contact details} para que sejam definidos code owners antes de avançar. Todos os ficheiros de código na organização
       GitHub do Mojaloop deveriam ter code owners definidos.
3. Revisões de código por pares adicionais, conforme pretendido. Quanto mais olhos sobre a alteração proposta, melhor.

### Alterações consequenciais

#### Definição e características

As alterações consequenciais são modificações com impacto no comportamento, na funcionalidade, nas características operacionais
ou no desempenho de um subsistema ou do sistema como um todo. Estas alterações implicam normalmente alterar a lógica de um
componente ou serviço, implementar novas funcionalidades, corrigir erros, alterar ou atualizar dependências, ou refatorizar grandes
secções de código. As alterações consequenciais exigem uma quantidade considerável de reflexão prévia e de coordenação com outras
equipas e partes interessadas, devido ao seu potencial impacto em todo o sistema na estabilidade e na funcionalidade do software. Implicam
normalmente um risco mais elevado e exigem ponderação e planeamento cuidadosos antes da implementação.

_Nota importante: Se considerar que a alteração se enquadra na categoria «Alterações consequenciais», deve também garantir que não
se enquadra na categoria [«Alterações críticas»](#alteracoes-criticas). Consulte a definição
de [«Alterações críticas»](#alteracoes-criticas) antes de avançar._

#### Exemplos

Os exemplos incluem:

- Alterar a implementação de um método de API interna existente
- Adicionar a implementação de um novo método de API interna
- Alterar a definição ou o comportamento de uma interface interna
- Alterar uma dependência de serviço de suporte, como substituir um tipo de SGBD existente por outro
- Alterar uma dependência de código, como substituir um pacote de parser de YAML por outro
- Refatorizações em vários ficheiros de código
- Alterações às configurações de deployment, por exemplo, em Infrastructure as Code.

#### Processo de revisão de design e de código exigido

As alterações consequenciais devem seguir o [Processo de alteração consequencial](consequential-change-process.md) definido.

### Alterações críticas

#### Definição e características

_**No Mojaloop, as «alterações críticas» têm, em grande medida, a mesma definição que as alterações consequenciais, mas aplicam-se especificamente a
áreas do sistema consideradas críticas para a nossa funcionalidade nuclear e para os principais casos de utilização.**_

As alterações críticas são modificações com impacto no comportamento, na funcionalidade, nas características operacionais ou no
desempenho de qualquer subsistema crítico, sistema ou outros artefactos. Estas alterações implicam normalmente alterar a lógica de
um componente ou serviço crítico, por exemplo, para implementar novas funcionalidades, corrigir erros, alterar ou atualizar dependências, ou
refatorizar código. As alterações críticas exigem uma quantidade considerável de reflexão prévia e de coordenação com outras equipas
e partes interessadas, devido ao seu potencial impacto em todo o sistema na estabilidade e na funcionalidade de aspetos críticos do
software. Implicam normalmente um risco muito elevado e exigem ponderação e planeamento cuidadosos antes da implementação.

Uma alteração deveria ser considerada uma alteração crítica se incidir sobre um ou mais dos seguintes repositórios de código, áreas
e/ou subsistemas:

- APIs externas:
    - Qualquer alteração à especificação de uma API externa, nos caminhos normais ou de erro, incluindo a validação de pedidos e as correções
      de erros.
    - Qualquer alteração à implementação do tratamento de pedidos de uma API externa, nos caminhos normais ou de erro, incluindo a validação de pedidos e as
      correções de erros.
        - Note-se que «API externa», neste caso, significa qualquer API exposta fora da fronteira do switch, por exemplo, a API FSPIOP, etc...
- APIs administrativas:
    - Qualquer alteração à especificação de qualquer API administrativa.
    - Qualquer alteração à implementação do tratamento de pedidos de qualquer API administrativa, nos caminhos normais ou de erro, incluindo a validação
      de pedidos e as correções de erros.
- Fase de descoberta do fluxo de transferência:
    - Qualquer alteração ao tratamento de pedidos de API da fase de descoberta, por exemplo:
        - Qualquer alteração à(s) implementação(ões) do tratamento de pedidos da API de account lookup e/ou aos fluxos de chamadas de e para «oracles» internos ou
          externos.
- Fase de acordo do fluxo de transferência:
    - Qualquer alteração ao tratamento de pedidos de API da fase de acordo, por exemplo:
        - Qualquer alteração ao armazenamento, obtenção, processamento ou apresentação de dados ou metadados da fase de acordo.
        - Qualquer alteração à(s) implementação(ões) do tratamento de pedidos de API da fase de acordo e/ou aos fluxos de chamadas de e para entidades internas ou
          externas.
- Fase de transferência (compensação) do fluxo de transferência:
    - Qualquer alteração ao tratamento de pedidos de API da fase de compensação da transferência, por exemplo:
        - Qualquer alteração relacionada com o processo de decidir se uma transferência é compensada ou rejeitada com base na liquidez
          disponível de um participante (verificação de liquidez).
        - Qualquer alteração ao cálculo, armazenamento, obtenção, processamento ou apresentação dos valores do limite de débito líquido dos participantes.
        - Qualquer alteração ao cálculo, armazenamento, obtenção, processamento ou apresentação da liquidez disponível de um participante.
        - Qualquer alteração ao cálculo, armazenamento, obtenção, processamento ou apresentação de qualquer valor monetário.
        - Qualquer alteração ao cálculo, armazenamento, obtenção, processamento ou apresentação de dados ou metadados de transferências.
        - Qualquer alteração no pipeline de processamento de pedidos de preparação (prepare) de transferências.
        - Qualquer alteração no pipeline de processamento de pedidos de execução (fulfil) de transferências.
- Liquidação:
    - Qualquer alteração à especificação de uma API de liquidação externa ou interna, nos caminhos normais ou de erro, incluindo a validação
      de pedidos e as correções de erros.
    - Qualquer alteração à implementação do tratamento de pedidos de uma API de liquidação externa ou interna, nos caminhos normais ou de erro,
      incluindo a validação de pedidos e as correções de erros.
    - Qualquer alteração relacionada com a inclusão ou exclusão de transferências dos lotes de liquidação.
    - Qualquer alteração relacionada com o cálculo, armazenamento, obtenção, processamento ou apresentação de dados ou
      metadados relacionados com a liquidação.

#### Exemplos

Os exemplos incluem:

- Corrigir um erro num método de validação da API FSPIOP
- Adicionar uma nova funcionalidade a uma API administrativa
- Alterar a formatação dos valores monetários apresentados aos utilizadores num portal web
- Atualizar a versão de uma dependência de código externa, por exemplo, um pacote npm de um serviço relacionado com o razão geral
- Otimizar as chamadas aos serviços de armazenamento de suporte durante o processamento de um pedido de API externa

#### Processo de revisão de design e de código exigido

As alterações críticas devem seguir o [Processo de alteração crítica](critical-change-process.md) definido.

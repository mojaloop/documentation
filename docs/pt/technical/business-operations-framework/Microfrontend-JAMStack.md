---
i18n_source_sha: 666f21f27cad5ef3d3fe214ebf7bf74877a2f165
---

# Micro-frontend - Concepção do JAMStack
## Visão geral
O objetivo do design de micro-frontend - JAMStack consiste em criar um framework que:

- permite que a comunidade colabore facilmente (ao possibilitar o desenvolvimento independente de componentes)
- facilita a criação de extensões ou personalizações
- permite que os membros da comunidade contribuam para o software de código aberto sem terem de criar uma ramificação de toda a base de código

### Microfront-ends
O framework utiliza micro-front-ends como forma de dissociar partes da interface do utilizador, de modo a permitir bases de código fáceis de manter, equipas autónomas, releases independentes e atualizações incrementais de partes da interface do utilizador. 

### JAMStack
A implementação [JAMStack](https://jamstack.org/) reduz o papel do servidor web à distribuição de ficheiros de marcação estáticos, mantendo a funcionalidade no JavaScript (que é executado no navegador do cliente) e no backend API. 
:::warning JAMStack significa:
 **J** - JavaScript
 **A** - APIs 
 **M** - Marcação estática
 :::
Esta implementação da pilha é considerada uma boa prática, uma vez que:
- é muito mais simples de manter em segurança
- proporciona uma boa experiência ao cliente, uma vez que apresenta tempos de resposta rápidos na Web
- é económico de alojar

Além disso, os seguintes elementos também foram concebidos e fazem normalmente parte de uma implementação JAMStack:
- deployment numa rede de distribuição de conteúdos (CDN)
- deploys atómicos
- utiliza micro-front-ends carregados dinamicamente, pelo que a atualização para a versão mais recente é automática

## Pilha tecnológica

1. **React** 
O framework baseia-se na biblioteca React.
Esta é a biblioteca de Aplicações de Página Única (SPA) mais utilizada atualmente e, além disso, esta escolha permite-nos tirar partido de outros esforços da comunidade, facilitando uma conversão fácil para esta biblioteca.
É possível melhorar esta funcionalidade recorrendo a bibliotecas de contêineres de estado (Redux, Flux, MobX); no entanto, não há qualquer restrição quanto à utilização de uma biblioteca específica.
Os micro-front-ends incluem armazenamentos Redux pré-configurados e isolados.

2. **Webpack 5** 
O Webpack 5 é, atualmente, o único agregador de JavaScript que permite a separação remota da compilação. Isto é feito através do plugin Module Federation.
Permite a composição em tempo de execução para proporcionar aos utilizadores uma experiência de utilização fluida e totalmente transparente, resultando numa aplicação de página única tradicional.
Existem vantagens adicionais em relação a outras tecnologias, o que se traduz numa pegada ecológica reduzida e numa melhor experiência global para os utilizadores.
O Webpack 5 irá implementar a integração entre micro-front-ends «host» e «child» em tempo de execução.

3. **CI/CD e deploys atómicos** (por exemplo, GitHub Actions) 
Cada implementação do Framework de Operações Empresariais terá de implementar a sua própria solução de deployment atómica.
O projeto padrão de Operações Empresariais utilizará o GitHub Actions para executar um pipeline de integração contínua, realizar os testes relevantes, compilar cada micro-frontend e realizar o deployment dos ficheiros estáticos resultantes através de uma CDN e/ou criar uma imagem «Docker».
Cada micro-frontend é lançado com total autonomia: a aplicação resultante pode utilizar automaticamente as versões atualizadas de cada micro-frontend individual, sem que seja necessária qualquer coordenação adicional.

4. **Execução numa CDN**
Os micro-frontends podem ser executados numa CDN. As compilações individuais são compostas apenas por ficheiros estáticos (HTML, CSS, JavaScript) e podem ser deployadas em diferentes localizações / diferentes URLs.
Desde que estejam disponíveis através de uma ligação segura (HTTPS), os micro-frontends podem ser fornecidos a partir de qualquer local e também a partir de diferentes CDNs.

5. **Correr em Kubernetes** 
Os micro-front-ends podem ser executados num ambiente «Kubernetes». Existem duas abordagens que podem ser adotadas neste contexto:
   - Os micro-front-ends individuais e a aplicação shell são containerizados (utilizando, por exemplo, o Docker) e, em seguida, alojados no Kubernetes.
As aplicações do servidor e das crianças podem ser deployadas no mesmo cluster ou em clusters diferentes, desde que sejam acessíveis ao público.
   - Deploy a private CDN in the Kubernetes cluster and host the static markup files on the CDN.
Existem várias CDNs disponíveis que são compatíveis com a versão Kubernetes.

## Compilação com o Webpack

As aplicações do anfitrião e das crianças incluem scripts para compilar os artefactos de distribuição. A compilação pode ser realizada na máquina anfitriã do programador, no CI e no Docker.

## Carregamento de micro-frontends 

O anfitrião é responsável por carregar as aplicações secundárias em tempo de execução. Recolhe informações sobre as aplicações secundárias disponíveis em tempo de execução, quer a partir de um ficheiro «API», quer a partir do registo.

O host inclui um mecanismo interno responsável por carregar apenas os elementos filhos necessários quando estes têm de ser apresentados.

Os micro-front-ends individuais não serão carregados quando não for necessário (por exemplo, quando o utilizador não aceder a uma página específica).

**Diagrama de sequência de alto nível que ilustra a forma como os microsserviços são carregados**
![High level sequence diagram illustrating how microservices are loaded](../../.vuepress/public/microfrontendloading.png)

### Repositório de micro-front-ends
A fim de disponibilizar uma entidade centralizada responsável por garantir que cada um dos micro-front-ends cumpra os requisitos necessários, sugere-se a criação de uma solução que funcione como um registo.

O registo teria as seguintes finalidades:

1. permitir que a comunidade registe os micro-front-ends e especifique alguns detalhes
2. expor um API utilizado pelo anfitrião para obter informações sobre os micro-front-ends disponíveis
3. fornecer informações sobre as versões dos micro-front-ends disponíveis

O registo ainda não existe, nem faz sentido criá-lo neste momento. 

## Deployments

O diagrama geral que se segue ilustra o deployment dos micro-front-ends numa CDN.
::: dica NOTA
O deployment do contexto delimitado API não é abordado neste diagrama.
:::
![Overview diagram showing deployment](../../.vuepress/public/BizOps-Framework-Micro-frontend-deploy.png)

Os micro-frontends utilizam deployments atómicas e nunca é necessária uma compilação completa.

Cada micro-frontend é deployado de forma independente dos restantes.

### Integração Contínua / Entrega Contínua (CI/CD)

Cada micro-frontend dispõe da sua própria configuração de CI/CD; não é necessário partilhar a mesma configuração nem utilizar a mesma ferramenta de CI.

O CI/CD pode ser configurado para permitir a existência de vários ambientes, por exemplo, DEV, QA, PROD.

Aqui está um ficheiro de exemplo que ilustra um fluxo de trabalho do Git Actions.

```yml
# This is a basic workflow to help you get started with Actions

name: CI

# Controls when the action will run. Triggers the workflow on push or pull request
# events but only for the master branch
on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [16.x]


    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
    # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
    - uses: actions/checkout@v2

    # Runs a single command using the runners shell
    - name: Use NodeJS ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
    - name: Cache node modules
      uses: actions/cache@v2
      env:
        cache-name: cache-node-modules
      with:
        # npm cache files are stored in `~/.npm` on Linux/macOS
        path: '**/node_modules'
        key: ${{ runner.os }}-build-${{ env.cache-name }}-${{ hashFiles('**/yarn.lock') }}
        restore-keys: |
          ${{ runner.os }}-build-${{ env.cache-name }}-
          ${{ runner.os }}-build-
          ${{ runner.os }}-
    - run: yarn install --frozen-lockfile
    - run: yarn lint
    - run: yarn test
    - run: yarn build
#    - name: Slack Notification
#      uses: rtCamp/action-slack-notify@v2.0.2
#      env:
#        SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}
```

### CDNs

O SPA resultante é disponibilizado por uma CDN ou por várias CDNs. Os micro-front-ends individuais podem estar alojados em diferentes CDNs.

### Kubernetes

O SPA resultante pode ser executado e disponibilizado num ou mais ambientes Kubernetes.

### Aplicação anfitriã

A aplicação anfitriã vem com uma configuração pré-definida, pronta a utilizar. Não necessita de qualquer configuração específica diferente da de uma SPA tradicional, para além da configuração do Webpack 5 Module Federation.
Irá atuar como orquestrador, carregando os micro-front-ends remotos e fornecendo-lhes funcionalidades a nível de toda a aplicação, por exemplo, autenticação, RBAC e encaminhamento do lado do cliente.

Não há praticamente nenhum limite quanto ao crescimento do host e à sua capacidade de expansão.
Recomenda-se, no entanto, centralizar toda a comunicação entre o host e os filhos, bem como os componentes partilhados, numa biblioteca externa, para que tanto o host como os filhos disponham do mesmo conjunto de informações e a integração não seja comprometida.

### Gestão de versões de micro-front-ends
​A abordagem sugerida consiste na criação de um registo onde as aplicações individuais sejam registadas. Esse registo permitiria definir algumas configurações para cada aplicação e acompanhar todas as versões disponíveis.
​
O registo apresentaria então um valor API consumido pelo anfitrião, fornecendo informações sobre os micro-front-ends disponíveis, as versões e as localizações dos artefactos.
​
O registo seria gerido por um operador de confiança através de uma interface de utilizador; caberia ao operador de confiança decidir qual a versão de cada aplicação específica que seria tornada pública e disponibilizada ao anfitrião para carregamento.
Isso permitiria também testar facilmente as versões e reverter as alterações quando necessário, tudo isto sem necessidade de recompilar e reimplantar as aplicações.
​
::: tip NOTA
Os artefactos de compilação JS criados pelo Webpack não incluem a versão no nome do ficheiro. Poderá ser necessário atualizar a compilação para distinguir as versões. Uma abordagem mais simples, que não exija a atualização da configuração de compilação, consistiria em alojar as versões em URLs diferentes.
:::
​
### Atualização do servidor anfitrião
​O anfitrião está praticamente isolado e a única coisa necessária para efetuar um controlo de versões adequado é utilizar o comando integrado `yarn version`. Este irá criar uma nova etiqueta Git e incrementar a versão `package.json`, de acordo com a forma como o comando é utilizado (interativo CLI).
​
### Atualização dos comandos remotos
​Os remotos estão isolados e a única coisa necessária para efetuar um controlo de versões adequado é utilizar o comando integrado `yarn version`. Este irá criar uma nova etiqueta Git e incrementar a versão `package.json`, de acordo com a forma como o comando for utilizado (interativo CLI).

### Menu / Composição da aplicação
​O host está configurado para construir dinamicamente a estrutura do _Menu_ e das _Páginas_ (com o react-router). Atualmente, o(s) componente(s) _Menu_ é(são) importado(s) da biblioteca `@modusbox/react-components`.
​
Não é estritamente necessário utilizar esses componentes, e o host e os dispositivos remotos podem utilizar componentes personalizados, desde que estes permitam a composição dinâmica e sejam permitidos o encaminhamento e a configuração.
​​
## A motivação por trás dos micro-frontends, com mais pormenores

​A criação de interfaces de utilizador escaláveis e distribuídas é complexa; a complexidade da lógica, as configurações de teste e os custos de compilação e deployment aumentam com o tempo. ​As decisões arquitetónicas tomadas na fase inicial podem gerar complexidade desnecessária e afetar significativamente os custos de desenvolvimento nas fases posteriores.​ Além disso, um único projeto não se adapta bem a equipas distribuídas que trabalham em conjunto na mesma base de código.Switching to a micro-frontend configuration can solve all the above issues; it provides good scalability, atomic deployments do not require a full build, and independent teams can use different code bases.

### O que caracteriza um micro-frontend

​As principais regras que podem definir uma configuração de micro-frontend podem ser resumidas da seguinte forma:​

**Responsabilidade única**
Limites definidos e bem delimitados
Orquestração centralizada​
Responsabilidade única
​Cada aplicação micro-frontend deve fornecer apenas funcionalidades específicas do negócio. Uma aplicação micro-frontend não precisa de ter conhecimento de outros aspetos do negócio e pode escalar de forma independente.​

**Limites definidos e fechados**
​Cada micro-frontend deve estar isolado, possuir os seus próprios dados e não deve ser possível a comunicação direta entre micro-frontends.​

**Orquestração centralizada**
​Cada micro-frontend deve ser carregado, gerido e controlado por um host. As funcionalidades que abrangem toda a aplicação são fornecidas pelo host (autenticação, encaminhamento, etc.).​​

### Tipos de configurações de micro-front-end

​Existem várias formas de implementar micro-front-ends; para citar algumas:​
- Composição com iframes
- Composição em tempo de execução
- Composição por federação de módulos (em um único framework)​

**Composição com iframes**
​A composição com iframes é, possivelmente, a forma mais antiga e mais simples de implementar micro-front-ends, devido ao suporte do HTML antigo aos iframes e ao isolamento de contexto nativo que estes proporcionam. A comunicação entre o host e os micro-front-ends é, geralmente, difícil de concretizar e também não se enquadra bem na Web moderna.​

**Composição em tempo de execução**
​A composição em tempo de execução consiste na ideia de carregar dinamicamente scripts JS localizados em URLs http/https e compor o resultado localmente. ​Embora permita, teoricamente, utilizar tecnologias independentes para cada micro-frontend, é também muito difícil de manter devido às diferenças entre os frameworks utilizados nos micro-frontends.​​

**Composição SPA**
​A federação de módulos é uma tecnologia implementada no Webpack 5 que permite carregar dinamicamente módulos remotos em tempo de execução. Quando combinada com um único framework de aplicações (por exemplo, o React), permite que as aplicações criadas sejam divididas em vários micro-front-ends sem sacrificar os benefícios que uma SPA proporciona. Apresenta ainda a vantagem de reduzir o tamanho das compilações.​​

### A configuração escolhida

Optámos por utilizar a composição de SPA com o Webpack 5 e o React. Vale a pena referir que, para construir um SPA com múltiplos micro-frontends, é necessário implementar e respeitar um contrato específico e rigoroso entre o host e os frontends.​ A partir de agora, iremos referir-nos aos micro-front-ends na terminologia técnica utilizada pelo Webpack 5: «remotes». ​O contrato é definido pelas seguintes regras:​

- O anfitrião obtém a lista de controlos remotos de forma dinâmica e assíncrona
- O anfitrião é responsável por carregar os comandos remotos
- O anfitrião partilha alguns elementos de contexto com os dispositivos remotos (encaminhamento, autenticação)
- Os comandos remotos têm nomes únicos
- Os controlos remotos são deployados em diferentes URLs
- Os controlos remotos não utilizam regras CSS globais
- Os controlos remotos exportam-se de acordo com as regras de federação dos módulos
- Os controlos remotos partilham a mesma versão do React (e de algumas bibliotecas)​

Quando estas regras são respeitadas, não há praticamente nenhum limite ao crescimento do SPA. A maioria das dependências básicas utilizadas em cada front-end é fornecida pelo anfitrião. Isso facilita o processo quando é necessário atualizá-las. Cada aplicação é desenvolvida de forma independente das outras; o pipeline de CI/CD mantém-se rápido, os deployments atómicos não requerem configurações complexas e cada servidor remoto é releaseado ao seu próprio ritmo, sem necessidade de modificar o anfitrião de forma alguma.

### Exemplo em tempo real alojado numa CDN

Veja o seguinte exemplo interativo: [https://microfrontend-shell-boilerplate.vercel.app/](https://microfrontend-shell-boilerplate.vercel.app/)

## Repositórios Git

Segue-se uma lista dos repositórios Git que fazem parte desta implementação:

 - [Modelo de shell para microfront-end](https://github.com/mojaloop/microfrontend-shell-boilerplate)
 - [Modelo de microfront-end](https://github.com/mojaloop/microfrontend-boilerplate)
 - [Micro frontend-utils](https://github.com/modusintegration/microfrontend-utils)
Biblioteca partilhada tanto pela aplicação shell como pelo micro-frontend.
 - [Relatórios - Atribuição de funções no Hub BizOps - Micro-frontend](https://github.com/mojaloop/reporting-hub-bop-role-ui)]
 - [Relatórios - Hub BizOps - Rastreio de transações - Micro-frontend](https://github.com/mojaloop/reporting-hub-bop-trx-ui)]


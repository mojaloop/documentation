---
i18n_source_sha: 87ab50b71ef4a7165b8c9485e19ba8d1a62ba54f
---

# Criar novas funcionalidades

## Fork

Faça fork do repositório Mojaloop para o seu espaço pessoal. Certifique-se de que mantém o branch `master` sincronizado.

Consulte a documentação seguinte para mais informação: [https://help.github.com/articles/fork-a-repo/](https://help.github.com/articles/fork-a-repo/)

1. Clone o repositório utilizando o botão Fork do Git \(consulte a documentação acima para mais informação\)
2. Clone o seu repositório com fork: `git clone https://github.com/<your_username>/<forked_repo>.git`
3. Sincronize o seu repositório com fork com o Mojaloop

   Adicione um novo repositório upstream para o Mojaloop `$ git remote add mojaloop https://github.com/mojaloop/<original_repo>.git`

   Deverão agora existir dois remotos:

   ```bash
    git remote -v
    origin    https://github.com/<your_username>/<forked_repo>.git (fetch)
    origin    https://github.com/<your_username>/<forked_repo>.git (push)
    mojaloop  https://github.com/mojaloop/<original_repo>.git (fetch)
    mojaloop  https://github.com/mojaloop/<original_repo>.git (push)
   ```

4. Para sincronizar com o branch atual: `git pull mojaloop <current_branch>` Isto fará o merge de quaisquer alterações do repositório do Mojaloop no seu repositório com fork.
5. Envie as alterações de volta para o seu fork remoto: `git push origin <current_branch>`

## Criar um branch

Crie um novo branch a partir do branch `master` com o seguinte formato: `<branchType>/<issue#><issueDescription>`, em que `issue#` pode ser obtido a partir da issue do Github e `issueDescription` é a descrição da issue formatada em CamelCase.

1. Crie o branch e faça checkout: `git checkout -b <branchType>/<issue#><issueDescription>`
2. Envie o branch para o seu remoto: `git push origin <branchType>/<issue#><issueDescription>`

Em que `<branchType>` pode ser um dos seguintes:

| branchType | Descrição |
| :---       | :--- |
| hotfix     | Um branch `hotfix` destina-se a quaisquer correções urgentes. |
| feature    | Um branch de `development` para funcionalidades novas ou de manutenção em desenvolvimento ativo. |
| fix        | Um branch de `development` utilizado para corrigir um erro. |
| release    | Um branch de versão que contém um snapshot de uma versão. |
| backup     | Um branch de cópia de segurança temporário. Normalmente utilizado durante a manutenção do repositório. |
| major      | Um branch de `pre-release` para alterações major. |
| minor      | Um branch de `pre-release` para alterações minor. |
| patch      | Um branch de `pre-release` para alterações de patch. |

## Branch principal

O branch principal deve conter sempre código adequado para deployment.
As ferramentas de automatização de builds tentarão construir e testar o código deste branch e
marcá-lo com tags de versão baseadas em semver em caso de sucesso. Os artefactos resultantes
serão também publicados nos respetivos repositórios (npm, docker, etc.),
para que possam ser utilizados por outros módulos.

## Branches de hotfix

Estes branches são criados a partir de uma tag do branch principal, quando a versão correspondente
já foi disponibilizada em produção e um problema tem de ser corrigido, e, ao mesmo
tempo, o branch principal tem versões publicadas mais recentes ou desenvolvimento em curso,
pelo que esta correção não pode ser incluída de forma atempada e estável. Estes branches são
nomeados utilizando o padrão `hotfix/<issue#><issueDescription>`. É fortemente
recomendado que a correção seja primeiro submetida no principal (ou noutro branch que
seja objeto de merge para o principal) e depois aplicada com cherry-pick no branch de hotfix. Os branches de
hot-fix não são normalmente objeto de merge para o principal nem eliminados, uma vez que podem ser utilizados
em correções subsequentes. Nos branches de hot-fix, as ferramentas de automatização de builds criarão
tags e publicarão os pacotes correspondentes, aumentando apenas o número da versão de patch.

## Branches de pré-versão

Os branches de pré-versão são utilizados quando o processo de desenvolvimento exige que existam artefactos
disponíveis no repositório para testes automatizados ou manuais de
funcionalidades ou correções em curso que não estão prontas para uma versão.
Estes branches são utilizados para evitar o trabalho manual associado à publicação
em repositórios. Os artefactos publicados terão versões e tags de pré-versão,
conforme especificado pelo semver. As ferramentas de automatização de builds criarão e publicarão estas
versões de pré-versão no repositório de pacotes e marcarão o branch no repositório
git para cada commit construído com sucesso. Os branches de pré-versão são
normalmente criados a partir do branch principal e, mais tarde, objeto de merge para ele. Os padrões
dos branches de pré-versão são:

- `major/<issue#><issueDescription>` - quando se espera que um branch inclua
  alterações incompatíveis.
- `minor/<issue#><issueDescription>` - quando se espera que um branch inclua
  apenas novas funcionalidades e nenhuma alteração incompatível. Este é o tipo de branch mais comum,
  em que decorre todo o novo desenvolvimento.
- `patch/<issue#><issueDescription>` - quando se espera que um branch inclua
  apenas correções e nenhuma nova funcionalidade ou alteração incompatível. Estes podem, por vezes, ser
  criados a partir de branches de hotfix, quando as correções têm de ser primeiro publicadas para testes,
  antes de serem objeto de merge no branch de hotfix.

Os scripts de build publicarão automaticamente uma versão de pré-versão e uma tag utilizando
`<issue#><issueDescription>` como identificador de pré-versão, seguido de um
número sequencial, ou seja, algo como
`X.Y.Z-<issue#><issueDescription>.sequence`, em que X, Y ou Z serão incrementados
automaticamente uma vez no primeiro build do branch, consoante o prefixo
major/minor/patch do nome do branch, e `sequence` será incrementado
a cada build bem-sucedido. Nos branches de pré-versão, é importante garantir que
`<issue#><issueDescription>` cumpre as regras dos identificadores de pré-versão
especificadas pelo semver. Por vezes, um branch de pré-versão minor pode acabar por
incluir uma alteração incompatível, caso em que os programadores devem garantir que
não existe desenvolvimento ativo em paralelo noutro branch major,
pois isso pode fazer com que ambos os branches tentem disponibilizar a mesma versão
major. Em geral, os programadores deveriam ter cuidado quando estão a ser desenvolvidos vários branches
de pré-versão e garantir que a versão disponibilizada no final
não entra em conflito com outros branches de pré-versão. Nesses casos, pode ser necessária uma edição
manual da versão ao resolver um conflito de merge na propriedade da versão.

## Branches de desenvolvimento

Estes branches são utilizados principalmente para o desenvolvimento de novas funcionalidades, quando não é necessário
publicar artefactos em repositórios de pacotes até ser feito o merge do branch. São criados a partir do branch principal ou de branches de pré-versão. Os nomes destes
branches não devem corresponder a nenhum dos padrões descritos acima. Os mais
utilizados são `feature/<issue#><issueDescription>` ou
`fix/<issue#><issueDescription>`. Os branches de desenvolvimento podem mais tarde
ser renomeados para branches de pré-versão, se o processo de desenvolvimento assim o exigir. Utilizar um
branch de desenvolvimento em vez de um branch de pré-versão ajuda a evitar a publicação excessiva
de artefactos e tags, que demoram mais tempo e desarrumam o repositório.

## Trabalhar na sua funcionalidade

Antes de começar a trabalhar na sua funcionalidade, percorra os passos seguintes para ajudar a garantir que a base de código do Mojaloop é bem mantida e protegida contra problemas de segurança; note-se que alguns destes passos serão necessários para que o seu Pull-Request (*PR*) passe as verificações de validação de CI (conforme indicado abaixo).

Recomenda-se que `npm test` seja executado após cada um destes passos, para garantir que não foram introduzidas alterações incompatíveis.

1. OBRIGATÓRIO - Atualizar as dependências

   ```bash
   npm run dep:check
   ```

   >
   > IMPORTANTE
   >
   > Tome nota de quaisquer dependências que tenham atualizações de versão Major, pois podem introduzir uma BREAKING CHANGE. Isto pode exigir alguma refatorização do código para acomodar a alteração.
   >
   > Consulte [Gestão de dependências](./guide#atualizacoes-de-dependencias) sobre a forma de ignorar as atualizações de dependências, se e quando necessário.
   >

   Execute o seguinte para atualizar e instalar as dependências

   ```bash
   npm run dep:update && npm i
   ```

2. OBRIGATÓRIO - Verificações de vulnerabilidades

   ```bash
   npm run audit:check
   ```

O [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit) pode ser utilizado para aplicar quaisquer correções conhecidas disponíveis:

   ```bash
   npm audit fix --package-lock-only
   ```

   >
   > IMPORTANTE
   >
   > Tome nota de quaisquer dependências que tenham alterações de versão, pois podem introduzir uma BREAKING CHANGE.
   >
   > Consulte [Gestão de dependências](./guide#auditoria-de-dependencias) para mais informação.
   >

   Se não existir uma correção funcional disponível para o problema de vulnerabilidade, será necessário fazer uma das seguintes coisas:

   1. Se o repositório utilizar [audit-ci](https://www.npmjs.com/package/audit-ci) - atualize o `audit-ci.jsonc` com o problema, adicionando-o à `allowlist`, e certifique-se de que acrescenta um comentário a indicar a razão.
   2. Se o repositório utilizar [npm-audit-resolver](https://www.npmjs.com/package/npm-audit-resolver) - execute `npm run audit:resolve` e siga as indicações da CLI para tentar corrigir ou ignorar o problema (se não existir correção disponível)

3. OPCIONAL - Atualizar o NodeJS para a versão `Active LTS`

   Verifique a versão `Active LTS` de acordo com as [versões oficiais do NodeJS](https://nodejs.org/en/about/releases).

   1. Atualize o `.nvmrc`

   2. Atualize o `Dockerfile` (tanto para o contentor *builder* como para o *runtime*), ref. [Ambiente de execução - 2. Sistema operativo do contentor (Docker) (*OS*)](./guide.md#ambiente-de-execucao).

   >
   > IMPORTANTE
   >
   > Tome nota de que atualizar a versão do NodeJS pode introduzir uma BREAKING CHANGE. Isto pode exigir alguma refatorização do código para acomodar a alteração.
   >

## Abrir um Pull Request (PR)

Quando a sua funcionalidade estiver pronta para revisão, crie um Pull Request do seu branch de funcionalidade de volta para o branch `main` no repositório do Mojaloop.

Consulte as nossas orientações sobre os requisitos específicos para a criação de pull requests [aqui](../contributing/pr-guidance.md).

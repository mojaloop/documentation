---
i18n_source_sha: 1b6158f33c910124eac37ca2bf119d3ade137c6e
---

# Lista de verificação para novos contribuidores

Este guia resume os passos necessários para começar a trabalhar como contribuidor do Mojaloop. Não precisam de ser todos concluídos de uma só vez, mas, ao chegar ao fim da lista de verificação, deverá ter aprendido bastante sobre o Mojaloop e estar preparado para contribuir para a comunidade.


## 1. Ferramentas e documentação

- Certifique-se de que já tem uma conta GitHub ou crie uma conta [aqui](https://github.com/join)

- Junte-se à comunidade slack através do [link de auto-convite](https://join.slack.com/t/mojaloop/shared_invite/zt-1qy6f3fs0-xYfqfIHJ6zFfNXb0XRpiHw) e entre nos seguintes canais:
  - `#announcements` - Anúncios de novos Releases e do estado de QA
  - `#design-authority` - Perguntas + discussão sobre o desenho do Mojaloop
  - `#general` - Discussão geral sobre o Mojaloop
  - `#help-mojaloop` - Pedir ajuda com a instalação ou execução do Mojaloop
  - `#ml-oss-bug-triage` - Discussão e triagem de novos bugs e problemas

- Diga olá! Sinta-se à vontade para fazer uma breve apresentação sua à comunidade no canal `#general`.

- Consulte o [guia de workflow de Git](https://docs.mojaloop.io/community/standards/creating-new-features.html) e certifique-se de que está familiarizado com o git.
  - Leitura adicional: [Introdução ao workflow do Github](https://www.atlassian.com/git/tutorials/comparing-workflows)

- Familiarize-se com o nosso estilo de código padrão: https://standardjs.com/

- Percorra a [Documentação do Mojaloop](https://mojaloop.io/documentation/) e obtenha uma compreensão básica de como a tecnologia funciona.

- Siga o [Guia de ferramentas do desenvolvedor](https://github.com/mojaloop/mojaloop/blob/master/onboarding.md) para colocar a funcionar as ferramentas de desenvolvedor necessárias no seu ambiente local.

- (Opcional) Coloque o Central-Ledger a funcionar em máquinas locais:
  - https://github.com/mojaloop/central-ledger/blob/master/Onboarding.md
  - https://github.com/mojaloop/ml-api-adapter/blob/master/Onboarding.md

- (Opcional:) Corra você mesmo um switch completo com Kubernetes https://mojaloop.io/documentation/deployment-guide/ _(nota: se correr localmente, o seu cluster Kubernetes precisará de 8GB ou mais de RAM)_

## 2. Encontrar um issue

- Consulte a lista [good-first-issue](https://github.com/mojaloop/project/labels/good%20first%20issue) em [`mojaloop/project`](https://github.com/mojaloop/project), para encontrar um bom issue no qual começar a trabalhar. Em alternativa, contacte a comunidade no Slack em `#general` para pedir ajuda a encontrar um issue.

- Deixe um comentário no issue a pedir que lhe seja atribuído — isto ajuda a garantir que não duplicamos trabalho. Como sempre, contacte-nos no Slack se tiver dúvidas ou preocupações.

- Faça fork dos repositórios relevantes para o issue, clone e crie um novo branch para o issue
  - Consulte o nosso [Guia do utilizador de Git](https://docs.mojaloop.io/community/standards/creating-new-features.html) se se perder


## 3. Abrir o seu primeiro PR 

Consulte as nossas diretrizes sobre a criação de pull requests [aqui](pr-guidance.md).

## 4. Assinar o CLA

Depois de abrir o seu primeiro PR, os nossos pipelines de CI/CD pedir-lhe-ão para assinar o CLA. Para mais informação sobre o que é o CLA e como o assinar, consulte [Assinar o CLA](./signing-the-cla.md)

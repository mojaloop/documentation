---
i18n_source_sha: d992996adb4432391b1d5c0889b468c209bc0bde
---

# Implementação operacional do RBAC API

## Introdução à implementação operacional do RBAC API

Os objetivos desta implementação consistem em fornecer uma solução RBAC para apoiar as operações do hub e as funções associadas. O presente guia descreve o desenho de alto nível e explica a lógica subjacente ao mesmo.


A conceção de segurança:
1. implementa o controlo de acesso baseado em funções na versão atual Mojaloop

1. é compatível, sempre que possível, com a arquitetura de referência e, por conseguinte, com futuras versões de Mojaloop
1. é compatível com futuros deployments de Infraestrutura como Código (IaC)
1. disponibiliza registos de atividades que podem ser utilizados numa auditoria

## Detalhes da implementação do RBAC

1. Aos utilizadores são atribuídas uma ou mais funções. Um utilizador pode «assumir» várias funções, de acordo com as regras definidas.

1. As funções têm permissões atribuídas

1. O Proxy de Identidade e Acesso (Ory Oathkeeper) controla o acesso aos endpoints com base nas autorizações.

1. O Backend API pode, opcionalmente, verificar as permissões através do Keto API.

1. É possível definir conjuntos de permissões mutuamente exclusivos no sistema para garantir a separação de funções. 


## Aplicação do modelo «criador-verificador»

Existem duas abordagens que podem ser adotadas para implementar um fluxo de validação do tipo «maker-checker».

1. Aplique esta regra utilizando funções e permissões mutuamente exclusivas através de políticas de segurança. Ou seja, os «criadores» não podem ser simultaneamente «verificadores»

1. Aplicar regras de segurança na camada de aplicação; ou seja, os criadores não podem ser simultaneamente verificadores no mesmo processo de validação. Isto é frequentemente implementado na camada de aplicação aquando da atribuição de criadores e/ou verificadores, tal como definido num fluxo de processo, e ao garantir que um verificador não pode ser a mesma pessoa que o criador num fluxo de validação. Ou seja, o código que assegura o cumprimento desta regra estará presente em cada contexto delimitado.



::: dica: responsabilidade no âmbito do RBAC

Para suportar esta funcionalidade, o sistema RBAC deve disponibilizar:

1. o Identificador de Utilizador desse contexto delimitado.

1. Um meio para verificar a autorização, caso seja necessário.

::: 

### Indicação do identificador do utilizador

A configuração atual fornece o Identificador do Utilizador no cabeçalho das chamadas «API». 

O Ory Oathkeeper está configurado para utilizar um mutador «header». Este mutador «header» irá transformar o pedido, permitindo-lhe transmitir as credenciais à aplicação a montante através dos cabeçalhos. Por exemplo, os backends API receberão o seguinte cabeçalho nos pedidos HTTP.

```
X-User: wso2-uuid
```

Vale a pena salientar que os «id_token»JWT também são facilmente permitidos através da modificação da configuração do mutador Ory Oathkeeper. O mutador «id_token» recebe as informações de autenticação (por exemplo, o sujeito) e transforma-as num Web Token assinado JSON, mais especificamente num ID Token OpenID Connect. Os API backends podem verificar o token ao obterem a chave (pública) a partir do /.well-known/jwks.json endpoint fornecido pelo Ory Oathkeeper API.

### Verificação da autorização

Todas as informações relativas à autorização são mantidas no Ory Keto. O Ory Keto dispõe de um código padrão API que pode ser utilizado para verificar a autorização. 

Ou seja, responde à pergunta: *«Este token de identificação do utilizador tem esta permissão?»*


## Ferramentas / normas selecionadas

Apresentamos uma lista das ferramentas padrão que foram selecionadas para implementar o projeto.

1. **Ory Oathkeeper** 

Será utilizado como Proxy de Identidade e Acesso (IAP), que verificará a autenticação e a autorização antes de conceder acesso aos endpoints funcionais; ou seja, será utilizado para aplicar o controlo de acesso.

2. **Ory Keto** 

Verificará a autorização através de mapeamentos entre sujeito-função e função-permissão. Utiliza uma estrutura flexível de objetos, relações e sujeitos, desenvolvida pela primeira vez na Google, que permite modelar diversos esquemas de autorização, incluindo o Controlo de Acesso Baseado em Funções (RBAC).

3. **Ory Kratos** 

Utilizaremos o Ory Kratos para criar e gerir o objeto de autorização de cookies.

4. **OpenID Connect** 

Trata-se da norma escolhida para interagir com um sistema de gestão de identidades. Trata-se de uma norma amplamente permitida e compatível com todas as ferramentas atualmente em uso na comunidade «Mojaloop», ou seja, o WSO2 Identity Server (IS), o Keycloak e o Ory Kratos.


## Visão geral da arquitetura

Apresentamos aqui uma visão geral da arquitetura de alto nível da implementação desta atualização operacional RBAC API na versão atual Mojaloop.


![Architecture overview diagram of security bounded context implementation](../../.vuepress/public/BizOps-Framework-IaC-3.xx-&-Mojaloop-13.xx.png)

Apresentamos, a seguir, uma tabela com os serviços e as funções que desempenham.
| Serviço | Responsável por | Implementa |
| --- | --- | --- |
|**WSO2 IS KM**|Utilizadores| 1. Redirecionamento do início de sessão do utilizador e interface de utilizador que cria o token de cookie <br>2. Fluxo padrão de código de autorização OpenID Connect (OIDC) |
|**Ory Keto**|1. As funções atribuídas aos utilizadores <br> 2. O participante atribuído aos utilizadores| 1. API Verificação de autorização RBAC através do Ory Oathkeeper<br>2. API Verificação de autorização RBAC através de uma chamada operacional API|
|**Ory Oathkeeper**|As permissões relacionadas com o acesso API | API gateway para APIs operacionais com verificações de autenticação e autorização|
|**Ory Kratos**|Nada|Cookie de autenticação|
|**BC Operacional API**|As permissões relacionadas com as chamadas operacionais API|Funções operacionais API|
|**Shim**| nada | Redirecionamento para configurar o OIDC|
|**Função de Operador**| Nada | Atualização do Keto para refletir as alterações na atribuição de funções e permissões efetuadas no ficheiro de funções e recursos|
|**Ficheiro de recursos de funções Kubernetes**| As funções e as atribuições de funções e permissões| As edições deste ficheiro são controladas através de uma implementação de controlo de versões (por exemplo, GitHub ou GitLab).|
|**Funções API**|Nada|1. A função «função-utilizador» API controla <br> (lista de utilizadores, lista de funções, lista de funções atribuídas aos utilizadores, adicionar função a um utilizador, remover função de um utilizador)<br> 2. A função «participante-utilizador» API controla <br> (lista de utilizadores, lista de participantes, lista de participantes atribuídos a um utilizador, adicionar participante a um utilizador, remover participante de um utilizador)|

## De que forma é que este projeto se enquadra na arquitetura de referência?

Vamos comparar esta implementação do RBAC Operacional API com o contexto delimitado de segurança, tal como definido na arquitetura de referência. Este projeto difere da arquitetura de referência em termos de função, finalidade e abordagem, mas, sempre que apropriado, adotou algumas das ideias de projeto. O objetivo desta implementação do RBAC é adicionar uma camada de segurança aos contextos delimitados operacionais API. O projeto do Contexto Delimitado de Segurança da Arquitetura de Referência foi concebido para dar resposta aos requisitos de desempenho das funções transacionais críticas do «Mojaloop». 

Eis as áreas gerais em que estes projetos divergem:

1. As funções de autorização estão centralizadas nesta implementação do RBAC. O projeto da arquitetura de referência exige uma autorização distribuída, implementada de forma independente em cada contexto delimitado. Este nível adicional de complexidade é desnecessário para o caso de uso operacional API.

1. O projeto da arquitetura de referência requer interfaces com outros contextos delimitados para iniciar a funcionalidade de autorização distribuída. Estas interfaces ainda não foram implementadas, uma vez que não existem componentes capazes de as utilizar. 

1. A arquitetura de referência exige que o BC de segurança gere os seus próprios tokens de segurança. Esta implementação de RBAC utiliza os tokens gerados pelo IAM.

1. A arquitetura de referência exige que as permissões sejam distribuídas através do JWT a cada contexto delimitado. Embora tal seja possível de configurar no conjunto de ferramentas atual, tal não foi feito. A razão reside no facto de alguns especialistas em segurança considerarem que esta distribuição de conjuntos de permissões de utilizador constitui uma vulnerabilidade de segurança, e de tal não ser um requisito para a atual implementação do RBAC.


Existem aspetos do contexto delimitado de segurança que foram adotados nesta implementação do RBAC Operacional API.
1. Cada contexto delimitado possui o seu próprio conjunto de permissões ou privilégios
1. A implementação do RBAC gere todas as associações de privilégios aos utilizadores.
1. As permissões das funções dos utilizadores estão estruturadas de forma a serem facilmente distribuídas dentro de um cluster «Kubernetes».

## Conformidade com a IaC 4.xxx

Apresentamos aqui um diagrama que ilustra como seria a arquitetura de alto nível caso este projeto de implementação do RBAC Operacional API fosse implementado na próxima versão do IaC (versão IaC 4.xxx), que utiliza o Keycloak e o Ambassador/Envoy, entre outras alterações.


![Architecture overview diagram of security bounded context implementation](../../.vuepress/public/BizOps-Framework-IaC-4.xx-&-Mojaloop-13.xx.png)  

## Caracterização do desempenho da implementação do RBAC

Foi realizada uma caracterização do desempenho da implementação do RBAC POC, com o objetivo de avaliar a magnitude da sobrecarga de desempenho que a camada de segurança RBAC acarreta.

::: dica Em resumo:

O RBAC acrescenta uma sobrecarga de 10 ms por cada API verificação de autorização por chamada. 

Se uma determinada chamada «API» exigir uma chamada de autorização adicional «API», a sobrecarga é de 20 ms.


Nas nossas consultas de teste, isto traduziu-se normalmente em:
1. menos de 5 % para verificações de autorização únicas (Ory Oathkeeper e Ory Keto), 
1. e menos de 10 % para verificações de autorização duplas (Ory Oathkeeper e Ory Keto e uma chamada adicional ao Ory Keto).
:::

**Detalhes da configuração do teste de caracterização**
Na mesma infraestrutura de teste, foram efetuadas chamadas cronometradas idênticas para o mesmo backend API, diretamente e através da implementação do RBAC.
Apresentam-se abaixo os resultados das chamadas de teste efetuadas à função API, com e sem RBAC, e às transferências POST API, com e sem RBAC. A função API possui uma única verificação de autorização, realizada através do Ory Oathkeeper, que invoca o Ory Keto. A transferência API é um grafo QL API que inclui um RBAC adicional

**Estatísticas de pedidos**

| Método |	Nome |	# Pedidos |	# Erros |	Média (ms) |	Mín. (ms) |	Máximo (ms) |	Tamanho médio | (bytes)    RPS |	Falhas/s |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| OBTER |	Função API |	321 |	0 |	248 |	221 |	499 |	604 |	9,0 |	0,0 |
| OBTER |	Função API RBAC |	320 |	0 |	262 |	232 |	418 |	604 |	8,9 |	0,0 |
| PUBLICAÇÃO |	TransferênciasAPI |	318 |	0 |	229 |	184 |	373 |	4873 |	8,9 |	0,0 |
| PUBLICAÇÃO |	Transferências API RBAC |	314 |	0 |	240 |	194 |	406 |	4873 |	8,8 |	0,0 |
| | **Agregado** |	**1273** |	**0** |	**245** |	**184** |	**499** |	**2723** |	**35,5** |	**0,0** |


**Estatísticas relativas ao tempo de resposta**

| Método |	Nome |	50.º percentil (ms) |	60.º percentil (ms) |	70.º percentil (ms) |	80.º percentil (ms) |	90.º percentil (ms) |	95.º percentil (ms) |	99.º percentil (ms) |	100.º percentil (ms) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| OBTER |	Função API |	240 |	240 |	240 |	250 |	270 |	290 |	400 |	500 |
| OBTER |	Função API RBAC |	250 |	260 |	260 |	270 |	290 |	320 |	410 |	420 |
| PUBLICAÇÃO |	TransferênciasAPI |	220 |	220 |	240 |	250 |	290 |	330 |	360 |	370 |
| PUBLICAÇÃO |	Transferências API RBAC |	230 |	240 |	250 |	280 |	310 |	330 |	400 |	410 |
| | **Agregado** |	**240** |	**250** |	**250** |	**260** |	**290** |	**320** |	**400** |	**500** |

## Iniciar sessão na interface do utilizador

Este diagrama de sequência ilustra os eventos que ocorrem quando um navegador tenta aceder a um backend API. 

- Se o navegador já estiver com sessão iniciada, a solicitação é encaminhada. 

- Se o navegador não estiver com sessão iniciada, é acionado um fluxo de autorização OIDC padrão, que começa com um redirecionamento.


![Sequence diagram illustrating how a brower logs in](../../.vuepress/public/frontend.png) 

## Consulta de dados utilizando o micro-frontend operacional BC API

O diagrama de sequência que se segue apresenta mais pormenores sobre as interações quando:

- o token ao portador é válido ou inválido

- a autorização é aprovada ou rejeitada


O micro-frontend é representado como um cliente.

![Sequence diagram illustrating how an API client call has its authorization performed](../../.vuepress/public/client.png) 

Em alguns casos, poderá ser necessário que o API operacional efetue uma verificação de autorização mais detalhada. O diagrama de sequência seguinte descreve a forma como isso é implementado.

É importante referir que nem todas as APIs operacionais exigirão este nível de autorização e que o controlo Ory Oathkeeper pode ou não ser necessário neste caso de uso.

![Sequence diagram illustrating how an API client call has its authorization performed](../../.vuepress/public/clientgraphql.png) 

## Aplicação da separação de funções

Esta implementação do RBAC permite garantir a separação de funções através da aplicação de conjuntos de permissões mutuamente exclusivos. A implementação da separação de funções proporciona uma segurança mais rigorosa, mas pode acarretar complexidade para o administrador de segurança e para os utilizadores finais que utilizam o sistema. A aplicação de permissões mutuamente exclusivas pode reduzir essa complexidade e ajudar a geri-la.


Um exemplo de autorizações mutuamente exclusivas pode ser o caso de um utilizador que tenha acesso ao Portal Financeiro e possa realizar funções sensíveis, tais como adicionar ou levantar fundos. Este utilizador não deve, além disso, ter acesso a funções de auditoria.

### Modelização da exclusão

Esta implementação modela estes requisitos como um conjunto de permissões mutuamente exclusivas — exclusões de permissões que são aplicadas globalmente. Estas exclusões são definidas como dois conjuntos de permissões que são mutuamente exclusivos, o que é intuitivo e fácil de manter.


*Justificação*
Existem três formas possíveis de esta exclusão ter sido modelada, nomeadamente:
1. Permissão — Exclusões de permissão
1. Função do utilizador — Exclusões de função do utilizador
1. Função do utilizador — Exclusões de permissão

Uma vez que esta funcionalidade foi adicionada para permitir a segregação/separação de funções, a forma mais clara de a aplicar consiste em definir uma exclusão de pares de permissões que seja aplicada globalmente. Com todas as outras opções, existe a possibilidade de a exclusão poder ser contornada através da adição de uma nova função inclusiva. 

### Funções sintéticas vs. funções de utilizadores múltiplos

Esta implementação do RBAC não utiliza funções sintéticas, mas recorre, em vez disso, à atribuição de várias funções funcionais aos utilizadores.


*Justificação*
Estes são dois métodos que podem ser utilizados para modelar permissões RBAC com permissões mutuamente exclusivas.
1. Criar dinamicamente uma função sintética para cada utilizador com base em regras associadas às funções atualmente atribuídas e às respetivas permissões e exclusões.
1. Definir funções associadas às funções dos utilizadores. Cada utilizador terá, portanto, de ter atribuída mais do que uma função. É menos provável que as permissões das funções sejam alteradas.

A preferência recai sobre a implementação de múltiplas funções. Isto deve-se ao facto de este método ser muito mais simples de compreender, manter e apoiar. Identificar a causa de uma perda de permissão numa função sintética, devido à atribuição de múltiplas funções e à subsequente aplicação de regras, requer uma compreensão detalhada do processo de cálculo e implementação dessas funções sintéticas. Esta complexidade é evitada com a segunda opção.

### A atribuição de várias funções aos utilizadores exigiu uma verificação dinâmica das exclusões

Permitir que o administrador do sistema atribua mais do que uma função a um utilizador é prático, flexível e limita o número de funções necessárias na organização. Isto também significa que é possível violar uma permissão mutuamente exclusiva ao atribuir funções aos utilizadores. A verificação e a aplicação destas exclusões têm, por conseguinte, de ser dinâmicas.


Existem vários momentos em que esta verificação dinâmica deve ser efetuada.
1. Aquando da atribuição de uma função a um utilizador
1. Aquando da aplicação de uma nova definição de recurso de função-permissão, ou da aplicação de uma nova política de segurança que possa incluir uma alteração abrangente das estruturas de permissões e funções.
::: aviso Extensão futura:
Se for possível que exista uma violação no sistema, então, sempre que uma permissão for verificada, as violações de exclusão também deverão ser verificadas. Atualmente, isto não está previsto, uma vez que se parte do princípio de que os pontos 1 e 2 estão suficientemente implementados para que não possa existir qualquer violação.
Recomenda-se que esta verificação adicional seja incluída no roadmap para futuras extensões, uma vez que tal garantiria que não fosse possível efetuar qualquer substituição dissimulada que violasse esta separação de funções.
:::

::: dica Nota: 

A release do controlo de alterações e os testes em ambientes de teste podem não detetar estas violações. Os testes relativos a estas violações não podem ser realizados em ambientes de teste sem que se verifique previamente se o controlo de acesso dos utilizadores é idêntico nesses ambientes, o que normalmente não acontece.

:::

**Relação «Keto»**
Introdução de uma relação que associa duas autorizações que não podem ser detidas em simultâneo.
```
“permission:X excludes permission:Y#allowed”
```

**Definição de Recurso Personalizado de Exclusão de Permissões**
Os recursos personalizados de exclusão de permissões são utilizados pelo Controlador de Permissões de Funções, que irá carregar as exclusões no Keto utilizando esta relação. Cada um conterá dois conjuntos de permissões, e a posse de qualquer permissão num conjunto implicará que não é possível possuir nenhuma permissão no outro conjunto. Isto permite diversos cenários flexíveis, e o cenário mais simples de «qualquer pessoa que possa fazer esta ação não pode fazer aquela, e vice-versa» continua a ser fácil de expressar.

**Verificação de Validação do Operador de Permissões de Função API**
O Controlador de Recursos de Permissões de Função irá fornecer um API que pode ser utilizado para verificar a admissibilidade de uma atualização de permissão de segurança antes de esta ser aplicada. Esse «API» analisará uma alteração proposta a um recurso específico de Permissões de Função e calculará se algum utilizador existente passaria a ter permissões mutuamente exclusivas após essa alteração, devolvendo o resultado. Este «API» poderá ser utilizado pela interface de utilizador administrativa e pelos sistemas de infraestrutura de cibersegurança para efetuar uma «verificação prévia» das alterações, de modo a detetar potenciais problemas.

**Aplicação de alterações por parte do operador de permissões de funções**
Quando um recurso de permissão de função é alterado, o operador de permissões de função irá, em primeiro lugar, bloquear a possibilidade de alterar as atribuições de funções aos utilizadores; em seguida, realizará a mesma verificação que a validação API; e, caso o recurso não passe na verificação, não aceitará as alterações desse recurso, mantendo, em vez disso, as atribuições atuais de permissões de função, e apresentará o problema como um erro no Kubernetes API para fins de instrumentação e alertas.

**Verificação de conflitos na atribuição de funções ao utilizador**
Quando é atribuída uma função a um utilizador, a atribuição de funções ao utilizador n.º API verificará se a alteração não resulta na existência de duas permissões mutuamente exclusivas para o utilizador. Caso tal aconteça, a alteração será rejeitada e será devolvido um erro.

## Atribuição de funções e de direitos de acesso aos participantes aos utilizadores

Esta funcionalidade está implementada no serviço «Roles API». O diagrama de sequência que se segue descreve a forma como o acesso à função do utilizador e à participação do utilizador é consultado e alterado através do serviço «Roles API». 

![Sequence diagram illustrating how roles and participant access is assigned to users](../../.vuepress/public/userroles.png) 

### Funções API

A tabela seguinte apresenta um resumo dos recursos da função «API».


| Categoria | Método HTTP | Endpoint | Descrição | Códigos de erro |
| --- | --- | --- | --- | --- |
| **SAÚDE** | | | | |
| | OBTER | /saúde | Utiliza-se para devolver o estado atual do API | 400, 401, 403, 404, 405, 406, 501, 503 |
| | OBTER | /métricas | Utiliza-se para devolver métricas para o API | 400, 401, 403, 404, 405, 406, 501, 503 |
| **PARTICIPANTES** | | | | |
| | OBTER | /participantes | Utiliza-se para devolver uma lista de IDs dos participantes | 400, 401, 403, 404, 405, 406, 501, 503 |
| **FUNÇÕES** | | | | |
| | OBTER | /funções | Utiliza-se para devolver uma lista de IDs de funções | 400, 401, 403, 404, 405, 406, 501, 503 |
| **UTILIZADORES** | | | | |
| | OBTER | /utilizadores | Utiliza-se para devolver uma lista de IDs de utilizador | 400, 401, 403, 404, 405, 406, 501, 503 |
| | OBTER | /utilizadores/{ID} |  Utiliza-se para indicar um utilizador específico | 400, 401, 403, 404, 405, 406, 501, 503 |
| | OBTER | /utilizadores/{ID}/participantes | Utiliza-se para devolver uma lista de participantes atribuídos a um utilizador | 400, 401, 403, 404, 405, 406, 501, 503 |
| | PATCH | /utilizadores/{ID}/participantes | Utiliza-se para atribuir um participante a um utilizador | 400, 401, 403, 404, 405, 406, 501, 503 |
| | OBTER | /utilizadores/{ID}/funções | Utiliza-se para devolver uma lista das funções atribuídas a um utilizador | 400, 401, 403, 404, 405, 406, 501, 503 |
| | PATCH | /utilizadores/{ID}/funções | Utiliza-se para atribuir uma função a um utilizador | 400, 401, 403, 404, 405, 406, 501, 503 |


A especificação detalhada das Funções API pode ser consultada [aqui](https://docs.mojaloop.io/role-assignment-service/
).
O repositório GitHub do serviço de atribuição de funções pode ser consultado [aqui](https://github.com/mojaloop/role-assignment-service).

## Atribuição de permissões a funções e conjuntos de permissões mutuamente exclusivos

A atribuição de permissões a funções é armazenada num ficheiro `.yml`, ao qual chamamos ficheiro de recursos de funções (`roleresource.yml`). 

O acesso e as alterações a estes ficheiros de recursos de funções serão geridos através de uma solução de controlo de versões alojada, como a GitHub ou a GitLab. Isto é conveniente, uma vez que mantém um histórico completo das alterações e dispõe de pontos de controlo automáticos e manuais configuráveis.

Estes ficheiros de recursos de funções são mapeados como Kubernetes definições de recursos personalizados (CRDs) às quais um operador de permissões de funções está subscrito. As alterações aos ficheiros de recursos de funções levam o operador de permissões de funções a atualizar o Ory Keto com a alteração adequada correspondente. Uma função pode ser representada por mais do que um ficheiro, se necessário.


Existem dois tipos de ficheiros de recursos de funções: o primeiro contém as atribuições de permissões das funções e o segundo, os conjuntos de permissões mutuamente exclusivos.

Eis um exemplo de um ficheiro de atribuição de permissões entre funções e recursos:
```yml
apiVersion: "mojaloop.io/v1"
kind: MojaloopRole
metadata:
  name: arbitrary-name-here
spec:
  # must match what is used in Keto, whatever that is
  role: RoleIdentifier
  permissions:
  - permission_01
  - permission_02
  - permission_03
  - permission_04'
```
O diagrama de sequência que se segue ilustra a forma como o Ory Keto é atualizado.

![Sequence diagram illustrating how roles and participant access is assigned to users](../../.vuepress/public/rolepermissions.png)

## Ory Keto – detalhes de implementação

O Ory Keto, neste contexto, é a ferramenta que implementa a lógica que determina se um token de início de sessão possui a autorização correta para aceder a uma parte do sistema; ou seja, é utilizado para aplicar o modelo RBAC. A implementação desta lógica no Keto divide-se em três partes:

1. A atribuição de funções aos utilizadores.

Esta funcionalidade será mantida e atualizada a partir do módulo «Roles API», que irá aceder ao Keto e atualizá-lo em conformidade.

2. A atribuição do acesso de participante a um utilizador. 

Isto refere-se aos relatórios de acesso «DFSP», que só devem ser fornecidos aos participantes configurados.

Esta funcionalidade será igualmente mantida através do módulo «Roles API», que irá aceder ao Keto e atualizá-lo em conformidade. 

3. A atribuição de permissões ou privilégios a funções. 

Isto será controlado através das alterações num ficheiro GitHub `roleresource.yml`. O operador de permissões de funções Kubernetes é o serviço que irá monitorizar estes ficheiros de funções e recursos e atualizar o Keto para que as atribuições entrem em vigor.


### Atribuição de funções e de direitos de acesso aos participantes aos utilizadores no Keto

A lista de utilizadores (que inclui tanto pessoas como contas de serviço) será obtida a partir do WSO2 Identity Server, e a lista de participantes a partir do API já existente para esse efeito. Em ambos os casos, deverá ser utilizado um identificador permanente e duradouro nas chamadas Keto.


A lista de funções será codificada de forma estática, e a cada função deverá ser atribuído um identificador curto único, legível e escrevível por pessoas, bem como um nome. A interface do utilizador deverá apresentar tanto o identificador como o nome, uma vez que o identificador será necessário para utilização no operador «função-permissão».

Serão utilizados dois espaços de nomes Keto para as chamadas: «role» e «participante». As tuplas Keto utilizadas serão: 
```
role:ROLEID#member@USERID and participant:PARTICIPANTID#member@USERID 
```
(utilizando a notação empregada para [Keto/Zanzibar](https://www.ory.sh/keto/docs/concepts/relation-tuples)

A reutilização da relação `"member"` não constitui um problema, uma vez que cada relação é específica de um espaço de nomes. Caso exista um termo preferencial para a relação participante-utilizador que não seja `"member"`, esse termo pode ser utilizado em vez deste e deve ser documentado aqui.

Para recuperar a lista de funções ou participantes de um utilizador específico, será utilizada a [Consulta de Tuplas de Relação API](https://www.ory.sh/keto/docs/reference/rest-api#query-relation-tuples), devendo ser fornecidos como parâmetros o namespace, a relação e o sujeito. Isto irá fornecer uma lista de tuplas na resposta, com um token de página seguinte caso existam resultados adicionais, e os identificadores dos participantes ou funções podem ser lidos a partir das tuplas resultantes.

Quando uma função ou um participante é adicionado ou removido para um utilizador, podem ser utilizadas as chamadas de tupla de relação [create](https://www.ory.sh/keto/docs/reference/rest-api#create-a-relation-tuple) e [delete](https://www.ory.sh/keto/docs/reference/rest-api#delete-a-relation-tuple), uma vez que está envolvida apenas uma única tupla de cada vez. Se a chamada falhar, mas a falha não for um código HTTP 4xx, deve ser repetida algumas vezes.

Eis um exemplo da chamada «Keto API» utilizada para atribuir funções aos utilizadores.
::: dica Exemplo: Atribuir uma função a um utilizador no Ory Keto
PATCH /relation-tuples HTTP/1.1
Content-Type: application/json
Accept: application/json
:::

```json 
[
  {
    "action": "insert",
    "relation_tuple": {
    "namespace": "role",
    "object": "RoleIdentifier",
    "relation": "member",
    "subject": "userIdentifier"
    }
  }
]
```
Em caso de sucesso, é devolvida uma mensagem HTTP 204 sem conteúdo.

::: dica NOTA

Na nossa implementação atual, utilizamos o `"member"` em vez do `"relation"`.

Utilizamos o valor `PATCH` em vez de `PUT`, uma vez que o valor `PATCH` corresponde a uma criação e/ou eliminação em massa.

:::

### Adicionar permissões ou privilégios a funções no Keto

A adição de permissões ou privilégios a funções no KetoThis será efetuada através de um operador Kubernetes para uma Definição de Recurso Personalizado [(CRD)](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/_print/). O operador poderá ser implementado em praticamente qualquer linguagem de programação. A experiência atual da ModusBox em operadores baseia-se principalmente no `kopf`, um framework em Python, mas existem também opções em Go e Node (entre outras).


O operador deve manter um registo de todos os recursos que gere, agrupados por função. [A funcionalidade de indexação](https://kopf.readthedocs.io/en/latest/indexing/) do Kopf é ideal para este efeito.] 

Quando um recurso de função é alterado, a lista de permissões para essa função em todos os recursos de função deve ser compilada, devendo ser enviada uma alteração através do Keto Patch [Tuplas de Relações Múltiplas API](https://www.ory.sh/keto/docs/reference/rest-api#patch-multiple-relation-tuples) utilizando as ações de patch `insert` e `delete`. É necessário ter em conta todos os recursos de função, uma vez que pode haver vários recursos para uma mesma função e mais do que um pode incluir a mesma permissão, pelo que a eliminação de um recurso de função que associa a Função X à Permissão P não significa necessariamente que a tupla Keto para essa ligação função-permissão tenha de ser eliminada, uma vez que poderá ainda existir outro recurso de função que associe a Função X à Permissão P.

Os tuplos Keto terão o seguinte formato: 
```
permission:PERMISSIONID#granted@role:ROLEID#member
```

As operações específicas relativas à alteração de recursos são as seguintes:

1. Recupere as autorizações atualmente atribuídas à função utilizando a [Consulta de Tuplas de Relação API](https://www.ory.sh/keto/docs/reference/rest-api/#query-relation-tuples)].

2. Com base no índice armazenado que associa funções a permissões, calcule as diferenças em relação à lista recuperada.

3. Executar o patch a partir do ficheiro diff.

4. Caso surjam problemas, lance uma exceção para que o problema seja registado e seja tentada uma nova sincronização mais tarde.



Eis um exemplo da chamada «Keto API» utilizada para atribuir permissões a funções.
::: dica Exemplo: Atribuir permissão/privilégio a uma função no Ory Keto
PATCH /relation-tuples HTTP/1.1
Content-Type: application/json
Accept: application/json
:::

```json
[
  {
  "action": "insert",
  "relation_tuple": {
    "namespace": "permission",
    "object": "permissionIdentifier",
    "relation": "granted",
    "subject": "role:x#member"
  }
  }
]
```
Em caso de sucesso, é devolvida uma mensagem HTTP 204 sem conteúdo.

::: dica NOTA

Na nossa implementação atual, utilizamos o `"granted"` em vez do `"relation"`.

Utilizamos o valor `PATCH` em vez de `PUT`, uma vez que o valor `PATCH` corresponde a uma criação e/ou eliminação em massa.

:::

### Adicionar permissões mutuamente exclusivas ao Keto

Os conjuntos de permissões mutuamente exclusivos são igualmente mantidos e modelados no Keto através da relação «excludes».

As relações que ligam duas autorizações que não podem ser detidas em simultâneo são representadas por tuplas de exclusão:

```
“permission:X excludes permission:Y#allowed”
```

::: dica NOTA

Utilizamos o `"excludes"` como o `"relation"` para definir permissões mutuamente exclusivas.

:::

### Chamada ao serviço padrão «Keto API» para verificar a autorização

A verificação de se um utilizador possui autorização para um privilégio ou permissão é gerida pelo gateway «API» e, se necessário, pode ser efetuada por cada contexto delimitado.


Eis um exemplo da chamada Keto API utilizada para verificar a autorização de um utilizador com base numa permissão/privilégio.
::: dica Exemplo: Verificação da autorização no Ory Keto
POST /check HTTP/1.1
Content-Type: application/json
Accept: application/json
:::
```json
{
  "namespace": "permission",
  "object": "PermissionIdentifier",
  "relation": "granted",
  "subject": "UserIdentifier"
}
```
Eis a resposta que recebemos:
```json
{
"allowed": true/false
}
```
::: dica Nota:

As autorizações mutuamente exclusivas não precisam de ser verificadas explicitamente através de uma chamada Keto, uma vez que o sistema está configurado de forma a que as atribuições de funções e autorizações só possam ser definidas se não forem violados conjuntos de autorizações mutuamente exclusivos.

:::

## Ory Oathkeeper – pormenores de implementação

### Configurar o Ory Oathkeeper para o BizOps


[O ORY Oathkeeper](https://www.ory.sh/oathkeeper/docs/next/) autoriza os pedidos HTTP recebidos. Pode funcionar como o Ponto de Aplicação de Políticas na sua arquitetura na nuvem, ou seja, um proxy reverso à frente do seu servidor a montante API ou servidor web, que rejeita os pedidos não autorizados e reencaminha os autorizados para o seu servidor. Caso pretenda utilizar outro API Gateway (Kong, Nginx, Envoy, AWS API Gateway, entre outros), o Ory Oathkeeper também pode integrar-se nesse sistema e funcionar como o seu Ponto de Decisão de Políticas.


O gráfico Ory Oathkeeper Helm é descrito em [Gráfico ORY Oathkeeper Helm | k8s](https://k8s.ory.sh/helm/oathkeeper.html) e definido em [k8s/helm/charts/oathkeeper no master · ory/k8s · GitHub](https://github.com/ory/k8s/tree/master/helm/charts/oathkeeper). O repositório Ory Helm está documentado em [ORY Helm Charts | k8s](https://k8s.ory.sh/helm/). A referência de configuração do Ory Oathkeeper encontra-se em [Configuration | ORY Oathkeeper](https://www.ory.sh/oathkeeper/docs/reference/configuration), mas tenha em atenção que os valores do chart Helm apresentam formas diferentes de realizar determinadas tarefas. Além disso, todos os valores de configuração podem ser substituídos por variáveis de ambiente. 


The Ory Oathkeeper deployment Helm deploys two key components into Kubernetes: the Ory Oathkeeper itself and the Ory Oathkeeper Maester. The Ory Oathkeeper does not maintain state and is configured, reloading itself continuously with zero downtime, whenever the configuration is altered. O Ory Oathkeeper Maester é um controlador para o CRD «Rule» e agrupa os objetos «Rule» em Kubernetes num único ficheiro de regras completo, que é carregado pelo Ory Oathkeeper.  Por predefinição, trata-se de um ConfigMap que o Ory Oathkeeper monta, mas também pode ser configurado para funcionar como um sidecar e utilizar uma montagem partilhada.


O Ory Oathkeeper expõe duas portas como dois serviços. Um deles é o serviço API e o outro é o serviço Proxy. A longo prazo, iremos utilizar o serviço API, que será consultado pelo Gateway de API.ª geração utilizando a Decisão de Controlo de Acesso API  (ver [REST 5 API | ORY Oathkeeper](https://www.ory.sh/oathkeeper/docs/reference/api/#access-control-decision-api) ) fornecida pelo Ory Oathkeeper, mas, por enquanto, iremos utilizar o serviço Proxy e expô-lo através do Ingress. Os URLs externos para serviços protegidos pelo Ory Oathkeeper serão direcionados para o Ingress do Proxy do Ory Oathkeeper, que, por sua vez, encaminhará o acesso aos serviços internos nesses URLs e aplicará as regras de controlo de acesso.


O Ory Oathkeeper será configurado para gerar e assinar um Web Token JSON (JWT) contendo reivindicações que os serviços internos podem verificar e validar, apontando para o Conjunto de Chaves Web JSON (JWKS) que o Ory Oathkeeper irá publicar (o que faz parte da configuração) no endereço bem conhecido URL para o JWKS no serviço API (ver [REST API 6 | ORY Oathkeeper](https://www.ory.sh/oathkeeper/docs/reference/api/#lists-cryptographic-keys)). Se um serviço proceder desta forma, estará a operar sob um regime básico de confiança zero, uma vez que não será possível aceder a esse serviço, a não ser com um token que tenha sido gerado pelo Ory Oathkeeper, e o Ory Oathkeeper só gerará um token se as regras de acesso para o determinado URL permitirem o acesso.



### Depuração

As respostas e os registos do Ory Oathkeeper costumam ser bastante informativos, por isso comece por aí. Certifique-se de que está a consultar os registos relativos ao pedido em questão. O Ory Oathkeeper também registará verificações de integridade e outros dados semelhantes. 



Algumas ações de depuração que se revelaram úteis em diversas circunstâncias:


* Torne a correspondência muito mais flexível (substituir toda a sequência que começa por `<.*>` e que tenha, em seguida, o sufixo mínimo atualmente único é uma boa opção).


* Verifique novamente se cada URL interno corresponde ao URL interno correto, verificando se é acessível no interior do cluster através do curl.


* Consulte os registos do fornecedor de identidade (IdP).


* Certifique-se de que os domínios e as portas para a introspecção e o endpoint do token externo são idênticos. Pelo menos o Keycloak não aceita que sejam diferentes.


* Defina a regra do Ory Oathkeeper para https://httpbin.org/; normalmente, o prefixo do caminho `/anything`, que irá refletir tudo o que receber, facilitando a identificação do que o serviço irá receber.



### Componentes necessários para além de um gráfico «Helm»


Para além do gráfico «Helm», serão necessárias as seguintes peças:

* um segredo JWKS

* valores «Helm» anotados



#### Segredo do JWKS



Deve ser criado um segredo com a chave `mutator.id_token.jwks.json` e o valor de um JWKS adequado para utilização com o Ory Oathkeeper. É possível gerar um segredo inicial conforme descrito em [Configurar e Deployar | ORY Oathkeeper](https://www.ory.sh/oathkeeper/docs/configure-deploy#cryptographic-keys)]. Este conterá tanto a chave pública como a chave privada.


##### Utilização do segredo JWKS



Para rodar a chave secreta, siga o procedimento seguinte:

0. Tome nota da hora.

1. Adicione um par de chaves pública e privada ao início da matriz no JWKS (certifique-se de que todas as JWKs públicas têm um valor único de `kid` especificado) no segredo. Todas as chaves, com exceção das novas chaves e das primeiras chaves pública e privada anteriores, podem ser removidas. Isto deve-se ao facto de o Ory Oathkeeper assinar sempre com a primeira chave.

2. Aguarde até que todos os pedidos que o Ory Oathkeeper possa ter recebido e autorizado tenham tido o seu valor «JWT» processado pelo serviço de backend. O principal atraso aqui é o tempo necessário para que a atualização do segredo se propague, incluindo o atraso do gestor de segredos até ao segredo atualizado e o atraso do segredo até ao volume atualizado, o que provavelmente não ultrapassa um ou dois minutos; por isso, aguarde esse tempo após o momento indicado no passo 0.

3. Se o antigo segredo estiver a ser removido (isto só é necessário se houver suspeita de uma violação; caso contrário, o passo 1 é suficiente para a rotação periódica de chaves), remova-o agora.


#### Valores «Helm» anotados



Será necessário alterar vários pontos para os URLs específicos do resto do deployment ou para outros valores. Esses pontos estão descritos nos comentários do exemplo abaixo, bem como noutras observações.

A forma de configurar o Ingress do proxy ainda não está definida neste momento, uma vez que terá de ser alterada quando a solução for adicionada ao IaC 3.xxx; por isso, essa parte da configuração ainda não está especificada. Isto faz com que o Ingress fique desativado por predefinição. Alterar o valor de `ingress.proxy.enabled` para `true` ativará o Ingress do proxy. Consulte as páginas indicadas no início para conhecer as opções disponíveis para a configuração de entrada integrada.

Caso seja necessário terminar a TLS no Ory Oathkeeper, consulte as secções `tls` na [documentação de configuração](https://www.ory.sh/oathkeeper/docs/reference/configuration) e combine essa informação com os segredos e os valores `deployment.extraVolumes` e `deployment.extraVolumeMounts`.
O valor Prometheus está definido como `:9000/metrics` por predefinição, caso esteja a ser utilizado.


```yaml

oathkeeper:
  config:
    log:
    # the maximum log level, we'll stick here or maybe debug if this is overwhelming until the config is verified
    # then, we'll determine what log level to set based on needs
    level: trace
    access_rules:
      matching_strategy: regexp
    authenticators:
      cookie_session:
        enabled: true
        config:
          # this should be the internal URL of the public Kratos service's whoami endpoint, which might look like the below
          check_session_url: http://kratos-public/sessions/whoami
          preserve_path: true
          # this means we automatically sweep up all the metadata kratos provides for use
          # in, for example, the JWT, if we ever have more
          extra_from: "@this"
          # kratos will be configured to put the subject from the IdP here
          subject_from: "identity.id"
          only:
          - ory_kratos_session
      oauth2_introspection:
        enabled: true
        config:
          introspection_url: https://whatever/the/wso2/url/is/oauth2/introspect
          introspection_request_headers:
          # see https://is.docs.wso2.com/en/latest/learn/invoke-the-oauth-introspection-endpoint/ for what credentials
          # will need to be configured here
          # also, this does not seem to be settable via environment variable, which means it is 
          authorization: "Basic SOME WORKING AUTH HERE"
          cache:
            # disabled to make debugging easier. enable for caching.
            enabled: false
            ttl: "60s"
    authorizers:
      remote_json:
        enabled: true
        config:
          # the check URL for Keto. This will be POST'd to. See https://www.ory.sh/keto/docs/reference/rest-api#operation/postCheck
          remote: http://internal-keto-url-here/check
    mutators:
      id_token:
        enabled: true
        config:
          # this should be the internal base URL for the API service, which will look something like the below
          issuer_url: http://whatever-oathkeeper-internal-is-api:4456/
    errors:
      fallback:
        - json
      handlers:
        json:
        # this gives API clients pretty error JSON
        enabled: true
        config:
          verbose: true
          redirect:
        enabled: true
        config:
          # set this to whatever the main URL is, it'll ensure that browser errors redirect there
          to: https://whatever-external-main-url-is/
          when:
          - error:
            - unauthorized
            - forbidden
            request: 
            header:
              accept:
              - text/html
secret:
  # without this we would need to put the JWKS in the config, which would mean we couldn't rotate it just by changing the secret
  manage: false
  # change to whatever is used for secret name
  name: oathkeeper-jwks
deployment:
  extraEnv:
    # for whatever reason this environment variable only gets set if the JWKS is in the config even though the rest of the secret mounting
    # and such still happens
    - name: MUTATORS_ID_TOKEN_CONFIG_JWKS_URL
    value: file:///etc/secrets/mutator.id_token.jwks.json


```

### Regras


Será necessário criar recursos de regra no Kubernetes para cada «correspondência» do backend (URL expressão regular mais HTTP método(s)) protegida por uma permissão. O exemplo apresentado abaixo serve de orientação.


À medida que aumenta a flexibilidade para definir serviços de terceiros e contextos delimitados, estes podem definir as suas próprias regras (talvez através de um indicador de valores Helm), que especificam quais as autorizações que devem ser exigidas para cada URL. 


O maior problema potencial aqui é que cada correspondência TEM de ser única. Se um pedido corresponder a várias, o Ory Oathkeeper irá apresentar um erro. Assim que for escolhido um padrão geral que resulte em expressões regulares únicas, isto não acontecerá, a não ser em caso de erro do utilizador.

```yaml

apiVersion: oathkeeper.ory.sh/v1alpha1
kind: Rule
metadata:
  name: a-unique-name
spec:
  version: v0.36.0-beta.4
  upstream:
    # set to whatever URL this request should be forwarded to
    url: http://internal-url-of-backend-service/
  match:
    # this might need to be http even if external is https, it depends on how ingress does things
    # my recommendation is to have a given prefix, then the "everything else in the domain name" matcher
    # so it doesn't need to be changed when the config is moved between various main domains
    # then whatever is needed for the specific path (this is set to match all subpaths)
    # regexes go in between angle brackets
    url: https://example.<[^/]*>/<.*>
    methods:
    # whatever method(s) this rule applies to
    - GET
  authenticators:
    - handler: oauth2_introspection
    # comment out this second one to not allow browser-cookie access
    - handler: cookie_session
  authorizer:
    handler: remote_json
    config:
      # these will generally be identical for all rules,
      # except "object" will be changed to the permission ID that is relevant for
      # this URL
      payload: |
      {
        "namespace": "permission",
        "object": "PERMISSION IDENTIFIER HERE",
        "relation": "granted",
        "subject_id": "{{ print .Subject }}"
      }
  mutators:
    # change this to an empty array if the id_token isn't needed, if you want
    - handler: id_token

```
### Configurar o Ory Oathkeeper para utilizar o Kratos como o seu autenticador de cookies

Esta parte da configuração acima é aplicável. A documentação de referência relativa aos autenticadores Ory Oathkeeper encontra-se [aqui](https://www.ory.sh/oathkeeper/docs/next/pipeline/authn).


```yaml
    authenticators:
      cookie_session:
        enabled: true
        config:
          # this should be the internal URL of the public Kratos service's whoami endpoint, which might look like the below
          check_session_url: http://kratos-public/sessions/whoami
          preserve_path: true
          # this means we automatically sweep up all the metadata kratos provides for use
          # in, for example, the JWT, if we ever have more
          extra_from: "@this"
          # kratos will be configured to put the subject from the IdP here
          subject_from: "identity.id"
          only:
          - ory_kratos_session

```

### Configurar o Ory Oathkeeper para utilizar o WSO2 ISKM para a introspecção de tokens

A documentação de referência encontra-se [aqui](https://www.ory.sh/oathkeeper/docs/next/pipeline/authn).


```yaml
      oauth2_introspection:
        enabled: true
        config:
          introspection_url: https://whatever/the/wso2/url/is/oauth2/introspect
          introspection_request_headers:
          # see https://is.docs.wso2.com/en/latest/learn/invoke-the-oauth-introspection-endpoint/ for what credentials
          # will need to be configured here
          # also, this does not seem to be settable via environment variable, which means it is 
          authorization: "Basic SOME WORKING AUTH HERE"
          cache:
            # disabled to make debugging easier. enable for caching.
            enabled: false
            ttl: "60s"
```

### Configurar o Ory Oathkeeper para utilizar o Ory Keto como autorizador

Esta parte da configuração acima é aplicável.

A documentação de referência sobre os autorizadores Ory Oathkeeper encontra-se [aqui](https://www.ory.sh/oathkeeper/docs/next/pipeline/authz).


```yaml
    authorizers:
      remote_json:
        enabled: true
        config:
          # the check URL for Keto. This will be POST'd to. See https://www.ory.sh/keto/docs/reference/rest-api#operation/postCheck
          remote: http://internal-keto-url-here/check

```

## Ory Kratos – pormenores de implementação


O Ory Kratos é a componente do conjunto de ferramentas Ory Implementation que gere todos os fluxos de autenticação.
É altamente configurável e pode ligar-se a uma variedade e a múltiplos sistemas e fluxos de autenticação. A [Documentação do Kratos](https://www.ory.sh/kratos/docs/next/) explica bem o âmbito da configuração. Ou seja, é provável que satisfaça os seus requisitos.
Neste projeto de workstream, apenas os fluxos de início e fim de sessão do utilizador são necessários e foram implementados. 
É útil saber que o Kratos também pode fornecer fluxos para: 
- **Início de sessão e registo self-service:** Permitem que os utilizadores finais criem e iniciem sessão em contas (a que chamamos «identidades») utilizando combinações de nome de utilizador/e-mail e palavra-passe, início de sessão através de redes sociais («Iniciar sessão com o Google, GitHub»), fluxos sem palavra-passe e outros.
- **Autenticação multifator (MFA/2FA):** É permitido o uso de protocolos como o TOTP (RFC 6238 e IETF RFC 4226 — mais conhecido como Google Authenticator)
- **Verificação de conta:** Verifique se um endereço de e-mail, número de telefone ou endereço físico pertence efetivamente a essa identidade.
- **Recuperação de conta:** Recupere o acesso através de fluxos do tipo «Esqueci-me da palavra-passe», códigos de segurança (em caso de perda do dispositivo de MFA), etc.
- **Gestão de perfis e contas:** Atualizar palavras-passe, dados pessoais, endereços de e-mail e perfis sociais associados através de fluxos seguros.
- **APIs de administração:** Importar, atualizar e eliminar identidades.
... que poderão vir a ser importantes em futuras versões dos projetos de deployment de IaC.


### Detalhes do deployment

O Kratos Helm Chart é descrito em [ORY Kratos Helm Chart | k8s](https://k8s.ory.sh/helm/kratos.html) e definido em [k8s/helm/charts/kratos at master · ory/k8s · GitHub](https://github.com/ory/k8s/tree/master/helm/charts/kratos). Ao contrário do Ory Oathkeeper, não possui qualquer Maester associado responsável por um CRD. No entanto, necessita de uma base de dados (que pode ser MySQL, PostgreSQL, CockroachDB ou algumas outras). O repositório Helm é o mesmo que o do Ory Oathkeeper e está documentado em [ORY Helm Charts | k8s](https://k8s.ory.sh/helm/). Encontra-se uma referência de configuração em [Configuration | Ory Kratos](https://www.ory.sh/kratos/docs/reference/configuration), mas tenha em atenção que o Helm chart funciona de forma ligeiramente diferente.



Para além de uma base de dados, a outra grande diferença no caso do Kratos é que este requer uma interface de utilizador, sob a forma de uma pequena aplicação web que se encarrega de apresentar no navegador o estado atual do que está a acontecer com o Kratos e também de efetuar a comunicação de backend necessária para que isso ocorra de forma segura. No nosso caso, a interface de utilizador que iremos utilizar é muito simples e nunca chega a ser visível — a única função que desempenha é reencaminhar imediatamente para o único Provedor de Identidade (IdP) OIDC que tivermos configurado e receber o callback correspondente. Esta aplicação de interface de utilizador já foi criada e disponibilizada como código aberto no repositório `modusbox`, e realiza releases de imagens Docker públicas no registo Docker GitHub. A interface de utilizador pode ser encontrada em [GitHub - modusbox/kratos-ui-oidcer: Uma interface de utilizador do Kratos para reencaminhar imediatamente para um único provedor OIDC configurado](https://github.com/modusbox/kratos-ui-oidcer), e é uma aplicação Rust muito minimalista com excelente cobertura de testes e uma imagem Docker minúscula (cerca de 5 megabytes, https://github.com/modusbox/kratos-ui-oidcer/pkgs/container/oidcer ). É referida como «Shim» na documentação de conceção acima referida.

Para facilitar a hospedagem, o Kratos e a interface de utilizador devem ser montados em percursos distintos no mesmo domínio que a interface de utilizador principal. Em alternativa, é possível configurá-los num domínio diferente e configurar o Kratos para utilizar cookies entre domínios. O presente documento foi redigido partindo do pressuposto de que se opta pela estratégia do mesmo domínio.

### Ligar-se à interface de utilizador principal

É necessário criar um cliente no IdP que permita concessões de código de autorização OIDC. Este cliente deve ser configurado para redirecionar para qualquer «URL» na interface de utilizador principal, caso esta suporte caracteres curinga, ou para o «URL» específico para o caminho «`/kratos/self-service/methods/oidc/callback/idp`» (note-se que o último segmento, «`idp`», corresponde ao ID do fornecedor na configuração, pelo que ambos devem ser alterados em conjunto). Este cliente será utilizado na configuração dos valores do gráfico Helm.


Para estabelecer uma ligação com sucesso ao Kratos, a interface de utilizador principal deve funcionar da seguinte forma:

1. Efetue uma solicitação que inclua cookies para o `/kratos/sessions/whoami` (documentado em [HTTP API Documentação | Ory Kratos](https://www.ory.sh/kratos/docs/reference/api/#operation/toSession)), que devolve um código 200 e um objeto contendo metadados do utilizador, caso este esteja com sessão iniciada, ou um código 401, caso não esteja.

2. Se o utilizador não estiver autenticado, reencaminhe-o imediatamente para `/kratos/self-service/registration/browser` ou forneça-lhe um link para essa página. Nota: o número `registration` no URL não é um erro tipográfico. Refere-se ao registo no Kratos, o que os utilizadores do IdP não terão inicialmente. Se o utilizador já existir, o Kratos seguirá automaticamente o fluxo de autenticação.

3. Para terminar a sessão, associe o utilizador ao número `/kratos/self-service/browser/flows/logout`


### Valores «Helm» anotados

Esta configuração pressupõe que o nome do deployment do Helm é `kratos`, que o serviço Kratos está acessível no porto `/kratos/` no mesmo domínio que a interface de utilizador principal e que a interface de utilizador do Kratos está acessível no porto `/auth/` no mesmo domínio que a interface de utilizador principal.


O gráfico «Helm» permite, de facto, a criação de ingressos, mas tal não está descrito na documentação.

```yaml
deployment:
  extraVolumes:
  - name: extra-config
    configMap:
      name: kratos-extra-config
  extraVolumeMounts:
  - name: extra-config
    mountPath: /etc/config2
    readOnly: true
kratos:
  # NOTE: helm chart deployment does not seem to automatically pick up
  # on changes here
  identitySchemas:
    # TODO note the domain to be replaced in $id, the url doesn't need to resolve
    "identity.schema.json": |
      {
        "$id": "http://REPLACE_THIS_WITH_SOME_MEANINGFUL_DOMAIN/schema/user",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "A user",
        "type": "object",
        "properties": {
          "traits": {
            "type": "object",
            "properties": {
              "email": {
                "title": "E-Mail",
                "type": "string",
                "format": "email"
              },
              "subject": {
                "title": "Subject",
                "type": "string"
              },
              "name": {
                "title": "Name",
                "type": "string"
              }
            }
          }
        }
      }
  config:
    identity:
      default_schema_url: file:///etc/config/identity.schema.json
    courier:
      smtp:
        connection_uri: smtp://unused/
    # TODO the appropriate database DSN needs to go here, or be wired up via a secret and the environment variable `DSN`
    dsn: TODO DATABASE DSN HERE
    hashers:
      argon2:
        parallelism: 1
        iterations: 3
        # add resources and increase this amount,
        # if using passwords (vs oidc) in a production context
        memory: 17000
        salt_length: 16
        key_length: 32
    log:
      # TODO adjust after successful setup, likely down to info
      level: trace
    selfservice:
      flows:
        registration:
          # TODO if the place the UI goes changes, this needs to change
          ui_url: /auth/
          after:
            oidc:
              hooks:
              - hook: session
        logout:
          after:
            # TODO the IdP's logout URL should go here, with a redirect encoded into it if that's supported (might not work the same way, this is just an example)
            default_browser_return_url: https://idp.logout.url.here/logout/path?redirect_uri=https%3A%2F%2Fsomewhere.example.com%2F
      methods:
        oidc:
          enabled: true
          config:
            providers:
            - id: idp
              provider: generic
              # TODO both the client_id and client_secret need to be set appropriately to the client supporting authorization code grants with openid
              # TODO these can alternatively be set via environment variable from a k8s secret
              client_id: TODO
              client_secret: TODO
              mapper_url: file:///etc/config2/oidc.jsonnet
              # TODO this should be the right IdP URL to perform OIDC discovery on
              # If the IdP does not support discovery, auth_url and token_url can be set here instead
              # some IdPs may also need a requested_claims, see Kratos config documentation if there seems to be an issue
              issuer_url: https://some.public.idp.url.supporting.discovery/might/have/path/
              scope:
              # TODO adjust requested scope based on IdP (WSO2) documentation
              - openid
        password:
          enabled: false
      # TODO set this to the base URL of the main UI
      default_browser_return_url: "https://somewhere.example.com/"
    serve:
      public:
        # TODO set this to the base URL of the main UI plus the `/kratos` path, will need to be updated if the same-domain approach is not used
        base_url: "https://somewhere.example.com/kratos"
  autoMigrate: true
```
### ConfigMap do JSonnet

Nos valores de Kratos Helm, é feita referência a um ConfigMap `kratos-extra-config` que contém o JSonnet (uma linguagem de configuração) que define como transformar as reivindicações do IdP naquilo que o Kratos armazena sobre a pessoa. Esse ConfigMap deve conter uma chave `oidc.jsonnet` com o seguinte conteúdo:


```javascript
local claims = std.extVar('claims');

{
  identity: {
    traits: {
      email: claims.email,
      name: claims.name,
      subject: claims.sub
    },
  },
}
```

O endereço de e-mail e o assunto provavelmente nunca terão de ser alterados, mas, no caso de alguns IdPs, o nome poderá ser indicado de forma diferente; nesse caso, essa parte do JSonnet terá de ser atualizada. As chaves dentro de «`traits`» são basicamente arbitrárias (embora «`subject`» tenha algumas dependências noutros locais que teriam de ser atualizadas), desde que também sejam atualizadas no esquema da configuração; no entanto, os valores estão restritos à lista de reivindicações prováveis dentro de um token de identificação OIDC e estão descritos na documentação do Kratos. É provável que esta situação não venha a ocorrer.

### Deployment e Serviço da Interface do Utilizador

O serviço terá também de estar disponível num caminho adequado — a configuração pressupõe o valor `/auth/` —, no mesmo domínio que a interface de utilizador principal.


```yaml
---
apiVersion: v1
kind: Service
metadata:
  name: kratos-ui
  labels:
    app: kratos-ui
spec:
  ports:
  - name: http
    port: 80
    targetPort: http
  selector:
    app: kratos-ui

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kratos-ui
  labels:
    app: kratos-ui
spec:
  replicas: 1
  selector:
    matchLabels:
      app: kratos-ui
  template:
    metadata:
      labels:
        app: kratos-ui
    spec:
      containers:
      - name: kratos-ui
        image: ghcr.io/modusbox/oidcer:latest
        env:
        - name: ROCKET_PORT
          value: "80"
        - name: ROCKET_REGISTRATION_ENDPOINT
          # TODO if the kratos helm chart is given a different name than kratos,
          # the domain will be different here, it should be the domain of the kratos service
          value: http://kratos-public/self-service/registration/flows
        ports:
        - name: http
          containerPort: 80
        readinessProbe:
          httpGet:
            path: /healthz
            port: 80
```
### Links de referência sobre Ory

- **Configuração de sessões de início de sessão.** [documentação aqui](https://www.ory.sh/kratos/docs/guides/login-session)

- **Configuração de cookies de sessão.** Detalhes sobre os cookies de sessão [documentação aqui](https://www.ory.sh/kratos/docs/guides/configuring-cookies)

- **Configurar o Kratos para CORS.** [documentação aqui](https://www.ory.sh/kratos/docs/guides/setting-up-cors)

- **Ory Kratos - Integração com o Ory Oathkeeper (OIDC).** [Documentação do Kratos aqui](https://www.ory.sh/kratos/docs/guides/zero-trust-iap-proxy-identity-access-proxy)

- **Ory Kratos - Integração WSO2 OIDC.** [documentação aqui](https://www.ory.sh/kratos/docs/guides/sign-in-with-github-google-facebook-linkedin)




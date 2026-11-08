---
i18n_source_sha: bb7db5ef33650b91e40009b9769b355891fa1abf
---

# Pragmatic REST

## Pragmatic REST para o projeto Mojaloop

Com o aparecimento da estratégia de APIs como ferramenta de escala para negócios de serviços de Internet, o foco na tecnologia de interligação deslocou-se. Assentando nos princípios que permitiram à Web formar-se e escalar, o REST \(Representational State Transfer\) tornou-se uma preferência de desenho para as APIs de serviços de Internet. Mas, embora os princípios REST, propostos na dissertação de Roy Fielding que os definiu, tenham valor académico como base de investigação, um desenho REST puro não é, atualmente, prático para a maioria das aplicações. Defendemos uma espécie de Pragmatic REST — um padrão de desenho que adota as componentes benéficas do desenho RESTful sem exigir a adesão estrita à pureza académica.

### O Richardson Maturity Model

Martin Fowler referiu um modelo estruturado de adoção RESTful desenvolvido por Leonard Richardson e [explicado](http://www.crummy.com/writing/speaking/2008-QCon/act3.html) numa palestra da QCon. Fowler refere-se a este como o Richardson Maturity Model do desenho RESTful.

<!-- ![](../../../community/tools/assets/diagrams/rest/glory-of-rest.png) -->

Martin Fowler, referenciando [Rest in Practice](https://www.amazon.com/gp/product/0596805829?ie=UTF8&tag=martinfowlerc-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0596805829),2 resume a génese do desenho RESTful:

> use Restful web services to handle many of the integration problems that enterprises face. At its heart . . . is the notion that the web is an existence proof of a massively scalable distributed system that works really well, and we can take ideas from that to build integrated systems more easily.

Uma abordagem pragmática ao desenho RESTful utiliza as melhores partes da estrutura conceptual de Fielding para permitir que desenvolvedores e integradores compreendam o que podem fazer com a API o mais rapidamente possível e sem escrever código supérfluo.

No seu nível mais fundamental, um desenho RESTful é centrado em recursos e utiliza verbos HTTP. No seu nível mais avançado, um desenho que segue o REST académico puro utiliza o princípio HATEOAS, implementando Hypermedia Controls. Defendemos um desenho RESTful de Nível 2 para o Mojaloop.

### Porque não Hypermedia Controls?

Ainda que o HATEOAS seja um princípio fascinante — defende que um servidor deve responder a cada ação do cliente com uma lista de todas as ações possíveis que podem levar o cliente ao seu estado de aplicação seguinte. E, mais ainda, os clientes _não devem_ depender de informação fora de banda \(como uma especificação de API escrita\) quanto às ações que podem ser executadas sobre que recursos ou quanto ao formato dos URIs.

É esta última proscrição que falha o teste do Pragmatic REST: embora o HATEOAS seja uma abordagem teórica interessante para limitar o acoplamento, não se aplica facilmente ao Mojaloop \(ou a qualquer outro desenho de API contratual\). Quando tomamos em conta o nosso público para as APIs de interligação, encontramos um grupo de entidades comerciais que operarão sob um conjunto de regras de scheme altamente específicas. As interações entre os participantes, e entre participante e hub de serviço central, serão altamente especificadas para atribuir um risco comercial aceitável que possa ser tarifado a um custo muito baixo para os utilizadores finais. Isto exige previsibilidade _ex-ante_ da API, o que é um anátema para o princípio HATEOAS definido por Fielding.

### Princípios do Pragmatic RESTful

#### Os URIs definem recursos

Um padrão de URI bem desenhado torna uma API fácil de consumir, descobrir e ampliar, tal como acontece com uma API cuidadosamente desenhada numa linguagem de programação tradicional. O REST puro desdenha este princípio em favor do HATEOAS. Mas o REST pragmático segue um padrão normal para as definições de URI, para melhorar a compreensão humana, mesmo que os princípios HATEOAS sejam empregados para a descoberta.

Os caminhos de URI que se referem a uma coleção de objetos devem consistir num substantivo no plural, por exemplo /customers, para se referir a um conjunto de clientes. Quando uma coleção só pode ter uma instância, deve usar-se o substantivo no singular para evitar confusão. Por exemplo, GET /transfers/:id/fulfillment é correto, dado que existe apenas um objeto fulfillment por transferência identificada.

Os caminhos de URI que se referem a um único objeto devem consistir num substantivo no plural \(representando a coleção\), seguido de um identificador único predefinido. Por exemplo, /customers/123456 para se referir ao cliente específico com o número 123456. O identificador tem de ser único dentro da coleção que o contém e persistir durante o tempo de vida do objeto dentro dessa coleção. Os IDs não devem ser valores ordinais — a obtenção ordinal de objetos de uma coleção é possível utilizando parâmetros de query no URI da coleção.

Os caminhos de URI podem ter um prefixo para identificar o ambiente, a versão ou outro contexto do recurso. Nada deve seguir-se ao caminho identificador a não ser coleções e referências a objetos.

Os identificadores dos segmentos de caminho e de query do URI devem ser escolhidos do conjunto de caracteres romanos, \[0-9A-Za-z\]. Use _camelCase_ para definir os elementos do caminho do URI. Não use snake\_case.

Para evitar dúvidas, "\_" \(underscore\) e "-" \(hífen\) não devem ser utilizados nos identificadores dos segmentos de caminho ou de query do URI.

Isto provavelmente parece um pouco paroquial. O objetivo é encontrar um formato de URI bem definido que seja consistente com a prática generalizada, fácil de definir, previsível, e que se mapeie em ambientes e convenções nativos. Não vai satisfazer todos. Eis o raciocínio por trás desta restrição:

CapitalCase e camelCase são a norma de facto para NodeJS e JavaScript e são uma restrição comum na definição de URIs: os segmentos de caminho dos URIs são frequentemente mapeados em recursos internos de JS, pelo que conformar-se às convenções de nomenclatura de JS faz sentido.

Os nomes dos campos em JSON e SQL devem também seguir esta convenção, uma vez que são frequentemente mapeados automaticamente no espaço de nomes de variáveis e podem ser referenciados em URIs como identificadores de segmentos de caminho ou de query.

Devemos também evitar o uso de "$", a não ser que seja exigido por uma biblioteca \(por exemplo, JQuery\). O IBM JCL já desapareceu; deixemo-lo descansar em paz. Há melhores ferramentas de controlo de âmbito para separar espaços de nomes do que introduzir símbolos não romanos.

Devemos evitar "-" \(hífen\) nos nomes dos segmentos de caminho e dos parâmetros de query, pois não se mapeia em nomes de variáveis, nem em identificadores de nomes de campos de SQL ou JSON.

Os caracteres underscore têm de ser escapados no código markdown, prefixando cada um com um caractere "\".

Foi reportado que o snake\_case é ligeiramente mais fácil de ler do que o camelCase em nomes de variáveis, mas na verdade não melhora a legibilidade dos URIs, pois interfere visualmente com os delimitadores dos segmentos de caminho e de query, dificultando a sua análise visual. E quando os URIs aparecem sublinhados na apresentação, os underscores tornam-se ilegíveis.

#### Parâmetros de URI

Use um conjunto padrão e previsível de parâmetros opcionais de forma consistente.

Deve usar-se um conjunto de parâmetros de query padrão para as coleções, para permitir ao chamador controlar quanto da coleção vê. Por exemplo, "count" para determinar quantos objetos devolver, "start" para determinar onde começar a contar no conjunto de resultados, e "q" como query de pesquisa genérica em formato livre. Definiremos o conjunto padrão de parâmetros à medida que avançamos e aplicá-los-emos de forma consistente.

#### Verbos

Os objetos singulares devem suportar GET para leitura, PUT para substituição completa \(ou criação, quando a chave primária é especificada pelo cliente e é persistente, por exemplo o PAN de um cartão de pagamento\), e DELETE para eliminação.

As coleções devem suportar GET para ler de volta a totalidade ou parte de uma coleção, e POST para adicionar um novo objeto à coleção.

Os objetos singulares podem suportar POST como forma de alterar o seu estado de maneiras especificadas. Fazer POST de um documento JSON para o URI de um objeto singular pode permitir que valores de campos selecionados sejam atualizados ou acionar uma mudança de estado ou uma ação sem substituir o objeto completo.

O GET tem de ser implementado de forma _nulipotente_ — isto é, o GET nunca causa efeitos secundários e nunca modifica o estado do sistema visível ao cliente \(a não ser, por exemplo, registar eventos ou atualizar a instrumentação\).

O PUT e o DELETE têm de ser implementados de forma _idempotente_ — isto é, as alterações são aplicadas de forma consistente aos dados do sistema de um modo que depende apenas do estado do recurso e das entradas, e de nada mais. A ação não tem efeito adicional se for executada mais do que uma vez com os mesmos parâmetros de entrada e não depende da ordem de outras operações sobre uma coleção que a contenha ou sobre outros recursos contidos na coleção. Por exemplo, remover um recurso de uma coleção pode ser considerado uma operação idempotente sobre a coleção. Usar PUT para substituir \(ou criar\) integralmente um recurso identificado de forma única, quando o URI é totalmente conhecido pelo cliente, é também idempotente. Isto implica que o sistema pode reordenar operações para melhorar a eficiência, e que o cliente não precisa de saber se um recurso existe antes de tentar substituí-lo.

O POST e o PATCH3 não são operações idempotentes. O POST é usado para criar novos recursos quando o identificador do recurso é atribuído pelo servidor ou quando um único recurso interno identificado está implícito no URI de destino \(por exemplo, POST /transfers, mas PUT /transfers/:id/fulfillment\).

#### Formato dos dados

Preferimos formatos de dados relacionados com [JSON](http://json.org/)4 em vez de XML. Em alguns casos, os formatos de dados serão binários ou XML, conforme definido por normas pré-existentes, e estes serão especificados com precisão. Os formatos binários devem ter uma sintaxe formal para evitar traduções representacionais ambíguas \(por exemplo, traduções de conjuntos de caracteres, representações big-endian ou little-endian de valores numéricos, etc.\).

Os valores de data e hora usados nas APIs devem cumprir a norma ISO 8601, e ser adicionalmente perfilados pela Note do w3c sobre Date and Time Formats.5 Esta note do w3c deverá conduzir à redução da complexidade e do âmbito de erro dos componentes em comunicação que têm de trocar datas e horas tangíveis. Haverá casos em que usaremos data ou hora em formato não ISO, conforme exigido por uma norma externa, por exemplo as datas de validade da ISO 7813.

Os formatos XML padrão existentes devem ter um esquema XSD para o perfil de subconjunto aceitável usado no projeto. Para formatos de dados particularmente complexos, podemos usar um tradutor de perfis de formato comum para mapear entre o nosso subconjunto de projeto do formato padrão e o formato de transmissão usado por um protocolo normalizado \(por exemplo\). Isto limitará o acoplamento a formatos complexos de uma forma mais sustentável.

Ao especificar a ação PATCH para um recurso, usaremos um formato de documento de patch consistente \(por exemplo, [JSON Patch](http://jsonpatch.com/)6\).

#### Códigos de retorno

Use os códigos de retorno HTTP de forma consistente e de acordo com as suas definições padrão. Os códigos padrão estão definidos no RFC 2616.7

#### Formato de erro legível por máquina

A API deve fornecer um resultado de erro legível por máquina num formato JSON bem definido. {TBD se usar um envelope de resposta e como formatar erros, falhas e envelopes de sucesso. O desenho RESTful baseia-se em cabeçalhos para transportar os erros definidos pelo protocolo; a informação de debug pode também ser transportada em cabeçalhos. Devemos ser claros sobre a razão pela qual usamos um envelope e como isto suporta a comunicação normal de produção entre cliente e servidor.

#### Versionamento

Os URIs da API devem incluir um identificador de versão no formato v_M_ como elemento inicial do caminho \(onde _"M"_ é a componente Maior do número de versão multiparte\). A API e o seu elemento identificador de versão têm de estar conformes à especificação [semantic versioning](http://semver.org/)8 2.0 para o versionamento de APIs.

Um cliente tem de especificar o número da versão Maior em cada pedido. Não é possível a um cliente expressar um requisito para uma versão menor específica.

O número completo da versão da API é especificado no cabeçalho de resposta \(TBD\) para todas as respostas, de sucesso e de erro.

Embora um contrato de versão de API seja influenciado pelos níveis Maior, menor _e_ de patch, apenas o número da versão Maior é um elemento de ligação da API em produção — isto é, um cliente de produção não pode pedir uma versão menor ou um nível de patch específicos, e um servidor de produção não aceitará um pedido de URI que especifique estes elementos adicionais.

No entanto, em ambientes de pré-produção, antecipa-se que alguma combinação de sufixos de versão menor, patch, pré-lançamento e metadados seja suportada nos pedidos dos clientes \(conforme definido em _semver_ \[3\]\) e _possa_ ser expressa em URIs de _pré-produção_, para auxiliar em cenários de desenvolvimento e integração.

### Podemos ter de dar um descanso ao REST

À medida que desenhamos as APIs de interligação entre componentes e entre sistemas participantes, podemos encontrar requisitos de API que não correspondem exatamente ao padrão Pragmatic REST aqui definido. Avaliaremos estes casos um a um e faremos a melhor escolha para apoiar os objetivos do projeto.

### Requisitos não funcionais

À medida que desenvolvemos as APIs, faremos escolhas consistentes quanto aos requisitos não funcionais, para reforçar os objetivos do projeto.

1: [http://martinfowler.com/articles/richardsonMaturityModel.html](Richardson%20Maturity%20Model), consultado em 18 de agosto de 2016.

2: [https://www.amazon.com/gp/product/0596805829](https://www.amazon.com/gp/product/0596805829?ie=UTF8&tag=martinfowlerc-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0596805829), consultado em 18 de agosto de 2016.

3: RFC 5789, _PATCH Method for HTTP_, [https://tools.ietf.org/html/rfc5789](https://tools.ietf.org/html/rfc5789), consultado em 18 de agosto de 2016.

4: _Introducing JSON_, [http://json.org/](http://json.org/), consultado em 18 de agosto de 2016.

5: [http://www.w3.org/TR/1998/NOTE-datetime-19980827](http://www.w3.org/TR/1998/NOTE-datetime-19980827), consultado em 22 de agosto de 2016.

6: _JSON Patch_, [http://jsonpatch.com/](http://jsonpatch.com/), consultado em 18 de agosto de 2016.

7: [https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)

8: _Semantic Versioning 2.0.0_, [http://semver.org/](http://semver.org/), consultado em 18 de agosto de 2016.

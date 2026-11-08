---
i18n_source_sha: 5ba3111c9485c598b7cb0762998654ca3b0d506f
---

# Divulgação e receção de informação sobre vulnerabilidades de segurança

A Mojaloop Foundation e a comunidade levam muito a sério a segurança do software Mojaloop e mantêm vários
processos que se destinam a garantir que o Mojaloop é uma plataforma segura para a realização de negócios. Consulte
a nossa [documentação sobre a arquitetura de cibersegurança](../tools/cybersecurity.md) para mais informação.

A Mojaloop Foundation mantém
um processo de [«Divulgação Coordenada de Vulnerabilidades»](https://github.com/ossf/oss-vulnerability-guide/blob/main/finder-guide.md#what-is-coordinated-vulnerability-disclosure),
um modelo em que uma vulnerabilidade ou um problema descoberto só é divulgado publicamente depois de as partes responsáveis e
afetadas terem tido tempo suficiente para corrigir ou remediar o problema. Ao manter este modelo, a Mojaloop
Foundation e a comunidade procuram minimizar o potencial impacto destes problemas nos nossos adotantes.

## Política de Divulgação Coordenada de Vulnerabilidades da Mojaloop Foundation

As secções seguintes definem os requisitos e as expectativas das várias partes envolvidas na descoberta e na
remediação de vulnerabilidades de segurança no software Mojaloop. Espera-se que todos os membros da comunidade Mojaloop
cumpram estas políticas, independentemente do papel que desempenhem num dado cenário. A participação na
comunidade Mojaloop implica a aceitação e o cumprimento destas políticas.

### Terminologia

As definições seguintes aplicam-se no âmbito da Política de Divulgação Coordenada de Vulnerabilidades da Mojaloop Foundation:

#### Termos da RFC 2119

Os termos «MUST», «MUST NOT», «REQUIRED», «SHALL», «SHALL NOT», «SHOULD», «SHOULD NOT», «RECOMMENDED», «MAY» e «OPTIONAL» neste documento devem ser interpretados conforme descrito na RFC 2119.

#### Termos da ISO e do CERT

Os termos «Investigador» ou «Notificador» neste documento pretendem ser consistentes com os termos «Finder» e/ou «Reporter»
utilizados na ISO/IEC 29147:2014(E) e no CERT® Guide to Coordinated Vulnerability Disclosure.

### Política para os Notificadores

Os Notificadores DEVEM cumprir as orientações seguintes.

#### Geral

* Os Notificadores DEVEM cumprir todas as leis locais e internacionais aplicáveis no âmbito das atividades de investigação de segurança
  ou de outra participação neste programa de divulgação de vulnerabilidades.

* Os Notificadores DEVERIAM envidar um esforço de boa-fé para notificar e trabalhar diretamente com o(s) fornecedor(es) ou os prestadores de serviços afetados
  antes de divulgarem publicamente os relatórios de vulnerabilidades.

#### Âmbito dos testes autorizados

* Os Notificadores PODEM testar o software de código aberto Mojaloop para detetar uma vulnerabilidade com o único objetivo de fornecer à
  Mojaloop Foundation informação sobre essa vulnerabilidade.

* Os Notificadores DEVERIAM testar apenas contas de teste que lhes pertençam ou com a autorização explícita do titular
  da conta.

* Os Notificadores DEVEM evitar danos aos sistemas de informação e às operações da Mojaloop Foundation, dos seus associados e dos
  utilizadores do software de código aberto Mojaloop.

* Os Notificadores DEVEM envidar todos os esforços para evitar violações da privacidade, a degradação da experiência do utilizador, a perturbação de sistemas de
  produção e a destruição ou manipulação de dados.

* Os Notificadores DEVEM parar os testes assim que estes tenham estabelecido que existe uma vulnerabilidade, ou que foram
  encontrados dados sensíveis. Os dados sensíveis incluem informações de identificação pessoal, informações financeiras (por exemplo, números
  de conta), informações proprietárias ou segredos comerciais.

* Os Notificadores NÃO DEVEM testar quaisquer software ou serviços que não estejam expressamente contidos nos repositórios GitHub do software de código aberto
  Mojaloop, incluindo quaisquer serviços ligados.

* Os Notificadores NÃO DEVEM explorar qualquer vulnerabilidade para além da quantidade mínima de testes necessária para provar que a
  vulnerabilidade existe ou para identificar um indicador relacionado com essa vulnerabilidade.

* Os Notificadores NÃO DEVEM aceder intencionalmente ao conteúdo de quaisquer comunicações, dados ou informações em trânsito ou armazenados
  em sistemas de informação pertencentes à Mojaloop Foundation, aos seus associados ou aos utilizadores do software de código aberto
  Mojaloop – exceto na medida em que a informação esteja diretamente relacionada com uma vulnerabilidade e o acesso seja
  necessário para provar que a vulnerabilidade existe.

* Os Notificadores NÃO DEVEM exfiltrar quaisquer dados em circunstância alguma.

* Os Notificadores NÃO DEVEM comprometer intencionalmente a privacidade ou a segurança do pessoal, dos clientes da Mojaloop Foundation,
  do público em geral, dos utilizadores do software de código aberto Mojaloop ou de quaisquer terceiros legítimos.

* Os Notificadores NÃO DEVEM utilizar qualquer exploit para comprometer, alterar ou exfiltrar dados

* Os Notificadores NÃO DEVERIAM estabelecer acesso por linha de comandos e/ou persistência

* Os Notificadores NÃO DEVEM explorar as vulnerabilidades encontradas para passar para outros sistemas.

* Os Notificadores NÃO DEVEM comprometer intencionalmente a propriedade intelectual ou outros interesses comerciais ou financeiros de
  qualquer pessoal ou entidade da Mojaloop Foundation, clientes, público em geral, utilizadores do software de código aberto Mojaloop
  ou quaisquer terceiros legítimos.

* Os Notificadores NÃO DEVEM causar a negação de quaisquer serviços legítimos no decurso dos seus testes.

* Os Notificadores NÃO DEVEM realizar testes de acesso físico (por exemplo, acesso a escritórios, portas abertas, tailgating ou outras intrusões).

* Os Notificadores NÃO DEVEM realizar engenharia social de qualquer forma sobre o pessoal da Mojaloop Foundation, os seus contratados,
  associados ou utilizadores do software de código aberto Mojaloop, o seu pessoal, contratados ou clientes.

* Os Notificadores DEVERIAM contactar a Mojaloop Foundation por e-mail, através de [security@mojaloop.io](mailto:security@mojaloop.io), se em
  qualquer momento tiverem dúvidas sobre se devem prosseguir com os testes.

#### Coordenação com a Mojaloop Foundation

* Os Notificadores DEVERIAM submeter os relatórios de vulnerabilidades à Mojaloop Foundation através de e-mail seguro (encriptado)
  para [security@mojaloop.io](mailto:security@mojaloop.io).

* Os Notificadores DEVERIAM submeter relatórios de elevada qualidade.

* Os Notificadores DEVERIAM incluir detalhes descritivos suficientes para permitir que a Mojaloop Foundation e/ou o(s) fornecedor(es)
  afetado(s) reproduzam com exatidão o comportamento vulnerável.

* Os Notificadores NÃO DEVERIAM comunicar crash dumps ou resultados de fuzzers não analisados, a menos que acompanhados de uma
  explicação suficientemente detalhada da forma como representam uma vulnerabilidade de segurança.

* Os Notificadores DEVERIAM comunicar outras vulnerabilidades encontradas acessoriamente nos seus testes dentro do âmbito, mesmo que essas vulnerabilidades
  fossem de outra forma consideradas fora do âmbito. Por exemplo, ao testar um sistema dentro do âmbito, o notificador constata que este
  expõe dados de um sistema fora do âmbito. Estas continuam a ser vulnerabilidades passíveis de comunicação.

* Os Notificadores DEVEM manter confidencial qualquer informação sobre as vulnerabilidades descobertas durante 90 dias após terem notificado
  a Mojaloop Foundation. Não obstante, esta expectativa não impede os Notificadores de
  coordenarem simultaneamente o relatório de vulnerabilidade com outras partes afetadas (fornecedores, prestadores de serviços, coordenadores, etc.)

* Os Notificadores PODEM incluir um exploit de prova de conceito, se disponível.

* Os Notificadores PODEM pedir que os seus dados de contacto não sejam divulgados a nenhum dos fornecedores afetados.

* Os Notificadores PODEM pedir para não serem nomeados nos agradecimentos das divulgações públicas da Mojaloop Foundation.

* Os Notificadores NÃO DEVEM submeter um grande volume de relatórios de baixa qualidade.

* Os Notificadores NÃO DEVEM exigir que a Mojaloop Foundation estabeleça uma relação de cliente, um acordo de confidencialidade
  (NDA) ou qualquer outra obrigação contratual ou financeira como condição para receber ou coordenar relatórios de
  vulnerabilidades.

* Os Notificadores NÃO DEVEM exigir compensação em troca da comunicação de informação sobre vulnerabilidades comunicada fora de um
  programa de bug bounty explícito.

#### Coordenação com fornecedores

* Caso o Notificador encontre uma vulnerabilidade no software de código aberto da Mojaloop Foundation decorrente de uma
  vulnerabilidade num produto ou serviço geralmente disponível, o Notificador PODE comunicar a vulnerabilidade ao(s)
  fornecedor(es), prestador(es) de serviços ou serviço(s) de coordenação de vulnerabilidades de terceiros afetados, de forma a permitir que o produto ou
  serviço seja corrigido.

#### Coordenação com outros

* Os Notificadores PODEM recorrer aos serviços de um serviço de coordenação de terceiros (por exemplo, CERT/CC, DHS CISA) para ajudar a
  resolver quaisquer conflitos que não possam ser resolvidos entre o Notificador e a Mojaloop Foundation.

* Os Notificadores NÃO DEVERIAM divulgar quaisquer detalhes de qualquer vulnerabilidade existente do software de código aberto da Mojaloop Foundation, nem quaisquer
  indicadores de vulnerabilidade, a qualquer parte que dela não tenha já conhecimento no momento em que o relatório é submetido à Mojaloop
  Foundation.

#### Divulgação pública

* Os Notificadores PODEM divulgar ao público a existência prévia de vulnerabilidades já corrigidas pela Mojaloop Foundation,
  incluindo potencialmente detalhes da vulnerabilidade, indicadores de vulnerabilidade ou a natureza (mas não o conteúdo) da
  informação tornada acessível pela vulnerabilidade.

* Os Notificadores que optem por divulgar ao público DEVERIAM fazê-lo em consulta com a Mojaloop Foundation.

* Os Notificadores NÃO DEVEM divulgar quaisquer dados proprietários revelados acessoriamente durante os testes, nem o conteúdo da informação
  tornada acessível pela vulnerabilidade, a qualquer parte que dela não tenha já conhecimento no momento em que o relatório é submetido à
  Mojaloop Foundation.

### Política para os Recetores

A Mojaloop Foundation DEVE agir de boa-fé para com os Notificadores que descubram, testem e comuniquem vulnerabilidades ou
indicadores de vulnerabilidades de acordo com estas orientações.

#### Geral

* A Mojaloop Foundation PODE modificar os termos desta política ou pôr termo à política em qualquer momento.

* A Mojaloop Foundation DEVE utilizar a informação comunicada a este programa apenas para fins defensivos: para mitigar ou
  remediar vulnerabilidades no software de código aberto Mojaloop, nas redes e aplicações da Mojaloop Foundation, nas
  aplicações dos nossos fornecedores e nas dos utilizadores do software de código aberto Mojaloop.

#### Tratamento de casos

* A Mojaloop Foundation PODE, ao seu critério, recusar coordenar ou publicar um relatório de vulnerabilidade. Esta decisão
  baseia-se geralmente no âmbito e na gravidade da vulnerabilidade e na nossa capacidade de acrescentar valor ao processo de coordenação e
  divulgação.

* Caso a Mojaloop Foundation recuse coordenar um relatório de vulnerabilidade, o Notificador PODE avançar para a
  coordenação com qualquer outro fornecedor afetado. Além disso, o Notificador PODE avançar com a divulgação pública ao seu
  critério.

* A Mojaloop Foundation DEVE investigar todas as vulnerabilidades comunicadas e esforçar-se por garantir que são tomadas as medidas
  adequadas para mitigar o risco e remediar as vulnerabilidades comunicadas.

* A Mojaloop Foundation DEVE, na medida das suas possibilidades, validar a existência da vulnerabilidade

* A Mojaloop Foundation DEVE determinar um prazo adequado para o desenvolvimento e o deployment da mitigação das
  vulnerabilidades comunicadas em sistemas que controla.

#### Coordenação com os notificadores

* A Mojaloop Foundation DEVE acusar a receção dos relatórios de vulnerabilidades por e-mail no prazo de 7 dias úteis.

* A Mojaloop Foundation PODE contactar o Notificador para obter mais informação.

* A Mojaloop Foundation DEVE informar o Notificador dos resultados da nossa validação, conforme adequado, e, em conformidade,
  fornecer atualizações do estado à medida que decorre a remediação da vulnerabilidade.

* A Mojaloop Foundation DEVE incluir o crédito ao notificador em qualquer relatório de vulnerabilidade publicado, salvo pedido
  em contrário do notificador.

* Caso a Mojaloop Foundation opte por divulgar publicamente a vulnerabilidade comunicada, a Mojaloop
  Foundation DEVE reconhecer o contributo do notificador para a melhoria da nossa segurança, se este for o primeiro a comunicar uma vulnerabilidade
  única e se o relatório der origem a uma alteração de código ou de configuração.

* A Mojaloop Foundation PODE reencaminhar o nome e os dados de contacto do Notificador para quaisquer fornecedores afetados, salvo
  pedido em contrário do notificador.

* A Mojaloop Foundation DEVE reencaminhar o nome e os dados de contacto do notificador para os fornecedores afetados, salvo
  pedido em contrário do notificador.

* A Mojaloop Foundation DEVE informar o notificador das alterações significativas do estado de qualquer vulnerabilidade que este tenha
  comunicado, na medida do possível sem revelar informação que nos tenha sido fornecida em confidência.

* A Mojaloop Foundation PODE ajustar o seu prazo de publicação para acomodar as restrições do notificador, se esse calendário for
  de outra forma compatível com esta política. Na maioria dos casos, seria de esperar que esse ajuste representasse um atraso, e não
  uma antecipação, do calendário de publicação. Os exemplos incluem atrasar a publicação para coincidir com apresentações em
  conferências.

* A Mojaloop Foundation NÃO DEVE exigir que os Notificadores estabeleçam uma relação de cliente, um acordo de confidencialidade
  (NDA) ou qualquer outra obrigação contratual ou financeira como condição para receber ou coordenar relatórios de
  vulnerabilidades.

#### Coordenação com fornecedores

* Caso a Mojaloop Foundation determine que a vulnerabilidade comunicada decorre de uma vulnerabilidade num
  produto ou serviço geralmente disponível, a Mojaloop Foundation PODE comunicar a vulnerabilidade ao(s)
  fornecedor(es), prestador(es) de serviços ou serviço(s) de coordenação de vulnerabilidades de terceiros afetados, de forma a permitir que o produto ou
  serviço seja corrigido.

* A Mojaloop Foundation DEVE envidar um esforço de boa-fé para informar os fornecedores das vulnerabilidades comunicadas antes da divulgação
  pública.

* A Mojaloop Foundation DEVE reencaminhar os relatórios de vulnerabilidades para o(s) fornecedor(es) afetado(s) logo que possível após
  recebermos o relatório.

* A Mojaloop Foundation DEVE informar quaisquer fornecedores afetados dos nossos planos de publicação e negociar calendários de publicação
  alternativos com os fornecedores afetados, quando necessário.

* A Mojaloop Foundation DEVE dar ao fornecedor a oportunidade de incluir uma declaração do fornecedor no nosso documento de
  divulgação pública.

* A Mojaloop Foundation NÃO DEVE reter informação fornecida pelo fornecedor simplesmente porque este discorda da nossa avaliação
  do problema.

* A Mojaloop Foundation DEVE notificar os fornecedores afetados de quaisquer planos de divulgação pública.

* A Mojaloop Foundation NÃO DEVE revelar informação fornecida em confidência por qualquer fornecedor.

* A Mojaloop Foundation DEVE agir de acordo com as expectativas relativas aos Notificadores definidas nesta política quando
  atuar como Notificador perante outras organizações (fornecedores, coordenadores, etc.).

#### Coordenação com outros

* A Mojaloop Foundation PODE recorrer aos serviços de um serviço de coordenação de terceiros (por exemplo, CERT/CC, DHS CISA) para
  ajudar a resolver quaisquer conflitos que não possam ser resolvidos entre o Notificador e a Mojaloop Foundation.

* A Mojaloop Foundation PODE, ao seu critério, fornecer informação sobre vulnerabilidades comunicadas a qualquer pessoa que possa
  contribuir para a solução e com quem tenhamos uma relação de confiança, incluindo fornecedores (muitas vezes incluindo fornecedores
  cujos produtos não são vulneráveis), prestadores de serviços, especialistas da comunidade, patrocinadores e locais que fazem parte de uma
  infraestrutura crítica nacional, se considerarmos que esses locais estão em risco.

#### Divulgação pública

* A Mojaloop Foundation DEVE determinar o tipo e o calendário da nossa divulgação pública da vulnerabilidade.

* A Mojaloop Foundation PODE divulgar ao público as vulnerabilidades comunicadas 7 dias dias após o relatório
  inicial, independentemente da existência ou disponibilidade de correções ou soluções alternativas dos fornecedores afetados.

* A Mojaloop Foundation PODE divulgar vulnerabilidades ao público antes ou depois dos 7 dias devido a circunstâncias
  atenuantes, incluindo, entre outras, a exploração ativa, ameaças de natureza especialmente grave (ou trivial)
  ou situações que exijam alterações a uma norma estabelecida.

* A Mojaloop Foundation PODE consultar o Notificador e qualquer fornecedor afetado para determinar o calendário e os detalhes adequados da
  divulgação pública.

* A Mojaloop Foundation DEVE equilibrar a necessidade de o público ser informado sobre vulnerabilidades de segurança com a necessidade de
  tempo dos fornecedores e dos utilizadores do software de código aberto Mojaloop para responder de forma eficaz.

* A determinação final da Mojaloop Foundation sobre um calendário de publicação DEVE basear-se no melhor interesse da
  comunidade em geral.

* A Mojaloop Foundation DEVE publicar as divulgações públicas através de um ou mais dos seguintes meios: e-mail, Slack e/ou o sítio web
  Mojaloop Community Central.

* A Mojaloop Foundation PODE divulgar ao público a existência prévia de vulnerabilidades já corrigidas pela
  Mojaloop Foundation, incluindo potencialmente detalhes da vulnerabilidade, indicadores de vulnerabilidade ou a natureza (
  mas não o conteúdo) da informação tornada acessível pela vulnerabilidade.

* A Mojaloop Foundation DEVE tomar as suas decisões de divulgação com base em fatores relevantes como, entre outros:
  se a vulnerabilidade já foi divulgada publicamente, a gravidade da vulnerabilidade, o potencial impacto em
  infraestruturas críticas, a possível ameaça à saúde e à segurança públicas, as mitigações imediatas disponíveis, a capacidade de resposta do fornecedor
  e a viabilidade de criar uma atualização ou correção, e a estimativa do fornecedor do tempo necessário para os clientes
  obterem, testarem e aplicarem a correção. A exploração ativa, as ameaças de natureza especialmente grave ou as situações que
  exijam alterações a uma norma estabelecida podem resultar numa divulgação mais precoce ou mais tardia.

* A Mojaloop Foundation PODE divulgar vulnerabilidades de produtos 30 dias após o contacto inicial, independentemente da
  existência ou disponibilidade de correções ou soluções alternativas dos fornecedores afetados, nos casos em que um produto é afetado e
  o fornecedor não responde ou não estabelece um prazo razoável para a remediação.

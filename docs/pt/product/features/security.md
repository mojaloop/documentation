# Segurança
## Código aberto e segurança
Um equívoco comum é que o software de código aberto (open source) é intrinsecamente menos seguro do que o software de código fechado, simplesmente porque os atacantes podem inspecionar o código. O argumento é o seguinte: se o código é público, deve ser mais fácil descobrir vulnerabilidades. Na realidade, esta visão não compreende como funciona a cibersegurança moderna.

A segurança do Mojaloop não depende de ocultar o seu funcionamento interno. Em vez disso, assenta em algoritmos criptográficos de código aberto bem estabelecidos, desenvolvidos por especialistas de referência e publicados abertamente para revisão pelos pares. Estes algoritmos são rigorosamente testados pela comunidade criptográfica global, garantindo que as fragilidades são identificadas e corrigidas rapidamente. Quando uma falha é encontrada, as correções são partilhadas aberta e rapidamente, beneficiando todos os utilizadores — incluindo o Mojaloop.

Esta abordagem é diretamente comparável ao mundo das fechaduras físicas. O mecanismo de uma fechadura Yale, por exemplo, não é segredo: as patentes são públicas e qualquer pessoa pode estudar como funciona. No entanto, a fechadura continua a ser segura, não porque o mecanismo esteja escondido, mas porque só a chave correta e única a pode abrir. A criptografia funciona da mesma forma. Os algoritmos modernos assentam no sigilo das chaves, e não na ocultação do próprio algoritmo.

O mesmo se aplica a toda a base de código do Mojaloop - uma vez que é de código aberto, qualquer pessoa pode rever o código-fonte e ajudar a identificar eventuais vulnerabilidades. As equipas da comunidade Mojaloop acompanham ativamente este processo e assinalam quaisquer problemas identificados durante o processo de qualidade e segurança para revisão e correção. Potenciais vulnerabilidades são regularmente comunicadas por partes interessadas externas à comunidade principal, e estas são revistas e tratadas pelas equipas de qualidade e segurança. Mais detalhes são fornecidos na secção [Manutenção da segurança](#manutencao-da-seguranca), abaixo

## Segurança do Mojaloop
O Mojaloop baseou-se nestas práticas de código aberto e nestes algoritmos criptográficos para criar um modelo de segurança que é multicamada, complexo e sujeito a supervisão e revisão contínuas. 

Pode ser dividido em três áreas de âmbito:

- A segurança da ligação entre o Hub Mojaloop e os DFSPs (Digital Financial Services Providers) participantes (isto inclui tanto a segurança das transações como a segurança, o estabelecimento e a manutenção da própria ligação subjacente);
- A segurança das operações do Hub, tal como refletida nas atividades do pessoal operacional;
- A qualidade e a segurança do deployment do Hub Mojaloop.

Esta página centra-se nos mecanismos e processos de segurança dentro do Mojaloop e das suas ligações. O hardware e o ambiente de alojamento operados no domínio de um DFSP têm uma fronteira de confiança distinta. Os schemes (o conjunto de regras do sistema de pagamentos) que avaliem essa infraestrutura devem consultar também as [orientações de arquitetura de segurança para a infraestrutura dos DFSPs](./dfsp-infrastructure-security.md).

A forma como o Mojaloop aborda cada uma destas áreas é explorada nas secções seguintes.

## Segurança da ligação dos DFSPs
A ligação entre um DFSP participante e o Hub Mojaloop beneficia de três níveis de segurança que, em conjunto, garantem a integridade, a confidencialidade e o não repúdio das mensagens entre um DFSP, o Hub Mojaloop e (quando aplicável) o outro DFSP que participa numa transação.

O diagrama seguinte ilustra estes três níveis.

![Camadas de segurança da ligação do Mojaloop](../../../product/features/mojaloop_security_layers.jpg)

Ao nível mais baixo, a segurança da ligação ponto a ponto entre um DFSP (um participante autorizado) e o Hub Mojaloop é assegurada através da utilização de mTLS, que garante que as comunicações são confidenciais e entre correspondentes conhecidos, e que as comunicações estão protegidas contra adulteração.

Em seguida, o conteúdo das mensagens JSON utilizadas para comunicar entre o Hub e os DFSPs é assinado criptograficamente, de acordo com o método definido na especificação JWS ([ver RFC 7515](https://www.rfc-editor.org/rfc/rfc7515.html)). Isto garante aos destinatários que as mensagens foram enviadas pela parte que alegou enviá-las e, simultaneamente, que essa proveniência não pode ser repudiada pelo remetente.

Por fim, os termos de uma transação/transferência são protegidos utilizando o Interledger Protocol (ILP) entre os participantes pagador e beneficiário. O ILP utiliza um [Hashed Timelock Contract (HTLC)](./htlc.html) para proteger a integridade da condição de pagamento e do seu cumprimento (fulfilment). Desta forma, o Mojaloop garante que uma transferência ou se conclui integralmente em todas as partes participantes, ou não se conclui de todo. Limita também o tempo durante o qual uma instrução de transferência é válida.

Estas três camadas estão todas integradas no Hub Mojaloop. Do lado do DFSP, podem ser diretamente estabelecidas e geridas pelas próprias equipas de engenharia do DFSP. No entanto, a comunidade Mojaloop também [disponibiliza um conjunto de ferramentas](./connectivity.html) que tanto estabelecem estas camadas de segurança como as mantêm durante o tempo de vida da ligação. As ferramentas ajudam ainda um DFSP a gerir e orquestrar a sua utilização das várias comunicações/APIs com o Hub Mojaloop, tratando de muitas das complexidades em nome do DFSP, permanecendo ao mesmo tempo inteiramente no domínio do próprio DFSP (e, por isso, não fazendo parte do Hub Mojaloop).

## Segurança operacional do Hub
A segurança no próprio Hub Mojaloop vai além das ligações aos DFSPs participantes (conforme descrito na secção anterior) e inclui a segurança das ações dos operadores através da utilização dos vários [portais do Hub](.product.html).

Os portais são implementados utilizando o Business Operations Framework (BOF) do Mojaloop, que não só fornece os portais principais do Mojaloop, como também fornece um conjunto de APIs para permitir a um operador do Hub alargar estes portais e criar novos, de modo a satisfazer os seus requisitos específicos.

Para facilitar a gestão da segurança destes portais, o BOF canaliza toda a atividade através de uma única framework de gestão de identidades e acessos (Identity and Access Management, IAM), que incorpora controlos de acesso baseados em funções (Role Based Access Controls, RBAC) e permite intrinsecamente controlos Maker/Checker (também conhecidos como «quatro olhos») conformes com as normas da indústria.

Esta abordagem dá a um operador do Hub Mojaloop um controlo granular do acesso de cada indivíduo às capacidades de gestão do Hub Mojaloop, bem como dos controlos aplicados a cada atividade. No entanto, continua a ser da responsabilidade do operador do Hub garantir que o seu pessoal é devidamente verificado antes do recrutamento, que está registado no IAM para aceder aos portais, que lhe são atribuídas funções adequadas e que a framework RBAC atribui corretamente as funções para supervisionar as funções de gestão (incluindo, quando aplicável, controlos maker/checker). Em particular, políticas como a expiração de palavras-passe, o comprimento e o conteúdo das palavras-passe, a reutilização, etc., são diretamente permitidas pela framework IAM, que permite também a utilização de autenticação multifator (Multi-Factor Authentication, MFA) para todos os operadores, conforme determinado pelo operador do Hub (embora a utilização de SMS ou USSD como canal de MFA seja fortemente desaconselhada).

Além disso, continua a ser da responsabilidade do operador do hub garantir que são implementados pontos de controlo adequados ao funcionamento de um serviço financeiro (como, quando aplicável, o acesso físico aos servidores que alojam o Hub Mojaloop, o controlo da utilização de telemóveis pelos operadores, a videovigilância, a gestão da cadeia de abastecimento, a gestão de visitantes, etc.) e que são definidos processos de negócio para garantir a correta aplicação desses pontos de controlo.

## Manutenção da segurança
A comunidade Mojaloop definiu um conjunto de procedimentos e técnicas para garantir que a segurança de um deployment Mojaloop é mantida à medida que os ataques evoluem e as vulnerabilidades são identificadas, quer no próprio Mojaloop quer num dos inúmeros outros programas de código aberto de que o Mojaloop depende. Este conjunto é designado coletivamente por processo de gestão de vulnerabilidades (Vulnerability Management Process) e é composto por:
- Um Comité de Segurança, cujo papel é a coordenação de todos os aspetos da gestão de vulnerabilidades.
- Processos para o tratamento de possíveis vulnerabilidades, quando estas são levadas ao conhecimento do Comité de Segurança.
- Processos proativos de identificação e gestão de vulnerabilidades, incluindo:
	- A monitorização contínua de componentes de código aberto quanto a vulnerabilidades;
	- Testes estáticos de segurança de aplicações (Static Application Security Testing, SAST), utilizando várias ferramentas que, em conjunto, fornecem informação detalhada sobre vulnerabilidades ao nível do código, recorrendo a bases de dados públicas de vulnerabilidades;
	- A manutenção automatizada de uma lista de materiais de software (Software Bill of Materials, SBOM), que facilita a gestão do inventário e das dependências;
	- A análise de imagens de contentores quanto a vulnerabilidades antes do release;
	- A utilização de um analisador automatizado de licenças para garantir que apenas são utilizados componentes externos com licenças compatíveis;
	- A partir do release v17.1.0 do Mojaloop, os helm charts do Mojaloop são assinados na publicação e podem ser verificados no momento da instalação/deploy, para garantir a proveniência dos artefactos relacionados com os charts;
	- O Mojaloop utiliza um pipeline de CI/CD que integra automaticamente verificações de segurança ao longo de todo o processo de desenvolvimento de software;
	- O Mojaloop opera um processo de divulgação coordenada de vulnerabilidades (Coordinated Vulnerability Disclosure, CVD), garantindo que as partes responsáveis dispõem de tempo adequado para tratar e corrigir as vulnerabilidades antes da divulgação pública;
	- São gerados relatórios exaustivos após cada análise, detalhando os resultados, as ações de correção e a sua eficácia. Todos os relatórios são armazenados para fins de auditoria e conformidade, garantindo transparência e responsabilização.

O leitor pode encontrar informação técnica mais detalhada sobre o [processo de gestão de vulnerabilidades do Mojaloop aqui (em inglês)](https://docs.mojaloop.io/technical/technical/security/security-overview.html).


## Qualidade e segurança do deployment
Membros da comunidade Mojaloop estão atualmente a desenvolver uma framework de avaliação de qualidade (Quality Assessment Framework), cujo objetivo é desenvolver um toolkit que possa ser utilizado para validar a configuração, a funcionalidade, a segurança, a prontidão para a interoperabilidade e o desempenho de um deployment. 

Esta framework pode ser utilizada pelos adotantes para se «autocertificarem», ou pode ser utilizada por um revisor externo para criar um nível mais elevado de garantia para as autoridades de supervisão e os participantes.

## Aplicabilidade
Este documento diz respeito à versão 17.1.0 do Mojaloop
## Histórico do documento
  |Versão|Data|Autor|Detalhe|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.3|21 de agosto de 2026| Yevhen Kyriukha|Ligação às orientações de segurança da infraestrutura dos DFSPs|
|1.2|13 de outubro de 2025| Paul Makin|Adicionada a secção introdutória «Código aberto e segurança».|
|1.1|15 de julho de 2025| Paul Makin|Adicionada a secção «Manutenção da segurança».|
|1.0|24 de junho de 2025| Paul Makin|Versão inicial|

# Orientações de arquitetura de segurança para a infraestrutura de DFSP

*Um quadro de referência para os schemes (o scheme é o conjunto de regras do
sistema de pagamentos) que avaliam fornecedores de infraestrutura de DFSP face
às ameaças que os DFSPs realisticamente enfrentam.*

- Versão: 1.0
- Autor: Yevhen Kyriukha
- Data: maio de 2026

## Âmbito

Estas orientações abordam o hardware e o ambiente de host (a máquina anfitriã)
operados no domínio do DFSP (Digital Financial Services Provider), incluindo a
infraestrutura na qual são executados o software de conectividade, os serviços
de assinatura, os componentes de gestão de certificados e as cargas de
trabalho (workloads) relacionadas.

## Resumo executivo

A segurança da infraestrutura de DFSP é uma propriedade do sistema como um
todo, e não de qualquer componente dentro dele. Um sistema é seguro contra a
ameaça realista quando todas as seguintes propriedades arquitetónicas estão
presentes em conjunto e se reforçam mutuamente: integridade do arranque
resistente a ataques físicos, derivação de chaves vinculada ao estado não
modificado do sistema, isolamento de cargas de trabalho, confidencialidade das
cargas de trabalho, separação de chaves por carga de trabalho, operações de
assinatura restringidas e auditoria com deteção de adulteração. Cada uma
aborda uma faceta da ameaça. Nenhuma aborda a ameaça sozinha, e a ausência de
qualquer uma delas deixa um caminho através do qual a ameaça realista contorna
as restantes.

As pilhas de componentes criptográficos que combinam HSM, TPM e arranque
seguro (secure boot) não satisfazem este requisito por si só. Os componentes
dependem de uma cadeia de confiança que a ameaça realista visa e, uma vez
derrotada essa cadeia, cada componente continua a assinar, selar e verificar
tudo o que lhe for pedido. Este documento fornece o quadro de referência de
que os schemes necessitam para avaliar a infraestrutura de DFSP com base na
coerência arquitetónica, e não na presença de componentes.

## Visão geral

Quando um DFSP adere a um scheme Mojaloop, depende de hardware e de software
para se ligar ao Hub, assinar transações e proteger chaves criptográficas. A
segurança desta infraestrutura determina se é possível confiar no participante
para autorizar transações em nome dos seus clientes. Se a infraestrutura for
comprometida, as transações fraudulentas tornam-se indistinguíveis das
legítimas, e o modelo de confiança do scheme desmorona-se nesse participante.

### O que os atacantes fazem realisticamente

O modelo de ameaças para a infraestrutura de DFSP é simples. Os atacantes
procuram ganho financeiro através da autorização de transações fraudulentas.
Utilizam ferramentas de uso corrente e técnicas publicamente documentadas.
Existem três caminhos pelos quais chegam aos sistemas do DFSP: explorando
vulnerabilidades de software ou comprometimentos da cadeia de abastecimento
que lhes dão execução de código nos computadores do participante; roubando
credenciais de administrador através de phishing, malware ou engenharia
social; ou, no caso de deployments ao nível de agência e em zonas rurais, onde
a segurança física é variável, roubando o próprio equipamento e violando-o num
laboratório.

Em nenhum destes casos o objetivo do atacante é extrair chaves criptográficas
de hardware seguro. O objetivo é obter o controlo do computador que executa o
software de conectividade do DFSP e, em seguida, pedir a esse computador que
assine transações fraudulentas exatamente da mesma forma que o software
legítimo o faria. Da perspetiva do Hub, as transações resultantes parecem
autênticas. São assinadas pela capacidade de assinatura legítima do
participante, a pedido do atacante.

A infraestrutura deve resistir não ao roubo de chaves criptográficas, mas ao
comprometimento do computador que as utiliza. Fechaduras inquebráveis numa
porta fina de madeira não protegem uma entrada; o atacante arromba o painel da
porta. Uma infraestrutura com componentes criptográficos fortes mas com um
ambiente de host fraco comete o mesmo erro.

### Porque falham as listas de verificação de componentes

Um pressuposto comum na aquisição é que um sistema com um HSM, um TPM e
arranque seguro fornece três camadas de defesa independentes. Não fornece. O
arranque seguro é a âncora de confiança da plataforma. As medições do TPM são
produzidas pela cadeia de arranque que o arranque seguro verifica. As chaves
seladas pelo TPM, incluindo as credenciais que autenticam junto do HSM,
dependem de essas medições serem autênticas. O HSM assina para qualquer
sistema que detenha credenciais válidas.

Se o arranque seguro for derrotado através de qualquer um dos caminhos de
acesso físico documentados na investigação pública, a cadeia colapsa: o
arranque controlado pelo atacante reporta as medições que entender, as
credenciais seladas pelo TPM são desseladas no sistema comprometido, e o HSM
assina tudo o que o host comprometido solicitar. As chaves do HSM permanecem
não extraíveis durante todo o processo. Mas a extração não é a ameaça. A
ameaça é a invocação do caminho de assinatura legítimo a partir de um host
comprometido, e toda a pilha de componentes permanece utilizável a partir
desse host, porque cada componente confia na camada abaixo de si.

A mesma dependência aplica-se aos cenários de comprometimento do host que não
exigem derrotar o arranque seguro. Um atacante que obtenha acesso ao nível do
kernel através de vetores de software, de cadeia de abastecimento ou
operacionais chega às credenciais que autenticam junto do HSM pelo mesmo
caminho pelo qual a aplicação legítima lhes chega. O HSM assina. As chaves
permanecem não extraíveis. A fraude é autorizada.

### Porque a coerência importa mais do que qualquer propriedade isolada

As propriedades arquitetónicas nomeadas no resumo executivo abordam facetas
específicas da ameaça realista. Cada uma é individualmente bem conhecida e
individualmente insuficiente. Um sistema com isolamento de cargas de trabalho
mas com integridade do arranque fraca é quebrado quando o equipamento é
roubado e a cadeia de arranque é contornada num laboratório. Um sistema com
integridade do arranque forte mas sem isolamento de cargas de trabalho é
quebrado quando uma das suas cargas de trabalho é comprometida através de uma
vulnerabilidade de software. Um sistema com isolamento de cargas de trabalho
mas sem confidencialidade das cargas de trabalho é quebrado quando uma carga
de trabalho comprometida utiliza análise de canais laterais contra a
encriptação de memória partilhada para recuperar as chaves que protegem outras
cargas de trabalho. Um sistema com tudo isto mas sem separação de chaves por
carga de trabalho permite que uma carga de trabalho comprometida assine no
âmbito de outra. A arquitetura só é segura contra a ameaça realista quando as
propriedades estão presentes em conjunto, numa configuração em que a proteção
de cada propriedade não é minada pela ausência de outra.

Os schemes que avaliam fornecedores deveriam perguntar não quais os
componentes ou propriedades que estão presentes, mas de que forma a
arquitetura como um todo se defende contra a ameaça realista. Que dependências
existem entre componentes? O que permanece protegido se uma camada inferior
for derrotada? A violação de um único pressuposto arquitetónico faz colapsar
as defesas do sistema?

## Porque existem estas orientações

A segurança da infraestrutura de DFSP não é uma propriedade de qualquer
componente isolado, nem é produzida pela combinação de vários componentes numa
lista de verificação de aquisição. É uma propriedade da arquitetura na qual os
componentes estão dispostos, das dependências entre eles e de a arquitetura
como um todo abordar ou não o modelo de ameaças realista. Os schemes que
avaliam fornecedores deveriam, por isso, avaliar a infraestrutura face à
arquitetura, e não face à presença de componentes criptográficos nomeados, por
mais abrangentes que sejam.

Este documento apresenta o quadro de referência para essa avaliação. Começa
pelo modelo de ameaças (o que os atacantes fazem realisticamente) e descreve
em seguida as propriedades arquitetónicas que, em conjunto, abordam essa
ameaça, as dependências entre elas e as perguntas a que os schemes deveriam
exigir que os fornecedores respondam. O quadro de referência é
tecnologicamente neutro: define as propriedades que os schemes deveriam
avaliar, não os mecanismos que os fornecedores devem utilizar para as
implementar.

## O modelo de ameaças para a infraestrutura de DFSP

Os atacantes que visam a infraestrutura de DFSP não são, tipicamente,
adversários ao nível de um Estado com capacidade criptanalítica de
laboratório. São adversários que procuram ganho financeiro através da
autorização de transações fraudulentas, com acesso a investigação pública
sobre vulnerabilidades, a ferramentas de ataque de uso corrente e (para a
variante de ataque físico discutida abaixo) a equipamento de análise de
hardware de bancada para ataques de canal lateral e de injeção de falhas. O
equipamento para interceção de barramentos, injeção de falhas e análise
eletromagnética ou de consumo de energia tornou-se barato e amplamente
disponível.

Existem três caminhos realistas pelos quais os atacantes obtêm o acesso
necessário para autorizar transações fraudulentas.

**Comprometimento da rede ou da cadeia de abastecimento.** O atacante explora
uma vulnerabilidade no software em execução no host do participante: um
serviço exposto à web, uma ferramenta de agregação de registos, um agente de
monitorização ou qualquer uma das dezenas de dependências que compõem um
deployment típico. As vulnerabilidades de escape de contentores são publicadas
regularmente e permanecem exploráveis na prática. O [Copy Fail
(CVE-2026-31431, abril de 2026)](https://copy.fail) é uma demonstração recente
de que as fronteiras dos contentores colapsam quando o kernel partilhado é
explorado. Os ataques à cadeia de abastecimento entregam código malicioso
através de canais de atualização legítimos, de dependências comprometidas ou
de suportes de instalação adulterados. Qualquer um destes caminhos resulta em
execução de código no host, tipicamente com privilégios suficientes para
invocar as interfaces normais da aplicação.

**Comprometimento operacional.** As credenciais são roubadas através de
phishing ou de malware nas estações de trabalho dos administradores, a
engenharia social compromete o pessoal de operações, ou o acesso de pessoas
internas proporciona acesso direto ao sistema.

**Apreensão física seguida de análise em laboratório.** O atacante obtém a
posse física da infraestrutura do DFSP (por roubo numa agência, interceção
durante o transporte ou apreensão num local sem vigilância) e leva-a para um
laboratório. Com a posse física e equipamento de bancada, o atacante derrota a
integridade do arranque do sistema para obter acesso root num sistema ainda
funcional que mantém as suas chaves operacionais, certificados e configuração.
Este caminho é realista para qualquer deployment em que a segurança física
seja variável. As instalações ao nível de agência, os locais rurais e a
infraestrutura alojada fora de instalações controladas estão rotineiramente
acessíveis a roubo oportunista. Os ataques disponíveis num laboratório estão
bem documentados: substituição do suporte de arranque, abuso do modo de
recuperação, exposição de interfaces de depuração, fases iniciais de arranque
vulneráveis e injeção de falhas contra os caminhos de verificação, todos
disponíveis a preços ao alcance de amadores.

O objetivo do atacante nos três caminhos é o mesmo: produzir assinaturas que o
Hub aceite. O caminho realista dominante é o comprometimento do host
conducente à invocação da interface de assinatura legítima. O atacante que
comprometeu o host detém as credenciais que o participante utiliza para se
autenticar junto do Hub. Com essas credenciais, o atacante invoca a mesma
interface que a aplicação legítima invoca e (através do mesmo plano de
controlo do lado do Hub que permite aos participantes gerir a sua própria
conectividade) ajusta quaisquer controlos de acesso ao nível da rede,
vinculações de certificados ou listas de permissões de endpoints que, de outro
modo, restringiriam essa invocação. As transações resultantes são produzidas
pela própria capacidade de assinatura do participante, apresentadas através de
canais que os controlos do Hub foram reconfigurados para aceitar. Da
perspetiva do Hub, o pedido é indistinguível de um pedido legítimo.

Esta ameaça aplica-se independentemente dos componentes criptográficos
presentes. Um HSM mantém as suas chaves não extraíveis; um TPM sela as
credenciais às medições da cadeia de arranque; o arranque seguro verifica a
cadeia de arranque no início. Cada um destes desempenha corretamente a função
para que foi concebido, e nenhum deles impede o host comprometido de invocar a
interface de assinatura, ou o plano de controlo que rege a forma como o Hub o
reconhece, ou ambos.

## As propriedades arquitetónicas

As propriedades nomeadas abaixo abordam a ameaça realista como um todo
coerente. Cada secção descreve uma propriedade e identifica de que forma essa
propriedade depende das outras. As propriedades não podem ser avaliadas de
forma independente. Um sistema que satisfaça qualquer uma das propriedades
numa configuração que viole outra propriedade não é seguro contra a ameaça
realista, independentemente de qual o componente que implementa qual
propriedade.

### Integridade do arranque resistente a ataques físicos

A segurança de todas as outras propriedades depende da integridade do sistema
em execução. Se um atacante modificar a sequência de arranque, o kernel ou a
configuração em tempo de execução, todas as propriedades de segurança de nível
superior passam a depender da contenção do atacante. Os TPM medem o que a
cadeia de arranque reporta. Os HSM assinam para qualquer sistema que detenha
credenciais válidas. As chaves seladas são desseladas em sistemas que produzam
medições correspondentes. Uma vez derrotada a cadeia de arranque, todas as
proteções a jusante operam sobre premissas controladas pelo atacante.

As configurações de arranque seguro não deveriam ser tratadas como prova de
resistência a ataques físicos, a menos que o fornecedor documente as classes
de ataque testadas e as mitigações implementadas. Vulnerabilidades de software
como o
[BootHole](https://access.redhat.com/security/vulnerabilities/grub2bootloader)
(CVE-2020-10713) e o [PKfail](https://kb.cert.org/vuls/id/455367)
(CVE-2024-8105) contornaram os pressupostos de confiança do Secure Boot em
sistemas Linux e UEFI amplamente utilizados, e exigem correções ou revogações
que podem não ser aplicadas de forma consistente na infraestrutura já
instalada. Mais fundamentalmente, as vulnerabilidades no código de arranque
imutável de primeira fase não podem ser corrigidas diretamente no silício já
instalado. Os fornecedores podem acrescentar mitigações a jusante ou corrigir
futuras revisões do silício, mas nenhuma atualização de software modifica a
própria ROM. O AMD Secure Processor (AMD-SP, anteriormente PSP), que
estabelece as funções de raiz de confiança da plataforma nos CPU AMD Ryzen e
EPYC e sustenta a encriptação de memória SEV, foi comprometido por [injeção de
falhas por tensão nas microarquiteturas Zen 1, Zen 2 e Zen 3 com capacidade
SEV](https://arxiv.org/abs/2108.04575). Os investigadores descrevem o seu
ataque diretamente: «Ao manipular a tensão de entrada dos systems on a chip
(SoC) da AMD, induzimos um erro no bootloader da memória só de leitura (ROM)
do AMD-SP, o que nos permite obter controlo total sobre esta raiz de
confiança.» Com este controlo, extraíram chaves de endosso (endorsement keys)
e forjaram relatórios de atestação. As plataformas Intel também foram alvo de
ataques publicados de tensão e de injeção de falhas contra as suas garantias
de integridade, incluindo o
[V0LTpwn](https://www.usenix.org/conference/usenixsecurity20/presentation/kenjar)
e o [Plundervolt](https://plundervolt.com/) contra o SGX. Uma funcionalidade
de «arranque seguro» não demonstra, por si só, resistência a um atacante que
possua o hardware e disponha de ferramentas de bancada.

O que a integridade do arranque exige, em termos arquitetónicos, é o
endurecimento contra ataques de acesso físico. Caminhos de código do
bootloader que resistam à injeção de falhas. Interfaces de depuração
controladas, bloqueadas em produção, com deteção de tentativas de as reativar.
Um fluxo de arranque resistente a adulteração, em que a verificação de
assinaturas não possa ser modificada por um atacante físico. Cadeias de
verificação que se estendam desde raízes de confiança imutáveis em hardware
através de todas as fases do arranque.

Para a avaliação de fornecedores, a pergunta relevante é contra que ataques
físicos o sistema foi analisado, que defesas estão documentadas contra cada um
deles e que testes sustentam as afirmações. Respostas que afirmem apenas que o
arranque seguro está ativado não respondem à pergunta.

### Derivação de chaves vinculada ao estado não modificado do sistema

O complemento da integridade do arranque é a derivação de chaves vinculada a
ela. Chaves derivadas apenas quando a cadeia de arranque é executada sem
modificações significam que um sistema modificado não as consegue produzir; o
atacante que contorna a integridade do arranque obtém root num sistema que não
consegue desencriptar a sua própria configuração. A verificação da integridade
do arranque e a derivação de chaves formam, em conjunto, uma única defesa. A
verificação estabelece que o sistema arrancou de forma limpa. A vinculação
garante que as chaves só existem num sistema que o fez.

A força da defesa depende da forma como a vinculação é implementada. A selagem
baseada em TPM fornece uma base de referência: as chaves só são libertadas
quando os valores dos Platform Configuration Register correspondem aos valores
que tinham quando as chaves foram seladas. Os valores dos PCR registam as
medições efetuadas durante o arranque. A limitação desta base de referência é
que as medições são escritas no TPM pelo próprio código de arranque. Um
atacante que consiga substituir o código que efetua as medições pode fazer com
que o TPM registe medições controladas pelo atacante ou enganadoras. O TPM
regista fielmente as medições que lhe são fornecidas e liberta as chaves
quando a política é satisfeita. A vinculação não resiste a um atacante que
controle o código que produz as medições.

Uma propriedade arquitetónica mais forte é uma vinculação que resista a este
atacante. O componente que mede o sistema deve ser um componente que o
atacante não consiga substituir ao derrotar a integridade do arranque, e as
chaves devem permanecer inutilizáveis num sistema comprometido mesmo quando as
suas medições satisfariam, de outro modo, a vinculação.

Os fornecedores deveriam ser questionados sobre qual o componente que produz
as medições de que a vinculação das chaves depende e sobre o que o atacante
precisa de fazer para controlar a saída desse componente. Nas configurações
típicas baseadas em TPM, o bootloader escreve as medições no TPM. O arranque
seguro é suposto impedir a modificação do bootloader, mas o próprio arranque
seguro não resiste a atacantes físicos, como discutido na secção anterior. Um
atacante que derrote o arranque seguro através de injeção de falhas, de abuso
do modo de recuperação ou de fases iniciais de arranque vulneráveis pode
executar um bootloader modificado que escreva as medições que entender. Nessas
configurações, a vinculação das chaves herda a proteção que a integridade do
arranque efetivamente fornece contra ataques físicos.

### Isolamento de cargas de trabalho

A infraestrutura de DFSP executa tipicamente múltiplas cargas de trabalho: o
próprio conector, agentes de monitorização, agentes de envio de registos,
componentes de integração opcionais e, por vezes, uma interface local para os
operadores. O requisito arquitetónico é que o comprometimento do kernel do
host não se propague às cargas de trabalho protegidas.

O isolamento ao nível dos contentores não fornece isto. Quando as cargas de
trabalho partilham um kernel, uma vulnerabilidade nesse kernel faz colapsar as
fronteiras dos contentores. O Copy Fail (CVE-2026-31431) é a demonstração
recente. Os deployments de contentores por omissão estão todos no âmbito da
exploração do kernel partilhado. O isolamento por hipervisor que trata o
kernel do host como parte da base de computação confiável (trusted computing
base) também não o fornece: um kernel do host comprometido lê a memória dos
convidados através do caminho que o hipervisor lhe permite. O que a
arquitetura deve fazer é tratar o kernel do host como um potencial atacante e
garantir que as cargas de trabalho protegidas permanecem inacessíveis para
ele.

Esta propriedade importa mesmo em sistemas que incluem HSM, TPM e arranque
seguro. Um kernel do host comprometido lê quaisquer credenciais e material que
a carga de trabalho de assinatura legítima utilize para se autenticar junto
desses componentes. O HSM assina os pedidos apresentados com credenciais
válidas, independentemente de qual o processo no host que os apresentou. O TPM
liberta o material selado a qualquer chamador que satisfaça a política. Os
componentes criptográficos defendem as chaves que detêm; não defendem contra
serem legitimamente invocados por uma carga de trabalho comprometida que
obteve o mesmo acesso que foi concedido à carga de trabalho autorizada.

Uma avaliação deveria estabelecer se o kernel do host faz parte da base de
computação confiável, o que protege a memória da carga de trabalho de
assinatura contra um kernel do host comprometido e de que forma os
dispositivos com capacidade DMA são restringidos para não contornarem a
fronteira. Quando a resposta depende de pressupostos que o modelo de ameaças
realista viola (segurança física que pode não se verificar, integridade de uma
cadeia de arranque que pode ser derrotada, isolamento que se quebra quando uma
vulnerabilidade do kernel é explorada), a propriedade não está efetivamente
presente, mesmo que um mecanismo seja nomeado.

### Confidencialidade das cargas de trabalho

O isolamento de cargas de trabalho estabelece que os caminhos de software
entre cargas de trabalho estão bloqueados. Uma carga de trabalho comprometida
não consegue chegar à memória, aos processos ou ao armazenamento de outra
através das interfaces do sistema operativo. A confidencialidade das cargas de
trabalho é o requisito adicional de que ataques ao nível do hardware contra as
operações de memória de uma carga de trabalho não resultem em acesso aos dados
de outra carga de trabalho.

O ataque relevante combina análise de canais laterais com acesso à memória.
Uma carga de trabalho comprometida em execução no sistema tem acesso legítimo
às operações do subsistema de memória dentro do seu próprio âmbito. Ao efetuar
acessos à memória cuidadosamente escolhidos, um atacante gera sinais de canal
lateral (variações temporais, alterações no consumo de energia, emissões
eletromagnéticas) que revelam informação sobre as operações criptográficas que
o sistema efetua para proteger a memória. Se a encriptação de memória utilizar
chaves ou material criptográfico partilhados entre cargas de trabalho, a
análise de canais laterais contra as operações de uma carga de trabalho pode
recuperar esse material, expondo as outras cargas de trabalho por ele
protegidas. O atacante lê então diretamente a memória das outras cargas de
trabalho, quer através do conteúdo da sua RAM, agora desencriptável, quer
através de uma captura por arranque a frio (cold boot).

As tecnologias atuais de computação confidencial protegem a memória nas
fronteiras do enclave, da VM ou da plataforma, consoante a implementação.
Continuam a ter superfícies de ataque físico e fronteiras explícitas no modelo
de ameaças. O [TEE.fail (outubro de 2025)](https://tee.fail) demonstra ataques
de interposição no barramento de memória DDR5 contra Intel SGX, Intel TDX e
AMD SEV-SNP com um custo para o atacante inferior a 1000 dólares, com extração
de material criptográfico relevante para a atestação nas configurações
afetadas. Um fornecedor pode classificar isto como um ataque físico fora do
âmbito previsto da tecnologia. Os schemes que fazem o deployment de
infraestrutura em agências, em locais rurais ou noutros ambientes fisicamente
expostos devem avaliar esse pressuposto face à realidade do seu deployment.

O que a arquitetura deve garantir é que o comprometimento, a observação ou a
análise de canais laterais de uma carga de trabalho não resultem em acesso aos
dados protegidos de outra carga de trabalho. O mecanismo pode variar
(isolamento por hardware, encriptação de memória, domínios de execução
separados, separação física ou outros desenhos), mas a propriedade é a mesma:
os dados sensíveis de uma carga de trabalho não devem tornar-se visíveis fora
da carga de trabalho autorizada a utilizá-los, independentemente do que mais
seja executado no mesmo hardware.

As respostas dos fornecedores deveriam explicar o que impede uma carga de
trabalho de observar os dados protegidos de outra carga de trabalho através de
software, de DMA, de acesso físico à memória ou de canais laterais; de que
forma os domínios de proteção de memória são delimitados, e se o
comprometimento ou a observação de um resulta em acesso a outro; e que
investigação sobre ataques o fornecedor analisou relativamente ao subsistema
de memória e às implementações criptográficas que o protegem.

### Separação de chaves por carga de trabalho

Num sistema com múltiplas cargas de trabalho, a capacidade de assinatura de
cada carga de trabalho deveria estar criptograficamente isolada de todas as
outras. Um comprometimento da carga de trabalho A não deveria resultar em
capacidade de assinatura para as transações da carga de trabalho B.

Os periféricos criptográficos, como os HSM, podem fornecer isolamento por
partição quando configurados com identidades de cliente separadas para cada
partição. O periférico distingue os pedidos pela identidade do cliente.
Trata-se de uma propriedade real quando corretamente configurada.

A limitação é que o isolamento por partição depende da integridade das
credenciais de cliente e das fronteiras ao nível do host entre cargas de
trabalho. Quando as cargas de trabalho partilham um kernel, um atacante com
acesso ao nível do kernel lê as credenciais de cliente de qualquer carga de
trabalho e faz-se passar por essa carga de trabalho perante o periférico. O
periférico vê uma identidade de cliente válida e assina. Neste caso, o
isolamento por partição reduz-se ao isolamento ao nível do host, que é
exatamente o que a ameaça realista quebra.

O que é exigido, em termos arquitetónicos, é uma separação de chaves por carga
de trabalho que sobreviva ao comprometimento do host ao nível do kernel. A
fronteira entre cargas de trabalho deve ser imposta por um mecanismo de
isolamento que continue a ser significativo quando o kernel do host está sob o
controlo do atacante. Trata-se do mesmo requisito que o isolamento de cargas
de trabalho, expresso da perspetiva do caminho de assinatura: o
comprometimento de uma carga de trabalho, incluindo o comprometimento ao nível
do kernel dentro da sua fronteira, não deve resultar em capacidade de
assinatura para outra.

O teste para uma avaliação é se um atacante que obteve acesso ao nível do
kernel no sistema consegue invocar a capacidade de assinatura de qualquer
carga de trabalho que não aquela que comprometeu. Se a resposta depender de o
atacante conseguir ler as credenciais de outra carga de trabalho a partir da
memória do mesmo kernel, a propriedade não está presente.

### Operações de assinatura restringidas

Mesmo quando as outras propriedades arquitetónicas se verificam, a interface
de assinatura pode ser invocada maliciosamente por uma carga de trabalho
comprometida dentro do seu próprio domínio de isolamento. A capacidade de
assinatura deve ser restringida de duas formas: não deve poder ser utilizada
para se comprometer a si própria, e não deve poder ser utilizada para
autorizar transações fraudulentas ilimitadas antes da deteção.

A primeira restrição é criptográfica. O chamador não deve conseguir selecionar
algoritmos inseguros, influenciar nonces, degradar parâmetros criptográficos,
invocar modos propensos a oráculos de padding ou, de qualquer outra forma,
levar o serviço de assinatura a divulgar material de chave através das suas
saídas normais. As técnicas nesta categoria incluem a reutilização de nonces
em ECDSA, nonces previsíveis em esquemas determinísticos implementados
incorretamente, construções de oráculo de padding contra PKCS\#1 v1.5, a
degradação de algoritmo quando a interface aceita uma opção fraca e ataques de
mensagem escolhida contra funções de hash fracas. Nenhuma destas técnicas
exige a extração da chave do seu armazenamento protegido. Utilizam a
capacidade de assinatura legítima para divulgar a chave através da saída
normal. Uma vez divulgada, a chave é utilizável a partir de qualquer lugar,
indefinidamente, sem necessidade de qualquer comprometimento adicional da
infraestrutura.

A segunda restrição é operacional. O chamador não deve conseguir assinar
payloads de negócio arbitrários sem estrutura, limites de taxa, verificações
de política e auditoria com deteção de adulteração. Uma carga de trabalho
comprometida com acesso legítimo à assinatura deveria estar limitada ao
âmbito, à estrutura de payload e à taxa de transações que a arquitetura
permite. Não deve conseguir transformar o serviço de assinatura num oráculo de
extração de chaves nem num oráculo de autorização ilimitada.

Ambas as restrições dependem das outras propriedades arquitetónicas. A
imposição efetuada por código ou por interfaces a que a carga de trabalho
comprometida consegue chegar não é imposição. A assinatura restringida
enquanto propriedade de segurança exige que as restrições existam em
infraestrutura que a carga de trabalho comprometida não consegue contornar,
por exemplo, chegando diretamente à chave através de um caminho menos
restringido.

Os schemes deveriam perguntar: que algoritmos e parâmetros criptográficos a
interface de assinatura impõe, e pode o chamador sobrepor-se a eles? Como são
gerados os nonces, e pode o chamador influenciá-los? Que implementações
resistentes a canais laterais são utilizadas? A aplicação pode assinar
conteúdo arbitrário, ou apenas operações estruturadas que o sistema foi
concebido para autorizar, e a que taxa? Que registos são mantidos, e pode uma
aplicação comprometida alterá-los?

### Registos operacionais com deteção de adulteração

A auditoria forense é o corolário das operações de assinatura restringidas. Um
sistema de assinatura que regista as suas operações em registos que o próprio
assinante consegue modificar fornece auditoria com deteção de adulteração
apenas contra atacantes descuidados. Um atacante que tenha comprometido o host
de assinatura reescreve os registos antes de estes serem assinados, e os
registos assinados são válidos.

A integridade dos registos deve ser imposta por infraestrutura a que a carga
de trabalho comprometida não consegue chegar. As chaves de assinatura para a
integridade dos registos estão isoladas da carga de trabalho que gera os
registos. A operação de assinatura dos registos ocorre a um nível de
privilégio a que a carga de trabalho não consegue chegar. As cadeias de
registos resultantes são apenas de acréscimo (append-only), com ligação
criptográfica entre entradas. O trilho de auditoria tem deteção de adulteração
não porque a carga de trabalho promete não o modificar, mas porque a carga de
trabalho estruturalmente não o consegue fazer.

Esta propriedade exige separação estrutural entre a infraestrutura que assina
transações e a infraestrutura que assina registos de auditoria. Se um único
componente assinar ambos (HSM, TPM ou qualquer outro periférico) a pedido da
mesma aplicação no host, um host comprometido produz tanto transações
fraudulentas como entradas de registo falsas que as ocultam, e ambas são
criptograficamente válidas. A propriedade depende, por isso, do isolamento de
cargas de trabalho: a carga de trabalho que produz os registos não deve
conseguir invocar a infraestrutura de assinatura de registos para conteúdo
arbitrário, mesmo quando comprometida.

Os fornecedores deveriam ser capazes de explicar de que forma os registos de
auditoria são protegidos contra modificação pela mesma carga de trabalho cujas
operações registam, se a assinatura dos registos é efetuada por infraestrutura
estruturalmente separada da assinatura de transações, e o que impõe essa
separação.

## Avaliação

Estas propriedades arquitetónicas formam uma única arquitetura coerente, e não
uma lista de funcionalidades independentes. A segurança da infraestrutura de
DFSP depende de todas elas estarem presentes em conjunto, numa configuração em
que o contributo de cada propriedade não é minado pela ausência ou fraqueza de
outra. Um sistema que satisfaça a maioria destas propriedades não é
parcialmente seguro contra a ameaça realista; a arquitetura falha na
propriedade exigida que a ameaça realista conseguir alcançar.

A pergunta de avaliação para os schemes não é, por isso, quais as propriedades
ou componentes que um fornecedor inclui, mas se a arquitetura como um todo
resiste à ameaça realista. Deveria exigir-se aos fornecedores que descrevam a
sua arquitetura em termos que correspondam a todas estas propriedades, que
expliquem as dependências entre elas e que identifiquem aquilo contra que a
arquitetura protege e aquilo contra que não protege. Especificamente, os
schemes deveriam exigir respostas a vários cenários. Se um atacante apreender
fisicamente este equipamento e derrotar a integridade do arranque num
laboratório, o que sobrevive? Se um atacante comprometer qualquer carga de
trabalho individual em execução no host, que capacidade de assinatura obtém e
qual não obtém? Se o kernel do host for comprometido ao nível root através de
uma vulnerabilidade de software, que material protegido permanece inacessível?
Se o periférico criptográfico for invocado por uma carga de trabalho que foi
comprometida dentro do seu domínio de isolamento, que restrições se aplicam
àquilo que pode assinar?

Um fornecedor cuja arquitetura aborda a ameaça realista responde a estas
perguntas de forma concreta e identifica as dependências entre as defesas. Um
fornecedor cuja afirmação de segurança assenta na presença de componentes
(HSM, TPM, arranque seguro) não o faz, porque os componentes não respondem,
por si só, às perguntas. Quando a resposta consiste em linguagem de marketing,
generalidades ou afirmações de que os componentes nomeados são suficientes, a
avaliação não foi satisfeita.

### Lista de verificação para avaliação de fornecedores

A lista de verificação seguinte consolida as perguntas a que os schemes
deveriam exigir que um fornecedor responda. Um mecanismo nomeado não é
suficiente por si só; a resposta deveria explicar a fronteira de proteção, as
suas dependências e as provas que sustentam a afirmação.

| Propriedade | A resposta do fornecedor deveria estabelecer |
| --- | --- |
| Integridade do arranque | Que classes de ataque físico foram analisadas, que defesas abordam cada classe e que testes sustentam as afirmações. |
| Derivação de chaves vinculada ao estado | Que componente produz as medições utilizadas para a derivação de chaves, se um atacante consegue controlar esse componente e que material de chave permanece utilizável após a modificação do sistema. |
| Isolamento de cargas de trabalho | Se o kernel do host está dentro da base de computação confiável, o que protege a memória das cargas de trabalho após o comprometimento do host e de que forma os dispositivos com capacidade DMA são restringidos. |
| Confidencialidade das cargas de trabalho | De que forma os caminhos de software, DMA, memória física e canais laterais são separados entre cargas de trabalho, e se o comprometimento ou a observação de um domínio de proteção expõe outro. |
| Separação de chaves por carga de trabalho | Se o comprometimento ao nível do kernel de uma carga de trabalho ou do host permite a invocação da capacidade de assinatura de outra carga de trabalho. |
| Assinatura restringida | Que algoritmos, parâmetros, estruturas de payload, políticas e taxas são impostos fora do controlo da carga de trabalho comprometida, e se o chamador consegue influenciar nonces ou selecionar operações inseguras. |
| Registos com deteção de adulteração | Se a carga de trabalho auditada consegue modificar os registos ou invocar a assinatura de registos para conteúdo arbitrário, e o que separa estruturalmente a assinatura de transações da assinatura de registos de auditoria. |

## Aplicabilidade

Estas orientações não estão vinculadas a um release específico do software
Mojaloop. Aplicam-se à infraestrutura operada no domínio do DFSP sempre que o
comprometimento dessa infraestrutura possa ser utilizado para produzir
transações que um Hub Mojaloop aceitaria como autênticas.

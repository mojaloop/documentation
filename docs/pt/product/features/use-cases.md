
# Casos de uso

A função principal de um Hub Mojaloop é a compensação da transferência de fundos entre duas contas, cada uma delas detida num DFSP (Digital Financial Services Provider) ligado ao Hub, o que é habitualmente designado por pagamento push. Isto possibilita-lhe dar resposta a uma vasta gama de casos de uso. No entanto, este não é o único tipo de transferência que o Mojaloop permite.

A descrição seguinte dos casos de uso permitidos pelo Mojaloop está agrupada de acordo com os tipos de protocolo subjacentes, de modo a demonstrar a natureza extensível de um Hub Mojaloop. Assim, temos:
- **Pagamentos push**, que permitem os casos de uso principais de P2P, B2B, etc.;
- **Pedido de pagamento** (request to pay), que permite alguns tipos de pagamentos a comerciantes, comércio eletrónico e cobranças;
- Uma variedade de **serviços de numerário**, incluindo CICO e offline;
- **Protocolos PISP/3PPI**, que permitem a fintechs e outros desenvolver serviços como pagamentos a comerciantes, processamentos de salários de pequena escala, cobranças, etc.;
- **Pagamentos em lote**, para dar resposta a pagamentos sociais e salários à escala nacional;
- **Pagamentos transfronteiriços**, incluindo tanto remessas como pagamentos a comerciantes.

Estes são descritos com mais detalhe abaixo. Ao ler estas descrições, deve ter-se presente que muitos destes tipos de transação [permitem o transporte de metadados juntamente com o próprio pagamento](./metadata.md).

(Para uma visão dos casos de uso orientada pela API, consulte a [secção de casos de uso da documentação da API Mojaloop (em inglês)](https://docs.mojaloop.io/api/fspiop/use-cases.html#table-1))
## Casos de uso de «pagamento push»
Um Hub Mojaloop permite diretamente os seguintes casos de uso, que são todos «variantes» de pagamentos push:
- Pessoa para pessoa (**P2P**);
- Pessoa para empresa (**P2B**), incluindo formas simples de pagamentos a comerciantes, tanto presenciais como remotos (online);
- Empresa para empresa (**B2B**);
- Empresa para Governo (**B2G**);
- Formas simples de pagamentos de pessoa para Governo (**P2G**)

Em todos os tipos de pagamento a comerciantes, um pagamento pode ser facilitado utilizando IDs de comerciante (para USSD) ou códigos QR (smartphones).

## Casos de uso de «pedido de pagamento»

Para além dos pagamentos push, o Mojaloop permite transações de pedido de pagamento (Request To Pay, RTP), nas quais um beneficiário solicita um pagamento a um pagador e, _quando o pagador consente_, o DFSP deste envia (push) o pagamento ao beneficiário em seu nome. Isto permite os seguintes casos de uso:

- **Pagamentos a comerciantes**, num ambiente presencial, por exemplo utilizando um código QR;
    - 	Os aspetos práticos da configuração da solução de pagamentos a comerciantes do Mojaloop, incluindo o conteúdo dos códigos QR, são explorados em [**Como configurar pagamentos a comerciantes para o Mojaloop**](./merchant-payments.md).
    - Em todos os tipos de pagamento presencial a comerciantes, um pagamento pode ser facilitado utilizando IDs de comerciante (para USSD) ou códigos QR (smartphones).
- **Comércio eletrónico**, por vezes também conhecido como pagamentos a comerciantes remotos, quando, por exemplo, uma página de checkout (página web ou aplicação móvel) poderia incluir um botão «pagar a partir da minha conta bancária», que desencadearia um RTP.

- **Cobranças**, incluindo P2G, P2B, B2B e B2G. Isto seria habitualmente utilizado para o pagamento de faturas de serviços públicos. Também pode ser conseguido através da interface fintech/3PPI descrita abaixo - a decisão cabe a um operador do scheme (o conjunto de regras do sistema de pagamentos).

## Serviços de numerário
Um Hub Mojaloop permite diretamente as transações interoperáveis comuns de depósito/levantamento de numerário que qualquer DFSP (e os seus clientes) esperaria:
- **ATM sem cartão**, através da integração com redes de ATMs, utilizando o protocolo ISO 8583;
- **Depósito/levantamento de numerário (Cash In / Cash Out, CICO) num agente off-us**;
- **Numerário offline**:
	- Um Hub Mojaloop é capaz de dar apoio a schemes de pagamento de **numerário offline**, porque um scheme de pagamento desse tipo é visto como numerário - ainda que digital. Assim, um levantamento para uma carteira de numerário offline (um carregamento) é análogo a uma transação de «cash out»; e um depósito a partir de uma carteira de numerário offline (um descarregamento) é análogo a uma transação de «cash in». No entanto, o operador de um scheme desse tipo poderá considerar que todas essas transações de carregamento/descarregamento de carteira, sejam on-us ou off-us, deveriam ser processadas através do Hub Mojaloop, para facilitar a reconciliação por parte do scheme offline.

## Casos de uso «3PPI» - fintechs e outros
Um Hub Mojaloop permite diretamente a iniciação de pagamentos por terceiros (Third Party Payment Initiation, 3PPI), de modo que os prestadores de serviços de iniciação de pagamentos (PISPs) - mais conhecidos como fintechs - possam, utilizando as suas próprias aplicações para smartphone, recrutar clientes e oferecer-lhes um serviço de pagamentos unificado ou melhorado. A maioria dos DFSPs ligados a um Hub Mojaloop pode disponibilizar serviços 3PPI, se tiver um back office razoavelmente moderno.

Uma fintech pode utilizar o serviço 3PPI para iniciar um pedido de pagamento (Request To Pay, RTP) - pedindo ao DFSP do seu cliente que inicie um pagamento a um beneficiário. Isto permite os seguintes casos de uso:
-	**Cobranças**, em particular P2G e P2B;
-	**Pagamentos de salários**, essencialmente o processamento de uma lista de pagamentos em lote, em nome de pequenas/médias empresas;
-	**Pagamentos a comerciantes** (P2B), utilizando um código QR para a iniciação.

## Casos de uso de «pagamento em lote»
Qualquer serviço de pagamentos precisa de facilitar pagamentos em lote, e o Mojaloop oferece este serviço utilizando um modelo extremamente eficiente. Todos os DFSPs, exceto os mais pequenos de todos, são capazes de oferecer este serviço aos seus clientes, permitindo-lhes submeter listas de pagamentos que podem chegar a todos os clientes de todos os DFSPs ligados. Isto dá apoio a:
- **Pensões, pagamentos sociais e outros** (G2P);
- **Salários** (G2P e B2P).

Além disso, a funcionalidade de pagamento em lote está disponível através do **serviço 3PPI** (acima), o que permitiria a todos os DFSPs - mesmo aos mais pequenos de todos - oferecer um serviço de pagamentos em lote de menor escala, quer através de uma fintech, quer diretamente através do seu próprio serviço 3PPI.


## Casos de uso «transfronteiriços»

Um Hub Mojaloop pode permitir que os clientes de um DFSP enviem dinheiro para além-fronteiras de forma económica, facilitando o processo de câmbio (FX) como parte da transação. Isto permite os seguintes casos de uso:
- **P2P** e **P2B** (enviar dinheiro a amigos e familiares noutro país, ou pagar uma fatura noutro país);
- **Pagamentos a comerciantes**, utilizando RTP transfronteiriço (permitindo, por exemplo, que um pequeno comerciante que pretenda atravessar uma fronteira próxima para negociar num mercado local receba pagamentos na moeda local)

Para explorar os aspetos do ecossistema Mojaloop que tornam isto possível, recomenda-se a consulta de:
1. A capacidade de ligar um Hub Mojaloop a schemes de pagamento vizinhos, quer no mesmo país quer noutro local, de modo a permitir a interoperabilidade. Esta capacidade [**é apresentada aqui**](./InterconnectingSchemes.md).
  
2. O apoio a que prestadores de serviços de câmbio (FXPs) se liguem a um Hub Mojaloop e ofereçam serviços de câmbio (FX). Nem o pagador nem o beneficiário precisam de definir a moeda a utilizar numa transação; cada um transaciona na sua própria moeda, e o(s) Hub(s) Mojaloop facilita(m) o intercâmbio. Esta capacidade [**é apresentada aqui**](./ForeignExchange.md).

3. Como as capacidades de interligação/inter-scheme e de câmbio são combinadas para permitir [**transações transfronteiriças**](./CrossBorder.md).
## Outros; pagamentos com cartão
Muitos potenciais adotantes perguntam sobre a possibilidade de utilizar o Mojaloop para encaminhar (switch) transações com cartão. A resposta é que, de uma perspetiva técnica, é perfeitamente possível encaminhar uma transação com cartão através de um switch; o número de conta pessoal (Personal Account Number, PAN) do cartão pode ser utilizado como alias para iniciar uma transação RTP, sobretudo porque o número de identificação bancária (Bank Identification Number, BIN), que faz parte do PAN, identifica o DFSP que detém a conta do cliente, para o qual o RTP deve ser encaminhado.

No entanto, na prática, o dispositivo de ponto de venda (Point of Sale, PoS) do cartão teria de ser atualizado para encaminhar as transações em conformidade; as transações domésticas através de um RTP para o switch Mojaloop, as restantes para a rede de cartões emissora. E esses dispositivos PoS pertencem frequentemente aos bancos adquirentes, que poderão ser pouco propensos a conceder acesso (os grandes retalhistas, que frequentemente são donos dos seus dispositivos PoS, normalmente integrados, poderão ser mais recetivos).

Além disso, reencaminhar transações iniciadas com um cartão que ostenta o logótipo de um scheme de pagamentos internacional seria totalmente inapropriado e colocaria quase de certeza todos os envolvidos numa posição jurídica precária. Consequentemente, isto é algo que só deveria alguma vez ser considerado quando é utilizado um scheme de cartões doméstico e o proprietário desse scheme está disposto a que os seus cartões sejam utilizados desta forma.

Por fim, utilizar tal abordagem para cartões de débito corresponde mais de perto a uma transação RTP do Mojaloop; utilizá-la para um cartão de crédito, o que poderá incluir a colocação de uma reserva de fundos numa conta (ao fazer o check-in num hotel, por exemplo), acrescentaria complexidade adicional.

## Casos de uso alargados

Para além destes casos de uso padrão, o Mojaloop permite a implementação, pelos adotantes, de casos de uso mais complexos, que acrescentam funcionalidades adicionais e são construídos em camadas sobre os casos de uso padrão.

Estes casos de uso específicos de cada scheme podem ser facilmente adicionados pelos operadores de scheme individuais.

## Aplicabilidade

Esta versão deste documento diz respeito à versão [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0) do Mojaloop

## Histórico do documento
  |Versão|Data|Autor|Detalhe|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.6|24 de julho de 2025| Paul Makin|Corrigidas algumas ligações quebradas.|
|1.5|16 de julho de 2025| Paul Makin|Alterados os subtítulos para refletir a forma como o texto introdutório fala dos casos de uso. Refinadas as descrições. Adicionada uma ligação a uma descrição dos metadados. Adicionada uma nota sobre transações com cartão.|
|1.4|12 de junho de 2025| Paul Makin|Alargado o texto introdutório para explicar o agrupamento dos casos de uso.|
|1.3|10 de junho de 2025| Paul Makin|Adicionada uma descrição de pagamentos de comércio eletrónico utilizando RTP. Renomeados os pagamentos 3PPI como pagamentos fintech. Clarificada a iniciação de pagamentos em lote via 3PPI. Por fim, algumas atualizações cosméticas para destacar as hiperligações para outros documentos.|
|1.2|14 de abril de 2025| Paul Makin|Atualizações relacionadas com o release da V17, incluindo ligações para a documentação inter-scheme e de FX.|

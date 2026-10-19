# Pagamentos a comerciantes

!!!! **TRABALHO EM CURSO - SERÁ CONCLUÍDO EM BREVE** !!!!

## Onde se enquadram os pagamentos a comerciantes
No mundo Mojaloop, os pagamentos a comerciantes não são algo que esteja integrado no próprio hub. Em vez disso, trata-se de um serviço de sobreposição (overlay), que utiliza os serviços do hub, e que faz parte do pacote completo de código aberto do Mojaloop.

Em termos de operação do scheme (o conjunto de regras do sistema de pagamentos), um scheme de pagamentos a comerciantes poderia ser oferecido como parte de um serviço de pagamentos global pelo operador do Hub Mojaloop. Também é possível que um scheme de pagamentos a comerciantes seja oferecido por um operador totalmente distinto, em colaboração com o operador do Hub.
## Conceitos
Os comerciantes devem ser registados como tal no modelo Mojaloop (note-se que isto é diferente de estar registado como empresa; o modelo de «empresário em nome individual» também é permitido). Durante este processo, os dados KYB do comerciante são recolhidos no Merchant Registry (registo de comerciantes), e é gerado um ID de comerciante independente do DFSP. Este ID de comerciante pode ser exibido pelos comerciantes nas suas instalações, para efeitos de pagamentos por USSD por clientes com telemóveis básicos (feature phones). Destina-se também a ser incorporado em códigos QR estáticos, para leitura por clientes com smartphones cuja aplicação do DFSP seja compatível com esta funcionalidade.

O modelo adotado para os pagamentos a comerciantes baseia-se num pagamento push P2B. A capacidade de resolução de aliases do Hub Mojaloop é utilizada para resolver os IDs de comerciante (quer extraídos de um código QR, quer introduzidos diretamente via USSD) em contas de comerciante nos DFSPs participantes. Isto garante que nenhuma informação sensível é divulgada através da exibição dos DFSPs ou dos números de conta dos comerciantes. Quando utilizado com um código QR, a boa prática consiste em exibir o nome comercial do comerciante ao cliente para verificação, e em pedir-lhe que introduza o valor da transação e se autentique (por exemplo, introduzindo um PIN) para autorizar a transação. Uma vez concluída a transação, tanto o cliente como o comerciante receberão uma notificação, e o comerciante pode então entregar o(s) artigo(s) comprado(s) ao cliente.
## Registo
O registo de comerciantes destina-se a ser efetuado pelos DFSPs, como parte da sua relação com o comerciante no seu papel de «emissor». Os dados do comerciante são mantidos num Merchant Registry partilhado, mas o DFSP que efetua o registo mantém a sua relação com o comerciante.

Os dados do comerciante recolhidos

![Diagrama de entidades e relações dos pagamentos a comerciantes](../../../product/features/ecosystem.svg)





No momento do registo, é recolhida uma quantidade significativa de informação sobre o comerciante no Merchant Registry. 

Endereçamento:
USSD vs QR
Merchant Registry - a ligação aos LEI
Criação de um código QR (com referência à EMVCo)
Personalização do código QR - como torná-lo conforme à norma de um scheme ou de um país.

No futuro: ligação à GLEIF

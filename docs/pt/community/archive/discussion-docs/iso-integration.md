---
i18n_source_sha: 333ed87296f52100e8e2fc477e9a0d390e2a2404
---

Discussões sobre a integração ISO no Mojaloop

# Integração Mojaloop-ISO
 
A solução proposta seria capaz de tratar a tradução de ISO para Open API e vice-versa, recorrendo a um plug-in ou interface conversor/conector ISO-OPEN API, semelhante ao Scheme Adapter do sistema Mojaloop. Tal como o Scheme adapter faz a conversão da API Mojaloop para a API do FSP, o plug-in/interface personalizado funcionaria como tradutor de protocolo e de mensagens entre a interface ISO e a API ML ou o Scheme Adapter.

## Âmbito

Definir os fluxos de mensagens nas redes ISO e Open API e os mapeamentos entre as mensagens.
 -  Documentar os cenários de falha e os respetivos fluxos de mensagens.
 -  Definir um mecanismo de encaminhamento baseado em MSISDN .
 -  As transações Mojaloop poderiam ser enviadas através dos canais de pagamento existentes, em conformidade com as respetivas normas (como a ISO)
 -  Desenvolver um scheme adapter/plug-ins que pudessem fazer a conversão de ISO para Open API e vice-versa.
 -  Conseguir enviar transações Mojaloop com origem em ATM e POS através de redes ISO, entre sistemas Mojaloop
 
 ## ISO 8583 - Mojaloop - Um estudo de caso entre redes
 
A África é um grande continente, com uma multiplicidade de prestadores de serviços financeiros centrados na inclusão financeira e na prestação de serviços de âmbito regional. O continente dispõe de uma vasta rede de prestadores de serviços de pagamento e de instituições financeiras. Algumas das redes mais proeminentes estão listadas abaixo:

-   InterSwitch ( Nigéria)
-   eProcess ( Gana)
-   Umoja Switch ( Tanzânia)
-   KenSwitch ( Quénia)
-   ZimSwitch ( Zimbabué)
-   RSwitch ( Ruanda)

Praticamente todas estas redes utilizam uma plataforma de processamento de pagamentos baseada em ISO 8583 ( Postilion Switch) para operar canais de ATM, POS e móveis e para processar transações com e sem cartão, tanto na vertente de aquisição como na de emissão.

Assim, a proposta é criar uma solução em que as redes de pagamentos existentes se possam integrar com um sistema baseado em Mojaloop, como o Mowali, sem terem de fazer quaisquer alterações de desenvolvimento ou de design à sua infraestrutura existente.

Neste estudo de caso, consideramos o caso do Umoja Switch, na Tanzânia, e disponibilizamos-lhe uma solução através da qual o Umoja poderia disponibilizar transações Mojaloop nos seus deployments de ATM existentes.

### Umoja Switch

O UmojaSwitch foi criado em 2006 por seis bancos da Tanzânia, com o objetivo principal de conseguir estabelecer uma infraestrutura conjunta e partilhada para os serviços financeiros e de beneficiar de economias de escala.

O objetivo da criação era constituir uma plataforma partilhada em que as instituições financeiras se pudessem integrar e interpolar através de um switch partilhado. 

Com o tempo, o número de membros que aderiram à rede UmojaSwitch continuou a aumentar e, neste momento, há cerca de 27 bancos que aderiram ao consórcio Umoja Switch.

## Das redes ISO para a Open API

O objetivo do PoC seria demonstrar como uma transação Mojaloop seria enviada através de um switch/rede ISO padrão até um sistema Mojaloop como o Mowali.

No âmbito disto, seria implementado um adaptador ISO-Open API que processaria as mensagens ISO com origem numa rede ISO, como a InterSwitch, e as enviaria para uma rede Open API, como o Mowali.

## Solução proposta

A solução proposta consistirá numa interface ou adaptador/plugin que possa processar transações entre redes ISO e sistemas Mojaloop. 

A plataforma de pagamentos ISO utiliza uma interface ISO que recorre a uma ligação TCP/IP padrão para enviar e responder a mensagens ISO de e para os vários canais. Para aceitar e processar as ligações da interface, a nossa solução teria um listener TCP/IP, que receberia e processaria as transações da rede ISO e as mapearia depois para Open API, após o que as transações seriam enviadas para um sistema Mojaloop como o Mowali, num URL.

Neste caso, as redes de pagamentos dependem em grande medida do respetivo número de cartão ou de conta (ou seja, Visa/MasterCard/Verve/etc.), que é utilizado para definir a tabela de consulta de BIN para efeitos de encaminhamento . Uma das opções seria predefinir um intervalo de BIN (por exemplo: 757575) que identificaria uma transação Mojaloop e deixar depois que a rede de pagamentos implementasse uma lógica de encaminhamento que enviasse todas as transações Moja para a rede Open API.

O adaptador ISO-Open API processaria a mensagem ISO recebida do switch ISO e enviá-la-ia para o sistema Mojaloop em formato Open API.

No entanto, tais alterações implicariam alterações de configuração para descarregar aplicações nos ATM e noutros terminais, mas isso poderia ser tratado como uma alteração operacional padrão, semelhante às alterações de configuração já existentes, efetuadas de acordo com os requisitos de negócio.

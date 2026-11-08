# Hashed Timelock Contracts
O Mojaloop utiliza os bloqueios criptográficos do ILP para garantir transferências atómicas e condicionais entre DFSP (Digital Financial Services Providers). O mecanismo centra-se nos Hashed Timelock Contracts (HTLC), que permitem ao Mojaloop realizar transferências condicionais — garantindo que uma transferência ou se conclui integralmente em todas as partes participantes, ou não se conclui de todo.

Um contrato é acordado entre o DFSP beneficiário e o DFSP pagador durante a fase de acordo de termos de uma transação Mojaloop, que começa quando o DFSP pagador propõe uma transação, por meio de um pedido de cotação. 

Quando o DFSP beneficiário está convicto de que a transação pode avançar (tendo concluído as suas próprias verificações internas), o DFSP beneficiário:
-	Altera os termos propostos da transação para estabelecer as condições em que realizará a transação (que podem incluir, por exemplo, as comissões que irá cobrar e quaisquer condições de conformidade);
-	Cria o objeto Transaction, que define os termos em que está preparado para honrar o pedido de pagamento;
-	Cria e retém o Fulfilment (cumprimento), que é um hash do objeto Transaction, por sua vez assinado com a chave privada do DFSP beneficiário (uma chave criada especificamente para este fim, e a ele restrita);
-	Cria a Condition (condição), que é um hash do Fulfilment;
-	Anexa a Condition ao objeto Transaction;
-	E devolve-o ao DFSP pagador numa resposta de cotação.

Se o DFSP pagador aceitar os termos da transação, envia um pedido de transferência, composto pelo objeto Transaction, pela Condition recebida e por um tempo de expiração, para o Hub Mojaloop. 

O Hub Mojaloop armazena a Condition e reencaminha o pedido de transferência para o DFSP beneficiário. Inicia também um temporizador correspondente ao tempo de expiração especificado. 

Ao receber o pedido de transferência, o DFSP beneficiário: 
-	Verifica que a Condition recebida corresponde à acordada (isto inclui uma verificação de que o pagamento pedido é o mesmo que o pagamento que aceitou) e certifica-se de que as condições de conformidade foram cumpridas;
-	Devolve o Fulfilment ao Hub Mojaloop numa resposta de transferência.

O Hub Mojaloop calcula o hash do Fulfilment devolvido para validar que corresponde à Condition recebida do DFSP pagador e, em caso de sucesso, notifica o DFSP pagador (e o DFSP beneficiário, se tal tiver sido pedido) de que foi criada uma obrigação entre eles; ou seja, de que o pagamento foi compensado.

A notificação ao DFSP pagador inclui o fulfilment, que funciona como prova criptográfica de conclusão irrevogável. Se o DFSP pagador voltar a gerar a Condition e constatar que esta difere da acordada, deverá então abrir um litígio junto do DFSP beneficiário.

Note-se que, se o temporizador da transação expirar no Hub antes de o Fulfilment ser recebido do DFSP beneficiário, o Hub notificará cada DFSP de que a transação foi cancelada.

## Aplicabilidade
Este documento diz respeito à versão 17.0.0 do Mojaloop
## Histórico do documento
  |Versão|Data|Autor|Detalhe|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|2 de julho de 2025| Paul Makin|Atualizado após revisão por Michael Richards|
|1.0|30 de junho de 2025| Paul Makin|Versão inicial|
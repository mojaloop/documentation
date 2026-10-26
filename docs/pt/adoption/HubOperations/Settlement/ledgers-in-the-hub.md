# Razões gerais no Hub

## Gestão do risco

Elementos do processo de liquidação situam-se fora do controlo do Hub, pelo que é importante que existam vários controlos para impedir o desaparecimento de fundos e para assegurar que existe sempre liquidez para sustentar o funcionamento do Hub. Para além do [Net Debit Cap](settlement-basic-concepts.md#gestao-de-liquidez-net-debit-cap), o Hub utiliza várias razões gerais internas para gerir o risco e assegurar a liquidez. São as seguintes:

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th>Razão geral</th>
<th>Definição</th>
<th>Tipo de transferência registada na razão geral</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Razão Geral de Posição do DFSP</p></td>
<td><p>Acompanha quanto um DFSP deve ou lhe é devido. Sempre que uma transferência é processada, a Posição no Hub é ajustada em tempo real.</p></td>
<td><p>Transferência P2P: uma transação entre pessoas realizada entre utilizadores finais de DFSP.<br />
<br />
Transferência de liquidação: o fluxo de fundos entre DFSP destinado a reconciliar as razões gerais e a atualizar as Posições para uma dada janela de liquidação.</p></td>
</tr>
<tr class="even">
<td><p>Razão Geral de Liquidação do DFSP</p></td>
<td><p>A conta de liquidez do DFSP detida no banco de liquidação, espelhada no Hub. Funciona como conta de reconciliação e espelha o movimento de fundos reais.</p></td>
<td><p>Transferência de fundos (entrada e saída): o movimento de fundos iniciado pelo DFSP ou a confirmação pelo banco de liquidação de que a liquidação foi concluída.</p></td>
</tr>
<tr class="odd">
<td><p>Razão Geral de Liquidação Líquida Multilateral do Hub (HMLNS)</p></td>
<td><p>Utilizada para registar o lançamento de contrapartida relativo à liquidação líquida entre DFSP. Depois de uma janela de liquidação ter sido fechada e liquidada entre todos os DFSP, o seu saldo regressa a zero.</p></td>
<td><p>Transferência de liquidação: o fluxo de fundos entre DFSP destinado a reconciliar as razões gerais e a atualizar as Posições para uma dada janela de liquidação.</p></td>
</tr>
<tr class="even">
<td><p>Razão Geral de Reconciliação do Hub</p></td>
<td><p>Assegura que os movimentos de entrada e saída das contas de liquidez e registados nas Razões Gerais de Liquidação estão equilibrados. O saldo é o montante que o Operador do Hub administra em todas as Razões Gerais de Liquidação dos DFSP participantes.<br />
<br />
Funciona como conta de controlo e acompanha o movimento de fundos em todas as Razões Gerais de Liquidação dos DFSP (que espelham o movimento de fundos reais).</p></td>
<td><p>Transferência de fundos (entrada e saída): o movimento de fundos iniciado pelo DFSP ou a confirmação pelo banco de liquidação de que a liquidação foi concluída.</p></td>
</tr>
</tbody>
</table>

## Compreender os princípios contabilísticos

Na contabilidade, uma posição líquida positiva (mais débitos) é tratada como um ativo, ao passo que uma posição líquida negativa (mais créditos) é tratada como um passivo. O Hub Mojaloop aplica estes mesmos princípios, mas na perspetiva do Hub. O que significa isto?

Uma transferência é registada pelo Hub como um débito (DR) do lado do DFSP pagador, porque a transferência reduz o montante que é devido a esse DFSP (passivo reduzido na perspetiva do Hub). Assim, enquanto o próprio DFSP pagador trata a transferência como um aumento do seu passivo no seu próprio sistema, o Hub trata a transferência como um aumento do seu ativo.

A mesma transferência é registada pelo Hub como um crédito (CR) do lado do DFSP beneficiário, porque a transferência aumenta o montante devido a esse DFSP (passivo aumentado na perspetiva do Hub).

Registar uma transação em duas contas como lançamentos opostos de débito e crédito (de montantes iguais) é o que se designa por «partidas dobradas» na contabilidade.

Aplicando os princípios contabilísticos acima a um depósito efetuado por um DFSP na conta de liquidez do DFSP, o montante cria um passivo na perspetiva do Hub (o dinheiro tem de ser devolvido). O montante que é lançado no Hub é, por conseguinte, negativo. Deste modo, em qualquer momento, o montante que o Hub deve a qualquer DFSP pode ser rapidamente calculado somando a Posição do DFSP ao saldo da sua conta de liquidez. O lançamento por partidas dobradas relativo à Razão Geral de Liquidação do DFSP é adicionado à Razão Geral de Reconciliação do Hub.

## Liquidação: um exemplo

Esta secção demonstra como uma transação é registada nas várias razões gerais, recorrendo a um exemplo simples.

Tomemos o seguinte exemplo: o DFSP1 envia 50 USD ao DFSP2. Eis como esta transação de exemplo é registada nas razões gerais do Hub.

### Passo 1a: reservar o montante da transferência para o remetente na Razão Geral de Posição

A Razão Geral de Posição do DFSP é utilizada para acompanhar as alterações na Posição de um DFSP. Uma vez fechada uma janela de liquidação e iniciado o processo de liquidação, o montante da transferência é reservado nas Razões Gerais de Posição do Hub mantidas para os DFSP, bem como na Razão Geral de Liquidação Líquida Multilateral do Hub. Reservar o montante da transferência para o DFSP pagador (DFSP1) garante que os fundos não podem ser utilizados noutra transferência.

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr class="header">
<th colspan="2"><strong>Razão Geral de Posição do DFSP1</strong></th>
<th colspan="2"><strong>Razão Geral de Liquidação Líquida Multilateral do Hub</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
</tr>
<tr class="even">
<td><p>50 USD</p></td>
<td></td>
<td></td>
<td><p>50 USD</p></td>
</tr>
</tbody>
</table>

### Passo 1b: reservar o montante da transferência para o destinatário na Razão Geral de Posição

De forma semelhante, a Posição do DFSP beneficiário é igualmente acompanhada através da Razão Geral de Posição do DFSP.

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr class="header">
<th colspan="2"><strong>Razão Geral de Posição do DFSP2</strong></th>
<th colspan="2"><strong>Razão Geral de Liquidação Líquida Multilateral do Hub</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
</tr>
<tr class="even">
<td></td>
<td><p>50 USD</p></td>
<td><p>50 USD</p></td>
<td></td>
</tr>
</tbody>
</table>

### Passo 2a: confirmar o montante da transferência para o remetente na Razão Geral de Posição

Na sequência da reserva do montante da transferência, o passo seguinte é confirmar o montante nas mesmas razões gerais de antes.

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr class="header">
<th colspan="2"><strong>Razão Geral de Posição do DFSP1</strong></th>
<th colspan="2"><strong>Razão Geral de Liquidação Líquida Multilateral do Hub</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
</tr>
<tr class="even">
<td><p>50 USD</p></td>
<td></td>
<td></td>
<td><p>50 USD</p></td>
</tr>
</tbody>
</table>

### Passo 2b: confirmar o montante da transferência para o destinatário na Razão Geral de Posição

Confirmar o montante da transferência para o DFSP beneficiário (DFSP2) permite que o DFSP envie fundos a outros DFSP, se assim o desejar.

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr class="header">
<th colspan="2"><strong>Razão Geral de Posição do DFSP2</strong></th>
<th colspan="2"><strong>Razão Geral de Liquidação Líquida Multilateral do Hub</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
</tr>
<tr class="even">
<td></td>
<td><p>50 USD</p></td>
<td><p>50 USD</p></td>
<td></td>
</tr>
</tbody>
</table>

### Passo 3: reservar o montante da transferência para o remetente na Razão Geral de Liquidação

Uma vez que as Posições se encontram num estado controlado e que os correspondentes lançamentos de débito e crédito foram registados na Razão Geral de Liquidação Líquida Multilateral do Hub, a transação tem de ser registada e reservada também nas Razões Gerais de Liquidação dos DFSP e na Razão Geral de Reconciliação do Hub, para assegurar que os fundos não são libertados inadvertidamente para outra operação de Funds-Out.

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr class="header">
<th colspan="2"><strong>Razão Geral de Liquidação do DFSP1</strong></th>
<th colspan="2"><strong>Razão Geral de Reconciliação do Hub</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
</tr>
<tr class="even">
<td><p>50 USD</p></td>
<td></td>
<td></td>
<td><p>50 USD</p></td>
</tr>
</tbody>
</table>

### Passo 4a: confirmar o montante da transferência para o destinatário na Razão Geral de Liquidação

Uma vez movimentado dinheiro real nas contas de liquidez dos DFSP, os montantes das transferências podem ser confirmados nas Razões Gerais de Liquidação dos DFSP e na Razão Geral de Reconciliação do Hub. O movimento de fundos é registado primeiro para o DFSP beneficiário.

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr class="header">
<th colspan="2"><strong>Razão Geral de Liquidação do DFSP2</strong></th>
<th colspan="2"><strong>Razão Geral de Reconciliação do Hub</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
</tr>
<tr class="even">
<td></td>
<td><p>50 USD</p></td>
<td><p>50 USD</p></td>
<td></td>
</tr>
</tbody>
</table>

### Passo 4b: confirmar o montante da transferência para o remetente na Razão Geral de Liquidação

Por fim, o montante da transferência é também confirmado do lado do remetente.

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr class="header">
<th colspan="2"><strong>Razão Geral de Liquidação do DFSP1</strong></th>
<th colspan="2"><strong>Razão Geral de Reconciliação do Hub</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
</tr>
<tr class="even">
<td><p>50 USD</p></td>
<td></td>
<td></td>
<td><p>50 USD</p></td>
</tr>
</tbody>
</table>

## Adicionar/levantar fundos: um exemplo

### Adicionar fundos

Uma vez que os fundos das contas de liquidez flutuam, os DFSP adicionam fundos para financiar os seus envios líquidos ou procuram efetuar levantamentos. Os depósitos podem ocorrer sempre que se pretenda, mas a Razão Geral de Reconciliação do Hub tem de ser atualizada regularmente, para evitar problemas de reconciliação. Sempre que é feita uma alteração à conta externa (isto é, a conta de liquidez do DFSP), o Net Debit Cap tem também de ser avaliado.

No exemplo seguinte, o DFSP1 adiciona 100 000 USD à sua conta de liquidez. É assim que o montante do depósito é registado nas razões gerais do Hub.

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr class="header">
<th colspan="2"><strong>Razão Geral de Liquidação do DFSP1</strong></th>
<th colspan="2"><strong>Razão Geral de Reconciliação do Hub</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
</tr>
<tr class="even">
<td></td>
<td><p>100 000 USD</p></td>
<td><p>100 000 USD</p></td>
<td></td>
</tr>
</tbody>
</table>

### Levantar fundos

Uma vez que um levantamento pode ter impacto no Net Debit Cap e na capacidade de transacionar, o NDC tem de ser recalculado à luz do novo saldo do DFSP (o saldo nunca pode ser inferior ao NDC).

No exemplo seguinte, o DFSP2 levanta 100 000 USD da sua conta de liquidez. É assim que o montante do levantamento é registado nas razões gerais do Hub.

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr class="header">
<th colspan="2"><strong>Razão Geral de Liquidação do DFSP2</strong></th>
<th colspan="2"><strong>Razão Geral de Reconciliação do Hub</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
</tr>
<tr class="even">
<td><p>100 000 USD</p></td>
<td></td>
<td></td>
<td><p>100 000 USD</p></td>
</tr>
</tbody>
</table>

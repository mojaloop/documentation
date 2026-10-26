# Processo de liquidação

É importante definir um processo de negócio em torno da gestão da liquidação. O processo geral seguinte serve de exemplo, podendo ser adaptado às especificidades das necessidades de cada organização.

<table>
<caption><strong>Processo de negócio da liquidação</strong></caption>
<colgroup>
<col style="width: 14%" />
<col style="width: 85%" />
</colgroup>
<thead>
<tr class="header">
<th>Etapa</th>
<th>Detalhes</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>1</p></td>
<td><p>O Operador do Hub <a href="settling.html">fecha a janela de liquidação e inicia a liquidação das janelas selecionadas através do Finance Portal</a>.</p></td>
</tr>
<tr class="even">
<td><p>2</p></td>
<td><p>O Operador do Hub obtém um Relatório de Liquidação do DFSP para cada DFSP que esteve ativo na janela de liquidação.</p></td>
</tr>
<tr class="odd">
<td><p>3</p></td>
<td><p>O Operador do Hub envia por e-mail o Relatório de Liquidação do DFSP para os pontos de contacto designados de cada DFSP.</p></td>
</tr>
<tr class="even">
<td><p>4</p></td>
<td><p>Os DFSP analisam o seu relatório e reconciliam as transações com os seus próprios registos em tempo útil.</p>
<p>O relatório fornece informação sobre a posição de liquidação bilateral do DFSP com cada DFSP com quem transacionou (enquanto DFSP Pagador ou DFSP Beneficiário) na(s) janela(s) de liquidação a liquidar. Fornece também o somatório dos montantes de transferência enviados e recebidos pelo DFSP na(s) janela(s) de liquidação.</p></td>
</tr>
<tr class="odd">
<td><p>5</p></td>
<td><p>O Operador do Hub obtém o Relatório do Banco de Liquidação.</p></td>
</tr>
<tr class="even">
<td><p>6</p></td>
<td><p>O Operador do Hub notifica os pontos de contacto do banco de liquidação de que a liquidação pode ser executada, partilhando o Relatório do Banco de Liquidação.</p><p>O relatório funciona como instruções de pagamento ao banco e fornece a posição de liquidação bilateral de cada DFSP face a todos os outros DFSP que transacionaram na(s) janela(s) de liquidação a liquidar. Fornece também o somatório dos montantes de transferência enviados e recebidos por cada DFSP.</p></td>
</tr>
<tr class="odd">
<td><p>7</p></td>
<td><p>O banco de liquidação movimenta fundos entre a conta de liquidação e as contas de liquidez dos DFSP, em conformidade com as Posições líquidas agregadas indicadas no Relatório do Banco de Liquidação.</p></td>
</tr>
<tr class="even">
<td><p>8</p></td>
<td><p>O banco de liquidação confirma que os fundos foram movimentados e (uma vez que o Operador do Hub não tem visibilidade sobre o saldo das contas detidas no banco de liquidação) partilha o saldo da conta de liquidez de cada DFSP.</p></td>
</tr>
<tr class="odd">
<td><p>9</p></td>
<td><p>O Operador do Hub <a href="settling.html">finaliza a liquidação através do Finance Portal</a>.</p></td>
</tr>
<tr class="even">
<td><p>10</p></td>
<td><p>O Operador do Hub <a href="monitoring-dfsp-financial-details.html">verifica os saldos das contas de liquidez dos DFSP face aos saldos apresentados no portal</a> e atualiza-os, se necessário, através da <a href="recording-funds-in-out.html">funcionalidade «add/withdraw funds» do portal</a>. Note-se que isto pode levar ao recálculo do NDC do DFSP, o que pode fazer com que as transações de saída do DFSP sejam recusadas pelo Hub.</p></td>
</tr>
<tr class="odd">
<td><p>11</p></td>
<td><p>O Operador do Hub obtém um Relatório de Resultado de Liquidação do DFSP para cada DFSP.</p></td>
</tr>
<tr class="even">
<td><p>12</p></td>
<td><p>O Operador do Hub notifica cada DFSP do resultado da liquidação e do saldo da sua conta de liquidez, enviando o Relatório de Resultado de Liquidação do DFSP a cada DFSP.</p></td>
</tr>
</tbody>
</table>

# Aceder ao portal

Ao aceder ao portal, é apresentado um pedido de autenticação. Introduza as suas credenciais na página de início de sessão.

<img src="../../../../.vuepress/public/portal_login.png" width="40%" height="40%" />

O portal implementa controlo de acesso baseado em funções, o que significa que a função atribuída determina o conjunto de funcionalidades do portal disponíveis. Atualmente, existem as seguintes funções:

* `portaladmin`: tem acesso total a todas as funcionalidades do portal
* `portaluser`: tem acesso limitado às funcionalidades do portal

A tabela seguinte enumera todas as funcionalidades disponíveis, os caminhos de navegação onde é possível aceder-lhes e as permissões das funções aplicáveis.

<table>
<caption><strong>Funcionalidades do portal e caminhos de navegação</strong></caption>
<colgroup>
<col style="width: 30%" />
<col style="width: 30%" />
<col style="width: 20%" />
<col style="width: 20%" />
</colgroup>
<thead>
<tr class="header">
<th>Funcionalidade</th>
<th>Caminho de navegação</th>
<th>portaladmin</th>
<th>portaluser</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><a href="managing-windows.html">Consultar os detalhes das janelas de liquidação</a></p></td>
<td><p><strong>Settlement</strong> &gt; <strong>Settlement Windows</strong></p></td>
<td><p>✓</p></td>
<td><p>✓</p></td>
</tr>
<tr class="even">
<td><p><a href="settling.html#fechar-uma-janela-de-liquidacao">Fechar janelas de liquidação</a></p></td>
<td><p><strong>Settlement</strong> &gt; <strong>Settlement Windows</strong></p></td>
<td><p>✓</p></td>
<td><p>✓</p></td>
</tr>
<tr class="even">
<td><p><a href="settling.html#liquidar-uma-janela-de-liquidacao-fechada">Liquidar janelas de liquidação</a></p></td>
<td><p><strong>Settlement</strong> &gt; <strong>Settlement Windows</strong></p></td>
<td><p>✓</p></td>
<td><p>✓</p></td>
</tr>
<tr class="even">
<td><p><a href="settling.html#finalizar-uma-liquidacao">Finalizar a liquidação</a></p></td>
<td><p><strong>Settlement</strong> &gt; <strong>Settlement Windows</strong></p></td>
<td><p>✓</p></td>
<td><p>✓</p></td>
</tr>
<tr class="odd">
<td><p><a href="checking-settlement-details.html">Consultar os detalhes da liquidação</a></p></td>
<td><p><strong>Settlement</strong> &gt; <strong>Settlements</strong></p></td>
<td><p>✓</p></td>
<td><p>✓</p></td>
</tr>
<tr class="odd">
<td><p><a href="monitoring-dfsp-financial-details.html">Consultar os detalhes financeiros dos DFSP</a></p></td>
<td><p><strong>Participants</strong> &gt; <strong>DFSP Financial Positions</strong></p></td>
<td><p>✓</p></td>
<td><p>✓</p></td>
</tr>
<tr class="even">
<td><p><a href="enabling-disabling-transactions.html">Desativar e reativar transações de um DFSP</a></p></td>
<td><p><strong>Participants</strong> &gt; <strong>DFSP Financial Positions</strong></p></td>
<td><p>✓</p></td>
<td><p>✓</p></td>
</tr>
<tr class="odd">
<td><p><a href="recording-funds-in-out.html">Registar depósitos ou levantamentos nas contas de liquidez dos DFSP</a></p></td>
<td><p><strong>Participants</strong> &gt; <strong>DFSP Financial Positions</strong></p></td>
<td><p>✓</p></td>
<td><p>✓</p></td>
</tr>
<tr class="even">
<td><p><a href="updating-ndc.html">Atualizar o Net Debit Cap de um DFSP</a></p></td>
<td><p><strong>Participants</strong> &gt; <strong>DFSP Financial Positions</strong></p></td>
<td><p>✓</p></td>
<td><p>x</p></td>
</tr>
<tr class="odd">
<td><p><a href="searching-for-transfer-data.html">Pesquisar dados de transferências</a></p></td>
<td><p><strong>Transfers</strong> &gt; <strong>Find Transfers</strong></p></td>
<td><p>✓</p></td>
<td><p>✓</p></td>
</tr>
</tbody>
</table>

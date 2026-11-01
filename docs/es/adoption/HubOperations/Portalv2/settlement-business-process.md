---
i18n_source_sha: 31103b46ea3b4894f034556d3802822749a5bedc
---

# Proceso de liquidación

Es importante definir un proceso de negocio en torno a la gestión de la liquidación. El siguiente proceso de alto nivel sirve de ejemplo que puede personalizar según las necesidades concretas de su organización.

<table>
<caption><strong>Proceso de negocio de la liquidación</strong></caption>
<colgroup>
<col style="width: 14%" />
<col style="width: 85%" />
</colgroup>
<thead>
<tr class="header">
<th>Paso</th>
<th>Detalles</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>1</p></td>
<td><p>El Operador del Hub <a href="settling.html">cierra la ventana de liquidación e inicia la liquidación de las ventanas seleccionadas usando el Finance Portal</a>.</p></td>
</tr>
<tr class="even">
<td><p>2</p></td>
<td><p>El Operador del Hub obtiene un Informe de Liquidación del DFSP por cada DFSP que estuvo activo en la ventana de liquidación.</p></td>
</tr>
<tr class="odd">
<td><p>3</p></td>
<td><p>El Operador del Hub envía por correo electrónico el Informe de Liquidación del DFSP a los puntos de contacto designados de cada DFSP.</p></td>
</tr>
<tr class="even">
<td><p>4</p></td>
<td><p>Los DFSP revisan su informe y concilian las transacciones con sus propios registros de forma oportuna.</p>
<p>El informe ofrece información sobre la posición de liquidación bilateral del DFSP con cada DFSP con el que haya transaccionado (como DFSP Pagador o como DFSP Beneficiario) en la ventana o las ventanas de liquidación que se están liquidando. También ofrece la suma total de los montos de transferencia enviados y recibidos por el DFSP en la ventana o las ventanas de liquidación.</p></td>
</tr>
<tr class="odd">
<td><p>5</p></td>
<td><p>El Operador del Hub obtiene el Informe del Banco Liquidador.</p></td>
</tr>
<tr class="even">
<td><p>6</p></td>
<td><p>El Operador del Hub notifica a los puntos de contacto del banco liquidador que la liquidación puede ejecutarse, y les comparte el Informe del Banco Liquidador.</p><p>El informe actúa como instrucciones de pago al banco, y ofrece la posición de liquidación bilateral de cada DFSP frente a todos los demás DFSP que transaccionaron en la ventana o las ventanas de liquidación que se están liquidando. También ofrece la suma total de los montos de transferencia enviados y recibidos por cada DFSP.</p></td>
</tr>
<tr class="odd">
<td><p>7</p></td>
<td><p>El banco liquidador mueve dinero entre la cuenta de liquidación y las cuentas de liquidez de los DFSP, conforme a las Posiciones netas agregadas que se indican en el Informe del Banco Liquidador.</p></td>
</tr>
<tr class="even">
<td><p>8</p></td>
<td><p>El banco liquidador confirma que el dinero se ha movido y (dado que el Operador del Hub no tiene visibilidad del saldo de las cuentas mantenidas en el banco liquidador) comparte el saldo de la cuenta de liquidez de cada DFSP.</p></td>
</tr>
<tr class="odd">
<td><p>9</p></td>
<td><p>El Operador del Hub <a href="settling.html">finaliza la liquidación usando el Finance Portal</a>.</p></td>
</tr>
<tr class="even">
<td><p>10</p></td>
<td><p>El Operador del Hub <a href="monitoring-dfsp-financial-details.html">verifica los saldos de las cuentas de liquidez de los DFSP frente a los saldos que muestra el portal</a>, y los actualiza si es necesario, usando la <a href="recording-funds-in-out.html">funcionalidad de "agregar y retirar fondos" del portal</a>. Tenga en cuenta que esto puede hacer que se recalcule el NDC del DFSP, lo que podría hacer que el Hub rechace las transacciones salientes de ese DFSP.</p></td>
</tr>
<tr class="odd">
<td><p>11</p></td>
<td><p>El Operador del Hub obtiene un Informe de Resultado de Liquidación del DFSP por cada DFSP.</p></td>
</tr>
<tr class="even">
<td><p>12</p></td>
<td><p>El Operador del Hub notifica a cada DFSP el resultado de la liquidación y el saldo de su cuenta de liquidez enviándole el Informe de Resultado de Liquidación del DFSP.</p></td>
</tr>
</tbody>
</table>

---
i18n_source_sha: 2e574a4c4d128e68b16e507f2684ffedd2732724
---

# Los libros mayores del Hub

## Gestionar el riesgo

Hay elementos del proceso de liquidación que quedan fuera del control del Hub, por lo que es importante que existan varios controles para impedir que desaparezcan fondos y para asegurar que siempre haya liquidez que sostenga la operación del Hub. Además del [Límite de débito neto](settlement-basic-concepts.md#gestion-de-la-liquidez-limite-de-debito-neto), el Hub emplea varios libros mayores internos para gestionar el riesgo y asegurar la liquidez. Esos libros mayores son los siguientes:

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th>Libro mayor</th>
<th>Definición</th>
<th>Tipo de transferencia registrada en el libro mayor</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Libro mayor de posiciones del DFSP</p></td>
<td><p>Hace seguimiento de cuánto debe un DFSP o cuánto se le debe. Cada vez que se procesa una transferencia, la Posición en el Hub se ajusta en tiempo real.</p></td>
<td><p>Transferencia P2P: una transacción de persona a persona entre usuarios finales de DFSP.<br />
<br />
Transferencia de liquidación: el flujo de fondos entre DFSP destinado a conciliar los libros mayores y actualizar las Posiciones de una ventana de liquidación dada.</p></td>
</tr>
<tr class="even">
<td><p>Libro mayor de liquidación del DFSP</p></td>
<td><p>La cuenta de liquidez del DFSP en el banco liquidador, reflejada en el Hub. Actúa como cuenta de conciliación y refleja el movimiento de los fondos reales.</p></td>
<td><p>Transferencia de fondos (de entrada y de salida): el movimiento de fondos que inicia el DFSP o la confirmación del banco liquidador de que la liquidación se ha completado.</p></td>
</tr>
<tr class="odd">
<td><p>Libro mayor de Liquidación Neta Multilateral del Hub (HMLNS)</p></td>
<td><p>Se usa para capturar el asiento de contrapartida de la liquidación neta entre los DFSP. Una vez que una ventana de liquidación se ha cerrado y se ha liquidado entre todos los DFSP, su saldo volverá a cero.</p></td>
<td><p>Transferencia de liquidación: el flujo de fondos entre DFSP destinado a conciliar los libros mayores y actualizar las Posiciones de una ventana de liquidación dada.</p></td>
</tr>
<tr class="even">
<td><p>Libro mayor de conciliación del Hub</p></td>
<td><p>Asegura que los movimientos de entrada y salida de las cuentas de liquidez que se registran en los Libros mayores de liquidación estén cuadrados. El saldo es el monto que el Operador del Hub administra en los Libros mayores de liquidación de todos los DFSP participantes.<br />
<br />
Actúa como cuenta de control y hace seguimiento del movimiento de fondos en todos los Libros mayores de liquidación de los DFSP (que reflejan el movimiento de los fondos reales).</p></td>
<td><p>Transferencia de fondos (de entrada y de salida): el movimiento de fondos que inicia el DFSP o la confirmación del banco liquidador de que la liquidación se ha completado.</p></td>
</tr>
</tbody>
</table>

## Entender los principios contables

En contabilidad, una posición neta positiva (más débitos) se trata como un activo, mientras que una posición neta negativa (más créditos) se trata como un pasivo. El Hub de Mojaloop aplica esos mismos principios, pero desde la perspectiva del Hub. ¿Qué significa eso?

El Hub registra una transferencia como un débito (DR) del lado del DFSP Pagador porque la transferencia reduce el monto que se le debe devolver a ese DFSP (menor pasivo desde la perspectiva del Hub). Así que, mientras el propio DFSP Pagador tratará la transferencia como un aumento de su pasivo en su propio sistema, el Hub la trata como un aumento de su activo. 

El Hub registra esa misma transferencia como un crédito (CR) del lado del DFSP Beneficiario porque la transferencia aumenta el monto que se le debe a ese DFSP (mayor pasivo desde la perspectiva del Hub). 

Registrar una transacción en dos cuentas como asientos opuestos de débito y crédito (por montos iguales) es lo que en contabilidad llamamos "partida doble".

Al aplicar los principios contables anteriores a un depósito que hace un DFSP en su cuenta de liquidez, el monto crea un pasivo desde la perspectiva del Hub (el dinero hay que devolverlo). Por tanto, el monto que se anota en el Hub es negativo. De este modo, en cualquier momento puede calcularse rápidamente el monto que el Hub debe a cualquier DFSP sumando la Posición del DFSP al saldo de su cuenta de liquidez. La contrapartida del Libro mayor de liquidación del DFSP se anota en el Libro mayor de conciliación del Hub.

## La liquidación: un ejemplo

Esta sección muestra cómo se registra una transacción en los distintos libros mayores, usando un ejemplo sencillo. 

Tomemos el siguiente ejemplo: DFSP1 envía 50 USD a DFSP2. Así es como se registra esta transacción de ejemplo en los libros mayores del Hub.

### Paso 1a: reservar el monto de la transferencia del emisor en el Libro mayor de posiciones

El Libro mayor de posiciones del DFSP se usa para hacer seguimiento de los cambios en la Posición de un DFSP. Una vez que una ventana de liquidación se cierra y se inicia el proceso de liquidación, el monto de la transferencia se reserva en los Libros mayores de posiciones que el Hub mantiene para los DFSP, así como en el Libro mayor de Liquidación Neta Multilateral del Hub. Reservar el monto de la transferencia del DFSP Pagador (DFSP1) garantiza que esos fondos no puedan usarse para otra transferencia.

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr class="header">
<th colspan="2"><strong>Libro mayor de posiciones de DFSP1</strong></th>
<th colspan="2"><strong>Libro mayor de Liquidación Neta Multilateral del Hub</strong></th>
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

### Paso 1b: reservar el monto de la transferencia del receptor en el Libro mayor de posiciones

Del mismo modo, la Posición del DFSP Beneficiario también se sigue a través del Libro mayor de posiciones del DFSP.

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr class="header">
<th colspan="2"><strong>Libro mayor de posiciones de DFSP2</strong></th>
<th colspan="2"><strong>Libro mayor de Liquidación Neta Multilateral del Hub</strong></th>
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

### Paso 2a: confirmar el monto de la transferencia del emisor en el Libro mayor de posiciones

Tras reservar el monto de la transferencia, el siguiente paso es confirmar el monto en los mismos libros mayores que antes.

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr class="header">
<th colspan="2"><strong>Libro mayor de posiciones de DFSP1</strong></th>
<th colspan="2"><strong>Libro mayor de Liquidación Neta Multilateral del Hub</strong></th>
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

### Paso 2b: confirmar el monto de la transferencia del receptor en el Libro mayor de posiciones

Confirmar el monto de la transferencia del DFSP Beneficiario (DFSP2) permite a ese DFSP enviar fondos a otros DFSP si lo desea.

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr class="header">
<th colspan="2"><strong>Libro mayor de posiciones de DFSP2</strong></th>
<th colspan="2"><strong>Libro mayor de Liquidación Neta Multilateral del Hub</strong></th>
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

### Paso 3: reservar el monto de la transferencia del emisor en el Libro mayor de liquidación

Una vez que las Posiciones están en un estado controlado y se han registrado los asientos de débito y crédito correspondientes en el Libro mayor de Liquidación Neta Multilateral del Hub, la transacción también debe registrarse y reservarse en los Libros mayores de liquidación de los DFSP y en el Libro mayor de conciliación del Hub, para asegurar que los fondos no se liberen sin querer para otra operación de salida de fondos.

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr class="header">
<th colspan="2"><strong>Libro mayor de liquidación de DFSP1</strong></th>
<th colspan="2"><strong>Libro mayor de conciliación del Hub</strong></th>
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

### Paso 4a: confirmar el monto de la transferencia del receptor en el Libro mayor de liquidación

Una vez que el dinero real se ha movido en las cuentas de liquidez de los DFSP, los montos de las transferencias pueden confirmarse en los Libros mayores de liquidación de los DFSP y en el Libro mayor de conciliación del Hub. El movimiento de dinero se registra primero para el DFSP Beneficiario.

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr class="header">
<th colspan="2"><strong>Libro mayor de liquidación de DFSP2</strong></th>
<th colspan="2"><strong>Libro mayor de conciliación del Hub</strong></th>
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

### Paso 4b: confirmar el monto de la transferencia del emisor en el Libro mayor de liquidación

Por último, el monto de la transferencia también se confirma del lado del emisor.

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr class="header">
<th colspan="2"><strong>Libro mayor de liquidación de DFSP1</strong></th>
<th colspan="2"><strong>Libro mayor de conciliación del Hub</strong></th>
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

## Agregar y retirar fondos: un ejemplo

### Agregar fondos

Como los fondos de las cuentas de liquidez fluctuarán, los DFSP agregarán fondos para financiar sus envíos netos o buscarán hacer retiros. Los depósitos pueden hacerse cuando se desee, pero el Libro mayor de conciliación del Hub sí debe actualizarse con regularidad, para evitar problemas de conciliación. Siempre que se haga un cambio en la cuenta externa (es decir, la cuenta de liquidez del DFSP), también debe evaluarse el Límite de débito neto.

En el ejemplo siguiente, DFSP1 agrega 100,000 USD a su cuenta de liquidez. Así es como se registra el monto del depósito en los libros mayores del Hub.

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr class="header">
<th colspan="2"><strong>Libro mayor de liquidación de DFSP1</strong></th>
<th colspan="2"><strong>Libro mayor de conciliación del Hub</strong></th>
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
<td><p>100,000 USD</p></td>
<td><p>100,000 USD</p></td>
<td></td>
</tr>
</tbody>
</table>

### Retirar fondos

Como un retiro podría afectar al Límite de débito neto y a la capacidad de transaccionar, el NDC debe recalcularse a la luz del nuevo saldo del DFSP (el saldo nunca debe ser inferior al NDC).

En el ejemplo siguiente, DFSP2 retira 100,000 USD de su cuenta de liquidez. Así es como se registra el monto del retiro en los libros mayores del Hub.

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr class="header">
<th colspan="2"><strong>Libro mayor de liquidación de DFSP2</strong></th>
<th colspan="2"><strong>Libro mayor de conciliación del Hub</strong></th>
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
<td><p>100,000 USD</p></td>
<td></td>
<td></td>
<td><p>100,000 USD</p></td>
</tr>
</tbody>
</table>
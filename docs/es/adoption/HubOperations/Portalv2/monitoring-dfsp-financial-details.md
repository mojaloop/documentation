---
i18n_source_sha: 0838ce654f8a33e655da672dd548080afc6c0817
---

# Monitorear los detalles financieros de un DFSP

La página **DFSP Financial Positions** le permite monitorear los detalles financieros de los DFSP, como el Saldo, la [Posición](settlement-basic-concepts#posicion) actual, el [Límite de débito neto](settlement-basic-concepts#gestion-de-la-liquidez-limite-de-debito-neto) y el porcentaje de NDC usado.

Para acceder a la página **DFSP Financial Positions**, vaya a **Participants** > **DFSP Financial Positions**.

![Monitorear los detalles financieros de un DFSP](../../../../.vuepress/public/dfsp_financial_positions_2.png)

Se muestran los siguientes detalles de cada DFSP:

* **Balance**: refleja el saldo de la cuenta de liquidez del DFSP en el banco liquidador.
* **Current Position**: la Posición actual del DFSP. \
\
La Posición de un DFSP refleja, en un momento dado, la suma total de los montos de transferencia enviados y recibidos por el DFSP. La Posición es la suma de todas las transacciones salientes menos las entrantes desde el inicio de la ventana de liquidación, así como cualquier transferencia provisional que aún no se haya liquidado. \
\
Cada intento de transferencia saliente hace que el Hub de Mojaloop recalcule la Posición en tiempo real, la cual, a su vez, se compara con el Límite de débito neto. \
\
Una vez que la ventana de liquidación se cierra, las Posiciones se ajustan a partir de la liquidación: la Posición pasa a ser el monto neto de las transferencias que no se habían iniciado o que aún no se habían completado cuando se cerró la ventana de liquidación.
* **NDC**: el Límite de débito neto fijado para el DFSP. \
\
Al prefinanciar su cuenta de liquidez, los DFSP definen el monto máximo que pueden "deber" a otros DFSP; esto se llama Límite de débito neto (NDC). El NDC actúa como un límite o tope sobre los fondos de un DFSP disponibles para transaccionar, y nunca puede superar el saldo de la cuenta de liquidez. Esto es necesario para asegurar que los pasivos de un DFSP puedan cubrirse con fondos inmediatamente disponibles para el banco liquidador. \
\
La Posición se comprueba continuamente frente al Límite de débito neto ((TransferAmount + Position) < = NDC) y, si una transferencia hiciera que el monto de la Posición superara el monto del NDC, la transferencia se bloquea.
* **% NDC Used**: un indicador de Posición/NDC que muestra el porcentaje de NDC usado.

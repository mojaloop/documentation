---
i18n_source_sha: 39dc18f9478ede02902170447c5174321dda45e8
---

# Consultar los detalles de una liquidación

La página **Settlement > Settlements** le permite ver ciertos detalles de las liquidaciones, como:

* el identificador de la liquidación
* el estado de la liquidación
* el valor total de las transacciones
* los identificadores de los DFSP implicados en las transacciones, así como la Posición de Liquidación Neta Multilateral asociada en el periodo elegido

![Consultar los detalles de una liquidación](../../../../.vuepress/public/check_settlement_details.png)

La página **Settlements** ofrece una lista de liquidaciones que puede filtrar con distintos criterios de búsqueda:

* **Date**: ofrece una lista desplegable de rangos de tiempo. El valor por defecto es **Today**. \
\
La opción **Clear** le permite eliminar los filtros de fecha ya aplicados.
* **From** y **To**: muestran la hora de inicio y la hora de fin del rango de tiempo seleccionado en el campo **Date**. Cuando **Date** está fijado en **Custom Range**, tiene que fijar usted mismo la fecha y la hora en los campos **From** y **To**.
* **State**: ofrece una lista desplegable de estados de la liquidación.
    * **Pending Settlement**: se ha creado una liquidación nueva formada por una o varias ventanas de liquidación. Se ha calculado la Posición de Liquidación Neta Multilateral adeudada a cada participante o por él.
    * **Ps Transfers Recorded**: el Hub ha marcado las transferencias afectadas como `RECEIVED_PREPARE` en sus registros internos.
    * **Ps Transfers Reserved**: el Hub ha marcado las transferencias afectadas como `RESERVED` en sus registros internos.
    * **Ps Transfers Committed**: el Hub ha marcado las transferencias afectadas como `COMMITTED` en sus registros internos.
    * **Settling**: la liquidación está en curso.
    * **Settled**: la liquidación se ha completado.
    * **Aborted**: la liquidación no pudo completarse y debería revertirse.
* Botón **Clear Filters**: le permite eliminar todos los filtros que haya aplicado.

A medida que aplica criterios de búsqueda, la lista de resultados (liquidaciones) se actualiza de forma continua.

Se muestran los siguientes detalles:

* **Settlement ID**: el identificador único de la liquidación.
* **State**: el estado de la liquidación.
* **Total Value**: el valor total de las transacciones dentro del lote de liquidación.
* **Open Date**: la fecha y la hora en que se creó la liquidación en el Hub.
* **Last Action Date**: la fecha y la hora en que se realizó la última acción sobre la liquidación en el Hub (por ejemplo, se han reservado fondos, se han confirmado fondos).
* **Action**: botón **Finalize**. Le permite finalizar una liquidación. Este botón solo se muestra en las liquidaciones pendientes. Para más detalles sobre cómo finalizar una liquidación, consulte [Liquidar](settling.md#finalizar-una-liquidacion).

Para ver los detalles de una liquidación concreta, haga clic en ella en la lista de resultados. Se muestra la ventana emergente **Settlement Details**.

![Ventana emergente de detalles de la liquidación](../../../../.vuepress/public/settlement_details_popup.png)

Se muestran los siguientes detalles adicionales:

* **DFSP**: el identificador único del DFSP.
* **Window ID**: el identificador único de la ventana de liquidación que se está liquidando.
* **Debit**: monto de débito agregado resultante de las transferencias en las que participó el DFSP.
* **Credit**: monto de crédito agregado resultante de las transferencias en las que participó el DFSP.

::: tip NOTA
En el momento de escribir esto, la información que debería mostrar el botón **View Net Positions** no está disponible. Se agregará en una versión futura del portal. 
:::

---
i18n_source_sha: fede50285c02249b50684f64ec0d39ede764bcda
---

# Consultar los detalles de una ventana de liquidación

La página **Settlement Windows** le permite:

* buscar ventanas de liquidación según varios criterios de búsqueda
* cerrar una ventana de liquidación abierta
* liquidar una sola ventana o liquidar varias ventanas a la vez

::: tip NOTA
Recuerde que la liquidación debe seguir este procedimiento: 

* Cierre la ventana de liquidación que quiera liquidar.
* Liquide la ventana o las ventanas cerradas que elija. Esto crea una liquidación nueva.
* Envíe los informes de liquidación a los DFSP y al banco liquidador, y obtenga del banco la confirmación de que ha movido el dinero conforme al informe.
* Finalice la liquidación nueva creada en el Paso 2.

Dado que cerrar una ventana e iniciar la liquidación liquidando ventanas seleccionadas son parte integrante del proceso de liquidación, se describen en una sección dedicada a [liquidar](settling.md).
:::

Una ventana de liquidación es un periodo de tiempo entre dos liquidaciones sucesivas. Tiene una hora de inicio y una hora de fin, y todas las transferencias que se cursen (y alcancen el estado `"COMMITTED"`) mientras la ventana de liquidación está abierta se liquidarán de forma agrupada una vez que la ventana de liquidación se haya cerrado.

Las transferencias que tienen lugar en la misma ventana de liquidación se liquidan por lotes tras el fin de la ventana de liquidación.

Para acceder a la página **Settlement Windows**, vaya a **Settlement** > **Settlement Windows**.

![Gestionar las ventanas de liquidación](../../../../.vuepress/public/settlement_window_mgmt.png)

La página **Settlement Windows** ofrece una lista de ventanas de liquidación que puede filtrar con distintos criterios de búsqueda:

* **Date**: ofrece una lista desplegable de rangos de tiempo. El valor por defecto es **Today**. \
\
La opción **Clear** le permite eliminar los filtros de fecha ya aplicados.
* **From** y **To**: muestran la hora de inicio y la hora de fin del rango de tiempo seleccionado en el campo **Date**. Cuando **Date** está fijado en **Custom Range**, tiene que fijar usted mismo la fecha y la hora en los campos **From** y **To**.
* **State**: ofrece una lista desplegable de estados de la ventana de liquidación:
    * **Open**: la ventana de liquidación está abierta y se están aceptando transferencias en la ventana abierta actual.
    * **Closed**: la ventana de liquidación está cerrada. No acepta transferencias adicionales y todas las transferencias nuevas se están asignando a una ventana de liquidación nueva y abierta.
    * **Pending**: la ventana de liquidación está cerrada, pero aún hay que liquidarla. Una ventana solo puede liquidarse una vez que el banco liquidador ha confirmado que todos los DFSP participantes que hicieron transferencias en la ventana de liquidación han liquidado sus pagos.
    * **Settled**: el banco liquidador ha confirmado que todos los DFSP afectados han liquidado sus obligaciones entre sí. Tras la confirmación, el Operador del Hub ha liquidado la ventana de liquidación.
    * **Aborted**: la ventana de liquidación formaba parte de una liquidación que se canceló. Es posible agregar la ventana cancelada a una liquidación nueva.
    * **Clear**: le permite eliminar los filtros de estado de ventana ya aplicados.
* Botón **Clear Filters**: le permite eliminar todos los filtros que haya aplicado.

A medida que aplica criterios de búsqueda, la lista de resultados (ventanas de liquidación) se actualiza de forma continua. La lista de resultados de la búsqueda muestra los siguientes detalles:

* Selector de ventana: solo se muestra en las ventanas de liquidación **Pending**. Hacer clic en el selector de ventana activa el botón **Settle Selected Windows**. Para más detalles sobre cómo liquidar una ventana de liquidación, consulte [Liquidar](settling.md#liquidar-una-ventana-de-liquidacion-cerrada).
* **Window ID**: el identificador único de la ventana de liquidación.
* **State**: el estado de la ventana de liquidación.
* **Opened Date**: la fecha y la hora en que se abrió la ventana de liquidación.
* **Closed Date**: la fecha y la hora en que se cerró la ventana de liquidación.
* **Action**: botón **Close Window**. Le permite cerrar una ventana de liquidación. Este botón solo se muestra en las ventanas de liquidación **Open**, ya que solo pueden cerrarse las ventanas abiertas. Para más detalles sobre cómo cerrar una ventana de liquidación, consulte [Liquidar](settling.md#cerrar-una-ventana-de-liquidacion).

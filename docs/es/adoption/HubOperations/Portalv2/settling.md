---
i18n_source_sha: aa4e41b910723f1ae506429e241e095e01345ffc
---

# Liquidar

1. [Cierre la ventana de liquidación](#cerrar-una-ventana-de-liquidacion) que quiera liquidar.
1. [Liquide la ventana o las ventanas cerradas que elija](#liquidar-una-ventana-de-liquidacion-cerrada). Esto crea una liquidación nueva.
1. Envíe los informes de liquidación a los DFSP y al banco liquidador, y obtenga del banco la confirmación de que ha movido el dinero conforme al informe.
1. [Finalice la liquidación nueva](#finalizar-una-liquidacion) creada en el Paso 2.

Esta sección describe los pasos del proceso (los Pasos 1, 2 y 4) que se realizan a través del portal.

## Cerrar una ventana de liquidación

Para cerrar una ventana de liquidación abierta, siga estos pasos:

1. Vaya a **Settlement** > **Settlement Windows**. Se muestra la página **Settlement Windows**.
1. Encuentre la ventana de liquidación que busca [usando los filtros de búsqueda](managing-windows.md).
1. La ventana abierta tendrá un botón **Close Window** junto a ella en la columna **Action**. Haga clic en el botón **Close Window**.

![Cerrar una ventana de liquidación](../../../../.vuepress/public/settlement_window_mgmt_close.png)

Cerrar una ventana abrirá automáticamente una ventana nueva con el estado **Open**.

## Liquidar una ventana de liquidación cerrada

Para liquidar una o varias ventanas de liquidación, siga estos pasos:

1. Vaya a **Settlement** > **Settlement Windows**. Se muestra la página **Settlement Windows**.
1. Encuentre la ventana de liquidación que busca [usando los filtros de búsqueda](managing-windows.md). La ventana de liquidación debe estar en estado **Closed**.
1. Haga clic en el selector de ventana que hay junto a la ventana o las ventanas de liquidación que quiera liquidar. \
\
<img src="../../../../.vuepress/public/settlement_window_mgmt_selector.png" /> \
\
Esto activa el botón **Settle Selected Windows**. Haga clic en el botón **Settle Selected Windows**. \
\
<img src="../../../../.vuepress/public/settlement_window_mgmt_settle_button.png" /> 
1. Aparece una ventana emergente **Settlement Submitted**, en la que tiene las siguientes opciones:

* Ver las liquidaciones enviadas
* Seguir viendo las ventanas \
\
<img src="../../../../.vuepress/public/settlement_window_settlement_submitted.png" width="50%" height="50%" /> \
\
Si quiere ver la liquidación nueva que acaba de crear, haga clic en el botón **View Submitted Settlements**. Esto le lleva a la página **Settlements**, donde puede buscar la liquidación nueva [usando los filtros de búsqueda](checking-settlement-details.md). La liquidación estará en estado **Pending Settlement**.

## Finalizar una liquidación

Para finalizar la liquidación, siga estos pasos:

**Prerrequisitos:** 

* El banco liquidador ha confirmado que todas las Posiciones MLNS de los DFSP se han liquidado.

**Pasos:**

1. Vaya a **Settlement** > **Settlements**. Se muestra la página **Settlements**.
1. Encuentre la liquidación que busca usando los [filtros de búsqueda](checking-settlement-details.md). La liquidación debe estar en estado **Pending Settlement**. \
\
<img src="../../../../.vuepress/public/finalise_settlement.png" /> 
1. Haga clic en el botón **Finalize** que hay junto a la liquidación. Aparece una ventana emergente de estado que muestra los estados de la liquidación, y se van agregando marcas de verificación a medida que avanza el proceso de liquidación. \
\
Cuando la liquidación esté finalizada, verá todos los estados con una marca de verificación al lado. El último estado dirá **State: SETTLED.** Además, se activará el botón **Close**, que le permite volver a la página **Settlements**. \
\
<img src="../../../../.vuepress/public/finalising_settlement_popup.png" /> 
1. De vuelta en la página **Settlements**, al buscar la liquidación debería ver que su estado ahora se muestra como **Settled**.

::: tip
Si el estado de la liquidación es distinto de **Settled**, significa que la liquidación no ha terminado por algún motivo. Haga clic de nuevo en **Finalize** para completar el proceso de liquidación sin terminar. 
:::

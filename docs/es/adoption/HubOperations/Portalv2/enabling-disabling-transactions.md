---
i18n_source_sha: 73bd59d639e11be27df39c218ab6d383f50b1a5d
---

# Deshabilitar y volver a habilitar las transacciones de un DFSP

En ciertos casos puede ser necesario dejar inactivo a un DFSP de forma temporal o permanente. Un escenario de ejemplo es cuando observa un comportamiento muy sospechoso y hay que investigar la causa real, siendo el riesgo de pérdida de dinero demasiado alto.

La página **Participants** > **DFSP Financial Positions** ofrece una opción para detener el envío y la recepción de transferencias de un DFSP concreto deshabilitando su Libro mayor de posiciones con un clic.

(El Hub mantiene un Libro mayor de posiciones para cada DFSP. El Libro mayor de posiciones hace seguimiento de cuánto debe un DFSP o cuánto se le debe. Cada vez que se procesa una transferencia, la Posición en el Hub se ajusta en tiempo real.)

Para deshabilitar las transacciones de un DFSP concreto, siga estos pasos:

::: warning
Deshabilitar un DFSP detendrá todas sus transacciones entrantes y salientes, así que asegúrese de aplicar esta opción con cuidado. Una vez despejado el riesgo, recuerde reanudar los servicios de ese DFSP.
:::

1. Vaya a la página **Participants** > **DFSP Financial Positions**.
1. Encuentre la entrada del DFSP que quiere deshabilitar.
1. Haga clic en el botón **Disable**.

<img src="../../../../.vuepress/public/disable_dfsp_position_ledger.png" />

Para reanudar los servicios del DFSP que ha deshabilitado antes, siga estos pasos:

1. Vaya a la página **Participants** > **DFSP Financial Positions**.
1. Encuentre la entrada del DFSP que quiere habilitar.
1. Haga clic en el botón **Enable**.

<img src="../../../../.vuepress/public/enable_dfsp_position_ledger.png" />


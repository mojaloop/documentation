---
i18n_source_sha: c2e2462ca13ef27b8edfdc584d61969dad7699c6
---

# Asentamientos en Columbia Británica

El módulo «Liquidación BC» es fundamental para liquidar las transferencias de los participantes, ya sea mediante el método de Liquidación neta diferida (DNS) o el de Liquidación bruta inmediata (IGS). Se encarga de crear ventanas de liquidación, identificar y aplicar el método de liquidación requerido (DNS/IGS), liquidar, cerrar y actualizar lotes de liquidación, así como de registrar todos los ingresos y retiros en los libros mayores correspondientes del módulo «Cuentas y saldos» (BC).

## Términos

En este BC, también conocido como dominio, se utilizan los siguientes términos.

| Término     | Descripción  |
| -------- | ------------ |
| **DNS** | Liquidación neta diferida |
| **IGS/RTGS** | Liquidación bruta inmediata/Liquidación bruta en tiempo real |
| **Operador** | Persona o sistema que emite instrucciones o solicitudes |
| **Participante** | FSP/PISP o FSP Clientes |
| **Cuenta** | Cuenta del Libro mayor (Cr/Dr) |

## Descripción general de las funciones

![Use Case - Functional Overview](./assets/settleFunctionalOverview_20210826.png)
>

## Caso de uso

### Liquidación neta diferida (DNS)

#### Descripción
Método para aplazar los pagos con el fin de permitir la liquidación en varios lotes según un calendario predeterminado. Esto resulta útil en entornos en los que intervienen varios Participantes en una Transacción que requiera un enfoque de liquidación basado en el saldo de pagos adeudados.

#### Diagrama de flujo

![Use Case - Deferred Net Settlement (DNS)](./assets/ML2RA_SET-ucDeferNetSettle_Mar22-a-P1-2.png)
>Diagrama de flujo de UC: Liquidación neta diferida - 19/10/2021

### Liquidación bruta inmediata (IGS)

#### Descripción
Método que permite la liquidación inmediata de lotes.  Esto resulta útil en entornos de pymes, en los que a menudo se busca agilizar los plazos de pago para maximizar su liquidez.  El IGS también se conoce como «Liquidación bruta en tiempo real (LBTR/RTGS)».

#### Diagrama de flujo

![Use Case - Immediate Gross Settlement (IGS)](./assets/ML2RA_SET-ucInstantGrossSettle_Mar22-a.png)
>Diagrama de flujo de UC: Liquidación bruta inmediata

### Liquidación del acuerdo

#### Descripción
Método que permite a la BC de liquidación interrumpir una liquidación cuando sea necesario, realizando la reversión de las cuentas de liquidación de los Participantes, actualizando el estado de liquidación de las ventanas de liquidación y actualizando el estado de la liquidación.

#### Diagrama de flujo

![Use Case - Abort Settlement](./assets/settleAbortSettle_20210827.png)
>

### Crear/actualizar el modelo de liquidación (DNS/IGS)

#### Descripción
Método que permite al BC de liquidación crear o actualizar el método de liquidación de un lote de liquidación en función del tipo de cuenta del Participante. Resulta útil en los casos en que se requieran métodos de liquidación mixtos.

#### Diagrama de flujo

![Use Case - Create/Update the Settlement Model (DNS/IGS)](./assets/settleCreateUpdateModel_20210827.png)
>

### Modelo de liquidación inicial (arranque) mediante configuración

#### Descripción
Método que configura el método de liquidación (DNS/IGS) en función de la configuración de inicio del sistema. Resulta útil en los casos en que todos los modelos de liquidación sean iguales, como por ejemplo, todos DNS o todos IGS.

#### Diagrama de flujo

![Use Case - Bootstrap (Startup) Settlement Model via Configuration](./assets/ML2RA_SET-ucBootStrapSettleModViaConfig_Mar22-b.png)
>Diagrama de flujo de trabajo de la UC: Modelo de liquidación inicial (Bootstrap) mediante configuración

### Cree cuentas relacionadas con la liquidación para los participantes de nueva creación

#### Descripción
El sistema crea cuentas de liquidación para los nuevos participantes con el fin de permitir que las transferencias de fondos sean gestionadas por el Switch. Esto permite al Switch llevar a cabo una gestión de extremo a extremo de todas las transferencias, independientemente del método de liquidación.

#### Diagrama de flujo

![Use Case - Create Settlement related accounts for newly created Particpants](./assets/settleCreateSettleAccountsNewPart_20210827.png)
>

<!-- Footnotes themselves at the bottom. -->
<!-- ## Notes -->

[^1]: Interfaces comunes: [Mojaloop Lista de interfaces comunes](../../commonInterfaces.md)

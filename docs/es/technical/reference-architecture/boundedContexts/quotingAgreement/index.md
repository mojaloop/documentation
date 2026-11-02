---
i18n_source_sha: f330347b51c11a4b0a5890158cdb872ad43e7a52
---

# Cotizaciones y acuerdos en Columbia Británica

El contexto delimitado «Presupuestos y acuerdos» proporciona a los participantes cotizaciones para realizar transferencias y registra las respuestas de aceptación o rechazo de los participantes.

## Términos

En este BC, también conocido como dominio, se utilizan los siguientes términos.

| Término | Descripción |
|---|---|
| **(D) FSP** | Proveedor de servicios financieros digitales |
| **Participante** | Proveedor de servicios financieros |

## Descripción general de las funciones

![Use Case - Functional Overview](./assets/qtaFunctionalOverview_20210825.png)

## Caso de uso

### Calcular cotización - Escenario ideal

#### Descripción

Este proceso obtiene una serie de datos relevantes sobre los participantes, incluidos los indicadores de estado, calcula el coste de la transferencia, incluidas las tarifas, y se lo facilita a los participantes. Asimismo, permite almacenar las solicitudes y respuestas de los participantes (es decir, la aceptación o el rechazo de la cotización).

#### Diagrama de flujo

![Use Case - Calculate Quote - Happy Path](./assets/qtaCalculateQuoteHappyPath_20210825.png)

### Solicitar cotización - Happy Path

#### Descripción

Proceso para obtener y facilitar los datos de las cotizaciones existentes a los participantes que lo soliciten.

#### Diagrama de flujo

![Use Case - Example REPLACE ME](./assets/qtaGetQuoteHappyPath.png)

### Calcular cotización - Solicitud de cotización no válida

#### Descripción

Proceso que permite al sistema invalidar las solicitudes de cotización mediante el monitoreo y la respuesta a eventos de solicitud no válidos, FSP o solicitudes duplicadas.

#### Diagrama de flujo

![Use Case - Calculate Quote - Invalid Quote Request](./assets/qtaCalculateQuoteInvalidQuoteRequest_20210825.png)

### Calcular cotización: FSP no válidos

#### Descripción

Proceso que permite al sistema invalidar las solicitudes de cotización con código «FSP» en las que los datos «FSP» no coinciden con la cotización original de uno o ambos participantes.

#### Diagrama de flujo

![Use Case - Calculate Quote - Invalid FSPs](./assets/qtaCalculateQuoteInvalidFSPs_20210825.png)

### Calcular cotización: se han detectado reglas del esquema de pagos no válidas en la solicitud

#### Descripción

Proceso destinado a permitir que el sistema invalide las solicitudes de cotización en las que se incumplan las reglas del sistema por parte de uno o varios Participantes; por ejemplo, cuando se alcance el límite del periodo de cotización.

#### Diagrama de flujo

![Use Case - Calculate Quote - Invalid Scheme Rules detected in Request](./assets/qtaCalculateQuoteInvalidSchemeRulesRequest_20210825.png)

### Calcular cotización: se han detectado reglas del Esquema de pagos no válidas en la respuesta

#### Descripción

Proceso destinado a permitir que el sistema invalide las respuestas a las cotizaciones en los casos en que uno o varios Participantes incumplan las Reglas del Esquema de pagos; por ejemplo, cuando se detecten condiciones no válidas.

#### Diagrama de flujo

![Use Case - Calculate Quote - Invalid Scheme Rules detected in response](./assets/qtaCalculateQuoteInvalidSchemeRulesResponse_20210825.png)

## Modelo canónico de citas

El modelo canónico almacena los siguientes datos relativos a las cotizaciones en el módulo «Ofertas y acuerdos» (BC):

- N.º de referencia de la cotización
- ID de la transacción
- Participantes
  - payerId
  - payeeId
- Pagador
  - Participante
    - identificador del participante
    - tipo de función (p. ej., Pagador)
  - Importe solicitado (importe inicial)
    - Valor (número)
    - Moneda (código ISO de la moneda)
  - Monto a enviar (incluidas las tarifas, etc.)
    - Valor (número)
    - Moneda (código ISO de la moneda)
- Beneficiario(s) (uno o varios; todos deben añadirse al «Importe a enviar»)
  - '#'
    - Participante
      - identificador del participante
      - roleType (Indique por qué este «Beneficiario» recibe esta cantidad; por ejemplo: comisión, destinatario, etc.)
      - razón
      - Importe a recibir
        - valor (número)
        - divisa (código ISO de la divisa)
- Extensiones

## Comentarios finales

- No se han observado problemas que susciten preocupación en el diseño general del BC y de la arquitectura de referencia.
- Debemos comprender mejor o aclarar el patrón «GET» a través de «POST»:
  - ¿Debería un evento «GET» ser un simple «GET» RESTful, o es necesario que el Sistema admita el «GET» procedente de publicaciones duplicadas?
  - ¿Estamos obligados a atender en una fecha posterior las solicitudes «GET» que no incluyan ningún dato (FSP)?

<!--## Notes -->

<!-- Footnotes themselves at the bottom. -->
[^1]: Common Interfaces: [Mojaloop Common Interface List](../../commonInterfaces.md)

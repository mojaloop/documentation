---
i18n_source_sha: cd76ddded4be445425a8d93f5030f78467371289
---

# Plantilla de reglas de negocio del esquema de pagos

- Versión: 4.0 
    - Autor: Carol Coye Benson (Glenbrook)
    - Fecha: octubre de 2019
    - Descripción:     

---

## **Acerca del Mojaloop Community Business Document Project**

Este documento forma parte del Mojaloop Community Business Document Project. El proyecto está pensado para dar soporte a las entidades (países, regiones, asociaciones de proveedores o empresas comerciales) que implementan nuevos sistemas de pagos usando el código de Mojaloop. Esas entidades también tendrán que escribir las Reglas de Negocio que seguirán los participantes del sistema.

El Mojaloop Community Business Document Project ofrece plantillas para las Reglas de Negocio y los documentos relacionados. Implementar un nuevo sistema de pagos implica muchas decisiones: las plantillas muestran algunas de ellas y, cuando corresponde, se incluyen comentarios sobre cómo se relaciona cada decisión con los objetivos de un sistema alineado con Level One.

Los siguientes documentos forman parte del proyecto:

- Decisiones clave del esquema de pagos

- Plantilla de acuerdo de participación en el esquema de pagos

- Plantilla de reglas de negocio del esquema de pagos

- Plantilla de directriz de operación de la plataforma

- Plantilla de directriz de operación para la gestión de excepciones

- Glosario uniforme

## **Introducción**

Los Esquemas de pagos de todo el mundo están implementando, o considerando implementar, sistemas de pagos basados en Mojaloop. Mojaloop es software de código abierto para empresas de servicios financieros, reguladores gubernamentales y otros actores que asumen los retos de la interoperabilidad y la inclusión financiera. La Bill & Melinda Gates Foundation ha aportado financiamiento y apoyo a Mojaloop a través del Level One Project, una visión de los mercados financieros digitales basada en los principios de interoperabilidad, colaboración e inclusión.

Los esquemas de pagos que implementen Mojaloop tendrán que escribir Reglas de Negocio que rijan los derechos y las responsabilidades de los participantes del sistema. Este documento ofrece una plantilla de esas Reglas de Negocio. La plantilla está estructurada como un esquema detallado: la redacción concreta de las reglas la determinarán los Esquemas de pagos que las implementen y las jurisdicciones en las que operen. En muchas partes del documento, simplemente sugerimos un tema sobre el que un Esquema de pagos podría querer escribir una regla: de nuevo, los detalles de la regla variarán según el Esquema de pagos.

Antes de escribir las Reglas de Negocio, los Esquemas de pagos necesitan tomar decisiones de negocio importantes sobre cómo funcionarán el sistema y sus socios del ecosistema. Esas decisiones se describen en un documento aparte dentro del Mojaloop Community Business Document Project, "Decisiones clave del esquema de pagos". Se recomienda leer ese documento primero.

Plantilla de reglas de negocio del esquema de pagos

## **Tabla de contenidos**

[1 - Acerca de estas Reglas de Negocio del Esquema de pagos](#_1-acerca-de-estas-reglas-de-negocio-del-esquema-de-pagos)

[2 - Objetivos del Esquema de pagos](#_2-objetivos-del-esquema-de-pagos)

[3 - Participación en el Esquema de pagos](#_3-participacion-en-el-esquema-de-pagos)

[4 - Reglas de Negocio del Esquema de pagos](#_4-reglas-de-negocio-del-esquema-de-pagos)

[5 - Responsabilidades y obligaciones del Esquema de pagos](#_5-responsabilidades-y-obligaciones-del-esquema-de-pagos)

[6 - Responsabilidades y obligaciones de los Participantes](#_6-responsabilidades-y-obligaciones-de-los-participantes)

[7 - Responsabilidad - Asignación de responsabilidades](#_7-responsabilidad-asignacion-de-responsabilidades)

[8 - Seguridad, gestión de riesgos y confidencialidad de los datos](#_8-seguridad-gestion-de-riesgos-y-confidencialidad-de-los-datos)

[9 - Plataforma y Servicios del Esquema de pagos](#_9-plataforma-y-servicios-del-esquema-de-pagos)

[10 - Gestión de excepciones](#_10-gestion-de-excepciones)

[11 - Apéndice: Documentos Asociados](#_11-apendice-documentos-asociados)

[12 - Apéndice: Procesos de incorporación y de salida](#_12-apendice-procesos-de-incorporacion-y-de-salida)

[13 - Apéndice: Servicios del Esquema de pagos](#_13-apendice-servicios-del-esquema-de-pagos)

[14 - Apéndice: Casos de uso admitidos por el Esquema de pagos](#_14-apendice-casos-de-uso-admitidos-por-el-esquema-de-pagos)

[15 - Apéndice: Tarifario del Esquema de pagos](#_15-apendice-tarifario-del-esquema-de-pagos)

[16 - Apéndice: Gestión de riesgos, seguridad, privacidad y estándares de servicio](#_16-apendice-gestion-de-riesgos-seguridad-privacidad-y-estandares-de-servicio)

## **Guía de este documento**

Los Encabezados de sección y las entradas con viñeta debajo de los encabezados de sección son redacción propuesta real, o secciones sugeridas para un documento de reglas. El texto en cursiva son comentarios que pueden usarse cuando un esquema de pagos redacte el texto real de un documento de reglas.

## 1. Acerca de estas Reglas de Negocio del Esquema de pagos

### 1.1 Estas son las Reglas de Negocio del Esquema de pagos

::: tip NOTA
El software de Mojaloop puede usarse para intercambios bilaterales entre DFSP, así como dentro de una estructura de Esquema de pagos que use un switch. Este documento asume lo segundo; que el Esquema de pagos proporciona, contrata o dispone de algún otro modo que las transacciones interoperables se intercambien a través de un switch. Algunos de los conceptos de estas reglas solo se aplican a esta configuración; otros también serían útiles en acuerdos bilaterales.
:::

### 1.2 Propiedad del Esquema de pagos 

<ul><i>Quién es dueño del esquema de pagos, qué oportunidades existen de participación en la propiedad. Referencia a otros documentos (estatutos, reglamentos, etc.)</i></ul>

### 1.3 Documentos Asociados definidos

- Estas reglas incluyen los Documentos Asociados que figuran en un Apéndice de estas reglas. Los Documentos Asociados forman parte de las Reglas Operativas y tienen su misma fuerza.

<ul><i>Los Documentos Asociados deberían incluir la Directriz de Operación de la Plataforma y el Glosario Uniforme. Esto no incluye los distintos documentos técnicos a los que puedan hacer referencia las Reglas de Negocio o la Directriz de Operación de la Plataforma.</i></ul>

### 1.4 Las Reglas de Negocio del Esquema de pagos son vinculantes para los Participantes

<ul><i>Esto repite la disposición del Acuerdo de Participación en el Esquema de pagos. Tenga en cuenta que las Reglas de Negocio del Esquema de pagos solo son vinculantes para los DFSP que participan en el Esquema de pagos. El Esquema de pagos puede escribir reglas que exijan trasladar ciertas disposiciones de estas reglas a los clientes del Participante (por ejemplo, los comercios) o a sus socios (por ejemplo, los procesadores), pero esa es una obligación del Participante frente al Esquema de pagos, no de las demás partes.</i></ul>

### 1.5 Las Reglas pueden modificarse

<ul><i>Los detalles del proceso de modificación se especifican en otro lugar.</i></ul>

### 1.6 Los términos se definen en el Glosario Uniforme

<ul><i>El glosario es un documento aparte, en lugar de estar dentro del documento de Reglas de Negocio. Esto es para asegurar la coherencia terminológica a medida que el servicio evoluciona y cambia la Directriz de Operación de la Plataforma.</i></ul>

## 2. Objetivos del Esquema de pagos

<ul><i>Esta es una sección que permite a un Esquema de pagos declarar sus objetivos. Sugerimos el apoyo a las transacciones financieras interoperables, a la inclusión financiera y a la igualdad de género. También es una oportunidad de hacer referencia al apoyo a los Principios de Diseño del Level One Project, a una estrategia nacional o regional de pagos (o estrategia de economía digital), o a un conjunto de principios de diseño específico del Esquema de pagos.</i></ul>

## 3. Participación en el Esquema de pagos

### 3.1 Elegibilidad para participar

- Criterios de elegibilidad

<ul><i>Una declaración sobre qué tipos de instituciones son elegibles para solicitar ser participantes del Esquema de pagos. El principio de diseño de Level One es que cualquier proveedor de cuentas transaccionales con licencia en una jurisdicción cubierta por el Esquema de pagos debería ser elegible para solicitarlo</i></ul>

- Criterios de aprobación

<ul><i>Disposiciones del Esquema de pagos para aceptar solicitudes, incluidas declaraciones de alto nivel sobre la información requerida al solicitante, como la demostración de una capacidad sostenible de cumplir las obligaciones financieras y las obligaciones de cumplimiento. El proceso de solicitud real está en un Apéndice de estas Reglas. Los requisitos de certificación técnica pueden figurar en la Directriz de Operación de la Plataforma.</i></ul>

### 3.2 Licencias

<ul><i>Este concepto puede aplicarse o no cuando el operador del Esquema de pagos es una entidad gubernamental. Si el concepto de licencia no se incluye en las reglas, tiene que haber una disposición en la sección "Elegibilidad para participar" respecto a la terminación de un participante.</i></ul>

- A un Participante se le otorga una Licencia para participar en el Esquema de pagos y para usar la Propiedad del Esquema de pagos conforme a las Reglas de Negocio del Esquema de pagos.

- Un Participante solo puede usar la Propiedad del Esquema de pagos conforme a las Reglas de Negocio del Esquema de pagos. Las Licencias limitarán el uso de la Propiedad del Esquema de pagos a la prestación de servicios del Participante en relación con el Esquema de pagos y conforme a las Reglas.

- Las Licencias no serán exclusivas.

### 3.3 Acceso escalonado

<ul><i>Los Esquemas de pagos pueden optar por permitir que algunos solicitantes accedan al Esquema de pagos y se unan a él como participantes indirectos. Esta sección especifica las condiciones para ello. Algunos Esquemas de pagos habilitan por separado la participación indirecta técnica y la participación indirecta de liquidación.</i></ul>

<ul><i>Si se permite, se requieren términos definidos (como Banco Patrocinador y Participante Indirecto). Esta sección debería mostrar claramente cuáles son las obligaciones de cada parte; puede remitirse a las secciones de obligaciones que aparecen más adelante.</i></ul>

### 3.4 Salida de la participación

<ul><i>Disposiciones para la suspensión o terminación por parte del Esquema de pagos de la participación de un Participante en el Esquema de pagos. El Esquema de pagos puede suspender, limitar o descalificar a un Participante para participar en el Esquema de pagos si determina que la incapacidad del Participante de cumplir una Regla supone una carga indebida para el Esquema de pagos o para otros Participantes, o plantea riesgos indebidos para la integridad del Esquema de pagos o para su reputación</i></ul>

<ul><i>Disposiciones para que los Participantes terminen su participación en el Esquema de pagos</i></ul>

## 4. Reglas de Negocio del Esquema de pagos

### 4.1 Alcance de las Reglas de Negocio del Esquema de pagos

- Estas Reglas se aplican a cada Participante y rigen los derechos y las responsabilidades de los Participantes y del Esquema de pagos.

- Estas Reglas pueden quedar sustituidas en la medida en que entren en conflicto con cualquier Ley Aplicable. Nada de lo contenido en estas Reglas se aplicará de forma que obligue al Esquema de pagos o a cualquier Participante a infringir la Ley Aplicable.

- Todas las cuestiones relativas a la interpretación de las Reglas y todas las disputas que surjan en relación con la participación en el Esquema de pagos estarán sujetas a las leyes de \[xxxx\]

<ul><i>Deberían preverse disposiciones para la resolución de disputas entre Participantes o entre Participantes y el Esquema de pagos.</i></ul>

### 4.2 Cambios en las Reglas de Negocio del Esquema de pagos

- Los Participantes pueden hacer de vez en cuando sugerencias o solicitudes de modificación de las Reglas.

- El Esquema de pagos u otros Participantes pueden usar las sugerencias de modificación de las Reglas hechas por un Participante en relación con el Esquema de pagos sin compensación ni atribución al Participante que haga la sugerencia o la solicitud.

- Los cambios en las Reglas se harán conforme a un procedimiento consultivo:

- Uno o varios Participantes o el Esquema de pagos pueden proponer un cambio en las Reglas de Negocio del Esquema de pagos.

- El Esquema de pagos publicará las propuestas a todos los Participantes y solicitará comentarios y sugerencias sobre ellas; todos los comentarios recibidos se publicarán a todos los participantes.

- El Esquema de pagos puede incluir, junto con la publicación de un cambio propuesto, su sugerencia determinada de forma independiente sobre la redacción de un cambio en las Reglas,

<ul><i>El Esquema de pagos debería tener un proceso definido para adoptar cambios, que puede incluir la votación de los Participantes o la decisión del Esquema de pagos. Si hay votación, las reglas deberían especificar aquí los parámetros.</i></ul>

- El Esquema de pagos puede conceder excepciones a las Reglas a solicitud de los Participantes.

- El Esquema de pagos puede prever disposiciones para cambios urgentes que respondan a riesgos o a requisitos regulatorios.

## 5. Responsabilidades y obligaciones del Esquema de pagos

### 5.1 Definir y prestar los Servicios del Esquema de pagos

- El Esquema de pagos define el conjunto de Servicios del Esquema de pagos que se prestan a los Participantes. La lista definida de Servicios del Esquema de pagos se muestra en un Apéndice de estas Reglas.

<ul><i>Servicios del Esquema de pagos</i></ul>

- El Esquema de pagos especifica cómo se prestan los Servicios del Esquema de pagos a los Participantes: pueden operarlos la entidad del Esquema de pagos, otra entidad bajo contrato con el Esquema de pagos, o puede haber algún otro arreglo. Esta sección da al Esquema de pagos el derecho de definir servicios nuevos, cambiar los existentes, etc.

- El Esquema de pagos puede definir estándares de nivel de servicio para sí mismo, y para los participantes en el uso de esos servicios

- Para los servicios de Plataforma tercerizados, el Esquema de pagos especifica los servicios que deben prestarse. El Esquema de pagos puede especificar los acuerdos de nivel de servicio para los proveedores de esos servicios

- Para el Servicio de Liquidación del Esquema de pagos, el Esquema de pagos selecciona y contrata uno o varios Bancos liquidadores para la Liquidación entre Participantes.

- El Esquema de pagos establece un Límite de Valor de Transacción que fija el valor máximo de cualquier Transferencia hecha a través de la Plataforma del Esquema de pagos. Los DFSP pueden fijar valores más bajos para sus clientes.

- El Esquema de pagos debería considerar si garantizará al DFSP Beneficiario cualquier Transferencia completada hecha conforme a estas Reglas

<ul><i>El Esquema de pagos debería considerar si garantizará al DFSP Beneficiario cualquier Transferencia completada hecha conforme a estas Reglas.</i></ul>

### 5.2 Escribir, actualizar y mantener las Reglas

- El Esquema de pagos escribe, actualiza y mantiene las Reglas de Negocio.

- El Esquema de pagos es responsable de informar a los Participantes de cualquier cambio en las Reglas, de todas las tarifas, de las políticas que puedan afectar al uso que los Participantes hagan del Esquema de pagos, o de cualquier otra información importante y pertinente.

- El Esquema de pagos es responsable de establecer una política de aplicación de las Reglas y de comunicarla a los Participantes;

- El Esquema de pagos es responsable de establecer políticas respecto a la concesión de excepciones a las Reglas a los Participantes,

### 5.3 Otras responsabilidades del Esquema de pagos

- El Esquema de pagos administra los procesos de incorporación y de salida de los Participantes. Esos procesos figuran en un Apéndice de estas reglas.

- El Esquema de pagos supervisa la elegibilidad continuada de los Participantes conforme a los requisitos establecidos para la Participación

- El Esquema de pagos define un conjunto de Casos de Uso y Casos de Uso Secundarios. Estos figuran en un Apéndice de estas reglas

- El Esquema de pagos establece el Tarifario y define los procesos por los que se cobran las Tarifas. El Tarifario está en un Apéndice de estas reglas

- El Esquema de pagos fija la Marca del Esquema de pagos y establece directrices para su uso. Esas directrices aparecen en un Documento Asociado.

- El Esquema de pagos mide el progreso del Esquema de pagos y de sus Participantes

- El Esquema de pagos define políticas y procedimientos de Seguridad, Gestión de Riesgos y Confidencialidad de los Datos para el Esquema de pagos y sus Participantes.

- El Esquema de pagos define políticas y procedimientos para la gestión de las Excepciones de Transacción.

- El Esquema de pagos lleva a cabo actividades para promover y fomentar la adopción y el uso del Esquema de pagos.

- El Esquema de pagos planifica la mejora y la expansión a largo plazo de la Plataforma para responder a las necesidades y oportunidades cambiantes del mercado en el avance de los objetivos del Esquema de pagos.

## 6. Responsabilidades y obligaciones de los Participantes

- Los Participantes están obligados a cumplir estas Reglas de Negocio y los Documentos Asociados a estas Reglas.

- Los Participantes deben cumplir toda la Ley Aplicable respecto a su participación en el Esquema de pagos dentro de los territorios en los que operan y en los que usan los Servicios del Esquema de pagos. El Esquema de pagos no asume responsabilidad alguna por el cumplimiento de la Ley Aplicable por parte de los Participantes.

- Los Participantes deben permitir el uso y la divulgación de Datos personales según exigen estas Reglas de Negocio, y proporcionar información a sus Clientes y obtener los consentimientos necesarios respecto a ese uso y divulgación de Datos personales según exija la Ley Aplicable.

- Los Participantes aceptan pagar tarifas al Esquema de pagos y a otros Participantes según se especifica en estas reglas.

- Los Participantes se atendrán a las especificaciones de marca del Esquema de pagos según se especifica en estas reglas.

- Los Participantes usarán los Servicios del Esquema de pagos según se especifica en estas reglas.

    <ul><i>Los Esquemas de pagos tendrán que considerar si quieren: 1) exigir el uso del esquema de pagos para las transacciones elegibles para el esquema de pagos (suponiendo que tengan autoridad en las reglas para hacerlo); 2) exigir el uso de la plataforma del esquema de pagos para las transacciones "on-us" (lo que requeriría una tarifa de procesamiento aparte, probablemente cero, para esas transacciones); y, si las transacciones "on-us" no pasan por la plataforma, si el esquema de pagos quiere exigir el reporte de las transacciones "on-us" al esquema de pagos, para usarlo con una utilidad de fraude.</i></ul>

- Todas las transferencias hechas usando la Marca del Esquema de pagos o descritas como hechas con el Esquema de pagos se harán usando los Servicios del Esquema de pagos.

    <ul><i>Los Esquemas de pagos tendrán que considerar si quieren enunciar la regla anterior. Algunos Esquemas de pagos pueden querer que los Participantes usen la marca del Esquema de pagos para las transacciones on-us que no usan los Servicios del Esquema de pagos. Esto podría redactarse diciendo "todas las transferencias interoperables"</i></ul>

- _\[Opción de Liquidación Neta\]_ Los Participantes abrirán una Cuenta en el Banco liquidador especificado por el esquema de pagos, o pondrán a disposición una cuenta existente para estos fines, según permita el Esquema de pagos. _\[Opción de Liquidación Bruta Continua\]_ Los Participantes se convertirán en propietarios conjuntos de la Cuenta de Liquidación Común del Esquema de pagos y firmarán a tal efecto el Acuerdo de Cuenta en el Banco liquidador del Esquema de pagos. Los Participantes transferirán dinero hacia y desde esa cuenta desde sus cuentas existentes de reserva, de compensación o fiduciarias en el Banco liquidador del Esquema de pagos, según especifiquen las Directrices de Operación del Esquema de pagos.

- Los Participantes compartirán información con el Esquema de pagos en la medida estrictamente necesaria para la operación del Esquema de pagos, incluidos la debida diligencia, la incorporación técnica, la configuración, la gestión de transacciones y otros fines especificados en las Reglas.

- El Esquema de pagos exigirá a los Participantes que cumplan los estándares de Seguridad, Gestión de Riesgos y Confidencialidad de los Datos que especifique el Esquema de pagos.

- Los Participantes prestarán un servicio al cliente adecuado a sus clientes en relación con el Esquema de pagos.

- Los Participantes deben excluir a clientes del uso del Esquema de pagos a solicitud del Esquema de pagos cuando este determine razonablemente que un cliente plantea un riesgo para el Esquema de pagos, que puede incluir riesgo financiero, legal, de seguridad, reputacional o cualquier otro.

- Los Participantes no usarán, ni permitirán que los clientes usen, el Esquema de pagos con fines ilegales, incluidos bienes o servicios ilegales; pagos ilegales, como el soborno, el lavado de dinero o el financiamiento del terrorismo; o la caza furtiva o el tráfico de especies animales protegidas o de sus productos.

    <ul><i>Los Esquemas de pagos pueden considerar si quieren especificar que los Participantes prohíban contractualmente a los clientes usar los Servicios del Esquema de pagos con fines ilegales y que interrumpan los Servicios del Esquema de pagos a los clientes de los que sepan, o sospechen, que están usando los Servicios del Esquema de pagos para iniciar o recibir transferencias con fines ilegales</i></ul>

### 6.1 Responsabilidades y obligaciones de los Participantes como DFSP Pagadores

- Un Participante que origina una Solicitud de cotización o una Solicitud de transferencia actúa como Participante Pagador conforme a estas Reglas.

- Un Participante puede iniciar una Transacción en nombre de su Pagador para cualquier Caso de Uso o Caso de Uso Secundario que admita el Esquema de pagos.

- Un Participante Pagador está obligado a liquidar una Transferencia cuando presenta una Solicitud de transferencia, salvo que el DFSP Beneficiario rechace esa Solicitud de transferencia o que expire sin completarse mediante fulfilment.

- El Participante Pagador garantiza, al presentar cada Solicitud de transferencia, que la Transferencia procede de una cuenta que cumple con KYC y con la prevención del lavado de dinero y que se ejecuta conforme a la Ley Aplicable, y que se ha proporcionado al Pagador toda la información y que este ha dado todos los consentimientos necesarios para realizar la Transferencia conforme a estas Reglas de Negocio y a la Ley Aplicable.

- El Participante Pagador garantiza, al presentar una Solicitud de Transferencia, que su Pagador ha autorizado la Solicitud de transferencia, y que sus comunicaciones con su Pagador se han autenticado correctamente conforme a estas Reglas de Negocio y a la Ley Aplicable.

- El Participante Pagador reconoce que la Plataforma rechazará una Solicitud de transferencia si la Transferencia propuesta infringiera estas Reglas de Negocio, por ejemplo si superara el Límite de débito neto del Participante Pagador.

### 6.2 Responsabilidades y obligaciones de los Participantes como DFSP Beneficiarios

- Un Participante que recibe una Solicitud de cotización o una
 Solicitud de transferencia y responde a ella actúa como Participante Beneficiario conforme a estas Reglas.

- Un Participante Beneficiario que recibe una Solicitud de cotización debe responder, en ausencia de problemas técnicos, con una Respuesta a la solicitud de cotización si:

  - La Cuenta Transaccional del Beneficiario en el Participante Beneficiario está en regla y es capaz de recibir, en ese momento, el Monto de la transferencia, y

  - Aceptar la Transferencia no dejará la cuenta del Beneficiario en un estado no permitido por la Ley Aplicable o por las políticas y los acuerdos de cuenta del Participante.

  - El Participante Beneficiario afirma, al iniciar una Respuesta a la solicitud de cotización que no sea una respuesta de error, que la cuenta del Beneficiario ha sido Validada: está abierta, en regla y es capaz de aceptar el Monto de la transferencia propuesto en ese momento.

- El Participante Beneficiario afirma, al iniciar una Respuesta a la solicitud de cotización que no sea una respuesta de error, que una Transferencia a la cuenta designada cumple en ese momento con los requisitos aplicables de prevención del lavado de dinero, de combate al financiamiento del terrorismo y de KYC.

- Un Participante Beneficiario que recibe una Solicitud de transferencia debe, en ausencia de problemas técnicos, responder con una Respuesta a la solicitud de transferencia con el Estado de Transacción "Committed" si:

  - Ha recibido una Solicitud de cotización y ha respondido con una Respuesta a la solicitud de cotización para la Transacción, y

  - La Respuesta a la solicitud de cotización aún no ha expirado

  - La Cuenta Transaccional del Beneficiario en el Participante Beneficiario está en regla y es capaz de recibir, en ese momento, el Monto de la transferencia, y

  - Aceptar la Transferencia no dejará la cuenta del Beneficiario en un estado no permitido por la Ley Aplicable o por las políticas y los acuerdos de cuenta del Participante, y

  - La Solicitud de transferencia de la Transacción no ha expirado.

- Un Participante Beneficiario que envía una Respuesta a la solicitud de transferencia con el Estado de Transacción "Committed" debe contabilizar esa Transferencia en la cuenta del Beneficiario en un plazo de \[X tiempo\].

- Un Participante Beneficiario que recibe una Solicitud de transferencia que no cumple los criterios anteriores debe responder con una Respuesta a la solicitud de transferencia con el Estado de Transacción "Aborted".

- El Participante Beneficiario debe afirmar, al presentar cada Respuesta a la solicitud de transferencia con el Estado de Transacción "Committed", que la Transferencia se está acreditando en una cuenta que cumple con la prevención del lavado de dinero y que se ejecuta conforme a cualquier limitación de volumen de la cuenta, o a cualquier otra regulación que se aplique en los territorios en los que opera, y que se ha proporcionado al Beneficiario toda la información y que este ha dado todos los consentimientos necesarios para realizar la Transferencia conforme a las Reglas y a la Ley Aplicable.

## 7. Responsabilidad - Asignación de responsabilidades

- Cada Participante es responsable de los errores que cometa, y del fraude que cometan sus empleados o contratistas, conforme a la Ley Aplicable.

- No se responsabilizará al Esquema de pagos, y cada Participante indemnizará y defenderá al Esquema de pagos frente a reclamaciones derivadas de actos u omisiones de los Participantes, de sus Clientes o de sus contratistas.

- El Esquema de pagos puede optar por defender cualquier reclamación en circunstancias en las que determine que la resolución de esa reclamación puede tener un impacto adverso en las finanzas, las operaciones o la reputación del Esquema de pagos.

- El Esquema de pagos será responsable de sus propios errores en el procesamiento de Transferencias dentro de los límites que prescriban las Reglas.

- El Esquema de pagos compensará a los Participantes por los costos de los fondos en la medida en que un Participante se vea privado indebidamente de fondos durante un periodo de tiempo como consecuencia de errores cometidos por el Esquema de pagos.

- Cada Participante es responsable de los actos y omisiones de cualquier contratista que contrate para prestar servicios en relación con el Esquema de pagos en la misma medida que si los hubiera cometido el propio Participante.

- El Esquema de pagos puede asignar entre los Participantes la responsabilidad por las consecuencias del uso o el acceso no autorizados a datos por parte de un Participante, o por un Incidente de seguridad sufrido por un Participante que afecte a otros Participantes o al Esquema de pagos, conforme a los principios enunciados en las Reglas.

## 8. Seguridad, gestión de riesgos y confidencialidad de los datos 

### 8.1 Confidencialidad y protección de los Datos personales

- Los Participantes mantendrán en confidencialidad la Información Confidencial del Esquema de pagos que se les divulgue y la usarán únicamente para los fines permitidos por las Reglas. La Información Confidencial del Esquema de pagos puede incluir tecnología propietaria y otras cuestiones que designe el Esquema de pagos.

- Los datos de las transacciones no serán propiedad del Esquema de pagos y serán propiedad de un Participante en lo relativo a las Transacciones de sus Clientes.

- El Esquema de pagos y los Participantes protegerán la confidencialidad de los datos de las Transacciones y de cualesquiera Datos personales procesados en la Plataforma conforme a la Ley Aplicable.

- Las estadísticas o los datos que identifiquen a un Participante, o a partir de los cuales pueda identificarse al Participante, no se divulgarán a otros Participantes. El Esquema de pagos puede preparar para uso interno, y divulgar a terceros con fines promocionales, estadísticas basadas en datos agregados y anonimizados según permita la Ley Aplicable.

- El Esquema de pagos divulgará Información Confidencial para cumplir la Ley Aplicable o la directiva de una Autoridad Reguladora.

- El Esquema de pagos protegerá del uso indebido los Datos personales que estén en su posesión o bajo su control y, por lo demás, tratará esa información conforme a la Ley Aplicable que protege la privacidad de las personas.

- El Esquema de pagos mantendrá medidas de seguridad punteras en el sector para proteger la información frente al acceso y el uso no autorizados.

- Los Participantes notificarán al Esquema de pagos, y reconocen que el Esquema de pagos puede notificar a otros Participantes, cualquier Incidente de seguridad en los sistemas o las instalaciones del Participante, de sus entidades afiliadas o de cualquier proveedor externo contratado por el Participante para prestar servicios en apoyo de su participación en el Esquema de pagos.

- El Esquema de pagos puede llevar a cabo investigaciones sobre los Incidentes de seguridad. Los Participantes cooperarán plena y rápidamente con la investigación. Esas investigaciones correrán a cargo del Participante afectado.

- El Esquema de pagos puede exigir a un Participante que lleve a cabo investigaciones de los Incidentes de seguridad y puede exigir que esas investigaciones las realicen auditores de seguridad independientes y cualificados que sean aceptables para el Esquema de pagos.

- El Esquema de pagos puede imponer al Participante afectado condiciones de participación continuada relativas a la subsanación de las causas del Incidente de seguridad y a las medidas de seguridad continuas.

- La investigación y el informe, así como las medidas correctoras que puedan exigirse, se mantendrán confidenciales en la medida en que lo permita la Ley Aplicable.

### 8.2 Políticas de gestión de riesgos

<ul><i>Esta sección asume que el desarrollo de políticas de gestión de riesgos por parte del Esquema de pagos y de sus participantes irá evolucionando. Esta sección contempla que algunas de esas políticas estarán (con el tiempo) en las Reglas; otras no.</i></ul>

- Las políticas y los procedimientos de gestión de riesgos pueden enunciarse en las Reglas, en Documentos Asociados o en otros documentos de política escritos que cree el Esquema de pagos y distribuya a los Participantes

- Las políticas y los procedimientos de gestión de riesgos incluirán la solidez fiscal, la integridad del sistema y el cumplimiento de la Ley Aplicable, en particular en lo relativo a las medidas de prevención del lavado de dinero y de combate al financiamiento del terrorismo, la privacidad de los datos personales y la seguridad de los datos

- Las funciones de gestión de riesgos incluyen procedimientos aplicables a los Participantes para la supervisión de los riesgos, incluidos los requisitos de reporte y las auditorías

### 8.3 Continuidad del negocio

- Disposiciones para asegurar la continuidad del negocio por parte del Esquema de pagos, de sus proveedores y de los Participantes.

## 9. Plataforma y Servicios del Esquema de pagos

- El Esquema de pagos define el conjunto de Servicios del Esquema de pagos a los que acceden los Participantes para usar el sistema. Estos figuran en un Apéndice de este documento. Los Servicios del Esquema de pagos esenciales que son necesarios para la interoperabilidad se consideran la Plataforma del Esquema de pagos.

- Los detalles técnicos y operativos sobre el uso de los Servicios del Esquema de pagos, incluida la Plataforma del Esquema de pagos, se proporcionan en Documentos Asociados. Esta lista de Documentos Asociados es un Apéndice de este documento.

## 10. Gestión de excepciones

- Durante la ejecución de una Transacción pueden producirse problemas que den lugar a casos de excepción, que pueden requerir la comunicación entre Participantes o verse facilitados por ella. Los casos de excepción pueden incluir errores por parte de cualquiera de las partes, fraude u otras anomalías del servicio.

- El Esquema de pagos creará y mantendrá protocolos por los que los Participantes puedan determinar el tipo de excepción y las acciones sugeridas o exigidas a los Participantes para resolverla. Esos protocolos figuran en un Documento Asociado.

- Los siguientes principios rigen la gestión de excepciones:

  - Los Participantes implicados cooperarán de buena fe.

  - Cada Participante acepta que no contactará directamente con el cliente del otro Participante durante el proceso de resolución de disputas.

  - Los Participantes aceptan cooperar entre sí y con el Esquema de pagos para compartir información sobre fraude sospechado o confirmado.

### 10.1 Irrevocabilidad de la transacción

- Los Participantes aceptan que las Transferencias completadas que se ejecutan a través de la Plataforma son irrevocables. Una Transferencia que se ha acreditado en la cuenta de un Beneficiario como resultado de una Transferencia del Esquema de pagos no puede revocarse sin el consentimiento del Beneficiario.

- El Esquema de pagos puede instruir a un Participante para que inicie una transacción correctora entre Participantes por un monto que el Esquema de pagos determine necesario para corregir errores causados por el DFSP Pagador, el DFSP Beneficiario o el Esquema de pagos.  Las condiciones en las que pueden hacerse esas transacciones correctoras se especifican en las Reglas. 

- Los errores por parte del DFSP Beneficiario, del DFSP Pagador o del Esquema de pagos que den lugar a una contabilización errónea o duplicada de una Transferencia en la cuenta de un Beneficiario puede corregirlos el Participante Beneficiario, siempre que las instrucciones de la Transferencia completada no se revoquen ni se alteren de ningún modo.

## 11. Apéndice: Documentos Asociados

- Glosario Uniforme

- Directriz de Operación de la Plataforma

- Directriz de Marca

- Protocolos de Gestión de Excepciones

## 12. Apéndice: Procesos de incorporación y de salida

## 13. Apéndice: Servicios del Esquema de pagos

Los Servicios del Esquema de pagos incluyen:

- La Plataforma del Esquema de pagos, que incluye

  - El Servicio de Transferencia

  - El Servicio de Directorio

  - El Servicio de Liquidación

  - El Servicio de Gestión del Esquema de pagos

- Otros Servicios Compartidos

  - La Utilidad de Gestión del Fraude

## 14. Apéndice: Casos de uso admitidos por el Esquema de pagos

<ul><i>Los Casos de Uso se definen por qué tipo de cliente paga a qué otro tipo de cliente, y por el propósito del pago. Los casos de uso secundarios son subconjuntos de los Casos de Uso y se usan para mostrar diferencias más finas entre transferencias. Todas las transferencias hechas a través de los Servicios del Esquema de pagos pueden clasificarse en un Caso de Uso y un Caso de Uso Secundario, y solo en uno.</i></ul>

<ul><i>El Caso de Uso y el Caso de Uso Secundario de una Transacción pueden hacer que se apliquen detalles operativos y técnicos distintos, según se especifica en la Directriz de Operación de la Plataforma; que se apliquen tasas de intercambio distintas, según se especifica en un Apéndice de estas reglas; y que se apliquen requisitos distintos para los procedimientos de gestión de excepciones, según se especifica en un Documento Asociado a estas reglas</i></ul>

<ul><i>Todos los Casos de Uso y Casos de Uso Secundarios admitidos por el Esquema de pagos se definen por atributos de las transacciones, que se especifican en la Guía de Operación de la Plataforma.</i></ul>

<ul><i>Lo siguiente es un ejemplo de una tabla de Casos de Uso y Casos de Uso Secundarios que un esquema de pagos podría admitir.</i></ul>

<ul><i>Un esquema de pagos solo definiría Casos de Uso Secundarios si quisiera escribir reglas o especificar tarifas que sean exclusivas de ese Caso de Uso Secundario</i></ul>

|       | Caso de uso   | Caso de uso secundario          |
| :---: | :--------: | :-------------------------- |
| 1.0 | P2P | Persona a persona |
| 1.1 | P2P | Billetera a billetera |
| 1.2 | P2P | Banco a banco |
| 1.3 | P2P | Billetera a banco |
| 1.4 | P2P | Banco a billetera |
| 2.0 | Pago masivo |  |
| 2.1 | B2P | De empresa a persona |
| 2.2 | G2P | Gobierno a persona |
| 3.0 | P2B | Persona a empresa |
| 3.1 | P2B | Compra con número de caja |
| 3.2 | P2B | Compra con código QR |
| 3.3 | P2B | Compra en línea |
| 3.4 | P2B | Pago de facturas |
| 3.5 | P2B | Persona a empresa - Otros |
| 4.0 | P2G | |
| 4.1 | P2G | Persona a gobierno |
| 4.1 | P2G | Compra con número de caja |
| 4.2 | P2G | Compra con código QR |
| 4.3 | P2G | Compra en línea |
| 4.4 | P2G | Pago de facturas |

## 15. Apéndice: Tarifario del Esquema de pagos

1. Tarifas de procesamiento

   - Las tarifas de procesamiento se calculan por \[definir\]

   - Las tarifas de procesamiento se aplican a las transferencias completadas

   - Las tarifas de procesamiento se cobran a \[qué parte o partes\]

   - Las tarifas de procesamiento por las transferencias "on-us" (en las que el DFSP Pagador y el Beneficiario son el mismo) \[se cobran o no se cobran\]

   - Las tarifas de procesamiento se calcularán y se facturarán a los Participantes \[definir\]

   - Disposición sobre cómo pagarán los Participantes las facturas de procesamiento \[definir\]

2. Cuotas de membresía o de participación

   - Las Cuotas de membresía o de participación se cobran a \[definir\]

   - Especificar la base, cómo se cobran, etc.

3. Tasas de intercambio

   - Las tasas de intercambio las fija el Esquema de pagos

   - El monto de la tarifa y la dirección (qué Participante paga a cuál) varían según el Caso de Uso y el Caso de Uso Secundario. Algunos Casos de Uso y Casos de Uso Secundarios no tendrán tasa de intercambio.

   - \[Definir cómo cobrará y pagará la plataforma la tasa de intercambio: por transacción o de forma periódica.\]

## 16. Apéndice: Gestión de riesgos, seguridad, privacidad y estándares de servicio

<ul><i>Los Esquemas de pagos pueden querer especificar estándares, o exigir que los Participantes cumplan otros estándares establecidos, o no. Los Esquemas de pagos pueden además especificar estándares distintos para distintas categorías de Participantes. La lista siguiente se da meramente como ejemplo.</i></ul>

Los Participantes deben atenerse a las siguientes prácticas de calidad del servicio, seguridad, privacidad de los datos y servicio al cliente en lo que se apliquen a un Participante en relación con el Esquema de pagos.

- Los Participantes establecerán un marco de gestión de riesgos para identificar, evaluar y controlar los riesgos relativos a su uso del Esquema de pagos.

- Los Participantes asegurarán que los sistemas, las aplicaciones y la red que dan soporte al uso del Esquema de pagos se diseñen y se desarrollen de forma segura.

- Los Participantes implementarán procesos para gestionar de forma segura todos los sistemas y operaciones que dan soporte al uso del Esquema de pagos.

- Los Participantes implementarán procesos para asegurar que los sistemas usados para el Esquema de pagos estén protegidos frente a la intrusión o el uso indebido no autorizados.

- Los Participantes implementarán procesos para asegurar la autenticación
    de sus clientes al crear y aprobar transacciones que usen
    el Esquema de pagos.

-   Los Participantes desarrollarán planes eficaces de continuidad del negocio
    y de contingencia.

-   Los Participantes gestionarán las operaciones técnicas y de negocio de forma que permitan
    respuestas oportunas a las llamadas a la API que reciban de la Plataforma del Esquema de pagos o
    de otros Participantes a través de la Plataforma del Esquema de pagos.

-   Los Participantes establecerán acuerdos escritos que rijan su
    relación con los agentes, los procesadores y otras entidades que presten
    servicios tercerizados relacionados con el Esquema de pagos.

-   Los Participantes desarrollarán políticas y procesos para la gestión
    y la supervisión continuas del personal, los agentes, los procesadores y otras
    entidades que presten servicios tercerizados relacionados con el Esquema de pagos.

-   Los Participantes asegurarán que se proporcione a los clientes información clara,
    destacada y oportuna sobre las tarifas y los términos y
    condiciones relativos a los servicios que usan el Esquema de pagos.

-   Los Participantes desarrollarán y publicarán políticas y procedimientos de servicio
    al cliente relativos a los servicios que usan el Esquema de pagos.

-   Los Participantes proporcionarán un mecanismo adecuado para que los clientes
    planteen preguntas y problemas. Los Participantes especificarán cómo
    pueden resolverse las disputas si falla la resolución interna.

-   Los Participantes cumplirán las buenas prácticas y las Leyes Aplicables
    que rigen la privacidad de los datos de los clientes.

-   Los Participantes asegurarán que se proporcione a los Clientes información clara,
    destacada y oportuna sobre sus prácticas de privacidad
    de datos.

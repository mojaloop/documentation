---
i18n_source_sha: aa4bf0610f8ed07b4be39e030618bf48edc7f918
---

# Portales y características operativas

Los aspectos de los portales y de otras características operativas que se abordan son:

-   Gestión de usuarios

-   Gestión de participantes

-   Revisión de transacciones

-   Liquidación

-   Registro y auditoría

-   Gestión del Hub

-   Gestión de oráculos

-   Portal del participante

-   Generación de informes

Estas funciones se proporcionan a través del Business Operations
Framework (BOF) de Mojaloop, que no solo proporciona las funciones
principales descritas aquí, sino que también ofrece un conjunto de API para que
un operador del Hub pueda extender estos portales y crear otros nuevos, a fin de satisfacer sus requisitos específicos.

El BOF canaliza toda la actividad a través de un único marco de Identity and Access
Management (IAM), que incorpora controles de acceso basados en roles
(RBAC), lo que le da al operador del hub un control granular del acceso de cada persona
a las capacidades de gestión del Hub de Mojaloop.

El acceso a cada una de las funciones anteriores se implementa mediante el BOF y
se gestiona mediante el IAM y el RBAC.

## Gestión de usuarios 

Estas características se refieren a la gestión del personal del operador del hub
mediante el módulo IAM integrado, y no a la gestión del servicio
en sí.

1.  Crear y gestionar cuentas de usuario para el personal del operador del hub y
    de los participantes a través del portal IAM.
2.  Definir los roles asociados al acceso a los distintos subelementos de los
    portales.
3.  Asignar roles a las cuentas de usuario, definiendo qué usuarios tienen acceso a
    qué características de los portales.
4.  Para las funciones sensibles, definir un requisito de maker/checker,
    incluidos los roles que deben tener el maker y el checker,
    y cualquier restricción.
5.  Habilitar o deshabilitar cuentas de usuario.
6.  Crear cuentas de usuario para los participantes, a fin de facilitar el autoservicio
    a través del Portal del participante (cuando se implemente).
7.  Permitir que un usuario sea maker y checker (pero no de su propio
    trabajo).

Tenga en cuenta que el Portal del participante todavía no está implementado por ningún hub
de Mojaloop, por lo que actualmente no es un requisito.

## Gestión de participantes

Características que permiten a un operador del hub gestionar un DFSP participante (tenga en
cuenta que esto es distinto del Portal del participante).

1.  Incorporación de un DFSP participante.
2.  Definir y gestionar los endpoint (incluida la especificación de
    certificados e IP de origen)
3.  Gestionar los contactos del participante (nombre, correo electrónico, MSISDN, rol, etc.).
4.  Definir umbrales (para las notificaciones).
5.  Definir y gestionar las cuentas del participante por tipo y moneda.
6.  Deshabilitar un DFSP participante (aunque no debería ser posible
    deshabilitar un DFSP con transacciones pendientes o no liquidadas).
7.  Pausar o reanudar la conexión de un participante.
8.  Asignar o ajustar la liquidez (para múltiples monedas), con control
    de maker/checker.
9.  Asignar o ajustar un límite de débito neto (NDC) para cada participante, controlado
    por maker/checker, con dos opciones para el NDC: valor fijo
    (ajuste manual después de cada cambio de liquidez) o variable (como un
    porcentaje fijo de la liquidez disponible).
10. Restringir la conexión del participante solo a envío o solo a recepción.

## Revisión de transacciones

El personal del operador del hub debe poder encontrar los detalles de una
transacción, cualquiera que sea su estado. Puede buscar por:

-   Rango de fecha y hora

-   DFSP pagador o beneficiario (participante)

-   Valor - ID de transacción de Mojaloop

-   Estado de la transferencia

-   ID del lote de liquidación

-   Tipo de transacción

-   Código de error

La búsqueda devuelve una lista de todas las transacciones que coinciden con los criterios
de búsqueda, cada una de ellas clicable para obtener una vista detallada, que da acceso a:

-   Todos los detalles que conserva el Hub de Mojaloop, agrupados en un conjunto de
    subventanas para mejorar la usabilidad

Esto incluirá el ID de la ventana de liquidación o del lote, que a su vez es
clicable para permitir que el operador revise el estado de liquidación del
lote y, por lo tanto, de la transacción misma.

## Liquidación

La gestión de la función de liquidación del Hub de Mojaloop debe ser
robusta y confiable. Las características relacionadas son:

1.  Definir el modelo de liquidación que se usará para el servicio
2.  Cerrar una ventana de liquidación o un lote, ya sea manualmente o
    automáticamente, según un calendario predefinido
3.  Crear automáticamente todos los archivos de liquidación necesarios para
    la integración con el socio o los socios de liquidación cuando se cierra una ventana
    de liquidación
4.  Revisar las posiciones de todos los participantes en la ventana
    de liquidación o el lote
5.  Una vez completada o finalizada la liquidación, actualizar automáticamente
    las posiciones y la liquidez disponible actual a partir de los
    informes del socio o los socios de liquidación
6.  Proporcionar herramientas que respalden la integración entre el Hub de Mojaloop
    y el socio o los socios de liquidación.

Tenga en cuenta que siempre habrá al menos una ventana de liquidación o un lote abierto,
y que las transacciones se irán agregando a la ventana de liquidación o el lote abierto a medida que
se procesen. Esto significa que la creación de una nueva ventana de liquidación
es automática cuando se cierra la ventana de liquidación existente.

## Registro y auditoría 

El Hub de Mojaloop proporciona una variedad de herramientas que respaldan el registro y
la auditoría de la actividad del operador, además de funciones de auditoría de bajo nivel para
el análisis detallado del procesamiento de transacciones (que se definen
en otra parte de este documento). Estas herramientas se han desarrollado teniendo en cuenta
los requisitos tanto de la gerencia del operador del Hub como de los auditores
externos.

1.  Todas las modificaciones derivadas de la actividad del operador del hub (incluida la gestión
    de usuarios) se registran en un almacén de datos no editable, con las
    credenciales del operador adjuntas

2.  "Auditor" es un rol de usuario predeterminado del hub; los auditores tienen acceso de
    lectura sin restricciones a los registros.

3.  Se dispone de un portal de auditoría, que cuenta con funcionalidad de búsqueda
    y refinamiento

4.  Las entradas de registro y auditoría incluyen los cambios en la configuración del Hub.

## Gestión del Hub 

Existen algunos requisitos básicos para la configuración de un Hub de
Mojaloop, que definen el servicio que este admite.

1.  Un Hub de Mojaloop admite por defecto todas las monedas definidas por ISO. Cada
    una se habilita para su uso en un despliegue determinado mediante la creación de
    cuentas de liquidación y de posición para esa moneda. Para respaldar
    esto, existe el requisito de poder ver los saldos de las cuentas
    operativas del Hub (de liquidación y de posición, replicadas por cada moneda
    admitida)

2.  Agregar, ver y eliminar los certificados de CA necesarios para la operación normal.

## Gestión de oráculos

Gestión de los oráculos que utiliza el Account Lookup Service (ALS) para
la resolución de alias a DFSP o participantes (y luego, en
colaboración con el DFSP identificado, a una cuenta específica).

1.  Ver los oráculos registrados

2.  Registrar un oráculo

3.  Definir un endpoint

4.  Probar el estado de salud de un oráculo

## Portal del participante

Actualmente, el Hub de Mojaloop no ofrece un Portal del participante.
En cambio, esta funcionalidad la proporciona otro proyecto de código abierto,
Payment Manager (<https://github.com/pm4ml>). Otras herramientas, como
el Integration Toolkit de Mojaloop, proporcionan una API que permite a los DFSP acceder
a la misma información.

## Informes

Mojaloop proporciona un motor de informes flexible como parte del Business
Operations Framework, que permite al personal del operador del Hub diseñar y
generar una amplia variedad de informes a partir de los datos que se encuentran en las bases de
datos y los libros mayores de Mojaloop. El Framework también admite la integración de
esos informes en cualquiera de los portales del operador, lo que permite generar los informes
según lo requiera el personal de operaciones.

Esto incluye los informes relacionados con la liquidación.

## Aplicabilidad

Esta versión de este documento corresponde a la versión [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0) de Mojaloop

## Historial del documento
  |Versión|Fecha|Autor|Detalle|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|14 de abril de 2025| Paul Makin|Actualizaciones relacionadas con el lanzamiento de la V17|
|1.0|5 de febrero de 2025| Paul Makin|Versión inicial|
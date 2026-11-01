---
i18n_source_sha: 1b7350ad2a217368cf54e3dd344aaf6ca9feda86
---

# Guía de arquitectura de seguridad para la infraestructura de los DFSP

*Un marco para los esquemas de pagos que evalúan a los proveedores de
infraestructura de DFSP frente a las amenazas que los DFSP enfrentan en la
práctica.*

- Versión: 1.0
- Autor: Yevhen Kyriukha
- Fecha: mayo de 2026

## Alcance

Esta guía aborda el hardware y el entorno del host que se operan dentro del
dominio del DFSP, incluida la infraestructura en la que se ejecutan el
software de conectividad, los servicios de firma, los componentes de gestión
de certificados y las cargas de trabajo relacionadas.

## Resumen ejecutivo

La seguridad de la infraestructura de los DFSP es una propiedad del sistema
en su conjunto, no de ningún componente dentro de él. Un sistema es seguro
frente a la amenaza realista cuando todas las siguientes propiedades
arquitectónicas están presentes de forma conjunta y se refuerzan entre sí:
integridad del arranque resistente a ataques físicos, derivación de claves
vinculada a un estado del sistema sin modificar, aislamiento de cargas de
trabajo, confidencialidad de las cargas de trabajo, separación de claves por
carga de trabajo, operaciones de firma restringidas y auditoría con
evidencia de manipulación. Cada una aborda una faceta de la amenaza. Ninguna
aborda la amenaza por sí sola, y la ausencia de cualquiera de ellas deja un
camino por el cual la amenaza realista elude a las demás.

Los conjuntos de componentes criptográficos que combinan HSM, TPM y arranque
seguro (secure boot) no satisfacen este requisito por sí solos. Los
componentes dependen de una cadena de confianza que la amenaza realista
ataca y, una vez vencida esa cadena, cada componente sigue firmando,
sellando y verificando todo lo que se le pida. Este documento ofrece el
marco que los esquemas de pagos necesitan para evaluar la infraestructura de
los DFSP por su coherencia arquitectónica y no por la presencia de
componentes.

## Descripción general

Cuando un DFSP se incorpora a un esquema de pagos de Mojaloop, depende de
hardware y software para conectarse al Hub, firmar transacciones y proteger
las claves criptográficas. La seguridad de esta infraestructura determina si
se puede confiar en que el participante autorice transacciones en nombre de
sus clientes. Si la infraestructura se ve comprometida, las transacciones
fraudulentas se vuelven indistinguibles de las legítimas y el modelo de
confianza del esquema de pagos se quiebra en ese participante.

### Lo que los atacantes hacen en la práctica

El modelo de amenazas de la infraestructura de los DFSP es sencillo. Los
atacantes buscan un beneficio económico mediante la autorización fraudulenta
de transacciones. Usan herramientas de uso corriente y técnicas documentadas
públicamente. Hay tres caminos por los que llegan a los sistemas de los
DFSP: explotando vulnerabilidades de software o compromisos de la cadena de
suministro que les otorgan ejecución de código en las computadoras del
participante; robando credenciales de administrador mediante phishing,
malware o ingeniería social; o bien, en los despliegues a nivel de
sucursal y rurales donde la seguridad física es variable, robando el equipo
mismo y forzándolo en un laboratorio.

En ninguno de estos casos el objetivo del atacante es extraer claves
criptográficas del hardware seguro. El objetivo es obtener el control de la
computadora que ejecuta el software de conectividad del DFSP y luego pedirle
a esa computadora que firme transacciones fraudulentas exactamente como lo
haría el software legítimo. Desde la perspectiva del Hub, las transacciones
resultantes parecen auténticas. Están firmadas por la capacidad de firma
legítima del participante, a solicitud del atacante.

La infraestructura debe resistir no el robo de claves criptográficas, sino
el compromiso de la computadora que las utiliza. Unas cerraduras
inquebrantables en una puerta de madera delgada no protegen una entrada; un
atacante atraviesa el panel de la puerta. Una infraestructura con
componentes criptográficos sólidos pero con un entorno del host débil comete
el mismo error.

### Por qué fallan las listas de verificación de componentes

Un supuesto habitual en las adquisiciones es que un sistema con un HSM, un
TPM y arranque seguro proporciona tres capas de defensa independientes. No
es así. El arranque seguro es el anclaje de confianza de la plataforma. Las
mediciones del TPM las produce la cadena de arranque que verifica el
arranque seguro. Las claves selladas por el TPM, incluidas las credenciales
que se autentican ante el HSM, dependen de que esas mediciones sean
auténticas. El HSM firma para cualquier sistema que posea credenciales
válidas.

Si el arranque seguro se vence por cualquiera de las vías de acceso físico
documentadas en la investigación pública, la cadena se derrumba: el arranque
controlado por el atacante informa las mediciones que elija, las
credenciales selladas por el TPM se desellan en el sistema comprometido y el
HSM firma todo lo que solicite el host comprometido. Las claves del HSM
siguen siendo no extraíbles en todo momento. Pero la extracción no es la
amenaza. La amenaza es la invocación de la ruta de firma legítima desde un
host comprometido, y todo el conjunto de componentes sigue siendo utilizable
desde ese host porque cada componente confía en la capa inferior.

La misma dependencia se aplica a los escenarios de compromiso del host que
no requieren vencer el arranque seguro. Un atacante que obtiene acceso a
nivel de kernel mediante vectores de software, de la cadena de suministro u
operativos alcanza las credenciales que se autentican ante el HSM por la
misma ruta por la que las alcanza la aplicación legítima. El HSM firma. Las
claves siguen siendo no extraíbles. El fraude queda autorizado.

### Por qué la coherencia importa más que cualquier propiedad individual

Las propiedades arquitectónicas mencionadas en el resumen ejecutivo abordan
facetas específicas de la amenaza realista. Cada una es bien conocida por
separado e insuficiente por separado. Un sistema con aislamiento de cargas
de trabajo pero con una integridad del arranque débil queda vulnerado cuando
el equipo es robado y la cadena de arranque se elude en un laboratorio. Un
sistema con una integridad del arranque sólida pero sin aislamiento de
cargas de trabajo queda vulnerado cuando una de sus cargas de trabajo se ve
comprometida por una vulnerabilidad de software. Un sistema con aislamiento
de cargas de trabajo pero sin confidencialidad de las cargas de trabajo
queda vulnerado cuando una carga de trabajo comprometida emplea el análisis
de canal lateral contra el cifrado de memoria compartida para recuperar las
claves que protegen a otras cargas de trabajo. Un sistema que cuenta con
todo lo anterior pero sin separación de claves por carga de trabajo permite
que una carga de trabajo comprometida firme en el ámbito de otra. La
arquitectura es segura frente a la amenaza realista solo cuando las
propiedades están presentes de forma conjunta, en una configuración en la
que la protección de cada propiedad no se vea socavada por la ausencia de
otra.

Los esquemas de pagos que evalúan proveedores no deberían preguntar qué
componentes o propiedades están presentes, sino cómo la arquitectura en su
conjunto se defiende frente a la amenaza realista. ¿Qué dependencias existen
entre los componentes? ¿Qué sigue protegido si se vence una capa inferior?
¿La violación de un único supuesto arquitectónico derrumba las defensas del
sistema?

## Por qué existe esta guía

La seguridad de la infraestructura de los DFSP no es una propiedad de ningún
componente individual, y no se produce al combinar varios componentes en una
lista de verificación de adquisiciones. Es una propiedad de la arquitectura
en la que se disponen los componentes, de las dependencias entre ellos y de
si la arquitectura en su conjunto aborda el modelo de amenazas realista. Por
lo tanto, los esquemas de pagos que evalúan proveedores deberían evaluar la
infraestructura frente a la arquitectura, no frente a la presencia de
componentes criptográficos nombrados, por exhaustiva que sea.

Este documento presenta el marco para esa evaluación. Comienza con el modelo
de amenazas (lo que los atacantes hacen en la práctica) y luego describe las
propiedades arquitectónicas que, en conjunto, abordan esa amenaza, las
dependencias entre ellas y las preguntas que los esquemas de pagos deberían
exigir que los proveedores respondan. El marco es neutral en cuanto a la
tecnología: define las propiedades que los esquemas de pagos deberían
evaluar, no los mecanismos que los proveedores deben usar para
implementarlas.

## El modelo de amenazas de la infraestructura de los DFSP

Los atacantes que apuntan a la infraestructura de los DFSP no suelen ser
adversarios de nivel estatal con capacidad criptoanalítica de laboratorio.
Son adversarios que buscan un beneficio económico mediante la autorización
fraudulenta de transacciones, con acceso a la investigación pública de
vulnerabilidades, a herramientas de ataque de uso corriente y (para la
variante de ataque físico que se analiza más adelante) a equipos de análisis
de hardware de banco de trabajo para ataques de canal lateral y de fallas.
El equipo para la interceptación de buses, la inyección de fallas y el
análisis electromagnético o de consumo se ha vuelto económico y está
ampliamente disponible.

Hay tres caminos realistas por los que los atacantes obtienen el acceso
necesario para autorizar transacciones fraudulentas.

**Compromiso de la red o de la cadena de suministro.** El atacante explota
una vulnerabilidad en el software que se ejecuta en el host del
participante: un servicio expuesto a la web, una herramienta de agregación
de registros, un agente de monitoreo o cualquiera de las decenas de
dependencias que componen un despliegue típico. Las vulnerabilidades de
escape de contenedor se publican con regularidad y siguen siendo explotables
en la práctica. [Copy Fail (CVE-2026-31431, abril de
2026)](https://copy.fail) es una demostración reciente de que los límites de
los contenedores se derrumban cuando se explota el kernel compartido. Los
ataques a la cadena de suministro entregan código malicioso a través de
canales de actualización legítimos, dependencias comprometidas o medios de
instalación manipulados. Cualquiera de las dos vías produce ejecución de
código en el host, por lo general con privilegios suficientes para invocar
las interfaces normales de la aplicación.

**Compromiso operativo.** Las credenciales se roban mediante phishing o
malware en las estaciones de trabajo de los administradores, la ingeniería
social compromete al personal de operaciones o el acceso de personas
internas proporciona acceso directo al sistema.

**Incautación física más análisis de laboratorio.** El atacante obtiene la
posesión física de la infraestructura del DFSP (por robo en una sucursal,
interceptación durante el transporte o incautación en una ubicación sin
vigilancia) y la lleva a un laboratorio. Con la posesión física y equipos de
banco de trabajo, el atacante vence la integridad del arranque del sistema
para obtener acceso root en un sistema que sigue funcionando y que conserva
sus claves operativas, sus certificados y su configuración. Este camino es
realista para cualquier despliegue donde la seguridad física sea
variable. Las instalaciones a nivel de sucursal, los sitios rurales y la
infraestructura alojada fuera de instalaciones controladas están
habitualmente al alcance del robo oportunista. Los ataques disponibles en un
laboratorio están bien documentados: reemplazo del medio de arranque, abuso
del modo de recuperación, exposición de la interfaz de depuración, etapas
tempranas del arranque vulnerables e inyección de fallas contra las rutas de
verificación, todos disponibles a precios de aficionado.

El objetivo del atacante en los tres caminos es el mismo: producir firmas
que el Hub acepte. El camino realista dominante es el compromiso del host
que conduce a la invocación de la interfaz de firma legítima. El atacante
que ha comprometido el host posee las credenciales que el participante usa
para autenticarse ante el Hub. Con esas credenciales, el atacante invoca la
misma interfaz que invoca la aplicación legítima y (mediante el mismo plano
de control del lado del Hub que permite a los participantes gestionar su
propia conectividad) ajusta los controles de acceso de la capa de red, los
vínculos de certificados o las listas de endpoints permitidos que de otro
modo restringirían esa invocación. Las transacciones resultantes las produce
la propia capacidad de firma del participante y se presentan a través de
canales que los controles del Hub han sido reconfigurados para aceptar.
Desde la perspectiva del Hub, la solicitud es indistinguible de una
legítima.

Esta amenaza se aplica sin importar qué componentes criptográficos estén
presentes. Un HSM mantiene sus claves no extraíbles; un TPM sella
credenciales a las mediciones de la cadena de arranque; el arranque seguro
verifica la cadena de arranque en el inicio. Cada uno de ellos cumple
correctamente su función de diseño, y ninguno de ellos impide que el host
comprometido invoque la interfaz de firma, o el plano de control que rige
cómo el Hub lo reconoce, o ambos.

## Las propiedades arquitectónicas

Las propiedades que se nombran a continuación abordan la amenaza realista
como un todo coherente. Cada sección describe una propiedad e identifica
cómo esa propiedad depende de las demás. Las propiedades no pueden evaluarse
de forma independiente. Un sistema que satisface cualquiera de las
propiedades en una configuración que viola otra propiedad no es seguro
frente a la amenaza realista, sin importar qué componente implemente qué
propiedad.

### Integridad del arranque resistente a ataques físicos

La seguridad de todas las demás propiedades depende de la integridad del
sistema en ejecución. Si un atacante modifica la secuencia de arranque, el
kernel o la configuración en tiempo de ejecución, todas las propiedades de
seguridad de nivel superior quedan sujetas a la contención del atacante. Los
TPM miden lo que informa la cadena de arranque. Los HSM firman para
cualquier sistema que posea credenciales válidas. Las claves selladas se
desellan en los sistemas que producen mediciones coincidentes. Una vez
vencida la cadena de arranque, todas las protecciones posteriores operan
sobre premisas controladas por el atacante.

Las configuraciones de arranque seguro no deberían tratarse como evidencia
de resistencia a los ataques físicos a menos que el proveedor documente las
clases de ataque probadas y las mitigaciones implementadas. Vulnerabilidades
de software como
[BootHole](https://access.redhat.com/security/vulnerabilities/grub2bootloader)
(CVE-2020-10713) y [PKfail](https://kb.cert.org/vuls/id/455367)
(CVE-2024-8105) han eludido los supuestos de confianza de Secure Boot en
sistemas Linux y UEFI ampliamente desplegados, y requieren parches o
revocaciones que podrían no aplicarse de forma consistente en la
infraestructura ya desplegada. De manera más fundamental, las
vulnerabilidades del código de arranque inmutable de primera etapa no se
pueden parchear directamente en el silicio ya desplegado. Los proveedores
pueden agregar mitigaciones posteriores o corregir futuras revisiones del
silicio, pero ninguna actualización de software modifica la propia ROM. El
AMD Secure Processor (AMD-SP, antes PSP), que establece las funciones de
raíz de confianza de la plataforma en las CPU AMD Ryzen y EPYC y sustenta el
cifrado de memoria SEV, ha sido comprometido mediante [inyección de fallas
de voltaje en las microarquitecturas Zen 1, Zen 2 y Zen 3 con capacidad
SEV](https://arxiv.org/abs/2108.04575). Los investigadores describen su
ataque directamente: "Al manipular el voltaje de entrada de los sistemas en
chip (SoC) de AMD, inducimos un error en el bootloader de la memoria de solo
lectura (ROM) del AMD-SP, lo que nos permite obtener el control total de
esta raíz de confianza." Con este control, extrajeron claves de endoso y
falsificaron reportes de atestación. Las plataformas de Intel también han
tenido ataques publicados de voltaje y de fallas contra sus garantías de
integridad, entre ellos
[V0LTpwn](https://www.usenix.org/conference/usenixsecurity20/presentation/kenjar)
y [Plundervolt](https://plundervolt.com/) contra SGX. Una función de
"arranque seguro" no demuestra, por sí misma, resistencia frente a un
atacante que posee el hardware y cuenta con herramientas de banco de
trabajo.

Lo que la integridad del arranque requiere, en términos arquitectónicos, es
un endurecimiento frente a los ataques con acceso físico. Rutas de código
del bootloader que resistan la inyección de fallas. Interfaces de depuración
controladas y bloqueadas en producción, con detección de los intentos de
volver a habilitarlas. Un flujo de arranque resistente a la manipulación en
el que la verificación de firmas no pueda ser modificada por un atacante
físico. Cadenas de verificación que se extiendan desde raíces de confianza
de hardware inmutables a través de cada etapa del arranque.

Para la evaluación del proveedor, la pregunta relevante es contra qué
ataques físicos se ha analizado el sistema, qué defensas están documentadas
frente a cada uno y qué pruebas respaldan las afirmaciones. Las respuestas
que solo afirman que el arranque seguro está habilitado no responden la
pregunta.

### Derivación de claves vinculada a un estado del sistema sin modificar

El complemento de la integridad del arranque es la derivación de claves
vinculada a ella. Que las claves se deriven únicamente cuando la cadena de
arranque se ejecuta sin modificaciones significa que un sistema modificado
no puede producirlas; el atacante que elude la integridad del arranque
obtiene root en un sistema que no puede descifrar su propia configuración.
La verificación de la integridad del arranque y la derivación de claves
forman juntas una sola defensa. La verificación establece que el sistema se
inició de forma limpia. La vinculación garantiza que las claves existan
únicamente en un sistema que lo hizo.

Cuán sólida es la defensa depende de cómo se implemente la vinculación. El
sellado basado en TPM proporciona una base: las claves se liberan únicamente
cuando los valores de los Platform Configuration Register coinciden con los
valores que tenían cuando las claves fueron selladas. Los valores PCR
registran las mediciones tomadas durante el arranque. La limitación de esta
base es que las mediciones las escribe en el TPM el propio código de
arranque. Un atacante que pueda reemplazar el código que realiza las
mediciones puede hacer que el TPM registre mediciones controladas por el
atacante o engañosas. El TPM registra fielmente las mediciones que recibe y
libera las claves cuando la política se satisface. La vinculación no se
sostiene frente a un atacante que controla el código que produce las
mediciones.

Una propiedad arquitectónica más sólida es una vinculación que se sostenga
frente a este atacante. El componente que mide el sistema debe ser uno que
el atacante no pueda reemplazar venciendo la integridad del arranque, y las
claves deben seguir siendo inutilizables en un sistema comprometido incluso
cuando sus mediciones de otro modo satisfarían la vinculación.

Se debería preguntar a los proveedores qué componente produce las mediciones
de las que depende la vinculación de claves y qué necesita hacer el atacante
para controlar la salida de ese componente. En las configuraciones típicas
basadas en TPM, el bootloader escribe las mediciones en el TPM. Se supone
que el arranque seguro impide la modificación del bootloader, pero el
arranque seguro en sí no resiste a los atacantes físicos, como se analizó en
la sección anterior. Un atacante que vence el arranque seguro mediante
inyección de fallas, abuso del modo de recuperación o etapas tempranas del
arranque vulnerables puede ejecutar un bootloader modificado que escriba las
mediciones que elija. En tales configuraciones, la vinculación de claves
hereda la protección que la integridad del arranque efectivamente
proporciona frente al ataque físico.

### Aislamiento de cargas de trabajo

La infraestructura de los DFSP suele ejecutar varias cargas de trabajo: el
conector en sí, agentes de monitoreo, agentes de envío de registros,
componentes de integración opcionales y, a veces, una interfaz local para
los operadores. El requisito arquitectónico es que el compromiso del kernel
del host no se propague a las cargas de trabajo protegidas.

El aislamiento a nivel de contenedor no proporciona esto. Cuando las cargas
de trabajo comparten un kernel, una vulnerabilidad en ese kernel derrumba
los límites de los contenedores. Copy Fail (CVE-2026-31431) es la
demostración reciente. Todos los despliegues de contenedores
predeterminados están dentro del alcance de la explotación del kernel
compartido. El aislamiento por hipervisor que trata el kernel del host como
parte de la base de cómputo confiable tampoco lo proporciona: un kernel del
host comprometido lee la memoria del huésped por la ruta que el hipervisor
le permite. Lo que la arquitectura debe hacer es tratar el kernel del host
como un posible atacante y garantizar que las cargas de trabajo protegidas
le sigan siendo inaccesibles.

Esta propiedad importa incluso en sistemas que incluyen HSM, TPM y arranque
seguro. Un kernel del host comprometido lee todas las credenciales y el
material que la carga de trabajo de firma legítima usa para autenticarse
ante esos componentes. El HSM firma las solicitudes que se presentan con
credenciales válidas, sin importar qué proceso del host las presentó. El TPM
libera el material sellado a cualquier llamador que satisfaga la política.
Los componentes criptográficos defienden las claves que poseen; no defienden
frente a ser invocados legítimamente por una carga de trabajo comprometida
que ha obtenido el mismo acceso que se le concedió a la carga de trabajo
autorizada.

Una evaluación debería establecer si el kernel del host forma parte de la
base de cómputo confiable, qué protege la memoria de la carga de trabajo de
firma frente a un kernel del host comprometido y cómo se restringen los
dispositivos con capacidad DMA para que no eludan el límite. Cuando la
respuesta depende de supuestos que el modelo de amenazas realista viola (una
seguridad física que podría no mantenerse, la integridad de una cadena de
arranque que puede ser vencida, un aislamiento que se rompe cuando se
explota una vulnerabilidad del kernel), la propiedad no está realmente
presente, incluso si se nombra un mecanismo.

### Confidencialidad de las cargas de trabajo

El aislamiento de cargas de trabajo establece que las rutas de software
entre cargas de trabajo están bloqueadas. Una carga de trabajo comprometida
no puede alcanzar la memoria, los procesos ni el almacenamiento de otra a
través de las interfaces del sistema operativo. La confidencialidad de las
cargas de trabajo es el requisito adicional de que los ataques a nivel de
hardware contra las operaciones de memoria de una carga de trabajo no
produzcan acceso a los datos de otra carga de trabajo.

El ataque relevante combina el análisis de canal lateral con el acceso a la
memoria. Una carga de trabajo comprometida que se ejecuta en el sistema
tiene acceso legítimo a las operaciones del subsistema de memoria dentro de
su propio ámbito. Al realizar accesos a memoria cuidadosamente elegidos, un
atacante genera señales de canal lateral (variaciones de temporización,
cambios en el consumo de energía, emisiones electromagnéticas) que revelan
información sobre las operaciones criptográficas que el sistema ejecuta para
proteger la memoria. Si el cifrado de memoria usa claves o material
criptográfico compartido entre cargas de trabajo, el análisis de canal
lateral contra las operaciones de una carga de trabajo puede recuperar ese
material y exponer otras cargas de trabajo protegidas por él. El atacante
lee entonces directamente la memoria de otras cargas de trabajo, ya sea
mediante el contenido de su RAM ahora descifrable o mediante una captura por
arranque en frío.

Las tecnologías actuales de cómputo confidencial protegen la memoria en los
límites del enclave, de la máquina virtual o de la plataforma, según la
implementación. Aun así tienen superficies de ataque físico y límites
explícitos en su modelo de amenazas. [TEE.fail (octubre de
2025)](https://tee.fail) demuestra ataques de interposición en el bus de
memoria DDR5 contra Intel SGX, Intel TDX y AMD SEV-SNP con un costo para el
atacante inferior a $1000, con extracción de material criptográfico
relevante para la atestación en las configuraciones afectadas. Un proveedor
puede clasificar esto como un ataque físico fuera del alcance previsto de la
tecnología. Los esquemas de pagos que despliegan infraestructura en
sucursales, sitios rurales u otros entornos físicamente expuestos deben
evaluar ese supuesto frente a la realidad de su despliegue.

Lo que la arquitectura debe garantizar es que el compromiso, la observación
o el análisis de canal lateral de una carga de trabajo no produzca acceso a
los datos protegidos de otra carga de trabajo. El mecanismo puede variar
(aislamiento de hardware, cifrado de memoria, dominios de ejecución
separados, separación física u otros diseños), pero la propiedad es la
misma: los datos sensibles de una carga de trabajo no deben hacerse visibles
fuera de la carga de trabajo autorizada para usarlos, sin importar qué más
se ejecute en el mismo hardware.

Las respuestas del proveedor deberían explicar qué impide que una carga de
trabajo observe los datos protegidos de otra carga de trabajo a través de
rutas de software, DMA, acceso físico a memoria o canal lateral; cómo se
delimitan los dominios de protección de memoria y si el compromiso o la
observación de uno produce acceso a otro; y qué investigación de ataques ha
analizado el proveedor respecto del subsistema de memoria y de las
implementaciones criptográficas que lo protegen.

### Separación de claves por carga de trabajo

En un sistema con varias cargas de trabajo, la capacidad de firma de cada
carga de trabajo debería estar aislada criptográficamente de todas las demás
cargas de trabajo. El compromiso de la carga de trabajo A no debería
producir la capacidad de firma de las transacciones de la carga de trabajo
B.

Los periféricos criptográficos como los HSM pueden proporcionar aislamiento
por partición cuando se configuran con identidades de cliente separadas para
cada partición. El periférico distingue las solicitudes por la identidad del
cliente. Esta es una propiedad real cuando está correctamente configurada.

La limitación es que el aislamiento por partición depende de la integridad
de las credenciales de cliente y de los límites a nivel de host entre cargas
de trabajo. Cuando las cargas de trabajo comparten un kernel, un atacante
con acceso a nivel de kernel lee las credenciales de cliente de cualquier
carga de trabajo y suplanta a esa carga de trabajo ante el periférico. El
periférico ve una identidad de cliente válida y firma. En este caso, el
aislamiento por partición se reduce al aislamiento a nivel de host, que es
exactamente lo que la amenaza realista rompe.

Lo que se requiere, en términos arquitectónicos, es una separación de claves
por carga de trabajo que sobreviva al compromiso del host a nivel de kernel.
El límite entre cargas de trabajo debe ser impuesto por un mecanismo de
aislamiento que siga siendo significativo cuando el kernel del host está
bajo el control del atacante. Este es el mismo requisito que el aislamiento
de cargas de trabajo, expresado desde la perspectiva de la ruta de firma: el
compromiso de una carga de trabajo, incluido el compromiso a nivel de kernel
dentro de su límite, no debe producir la capacidad de firma de otra.

La prueba para una evaluación es si un atacante que ha obtenido acceso a
nivel de kernel en el sistema puede invocar la capacidad de firma de alguna
carga de trabajo distinta de la que ha comprometido. Si la respuesta depende
de si el atacante puede leer las credenciales de otra carga de trabajo desde
la memoria del mismo kernel, la propiedad no está presente.

### Operaciones de firma restringidas

Incluso cuando las demás propiedades arquitectónicas se sostienen, la
interfaz de firma puede ser invocada de forma maliciosa por una carga de
trabajo comprometida dentro de su propio dominio de aislamiento. La
capacidad de firma debe estar restringida de dos maneras: no debe poder
usarse para comprometerse a sí misma y no debe poder usarse para autorizar
un número ilimitado de transacciones fraudulentas antes de la detección.

La primera restricción es criptográfica. El llamador no debe poder
seleccionar algoritmos inseguros, influir en los nonces, degradar parámetros
criptográficos, invocar modos propensos a padding oracle ni provocar de otro
modo que el servicio de firma filtre material de claves a través de sus
salidas normales. Las técnicas de esta categoría incluyen la reutilización
de nonces en ECDSA, los nonces predecibles en esquemas deterministas
implementados de forma incorrecta, las construcciones de padding oracle
contra PKCS\#1 v1.5, la degradación de algoritmos cuando la interfaz acepta
una opción débil y los ataques de mensaje elegido contra funciones hash
débiles. Ninguna de ellas requiere extraer la clave de su almacenamiento
protegido. Usan la capacidad de firma legítima para filtrar la clave a
través de la salida normal. Una vez filtrada, la clave es utilizable desde
cualquier lugar, de forma indefinida y sin que se requiera ningún otro
compromiso de la infraestructura.

La segunda restricción es operativa. El llamador no debe poder firmar cargas
útiles de negocio arbitrarias sin estructura, límites de tasa,
verificaciones de política y auditoría con evidencia de manipulación. Una
carga de trabajo comprometida con acceso legítimo a la firma debería estar
limitada al ámbito, a la estructura de carga útil y a la tasa de
transacciones que la arquitectura permite. No debe poder convertir el
servicio de firma en un oráculo de extracción de claves ni en un oráculo de
autorización ilimitada.

Ambas restricciones dependen de las demás propiedades arquitectónicas. La
imposición que realizan el código o las interfaces que la carga de trabajo
comprometida puede alcanzar no es imposición. La firma restringida como
propiedad de seguridad exige que las restricciones existan en una
infraestructura que la carga de trabajo comprometida no pueda eludir, por
ejemplo alcanzando la clave directamente a través de una ruta menos
restringida.

Los esquemas de pagos deberían preguntar: ¿qué algoritmos y parámetros
criptográficos impone la interfaz de firma y puede el llamador anularlos?
¿Cómo se generan los nonces y puede el llamador influir en ellos? ¿Qué
implementaciones resistentes a canal lateral se utilizan? ¿Puede la
aplicación firmar contenido arbitrario o solo operaciones estructuradas que
el sistema fue diseñado para autorizar, y a qué tasa? ¿Qué registros se
conservan y puede una aplicación comprometida alterarlos?

### Registros operativos con evidencia de manipulación

La auditoría forense es el corolario de las operaciones de firma
restringidas. Un sistema de firma que registra sus operaciones en registros
que el propio firmante puede modificar proporciona auditoría con evidencia
de manipulación solo frente a atacantes descuidados. Un atacante que ha
comprometido el host de firma reescribe los registros antes de que se
firmen, y los registros firmados son válidos.

La integridad de los registros debe ser impuesta por una infraestructura que
la carga de trabajo comprometida no pueda alcanzar. Las claves de firma para
la integridad de los registros están aisladas de la carga de trabajo que
genera los registros. La operación de firma de los registros ocurre en un
nivel de privilegio que la carga de trabajo no puede alcanzar. Las cadenas
de registros resultantes son de solo anexado, con vinculación criptográfica
entre las entradas. El rastro de auditoría tiene evidencia de manipulación
no porque la carga de trabajo prometa no modificarlo, sino porque
estructuralmente no puede.

Esta propiedad requiere una separación estructural entre la infraestructura
que firma transacciones y la infraestructura que firma los registros de
auditoría. Si un único componente firma ambos (HSM, TPM o cualquier otro
periférico) a solicitud de la misma aplicación del host, un host
comprometido produce tanto transacciones fraudulentas como entradas de
registro falsas que las encubren, y ambas son criptográficamente válidas.
Por lo tanto, la propiedad depende del aislamiento de cargas de trabajo: la
carga de trabajo que produce los registros no debe poder invocar la
infraestructura de firma de registros para contenido arbitrario, incluso
cuando esté comprometida.

Los proveedores deberían ser capaces de explicar cómo se protegen los
registros de auditoría frente a la modificación por parte de la misma carga
de trabajo cuyas operaciones registran, si la firma de los registros la
realiza una infraestructura estructuralmente separada de la firma de
transacciones y qué impone esa separación.

## Evaluación

Estas propiedades arquitectónicas forman una sola arquitectura coherente, no
una lista de características independientes. La seguridad de la
infraestructura de los DFSP depende de que todas ellas estén presentes de
forma conjunta, en una configuración en la que la contribución de cada
propiedad no se vea socavada por la ausencia o la debilidad de otra. Un
sistema que satisface la mayoría de estas propiedades no es parcialmente
seguro frente a la amenaza realista; la arquitectura falla en cualquiera de
las propiedades requeridas que la amenaza realista pueda alcanzar.

Por lo tanto, la pregunta de evaluación para los esquemas de pagos no es qué
propiedades o componentes incluye un proveedor, sino si la arquitectura en
su conjunto resiste la amenaza realista. Se debería exigir a los proveedores
que describan su arquitectura en términos que se correspondan con todas
estas propiedades, que expliquen las dependencias entre ellas y que
identifiquen contra qué protege la arquitectura y contra qué no. En
concreto, los esquemas de pagos deberían exigir respuestas para varios
escenarios. Si un atacante incauta físicamente este equipo y vence la
integridad del arranque en un laboratorio, ¿qué sobrevive? Si un atacante
compromete una sola de las cargas de trabajo que se ejecutan en el host,
¿qué capacidad de firma obtiene y cuál no? Si se obtiene acceso root al
kernel del host mediante una vulnerabilidad de software, ¿qué material
protegido sigue siendo inaccesible? Si el periférico criptográfico es
invocado por una carga de trabajo que ha sido comprometida dentro de su
dominio de aislamiento, ¿qué restricciones se aplican a lo que puede firmar?

Un proveedor cuya arquitectura aborda la amenaza realista responde estas
preguntas de forma concreta e identifica las dependencias entre las
defensas. Un proveedor cuya afirmación de seguridad se apoya en la presencia
de componentes (HSM, TPM, arranque seguro) no lo hace, porque los
componentes por sí solos no responden las preguntas. Cuando la respuesta
consiste en lenguaje de marketing, generalidades o aseveraciones de que los
componentes nombrados son suficientes, la evaluación no se ha satisfecho.

### Lista de verificación para la evaluación de proveedores

La siguiente lista de verificación consolida las preguntas que los esquemas
de pagos deberían exigir que un proveedor responda. Un mecanismo nombrado no
es suficiente por sí solo; la respuesta debería explicar el límite de
protección, sus dependencias y la evidencia que respalda la afirmación.

| Propiedad | Lo que la respuesta del proveedor debería establecer |
| --- | --- |
| Integridad del arranque | Qué clases de ataque físico se han analizado, qué defensas abordan cada clase y qué pruebas respaldan las afirmaciones. |
| Derivación de claves vinculada al estado | Qué componente produce las mediciones que se usan para la derivación de claves, si un atacante puede controlar ese componente y qué material de claves sigue siendo utilizable después de modificar el sistema. |
| Aislamiento de cargas de trabajo | Si el kernel del host está dentro de la base de cómputo confiable, qué protege la memoria de las cargas de trabajo después del compromiso del host y cómo se restringen los dispositivos con capacidad DMA. |
| Confidencialidad de las cargas de trabajo | Cómo se separan entre cargas de trabajo las rutas de software, DMA, memoria física y canal lateral, y si el compromiso o la observación de un dominio de protección expone a otro. |
| Separación de claves por carga de trabajo | Si el compromiso a nivel de kernel de una carga de trabajo o del host permite invocar la capacidad de firma de otra carga de trabajo. |
| Firma restringida | Qué algoritmos, parámetros, estructuras de carga útil, políticas y tasas se imponen fuera del control de la carga de trabajo comprometida, y si el llamador puede influir en los nonces o seleccionar operaciones inseguras. |
| Registros con evidencia de manipulación | Si la carga de trabajo auditada puede modificar los registros o invocar la firma de registros para contenido arbitrario, y qué separa estructuralmente la firma de transacciones de la firma de los registros de auditoría. |

## Aplicabilidad

Esta guía no está vinculada a una versión concreta del software de Mojaloop.
Se aplica a la infraestructura operada en el dominio del DFSP siempre que el
compromiso de esa infraestructura pudiera usarse para producir transacciones
que un Hub de Mojaloop aceptaría como auténticas.

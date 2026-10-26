---
i18n_source_sha: 2cd4d7d8b9961b5df89cf2980725ec4de3a82690
---

# Plantilla de glosario uniforme

- Versión: 1.0 
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

Este es un glosario de los términos usados en el Mojaloop Business Community Document Project, y contiene otros términos relacionados con temas de negocio. Hay un glosario técnico más detallado disponible como parte de la Open API for FSP Interoperability Specification.

# Plantilla de glosario uniforme

| Término   | Definición                                                                                      |
| :----- | :---------------------------------------------------------------------------------------------- | 
| Canal de acceso | Lugares o capacidades que se usan para iniciar o recibir un pago. Los canales de acceso pueden incluir sucursales bancarias, cajeros automáticos, terminales en el punto de venta, puntos de atención de agentes, teléfonos celulares y computadoras. |
| Búsqueda de cuenta | Un proceso que determina cuál es el DFSP responsable de una Cuenta Transaccional. |
| Account Lookup System | Account Lookup System es una entidad abstracta que se usa para recuperar información sobre en qué FSP está alojada una cuenta, una billetera o una identidad. El propio Account Lookup System puede alojarse en su propio servidor, como parte de un switch financiero o en los distintos FSP. |
| Validación de cuenta | Un estado que proporciona una llamada a la API de Respuesta de Cotización: un DFSP Beneficiario indica que una cuenta está disponible para ser abonada con un monto de transferencia propuesto. |
| Usuario activo | Un término que usan muchos proveedores para describir cuántos de sus titulares de cuenta usan su servicio con frecuencia. |
| Direccionamiento | El uso de un identificador para dirigir un Pago de un Pagador a un Beneficiario, normalmente un número de teléfono celular o una dirección de correo electrónico. |
| Servicios adyacentes | Formas en que las entidades o los DFSP obtienen ingresos de servicios que no están directamente asociados a un Pago---por ejemplo, préstamos otorgados a titulares de Cuentas Transaccionales. |
| Agente | Una entidad autorizada por el proveedor para encargarse de diversas funciones, como el registro de clientes, el depósito y el retiro de efectivo usando una línea de agente. |
| Punto de atención del agente | Una ubicación física que tiene una o más líneas de agente, lo que le permite realizar transacciones de registro, depósito y retiro de efectivo para los clientes en nombre de uno o más proveedores. La ley nacional define si un punto de atención del agente puede seguir siendo exclusivo de un proveedor.Los puntos de atención de agentes pueden tener otros negocios y funciones de apoyo. |
| Línea del agente | Una línea del agente es una "línea" registrada y emitida por el proveedor, ya sea una tarjeta SIM especial o una máquina de punto de venta, que se usa para realizar transacciones de registro, depósito y retiro de efectivo para los clientes. La ley nacional dicta qué proveedores de servicios financieros pueden emitir líneas de agente. |
| Depósito de efectivo iniciado por el agente | Un Caso de Uso definido en el documento de Especificaciones de la API. |
| Retiro de efectivo iniciado por el agente | Un Caso de Uso definido en el documento de Especificaciones de la API. |
| Agregador | Una forma especializada de proveedor de servicios a comercios, que normalmente gestiona transacciones de pago para un gran número de pequeños comercios. Las reglas del esquema de pagos suelen especificar qué pueden hacer los agregadores. |
| Alias | Un Identificador del Beneficiario que está asociado a un DFSP Beneficiario y a un Número de Cuenta Transaccional. |
| Prevención del lavado de dinero (PLD) | La prevención del lavado de dinero se refiere a la Ley Aplicable y, en la medida en que el Esquema de pagos las adopte expresamente, a las guías de buenas prácticas, t relativas a la mitigación de los riesgos de lavado de dinero. |
| API | Interfaz de programación de aplicaciones: una interfaz técnica implementada por un protocolo de software que permite que los sistemas interactúen entre sí mediante estructuras estándar, sin que un sistema usuario tenga que conocer los detalles internos de implementación del sistema con el que interactúa. |
| Ley aplicable | Todos los tratados, convenios, leyes, reglamentos, directivas, guías oficiales o directivas de una Autoridad Reguladora en la medida en que sean vinculantes, respectivamente, para el Esquema de pagos, el Esquema de pagos o un Participante en lo relativo a los Servicios del Esquema de pagos. |
| Solicitante | Una organización que ha presentado o desea presentar una solicitud para convertirse en Participante, pero cuya solicitud aún no ha sido tramitada por el Esquema de pagos. |
| Interfaz de programación de aplicaciones (API) | Un método de comunicación que permite la interacción y el intercambio de datos entre distintos software o Protocolos Técnicos. |
| Arbitraje | El uso de un árbitro, en lugar de los tribunales, para resolver disputas. |
| Documentos asociados | El conjunto de documentos que figuran en el Apéndice A de estas Reglas. |
| Retiro de efectivo iniciado por el cajero automático mediante OTP | Un Caso de Uso definido en el documento de Especificaciones de la API. |
| Atributo | Una característica de una Transacción, entendiéndose que pueden aplicarse reglas específicas a las Transacciones con Atributos específicos. |
| Autenticación | El proceso de asegurar que una persona o una transacción es válida para el proceso que se está realizando (apertura de cuenta, inicio de transacción, etc.). |
| Autorización | El permiso dado por el Pagador o la entidad para realizar un Pago. |
| Entidad o institución autorizada | Instituciones no financieras que han obtenido la autorización correspondiente del Banco del Estado o de las autoridades reguladoras pertinentes para participar en la provisión de servicios financieros móviles. |
| B2P | Empresa a persona; un Caso de Uso Secundario de Pago Masivo. |
| Banco | Un sistema financiero autorizado dentro de un país que tiene la capacidad de aceptar depósitos y de hacer y recibir pagos en cuentas de clientes. |
| Cuenta bancaria | Una Cuenta Transaccional ofrecida por un Banco. |
| Identificador de cuenta bancaria | Un tipo de Identificador del Beneficiario. |
| Cuentas bancarias y servicios transaccionales | Una cuenta transaccional mantenida en un banco. Esta cuenta puede ser accesible desde un teléfono celular, en cuyo caso a veces se le llama \"banca móvil\". |
| Banco a banco | Un Caso de Uso Secundario de P2P. |
| Banco a billetera | Un Caso de Uso Secundario de P2P. |
| Modelo liderado por bancos| Una referencia a un sistema en el que los bancos son los principales proveedores de servicios financieros digitales para los usuarios finales.La ley nacional puede exigirlo.|
| Teléfono básico | Dispositivo mínimo necesario para usar servicios financieros digitales. |
| Pago de facturas | Un Caso de Uso Secundario de P2B. |
| Autenticación biométrica | El uso de una característica física de una persona (huella dactilar, iris, etc.) para autenticar a esa persona. |
| Lista negra| Una lista o registro de entidades (usuarios registrados) a las que se les deniega o bloquea un privilegio, servicio, movilidad, acceso o reconocimiento concreto. |
| Blockchain | Una tecnología que crea arquitecturas distribuidas. En los sistemas de pagos, suele ser una referencia a un libro mayor compartido que registra y valida las Transacciones.
| Blockchain | La tecnología en la que se basan bitcoin y otras criptomonedas: un libro mayor digital compartido, o una lista de todas las transacciones que se actualiza continuamente. |
| Marca | Una palabra o un signo aprobado por el Esquema de pagos para que lo usen los Participantes. |
| Desembolso masivo | Un Caso de Uso definido en el documento de Especificaciones de la API. |
| Pago masivo | Un Pago de un único Pagador a varios Beneficiarios, por ejemplo los programas de transferencias monetarias de un gobierno o de una ONG a un conjunto de beneficiarios. |
| Servicio de carga masiva | Un servicio que permite importar varias transacciones por sesión, casi siempre mediante un archivo de transferencia masiva de datos que se usa para iniciar pagos.Ejemplo: un archivo de pago de nóminas. |
| Empresa | Entidad, como una sociedad anónima, una sociedad limitada o una corporación, que usa el dinero móvil como servicio; por ejemplo, para hacer y aceptar pagos de facturas y para pagar nóminas. |
| Gestión de efectivo | Gestión de los saldos de efectivo en un agente. |
| Depósito de efectivo | Recibir crédito de dinero electrónico a cambio de efectivo físico; normalmente se hace en un agente. |
| Retiro de efectivo | Recibir efectivo físico a cambio de un débito en una cuenta de dinero electrónico; normalmente se hace en un agente. |
| Tarjeta con chip | Una tarjeta con chip contiene un chip informático: puede ser sin contacto o de contacto (requiere insertarla en un terminal).Los estándares globales para las tarjetas con chip los establece EMV. |
| Compensación | El proceso, dentro de un sistema de Pagos, en el que un DFSP Pagador y un DFSP Beneficiario debitan y acreditan las cuentas de sus Usuarios Finales. |
| Circuito cerrado | Un sistema de pagos usado por un único proveedor, o por un grupo de proveedores muy restringido. |
| Combate al financiamiento del terrorismo (CFT) | Iniciativas para impedir que personas o entidades usen los sistemas de pagos para enviar fondos a personas o entidades asociadas al terrorismo. |
| Comisión | Un pago de incentivo que se hace, normalmente, a un agente u otro intermediario que actúa en nombre de un proveedor de DFS.Sirve de incentivo para el agente. |
| Confirmación (commit) | Parte de una operación de transferencia en 2 fases en la que los fondos que se reservaron para ser transferidos se liberan al beneficiario; la transferencia se completa entre las cuentas de origen/pagador y de destino/beneficiario. |
| Condición (condition) | En el protocolo Interledger, un bloqueo criptográfico que se usa cuando se reserva una transferencia. Normalmente tiene la forma de un hash SHA-256 de una preimagen secreta. Cuando se proporciona como parte de una solicitud de transferencia, la transferencia debe reservarse de modo que solo se confirme si se proporciona el fulfilment de la condición (la preimagen secreta). |
| Corredor | Se refiere a dos países cualesquiera de una Transacción transfronteriza y al sentido de la transferencia. |
| Contraparte | El otro lado de una transacción de pago o de crédito. Un beneficiario es la contraparte de un pagador, y viceversa. |
| Cupón | Un token que da derecho a su titular a un descuento o que puede canjearse por bienes o servicios. |
| Transferencia de crédito | Un Pago o Transferencia de fondos iniciada por el DFSP Pagador hacia el DFSP Beneficiario. A la Transferencia de crédito se le suele llamar 'transferencia de crédito tipo push' porque los fondos se 'empujan' desde la Cuenta Transaccional del Pagador. La Transferencia de crédito contrasta con el Débito directo. |
| Transfronterizo | Una Transferencia de un DFSP Pagador domiciliado en un país a un DFSP Beneficiario domiciliado en otro país. |
| Transferencia con conversión de divisas (cross-FX) | Transferencia que involucra varias monedas e incluye un cálculo de cambio de divisas. |
| Posición actual | La posición neta actual de un Participante en el Libro mayor de posiciones para una Moneda dada. |
| Cliente | El Cliente del sistema. El término se usa tanto para el Pagador como para el Beneficiario. Las personas, los comercios, los emisores de facturas, los gobiernos y otras empresas son todos clientes. A veces se les llama usuarios finales. |
| Retiro de efectivo iniciado por el cliente | Un Caso de Uso definido en el documento de Especificaciones de la API. |
| Compra iniciada por el cliente | Un Caso de Uso definido en el documento de Especificaciones de la API. |
| Compra iniciada por el cliente mediante QR | Un Caso de Uso definido en el documento de Especificaciones de la API. |
| DFSP (Proveedor de servicios financieros digitales) | Un proveedor de servicios financieros con licencia de una autoridad reguladora para ofrecer Cuentas Transaccionales que mantienen fondos de clientes y se usan para hacer y recibir Pagos. Los DFSP tienen relaciones con consumidores, comercios y otras empresas, y prestan servicios financieros digitales a los Usuarios Finales. Se usa indistintamente con FSP (Proveedor de servicios financieros). |
| Digital | Comunicaciones electrónicas entre dos personas o entidades que pueden darse en distintos dispositivos electrónicos (por ejemplo, celular, tableta, computadora). |
| Liquidez digital | La práctica de mantener el valor en forma Digital, en lugar de cambiar el valor Digital por efectivo (forma física). |
| Pago digital | Un término amplio que incluye cualquier pago que se ejecute electrónicamente. Incluye los pagos que se inician desde un teléfono celular o una computadora. En algunas circunstancias, los pagos con tarjeta se consideran pagos digitales. El término \"pago móvil\" es igual de amplio e incluye una gran variedad de tipos de transacción que de algún modo usan un teléfono celular. |
| Débito directo | Un Pago o Transferencia de fondos iniciada por el DFSP Beneficiario hacia el DFSP Pagador. Al Débito directo se le suele llamar 'transferencia de débito tipo pull' porque los fondos se 'arrastran' desde la Cuenta Transaccional del Pagador. El Débito directo contrasta con la Transferencia de crédito. |
| Directorio | Un almacenamiento centralizado o descentralizado de identificadores de pago que se usan para el Direccionamiento, accesible por el sistema de pagos o por los DFSP. |
| Resolución de disputa | Un proceso especificado por un proveedor o por las reglas de un esquema de pagos para resolver problemas entre usuarios finales y proveedores, o entre un usuario final y su contraparte. |
| Nacional | Describe una Transacción entre dos DFSP domiciliados en el mismo país. |
| Dinero electrónico | Fondos o valor digitales que son propiedad del titular de una Cuenta Transaccional en un dispositivo de pago, como un chip, una tarjeta prepagada o un teléfono celular, o en un sistema informático. La regulación nacional especifica qué tipos de DFSP pueden emitir dinero electrónico. |
| Emisor de dinero electrónico | Un DFSP con licencia en el país para actuar como Emisor de dinero electrónico. |
| Usuario final | El cliente de un DFSP. El cliente puede ser un consumidor, un comercio, un gobierno u otra forma de empresa. |
| Tarifas al usuario final | Tarifas que un DFSP cobra a su cliente usuario final. |
| Persona jurídica | Cualquier persona no individual que sea cliente de un DFSP: incluye Comercios, Emisores de facturas, Organismos públicos y otras empresas. |
| Cuenta de depósito en garantía (escrow) o cuenta fiduciaria | Una cuenta que un DFSP No Bancario mantiene en un banco; normalmente es un requisito regulatorio para proteger los depósitos de los consumidores en el DFSP. |
| Excepciones | Transacciones que son erróneas o fraudulentas. |
| GAFI (Grupo de Acción Financiera Internacional) | El Grupo de Acción Financiera Internacional es una organización intergubernamental para combatir el lavado de dinero y para actuar sobre el financiamiento del terrorismo. |
| Teléfono no inteligente (feature phone) | Un teléfono celular sin capacidades computacionales significativas. |
| Tarifas | Los pagos que un proveedor cobra a su usuario final. Puede ser una tarifa fija, una tarifa porcentual sobre el valor, o una mezcla de ambas. |
| Monedas fiduciarias | Dinero oficial emitido por el banco central de un país o región como moneda de curso legal. |
| Inclusión financiera | La provisión sostenible de servicios financieros Digitales asequibles que llevan a los Usuarios Finales de Bajos Ingresos a la economía formal. |
| Inclusión financiera | La provisión sostenible de servicios financieros digitales asequibles que llevan a los pobres a la economía formal. |
| Alfabetización financiera | Que los consumidores y las empresas tengan las habilidades financieras esenciales, como preparar un presupuesto familiar o entender conceptos como el valor del dinero en el tiempo, el uso de un producto o servicio de DFS, o la capacidad de solicitar ese servicio. |
| Fintech | Un término que se usa para describir la intersección entre las finanzas y la tecnología. Las 'fintech' son entidades que ofrecen soluciones innovadoras en el ámbito financiero, apalancándose en la tecnología. |
| Flotante | Este término puede significar varias cosas distintas. En la banca, el flotante se crea cuando la cuenta de una de las partes se debita o se acredita en un momento distinto que la de la contraparte de la transacción. Al dinero electrónico, como obligación de un proveedor no bancario, a veces se le llama flotante. |
| Fraude | Uso delictivo de los servicios financieros digitales para sustraer fondos de otra persona o empresa, o para perjudicar a esa parte de algún otro modo. |
| Gestión del riesgo de fraude | Herramientas para gestionar los riesgos de los proveedores y, en ocasiones, los riesgos de los usuarios (por ejemplo, de comercios o gobiernos) al prestar o usar servicios de DFS. |
| FSP | La entidad que presta un servicio financiero digital a un usuario final (ya sea un consumidor, una empresa o un gobierno). Se usa indistintamente con DFSP (Proveedor de servicios financieros digitales). |
| Transferencia completada | Una transferencia que ha sido aceptada por el DFSP Beneficiario y registrada como completa por el Esquema de pagos. Una vez que el Esquema de pagos ha registrado una transferencia como completa, el Pagador está obligado a honrar la transacción cuando aparezca en una Liquidación. |
| Fulfilment | En el protocolo Interledger, un secreto que es la preimagen de un hash SHA-256 y que se usa como condición sobre una transferencia. La preimagen se requiere en el mensaje de confirmación para que la transferencia se confirme. |
| FX (divisas) | Cambio de divisas. |
| G2P | Un Caso de Uso Secundario de Pago Masivo. |
| Gobernanza | El conjunto de enfoques de gestión, decisiones y funciones de supervisión dentro del Esquema de pagos. La Gobernanza del Esquema de pagos puede marcar la pauta de todo lo que ocurre en el Esquema de pagos. |
| Organismo público | Cualquier Titular de Cuenta Transaccional que sea algún tipo de organismo o departamento del gobierno. |
| Servicios de aceptación de pagos para organismos públicos | Servicios que permiten a los gobiernos cobrar impuestos y tasas a personas y empresas. |
| Liquidación bruta | Un método de liquidar las obligaciones financieras entre los DFSP y un Esquema de pagos. La Liquidación bruta procesa cada Transacción de forma individual. Los detalles del modelo de Liquidación bruta se especifican en las reglas del esquema de pagos. La Liquidación bruta contrasta con la Liquidación neta. |
| Hub | Un término que puede usarse para la entidad que opera la Plataforma en nombre del Esquema de pagos. |
| Servicio de identificadores | La forma en que funciona el Proceso de Búsqueda de cuenta para un tipo dado de Identificador. |
| Identidad | Una credencial de algún tipo que identifica a un usuario final. Las identidades nacionales las emiten los gobiernos nacionales. En algunos países, los proveedores de servicios financieros emiten una identidad financiera. |
| Transferencia inmediata de fondos | Un pago digital que el beneficiario recibe casi de inmediato después de que el pagador haya iniciado la transacción. |
| Tasa de intercambio | Una estructura, presente en algunos esquemas de pagos, que obliga a un proveedor a pagar a otro proveedor una tarifa sobre ciertas transacciones. Se usa normalmente en los esquemas de tarjetas para efectuar el pago de una tarifa de un comercio al banco emisor de la tarjeta de un consumidor. |
| Interledger | El protocolo Interledger es un protocolo para transferir valor monetario entre varias redes de pago desconectadas mediante una coreografía de transferencias condicionales en cada red. |
| Remesa internacional | Hacer y recibir pagos a otra persona en otro país. |
| Interoperabilidad | La capacidad de un Cliente que tiene una Cuenta Transaccional con un Participante de intercambiar una transacción con un Cliente que tiene una Cuenta Transaccional con un Participante distinto. |
| Servicio de interoperabilidad para transferencias (IST) | Un switch. |
| Irrevocable | Una transacción que el pagador no puede \"revertir\"; un pago irrevocable, una vez recibido por un beneficiario, no puede ser recuperado por el pagador. |
| Conocimiento del cliente (KYC) | Requisitos regulatorios para que un DFSP establezca la Identidad y las actividades de un Usuario Final o entidad, tanto antes de abrir una Cuenta Transaccional como a lo largo del tiempo. |
| Libro mayor | Un registro que se lleva de las transacciones. |
| Level One Project | Una iniciativa de la Bill & Melinda Gates Foundation para promover la inclusión financiera. |
| Responsabilidad | Una obligación legal de una parte frente a otra; exigida por la ley nacional, por las reglas del esquema de pagos o por acuerdos específicos entre proveedores. Algunas reglas de esquema de pagos transfieren las responsabilidades de una transacción de un proveedor a otro bajo ciertas condiciones. |
| Licencia | La licencia que el Esquema de pagos otorga a un Solicitante al aceptar el Acuerdo de Participación en el Esquema de pagos, que permite al Participante participar en el Esquema de pagos y usar la Propiedad del Esquema de pagos conforme a las Reglas. |
| Liquidez | La disponibilidad de activos líquidos para respaldar una obligación. Los bancos y los proveedores no bancarios necesitan liquidez para cumplir sus obligaciones. Los agentes necesitan liquidez para atender las transacciones de retiro de efectivo de consumidores y pequeños comercios. |
| Préstamos | Medios por los cuales los usuarios finales pueden pedir dinero prestado. |
| Comercio | Una empresa que vende bienes o servicios y recibe pagos por esos bienes o servicios. |
| Afiliación de comercios | El proceso de habilitar a un comercio para la recepción de pagos electrónicos. |
| Códigos de categoría de comercio | Una categorización que establece un Esquema de pagos para diferenciar entre clientes empresariales. |
| ID del comercio | Un tipo de Identificador del Beneficiario. |
| Proveedor de servicios para comercios | Un proveedor (bancario o no bancario) que da soporte a los requisitos de los comercios u otros aceptadores de pagos para recibir pagos de los clientes. El término \"adquirente\" se usa específicamente en relación con la aceptación de transacciones de pago con tarjeta. |
| Compra iniciada por el comercio | Un Caso de Uso definido en el documento de Especificaciones de la API. |
| Compra iniciada por el comercio mediante POS/OTP | Un Caso de Uso definido en el documento de Especificaciones de la API. |
| Compra iniciada por el comercio mediante QR | Un Caso de Uso definido en el documento de Especificaciones de la API. |
| Institución microfinanciera (MFI) | Una entidad que ofrece servicios financieros a poblaciones de Bajos Ingresos. Casi todas las MFI otorgan préstamos a sus miembros, y muchas ofrecen seguros, depósitos y otros servicios. Las MFI se consideran DFSP en un Sistema Level One si proporcionan Cuentas Transaccionales a sus clientes. Las MFI que no son DFSP pueden conectarse directamente a una Plataforma Level One a través de una relación con un DFSP. Las reglas del esquema de pagos especificarán cómo pueden interactuar esas MFI con la Plataforma. |
| Operador de red móvil (MNO) | Una empresa que vende servicios de telefonía celular, incluida la comunicación de voz y de datos. |
| Operador de transferencia de dinero | Un proveedor especializado de DFS que gestiona remesas nacionales o internacionales. |
| MSISDN | Número que identifica de forma única una suscripción en una red de telefonía celular. Estos números usan el estándar E.164, que define el plan de numeración de una red telefónica pública conmutada (PSTN) a escala mundial. |
| Liquidación neta multilateral | Un tipo de liquidación que gestiona las posiciones de un grupo de participantes de un esquema de pagos. |
| Documento nacional de identidad | Una credencial que identifica a un Usuario Final. Los Documentos nacionales de identidad los emiten los gobiernos nacionales. |
| Comunicación de campo cercano (NFC) | Una tecnología de comunicación que se usa en los pagos para transmitir datos de pago desde un teléfono celular equipado con NFC hasta un terminal compatible. |
| Límite de débito neto | Un valor que la Plataforma usa para determinar si un DFSP Pagador puede enviar una Solicitud de Transferencia, según se define en las Reglas Operativas del Esquema de pagos. |
| Margen del límite de débito neto | Un valor que establece un esquema de pagos y que aumenta o reduce el Límite de débito neto de un participante. |
| Posición neta | Un valor en el libro mayor de un participante de un esquema de pagos, que refleja el neto de las obligaciones adeudadas. |
| Liquidación neta | Un tipo de liquidación que netea la posición de un participante de un esquema de pagos, reflejando tanto las obligaciones adeudadas a otros participantes o al esquema de pagos como las adeudadas por ellos. |
| Entidad no bancaria | Una entidad que no es un banco autorizado, pero que presta servicios financieros a usuarios finales. Los requisitos para que las entidades no bancarias lo hagan, y las limitaciones de lo que pueden hacer, los especifica la ley nacional. |
| Modelo liderado por entidades no bancarias | Una referencia a un sistema en el que las entidades no bancarias son las proveedoras de servicios financieros digitales para los usuarios finales. Las entidades no bancarias normalmente deben cumplir criterios establecidos por la ley nacional y aplicados por los reguladores. |
| No repudio | Capacidad de probar la autenticidad de una transacción, por ejemplo validando una firma digital. |
| Sin pérdidas | Un modelo de recuperación de costos con un conjunto adicional de fondos disponibles para cubrir las necesidades de inversión para operar la Plataforma. |
| Notificación | Aviso a un pagador o beneficiario sobre el estado de una transferencia. |
| Pagos off-us | Pagos hechos en un sistema o esquema de pagos con varios participantes, donde el proveedor del pagador es una entidad distinta del proveedor del beneficiario. |
| Pagos on-us | Pagos hechos en un sistema o esquema de pagos con varios participantes, donde el proveedor del pagador es la misma entidad que el proveedor del beneficiario. |
| Compra en línea | Un Caso de Uso Secundario de P2B. |
| Open API Specification | La especificación Open API for FSP Interoperability. |
| Circuito abierto | Un sistema o esquema de pagos diseñado para que participen varios proveedores. Las reglas del sistema de pagos o la ley nacional pueden restringir la participación a ciertas clases de proveedores. |
| Reglas operativas | Reglas escritas por un esquema de pagos que vinculan a los participantes del esquema de pagos. A veces se les llama \"Reglas de Negocio\". |
| Gestión del riesgo operativo | Herramientas para gestionar los riesgos de los proveedores al operar un sistema de DFS. |
| Operador | Una entidad que proporciona o gestiona la Plataforma de un sistema de pagos. |
| Organización | Una entidad, como una empresa, una organización benéfica o un departamento del gobierno, que usa el dinero móvil como servicio; por ejemplo, para recibir pagos de facturas, hacer pagos de facturas y pagar nóminas. |
| OTP | Código de un solo uso. El OTP es una credencial que, por definición, solo puede usarse una vez. Lo genera y luego lo valida el mismo FSP para su aprobación automática. El OTP suele estar vinculado a un Pagador concreto de un Pago. El OTP generado suele ser un número de entre 4 y 6 dígitos. |
| Servicios en ventanilla (OTC) | Servicios prestados por los agentes cuando una de las partes finales no tiene una cuenta de dinero electrónico: el pagador (remoto) puede pagar el dinero electrónico a la cuenta del agente, que luego paga en efectivo al beneficiario que no tiene cuenta. |
| P2P | Un Caso de Uso definido en el documento de Especificaciones de la API. |
| Participante | Un proveedor que es miembro de un esquema de pagos y está sujeto a las reglas de ese esquema de pagos. |
| Margen discrecional del participante sobre el límite de débito neto | Un valor que establece un participante y que reduce su Límite de débito neto. |
| Acuerdo de participación | Un acuerdo celebrado entre cada Participante y un Esquema de pagos. |
| Cuotas de participación | Cuotas por participar en un esquema de pagos (a veces llamadas cuotas de membresía). |
| Consulta de partes | Una llamada a la API del Servicio de Directorio del Esquema de pagos mediante la cual un DFSP Pagador solicita el identificador del DFSP en el que está registrado un identificador de beneficiario. |
| Respuesta a la consulta de partes | La respuesta del Servicio de Directorio del Esquema de pagos a una Consulta de partes. |
| Banco socio | Institución financiera que da soporte al FSP y le da acceso al ecosistema bancario local. |
| Parte | Una entidad que usa los Servicios del Esquema de pagos de forma directa o indirecta. |
| Identificador de parte | Un elemento de información que identifica de forma única a un Cliente en una implementación de Interoperabilidad. |
| Tipo de identificador de parte | Una enumeración que distingue distintos tipos de Identificador de parte. El rango completo de Tipos de identificador de parte se indica en la Open API Specification; el subconjunto de Tipos de identificador de parte que admite un Esquema de pagos dado se indica en sus Reglas Operativas. |
| Beneficiario | El receptor de fondos electrónicos en una transacción de pago. |
| DFSP beneficiario | El rol de un Participante que recibe una Transferencia en nombre de su cliente Beneficiario. |
| Pagador | El que paga los fondos electrónicos en una transacción de pago. |
| DFSP pagador | El Participante que envía una Transferencia. |
| Pago | Un intercambio de fondos, credenciales y demás información necesaria para completar una obligación entre Usuarios Finales. Una Transferencia es un Pago. |
| Dispositivo de pago | Un dispositivo de pago es la noción abstracta de un dispositivo electrónico, distinto del dispositivo propio del Pagador, capaz de permitir a un Pagador aceptar una transacción mediante el uso de una credencial (algún tipo de OTP).Ejemplos de Dispositivos (de pago) son el cajero automático y el punto de venta. |
| Sistema de pagos | Un término amplio para describir el sistema en su conjunto, incluidos el Esquema de pagos, los Servicios del Esquema de pagos y los Participantes del Esquema de pagos. |
| Operador del sistema de pagos | La entidad que opera un sistema o esquema de pagos. |
| Proveedor de servicios de pago (PSP) | Un término que se usa de dos maneras: en general, para cualquier empresa involucrada en la prestación de servicios de pago (incluidos los DFSP); o para un proveedor que ofrece productos o servicios de marca a los Usuarios Finales, incluidos los comercios. Los PSP pueden conectarse directamente a una Plataforma Level One a través de una relación con un DFSP. Las reglas del esquema de pagos especificarán cómo pueden interactuar los PSP con la Plataforma. |
| Datos personales | Información relativa a cualquier persona física, incluidos los Clientes o los empleados del Esquema de pagos o de un Participante, a partir de la cual la persona pueda ser identificada o reconocida, con independencia de la forma de esa información. |
| Plataforma | El conjunto de capacidades operativas, que a menudo incluye un Switch, que implementan el intercambio de Pagos en un sistema de pagos interoperable alineado con Level One. |
| Plataforma | Un término que se usa para describir el software o el servicio que usa un proveedor, un esquema de pagos o un switch para gestionar las cuentas de los usuarios finales y para enviar y recibir transacciones de pago. |
| Cuenta de liquidación común | Una cuenta bancaria en el Banco, de propiedad conjunta de los participantes del esquema de pagos. |
| Libro mayor de posiciones | Un libro mayor que lleva la plataforma y que registra las Anotaciones de Liquidación Provisionales y las Anotaciones de Liquidación Finales de un Participante en una Moneda dada. |
| Contabilización | El acto por el cual el proveedor registra una anotación de débito o de crédito en el registro de la cuenta del usuario final. |
| Tarifas de procesamiento | Tarifas que el Esquema de pagos factura a los Participantes por el Procesamiento realizado por la Plataforma del Esquema de pagos. |
| Procesador | Una empresa que gestiona, de forma tercerizada, diversas funciones para un DFSP. Esas funciones pueden incluir la gestión de transacciones, la gestión de bases de datos de clientes y la gestión de riesgos. Los procesadores también pueden realizar funciones en nombre de sistemas de pagos, Esquemas de pagos o Switches. Los procesadores pueden conectarse directamente a una Plataforma Level One, actuando en nombre de un DFSP. Las reglas del esquema de pagos especificarán cómo pueden interactuar los Procesadores con la Plataforma. |
| Débito provisional | Un registro dentro del Libro mayor de posiciones de un esquema de pagos de una Solicitud de Transferencia que no se ha completado; se registra únicamente en el Libro mayor de posiciones del DFSP Pagador |
| PSP | Proveedor de servicios de pago. |
| Pago tipo pull | Un tipo de Transacción originada por el DFSP del Beneficiario. Los Débitos directos, los cheques y los pagos con tarjeta son todos Pagos tipo pull. Los Pagos tipo pull pueden rebotar o fallar por fondos insuficientes, salvo que se realice una Autorización aparte (por ejemplo, con tarjetas). |
| Pago tipo push | Un tipo de Transacción iniciada por el DFSP Pagador. A veces se le llama Transferencia de crédito. |
| Compra con código QR | Un Caso de Uso Secundario de P2B. |
| Código QR | Un método de codificar y visualizar datos en forma legible por máquina. Hay varios modelos de QR. |
| Cotización | Un proceso por el cual un DFSP Beneficiario reconoce la validez de la cuenta del Beneficiario para aceptar una transferencia, y fija los términos (y posiblemente las tarifas) relacionados con esa transferencia. |
| Solicitud de cotización | Una solicitud de un DFSP Pagador de datos relativos a una Transferencia propuesta. |
| Respuesta a la solicitud de cotización | La respuesta de un DFSP Beneficiario a una Solicitud de cotización. |
| Liquidación bruta en tiempo real (LBTR/RTGS) | Un modelo de liquidación que liquida las transferencias de forma individual, y no neta. |
| Pagos minoristas en tiempo real (RTRP) | Pagos minoristas que se procesan en tiempo real (según se inician). |
| Monto a recibir | El monto que se acredita en la Cuenta Transaccional de un Beneficiario. |
| Conciliación | La conciliación entre FSP es el proceso de asegurar que dos conjuntos de registros, normalmente los saldos de dos cuentas, coincidan entre los FSP. La conciliación se usa para asegurar que el dinero que sale de una cuenta coincida con el dinero realmente transferido. Esto se hace comprobando que los saldos coincidan al final de un periodo contable determinado. |
| Derecho de reclamación | Derechos otorgados a un usuario final por la ley, por reglas operativas privadas o por acuerdos específicos entre proveedores, que permiten a los usuarios finales hacer ciertas cosas (a veces revocar una transacción) en ciertas circunstancias. |
| Reembolso | Una transferencia que revierte una transacción anterior. |
| Regulador | Una organización gubernamental facultada por la ley nacional para establecer y hacer cumplir estándares y prácticas. Los bancos centrales, los ministerios de finanzas y de hacienda, los reguladores de telecomunicaciones y las autoridades de protección al consumidor son todos reguladores implicados en los servicios financieros digitales. |
| Solicitud de cotización | Una llamada a la API que inicia una Transacción, mediante la cual el DFSP Pagador solicita al DFSP Beneficiario información relativa a una Transferencia propuesta. |
| Solicitud de transferencia | Un mensaje que pasa de un DFSP Pagador, a través de la Plataforma, a un DFSP Beneficiario, y que solicita que se realice una Transferencia del Pagador al Beneficiario. |
| Solicitud de pago | Un mensaje mediante el cual un Beneficiario 'solicita' un Pago a un Pagador. En un Sistema Level One, la Solicitud de pago se usa a menudo para describir a un comercio que solicita un Pago tipo push a un Usuario Final. |
| Reserva | Parte de una operación de transferencia en 2 fases en la que los fondos que se van a transferir quedan bloqueados (los fondos no pueden usarse para ningún fin hasta que se deshaga la reserva o se confirmen). Normalmente se hace por una duración predeterminada, cuyo vencimiento hace que se deshaga la reserva. |
| Pago minorista | Un Pago o Transferencia entre Usuarios Finales, normalmente de denominación baja. El término se usa a menudo para describir Pagos P2P, B2P o P2B. |
| Reversión | El proceso de revertir una transferencia completada. |
| Gestión de riesgos | Las prácticas que llevan a cabo las empresas para entender, detectar, prevenir y gestionar distintos tipos de riesgos. La gestión de riesgos se da en los proveedores, en los sistemas y esquemas de pagos, en los procesadores y en muchos comercios o aceptadores de pagos. |
| Enfoque basado en riesgo (EBR) | Un enfoque regulatorio o de gestión empresarial que crea distintos niveles de obligación según el riesgo de la transacción o del cliente subyacentes. |
| Deshacer la reserva | Deshacer la reserva significa que los fondos electrónicos que se habían reservado antes vuelven a su estado original. La transacción financiera se cancela. Los fondos electrónicos ya no están bloqueados para su uso. |
| Reglas | Las prácticas y los estándares necesarios para el funcionamiento de los servicios de pago definidos por el Esquema de pagos. A las Reglas a veces se les llama reglas del esquema de pagos, reglas de negocio o reglas operativas. |
| Modificación de las reglas | Todos los cambios, adiciones, supresiones u otras modificaciones a las Reglas Operativas del Esquema de pagos o a cualquiera de los Documentos Asociados. |
| Ahorro e inversión | Guardar fondos para necesidades futuras y para obtener un rendimiento financiero. |
| Productos de ahorro | Una cuenta en un proveedor bancario o no bancario, que guarda fondos con el propósito de ayudar a los usuarios finales a ahorrar dinero. |
| Esquema de pagos | Un conjunto de reglas, prácticas y estándares necesarios para el funcionamiento de los servicios de pago. |
| Caso de uso secundario | Un subconjunto de un Caso de Uso. A los Casos de uso secundarios pueden aplicarse Reglas de Negocio o Directrices de Operación específicas. |
| Elemento seguro | Un chip seguro en un teléfono que puede usarse para guardar datos de pago. |
| Código de acceso de seguridad | Un número de identificación personal (PIN), una contraseña o contraseña de un solo uso (OTP), un reconocimiento biométrico, un código o cualquier otro dispositivo que proporcione un medio de acceso certificado a la cuenta de un cliente con el fin de, entre otras cosas, iniciar una transferencia electrónica de fondos. |
| Incidente de seguridad | (i) El acceso no autorizado a Datos personales o Datos de Transacción relativos a Clientes que son elegibles para iniciar o recibir Transferencias a través del Esquema de pagos, o su divulgación, que se haya producido o que razonablemente se sospeche que se ha producido; o (ii) una vulneración confirmada de las redes o los sistemas de un Participante, o de las redes o los sistemas de su proveedor, que exponga Datos personales o Datos de Transacción relativos al Esquema de pagos, que se haya producido o que razonablemente quepa esperar que se ha producido. |
| Monto a enviar | El monto que un Pagador autoriza a que se debite de su Cuenta Transaccional. |
| Datos sensibles del consumidor | Los Datos sensibles del consumidor son cualquier información, o todas ellas, que un consumidor usa para autenticar su identidad y obtener autorización para realizar servicios de banca móvil, incluidos, entre otros, el ID de usuario, la contraseña, el PIN móvil y el PIN de transacción. También incluye datos relativos a creencias religiosas o de otro tipo, orientación sexual, salud, raza, etnia, opiniones políticas, afiliación sindical y antecedentes penales. |
| Servicios | Elementos de la plataforma del esquema de pagos que entregan capacidades de interoperabilidad a los participantes del esquema de pagos. |
| Liquidación | Un proceso por el cual los Participantes liquidan sus obligaciones entre sí y con el Esquema de pagos en relación con el intercambio de Transacciones, según se establece en las Directrices de Operación de Liquidación. |
| Banco liquidador | Un banco designado por el Esquema de pagos para ser socio en la gestión de la Liquidación y en el cual cada Participante deberá tener una cuenta bancaria a efectos de la Liquidación. |
| Cuenta en el banco liquidador | La cuenta bancaria que un Participante mantiene en el Banco liquidador o en un Banco acordado con el Banco liquidador, y que se usa para la Liquidación entre el Esquema de pagos y el Participante. |
| Instrucción de liquidación | Significa una instrucción dada a un sistema de liquidación por un participante del sistema de liquidación o por el operador del sistema de una cámara de compensación de pagos, en nombre de un participante del sistema de liquidación del Banco Central, para efectuar la liquidación de una o más obligaciones de pago, o para extinguir cualquier otra obligación de un participante del sistema frente a otro participante del sistema. |
| Obligación de liquidación | Significa una deuda que un participante de un sistema de liquidación adeuda a otro como resultado de una o más instrucciones de liquidación. |
| Ventana de liquidación | Un periodo de tiempo entre dos Liquidaciones netas sucesivas, según se programe conforme a las Directrices de Operación de Liquidación. |
| Servicio compartido | Un conjunto común de servicios que los DFSP participantes colaboran para desarrollar o usar. |
| Teléfono inteligente | Un dispositivo que combina un teléfono celular con una computadora. |
| Bancos con licencia especial | Bancos de un país que tienen permitido llevar a cabo un conjunto limitado de funciones, según lo determine la regulación. Los Bancos con licencia especial que solo pueden aceptar depósitos y gestionar Pagos se consideran DFSP en un Sistema Level One. |
| Patrocinador | Un acuerdo entre un emisor de dinero electrónico y un banco, que se usa para el pago y el cobro de tasas de intercambio por parte de los emisores de dinero electrónico |
| Organismo de normalización | Una organización que crea estándares usados por los proveedores, los esquemas de pagos y los sistemas de pagos. |
| Cuenta de valor almacenado | Cuenta en la que los fondos se mantienen en un formato electrónico seguro. Puede ser una cuenta bancaria o una cuenta de dinero electrónico. |
| Reporte de operación sospechosa (ROS) | Si una institución financiera advierte algo sospechoso en una transacción o actividad, puede presentar un reporte a la Unidad de Inteligencia Financiera, que lo analizará y lo cotejará con otra información.La información de un ROS varía según la jurisdicción. |
| Switch | Una entidad de procesamiento de un sistema de pagos que enruta una Transacción de un DFSP a otro DFSP. Un sistema puede operar su propio Switch, o esta función puede realizarla uno o más terceros. |
| Sistema | Un término que se usa para describir el Esquema de pagos, los servicios, la Plataforma y los Participantes alineados con un Level One Project. |
| Riesgo sistémico | En los sistemas de pagos, el riesgo de colapso de todo un sistema financiero o de todo un mercado, frente al riesgo asociado a un único proveedor o usuario final. |
| El Level One Project | Una iniciativa de la Bill & Melinda Gates Foundation, dentro del programa Financial Services for the Poor, que trabaja para apoyar a los países o regiones que están construyendo sistemas de servicios financieros digitales interoperables y de bajo costo, con el fin de llevar a las personas de Bajos Ingresos y a los comercios a la economía formal. |
| Acceso escalonado | Una disposición fijada en las reglas del esquema de pagos que permite a un DFSP participar en el sistema bajo el patrocinio de otro DFSP. |
| Compra con número de caja | Un Caso de Uso Secundario de P2B. |
| Transacción | Un conjunto de llamadas a la API relacionadas que se intercambian entre Participantes a través del Esquema de pagos, incluida una Transferencia. |
| Cuenta transaccional | Una cuenta bancaria o billetera que un DFSP ofrece a un cliente. |
| Titular de la cuenta transaccional | El cliente de un DFSP que es titular de la Cuenta Transaccional que ese DFSP proporciona. |
| Tipo de titular de cuenta transaccional | Una designación que se usa para definir si el Titular de la cuenta transaccional es un Consumidor, una Empresa, un Organismo público o una Entidad sin fines de lucro. |
| Tipo de cuenta transaccional | Una designación que se usa para definir una Cuenta Transaccional como Cuenta bancaria o como Billetera de dinero electrónico. |
| Costo de transacción | El costo que le supone a un proveedor de DFS prestar un servicio financiero digital. Puede ser por un paquete de servicios (por ejemplo, una \"billetera\") o por transacciones individuales. |
| Tarifas por transacción | Tarifas por procesar transacciones interoperables, fijadas por un esquema de pagos. |
| Transferencia | Término genérico para describir cualquier transacción financiera en la que se transfiere valor de una cuenta a otra. |
| Monto de la transferencia | El monto que el DFSP Pagador Transfiere a un DFSP Beneficiario usando el Esquema de pagos. |
| Solicitud de transferencia | Una solicitud de un DFSP Pagador para realizar una Transferencia. |
| Respuesta a la solicitud de transferencia | La respuesta de un DFSP Beneficiario a una Solicitud de transferencia. |
| Cuenta fiduciaria | Un medio de mantener fondos en beneficio de otra parte. Normalmente, la ley obliga a los Emisores de dinero electrónico a mantener el valor de las cuentas de dinero electrónico de los usuarios finales en un banco, habitualmente en una Cuenta fiduciaria. Esto cumple los objetivos de aislamiento y de salvaguarda de los fondos. |
| Ubicuidad | Un término que se usa para describir la capacidad de pagar a cualquiera y de recibir pagos de cualquiera. |
| No bancarizado | Las personas no bancarizadas no tienen una cuenta transaccional. Las personas subbancarizadas pueden tener una cuenta transaccional, pero no la usan activamente. Subatendido es un término amplio que se refiere a las personas que son objetivo de las iniciativas de inclusión financiera. A veces también se usa para referirse a una persona que tiene una cuenta transaccional pero no tiene servicios de DFS adicionales. |
| Pérdidas no cubiertas | Obligaciones de liquidación que el DFSP responsable no cumple y que no se extinguen mediante garantías u otros mecanismos. |
| Caso de uso | Un término que se usa para describir el propósito del Pago. A los Casos de uso pueden aplicarse Reglas de Negocio o Directrices de Operación específicas. |
| ID de usuario | Un identificador único de un usuario. Puede ser un MSISDN, una cuenta bancaria, alguna forma de ID proporcionado por el DFSP, un ID nacional, etc. En una transacción, el dinero normalmente se dirige a un ID de usuario y no directamente a un ID de cuenta. |
| USSD | Una tecnología de comunicación que se usa para enviar texto entre un teléfono celular y un programa de aplicación de la red. |
| Servicios de valor agregado | Servicios o productos que se prestan a los Usuarios Finales y que estos pagarán por usar o acceder, usados a menudo en coordinación con los Servicios adyacentes. |
| Vale | Un instrumento de valor monetario que se usa habitualmente para transferir fondos a clientes (Beneficiarios) que no tienen cuenta en el FSP del Pagador. Puede tratarse de Beneficiarios sin cuenta o con cuenta en otro FSP. |
| Billetera | Una Cuenta Transaccional que los emisores de dinero electrónico ofrecen a los clientes. |
| Billetera a banco | Un Caso de Uso Secundario de P2P. |
| Billetera a billetera | Un Caso de Uso Secundario de P2P. |
| Lista blanca | Una lista o registro de entidades (usuarios registrados) a las que se les otorga un privilegio, servicio, movilidad, acceso o reconocimiento concreto, en especial las que estaban inicialmente en la lista negra. |
| Empoderamiento económico de las mujeres (WEE): | Aumentar el acceso y los derechos de las mujeres a los recursos económicos mediante oportunidades de trabajo decente, propiedad y activos, Inclusión financiera y Plataformas. |

---
i18n_source_sha: 1d4e3fe8eaa088d62f80e208d30ddd9507840775
---

# Decisiones clave del esquema de pagos

- Versión: 5.0 
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

Los Esquemas de pagos de todo el mundo están implementando, o considerando implementar, sistemas de pagos basados en Mojaloop. Mojaloop es software de código abierto para empresas de servicios financieros, reguladores gubernamentales y otros actores que asumen los retos de la interoperabilidad y la inclusión financiera. Mojaloop se basa en la especificación "Open API for FSP Interoperability Specification", que se desarrolló para proporcionar una especificación de API abierta para la interoperabilidad del dinero móvil.

La Bill & Melinda Gates Foundation ha aportado financiamiento y apoyo a Mojaloop. Mojaloop es código de referencia de código abierto que demuestra los principios del Level One Project, una visión de los mercados financieros digitales basada en los principios de interoperabilidad, colaboración e inclusión.

Los esquemas de pagos que implementen Mojaloop tendrán que tomar una serie de decisiones de negocio sobre el diseño del sistema. Esas decisiones, una vez tomadas, afectarán tanto a la implementación técnica de Mojaloop como a las Reglas de Negocio que escribirá el Esquema de pagos y que los DFSP Participantes aceptarán cumplir. Este documento describe y analiza algunas de las más significativas. Cuando corresponde, se hacen recomendaciones de buenas prácticas para alinearse con los Principios de Diseño del Level One Project (L1P).

Aunque este documento está escrito como una contribución a la comunidad de Mojaloop, los temas que se describen aquí son pertinentes para cualquier sistema de pagos alineado con Level One, sea cual sea la implementación técnica elegida.

## **Decisiones descritas en este documento**

[1 - Decisión: Propiedad del Esquema de pagos](#_1-decision-propiedad-del-esquema-de-pagos)

[2 - Decisión: Participación en el Esquema de pagos](#_2-decision-participacion-en-el-esquema-de-pagos)

[3 - Decisión: Relación del Esquema de pagos con la Plataforma](#_3-decision-relacion-del-esquema-de-pagos-con-la-plataforma)

[4 - Decisión: Alcance de las reglas del esquema de pagos y autoridad sobre ellas](#_4-decision-alcance-de-las-reglas-del-esquema-de-pagos-y-autoridad-sobre-ellas)

[5 - Decisión: Casos de uso](#_5-decision-casos-de-uso)

[6 - Decisión: Códigos QR](#_6-decision-codigos-qr)

[7 - Decisión: Direccionamiento de pagos](#_7-decision-direccionamiento-de-pagos)

[8 - Decisión: Liquidación entre participantes](#_8-decision-liquidacion-entre-participantes)

[9 - Decisión: Acceso escalonado](#_9-decision-acceso-escalonado)

[10 - Decisión: Tarifas del esquema de pagos y precios al usuario final](#_10-decision-tarifas-del-esquema-de-pagos-y-precios-al-usuario-final)

[11 - Decisión: Gestión de la marca](#_11-decision-gestion-de-la-marca)

[12 - Decisión: Conexiones del esquema de pagos con otros esquemas de pagos](#_12-decision-conexiones-del-esquema-de-pagos-con-otros-esquemas-de-pagos)

[13 - Decisión: Uso del esquema de pagos por otros FSP](#_13-decision-uso-del-esquema-de-pagos-por-otros-fsp)

[14 - Decisión: Estándares de gestión de riesgos del esquema de pagos](#_14-decision-estandares-de-gestion-de-riesgos-del-esquema-de-pagos)

[15 - Decisión: Gestión de excepciones](#_15-decision-gestion-de-excepciones)

## 1. Decisión: Propiedad del Esquema de pagos

El Esquema de pagos es la entidad que escribe las reglas del sistema de pagos. Como tal, el esquema de pagos controla múltiples aspectos de la prestación de los servicios del esquema de pagos, incluido cómo se entregará la plataforma técnica y operativa a los DFSP participantes. Los modelos habituales de propiedad del Esquema de pagos en la industria de pagos incluyen:

- Una asociación de DFSP participantes, con o sin propiedad parcial por parte del Banco Central

- Un Banco Central u otra entidad gubernamental

- Una entidad comercial

El modelo de asociación maximiza el control que los DFSP tienen del Esquema de pagos y puede animarlos a unirse y a usar el esquema de pagos. Un esquema de pagos controlado por el gobierno o por el banco central puede hacer más eficaz la supervisión regulatoria de los DFSP y puede simplificar la toma de decisiones: un organismo del gobierno puede estar dispuesto a tomar decisiones de infraestructura que beneficien al conjunto del ecosistema, en lugar de optimizar los beneficios de cada DFSP. Una entidad comercial puede ser más rápida en implementar un sistema nuevo y, en algunas situaciones, más eficaz en crear un modelo operativo sostenible.

### 1.1 Alineación con Level One — Propiedad del esquema de pagos

Cualquiera de estas estructuras de propiedad puede cumplir los objetivos de L1P y de la inclusión financiera. Los Principios de Diseño de Level One sugieren la "autogobernanza por parte de los DFSP" (el primer modelo) como diseño preferido, partiendo de la creencia de que participar en la gobernanza puede aumentar el compromiso de los DFSP con el esquema de pagos. Sin embargo, otros diseños pueden funcionar, siempre que el Esquema de pagos y sus miembros tengan alguna forma de gobernanza participativa y operen con transparencia y comunicación abierta.

El principio más importante de Level One es que el propio Esquema de pagos debería operar con un modelo "sin pérdidas" (recuperación sostenible de costos). Esto último es especialmente importante para cumplir el objetivo de L1P de crear un sistema de pagos de costo ultrabajo. Este principio parte de la idea de que los DFSP pueden, por supuesto, operar con ánimo de lucro al prestar servicios de pago. Sin embargo, la fuente de sus ingresos puede venir principalmente de los \"[servicios adyacentes](https://docs.gatesfoundation.org/documents/fighting%20poverty%20profitably%20full%20report.pdf)\" y no de las tarifas relacionadas con la propia transacción de pago. Tenga en cuenta que la plataforma operativa puede ser proporcionada por una entidad comercial, incluso si el propio Esquema de pagos opera con un modelo "sin pérdidas". Esto se analiza más adelante en "Decisión: Relación del Esquema de pagos con la Plataforma".

Muchos sistemas de pagos bancarios heredados de todo el mundo operan con el modelo de asociación. Los sistemas ACH y los sistemas nacionales de tarjetas de débito (como el ACH de EE. UU. y el sistema Interac de Canadá) usan este modelo y ofrecen costos de procesamiento ultrabajos a los DFSP participantes. Algunos sistemas nuevos de pagos móviles, como el sistema UPI de India y el sistema BIM de Perú, también usan este modelo.

Varios países prestan servicios a través del Banco Central: el modelo SPEI de México destaca en este sentido. El sistema JoMoPay de Jordania empezó como un sistema del Banco Central y ha pasado al modelo de asociación.

Las redes de tarjetas globales, en particular Visa y MasterCard, empezaron como modelos de asociación y han pasado a un modelo comercial. Muchas fintech, como PayPal o WeChat Payments, operan sistemas de circuito cerrado con un modelo comercial.

## 2. Decisión: Participación en el Esquema de pagos

Mojaloop y L1P usan el término "DFSP" (Proveedor de servicios financieros digitales) para referirse a cualquier entidad, dentro de la jurisdicción en la que opera el sistema de pagos, que tenga licencia de algún tipo para ofrecer cuentas transaccionales de usuario final que mantienen fondos y que pueden usarse para hacer y recibir pagos. Esta definición incluye a los bancos, a otras instituciones financieras de depósito y a los emisores de dinero electrónico (a los que a veces se llama Operadores de Dinero Móvil).

Hay muchísimos otros participantes del ecosistema que no mantienen cuentas transaccionales de usuario final: entre ellos, los procesadores, los agregadores y algunos tipos de proveedores de servicios de pago. La relación de estas entidades con el esquema de pagos y con los DFSP se analiza en [Decisión: Uso del esquema de pagos por otros FSP](#_13-decision-uso-del-esquema-de-pagos-por-otros-fsp).

La cuestión de la participación tiene dos partes: primero, qué categorías de DFSP admite el Esquema de pagos y, segundo, cuál es el proceso por el que se permite participar a los DFSP. El término "circuito abierto" se usa para referirse a una estructura en la que varios DFSP se unen al esquema de pagos y lo usan para intercambiar transacciones (interoperar). Pero un esquema de pagos de "circuito abierto" puede ser uno en el que cualquier DFSP de una categoría admitida sea elegible para unirse, o uno en el que la participación esté limitada y se gestione por invitación. Un DFSP solicitante puede tener que cumplir ciertos criterios de elegibilidad (tamaño, salud financiera, etc.) antes de ser admitido en el Esquema de pagos.

El término "circuito cerrado" se usa casi siempre para referirse a un esquema de pagos que no es interoperable; en el que la entidad del esquema de pagos tiene relaciones directas con todos los clientes finales

L1P está firmemente a favor de los sistemas de circuito abierto. Además, L1P defiende que todos los proveedores de cuentas transaccionales con licencia sean elegibles: en otras palabras, que se incluyan tanto la categoría de banco como la de Emisor de dinero electrónico, y que se les permita interoperar a través de la plataforma del Esquema de pagos.

Hay varios argumentos que respaldan esta recomendación. El propio concepto de "inclusión financiera" implica incorporar al ecosistema financiero del país a poblaciones antes excluidas. En muchos países, los reguladores han aprobado la emisión de dinero electrónico u otras estructuras para ofrecer cuentas transaccionales a poblaciones a las que los bancos tradicionales no han podido atender de forma económica. Esos emisores de dinero electrónico han creado con frecuencia billeteras móviles de circuito cerrado, y uno de los objetivos de L1P y de Mojaloop es hacer posible la interoperabilidad de esas billeteras. Sin embargo, los titulares de billeteras necesitan pagar no solo a otros titulares de billeteras, sino también a comercios y a otras instituciones bancarizadas, y a personas bancarizadas. Las personas y las instituciones bancarizadas también hacen pagos a los titulares de billeteras. Tiene sentido que el mismo sistema de pagos interoperable admita ambos, tanto por razones de eficiencia (¿para qué tener varios sistemas cuando uno solo puede conectar a todos los actores?) como por razones económicas.

El argumento económico gira en torno a la naturaleza de los sistemas de procesamiento transaccional: a mayor volumen, menor costo unitario. Este principio también se respalda en el [Informe PAFI del Banco Mundial y el CPMI](http://www.worldbank.org/en/topic/financialinclusion/brief/pafi-task-force-and-report): \"el marco promueve la innovación y la competencia al no obstaculizar la entrada de nuevos tipos de PSP\.... Se promueve una mayor interoperabilidad de las infraestructuras que dan soporte al switching, el procesamiento, la compensación y la liquidación de instrumentos de pago del mismo tipo, así como el acceso a ellas\... las infraestructuras de pago, incluidas las que operan los bancos centrales, tienen requisitos de participación objetivos y basados en el riesgo que permiten un acceso justo y abierto a sus servicios.\" Un punto relacionado e importante es que las reglas del Esquema de pagos deberían especificar que un Participante concreto no puede discriminar a ningún otro Participante concreto: salvo que otros factores lo limiten (límites regulatorios de cuenta, etc.), los Participantes deben recibir las transacciones que envían otros Participantes del Esquema de pagos. Esto asegura la interoperabilidad plena.

La segunda cuestión es qué criterios de elegibilidad debe cumplir un DFSP potencial para unirse efectivamente al esquema de pagos. Muchos esquemas de pagos tienen procedimientos bastante elaborados para asegurar que los DFSP solicitantes tengan los recursos financieros para cumplir las reglas y la capacidad técnica para cumplir los requisitos operativos de las reglas.

Alguna forma de estos requisitos es necesaria para cualquier esquema de pagos. Pero la tecnología moderna y, en particular, los modelos de liquidación prefinanciada reducen mucho los riesgos que asume el esquema de pagos al tratar con DFSP más pequeños. La cuestión de alineación con Level One aquí es asegurar que el esquema de pagos no discrimine sin querer a los DFSP más pequeños en favor de los grandes. El objetivo debería ser asegurar las cualificaciones mínimas necesarias para respaldar las obligaciones que asume un DFSP solicitante.

## 3. Decisión: Relación del Esquema de pagos con la Plataforma

Nuestras definiciones separan el concepto de esquema de pagos (la entidad que escribe las reglas de un sistema de pagos) y el de plataforma (el conjunto de servicios que habilitan físicamente la interoperabilidad). Casi siempre, aunque no necesariamente, la plataforma opera como un switch que enruta transacciones de un DFSP a otro: la alternativa son conexiones físicas bilaterales entre los DFSP.

¿Cuál es la relación entre el esquema de pagos y la plataforma? Hay múltiples modelos demostrados en los sistemas de pagos de todo el mundo:

1. La misma entidad: el esquema de pagos opera la plataforma. Se ve con frecuencia en sistemas comerciales (por ejemplo, Visa) y también en sistemas provistos por un Banco Central (por ejemplo, el SPEI del Banco de México)

2. El esquema de pagos contrata la plataforma: el switch y los servicios relacionados los opera una entidad aparte, bajo contrato con la entidad del esquema de pagos. El esquema de pagos paga a la entidad de la plataforma; ese costo se recupera mediante tarifas que el esquema de pagos cobra a sus DFSP participantes. El sistema Faster Payments del Reino Unido opera con este modelo (Faster Payments Scheme Ltd. contrata a Vocalink para operar la plataforma).

3. El esquema de pagos fija los parámetros con los que el operador o los operadores gestionan las transacciones regidas por las reglas: si hay varios operadores, esas entidades deben interoperar, de nuevo según se especifique en las reglas del Esquema de pagos. Cada DFSP elige el operador que quiere usar para acceder al sistema. El sistema ACH de EE. UU. funciona así, al igual que varios de los sistemas de pagos SEPA en Europa.

4. Sin switch: en realidad es una variación del modelo 3 anterior. Cada DFSP se conecta de forma independiente y física con cada uno de los demás DFSP, de nuevo dentro de las restricciones que fijen las reglas del esquema de pagos. Las tarjetas de débito en Australia funcionan así.

### 3.1 Alineación con L1P: Relación del Esquema de pagos con la Plataforma

No hay un único Principio de Level One que favorezca uno de estos modelos frente a otro. Entre los factores a considerar están:

- El objetivo es que todos los actores del ecosistema (Esquema de pagos, Plataforma, DFSP, etc.) fomenten un comportamiento acorde con L1P. Cabe argumentar que un modelo más controlado (los modelos 1 o 2) lo facilita.

- Tener un sistema de bajo costo es un principio esencial. Sin embargo, es discutible si eso se logra mejor con el Modelo 1 o con el Modelo 2. Los Modelos 3 y 4 conllevan el riesgo de excluir o perjudicar a los DFSP más pequeños o a los nuevos entrantes al sistema.

- En los Modelos 2 y 3, los proveedores de la plataforma tendrán sus propias directrices de operación. Puede haber situaciones en las que la Plataforma no refleje ni implemente adecuadamente disposiciones de las reglas del Esquema de pagos. Es una cuestión de poder y de control. El Modelo 1 evita este problema, pero podría crear un problema del tipo \"dependencia del proveedor\", en el que los DFSP no tienen más remedio que pagar los costos de la plataforma controlada por el Esquema de pagos.

## 4. Decisión: Alcance de las reglas del esquema de pagos y autoridad sobre ellas

### 4.1 Alcance

El alcance de las reglas del esquema de pagos varía mucho de un esquema de pagos a otro. Todas cubren los elementos esenciales de la participación en el esquema de pagos, las obligaciones de las partes y la mecánica de la interoperabilidad. Pero muchos esquemas de pagos van mucho más allá y definen cómo los DFSP ponen los servicios de pago a disposición de sus clientes, y en qué términos. Aquí hay dos áreas que merecen mención: 

- Algunos esquemas de pagos especifican elementos de la experiencia del usuario final. Ejemplos de esto son las redes de tarjetas, que especifican los parámetros físicos y los requisitos de diseño de las tarjetas. Algunos sistemas (por ejemplo, el BIM de Perú) especifican cómo se le presenta al consumidor la interfaz del teléfono celular. Otros sistemas (por ejemplo, el UPI de India) llegan a proporcionar los SDK y las API que definen lo que la aplicación del usuario final puede hacer funcionalmente. Algunos sistemas pueden exigir que un DFSP que recibe una transacción de crédito tipo push la contabilice en la cuenta del cliente dentro de un plazo determinado 
- Algunos esquemas de pagos también especifican disposiciones de responsabilidad elaboradas sobre las transacciones interoperables. Esas disposiciones pueden variar según el caso de uso y según los atributos concretos de una transacción. Por ejemplo, en las redes de tarjetas, la responsabilidad puede pasar del emisor de la tarjeta al adquirente del comercio si el terminal del comercio no cumple ciertas especificaciones.

### 4.2 Autoridad sobre las reglas

Como se ha descrito arriba, el esquema de pagos es la entidad que escribe las reglas del sistema de pagos. Pero ¿quién aprueba esas reglas? Hay dos modelos principales en el mercado:

- Autoridad de los DFSP. En este modelo, todos los cambios de reglas (o algunos) los votan los DFSP participantes. La votación puede determinarse por puesto o de forma ponderada por volumen. Muchos esquemas de pagos han experimentado con variaciones de esto.

- Autoridad del Esquema de pagos con participación de los DFSP. En este modelo, la autoridad sobre las reglas reside en la entidad del esquema de pagos, pero se incluye algún grado de participación formal o informal de los DFSP: puede ser formal (comités permanentes que se reúnen para estudiar cambios de reglas, periodos de comentarios sobre enmiendas a las reglas especificados en las propias reglas, etc.) o informal (los representantes del esquema de pagos se reúnen o piden comentarios por escrito sobre los cambios de reglas propuestos).

### 4.3 Alineación con L1P — Alcance de las reglas y autoridad sobre ellas

Hay dos principios de Level One pertinentes: uno es la gobernanza participativa, y el otro es el mandato de entregar un sistema de bajo costo. Level One también reconoce la importancia de un sistema que sea cómodo y fácil de usar para los clientes usuarios finales, en especial para los consumidores y los comercios pobres. Por tanto, entre las consideraciones están:

- Las reglas pueden crear costos: cuanto más elaboradas sean las reglas que especifican cómo deben los DFSP prestar servicios al cliente, mayores serán los costos de cumplirlas.

- Lo compensa el valor de tener una experiencia común para el consumidor: hay bastante evidencia de que tener una experiencia común puede ayudar a los consumidores a aprender por sí mismos a usar los servicios. Cabe argumentar que es un factor importante para escalar el sistema. Pero cuanto más lejos llegue un esquema de pagos al escribir reglas que afectan a la experiencia del usuario final, más importante es que los DFSP participantes tengan alguna voz en esas reglas.

- La experiencia de los esquemas de pagos ha mostrado que las reglas de votación explícitas, aunque suenan bien a los DFSP, a menudo derivan en prácticas de decisión muy largas: esta es una de las razones por las que algunos esquemas de pagos usan el segundo modelo anterior y recurren a los DFSP participantes como caja de resonancia, pero no les otorgan autoridad sobre las reglas.

## 5. Decisión: Casos de uso

Una de las decisiones más importantes que tiene que tomar un esquema de pagos es qué casos de uso admitir. Con frecuencia, un esquema de pagos minorista de crédito tipo push en tiempo real empieza con los pagos de persona a persona (P2P) como primer caso de uso: a menudo, un esquema de pagos indicará al mercado que tiene intención de admitir otros casos de uso en el futuro. A medida que los esquemas de pagos evolucionan, hay "subcasos de uso" importantes a considerar: en algunas implementaciones de Mojaloop se usa para esto el término "caso de uso secundario": por ejemplo, si P2P es el caso de uso, el P2P transfronterizo podría ser un caso de uso secundario; de billetera a billetera y de billetera a cuenta bancaria podrían ser casos de uso secundarios.

Las reglas de negocio pueden variar según el caso de uso o el caso de uso secundario. Esto puede incluir detalles operativos (campos de datos usados, etc.), la tarificación del esquema de pagos (en particular, la tasa de intercambio) e incluso las disposiciones de responsabilidad.

El documento Open API que usa el código de Mojaloop incluye la siguiente lista de casos de uso:

- Transferencia P2P
- Depósito de efectivo iniciado por el agente
- Retiro de efectivo iniciado por el agente
- Retiro de efectivo iniciado por el agente y autorizado en el punto de venta
- Retiro de efectivo iniciado por el cliente
- Pago al comercio iniciado por el comercio
- Pago al comercio iniciado por el comercio y autorizado en el punto de venta
- Retiro de efectivo iniciado por el cajero automático
- Reembolso

Un esquema de pagos que implemente el sistema elegirá sus propios casos de uso primarios y secundarios, y las definiciones de estos estarán en las Reglas de Negocio. Los esquemas de pagos deberían considerar lo siguiente:

- Una eventual interoperabilidad entre esquemas de pagos será más fácil (sobre todo de un esquema de pagos implementado con Mojaloop a otro) si se usan los mismos casos de uso primarios y las mismas definiciones

- Los esquemas de pagos pueden necesitar diferenciar entre la capacidad de un DFSP de iniciar transacciones en un caso de uso o caso de uso secundario concreto, y los requisitos de que un DFSP deba poder admitir la recepción de transacciones en un caso de uso o caso de uso secundario concreto

- Cualquier regla que se escriba específicamente para un caso de uso o caso de uso secundario debe ser detectable de forma sistémica (por etiquetado o por inferencia) si la regla se va a aplicar automáticamente: esto es especialmente importante para las tasas de intercambio específicas de un caso de negocio. Cómo se hace esto debería formar parte de la documentación de negocio, en las Directrices de Operación.

### 5.1 Alineación con L1P — Casos de uso

Aquí hay dos consideraciones. Una cuestión importante es la relación entre los volúmenes altos en un sistema de pagos y la capacidad de ofrecer tarifas de procesamiento de costo ultrabajo a los DFSP participantes. Casi todos los sistemas de pagos minoristas admiten varios casos de uso, incluidos los que empezaron con uno solo. Las redes de tarjetas son un excelente ejemplo de esto: empezaron para dar soporte a las compras en el punto de venta y ahora admiten compras en línea, pago de facturas, pago de nóminas y pagos B2B. El procesamiento de pagos es un negocio de escala: a mayor volumen, menores pueden ser los costos unitarios. Level One apoya firmemente que un sistema de pagos se use para varios casos de uso: idealmente, todos los casos de uso minoristas de un país (es decir, excluyendo los B2B de alto valor).

La otra consideración es hacer que el sistema de pagos sea fácil de usar y de entender para los usuarios finales. El mismo sistema, con interfaces de usuario similares, etc. para los casos de uso, será más fácil de usar para los usuarios finales (en especial para los usuarios pobres o con poca formación).

## 6 Decisión: Códigos QR

Los códigos QR están emergiendo como un gran facilitador de los pagos a comercios en los países en desarrollo. Tanto los esquemas de pagos como las autoridades nacionales de pagos están decidiendo formatos, protocolos y alcance para los códigos QR. Algunas de las decisiones son:

- ¿El código QR lo presenta el comercio y lo escanea el consumidor, o lo presenta el consumidor y lo escanea el comercio? Level One prefiere los códigos QR presentados por el comercio, implementados junto con pagos push, no pull. Un código QR presentado por el comercio puede combinarse con un número de caja para que los consumidores con teléfonos no inteligentes puedan pagar fácilmente al mismo comercio.

- ¿El código QR es estático (el mismo para todas las compras) o es dinámico? Más que una decisión, esto se está viendo como una evolución: la mayoría de los mercados están empezando con códigos QR estáticos, pero tienen planes de pasar a códigos dinámicos. Los códigos dinámicos funcionan como un mensaje de pago de "solicitud de pago" en un sistema de pagos push, y pueden contener datos específicos de la compra.

- ¿El enfoque nacional de los códigos QR usa un enfoque de "código QR compartido", en el que un único código QR puede representar las credenciales de pago de un comercio en varios esquemas de pagos? La forma más habitual de implementar este enfoque es mediante el uso de los estándares de código QR de EMVCo. Una alternativa es un enfoque de código QR único, en el que un código QR se usa solo para acceder a un esquema de pagos interoperable (por ejemplo, el sistema CoDi de México) o a un sistema de circuito cerrado (por ejemplo, WeChat Payments de China). Un enfoque de código QR único puede crear ventajas de bajo costo al canalizar volumen a través de una única plataforma nacional, mientras que un enfoque entre esquemas de pagos puede habilitar la competencia entre varios esquemas de pagos.

- Si se usa un enfoque de código QR compartido, ¿hay una única entidad nacional que controle qué esquemas de pagos acepta un comercio dado? Si es así, ¿quién gestiona esa función de "repositorio" y cuáles son sus funciones? ¿Emite realmente la cadena de datos del código QR? Si es así, ¿firma la cadena y la valida? Hay quien especula con que un repositorio de códigos QR podría servir de punto de supervisión entre sistemas de pagos y de gestión del fraude. También podría vincularse de algún modo a un registro nacional de empresas. Es interesante plantear que un repositorio de códigos QR entre esquemas de pagos podría necesitar sus propias reglas de negocio, que se convertirían en "metarreglas" situadas por encima de las reglas de negocio de cada esquema de pagos.

- ¿La cadena de datos del código QR (la "carga útil") contiene la "dirección de pago" del comercio, o apunta de algún modo a un lugar donde esta se almacena? Este último enfoque da más flexibilidad y respalda la capacidad del comercio de cambiar de proveedor.

- ¿Cómo se protege al consumidor (y al comercio) del fraude con códigos QR?

- ¿Cuál es la economía de la transacción para el comercio? Level One tiene una preferencia clara por un precio nulo, o casi nulo, para el comercio pequeño o pobre.

## 7. Decisión: Direccionamiento de pagos

Cualquier esquema de pagos que implemente pagos de crédito tipo push necesita especificar cómo direccionan el pago el pagador y su DFSP Pagador. La dirección tiene que resolverse de algún modo en el número de cuenta del beneficiario en el DFSP que le proporciona su cuenta transaccional. El esquema de pagos necesita decidir:

- Qué tipos de direcciones de pago (a veces llamadas "identificadores") se usan. Algunas direcciones de pago son ID institucionales y números de cuenta: un número de ruta bancaria y un número de cuenta bancaria son un ejemplo de esto. Otras direcciones de pago pueden ser números de cuenta sin el ID institucional: un número de teléfono celular usado para dirigir fondos a una billetera de dinero electrónico proporcionada por un MNO es un ejemplo de esto. Todos los demás tipos de direcciones de pago son alias de algún tipo. Un alias puede ser una dirección de correo electrónico, un ID de comercio asignado por el esquema de pagos, un número de identidad nacional o un número de teléfono celular usado para dirigir fondos a una cuenta distinta de la proporcionada por un emisor de dinero electrónico MNO. Un alias admitido por el esquema de pagos también puede ser una frase: "payadamnu123".

- Para cada tipo de dirección de pago que admita el esquema de pagos, el esquema de pagos necesita determinar cómo se resuelve esa dirección de pago. Como mínimo, el esquema de pagos necesita admitir un mecanismo por el que la dirección se asocie a un DFSP participante del esquema de pagos responsable de la cuenta transaccional asociada a esa dirección de pago. La resolución puede hacerse de varias maneras distintas:

    - El esquema de pagos puede mantener un directorio que asocie el direccionamiento a los ID de los DFSP responsables: esto requiere algún tipo de proceso de registro de direcciones por parte del DFSP.

    - El esquema de pagos puede mantener un directorio que asocie la dirección al DFSP responsable y que además especifique el número de cuenta: esto requiere un proceso de registro algo distinto.

    - Cualquiera de estos tipos de directorios puede mantenerlo un tercero: las reglas del esquema de pagos establecerían cómo se pueblan, se mantienen y se usan esos directorios, y cuáles son las responsabilidades de las distintas partes.

    - Un esquema de pagos también puede usar un método de difusión para determinar el DFSP responsable de una dirección de pago dada ("¿reclama usted esta dirección?"), pero necesita desarrollar un protocolo para gestionar los conflictos si más de un DFSP "reclama" la dirección.

- Es importante señalar que el método de resolución puede ser distinto para cada tipo de dirección de pago admitida. Algunos tipos de direcciones de pago admitidas también pueden ir acompañados de conjuntos de datos concretos: por ejemplo, cuando un pago se hace para pagar una factura, la dirección de pago puede ser algún tipo de alias, y el uso de ese alias puede estar vinculado a los datos de la factura que lo acompañan. Los códigos QR dinámicos, por ejemplo, crearán una "solicitud de pago" que puede contener el ID de comercio admitido por el esquema de pagos (un alias) y el detalle de los datos de la transacción que lo acompañan.

La Open API Specification y el código de referencia de Mojaloop admiten una amplia gama de tipos de direcciones distintos: número de celular, cuenta bancaria, ID nacional, alias ("Quickshop\@abc"), etc.

### 7.1 Alineación con L1P — Direccionamiento de pagos 

Un direccionamiento de pagos seguro y sencillo se relaciona con dos conceptos importantes de Level One: la comodidad para el usuario final y la "apertura". Esta última es especialmente importante para habilitar la competencia y el escalado rápido de un sistema de pagos. Mientras los esquemas de pagos de todo el mundo (los alineados con Level One y los demás) se esfuerzan por determinar cómo resolver mejor la cuestión del direccionamiento de pagos, parecen estar surgiendo algunas buenas prácticas:

- Aunque el uso del número de celular, en particular, como dirección tiene un atractivo evidente, parece haber una tendencia a usar alias: identificadores sin ningún significado adicional. Esto se ve en India con el sistema UPI y en el nuevo sistema en tiempo real de Australia, donde al identificador se le llama PAYID.

- La portabilidad del identificador es deseable, tanto desde el punto de vista de la comodidad del usuario como en tanto que mecanismo para evitar la "dependencia del DFSP".

- Como se ha mencionado arriba, el directorio necesita asegurar la unicidad de la dirección de pago dentro del sistema de pagos: cualquier dirección dada solo puede asociarse a un único DFSP. Sin embargo, una única cuenta transaccional de un DFSP puede tener varias direcciones de pago que enruten hacia ella. Los DFSP tienen la oportunidad de crear servicios de valor agregado para sus clientes, en los que diferencien el tratamiento de las transacciones que se les enrutan por distintas direcciones de pago (sujeto, por supuesto, a las reglas de negocio generales del esquema de pagos).

## 8. Decisión: Liquidación entre participantes

Los esquemas de pagos necesitan determinar cómo liquidarán los DFSP participantes las obligaciones financieras que tienen entre sí y que surgen de las transacciones interoperables. Hay múltiples decisiones que tomar sobre el modelo de liquidación. Los modelos de liquidación existentes que se usan en los sistemas de pagos minoristas heredados tienen controles importantes sobre los riesgos. Como afirmación general, los esquemas de pagos de hoy tienen oportunidades de tomar decisiones que aprovechen la tecnología y la conectividad modernas para gestionar esos riesgos de otras maneras. Algunas de las decisiones son:

- Liquidación neta, bruta o bruta continua. Tradicionalmente se ha usado la liquidación neta para los sistemas de pagos minoristas (en la práctica, todos los sistemas salvo los LBTR). Algunos sistemas de pagos minoristas en tiempo real están usando ahora la liquidación bruta (el SPEI de México) o tienen previsto hacerlo (Brasil). Algunos sistemas están usando una cuenta de liquidación bruta continua (el RTP de EE. UU.): en este enfoque, los DFSP son dueños conjuntamente de una única cuenta en el Banco liquidador, y las cuotas de propiedad de la cuenta común se determinan, en cada momento, por la posición del DFSP en el libro mayor de la plataforma. Este enfoque no usa anotaciones de liquidación, ni neteo, ni contabilización de anotaciones de liquidación.

- Elección del banco liquidador. La mayoría de los sistemas de pagos minoristas interoperables usan el banco central del país como banco liquidador, pero hay ejemplos (la liquidación de las redes de tarjetas en EE. UU.) en los que se usa un banco comercial como banco liquidador.

- Cuentas de liquidación dedicadas o de uso múltiple. ¿Las cuentas de liquidación de los DFSP, mantenidas en el banco liquidador, están dedicadas al propósito de la liquidación del esquema de pagos, o se usan también para otros fines (liquidaciones de otros esquemas de pagos, saldos de reserva, etc.)? En un modelo de liquidación bruta continua, la cuenta común es siempre una cuenta dedicada.

- Liquidación en el mismo día o diferida. En un modelo de liquidación neta, ¿las anotaciones de liquidación se contabilizan en las cuentas del banco liquidador el día de la transacción, o más tarde?

- Ventanas de liquidación múltiples o única. En un modelo de liquidación neta, ¿hay una única ventana de liquidación por día hábil, o hay varias? Si hay varias, ¿las ventanas se definen por periodos de tiempo, por volumen de transacciones o por algún otro factor?

- Prefinanciada o no. ¿Se permite que las anotaciones de liquidación (en un sistema neto) o las transacciones individuales (en un sistema bruto) se produzcan si no hay fondos suficientes en la cuenta del banco liquidador? Si es así, ¿qué mecanismos (líneas de crédito, cuentas de garantía, etc.) se usan para respaldar ese riesgo? El término "prefinanciada" se usa cuando las reglas del esquema de pagos especifican que el DFSP debe tener suficiente dinero en su cuenta de liquidación para cubrir una transacción saliente: si no, la plataforma rechazará la transacción.

- Gestión dinámica de posiciones o no. En un sistema de liquidación neta que usa un switch, ¿el switch "conoce" la posición real del DFSP emisor antes de enviar la transacción al DFSP receptor?

- Cálculo automatizado o manual del límite de débito neto. El límite de débito neto es un monto que el sistema usa, junto con la gestión dinámica de posiciones, para determinar si una transacción concreta se envía o no al DFSP receptor. Puede fijarlo manualmente el esquema de pagos (de forma individual para cada DFSP) o puede estar automatizado: esto último requiere una conexión en tiempo real entre la cuenta (dedicada) del banco liquidador y el switch.

- El esquema de pagos puede definir componentes discrecionales del límite de débito neto. Hay dos tipos. Un componente discrecional del esquema de pagos puede sumar o restar al límite de débito neto de un DFSP concreto. Una suma puede usarse para crear un margen de seguridad; una resta puede usarse para ampliar las capacidades de sobregiro del DFSP. En este último caso, la responsabilidad del sobregiro debe acordarse claramente entre el esquema de pagos y el banco liquidador.

### 8.1 Alineación con L1P — Liquidación entre participantes

Level One tiene un principio claro que exige la liquidación en el mismo día. Más allá de eso, las consideraciones más importantes son cómo gestionará un esquema de pagos dado el riesgo y los costos para los DFSP, en particular los costos de liquidez. Esta es un área que evoluciona rápido en los sistemas de pagos, y se espera que distintos esquemas de pagos tomen decisiones distintas. En general, puede observarse que la automatización favorece la escala, y que la prefinanciación y las ventanas múltiples favorecen un riesgo y un costo bajos.

El código de referencia de Mojaloop admite una variedad de mecanismos de liquidación distintos.

## 9. Decisión: Acceso escalonado

Los sistemas de pagos minoristas heredados (y los sistemas mayoristas) generalmente admiten el acceso escalonado: la capacidad de las instituciones más pequeñas de acceder al sistema mediante relaciones de corresponsalía con instituciones más grandes. Se ha considerado necesario porque las instituciones más pequeñas tenían con frecuencia dificultades para cumplir las obligaciones de liquidación de la participación plena o las obligaciones técnicas (en particular de seguridad) de la participación plena.

En los países con licencias de Emisión de dinero electrónico (o con otros DFSP no bancarios o no tradicionales, o proveedores de cuentas transaccionales), la cuestión pasa a ser si esos proveedores no tradicionales acceden al sistema directamente o a través de una relación con un banco tradicional: en esos casos, la cuestión suele ser la de la liquidación, no la técnica.

### 9.1 Alineación con L1P — Acceso escalonado

No hay un único principio de Level One que oriente a un esquema de pagos sobre cómo abordar esta cuestión. Sin embargo, hay cuestiones tanto de costo como de riesgo a considerar:

- Cabe señalar que las instituciones más grandes han creado negocios muy rentables atendiendo a esas instituciones más pequeñas. Esos costos, asumidos por los participantes indirectos, se trasladarán de algún modo a los usuarios finales. Por eso, los esquemas de pagos alineados con Level One pueden querer evitar este modelo cuando sea posible.

- El principio de "Circuito abierto" de Level One sugiere que un esquema de pagos debería admitir la capacidad de todos los DFSP de participar directamente siempre que sea posible: la tecnología moderna, como la que usa Mojaloop, y los modelos de liquidación prefinanciada deberían facilitarlo.

- Los sistemas heredados también tienden a "ocultar" la actividad de la institución más pequeña al esquema de pagos o al hub. Esto puede ser indeseable desde el punto de vista regulatorio o de la gestión de riesgos. Algunos sistemas nuevos de pagos minoristas en tiempo real (en particular la Red RTP de EE. UU.) están permitiendo el acceso indirecto tanto técnico como de liquidación con plena transparencia de la institución más pequeña ante el esquema de pagos y la plataforma.

- Otro factor a considerar es específico de los países con Emisión de dinero electrónico u otros proveedores DFSP no tradicionales. Bajo el principio de L1P de participación de los DFSP en las decisiones de gobernanza, puede ocurrir que pedir a los Emisores de dinero electrónico que accedan a un sistema "por debajo" de un banco participante deje a esos DFSP en una posición de "segundo nivel" en cuanto a la gobernanza: cabe argumentar que esto es indeseable, sobre todo en casos, que parecen pertinentes en algunos países, en los que los Emisores de dinero electrónico tienen un volumen de transacciones mayor que sus bancos patrocinadores.

Tenga en cuenta que esta sección no trata el acceso al sistema por parte de otros FSP: eso se aborda en [Decisión: Uso del esquema de pagos por otros FSP](#_13-decision-uso-del-esquema-de-pagos-por-otros-fsp).

## 10. Decisión: Tarifas del esquema de pagos y precios al usuario final

Las tarifas asociadas a un esquema de pagos interoperable pueden clasificarse en:

-   Tarifas al usuario final: las tarifas (o los requisitos de saldo mínimo, etc.) que un DFSP cobra a su cliente usuario final. Esto incluye las tarifas cobradas a consumidores, comercios, emisores de facturas, gobiernos u otras empresas. Algunas de estas tarifas están específicamente ligadas a la propia transferencia interoperable (por ejemplo, una tarifa por "enviar una transferencia" o una "tarifa de descuento al comercio"); otras están relacionadas (una tarifa de "retiro de efectivo", una tarifa por retiro en cajero automático). Estas tarifas normalmente las fija el DFSP. En algunos países y situaciones, la regulación o los acuerdos de las reglas del esquema de pagos pueden aplicarse a las tarifas o influir en ellas. Las tarifas pueden ser montos fijos; montos fijos; montos porcentuales sobre el valor, o una combinación de fijo y porcentaje del valor. En cualquier caso, los tarifarios pueden diferir según las bandas de valor (por ejemplo, las transacciones por debajo del valor "X" tienen esta tarifa) o según el volumen de transacciones del usuario final.

- Tarifas de procesamiento: la tarifa que el Esquema de pagos, y el Operador de la Plataforma (si es distinto), cobran a los DFSP por el uso del esquema de pagos y de la plataforma. Igual que las tarifas al usuario final, las tarifas de procesamiento pueden ser fijas o variables y también pueden variar según la banda de valor o el volumen de transacciones.

- Tasas de intercambio: tarifas que un DFSP paga a otro DFSP en relación con una transacción interoperable. Las Tasas de intercambio normalmente las fija el Esquema de pagos (en las Reglas del Esquema de pagos) y las tabula y cobra físicamente el Esquema de pagos. El esquema de pagos y el operador de la Plataforma no pagan ni reciben estas tarifas: son un débito para un DFSP y un crédito para el otro. Tanto la tasa de intercambio como su dirección (¿la paga o la recibe el DFSP Pagador?) pueden variar según el caso de uso y el caso de uso secundario. Las tasas de intercambio pueden ser fijas, un porcentaje del valor o una combinación de ambas.

Además de fijar las políticas de tarifas, los esquemas de pagos tendrán que decidir cómo se cobran y (en el caso de las tasas de intercambio) cómo se pagan las tarifas. Hay una consideración importante con la tasa de intercambio: ¿deberían cobrarse y pagarse las tarifas como parte de la liquidación de cada transacción, o mediante un proceso de facturación de fin de periodo (mensual, por ejemplo)?

### 10.1 Alineación con L1P: Tarifas

Uno de los conceptos más importantes de Level One es tener una plataforma de costo ultrabajo, con tarifas para el consumidor y el comercio pequeño lo más bajas posible. Un elemento importante para lograrlo en un sistema de pagos es alcanzar escala. Los esquemas de pagos querrán considerar ambos factores al fijar sus políticas de tarifas. Entre las consideraciones están:

- **Precios al usuario final.** ¿Está el esquema de pagos en posición de poner algún control o limitación sobre esto? La respuesta variará según la jurisdicción. Algunos esquemas de pagos han puesto limitaciones a la estructura de las tarifas (por ejemplo, que deban ser planas frente a un porcentaje del valor), a qué partes pueden ser cobradas (por ejemplo, que se pueda cobrar a los pagadores pero no a los beneficiarios, etc.) o a cuánto pueden ser las tarifas en conjunto. Algunos esquemas de pagos no lo han escrito en las reglas, pero han fomentado un acuerdo informal sobre las políticas de tarifas (sujeto a las aprobaciones regulatorias) para incentivar el uso por parte del consumidor. Otros esquemas de pagos han prohibido ciertos tipos de acciones sobre tarifas, como cobrar recargos por las transacciones interoperables.

- **Tarifas de procesamiento.** El objetivo aquí es que las tarifas del esquema de pagos a los DFSP sean lo más bajas posible (en concreto, e idealmente, una fracción de un centavo de dólar estadounidense). Las mejores prácticas del mercado son que estas tarifas sean fijas, y no un porcentaje del valor: tiene sentido, dado que el esquema de pagos y la plataforma no asumen riesgo de valor al procesar las transacciones. Sin embargo, hay un reto con las tarifas puramente fijas: cómo evitar tener tarifas demasiado altas para transacciones de muy bajo valor. Algunos esquemas de pagos lo están abordando mediante bandas de valor, con cargos fijos más bajos para las transacciones por debajo de cierto valor. Algunos esquemas de pagos están estableciendo tramos de volumen para incentivar a los DFSP. Los esquemas de pagos pueden querer fomentar (o incluso exigir) que los DFSP enruten a través de la plataforma las transacciones "on-us" (en las que el DFSP pagador y el beneficiario son la misma institución): si es así, el esquema de pagos puede querer fijar una tarifa cero para esas transacciones. Algunos esquemas de pagos también pueden cobrar cuotas de membresía o de incorporación a los DFSP. Por último, algunos esquemas de pagos pueden ofrecer un periodo de tiempo tras el lanzamiento del esquema de pagos en el que se exoneren todas las tarifas.

- **Tasas de intercambio**. Este es un tema complejo y a menudo debatido en la industria de pagos de todo el mundo, y uno que con frecuencia atrae el escrutinio regulatorio. Los esquemas de pagos pueden querer considerar:

    - Si tener o no tasa de intercambio en absoluto. Algunos sistemas de pagos la tienen; muchos no. Los sistemas de pagos minoristas en tiempo real de todo el mundo están divididos sobre si admiten o no el uso de la tasa de intercambio y, donde lo hacen, sobre en qué dirección fluye para casos de uso como el P2P.

    - La tasa de intercambio es un mecanismo útil como forma de facturación: cuando quien recibe un servicio valioso (como un comercio que quiere acceso a la cuenta de pago de un consumidor) no tiene relación con quien presta ese servicio (el DFSP del consumidor). Otro ejemplo de esto es cuando el cajero automático de un banco se usa para entregar fondos al cliente de otro banco.

    - La tasa de intercambio es más cuestionable cuando se usa para sostener modelos de negocio heredados: por ejemplo, si una transacción interoperable hace que un DFSP pagador "pierda" una tarifa de retiro de efectivo que de otro modo habría ganado, el esquema de pagos puede especificar una tasa de intercambio en la que el DFSP Beneficiario pague al DFSP Pagador para compensar esa pérdida. Puede ser práctico usar la tasa de intercambio en estas situaciones a corto plazo, pero a largo plazo cabe argumentar que el modelo de negocio subyacente necesita evolucionar.

    - Los esquemas de pagos deberían tener presente que allí donde se usa la tasa de intercambio se está creando un "costo duro" que absorbe, y probablemente traslada a las tarifas al usuario final, el DFSP que la paga.

## 11. Decisión: Gestión de la marca

¿Debería usarse una marca del esquema de pagos? ¿Debería usarse la misma marca para todos los casos de uso? ¿O debería la única marca usada ser la del DFSP que ofrece un servicio a sus clientes? Como es de esperar, es un tema que se ha debatido en los sistemas de pagos a lo largo de los años.

### 11.1 Alineación con L1P — Marca

Level One tiene un principio de diseño claro que respalda una marca común: parte de hacer que el servicio sea comprensible y fácil de usar tanto para los consumidores como para los comercios. Una marca común del esquema de pagos puede usarse junto con las marcas de los DFSP: "Use DFSP SuperPay (marca del DFSP) con XPay (marca del Esquema de pagos) para pagar sus facturas."

Las reglas de negocio tendrán que especificar cómo y dónde se usa la marca común.

## 12. Decisión: Conexiones del esquema de pagos con otros esquemas de pagos

La aparición de sistemas de pagos minoristas en tiempo real más o menos similares en todo el mundo ha dado lugar a muchas discusiones sobre lo deseable que sería conectar esos esquemas de pagos entre sí. Esto puede facilitar tanto las transacciones dentro de un país como, en particular, tener importancia para los pagos transfronterizos de todo tipo, incluidas las remesas de los trabajadores.

En los sistemas de pagos heredados, este tipo de conexión es poco frecuente de esquema de pagos a esquema de pagos. Excepciones notables son la conexión nacional de las redes de cajeros automáticos y la conexión de los esquemas de tarjetas nacionales que son propiedad de las redes de tarjetas globales o están controlados por ellas. Lo que ocurre, en cambio, es que los DFSP u otros proveedores que participan en varias redes (directamente o mediante alianzas) crean el efecto de una conexión entre esquemas de pagos mediante acuerdos individuales: así es, en esencia, como funciona la banca corresponsal transfronteriza.

Mojaloop, como tecnología, está diseñado para permitir la conectividad de sistema a sistema. Los esquemas de pagos que implementen sistemas Mojaloop tendrán que considerar el equilibrio entre cerrar acuerdos de negocio de esquema de pagos a esquema de pagos (con las conexiones técnicas correspondientes) o permitir que los DFSP de su esquema de pagos se conecten bilateralmente a otros esquemas de pagos o DFSP.

### 12.1 Alineación con L1P — Conexiones con otros esquemas de pagos

Los principios de L1P pertinentes aquí son el bajo costo y la "apertura". El código de Mojaloop, en particular, tiene el potencial de convertir las transacciones transfronterizas de unas regidas por relaciones complejas (como en el caso de la banca corresponsal tradicional) en unas por las que se compite en un mercado abierto e interconectado. Los esquemas de pagos tendrán que evaluar los méritos de esto (que cabe argumentar que promueve costos más bajos) frente a los riesgos de dominio por parte de las grandes instituciones. Los acuerdos de negocio entre esquemas de pagos pueden tener características beneficiosas de "igualar el terreno de juego". También son posibles las relaciones híbridas. Esta es un área en evolución de la industria de pagos, y una en la que tanto es posible como probable una variedad considerable de arreglos.

## 13. Decisión: Uso del esquema de pagos por otros FSP

Un esquema de pagos exitoso y alineado con L1P será usado por muchas empresas (comercios, emisores de facturas, organismos públicos, etc.) además de por personas individuales. También habrá una amplia gama de otros FSP (Proveedores de servicios financieros) que no son DFSP: es decir, que no mantienen cuentas transaccionales de clientes. Esto incluye a los proveedores de servicios de pago: agregadores, proveedores de servicios para comercios, diversos procesadores de DFSP, etc., todos los cuales pueden querer conectarse al esquema de pagos y usarlo.

Como se describe en la decisión sobre "participación" anterior, un esquema de pagos alineado con Level One incluye como participantes directos y liquidadores solo a las entidades que mantienen las cuentas transaccionales de usuario final: las cuentas que se debitan y se acreditan como resultado de la transacción interoperable.

Otras entidades pueden conectarse físicamente a la plataforma bajo una variedad de arreglos de negocio. El esquema de pagos tendrá que decidir hasta qué punto se implican sus reglas de negocio en dictar términos o estándares para esos arreglos. Como principio general, cualquier otro FSP que se conecte a la plataforma tendrá que estar actuando en nombre de un DFSP cuya cuenta transaccional de cliente se esté debitando (el DFSP pagador) o acreditando (el DFSP beneficiario). En los modelos de pagos heredados, el DFSP conserva todas las obligaciones y responsabilidades financieras de la transacción: el tercero actúa puramente en nombre del DFSP. Las reglas de negocio del esquema de pagos pueden especificar requisitos para los arreglos de negocio entre el DFSP y el tercero. En algunas jurisdicciones (en particular India y la UE), la regulación está impulsando cambios en este modelo para permitir que otros FSP tengan una participación más directa en los esquemas de pagos. Las reglas del esquema de pagos tendrán que describir y acotar cuidadosamente los parámetros de esos arreglos.

Nota sobre definiciones: no usamos aquí el término "PSP" (Proveedor de servicios de pago) a propósito, ya que en distintas jurisdicciones este término se usa para incluir a proveedores de cuentas transaccionales, en algunos casos, y a proveedores que no son de cuentas transaccionales, en otros. Como comentario adicional, hoy en muchos países entidades como los agregadores mantienen cuentas financieras en bancos o en Emisores de dinero electrónico y usan esas cuentas para recibir dinero de los clientes y entregar dinero a otros clientes. En este papel, el agregador es cliente de un DFSP (el banco o el Emisor de dinero electrónico) y actúa además como Proveedor de servicios financieros. Puede que en el futuro esos agregadores no necesiten intermediar la transacción financiera, sino que en su lugar den instrucciones que lleven a la transferencia directa de fondos, a través del esquema de pagos, de la cuenta transaccional de un cliente a la de otro.

### 13.1 Alineación con L1P — Uso por otros FSP

Los principios aquí son, de nuevo, el bajo costo y la apertura. Level One animaría a que los nuevos actores puedan usar el esquema de pagos y acceder a él, siempre que sus acciones estén controladas por el esquema de pagos para asegurar la seguridad y la estabilidad financiera.

## 14. Decisión: Estándares de gestión de riesgos del esquema de pagos

Los esquemas de pagos, sus plataformas y los DFSP y terceros participantes, obviamente, necesitan operar conforme a estándares sólidos de gestión de riesgos para asegurar un ecosistema de sistema de pagos sano.

La cuestión para un esquema de pagos es el equilibrio entre definir esos estándares por sí mismo y apoyarse en otros estándares. Desde la perspectiva de las Reglas de Negocio, es una decisión importante. Los esquemas de pagos pueden:

- Desarrollar estándares detallados de gestión de riesgos para los DFSP (y para la Plataforma) y llevar a cabo procesos rigurosos de certificación o de auditoría para asegurar el cumplimiento

- Exigir que los DFSP, la Plataforma y los terceros sigan estándares nacionales o globales de referencia para la gestión de riesgos y la seguridad

### 14.1 Alineación con L1P — Estándares de gestión de riesgos

Level One no aborda cuál de las opciones anteriores es la mejor. Pero los conceptos de un sistema seguro para que lo usen los consumidores, y de un sistema de bajo costo, se aplican claramente aquí. Algunas consideraciones:

- Una utilidad compartida de gestión del fraude (que los principios de Level One sí respaldan) puede encargarse de forma rentable de algunas de las tareas de gestión del fraude. Esto no reduce la carga de cumplimiento de cada DFSP, sino que solo cambia cómo cumple esa carga

- Las redes de tarjetas globales han demostrado eficazmente la capacidad de automatizar elementos del procesamiento de excepciones, centrándose en las transacciones que ocurren con más frecuencia

- La comunidad de Mojaloop ha expresado interés en codificar las excepciones y en dar soporte mediante código a algunos procesos

- La comunidad de Mojaloop también puede desarrollar documentos de buenas prácticas para abordar áreas de la gestión de riesgos, incluida la ciberseguridad

## 15. Decisión: Gestión de excepciones

El procesamiento de excepciones incluye una amplia variedad de transacciones e interacciones no estándar entre los usuarios y los proveedores de un esquema de pagos. Entre ellas están:

- Errores por parte de los usuarios finales

- Errores por parte de los DFSP, la Plataforma u otros FSP

- Fraude cometido por clientes usuarios finales, incluidos personas
    individuales, comercios, emisores de facturas u otras entidades

- Fraude cometido por terceros, incluidos hackers

- Ataques maliciosos al sistema o a DFSP concretos, incluidos los ciberataques.

Los esquemas de pagos tienen decisiones importantes que tomar sobre hasta qué punto se implican el esquema de pagos, y sus Reglas de Negocio, en definir cómo gestionan los participantes del esquema de pagos esas excepciones. Los sistemas de pagos heredados nos muestran una amplia variedad de modelos en uso, desde sistemas en los que el esquema de pagos y las Reglas de Negocio se implican mínimamente en la gestión del procesamiento de excepciones (los cheques, la mayoría de los sistemas ACH) hasta sistemas en los que el esquema de pagos y sus Reglas de Negocio se implican de forma extensa (la mayoría de las redes de tarjetas). Los sistemas de pagos minoristas en tiempo real de todo el mundo están, en general, solo en las primeras etapas de decidir cómo abordar estas cuestiones.

### 15.1 Alineación con L1P — Procesamiento de excepciones

Hay dos principios de diseño de Level One muy importantes relacionados con esto.

- Uno es el principio de la irrevocabilidad de la transacción. Significa que una transacción de pago que se completa con éxito (en una implementación de Mojaloop, una que se ha completado) no puede revertirse sin el consentimiento del beneficiario.

- El otro es el compromiso con un recurso compartido de gestión del fraude a nivel de la plataforma. La idea es que el esquema de pagos y su plataforma tendrán una visión más amplia de todos los datos de las transacciones y podrán realizar las tareas de detección y gestión del fraude de forma más eficaz y a menor costo de lo que pueden hacerlo los DFSP por separado. Este concepto está en una etapa muy temprana de su evolución a medida que se despliegan los sistemas Level One, tanto con tecnología Mojaloop como sin ella.

Los esquemas de pagos se enfrentarán a retos importantes en esta área cuando se produzca el tan esperado despliegue de los pagos a comercios, en particular en los mercados menos desarrollados que no tienen industrias de pagos con tarjeta muy penetradas. El reto será equilibrar el deseo de proteger a los consumidores del fraude de los comercios con el deseo de tener precios bajos para el usuario final. En los mercados desarrollados de pagos con tarjeta, esto lo proporcionan a menudo reglas de negocio que especifican que el banco de un comercio es responsable financieramente del fraude que cometa ese comercio. Funciona, pero da lugar a cargos de transacción relativamente altos para el comercio, ya que su banco debe cubrir su exposición al riesgo bajo esas reglas. Este modelo financiero puede o no ser sostenible en economías menos desarrolladas. Esta es otra área en la que anticipamos una evolución extensa en los próximos años.

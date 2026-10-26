---
i18n_source_sha: 8390db5349befd6169e999949ce40085fae6d9b7
---

# Casos de uso

La función central de un Hub de Mojaloop es la compensación de la transferencia de fondos entre dos cuentas, cada una de ellas mantenida en un DFSP conectado al Hub, lo que comúnmente se denomina pago tipo push. Esto le permite admitir una amplia gama de casos de uso. Sin embargo, este no es el único tipo de transferencia que admite Mojaloop.

La siguiente descripción de los casos de uso que admite Mojaloop está agrupada según los tipos de protocolo subyacentes, con el fin de demostrar la naturaleza extensible de un Hub de Mojaloop. Así, tenemos:
- **Pagos tipo push**, que admiten los casos de uso centrales de P2P, B2B, etc.;
- **Solicitud de pago**, que admite algunos tipos de pagos a comercios, comercio electrónico y cobranzas;
- Una gama de **servicios de efectivo**, incluidos CICO y sin conexión;
- **Protocolos PISP/3PPI**, que permiten a las fintech y a otros desarrollar servicios como pagos a comercios, procesos de nómina a pequeña escala, cobranzas, etc.;
- **Pagos masivos**, para admitir pagos sociales y salarios a escala nacional;
- **Pagos transfronterizos**, incluidas tanto las remesas como los pagos a comercios.

Estos se describen con mayor detalle a continuación. Al leer estas descripciones, debe recordarse que muchos de estos tipos de transacción [admiten el transporte de metadatos junto con el pago mismo](./metadata.md).

(Para una visión de los casos de uso centrada en la API, consulte la [sección de casos de uso de la documentación de la API de Mojaloop](https://docs.mojaloop.io/api/fspiop/use-cases.html#table-1))
## Casos de uso de "pagos tipo push"
Un Hub de Mojaloop admite directamente los siguientes casos de uso, que son todos "variantes" de los pagos tipo push:
- Persona a persona (**P2P**);
- Persona a empresa (**P2B**)
  - incluidas muchas formas de **pagos a comercios**, tanto presenciales como remotos (en línea);
- Empresa a empresa (**B2B**);
- Empresa a organismo público (**B2G**);
- Formas simples de pagos de persona a organismo público (**P2G**)

### Pagos a comercios
En todos los tipos de **pago a comercio**, un pago puede facilitarse mediante ID del comercio (para USSD) o códigos QR (teléfonos inteligentes).

Los aspectos prácticos de la configuración de la capa de pagos a comercios de Mojaloop, incluido el contenido de los códigos QR, se exploran en [**esta guía para usar la capa de pagos a comercios con Mojaloop**](./Merchant_Payments/Merchant_Payments_Overview_V1_0.md), que aborda el registro de comercios, los ID del comercio, los códigos QR (estáticos y dinámicos) y los LEI.

## Casos de uso de "solicitud de pago"

Además de los pagos tipo push, Mojaloop admite transacciones de solicitud de pago (RTP), en las que un beneficiario solicita un pago a un pagador y, _cuando el pagador da su consentimiento_, su DFSP envía el pago al beneficiario en su nombre. Esto admite los siguientes casos de uso:

- **Pagos a comercios**, en un entorno presencial, por ejemplo usando un código QR (como se describió antes);
- **Comercio electrónico**, a veces también conocido como pagos remotos a comercios, cuando por ejemplo una página de pago (página web o aplicación móvil) incluye un botón de "pagar desde mi cuenta bancaria" que desencadena una RTP. 

- **Cobranzas**, incluidas P2G, P2B, B2B y B2G. Esto se usaría comúnmente para el pago de facturas de servicios públicos. Esto también puede lograrse mediante la interfaz fintech/3PPI que se describe más adelante; la decisión corresponde al operador del esquema de pagos. 

## Servicios de efectivo
Un Hub de Mojaloop admite directamente las transacciones interoperables comunes de depósito y retiro de efectivo que todo DFSP (y sus clientes) esperaría:
- **Cajero automático sin tarjeta**, mediante la integración con redes de cajeros automáticos, usando el protocolo ISO 8583;
- **Depósito y retiro de efectivo (CICO) en un agente off-us**;
- **Efectivo sin conexión**:
	- Un Hub de Mojaloop puede ofrecer soporte a los esquemas de pagos de **efectivo sin conexión** porque ese tipo de esquema de pagos se considera efectivo, aunque digital. Así, un retiro hacia una billetera de efectivo sin conexión (una carga) es análogo a una transacción de "retiro de efectivo"; y un depósito desde una billetera de efectivo sin conexión (una subida) es análogo a una transacción de "depósito de efectivo". Sin embargo, el operador de un esquema de pagos así podría considerar que todas esas transacciones de carga y subida de la billetera, sean on-us u off-us, deberían procesarse a través del Hub de Mojaloop, para facilitar la conciliación por parte del esquema de pagos sin conexión.

## Casos de uso de "3PPI": fintech y otros
Un Hub de Mojaloop admite directamente el inicio de pagos por terceros (3PPI), de modo que los proveedores de servicios de inicio de pagos (PISP), más conocidos como fintech, puedan, mediante sus propias aplicaciones para teléfonos inteligentes, captar clientes y ofrecerles un servicio de pagos unificado o mejorado. La mayoría de los DFSP conectados a un Hub de Mojaloop pueden admitir servicios 3PPI si cuentan con un back office razonablemente moderno.

Una fintech puede usar el servicio 3PPI para iniciar una solicitud de pago (RTP), pidiendo al DFSP de su cliente que inicie un pago a un beneficiario. Esto admite los siguientes casos de uso:
-	**Cobranzas**, en particular P2G y P2B;
-	**Pagos de salarios**, esencialmente el procesamiento de una lista de pagos masivos, en nombre de pequeñas y medianas empresas; 
-	**Pagos a comercios** (P2B), usando un código QR para el inicio.

## Casos de uso de "pagos masivos"
Todo servicio de pagos necesita facilitar los pagos masivos, y Mojaloop ofrece este servicio mediante un modelo extremadamente eficiente. Todos los DFSP, salvo los más pequeños, pueden ofrecer este servicio a sus clientes, lo que les permite enviar listas de pagos que pueden llegar a todos los clientes de todos los DFSP conectados. Esto sirve de apoyo a:
- **Pensiones, pagos sociales y otros pagos** (G2P);
- **Salarios** (G2P y B2P).

Además, la funcionalidad de pago masivo está disponible mediante el **servicio 3PPI** (descrito antes), lo que permitiría a todos los DFSP, incluso a los más pequeños, ofrecer un servicio de pagos masivos de menor escala a través de una fintech o directamente mediante su propio servicio 3PPI.


## Casos de uso "transfronterizos"

Un Hub de Mojaloop puede permitir que los clientes de un DFSP envíen dinero al exterior de manera rentable, facilitando el proceso de conversión de divisas (FX) como parte de la transacción. Esto admite los siguientes casos de uso:
- **P2P** y **P2B** (enviar dinero a amigos y familiares en otro país, o pagar una factura en otro país);
- **Pagos a comercios**, usando RTP de forma transfronteriza (lo que da soporte, por ejemplo, a un pequeño comercio que desea cruzar una frontera cercana para vender en un mercado local y aceptar pagos en la moneda local)

Para explorar los aspectos del ecosistema de Mojaloop que hacen esto posible, se recomienda revisar:
1. La capacidad de conectar un Hub de Mojaloop a esquemas de pagos vecinos, ya sea dentro del mismo país o en otros lugares, de modo que se admita la interoperabilidad. Esta capacidad [**se presenta aquí**](./InterconnectingSchemes.md).
  
2. El soporte para que los proveedores de divisas (FXP) se conecten a un Hub de Mojaloop y ofrezcan servicios de FX. Ni el pagador ni el beneficiario necesitan definir la moneda que se usará para una transacción; cada uno transacciona en su propia moneda y el Hub o los Hub de Mojaloop facilitan el intercambio. Esta capacidad [**se presenta aquí**](./ForeignExchange.md).

3. Cómo se combinan las capacidades de interconexión o interscheme y de divisas para admitir las [**transacciones transfronterizas**](./CrossBorder.md).
## Otros; pagos con tarjeta
Muchos adoptantes potenciales preguntan por la posibilidad de usar Mojaloop para conmutar transacciones con tarjeta. La respuesta es que, desde una perspectiva técnica, es perfectamente posible conmutar una transacción con tarjeta; el número de cuenta personal (PAN) de la tarjeta puede usarse como alias para iniciar una transacción RTP, sobre todo porque el número de identificación bancaria (BIN), que forma parte del PAN, identifica al DFSP que mantiene la cuenta del cliente, al que debería enrutarse la RTP.

Sin embargo, en la práctica el dispositivo de punto de venta (PoS) de la tarjeta tendría que actualizarse para enrutar las transacciones en consecuencia: las transacciones nacionales mediante una RTP hacia el Switch de Mojaloop y el resto hacia la red de tarjetas emisora. Y esos dispositivos PoS suelen pertenecer a los bancos adquirentes, que probablemente no concedan acceso (los minoristas más grandes, que a menudo son dueños de sus dispositivos PoS, habitualmente integrados, podrían estar más dispuestos).

Además, reenrutar transacciones iniciadas con una tarjeta que lleva el logotipo de un esquema de pagos internacional sería totalmente inapropiado y, casi con certeza, colocaría a todos los involucrados en una posición legal precaria. En consecuencia, esto solo debería considerarse cuando se use un esquema de pagos de tarjetas nacional y el propietario de ese esquema de pagos esté dispuesto a que sus tarjetas se usen de esta manera.

Finalmente, usar un enfoque así para tarjetas de débito se ajusta mejor a una transacción RTP de Mojaloop; usarlo para una tarjeta de crédito, lo que podría implicar colocar una reserva de fondos en una cuenta (al registrarse en un hotel, por ejemplo), agregaría mayor complejidad.

## Casos de uso ampliados

Además de estos casos de uso estándar, Mojaloop admite la implementación de casos de uso más complejos por parte de los adoptantes, que agregan funcionalidades adicionales y se superponen a los casos de uso estándar.

Los operadores de esquemas de pagos individuales pueden agregar fácilmente estos casos de uso específicos de cada esquema de pagos.

## Aplicabilidad

Esta versión de este documento corresponde a la versión [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0) de Mojaloop

## Historial del documento
  |Versión|Fecha|Autor|Detalle|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.6|24 de julio de 2025| Paul Makin|Se corrigieron algunos enlaces rotos.|
|1.5|16 de julio de 2025| Paul Makin|Se cambiaron los subtítulos para reflejar cómo el texto introductorio habla de los casos de uso. Se refinaron las descripciones. Se agregó un enlace a una descripción de metadatos. Se agregó una nota sobre las transacciones con tarjeta.|
|1.4|12 de junio de 2025| Paul Makin|Se amplió el texto introductorio para explicar la agrupación de los casos de uso.|
|1.3|10 de junio de 2025| Paul Makin|Se agregó una descripción de los pagos de comercio electrónico mediante RTP. Se retitularon los pagos 3PPI como pagos Fintech.Se aclaró el inicio de pagos masivos mediante 3PPI. Por último, algunas actualizaciones cosméticas para destacar los hipervínculos a otros documentos.|
|1.2|14 de abril de 2025| Paul Makin|Actualizaciones relacionadas con el lanzamiento de la V17, incluidos enlaces a la documentación de interscheme y FX.|
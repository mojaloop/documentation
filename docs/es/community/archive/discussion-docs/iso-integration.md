---
i18n_source_sha: 333ed87296f52100e8e2fc477e9a0d390e2a2404
---

Debates sobre la integración de Mojaloop con ISO

# Integración Mojaloop-ISO
 
La solución propuesta podría gestionar la traducción de ISO a Open API y viceversa, usando un plug-in o una interfaz de conversión/conexión ISO-OPEN API, similar al Scheme Adapter del sistema Mojaloop. Igual que el Scheme adapter convierte de la API de Mojaloop a la API del FSP, el plug-in o la interfaz a medida funcionaría como traductor de protocolo y de mensajes entre la interfaz ISO y la ML API o el Scheme Adapter.

## Alcance

Definir los flujos de mensajes en las redes ISO y Open API y las correspondencias entre mensajes.
 -  Documentar los escenarios de fallo y sus flujos de mensajes.
 -  Definir un mecanismo de enrutamiento basado en MSISDN.
 -  Las transacciones de Mojaloop podrían enviarse por los raíles de pago existentes conforme a sus estándares (como ISO)
 -  Desarrollar un scheme adapter o plug-ins que pudieran hacer la conversión ISO-Open API y viceversa.
 -  Poder enviar transacciones de Mojaloop originadas en cajeros automáticos y POS por redes ISO, entre sistemas Mojaloop
 
 ## ISO 8583 - Mojaloop - Un caso de estudio entre redes
 
África es un gran continente con multitud de proveedores de servicios financieros centrados en la inclusión financiera y la prestación de servicios a escala regional. El continente cuenta con una amplia red de proveedores de servicios de pago e instituciones financieras. Algunas de las redes más destacadas son:

-   InterSwitch (Nigeria)
-   eProcess (Ghana)
-   Umoja Switch (Tanzania)
-   KenSwitch (Kenia)
-   ZimSwitch (Zimbabue)
-   RSwitch (Ruanda)

Casi todas estas redes usan una plataforma de procesamiento de pagos basada en ISO 8583 (Postilion Switch) para operar canales de cajeros automáticos, POS y móviles, y procesar transacciones con y sin tarjeta tanto en el ámbito adquirente como en el emisor.

Por eso, la propuesta es crear una solución en la que las redes de pago existentes puedan integrarse con un sistema basado en Mojaloop como Mowali, sin tener que hacer ningún cambio de desarrollo o de diseño en su infraestructura actual.

En este caso de estudio consideramos el caso de Umoja Switch en Tanzania y les ofrecemos una solución con la que Umoja podría ofrecer transacciones de Mojaloop a través de sus despliegues de cajeros automáticos existentes.

### Umoja Switch

Seis bancos de Tanzania crearon UmojaSwitch en 2006, con el propósito principal de poder establecer una infraestructura compartida conjunta para los servicios financieros y aprovechar las economías de escala.

El objetivo de su creación era construir una plataforma compartida en la que las instituciones financieras pudieran integrarse e interpolar a través de un switch compartido.

Con el tiempo, el número de miembros que se unían a la red de UmojaSwitch siguió aumentando y actualmente hay unos 27 bancos que se han unido al consorcio Umoja Switch.

## De las redes ISO a Open API

El objetivo de la prueba de concepto sería mostrar cómo se enviaría una transacción de Mojaloop por un switch o una red ISO estándar hasta un sistema Mojaloop como Mowali.

Como parte de esto se implementaría un adaptador ISO-Open API que procesaría los mensajes ISO originados en una red ISO como InterSwitch y los enviaría a una red Open API como Mowali.

## Solución propuesta

La solución propuesta consistirá en una interfaz o un adaptador/plugin que pueda procesar transacciones entre las redes ISO y los sistemas Mojaloop.

La plataforma de pagos ISO usa una interfaz ISO que emplea una conexión TCP/IP estándar para enviar mensajes ISO a los distintos canales y responder a ellos. Para aceptar y procesar conexiones desde la interfaz, nuestra solución tendría un listener de TCP/IP que recibiría y procesaría las transacciones de la red ISO y después las convertiría a Open API, tras lo cual las transacciones se enviarían a un sistema Mojaloop como Mowali en una URL.

En este caso, las redes de pago dependen en gran medida de su respectivo número de tarjeta o de cuenta (es decir, Visa/MasterCard/Verve/etc.), que se usa para definir la tabla de búsqueda de BIN con fines de enrutamiento. Una de las opciones sería predefinir un rango de BIN (p. ej.: 757575) que identificara una transacción de Mojaloop y después dejar que la red de pago implementara una lógica de enrutamiento que enviara todas las transacciones de Moja a la red Open API.

El adaptador ISO-Open API procesaría el mensaje ISO recibido del switch ISO y lo enviaría al sistema Mojaloop en formato Open API.

Sin embargo, esos cambios implicarían cambios de configuración para descargar aplicaciones en los cajeros automáticos y en otros dispositivos terminales, pero esto podría gestionarse como un cambio operativo estándar, similar a los cambios de configuración que ya se hacen según los requisitos del negocio.

---
syncRef: 10fb6286c2fca63aad808dfdf10fc034e3dd84d3
---

# Preguntas frecuentes generales

Este documento reúne algunas de las preguntas más frecuentes de la comunidad.

## 1. ¿Qué es Mojaloop?
 
Mojaloop es software de código abierto para construir plataformas de pagos digitales interoperables a escala nacional. Facilita que distintos tipos de proveedores conecten sus servicios y desplieguen servicios financieros de bajo costo en nuevos mercados.


## 2. ¿Cómo funciona?
 
La mayoría de los proveedores de servicios financieros digitales operan en sus propias redes, lo que impide que clientes de servicios distintos realicen transacciones entre sí. Mojaloop funciona como un conmutador universal, enrutando los pagos de forma segura entre todos los clientes, sin importar en qué red se encuentren. Consta de tres capas principales, cada una con una función específica: una capa de interoperabilidad, que conecta cuentas bancarias, billeteras de dinero móvil y comercios en un circuito abierto; una capa de servicio de directorio, que gestiona los distintos métodos que usan los proveedores para identificar las cuentas a cada lado de una transacción; una capa de liquidación de transacciones, que hace que los pagos sean instantáneos e irrevocables; y componentes que protegen contra el fraude.

## 3. ¿A quién está dirigido?
  
El código tiene muchos componentes, y toda persona que trabaje directa o indirectamente con transacciones financieras digitales (desarrolladores fintech, banqueros, emprendedores, startups) está invitada a explorar y utilizar las partes que le resulten útiles o atractivas. El software en su conjunto está pensado para implementarse a escala nacional, por lo que será más aplicable a proveedores de dinero móvil, asociaciones de pagos, bancos centrales y reguladores nacionales.

Los desarrolladores de empresas fintech y de servicios financieros pueden usar el código de tres maneras: adaptarlo a los estándares de servicios financieros de un país, usarlo para actualizar sus propios productos y servicios o crear otros nuevos, y mejorarlo proponiendo actualizaciones y nuevas versiones para el resto de los usuarios.

Por ejemplo:

- Un banco central puede encargar el uso del software a sus socios comerciales para acelerar el despliegue de una pasarela nacional de pagos.
- Un procesador de pagos importante puede usar el software para modernizar su oferta actual y lograr menores costos de transacción sin grandes inversiones en I+D.
- Una startup fintech puede usar el código para entender en la práctica cómo cumplir con APIs de pago interoperables.
- Un banco puede usar el código para modificar sus sistemas internos de modo que interoperen fácilmente con otros proveedores de pagos.

## 4. ¿Por qué existe? 

Los proveedores que intentan llegar a mercados en desarrollo con servicios financieros digitales innovadores y de bajo costo tienen que construirlo todo por su cuenta. Esto eleva los costos y aísla unos servicios de otros. Mojaloop puede usarse como base para ayudar a construir plataformas interoperables, reduciendo los costos de los proveedores y permitiéndoles integrar sus servicios con otros del mercado.

## 5. ¿Quién está detrás? 

Mojaloop se construyó en colaboración con un grupo de empresas líderes en tecnología y fintech: [Ripple](https://github.com/ripple), [Dwolla](https://github.com/dwolla), [Software Group](http://www.softwaregroup-bg.com/), [ModusBox](http://www.modusbox.com/) y [Crosslake Technologies](http://www.crosslaketech.com/). Mojaloop fue creado por Mojaloop de la Gates Foundation, cuyo objetivo es nivelar el terreno económico atrayendo experiencia y recursos para construir modelos de pago inclusivos en beneficio de las personas más pobres del mundo. Es de acceso público como software de código abierto bajo la [Licencia Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0).

## 6. ¿En qué plataformas funciona Mojaloop? 

La plataforma Mojaloop se desarrolló para entornos modernos de computación en la nube. Métodos de código abierto y plataformas de uso extendido, como Node.js, constituyen la capa base de Mojaloop. Los microservicios se empaquetan en Docker y pueden desplegarse en hardware local o en entornos de computación en la nube como Amazon Web Services o Azure.

## 7. ¿Es realmente de código abierto? 

Sí, es realmente de código abierto. Todos los módulos centrales, la documentación y los documentos técnicos están disponibles bajo una [Licencia Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0). Mojaloop se apoya en software de código abierto de uso común, incluidos node.js, MuleCE, Java y PostgreSQL. Mojaloop también utiliza el [Interledger Protocol](https://github.com/interledger) para coordinar transferencias de dinero seguras. Las licencias de todas estas plataformas y de sus dependencias importadas permiten muchos usos viables del software.

## 8. ¿Cómo puedo contribuir a Mojaloop?

Puede contribuir ayudándonos a crear nuevas funcionalidades de nuestra hoja de ruta o ayudándonos a mejorar la plataforma. Para consultar la hoja de ruta, vaya a la [Hoja de ruta de Mojaloop](../mojaloop-roadmap.md). Recomendamos empezar por la guía de incorporación y el problema de ejemplo. El equipo los diseñó para presentar las ideas centrales de la plataforma y del software, los métodos de compilación y nuestro proceso de seguimiento.
    
## 9. ¿Usar Mojaloop para realizar pagos con criptomonedas?

No con la Especificación actual ni con esta plataforma. Actualmente esto se limita a las monedas listadas en la norma ISO 4217. Dado que la especificación y la plataforma tratan sobre transferencias digitales, debería ser posible investigar un caso de uso para este posible requisito. Como alternativa, supongo que un FSP puede ofrecer esa conversión (como muchos ya hacen, de cripto a una de las monedas listadas).

## 10. ¿Cómo se accede al código fuente de Mojaloop?

Estos son algunos recursos para empezar:
1. Documentación: https://github.com/mojaloop/documentation.
2. Consulte los repositorios que tienen “CORE COMPONENT (Mojaloop)” en la descripción: esos son los componentes centrales. Los repositorios “CORE RELATED (Mojaloop)” son los necesarios para dar soporte a la implementación o el despliegue actual del Mojaloop Switch.
3. Como nota general, para obtener el código más reciente utilice por ahora la rama ‘develop’.
4. Arquitectura actual: https://github.com/mojaloop/docs/tree/master/Diagrams/ArchitectureDiagrams. Tenga en cuenta que actualmente se está migrando a https://github.com/mojaloop/documents.
5. Puede consultar esto para la arquitectura de despliegue actual y la información de despliegue: https://github.com/mojaloop/documentation/tree/master/deployment-guide.

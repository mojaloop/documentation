---
syncRef: 10fb6286c2fca63aad808dfdf10fc034e3dd84d3
---

# Pragmatic REST

## Pragmatic REST para el proyecto Mojaloop

Con la aparición de la estrategia de API como herramienta de escalado para los negocios de servicios de Internet, el foco de la tecnología de interconexión se ha desplazado. Partiendo de los principios que permitieron que la Web se formara y escalara, REST \(Representational State Transfer\) se ha convertido en la preferencia de diseño para las API de servicios de Internet. Pero, aunque los principios REST, propuestos en la tesis de Roy Fielding que los definió, tienen valor académico como base de investigación, un diseño REST puro no es hoy práctico para la mayoría de las aplicaciones. Abogamos por una especie de Pragmatic REST, un patrón de diseño que adopta los componentes beneficiosos del diseño RESTful sin exigir una adhesión estricta a la pureza académica.

### El modelo de madurez de Richardson

Martin Fowler ha hecho referencia a un modelo estructurado de adopción de RESTful desarrollado por Leonard Richardson y [explicado](http://www.crummy.com/writing/speaking/2008-QCon/act3.html) en una charla de QCon. Fowler lo denomina el modelo de madurez de Richardson del diseño RESTful.

<!-- ![](./assets/diagrams/rest/glory-of-rest.png) -->

Martin Fowler, citando [Rest in Practice](https://www.amazon.com/gp/product/0596805829?ie=UTF8&tag=martinfowlerc-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0596805829),2 resume el origen del diseño RESTful:

> usar servicios web Restful para resolver muchos de los problemas de integración a los que se enfrentan las empresas. En su núcleo . . . está la noción de que la web es una prueba de la existencia de un sistema distribuido masivamente escalable que funciona realmente bien, y podemos tomar ideas de ahí para construir sistemas integrados con más facilidad.

Un enfoque pragmático del diseño RESTful usa las mejores partes del marco conceptual de Fielding para permitir que los desarrolladores e integradores entiendan lo antes posible qué pueden hacer con la API y sin escribir código superfluo.

En su nivel más fundamental, un diseño RESTful se centra en los recursos y usa verbos HTTP. En su nivel más avanzado, un diseño que sigue el REST académico puro utiliza el principio HATEOAS implementando controles de hipermedia. Abogamos por un diseño RESTful de nivel 2 para Mojaloop.

### ¿Por qué no controles de hipermedia?

Aunque HATEOAS es un principio fascinante, defiende que un servidor debería responder a cada acción del cliente con una lista de todas las acciones posibles que pueden llevar al cliente a su siguiente estado de aplicación. Y, además, los clientes _no deben_ depender de información fuera de banda \(como una especificación escrita de la API\) para saber qué acciones se pueden ejecutar sobre qué recursos ni sobre el formato de los URI.

Es esta última proscripción la que no supera la prueba de Pragmatic REST: aunque HATEOAS es un enfoque teórico interesante para limitar el acoplamiento, no se aplica con facilidad a Mojaloop \(ni a ningún otro diseño de API por contrato\). Si tenemos en cuenta nuestro público para las API de interconexión, encontramos un grupo de entidades comerciales que operarán bajo un conjunto de reglas del esquema de pagos muy específicas. Las interacciones entre los participantes, y entre el participante y el hub de servicio central, estarán muy especificadas para asignar un riesgo comercial aceptable que pueda tarificarse a un costo muy bajo para los usuarios finales. Esto exige una previsibilidad _ex-ante_ de la API que es un anatema para el principio HATEOAS definido por Fielding.

### Principios RESTful pragmáticos

#### Los URI definen recursos

Un patrón de URI bien diseñado hace que una API sea fácil de consumir, descubrir y ampliar, igual que ocurre con una API cuidadosamente diseñada en un lenguaje de programación tradicional. El REST puro desdeña este principio en favor de HATEOAS. Pero el REST pragmático sigue un patrón normal para las definiciones de URI con el fin de mejorar la comprensión humana, incluso si se emplean los principios HATEOAS para el descubrimiento.

Las rutas de URI que se refieren a una colección de objetos deberían consistir en un sustantivo en plural, p. ej. /customers, para referirse a un conjunto de clientes. Cuando una colección solo puede tener una instancia, debería usarse el sustantivo en singular para evitar confusiones. P. ej. GET /transfers/:id/fulfillment es correcto, ya que solo hay un objeto fulfillment por cada transferencia identificada.

Las rutas de URI que se refieren a un único objeto deberían consistir en un sustantivo en plural \(que representa la colección\), seguido de un identificador único predefinido. P. ej., /customers/123456 para referirse al cliente concreto con el número 123456. El identificador debe ser único dentro de la colección que lo contiene y persistir durante toda la vida del objeto dentro de esa colección. Los ID no deben ser valores ordinales; la recuperación ordinal de objetos de una colección es posible usando parámetros de consulta sobre el URI de la colección.

Las rutas de URI pueden tener un prefijo que identifique el entorno, la versión u otro contexto del recurso. Nada debería seguir a la ruta identificadora salvo colecciones y referencias a objetos.

Los identificadores de la ruta del URI y de los segmentos de consulta deberían elegirse del conjunto de caracteres romanos, \[0-9A-Za-z\]. Use _camelCase_ para definir los elementos de la ruta del URI. No use snake\_case.

Para evitar dudas, "\_" \(guion bajo\) y "-" \(guion\) no deberían usarse en los identificadores de la ruta del URI ni de los segmentos de consulta.

Esto probablemente parezca un poco estrecho de miras. El propósito es encontrar un formato de URI bien definido que sea coherente con la práctica extendida, fácil de definir, predecible y que se corresponda con los entornos y convenciones nativos. No va a satisfacer a todo el mundo. Este es el razonamiento detrás de esta restricción:

CapitalCase y camelCase son el estándar de facto para NodeJS y JavaScript y son una restricción habitual en la definición de URI: los segmentos de la ruta del URI se corresponden a menudo con recursos internos de JS, así que ajustarse a las convenciones de nomenclatura de JS tiene sentido.

Los nombres de campo en JSON y SQL también deberían seguir esta convención, ya que a menudo se corresponden automáticamente con el espacio de nombres de variables y se pueden referenciar en los URI como identificadores de ruta o de segmento de consulta.

También deberíamos evitar el uso de "$" salvo que lo exija una biblioteca \(p. ej. JQuery\). IBM JCL ha fallecido; que descanse en paz. Hay mejores herramientas de control de ámbito para separar espacios de nombres que introducir símbolos no romanos.

Deberíamos evitar "-" \(guion\) en los nombres de segmentos de ruta y de parámetros de consulta, ya que no se corresponde con nombres de variables, ni con identificadores de nombres de campo de SQL o JSON.

Los caracteres de guion bajo deben escaparse en el código markdown anteponiendo a cada uno un carácter "\".

Se ha señalado que snake\_case es algo más fácil de leer que camelCase en los nombres de variables, pero en realidad no mejora la legibilidad de los URI, ya que interfiere visualmente con los delimitadores de ruta y de segmento de consulta, lo que dificulta analizarlos visualmente. Y cuando los URI se subrayan en una presentación, los guiones bajos se vuelven ilegibles.

#### Parámetros de URI

Use un conjunto estándar y predecible de parámetros opcionales de forma coherente.

Debería usarse un conjunto estándar de parámetros de consulta para las colecciones, con el fin de que quien llama controle qué parte de la colección ve. P. ej. "count" para determinar cuántos objetos devolver, "start" para determinar dónde empezar a contar en el conjunto de resultados y "q" como consulta de búsqueda genérica de formato libre. Definiremos el conjunto estándar de parámetros sobre la marcha y los aplicaremos de forma coherente.

#### Verbos

Los objetos singulares deberían admitir GET para lectura, PUT para el reemplazo completo \(o la creación cuando el cliente especifica la clave primaria y esta es persistente, p. ej. el PAN de una tarjeta de pago\) y DELETE para el borrado.

Las colecciones deberían admitir GET para leer la colección entera o una parte de ella, y POST para agregar un objeto nuevo a la colección.

Los objetos singulares pueden admitir POST como forma de cambiar su estado de maneras especificadas. Publicar un documento JSON en el URI de un objeto singular puede permitir que se actualicen valores de campo seleccionados o desencadenar un cambio de estado o una acción sin reemplazar el objeto entero.

GET debe implementarse de manera _nulipotente_, es decir, GET nunca causa efectos secundarios y nunca modifica el estado del sistema visible para el cliente \(más allá de registrar eventos o actualizar la instrumentación, p. ej.\).

PUT y DELETE deben implementarse de manera _idempotente_, es decir, los cambios se aplican de forma coherente a los datos del sistema de un modo que depende únicamente del estado del recurso y de las entradas, y de nada más. La acción no tiene ningún efecto adicional si se ejecuta más de una vez con los mismos parámetros de entrada y no depende del orden de otras operaciones sobre una colección que la contenga ni sobre otros recursos que estén en la colección. Por ejemplo, eliminar un recurso de una colección puede considerarse una operación idempotente sobre la colección. Usar PUT para reemplazar \(o crear\) por completo un recurso identificado de forma única cuando el cliente conoce plenamente el URI también es idempotente. Esto implica que el sistema puede reordenar operaciones para mejorar la eficiencia, y que el cliente no necesita saber si un recurso existe antes de intentar reemplazarlo.

POST y PATCH3 no son operaciones idempotentes. POST se usa para crear recursos nuevos cuando el identificador del recurso lo asigna el servidor o cuando el URI de destino implica un único recurso interno identificado \(p. ej. POST /transfers, pero PUT /transfers/:id/fulfillment\).

#### Formato de datos

Preferimos los formatos de datos relacionados con [JSON](http://json.org/)4 frente a XML. En algunos casos, los formatos de datos serán binarios o XML, según definan estándares preexistentes, y se especificarán con precisión. Los formatos binarios deberían tener una sintaxis formal para evitar traducciones de representación ambiguas \(p. ej. traducciones de conjuntos de caracteres, representaciones big-endian o little-endian de valores numéricos, etc.\).

Los valores de fecha y hora que se usen en las API deberían cumplir el estándar ISO 8601, perfilado además por la nota del w3c sobre formatos de fecha y hora.5 Esta nota del w3c debería llevar a reducir la complejidad y el margen de error de los componentes de comunicación que deben intercambiar fechas y horas tangibles. Habrá casos en los que usemos un formato de fecha u hora no ISO por exigencia de un estándar externo, p. ej. las fechas de caducidad de ISO 7813.

Los formatos XML estándar existentes deberían tener un esquema XSD para el subconjunto aceptable del perfil que se use dentro del proyecto. Para formatos de datos especialmente complejos, podemos usar un traductor de perfiles de formato común para pasar de nuestro subconjunto del formato estándar en el proyecto al formato de transmisión que usa un protocolo estandarizado \(p. ej.\). Esto limitará el acoplamiento a formatos complejos de una manera más mantenible.

Cuando especifiquemos la acción PATCH para un recurso, usaremos un formato de documento de parche coherente \(p. ej. [JSON Patch](http://jsonpatch.com/)6\).

#### Códigos de retorno

Use los códigos de retorno de HTTP de forma coherente y conforme a sus definiciones estándar. Los códigos estándar están definidos en el RFC 2616.7

#### Formato de error legible por máquina

La API debería proporcionar un resultado de error legible por máquina en un formato JSON bien definido. {Pendiente de determinar si usar un sobre de respuesta y cómo dar formato a los errores, los fallos y los sobres de éxito. El diseño RESTful se apoya en las cabeceras para transportar los errores definidos por el protocolo, y la información de depuración también se puede transportar en las cabeceras. Deberíamos tener claro por qué usamos un sobre y cómo esto respalda la comunicación normal de producción entre cliente y servidor.

#### Versionado

Los URI de la API deberían incluir un identificador de versión con el formato v_M_ como elemento inicial de la ruta \(donde _"M"_ es el componente Mayor del número de versión de varias partes\). La API y su elemento identificador de versión deben ajustarse a la especificación 2.0 de [versionado semántico](http://semver.org/)8 para el versionado de la API.

Un cliente debe especificar el número de versión Mayor en cada solicitud. No es posible que un cliente exprese un requisito de una versión menor concreta.

El número de versión completo de la API se especifica en la cabecera de respuesta \(pendiente de determinar\) para todas las respuestas correctas y de error.

Aunque un contrato de versión de la API estará influido por los niveles Mayor, menor _y_ de parche, solo el número de versión Mayor es un elemento vinculante de la API en producción, es decir, un cliente de producción no puede solicitar una versión menor o un nivel de parche concretos y un servidor de producción no aceptará una solicitud de URI que especifique estos elementos adicionales.

Sin embargo, en entornos de preproducción se prevé que alguna combinación de sufijos de versión menor, de parche, de prelanzamiento y de metadatos sí se admita en las solicitudes del cliente \(según se define en _semver_ \[3\]\) y _pueda_ expresarse en los URI de _preproducción_ para ayudar en escenarios de desarrollo e integración.

### Puede que necesitemos darle un descanso a REST

A medida que diseñemos las API de interconexión entre componentes y entre sistemas participantes, es posible que encontremos requisitos de API que no encajen exactamente con el patrón Pragmatic REST definido aquí. Los evaluaremos caso por caso y tomaremos la mejor decisión para respaldar los objetivos del proyecto.

### Requisitos no funcionales

A medida que desarrollemos las API, tomaremos decisiones coherentes sobre los requisitos no funcionales para reforzar los objetivos del proyecto.

1: [http://martinfowler.com/articles/richardsonMaturityModel.html](Richardson%20Maturity%20Model), consultado el 18 de agosto de 2016.

2: [https://www.amazon.com/gp/product/0596805829](https://www.amazon.com/gp/product/0596805829?ie=UTF8&tag=martinfowlerc-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0596805829), consultado el 18 de agosto de 2016.

3: RFC 5789, _PATCH Method for HTTP_, [https://tools.ietf.org/html/rfc5789](https://tools.ietf.org/html/rfc5789), consultado el 18 de agosto de 2016.

4: _Introducing JSON_, [http://json.org/](http://json.org/), consultado el 18 de agosto de 2016.

5: [http://www.w3.org/TR/1998/NOTE-datetime-19980827](http://www.w3.org/TR/1998/NOTE-datetime-19980827), consultado el 22 de agosto de 2016.

6: _JSON Patch_, [http://jsonpatch.com/](http://jsonpatch.com/), consultado el 18 de agosto de 2016.

7: [https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)

8: _Semantic Versioning 2.0.0_, [http://semver.org/](http://semver.org/), consultado el 18 de agosto de 2016.

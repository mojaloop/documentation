---
syncRef: af8ece4296e987223de16f4e0311366cb5e8d623
---

# Divulgar y recibir información sobre vulnerabilidades de seguridad

La Mojaloop Foundation y la comunidad se toman muy en serio la seguridad del software de Mojaloop y operan varios
procesos destinados a asegurar que Mojaloop sea una plataforma segura para hacer negocios. Consulte
nuestra [documentación sobre la arquitectura de ciberseguridad](../tools/cybersecurity.md) para obtener más información.

La Mojaloop Foundation opera
un proceso de ["divulgación coordinada de vulnerabilidades"](https://github.com/ossf/oss-vulnerability-guide/blob/main/finder-guide.md#what-is-coordinated-vulnerability-disclosure)
que es un modelo por el cual una vulnerabilidad o un problema descubierto se divulga públicamente solo después de que las partes responsables y
afectadas hayan dispuesto de tiempo suficiente para parchear o subsanar el problema. Al operar este modelo, la Mojaloop
Foundation y la comunidad buscan minimizar el posible impacto de esos problemas sobre nuestros adoptantes.

## Política de divulgación coordinada de vulnerabilidades de la Mojaloop Foundation

Las siguientes secciones definen los requisitos y las expectativas de las distintas partes implicadas en el descubrimiento y la
subsanación de vulnerabilidades de seguridad en el software de Mojaloop. Se espera que todos los miembros de la comunidad de Mojaloop
cumplan estas políticas con independencia del papel que desempeñen en cada situación. Participar en la
comunidad de Mojaloop implica la aceptación de estas políticas y su cumplimiento.

### Terminología

Las siguientes definiciones se aplican dentro de la Política de divulgación coordinada de vulnerabilidades de la Mojaloop Foundation:

#### Términos de la RFC 2119

Las palabras clave "DEBE", "NO DEBE", "REQUERIDO", "DEBE", "NO DEBE", "DEBERÍA", "NO DEBERÍA", "RECOMENDADO",  "PUEDE" y "
OPCIONAL" en este documento deben interpretarse como se describe en la RFC 2119.

#### Términos de ISO y CERT

Los términos "Researcher" o "Reporter" en este documento pretenden ser coherentes con los términos "Finder" o "
Reporter" tal como se usan en la ISO/IEC 29147:2014(E) y en la CERT® Guide to Coordinated Vulnerability Disclosure.

### Política de los Reporters

Los Reporters DEBEN cumplir las siguientes directrices.

#### General

* Los Reporters DEBEN cumplir todas las leyes locales e internacionales aplicables en relación con las actividades de investigación de seguridad
  u otra participación en este programa de divulgación de vulnerabilidades.

* Los Reporters DEBERÍAN hacer un esfuerzo de buena fe para notificar y trabajar directamente con los proveedores o prestadores de servicios afectados
  antes de divulgar públicamente los informes de vulnerabilidad.

#### Alcance de las pruebas autorizadas

* Los Reporters PUEDEN probar el software de código abierto de Mojaloop para detectar una vulnerabilidad con el único fin de proporcionar a la
  Mojaloop Foundation información sobre esa vulnerabilidad.

* Los Reporters DEBERÍAN probar únicamente contra cuentas de prueba que sean del propio Reporter o con permiso explícito del titular
  de la cuenta.

* Los Reporters DEBEN evitar causar daños a los sistemas de información y a las operaciones de la Mojaloop Foundation, sus asociados y
  los usuarios del software de código abierto de Mojaloop.

* Los Reporters DEBEN hacer todo lo posible por evitar violaciones de la privacidad, la degradación de la experiencia de usuario, la interrupción de sistemas
  de producción y la destrucción o manipulación de datos.

* Los Reporters DEBEN detener las pruebas una vez que estas hayan establecido que existe una vulnerabilidad o que se han encontrado datos
  sensibles. Los datos sensibles incluyen información de identificación personal, información financiera (p. ej. números
  de cuenta), información propietaria o secretos comerciales.

* Los Reporters NO DEBEN probar ningún software ni servicio que no esté expresamente contenido en los repositorios de Github del software de código
  abierto de Mojaloop, incluidos los servicios conectados.

* Los Reporters NO DEBEN explotar ninguna vulnerabilidad más allá de la cantidad mínima de pruebas necesaria para demostrar que la
  vulnerabilidad existe o para identificar un indicador relacionado con esa vulnerabilidad.

* Los Reporters NO DEBEN acceder intencionadamente al contenido de comunicaciones, datos o información que transiten o estén almacenados
  en sistemas de información pertenecientes a la Mojaloop Foundation, sus asociados o los usuarios del software de código abierto de
  Mojaloop, salvo en la medida en que la información esté directamente relacionada con una vulnerabilidad y el acceso sea
  necesario para demostrar que la vulnerabilidad existe.

* Los Reporters NO DEBEN exfiltrar datos bajo ninguna circunstancia.

* Los Reporters NO DEBEN comprometer intencionadamente la privacidad o la seguridad del personal de la Mojaloop Foundation, sus clientes,
  el público general, los usuarios del software de código abierto de Mojaloop o cualquier tercero legítimo.

* Los Reporters NO DEBEN usar ningún exploit para comprometer, alterar o exfiltrar datos

* Los Reporters NO DEBERÍAN establecer acceso por línea de comandos ni persistencia

* Los Reporters NO DEBEN explotar ninguna vulnerabilidad encontrada para pivotar a otros sistemas.

* Los Reporters NO DEBEN comprometer intencionadamente la propiedad intelectual ni otros intereses comerciales o financieros de
  ningún miembro del personal o entidad de la Mojaloop Foundation, sus clientes, el público general, los usuarios del software de código abierto de
  Mojaloop o cualquier tercero legítimo.

* Los Reporters NO DEBEN provocar la denegación de ningún servicio legítimo en el transcurso de sus pruebas.

* Los Reporters NO DEBEN realizar pruebas de acceso físico (p. ej. acceso a oficinas, puertas abiertas, tailgating u otra forma de allanamiento).

* Los Reporters NO DEBEN llevar a cabo ingeniería social de ninguna forma sobre el personal de la Mojaloop Foundation, sus contratistas,
  asociados o usuarios del software de código abierto de Mojaloop, su personal, contratistas o clientes.

* Los Reporters DEBERÍAN contactar con la Mojaloop Foundation por correo en [security@mojaloop.io](mailto:security@mojaloop.io) si en
  algún momento no tienen claro si continuar con las pruebas.

#### Coordinación con la Mojaloop Foundation

* Los Reporters DEBERÍAN enviar los informes de vulnerabilidad a la Mojaloop Foundation por correo seguro (cifrado)
  a [security@mojaloop.io](mailto:security@mojaloop.io).

* Los Reporters DEBERÍAN enviar informes de alta calidad.

* Los Reporters DEBERÍAN incluir suficientes detalles descriptivos para permitir que la Mojaloop Foundation o los proveedores
  afectados reproduzcan con exactitud el comportamiento vulnerable.

* Los Reporters NO DEBERÍAN informar de volcados de fallos sin analizar ni de salidas de fuzzer, salvo que vayan acompañados de una
  explicación suficientemente detallada de cómo representan una vulnerabilidad de seguridad.

* Los Reporters DEBERÍAN informar de otras vulnerabilidades encontradas de forma incidental durante sus pruebas dentro del alcance, aunque esas vulnerabilidades
  se considerarían fuera del alcance por otros motivos. Por ejemplo, al probar un sistema dentro del alcance, el reporter descubre que está
  exponiendo datos de un sistema fuera del alcance. Estas siguen siendo vulnerabilidades notificables.

* Los Reporters DEBEN mantener confidencial cualquier información sobre las vulnerabilidades descubiertas durante 90 días después de haber notificado a
  la Mojaloop Foundation. No obstante, esta expectativa no impide que los Reporters coordinen simultáneamente
  el informe de vulnerabilidad con otras partes afectadas (proveedores, prestadores de servicios, coordinadores, etc.)

* Los Reporters PUEDEN incluir un exploit de prueba de concepto si está disponible.

* Los Reporters PUEDEN solicitar que su información de contacto no se facilite a ninguno de los proveedores afectados.

* Los Reporters PUEDEN solicitar no aparecer nombrados en los agradecimientos de las divulgaciones públicas de la Mojaloop Foundation.

* Los Reporters NO DEBEN enviar un gran volumen de informes de baja calidad.

* Los Reporters NO DEBEN exigir que la Mojaloop Foundation establezca una relación de cliente, un acuerdo de confidencialidad
  (NDA) o cualquier otra obligación contractual o financiera como condición para recibir o coordinar informes de
  vulnerabilidad.

* Los Reporters NO DEBEN exigir una compensación a cambio de notificar información de vulnerabilidad fuera de un
  programa explícito de recompensas por errores.

#### Coordinación con los proveedores

* En caso de que el Reporter encuentre una vulnerabilidad en el software de código abierto de la Mojaloop Foundation derivada de una
  vulnerabilidad en un producto o servicio de disponibilidad general, el Reporter PUEDE notificar la vulnerabilidad a los proveedores
  afectados, los prestadores de servicios o los servicios de coordinación de vulnerabilidades de terceros, para que el producto o
  servicio pueda corregirse.

#### Coordinación con terceros

* Los Reporters PUEDEN recurrir a los servicios de un servicio de coordinación de terceros (p. ej. CERT/CC, DHS CISA) para ayudar a
  resolver cualquier conflicto que no pueda resolverse entre el Reporter y la Mojaloop Foundation.

* Los Reporters NO DEBERÍAN divulgar ningún detalle de ninguna vulnerabilidad existente del software de código abierto de la Mojaloop Foundation, ni ningún
  indicador de vulnerabilidad, a ninguna parte que no lo conociera ya en el momento en que se envía el informe a la Mojaloop
  Foundation.

#### Divulgación pública

* Los Reporters PUEDEN divulgar al público la existencia previa de vulnerabilidades ya corregidas por la Mojaloop Foundation,
  incluidos potencialmente los detalles de la vulnerabilidad, los indicadores de vulnerabilidad o la naturaleza (pero no el contenido) de la
  información que la vulnerabilidad dejó accesible.

* Los Reporters que decidan divulgar al público DEBERÍAN hacerlo en consulta con la Mojaloop Foundation.

* Los Reporters NO DEBEN divulgar ningún dato propietario incidental revelado durante las pruebas ni el contenido de la información
  que la vulnerabilidad dejó accesible a ninguna parte que no lo conociera ya en el momento en que se envía el informe a
  la Mojaloop Foundation.

### Política de los Receivers

La Mojaloop Foundation DEBE actuar de buena fe con los Reporters que descubran, prueben y notifiquen vulnerabilidades o
indicadores de vulnerabilidad de acuerdo con estas directrices.

#### General

* La Mojaloop Foundation PUEDE modificar los términos de esta política o darla por terminada en cualquier momento.

* La Mojaloop Foundation DEBE usar la información notificada a este programa únicamente con fines defensivos: para mitigar o
  subsanar vulnerabilidades en el software de código abierto de Mojaloop, en las redes y aplicaciones de la Mojaloop Foundation, en las
  aplicaciones de nuestros proveedores y en las de los usuarios del software de código abierto de Mojaloop.

#### Tratamiento de los casos

* La Mojaloop Foundation PUEDE, a nuestra discreción, negarse a coordinar o publicar un informe de vulnerabilidad. Esta decisión
  se basa por lo general en el alcance y la gravedad de la vulnerabilidad y en nuestra capacidad de aportar valor al proceso de coordinación y
  divulgación.

* En caso de que la Mojaloop Foundation se niegue a coordinar un informe de vulnerabilidad, el Reporter PUEDE proceder a
  coordinarse con cualquier otro proveedor afectado. Además, el Reporter PUEDE proceder con la divulgación pública a su
  discreción.

* La Mojaloop Foundation DEBE investigar todas las vulnerabilidades notificadas y esforzarse por asegurar que se den los pasos apropiados
  para mitigar el riesgo y subsanar las vulnerabilidades notificadas.

* La Mojaloop Foundation DEBE, en la medida de nuestras posibilidades, validar la existencia de la vulnerabilidad

* La Mojaloop Foundation DEBE determinar un plazo apropiado para el desarrollo y el despliegue de la mitigación de las
  vulnerabilidades notificadas en los sistemas que controla.

#### Coordinación con los reporters

* La Mojaloop Foundation DEBE acusar recibo de los informes de vulnerabilidad por correo en un plazo de 7 días hábiles.

* La Mojaloop Foundation PUEDE contactar con el Reporter para obtener más información.

* La Mojaloop Foundation DEBE informar al Reporter de los resultados de nuestra validación, según corresponda, y facilitar en consecuencia
  actualizaciones de estado mientras la subsanación de la vulnerabilidad está en marcha.

* La Mojaloop Foundation DEBE incluir el crédito al reporter en cualquier informe de vulnerabilidad publicado, salvo que el reporter
  solicite lo contrario.

* En caso de que la Mojaloop Foundation decida divulgar públicamente la vulnerabilidad notificada, la Mojaloop
  Foundation DEBE reconocer su contribución a mejorar nuestra seguridad si es la primera persona en notificar una vulnerabilidad
  única y su informe desencadena un cambio de código o de configuración.

* La Mojaloop Foundation PUEDE remitir el nombre y la información de contacto del Reporter a los proveedores afectados, salvo que el
  reporter solicite lo contrario.

* La Mojaloop Foundation DEBE remitir el nombre y la información de contacto del reporter a los proveedores afectados, salvo que el
  reporter solicite lo contrario.

* La Mojaloop Foundation DEBE informar al reporter de los cambios significativos en el estado de cualquier vulnerabilidad que haya
  notificado, en la medida de lo posible sin revelar información que se nos haya facilitado de forma confidencial.

* La Mojaloop Foundation PUEDE ajustar su plazo de publicación para acomodar las limitaciones del reporter si ese calendario es
  por lo demás compatible con esta política. En la mayoría de los casos cabría esperar que ese ajuste represente un retraso más que
  una aceleración del calendario de publicación. Algunos ejemplos son retrasar la publicación para hacerla coincidir con presentaciones en conferencias.

* La Mojaloop Foundation NO DEBE exigir a los Reporters que establezcan una relación de cliente, un acuerdo de confidencialidad
  (NDA) o cualquier otra obligación contractual o financiera como condición para recibir o coordinar informes de
  vulnerabilidad.

#### Coordinación con los proveedores

* En caso de que la Mojaloop Foundation determine que la vulnerabilidad notificada deriva de una vulnerabilidad en un
  producto o servicio de disponibilidad general, la Mojaloop Foundation PUEDE notificar la vulnerabilidad a los proveedores
  afectados, los prestadores de servicios o los servicios de coordinación de vulnerabilidades de terceros, para que el producto o
  servicio pueda corregirse.

* La Mojaloop Foundation DEBE hacer un esfuerzo de buena fe para informar a los proveedores de las vulnerabilidades notificadas antes de la divulgación
  pública.

* La Mojaloop Foundation DEBE remitir los informes de vulnerabilidad a los proveedores afectados tan pronto como sea posible después de
  recibir el informe.

* La Mojaloop Foundation DEBE poner en conocimiento de los proveedores afectados nuestros planes de publicación y negociar calendarios de publicación
  alternativos con los proveedores afectados cuando sea necesario.

* La Mojaloop Foundation DEBE dar al proveedor la oportunidad de incluir una declaración del proveedor dentro de nuestro documento de divulgación
  pública.

* La Mojaloop Foundation NO DEBE retener información facilitada por un proveedor simplemente porque no esté de acuerdo con nuestra valoración
  del problema.

* La Mojaloop Foundation DEBE notificar a los proveedores afectados cualquier plan de divulgación pública.

* La Mojaloop Foundation NO DEBE revelar información facilitada de forma confidencial por ningún proveedor.

* La Mojaloop Foundation DEBE actuar conforme a las expectativas de los Reporters establecidas en esta política cuando
  actúe como Reporter ante otras organizaciones (proveedores, coordinadores, etc.).

#### Coordinación con terceros

* La Mojaloop Foundation PUEDE recurrir a los servicios de un servicio de coordinación de terceros (p. ej. CERT/CC, DHS CISA) para
  ayudar a resolver cualquier conflicto que no pueda resolverse entre el Reporter y la Mojaloop Foundation.

* La Mojaloop Foundation PUEDE, a nuestra discreción, facilitar la información de la vulnerabilidad notificada a cualquiera que pueda
  contribuir a la solución y con quien tengamos una relación de confianza, incluidos proveedores (a menudo incluidos proveedores
  cuyos productos no son vulnerables), prestadores de servicios, expertos de la comunidad, patrocinadores y sitios que forman parte de una
  infraestructura crítica nacional, si creemos que esos sitios están en riesgo.

#### Divulgación pública

* La Mojaloop Foundation DEBE determinar el tipo y el calendario de nuestra divulgación pública de la vulnerabilidad.

* La Mojaloop Foundation PUEDE divulgar al público las vulnerabilidades notificadas 7 días después del informe
  inicial, con independencia de la existencia o disponibilidad de parches o soluciones alternativas de los proveedores afectados.

* La Mojaloop Foundation PUEDE divulgar las vulnerabilidades al público antes o después de esos 7 días por circunstancias
  atenuantes, incluidas, entre otras, la explotación activa, las amenazas de naturaleza especialmente grave (o trivial)
  o las situaciones que requieren cambios en un estándar establecido.

* La Mojaloop Foundation PUEDE consultar con el Reporter y con los proveedores afectados para determinar el momento y los detalles
  apropiados de la divulgación pública.

* La Mojaloop Foundation DEBE equilibrar la necesidad del público de estar informado de las vulnerabilidades de seguridad con la necesidad de los proveedores
  y de los usuarios del software de código abierto de Mojaloop de disponer de tiempo para responder con eficacia.

* La determinación final de un calendario de publicación por parte de la Mojaloop Foundation DEBE basarse en el mejor interés de la
  comunidad en su conjunto.

* La Mojaloop Foundation DEBE publicar las divulgaciones públicas por uno o varios de estos medios: correo, slack o el sitio web de Mojaloop
  Community Central.

* La Mojaloop Foundation PUEDE divulgar al público la existencia previa de vulnerabilidades ya corregidas por la
  Mojaloop Foundation, incluidos potencialmente los detalles de la vulnerabilidad, los indicadores de vulnerabilidad o la naturaleza (
  pero no el contenido) de la información que la vulnerabilidad dejó accesible.

* La Mojaloop Foundation DEBE tomar nuestras decisiones de divulgación en función de factores pertinentes como, entre otros:
  si la vulnerabilidad ya se ha divulgado públicamente, la gravedad de la vulnerabilidad, el posible impacto en
  infraestructuras críticas, la posible amenaza para la salud y la seguridad públicas, las mitigaciones inmediatas disponibles, la capacidad de respuesta del proveedor
  y la viabilidad de crear una actualización o un parche, y la estimación del proveedor del tiempo que necesitan los clientes para
  obtener, probar y aplicar el parche. La explotación activa, las amenazas de naturaleza especialmente grave o las situaciones que
  requieren cambios en un estándar establecido pueden dar lugar a una divulgación anterior o posterior.

* La Mojaloop Foundation PUEDE divulgar las vulnerabilidades de un producto 30 días después del contacto inicial, con independencia de
  la existencia o disponibilidad de parches o soluciones alternativas de los proveedores afectados, en los casos en que un producto se ve afectado y
  el proveedor no responde o no establece un plazo razonable para la subsanación.

---
i18n_source_sha: 4deec6f8db992d12849b2c63b4a9ed53d2661c47
---

**Reunión del flujo de trabajo transfronterizo**

10 y 11 de marzo (Londres/remoto)

**Próximos pasos para el PI:**

•  Propuesta sobre cómo el CNP consulta y aloja los servicios de oracle y los objetivos globales  - Adrian, Michael 

•  Identificadores compuestos, formas en que esto se recoge en el sistema o se expresa en las api - abierto

•  Qué información se recoge en el modelo de datos o en la lista de extensiones - Michael

•  Seguimiento con SWIFT para debatir los requisitos - Matt 

**Elementos abiertos:**

•  Finalizar los requisitos del CNP

•  Tiene que agregar la información y reunirla en una única solicitud, y tendrán que firmar por separado

•  Finalizar que el FXP tiene que gestionar los tipos de cambio, las liquidaciones y qué expira cuándo

•  Los CNP pueden ampliar esto y determinar reglas adicionales del esquema de pagos

•  El FXP gestiona los errores de redondeo

•  El FXP garantiza una tasa dada

•  ¿Cómo se incorpora al esquema a quienes no son de Mojaloop?

•  Cómo integramos Mojaloop y algún esquema de pagos de Mojaloop para ofrecer pagos PVT completos: grupo de trabajo con Michael, Adrian, Sybrin y otros según haga falta

•  Cómo gestionamos las solicitudes por motivos regulatorios

•  Investigar las correspondencias de identificadores (mapear las cuentas de pathfinder y las cuentas móviles a los ID únicos de los DFSP)

•  Investigar la certificación (hash y PKKI)


Notas detalladas de la reunión:
Día #1:
	- Respuesta a la cotización
	
		○ Cómo codificamos el SLA en la respuesta
	
		○ Pedir a un 2.º CNP que enrute
		
		○ En la API, hay que empaquetar cómo llevarlo hasta allí
		
		○ Como CMP en Mowali, si devuelvo una respuesta de cotización, el esquema de pagos tiene implicaciones 
		
		○ Seguir toda la ruta del pagador al beneficiario 
		
		○ Limitar la participación del CNP: tiene que ser el último salto
		
			§ ¿Cómo definir los requisitos de un CNP?
	
	- Formato de los mensajes
	
		○ Sintaxis http
		
		○ Se partió del esquema de pagos de Mojaloop 
		
			§ Avanzar hacia que el CNP gestione la conversión
		
		○ Versión de SWIFT
		
		○ Seguridad: TLS
		
		○ Cabecera y contenido cifrados en JWS
	
	- Sistema minorista
	
		○ Fuera de red: enviar remesa a alguien, hub
	
	- Modelo de datos
	
		○ Estructura: formas en que agregamos información nueva, rutas distintas, etc.
		
		○ Privacidad: visibilidad y seguridad, accesible solo a quienes pueden verlo
		
		○ Contenido del modelo de datos 
	
	- La transferencia se hace a través del switch (movimiento de dinero)
	
		○ En mowali se expresan los montos, pero la tasa es importante porque afecta a las liquidaciones 
	
		§ Flujo de datos: agregamos la tasa cuando devolvemos la cotización
		
		§ Agregado en la lista de extensiones, ¿debería formar parte del estándar?
	
		§ Monto de envío y de recepción (moneda distinta) 
	
	- Elemento de datos
		
		○ Tarifa de cada participante
		
		○ El DFSP pagador las suma 
		
		○ Elemento de tarifa de la transacción 
	
	- Propuesta

		○ Account Lookup Service
	
			§ Lista de FSP locales
		
		○ Switch: hay que mantener el estado y las solicitudes de búsqueda
	
			§ Al emisor debería parecerle una transferencia nacional
			
			§ Recoger la información y devolverla -
		
		○ CNP: haciendo supuestos para cumplir los requisitos
		
			§ ¿Hace falta ver la ruta?
			
			§ Recoger información distinta aguas abajo
			
			§ Los FSP emisores necesitan saber quién es el receptor
			
		○ El CNP tiene que agregar la información y reunirla en una única solicitud, y tendrán que firmar por separado 
			
			§ La condición y el fulfilment forman parte de una estructura de PKI
			
			§ Si hay más de un CNP, hay que asegurar que el DFSP beneficiario tenga certeza sobre el DFSP pagador: conexiones
			
			§ El CNP necesita saberlo todo, reporte regulatorio - 
			 
		○ ¿Necesitamos duplicar la estructura en una transferencia entre redes?
			
			§ Intentando impedir que se una un socio deshonesto
			
			§ Confiar en que el CNP cumpla sus SLA
		
		○ De Mojaloop a otro esquema de pagos: no tenemos control
		
			§ Exigir que confirmen la recepción 
			
			§ Cómo lo puedo saber 
			
			§ Cómo puedo saber que la persona del final recibió el dinero 
		
		○ Autoridad de firma externa para confirmar que se recibió el dinero
		
			§ Si su esquema de pagos quiere participar en lo transfronterizo, entonces todos los participantes tienen que estar firmados
			
			§ Clave pública: para unirse a una red de Mojaloop hay que emitir claves públicas
			
			§ Autoridad central de emisión de certificados 
			
			§ Hace falta una estructura de PKI implantada 
		
		○ ¿Cómo se incorpora al esquema a quienes no son de Mojaloop?
		
			§ Cómo integramos Mojaloop y algún esquema de pagos de Mojaloop para ofrecer pagos PVT completos: grupo de trabajo con Michael, Adrian, Sybrin y otros según haga falta
			
			§ Identificar a los participantes: FSP, DFSP, todos han firmado
			
			§ Partes: usuarios finales (Bob/Alice)
			
			§ Una única transacción (con varias transferencias)
			
			§ Nadie compromete sus fondos hasta que todos estén satisfechos 
			
			§ Cómo ampliar el esquema de pagos de Mojaloop y el que no es de Mojaloop 
		
		○ Certificación 
		
			§ Hash y PKKI
		
			§ Red oro y plata
	
			§ Socio nuevo: en producción en la red 
			
			§ El esquema de pagos decide los requisitos de la red 
			
			§ Certificado autofirmado 
		
		○ Liquidez 
		
			§ El FXP hace la gestión de posiciones
			
			§ Qué requisitos ponemos a un FXP
			
			§ El dinero móvil tiene menos flexibilidad 
			
			§ Reglas que se dieron entre esquemas de pagos 
		
		○ El FXP tiene que gestionar las liquidaciones, qué expira cuándo, etc.
		
			§ El FXP tiene que gestionar la escasa validez de la cotización 
			
			§ Permitir que el FXP rechace las solicitudes
	
		○ Cómo gestionamos las solicitudes por motivos regulatorios
		
			§ Hay un diccionario 
			
				□ ¿Es obligatorio compartir el KYC?
			
				□ Se pueden pedir muchas cosas: depende del participante 
				
				□ Hay que acordar el esquema de pagos de referencia

**Día #2:**

	- Datos del Switch
	
		○ Números de cuenta
		
		○ Lista negra, lista blanca (supervisión y bloqueo)
		
		○ Mantenerlo simple
		
		○ Hub 
		
		○ Servicio lateral para quienes puedan hacerlo
		
			§ Captura de datos móviles
			
			§ Side car
			
			§ Proceso digital 
			
			§ Servicios de valor agregado para el hub (servicio gestionado)
	
	- Switch: hay que mantener el estado y las solicitudes de búsqueda
	
	- El CNP puede ser un DFSP corriente
	
		○ Todos los DFSP admiten todos los casos de uso
		
		○ Participantes plenos (puede que solo presten un servicio de CNP o de FXP)
	
	- Definición y requisitos del FXP
	
		○ FXP: exigir tasas y tarifas como parte del servicio de cotización, hace falta una tasa estándar del sector
		
			§ Los CNP pueden ampliar esto y determinar reglas adicionales del esquema de pagos
		
		○ El FXP gestiona los errores de redondeo 
		
		○ Garantizar una tasa dada
		
		○ Gestionar la liquidación entre esquemas
		
		○ Tipos de cambio
		
		○ Debería permitir a quienes solo hacen FX
		
		○ Casos límite de fallo
		
			§ Detalles en los mensajes de error para encontrar los errores
		
		○ El FXP necesita devolver la información correcta 
		
			§ Cómo funciona el paso de mensajes
			
			§ Casos límite: compartir lo hecho hasta la fecha
			
			§ Jo tiene una API funcionando, identificada 
			
			§ Cambió la cotización (interceptó la cotización) -- 
			
			§ Lista de extensiones de KYC: se amplió la cotización para esto
			
			§ Las tasas están en la lista de extensiones (son la lista)
			
			§ ¿Dónde se aplica el FXP?
			
			§ Qué hacemos con las tarifas aguas abajo
			
				□  (el DFSP beneficiario ocupa el lugar de la agregación)
	
	- Cómo gestionar la resolución de identificadores 
	
		○ 2 tipos de identificadores
		
			§ Globales (se pasan al CNP), para obtener una respuesta
			
			§ Locales: se espera que los aporte el usuario
		
		○ En Mojaloop usamos los identificadores como proxy 
		
		○ Los números de comercio pueden ser específicos de un esquema de pagos 
		
		○ Varios identificadores para una única cuenta
		
		○ ¿Cómo identificamos la cuenta de forma única?
		
		○ Apoyarse en el CNP (restringir cada identificador en este esquema de pagos)
		
		○ Qué tipo de estructuras hay implantadas
		
		○ Identificación por pasaporte: marcadores de posición
		
		○ Mapear las cuentas de pathfinder y las cuentas móviles a los ID únicos de los DFSP
		
			§ Servicio: la cuenta principal es X
			
			§ Cada país tiene un servicio que presta
			
			§ Cada CNP entiende el esquema de direcciones
			
			§ El global: hay que saber qué vías usar 
		
		○ Envía un get parties al switch 
		
			§ El ALS nunca oyó hablar de ellos
			
			§ 2 vías 
			
				□ Vía global (path finder y conversión a BIC)
	- CNP

		○ No aloja nada
	
		○ Enrutar por el CNP: preguntar a otros
		
		○ Construir las rutas alternativas 
	
	- No existe un registro global
	
		○ Beneficiario último 
		
		○ Comunicación establecida
		
		○ El reto es si podremos hacer que 2 DFSP compartan comunicación directa, ¿y será mucho pedir? 
	
	- El Switch tiene esquemas de pagos
	
		○ Un operador del Hub que siga las reglas del esquema de pagos puede permitir nombres de FSP según decidan esas reglas
		
		○ La tecnología o la propia Admin API no restringen los nombres (más allá de las restricciones de longitud, tipo o caracteres, etc.)
		
		○ BGP: Border Gateway Protocol 
	
	- Consultar a cada CNP y después idear optimizaciones, una matriz que dé la ruta global; el objetivo sería no consultar al CNP directamente

• ¿Cómo conectarse con Mojaloop?
	
	- Cualquier servicio financiero puede conectarse a Mowali
	
	- Reglas del esquema de pagos, técnicas
	
	- Regulatorias 

	- ¿Cómo asigno las cosas? Nadie conoce los pasos
	
	- API de Mojaloop: entender esto.  
	
	- 2 instancias de Mojaloop: TIPs y Mowali 
	
		○ WOCCU, Asia, EE. UU.: solicitaron una instancia
		
		○ Siguen ampliando los límites 
	
	- Cómo es una integración
	
		○ Hacen falta sandbox, simuladores 
		
		○ Enfoque estándar

• Servicio de pagos por instancia

	- Conseguir que los flujos fluyan de forma puntual
	
	- Hacen falta libros mayores en tiempo real; ¿qué pasa si están fuera de línea?
	
	- Excepción para fuera de red (los bancos aprovechan el flotante) 

• Proceso de descubrimiento (FSP emisor)

	- El Switch determina si tienen que contactar con un FXP
	
	- En qué moneda puede recibir la cuenta receptora 
	
	- Varias búsquedas
	
	- Modelo de datos: conjunto de cuentas, con una moneda en un DFSP


Asistentes:
	
	- Mike, Patricia - Thume
	
	- Michael R, Rob R, Sam - Modusbox
	
	- Kim, Lewis - Crosslake
	
	- Rolland, Greg, Phillip - Sybrin
	
	- Vanburn -- Terrapay
	
	- Megan, Simeon - Virtual

---
i18n_source_sha: 58f3ee075258a90e4935acfcf0fdaa86260d85d7
---

# Workstream de rendimiento

Miércoles, 11 de marzo de 2020

## Objetivos de rendimiento:

- Que el sistema de hardware actual alcance 1k TPS estables, un pico de 5k y una escalabilidad horizontal demostrada
  1. Más instancias = más rendimiento, de forma casi lineal.
  1. Validar la infraestructura mínima para hacer 1K TPS (TPS fin)
  1. Determinar la configuración y el costo de nivel de entrada (AWS y local)

## Pruebas de concepto:

Probar el impacto de sustituir directamente la base de datos mysql por un servicio de red de memoria compartida como redis (usando el algoritmo redlock si hacen falta bloqueos)

Probar un método distinto de compartir el estado, usando una versión ligera de orientación a eventos con algo de CQRS

## Recursos:

- Canal de Slack: `#perf-engineering`
- [Presentación de rendimiento de mitad de PI](https://github.com/mojaloop/documentation-artifacts/tree/master/presentations/March2020-PI9-MidPI-Review)
- [Configurar los componentes de supervisión](https://github.com/mojaloop/helm/tree/master/monitoring)
 
## Elementos de acción y de seguimiento:

- ¿Qué métricas de Kafka (del lado del cliente y del servidor) deberíamos revisar? - Confluent ayudará
- Explorar el bloqueo y la liquidación de posiciones - Sybrin ayudará
  1. Revisar RedLock: bloqueo pesimista frente a bloqueo automático
  2. Eliminar la base de datos compartida del medio (bloqueo automático en Redis)

- Combinar el handler de prepare y el de posición con una base de datos distribuida
- Revisar el cliente de node.js y cómo afecta a kafka, la configuración de Node y el cliente final de Kafka - Nakul
- Volver a activar el trazado para ver cómo se comportan la latencia y las aplicaciones
- Asegurar que los recuentos de llamadas se han racionalizado (a un nivel más profundo)
- Validar los tiempos de procesamiento en los handlers y que estamos llegando a la caché  
- Patrones asíncronos en Node
  1. Falta alguien que sea excelente en mysql y percona
  2. Lo estamos aprovechando correctamente
        
- Qué capa de caché estamos usando (en memoria)
- Revisar la implementación del modelado de eventos: identificar los eventos de dominio
- Node.js/kubernetes - 
- Centrarse en los problemas de la aplicación más que en los de arquitectura
- Cómo estamos haciendo la tecnología asíncrona: revisarlo (Node.JS, un problema mayor), hay que optimizar los modelos con hilos - Nakul
 
## Notas y detalles de la reunión

### Historia

1. Se ha implantado la tecnología, se esperaba que el diseño resolviera un problema empresarial
        
2. El esfuerzo de la comunidad no priorizó que las partes del sistema fueran de nivel empresarial ni baratas de operar
        
3. Elecciones de tecnología OSS

### Objetivos

1. Optimizar el sistema actual
2. Hacerlo más barato de operar
3. Hacerlo escalable hasta 5K TPS  
4. Asegurar que los servicios de valor agregado puedan acceder de forma eficaz y segura a los datos de las transacciones

### Restricciones de las pruebas

1. Solo se ha hecho la transferencia dorada, el tramo de transferencia    
2. Flujo de la transferencia
3. Simuladores (legacy y avanzado): se usa el legacy por continuidad
4. Desactivado el handler de timeout
5. 8 DFSP (organizaciones participantes); con más DFSP podríamos escalar

### Proceso

1. Jmeter inicia la solicitud del pagador    
2. El simulador legacy recibe el callback de notificación de fulfil
3. El simulador legacy gestiona el procesamiento del beneficiario e inicia el callback de fulfilment
4. Registro en la tabla de posiciones de cada DFSP
    - a. Algoritmo parcial en el que se hace el bloqueo para reservar los fondos, se hacen los cálculos y se hacen los commits finales
    - b. El handler de posición procesa un registro cada vez

5. Un algoritmo futuro haría un lote
        
- Una transferencia la gestiona un handler de posición
    - Todas las transferencias tienen prefondeo

1. Costos de liquidación reducidos     
2. Se puede controlar la rapidez con la que los DFSP responden a la solicitud de fulfil (completar primero las transferencias comprometidas antes de gestionar nuevas solicitudes)
- El sistema necesita cerrar por timeout las transferencias que superen los 30 segundos
  - Cualquier rediseño de las bases de datos
  - Casos de prueba

- Transacción financiera
  - De extremo a extremo
  - Solo prepare
  - Solo fulfil

- Caracterización individual de Mojaloop
  - Servicios y handlers
  - Arquitectura y bibliotecas de streaming
  - Base de datos
  - ¿Qué cambió: de 150 a 300 TPS?

- Cómo procesamos los mensajes
- Handler de posición (ejecutado en modo mixto, aleatorio 
  - Medición de la latencia

1. 5 s para que la base de datos procese, X s para que Kafka procese
2. ¿Cómo medir esto?

### Metas 

1. Lo bastante alto como para que el sistema tenga que funcionar bien
2. Subir el sistema para agregar escala (adición de x DFSP) 
3. Casos sospechosos para investigar
4. Observar las contenciones en torno a la base de datos
5. Base de datos compartida, 600MS sin errores
  - La contención está totalmente en la base de datos
  - El cuello de botella es la base de datos (distribuir los sistemas para que se ejecuten de forma independiente 



- 16 bases de datos se ejecutan de extremo a extremo 
- GSMA - 500 TPS
- ¿Cuál es el diseño óptimo?

### Contenciones 

1. Contención del handler del sistema 
    - Dónde se puede escalar el sistema
1. Si hay cambios de arquitectura que tengamos que hacer, podemos explorarlo
    - Coherencia para cada DFSP
    - Hilos de los flujos de información: pregunta abierta

1. Resultados sesgados de una única base de datos para todos los DFSP     
1. El reto es hasta dónde se llega con hardware adicional 
    - Cuáles son los límites del diseño de la aplicación
1. Transferencias financieras (dentro y fuera del sistema)
    - Sistemas de auditoría
    - Actividad de liquidación 
    - Agrupar en la base de datos resuelve algunos problemas
    - Comentarios de Confluent

1. Problemas de la base de datos compartida, varias bases de datos
        
1. Problemas a nivel del diseño de la aplicación
        
1. Hemos visto situaciones en las que ejecutamos un montón de simuladores y sandboxes
    - Hay que apoyarse en trazadores y análisis cuando esto llegue a producción
    - Miguel indica que de momento desactivamos el trazado
 
### Problemas conocidos

1. Recursos de CPU de carga en las máquinas (node esperando sin hacer nada): reoptimizar el código
2. Los tiempos de procesamiento aumentan con el tiempo

## Optimización
 1. Monolítico distribuido - PRISM - eliminar las lecturas redundantes
 2. Combinar los handlers: prepare+posición y fulfil+posición

### ¿Qué estamos intentando arreglar?
  1. ¿Podemos escalar el sistema?    
  2. ¿Cuánto cuesta hacerlo? (costo por unidad de escala) 
  3. Hace falta entender cómo hacerlo a pequeña y a gran escala
  3. Optimizados los recursos
  4. 2.5 sprints
  5. Hace falta escalar horizontalmente 
  6. Agregar auditoría y repetibilidad - 

### Asistentes:

- Don, Joran (experto en rendimiento recién contratado) - Coil
- Sam, Miguel, Roman, Valentine, Warren, Bryan, Rajiv - ModusBox
- Pedro - Crosslake
- Rhys, Nakul Mishra - Confluent
- Miller - Gates Foundation
- Presenciales: Lewis (CL), Rob (MB), Roland (Sybrin), Greg (Sybrin), Megan (V), Simeon (V), Kim (CL)

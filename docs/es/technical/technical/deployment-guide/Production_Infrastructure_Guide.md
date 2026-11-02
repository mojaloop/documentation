---
i18n_source_sha: 83d215a6fa70bbe4613cad48f83bfc41fcb75700
---

# Infraestructura para la producción Mojaloop

**Qué adquirir y cómo realizar el despliegue para lograr esquemas de pagos fiables y de alto rendimiento**

**Aviso sobre IA** Este documento incluye contenido generado con la ayuda de Claude Opus 5.5. Todo el contenido ha sido revisado y validado por el autor.

---

## Acerca de este documento

Esta guía está dirigida a los adoptantes de la versión Mojaloop, a los operadores del Hub, a los integradores de sistemas y a los equipos de compras que estén planificando la infraestructura para un proyecto de la versión Mojaloop en entorno de producción. En ella se explican qué decisiones relativas a la infraestructura son importantes, las ventajas e inconvenientes de cada una de ellas y las recomendaciones de la comunidad Mojaloop, para que pueda tomar decisiones acertadas en materia de compras y evaluar con confianza las propuestas de los proveedores.

Se basa en la sesión de ingeniería «Mojaloop Foundation *Infraestructura para la producción Mojaloop*», presentada en MojaCom32 en Accra (Ghana) en septiembre de 2026, e incluye el contenido completo de las notas del ponente.

### Ámbito de aplicación

**Ámbito de aplicación:** Switches de producción instalados en las instalaciones propias que ejecutan esquemas de pagos en tiempo real, en los que el tiempo de inactividad implica que no se realicen los pagos. La guía aborda la fiabilidad, el rendimiento y los acuerdos de nivel de servicio (SLA), así como qué adquirir y cómo realizar el despliegue.

**Aspectos similares, que no se tratan por separado:** los entornos de preproducción, como los entornos de prueba y de evaluación del rendimiento, comparten la mayoría de estos aspectos. Deben reflejar fielmente la topología de producción, especialmente si desea obtener resultados fiables en las pruebas de rendimiento. Por lo tanto, la mayor parte de esta guía también es aplicable a ellos.

**Quedan fuera del alcance:** los entornos de desarrollo, la experimentación, los laboratorios y los entornos de prueba, así como los aspectos específicos del despliegue en la nube. Esto no se debe a que no sean importantes. Las consideraciones en estos casos son muy diferentes (se puede ejecutar «Mojaloop» en un ordenador portátil para el desarrollo) y merecen un tratamiento aparte.

### Índice

1. [¿En la nube o en las instalaciones propias?](#1-cloud-or-on-premises)
2. [Fundamentos físicos: emplazamientos, energía y red](#2-physical-foundations-sites-power-and-network)
3. [Dimensionamiento del hardware: 500, 1.000 y 2.000 TPS](#3-sizing-the-hardware-500-1000-and-2000-tps)
4. [Almacenamiento y replicación: qué no debe comprar](#4-storage-and-replication-what-not-to-buy)
5. [Elección de plataforma choice](#5-platform-choice)
6. [Alta disponibilidad, RPO y RTO](#6-high-availability-rpo-and-rto)
7. [Funcionamiento de la plataforma](#7-operating-the-platform)
8. [Perspectivas de futuro: TigerBeetle](#8-looking-ahead-tigerbeetle)
9. [Lista de comprobación de compras](#9-procurement-checklist)
10. [Cuestiones que deben resolverse en el marco de su plan](#10-questions-to-settle-within-your-scheme)
11. [Glosario](#glossary)
12. [Referencias](#references)

---

## 1. ¿En la nube o en las instalaciones propias?

Ambas opciones son válidas. En la actualidad, algunos adoptantes utilizan esquemas «Mojaloop» en producción con el Switch alojado en la nube pública, mientras que otros los ejecutan íntegramente en sus propias instalaciones. La mayoría de las preguntas actuales de la comunidad se refieren al despliegue en instalaciones propias, que es el tema central del resto de esta guía.

| | Nube pública | Instalaciones propias |
|---|---|---|
| **Puntos fuertes** | **Rapidez:** infraestructura de nivel empresarial en cuestión de semanas, no de meses. **Elasticidad:** añada capacidad para hacer frente al crecimiento y a los picos estacionales según sus necesidades. **Resiliencia integrada:** múltiples zonas y regiones disponibles de forma inmediata. | **Menor coste a largo plazo** para volúmenes nacionales estables y predecibles. **Soberanía:** control total sobre la ubicación de los datos y las claves. **Gasto predecible:** sin facturas por recursos informáticos medidos ni por tráfico de salida. |
| **Tenga cuidado con** | Mayor coste a largo plazo con un volumen elevado y constante; requisitos de residencia de datos y autorización de los Reguladores; tarifas de salida y dependencia de los servicios gestionados. | Plazos de entrega prolongados para las instalaciones y las adquisiciones; requiere conocimientos técnicos internos sobre la Plataforma; es necesario adquirir capacidad por adelantado para hacer frente a los picos de demanda. |

La gran ventaja de la nube es el tiempo. No hay que esperar a que se equipe un centro de datos ni a que se resuelva una licitación de hardware, y se puede ampliar la capacidad rápidamente a medida que crece el esquema de pagos o para hacer frente a picos estacionales. Las zonas de disponibilidad le ofrecen, de forma inmediata, dominios de fallo físicamente separados.

No obstante, las contrapartidas son significativas:
- **Coste:** con volúmenes nacionales elevados y constantes, alquilar recursos informáticos las 24 horas del día suele resultar más caro a lo largo de cinco o más años que adquirirlos en propiedad.
- **Residencia de los datos:** muchos bancos centrales y organismos reguladores lo exigen, por lo que se necesita una región dentro del país o una autorización explícita.
- **Salida de datos:** se cobra por los datos que salen de la nube.
- **Dependencia del proveedor:** si se utiliza una base de datos gestionada o un servicio de mensajería propios de un proveedor de nube, resultará más difícil cambiar de proveedor más adelante.

Las instalaciones propias ofrecen la situación contraria. Se obtienen menores costes a largo plazo para cargas predecibles, soberanía total sobre los datos y las claves, y un gasto predecible. Sin embargo, los plazos de entrega de las instalaciones y de adquisición son largos, se necesitan conocimientos sobre la Plataforma, ya sea a nivel interno o mediante subcontratación, y hay que adquirir capacidad por adelantado para hacer frente a los picos de demanda.

### ¿Qué debería determinar la decisión?

Cinco preguntas:

- **Normativa:** ¿Es obligatorio que el Switch y sus datos permanezcan en el país? ¿Existe alguna región de la nube dentro del país que el Regulador acepte? A menudo, este factor por sí solo determina la respuesta a la pregunta.
- **Plazo:** ¿Para cuándo debe entrar en funcionamiento el esquema de pagos? La adquisición de instalaciones y equipos puede llevar meses. Si faltan seis meses para la puesta en marcha y no dispone de un centro de datos adecuado, la nube podría ser la única opción viable.
- **Volumen:** una carga constante, elevada y predecible favorece la compra. Un crecimiento incierto favorece el alquiler.
- **Competencias:** ¿Puede contar con personal para gestionar las operaciones de la Plataforma las 24 horas del día, los 7 días de la semana, o va a subcontratar este servicio? En cualquier caso, necesitaráKubernetes competencias, pero en sus instalaciones propias también será responsable del ciclo de vida del hardware.
- **Solución:** elija lo que elija, asegúrese de que sea portátil. La versión Mojaloop es compatible con la versión estándar Kubernetes. Si evita los servicios gestionados exclusivamente en la nube, conservará la opción de cambiar más adelante.

> **Una estrategia habitual:** comenzar en la nube para cumplir con la fecha de puesta en marcha, mantener la portabilidad de la Plataforma y, posteriormente, pasar a las instalaciones propias cuando el volumen de trabajo y las competencias internas lo justifiquen. Tenga en cuenta que la migración de un sistema en producción no es una tarea sencilla, por lo que debe planificarla desde el principio.

---

## 2. Infraestructuras físicas: emplazamientos, suministro eléctrico y red

### El centro de datos

**Instalaciones**
- Mantenibilidad simultánea: Nivel III o equivalente.
- El mantenimiento no debe requerir la desconexión de los Switches.
- Seguridad física y control de acceso auditado.
- Refrigeración para racks de alta densidad y asistencia técnica remota las 24 horas del día, los 7 días de la semana.

Una instalación con alta mantenibilidad puede llevar a cabo tareas de mantenimiento planificadas en los sistemas de alimentación eléctrica o refrigeración sin necesidad de desconectar sus equipos. Si la instalación requiere un periodo de mantenimiento durante el cual se interrumpe por completo el servicio, su SLA se verá afectado por ello.

**Suministro eléctrico**
- Líneas de alimentación independientes A y B procedentes de circuitos de distribución distintos.
- SAI y generador, con contratos de suministro de combustible y pruebas de carga periódicas. No basta con una prueba de arranque.
- Doble fuente de alimentación en cada servidor y Switch, conectada a cada una de las líneas de alimentación.

Las fuentes de alimentación duales resultan económicas de especificar en el momento de la adquisición, pero su instalación posterior resulta costosa.

**Red**
- Dos operadores cuya fibra óptica entra en el edificio por rutas físicamente distintas. Dos operadores que comparten un mismo conducto sufren un corte provocado por la misma excavadora.
- Switches «top-of-rack» redundantes, con cada servidor conectado a ambos (2 × 25 GbE por servidor).
- Tráfico dirigido al DFSP, tráfico de replicación y tráfico de gestión separados: al menos de forma lógica (VLAN), e idealmente de forma física.

### ¿Uno, dos o tres emplazamientos?

Esta única decisión determina en gran medida su RPO, su RTO y parte de su latencia.

| Topología | Sobrevive | RPO | RTO | Aspectos a tener en cuenta |
|---|---|---|---|---|
| Una instalación, tres dominios de fallo (racks / zonas de alimentación) | Pérdida de un nodo, un rack, un Switch o la alimentación eléctrica | 0 (transferencias confirmadas) | Sin interrupción del servicio; breve parón parcial (de unos segundos a aproximadamente 1 minuto) | Una interrupción que afecta a toda la instalación se considera una interrupción del servicio |
| Dos centros: principal + recuperación ante desastres asíncrona | Pérdida de un sitio, con conmutación manual ante fallos | Segundos de retraso en la replicación | De minutos a horas (una decisión humana) | Las transferencias en curso deben ser conciliadas |
| Tres nodos: dos activos + testigo de quórum | Pérdida del sitio, de forma automática | 0 (transferencias confirmadas) | De unos segundos a aproximadamente 1 minuto (detección de fallos en el sitio) | Requiere una baja latencia entre sitios (unos pocos ms de RTT); cada confirmación (commit) lo compensa |

**Un sitio con tres dominios de fallo** (racks distintos, zonas de alimentación distintas) resiste la pérdida de un nodo, un rack, un Switch o una fuente de alimentación. El RPO es cero para las transferencias confirmadas. No se produce ninguna interrupción del servicio, sino únicamente un breve parón de entre unos segundos y aproximadamente un minuto para el tráfico que se encontraba en el nodo que ha fallado. Esto incluye la base de datos, ya que el diseño de producción recomendado utiliza un Clúster Percona XtraDB de tres nodos ([Sección 6](#6-high-availability-rpo-and-rto)). La pérdida de todo el sitio constituye una interrupción del servicio.

**Dos sitios, uno primario y otro de recuperación ante desastres (DR), con replicación asíncrona,** permiten superar la pérdida de un sitio. Sin embargo:
- **El RPO es el retraso de la replicación,** que suele ser de unos segundos. Con la replicación asíncrona, el sitio primario confirma una transferencia antes de que el cambio llegue al sitio de recuperación ante desastres. Si se pierde todo el sitio primario, las transferencias confirmadas que aún se encuentren dentro de ese intervalo se pierden con él.
- **Dentro del sitio primario, el RPO sigue siendo cero.** La replicación dentro del sitio es síncrona, por lo que el retraso solo es relevante si se pierde todo el sitio primario.
- **El RTO es de minutos a horas,** ya que la conmutación por error suele ser una decisión humana.
- **Las transferencias en curso** en el momento del fallo deben someterse a una conciliación.

**Tres sitios, de los cuales dos están activos y un tercero actúa como testigo de quórum,** pueden realizar una conmutación por error de forma automática:
- El RPO es cero para las transferencias confirmadas.
- El RTO oscila entre segundos y aproximadamente un minuto, mientras se detecta el fallo del sitio.
- En cuanto a la base de datos, un pequeño árbitro de Galera en el sitio testigo proporciona el voto de desempate.
- El inconveniente es que los sitios deben estar próximos: unos pocos milisegundos de tiempo de ida y vuelta (RTT) como máximo, ya que cada confirmación sincrónica conlleva esa latencia.

> **¿Por qué no bastaría con dos nodos activos?** El «Kubernetes» de etcd, el quórum de controladores «Kafka» y Percona XtraDB Clúster necesitan una mayoría para funcionar de forma segura. Con dos sitios, cuando se interrumpe la conexión entre ellos, ninguna de las partes puede determinar si la otra ha fallado o simplemente está inaccesible. O bien ambos se detienen, o bien se corre el riesgo de que se produzca un «split brain» (dos libros mayores que aceptan transferencias al mismo tiempo). El testigo desempata, y puede ser de pequeño tamaño: solo tiene que votar, no gestionar el tráfico.

### Cómo se reflejan las decisiones relativas a las instalaciones en los acuerdos de nivel de servicio (SLA) y en el rendimiento

| Disponibilidad | Tiempo de inactividad al año |
|---|---|
| 99,9 % | ≈ 8,8 horas |
| 99,95 % | ≈ 4,4 horas |
| 99,99 % | ≈ 53 minutos |
| 99,999 % | ≈ 5 minutos |

Un 99,9 % permite casi nueve horas de tiempo de inactividad al año, mientras que un 99,99 % permite 53 minutos, lo que equivale a un único incidente grave.

- **La dependencia compartida más débil limita su SLA.** Una sola fuente de alimentación, un solo operador o una sola ubicación limitan todo el sistema, independientemente del grado de redundancia de los servidores.
- **La distancia equivale a la latencia.** Con la replicación síncrona entre sitios, cada confirmación espera a que se complete el tiempo de ida y vuelta. Una transferencia de Mojaloop se confirma varias veces (preparación, ejecución y actualizaciones de posición), por lo que 10 ms entre sitios no equivalen a 10 ms por transferencia. Es un múltiplo de esa cifra, y reduce el rendimiento que se puede alcanzar.
- **Las tareas de mantenimiento programadas cuentan**, a menos que su SLA las excluya explícitamente. Las instalaciones que permiten el mantenimiento simultáneo y las actualizaciones progresivas a la versión Kubernetes evitan que se incluyan en el presupuesto de tiempo de inactividad.
- **Acuerde primero el SLA** y, a continuación, diseñe la topología de la red para que se ajuste a él, y no al revés.

---

## 3. Dimensionamiento del hardware: 500, 1000 y 2000 TPS

### Principios de dimensionamiento

1. **Tenga en cuenta los picos, no la media.** El tráfico de pagos presenta picos: días de pago de nóminas, fin de mes, fiestas religiosas y festivos nacionales. Los picos pueden alcanzar varias veces la media diaria. Utilice datos reales de esquemas de pagos ya existentes en su mercado, si dispone de ellos.
2. **Hacer frente a la pérdida de un nodo en horas punta.** Plan N+1: aunque falle uno de los servidores, debe seguir garantizándose el servicio en horas punta.
3. **Deje margen de capacidad.** No diseñe el sistema para que funcione al 95 % de su capacidad en momentos de máxima demanda; intente que la utilización no supere aproximadamente el 70 % en el pico de diseño.
4. **Separar la computación de los datos.** Los servicios sin estado (Mojaloop) se ejecutan en nodos de trabajo. Los servicios (Kafka) y las bases de datos disponen de nodos de datos dedicados con discos locales (no SAN ni NAS), de modo que un servicio muy activo no pueda privar a la base de datos del Libro mayor de recursos de CPU.
5. **Utilice discos locales de alta velocidad.** NVMe en los nodos de datos, con protección contra cortes de corriente en las unidades MySQL. La latencia de confirmación limita directamente el TPS.
6. **Compruébelo en su propio equipo.** Las herramientas de la comunidad para realizar pruebas de rendimiento son de acceso público. Ejecútelas en el equipo que vaya a adquirir, antes de la puesta en marcha y tras las actualizaciones importantes.

### Lo que revelan las pruebas de rendimiento del modelo «Mojaloop»

La Workstream de rendimiento Mojaloop publica todo el contenido del repositorio [ml-perf-whitepaper-ws](https://github.com/mojaloop/ml-perf-whitepaper-ws): Terraform, Helm modificaciones, scripts de prueba e informes completos de los escenarios.
- **Flujos:** cada ejecución utiliza flujos de extremo a extremo (detección, cotización, transferencia) con ocho simuladores «DFSP», cuatro pagadores y cuatro beneficiarios.
- **Carga:** generada por k6 desde su propio clúster independiente, de modo que el generador de carga no compite con el Switch por los recursos.
- **Evaluación:** los resultados se evalúan en una ventana de estado estable, con un filtro de validez que confirma que el proceso de Kafka ha mantenido el ritmo.

Hay tres resultados que son importantes para la contratación pública:

- **500 TPS (v17.1.0, ISO 20022, full mTLS): APROBADO, p99 951 ms.** Se ejecutó con un único Kafka broker y un único MySQL con durabilidad reducida, por lo que se trata de una prueba de rendimiento y no de una configuración de producción.
- **1.000 TPS (v17.1.0, ISO 20022, HA): APROBADO, p99 997 ms frente al objetivo de < 1 s.** Esta es la configuración de producción:
  - Kafka, con un factor de replicación de 3 y un mínimo de 2 réplicas sincronizadas.
  - MySQL: replicación semisincrónica con un fsync en cada confirmación (commit).
  - No se producen situaciones de repliegue a la replicación asíncrona.
- **2.000 TPS (gráfico v17.3.0, HA): APROBADO en cuanto al rendimiento.**
  - Se mantuvo una tasa de 1.998 TPS durante un intervalo de 60 minutos (7,2 millones de transferencias), superándose el umbral de validez y sin que se produjera ninguna saturación.
  - A 2.000 TPS, el criterio es el rendimiento; no se define ningún objetivo de latencia por encima de los 1.000 TPS. El propio resumen del informe aplica el objetivo de un segundo en todo momento y califica la prueba como «fallida», razón por la cual algunos lectores habrán visto esa calificación.
  - A título informativo, el valor en la página 99 fue de 1.727 ms y la mediana, algo menos de un segundo.

Todas ellas se ejecutaron en máquinas virtuales sencillas de 8 vCPU con MicroK8s. Ningún nodo superó aproximadamente el 70 % de utilización de la CPU en las ejecuciones de alta disponibilidad.

**Conclusiones:**
- **El rendimiento se escala con nodos estándar.** Pasar de 1.000 a 2.000 TPS requirió aproximadamente 1,84 veces más infraestructura.
- **La latencia aumenta con la carga, independientemente del hardware.** A 2.000 TPS, seis saltos consecutivos de Kafka representan unos 518 ms del tramo de transferencia, mientras que cada nivel se sitúa entre el 50 % y el 65 % de utilización de la CPU. Se trata de una característica del flujo de trabajo del software, en la que está trabajando la comunidad.
- **No es posible reducir el p99 simplemente invirtiendo en hardware.** Unos servidores más potentes no lo reducirán, así que no permita que nadie le venda hardware de gama alta basándose en ese argumento.

### ¿Qué se probó realmente?

| | 500 TPS | 1.000 TPS | 2.000 TPS |
|---|---|---|---|
| Resultado | ✓ 500 TPS, p99: 951 ms | ✓ 1.000 TPS, p99: 997 ms | ✓ 1.998 TPS (p99: 1.727 ms, a título informativo) |
| Postura de resiliencia | No es HA: un solo Kafka y un MySQL | HA: Kafka RF 3, MySQL semisincronizado | HA, a 1.000 TPS |
| Cambiar de nodos de aplicación | 5 × 8 vCPU / 32 GB | 10 × 8 vCPU / 32 GB | 20 × 8 vCPU / 32 GB |
| Kafka nodos | 1 × 4 vCPU / 16 GB | 3 × 8 vCPU / 32 GB | 3 × 8 vCPU / 32 GB |
| MySQL nodos | 1 × 4 vCPU / 16 GB | 2 × 8 vCPU / 32 GB | 2 × 16 vCPU / 64 GB |
| Total del clúster de Switches (incluido el Monitoreo) | ≈ 50 vCPU / 200 GB | ≈ 122 vCPU / 490 GB | ≈ 224 vCPU / 900 GB |
| Nodo con mayor actividad, pico de CPU | 84 % | 70 % | 65 % |

En todas las ejecuciones se utilizaron máquinas virtuales AWS m7i con MicroK8s, con las opciones «mTLS», «JWS» e ILP totalmente habilitadas. Asimismo, se aplicaron controles técnicos de la norma ISO 27001, tales como el Cifrado en reposo y la persistencia real.

- **A 500 TPS:** cinco nodos de aplicaciones de 8 vCPU, más un nodo pequeño de Kafka y un nodo pequeño de MySQL. Unas 50 vCPU en total, sin alta disponibilidad (HA).
- **A 1.000 TPS con alta disponibilidad (HA):** diez nodos de aplicación, tres nodos de tipo «Kafka» y dos nodos de tipo «MySQL», todos con 8 vCPU y 32 GB. Aproximadamente 120 vCPU. El nodo con mayor carga alcanzó un pico del 70 %, y el nodo «MySQL» utilizó menos de un tercio de sus IOPS asignadas, por lo que la demanda de almacenamiento es moderada.
- **A 2.000 TPS:** veinte nodos de aplicación, los mismos tres nodos de Kafka y dos nodos de MySQL con el número de vCPU duplicado a 16. Un total de unas 220 vCPU, siendo el nodo con mayor carga de trabajo del 65 %.

El patrón: **la capa de aplicaciones se amplía horizontalmente, la MySQL se amplía verticalmente y la Kafka absorbió el doble de carga con el mismo hardware.**

Advertencias sobre la comparabilidad:
- **Formato de los mensajes:** en las pruebas de 500 y 1.000 TPS se utilizó «ISO 20022», cuyos mensajes son aproximadamente un 30 % más grandes. En la prueba de 2.000 TPS se utilizó «FSPIOP» con una carga distribuida de manera uniforme, por lo que debe considerarse como un mínimo, no como un máximo.
- **Versión del software:** en la prueba de 2.000 TPS se utilizó una rama de desarrollo con una versión de Chart aún no publicada (v17.3.0).
- **Topología de la base de datos:** todas las pruebas utilizaron una configuración de «MySQL» primarias con una réplica semisincrónica. El diseño de producción recomendado aquí utiliza un Percona XtraDB Clúster, que aún no ha sido sometido a estas pruebas.

> **Consejo de optimización para los responsables de la implementación:** haga coincidir el número de réplicas de los consumidores con un número de particiones igual a Kafka, y asegúrese de que el número de réplicas sea un múltiplo del número de nodos. De lo contrario, el programador generará puntos de congestión persistentes.

### Traducción a «bare metal»: servidores por centro (HA)

| Rol | 500 TPS | 1.000 TPS | 2.000 TPS |
|---|---|---|---|
| Kubernetes, plano de control | 3 × 8 núcleos, 32 GB | 3 × 8 núcleos, 32 GB | 3 × 8 núcleos, 32 GB |
| Trabajadores de aplicaciones | 3 × 16 núcleos, 128 GB | 3 × 24 núcleos, 192 GB | 5 × 24 núcleos, 192 GB |
| Kafka brokers (NVMe local) | 3 × 8 núcleos, 64 GB, 2 × 1,92 TB | 3 × 8 núcleos, 64 GB, 2 × 1,92 TB | 3 × 16 núcleos, 64 GB, 2 × 3,84 TB |
| Percona XtraDB Clúster (PLP NVMe, RAID1) | 3 × 8 núcleos, 64 GB, 1,92 TB | 3 × 16 núcleos, 128 GB, 3,84 TB | 3 × 32 núcleos, 256 GB, 7,68 TB |
| Monitoreo | 1 × 8 núcleos, 64 GB | 1 × 8 núcleos, 64 GB | 1 × 16 núcleos, 64 GB |
| Balanceador de carga | 2 × 8 núcleos, 32 GB | 2 × 8 núcleos, 32 GB | 2 × 8 núcleos, 32 GB |
| **Total por centro** | **15 servidores · 144 núcleos · ≈ 1,0 TB de RAM** | **15 servidores · 192 núcleos · ≈ 1,4 TB de RAM** | **17 servidores · 320 núcleos · ≈ 2,1 TB de RAM** |

Red para todos los niveles: un par de Switches «top-of-rack» de 25 GbE, con dos puertos de 25 GbE por servidor.

**Método**
- **Asignación de vCPU:** una vCPU de AWS equivale a un hiperhilo, por lo que una instancia de 8 vCPU corresponde aproximadamente a cuatro núcleos físicos.
- **Trabajadores:** se dimensionan de tal forma que, si falla un trabajador, la capacidad restante siga siendo igual a la capacidad total aprovisionada para la prueba.
  - A 1.000 TPS, esto supone tres trabajadores con 24 núcleos y 192 GB. Si se pierde uno, aún se dispone de 96 subprocesos frente a las 80 vCPU sometidas a prueba.
  - A 2.000 TPS, son cinco de las mismas características.
- **Agentes (Kafka):** tres agentes con NVMe local. A 2.000 TPS se amplían a 16 núcleos, de modo que la pérdida de un agente no haga que los restantes alcancen un porcentaje de utilización de alrededor del 85 %. Se trata de una deducción; las pruebas no lo verificaron.
- **Base de datos:** en producción se utiliza un clúster Percona XtraDB (PXC) de tres nodos en lugar de la configuración de primario y réplica probada, por lo que hay un servidor adicional por sitio.
  - Sigue escalando verticalmente, ya que las escrituras se dirigen a un nodo cada vez y las filas de posiciones de los participantes están en uso activo. Por lo tanto, dispone de un amplio margen: 16 núcleos a 1.000 TPS y 32 a 2.000, con los tres nodos dimensionados de forma idéntica.
  - Las unidades deben contar con protección contra cortes de corriente (PLP), ya que cada confirmación (commit) se vacía al disco.
- **Roles de apoyo:** un plano de control dedicado de tres nodos «Kubernetes», un nodo de Monitoreo y un par de Balanceadores de carga que sustituyen al Balanceador de carga en la nube.
- **La columna de 500 TPS** sigue el mismo método.
  - La capa de aplicación procede de la ejecución de 500 TPS: 40 vCPU aprovisionadas, es decir, tres nodos de trabajo de 16 núcleos con 128 GB.
  - Esa ejecución no contaba con alta disponibilidad (HA), por lo que la capa de datos se ha reducido con respecto a la ejecución de 1.000 TPS con HA.
  - El resultado sigue siendo de 15 servidores. En el extremo inferior, los roles fijos de alta disponibilidad (plano de control, tres brokers Kafka, tres nodos de base de datos y Balanceadores de carga) establecen el mínimo, no el rendimiento.

> **Advertencia importante:** en las pruebas de rendimiento publicadas se utilizó una réplica primaria más una réplica semisincrónica, no PXC. Además, cada confirmación (commit) en PXC espera a que se certifique en todo el Clúster, por lo que le recomendamos que realice las pruebas de rendimiento en PXC antes de basarse en estas cifras de latencia.

Por lo tanto: **15 servidores por sitio a 500 y 1.000 TPS, y 17 a 2.000.** Multiplique esta cifra por el número de sitios de su topología y compruébelo en su propio hardware con el mismo conjunto de pruebas.

### Presupuesto orientativo de hardware por centro

| Rendimiento | Rango orientativo (solo hardware) | Servidores |
|---|---|---|
| 500 TPS | 150 000 $ – 190 000 $ | 15 |
| 1.000 TPS | 165 000 $ – 215 000 $ | 15 |
| 2.000 TPS | 220 000 $ – 285 000 $ | 17 |

Se trata deliberadamente de rangos, no de una lista de precios, ya que el mercado es volátil.

- **Base:** precios de venta al público en EE. UU. por unidad de los servidores especificados a fecha de septiembre de 2026, más un margen de contingencia de aproximadamente el 30 % para mantener una estimación prudente. Las cifras incluyen el tercer nodo de la base de datos.
- **Los precios son volátiles:**
  - Una escasez de DRAM en 2026 hará que la memoria represente aproximadamente un tercio del coste del hardware.
  - Los precios de las CPU varían en función de las promociones, y algunos componentes tienen plazos de entrega prolongados.
  - Solicite cotizaciones con fecha concreta y adquiera toda la capacidad de memoria de una sola vez.
- **Cuestione las cotizaciones de los fabricantes de equipos originales (OEM):** Los precios de catálogo de los fabricantes de equipos originales para memorias y unidades SSD pueden ser varias veces superiores al precio de mercado. Si la cotización de un proveedor le parece elevada, cuestione en primer lugar esas partidas.
- **Quedan excluidos:** el centro de recuperación ante desastres, los entornos que no sean de producción, los racks y la alimentación eléctrica, los gastos de envío y los aranceles, el servicio de asistencia y las suscripciones, así como el almacenamiento en frío. Un centro de recuperación ante desastres dimensionado para el pico máximo de carga duplica aproximadamente el número de servidores.

---

## 4. Almacenamiento y replicación: qué no debe adquirir

Esta es la sección que los adoptantes deben comprender mejor, ya que es en la que las propuestas de los proveedores suelen desviarse más de lo que Mojaloop realmente necesita.

### Dónde se almacena el estado de «Mojaloop»

**Servicios sin estado.** Los Mojaloop servicios (Búsqueda de cuenta, Cotización, el adaptador API, los central-ledger controladores y la Liquidación) son servicios sin estado. No almacenan nada que no se pueda perder, por lo que se pueden ejecutar numerosas réplicas en cualquier nodo y escalarlas horizontalmente.

**Componentes con estado.** Todo el estado persistente se encuentra en un número reducido de componentes, y cada uno de ellos se replica en todos los nodos:

| Componente | Cómo se reproduce |
|---|---|
| Kafka | Tres copias de cada mensaje en tres servidores (factor de replicación 3) |
| MySQL (Clúster Percona XtraDB) | Clúster síncrono de tres nodos; cada confirmación (commit) se replica en todos los nodos antes de que se devuelva |
| Redis | Réplicas con conmutación por error |
| MongoDB | Conjunto de réplicas |

En las pruebas de rendimiento se utilizó un servidor primario de tipo «MySQL» con una réplica semisincrónica. Esto ofrece la misma garantía de datos que PXC, pero sin conmutación automática ante fallos.

**Por lo tanto, la capa de almacenamiento no necesita proporcionar redundancia, ya que la aplicación ya se encarga de ello.** Lo que debe caracterizar al almacenamiento es:
- **rapidez,** con una baja latencia de confirmación;
- **independencia,** lo que significa que cada réplica se encuentre en su propio nodo con sus propios discos.

Eso es NVMe local.

### Por qué SAN/NAS es un antipatrón para Mojaloop

Un SAN o un NAS no solo es innecesario para «Mojaloop», sino que, además, le perjudica directamente.

- **Redundante.** Los sistemas Kafka y MySQL ya conservan tres copias de los datos. Si se almacenan en una SAN con RAID-10 y duplicación de matriz a matriz, un mismo registro puede existir hasta doce veces. Usted paga por cada copia.
- **Más lento.** Kafka y la base de datos se vacía al disco en cada confirmación (commit). Con una SAN, cada vaciado supone un viaje de ida y vuelta por la red hasta la matriz. Esa latencia se suma a cada transferencia y limita su TPS.
- **Fallo compartido.** Este es un aspecto sutil. Ha colocado cuidadosamente tres réplicas en tres servidores para que fallen de forma independiente. Si los tres discos son volúmenes de la misma matriz, un fallo en el controlador, un error de firmware o una actualización defectuosa dejarán fuera de servicio los tres a la vez. Ha convertido un diseño con triple redundancia en un único punto de fallo.
- **Costoso.** La SAN conlleva varios gastos propios:
  - los propios conjuntos;
  - Switches Fibre Channel;
  - adaptadores de bus de host (HBA) en cada servidor;
  - licencias y contratos de asistencia técnica.

  En conjunto, estos suelen costar más que los servidores y el resto de componentes sumados. A modo de referencia, una SAN híbrida de gama económica con 500 TB de capacidad útil, una estructura de Fibre Channel redundante y 5 años de soporte técnico tenía un precio de venta al público en EE. UU. de entre 175 000 y 280 000 dólares aproximadamente en septiembre de 2026. Esto supone alrededor de un cuarto de millón de dólares estadounidenses por un único subsistema de almacenamiento, una cifra comparable o superior al coste total de los componentes de los servidores de una instalación con 1.000 TPS.

**La duplicación local es adecuada.** Una duplicación RAID1 local y económica en cada servidor de la serie MySQL es adecuada y está incluida en la lista de materiales recomendada. El antipatrón es la matriz compartida y su duplicación, no la protección de los discos locales.

**Un matiz, dicho con franqueza.** En las pruebas de rendimiento se utilizó AWS EBS, que en sí mismo está conectado a la red, y aun así se superaron. Por lo tanto, el argumento principal en contra de SAN/NAS es la duplicación, los fallos correlacionados y el coste. La latencia es un factor real, pero secundario, y es más importante para su p99.

> **En su lugar:** utilice NVMe local en cada nodo de datos, accesible a través de Kubernetes volúmenes persistentes locales, con réplicas distribuidas entre los distintos nodos y racks.

### Replicación de máquinas virtuales frente a replicación de aplicaciones

En muchos entornos empresariales, la alta disponibilidad (HA) y la replicación a nivel de hipervisor están habilitadas de forma predeterminada. Esto provoca problemas de compatibilidad con la replicación a nivel de aplicación.

| Hipervisor / replicación de almacenamiento | Replicación Kafka/MySQL |
|---|---|
| Copia bloques de disco, normalmente de forma asíncrona | Replica las transacciones confirmadas en un orden estricto, cuyo seguimiento se realiza mediante Kafka compensaciones y MySQL GTID (identificadores globales de transacción) |
| En el mejor de los casos, se garantiza la coherencia en caso de fallo para una máquina virtual a la vez, sin coordinación entre máquinas virtuales | Utiliza el quórum para decidir quién es el líder |
| No sabe nada sobre las transacciones, ni sobre quién es el líder «Kafka» o el «MySQL» primario | Diseñado para ser la única fuente de verdad definitiva |

**Cuando ambos se ejecutan, se producen conflictos:**
- **Doble ruta de escritura:** cada confirmación (commit) se replica dos veces, lo que aumenta la latencia y desperdicia ancho de banda sin aportar ningún beneficio.
- **Resurrección obsoleta:** el hipervisor reinicia una máquina virtual de base de datos o de intermediario que ha fallado a partir de su disco replicado. Esa copia está desactualizada, pero se inicia creyendo que está al día.
- **«Split brain»:** una partición de red desencadena una conmutación por error del hipervisor al mismo tiempo que la aplicación elige un nuevo líder, con lo que se acaba teniendo dos primarios que aceptan escrituras.

### Cómo se manifiesta, pues, esa recuperación, y cómo evitarla

**Síntomas observados tras una conmutación por error de este tipo:**
- **MySQL:** un miembro vuelve con transacciones que el resto del clúster no tiene, o le faltan algunas que sí tiene. El clúster detecta que el historial de transacciones del miembro (su conjunto de GTID) ya no coincide, lo rechaza y usted lo reconstruye a partir de un donante en buen estado. Ese es el resultado *favorable*.
- **Kafka:** un intermediario vuelve con un registro que diverge del de sus pares. Si se convierte en líder mediante una elección no limpia, los mensajes confirmados pueden perderse.
- **Máquinas virtuales restauradas:** si restaura varias máquinas virtuales a partir de réplicas, cada una de ellas se sitúa en un momento ligeramente diferente. La base de datos del libro mayor, las posiciones de los participantes y los Kafka compensaciones ya no coinciden.
- **Transferencias:** algunas se quedan atascadas a mitad de camino, y las posiciones de liquidación requieren una conciliación manual, en un Sistema de pagos, bajo presión.

**Recomendaciones:**
- **Deje que la propia aplicación se encargue de la replicación.**
- **En el caso de los componentes con estado,** desactive el reinicio de alta disponibilidad (HA) del hipervisor y la replicación de máquinas virtuales. Mejor aún, no utilice ningún hipervisor para ellos.
- **Cuando falle una réplica,** reconstrúyala a partir de sus réplicas en buen estado. Nunca restaure una imagen de máquina virtual obsoleta en un Clúster en funcionamiento.
- **En caso de desastres reales,** mantenga copias de seguridad adecuadas con recuperación a un momento determinado. Esto es algo distinto de la replicación.

---

## 5. Elección de la plataforma

### La recomendación: no se complique

La pila recomendada, de arriba abajo:

| Capa | Recomendación |
|---|---|
| Solicitudes | Mojaloop, Kafka, MySQL, Redis, MongoDB, implementado con Helm |
| Servicios de la plataforma | Código abierto: Prometheus, Grafana y Loki para la observabilidad; cert-manager para los certificados; un controlador de Ingress; y herramientas de GitOps para el Despliegue |
| Orquestación | Kubernetes Código abierto instalado directamente en un servidor físico, por ejemplo, RKE2, K3s, MicroK8s o kubeadm (en las pruebas de rendimiento se utilizó MicroK8s) |
| Sistema operativo | Linux estándar, por ejemplo, Ubuntu, SLES, Rocky |
| Hardware | Servidores x86 de gama media («un Volkswagen, no un Rolls-Royce») con NVMe local, 2 × 25 GbE y doble fuente de alimentación. Nada extraordinario. |

**¿Por qué «bare metal»?**
- **Sin sobrecarga ni licencias de hipervisor.**
- **Acceso directo al disco:** las bases de datos tienen acceso directo a NVMe.
- **No se pierde ninguna funcionalidad:** el «Kubernetes» ya ofrece la mayor parte de lo que se puede esperar de una capa de virtualización, a saber, programación, aislamiento, autorreparación y actualizaciones continuas.
- **Menos modos de fallo:** cada capa que se elimina es una capa que no puede fallar ni configurarse incorrectamente.

Así es como se saca el máximo partido a un hardware adecuado y económico.

### El compromiso: el código abierto frente a las plataformas de los proveedores

Se trata de un compromiso deliberado, y conviene ser sincero con respecto a ambas partes.

| Lo que obtendrá | Lo que usted asume | Cómo mitigar |
|---|---|---|
| Costes de licencia y de hardware considerablemente más bajos | Usted es responsable de la integración y las actualizaciones | Suscripciones opcionales de asistencia técnica comercial para distribuciones de código abierto Kubernetes y Linux, a una fracción del coste de las licencias de las plataformas propietarias |
| Sin ataduras: funciona igual tanto en la nube como en las instalaciones propias | No hay un único proveedor al que llamar a las 3 de la madrugada; la asistencia se basa, ante todo, en la comunidad | Formar y certificar a un equipo local encargado de la Plataforma |
| La misma pila con la que la comunidad prueba el valor Mojaloop | Se requieren conocimientos sólidos de ingeniería de plataformas | Integradores por contrato para operaciones, no para licencias |

El «Mojaloop Foundation» considera que esta opción es la más adecuada para la mayoría de los adoptantes.

## 6. Alta disponibilidad, RPO y RTO

### Cómo consigue «Mojaloop» la alta disponibilidad (HA)

| Capa | Mecanismo | Si se pierde un nodo |
|---|---|---|
| Servicios sin estado | Réplicas distribuidas entre los nodos (anti-afinidad); escalabilidad horizontal | No se produce ninguna interrupción. El tráfico en el nodo inactivo se detiene hasta que se redirige. |
| Kafka | Factor de replicación 3, mínimo 2 en sincronización, `acks = all`; elección de líder «unclean» desactivada | Los líderes han sido reelegidos en cuestión de segundos; no se ha perdido ningún mensaje confirmado |
| MySQL: Percona XtraDB Clúster | 3 nodos, prácticamente síncronos; un escritor a la vez a través de ProxySQL | Pérdida de escritura: el proxy realiza las escrituras en cuestión de segundos; no se pierde ninguna transferencia con confirmación (commit) |
| Quórum PXC | Si 2 de los 3 nodos siguen estando disponibles, el Clúster seguirá siendo grabable | Reincorporación de un nodo que ha fallado mediante la sincronización con un par (IST/SST) |
| Kubernetes. plano de control | 3 miembros de etcd | Sobrevive a la pérdida de uno |
| API diseño | Asíncrono, identificadores de transferencia de idempotencia, comprobaciones de duplicados | Los DFSP vuelven a intentar de forma segura las transferencias que estaban en curso |

**Los servicios sin estado** se ejecutan como réplicas distribuidas entre los nodos con anti-afinidad, por lo que ningún nodo concreto alberga todas las copias de ningún elemento. Si se pierde un nodo, no se produce ninguna interrupción del servicio. Los pods que siguen operativos continúan prestando servicio, aunque el tráfico que se encontraba en el nodo caído se detiene hasta que se redirige (véase más abajo).

**El Kafka** ejecuta tres réplicas, con un mínimo de dos sincronizadas. Los productores esperan a que todas las réplicas estén sincronizadas, y la elección de líderes «unclean» permanece desactivada. Un mensaje solo se confirma una vez que dos brokers lo tienen en su poder, por lo que la pérdida de un broker no supone la pérdida de ningún mensaje confirmado, y los nuevos líderes se eligen en cuestión de segundos.

**El libro mayor: Percona XtraDB Clúster.** El diseño recomendado para el libro mayor en entorno de producción es un Percona XtraDB Clúster de tres nodos.
- **Sin paso de Promoción:** cada confirmación (commit) se valida y se replica en todos los nodos antes de que se devuelva, por lo que cada nodo contiene todas las transferencias confirmadas.
- **Enrutamiento de un único escritor:** los tres nodos están activos y sincronizados, pero las escrituras se dirigen a un solo nodo cada vez a través de ProxySQL. El motivo es la carga de trabajo de «Mojaloop»: cada transferencia actualiza una de las pocas filas de posiciones de los participantes. Con varios escritores, las actualizaciones simultáneas en la misma fila no superan la certificación en el momento de la confirmación (commit), lo que, a estos ritmos, se traduce en una elevada tasa de confirmaciones rechazadas. El enrutamiento con un único escritor evita esta situación.
- **Pérdida de un escritor:** si el nodo escritor deja de funcionar, el proxy redirige las escrituras a otro nodo en cuestión de segundos.
- **Quórum:** basta con que dos de los tres nodos estén activos para que el Clúster siga siendo escribible, y un nodo que haya fallado se reincorpora sincronizándose con un nodo homólogo.

Tenga en cuenta que en los resultados de rendimiento publicados se utilizó un servidor primario de tipo «MySQL» con una réplica semisincrónica, y no PXC.

**El plano de control** cuenta con tres miembros de etcd y sigue funcionando aunque se pierda uno de ellos.

**El diseño «API»** también es importante. Las transferencias son asíncronas, cuentan con identificadores únicos y se comprueba que no haya duplicados, por lo que un «DFSP» que pierda una respuesta debido a un fallo puede volver a intentarlo de forma segura sin que se produzca un doble pago.

### Pérdida de un nodo: cómo se traducen realmente el RPO y el RTO

Una pregunta habitual: si se dispone de tres réplicas de todo, con replicación en Kafka y un Clúster de bases de datos síncrono, ¿por qué la pérdida de un nodo supondría algún coste?

**RPO: cero.** En lo que respecta a los datos, la pérdida de un nodo no supone ningún coste.
- **Las transferencias confirmadas** sobreviven a la pérdida de cualquier nodo.
- **Las transferencias en curso** nunca se confirmaron, por lo que el DFSP las vuelve a intentar y la Idempotencia garantiza que ello sea seguro.
- **Condiciones:** esto solo se cumple si:
  - todos los productores de la ruta de transferencia utilizan el valor `acks=all`;
  - la elección de líder «no limpia» permanece desactivada en Kafka;
  - el clúster de la base de datos mantiene el quórum.

**RTO: un breve estancamiento.** El tiempo de recuperación es otra historia, ya que cada mecanismo de conmutación por error debe detectar primero el fallo.
- **Detección de nodos:** por defecto, «Kubernetes» tarda entre 40 y 50 segundos en marcar un nodo como «NotReady» y retirar sus pods del servicio.
- **Reequilibrio de consumidores:** los Kafka pods de consumidores de ese nodo contienen particiones que permanecen sin procesar hasta que el grupo se reequilibra, lo que, por defecto, tarda unos 45 segundos.
- **Efecto:** no se produce ninguna interrupción del servicio, pero la parte de las transferencias que pasa por el nodo averiado se detiene durante aproximadamente un minuto, y algunas alcanzan los tiempos de espera de los clientes. Eso es lo que experimenta un «DFSP».

**Base de datos: segundos, no minutos.** Con Percona XtraDB Clúster, la base de datos ya no es la excepción.
- Cada nodo ya contiene todas las confirmaciones (commits), por lo que no hay ningún paso de Promoción ni de puesta al día.
- ProxySQL detecta el nodo de escritura que ha fallado y redirige las operaciones de escritura a un nodo operativo en cuestión de segundos.
- La única regla es escribir en un único nodo cada vez, ya que las filas en posición activa de «Mojaloop» provocarían conflictos de confirmación si hubiera varios nodos de escritura.

> **Para reducir el RTO,** utilice tiempos de espera más cortos (Kafka) para las sesiones de los usuarios, la detección de valores atípicos en la malla de servicios, pruebas de disponibilidad más estrictas y una detección más rápida de fallos en los nodos. Estas medidas reducen el tiempo de parálisis parcial a segundos, a costa de un mayor número de falsos positivos. **Tras cualquier fallo, su redundancia queda agotada hasta que se sustituya el nodo,** razón por la cual el dimensionamiento es N+1.

---

## 7. Funcionamiento de la plataforma

Adquirir la infraestructura adecuada supone la mitad del trabajo; gestionarla, la otra mitad.

- **Replicación ≠ copia de seguridad.** La replicación reproduce fielmente una migración defectuosa o una eliminación accidental en todas las réplicas. Realice copias de seguridad programadas con recuperación a un momento determinado, alméstelas fuera de las instalaciones y compruebe realmente que las restauraciones funcionan.
- **Observe todo.** Utilice Prometheus, Grafana y Loki. Esté atento a los retrasos en los consumidores (Kafka), a los retrasos en la replicación de la base de datos y a la latencia del disco; esas son sus señales de alerta tempranas.
- **Simule situaciones de fallo.** Realice simulacros periódicos: desconecte un nodo, un Switch, una fuente de alimentación y el nodo de escritura de la base de datos, según un calendario establecido. Un RTO que no haya demostrado es una esperanza, no una cifra, y la esperanza no es una estrategia.
- **Compruebe el rendimiento** en su propio equipo, antes de la puesta en marcha y tras cada actualización importante.
- **Asegure la plataforma.** mTLS, JWS e ILP forman parte de la configuración sometida a pruebas. Gestione adecuadamente PKI y el almacenamiento de claves, y mantenga una cadencia de aplicación de parches de seguridad.
- **Revise la capacidad** trimestralmente: tendencia de crecimiento frente al margen de capacidad, muy por delante de los picos conocidos.

---

## 8. De cara al futuro: TigerBeetle

La comunidad Mojaloop está trabajando para sustituir el Libro mayor MySQL por [TigerBeetle](https://tigerbeetle.com/), una base de datos diseñada específicamente para transacciones financieras. Esto afecta a las adquisiciones de las siguientes maneras:

- **Margen de rendimiento:** unas 450 000 transferencias nativas de TigerBeetle por segundo equivalen a unos 65 Mojaloop TPS (en el peor de los casos) en un clúster de producción con seis réplicas. No es necesario disponer de más núcleos ni de más memoria RAM para escalar el rendimiento; ya existe un amplio margen.
- **Latencia:** una menor latencia de escritura en las rutas más transitadas se traduce en una mejor latencia p99.
- **Escalabilidad:** un mejor rendimiento, de tipo sublineal, supone un rendimiento mucho mayor con el mismo hardware.
- **Aún se necesitan MySQL:** los metadatos de las transacciones siguen almacenándose en MySQL, por lo que sigue siendo necesario disponer de MySQL. Se necesitarán menos recursos, ya que se elimina la contienda, por lo que no será necesario añadir hardware.

> **Conclusión clave:** adquirir la versión actual del Libro mayor MySQL no le supondrá ningún inconveniente. Dispondrá de un mayor margen de crecimiento cuando actualice a la versión Mojaloop, que funciona con tecnología TigerBeetle.

---

## 9. Lista de comprobación para la contratación pública

Tenga esto en cuenta en su próxima licitación o revisión de diseño.

**Preguntas que debe plantearse antes de comprar cualquier cosa**

- [ ] SLA, RPO y RTO objetivo acordados con el Regulador
- [ ] TPS máximo y sostenido, con una previsión de crecimiento
- [ ] Topología del sitio seleccionada: dominios de fallo, testigo, recuperación ante desastres; PXC de tres nodos con conmutación por error mediante proxy
- [ ] Alimentación eléctrica diversa (alimentaciones A+B) y operadores de red diversos
- [ ] Se ha medido la latencia entre los sitios, no se ha calculado a partir de hipótesis

**Cómo debe ser la lista de materiales**

- [ ] Servidores de gama media con NVMe local; sin SAN ni NAS
- [ ] Kubernetes en «bare metal» de Código abierto; sin hipervisor bajo los componentes de datos
- [ ] Margen para N+1 en horas punta y un margen de reserva de aproximadamente el 30 %
- [ ] El presupuesto se destinará a la formación, el apoyo y los simulacros de emergencia, no a las licencias
- [ ] Una prueba de rendimiento satisfactoria del hardware entregado, estipulada en el contrato como criterio de aceptación

---

## 10. Cuestiones que deben resolverse en el marco de su esquema de pagos

Estas fueron las preguntas que sirvieron de punto de partida para el debate abierto de la sesión, y resultan útiles para cualquier equipo de planificación de esquemas de pagos:

- ¿Qué factores influyen en su decisión de optar por la nube o por las instalaciones propias?
- ¿Qué SLA espera su regulador o el reglamento de su sistema, y se ha plasmado ya en una topología de la red?
- Si tiene propuestas de proveedores sobre la mesa, ¿en qué aspectos difieren más del enfoque que se expone en esta guía?

---

## Glosario

| Término | Significado |
|---|---|
| **acks = todos** | Configuración «Kafka» del productor: un mensaje solo se confirma una vez que todas las réplicas sincronizadas lo hayan recibido |
| **Anti-afinidad** | Regla Kubernetes, que distribuye réplicas del mismo servicio entre distintos nodos |
| **DFSP** | Proveedor de servicios financieros digitales: participante en el esquema de pagos |
| **DR** | Recuperación ante desastres, normalmente en una sede secundaria |
| **etcd** | El estado del clúster de la tienda de consenso es «Kubernetes» |
| **FSPIOP / ISO 20022** | Los dos formatos de mensaje que admite APIMojaloop; los mensajes ISO 20022 son aproximadamente un 30 % más grandes |
| **GTID** | Identificador global de transacción: el identificador único de «MySQL» para cada transacción confirmada, que se utiliza para realizar un seguimiento de las transacciones que ha aplicado cada servidor |
| **HBA** | Adaptador de bus host: la tarjeta de interfaz instalada en cada servidor para conectarlo a una SAN, normalmente de Fibre Channel |
| **IST / SST** | Transferencia incremental / de instantánea de estado: cómo un nodo de Percona XtraDB Clúster se sincroniza con un nodo homólogo al volver a incorporarse |
| **ISR** | Réplicas sincronizadas: las Kafka réplicas se han puesto totalmente al día con el líder |
| **N+1** | La capacidad se ha dimensionado de tal forma que los servicios sigan cumpliendo su objetivo aunque falle cualquiera de los componentes. |
| **pág. 99** | Latencia del percentil 99: el 99 % de las solicitudes se completan en este tiempo |
| **PLP** | Protección contra cortes de corriente: condensadores del SSD que garantizan que las operaciones de escritura confirmadas se guarden en la memoria flash durante un corte de corriente |
| **PXC** | Percona XtraDB Clúster: un clúster «MySQL» síncrono basado en Galera |
| **RF** | Factor de replicación: el número de copias que Kafka conserva de cada mensaje |
| **RPO** | Objetivo de punto de recuperación: qué volumen de datos reconocidos se puede perder en caso de fallo |
| **RTO** | Objetivo de tiempo de recuperación: el tiempo que tarda el servicio en recuperarse tras un fallo |
| **RTT** | Tiempo de ida y vuelta: el tiempo que tarda un mensaje en llegar a otro sitio y en que la respuesta vuelva |
| **SAN / NAS** | Red de almacenamiento (SAN) / almacenamiento conectado a la red (NAS): matrices de almacenamiento compartidas y conectadas a la red |
| **Cerebro dividido** | Dos componentes de un Clúster, cada uno de los cuales cree que tiene el control y acepta operaciones de escritura de forma independiente |
| **Términos de referencia** | Switch de montaje en la parte superior del rack |
| **TPS** | Transferencias por segundo |

---

## Referencias

- Mojaloop. Workstream de rendimiento: [github.com/mojaloop/ml-perf-whitepaper-ws](https://github.com/mojaloop/ml-perf-whitepaper-ws). Contiene el código de infraestructura, Helm las modificaciones, los scripts de prueba y los informes completos de los escenarios correspondientes a las ejecuciones de 500, 1.000 y 2.000 TPS a las que se hace referencia en esta guía.

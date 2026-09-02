---
syncRef: af8ece4296e987223de16f4e0311366cb5e8d623
---

# Versionado

## Versionado de las versiones publicadas para los servicios principales del Switch

Este documento ofrece directrices sobre la estrategia de versionado que se usa para las versiones de los repositorios de código abierto de Mojaloop correspondientes a los servicios del Switch.

### Estrategia de versionado


#### Estándar para PI-11 en adelante
1. A partir de PI-11 (27 de julio de 2020), la orientación de versionado es pasar a un sistema de versiones estrechamente alineado con el versionado semántico, eliminando la dependencia del PI y del sprint. Así que, a partir de 11.x.x, la propuesta es pasar a [SemVer](https://semver.org/) puro.
2. A alto nivel, seguiremos usando el formato vX.Y.Z, pero X representa la versión ‘mayor’, Y representa la versión ‘menor’ y Z representa la versión de ‘parche’. Las correcciones menores y los parches afectan a los incrementos de ‘Z’, mientras que los cambios de funcionalidad no incompatibles afectan a los cambios de ‘Y; los cambios incompatibles afectan a la versión ‘X’.
3. Junto con esto, se usan sufijos como “-snapshot”, “-patch” y “-hotfix” según corresponda y cuando hace falta (con soporte en la configuración de CI).
4. Así que, a partir de 11.0.0 (principalmente para Helm, pero también para los servicios individuales) en PI-11, la propuesta es pasar a [SemVer](https://semver.org/) puro.
5. Esto implica que cualquier versión nueva de un paquete o servicio por debajo de X=11 (en los repositorios existentes, no en los nuevos) se establecerá primero como línea base en la v11.0.0 y, a partir de ahí, seguirá las directrices estándar de SemVer indicadas arriba. En los proyectos o repositorios nuevos, el versionado puede empezar en la v1.0.0 (una vez que alcanzan el estado de versión publicada)


#### Estrategia de versionado usada hasta PI-10
1. El sistema de versionado de Mojaloop (hasta PI-10) se inspira en el sistema de numeración de [versionado semántico](https://semver.org/) para las versiones publicadas.
2. Sin embargo, está personalizado para reflejar los plazos del proyecto Mojaloop, según los números de incremento de programa \(PI\) y de sprint
3. Por ejemplo, el número de versión v5.1.0 implica que esta versión fue la primera hecha durante el sprint 5.1, donde el sprint 5.1 es el primer sprint del PI-5. Así que, para una versión vX.Y.Z, X.Y es el número de sprint, donde X es el número de PI y Z representa el número de versión para ese repositorio concreto. El ejemplo v4.4.4 implica que la versión actual es la cuarta de cuatro versiones hechas en el sprint 4.4 \(del PI-4\)



### Versión actual

La información sobre la versión actual de Mojaloop se puede encontrar [aquí](../../deployment-guide/releases.md).

### Calendario de sprints para PI-13

A continuación está el calendario de sprints del incremento de programa 13, que termina con el evento comunitario del PI-14 en abril de 2021.

|Fase/hito|Inicio|Fin|Semanas|Notas|
|---|---|---|---|---|
|**Inicio presencial de la fase 5**|1/25/2021|1/29/2021|5 días| Seminarios web virtuales por Zoom|
|**Sprint 13.1**|02/01/2021|02/14/2021|2 semanas | |
|**Sprint 13.2**|02/15/2021|02/28/2021|2 semanas | |
|**Sprint 13.3**|03/01/2021|03/14/2021|2 semanas | |
|**Sprint 13.4**|03/15/2021|03/28/2021|2 semanas | |
|**Sprint 13.5**|03/29/2021|04/11/2021|2 semanas | |
|**Sprint 13.6**|04/12/2021|04/25/2021|2 semanas | |
|**Fase 5 PI-14**|04/26/2021|04/30/2021|5 días| Reuniones virtuales |

### Calendario de sprints para PI-12

A continuación está el calendario de sprints del incremento de programa 12, que termina con el evento comunitario del PI-13 en enero de 2021.

|Fase/hito|Inicio|Fin|Semanas|Notas|
|---|---|---|---|---|
|**Inicio presencial de la fase 4**|1/28/2020|1/30/2020|3 días| Johannesburgo|
|**Fase 4 PI-10 virtual**|4/21/2020|4/24/2020|4 días| Seminarios web virtuales por Zoom|
|**Fase 4 PI-11 virtual**|7/21/2020|7/24/2020|4 días| Seminarios web virtuales por Zoom|
|**Fase 4 PI-12 virtual**|10/19/2020|10/23/2020|5 días| Seminarios web virtuales por Zoom|
|**Sprint 12.1**|10/26/2020|11/15/2020|3 semanas | |
|**Sprint 12.2**|11/16/2020|11/29/2020|2 semanas | |
|**Sprint 12.3**|11/30/2020|12/13/2020|2 semanas | |
|**Sprint 12.4**|12/14/2020|12/27/2020|2 semanas | |
|**Sprint 12.5**|12/28/2020|01/10/2021|2 semanas | |
|**Sprint 12.6**|01/11/2021|01/24/2021|2 semanas | |
|**Inicio de la fase 5 / PI-13**|01/25/2021|01/29/2021|5 días| Por determinar |

### Calendarios de sprints anteriores:

### Calendario de sprints para PI-11

A continuación está el calendario de sprints del incremento de programa 11, que termina con el evento del PI 12.

|Fase/hito|Inicio|Fin|Semanas|Notas|
|---|---|---|---|---|
|**Inicio presencial de la fase 4**|1/28/2020|1/30/2020|3 días| Johannesburgo|
|**Fase 4 PI-10 virtual**|4/21/2020|4/24/2020|4 días| Seminarios web virtuales por Zoom |
|**Fase 4 PI-11 virtual**|7/21/2020|7/24/2020|4 días| Seminarios web virtuales por Zoom |
|**Sprint 11.1**|7/27/2020|8/9/2020|2 semanas| |
|**Sprint 11.2**|8/10/2020|8/23/2020|2 semanas| |
|**Sprint 11.3**|8/24/2020|9/6/2020|2 semanas| |
|**Sprint 11.4**|9/7/2020|9/20/2020|2 semanas| |
|**Sprint 11.5**|9/21/2020|10/4/2020|2 semanas| |
|**Sprint 11.6**|10/5/2020|10/18/2020|2 semanas | |
|**Fase 4 PI-12**|10/20/2020|10/23/2020|4 días| Por determinar |

#### Calendario de sprints para PI-10

A continuación está el calendario de sprints del incremento de programa 10, que termina con el evento del PI 11. Úselo como orientación durante los procesos de versionado y publicación.

|Fase/hito|Inicio|Fin|Semanas|Notas|
|---|---|---|---|---|
|**Fase 3 PI6 presencial**|4/16/2019|4/18/2019|3 días| Johannesburgo|
|**Fase 3 PI7 presencial**|6/25/2019|6/27/2019|3 días| Arusha|
|**Fase 3 PI8 presencial**|9/10/2019|9/12/2019|3 días| Abiyán|
|**Inicio presencial de la fase 4**|1/28/2020|1/30/2020|3 días| Johannesburgo|
|**Fase 4 PI 10 virtual**|4/21/2020|4/24/2020|5 días| Seminarios web virtuales por Zoom |
|**Sprint 10.1**|4/27/2020|5/10/2020|2 semanas| |
|**Sprint 10.2**|5/11/2020|5/24/2020|2 semanas| |
|**Sprint 10.3**|5/25/2020|6/7/2020|2 semanas| |
|**Sprint 10.4**|6/8/2020|6/21/2020|2 semanas| |
|**Sprint 10.5**|6/22/2020|7/5/2020|2 semanas| |
|**Sprint 10.6**|7/6/2020|7/19/2020|2 semanas | |
|**Fase 4 PI 11 presencial**|7/21/2020|7/23/2020|3 días| Kenia (tentativo) |

#### PI-9
|Fase/hito|Inicio|Fin|Semanas|Notas|
|---|---|---|---|---|
|**Sprint 9.1**|2/3/2020|2/16/2020|2 semanas| |
|**Sprint 9.2**|2/17/2020|3/1/2020|2 semanas| |
|**Sprint 9.3**|3/2/2020|3/15/2020|2 semanas| |
|**Sprint 9.4**|3/16/2020|3/29/2020|2 semanas| |
|**Sprint 9.5**|3/30/2020|4/12/2020|2 semanas| |
|**Sprint 9.6**|4/13/2020|4/19/2020|1 semana | |
|**Fase 4 PI 10 virtual**|4/21/2020|4/23/2020|5 días| Seminarios web virtuales por Zoom |

#### PI-8
|Fase/hito|Inicio|Fin|Semanas|Notas|
|---|---|---|---|---|
|**Sprint 8.1**|9/16/2019|9/29/2019|2 semanas| |
|**Sprint 8.2**|9/30/2019|10/13/2019|2 semanas| |
|**Sprint 8.3**|10/14/2019|10/27/2019|2 semanas| |
|**Sprint 8.4**|10/28/2019|11/10/2019|2 semanas| |
|**Sprint 8.5**|11/11/2019|11/24/2019|2 semanas| |
|**Sprint 8.6**|11/25/2019|12/8/2019|2 semanas| |
|**Sprint 8.7**|12/9/2019|1/5/2020|4 semanas| Pausa de Navidad|
|**Sprint 8.8**|1/6/2020|1/26/2020|3 semanas| 1 semana de preparación|
|**Inicio presencial de la fase 4**|1/28/2020|1/30/2020|3 días| Johannesburgo|

### Notas

1. Se hace una versión nueva del repositorio **helm** en función de los cambios de funcionalidad y de configuración hechos en los servicios principales y de los requisitos de la comunidad.

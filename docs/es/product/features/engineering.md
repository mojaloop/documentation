---
i18n_source_sha: e02c0f17d67c3cb620682aee6d6bb832f0b87f24
---

# Principios de ingeniería

Esta sección detalla los principios que subyacen a los aspectos de
ingeniería del Hub de Mojaloop.

## Registro de eventos 

Los mecanismos de registro estándar de la industria para contenedores
(stdout, stderr) son los predeterminados.

## Transferencias

1.  Los identificadores de recursos son únicos dentro de un esquema de pagos y el Hub los hace cumplir.

2.  Los métodos de la API que potencialmente pueden devolver grandes
    conjuntos de resultados se paginan de forma predeterminada.

3.  Las búsquedas del modelo de liquidación utilizan las monedas del DFSP pagador y del DFSP beneficiario.

4.  Los recursos y las entidades están tipificados para que puedan diferenciarse

5.  Los nombres (de objetos, métodos, tipos, funciones, etc...) son
    claros y no están abiertos a malinterpretación.

## Cuentas y saldos 

1.  La implementación del libro mayor utiliza un almacén de datos
    subyacente de consistencia fuerte.

2.  Los datos financieros críticos se replican en múltiples nodos
    distribuidos geográficamente de una manera que es de consistencia
    fuerte y de alto rendimiento, de modo que el fallo de múltiples
    nodos físicos no provoque ninguna pérdida de datos.

## Participantes 

1.  Los aspectos de conectividad de los participantes se gestionan en
    una capa de gateway para facilitar el uso de herramientas estándar de la industria.

## Escalabilidad y resiliencia 

1.  El rendimiento global de transferencias del sistema (las tres fases
    de la transferencia) es escalable de la manera más lineal posible
    mediante la adición de nodos de hardware básico de especificaciones bajas.

2.  Los datos críticos para el negocio pueden replicarse en múltiples
    nodos distribuidos geográficamente de una manera que es de
    consistencia fuerte y de alto rendimiento; el fallo de múltiples
    nodos físicos no provocará ninguna pérdida de datos.

## Especificación de Mojaloop 

1.  Se admite JWS

2.  Debería admitirse TLS v1.2 con autenticación mutua (x.509) entre
    los participantes y el Hub

## General 

1.  El procesamiento específico del contexto se realiza una sola vez y
    los resultados se almacenan en caché en memoria cuando se requieren posteriormente en la misma pila de llamadas.

2.  Todos los mensajes de registro contienen información contextual.

3.  Los fallos se anticipan y se gestionan de la forma más elegante posible.

4.  Las consultas entre procesos o por red solicitan únicamente los datos necesarios.

5.  Las capas de abstracción se mantienen en el mínimo absoluto.

6.  La comunicación entre procesos utiliza el mismo mecanismo de
    transporte siempre que sea posible.

7.  Los agregados no mantienen estado.

## Aplicabilidad

Esta versión de este documento corresponde a la versión [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0) de Mojaloop

## Historial del documento
|Versión|Fecha|Autor|Detalle|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|14 de abril de 2025| Paul Makin|Se eliminaron las secciones de despliegue|
|1.0|5 de febrero de 2025| James Bush|Versión inicial|
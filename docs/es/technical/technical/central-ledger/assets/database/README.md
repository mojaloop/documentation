---
i18n_source_sha: 77d71d79d7246c1e4e8ead753d3fc7937d829939
---

# Cómo EDITAR el archivo «central-ledger-schema-DBeaver.erd» 

Esta es una guía básica sobre cómo visualizar y actualizar correctamente el archivo «central-ledger-schema-DBeaver.erd».

## Requisitos previos
* Descargue e instale el gestor de bases de datos DBeaver Community
* La base de datos «Mojaloop Libro mayor MySQL» debe estar en funcionamiento y poder conectarse desde DBeaver
* También necesitará un editor de texto    
##  Pasos a seguir
* Cree una nueva conexión a la base de datos en DBeaver, en la pestaña «Database Navigator», para la instancia MySQL que se está ejecutando. 
* En la pestaña «Proyectos», haga clic con el botón derecho del ratón y cree un «Nuevo diagrama ER».
* Asigne un nombre al diagrama y seleccione «central-ledger db» en el asistente.

* Copie el archivo «`central-ledger-schema-DBeaver.erd`» del módulo de documentación a «`DBeaverData/workspace/General/Diagrams`» en su ubicación de almacenamiento de DBeaver
* Acceda al archivo ERD recién creado con un editor de texto, busque el valor «`data-source id`» y copie su valor, que es «`mysql5-171ea991174-1218b6e1bf273693`».
* Acceda con un editor de texto al archivo «`central-ledger-schema-DBeaver.erd`» del Directorio «ER Diagrams» y sustituya su valor «`data-source id`» por el que haya copiado del archivo «erd» recién creado.
* El «`central-ledger-schema-DBeaver.erd`» debería mostrar ahora las tablas tal y como se indica en el «`central-ledger-schema.png`».
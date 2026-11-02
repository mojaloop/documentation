---
i18n_source_sha: fd6adf7ab15b4230d9128d120bcb27c8df4da61f
---

# Guía para desarrolladores de informes
Esta es una guía para desarrolladores sobre cómo crear e implementar informes para el servicio de informes REST, que forma parte del Despliegue en el Hub.

## Arquitectura
![Architecture diagram of reporting service operator](../../.vuepress/public/RestReportingArchitecture.drawio.png)
[Here](https://github.com/mojaloop/reporting) se encuentra el repositorio del operador del servicio de informes.
El operador del servicio de informes se ha diseñado para que puedan acceder a él tanto un operador del Hub como un operador «DFSP».
El acceso al informe se controla a través de la integración RBAC que forma parte del marco de operaciones empresariales. Ory Oathkeeper protege el punto final de generación de informes API, y el Operador del servicio de generación de informes comprueba Keto para otorgar una autorización más detallada específica para cada informe.
Los datos del informe se extraen de la base de datos de SQL Reporting, que, en estos momentos, constituye una sincronización unidireccional con la base de datos del Libro mayor central.
Cada informe se instala en el sistema como un recurso personalizado de Kubernetes, que es un archivo .yaml con un formato concreto que se aplica al clúster de Kubernetes. [Here](https://github.com/mojaloop/reporting-k8s-templates) se encuentra el repositorio de las plantillas de informes de Código abierto. La definición del recurso personalizado para un informe se encuentra [here](https://github.com/mojaloop/reporting-k8s-templates/blob/master/crds/reporting-crd.yaml), donde se describe el formato del recurso personalizado.

## RBAC
El acceso a los informes se controla mediante el modelo RBAC cuando el servicio se despliega a través de la configuración estándar de IaC.
Esto significa que, para poder acceder a un informe, el usuario deberá disponer de la autorización adecuada. Esto se consigue mediante la asignación de roles al usuario y la concesión de acceso como participante.

La primera comprobación de autorización la realiza Ory Oathkeeper, que cuenta con una regla que vincula el 
```
reportingApi
```
Autorización para acceder al Endpoint API del servicio de informes.

La siguiente comprobación de autorización la realiza el operador del servicio de informes. Se comprueba el permiso para acceder al informe en cuestión. El permiso que se comprueba se define en el recurso personalizado. Este permiso es opcional; en su defecto, se utilizará el nombre (metadatos) del informe tal y como se define en el recurso del cliente. 
### Requisito de permiso «DFSP»
Si el informe está destinado a un participante concreto de «DFSP», es importante utilizar el parámetro «dfspId». Este parámetro comprueba primero la autorización del participante antes de ejecutar y generar el informe.
Es decir:
``` yaml
 params:
      - name: dfspId
        required: true
```
### Ejecutar el informe
En primer lugar, deberá iniciar sesión. La forma más sencilla de hacerlo es iniciar sesión en el Portal Financiero. De este modo se crean los tokens de autorización y autenticación que el informe utilizará posteriormente.
A continuación le mostramos un ejemplo de cómo acceder al informe directamente tras iniciar sesión. 
```
https://bofportal.YourEnvironment.YourDomain.com/proxy/reports/MyReportPath?ReportParamter=25
```

### formatos de salida de los informes
El informe admite varios formatos de salida. Para cambiar entre ellos, utilice el parámetro «format» en la consulta REST.
1. Archivo de Excel 
```
&format=xlsx
```
2. Valores separados por comas
```
&format=csv
```
3. Formato de clase JSON
```
&format=json
```
4. Formato HTML para navegadores (este es el formato de salida predeterminado)
```
&format=html
```

## Kubernetes. Recurso personalizado
Todos los aspectos de un informe se controlan a través del archivo de recursos personalizado «mojaloopreport». La definición de dicho archivo es la siguiente.

### Definición de recurso personalizado para clientes
``` yml
kind: CustomResourceDefinition
apiVersion: apiextensions.k8s.io/v1
metadata:
  name: mojaloopreports.mojaloop.io
spec:
  group: mojaloop.io
  scope: Namespaced
  names:
    plural: mojaloopreports
    singular: mojaloopreport
    shortNames:
      - mlreport
    kind: MojaloopReport
    listKind: MojaloopReportList
  versions:
    - name: v1
      served: true
      storage: true
      schema:
        openAPIV3Schema:
          description: MojaloopReport is the Schema for MojaloopReport API
          type: object
          properties:
            apiVersion:
              description: >-
                APIVersion defines the versioned schema of this representation
                of an object. Servers should convert recognized schemas to the
                latest internal value, and may reject unrecognized values. More
                info:
                https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
              type: string
            kind:
              description: >-
                Kind is a string value representing the REST resource this
                object represents. Servers may infer this from the endpoint the
                client submits requests to. Cannot be updated. In CamelCase.
                More info:
                https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
              type: string
            metadata:
              type: object
            spec:
              description: MojaloopReport.spec describes the desired state of my resource
              type: object
              required:
                - endpoint
                - queries
                - template
              properties:
                permission:
                  description: Permission to be needed to access this report. This is optional. If unspecified, the name of the resource will be considered as permission.
                  type: string
                endpoint:
                  description: Reporting endpoint
                  type: object
                  required:
                    - path
                  properties:
                    path:
                      description: Report URL path
                      type: string
                    params:
                      description: Report query params
                      type: array
                      items:
                        description: Query param
                        type: object
                        required:
                          - name
                        properties:
                          name:
                            description: Query param name
                            type: string
                          required:
                            description: Make query param required
                            type: boolean
                          default:
                            description: Default query param value
                            type: string
                queries:
                  description: The list of queries used in ejs reporting template
                  type: array
                  items:
                    description: permission ID.
                    type: object
                    required:
                      - name
                      - query
                    properties:
                      name:
                        description: Variable name that the query result will be assigned to
                        type: string
                      query:
                        description: SQL query
                        type: string
                template:
                  description: ejs reporting template
                  type: string

            status:
              description: The status of this MojaloopReport resource, set by the operator.
              type: object
              properties:
                state:
                  description: The state of the report.
                  type: string
      additionalPrinterColumns:
        - name: endpoint
          type: string
          description: Reporting endpoint
          jsonPath: .spec.endpoint.path
  conversion:
    strategy: None
```
Puede encontrar ejemplos de informes que se ajustan a este recurso personalizado [here](https://github.com/mojaloop/reporting-k8s-templates/tree/master/templates).
Tenga en cuenta que estos archivos YAML también contienen **directivas Helm**, que se indican mediante llaves dobles. 
```
{{ some helm directive / function }}
```
Si tiene intención de aplicar manualmente estos archivos a Kubernetes, será necesario eliminarlos o sustituirlos.

### Kubectl
Puede utilizar el siguiente comando para aplicar un recurso personalizado de informe a una instancia de Kubernetes.
  ```
  kubectl apply -f resources/examples/participant_list.yaml
  ```

Veamos algunos de los detalles del recurso personalizado para clientes.

### Controle cómo se ejecuta el informe
La primera parte de las especificaciones del informe define cómo se invoca dicho informe.
Es decir,
``` yaml
spec:
  permission: report-dfsp-settlement-detail
  endpoint:
    path: /dfspSettlementDetail
    params:
      - name: settlementId
        required: true
      - name: fspid
        required: true
```
- **Permiso**: aquí es donde se define la etiqueta de permiso RBAC para este informe
- **ruta**: esta es la ruta del Endpoint de este informe
- **parámetros**: aquí se definen los parámetros del informe y se especifica si son obligatorios o no.

### Controle de dónde obtiene el informe sus datos
``` yaml
queries:
    - name: dfspInfo
      query: |
        SELECT participantId, name FROM participant WHERE name = :fspid AND name != 'Hub'
    - name: report
      query: |
        SELECT
                pCPayer.participantId as payerFspid,
```
En la sección de consultas, se puede definir cualquier número de consultas que se ejecutarán en la base de datos de informes y se cargarán en clases JSON con nombre.
Los parámetros de entrada se pueden utilizar en las consultas colocando dos puntos delante del nombre del parámetro. Por ejemplo:
```
:paramname
```
### Controle el aspecto de los informes
La parte de la plantilla del archivo de recursos personalizados contiene un script EJS que se utiliza para generar el informe.
Estos scripts tienen el aspecto de código HTML con estilo, pero contienen código dentro de bloques de script
``` ejs
<% ejs script %>
```
Los scripts de EJS son bastante versátiles y pueden utilizarse para modificar el texto de un nombre, definir funciones de formato o crear bucles que recorran los datos.

## Configuración de su entorno de desarrollo
*(Instalación de este servicio de forma local para facilitar el desarrollo.)*
Actualmente, la única forma de validar el diseño del informe es aplicarlo al Kubernetes en el que se ejecuta el servicio de generación de informes. El servicio de generación de informes validará inicialmente el informe y, a continuación, habilitará el Endpoint. El informe se puede ejecutar y comprobar para ver si cumple con los requisitos establecidos.

Este documento ofrece instrucciones para implementar este servicio de forma local, de modo que un desarrollador pueda probar sus diseños antes de instalar el informe en un entorno.
Dado que el servicio de informes sigue el patrón de operador de K8S, debemos implementar un clúster mini-Kubernetes en nuestro equipo e implementar el servicio de informes junto con algunos servicios dependientes.

### Requisitos previos
- Asegúrese de que tiene instalados los siguientes programas
  - git
  - Docker
  - minikube
  - kubectl
  - timón
  - mysql-client

### Instalar K8S
- Inicie el clúster K8S de minikube con el siguiente comando
  ```
  minikube start --driver=docker --kubernetes-version=v1.21.5
  ```

### Clone el repositorio
- Descargue el repositorio
  ```
  git clone https://github.com/mojaloop/reporting.git
  cd reporting
  ```

### Despliegue un gráfico de Helm
- Instale Helm Chart mediante los siguientes comandos
  ```
  helm dep up ./resources/test-integration/
  helm install test1 ./resources/test-integration/ --set reporting-legacy-api.image.tag=v11.0.0
  ```
- Espere a que todos los servicios estén en funcionamiento
  Puede realizar el monitoreo del estado de los pods o utilizar los siguientes comandos para esperar a que los servicios estén disponibles
  ```
  kubectl -n default rollout status deployment test1-reporting-legacy-api
  kubectl -n default rollout status statefulset mysql
  ```

### Restaurar la copia de seguridad de la base de datos MySQL
- Redirija los puertos del servicio MySQL
  ```
  kubectl port-forward -n default service/mysql 3306:3306
  ```
- Introduzca datos de ejemplo en la base de datos. Puede modificar el nombre de la base de datos y el nombre del archivo en el siguiente comando según sus necesidades.
  ```
  mysql -h127.0.0.1 -P3306 -uuser -ppassword default < ./resources/examples/participants_db_dump.sql
  ```

### Cargar plantilla de informe
- Añada el recurso personalizado mediante el siguiente comando
  ```
  kubectl apply -f resources/examples/participant_list.yaml
  ```

### Consulte el informe
- Redireccione los puertos del servicio de informes
  ```
  kubectl port-forward -n default service/test1-reporting-legacy-api 8080:80
  ```
- Para obtener el informe, abra el siguiente enlace URL en su navegador
  ```
  http://localhost/participant-list
  ```

### Limpieza
- Limpieza
  ```
  kubectl delete -f resources/examples/participant_list.yaml
  helm uninstall test1
  minikube stop
  ```

## Despliegue en un entorno de producción
Existen varias formas de realizar el despliegue de un recurso personalizado de informes en un entorno. El método que se ha elegido e integrado en la oferta de IaC implica el uso de un gráfico Helm. (Esto encaja perfectamente con otros componentes de Mojaloop).

La infraestructura como código (IaC) permite tanto el despliegue público como el privado de los informes. El proceso es idéntico, salvo por el hecho de que el repositorio es privado y se encuentra dentro del control de versiones de la organización.
A grandes rasgos, el proceso es el siguiente:
1. Cree una rama y realice la confirmación (commit) de los cambios en el repositorio desde el que se despliega el informe.
2. Crear una solicitud de incorporación de cambios (pull request) y fusionar los cambios en la rama «master» del repositorio.
3. Crear una nueva versión en el repositorio. (Dependiendo de la configuración, esto suele activar un mecanismo de CICD que compila y publica el paquete Helm.)
4. Actualice la infraestructura como código (IaC) para desplegar la nueva versión de Helm para los informes.
5. Ejecute el pipeline adecuado para llevar a cabo el Despliegue.


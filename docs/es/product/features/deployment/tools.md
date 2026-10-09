---
i18n_source_sha: ed3f77c3e6fa30a69c1eb15f891b0ef998781420
---

# Herramientas de despliegue de Mojaloop

Este documento describe las tres opciones de despliegue de Mojaloop, ordenadas por complejidad y preparación para producción. Cada herramienta atiende casos de uso y escenarios de despliegue específicos.

## Core Test Harness

<div style="display: flex; align-items: center; margin-bottom: 20px;">
    <div style="width: 20px; height: 20px; background-color: rgba(46, 204, 113, 0.3); margin-right: 10px;"></div>
    <span>Entorno de desarrollo y pruebas</span>
</div>

El Core Test Harness proporciona un entorno de desarrollo de un solo nodo utilizando docker-compose. Esta herramienta implementa un stack mínimo de Mojaloop sin componentes de producción, lo que la hace adecuada para desarrollo y pruebas.

> **🔗 Documentación técnica:**  
> **BRECHA** - No se encontró documentación técnica dedicada para el Core Test Harness. Referencias relacionadas en:
> - [Guía de despliegue - Despliegue previo del backend con Helm](../../../technical/technical/deployment-guide/README.md#_5-1-prerequisite-backend-helm-deployment) (menciona ejemplos de docker-compose)
> - [Notas de la versión](../../../technical/technical/releases.md) (menciona la validación de Core-test-harness)

### Detalles de implementación

El Core Test Harness se ejecuta en una sola máquina y utiliza docker-compose para la orquestación. Despliega los servicios principales y los servicios de soporte sin componentes de grado productivo como gateways, ingress/egress o stacks de IAM. La implementación usa perfiles configurables para gestionar distintos escenarios de despliegue.

Los requisitos de recursos incluyen una computadora portátil o una estación de trabajo de escritorio de gama media con suficiente memoria para la orquestación de contenedores. La herramienta se integra con pipelines de CI para pruebas y validación automatizadas.

### Flujo de trabajo de desarrollo

Los desarrolladores interactúan con el Core Test Harness mediante comandos de docker-compose. La herramienta admite flujos de trabajo de desarrollo local con capacidades de recarga en caliente. La configuración se realiza mediante variables de entorno y archivos de override de docker-compose.

### Capacidades de pruebas

El Core Test Harness permite realizar pruebas unitarias, pruebas de integración y pruebas de extremo a extremo de los componentes de Mojaloop. Proporciona un entorno controlado para probar las interacciones entre servicios y validar la lógica de negocio.

## HELM Deploy

<div style="display: flex; align-items: center; margin-bottom: 20px;">
    <div style="width: 20px; height: 20px; background-color: rgba(230, 126, 34, 0.3); margin-right: 10px;"></div>
    <span>Solución de despliegue en producción</span>
</div>

HELM Deploy proporciona capacidades de despliegue listas para producción mediante charts de HELM. Esta implementación requiere un clúster de Kubernetes preconfigurado e implementa requisitos de seguridad y rendimiento de grado productivo.

> **🔗 Documentación técnica:**  
> - [Guía de despliegue de Mojaloop](../../../technical/technical/deployment-guide/README.md) - Documentación completa del despliegue con HELM
> - [Guía de estrategia de actualización](../../../technical/technical/deployment-guide/upgrade-strategy-guide.md) - Procedimientos de actualización de HELM  
> - [Resolución de problemas de despliegue](../../../technical/technical/deployment-guide/deployment-troubleshooting.md) - Problemas comunes y soluciones

### Requisitos de infraestructura

El despliegue requiere:
- Un clúster de Kubernetes endurecido
- Políticas de red y configuraciones de seguridad
- Definiciones de clases de almacenamiento
- Cuotas y límites de recursos

### Especificaciones de rendimiento

La implementación debe cumplir estos criterios de rendimiento:
- Más de 1000 TPS sostenidas durante una hora
- Latencia del percentil 99 inferior a 1 segundo para:
  - Operaciones de compensación
  - Operaciones de búsqueda
  - Acuerdo de términos
- Disponibilidad del 99.99%
- RTO/RPO cero para las operaciones críticas

### Implementación de seguridad

La implementación de seguridad incluye:
- Aplicación de políticas de red
- Políticas de seguridad de pods
- Integración con service mesh
- Gestión de secretos
- Gestión de certificados

## Infraestructura como código

<div style="display: flex; align-items: center; margin-bottom: 20px;">
    <div style="width: 20px; height: 20px; background-color: rgba(231, 76, 60, 0.3); margin-right: 10px;"></div>
    <span>Solución de despliegue empresarial</span>
</div>

La implementación de infraestructura como código (IaC) proporciona una solución de despliegue integral que admite múltiples plataformas y capas de orquestación. Implementa patrones de GitOps para gestionar varias instancias del Hub.

> **🔗 Documentación técnica:**  
>  **BRECHA** - Documentación técnica interna limitada sobre la instalación y la configuración de IaC
> - [Guía de instalación de IaC](../../../getting-started/installation/installing-mojaloop.md) - Descripción general básica de IaC (véase el punto 2)
> - [Blog sobre el despliegue con IaC](https://infitx.com/deploying-mojaloop-using-iac) - Guía detallada externa
> - [Repositorio de la plataforma IaC para AWS](https://github.com/mojaloop/iac-aws-platform) - Implementación específica para AWS

### Compatibilidad de plataformas

La implementación admite:
- Despliegue en AWS mediante CloudFormation/Terraform
- Despliegue on-premises mediante Terraform
- Despliegue multinube mediante módulos agnósticos del proveedor
- Múltiples distribuciones de Kubernetes:
  - Servicios de k8s gestionados
  - Microk8s
  - EKS

### Arquitectura del centro de control

El centro de control implementa patrones de GitOps para:
- La gestión de múltiples entornos
- El versionado de la configuración
- La automatización del despliegue
- La gestión del estado
- La detección de desvíos

### Despliegue de componentes

La implementación despliega:
- Los servicios del centro de control
- Los servicios principales de Mojaloop
- Los servicios de soporte
- Las aplicaciones de portal
- La infraestructura de IAM
- El stack de monitoreo
- Los componentes de PM4ML

### Rendimiento y seguridad

La implementación de IaC exige:
- Controles de seguridad de grado productivo
- Requisitos de rendimiento equivalentes a los de HELM Deploy
- Configuraciones de alta disponibilidad
- Procedimientos de recuperación ante desastres
- Requisitos de cumplimiento

## Historial del documento
|Versión|Fecha|Autor|Detalle|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|5 de junio de 2025| Tony Williams|Se agregaron enlaces a la documentación técnica| 
|1.0|14 de mayo de 2025| Tony Williams|Versión inicial|
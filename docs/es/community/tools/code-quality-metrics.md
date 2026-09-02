---
syncRef: 10fb6286c2fca63aad808dfdf10fc034e3dd84d3
---

# Métricas de calidad del código

## Métricas de calidad funcional

### Métricas de pruebas unitarias

Una cobertura alta y pocas dependencias demuestran que el código es comprobable y, por lo tanto, está bien aislado y es fácil de mantener. Una complejidad baja también hace que el código sea legible y mantenible, y ayuda a imponer la responsabilidad única. Las pruebas unitarias reales se ejecutan muy rápido porque no llaman a componentes externos.

| Métricas de calidad del código | Código nuevo y del proyecto |
| :--- | :--- |
| Cobertura de pruebas unitarias | &gt;= 80% de cobertura de bloques |
| Velocidad de las pruebas unitarias | &lt;= 10 segundos |
| Dependencias/método | &lt;= 10 |
| Complejidad/método | &lt;= 7 |

### Componente

Las pruebas funcionales suelen cubrir combinaciones por pares de los estados del sistema.

### Integración

Las pruebas funcionales tienen una prueba por cada mensaje y error. Los mensajes y errores que se manejan de la misma forma usan la misma prueba.

### Contrato

Se limita a lo que necesitan los equipos consumidores y que no está cubierto por las pruebas unitarias, de componente y de integración existentes. A menudo se amplía con el tiempo.

### De extremo a extremo

Las pruebas de extremo a extremo cubren las pruebas de aceptación derivadas de los escenarios.

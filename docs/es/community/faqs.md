---
syncRef: 10fb6286c2fca63aad808dfdf10fc034e3dd84d3
---

# Uso de Vue en Markdown

## Restricciones de acceso a las API del navegador

Dado que las aplicaciones de VuePress se renderizan en el servidor con Node.js al generar compilaciones estáticas, todo uso de Vue debe cumplir los [requisitos de código universal](https://ssr.vuejs.org/en/universal.html). En resumen, asegúrese de acceder a las API del navegador o del DOM únicamente en los hooks `beforeMount` o `mounted`.

Si utiliza o muestra componentes que no son compatibles con el SSR (por ejemplo, que contienen directivas personalizadas), puede envolverlos dentro del componente integrado `<ClientOnly>`:

##

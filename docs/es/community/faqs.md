---
i18n_source_sha: 71ac45b7706943cfb4a10cfe6598477e516804f8
---

# Uso de Vue en Markdown

## Restricciones de acceso a las API del navegador

Dado que las aplicaciones de VuePress se renderizan en el servidor con Node.js al generar compilaciones estáticas, todo uso de Vue debe cumplir los [requisitos de código universal](https://ssr.vuejs.org/en/universal.html). En resumen, asegúrese de acceder a las API del navegador o del DOM únicamente en los hooks `beforeMount` o `mounted`.

Si utiliza o muestra componentes que no son compatibles con el SSR (por ejemplo, que contienen directivas personalizadas), puede envolverlos dentro del componente integrado `<ClientOnly>`:

##

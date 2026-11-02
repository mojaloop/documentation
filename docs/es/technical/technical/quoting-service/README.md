---
version: 1.1
i18n_source_sha: 82d89526e232f48b143414b63f43383e3e1a3a98
---

# Descripción general del servicio de cotización
El **Servicio de Cotizaciones** (**QS**) _(véase la sección `5.1`), de conformidad con la [Mojaloop  {{ $page.frontmatter.version }} Specification](/technical/api/), lleva a cabo la fase de cotización de los distintos casos de uso.

_Nota: Además de las cotizaciones individuales, el servicio de cotizaciones también admite cotizaciones masivas._

## Diagrama de secuencia

![](./assets/diagrams/sequence/seq-quotes-1.0.0.svg)

## Citas individuales

- [GET: recuperar una cotización por identificador](qs-get-quotes.md)
- [PUBLICACIÓN: solicitud de cotización](qs-post-quotes.md)

## Cotizaciones para grandes cantidades

- [GET: recuperar una cotización masiva por identificador](qs-get-bulk-quotes.md)
- [PUBLICACIÓN: solicitud de cotización por lotes request](qs-post-bulk-quotes.md)

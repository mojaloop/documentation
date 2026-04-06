---
version: 1.1
---

# Vue d’ensemble du service de cotation

Le **Quoting Service** (**QS**) — *(voir la section `5.1`)* de la [spécification Mojaloop {{ $page.frontmatter.version }}](/api) — prend en charge la phase de cotation des différents cas d’usage.

_Note : outre les cotations individuelles, le service de cotation prend aussi en charge les cotations groupées (*bulk quotes*)._

## Diagramme de séquence

![](./assets/diagrams/sequence/seq-quotes-1.0.0.svg)

## Cotations individuelles

- [GET — obtenir une cotation par identifiant](qs-get-quotes.md)
- [POST — demande de cotation](qs-post-quotes.md)

## Cotations groupées (*bulk*)

- [GET — obtenir une cotation groupée par identifiant](qs-get-bulk-quotes.md)
- [POST — demande de cotation groupée](qs-post-bulk-quotes.md)

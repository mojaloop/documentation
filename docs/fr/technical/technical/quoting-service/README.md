---
version: 1.1
---

# Vue d’ensemble du service de devis

Le **Quoting Service** (**QS**) — *(voir la section `5.1`)* de la [spécification Mojaloop {{ $page.frontmatter.version }}](/api) — prend en charge la phase de devis des différents cas d’usage.

_Note : outre les devis individuelles, le service de devis prend aussi en charge les devis groupés (*bulk quotes*)._

## Diagramme de séquence

![](./assets/diagrams/sequence/seq-quotes-1.0.0.svg)

## Devis individuelles

- [GET — obtenir une devis par identifiant](qs-get-quotes.md)
- [POST — demande de devis](qs-post-quotes.md)

## Devis groupées (*bulk*)

- [GET — obtenir une devis groupé par identifiant](qs-get-bulk-quotes.md)
- [POST — demande de devis groupé](qs-post-bulk-quotes.md)

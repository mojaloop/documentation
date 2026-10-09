---
i18n_source_sha: 32017ee06a2879406712df2bda449613b5ce56f8
---

## 7.1 GET /parties/{type}/{partyIdentifier}[/{subId}]
El endpoint GET /parties no admite ni requiere una carga útil, y puede entenderse como una instrucción para activar un informe de verificación de identificación de cuenta.
- **{type}** - Tipos de identificador de parte<br>
El **{type}** se refiere a la clasificación del tipo de identificador de parte. Cada esquema de pagos solo admite un número limitado de estos códigos. Los códigos admitidos por el esquema de pagos pueden derivarse de los códigos externos de identificación de organización o de persona de ISO 20022, o pueden ser códigos admitidos por FSPIOP. La lista completa de códigos admitidos está disponible en el [**Apéndice A**](../Appendix.md).
 - **partyIdentifier** <br>
 Este es el identificador de parte de la parte representada y es del tipo especificado por el {type} anterior.
 - **{subId}** <br>
 Representa un subidentificador o subtipo de la parte que algunas implementaciones requieren para garantizar la unicidad del identificador. 


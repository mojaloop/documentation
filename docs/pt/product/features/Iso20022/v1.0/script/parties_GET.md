## 7.1 GET /parties/{type}/{partyIdentifier}[/{subId}]
O endpoint GET /parties não permite nem requer um payload, e pode ser visto como uma instrução para desencadear um relatório de verificação de identificação de conta (Account Identification Verification report).
- **{type}** - Tipos de identificador da parte<br>
O **{type}** refere-se à classificação do tipo de identificador da parte. Cada scheme (o conjunto de regras do sistema de pagamentos) permite apenas um número limitado destes códigos. Os códigos permitidos pelo scheme podem derivar dos códigos ISO 20022 externos de identificação de organizações ou de pessoas, ou podem ser códigos permitidos pelo FSPIOP. A lista completa dos códigos permitidos está disponível no [**Anexo A**](../Appendix.md).
 - **partyIdentifier** <br>
 Este é o identificador da parte representada, do tipo especificado pelo {type} acima.
 - **{subId}** <br>
 Representa um subidentificador ou subtipo da parte que algumas implementações requerem para garantir a unicidade do identificador. 


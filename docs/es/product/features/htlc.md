---
i18n_source_sha: 8bedf0b08b3168523548da03005c4ec7e2af5d7f
---

# Contratos con bloqueo temporal por hash
Mojaloop utiliza los bloqueos criptográficos de ILP para garantizar transferencias atómicas y condicionales entre DFSP. El mecanismo se centra en los contratos con bloqueo temporal por hash (HTLC), que permiten a Mojaloop admitir transferencias condicionales — garantizando que una transferencia se complete íntegramente en todas las partes participantes o que no se complete en absoluto.

El contrato se acuerda entre el DFSP beneficiario y el DFSP pagador durante la fase de acuerdo de términos de una transacción de Mojaloop, que comienza cuando el DFSP pagador propone una transacción mediante una solicitud de cotización. 

Cuando el DFSP beneficiario está convencido de que la transacción puede seguir adelante (habiendo completado sus propias verificaciones internas), el DFSP beneficiario:
-	Modifica los términos propuestos de la transacción para establecer las condiciones en las que llevará a cabo la transacción (que podrían incluir, por ejemplo, las tarifas que cobrará y cualquier condición de cumplimiento normativo);
-	Crea el objeto Transaction, que define los términos en los que está dispuesto a honrar la solicitud de pago;
-	Crea y conserva el Fulfilment, que es un hash del objeto Transaction, firmado a su vez con la clave privada del DFSP beneficiario (una clave creada específicamente para este propósito y restringida a él);
-	Crea la Condición (condition), que es un hash del Fulfilment;
-	Agrega la Condición al objeto Transaction;
-	Y lo devuelve al DFSP pagador en una respuesta a la solicitud de cotización.

Si el DFSP pagador acepta los términos de la transacción, envía al Hub de Mojaloop una solicitud de transferencia compuesta por el objeto Transaction, la Condición recibida y un tiempo de expiración. 

El Hub de Mojaloop almacena la Condición y reenvía la solicitud de transferencia al DFSP beneficiario. También inicia un temporizador que coincide con el tiempo de expiración especificado. 

Al recibir la solicitud de transferencia, el DFSP beneficiario: 
-	Verifica que la Condición recibida coincide con la acordada (esto incluye una comprobación de que el pago solicitado es el mismo que el pago que acordó) y se asegura de que se han cumplido las condiciones de cumplimiento normativo;
-	Devuelve el Fulfilment al Hub de Mojaloop en una respuesta a la solicitud de transferencia.

El Hub de Mojaloop aplica un hash al Fulfilment devuelto para validar que coincide con la Condición recibida del DFSP pagador y, si tiene éxito, notifica al DFSP pagador (y al DFSP beneficiario, si así se ha solicitado) que se ha creado una obligación entre ellos; es decir, que el pago se ha compensado.

La notificación al DFSP pagador incluye el fulfilment, que actúa como prueba criptográfica de la finalización irrevocable. Si el DFSP pagador regenera la Condición y encuentra que ha cambiado respecto de la acordada, entonces debería plantear una disputa con el DFSP beneficiario.

Tenga en cuenta que si el temporizador de la transacción expira en el Hub antes de que se reciba el Fulfilment del DFSP beneficiario, el Hub notificará a cada DFSP que la transacción se ha cancelado.

## Aplicabilidad
Este documento corresponde a la versión 17.0.0 de Mojaloop
## Historial del documento
  |Versión|Fecha|Autor|Detalle|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|2 de julio de 2025| Paul Makin|Actualizado tras la revisión de Michael Richards|
|1.0|30 de junio de 2025| Paul Makin|Versión inicial|
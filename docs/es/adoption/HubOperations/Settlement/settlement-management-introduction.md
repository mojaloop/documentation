---
i18n_source_sha: b3b724d23776318a9b84bd5f467cfc4d5812d64f
---

# Introducción – Guía de gestión de la liquidación

Cuando se hace un pago en un sistema de pagos en tiempo real como Mojaloop, el DFSP que es custodio de la cuenta del beneficiario (el DFSP acreedor) acepta acreditar los fondos al beneficiario de inmediato. Pero el DFSP acreedor todavía no ha recibido los fondos del DFSP que es custodio de la cuenta del deudor: lo único que ha ocurrido hasta ese momento es que el DFSP deudor ha contraído la obligación de reembolsar al DFSP acreedor, y esa obligación se ha registrado en el Hub de Mojaloop.

El proceso de liquidación es el proceso por el que un DFSP deudor reembolsa a un DFSP acreedor las obligaciones que el DFSP deudor ha contraído como consecuencia de las transferencias. 

Esta guía describe cómo el Hub de Mojaloop y el banco o los bancos liquidadores asociados gestionan las liquidaciones, y presenta los principales componentes del procesamiento de la liquidación.

---
i18n_source_sha: 3bfcee97335d904c16a36c534aa482cdb61b3d7c
---

# Diagrama de secuencia para los participantes en el proceso POST (por lotes)

Diseño para la creación de un Participante por parte de un «DFSP» mediante una solicitud por lotes.

## Notas
- Esta operación solo admite solicitudes que contengan:
    - Todos los FSP de los participantes coinciden con el FSPIOP-Source7
    - Todos los participantes utilizarán la misma moneda, según la indicación «`POST /participants`» en el [Mojaloop FSPIOP API](/technical/api/fspiop/v1.1/api-definition.html#post-participants)  
- Las solicitudes POST duplicadas con el mismo valor de TYPE y el valor opcional de CURRENCY se considerarán una operación de __update__. El registro existente deberá **sustituirse** por completo en su totalidad. 

## Diagrama de secuencia

![](./assets/diagrams/sequence/seq-acct-lookup-post-participants-batch-7.1.1.svg)


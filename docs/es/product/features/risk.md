---
i18n_source_sha: 4d6dd0c60462a48862cfe11aab548447967648e3
---

# Gestión de riesgos

Un aspecto clave del funcionamiento de un esquema de pagos construido en
torno a un Hub de Mojaloop es la gestión del riesgo entre las partes que
transaccionan, que a su vez tendrán distintos apetitos de riesgo. Los
principios aplicados son:

1.  Todos los Participantes (FSP) deben depositar una forma acordada de
    liquidez con el socio de liquidación del Esquema de pagos. Esta
    liquidez solo puede retirarse, total o parcialmente, del Esquema de
    pagos con el acuerdo del Operador del Esquema de pagos.
    &nbsp;
2.  Una transacción solo se compensará (durante la fase de Transferencia)
    si hay suficiente liquidez disponible para cubrirla, medida frente al
    saldo de liquidez, la Posición actual del DFSP (el total neto de las
    transacciones compensadas previamente desde la última actividad de
    liquidación, ya sea como pagador o como beneficiario) y cualquier
    fondo reservado. 
    &nbsp;
3.  El valor de una transacción compensada se agregará a la Posición del DFSP pagador y se debitará de la Posición del DFSP beneficiario.
 &nbsp;
4.  Durante la liquidación, para cada DFSP, una Posición negativa se debitará del
    saldo de Liquidez y se transferirá al socio de liquidación para su
    distribución a los acreedores; una Posición positiva se acreditará al
    saldo de Liquidez por parte del socio de liquidación, utilizando fondos de los deudores. 
    &nbsp;
5.  Una liquidación exitosa elimina de la Posición de cada DFSP el valor representado por las transacciones de la ventana o el lote de liquidación asociado.
    &nbsp;
6.  Se espera que un DFSP gestione su liquidez, incrementándola si
    desciende a un nivel en el que los valores de transacción previstos
    darán lugar a transacciones fallidas, o retirando una parte (previa
    solicitud al operador del esquema de pagos) si el valor es demasiado
    alto. Esta actividad tiene lugar fuera de Mojaloop, pero es un
    requisito que se declare dentro del esquema de pagos de Mojaloop, ya
    sea por el DFSP o por el socio de liquidación.
    &nbsp;
7.  Cuando el socio de liquidación no está disponible 24/7, un DFSP puede
    depositar saldo adicional en su cuenta de liquidez, por ejemplo para
    cubrir las transacciones previstas durante un periodo festivo. Un
    DFSP puede gestionar este saldo adicional mediante un Límite de
    débito neto (NDC), que podría utilizarse, por ejemplo, para limitar
    el uso de la liquidez a los niveles previstos para un día
    determinado, con el fin de asegurar que el DFSP pueda seguir
    operando durante todo el periodo festivo. El NDC se utiliza junto
    con el saldo de liquidez en la autorización de transacciones durante
    la fase de Cotización.
    
## Aplicabilidad

Esta versión de este documento corresponde a la versión [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0) de Mojaloop

## Historial del documento
  |Versión|Fecha|Autor|Detalle|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|14 de abril de 2025| Paul Makin|Actualizaciones relacionadas con el lanzamiento de la V17|
|1.0|13 de marzo de 2025| Paul Makin|Versión inicial|
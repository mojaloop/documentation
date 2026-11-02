---
i18n_source_sha: 76b8654c8f9e781900909073adf3270309ae3cd1
---

# Auditoria na Colúmbia Britânica

O Auditing BC é responsável por manter um registo imutável de todas as transações que ocorrem no switch. A arquitetura é composta por cinco componentes principais:

* Serviço Central de Registo Forense
* Serviços
* Base de dados imutável
* Sistema de Gestão de Chaves
* Provedor Criptográfico[^1] Modular

Os utilizadores autorizados podem consultar o BC de Auditoria através da Operação API, disponibilizada para esse efeito, para obterem detalhes sobre eventos passíveis de auditoria.

## Termos

Termos com um significado específico e geralmente aceite no Contexto Delimitado em que são utilizados.

| Termo | Descrição |
|---|---|
| **KMS** | Sistema de Gestão de Chaves — Fornece serviços de encriptação/desencriptação e de Autoridade Certificadora ao ambiente do switch (emissão, assinatura e verificação através do Security BC)  |
| **CPM** | Módulo de Criptografia - Gere as técnicas e metodologias criptográficas utilizadas pelo switch para prestar serviços de encriptação e desencriptação de ponta a ponta para quaisquer dados armazenados ou transmitidos. |

## Visão geral das funcionalidades

![Use Case - Auditing System Functional Overview](./assets/ML2RA_Audit_bcFunctionalOverview_Mar22_1450.png)
> Diagrama funcional da BC: Visão geral funcional do sistema de auditoria

## Casos de uso

### Auditoria à BC Startup

#### Descrição

O BC de Auditoria de Arranque UC é acionado durante o arranque (intervalos ou eventos) e obtém todas as chaves públicas utilizadas pelos vários BC participantes do switch a partir do BC de Segurança que presta serviços KMS a todos os BC participantes do switch.

#### Diagrama de fluxo

![Use Case - Auditing BC Startup](./assets/ML2RA_Audit_ucAuditingBCStartup_Mar22_1450.png)
> Diagrama de fluxo de trabalho da UC: Auditoria do arranque do BC

### Auditoria de sincronização/RPC

#### Descrição

A UC de Auditoria Sync/RPC é ativada para eventos passíveis de auditoria desencadeados durante uma transação registada por um BC participante. O BC participante procede à notificação do BC de Auditoria através de uma chamada de auditoria RPC síncrona. A entrada de auditoria é assinada localmente pelo BC notificador.  Após a receção, o BC de Auditoria executa uma série de procedimentos que incluem a execução de um procedimento KMS com o BC de Segurança e a gravação do registo num armazenamento de apenas adição.

#### Diagrama de fluxo

![Use Case - Sync/RPC Audit](./assets/ML2RA_Audit_ucSyncRPCAudit_Mar22_1450.png)
>Diagrama de fluxo de trabalho da UC: Auditoria de sincronização/RPC

### Auditoria baseada em eventos

#### Descrição

A UC de Auditoria Baseada em Eventos é acionada quando um BC participante inclui capacidade de auditoria local, regista um evento passível de auditoria e cria um evento de auditoria assinado localmente, o qual publica e, em seguida, envia um único evento ou um lote de eventos para o BC de Auditoria.  O evento é validado durante um procedimento com o BC de segurança e armazenado de forma permanente no repositório de gravação apenas de acréscimo.

#### Diagrama de fluxo

![Use Case - Event Based Audit](./assets/ML2RA_Audit_ucEventBasedAudit_Mar22_1450.png)
> Diagrama de fluxo de trabalho da UC: Auditoria baseada em eventos

<!-- Footnotes themselves at the bottom. -->
## Notes

[^1]: O termo «criptográfico» refere-se às técnicas e metodologias algorítmicas utilizadas pelos sistemas para impedir que sistemas ou pessoas não autorizadas acedam, identifiquem ou utilizem dados armazenados. Para mais informações, consulte o artigo da Wikipédia que acompanha este texto: [Criptografia, da Wikipédia, a enciclopédia livre](https://en.wikipedia.org/wiki/Cryptography)

[^2]: Interfaces comuns: [Mojaloop Lista de interfaces comuns](../../refarch/commonInterfaces.md)

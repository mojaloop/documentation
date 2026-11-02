---
i18n_source_sha: 761369b799cf783bb9cc88c2c6e8118843f41fb1
---

# Pesquisa e Identificação de Contas BC

O BC de Pesquisa e Identificação de Contas é responsável por localizar e associar participantes e partes a transações desencadeadas por uma parte ou por um participante.

## Termos

Os termos seguintes são utilizados neste BC, também conhecido como domínio.

| Termo | Descrição |
|---|---|
| **Participante** | Prestador de serviços financeiros |
| **Festa** | FSP Clientes |

## Visão geral das funcionalidades

![Use Case - Functional Overview](./assets/ML2RA_bc_accLookDiscvry_Apr22-b400.png)
>Diagrama funcional do BC: Visão geral da pesquisa e identificação de contas

## Casos de uso

#### Colaborador de eventos/participantes

#### Descrição

Quando um Participante DFSP solicita que um determinado ID de Parte seja associado a um Participante (ele próprio).

***Nota:*** *As verificações e validações dos dados KYC (Know Your Customer) não são abordadas neste documento, sendo da competência de processos externos às chamadas Mojaloop API, devendo ser abrangidas pelo scheme, a fim de garantir que os pedidos de associação (ou desassociação) são válidos.*

#### Diagrama de fluxo

![Use Case - Party/Participant Associate](./assets/aldPartyParticipantAssoc_20220919.png)
>Diagrama de fluxo da UC: Associado da parte/participante

### Exclusão de uma parte/participante

#### Descrição

Quando um Participante DFSP solicita que seja removida uma associação existente entre um determinado ID de Parte e um Participante (ele próprio).

#### Diagrama de fluxo

![Use Case - Party/Participant Disassociate](./assets/aldPartyParticipantDisassoc_20220919.png)
>Diagrama de fluxo de trabalho da UC: Desassociação de parte/participante




### Obter participante

#### Descrição

Quando um Participante DFSP solicita informações sobre a associação de um Participante com base num identificador de Parte, esta UC é utilizada pelo switch para validar o pedido e fornecer os dados de associação solicitados ao Participante DFSP requerente.

#### Diagrama de fluxo

![Use Case - Get Participant](./assets/aldGetParticipant_20210825.png)
>Diagrama de fluxo da UC: Obter participante

### Vá à festa

#### Descrição

Quando um participante DFSP solicita a outro participante DFSP os detalhes de uma Parte que o segundo DFSP detém, esta UC é utilizada para validar o pedido e fornecer os dados solicitados relativos à Parte ao participante DFSP que efetuou o pedido.

#### Diagrama de fluxo

![Use Case - Get Party](./assets/aldGetParty_20210825.png)
>Diagrama de fluxo da UC: Obter Parte

<!--## Notes -->
<!-- Footnotes themselves at the bottom. -->

[^1]: Interfaces comuns: [Mojaloop Lista de interfaces comuns](../../commonInterfaces.md)

---
i18n_source_sha: f2f59dd8ad5235f7c684e294bb6b5738601596b6
---

# Mojaloop Componentes antigos do hub - PI7

O diagrama de componentes que se segue apresenta a composição dos serviços «Mojaloop» e a sua arquitetura de microsserviços para a versão anterior à PI7: 

![Mojaloop Architecture Overview PI7](./assets/diagrams/architecture/Arch-Mojaloop-overview-PI7.svg)

_Nota: A codificação por cores indica a relação entre o armazenamento de dados e as ligações de transmissão de mensagens/adaptadores. Por exemplo, o `Central-Services` utiliza o `MySQL` como armazenamento de dados e recorre ao `Kafka` para a transmissão de mensagens_

---
i18n_source_sha: a3cb1b68663aba4d23decb2491bac62baef91724
---

# Mojaloop Componentes do Hub Legacy - PI3

O diagrama de componentes que se segue apresenta a composição dos serviços «Mojaloop» e a sua arquitetura de microsserviços para a fase pré-PI3: 

![Mojaloop Architecture Overview PI5](./assets/diagrams/architecture/Arch-Mojaloop-overview-PI3.svg)

_Nota: A codificação por cores indica a relação entre o armazenamento de dados e as ligações de transmissão de mensagens/adaptadores. Por exemplo, o `Central-Services` utiliza o `MySQL` como armazenamento de dados e recorre ao `Kafka` para a transmissão de mensagens_

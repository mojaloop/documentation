---
i18n_source_sha: f54ac4856b09e4e958799ffcfbe2f2fab3409796
---

# Mojaloop Componentes do Hub Legacy - PI5

O diagrama de componentes que se segue apresenta a composição dos serviços «Mojaloop» e a sua arquitetura de microsserviços para a versão anterior ao PI5: 

![Mojaloop Architecture Overview PI5](./assets/diagrams/architecture/Arch-Mojaloop-overview-PI5.svg)

_Nota: A codificação por cores indica a relação entre o armazenamento de dados e as ligações de transmissão de mensagens/adaptadores. Por exemplo, o `Central-Services` utiliza o `MySQL` como armazenamento de dados e recorre ao `Kafka` para a transmissão de mensagens_

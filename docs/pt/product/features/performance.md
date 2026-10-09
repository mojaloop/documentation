# Desempenho
Naturalmente, o desempenho em termos de débito (throughput) de transações - normalmente medido em transações por segundo - é uma métrica fundamental para os adotantes, que precisam de ter confiança em que o Mojaloop consegue satisfazer os seus requisitos, quer se trate de um deployment nacional, setorial ou multinacional.

Por este motivo, a Comunidade Mojaloop estabeleceu uma base de referência de desempenho, e trabalha continuamente para refinar e melhorar a eficiência do processamento de transações.

## Base de referência de desempenho

Foi demonstrado que a versão 17.0.0 do Hub Mojaloop apresenta as seguintes características de desempenho em hardware ***mínimo***:

- Compensação de 1000 transferências por segundo
- Sustentada durante uma hora
- Com não mais de 1% (da fase de transferência) a demorar mais de 1 segundo a atravessar o hub

Este desempenho de referência pode ser utilizado como ponto de referência para o dimensionamento do sistema e o planeamento de capacidade.

Naturalmente, é de esperar um desempenho superior com mais recursos de hardware.

## Expectativas futuras de desempenho

Prossegue o trabalho de substituição da atual tecnologia de razão geral do Mojaloop pela base de dados de transações financeiras [TigerBeetle](https://tigerbeetle.com/). Como o desempenho da razão geral é um elemento significativo do desempenho global do Mojaloop, espera-se um aumento significativo desse desempenho com a adoção do TigerBeetle, prevendo-se que esteja concluída até ao lançamento da versão 19.0 do Mojaloop.


## Histórico do documento
  |Versão|Data|Autor|Detalhe|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.0|3 de junho de 2025| Paul Makin|Versão inicial; texto sobre desempenho movido da documentação de deployment|

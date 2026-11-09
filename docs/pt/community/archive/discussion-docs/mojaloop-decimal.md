---
i18n_source_sha: 119e51501d2e712e5fa478abe4513fa81724cd20
---

# Tipo decimal do Mojaloop; baseado no tipo decimal do XML Schema

## Tipo de valor decimal

 Definição: decimal representa um subconjunto dos números reais, que pode ser representado por numerais decimais. O espaço de valores de decimal é o conjunto dos números que podem ser obtidos multiplicando um inteiro por uma potência não positiva de dez, ou seja, exprimíveis como _i_ × 10<sup>-n</sup>, em que _i_ e _n_ são inteiros e _n_ ≥ 0. A precisão não se reflete neste espaço de valores; o número 2.0 não é distinto do número 2.00. A relação de ordem em decimal é a relação de ordem dos números reais, restringida a este subconjunto.
 Req.: todos os processadores Level One têm de ser compatíveis com números decimais com um mínimo de 18 dígitos decimais. No entanto, os processadores Level One podem cumprir um limite definido pelo scheme quanto ao número máximo de dígitos decimais que estão preparados para admitir, o qual tem de ser de 18 ou mais dígitos, caso em que esse número máximo definido pelo scheme tem de estar claramente documentado.

## Representação lexical

decimal tem uma representação lexical que consiste numa sequência de comprimento finito de dígitos decimais (#x30 – #x39), separados por um ponto como indicador decimal. É permitido um sinal inicial opcional. Se o sinal for omitido, assume-se «+». Os zeros iniciais e finais são opcionais. Se a parte fracionária for zero, o ponto e o(s) zero(s) seguinte(s) podem ser omitidos. Por exemplo: -1.23, 12678967.543233, +100000.00, 210., 452

## Representação canónica

 A representação canónica de decimal é definida proibindo determinadas opções da representação lexical (§3.2.3.1). Especificamente, o sinal «+» inicial opcional é proibido. O ponto decimal é obrigatório. Os zeros iniciais e finais são proibidos, sujeitos ao seguinte: tem de existir pelo menos um dígito, que pode ser um zero, à direita e à esquerda do ponto decimal.

 Esta forma canónica está em conformidade com a representação lexical de Decimal do XML, pelo que seria aceite por qualquer sistema em conformidade com o XML schema.

 O que os outros escrevem em forma canónica, podemos ler como representação lexical; o que escrevemos em forma canónica, os outros podem ler como representação lexical. Mas rejeitamos formatos exponenciais na leitura e não escrevemos em forma exponencial. Podemos comparar diretamente, quanto à igualdade, as representações canónicas em string de dois valores.

 Na troca de mensagens, prefere-se uma forma lexical que mostre a precisão implícita através de zeros finais à forma canónica pura, se isso melhorar a clareza. Por exemplo, podemos escrever «5.00» em vez de «5.0» quando a unidade de troca é habitualmente especificada com precisão de duas casas decimais, como em USD, EUR ou GBP. Esta opção de representação lexical é permitida dentro das formas lexicais válidas tanto do decimal do XML como do decimal do Mojaloop.

## Validadores

 Validador lexical de decimal (o que os nossos recetores de mensagens aceitam):

```^[-+]?(([0-9]+[.]?[0-9]*)|([.]?[0-9]+))$```

Validador canónico de decimal (a forma que armazenamos e comparamos; este padrão pode ser utilizado para afirmar a forma canónica nas mensagens geradas):

```^([0]|([-]?[1-9][0-9]*))[.]([0]|([0-9]*[1-9]))$```

## Traduzir entre formas externas e internas

 Ao converter da forma lexical ou canónica para uma representação interna binária, o espaço de valores da representação interna tem de ser suficientemente grande para conter o intervalo de valores decimais específico do scheme, com um significando definido como o intervalo de inteiros com sinal –10<sup>_m_–1</sup>..10<sup>_m_–1</sup>, e um expoente inteiro não positivo no intervalo –_m_..0, em que _m_ é o número máximo de dígitos decimais, pelo menos 18, e conforme definido pelo scheme Level One específico.

Uma implementação não deve traduzir entre representações externas de decimal e qualquer representação interna binária de vírgula flutuante. E todos os cálculos sobre representações internas de valores decimais têm de produzir resultados como se tivessem sido efetuados em decimal, à mão, sobre a representação externa.

Note-se que o espaço de valores de um inteiro binário com sinal de 64 bits é suficientemente grande para codificar um significando decimal com sinal de 18 dígitos, e que o espaço de valores de um inteiro binário com sinal de 6 bits é suficientemente grande para codificar o expoente de base dez não positivo exigido.

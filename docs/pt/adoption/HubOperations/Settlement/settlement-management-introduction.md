# Introdução – Guia de gestão da liquidação

Quando um pagamento é efetuado num sistema de pagamentos em tempo real como o Mojaloop, o DFSP (Digital Financial Services Provider) que é o depositário da conta do beneficiário (o DFSP credor) aceita creditar imediatamente os fundos ao beneficiário. Mas o DFSP credor ainda não recebeu os fundos do DFSP que é o depositário da conta do devedor: tudo o que aconteceu até agora é que o DFSP devedor contraiu uma obrigação de reembolsar o DFSP credor, e essa obrigação foi registada no Hub Mojaloop.

O processo de liquidação é o processo pelo qual um DFSP devedor reembolsa um DFSP credor pelas obrigações que o DFSP devedor contraiu em consequência de transferências.

Este guia descreve como as liquidações são geridas pelo Hub Mojaloop e pelo(s) banco(s) de liquidação parceiro(s), e apresenta os principais blocos constituintes do processamento da liquidação.

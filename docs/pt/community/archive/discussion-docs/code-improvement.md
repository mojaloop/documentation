---
i18n_source_sha: 2cc9a2ff672fa3c89d8247d07ee24239d1c363bc
---

# Projeto Code_Improvement

## Visão geral
O objetivo é melhorar a qualidade e a segurança do código do projeto Mojaloop.  Inclui a análise e a introdução de novas ferramentas de código aberto, melhorias de processo, verificações de barreiras (dentro dos pull requests e dos builds), a par da documentação.

Âmbito: o projeto está centrado na qualidade e na segurança, mas pode conduzir a outras áreas, como a automatização de testes e a automatização e as ferramentas de DevOps.

## Resultados (fase um, até ao final de janeiro):
- Implementação e análise de novas ferramentas OSS
- Atualizar os scripts de disponibilização de versões: os aspetos de segurança têm de ser incorporados na disponibilização de versões/devops (CI/CD)
- Atualizar as regras dos pull requests: aspetos de segurança incorporados nos pull requests (antes dos check-ins)
- Atualizar a documentação: normas e guias de contribuição
 
Canal do Slack:#code_security
 
 ## Discussões:
 ### Implementar alterações no Dockerfile e no processo de build de CI/CD para ajudar a reforçar a segurança dos nossos contentores
 - Criar um utilizador não root dentro do Dockerfile
 - Ativar o docker-content-trust no host docker (será dentro do CircleCI)
 - Executar os builds com --no-cache durante o passo do CircleCI, para garantir que recebemos sempre quaisquer novas correções de segurança (não me parece que isto seja um problema importante, uma vez que, de qualquer forma, não temos o caching de imagens docker do CircleCI ativado
 
 ### Passar de Javascript para Typescript
 - Transição para typescript (misturar js e ts) para mais segurança/qualidade
 - O typescript é preferido, mas não obrigatório: https://github.com/mojaloop/template-typescript-public
 
 

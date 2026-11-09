---
i18n_source_sha: 71ac45b7706943cfb4a10cfe6598477e516804f8
---

# Utilizar o Vue em Markdown

## Restrições de acesso às APIs do browser

Uma vez que, ao gerar compilações estáticas, as aplicações VuePress são renderizadas no servidor em Node.js, qualquer utilização do Vue tem de cumprir os [requisitos de código universal](https://ssr.vuejs.org/en/universal.html). Em suma, certifique-se de que as APIs de Browser / DOM só são acedidas nos hooks `beforeMount` ou `mounted`.

Ao utilizar ou demonstrar componentes que não são compatíveis com SSR (por exemplo, que contenham diretivas personalizadas), é possível envolvê-los no componente integrado `<ClientOnly>`:

##

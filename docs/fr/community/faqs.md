# Utilisation de Vue dans le Markdown

## Restrictions d'accès à l'API du navigateur

Étant donné que les applications VuePress sont rendues côté serveur avec Node.js lors de la génération de builds statiques, toute utilisation de Vue doit respecter les [exigences universelles du code](https://ssr.vuejs.org/en/universal.html). En résumé, assurez-vous d’accéder aux API du navigateur / DOM uniquement dans les hooks `beforeMount` ou `mounted`.

Si vous utilisez ou faites une démonstration de composants qui ne sont pas compatibles avec le SSR (par exemple ceux qui contiennent des directives personnalisées), vous pouvez les envelopper dans le composant intégré `<ClientOnly>` :

##

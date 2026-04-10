<template>
  <div class="theme-container">
    <div class="content">
      <h1>404</h1>
      <blockquote>{{ getMsg() }}</blockquote>
      <router-link :to="active.homeLink">{{ active.homeLinkText }}</router-link>
    </div>
  </div>
</template>

<script>
const DEFAULT = 'en'

// Add a locale: new key + `prefix` (URL path, e.g. /de/) + copy fields.
const LOCALES = {
  en: {
    homeLink: '/',
    homeLinkText: 'Take me home.',
    messages: [
      `There's nothing here.`,
      `How did we get here?`,
      `That's a Four-Oh-Four.`,
      `Looks like we've got some broken links.`
    ]
  },
  fr: {
    prefix: '/fr/',
    homeLink: '/fr/',
    homeLinkText: 'Retourner à l\'accueil.',
    messages: [
      `Il n'y a rien ici.`,
      `Comment sommes-nous arrivés ici ?`,
      `C'est une erreur 404.`,
      `On dirait que nous avons des liens cassés.`
    ]
  }
}

export default {
  computed: {
    active () {
      const path = this.$route.path
      for (const id of Object.keys(LOCALES)) {
        if (id === DEFAULT) continue
        const { prefix } = LOCALES[id]
        if (prefix && path.startsWith(prefix)) return LOCALES[id]
      }
      return LOCALES[DEFAULT]
    }
  },
  methods: {
    getMsg () {
      const pool = this.active.messages
      return pool[Math.floor(Math.random() * pool.length)]
    }
  }
}
</script>

<style src="../styles/theme.styl" lang="stylus"></style>

<template>
  <div class="theme-container">
    <div class="content">
      <h1>404</h1>
      <blockquote>{{ getMsg() }}</blockquote>
      <router-link :to="homeLink">{{ homeLinkText }}</router-link>
    </div>
  </div>
</template>

<script>
const msgs = {
  en: [
    `There's nothing here.`,
    `How did we get here?`,
    `That's a Four-Oh-Four.`,
    `Looks like we've got some broken links.`
  ],
  fr: [
    `Il n'y a rien ici.`,
    `Comment sommes-nous arrivés ici ?`,
    `C'est une erreur 404.`,
    `On dirait que nous avons des liens cassés.`
  ]
}

export default {
  computed: {
    isFrench () {
      return this.$route.path.startsWith('/fr/')
    },
    homeLink () {
      return this.isFrench ? '/fr/' : '/'
    },
    homeLinkText () {
      return this.isFrench ? 'Retourner à l\'accueil.' : 'Take me home.'
    }
  },
  methods: {
    getMsg () {
      const lang = this.isFrench ? 'fr' : 'en'
      const pool = msgs[lang]
      return pool[Math.floor(Math.random() * pool.length)]
    }
  }
}
</script>

<style src="../styles/theme.styl" lang="stylus"></style>

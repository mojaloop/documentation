/**
 * Client app enhancement file.
 *
 * https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */

const LOCALE_STORAGE_KEY = 'mojaloop-docs-locale-redirected'

function getBrowserLang () {
  if (typeof navigator === 'undefined') return 'en'
  const lang = navigator.language || navigator.userLanguage || ''
  return lang.toLowerCase().split('-')[0]
}

export default ({
  Vue,
  options,
  router,
  siteData,
  isServer
}) => {
  if (isServer) return

  router.afterEach((to) => {
    const alreadyRedirected = sessionStorage.getItem(LOCALE_STORAGE_KEY)
    if (alreadyRedirected) return

    sessionStorage.setItem(LOCALE_STORAGE_KEY, '1')

    const browserLang = getBrowserLang()
    const isOnFrenchPage = to.path.startsWith('/fr/')

    if (browserLang === 'fr' && !isOnFrenchPage) {
      return router.replace('/fr' + to.path)
    }
  })
}

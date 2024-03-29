<template>

  <header class="navbar">
    <!-- Add a banner here when we want  -->
    <!-- <div class="banner-content">
      <PreviewBanner />
    </div> -->
    <div class="navbar-content">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>

    <RouterLink
      :to="$localePath"
      class="home-link"
    >
      <img
        v-if="$site.themeConfig.logo"
        class="logo"
        :src="$withBase($site.themeConfig.logo)"
        :alt="$siteTitle"
      >
    </RouterLink>

    <div v-if="hasVersions && isVersionedPage" class="versions-dropdown can-hide">
      <DropdownLink :item="versionsDropdown"/>
    </div>

    <div
      class="links"
      :style="linksWrapMaxWidth ? {
        'max-width': linksWrapMaxWidth + 'px'
      } : {}"
    >
      <AlgoliaSearchBox
        v-if="isAlgoliaSearch"
        :options="algolia"
      />
      <SearchBoxWrapper v-else-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false" />
      <NavLinks class="can-hide" />
    </div>

    <ContentSidebarButton v-if="$page.contentSidebar" @toggle-content-sidebar="$emit('toggle-content-sidebar')"/>
        </div>

  </header>
  <!-- </div> -->
</template>

<script>
import AlgoliaSearchBox from '@AlgoliaSearchBox'

import ContentSidebarButton from '@theme/components/ContentSidebarButton'
import DropdownLink from '@theme/components/DropdownLink.vue'
import NavLinks from '@theme/components/NavLinks.vue'
import SearchBoxWrapper from '@theme/components/SearchBoxWrapper'
import SidebarButton from '@theme/components/SidebarButton.vue'
import PreviewBanner from "./PreviewBanner.vue";


export default {
  components: {
    ContentSidebarButton,
    DropdownLink,
    SidebarButton,
    NavLinks,
    SearchBoxWrapper,
    AlgoliaSearchBox,
    PreviewBanner
  },

  data () {
    return {
      linksWrapMaxWidth: null
    }
  },

  computed: {
    algolia () {
      return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
    },

    isAlgoliaSearch () {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    },

    hasVersions () {
      return this.$versions && this.$versions.length > 0
    },

    isVersionedPage () {
      return this.$page.version !== undefined
    },

    versionsDropdown () {
      // consider what is on master to always be the latest
      // to change next to latest
      const currentVersion = 'latest'
      const routes = this.$router.options.routes
      return {
        text: this.$page.version,
        items: ['latest', ...this.$versions, 'legacy'].map(version => {
          const text = version
          let link = this.$page.path
          
          if (version !== this.$page.version) {
            link = link.replace(new RegExp(`^${this.$localePath.substring(0, this.$localePath.length - 1)}`), '')
            link = link.replace(new RegExp(`^/${this.$page.version}`), '')
            // try to stay on current page
            if (version !== currentVersion) {
              link = `${this.$localePath}${version}${link}`
            } else {
              link = `${this.$localePath.substring(0, this.$localePath.length - 1)}${link}`
            }
            if (!routes.some(route => route.path === link)) {
              // fallback to homepage
              link = version === currentVersion ? this.$localePath : `${this.$localePath}${version}/`
            }
          }

          // add a link through to older version of docs!
          if (version === 'legacy') {
            // TODO: how to make sure this does a full reload?
            link = `https://docs.mojaloop.io/legacy/`
          }
          const item = { text, link }
          return item
        })
      }
    }
  },

  mounted () {
    const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
    const NAVBAR_VERTICAL_PADDING = parseInt(css(this.$el, 'paddingLeft')) + parseInt(css(this.$el, 'paddingRight'))
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null
      } else {
        this.linksWrapMaxWidth = this.$el.offsetWidth - NAVBAR_VERTICAL_PADDING -
          (this.$refs.siteName && this.$refs.siteName.offsetWidth || 0)
      }
    }
    handleLinksWrapWidth()
    window.addEventListener('resize', handleLinksWrapWidth, false)
  }
}

function css (el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property]
}
</script>

<style lang="stylus">
$navbar-banner-height = $navbarBannerHeight
$navbar-vertical-padding = 0.7rem
$navbar-horizontal-padding = 1.5rem

.navbar
  padding $navbar-vertical-padding $navbar-horizontal-padding
  line-height $navbarHeight - 1.4rem

  .navbar-content
    // background-color red
    line-height: 1.5rem
    margin-top $navbar-banner-height

    a, span, img
      display inline-block
  .navbar-content .logo
    height $navbarHeight - $navbar-banner-height - 1.4rem
    min-width $navbarHeight - 1.4rem
    margin-right 0.8rem
    vertical-align top
  .navbar-content .site-name
    font-size 1.3rem
    font-weight 600
    color $textColor
    position relative
  .navbar-content .links
    padding-left 1.5rem
    box-sizing border-box
    background-color white
    white-space nowrap
    font-size 0.9rem
    position absolute
    right $navbar-horizontal-padding
    top $navbar-vertical-padding + $navbar-banner-height
    // top $navbar-banner-height
    display flex
    .search-box
      flex: 0 0 auto
      vertical-align top

  .navbar-content .versions-dropdown
    display inline-block
    position relative
    margin-left 1.5rem
    .dropdown-wrapper
      .nav-dropdown
        left -1.25rem
        right inherit
        .dropdown-item
          a
            color $textColor
            &:hover
              color $accentColor
            &.router-link-active
              color $accentColor
              &:hover
                color $accentColor

@media (max-width: $MQMobile)
  .navbar
    padding-left 4rem
    .banner-content
      .can-hide
        display none
    .navbar-content
      .can-hide
        display none
      .links
        padding-left 1.5rem
      .site-name
        width calc(100vw - 9.4rem)
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
</style>

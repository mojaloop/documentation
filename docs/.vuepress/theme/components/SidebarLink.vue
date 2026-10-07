<script>
import { hashRE } from '../util'

export default {
  name: 'SidebarLink',

  // NOTE: only `item` is declared, matching the previous functional component,
  // so header depth resolution is unchanged.
  props: ['item'],

  data () {
    return {
      // true = user collapsed the headers of the active page
      collapsed: false
    }
  },

  watch: {
    // Re-expand when navigating to a different page (hash changes on the
    // same page, e.g. clicking a sub-header, do not reset it).
    '$route.path' () {
      this.collapsed = false
    }
  },

  methods: {
    // Registered in the CAPTURE phase on the wrapper, so it runs before
    // RouterLink navigates - `item.active` still reflects the page we are on.
    onClickCapture (e) {
      const pageLink = this.$el && this.$el.firstElementChild
      if (!pageLink || !pageLink.contains(e.target)) return // sub-header click
      // Only the link of the page you are already on acts as a toggle.
      if (this.item.active) {
        this.collapsed = !this.collapsed
      }
    }
  },

  render (h) {
    const { $page, $route, $themeConfig, $themeLocaleConfig, item } = this
    const active = item.active

    const hasHeaders = item.type === 'auto' ||
      (item.headers && item.headers.length && !hashRE.test(item.path))

    const link = item.type === 'external'
      ? renderExternal(h, item.path, item.title || item.path)
      : renderLink(h, item.path, item.title || item.path, active, undefined, {
        toggle: active && hasHeaders,
        collapsed: this.collapsed
      })

    const maxDepth = [
      $page.frontmatter.sidebarDepth,
      $themeLocaleConfig.sidebarDepth,
      $themeConfig.sidebarDepth,
      1
    ].find(depth => depth !== undefined)

    const displayAllHeaders = $themeLocaleConfig.displayAllHeaders ||
      $themeConfig.displayAllHeaders

    let children = null
    if (!this.collapsed) {
      if (item.type === 'auto') {
        children = renderChildren(h, item.children, item.basePath, $route, maxDepth)
      } else if ((active || displayAllHeaders) && item.headers && !hashRE.test(item.path)) {
        children = renderChildren(h, item.children, item.path, $route, maxDepth)
      }
    }

    // Stateful components need a single root element.
    return h('div', {
      class: 'sidebar-link-wrapper',
      on: { '!click': this.onClickCapture } // '!' = capture phase
    }, [link, children])
  }
}

function renderLink (h, to, text, active, level, toggle) {
  const component = {
    props: {
      to,
      activeClass: '',
      exactActiveClass: ''
    },
    class: {
      active,
      'sidebar-link': true,
      'sidebar-link-toggle': toggle && toggle.toggle,
      collapsed: toggle && toggle.toggle && toggle.collapsed
    }
  }
  if (level > 2) {
    component.style = {
      'padding-left': level + 'rem'
    }
  }
  return h('RouterLink', component, text)
}

function renderChildren (h, children, path, route, maxDepth, depth = 1) {
  if (!children || depth > maxDepth) return null
  return h('ul', { class: 'sidebar-sub-headers' }, children.map(c => {
    return h('li', { class: 'sidebar-sub-header' }, [
      renderLink(h, path + '#' + c.slug, c.title, c.active, c.level - 1),
      renderChildren(h, c.children, path, route, maxDepth, depth + 1)
    ])
  }))
}

function renderExternal (h, to, text) {
  return h('a', {
    attrs: {
      href: to,
      target: '_blank',
      rel: 'noopener noreferrer'
    },
    class: {
      'sidebar-link': true
    }
  }, [text, h('OutboundLink')])
}
</script>

<style lang="stylus">
.sidebar .sidebar-sub-headers
  padding-left 1rem
  font-size 0.95em

a.sidebar-link
  font-size 1em
  font-weight 400
  display inline-block
  color $textColor
  border-left 0.25rem solid transparent
  padding 0.35rem 1rem 0.35rem 1.25rem
  line-height 1.4
  width: 100%
  box-sizing: border-box
  &:hover
    color $accentColor
  &.active
    font-weight 600
    color $accentColor
    border-left-color $accentColor
  .sidebar-group &
    padding-left 2rem
  .sidebar-sub-headers &
    padding-top 0.25rem
    padding-bottom 0.25rem
    border-left none
    &.active
      font-weight 500

// caret on the active page link that can be collapsed/expanded
a.sidebar-link.sidebar-link-toggle
  position relative
  padding-right 1.75rem
  &::after
    content ''
    position absolute
    right 0.75rem
    top 50%
    width 0.4rem
    height 0.4rem
    border-right 2px solid currentColor
    border-bottom 2px solid currentColor
    transform translateY(-70%) rotate(45deg)
    transition transform .15s ease
  &.collapsed::after
    transform translateY(-50%) rotate(-45deg)
</style>

<template>
  <div class="search-box">
    <input
      ref="input"
      aria-label="Search"
      :value="query"
      :class="{ focused: focused }"
      :placeholder="placeholder"
      autocomplete="off"
      spellcheck="false"
      @input="query = $event.target.value"
      @focus="focused = true"
      @blur="focused = false"
      @keyup.enter="go(focusIndex)"
      @keyup.up="onUp"
      @keyup.down="onDown"
    >
    <ul
      v-if="showSuggestions"
      class="suggestions"
      :class="{ 'align-right': alignRight }"
      @mouseleave="unfocus"
    >
      <li
        v-for="(s, i) in suggestions"
        :key="s.path + '-' + i"
        class="suggestion"
        :class="{ focused: i === focusIndex }"
        @mousedown="go(i)"
        @mouseenter="focus(i)"
      >
        <a :href="s.regularPath" @click.prevent>
          <span v-html="s.title || s.regularPath" class="suggestion__title"></span>
          <span v-html="s.text" class="suggestion__result"></span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import VuepressSearchBox from '@vuepress/plugin-search/SearchBox.vue'
import Flexsearch from 'flexsearch'

/* global SEARCH_PATHS, SEARCH_HOTKEYS, SEARCH_OPTIONS, SEARCH_RESULT_LENGTH */
export default {
  name: 'StrictSearchBox',
  extends: VuepressSearchBox,

  data () {
    return {
      index: null
    }
  },

  computed: {
    searchablePages () {
      const { pages } = this.$site
      const localePath = this.$localePath
      return pages.filter((page) => {
        return this.getPageLocalePath(page) === localePath
          && this.isSearchable(page)
          && this.isAllowedSectionPage(page)
      })
    },

    suggestions () {
      const query = this.query.trim()
      if (!query || !this.index) {
        return []
      }

      const allPageCount = this.searchablePages.length
      const indexedResults = this.index.search(query.toLowerCase(), allPageCount)
      const indexOrder = new Map(indexedResults.map((page, index) => [page.path, index]))
      const isPhraseQuery = /\s+/.test(query)

      if (isPhraseQuery) {
        const normalizedQuery = this.normalizeText(query)
        const strictMatches = this.searchablePages.filter((page) => this.matchesFullPhrase(page, normalizedQuery))

        if (!strictMatches.length) {
          return []
        }

        const strictSuggestions = this.buildSuggestions(strictMatches, query, normalizedQuery)
        return this.sortSuggestions(strictSuggestions, indexOrder)
      }

      const broadSuggestions = this.buildSuggestions(indexedResults, query, null)
      return this.sortSuggestions(broadSuggestions, indexOrder)
    }
  },

  mounted () {
    this.placeholder = this.$site.themeConfig.searchPlaceholder || ''
    this.setupFlexSearch()
    document.addEventListener('keydown', this.onHotkey)
  },

  beforeDestroy () {
    document.removeEventListener('keydown', this.onHotkey)
  },

  methods: {
    setupFlexSearch () {
      this.index = new Flexsearch(SEARCH_OPTIONS)
      this.index.add(this.searchablePages)
    },

    getPageLocalePath (page) {
      for (const localePath in this.$site.locales || {}) {
        if (localePath !== '/' && page.path.indexOf(localePath) === 0) {
          return localePath
        }
      }
      return '/'
    },

    isSearchable (page) {
      let searchPaths = SEARCH_PATHS
      if (searchPaths === null) {
        return true
      }

      searchPaths = Array.isArray(searchPaths) ? searchPaths : [searchPaths]
      return searchPaths.some((path) => page.path.match(path))
    },

    isAllowedSectionPage (page) {
      const section = this.getSectionFromPage(page)
      return ['adoption', 'community', 'technical', 'product'].includes(section)
    },

    getSectionFromPage (page) {
      const regularPath = (page.regularPath || page.path || '').toLowerCase()
      const match = regularPath.match(/^\/([^/]+)\/?/)
      return match ? match[1] : ''
    },

    getTopicLabel (page) {
      const section = this.getSectionFromPage(page)
      if (!section) {
        return 'General'
      }

      return section.charAt(0).toUpperCase() + section.slice(1)
    },

    onHotkey (event) {
      if (event.srcElement === document.body && SEARCH_HOTKEYS.includes(event.key)) {
        this.$refs.input.focus()
        event.preventDefault()
      }
    },

    go (i) {
      if (!this.showSuggestions) {
        return
      }

      const path = this.suggestions[i].path
      if (this.$route.path !== path) {
        this.$router.push(path)
      }

      this.query = ''
      this.focusIndex = 0
    },

    normalizeText (value) {
      return (value || '').toLowerCase().replace(/\s+/g, ' ').trim()
    },

    matchesFullPhrase (page, normalizedQuery) {
      const haystacks = [
        page.title,
        page.content,
        ...(page.headers || []).map((header) => header.title)
      ]

      return haystacks.some((value) => this.normalizeText(value).includes(normalizedQuery))
    },

    buildSuggestions (pages, query, normalizedPhrase) {
      const results = []
      const seen = new Set()

      for (const page of pages) {
        const topic = this.getTopicLabel(page)
        const pageTitle = page.title || page.regularPath
        const normalizedTitle = this.normalizeText(page.title)
        const normalizedContent = this.normalizeText(page.content)
        const normalizedQuery = normalizedPhrase || this.normalizeText(query)

        const matchesTitle = normalizedTitle.includes(normalizedQuery)
        if (matchesTitle) {
          const key = `title:${page.path}`
          if (!seen.has(key)) {
            seen.add(key)
            results.push({
              ...page,
              path: page.path,
              kind: 'title',
              priority: 0,
              title: this.highlightText(pageTitle, query),
              text: this.getSuggestionText(page, query, topic)
            })
          }
        }

        for (const header of page.headers || []) {
          const normalizedHeader = this.normalizeText(header.title)
          if (!normalizedHeader.includes(normalizedQuery)) {
            continue
          }

          const key = `header:${page.path}#${header.slug}`
          if (seen.has(key)) {
            continue
          }

          seen.add(key)
          results.push({
            ...page,
            path: `${page.path}#${header.slug}`,
            kind: 'header',
            priority: 1,
            title: this.highlightText(`${pageTitle} > ${header.title}`, query),
            text: this.getSuggestionText(page, query, topic)
          })
        }

        const matchesContent = normalizedContent.includes(normalizedQuery)
        if (matchesContent) {
          const key = `content:${page.path}`
          if (!seen.has(key)) {
            seen.add(key)
            results.push({
              ...page,
              path: page.path,
              kind: 'content',
              priority: 2,
              title: this.highlightText(pageTitle, query),
              text: this.getSuggestionText(page, query, topic)
            })
          }
        }
      }

      return results
    },

    sortSuggestions (suggestions, indexOrder) {
      return suggestions
        .slice()
        .sort((left, right) => {
          if (left.priority !== right.priority) {
            return left.priority - right.priority
          }

          const leftIndex = indexOrder.has(left.path.split('#')[0])
            ? indexOrder.get(left.path.split('#')[0])
            : Number.MAX_SAFE_INTEGER
          const rightIndex = indexOrder.has(right.path.split('#')[0])
            ? indexOrder.get(right.path.split('#')[0])
            : Number.MAX_SAFE_INTEGER
          if (leftIndex !== rightIndex) {
            return leftIndex - rightIndex
          }

          return left.path.localeCompare(right.path)
        })
    },

    escapeRegExp (value) {
      return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    },

    highlightText (fullText, target) {
      const trimmedTarget = (target || '').trim()
      if (!trimmedTarget) {
        return fullText
      }

      const phraseRegex = new RegExp(this.escapeRegExp(trimmedTarget), 'ig')
      if (phraseRegex.test(fullText)) {
        return fullText.replace(new RegExp(this.escapeRegExp(trimmedTarget), 'ig'), '<em>$&</em>')
      }

      const firstWord = trimmedTarget.split(/\s+/).find(Boolean)
      if (!firstWord) {
        return fullText
      }

      return fullText.replace(new RegExp(this.escapeRegExp(firstWord), 'ig'), '<em>$&</em>')
    },

    getSentenceStartIndex (content, matchIndex) {
      let startIndex = matchIndex
      while (startIndex > 0 && !/[.!?\n]/.test(content[startIndex - 1])) {
        startIndex -= 1
      }

      while (startIndex < content.length && /\s/.test(content[startIndex])) {
        startIndex += 1
      }

      return startIndex
    },

    getSentenceEndIndex (content, matchIndex) {
      let endIndex = matchIndex
      while (endIndex < content.length && !/[.!?\n]/.test(content[endIndex])) {
        endIndex += 1
      }

      if (endIndex < content.length) {
        endIndex += 1
      }

      return endIndex
    },

    getSuggestionText (page, query, topic) {
      const content = page.content || ''
      const queryLower = (query || '').toLowerCase()
      const phraseIndex = content.toLowerCase().indexOf(queryLower)
      const queryFirstWord = (query || '').split(/\s+/)[0] || ''
      const fallbackIndex = queryFirstWord ? content.toLowerCase().indexOf(queryFirstWord.toLowerCase()) : -1

      const matchIndex = phraseIndex !== -1 ? phraseIndex : fallbackIndex
      if (matchIndex < 0) {
        const fallbackText = content.substr(0, Number(SEARCH_RESULT_LENGTH) || 110)
        return `Topic: ${topic} | ` + this.highlightText(fallbackText, query)
      }

      const sentenceStart = this.getSentenceStartIndex(content, matchIndex)
      const sentenceEnd = this.getSentenceEndIndex(content, matchIndex)
      const sentence = content.substring(sentenceStart, sentenceEnd).trim()
      const maxLength = Number(SEARCH_RESULT_LENGTH) || 110
      const text = sentence.length > maxLength ? sentence.substr(0, maxLength) + '...' : sentence
      return `Topic: ${topic} | ` + this.highlightText(text, query)
    }
  }
}
</script>

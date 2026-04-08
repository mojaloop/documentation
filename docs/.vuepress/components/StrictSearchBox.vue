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

/* global SEARCH_PATHS, SEARCH_HOTKEYS */
const TYPO_MIN_SIMILARITY = 0.55
const TYPO_MIN_SIMILARITY_MEDIUM = 0.5
const TYPO_MIN_SIMILARITY_SHORT = 0.45
const TYPO_FALLBACK_MIN_SIMILARITY = 0.35
const TOKEN_CORRECTION_MIN_SIMILARITY = 0.64

export default {
  name: 'StrictSearchBox',
  extends: VuepressSearchBox,

  computed: {
    searchablePages () {
      const { pages } = this.$site
      const localePath = this.$localePath
      const currentVersion = this.$page && this.$page.version

      return pages.filter((page) => {
        return this.getPageLocalePath(page) === localePath
          && this.isSearchable(page)
          && (currentVersion === undefined || page.version === currentVersion)
      })
    },

    suggestions () {
      const query = this.query.trim()
      if (!query) {
        return []
      }

      const max = this.$site.themeConfig.searchMaxSuggestions || 10
      const normalizedQuery = this.normalizeText(query)

      const tokenModel = this.buildTokenModel()
      const normalizedCorrectedQuery = this.correctNormalizedQuery(normalizedQuery, tokenModel)
      const correctedQuery = normalizedCorrectedQuery || normalizedQuery

      const exact = this.buildExactSuggestions(query, normalizedQuery)
      if (exact.length > 0) {
        return exact.slice(0, max)
      }

      if (correctedQuery !== normalizedQuery) {
        const correctedExact = this.buildExactSuggestions(query, correctedQuery)
          .map((item) => {
            const copy = Object.assign({}, item)
            copy.text = `${copy.text} | corrected: ${correctedQuery}`
            return copy
          })
        if (correctedExact.length > 0) {
          return correctedExact.slice(0, max)
        }
      }

      return this.buildFuzzySuggestions(query, normalizedQuery, correctedQuery, max)
    }
  },

  mounted () {
    this.placeholder = this.$site.themeConfig.searchPlaceholder || ''
    document.addEventListener('keydown', this.onHotkey)
  },

  beforeDestroy () {
    document.removeEventListener('keydown', this.onHotkey)
  },

  methods: {
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

    normalizeText (value) {
      return String(value || '')
        .toLowerCase()
        .replace(/<[^>]*>/g, ' ')
        .replace(/[._\-/]+/g, ' ')
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
    },

    buildTokenModel () {
      const tokenSet = new Set()
      const tokenFrequency = new Map()
      const bigramFrequency = new Map()

      const increment = (map, key) => {
        map.set(key, (map.get(key) || 0) + 1)
      }

      const ingestText = (text) => {
        const tokens = this.tokenize(this.normalizeText(text))
        for (let index = 0; index < tokens.length; index++) {
          const token = tokens[index]
          tokenSet.add(token)
          increment(tokenFrequency, token)

          if (index > 0) {
            increment(bigramFrequency, `${tokens[index - 1]} ${token}`)
          }
        }
      }

      for (const page of this.searchablePages) {
        const pageTitle = page.title || page.regularPath || page.path
        ingestText(pageTitle)

        for (const header of page.headers || []) {
          ingestText(header.title)
        }
      }

      return {
        tokenSet,
        tokenFrequency,
        bigramFrequency,
        vocabulary: Array.from(tokenSet)
      }
    },

    tokenize (value) {
      return String(value || '').split(/\s+/).filter(Boolean)
    },

    correctNormalizedQuery (normalizedQuery, tokenModel) {
      const tokens = this.tokenize(normalizedQuery)
      if (!tokens.length || !tokenModel || !tokenModel.vocabulary.length) {
        return normalizedQuery
      }

      const { vocabulary, tokenSet, tokenFrequency, bigramFrequency } = tokenModel

      const correctedTokens = tokens.map((token, index, allTokens) => {
        if (token.length < 3) {
          return token
        }

        if (tokenSet.has(token)) {
          return token
        }

        const previousToken = index > 0 ? allTokens[index - 1] : null
        const nextToken = index < allTokens.length - 1 ? allTokens[index + 1] : null

        let bestCandidate = token
        let bestScore = 0
        for (const candidate of vocabulary) {
          if (Math.abs(candidate.length - token.length) > 3) {
            continue
          }

          const similarity = Math.max(
            this.levenshteinSimilarity(token, candidate),
            this.jaroWinklerSimilarity(token, candidate)
          )

          // Boost candidates that frequently appear in neighboring context,
          // e.g. "mojaloop hub" should outrank unrelated near-spellings.
          const leftBigram = previousToken ? `${previousToken} ${candidate}` : null
          const rightBigram = nextToken ? `${candidate} ${nextToken}` : null
          const contextBoost =
            (leftBigram ? (bigramFrequency.get(leftBigram) || 0) : 0) +
            (rightBigram ? (bigramFrequency.get(rightBigram) || 0) : 0)

          const frequencyBoost = tokenFrequency.get(candidate) || 0
          const score = similarity + (Math.min(contextBoost, 6) * 0.06) + (Math.min(frequencyBoost, 20) * 0.01)

          if (score > bestScore) {
            bestScore = score
            bestCandidate = candidate
          }
        }

        if (bestScore >= TOKEN_CORRECTION_MIN_SIMILARITY) {
          return bestCandidate
        }

        return token
      })

      return correctedTokens.join(' ')
    },

    buildExactSuggestions (query, normalizedQuery) {
      const results = []
      const seen = new Set()

      for (const page of this.searchablePages) {
        const topic = this.getTopicLabel(page)
        const pageTitle = page.title || page.regularPath || page.path

        const normalizedTitle = this.normalizeText(pageTitle)
        if (normalizedTitle.includes(normalizedQuery)) {
          const key = `title:${page.path}`
          if (!seen.has(key)) {
            seen.add(key)
            results.push(Object.assign({}, page, {
              regularPath: page.path,
              path: page.path,
              kind: 'title',
              priority: 0,
              title: this.highlightText(pageTitle, query),
              text: this.getSuggestionText(topic, 'Title match')
            }))
          }
        }

        for (const header of page.headers || []) {
          const normalizedHeader = this.normalizeText(header.title)
          if (!normalizedHeader.includes(normalizedQuery)) {
            continue
          }

          const suggestionPath = `${page.path}#${header.slug}`
          const key = `header:${suggestionPath}`
          if (seen.has(key)) {
            continue
          }

          seen.add(key)
          results.push(Object.assign({}, page, {
            regularPath: suggestionPath,
            path: suggestionPath,
            kind: 'header',
            priority: 1,
            header,
            title: this.highlightText(`${pageTitle} > ${header.title}`, query),
            text: this.getSuggestionText(topic, 'Header match')
          }))
        }
      }

      return results.sort((left, right) => {
        if (left.priority !== right.priority) {
          return left.priority - right.priority
        }
        return left.path.localeCompare(right.path)
      })
    },

    buildFuzzySuggestions (query, normalizedQuery, correctedQuery, max) {
      const minSimilarity = this.getMinSimilarityThreshold(correctedQuery)
      const ranked = []
      const useCorrection = correctedQuery && correctedQuery !== normalizedQuery

      for (const page of this.searchablePages) {
        const topic = this.getTopicLabel(page)
        const pageTitle = page.title || page.regularPath
        const normalizedTitle = this.normalizeText(pageTitle)

        const titleScoreOriginal = this.getSimilarityScore(normalizedQuery, normalizedTitle)
        const titleScoreCorrected = useCorrection
          ? this.getSimilarityScore(correctedQuery, normalizedTitle)
          : 0

        let bestScore = Math.max(titleScoreOriginal, titleScoreCorrected) * 1.25
        let bestHeader = null

        if (normalizedTitle.includes(normalizedQuery) || (useCorrection && normalizedTitle.includes(correctedQuery))) {
          bestScore = Math.max(bestScore, 0.96)
        }

        for (const header of page.headers || []) {
          const normalizedHeader = this.normalizeText(header.title)
          const headerScoreOriginal = this.getSimilarityScore(normalizedQuery, normalizedHeader)
          const headerScoreCorrected = useCorrection
            ? this.getSimilarityScore(correctedQuery, normalizedHeader)
            : 0

          let headerScore = Math.max(headerScoreOriginal, headerScoreCorrected) * 1.15

          if (normalizedHeader.includes(normalizedQuery) || (useCorrection && normalizedHeader.includes(correctedQuery))) {
            headerScore = Math.max(headerScore, 0.95)
          }

          if (headerScore > bestScore) {
            bestScore = headerScore
            bestHeader = header
          }
        }

        if (bestHeader) {
          ranked.push(Object.assign({}, page, {
            regularPath: `${page.path}#${bestHeader.slug}`,
            path: `${page.path}#${bestHeader.slug}`,
            kind: 'header',
            priority: 1,
            _score: bestScore,
            header: bestHeader,
            title: this.highlightText(`${pageTitle} > ${bestHeader.title}`, query),
            text: this.getSuggestionText(topic, correctedQuery !== normalizedQuery ? 'Fuzzy header match (corrected)' : 'Fuzzy header match')
          }))
        } else {
          ranked.push(Object.assign({}, page, {
            regularPath: page.path,
            path: page.path,
            kind: 'title',
            priority: 0,
            _score: bestScore,
            title: this.highlightText(pageTitle, query),
            text: this.getSuggestionText(topic, correctedQuery !== normalizedQuery ? 'Fuzzy title match (corrected)' : 'Fuzzy title match')
          }))
        }
      }

      const filtered = ranked
        .sort((left, right) => {
          if (right._score !== left._score) {
            return right._score - left._score
          }
          if (left.priority !== right.priority) {
            return left.priority - right.priority
          }
          return left.path.localeCompare(right.path)
        })

      // If strict threshold removes everything, still show best typo candidates.
      const selected = filtered.filter(item => item._score >= minSimilarity)
      const fallback = selected.length > 0
        ? selected
        : filtered.filter(item => item._score >= TYPO_FALLBACK_MIN_SIMILARITY)

      const finalPool = fallback.length > 0
        ? fallback
        : filtered

      return finalPool
        .slice(0, max)
        .map((item) => {
          const copy = Object.assign({}, item)
          delete copy._score
          return copy
        })
    },

    getMinSimilarityThreshold (normalizedQuery) {
      const tokens = (normalizedQuery || '').split(/\s+/).filter(Boolean)
      const longestTokenLength = tokens.reduce((max, token) => Math.max(max, token.length), 0)

      if (longestTokenLength <= 5) {
        return TYPO_MIN_SIMILARITY_SHORT
      }

      if (longestTokenLength <= 8) {
        return TYPO_MIN_SIMILARITY_MEDIUM
      }

      return TYPO_MIN_SIMILARITY
    },

    getSimilarityScore (needle, haystack) {
      if (!needle || !haystack) {
        return 0
      }

      const phraseScore = Math.max(
        this.levenshteinSimilarity(needle, haystack),
        this.jaroWinklerSimilarity(needle, haystack),
        this.ngramSimilarity(needle, haystack, 3)
      )
      const hayTokens = haystack.split(/\s+/).filter(Boolean)
      if (!hayTokens.length) {
        return phraseScore
      }

      const needleTokens = needle.split(/\s+/).filter(Boolean)
      if (!needleTokens.length) {
        return phraseScore
      }

      let tokenCoverageTotal = 0
      for (const nToken of needleTokens) {
        let bestToken = 0
        for (const hToken of hayTokens) {
          bestToken = Math.max(
            bestToken,
            this.levenshteinSimilarity(nToken, hToken),
            this.jaroWinklerSimilarity(nToken, hToken),
            this.ngramSimilarity(nToken, hToken, 2)
          )
        }
        tokenCoverageTotal += bestToken
      }

      const tokenCoverageScore = tokenCoverageTotal / needleTokens.length
      return (tokenCoverageScore * 0.75) + (phraseScore * 0.25)
    },

    ngramSimilarity (left, right, size = 3) {
      if (!left || !right) {
        return 0
      }

      const grams = (value) => {
        const text = ` ${value} `
        if (text.length <= size) {
          return new Set([text])
        }

        const set = new Set()
        for (let index = 0; index <= text.length - size; index++) {
          set.add(text.slice(index, index + size))
        }
        return set
      }

      const leftSet = grams(left)
      const rightSet = grams(right)

      let overlap = 0
      for (const gram of leftSet) {
        if (rightSet.has(gram)) {
          overlap++
        }
      }

      if (!overlap) {
        return 0
      }

      return (2 * overlap) / (leftSet.size + rightSet.size)
    },

    jaroWinklerSimilarity (left, right) {
      const jaro = this.jaroSimilarity(left, right)
      if (jaro <= 0) {
        return 0
      }

      let prefix = 0
      const maxPrefix = 4
      const limit = Math.min(maxPrefix, left.length, right.length)
      for (let i = 0; i < limit; i++) {
        if (left[i] !== right[i]) {
          break
        }
        prefix++
      }

      return jaro + (prefix * 0.1 * (1 - jaro))
    },

    jaroSimilarity (left, right) {
      if (left === right) {
        return 1
      }
      if (!left.length || !right.length) {
        return 0
      }

      const matchDistance = Math.floor(Math.max(left.length, right.length) / 2) - 1
      const leftMatches = new Array(left.length).fill(false)
      const rightMatches = new Array(right.length).fill(false)
      let matches = 0

      for (let i = 0; i < left.length; i++) {
        const start = Math.max(0, i - matchDistance)
        const end = Math.min(i + matchDistance + 1, right.length)

        for (let j = start; j < end; j++) {
          if (rightMatches[j] || left[i] !== right[j]) {
            continue
          }

          leftMatches[i] = true
          rightMatches[j] = true
          matches++
          break
        }
      }

      if (!matches) {
        return 0
      }

      let transpositions = 0
      let rightIndex = 0
      for (let i = 0; i < left.length; i++) {
        if (!leftMatches[i]) {
          continue
        }
        while (!rightMatches[rightIndex]) {
          rightIndex++
        }
        if (left[i] !== right[rightIndex]) {
          transpositions++
        }
        rightIndex++
      }

      const t = transpositions / 2
      return (
        (matches / left.length) +
        (matches / right.length) +
        ((matches - t) / matches)
      ) / 3
    },

    levenshteinSimilarity (left, right) {
      if (left === right) {
        return 1
      }
      if (!left.length || !right.length) {
        return 0
      }

      const distance = this.levenshteinDistance(left, right)
      return 1 - (distance / Math.max(left.length, right.length))
    },

    levenshteinDistance (left, right) {
      const previous = Array.from({ length: right.length + 1 }, (_, index) => index)
      const current = new Array(right.length + 1)

      for (let i = 1; i <= left.length; i++) {
        current[0] = i
        for (let j = 1; j <= right.length; j++) {
          const cost = left[i - 1] === right[j - 1] ? 0 : 1
          current[j] = Math.min(
            current[j - 1] + 1,
            previous[j] + 1,
            previous[j - 1] + cost
          )
        }

        for (let j = 0; j <= right.length; j++) {
          previous[j] = current[j]
        }
      }

      return previous[right.length]
    },

    escapeRegExp (value) {
      return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    },

    highlightText (fullText, target) {
      const trimmedTarget = (target || '').trim()
      if (!trimmedTarget) {
        return fullText
      }

      const words = trimmedTarget.split(/\s+/).filter(Boolean)
      let result = fullText
      for (const word of words) {
        result = result.replace(new RegExp(this.escapeRegExp(word), 'ig'), '<em>$&</em>')
      }
      return result
    },

    getSuggestionText (topic, reason) {
      return `Topic: ${topic} | ${reason}`
    }
  }
}
</script>

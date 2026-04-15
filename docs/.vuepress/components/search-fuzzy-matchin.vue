<script>
import VuepressSearchBox from '@vuepress/plugin-search/SearchBox.vue'
import matchQuery from '@vuepress/plugin-search/match-query'

/* global SEARCH_MAX_SUGGESTIONS */
const TYPO_MIN_SIMILARITY = 0.55
const TYPO_MIN_SIMILARITY_MEDIUM = 0.5
const TYPO_MIN_SIMILARITY_SHORT = 0.45
const TYPO_FALLBACK_MIN_SIMILARITY = 0.35
const TOKEN_CORRECTION_MIN_SIMILARITY = 0.64

export default {
  name: 'search-fuzzy-matchin',
  extends: VuepressSearchBox,

  computed: {
    suggestions () {
      const query = (this.query || '').trim().toLowerCase()
      if (!query) {
        return
      }

      const pages = this.searchablePages()
      const max = this.$site.themeConfig.searchMaxSuggestions || SEARCH_MAX_SUGGESTIONS

      const exact = this.buildExactSuggestions(query, pages, max)
      if (exact.length > 0) {
        return exact
      }

      const tokenModel = this.buildTokenModel(pages)
      const corrected = this.correctNormalizedQuery(query, tokenModel)
      if (corrected && corrected !== query) {
        const correctedExact = this.buildExactSuggestions(corrected, pages, max)
        if (correctedExact.length > 0) {
          return correctedExact
        }
      }

      return this.buildFuzzySuggestions(query, corrected || query, pages, max)
    }
  },

  methods: {
    searchablePages () {
      const { pages } = this.$site
      const localePath = this.$localePath
      const currentVersion = this.$page && this.$page.version
      return pages.filter((page) => {
        return this.getPageLocalePath(page) === localePath && this.isSearchable(page) && (!currentVersion || page.version === currentVersion)
      })
    },

    buildExactSuggestions (query, pages, max) {
      const results = []
      for (let i = 0; i < pages.length; i++) {
        if (results.length >= max) {
          break
        }

        const page = pages[i]
        if (matchQuery(query, page)) {
          results.push(page)
          continue
        }

        for (let j = 0; j < (page.headers || []).length; j++) {
          if (results.length >= max) {
            break
          }
          const header = page.headers[j]
          if (header.title && matchQuery(query, page, header.title)) {
            results.push(Object.assign({}, page, {
              path: `${page.path}#${header.slug}`,
              header
            }))
          }
        }
      }
      return results
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

    tokenize (value) {
      return String(value || '').split(/\s+/).filter(Boolean)
    },

    buildTokenModel (pages) {
      const tokenSet = new Set()
      const tokenFrequency = new Map()
      const bigramFrequency = new Map()

      const inc = (map, key) => map.set(key, (map.get(key) || 0) + 1)
      const ingest = (text) => {
        const tokens = this.tokenize(this.normalizeText(text))
        for (let i = 0; i < tokens.length; i++) {
          const token = tokens[i]
          tokenSet.add(token)
          inc(tokenFrequency, token)
          if (i > 0) {
            inc(bigramFrequency, `${tokens[i - 1]} ${token}`)
          }
        }
      }

      for (const page of pages) {
        ingest(page.title)
        if (page.frontmatter && Array.isArray(page.frontmatter.tags)) {
          ingest(page.frontmatter.tags.join(' '))
        }
        for (const header of page.headers || []) {
          ingest(header.title)
        }
      }

      return {
        vocabulary: Array.from(tokenSet),
        tokenSet,
        tokenFrequency,
        bigramFrequency
      }
    },

    correctNormalizedQuery (normalizedQuery, tokenModel) {
      const tokens = this.tokenize(normalizedQuery)
      if (!tokens.length || !tokenModel || !tokenModel.vocabulary.length) {
        return normalizedQuery
      }

      const { vocabulary, tokenSet, tokenFrequency, bigramFrequency } = tokenModel

      const correctedTokens = tokens.map((token, index, allTokens) => {
        if (token.length < 3 || tokenSet.has(token)) {
          return token
        }

        const prev = index > 0 ? allTokens[index - 1] : null
        const next = index < allTokens.length - 1 ? allTokens[index + 1] : null

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

          const leftPair = prev ? `${prev} ${candidate}` : null
          const rightPair = next ? `${candidate} ${next}` : null
          const contextBoost =
            (leftPair ? (bigramFrequency.get(leftPair) || 0) : 0) +
            (rightPair ? (bigramFrequency.get(rightPair) || 0) : 0)

          const frequencyBoost = tokenFrequency.get(candidate) || 0
          const score = similarity + (Math.min(contextBoost, 6) * 0.06) + (Math.min(frequencyBoost, 20) * 0.01)

          if (score > bestScore) {
            bestScore = score
            bestCandidate = candidate
          }
        }

        return bestScore >= TOKEN_CORRECTION_MIN_SIMILARITY ? bestCandidate : token
      })

      return correctedTokens.join(' ')
    },

    buildFuzzySuggestions (originalQuery, correctedQuery, pages, max) {
      const minSimilarity = this.getMinSimilarityThreshold(correctedQuery)
      const ranked = []

      for (const page of pages) {
        const titleNorm = this.normalizeText(page.title)
        let bestScore = Math.max(
          this.getSimilarityScore(originalQuery, titleNorm),
          this.getSimilarityScore(correctedQuery, titleNorm)
        )
        let bestHeader = null

        for (const header of page.headers || []) {
          const headerNorm = this.normalizeText(header.title)
          const headerScore = Math.max(
            this.getSimilarityScore(originalQuery, headerNorm),
            this.getSimilarityScore(correctedQuery, headerNorm)
          )
          if (headerScore > bestScore) {
            bestScore = headerScore
            bestHeader = header
          }
        }

        ranked.push(bestHeader
          ? Object.assign({}, page, { path: `${page.path}#${bestHeader.slug}`, header: bestHeader, _score: bestScore })
          : Object.assign({}, page, { _score: bestScore }))
      }

      const ordered = ranked.sort((a, b) => b._score - a._score)
      const strong = ordered.filter(item => item._score >= minSimilarity)
      const fallback = strong.length > 0
        ? strong
        : ordered.filter(item => item._score >= TYPO_FALLBACK_MIN_SIMILARITY)
      const pool = fallback.length > 0 ? fallback : ordered

      return pool.slice(0, max).map((item) => {
        const copy = Object.assign({}, item)
        delete copy._score
        return copy
      })
    },

    getMinSimilarityThreshold (normalizedQuery) {
      const tokens = this.tokenize(normalizedQuery)
      const longest = tokens.reduce((max, token) => Math.max(max, token.length), 0)
      if (longest <= 5) {
        return TYPO_MIN_SIMILARITY_SHORT
      }
      if (longest <= 8) {
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

      const hayTokens = this.tokenize(haystack)
      const needleTokens = this.tokenize(needle)
      if (!hayTokens.length || !needleTokens.length) {
        return phraseScore
      }

      let tokenCoverage = 0
      for (const nToken of needleTokens) {
        let best = 0
        for (const hToken of hayTokens) {
          best = Math.max(
            best,
            this.levenshteinSimilarity(nToken, hToken),
            this.jaroWinklerSimilarity(nToken, hToken),
            this.ngramSimilarity(nToken, hToken, 2)
          )
        }
        tokenCoverage += best
      }

      return ((tokenCoverage / needleTokens.length) * 0.75) + (phraseScore * 0.25)
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
        for (let i = 0; i <= text.length - size; i++) {
          set.add(text.slice(i, i + size))
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
      return overlap ? (2 * overlap) / (leftSet.size + rightSet.size) : 0
    },

    jaroWinklerSimilarity (left, right) {
      const jaro = this.jaroSimilarity(left, right)
      if (jaro <= 0) {
        return 0
      }

      let prefix = 0
      const limit = Math.min(4, left.length, right.length)
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
      return ((matches / left.length) + (matches / right.length) + ((matches - t) / matches)) / 3
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
    }
  }
}
</script>

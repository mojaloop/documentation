const { description } = require('../../package')


module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Mojaloop Documentation 2.0',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#00a3ff' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  theme: 'titanium',

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: 'Edit this page on GitHub',
    smoothScroll: true,
    logo: '/mojaloop_logo_med.png',
    sidebarDepth: 2,
    lastUpdated: true,
    nav: [
      {
        text: 'Getting Started',
        link: '/getting-started/',
      },
      {
        text: 'Community',
        link: '/community/'
      },
      {
        text: 'Technical',
        link: '/technical/'
      },
      {
        text: 'Training Program',
        link: 'https://mojaloop.io/mojaloop-training-program/'
      }
    ],
    sidebar: {
      'getting-started/': [
        {
          title: 'Getting Started',
          collapsable: false,
          children: ['']
        },
        {
          title: 'Quickstarts',
          collapsable: false,
          children: [
            ['quickstart', 'Quickstarts'],
            ['quickstart-one', 'Quickstart One'],
            ['quickstart-two', 'Quickstart Two']
          ]
        },
        {
          title: 'Demos',
          collapsable: false,
          children: [
            'demo',
            'demo-one'
          ]
        },
        {
          title: 'FAQs',
          collapsable: false,
          children: [
            ['faqs', 'Frequently Asked Questions'],
            ['general-faqs', 'General FAQs'],
            ['technical-faqs', 'Technical FAQs']
          ],
          sidebarDepth: 2
        },
      ],
      'community/': [
        {
          title: 'Community',
          collapsable: false,
          children: [
            ['contributors-guide', 'Contributor\'s Guide'],
            ['new-contributor-checklist', 'New Contributor Checklist'],
            ['code-of-conduct', 'Code of Conduct'],
            ['signing-the-cla', 'Signing the CLA'],
          ],
          sidebarDepth: 2
        },
        {
          title: 'Community Standards',
          collapsable: false,
          children: [
            ['standards', 'Standards\'s Guide'],
            ['versioning', 'Versioning'],
            ['creating-new-features', 'Creating new features'],
            ['triaging-bugs', 'Triaging bugs'],
          ],
          sidebarDepth: 2
        },
        {
          title: 'Tools and Technologies',
          collapsable: false,
          children: [
            ['tools-and-technologies', 'Tools'],
            ['pragmatic-rest', 'Pragmatic Rest'],
            ['code-quality-metrics', 'Code Quality Metrics'],
            ['automated-testing', 'Automated Testing'],
          ],
          sidebarDepth: 2
        },
        {
          title: 'Documentation',
          collapsable: false,
          children: [
            ['documentation', 'Documentation'],
            ['api-documentation', 'API Documentation'],
            ['documentation-style-guide', 'Documentation Style Guide'],
          ]
        }
      ]
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    'versioning'
  ]
}

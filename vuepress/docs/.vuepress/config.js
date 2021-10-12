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
        text: 'API',
        link: '/api/'
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
            ['contributing/contributors-guide', 'Contributors\' Guide'],
            ['contributing/new-contributor-checklist', 'New Contributor Checklist'],
            ['contributing/code-of-conduct', 'Code of Conduct'],
            ['contributing/signing-the-cla', 'Signing the CLA'],
          ],
          sidebarDepth: 2
        },
        {
          title: 'Community Standards',
          collapsable: false,
          children: [
            ['standards/guide', 'Our Standards'],
            ['standards/versioning', 'Versioning'],
            ['standards/creating-new-features', 'Creating New Features'],
            ['standards/triaging-bugs', 'Triaging Bugs'],
          ],
          sidebarDepth: 2
        },
        {
          title: 'Tools and Technologies',
          collapsable: false,
          children: [
            ['tools/tools-and-technologies', 'Tools'],
            ['tools/pragmatic-rest', 'Pragmatic Rest'],
            ['tools/code-quality-metrics', 'Code Quality Metrics'],
            ['tools/automated-testing', 'Automated Testing'],
          ],
          sidebarDepth: 2
        },
        {
          title: 'Documentation',
          collapsable: false,
          children: [
            ['documentation/standards', 'Standards'],
            ['documentation/api-documentation', 'API Documentation'],
            ['documentation/style-guide', 'Style Guide'],
          ]
        },
        {
          title: 'Community Resources',
          collapsable: false,
          children: [
            {
              title: 'Resources',
              collapsable: false,
              children: [
                ['mojaloop-roadmap', 'Product Roadmap'],
                ['mojaloop-publications', 'Mojaloop Publications'],
              ]
            },
            {
              title: 'Notes Archive',
              collapsable: true,
              path: 'archive/notes/',
              children: [
                ['archive/notes/ccb-notes', 'CCB Notes'],
                ['archive/notes/da-notes', 'Meeting Notes'],
                ['archive/notes/scrum-of-scrum-notes', 'Scrum Notes']
              ]
            },
            {
              title: 'Discussion Docs Archive',
              collapsable: true,
              path: 'archive/discussion-docs/',
              children: [
                {
                  title: 'PI 10',
                  collapsable: true,
                  children: [
                    ['archive/discussion-docs/performance-project', 'Performance Project'],
                    ['archive/discussion-docs/code-improvement', 'Code Improvement Project'],
                    ['archive/discussion-docs/cross-border', 'Cross Border Project'],
                    ['archive/discussion-docs/psip-project', 'PSIP Project']
                  ]
                },
                {
                  title: 'PI 9',
                  collapsable: true,
                  children: [
                    ['archive/discussion-docs/versioning-draft-proposal', 'Versioning Draft Proposal'],
                  ]
                },
                {
                  title: 'PI 8',
                  collapsable: true,
                  children: [
                    ['archive/discussion-docs/cross-border-day-1', 'CB Day 1 Meeting Notes'],
                    ['archive/discussion-docs/cross-border-day-2', 'CB Day 2 Meeting Notes'],
                    ['archive/discussion-docs/iso-integration', 'ISO Integration Overview'],
                    ['archive/discussion-docs/mojaloop-decimal', 'Mojaloop Decimal Type']
                  ]
                },
                {
                  title: 'PI 7',
                  collapsable: true,
                  children: [
                    ['archive/discussion-docs/workbench', 'Workbench Workstream'],
                  ]
                }
              ]
            },
          ],
          sidebarDepth: 4
        }
      ],
      'api/': [
        {
          title: 'Mojaloop APIs',
          collapsable: false,
          children: ['']
        },
        {
          title: 'FSPIOP API',
          collapsable: false,
          children: [
            {
              title: 'Overview',
              path: 'fspiop/',
            },
            {
              title: 'API Definitions',
              collapsable: false,
              path: 'fspiop/definitions',
              children: [
                {
                  title: 'v1.1 (Current)',
                  path: 'archive/discussion-docs/performance-project' //TODO: Update this with the right path
                },
                {
                  title: 'Older versions',
                  path: 'archive/discussion-docs/performance-project', //TODO: Update this with the right path
                  children: [
                    ['mojaloop-roadmap', 'v1.0'], //TODO: Update this with the right path
                  ]
                }
              ]
            },
            {
              title: 'Logical Data Model',
              path: 'fspiop/logical-data-model',
              collapsable: true
            },

            {
              title: 'Generic Transaction Patterns',
              path: 'fspiop/generic-transaction-patterns',
              collapsable: true
            },
            {
              title: 'Use Cases',
              path: 'fspiop/use-cases'
            },
            {
              title: 'JSON Binding Rules',
              path: 'fspiop/json-binding-rules'
            },
            {
              title: 'Scheme Rules',
              path: 'fspiop/scheme-rules',
            },
            {
              title: 'PKI Best Practices',
              path: 'fspiop/pki-best-practices',
            },
            {
              title: 'Signature (v1.1)',
              path: 'fspiop/v1.1/signature',
            },
            {
              title: 'Encryption (v1.1)',
              path: 'fspiop/v1.1/encryption',
            },
          ],
          sidebarDepth: 4
        },
        {
          title: 'Administration API',
          collapsable: false,
          children: [
            ['administration/', 'Overview'],
          ],
          sidebarDepth: 2
        },
        {
          title: 'Settlement API',
          collapsable: false,
          children: [
            ['settlement/', 'Overview'],
          ],
          sidebarDepth: 2
        },
        {
          title: '3PPI/ISP API',
          collapsable: false,
          children: [
            ['3ppi-pisp/', 'Overview'],
          ],
          sidebarDepth: 2
        },
        {
          title: 'Glossary',
          collapsable: false,
          children: [
            ['3ppi-pisp/', 'Overview'],
          ],
          sidebarDepth: 2
        },
      ],
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

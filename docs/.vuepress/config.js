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
    repo: 'https://github.com/mojaloop/documentation/',
    docsBranch: 'master',
    editLinks: true,
    docsDir: 'docs',
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
      // temporary redirect as we migrate to the new docs
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
            'demos/mojaloop-overview',
            'demos/why-mojaloop',
            'demos/working-with-mojaloop',
            'demos/financial-inclusion-101',
            'demos/what-is-rtp',
            'demos/what-makes-a-successful-financial-ecosystem',
            'demos/inside-the-loop'
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
                  path: 'fspiop/v1.1/api-definition'
                },
                {
                  title: 'Older versions',
                  path: 'fspiop/v1.0/',
                  children: [
                    ['fspiop/v1.0/api-definition', 'v1.0'],
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
            {
              title: 'Glossary',
              path: 'fspiop/glossary',
            },
          ],
          sidebarDepth: 4
        },
        {
          title: 'Administration API',
          collapsable: false,
          children: [
            {
              title: 'Overview',
              path: 'administration/'
            },
            {
              title: 'Central Ledger API',
              path: 'administration/central-ledger-api',
            },
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
          title: 'Thirdparty API',
          collapsable: false,
          path: 'thirdparty/',
          children: [
            {
              title: 'API Definitions',
              path: 'fspiop/logical-data-model',
              collapsable: true
            },
            {
              title: 'Transaction Patterns',
              path: 'thirdparty/transaction-patterns',
              collapsable: true,
              children: [
                {
                  title: 'Transaction Patterns Linking',
                  path: 'thirdparty/transaction-patterns-linking'
                },
                {
                  title: 'Transaction Patterns Transfer',
                  path: 'thirdparty/transaction-patterns-transfer'
                }
              ]
            },
            {
              title: 'Data Models',
              path: 'thirdparty/data-models',
              collapsable: true
            },
          ],
          sidebarDepth: 2
        },
        {
          title: 'Glossary',
          collapsable: false,
          children: [
            ['fspiop/glossary', 'Overview'],
          ],
        },
      ],
      "technical/": [
        {
          "title": "Mojaloop Hub",
          "collapsable": true,
          "children": [
            {
              "title": "Overview",
              "path": "overview/"
            },
            {
              "title": "Current Architecture - PI 14",
              "path": "overview/components-PI14"
            },
            {
              "title": "Current Architecture - PI 12",
              "path": "overview/components-PI12"
            },
            {
              "title": "Current Architecture - PI 11",
              "path": "overview/components-PI11"
            },
            {
              "title": "Current Architecture - PI 8",
              "path": "overview/components-PI8"
            },
            {
              "title": "Current Architecture - PI 7",
              "path": "overview/components-PI7"
            },
            {
              "title": "Current Architecture - PI 6",
              "path": "overview/components-PI6"
            },
            {
              "title": "Current Architecture - PI 5",
              "path": "overview/components-PI5"
            },
            {
              "title": "Current Architecture - PI 3",
              "path": "overview/components-PI3"
            }
          ],
          "sidebarDepth": 2
        },
        {
          "title": "Account Lookup Service",
          "collapsable": true,
          "children": [
            {
              "title": "Overview",
              "path": "account-lookup-service/"
            },
            {
              "title": "GET Participants",
              "path": "account-lookup-service/als-get-participants"
            },
            {
              "title": "POST Participants",
              "path": "account-lookup-service/als-post-participants"
            },
            {
              "title": "POST Participants (Batch)",
              "path": "account-lookup-service/als-post-participants-batch"
            },
            {
              "title": "DEL Participants",
              "path": "account-lookup-service/als-del-participants"
            },
            {
              "title": "GET Parties",
              "path": "account-lookup-service/als-get-parties"
            }
          ],
          "sidebarDepth": 2
        },
        {
          "title": "Quoting Service",
          "collapsable": true,
          "children": [
            {
              "title": "Overview",
              "path": "quoting-service/"
            },
            {
              "title": "GET Quote",
              "path": "quoting-service/qs-get-quotes"
            },
            {
              "title": "POST Quote",
              "path": "quoting-service/qs-post-quotes"
            },
            {
              "title": "GET Bulk Quote",
              "path": "quoting-service/qs-get-bulk-quotes"
            },
            {
              "title": "POST Bulk Quote",
              "path": "quoting-service/qs-post-bulk-quotes"
            }
          ],
          "sidebarDepth": 2
        },
        {
          "title": "Transaction Requests Service",
          "collapsable": true,
          "children": [
            {
              "title": "Overview",
              "path": "transaction-requests-service/"
            },
            {
              "title": "GET Transaction Requests",
              "path": "transaction-requests-service/transaction-requests-get"
            },
            {
              "title": "POST Transaction Requests",
              "path": "transaction-requests-service/transaction-requests-post"
            },
            {
              "title": "Authorizations",
              "path": "transaction-requests-service/authorizations"
            }
          ],
          "sidebarDepth": 2
        },
        {
          "title": "Central Event Processor Service",
          "collapsable": true,
          "children": [
            {
              "title": "Overview",
              "path": "central-event-processor/"
            },
            {
              "title": "Event Handler (Placeholder)",
              "path": "central-event-processor/event-handler-placeholder"
            },
            {
              "title": "Notiification Handler for Rejections",
              "path": "central-event-processor/notification-handler-for-rejections"
            },
            {
              "title": "Signature Validation",
              "path": "central-event-processor/signature-validation"
            }
          ],
          "sidebarDepth": 2
        },
        {
          "title": "Event Framework",
          "collapsable": true,
          "children": [
            {
              "title": "Overview",
              "path": "event-framework/"
            },
            {
              "title": "Event Stream Processor",
              "path": "event-stream-processor/"
            }
          ],
          "sidebarDepth": 2
        },
        {
          "title": "Fraud Services",
          "collapsable": true,
          "children": [
            {
              "title": "Overview",
              "path": "fraud-services/"
            },
            {
              "title": "Usage",
              "path": "fraud-services/related-documents/documentation"
            }
          ],
          "sidebarDepth": 2
        },
        {
          "title": "SDK Scheme Adapter",
          "collapsable": true,
          "children": [
            {
              "title": "Overview",
              "path": "sdk-scheme-adapter/"
            },
            {
              "title": "Usage",
              "path": "sdk-scheme-adapter/usage/"
            }
          ],
          "sidebarDepth": 2
        },
        {
          "title": "ML Testing Toolkit",
          "collapsable": true,
          "children": [
            {
              "title": "Overview",
              "path": "ml-testing-toolkit/"
            }
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

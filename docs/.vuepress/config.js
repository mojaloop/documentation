const { description } = require('../../package')


module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Mojaloop Documentation',
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
    footerCopyright: 'Apache 2.0 Licensed | Copyright © 2020 - 2024 Mojaloop Foundation',
    nav: [
      {
        text: 'Business',
        link: '/business/',
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
        text: 'Product',
        link: '/api/'
      },

      {
        text: 'Training Program',
        link: 'https://mojaloop.io/mojaloop-training-program/'
      }
    ],
    // Ref: https://vuepress.vuejs.org/theme/default-theme-config.html#sidebar
    sidebar: {
      '/business/': [
        {
          title: 'Business Operations documentation',
          collapsable: false,
          children: ['']
        },
        {
          title: 'Scheme',
          collapsable: false,
          children: [
            '/Scheme/platform-operating-guideline',
            '/Scheme/scheme-business-rules',
            '/Scheme/scheme-key-choices',
            '/Scheme/scheme-participation-agreement',
            '/Scheme/scheme-uniform-glossary'
          ]
        }
        // {
        //   title: 'Hub Operations',
        //   collapsable: false,
        // //   sidebarDepth: 2,
        // //   children: [
        // //     ['faqs', 'Frequently Asked Questions'],
        // //     ['general-faqs', 'General FAQs'],
        // //     ['technical-faqs', 'Technical FAQs'],
        // //     ['license', 'License'],
        // //   ]
        // // }
      ],
      '/community/': [
        {
          title: 'Community',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            ['contributing/contributors-guide', 'Contributors\' Guide'],
            ['contributing/new-contributor-checklist', 'New Contributor Checklist'],
            ['contributing/code-of-conduct', 'Code of Conduct'],
            ['contributing/signing-the-cla', 'Signing the CLA'],
            ['contributing/cvd', 'Disclosing Security Vulnerabilities'],
          ]
        },
        {
          title: 'Community Standards',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            ['standards/guide', 'Our Standards'],
            ['standards/invariants', 'Mojaloop Invariants'],
            ['standards/versioning', 'Versioning'],
            ['standards/creating-new-features', 'Creating New Features'],
            ['standards/triaging-bugs', 'Triaging Bugs'],
          ]
        },
        {
          title: 'Tools and Technologies',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            ['tools/tools-and-technologies', 'Tools'],
            ['tools/pragmatic-rest', 'Pragmatic Rest'],
            ['tools/code-quality-metrics', 'Code Quality Metrics'],
            ['tools/automated-testing', 'Automated Testing'],
            ['tools/cybersecurity', 'Cybersecurity'],
          ]
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
          sidebarDepth: 4,
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
          ]
        }
      ],
      '/api/': [
        {
          title: 'Mojaloop APIs',
          collapsable: false,
          children: ['']
        },
        {
          title: 'FSPIOP API',
          collapsable: false,
          sidebarDepth: 4,
          children: [
            {
              title: 'Overview',
              path: 'fspiop/',
            },
            {
              title: 'API Definitions',
              collapsable: false,
              children: [
                {
                  title: 'v1.1 (Current)',
                  path: 'fspiop/v1.1/api-definition'
                },
                {
                  title: 'Older versions',
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
          ]
        },
        {
          title: 'Administration API',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            {
              title: 'Overview',
              path: 'administration/'
            },
            {
              title: 'Central Ledger API',
              path: 'administration/central-ledger-api',
            },
          ]
        },
        {
          title: 'Settlement API',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            ['settlement/', 'Overview'],
          ]
        },
        {
          title: 'Thirdparty API',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            {
              title: 'Overview',
              path: 'thirdparty/',
            },
            {
              title: 'Transaction Patterns',
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
          ]
        },
        {
          title: 'Misc',
          collapsable: false,
          children: [
            ['fspiop/glossary', 'Glossary'],
            ['license', 'License'],
          ],
        },
      ],
      "/technical/": [
        {
          title: "Deployment Guide",
          collapsible: true,
          sidebarDepth: 2,
          children: [
            {
              title: "Overview",
              collapsible: true,
              sidebarDepth: 4,
              path: "deployment-guide/"
            },
            {
              title: "Releases",
              path: "deployment-guide/releases"
            },
            {
              title: "Troubleshooting",
              path: "deployment-guide/deployment-troubleshooting"
            },
            {
              title: "Upgrade Strategy Guide",
              path: "deployment-guide/upgrade-strategy-guide"
            }
          ]
        },
        {
          title: "Mojaloop Hub",
          collapsable: true,
          sidebarDepth: 2,
          children: [
            {
              title: "Overview",
              path: "overview/"
            },
            {
              title: "Current Architecture - PI 14",
              path: "overview/components-PI14"
            },
            {
              title: "Current Architecture - PI 12",
              path: "overview/components-PI12"
            },
            {
              title: "Current Architecture - PI 11",
              path: "overview/components-PI11"
            },
            {
              title: "Current Architecture - PI 8",
              path: "overview/components-PI8"
            },
            {
              title: "Current Architecture - PI 7",
              path: "overview/components-PI7"
            },
            {
              title: "Current Architecture - PI 6",
              path: "overview/components-PI6"
            },
            {
              title: "Current Architecture - PI 5",
              path: "overview/components-PI5"
            },
            {
              title: "Current Architecture - PI 3",
              path: "overview/components-PI3"
            }
          ]
        },
        {
          title: "Account Lookup Service",
          collapsable: true,
          sidebarDepth: 2,
          children: [
            {
              title: "Overview",
              path: "account-lookup-service/"
            },
            {
              title: "GET Participants",
              path: "account-lookup-service/als-get-participants"
            },
            {
              title: "POST Participants",
              path: "account-lookup-service/als-post-participants"
            },
            {
              title: "POST Participants (Batch)",
              path: "account-lookup-service/als-post-participants-batch"
            },
            {
              title: "DEL Participants",
              path: "account-lookup-service/als-del-participants"
            },
            {
              title: "GET Parties",
              path: "account-lookup-service/als-get-parties"
            }
          ]
        },
        {
          title: "Quoting Service",
          collapsable: true,
          sidebarDepth: 2,
          children: [
            {
              title: "Overview",
              path: "quoting-service/"
            },
            {
              title: "GET Quote",
              path: "quoting-service/qs-get-quotes"
            },
            {
              title: "POST Quote",
              path: "quoting-service/qs-post-quotes"
            },
            {
              title: "GET Bulk Quote",
              path: "quoting-service/qs-get-bulk-quotes"
            },
            {
              title: "POST Bulk Quote",
              path: "quoting-service/qs-post-bulk-quotes"
            }
          ]
        },
        {
          title: "Central Ledger",
          collapsable: true,
          sidebarDepth: 2,
          children: [
            {
              title: "Overview",
              path: "central-ledger/"
            },
            {
              title: "Admin Operations",
              collapsable: true,
              children: [
                {
                  title: "Overview",
                  path: "central-ledger/admin-operations/",
                },
                {
                  title: "POST Participant Limit",
                  path: "central-ledger/admin-operations/1.0.0-post-participant-position-limit"
                },
                {
                  title: "GET Participant Limit Details",
                  path: "central-ledger/admin-operations/1.1.0-get-participant-limit-details"
                },
                {
                  title: "GET All Participant Limits",
                  path: "central-ledger/admin-operations/1.0.0-get-limits-for-all-participants"
                },
                {
                  title: "POST Participant limits",
                  path: "central-ledger/admin-operations/1.1.0-post-participant-limits"
                },
                {
                  title: "GET Transfer Status",
                  path: "central-ledger/admin-operations/1.1.5-get-transfer-status"
                },
                {
                  title: "POST Participant Callback",
                  path: "central-ledger/admin-operations/3.1.0-post-participant-callback-details"
                },
                {
                  title: "GET Participant Callback",
                  path: "central-ledger/admin-operations/3.1.0-get-participant-callback-details"
                },
                {
                  title: "GET Participant Position",
                  path: "central-ledger/admin-operations/4.1.0-get-participant-position-details"
                },
                {
                  title: "GET All Participants Positions",
                  path: "central-ledger/admin-operations/4.2.0-get-positions-of-all-participants"
                }
              ]
            },
            {
              title: "Transfers Operations",
              collapsable: true,
              children: [
                {
                  title: "Overview",
                  path: "central-ledger/transfers/"
                },
                {
                  title: "Prepare Handler",
                  collapsable: true,
                  children: [
                    {
                      title: "Overview",
                      path: "central-ledger/transfers/1.1.0-prepare-transfer-request"
                    },
                    {
                      title: "Prepare Handler Consume",
                      path: "central-ledger/transfers/1.1.1.a-prepare-handler-consume"
                    }
                  ]
                },
                {
                  title: "Prepare Position Handler",
                  path: "central-ledger/transfers/1.3.0-position-handler-consume"
                },
                {
                  title: "Prepare Position Handler v1.1",
                  collapsable: true,
                  children: [
                    {
                      title: "Overview",
                      path: "central-ledger/transfers/1.3.0-position-handler-consume-v1.1"
                    },
                    {
                      title: "Prepare Position Handler",
                      path: "central-ledger/transfers/1.3.1-prepare-position-handler-consume"
                    },
                    {
                      title: "Position Handler Consume",
                      path: "central-ledger/transfers/1.1.2.a-position-handler-consume"
                    }
                  ]
                },
                {
                  title: "Fulfil Handler",
                  path: "central-ledger/transfers/2.1.0-fulfil-transfer-request"
                },
                {
                  title: "Fulfil Handler v1.1",
                  collapsable: true,
                  children: [
                    {
                      title: "Overview",
                      path: "central-ledger/transfers/2.1.0-fulfil-transfer-request-v1.1"
                    },
                    {
                      title: "Fulfil Handler Consume",
                      path: "central-ledger/transfers/2.1.1-fulfil-handler-consume"
                    },
                    {
                      title: "Fulfil Handler Consume v1.1",
                      path: "central-ledger/transfers/2.1.1-fulfil-handler-consume-v1.1"
                    }
                  ]
                },
                {
                  title: "Fulfil Position Handler",
                  collapsable: true,
                  children: [
                    {
                      title: "Overview",
                      path: "central-ledger/transfers/1.3.0-position-handler-consume"
                    },
                    {
                      title: "Fulfil Position Handler",
                      path: "central-ledger/transfers/1.3.2-fulfil-position-handler-consume"
                    },
                    {
                      title: "Fulfil Position Handler v1.1",
                      path: "central-ledger/transfers/1.3.2-fulfil-position-handler-consume-v1.1"
                    }
                  ]
                },
                {
                  title: "Fulfil Reject Transfer",
                  collapsable: true,
                  children: [
                    {
                      title: "Overview",
                      path: "central-ledger/transfers/2.2.0-fulfil-reject-transfer"
                    },
                    {
                      title: "Fulfil Reject Transfer (a)",
                      path: "central-ledger/transfers/2.2.0.a-fulfil-abort-transfer"
                    },
                    {
                      title: "Fulfil Handler (Reject-Abort)",
                      path: "central-ledger/transfers/2.2.1-fulfil-reject-handler"
                    }
                  ]
                },
                {
                  title: "Fulfil Reject Transfer v1.1",
                  collapsable: true,
                  children: [
                    {
                      title: "Overview",
                      path: "central-ledger/transfers/2.2.0-fulfil-reject-transfer-v1.1"
                    },
                    {
                      title: "Fulfil Reject Transfer (a) v1.1",
                      path: "central-ledger/transfers/2.2.0.a-fulfil-abort-transfer-v1.1"
                    },
                    {
                      title: "Fulfil Handler (Reject-Abort) v1.1",
                      path: "central-ledger/transfers/2.2.1-fulfil-reject-handler-v1.1"
                    }
                  ]
                },
                {
                  title: "Notifications",
                  collapsable: true,
                  children: [
                    {
                      title: "Notification to Participant (a)",
                      path: "central-ledger/transfers/1.1.4.a-send-notification-to-participant"
                    },
                    {
                      title: "Notification to Participant (a) - v1.1",
                      path: "central-ledger/transfers/1.1.4.a-send-notification-to-participant-v1.1"
                    },
                    {
                      title: "Notification to Participant (b)",
                      path: "central-ledger/transfers/1.1.4.b-send-notification-to-participant"
                    }
                  ]
                },
                {
                  title: "Reject/Abort",
                  collapsable: true,
                  children: [
                    {
                      title: "Abort Position Handler",
                      path: "central-ledger/transfers/1.3.3-abort-position-handler-consume"
                    }
                  ]
                },
                {
                  title: "Timeout",
                  collapsable: true,
                  children: [
                    {
                      title: "Transfer Timeout",
                      path: "central-ledger/transfers/2.3.0-transfer-timeout"
                    },
                    {
                      title: "Timeout Handler Consume",
                      path: "central-ledger/transfers/2.3.1-timeout-handler-consume"
                    }
                  ]
                },
              ]
            },
            {
              title: "Bulk Transfers Operations",
              collapsable: true,
              children: [
                {
                  title: "Overview",
                  path: "central-bulk-transfers/"
                },
                {
                  title: "Bulk Prepare",
                  collapsable: true,
                  children: [
                    {
                      title: "Overview",
                      path: "central-bulk-transfers/transfers/1.1.0-bulk-prepare-transfer-request-overview"
                    },
                    {
                      title: "Bulk Prepare Handler",
                      path: "central-bulk-transfers/transfers/1.1.1-bulk-prepare-handler-consume"
                    }
                  ]
                },
                {
                  title: "Prepare Handler",
                  collapsable: true,
                  path: "central-bulk-transfers/transfers/1.2.1-prepare-handler-consume-for-bulk"
                },
                {
                  title: "Position Handler",
                  collapsable: true,
                  children: [
                    {
                      title: "Overview",
                      path: "central-bulk-transfers/transfers/1.3.0-position-handler-consume-overview"
                    },
                    {
                      title: "Prepare Position Handler Consume",
                      path: "central-bulk-transfers/transfers/1.3.1-prepare-position-handler-consume"
                    },
                    {
                      title: "Fulfil Position Handler Consume",
                      path: "central-bulk-transfers/transfers/2.3.1-fulfil-position-handler-consume"
                    },
                    {
                      title: "Fulfil Abort Position Handler Consume",
                      path: "central-bulk-transfers/transfers/2.3.2-position-consume-abort"
                    }
                  ]
                },
                {
                  title: "Bulk Fulfil Handler",
                  collapsable: true,
                  children: [
                    {
                      title: "Overview",
                      path: "central-bulk-transfers/transfers/2.1.0-bulk-fulfil-transfer-request-overview"
                    },
                    {
                      title: "Bulk Fulfil Handler Consume",
                      path: "central-bulk-transfers/transfers/2.1.1-bulk-fulfil-handler-consume"
                    },
                    {
                      title: "Fulfil Handler - Commit",
                      path: "central-bulk-transfers/transfers/2.2.1-fulfil-commit-for-bulk"
                    },
                    {
                      title: "Fulfil Handler - Reject/Abort",
                      path: "central-bulk-transfers/transfers/2.2.2-fulfil-abort-for-bulk"
                    }
                  ]
                },
                {
                  title: "Bulk Processing Handler",
                  path: "central-bulk-transfers/transfers/1.4.1-bulk-processing-handler"
                },
                {
                  title: "Notifications",
                  collapsable: true,
                  children: [
                    {
                      title: "Notification to Participant (a)",
                      path: "central-ledger/transfers/1.1.4.a-send-notification-to-participant"
                    },
                    {
                      title: "Notification to Participant (b)",
                      path: "central-ledger/transfers/1.1.4.b-send-notification-to-participant"
                    }
                  ]
                },
                {
                  title: "Timeout",
                  collapsable: true,
                  children: [
                    {
                      title: "Overview",
                      path: "central-bulk-transfers/transfers/3.1.0-transfer-timeout-overview-for-bulk"
                    },
                    {
                      title: "Timeout Handler Consume",
                      path: "central-bulk-transfers/transfers/3.1.1-transfer-timeout-handler-consume"
                    }
                  ]
                },
                {
                  title: "Bulk Abort Overview",
                  path: "central-bulk-transfers/transfers/4.1.0-transfer-abort-overview-for-bulk"
                },
                {
                  title: "Get Bulk Transfer Overview",
                  path: "central-bulk-transfers/transfers/5.1.0-transfer-get-overview-for-bulk"
                }
              ]
            }
          ]
        },
        {
          // TODO: Placeholder and temporary link for this section until it can be migrated from legacy docs.
          title: 'Central Settlement Services',
          path: 'https://docs.mojaloop.io/legacy/mojaloop-technical-overview/central-settlements/'
        },
        {
          title: "Transaction Requests Service",
          collapsable: true,
          sidebarDepth: 2,
          children: [
            {
              title: "Overview",
              path: "transaction-requests-service/"
            },
            {
              title: "GET Transaction Requests",
              path: "transaction-requests-service/transaction-requests-get"
            },
            {
              title: "POST Transaction Requests",
              path: "transaction-requests-service/transaction-requests-post"
            },
            {
              title: "Authorizations",
              path: "transaction-requests-service/authorizations"
            }
          ]
        },
        {
          title: "Central Event Processor Service",
          collapsable: true,
          sidebarDepth: 2,
          children: [
            {
              title: "Overview",
              path: "central-event-processor/"
            },
            {
              title: "Event Handler (Placeholder)",
              path: "central-event-processor/event-handler-placeholder"
            },
            {
              title: "Notification Handler for Rejections",
              path: "central-event-processor/notification-handler-for-rejections"
            },
            {
              title: "Signature Validation",
              path: "central-event-processor/signature-validation"
            }
          ]
        },
        {
          title: "Event Framework",
          collapsable: true,
          sidebarDepth: 2,
          children: [
            {
              title: "Overview",
              path: "event-framework/"
            },
            {
              title: "Event Stream Processor",
              path: "event-stream-processor/"
            }
          ]
        },
        {
          title: "Fraud Services",
          collapsable: true,
          sidebarDepth: 2,
          children: [
            {
              title: "Overview",
              path: "fraud-services/"
            },
            {
              title: "Usage",
              path: "fraud-services/related-documents/documentation"
            }
          ]
        },
        {
          title: "SDK Scheme Adapter",
          collapsable: true,
          sidebarDepth: 2,
          children: [
            {
              title: "Overview",
              path: "sdk-scheme-adapter/"
            },
            {
              title: "Integration Flow Patterns",
              path: "sdk-scheme-adapter/IntegrationFlowPatterns"
            },
            {
              title: "Request To Pay - support",
              path: "sdk-scheme-adapter/RequestToPay"
            },
            {
              title: "Bulk Integration Flow Patterns",
              path: "sdk-scheme-adapter/IntegrationBulkFlowPatterns"
            },
            {
              title: "Usage tests",
              path: "sdk-scheme-adapter/usage/"
            },
            {
              title: "Support for Bulk Transfers",
              collapsable: true,
              sidebarDepth: 2,
              children: [
                {
                  title: "Overview",
                  path: "sdk-scheme-adapter/BulkEnhancements/"
                },
                {
                  title: "API",
                  path: "sdk-scheme-adapter/BulkEnhancements/SDKBulk-API-Design"
                }, {
                  title: "DDD & Event Sourcing Design",
                  path: "sdk-scheme-adapter/BulkEnhancements/SDKBulk-EventSourcing-Design"
                }, {
                  title: "Tests",
                  path: "sdk-scheme-adapter/BulkEnhancements/SDKBulk-Tests"
                }
              ]
            }
          ]
        },
        {
          title: "ML Testing Toolkit",
          collapsable: true,
          children: [
            {
              title: "Overview",
              path: "ml-testing-toolkit/"
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

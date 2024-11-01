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
        link: '/product/'
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
          title: 'Scheme Guide',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            ['Scheme/platform-operating-guideline', 'Platform Operating Guideline Template'],
            ['Scheme/scheme-business-rules', 'Scheme Business Rules Template'],
            ['Scheme/scheme-key-choices', 'Scheme Key Choices'],
            ['Scheme/scheme-participation-agreement', 'Scheme Participation Agreement Template'],
            ['Scheme/scheme-uniform-glossary', 'Uniform Glossary Template'],
          ]
        },
        {
          title: 'Hub Operations Guide',
          // path: './HubOperations/TechOps/tech-ops-introduction',
          collapsable: false, // optional, defaults to true
          sidebarDepth: 1,    // optional, defaults to 1
          children: [
            {
              title: 'Technical Operations Guide',
              collapsable: true,
              // path: 'HubOperations/TechOps/tech-ops-introduction',
              sidebarDepth: 2,
              children: [
                'HubOperations/TechOps/tech-ops-introduction',
                'HubOperations/TechOps/incident-management',
                'HubOperations/TechOps/problem-management',
                'HubOperations/TechOps/change-management',
                'HubOperations/TechOps/release-management',
                'HubOperations/TechOps/defect-triage',
                'HubOperations/TechOps/key-terms-kpis',
                'HubOperations/TechOps/incident-management-escalation-matrix',
                'HubOperations/TechOps/service-level-agreements'
              ]
            },
            {
              title: 'Settlement Management Guide',
              collapsable: true,
              // path: './HubOperations/Settlement/settlement-management-introduction',
              sidebarDepth: 2,
              children: [
                'HubOperations/Settlement/settlement-management-introduction',
                'HubOperations/Settlement/settlement-basic-concepts',
                'HubOperations/Settlement/ledgers-in-the-hub',
              ]
            },
            {
              title: 'Guide to Finance Portal v2',
              collapsable: true,
              // path: './HubOperations/Onboarding/busops-portal-introduction',
              sidebarDepth: 2,
              children: [
                'HubOperations/Portalv2/busops-portal-introduction',
                'HubOperations/Portalv2/settlement-business-process',
                'HubOperations/Portalv2/accessing-the-portal',
                'HubOperations/Portalv2/managing-windows',
                'HubOperations/Portalv2/settling',
                'HubOperations/Portalv2/checking-settlement-details',
                'HubOperations/Portalv2/monitoring-dfsp-financial-details',
                'HubOperations/Portalv2/enabling-disabling-transactions',
                'HubOperations/Portalv2/recording-funds-in-out',
                'HubOperations/Portalv2/updating-ndc',
                'HubOperations/Portalv2/searching-for-transfer-data'
              ]
            },
            {  
              title: 'Roled-Based Access Control',
              collapsable: true,
              // path: './HubOperations/RBAC/Role-based-access-control',
              sidebarDepth: 2,
              children: [
                'HubOperations/RBAC/Role-based-access-control'
              ]
            },
            {  
              title: 'Onboarding Guide for the Hub Operator',
              collapsable: true,
              // path: './HubOperations/Onboarding/onboarding-introduction',
              sidebarDepth: 2,
              children: [
                'HubOperations/Onboarding/onboarding-introduction',
                'HubOperations/Onboarding/business-onboarding',
                'HubOperations/Onboarding/technical-onboarding',
              ]
            }       
          ]
        }
      ],
      '/community/': [
        {
          title: 'Community',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            ['contributing/contributors-guide', 'Welcome to the community'],
            ['mojaloop-roadmap', 'Product Roadmap'],
            ['mojaloop-publications', 'Mojaloop Publications']
          ]
        },
        {
          title: 'Contributing',
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
          title: 'Standards',
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
          title: 'Archive',
          collapsable: false,
          sidebarDepth: 4,
          children: [
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
      '/technical/': [
        {
          title: 'Mojaloop Technical Overview',
          collapsable: false,
          sidebarDepth: 1,
          children: [
          {
            title: "Deployment Guide",
            // path: 'technical/deployment-guide/readme',
            collapsible: true,
            sidebarDepth: 2,
            children: [
              ['technical/deployment-guide/', 'Deploying Mojaloop'],
              'technical/deployment-guide/releases',
              'technical/deployment-guide/deployment-troubleshooting',
              'technical/deployment-guide/upgrade-strategy-guide'
            ]
          },
          {
            title: "Mojaloop Hub",
            collapsable: true,
            sidebarDepth: 2,
            children: [
              ['technical/overview/','Mojaloop Component Overview'],
              'technical/overview/components-PI14',
              'technical/overview/components-PI12',
              'technical/overview/components-PI11',
              'technical/overview/components-PI8',
              'technical/overview/components-PI7',
              'technical/overview/components-PI6',
              'technical/overview/components-PI5',
              'technical/overview/components-PI3'
            ]
          },
          {
            title: "Account Lookup Service",
            collapsable: true,
            sidebarDepth: 2,
            children: [
              ['technical/account-lookup-service/', 'Overview'],
              'technical/account-lookup-service/als-get-participants',
              'technical/account-lookup-service/als-post-participants',
              'technical/account-lookup-service/als-post-participants-batch',
              'technical/account-lookup-service/als-del-participants',
              'technical/account-lookup-service/als-get-parties',
            ]
          },
          {
            title: "Quoting Service",
            collapsable: true,
            sidebarDepth: 2,
            children: [
              ['technical/quoting-service/','Overview'],
              'technical/quoting-service/qs-get-quotes',
              'technical/quoting-service/qs-post-quotes',
              'technical/quoting-service/qs-get-bulk-quotes',
              'technical/quoting-service/qs-post-bulk-quotes'
            ]
          },
          {
            title: "Central Ledger",
            collapsable: true,
            sidebarDepth: 2,
            children: [
              {
                title: "Overview",
                path: "technical/central-ledger/"
              },
              {
                title: "Admin Operations",
                collapsable: true,
                children: [
                  {
                    title: "Overview",
                    path: "technical/central-ledger/admin-operations/",
                  },
                  {
                    title: "POST Participant Limit",
                    path: "technical/central-ledger/admin-operations/1.0.0-post-participant-position-limit"
                  },
                  {
                    title: "GET Participant Limit Details",
                    path: "technical/central-ledger/admin-operations/1.1.0-get-participant-limit-details"
                  },
                  {
                    title: "GET All Participant Limits",
                    path: "technical/central-ledger/admin-operations/1.0.0-get-limits-for-all-participants"
                  },
                  {
                    title: "POST Participant limits",
                    path: "technical/central-ledger/admin-operations/1.1.0-post-participant-limits"
                  },
                  {
                    title: "GET Transfer Status",
                    path: "technical/central-ledger/admin-operations/1.1.5-get-transfer-status"
                  },
                  {
                    title: "POST Participant Callback",
                    path: "technical/central-ledger/admin-operations/3.1.0-post-participant-callback-details"
                  },
                  {
                    title: "GET Participant Callback",
                    path: "technical/central-ledger/admin-operations/3.1.0-get-participant-callback-details"
                  },
                  {
                    title: "GET Participant Position",
                    path: "technical/central-ledger/admin-operations/4.1.0-get-participant-position-details"
                  },
                  {
                    title: "GET All Participants Positions",
                    path: "technical/central-ledger/admin-operations/4.2.0-get-positions-of-all-participants"
                  }
                ]
              },
              {
                title: "Transfers Operations",
                collapsable: true,
                children: [
                  {
                    title: "Overview",
                    path: "technical/central-ledger/transfers/"
                  },
                  {
                    title: "Prepare Handler",
                    collapsable: true,
                    children: [
                      {
                        title: "Overview",
                        path: "technical/central-ledger/transfers/1.1.0-prepare-transfer-request"
                      },
                      {
                        title: "Prepare Handler Consume",
                        path: "technical/central-ledger/transfers/1.1.1.a-prepare-handler-consume"
                      }
                    ]
                  },
                  {
                    title: "Prepare Position Handler",
                    path: "technical/central-ledger/transfers/1.3.0-position-handler-consume"
                  },
                  {
                    title: "Prepare Position Handler v1.1",
                    collapsable: true,
                    children: [
                      {
                        title: "Overview",
                        path: "technical/central-ledger/transfers/1.3.0-position-handler-consume-v1.1"
                      },
                      {
                        title: "Prepare Position Handler",
                        path: "technical/central-ledger/transfers/1.3.1-prepare-position-handler-consume"
                      },
                      {
                        title: "Position Handler Consume",
                        path: "technical/central-ledger/transfers/1.1.2.a-position-handler-consume"
                      }
                    ]
                  },
                  {
                    title: "Fulfil Handler",
                    path: "technical/central-ledger/transfers/2.1.0-fulfil-transfer-request"
                  },
                  {
                    title: "Fulfil Handler v1.1",
                    collapsable: true,
                    children: [
                      {
                        title: "Overview",
                        path: "technical/central-ledger/transfers/2.1.0-fulfil-transfer-request-v1.1"
                      },
                      {
                        title: "Fulfil Handler Consume",
                        path: "technical/central-ledger/transfers/2.1.1-fulfil-handler-consume"
                      },
                      {
                        title: "Fulfil Handler Consume v1.1",
                        path: "technical/central-ledger/transfers/2.1.1-fulfil-handler-consume-v1.1"
                      }
                    ]
                  },
                  {
                    title: "Fulfil Position Handler",
                    collapsable: true,
                    children: [
                      {
                        title: "Overview",
                        path: "technical/central-ledger/transfers/1.3.0-position-handler-consume"
                      },
                      {
                        title: "Fulfil Position Handler",
                        path: "technical/central-ledger/transfers/1.3.2-fulfil-position-handler-consume"
                      },
                      {
                        title: "Fulfil Position Handler v1.1",
                        path: "technical/central-ledger/transfers/1.3.2-fulfil-position-handler-consume-v1.1"
                      }
                    ]
                  },
                  {
                    title: "Fulfil Reject Transfer",
                    collapsable: true,
                    children: [
                      {
                        title: "Overview",
                        path: "technical/central-ledger/transfers/2.2.0-fulfil-reject-transfer"
                      },
                      {
                        title: "Fulfil Reject Transfer (a)",
                        path: "technical/central-ledger/transfers/2.2.0.a-fulfil-abort-transfer"
                      },
                      {
                        title: "Fulfil Handler (Reject-Abort)",
                        path: "technical/central-ledger/transfers/2.2.1-fulfil-reject-handler"
                      }
                    ]
                  },
                  {
                    title: "Fulfil Reject Transfer v1.1",
                    collapsable: true,
                    children: [
                      {
                        title: "Overview",
                        path: "technical/central-ledger/transfers/2.2.0-fulfil-reject-transfer-v1.1"
                      },
                      {
                        title: "Fulfil Reject Transfer (a) v1.1",
                        path: "technical/central-ledger/transfers/2.2.0.a-fulfil-abort-transfer-v1.1"
                      },
                      {
                        title: "Fulfil Handler (Reject-Abort) v1.1",
                        path: "technical/central-ledger/transfers/2.2.1-fulfil-reject-handler-v1.1"
                      }
                    ]
                  },
                  {
                    title: "Notifications",
                    collapsable: true,
                    children: [
                      {
                        title: "Notification to Participant (a)",
                        path: "technical/central-ledger/transfers/1.1.4.a-send-notification-to-participant"
                      },
                      {
                        title: "Notification to Participant (a) - v1.1",
                        path: "technical/central-ledger/transfers/1.1.4.a-send-notification-to-participant-v1.1"
                      },
                      {
                        title: "Notification to Participant (b)",
                        path: "technical/central-ledger/transfers/1.1.4.b-send-notification-to-participant"
                      }
                    ]
                  },
                  {
                    title: "Reject/Abort",
                    collapsable: true,
                    children: [
                      {
                        title: "Abort Position Handler",
                        path: "technical/central-ledger/transfers/1.3.3-abort-position-handler-consume"
                      }
                    ]
                  },
                  {
                    title: "Timeout",
                    collapsable: true,
                    children: [
                      {
                        title: "Transfer Timeout",
                        path: "technical/central-ledger/transfers/2.3.0-transfer-timeout"
                      },
                      {
                        title: "Timeout Handler Consume",
                        path: "technical/central-ledger/transfers/2.3.1-timeout-handler-consume"
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
                    path: "technical/central-bulk-transfers/"
                  },
                  {
                    title: "Bulk Prepare",
                    collapsable: true,
                    children: [
                      {
                        title: "Overview",
                        path: "technical/central-bulk-transfers/transfers/1.1.0-bulk-prepare-transfer-request-overview"
                      },
                      {
                        title: "Bulk Prepare Handler",
                        path: "technical/central-bulk-transfers/transfers/1.1.1-bulk-prepare-handler-consume"
                      }
                    ]
                  },
                  {
                    title: "Prepare Handler",
                    collapsable: true,
                    path: "technical/central-bulk-transfers/transfers/1.2.1-prepare-handler-consume-for-bulk"
                  },
                  {
                    title: "Position Handler",
                    collapsable: true,
                    children: [
                      {
                        title: "Overview",
                        path: "technical/central-bulk-transfers/transfers/1.3.0-position-handler-consume-overview"
                      },
                      {
                        title: "Prepare Position Handler Consume",
                        path: "technical/central-bulk-transfers/transfers/1.3.1-prepare-position-handler-consume"
                      },
                      {
                        title: "Fulfil Position Handler Consume",
                        path: "technical/central-bulk-transfers/transfers/2.3.1-fulfil-position-handler-consume"
                      },
                      {
                        title: "Fulfil Abort Position Handler Consume",
                        path: "technical/central-bulk-transfers/transfers/2.3.2-position-consume-abort"
                      }
                    ]
                  },
                  {
                    title: "Bulk Fulfil Handler",
                    collapsable: true,
                    children: [
                      {
                        title: "Overview",
                        path: "technical/central-bulk-transfers/transfers/2.1.0-bulk-fulfil-transfer-request-overview"
                      },
                      {
                        title: "Bulk Fulfil Handler Consume",
                        path: "technical/central-bulk-transfers/transfers/2.1.1-bulk-fulfil-handler-consume"
                      },
                      {
                        title: "Fulfil Handler - Commit",
                        path: "technical/central-bulk-transfers/transfers/2.2.1-fulfil-commit-for-bulk"
                      },
                      {
                        title: "Fulfil Handler - Reject/Abort",
                        path: "technical/central-bulk-transfers/transfers/2.2.2-fulfil-abort-for-bulk"
                      }
                    ]
                  },
                  {
                    title: "Bulk Processing Handler",
                    path: "technical/central-bulk-transfers/transfers/1.4.1-bulk-processing-handler"
                  },
                  {
                    title: "Notifications",
                    collapsable: true,
                    children: [
                      {
                        title: "Notification to Participant (a)",
                        path: "technical/central-ledger/transfers/1.1.4.a-send-notification-to-participant"
                      },
                      {
                        title: "Notification to Participant (b)",
                        path: "technical/central-ledger/transfers/1.1.4.b-send-notification-to-participant"
                      }
                    ]
                  },
                  {
                    title: "Timeout",
                    collapsable: true,
                    children: [
                      {
                        title: "Overview",
                        path: "technical/central-bulk-transfers/transfers/3.1.0-transfer-timeout-overview-for-bulk"
                      },
                      {
                        title: "Timeout Handler Consume",
                        path: "technical/central-bulk-transfers/transfers/3.1.1-transfer-timeout-handler-consume"
                      }
                    ]
                  },
                  {
                    title: "Bulk Abort Overview",
                    path: "technical/central-bulk-transfers/transfers/4.1.0-transfer-abort-overview-for-bulk"
                  },
                  {
                    title: "Get Bulk Transfer Overview",
                    path: "technical/central-bulk-transfers/transfers/5.1.0-transfer-get-overview-for-bulk"
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
                path: "technical/transaction-requests-service/"
              },
              {
                title: "GET Transaction Requests",
                path: "technical/transaction-requests-service/transaction-requests-get"
              },
              {
                title: "POST Transaction Requests",
                path: "technical/transaction-requests-service/transaction-requests-post"
              },
              {
                title: "Authorizations",
                path: "technical/transaction-requests-service/authorizations"
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
                path: "technical/central-event-processor/"
              },
              {
                title: "Event Handler (Placeholder)",
                path: "technical/central-event-processor/event-handler-placeholder"
              },
              {
                title: "Notification Handler for Rejections",
                path: "technical/central-event-processor/notification-handler-for-rejections"
              },
              {
                title: "Signature Validation",
                path: "technical/central-event-processor/signature-validation"
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
                path: "technical/event-framework/"
              },
              {
                title: "Event Stream Processor",
                path: "technical/event-stream-processor/"
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
                path: "technical/fraud-services/"
              },
              {
                title: "Usage",
                path: "technical/fraud-services/related-documents/documentation"
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
                path: "technical/sdk-scheme-adapter/"
              },
              {
                title: "Integration Flow Patterns",
                path: "technical/sdk-scheme-adapter/IntegrationFlowPatterns"
              },
              {
                title: "Request To Pay - support",
                path: "technical/sdk-scheme-adapter/RequestToPay"
              },
              {
                title: "Bulk Integration Flow Patterns",
                path: "technical/sdk-scheme-adapter/IntegrationBulkFlowPatterns"
              },
              {
                title: "Usage tests",
                path: "technical/sdk-scheme-adapter/usage/"
              },
              {
                title: "Support for Bulk Transfers",
                collapsable: true,
                sidebarDepth: 2,
                children: [
                  {
                    title: "Overview",
                    path: "technical/sdk-scheme-adapter/BulkEnhancements/"
                  },
                  {
                    title: "API",
                    path: "technical/sdk-scheme-adapter/BulkEnhancements/SDKBulk-API-Design"
                  }, {
                    title: "DDD & Event Sourcing Design",
                    path: "technical/sdk-scheme-adapter/BulkEnhancements/SDKBulk-EventSourcing-Design"
                  }, {
                    title: "Tests",
                    path: "technical/sdk-scheme-adapter/BulkEnhancements/SDKBulk-Tests"
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
                path: "technical/ml-testing-toolkit/"
              }
            ]
          }
        ]
        },
        {
          title: 'Reference architecture',
          // path: './HubOperations/TechOps/tech-ops-introduction',
          collapsable: true, // optional, defaults to true
          sidebarDepth: 1,    // optional, defaults to 1
          children: [
            {
              title: 'Bounded Contexts',
              // path: 'reference-architecture/boundedContexts/',      // optional, link of the title, which should be an absolute path and must exist
              //collapsable: false,
              initialOpenGroupIndex: -1,
              children: [
                {
                  title: 'Common Terms & Conventions',
                  path: 'reference-architecture/boundedContexts/commonTermsConventions/',      // optional, link of the title, which should be an absolute path and must exist
                  // children: [ /* ... */ ],
                },
                {
                  title: 'Account Lookup & Discovery',
                  path: 'reference-architecture/boundedContexts/accountLookupAndDiscovery/',      // optional, link of the title, which should be an absolute path and must exist
                  // children: [ /* ... */ ],
                },
                {
                  title: 'Accounts & Balances',
                  path: 'reference-architecture/boundedContexts/accountsAndBalances/',      // optional, link of the title, which should be an absolute path and must exist
                  // children: [ /* ... */ ],
                },
                {
                  title: 'Quoting/Agreements',
                  path: 'reference-architecture/boundedContexts/quotingAgreement/',      // optional, link of the title, which should be an absolute path and must exist
                  // children: [ /* ... */ ],
                },
                {
                  title: 'Auditing',
                  path: 'reference-architecture/boundedContexts/auditing/',      // optional, link of the title, which should be an absolute path and must exist
                  // children: [ /* ... */ ],
                },
                {
                  title: 'FSP Interop API',
                  path: 'reference-architecture/boundedContexts/fspInteropApi/',      // optional, link of the title, which should be an absolute path and must exist
                  // children: [ /* ... */ ],
                },
                {
                  title: 'Logging',
                  path: 'reference-architecture/boundedContexts/logging/',      // optional, link of the title, which should be an absolute path and must exist
                  // children: [ /* ... */ ],
                },
                {
                  title: 'Notifications And Alerts',
                  path: 'reference-architecture/boundedContexts/notificationsAndAlerts/',      // optional, link of the title, which should be an absolute path and must exist
                  // children: [ /* ... */ ],
                },
                {
                  title: 'Participant Lifecycle Management',
                  path: 'reference-architecture/boundedContexts/participantLifecycleManagement/',      // optional, link of the title, which should be an absolute path and must exist
                  // children: [ /* ... */ ],
                },
                //{
                //  title: 'Platform Monitoring',
                //  path: '/boundedContexts/platformMonitoring/',      // optional, link of the title, which should be an absolute path and must exist
                // children: [ /* ... */ ],
                //},
                {
                  title: 'Reporting',
                  path: 'reference-architecture/boundedContexts/reporting/',      // optional, link of the title, which should be an absolute path and must exist
                  // children: [ /* ... */ ],
                },
                {
                  title: 'Scheduling',
                  path: 'reference-architecture/boundedContexts/scheduling/',      // optional, link of the title, which should be an absolute path and must exist
                  // children: [ /* ... */ ],
                },
                {
                  title: 'Security',
                  path: 'reference-architecture/boundedContexts/security/',      // optional, link of the title, which should be an absolute path and must exist
                  // children: [ /* ... */ ],
                },
                {
                  title: 'Settlements',
                  path: 'reference-architecture/boundedContexts/settlements/',      // optional, link of the title, which should be an absolute path and must exist
                  // children: [ /* ... */ ],
                },
                {
                  title: 'Third Party API',
                  path: 'reference-architecture/boundedContexts/thirdPartyApi/',      // optional, link of the title, which should be an absolute path and must exist
                  // children: [ /* ... */ ],
                },
                {
                  title: 'Transfers',
                  path: 'reference-architecture/boundedContexts/transfers/',      // optional, link of the title, which should be an absolute path and must exist
                  // children: [ /* ... */ ],
                },
              ],
            },
            {
              title: 'Common Interface List',
              path: 'reference-architecture/boundedContexts/commonInterfaces/',      // optional, link of the title, which should be an absolute path and must exist
              // children: [ /* ... */ ],
            },
      
      
            {
              title: 'How to Implement',
              path: 'reference-architecture/howToImplement/',      // optional, link of the title, which should be an absolute path and must exist
              // children: [ /* ... */ ],
            },
            {
              title: 'Glossary',
              path: 'reference-architecture/glossary/',      // optional, link of the title, which should be an absolute path and must exist
              // children: [ /* ... */ ],
            },
            {
              title: 'Further Reading',
              path: 'reference-architecture/furtherReading/',      // optional, link of the title, which should be an absolute path and must exist
              // children: [ /* ... */ ],
            }       
          ]
        },
        {
          title: 'Mojaloop APIs',
          collapsable: false, // optional, defaults to true
          sidebarDepth: 1,    // optional, defaults to 1
          children: [
            {
              title: 'FSPIOP API',
              collapsable: true,
              sidebarDepth: 4,
              children: [
                {
                  title: 'Overview',
                  path: 'api/fspiop/',
                },
                {
                  title: 'API Definitions',
                  collapsable: false,
                  children: [
                    {
                      title: 'v1.1 (Current)',
                      path: 'api/fspiop/v1.1/api-definition'
                    },
                    {
                      title: 'Older versions',
                      children: [
                        ['api/fspiop/v1.0/api-definition', 'v1.0'],
                      ]
                    }
                  ]
                },
                {
                  title: 'Logical Data Model',
                  path: 'api/fspiop/logical-data-model',
                  collapsable: true
                },
                {
                  title: 'Generic Transaction Patterns',
                  path: 'api/fspiop/generic-transaction-patterns',
                  collapsable: true
                },
                {
                  title: 'Use Cases',
                  path: 'api/fspiop/use-cases'
                },
                {
                  title: 'JSON Binding Rules',
                  path: 'api/fspiop/json-binding-rules'
                },
                {
                  title: 'Scheme Rules',
                  path: 'api/fspiop/scheme-rules',
                },
                {
                  title: 'PKI Best Practices',
                  path: 'api/fspiop/pki-best-practices',
                },
                {
                  title: 'Signature (v1.1)',
                  path: 'api/fspiop/v1.1/signature',
                },
                {
                  title: 'Encryption (v1.1)',
                  path: 'api/fspiop/v1.1/encryption',
                },
                {
                  title: 'Glossary',
                  path: 'api/fspiop/glossary',
                },
              ]
            },
            {
              title: 'Administration API',
              collapsable: true,
              sidebarDepth: 2,
              children: [
                {
                  title: 'Overview',
                  path: 'api/administration/'
                },
                {
                  title: 'Central Ledger API',
                  path: 'api/administration/central-ledger-api',
                },
              ]
            },
            {
              title: 'Settlement API',
              collapsable: true,
              sidebarDepth: 2,
              children: [
                ['api/settlement/', 'Overview'],
              ]
            },
            {
              title: 'Thirdparty API',
              collapsable: true,
              sidebarDepth: 2,
              children: [
                {
                  title: 'Overview',
                  path: 'api/thirdparty/',
                },
                {
                  title: 'Transaction Patterns',
                  collapsable: true,
                  children: [
                    {
                      title: 'Transaction Patterns Linking',
                      path: 'api/thirdparty/transaction-patterns-linking'
                    },
                    {
                      title: 'Transaction Patterns Transfer',
                      path: 'api/thirdparty/transaction-patterns-transfer'
                    }
                  ]
                },
                {
                  title: 'Data Models',
                  path: 'api/thirdparty/data-models',
                  collapsable: true
                },
              ]
            },
            {
              title: 'Misc',
              collapsable: true,
              children: [
                ['api/fspiop/glossary', 'Glossary'],
                ['api/license', 'License'],
              ],
            }     
          ]
        },
        {
          title: 'Mojaloop Hub Operations',
          collapsable: true, // optional, defaults to true
          sidebarDepth: 1,    // optional, defaults to 1
          children: [
            {
              title: 'Bounded Contexts',
              // path: 'reference-architecture/boundedContexts/',      // optional, link of the title, which should be an absolute path and must exist
              //collapsable: false,
              initialOpenGroupIndex: -1,
              children: [
                '',
                'business-operations-framework/SecurityBC',
                'business-operations-framework/Microfrontend-JAMStack',
                'business-operations-framework/ReportingBC',
                'business-operations-framework/ReportDeveloperGuide',
                {
                  title: "Settlement Ops Implementation",
                  path: 'business-operations-framework/SettlementBC'  
                }
              ]
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
};

// function getSideBar(folder, title) {
//   const extension = [".md"];

//   const files = fs
//     .readdirSync(path.join(`${__dirname}/../${folder}`))
//     .filter(
//       (item) =>
//         item.toLowerCase() != "readme.md" &&
//         fs.statSync(path.join(`${__dirname}/../${folder}`, item)).isFile() &&
//         extension.includes(path.extname(item))
//     );

//   return [{ title: title, children: ["", ...files] }];
// }

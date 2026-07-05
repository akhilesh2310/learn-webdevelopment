import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const dsaSidebar = [
  {
    type: 'category',
    label: 'DSA',
    link: {
      type: 'generated-index',
      title: 'DSA',
      slug: '/dsa',
      description: 'Data Structures and Algorithms study notes.',
    },
    collapsed: false,
    items: [
      'dsa/resources',
      'dsa/concepts',
      'dsa/js-vs-java',
      'dsa/toll-increase',
      'dsa/problems-solved',
    ],
  },
] satisfies SidebarsConfig[string];

const systemDesignSidebar = [
  {
    type: 'category',
    label: 'System Design',
    link: {
      type: 'generated-index',
      title: 'System Design',
      slug: '/system-design',
      description: 'System Design study notes.',
    },
    collapsed: false,
    items: [
      'system-design/interview-pattern',
      'system-design/basic-concepts',
      'system-design/resources',
      {
        type: 'category',
        label: 'System Design Questions',
        link: {
          type: 'doc',
          id: 'system-design/system-design-questions/index',
        },
        items: [
          'system-design/system-design-questions/autocomplete',
          'system-design/system-design-questions/google-search',
          'system-design/system-design-questions/google-docs',
          'system-design/system-design-questions/google-sheets',
          'system-design/system-design-questions/google-drive-dropbox',
          'system-design/system-design-questions/google-maps',
          'system-design/system-design-questions/instagram',
          'system-design/system-design-questions/facebook-news-feed',
          'system-design/system-design-questions/twitter',
          'system-design/system-design-questions/netflix',
          'system-design/system-design-questions/youtube',
          'system-design/system-design-questions/whatsapp-messenger',
          'system-design/system-design-questions/url-shortening-service',
          'system-design/system-design-questions/web-crawler',
          'system-design/system-design-questions/uber-ola',
          'system-design/system-design-questions/traffic-control-system',
          'system-design/system-design-questions/bookmyshow',
          'system-design/system-design-questions/airbnb',
          'system-design/system-design-questions/airline-management-system',
        ],
      },
      {
        type: 'category',
        label: 'DSA Roadmap',
        link: {
          type: 'doc',
          id: 'system-design/dsa-roadmap/index',
        },
        items: ['system-design/dsa-roadmap/solved'],
      },
      'system-design/worked-22nd-aug',
    ],
  },
] satisfies SidebarsConfig[string];

const webDevelopmentSidebar = [
  {
    type: 'category',
    label: 'Web Development',
    link: {
      type: 'generated-index',
      title: 'Web Development',
      slug: '/web-development',
      description: 'Web Development study notes.',
    },
    collapsed: false,
    items: [
      {
        type: 'category',
        label: 'Interview Prep Order',
        link: {type: 'doc', id: 'web-development/interview-prep-order/index'},
        items: [
          'web-development/interview-prep-order/phase-wise',
          'web-development/interview-prep-order/chatgpt-checklist',
        ],
      },
      {
        type: 'category',
        label: 'Companies',
        items: [
          'web-development/companies/adobe',
          {
            type: 'category',
            label: 'Agoda',
            link: {type: 'doc', id: 'web-development/companies/agoda/index'},
            items: [
              'web-development/companies/agoda/coding-round-1',
              'web-development/companies/agoda/platform-round-2',
              'web-development/companies/agoda/screening-round',
            ],
          },
          {
            type: 'category',
            label: 'OneTrust',
            items: ['web-development/companies/onetrust/jd'],
          },
          'web-development/companies/arcticwolf',
          'web-development/companies/walmart',
          'web-development/companies/samsung-dsp',
          'web-development/companies/forbes-advisor',
        ],
      },
      {
        type: 'category',
        label: 'Important',
        link: {type: 'doc', id: 'web-development/important/index'},
        items: [
          {
            type: 'category',
            label: 'Security',
            link: {type: 'doc', id: 'web-development/important/security/index'},
            items: [
              'web-development/important/security/jwt-csrf',
              'web-development/important/security/owasp',
              'web-development/important/security/iframe-protection',
              'web-development/important/security/xss-cross-site-scripting',
              'web-development/important/security/security-headers',
              'web-development/important/security/react-security',
            ],
          },
          {
            type: 'category',
            label: 'Performance',
            link: {type: 'doc', id: 'web-development/important/performance/index'},
            items: [
              'web-development/important/performance/core-web-vitals',
              'web-development/important/performance/rendering',
              'web-development/important/performance/react-performance',
            ],
          },
          'web-development/important/quick-questions',
          'web-development/important/accessibility',
          {
            type: 'category',
            label: 'Testing',
            link: {type: 'doc', id: 'web-development/important/testing/index'},
            items: ['web-development/important/testing/react-testing'],
          },
          'web-development/important/backend-for-fe-bff',
          'web-development/important/solid',
          {
            type: 'category',
            label: 'UX | Design System',
            link: {type: 'doc', id: 'web-development/important/ux-design-system/index'},
            items: ['web-development/important/ux-design-system/storybook'],
          },
          'web-development/important/micro-frontends',
        ],
      },
      {
        type: 'category',
        label: 'JavaScript',
        link: {type: 'doc', id: 'web-development/javascript/index'},
        items: [
          {
            type: 'category',
            label: 'JavaScript Under The Hood',
            link: {type: 'doc', id: 'web-development/javascript/javascript-under-the-hood/index'},
            items: [
              'web-development/javascript/javascript-under-the-hood/js-engine',
              'web-development/javascript/javascript-under-the-hood/url-in-browser',
              'web-development/javascript/javascript-under-the-hood/browser-rendering-pipeline',
              'web-development/javascript/javascript-under-the-hood/garbage-collector-internals',
            ],
          },
          {
            type: 'category',
            label: 'Interview Q&A',
            link: {type: 'doc', id: 'web-development/javascript/interview-q-a/index'},
            items: ['web-development/javascript/interview-q-a/quick-q-a-js'],
          },
          'web-development/javascript/js-evaluation',
          'web-development/javascript/execution-context',
          'web-development/javascript/js-fundamentals',
          'web-development/javascript/scope',
          'web-development/javascript/hoisting',
          'web-development/javascript/strict-mode',
          'web-development/javascript/event-loop',
          'web-development/javascript/objects-prototypes',
          'web-development/javascript/functions',
          'web-development/javascript/this-keyword',
          'web-development/javascript/call-bind-apply',
          'web-development/javascript/closures',
          'web-development/javascript/classes-oop',
          'web-development/javascript/arrays-collections',
          'web-development/javascript/strings',
          'web-development/javascript/temporal-new',
          'web-development/javascript/asynchronous-javascript',
          'web-development/javascript/es6-features',
          'web-development/javascript/memory-management',
          'web-development/javascript/modules',
          'web-development/javascript/advanced-js',
          'web-development/javascript/browser-apis-dom',
          'web-development/javascript/error-handling',
          'web-development/javascript/design-patterns',
          'web-development/javascript/javascript-coding-questions',
        ],
      },
      {
        type: 'category',
        label: 'TypeScript',
        link: {type: 'doc', id: 'web-development/typescript/index'},
        items: [
          'web-development/typescript/chatgpt-notes',
          'web-development/typescript/ts-concepts',
          'web-development/typescript/code',
        ],
      },
      {
        type: 'category',
        label: 'React.js',
        link: {type: 'doc', id: 'web-development/react-js/index'},
        items: [
          {
            type: 'category',
            label: '1. Fundamentals',
            link: {type: 'doc', id: 'web-development/react-js/fundamentals/index'},
            items: [
              'web-development/react-js/fundamentals/reconciliation-1',
              'web-development/react-js/fundamentals/reconciliation-2',
              'web-development/react-js/fundamentals/react-pipeline',
              'web-development/react-js/fundamentals/functional-components-vs-class-components',
              'web-development/react-js/fundamentals/react-fiber',
            ],
          },
          'web-development/react-js/rendering-components',
          'web-development/react-js/react-hooks',
          'web-development/react-js/state-management',
          'web-development/react-js/forms',
          'web-development/react-js/component-communication-patterns',
          'web-development/react-js/folder-structure',
          'web-development/react-js/core-concept-internals',
          'web-development/react-js/advanced-react-patterns',
          'web-development/react-js/error-handling-in-react',
          'web-development/react-js/react-router',
          'web-development/react-js/react-architecture',
          'web-development/react-js/react-under-the-hood',
          'web-development/react-js/coding',
        ],
      },
      {
        type: 'category',
        label: 'Next.js',
        link: {type: 'doc', id: 'web-development/next-js/index'},
        items: ['web-development/next-js/chatgpt-next'],
      },
      {
        type: 'category',
        label: 'Node.js',
        link: {type: 'doc', id: 'web-development/node-js/index'},
        items: ['web-development/node-js/chatgpt-node'],
      },
      'web-development/html-css',
      'web-development/angular',
      'web-development/video-tutorial',
    ],
  },
] satisfies SidebarsConfig[string];

const resetSidebar = [
  'intro',
  {
    type: 'link',
    label: 'DSA',
    href: '/docs/dsa',
  },
  'web-development',
  {
    type: 'link',
    label: 'System Design',
    href: '/docs/system-design',
  },
  {
    type: 'link',
    label: 'Engineering Handbook',
    href: '/docs/intro',
  },
] satisfies SidebarsConfig[string];

const sidebars: SidebarsConfig = {
  dsaSidebar,
  webDevelopmentSidebar,
  systemDesignSidebar,
};

export default sidebars;

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
      'dsa/recently-asked',
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
  webDevelopmentSidebar: resetSidebar,
  systemDesignSidebar,
};

export default sidebars;

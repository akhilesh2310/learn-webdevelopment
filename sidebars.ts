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

const resetSidebar = [
  'intro',
  {
    type: 'link',
    label: 'DSA',
    href: '/docs/dsa',
  },
  'web-development',
  'system-design',
  {
    type: 'link',
    label: 'Engineering Handbook',
    href: '/docs/intro',
  },
] satisfies SidebarsConfig[string];

const sidebars: SidebarsConfig = {
  dsaSidebar,
  webDevelopmentSidebar: resetSidebar,
  systemDesignSidebar: resetSidebar,
};

export default sidebars;

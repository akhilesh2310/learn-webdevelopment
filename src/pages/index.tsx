import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const docSections = [
  {
    title: 'DSA',
    description: 'Organized notes for data structures, algorithms, and interview patterns.',
    to: '/docs/dsa',
  },
  {
    title: 'Web Development',
    description: 'A structured home for frontend, backend, frameworks, and platform notes.',
    to: '/docs/web-development',
  },
  {
    title: 'System Design',
    description: 'Scalable categories for frontend, backend, infrastructure, and distributed systems.',
    to: '/docs/system-design',
  },
];

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description="Personal study notes for DSA, web development, and system design.">
      <main>
        <section className={styles.hero}>
          <div className="container">
            <Heading as="h1" className={styles.heroTitle}>
              {siteConfig.title}
            </Heading>
            <p className={styles.heroSubtitle}>
              A long-term documentation space for interview preparation,
              quick revision, and structured technical learning.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <div className={styles.cardGrid}>
              {docSections.map((section) => (
                <Link className={styles.card} to={section.to} key={section.title}>
                  <Heading as="h2" className={styles.cardTitle}>
                    {section.title}
                  </Heading>
                  <p className={styles.cardDescription}>{section.description}</p>
                  <span className={styles.cardLink}>Open notes</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

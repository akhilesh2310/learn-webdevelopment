# Knowledge Hierarchy

This is the master migration blueprint for the Docusaurus knowledge base.

Status: Draft for human review.

Source of truth: `source-notes/` only. The current `docs/` folder contains AI-generated output and must not be treated as authoritative.

Guardrail note: `WORKFLOWS.md` was requested but is not present in the repository. `prompts/KNOWLEDGE_ARCHITECTURE.md` was read as the available knowledge architecture file.

## Migration Rules

- Do not infer final hierarchy from Markdown heading level alone.
- Google Docs tabs and sub-tabs were flattened into exported Markdown headings.
- Use this file as the migration source of truth after approval.
- Do not migrate, move, delete, or rewrite content until this hierarchy is approved.
- Preserve source wording during migration.
- Prefer fewer correct pages over many small over-split pages.
- Repeated headings like `Quick Revision Summary`, `Final Interview-Ready Combined Answer`, and `Common Interview Topics / Questions` should usually remain inside their parent page.

## Field Legend

- Category Name: Sidebar/category/page label.
- Type: Direct Page or Collapsible Category.
- Expected Children: Children expected from the original hierarchy.
- Detected Children: Headings detected in `source-notes/`.
- Missing Children: Expected children not detected in source.
- Unexpected Headings: Source headings that may not belong as standalone pages.
- Confidence: High, Medium, or Low.
- Notes: Migration interpretation.
- TODO: Human decision needed before migration.

## DSA

DSA has only direct sidebar pages. There are no collapsible categories.

### Resources

- Category Name: Resources
- Type: Direct Page
- Expected Children: None
- Detected Children: Source heading `Resources`
- Missing Children: None
- Unexpected Headings: None
- Confidence: High
- Notes: Keep as `docs/dsa/resources.md`.
- TODO: None

### Concepts

- Category Name: Concepts
- Type: Direct Page
- Expected Children: None
- Detected Children: Source heading `Concepts`
- Missing Children: None
- Unexpected Headings: None
- Confidence: High
- Notes: Intentionally empty page. Keep it.
- TODO: Mark page as empty/TODO during migration without inventing content.

### Recently Asked

- Category Name: Recently Asked
- Type: Direct Page
- Expected Children: None
- Detected Children: Source heading `Recently Asked`
- Missing Children: None
- Unexpected Headings: None
- Confidence: High
- Notes: Keep as `docs/dsa/recently-asked.md`.
- TODO: None

### JS vs JAVA

- Category Name: JS vs JAVA
- Type: Direct Page
- Expected Children: None
- Detected Children: Source heading `JS vs JAVA`
- Missing Children: None
- Unexpected Headings: None
- Confidence: High
- Notes: Keep exact label unless owner changes capitalization later.
- TODO: None

### Toll Increase

- Category Name: Toll Increase
- Type: Direct Page
- Expected Children: None
- Detected Children: Source heading `Toll Increases`
- Missing Children: None
- Unexpected Headings: None
- Confidence: High
- Notes: Source uses plural; approved sidebar uses singular.
- TODO: Confirm display label remains `Toll Increase`.

### Problems Solved

- Category Name: Problems Solved
- Type: Direct Page
- Expected Children: None
- Detected Children: Source heading `Problems Solved:`
- Missing Children: None
- Unexpected Headings: None
- Confidence: High
- Notes: Strip trailing colon in page title.
- TODO: None

## System Design

System Design has six main sidebar items: four direct pages and two collapsible categories.

### Interview Pattern

- Category Name: Interview Pattern
- Type: Direct Page
- Expected Children: None
- Detected Children: Source heading `Interview Pattern`
- Missing Children: None
- Unexpected Headings: None
- Confidence: High
- Notes: Keep as direct page.
- TODO: None

### Basic Concepts

- Category Name: Basic Concepts
- Type: Direct Page
- Expected Children: None
- Detected Children: Source heading `Basic Concepts`
- Missing Children: None
- Unexpected Headings: None
- Confidence: High
- Notes: Keep as direct page.
- TODO: None

### Resources

- Category Name: Resources
- Type: Direct Page
- Expected Children: None
- Detected Children: Source heading `Resources`
- Missing Children: None
- Unexpected Headings: None
- Confidence: High
- Notes: Keep as direct page under System Design.
- TODO: None

### System Design Questions

- Category Name: System Design Questions
- Type: Collapsible Category
- Expected Children: Approximately 19 child pages
- Detected Children: Autocomplete, Google Search, Google Docs, Google Sheets, Google Drive/DropBox, Google Maps, Instagram, Facebook News Feed, Twitter, Netflix, YouTube, Whatsapp Messenger, URL Shortening Service, Web Crawler, Uber/Ola, Traffic Control System, BookMyShow, Airbnb, Airline Management System
- Missing Children: None detected against expected count
- Unexpected Headings: `Polished Interview Delivery: Autocomplete Component Design`, `What to add for true L6 depth`, `How to weave this into your existing delivery`, `A 60-second addendum you can say if asked...`
- Confidence: High for category; Medium for Autocomplete subheading placement
- Notes: Source heading `System Design` should map to sidebar category `System Design Questions`.
- TODO: Keep Autocomplete follow-up headings inside `autocomplete.md` unless owner wants separate pages.

### DSA Roadmap

- Category Name: DSA Roadmap
- Type: Collapsible Category
- Expected Children: Solved
- Detected Children: Solved
- Missing Children: None
- Unexpected Headings: None
- Confidence: High
- Notes: Keep as collapsible category with one child page.
- TODO: None

### Worked 22nd Aug

- Category Name: Worked 22nd Aug
- Type: Direct Page
- Expected Children: None
- Detected Children: Source heading `Workshop 22nd Aug`
- Missing Children: None
- Unexpected Headings: None
- Confidence: Medium
- Notes: User-approved label says `Worked 22nd Aug`; source says `Workshop 22nd Aug`.
- TODO: Confirm final display label.

## Web Development

Web Development has eleven main sidebar items: eight collapsible categories and three direct pages.

### Interview Prep Order

- Category Name: Interview Prep Order
- Type: Collapsible Category
- Expected Children: Approximately 2 child pages
- Detected Children: Fastest Interview Preparation Order, Phase Wise
- Missing Children: None
- Unexpected Headings: Phase 1 First 2 Weeks, Evening 1 Hour, Phase 2 Week 3, Phase 3 Week 4, Every Day, Interview Strategy, ChatGPT Checklist, Interview Study Notes Answer Style Checklist
- Confidence: High
- Notes: `Phase Wise` is a direct child page, not a nested category. All listed phase/checklist headings belong inside `phase-wise.md`.
- TODO: None

### Companies

- Category Name: Companies
- Type: Collapsible Category
- Expected Children: Approximately 7 child pages; item 2 contains about 3 nested pages; item 4 contains about 1 nested page
- Detected Children: Adobe, Agoda, OneTrust, Arcticwolf, Walmart, Samsung DSP, Forbes Advisor
- Missing Children: None
- Unexpected Headings: JD, Questions Recently Asked in Agoda Platform Round, Coding Round 1, Platform Round 2, Screening Round
- Confidence: Medium
- Notes: Agoda appears to be nested category. OneTrust appears to contain JD.
- TODO: Confirm whether Agoda has 3 or 4 nested pages, and whether `Questions Recently Asked in Agoda Platform Round` is a nested page or part of Agoda overview.

### Important

- Category Name: Important
- Type: Collapsible Category
- Expected Children: Approximately 9 child pages, with some nested pages
- Detected Children: Security, Performance, Accessibility, Testing, Backend for FE (BFF), SOLID, UX / Design System, Storybook, Micro Frontends
- Missing Children: None
- Unexpected Headings: Template for the Next Topic, Expected, Quick Summary, Summary, Final Tip, Quick Questions, Pro Tips, Final Architecture, repeated XSS, iFrame Protection, Security Headers, React Performance, React Testing
- Confidence: Medium
- Notes: Security and Performance should be nested categories. Repeated summary/interview headings should remain inside parent pages.
- TODO: Confirm whether Storybook belongs as its own direct child or inside UX / Design System.

### JavaScript

- Category Name: JavaScript
- Type: Collapsible Category
- Expected Children: Approximately 27 child pages; first two pages contain nested pages
- Detected Children: JavaScript Under The Hood, JavaScript Fundamentals, Classes & OOP, Arrays & Collections, Strings, Temporal, Asynchronous JavaScript, ES6+ Features, Memory Management, Modules, Advanced JS, Browser APIs & DOM, Error Handling, Design Patterns, JavaScript Coding Questions
- Missing Children: Expected count is higher than high-confidence grouped children detected
- Unexpected Headings: Untitled headings, Part 2/Part 3 headings, Interview Callout, Quick Q&A JS, Quick Revision Summary, Final Interview-Ready Combined Answer, Common Interview Questions, repeated numbered implementation headings
- Confidence: Medium
- Notes: `JavaScript Under The Hood` and `JavaScript Fundamentals` should be nested categories. Many exported headings are sections inside pages, not pages.
- TODO: Confirm the missing items needed to reach approximately 27 sidebar children, or approve the grouped structure.

### TypeScript

- Category Name: TypeScript
- Type: Collapsible Category
- Expected Children: Approximately 3 child pages
- Detected Children: TypeScript Interview Preparation Structure, ChatGPT Notes, TS Concepts
- Missing Children: None against expected count
- Unexpected Headings: Code, Quick React / Next.js TypeScript Examples, Quick Rule, repeated TypeScript fundamentals and numbered concept headings
- Confidence: Medium
- Notes: The `Code` section may belong inside TS Concepts or as a fourth page.
- TODO: Confirm placement of `Code`.

### React.js

- Category Name: React.js
- Type: Collapsible Category
- Expected Children: Approximately 14 child pages; first page contains about 4 nested pages
- Detected Children: Fundamentals, React Fiber, Component Lifecycle & Rendering, React Hooks, State Management, Forms & Controlled Components, Component Communication Patterns, Folder Structure, React Internals, Advanced React Patterns, Error Handling, React Router, React Architecture, React Under The Hood, React Coding Interview Questions
- Missing Children: None if coding questions are folded into another page; otherwise source suggests 15 children
- Unexpected Headings: Reconciliation 1, Reconciliation 2, React Pipeline, Functional Components vs Class Components, numbered hook/state/router/interview headings, repeated Quick Revision Summary and Final Interview-Ready Combined Answer
- Confidence: Medium
- Notes: Fundamentals should contain React Fundamentals, Reconciliation, React Pipeline, and Functional Components vs Class Components as nested pages or internal sections depending on final approval.
- TODO: Confirm whether React Coding Interview Questions is its own child page or merged into another React page.

### Next.js

- Category Name: Next.js
- Type: Collapsible Category
- Expected Children: Approximately 1 child page
- Detected Children: ChatGPT Next / Next.js Interview Questions and Answers
- Missing Children: None
- Unexpected Headings: Next.js Interview Preparation Structure, numbered Next.js outline headings, Senior-Level Follow-Up Questions, Compact Interview Revision Answer
- Confidence: Medium
- Notes: Keep outline and Q&A content together unless owner wants a separate outline page.
- TODO: Confirm final child title.

### Node.js

- Category Name: Node.js
- Type: Collapsible Category
- Expected Children: Approximately 1 child page
- Detected Children: ChatGPT Node
- Missing Children: None
- Unexpected Headings: Most Important Node.js Topics to Revise Before Interview, Compact Interview Introduction for Node.js Experience
- Confidence: Medium
- Notes: Rename page title later only if owner approves; do not rewrite content during migration.
- TODO: Confirm final child title.

### HTML & CSS

- Category Name: HTML & CSS
- Type: Direct Page
- Expected Children: None
- Detected Children: Source heading `HTML & CSS`
- Missing Children: None
- Unexpected Headings: None detected from top-level source headings
- Confidence: High
- Notes: Single page.
- TODO: None

### Angular

- Category Name: Angular
- Type: Direct Page
- Expected Children: None
- Detected Children: Source heading `Angular`
- Missing Children: None
- Unexpected Headings: None detected from top-level source headings
- Confidence: High
- Notes: Single page.
- TODO: None

### Video Tutorial

- Category Name: Video Tutorial
- Type: Direct Page
- Expected Children: None
- Detected Children: Video Tutorials, Learn React With This ONE Project
- Missing Children: None
- Unexpected Headings: Learn React With This ONE Project
- Confidence: Medium
- Notes: Approved sidebar label is singular; source heading is plural. Keep project tutorial heading inside the single page.
- TODO: Confirm singular/plural display label.

## Proposed Final Shape

```text
docs/
  dsa/
    resources.md
    concepts.md
    recently-asked.md
    js-vs-java.md
    toll-increase.md
    problems-solved.md
  system-design/
    interview-pattern.md
    basic-concepts.md
    resources.md
    worked-22nd-aug.md
    system-design-questions/
      autocomplete.md
      google-search.md
      google-docs.md
      google-sheets.md
      google-drive-dropbox.md
      google-maps.md
      instagram.md
      facebook-news-feed.md
      twitter.md
      netflix.md
      youtube.md
      whatsapp-messenger.md
      url-shortening-service.md
      web-crawler.md
      uber-ola.md
      traffic-control-system.md
      bookmyshow.md
      airbnb.md
      airline-management-system.md
    dsa-roadmap/
      solved.md
  web-development/
    interview-prep-order/
      fastest-interview-preparation-order.md
      phase-wise.md
    companies/
      adobe.md
      agoda/
      onetrust/
      arcticwolf.md
      walmart.md
      samsung-dsp.md
      forbes-advisor.md
    important/
      security/
      performance/
      accessibility.md
      testing.md
      backend-for-fe-bff.md
      solid.md
      ux-design-system.md
      storybook.md
      micro-frontends.md
    javascript/
      javascript-under-the-hood/
      javascript-fundamentals/
      classes-oop.md
      arrays-collections.md
      strings.md
      temporal.md
      asynchronous-javascript.md
      es6-features.md
      memory-management.md
      modules.md
      advanced-js.md
      browser-apis-dom.md
      error-handling.md
      design-patterns.md
      javascript-coding-questions.md
    typescript/
      typescript-interview-preparation-structure.md
      chatgpt-notes.md
      ts-concepts.md
    react-js/
      fundamentals/
      react-fiber.md
      component-lifecycle-rendering.md
      react-hooks.md
      state-management.md
      forms-controlled-components.md
      component-communication-patterns.md
      folder-structure.md
      react-internals.md
      advanced-react-patterns.md
      error-handling.md
      react-router.md
      react-architecture.md
      react-under-the-hood.md
      react-coding-interview-questions.md
    next-js/
    node-js/
    html-css.md
    angular.md
    video-tutorial.md
```

## Current Docs Folder Comparison

### Incorrect Top-Level Categories

- `docs/engineering-handbook/` is outside the three-domain hierarchy and should not be part of this migration batch.
- Previously scaffolded categories shown as deletions in git status, such as `arrays`, `strings`, `linked-list`, `trees`, `graphs`, `dynamic-programming`, `frontend`, `backend`, `networking`, `databases`, `caching`, `security`, `docker`, and `kubernetes`, are not approved top-level categories.

### Incorrect Folders

- DSA currently has folders like `docs/dsa/resources/`; approved hierarchy requires flat pages like `docs/dsa/resources.md`.
- System Design currently has folders for direct pages: `interview-pattern/`, `basic-concepts/`, `resources/`, and `worked-22nd-aug/`; approved hierarchy requires direct pages.
- Web Development currently has folders for direct pages: `html-css/`, `angular/`, and `video-tutorial/`; approved hierarchy requires direct pages.
- Web Development currently has both old and new naming variants: `react/` and `react-js/`, `nextjs/` and `next-js/`, `nodejs/` and `node-js/`.

### Incorrect Pages

- Many pages in `docs/web-development/javascript/`, `docs/web-development/react/`, `docs/web-development/typescript/`, and `docs/web-development/important/` were created from internal headings and should become sections inside larger canonical pages.
- Examples include standalone pages for `quick-revision-summary`, `final-interview-ready-combined-answer`, `common-interview-topics-questions`, `interview-callout`, and many numbered subtopics.

### Duplicate Pages

- Duplicate-looking slug suffixes exist, including:
  - `cross-site-scripting-xss-2.md`
  - `iframe-protection-2.md`
  - `security-headers-2.md`
  - `browser-rendering-pipeline-2.md`
  - `common-interview-topics-questions-2.md` through multiple later suffixes
  - `final-interview-ready-combined-answer-2.md` through multiple later suffixes
  - `quick-revision-summary-2.md` through multiple later suffixes
  - React duplicates such as `react-architecture-2.md`, `react-fiber-2.md`, `react-under-the-hood-2.md`, `reconciliation-2.md`
  - TypeScript duplicates such as `1-typescript-fundamentals-2.md`, `2-functions-in-typescript-2.md`, and `typescript-interview-preparation-structure-2.md`

### Blank Pages

- No near-empty Markdown files under 80 bytes were detected in `docs/dsa`, `docs/web-development`, or `docs/system-design`.
- DSA `Concepts` is intentionally empty in the source hierarchy and should remain a TODO page after migration.

### Possible Merge Candidates

- XSS duplicate sections should merge into a single Security child page.
- iFrame Protection duplicate sections should merge into a single Security child page.
- Security Headers duplicate sections should merge into a single Security child page.
- React performance subtopics should merge under the planned Performance / React Performance grouping.
- JavaScript quick summaries and final answers should merge back into their parent JavaScript pages.
- React quick summaries and final answers should merge back into their parent React pages.
- TypeScript repeated numbered fundamentals should merge into the three approved TypeScript children.
- System Design Autocomplete addendum/follow-up headings should merge into `autocomplete.md`.

## Approval Checklist

- DSA direct pages match the original Google Docs tabs.
- System Design direct pages and collapsible categories match the original Google Docs tabs.
- Web Development top-level sidebar items match the original Google Docs tabs.
- Nested categories match original Google Docs sub-tabs.
- TODO items above have been resolved or accepted.

Only after this document is approved should migration begin.

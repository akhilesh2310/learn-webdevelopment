# Migration Manifest

This is a planning manifest only. It does not move, rewrite, summarize, or delete source content. `source-notes/` remains read-only for the next migration batch.

## Scope and source files analyzed

- Web Development: analyzed `source-notes/2. Web Development.md`. Prompt referenced `source-notes/Web Development.md`, which does not exist in this repo; using the existing prefixed export file.
- DSA: analyzed `source-notes/1. DSA.md`. Prompt referenced `source-notes/DSA.md`, which does not exist in this repo; using the existing prefixed export file.
- System Design: analyzed `source-notes/3. System Design.md`. Prompt referenced `source-notes/System Design.md`, which does not exist in this repo; using the existing prefixed export file.
- `WORKFLOWS.md` was requested as a guardrail file but was not found in the repository.
- `prompts/KNOWLEDGE_ARCHITECTURE.md` was found and read as the available knowledge architecture file.

## Source-of-truth hierarchy rules

1. Do not treat every `#` heading as a top-level category.
2. The hierarchy in this manifest is stronger truth than Markdown heading levels from Google Docs exports.
3. If an item is marked **direct page**, keep all of that section's content inside one Markdown file.
4. If an item is marked **collapsible category**, detect child pages from the source content and represent the item as a folder with `_category_.json`.
5. If a child page has nested subpages, represent it as a **nested category**.
6. If uncertain, mark `TODO: Needs manual review` instead of guessing.
7. Prefer preserving content grouping over aggressive splitting.
8. Do not create blank docs. The only currently empty expected page is DSA `Concepts`, which should be created as a TODO page later.
9. Do not modify `source-notes/` during migration.
10. Do not delete useful existing docs content without a reviewed migration step.

## Legend

- **direct page**: one Markdown file, not collapsible in the sidebar.
- **collapsible category**: folder with `_category_.json` and child pages or nested categories.
- **nested category**: folder inside a collapsible category.
- **TODO/manual review**: structure or label needs confirmation before applying docs changes.

## DSA

### Revised hierarchy

DSA has only direct side menu pages. These are not collapsible sections and do not need subpages.

```text
docs/dsa/
  resources.md
  concepts.md
  recently-asked.md
  js-vs-java.md
  toll-increase.md
  problems-solved.md
```

### Sidebar items

- Resources — **direct page**
- Concepts — **direct page**, TODO: currently empty; keep as empty/TODO page during migration.
- Recently Asked — **direct page**
- JS vs JAVA — **direct page**
- Toll Increase — **direct page**; source heading is `Toll Increases`, but sidebar label should remain `Toll Increase` unless renamed by owner.
- Problems Solved — **direct page**

### Migration notes

- DSA can be applied in one shot later.
- Do not create `docs/dsa/resources/index.md` style folders for these items.
- Do not create subpages from headings inside DSA sections.

## System Design

### Revised hierarchy

System Design has 6 main side menu items: 4 direct pages and 2 collapsible categories.

```text
docs/system-design/
  interview-pattern.md
  basic-concepts.md
  resources.md
  worked-22nd-aug.md
  system-design-questions/
    _category_.json
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
    _category_.json
    solved.md
```

### Sidebar items

- Interview Pattern — **direct page**
- Basic Concepts — **direct page**
- Resources — **direct page**
- System Design Questions — **collapsible category**
- DSA Roadmap — **collapsible category**
- Worked 22nd Aug — **direct page**; source heading is `Workshop 22nd Aug`, TODO: confirm final display label.

### System Design Questions children

- Autocomplete — **direct child page**
  - TODO: keep `Polished Interview Delivery: Autocomplete Component Design`, `What to add for true L6 depth`, `How to weave this into your existing delivery`, and `A 60-second addendum...` inside `autocomplete.md` unless owner wants separate child pages.
- Google Search — **direct child page**
- Google Docs — **direct child page**
- Google Sheets — **direct child page**
- Google Drive / Dropbox — **direct child page**
- Google Maps — **direct child page**
- Instagram — **direct child page**
- Facebook News Feed — **direct child page**
- Twitter — **direct child page**
- Netflix — **direct child page**
- YouTube — **direct child page**
- WhatsApp Messenger — **direct child page**
- URL Shortening Service — **direct child page**
- Web Crawler — **direct child page**
- Uber / Ola — **direct child page**
- Traffic Control System — **direct child page**
- BookMyShow — **direct child page**
- Airbnb — **direct child page**
- Airline Management System — **direct child page**

### DSA Roadmap children

- Solved — **direct child page**

### Migration notes

- Source heading `System Design` maps to sidebar category `System Design Questions`.
- Do not create direct pages for every follow-up heading under Autocomplete.
- Do not create blank docs for system design question titles that have no body yet; if a title has no content, create only if the owner wants visible TODO pages.

## Web Development

### Revised hierarchy

Web Development has 11 main side menu items: 8 collapsible categories and 3 direct pages.

```text
docs/web-development/
  interview-prep-order/
    _category_.json
    fastest-interview-preparation-order.md
    phase-wise.md
  companies/
    _category_.json
    adobe.md
    agoda/
      _category_.json
      questions-recently-asked-in-agoda-platform-round.md
      coding-round-1.md
      platform-round-2.md
      screening-round.md
    onetrust/
      _category_.json
      jd.md
    arcticwolf.md
    walmart.md
    samsung-dsp.md
    forbes-advisor.md
  important/
    _category_.json
    security/
      _category_.json
      jwt-csrf.md
      owasp.md
      iframe-protection.md
      xss-cross-site-scripting.md
      security-headers.md
      react-security.md
    performance/
      _category_.json
      core-web-vitals.md
      rendering.md
      react-performance.md
    accessibility.md
    testing.md
    backend-for-fe-bff.md
    solid.md
    ux-design-system.md
    storybook.md
    micro-frontends.md
  javascript/
    _category_.json
    javascript-under-the-hood/
      _category_.json
      js-engine.md
      url-in-browser.md
      browser-rendering-pipeline.md
      garbage-collector-internals.md
    javascript-fundamentals/
      _category_.json
      js-evaluation.md
      execution-context.md
      scope.md
      hoisting.md
      strict-mode.md
      event-loop.md
      objects-prototypes.md
      functions.md
      this-keyword.md
      call-bind-apply.md
      closures.md
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
    _category_.json
    interview-preparation-structure.md
    chatgpt-notes.md
    ts-concepts.md
  react-js/
    _category_.json
    fundamentals/
      _category_.json
      react-fundamentals.md
      reconciliation.md
      react-pipeline.md
      functional-components-vs-class-components.md
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
    _category_.json
    interview-questions-and-answers.md
  node-js/
    _category_.json
    chatgpt-node.md
  html-css.md
  angular.md
  video-tutorial.md
```

### Sidebar items

- Interview Prep Order — **collapsible category**, expected 2 submenu items.
- Companies — **collapsible category**, expected 7 submenu items; item 2 has nested items, item 4 has nested item(s).
- Important — **collapsible category**, expected 9 submenu items with a few nested items.
- JavaScript — **collapsible category**, expected 27 submenu items; first 2 have nested items.
- TypeScript — **collapsible category**, expected 3 submenu items.
- React.js — **collapsible category**, expected 14 submenu items; first item has nested items.
- Next.js — **collapsible category**, expected 1 submenu item.
- Node.js — **collapsible category**, expected 1 submenu item.
- HTML & CSS — **direct page**.
- Angular — **direct page**.
- Video Tutorial — **direct page**; source heading is `Video Tutorials`, TODO: confirm singular/plural display label.

### Interview Prep Order children

- Fastest Interview Preparation Order — **direct child page**
- Phase Wise — **direct child page**
  - Keep Phase 1 First 2 Weeks, Evening 1 Hour, Phase 2 Week 3, Phase 3 Week 4, Every Day, Interview Strategy, ChatGPT Checklist, and Interview Study Notes Answer Style Checklist as content sections inside `phase-wise.md`.

### Companies children

- Adobe — **direct child page**
- Agoda — **nested category**
  - Questions Recently Asked in Agoda Platform Round — **direct nested page**
  - Coding Round 1 — **direct nested page**
  - Platform Round 2 — **direct nested page**
  - Screening Round — **direct nested page**
  - TODO: user note says item 2 has 3 nested sub-sub items, but source shows 4 likely Agoda children. Confirm whether `Questions Recently Asked...` should stay inside Agoda index content rather than a separate page.
- OneTrust — **nested category**
  - JD — **direct nested page**
  - TODO: user note says item 4 has 1 nested sub-sub item. This appears to map to OneTrust -> JD, but confirm.
- Arcticwolf — **direct child page**
- Walmart — **direct child page**
- Samsung DSP — **direct child page**
- Forbes Advisor — **direct child page**

### Important children

- Security — **nested category**
  - JWT & CSRF — **direct nested page**
  - OWASP — **direct nested page**
  - iFrame Protection — **direct nested page**
  - XSS Cross-Site Scripting — **direct nested page**
  - Security Headers — **direct nested page**
  - React Security — **direct nested page**
  - TODO: merge duplicate/repeated XSS and iFrame headings into their canonical pages.
- Performance — **nested category**
  - Core Web Vitals — **direct nested page**
  - Rendering — **direct nested page**
  - React Performance — **direct nested page**
  - TODO: keep Quick Revision Summary and Final Interview-Ready Combined Answer as sections inside related pages, not standalone pages.
- Accessibility — **direct child page**
- Testing — **direct child page**
- Backend for FE (BFF) — **direct child page**
- SOLID — **direct child page**
- UX / Design System — **direct child page**
- Storybook — **direct child page**
- Micro Frontends — **direct child page**

### JavaScript children

- JavaScript Under The Hood — **nested category**
  - JS Engine — **direct nested page**
  - URL in Browser — **direct nested page**
  - Browser Rendering Pipeline — **direct nested page**
  - Garbage Collector Internals — **direct nested page**
- JavaScript Fundamentals — **nested category**
  - JS Evaluation — **direct nested page**
  - Execution Context — **direct nested page**
  - Scope — **direct nested page**
  - Hoisting — **direct nested page**
  - Strict Mode — **direct nested page**
  - Event Loop — **direct nested page**
  - Objects & Prototypes — **direct nested page**
  - Functions — **direct nested page**
  - this keyword — **direct nested page**
  - call, bind, apply — **direct nested page**
  - Closures — **direct nested page**
- Classes & OOP — **direct child page**
- Arrays & Collections — **direct child page**
- Strings — **direct child page**
- Temporal — **direct child page**, TODO: source marks `Temporal (New)`; confirm whether it has enough content for a page.
- Asynchronous JavaScript — **direct child page**
- ES6+ Features — **direct child page**
- Memory Management — **direct child page**
- Modules — **direct child page**
- Advanced JS — **direct child page**
- Browser APIs & DOM — **direct child page**
- Error Handling — **direct child page**
- Design Patterns — **direct child page**
- JavaScript Coding Questions — **direct child page**
- TODO: expected count says 27 submenu items, but source headings suggest fewer high-confidence grouped child pages after preserving nested grouping. Review before applying.

### TypeScript children

- TypeScript Interview Preparation Structure — **direct child page**
- ChatGPT Notes — **direct child page**
- TS Concepts — **direct child page**
- TODO: source also has `Code` / quick React and Next.js examples under TypeScript. Confirm whether this belongs inside `TS Concepts`, a fourth TypeScript child, or another Web Development section.

### React.js children

- Fundamentals — **nested category**
  - React Fundamentals — **direct nested page**
  - Reconciliation — **direct nested page**
  - React Pipeline — **direct nested page**
  - Functional Components vs Class Components — **direct nested page**
- React Fiber — **direct child page**
- Component Lifecycle & Rendering — **direct child page**
- React Hooks — **direct child page**
- State Management — **direct child page**
- Forms & Controlled Components — **direct child page**
- Component Communication Patterns — **direct child page**
- Folder Structure — **direct child page**
- React Internals — **direct child page**
- Advanced React Patterns — **direct child page**
- Error Handling — **direct child page**
- React Router — **direct child page**
- React Architecture — **direct child page**
- React Under The Hood — **direct child page**
- React Coding Interview Questions — **direct child page**
- TODO: expected count says React.js has 14 submenu items and first item has 4 nested items. Source headings suggest 15 if React Coding Interview Questions remains separate. Confirm whether coding questions should be folded into another React page.

### Next.js children

- Next.js Interview Questions and Answers — **direct child page**
- TODO: source also has `Next.js Interview Preparation Structure`; keep it inside the same page unless owner wants a separate outline page.

### Node.js children

- ChatGPT Node — **direct child page**
- TODO: consider renaming the page title to a cleaner Node.js title during migration without rewriting content.

### Direct Web Development pages

- HTML & CSS — **direct page**
- Angular — **direct page**
- Video Tutorial — **direct page**
  - TODO: source contains `Learn React With This ONE Project`; keep inside `video-tutorial.md` unless owner wants a nested category later.

## Current docs issues found

- Current DSA docs use folders such as `docs/dsa/resources/index.md`; revised target is flat direct pages such as `docs/dsa/resources.md`.
- Current System Design docs use folders for all first-level items; revised target uses direct pages for Interview Pattern, Basic Concepts, Resources, and Worked 22nd Aug.
- Current Web Development docs use folders for HTML & CSS, Angular, and Video Tutorial; revised target uses direct pages `html-css.md`, `angular.md`, and `video-tutorial.md`.
- Current Web Development docs are heavily over-split, especially under JavaScript, React.js, TypeScript, and Important.
- Duplicate-looking generated page slugs with suffixes like `-2`, `-3`, etc. should be consolidated during the real migration.
- Repeated headings such as `Quick Revision Summary`, `Final Interview-Ready Combined Answer`, `Common Interview Topics / Questions`, numbered subtopics, and interview callouts should usually remain sections inside canonical pages, not separate docs.
- `docs/engineering-handbook/` exists from a separate migrated source and is outside this three-file manifest; do not clean it up as part of this migration batch.
- Earlier scaffold categories visible in git status, such as `arrays`, `strings`, `linked-list`, `frontend`, `backend`, and `kubernetes`, should not be restored as first-level categories unless separately approved.

## Uncertain items requiring review

- DSA `Concepts` is empty; keep as direct TODO page.
- DSA source uses `Toll Increases`; target says `Toll Increase`.
- System Design source uses `System Design`; target says `System Design Questions`.
- System Design source uses `Workshop 22nd Aug`; target says `Worked 22nd Aug`.
- Web Development source uses `React JS`; target says `React.js`, while expected folder is `react-js`.
- Web Development source uses `Video Tutorials`; target says `Video Tutorial`.
- Companies expected count says 7 submenu items and specific nested counts; source has Agoda-related and OneTrust/JD headings that need owner confirmation.
- JavaScript expected count says 27 submenu items; preserving content grouping gives fewer high-confidence top-level JavaScript children plus nested categories.
- React.js expected count says 14 submenu items; source suggests 15 if React Coding Interview Questions remains separate.
- TypeScript source contains `Code` after the expected 3 items; confirm canonical location.

## Recommended first migration batch

1. Apply DSA first because it is simple, flat, and can be migrated in one shot.
2. Apply System Design second, converting four folders to direct pages and keeping only `system-design-questions/` and `dsa-roadmap/` collapsible.
3. Apply Web Development in small batches: direct pages first (HTML & CSS, Angular, Video Tutorial), then Interview Prep Order and Companies, then Important, JavaScript, TypeScript, React.js, Next.js, and Node.js.
4. Before migrating Web Development, confirm the TODO items above so we avoid creating hundreds of tiny pages again.

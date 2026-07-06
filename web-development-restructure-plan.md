# Web Development Restructure Plan

Date: 2026-07-06

Status: Executed on 2026-07-06. See `web-development-restructure-report.md` for the implementation report and build result.

## 1. Goal

Create a scalable Web Development / Frontend Engineering structure that is easy to study, avoids duplicate ownership, and keeps common engineering topics in one place while preserving technology-specific depth.

The new structure should:

- Keep all existing useful notes.
- Avoid duplicate explanations across JavaScript, React, Next.js, Node.js, and common engineering pages.
- Keep technology-specific study sections visible.
- Add common entry points for cross-cutting topics like Performance, Security, Testing, Architecture, Caching, Error Handling, Observability, and Build/Delivery.
- Keep side navigation readable and not too deep.
- Avoid touching DSA and System Design.
- Avoid changing Angular and HTML & CSS until explicitly approved.

## 2. Current Web Development State

Current folder:

```text
docs/web-development/
  companies/
  important/
  interview-prep-order/
  javascript/
  next-js/
  node-js/
  react-js/
  typescript/
  web-fundamentals/
  angular.md
  html-css.md
  resources.md
```

Current sidebar already has useful categories:

- Interview Prep Order
- Companies
- Web Fundamentals
- Core Engineering
- JavaScript
- TypeScript
- React.js
- Next.js
- Node.js
- HTML & CSS
- Angular
- Resources

Current strengths:

- JavaScript already has many canonical topic pages.
- React.js has detailed topic pages and internal deep dives.
- Next.js has been split into focused subpages.
- Core Engineering already has common pages for performance, security, testing, caching, observability, architecture, error handling, and memory management.
- Web Fundamentals already owns URL loading and browser rendering pipeline.
- Resources has replaced the older video tutorial page.

Current issues:

- `important/` is a vague folder name even though the sidebar label is `Core Engineering`.
- Some common engineering topics still overlap with tech-specific pages.
- Performance content is split across common Performance, React, and Next.js.
- Security/Auth overlaps with Next.js auth, Node.js auth/security, and browser storage notes.
- Testing is too small and React-heavy.
- Build, DevOps & Delivery does not yet have a clear common category.
- Frontend Architecture exists but could better own folder structure, micro-frontends, design systems, API layer design, feature flags, RBAC, and scalability.
- Web Fundamentals needs room for HTTP, CORS, cookies, status codes, protocols, browser cache, CDN, and communication patterns.
- TypeScript pages overlap and need clearer ownership.
- `chatgpt-next.md`, `chatgpt-node.md`, and `chatgpt-notes.md` are useful but should eventually be renamed or treated as interview Q&A pages.

## 3. Recommended Final Sidebar

Recommended top-level Web Development sidebar:

```text
Web Development
├── Interview Prep
├── Companies
├── Web Fundamentals
├── JavaScript
├── TypeScript
├── React
├── Next.js
├── Core Engineering
├── Frontend Architecture
├── Performance
├── Security & Auth
├── Testing & Quality
├── UX / Design System
├── Build, DevOps & Delivery
├── Backend for Frontend / Node.js
├── HTML & CSS
├── Angular
└── Resources
```

Important sidebar rule:

- Do not create one sidebar page for every small concept.
- Keep small related topics as headings inside grouped study pages.
- Keep full technology topics as separate pages when they already exist and have substantial content.
- Keep common topics as canonical hubs, and link from tech-specific pages instead of duplicating content.
- Keep company pages as interview-context pages, not canonical technical explanations.

## 4. Proposed Folder Structure

This is the reduced, study-friendly version. It intentionally avoids creating a sidebar page for every bullet in the proposed idea.

```text
docs/web-development/
  interview-prep-order/
    index.md
    phase-wise.md
    chatgpt-checklist.md

  companies/
    ...

  web-fundamentals/
    _category_.json
    index.md
    url-in-browser.md
    browser-rendering-pipeline.md
    browser-networking.md
    web-communication-patterns.md
    browser-storage-and-caching.md
    web-security-basics.md

  javascript/
    index.md
    javascript-under-the-hood/
    interview-q-a/
    js-evaluation.md
    execution-context.md
    js-fundamentals.md
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
    temporal-new.md
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
    index.md
    ts-concepts.md
    code.md
    interview-qa.md

  react-js/
    index.md
    fundamentals/
    rendering-components.md
    react-under-the-hood.md
    react-hooks.md
    state-management.md
    forms.md
    component-communication-patterns.md
    folder-structure.md
    advanced-react-patterns.md
    error-handling-in-react.md
    react-router.md
    react-architecture.md
    coding.md

  next-js/
    index.md
    next-js-fundamentals.md
    routing.md
    rendering-strategies.md
    server-components-client-components.md
    data-fetching.md
    caching.md
    performance-optimization.md
    middleware.md
    authentication-authorization.md
    api-routes.md
    error-handling.md
    deployment-production.md
    next-js-architecture.md
    senior-staff-next-js-topics.md
    next-js-interview-qa.md

  core-engineering/
    _category_.json
    index.md
    error-handling.md
    caching.md
    observability.md
    memory-management.md
    code-review-checklist.md
    solid.md

  frontend-architecture/
    _category_.json
    index.md
    folder-structure.md
    micro-frontends.md
    design-system-architecture.md
    state-management-strategy.md
    api-layer-design.md
    feature-flags.md
    multi-tenant-ui.md
    role-based-access-control.md
    frontend-scalability.md

  performance/
    _category_.json
    index.md
    core-web-vitals.md
    lighthouse-and-tools.md
    rendering-performance.md
    bundle-and-loading-optimization.md
    runtime-performance.md
    react-performance.md
    nextjs-performance.md
    monitoring-observability.md

  security-auth/
    _category_.json
    index.md
    owasp.md
    xss-cross-site-scripting.md
    jwt-csrf-token-storage.md
    security-headers.md
    iframe-clickjacking-protection.md
    frontend-security-checklist.md
    react-security.md

  testing-quality/
    _category_.json
    index.md
    react-testing.md
    e2e-testing.md
    accessibility-testing.md
    visual-regression-testing.md
    test-strategy-large-apps.md

  ux-design-system/
    _category_.json
    index.md
    accessibility.md
    storybook.md
    design-tokens.md
    component-api-design.md
    theming.md
    design-system-governance.md

  build-devops-delivery/
    _category_.json
    index.md
    build-tools.md
    linting-and-code-quality.md
    ci-cd.md
    github-actions.md
    docker-kubernetes-basics.md
    release-strategy.md
    monitoring-and-observability.md

  backend-for-frontend-node-js/
    _category_.json
    index.md
    node-js-basics.md
    express-js.md
    bff-pattern.md
    api-aggregation.md
    authentication.md
    rate-limiting.md
    caching.md
    error-handling.md
    logging.md
    graphql-server-basics.md

  html-css.md
  angular.md
  resources.md
```

## 5. Topics Kept as Sections Inside Pages

These should not become separate sidebar items yet.

### `web-fundamentals/browser-networking.md`

Use headings inside this page:

- DNS
- TCP
- TLS
- HTTP
- HTTP/1.1 vs HTTP/2 vs HTTP/3
- HTTP Status Codes

Reason: these are web-networking fundamentals that should be studied together.

### `web-fundamentals/web-communication-patterns.md`

Use headings inside this page:

- REST vs GraphQL
- WebSockets
- Server-Sent Events
- Polling

Reason: these are communication patterns and should be compared together.

### `web-fundamentals/browser-storage-and-caching.md`

Use headings inside this page:

- Cookies
- Sessions
- Tokens
- LocalStorage
- SessionStorage
- IndexedDB
- Browser Caching
- CDN

Reason: storage, cache, and token persistence overlap heavily in interview discussions.

### `typescript/ts-concepts.md`

Use headings inside this page:

- Basic Types
- Interfaces vs Types
- Generics
- Utility Types
- Narrowing
- Discriminated Unions
- Advanced Types
- TypeScript in React

Reason: these are TypeScript concept sections, not separate sidebar pages yet.

### `performance/bundle-and-loading-optimization.md`

Use headings inside this page:

- Bundle Optimization
- Code Splitting
- Lazy Loading
- Image Optimization
- Network Optimization

Reason: these are related loading-performance tactics.

### `security-auth/jwt-csrf-token-storage.md`

Use headings inside this page:

- JWT Security
- CSRF
- Cookie Security
- Token Storage
- Session Storage Trade-offs

Reason: auth token storage and CSRF are often one interview discussion.

### `testing-quality/index.md`

Use headings inside the overview until content grows:

- Unit Testing
- Integration Testing
- E2E Testing
- Cypress
- Playwright
- Mock Service Worker
- Flaky Test Handling

Reason: testing is currently small; create separate pages only when notes become substantial.

### `build-devops-delivery/build-tools.md`

Use headings inside this page:

- Vite
- Webpack
- Babel

### `build-devops-delivery/linting-and-code-quality.md`

Use headings inside this page:

- ESLint
- SonarQube
- Code Review Checklist

## 6. Existing Content Mapping

| Current file | Recommended destination | Action | Notes |
|---|---|---|---|
| `web-fundamentals/index.md` | `web-fundamentals/index.md` | Keep | Expand as the Web Fundamentals study hub. |
| `web-fundamentals/url-in-browser.md` | `web-fundamentals/url-in-browser.md` | Keep | Already canonical for URL to page load. |
| `web-fundamentals/browser-rendering-pipeline.md` | `web-fundamentals/browser-rendering-pipeline.md` | Keep | Already canonical for browser rendering pipeline. |
| `javascript/browser-apis-dom.md` | `web-fundamentals/browser-storage-and-caching.md` plus keep DOM APIs in JavaScript | Needs careful split | Storage/cookies/cache could move later; DOM APIs should remain JavaScript/browser APIs. |
| `important/performance/index.md` | `performance/index.md` | Move later | Current folder `important/performance` already acts as Performance; rename path only if approved. |
| `important/performance/core-web-vitals.md` | `performance/core-web-vitals.md` | Move later | Canonical performance metric page. |
| `important/performance/lighthouse-and-tools.md` | `performance/lighthouse-and-tools.md` | Move later | Good fit. |
| `important/performance/rendering.md` | `performance/rendering-performance.md` | Move/rename later | Own SSR/SSG/ISR/CSR/hydration rendering performance. |
| `important/performance/react-performance.md` | `performance/react-performance.md` | Move later | Common Performance should own React optimization strategy; React page links here. |
| `important/performance/nextjs-performance.md` | `performance/nextjs-performance.md` | Move later | Common Performance should own Next.js performance strategy; Next.js page links here. |
| `important/performance/monitoring-observability.md` | `performance/monitoring-observability.md` | Move later | Could also link from Observability. |
| `important/security/index.md` | `security-auth/index.md` | Move later | Current page is a hub. |
| `important/security/xss-cross-site-scripting.md` | `security-auth/xss-cross-site-scripting.md` | Move later | Canonical XSS page. |
| `important/security/jwt-csrf.md` | `security-auth/jwt-csrf-token-storage.md` | Move/rename later | Canonical auth token/CSRF page. |
| `important/security/security-headers.md` | `security-auth/security-headers.md` | Move later | Canonical headers page. |
| `important/security/iframe-protection.md` | `security-auth/iframe-clickjacking-protection.md` | Move/rename later | Better long-term label. |
| `important/security/owasp.md` | `security-auth/owasp.md` | Move later | Needs no-loss cleanup first because it contains broad duplicate security notes. |
| `important/security/react-security.md` | `security-auth/react-security.md` | Move later | React-specific security notes can live under common security with React cross-link. |
| `important/testing/index.md` | `testing-quality/index.md` | Move later | General testing page. |
| `important/testing/react-testing.md` | `testing-quality/react-testing.md` | Move later | React Testing canonical page. |
| `important/accessibility.md` | `ux-design-system/accessibility.md` | Move later | Accessibility belongs under UX / Design System, with links from Testing and Security where needed. |
| `important/ux-design-system/index.md` | `ux-design-system/index.md` | Move later | Already substantial. |
| `important/ux-design-system/storybook.md` | `ux-design-system/storybook.md` | Move later | Already substantial. |
| `important/frontend-architecture.md` | `frontend-architecture/index.md` | Move/merge later | Currently a hub; can become the architecture overview. |
| `important/micro-frontends.md` | `frontend-architecture/micro-frontends.md` | Move later | TODO-only today; fill later from architecture/company notes if approved. |
| `react-js/folder-structure.md` | `frontend-architecture/folder-structure.md` or keep under React | Needs decision | If generic enough, move to architecture; if React-specific, keep in React. |
| `react-js/react-architecture.md` | `frontend-architecture/index.md` and React cross-link | Needs careful split | Contains useful architecture content; do not move without no-loss review. |
| `important/backend-for-fe-bff.md` | `backend-for-frontend-node-js/bff-pattern.md` | Move later | Good fit under BFF/Node section. |
| `node-js/index.md` | `backend-for-frontend-node-js/index.md` | Move/merge later | Node section is currently small. |
| `node-js/chatgpt-node.md` | `backend-for-frontend-node-js/node-js-interview-qa.md` | Rename later | Preserve Q&A content; rename away from ChatGPT label. |
| `next-js/chatgpt-next.md` | `next-js/next-js-interview-qa.md` | Rename later | Preserve content; rename away from ChatGPT label. |
| `typescript/chatgpt-notes.md` | `typescript/interview-qa.md` | Rename later | Preserve content; rename away from ChatGPT label. |
| `resources.md` | `resources.md` | Keep | Use as organized resource library. |
| `html-css.md` | `html-css.md` | Keep unchanged for now | User previously wanted not to touch. |
| `angular.md` | `angular.md` | Keep unchanged for now | User previously wanted not to touch. |

## 7. Recommended Sidebar Labels

Use shorter sidebar labels than folder names where useful:

- Interview Prep
- Companies
- Web Fundamentals
- JavaScript
- TypeScript
- React
- Next.js
- Core Engineering
- Frontend Architecture
- Performance
- Security & Auth
- Testing & Quality
- UX / Design System
- Build / Delivery
- BFF / Node.js
- HTML & CSS
- Angular
- Resources

## 8. Canonical Ownership Rules

- Web Fundamentals owns browser/page-load/network fundamentals.
- JavaScript owns language semantics, runtime, browser APIs, and coding questions.
- TypeScript owns type-system concepts and TypeScript examples.
- React owns React APIs, rendering model, hooks, state management, routing, forms, and React coding.
- Next.js owns framework-specific routing, rendering, data fetching, caching, middleware, auth, API routes, deployment, and interview Q&A.
- Performance owns optimization strategy across generic web, React, and Next.js.
- Security & Auth owns XSS, CSRF, JWT/token storage, headers, clickjacking, OWASP, and frontend security checklist.
- Testing & Quality owns testing strategy and test tooling.
- UX / Design System owns accessibility, design systems, Storybook, tokens, theming, and component governance.
- Frontend Architecture owns scalable app structure, micro-frontends, feature flags, API layer strategy, RBAC, multi-tenant UI, and frontend scalability.
- Build / Delivery owns build tools, CI/CD, GitHub Actions, release strategy, Docker/Kubernetes basics, and delivery practices.
- BFF / Node.js owns Node.js, Express, API aggregation, BFF, GraphQL server basics, rate limiting, logging, and backend-for-frontend concerns.
- Company pages keep company-specific prompts, rounds, examples, and asked questions only.

## 9. Placeholder Page Rule

Only create placeholder pages for approved sidebar pages.

For pages with no current content, create only:

```md
---
title: Topic Name
sidebar_position: N
---

# Topic Name

TODO: Add notes for this topic.
```

Do not invent technical explanations.

## 10. When To Promote a Heading Into a Page

Promote a heading into its own sidebar page only when one of these is true:

- It has enough content to study independently.
- It is a canonical topic referenced by several tech-specific pages.
- It contains implementation examples, diagrams, trade-offs, or interview Q&A.
- It is a tech-specific section already substantial enough to stand alone.

Keep it as a section when:

- It is a small definition.
- It is part of a group of closely related concepts.
- It would create a weak TODO-only page.
- It is only a checklist item.

## 11. Execution Batches

### Batch 1: Plan Review Only

- Review this file.
- Decide whether to keep the current `important/` folder path or rename it to `core-engineering/`.
- Decide whether to create new folders now or refactor existing folders gradually.

### Batch 2: Create New Common Categories Without Moving Content

- Create empty category folders for:
  - `frontend-architecture/`
  - `performance/`
  - `security-auth/`
  - `testing-quality/`
  - `ux-design-system/`
  - `build-devops-delivery/`
  - `backend-for-frontend-node-js/`
- Add `_category_.json` and index pages.
- Keep current pages where they are.
- Add sidebar entries only if approved.
- Run `npm run build`.

### Batch 3: Move Low-Risk Existing Hubs

- Move `important/performance/*` to `performance/`.
- Move `important/security/*` to `security-auth/`.
- Move `important/testing/*` to `testing-quality/`.
- Move `important/ux-design-system/*` and `important/accessibility.md` to `ux-design-system/`.
- Update internal links and `.knowledge/knowledge-map.yaml`.
- Run `npm run build`.

### Batch 4: Architecture and BFF Cleanup

- Move/merge `important/frontend-architecture.md`.
- Decide whether `react-js/folder-structure.md` becomes generic architecture or stays React-specific.
- Move `important/backend-for-fe-bff.md` into BFF / Node.js.
- Decide whether to rename Node.js interview page.
- Run `npm run build`.

### Batch 5: Rename Interview Q&A Pages

- `next-js/chatgpt-next.md` -> `next-js/next-js-interview-qa.md`
- `node-js/chatgpt-node.md` -> `backend-for-frontend-node-js/node-js-interview-qa.md` or `node-js/node-js-interview-qa.md`
- `typescript/chatgpt-notes.md` -> `typescript/interview-qa.md`
- Update sidebars and links.
- Run `npm run build`.

### Batch 6: Fill New Grouped Pages

- Add TODO headings for missing topics in:
  - `web-fundamentals/browser-networking.md`
  - `web-fundamentals/web-communication-patterns.md`
  - `web-fundamentals/browser-storage-and-caching.md`
  - `build-devops-delivery/build-tools.md`
  - `build-devops-delivery/linting-and-code-quality.md`
- Move existing relevant content only where there is a clear source.
- Run `npm run build`.

### Batch 7: Duplicate Cleanup

- Review and consolidate:
  - React internals duplicates
  - TypeScript concept overlap
  - OWASP/XSS/JWT/security overlap
  - Performance overlap across React/Next/common pages
  - Company-page technical explanation duplicates
- Use no-loss merge plans for large topics.

## 12. Decisions Needed Before Execution

1. Should we rename the physical `important/` folder to `core-engineering/`, or keep it to reduce churn?
2. Should Performance, Security, Testing, UX, and Architecture become top-level Web Development categories now?
3. Should `React Performance` live under common Performance only, while React links to it?
4. Should `Next.js Performance` live under common Performance only, while Next.js links to it?
5. Should `Accessibility` move to UX / Design System, Testing & Quality, or remain under Core Engineering?
6. Should Node.js be renamed to `Backend for Frontend / Node.js` at the sidebar level?
7. Should `chatgpt-*` pages be renamed in the next implementation batch?
8. Should Angular and HTML & CSS remain untouched until a dedicated phase?
9. Should company pages stay near the top of the sidebar or move lower after core learning sections?

## 13. Recommended First Implementation

Start with a low-risk restructure:

1. Keep existing `important/` path for now.
2. Do not move Angular or HTML & CSS.
3. Promote sidebar labels and hub pages first.
4. Move Performance, Security, Testing, and UX folders only after approving this plan.
5. Rename `chatgpt-*` pages in a separate batch.

This keeps the site usable while gradually moving toward a cleaner long-term architecture.

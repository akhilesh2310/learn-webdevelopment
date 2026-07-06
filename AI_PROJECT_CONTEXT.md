# AI Project Context

This file is the project memory map for Codex, GitHub Copilot, and other AI tools working in this repository.

Before making structural documentation changes, read this file first. After changing the documentation structure, update this file so future AI edits keep the same architecture.

## Project Type

This is a Docusaurus documentation website for personal study notes.

The site is intended to grow into a large documentation system covering DSA, Web Development, and System Design.

## Important Files

- `docusaurus.config.ts`: Main Docusaurus configuration, top navigation, blog setting, theme configuration.
- `sidebars.ts`: Sidebar definitions for each major documentation section.
- `docs/`: Main documentation content and category hierarchy.
- `src/pages/index.tsx`: Custom homepage.
- `src/pages/index.module.css`: Homepage-specific styles.
- `src/css/custom.css`: Global Docusaurus theme overrides.
- `PROJECT_REQUIREMENTS.md`: Product and architecture requirements.
- `KNOWLEDGE_ARCHITECTURE.md`: Root-level knowledge architecture principles.
- `DECISIONS.md`: Long-term architecture and knowledge-management decisions.
- `.github/copilot-instructions.md`: Short editing rules for GitHub Copilot.
- `.knowledge/`: Knowledge-base infrastructure for topic maps, aliases, migration logs, review queues, and AI editing rules.
- `prompts/`: Reusable Codex prompts only. Project architecture and decisions should not live inside this folder.

## Knowledge Base Infrastructure

This repository is a Personal Technical Knowledge Base. Docusaurus is the presentation layer, while migrated Markdown/MDX docs are the working source of truth after migration.

Read `.knowledge/` before structural knowledge-base edits, especially when creating, moving, merging, or deleting documentation pages.

- `.knowledge/knowledge-map.yaml`: Tracks canonical topic ids, canonical paths, aliases, tags, related topics, status, and review notes. Add or update entries after structural topic changes.
- `.knowledge/knowledge-rules.yaml`: Stores rules Codex and Copilot should follow before editing the knowledge base.
- `.knowledge/aliases.yaml`: Maps common shortcuts and alternate names to canonical concept names.
- `.knowledge/review-queue.yaml`: Stores uncertain AI decisions that need manual review. Add uncertain placement, duplicate, merge, or naming decisions here instead of guessing.
- `.knowledge/migration-log.md`: Records source-note migration status and major movement. Update it after source-note migration or significant content movement.

Knowledge-base source-of-truth rules:

- `docs/` is the working source of truth after migration.
- `source-notes/` is a read-only historical archive and should not be edited unless explicitly requested.
- One topic should have one canonical document.
- Search existing docs and `.knowledge/knowledge-map.yaml` before creating a new page.
- Prefer updating canonical pages over creating duplicates.

## JavaScript Refactor Ownership Notes

The JavaScript section has started duplicate cleanup using canonical ownership:

- `docs/web-development/javascript/advanced-js.md` owns advanced JavaScript concepts such as debounce, throttle, memoization, currying, generators, iterators, Proxy, and Reflect.
- `docs/web-development/javascript/javascript-coding-questions.md` owns reusable JavaScript implementation snippets, polyfills, and machine-coding utilities.
- `docs/web-development/javascript/scope.md` owns lexical scope, scope chain, variable shadowing, and var/function-scope traps.
- `docs/web-development/javascript/hoisting.md` owns hoisting, TDZ, function declaration/expression behavior, and output puzzles.
- `docs/web-development/javascript/memory-management.md` owns practical memory leaks and frontend cleanup patterns.
- `docs/web-development/javascript/javascript-under-the-hood/garbage-collector-internals.md` owns deep V8 garbage collector internals.
- `docs/web-development/javascript/javascript-under-the-hood/index.md` is now a runtime internals hub, not a duplicate quick Q&A page.
- Web Fundamentals should list only web/page-load fundamentals directly in the sidebar. JavaScript runtime pages can be linked from the Web Fundamentals overview, but should remain listed under JavaScript as their primary sidebar home.

## Prompt Library

The `prompts/` folder is for reusable Codex prompts only.

- `prompts/README.md`: Explains which prompt to use for common workflows.
- `prompts/add-new-knowledge.md`: Main workflow for adding newly learned technical knowledge.
- `prompts/migrate-section.md`: Reusable workflow for migrating an approved section.
- `prompts/review-existing-doc.md`: Reusable workflow for reviewing an existing documentation page.
- `prompts/improve-doc-quality.md`: Reusable workflow for improving an existing migrated doc.
- `prompts/archive/`: Historical one-time prompts that should be preserved but not used as active workflows.

Project architecture and decision documents live at the root:

- `PROJECT_REQUIREMENTS.md`
- `AI_PROJECT_CONTEXT.md`
- `KNOWLEDGE_ARCHITECTURE.md`
- `DECISIONS.md`
- `.knowledge/`

## Current Top Navigation

The navbar should contain only:

- Home
- DSA
- Web Development
- System Design

Do not add Blog or other top-level navigation items.

## Documentation Structure

The documentation has been migrated into `docs/` and is being actively refined through canonical-topic ownership, duplicate cleanup, and no-loss restructuring.

```text
docs/
  intro.md
  dsa/
    resources.md
    coding-round.md
    concepts.md
    recently-asked.md
    js-vs-java.md
    toll-increase.md
    problems-solved.md
  web-development/
    interview-prep-order/
    companies/
    web-fundamentals/
    javascript/
    typescript/
    react-js/
    next-js/
    core-engineering/
    frontend-architecture/
    performance/
    security-auth/
    testing-quality/
    ux-design-system/
    build-devops-delivery/
    backend-for-frontend-node-js/
    html-css.md
    angular.md
    resources.md
  system-design/
    system-design-basics/
    core-concepts/
    frontend-system-design/
    backend-distributed-system-design/
    data-storage-design/
    api-communication-design/
    cloud-devops-infra/
    security-system-design/
    system-design-question-bank/
    system-design-templates/
    resources.md
```

System Design was restructured on 2026-07-06 using `system-design-restructure-plan.md`. The old `docs/system-design/interview-guide/` and `docs/system-design/system-design-questions/` folders are no longer canonical.

### DSA

```text
docs/dsa/
  resources.md
  coding-round.md
  concepts.md
  recently-asked.md
  js-vs-java.md
  toll-increase.md
  problems-solved.md
```

DSA is intentionally simple: it has direct pages only and no nested categories. `Concepts` is intentionally present even when the source section is empty.

`docs/dsa/coding-round.md` is the canonical page for coding interview round expectations, algorithmic problem solving, DSA patterns, and coding-round execution notes. System Design pages may link to it but should not duplicate the content.

### Web Development

```text
docs/web-development/
  interview-prep-order/
  companies/
  web-fundamentals/
  javascript/
  typescript/
  react-js/
  next-js/
  core-engineering/
    index.md
    error-handling.md
    caching.md
    observability.md
    memory-management.md
    solid.md
    code-review-checklist.md
    quick-questions.md
  frontend-architecture/
    index.md
    folder-structure.md
    micro-frontends.md
    ...
  performance/
    index.md
    core-web-vitals.md
    lighthouse-and-tools.md
    rendering-performance.md
    react-performance.md
    nextjs-performance.md
    ...
  security-auth/
    index.md
    jwt-csrf-token-storage.md
    owasp.md
    iframe-clickjacking-protection.md
    xss-cross-site-scripting.md
    security-headers.md
    react-security.md
    frontend-security-checklist.md
  testing-quality/
  ux-design-system/
  build-devops-delivery/
  backend-for-frontend-node-js/
  html-css.md
  angular.md
  resources.md
```

Web Development was restructured on 2026-07-06 using `web-development-restructure-plan.md`.

Canonical ownership rules:

- `web-fundamentals/` owns browser/page-load/network fundamentals.
- `javascript/`, `typescript/`, `react-js/`, and `next-js/` keep technology-specific notes.
- `core-engineering/` owns cross-cutting engineering basics such as caching, error handling, observability, memory management, SOLID, quick questions, and code review.
- `frontend-architecture/` owns folder structure, micro-frontends, API layer strategy, feature flags, RBAC, multi-tenant UI, and scalability.
- `performance/` owns common performance strategy across generic web, React, and Next.js.
- `security-auth/` owns XSS, CSRF, JWT/token storage, headers, clickjacking, OWASP, and frontend security checklist.
- `testing-quality/` owns testing strategy and testing tools.
- `ux-design-system/` owns accessibility, Storybook, design tokens, theming, and design system governance.
- `build-devops-delivery/` owns build tools, CI/CD, GitHub Actions, release, Docker/Kubernetes basics, and delivery practices.
- `backend-for-frontend-node-js/` owns Node.js, Express, BFF, API aggregation, GraphQL server basics, rate limiting, logging, and backend-for-frontend concerns.

The old `docs/web-development/important/` and `docs/web-development/node-js/` folders are no longer canonical.

### System Design

```text
docs/system-design/
  system-design-basics/
    index.md
    interview-framework.md
    google-session-chat-service.md
  core-concepts/
    index.md
    scalability-reliability.md
    caching-cdn.md
    databases-partitioning.md
    queues-event-driven-systems.md
    rate-limiting-resilience.md
    observability.md
  frontend-system-design/
    index.md
    design-google-docs.md
    design-search-autocomplete-ui.md
    ...
  backend-distributed-system-design/
    index.md
    url-shortener.md
    google-search.md
    chat-system.md
    news-feed.md
    file-upload-system.md
    video-streaming.md
    ...
  data-storage-design/
  api-communication-design/
  cloud-devops-infra/
  security-system-design/
  system-design-question-bank/
  system-design-templates/
  resources.md
```

### Engineering Handbook

```text
docs/engineering-handbook/
  No migrated handbook docs are currently present after the reset.
```

## Naming Conventions

- Use kebab-case for folders and files.
- Use `index.md` for section and category landing pages.
- Use `_category_.json` to control Docusaurus category labels, ordering, and category links.
- Keep page titles clean and human-readable.
- Prefer Markdown files for normal notes.
- Use MDX only when React components are actually needed.

## Sidebar Strategy

`sidebars.ts` currently defines reset sidebars:

- `dsaSidebar`
- `webDevelopmentSidebar`
- `systemDesignSidebar`

`dsaSidebar` now shows a collapsible `DSA` category with these direct pages:

- Resources
- Coding Round
- Concepts
- Recently Asked
- JS vs JAVA
- Toll Increase
- Problems Solved

`systemDesignSidebar` now shows a reduced, study-friendly `System Design` structure:

- System Design Basics
- Core Concepts
- Frontend System Design
- Backend / Distributed Systems
- Data & Storage
- API & Communication
- Cloud / Infra
- Security
- Question Bank
- Templates
- Resources

Small concepts should be grouped as headings inside study pages instead of becoming separate sidebar pages. For example, scalability, availability, latency, and throughput belong inside `docs/system-design/core-concepts/scalability-reliability.md` until there is enough content to justify separate pages.

## Google Docs Migration Strategy

Future Google Docs migration should follow this mapping:

- Google Docs tab -> Docusaurus category folder.
- Google Docs sub-tab -> nested category folder.
- Topic or article -> individual `.md` or `.mdx` page.

Do not flatten imported notes into one large folder. Preserve hierarchy so the site can grow to hundreds of pages.

Google Docs Markdown exports may contain many `#` headings that are not real top-level tabs. Do not automatically promote every exported `#` heading into a first-level sidebar item. Use the known tab/category names as boundaries, then keep subsequent headings as child pages under the current category until the next known tab/category appears.

## Phase 1 Migration Notes

Phase 1 migrated source files from `source-notes/` into Docusaurus docs without editing the source files.

Source-to-docs mapping:

- `source-notes/1. DSA.md` -> `docs/dsa/`
- `source-notes/2. Web Development.md` -> `docs/web-development/`
- `source-notes/3. System Design.md` -> `docs/system-design/`
- `source-notes/Staff_Frontend_Engineer_Handbook_Akhilesh.docx.md` -> `docs/engineering-handbook/`

Phase 1 was corrected after the first mechanical split, then later reset. The approved future migration should use `knowledge-hierarchy.md` as the blueprint instead of inferring structure from generated docs.

- DSA: Resources, Concepts, Recently Asked, JS vs JAVA, Toll Increase, Problems Solved.
- Web Development: Interview Prep Order, Companies, Web Fundamentals, JavaScript, TypeScript, React.js, Next.js, Core Engineering, Frontend Architecture, Performance, Security & Auth, Testing & Quality, UX / Design System, Build / Delivery, BFF / Node.js, HTML & CSS, Angular, Resources.
- System Design: Interview Pattern, Basic Concepts, Resources, System Design Questions, DSA Roadmap, Worked 22nd Aug.

Any other exported top-level heading is treated as a child page inside the active known category. Categories with intro content have an `index.md`; categories without intro content use `_category_.json` with a generated index instead of an empty Markdown file.

Some imported Markdown needed Docusaurus compatibility escaping because Docusaurus parses `.md` files through MDX. Do not remove those escapes casually; they prevent raw `{}`, `<...>`, and import/export examples from being interpreted as JSX or ESM.

Phase 2 should review child pages manually and move clearly related topics into deeper subcategory folders where appropriate.

## Content Rules

- Do not add blog content.
- Do not add placeholder study content unless explicitly requested.
- Category index pages may exist as placeholders.
- Keep writing simple and direct.
- Avoid duplicating the same topic in multiple sections unless intentionally cross-linked.

## Code and Styling Rules

- Use Docusaurus best practices.
- Keep TypeScript clean and explicit where applicable.
- Use the default Docusaurus theme.
- Only add small custom styles when they improve clarity.
- Do not introduce unnecessary external libraries.
- Preserve dark mode and responsive layout.

## AI Editing Rules

- Explain planned changes before editing.
- Do not delete useful content.
- Prefer small focused changes.
- Keep folder and file names kebab-case.
- Keep markdown headings clean.
- Use TypeScript where applicable.
- Avoid overengineering.

## Before Editing Checklist

- Read `PROJECT_REQUIREMENTS.md`.
- Read this file before structural changes.
- Check current files with `git status --short`.
- Avoid touching unrelated untracked files.
- Preserve existing user content unless explicitly asked to replace it.
- Treat `source-notes/` as read-only source material unless the user explicitly asks to edit it.

## After Editing Checklist

- Update this file if folder structure, sidebar strategy, navigation, or migration rules changed.
- Run `npm run typecheck` for TypeScript/config changes.
- Run `npm run build` for Docusaurus routing/sidebar/content changes.
- Commit focused changes with a clear message when the user wants changes pushed.

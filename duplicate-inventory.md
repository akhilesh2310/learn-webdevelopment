# Duplicate Inventory

Date: 2026-07-04

Scope: active documentation under `docs/` only. `source-notes/` was not analyzed as active documentation and was not modified.

Method:

- Manual semantic inspection of high-risk areas.
- Targeted `rg` scans across JavaScript, React, TypeScript, Security, Performance, System Design, DSA, and company pages.
- Read-only helper script: `tools/audit/find-duplicates.mjs`.

## 1. Executive Summary

- Total docs scanned: 131 Markdown/MDX files.
- Exact repeated paragraph clusters detected by script: 5.
- Repeated question clusters detected by script: 33.
- Repeated heading clusters detected by script: 80.
- Duplicate/overlap topic clusters found in this review: 22.
- Duplicate Q&A clusters found in this review: 18.
- Duplicate code snippet clusters found in this review: 8.

Highest-risk duplicate areas:

1. Browser rendering / Render Tree content is still exact-duplicated across System Design, Quick Questions, and JavaScript Under The Hood.
2. React internals and rendering content repeats across Fundamentals, Reconciliation, Fiber, Core Concept Internals, Rendering Components, and React Under The Hood.
3. React performance and memoization guidance repeats across React Performance, React Hooks, Rendering Components, Core Web Vitals, and company pages.
4. Security concepts repeat across Security overview, OWASP, XSS, JWT/CSRF, React Security, Security Headers, Browser APIs, Node.js, Next.js, and company pages.
5. TypeScript concepts repeat across `index.md`, `chatgpt-notes.md`, `ts-concepts.md`, and `code.md`.
6. System Design interview pattern content repeats inside specific system-design question pages, especially Google Docs.
7. JavaScript utility implementations repeat across Advanced JS, JavaScript Coding Questions, company screening notes, and React custom hook examples.

Recommended first cleanup batch:

1. Merge exact Render Tree / Browser Rendering duplicates into `docs/web-development/javascript/javascript-under-the-hood/browser-rendering-pipeline.md`.
2. Replace repeated frontend basics in `docs/system-design/basic-concepts.md`, `docs/web-development/important/quick-questions.md`, and `docs/web-development/javascript/javascript-under-the-hood/index.md` with summaries and links.
3. Decide TypeScript ownership: concepts in `ts-concepts.md`, examples in `code.md`, interview Q&A in `chatgpt-notes.md` if preserved.
4. Create no-loss merge plans for React Reconciliation/Fiber and Security XSS/JWT sections before editing.

## 2. High Confidence Duplicate Clusters

### Cluster: Render Tree / Browser Rendering Pipeline

Type:

- exact duplicate
- near duplicate
- category overlap

Files involved:

- `docs/system-design/basic-concepts.md`
- `docs/web-development/important/quick-questions.md`
- `docs/web-development/javascript/javascript-under-the-hood/index.md`
- `docs/web-development/javascript/javascript-under-the-hood/browser-rendering-pipeline.md`
- `docs/web-development/javascript/javascript-under-the-hood/url-in-browser.md`
- `docs/web-development/important/performance/core-web-vitals.md`

Current problem:

The same Render Tree explanation appears exactly in three pages. The JavaScript Under The Hood index also repeats deeper browser rendering pipeline content that belongs in the dedicated browser rendering page.

Recommended canonical page:

`docs/web-development/javascript/javascript-under-the-hood/browser-rendering-pipeline.md`

Recommended action:

- merge into canonical page
- replace duplicate with short summary + link
- keep Core Web Vitals as measurement/performance context

Content to preserve:

- DOM + CSSOM -> Render Tree explanation
- visible vs hidden element example
- Layout, Paint, Composite flow
- layout thrashing examples
- CLS and layout shift notes
- interview questions from Agoda/company pages

Risk: Medium

Confidence: High

User decision needed: Yes

### Cluster: Repeated Frontend Basics Question Set

Type:

- duplicate Q&A
- exact duplicate question set
- category overlap

Files involved:

- `docs/system-design/basic-concepts.md`
- `docs/web-development/important/quick-questions.md`
- `docs/web-development/javascript/javascript-under-the-hood/index.md`

Current problem:

The same broad question set appears in all three places: browser workflow, React under the hood, V8, SpiderMonkey, sync vs async JS, Event Loop, DOM/BOM, Node.js under the hood, WebAssembly, framework performance, and Render Tree.

Recommended canonical page:

- Browser engine/runtime basics: `docs/web-development/javascript/javascript-under-the-hood/index.md`
- Browser rendering details: `docs/web-development/javascript/javascript-under-the-hood/browser-rendering-pipeline.md`
- Event Loop: `docs/web-development/javascript/event-loop.md`
- React Reconciliation: `docs/web-development/react-js/fundamentals/reconciliation-1.md`

Recommended action:

- replace duplicate with short summary + link
- convert `quick-questions.md` into interview prompt/index style
- keep `system-design/basic-concepts.md` system-design-facing only

Content to preserve:

- quick interview framing
- broad overview questions
- links to canonical pages

Risk: Medium

Confidence: High

User decision needed: Yes

### Cluster: Google Docs System Design Interview Pattern

Type:

- exact duplicate
- duplicate Q&A
- duplicate system design outline

Files involved:

- `docs/system-design/interview-pattern.md`
- `docs/system-design/system-design-questions/google-docs.md`

Current problem:

Google Docs-specific system design content appears in both the general interview pattern and the Google Docs problem page. The scanner found exact repeated component breakdown and clarifying questions.

Recommended canonical page:

`docs/system-design/system-design-questions/google-docs.md`

Recommended action:

- move problem-specific details later
- keep only reusable interview framework in `interview-pattern.md`

Content to preserve:

- AppShell/component breakdown
- clarifying questions
- real-time sync and collaboration design
- deployment and performance discussion

Risk: High

Confidence: High

User decision needed: Yes

### Cluster: JavaScript Debounce / Throttle / Memoization

Type:

- duplicate code
- near duplicate concept explanations
- duplicate interview coding round solution

Files involved:

- `docs/web-development/javascript/advanced-js.md`
- `docs/web-development/javascript/javascript-coding-questions.md`
- `docs/web-development/companies/agoda/screening-round.md`
- `docs/web-development/react-js/react-hooks.md`
- `docs/web-development/react-js/advanced-react-patterns.md`
- `docs/system-design/system-design-questions/autocomplete.md`
- `docs/system-design/system-design-questions/google-docs.md`

Current problem:

Debounce, throttle, and memoization appear as concepts, implementations, React hooks, company screening code, and system-design choices. The throttle trailing-call implementation appears in both Advanced JS and JavaScript Coding Questions.

Recommended canonical page:

- Concepts: `docs/web-development/javascript/advanced-js.md`
- Implementations: `docs/web-development/javascript/javascript-coding-questions.md`
- React hook usage: `docs/web-development/react-js/react-hooks.md`

Recommended action:

- keep both with cross-links
- move code to canonical coding page where duplicate implementation exists
- company pages should link to canonical implementation and keep company context

Content to preserve:

- basic debounce implementation
- immediate debounce option
- basic throttle implementation
- throttle with trailing call
- generic memoize implementation
- Agoda screening examples
- React `useDebouncedValue` examples

Risk: Medium

Confidence: High

User decision needed: Yes for removing duplicate code

### Cluster: React Performance / React.memo / useMemo / useCallback

Type:

- near duplicate
- duplicate Q&A
- conceptual overlap

Files involved:

- `docs/web-development/important/performance/react-performance.md`
- `docs/web-development/react-js/react-hooks.md`
- `docs/web-development/react-js/rendering-components.md`
- `docs/web-development/react-js/fundamentals/index.md`
- `docs/web-development/react-js/fundamentals/reconciliation-1.md`
- `docs/web-development/important/performance/core-web-vitals.md`
- `docs/web-development/companies/adobe.md`
- `docs/web-development/companies/agoda/index.md`

Current problem:

The same optimization guidance appears as general React performance strategy, hook API explanation, render behavior, fundamentals, and company prep.

Recommended canonical page:

- Optimization decisions: `docs/web-development/important/performance/react-performance.md`
- Hook API behavior: `docs/web-development/react-js/react-hooks.md`

Recommended action:

- keep both with cross-links
- replace long repeated optimization explanations in company and overview pages with prompts + links

Content to preserve:

- when memoization helps
- when memoization hurts
- stable props guidance
- profiler-first advice
- company-specific follow-up questions

Risk: Medium

Confidence: High

User decision needed: Yes

### Cluster: React Reconciliation / Fiber / Render Phase / Commit Phase

Type:

- near duplicate
- duplicate Q&A
- category overlap

Files involved:

- `docs/web-development/react-js/fundamentals/reconciliation-1.md`
- `docs/web-development/react-js/fundamentals/reconciliation-2.md`
- `docs/web-development/react-js/fundamentals/react-fiber.md`
- `docs/web-development/react-js/fundamentals/index.md`
- `docs/web-development/react-js/core-concept-internals.md`
- `docs/web-development/react-js/react-under-the-hood.md`
- `docs/web-development/react-js/rendering-components.md`
- `docs/system-design/basic-concepts.md`
- `docs/web-development/companies/agoda/index.md`

Current problem:

Fiber, reconciliation, diffing, render phase, commit phase, scheduling, lanes, and concurrent rendering appear across many React pages with overlapping explanations.

Recommended canonical page:

- Reconciliation: `docs/web-development/react-js/fundamentals/reconciliation-1.md`
- Fiber deep dive: `docs/web-development/react-js/fundamentals/react-fiber.md`
- Render/commit lifecycle: `docs/web-development/react-js/rendering-components.md`
- Internals overview: `docs/web-development/react-js/react-under-the-hood.md`

Recommended action:

- keep contextual ownership boundaries
- create a no-loss merge plan for `reconciliation-1.md` + `reconciliation-2.md`
- cross-link before deleting duplicate paragraphs

Content to preserve:

- diffing rules
- key behavior
- render vs commit phase
- Fiber lanes/scheduler details
- concurrent rendering caveats
- interview-ready summaries

Risk: High

Confidence: High

User decision needed: Yes

### Cluster: XSS / OWASP / React Security

Type:

- exact duplicate inside page
- near duplicate
- conceptual overlap

Files involved:

- `docs/web-development/important/security/xss-cross-site-scripting.md`
- `docs/web-development/important/security/owasp.md`
- `docs/web-development/important/security/react-security.md`
- `docs/web-development/important/security/security-headers.md`
- `docs/web-development/javascript/browser-apis-dom.md`
- `docs/system-design/basic-concepts.md`
- `docs/web-development/node-js/chatgpt-node.md`
- `docs/web-development/companies/adobe.md`
- `docs/web-development/companies/agoda/index.md`

Current problem:

XSS has a dedicated page, but the same definitions, danger explanation, localStorage risk, React auto-escaping, and `dangerouslySetInnerHTML` warnings repeat across OWASP, React Security, Browser APIs, System Design, and company pages. `xss-cross-site-scripting.md` itself contains repeated XSS sections.

Recommended canonical page:

`docs/web-development/important/security/xss-cross-site-scripting.md`

Recommended action:

- merge duplicate sections into canonical page
- keep OWASP as index/overview
- replace duplicates elsewhere with short context-specific warnings and links

Content to preserve:

- stored/reflected/DOM-based XSS
- React escaping behavior
- `dangerouslySetInnerHTML`
- localStorage/token theft
- CSP/sanitization notes
- company-specific security prep

Risk: High

Confidence: High

User decision needed: Yes

### Cluster: JWT / CSRF / Token Storage / Cookies

Type:

- near duplicate
- duplicate interview answers
- category overlap

Files involved:

- `docs/web-development/important/security/jwt-csrf.md`
- `docs/web-development/important/security/index.md`
- `docs/web-development/important/security/owasp.md`
- `docs/web-development/important/security/react-security.md`
- `docs/web-development/javascript/browser-apis-dom.md`
- `docs/web-development/node-js/chatgpt-node.md`
- `docs/web-development/next-js/chatgpt-next.md`
- `docs/system-design/basic-concepts.md`
- `docs/web-development/companies/adobe.md`
- `docs/web-development/companies/agoda/platform-round-2.md`

Current problem:

Token storage and CSRF tradeoffs repeat across frontend security, browser APIs, Node.js auth, Next.js auth, and company notes.

Recommended canonical page:

`docs/web-development/important/security/jwt-csrf.md`

Recommended action:

- merge browser token-storage tradeoffs into canonical page
- keep Node.js and Next.js implementation-specific JWT material in framework pages
- cross-link framework pages to frontend token-storage tradeoffs

Content to preserve:

- HttpOnly/Secure/SameSite cookie guidance
- localStorage XSS risk
- CSRF token flow
- CORS/credentials details
- Node middleware examples
- Next.js server action CSRF note
- company platform-round context

Risk: High

Confidence: High

User decision needed: Yes

### Cluster: Security Headers / iFrame / Clickjacking / CSP

Type:

- conceptual overlap
- category overlap

Files involved:

- `docs/web-development/important/security/security-headers.md`
- `docs/web-development/important/security/iframe-protection.md`
- `docs/web-development/important/security/owasp.md`
- `docs/web-development/important/security/index.md`
- `docs/system-design/basic-concepts.md`
- `docs/web-development/node-js/chatgpt-node.md`
- `docs/web-development/next-js/chatgpt-next.md`

Current problem:

Security headers, CSP, frame ancestors, `X-Frame-Options`, and clickjacking are repeated across multiple security pages and backend/framework notes.

Recommended canonical page:

- Headers overview: `docs/web-development/important/security/security-headers.md`
- iFrame/clickjacking deep dive: `docs/web-development/important/security/iframe-protection.md`

Recommended action:

- keep both with cross-links
- make OWASP and System Design short summaries

Content to preserve:

- CSP examples
- `X-Frame-Options`
- `frame-ancestors`
- clickjacking examples
- Node/Next implementation notes

Risk: Medium

Confidence: High

User decision needed: Yes for content movement

### Cluster: TypeScript Concepts

Type:

- near duplicate
- duplicate Q&A
- duplicate examples

Files involved:

- `docs/web-development/typescript/index.md`
- `docs/web-development/typescript/chatgpt-notes.md`
- `docs/web-development/typescript/ts-concepts.md`
- `docs/web-development/typescript/code.md`
- `docs/web-development/javascript/interview-q-a/quick-q-a-js.md`

Current problem:

`type` vs `interface`, generics, utility types, type narrowing, `keyof`, mapped types, discriminated unions, and React typing appear in several TypeScript pages.

Recommended canonical page:

- Concepts: `docs/web-development/typescript/ts-concepts.md`
- Examples/implementations: `docs/web-development/typescript/code.md`
- Interview Q&A: `docs/web-development/typescript/chatgpt-notes.md` if preserved as an interview page

Recommended action:

- convert `index.md` to overview later
- preserve interview flow in `chatgpt-notes.md`
- avoid duplicating examples between `ts-concepts.md` and `code.md`

Content to preserve:

- examples for utility types
- implementation of custom utility types
- React TypeScript examples
- senior TypeScript modeling notes

Risk: Medium

Confidence: High

User decision needed: Yes

## 3. Medium Confidence Overlaps

### Cluster: Event Loop / Promises / Microtasks

Type:

- conceptual overlap
- duplicate interview prompts

Files involved:

- `docs/web-development/javascript/event-loop.md`
- `docs/web-development/javascript/asynchronous-javascript.md`
- `docs/web-development/javascript/interview-q-a/index.md`
- `docs/web-development/javascript/interview-q-a/quick-q-a-js.md`
- `docs/web-development/node-js/chatgpt-node.md`
- `docs/web-development/companies/agoda/index.md`

Current problem:

The main Event Loop duplicate has already been consolidated. Remaining overlap is mostly valid: browser Event Loop, async/await and promises, Node.js event loop, and company interview prompts.

Recommended canonical page:

`docs/web-development/javascript/event-loop.md`

Recommended action:

- keep both with cross-links
- leave Node.js-specific phases in Node.js
- keep company prompts short

Content to preserve:

- Promise vs `setTimeout` output questions
- async/await microtask behavior
- Node.js phases
- Agoda interview notes

Risk: Low

Confidence: Medium

User decision needed: No for links; Yes for deleting any examples

### Cluster: Core Web Vitals / CLS / Rendering Performance

Type:

- conceptual overlap
- duplicate Q&A

Files involved:

- `docs/web-development/important/performance/core-web-vitals.md`
- `docs/web-development/important/performance/index.md`
- `docs/web-development/important/performance/rendering.md`
- `docs/web-development/javascript/javascript-under-the-hood/browser-rendering-pipeline.md`
- `docs/web-development/companies/agoda/index.md`
- `docs/web-development/companies/adobe.md`
- `docs/web-development/companies/walmart.md`
- `docs/system-design/interview-pattern.md`

Current problem:

Core Web Vitals, CLS, rendering strategy, SSR/SSG/ISR, layout shifts, and performance metrics are discussed in both measurement pages and low-level rendering pages.

Recommended canonical page:

- Metrics: `docs/web-development/important/performance/core-web-vitals.md`
- Low-level rendering mechanics: `docs/web-development/javascript/javascript-under-the-hood/browser-rendering-pipeline.md`
- Rendering strategies: `docs/web-development/important/performance/rendering.md`

Recommended action:

- keep contextual ownership boundaries
- cross-link instead of merging all content into one page

Content to preserve:

- Lighthouse vs field data
- LCP/INP/CLS optimization
- SSR/SSG/ISR effect on LCP
- layout shift interview questions

Risk: Medium

Confidence: Medium

User decision needed: Yes for moving content

### Cluster: Next.js Rendering / Caching / Server Components

Type:

- conceptual overlap
- duplicate Q&A

Files involved:

- `docs/web-development/next-js/index.md`
- `docs/web-development/next-js/chatgpt-next.md`
- `docs/web-development/important/performance/rendering.md`
- `docs/web-development/important/performance/core-web-vitals.md`
- `docs/web-development/companies/walmart.md`
- `docs/web-development/companies/adobe.md`

Current problem:

SSR, SSG, ISR, Server Components, Client Components, caching, Middleware, Route Handlers, authentication, and dynamic import appear in Next.js notes and general performance pages.

Recommended canonical page:

- Next.js framework behavior: `docs/web-development/next-js/chatgpt-next.md`
- General rendering strategy: `docs/web-development/important/performance/rendering.md`

Recommended action:

- keep both with cross-links
- decide later whether `chatgpt-next.md` should be renamed to a long-term interview Q&A title

Content to preserve:

- App Router notes
- Next.js 15 caching note
- framework-specific auth and middleware details
- rendering strategy comparison

Risk: Medium

Confidence: Medium

User decision needed: Yes for rename/merge

### Cluster: REST / GraphQL / API Layer / BFF

Type:

- category overlap
- conceptual overlap

Files involved:

- `docs/web-development/important/backend-for-fe-bff.md`
- `docs/web-development/node-js/chatgpt-node.md`
- `docs/web-development/next-js/chatgpt-next.md`
- `docs/web-development/react-js/state-management.md`
- `docs/system-design/interview-pattern.md`
- `docs/web-development/companies/adobe.md`
- `docs/web-development/companies/walmart.md`

Current problem:

API layer concepts appear as BFF, REST APIs, GraphQL clients, Node.js services, Next.js Route Handlers, state-management server state, and system-design tradeoffs.

Recommended canonical page:

No single canonical page yet.

Recommended action:

- leave as-is
- later decide whether `backend-for-fe-bff.md` should own BFF only or broader API Layer notes

Content to preserve:

- Node.js REST implementation details
- Next.js Route Handler details
- GraphQL/Apollo state-management notes
- company-specific headless commerce and BFF context

Risk: Medium

Confidence: Low

User decision needed: Yes

### Cluster: Caching / CDN / Server-State Cache

Type:

- conceptual overlap
- category overlap

Files involved:

- `docs/system-design/interview-pattern.md`
- `docs/system-design/system-design-questions/autocomplete.md`
- `docs/system-design/system-design-questions/google-docs.md`
- `docs/web-development/next-js/chatgpt-next.md`
- `docs/web-development/node-js/chatgpt-node.md`
- `docs/web-development/react-js/state-management.md`
- `docs/web-development/important/performance/core-web-vitals.md`
- `docs/web-development/important/performance/index.md`
- `docs/web-development/javascript/browser-apis-dom.md`
- `docs/web-development/companies/adobe.md`
- `docs/web-development/companies/walmart.md`

Current problem:

Caching appears in many valid contexts: CDN/static assets, Redis/server cache, Next.js framework cache, browser storage/cache, service workers, server-state client caches, and system-design caches.

Recommended canonical page:

No single canonical page yet.

Recommended action:

- keep domain-specific ownership
- create an ownership boundary before merging

Content to preserve:

- cache-aside Node.js example
- Next.js caching layers
- CDN/Core Web Vitals relationship
- Autocomplete cache strategy
- React Query/SWR/RTK Query notes

Risk: Medium

Confidence: Medium

User decision needed: Yes

### Cluster: JavaScript Closures / Scope / Hoisting / `this` / call-bind-apply

Type:

- conceptual overlap
- duplicate interview questions

Files involved:

- `docs/web-development/javascript/closures.md`
- `docs/web-development/javascript/scope.md`
- `docs/web-development/javascript/hoisting.md`
- `docs/web-development/javascript/this-keyword.md`
- `docs/web-development/javascript/call-bind-apply.md`
- `docs/web-development/javascript/functions.md`
- `docs/web-development/javascript/interview-q-a/index.md`
- `docs/web-development/javascript/interview-q-a/quick-q-a-js.md`
- `docs/web-development/companies/agoda/index.md`
- `docs/web-development/companies/adobe.md`

Current problem:

Core JS interview concepts are valid as individual pages, but interview Q&A and company pages repeat questions and short answers.

Recommended canonical page:

Each core JS topic page should stay canonical for its own topic.

Recommended action:

- keep both with cross-links
- company and interview pages should keep prompts, not long explanations

Content to preserve:

- closure implementation examples
- function declaration vs expression Q&A
- `this` binding rules
- call/apply/bind examples

Risk: Low

Confidence: Medium

User decision needed: No for links; Yes for merging

### Cluster: Testing

Type:

- conceptual overlap

Files involved:

- `docs/web-development/important/testing/index.md`
- `docs/web-development/important/testing/react-testing.md`
- `docs/web-development/react-js/react-architecture.md`
- `docs/web-development/important/accessibility.md`
- `docs/web-development/important/ux-design-system/storybook.md`
- `docs/web-development/node-js/chatgpt-node.md`
- `docs/web-development/next-js/chatgpt-next.md`
- `docs/system-design/system-design-questions/index.md`
- company pages

Current problem:

Testing is mentioned as general strategy, React testing, accessibility testing, Storybook visual testing, Node/Next testing, and system-design validation.

Recommended canonical page:

- General testing: `docs/web-development/important/testing/index.md`
- React-specific testing: `docs/web-development/important/testing/react-testing.md`

Recommended action:

- keep both with cross-links
- do not merge framework-specific testing into general testing yet

Content to preserve:

- React Testing Library examples
- accessibility/Storybook context
- API testing context in Node/Next

Risk: Low

Confidence: Medium

User decision needed: No for links; Yes for movement

### Cluster: Micro Frontends

Type:

- category overlap
- placeholder conflict

Files involved:

- `docs/web-development/important/micro-frontends.md`
- `docs/web-development/react-js/react-architecture.md`
- `docs/web-development/important/performance/react-performance.md`
- `docs/web-development/companies/adobe.md`
- `docs/web-development/companies/walmart.md`
- `docs/system-design/interview-pattern.md`

Current problem:

The approved hierarchy has an Important > Micro Frontends page, but the visible page is TODO-only while meaningful MFE content exists in React Architecture and company pages.

Recommended canonical page:

`docs/web-development/important/micro-frontends.md`, if the user wants Micro Frontends as a first-class Important topic.

Recommended action:

- needs user decision
- do not merge until approved

Content to preserve:

- Adobe migration/MFE strategy
- dependency sharing and architecture notes
- performance tradeoffs

Risk: Medium

Confidence: Medium

User decision needed: Yes

### Cluster: DSA + JavaScript Coding Overlap

Type:

- conceptual overlap
- duplicate coding pattern category

Files involved:

- `docs/dsa/recently-asked.md`
- `docs/dsa/js-vs-java.md`
- `docs/dsa/problems-solved.md`
- `docs/web-development/javascript/javascript-coding-questions.md`
- `docs/web-development/javascript/arrays-collections.md`
- `docs/web-development/javascript/strings.md`
- `docs/web-development/javascript/advanced-js.md`
- `docs/web-development/companies/agoda/screening-round.md`

Current problem:

DSA pages own algorithmic practice, while JavaScript pages own language utilities and machine-coding snippets. Some implementation topics share `Map`, `Set`, arrays, strings, recursion, memoization, sorting, and sliding-window language.

Recommended canonical page:

- Algorithmic DSA: `docs/dsa/recently-asked.md` and future DSA problem pages
- JavaScript utilities/polyfills: `docs/web-development/javascript/javascript-coding-questions.md`
- JS data structures language behavior: `docs/web-development/javascript/arrays-collections.md`

Recommended action:

- keep contextual ownership boundaries
- cross-link when a JS implementation supports a DSA concept

Content to preserve:

- company screening solutions
- DSA problem statements and solutions
- JS utility implementations

Risk: Medium

Confidence: Medium

User decision needed: Yes for moving coding solutions

## 4. Duplicate Questions

| Question | Files involved | Recommended canonical page | Suggested action | Confidence |
|---|---|---|---|---|
| How does a Web Browser Work? | `system-design/basic-concepts.md`; `important/quick-questions.md`; `javascript-under-the-hood/index.md` | `javascript-under-the-hood/index.md` or `url-in-browser.md` | Keep one full answer, summarize elsewhere | High |
| How Does React Work Under the Hood? | `system-design/basic-concepts.md`; `important/quick-questions.md`; `javascript-under-the-hood/index.md` | `react-js/react-under-the-hood.md` | Replace duplicates with links | High |
| What is V8 Engine? | `system-design/basic-concepts.md`; `important/quick-questions.md`; `javascript-under-the-hood/index.md`; `js-engine.md` | `javascript-under-the-hood/js-engine.md` | Make index/overview short | High |
| What is SpiderMonkey? | `system-design/basic-concepts.md`; `important/quick-questions.md`; `javascript-under-the-hood/index.md` | `javascript-under-the-hood/js-engine.md` | Move/merge engine details later | High |
| Difference between synchronous and asynchronous JavaScript? | `system-design/basic-concepts.md`; `important/quick-questions.md`; `javascript-under-the-hood/index.md`; `asynchronous-javascript.md` | `javascript/asynchronous-javascript.md` | Replace with summary + link | High |
| How does the JavaScript Event Loop work? | `system-design/basic-concepts.md`; `important/quick-questions.md`; `javascript-under-the-hood/index.md`; `event-loop.md` | `javascript/event-loop.md` | Mostly already consolidated; keep links | High |
| What is the Role of DOM and BOM? | `system-design/basic-concepts.md`; `important/quick-questions.md`; `javascript-under-the-hood/index.md`; `browser-apis-dom.md` | `javascript/browser-apis-dom.md` | Replace duplicates with link | High |
| What is WebAssembly and how does it work? | `system-design/basic-concepts.md`; `important/quick-questions.md`; `javascript-under-the-hood/index.md` | No current dedicated page | Decide whether JS Under The Hood owns it | Medium |
| What is a Render Tree? | `system-design/basic-concepts.md`; `important/quick-questions.md`; `javascript-under-the-hood/index.md`; `browser-rendering-pipeline.md` | `browser-rendering-pipeline.md` | Merge exact duplicates | High |
| What causes layout shifts? | `companies/agoda/index.md`; `browser-rendering-pipeline.md`; `core-web-vitals.md` | `core-web-vitals.md` for metric, `browser-rendering-pipeline.md` for mechanics | Keep company prompt + link | High |
| Why is transform faster than top/left? | `companies/agoda/index.md`; `browser-rendering-pipeline.md` | `browser-rendering-pipeline.md` | Keep company prompt + link | High |
| What is Reconciliation? | `core-concept-internals.md`; `fundamentals/index.md`; `reconciliation-1.md`; `reconciliation-2.md` | `reconciliation-1.md` | Merge after no-loss plan | High |
| What is Concurrent Rendering? | `core-concept-internals.md`; `react-under-the-hood.md`; `react-fiber.md` | `react-under-the-hood.md` or `react-fiber.md` | Needs boundary decision | Medium |
| What is type narrowing? | `typescript/chatgpt-notes.md`; `typescript/ts-concepts.md` | `typescript/ts-concepts.md` | Keep interview answer in ChatGPT notes only if page remains Q&A | High |
| What are utility types? | `typescript/chatgpt-notes.md`; `typescript/ts-concepts.md`; `typescript/code.md` | `typescript/ts-concepts.md` | Examples in Code, concept in TS Concepts | High |
| What is CORS? | `node-js/chatgpt-node.md`; `security/index.md`; `jwt-csrf.md`; company pages | No dedicated CORS page | Keep Node implementation and security overview, decide later | Medium |
| What is JWT? | `jwt-csrf.md`; `node-js/chatgpt-node.md`; `next-js/chatgpt-next.md`; company pages | `jwt-csrf.md` for browser tradeoffs | Keep framework-specific implementation | High |
| What is BFF? | `backend-for-fe-bff.md`; `node-js/chatgpt-node.md`; company pages | `backend-for-fe-bff.md` | Cross-link; do not merge Node implementation blindly | Medium |

## 5. Duplicate Answers

| Answer theme | Files involved | Recommended canonical page | Suggested action | Confidence |
|---|---|---|---|---|
| Browser request-to-render flow | `basic-concepts.md`; `quick-questions.md`; `javascript-under-the-hood/index.md`; `url-in-browser.md` | `url-in-browser.md` and `browser-rendering-pipeline.md` | Split URL/network flow from render pipeline | High |
| Event Loop priority: microtasks before macrotasks | `event-loop.md`; `asynchronous-javascript.md`; `quick-q-a-js.md`; `agoda/index.md`; `node-js/chatgpt-node.md` | `event-loop.md` for browser, Node page for Node | Keep contextual answers, cross-link | Medium |
| React is efficient because of Virtual DOM/Reconciliation/Fiber | `fundamentals/index.md`; `reconciliation-1.md`; `core-concept-internals.md`; `react-under-the-hood.md`; `basic-concepts.md` | `reconciliation-1.md` plus `react-fiber.md` | Merge repeated summaries after ownership decision | High |
| React memoization should be profiling-driven | `react-performance.md`; `react-hooks.md`; `rendering-components.md`; `agoda/index.md`; `adobe.md` | `react-performance.md` | Keep hook API details in Hooks | High |
| XSS prevention: sanitize, escape, avoid `dangerouslySetInnerHTML`, CSP | `xss-cross-site-scripting.md`; `owasp.md`; `react-security.md`; `security-headers.md`; `browser-apis-dom.md` | `xss-cross-site-scripting.md` | Merge XSS details, link from OWASP/React Security | High |
| Token storage: localStorage is XSS-prone, HttpOnly cookies are safer | `jwt-csrf.md`; `browser-apis-dom.md`; `node-js/chatgpt-node.md`; `next-js/chatgpt-next.md`; `basic-concepts.md` | `jwt-csrf.md` | Keep implementation notes in framework pages | High |
| Core Web Vitals: LCP/INP/CLS definitions and optimization | `core-web-vitals.md`; `performance/index.md`; `react-performance.md`; company pages | `core-web-vitals.md` | Keep company prompts short | High |
| Server-state caching needs loading/error/refetch/invalidation | `react-js/state-management.md`; `react-performance.md`; `node-js/chatgpt-node.md`; `next-js/chatgpt-next.md` | `react-js/state-management.md` for client state; framework pages for implementation | Cross-link only | Medium |
| TypeScript generics preserve input/output relationships | `ts-concepts.md`; `chatgpt-notes.md`; `code.md` | `ts-concepts.md` | Keep examples in Code | High |
| TypeScript utility types transform existing types | `ts-concepts.md`; `chatgpt-notes.md`; `code.md` | `ts-concepts.md` | Keep custom implementations in Code | High |

## 6. Duplicate Code Snippets

| Code/topic | Files involved | Recommended canonical implementation page | Suggested action | Confidence |
|---|---|---|---|---|
| Basic debounce | `javascript/advanced-js.md`; `javascript/javascript-coding-questions.md`; `react-js/react-hooks.md`; `react-js/advanced-react-patterns.md`; `system-design/system-design-questions/autocomplete.md` | `javascript/javascript-coding-questions.md` | Keep concept in Advanced JS, implementation in coding page, React hook in React Hooks | High |
| Debounce with immediate option | `javascript/advanced-js.md`; `javascript/javascript-coding-questions.md` | `javascript/javascript-coding-questions.md` | Merge duplicate implementation later | High |
| Basic throttle | `javascript/advanced-js.md`; `javascript/javascript-coding-questions.md` | `javascript/javascript-coding-questions.md` | Merge duplicate implementation later | High |
| Throttle with trailing call | `javascript/advanced-js.md`; `javascript/javascript-coding-questions.md` | `javascript/javascript-coding-questions.md` | Scanner found near-exact duplicate; merge later | High |
| Generic memoize function | `javascript/advanced-js.md`; `javascript/javascript-coding-questions.md`; `companies/agoda/screening-round.md`; `javascript/closures.md` | `javascript/javascript-coding-questions.md` for implementation; `advanced-js.md` for concept | Company page should link and keep screening context | High |
| React `useDebouncedValue` hook | `react-js/react-hooks.md`; `react-js/advanced-react-patterns.md` | `react-js/react-hooks.md` | Keep pattern page short or link | Medium |
| React.memo + useCallback child example | `react-hooks.md`; `react-performance.md`; `rendering-components.md` | `react-performance.md` for optimization; Hooks for API | Keep both only with clear boundary | Medium |
| TypeScript utility type examples (`Partial`, `Pick`, `Omit`, `Record`) | `typescript/ts-concepts.md`; `typescript/chatgpt-notes.md`; `typescript/code.md` | `typescript/code.md` for implementation examples | Concepts page can link to code page | High |

Classification:

- DSA implementation: DSA problem pages and future individual DSA problem pages.
- JavaScript utility: debounce, throttle, memoize, polyfills, event emitter, deep clone, LRU.
- React pattern: custom hooks, memoized child examples, Context provider memoization.
- System design helper: autocomplete debounce/cache, Google Docs WebSocket syncing.
- Interview coding round solution: Agoda screening memoization and company-specific coding notes.

## 7. Category Conflicts

Topic: Memoization

Locations:

- DSA and System Design mention algorithmic or cache-style memoization.
- `docs/web-development/javascript/advanced-js.md`
- `docs/web-development/javascript/javascript-coding-questions.md`
- `docs/web-development/react-js/react-hooks.md`
- `docs/web-development/important/performance/react-performance.md`
- company pages

Decision needed:

DSA should own algorithmic/DP memoization, JavaScript should own generic `memoize(fn)` implementation, and React Performance should own React.memo/useMemo/useCallback optimization decisions.

Topic: Caching

Locations:

- System Design interview pattern and questions
- Next.js
- Node.js
- React State Management
- Browser APIs
- Core Web Vitals / Performance
- company pages

Decision needed:

Keep contextual ownership. Do not create one giant cache page unless the user approves a future “Caching Overview” page.

Topic: Browser Rendering

Locations:

- JavaScript Under The Hood
- Browser Rendering Pipeline
- URL in Browser
- Core Web Vitals
- Quick Questions
- System Design Basic Concepts
- company pages

Decision needed:

Browser Rendering Pipeline owns mechanics; Core Web Vitals owns measurement; company pages own prompts.

Topic: Security

Locations:

- Security overview
- OWASP
- XSS
- JWT/CSRF
- React Security
- Security Headers
- Browser APIs
- Node.js
- Next.js
- System Design
- company pages

Decision needed:

Security section owns frontend concepts. Node.js/Next.js keep implementation details. System Design keeps summary/checklist context.

Topic: React Internals

Locations:

- Fundamentals
- Reconciliation 1/2
- React Fiber
- Core Concept Internals
- React Under The Hood
- Rendering Components

Decision needed:

Approve separate canonical ownership boundaries before merging.

Topic: Company Pages

Locations:

- Adobe
- Agoda
- Walmart
- Samsung DSP
- Forbes Advisor
- Arcticwolf
- OneTrust

Decision needed:

Company pages should usually keep company-specific prep, interview prompts, and experience stories. They should not own full canonical technical explanations.

## 8. Suggested Canonical Ownership Map

| Topic | Canonical page | Supporting pages | Notes |
|---|---|---|---|
| Event Loop | `docs/web-development/javascript/event-loop.md` | Async JS, Node.js, company pages | Browser JS canonical already consolidated; Node event loop remains separate |
| Promises / Async-Await | `docs/web-development/javascript/asynchronous-javascript.md` | Event Loop, Quick Q&A, Node.js | Keep promise APIs and async/await here |
| Browser Rendering Pipeline | `docs/web-development/javascript/javascript-under-the-hood/browser-rendering-pipeline.md` | URL in Browser, Core Web Vitals, Quick Questions | Next exact-duplicate cleanup candidate |
| DOM / Browser APIs | `docs/web-development/javascript/browser-apis-dom.md` | Security, Browser Rendering, HTML & CSS | Own localStorage/cookies/DOM API mechanics |
| Garbage Collection | `docs/web-development/javascript/javascript-under-the-hood/garbage-collector-internals.md` | Memory Management, Closures | Need boundary with `memory-management.md` |
| JavaScript Utilities | `docs/web-development/javascript/javascript-coding-questions.md` | Advanced JS, company screening | Own implementations |
| Advanced JS Concepts | `docs/web-development/javascript/advanced-js.md` | Coding Questions | Own conceptual explanations |
| React Performance | `docs/web-development/important/performance/react-performance.md` | React Hooks, Rendering Components, company pages | Own optimization strategy |
| React Hooks API | `docs/web-development/react-js/react-hooks.md` | React Performance | Own hook behavior and usage |
| React Reconciliation | `docs/web-development/react-js/fundamentals/reconciliation-1.md` | Reconciliation 2, Fundamentals, Internals | Merge plan needed |
| React Fiber | `docs/web-development/react-js/fundamentals/react-fiber.md` | React Under The Hood, Core Concept Internals | Standalone deep dive for now |
| Render/Commit Phase | `docs/web-development/react-js/rendering-components.md` | React Under The Hood, Reconciliation | Own user-facing lifecycle |
| XSS | `docs/web-development/important/security/xss-cross-site-scripting.md` | OWASP, React Security, Browser APIs | Merge duplicate XSS sections |
| JWT / CSRF / Token Storage | `docs/web-development/important/security/jwt-csrf.md` | Node.js, Next.js, Browser APIs | Own browser token-storage tradeoffs |
| Security Headers | `docs/web-development/important/security/security-headers.md` | iFrame Protection, OWASP | Own header overview |
| iFrame / Clickjacking | `docs/web-development/important/security/iframe-protection.md` | Security Headers, OWASP | Own frame-specific protection |
| Core Web Vitals | `docs/web-development/important/performance/core-web-vitals.md` | Browser Rendering, React Performance | Own metrics and measurement |
| Rendering Strategies | `docs/web-development/important/performance/rendering.md` | Next.js, Core Web Vitals | Own SSR/SSG/ISR/CSR comparison |
| Next.js | `docs/web-development/next-js/chatgpt-next.md` | Rendering, Core Web Vitals, JWT/CSRF | Framework-specific behavior |
| Node.js | `docs/web-development/node-js/chatgpt-node.md` | JWT/CSRF, CORS/Security, BFF | Framework/runtime implementation |
| TypeScript Concepts | `docs/web-development/typescript/ts-concepts.md` | ChatGPT Notes, Code | Own concept explanations |
| TypeScript Examples | `docs/web-development/typescript/code.md` | TS Concepts | Own implementation snippets |
| Testing | `docs/web-development/important/testing/index.md` | React Testing, Storybook, Node/Next | General strategy vs framework-specific |
| Micro Frontends | `docs/web-development/important/micro-frontends.md` pending fill | React Architecture, Adobe | Needs user approval |
| System Design Google Docs | `docs/system-design/system-design-questions/google-docs.md` | Interview Pattern | Own problem-specific design |
| DSA Algorithms | DSA pages/future individual DSA pages | JS Coding Questions | DSA owns algorithmic patterns, JS owns language utility implementations |

## 9. Suggested Cleanup Batches

Batch 1: Exact duplicate paragraphs only

- Render Tree exact duplicate.
- Google Docs component breakdown duplicated in Interview Pattern.
- Throttle trailing-call duplicate.
- Duplicate XSS sections inside `xss-cross-site-scripting.md`.

Batch 2: Duplicate Q&A consolidation

- Repeated frontend basics question set.
- TypeScript duplicate questions.
- React internals duplicate questions.
- Security duplicate questions.

Batch 3: Duplicate code snippets

- Debounce.
- Throttle.
- Memoize.
- React `useDebouncedValue`.
- TypeScript utility type implementations.

Batch 4: React internals ownership

- Reconciliation 1 vs Reconciliation 2.
- Fiber vs React Under The Hood.
- Core Concept Internals vs Rendering Components.

Batch 5: Security ownership

- XSS.
- JWT/CSRF/token storage.
- Security headers vs iFrame/clickjacking.
- OWASP as overview.

Batch 6: System Design vs Web Development cross-links

- Keep System Design summaries short.
- Link frontend/browser/security details to Web Development canonical pages.
- Keep system-design problem pages focused on design tradeoffs.

Batch 7: Company pages cleanup

- Keep company context, asked questions, and prep strategy.
- Replace full technical explanations with links to canonical pages.

## 10. Manual Review Questions For User

1. Should company pages keep full technical answers, or should they become mostly prompts + links to canonical pages?
2. Should `docs/web-development/important/quick-questions.md` remain a real answer page, or become an interview index linking to canonical pages?
3. Should `docs/system-design/basic-concepts.md` keep frontend basics, or become only system-design-facing summaries?
4. Should React Fiber stay separate from React Under The Hood?
5. Should Reconciliation 2 be merged into Reconciliation 1?
6. Should TypeScript `chatgpt-notes.md` stay as an interview Q&A page, or be split into concepts and examples?
7. Should Micro Frontends be filled as the canonical Important page using existing React Architecture and company content?
8. Should DSA coding solutions be canonical over JavaScript coding pages for algorithmic problems?
9. Should we create a future Caching overview page, or keep caching split by domain?
10. Should we create a dedicated CORS page, or keep it under security/framework pages?
11. Should Node.js and Next.js pages be renamed from `chatgpt-*` to long-term interview Q&A names before deeper cleanup?
12. Should Google Docs system-design content live only in its problem page, with Interview Pattern kept generic?

## Build Result

- Pass.
- Command: `npm run build`
- Docusaurus generated static files in `build`.
- Warning: Docusaurus update check could not access `/Users/akhileshbamhore/.config`; this did not fail the build and is unrelated to the audit.

# Canonical Topic Decisions

Date: 2026-07-04

Scope: active documentation under `docs/`, including DSA, Web Development, and System Design.

This is a planning document only. No documentation content, sidebars, source notes, or knowledge-map files were modified.

## 1. Executive Summary

The current duplicate and overlap risk is concentrated in Web Development and System Design. DSA does not appear to own duplicate explanations for the topics in this plan.

Recommended direction:

- Keep core JavaScript/browser concepts canonical under `docs/web-development/javascript/`.
- Keep React optimization canonical under `docs/web-development/important/performance/react-performance.md`.
- Keep React internal mechanics canonical under the existing React.js fundamentals and internals pages, with a few user decisions before merging.
- Keep frontend security canonical under `docs/web-development/important/security/`.
- Keep TypeScript concepts canonical under `docs/web-development/typescript/ts-concepts.md`.
- Keep System Design pages as system-design-facing summaries or interview framing, then cross-link to canonical Web Development pages where duplicate frontend explanations currently exist.
- Do not create new canonical pages yet for REST/GraphQL/API Layer or Caching/CDN. Those areas are broad and currently spread across domain-specific pages.

Safe next step after approval: add cross-links first, then merge exact duplicate Event Loop and Browser Rendering sections.

## 2. Approved-Looking High-Confidence Decisions

These decisions look safe and aligned with the audit, but content changes still require approval before execution.

| Topic | Recommended canonical page | Related pages | Recommended action | Confidence | Reason | Safe first action | User approval required |
|---|---|---|---|---|---|---|---|
| Event Loop | `docs/web-development/javascript/event-loop.md` | `docs/system-design/basic-concepts.md`; `docs/web-development/important/quick-questions.md`; `docs/web-development/javascript/javascript-under-the-hood/index.md`; `docs/web-development/javascript/asynchronous-javascript.md`; `docs/web-development/node-js/chatgpt-node.md`; company prep pages | merge duplicate sections | High | Event Loop is a core JavaScript topic and is already registered in `.knowledge/knowledge-map.yaml` as canonical. System Design and quick-question pages repeat browser JS content. Node.js has a related but Node-specific event loop section. | Add cross-links from System Design Basic Concepts, Quick Questions, and JavaScript Under The Hood to the Event Loop page. Keep Node-specific phases in Node.js. | Yes |
| Browser Rendering Pipeline / Render Tree | `docs/web-development/javascript/javascript-under-the-hood/browser-rendering-pipeline.md` | `docs/system-design/basic-concepts.md`; `docs/web-development/important/quick-questions.md`; `docs/web-development/javascript/javascript-under-the-hood/index.md`; `docs/web-development/javascript/javascript-under-the-hood/url-in-browser.md`; `docs/web-development/html-css.md`; `docs/web-development/important/performance/core-web-vitals.md` | merge duplicate sections | High | Render Tree and browser rendering are low-level browser mechanics. The browser rendering pipeline page is the clearest existing deep-dive owner. System Design currently repeats this as basic frontend background. | Link URL-in-Browser, Quick Questions, and System Design Basic Concepts to the browser rendering pipeline page. | Yes |
| React Performance | `docs/web-development/important/performance/react-performance.md` | `docs/web-development/react-js/react-hooks.md`; `docs/web-development/react-js/fundamentals/index.md`; `docs/web-development/react-js/fundamentals/reconciliation-1.md`; `docs/web-development/react-js/rendering-components.md`; `docs/web-development/companies/agoda/index.md`; `docs/web-development/companies/adobe.md`; `docs/system-design/basic-concepts.md` | keep both with cross-links | High | React performance spans profiling, render cost, memoization, virtualization, bundle strategy, and senior/staff tradeoffs. The performance page is already the richest owner. Company and system-design pages should remain interview prompts. | Add links from React Hooks, Rendering Components, Fundamentals, company prep, and System Design references to React Performance. | Yes |
| React.memo / useMemo / useCallback | Optimization guidance: `docs/web-development/important/performance/react-performance.md`; API usage: `docs/web-development/react-js/react-hooks.md` | `docs/web-development/react-js/fundamentals/index.md`; `docs/web-development/react-js/fundamentals/reconciliation-1.md`; `docs/web-development/companies/agoda/index.md`; `docs/web-development/companies/adobe.md`; `docs/web-development/important/performance/core-web-vitals.md`; `docs/system-design/basic-concepts.md` | keep both with cross-links | High | These APIs need two owners: React Hooks for API behavior, and React Performance for optimization decision-making. Merging all content into one page would make either page less useful. | Cross-link both pages with a clear ownership note before removing duplicate long explanations elsewhere. | Yes |
| React Reconciliation | `docs/web-development/react-js/fundamentals/reconciliation-1.md` | `docs/web-development/react-js/fundamentals/reconciliation-2.md`; `docs/web-development/react-js/fundamentals/index.md`; `docs/web-development/react-js/core-concept-internals.md`; `docs/web-development/react-js/react-under-the-hood.md`; `docs/system-design/basic-concepts.md`; company prep pages | merge duplicate sections | High | Reconciliation is already a direct React fundamentals page. `reconciliation-2.md` appears to be a continuation or duplicate-style deep dive and should be reviewed for merge. | Compare `reconciliation-1.md` and `reconciliation-2.md`, then propose a no-loss merge plan. | Yes |
| XSS | `docs/web-development/important/security/xss-cross-site-scripting.md` | `docs/web-development/important/security/owasp.md`; `docs/web-development/important/security/react-security.md`; `docs/web-development/important/security/security-headers.md`; `docs/web-development/javascript/browser-apis-dom.md`; `docs/system-design/basic-concepts.md`; `docs/web-development/node-js/chatgpt-node.md`; company prep pages | merge duplicate sections | High | XSS has a dedicated security page with detailed explanation. OWASP, React Security, Browser APIs, and System Design should provide context and link to the canonical page. | Add links from OWASP, React Security, Browser APIs, and System Design Basic Concepts to the XSS page. | Yes |
| JWT / CSRF / Token Storage | `docs/web-development/important/security/jwt-csrf.md` | `docs/web-development/important/security/index.md`; `docs/web-development/important/security/xss-cross-site-scripting.md`; `docs/web-development/important/security/react-security.md`; `docs/web-development/node-js/chatgpt-node.md`; `docs/web-development/next-js/chatgpt-next.md`; `docs/system-design/basic-concepts.md`; company prep pages | merge duplicate sections | High | Browser token storage and CSRF tradeoffs are frontend security decisions. Node.js and Next.js pages should keep framework-specific implementation context, not duplicate the full frontend tradeoff explanation. | Add cross-links from Node.js, Next.js, React Security, and System Design security notes. | Yes |
| TypeScript Concepts | `docs/web-development/typescript/ts-concepts.md` | `docs/web-development/typescript/index.md`; `docs/web-development/typescript/chatgpt-notes.md`; `docs/web-development/typescript/code.md`; `docs/web-development/react-js/react-architecture.md`; company prep pages | convert page to overview | High | `ts-concepts.md` is the best owner for concepts. `code.md` can own examples. `index.md` should become a lightweight outline later. `chatgpt-notes.md` needs a user decision because it is large and interview-oriented. | Add an ownership plan: `ts-concepts.md` for concepts, `code.md` for examples, `chatgpt-notes.md` for interview Q&A if preserved. | Yes |

## 3. Medium-Confidence Decisions Needing Review

These decisions are likely correct but need review because the current pages have meaningful overlapping content.

| Topic | Recommended canonical page | Related pages | Recommended action | Confidence | Reason | Safe first action | User approval required |
|---|---|---|---|---|---|---|---|
| React Fiber | `docs/web-development/react-js/fundamentals/react-fiber.md` | `docs/web-development/react-js/core-concept-internals.md`; `docs/web-development/react-js/react-under-the-hood.md`; `docs/web-development/react-js/fundamentals/reconciliation-1.md`; `docs/web-development/react-js/fundamentals/index.md`; `docs/system-design/basic-concepts.md` | keep both with cross-links | Medium | The user-requested default says keep Fiber as a standalone deep dive for now. `React Under The Hood` also has internals material, so full merge needs review. | Keep `react-fiber.md` as the standalone deep dive and link to it from React Under The Hood, Core Concept Internals, and Reconciliation. | Yes |
| Render phase / Commit phase | User-facing lifecycle: `docs/web-development/react-js/rendering-components.md`; internals: `docs/web-development/react-js/react-under-the-hood.md` | `docs/web-development/react-js/core-concept-internals.md`; `docs/web-development/react-js/fundamentals/react-fiber.md`; `docs/web-development/react-js/fundamentals/reconciliation-1.md`; `docs/web-development/react-js/fundamentals/index.md`; `docs/system-design/basic-concepts.md` | keep both with cross-links | Medium | Render and commit phase are both developer-facing React rendering concepts and internals concepts. One page should explain practical lifecycle; the other should explain internal scheduling/Fiber context. | Add reciprocal links and avoid moving content until ownership boundaries are approved. | Yes |
| Security Headers / iFrame / Clickjacking | Security headers: `docs/web-development/important/security/security-headers.md`; iFrame-specific: `docs/web-development/important/security/iframe-protection.md` | `docs/web-development/important/security/owasp.md`; `docs/web-development/important/security/index.md`; `docs/system-design/basic-concepts.md`; `docs/web-development/node-js/chatgpt-node.md`; `docs/web-development/next-js/chatgpt-next.md` | keep both with cross-links | Medium | Security headers and iFrame/clickjacking are related but not identical. Keeping separate pages preserves useful detail while linking the overlap. | Add reciprocal links between Security Headers and iFrame Protection, then link OWASP and System Design to both. | Yes |
| Testing | General testing: `docs/web-development/important/testing/index.md`; React-specific testing: `docs/web-development/important/testing/react-testing.md` | `docs/web-development/react-js/react-architecture.md`; `docs/web-development/important/accessibility.md`; `docs/web-development/important/ux-design-system/storybook.md`; `docs/web-development/node-js/chatgpt-node.md`; `docs/web-development/next-js/chatgpt-next.md`; `docs/system-design/system-design-questions/index.md`; `docs/system-design/system-design-questions/autocomplete.md`; company prep pages | keep both with cross-links | Medium | Testing appears as a general strategy, React implementation topic, accessibility concern, Storybook/design-system practice, Node/Next framework detail, and System Design evaluation topic. These are valid domain-specific mentions. | Cross-link only. Do not merge framework-specific testing sections into the general testing page yet. | No for links; Yes for moving content |
| Micro Frontends | Future canonical page: `docs/web-development/important/micro-frontends.md`; temporary content source: `docs/web-development/react-js/react-architecture.md` | `docs/web-development/next-js/index.md`; `docs/web-development/companies/adobe.md`; `docs/web-development/important/performance/react-performance.md`; `docs/system-design/interview-pattern.md` | needs user decision | Medium | The visible Micro Frontends page is currently TODO-only, but meaningful MFE content exists in React Architecture and company prep. The approved hierarchy includes Micro Frontends as an Important page, so it should likely become canonical after content migration. | Decide whether to fill `micro-frontends.md` from existing content or keep React Architecture as the practical owner for now. | Yes |
| Debounce / Throttle / Memoization | Concepts: `docs/web-development/javascript/advanced-js.md`; implementations: `docs/web-development/javascript/javascript-coding-questions.md` | `docs/web-development/companies/agoda/screening-round.md`; `docs/web-development/react-js/react-hooks.md`; `docs/web-development/react-js/advanced-react-patterns.md`; `docs/system-design/system-design-questions/autocomplete.md`; `docs/system-design/system-design-questions/google-docs.md`; `docs/system-design/interview-pattern.md`; `docs/web-development/important/performance/core-web-vitals.md` | keep both with cross-links | Medium | Conceptual explanation and coding implementation are different study needs. System Design pages use debounce/cache as design choices and should not own the canonical implementation. | Link coding pages to `advanced-js.md`; link Autocomplete and Google Docs system-design pages to the relevant JS concept page. | No for links; Yes for removing duplicates |
| Caching / CDN | No single canonical page yet | `docs/system-design/interview-pattern.md`; `docs/system-design/system-design-questions/autocomplete.md`; `docs/web-development/next-js/index.md`; `docs/web-development/next-js/chatgpt-next.md`; `docs/web-development/react-js/state-management.md`; `docs/web-development/important/performance/core-web-vitals.md`; `docs/web-development/javascript/browser-apis-dom.md`; `docs/web-development/javascript/javascript-under-the-hood/url-in-browser.md`; company prep pages | keep as-is | Medium | Caching has multiple valid domains: CDN/static assets, browser cache, service worker, Next.js data cache, server-state cache, Redis/distributed cache, and system-design cache. A single canonical page may become too broad unless created intentionally. | Keep domain-specific caching content. Create a future decision for whether a Web Caching overview page is needed. | Yes for new page |

## 4. Low-Confidence Decisions Requiring User Approval

These areas should be left alone until the user approves the intended long-term architecture.

| Topic | Recommended canonical page | Related pages | Recommended action | Confidence | Reason | Safe first action | User approval required |
|---|---|---|---|---|---|---|---|
| REST / GraphQL / API Layer | No current clear canonical page | `docs/system-design/interview-pattern.md`; `docs/web-development/important/backend-for-fe-bff.md`; `docs/web-development/node-js/chatgpt-node.md`; `docs/web-development/next-js/index.md`; `docs/web-development/next-js/chatgpt-next.md`; `docs/web-development/react-js/react-architecture.md`; `docs/web-development/react-js/state-management.md`; company prep pages | needs user decision | Low | API Layer spans frontend architecture, BFF, Node.js REST APIs, Next.js Route Handlers, GraphQL clients, and System Design tradeoffs. No existing page owns the whole concept cleanly. | Leave as-is. Later decide whether `Backend for FE (BFF)` should become the API Layer canonical page or whether a new approved page is needed. | Yes |

## 5. Suggested First Merge Batch

Perform only after user approval:

1. Event Loop
   - Canonical owner: `docs/web-development/javascript/event-loop.md`
   - Candidate duplicate sources: `docs/system-design/basic-concepts.md`, `docs/web-development/important/quick-questions.md`, `docs/web-development/javascript/javascript-under-the-hood/index.md`
   - Safe goal: keep short summaries in source pages and link to canonical page.

2. Browser Rendering Pipeline / Render Tree
   - Canonical owner: `docs/web-development/javascript/javascript-under-the-hood/browser-rendering-pipeline.md`
   - Candidate duplicate sources: `docs/system-design/basic-concepts.md`, `docs/web-development/important/quick-questions.md`, `docs/web-development/javascript/javascript-under-the-hood/index.md`
   - Safe goal: keep context-specific summaries and point to canonical browser rendering deep dive.

3. TypeScript Concepts
   - Canonical owner: `docs/web-development/typescript/ts-concepts.md`
   - Candidate duplicate sources: `docs/web-development/typescript/index.md`, `docs/web-development/typescript/chatgpt-notes.md`
   - Safe goal: make `index.md` an overview later; preserve interview Q&A if `chatgpt-notes.md` remains separate.

4. React Reconciliation
   - Canonical owner: `docs/web-development/react-js/fundamentals/reconciliation-1.md`
   - Candidate duplicate source: `docs/web-development/react-js/fundamentals/reconciliation-2.md`
   - Safe goal: compare pages first and merge only if `reconciliation-2.md` is not intentionally separate.

## 6. Suggested Cross-Link Batch

This can happen before merging because it reduces duplicate navigation pain with lower risk.

- Link `docs/system-design/basic-concepts.md` to canonical Event Loop, Browser Rendering Pipeline, XSS, JWT/CSRF, and Security Headers pages.
- Link `docs/web-development/important/quick-questions.md` to Event Loop and Browser Rendering Pipeline.
- Link `docs/web-development/javascript/asynchronous-javascript.md` to Event Loop.
- Link `docs/web-development/javascript/javascript-under-the-hood/url-in-browser.md` to Browser Rendering Pipeline.
- Link `docs/web-development/important/performance/core-web-vitals.md` to Browser Rendering Pipeline and React Performance.
- Link `docs/web-development/react-js/react-hooks.md` to React Performance for `useMemo` and `useCallback` optimization guidance.
- Link `docs/web-development/react-js/rendering-components.md` to React Under The Hood, React Fiber, and Reconciliation.
- Link `docs/web-development/important/security/owasp.md` to XSS, JWT/CSRF, Security Headers, and iFrame Protection.
- Link `docs/web-development/node-js/chatgpt-node.md` and `docs/web-development/next-js/chatgpt-next.md` to JWT/CSRF for browser token-storage tradeoffs.
- Link company prep pages to canonical topic pages without removing company-specific interview prompts.

## 7. Items To Leave Untouched For Now

- DSA pages for these topics: no meaningful duplicate ownership detected in the requested topic scan.
- System Design interview-question pages where concepts are applied to a specific design, such as Autocomplete debounce/cache tradeoffs.
- Company pages as raw prep notes, unless a later task explicitly turns them into structured playbooks.
- Node.js Event Loop sections, because they are Node-specific and should not be merged into the browser JavaScript Event Loop page.
- Next.js caching sections, because framework-specific cache behavior should remain in Next.js docs.
- React Architecture microfrontend content, until the user decides whether `docs/web-development/important/micro-frontends.md` should be filled as the canonical page.
- REST/GraphQL/API Layer and Caching/CDN broad consolidation, until a future canonical page decision is approved.

## 8. Build Result

Command:

```bash
npm run build
```

Result:

- Pass
- Docusaurus generated static files in `build`.

Warning:

- Docusaurus update check could not access `/Users/akhileshbamhore/.config`.
- This warning did not fail the build and is unrelated to this planning document.

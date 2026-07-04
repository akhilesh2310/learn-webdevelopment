# Knowledge Refactor Audit

Date: 2026-07-04

Scope: active documentation under `docs/` only.

This is an audit and recommendation report. No documentation content, files, sidebars, or source notes were modified.

## 1. Executive Summary

The migrated knowledge base is usable and builds successfully, but it still carries migration artifacts from Google Docs export:

- Several topics have duplicate or near-duplicate explanations across Web Development and System Design.
- Many pages use multiple H1 headings where lower-level headings would render and scan better.
- Some pages are placeholder/TODO-only and should be reviewed before content improvement starts.
- A few category index pages contain substantial topic content and may be better as real child pages or overview pages.
- Some large pages are useful but too broad for quick interview revision.
- Cross-linking is currently underdeveloped; related pages often repeat explanations instead of pointing to a canonical topic.

Highest-value cleanup before content enhancement:

1. Decide canonical pages for repeated core concepts such as Event Loop, Render Tree, Browser Rendering Pipeline, React Fiber, React Performance, XSS, JWT/CSRF, TypeScript basics, and Micro Frontends.
2. Fix Markdown structure issues, especially repeated H1 headings.
3. Review TODO-only pages and decide whether to fill, hide, merge, or keep as placeholders.
4. Add internal links after canonical pages are approved.

## 2. High Priority Issues

| Issue | Files involved | Why it matters | Recommended next action |
|---|---|---|---|
| Exact duplicate Event Loop and Render Tree content | `docs/system-design/basic-concepts.md`, `docs/web-development/important/quick-questions.md`, `docs/web-development/javascript/javascript-under-the-hood/index.md` | Same long explanations appear in multiple places, making updates hard | Keep canonical explanation in JavaScript pages; convert the others to short summaries with cross-links later |
| React internals overlap | `docs/web-development/react-js/core-concept-internals.md`, `docs/web-development/react-js/react-under-the-hood.md`, `docs/web-development/react-js/rendering-components.md`, `docs/web-development/react-js/fundamentals/react-fiber.md`, `docs/web-development/react-js/fundamentals/reconciliation-1.md`, `docs/web-development/react-js/fundamentals/reconciliation-2.md` | Fiber, reconciliation, render phase, and commit phase repeat across many pages | Choose canonical React internals pages and cross-link from fundamentals/interview pages |
| React performance content spread across multiple sections | `docs/web-development/important/performance/react-performance.md`, `docs/web-development/react-js/fundamentals/index.md`, `docs/web-development/react-js/fundamentals/reconciliation-1.md`, `docs/web-development/companies/agoda/index.md`, `docs/web-development/companies/adobe.md` | Performance answers appear as general notes, company prep, and React fundamentals | Use `react-performance.md` as canonical for optimization; keep company pages as interview prompts |
| Security topic overlap | `docs/web-development/important/security/index.md`, `docs/web-development/important/security/owasp.md`, `docs/web-development/important/security/xss-cross-site-scripting.md`, `docs/web-development/important/security/jwt-csrf.md`, `docs/web-development/important/security/security-headers.md`, `docs/web-development/important/security/react-security.md`, `docs/system-design/basic-concepts.md`, `docs/web-development/node-js/chatgpt-node.md` | XSS, JWT, CORS, CSRF, and headers are scattered | Keep detailed frontend security pages canonical; link from Node/System Design/company pages |
| TypeScript basics repeated | `docs/web-development/typescript/index.md`, `docs/web-development/typescript/chatgpt-notes.md`, `docs/web-development/typescript/ts-concepts.md`, `docs/web-development/typescript/code.md` | TypeScript pages overlap heavily and create unclear ownership | Decide whether `ts-concepts.md` or `chatgpt-notes.md` owns concept explanations |
| Multiple H1 headings | 58 pages detected | Docusaurus pages should generally have one H1; repeated H1s hurt page outline and table of contents | Formatting-only cleanup batch |
| TODO/empty pages | 17 very small pages detected | Empty visible pages reduce trust and revision usefulness | Decide fill vs keep hidden vs merge later |
| Code fences missing language tags | `docs/dsa/recently-asked.md`, `docs/dsa/toll-increase.md` | Syntax highlighting and readability suffer | Add language tags in a formatting-only batch |

## 3. Duplicate Content Findings

| Topic | Files involved | Duplication type | Recommended canonical page | Suggested action | Confidence |
|---|---|---|---|---|---|
| JavaScript Event Loop | `docs/system-design/basic-concepts.md`; `docs/web-development/important/quick-questions.md`; `docs/web-development/javascript/javascript-under-the-hood/index.md`; related: `docs/web-development/javascript/event-loop.md`, `docs/web-development/javascript/asynchronous-javascript.md`, `docs/web-development/node-js/chatgpt-node.md` | Exact duplicate and conceptual overlap | `docs/web-development/javascript/event-loop.md` | Merge detailed browser JS explanation into Event Loop page; keep Node-specific differences in Node.js page; cross-link from quick/system pages | High |
| Render Tree / Browser Rendering | `docs/system-design/basic-concepts.md`; `docs/web-development/important/quick-questions.md`; `docs/web-development/javascript/javascript-under-the-hood/index.md`; `docs/web-development/javascript/javascript-under-the-hood/browser-rendering-pipeline.md`; `docs/web-development/javascript/javascript-under-the-hood/url-in-browser.md` | Exact duplicate and near duplicate | `docs/web-development/javascript/javascript-under-the-hood/browser-rendering-pipeline.md` | Keep detailed pipeline here; link from URL-in-browser, Quick Questions, and System Design Basic Concepts | High |
| Browser performance / Core Web Vitals | `docs/web-development/important/performance/index.md`; `docs/web-development/important/performance/core-web-vitals.md`; `docs/web-development/javascript/javascript-under-the-hood/browser-rendering-pipeline.md`; `docs/web-development/html-css.md` | Conceptual overlap | `docs/web-development/important/performance/core-web-vitals.md` | Keep measurement/metrics canonical in Core Web Vitals; link low-level rendering pipeline from JS Under The Hood | Medium |
| React.memo / useMemo / useCallback | `docs/web-development/important/performance/react-performance.md`; `docs/web-development/react-js/react-hooks.md`; `docs/web-development/react-js/fundamentals/index.md`; `docs/web-development/react-js/fundamentals/reconciliation-1.md`; `docs/web-development/companies/agoda/index.md`; `docs/web-development/companies/adobe.md` | Conceptual overlap | `docs/web-development/important/performance/react-performance.md` | Keep full optimization guidance in React Performance; use hooks/fundamentals pages for API behavior and link back | High |
| React Fiber | `docs/web-development/react-js/fundamentals/react-fiber.md`; `docs/web-development/react-js/core-concept-internals.md`; `docs/web-development/react-js/react-under-the-hood.md`; `docs/web-development/react-js/fundamentals/reconciliation-1.md` | Near duplicate | `docs/web-development/react-js/fundamentals/react-fiber.md` or `docs/web-development/react-js/react-under-the-hood.md` | Needs owner decision: keep Fiber as standalone deep dive or fold into React Under The Hood | Medium |
| React Reconciliation | `docs/web-development/react-js/fundamentals/index.md`; `docs/web-development/react-js/fundamentals/reconciliation-1.md`; `docs/web-development/react-js/fundamentals/reconciliation-2.md`; `docs/web-development/react-js/core-concept-internals.md` | Near duplicate | `docs/web-development/react-js/fundamentals/reconciliation-1.md` | Merge Reconciliation 2 if it is a continuation; link from fundamentals and internals | High |
| Render phase / Commit phase | `docs/web-development/react-js/rendering-components.md`; `docs/web-development/react-js/core-concept-internals.md`; `docs/web-development/react-js/react-under-the-hood.md`; `docs/web-development/react-js/fundamentals/react-fiber.md` | Conceptual overlap | `docs/web-development/react-js/rendering-components.md` | Keep user-facing render lifecycle here; link internal scheduler details to React Under The Hood | Medium |
| XSS | `docs/web-development/important/security/xss-cross-site-scripting.md`; `docs/web-development/important/security/owasp.md`; `docs/web-development/important/security/react-security.md`; `docs/web-development/important/security/security-headers.md`; `docs/web-development/javascript/browser-apis-dom.md`; `docs/system-design/basic-concepts.md` | Near duplicate and conceptual overlap | `docs/web-development/important/security/xss-cross-site-scripting.md` | Keep XSS canonical here; link from OWASP, React Security, Browser APIs, and System Design | High |
| JWT / CSRF / token storage | `docs/web-development/important/security/jwt-csrf.md`; `docs/web-development/important/security/index.md`; `docs/web-development/important/security/xss-cross-site-scripting.md`; `docs/web-development/node-js/chatgpt-node.md`; `docs/web-development/next-js/chatgpt-next.md` | Conceptual overlap | `docs/web-development/important/security/jwt-csrf.md` | Keep frontend auth storage tradeoffs here; Node/Next pages should link for browser security context | High |
| Security headers / iFrame / Clickjacking | `docs/web-development/important/security/security-headers.md`; `docs/web-development/important/security/iframe-protection.md`; `docs/web-development/important/security/owasp.md`; `docs/system-design/basic-concepts.md` | Conceptual overlap | `docs/web-development/important/security/security-headers.md` plus `iframe-protection.md` | Keep headers overview canonical; keep iframe-specific deep dive separate with reciprocal links | Medium |
| Testing | `docs/web-development/important/testing/index.md`; `docs/web-development/important/testing/react-testing.md`; `docs/web-development/react-js/react-architecture.md`; company pages | Conceptual overlap | `docs/web-development/important/testing/index.md` | Keep general testing strategy canonical; React Testing owns React-specific examples | Medium |
| Micro Frontends | `docs/web-development/important/micro-frontends.md`; `docs/web-development/react-js/react-architecture.md`; `docs/web-development/next-js/index.md`; company/system-design prep pages | Placeholder plus conceptual overlap | `docs/web-development/react-js/react-architecture.md` temporarily; later `docs/web-development/important/micro-frontends.md` if filled | Decide whether Micro Frontends deserves a real direct canonical page | Medium |
| REST / GraphQL / API layer | `docs/system-design/interview-pattern.md`; `docs/web-development/next-js/index.md`; `docs/web-development/next-js/chatgpt-next.md`; `docs/web-development/react-js/state-management.md`; company pages | Conceptual overlap | No current clear canonical page | Create no page yet; recommend canonical section decision before adding more content | Low |
| Caching / CDN | `docs/system-design/interview-pattern.md`; `docs/system-design/system-design-questions/autocomplete.md`; `docs/web-development/next-js/index.md`; `docs/web-development/next-js/chatgpt-next.md`; `docs/web-development/react-js/state-management.md`; `docs/web-development/important/performance/core-web-vitals.md` | Conceptual overlap | No single current canonical page | Keep domain-specific caching for now; later decide on Web Caching canonical page | Medium |
| Debounce / Throttle / Memoization code | `docs/web-development/javascript/advanced-js.md`; `docs/web-development/javascript/javascript-coding-questions.md`; `docs/web-development/companies/agoda/screening-round.md` | Repeated code/concept | `docs/web-development/javascript/advanced-js.md` for concept; `javascript-coding-questions.md` for implementation | Keep both but cross-link; avoid copying full implementations into company pages | Medium |

## 4. Category and Structure Recommendations

| Current structure | Suggested structure | Reason | Approval required |
|---|---|---|---|
| `docs/web-development/important/quick-questions.md` contains broad JS/browser/system questions | Keep as interview index with links to canonical pages | It currently duplicates Event Loop and Render Tree explanations | Yes |
| `docs/system-design/basic-concepts.md` contains browser/JS fundamentals | Keep only system-design-facing summary and link to Web Development canonical docs | Basic Concepts is becoming a second frontend fundamentals page | Yes |
| `docs/web-development/javascript/javascript-under-the-hood/index.md` contains substantial topic content | Convert to true overview/index and move detailed sections to child pages, or keep as canonical overview | It duplicates `browser-rendering-pipeline.md` and quick/system pages | Yes |
| `docs/web-development/important/security/index.md` contains real security content | Decide whether it is an overview page or merge its detailed content into child security pages | Current index overlaps with XSS/JWT/headers pages | Yes |
| `docs/web-development/important/performance/index.md` contains real performance content | Keep as overview and link to Core Web Vitals / React Performance / Browser Rendering | Avoid index page becoming an unstructured catch-all | Yes |
| `docs/web-development/typescript/` has `index`, `chatgpt-notes`, `ts-concepts`, `code` | Define ownership: overview, interview notes, concepts, examples | Current concepts appear in several pages | Yes |
| `docs/web-development/react-js/fundamentals/` plus React internals pages | Clarify fundamentals vs internals boundaries | React Fiber/Reconciliation appears in both | Yes |
| `docs/web-development/next-js/index.md` and `chatgpt-next.md` | Keep `index.md` as outline/overview and `chatgpt-next.md` as interview Q&A, or rename later | Current title `ChatGPT Next` is not ideal for long-term docs | Yes |
| `docs/web-development/node-js/chatgpt-node.md` | Rename later to an interview Q&A title | Current title exposes source/tool naming rather than topic intent | Yes |
| Company pages | Keep as company-specific prep, not canonical technical knowledge | They are useful but should link to canonical topic pages | No for links, yes for content moves |
| TODO-only system design question pages | Decide fill vs keep as visible TODO pages | Empty pages reduce revision quality | Yes |

## 5. Canonical Topic Map Recommendations

Topic: Event Loop  
Canonical page: `docs/web-development/javascript/event-loop.md`  
Related pages: `docs/web-development/javascript/asynchronous-javascript.md`, `docs/web-development/javascript/interview-q-a/quick-q-a-js.md`, `docs/web-development/javascript/javascript-under-the-hood/index.md`, `docs/web-development/important/quick-questions.md`, `docs/system-design/basic-concepts.md`, `docs/web-development/node-js/chatgpt-node.md`  
Recommended action: Keep browser JavaScript event loop in Event Loop; keep Node-specific event loop details in Node.js and cross-link.  
Reason: Event Loop is a core JS topic and appears in multiple places.

Topic: Browser Rendering Pipeline  
Canonical page: `docs/web-development/javascript/javascript-under-the-hood/browser-rendering-pipeline.md`  
Related pages: `docs/web-development/javascript/javascript-under-the-hood/url-in-browser.md`, `docs/web-development/important/performance/core-web-vitals.md`, `docs/web-development/important/quick-questions.md`, `docs/system-design/basic-concepts.md`  
Recommended action: Keep low-level rendering mechanics canonical here; link from performance and quick questions.  
Reason: Rendering mechanics and performance metrics are related but should not duplicate each other.

Topic: React Performance  
Canonical page: `docs/web-development/important/performance/react-performance.md`  
Related pages: `docs/web-development/react-js/react-hooks.md`, `docs/web-development/react-js/fundamentals/index.md`, `docs/web-development/react-js/fundamentals/reconciliation-1.md`, `docs/web-development/react-js/react-architecture.md`  
Recommended action: Keep optimization strategy here; link API-specific pages to this page.  
Reason: React.memo/useMemo/useCallback guidance belongs in one optimization guide.

Topic: React Fiber and Reconciliation  
Canonical page: `docs/web-development/react-js/fundamentals/reconciliation-1.md` and/or `docs/web-development/react-js/fundamentals/react-fiber.md`  
Related pages: `docs/web-development/react-js/core-concept-internals.md`, `docs/web-development/react-js/react-under-the-hood.md`, `docs/web-development/react-js/rendering-components.md`  
Recommended action: Manual decision required: either maintain separate Fiber/Reconciliation deep dives or merge into React Under The Hood.  
Reason: Multiple current pages explain the same internal pipeline at different depths.

Topic: XSS  
Canonical page: `docs/web-development/important/security/xss-cross-site-scripting.md`  
Related pages: `docs/web-development/important/security/owasp.md`, `docs/web-development/important/security/react-security.md`, `docs/web-development/javascript/browser-apis-dom.md`, `docs/system-design/basic-concepts.md`  
Recommended action: Keep XSS canonical and cross-link where XSS is mentioned.  
Reason: XSS is a repeated security concept with a clear existing deep-dive page.

Topic: JWT and CSRF  
Canonical page: `docs/web-development/important/security/jwt-csrf.md`  
Related pages: `docs/web-development/node-js/chatgpt-node.md`, `docs/web-development/next-js/chatgpt-next.md`, `docs/web-development/important/security/index.md`, `docs/web-development/important/security/xss-cross-site-scripting.md`  
Recommended action: Keep browser token storage and CSRF tradeoffs canonical here.  
Reason: The strongest frontend-focused auth/security explanation is already here.

Topic: TypeScript Concepts  
Canonical page: `docs/web-development/typescript/ts-concepts.md`  
Related pages: `docs/web-development/typescript/index.md`, `docs/web-development/typescript/chatgpt-notes.md`, `docs/web-development/typescript/code.md`  
Recommended action: Keep concepts in TS Concepts, examples in Code, and make index a lightweight outline.  
Reason: Current pages repeat headings such as type inference, function annotations, optional parameters, and rest parameters.

Topic: Micro Frontends  
Canonical page: undecided; candidate `docs/web-development/important/micro-frontends.md` after it is filled  
Related pages: `docs/web-development/react-js/react-architecture.md`, `docs/web-development/next-js/index.md`, company prep pages  
Recommended action: If Micro Frontends remains an Important topic, fill that page and link architecture/company sections to it.  
Reason: The visible canonical page is currently TODO-only while meaningful content exists elsewhere.

## 6. Formatting Issues

Summary metrics from `docs/`:

- Markdown files scanned: 131
- Missing frontmatter: 0
- Pages with multiple H1 headings: 58
- Very small/TODO-style pages: 17
- Pages larger than 60,000 characters: 1
- Code fences missing language tags: 6

Representative Markdown structure issues:

- `docs/web-development/important/accessibility.md`: 22 H1 headings; many should likely be H2/H3.
- `docs/web-development/important/performance/react-performance.md`: 36 H1 headings; repeated sections such as React Performance Optimization and memoization topics.
- `docs/web-development/javascript/arrays-collections.md`: 41 H1 headings; likely exported headings should become H2/H3.
- `docs/web-development/javascript/asynchronous-javascript.md`: 30 H1 headings.
- `docs/web-development/javascript/browser-apis-dom.md`: 31 H1 headings.
- `docs/web-development/javascript/javascript-under-the-hood/garbage-collector-internals.md`: 33 H1 headings.
- `docs/web-development/react-js/react-hooks.md`: 28 H1 headings.
- `docs/web-development/react-js/state-management.md`: 30 H1 headings.
- `docs/web-development/typescript/chatgpt-notes.md`: 23 H1 headings.
- `docs/web-development/typescript/ts-concepts.md`: 25 H1 headings.
- `docs/web-development/angular.md`: only one H1, but it is the only page over 60,000 characters and may be hard to revise quickly.

TODO or very small pages requiring manual review:

- `docs/dsa/concepts.md`
- `docs/intro.md`
- `docs/system-design/system-design-questions/airbnb.md`
- `docs/system-design/system-design-questions/airline-management-system.md`
- `docs/system-design/system-design-questions/bookmyshow.md`
- `docs/system-design/system-design-questions/google-drive-dropbox.md`
- `docs/system-design/system-design-questions/google-maps.md`
- `docs/system-design/system-design-questions/google-sheets.md`
- `docs/system-design/system-design-questions/traffic-control-system.md`
- `docs/system-design/system-design-questions/twitter.md`
- `docs/system-design/system-design-questions/uber-ola.md`
- `docs/system-design/system-design-questions/url-shortening-service.md`
- `docs/system-design/system-design-questions/web-crawler.md`
- `docs/system-design/system-design-questions/whatsapp-messenger.md`
- `docs/system-design/system-design-questions/youtube.md`
- `docs/web-development/important/micro-frontends.md`
- `docs/web-development/javascript/temporal-new.md`

Docusaurus rendering risks:

- Multiple H1s create noisy table-of-contents and page outline.
- Some headings contain escaped export artifacts such as `# **...**` and blank `# ` headings.
- Some pages contain raw HTML image examples with broken local paths; this was already captured in `image-cleanup-audit.md`.

## 7. Code Snippet Formatting Issues

Detected code fences missing language tags:

- `docs/dsa/recently-asked.md:35`
- `docs/dsa/recently-asked.md:60`
- `docs/dsa/recently-asked.md:94`
- `docs/dsa/recently-asked.md:143`
- `docs/dsa/recently-asked.md:199`
- `docs/dsa/toll-increase.md:211`

Recommended future action:

- Add language tags only in a formatting batch, without changing code content.
- Likely tags: `js` or `javascript` for DSA implementation snippets; `text` if the block is explanation/output.
- Consider normalizing inline-code-heavy exported snippets in DSA and System Design, but only after preserving the original meaning.

## 8. Cross-linking Recommendations

Suggested internal links to add later:

- From `docs/web-development/javascript/asynchronous-javascript.md` to `docs/web-development/javascript/event-loop.md`.
- From `docs/web-development/javascript/interview-q-a/quick-q-a-js.md` to `docs/web-development/javascript/event-loop.md`.
- From `docs/web-development/important/quick-questions.md` to canonical Event Loop, Browser Rendering Pipeline, and JS Engine pages.
- From `docs/system-design/basic-concepts.md` to Web Development canonical pages for Event Loop, Render Tree, V8, and frontend security.
- From `docs/web-development/important/performance/core-web-vitals.md` to `docs/web-development/javascript/javascript-under-the-hood/browser-rendering-pipeline.md`.
- From `docs/web-development/javascript/javascript-under-the-hood/url-in-browser.md` to Browser Rendering Pipeline.
- From `docs/web-development/react-js/react-hooks.md` to React Performance for `useMemo` and `useCallback` performance guidance.
- From `docs/web-development/react-js/fundamentals/reconciliation-1.md` to React Performance and React Fiber.
- From `docs/web-development/react-js/react-under-the-hood.md` to Fiber, Reconciliation, and Rendering Components.
- From `docs/web-development/important/security/owasp.md` to XSS, JWT/CSRF, Security Headers, and iFrame Protection pages.
- From `docs/web-development/node-js/chatgpt-node.md` and `docs/web-development/next-js/chatgpt-next.md` to JWT/CSRF and CORS/security canonical pages.
- From company pages to canonical topics instead of repeating full explanations.

## 9. Pages Recommended for Merge

These are recommendations only and require approval before any action:

- `docs/web-development/react-js/fundamentals/reconciliation-2.md` into `docs/web-development/react-js/fundamentals/reconciliation-1.md`, if Reconciliation 2 is not intentionally separate.
- Repeated Event Loop sections from `docs/system-design/basic-concepts.md`, `docs/web-development/important/quick-questions.md`, and `docs/web-development/javascript/javascript-under-the-hood/index.md` into `docs/web-development/javascript/event-loop.md`.
- Repeated Render Tree sections from `docs/system-design/basic-concepts.md`, `docs/web-development/important/quick-questions.md`, and `docs/web-development/javascript/javascript-under-the-hood/index.md` into `docs/web-development/javascript/javascript-under-the-hood/browser-rendering-pipeline.md`.
- `docs/web-development/typescript/index.md` concept sections into `docs/web-development/typescript/ts-concepts.md`, leaving index as navigation/overview.
- `docs/web-development/important/security/index.md` detailed sections into specific security child pages, leaving index as overview.

## 10. Pages Recommended for Split

These are candidates for later splitting if the user wants smaller revision pages:

- `docs/web-development/angular.md`: very large page; consider splitting into Angular fundamentals, change detection, RxJS, performance, security, and interview Q&A.
- `docs/web-development/important/performance/react-performance.md`: large and dense; may become Overview, Memoization, Rendering Optimization, Lists/Virtualization, Bundle/Loading, and Staff-level Strategy.
- `docs/web-development/react-js/fundamentals/index.md`: large and contains many subtopics; consider moving fundamentals into child pages or keeping index as overview only.
- `docs/web-development/node-js/chatgpt-node.md`: large interview Q&A; consider splitting into fundamentals, event loop, Express/API, security/auth, performance, testing.
- `docs/web-development/next-js/chatgpt-next.md`: large interview Q&A; consider splitting by routing, rendering, data fetching, caching, auth, deployment, and staff-level Q&A.
- `docs/web-development/typescript/chatgpt-notes.md`: large and overlaps with TS Concepts; consider splitting only after canonical ownership is decided.

## 11. Pages Recommended for Rename

Renames require approval and sidebar updates later:

- `docs/web-development/next-js/chatgpt-next.md` -> suggested title/path like `next-js-interview-qa.md`.
- `docs/web-development/node-js/chatgpt-node.md` -> suggested title/path like `node-js-interview-qa.md`.
- `docs/web-development/typescript/chatgpt-notes.md` -> suggested title/path like `typescript-interview-notes.md`.
- `docs/web-development/react-js/coding.md` -> suggested title/path like `react-coding-interview-questions.md`.
- `docs/web-development/react-js/core-concept-internals.md` -> suggested title/path like `react-internals.md`.
- `docs/web-development/javascript/temporal-new.md` -> suggested title/path like `temporal.md` if content is added.
- `docs/system-design/worked-22nd-aug.md`: confirm whether the intended label is `Worked 22nd Aug` or `Workshop 22nd Aug`.
- `docs/system-design/system-design-questions/whatsapp-messenger.md`: title says `Whatsapp`; consider `WhatsApp` capitalization.
- `docs/system-design/system-design-questions/google-drive-dropbox.md`: title uses `DropBox`; consider `Dropbox`.

## 12. Manual Review Required

- Decide whether TODO-only system design question pages should remain visible in sidebar.
- Decide canonical owner for React Fiber/Reconciliation/React Under The Hood.
- Decide whether `Important > Micro Frontends` should be filled as canonical or removed/merged later.
- Decide whether company pages should stay as raw prep notes or become structured company playbooks.
- Decide whether `Quick Questions` is a real page or should become an interview index linking to canonical pages.
- Decide whether TypeScript should be three pages (`index`, `ts-concepts`, `code`) or keep `chatgpt-notes` as a separate interview page.
- Decide whether generated index pages should contain substantial content or only summaries/links.
- Confirm whether root/context docs should be refreshed because `AI_PROJECT_CONTEXT.md` still contains older reset-state language.

## 13. Suggested Fix Batches

Batch 1: Formatting-only cleanup

- Convert repeated H1 headings to H2/H3.
- Remove blank `# ` headings.
- Add code fence language tags.
- Do not move content.

Batch 2: TODO and placeholder review

- Review TODO-only pages.
- Decide fill, keep, hide, or merge for each.
- Do not delete without approval.

Batch 3: Canonical topic decisions

- Approve canonical owners for Event Loop, Browser Rendering, React Performance, React Internals, Security, TypeScript, Caching, and Micro Frontends.

Batch 4: Cross-link pass

- Add links from overview/interview/company pages to canonical topic pages.
- Keep short summaries where useful.

Batch 5: Merge obvious duplicates

- Merge exact duplicate Event Loop and Render Tree paragraphs.
- Merge or de-duplicate Reconciliation 1/2 after approval.
- Consolidate TypeScript repeated fundamentals.

Batch 6: Structure refinement

- Split very large pages only where the split improves revision and follows approved hierarchy.
- Rename `ChatGPT`-named pages to long-term topic names.

Batch 7: Content quality improvement

- Improve one canonical page at a time.
- Preserve interview questions, examples, and code snippets.

## Build Result

Command:

```bash
npm run build
```

Result:

- Pass
- Docusaurus generated static files in `build`.

Warning:

- Docusaurus update check failed because it could not access `/Users/akhileshbamhore/.config`.
- This warning did not fail the build and is unrelated to this audit.

# Web Development Formatting Report

Date: 2026-07-05

Scope: formatting-only cleanup under `docs/web-development/`.

No documentation content was intentionally deleted, rewritten, moved, or merged. Changes were limited to Markdown rendering cleanup.

## Summary

- Markdown files scanned: 124
- Files updated: 85
- Extra H1 headings converted to H2: 536
- Bold markers removed from headings: 4464
- Export heading anchors removed: 32
- Escaped heading numbers fixed: 1126
- Blank headings removed: 24
- One-cell code tables converted to fenced code blocks: 118
- Extra blank-line groups collapsed: 44

## Files Updated

- `docs/web-development/angular.md` — H1 normalized: 0, heading cleanup: 4, blank headings: 2, code tables: 0, blank-line groups: 17
- `docs/web-development/companies/adobe.md` — H1 normalized: 0, heading cleanup: 96, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/companies/agoda/coding-round-1.md` — H1 normalized: 0, heading cleanup: 7, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/companies/agoda/index.md` — H1 normalized: 1, heading cleanup: 7, blank headings: 2, code tables: 0, blank-line groups: 2
- `docs/web-development/companies/agoda/platform-round-2.md` — H1 normalized: 0, heading cleanup: 21, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/html-css.md` — H1 normalized: 0, heading cleanup: 0, blank headings: 1, code tables: 0, blank-line groups: 1
- `docs/web-development/important/accessibility.md` — H1 normalized: 0, heading cleanup: 32, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/important/performance/core-web-vitals.md` — H1 normalized: 15, heading cleanup: 92, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/important/performance/generic-web-performance.md` — H1 normalized: 0, heading cleanup: 29, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/important/performance/lighthouse-and-tools.md` — H1 normalized: 0, heading cleanup: 18, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/important/performance/monitoring-observability.md` — H1 normalized: 0, heading cleanup: 2, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/important/performance/react-performance.md` — H1 normalized: 0, heading cleanup: 208, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/important/performance/rendering.md` — H1 normalized: 0, heading cleanup: 34, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/important/quick-questions.md` — H1 normalized: 0, heading cleanup: 22, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/important/security/frontend-security-checklist.md` — H1 normalized: 1, heading cleanup: 25, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/important/security/iframe-protection.md` — H1 normalized: 4, heading cleanup: 25, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/important/security/jwt-csrf.md` — H1 normalized: 0, heading cleanup: 4, blank headings: 0, code tables: 0, blank-line groups: 1
- `docs/web-development/important/security/owasp.md` — H1 normalized: 0, heading cleanup: 45, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/important/security/react-security.md` — H1 normalized: 1, heading cleanup: 7, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/important/security/security-headers.md` — H1 normalized: 1, heading cleanup: 19, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/important/security/xss-cross-site-scripting.md` — H1 normalized: 3, heading cleanup: 33, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/important/solid.md` — H1 normalized: 0, heading cleanup: 6, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/important/testing/index.md` — H1 normalized: 0, heading cleanup: 19, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/important/testing/react-testing.md` — H1 normalized: 1, heading cleanup: 10, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/important/ux-design-system/index.md` — H1 normalized: 7, heading cleanup: 54, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/important/ux-design-system/storybook.md` — H1 normalized: 0, heading cleanup: 30, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/interview-prep-order/chatgpt-checklist.md` — H1 normalized: 1, heading cleanup: 14, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/interview-prep-order/index.md` — H1 normalized: 1, heading cleanup: 4, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/interview-prep-order/phase-wise.md` — H1 normalized: 6, heading cleanup: 39, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/javascript/advanced-js.md` — H1 normalized: 17, heading cleanup: 113, blank headings: 0, code tables: 2, blank-line groups: 0
- `docs/web-development/javascript/arrays-collections.md` — H1 normalized: 0, heading cleanup: 156, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/javascript/asynchronous-javascript.md` — H1 normalized: 0, heading cleanup: 121, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/javascript/browser-apis-dom.md` — H1 normalized: 0, heading cleanup: 173, blank headings: 4, code tables: 0, blank-line groups: 4
- `docs/web-development/javascript/call-bind-apply.md` — H1 normalized: 0, heading cleanup: 19, blank headings: 3, code tables: 9, blank-line groups: 3
- `docs/web-development/javascript/classes-oop.md` — H1 normalized: 14, heading cleanup: 61, blank headings: 0, code tables: 2, blank-line groups: 0
- `docs/web-development/javascript/closures.md` — H1 normalized: 0, heading cleanup: 22, blank headings: 0, code tables: 10, blank-line groups: 0
- `docs/web-development/javascript/design-patterns.md` — H1 normalized: 15, heading cleanup: 89, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/javascript/error-handling.md` — H1 normalized: 18, heading cleanup: 101, blank headings: 1, code tables: 0, blank-line groups: 3
- `docs/web-development/javascript/es6-features.md` — H1 normalized: 21, heading cleanup: 129, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/javascript/event-loop.md` — H1 normalized: 0, heading cleanup: 30, blank headings: 0, code tables: 3, blank-line groups: 0
- `docs/web-development/javascript/execution-context.md` — H1 normalized: 0, heading cleanup: 13, blank headings: 0, code tables: 2, blank-line groups: 0
- `docs/web-development/javascript/functions.md` — H1 normalized: 0, heading cleanup: 49, blank headings: 7, code tables: 15, blank-line groups: 7
- `docs/web-development/javascript/hoisting.md` — H1 normalized: 3, heading cleanup: 38, blank headings: 0, code tables: 16, blank-line groups: 0
- `docs/web-development/javascript/index.md` — H1 normalized: 0, heading cleanup: 0, blank headings: 0, code tables: 1, blank-line groups: 0
- `docs/web-development/javascript/interview-q-a/index.md` — H1 normalized: 0, heading cleanup: 20, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/javascript/interview-q-a/quick-q-a-js.md` — H1 normalized: 0, heading cleanup: 22, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/javascript/javascript-coding-questions.md` — H1 normalized: 18, heading cleanup: 127, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/javascript/javascript-under-the-hood/garbage-collector-internals.md` — H1 normalized: 0, heading cleanup: 34, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/javascript/javascript-under-the-hood/index.md` — H1 normalized: 2, heading cleanup: 6, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/javascript/javascript-under-the-hood/js-engine.md` — H1 normalized: 15, heading cleanup: 65, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/javascript/js-evaluation.md` — H1 normalized: 0, heading cleanup: 9, blank headings: 1, code tables: 0, blank-line groups: 1
- `docs/web-development/javascript/js-fundamentals.md` — H1 normalized: 0, heading cleanup: 41, blank headings: 0, code tables: 15, blank-line groups: 0
- `docs/web-development/javascript/memory-management.md` — H1 normalized: 20, heading cleanup: 137, blank headings: 0, code tables: 0, blank-line groups: 2
- `docs/web-development/javascript/modules.md` — H1 normalized: 23, heading cleanup: 127, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/javascript/objects-prototypes.md` — H1 normalized: 0, heading cleanup: 61, blank headings: 0, code tables: 17, blank-line groups: 0
- `docs/web-development/javascript/scope.md` — H1 normalized: 0, heading cleanup: 10, blank headings: 0, code tables: 3, blank-line groups: 0
- `docs/web-development/javascript/strict-mode.md` — H1 normalized: 0, heading cleanup: 12, blank headings: 1, code tables: 6, blank-line groups: 1
- `docs/web-development/javascript/strings.md` — H1 normalized: 13, heading cleanup: 97, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/javascript/this-keyword.md` — H1 normalized: 0, heading cleanup: 16, blank headings: 0, code tables: 8, blank-line groups: 0
- `docs/web-development/next-js/chatgpt-next.md` — H1 normalized: 3, heading cleanup: 137, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/node-js/chatgpt-node.md` — H1 normalized: 2, heading cleanup: 284, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/react-js/advanced-react-patterns.md` — H1 normalized: 20, heading cleanup: 108, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/react-js/coding.md` — H1 normalized: 1, heading cleanup: 11, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/react-js/component-communication-patterns.md` — H1 normalized: 21, heading cleanup: 105, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/react-js/core-concept-internals.md` — H1 normalized: 23, heading cleanup: 130, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/react-js/error-handling-in-react.md` — H1 normalized: 16, heading cleanup: 78, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/react-js/forms.md` — H1 normalized: 18, heading cleanup: 96, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/react-js/fundamentals/functional-components-vs-class-components.md` — H1 normalized: 12, heading cleanup: 41, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/react-js/fundamentals/index.md` — H1 normalized: 20, heading cleanup: 194, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/react-js/fundamentals/react-fiber.md` — H1 normalized: 1, heading cleanup: 28, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/react-js/fundamentals/react-pipeline.md` — H1 normalized: 19, heading cleanup: 56, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/react-js/fundamentals/reconciliation-1.md` — H1 normalized: 0, heading cleanup: 34, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/react-js/index.md` — H1 normalized: 1, heading cleanup: 1, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/react-js/react-architecture.md` — H1 normalized: 25, heading cleanup: 147, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/react-js/react-hooks.md` — H1 normalized: 0, heading cleanup: 131, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/react-js/react-router.md` — H1 normalized: 23, heading cleanup: 114, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/react-js/react-under-the-hood.md` — H1 normalized: 27, heading cleanup: 139, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/react-js/rendering-components.md` — H1 normalized: 25, heading cleanup: 143, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/react-js/state-management.md` — H1 normalized: 0, heading cleanup: 138, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/typescript/chatgpt-notes.md` — H1 normalized: 0, heading cleanup: 188, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/typescript/code.md` — H1 normalized: 2, heading cleanup: 52, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/typescript/index.md` — H1 normalized: 21, heading cleanup: 177, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/typescript/ts-concepts.md` — H1 normalized: 0, heading cleanup: 145, blank headings: 0, code tables: 0, blank-line groups: 0
- `docs/web-development/web-fundamentals/browser-rendering-pipeline.md` — H1 normalized: 20, heading cleanup: 108, blank headings: 2, code tables: 8, blank-line groups: 2
- `docs/web-development/web-fundamentals/url-in-browser.md` — H1 normalized: 15, heading cleanup: 33, blank headings: 0, code tables: 0, blank-line groups: 0

## Files Skipped

- None intentionally skipped.

## Manual Follow-Up Fixes

- Removed broken Google Docs export TOC links from `docs/web-development/javascript/functions.md`.
- Removed broken Google Docs export TOC links from `docs/web-development/javascript/objects-prototypes.md`.
- Converted one large TypeScript/React examples table in `docs/web-development/typescript/code.md` into a readable `tsx` code block.

## Uncertain Areas

- Multi-line raw code examples that were not in one-cell Markdown tables were left unchanged unless they were already fenced.
- Normal comparison tables were preserved.
- This pass did not rewrite paragraphs, merge duplicates, rename pages, or change sidebar structure.

## Build Result

- Pass.
- Command: `npm run build`
- Note: Docusaurus still prints the local update-check permission warning for `/Users/akhileshbamhore/.config`; it does not fail the build.

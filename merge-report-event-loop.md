# Event Loop Merge Report

Date: 2026-07-04

## 1. Files Updated

- `docs/web-development/javascript/event-loop.md`
- `docs/system-design/basic-concepts.md`
- `docs/web-development/important/quick-questions.md`
- `docs/web-development/javascript/javascript-under-the-hood/index.md`
- `docs/web-development/javascript/asynchronous-javascript.md`
- `.knowledge/knowledge-map.yaml`

## 2. Duplicate Sections Removed/Replaced

- `docs/system-design/basic-concepts.md`
  - Replaced the long duplicate section `6. How Does the JavaScript Event Loop Work?` with a short system-design-facing summary and a link to the canonical Event Loop page.
- `docs/web-development/important/quick-questions.md`
  - Replaced the long duplicate Event Loop explanation, cycle, example, output, and summary with a concise interview answer and a link to the canonical Event Loop page.
- `docs/web-development/javascript/javascript-under-the-hood/index.md`
  - Replaced the long duplicate Event Loop explanation, cycle, example, output, and summary with an under-the-hood overview and a link to the canonical Event Loop page.

## 3. Unique Content Moved Into Canonical Page

- Added the rendering queue note from duplicate overview pages to `docs/web-development/javascript/event-loop.md`.
- Added async/await resume behavior from `docs/web-development/javascript/asynchronous-javascript.md` to the canonical microtask explanation.
- Preserved the runtime-boundary wording that connects browser APIs, runtime APIs, and Node.js APIs.
- Added the concise interview-answer form to the canonical page.

## 4. Content Intentionally Kept In Original Pages

- `docs/web-development/javascript/asynchronous-javascript.md`
  - Kept the microtask vs macrotask Q&A because it supports the async JavaScript interview flow.
  - Added only a local link to the canonical Event Loop page.
- `docs/web-development/node-js/chatgpt-node.md`
  - Left unchanged.
  - Node.js-specific phases, libuv behavior, `process.nextTick`, `setImmediate`, event loop lag, and worker-thread guidance remain in the Node.js page.
- `docs/system-design/basic-concepts.md`
  - Kept the broader synchronous vs asynchronous JavaScript context and Node.js under-the-hood bullets.
- `docs/web-development/important/quick-questions.md`
  - Kept the quick-question structure.
- `docs/web-development/javascript/javascript-under-the-hood/index.md`
  - Kept the page as an under-the-hood overview.

## 5. TODO/Manual Review Items

- None added.

## 6. Build Result

- Pass.
- Command: `npm run build`
- Docusaurus generated static files in `build`.
- Warning: Docusaurus update check could not access `/Users/akhileshbamhore/.config`; this did not fail the build and is unrelated to the merge.

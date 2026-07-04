# Event Loop Merge Plan

Date: 2026-07-04

Scope: planning only for the Event Loop canonical topic.

No documentation content, sidebars, source notes, or existing docs were modified while creating this plan.

## 1. Summary

The canonical Event Loop page is `docs/web-development/javascript/event-loop.md`.

The strongest duplicate content appears in:

- `docs/system-design/basic-concepts.md`
- `docs/web-development/important/quick-questions.md`
- `docs/web-development/javascript/javascript-under-the-hood/index.md`

These three pages contain nearly the same browser JavaScript Event Loop explanation: definition, why the event loop is needed, call stack, Web APIs, callback/task queue, microtask queue, rendering queue, cycle, simple `setTimeout` plus `Promise` example, output, and summary.

The canonical page already contains a fuller browser JavaScript Event Loop explanation, including:

- runtime components
- call stack
- Web APIs
- microtask queue
- macrotask queue
- microtask priority
- browser vs Node.js comparison
- interview execution puzzles
- microtask starvation example
- runtime map image
- 60-second summary
- quick self-test

The safest future merge is:

1. Preserve and consolidate browser JavaScript Event Loop knowledge in `docs/web-development/javascript/event-loop.md`.
2. Replace repeated Event Loop sections in non-canonical pages with short context-specific summaries and links.
3. Keep `docs/web-development/javascript/asynchronous-javascript.md` focused on async patterns, promises, async/await, fetch, and promise APIs.
4. Keep `docs/web-development/node-js/chatgpt-node.md` as the owner for Node.js-specific event loop details, including libuv phases, `process.nextTick`, `setImmediate`, event loop lag, and worker-thread guidance.

## 2. Files Compared

| File | Role in merge | Notes |
|---|---|---|
| `docs/web-development/javascript/event-loop.md` | Canonical page | Full browser JavaScript Event Loop owner. |
| `docs/system-design/basic-concepts.md` | Duplicate/overview page | Contains repeated browser Event Loop explanation inside a broad system-design/basic-concepts page. |
| `docs/web-development/important/quick-questions.md` | Duplicate/interview overview page | Contains nearly the same Event Loop explanation as System Design Basic Concepts. |
| `docs/web-development/javascript/javascript-under-the-hood/index.md` | Duplicate/category overview page | Contains nearly the same Event Loop explanation as System Design Basic Concepts and Quick Questions. |
| `docs/web-development/javascript/asynchronous-javascript.md` | Related async page | Contains async/promise concepts and a microtask/macrotask Q&A. Mostly keep in place. |
| `docs/web-development/node-js/chatgpt-node.md` | Node-specific page | Contains Node.js event loop phases, libuv/thread pool, `process.nextTick`, `setImmediate`, event loop lag, and worker-thread guidance. Do not merge into browser Event Loop. |

## 3. Canonical Page Current State

Current canonical page: `docs/web-development/javascript/event-loop.md`

Current strengths:

- Defines Event Loop as a core engine/runtime mechanism for non-blocking async behavior.
- Explains single-threaded JavaScript.
- Explains runtime layout: call stack, Web APIs, microtask queue, macrotask queue.
- Explains the event loop check cycle.
- Explicitly states that microtasks have priority over macrotasks.
- Includes a microtask vs macrotask comparison table.
- Mentions browser vs Node.js differences without going deep into Node-specific phases.
- Includes interview-style execution-order puzzles:
  - `setTimeout` vs `Promise`
  - Promise constructor synchronous trap
  - recursive microtask starvation
- Includes a runtime map image.
- Includes a revision summary and quick self-test.

Current weaknesses to address during a later merge:

- Some code examples are represented as table-like exported text instead of fenced code blocks.
- There are blank exported headings (`###`) that should be cleaned in a formatting pass, not as part of semantic merge.
- The browser rendering relationship is present but could be kept concise because detailed rendering belongs to Browser Rendering Pipeline.
- It mentions Node.js at a high level, but Node-specific details should stay in Node.js docs.

## 4. Duplicate Content Found

| Source file | Duplicate section/heading | Duplicate type | Recommended action |
|---|---|---|---|
| `docs/system-design/basic-concepts.md` | `5. What is the Difference Between Synchronous and Asynchronous JavaScript?` | Near duplicate/context intro | Keep one short system-design-facing sentence. Link to canonical Event Loop and Async JavaScript. |
| `docs/system-design/basic-concepts.md` | `6. How Does the JavaScript Event Loop Work?` through `Summary` | Near-exact duplicate of Quick Questions and JavaScript Under The Hood Event Loop section | Replace later with short summary plus link to `docs/web-development/javascript/event-loop.md`. |
| `docs/system-design/basic-concepts.md` | Event Loop code example with `Start`, `End`, `Promise callback`, `Timeout callback` | Duplicate example | Preserve once in canonical Event Loop page. Remove or replace from System Design only after canonical page has equivalent example. |
| `docs/web-development/important/quick-questions.md` | `5. What is the Difference Between Synchronous and Asynchronous JavaScript?` | Near duplicate/context intro | Keep short quick-question version or link to Async JavaScript and Event Loop. |
| `docs/web-development/important/quick-questions.md` | `6. How Does the JavaScript Event Loop Work?` through `Summary` | Near-exact duplicate of System Design Basic Concepts and JavaScript Under The Hood Event Loop section | Replace later with short interview summary plus link to canonical Event Loop. |
| `docs/web-development/important/quick-questions.md` | Event Loop code example with `Start`, `End`, `Promise callback`, `Timeout callback` | Duplicate example | Preserve once in canonical Event Loop page. Quick Questions can keep a one-line prompt and link. |
| `docs/web-development/javascript/javascript-under-the-hood/index.md` | `5. What is the Difference Between Synchronous and Asynchronous JavaScript?` | Near duplicate/context intro | Keep only if this index remains a broad overview. Otherwise link to Async JavaScript and Event Loop. |
| `docs/web-development/javascript/javascript-under-the-hood/index.md` | `6. How Does the JavaScript Event Loop Work?` through `Summary` | Near-exact duplicate of System Design Basic Concepts and Quick Questions | Replace later with short overview plus link to canonical Event Loop. |
| `docs/web-development/javascript/asynchronous-javascript.md` | `10. What is the difference between microtask and macrotask?` | Conceptual overlap, not full duplicate | Keep in Async JavaScript because it supports promise/async interview flow. Add or keep link to canonical Event Loop. |
| `docs/web-development/node-js/chatgpt-node.md` | `What is the Event Loop in Node.js?` | Related concept, not duplicate | Do not merge into browser Event Loop. Keep Node-specific content in place. |

## 5. Unique Content To Move Into Canonical Page

| Source file | Unique content summary | Recommended destination section in canonical page | Reason |
|---|---|---|---|
| `docs/system-design/basic-concepts.md` | Simple `Rendering Queue` explanation: browser may update UI before processing more tasks. | Browser Rendering and Event Loop section | Canonical page mentions browser/rendering, but this simple wording may be useful if not already covered clearly. |
| `docs/system-design/basic-concepts.md` | Simple `callback queue` terminology alongside `task queue`. | Task Queue / Macrotask Queue section | Helps readers map older interview wording to modern terminology. |
| `docs/web-development/important/quick-questions.md` | Quick-question framing around Event Loop as an interview answer. | Interview Answer / Quick Summary section | Canonical page has puzzles and summary, but can preserve concise quick-answer form. |
| `docs/web-development/javascript/javascript-under-the-hood/index.md` | Under-the-hood context connecting Event Loop to V8, Web APIs, browser APIs, and Node APIs. | JavaScript Runtime Environment section | Useful context if the canonical page should explain runtime boundaries clearly. |
| `docs/web-development/javascript/asynchronous-javascript.md` | `await` resumes through the microtask queue. | Microtasks section or Async/Await and Microtasks subsection | This is useful browser JS Event Loop knowledge and should be represented in canonical page if not already explicit. |
| `docs/web-development/javascript/asynchronous-javascript.md` | Microtask/macrotask example with output `1, 4, 3, 2`. | Execution Order Examples section | Canonical page already has similar puzzles; preserve this example if it adds clarity or replace with an equivalent already present. |

## 6. Content To Keep In Original Pages

| Source file | Content to keep | Reason |
|---|---|---|
| `docs/system-design/basic-concepts.md` | Short mention that JavaScript async behavior uses the Event Loop and queues. | System Design Basic Concepts can retain broad interview context without owning full explanation. |
| `docs/system-design/basic-concepts.md` | Node.js under-the-hood bullet: V8, libuv, its own event loop, C++ bindings. | This is a broad system-design/basic-concepts note and should not become a full Event Loop explanation. |
| `docs/web-development/important/quick-questions.md` | A quick interview prompt for Event Loop. | Quick Questions should remain useful as an interview index/prompt page. |
| `docs/web-development/javascript/javascript-under-the-hood/index.md` | High-level runtime overview linking JavaScript engine, Web APIs, and Event Loop. | The index can keep overview-level context if it is later converted to a true category overview. |
| `docs/web-development/javascript/asynchronous-javascript.md` | Synchronous vs asynchronous explanation, callbacks, callback hell, promises, promise chaining, error handling, Promise APIs, async/await, fetch, AbortController, async interview Q&A. | These are broader async JavaScript topics, not duplicate Event Loop content. |
| `docs/web-development/javascript/asynchronous-javascript.md` | Microtask vs macrotask Q&A, if kept concise and linked to canonical Event Loop. | It supports async interview prep and promise behavior. |
| `docs/web-development/node-js/chatgpt-node.md` | Node.js single-threaded explanation with libuv/thread pool. | Node-specific runtime behavior belongs in Node.js. |
| `docs/web-development/node-js/chatgpt-node.md` | Node.js event loop phases: timers, pending callbacks, idle/prepare, poll, check, close callbacks. | Node-specific and should not be merged into browser JavaScript Event Loop. |
| `docs/web-development/node-js/chatgpt-node.md` | `setTimeout`, `setImmediate`, `process.nextTick`, Promise callback ordering. | Node-specific interview material. |
| `docs/web-development/node-js/chatgpt-node.md` | Event loop lag, CPU-heavy work, Worker Threads. | Node.js production/server performance topic. |

## 7. Content To Replace With Summary + Link

| Source file | Existing section | Suggested short replacement summary | Link target |
|---|---|---|---|
| `docs/system-design/basic-concepts.md` | `6. How Does the JavaScript Event Loop Work?` | JavaScript handles asynchronous browser work through the call stack, runtime APIs, task queues, microtask queue, and the Event Loop. For the full browser JavaScript explanation and execution-order examples, see Event Loop. | `../web-development/javascript/event-loop.md` |
| `docs/system-design/basic-concepts.md` | Event Loop code example and output | Keep only if the page needs a tiny example; otherwise replace with one sentence that Promise callbacks run before `setTimeout` callbacks because microtasks are drained before macrotasks. | `../web-development/javascript/event-loop.md` |
| `docs/web-development/important/quick-questions.md` | `6. How Does the JavaScript Event Loop Work?` | The Event Loop lets single-threaded JavaScript run async callbacks after synchronous code finishes, with microtasks such as Promise callbacks running before macrotasks such as `setTimeout`. Full explanation: Event Loop. | `../javascript/event-loop.md` |
| `docs/web-development/important/quick-questions.md` | Event Loop code example and output | Replace with a short interview prompt plus link, unless this page intentionally keeps quick examples. | `../javascript/event-loop.md` |
| `docs/web-development/javascript/javascript-under-the-hood/index.md` | `6. How Does the JavaScript Event Loop Work?` | JavaScript runtime behavior includes the call stack, Web APIs, queues, and Event Loop. Keep this page as an overview and link to the canonical Event Loop page for details. | `../event-loop.md` |
| `docs/web-development/javascript/javascript-under-the-hood/index.md` | Event Loop code example and output | Replace with overview sentence plus link after confirming the canonical page preserves the example. | `../event-loop.md` |
| `docs/web-development/javascript/asynchronous-javascript.md` | `10. What is the difference between microtask and macrotask?` | Optional later reduction: keep a concise Q&A answer and link to Event Loop for full queue ordering details. Do not remove the async-specific explanation entirely. | `event-loop.md` |

## 8. Proposed Canonical Page Outline

Only heading outline. This is not rewritten content.

- Event Loop
- What Is the JavaScript Event Loop?
- Why JavaScript Needs the Event Loop
- JavaScript Runtime Environment
  - Call Stack
  - Web APIs / Runtime APIs
  - Callback Queue / Task Queue / Macrotask Queue
  - Microtask Queue
  - Rendering Queue / Browser Rendering Checkpoint
- Event Loop Execution Rule
  - Run synchronous code
  - Drain microtasks
  - Run one macrotask
  - Repeat
- Microtasks vs Macrotasks
- Async/Await and Microtasks
- Browser Rendering and the Event Loop
- Browser Event Loop vs Node.js Event Loop
  - Browser summary
  - Node.js summary
  - Link to Node.js page for Node-specific phases
- Execution Order Examples
  - `setTimeout` vs `Promise`
  - Promise constructor synchronous trap
  - Microtask starvation
  - Additional simple output example if needed
- Event Loop Runtime Map
- Interview-Ready Summary
- Quick Self-Test
- Related Pages

## 9. Risks

- Accidentally deleting interview examples from non-canonical pages before confirming the canonical page preserves them.
- Mixing Node.js-specific phases into the browser JavaScript Event Loop page.
- Over-shortening `docs/web-development/javascript/asynchronous-javascript.md`, which should remain the owner for promises, async/await, fetch, AbortController, and Promise APIs.
- Leaving too much duplicate content in overview pages after the canonical page is strengthened.
- Changing wording too much during merge and unintentionally improving or rewriting content beyond the approved no-loss cleanup.
- Breaking relative links when replacing long sections with summaries.
- Losing exported images or table-like code snippets from the canonical page during cleanup.

## 10. Exact Apply Steps For Next Prompt

Use these steps only after user approval.

1. Re-read:
   - `AI_PROJECT_CONTEXT.md`
   - `PROJECT_REQUIREMENTS.md`
   - `KNOWLEDGE_ARCHITECTURE.md`
   - `DECISIONS.md`
   - `.github/copilot-instructions.md`
   - `.knowledge/knowledge-rules.yaml`
   - `.knowledge/knowledge-map.yaml`
   - `canonical-topic-decisions.md`
   - `merge-plan-event-loop.md`

2. Open and inspect:
   - `docs/web-development/javascript/event-loop.md`
   - `docs/system-design/basic-concepts.md`
   - `docs/web-development/important/quick-questions.md`
   - `docs/web-development/javascript/javascript-under-the-hood/index.md`
   - `docs/web-development/javascript/asynchronous-javascript.md`
   - `docs/web-development/node-js/chatgpt-node.md`

3. Strengthen the canonical page first:
   - Preserve existing canonical content.
   - Add any unique useful browser Event Loop points from the duplicate pages.
   - Add terminology aliases: callback queue, task queue, macrotask queue.
   - Add or preserve one clear `setTimeout` plus `Promise` execution-order example.
   - Add or preserve async/await microtask note if missing.
   - Keep Node.js comparison short and link to `../node-js/chatgpt-node.md`.

4. Do not merge Node.js-specific details:
   - Do not move Node phases into Event Loop.
   - Do not move `process.nextTick`.
   - Do not move `setImmediate`.
   - Do not move event loop lag.
   - Do not move worker-thread guidance.

5. Replace duplicate sections with short summaries:
   - In `docs/system-design/basic-concepts.md`, replace the long browser Event Loop section with a short system-design-facing summary and existing link.
   - In `docs/web-development/important/quick-questions.md`, replace the long browser Event Loop section with a concise interview prompt and link.
   - In `docs/web-development/javascript/javascript-under-the-hood/index.md`, replace the long browser Event Loop section with an overview sentence and link.

6. Keep context-specific content:
   - Keep broad async content in `docs/web-development/javascript/asynchronous-javascript.md`.
   - Keep Node.js event loop content in `docs/web-development/node-js/chatgpt-node.md`.

7. Validate no-loss preservation:
   - Search for key phrases before and after:
     - `Promise callback`
     - `Timeout callback`
     - `microtask queue`
     - `callback queue`
     - `Rendering Queue`
     - `process.nextTick`
     - `setImmediate`
     - `event loop lag`
   - Confirm browser examples are present in the canonical page.
   - Confirm Node-specific examples remain in Node.js.

8. Update metadata only if needed:
   - Update `.knowledge/knowledge-map.yaml` existing `js-event-loop` notes if the canonical page changes.
   - Do not create large metadata entries.

9. Run:

   ```bash
   npm run build
   ```

10. Report:
   - Files modified
   - Sections replaced with summary and link
   - Unique content moved into canonical page
   - Node.js content preserved
   - Any skipped or uncertain items
   - Build result

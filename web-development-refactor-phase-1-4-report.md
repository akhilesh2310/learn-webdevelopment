# Web Development Refactor Phase 1-4 Report

Date: 2026-07-05

## Summary

Executed the approved Web Development structure refactor phases without touching Angular or HTML & CSS notes.

## Phase 1: Core Engineering

Created a common `Core Engineering` sidebar section using the existing `docs/web-development/important/` path to avoid broken links and large file moves.

Files updated:

- `sidebars.ts`
- `docs/web-development/important/_category_.json`
- `docs/web-development/important/index.md`

Files created:

- `docs/web-development/important/error-handling.md`
- `docs/web-development/important/caching.md`
- `docs/web-development/important/observability.md`
- `docs/web-development/important/frontend-architecture.md`

## Phase 2: Performance

Refactored Performance into a clearer study path while preserving the original checklist-style content.

Files created:

- `docs/web-development/important/performance/generic-web-performance.md`
- `docs/web-development/important/performance/lighthouse-and-tools.md`
- `docs/web-development/important/performance/monitoring-observability.md`
- `docs/web-development/important/performance/nextjs-performance.md`

Files updated:

- `docs/web-development/important/performance/index.md`
- `sidebars.ts`

## Phase 3: Common Engineering Hubs

Added hub pages for shared concerns while keeping tech-specific pages in JavaScript, React, Next.js, and Node.js.

Hub pages:

- Error Handling
- Caching
- Observability
- Frontend Architecture

## Phase 4: Resources

Converted the old `Video Tutorial` page into a broader `Resources` page.

Files moved:

- `docs/web-development/video-tutorial.md` -> `docs/web-development/resources.md`

Files updated:

- `sidebars.ts`

## Assumptions

- Existing `docs/web-development/important/` paths were kept for now to preserve links and avoid unnecessary churn.
- `Core Engineering` is the sidebar label, while the underlying folder remains `important/`.
- Technology-specific content should continue to live in its own section, with common hubs linking to it.

## Build Result

- Pass
- Command: `npm run build`
- Docusaurus generated static files in `build`.
- Warning: Docusaurus update check could not access `/Users/akhileshbamhore/.config`; this did not fail the build.

## Follow-up: Web Fundamentals and Memory Management

Added a compact `Web Fundamentals` sidebar category as the entry point for URL loading, browser rendering, JS engine/runtime, event loop, and browser APIs.

Files created:

- `docs/web-development/web-fundamentals/_category_.json`
- `docs/web-development/web-fundamentals/index.md`
- `docs/web-development/important/memory-management.md`

Files updated:

- `sidebars.ts`
- `docs/web-development/important/index.md`

Assumption:

- Existing canonical pages stay in their current technology folders for now, and `Web Fundamentals` links to them to avoid duplicate content and risky file moves.

Build result:

- Pass
- Command: `npm run build`
- Warning: Docusaurus update check could not access `/Users/akhileshbamhore/.config`; this did not fail the build.

## Follow-up: Duplicate Ownership Cleanup

Moved browser-loading and rendering pages into `Web Fundamentals` so they are no longer duplicated under `JavaScript Under The Hood`.

Files moved:

- `docs/web-development/javascript/javascript-under-the-hood/url-in-browser.md` -> `docs/web-development/web-fundamentals/url-in-browser.md`
- `docs/web-development/javascript/javascript-under-the-hood/browser-rendering-pipeline.md` -> `docs/web-development/web-fundamentals/browser-rendering-pipeline.md`

Files created:

- `docs/web-development/important/code-review-checklist.md`

Files updated:

- `sidebars.ts`
- `docs/web-development/web-fundamentals/index.md`
- `docs/web-development/important/index.md`
- `docs/web-development/important/memory-management.md`
- `docs/web-development/important/quick-questions.md`
- `docs/web-development/important/performance/core-web-vitals.md`
- `docs/web-development/javascript/javascript-under-the-hood/index.md`

Cleanup decisions:

- `Web Fundamentals` now owns URL loading and browser rendering pipeline.
- `JavaScript Under The Hood` now keeps JS engine and garbage collector internals.
- `Core Engineering` index is now a clean navigation hub instead of holding duplicated mixed notes.
- Code review content was preserved in its own page instead of being removed.

Build result:

- Pass
- Command: `npm run build`
- Warning: Docusaurus update check could not access `/Users/akhileshbamhore/.config`; this did not fail the build.

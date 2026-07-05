# React.js Refactor Report

Date: 2026-07-05

## Summary

Completed a no-loss React.js refactor pass focused on reducing repeated study paths across React internals, fundamentals, rendering, hooks, patterns, and architecture pages.

No DSA, System Design, or source-notes files were modified.

## Files Updated

- `sidebars.ts`
- `.knowledge/knowledge-map.yaml`
- `docs/web-development/react-js/index.md`
- `docs/web-development/react-js/fundamentals/index.md`
- `docs/web-development/react-js/fundamentals/reconciliation-1.md`
- `docs/web-development/react-js/fundamentals/reconciliation-2.md`
- `docs/web-development/react-js/react-under-the-hood.md`
- `docs/web-development/react-js/core-concept-internals.md`
- `docs/web-development/react-js/rendering-components.md`
- `docs/web-development/react-js/react-hooks.md`
- `docs/web-development/react-js/state-management.md`
- `docs/web-development/react-js/forms.md`
- `docs/web-development/react-js/component-communication-patterns.md`
- `docs/web-development/react-js/advanced-react-patterns.md`
- `docs/web-development/react-js/error-handling-in-react.md`
- `docs/web-development/react-js/react-router.md`
- `docs/web-development/react-js/react-architecture.md`
- `docs/web-development/react-js/folder-structure.md`
- `docs/web-development/react-js/coding.md`

## Sidebar Changes

React.js sidebar now groups internals more clearly:

- Fundamentals
- Rendering & Internals
- Hooks
- State Management
- Forms
- Component Communication
- Advanced Patterns
- Error Handling
- Router
- Architecture
- Coding

`Reconciliation 2` was removed from the primary sidebar after its useful notes were merged into `React Reconciliation`.

## Duplicate Topics Consolidated

### Reconciliation

Canonical page:

- `docs/web-development/react-js/fundamentals/reconciliation-1.md`

Merged useful notes from:

- `docs/web-development/react-js/fundamentals/reconciliation-2.md`

Preserved unique points:

- where reconciliation fits in React rendering
- reconciliation vs diffing
- parent/child re-render mental model
- relationship between reconciliation and Fiber

`reconciliation-2.md` now points to the canonical page instead of repeating the full topic.

### Fundamentals

Reduced duplicate sections for:

- React Reconciliation
- React Rendering Process
- Why React is Fast

These sections now contain short summaries and links to canonical pages:

- `reconciliation-1.md`
- `rendering-components.md`
- `react-pipeline.md`
- `react-fiber.md`
- `react-under-the-hood.md`
- `docs/web-development/important/performance/react-performance.md`

### Core Concept / Internals

Marked as a legacy combined internals page.

It is preserved for no-loss reference but removed from the primary sidebar study path.

Canonical pages now own focused study:

- React Fiber
- React Reconciliation
- Rendering Components
- React Under The Hood

## Ownership Clarified

- `react-hooks.md`: Hook API usage and examples.
- `react-performance.md`: optimization decisions and memoization tradeoffs.
- `rendering-components.md`: lifecycle, render/commit phase, re-render triggers, cleanup.
- `state-management.md`: state ownership and state-management libraries.
- `advanced-react-patterns.md`: reusable pattern design.
- `component-communication-patterns.md`: communication decisions between components.
- `forms.md`: controlled/uncontrolled forms, validation, libraries, dynamic forms.
- `react-architecture.md`: scalable architecture, monorepos, design systems, micro frontends.

## Content Intentionally Preserved

- `core-concept-internals.md` content was not deleted.
- `reconciliation-2.md` was not deleted; it now points to the merged canonical page.
- All React notes, interview answers, and examples remain available.

## Build Result

Command:

```bash
npm run build
```

Result:

- Pass
- Docusaurus generated static files in `build`.

Warning:

- Docusaurus update check could not access `/Users/akhileshbamhore/.config`.
- This warning did not fail the build.

## Recommended Next Batch

React internals cleanup batch 2:

- Review `react-under-the-hood.md` and `core-concept-internals.md` side by side.
- Move any unique batching/scheduling notes from `core-concept-internals.md` into `react-under-the-hood.md`.
- Then convert `core-concept-internals.md` into a short permanent redirect/overview page or keep it as an archive-style note outside the sidebar.

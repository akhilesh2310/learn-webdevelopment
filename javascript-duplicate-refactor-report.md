# JavaScript Duplicate Refactor Report

Date: 2026-07-05

Scope: `docs/web-development/javascript/` plus sidebar/context updates needed to reduce duplicate JavaScript study paths.

## Summary

This was a no-loss duplicate cleanup pass. Source notes were not modified. No pages were deleted or renamed.

## Files Updated

- `docs/web-development/javascript/advanced-js.md`
- `docs/web-development/javascript/arrays-collections.md`
- `docs/web-development/javascript/closures.md`
- `docs/web-development/javascript/functions.md`
- `docs/web-development/javascript/interview-q-a/quick-q-a-js.md`
- `docs/web-development/javascript/javascript-under-the-hood/index.md`
- `docs/web-development/javascript/js-fundamentals.md`
- `docs/web-development/javascript/objects-prototypes.md`
- `docs/web-development/javascript/scope.md`
- `docs/web-development/web-fundamentals/index.md`
- `sidebars.ts`
- `.knowledge/knowledge-map.yaml`
- `AI_PROJECT_CONTEXT.md`

## Refactors Applied

1. Advanced JS concepts now link to `javascript-coding-questions.md` for reusable debounce, throttle, memoization, and currying implementations.
2. Array method page now links to `javascript-coding-questions.md` for `map`, `filter`, and `reduce` polyfills while keeping unique array/collection notes.
3. JavaScript Under The Hood is now a hub page instead of duplicating Quick Questions and Browser Rendering Pipeline content.
4. Web Fundamentals sidebar no longer repeats JavaScript runtime pages. It links to them from the Web Fundamentals overview instead.
5. JavaScript Quick Q&A no longer contains TypeScript Q&A details. It links to TypeScript canonical pages.
6. JS Fundamentals now keeps variable basics and links to Hoisting and Scope for deeper duplicated material.
7. Scope now owns variable shadowing and the `var` scope trap.
8. Closures now links to Advanced JS and JavaScript Coding Questions for memoization/currying details, and to Hoisting for the `var` loop puzzle.
9. Objects & Prototypes now points class/OOP study to Classes & OOP while keeping prototype/object mechanics in place.

## Canonical Ownership Decisions

- Advanced JS concepts: `docs/web-development/javascript/advanced-js.md`
- JavaScript implementations/polyfills: `docs/web-development/javascript/javascript-coding-questions.md`
- Scope and shadowing: `docs/web-development/javascript/scope.md`
- Hoisting and TDZ puzzles: `docs/web-development/javascript/hoisting.md`
- Practical memory management: `docs/web-development/javascript/memory-management.md`
- GC internals: `docs/web-development/javascript/javascript-under-the-hood/garbage-collector-internals.md`
- Browser rendering pipeline: `docs/web-development/web-fundamentals/browser-rendering-pipeline.md`

## Remaining Duplication To Review Later

- Some short Q&A overlap remains between JavaScript quick revision pages and topic pages. This is acceptable until the Quick Q&A page is converted into a pure index.
- `advanced-js.md` still shows similar iterator output for manual iterators and generators because the examples serve different concepts.
- Broader duplicates remain outside the JavaScript folder, especially React, TypeScript, security, and company prep pages.

## Build Result

Command:

```bash
npm run build
```

Result: Pass.

Note: Docusaurus update check still warns about `/Users/akhileshbamhore/.config`, but it does not fail the build.

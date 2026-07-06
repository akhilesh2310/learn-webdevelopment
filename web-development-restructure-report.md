# Web Development Restructure Report

Date: 2026-07-06

## Summary

Web Development was restructured from the vague `important/` and standalone `node-js/` folders into explicit study sections.

This was a no-loss structure pass:

- Existing notes were moved into clearer canonical locations.
- Angular and HTML & CSS were not changed.
- Source notes were not modified.
- Placeholder pages were added only for approved future sidebar topics.
- Internal links and sidebar references were updated.

## Main Folders Created

- `docs/web-development/core-engineering/`
- `docs/web-development/frontend-architecture/`
- `docs/web-development/performance/`
- `docs/web-development/security-auth/`
- `docs/web-development/testing-quality/`
- `docs/web-development/ux-design-system/`
- `docs/web-development/build-devops-delivery/`
- `docs/web-development/backend-for-frontend-node-js/`

## Main Content Moves

- `docs/web-development/important/index.md` -> `docs/web-development/core-engineering/index.md`
- `docs/web-development/important/error-handling.md` -> `docs/web-development/core-engineering/error-handling.md`
- `docs/web-development/important/caching.md` -> `docs/web-development/core-engineering/caching.md`
- `docs/web-development/important/observability.md` -> `docs/web-development/core-engineering/observability.md`
- `docs/web-development/important/memory-management.md` -> `docs/web-development/core-engineering/memory-management.md`
- `docs/web-development/important/solid.md` -> `docs/web-development/core-engineering/solid.md`
- `docs/web-development/important/code-review-checklist.md` -> `docs/web-development/core-engineering/code-review-checklist.md`
- `docs/web-development/important/quick-questions.md` -> `docs/web-development/core-engineering/quick-questions.md`
- `docs/web-development/important/performance/` -> `docs/web-development/performance/`
- `docs/web-development/important/security/` -> `docs/web-development/security-auth/`
- `docs/web-development/important/testing/` -> `docs/web-development/testing-quality/`
- `docs/web-development/important/ux-design-system/` -> `docs/web-development/ux-design-system/`
- `docs/web-development/important/accessibility.md` -> `docs/web-development/ux-design-system/accessibility.md`
- `docs/web-development/important/frontend-architecture.md` -> `docs/web-development/frontend-architecture/index.md`
- `docs/web-development/important/micro-frontends.md` -> `docs/web-development/frontend-architecture/micro-frontends.md`
- `docs/web-development/react-js/folder-structure.md` -> `docs/web-development/frontend-architecture/folder-structure.md`
- `docs/web-development/important/backend-for-fe-bff.md` -> `docs/web-development/backend-for-frontend-node-js/bff-pattern.md`
- `docs/web-development/node-js/index.md` -> `docs/web-development/backend-for-frontend-node-js/index.md`
- `docs/web-development/node-js/chatgpt-node.md` -> `docs/web-development/backend-for-frontend-node-js/node-js-interview-qa.md`
- `docs/web-development/next-js/chatgpt-next.md` -> `docs/web-development/next-js/next-js-interview-qa.md`
- `docs/web-development/typescript/chatgpt-notes.md` -> `docs/web-development/typescript/interview-qa.md`

## Renamed Paths

- `performance/rendering.md` -> `performance/rendering-performance.md`
- `security-auth/jwt-csrf.md` -> `security-auth/jwt-csrf-token-storage.md`
- `security-auth/iframe-protection.md` -> `security-auth/iframe-clickjacking-protection.md`

## Placeholder Pages Added

- Frontend Architecture: design system architecture, state management strategy, API layer design, feature flags, multi-tenant UI, role-based access control, frontend scalability.
- Testing & Quality: E2E testing, accessibility testing, visual regression testing, test strategy for large apps.
- UX / Design System: design tokens, component API design, theming, design system governance.
- Build / Delivery: build tools, linting and code quality, CI/CD, GitHub Actions, Docker and Kubernetes basics, release strategy, monitoring and observability.
- BFF / Node.js: Node.js basics, Express.js, API aggregation, authentication, rate limiting, caching, error handling, logging, GraphQL server basics.

## Files Modified

- `sidebars.ts`
- `AI_PROJECT_CONTEXT.md`
- `.knowledge/migration-log.md`
- `.knowledge/review-queue.yaml`
- Web Development pages that contained links to moved files.

## Image Move

- `static/img/docs/web-development/react-js/folder-structure/folder-structure-01.png`
- moved to:
- `static/img/docs/web-development/frontend-architecture/folder-structure/folder-structure-01.png`

## Build Result

Command:

```bash
npm run build
```

Result:

- Pass
- Static files generated in `build`.

Warning:

- Docusaurus update check could not access `/Users/akhileshbamhore/.config`.
- This warning did not fail the build.

## Follow-Up Recommendations

1. Review placeholder pages and decide which ones should stay visible before content is added.
2. Run a focused duplicate cleanup for Performance, Security/Auth, Testing, and Frontend Architecture.
3. Later, split or refine Node.js and TypeScript interview Q&A pages only after no-loss review.
4. Leave Angular and HTML & CSS untouched until their dedicated cleanup phase.

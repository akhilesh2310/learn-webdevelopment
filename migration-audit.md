# Migration Audit

Date: 2026-07-04

Scope: Audit after DSA, System Design, and Web Development migration.

This audit is read-only for existing documentation and source files. No migration fixes, rewrites, moves, deletes, or source-note edits were applied during this audit.

## Summary

- Build status: Pass
- `source-notes/` status: No tracked source-note diffs detected by `git diff --name-only -- source-notes`
- DSA status: Pass with expected intentional placeholder for Concepts
- System Design status: Mostly pass; several topic pages are TODO-only and need manual review
- Web Development status: Mostly pass; one TODO-only page found
- Sidebar status: Main Docusaurus sidebars are structured correctly for DSA, Web Development, and System Design
- Image status: Base64 images are still embedded in migrated docs and source notes
- Main cleanup candidates: TODO-only pages, stale project context, unused `resetSidebar` constant, and later base64 image extraction

## DSA Audit

Expected DSA sidebar pages:

- Resources
- Concepts
- Recently Asked
- JS vs JAVA
- Toll Increase
- Problems Solved

Detected files:

- `docs/dsa/resources.md`
- `docs/dsa/concepts.md`
- `docs/dsa/recently-asked.md`
- `docs/dsa/js-vs-java.md`
- `docs/dsa/toll-increase.md`
- `docs/dsa/problems-solved.md`

Result:

- Correct direct-page-only structure.
- No nested folders detected under `docs/dsa/`.
- `docs/dsa/concepts.md` contains the expected placeholder: `TODO: Add concepts notes.`
- No unexpected DSA sidebar categories found.

## System Design Audit

Expected main sidebar items:

- Interview Pattern
- Basic Concepts
- Resources
- System Design Questions
- DSA Roadmap
- Worked 22nd Aug

Detected direct pages:

- `docs/system-design/interview-pattern.md`
- `docs/system-design/basic-concepts.md`
- `docs/system-design/resources.md`
- `docs/system-design/worked-22nd-aug.md`

Detected categories:

- `docs/system-design/system-design-questions/`
- `docs/system-design/dsa-roadmap/`

Detected System Design Questions child pages:

- Autocomplete
- Google Search
- Google Docs
- Google Sheets
- Google Drive / Dropbox
- Google Maps
- Instagram
- Facebook News Feed
- Twitter
- Netflix
- YouTube
- WhatsApp Messenger
- URL Shortening Service
- Web Crawler
- Uber / Ola
- Traffic Control System
- BookMyShow
- Airbnb
- Airline Management System

Detected DSA Roadmap child pages:

- Solved

Result:

- Expected six main sidebar items are represented.
- System Design Questions contains 19 child pages.
- DSA Roadmap contains `Solved`.
- Category index pages exist for generated/category landing pages. This is acceptable for Docusaurus, but should be treated as navigation scaffolding rather than migrated source-note pages.

Manual review needed:

- Several System Design question pages are TODO-only, which likely means the source had headings without confidently mapped content or the migration preserved placeholders for missing sections.
- TODO-only System Design pages:
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

## Web Development Audit

Expected top-level sidebar items:

1. Interview Prep Order
2. Companies
3. Important
4. JavaScript
5. TypeScript
6. React.js
7. Next.js
8. Node.js
9. HTML & CSS
10. Angular
11. Video Tutorial

Detected top-level sidebar items:

1. Interview Prep Order
2. Companies
3. Important
4. JavaScript
5. TypeScript
6. React.js
7. Next.js
8. Node.js
9. HTML & CSS
10. Angular
11. Video Tutorial

Result:

- Expected top-level Web Development sidebar order is present.
- Nested Web Development categories match the approved hierarchy at a structural level.
- Direct pages exist for `HTML & CSS`, `Angular`, and `Video Tutorial`.
- `docs/web-development.md` does not exist. Current implementation uses `docs/web-development/` plus a generated sidebar index at `/docs/web-development`. This builds successfully, but the project context should decide whether a physical `docs/web-development.md` placeholder is still required.

Detected Web Development folders:

- `docs/web-development/interview-prep-order/`
- `docs/web-development/companies/`
- `docs/web-development/companies/agoda/`
- `docs/web-development/companies/onetrust/`
- `docs/web-development/important/`
- `docs/web-development/important/security/`
- `docs/web-development/important/performance/`
- `docs/web-development/important/testing/`
- `docs/web-development/important/ux-design-system/`
- `docs/web-development/javascript/`
- `docs/web-development/javascript/javascript-under-the-hood/`
- `docs/web-development/javascript/interview-q-a/`
- `docs/web-development/typescript/`
- `docs/web-development/react-js/`
- `docs/web-development/react-js/fundamentals/`
- `docs/web-development/next-js/`
- `docs/web-development/node-js/`

Manual review needed:

- `docs/web-development/important/micro-frontends.md` is TODO-only.

## Sidebar Audit

Navbar in `docusaurus.config.ts`:

- Home
- DSA
- Web Development
- System Design

Sidebar IDs exported in `sidebars.ts`:

- `dsaSidebar`
- `webDevelopmentSidebar`
- `systemDesignSidebar`

Result:

- No unexpected navbar items found.
- Blog remains disabled in Docusaurus config.
- DSA sidebar uses a generated index at `/dsa`.
- Web Development sidebar uses a generated index at `/web-development`.
- System Design sidebar uses a generated index at `/system-design`.
- `sidebars.ts` contains an unused `resetSidebar` constant. It is not exported in the final `sidebars` object, so it does not affect the build, but it is a cleanup candidate.

## Source Notes Audit

Source files were not modified during this audit.

Checked command:

```bash
git diff --name-only -- source-notes
```

Result:

- No tracked source-note diffs were reported.

## Content Preservation Audit

This audit checked structure, TODO markers, source-note diffs, base64 image presence, sidebars, and build validity.

Content preservation cannot be fully guaranteed from automated structural checks alone. A later source-to-doc comparison should verify:

- Every major source heading maps to exactly one migrated location.
- Long Q&A sections were not split into empty pages.
- Code blocks were preserved.
- Images were preserved or intentionally deferred for extraction.
- No source text was accidentally duplicated across multiple docs.

No obvious cross-domain placement issue was found from the current folder structure.

## Base64 Image Audit

Detected embedded `data:image` references:

- Docs: 22 occurrences
- Source notes: 22 occurrences

Docs containing base64 images:

- `docs/web-development/companies/agoda/platform-round-2.md`
- `docs/web-development/html-css.md`
- `docs/web-development/javascript/javascript-under-the-hood/browser-rendering-pipeline.md`
- `docs/web-development/angular.md`
- `docs/web-development/javascript/event-loop.md`
- `docs/web-development/react-js/folder-structure.md`
- `docs/system-design/worked-22nd-aug.md`
- `docs/system-design/system-design-questions/google-docs.md`
- `docs/system-design/system-design-questions/autocomplete.md`

Source notes containing base64 images:

- `source-notes/2. Web Development.md`
- `source-notes/3. System Design.md`

Recommendation:

- Keep base64 images for now to avoid content loss.
- In a later dedicated image-cleanup phase, extract them to stable asset files, for example under `static/img/notes/`, then replace embedded data URIs with normal image paths.

## Empty And TODO Page Audit

Known intentional placeholder:

- `docs/dsa/concepts.md`

TODO-only or likely sparse pages requiring review:

- `docs/web-development/important/micro-frontends.md`
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

## Duplicate Page Audit

No obvious duplicate migration files were detected from filename scan.

Files with numeric suffixes that are legitimate topic names:

- `docs/web-development/companies/agoda/platform-round-2.md`
- `docs/web-development/react-js/fundamentals/reconciliation-2.md`

These should not be treated as duplicate artifacts.

## Current Docs Issues Found

- `AI_PROJECT_CONTEXT.md` appears stale compared with the current migrated Web Development structure. It should be updated in a separate documentation-maintenance change.
- `sidebars.ts` contains unused `resetSidebar` scaffolding.
- The audit prompt mentions `docs/web-development.md`, but the current migrated implementation uses `docs/web-development/` with a generated sidebar index. This should be confirmed as the preferred final pattern.
- Multiple System Design question pages are TODO-only.
- One Web Development page is TODO-only.
- Base64 images are embedded in docs and should eventually be extracted to normal image assets.

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
- This warning did not fail the build and is unrelated to migrated docs content.

## Recommended Next Fix Batch

1. Confirm whether `/docs/web-development` generated index is acceptable, or whether a physical `docs/web-development.md` page is required.
2. Update `AI_PROJECT_CONTEXT.md` so it matches the current migrated state.
3. Remove unused `resetSidebar` from `sidebars.ts`.
4. Review TODO-only System Design question pages against `source-notes/3. System Design.md`.
5. Review `docs/web-development/important/micro-frontends.md` against `source-notes/2. Web Development.md`.
6. Run a dedicated content-preservation comparison between source notes and migrated docs.
7. Extract base64 images into static assets in a separate image-cleanup phase.

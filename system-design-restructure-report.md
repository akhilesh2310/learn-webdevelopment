# System Design Restructure Report

Date: 2026-07-06

## Summary

System Design was restructured into a reduced, study-friendly sidebar based on `system-design-restructure-plan.md`.

No DSA files, Web Development docs, or source notes were modified.

## New Top-Level System Design Categories

- System Design Basics
- Core Concepts
- Frontend System Design
- Backend / Distributed Systems
- Data & Storage
- API & Communication
- Cloud / Infra
- Security
- Question Bank
- Templates
- Resources

## Content Moved or Merged

- `docs/system-design/interview-guide/index.md` -> `docs/system-design/system-design-basics/interview-framework.md`
- `docs/system-design/interview-guide/design-round.md` -> `docs/system-design/system-design-basics/interview-framework.md`
- `docs/system-design/interview-guide/coding-round.md` -> `docs/dsa/coding-round.md`
- `docs/system-design/interview-guide/google-session-chat-service.md` -> `docs/system-design/system-design-basics/google-session-chat-service.md`
- `docs/system-design/interview-guide/l6-frontend-system-design-pattern.md` -> `docs/system-design/frontend-system-design/index.md` and `docs/system-design/system-design-question-bank/staff-level.md`
- `docs/system-design/interview-guide/sample-question-l6-frontend.md` -> `docs/system-design/system-design-question-bank/staff-level.md`
- `docs/system-design/interview-guide/question-patterns.md` -> `docs/system-design/system-design-question-bank/staff-level.md`
- `docs/system-design/interview-guide/answering-framework.md` -> `docs/system-design/system-design-templates/thirty-minute-interview-template.md`
- `docs/system-design/interview-guide/preparation-resources.md` -> `docs/system-design/resources.md`
- `docs/system-design/system-design-questions/index.md` -> `docs/system-design/system-design-question-bank/index.md`
- `docs/system-design/system-design-questions/autocomplete.md` -> `docs/system-design/frontend-system-design/design-search-autocomplete-ui.md`
- `docs/system-design/system-design-questions/google-docs.md` -> `docs/system-design/frontend-system-design/design-google-docs.md`
- `docs/system-design/system-design-questions/google-search.md` -> `docs/system-design/backend-distributed-system-design/google-search.md`
- `docs/system-design/system-design-questions/url-shortening-service.md` -> `docs/system-design/backend-distributed-system-design/url-shortener.md`
- `docs/system-design/system-design-questions/whatsapp-messenger.md` -> `docs/system-design/backend-distributed-system-design/chat-system.md`
- `docs/system-design/system-design-questions/facebook-news-feed.md`, `instagram.md`, and `twitter.md` -> `docs/system-design/backend-distributed-system-design/news-feed.md`
- `docs/system-design/system-design-questions/google-drive-dropbox.md` -> `docs/system-design/backend-distributed-system-design/file-upload-system.md`
- `docs/system-design/system-design-questions/netflix.md` and `youtube.md` -> `docs/system-design/backend-distributed-system-design/video-streaming.md`
- Lower-information placeholders such as Google Sheets, Google Maps, BookMyShow, Airbnb, Airline Management System, Uber/Ola, Traffic Control System, and Web Crawler -> `docs/system-design/system-design-question-bank/company-asked.md`

## Placeholder Strategy

Small concepts were kept as headings inside grouped study pages instead of separate sidebar pages.

Where no content exists yet, the page or section contains:

```md
TODO: Add notes for this topic.
```

## Files Modified

- `sidebars.ts`
- `AI_PROJECT_CONTEXT.md`
- `.knowledge/knowledge-map.yaml`
- `.knowledge/migration-log.md`
- `.knowledge/review-queue.yaml`
- `system-design-restructure-plan.md`
- `docs/dsa/coding-round.md`

## Validation

- `npm run build` passed.
- Docusaurus generated static files in `build/`.
- Docusaurus printed the existing local update-check permission warning for `/Users/akhileshbamhore/.config`; it did not fail the build.

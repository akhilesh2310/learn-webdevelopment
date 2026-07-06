# System Design Restructure Plan

Date: 2026-07-06

Status: Implemented on 2026-07-06. This file remains as the restructure blueprint and audit trail.

## 1. Goal

Create a scalable System Design section that can grow from the current limited notes into a long-term study system.

The new structure should:

- Keep existing unique notes.
- Avoid duplicate or misplaced content.
- Make System Design easier to study by topic.
- Keep blank TODO pages where future content is expected.
- Keep Docusaurus sidebar navigation clean.
- Avoid touching DSA and Web Development.

## 2. Current System Design State

Current folder:

```text
docs/system-design/
  interview-guide/
  resources.md
  system-design-questions/
```

Current meaningful content:

- `docs/system-design/interview-guide/index.md`
- `docs/system-design/interview-guide/design-round.md`
- `docs/system-design/interview-guide/coding-round.md`
- `docs/system-design/interview-guide/l6-frontend-system-design-pattern.md`
- `docs/system-design/interview-guide/sample-question-l6-frontend.md`
- `docs/system-design/interview-guide/preparation-resources.md`
- `docs/system-design/interview-guide/question-patterns.md`
- `docs/system-design/interview-guide/answering-framework.md`
- `docs/system-design/interview-guide/google-session-chat-service.md`
- `docs/system-design/resources.md`
- `docs/system-design/system-design-questions/index.md`
- `docs/system-design/system-design-questions/autocomplete.md`
- `docs/system-design/system-design-questions/google-docs.md`

Current mostly placeholder pages:

- `docs/system-design/system-design-questions/airbnb.md`
- `docs/system-design/system-design-questions/airline-management-system.md`
- `docs/system-design/system-design-questions/bookmyshow.md`
- `docs/system-design/system-design-questions/facebook-news-feed.md`
- `docs/system-design/system-design-questions/google-drive-dropbox.md`
- `docs/system-design/system-design-questions/google-maps.md`
- `docs/system-design/system-design-questions/google-search.md`
- `docs/system-design/system-design-questions/google-sheets.md`
- `docs/system-design/system-design-questions/instagram.md`
- `docs/system-design/system-design-questions/netflix.md`
- `docs/system-design/system-design-questions/traffic-control-system.md`
- `docs/system-design/system-design-questions/twitter.md`
- `docs/system-design/system-design-questions/uber-ola.md`
- `docs/system-design/system-design-questions/url-shortening-service.md`
- `docs/system-design/system-design-questions/web-crawler.md`
- `docs/system-design/system-design-questions/whatsapp-messenger.md`
- `docs/system-design/system-design-questions/youtube.md`

## 3. Recommended Final Sidebar

```text
System Design
├── System Design Basics
├── Core Concepts
├── Frontend System Design
├── Backend / Distributed System Design
├── Data & Storage Design
├── API & Communication Design
├── Cloud / DevOps / Infra
├── Security System Design
├── System Design Question Bank
├── System Design Templates
└── Resources
```

This keeps the sidebar broad but not too flat. Each major topic becomes a category, and specific topics become pages inside the category.

Important sidebar rule:

- Do not create one sidebar page for every small concept.
- Keep interview-flow topics as sections inside `interview-framework.md`.
- Group small core concepts into study pages.
- Create separate pages for design problems because each problem can grow into a full answer.
- Create separate pages only when the topic is large enough to study independently.

## 4. Proposed Folder Structure

This is the reduced, study-friendly version of the structure. It intentionally avoids a very long sidebar.

```text
docs/system-design/
  system-design-basics/
    _category_.json
    index.md
    interview-framework.md
    google-session-chat-service.md

  core-concepts/
    _category_.json
    index.md
    scalability-reliability.md
    caching-cdn.md
    databases-partitioning.md
    queues-event-driven-systems.md
    rate-limiting-resilience.md
    observability.md

  frontend-system-design/
    _category_.json
    index.md
    design-large-dashboard.md
    design-google-docs.md
    design-netflix-ui.md
    design-linkedin-feed.md
    design-admin-portal.md
    design-component-library.md
    design-microfrontend-platform.md
    design-real-time-notification-ui.md
    design-large-tree-view.md
    design-search-autocomplete-ui.md
    design-analytics-reporting-ui.md
    design-multi-tenant-saas-frontend.md

  backend-distributed-system-design/
    _category_.json
    index.md
    url-shortener.md
    autocomplete.md
    google-search.md
    notification-system.md
    chat-system.md
    news-feed.md
    file-upload-system.md
    video-streaming.md
    payment-system.md
    rate-limiter.md
    logging-platform.md
    metrics-platform.md
    real-time-analytics.md
    ad-tech-platform.md
    campaign-management-system.md
    siem-security-event-platform.md
    feature-flag-system.md
    multi-tenant-saas-platform.md
    access-control-system.md

  data-storage-design/
    _category_.json
    index.md
    database-selection.md
    data-modeling.md
    indexing-and-querying.md
    partitioning-and-sharding.md
    consistency-and-sync.md
    read-write-patterns.md

  api-communication-design/
    _category_.json
    index.md
    api-styles.md
    realtime-communication.md
    api-gateway-and-bff.md
    reliability-patterns.md
    payload-optimization.md

  cloud-devops-infra/
    _category_.json
    index.md
    containers-and-orchestration.md
    scaling-and-service-discovery.md
    deployment-strategies.md
    ci-cd-and-environments.md
    logging-metrics-alerts.md

  security-system-design/
    _category_.json
    index.md
    authentication-and-authorization.md
    access-control.md
    token-and-session-security.md
    encryption-and-secrets.md
    audit-compliance-pii.md
    secure-api-design.md

  system-design-question-bank/
    _category_.json
    index.md
    easy.md
    medium.md
    hard.md
    staff-level.md
    recently-asked.md
    company-asked.md
    solved.md
    need-revision.md

  system-design-templates/
    _category_.json
    index.md
    five-minute-answer-template.md
    thirty-minute-interview-template.md
    frontend-system-design-template.md
    backend-system-design-template.md
    trade-off-checklist.md
    deep-dive-checklist.md

  resources.md
```

### 4.1 Topics Kept as Sections Inside Pages

These topics should not appear as separate sidebar items yet.

#### `system-design-basics/interview-framework.md`

Use headings inside this page:

- Requirement Gathering
- Functional Requirements
- Non-Functional Requirements
- Capacity Estimation
- API Design
- Data Model
- High-Level Design
- Deep Dive
- Trade-offs
- Bottlenecks
- Final Summary

Reason: these form one interview flow and should be studied together.

#### `core-concepts/scalability-reliability.md`

Use headings inside this page:

- Scalability
- Availability
- Reliability
- Latency
- Throughput
- Load Balancer
- Reverse Proxy

#### `core-concepts/caching-cdn.md`

Use headings inside this page:

- CDN
- Caching
- Browser Cache
- Application Cache
- Distributed Cache
- Cache Invalidation

#### `core-concepts/databases-partitioning.md`

Use headings inside this page:

- Database Indexing
- Replication
- Sharding
- Partitioning
- Consistent Hashing

#### `core-concepts/queues-event-driven-systems.md`

Use headings inside this page:

- Queues
- Kafka
- Event-Driven Architecture
- Distributed Transactions

#### `core-concepts/rate-limiting-resilience.md`

Use headings inside this page:

- Idempotency
- Rate Limiting
- Backpressure
- Circuit Breaker

#### `data-storage-design/database-selection.md`

Use headings inside this page:

- SQL vs NoSQL
- PostgreSQL
- MongoDB
- Redis
- Elasticsearch

#### `data-storage-design/consistency-and-sync.md`

Use headings inside this page:

- Data Consistency
- Eventual Consistency
- Strong Consistency
- Data Sync Across Servers
- Data Sync Across Databases

#### `api-communication-design/api-styles.md`

Use headings inside this page:

- REST
- GraphQL
- gRPC
- API Versioning

#### `api-communication-design/realtime-communication.md`

Use headings inside this page:

- WebSockets
- SSE
- Polling
- Webhooks

#### `cloud-devops-infra/containers-and-orchestration.md`

Use headings inside this page:

- Docker
- Kubernetes
- Helm

#### `security-system-design/authentication-and-authorization.md`

Use headings inside this page:

- Authentication
- Authorization
- OAuth
- SSO
- mTLS

## 5. Existing Content Mapping

| Current file | Recommended destination | Action | Notes |
|---|---|---|---|
| `interview-guide/index.md` | `system-design-basics/index.md` | Merge/move | Keep overview of interview strategy. |
| `interview-guide/design-round.md` | `system-design-basics/interview-framework.md` | Merge/move | Contains design round expectations and L6 prep guide. |
| `interview-guide/coding-round.md` | `system-design-basics/interview-framework.md` or keep out of System Design | Needs decision | Coding round is interview prep, but not system design. If kept in System Design, keep it as a section inside the interview framework page instead of a sidebar page. |
| `interview-guide/l6-frontend-system-design-pattern.md` | `frontend-system-design/index.md` or `system-design-question-bank/staff-level.md` | Merge/move | This is frontend L6-specific pattern guidance. |
| `interview-guide/sample-question-l6-frontend.md` | `system-design-question-bank/staff-level.md` | Merge/move | Keep as Staff-level question example. |
| `interview-guide/preparation-resources.md` | `resources.md` | Merge/move | Merge resource links into the main resources page. |
| `interview-guide/question-patterns.md` | `system-design-question-bank/staff-level.md` | Merge/move | Strong fit for Staff-level question bank. |
| `interview-guide/answering-framework.md` | `system-design-templates/thirty-minute-interview-template.md` | Merge/move | Also contains component-design pro tips and rubric. |
| `interview-guide/google-session-chat-service.md` | `system-design-basics/google-session-chat-service.md` | Move | User already clarified this belongs to Interview Guide/Basics, not a final chat-service design page. |
| `resources.md` | `resources.md` | Keep and refine later | Keep as the section-level resource page. |
| `system-design-questions/index.md` | `system-design-question-bank/index.md` | Move/merge | Keep question lists and preparation plan here. |
| `system-design-questions/autocomplete.md` | `frontend-system-design/design-search-autocomplete-ui.md` and optionally `backend-distributed-system-design/autocomplete.md` | Needs careful split | Current page is mostly frontend component/system design with some backend-related resources. Prefer moving the full page to frontend first; create backend autocomplete TODO separately. |
| `system-design-questions/google-docs.md` | `frontend-system-design/design-google-docs.md` | Move | Existing page is explicitly frontend-focused. |
| `system-design-questions/google-search.md` | `backend-distributed-system-design/google-search.md` | Move placeholder | Placeholder only. |
| `system-design-questions/url-shortening-service.md` | `backend-distributed-system-design/url-shortener.md` | Move placeholder | Rename URL Shortening Service to URL Shortener for sidebar clarity. |
| `system-design-questions/facebook-news-feed.md` | `backend-distributed-system-design/news-feed.md` | Move placeholder | Keep Facebook-specific note in title/body if present. |
| `system-design-questions/netflix.md` | `frontend-system-design/design-netflix-ui.md` or `backend-distributed-system-design/video-streaming.md` | Needs decision | Current placeholder can become frontend Netflix UI if the goal is frontend design; backend video streaming should be a separate TODO. |
| `system-design-questions/youtube.md` | `backend-distributed-system-design/video-streaming.md` or future frontend YouTube UI | Needs decision | Placeholder only. |
| `system-design-questions/whatsapp-messenger.md` | `backend-distributed-system-design/chat-system.md` | Move placeholder | Chat-service canonical backend placeholder. |
| `system-design-questions/web-crawler.md` | `backend-distributed-system-design/web-crawler.md` | Optional extra | Not in proposed list, but existing placeholder should not be lost. Add as TODO or map under Google Search/search indexing. |
| `system-design-questions/google-sheets.md` | `frontend-system-design/design-google-docs.md` or `frontend-system-design/design-large-dashboard.md` | Needs decision | Placeholder only. Could create `design-spreadsheet-app.md` if approved. |
| Remaining placeholders | Best matching category | Move placeholder | Preserve visibility, no content loss. |

## 6. Recommended Sidebar Labels

Use shorter sidebar labels than filenames where useful:

- `System Design Basics`
- `Core Concepts`
- `Frontend System Design`
- `Backend / Distributed Systems`
- `Data & Storage`
- `API & Communication`
- `Cloud / Infra`
- `Security`
- `Question Bank`
- `Templates`
- `Resources`

This keeps the sidebar readable while preserving descriptive page titles.

## 7. Placeholder Page Rule

Only create placeholder pages for approved sidebar pages.

Do not create placeholder pages for every heading-level topic. For example, `Scalability`, `Availability`, and `Latency` should initially be headings inside `core-concepts/scalability-reliability.md`, not separate empty pages.

For pages with no current content, create only:

```md
---
title: Topic Name
sidebar_position: N
---

# Topic Name

TODO: Add notes for this topic.
```

Do not invent technical explanations.

## 7.1 When To Promote a Heading Into a Page

Promote a heading into its own sidebar page only when one of these is true:

- It has enough content to be studied independently.
- It is a design problem with its own interview answer.
- It has diagrams, examples, trade-offs, or implementation details that would make a parent page too long.
- It is a canonical topic that is heavily referenced from many other pages.

Keep it as a section when:

- It is part of a single interview flow.
- It is a small definition or checklist item.
- It belongs naturally with nearby concepts.
- It would create an empty TODO-only page with no immediate value.

## 8. Content Preservation Rules

- Do not delete current System Design notes.
- Do not modify `source-notes/`.
- Do not touch DSA or Web Development.
- Move existing content only after this plan is approved.
- Preserve images and image references when moving pages.
- Preserve interview questions, raw notes, resource links, and rough wording.
- If content does not clearly fit, keep it in the closest page and add `TODO: Manual Review`.

## 9. Execution Batches

### Batch 1: Create Skeleton

- Create folders and `_category_.json` files.
- Create `index.md` and TODO pages.
- Do not move existing content yet.
- Update `sidebars.ts`.
- Run `npm run build`.

### Batch 2: Move Interview Guide Content

- Move Interview Guide content into `system-design-basics/`, `system-design-templates/`, and `system-design-question-bank/`.
- Keep `google-session-chat-service.md` under System Design Basics.
- Update image references if needed.
- Run `npm run build`.

### Batch 3: Move Design Problems

- Move `autocomplete.md` to `frontend-system-design/design-search-autocomplete-ui.md`.
- Move `google-docs.md` to `frontend-system-design/design-google-docs.md`.
- Move placeholder backend problems into `backend-distributed-system-design/`.
- Keep placeholders visible in sidebar.
- Run `npm run build`.

### Batch 4: Resource Cleanup

- Merge `interview-guide/preparation-resources.md` into `resources.md`.
- Organize links by tutorials, frontend system design, mock interviews, YouTube, and courses.
- Run `npm run build`.

### Batch 5: Context Updates

- Update `AI_PROJECT_CONTEXT.md`.
- Update `.knowledge/knowledge-map.yaml` for moved canonical pages.
- Update `.knowledge/migration-log.md` for major movement.
- Add uncertain placement decisions to `.knowledge/review-queue.yaml`.

## 10. Decisions Needed Before Execution

1. Should `Coding Round` remain inside System Design Basics, or should it move later to DSA/Web Development interview prep?
2. Should `Netflix` become a frontend UI design page, or should it be mapped to backend video streaming?
3. Should `YouTube` become backend video streaming, frontend feed/homepage UI, or both later?
4. Should `Google Sheets` become its own frontend page like `design-spreadsheet-app.md`?
5. Should `Web Crawler` be added as an extra backend design page even though it is not in the proposed list?
6. Should old `system-design-questions/` remain temporarily as redirects/stubs during migration, or should pages be moved directly once the sidebar is updated?

## 11. Recommended First Implementation

Start with Batch 1 only:

- Create the new System Design skeleton.
- Keep current files in place.
- Add TODO placeholders.
- Update sidebar to show the new structure.
- Build.

Then move content batch by batch after reviewing the new sidebar.

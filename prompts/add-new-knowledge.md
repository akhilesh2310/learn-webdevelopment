Before making any changes, read:

* AI_PROJECT_CONTEXT.md
* PROJECT_REQUIREMENTS.md
* KNOWLEDGE_ARCHITECTURE.md
* DECISIONS.md
* approved-deduplication-decisions.md
* knowledge-refactor-audit.md
* canonical-topic-decisions.md
* duplicate-inventory.md
* .github/copilot-instructions.md
* .knowledge/knowledge-rules.yaml
* .knowledge/knowledge-map.yaml
* .knowledge/aliases.yaml
* .knowledge/review-queue.yaml
* sidebars.ts

Task:
Add newly learned knowledge into this Personal Technical Knowledge Base.

This repository is not just a Docusaurus website.
It is my long-term technical knowledge base for study, revision, and interview preparation.

Docusaurus is only the presentation layer.

====================================================

NEW KNOWLEDGE INPUT

Process the following new knowledge:

```text
PASTE_NEW_KNOWLEDGE_HERE
```

====================================================

MAIN GOAL

Do not simply append the new content.

Your job is to:

1. Understand the new knowledge.
2. Search the existing docs.
3. Find the correct canonical location.
4. Avoid duplicate topics, duplicate questions, duplicate answers, and duplicate code.
5. Merge useful new points into the right existing page.
6. Create a new page only when no suitable canonical page exists.
7. Update links and knowledge metadata where needed.
8. Preserve all useful knowledge.

====================================================

STRICT SAFETY RULES

Do NOT modify:

* source-notes/

Do NOT delete useful content.

Do NOT rewrite existing pages broadly.

Do NOT summarize away important knowledge.

Do NOT create duplicate pages.

Do NOT create new top-level categories without approval.

Do NOT move large sections without approval.

Do NOT rename files without approval.

Do NOT change DSA/System Design/Web Development hierarchy unless clearly required and safe.

If unsure, do not guess.
Add the item to `.knowledge/review-queue.yaml` and explain it in the final report.

====================================================

PROCESS

Step 1: Understand the new content

Identify:

* topic
* domain
* related technologies
* interview questions
* code snippets
* examples
* diagrams/images
* duplicate risk
* possible canonical pages

Classify the content as one or more of:

* DSA / algorithmic problem
* JavaScript concept
* JavaScript coding utility
* TypeScript concept
* React concept
* React performance
* React architecture
* Next.js concept
* Node.js concept
* HTML & CSS concept
* Security concept
* Performance concept
* System Design concept
* Company/interview prep
* Project experience
* General revision note

====================================================

Step 2: Search before editing

Search active documentation under:

docs/

Also check:

* .knowledge/knowledge-map.yaml
* .knowledge/aliases.yaml
* approved-deduplication-decisions.md
* duplicate-inventory.md

Find:

1. existing canonical page
2. related pages
3. duplicate questions
4. duplicate answers
5. duplicate code snippets
6. similar headings
7. possible category conflicts

Do not treat source-notes/ as active docs.

source-notes/ is read-only archive.

====================================================

Step 3: Decide canonical ownership

Use these approved ownership rules.

Company pages:

* keep company-specific questions, rounds, context, and personal prep
* do not let company pages own full canonical technical explanations
* link company pages to canonical topic pages

Quick Questions:

* quick revision/index style only
* keep short answers and links
* do not place deep explanations there

System Design Basic Concepts:

* system-design-facing summaries only
* link frontend/browser/security details to Web Development canonical pages

JavaScript:

* Event Loop owns browser JavaScript event loop
* Asynchronous JavaScript owns promises, async/await, async patterns
* Browser Rendering Pipeline owns render tree/layout/paint/composite
* Advanced JS owns concepts like debounce/throttle/memoization
* JavaScript Coding Questions owns implementations, polyfills, utilities, machine-coding snippets

DSA:

* owns algorithmic problem solving
* owns DP/algorithmic memoization
* do not move algorithmic DSA solutions into JavaScript utility pages unless they are language-specific utilities

React:

* React Hooks owns hook API usage
* React Performance owns React.memo/useMemo/useCallback optimization decisions
* React Fiber remains standalone deep dive
* React Reconciliation canonical page is reconciliation-1.md
* React Under The Hood is overview/hub
* Rendering Components owns render/commit lifecycle from developer point of view

TypeScript:

* ts-concepts.md owns concepts
* code.md owns examples and implementation snippets
* chatgpt-notes.md remains interview Q&A
* index.md should stay lightweight overview

Security:

* XSS page owns XSS
* JWT/CSRF page owns token storage and CSRF tradeoffs
* Security Headers owns headers overview
* iFrame Protection owns clickjacking/frame protection
* OWASP is overview/index style
* Node.js and Next.js keep framework-specific implementation notes

Caching:

* keep domain-specific
* do not create one giant caching page unless approved

CORS:

* keep under existing security/framework pages for now
* do not create a dedicated CORS page unless approved

Micro Frontends:

* important/micro-frontends.md is future canonical page
* do not fill aggressively unless explicitly asked

====================================================

Step 4: Decide action

Choose one action:

A. Merge into existing canonical page

Use when:

* topic already exists
* new content adds useful detail
* no new page is needed

B. Add as section to existing page

Use when:

* content is a subtopic of an existing page
* it does not deserve a separate page

C. Add link/reference only

Use when:

* content is duplicate but useful as interview/company context
* canonical explanation already exists elsewhere

D. Create a new page

Use only when:

* no existing page fits
* topic is important enough to deserve its own canonical page
* it fits existing hierarchy

E. Add to review queue

Use when:

* correct location is unclear
* content overlaps across multiple domains
* adding it would require new top-level category
* adding it would require major reorganization

====================================================

Step 5: Merge rules

When merging into an existing page:

1. Preserve existing useful content.
2. Add only new useful points.
3. Remove exact duplicates only when safe.
4. Do not remove interview questions.
5. Do not remove code snippets.
6. Do not remove examples.
7. Do not remove edge cases.
8. Preserve user’s intent and wording where possible.
9. Improve formatting only enough to integrate the new content.
10. Add links to related canonical pages.

Duplicate cleanup means:

* keep full detail in canonical page
* replace repeated content elsewhere with short summary + link
* keep context-specific notes where they belong

====================================================

Step 6: Code snippet rules

If new content contains code:

1. Search for similar code snippets first.
2. Do not duplicate the same implementation in multiple pages.
3. Put JavaScript utilities in:
   docs/web-development/javascript/javascript-coding-questions.md
4. Put JavaScript concept explanation in:
   docs/web-development/javascript/advanced-js.md
5. Put TypeScript examples in:
   docs/web-development/typescript/code.md
6. Put React hook examples in:
   docs/web-development/react-js/react-hooks.md
7. Put React optimization examples in:
   docs/web-development/important/performance/react-performance.md
8. Put algorithmic solutions in DSA pages.
9. Company pages should keep only coding-round context and link to canonical implementation.

Add correct code fence language:

* JavaScript → ```js
* TypeScript → ```ts
* React JSX → ```jsx
* React TypeScript → ```tsx
* Shell → ```bash
* JSON → ```json
* YAML → ```yaml
* Plain output → ```text

Do not change code behavior.

====================================================

Step 7: Formatting rules

When editing Markdown:

1. Keep one main H1 per page where possible.
2. Use H2/H3 for sections.
3. Remove blank headings.
4. Clean obvious Google Docs export artifacts.
5. Keep lists readable.
6. Keep Q&A format consistent.
7. Add frontmatter only if missing.
8. Do not perform full-page rewrite unless explicitly asked.

====================================================

Step 8: Links

Add links when content relates to existing canonical pages.

Use relative Docusaurus Markdown links.

Good examples:

* For the full explanation, see [Event Loop](../event-loop.md).
* For optimization trade-offs, see [React Performance](../important/performance/react-performance.md).
* For token storage and CSRF details, see [JWT & CSRF](../security/jwt-csrf.md).

Do not add too many links in one paragraph.

Do not create broken links.

====================================================

Step 9: Knowledge metadata

After successful changes:

Update `.knowledge/knowledge-map.yaml` only when:

* a new canonical page is created
* canonical ownership changes
* a major topic gains important related topics

Update `.knowledge/aliases.yaml` only when:

* the new content uses a common alternate name
* the alias will help future search/deduplication

Update `.knowledge/review-queue.yaml` when:

* the right location is unclear
* a user decision is needed
* content might require future category changes

Do not fully repopulate knowledge-map.yaml.

Keep updates minimal and useful.

====================================================

Step 10: Validation

Run:

npm run build

Fix only issues caused by this update.

Do not perform unrelated cleanup.

====================================================

Step 11: Report

Create or update:

add-new-knowledge-report.md

Include:

1. Summary of new knowledge processed
2. Existing pages searched
3. Chosen canonical location
4. Files updated
5. New pages created, if any
6. Duplicate content found
7. Duplicate content avoided
8. Code snippets added or linked
9. Cross-links added
10. Knowledge map updates
11. Review queue items
12. TODO/manual review items
13. Build result

====================================================

CONFIDENCE RULE

If confidence is high:

* apply the change safely

If confidence is medium:

* apply only low-risk additions
* add uncertain decisions to review queue

If confidence is low:

* do not modify docs
* create a recommendation in add-new-knowledge-report.md
* add item to review queue

====================================================

FINAL RULE

This repository is my long-term technical knowledge base.

The goal is not to add more pages.

The goal is to keep knowledge clean, canonical, searchable, non-duplicate, and easy to revise.

Always prefer:

existing canonical page

over

new duplicate page

unless the topic truly deserves a new home.


<!-- 1. Paste new notes into the NEW KNOWLEDGE INPUT section
2. Ask Codex to run prompts/add-new-knowledge.md
3. Review add-new-knowledge-report.md
4. Commit if the diff is good -->
# Approved Deduplication Decisions

Date: 2026-07-05

Purpose: Capture approved ownership rules for future duplicate cleanup. This is a planning document only. It does not modify documentation content, sidebars, source notes, or knowledge-map files.

## 1. Base Rule

No knowledge should be lost.

Duplicate cleanup means:

- move unique useful content to the canonical page
- replace repeated content with a short summary and link
- keep context-specific content where it belongs
- preserve examples, code snippets, interview answers, edge cases, and company-specific context

## 2. Company Pages

Company pages should keep:

- company-specific questions
- interview context
- asked questions
- round-specific notes
- personal/project examples
- follow-up prompts

Company pages should not own full canonical technical explanations.

When duplicated technical explanations exist in company pages:

- keep a short company-specific note
- link to the canonical topic page
- do not delete company-specific context

## 3. Quick Questions

`docs/web-development/important/quick-questions.md` should become a quick revision/index style page.

It should keep:

- short answers
- interview prompts
- links to canonical pages

It should not own long deep explanations.

## 4. System Design Basic Concepts

`docs/system-design/basic-concepts.md` should keep only system-design-facing summaries.

Frontend, browser, and security deep explanations should live in Web Development canonical pages.

System Design pages should link to canonical Web Development pages when needed.

## 5. React Internals Ownership

React Fiber should remain a separate deep-dive page:

- `docs/web-development/react-js/fundamentals/react-fiber.md`

React Under The Hood should act as an overview/hub page:

- `docs/web-development/react-js/react-under-the-hood.md`

It can link to:

- React Fiber
- Reconciliation
- Rendering Components
- React Performance

It should not duplicate all detailed explanations from those pages.

React Reconciliation canonical page:

- `docs/web-development/react-js/fundamentals/reconciliation-1.md`

`docs/web-development/react-js/fundamentals/reconciliation-2.md` should be merged into `reconciliation-1.md` using a no-loss merge if it is a continuation or duplicate.

## 6. TypeScript Ownership

TypeScript ownership:

- `docs/web-development/typescript/ts-concepts.md` owns concepts.
- `docs/web-development/typescript/code.md` owns examples and implementation snippets.
- `docs/web-development/typescript/chatgpt-notes.md` remains as interview Q&A for now.
- `docs/web-development/typescript/index.md` should eventually become a lightweight overview.

## 7. Micro Frontends

`docs/web-development/important/micro-frontends.md` should become the canonical Micro Frontends page later.

Do not fill it yet unless explicitly asked.

Existing useful Micro Frontends content from React Architecture and company pages can later be moved or summarized into this page after approval.

## 8. DSA vs JavaScript Coding

Ownership:

- DSA pages own algorithmic problem solving.
- JavaScript Coding Questions owns JavaScript utilities, polyfills, machine-coding implementations, and language-specific coding snippets.
- Company pages can keep coding-round context but should link to canonical implementations.

## 9. Memoization Ownership

Ownership:

- DSA owns algorithmic/DP memoization.
- JavaScript Advanced JS owns the concept of generic memoization.
- JavaScript Coding Questions owns reusable `memoize(fn)` implementation.
- React Performance owns `React.memo`, `useMemo`, and `useCallback` optimization decisions.
- React Hooks owns API usage examples.

## 10. Caching Ownership

Keep caching split by domain for now.

Do not create a giant caching page yet.

Current ownership:

- System Design owns distributed/system cache tradeoffs.
- Next.js owns framework caching.
- React State Management owns server-state/client cache behavior.
- Browser APIs / Performance own browser/CDN/cache impact.
- Core Web Vitals owns performance impact.

## 11. CORS

Do not create a dedicated CORS page yet.

Keep existing CORS content in security/framework pages.

Later, if CORS continues to repeat heavily, create a dedicated page under Security after user approval.

## 12. Node.js and Next.js Page Names

Do not rename these files during deduplication:

- `docs/web-development/node-js/chatgpt-node.md`
- `docs/web-development/next-js/chatgpt-next.md`

Rename later in a separate structure cleanup batch.

## 13. Google Docs System Design

Problem-specific Google Docs design content belongs in:

- `docs/system-design/system-design-questions/google-docs.md`

`docs/system-design/interview-pattern.md` should stay generic and reusable.

## 14. Next Cleanup Order

### Batch 1: Exact Duplicate Paragraph Cleanup

Include:

- Render Tree / Browser Rendering exact duplicates
- Google Docs system design component breakdown duplicate
- throttle trailing-call duplicate
- duplicate XSS sections inside `xss-cross-site-scripting.md`

### Batch 2: Duplicate Q&A Cleanup

Include:

- frontend basics repeated question set
- TypeScript duplicate questions
- React internals duplicate questions
- Security duplicate questions

### Batch 3: Duplicate Code Snippets

Include:

- debounce
- throttle
- memoize
- React `useDebouncedValue`
- TypeScript utility type examples

### Batch 4: React Internals Cleanup

Include:

- Reconciliation 1 and 2
- Fiber vs React Under The Hood
- Core Concept Internals vs Rendering Components

### Batch 5: Security Cleanup

Include:

- XSS
- JWT/CSRF/token storage
- Security headers
- iFrame/clickjacking
- OWASP overview

### Batch 6: System Design vs Web Development Cleanup

Include:

- keep system design summaries short
- link to Web Development canonical pages
- keep design problem pages focused on tradeoffs

### Batch 7: Company Pages Cleanup

Include:

- keep interview context
- replace full repeated explanations with canonical links

## 15. Related Planning Documents

- `knowledge-refactor-audit.md`
- `canonical-topic-decisions.md`
- `duplicate-inventory.md`

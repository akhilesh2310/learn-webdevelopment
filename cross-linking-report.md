# Cross-Linking Report

Date: 2026-07-04

Scope: first canonical cross-linking batch across active docs.

This was a low-risk linking task only. No duplicate content was removed, merged, moved, renamed, rewritten, or summarized. `source-notes/` and `sidebars.ts` were not modified.

## Summary

- Documentation files updated: 21
- Knowledge metadata files updated: 1
- Internal links added: 63
- Build result: Pass

## Files Updated

| File | Links added |
|---|---:|
| `docs/system-design/basic-concepts.md` | 6 |
| `docs/web-development/important/quick-questions.md` | 4 |
| `docs/web-development/javascript/asynchronous-javascript.md` | 1 |
| `docs/web-development/javascript/javascript-under-the-hood/index.md` | 3 |
| `docs/web-development/javascript/javascript-under-the-hood/url-in-browser.md` | 1 |
| `docs/web-development/important/performance/core-web-vitals.md` | 2 |
| `docs/web-development/react-js/react-hooks.md` | 1 |
| `docs/web-development/react-js/rendering-components.md` | 4 |
| `docs/web-development/react-js/react-under-the-hood.md` | 3 |
| `docs/web-development/react-js/core-concept-internals.md` | 4 |
| `docs/web-development/react-js/fundamentals/index.md` | 3 |
| `docs/web-development/react-js/fundamentals/reconciliation-1.md` | 3 |
| `docs/web-development/important/security/index.md` | 4 |
| `docs/web-development/important/security/owasp.md` | 4 |
| `docs/web-development/important/security/react-security.md` | 3 |
| `docs/web-development/important/security/security-headers.md` | 2 |
| `docs/web-development/important/security/iframe-protection.md` | 1 |
| `docs/web-development/node-js/chatgpt-node.md` | 3 |
| `docs/web-development/next-js/chatgpt-next.md` | 2 |
| `docs/web-development/companies/adobe.md` | 3 |
| `docs/web-development/companies/agoda/index.md` | 6 |

## Knowledge Metadata Updated

- `.knowledge/knowledge-map.yaml`
  - Updated `last_reviewed` and notes for existing canonical entries:
    - `js-event-loop`
    - `react-hooks`
  - Did not create new canonical topic entries.
  - Did not fully populate the map.

## Links Added

Links were added to these approved canonical owners where the related topic was already present:

- Event Loop
- Browser Rendering Pipeline / Render Tree
- React Performance
- React.memo / useMemo / useCallback ownership split
- React Fiber
- React Reconciliation
- XSS
- JWT / CSRF / Token Storage
- Security Headers
- iFrame Protection

## Links Skipped

- `docs/web-development/companies/agoda/screening-round.md`
  - Skipped because the relevant topic in that page is plain JavaScript memoization.
  - The approved canonical-owner list for this batch did not include `docs/web-development/javascript/advanced-js.md` or `docs/web-development/javascript/javascript-coding-questions.md`.
  - This should be handled in a later JavaScript utility/concepts cross-linking batch.

## Uncertain Pages

- None changed with uncertainty.
- The Node.js Event Loop section was linked to browser JavaScript Event Loop only as a related browser scheduling reference. Node-specific event loop content remains owned by the Node.js page.

## Broken Link Risks

- No broken link errors were reported by the Docusaurus build.
- All added links use relative Markdown paths.

## Validation

Command:

```bash
npm run build
```

Result:

- Pass
- Docusaurus generated static files in `build`.

Warning:

- Docusaurus update check could not access `/Users/akhileshbamhore/.config`.
- This warning did not fail the build and is unrelated to the cross-linking task.

## Recommended Next Batch

Next low-risk batch:

- Add links for JavaScript utility topics:
  - Debounce
  - Throttle
  - Memoization
- Candidate canonical owners from the decision plan:
  - Concepts: `docs/web-development/javascript/advanced-js.md`
  - Implementations: `docs/web-development/javascript/javascript-coding-questions.md`
- Candidate related pages:
  - `docs/web-development/companies/agoda/screening-round.md`
  - `docs/web-development/companies/agoda/index.md`
  - `docs/system-design/system-design-questions/autocomplete.md`
  - `docs/system-design/system-design-questions/google-docs.md`

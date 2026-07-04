Before making changes, read:

- PROJECT_REQUIREMENTS.md
- AI_PROJECT_CONTEXT.md
- KNOWLEDGE_ARCHITECTURE.md
- DECISIONS.md
- .knowledge/knowledge-rules.yaml
- .knowledge/migration-log.md
- .github/copilot-instructions.md

Task:

Migrate only the approved section named by the user from `source-notes/` into `docs/`.

Rules:

- Do not modify `source-notes/`.
- Do not migrate unrelated sections.
- Preserve original wording as much as possible.
- Do not rewrite, summarize, improve, or delete user knowledge unless explicitly asked.
- Preserve code blocks, examples, images, interview questions, and answers.
- Use the approved hierarchy from `KNOWLEDGE_ARCHITECTURE.md`.
- Search existing docs before creating pages.
- Prefer canonical pages over duplicates.
- If uncertain, place content in the closest page and add `TODO: Manual Review`.
- Update `.knowledge/migration-log.md` and `.knowledge/knowledge-map.yaml` when structure changes.

Validation:

- Run `npm run build`.

Report:

- Files created
- Files modified
- Content that could not be confidently mapped
- TODO items added
- Build result

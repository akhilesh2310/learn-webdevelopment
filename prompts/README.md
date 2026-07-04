# Prompts

This folder contains reusable Codex prompts only.

Project architecture and decision documents live at the repository root:

- `PROJECT_REQUIREMENTS.md`
- `AI_PROJECT_CONTEXT.md`
- `KNOWLEDGE_ARCHITECTURE.md`
- `DECISIONS.md`
- `.knowledge/`

## Which Prompt To Use

- Use `prompts/add-new-knowledge.md` when adding newly learned technical knowledge to the repository.
- Use `prompts/migrate-section.md` when migrating one approved section from `source-notes/` into `docs/`.
- Use `prompts/review-existing-doc.md` when auditing an existing documentation page for duplicates, missing links, structure, or quality issues.
- Use `prompts/improve-doc-quality.md` when improving an existing migrated doc after content preservation has already been verified.

## Archived Prompts

- `prompts/archive/setup-knowledge-system.md`: one-time setup prompt preserved for history.

## General Rules

- Read `AI_PROJECT_CONTEXT.md`, `PROJECT_REQUIREMENTS.md`, `KNOWLEDGE_ARCHITECTURE.md`, and `.knowledge/` before structural edits.
- Do not modify `source-notes/` unless explicitly requested.
- Search before creating docs.
- Prefer canonical pages over duplicate pages.
- Add uncertain decisions to `.knowledge/review-queue.yaml`.

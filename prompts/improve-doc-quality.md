Before making changes, read:

- PROJECT_REQUIREMENTS.md
- AI_PROJECT_CONTEXT.md
- KNOWLEDGE_ARCHITECTURE.md
- DECISIONS.md
- .knowledge/knowledge-rules.yaml
- .github/copilot-instructions.md

Task:

Improve the documentation page named by the user.

Rules:

- Improve only the requested page or section.
- Preserve user knowledge and technical meaning.
- Do not remove examples, code blocks, interview questions, answers, or images.
- Do not summarize away details.
- Keep headings clean and scannable.
- Improve structure, links, clarity, and interview revision usefulness.
- Search for the canonical topic page before adding duplicated explanations.
- Add cross-links instead of duplicating content when another canonical page already owns the topic.
- Do not create new top-level categories without approval.

Validation:

- Run `npm run build` when the change could affect Docusaurus parsing, links, or navigation.

Report:

- Files modified
- Improvements made
- Content preserved
- Cross-links added
- Build result, if run

This is a foundational architecture task.

Do not modify any documentation content.

Do not migrate Google Docs.

Do not create documentation pages.

Do not modify files under source-notes.

Only create or update project guidance documents that define how this repository should be organized and maintained.

If any future workflow depends on assumptions, document those assumptions rather than implementing them.



Before making any changes, read:

- PROJECT_REQUIREMENTS.md
- AI_PROJECT_CONTEXT.md
- .github/copilot-instructions.md

We are evolving this project from a documentation website into a long-term Personal Technical Knowledge Base.

The documentation website is only the presentation layer.

The real asset is the Knowledge Base.

I want you to design the architecture that allows this repository to grow for many years without becoming disorganized or containing duplicate information.

Create the following documents:

1. KNOWLEDGE_ARCHITECTURE.md
2. WORKFLOWS.md

-----------------------------------------

KNOWLEDGE_ARCHITECTURE.md

This document should define:

- Purpose of the knowledge base
- Philosophy
- Canonical topic ownership
- Folder hierarchy
- Category hierarchy
- Naming conventions
- One Topic → One Canonical Document rule
- Duplicate detection strategy
- Merge strategy
- Cross-linking strategy
- Related Topics strategy
- Knowledge lifecycle
- Rules for creating new pages
- Rules for updating existing pages
- Image management strategy
- Code example strategy
- Interview notes strategy
- Future scalability

-----------------------------------------

WORKFLOWS.md

Document all standard workflows including:

Workflow 1
Create new documentation page

Workflow 2
Add newly learned knowledge

Workflow 3
Merge duplicate content

Workflow 4
Review existing page

Workflow 5
Refactor large page

Workflow 6
Reorganize documentation

Workflow 7
Import Google Docs content

Workflow 8
Review AI-generated content

Workflow 9
Publish website

Workflow 10
Maintain long-term quality

-----------------------------------------

Design the knowledge architecture so that:

Every technical topic has exactly one canonical home.

Examples:

Closures
Event Loop
React.memo
useMemo
HTTP
JWT
Redis

Each topic must live in only one document.

Every other document should reference it instead of copying it.

The AI should always search the repository before creating a new page.

The AI should prefer updating existing documentation over creating duplicate documentation.

Keep the architecture simple, scalable and maintainable.

Explain your design decisions.
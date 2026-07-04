Before making any changes, read AI_PROJECT_CONTEXT.md and PROJECT_REQUIREMENTS.md, then follow them strictly.

To add new contet:
Process this using prompts/add-new-knowledge.md


For images: 
Before migrating documentation, inspect all files inside source-notes.

Task:
1. Scan all Markdown files.
2. Detect embedded Base64 images.
3. Count them.
4. Report:
   - filename
   - approximate image size
   - nearest heading where the image appears
5. Do NOT modify any files.
6. Do NOT migrate images yet.
7. Recommend an extraction strategy for Docusaurus using the static/img directory.
8. Estimate how many image files would be created.


Read KNOWLEDGE_ARCHITECTURE.md and follow the defined knowledge hierarchy.

Read:

- PROJECT_REQUIREMENTS.md
- AI_PROJECT_CONTEXT.md
- KNOWLEDGE_ARCHITECTURE.md
- WORKFLOWS.md
- .knowledge/*

Then process the new content according to the project rules.



1.

Before making any changes, read:

- PROJECT_REQUIREMENTS.md
- AI_PROJECT_CONTEXT.md
- .github/copilot-instructions.md

Task:
Migrate ONLY the System Design notes from:

source-notes/System Design.md

Do NOT touch:

- source-notes/
- DSA
- Web Development

This task is ONLY for System Design.

======================================================

IMPORTANT MIGRATION RULES

1. source-notes/System Design.md is the ONLY source of truth.

2. Never modify source-notes.

3. Preserve every piece of content.

4. Do NOT rewrite.

5. Do NOT summarize.

6. Do NOT improve grammar.

7. Preserve code blocks.

8. Preserve examples.

9. Preserve interview questions.

10. Preserve images.

11. If unsure where content belongs,
keep it in the closest page and insert:

TODO: Manual Review

Never lose information.

======================================================

KNOWN INFORMATION

System Design contains exactly SIX main sidebar items.

The hierarchy is already known.

Do NOT infer top-level categories from Markdown headings.

======================================================

DIRECT SIDEBAR PAGES

These are normal pages.

- Interview Pattern
- Basic Concepts
- Resources
- Worked 22nd Aug

======================================================

COLLAPSIBLE CATEGORY

System Design Questions

This is a collapsible category.

Inside it there are approximately 19 child pages.

Examples include:

- Autocomplete
- Google Search

and other System Design interview problems detected from source-notes.

Each interview problem should become its own markdown page.

Do not merge multiple interview problems together.

======================================================

COLLAPSIBLE CATEGORY

DSA Roadmap

This is a collapsible category.

Currently contains:

- Solved

If additional child pages are detected from source-notes,
include them.

======================================================

EXPECTED STRUCTURE

docs/

system-design/

    interview-pattern.md

    basic-concepts.md

    resources.md

    worked-22nd-aug.md

    system-design-questions/

        _category_.json

        autocomplete.md

        google-search.md

        ...

    dsa-roadmap/

        _category_.json

        solved.md

======================================================

SIDEBAR

Sidebar should become:

System Design

Interview Pattern

Basic Concepts

Resources

System Design Questions

    Autocomplete

    Google Search

    ...

DSA Roadmap

    Solved

Worked 22nd Aug

======================================================

CONTENT PLACEMENT

Use the known hierarchy first.

Only use Markdown headings to identify child pages.

Do NOT treat every # heading as a sidebar item.

A heading should become a page ONLY if it represents an actual System Design topic.

Otherwise it should remain as a heading inside the current page.

======================================================

VALIDATION

Run

npm run build

Verify

- no broken sidebar

- no duplicate pages

- no empty pages

- no orphan pages

======================================================

REPORT

Provide

1. Files created

2. Files modified

3. Child pages detected

4. Any TODO items

5. Any headings that could not be confidently categorized

6. Build result

======================================================

IMPORTANT

This migration should prioritize preserving my original knowledge over aggressively splitting documentation.

Prefer fewer, well-organized pages rather than many tiny pages.

If a System Design interview problem naturally belongs in one page, keep it in one page.

Do not optimize content.

Do not improve content.

Do not lose content.

Only organize it according to the approved hierarchy.



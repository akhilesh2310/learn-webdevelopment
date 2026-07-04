# GitHub Copilot Instructions

This repository is a Docusaurus documentation website for personal study notes.

## Core Rules

- Keep top navigation limited to Home, DSA, Web Development, and System Design.
- Do not add or re-enable a blog.
- Do not flatten the documentation hierarchy.
- Use kebab-case for folder and file names.
- Use `index.md` for category landing pages.
- Use `_category_.json` for Docusaurus category labels, ordering, and links.
- Prefer Markdown for notes and MDX only when React components are needed.
- Do not introduce unnecessary libraries.

## Documentation Structure

- Google Docs tabs should become category folders.
- Google Docs sub-tabs should become nested category folders.
- Individual topics should become individual Markdown or MDX pages.
- Keep the structure scalable for hundreds of pages.

## Editing Rules

- Check `AI_PROJECT_CONTEXT.md` before structural changes.
- Update `AI_PROJECT_CONTEXT.md` after structural changes.
- Preserve useful existing content.
- Prefer small focused changes.
- Keep markdown headings clean.
- Use TypeScript where applicable.
- Avoid overengineering.

## Preserve Docusaurus Features

Do not remove support for:

- dark mode
- sidebars
- breadcrumbs
- table of contents
- previous/next navigation
- syntax highlighting
- responsive layout

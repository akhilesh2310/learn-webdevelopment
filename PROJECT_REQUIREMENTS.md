# Project Requirements

## Overview

This project is a long-term personal study notes website built with Docusaurus, TypeScript, React, and Markdown/MDX.

The goal is to create a clean, scalable documentation website for interview preparation and quick revision, similar in quality and organization to React Docs, Next.js Docs, and MDN, but focused on personal learning notes.

## Website Goals

- Provide a structured home for study notes across multiple technical areas.
- Keep content easy to browse through top navigation, sidebars, breadcrumbs, and table of contents.
- Support hundreds of documentation pages over several years.
- Make future migration from Google Docs predictable and maintainable.
- Preserve Docusaurus defaults wherever possible instead of building custom systems.

## Tech Stack

- Docusaurus
- TypeScript
- React
- Markdown and MDX
- GitHub Pages for deployment later

## Top Navigation

The top navigation must contain only these items:

- Home
- DSA
- Web Development
- System Design

Do not add Blog, GitHub, Tutorial, or other top-level navigation items unless the project requirements change.

## Documentation Categories

The current migrated sidebar categories come from the source Google Docs exports. Treat only the known Google Docs tab names below as first-level sidebar categories. Other exported `#` headings should remain child pages under the active known category unless a future review explicitly promotes them.

### DSA

- Resources
- Concepts
- Recently Asked
- JS vs JAVA
- Toll Increase
- Problems Solved

### Web Development

- Interview Prep Order
- Companies
- Important
- JavaScript
- TypeScript
- React
- Next.js
- Node.js
- HTML & CSS
- Angular
- Video Tutorial

### System Design

- Interview Pattern
- Basic Concepts
- Resources
- System Design Questions
- DSA Roadmap
- Worked 22nd Aug

## Long-Term Requirements

- Do not flatten the documentation hierarchy.
- Google Docs tabs should become documentation categories.
- Google Docs sub-tabs should become subcategories or folders.
- Each topic should become an individual Markdown or MDX page.
- Folder and file names should use kebab-case.
- Use simple, clean, maintainable Docusaurus patterns.
- Do not introduce unnecessary UI libraries or documentation tooling.
- Preserve dark mode, sidebars, breadcrumbs, table of contents, previous/next navigation, and syntax highlighting.
- Keep the structure friendly to future search integration.

## Long-Term Knowledge Base Requirements

- The system should support continuous learning over many years.
- New knowledge should be merged into the right canonical page whenever possible.
- Duplicate content should be avoided by searching existing docs before creating new pages.
- The hierarchy can evolve, but major structural changes require approval.
- The website should remain easy to revise before interviews.
- `.knowledge/knowledge-map.yaml` should track canonical topic locations as the knowledge base matures.
- `.knowledge/review-queue.yaml` should capture uncertain placement or merge decisions instead of guessing.

## AI Editing Rules

- Explain planned changes before editing.
- Do not delete useful content.
- Prefer small focused changes.
- Keep folder and file names kebab-case.
- Keep markdown headings clean.
- Use TypeScript where applicable.
- Avoid overengineering.

## Structural Change Rules

- Before making structural changes, first check `AI_PROJECT_CONTEXT.md`.
- After changing structure, update `AI_PROJECT_CONTEXT.md`.
- Keep `PROJECT_REQUIREMENTS.md` aligned with major product or architecture changes.
- Validate Docusaurus changes with `npm run typecheck` and `npm run build` when practical.

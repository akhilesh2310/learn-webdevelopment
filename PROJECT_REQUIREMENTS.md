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

### DSA

- Arrays
- Strings
- Linked List
- Trees
- Graphs
- Dynamic Programming

### Web Development

- JavaScript
- TypeScript
- HTML & CSS
- React
- Next.js
- Node.js
- Angular

### System Design

- Frontend
- Backend
- Networking
- Databases
- Caching
- Security
- Docker
- Kubernetes

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

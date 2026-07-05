# Decisions

## Decision 001: Personal Technical Knowledge Base

This repository is a Personal Technical Knowledge Base.

## Decision 002: Docusaurus Presentation Layer

Docusaurus is the presentation layer.

## Decision 003: Docs As Source Of Truth

Markdown/MDX docs are the source of truth after migration.

Reason:
The website is generated from the knowledge base. Docusaurus presents the content, but the Markdown/MDX files own the knowledge.

## Decision 004: Source Notes Archive

`source-notes/` is a read-only archive.

Reason:
Google Docs exports are preserved for history after migration. Future editing happens in this repository.

## Decision 005: Canonical Topic Documents

One topic should have one canonical document.

Reason:
This avoids duplicate knowledge. For example, Event Loop should live in one canonical page such as `docs/web-development/javascript/event-loop.md`; interview question pages should link to it instead of duplicating the same explanation.

## Decision 006: Top-Level Category Approval

New top-level categories require user approval.

## Decision 007: Search Before Creating Or Moving

AI must search before creating or moving content.

## Decision 008: Plan Large Restructuring

Large restructuring should be planned before execution.

## Decision 009: Base64 Image Cleanup

Base64 images should be extracted into real image files in a later image cleanup phase.

## Decision 010: Approved Deduplication Ownership Rules

Date: 2026-07-05

Duplicate cleanup must follow the approved ownership rules in `approved-deduplication-decisions.md`.

Summary:
Company pages keep interview context, Quick Questions becomes quick revision/index style, System Design Basic Concepts keeps system-design-facing summaries, React Fiber remains a separate deep dive, Reconciliation 1 is canonical, TypeScript ownership is split by concepts/examples/interview Q&A, Micro Frontends will become canonical later, caching remains split by domain, and no knowledge should be lost during deduplication.

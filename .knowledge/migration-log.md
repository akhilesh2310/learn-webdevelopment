# Migration Log

This log records where original Google Docs content was migrated and what migration state is currently known.

## Source Notes

- `source-notes/1. DSA.md`
- `source-notes/2. Web Development.md`
- `source-notes/3. System Design.md`

## Migration Status

- DSA: migrated
- System Design: migrated
- Web Development: migrated and audited

## Migration Summary

- DSA was migrated into direct pages under `docs/dsa/`.
- System Design was migrated into direct pages and approved categories under `docs/system-design/`.
- Web Development was migrated into the approved hierarchy under `docs/web-development/`.
- `migration-audit.md` reports that the current Docusaurus sidebars build successfully.
- `migration-audit.md` identifies TODO-only pages and Base64 image cleanup as follow-up work.

## Structural Cleanup

- 2026-07-06: System Design was restructured into a reduced, study-friendly sidebar:
  - `system-design-basics/`
  - `core-concepts/`
  - `frontend-system-design/`
  - `backend-distributed-system-design/`
  - `data-storage-design/`
  - `api-communication-design/`
  - `cloud-devops-infra/`
  - `security-system-design/`
  - `system-design-question-bank/`
  - `system-design-templates/`
- Existing content from the old `interview-guide/` and `system-design-questions/` folders was moved or merged into the new structure without intentional content deletion.
- Small concept topics were kept as headings inside grouped study pages with TODO markers where no notes exist yet.
- Low-information placeholder design problems were grouped into `docs/system-design/system-design-question-bank/company-asked.md` to avoid an overly long sidebar.
- 2026-07-06: Coding Round notes were moved from `docs/system-design/system-design-basics/interview-framework.md` to `docs/dsa/coding-round.md`. System Design now links to the DSA canonical page instead of duplicating the content.
- 2026-07-06: Web Development was restructured from the vague `important/` and `node-js/` folders into explicit study sections:
  - `core-engineering/`
  - `frontend-architecture/`
  - `performance/`
  - `security-auth/`
  - `testing-quality/`
  - `ux-design-system/`
  - `build-devops-delivery/`
  - `backend-for-frontend-node-js/`
- Existing notes were moved without intentional content deletion. Angular and HTML & CSS were left unchanged.

## Important Rules

- `source-notes/` is read-only.
- `docs/` is the working source of truth after migration.
- Future changes should happen in `docs/`, not `source-notes/`.
- `source-notes/` should be preserved as historical backup.
- Update this log after source-note migration, major movement, or structural cleanup.

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

## Important Rules

- `source-notes/` is read-only.
- `docs/` is the working source of truth after migration.
- Future changes should happen in `docs/`, not `source-notes/`.
- `source-notes/` should be preserved as historical backup.
- Update this log after source-note migration, major movement, or structural cleanup.

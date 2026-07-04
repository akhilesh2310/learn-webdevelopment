# Image Cleanup Report

Date: 2026-07-04

Scope: Extracted Base64 images from active documentation in docs/ into static/img/docs/.

## Summary

- Files processed: 9
- Images extracted: 22
- Markdown files updated: 9
- Images skipped: 0
- Errors: 0
- Source-notes Base64 images intentionally ignored: 22
- Current docs Markdown size after cleanup: 1.46 MB
- Extracted image asset size: 1.32 MB
- Before/after estimate: the extraction script reported docs Markdown changed from 3.22 MB to 1.46 MB, reducing Markdown by about 1.76 MB while adding about 1.32 MB of image assets.

## Files Processed

- docs/system-design/system-design-questions/autocomplete.md - 5 extracted image reference(s)
- docs/system-design/system-design-questions/google-docs.md - 1 extracted image reference(s)
- docs/system-design/worked-22nd-aug.md - 6 extracted image reference(s)
- docs/web-development/angular.md - 2 extracted image reference(s)
- docs/web-development/companies/agoda/platform-round-2.md - 2 extracted image reference(s)
- docs/web-development/html-css.md - 2 extracted image reference(s)
- docs/web-development/javascript/event-loop.md - 1 extracted image reference(s)
- docs/web-development/javascript/javascript-under-the-hood/browser-rendering-pipeline.md - 2 extracted image reference(s)
- docs/web-development/react-js/folder-structure.md - 1 extracted image reference(s)

## Images Extracted

- static/img/docs/system-design/system-design-questions/autocomplete/autocomplete-01.png -> /img/docs/system-design/system-design-questions/autocomplete/autocomplete-01.png (42.8 KB)
- static/img/docs/system-design/system-design-questions/autocomplete/autocomplete-02.png -> /img/docs/system-design/system-design-questions/autocomplete/autocomplete-02.png (42.6 KB)
- static/img/docs/system-design/system-design-questions/autocomplete/autocomplete-03.png -> /img/docs/system-design/system-design-questions/autocomplete/autocomplete-03.png (34.9 KB)
- static/img/docs/system-design/system-design-questions/autocomplete/autocomplete-04.png -> /img/docs/system-design/system-design-questions/autocomplete/autocomplete-04.png (37.2 KB)
- static/img/docs/system-design/system-design-questions/autocomplete/autocomplete-05.png -> /img/docs/system-design/system-design-questions/autocomplete/autocomplete-05.png (56.7 KB)
- static/img/docs/system-design/system-design-questions/google-docs/google-docs-01.png -> /img/docs/system-design/system-design-questions/google-docs/google-docs-01.png (211.7 KB)
- static/img/docs/system-design/worked-22nd-aug/worked-22nd-aug-01.png -> /img/docs/system-design/worked-22nd-aug/worked-22nd-aug-01.png (85.5 KB)
- static/img/docs/system-design/worked-22nd-aug/worked-22nd-aug-02.png -> /img/docs/system-design/worked-22nd-aug/worked-22nd-aug-02.png (27.8 KB)
- static/img/docs/system-design/worked-22nd-aug/worked-22nd-aug-03.png -> /img/docs/system-design/worked-22nd-aug/worked-22nd-aug-03.png (46.8 KB)
- static/img/docs/system-design/worked-22nd-aug/worked-22nd-aug-04.png -> /img/docs/system-design/worked-22nd-aug/worked-22nd-aug-04.png (49.7 KB)
- static/img/docs/system-design/worked-22nd-aug/worked-22nd-aug-05.png -> /img/docs/system-design/worked-22nd-aug/worked-22nd-aug-05.png (83.1 KB)
- static/img/docs/system-design/worked-22nd-aug/worked-22nd-aug-06.png -> /img/docs/system-design/worked-22nd-aug/worked-22nd-aug-06.png (69.7 KB)
- static/img/docs/web-development/angular/angular-01.png -> /img/docs/web-development/angular/angular-01.png (17.4 KB)
- static/img/docs/web-development/angular/angular-02.png -> /img/docs/web-development/angular/angular-02.png (41.3 KB)
- static/img/docs/web-development/companies/agoda/platform-round-2/platform-round-2-01.png -> /img/docs/web-development/companies/agoda/platform-round-2/platform-round-2-01.png (84.8 KB)
- static/img/docs/web-development/companies/agoda/platform-round-2/platform-round-2-02.png -> /img/docs/web-development/companies/agoda/platform-round-2/platform-round-2-02.png (36.7 KB)
- static/img/docs/web-development/html-css/html-css-01.png -> /img/docs/web-development/html-css/html-css-01.png (94.9 KB)
- static/img/docs/web-development/html-css/html-css-02.png -> /img/docs/web-development/html-css/html-css-02.png (42.0 KB)
- static/img/docs/web-development/javascript/event-loop/event-loop-01.png -> /img/docs/web-development/javascript/event-loop/event-loop-01.png (43.1 KB)
- static/img/docs/web-development/javascript/javascript-under-the-hood/browser-rendering-pipeline/browser-rendering-pipeline-01.png -> /img/docs/web-development/javascript/javascript-under-the-hood/browser-rendering-pipeline/browser-rendering-pipeline-01.png (8.0 KB)
- static/img/docs/web-development/javascript/javascript-under-the-hood/browser-rendering-pipeline/browser-rendering-pipeline-02.png -> /img/docs/web-development/javascript/javascript-under-the-hood/browser-rendering-pipeline/browser-rendering-pipeline-02.png (27.4 KB)
- static/img/docs/web-development/react-js/folder-structure/folder-structure-01.png -> /img/docs/web-development/react-js/folder-structure/folder-structure-01.png (170.8 KB)

## Markdown Files Updated

- docs/system-design/system-design-questions/autocomplete.md
- docs/system-design/system-design-questions/google-docs.md
- docs/system-design/worked-22nd-aug.md
- docs/web-development/angular.md
- docs/web-development/companies/agoda/platform-round-2.md
- docs/web-development/html-css.md
- docs/web-development/javascript/event-loop.md
- docs/web-development/javascript/javascript-under-the-hood/browser-rendering-pipeline.md
- docs/web-development/react-js/folder-structure.md

## Images Skipped

- None

## Errors

- None

## Source Notes Ignored

source-notes/ was intentionally not modified. Base64 occurrences still present there:

- source-notes/2. Web Development.md - 10
- source-notes/3. System Design.md - 12

## Notes

- Only Base64 image data inside docs/ was replaced.
- Existing image files were not deleted.
- Broken non-Base64 image references listed in image-cleanup-audit.md were not fixed in this task.

## Validation

Command:

```bash
npm run build
```

Result:

- Pass
- Docusaurus generated static files in `build`.

Warning:

- Docusaurus update check failed because it could not access `/Users/akhileshbamhore/.config`.
- This warning did not fail the build and is unrelated to image extraction.

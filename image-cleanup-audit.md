# Image Cleanup Audit

Date: 2026-07-04

Scope:

- `docs/`
- `source-notes/`

This is an audit-only report. No documentation content, source notes, or image assets were modified.

## Summary

- Total Base64 images in `docs/`: 22
- Total Base64 images in `source-notes/`: 22
- Total normal image references detected: 34
- Normal image references in `docs/`: 12
- Normal image references in `source-notes/`: 22
- Total broken local image references detected: 24
- Broken local image references in `docs/`: 12
- Broken local image references in `source-notes/`: 12
- Image references from `docs/` into `source-notes/`: 0
- Existing image asset files under `static/img/`, `source-notes/`, and `docs/`: 17

Notes:

- `docs/` is the active documentation source after migration.
- `source-notes/` is a read-only historical archive and should remain unchanged.
- All detected Base64 images are PNG images.

## Docs Base64 Images

### `docs/system-design/system-design-questions/autocomplete.md`

- Count: 5
- Total approximate size: 214.1 KB
- Image type: PNG
- Nearest heading/title: `**Follow-up Enhancements**`
- Images:
  - 01: 42.8 KB
  - 02: 42.6 KB
  - 03: 34.9 KB
  - 04: 37.2 KB
  - 05: 56.7 KB

### `docs/system-design/system-design-questions/google-docs.md`

- Count: 1
- Total approximate size: 211.7 KB
- Image type: PNG
- Nearest heading/title: `**🎯 Final Notes for the Interviewer**`
- Images:
  - 01: 211.7 KB

### `docs/system-design/worked-22nd-aug.md`

- Count: 6
- Total approximate size: 362.5 KB
- Image type: PNG
- Nearest heading/title: `**Back-of-the-Envelope Estimations**`
- Images:
  - 01: 85.5 KB
  - 02: 27.8 KB
  - 03: 46.8 KB
  - 04: 49.7 KB
  - 05: 83.1 KB
  - 06: 69.7 KB

### `docs/web-development/angular.md`

- Count: 2
- Total approximate size: 58.7 KB
- Image type: PNG
- Nearest heading/title: `Security Principles?`
- Images:
  - 01: 17.4 KB
  - 02: 41.3 KB

### `docs/web-development/companies/agoda/platform-round-2.md`

- Count: 2
- Total approximate size: 121.5 KB
- Image type: PNG
- Nearest heading/title: `**7\\. Monitoring & Observability**`
- Images:
  - 01: 84.8 KB
  - 02: 36.7 KB

### `docs/web-development/html-css.md`

- Count: 2
- Total approximate size: 136.9 KB
- Image type: PNG
- Nearest heading/title: `What is prefetch and preconnect`
- Images:
  - 01: 94.9 KB
  - 02: 42.0 KB

### `docs/web-development/javascript/event-loop.md`

- Count: 1
- Total approximate size: 43.1 KB
- Image type: PNG
- Nearest heading/title: `**Golden Rule : Always remember:**`
- Images:
  - 01: 43.1 KB

### `docs/web-development/javascript/javascript-under-the-hood/browser-rendering-pipeline.md`

- Count: 2
- Total approximate size: 35.4 KB
- Image type: PNG
- Nearest heading/title: `**Senior-Level Interview Summary**`
- Images:
  - 01: 8.0 KB
  - 02: 27.4 KB

### `docs/web-development/react-js/folder-structure.md`

- Count: 1
- Total approximate size: 170.8 KB
- Image type: PNG
- Nearest heading/title: `7. Folder Structure`
- Images:
  - 01: 170.8 KB

## Source Notes Base64 Images

### `source-notes/2. Web Development.md`

- Count: 10
- Total approximate size: 566.4 KB
- Image type: PNG
- Note: `source-notes/` should remain unchanged.

### `source-notes/3. System Design.md`

- Count: 12
- Total approximate size: 788.3 KB
- Image type: PNG
- Note: `source-notes/` should remain unchanged.

## Normal Image References

### Valid normal image references

- `source-notes/2. Web Development/2.WebDevelopment.html` references 10 local images under `source-notes/2. Web Development/images/`.

### Image references pointing to `source-notes/`

- No image references from `docs/` to `source-notes/` were detected.

### Broken local image references in `docs/`

- `docs/web-development/important/accessibility.md`
  - `dog.jpg` -> expected `docs/web-development/important/dog.jpg`
  - `divider.png` -> expected `docs/web-development/important/divider.png`
- `docs/web-development/important/performance/index.md`
  - `hero.jpg` -> expected `docs/web-development/important/performance/hero.jpg`
  - `hero.jpg` -> expected `docs/web-development/important/performance/hero.jpg`
- `docs/web-development/important/performance/react-performance.md`
  - `/hero.jpg` -> expected root/static path `hero.jpg`
- `docs/web-development/javascript/javascript-under-the-hood/browser-rendering-pipeline.md`
  - `hotel.jpg` -> expected `docs/web-development/javascript/javascript-under-the-hood/hotel.jpg`
  - `hotel.jpg` -> expected `docs/web-development/javascript/javascript-under-the-hood/hotel.jpg`
  - `banner.jpg` -> expected `docs/web-development/javascript/javascript-under-the-hood/banner.jpg`
  - `banner.jpg` -> expected `docs/web-development/javascript/javascript-under-the-hood/banner.jpg`
- `docs/web-development/javascript/javascript-under-the-hood/index.md`
  - `hotel.jpg` -> expected `docs/web-development/javascript/javascript-under-the-hood/hotel.jpg`
  - `hotel.jpg` -> expected `docs/web-development/javascript/javascript-under-the-hood/hotel.jpg`
- `docs/web-development/react-js/fundamentals/index.md`
  - `/logo.png` -> expected root/static path `logo.png`

### Broken local image references in `source-notes/`

These are in the read-only archive and should not be fixed in place.

- `source-notes/2. Web Development.md`
  - `hero.jpg` appears twice
  - `/hero.jpg` appears once
  - `dog.jpg` appears once
  - `divider.png` appears once
  - `hotel.jpg` appears four times
  - `banner.jpg` appears twice
  - `/logo.png` appears once

## Existing Image Assets

### `static/img/`

- `static/img/docusaurus-social-card.jpg` - 54 KB
- `static/img/docusaurus.png` - 5.0 KB
- `static/img/favicon.ico` - 3.5 KB
- `static/img/logo.svg` - 6.3 KB
- `static/img/undraw_docusaurus_mountain.svg` - 31 KB
- `static/img/undraw_docusaurus_react.svg` - 35 KB
- `static/img/undraw_docusaurus_tree.svg` - 12 KB

### `source-notes/`

- `source-notes/2. Web Development/images/image1.png` - 35 KB
- `source-notes/2. Web Development/images/image2.png` - 348 KB
- `source-notes/2. Web Development/images/image3.png` - 246 KB
- `source-notes/2. Web Development/images/image4.png` - 236 KB
- `source-notes/2. Web Development/images/image5.png` - 40 KB
- `source-notes/2. Web Development/images/image6.png` - 642 KB
- `source-notes/2. Web Development/images/image7.png` - 218 KB
- `source-notes/2. Web Development/images/image8.png` - 128 KB
- `source-notes/2. Web Development/images/image9.png` - 40 KB
- `source-notes/2. Web Development/images/image10.png` - 803 KB

### `docs/`

- No standalone image asset files were detected under `docs/`.

## Recommended Extraction Plan

Preferred target root:

```text
static/img/docs/
```

Suggested structure:

```text
static/img/docs/
  web-development/
  dsa/
  system-design/
```

Use a path that mirrors the documentation page path. For example:

```text
docs/web-development/javascript/javascript-fundamentals/event-loop.md
```

should save images under:

```text
static/img/docs/web-development/javascript/javascript-fundamentals/event-loop/
```

and Markdown should reference them as:

```md
![Alt text](/img/docs/web-development/javascript/javascript-fundamentals/event-loop/event-loop-01.png)
```

Recommended naming pattern:

```text
<page-slug>-01.png
<page-slug>-02.png
<page-slug>-03.png
```

Recommended extraction order:

1. Extract `docs/` Base64 images first because `docs/` is the active source.
2. Do not modify `source-notes/`; use it only as a backup for verification.
3. For each changed doc, replace one Base64 image with one stable Markdown image reference.
4. Keep commits small by processing one domain or folder at a time.
5. After each batch, run `npm run build`.
6. After Base64 extraction, separately review broken normal image references such as `hero.jpg`, `hotel.jpg`, `banner.jpg`, `dog.jpg`, `divider.png`, and `/logo.png`.

## Risks

- Large Markdown files: Base64 images inflate Markdown size and make review difficult.
- Git diff noise: replacing Base64 data will create large diffs even when content meaning does not change.
- Duplicate Base64 images: some source-note images appear to have been migrated into multiple doc locations; extraction should avoid writing duplicate files when identical image data is reused.
- Image naming issues: generic names like `image1.png`, `hero.jpg`, and `banner.jpg` are not descriptive enough for long-term docs.
- Possible broken references: several HTML examples use local image paths that do not exist in the migrated docs.
- Docusaurus path behavior: root paths like `/hero.jpg` will not work unless the file exists at the correct static output location.
- Archive mismatch: `source-notes/2. Web Development/2.WebDevelopment.html` has a valid local `images/` folder, while `source-notes/2. Web Development.md` has broken local references and embedded Base64 data.

## Next Step

Recommended next action:

Create a dedicated extraction task for `docs/` only:

```text
Extract Base64 images from migrated docs into static/img/docs/, update Markdown references, do not modify source-notes/, then run npm run build.
```

Start with a small batch:

```text
docs/web-development/javascript/event-loop.md
docs/web-development/javascript/javascript-under-the-hood/browser-rendering-pipeline.md
```

These files contain only 3 total Base64 images, making them a low-risk first extraction batch.

## Build Result

Command:

```bash
npm run build
```

Result:

- Pass
- Docusaurus generated static files in `build`.

Warning:

- Docusaurus update check failed because it could not access `/Users/akhileshbamhore/.config`.
- This warning did not fail the build and is unrelated to image cleanup.

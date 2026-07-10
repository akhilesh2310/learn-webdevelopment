---
title: Browser Rendering Pipeline
sidebar_position: 4
---

# Browser Rendering Pipeline

The browser rendering pipeline is the sequence of work a browser performs to turn HTML, CSS, and JavaScript into pixels on the screen.

## High-Level Flow

![][image3]

```text
HTML
  -> DOM
CSS
  -> CSSOM
DOM + CSSOM
  -> Render Tree
  -> Layout
  -> Paint
  -> Rasterization
  -> Compositing
  -> Screen Pixels
```

## 1. DOM Construction

The browser receives HTML and parses it into a DOM (Document Object Model).

```html
<body>
  <h1>Hello</h1>
  <p>Welcome</p>
</body>
```

```text
Document
└── body
    ├── h1
    │   └── "Hello"
    └── p
        └── "Welcome"
```

### Key Points

- DOM is an N-ary tree structure.
- Every element becomes a node.
- Parent-child relationships are maintained.
- Browsers maintain internal indexes for fast lookups such as `document.getElementById("header")`.

## 2. CSSOM Construction

The browser parses CSS files and style tags into the CSS Object Model (CSSOM).

```css
h1 {
  color: blue;
}

p {
  color: gray;
}
```

```text
Stylesheet
├── h1 -> color: blue
└── p  -> color: gray
```

### Key Points

- CSSOM contains styling rules.
- CSS is render-blocking because the browser needs styles before rendering.
- CSS inheritance and specificity are resolved here.

## 3. Render Tree Generation

The browser combines the DOM and CSSOM to create the render tree.

```text
DOM + CSSOM = Render Tree
```

The render tree is a hierarchical layout-object tree. It maps visible DOM content to computed display styles and includes only nodes that affect visual output.

### Example

```html
<div>Hello</div>
<div style="display: none">Hidden</div>
```

```text
Render Tree
└── div -> Hello
```

The `display: none` element is excluded.

| Trait | DOM Tree | Render Tree |
| :---- | :---- | :---- |
| Node scope | Contains all structural elements. | Contains only visible elements. |
| Structural match | Includes `<head>`, `<script>`, and `display: none`. | Drops hidden elements completely. |
| Visibility behavior | Includes elements with `visibility: hidden`. | Includes `visibility: hidden` because it still allocates layout space. |
| Style context | Raw structural node data. | Includes calculated, computed styles. |

## 4. Layout (Reflow)

The browser calculates the exact size and position of every visible element.

### Questions Answered During Layout

- Where should the element appear?
- How wide should it be?
- How tall should it be?
- How much space does it occupy?

### Example

```text
Button
  x: 50px
  y: 100px
  width: 200px
  height: 40px
```

### Why It Is Expensive

A change in one element can affect parents, children, and siblings. Because of this, the browser may need to recalculate large portions of the page.

## 5. Paint

Once layout is complete, the browser paints pixels.

Paint includes:

- Text
- Colors
- Borders
- Backgrounds
- Shadows
- Images

Think of paint as filling pixels onto layers. No position calculations happen here.

## 6. Composite

The browser combines painted layers and sends them to the GPU.

```text
Layer 1
Layer 2
Layer 3
  -> Composite
  -> Screen
```

Compositing is fast because the browser can often move existing layers without running layout or paint again. GPU acceleration is heavily used here.

## Rendering Pipeline Summary

```text
HTML
  -> DOM
  -> CSSOM
  -> Render Tree
  -> Layout
  -> Paint
  -> Composite
  -> Screen
```

## Reflow vs Repaint vs Composite

This is one of the most common senior frontend interview topics.

### Reflow (Layout)

Reflow is triggered by anything that changes geometry.

```js
element.style.width = "200px";
element.style.height = "100px";
element.style.margin = "20px";
```

Pipeline:

```text
Layout -> Paint -> Composite
```

Cost: highest.

### Repaint

Repaint is triggered by visual changes that do not affect layout.

```js
element.style.color = "red";
element.style.background = "blue";
```

Pipeline:

```text
Paint -> Composite
```

Cost: medium.

### Composite

Composite-only updates are triggered by GPU-friendly properties such as `transform` and `opacity`.

```js
element.style.transform = "translateX(100px)";
```

Pipeline:

```text
Composite
```

Cost: lowest.

### Animation Performance Rule

Avoid layout-triggering animation properties:

```js
element.style.left = "100px";
```

Prefer composite-friendly properties:

```js
element.style.transform = "translateX(100px)";
```

For smooth animations, prefer `transform` and `opacity` because they can run entirely in the compositing stage without triggering layout or paint.

## Layout Thrashing (Forced Synchronous Reflow)

Layout thrashing happens when JavaScript repeatedly alternates between DOM reads and writes. This forces the browser to perform multiple synchronous layouts.

### Bad Example

```js
for (const el of elements) {
  const width = el.offsetWidth;
  el.style.width = width + 10 + "px";
}
```

What happens:

```text
Read layout
  -> Write layout
  -> Read layout
  -> Write layout
  -> Read layout
  -> Write layout
```

The browser repeatedly recalculates layout, causing jank, FPS drops, and slow UI.

### Fix 1: Batch Reads and Writes

```js
const widths = elements.map((el) => el.offsetWidth);

elements.forEach((el, i) => {
  el.style.width = widths[i] + 10 + "px";
});
```

Optimized flow:

```text
Read
Read
Read
Write
Write
Write
```

### Fix 2: Use requestAnimationFrame

```js
requestAnimationFrame(() => {
  elements.forEach((el) => {
    el.style.transform = "translateX(10px)";
  });
});
```

This schedules updates before the next paint cycle.

### Interview Answer

Layout thrashing occurs when code alternates between DOM reads and writes, forcing synchronous reflow multiple times. The optimization is to batch reads and writes separately.

## Composite Layers

Modern browsers split the page into layers. Instead of repainting the whole screen, the browser can update individual layers.

### Example

```html
<div class="header"></div>
<div class="sidebar"></div>
<div class="modal"></div>
```

```text
Layer 1 -> Header
Layer 2 -> Sidebar
Layer 3 -> Modal
```

When the modal moves, only the modal layer updates instead of repainting the entire page.

### Layer Promotion

Elements often get their own layer when using:

- `transform`
- `opacity`
- `will-change`
- `position: fixed`
- `video`
- `canvas`

### Interview Answer

Composite layers allow browsers to isolate portions of the page so they can be moved or animated independently without repainting the entire screen.

## GPU Acceleration

Normally rendering happens on the CPU. For some operations, the browser can delegate work to the GPU.

The GPU excels at:

- Transformations
- Scaling
- Rotation
- Opacity
- Compositing

### GPU-Friendly Example

```css
transform: translateX(200px);
```

The browser can move pixels using the GPU.

### Not GPU-Friendly

```css
width: 500px;
height: 500px;
```

These require layout recalculation.

### Interview Answer

GPU acceleration allows browsers to offload compositing and transform operations to the graphics processor, resulting in smoother animations and reduced CPU workload.

## Why `transform` Is Faster Than `top` or `left`

Changing `top` or `left` affects layout. Changing `transform` can often be handled by the compositor.

### Using `top` or `left`

```css
position: absolute;
left: 200px;
```

Pipeline:

```text
Style
  -> Layout
  -> Paint
  -> Composite
```

### Using `transform`

```css
transform: translateX(200px);
```

Pipeline:

```text
Composite only
```

### Interview Answer

`transform` is faster because it usually updates only the compositing stage, while `top` and `left` affect layout and may trigger reflow and repaint.

## How the Browser Paints Pixels

After layout is complete, the browser creates paint records, rasterizes them into pixels, and composites the layers.

### Step 1: Create Paint Records

```html
<div style="background: red"></div>
```

Paint command:

```text
Draw red rectangle
```

### Step 2: Rasterize Paint Commands

```text
Draw rectangle
  -> Pixel buffer
```

Rasterization converts paint commands into actual pixels.

### Step 3: Composite Layers

```text
Header layer
Sidebar layer
Content layer
  -> Final screen
```

### Interview Answer

The browser paints pixels by generating paint commands, rasterizing them into pixel buffers, and then compositing layers together to produce the final image shown on screen.

## What Causes Layout Shifts?

A layout shift happens when content unexpectedly moves after it has already appeared.

### Example

```text
Initial page:
Title
Button

After image loads:
Image
Title
Button
```

Everything jumps down.

### Common Causes

- Images without dimensions
- Ads injected dynamically
- Lazy-loaded content
- Third-party widgets
- Web fonts
- Dynamically inserted content above existing content

### Images Without Dimensions

Bad:

```html
<img src="banner.jpg" />
```

Good:

```html
<img src="banner.jpg" width="800" height="400" />
```

### Dynamic Content

```js
container.prepend(notification);
```

### Web Fonts

```text
Fallback font
  -> Custom font
  -> Text reflows
```

### Interview Answer

Layout shifts occur when elements change position unexpectedly during page load, commonly due to images without reserved space, ads, dynamically injected content, or font swaps.

## Cumulative Layout Shift (CLS)

CLS stands for Cumulative Layout Shift. It is a Core Web Vital that measures visual stability.

```text
CLS = Impact Fraction x Distance Fraction
```

### Terms

- **Impact fraction:** how much of the viewport shifted.
- **Distance fraction:** how far the shifted content moved.

### CLS Scores

| Score | Meaning |
| :---- | :---- |
| `<= 0.1` | Good |
| `0.1 - 0.25` | Needs improvement |
| `> 0.25` | Poor |

### How to Reduce CLS

Reserve image space:

```html
<img src="banner.jpg" width="800" height="400" />
```

Reserve ad space:

```css
.ad-slot {
  min-height: 250px;
}
```

Avoid inserting content above existing content:

```js
container.prepend(element);
```

Use `font-display`:

```css
@font-face {
  font-family: "Inter";
  src: url("/fonts/inter.woff2") format("woff2");
  font-display: swap;
}
```

## Senior-Level Interview Summary

When asked about these topics together, connect them into a single story:

```text
DOM/CSS changes
  -> Style recalculation
  -> Layout (reflow)
  -> Paint (repaint)
  -> Rasterization
  -> Compositing
  -> GPU
  -> Pixels on screen
```

- Reflow recalculates geometry.
- Repaint redraws visuals.
- Layout thrashing means repeated forced layouts.
- Composite layers isolate updates.
- GPU acceleration makes compositing faster.
- `transform` can often be handled by the compositor.
- Layout shifts are visual movements after render.
- CLS measures layout stability.

This level of explanation is typically expected for senior frontend interviews.

## Strong 2-Minute Interview Answer

When a browser receives HTML, it parses it into a DOM tree. CSS is parsed into a CSSOM tree. These are combined to form the render tree, which contains only visible elements. The browser then performs layout to calculate positions and dimensions, paint to draw pixels, and composite to combine layers using the GPU and display them on the screen.

For performance, I avoid triggering layout whenever possible. Properties like `width`, `height`, `margin`, and `left` cause reflow and are expensive. For animations, I prefer `transform` and `opacity` because they typically run in the compositing stage and are GPU-accelerated. I also avoid layout thrashing by batching DOM reads and writes and using `requestAnimationFrame` when updating the UI.

![][image4]

[image3]: /img/docs/web-development/web-fundamentals/browser-rendering-pipeline/browser-rendering-pipeline-01.png
[image4]: /img/docs/web-development/web-fundamentals/browser-rendering-pipeline/browser-rendering-pipeline-02.png

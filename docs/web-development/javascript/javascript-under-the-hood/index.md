---
title: JavaScript Under The Hood
sidebar_position: 1
---

# JavaScript Under The Hood

This section explains how JavaScript runs inside the browser and runtime engines. Use it as a study path for execution internals, performance, memory, rendering, and async behavior.

## Study Path

1. [JS Engine](./js-engine.md)
2. [Garbage Collector Internals](./garbage-collector-internals.md)
3. [Event Loop](../event-loop.md)
4. [Asynchronous JavaScript](../asynchronous-javascript.md)
5. [Browser Rendering Pipeline](../../web-fundamentals/browser-rendering-pipeline.md)
6. [Browser APIs & DOM](../browser-apis-dom.md)

## Related Internals

- [React Under The Hood](../../react-js/react-under-the-hood.md)
- [React Reconciliation](../../react-js/fundamentals/reconciliation-1.md)
- [Node.js Notes](../../backend-for-frontend-node-js/node-js-interview-qa.md)

## Runtime Overview

V8 is Google's JavaScript and WebAssembly engine used in Chrome and Node.js. It uses parsing, bytecode interpretation, JIT compilation, optimization, deoptimization, and garbage collection.

SpiderMonkey is Mozilla's JavaScript engine used in Firefox. It was the first JavaScript engine and supports modern JavaScript, garbage collection, bytecode interpretation, and optimizing compilation.

WebAssembly is a binary instruction format that allows compiled languages like C and C++ to run in the browser at near-native speed. It works alongside JavaScript and the same Web APIs.

## Browser Rendering Link

Browser rendering pipeline details are maintained in [Browser Rendering Pipeline](../../web-fundamentals/browser-rendering-pipeline.md).

Use that page for:

- DOM, CSSOM, render tree, layout, paint, and composite.
- Reflow, repaint, and composite-only updates.
- Layout thrashing examples and fixes.
- CLS and rendering-performance interview answers.

## Senior Interview Notes

### How does V8 optimize JavaScript code?

V8 uses an adaptive execution pipeline. Source code is parsed into an Abstract Syntax Tree, then Ignition turns that tree into bytecode and collects type feedback. Frequently executed paths are promoted through compiler stages and optimized by TurboFan into machine code.

V8 also optimizes property access with hidden classes and inline caching. If runtime behavior breaks an optimization assumption, V8 deoptimizes the code and falls back to a safer execution path.

### Compare reflow, repaint, and compositing.

Reflow recalculates geometry and layout. It is the most expensive because it can trigger layout, paint, and composite work.

Repaint updates visual pixels when layout does not change, such as a color update.

Compositing combines layers, often on the GPU. For animations, `transform` and `opacity` are usually best because they can avoid layout and paint work.

### What is layout thrashing?

Layout thrashing happens when JavaScript repeatedly writes layout-affecting styles and immediately reads layout values.

```js
for (const item of items) {
  item.style.width = "200px";
  console.log(item.offsetWidth);
}
```

Batch reads and writes separately, or schedule visual writes with `requestAnimationFrame`.

### How would you optimize a large listing page?

For a page with thousands of items, use DOM virtualization, lazy-load media, reserve image dimensions to reduce layout shift, debounce or throttle expensive listeners, prefer composite-only animations, and keep object shapes consistent so the JavaScript engine can optimize property access.

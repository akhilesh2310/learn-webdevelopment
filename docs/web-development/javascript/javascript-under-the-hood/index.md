---
title: JavaScript Under The Hood
sidebar_position: 1
---

# JavaScript Under The Hood

This page is the hub for JavaScript runtime internals.

## Canonical Study Path

1. [JS Engine](./js-engine.md)
2. [Garbage Collector Internals](./garbage-collector-internals.md)
3. [Event Loop](../event-loop.md)
4. [Asynchronous JavaScript](../asynchronous-javascript.md)
5. [Browser Rendering Pipeline](../../web-fundamentals/browser-rendering-pipeline.md)
6. [Browser APIs & DOM](../browser-apis-dom.md)

## Related Non-JavaScript Internals

- [React Under The Hood](../../react-js/react-under-the-hood.md)
- [React Reconciliation](../../react-js/fundamentals/reconciliation-1.md)
- [Node.js Notes](../../node-js/chatgpt-node.md)

## Engine Notes

V8 is Google’s high-performance JavaScript and WebAssembly engine used in Chrome and Node.js. It uses parsing, bytecode interpretation, JIT compilation, optimization, deoptimization, and garbage collection.

SpiderMonkey is Mozilla’s JavaScript engine used in Firefox. It was the first JavaScript engine and supports modern JavaScript, garbage collection, bytecode interpretation, and optimizing compilation.

WebAssembly is a binary instruction format that allows compiled languages like C/C++ to run in the browser at near-native speed. It works alongside JavaScript and the same Web APIs.

# **Part 2: Browser Rendering Pipeline & Performance Optimization**

Browser rendering pipeline details are canonical in [Browser Rendering Pipeline](../../web-fundamentals/browser-rendering-pipeline.md).

This JavaScript Under The Hood page keeps only the runtime overview. Use the canonical browser page for:

* DOM, CSSOM, Render Tree, Layout, Paint, and Composite.
* Reflow, repaint, and composite-only updates.
* Layout thrashing examples and fixes.
* CLS and rendering-performance interview answers.

# **Part 3: Senior-Level (IC4+) Interview Reference Sheet**

### **Q1: Explain how the V8 engine optimizes JavaScript code.**

**Answer:** V8 uses an adaptive execution pipeline. Raw source code is first converted into an **Abstract Syntax Tree (AST)** by the parser. The **Ignition Interpreter** turns this AST into bytecode, collecting type information at runtime. Hot paths are promoted to the **TurboFan Optimizing Compiler**, which compiles the bytecode into highly optimized native machine code.

V8 optimizes object access using **Hidden Classes (Shapes)** to map variable properties to predictable memory offsets, and **Inline Caching (IC)** to reuse those offsets at execution sites. If dynamic variables change types unexpectedly, the code undergoes **Deoptimization**, falling back to the interpreter to preserve execution safety.

### **Q2: Compare Reflow, Repaint, and Composing. Which is best for animation performance and why?**

**Answer:** \* **Reflow** recalculates geometric dimensions and layouts ($X,Y$ placement, scale), running through the Layout, Paint, and Composite steps. It is the most resource-intensive operation.

* **Repaint** handles visual style changes (e.g., color) that don't affect layout geometry, running only the Paint and Composite steps.  
* **Compositing** blends independent layers directly on the GPU.

For animations, **Composite-Only** properties (like transform and opacity) are best. They bypass the CPU-bound Layout and Paint phases entirely, moving layers directly on the GPU to maintain a smooth 60fps or 120fps refresh rate.

### **Q3: What is Layout Thrashing (Forced Synchronous Reflow) and how do you resolve it?**

**Answer:** Layout Thrashing occurs when a script reads a geometric layout property (e.g., element.offsetWidth) immediately after writing one (e.g., element.style.width) inside a loop. This forces the browser to pause execution and run a synchronous layout calculation to ensure accuracy.

To fix this, batch read and write operations to decouple them. You can also use requestAnimationFrame to schedule style updates, ensuring they run at the optimal point in the browser's rendering lifecycle.

### **Q4: How would you architect and optimize a high-traffic web page displaying a large dataset (e.g., 10,000 hotel items)?**

**Answer:** To build a scalable, high-performance listing page, I would use the following strategies:

1. **DOM Virtualization:** Use libraries like react-window or react-virtualized to render only the visible items in the viewport, keeping the DOM lightweight ($\~50$ nodes instead of $10,000$).  
2. **Asset Lazy Loading:** Use native browser loading attributes (\<img loading="lazy"\>) alongside explicit dimensions to prevent **Cumulative Layout Shift (CLS)**.  
3. **Hardware Accelerated Animations:** Offload visual transitions and hover effects to the GPU using transform properties instead of layout properties like top or left.  
4. **Debounce/Throttle Event Listeners:** Use passive event listeners (\{ passive: true \}) for scroll-heavy interactions to prevent rendering delays.  
5. **V8 Component Optimization:** Keep object structures consistent to maximize monomorphic Inline Caching, ensuring the JavaScript runtime can optimize property access efficiently.

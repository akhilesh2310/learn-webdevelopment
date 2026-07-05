---
title: Quick Questions
sidebar_position: 3
---

# Quick Questions

Related canonical pages: [Event Loop](../javascript/event-loop.md), [Browser Rendering Pipeline](../web-fundamentals/browser-rendering-pipeline.md), [React Reconciliation](../react-js/fundamentals/reconciliation-1.md), [React Performance](performance/react-performance.md).

### [https://www.youtube.com/watch?v=M2RpzmyKfvQ\&list=PLe3J6mZBq1xVDr297Yg0p1SHbdj\_Oceld](https://www.youtube.com/watch?v=M2RpzmyKfvQ&list=PLe3J6mZBq1xVDr297Yg0p1SHbdj_Oceld)

### 1. How does a Web Browser Work?

**Answer:**

A web browser works in several stages:

1. **URL Resolution:** When a user enters a URL, DNS resolves it to an IP address.

2. **HTTP Request:** The browser sends an HTTP/HTTPS request to the server.

3. **Server Response:** The server responds with HTML, CSS, JS, etc.

4. **HTML Parsing:** The browser parses the HTML into a **DOM tree**.

5. **CSS Parsing:** CSS is parsed into a **CSSOM (CSS Object Model)**.

6. **Render Tree Construction:** DOM \+ CSSOM \= Render Tree.

7. **Layout:** Calculates each element’s position on the screen.

8. **Painting:** Draws pixels on the screen using the render tree.

9. **JavaScript Execution:** JS engine (like V8 or SpiderMonkey) executes JS.

10. **Reflows & Repaints:** Any DOM changes might trigger re-layout and repaint.

---

### 2. How Does React Work Under the Hood?

**Answer:**

React operates using the following core concepts:

1. **Virtual DOM:** React maintains a lightweight copy of the real DOM.

2. **Reconciliation:** When state/props change, a new Virtual DOM is created and compared (diffing) with the previous one.

3. **Fiber Architecture:** React uses a fiber data structure to break rendering work into chunks to enable async rendering.

4. **Component Lifecycle:** React components go through lifecycle methods (like `componentDidMount`, `useEffect`).

5. **ReactDOM:** Converts Virtual DOM changes to actual DOM updates efficiently.

---

### 3. What is V8 Engine?

**Answer:**

* V8 is Google’s open-source high-performance JavaScript and WebAssembly engine.

* Used in Chrome and Node.js.

* Written in C++.

* **Key features:**

  * Compiles JS to native machine code using **Just-In-Time (JIT) compilation**.

  * Has a garbage collector and memory management.

  * Uses **Ignition** (interpreter) and **TurboFan** (compiler) for performance.

---

### 4. What is SpiderMonkey?

**Answer:**

* SpiderMonkey is Mozilla’s JavaScript engine, used in Firefox.

* The first JavaScript engine ever created.

* Supports modern JavaScript (ES6+), garbage collection, and JIT compilation.

* Like V8, it uses **bytecode interpretation** and **baseline & optimizing compilers**.

---

### 5. What is the Difference Between Synchronous and Asynchronous JavaScript?

**Answer:**

* **Synchronous:** Code runs line by line, blocking the execution until each operation finishes.

* **Asynchronous:** Non-blocking; uses callbacks, promises, async/await to handle operations like API calls, timers.

* JavaScript uses the **Event Loop** and **callback queue** to handle async tasks.

---

### 6. How Does the JavaScript Event Loop Work?

**Answer:**

The Event Loop lets single-threaded JavaScript run async callbacks after synchronous code finishes, with microtasks such as Promise callbacks running before macrotasks such as `setTimeout`.

For the full explanation and execution-order examples, see [Event Loop](../javascript/event-loop.md).

---

### 7. What is the Role of the DOM and BOM in a Web Browser?

**Answer:**

* **DOM (Document Object Model):** Represents HTML structure in a tree format. Manipulated using JS to change content.

* **BOM (Browser Object Model):** Provides access to browser features like `window`, `navigator`, `location`, etc.

---

### 8. How Does Node.js Work Under the Hood?

**Answer:**

* Built on top of V8.

* Uses **libuv** to provide an event-driven, non-blocking I/O model.

* Has its own **event loop** to handle async operations.

* Uses **C++ bindings** to perform system-level tasks like file I/O, network.

---

### 9. What is WebAssembly and How Does it Work?

**Answer:**

* WebAssembly (WASM) is a binary instruction format.

* Enables running compiled code (like C/C++) in the browser.

* Runs at near-native speed.

* Works alongside JS and uses the same Web APIs.

---

### 10. How Do Modern JavaScript Frameworks Improve Performance?

**Answer:**

* Use **Virtual DOM** for efficient updates.

* Employ **tree shaking** to remove unused code.

* Support **code-splitting** for lazy loading.

* Use **memoization** and **reconciliation** to reduce unnecessary renders.

---

### What is a Render Tree in a Web Browser?

Quick answer: the Render Tree combines the DOM and CSSOM into the visible structure the browser uses for layout, painting, and compositing.

For the full Render Tree flow, examples, and performance details, see [Browser Rendering Pipeline](../web-fundamentals/browser-rendering-pipeline.md).

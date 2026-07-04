---
title: Quick Questions
sidebar_position: 3
---

# Quick Questions

### [**https://www.youtube.com/watch?v=M2RpzmyKfvQ\&list=PLe3J6mZBq1xVDr297Yg0p1SHbdj\_Oceld**](https://www.youtube.com/watch?v=M2RpzmyKfvQ&list=PLe3J6mZBq1xVDr297Yg0p1SHbdj_Oceld)

### **1\. How does a Web Browser Work?**

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

### **2\. How Does React Work Under the Hood?**

**Answer:**

React operates using the following core concepts:

1. **Virtual DOM:** React maintains a lightweight copy of the real DOM.

2. **Reconciliation:** When state/props change, a new Virtual DOM is created and compared (diffing) with the previous one.

3. **Fiber Architecture:** React uses a fiber data structure to break rendering work into chunks to enable async rendering.

4. **Component Lifecycle:** React components go through lifecycle methods (like `componentDidMount`, `useEffect`).

5. **ReactDOM:** Converts Virtual DOM changes to actual DOM updates efficiently.

---

### **3\. What is V8 Engine?**

**Answer:**

* V8 is Google’s open-source high-performance JavaScript and WebAssembly engine.

* Used in Chrome and Node.js.

* Written in C++.

* **Key features:**

  * Compiles JS to native machine code using **Just-In-Time (JIT) compilation**.

  * Has a garbage collector and memory management.

  * Uses **Ignition** (interpreter) and **TurboFan** (compiler) for performance.

---

### **4\. What is SpiderMonkey?**

**Answer:**

* SpiderMonkey is Mozilla’s JavaScript engine, used in Firefox.

* The first JavaScript engine ever created.

* Supports modern JavaScript (ES6+), garbage collection, and JIT compilation.

* Like V8, it uses **bytecode interpretation** and **baseline & optimizing compilers**.

---

### **5\. What is the Difference Between Synchronous and Asynchronous JavaScript?**

**Answer:**

* **Synchronous:** Code runs line by line, blocking the execution until each operation finishes.

* **Asynchronous:** Non-blocking; uses callbacks, promises, async/await to handle operations like API calls, timers.

* JavaScript uses the **Event Loop** and **callback queue** to handle async tasks.

---

### **6\. How Does the JavaScript Event Loop Work?**

**Answer:**

The **event loop** in JavaScript is a fundamental concept that allows asynchronous operations to happen in a single-threaded environment. It is the mechanism that handles executing code, collecting and processing events, and executing queued tasks in a non-blocking manner.

### **🚀 Why Do We Need an Event Loop?**

JavaScript is single-threaded, meaning it can execute one command at a time. If a task takes too long (like fetching data from an API), it could block the entire program. To prevent this, JavaScript uses asynchronous callbacks and an event loop to manage non-blocking operations.

---

### **🛠️ How the Event Loop Works:**

The event loop constantly checks if the **call stack** is empty and if there are any tasks in the **callback queue**. Let’s break it down step by step:

1. **Call Stack:**

   * This is where synchronous code execution happens.

   * Functions are pushed onto the stack when called and popped off when they return.

   * If the stack is empty, the event loop looks for queued tasks.

2. **Web APIs/Browser APIs (or Node APIs in Node.js):**

   * When asynchronous operations (like `setTimeout`, `fetch`, or DOM events) are triggered, they are delegated to Web APIs.

   * The function is removed from the call stack, freeing up the thread.

3. **Callback Queue (or Task Queue):**

   * When an asynchronous operation completes, its callback is placed in the callback queue.

   * The event loop will push the callback onto the call stack if the stack is empty.

4. **Microtask Queue:**

   * Holds tasks like `Promise` callbacks and `MutationObserver` callbacks.

   * The event loop always checks the microtask queue before the callback queue, ensuring higher priority.

5. **Rendering Queue:**

   * The browser may also have a rendering phase where it updates the UI before processing more tasks.

   ---

   ### **🔁 Event Loop Cycle:**

1. Check the call stack.

2. If the stack is empty, check the microtask queue:

   * Execute all queued microtasks.

3. If the microtask queue is also empty, process the callback queue:

   * Execute one callback from the queue.

4. Repeat the cycle.

   ---

   ### **📝 Code Example:**

   `console.log("Start");`

   `setTimeout(() => \{`

     `console.log("Timeout callback");`

   `\}, 0);`

   

   `Promise.resolve().then(() => \{`

     `console.log("Promise callback");`

   `\});`

   `console.log("End");`

   

**Output:**

`Start`

`End`

`Promise callback`

`Timeout callback`

---

### **🧐 Why This Output?**

1. **"Start"** and **"End"** are logged immediately as synchronous code.

2. The `Promise` callback goes to the **microtask queue**.

3. The `setTimeout` callback goes to the **callback queue**.

4. The event loop prioritizes the **microtask queue** over the **callback queue**, so `"Promise callback"` is printed before `"Timeout callback"`.

   ---

   ### **📝 Summary:**

1. JavaScript is single-threaded but handles async operations using the event loop.

2. The **call stack** executes synchronous code.

3. Asynchronous operations are processed using **Web APIs** and their callbacks are queued.

4. The **microtask queue** has higher priority than the **callback queue**.

5. The event loop manages the execution between the **call stack** and **queues** efficiently.  
   

---

### **7\. What is the Role of the DOM and BOM in a Web Browser?**

**Answer:**

* **DOM (Document Object Model):** Represents HTML structure in a tree format. Manipulated using JS to change content.

* **BOM (Browser Object Model):** Provides access to browser features like `window`, `navigator`, `location`, etc.

---

### **8\. How Does Node.js Work Under the Hood?**

**Answer:**

* Built on top of V8.

* Uses **libuv** to provide an event-driven, non-blocking I/O model.

* Has its own **event loop** to handle async operations.

* Uses **C++ bindings** to perform system-level tasks like file I/O, network.

---

### **9\. What is WebAssembly and How Does it Work?**

**Answer:**

* WebAssembly (WASM) is a binary instruction format.

* Enables running compiled code (like C/C++) in the browser.

* Runs at near-native speed.

* Works alongside JS and uses the same Web APIs.

---

### **10\. How Do Modern JavaScript Frameworks Improve Performance?**

**Answer:**

* Use **Virtual DOM** for efficient updates.

* Employ **tree shaking** to remove unused code.

* Support **code-splitting** for lazy loading.

* Use **memoization** and **reconciliation** to reduce unnecessary renders.

---

### **What is a Render Tree in a Web Browser?**

The **Render Tree** is a structure built by the browser that combines both the **DOM (Document Object Model)** and the **CSSOM (CSS Object Model)** to determine what actually gets **painted on the screen**.

---

### **How is the Render Tree Constructed?**

1. **HTML Parsing → DOM Tree:**  
    The browser parses the HTML and constructs the DOM tree — a representation of all HTML elements.

2. **CSS Parsing → CSSOM Tree:**  
    CSS files are parsed into the CSSOM tree, which holds the styles of elements.

3. **DOM \+ CSSOM → Render Tree:**  
    The browser then combines both to create the Render Tree. It includes only the **visible elements** (e.g., elements with `display: none` are excluded).

---

### **Example:**

html  
CopyEdit  
`<html>`  
  `<body>`  
    `<div style="display: none;">Hidden</div>`  
    `<p style="color: red;">Visible Text</p>`  
  `</body>`  
`</html>`

* **DOM Tree:** includes both `<div>` and `<p>`.

* **CSSOM Tree:** includes styles like `display: none` and `color: red`.

* **Render Tree:** includes only the `<p>` with the applied style `color: red`.

---

### **Why is the Render Tree Important?**

The Render Tree is used for:

* **Layout:** Calculating the position and size of each visible element.

* **Painting:** Filling pixels on the screen.

Any change in the DOM or CSSOM may trigger:

* **Recalculate Style → Layout → Paint → Composite**

These operations can affect performance, so understanding the Render Tree helps in optimizing rendering.

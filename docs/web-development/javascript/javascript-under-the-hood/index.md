---
title: JavaScript Under The Hood
sidebar_position: 1
---

# JavaScript Under The Hood

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

# 

# 

# **Part 2: Browser Rendering Pipeline & Performance Optimization**

## 

## **1\. The Core Rendering Pipeline**

### **Step-by-Step Architecture Pipeline**

1. **DOM Construction:** Parses raw HTML string bytes into tokens to generate the internal **Document Object Model (DOM)** tree.  
2. **CSSOM Construction:** Parses linked stylesheet rules and style blocks to generate the **CSS Object Model (CSSOM)** tree.  
3. **Render Tree Generation:** Combines the structural DOM tree with the structural CSSOM tree, omitting non-visual layout targets (e.g., \<head\>, nodes matching display: none).  
4. **Layout (Reflow):** Computes exact geographic geometric coordinates, dimensions ($X, Y$ positions, widths, heights) for every visible element node.  
5. **Paint:** Fills in programmatic pixels across separate isolated layers, executing instructions for graphics, borders, text colors, and shadows.  
6. **Composite:** Evaluates independent layering targets, utilizing the GPU hardware thread to blend layer surfaces together and project them onto the screen display.

## **2\. Structural Breakdown of Pipeline Data Structures**

### **DOM (Document Object Model)**

* **Data Structure:** **N-ary Tree Node Graph**.  
* **Characteristics:** Elements maintain deep cyclical directional references linking parents directly to structural arrays of dynamic live children.  
* **Underlying Engine Opts:** Standard layout tree traversal costs $O(N)$. To prevent slow structural searches via methods like document.getElementById(), engines maintain an internal, synchronized **Hash Map Index** linking unique identifier keys to node memory addresses, lowering lookup costs to **$O(1)$**.

### **CSSOM (CSS Object Model)**

* **Data Structure:** **Tree / Rule Map Node Hierarchies**.  
* **Characteristics:** Operates like a cascade tree structure to compute explicit style inheritance hierarchies (e.g., matching general wildcards down to targeted layout rules).

### **Render Tree**

* **Data Structure:** **Hierarchical Layout Object Tree** (Internally tracked as RenderObject / LayoutObject).  
* **Characteristics:** Maps structural content directly to its corresponding computed display styles. It contains only nodes that affect visual output.

| Trait | DOM Tree | Render Tree |
| :---- | :---- | :---- |
| **Node Scope** | Contains *all* structural elements. | Contains *only* visible elements. |
| **Structural Match** | Includes \<head\>, \<script\>, display: none. | Drops hidden elements completely. |
| **Visibility Elements** | Includes elements with visibility: hidden. | Includes visibility: hidden (allocates layout space). |
| **Style Context** | Raw structural layout node data. | Embedded with explicit, calculated computed styles. |

## 

## **3\. Execution Lifecycle: Reflow vs. Repaint vs. Composite**

Modifying the DOM or styles triggers parts of the rendering pipeline. Understanding these entry points is critical for performance optimization.

### **Reflow (Layout Phase)**

* **Trigger:** Any modification that alters the geometric layout or structural dimensions of an element.  
* **Pipeline Path Execution:** Layout $\\rightarrow$ Paint $\\rightarrow$ Composite.  
* **Cost:** **Extremely High**. Geometric modifications trigger a cascade of layout calculations across parent nodes, siblings, and child structures.  
* **Common Causes:** Modifying width, height, margin, padding, font-size, or reading properties that force layout evaluation.

### **Repaint (Paint Phase)**

* **Trigger:** Modifications that change the visual appearance of an element without altering its geometric dimensions or layout footprint.  
* **Pipeline Path Execution:** Paint $\\rightarrow$ Composite.  
* **Cost:** **Moderate**. Skips geometric recalculations, but re-allocates pixel buffers across modified graphic layers.  
* **Common Causes:** Modifying background-color, color, visibility, box-shadow, or outline-color.

### **Composite-Only**

* **Trigger:** Visual adjustments isolated onto separate layers, managed entirely via GPU hardware acceleration.  
* **Pipeline Path Execution:** Composite.  
* **Cost:** **Extremely Low**. Bypasses both the CPU-bound Layout and Paint phases.  
* **Common Causes:** Animating properties like transform (translate, scale, rotate) or opacity.

### **Code Comparison: Performance Mechanics**

JavaScript

// ❌ High-Cost Performance Trap: Triggers Reflow, Paint, and Composite

element.style.left \= "100px";

//  Low-Cost Optimization: Triggers Composite Only via GPU Layer Isolation

element.style.transform \= "translateX(100px)";

## **4\. Advanced Production Performance Challenges**

### **Layout Thrashing (Forced Synchronous Reflow)**

Layout Thrashing occurs when JavaScript writes a geometric layout property to the DOM and immediately reads a layout property in a tight loop. This forces the browser to halt execution and recalculate the layout synchronously to return accurate values.

JavaScript

// ❌ CRITICAL TRAP: Causes Layout Thrashing

for (let i \= 0; i \< elements.length; i++) \{

  // Read layout property (Forces immediate synchronous reflow calculation)

  const width \= elements\[i\].offsetWidth; 

  // Write layout property (Invalidates the layout state)

  elements\[i\].style.width \= width \+ 10 \+ "px"; 

\}

#### **Remediation and Fixes**

To prevent this, batch read and write operations so the browser can optimize layout changes in a single pass.

JavaScript

//  FIX 1: Batch reads first, then batch writes

const widths \= elements.map(el \=\> el.offsetWidth); // Batch Read

elements.forEach((el, i) \=\> \{

  el.style.width \= widths\[i\] \+ 10 \+ "px";         // Batch Write

\});

//  FIX 2: Schedule updates using requestAnimationFrame

requestAnimationFrame(() \=\> \{

  elements.forEach(el \=\> \{

    // Perform isolated visual updates synced with the display refresh cycle

  \});

\});

### **Cumulative Layout Shift (CLS)**

CLS is a Core Web Vital metric that tracks unexpected visual instability on a webpage.

* **Primary Causes:** Media elements (images, video embeds, iframes) lacking explicit dimension attributes, or dynamic ad injectors loading above existing text.  
* **Remediation:** Always include explicit structural aspect ratio dimensions on asset containers.

HTML

\<img src="hotel.jpg" /\>

\<img src="hotel.jpg" width="300" height="200" style="aspect-ratio: 300 / 200;" /\>

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

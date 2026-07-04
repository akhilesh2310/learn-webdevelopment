---
title: Event Loop
sidebar_position: 9
---

# Event Loop

### **🔄 The JavaScript Event Loop**

### **❓ What is it?**

The **Event Loop** is a core engine mechanism that allows JavaScript to be asynchronous and perform non-blocking operations, even though it runs on a **single thread** (can only execute one line of code at a time).

Instead of freezing your application while waiting for a slow task (like a network request or a timer), JavaScript offloads that task, continues running your code, and handles the task's result later.

### **🏗️ The JavaScript Runtime Environment**

To understand the event loop, you must look at the entire runtime layout. JavaScript doesn’t run in a vacuum; it runs inside a browser engine (like Chrome’s V8) or Node.js, which provides extra tools.

#### **1\. The Call Stack**

* **What it does:** Tracks what function is currently running. It processes code synchronously (First-In, Last-Out).  
* **Behavior:** If a function is in the stack, the engine cannot do anything else until it completes and pops off.

#### **2\. Web APIs (or C++ APIs in Node.js)**

* **What it does:** These are background threads provided by the browser container, **not** the JavaScript engine.  
* **Examples:** setTimeout, fetch() network requests, or DOM Event Listeners.  
* **Behavior:** When you call a timer, JS hands it over to the Web API block to count down in the background so the main Call Stack stays free.

#### **3\. The Task Queues (Where results wait)**

Once a background Web API task finishes, its callback function needs to run. It cannot jump straight back into the Call Stack because that would disrupt running code. Instead, it waits in one of two queues:

* **Microtask Queue:** Holds high-priority callbacks.  
  * *What goes here:* Promise.then() callbacks, MutationObserver, and queueMicrotask().  
* **Macrotask Queue (or Callback Queue):** Holds lower-priority background events.  
  * *What goes here:* setTimeout, setInterval, and DOM event callbacks (like clicks).

### **🔄 The Event Loop's One Job**

The Event Loop acts like a traffic controller. It constantly runs a single check loop:

1. It looks at the **Call Stack**. If the Call Stack is **not empty**, it waits.  
2. The moment the Call Stack is completely **empty**, it looks at the **Microtask Queue**. It moves *all* available microtasks into the Call Stack one by one until the queue is completely empty.  
3. Once the Call Stack is empty and the Microtask Queue is empty, it looks at the **Macrotask Queue**. It takes **exactly one** macrotask, moves it to the Call Stack to run, and then restarts the entire check loop.

**🌟 Crucial Rule:** Microtasks *always* have absolute priority over Macrotasks. The event loop will never pick up a setTimeout callback if a Promise.then() callback is waiting.

### **⚖️ Side-by-Side: Microtasks vs. Macrotasks**

| Feature | Microtask Queue (Promises) | Macrotask Queue (setTimeout) |
| :---- | :---- | :---- |
| **Priority** | High | Low |
| **Execution Pace** | The Event Loop clears the **entire queue** in one pass. | The Event Loop executes **only one task** per cycle. |
| **Browser Rendering** | Runs *before* the browser repaints the UI grid. | Runs *after* render loops cycle through. |

### 

### **🌐 Browser vs. Node.js Event Loop**

While the basic concepts are identical, the runtime environments diverge slightly:

* **The Browser:** Focuses heavily on user interactions and layout updates. The event loop coordinates tasks with the **Render Queue** to ensure the screen runs at a smooth frame rate.  
* **Node.js:** Does not have a visual screen to repaint. It uses a custom C++ engine library called **libuv**. Its event loop is divided into highly specific internal phases (Timers phase, I/O Polling phase, Close callbacks phase) to handle high-volume backend data streaming efficiently.

### **⚠️ High-Frequency Execution Order Puzzles**

The single best way to prove you understand the event loop in an interview is by tracking execution outputs step by step.

#### **Puzzle 1: The Core Priority Test (setTimeout vs Promise)**

**Question:** What is the exact print output sequence of this script?

| console.log("1: Script Start"); setTimeout(() \=\> \{   console.log("2: setTimeout Callback"); \}, 0); Promise.resolve().then(() \=\> \{   console.log("3: Promise Callback"); \}); console.log("4: Script End"); |
| :---- |

##### **📋 Step-by-Step Execution Analysis:**

1. **Line 1:** Synchronous statement. Prints "1: Script Start" instantly.  
2. **Line 3:** setTimeout runs. The engine offloads the timer to the Web API block. Since the timer is 0ms, the Web API immediately drops the callback into the **Macrotask Queue**.  
3. **Line 7:** Promise.resolve() finishes immediately. Its .then() callback is instantly placed inside the **Microtask Queue**.  
4. **Line 11:** Synchronous statement. Prints "4: Script End".  
5. The synchronous script finishes. The **Call Stack is now empty**.  
6. The Event Loop checks the queues. The **Microtask Queue** has priority. It moves the Promise callback to the stack. Prints "3: Promise Callback".  
7. The Microtask queue is empty. The Event Loop checks the **Macrotask Queue**, pulling up the timer callback. Prints "2: setTimeout Callback".

##### **🎯 Final Output Sequence:**

| 1: Script Start 4: Script End 3: Promise Callback 2: setTimeout Callback |
| :---- |

#### **Puzzle 2: Inside the Promise Constructor Trap**

**Question:** What does this puzzle print out? Be careful with where the promise starts.

| console.log("Start"); setTimeout(() \=\> \{   console.log("Timeout"); \}, 0); new Promise((resolve) \=\> \{   console.log("Inside Constructor");   resolve(); \}).then(() \=\> \{   console.log("Promise Then"); \}); console.log("End"); |
| :---- |

##### **📋 Step-by-Step Execution Analysis:**

* **The Trap:** The code block *inside* the new Promise((resolve) \=\> \{ ... \}) constructor **runs completely synchronously\!** It does not become asynchronous until it hits the .then() attachment.  
1. Prints "Start".  
2. Registers the Timeout callback into the Macrotask Queue.  
3. Enters the Promise Constructor synchronously. Prints "Inside Constructor", then runs resolve().  
4. The .then() block is triggered, scheduling "Promise Then" into the Microtask Queue.  
5. Prints "End".  
6. The Call Stack clears. The Event Loop processes the Microtask Queue first, printing "Promise Then".  
7. Finally, the Event Loop processes the Macrotask Queue, printing "Timeout".

##### **🎯 Final Output Sequence:**

| Start Inside Constructor End Promise Then Timeout |
| :---- |

#### **Puzzle 3: The Starvation Infinite Microtask Loop**

**Question:** What happens to the application if we recursively queue microtasks? Will the setTimeout code ever run?

| function starveEventLoop() \{   Promise.resolve().then(() \=\> \{     starveEventLoop(); // Recursively scheduling another microtask   \}); \} setTimeout(() \=\> \{   console.log("Will I ever print?"); \}, 0); starveEventLoop(); |
| :---- |

**Answer:** The application UI will completely freeze, and the setTimeout console log **will never run**.

* **Reasoning:** Remember the execution pace rule: the event loop will not stop processing microtasks until the Microtask Queue is completely empty. Because starveEventLoop() adds a fresh microtask during its execution step, the queue never drains to zero. The event loop is trapped permanently in the microtask phase and is starved of the chance to look at the Macrotask Queue or update the browser screen layout.

### 

### 

### **🗺️ The Event Loop Runtime Map**

This diagram illustrates how tasks move from background containers (like Network Requests or Event Listeners) through the dual-queue structure before the Event Loop feeds them back into the main execution Call Stack![][image5]

### **⏱️ 60-Second Revision Summary**

#### **1\. The Components**

* **Call Stack:** Executes synchronous code immediately. (First-In, Last-Out).  
* **Web APIs:** Browser background threads handling asynchronous timers (setTimeout), network data (fetch), or user interactions.  
* **Microtask Queue:** High-priority waiting line. Holds **Promises (.then)**, async/await resume steps, and queueMicrotask.  
* **Task Queue (Macrotask):** Low-priority waiting line. Holds **setTimeout**, setInterval, and DOM user interaction callbacks.

#### **2\. The 3-Step Execution Rule**

When analyzing any interview code snippet, trace it using this exact loop path:

1. **Clear Main Stack:** Run all regular, top-level synchronous code blocks first.  
2. **Drain Microtasks:** The moment the stack is empty, look at the **Microtask Queue**. Run **ALL** waiting promise steps until that queue drops to zero.  
3. **Pick One Macrotask:** Look at the **Task Queue**. Pull up **EXACTLY ONE** macro task (like a setTimeout callback), push it to the stack to run, and immediately cycle back to check the Microtasks again.

**💡 Core Interview Takeaway:**

Microtasks *always* jump the line. Even a setTimeout with a 0 millisecond delay has to sit and wait until the entire Microtask Promise queue is completely empty.

### 

### **🚀 Quick Self-Test for Review**

If you see this common pattern:

JavaScript

setTimeout(() \=\> console.log("A"), 0);

Promise.resolve().then(() \=\> console.log("B"));

console.log("C");

* **Step 1:** Synchronous fires \-\> Logs **C**  
* **Step 2:** Stack clears, drains Microtask queue \-\> Logs **B**  
* **Step 3:** Event loop takes one item from Macrotask queue \-\> Logs **A**

**Result:** C \-\> B \-\> A

### **Golden Rule : Always remember:**

| Current Call Stack ↓ All Microtasks ↓ One Macrotask ↓ All Microtasks ↓ Next Macrotask |
| :---: |

[image5]: /img/docs/web-development/javascript/event-loop/event-loop-01.png

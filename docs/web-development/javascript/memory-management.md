---
title: Memory Management
sidebar_position: 21
---

# Memory Management

## Stack vs Heap

## Garbage Collection

## Mark and Sweep Algorithm

## Memory Leaks

## Closures and Leaks

## Event Listener Leaks

## Detached DOM References

## WeakMap

## WeakSet

## Common Interview Topics/Questions

* Detecting memory leaks  
* Preventing memory leaks

Memory management:   
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory\_Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)

## JavaScript Memory Management

JavaScript memory management is about how values are stored, used, and cleaned up. As frontend engineers, we usually do not manually allocate or free memory, but we must avoid holding references longer than needed. Most memory leaks happen when unused objects are still reachable through closures, event listeners, timers, caches, or detached DOM references.

---

## 1. Stack vs Heap

## Simple meaning

JavaScript uses memory to store values while code runs.

* **Stack** stores function calls and simple local values.  
* **Heap** stores objects, arrays, functions, DOM nodes, and other reference values.

## Key mental model

Primitive values are usually stored directly with the execution context. Objects are stored in the heap, and variables hold references to them.

let age \= 30;

let user \= \{  
  name: "Akhilesh",  
\};

Mental model:

* `age` stores a primitive value.  
* `user` stores a reference to an object in heap memory.

## Example

let a \= 10;  
let b \= a;

b \= 20;

console.log(a); // 10  
console.log(b); // 20

Answer: Primitive values are copied by value.

const user1 \= \{ name: "Akhilesh" \};  
const user2 \= user1;

user2.name \= "Rahul";

console.log(user1.name); // "Rahul"

Answer: Objects are copied by reference. Both variables point to the same heap object.

## Important edge cases / traps

`const` does not make an object immutable.

const user \= \{ name: "Akhilesh" \};

user.name \= "Rahul";

console.log(user.name); // "Rahul"

Answer: `const` prevents reassignment of the variable, not mutation of the object.

const user \= \{ name: "Akhilesh" \};

user \= \{ name: "Rahul" \};  
// TypeError: Assignment to constant variable.

## Interview-ready answer

Stack memory stores function calls and local execution context data, while heap memory stores objects, arrays, functions, and DOM nodes. Primitive values behave like copied values, while objects are referenced from the heap. This is why changing an object through one reference affects other references to the same object.

---

## 2. Garbage Collection

## Simple meaning

Garbage collection is the automatic process of freeing memory that is no longer reachable.

JavaScript developers do not usually free memory manually. The JavaScript engine does it automatically when objects are no longer needed.

## Key mental model

If an object can still be reached from active code, it stays in memory. If nothing can reach it anymore, it becomes eligible for garbage collection.

let user \= \{  
  name: "Akhilesh",  
\};

user \= null;

After `user = null`, the object may be garbage collected if no other references exist.

## Reachability

An object is reachable if it can be accessed from the roots, like:

* Global variables.  
* Current function call stack.  
* Closures.  
* Timers.  
* Event listeners.  
* DOM references.  
* Caches like `Map`, arrays, or objects.

## Example

let user \= \{ name: "Akhilesh" \};  
let admin \= user;

user \= null;

console.log(admin.name); // "Akhilesh"

Answer: The object is not garbage collected because `admin` still references it.

## Interview-ready answer

Garbage collection automatically frees memory for objects that are no longer reachable. JavaScript mainly tracks reachability from roots like globals, active functions, closures, timers, event listeners, and DOM references. If an object is still reachable, it cannot be collected.

---

## 3. Mark and Sweep Algorithm

## Simple meaning

Mark and Sweep is the common garbage collection approach used to find unreachable objects.

The engine starts from known roots, marks everything reachable, and then removes what was not marked.

## Key mental model

Garbage collector asks: “Can this object still be reached from active code?”

If yes, keep it. If no, clean it.

## How it works

Step by step:

* Start from roots like global objects, call stack variables, and active closures.  
* Mark all objects reachable from those roots.  
* Follow references from marked objects and mark those too.  
* Sweep memory and remove unmarked objects.

## Example

let user \= \{  
  name: "Akhilesh",  
\};

user \= null;

Step by step:

* Initially, `user` points to the object.  
* Object is reachable, so it stays.  
* After `user = null`, no reference points to that object.  
* During garbage collection, it is not marked.  
* It becomes eligible for cleanup.

## Why circular references are usually okay

let a \= \{\};  
let b \= \{\};

a.friend \= b;  
b.friend \= a;

a \= null;  
b \= null;

Answer: Even though both objects reference each other, they are not reachable from root variables anymore, so modern garbage collectors can clean them.

## Important trap

Older reference-counting garbage collectors had problems with circular references, but modern JavaScript engines mainly use reachability-based collection, so unreachable cycles can be collected.

## Interview-ready answer

Mark and Sweep starts from root references, marks all reachable objects, and then removes unmarked objects. Modern JavaScript garbage collection is based on reachability, so even circular references can be collected if they are no longer reachable from active code.

---

## 4. Memory Leaks

## Simple meaning

A memory leak happens when memory that is no longer needed is still referenced, so the garbage collector cannot clean it.

## Key mental model

A leak is not “memory exists.” A leak is “unused memory is still reachable.”

## Common causes in frontend apps

* Global variables.  
* Unremoved event listeners.  
* Uncleared timers or intervals.  
* Closures holding large data.  
* Detached DOM nodes.  
* Large caches using `Map` or object.  
* Subscriptions not cleaned up.  
* Stale references in React effects.

## Example: accidental global variable

function createUser() \{  
  user \= \{ name: "Akhilesh" \};  
\}

createUser();

In non-strict mode, `user` can become global and remain in memory longer than needed.

Better:

"use strict";

function createUser() \{  
  const user \= \{ name: "Akhilesh" \};  
\}

## Frontend example

A component loads large API data and stores it in a global cache, but never clears old entries. Even after the user leaves the page, the data stays reachable through the cache.

## Interview-ready answer

A memory leak happens when unused objects are still reachable, so garbage collection cannot remove them. In frontend apps, leaks commonly come from unremoved listeners, uncleared timers, closures, detached DOM nodes, subscriptions, and unbounded caches.

---

## 5. Closures and Leaks

## Simple meaning

A closure allows a function to remember variables from its outer scope.

Closures are useful, but they can cause leaks if they keep large objects alive unnecessarily.

## Key mental model

If an inner function still references outer variables, those variables cannot be garbage collected.

function createHandler() \{  
  const largeData \= new Array(1000000).fill("data");

  return function handleClick() \{  
    console.log(largeData.length);  
  \};  
\}

const handler \= createHandler();

Answer: `largeData` stays in memory because `handler` closes over it.

## Practical frontend example

function setupSearch() \{  
  const largeResults \= new Array(100000).fill(\{ title: "Result" \});

  document.querySelector("\#search").addEventListener("click", () \=\> \{  
    console.log(largeResults.length);  
  \});  
\}

If the listener stays attached, `largeResults` also stays in memory.

## How to prevent

* Avoid capturing large objects unnecessarily.  
* Remove event listeners when no longer needed.  
* Clear references after use.  
* Keep closures small.  
* In React, cleanup effects.

useEffect(() \=\> \{  
  const largeData \= getLargeData();

  function handleClick() \{  
    console.log("Clicked");  
  \}

  window.addEventListener("click", handleClick);

  return () \=\> \{  
    window.removeEventListener("click", handleClick);  
  \};  
\}, \[\]);

## Common mistake

Thinking closures themselves are bad. They are not. Leaks happen when closures keep unnecessary references alive.

## Interview-ready answer

Closures can cause memory leaks when an inner function keeps references to large outer-scope variables after those variables are no longer needed. Closures are not bad, but we should avoid capturing unnecessary data and clean up callbacks, listeners, and subscriptions that keep closures alive.

---

## 6. Event Listener Leaks

## Simple meaning

An event listener leak happens when a listener remains attached after the related UI is no longer needed.

The listener keeps its callback and referenced data alive.

## Example

function mountModal() \{  
  const modalData \= \{ title: "Large modal data" \};

  function handleResize() \{  
    console.log(modalData.title);  
  \}

  window.addEventListener("resize", handleResize);  
\}

mountModal();

Problem: If the modal is removed but the resize listener is not removed, `handleResize` and `modalData` may stay in memory.

## Correct cleanup

function mountModal() \{  
  const modalData \= \{ title: "Large modal data" \};

  function handleResize() \{  
    console.log(modalData.title);  
  \}

  window.addEventListener("resize", handleResize);

  return function cleanup() \{  
    window.removeEventListener("resize", handleResize);  
  \};  
\}

const cleanup \= mountModal();

cleanup();

## React example

useEffect(() \=\> \{  
  function handleResize() \{  
    console.log(window.innerWidth);  
  \}

  window.addEventListener("resize", handleResize);

  return () \=\> \{  
    window.removeEventListener("resize", handleResize);  
  \};  
\}, \[\]);

## Important trap

To remove an event listener, you need the same function reference.

window.addEventListener("resize", () \=\> \{  
  console.log("resize");  
\});

window.removeEventListener("resize", () \=\> \{  
  console.log("resize");  
\});

Answer: This does not remove the listener because both arrow functions are different references.

Correct:

function handleResize() \{  
  console.log("resize");  
\}

window.addEventListener("resize", handleResize);  
window.removeEventListener("resize", handleResize);

## Interview-ready answer

Event listener leaks happen when listeners are not removed after the UI or component is gone. The listener keeps its callback and captured variables alive. In React, we prevent this by returning cleanup from `useEffect`, and in plain JavaScript, we remove listeners using the same function reference.

---

## 7. Detached DOM References

## Simple meaning

A detached DOM node is a DOM element removed from the page but still referenced by JavaScript.

Because JavaScript still holds a reference, the garbage collector cannot clean it.

## Example

let removedNode;

function removeElement() \{  
  const element \= document.querySelector("\#modal");

  removedNode \= element;

  element.remove();  
\}

Problem: Even after removing the DOM element from the document, `removedNode` still references it.

## Practical frontend scenario

A modal, tooltip, dropdown, or table row is removed from the DOM, but some JavaScript cache, closure, listener, or variable still references it.

## Better

let removedNode;

function removeElement() \{  
  const element \= document.querySelector("\#modal");

  element.remove();

  removedNode \= null;  
\}

## Common causes

* Caching DOM nodes globally.  
* Event listeners referencing removed DOM nodes.  
* Closures holding DOM references.  
* Third-party libraries not properly destroyed.  
* Not cleaning up portals/modals/tooltips.

## React angle

React normally handles DOM cleanup, but leaks can still happen through external libraries, manually attached DOM listeners, timers, observers, or refs stored outside React.

## Interview-ready answer

A detached DOM leak happens when a DOM node is removed from the document but JavaScript still references it. Since it is still reachable, garbage collection cannot remove it. We prevent this by clearing references, removing listeners, and destroying third-party widgets properly.

---

## 8. WeakMap

## Simple meaning

`WeakMap` stores key-value pairs where keys must be objects and are weakly referenced.

If the key object is no longer referenced elsewhere, it can be garbage collected.

const weakMap \= new WeakMap();

let element \= document.querySelector("\#button");

weakMap.set(element, \{  
  clicked: 0,  
\});

element \= null;

If no other reference exists to that DOM element, it can be garbage collected.

## Key mental model

Use `WeakMap` when you want to associate metadata with an object without preventing that object from being cleaned up.

## Important points

* Keys must be objects.  
* Values can be any type.  
* Not iterable.  
* No `.size`.  
* Does not prevent garbage collection of keys.

## Practical frontend example

const elementState \= new WeakMap();

function trackElement(element) \{  
  elementState.set(element, \{  
    clickCount: 0,  
  \});  
\}

const button \= document.querySelector("\#save");

trackElement(button);

Useful for DOM metadata, private object data, and memory-safe tracking.

## WeakMap vs Map

const map \= new Map();  
let obj \= \{\};

map.set(obj, "data");  
obj \= null;

With `Map`, the object may still stay in memory because `Map` strongly references the key.

With `WeakMap`, the key is weakly referenced, so it can be collected when no other references exist.

## Interview-ready answer

`WeakMap` is useful when we need to attach metadata to objects without preventing garbage collection. Its keys must be objects, it is not iterable, and it does not expose `.size` because entries can disappear when keys are collected.

---

## 9. WeakSet

## Simple meaning

`WeakSet` stores objects weakly.

It is useful when we only need to know whether an object has been seen or processed.

const visited \= new WeakSet();

let user \= \{ id: 1 \};

visited.add(user);

console.log(visited.has(user)); // true

## Key mental model

Use `WeakSet` for temporary object tracking without preventing garbage collection.

## Important points

* Only objects can be stored.  
* Not iterable.  
* No `.size`.  
* Does not prevent garbage collection.  
* Useful for visited object tracking.

## Practical example

const processed \= new WeakSet();

function processNode(node) \{  
  if (processed.has(node)) return;

  processed.add(node);

  console.log("Processing node");  
\}

This can be useful for DOM nodes, graph traversal, or avoiding repeated processing.

## Common trap

const weakSet \= new WeakSet();

weakSet.add(1);  
// TypeError: Invalid value used in weak set

## Interview-ready answer

`WeakSet` stores weak references to objects. It is useful for tracking whether an object has been seen or processed without preventing that object from being garbage collected. It only accepts objects and cannot be iterated.

---

## Common Interview Topics / Questions

---

## 1. How do you detect memory leaks?

## Simple answer

Use browser DevTools, observe memory growth, take heap snapshots, and check whether unused objects are still retained.

## Practical steps

### 1. Reproduce the suspected leak

Perform the same action repeatedly.

Example:

* Open and close a modal 20 times.  
* Navigate between pages repeatedly.  
* Run search repeatedly.  
* Mount and unmount a component repeatedly.  
* Open a large table and switch filters multiple times.

### 2. Use Chrome DevTools Memory tab

Common tools:

* **Heap snapshot:** See objects retained in memory.  
* **Allocation instrumentation:** See memory allocations over time.  
* **Performance monitor:** Watch JS heap size while using the app.

### 3. Compare heap snapshots

Take snapshots:

* Before action.  
* After repeated action.  
* After forcing garbage collection.  
* Compare retained objects.

If objects keep growing and are not released, there may be a leak.

### 4. Look for common retained objects

* Detached DOM nodes.  
* Event listener callbacks.  
* Timers and intervals.  
* Large arrays or objects.  
* Closures retaining data.  
* Global caches.  
* Subscriptions.  
* Observers like `MutationObserver`, `ResizeObserver`, `IntersectionObserver`.

## Example leak pattern

useEffect(() \=\> \{  
  const intervalId \= setInterval(() \=\> \{  
    console.log("running");  
  \}, 1000);  
\}, \[\]);

Problem: No cleanup. The interval may keep running after component unmounts.

Correct:

useEffect(() \=\> \{  
  const intervalId \= setInterval(() \=\> \{  
    console.log("running");  
  \}, 1000);

  return () \=\> \{  
    clearInterval(intervalId);  
  \};  
\}, \[\]);

## Interview-ready answer

I detect memory leaks by reproducing the action repeatedly, then using Chrome DevTools Memory tab to take and compare heap snapshots. I look for retained objects that should have been released, such as detached DOM nodes, listeners, timers, closures, subscriptions, observers, and large cached data. If memory keeps growing after garbage collection, it is a strong leak signal.

---

## 2. How do you prevent memory leaks?

## Simple answer

Prevent memory leaks by cleaning up references when they are no longer needed.

## Practical checklist

### Remove event listeners

useEffect(() \=\> \{  
  function handleResize() \{  
    console.log(window.innerWidth);  
  \}

  window.addEventListener("resize", handleResize);

  return () \=\> \{  
    window.removeEventListener("resize", handleResize);  
  \};  
\}, \[\]);

### Clear timers and intervals

useEffect(() \=\> \{  
  const timerId \= setTimeout(() \=\> \{  
    console.log("done");  
  \}, 1000);

  return () \=\> \{  
    clearTimeout(timerId);  
  \};  
\}, \[\]);

useEffect(() \=\> \{  
  const intervalId \= setInterval(() \=\> \{  
    console.log("polling");  
  \}, 5000);

  return () \=\> \{  
    clearInterval(intervalId);  
  \};  
\}, \[\]);

### Abort in-flight API requests

useEffect(() \=\> \{  
  const controller \= new AbortController();

  fetch("/api/users", \{  
    signal: controller.signal,  
  \});

  return () \=\> \{  
    controller.abort();  
  \};  
\}, \[\]);

### Unsubscribe from subscriptions

useEffect(() \=\> \{  
  const unsubscribe \= store.subscribe(() \=\> \{  
    console.log("state changed");  
  \});

  return () \=\> \{  
    unsubscribe();  
  \};  
\}, \[\]);

### Disconnect observers

useEffect(() \=\> \{  
  const observer \= new ResizeObserver(() \=\> \{  
    console.log("resized");  
  \});

  observer.observe(document.body);

  return () \=\> \{  
    observer.disconnect();  
  \};  
\}, \[\]);

### Avoid unbounded caches

const cache \= new Map();

function setCache(key, value) \{  
  if (cache.size \> 100\) \{  
    const firstKey \= cache.keys().next().value;  
    cache.delete(firstKey);  
  \}

  cache.set(key, value);  
\}

### Use WeakMap / WeakSet where useful

Use `WeakMap` or `WeakSet` for object metadata when you do not want the collection to keep objects alive.

## Interview-ready answer

**I prevent memory leaks by cleaning up event listeners, timers, intervals, subscriptions, observers, and in-flight API requests. I also avoid unbounded caches and unnecessary global references. In React, cleanup usually belongs inside the function returned from `useEffect`. For object metadata, `WeakMap` and `WeakSet` can help avoid keeping objects alive unnecessarily.**

---

## 3. How can closures cause memory leaks?

## Answer

Closures can keep outer variables alive even after the outer function has finished. This becomes a leak when the closure is still referenced and the captured data is no longer needed.

function createListener() \{  
  const largeData \= new Array(1000000).fill("data");

  return function listener() \{  
    console.log(largeData.length);  
  \};  
\}

const listener \= createListener();

window.addEventListener("click", listener);

Here `largeData` remains in memory because `listener` closes over it and the event listener keeps `listener` alive.

## Fix

window.removeEventListener("click", listener);

Or avoid capturing large data unnecessarily.

## Interview-ready answer

Closures keep references to outer-scope variables. If a long-lived callback, event listener, timer, or subscription closes over large data, that data cannot be garbage collected. The fix is to avoid capturing unnecessary data and clean up the callback when it is no longer needed.

---

## 4. Why do event listeners cause leaks?

## Answer

An event listener keeps a reference to its callback. If that callback references component data, DOM nodes, or large objects, those also stay in memory.

function mount() \{  
  const data \= new Array(100000).fill("data");

  function onScroll() \{  
    console.log(data.length);  
  \}

  window.addEventListener("scroll", onScroll);  
\}

If `onScroll` is not removed, `data` stays alive.

## Fix

window.removeEventListener("scroll", onScroll);

In React, return cleanup from `useEffect`.

## Interview-ready answer

Event listeners can cause leaks because the browser keeps the callback reference. If the listener is not removed, the callback and any variables it closes over remain reachable. This is why we remove listeners during cleanup.

---

## 5. What are detached DOM nodes?

## Answer

Detached DOM nodes are elements removed from the DOM tree but still referenced by JavaScript.

let cachedModal;

function closeModal() \{  
  cachedModal \= document.querySelector("\#modal");

  cachedModal.remove();  
\}

The modal is no longer visible, but `cachedModal` still references it.

## Fix

function closeModal() \{  
  const modal \= document.querySelector("\#modal");

  modal.remove();  
  cachedModal \= null;  
\}

## Interview-ready answer

Detached DOM nodes are removed elements that JavaScript still references. They can leak memory because the garbage collector sees them as reachable. We prevent this by clearing references, removing listeners, and properly destroying third-party DOM libraries.

---

## 6. Map vs WeakMap for memory

## Simple answer

`Map` strongly references its keys. `WeakMap` weakly references object keys.

const map \= new Map();

let obj \= \{ id: 1 \};

map.set(obj, "metadata");

obj \= null;

In this case, the object can still be retained through `map`.

With `WeakMap`:

const weakMap \= new WeakMap();

let obj \= \{ id: 1 \};

weakMap.set(obj, "metadata");

obj \= null;

If no other references exist, the object can be garbage collected.

## Interview-ready answer

Use `Map` for normal key-value collections. Use `WeakMap` when keys are objects and we do not want the collection itself to prevent those objects from being garbage collected. This is useful for metadata attached to DOM nodes or object instances.

---

## 7. Common React memory leak scenarios

## Common cases

* `setInterval` not cleared.  
* Window/document event listener not removed.  
* API response updates state after component unmount.  
* WebSocket subscription not closed.  
* Store subscription not unsubscribed.  
* Observer not disconnected.  
* Third-party chart/editor/table instance not destroyed.

## Example: interval leak

useEffect(() \=\> \{  
  const id \= setInterval(() \=\> \{  
    console.log("polling");  
  \}, 1000);

  return () \=\> \{  
    clearInterval(id);  
  \};  
\}, \[\]);

## Example: request cleanup

useEffect(() \=\> \{  
  const controller \= new AbortController();

  async function loadUsers() \{  
    try \{  
      const response \= await fetch("/api/users", \{  
        signal: controller.signal,  
      \});

      const data \= await response.json();

      setUsers(data);  
    \} catch (error) \{  
      if (error.name \=== "AbortError") return;

      setError(error.message);  
    \}  
  \}

  loadUsers();

  return () \=\> \{  
    controller.abort();  
  \};  
\}, \[\]);

## Interview-ready answer

In React, memory leaks usually happen when effects create side effects but do not clean them up. Common examples are timers, event listeners, subscriptions, observers, WebSocket connections, and in-flight API calls. The fix is to return a cleanup function from `useEffect`.

---

## Quick Revision Summary

| Topic | Key point |
| ----- | ----- |
| Stack | Stores function calls and local execution context |
| Heap | Stores objects, arrays, functions, DOM nodes |
| Primitive | Copied by value |
| Object | Copied by reference |
| Garbage collection | Frees unreachable memory |
| Mark and Sweep | Marks reachable objects and removes unreachable ones |
| Memory leak | Unused memory still reachable |
| Closure leak | Callback keeps outer data alive |
| Event listener leak | Listener keeps callback and captured data alive |
| Detached DOM | Removed DOM node still referenced by JS |
| Map | Strongly references keys |
| WeakMap | Weakly references object keys |
| WeakSet | Weakly tracks objects |
| React cleanup | Return cleanup from `useEffect` |

---

## Final Interview-Ready Combined Answer

JavaScript manages memory automatically using garbage collection. Primitive values are simple values, while objects, arrays, functions, and DOM nodes are stored in heap memory and accessed by reference. The garbage collector mainly uses reachability, often explained through the Mark and Sweep algorithm, where reachable objects are kept and unreachable ones are cleaned. Memory leaks happen when unused objects are still reachable through closures, event listeners, timers, DOM references, subscriptions, or caches. In frontend apps, I prevent leaks by cleaning up listeners, timers, subscriptions, observers, in-flight requests, and by avoiding unbounded caches. `WeakMap` and `WeakSet` are useful when we want to associate data with objects without preventing garbage collection.

Heap memory is the memory area where JavaScript stores **objects and reference values** like objects, arrays, functions, dates, maps, sets, and DOM nodes.

Simple mental model: **Stack stores small/direct values and function calls. Heap stores bigger dynamic data, and variables keep references to that data.**

let name \= "Akhilesh";

const user \= \{  
 id: 1,  
 name: "Akhilesh",  
\};

Here:

* `name` is a primitive value.  
* `user` variable holds a reference.  
* The actual object `\{ id: 1, name: "Akhilesh" \}` lives in heap memory.

Example:

const user1 \= \{ name: "Akhilesh" \};  
const user2 \= user1;

user2.name \= "Rahul";

console.log(user1.name); // "Rahul"

Answer: Both `user1` and `user2` point to the same object in heap memory, so changing through one reference affects the other.

Interview-ready answer: Heap memory is where JavaScript stores reference-type data such as objects, arrays, functions, and DOM nodes. Variables usually store references to these heap objects. Heap memory is managed automatically by garbage collection, which removes objects when they are no longer reachable.

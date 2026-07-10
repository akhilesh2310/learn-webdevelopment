---
title: Memory Management
sidebar_position: 21
---

# Memory Management

JavaScript manages memory automatically, but frontend engineers still need to avoid keeping unused objects reachable through closures, event listeners, timers, caches, subscriptions, or detached DOM references.

Reference: [MDN JavaScript Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)

## Stack vs Heap

JavaScript uses memory to store values while code runs.

- **Stack:** stores function calls and local execution context data.
- **Heap:** stores objects, arrays, functions, DOM nodes, maps, sets, and other reference values.

Primitive values behave like copied values.

```js
let a = 10;
let b = a;

b = 20;

console.log(a);
// 10

console.log(b);
// 20
```

Objects are referenced from the heap.

```js
const user1 = { name: "Akhilesh" };
const user2 = user1;

user2.name = "Rahul";

console.log(user1.name);
// Rahul
```

`const` prevents reassignment of the variable, not mutation of the object.

```js
const user = { name: "Akhilesh" };

user.name = "Rahul";

console.log(user.name);
// Rahul
```

## Garbage Collection

Garbage collection automatically frees memory for objects that are no longer reachable.

```js
let user = {
  name: "Akhilesh",
};

user = null;
```

After `user = null`, the object may be garbage collected if no other references exist.

Common roots that keep objects reachable:

- Global variables
- Current function call stack
- Closures
- Timers
- Event listeners
- DOM references
- Caches such as `Map`, arrays, or objects

```js
let user = { name: "Akhilesh" };
let admin = user;

user = null;

console.log(admin.name);
// Akhilesh
```

The object is not collectable because `admin` still references it.

## Mark and Sweep

Mark and Sweep is the common garbage-collection model used to explain reachability.

The engine:

1. Starts from roots such as globals, stack variables, and active closures.
2. Marks all reachable objects.
3. Follows references from marked objects.
4. Sweeps unmarked objects.

Circular references can be collected when the cycle is no longer reachable from roots.

```js
let a = {};
let b = {};

a.friend = b;
b.friend = a;

a = null;
b = null;
```

Even though the objects reference each other, modern reachability-based collectors can clean them if no root can reach them.

## Memory Leaks

A memory leak happens when memory that is no longer needed is still reachable.

Common frontend causes:

- Global variables
- Unremoved event listeners
- Uncleared timers or intervals
- Closures holding large data
- Detached DOM nodes
- Unbounded caches
- Subscriptions not cleaned up
- Observers not disconnected
- Stale references in React effects

## Closures and Leaks

Closures are useful, but they can retain large objects if a long-lived callback closes over them.

```js
function createHandler() {
  const largeData = new Array(1000000).fill("data");

  return function handleClick() {
    console.log(largeData.length);
  };
}

const handler = createHandler();
```

`largeData` stays in memory as long as `handler` is reachable.

Prevent closure leaks by:

- Avoiding unnecessary captures.
- Removing event listeners.
- Clearing references after use.
- Keeping closures small.
- Returning cleanup from React effects.

## Event Listener Leaks

An event listener keeps a reference to its callback and any variables captured by that callback.

```js
function mountModal() {
  const modalData = { title: "Large modal data" };

  function handleResize() {
    console.log(modalData.title);
  }

  window.addEventListener("resize", handleResize);
}
```

If the modal disappears but the listener stays attached, `handleResize` and `modalData` may stay in memory.

Correct cleanup:

```js
function mountModal() {
  const modalData = { title: "Large modal data" };

  function handleResize() {
    console.log(modalData.title);
  }

  window.addEventListener("resize", handleResize);

  return function cleanup() {
    window.removeEventListener("resize", handleResize);
  };
}

const cleanup = mountModal();

cleanup();
```

React example:

```js
useEffect(() => {
  function handleResize() {
    console.log(window.innerWidth);
  }

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
```

Important: `removeEventListener` needs the same function reference.

## Detached DOM References

A detached DOM node is an element removed from the page but still referenced by JavaScript.

```js
let removedNode;

function removeElement() {
  const element = document.querySelector("#modal");

  removedNode = element;
  element.remove();
}
```

Even after removal from the document, `removedNode` still references the element.

Better:

```js
let removedNode;

function removeElement() {
  const element = document.querySelector("#modal");

  element.remove();
  removedNode = null;
}
```

## WeakMap

`WeakMap` stores key-value pairs where keys must be objects and are weakly referenced.

```js
const weakMap = new WeakMap();
let element = document.querySelector("#button");

weakMap.set(element, {
  clicked: 0,
});

element = null;
```

If no other references exist, the DOM element can be garbage collected.

Important points:

- Keys must be objects.
- Values can be any type.
- Not iterable.
- No `.size`.
- Does not prevent garbage collection of keys.

## WeakSet

`WeakSet` stores objects weakly. It is useful when you only need to know whether an object has been seen or processed.

```js
const visited = new WeakSet();
let user = { id: 1 };

visited.add(user);

console.log(visited.has(user));
// true
```

Important points:

- Only objects can be stored.
- Not iterable.
- No `.size`.
- Does not prevent garbage collection.

## Detecting Memory Leaks

Use browser DevTools and compare memory before and after repeated actions.

Practical steps:

1. Reproduce the suspected leak repeatedly.
2. Use Chrome DevTools Memory tools.
3. Take heap snapshots before and after the repeated action.
4. Force garbage collection if possible.
5. Compare retained objects.

Look for:

- Detached DOM nodes
- Event listener callbacks
- Timers and intervals
- Large arrays or objects
- Closures retaining data
- Global caches
- Subscriptions
- `MutationObserver`, `ResizeObserver`, or `IntersectionObserver`

## Preventing Memory Leaks

### Clear Timers

```js
useEffect(() => {
  const intervalId = setInterval(() => {
    console.log("polling");
  }, 5000);

  return () => {
    clearInterval(intervalId);
  };
}, []);
```

### Abort In-Flight Requests

```js
useEffect(() => {
  const controller = new AbortController();

  fetch("/api/users", {
    signal: controller.signal,
  });

  return () => {
    controller.abort();
  };
}, []);
```

### Unsubscribe from Subscriptions

```js
useEffect(() => {
  const unsubscribe = store.subscribe(() => {
    console.log("state changed");
  });

  return () => {
    unsubscribe();
  };
}, []);
```

### Disconnect Observers

```js
useEffect(() => {
  const observer = new ResizeObserver(() => {
    console.log("resized");
  });

  observer.observe(document.body);

  return () => {
    observer.disconnect();
  };
}, []);
```

### Avoid Unbounded Caches

```js
const cache = new Map();

function setCache(key, value) {
  if (cache.size > 100) {
    const firstKey = cache.keys().next().value;
    cache.delete(firstKey);
  }

  cache.set(key, value);
}
```

## React Leak Checklist

Common cases:

- `setInterval` not cleared.
- Window or document listener not removed.
- API response updates state after unmount.
- WebSocket subscription not closed.
- Store subscription not unsubscribed.
- Observer not disconnected.
- Third-party chart, editor, or table instance not destroyed.

In React, cleanup usually belongs in the function returned from `useEffect`.

## Quick Revision Summary

| Topic | Key Point |
| :---- | :---- |
| Stack | Function calls and local execution context |
| Heap | Objects, arrays, functions, DOM nodes |
| Primitive | Copied by value |
| Object | Copied by reference |
| Garbage collection | Frees unreachable memory |
| Mark and Sweep | Marks reachable objects and removes unreachable ones |
| Memory leak | Unused memory still reachable |
| Closure leak | Callback keeps outer data alive |
| Event listener leak | Listener keeps callback and captured data alive |
| Detached DOM | Removed DOM node still referenced by JavaScript |
| Map | Strongly references keys |
| WeakMap | Weakly references object keys |
| WeakSet | Weakly tracks objects |
| React cleanup | Return cleanup from `useEffect` |

## Interview Answer

JavaScript manages memory automatically using garbage collection. Primitive values behave like copied values, while objects, arrays, functions, and DOM nodes live in heap memory and are accessed by reference. Garbage collection is based on reachability: reachable objects stay, unreachable objects can be cleaned. Memory leaks happen when unused objects are still reachable through closures, event listeners, timers, DOM references, subscriptions, observers, or caches. In frontend apps, I prevent leaks by cleaning up listeners, timers, subscriptions, observers, in-flight requests, and by avoiding unbounded caches. `WeakMap` and `WeakSet` help associate data with objects without preventing garbage collection.

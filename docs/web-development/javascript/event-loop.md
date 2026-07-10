---
title: Event Loop
sidebar_position: 9
---

# Event Loop

The event loop is the runtime mechanism that lets single-threaded JavaScript handle asynchronous work without blocking the main call stack.

Instead of freezing while waiting for a timer, network request, or user event, JavaScript delegates that work to the runtime environment and handles the callback later.

## Runtime Components

### Call Stack

The call stack tracks the function currently running. It executes synchronous code in Last-In, First-Out order.

If a function is on the stack, the engine keeps running it until it completes.

### Web APIs

In browsers, Web APIs handle background work such as:

- `setTimeout`
- `fetch`
- DOM event listeners
- timers

These APIs are provided by the browser environment, not by the JavaScript engine itself.

### Task Queues

When background work finishes, its callback waits in a queue until the call stack is empty.

- **Microtask queue:** high-priority queue for promise callbacks, `queueMicrotask()`, `MutationObserver`, and async/await continuation steps.
- **Macrotask queue:** lower-priority queue for timers, intervals, DOM events, and other task callbacks.
- **Rendering phase:** browsers may update layout and paint between task turns.

## Event Loop Rules

The event loop repeatedly follows this process:

1. Run all synchronous code on the call stack.
2. When the stack is empty, drain the entire microtask queue.
3. Take one macrotask from the macrotask queue and run it.
4. Repeat the cycle.

Important: microtasks always run before the next macrotask. A `setTimeout(..., 0)` callback still waits until pending promise callbacks finish.

## Microtasks vs Macrotasks

| Feature | Microtask Queue | Macrotask Queue |
| :---- | :---- | :---- |
| Priority | High | Lower |
| Execution pace | Drains the entire queue before moving on | Runs one task per event-loop turn |
| Examples | `Promise.then`, `queueMicrotask`, async/await resumes | `setTimeout`, `setInterval`, DOM events |
| Rendering | Runs before the browser gets another task turn | Often runs after rendering opportunities |

## Browser vs Node.js

The browser event loop focuses heavily on user interaction, layout, and rendering.

Node.js uses `libuv` and has more specific internal phases for timers, I/O polling, and close callbacks. The broad idea is the same, but the detailed scheduling model differs.

## Async/Await and Microtasks

`await` pauses only the async function, not the whole JavaScript thread. The continuation after the awaited promise is scheduled as a microtask.

## Puzzle 1: Promise Before Timeout

```js
console.log("1: Script Start");

setTimeout(() => {
  console.log("2: setTimeout Callback");
}, 0);

Promise.resolve().then(() => {
  console.log("3: Promise Callback");
});

console.log("4: Script End");
```

Output:

```text
1: Script Start
4: Script End
3: Promise Callback
2: setTimeout Callback
```

Why:

1. Synchronous logs run first.
2. The timeout callback goes to the macrotask queue.
3. The promise callback goes to the microtask queue.
4. After the stack clears, microtasks run before macrotasks.

## Puzzle 2: Promise Constructor Trap

```js
console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

new Promise((resolve) => {
  console.log("Inside Constructor");
  resolve();
}).then(() => {
  console.log("Promise Then");
});

console.log("End");
```

Output:

```text
Start
Inside Constructor
End
Promise Then
Timeout
```

The promise constructor runs synchronously. Only the `.then()` callback is scheduled as a microtask.

## Puzzle 3: Microtask Starvation

```js
function starveEventLoop() {
  Promise.resolve().then(() => {
    starveEventLoop();
  });
}

setTimeout(() => {
  console.log("Will I ever print?");
}, 0);

starveEventLoop();
```

The timeout may never run because each microtask schedules another microtask. The microtask queue never fully drains, so the event loop does not get a chance to process the macrotask queue.

## Runtime Map

![][image5]

## Quick Self-Test

```js
setTimeout(() => console.log("A"), 0);

Promise.resolve().then(() => console.log("B"));

console.log("C");
```

Output:

```text
C
B
A
```

Reason:

1. Synchronous code logs `C`.
2. The microtask queue logs `B`.
3. The macrotask queue logs `A`.

## Golden Rule

```text
Current call stack -> all microtasks -> one macrotask -> all microtasks -> next macrotask
```

## Interview Answer

The event loop lets single-threaded JavaScript run asynchronous callbacks after synchronous code finishes. The call stack runs normal code first. When it becomes empty, the event loop drains all microtasks, such as promise callbacks, before running one macrotask, such as a `setTimeout` callback.

[image5]: /img/docs/web-development/javascript/event-loop/event-loop-01.png

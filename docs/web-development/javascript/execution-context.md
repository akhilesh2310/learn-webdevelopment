---
title: Execution Context
sidebar_position: 4
---

# Execution Context

In JavaScript, everything runs inside an execution context. The call stack is the mechanism the engine uses to manage which execution context is currently running.

## Core Terms

- **Global Execution Context (GEC):** the default context created when a script starts.
- **Function Execution Context (FEC):** a new context created every time a function is called.
- **Creation Phase:** the phase where declarations, scope links, and `this` bindings are prepared.
- **Execution Phase:** the phase where code runs line by line.
- **Call Stack:** the stack that tracks currently active execution contexts.
- **Stack Overflow:** an error caused by pushing too many frames onto the call stack.

## What Is an Execution Context?

An execution context is an abstract environment created by the JavaScript engine to evaluate and execute code. It manages the variables, functions, scope chain, and `this` binding available to the currently executing code.

## Global Execution Context

The global execution context is created when the script first runs.

- It creates the global object: `window` in browsers and `global` in Node.js.
- It binds `this` to the global object in non-module browser scripts.
- There is exactly one global execution context per JavaScript program.

## Function Execution Context

A function execution context is created every time a function is invoked.

Each function call gets its own context containing:

- Local variables
- Function arguments
- Scope references
- Its own `this` binding rules

Function execution contexts are temporary. They are created when the function starts and usually removed when the function returns.

## The Call Stack

JavaScript uses a call stack, which is a Last-In, First-Out (LIFO) data structure.

```text
Top of stack
┌────────────────────────┐
│ Function context       │
├────────────────────────┤
│ Function context       │
├────────────────────────┤
│ Global context         │
└────────────────────────┘
Bottom of stack
```

How it works:

1. When code starts, the global execution context is pushed onto the stack.
2. When a function is called, a function execution context is created and pushed on top.
3. The engine always executes the context at the top of the stack.
4. When a function returns, its context is popped off the stack.

## Creation Phase vs Execution Phase

Every execution context goes through two phases. This separation explains concepts like hoisting.

### Creation Phase

Before executable code runs, the engine scans the code and prepares the context.

During this phase, the engine:

- Creates the lexical environment.
- Allocates memory for declarations.
- Sets up the outer environment reference, which creates the scope chain.
- Determines the value of `this`.

### Execution Phase

During execution, the engine runs code line by line.

In this phase, the engine:

- Assigns values to variables.
- Executes function calls.
- Updates memory references.
- Pushes and pops execution contexts on the call stack.

## Stack Overflow

The call stack has a finite size. If too many execution contexts are pushed onto it, the engine throws an error such as:

```text
RangeError: Maximum call stack size exceeded
```

### Unbounded Recursion

Recursive utilities such as deep cloning or DOM traversal can crash if the recursion depth is larger than the engine's stack limit.

```js
function recurse() {
  recurse();
}

recurse();
// RangeError: Maximum call stack size exceeded
```

## Preventing Stack Overflows

For deeply nested logic, convert recursion to iteration or use a trampoline function. A trampoline returns the next function to run instead of calling it immediately, keeping stack usage flat.

```js
const trampoline = (fn) => (...args) => {
  let result = fn(...args);

  while (typeof result === "function") {
    result = result();
  }

  return result;
};

const safelyCount = (max) => {
  const run = (current) => {
    if (current >= max) {
      return current;
    }

    return () => run(current + 1);
  };

  return run(0);
};

const total = trampoline(safelyCount)(200000);

console.log(total);
// 200000
```

## Interview Answer

An execution context is the environment the JavaScript engine creates to run code. The global execution context is created first, and every function call creates a new function execution context. These contexts are managed by the call stack, which runs in LIFO order.

Each execution context has a creation phase, where declarations and scope links are prepared, and an execution phase, where the code actually runs. If too many function calls are pushed onto the stack, usually because of unbounded recursion, JavaScript throws a stack overflow error.

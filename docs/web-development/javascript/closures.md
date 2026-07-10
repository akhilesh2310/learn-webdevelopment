---
title: Closures
sidebar_position: 14
---

# Closures

A closure is created when a function remembers variables from its outer scope, even after that outer function has finished executing.

References:

- [W3Schools JavaScript Closures](https://www.w3schools.com/js/js_function_closures.asp)
- [MDN Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [Simple Explanation of JavaScript Closures](https://dmitripavlutin.com/simple-explanation-of-javascript-closures/)
- [JavaScript Tutorial: Closure](https://www.javascripttutorial.net/javascript-closure/)

## What Is a Closure?

A closure is an inner function plus the lexical environment it was created in.

```js
function outer() {
  const message = "Hello";

  return function inner() {
    console.log(message);
  };
}

const logMessage = outer();

logMessage();
// Hello
```

The outer function has returned, but `inner` still remembers `message`.

## How Closures Work

At a high level:

1. The outer function runs and creates a lexical environment.
2. The inner function is created with a hidden reference to that environment.
3. If the inner function survives after the outer function returns, the captured variables stay alive.

This is why closures are powerful, but also why they can retain memory longer than expected.

## Common Use Cases

- Data hiding and private variables
- Stateful functions
- Function factories
- Memoization
- Currying
- Module patterns

Detailed memoization and currying notes are maintained in [Advanced JS](./advanced-js.md), and reusable implementations are maintained in [JavaScript Coding Questions](./javascript-coding-questions.md).

## Data Hiding

Closures can keep internal data private.

```js
function createSecureStack() {
  const items = [];

  return {
    push(item) {
      items.push(item);
    },
    pop() {
      return items.pop();
    },
    peek() {
      return items[items.length - 1];
    },
  };
}

const stack = createSecureStack();

stack.push(10);
stack.push(20);

console.log(stack.pop());
// 20

stack.items = [];

console.log(stack.peek());
// 10
```

The real `items` array is not accessible from outside.

## Function Factories

Function factories use closures to create customized functions.

```js
function createGreeter(greetingPrefix) {
  return function greet(userName) {
    return `${greetingPrefix}, ${userName}!`;
  };
}

const sayHi = createGreeter("Hi");
const sayHello = createGreeter("Hello");

console.log(sayHi("John"));
// Hi, John!

console.log(sayHello("John"));
// Hello, John!
```

## Memory Implications

Closures keep references to captured variables. If a closure captures a large object or DOM node and remains reachable, that data cannot be garbage collected.

```js
function loadLargeData() {
  let massiveDataArray = new Array(1000000).fill("Heavy Memory Data");

  return function logData() {
    console.log(massiveDataArray[0]);
  };
}

let leakyClosure = loadLargeData();

leakyClosure();

leakyClosure = null;
```

Setting `leakyClosure` to `null` breaks the reference so the captured data can be reclaimed when nothing else references it.

## Interview Puzzles

### Puzzle 1: Loop Scope

Callbacks close over variables, not only values. The classic `var` loop puzzle and its `let`/IIFE fixes are maintained in [Hoisting](./hoisting.md).

### Puzzle 2: Lost `this` in a Closure

```js
const userSession = {
  count: 0,
  init() {
    return function () {
      this.count++;
      console.log(this.count);
    };
  },
};

const increment = userSession.init();

increment();
```

Output in sloppy browser mode:

```text
NaN
```

This is a `this` binding problem disguised as a closure problem. `increment()` is called as a standalone function, so `this` does not refer to `userSession`.

Fix with an arrow function:

```js
const userSession = {
  count: 0,
  init() {
    return () => {
      this.count++;
      console.log(this.count);
    };
  },
};

const increment = userSession.init();

increment();
// 1
```

### Puzzle 3: Live References vs Value Snapshots

```js
function createLiveClosure() {
  let value = 100;

  return {
    read: () => value,
    change: (newValue) => {
      value = newValue;
    },
  };
}

const closureBox = createLiveClosure();
const currentStoredValue = closureBox.read();

closureBox.change(500);

console.log(closureBox.read());
console.log(currentStoredValue);
```

Output:

```text
500
100
```

The closure retains a live reference to the variable. `currentStoredValue` is only a primitive value copied before the update.

### Puzzle 4: Block-Scoped Function Declarations

```js
"use strict";

function checkScope() {
  if (true) {
    function target() {
      return "Inside Block Scope";
    }
  }

  return target();
}

console.log(checkScope());
```

Output:

```text
ReferenceError: target is not defined
```

In strict mode, function declarations inside blocks are block-scoped.

### Puzzle 5: Independent Closure Instances

```js
function createComplexCounter() {
  let count = 0;

  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
  };
}

const instanceA = createComplexCounter();
const instanceB = createComplexCounter();

console.log(instanceA.increment());
console.log(instanceA.increment());
console.log(instanceB.increment());
console.log(instanceA.decrement());
```

Output:

```text
1
2
1
1
```

Each call to `createComplexCounter()` creates a separate lexical environment.

### Puzzle 6: Destructuring Closure Methods

```js
function createSecretService() {
  let agentCode = "007";

  return {
    getCode: () => agentCode,
    setCode: (newCode) => {
      agentCode = newCode;
    },
  };
}

const { getCode, setCode } = createSecretService();

setCode("999");

console.log(getCode());
```

Output:

```text
999
```

Destructuring does not break the closure. The functions still retain their original scope references.

### Puzzle 7: Variable Shadowing in a Closure Chain

```js
function outer(x) {
  return function middle(y) {
    return function inner(x) {
      return x + y;
    };
  };
}

const process = outer(10)(20);

console.log(process(3));
```

Output:

```text
23
```

The inner parameter `x = 3` shadows the outer parameter `x = 10`. The final result is `3 + 20`.

## Interview Answer

A closure is a function that remembers variables from the lexical scope where it was created. Closures are useful for private state, function factories, memoization, currying, and module patterns. Because closures keep captured variables alive, they can also retain memory if they reference large objects that are no longer needed.

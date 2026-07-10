---
title: Quick Q&A JS
sidebar_position: 2
---

# Quick Q&A JS

Use this page for fast JavaScript interview revision. Each answer is intentionally short; open the related topic pages when you need deeper detail.

## Language Fundamentals

### What is the difference between `var`, `let`, and `const`?

`var` is function-scoped and hoisted with `undefined`. `let` and `const` are block-scoped and hoisted, but they stay in the temporal dead zone until declaration is evaluated. `const` must be initialized and cannot be reassigned.

```js
function test() {
  if (true) {
    var x = 10;
    let y = 20;
    const z = 30;
  }

  console.log(x); // 10
  console.log(y); // ReferenceError
}
```

## Execution Context and Scope

### What is a closure?

A closure is a function that remembers variables from its outer scope even after the outer function has returned.

```js
function outer() {
  let count = 0;

  return function inner() {
    count += 1;
    console.log(count);
  };
}

const counter = outer();

counter(); // 1
counter(); // 2
```

## Functions

### What is the difference between function declaration and function expression?

Function declarations are hoisted with their function body. Function expressions assigned to variables follow the hoisting behavior of that variable.

```js
hoisted(); // Works

function hoisted() {
  console.log("Hoisted");
}

notHoisted(); // ReferenceError

const notHoisted = function () {
  console.log("Not hoisted");
};
```

## Asynchronous JavaScript

### How does the event loop work?

JavaScript runs on a single call stack. Async callbacks are queued and executed later. Promise callbacks go into the microtask queue, which runs before the next macrotask.

```js
console.log("Start");

setTimeout(() => console.log("Timeout"), 0);

Promise.resolve().then(() => console.log("Promise"));

console.log("End");

// Start
// End
// Promise
// Timeout
```

## Object-Oriented JavaScript

### How does prototypal inheritance work?

Objects can inherit properties and methods from another object through their prototype chain.

```js
const animal = {
  speak() {
    console.log("Animal speaks");
  },
};

const dog = Object.create(animal);

dog.speak(); // "Animal speaks"
```

## Data Structures

### What are the differences between `Map` and object?

`Map` can use any key type and preserves insertion order. Plain objects use string or symbol keys and are better for simple records.

```js
const map = new Map();

map.set("1", "one");
map.set(2, "two");

console.log(map.get(2)); // "two"
```

## Error Handling

### What is the difference between `throw` and `try...catch`?

`throw` raises an error. `try...catch` handles an error.

```js
try {
  throw new Error("Something went wrong");
} catch (error) {
  console.error(error.message);
}
```

## Browser APIs

### What is event delegation?

Event delegation attaches one listener to a parent and handles events from matching child elements.

```js
document.getElementById("parent").addEventListener("click", (event) => {
  if (event.target.matches("button")) {
    console.log("Button clicked:", event.target.textContent);
  }
});
```

## ES6+ Features

### What is the spread operator?

Spread expands an iterable or object into individual elements or properties.

```js
const arr = [1, 2, 3];
const newArr = [...arr, 4];

console.log(newArr); // [1, 2, 3, 4]
```

## Miscellaneous

### What is currying?

Currying transforms a function with multiple arguments into a sequence of functions that each take one argument.

```js
function multiply(a) {
  return function (b) {
    return a * b;
  };
}

const double = multiply(2);

console.log(double(5)); // 10
```

## TypeScript Notes

TypeScript interview notes are maintained in the TypeScript section:

- [TypeScript Concepts](../../typescript/ts-concepts.md)
- [TypeScript Code](../../typescript/code.md)
- [TypeScript Interview Notes](../../typescript/interview-qa.md)

Keep this page focused on JavaScript quick revision.

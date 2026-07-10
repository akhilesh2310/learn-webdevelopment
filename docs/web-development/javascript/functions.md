---
title: Functions
sidebar_position: 11
---

# Functions

Reference: [Different Ways of Writing Functions in JavaScript](https://www.geeksforgeeks.org/different-ways-of-writing-functions-in-javascipt/)

JavaScript functions can be declared, assigned to variables, passed around as values, returned from other functions, and used to build functional programming patterns.

## Function Types

### Function Declaration

A function declaration is a named function written as a standalone statement.

```js
function greet() {
  return "Hello!";
}
```

Function declarations are fully hoisted, so they can be called before their definition appears in the file.

```js
hoisted();

function hoisted() {
  console.log("Hoisted!");
}
```

### Function Expression

A function expression creates a function and assigns it to a variable.

```js
const greet = function () {
  return "Hello!";
};
```

Function expressions follow variable hoisting rules. With `let` or `const`, they are in the Temporal Dead Zone before initialization.

```js
notHoisted();
// ReferenceError

const notHoisted = function () {
  console.log("Not hoisted");
};
```

### Named Function Expression

A named function expression has an internal function name while still being assigned to a variable.

```js
const factory = function computeTotal(price) {
  return price * 1.1;
};
```

Named function expressions are helpful for debugging stack traces and safe self-recursion.

## Arrow Functions

Arrow functions were introduced in ES6. They provide shorter syntax and do not have their own `this`, `arguments`, `prototype`, or constructor behavior.

```js
const double = (x) => x * 2;

const add = (a, b) => {
  return a + b;
};
```

## Regular Functions vs Arrow Functions

| Feature | Regular Function | Arrow Function |
| :---- | :---- | :---- |
| `this` binding | Dynamic, based on how the function is called | Lexical, inherited from outer scope |
| `arguments` object | Available | Not available |
| Constructor usage | Can be called with `new` | Cannot be called with `new` |
| `.prototype` property | Exists | Does not exist |
| Best fit | Object methods, constructors, dynamic context | Short callbacks, lexical `this` use cases |

### Shorter Syntax

```js
const addRegular = function (x, y) {
  return x + y;
};

const addArrow = (x, y) => {
  return x + y;
};

const addImplicit = (x, y) => x + y;

const squareNum = (x) => x * x;
```

### No `arguments` Binding

Regular functions have an `arguments` object.

```js
const getData = {
  showArg: function () {
    console.log(arguments);
  },
};

getData.showArg(1, 2, 3);
```

Arrow functions do not have their own `arguments`.

```js
const getData = {
  showArg: () => {
    console.log(arguments);
  },
};

getData.showArg(1, 2, 3);
// ReferenceError in many module contexts
```

Use rest parameters instead:

```js
const exampleFunction = {
  printArguments: (...args) => {
    console.log(...args);
  },
};

exampleFunction.printArguments(1, 2, 3);
```

### Lexical `this`

Arrow functions inherit `this` from the nearest non-arrow parent scope.

```js
const user = {
  fullName: "Akhilesh Bamhore",

  printInRegular() {
    console.log(`My name is ${this.fullName}`);
  },

  printInArrow: () => {
    console.log(`My name is ${this.fullName}`);
  },
};

user.printInRegular();
// My name is Akhilesh Bamhore

user.printInArrow();
// My name is undefined
```

### Constructor Behavior

Regular functions can be used with `new`.

```js
function Add(x, y) {
  this.total = x + y;
}

const result = new Add(2, 3);

console.log(result.total);
// 5
```

Arrow functions cannot be constructors.

```js
const Add = (x, y) => x + y;

new Add(2, 3);
// TypeError: Add is not a constructor
```

## Functional Programming Concepts

### First-Class Functions

Functions are first-class values in JavaScript. You can assign them to variables, pass them as arguments, return them from other functions, and store them in objects.

### Higher-Order Functions

A higher-order function either takes a function as an argument or returns a function.

```js
function operation(fn, value) {
  return fn(value);
}

const square = (n) => n * n;

console.log(operation(square, 5));
// 25
```

Built-in examples include `.map()`, `.filter()`, and `.reduce()`.

Polyfill-style implementations are maintained in [JavaScript Coding Questions](./javascript-coding-questions.md).

### Callback Functions

A callback is a function passed as an argument and executed later.

```js
setTimeout(() => {
  console.log("Timer finished!");
}, 1000);
```

Callbacks are common in async operations and event handlers.

### Callback Hell

Deeply nested callbacks can become difficult to read and maintain.

```js
getUserData(userId, (user) => {
  getPermissions(user.role, (permissions) => {
    getFeatureFlags(permissions, (flags) => {
      renderDashboard(flags, () => {
        console.log("Dashboard loaded!");
      });
    });
  });
});
```

Promises and `async/await` flatten this flow.

```js
const fetchPermissionsPromise = (role) => {
  return new Promise((resolve, reject) => {
    getPermissions(role, (err, permissions) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(permissions);
    });
  });
};

async function loadDashboard(userId) {
  try {
    const user = await getUserDataPromise(userId);
    const permissions = await fetchPermissionsPromise(user.role);
    const flags = await getFeatureFlagsPromise(permissions);

    renderDashboard(flags);
  } catch (error) {
    console.error("Dashboard failed to initialize:", error);
  }
}
```

### Immediately Invoked Function Expression

An IIFE is a function expression that runs immediately.

```js
(function () {
  const privateState = "Secure";

  console.log("IIFE fired!");
})();
```

IIFEs were commonly used before modules to create private scope and avoid polluting the global object.

### Module Pattern with IIFE

```js
const counterModule = (function () {
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
    getCount() {
      return count;
    },
  };
})();

console.log(counterModule.increment());
// 1

console.log(counterModule.increment());
// 2

console.log(counterModule.count);
// undefined
```

### Pure Functions

A pure function follows two rules:

1. Same input always produces the same output.
2. It has no side effects.

```js
const add = (a, b) => a + b;
```

Impure example:

```js
let total = 0;

const addToTotal = (num) => {
  total += num;
  return total;
};
```

Pure functions are predictable and easy to test.

```js
const calculatePricePure = (price, discount) => {
  return price - price * (discount / 100);
};
```

Common side effects include:

- Network requests
- DOM mutation
- Console logging
- `localStorage` reads or writes
- Random number generation
- Reading system time

## Function Composition

Function composition passes the output of one function into another.

```js
const multiplyByTwo = (x) => x * 2;
const addThree = (x) => x + 3;

const result = multiplyByTwo(addThree(5));

console.log(result);
// 16
```

### `compose`

Traditional composition runs right to left.

```js
const compose = (...functions) => (initialValue) => {
  return functions.reduceRight((currentValue, currentFunction) => {
    return currentFunction(currentValue);
  }, initialValue);
};

const trimText = (str) => str.trim();
const capitalize = (str) => str.toUpperCase();
const addExclamation = (str) => `${str}!!!`;

const prepareAlertMessage = compose(addExclamation, capitalize, trimText);

console.log(prepareAlertMessage(" hello frontend engineer "));
// HELLO FRONTEND ENGINEER!!!
```

### `pipe`

Pipe runs left to right.

```js
const pipe = (...functions) => (initialValue) => {
  return functions.reduce((currentValue, currentFunction) => {
    return currentFunction(currentValue);
  }, initialValue);
};

const processWorkflow = pipe(trimText, capitalize, addExclamation);

console.log(processWorkflow(" hello frontend engineer "));
// HELLO FRONTEND ENGINEER!!!
```

## Interview Answer

JavaScript functions are first-class values. Function declarations are fully hoisted, while function expressions follow variable hoisting rules. Arrow functions provide concise syntax and lexical `this`, but they do not have their own `arguments`, cannot be used as constructors, and should not usually be used as object methods when dynamic `this` is required.

Functional JavaScript relies heavily on higher-order functions, callbacks, IIFEs, pure functions, and composition to keep behavior reusable and predictable.

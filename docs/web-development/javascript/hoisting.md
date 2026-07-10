---
title: Hoisting
sidebar_position: 7
---

# Hoisting

Hoisting is the JavaScript behavior where declarations are registered in memory during the creation phase before code executes.

The key idea: `var`, `let`, `const`, and function declarations are all hoisted, but they behave differently because they are initialized differently.

## Variable Hoisting

### `var`

`var` declarations are hoisted and initialized with `undefined`.

```js
console.log(name);
// undefined

var name = "Akhilesh";
```

JavaScript roughly prepares it like this:

```js
var name;

console.log(name);

name = "Akhilesh";
```

Accessing a `var` variable before its declaration does not throw an error. It returns `undefined`.

### `let` and `const`

`let` and `const` are also hoisted, but they are not initialized immediately.

```js
console.log(data);
// ReferenceError

let data = "Production Ready Data";
```

The variable exists in the scope, but JavaScript does not allow access before the declaration line runs. This period is called the Temporal Dead Zone (TDZ).

```js
{
  // TDZ starts for data
  console.log(data);
  // ReferenceError

  let data = "Production Ready Data";
  // TDZ ends here
}
```

Important: `let` and `const` are hoisted, but they stay unusable until their declaration line is executed.

## Function Hoisting

### Function Declarations

Function declarations are fully hoisted. Both the function name and function body are available during the creation phase.

```js
sayHello();
// Hello

function sayHello() {
  console.log("Hello");
}
```

### Function Expressions

Function expressions and arrow functions are not fully hoisted like function declarations. They follow the hoisting behavior of the variable they are assigned to.

```js
greet();
// TypeError: greet is not a function

var greet = function () {
  console.log("Hi");
};
```

Here, `greet` is hoisted as `undefined`. Calling it before assignment means JavaScript tries to call `undefined`.

With `let` or `const`, the error is different:

```js
greet();
// ReferenceError: Cannot access 'greet' before initialization

const greet = () => {
  console.log("Hi");
};
```

Here, `greet` is in the Temporal Dead Zone.

## Quick Comparison

| Declaration Type | Hoisted? | Initialized Before Execution? | Access Before Declaration |
| :---- | :---- | :---- | :---- |
| `var` | Yes | Yes, as `undefined` | `undefined` |
| `let` | Yes | No | `ReferenceError` |
| `const` | Yes | No | `ReferenceError` |
| Function declaration | Yes | Yes, full function | Works |
| Function expression with `var` | Variable is hoisted | `undefined` | `TypeError` if called |
| Function expression with `let` / `const` | Variable is hoisted | No | `ReferenceError` |

## Interview Puzzles

### Puzzle 1: Function vs Variable Hoisting Collision

What prints, and why?

```js
var testingHoisting = 10;

function testingHoisting() {
  console.log("Executed Function");
}

console.log(typeof testingHoisting);
```

Output:

```text
number
```

During the creation phase, the function declaration is hoisted first and stores the full function in memory. Then JavaScript sees `var testingHoisting;`. Since the identifier already exists, JavaScript does not overwrite the function with `undefined`.

During execution, `testingHoisting = 10` replaces the function reference with the number `10`, so `typeof testingHoisting` prints `number`.

Key takeaway: function declarations can win during creation, but runtime assignment can still overwrite them.

### Puzzle 2: The Loop Scoping Trap

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 100);
}
```

Output:

```text
3
3
3
```

`var` is function-scoped, so the loop has one shared `i`. By the time callbacks run, the loop has finished and `i` is `3`.

Modern fix:

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 100);
}
```

Output:

```text
0
1
2
```

With `let`, JavaScript creates a new block-scoped `i` for each iteration.

Legacy fix with an IIFE:

```js
for (var i = 0; i < 3; i++) {
  (function (capturedI) {
    setTimeout(() => {
      console.log(capturedI);
    }, 100);
  })(i);
}
```

### Delayed Message Variant

```js
for (var i = 1; i <= 3; i++) {
  setTimeout(function () {
    console.log("after " + i + " second(s): " + i);
  }, i * 1000);
}
```

This logs `after 4 second(s): 4` three times because all callbacks close over the same shared `var i`.

Pre-ES6 fix with an IIFE:

```js
for (var i = 1; i <= 3; i++) {
  (function (capturedIndex) {
    setTimeout(function () {
      console.log("after " + capturedIndex + " second(s): " + capturedIndex);
    }, capturedIndex * 1000);
  })(i);
}
```

Modern fix with `let`:

```js
for (let i = 1; i <= 3; i++) {
  setTimeout(function () {
    console.log("after " + i + " second(s): " + i);
  }, i * 1000);
}
```

## Puzzle 3: TDZ Execution Timing

Does this throw an error?

```js
function processData() {
  console.log(payload);
}

let payload = { status: 200 };

processData();
```

Answer: no. It logs:

```text
{ status: 200 }
```

TDZ is about when the variable is accessed during execution, not only where it appears visually. `processData` is defined before `payload`, but it is called only after `payload` has been initialized.

## Puzzle 4: Parameter Scope with Default Arguments

```js
let x = 1;

function foo(
  x,
  y = function () {
    x = 2;
    console.log(x);
  },
) {
  var x = 3;
  y();
  console.log(x);
}

foo(5);
console.log(x);
```

Output:

```text
2
3
1
```

This tests parameter scope with default arguments. When a function has default parameters, JavaScript can create a separate parameter scope between the outer scope and the function body scope.

```text
Global Scope -> Parameter Scope -> Function Body Scope
```

Step by step:

1. `let x = 1` creates the global `x`.
2. `foo(5)` initializes the parameter `x` with `5`.
3. The default parameter `y` is a function that closes over the parameter scope.
4. `var x = 3` creates a separate local `x` in the function body scope.
5. `y()` updates the parameter-scope `x` to `2` and logs `2`.
6. `console.log(x)` inside the function body logs the body-scope `x`, which is `3`.
7. `console.log(x)` outside logs the global `x`, which is still `1`.

Key takeaway: default parameters can create a separate parameter scope. A function created inside a default parameter closes over that parameter scope, while `var x` inside the body belongs to the function body scope.

## Interview Answer

Hoisting means JavaScript prepares declarations before executing the code. `var`, `let`, `const`, and functions are all hoisted, but they behave differently.

- `var` is hoisted and initialized with `undefined`.
- `let` and `const` are hoisted but not initialized, which creates the Temporal Dead Zone.
- Function declarations are fully hoisted with their body, so they can be called before declaration.
- Function expressions and arrow functions follow the hoisting behavior of the variable they are assigned to.

The main interview trap is that `let` and `const` are not non-hoisted. They are hoisted, but they remain inaccessible until their declaration is executed.

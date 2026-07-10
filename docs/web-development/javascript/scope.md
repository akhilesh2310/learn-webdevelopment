---
title: Scope
sidebar_position: 6
---

# Scope

Scope controls where variables and functions are accessible in JavaScript.

Reference: [Understanding JavaScript Scope](https://hackernoon.com/understanding-javascript-scope-1d4a74adcdf5)

## Scope Types

- **Global scope:** variables declared outside any function or block. They are accessible from anywhere in the program.
- **Function scope:** variables declared inside a function are accessible only inside that function.
- **Block scope:** variables declared with `let` and `const` inside `{}` are accessible only inside that block.

Important: `var` does not respect block scope. It is function-scoped.

## Lexical Scope

Lexical scope means scope is determined by where code is written, not by where it is called from at runtime.

An inner function can access variables from the scope where that inner function was created.

```js
function outer() {
  const message = "Hello";

  function inner() {
    console.log(message);
  }

  inner();
}

outer();
// Hello
```

## Lexical Environment

A lexical environment is the engine's internal structure for storing scoped identifiers.

It contains:

- An environment record for local variables and functions.
- A reference to the outer lexical environment.

## Scope Chain

When JavaScript resolves a variable, it searches in this order:

1. The current lexical environment.
2. The outer lexical environment.
3. The next outer environment.
4. The global scope.

If the variable is still not found, JavaScript throws a `ReferenceError`.

## Variable Shadowing

Variable shadowing happens when an inner scope declares a variable with the same name as a variable in an outer scope.

The inner variable temporarily hides the outer variable inside that scope.

```js
const userRole = "Admin";

function checkPermissions() {
  const userRole = "Guest";

  console.log(`Inner scope role: ${userRole}`);
}

checkPermissions();
console.log(`Global scope role: ${userRole}`);

// Inner scope role: Guest
// Global scope role: Admin
```

## The `var` Trap

Because `var` is function-scoped, it behaves differently inside blocks.

```js
var status = "active";

if (true) {
  var status = "pending";

  console.log(status);
}

console.log(status);

// pending
// pending
```

This is not true shadowing. The inner `var status` overwrites the outer `status`.

Inside a function, `var` creates a new function-scoped variable.

```js
var status = "active";

function update() {
  var status = "pending";

  console.log(status);
}

update();
console.log(status);

// pending
// active
```

## Memory and Performance

When a variable is shadowed, the engine does not destroy the outer variable. It simply resolves the closest matching identifier first.

Heavy use of shadowing inside deep closures can sometimes make code harder to reason about and may retain variables longer than expected. Modern engines like V8 are highly optimized, but clear naming and shallow scope chains still make code easier to maintain.

## Interview Answer

Scope defines where a variable can be accessed. JavaScript has global scope, function scope, and block scope. `let` and `const` are block-scoped, while `var` is function-scoped.

JavaScript uses lexical scope, meaning scope is based on where code is written. When resolving a variable, the engine searches the current scope first, then walks outward through the scope chain until it reaches the global scope.

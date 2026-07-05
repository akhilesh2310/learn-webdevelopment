---
title: Scope
sidebar_position: 6
---

# Scope

## 🌐 Scope, Lexical Environments, & The Scope Chain

Understanding scope in JS  
[https://hackernoon.com/understanding-javascript-scope-1d4a74adcdf5](https://hackernoon.com/understanding-javascript-scope-1d4a74adcdf5)

**Scope** dictates the accessibility (visibility) of variables and functions in different parts of your code.

#### 1. The Scope Types

* **Global Scope:** Variables declared outside any function or block. Accessible everywhere.  
* **Function Scope:** Variables declared inside a function (via `var`, `let`, or `const`) are isolated inside that function.  
* **Block Scope:** Introduced in ES6. Code inside `\{\}` curly braces (like `if`, `for`, or naked blocks) isolates variables declared with `let` and `const`. Crucially, **`var` does not respect block scope.**

#### 2. Lexical Environment & Lexical Scope

* **Lexical Scope (Static Scope):** Scope determined at **compile time** (where the code was written), not runtime. An inner function always has access to the scope of its parent function's physical location in the source code.   
* **Lexical Environment:** The concrete specification object inside the engine. It consists of an *Environment Record* (local variables) and a *Reference to the outer Lexical Environment*.

#### 3. The Scope Chain

When a variable is resolved, JS looks at the immediate local Lexical Environment. If it cannot find it, it follows the *outer reference* link to the parent Lexical Environment. It walks up this link chain until it hits the Global Scope. If it’s still not found, it throws a `ReferenceError`.

## Variable Shadowing

Variable shadowing occurs when a variable declared within a specific scope, like a block, function, or loop, has the exact same name as a variable declared in an outer scope.

When this happens, the outer variable becomes temporarily inaccessible inside the inner scope. The JavaScript engine resolves the variable name by looking at the closest local scope first, moving outward only if it does not find a match.

```js
const userRole = 'Admin'; // Outer variable function checkPermissions() {   const userRole = 'Guest'; // Shadowing variable   console.log(`Inner scope role: ${userRole}`);    // Output: Inner scope role: Guest   // The outer 'userRole' is shadowed here. } checkPermissions(); console.log(`Global scope role: ${userRole}`);  // Output: Inner scope role: Admin // The outer variable remains untouched.
```

## The var Trap

Interviews will often throw `var` into the mix to test the difference between block scope and function scope. Because `var` is function-scoped, it behaves differently inside blocks:

```js
var status = 'active'; if (true) {   var status = 'pending'; // This is NOT shadowing. It overwrites the outer variable!   console.log(status); // 'pending' } console.log(status); // 'pending' - The outer variable was mutated.
```

Conversely, if you use a function block, `var` will shadow:

```js
var status = 'active'; function update() {   var status = 'pending'; // This IS shadowing because it's inside a function.   console.log(status); // 'pending' } update(); console.log(status); // 'active'
```

## Memory & Performance Implication

From a systems perspective, when a variable is shadowed, the engine does not destroy the outer variable; it just skips it during the execution context's identifier lookup. However, heavy reliance on shadowing inside deep closures can occasionally lead to unexpected memory retention if the inner function retains a reference to the environment, though modern engines like V8 are highly optimized to garbage-collect unreferenced outer variables.

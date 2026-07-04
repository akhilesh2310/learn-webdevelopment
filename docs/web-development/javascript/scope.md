---
title: Scope
sidebar_position: 6
---

# Scope

## **🌐 Scope, Lexical Environments, & The Scope Chain**

Understanding scope in JS  
[https://hackernoon.com/understanding-javascript-scope-1d4a74adcdf5](https://hackernoon.com/understanding-javascript-scope-1d4a74adcdf5)

**Scope** dictates the accessibility (visibility) of variables and functions in different parts of your code.

#### **1\. The Scope Types**

* **Global Scope:** Variables declared outside any function or block. Accessible everywhere.  
* **Function Scope:** Variables declared inside a function (via `var`, `let`, or `const`) are isolated inside that function.  
* **Block Scope:** Introduced in ES6. Code inside `\{\}` curly braces (like `if`, `for`, or naked blocks) isolates variables declared with `let` and `const`. Crucially, **`var` does not respect block scope.**

#### **2\. Lexical Environment & Lexical Scope**

* **Lexical Scope (Static Scope):** Scope determined at **compile time** (where the code was written), not runtime. An inner function always has access to the scope of its parent function's physical location in the source code.   
* **Lexical Environment:** The concrete specification object inside the engine. It consists of an *Environment Record* (local variables) and a *Reference to the outer Lexical Environment*.

#### **3\. The Scope Chain**

When a variable is resolved, JS looks at the immediate local Lexical Environment. If it cannot find it, it follows the *outer reference* link to the parent Lexical Environment. It walks up this link chain until it hits the Global Scope. If it’s still not found, it throws a `ReferenceError`.

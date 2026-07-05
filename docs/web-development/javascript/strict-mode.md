---
title: Strict Mode
sidebar_position: 8
---

# Strict Mode

## 📜 Strict Mode ("use strict")

### ❓ What is it?

Strict Mode is a feature introduced in ECMAScript 5 (ES5) that allows you to place a program, or a single function, into a "strict" operating context. When active, JavaScript changes its behavior: it stops ignoring minor syntax mistakes and instead actively throws runtime errors.

### 💡 Why does it exist?

JavaScript was originally created in a hurry, which led to some poorly designed language behaviors (like automatically creating global variables when you mistyped a name).

Strict Mode exists to:

* **Catch bugs early:** It turns silent, hard-to-find mistakes into loud, immediate errors.  
* **Fix Optimization Blockers:** It helps JavaScript engines (like Google's V8) optimize your code so it runs faster, by removing confusing language quirks.  
* **Secure the code:** It prevents accidental access to the global object, making your application more secure.  
* **Prepare for the future:** It bans certain syntax features that were planned for newer versions of ECMAScript.

### ⏱️ When & Where do you use it?

#### When to use it:

You should use it in almost all modern JavaScript files. However, if you are writing modern React or TypeScript apps, **you rarely have to type it manually**. Modern build tools (Webpack, Vite) and ES Modules automatically apply strict mode to your code behind the scenes.

#### Where to place it:

You trigger it by typing the exact string "use strict"; (or 'use strict';) at the very top of a file or a function.

* **File-level (Global):** Applies to all code inside that file.  
* **Function-level:** Applies *only* to code inside that specific function.

```js
// Global strict mode "use strict"; let x = 10;  function myBlock() {   // Automatically strict because the file is strict }
```

```js
// Non-strict mode out here x = 10; // Works fine (creates a global variable) function strictFunction() {   "use strict";   // Strict mode applies ONLY inside this function   y = 20; // ReferenceError: y is not defined }
```

### 🛠️ How does it work? (Key Changes & Behavior)

Here is a side-by-side comparison of how JavaScript changes when Strict Mode is turned on.

| Scenario | Without Strict Mode (Sloppy Mode) | With Strict Mode |
| :---- | :---- | :---- |
| **Forgetting to declare a variable** | Creates a global variable automatically. | Throws a ReferenceError. |
| **this inside a regular function** | Points to the window or global object. | Is exactly undefined. |
| **Writing to a read-only property** | Fails silently (does nothing, no error). | Throws a TypeError. |
| **Deleting an undeletable thing** | Fails silently (returns false). | Throws a SyntaxError. |
| **Duplicate parameter names** | Uses the last one specified. | Throws a SyntaxError. |

## ⚠️ Interview Corner Cases & Output Questions

Interviewers love to test if you know the exact breaking points of strict mode. Here are the most common puzzle scenarios:

#### Puzzle 1: The Accidental Global Variable

**Question:** What happens when this code runs?

```js
function createUser() {   "use strict";   username = "JohnDoe";  } createUser();
```

**Answer:** It throws a ReferenceError: username is not defined.

* **Reason:** Without strict mode, JS would look up the scope chain, fail to find username, and create it as a global variable (window.username \= "JohnDoe"). In strict mode, creating undeclared variables is completely blocked.

#### Puzzle 2: The Lost this Context

**Question:** What is the output of the following code?

```js
"use strict"; function showThis() {   console.log(this); } showThis();
```

**Answer:** It logs undefined.

* **Reason:** In standard (sloppy) mode, if a regular function is called without a clear owner (like showThis()), this automatically defaults to the global window object. Strict mode removes this default behavior to prevent developers from accidentally modifying global state.

#### Puzzle 3: Modifying Read-Only Properties

**Question:** Does this code break? If so, why?

```js
"use strict"; const person = {}; Object.defineProperty(person, "id", {   value: 101,   writable: false // This makes the property read-only }); person.id = 202;
```

**Answer:** Yes, it throws a TypeError: Cannot assign to read only property 'id'.

* **Reason:** In non-strict mode, person.id \= 202 would just fail quietly, and person.id would remain 101. Strict mode forces JavaScript to alert you when an operation fails to execute.

#### Puzzle 4: Duplicate Arguments

**Question:** What happens here?

```js
function sum(a, a, b) {   "use strict";   return a + a + b; }
```

**Answer:** It throws a SyntaxError: Duplicate parameter name not allowed in this context.

* **Reason:** Strict mode makes duplicate parameter names illegal because they cause confusion about which variable you are actually trying to read or update.

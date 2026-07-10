---
title: Strict Mode
sidebar_position: 8
---

# Strict Mode

Strict mode is an ES5 feature that puts JavaScript into a stricter execution mode. It turns silent mistakes into errors and removes some confusing legacy behavior.

## Enabling Strict Mode

Use the exact string `"use strict";` at the top of a file or function.

### File-Level Strict Mode

```js
"use strict";

let x = 10;

function myBlock() {
  // This function is strict because the file is strict.
}
```

### Function-Level Strict Mode

```js
function strictFunction() {
  "use strict";

  y = 20;
  // ReferenceError: y is not defined
}
```

Modern ES modules, React builds, TypeScript, Vite, and Webpack output commonly run in strict mode automatically, so you often do not write it manually in modern apps.

## Why Strict Mode Exists

Strict mode helps JavaScript:

- Catch bugs early.
- Prevent accidental global variables.
- Make failed writes throw errors instead of failing silently.
- Make engine optimizations easier.
- Reserve future language syntax.

## Behavior Changes

| Scenario | Sloppy Mode | Strict Mode |
| :---- | :---- | :---- |
| Forgetting to declare a variable | Creates a global variable automatically | Throws `ReferenceError` |
| `this` inside a plain function call | Defaults to `window` or `global` | Stays `undefined` |
| Writing to a read-only property | Fails silently | Throws `TypeError` |
| Deleting undeletable values | Fails silently | Throws `SyntaxError` |
| Duplicate parameter names | Allowed in some cases | Throws `SyntaxError` |

## Interview Puzzles

### Puzzle 1: Accidental Global Variable

```js
function createUser() {
  "use strict";

  username = "JohnDoe";
}

createUser();
```

Output:

```text
ReferenceError: username is not defined
```

Without strict mode, JavaScript would create `window.username`. In strict mode, assigning to an undeclared variable is blocked.

### Puzzle 2: Lost `this` Context

```js
"use strict";

function showThis() {
  console.log(this);
}

showThis();
```

Output:

```text
undefined
```

In sloppy mode, a plain function call defaults `this` to the global object. Strict mode removes this default behavior.

### Puzzle 3: Modifying Read-Only Properties

```js
"use strict";

const person = {};

Object.defineProperty(person, "id", {
  value: 101,
  writable: false,
});

person.id = 202;
```

Output:

```text
TypeError: Cannot assign to read only property 'id'
```

In non-strict mode, the assignment would fail silently. Strict mode throws immediately.

### Puzzle 4: Duplicate Parameters

```js
function sum(a, a, b) {
  "use strict";

  return a + a + b;
}
```

Output:

```text
SyntaxError: Duplicate parameter name not allowed in this context
```

Strict mode makes duplicate parameter names illegal because they make code ambiguous.

## Interview Answer

Strict mode is a safer JavaScript execution mode introduced in ES5. It prevents common bugs such as accidental global variables, makes silent failures throw errors, changes plain function `this` from the global object to `undefined`, and disallows confusing syntax such as duplicate parameters.

In modern JavaScript, ES modules and build tools often enable strict mode automatically.

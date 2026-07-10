---
title: Modules
sidebar_position: 22
---

# Modules

Modules let JavaScript code be split into focused files. A module can expose values with `export`, and another module can read those values with `import`.

Modern frontend apps rely on modules for code organization, tree shaking, lazy loading, route-level splitting, and cleaner boundaries between features.

## ES Modules

ES Modules, or ESM, are the standard JavaScript module system.

```js title="math.js"
export function add(a, b) {
  return a + b;
}
```

```js title="app.js"
import { add } from "./math.js";

console.log(add(2, 3)); // 5
```

Each module has its own scope. Variables declared in one module do not become global unless they are explicitly exported.

```js title="user.js"
const name = "Akhilesh";

export { name };
```

```js title="app.js"
import { name } from "./user.js";

console.log(name); // "Akhilesh"
```

Important points:

- ESM uses `import` and `export`.
- Imports and exports are statically analyzable.
- Module code runs in strict mode by default.
- Top-level `this` is `undefined` in ESM.
- Bundlers can use ESM structure for tree shaking.

Interview answer:

> ES Modules are JavaScript's standard module system. They allow code to be split into files and shared using `import` and `export`. They are statically analyzable, run in strict mode by default, and help bundlers optimize code through tree shaking.

## Export

`export` makes a value available outside the current module.

### Named Export

A module can have many named exports.

```js title="utils.js"
export const appName = "Dashboard";

export function formatDate(date) {
  return date.toISOString();
}
```

```js title="app.js"
import { appName, formatDate } from "./utils.js";

console.log(appName);
console.log(formatDate(new Date()));
```

You can also export after declaration.

```js
const API_URL = "/api/users";

function fetchUsers() {
  return fetch(API_URL);
}

export { API_URL, fetchUsers };
```

Exports can be renamed.

```js title="user.js"
const userRole = "admin";

export { userRole as role };
```

```js title="app.js"
import { role } from "./user.js";

console.log(role); // "admin"
```

### Default Export

A default export represents the primary value from a module. A module can have only one default export.

```js title="Button.js"
export default function Button() {
  return "Button";
}
```

```js title="app.js"
import Button from "./Button.js";
```

The imported name can be different because default exports are not imported by exported name.

```js
import PrimaryButton from "./Button.js";
```

A file can combine one default export with named exports.

```js title="userService.js"
export default function userService() {}

export const USER_ROLE = "admin";
```

```js title="app.js"
import userService, { USER_ROLE } from "./userService.js";
```

### Named vs Default

| Feature | Named export | Default export |
| --- | --- | --- |
| Count per module | Many | One |
| Import syntax | `import { add } from "./math.js"` | `import add from "./math.js"` |
| Name matching | Must match unless renamed | Can use any local name |
| Best for | Utilities, constants, hooks | One primary component/class/function |
| Refactoring | Usually clearer | Can be less explicit |

Named exports are usually better for shared utilities because imports stay explicit. Default exports are convenient when a file has one primary responsibility, such as a React component.

## Import

`import` brings exported values from another module into the current file.

```js
import { formatDate } from "./utils.js";
```

Multiple named values can be imported together.

```js
import { appName, formatDate } from "./utils.js";
```

Imports can be renamed locally.

```js
import { formatDate as formatUserDate } from "./utils.js";
```

Everything can be imported as a namespace object.

```js
import * as utils from "./utils.js";

console.log(utils.appName);
```

Use a side-effect import when a file needs to run but does not export a value you need.

```js
import "./globalStyles.css";
import "./polyfills.js";
```

Named imports must match named exports.

```js title="utils.js"
export function formatDate() {}
```

```js title="app.js"
import { format } from "./utils.js";
// SyntaxError: the module does not provide an export named "format"
```

Interview answer:

> `import` brings exported values from another module. Named imports must match exported names, but they can be renamed with `as`. A module can also be imported as a namespace or imported only for its side effects.

## Dynamic Imports

Static imports are loaded before a module runs.

```js
import { showModal } from "./modal.js";
```

Dynamic imports load a module at runtime and return a promise.

```js
async function openSettings() {
  const module = await import("./settings.js");
  module.showSettings();
}
```

This is useful for code splitting, lazy loading heavy features, loading admin-only code, or importing a library only when needed.

```js
button.addEventListener("click", async () => {
  const { exportReport } = await import("./reportExporter.js");
  exportReport();
});
```

Interview answer:

> Dynamic import uses `import()` to load a module at runtime. It returns a promise and is commonly used for lazy loading, route-based code splitting, and loading expensive code only when the user needs it.

## Tree Shaking

Tree shaking is a bundler optimization that removes unused code from the final bundle.

```js title="math.js"
export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}
```

```js title="app.js"
import { add } from "./math.js";

console.log(add(2, 3));
```

If `multiply` is never imported, a bundler can remove it from the production bundle.

Tree shaking works best when:

- ESM syntax is used.
- Imports and exports are static.
- Modules avoid unnecessary side effects.
- Package metadata correctly marks side effects.

Common trap:

```js
import "./analytics.js";
```

This file might be kept even if it exports nothing because importing it may intentionally run side effects.

Interview answer:

> Tree shaking removes unused exports from production bundles. ES Modules make this possible because their imports and exports are static and can be analyzed before code runs.

## CommonJS vs ES Modules

CommonJS is the older Node.js module system. ES Modules are the modern JavaScript standard.

```js title="CommonJS"
const fs = require("fs");

module.exports = {
  readConfig() {},
};
```

```js title="ES Modules"
import fs from "fs";

export function readConfig() {}
```

| Feature | CommonJS | ES Modules |
| --- | --- | --- |
| Syntax | `require`, `module.exports` | `import`, `export` |
| Loading | Mostly runtime | Static by default |
| Tree shaking | Harder | Better supported |
| Execution style | Synchronous loading | Supports static and dynamic import |
| Standard | Node.js legacy pattern | JavaScript standard |

ESM imports are live bindings. If an exported value changes in the exporting module, importers observe the updated value.

```js title="counter.js"
export let count = 0;

export function increment() {
  count += 1;
}
```

```js title="app.js"
import { count, increment } from "./counter.js";

console.log(count); // 0
increment();
console.log(count); // 1
```

Interview answer:

> CommonJS uses `require` and `module.exports`, while ES Modules use `import` and `export`. ESM is statically analyzable, supports live bindings, and works better with tree shaking and modern bundlers.

## Quick Interview Checklist

- Explain module scope.
- Compare named and default exports.
- Show static import and dynamic import.
- Explain side-effect imports.
- Explain why ESM helps tree shaking.
- Compare CommonJS with ES Modules.

---
title: Modules
sidebar_position: 22
---

# Modules

## **ES Modules**

## **import**

## **export**

## **Named Export**

## **Default Export**

## **Dynamic Imports**

## **Tree Shaking**

## **CommonJS vs ES Modules**

## **Common Interview Topics**

* ESM vs CommonJS

# **ES Modules**

ES Modules, commonly called **ESM**, are JavaScript’s standard module system. They allow us to split code into separate files and share values using `export` and `import`. In frontend apps, ES Modules are important for code organization, bundling, tree shaking, lazy loading, and scalable architecture.

---

# **1\. What are ES Modules?**

## **Simple meaning**

An ES Module is a JavaScript file that can export code and import code from other files.

// math.js  
\export function add(a, b) \{  
  return a \+ b;  
\}

// app.js  
\import \{ add \} from "./math.js";

console.log(add(2, 3)); // 5

## **Key mental model**

Each file is its own module scope. Variables inside one module are not automatically global.

// user.js  
const name \= "Akhilesh";

\export \{ name \};

// app.js  
\import \{ name \} from "./user.js";

console.log(name); // "Akhilesh"

## **Important points**

* ES Modules use `import` and `export`.  
* They are statically analyzable.  
* Imports are hoisted.  
* Module code runs in strict mode by default.  
* Top-level `this` is `undefined` in ESM.  
* ESM helps bundlers perform tree shaking.

## **Interview-ready answer**

ES Modules are JavaScript’s standard module system. They let us split code into files and share values using `import` and `export`. They are statically analyzable, run in strict mode by default, and help bundlers optimize code using tree shaking.

---

# **2\. `export`**

## **Simple meaning**

`export` makes a value available outside the current module.

## **Named export**

// utils.js  
\export const appName \= "Dashboard";

\export function formatDate(date) \{  
  return date.toISOString();  
\}

// app.js  
\import \{ appName, formatDate \} from "./utils.js";

console.log(appName); // "Dashboard"

## **Export after declaration**

const API\_URL \= "/api/users";

function fetchUsers() \{  
  return fetch(API\_URL);  
\}

\export \{ API\_URL, fetchUsers \};

## **Renaming exports**

const userRole \= "admin";

\export \{ userRole as role \};

\import \{ role \} from "./user.js";

console.log(role); // "admin"

## **Interview-ready answer**

`export` is used to expose variables, functions, classes, or constants from a module. Named exports allow multiple values to be exported from the same file and imported by their exact exported names.

---

# **3\. `import`**

## **Simple meaning**

`import` brings exported values from another module into the current file.

\import \{ formatDate \} from "./utils.js";

## **Import multiple named exports**

\import \{ appName, formatDate \} from "./utils.js";

## **Rename import**

\import \{ formatDate as formatUserDate \} from "./utils.js";

## **Import everything as namespace**

\import \* as utils from "./utils.js";

console.log(utils.appName);

## **Side-effect import**

\import "./globalStyles.css";

This imports a module only for its side effects. In frontend apps, CSS imports or polyfill imports are common examples.

## **Important trap**

Named imports must match named exports.

// utils.js  
\export function formatDate() \{\}

\import \{ format \} from "./utils.js";  
// SyntaxError: The requested module './utils.js' does not provide an export named 'format'

## **Interview-ready answer**

`import` is used to bring exported values from another module. Named imports must match the exported names, but we can rename them locally using `as`. We can also import everything as a namespace or import a file only for side effects.

---

# **4\. Named Export**

## **Simple meaning**

Named export exports values by name. A module can have multiple named exports.

// math.js  
\export const PI \= 3.14;

\export function add(a, b) \{  
  return a \+ b;  
\}

// app.js  
\import \{ PI, add \} from "./math.js";

console.log(add(2, 3)); // 5

## **Key mental model**

Named exports are like named properties of a module.

You must import them using the same exported name unless you rename with `as`.

\import \{ add as sum \} from "./math.js";

console.log(sum(2, 3)); // 5

## **Why named exports are useful**

* Clear and explicit.  
* Better auto-import support.  
* Easier refactoring.  
* Good for utilities and shared functions.  
* Helps tree shaking because bundlers can see exactly what is used.

## **Interview-ready answer**

Named exports allow a module to export multiple values by name. They are imported using curly braces and the exported name must match. They are commonly used for utility functions, constants, hooks, and shared components.

---

# **5\. Default Export**

## **Simple meaning**

Default export is the main export of a file. A module can have only one default export.

// Button.js  
\export default function Button() \{  
  return "Button";  
\}

// app.js  
\import Button from "./Button.js";

## **Import name can be different**

\import MyButton from "./Button.js";

This works because default export does not require the imported name to match.

## **Default export with named exports**

// userService.js  
\export default function userService() \{\}

\export const USER\_ROLE \= "admin";

\import userService, \{ USER\_ROLE \} from "./userService.js";

## **Common use cases**

* React components.  
* Main class/function from a file.  
* Page components.  
* Single primary module output.

## **Trade-offs**

Default exports are convenient, but they can make refactoring less clear because the imported name can be anything.

Named exports are often better for shared utilities because they are explicit.

## **Interview-ready answer**

A default export represents the main export from a module. Each module can have only one default export, and it can be imported with any name. It is commonly used for React components or files with one main responsibility.

---

# **6\. Named Export vs Default Export**

## **Simple meaning**

Named exports are imported by exact name. Default export can be imported with any name.

// utils.js  
\export function formatDate() \{\}  
\export default function logger() \{\}

\import logger, \{ formatDate \} from "./utils.js";

## **Comparison**

| Point | Named Export | Default Export |
| ----- | ----- | ----- |
| Number per file | Many | One |
| Import syntax | `\{ value \}` | Any name |
| Name matching | Required | Not required |
| Refactoring | Easier | Can be less clear |
| Common use | Utilities, hooks, constants | Main component/class/function |
| Tree shaking | Usually clearer | Depends on bundler/code style |

## **Interview-ready answer**

Named exports are better when a file exports multiple utilities or constants because imports are explicit. Default exports are useful when a file has one primary responsibility, like a React component. In large codebases, named exports can improve consistency and refactoring.

---

# **7\. Dynamic Imports**

## **Simple meaning**

Dynamic import loads a module only when needed.

It returns a promise.

async function loadFormatter() \{  
  const module \= await import("./formatter.js");

  module.formatDate(new Date());  
\}

## **Key mental model**

Static import loads at module initialization. Dynamic import loads on demand.

## **Practical frontend example**

Load a heavy chart library only when the user opens the analytics page.

async function showChart() \{  
  const \{ renderChart \} \= await import("./chart.js");

  renderChart();  
\}

## **React lazy loading example**

\import React, \{ Suspense \} from "react";

const AnalyticsPage \= React.lazy(() \=\> import("./AnalyticsPage"));

function App() \{  
  return (  
    \<Suspense fallback=\{\<div\>Loading...\</div\>\}\>  
      \<AnalyticsPage /\>  
    \</Suspense\>  
  );  
\}

## **Important points**

* `import()` returns a promise.  
* Useful for code splitting.  
* Reduces initial bundle size.  
* Helps lazy load routes, modals, editors, charts, and admin-only features.  
* Errors should be handled because loading can fail.

async function loadModule() \{  
  try \{  
    const module \= await import("./heavyModule.js");  
    module.run();  
  \} catch (error) \{  
    console.error("Module failed to load", error);  
  \}  
\}

## **Interview-ready answer**

Dynamic import uses `import()` to load a module on demand. It returns a promise and is commonly used for code splitting, lazy loading routes, loading heavy libraries, and improving initial page performance.

---

# **8\. Tree Shaking**

## **Simple meaning**

Tree shaking is a bundler optimization that removes unused code from the final bundle.

## **Key mental model**

If code is exported but never imported or used, bundlers can remove it.

// utils.js  
\export function used() \{  
  return "used";  
\}

\export function unused() \{  
  return "unused";  
\}

// app.js  
\import \{ used \} from "./utils.js";

console.log(used()); // "used"

In production build, `unused()` may be removed from the bundle.

## **Why ES Modules help tree shaking**

ES Modules are statically analyzable. The bundler can understand imports and exports before running the code.

\import \{ used \} from "./utils.js";

This is easier to analyze than dynamic CommonJS patterns.

## **Practical frontend example**

Instead of importing a full utility library, import only what you need.

\import debounce from "lodash/debounce";

This can reduce bundle size compared to importing the full library in some setups.

## **Common reasons tree shaking fails**

* Code has side effects.  
* Package is not ESM-friendly.  
* Importing entire libraries.  
* Dynamic imports or requires are hard to statically analyze.  
* Bundler configuration is wrong.  
* Package incorrectly marks side effects.

## **Side effects example**

// analytics.js  
console.log("analytics initialized");

Even if nothing is exported, importing this file has a side effect.

\import "./analytics.js";

Bundlers may keep side-effectful modules because removing them could change behavior.

## **Interview-ready answer**

Tree shaking removes unused code from the production bundle. It works best with ES Modules because imports and exports are static, so bundlers can detect what is actually used. It can fail when modules have side effects, use dynamic require patterns, or packages are not configured correctly.

---

# **9\. CommonJS**

## **Simple meaning**

CommonJS is the older module system commonly used in Node.js.

It uses `require()` and `module.exports`.

// math.js  
function add(a, b) \{  
  return a \+ b;  
\}

module.exports \= \{  
  add,  
\};

// app.js  
const \{ add \} \= require("./math");

console.log(add(2, 3)); // 5

## **Key mental model**

CommonJS loads modules mostly at runtime using `require()`.

## **Default-like export in CommonJS**

// logger.js  
module.exports \= function logger() \{  
  console.log("log");  
\};

const logger \= require("./logger");

logger(); // "log"

## **Important points**

* CommonJS is synchronous by design.  
* Mostly used in Node.js.  
* Uses `require` and `module.exports`.  
* Runtime loading is more flexible but harder for static optimization.  
* Tree shaking is usually harder compared to ESM.

## **Interview-ready answer**

CommonJS is a module system mainly used in Node.js. It uses `require()` to import and `module.exports` to export. It is runtime-based and synchronous, which makes static analysis and tree shaking harder compared to ES Modules.

---

# **10\. CommonJS vs ES Modules**

## **Simple meaning**

ES Modules use `import/export`. CommonJS uses `require/module.exports`.

## **Comparison**

| Point | ES Modules | CommonJS |
| ----- | ----- | ----- |
| Syntax | `import/export` | `require/module.exports` |
| Loading | Static by default | Runtime |
| Analysis | Statically analyzable | Harder to analyze |
| Tree shaking | Better support | Limited/harder |
| Default mode | Strict mode | Not automatically same |
| Common use | Browser, modern Node, bundlers | Node.js legacy |
| Dynamic loading | `import()` | `require()` |
| Async support | Dynamic import returns promise | `require()` is synchronous |

## **Example**

// ES Module  
\import \{ add \} from "./math.js";

\export \{ add \};

// CommonJS  
const \{ add \} \= require("./math");

module.exports \= \{ add \};

## **Key interview point**

ESM imports are static and hoisted. CommonJS `require()` can be called conditionally.

// CommonJS  
if (process.env.NODE\_ENV \=== "development") \{  
  const devTools \= require("./devTools");  
\}

Static ESM imports cannot be inside conditions.

if (true) \{  
  \import \{ something \} from "./module.js";  
\}  
// SyntaxError: Cannot use import statement outside a module / invalid import placement

Use dynamic import instead:

if (true) \{  
  const module \= await import("./module.js");  
\}

## **Interview-ready answer**

ES Modules are the modern JavaScript module system using `import` and `export`. They are statically analyzable, support better tree shaking, and are used by modern frontend tooling. CommonJS uses `require` and `module.exports`, loads modules at runtime, and is common in older Node.js code. The main difference is that ESM is more static and optimization-friendly, while CommonJS is more dynamic and runtime-based.

---

# **Common Interview Topics / Questions**

---

# **1\. ESM vs CommonJS**

## **Answer**

ESM and CommonJS are two JavaScript module systems.

// ESM  
\import \{ add \} from "./math.js";  
\export \{ add \};

// CommonJS  
const \{ add \} \= require("./math");  
module.exports \= \{ add \};

## **Main differences**

* ESM uses `import/export`.  
* CommonJS uses `require/module.exports`.  
* ESM is statically analyzable.  
* CommonJS is runtime-based.  
* ESM supports better tree shaking.  
* CommonJS `require()` is synchronous.  
* ESM supports dynamic import using `import()` which returns a promise.

## **Interview-ready answer**

ESM is the modern standard module system with `import` and `export`. It is static, hoisted, and easier for bundlers to optimize using tree shaking. CommonJS is the older Node.js module system using `require` and `module.exports`. It is more dynamic and runtime-based, so it is harder to statically analyze and optimize.

---

# **2\. Named Export vs Default Export**

## **Answer**

Named exports must be imported using the exported name. Default exports can be imported with any name.

// utils.js  
\export function formatDate() \{\}

\export default function logger() \{\}

\import logger, \{ formatDate \} from "./utils.js";

## **Common mistake**

// utils.js  
\export function formatDate() \{\}

\import formatDate from "./utils.js";  
// SyntaxError: The requested module './utils.js' does not provide an export named 'default'

Why? The file has a named export, not a default export.

## **Interview-ready answer**

Named exports are useful when a module exports multiple values, and they make imports explicit. Default exports are useful when a module has one main export, like a React component. A module can have many named exports but only one default export.

---

# **3\. What is Tree Shaking?**

## **Answer**

Tree shaking is removing unused code from the final production bundle.

// utils.js  
\export function formatDate() \{\}  
\export function debugLogger() \{\}

\import \{ formatDate \} from "./utils.js";

If `debugLogger` is not used, a bundler can remove it from the final bundle.

## **Important points**

* Works best with ESM.  
* Helps reduce bundle size.  
* Can fail with side effects.  
* Depends on bundler and package configuration.

## **Interview-ready answer**

Tree shaking is a bundler optimization that removes unused exports from the final bundle. It works best with ES Modules because their static import/export structure allows bundlers to know what code is used.

---

# **4\. What are Dynamic Imports?**

## **Answer**

Dynamic imports load modules on demand using `import()`.

async function openEditor() \{  
  const \{ Editor \} \= await import("./Editor.js");

  return Editor;  
\}

## **Practical frontend use cases**

* Lazy load routes.  
* Load heavy chart/editor libraries only when needed.  
* Load admin-only modules.  
* Improve initial load performance.  
* Feature-based code splitting.

## **Interview-ready answer**

Dynamic import is used to load a module only when needed. It returns a promise and is commonly used for lazy loading and code splitting in frontend apps.

---

# **5\. Why are ES Modules better for frontend bundling?**

## **Answer**

ES Modules are static, so bundlers can analyze dependencies before execution.

This helps with:

* Tree shaking.  
* Code splitting.  
* Dead code elimination.  
* Better dependency graph creation.  
* Faster and more predictable builds.

## **Interview-ready answer**

ES Modules are better for frontend bundling because imports and exports are static. Bundlers can build a dependency graph, remove unused code, split bundles, and optimize production output more effectively.

---

# **6\. Can we conditionally import ES Modules?**

## **Answer**

Static imports cannot be used conditionally.

if (isAdmin) \{  
  \import AdminPanel from "./AdminPanel.js";  
\}  
// SyntaxError: import declarations may only appear at top level of a module

Use dynamic import instead:

if (isAdmin) \{  
  const module \= await import("./AdminPanel.js");  
\}

## **Interview-ready answer**

Static ES imports must be at the top level and cannot be inside conditions. For conditional loading, we use dynamic `import()`, which returns a promise and loads the module on demand.

---

# **7\. Are ES Module imports live bindings?**

## **Answer**

Yes. ES Module imports are live bindings, not copied values.

// counter.js  
\export let count \= 0;

\export function increment() \{  
  count++;  
\}

// app.js  
\import \{ count, increment \} from "./counter.js";

console.log(count); // 0

increment();

console.log(count); // 1

## **Important trap**

Imported bindings are read-only from the importing module.

\import \{ count \} from "./counter.js";

count \= 10;  
// TypeError: Assignment to constant variable.

## **Interview-ready answer**

ES Module imports are live bindings. If the exported value changes inside the original module, the importer sees the updated value. But imported bindings are read-only in the importing module, so we cannot reassign them directly.

---

# **8\. What is a side-effect import?**

## **Answer**

A side-effect import runs a module without importing specific values.

\import "./polyfills.js";  
\import "./global.css";

## **Use cases**

* CSS imports.  
* Polyfills.  
* Global configuration.  
* Analytics initialization.  
* Monkey patching.

## **Interview-ready answer**

A side-effect import is used when we want a module to execute without importing a specific value. It is common for CSS, polyfills, global setup, or analytics initialization. Side effects can affect tree shaking because bundlers may keep such modules to avoid changing behavior.

---

# **9\. Why can tree shaking fail?**

## **Answer**

Tree shaking can fail when bundlers cannot safely prove code is unused.

Common reasons:

* Module has side effects.  
* Package uses CommonJS.  
* Imports are too broad.  
* Dynamic `require()` patterns are used.  
* Bundler configuration is incorrect.  
* Package metadata does not correctly mark side effects.

## **Interview-ready answer**

Tree shaking can fail if code has side effects, uses CommonJS, relies on dynamic imports/requires, or the package is not configured correctly. Bundlers remove unused code only when they can safely prove removing it will not change behavior.

---

# **Quick Revision Summary**

| Topic | Key point |
| ----- | ----- |
| ES Modules | Standard module system using `import/export` |
| Module scope | Variables are scoped to the module |
| Named export | Multiple exports by name |
| Default export | One main export per file |
| Static import | Top-level and statically analyzable |
| Dynamic import | `import()` returns a promise |
| Tree shaking | Removes unused code |
| Side-effect import | Executes module without importing values |
| CommonJS | Uses `require/module.exports` |
| ESM vs CommonJS | ESM is static; CommonJS is runtime-based |
| Live bindings | ESM imports reflect updates from exporter |
| Import reassignment | Imported bindings cannot be reassigned |

---

# **Final Interview-Ready Combined Answer**

ES Modules are JavaScript’s modern module system using `import` and `export`. Named exports allow multiple explicit exports from a file, while default export represents one main export. Static imports are top-level and statically analyzable, which helps bundlers build dependency graphs, perform tree shaking, and optimize production bundles. Dynamic imports use `import()` and return a promise, making them useful for lazy loading and code splitting. CommonJS uses `require()` and `module.exports`, is more runtime-based, and is harder to optimize. In interviews, the key comparison is that ESM is static and optimization-friendly, while CommonJS is dynamic and traditionally used in Node.js.

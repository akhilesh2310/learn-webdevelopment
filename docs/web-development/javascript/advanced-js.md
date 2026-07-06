---
title: Advanced JS
sidebar_position: 23
---

# Advanced JS

## Currying

## Debouncing

## Throttling

## Memoization

## Lazy Evaluation

## Generators

## Iterators

## Proxy

## Reflect

## Common Interview Topics/Questions please

* Implement debounce  
* Implement throttle  
* Implement memoization  
* Implement currying

## Advanced JavaScript Patterns

These topics are commonly asked in senior frontend interviews because they test how JavaScript handles functions, execution timing, caching, iteration, lazy computation, and object interception. In frontend apps, these patterns appear in search inputs, scroll handlers, expensive calculations, API caching, event handling, and reusable utilities.

---

## 1. Currying

Currying is a technique where a function with multiple arguments is transformed into a sequence of functions, each taking one or fewer arguments at a time.

## Simple meaning

Instead of this:

add(1, 2, 3);

We call like this:

add(1)(2)(3);

## Basic example

function add(a) \{  
  return function (b) \{  
    return function (c) \{  
      return a \+ b \+ c;  
    \};  
  \};  
\}

console.log(add(1)(2)(3)); // 6

## Key mental model

Currying works using closures. Each returned function remembers the previous argument.

Step by step:

* `add(1)` returns a function and remembers `a = 1`.  
* `(2)` returns another function and remembers `b = 2`.  
* `(3)` finally calculates `1 + 2 + 3`.

## Practical frontend example

const hasPermission \= (requiredRole) \=\> (user) \=\> \{  
  return user.roles.includes(requiredRole);  
\};

const canEdit \= hasPermission("editor");

console.log(canEdit(\{ roles: \["viewer", "editor"\] \})); // true

This is useful when we want to pre-configure a function and reuse it later.

## Architecture blueprint

Breaking down a multi-argument function into a series of nested single-argument closures.

```js
function buildApiUrl(baseUrl) {
  return function(version) {
    return function(endpoint) {
      return `${baseUrl}/${version}/${endpoint}`;
    };
  };
}
const productionGateway = buildApiUrl("https://api.production.com")("v1");
console.log(productionGateway("users"));
// "https://api.production.com/v1/users"
```

## Why currying is useful

* Reusability.  
* Partial application.  
* Function composition.  
* Cleaner utility functions.  
* Pre-configured validators, filters, and event handlers.

## Common trap

Currying is not the same as simply calling a function with fewer arguments unless the function is designed to return another function.

function add(a, b) \{  
  return a \+ b;  
\}

console.log(add(1)); // NaN

Answer: `b` is `undefined`, so `1 + undefined` becomes `NaN`.

## Interview-ready answer

Currying transforms a function with multiple arguments into a sequence of functions, each receiving one argument. It works through closures, where each function remembers the previous values. It is useful for partial application, reusable validators, filters, and function composition.

## Follow-up: Implement Infinite Currying

function add(a) \{

  return function next(b) \{

    if (b \=== undefined) \{

      return a;

    \}

    return add(a \+ b);

  \};

\}

console.log(add(1)(2)(3)(4)(5)()); // 15

Or using coercion:

function add(a) \{

  function inner(b) \{

    return add(a \+ b);

  \}

  inner.valueOf \= () \=\> a;

  inner.toString \= () \=\> String(a);

  return inner;

\}

console.log(add(1)(2)(3) \== 6); // true

### Interview-ready answer

Infinite currying uses closures to keep accumulating values indefinitely. The chain can be terminated using an empty call `()` or by overriding `valueOf`/`toString` so JavaScript returns the accumulated value during type coercion.

---

## 2. Debouncing

Debouncing delays function execution until a certain time has passed after the last call.

## Simple meaning

Run the function only after the user stops triggering the event.

## Key mental model

Debounce says: “Wait until things become quiet, then run.”

## Practical frontend example

Search input API call.

Without debounce, every keystroke may trigger an API call.

// User types: r, re, rea, reac, react  
// Without debounce: 5 API calls  
// With debounce: 1 API call after user stops typing

## Basic debounce implementation

function debounce(fn, delay) \{  
  let timerId;

  return function (...args) \{  
    clearTimeout(timerId);

    timerId \= setTimeout(() \=\> \{  
      fn.apply(this, args);  
    \}, delay);  
  \};  
\}

const search \= debounce(function (query) \{  
  console.log("Searching:", query);  
\}, 500);

search("r");  
search("re");  
search("react");

// After 500ms:  
// "Searching: react"

## How it works

Step by step:

* Every call clears the previous timer.  
* A new timer is created.  
* If another call happens before delay, the timer resets.  
* Function runs only after no new calls happen for the delay duration.

## Practical use cases

* Search input.  
* Auto-save draft.  
* Resize event handling.  
* Form validation after typing stops.  
* API calls after filter change.

## Common mistake

Using debounce for actions that must happen continuously during user activity.

Example: For scroll progress updates, throttle is usually better than debounce.

## Interview-ready answer

Debouncing delays function execution until the event stops firing for a specified time. It is useful for search inputs, auto-save, resize handling, and expensive validation where we only care about the final user action.

---

## 3. Throttling

Throttling limits how often a function can run over time.

## Simple meaning

Run the function at most once in a fixed time interval.

## Key mental model

Throttle says: “Run regularly, but not too often.”

## Practical frontend example

Scroll event.

// User scrolls continuously for 2 seconds  
// Without throttle: handler may run hundreds of times  
// With throttle 200ms: handler runs around once every 200ms

## Basic throttle implementation

function throttle(fn, delay) \{  
  let lastCall \= 0;

  return function (...args) \{  
    const now \= Date.now();

    if (now \- lastCall \>= delay) \{  
      lastCall \= now;  
      fn.apply(this, args);  
    \}  
  \};  
\}

const onScroll \= throttle(function () \{  
  console.log("Scroll event handled");  
\}, 500);

window.addEventListener("scroll", onScroll);

## How it works

Step by step:

* Store the last execution time.  
* On every call, check current time.  
* If enough time has passed, execute.  
* Otherwise, ignore the call.

## Practical use cases

* Scroll event.  
* Window resize tracking.  
* Mouse move tracking.  
* Infinite scroll.  
* Drag events.  
* Rate-limiting button clicks.

## Common mistake

Using throttle for search input. Search usually needs debounce because we want to wait until typing stops.

## Interview-ready answer

Throttling ensures a function runs at most once in a given interval. It is useful for high-frequency events like scroll, resize, mousemove, and drag where we need regular updates but want to avoid excessive execution.

---

## 4. Debounce vs Throttle

## Simple meaning

Debounce waits until events stop. Throttle runs at fixed intervals while events continue.

| Point | Debounce | Throttle |
| ----- | ----- | ----- |
| Mental model | Run after silence | Run at fixed intervals |
| Best for | Search input, auto-save | Scroll, resize, mousemove |
| Execution | After user stops | During user activity |
| API calls | Reduces to final call | Limits frequency |
| Example | Type search query | Track scroll position |

## Example

For hotel search input:

* Debounce: wait until user stops typing, then call search API.  
* Throttle: while user scrolls hotel results, update sticky filters or load more results at controlled intervals.

## Interview-ready answer

Debounce delays execution until events stop firing, while throttle limits execution to once per interval. I use debounce for search and auto-save, and throttle for scroll, resize, mousemove, or drag events.

---

## 5. Memoization

Memoization caches function results so repeated calls with the same input return faster.

## Simple meaning

If we already calculated something, reuse the cached result.

function square(n) \{  
  console.log("Calculating...");  
  return n \* n;  
\}

console.log(square(4)); // "Calculating..." 16  
console.log(square(4)); // "Calculating..." 16

With memoization:

function memoize(fn) \{  
  const cache \= new Map();

  return function (...args) \{  
    const key \= JSON.stringify(args);

    if (cache.has(key)) \{  
      return cache.get(key);  
    \}

    const result \= fn.apply(this, args);  
    cache.set(key, result);

    return result;  
  \};  
\}

const square \= memoize(function (n) \{  
  console.log("Calculating...");  
  return n \* n;  
\});

console.log(square(4)); // "Calculating..." 16  
console.log(square(4)); // 16

## Key mental model

Memoization trades memory for speed.

## Practical frontend example

* Expensive filtering or sorting.  
* Repeated calculations.  
* Selector caching.  
* API response caching.  
* React derived data with `useMemo`.

const filteredProducts \= useMemo(() \=\> \{  
  return products.filter((product) \=\> product.inStock);  
\}, \[products\]);

## Important traps

Memoization is useful only when:

* Function is pure.  
* Same input gives same output.  
* Computation is expensive or repeated.  
* Cache does not grow forever.

`JSON.stringify(args)` is simple but not perfect.

Problems:

* Object key order can affect cache key.
* Functions cannot be serialized well.
* Large objects can make keys expensive.
* Cache can grow forever.

Common mistake: Memoizing everything.

Memoization adds memory overhead and complexity. If the calculation is cheap, memoization may not help.

## Closure-based example

Using a hidden private `Map` object inside a closure scope to cache computational results and optimize expensive processing paths.

```js
function memoize(expensiveFunction) {
  const cache = new Map();
  // Private cache container locked in closure return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log("Cache Hit for arguments:", args);
      return cache.get(key);
    }
    const result = expensiveFunction.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
const slowFactorial = (n) => (n <= 1 ? 1 : n * slowFactorial(n - 1));
const fastFactorial = memoize(slowFactorial);
console.log(fastFactorial(5));
// Calculates manually: 120 console.log(fastFactorial(5));
// Cache Hit! Instantly outputs 120 from the closure map.
```

## Interview-ready answer

Memoization is an optimization where function results are cached based on input arguments. If the same inputs are used again, the cached result is returned. It improves performance for expensive repeated calculations but increases memory usage and should mainly be used with pure functions.

---

## 6. Lazy Evaluation

Lazy evaluation means delaying computation until the value is actually needed.

## Simple meaning

Do not calculate now. Calculate only when required.

## Eager example

const result \= expensiveCalculation();  
console.log("Page loaded");

Here calculation runs immediately.

## Lazy example

function getResult() \{  
  return expensiveCalculation();  
\}

console.log("Page loaded");

// Later, only when needed:  
const result \= getResult();

## Key mental model

Lazy evaluation avoids unnecessary work.

## Practical frontend examples

### Lazy state initialization in React

const \[value\] \= useState(() \=\> \{  
  return expensiveInitialCalculation();  
\});

The function runs only during initial render, not on every re-render.

### Dynamic import

async function openEditor() \{  
  const \{ Editor \} \= await import("./Editor");  
  return Editor;  
\}

The editor code loads only when needed.

## Why it is useful

* Improves initial load performance.  
* Avoids unnecessary calculations.  
* Helps defer expensive work.  
* Useful with generators and dynamic imports.

## Interview-ready answer

Lazy evaluation delays computation until the value is actually needed. In frontend apps, it helps avoid unnecessary work, improve initial load time, and defer expensive calculations or module loading until required.

---

## 7. Iterators

An iterator is an object that defines how to access values one at a time.

## Simple meaning

An iterator gives the next value when we call `.next()`.

const iterator \= \{  
  current: 1,

  next() \{  
    if (this.current \<= 3\) \{  
      return \{ value: this.current++, done: false \};  
    \}

    return \{ value: undefined, done: true \};  
  \},  
\};

console.log(iterator.next()); // \{ value: 1, done: false \}  
console.log(iterator.next()); // \{ value: 2, done: false \}  
console.log(iterator.next()); // \{ value: 3, done: false \}  
console.log(iterator.next()); // \{ value: undefined, done: true \}

## Key mental model

Iterator is a protocol. It must return an object with:

* `value`  
* `done`

## Iterable

An iterable is an object that has `[Symbol.iterator]()`.

Arrays, strings, maps, and sets are iterable.

const arr \= \[1, 2, 3\];

for (const value of arr) \{  
  console.log(value);  
\}  
// 1  
// 2  
// 3

## Custom iterable

const range \= \{  
  start: 1,  
  end: 3,

  \[Symbol.iterator\]() \{  
    let current \= this.start;  
    const end \= this.end;

    return \{  
      next() \{  
        if (current \<= end) \{  
          return \{ value: current++, done: false \};  
        \}

        return \{ value: undefined, done: true \};  
      \},  
    \};  
  \},  
\};

console.log(\[...range\]); // \[1, 2, 3\]

## Interview-ready answer

An iterator is an object with a `next()` method that returns `\{ value, done \}`. An iterable is an object that implements `[Symbol.iterator]()`. Arrays, strings, maps, and sets are built-in iterables, and custom objects can also be made iterable.

---

## 8. Generators

Generators are special functions that can pause and resume execution using `yield`.

## Simple meaning

A generator produces values one at a time.

function\* numbers() \{  
  yield 1;  
  yield 2;  
  yield 3;  
\}

const iterator \= numbers();

console.log(iterator.next()); // \{ value: 1, done: false \}  
console.log(iterator.next()); // \{ value: 2, done: false \}  
console.log(iterator.next()); // \{ value: 3, done: false \}  
console.log(iterator.next()); // \{ value: undefined, done: true \}

## Key mental model

A generator automatically creates an iterator.

## How it works

* `function*` creates a generator function.  
* Calling it does not execute the body immediately.  
* `.next()` starts/resumes execution.  
* `yield` pauses execution and returns a value.  
* Next `.next()` continues after the previous `yield`.

## Practical use cases

* Lazy sequences.  
* Infinite data generation.  
* Pagination-like flows.  
* Custom iteration.  
* State machines.  
* Older async control flow patterns.

## Infinite generator

function\* idGenerator() \{  
  let id \= 1;

  while (true) \{  
    yield id++;  
  \}  
\}

const ids \= idGenerator();

console.log(ids.next().value); // 1  
console.log(ids.next().value); // 2  
console.log(ids.next().value); // 3

## Generator with `for...of`

function\* range(start, end) \{  
  for (let i \= start; i \<= end; i++) \{  
    yield i;  
  \}  
\}

console.log(\[...range(1, 3)\]); // \[1, 2, 3\]

## Interview-ready answer

A generator is a function declared with `function*` that can pause and resume using `yield`. It returns an iterator and produces values lazily. Generators are useful for custom iteration, lazy sequences, pagination flows, and generating values on demand.

---

## 9. Proxy

A Proxy lets us intercept and customize operations on an object, such as getting, setting, deleting, or checking properties.

## Simple meaning

Proxy is a wrapper around an object that lets us control how the object behaves.

const user \= \{  
  name: "Akhilesh",  
\};

const proxyUser \= new Proxy(user, \{  
  get(target, property) \{  
    return property in target ? target\[property\] : "Not available";  
  \},  
\});

console.log(proxyUser.name); // "Akhilesh"  
console.log(proxyUser.role); // "Not available"

## Key mental model

Proxy traps object operations.

Common traps:

* `get`  
* `set`  
* `deleteProperty`  
* `has`  
* `apply`  
* `construct`

## Validation example

const user \= \{  
  age: 30,  
\};

const proxyUser \= new Proxy(user, \{  
  set(target, property, value) \{  
    if (property \=== "age" && value \< 0\) \{  
      throw new Error("Age cannot be negative");  
    \}

    target\[property\] \= value;  
    return true;  
  \},  
\});

proxyUser.age \= 35;

console.log(proxyUser.age); // 35

proxyUser.age \= \-1;  
// Error: Age cannot be negative

## Practical frontend use cases

* Validation.  
* Logging.  
* Debugging object access.  
* Reactive systems.  
* State libraries.  
* API mocking.  
* Access control.

Vue 3 uses Proxy-based reactivity internally.

## Important trap

Proxy can add complexity and make behavior less obvious. Use it when interception is actually needed.

## Interview-ready answer

A Proxy wraps an object and allows us to intercept operations like reading, writing, deleting, or checking properties. It is useful for validation, logging, access control, and reactive systems, but it should be used carefully because it can make object behavior less predictable.

---

## 10. Reflect

`Reflect` provides methods for performing default object operations programmatically.

## Simple meaning

Reflect is often used with Proxy to perform the normal/default behavior after intercepting an operation.

const user \= \{  
  name: "Akhilesh",  
\};

const proxyUser \= new Proxy(user, \{  
  get(target, property, receiver) \{  
    console.log(\`Reading $\{String(property)\}\`);

    return Reflect.get(target, property, receiver);  
  \},  
\});

console.log(proxyUser.name);  
// "Reading name"  
// "Akhilesh"

## Key mental model

Proxy intercepts. Reflect performs the default operation safely and consistently.

## Common Reflect methods

Reflect.get(obj, "name");  
Reflect.set(obj, "name", "Akhilesh");  
Reflect.has(obj, "name");  
Reflect.deleteProperty(obj, "name");  
Reflect.ownKeys(obj);

## Why Reflect is useful

* Cleaner default behavior inside Proxy traps.  
* More consistent return values.  
* Avoids manually writing object operation logic.  
* Works well with `receiver` in inheritance/prototype cases.

## Proxy \+ Reflect set example

const user \= \{\};

const proxyUser \= new Proxy(user, \{  
  set(target, property, value, receiver) \{  
    console.log(\`Setting $\{String(property)\} \= $\{value\}\`);

    return Reflect.set(target, property, value, receiver);  
  \},  
\});

proxyUser.name \= "Akhilesh";

console.log(user.name); // "Akhilesh"

## Interview-ready answer

`Reflect` provides methods for default object operations like get, set, has, and delete. It is commonly used inside Proxy traps to preserve normal object behavior after adding custom logic like logging or validation.

---

## Common Interview Topics / Questions

---

## Implementation Questions

This page owns the concepts and interview reasoning for currying, debouncing, throttling, and memoization.

The reusable coding implementations are maintained in [JavaScript Coding Questions](./javascript-coding-questions.md):

* Debounce
* Debounce with immediate option
* Throttle
* Throttle with trailing call
* Memoization
* Currying
* Infinite currying

Keep implementation details there so the coding-practice page stays the single source for reusable utilities.

---

## 7. Lazy Evaluation Interview Example

## Problem

Explain lazy evaluation with a generator.

function\* numbers() \{  
  console.log("Start");

  yield 1;  
  yield 2;  
  yield 3;  
\}

const iterator \= numbers();

console.log("Before next");

console.log(iterator.next().value); // "Start" then 1  
console.log(iterator.next().value); // 2

## Why?

Step by step:

* Calling `numbers()` does not execute the function body.  
* `"Before next"` logs first.  
* First `.next()` starts execution.  
* `"Start"` logs.  
* `yield 1` returns `1` and pauses.  
* Next `.next()` resumes after `yield 1`.

## Interview-ready answer

Lazy evaluation means work is delayed until the value is needed. Generators are a good example because calling a generator does not execute the body immediately. Execution starts only when `.next()` is called.

---

## 8. Proxy and Reflect Interview Example

## Problem

Use Proxy to validate object writes.

const user \= \{  
  name: "Akhilesh",  
  age: 30,  
\};

const proxyUser \= new Proxy(user, \{  
  set(target, property, value, receiver) \{  
    if (property \=== "age" && value \< 0\) \{  
      throw new Error("Age cannot be negative");  
    \}

    return Reflect.set(target, property, value, receiver);  
  \},  
\});

proxyUser.age \= 35;

console.log(proxyUser.age); // 35

proxyUser.age \= \-1;  
// Error: Age cannot be negative

## Why Reflect?

`Reflect.set()` performs the normal set operation and returns a boolean. It keeps the default behavior clean and consistent inside the proxy trap.

## Interview-ready answer

Proxy lets us intercept object operations like get and set. Reflect is commonly used inside Proxy traps to perform the default operation after adding custom behavior such as validation, logging, or access control.

---

## Quick Revision Summary

| Topic | Key point |
| ----- | ----- |
| Currying | Converts multi-argument function into chained functions |
| Debouncing | Runs after events stop firing |
| Throttling | Runs at most once per interval |
| Memoization | Caches result for same inputs |
| Lazy evaluation | Delays computation until needed |
| Iterator | Object with `next()` returning `\{ value, done \}` |
| Iterable | Object with `[Symbol.iterator]()` |
| Generator | `function*` that pauses/resumes with `yield` |
| Proxy | Intercepts object operations |
| Reflect | Performs default object operations |
| Debounce use case | Search input, auto-save |
| Throttle use case | Scroll, resize, mousemove |
| Memoization trade-off | Speed improvement but memory cost |
| Currying mechanism | Closures remember previous arguments |

---

## Final Interview-Ready Combined Answer

Currying, debouncing, throttling, memoization, lazy evaluation, generators, iterators, Proxy, and Reflect are advanced JavaScript concepts used to write efficient and flexible code. Currying uses closures to collect arguments over multiple function calls. Debouncing delays execution until events stop, while throttling limits execution frequency during continuous events. Memoization caches results to avoid repeated expensive work. Lazy evaluation delays computation until needed, and generators provide lazy iteration using `yield`. Iterators define the `next()` protocol, while iterables expose `[Symbol.iterator]()`. Proxy intercepts object operations, and Reflect helps perform default object behavior inside proxy traps. In interviews, the most important implementation questions are debounce, throttle, memoization, and currying.

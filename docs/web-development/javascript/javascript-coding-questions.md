---
title: JavaScript Coding Questions
sidebar_position: 27
---

# JavaScript Coding Questions

These coding questions test callbacks, closures, `this`, prototypes, async behavior, recursion, data structures, and event-driven design.

Important practice link: [30 Days of JavaScript on LeetCode](https://leetcode.com/studyplan/30-days-of-javascript/)

## Polyfill for `map`

Requirement: implement `Array.prototype.map`.

```js
Array.prototype.myMap = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError("Array.prototype.myMap called on null or undefined");
  }

  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }

  const arr = Object(this);
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    if (i in arr) {
      result[i] = callback.call(thisArg, arr[i], i, arr);
    }
  }

  return result;
};

const nums = [1, 2, 3];

console.log(nums.myMap((num) => num * 2)); // [2, 4, 6]
```

Interview points:

- Returns a new array.
- Does not mutate the original array.
- Callback receives `value`, `index`, and `array`.
- Supports optional `thisArg`.
- Skips empty slots in sparse arrays.

## Polyfill for `filter`

Requirement: implement `Array.prototype.filter`.

```js
Array.prototype.myFilter = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError("Array.prototype.myFilter called on null or undefined");
  }

  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }

  const arr = Object(this);
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    if (i in arr && callback.call(thisArg, arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }

  return result;
};

const nums = [1, 2, 3, 4];

console.log(nums.myFilter((num) => num % 2 === 0)); // [2, 4]
```

## Polyfill for `reduce`

Requirement: implement `Array.prototype.reduce`.

```js
Array.prototype.myReduce = function (callback, initialValue) {
  if (this == null) {
    throw new TypeError("Array.prototype.myReduce called on null or undefined");
  }

  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }

  const arr = Object(this);
  let accumulator;
  let startIndex = 0;

  if (arguments.length >= 2) {
    accumulator = initialValue;
  } else {
    while (startIndex < arr.length && !(startIndex in arr)) {
      startIndex += 1;
    }

    if (startIndex >= arr.length) {
      throw new TypeError("Reduce of empty array with no initial value");
    }

    accumulator = arr[startIndex];
    startIndex += 1;
  }

  for (let i = startIndex; i < arr.length; i++) {
    if (i in arr) {
      accumulator = callback(accumulator, arr[i], i, arr);
    }
  }

  return accumulator;
};

const nums = [1, 2, 3];

console.log(nums.myReduce((acc, num) => acc + num, 0)); // 6
```

Important details:

- Without `initialValue`, the first available item becomes the accumulator.
- Empty arrays without `initialValue` throw an error.
- Sparse array holes should be skipped.

## Polyfill for `bind`

Requirement: implement `Function.prototype.bind`.

```js
Function.prototype.myBind = function (context, ...boundArgs) {
  if (typeof this !== "function") {
    throw new TypeError("Function.prototype.myBind called on non-function");
  }

  const originalFn = this;

  return function (...args) {
    return originalFn.apply(context, [...boundArgs, ...args]);
  };
};

const user = {
  name: "Akhilesh",
};

function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const boundGreet = greet.myBind(user, "Hello");

console.log(boundGreet("!")); // "Hello, Akhilesh!"
```

Constructor-aware version:

```js
Function.prototype.myBind = function (context, ...boundArgs) {
  if (typeof this !== "function") {
    throw new TypeError("Function.prototype.myBind called on non-function");
  }

  const originalFn = this;

  function boundFn(...args) {
    const isCalledWithNew = this instanceof boundFn;

    return originalFn.apply(
      isCalledWithNew ? this : context,
      [...boundArgs, ...args]
    );
  }

  boundFn.prototype = Object.create(originalFn.prototype);

  return boundFn;
};
```

## Debounce

Requirement: execute a function only after events stop for a delay.

```js
function debounce(fn, delay) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const search = debounce(function (query) {
  console.log("Searching:", query);
}, 500);

search("r");
search("re");
search("react");

// After 500ms:
// "Searching: react"
```

Leading execution option:

```js
function debounce(fn, delay, immediate = false) {
  let timerId;

  return function (...args) {
    const shouldCallNow = immediate && !timerId;

    clearTimeout(timerId);

    timerId = setTimeout(() => {
      timerId = null;

      if (!immediate) {
        fn.apply(this, args);
      }
    }, delay);

    if (shouldCallNow) {
      fn.apply(this, args);
    }
  };
}
```

## Throttle

Requirement: execute a function at most once in a given interval.

```js
function throttle(fn, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

const handleScroll = throttle(function () {
  console.log("Scroll handled");
}, 500);
```

Trailing-call version:

```js
function throttle(fn, delay) {
  let lastCall = 0;
  let timerId = null;
  let lastArgs;
  let lastThis;

  return function (...args) {
    const now = Date.now();
    const remaining = delay - (now - lastCall);

    lastArgs = args;
    lastThis = this;

    if (remaining <= 0) {
      clearTimeout(timerId);
      timerId = null;
      lastCall = now;
      fn.apply(lastThis, lastArgs);
    } else if (!timerId) {
      timerId = setTimeout(() => {
        lastCall = Date.now();
        timerId = null;
        fn.apply(lastThis, lastArgs);
      }, remaining);
    }
  };
}
```

## Deep Clone

Requirement: create a deep copy of an object or array.

```js
function deepClone(value) {
  if (value === null || typeof value !== "object") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => deepClone(item));
  }

  const cloned = {};

  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      cloned[key] = deepClone(value[key]);
    }
  }

  return cloned;
}
```

Version with circular reference handling:

```js
function deepClone(value, seen = new WeakMap()) {
  if (value === null || typeof value !== "object") {
    return value;
  }

  if (seen.has(value)) {
    return seen.get(value);
  }

  if (value instanceof Date) {
    return new Date(value);
  }

  if (value instanceof RegExp) {
    return new RegExp(value);
  }

  const cloned = Array.isArray(value) ? [] : {};
  seen.set(value, cloned);

  for (const key of Reflect.ownKeys(value)) {
    cloned[key] = deepClone(value[key], seen);
  }

  return cloned;
}

const obj = { name: "Akhilesh" };
obj.self = obj;

const copy = deepClone(obj);

console.log(copy.self === copy); // true
```

Browser-native `structuredClone()` handles many common deep clone cases.

## Flatten Array

Recursive version:

```js
function flattenArray(arr) {
  const result = [];

  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flattenArray(item));
    } else {
      result.push(item);
    }
  }

  return result;
}

console.log(flattenArray([1, [2, [3, 4]], 5])); // [1, 2, 3, 4, 5]
```

Depth-aware version:

```js
function flattenArray(arr, depth = 1) {
  const result = [];

  for (const item of arr) {
    if (Array.isArray(item) && depth > 0) {
      result.push(...flattenArray(item, depth - 1));
    } else {
      result.push(item);
    }
  }

  return result;
}

console.log(flattenArray([1, [2, [3, [4]]]], 2)); // [1, 2, 3, [4]]
```

Iterative version:

```js
function flattenArray(arr) {
  const stack = [...arr];
  const result = [];

  while (stack.length) {
    const item = stack.pop();

    if (Array.isArray(item)) {
      stack.push(...item);
    } else {
      result.push(item);
    }
  }

  return result.reverse();
}
```

## Memoization

Requirement: cache function results for repeated inputs.

```js
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);

    return result;
  };
}

const multiply = memoize(function (a, b) {
  console.log("Calculating...");
  return a * b;
});

console.log(multiply(2, 3)); // Calculates, then returns 6
console.log(multiply(2, 3)); // 6
```

Memoization works best for pure functions. In production, caches should usually be bounded.

## Event Emitter

Requirement: implement `on`, `off`, `emit`, and `once`.

```js
class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(eventName, callback) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, new Set());
    }

    this.events.get(eventName).add(callback);

    return () => {
      this.off(eventName, callback);
    };
  }

  off(eventName, callback) {
    if (!this.events.has(eventName)) {
      return;
    }

    this.events.get(eventName).delete(callback);

    if (this.events.get(eventName).size === 0) {
      this.events.delete(eventName);
    }
  }

  emit(eventName, ...args) {
    if (!this.events.has(eventName)) {
      return;
    }

    for (const callback of this.events.get(eventName)) {
      callback(...args);
    }
  }

  once(eventName, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(eventName, wrapper);
    };

    this.on(eventName, wrapper);
  }
}

const emitter = new EventEmitter();

const unsubscribe = emitter.on("user:login", (name) => {
  console.log(`Hello ${name}`);
});

emitter.emit("user:login", "Akhilesh");
unsubscribe();
```

## Basic Promise Implementation

This is an interview-friendly implementation. Full Promise/A+ compliance is more detailed.

```js
class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state !== "pending") {
        return;
      }

      queueMicrotask(() => {
        if (this.state !== "pending") {
          return;
        }

        this.state = "fulfilled";
        this.value = value;
        this.onFulfilledCallbacks.forEach((callback) => callback(value));
      });
    };

    const reject = (reason) => {
      if (this.state !== "pending") {
        return;
      }

      queueMicrotask(() => {
        if (this.state !== "pending") {
          return;
        }

        this.state = "rejected";
        this.reason = reason;
        this.onRejectedCallbacks.forEach((callback) => callback(reason));
      });
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;

    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    return new MyPromise((resolve, reject) => {
      const handleFulfilled = (value) => {
        try {
          const result = onFulfilled(value);
          result instanceof MyPromise ? result.then(resolve, reject) : resolve(result);
        } catch (error) {
          reject(error);
        }
      };

      const handleRejected = (reason) => {
        try {
          const result = onRejected(reason);
          result instanceof MyPromise ? result.then(resolve, reject) : resolve(result);
        } catch (error) {
          reject(error);
        }
      };

      if (this.state === "fulfilled") {
        queueMicrotask(() => handleFulfilled(this.value));
      } else if (this.state === "rejected") {
        queueMicrotask(() => handleRejected(this.reason));
      } else {
        this.onFulfilledCallbacks.push(handleFulfilled);
        this.onRejectedCallbacks.push(handleRejected);
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(callback) {
    return this.then(
      (value) => {
        callback();
        return value;
      },
      (reason) => {
        callback();
        throw reason;
      }
    );
  }

  static resolve(value) {
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }
}
```

Interview points:

- Promise has `pending`, `fulfilled`, and `rejected` states.
- State changes only once.
- `.then()` returns a new promise.
- Callbacks should run asynchronously.
- Full implementations must handle thenables and the Promise resolution procedure.

## Currying

Requirement: convert `sum(a, b, c)` into `sum(a)(b)(c)`.

```js
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }

    return function (...nextArgs) {
      return curried.apply(this, [...args, ...nextArgs]);
    };
  };
}

function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
```

Infinite currying:

```js
function add(a) {
  return function next(b) {
    if (b === undefined) {
      return a;
    }

    return add(a + b);
  };
}

console.log(add(1)(2)(3)(4)()); // 10
```

## LRU Cache

Requirement: implement an LRU cache with `get` and `put`.

```js
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) {
      return -1;
    }

    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);

    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    this.cache.set(key, value);

    if (this.cache.size > this.capacity) {
      const leastRecentlyUsedKey = this.cache.keys().next().value;
      this.cache.delete(leastRecentlyUsedKey);
    }
  }
}

const cache = new LRUCache(2);

cache.put("a", 1);
cache.put("b", 2);

console.log(cache.get("a")); // 1

cache.put("c", 3);

console.log(cache.get("b")); // -1
console.log(cache.get("c")); // 3
```

`Map` preserves insertion order, so deleting and reinserting a key marks it as recently used.

## LRU Cache with TTL

Requirement: add expiry time for each key.

```js
class LRUCacheWithTTL {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  isExpired(entry) {
    return Date.now() > entry.expiryTime;
  }

  get(key) {
    if (!this.cache.has(key)) {
      return null;
    }

    const entry = this.cache.get(key);

    if (this.isExpired(entry)) {
      this.cache.delete(key);
      return null;
    }

    this.cache.delete(key);
    this.cache.set(key, entry);

    return entry.value;
  }

  put(key, value, ttl) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    this.cache.set(key, {
      value,
      expiryTime: Date.now() + ttl,
    });

    while (this.cache.size > this.capacity) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
  }

  clearExpired() {
    for (const [key, entry] of this.cache) {
      if (this.isExpired(entry)) {
        this.cache.delete(key);
      }
    }
  }
}
```

## Common Machine Coding Problems

| Problem | Expected features | Important concepts |
| --- | --- | --- |
| Todo app | Add, edit, delete, complete, filter, persist | State, forms, list keys, localStorage |
| Modal | Escape close, backdrop close, focus trap, scroll lock | DOM events, accessibility, cleanup |
| Autocomplete | Debounced search, keyboard navigation, loading/error states | Debounce, race handling, AbortController |
| Infinite scroll | Fetch next page, loader, stop at end, dedupe requests | Intersection Observer, pagination |
| File explorer | Nested folders, expand/collapse, search | Recursion, tree traversal, state shape |
| Toast system | Add, dismiss, pause, limit visible toasts | Timers, queue management, `aria-live` |
| Tabs | Active tab, keyboard navigation, lazy render | Controlled state, ARIA roles |
| Carousel | Next/previous, autoplay, pause, indicators | Timers, touch/keyboard events |

## Quick Interview Checklist

- Explain edge cases for array polyfills.
- Preserve `this` correctly in debounce, throttle, and bind.
- Know when recursive solutions can hit call stack limits.
- Use `WeakMap` for circular references in deep clone.
- Know why promise callbacks run asynchronously.
- Explain why `Map` makes a simple LRU cache easy in JavaScript.

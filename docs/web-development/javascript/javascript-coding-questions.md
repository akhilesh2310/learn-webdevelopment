---
title: JavaScript Coding Questions
sidebar_position: 27
---

# JavaScript Coding Questions

## Very Important:

## https://leetcode.com/studyplan/30-days-of-javascript/

## Polyfills

* map  
* filter  
* reduce  
* bind

## Debounce

## Throttle

## Deep Clone

## Flatten Array

## Memoization

## Event Emitter

## Promise Implementation

## Currying

## LRU Cache

## Common Machine Coding Problems

## JavaScript Coding Questions: Polyfills and Machine Coding Utilities

These are common JavaScript coding questions because they test fundamentals like callbacks, closures, `this`, prototypes, async behavior, recursion, data structures, and event-driven design.

---

## 1. Polyfill for `map`

## Requirement

Implement `Array.prototype.map`.

Array.prototype.myMap \= function (callback, thisArg) \{  
  if (this \== null) \{  
    throw new TypeError("Array.prototype.myMap called on null or undefined");  
  \}

  if (typeof callback \!== "function") \{  
    throw new TypeError(callback \+ " is not a function");  
  \}

  const arr \= Object(this);  
  const result \= \[\];

  for (let i \= 0; i \< arr.length; i++) \{  
    if (i in arr) \{  
      result\[i\] \= callback.call(thisArg, arr\[i\], i, arr);  
    \}  
  \}

  return result;  
\};

const nums \= \[1, 2, 3\];

console.log(nums.myMap((num) \=\> num \* 2)); // \[2, 4, 6\]

## Interview points

* Returns a new array.  
* Does not mutate original array.  
* Callback receives `value`, `index`, and `array`.  
* Supports optional `thisArg`.  
* Skips empty slots in sparse arrays.

---

## 2. Polyfill for `filter`

## Requirement

Implement `Array.prototype.filter`.

Array.prototype.myFilter \= function (callback, thisArg) \{  
  if (this \== null) \{  
    throw new TypeError("Array.prototype.myFilter called on null or undefined");  
  \}

  if (typeof callback \!== "function") \{  
    throw new TypeError(callback \+ " is not a function");  
  \}

  const arr \= Object(this);  
  const result \= \[\];

  for (let i \= 0; i \< arr.length; i++) \{  
    if (i in arr && callback.call(thisArg, arr\[i\], i, arr)) \{  
      result.push(arr\[i\]);  
    \}  
  \}

  return result;  
\};

const nums \= \[1, 2, 3, 4\];

console.log(nums.myFilter((num) \=\> num % 2 \=== 0)); // \[2, 4\]

## Interview points

* Returns a new array.  
* Keeps items when callback returns truthy.  
* Does not mutate original array.  
* Skips sparse array holes.

---

## 3. Polyfill for `reduce`

## Requirement

Implement `Array.prototype.reduce`.

Array.prototype.myReduce \= function (callback, initialValue) \{  
  if (this \== null) \{  
    throw new TypeError("Array.prototype.myReduce called on null or undefined");  
  \}

  if (typeof callback \!== "function") \{  
    throw new TypeError(callback \+ " is not a function");  
  \}

  const arr \= Object(this);  
  let accumulator;  
  let startIndex \= 0;

  if (arguments.length \>= 2\) \{  
    accumulator \= initialValue;  
  \} else \{  
    while (startIndex \< arr.length && \!(startIndex in arr)) \{  
      startIndex++;  
    \}

    if (startIndex \>= arr.length) \{  
      throw new TypeError("Reduce of empty array with no initial value");  
    \}

    accumulator \= arr\[startIndex\];  
    startIndex++;  
  \}

  for (let i \= startIndex; i \< arr.length; i++) \{  
    if (i in arr) \{  
      accumulator \= callback(accumulator, arr\[i\], i, arr);  
    \}  
  \}

  return accumulator;  
\};

const nums \= \[1, 2, 3\];

console.log(nums.myReduce((acc, num) \=\> acc \+ num, 0)); // 6

## Interview points

* Without `initialValue`, first available item becomes accumulator.  
* Empty array without `initialValue` throws error.  
* Callback receives `accumulator`, `currentValue`, `index`, and `array`.

---

## 4. Polyfill for `bind`

## Requirement

Implement `Function.prototype.bind`.

Function.prototype.myBind \= function (context, ...boundArgs) \{  
  if (typeof this \!== "function") \{  
    throw new TypeError("Function.prototype.myBind called on non-function");  
  \}

  const originalFn \= this;

  return function (...args) \{  
    return originalFn.apply(context, \[...boundArgs, ...args\]);  
  \};  
\};

const user \= \{  
  name: "Akhilesh",  
\};

function greet(greeting, punctuation) \{  
  return \`$\{greeting\}, $\{this.name\}$\{punctuation\}\`;  
\}

const boundGreet \= greet.myBind(user, "Hello");

console.log(boundGreet("\!")); // "Hello, Akhilesh\!"

## Interview points

* `bind` returns a new function.  
* It does not immediately call the function.  
* It permanently binds `this` and optionally pre-fills arguments.  
* This simple version does not fully handle `new` behavior.

## Better bind with constructor support

Function.prototype.myBind \= function (context, ...boundArgs) \{  
  if (typeof this \!== "function") \{  
    throw new TypeError("Function.prototype.myBind called on non-function");  
  \}

  const originalFn \= this;

  function boundFn(...args) \{  
    const isCalledWithNew \= this instanceof boundFn;

    return originalFn.apply(  
      isCalledWithNew ? this : context,  
      \[...boundArgs, ...args\]  
    );  
  \}

  boundFn.prototype \= Object.create(originalFn.prototype);

  return boundFn;  
\};

---

## 5. Debounce

## Requirement

Execute function only after events stop for a delay.

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

## Interview points

* Useful for search input, auto-save, resize.  
* Clears previous timer on every call.  
* Runs only after the final call waits for delay.

## Debounce with immediate option

function debounce(fn, delay, immediate \= false) \{  
  let timerId;

  return function (...args) \{  
    const shouldCallNow \= immediate && \!timerId;

    clearTimeout(timerId);

    timerId \= setTimeout(() \=\> \{  
      timerId \= null;

      if (\!immediate) \{  
        fn.apply(this, args);  
      \}  
    \}, delay);

    if (shouldCallNow) \{  
      fn.apply(this, args);  
    \}  
  \};  
\}

Answer: First call runs immediately. Later calls within delay are ignored/reset.

Interview point: A debounce with immediate option supports leading execution. If `immediate` is true, it runs on the first call and then waits until the delay passes before allowing another leading call.

---

## 6. Throttle

## Requirement

Execute function at most once in a given interval.

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

const handleScroll \= throttle(function () \{  
  console.log("Scroll handled");  
\}, 500);

## Interview points

* Useful for scroll, resize, mousemove, drag.  
* Runs during continuous activity, but with limited frequency.

## Throttle with trailing call

Basic throttle may skip the final call. Sometimes we want the last event to run after the interval.

function throttle(fn, delay) \{  
  let lastCall \= 0;  
  let timerId \= null;  
  let lastArgs;  
  let lastThis;

  return function (...args) \{  
    const now \= Date.now();  
    const remaining \= delay \- (now \- lastCall);

    lastArgs \= args;  
    lastThis \= this;

    if (remaining \<= 0\) \{  
      clearTimeout(timerId);  
      timerId \= null;  
      lastCall \= now;  
      fn.apply(lastThis, lastArgs);  
    \} else if (\!timerId) \{  
      timerId \= setTimeout(() \=\> \{  
        lastCall \= Date.now();  
        timerId \= null;  
        fn.apply(lastThis, lastArgs);  
      \}, remaining);  
    \}  
  \};  
\}

Interview point: A throttle with trailing call ensures the function runs at most once per interval, but also runs one final time with the latest arguments after the interval. This is useful when the final event state matters.

---

## 7. Deep Clone

## Requirement

Create a deep copy of an object or array.

## Simple version

function deepClone(value) \{  
  if (value \=== null || typeof value \!== "object") \{  
    return value;  
  \}

  if (Array.isArray(value)) \{  
    return value.map((item) \=\> deepClone(item));  
  \}

  const cloned \= \{\};

  for (const key in value) \{  
    if (Object.prototype.hasOwnProperty.call(value, key)) \{  
      cloned\[key\] \= deepClone(value\[key\]);  
    \}  
  \}

  return cloned;  
\}

const user \= \{  
  name: "Akhilesh",  
  address: \{  
    city: "Bengaluru",  
  \},  
\};

const copy \= deepClone(user);

copy.address.city \= "Nagpur";

console.log(user.address.city); // "Bengaluru"  
console.log(copy.address.city); // "Nagpur"

## Better version with circular reference handling

function deepClone(value, seen \= new WeakMap()) \{  
  if (value \=== null || typeof value \!== "object") \{  
    return value;  
  \}

  if (seen.has(value)) \{  
    return seen.get(value);  
  \}

  if (value instanceof Date) \{  
    return new Date(value);  
  \}

  if (value instanceof RegExp) \{  
    return new RegExp(value);  
  \}

  const cloned \= Array.isArray(value) ? \[\] : \{\};

  seen.set(value, cloned);

  for (const key of Reflect.ownKeys(value)) \{  
    cloned\[key\] \= deepClone(value\[key\], seen);  
  \}

  return cloned;  
\}

const obj \= \{ name: "Akhilesh" \};  
obj.self \= obj;

const copy \= deepClone(obj);

console.log(copy.name); // "Akhilesh"  
console.log(copy.self \=== copy); // true

## Interview points

* Shallow copy is not enough for nested objects.  
* Circular references need `WeakMap`.  
* Real-world deep clone must consider `Date`, `RegExp`, `Map`, `Set`, functions, prototypes, etc.  
* Browser-native `structuredClone()` handles many cases.

---

## 8. Flatten Array

## Requirement

Flatten nested arrays.

## Recursive version

function flattenArray(arr) \{  
  const result \= \[\];

  for (const item of arr) \{  
    if (Array.isArray(item)) \{  
      result.push(...flattenArray(item));  
    \} else \{  
      result.push(item);  
    \}  
  \}

  return result;  
\}

console.log(flattenArray(\[1, \[2, \[3, 4\]\], 5\])); // \[1, 2, 3, 4, 5\]

## With depth

function flattenArray(arr, depth \= 1\) \{  
  const result \= \[\];

  for (const item of arr) \{  
    if (Array.isArray(item) && depth \> 0\) \{  
      result.push(...flattenArray(item, depth \- 1));  
    \} else \{  
      result.push(item);  
    \}  
  \}

  return result;  
\}

console.log(flattenArray(\[1, \[2, \[3, \[4\]\]\]\], 2)); // \[1, 2, 3, \[4\]\]

## Iterative version

function flattenArray(arr) \{  
  const stack \= \[...arr\];  
  const result \= \[\];

  while (stack.length) \{  
    const item \= stack.pop();

    if (Array.isArray(item)) \{  
      stack.push(...item);  
    \} else \{  
      result.push(item);  
    \}  
  \}

  return result.reverse();  
\}

console.log(flattenArray(\[1, \[2, \[3\]\], 4\])); // \[1, 2, 3, 4\]

## Interview points

* Recursive approach is simple.  
* Iterative approach avoids deep recursion call stack issues.  
* Built-in alternative: `arr.flat(Infinity)`.

---

## 9. Memoization

## Requirement

Cache function results for repeated inputs.

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

const multiply \= memoize(function (a, b) \{  
  console.log("Calculating...");  
  return a \* b;  
\});

console.log(multiply(2, 3)); // "Calculating..." 6  
console.log(multiply(2, 3)); // 6

## Interview points

* Works best for pure functions.  
* Trades memory for speed.  
* `JSON.stringify` is simple but not perfect for complex objects.  
* Cache should be bounded in production.

## Better for single primitive argument

function memoizeOneArg(fn) \{  
  const cache \= new Map();

  return function (arg) \{  
    if (cache.has(arg)) \{  
      return cache.get(arg);  
    \}

    const result \= fn.call(this, arg);  
    cache.set(arg, result);

    return result;  
  \};  
\}

---

## 10. Event Emitter

## Requirement

Implement `on`, `off`, `emit`, and `once`.

class EventEmitter \{  
  constructor() \{  
    this.events \= new Map();  
  \}

  on(eventName, callback) \{  
    if (\!this.events.has(eventName)) \{  
      this.events.set(eventName, new Set());  
    \}

    this.events.get(eventName).add(callback);

    return () \=\> \{  
      this.off(eventName, callback);  
    \};  
  \}

  off(eventName, callback) \{  
    if (\!this.events.has(eventName)) return;

    this.events.get(eventName).delete(callback);

    if (this.events.get(eventName).size \=== 0\) \{  
      this.events.delete(eventName);  
    \}  
  \}

  emit(eventName, ...args) \{  
    if (\!this.events.has(eventName)) return;

    for (const callback of this.events.get(eventName)) \{  
      callback(...args);  
    \}  
  \}

  once(eventName, callback) \{  
    const wrapper \= (...args) \=\> \{  
      callback(...args);  
      this.off(eventName, wrapper);  
    \};

    this.on(eventName, wrapper);  
  \}  
\}

const emitter \= new EventEmitter();

function greet(name) \{  
  console.log(\`Hello $\{name\}\`);  
\}

const unsubscribe \= emitter.on("user:login", greet);

emitter.emit("user:login", "Akhilesh"); // "Hello Akhilesh"

unsubscribe();

emitter.emit("user:login", "Rahul"); // No output

## Interview points

* Event emitter is Pub/Sub style.  
* Use `Set` to avoid duplicate listeners.  
* Return unsubscribe function for cleanup.  
* `once` removes itself after first execution.

---

## 11. Promise Implementation

## Requirement

Implement a basic Promise.

This is a simplified interview-friendly version. Full Promise/A+ compliance is much more detailed.

class MyPromise \{  
  constructor(executor) \{  
    this.state \= "pending";  
    this.value \= undefined;  
    this.reason \= undefined;

    this.onFulfilledCallbacks \= \[\];  
    this.onRejectedCallbacks \= \[\];

    const resolve \= (value) \=\> \{  
      if (this.state \!== "pending") return;

      queueMicrotask(() \=\> \{  
        if (this.state \!== "pending") return;

        this.state \= "fulfilled";  
        this.value \= value;

        this.onFulfilledCallbacks.forEach((callback) \=\> callback(value));  
      \});  
    \};

    const reject \= (reason) \=\> \{  
      if (this.state \!== "pending") return;

      queueMicrotask(() \=\> \{  
        if (this.state \!== "pending") return;

        this.state \= "rejected";  
        this.reason \= reason;

        this.onRejectedCallbacks.forEach((callback) \=\> callback(reason));  
      \});  
    \};

    try \{  
      executor(resolve, reject);  
    \} catch (error) \{  
      reject(error);  
    \}  
  \}

  then(onFulfilled, onRejected) \{  
    onFulfilled \=  
      typeof onFulfilled \=== "function" ? onFulfilled : (value) \=\> value;

    onRejected \=  
      typeof onRejected \=== "function"  
        ? onRejected  
        : (reason) \=\> \{  
            throw reason;  
          \};

    return new MyPromise((resolve, reject) \=\> \{  
      const handleFulfilled \= (value) \=\> \{  
        try \{  
          const result \= onFulfilled(value);

          if (result instanceof MyPromise) \{  
            result.then(resolve, reject);  
          \} else \{  
            resolve(result);  
          \}  
        \} catch (error) \{  
          reject(error);  
        \}  
      \};

      const handleRejected \= (reason) \=\> \{  
        try \{  
          const result \= onRejected(reason);

          if (result instanceof MyPromise) \{  
            result.then(resolve, reject);  
          \} else \{  
            resolve(result);  
          \}  
        \} catch (error) \{  
          reject(error);  
        \}  
      \};

      if (this.state \=== "fulfilled") \{  
        queueMicrotask(() \=\> handleFulfilled(this.value));  
      \} else if (this.state \=== "rejected") \{  
        queueMicrotask(() \=\> handleRejected(this.reason));  
      \} else \{  
        this.onFulfilledCallbacks.push(handleFulfilled);  
        this.onRejectedCallbacks.push(handleRejected);  
      \}  
    \});  
  \}

  catch(onRejected) \{  
    return this.then(null, onRejected);  
  \}

  finally(callback) \{  
    return this.then(  
      (value) \=\> \{  
        callback();  
        return value;  
      \},  
      (reason) \=\> \{  
        callback();  
        throw reason;  
      \}  
    );  
  \}

  static resolve(value) \{  
    return new MyPromise((resolve) \=\> resolve(value));  
  \}

  static reject(reason) \{  
    return new MyPromise((\_, reject) \=\> reject(reason));  
  \}  
\}

const promise \= new MyPromise((resolve) \=\> \{  
  resolve(10);  
\});

promise  
  .then((value) \=\> value \* 2\)  
  .then((value) \=\> \{  
    console.log(value); // 20  
  \});

## Interview points

* Promise has states: `pending`, `fulfilled`, `rejected`.  
* State changes only once.  
* `.then()` returns a new promise.  
* Callbacks should run asynchronously.  
* Need queues for callbacks while promise is pending.  
* Full Promise implementation must handle thenables and Promise/A+ resolution procedure.

---

## 12. Currying

## Requirement

Convert `sum(a, b, c)` into `sum(a)(b)(c)`.

function curry(fn) \{  
  return function curried(...args) \{  
    if (args.length \>= fn.length) \{  
      return fn.apply(this, args);  
    \}

    return function (...nextArgs) \{  
      return curried.apply(this, \[...args, ...nextArgs\]);  
    \};  
  \};  
\}

function add(a, b, c) \{  
  return a \+ b \+ c;  
\}

const curriedAdd \= curry(add);

console.log(curriedAdd(1)(2)(3)); // 6  
console.log(curriedAdd(1, 2)(3)); // 6  
console.log(curriedAdd(1)(2, 3)); // 6

## Infinite currying

function add(a) \{  
  return function next(b) \{  
    if (b \=== undefined) \{  
      return a;  
    \}

    return add(a \+ b);  
  \};  
\}

console.log(add(1)(2)(3)(4)()); // 10

## Infinite currying with coercion

function add(a) \{  
  function inner(b) \{  
    return add(a \+ b);  
  \}

  inner.valueOf \= () \=\> a;  
  inner.toString \= () \=\> String(a);

  return inner;  
\}

console.log(add(1)(2)(3) \== 6); // true  
console.log(add(1)(2)(3) \+ 0); // 6

## Interview points

* Currying uses closures.  
* `fn.length` gives expected parameter count.  
* Default parameters affect `fn.length`.  
* Infinite currying needs a termination signal or coercion.

---

## 13. LRU Cache

## Requirement

Implement an LRU Cache with `get` and `put`.

LRU means **Least Recently Used**. When cache reaches capacity, remove the least recently used item.

## Simple implementation using `Map`

class LRUCache \{  
  constructor(capacity) \{  
    this.capacity \= capacity;  
    this.cache \= new Map();  
  \}

  get(key) \{  
    if (\!this.cache.has(key)) \{  
      return \-1;  
    \}

    const value \= this.cache.get(key);

    // Refresh key as most recently used.  
    this.cache.delete(key);  
    this.cache.set(key, value);

    return value;  
  \}

  put(key, value) \{  
    if (this.cache.has(key)) \{  
      this.cache.delete(key);  
    \}

    this.cache.set(key, value);

    if (this.cache.size \> this.capacity) \{  
      const leastRecentlyUsedKey \= this.cache.keys().next().value;

      this.cache.delete(leastRecentlyUsedKey);  
    \}  
  \}  
\}

const cache \= new LRUCache(2);

cache.put("a", 1);  
cache.put("b", 2);

console.log(cache.get("a")); // 1

cache.put("c", 3);

console.log(cache.get("b")); // \-1  
console.log(cache.get("c")); // 3

## Why `Map` works here

`Map` preserves insertion order.

* Newest item is at the end.  
* Oldest item is at the beginning.  
* On `get`, delete and reinsert to mark as recently used.  
* On overflow, delete first key.

## Interview points

* `get` and `put` are effectively `O(1)` with `Map`.  
* Classic LRU is often implemented using HashMap \+ Doubly Linked List.  
* `Map` version is simpler and acceptable in many JS interviews.

---

## 14. LRU Cache with TTL

## Requirement

Add expiry time for each key.

class LRUCacheWithTTL \{  
  constructor(capacity) \{  
    this.capacity \= capacity;  
    this.cache \= new Map();  
  \}

  isExpired(entry) \{  
    return Date.now() \> entry.expiryTime;  
  \}

  get(key) \{  
    if (\!this.cache.has(key)) \{  
      return null;  
    \}

    const entry \= this.cache.get(key);

    if (this.isExpired(entry)) \{  
      this.cache.delete(key);  
      return null;  
    \}

    this.cache.delete(key);  
    this.cache.set(key, entry);

    return entry.value;  
  \}

  put(key, value, ttl) \{  
    if (this.cache.has(key)) \{  
      this.cache.delete(key);  
    \}

    this.cache.set(key, \{  
      value,  
      expiryTime: Date.now() \+ ttl,  
    \});

    while (this.cache.size \> this.capacity) \{  
      const oldestKey \= this.cache.keys().next().value;  
      this.cache.delete(oldestKey);  
    \}  
  \}

  delete(key) \{  
    this.cache.delete(key);  
  \}

  clearExpired() \{  
    for (const \[key, entry\] of this.cache) \{  
      if (this.isExpired(entry)) \{  
        this.cache.delete(key);  
      \}  
    \}  
  \}  
\}

const cache \= new LRUCacheWithTTL(2);

cache.put("square:4", 16, 1000);

console.log(cache.get("square:4")); // 16

## Interview points

* TTL means Time To Live.  
* Expired keys should return `null`.  
* Clear expired keys lazily during `get`, or periodically with `clearExpired`.  
* Need cleanup if using automatic interval.

---

## 15. Common Machine Coding Problems

## 1. Todo App

### Expected features

* Add todo.  
* Edit todo.  
* Delete todo.  
* Mark complete/incomplete.  
* Filter by all/active/completed.  
* Persist in localStorage.

### Important points

* State management.  
* Controlled inputs.  
* Event handling.  
* List rendering with stable keys.  
* localStorage sync.  
* Accessibility for buttons and inputs.

---

## 2. Modal Component

### Expected features

* Open/close modal.  
* Close on Escape key.  
* Close on backdrop click.  
* Focus trap.  
* Restore previous focus.  
* Prevent background scroll.

### Important points

* DOM events.  
* Keyboard accessibility.  
* Portals in React.  
* Cleanup event listeners.  
* ARIA attributes like `role="dialog"` and `aria-modal="true"`.

---

## 3. Dropdown / Autocomplete

### Expected features

* Search input.  
* Debounced API call.  
* Keyboard navigation.  
* Highlight selected item.  
* Close on outside click.  
* Loading and error states.

### Important points

* Debounce.  
* Race condition handling.  
* AbortController.  
* Accessibility.  
* Event cleanup.

---

## 4. Infinite Scroll

### Expected features

* Fetch next page when user reaches bottom.  
* Show loader.  
* Prevent duplicate API calls.  
* Stop when no more data.  
* Error handling.

### Important points

* Intersection Observer.  
* Pagination.  
* Loading state.  
* Request deduping.  
* Cleanup observer.

---

## 5. File Explorer Tree

### Expected features

* Render nested folders/files.  
* Expand/collapse folders.  
* Keyboard navigation.  
* Search.  
* Auto-expand matching folders.

### Important points

* Recursion.  
* Tree traversal.  
* State shape.  
* Accessibility.  
* Performance for large trees.

---

## 6. Toast Notification System

### Expected features

* Add toast.  
* Auto-dismiss after timeout.  
* Manual close.  
* Multiple toast positions.  
* Pause on hover.  
* Limit visible toasts.

### Important points

* Event emitter or central store.  
* Timers.  
* Cleanup.  
* Queue management.  
* Accessibility with `aria-live`.

---

## 7. Tabs Component

### Expected features

* Render tabs.  
* Active tab state.  
* Keyboard navigation.  
* ARIA roles.  
* Lazy render content optionally.

### Important points

* Controlled/uncontrolled pattern.  
* Accessibility.  
* State management.  
* Component composition.

---

## 8. Carousel

### Expected features

* Next/previous.  
* Auto-play.  
* Pause on hover.  
* Dots navigation.  
* Infinite loop.  
* Keyboard support.

### Important points

* Timers.  
* Cleanup interval.  
* Index wrapping.  
* Accessibility.  
* Touch events optionally.

---

## 9. Data Table

### Expected features

* Sorting.  
* Filtering.  
* Pagination.  
* Row selection.  
* Column configuration.  
* Loading and empty states.

### Important points

* Derived data.  
* Memoization.  
* Stable sorting.  
* Controlled state.  
* Virtualization for large data.

---

## 10. Typeahead Search

### Expected features

* Debounced search.  
* API call.  
* Loading state.  
* No result state.  
* Keyboard navigation.  
* Cancel stale requests.

### Important points

* Debounce.  
* AbortController.  
* Race condition handling.  
* Cache recent queries.  
* Accessibility.

---

## Quick Revision Summary

| Problem | Main concept tested |
| ----- | ----- |
| `map` polyfill | Prototype, callback, return array |
| `filter` polyfill | Truthy condition, new array |
| `reduce` polyfill | Accumulator, initial value, edge cases |
| `bind` polyfill | `this`, partial args, function return |
| Debounce | Closures, timers |
| Throttle | Closures, rate limiting |
| Deep clone | Recursion, references, WeakMap |
| Flatten array | Recursion/stack |
| Memoization | Cache, pure functions |
| Event emitter | Pub/Sub, Set/Map, cleanup |
| Promise implementation | Async flow, states, chaining |
| Currying | Closures, partial application |
| LRU Cache | Map, insertion order, eviction |
| LRU \+ TTL | Expiry, cleanup, cache invalidation |

---

## Final Interview-Ready Combined Answer

Common JavaScript coding questions test core language behavior and practical utility design. Polyfills like `map`, `filter`, `reduce`, and `bind` test callbacks, prototypes, `this`, and edge cases. Debounce and throttle test closures and timers. Deep clone and flatten array test recursion and reference handling. Memoization tests caching and pure functions. Event emitter tests Pub/Sub design. Promise implementation tests async state management and chaining. Currying tests closures and argument collection. LRU Cache tests data structure design, and in JavaScript a `Map` can be used effectively because it preserves insertion order. For machine coding, common problems include Todo App, Modal, Dropdown, Infinite Scroll, File Explorer Tree, Toast System, Tabs, Carousel, Data Table, and Typeahead Search.

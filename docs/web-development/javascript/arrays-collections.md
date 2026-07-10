---
title: Arrays & Collections
sidebar_position: 16
---

# Arrays & Collections

JavaScript arrays and collections are common interview topics because they test iteration, immutability, callbacks, return values, performance, and real frontend use cases.

Reference: [Indexed and Keyed Collections](http://webmobtuts.com/javascript/javascript-keyed-and-indexed-collections-array-map-and-set/)

## Quick Method Summary

| Method | Purpose | Returns | Mutates Original? |
| :---- | :---- | :---- | :---- |
| `forEach` | Iterate for side effects | `undefined` | No |
| `map` | Transform each item | New array | No |
| `filter` | Keep matching items | New array | No |
| `reduce` | Accumulate into one result | Any value | No |
| `find` | First matching item | Item or `undefined` | No |
| `findIndex` | First matching index | Index or `-1` | No |
| `some` | At least one item passes | Boolean | No |
| `every` | All items pass | Boolean | No |
| `flat` | Flatten nested arrays | New array | No |
| `flatMap` | Map and flatten one level | New array | No |
| `sort` | Sort items | Same array | Yes |
| `splice` | Add or remove items | Removed items | Yes |
| `slice` | Copy part of an array | New array | No |
| `push` / `pop` | Add or remove at end | Length or removed item | Yes |
| `shift` / `unshift` | Remove or add at start | Removed item or length | Yes |

## `forEach`

Use `forEach` when you want side effects, not a returned array.

```js
const users = ["Akhil", "Rahul", "Neha"];

users.forEach((user) => {
  console.log(user);
});
```

Important points:

- Returns `undefined`.
- Does not create a new array.
- Does not mutate the array by itself, but the callback can mutate referenced objects.
- Cannot be stopped with `break`.
- Not ideal for `await` sequencing.

Common trap:

```js
const result = [1, 2, 3].forEach((num) => num * 2);

console.log(result);
// undefined
```

## `map`

Use `map` when you want to transform every item and return a new array of the same length.

```js
const prices = [100, 200, 300];

const withTax = prices.map((price) => price * 1.18);

console.log(withTax);
// [118, 236, 354]
```

React example:

```jsx
users.map((user) => <UserCard key={user.id} user={user} />);
```

Common mistake:

```js
const result = [1, 2, 3].map((num) => {
  num * 2;
});

console.log(result);
// [undefined, undefined, undefined]
```

Fix:

```js
const result = [1, 2, 3].map((num) => {
  return num * 2;
});

console.log(result);
// [2, 4, 6]
```

## `filter`

Use `filter` when you want to keep only items that match a condition.

```js
const numbers = [1, 2, 3, 4, 5];

const even = numbers.filter((num) => num % 2 === 0);

console.log(even);
// [2, 4]
```

Frontend example:

```js
const products = [
  { name: "Phone", inStock: true },
  { name: "Laptop", inStock: false },
];

const availableProducts = products.filter((product) => product.inStock);
```

Common trap:

```js
const result = [1, 2, 3].filter((num) => num * 2);

console.log(result);
// [1, 2, 3]
```

`filter` expects a truthy or falsy condition. Since `num * 2` is truthy for every item, all items remain.

## `reduce`

Use `reduce` when you want to accumulate an array into one final result.

```js
const numbers = [10, 20, 30];

const total = numbers.reduce((acc, num) => acc + num, 0);

console.log(total);
// 60
```

General shape:

```js
array.reduce((accumulator, currentItem) => {
  return updatedAccumulator;
}, initialValue);
```

### Count Occurrences

```js
const items = ["apple", "banana", "apple"];

const count = items.reduce((acc, item) => {
  acc[item] = (acc[item] || 0) + 1;
  return acc;
}, {});

console.log(count);
// { apple: 2, banana: 1 }
```

### Group by Property

```js
const users = [
  { name: "A", role: "admin" },
  { name: "B", role: "user" },
  { name: "C", role: "admin" },
];

const grouped = users.reduce((acc, user) => {
  if (!acc[user.role]) {
    acc[user.role] = [];
  }

  acc[user.role].push(user);
  return acc;
}, {});

console.log(grouped);
```

### Convert Array to Lookup

```js
const users = [
  { id: 1, name: "Akhil" },
  { id: 2, name: "Rahul" },
];

const userById = users.reduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {});
```

Important trap:

```js
[].reduce((acc, num) => acc + num);
// TypeError: Reduce of empty array with no initial value
```

Prefer passing an initial value.

## Search and Validation Methods

### `find`

```js
const users = [
  { id: 1, name: "Akhil" },
  { id: 2, name: "Rahul" },
];

const user = users.find((user) => user.id === 2);

console.log(user);
// { id: 2, name: "Rahul" }
```

`find` returns the first matching item or `undefined`.

### `findIndex`

```js
const index = users.findIndex((user) => user.id === 2);

console.log(index);
// 1
```

`findIndex` returns the first matching index or `-1`.

### `some`

```js
const permissions = ["read", "write"];

const canEdit = permissions.some((permission) => permission === "write");

console.log(canEdit);
// true
```

`some` returns `true` when at least one item passes.

### `every`

```js
const fields = [
  { name: "email", valid: true },
  { name: "password", valid: true },
];

const isFormValid = fields.every((field) => field.valid);

console.log(isFormValid);
// true
```

`every` returns `true` only if all items pass. For an empty array, `every` returns `true`.

## Flattening Methods

### `flat`

```js
const arr = [1, [2, [3, [4]]]];

console.log(arr.flat(1));
// [1, 2, [3, [4]]]

console.log(arr.flat(2));
// [1, 2, 3, [4]]

console.log(arr.flat(Infinity));
// [1, 2, 3, 4]
```

### `flatMap`

`flatMap` is equivalent to `map` followed by `flat(1)`.

```js
const arr = [1, 2, 3];

const result = arr.flatMap((num) => [num, num * 2]);

console.log(result);
// [1, 2, 2, 4, 3, 6]
```

## Sorting

`sort` mutates the original array and sorts values as strings by default.

```js
const nums = [10, 2, 30];

nums.sort();

console.log(nums);
// [10, 2, 30]
```

Numeric sort:

```js
const nums = [10, 2, 30];

nums.sort((a, b) => a - b);

console.log(nums);
// [2, 10, 30]
```

Comparator mental model:

- Negative result: `a` comes before `b`.
- Positive result: `b` comes before `a`.
- Zero: order stays the same.

For immutable sorting, copy first:

```js
const sorted = [...nums].sort((a, b) => a - b);
```

## Set

`Set` stores unique values.

```js
const arr = [1, 2, 2, 3];
const unique = [...new Set(arr)];

console.log(unique);
// [1, 2, 3]
```

Use `Set` for:

- Removing duplicate primitive values
- Fast existence checks
- Selected IDs
- Permission checks

Duplicate check:

```js
function hasDuplicate(arr) {
  return new Set(arr).size !== arr.length;
}

console.log(hasDuplicate([1, 2, 3]));
// false

console.log(hasDuplicate([1, 2, 2]));
// true
```

## Map

`Map` stores key-value pairs where keys can be any type.

```js
const cache = new Map();

cache.set("/api/users", [{ id: 1 }]);

console.log(cache.get("/api/users"));
```

Object keys in plain objects are converted to strings:

```js
const obj = {};
const key = { id: 1 };

obj[key] = "value";

console.log(obj);
// { "[object Object]": "value" }
```

`Map` preserves object keys:

```js
const map = new Map();
const key = { id: 1 };

map.set(key, "value");

console.log(map.get(key));
// value
```

Use `Map` when keys are dynamic, keys are not only strings, or frequent add/delete/lookup operations are needed.

## WeakMap and WeakSet

`WeakMap` keys must be objects. `WeakSet` values must be objects.

They are weakly referenced, so they do not prevent garbage collection when the object is no longer reachable elsewhere.

```js
const metadata = new WeakMap();
const user = { id: 1 };

metadata.set(user, { lastSeen: Date.now() });

console.log(metadata.get(user));
```

Limitations:

- Not iterable.
- No `.size`.
- Keys or values must be objects.

For more garbage-collection context, see [Memory Management](./memory-management.md).

## Removing Duplicates from Objects

`Set` does not remove duplicate objects by value because objects are compared by reference.

```js
const users = [{ id: 1 }, { id: 1 }];

console.log(new Set(users).size);
// 2
```

Use `Map` with a unique key:

```js
const users = [
  { id: 1, name: "A" },
  { id: 1, name: "A Updated" },
  { id: 2, name: "B" },
];

const uniqueUsers = [...new Map(users.map((user) => [user.id, user])).values()];

console.log(uniqueUsers);
// [{ id: 1, name: "A Updated" }, { id: 2, name: "B" }]
```

## Interview Comparisons

### `map` vs `forEach`

| Point | `map` | `forEach` |
| :---- | :---- | :---- |
| Return value | New array | `undefined` |
| Purpose | Transformation | Side effects |
| Chainable | Yes | No |
| React rendering | Commonly used | Not useful directly |

### `filter` vs `find`

- `filter` returns all matching items as an array.
- `find` returns only the first matching item.

### `some` vs `every`

- `some` checks whether at least one item passes.
- `every` checks whether all items pass.

### `Set` vs `Array`

- Use `Array` for ordered lists, rendering, and index-based access.
- Use `Set` for uniqueness and fast existence checks.

### `Map` vs `Object`

- Use `Object` for fixed structured data with known properties.
- Use `Map` for dynamic key-value collections and non-string keys.

## Polyfill Notes

Polyfills are commonly asked to test callback handling, `thisArg`, sparse arrays, return values, and mutation behavior.

Full implementations for `map`, `filter`, and `reduce` are maintained in [JavaScript Coding Questions](./javascript-coding-questions.md).

### `forEach` Polyfill

```js
Array.prototype.myForEach = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError("Array.prototype.myForEach called on null or undefined");
  }

  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const arr = Object(this);

  for (let i = 0; i < arr.length; i++) {
    if (i in arr) {
      callback.call(thisArg, arr[i], i, arr);
    }
  }
};
```

### `find` Polyfill

```js
Array.prototype.myFind = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError("Array.prototype.myFind called on null or undefined");
  }

  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const arr = Object(this);

  for (let i = 0; i < arr.length; i++) {
    if (callback.call(thisArg, arr[i], i, arr)) {
      return arr[i];
    }
  }

  return undefined;
};
```

### `some` Polyfill

```js
Array.prototype.mySome = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError("Array.prototype.mySome called on null or undefined");
  }

  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const arr = Object(this);

  for (let i = 0; i < arr.length; i++) {
    if (i in arr && callback.call(thisArg, arr[i], i, arr)) {
      return true;
    }
  }

  return false;
};
```

### `every` Polyfill

```js
Array.prototype.myEvery = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError("Array.prototype.myEvery called on null or undefined");
  }

  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const arr = Object(this);

  for (let i = 0; i < arr.length; i++) {
    if (i in arr && !callback.call(thisArg, arr[i], i, arr)) {
      return false;
    }
  }

  return true;
};
```

### `flat` Polyfill

```js
Array.prototype.myFlat = function (depth = 1) {
  const result = [];

  function flatten(arr, currentDepth) {
    for (const item of arr) {
      if (Array.isArray(item) && currentDepth > 0) {
        flatten(item, currentDepth - 1);
      } else {
        result.push(item);
      }
    }
  }

  flatten(this, depth);
  return result;
};
```

## Most Common Traps

- `forEach` returns `undefined`, not a new array.
- `map` needs an explicit `return` when using `{}`.
- `filter` expects a condition, not a transformed value.
- `reduce` without an initial value can throw on empty arrays.
- `sort` mutates the original array.
- Default `sort` compares values as strings.
- `Set` removes duplicate primitives, not duplicate objects by value.
- `Map` supports object keys; normal objects convert keys to strings.
- `WeakMap` and `WeakSet` are not iterable.
- `some` means at least one; `every` means all.
- `every` on an empty array returns `true`.

## Interview Answer

JavaScript array methods are used for different data operations. `map` transforms each item and returns a new array, `filter` keeps matching items, `reduce` accumulates an array into one result, and `forEach` is mainly for side effects. Search methods like `find`, `findIndex`, `some`, and `every` help locate or validate data. `flat` and `flatMap` are useful for nested arrays. `sort` is important because it mutates the original array and sorts as strings by default. For collections, `Set` is useful for unique values, `Map` is useful for dynamic key-value data, and `WeakMap` or `WeakSet` are useful when object-based storage should not prevent garbage collection.

---
title: ES6+ Features
sidebar_position: 20
---

# ES6+ Features

Modern JavaScript features make code cleaner, safer, and more expressive. These features appear often in React, API handling, object updates, and utility functions.

## Destructuring

Destructuring extracts values from arrays or objects into variables.

```js
const user = {
  name: "Akhilesh",
  role: "Frontend Engineer",
};

const { name, role } = user;

console.log(name);
console.log(role);
```

Array destructuring:

```js
const colors = ["red", "green", "blue"];

const [first, second] = colors;

console.log(first);
// red
```

Rename while destructuring:

```js
const user = {
  id: 1,
  name: "Akhilesh",
};

const { name: userName } = user;

console.log(userName);
// Akhilesh
```

Default values:

```js
const user = {
  name: "Akhilesh",
};

const { name, role = "Guest" } = user;

console.log(role);
// Guest
```

Nested destructuring:

```js
const response = {
  data: {
    user: {
      name: "Akhilesh",
    },
  },
};

const {
  data: {
    user: { name },
  },
} = response;

console.log(name);
```

Trap: destructuring from `undefined` or `null` throws.

```js
const user = undefined;

const { name } = user || {};

console.log(name);
// undefined
```

Default values apply only when the value is `undefined`, not `null`.

## Spread Operator

Spread expands arrays or objects.

```js
const nums = [1, 2, 3];

console.log(...nums);
// 1 2 3
```

Arrays:

```js
const arr1 = [1, 2];
const arr2 = [3, 4];

const combined = [...arr1, ...arr2];

console.log(combined);
// [1, 2, 3, 4]
```

Objects:

```js
const user = {
  name: "Akhilesh",
  role: "Frontend Engineer",
};

const updatedUser = {
  ...user,
  role: "UI Architect",
};
```

React state update:

```js
setUser((prevUser) => ({
  ...prevUser,
  name: "Akhilesh",
}));
```

Trap: spread creates a shallow copy.

```js
const user = {
  name: "Akhilesh",
  address: {
    city: "Bengaluru",
  },
};

const copy = { ...user };

copy.address.city = "Nagpur";

console.log(user.address.city);
// Nagpur
```

## Rest Operator

Rest collects remaining values into an array or object.

```js
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3));
// 6
```

Array destructuring:

```js
const numbers = [1, 2, 3, 4];

const [first, second, ...rest] = numbers;

console.log(rest);
// [3, 4]
```

Object destructuring:

```js
const user = {
  id: 1,
  name: "Akhilesh",
  role: "Engineer",
};

const { id, ...profile } = user;

console.log(profile);
// { name: "Akhilesh", role: "Engineer" }
```

React props:

```jsx
function Button({ label, ...buttonProps }) {
  return <button {...buttonProps}>{label}</button>;
}
```

Rest parameters must be last.

```js
function test(...args, last) {}
// SyntaxError: Rest parameter must be last formal parameter
```

## Template Literals

Template literals use backticks for interpolation and multi-line strings.

```js
const name = "Akhilesh";

console.log(`Hello, ${name}`);
// Hello, Akhilesh
```

Multi-line:

```js
const message = `Hello Akhilesh,
Welcome to the dashboard.`;
```

Expression interpolation:

```js
const price = 100;
const tax = 18;

console.log(`Total price is ${price + tax}`);
// Total price is 118
```

Tagged templates:

```js
function tag(strings, value) {
  console.log(strings);
  console.log(value);
}

const name = "Akhilesh";

tag`Hello ${name}`;
```

## Default Parameters

Default parameters provide fallback values when arguments are missing or `undefined`.

```js
function greet(name = "Guest") {
  console.log(`Hello, ${name}`);
}

greet("Akhilesh");
greet();
```

Defaults do not apply to `null`.

```js
function greet(name = "Guest") {
  console.log(name);
}

greet(undefined);
// Guest

greet(null);
// null
```

Default parameters can use previous parameters.

```js
function createUser(name, role = `${name}-user`) {
  return { name, role };
}

console.log(createUser("Akhilesh"));
// { name: "Akhilesh", role: "Akhilesh-user" }
```

## Optional Chaining

Optional chaining `?.` safely accesses nested properties when a value may be `null` or `undefined`.

```js
const user = {};

console.log(user.profile?.email);
// undefined
```

Without optional chaining:

```js
console.log(user.profile.email);
// TypeError
```

Function calls:

```js
const analytics = {};

analytics.track?.("button_click");
```

Array access:

```js
const users = [];

console.log(users?.[0]?.name);
// undefined
```

Optional chaining stops only on `null` or `undefined`, not other falsy values.

```js
const obj = {
  count: 0,
  active: false,
  name: "",
};

console.log(obj.count?.toString());
console.log(obj.active?.toString());
console.log(obj.name?.length);
```

Trap: optional chaining does not protect undeclared variables.

```js
console.log(user?.name);
// ReferenceError if user is not declared
```

## Nullish Coalescing

Nullish coalescing `??` provides a fallback only for `null` or `undefined`.

```js
const name = null;

console.log(name ?? "Guest");
// Guest
```

Difference from `||`:

```js
console.log(0 || 10);
// 10

console.log(0 ?? 10);
// 0

console.log("" || "default");
// default

console.log("" ?? "default");
// ""

console.log(false || true);
// true

console.log(false ?? true);
// false
```

You cannot mix `??` with `||` or `&&` without parentheses.

```js
const value = (null || undefined) ?? "fallback";

console.log(value);
// fallback
```

## Symbols

A `Symbol` is a primitive value that creates a unique identifier.

```js
const id1 = Symbol("id");
const id2 = Symbol("id");

console.log(id1 === id2);
// false
```

Use symbols when you need unique object keys.

```js
const id = Symbol("id");

const user = {
  name: "Akhilesh",
  [id]: 123,
};

console.log(user[id]);
// 123
```

Symbols are not included in normal `Object.keys()` iteration.

```js
console.log(Object.keys(user));
// ["name"]

console.log(Object.getOwnPropertySymbols(user));
// [Symbol(id)]
```

Global symbol registry:

```js
const s1 = Symbol.for("app.id");
const s2 = Symbol.for("app.id");

console.log(s1 === s2);
// true
```

Custom iterable:

```js
const range = {
  start: 1,
  end: 3,

  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;

    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        }

        return { value: undefined, done: true };
      },
    };
  },
};

console.log([...range]);
// [1, 2, 3]
```

## BigInt

`BigInt` represents integers larger than JavaScript's safe number limit.

```js
const big = 9007199254740993n;

console.log(big);
// 9007199254740993n
```

JavaScript numbers safely represent integers only up to `Number.MAX_SAFE_INTEGER`.

```js
console.log(Number.MAX_SAFE_INTEGER);
// 9007199254740991

console.log(9007199254740991 + 1);
// 9007199254740992

console.log(9007199254740991 + 2);
// 9007199254740992
```

BigInt operations:

```js
const a = 10n;
const b = 3n;

console.log(a + b);
// 13n

console.log(a * b);
// 30n

console.log(a / b);
// 3n
```

Trap: BigInt and Number cannot be mixed directly.

```js
console.log(10n + 5);
// TypeError

console.log(10n + BigInt(5));
// 15n
```

In frontend apps, very large backend IDs are often handled as strings to avoid precision loss.

## Quick Revision Summary

| Feature | Key Point |
| :---- | :---- |
| Destructuring | Extracts values from arrays or objects |
| Spread | Expands values or properties |
| Rest | Collects remaining values |
| Template literals | Backticks, interpolation, multi-line strings |
| Default parameters | Used only for `undefined`, not `null` |
| Optional chaining | Stops only on `null` or `undefined` |
| Nullish coalescing | Fallback only for `null` or `undefined` |
| Symbol | Unique primitive identifier |
| BigInt | Large integer primitive |
| Spread copy | Shallow copy only |
| Rest parameter | Must be the last parameter |

## Interview Answer

Modern JavaScript features help write cleaner and safer code. Destructuring extracts values from arrays and objects. Spread expands arrays or objects, while rest collects remaining values. Template literals make dynamic strings easier. Default parameters provide fallback values for `undefined`. Optional chaining safely accesses nested data when values may be `null` or `undefined`, and nullish coalescing gives fallback only for nullish values. Symbols create unique identifiers, and BigInt handles integers beyond JavaScript's safe number range. The most important interview traps are rest vs spread, shallow copy with spread, optional chaining behavior, `??` vs `||`, and defaults not applying to `null`.

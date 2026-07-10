---
title: JS Fundamentals
sidebar_position: 5
---

# JS Fundamentals

This page covers the core JavaScript fundamentals that show up repeatedly in interviews: variables, data types, coercion, truthy/falsy values, operators, and value passing.

## Variables

Reference: [TypeScript Handbook: Variable Declarations](https://www.typescriptlang.org/docs/handbook/variable-declarations.html)

How you declare a variable determines its scope, whether it can be reassigned, whether it can be redeclared, and how it behaves during hoisting.

## `var`

Before ES6, `var` was the only way to declare variables. It is function-scoped, so it does not respect `if` or `for` block boundaries.

- Reassignable: yes
- Redeclarable: yes
- Scope: function-scoped

```js
function varExample() {
  if (true) {
    var greeting = "Hello from inside the if!";
  }

  console.log(greeting);
}

varExample();
// Hello from inside the if!
```

## `let`

`let` is block-scoped. It stays inside the nearest set of curly braces, such as an `if` statement, loop, or function.

- Reassignable: yes
- Redeclarable in the same scope: no
- Scope: block-scoped

```js
let count = 1;
count = 2;

if (true) {
  let secret = "I am hidden";
  console.log(secret);
}

// console.log(secret);
// ReferenceError: secret is not defined
```

## `const`

`const` is block-scoped like `let`, but the binding cannot be reassigned after initialization.

- Reassignable: no
- Redeclarable in the same scope: no
- Scope: block-scoped

```js
const pi = 3.14159;

// pi = 3;
// TypeError: Assignment to constant variable.
```

`const` prevents reassignment of the binding, not mutation of an object value.

```js
const user = {
  name: "Alice",
};

user.name = "Bob";

console.log(user.name);
// Bob
```

## Variable Declaration Summary

| Feature | `var` | `let` | `const` |
| :---- | :---- | :---- | :---- |
| Scope | Function-scoped | Block-scoped | Block-scoped |
| Hoisting | Hoisted and initialized as `undefined` | Hoisted but in TDZ | Hoisted but in TDZ |
| Reassignable | Yes | Yes | No |
| Redeclarable | Yes | No | No |

## Modern Rule of Thumb

Use `const` by default. Switch to `let` only when the value must change later, such as a loop counter or toggled state.

Avoid `var` in modern JavaScript unless you are explaining legacy behavior.

## Interview Follow-Ups

Deeper interview puzzles are covered in:

- [Hoisting](./hoisting.md) for hoisting, TDZ, function declarations, function expressions, and output puzzles.
- [Scope](./scope.md) for lexical environments, scope chains, variable shadowing, and scope lookup.

### Is `const` Truly Immutable?

No. `const` creates an immutable binding, not an immutable value. You cannot reassign the variable, but if the value is an object or array, you can still mutate its internal properties or elements.

For shallow object immutability, mention `Object.freeze()`.

## Data Types

Reference: [W3Schools JavaScript Data Types](https://www.w3schools.com/js/js_datatypes.asp)

JavaScript values fall into two broad categories: primitive types and reference types.

### Primitive Types

Primitive values are simple values stored directly by the variable binding. They are immutable.

The seven primitive types are:

- `string`
- `number`
- `boolean`
- `undefined`
- `null`
- `symbol`
- `bigint`

### Reference Types

Reference values are complex data structures stored in heap memory. The variable holds a reference to that memory location.

Examples include:

- `object`
- `array`
- `function`
- `date`

Everything that is not a primitive is an object or object-like value.

## The `typeof` Operator

The `typeof` operator returns a string describing the type of a value.

```js
console.log(typeof "Hello");
// string

console.log(typeof 42);
// number

console.log(typeof true);
// boolean

console.log(typeof undefined);
// undefined

console.log(typeof Symbol());
// symbol

console.log(typeof 10n);
// bigint

console.log(typeof { name: "A" });
// object

console.log(typeof [1, 2, 3]);
// object

console.log(typeof function () {});
// function
```

### The `typeof null` Bug

```js
console.log(typeof null);
// object
```

This is a legacy bug from the first version of JavaScript. It was never fixed because changing it would break old websites.

## Type Conversion

Reference: [W3Schools JavaScript Type Conversion](https://www.w3schools.com/js/js_type_conversion.asp)

Type conversion means changing a value from one type to another, such as converting `"42"` to `42`.

JavaScript is dynamically typed, so operations often convert values behind the scenes.

### Explicit Coercion

Explicit coercion is manual conversion using built-in functions.

```js
const strValue = "123";
const numValue = Number(strValue);

console.log(numValue);
// 123

const age = 30;
const ageStr = String(age);

console.log(ageStr);
// "30"
```

### Implicit Coercion

Implicit coercion happens when JavaScript converts types automatically.

```js
console.log("5" + 2);
// "52"

console.log("5" - 2);
// 3

console.log("5" * "2");
// 10
```

The `+` operator prefers string concatenation if one side is a string. Operators like `-`, `*`, and `/` usually convert strings to numbers.

## Truthy and Falsy Values

When JavaScript expects a boolean, it coerces the value to either `true` or `false`.

### Falsy Values

There are exactly eight falsy values:

1. `false`
2. `0`
3. `-0`
4. `0n`
5. `""`
6. `null`
7. `undefined`
8. `NaN`

### Truthy Values

Everything else is truthy, including:

- `[]`
- `{}`
- `" "`
- `"false"`

## Operators

### Arithmetic Operators

Arithmetic operators are used for math: `+`, `-`, `*`, `/`, `%`, and `**`.

The main gotcha is that `+` performs addition unless one operand is a string. In that case, it performs string concatenation.

### Comparison Operators

- Loose equality `==` compares values after implicit conversion.
- Strict equality `===` compares both value and type without conversion.

```js
console.log(5 == "5");
// true

console.log(5 === "5");
// false
```

### Logical Operators

Logical operators control boolean-like flow:

- `&&` means AND.
- `||` means OR.
- `!` means NOT.

In JavaScript, `&&` and `||` return actual operand values, not always booleans.

```js
const name = "" || "Guest";
console.log(name);
// Guest

const destination = "Logged In" && "Dashboard";
console.log(destination);
// Dashboard
```

### Bitwise Operators

Bitwise operators manipulate binary values: `&`, `|`, `^`, `~`, `<<`, and `>>`.

They are uncommon in everyday frontend UI code, but useful in performance-sensitive areas such as graphics, cryptography, permissions, and game-state flags.

## Common Interview Topics

### `undefined` vs `null`

- `undefined` means a variable has been declared but has not been assigned a value.
- `null` is an intentional empty value.

```js
let a;
console.log(a);
// undefined

let b = null;
console.log(b);
// null

console.log(null == undefined);
// true

console.log(null === undefined);
// false
```

### `undefined` vs `not defined`

- `undefined`: the variable exists in memory but has no assigned value.
- `not defined`: the variable does not exist in the scope chain.

```js
let user;
console.log(user);
// undefined

console.log(salary);
// ReferenceError: salary is not defined
```

### Call by Value vs Reference-Like Behavior

JavaScript is technically pass-by-value. For objects, the value being passed is a copy of the object reference.

#### Primitives

```js
function updateNumber(num) {
  num = 100;
}

let score = 50;

updateNumber(score);
console.log(score);
// 50
```

#### Objects

```js
function updateProfile(obj) {
  obj.age = 40;
}

const user = {
  name: "Bob",
  age: 25,
};

updateProfile(user);
console.log(user.age);
// 40
```

#### Reassigning the Parameter

```js
function replaceProfile(obj) {
  obj = {
    name: "Alice",
    age: 30,
  };
}

const manager = {
  name: "Charlie",
  age: 50,
};

replaceProfile(manager);
console.log(manager.name);
// Charlie
```

Reassigning `obj` points the local parameter to a new object. It does not change the outer `manager` reference.

### Coercion Puzzle

```js
console.log([] == ![]);
console.log(true + false);
console.log("2" + 2 - 1);
```

Output:

```text
true
1
21
```

Explanation:

1. `[] == ![]` becomes `[] == false`, then `0 == 0`, which is `true`.
2. `true + false` becomes `1 + 0`, which is `1`.
3. `"2" + 2` becomes `"22"`, then `"22" - 1` becomes `21`.

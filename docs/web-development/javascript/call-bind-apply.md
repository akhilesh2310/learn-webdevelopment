---
title: call, bind, apply
sidebar_position: 13
---

# call, bind, apply

`call()`, `apply()`, and `bind()` are methods available on functions through `Function.prototype`. They let you manually control the value of `this`.

## Why They Matter

Use explicit binding utilities when you need to:

- Borrow a method from one object and run it against another object.
- Keep logic separate from a specific data object.
- Preserve method context before passing a function as a callback.

## `call()`

`call()` invokes the function immediately. It accepts the `this` context as the first argument and passes function arguments individually.

```js
function greet(greeting, punctuation) {
  console.log(`${greeting}, I am ${this.name}${punctuation}`);
}

const user = {
  name: "Amit",
};

greet.call(user, "Hello", "!");
// Hello, I am Amit!
```

Syntax:

```js
func.call(context, arg1, arg2);
```

## `apply()`

`apply()` also invokes the function immediately, but it passes arguments as an array.

```js
greet.apply(user, ["Hi", "."]);
// Hi, I am Amit.
```

Syntax:

```js
func.apply(context, [arg1, arg2]);
```

Memory trick: `call` uses comma-separated arguments. `apply` uses an array of arguments.

## `bind()`

`bind()` does not execute immediately. It returns a new function with `this` permanently bound to the provided context.

```js
const userProfile = {
  name: "Sania",
  logActivity(activity) {
    console.log(`${this.name} performed: ${activity}`);
  },
};

const preLockedLog = userProfile.logActivity.bind(userProfile);

preLockedLog("Code Review");
// Sania performed: Code Review
```

Syntax:

```js
const boundFunc = func.bind(context, arg1, arg2);
```

## Comparison

| Feature | `call()` | `apply()` | `bind()` |
| :---- | :---- | :---- | :---- |
| Execution | Immediate | Immediate | Deferred |
| Arguments | Individual arguments | Array of arguments | Individual arguments |
| Return value | Function result | Function result | New bound function |
| Common use case | Method borrowing with known parameters | Variadic utilities and array arguments | Callbacks and event handlers |

## Use Case 1: Method Borrowing

```js
const validator = {
  validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  },
};

const leadUser = {
  email: "lead@production.com",
};

const legacyCustomer = {
  email: "invalid-email-string",
};

const isLeadValid = validator.validateEmail.call(leadUser);
const isCustomerValid = validator.validateEmail.call(legacyCustomer);

console.log(isLeadValid);
// true

console.log(isCustomerValid);
// false
```

## Use Case 2: `apply()` with Variadic Functions

Some utilities, such as `Math.max`, accept individual arguments rather than an array.

```js
const salaryList = [4500, 9200, 3100, 12000, 8500];

const topSalary = Math.max.apply(null, salaryList);

console.log(topSalary);
// 12000
```

Modern JavaScript often uses spread syntax instead:

```js
const topSalary = Math.max(...salaryList);
```

## Use Case 3: Preserving Callback Context

Passing a method as a callback can strip its object context. `bind()` locks the context first.

```js
const digitalClock = {
  time: "12:00 PM",
  render() {
    console.log(`The current time is ${this.time}`);
  },
  start() {
    setTimeout(this.render.bind(this), 1000);
  },
};

digitalClock.start();
```

Without `bind`, `this.render` would run without the `digitalClock` receiver.

## Interview Puzzles

### Puzzle 1: Borrowing on Objects with Existing Keys

```js
const device = {
  brand: "Apple",
  getBrand() {
    return "Local Device: " + this.brand;
  },
};

function getBrand() {
  return this.brand;
}

console.log(getBrand.call(device));
```

Output:

```text
Apple
```

`getBrand.call(device)` executes the standalone function with `device` as `this`. It does not call `device.getBrand()`.

### Puzzle 2: Chained `bind()`

```js
function display() {
  console.log(this.name);
}

const obj1 = {
  name: "Context One",
};

const obj2 = {
  name: "Context Two",
};

const bound1 = display.bind(obj1);
const bound2 = bound1.bind(obj2);

bound2();
```

Output:

```text
Context One
```

`bind()` is permanent for the created bound function. Rebinding a bound function does not replace the original bound `this`.

### Puzzle 3: Primitive Context Boxing

```js
function testBoxing() {
  console.log(typeof this);
}

testBoxing.call("Hello World");
```

Output in sloppy mode:

```text
object
```

In non-strict mode, JavaScript boxes primitive `this` values into wrapper objects. With strict mode, boxing is disabled and the value remains a primitive string.

## Interview Answer

`call`, `apply`, and `bind` explicitly control a function's `this` value. `call` and `apply` execute immediately; `call` passes arguments one by one, while `apply` passes them as an array. `bind` returns a new function with `this` locked, which is useful for callbacks and event handlers.

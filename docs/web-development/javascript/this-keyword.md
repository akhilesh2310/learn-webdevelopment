---
title: this keyword
sidebar_position: 12
---

# this keyword

The `this` keyword is a runtime binding. It does not point to the function itself or to the function's local scope. Its value is determined by how the function is called.

References:

- [W3Schools: JavaScript this](https://www.w3schools.com/js/js_this.asp)
- [Understanding the JavaScript new Keyword](https://hackernoon.com/understanding-javascript-new-keyword-ec67c8caaa74)

## Quick Rules

1. In an object method, `this` usually refers to the object before the dot.
2. In a plain function call, `this` refers to the global object in sloppy mode.
3. In strict mode, a plain function call gets `this === undefined`.
4. With `call`, `apply`, and `bind`, you can explicitly set `this`.
5. With `new`, `this` refers to the newly created object.
6. Arrow functions do not have their own `this`; they inherit it lexically.

## Default Binding

Default binding happens when a regular function is called by itself.

```js
function show() {
  console.log(this);
}

show();
// window in sloppy browser scripts
// undefined in strict mode
```

## Implicit Binding

Implicit binding happens when a function is called as an object method. `this` points to the object to the left of the dot.

```js
const manager = {
  name: "John",
  logName() {
    console.log(this.name);
  },
};

manager.logName();
// John
```

## Explicit Binding

Use `call`, `apply`, or `bind` to manually set `this`.

- `call(context, arg1, arg2)`: runs immediately with individual arguments.
- `apply(context, [args])`: runs immediately with arguments in an array.
- `bind(context)`: returns a new function with `this` locked.

```js
function displayInfo(city, country) {
  console.log(`${this.name} from ${city}, ${country}`);
}

const person = {
  name: "Rohan",
};

displayInfo.call(person, "Mumbai", "India");
displayInfo.apply(person, ["Mumbai", "India"]);

const permanentLog = displayInfo.bind(person, "Tokyo", "Japan");
permanentLog();

// Rohan from Mumbai, India
// Rohan from Mumbai, India
// Rohan from Tokyo, Japan
```

## `new` Binding

When a function is called with `new`, JavaScript creates a new object and binds `this` to that object.

```js
function Car(model) {
  this.model = model;
}

const myCar = new Car("Tesla");

console.log(myCar.model);
// Tesla
```

## Arrow Function `this`

Arrow functions do not create their own `this`. They inherit `this` from the surrounding lexical scope.

```js
const userProfile = {
  name: "Sania",
  greet: () => {
    console.log(this.name);
  },
};

userProfile.greet();
// undefined
```

For object methods, prefer regular method syntax when you need `this`.

## Interview Puzzles

### Puzzle 1: Implicit Binding Loss

```js
const profile = {
  username: "Dev123",
  display() {
    console.log(this.username);
  },
};

const extractDisplay = profile.display;

extractDisplay();
```

Output:

```text
undefined
```

The method is extracted and called as a plain function. There is no object to the left of the call, so implicit binding is lost.

### Puzzle 2: `this` Inside Callback Methods

```js
const group = {
  title: "Frontend Team",
  members: ["Alice", "Bob"],
  showMembers() {
    this.members.forEach(function (member) {
      console.log(`${member} is in ${this.title}`);
    });
  },
};

group.showMembers();
```

Output:

```text
Alice is in undefined
Bob is in undefined
```

The callback is a regular function, so its `this` is not automatically the `group` object.

Fix it with an arrow function:

```js
const group = {
  title: "Frontend Team",
  members: ["Alice", "Bob"],
  showMembers() {
    this.members.forEach((member) => {
      console.log(`${member} is in ${this.title}`);
    });
  },
};

group.showMembers();

// Alice is in Frontend Team
// Bob is in Frontend Team
```

## Service Worker Context

In a service worker, top-level global scope is `ServiceWorkerGlobalScope`, not the main browser `window`.

Prefer `self` over `this` in service workers.

| Context | `this` Behavior | `self` Behavior |
| :---- | :---- | :---- |
| Top-level code | `ServiceWorkerGlobalScope` | `ServiceWorkerGlobalScope` |
| Standard functions | `ServiceWorkerGlobalScope` in sloppy mode; `undefined` in strict mode | `ServiceWorkerGlobalScope` |
| Arrow functions | Lexical context inherited from parent | `ServiceWorkerGlobalScope` |
| Event listeners | Event target object | `ServiceWorkerGlobalScope` |

Why `this` can fail:

```js
self.addEventListener("install", (event) => {
  this.skipWaiting();
});
```

Correct approach:

```js
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  console.log("Intercepting request for:", event.request.url);
});
```

## Interview Answer

`this` is determined by the call site. In a method call, it points to the object before the dot. In a plain function call, it points to the global object in sloppy mode and `undefined` in strict mode. `call`, `apply`, and `bind` explicitly set `this`, while `new` binds `this` to the newly created object. Arrow functions do not have their own `this`; they inherit it from the surrounding scope.

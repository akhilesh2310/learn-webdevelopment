---
title: JS Evaluation
sidebar_position: 3
---

# JS Evaluation

JavaScript is the language used by browsers and many server runtimes. ECMAScript is the official language specification that defines how JavaScript should behave.

## Language Background

JavaScript was invented by Brendan Eich in 1995 and became an ECMA standard in 1997. ECMAScript is the official name of the standardized language.

ECMA International is the standards organization that maintains ECMAScript. From 2015 onward, ECMAScript releases are commonly named by year, such as ES2015, ES2016, and ES2020.

## ECMAScript Evolution

| Version | Year | Important Features |
| :---- | :---- | :---- |
| ES3 | 1999 | `try...catch`, regular expressions |
| ES5 | 2009 | Strict mode, JSON support, `forEach`, `map`, `filter`, `reduce`, `Object.create()` |
| ES6 / ES2015 | 2015 | `let`, `const`, arrow functions, classes, modules, template literals, destructuring, spread/rest, promises, `Map`, `Set` |
| ES2016 / ES7 | 2016 | `Array.includes()`, exponentiation operator `**` |
| ES2017 / ES8 | 2017 | `async/await`, `Object.entries()`, `Object.values()` |
| ES2018 / ES9 | 2018 | Rest/spread for objects, async iteration, `Promise.finally()` |
| ES2019 / ES10 | 2019 | `Array.flat()`, `Array.flatMap()`, optional catch binding |
| ES2020 / ES11 | 2020 | Optional chaining `?.`, nullish coalescing `??`, BigInt, dynamic import |
| ES2021 / ES12 | 2021 | `Promise.any()`, logical assignment operators `&&=`, `||=`, `??=` |
| ES2022 / ES13 | 2022 | Class fields, private fields `#name`, top-level `await` |
| ES2023 / ES14 | 2023 | `findLast()`, `findLastIndex()`, immutable array methods such as `toSorted()` and `toReversed()` |
| ES2024 / ES15 | 2024 | `Object.groupBy()`, `Map.groupBy()`, `Promise.withResolvers()` |
| ES2025 / ES16 | 2025 | Smaller incremental improvements that are less commonly asked in interviews |

Reference: [TutorialsPoint JavaScript Overview](https://www.tutorialspoint.com/javascript/javascript_overview.htm)

## Core Concepts

### What Is JavaScript?

JavaScript is a high-level, multi-paradigm, just-in-time compiled language. It started as a scripting language for the DOM, but modern engines like V8 made it capable of high-performance execution on both the client and server.

### Single-Threaded Nature

JavaScript runs on a single call stack, which keeps execution predictable. To avoid blocking the UI during heavy work such as I/O, browsers offload tasks to Web APIs and use the event loop to schedule callbacks when the call stack is clear.

In interview terms, JavaScript gives you concurrency without making the JavaScript call stack itself parallel.

### Interpreted vs Compiled

It is a misconception that JavaScript is purely interpreted. Modern engines use JIT (Just-In-Time) compilation. They parse code, optimize frequently executed hot paths into machine code at runtime, and interpret less frequently used code.

This gives JavaScript the development flexibility of an interpreted language with much of the performance benefit of a compiled language.

## Most Important Releases for Interviews

### ES5 (2009)

```js
"use strict";

arr.map(callback);
arr.filter(callback);
arr.reduce(callback, initialValue);
```

### ES6 / ES2015

ES6 is the most important release for modern JavaScript interviews.

```js
const name = "Akhilesh";

const greet = () => "Hello";

const { id } = user;

const newArr = [...arr];

class User {}
```

### ES2017: Async/Await

```js
async function getData() {
  const data = await fetch(url);
  return data;
}
```

### ES2020: Optional Chaining and Nullish Coalescing

```js
const city = user?.address?.city;

const value = input ?? "default";
```

### ES2022: Private Fields

```js
class User {
  #name = "John";
}
```

## Interview Answer

ECMAScript is the standard specification for JavaScript. The most significant release was ES6 in 2015, which introduced modern JavaScript features such as `let`, `const`, arrow functions, classes, modules, destructuring, the spread operator, and promises.

Later versions added `async/await` in ES2017, optional chaining and nullish coalescing in ES2020, private class fields in ES2022, and utility methods like `findLast()` and `groupBy()` in recent releases. Today, modern browsers support almost all widely used ECMAScript features.

---
title: JS Evaluation
sidebar_position: 3
---

# JS Evaluation

## Language Basics

Background:  
JavaScript was invented by Brendan Eich in 1995 and became an ECMA standard in 1997\.  
ECMAScript is the official name of the language.  
(Ecma is a standards organization for information and communication systems. It acquired its current name in 1994\) From 2015, ECMAScript is named by year (ECMAScript 2015\)

ECMAScript was developed by ECMA International after the organization adopted JavaScript.

2009-2011-\> ES5--Fully supported except IE9(use of  “strict”)  \-- JS 1.8.5  
2015-\> ES6 \- Partially supported in major browsers   
2016-\> ES7, 2017-\> ES8, 2018-\> ES9

## ECMAScript (JavaScript) Evolution

| Version | Year | Important Features |
| :---- | :---- | :---- |
| ES5 | 2009 | Strict Mode, JSON support, `forEach`, `map`, `filter`, `reduce`, `Object.create()` |
| ES6 (ES2015) | 2015 | `let`, `const`, Arrow Functions, Classes, Modules, Template Literals, Destructuring, Spread/Rest, Promises, `Map`, `Set` |
| ES2016 (ES7) | 2016 | `Array.includes()`, Exponentiation Operator `**` |
| ES2017 (ES8) | 2017 | `async/await`, `Object.entries()`, `Object.values()` |
| ES2018 (ES9) | 2018 | Rest/Spread for Objects, Async Iteration, Promise.finally() |
| ES2019 (ES10) | 2019 | `Array.flat()`, `Array.flatMap()`, Optional catch binding |
| ES2020 (ES11) | 2020 | Optional Chaining `?.`, Nullish Coalescing `??`, BigInt, Dynamic Import |
| ES2021 (ES12) | 2021 | `Promise.any()`, Logical Assignment Operators (`&&=`, \` |
| ES2022 (ES13) | 2022 | Class Fields, Private Fields `#name`, Top-Level `await` |
| ES2023 (ES14) | 2023 | `findLast()`, `findLastIndex()`, Immutable array methods (`toSorted()`, `toReversed()`) |
| ES2024 (ES15) | 2024 | `Object.groupBy()`, `Map.groupBy()`, Promise.withResolvers() |
| ES2025 (ES16) | 2025 | Smaller incremental improvements (less commonly asked in interviews) |

In 1999, “Try and Catch” and regular expression has been added to JS or ES3.  
[https://www.tutorialspoint.com/javascript/javascript\_overview.htm](https://www.tutorialspoint.com/javascript/javascript_overview.htm)

* What is JavaScript?  
  * It’s a high-level, multi-paradigm, just-in-time compiled language. While it started as a simple scripting tool for the DOM, the V8 engine transformed it into a powerful, event-driven language capable of high-performance execution on both the client and server side.  
* Single-threaded nature  
  * JavaScript runs on a single call stack, which keeps state management predictable. To handle heavy operations like I/O without blocking the UI, we offload tasks to Web APIs and rely on the Event Loop to handle callbacks once the call stack is clear. It’s essentially 'concurrency without parallelism.  
* Interpreted vs Compiled  
  * It’s a misconception that JS is purely interpreted. Modern engines use JIT (Just-In-Time) compilation. They parse code, optimize 'hot' segments into machine code at runtime, and interpret the rest. You get the development speed of an interpreted language with the execution performance of a compiled one

## Most Important Releases for Interviews

### ES5 (2009)

"use strict";

arr.map();  
arr.filter();  
arr.reduce();

### ES6 (2015) ⭐ Most Important

const name \= "Akhilesh";

const greet \= () \=\> "Hello";

const \{ id \} \= user;

const newArr \= \[...arr\];

class User \{\}

### ES2017 (Async/Await)

async function getData() \{  
 const data \= await fetch(url);  
\}

### ES2020 (Optional Chaining)

user?.address?.city;

const value \= input ?? "default";

### ES2022 (Private Fields)

class User \{  
 \#name \= "John";  
\}

## Interview Answer (30 seconds)

ECMAScript is the standard specification for JavaScript. The most significant release was ES6 in 2015, which introduced modern JavaScript features such as `let`, `const`, arrow functions, classes, modules, destructuring, spread operator, and promises. Later versions added async/await (ES2017), optional chaining and nullish coalescing (ES2020), private class fields (ES2022), and utility methods like `findLast()` and `groupBy()` in recent releases. Today, modern browsers support almost all ECMAScript features.

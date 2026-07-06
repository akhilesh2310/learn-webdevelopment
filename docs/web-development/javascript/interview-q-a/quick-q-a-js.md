---
title: Quick Q&A JS
sidebar_position: 2
---

# Quick Q&A JS

## 🟨 JavaScript Interview Preparation – Detailed Concepts, Questions & Answers

### 1. Language Fundamentals

**Q: What is the difference between `var`, `let`, and `const`?**

**A:**

* `var` is function-scoped and hoisted.

* `let` and `const` are block-scoped and also hoisted but not initialized (TDZ).

* `const` must be initialized and cannot be reassigned.

function test() \{  
  if (true) \{  
    var x \= 10;  
    let y \= 20;  
    const z \= 30;  
  \}  
  console.log(x); // 10  
  console.log(y); // ReferenceError  
\}

---

### 2. Execution Context & Scope

**Q: What is a closure in JavaScript?**

**A:** A closure is a function that remembers variables from its outer scope even after the outer function has returned.

function outer() \{  
  let count \= 0;  
  return function inner() \{  
    count++;  
    console.log(count);  
  \};  
\}  
const counter \= outer();  
counter(); // 1  
counter(); // 2

---

### 3. Functions

**Q: What is the difference between function declaration and expression?**

**A:** Declarations are hoisted, expressions are not.  
hoisted(); // Works

function hoisted() \{ console.log("Hoisted\!"); \}

notHoisted(); // Error  
const notHoisted \= function() \{ console.log("Not hoisted"); \}

---

### 4. Asynchronous JavaScript

**Q: How does the event loop work?**

**A:** JS uses a single-threaded event loop. Tasks are queued in the call stack and message queue. Promises use a microtask queue which is prioritized over the task queue.

console.log('Start');  
setTimeout(() \=\> console.log('Timeout'), 0);  
Promise.resolve().then(() \=\> console.log('Promise'));  
console.log('End');  
// Output: Start, End, Promise, Timeout

---

### 5. Object-Oriented JavaScript

**Q: How does prototypal inheritance work?**

**A:** Objects can inherit properties from another object via their prototype.

const animal \= \{  
  speak() \{ console.log('Animal speaks'); \}  
\};  
const dog \= Object.create(animal);  
dog.speak(); // Animal speaks

---

### 6. Data Structures

**Q: What are the differences between Map and Object?**

**A:**

* Maps can have any key type.

* Objects have string/symbol keys.

* Maps maintain insertion order.

let map \= new Map();  
map.set('1', 'one');  
map.set(2, 'two');  
console.log(map.get(2)); // 'two'

---

### 7. Error Handling

**Q: What is the difference between `throw` and `try/catch`?**

**A:**

* `throw` is used to raise an error.

* `try/catch` is used to handle errors.

try \{  
  throw new Error('Something went wrong');  
\} catch (e) \{  
  console.error(e.message);  
\}

---

### 8. Browser APIs

**Q: What is event delegation?**

**A:** It's attaching a single event listener to a parent instead of multiple children.

document.getElementById('parent').addEventListener('click', function(e) \{  
  if (e.target && e.target.matches('button')) \{  
    console.log('Button clicked:', e.target.textContent);  
  \}  
\});

---

### 9. ES6+ Features

**Q: What is the spread operator?**

**A:** It expands an array/object into individual elements.

const arr \= \[1, 2, 3\];  
const newArr \= \[...arr, 4\]; // \[1, 2, 3, 4\]

---

### 10. Miscellaneous

**Q: What is currying?**

**A:** Transforming a function with multiple arguments into a series of unary functions.

function multiply(a) \{  
  return function(b) \{  
    return a \* b;  
  \}  
\}  
const double \= multiply(2);  
console.log(double(5)); // 10

---

## 🟦 TypeScript Interview Preparation

TypeScript interview notes are maintained in the TypeScript section:

* [TypeScript Concepts](../../typescript/ts-concepts.md)
* [TypeScript Code](../../typescript/code.md)
* [TypeScript Interview Notes](../../typescript/interview-qa.md)

Keep this page focused on JavaScript quick revision.

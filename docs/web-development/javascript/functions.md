---
title: Functions
sidebar_position: 11
---

# Functions

[https://www.geeksforgeeks.org/different-ways-of-writing-functions-in-javascipt/](https://www.geeksforgeeks.org/different-ways-of-writing-functions-in-javascipt/)

## Function Types

* Function Declaration & Expression  
* Named Function Expression

### ❓ What are they?

JavaScript provides several ways to define and use functions. While they all execute blocks of code, they differ in how the JavaScript engine reads them, how they are hoisted, and how they handle scope.

#### 1. Function Declaration: A standard, named function written as a standalone statement.

```js
function greet() {   return "Hello!"; }
```

**Hoisting:** Fully hoisted. You can call this function *before* it appears in your code file.

#### 2. Function Expression: A function that is created and assigned to a variable.

```js
const greet = function() {   return "Hello!"; };
```

**Hoisting:** Not hoisted as a function. It follows variable hoisting rules (let/const are in the TDZ; var will be undefined).

**Q: What is the difference between function declaration and expression?**

**A:** Declarations are hoisted, expressions are not.  
hoisted(); // Works

function hoisted() \{ console.log("Hoisted\!"); \}

notHoisted(); // Error  
const notHoisted \= function() \{ console.log("Not hoisted"); \}

#### 3. Named Function Expression (NFE): A function expression that has its own internal name & assigned to a variable.

```js
const factory = function computeTotal(price) {   // 'computeTotal' is ONLY available inside this function block   return price * 1.1; };
```

**Why use it:** It is incredibly helpful for debugging because the function name shows up clearly in stack traces, and it allows the function to safely reference itself recursively.

## Arrow Functions

### ❓ What are they?

Introduced in ES6, arrow functions provide a shorter syntax for writing functions. Crucially, they do not have their own internal context features (no **this**).

#### 🛠️ Syntax Examples

```js
// Single parameter, single expression return (implicit return) const double = x => x * 2; // Multiple parameters, block body (requires explicit return) const add = (a, b) => {   return a + b; };
```

## ⚖️ Regular Functions vs. Arrow Functions (The Interview Goldmine)

This is one of the most common interview topics. Arrow functions are not just a cleaner syntax; they behave fundamentally differently under the hood.

| Feature | Regular Function (function) | Arrow Function (=\>) |
| :---- | :---- | :---- |
| **this Binding** | **Dynamic:** Defined by *how* the function is called at runtime. | **Lexical:** Inherits this from its parent enclosing scope. |
| **arguments Object** | Has access to a local arguments array-like object. | Does not have an arguments object. |
| **Constructor Usage** | Can be called with new to build instances. | Cannot be called with new (throws error). |
| **Prototype Property** | Has a .prototype property automatically. | Does not have a .prototype property. |

## The Difference Between Regular Functions and Arrow Functions:

Arrow function is introduced in ES6

1. **Shorten the syntax:**

// Regular Function Syntax ES5:  
var add \= function(x, y) \{  
  return x \+ y;  
\};  
// Arrow function ES6  
let add \= (x, y) \=\> \{ return x \+ y \};

Curly brackets are not required if only one expression is present.  
let add \= (x, y) \=\> x \+ y;

If there’s only one argument, then the parentheses are not required either:  
let squareNum \= x \=\> x \* x;

2. **Arrow functions do not have arguments binding:**

// Object with Regular function.  
let getData \= \{  
// Regular function  
    showArg:function()\{  
      console.log(arguments);  
    \}    
\}  
getData.showArg(1,2,3); // output \{0:1,1:2,2:3\}

// Object with Arrow function.  
let getData \= \{  
// Arrow function  
    showArg:()=\>console.log(arguments)  
\}  
getData.showArg(1,2,3); // Uncaught ReferenceError: arguments is not defined

But if you want to pass the arguments to arrow function you can use rest parameters feature like:

let exampleFunction \= \{  
 printArguments : (…args) \=\> \{  
 console.log(…args);  
 \}  
\}  
exampleFunction.printArguments(1,2,3); // Output:  1 2 3

3. **Unlike Regular functions, arrow function does not have their own "this" keyword:**

The value of this inside an arrow function remains the same throughout the lifecycle of the function and is always bound to the value of this in the closest non-arrow parent function.

let name \=\{  
  fullName:'Akhilesh Bamhore',  
  printInRegular: function()\{  
    console.log(\`My Name is $\{this.fullName\}\`); // 'this' binding works here  
  \},  
  printInArrow:()=\>console.log(\`My Name is $\{this.fullName\}\`) // no 'this' binding here  
\}

name.printInRegular(); My Name is Akhilesh Bamhore  
name.printInArrow(); /// My Name is undefined

In arrow function this will refer to global level variable for example:

var variable \= “Global Level Variable”;  
let myObject \= \{   
 variable: “Object Level Variable”,   
arrowFunction:() \=\> \{   
 console.log(this.variable);   
 \},  
regularFunction()\{   
 console.log(this.variable);   
 \}   
\};  
myObject.arrowFunction();  // Global Level Variable  
myObject.regularFunction(); // Object Level Variable

4. **Constructors / “new” keyword:**

we can easily construct objects with regular functions. We just need to invoke the function with the new keyword.  
let add \= function(x, y) \{  
	console.log(x+y);  
\};  
new add(2, 3); // Output: 5

Arrow functions can not use new keyword because arrow functions do not have constructor.  
let add \= (x, y) \=\> console.log(x \+ y);  
new add(2,3); // Uncaught TypeError: add is not a constructor at :2:1

5. **No duplicate named parameters**

Arrow functions can never have duplicate named parameters, whether in strict or non-strict mode.

However, We can use duplicate named parameters for regular function in non-strict mode.

Note: It is recommended to use regular functions when dealing with Promises, Callback functions with dynamic context, and Object methods.

### 🧠 Functional Programming Concepts

Let’s break down these five core Functional Programming concepts with deep architectural details, production use cases, custom implementations, and common interview engineering challenges.

#### 1. First-Class Functions

This simply means that in JavaScript, functions are treated like any other variable. You can pass them as arguments to other functions, return them from functions, and assign them to properties on objects.

#### 2. Higher-Order Functions (HOF)

A function that takes one or more functions as arguments, or returns a function as its output.

#### ❓ What is it?

A Higher-Order Function is a function that does at least one of the following:

* Takes one or more functions as arguments.  
* Returns a new function as its output.

**Built in Examples:** Built-in array methods like .map(), .filter(), and .reduce().

```js
// HOF Example function operation(fn, value) {   return fn(value); // Executes the function passed in } const square = n => n * n; operation(square, 5); // 25
```

#### 💡 Why & Where to use it?

HOFs are used to isolate **reusable logic behavior** from actual data processing. Instead of writing separate loops for every specific action, you write one generic iteration engine and pass the action logic into it.

* **Production Use Case:** Building an analytics event tracking system, creating authentication wrappers, or building custom logging middleware.

#### 🛠️ How to build a custom one (Polyfill)

Interviewers frequently ask candidates to write custom versions of native array HOFs to test their understanding of callbacks, `thisArg`, sparse arrays, and return behavior.

The canonical polyfill implementations are maintained in [JavaScript Coding Questions](./javascript-coding-questions.md).

#### ⚠️ Engineering Challenges & Pitfalls

* **Performance Overhead:** If you chain multiple array HOFs sequentially (`.map().filter().reduce()`), JavaScript iterates through your array multiple times. For massive datasets (e.g., 100,000+ items), this can trigger performance bottlenecks and high memory usage.  
* **The Solution:** Use a single `.reduce()` step or turn to **Transducers** to combine your operations into a single iteration pass.

#### 3. Callback Functions

#### ❓ What is it?

A callback is a function passed as an argument to another function, which is executed later once an action or event completes.

```js
// The arrow function inside is the callback setTimeout(() => {   console.log("Timer finished!"); }, 1000);
```

#### ⏱️ When & Where to use it?

* **Asynchronous Operations:** Handling network API updates, responding to file system reads, or triggering setTimeout timers.  
* **Event Handlers:** Listening for user interactions in UI layouts (e.g., clicking buttons, typing in text boxes).

#### ⚠️ The Engineering Challenge: Callback Hell

Before Promises and `async/await` were added to the language, developers nested multiple callbacks deeply inside one another to handle sequential asynchronous tasks. This created unreadable, fragile code patterns colloquially known as **Callback Hell** or the **Pyramid of Doom**.

```js
// THE PITFALL: Callback Hell Example getUserData(userId, (user) => {   getPermissions(user.role, (permissions) => {     getFeatureFlags(permissions, (flags) => {       renderDashboard(flags, () => {         console.log("Dashboard Loaded!");       });     });   }); });
```

#### 🛠️ How to fix it (Promisification)

To fix callback hell in older codebases, you can wrap callback-based functions inside a modern Promise structure. This allows you to flatten out your async operations into clean, sequential syntax steps.

```js
// Wrapping a callback-based utility into a Promise const fetchPermissionsPromise = (role) => {   return new Promise((resolve, reject) => {     getPermissions(role, (err, permissions) => {       if (err) reject(err);       else resolve(permissions);     });   }); }; // Usage with async/await async function loadDashboard(userId) {   try {     const user = await getUserDataPromise(userId);     const permissions = await fetchPermissionsPromise(user.role);     const flags = await getFeatureFlagsPromise(permissions);     renderDashboard(flags);   } catch (error) {     console.error("Dashboard failed to initialize:", error);   } }
```

#### 4. Immediately Invoked Function Expressions (IIFE)

A function that runs immediately as soon as the browser compiles it.

#### ❓ What is it?

An IIFE is a function that is defined and executed immediately upon creation. It utilizes a pair of grouping parentheses `()` to transform a regular function definition into an expression, followed by an invocation operator `()`.

```js
(function() {   let privateState = "Secure";   console.log("IIFE fired!"); })();
```

* **Why use it:** It creates an isolated, local temporary scope to prevent polluting the global window object.

#### 💡 Why & Where to use it?

* **Encapsulation:** It isolates all internal variables from the outside world, creating a private scope environment.  
* **Legacy Module Patterns:** Before standard JavaScript Modules (`import`/`export`) were introduced, IIFEs were the primary pattern used to prevent variables from accidentally leaking into the global `window` object.

#### 🛠️ How to build a custom one (The Module Pattern)

You can use an IIFE to build a secure state container. It hides internal variables from the outside world while exposing select control functions to the rest of your app.

```js
const counterModule = (function() {   // Private variable locked inside the IIFE scope   let count = 0;    return {     increment() {       count++;       return count;     },     decrement() {       count--;       return count;     },     getCount() {       return count;     }   }; })(); // Usage: console.log(counterModule.increment()); // 1 console.log(counterModule.increment()); // 2 console.log(counterModule.count);       // undefined (Cannot access private state directly!)
```

#### 5. Pure Functions

#### ❓ What is it?

A function is considered pure if it satisfies two strict rules:

1. **Same Input \= Same Output:** It always returns the exact same output given the exact same input arguments. It cannot depend on hidden or mutable external state values.  
2. **Zero Side Effects:** It produces **zero side effects** (it does not modify outside variables, modify global state, read from network APIs, or print logs).

```js
// Pure Function const add = (a, b) => a + b; // Impure Function (Modifies external state) let total = 0; const addToTotal = (num) => total += num;
```

#### 💡 Why use it?

Pure functions make your code predictable, easy to test, and safe from unexpected state bugs. Because they depend entirely on their inputs, you can run them repeatedly without worrying about breaking unrelated parts of your app.

```js
// ❌ IMPURE FUNCTION: Modifies external variables and yields unpredictable results let discountPercent = 10; const calculatePriceImpure = (price) => {   return price - (price * (discountPercent / 100)); }; // ✅ PURE FUNCTION: Self-contained, safe, and entirely predictable const calculatePricePure = (price, discount) => {   return price - (price * (discount / 100)); };
```

#### ⚠️ Engineering Challenges: What counts as a Side Effect?

In real-world applications, you cannot build software using *only* pure functions. Your app needs to interact with the outside world to be useful. Common necessary side effects include:

* Making network API requests (`fetch`).  
* Directly modifying the browser DOM.  
* Writing logs via `console.log`.  
* Reading or writing to `localStorage`.  
* Generating random numbers (`Math.random()`) or reading the system time (`new Date()`).

#### 🚀 The Architectural Solution

As a senior frontend engineer, your goal is to practice **Isolation of Impurity**. Keep your core business logic, calculations, and data transformations inside clean, pure functions. Then, push all necessary side effects out to the edges of your app architecture, such as inside API layers or dedicated React `useEffect` hooks.

#### 6. Function Composition

The practice of passing the output of one function as the input argument to another function, chaining them together to perform a multi-step calculation.

```js
const multiplyByTwo = x => x * 2; const addThree = x => x + 3; // Composing them manually const result = multiplyByTwo(addThree(5)); // (5 + 3) * 2 = 16
```

#### 💡 Why & Where to use it?

Instead of building giant monolithic functions that try to do everything at once, composition lets you write small, highly focused utilities that can be mixed and matched across your codebase.

**Production Use Case:** Building text sanitization engines, handling complex form validation checks, or applying formatting rules to e-commerce prices.

#### 🛠️ How to build a custom Composition Engine

By default, standard mathematical composition runs from **right to left**. Let's build a clean, custom `compose` utility using `Array.prototype.reduceRight`:

```js
// Custom Right-to-Left Composition Engine const compose = (...functions) => (initialValue) => {   return functions.reduceRight((currentValue, currentFunction) => {     return currentFunction(currentValue);   }, initialValue); }; // Individual, single-purpose formatting utilities const trimText = str => str.trim(); const capitalize = str => str.toUpperCase(); const addExclamation = str => `${str}!!!`; // Compose them into a single validation pipeline const prepareAlertMessage = compose(addExclamation, capitalize, trimText); // Execution order: trimText -> capitalize -> addExclamation console.log(prepareAlertMessage("   hello frontend engineer   "));  // Output: "HELLO FRONTEND ENGINEER!!!"
```

#### 🚀 Bonus: What is Piping?

Because reading composition logic from right to left can sometimes feel counterintuitive, developers often use a **Pipe** utility instead. A pipe functions exactly like composition, but runs in the natural human reading direction: **left to right**.

```js
// Custom Left-to-Right Piping Engine const pipe = (...functions) => (initialValue) => {   return functions.reduce((currentValue, currentFunction) => {     return currentFunction(currentValue);   }, initialValue); }; const processWorkflow = pipe(trimText, capitalize, addExclamation); console.log(processWorkflow("   hello frontend engineer   ")); // Output: "HELLO FRONTEND ENGINEER!!!"
```

---
title: this keyword
sidebar_position: 12
---

# this keyword

## **🎯 The `this` Keyword Master Study Guide**

## Understanding this keyword in JavaScript?

1. In an Object method, this keyword refers to the object.  
2. In a global function, this refers to the window object.  
3. Call and Apply functions can refer to any this object.  
4. Use strict in function then this is undefined  
5. Create new object of constructor function than this refers to the newly created object.

[https://www.w3schools.com/js/js\_this.asp](https://www.w3schools.com/js/js_this.asp)

**Understanding New keyword:**  
[https://hackernoon.com/understanding-javascript-new-keyword-ec67c8caaa74](https://hackernoon.com/understanding-javascript-new-keyword-ec67c8caaa74)

### **❓ What is it?**

The `this` keyword is a dynamic pointer reference variable. It does **not** point to the function itself, nor does it point to the function's local variable scope. Its value is determined entirely by the **execution invocation pattern** (how and where the function was fired at runtime), not where it was written in your source code.

## **🏗️ The 4 Rules of `this` Determination**

### **1\. Default Binding (Standalone Invocation)**

When you call a standard function completely on its own, `this` defaults to the global environment container.

* **Browser Environment:** `this` points to the `window` object.  
* **Strict Mode (`"use strict"`):** `this` automatically evaluates to `undefined`.

| function show() \{   console.log(this); \} show(); // window (or undefined in strict mode) |
| :---- |

### **2\. Implicit Binding (Method Call / Object Context)**

When a function is executed as a method inside an object, `this` points directly to the object standing immediately to the left of the invocation dot `.`.

| const manager \= \{   name: "John",   logName() \{      console.log(this.name);    \} \}; manager.logName(); // "John" ('this' points to the 'manager' object) |
| :---- |

### **3\. Explicit Binding (`call`, `apply`, `bind`)**

If you want to manually force a function to use a specific object as its `this` context, you can bypass the default engine rules using three native JavaScript utilities:

* **`call(context, arg1, arg2...)`:** Executes the function immediately, forcing it to use the passed context. Arguments are passed individually.  
* **`apply(context, [argsArray])`:** Executes the function immediately, exactly like `call()`, but requires all arguments to be grouped inside a single array wrapper.  
* **`bind(context)`:** Does not run the function immediately. Instead, it returns a **brand-new function copy** with its `this` context permanently locked to your target object.

| function displayInfo(city, country) \{   console.log(\`$\{this.name\} from $\{city\}, $\{country\}\`); \} const personInstance \= \{ name: "Rohan" \}; // Immediate Execution Examples displayInfo.call(personInstance, "Mumbai", "India"); displayInfo.apply(personInstance, \["Mumbai", "India"\]); // Deferred Execution Example const permanentLog \= displayInfo.bind(personInstance, "Tokyo", "Japan"); permanentLog(); // Outputs: "Rohan from Tokyo, Japan" |
| :---- |

### **4\. `new` Binding (Constructor Context)**

When a standard function is invoked using the `new` keyword, the engine fabricates a blank object behind the scenes, hooks up its prototype links, and binds the `this` keyword to point directly to that new object instance.

| function Car(model) \{   this.model \= model; // 'this' points to the newly built instance object \} const myCar \= new Car("Tesla");  console.log(myCar.model); // "Tesla" |
| :---- |

## **🏹 Arrow Function Context (Lexical Binding)**

Arrow functions (`=>`) do **not** possess their own `this` context. They treat `this` exactly like a regular variable—looking outward to inherit it lexically from the parent execution scope block that physically surrounds them.

| const userProfile \= \{   name: "Sania",   greet: () \=\> \{     // Arrow function looks outward to global scope layout to resolve 'this'     console.log(this.name);    \} \}; userProfile.greet(); // undefined (points to global window object) |
| :---- |

## **⚠️ High-Frequency Interview Puzzles & Pitfalls**

### **Puzzle 1: The Implicit Binding Loss Trap**

**Question:** What does this code print out? Explain why the reference drops.

| const profile \= \{   username: "Dev123",   display() \{     console.log(this.username);   \} \}; const extractDisplay \= profile.display; extractDisplay(); |
| :---- |

**Answer:** It prints `undefined` (or throws an error in strict mode).

* **The Catch:** Look closely at the final execution line. The function is fired as a plain standalone call: `extractDisplay()`. There is no dot `.` context attached to the execution step anymore. Because of this, it drops its implicit binding and falls back to **Default Binding**, where `this` refers to the global object, which lacks a `username` property.

### **Puzzle 2: `this` Inside Callback Methods**

**Question:** What is the output of this loop callback code, and how do you resolve the breakdown using modern engineering practices?

| const group \= \{   title: "Frontend Team",   members: \["Alice", "Bob"\],   showMembers() \{     this.members.forEach(function(member) \{       console.log(\`$\{member\} is in $\{this.title\}\`);     \});   \} \}; group.showMembers(); |
| :---- |

**Answer:** Logs `"Alice is in undefined"` and `"Bob is in undefined"`.

* **The Catch:** The callback wrapper inside `.forEach()` is a standard, regular function declaration. It is passed off to be executed deep inside the internal array engine loop as a plain standalone function call. Therefore, its internal `this` reference drops back to the global context instead of remaining locked onto your `group` object.

#### **🛠️ The Arrow Function Fix**

Because arrow functions do not create their own `this` context, they look outward to capture it. Replacing the regular function with an arrow function forces it to safely capture the `this` from the surrounding `showMembers()` method context, which points directly to the `group` object.

| const group \= \{   title: "Frontend Team",   members: \["Alice", "Bob"\],   showMembers() \{     // Arrow function captures 'this' lexically from showMembers method context     this.members.forEach((member) \=\> \{       console.log(\`$\{member\} is in $\{this.title\}\`); // Works perfectly\!     \});   \} \}; group.showMembers();  // Output:  // "Alice is in Frontend Team" // "Bob is in Frontend Team" |
| :---- |

In a Service Worker, the this keyword refers to the **ServiceWorkerGlobalScope**. This is the global execution context of the service worker, which is completely separate from the main browser window's window object.

The Best Practice: self over this

While this evaluates to the global scope when used in the top-level script or standard function expressions, you should **always use self instead of this** in your service worker code.

* **Consistency**: self will always refer to the ServiceWorkerGlobalScope regardless of the execution context.  
* **Arrow Functions**: Inside arrow functions, this retains the value of the enclosing lexical context. It will not point to the global worker scope. self bypasses this limitation.  
* **Readability**: Using self explicitly signals to anyone reading the code that it is running inside a Worker environment.

Comparison Table

| Context | this Behavior | self Behavior |
| ----- | ----- | ----- |
| **Top-level code** | ServiceWorkerGlobalScope | ServiceWorkerGlobalScope |
| **Standard Functions (function() \{\})** | ServiceWorkerGlobalScope (Non-strict) / undefined (Strict) | ServiceWorkerGlobalScope |
| **Arrow Functions (() \=\> \{\})** | Lexical context (Inherited from parent) | ServiceWorkerGlobalScope |
| **Event Listeners** | The target object of the event | ServiceWorkerGlobalScope |

Code Examples

**❌ Why this can fail (Arrow Functions)**

// This will throw an error or fail silently  
self.addEventListener('install', (event) \=\> \{  
  // 'this' is undefined or lexically scoped, NOT the ServiceWorkerGlobalScope\!  
  this.skipWaiting();   
\});

**The Correct Approach using self**

// Safe, predictable, and recommended  
self.addEventListener('install', (event) \=\> \{  
  // self correctly references ServiceWorkerGlobalScope  
  self.skipWaiting();   
\});

self.addEventListener('fetch', (event) \=\> \{  
  console.log('Intercepting request for:', event.request.url);  
\});

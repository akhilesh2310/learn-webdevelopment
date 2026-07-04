---
title: call, bind, apply
sidebar_position: 13
---

# call, bind, apply

### **Explicit Binding Utilities: call(), apply(), and bind()**

### **❓ What are they?**

In JavaScript, call(), apply(), and bind() are native methods attached to all JavaScript functions via Function.prototype. They allow you to manually dictate and inject a specific object context as the value of the this keyword inside a function, overriding the engine's default dynamic runtime rules.

### **💡 Why do we use them?**

1. **Context Hijacking / Reusability:** They allow you to borrow methods from one object and run them against a completely different object without rewriting code.  
2. **Decoupling Logic:** They allow you to keep functions clean and separate from specific data structures, binding them only when required.  
3. **Fixing Asynchronous Pitfalls:** They let you lock the execution context of a method before passing it off as a callback (e.g., inside timers, event listeners, or array utilities).

### **🛠️ The Core Breakdown: How They Work**

#### **1\. call()**

Invokes the target function **immediately**. It accepts the desired this context as the first argument, followed by any function parameters passed **individually (comma-separated)**.

* **Syntax:** func.call(context, arg1, arg2, ...)

| function greet(greeting, punctuation) \{   console.log(\`$\{greeting\}, I am $\{this.name\}$\{punctuation\}\`); \} const user \= \{ name: "Amit" \}; // Executes immediately greet.call(user, "Hello", "\!"); // "Hello, I am Amit\!" |
| :---- |

#### **2\. apply()**

Invokes the target function **immediately**. It works identically to call(), but instead of individual arguments, it accepts all function parameters packed inside a **single array wrapper**.

* **Syntax:** func.apply(context, \[arg1, arg2, ...\])

| // Uses the same function and object from above greet.apply(user, \["Hi", "."\]); // "Hi, I am Amit." 💡 Memory Trick to distinguish call vs apply: Call \= Comma-separated arguments. Apply \= Array of arguments. |
| :---- |

#### **3\. bind()**

Does **not** execute the function immediately. Instead, it generates and returns a **brand-new copy of the original function** with its this value permanently locked to the object context you specified. Any arguments passed to bind() are pinned as default parameters.

* **Syntax:** const boundFunc \= func.bind(context, arg1, arg2)

| const userProfile \= \{   name: "Sania",   logActivity(activity) \{     console.log(\`$\{this.name\} performed: $\{activity\}\`);   \} \}; // Returns a new function instance, does not execute yet const preLockedLog \= userProfile.logActivity.bind(userProfile); // Fired later in the codebase preLockedLog("Code Review"); // "Sania performed: Code Review" |
| :---- |

### **⚖️ Side-by-Side Comparison Matrix**

| Feature | call() | apply() | bind() |
| :---- | :---- | :---- | :---- |
| **Execution** | Immediate | Immediate | Deferred (Returns a new function) |
| **Argument Passing** | Individual arguments | Grouped Array | Individual arguments |
| **Primary Use Case** | Method borrowing with known explicit parameters. | Math utilities / Variadic functions passing raw arrays. | Asynchronous callbacks, event handlers, and React class layouts. |

### 

### **🚀 Production Use Cases & Real-World Examples**

#### 

#### **Use Case 1: Method Borrowing (Saving Memory)**

Imagine building an e-commerce platform where you have distinct user entities, but you want to validate them without copying validation code onto every single object.

| const validator \= \{   validateEmail() \{     const emailRegex \= /^\[^\\s@\]+@\[^\\s@\]+\\.\[^\\s@\]+$/;     return emailRegex.test(this.email);   \} \}; const leadUser \= \{ email: "lead@production.com" \}; const legacyCustomer \= \{ email: "invalid-email-string" \}; // Borrowing the validator method for separate raw data objects const isLeadValid \= validator.validateEmail.call(leadUser); const isCustomerValid \= validator.validateEmail.call(legacyCustomer); console.log(isLeadValid);     // true console.log(isCustomerValid); // false |
| :---- |

#### **Use Case 2: Using apply() with Variadic Functions (Math Calculations)**

Some native utility methods (like Math.max) accept individual numbers but cannot read a raw data array directly. While modern code often uses the spread operator (...), apply() remains a classic production interview test pattern.

| const salaryList \= \[4500, 9200, 3100, 12000, 8500\]; // Pass null/undefined as context because Math.max doesn't care about a 'this' object const topSalary \= Math.max.apply(null, salaryList);  console.log(topSalary); // 12000 |
| :---- |

#### **Use Case 3: Preserving Context in Asynchronous Callbacks (bind)**

When passing an object method as an event handler or timer callback, the context is stripped by default. bind() guarantees the function maintains its structural environment.

| const digitalClock \= \{   time: "12:00 PM",   render() \{     console.log(\`The current time is $\{this.time\}\`);   \},   start() \{     // ❌ THE TRAP: 'this.render' drops context inside setTimeout     // setTimeout(this.render, 1000); // Logs: "The current time is undefined"     // ✅ THE FIX: Permanently lock context to digitalClock before passing it     setTimeout(this.render.bind(this), 1000);   \} \}; digitalClock.start(); |
| :---- |

### **⚠️ High-Frequency Interview Corner Cases & Puzzles**

#### 

#### **Puzzle 1: Function Borrowing on Objects with Existing Keys**

**Question:** What happens if the object you pass into call() already has a property or method with the same name as the borrowed function?

| const device \= \{   brand: "Apple",   getBrand() \{ return "Local Device: " \+ this.brand; \} \}; function getBrand() \{   return this.brand; \} console.log(getBrand.call(device)); |
| :---- |

**Answer:** It prints "Apple".

* **Reasoning:** Calling getBrand.call(device) executes the *global standalone* function, manually pointing its internal this keyword to the device object space. It completely ignores the fact that device contains its own internal method named getBrand.

#### **Puzzle 2: Chained bind() Invocations**

**Question:** Can you re-bind a function that has already been bound? What does this code print?

| function display() \{   console.log(this.name); \} const obj1 \= \{ name: "Context One" \}; const obj2 \= \{ name: "Context Two" \}; const bound1 \= display.bind(obj1); const bound2 \= bound1.bind(obj2); bound2(); |
| :---- |

**Answer:** It prints "Context One".

* **The Rules:** In JavaScript, **bind() is permanent**. Once a function copy has been wrapped by an initial bind() statement, its this keyword is sealed forever. Subsequent attempts to re-bind or override it via bound1.bind(obj2) or even .call() / .apply() will fail silently; they cannot unlock the initial wrapper.

#### **Puzzle 3: Passing Primitives as Context (Boxing)**

**Question:** What happens under the hood if you pass a primitive value (like a string, number, or boolean) as the first context argument into call() or apply()?

| function testBoxing() \{   console.log(typeof this); \} testBoxing.call("Hello World"); |
| :---- |

**Answer:** It logs "object" (unless running in strict mode).

* **Reasoning:** In standard (non-strict) mode, JavaScript automatically performs an internal optimization check called **Boxing**. If you pass a primitive value as the context target, the engine wraps it in its corresponding object constructor variant (e.g., "Hello World" becomes a new String("Hello World") object shell).  
* **Strict Mode Behavior:** If you place "use strict"; at the top of the file, boxing is entirely disabled, and it will accurately print "string".

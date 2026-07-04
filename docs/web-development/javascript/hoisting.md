---
title: Hoisting
sidebar_position: 7
---

# Hoisting

# **Hoisting and Temporal Dead Zone**

Hoisting is a JavaScript mechanism where variable, function, class, or import declarations are registered in memory during the compile phase before the code actually executes

The key idea is:

`var`, `let`, `const`, and functions are all hoisted, but they behave differently because they are initialized differently.

## **1\. Variable Hoisting: `var` vs `let` / `const`**

### **`Var:`** `var` declarations are hoisted and initialized with `undefined`.

| console.log(name); // undefined var name \= "Akhilesh"; |
| :---- |

JavaScript roughly prepares it like this:

| var name; // initialized as undefined console.log(name); name \= "Akhilesh"; |
| :---- |

So accessing a `var` variable before its declaration does not throw an error. It returns `undefined`.

### **`let` and `const:`** `let` and `const` are also hoisted, but they are not initialized immediately.

| console.log(data); // ReferenceError let data \= "Production Ready Data"; |
| :---- |

The variable exists in the scope, but JavaScript does not allow access before the declaration line is executed. This period is called the **Temporal Dead Zone (TDZ)**.

| \{   // TDZ starts for data   console.log(data); // ReferenceError   let data \= "Production Ready Data"; // TDZ ends here \} |
| :---- |

Important point: `let` and `const` are hoisted, but they stay unusable until their declaration line is executed.

## **2\. Function Hoisting**

### **Function declarations:** are fully hoisted.

That means both the function name and function body are available during the creation phase.

| sayHello(); // Hello function sayHello() \{   console.log("Hello"); \} |
| :---- |

This works because JavaScript stores the full function before the execution phase starts.

### **Function expressions and arrow functions:** are not fully hoisted like function declarations.

They follow the hoisting behavior of the variable they are assigned to.

| greet(); // TypeError: greet is not a function var greet \= function () \{   console.log("Hi"); \}; |
| :---- |

Here, `greet` is hoisted as `undefined`. So calling it before assignment means JavaScript is trying to call `undefined` as a function.

With `let` or `const`, the error is different:

| greet(); // ReferenceError: Cannot access 'greet' before initialization const greet \= () \=\> \{   console.log("Hi"); \};  |
| :---- |

Here, `greet` is in the Temporal Dead Zone.

## **3\. Quick Comparison**

| Declaration Type | Hoisted? | Initialized Before Execution? | Access Before Declaration |
| :---- | :---- | :---- | :---- |
| `var` | Yes | Yes, as `undefined` | `undefined` |
| `let` | Yes | No | `ReferenceError` |
| `const` | Yes | No | `ReferenceError` |
| Function declaration | Yes | Yes, full function | Works |
| Function expression with `var` | Variable is hoisted | `undefined` | `TypeError` if called |
| Function expression with `let` / `const` | Variable is hoisted | No | `ReferenceError` |

# **Interview Puzzles and Output Questions**

## **Puzzle 1: Function vs Variable Hoisting Collision**

### **Question:** What prints, and why?

| var testingHoisting \= 10; function testingHoisting() \{   console.log("Executed Function"); \} console.log(typeof testingHoisting);  |
| :---- |

### **Answer** It prints: `number`

### **Why?**

During the creation phase, the function declaration `testingHoisting` is hoisted first and stores the full function in memory.

Then JavaScript sees: `var testingHoisting;` Since the identifier already exists, JavaScript does not overwrite the function with `undefined`. During the execution phase, this line runs: `testingHoisting = 10;` Now the function reference is replaced by the number `10`.

So: `console.log(typeof testingHoisting);` prints: `number`

### **Key takeaway:** Function declarations can win during the creation phase, but runtime assignment can still overwrite them.

## **Puzzle 2: The Loop Scoping Trap**

| for (var i \= 0; i \< 3; i++) \{   setTimeout(() \=\> \{     console.log(i);   \}, 100); \} |
| :---- |

### **Answer :** It prints: `3  3  3`

### **Why?** `var` is function-scoped, not block-scoped. So there is only one shared `i` variable for the entire loop. By the time the `setTimeout` callbacks run, the loop has already finished and the shared `i` has become `3`.

### **Modern fix: use `let`**

| for (let i \= 0; i \< 3; i++) \{   setTimeout(() \=\> \{     console.log(i);   \}, 100); \} |
| :---- |

Output: `0 1 2`, With `let`, JavaScript creates a new block-scoped `i` for each loop iteration.

### **Legacy fix: use IIFE**

If you cannot use `let`, you can create a new function scope using an IIFE.

| for (var i \= 0; i \< 3; i++) \{   (function (capturedI) \{     setTimeout(() \=\> \{       console.log(capturedI);     \}, 100);   \})(i); \} |
| :---- |

Output: `0 1 2`, Here, each iteration passes the current value of `i` into a new function scope.

### **Key takeaway:** `var` creates one shared variable. `let` creates a fresh variable per loop iteration.

## **Puzzle 3: TDZ Execution Timing**

Does this throw an error?

| function processData() \{   console.log(payload); \} let payload \= \{ status: 200 \}; processData();  |
| :---- |

### **Answer:** No, it does not throw an error. It logs: `\{ status: 200 \}`

### **Why? :** TDZ is not only about where the code appears visually. It is about when the variable is accessed during execution.

Here, `processData` is defined before `payload`, but it is not called immediately. By the time this runs: processData(); the line below has already executed: `let payload = \{ status: 200 \};`

So the TDZ for `payload` has already ended.

### **Key takeaway:** TDZ depends on execution timing, not just code position.

## **Puzzle 4: Parameter Scope with Default Arguments**

| let x \= 1; function foo(x, y \= function () \{     x \= 2;     console.log(x);   \}) \{   var x \= 3;   y();   console.log(x); \} foo(5); console.log(x); |
| :---- |

### **Answer :** It prints: `2 3 1`

**Answer & Mechanics:** Prints `2`, `3`, `1`. This tests your absolute mastery of **Parameter Scoping** (ES6 default arguments).

1. When a function has default parameters, a **third intermediate scope environment** is created between the Parent Scope (Global) and the Function Body Scope.  
2. The parameters `x` and `y` sit in this intermediate Parameter Scope. `x` initializes to `5`.  
3. Inside the function body, `var x = 3` creates a *distinct local variable* `x` inside the body scope, shadow-masking the parameter `x`.  
4. When `y()` executes, its lexical scope chain traces back to where it was authored (the Parameter Scope). It modifies the parameter `x` to `2` and logs `2`.  
5. The inner function body `console.log(x)` looks at its own local scope, printing its distinct local value `3`.  
6. The global `x` on the outside was never touched, remaining `1`.

### **Answer & Mechanics**

### **Answer: It prints `2, 3, 1`.**

### This tests **parameter scope with default arguments**. When a function has default parameters, JavaScript can create a separate **Parameter Scope** between the outer scope and the function body scope.

### So we have three relevant scopes:

### Global Scope → Parameter Scope → Function Body Scope

### Step by step:

### `let x = 1;`

### This creates global `x = 1`.

### `foo(5);`

### When `foo` is called, the parameter `x` gets value `5`. The default parameter `y` is a function, and it **closes over the Parameter Scope**, not the function body scope.

### `y = function () \{`

###  `x = 2;`

###  `console.log(x);`

### `\};`

### Inside the function body:

### `var x = 3;`

### This creates a separate local `x` in the **Function Body Scope**, so it shadows the parameter `x`.

### When `y()` runs, it follows its **lexical scope chain** and updates the parameter-scope `x` from `5` to `2`.

### `y(); // logs 2`

### Then this line runs inside the function body:

### `console.log(x); // logs 3`

### It logs the body-scope `x`, not the parameter-scope `x`.

### Finally:

### `console.log(x); // logs 1`

### This logs the global `x`, which was never changed.

### **Key takeaway:** Default parameters can create a separate Parameter Scope. A function created inside a default parameter closes over that Parameter Scope, while `var x` inside the body belongs to the Function Body Scope.

# **Interview-Ready Answer**

Hoisting means JavaScript prepares declarations before executing the code. `var`, `let`, `const`, and functions are all hoisted, but they behave differently.

* `var` is hoisted and initialized with `undefined`.  
* `let` and `const` are hoisted but not initialized, which creates the **Temporal Dead Zone (TDZ)**.  
* Function declarations are fully hoisted with their body, so they can be called before declaration.  
* Function expressions and arrow functions follow the hoisting behavior of the variable they are assigned to.

The main interview trap is that `let` and `const` are **not non-hoisted**. They are hoisted, but they remain inaccessible until their declaration is executed.

---
title: JS Fundamentals
sidebar_position: 5
---

# JS Fundamentals

## Variables

**Variable Declarations:**  
[https://www.typescriptlang.org/docs/handbook/variable-declarations.html](https://www.typescriptlang.org/docs/handbook/variable-declarations.html)

**var vs let vs const**

In JavaScript, how you declare a variable determines its scope (where it can be used), whether it can be reassigned, and how it behaves during execution.

Think of `var` as the legacy, wild-west way of doing things, while `let` and `const` are the modern, well-behaved replacements.

## 1. `var` (The Legacy Way)

Before 2015, `var` was the only way to declare variables. It is function-scoped, meaning it only respects boundaries inside a function. If you create it inside an `if` statement or a `for` loop, it leaks out into the rest of the code.

* Reassignable? Yes.  
* Redeclarable? Yes (which can cause accidental bugs).  
* Scope: Function-scoped.

```js
function varExample() {   if (true) {     var greeting = "Hello from inside the if!";   }   // This works! 'greeting' leaked out of the if-block.   console.log(greeting);  } varExample();
```

## 2. `let` (The Modern Variable)

Introduced in ES6 (2015), `let` fixed the leaking issue of `var`. It is block-scoped, meaning it stays strictly inside the nearest set of curly braces `\{\}` (like `if` statements, loops, or functions).

* Reassignable? Yes.  
* Redeclarable? No (throws an error if you try in the same scope).  
* Scope: Block-scoped.

```js
let count = 1; count = 2; // Perfectly fine, we are reassigning it. if (true) {   let secret = "I am hidden";   console.log(secret); // Works here } // console.log(secret); // ❌ ReferenceError: secret is not defined
```

## 3. `const` (The Constant)

`const` stands for "constant." Like `let`, it is block-scoped. The main difference is that once you assign a value to a `const`, you cannot reassign it.

* Reassignable? No.  
* Redeclarable? No.  
* Scope: Block-scoped.

```js
const pi = 3.14159; // pi = 3; // ❌ TypeError: Assignment to constant variable. // The Object Catch: const user = { name: "Alice" }; user.name = "Bob"; //  This works! You can change the properties *inside* the object. // user = { name: "Charlie" }; // ❌ TypeError: You cannot reassign the variable itself.
```

## Key Differences Summary

| Feature | var | let | const |
| :---- | :---- | :---- | :---- |
| Scope | Function-scoped | Block-scoped \{\} | Block-scoped \{\} |
| Hoisting | Hoisted (initialized as undefined) | Hoisted (in Temporal Dead Zone) | Hoisted (in Temporal Dead Zone) |
| Reassignable | Yes | Yes | No |
| Redeclarable | Yes | No | No |

## The Modern Rule of Thumb

In modern JavaScript, you should completely abandon `var`. Instead, follow this workflow:

* Use `const` by default for everything.  
* Only switch to `let` if you know the value *must* change later (like a loop counter or a toggling state).

### Interviewer Follow-Up Questions to Watch Out For

This page keeps the variable declaration overview. The deeper interview puzzles are canonical in:

* [Hoisting](./hoisting.md) for hoisting, TDZ, function declarations, function expressions, and output puzzles.
* [Scope](./scope.md) for scope chain, lexical environments, variable shadowing, and scope lookup.

Q: Is `const` truly immutable in JavaScript?

* Answer: No, `const` creates an immutable *binding*, not an immutable *value*. You cannot reassign the variable to a new identifier, but if the value is an object or an array, you can still mutate its internal properties or elements. (If you want true immutability, mention `Object.freeze()`).

## Data Types

* Primitive types  
* Reference types  
* typeof operator  
* Primitive vs Reference Types

[https://www.w3schools.com/js/js\_datatypes.asp](https://www.w3schools.com/js/js_datatypes.asp)

### 📊 Data Types (Primitive vs. Reference Types)

### ❓ What are they?

JavaScript categorizes values into two main buckets: **Primitive types** and **Reference types**. The major difference is how they are stored in memory and how they behave when you pass them around.

* **Primitive Types:** Simple, raw data stored directly in the location that the variable accesses (on the **Stack memory**). They are immutable (cannot be changed).  
  * The 7 primitives are: `string`, `number`, `boolean`, `undefined`, `null`, `symbol`, and `bigint`.  
* **Reference Types:** Complex data structures that can hold collections of values. The actual data is stored on the **Heap** memory, and the variable only holds a pointer (reference) to that memory location.  
  * These are: `object`, `array`, `function`, `date`, etc. (Everything that is not a primitive is an object).

### 🛠️ The `typeof` Operator

The `typeof` operator tells you the data type of a value.

```js
console.log(typeof "Hello");     // "string" console.log(typeof 42);          // "number" console.log(typeof true);        // "boolean" console.log(typeof undefined);   // "undefined" console.log(typeof Symbol());    // "symbol" console.log(typeof 10n);         // "bigint" console.log(typeof { name: "A" });// "object" console.log(typeof [1, 2, 3]);   // "object" (Arrays are objects!) console.log(typeof function(){});// "function" (Special object type)
```

#### ⚠️ The Famous `typeof null` Bug

```js
console.log(typeof null); // "object"
```

**Why?** This is a famous bug from the very first version of JavaScript. In early JS, values were stored in 32-bit units, and the type for objects was represented by `000` bits. Since `null` was an empty pointer (all zeros), JS mistakenly read it as an object. It was never fixed because fixing it would break millions of older websites.

### 🔄 Type Conversion (Coercion)

* Implicit coercion  
* Explicit coercion

[https://www.w3schools.com/js/js\_type\_conversion.asp](https://www.w3schools.com/js/js_type_conversion.asp)

### ❓ What is it?

Type conversion is changing a value from one data type to another (e.g., changing a string `"42"` to a number `42`).

### 💡 Why does it exist?

JavaScript is a **dynamically typed** language. Variables can hold any type, and operations often need to convert data behind the scenes to make sense of what you are trying to do.

### 🛠️ How does it work?

#### 1. Explicit Coercion (Manual)

This is when **you** intentionally convert a type using built-in functions. It is clean and readable.

```js
let strValue = "123"; let numValue = Number(strValue); // Explicitly turns string into a number 123 let age = 30; let ageStr = String(age); // Explicitly turns number into a string "30"
```

#### 2. Implicit Coercion (Automatic)

This is when **JavaScript** converts types automatically behind your back. It usually happens when you apply operators to different types.

```js
// String Coercion: The '+' operator prefers strings if one side is a string console.log("5" + 2); // "52" (Number 2 is converted to "2" and glued together) // Number Coercion: Other operators (-, *, /) convert strings to numbers console.log("5" - 2); // 3 (String "5" becomes number 5) console.log("5" * "2"); // 10 (Both strings become numbers)
```

## ✅ Truthy & Falsy Values

When JavaScript expects a boolean value (like inside an `if` statement), it forces (coerces) that value to be either `true` or `false`.

#### The Falsy List

There are exactly **8 falsy values** in JavaScript. Any value on this list converts to `false`:

1. `false`  
2. `0` (Zero)  
3. `-0` (Negative Zero)  
4. `0n` (BigInt Zero)  
5. `""` (Empty string)  
6. `null`  
7. `undefined`  
8. `NaN` (Not a Number)

#### Truthy Values

**Everything else** is truthy. This includes surprising things like:

* `[]` (Empty array)  
* `\{\}` (Empty object)  
* `" "` (String with just a space)  
* `"false"` (The text "false" inside a string)

## Operators

* Arithmetic  
* Comparison  
* Logical  
* Bitwise

### 🎛️ Operators & 🛠️ How do they work?

#### 1. Arithmetic Operators

Used for math: `+`, `-`, `*`, `/`, `%` (Remainder), (Exponentiation/Power).

* **Gotcha:** `+` performs math *unless* one operand is a string, then it switches to combining strings.

#### 2. Comparison Operators

Used to check relationships between values.

* **Loose Equality (`==`):** Compares values for equality **after** implicitly converting their types to match.  
* **Strict Equality (`===`):** Compares both the **value** and the **type**. No conversion allowed.

```js
console.log(5 == "5");  // true  (JS converts string "5" to number 5) console.log(5 === "5"); // false (Types are different: number vs string)
```

#### 3. Logical Operators

Used for logic flow control: `&&` (AND), `||` (OR), `!` (NOT). In JavaScript, `&&` and `||` utilize **Short-Circuit Evaluation**:

* `||` returns the **first truthy value** it encounters, or the last value if all are falsy.  
* `&&` returns the **first falsy value** it encounters, or the last value if all are truthy.

```js
let name = "" || "Guest"; // "Guest" (Since "" is falsy, it moves to "Guest") let status = "Logged In" && "Dashboard"; // "Dashboard" (Both truthy, returns the last one)
```

#### 4. Bitwise Operators

Used to manipulate data at the binary level (zeros and ones): `&` (AND), `|` (OR), `^` (XOR), `~` (NOT), `<<` (Left Shift), `>>` (Right Shift).

* **Where to use it:** Rarely used in basic frontend web UI apps, but heavily used in performance-critical areas like processing graphics, cryptography, or managing game state flags.

## ⚠️ Common Interview Topics & Corner Cases

Expect these exact conceptual traps during technical screening rounds:

#### Puzzle 1: `undefined` vs `null`

* **`undefined`:** Means a variable has been declared, but has **not yet been assigned a value**. It represents an accidental or natural absence of a value.  
* **`null`:** Is an **intentional assignment**. You explicitly tell the engine: "This variable should be empty right now."

```js
let a;  console.log(a); // undefined (System default) let b = null; console.log(b); // null (Intentional) console.log(null == undefined);  // true  (Both mean an absence of value) console.log(null === undefined); // false (Different types)
```

#### Puzzle 2: `undefined` vs `not defined`

* **`undefined`:** The variable exists in memory, but holds no value.  
* **`not defined`:** The variable does not exist anywhere in the scope chain. It throws a crash error.

```js
let user; console.log(user); // undefined console.log(salary); // ReferenceError: salary is not defined
```

#### Puzzle 3: Call by Value vs Call by Reference

Interviewers will test how arguments are passed into functions. In JavaScript, **everything is technically pass-by-value**, but the value passed for an object is the *memory address pointer*.

##### Example A: Primitives (Call by Value)

When you pass a primitive, JS makes a **copy** of the original data. Modifying it inside the function does not affect the outside variable.

```js
function updateNumber(num) {   num = 100; } let score = 50; updateNumber(score); console.log(score); // 50 (Original value didn't change)
```

##### Example B: Objects (Call by Reference / Sharing)

When you pass an object, JS passes a copy of the **memory address pointer**. Both variables now point to the exact same space in heap memory.

```js
function updateProfile(obj) {   obj.age = 40; // Modifies the property at that memory address } let user = { name: "Bob", age: 25 }; updateProfile(user); console.log(user.age); // 40 (The outside object was changed!)
```

##### The Ultimate Trap Variant

What if you overwrite the whole object inside the function?

```js
function replaceProfile(obj) {   obj = { name: "Alice", age: 30 }; // Assigns obj to a BRAND NEW address pointer } let manager = { name: "Charlie", age: 50 }; replaceProfile(manager); console.log(manager.name); // "Charlie" (Stays the same!)
```

**Reason:** By using `obj = \{...\}`, you broke the link to the original memory address. You pointed the internal argument variable to a brand new object in memory, leaving the outside object untouched.

#### Puzzle 4: Coercion Quirks (The Classic Interview Test)

**Question:** Explain the output of the following logs:

```js
console.log([] == ![]);  console.log(true + false);  console.log("2" + 2 - 1);
```

**Answer & Mechanics:**

1. `[] == ![]` outputs `true`.  
   * **Why:** The `!` operator has high priority. It converts the right side `[]` (truthy) to `false`. The expression becomes `[] == false`. Next, the `==` operator forces both sides to numbers. An empty array becomes `0`, and `false` becomes `0`. Since `0 == 0`, it evaluates to `true`.  
2. `true + false` outputs `1`.  
   * **Why:** The mathematical `+` operator forces booleans to numbers. `true` becomes `1`, and `false` becomes `0`. `1 + 0 = 1`.  
3. `"2" + 2 - 1` outputs `21`.  
   * **Why:** Evaluated from left to right. First, `"2" + 2` runs. Because one side is a string, it glues them together to create the string `"22"`. Then, `"22" - 1` runs. The subtraction operator `-` forces strings to numbers, so it evaluates `22 - 1 = 21`.

---
title: JS Engine
sidebar_position: 2
---

# JS Engine

## **JavaScript Engine**

## **V8 Engine**

## **Parsing**

## **Abstract Syntax Tree (AST)**

## **JIT Compilation**

## **Hidden Classes**

## **Inline Caching**

## **Garbage Collector Internals**

# **JavaScript Engine & V8 Architecture**

---

# **1\. JavaScript Engine Overview**

## **What is a JavaScript Engine?**

A JavaScript Engine is a program that executes JavaScript code.

Modern JavaScript engines do **not** simply interpret code line by line.

Instead, they:

1. Parse the code  
2. Convert it into an internal representation  
3. Compile it into machine code  
4. Execute it efficiently

This process is called **Just-In-Time (JIT) Compilation**.

---

## **Popular JavaScript Engines**

| Browser/Runtime | Engine |
| :---- | :---- |
| Chrome | V8 |
| Node.js | V8 |
| Deno | V8 |
| Electron | V8 |
| Firefox | SpiderMonkey |
| Safari | JavaScriptCore |

---

# **What is V8?**

V8 is Google's high-performance JavaScript and WebAssembly engine written in C++.

Key Characteristics:

* Open Source  
* High Performance  
* Uses JIT Compilation  
* Powers Chrome and Node.js  
* Continuously optimized by Google

---

# **V8 Execution Pipeline**

JavaScript Source Code

         │

         ▼

      Parser

         │

         ▼

        AST

         │

         ▼

     Ignition

   (Interpreter)

         │

         ▼

      Bytecode

         │

         ▼

     Sparkplug

  (Fast Compiler)

         │

         ▼

     TurboFan

(Optimizing Compiler)

         │

         ▼

   Machine Code

---

## **Why Multiple Compilation Stages?**

Different code paths require different optimization levels.

### **Cold Code**

Code that executes rarely.

Example:

function helpScreen() \{

 // rarely executed

\}

No need for expensive optimization.

---

### **Warm Code**

Code that executes regularly.

Example:

handleButtonClick()

Sparkplug compiles it quickly.

---

### **Hot Code**

Code executed thousands of times.

Example:

for (let i \= 0; i \< 1000000; i++) \{

 calculate();

\}

TurboFan heavily optimizes it.

---

# **V8 Components**

---

## **1\. Parser**

Responsibilities:

* Reads source code  
* Validates syntax  
* Builds AST

Input:

const x \= 10;

Output:

AST

---

## **2\. Ignition (Interpreter)**

Responsibilities:

* Converts AST into Bytecode  
* Executes Bytecode  
* Collects runtime information

Important:

Ignition records:

* Types  
* Function usage frequency  
* Property access patterns

This information is called:

### **Type Feedback**

Example:

function add(a, b) \{

 return a \+ b;

\}

If called repeatedly with numbers:

add(1, 2);

add(5, 6);

add(10, 20);

Ignition records:

a \= Number

b \= Number

TurboFan later uses this information.

---

## **3\. Sparkplug**

Introduced to bridge the gap between:

Ignition

   ↓

TurboFan

Without Sparkplug:

* Startup was slower  
* Bytecode interpretation overhead remained

Sparkplug:

* Quickly converts bytecode into machine code  
* Does not perform expensive optimizations  
* Improves application responsiveness

Think of Sparkplug as:

Fast but not Smart

---

## **4\. TurboFan**

TurboFan is V8's optimizing compiler.

Responsibilities:

* Detect hot code  
* Use collected type feedback  
* Generate highly optimized machine code

Example:

function add(a, b) \{

 return a \+ b;

\}

If TurboFan sees:

add(1,2);

add(3,4);

add(5,6);

It assumes:

a → Number

b → Number

and generates optimized machine instructions.

---

## **5\. Deoptimization (Deopt)**

### **Why Deoptimization Exists**

JavaScript is dynamic.

Assumptions can become invalid.

Example:

function add(a, b) \{

 return a \+ b;

\}

add(1,2);

add(3,4);

TurboFan optimizes for:

Number \+ Number

Later:

add("1", "2");

Assumption breaks.

TurboFan:

1. Discards optimized code  
2. Falls back to Ignition  
3. Collects new feedback  
4. Re-optimizes if needed

---

# **Interview Callout**

**Question: How does V8 optimize JavaScript?**

Expected Answer:

1. Parser creates AST  
2. Ignition generates Bytecode  
3. Type feedback is collected  
4. Sparkplug creates fast machine code  
5. TurboFan optimizes hot paths  
6. Deoptimization occurs when assumptions become invalid

---

# **2\. Parsing & Abstract Syntax Tree (AST)**

---

## **What is Parsing?**

Parsing converts raw JavaScript text into a structure the engine can understand.

---

### **Phase 1: Lexical Analysis (Scanner)**

Input:

const x \= 10;

Output:

const

x

\=

10

;

These pieces are called:

### **Tokens**

---

### **Phase 2: Syntax Analysis (Parser)**

The parser checks whether the token sequence follows JavaScript grammar rules.

If valid:

Tokens

  ↓

AST

---

# **Abstract Syntax Tree (AST)**

AST \= Abstract Syntax Tree

A tree representation of JavaScript source code.

Example:

const x \= 10;

Conceptual AST:

VariableDeclaration

│

└── VariableDeclarator

     │

     ├── Identifier(x)

     │

     └── Literal(10)

---

# **Why AST Matters**

Many tools depend on AST:

* Babel  
* ESLint  
* TypeScript  
* Prettier  
* V8 Compiler

---

# **V8 Parsing Strategies**

---

## **Full Parsing**

Used when code is expected to run immediately.

Steps:

Source

  ↓

Tokens

  ↓

AST

  ↓

Bytecode

---

## **Pre-Parsing (Lazy Parsing)**

Used for functions that may never execute.

Example:

function hugeFunction() \{

  // thousands of lines

\}

If never called:

* AST creation is skipped  
* Bytecode generation is skipped

Only syntax validation occurs.

---

## **Why Lazy Parsing?**

Benefits:

* Faster startup  
* Lower memory usage  
* Reduced compilation cost

Interview Point:

V8 does not fully parse every function immediately. It lazily parses functions when required.

---

# **3\. JIT Compilation**

---

## **Why JIT Exists**

JavaScript is dynamically typed.

Example:

let value \= 10;

value \= "hello";

value \= true;

Type changes at runtime.

Traditional Ahead-of-Time compilation becomes difficult.

---

## **JIT Approach**

Run Code

  ↓

Collect Runtime Information

  ↓

Optimize Frequently Used Paths

  ↓

Generate Machine Code

Benefits:

* Faster execution  
* Dynamic optimizations  
* Runtime adaptability

---

# **4\. Hidden Classes**

---

## **Problem**

JavaScript objects behave like dynamic dictionaries.

Example:

obj.x

A generic dictionary lookup is expensive.

---

## **V8 Solution**

### **Hidden Classes (Shapes / Maps)**

V8 creates internal metadata describing object structure.

---

### **Example**

const point \= \{\};

Hidden Class:

Point0

Add property:

point.x \= 100;

Transition:

Point0

  │

  ▼

Point1

Metadata:

x → Offset 0

---

Add another property:

point.y \= 200;

Transition:

Point0

  │

Point1

  │

Point2

Metadata:

x → Offset 0

y → Offset 1

Now property access becomes:

Memory Offset Lookup

instead of:

Dictionary Search

---

# **Senior Interview Trap**

Bad:

const p1 \= \{

 x: 1,

 y: 2

\};

const p2 \= \{

 y: 2,

 x: 1

\};

Different insertion order.

Different hidden classes.

Different optimization paths.

---

Good:

const p1 \= \{

 x: 1,

 y: 2

\};

const p2 \= \{

 x: 3,

 y: 4

\};

Same hidden class.

Maximum optimization.

---

# **5\. Inline Caching (IC)**

---

## **Purpose**

Uses Hidden Class information to optimize property access.

---

Example:

function getX(obj) \{

 return obj.x;

\}

Without optimization:

Lookup x

Lookup x

Lookup x

Lookup x

With Inline Cache:

x located at Offset 0

Direct access.

---

## **IC States**

### **Monomorphic**

One Hidden Class observed.

Performance: Best

---

### **Polymorphic**

2–4 Hidden Classes observed.

Performance: Good

---

### **Megamorphic**

5+ Hidden Classes observed.

Performance: Poor

Optimization degrades.

---

# **Interview Callout**

### **Why is Monomorphic Faster?**

Because V8 can directly inline memory offsets.

No repeated structure lookup is required.

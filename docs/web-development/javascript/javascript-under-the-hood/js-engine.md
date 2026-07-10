---
title: JS Engine
sidebar_position: 2
---

# JS Engine

A JavaScript engine is a program that executes JavaScript code. Modern engines do not simply interpret code line by line. They parse source code, build internal representations, generate bytecode, compile hot paths, optimize property access, and deoptimize when assumptions become invalid.

## Popular JavaScript Engines

| Browser or runtime | Engine |
| --- | --- |
| Chrome | V8 |
| Node.js | V8 |
| Deno | V8 |
| Electron | V8 |
| Firefox | SpiderMonkey |
| Safari | JavaScriptCore |

## V8 Engine

V8 is Google's high-performance JavaScript and WebAssembly engine written in C++. It powers Chrome and Node.js, uses JIT compilation, and continuously optimizes code based on runtime behavior.

## V8 Execution Pipeline

```text
JavaScript source
       |
       v
    Parser
       |
       v
      AST
       |
       v
   Ignition
 (interpreter)
       |
       v
    Bytecode
       |
       v
   Sparkplug
 (fast compiler)
       |
       v
   TurboFan
(optimizing compiler)
       |
       v
 Machine code
```

Different code paths need different optimization levels:

- Cold code runs rarely and may stay interpreted.
- Warm code runs regularly and can be compiled quickly.
- Hot code runs many times and can be heavily optimized.

```js
function calculate() {
  return 42;
}

for (let i = 0; i < 1_000_000; i++) {
  calculate();
}
```

## Parser and AST

Parsing converts raw JavaScript text into a structure the engine can understand.

Lexical analysis splits source into tokens.

```js
const x = 10;
```

Conceptual tokens:

```text
const
x
=
10
;
```

Syntax analysis checks whether the token sequence follows JavaScript grammar rules and builds an Abstract Syntax Tree.

```text
VariableDeclaration
└── VariableDeclarator
    ├── Identifier(x)
    └── Literal(10)
```

ASTs are also used by tools like Babel, ESLint, TypeScript, Prettier, and bundlers.

## Full Parsing vs Lazy Parsing

V8 does not fully parse every function immediately.

Full parsing is used when code is expected to run soon:

```text
Source -> Tokens -> AST -> Bytecode
```

Lazy parsing is used for functions that may never execute.

```js
function hugeFunction() {
  // thousands of lines
}
```

If the function is never called, V8 can avoid full AST creation and bytecode generation for it. This improves startup time and lowers memory usage.

## Ignition

Ignition is V8's interpreter. It turns AST into bytecode, executes bytecode, and collects runtime information called type feedback.

```js
function add(a, b) {
  return a + b;
}

add(1, 2);
add(5, 6);
add(10, 20);
```

Ignition observes that `a` and `b` are numbers. TurboFan can later use that feedback to optimize the function.

## Sparkplug

Sparkplug is a fast compiler that bridges the gap between interpreted bytecode and heavily optimized machine code.

It converts bytecode into machine code quickly without expensive optimization work. This improves responsiveness while V8 decides whether code is hot enough for TurboFan.

## TurboFan

TurboFan is V8's optimizing compiler. It uses type feedback and runtime behavior to generate highly optimized machine code for hot paths.

```js
function add(a, b) {
  return a + b;
}

add(1, 2);
add(3, 4);
add(5, 6);
```

If the function is repeatedly called with numbers, TurboFan can optimize for number addition.

## Deoptimization

JavaScript is dynamic, so optimization assumptions can break.

```js
function add(a, b) {
  return a + b;
}

add(1, 2);
add(3, 4);

add("1", "2");
```

V8 may first optimize for `Number + Number`. When strings appear, the assumption is invalid. V8 can discard optimized code, fall back to safer execution, collect new feedback, and re-optimize if needed.

Interview answer:

> V8 optimizes JavaScript by parsing source code into an AST, generating bytecode with Ignition, collecting type feedback, compiling warm code with Sparkplug, and optimizing hot paths with TurboFan. If runtime assumptions become invalid, V8 deoptimizes and falls back to a safer path.

## JIT Compilation

JIT means Just-In-Time compilation. JavaScript is dynamically typed, so engines collect runtime information before applying aggressive optimizations.

```js
let value = 10;
value = "hello";
value = true;
```

JIT approach:

```text
Run code
  -> collect runtime information
  -> optimize frequently used paths
  -> generate machine code
```

Benefits:

- Faster execution.
- Runtime-specific optimizations.
- Adaptability to dynamic code.

## Hidden Classes

JavaScript objects are dynamic, but dictionary-style property lookup is expensive. V8 creates internal metadata called hidden classes, also known as shapes or maps, to describe object structure.

```js
const point = {};
point.x = 100;
point.y = 200;
```

Conceptual hidden class transition:

```text
Point0
  |
  v
Point1: x -> offset 0
  |
  v
Point2: y -> offset 1
```

Now V8 can access properties by memory offset instead of performing a generic dictionary lookup.

Property insertion order matters.

```js
const p1 = {
  x: 1,
  y: 2,
};

const p2 = {
  y: 2,
  x: 1,
};
```

These objects may produce different hidden classes because their properties were added in different orders.

Better:

```js
const p1 = {
  x: 1,
  y: 2,
};

const p2 = {
  x: 3,
  y: 4,
};
```

Consistent object shapes make optimization easier.

## Inline Caching

Inline caching uses hidden class information to optimize repeated property access.

```js
function getX(obj) {
  return obj.x;
}
```

If `getX` repeatedly receives objects with the same hidden class, V8 can remember where `x` is located and avoid repeated structure lookup.

| Inline cache state | Meaning | Performance |
| --- | --- | --- |
| Monomorphic | One hidden class observed | Best |
| Polymorphic | A few hidden classes observed | Good |
| Megamorphic | Many hidden classes observed | Poorer |

Interview answer:

> Monomorphic property access is fastest because V8 can inline a stable memory offset. When many object shapes reach the same access site, inline caching becomes less effective.

## Quick Revision

- Parser converts source into tokens and AST.
- Ignition interprets bytecode and collects feedback.
- Sparkplug quickly compiles bytecode to machine code.
- TurboFan optimizes hot paths.
- Deoptimization happens when assumptions break.
- Hidden classes describe object layout.
- Inline caching speeds up repeated property access.

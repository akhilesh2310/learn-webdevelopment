---
title: TypeScript
sidebar_position: 1
---

# TypeScript

## Canonical Study Pages

- [TS Concepts](./ts-concepts.md) owns detailed TypeScript concept explanations.
- [Code](./code.md) owns examples and implementation snippets.
- [TypeScript Interview Q&A](./interview-qa.md) remains interview Q&A and preparation notes for now.

## TypeScript Interview Preparation Structure

- [https://www.typescriptlang.org/cheatsheets/](https://www.typescriptlang.org/cheatsheets/)

- [https://chatgpt.com/c/6a32d6e3-52b8-83ee-8149-2605708ec146](https://chatgpt.com/c/6a32d6e3-52b8-83ee-8149-2605708ec146)

- [https://github.com/aershov24/typescript-interview-questions](https://github.com/aershov24/typescript-interview-questions)

- [https://addyosmani.com/resources/essentialjsdesignpatterns/book/](https://addyosmani.com/resources/essentialjsdesignpatterns/book/)

- [https://www.codeproject.com/Articles/1071285/Latest-TypeScript-Interview-Questions-for-Beginner](https://www.codeproject.com/Articles/1071285/Latest-TypeScript-Interview-Questions-for-Beginner)

- [https://www.typescriptlang.org/docs/handbook/basic-types.html](https://www.typescriptlang.org/docs/handbook/basic-types.html)

- [https://devinterview.io/questions/web-and-mobile-development/typescript-interview-questions/](https://devinterview.io/questions/web-and-mobile-development/typescript-interview-questions/)

- [https://github.com/dotnetcrunch/typescript-interview-questions](https://github.com/dotnetcrunch/typescript-interview-questions)

- [https://zerotomastery.io/blog/typescript-interview-questions/](https://zerotomastery.io/blog/typescript-interview-questions/)

## TypeScript Interview Preparation Structure

## 1. TypeScript Fundamentals

## Why TypeScript?

* Problems TypeScript solves
* JavaScript vs TypeScript
* Compile-time vs Runtime

## Basic Types

* string
* number
* boolean
* bigint
* symbol

## Special Types

* any
* unknown
* void
* never

## null & undefined

## Type Inference

## Type Annotations

## Common Interview Topics

* any vs unknown
* void vs never
* TypeScript compile-time checking

---

## 2. Functions in TypeScript

## Function Type Annotations

## Return Type Annotations

## Optional Parameters

## Default Parameters

## Rest Parameters

## Function Overloading

## Function Signatures

## Common Interview Topics

* Function overloading
* Explicit return types

---

## 3. Objects & Type Definitions

## Typed Objects

## Nested Objects

## Readonly Properties

## Optional Properties

## Index Signatures

## Dynamic Object Keys

## Common Interview Topics

* Creating flexible object types
* Dynamic key typing

---

## 4. Interfaces

## Interface Basics

## Extending Interfaces

## Multiple Interface Inheritance

## Interface Merging

## Interface for Functions

## Interface for Classes

## Common Interview Topics

* Interface inheritance
* Interface merging

---

## 5. Type Aliases

## Type Alias Basics

## Object Types

## Function Types

## Union Types

## Intersection Types

## Common Interview Topics

* type vs interface
* Union vs Intersection

---

## 6. Type Narrowing

## typeof Guards

## instanceof Guards

## in Operator

## Equality Narrowing

## User Defined Type Guards

## Assertion Functions

## Common Interview Topics

* Type guards
* Narrowing union types

---

## 7. Generics

## Generic Functions

## Generic Interfaces

## Generic Type Aliases

## Generic Classes

## Multiple Generic Parameters

## Generic Constraints

\<T extends User\>

## Default Generic Types

## Common Interview Topics

* Why Generics?
* Generic Constraints
* Generic Repository Pattern

---

## 8. Advanced Types

## keyof

## typeof

## Indexed Access Types

## Conditional Types

T extends U ? X : Y

## infer Keyword

## Template Literal Types

## Recursive Types

## Common Interview Topics

* keyof usage
* Conditional Types
* infer keyword

---

## 9. Mapped Types

## Creating Types Dynamically

## Mapped Type Syntax

\[K in keyof T\]

## Property Modifiers

* readonly
* optional

## Common Interview Topics

* Building custom utility types

---

## 10. Utility Types

## Partial

## Required

## Readonly

## Pick

## Omit

## Record

## Exclude

## Extract

## NonNullable

## ReturnType

## Parameters

## InstanceType

## Common Interview Topics

* Implement Pick
* Implement Omit
* Real-world utility type usage

---

## 11. Enums & Literal Types

## Numeric Enums

## String Enums

## Const Enums

## Literal Types

## Union Literal Types

"success" | "error"

## Common Interview Topics

* Enum vs Union Types

---

## 12. Classes in TypeScript

## Class Syntax

## Access Modifiers

* public
* private
* protected

## Readonly Members

## Parameter Properties

## Abstract Classes

## Inheritance

## Implementing Interfaces

## Common Interview Topics

* Abstract Class vs Interface

---

## 13. Modules & Namespaces

## ES Modules

## Import

## Export

## Re-exporting

## Namespace Basics

## Module Resolution

## Common Interview Topics

* Namespace vs Module

---

## 14. Decorators (Important for Angular)

## Class Decorators

## Method Decorators

## Property Decorators

## Parameter Decorators

## Metadata Reflection

## Common Interview Topics

* How Angular uses decorators

---

## 15. TypeScript Configuration

## tsconfig.json

### Important Options

* strict
* noImplicitAny
* strictNullChecks
* target
* module

## Compilation Process

## Transpilation

## Source Maps

## Common Interview Topics

* strict mode options
* TypeScript build flow

---

## 16. Declaration Files

## .d.ts Files

## Ambient Declarations

## Third Party Libraries

## DefinitelyTyped

## @types Packages

## Common Interview Topics

* How TS types external JS libraries

---

## 17. TypeScript with React

## Typing Props

## Typing State

## Typing Events

### React Events

* ChangeEvent
* MouseEvent
* KeyboardEvent

## Typing Hooks

### useState

### useReducer

### useRef

### useContext

## Generic Components

## ForwardRef

## Common Interview Topics

* Typing reusable components
* Typing hooks correctly

---

## 18. Advanced TypeScript for Senior Engineers

## Discriminated Unions

## Exhaustiveness Checking

## Complex Generic Patterns

## API Response Typing

## Domain Modeling

## Strongly Typed State Management

## Type-safe Event Systems

## Type-safe Form Libraries

## Common Interview Topics

* Designing scalable type systems
* Building reusable generic libraries
* Type-safe API clients

---

## Fastest Interview Preparation Order

If your goal is **job switch preparation**, study in this order:

### Phase 1 (Most Asked)

1. TypeScript Fundamentals
2. Interfaces
3. Type Aliases
4. Generics
5. Utility Types
6. Type Narrowing
7. TypeScript with React

### Phase 2 (Senior Level)

8. Advanced Types
9. Mapped Types
10. Classes
11. Modules
12. tsconfig

### Phase 3 (Staff Level)

13. Declaration Files
14. Decorators
15. Advanced TypeScript Patterns
16. Type-safe Architecture

For React Senior/Staff Engineer interviews, mastering the first **7 sections** usually covers about **80–90% of TypeScript questions** that come up in frontend interviews.

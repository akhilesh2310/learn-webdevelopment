---
title: TS Concepts
sidebar_position: 3
---

# TS Concepts

---

## 🟦 TypeScript – Core Concepts for Interviews

### 1. Basic Types

* `number`, `string`, `boolean`, `any`, `unknown`

* `null`, `undefined`, `void`, `never`

* `enum`, `tuple`

### 2. Type Inference & Annotations

* How TS infers types

* When to use explicit annotations

### 3. Functions & Objects

* Function type annotations

* Optional and default parameters

* Typed object structures

* Readonly properties

### 4. Interfaces & Types

* `interface` vs `type`

* Extending interfaces

* Intersection (`&`) and union (`|`) types

* Index signatures

* Optional properties

### 5. Generics

* Generic functions, interfaces, and classes

* Constraints with `extends`

* Default generic parameters

### 6. Advanced Types

* Conditional types (`T extends U ? X : Y`)

* Mapped types (`keyof`, `in`)

* Utility types: `Partial`, `Pick`, `Omit`, `Record`, `Required`, etc.

* Type guards & user-defined guards

### 7. Type Narrowing

* `typeof`, `instanceof`, `in`

* Discriminated unions

### 8. Modules & Namespaces

* Working with ES modules in TypeScript

* Module resolution

### 9. Decorators (if applying for advanced roles or working with Angular)

* Class, method, property, and parameter decorators

* Metadata reflection

### 10. Tooling & Configuration

* `tsconfig.json` options

* Compilation vs transpilation

* Type declaration files (`.d.ts`)

* Working with DefinitelyTyped / `@types`

## TypeScript – Core Concepts for Interviews

TypeScript is JavaScript with static type checking. It helps catch many bugs during development before code runs in the browser or Node.js.

Simple mental model:

JavaScript
→ runs at runtime

TypeScript
→ checks types at compile time
→ then becomes JavaScript

TypeScript does not change JavaScript runtime behavior. It mainly improves developer safety, readability, refactoring, and large-scale maintainability.

---

## 1. Basic Types

## number, string, boolean

let age: number \= 32;
let name: string \= "Akhilesh";
let isActive: boolean \= true;

If we assign the wrong type:

let age: number \= "32";
// Type 'string' is not assignable to type 'number'.

## any

`any` disables type checking.

let value: any \= 10;

value \= "hello";
value \= true;

value.toUpperCase(); // No TypeScript error, but can fail at runtime

Use `any` only when absolutely necessary, because it removes TypeScript safety.

## unknown

`unknown` is safer than `any`.

let value: unknown \= "hello";

value.toUpperCase();
// 'value' is of type 'unknown'.

We must narrow it first:

if (typeof value \=== "string") \{
  console.log(value.toUpperCase());
\}

## any vs unknown

| Point | any | unknown |
| ----- | ----- | ----- |
| Type safety | No | Yes |
| Allows direct usage | Yes | No |
| Runtime risk | High | Lower |
| Best use | Avoid mostly | Safer alternative |

## void

`void` means a function does not return a meaningful value.

function logMessage(message: string): void \{
  console.log(message);
\}

## never

`never` means a value never exists because the function never completes normally.

function throwError(message: string): never \{
  throw new Error(message);
\}

Another example:

function infiniteLoop(): never \{
  while (true) \{\}
\}

## null and undefined

let a: null \= null;
let b: undefined \= undefined;

With `strictNullChecks`, `null` and `undefined` are not automatically allowed everywhere.

let name: string \= null;
// Type 'null' is not assignable to type 'string'.

Correct:

let name: string | null \= null;

## Tuple

A tuple is an array with fixed length and fixed types.

let user: \[number, string\] \= \[1, "Akhilesh"\];

Wrong order gives error:

let user: \[number, string\] \= \["Akhilesh", 1\];
// Type 'string' is not assignable to type 'number'.
// Type 'number' is not assignable to type 'string'.

## Enum

Enum gives names to constant values.

enum Role \{
  Admin,
  User,
  Guest,
\}

let role: Role \= Role.Admin;

String enum:

enum Status \{
  Active \= "ACTIVE",
  Inactive \= "INACTIVE",
\}

In modern TypeScript, union literals are often preferred for simple cases:

type Role \= "admin" | "user" | "guest";

## Interview-ready answer

TypeScript provides basic types like `number`, `string`, `boolean`, `null`, `undefined`, `void`, `never`, tuples, and enums. `any` disables type safety, while `unknown` is safer because it forces type narrowing before usage. `never` represents values that never occur, usually for thrown errors, infinite loops, or exhaustive checks.

---

## 2. Type Inference & Annotations

## Type inference

TypeScript can automatically infer types from assigned values.

let name \= "Akhilesh";
name \= 123;
// Type 'number' is not assignable to type 'string'.

TypeScript inferred `name` as `string`.

## Function return inference

function add(a: number, b: number) \{
  return a \+ b;
\}

TypeScript infers return type as `number`.

## Explicit annotations

We manually write the type.

let age: number \= 32;

function add(a: number, b: number): number \{
  return a \+ b;
\}

## When to use explicit annotations

Use explicit annotations for:

* Function parameters
* Public function return types
* API responses
* Complex objects
* Variables initialized later
* Shared types
* Library code
* Places where readability matters

Example:

let userName: string;

userName \= "Akhilesh";

## When inference is enough

const count \= 10;
const isActive \= true;
const title \= "Dashboard";

No need to over-annotate obvious values.

## Interview-ready answer

TypeScript infers types automatically from values, so we do not need annotations everywhere. I use explicit annotations for function parameters, public return types, API responses, complex objects, and shared contracts. Good TypeScript balances inference and explicitness.

---

## 3. Functions & Objects

## Function type annotations

function greet(name: string): string \{
  return \`Hello $\{name\}\`;
\}

Arrow function:

const add \= (a: number, b: number): number \=\> \{
  return a \+ b;
\};

Function type:

type Add \= (a: number, b: number) \=\> number;

const add: Add \= (a, b) \=\> a \+ b;

## Optional parameters

Optional parameters use `?`.

function greet(name: string, title?: string): string \{
  return title ? \`$\{title\} $\{name\}\` : name;
\}

Optional parameters must usually come after required parameters.

function greet(title?: string, name: string) \{\}
// A required parameter cannot follow an optional parameter.

## Default parameters

function greet(name: string \= "Guest"): string \{
  return \`Hello $\{name\}\`;
\}

## Rest parameters

function sum(...numbers: number\[\]): number \{
  return numbers.reduce((total, num) \=\> total \+ num, 0);
\}

## Typed object structures

type User \= \{
  id: number;
  name: string;
  email: string;
\};

const user: User \= \{
  id: 1,
  name: "Akhilesh",
  email: "akhilesh@example.com",
\};

## Optional properties

type User \= \{
  id: number;
  name: string;
  phone?: string;
\};

## Readonly properties

type User \= \{
  readonly id: number;
  name: string;
\};

const user: User \= \{
  id: 1,
  name: "Akhilesh",
\};

user.id \= 2;
// Cannot assign to 'id' because it is a read-only property.

## Interview-ready answer

TypeScript allows us to type function parameters, return values, objects, optional fields, default parameters, rest parameters, and readonly properties. This makes function contracts and object shapes clear and catches incorrect usage during development.

---

## 4. Interfaces & Types

## interface

`interface` is commonly used to define object shapes.

interface User \{
  id: number;
  name: string;
\}

## type

`type` can define object shapes, unions, intersections, function types, and more.

type User \= \{
  id: number;
  name: string;
\};

## interface vs type

| Point | interface | type |
| ----- | ----- | ----- |
| Object shape | Yes | Yes |
| Union type | No | Yes |
| Intersection | Via extends | Yes |
| Declaration merging | Yes | No |
| Common use | Object contracts/classes | Flexible type composition |

## Extending interfaces

interface Person \{
  name: string;
\}

interface Employee extends Person \{
  employeeId: number;
\}

## Type intersection

type Person \= \{
  name: string;
\};

type Employee \= Person & \{
  employeeId: number;
\};

## Union type

Union means value can be one of multiple types.

type Status \= "loading" | "success" | "error";

let status: Status \= "loading";

## Intersection type

Intersection combines multiple types.

type User \= \{
  id: number;
  name: string;
\};

type Admin \= \{
  permissions: string\[\];
\};

type AdminUser \= User & Admin;

## Index signatures

Use index signatures when object keys are dynamic.

type Scores \= \{
  \[subject: string\]: number;
\};

const scores: Scores \= \{
  math: 90,
  english: 85,
\};

## Optional properties

interface User \{
  id: number;
  name: string;
  phone?: string;
\}

## Interview-ready answer

`interface` and `type` can both define object shapes. I usually use `interface` for object contracts that may be extended or implemented by classes, and `type` for unions, intersections, utility types, and more flexible type composition. Union means either/or, while intersection means combining multiple types.

---

## 5. Generics

## Simple meaning

Generics allow us to write reusable code that works with different types while preserving type safety.

## Generic function

function identity\<T\>(value: T): T \{
  return value;
\}

const a \= identity\<string\>("hello");
const b \= identity\<number\>(123);

TypeScript can also infer the generic type:

const name \= identity("Akhilesh"); // string
const age \= identity(32); // number

## Why generics are useful

Without generics:

function getFirstItem(items: any\[\]): any \{
  return items\[0\];
\}

This loses type safety.

With generics:

function getFirstItem\<T\>(items: T\[\]): T \{
  return items\[0\];
\}

const first \= getFirstItem(\["React", "TypeScript"\]);
// first is string

## Generic interface

interface ApiResponse\<T\> \{
  data: T;
  success: boolean;
  message?: string;
\}

type User \= \{
  id: number;
  name: string;
\};

const response: ApiResponse\<User\> \= \{
  data: \{
    id: 1,
    name: "Akhilesh",
  \},
  success: true,
\};

## Generic class

class Store\<T\> \{
  private value: T;

  constructor(value: T) \{
    this.value \= value;
  \}

  getValue(): T \{
    return this.value;
  \}
\}

const stringStore \= new Store\<string\>("hello");

## Constraints with extends

Constraints limit what generic types are allowed.

function getLength\<T extends \{ length: number \}\>(value: T): number \{
  return value.length;
\}

getLength("hello"); // 5
getLength(\[1, 2, 3\]); // 3
getLength(123);
// Argument of type 'number' is not assignable to parameter of type '\{ length: number; \}'.

## Default generic parameters

type ApiResponse\<T \= unknown\> \= \{
  data: T;
  success: boolean;
\};

const response: ApiResponse \= \{
  data: "anything",
  success: true,
\};

## Interview-ready answer

Generics let us create reusable type-safe functions, interfaces, and classes. Instead of using `any`, generics preserve the relationship between input and output types. Constraints with `extends` restrict allowed types, and default generic parameters provide fallback types.

---

## 6. Advanced Types

## Conditional types

Conditional types choose one type based on another type.

type IsString\<T\> \= T extends string ? true : false;

type A \= IsString\<string\>; // true
type B \= IsString\<number\>; // false

## Practical conditional type

type ApiResult\<T\> \= T extends Error
  ? \{ success: false; error: T \}
  : \{ success: true; data: T \};

## keyof

`keyof` gives union of keys of a type.

type User \= \{
  id: number;
  name: string;
\};

type UserKeys \= keyof User;
// "id" | "name"

## Mapped types

Mapped types create new types by looping over keys.

type User \= \{
  id: number;
  name: string;
\};

type ReadonlyUser \= \{
  readonly \[K in keyof User\]: User\[K\];
\};

## Utility types

### Partial

Makes all properties optional.

type User \= \{
  id: number;
  name: string;
\};

type PartialUser \= Partial\<User\>;

### Required

Makes all properties required.

type User \= \{
  id?: number;
  name?: string;
\};

type RequiredUser \= Required\<User\>;

### Pick

Selects specific properties.

type UserPreview \= Pick\<User, "id" | "name"\>;

### Omit

Removes specific properties.

type UserWithoutEmail \= Omit\<User, "email"\>;

### Record

Creates object type with specific keys and value type.

type Role \= "admin" | "user" | "guest";

const permissions: Record\<Role, string\[\]\> \= \{
  admin: \["create", "delete"\],
  user: \["read"\],
  guest: \[\],
\};

## User-defined type guard

type User \= \{
  id: number;
  name: string;
\};

function isUser(value: unknown): value is User \{
  return (
    typeof value \=== "object" &&
    value \!== null &&
    "id" in value &&
    "name" in value
  );
\}

function printUser(value: unknown) \{
  if (isUser(value)) \{
    console.log(value.name);
  \}
\}

## Interview-ready answer

Advanced TypeScript types help transform and reason about types. Conditional types choose types based on conditions, mapped types transform object properties, `keyof` extracts keys, utility types like `Partial`, `Pick`, `Omit`, `Record`, and `Required` simplify common transformations, and type guards help narrow unknown values safely.

---

## 7. Type Narrowing

## Simple meaning

Type narrowing means reducing a broad type into a more specific type using checks.

## typeof

function print(value: string | number) \{
  if (typeof value \=== "string") \{
    console.log(value.toUpperCase());
  \} else \{
    console.log(value.toFixed(2));
  \}
\}

## instanceof

function handleDate(value: Date | string) \{
  if (value instanceof Date) \{
    console.log(value.getFullYear());
  \} else \{
    console.log(value.toUpperCase());
  \}
\}

## in operator

type Admin \= \{
  role: "admin";
  permissions: string\[\];
\};

type User \= \{
  role: "user";
  email: string;
\};

function printAccount(account: Admin | User) \{
  if ("permissions" in account) \{
    console.log(account.permissions);
  \} else \{
    console.log(account.email);
  \}
\}

## Discriminated unions

A discriminated union uses a common property to narrow types.

type LoadingState \= \{
  status: "loading";
\};

type SuccessState \= \{
  status: "success";
  data: string\[\];
\};

type ErrorState \= \{
  status: "error";
  error: string;
\};

type State \= LoadingState | SuccessState | ErrorState;

Usage:

function renderState(state: State) \{
  switch (state.status) \{
    case "loading":
      return "Loading...";

    case "success":
      return state.data.join(", ");

    case "error":
      return state.error;
  \}
\}

## Exhaustive checking with never

function renderState(state: State) \{
  switch (state.status) \{
    case "loading":
      return "Loading...";

    case "success":
      return state.data.join(", ");

    case "error":
      return state.error;

    default:
      const exhaustiveCheck: never \= state;
      return exhaustiveCheck;
  \}
\}

If a new status is added and not handled, TypeScript catches it.

## Interview-ready answer

Type narrowing helps TypeScript understand the exact type inside a code block. Common narrowing techniques include `typeof`, `instanceof`, `in`, equality checks, user-defined type guards, and discriminated unions. Discriminated unions are especially useful for API state, reducers, and complex UI states.

---

## 8. Modules & Namespaces

## ES modules in TypeScript

TypeScript supports standard ES modules using `import` and `export`.

// user.ts
\export type User \= \{
  id: number;
  name: string;
\};

\export function getUserName(user: User): string \{
  return user.name;
\}

// app.ts
\import \{ User, getUserName \} from "./user";

Better for type-only import:

\import type \{ User \} from "./user";

## Default export

\export default function Button() \{
  return "Button";
\}

\import Button from "./Button";

## Named export

\export function formatDate() \{\}
\export function formatCurrency() \{\}

\import \{ formatDate, formatCurrency \} from "./formatters";

## Module resolution

Module resolution is how TypeScript finds imported files and types.

Example:

\import \{ Button \} from "@company/ui";

TypeScript checks:

tsconfig paths
node\_modules
package.json types field
index.d.ts
local files

## Path aliases

\{
  "compilerOptions": \{
    "baseUrl": ".",
    "paths": \{
      "@features/\*": \["src/features/\*"\],
      "@shared/\*": \["src/shared/\*"\]
    \}
  \}
\}

Usage:

\import \{ Button \} from "@shared/components/Button";

## Namespaces

Namespaces are older TypeScript syntax for grouping code.

namespace Utils \{
  \export function formatDate(date: Date): string \{
    return date.toISOString();
  \}
\}

Utils.formatDate(new Date());

Modern TypeScript mostly prefers ES modules over namespaces.

## Interview-ready answer

TypeScript works well with ES modules using `import` and `export`. Module resolution decides how TypeScript finds files and type declarations. For modern frontend apps, ES modules are preferred over namespaces. Namespaces are mostly seen in older TypeScript codebases or declaration files.

---

## 9. Decorators

## Simple meaning

Decorators are special functions that can attach behavior or metadata to classes, methods, properties, or parameters.

They are commonly used in Angular and some backend frameworks.

## Class decorator

function Controller(path: string) \{
  return function (target: Function) \{
    Reflect.defineMetadata("path", path, target);
  \};
\}

@Controller("/users")
class UserController \{\}

## Method decorator

function Log(
  target: unknown,
  propertyKey: string,
  descriptor: PropertyDescriptor
) \{
  const originalMethod \= descriptor.value;

  descriptor.value \= function (...args: unknown\[\]) \{
    console.log("Calling:", propertyKey);
    return originalMethod.apply(this, args);
  \};
\}

## Angular example

@Component(\{
  selector: "app-user",
  templateUrl: "./user.component.html",
\})
\export class UserComponent \{\}

## Metadata reflection

Metadata reflection means storing and reading metadata about classes or members.

Frameworks can use metadata for:

* Dependency injection
* Routing
* Validation
* Serialization
* Component configuration

## Important note

Decorator behavior depends on TypeScript version, configuration, and framework usage. For Angular interviews, decorators are very important. For React interviews, they are usually less important.

## Interview-ready answer

Decorators are functions used to add metadata or behavior to classes, methods, properties, or parameters. They are heavily used in Angular for components, services, dependency injection, and routing metadata. In React roles, decorators are usually less important unless the project uses Angular, NestJS, or decorator-based frameworks.

---

## 10. Tooling & Configuration

## tsconfig.json

`tsconfig.json` controls how TypeScript checks and compiles the project.

Common options:

\{
  "compilerOptions": \{
    "target": "ES2020",
    "module": "ESNext",
    "strict": true,
    "jsx": "react-jsx",
    "moduleResolution": "Bundler",
    "baseUrl": ".",
    "paths": \{
      "@shared/\*": \["src/shared/\*"\]
    \},
    "noEmit": true
  \}
\}

## Important tsconfig options

| Option | Meaning |
| ----- | ----- |
| `target` | JavaScript version output |
| `module` | Module system |
| `strict` | Enables strict type checking |
| `jsx` | JSX transform mode |
| `moduleResolution` | How imports are resolved |
| `baseUrl` | Base path for imports |
| `paths` | Path aliases |
| `noEmit` | Type-check only, do not output JS |
| `outDir` | Output directory |
| `declaration` | Generate `.d.ts` files |

## Compilation vs Transpilation

## Transpilation

Transpilation means converting code syntax from one version/language to another.

Example:

TypeScript → JavaScript
Modern JavaScript → older JavaScript

Tools like Babel, SWC, and esbuild often transpile very fast.

## Compilation

Compilation in TypeScript usually includes type checking plus output generation.

Type check
  \+
Generate JavaScript

In many React apps:

tsc \--noEmit
→ type checking only

Vite/Webpack/SWC/Babel
→ transpilation/bundling

## Type declaration files

`.d.ts` files describe types for JavaScript code or libraries.

Example:

// global.d.ts
declare module "\*.svg" \{
  const content: string;
  \export default content;
\}

Another example:

declare global \{
  interface Window \{
    analytics: \{
      track: (eventName: string) \=\> void;
    \};
  \}
\}

## DefinitelyTyped and @types

Some JavaScript libraries do not include their own TypeScript types.

For those, install community types:

npm install \--save-dev @types/lodash

These types usually come from DefinitelyTyped.

## Interview-ready answer

`tsconfig.json` controls TypeScript behavior, including strictness, module resolution, JSX mode, path aliases, and output settings. TypeScript compilation can include type checking and JavaScript generation, while transpilation mainly converts syntax. `.d.ts` files provide type information for JavaScript code, globals, assets, or libraries, and `@types` packages provide community-maintained types for libraries.

---

## Common Interview Topics / Questions

---

## 1. any vs unknown vs never

## Answer

let a: any;
let b: unknown;

`any` allows anything and disables type checking. `unknown` allows assignment but requires narrowing before use. `never` represents impossible values or functions that never return.

## Interview-ready answer

`any` removes type safety, `unknown` is a safer alternative that forces type checks before usage, and `never` represents code paths or values that should never happen. In production TypeScript, I prefer `unknown` over `any` when the type is not known.

---

## 2. interface vs type

## Answer

Both can define object shapes.

interface User \{
  id: number;
\}

type UserType \= \{
  id: number;
\};

## Interview-ready answer

I use `interface` for extendable object contracts and class implementation. I use `type` for unions, intersections, utility types, and advanced type composition. Both are valid for object shapes, but `type` is more flexible and `interface` supports declaration merging.

---

## 3. Union vs Intersection

## Union

Either this or that.

type Status \= "loading" | "success" | "error";

## Intersection

Combination of multiple types.

type AdminUser \= User & Admin;

## Interview-ready answer

Union means a value can be one of several types. Intersection means a value must satisfy multiple types at the same time. Unions are useful for states and variants, while intersections are useful for combining object capabilities.

---

## 4. What are generics?

## Answer

Generics allow reusable type-safe code.

function wrap\<T\>(value: T): \{ value: T \} \{
  return \{ value \};
\}

## Interview-ready answer

Generics let functions, interfaces, and classes work with different types while preserving type information. They are better than `any` because they maintain the relationship between input and output types.

---

## 5. What are utility types?

## Answer

Utility types transform existing types.

Examples:

Partial\<User\>
Pick\<User, "id" | "name"\>
Omit\<User, "password"\>
Record\<Role, Permission\[\]\>
Required\<User\>
Readonly\<User\>

## Interview-ready answer

Utility types are built-in TypeScript helpers that transform types. They reduce duplication and make type definitions easier to maintain. Common examples are `Partial`, `Pick`, `Omit`, `Record`, `Required`, and `Readonly`.

---

## 6. What is type narrowing?

## Answer

Type narrowing means refining a broad type into a specific type.

function print(value: string | number) \{
  if (typeof value \=== "string") \{
    console.log(value.toUpperCase());
  \}
\}

## Interview-ready answer

Type narrowing helps TypeScript understand the exact type inside a condition. It can be done using `typeof`, `instanceof`, `in`, equality checks, user-defined type guards, and discriminated unions.

---

## 7. What is a discriminated union?

## Answer

A discriminated union uses a common property to identify each variant.

type State \=
  | \{ status: "loading" \}
  | \{ status: "success"; data: string\[\] \}
  | \{ status: "error"; error: string \};

## Interview-ready answer

A discriminated union is a union where each type has a common literal field, like `status` or `type`. It is very useful for API states, reducers, and UI state machines because TypeScript can safely narrow each case.

---

## 8. What is keyof?

## Answer

`keyof` creates a union of keys from a type.

type User \= \{
  id: number;
  name: string;
\};

type UserKey \= keyof User;
// "id" | "name"

## Interview-ready answer

`keyof` extracts the keys of a type as a union. It is commonly used with generics, mapped types, and safe object property access.

---

## 9. What are mapped types?

## Answer

Mapped types create new types by iterating over keys.

type MyPartial\<T\> \= \{
  \[K in keyof T\]?: T\[K\];
\};

## Interview-ready answer

Mapped types allow us to transform object types by looping over their keys. Utility types like `Partial`, `Readonly`, and `Required` are built using mapped types.

---

## 10. What is a .d.ts file?

## Answer

A `.d.ts` file contains type declarations without implementation.

## Interview-ready answer

`.d.ts` files provide type information for JavaScript libraries, global variables, modules, assets, or generated APIs. They help TypeScript understand code that does not directly contain TypeScript types.

---

## Quick Revision Summary

| Topic | Key point |
| ----- | ----- |
| `number/string/boolean` | Basic primitive types |
| `any` | Disables type safety |
| `unknown` | Safer unknown value |
| `void` | No meaningful return |
| `never` | Never returns/impossible state |
| Tuple | Fixed length typed array |
| Enum | Named constants |
| Inference | TypeScript guesses type |
| Annotation | Developer writes type |
| Interface | Object contract |
| Type alias | Flexible type definition |
| Union | Either/or |
| Intersection | Combine types |
| Generics | Reusable type-safe code |
| `extends` | Generic constraint |
| Conditional type | Type-level if/else |
| `keyof` | Union of object keys |
| Mapped type | Transform object keys |
| Utility type | Built-in type transformer |
| Type guard | Runtime check for narrowing |
| Discriminated union | Safe variant modeling |
| ES modules | Modern import/export |
| Namespace | Older TS grouping style |
| Decorator | Metadata/behavior wrapper |
| tsconfig | TypeScript project config |
| `.d.ts` | Type declarations |

---

## Final Interview-Ready Combined Answer

TypeScript adds static type checking to JavaScript. It supports basic types like `number`, `string`, `boolean`, `null`, `undefined`, `void`, `never`, tuples, and enums. Type inference lets TypeScript infer types automatically, while explicit annotations are useful for function parameters, API responses, and public contracts. Interfaces and type aliases define object shapes and reusable types. Generics allow reusable type-safe functions, interfaces, and classes without losing type information. Advanced types like conditional types, mapped types, `keyof`, and utility types help transform and compose types. Type narrowing using `typeof`, `instanceof`, `in`, user-defined guards, and discriminated unions makes code safer. TypeScript works with ES modules, supports declaration files, and is configured through `tsconfig.json`. For interviews, the most important concepts are `any` vs `unknown`, `type` vs `interface`, unions/intersections, generics, utility types, type guards, discriminated unions, and strict configuration.

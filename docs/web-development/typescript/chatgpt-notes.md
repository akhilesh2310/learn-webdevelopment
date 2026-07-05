---
title: ChatGPT Notes
sidebar_position: 2
---

# ChatGPT Notes

## TypeScript Interview Preparation Notes

TypeScript is JavaScript with a type system. It helps catch many mistakes before runtime, improves code readability, gives better IDE support, and makes large frontend codebases safer to refactor. For senior frontend interviews, focus less on memorizing syntax and more on explaining how TypeScript helps design safer APIs, reusable components, scalable state, and maintainable domain models.

---

## 1. TypeScript Fundamentals

## Simple meaning

TypeScript adds static typing on top of JavaScript.

It does not replace JavaScript. TypeScript code is compiled/transpiled into JavaScript before running in the browser or Node.js.

const name: string \= "Akhilesh";  
const age: number \= 33;  
const isActive: boolean \= true;

## Why TypeScript?

TypeScript helps catch mistakes early.

function calculateTotal(price: number, quantity: number) \{  
  return price \* quantity;  
\}

calculateTotal("100", 2);  
// TypeScript error: Argument of type 'string' is not assignable to parameter of type 'number'.

## Problems TypeScript solves

* Catches type-related bugs before runtime.  
* Improves autocomplete and refactoring.  
* Makes function contracts clear.  
* Helps model API responses.  
* Makes large React apps easier to maintain.  
* Reduces accidental misuse of objects, props, and functions.

## JavaScript vs TypeScript

JavaScript is dynamically typed. TypeScript is statically typed during development.

// JavaScript  
function greet(name) \{  
  return name.toUpperCase();  
\}

greet(123); // Runtime error: name.toUpperCase is not a function

// TypeScript  
function greet(name: string) \{  
  return name.toUpperCase();  
\}

greet(123);  
// TypeScript error: Argument of type 'number' is not assignable to parameter of type 'string'.

## Compile-time vs Runtime

TypeScript checks types at compile time. It does not add runtime type checking automatically.

type User \= \{  
  id: number;  
  name: string;  
\};

const user: User \= JSON.parse('\{ "id": "1", "name": "Akhilesh" \}');

TypeScript trusts the assigned type here, but at runtime `id` is still a string. For external data, runtime validation may still be needed.

## Basic types

const name: string \= "Akhilesh";  
const age: number \= 33;  
const isActive: boolean \= true;  
const bigValue: bigint \= 100n;  
const id: symbol \= Symbol("id");

## Special types

### `any`

`any` disables type checking.

let value: any \= "hello";

value.toUpperCase();  
value.nonExistingMethod(); // No TypeScript error, but may fail at runtime

### `unknown`

`unknown` is safer than `any`. You must narrow it before using it.

let value: unknown \= "hello";

value.toUpperCase();  
// TypeScript error: 'value' is of type 'unknown'.

if (typeof value \=== "string") \{  
  console.log(value.toUpperCase()); // OK  
\}

### `void`

`void` means a function does not return a useful value.

function logMessage(message: string): void \{  
  console.log(message);  
\}

### `never`

`never` means a function never successfully returns.

function throwError(message: string): never \{  
  throw new Error(message);  
\}

Also useful for exhaustiveness checking.

type Status \= "success" | "error";

function handleStatus(status: Status) \{  
  switch (status) \{  
    case "success":  
      return "Success";  
    case "error":  
      return "Error";  
    default:  
      const exhaustiveCheck: never \= status;  
      return exhaustiveCheck;  
  \}  
\}

### `null` and `undefined`

With `strictNullChecks`, `null` and `undefined` are not assignable to every type automatically.

let name: string \= null;  
// TypeScript error when strictNullChecks is true

## Type inference

TypeScript can infer types automatically.

const name \= "Akhilesh";  
// inferred as string

const age \= 33;  
// inferred as number

Use type annotations when they improve clarity, especially for function parameters, return types, API data, and public contracts.

## Common interview topic: `any` vs `unknown`

`any` disables type safety. `unknown` forces type checking before usage.

function handleValue(value: unknown) \{  
  if (typeof value \=== "string") \{  
    return value.toUpperCase();  
  \}

  return String(value);  
\}

Interview-ready answer: `any` turns off TypeScript checking and should be avoided unless absolutely necessary. `unknown` is safer because it accepts any value but does not allow usage until we narrow the type. For external data like API responses or JSON parsing, `unknown` is usually better than `any`.

## Common interview topic: `void` vs `never`

`void` means the function returns nothing useful. `never` means the function never returns normally.

function log(): void \{  
  console.log("done");  
\}

function fail(): never \{  
  throw new Error("failed");  
\}

Interview-ready answer: `void` is used when a function completes but does not return a meaningful value. `never` is used when a function cannot complete normally, like throwing an error or running an infinite loop. `never` is also useful for exhaustiveness checks in discriminated unions.

## Interview-ready answer

TypeScript adds static type checking to JavaScript. It helps catch bugs during development, improves refactoring and IDE support, and makes large frontend apps easier to maintain. TypeScript checks types at compile time, but it does not automatically validate runtime data, so API responses may still need runtime validation.

---

## 2. Functions in TypeScript

## Simple meaning

TypeScript lets us type function parameters, return values, callbacks, overloads, and rest parameters.

function add(a: number, b: number): number \{  
  return a \+ b;  
\}

## Function type annotations

const add: (a: number, b: number) \=\> number \= (a, b) \=\> \{  
  return a \+ b;  
\};

## Return type annotations

function getUserName(user: \{ name: string \}): string \{  
  return user.name;  
\}

For public functions, explicit return types are often useful.

## Optional parameters

function greet(name?: string) \{  
  return \`Hello $\{name ?? "Guest"\}\`;  
\}

console.log(greet()); // "Hello Guest"

Optional parameters are typed as `string | undefined`.

## Default parameters

function greet(name \= "Guest") \{  
  return \`Hello $\{name\}\`;  
\}

TypeScript infers `name` as `string`.

## Rest parameters

function sum(...numbers: number\[\]): number \{  
  return numbers.reduce((total, num) \=\> total \+ num, 0);  
\}

console.log(sum(1, 2, 3)); // 6

## Function signatures

type Formatter \= (value: string) \=\> string;

const uppercase: Formatter \= (value) \=\> value.toUpperCase();

## Function overloading

Function overloading lets one function support multiple call signatures.

function format(value: string): string;  
function format(value: number): string;  
function format(value: string | number): string \{  
  if (typeof value \=== "number") \{  
    return value.toFixed(2);  
  \}

  return value.trim();  
\}

console.log(format(" hello ")); // "hello"  
console.log(format(10)); // "10.00"

## Common mistake

The implementation signature is not directly visible to callers.

function getValue(value: string): string;  
function getValue(value: number): number;  
function getValue(value: string | number) \{  
  return value;  
\}

getValue(true);  
// TypeScript error: No overload matches this call.

## Interview-ready answer

TypeScript functions can type parameters, return values, callbacks, optional parameters, default parameters, and rest parameters. Function overloading is useful when one function supports multiple input-output combinations. For public APIs and shared utilities, explicit return types improve clarity and prevent accidental changes.

---

## 3. Objects and Type Definitions

## Simple meaning

TypeScript can describe the shape of objects.

const user: \{  
  id: number;  
  name: string;  
  isActive: boolean;  
\} \= \{  
  id: 1,  
  name: "Akhilesh",  
  isActive: true,  
\};

Usually we define reusable object types.

type User \= \{  
  id: number;  
  name: string;  
  isActive: boolean;  
\};

## Nested objects

type User \= \{  
  id: number;  
  profile: \{  
    name: string;  
    email: string;  
  \};  
\};

## Optional properties

type User \= \{  
  id: number;  
  name: string;  
  avatarUrl?: string;  
\};

`avatarUrl?: string` means `avatarUrl` can be `string | undefined`.

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
// TypeScript error: Cannot assign to 'id' because it is a read-only property.

## Index signatures

Use index signatures when object keys are dynamic.

type Scores \= \{  
  \[subject: string\]: number;  
\};

const scores: Scores \= \{  
  math: 90,  
  english: 85,  
\};

## Dynamic object keys

type FeatureFlags \= Record\<string, boolean\>;

const flags: FeatureFlags \= \{  
  newDashboard: true,  
  betaSearch: false,  
\};

## Safer dynamic keys with union

type Role \= "admin" | "user" | "guest";

type RolePermissions \= Record\<Role, string\[\]\>;

const permissions: RolePermissions \= \{  
  admin: \["read", "write", "delete"\],  
  user: \["read"\],  
  guest: \[\],  
\};

## Common interview topic: creating flexible object types

Use `Record`, index signatures, optional properties, or generics depending on how flexible the object needs to be.

type ApiResponse\<T\> \= \{  
  data: T;  
  status: number;  
  error?: string;  
\};

## Interview-ready answer

TypeScript object types define the expected shape of an object. We can use optional properties for fields that may be missing, readonly properties for immutable fields, index signatures or `Record` for dynamic keys, and nested types for complex data. For dynamic objects, I prefer narrowing keys with unions when possible instead of allowing any string key.

---

## 4. Interfaces

## Simple meaning

An interface defines the shape of an object, function, or class contract.

interface User \{  
  id: number;  
  name: string;  
\}

const user: User \= \{  
  id: 1,  
  name: "Akhilesh",  
\};

## Extending interfaces

interface User \{  
  id: number;  
  name: string;  
\}

interface AdminUser extends User \{  
  permissions: string\[\];  
\}

## Multiple interface inheritance

interface HasId \{  
  id: number;  
\}

interface HasTimestamps \{  
  createdAt: string;  
  updatedAt: string;  
\}

interface User extends HasId, HasTimestamps \{  
  name: string;  
\}

## Interface merging

Interfaces with the same name are merged.

interface User \{  
  id: number;  
\}

interface User \{  
  name: string;  
\}

const user: User \= \{  
  id: 1,  
  name: "Akhilesh",  
\};

## Interface for functions

interface Formatter \{  
  (value: string): string;  
\}

const uppercase: Formatter \= (value) \=\> value.toUpperCase();

## Interface for classes

interface Repository\<T\> \{  
  findById(id: string): Promise\<T\>;  
  save(item: T): Promise\<void\>;  
\}

class UserRepository implements Repository\<User\> \{  
  async findById(id: string): Promise\<User\> \{  
    return \{ id, name: "Akhilesh" \};  
  \}

  async save(user: User): Promise\<void\> \{  
    console.log(user);  
  \}  
\}

## Interview-ready answer

Interfaces define object, function, or class contracts. They can extend other interfaces and support declaration merging. Interfaces are commonly used for public object shapes, class contracts, and API models. Interface merging is useful in library augmentation, but in application code it should be used carefully to avoid accidental type changes.

---

## 5. Type Aliases

## Simple meaning

A type alias gives a name to any type.

type User \= \{  
  id: number;  
  name: string;  
\};

Unlike interfaces, type aliases can represent primitives, unions, intersections, tuples, and complex type expressions.

## Function type

type Formatter \= (value: string) \=\> string;

## Union type

type Status \= "idle" | "loading" | "success" | "error";

## Intersection type

type User \= \{  
  id: number;  
  name: string;  
\};

type WithPermissions \= \{  
  permissions: string\[\];  
\};

type AdminUser \= User & WithPermissions;

## Common interview topic: `type` vs `interface`

| Point | `interface` | `type` |
| ----- | ----- | ----- |
| Best for | Object/class contracts | Unions, intersections, utilities |
| Extending | `extends` | `&` intersection |
| Declaration merging | Yes | No |
| Primitive alias | No | Yes |
| Union type | No | Yes |

## Interview-ready answer

Both `type` and `interface` can define object shapes. I usually use `interface` for public object contracts and class contracts, especially when extension or declaration merging is useful. I use `type` for unions, intersections, utility types, function types, tuples, and advanced type composition.

---

## 6. Type Narrowing

## Simple meaning

Type narrowing means reducing a broad type into a more specific type before using it.

function printValue(value: string | number) \{  
  if (typeof value \=== "string") \{  
    console.log(value.toUpperCase());  
  \} else \{  
    console.log(value.toFixed(2));  
  \}  
\}

## `typeof` guards

function format(value: string | number) \{  
  if (typeof value \=== "string") \{  
    return value.trim();  
  \}

  return value.toFixed(2);  
\}

## `instanceof` guards

function formatDate(value: Date | string) \{  
  if (value instanceof Date) \{  
    return value.toISOString();  
  \}

  return value.toUpperCase();  
\}

## `in` operator

type Admin \= \{  
  role: "admin";  
  permissions: string\[\];  
\};

type User \= \{  
  role: "user";  
  email: string;  
\};

function handleAccount(account: Admin | User) \{  
  if ("permissions" in account) \{  
    console.log(account.permissions);  
  \} else \{  
    console.log(account.email);  
  \}  
\}

## Equality narrowing

type Status \= "success" | "error";

function handle(status: Status) \{  
  if (status \=== "success") \{  
    return "Show success UI";  
  \}

  return "Show error UI";  
\}

## User-defined type guards

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

function handle(value: unknown) \{  
  if (isUser(value)) \{  
    console.log(value.name);  
  \}  
\}

## Assertion functions

function assertIsString(value: unknown): asserts value is string \{  
  if (typeof value \!== "string") \{  
    throw new Error("Expected string");  
  \}  
\}

function format(value: unknown) \{  
  assertIsString(value);

  return value.toUpperCase();  
\}

## Interview-ready answer

Type narrowing is how TypeScript refines a broad type into a specific type using checks like `typeof`, `instanceof`, `in`, equality checks, user-defined type guards, or assertion functions. It is especially important when working with union types, unknown data, API responses, and discriminated unions.

---

## 7. Generics

## Simple meaning

Generics allow types to be passed like parameters.

They help write reusable code while preserving type safety.

function identity\<T\>(value: T): T \{  
  return value;  
\}

const name \= identity\<string\>("Akhilesh");  
const age \= identity\<number\>(33);

TypeScript can often infer the generic type.

const name \= identity("Akhilesh");  
// inferred as string

## Why generics?

Without generics:

function first(items: any\[\]) \{  
  return items\[0\];  
\}

This loses type safety.

With generics:

function first\<T\>(items: T\[\]): T \{  
  return items\[0\];  
\}

const value \= first(\["React", "TypeScript"\]);  
// inferred as string

## Generic interfaces

interface ApiResponse\<T\> \{  
  data: T;  
  status: number;  
  error?: string;  
\}

type User \= \{  
  id: number;  
  name: string;  
\};

const response: ApiResponse\<User\> \= \{  
  data: \{ id: 1, name: "Akhilesh" \},  
  status: 200,  
\};

## Generic type aliases

type Nullable\<T\> \= T | null;

type NullableUser \= Nullable\<User\>;

## Generic classes

class Store\<T\> \{  
  private state: T;

  constructor(initialState: T) \{  
    this.state \= initialState;  
  \}

  getState(): T \{  
    return this.state;  
  \}  
\}

## Multiple generic parameters

function mapValue\<T, U\>(value: T, mapper: (item: T) \=\> U): U \{  
  return mapper(value);  
\}

const length \= mapValue("React", (value) \=\> value.length);  
// inferred as number

## Generic constraints

function getId\<T extends \{ id: string \}\>(item: T): string \{  
  return item.id;  
\}

getId(\{ id: "1", name: "Akhilesh" \}); // OK

## Default generic types

type ApiResponse\<T \= unknown\> \= \{  
  data: T;  
  status: number;  
\};

## Generic repository pattern

interface Repository\<T, Id \= string\> \{  
  findById(id: Id): Promise\<T\>;  
  save(item: T): Promise\<void\>;  
\}

type User \= \{  
  id: string;  
  name: string;  
\};

class UserRepository implements Repository\<User\> \{  
  async findById(id: string): Promise\<User\> \{  
    return \{ id, name: "Akhilesh" \};  
  \}

  async save(user: User): Promise\<void\> \{  
    console.log(user);  
  \}  
\}

## Interview-ready answer

Generics allow us to write reusable code without losing type information. Instead of using `any`, we use type parameters like `<T>` so the input and output relationship stays type-safe. Generics are useful for API responses, reusable components, repositories, hooks, utility functions, and data structures.

---

## 8. Advanced Types

## `keyof`

`keyof` creates a union of keys from a type.

type User \= \{  
  id: number;  
  name: string;  
\};

type UserKeys \= keyof User;  
// "id" | "name"

Practical example:

function getValue\<T, K extends keyof T\>(obj: T, key: K): T\[K\] \{  
  return obj\[key\];  
\}

const user \= \{ id: 1, name: "Akhilesh" \};

const name \= getValue(user, "name");  
// inferred as string

## `typeof`

In TypeScript, `typeof` can create a type from a value.

const config \= \{  
  apiUrl: "/api",  
  retryCount: 3,  
\};

type Config \= typeof config;

## Indexed access types

type User \= \{  
  id: number;  
  profile: \{  
    name: string;  
  \};  
\};

type Profile \= User\["profile"\];  
type Name \= User\["profile"\]\["name"\];

## Conditional types

type IsString\<T\> \= T extends string ? true : false;

type A \= IsString\<string\>; // true  
type B \= IsString\<number\>; // false

## `infer`

`infer` extracts a type inside conditional types.

type MyReturnType\<T\> \= T extends (...args: any\[\]) \=\> infer R ? R : never;

function getUser() \{  
  return \{ id: 1, name: "Akhilesh" \};  
\}

type User \= MyReturnType\<typeof getUser\>;

## Template literal types

type EventName \= "click" | "hover";

type HandlerName \= \`on$\{Capitalize\<EventName\>\}\`;  
// "onClick" | "onHover"

## Recursive types

type TreeNode \= \{  
  id: string;  
  children?: TreeNode\[\];  
\};

## Interview-ready answer

Advanced TypeScript types help derive and transform types from existing types. `keyof` creates a union of keys, `typeof` creates a type from a value, indexed access gets nested property types, conditional types select types based on conditions, and `infer` extracts types from complex structures. These are useful for reusable libraries, API clients, forms, and strongly typed state.

---

## 9. Mapped Types

## Simple meaning

Mapped types create new types by looping over keys of another type.

type User \= \{  
  id: number;  
  name: string;  
\};

type OptionalUser \= \{  
  \[K in keyof User\]?: User\[K\];  
\};

## Key syntax

type MyMappedType\<T\> \= \{  
  \[K in keyof T\]: T\[K\];  
\};

## Make all properties readonly

type MyReadonly\<T\> \= \{  
  readonly \[K in keyof T\]: T\[K\];  
\};

## Make all properties optional

type MyPartial\<T\> \= \{  
  \[K in keyof T\]?: T\[K\];  
\};

## Remove readonly modifier

type Mutable\<T\> \= \{  
  \-readonly \[K in keyof T\]: T\[K\];  
\};

## Remove optional modifier

type RequiredType\<T\> \= \{  
  \[K in keyof T\]-?: T\[K\];  
\};

## Interview-ready answer

Mapped types create new types by iterating over the keys of an existing type using `[K in keyof T]`. They are the foundation of utility types like `Partial`, `Required`, `Readonly`, `Pick`, and `Record`. They are useful when we want to transform object types dynamically.

---

## 10. Utility Types

## Simple meaning

Utility types are built-in reusable type helpers.

They transform existing types into new types.

## Common utility types

type User \= \{  
  id: string;  
  name: string;  
  email?: string;  
\};

### `Partial<T>`

Makes all properties optional.

type PartialUser \= Partial\<User\>;

### `Required<T>`

Makes all properties required.

type RequiredUser \= Required\<User\>;

### `Readonly<T>`

Makes all properties readonly.

type ReadonlyUser \= Readonly\<User\>;

### `Pick<T, K>`

Selects specific properties.

type UserPreview \= Pick\<User, "id" | "name"\>;

### `Omit<T, K>`

Removes specific properties.

type PublicUser \= Omit\<User, "email"\>;

### `Record<K, T>`

Creates an object type with keys `K` and values `T`.

type Role \= "admin" | "user";

type Permissions \= Record\<Role, string\[\]\>;

### `Exclude<T, U>`

Removes union members.

type Status \= "idle" | "loading" | "success" | "error";

type FinalStatus \= Exclude\<Status, "idle" | "loading"\>;  
// "success" | "error"

### `Extract<T, U>`

Keeps matching union members.

type ErrorStatus \= Extract\<Status, "error" | "failed"\>;  
// "error"

### `NonNullable<T>`

Removes `null` and `undefined`.

type Name \= string | null | undefined;

type SafeName \= NonNullable\<Name\>;  
// string

### `ReturnType<T>`

Gets function return type.

function getUser() \{  
  return \{ id: "1", name: "Akhilesh" \};  
\}

type User \= ReturnType\<typeof getUser\>;

### `Parameters<T>`

Gets function parameter types as tuple.

function createUser(name: string, age: number) \{\}

type CreateUserArgs \= Parameters\<typeof createUser\>;  
// \[name: string, age: number\]

## Implement `Pick`

type MyPick\<T, K extends keyof T\> \= \{  
  \[P in K\]: T\[P\];  
\};

## Implement `Omit`

type MyOmit\<T, K extends keyof T\> \= \{  
  \[P in Exclude\<keyof T, K\>\]: T\[P\];  
\};

## Interview-ready answer

Utility types are built-in helpers that transform existing types. `Partial`, `Required`, `Readonly`, `Pick`, `Omit`, `Record`, `Exclude`, `Extract`, `ReturnType`, and `Parameters` are very common in real frontend code. They help avoid duplicate type definitions and make types easier to compose and reuse.

---

## 11. Enums and Literal Types

## Literal types

Literal types allow exact values.

type Status \= "success" | "error" | "loading";

let status: Status \= "success";

status \= "failed";  
// TypeScript error: Type '"failed"' is not assignable to type 'Status'.

## Numeric enum

enum Direction \{  
  Up,  
  Down,  
  Left,  
  Right,  
\}

console.log(Direction.Up); // 0

## String enum

enum Status \{  
  Success \= "success",  
  Error \= "error",  
\}

## Const enum

`const enum` can be inlined during compilation, but it has build-tooling trade-offs and is less common in modern frontend apps.

## Enum vs union types

type Status \= "success" | "error";

const STATUS \= \{  
  Success: "success",  
  Error: "error",  
\} as const;

type StatusFromObject \= typeof STATUS\[keyof typeof STATUS\];

## Interview-ready answer

Enums define named constants, while union literal types define a set of allowed exact values. In many frontend apps, union literal types are preferred because they are simple, tree-shaking friendly, and work naturally with string values from APIs. Enums are useful when a team wants a named runtime object, but they can add emitted JavaScript.

---

## 12. Classes in TypeScript

## Simple meaning

TypeScript adds type safety to JavaScript classes.

class User \{  
  constructor(public id: string, public name: string) \{\}

  greet(): string \{  
    return \`Hello $\{this.name\}\`;  
  \}  
\}

## Access modifiers

class User \{  
  public name: string;  
  private token: string;  
  protected role: string;

  constructor(name: string, token: string, role: string) \{  
    this.name \= name;  
    this.token \= token;  
    this.role \= role;  
  \}  
\}

* `public`: accessible everywhere.  
* `private`: accessible only inside the class.  
* `protected`: accessible inside class and subclasses.

## Readonly members

class User \{  
  readonly id: string;

  constructor(id: string) \{  
    this.id \= id;  
  \}  
\}

## Abstract classes

abstract class BaseRepository\<T\> \{  
  abstract findById(id: string): Promise\<T\>;

  log() \{  
    console.log("Repository called");  
  \}  
\}

## Implementing interfaces

interface Printable \{  
  print(): void;  
\}

class Report implements Printable \{  
  print(): void \{  
    console.log("Printing report");  
  \}  
\}

## Abstract class vs interface

| Point | Abstract class | Interface |
| ----- | ----- | ----- |
| Runtime output | Exists in JS | Type-only |
| Can have implementation | Yes | No runtime implementation |
| Multiple inheritance | No | Class can implement many interfaces |
| Use case | Shared base behavior | Contract shape |

## Interview-ready answer

TypeScript classes support access modifiers, readonly members, parameter properties, inheritance, abstract classes, and interface implementation. An interface defines a contract only, while an abstract class can provide shared implementation and runtime behavior. Use interfaces for shape contracts and abstract classes when subclasses need shared logic.

---

## 13. Modules and Namespaces

## ES Modules

Modern TypeScript usually uses ES Modules.

// user.ts  
\export type User \= \{  
  id: string;  
  name: string;  
\};

\export function getUserName(user: User): string \{  
  return user.name;  
\}

// app.ts  
\import \{ getUserName, type User \} from "./user";

## Re-exporting

\export \* from "./user";  
\export \* from "./permissions";

## Namespace basics

Namespaces were used to organize code before ES Modules became standard.

namespace Utils \{  
  \export function format(value: string) \{  
    return value.trim();  
  \}  
\}

## Namespace vs Module

Interview-ready answer: ES Modules are the modern standard for organizing TypeScript code using `import` and `export`. Namespaces are older and mostly useful for legacy code or global type organization. In modern frontend apps with bundlers, ES Modules are preferred.

---

## 14. Decorators

## Simple meaning

Decorators add metadata or behavior to classes, methods, properties, or parameters.

They are especially important in Angular.

@Component(\{  
  selector: "app-user",  
  templateUrl: "./user.component.html",  
\})  
\export class UserComponent \{\}

## Angular use cases

Angular uses decorators to tell the framework how classes should behave.

Common examples:

* `@Component`  
* `@Injectable`  
* `@Input`  
* `@Output`  
* `@Directive`  
* `@Pipe`  
* `@NgModule`

## Mental model

A decorator is a function applied to a class/member to attach metadata or modify behavior.

## Interview-ready answer

Decorators are functions that attach metadata or behavior to classes, methods, properties, or parameters. Angular uses decorators heavily to define components, services, inputs, outputs, directives, pipes, and modules. In Angular, decorators connect TypeScript classes with Angular’s runtime framework behavior.

---

## 15. TypeScript Configuration

## Simple meaning

`tsconfig.json` controls how TypeScript checks and compiles code.

## Important options

\{  
  "compilerOptions": \{  
    "strict": true,  
    "noImplicitAny": true,  
    "strictNullChecks": true,  
    "target": "ES2020",  
    "module": "ESNext",  
    "sourceMap": true  
  \}  
\}

## `strict`

Enables a group of strict type-checking options.

## `noImplicitAny`

Prevents TypeScript from silently using `any`.

function greet(name) \{  
  return name.toUpperCase();  
\}  
// TypeScript error when noImplicitAny is true

## `strictNullChecks`

Makes `null` and `undefined` explicit.

let name: string \= undefined;  
// TypeScript error when strictNullChecks is true

## `target`

Controls the JavaScript version TypeScript outputs.

## `module`

Controls module output format.

## Source maps

Source maps help debug original TypeScript code in the browser.

## Build flow

TypeScript source code is checked and transpiled into JavaScript. Type information is removed at runtime.

## Interview-ready answer

`tsconfig.json` controls TypeScript compilation and type checking. Important options include `strict`, `noImplicitAny`, `strictNullChecks`, `target`, `module`, and `sourceMap`. In production apps, `strict` mode improves safety by catching more issues early. TypeScript types are erased after compilation, so runtime validation is still needed for external data.

---

## 16. Declaration Files

## Simple meaning

`.d.ts` files describe the types of JavaScript code.

They contain type declarations but no runtime implementation.

// analytics.d.ts  
declare function trackEvent(eventName: string): void;

## Ambient declarations

Use `declare` when something exists at runtime but TypeScript does not know its type.

declare const APP\_VERSION: string;

## Third-party libraries

Many libraries include their own types. Others use `@types` packages.

npm install \--save-dev @types/lodash

## DefinitelyTyped

DefinitelyTyped is the community repository where many `@types` packages come from.

## Interview-ready answer

Declaration files tell TypeScript the types of JavaScript code that exists elsewhere. They are useful for external libraries, global variables, legacy JavaScript, and runtime-injected values. `.d.ts` files do not produce JavaScript; they only provide type information.

---

## 17. TypeScript with React

## Typing props

type ButtonProps \= \{  
  label: string;  
  disabled?: boolean;  
  onClick: () \=\> void;  
\};

function Button(\{ label, disabled, onClick \}: ButtonProps) \{  
  return (  
    \<button disabled=\{disabled\} onClick=\{onClick\}\>  
      \{label\}  
    \</button\>  
  );  
\}

## Typing state

type User \= \{  
  id: string;  
  name: string;  
\};

const \[user, setUser\] \= useState\<User | null\>(null);

## Typing events

function SearchBox() \{  
  function handleChange(event: React.ChangeEvent\<HTMLInputElement\>) \{  
    console.log(event.target.value);  
  \}

  return \<input onChange=\{handleChange\} /\>;  
\}

Common React event types:

React.ChangeEvent\<HTMLInputElement\>  
React.MouseEvent\<HTMLButtonElement\>  
React.KeyboardEvent\<HTMLInputElement\>  
React.FormEvent\<HTMLFormElement\>

## `useRef`

const inputRef \= useRef\<HTMLInputElement | null\>(null);

inputRef.current?.focus();

## `useReducer`

type State \= \{  
  count: number;  
\};

type Action \=  
  | \{ type: "increment" \}  
  | \{ type: "decrement" \}  
  | \{ type: "reset"; value: number \};

function reducer(state: State, action: Action): State \{  
  switch (action.type) \{  
    case "increment":  
      return \{ count: state.count \+ 1 \};  
    case "decrement":  
      return \{ count: state.count \- 1 \};  
    case "reset":  
      return \{ count: action.value \};  
    default:  
      return state;  
  \}  
\}

## Generic component

type SelectProps\<T\> \= \{  
  items: T\[\];  
  getLabel: (item: T) \=\> string;  
  onSelect: (item: T) \=\> void;  
\};

function Select\<T\>(\{ items, getLabel, onSelect \}: SelectProps\<T\>) \{  
  return (  
    \<ul\>  
      \{items.map((item, index) \=\> (  
        \<li key=\{index\} onClick=\{() \=\> onSelect(item)\}\>  
          \{getLabel(item)\}  
        \</li\>  
      ))\}  
    \</ul\>  
  );  
\}

## ForwardRef

type InputProps \= \{  
  label: string;  
\};

const Input \= React.forwardRef\<HTMLInputElement, InputProps\>(  
  function Input(\{ label \}, ref) \{  
    return (  
      \<label\>  
        \{label\}  
        \<input ref=\{ref\} /\>  
      \</label\>  
    );  
  \}  
);

## Interview-ready answer

In React with TypeScript, we type props, state, events, refs, reducers, context, and reusable components. For `useState`, we use explicit generics when the initial value is `null` or ambiguous. For events, we use React event types like `ChangeEvent`, `MouseEvent`, and `FormEvent`. For reusable components, generics help preserve the item type instead of falling back to `any`.

---

## 18. Advanced TypeScript for Senior Engineers

## Discriminated unions

Discriminated unions model different states safely.

type ApiState\<T\> \=  
  | \{ status: "idle" \}  
  | \{ status: "loading" \}  
  | \{ status: "success"; data: T \}  
  | \{ status: "error"; error: string \};

function renderState\<T\>(state: ApiState\<T\>) \{  
  switch (state.status) \{  
    case "idle":  
      return "Idle";  
    case "loading":  
      return "Loading";  
    case "success":  
      return state.data;  
    case "error":  
      return state.error;  
  \}  
\}

## Exhaustiveness checking

function assertNever(value: never): never \{  
  throw new Error(\`Unexpected value: $\{value\}\`);  
\}

function renderStatus(status: ApiState\<User\>) \{  
  switch (status.status) \{  
    case "idle":  
      return "Idle";  
    case "loading":  
      return "Loading";  
    case "success":  
      return status.data.name;  
    case "error":  
      return status.error;  
    default:  
      return assertNever(status);  
  \}  
\}

## API response typing

type ApiResponse\<T\> \= \{  
  data: T;  
  status: number;  
  message?: string;  
\};

type User \= \{  
  id: string;  
  name: string;  
\};

async function fetchUser(): Promise\<ApiResponse\<User\>\> \{  
  const response \= await fetch("/api/user");  
  return response.json();  
\}

Important: TypeScript does not validate runtime response shape automatically.

## Type-safe event system

type AppEvents \= \{  
  "user:login": \{ id: string; name: string \};  
  "theme:change": \{ theme: "light" | "dark" \};  
\};

class TypedEventBus\<Events extends Record\<string, unknown\>\> \{  
  private listeners \= new Map\<keyof Events, Set\<(payload: any) \=\> void\>\>();

  on\<K extends keyof Events\>(event: K, listener: (payload: Events\[K\]) \=\> void) \{  
    if (\!this.listeners.has(event)) \{  
      this.listeners.set(event, new Set());  
    \}

    this.listeners.get(event)\!.add(listener);

    return () \=\> \{  
      this.listeners.get(event)?.delete(listener);  
    \};  
  \}

  emit\<K extends keyof Events\>(event: K, payload: Events\[K\]) \{  
    this.listeners.get(event)?.forEach((listener) \=\> listener(payload));  
  \}  
\}

const bus \= new TypedEventBus\<AppEvents\>();

bus.emit("theme:change", \{ theme: "dark" \}); // OK

bus.emit("theme:change", \{ theme: "blue" \});  
// TypeScript error: Type '"blue"' is not assignable to type '"light" | "dark"'.

## Domain modeling

Good TypeScript is not just adding types everywhere. It is about modeling valid business states.

Bad:

type Booking \= \{  
  status: string;  
  data?: unknown;  
  error?: string;  
\};

Better:

type BookingState \=  
  | \{ status: "draft" \}  
  | \{ status: "confirmed"; bookingId: string \}  
  | \{ status: "cancelled"; reason: string \};

## Interview-ready answer

Senior TypeScript is about designing types that make invalid states hard to represent. Discriminated unions, generics, utility types, mapped types, and type-safe APIs help build scalable frontend systems. For large apps, I focus on strongly typed API models, reusable generic components, safe state machines, type-safe event systems, and good domain modeling.

---

## Fastest Interview Preparation Order

## Phase 1: Most Asked

Study these first:

1. TypeScript Fundamentals  
2. `type` vs `interface`  
3. `any` vs `unknown`  
4. `void` vs `never`  
5. Union and intersection types  
6. Type narrowing and type guards  
7. Generics and constraints  
8. Utility types  
9. React props, hooks, events, and reusable components

This covers most frontend TypeScript interview questions.

## Phase 2: Senior Level

Study these next:

1. Advanced types: `keyof`, `typeof`, indexed access  
2. Conditional types and `infer`  
3. Mapped types  
4. Classes and abstract classes  
5. Modules and module resolution  
6. `tsconfig` strict options  
7. API response typing and runtime validation concerns

## Phase 3: Staff Level

Study these for deeper discussions:

1. Declaration files  
2. Decorators  
3. Discriminated unions and exhaustiveness  
4. Type-safe architecture  
5. Type-safe event systems  
6. Type-safe form libraries  
7. Reusable generic libraries  
8. Domain modeling

---

## Most Common TypeScript Interview Questions

## 1. What problem does TypeScript solve?

TypeScript catches type-related mistakes before runtime, improves editor support, makes refactoring safer, and helps large codebases stay maintainable. It is especially useful in frontend apps where data flows through props, state, APIs, forms, and reusable components.

## 2. `any` vs `unknown`

`any` disables type checking. `unknown` accepts any value but forces type narrowing before usage. `unknown` is safer for external or uncertain data.

## 3. `type` vs `interface`

Both can define object shapes. `interface` is best for extendable object/class contracts and supports declaration merging. `type` is more flexible and supports unions, intersections, primitives, tuples, conditional types, and advanced composition.

## 4. Union vs Intersection

Union means value can be one of many types: `A | B`. 

Intersection means value must satisfy multiple types at the same time: `A & B`.

## 5. Why generics?

Generics let us write reusable code while preserving type information. They avoid `any` and keep relationships between input and output types.

## 6. What is type narrowing?

Type narrowing is the process of refining a broad type into a specific type using checks like `typeof`, `instanceof`, `in`, equality checks, custom type guards, or discriminated unions.

## 7. What are utility types?

Utility types are built-in helpers like `Partial`, `Pick`, `Omit`, `Record`, `ReturnType`, and `Parameters` that transform existing types into new reusable types.

## 8. Enum vs union types

Enums create named constants and may emit JavaScript. Union literal types are lighter and often preferred in frontend apps for API statuses, UI states, and fixed string values.

## 9. Abstract class vs interface

An interface defines a type-only contract. An abstract class can define both a contract and shared implementation and exists at runtime.

## 10. How do you type reusable React components?

Use generics to preserve the data type passed into the component.

type ListProps\<T\> \= \{  
  items: T\[\];  
  renderItem: (item: T) \=\> React.ReactNode;  
\};

function List\<T\>(\{ items, renderItem \}: ListProps\<T\>) \{  
  return \<\>\{items.map(renderItem)\}\</\>;  
\}

---

## Final Interview-Ready Combined Answer

TypeScript is JavaScript with static typing. It helps catch mistakes during development, improves IDE support, and makes large frontend apps easier to refactor and maintain. The most important interview topics are `type` vs `interface`, `any` vs `unknown`, `void` vs `never`, union and intersection types, type narrowing, generics, utility types, and React typing. For senior interviews, focus on how TypeScript helps model real application states safely using discriminated unions, generics, mapped types, conditional types, and type-safe APIs. The strongest TypeScript answers explain not only syntax, but also how to design types that make invalid states hard to represent.

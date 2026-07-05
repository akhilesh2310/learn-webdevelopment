---
title: ES6+ Features
sidebar_position: 20
---

# ES6+ Features

## Destructuring

## Spread Operator

## Rest Operator

## Template Literals

## Default Parameters

## Optional Chaining

## Nullish Coalescing

## Symbols

## BigInt

## Common Interview Topics/Questions

* Rest vs Spread  
* Optional chaining behavior

## Modern JavaScript Features

Modern JavaScript features like destructuring, spread/rest, template literals, default parameters, optional chaining, nullish coalescing, Symbols, and BigInt help write cleaner, safer, and more expressive code. These are commonly asked in frontend interviews because they appear frequently in React, API handling, object updates, and utility functions.

---

## 1. Destructuring

Destructuring allows us to extract values from arrays or objects into variables in a shorter way.

## Simple meaning

Instead of manually accessing properties or indexes, we unpack them directly.

const user \= \{  
  name: "Akhilesh",  
  role: "Frontend Engineer",  
\};

const \{ name, role \} \= user;

console.log(name); // "Akhilesh"  
console.log(role); // "Frontend Engineer"

## Array destructuring

const colors \= \["red", "green", "blue"\];

const \[first, second\] \= colors;

console.log(first); // "red"  
console.log(second); // "green"

## Object destructuring with rename

const user \= \{  
  id: 1,  
  name: "Akhilesh",  
\};

const \{ name: userName \} \= user;

console.log(userName); // "Akhilesh"

## Default values

const user \= \{  
  name: "Akhilesh",  
\};

const \{ name, role \= "Guest" \} \= user;

console.log(name); // "Akhilesh"  
console.log(role); // "Guest"

## Nested destructuring

const response \= \{  
  data: \{  
    user: \{  
      name: "Akhilesh",  
    \},  
  \},  
\};

const \{  
  data: \{  
    user: \{ name \},  
  \},  
\} \= response;

console.log(name); // "Akhilesh"

## Practical React example

function UserCard(\{ user \}) \{  
  const \{ name, role \} \= user;

  return \`$\{name\} \- $\{role\}\`;  
\}

## Important traps

Destructuring from `undefined` or `null` throws.

const user \= undefined;

const \{ name \} \= user;  
// TypeError: Cannot destructure property 'name' of 'user' as it is undefined.

Safer:

const user \= undefined;

const \{ name \} \= user || \{\};

console.log(name); // undefined

Default values apply only when the value is `undefined`, not `null`.

const user \= \{  
  name: null,  
\};

const \{ name \= "Guest" \} \= user;

console.log(name); // null

## Interview-ready answer

Destructuring is a concise way to extract values from arrays or objects into variables. It is commonly used with API responses, React props, hooks, and function parameters. A key trap is that destructuring from `null` or `undefined` throws, so we often use defaults or optional chaining for safety.

---

## 2. Spread Operator

The spread operator `...` expands an array or object into individual elements or properties.

## Simple meaning

Spread means “open this collection here.”

const nums \= \[1, 2, 3\];

console.log(...nums); // 1 2 3

## Spread with arrays

const arr1 \= \[1, 2\];  
const arr2 \= \[3, 4\];

const combined \= \[...arr1, ...arr2\];

console.log(combined); // \[1, 2, 3, 4\]

## Spread with objects

const user \= \{  
  name: "Akhilesh",  
  role: "Frontend Engineer",  
\};

const updatedUser \= \{  
  ...user,  
  role: "UI Architect",  
\};

console.log(updatedUser);  
// \{ name: "Akhilesh", role: "UI Architect" \}

## Practical React example

setUser((prevUser) \=\> (\{  
  ...prevUser,  
  name: "Akhilesh",  
\}));

This creates a new object instead of mutating previous state.

## Important traps

Spread performs a shallow copy.

const user \= \{  
  name: "Akhilesh",  
  address: \{  
    city: "Bengaluru",  
  \},  
\};

const copy \= \{ ...user \};

copy.address.city \= "Nagpur";

console.log(user.address.city); // "Nagpur"

Why? Nested objects are still shared by reference.

Object property order matters. Later properties override earlier ones.

const user \= \{  
  name: "Akhilesh",  
  role: "Engineer",  
\};

const updated \= \{  
  ...user,  
  role: "Architect",  
\};

console.log(updated.role); // "Architect"

## Interview-ready answer

The spread operator expands arrays or objects. It is commonly used for copying arrays, merging arrays, merging objects, and updating immutable state in React. The main trap is that spread creates only a shallow copy, so nested objects still share references.

---

## 3. Rest Operator

The rest operator also uses `...`, but it collects remaining values into an array or object.

## Simple meaning

Rest means “collect the remaining values.”

function sum(...numbers) \{  
  return numbers.reduce((total, num) \=\> total \+ num, 0);  
\}

console.log(sum(1, 2, 3)); // 6

## Rest in array destructuring

const numbers \= \[1, 2, 3, 4\];

const \[first, second, ...rest\] \= numbers;

console.log(first); // 1  
console.log(second); // 2  
console.log(rest); // \[3, 4\]

## Rest in object destructuring

const user \= \{  
  id: 1,  
  name: "Akhilesh",  
  role: "Engineer",  
\};

const \{ id, ...profile \} \= user;

console.log(id); // 1  
console.log(profile); // \{ name: "Akhilesh", role: "Engineer" \}

## Practical React example

function Button(\{ label, ...buttonProps \}) \{  
  return \`\<button\>$\{label\}\</button\>\`;  
\}

In real React:

function Button(\{ label, ...buttonProps \}) \{  
  return \<button \{...buttonProps\}\>\{label\}\</button\>;  
\}

Here rest collects remaining props, and spread passes them to the button.

## Important traps

Rest parameter must be the last parameter.

function test(...args, last) \{\}  
// SyntaxError: Rest parameter must be last formal parameter

Rest collects values. Spread expands values. Same syntax, opposite behavior depending on location.

## Interview-ready answer

The rest operator collects remaining values into an array or object. It is used in function parameters, array destructuring, and object destructuring. The important point is that rest collects values, while spread expands them.

---

## 4. Template Literals

Template literals allow cleaner string creation using backticks.

## Simple meaning

They support variable interpolation and multi-line strings.

const name \= "Akhilesh";

console.log(\`Hello, $\{name\}\`); // "Hello, Akhilesh"

## Multi-line string

const message \= \`Hello Akhilesh,  
Welcome to the dashboard.\`;

console.log(message);  
// Hello Akhilesh,  
// Welcome to the dashboard.

## Expression inside template literal

const price \= 100;  
const tax \= 18;

console.log(\`Total price is $\{price \+ tax\}\`); // "Total price is 118"

## Practical frontend example

const endpoint \= \`/api/users/$\{userId\}/orders?page=$\{page\}\`;

## Tagged template literal

A tagged template lets a function process template literal parts.

function tag(strings, value) \{  
  console.log(strings); // \["Hello ", ""\]  
  console.log(value); // "Akhilesh"  
\}

const name \= "Akhilesh";

tag\`Hello $\{name\}\`;

## Interview-ready answer

Template literals use backticks and allow string interpolation, multi-line strings, and expressions inside `$\{\}`. They are useful for dynamic messages, URLs, class names, and readable string formatting.

---

## 5. Default Parameters

Default parameters allow function parameters to have default values when arguments are missing or `undefined`.

## Simple meaning

If no value is passed, use a fallback value.

function greet(name \= "Guest") \{  
  console.log(\`Hello, $\{name\}\`);  
\}

greet("Akhilesh"); // "Hello, Akhilesh"  
greet(); // "Hello, Guest"

## Important behavior

Default value is used only for `undefined`, not for `null`.

function greet(name \= "Guest") \{  
  console.log(name);  
\}

greet(undefined); // "Guest"  
greet(null); // null

## Default parameter can use previous parameter

function createUser(name, role \= \`$\{name\}-user\`) \{  
  return \{ name, role \};  
\}

console.log(createUser("Akhilesh"));  
// \{ name: "Akhilesh", role: "Akhilesh-user" \}

## Important trap: Parameter Scope

Default parameters can create a separate Parameter Scope.

var x \= 1;

function test(a \= x) \{  
  var x \= 2;  
  console.log(a);  
\}

test(); // 1

Why? `a = x` is evaluated in Parameter Scope before the Function Body Scope `var x = 2` is created.

## Interview-ready answer

Default parameters provide fallback values when arguments are missing or `undefined`. They do not apply to `null`. A deeper point is that default parameters are evaluated in the parameter scope before the function body runs.

---

## 6. Optional Chaining

Optional chaining `?.` safely accesses nested properties without throwing when something is `null` or `undefined`.

## Simple meaning

Use optional chaining when a value may not exist.

const user \= \{\};

console.log(user.profile?.email); // undefined

Without optional chaining:

const user \= \{\};

console.log(user.profile.email);  
// TypeError: Cannot read properties of undefined (reading 'email')

## Optional chaining with objects

const response \= \{  
  data: \{  
    user: \{  
      name: "Akhilesh",  
    \},  
  \},  
\};

console.log(response.data?.user?.name); // "Akhilesh"  
console.log(response.error?.message); // undefined

## Optional chaining with functions

const logger \= \{  
  log: undefined,  
\};

logger.log?.("Clicked");

// No error

## Optional chaining with arrays

const users \= \[\];

console.log(users?.\[0\]?.name); // undefined

## Important behavior

Optional chaining only stops on `null` or `undefined`.

const value \= \{  
  count: 0,  
\};

console.log(value.count?.toString()); // "0"

Answer: It works because `0` is not `null` or `undefined`.

## Common mistake

Optional chaining does not protect the root variable if it is not declared.

console.log(user?.name);  
// ReferenceError: user is not defined

Why? `user` itself is not declared in scope.

## Interview-ready answer

Optional chaining safely accesses nested properties, function calls, or array indexes when a value may be `null` or `undefined`. It returns `undefined` instead of throwing. It does not stop for other falsy values like `0`, `false`, or `""`.

---

## 7. Nullish Coalescing

Nullish coalescing `??` provides a fallback only when the left side is `null` or `undefined`.

## Simple meaning

Use `??` when only missing values should use fallback.

const name \= null;

console.log(name ?? "Guest"); // "Guest"

## Difference from `||`

`||` checks falsy values. `??` checks only `null` and `undefined`.

console.log(0 || 10); // 10  
console.log(0 ?? 10); // 0

console.log("" || "default"); // "default"  
console.log("" ?? "default"); // ""

console.log(false || true); // true  
console.log(false ?? true); // false

## Practical frontend example

const pageSize \= userSettings.pageSize ?? 20;

If `pageSize` is `0`, `??` preserves it. `||` would wrongly replace it.

## Common trap

You cannot mix `??` with `||` or `&&` without parentheses.

const value \= null || undefined ?? "fallback";  
// SyntaxError: Unexpected token '??'

Correct:

const value \= (null || undefined) ?? "fallback";

console.log(value); // "fallback"

## Interview-ready answer

Nullish coalescing provides a fallback only for `null` or `undefined`. It is safer than `||` when valid values like `0`, `false`, or empty string should not be replaced.

---

## 8. Symbols

A `Symbol` is a primitive value that creates a unique identifier.

## Simple meaning

Every symbol is unique, even if the description is the same.

const id1 \= Symbol("id");  
const id2 \= Symbol("id");

console.log(id1 \=== id2); // false

## Key mental model

Use Symbol when you need a unique property key that avoids name collision.

const id \= Symbol("id");

const user \= \{  
  name: "Akhilesh",  
  \[id\]: 123,  
\};

console.log(user\[id\]); // 123

## Symbols are not included in normal object iteration

const id \= Symbol("id");

const user \= \{  
  name: "Akhilesh",  
  \[id\]: 123,  
\};

console.log(Object.keys(user)); // \["name"\]  
console.log(Object.getOwnPropertySymbols(user)); // \[Symbol(id)\]

## Global Symbol registry

const s1 \= Symbol.for("app.id");  
const s2 \= Symbol.for("app.id");

console.log(s1 \=== s2); // true

## Practical use cases

* Avoid property name collisions.  
* Define internal metadata keys.  
* Built-in symbols like `Symbol.iterator`.  
* Custom iterable behavior.

const range \= \{  
  start: 1,  
  end: 3,

  \[Symbol.iterator\]() \{  
    let current \= this.start;  
    const end \= this.end;

    return \{  
      next() \{  
        if (current \<= end) \{  
          return \{ value: current++, done: false \};  
        \}

        return \{ value: undefined, done: true \};  
      \},  
    \};  
  \},  
\};

console.log(\[...range\]); // \[1, 2, 3\]

## Interview-ready answer

A Symbol is a primitive unique value often used as an object key to avoid property name collisions. Symbols are not included in normal `Object.keys()` iteration, and built-in symbols like `Symbol.iterator` allow objects to customize JavaScript behavior.

---

## 9. BigInt

`BigInt` is used to represent integers larger than JavaScript’s safe number limit.

## Simple meaning

Use BigInt when normal `Number` cannot safely represent very large integers.

const big \= 9007199254740993n;

console.log(big); // 9007199254740993n

## Why BigInt exists

JavaScript numbers are floating-point values and can safely represent integers only up to `Number.MAX_SAFE_INTEGER`.

console.log(Number.MAX\_SAFE\_INTEGER); // 9007199254740991

console.log(9007199254740991 \+ 1); // 9007199254740992  
console.log(9007199254740991 \+ 2); // 9007199254740992

Answer: Precision is lost after the safe integer limit.

## BigInt operations

const a \= 10n;  
const b \= 3n;

console.log(a \+ b); // 13n  
console.log(a \* b); // 30n  
console.log(a / b); // 3n

Answer: BigInt division removes the decimal part because BigInt represents integers only.

## Important trap

You cannot mix BigInt and Number directly.

console.log(10n \+ 5);  
// TypeError: Cannot mix BigInt and other types, use explicit conversions

Correct:

console.log(10n \+ BigInt(5)); // 15n  
console.log(Number(10n) \+ 5); // 15

## Practical use cases

* Very large IDs.  
* Financial systems requiring precise integer representation.  
* Cryptography.  
* Backend-generated numeric IDs beyond safe integer range.

In frontend apps, large IDs are often kept as strings to avoid precision issues.

## Interview-ready answer

BigInt is a primitive type for representing integers larger than `Number.MAX_SAFE_INTEGER`. It is created using `n` or `BigInt()`. BigInt cannot be directly mixed with Number, and for frontend API IDs, large values are often handled as strings to avoid precision loss.

---

## Common Interview Topics / Questions

---

## 1. Rest vs Spread

## Simple answer

Rest collects values. Spread expands values. Both use `...`, but their meaning depends on where they are used.

## Spread example

const nums \= \[1, 2, 3\];

console.log(...nums); // 1 2 3

## Rest example

function sum(...nums) \{  
  return nums.reduce((total, num) \=\> total \+ num, 0);  
\}

console.log(sum(1, 2, 3)); // 6

## In React props

function Button(\{ label, ...props \}) \{  
  return \<button \{...props\}\>\{label\}\</button\>;  
\}

Here:

* `...props` in parameter destructuring is rest, because it collects remaining props.  
* `...props` inside JSX is spread, because it expands props onto the button.

## Interview-ready answer

Rest and spread use the same `...` syntax but do opposite things. Rest collects remaining values into an array or object, usually in function parameters or destructuring. Spread expands arrays or objects into individual values or properties, usually for copying, merging, or passing props.

---

## 2. Optional Chaining Behavior

## Simple answer

Optional chaining returns `undefined` instead of throwing when the value before `?.` is `null` or `undefined`.

const user \= \{\};

console.log(user.profile?.email); // undefined

Without it:

const user \= \{\};

console.log(user.profile.email);  
// TypeError: Cannot read properties of undefined (reading 'email')

## Important behavior with falsy values

const obj \= \{  
  count: 0,  
  active: false,  
  name: "",  
\};

console.log(obj.count?.toString()); // "0"  
console.log(obj.active?.toString()); // "false"  
console.log(obj.name?.length); // 0

Answer: Optional chaining does not stop for `0`, `false`, or `""`. It only stops for `null` or `undefined`.

## Function call behavior

const analytics \= \{\};

analytics.track?.("button\_click");

// No error

If `track` exists and is callable, it runs. If it is `null` or `undefined`, it returns `undefined`.

## Important trap

Optional chaining does not protect undeclared variables.

console.log(user?.name);  
// ReferenceError: user is not defined

## Interview-ready answer

Optional chaining safely accesses nested properties, array elements, or function calls. It short-circuits only when the value before `?.` is `null` or `undefined`, returning `undefined`. It does not short-circuit on other falsy values like `0`, `false`, or empty string, and it does not protect undeclared variables.

---

## 3. Nullish Coalescing vs OR

## Simple answer

`??` uses fallback only for `null` or `undefined`. `||` uses fallback for any falsy value.

console.log(0 || 100); // 100  
console.log(0 ?? 100); // 0

console.log("" || "Guest"); // "Guest"  
console.log("" ?? "Guest"); // ""

console.log(false || true); // true  
console.log(false ?? true); // false

## Practical frontend example

const retryCount \= config.retryCount ?? 3;

If `retryCount` is `0`, we preserve `0`. This is useful because `0` can be a valid configuration.

## Interview-ready answer

`??` is safer than `||` when `0`, `false`, or empty string are valid values. `??` only falls back for `null` or `undefined`, while `||` falls back for all falsy values.

---

## 4. Destructuring with Default Values

## Simple answer

Default values in destructuring are used only when the extracted value is `undefined`.

const user \= \{  
  name: undefined,  
  role: null,  
\};

const \{ name \= "Guest", role \= "User" \} \= user;

console.log(name); // "Guest"  
console.log(role); // null

## Important trap

Destructuring from `undefined` throws.

const user \= undefined;

const \{ name \= "Guest" \} \= user;  
// TypeError: Cannot read properties of undefined (reading 'name')

Correct:

const user \= undefined;

const \{ name \= "Guest" \} \= user || \{\};

console.log(name); // "Guest"

## Interview-ready answer

Destructuring default values apply only when the value is `undefined`, not when it is `null`. Also, destructuring from `null` or `undefined` throws, so we should provide a safe fallback object when needed.

---

## 5. Shallow Copy with Spread

## Simple answer

Spread creates a shallow copy, not a deep copy.

const user \= \{  
  name: "Akhilesh",  
  address: \{  
    city: "Bengaluru",  
  \},  
\};

const copy \= \{ ...user \};

copy.address.city \= "Nagpur";

console.log(user.address.city); // "Nagpur"

## Why?

The top-level object is copied, but nested objects are still shared by reference.

## Interview-ready answer

Spread is useful for copying arrays and objects, but it only creates a shallow copy. If the object has nested references, those references are shared. For deeply nested updates, we need nested spread, structured cloning, or immutable utilities depending on the case.

---

## 6. Default Parameters and `null`

## Simple answer

Default parameters work only for `undefined`, not `null`.

function greet(name \= "Guest") \{  
  console.log(name);  
\}

greet(); // "Guest"  
greet(undefined); // "Guest"  
greet(null); // null

## Interview-ready answer

Default parameters are applied when the argument is missing or explicitly `undefined`. They are not applied for `null`, because `null` is treated as an intentional value.

---

## 7. Symbol Use Cases

## Simple answer

Symbols create unique keys and help avoid property name collisions.

const id \= Symbol("id");

const user \= \{  
  name: "Akhilesh",  
  \[id\]: 123,  
\};

console.log(Object.keys(user)); // \["name"\]  
console.log(user\[id\]); // 123

## Interview-ready answer

Symbols are useful for unique object keys, internal metadata, and customizing language behavior using built-in symbols like `Symbol.iterator`. Each normal `Symbol()` call creates a unique value.

---

## 8. BigInt Use Cases and Trap

## Simple answer

BigInt is used for integers beyond JavaScript’s safe number range.

console.log(Number.MAX\_SAFE\_INTEGER); // 9007199254740991

const id \= 9007199254740993n;

console.log(id); // 9007199254740993n

## Trap

console.log(10n \+ 5);  
// TypeError: Cannot mix BigInt and other types, use explicit conversions

## Interview-ready answer

BigInt is used when we need exact representation of very large integers. It cannot be mixed directly with Number, so explicit conversion is required. In frontend apps, very large backend IDs are often treated as strings to avoid precision loss.

---

## Quick Revision Summary

| Feature | Key point |
| ----- | ----- |
| Destructuring | Extract values from arrays/objects |
| Spread | Expands values/properties |
| Rest | Collects remaining values |
| Template literals | Backticks, interpolation, multi-line strings |
| Default parameters | Used only for `undefined`, not `null` |
| Optional chaining | Stops only on `null` or `undefined` |
| Nullish coalescing | Fallback only for `null` or `undefined` |
| Symbol | Unique primitive identifier |
| BigInt | Large integer primitive |
| Spread copy | Shallow copy only |
| Rest parameter | Must be last parameter |

---

## Final Interview-Ready Combined Answer

Modern JavaScript features help write cleaner and safer code. Destructuring extracts values from arrays and objects. Spread expands arrays or objects, while rest collects remaining values. Template literals make dynamic strings easier. Default parameters provide fallback values for `undefined`. Optional chaining safely accesses nested data when values may be `null` or `undefined`, and nullish coalescing gives fallback only for nullish values. Symbols create unique identifiers, and BigInt handles integers beyond JavaScript’s safe number range. In interviews, the most important traps are rest vs spread, shallow copy with spread, optional chaining behavior, `??` vs `||`, and default parameters not applying to `null`.

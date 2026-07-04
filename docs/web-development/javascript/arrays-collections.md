---
title: Arrays & Collections
sidebar_position: 16
---

# Arrays & Collections

Indexed & Keyed collections: [http://webmobtuts.com/javascript/javascript-keyed-and-indexed-collections-array-map-and-set/](http://webmobtuts.com/javascript/javascript-keyed-and-indexed-collections-array-map-and-set/)

## JavaScript Array Methods, Set, Map, WeakSet, WeakMap

JavaScript array methods are commonly asked because they test iteration, immutability, callbacks, return values, performance, and real frontend use cases. For interviews, focus on: what each method returns, whether it mutates original data, when to use it, and common traps.

---

## JavaScript Array Methods (28):

| SN | Method | Description |
| :---- | :---- | :---- |
| 1 | [concat()](https://www.w3schools.com/jsref/jsref_concat_array.asp) | Joins two or more arrays, and returns a copy of the joined arrays cost newArr \= *arr1*.concat(*arr2*, *arr3*, ..., *arrX*); |
| 2 | [copyWithin()](https://www.w3schools.com/jsref/jsref_copywithin.asp) | Copies array elements within the array, to and from specified positions cost updatedArr \= array.copyWithin(target, start, end)  |
| 3 | [entries()](https://www.w3schools.com/jsref/jsref_entries.asp) | Returns a key/value pair Array Iteration Object |
| 4 | [every()](https://www.w3schools.com/jsref/jsref_every.asp) | Checks if every element in an array pass a test |
| 5 | [fill()](https://www.w3schools.com/jsref/jsref_fill.asp) | Fill the elements in an array with a static value |
| **6** | [**filter()**](https://www.w3schools.com/jsref/jsref_filter.asp) | Creates a new array with every element in an array that pass a test |
| 7 | [find()](https://www.w3schools.com/jsref/jsref_find.asp) | Returns the value of the first element in an array that pass a test |
| 8 | [findIndex()](https://www.w3schools.com/jsref/jsref_findindex.asp) | Returns the index of the first element in an array that pass a test |
| 9 | [forEach()](https://www.w3schools.com/jsref/jsref_foreach.asp) | Calls a function for each array element |
| 10 | [from()](https://www.w3schools.com/jsref/jsref_from.asp) | Creates an array from an object |
| 11 | [includes()](https://www.w3schools.com/jsref/jsref_includes_array.asp) | Check if an array contains the specified element |
| 12 | [indexOf()](https://www.w3schools.com/jsref/jsref_indexof_array.asp) | Search the array for an element and returns its position |
| 13 | [isArray()](https://www.w3schools.com/jsref/jsref_isarray.asp) | Checks whether an object is an array |
| 14 | [join()](https://www.w3schools.com/jsref/jsref_join.asp) | Joins all elements of an array into a string |
| 15 | [keys()](https://www.w3schools.com/jsref/jsref_keys.asp) | Returns a Array Iteration Object, containing the keys of the original array |
| 16 | [lastIndexOf()](https://www.w3schools.com/jsref/jsref_lastindexof_array.asp) | Search the array for an element, starting at the end, and returns its position |
| **17** | [**map()**](https://www.w3schools.com/jsref/jsref_map.asp) | Creates a new array with the result of calling a function for each array element |
| 18 | [pop()](https://www.w3schools.com/jsref/jsref_pop.asp) | Removes the last element of an array, and returns that element |
| 19 | [push()](https://www.w3schools.com/jsref/jsref_push.asp) | Adds new elements to the end of an array, and returns the new length |
| 20 | [reduce()](https://www.w3schools.com/jsref/jsref_reduce.asp) | Reduce the values of an array to a single value (going left-to-right) |
| 21 | [reduceRight()](https://www.w3schools.com/jsref/jsref_reduceright.asp) | Reduce the values of an array to a single value (going right-to-left) |
| 22 | [reverse()](https://www.w3schools.com/jsref/jsref_reverse.asp) | Reverses the order of the elements in an array |
| 23 | [shift()](https://www.w3schools.com/jsref/jsref_shift.asp) | Removes the first element of an array, and returns that element |
| 24 | [slice()](https://www.w3schools.com/jsref/jsref_slice_array.asp) | Selects a part of an array, and returns the new array |
| 25 | [some()](https://www.w3schools.com/jsref/jsref_some.asp) | Checks if any of the elements in an array pass a test |
| 26 | [sort()](https://www.w3schools.com/jsref/jsref_sort.asp) | Sorts the elements of an array |
| 27 | [splice()](https://www.w3schools.com/jsref/jsref_splice.asp) | Adds/Removes elements from an array |
| 28 | [toString()](https://www.w3schools.com/jsref/jsref_tostring_array.asp) | Converts an array to a string, and returns the result |
| 29 | [unshift()](https://www.w3schools.com/jsref/jsref_unshift.asp) | Adds new elements to the beginning of an array, and returns the new length |
| 30 | [valueOf()](https://www.w3schools.com/jsref/jsref_valueof_array.asp) | Returns the primitive value of an array |

## 1\. `forEach`

## **Simple meaning**

`forEach` runs a function for every item in an array.

It is mainly used for side effects like logging, updating external variables, calling functions, or triggering actions. It does **not** return a new array.

## **Key mental model**

Use `forEach` when you want to **do something**, not when you want to **create a transformed array**.

const users \= \["Akhil", "Rahul", "Neha"\];

users.forEach((user) \=\> \{

 console.log(user);

\});

## **Important points**

* Returns `undefined`.  
* Does not create a new array.  
* Does not mutate the original array by itself, but the callback can mutate objects inside it.  
* Cannot be stopped using `break` or `return`.  
* Not ideal for async `await` flow.

## **Common trap**

const result \= \[1, 2, 3\].forEach((num) \=\> num \* 2);

console.log(result); // undefined

Answer: `forEach` returns `undefined`, so it should not be used when you need a transformed array.

## **Interview-ready answer**

`forEach` is used to iterate over an array when we want side effects. It does not return a new array and always returns `undefined`. I use it for actions like logging, triggering calls, or updating external state, but not for transforming data.

---

## 2\. `map`

## **Simple meaning**

`map` creates a **new array** by transforming each item.

Use it when input and output array lengths should remain the same.

## **Key mental model**

Use `map` when you want to convert **array of A into array of B**.

const prices \= \[100, 200, 300\];

const withTax \= prices.map((price) \=\> price \* 1.18);

console.log(withTax); // \[118, 236, 354\]

## **Practical frontend example**

const users \= \[

 \{ id: 1, name: "Akhil" \},

 \{ id: 2, name: "Rahul" \},

\];

const userNames \= users.map((user) \=\> user.name);

console.log(userNames); // \["Akhil", "Rahul"\]

## **Important points**

* Returns a new array.  
* Does not mutate original array unless callback mutates object references.  
* Output length is the same as input length.  
* Best for rendering lists in React.

users.map((user) \=\> \<UserCard key=\{user.id\} user=\{user\} /\>);

## **Common mistake**

const result \= \[1, 2, 3\].map((num) \=\> \{

 num \* 2;

\});

console.log(result); // \[undefined, undefined, undefined\]

Why? With `\{\}`, you need an explicit `return`.

Correct:

const result \= \[1, 2, 3\].map((num) \=\> \{

 return num \* 2;

\});

console.log(result); // \[2, 4, 6\]

## **Interview-ready answer**

`map` is used when we want to transform every item in an array and return a new array of the same length. It is commonly used in frontend apps to convert API data into UI models or render lists in React.

---

## 3\. `filter`

## **Simple meaning**

`filter` creates a new array with only the items that pass a condition.

## **Key mental model**

Use `filter` when you want to **keep or remove items**.

const numbers \= \[1, 2, 3, 4, 5\];

const even \= numbers.filter((num) \=\> num % 2 \=== 0);

console.log(even); // \[2, 4\]

## **Practical frontend example**

const products \= \[

 \{ name: "Phone", inStock: true \},

 \{ name: "Laptop", inStock: false \},

\];

const availableProducts \= products.filter((product) \=\> product.inStock);

console.log(availableProducts); // \[\{ name: "Phone", inStock: true \}\]

## **Important points**

* Returns a new array.  
* Does not mutate original array.  
* Output length can be smaller or equal to original array.  
* If no item matches, returns `[]`.

## **Common trap**

const result \= \[1, 2, 3\].filter((num) \=\> num \* 2);

console.log(result); // \[1, 2, 3\]

Why? `filter` expects a truthy/falsy condition. Since `num * 2` is truthy for all items, all items are kept.

## **Interview-ready answer**

`filter` is used to create a new array by keeping only the elements that match a condition. I use it for frontend cases like search filters, active records, selected items, and permission-based UI filtering.

---

## 4\. `reduce`

## **Simple meaning**

`reduce` converts an array into a single result.

That result can be a number, string, object, array, map, grouped data, or any accumulated value.

## **Key mental model**

Use `reduce` when you need to **accumulate** values.

const numbers \= \[10, 20, 30\];

const total \= numbers.reduce((acc, num) \=\> acc \+ num, 0);

console.log(total); // 60

## **How it works**

array.reduce((accumulator, currentItem) \=\> \{

 return updatedAccumulator;

\}, initialValue);

* `accumulator` stores the running result.  
* `currentItem` is the current array item.  
* `initialValue` is the starting value.

## **Important reduce use cases**

### **1\. Sum**

const total \= \[10, 20, 30\].reduce((acc, num) \=\> acc \+ num, 0);

console.log(total); // 60

### **2\. Count occurrences**

const items \= \["apple", "banana", "apple"\];

const count \= items.reduce((acc, item) \=\> \{

 acc\[item\] \= (acc\[item\] || 0\) \+ 1;

 return acc;

\}, \{\});

console.log(count); // \{ apple: 2, banana: 1 \}

### **3\. Group by property**

const users \= \[

 \{ name: "A", role: "admin" \},

 \{ name: "B", role: "user" \},

 \{ name: "C", role: "admin" \},

\];

const grouped \= users.reduce((acc, user) \=\> \{

 if (\!acc\[user.role\]) acc\[user.role\] \= \[\];

 acc\[user.role\].push(user);

 return acc;

\}, \{\});

console.log(grouped);

// \{

//   admin: \[\{ name: "A", role: "admin" \}, \{ name: "C", role: "admin" \}\],

//   user: \[\{ name: "B", role: "user" \}\]

// \}

### **4\. Convert array to object lookup**

const users \= \[

 \{ id: 1, name: "Akhil" \},

 \{ id: 2, name: "Rahul" \},

\];

const userById \= users.reduce((acc, user) \=\> \{

 acc\[user.id\] \= user;

 return acc;

\}, \{\});

console.log(userById);

// \{

//   1: \{ id: 1, name: "Akhil" \},

//   2: \{ id: 2, name: "Rahul" \}

// \}

This is very useful when repeated searching is needed.

## **Important trap**

const total \= \[\].reduce((acc, num) \=\> acc \+ num);

console.log(total);

// TypeError: Reduce of empty array with no initial value

Common mistake: Not passing `initialValue`.

Always prefer passing the initial value.

## **Trade-offs**

`reduce` is powerful, but it can become hard to read if too much logic is added inside it. For simple transformations, prefer `map` or `filter`.

## **Interview-ready answer**

`reduce` is used when we want to convert an array into a single accumulated result. That result can be a number, object, array, grouped data, or lookup map. I use it for totals, grouping, counting, flattening, and converting arrays into object maps. I usually provide an initial value to avoid errors with empty arrays.

---

## 5\. `find`

## **Simple meaning**

`find` returns the **first item** that matches a condition.

const users \= \[

 \{ id: 1, name: "Akhil" \},

 \{ id: 2, name: "Rahul" \},

\];

const user \= users.find((user) \=\> user.id \=== 2);

console.log(user); // \{ id: 2, name: "Rahul" \}

## **Important points**

* Returns the first matching element.  
* Returns `undefined` if no match is found.  
* Stops once it finds a match.  
* Useful for finding one object from API data.

## **Interview-ready answer**

`find` is used when we need the first matching item from an array. It returns the actual element, or `undefined` if nothing matches.

---

## 6\. `findIndex`

## **Simple meaning**

`findIndex` returns the index of the first item that matches a condition.

const users \= \[

 \{ id: 1, name: "Akhil" \},

 \{ id: 2, name: "Rahul" \},

\];

const index \= users.findIndex((user) \=\> user.id \=== 2);

console.log(index); // 1

## **Important points**

* Returns index.  
* Returns `-1` if no match is found.  
* Useful when you need to update or remove a specific item by index.

## **Practical example**

const cart \= \[

 \{ id: 1, qty: 1 \},

 \{ id: 2, qty: 3 \},

\];

const index \= cart.findIndex((item) \=\> item.id \=== 2);

if (index \!== \-1) \{

 cart\[index\].qty \+= 1;

\}

console.log(cart);

// \[\{ id: 1, qty: 1 \}, \{ id: 2, qty: 4 \}\]

## **Interview-ready answer**

`findIndex` is useful when we need the position of the first matching item. It returns the index if found, otherwise `-1`.

---

## 7\. `some`

## **Simple meaning**

`some` checks whether **at least one item** passes a condition.

const numbers \= \[1, 3, 5, 6\];

const hasEven \= numbers.some((num) \=\> num % 2 \=== 0);

console.log(hasEven); // true

## **Key mental model**

Use `some` for **at least one**.

## **Practical frontend example**

const permissions \= \["read", "write"\];

const canEdit \= permissions.some((permission) \=\> permission \=== "write");

console.log(canEdit); // true

## **Important points**

* Returns boolean.  
* Stops as soon as condition is true.  
* Good for validation, permission checks, and feature flags.

## **Interview-ready answer**

`some` returns `true` if at least one item satisfies the condition. It short-circuits once a match is found.

---

## 8\. `every`

## **Simple meaning**

`every` checks whether **all items** pass a condition.

const scores \= \[80, 90, 70\];

const allPassed \= scores.every((score) \=\> score \>= 40);

console.log(allPassed); // true

## **Key mental model**

Use `every` for **all must pass**.

## **Practical frontend example**

const fields \= \[

 \{ name: "email", valid: true \},

 \{ name: "password", valid: true \},

\];

const isFormValid \= fields.every((field) \=\> field.valid);

console.log(isFormValid); // true

## **Important trap**

const result \= \[\].every((item) \=\> item \> 0);

console.log(result); // true

Why? For an empty array, `every` returns `true` because no item violates the condition.

## **Interview-ready answer**

`every` returns `true` only if all elements satisfy the condition. It short-circuits when it finds the first false condition.

---

## 9\. `flat`

## **Simple meaning**

`flat` creates a new array by flattening nested arrays.

const arr \= \[1, \[2, 3\], \[4\]\];

console.log(arr.flat()); // \[1, 2, 3, 4\]

## **Important points**

* Default depth is `1`.  
* Returns a new array.  
* Does not mutate original array.

const arr \= \[1, \[2, \[3, \[4\]\]\]\];

console.log(arr.flat(1)); // \[1, 2, \[3, \[4\]\]\]

console.log(arr.flat(2)); // \[1, 2, 3, \[4\]\]

console.log(arr.flat(Infinity)); // \[1, 2, 3, 4\]

## **Practical frontend example**

const pages \= \[

 \[\{ id: 1 \}, \{ id: 2 \}\],

 \[\{ id: 3 \}, \{ id: 4 \}\],

\];

const allItems \= pages.flat();

console.log(allItems); // \[\{ id: 1 \}, \{ id: 2 \}, \{ id: 3 \}, \{ id: 4 \}\]

Useful in paginated API responses.

## **Interview-ready answer**

`flat` is used to flatten nested arrays. By default, it flattens one level, but we can pass a depth like `2` or `Infinity`.

---

## 10\. `flatMap`

## **Simple meaning**

`flatMap` does `map` first, then `flat(1)`.

const arr \= \[1, 2, 3\];

const result \= arr.flatMap((num) \=\> \[num, num \* 2\]);

console.log(result); // \[1, 2, 2, 4, 3, 6\]

## **Key mental model**

Use `flatMap` when each item can produce **zero, one, or many items**.

## **Practical example**

const users \= \[

 \{ name: "A", tags: \["react", "js"\] \},

 \{ name: "B", tags: \["ts"\] \},

\];

const tags \= users.flatMap((user) \=\> user.tags);

console.log(tags); // \["react", "js", "ts"\]

## **Important points**

* Flattens only one level.  
* More concise than `map(...).flat()`.  
* Useful for nested API data.

## **Interview-ready answer**

`flatMap` maps each item and then flattens the result by one level. It is useful when one input item can produce multiple output items.

---

## 11\. `sort`

## **Simple meaning**

`sort` arranges array items.

Important: `sort` **mutates the original array**.

## **Default behavior**

By default, JavaScript sorts values as strings.

const nums \= \[10, 2, 30\];

nums.sort();

console.log(nums); // \[10, 2, 30\]

Why? Because values are compared as strings: `"10"`, `"2"`, `"30"`.

## **Correct numeric sort**

const nums \= \[10, 2, 30\];

nums.sort((a, b) \=\> a \- b);

console.log(nums); // \[2, 10, 30\]

Descending:

const nums \= \[10, 2, 30\];

nums.sort((a, b) \=\> b \- a);

console.log(nums); // \[30, 10, 2\]

## **Sorting objects**

const products \= \[

 \{ name: "Phone", price: 500 \},

 \{ name: "Laptop", price: 1200 \},

 \{ name: "Mouse", price: 50 \},

\];

products.sort((a, b) \=\> a.price \- b.price);

console.log(products);

// \[

//   \{ name: "Mouse", price: 50 \},

//   \{ name: "Phone", price: 500 \},

//   \{ name: "Laptop", price: 1200 \}

// \]

## **Sorting strings**

const names \= \["Rahul", "Akhil", "Neha"\];

names.sort((a, b) \=\> a.localeCompare(b));

console.log(names); // \["Akhil", "Neha", "Rahul"\]

## **Important trap**

const original \= \[3, 1, 2\];

const sorted \= original.sort();

console.log(original); // \[1, 2, 3\]

console.log(sorted); // \[1, 2, 3\]

Answer: `sort` mutates the original array.

To avoid mutation:

const original \= \[3, 1, 2\];

const sorted \= \[...original\].sort((a, b) \=\> a \- b);

console.log(original); // \[3, 1, 2\]

console.log(sorted); // \[1, 2, 3\]

## **Interview-ready answer**

`sort` is used to order array elements, but the important point is that it mutates the original array. By default, it sorts values as strings, so for numbers we should pass a comparator like `(a, b) => a - b`. For objects, we compare specific fields, and for strings, `localeCompare` is useful.

---

## 12\. `Set`

## **Simple meaning**

`Set` stores unique values.

It automatically removes duplicates.

const ids \= \[1, 2, 2, 3, 3\];

const uniqueIds \= \[...new Set(ids)\];

console.log(uniqueIds); // \[1, 2, 3\]

## **Key mental model**

Use `Set` when uniqueness matters.

## **Important methods**

const set \= new Set();

set.add(1);

set.add(2);

set.add(2);

console.log(set); // Set(2) \{ 1, 2 \}

console.log(set.has(1)); // true

set.delete(1);

console.log(set.has(1)); // false

## **Practical frontend example**

const selectedIds \= new Set();

selectedIds.add(101);

selectedIds.add(102);

console.log(selectedIds.has(101)); // true

Useful for selected rows, checked items, permission IDs, unique filters, and duplicate detection.

## **Set vs Array**

| Point | Set | Array |
| ----- | ----- | ----- |
| Purpose | Unique values | Ordered list |
| Duplicates | Not allowed | Allowed |
| Lookup | Fast with `.has()` | Slower with `.includes()` for large data |
| Index access | No direct index | Supports index |
| Best use | Unique IDs, duplicate checks | Rendering lists, ordered data |

## **Important trap**

`Set` checks object references, not deep equality.

const set \= new Set();

set.add(\{ id: 1 \});

set.add(\{ id: 1 \});

console.log(set.size); // 2

Why? Both objects look same, but they are different references.

## **Interview-ready answer**

`Set` is a collection of unique values. It is useful for removing duplicates, checking existence quickly, and managing selected IDs. Compared to arrays, `Set` gives better uniqueness handling and faster lookup, but arrays are better when ordering and index-based access are needed.

---

## 13\. `Map`

## **Simple meaning**

`Map` stores key-value pairs.

Unlike objects, keys in `Map` can be of any type: string, number, object, function, etc.

const userMap \= new Map();

userMap.set(1, "Akhil");

userMap.set(2, "Rahul");

console.log(userMap.get(1)); // "Akhil"

console.log(userMap.has(2)); // true

## **Key mental model**

Use `Map` when you need a real key-value collection with frequent add, delete, lookup, or non-string keys.

## **Practical frontend example**

const cache \= new Map();

cache.set("/api/users", \{ data: \[\{ id: 1, name: "Akhil" \}\] \});

console.log(cache.get("/api/users"));

// \{ data: \[\{ id: 1, name: "Akhil" \}\] \}

Useful for caching API responses, storing metadata, lookup tables, and memoization.

## **Map vs Object**

| Point | Map | Object |
| ----- | ----- | ----- |
| Key type | Any type | Mostly string/symbol |
| Size | `.size` available | Need `Object.keys(obj).length` |
| Iteration | Directly iterable | Needs `Object.entries()` |
| Prototype keys | No accidental prototype keys | Can have prototype conflicts |
| Use case | Dynamic key-value collection | Structured data model |

## **Important trap**

const obj \= \{\};

obj\[\{\}\] \= "value1";

obj\[\{\}\] \= "value2";

console.log(obj); // \{ '\[object Object\]': 'value2' \}

Why? Object keys are converted to strings.

With `Map`:

const map \= new Map();

const key1 \= \{\};

const key2 \= \{\};

map.set(key1, "value1");

map.set(key2, "value2");

console.log(map.size); // 2

## **Interview-ready answer**

`Map` is a key-value collection where keys can be of any type. It is better than objects for dynamic collections, frequent lookups, insertions, deletions, and non-string keys. Objects are better for representing fixed structured data.

---

## 14\. `WeakSet`

## **Simple meaning**

`WeakSet` stores only objects, and those object references are weak.

If no other reference exists to an object, it can be garbage collected.

const weakSet \= new WeakSet();

let user \= \{ name: "Akhil" \};

weakSet.add(user);

console.log(weakSet.has(user)); // true

## **Key mental model**

Use `WeakSet` when you want to track objects without preventing garbage collection.

## **Important points**

* Only objects are allowed.  
* Not iterable.  
* No `.size`.  
* Useful for tracking visited objects or private object markers.

## **Common trap**

const weakSet \= new WeakSet();

weakSet.add(1);

// TypeError: Invalid value used in weak set

## **Practical use case**

const visited \= new WeakSet();

function processUser(user) \{

 if (visited.has(user)) return;

 visited.add(user);

 console.log("Processing user");

\}

Useful when tracking object processing without creating memory leaks.

## **Interview-ready answer**

`WeakSet` stores weak references to objects. It does not prevent garbage collection, so it is useful for tracking objects temporarily. It only accepts objects and is not iterable.

---

## 15\. `WeakMap`

## **Simple meaning**

`WeakMap` stores key-value pairs where keys must be objects, and those object keys are weakly referenced.

const weakMap \= new WeakMap();

let user \= \{ name: "Akhil" \};

weakMap.set(user, \{ lastActive: Date.now() \});

console.log(weakMap.get(user)); // \{ lastActive: 178... \}

## **Key mental model**

Use `WeakMap` when you want to attach private metadata to objects without preventing garbage collection.

## **Important points**

* Keys must be objects.  
* Values can be any type.  
* Not iterable.  
* No `.size`.  
* Helps avoid memory leaks.

## **Practical frontend example**

const elementData \= new WeakMap();

const button \= document.querySelector("button");

elementData.set(button, \{ clicked: 0 \});

console.log(elementData.get(button)); // \{ clicked: 0 \}

Useful for storing DOM element metadata without preventing garbage collection.

## **WeakMap vs Map**

| Point | Map | WeakMap |
| ----- | ----- | ----- |
| Key type | Any type | Only objects |
| Garbage collection | Strong reference | Weak reference |
| Iterable | Yes | No |
| `.size` | Yes | No |
| Best use | General key-value data | Private metadata, memory-safe object tracking |

## **Interview-ready answer**

`WeakMap` is like `Map`, but its keys must be objects and are weakly referenced. If the object key is no longer used anywhere else, it can be garbage collected. It is useful for private metadata and memory-safe object associations.

---

## Common Interview Questions

---

## 1\. `map` vs `forEach`

## **Simple answer**

`map` returns a new transformed array. `forEach` returns `undefined` and is used for side effects.

const nums \= \[1, 2, 3\];

const mapped \= nums.map((num) \=\> num \* 2);

const forEachResult \= nums.forEach((num) \=\> num \* 2);

console.log(mapped); // \[2, 4, 6\]

console.log(forEachResult); // undefined

## **Key differences**

| Point | `map` | `forEach` |
| ----- | ----- | ----- |
| Return value | New array | `undefined` |
| Purpose | Transformation | Side effects |
| Chainable | Yes | No |
| Output length | Same as input | No output |
| React rendering | Commonly used | Not useful directly |

## **Common mistake**

// Wrong

users.forEach((user) \=\> \<UserCard user=\{user\} /\>);

// Correct

users.map((user) \=\> \<UserCard key=\{user.id\} user=\{user\} /\>);

Answer: React needs an array of elements, and `map` returns that array. `forEach` returns `undefined`.

## **Interview-ready answer**

`map` is used when we want to transform each item and return a new array. `forEach` is used when we only want side effects and do not need a return value. In React rendering, `map` is preferred because it returns an array of elements.

---

## 2\. `filter` vs `find`

## **Simple answer**

`filter` returns all matching items as an array. `find` returns only the first matching item.

const users \= \[

 \{ id: 1, active: true \},

 \{ id: 2, active: true \},

\];

console.log(users.filter((user) \=\> user.active));

// \[\{ id: 1, active: true \}, \{ id: 2, active: true \}\]

console.log(users.find((user) \=\> user.active));

// \{ id: 1, active: true \}

## **Interview-ready answer**

Use `filter` when multiple items can match. Use `find` when we only need the first matching item.

---

## 3\. `some` vs `every`

## **Simple answer**

`some` checks if at least one item passes. `every` checks if all items pass.

const nums \= \[2, 4, 5\];

console.log(nums.some((num) \=\> num % 2 \=== 0)); // true

console.log(nums.every((num) \=\> num % 2 \=== 0)); // false

## **Interview-ready answer**

`some` is used for “at least one” condition, while `every` is used for “all must satisfy” condition. Both return boolean and short-circuit.

---

## 4\. `reduce` use cases

## **Common use cases**

Use `reduce` for:

* Sum or total.  
* Grouping data.  
* Counting frequency.  
* Converting array to object.  
* Flattening arrays.  
* Creating lookup maps.  
* Calculating derived values from API response.

## **Example: cart total**

const cart \= \[

 \{ name: "Phone", price: 500, qty: 2 \},

 \{ name: "Mouse", price: 50, qty: 1 \},

\];

const total \= cart.reduce((acc, item) \=\> \{

 return acc \+ item.price \* item.qty;

\}, 0);

console.log(total); // 1050

## **Example: group API data by status**

const tickets \= \[

 \{ id: 1, status: "open" \},

 \{ id: 2, status: "closed" \},

 \{ id: 3, status: "open" \},

\];

const grouped \= tickets.reduce((acc, ticket) \=\> \{

 if (\!acc\[ticket.status\]) acc\[ticket.status\] \= \[\];

 acc\[ticket.status\].push(ticket);

 return acc;

\}, \{\});

console.log(grouped);

// \{

//   open: \[\{ id: 1, status: "open" \}, \{ id: 3, status: "open" \}\],

//   closed: \[\{ id: 2, status: "closed" \}\]

// \}

## **Interview-ready answer**

`reduce` is useful when we need to derive one final value from an array. That final value can be a number, object, array, grouped object, or lookup map. In frontend apps, I use it for cart totals, grouped API data, frequency counts, and converting arrays into maps for faster access.

---

## 5\. `Set` vs `Array`

## **Simple answer**

Use `Array` for ordered lists. Use `Set` for unique values and fast existence checks.

const arr \= \[1, 2, 2, 3\];

const unique \= \[...new Set(arr)\];

console.log(unique); // \[1, 2, 3\]

## **Practical example**

const selectedIds \= new Set(\[101, 102\]);

console.log(selectedIds.has(101)); // true

## **Interview-ready answer**

An array is better for ordered lists, rendering, and index-based access. A `Set` is better when uniqueness and fast existence checks are important, such as selected IDs, duplicate removal, and permission checks.

---

## 6\. `Map` vs `Object`

## **Simple answer**

Use `Object` for fixed structured data. Use `Map` for dynamic key-value collections.

const user \= \{

 id: 1,

 name: "Akhil",

\};

const cache \= new Map();

cache.set("/api/users", \[\{ id: 1 \}\]);

## **Important difference**

const obj \= \{\};

const key \= \{ id: 1 \};

obj\[key\] \= "value";

console.log(obj); // \{ '\[object Object\]': 'value' \}

Object converts keys to strings.

const map \= new Map();

const key \= \{ id: 1 \};

map.set(key, "value");

console.log(map.get(key)); // "value"

## **Interview-ready answer**

Objects are good for representing structured data with known properties. `Map` is better for dynamic collections where keys can be any type, where frequent add/delete/lookup operations are needed, or where direct iteration and `.size` are useful.

---

## 7\. Important `sort` interview points

## **Key points**

* `sort` mutates the original array.  
* Default sort converts values to strings.  
* Numeric sorting needs comparator.  
* Object sorting needs field-based comparator.  
* Use spread copy before sorting if immutability matters.

const nums \= \[10, 2, 30\];

nums.sort();

console.log(nums); // \[10, 2, 30\]

Correct:

const nums \= \[10, 2, 30\];

nums.sort((a, b) \=\> a \- b);

console.log(nums); // \[2, 10, 30\]

## **Sort comparator mental model**

(a, b) \=\> a \- b

* Negative result: `a` comes before `b`.  
* Positive result: `b` comes before `a`.  
* Zero: order stays same.

## **Interview-ready answer**

JavaScript `sort` mutates the original array and sorts values as strings by default. For numbers, we should pass a comparator like `(a, b) => a - b`. For objects, we compare the specific property, and if we need immutability, we sort a copied array.

---

## 8\. Check duplicates in array

## **Using `Set`**

function hasDuplicate(arr) \{

 return new Set(arr).size \!== arr.length;

\}

console.log(hasDuplicate(\[1, 2, 3\])); // false

console.log(hasDuplicate(\[1, 2, 2\])); // true

## **Using `some` \+ `indexOf`**

function hasDuplicate(arr) \{

 return arr.some((item, index) \=\> arr.indexOf(item) \!== index);

\}

console.log(hasDuplicate(\[1, 2, 2\])); // true

## **Better answer**

For primitives, `Set` is cleaner and usually more efficient.

## **Interview-ready answer**

For primitive values, the simplest way to check duplicates is comparing `new Set(arr).size` with `arr.length`. If the size is smaller, duplicates exist.

---

## 9\. Remove duplicates from array of objects

## **Problem**

`Set` does not remove duplicate objects by value because objects are compared by reference.

const users \= \[\{ id: 1 \}, \{ id: 1 \}\];

console.log(new Set(users).size); // 2

## **Solution using `Map`**

const users \= \[

 \{ id: 1, name: "A" \},

 \{ id: 1, name: "A Updated" \},

 \{ id: 2, name: "B" \},

\];

const uniqueUsers \= \[...new Map(users.map((user) \=\> \[user.id, user\])).values()\];

console.log(uniqueUsers);

// \[\{ id: 1, name: "A Updated" \}, \{ id: 2, name: "B" \}\]

## **Interview-ready answer**

For arrays of objects, `Set` is not enough because objects are compared by reference. A common approach is to use `Map` with a unique property like `id` as the key.

---

## Important Polyfills

Polyfills are commonly asked to test how well you understand method behavior, callback handling, `thisArg`, sparse arrays, return value, and mutation.

---

## 1\. Polyfill for `map`

Array.prototype.myMap \= function (callback, thisArg) \{

 if (this \== null) \{

   throw new TypeError("Array.prototype.myMap called on null or undefined");

 \}

 if (typeof callback \!== "function") \{

   throw new TypeError(callback \+ " is not a function");

 \}

 const arr \= Object(this);

 const result \= \[\];

 for (let i \= 0; i \< arr.length; i++) \{

   if (i in arr) \{

     result\[i\] \= callback.call(thisArg, arr\[i\], i, arr);

   \}

 \}

 return result;

\};

const result \= \[1, 2, 3\].myMap((num) \=\> num \* 2);

console.log(result); // \[2, 4, 6\]

## **Key interview points**

* `map` returns a new array.  
* Callback receives `value`, `index`, and `array`.  
* Supports optional `thisArg`.  
* Should skip empty slots in sparse arrays.

---

## 2\. Polyfill for `filter`

Array.prototype.myFilter \= function (callback, thisArg) \{

 if (this \== null) \{

   throw new TypeError("Array.prototype.myFilter called on null or undefined");

 \}

 if (typeof callback \!== "function") \{

   throw new TypeError(callback \+ " is not a function");

 \}

 const arr \= Object(this);

 const result \= \[\];

 for (let i \= 0; i \< arr.length; i++) \{

   if (i in arr && callback.call(thisArg, arr\[i\], i, arr)) \{

     result.push(arr\[i\]);

   \}

 \}

 return result;

\};

const result \= \[1, 2, 3, 4\].myFilter((num) \=\> num % 2 \=== 0);

console.log(result); // \[2, 4\]

## **Key interview points**

* `filter` returns a new array.  
* It keeps items only when callback returns truthy.  
* It does not mutate original array.

---

## 3\. Polyfill for `reduce`

Array.prototype.myReduce \= function (callback, initialValue) \{

 if (this \== null) \{

   throw new TypeError("Array.prototype.myReduce called on null or undefined");

 \}

 if (typeof callback \!== "function") \{

   throw new TypeError(callback \+ " is not a function");

 \}

 const arr \= Object(this);

 let accumulator;

 let startIndex \= 0;

 if (arguments.length \>= 2\) \{

   accumulator \= initialValue;

 \} else \{

   while (startIndex \< arr.length && \!(startIndex in arr)) \{

     startIndex++;

   \}

   if (startIndex \>= arr.length) \{

     throw new TypeError("Reduce of empty array with no initial value");

   \}

   accumulator \= arr\[startIndex\];

   startIndex++;

 \}

 for (let i \= startIndex; i \< arr.length; i++) \{

   if (i in arr) \{

     accumulator \= callback(accumulator, arr\[i\], i, arr);

   \}

 \}

 return accumulator;

\};

const total \= \[1, 2, 3\].myReduce((acc, num) \=\> acc \+ num, 0);

console.log(total); // 6

## **Key interview points**

* Initial value is important.  
* Without initial value, first available item becomes accumulator.  
* Empty array without initial value throws error.  
* Callback receives `accumulator`, `currentValue`, `index`, and `array`.

---

## 4\. Polyfill for `forEach`

Array.prototype.myForEach \= function (callback, thisArg) \{

 if (this \== null) \{

   throw new TypeError("Array.prototype.myForEach called on null or undefined");

 \}

 if (typeof callback \!== "function") \{

   throw new TypeError(callback \+ " is not a function");

 \}

 const arr \= Object(this);

 for (let i \= 0; i \< arr.length; i++) \{

   if (i in arr) \{

     callback.call(thisArg, arr\[i\], i, arr);

   \}

 \}

\};

\[1, 2, 3\].myForEach((num) \=\> \{

 console.log(num);

\});

// 1

// 2

// 3

## **Key interview points**

* Returns `undefined`.  
* Used for side effects.  
* Does not support `break`.

---

## 5\. Polyfill for `find`

Array.prototype.myFind \= function (callback, thisArg) \{

 if (this \== null) \{

   throw new TypeError("Array.prototype.myFind called on null or undefined");

 \}

 if (typeof callback \!== "function") \{

   throw new TypeError(callback \+ " is not a function");

 \}

 const arr \= Object(this);

 for (let i \= 0; i \< arr.length; i++) \{

   if (callback.call(thisArg, arr\[i\], i, arr)) \{

     return arr\[i\];

   \}

 \}

 return undefined;

\};

const result \= \[1, 2, 3\].myFind((num) \=\> num \> 1);

console.log(result); // 2

## **Key interview points**

* Returns first matching element.  
* Returns `undefined` if not found.  
* Stops once match is found.

---

## 6\. Polyfill for `some`

Array.prototype.mySome \= function (callback, thisArg) \{

 if (this \== null) \{

   throw new TypeError("Array.prototype.mySome called on null or undefined");

 \}

 if (typeof callback \!== "function") \{

   throw new TypeError(callback \+ " is not a function");

 \}

 const arr \= Object(this);

 for (let i \= 0; i \< arr.length; i++) \{

   if (i in arr && callback.call(thisArg, arr\[i\], i, arr)) \{

     return true;

   \}

 \}

 return false;

\};

console.log(\[1, 3, 4\].mySome((num) \=\> num % 2 \=== 0)); // true

## **Key interview points**

* Returns boolean.  
* Stops when callback returns true.  
* Means “at least one”.

---

## 7\. Polyfill for `every`

Array.prototype.myEvery \= function (callback, thisArg) \{

 if (this \== null) \{

   throw new TypeError("Array.prototype.myEvery called on null or undefined");

 \}

 if (typeof callback \!== "function") \{

   throw new TypeError(callback \+ " is not a function");

 \}

 const arr \= Object(this);

 for (let i \= 0; i \< arr.length; i++) \{

   if (i in arr && \!callback.call(thisArg, arr\[i\], i, arr)) \{

     return false;

   \}

 \}

 return true;

\};

console.log(\[2, 4, 6\].myEvery((num) \=\> num % 2 \=== 0)); // true

## **Key interview points**

* Returns boolean.  
* Stops when callback returns false.  
* Means “all must pass”.

---

## 8\. Polyfill for `flat`

Array.prototype.myFlat \= function (depth \= 1\) \{

 const result \= \[\];

 function flatten(arr, currentDepth) \{

   for (const item of arr) \{

     if (Array.isArray(item) && currentDepth \> 0\) \{

       flatten(item, currentDepth \- 1);

     \} else \{

       result.push(item);

     \}

   \}

 \}

 flatten(this, depth);

 return result;

\};

const result \= \[1, \[2, \[3, \[4\]\]\]\].myFlat(2);

console.log(result); // \[1, 2, 3, \[4\]\]

## **Key interview points**

* Default depth is `1`.  
* Returns a new array.  
* Recursion is commonly used.

---

## 9\. Polyfill for `flatMap`

Array.prototype.myFlatMap \= function (callback, thisArg) \{

 return this.myMap(callback, thisArg).myFlat(1);

\};

const result \= \[1, 2, 3\].myFlatMap((num) \=\> \[num, num \* 2\]);

console.log(result); // \[1, 2, 2, 4, 3, 6\]

## **Key interview points**

* `flatMap` is equivalent to `map` followed by `flat(1)`.  
* It flattens only one level.

---

## 10\. Polyfill for duplicate check

## **Check duplicates for primitives**

function hasDuplicate(arr) \{

 const seen \= new Set();

 for (const item of arr) \{

   if (seen.has(item)) return true;

   seen.add(item);

 \}

 return false;

\}

console.log(hasDuplicate(\[1, 2, 3\])); // false

console.log(hasDuplicate(\[1, 2, 2\])); // true

## **Remove duplicates for primitives**

function removeDuplicates(arr) \{

 return \[...new Set(arr)\];

\}

console.log(removeDuplicates(\[1, 2, 2, 3\])); // \[1, 2, 3\]

## **Remove duplicates from objects by key**

function removeDuplicatesByKey(arr, key) \{

 const map \= new Map();

 for (const item of arr) \{

   map.set(item\[key\], item);

 \}

 return \[...map.values()\];

\}

const users \= \[

 \{ id: 1, name: "A" \},

 \{ id: 1, name: "A Updated" \},

 \{ id: 2, name: "B" \},

\];

console.log(removeDuplicatesByKey(users, "id"));

// \[\{ id: 1, name: "A Updated" \}, \{ id: 2, name: "B" \}\]

---

## Quick Revision Summary

| Method | Purpose | Returns | Mutates original? |
| ----- | ----- | ----- | ----- |
| `forEach` | Iterate for side effects | `undefined` | No |
| `map` | Transform each item | New array | No |
| `filter` | Keep matching items | New array | No |
| `reduce` | Accumulate result | Any value | No |
| `find` | First matching item | Item / `undefined` | No |
| `findIndex` | First matching index | Index / `-1` | No |
| `some` | At least one passes | Boolean | No |
| `every` | All pass | Boolean | No |
| `flat` | Flatten nested arrays | New array | No |
| `flatMap` | Map \+ flatten one level | New array | No |
| `sort` | Sort items | Same array | Yes |

---

## Most Common Interview Traps

* `forEach` returns `undefined`, not a new array.  
* `map` needs an explicit `return` when using `\{\}`.  
* `filter` expects a truthy/falsy condition, not transformed value.  
* `reduce` without initial value can throw on empty arrays.  
* `sort` mutates the original array.  
* Default `sort` compares values as strings.  
* `Set` removes duplicate primitives, but not duplicate objects by value.  
* `Map` supports object keys, normal objects convert keys to strings.  
* `WeakMap` and `WeakSet` are not iterable.  
* `WeakMap` keys and `WeakSet` values must be objects.  
* `some` means at least one; `every` means all.  
* `every` on an empty array returns `true`.

---

## Final Interview-Ready Combined Answer

JavaScript array methods are used for different types of data operations. `map` transforms each item and returns a new array, `filter` keeps matching items, `reduce` accumulates an array into a single result, and `forEach` is mainly for side effects. Search methods like `find`, `findIndex`, `some`, and `every` help locate or validate data efficiently. `flat` and `flatMap` are useful for nested arrays. `sort` is important because it mutates the original array and sorts as strings by default. For collections, `Set` is useful for unique values, `Map` is useful for dynamic key-value data, and `WeakMap`/`WeakSet` are useful when we want object-based storage without preventing garbage collection.

*

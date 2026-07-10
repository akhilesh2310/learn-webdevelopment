---
title: Objects & Prototypes
sidebar_position: 10
---

# Objects & Prototypes

This page covers objects, object creation, property descriptors, prototype links, prototype-chain behavior, and copy semantics.

Class and OOP interview explanations are maintained in [Classes & OOP](./classes-oop.md).

## References

- [W3Schools JavaScript Object Definitions](https://www.w3schools.com/js/js_object_definition.asp)
- [3 Ways to Define a JavaScript Class](https://www.phpied.com/3-ways-to-define-a-javascript-class/)
- [JavaScript Prototypes](https://medium.com/backticks-tildes/javascript-prototypes-ee46810e4866)
- [Understanding JavaScript Prototypes](https://www.pluralsight.com/blog/software-development/understanding-javascript-prototypes)
- [Prototype and Inheritance](https://hackernoon.com/understanding-javascript-prototype-and-inheritance-d55a9a23bde2)

## Objects in JavaScript

In JavaScript, all non-primitive values are objects or object-like values.

Examples include:

- Plain objects
- Arrays
- Functions
- Dates
- Maps
- Sets

## Object Creation

### Object Literal

The object literal is the most common and preferred way to create a plain object.

```js
const user = {
  name: "Amit",
  role: "Developer",
};
```

Avoid `new Object()` for ordinary object creation because literal syntax is cleaner and more readable.

```js
const badExample = new Object({
  name: "Amit",
});
```

### Constructor Function

A constructor function is a regular function used with `new` to create multiple similar objects.

```js
function Person(name, role) {
  this.name = name;
  this.role = role;
}

const user1 = new Person("Amit", "Developer");
```

When JavaScript sees `new`, it:

1. Creates a new empty object.
2. Links the new object's prototype to the constructor function's `.prototype`.
3. Binds `this` to the new object.
4. Returns the new object unless the constructor explicitly returns another object.

### `Object.create()`

`Object.create()` creates a new object with a manually specified prototype.

```js
const machineBlueprint = {
  start() {
    return "Engine running...";
  },
};

const myCar = Object.create(machineBlueprint);
myCar.brand = "Tesla";

console.log(myCar.start());
// Engine running...
```

## Object Manipulation

Properties can be added, updated, and deleted dynamically.

```js
const player = { name: "Virat" };

player.score = 100;
delete player.score;
```

### `Object.assign()`

`Object.assign(target, ...sources)` copies properties from source objects into a target object.

```js
const baseConfig = {
  theme: "dark",
  notifications: true,
};

const userConfig = {
  notifications: false,
  status: "active",
};

const finalConfig = Object.assign(baseConfig, userConfig);

console.log(finalConfig);
// { theme: "dark", notifications: false, status: "active" }
```

Important: `Object.assign()` mutates the first argument.

Use an empty object when you want a safe merge:

```js
const safeConfig = Object.assign({}, baseConfig, userConfig);
```

## Object Iteration Utilities

Use object iteration utilities to turn objects into array structures for mapping, filtering, or reconstruction.

```js
const product = {
  id: 101,
  price: 500,
};

console.log(Object.keys(product));
// ["id", "price"]

console.log(Object.values(product));
// [101, 500]

console.log(Object.entries(product));
// [["id", 101], ["price", 500]]
```

### `Object.fromEntries()`

`Object.fromEntries()` does the reverse of `Object.entries()`.

```js
const technicalMatrix = [
  ["role", "Lead"],
  ["experience", 13],
];

const engineerProfile = Object.fromEntries(technicalMatrix);

console.log(engineerProfile);
// { role: "Lead", experience: 13 }
```

## Property Descriptors

Every object property has a descriptor that controls how the property behaves.

Core descriptor attributes:

- `value`: the value stored in the property.
- `writable`: whether the value can be overwritten.
- `enumerable`: whether the property appears in loops and `Object.keys()`.
- `configurable`: whether the property can be deleted or reconfigured.

```js
const bankUser = {};

Object.defineProperty(bankUser, "accountNumber", {
  value: 987654321,
  writable: false,
  enumerable: false,
  configurable: false,
});

bankUser.accountNumber = 1111;

console.log(Object.keys(bankUser));
// []

delete bankUser.accountNumber;
```

In strict mode, writing to a non-writable property throws an error. Outside strict mode, it can fail silently.

## Prototypes and the Prototype Chain

JavaScript uses prototype-based inheritance. Every object has an internal prototype link, available through `Object.getPrototypeOf(obj)`.

When JavaScript looks up a property:

1. It checks the object itself.
2. If missing, it checks the object's prototype.
3. It continues walking up the prototype chain.
4. It stops at `null`.

### Classic Prototype Inheritance

Before `class`, inheritance was commonly handled with constructor functions and prototype links.

```js
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function () {
  return `${this.name} is eating.`;
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function () {
  return "Woof!";
};

const myPet = new Dog("Bruno", "Labrador");

console.log(myPet.eat());
// Bruno is eating.

console.log(myPet.bark());
// Woof!
```

## Shallow Copy vs Deep Copy

### Shallow Copy

A shallow copy copies only top-level properties. Nested objects are still shared by reference.

```js
const original = {
  name: "Alice",
  details: {
    age: 25,
  },
};

const shallowCopy = {
  ...original,
};

shallowCopy.details.age = 99;

console.log(original.details.age);
// 99
```

Common shallow-copy tools:

- `{ ...obj }`
- `Object.assign({}, obj)`

### Deep Copy

A deep copy recreates nested layers so the original and copy do not share nested references.

```js
const originalData = {
  name: "Alice",
  details: {
    age: 25,
  },
};

const deepCopy = structuredClone(originalData);

deepCopy.details.age = 99;

console.log(originalData.details.age);
// 25
```

Modern option: `structuredClone(obj)`.

Legacy option: `JSON.parse(JSON.stringify(obj))`, but it loses functions, `undefined`, `Map`, `Set`, and other non-JSON values.

## Interview Puzzles

### Puzzle 1: `Object.assign()` Target Mutation

```js
const defaults = { host: "localhost" };
const custom = { port: 8080 };

const config = Object.assign(defaults, custom);

config.host = "production.com";

console.log(defaults.host);
```

Output:

```text
production.com
```

`Object.assign()` mutates its first argument. Use `Object.assign({}, defaults, custom)` to avoid mutating the original object.

### Puzzle 2: Forgetting `new`

```js
function Member(id) {
  this.id = id;
}

const currentMember = Member(55);

console.log(currentMember);
console.log(window.id);
```

In a non-strict browser script, `currentMember` is `undefined`, and `window.id` becomes `55`. Without `new`, `this` defaults to the global object.

### Puzzle 3: Filtering Object Fields

```js
const inventory = {
  apples: 50,
  bananas: 200,
  oranges: 12,
};

const filteredInventory = Object.fromEntries(
  Object.entries(inventory).filter(([, value]) => value >= 100),
);

console.log(filteredInventory);
// { bananas: 200 }
```

The object is converted to entries, filtered as an array, and rebuilt with `Object.fromEntries()`.

### Puzzle 4: Implicit Binding Loss

```js
const car = {
  brand: "Toyota",
  getBrand() {
    return this.brand;
  },
};

const retrieveBrand = car.getBrand;

console.log(retrieveBrand());
```

The method is executed as a plain function, so it loses the `car` receiver. In strict mode this returns `undefined`; in sloppy mode it may read from the global object.

### Puzzle 5: Shallow `Object.freeze()`

```js
const company = {
  name: "TechCorp",
  location: {
    city: "NY",
  },
};

Object.freeze(company);

company.name = "NewCorp";
company.location.city = "LA";

console.log(company.name);
console.log(company.location.city);
```

Output:

```text
TechCorp
LA
```

`Object.freeze()` is shallow. It freezes top-level properties, but nested objects remain mutable unless recursively frozen.

---
title: Objects & Prototypes
sidebar_position: 10
---

# Objects & Prototypes

**[How to create classes in JavaScript or before EcmaScript 5?	1](#how-to-create-classes-in-javascript-or-before-ecmascript-5?)**

[**Understanding Prototype in JavaScript	2**](#understanding-prototype-in-javascript)

[**In JavaScript, Objects are King.	2**](#in-javascript,-objects-are-king.)

[**Object Creation	2**](#object-creation)

[**📦 1\. Object Creation Methods	2**](#📦-1.-object-creation-methods)

[Method A: Object Literal	2](#method-a:-object-literal)

[Method B: Constructor Functions & The new Keyword	3](#method-b:-constructor-functions-&-the-new-keyword)

[Method C: Object.create()	4](#method-c:-object.create\(\))

[**Object Manipulation	4**](#object-manipulation)

[**🔄 2\. Object Manipulation & Iteration Utilities	4**](#🔄-2.-object-manipulation-&-iteration-utilities)

[Modifying Properties & Object.assign()	4](#modifying-properties-&-object.assign\(\))

[Object Iteration Utilities	5](#object-iteration-utilities)

[**Property Descriptors	6**](#property-descriptors)

[**🔒 3\. Property Descriptors	6**](#🔒-3.-property-descriptors)

[❓ What are they?	6](#❓-what-are-they?)

[**🧬 5\. Prototypes & The Prototype Chain	7**](#🧬-5.-prototypes-&-the-prototype-chain)

[❓ What are they?	7](#❓-what-are-they?-1)

[**👥 6\. Deep Copy vs. Shallow Copy	9**](#👥-6.-deep-copy-vs.-shallow-copy)

[Shallow Copy	9](#shallow-copy)

[Deep Copy	10](#deep-copy)

[**⚠️ 7\. High-Frequency Interview Corner Cases & Puzzles	10**](#⚠️-7.-high-frequency-interview-corner-cases-&-puzzles)

[Puzzle 1: The Object.assign() Target Mutation Trap	10](#puzzle-1:-the-object.assign\(\)-target-mutation-trap)

[Puzzle 2: Forgetting the new Keyword	11](#puzzle-2:-forgetting-the-new-keyword)

[Puzzle 3: Filtering Object Fields with Matrices	12](#puzzle-3:-filtering-object-fields-with-matrices)

[Puzzle 4: The Implicit Binding Loss	12](#puzzle-4:-the-implicit-binding-loss)

[Puzzle 5: Deep Freezing Nested Objects	13](#puzzle-5:-deep-freezing-nested-objects)

**Objects**

[https://www.w3schools.com/js/js\_object\_definition.asp](https://www.w3schools.com/js/js_object_definition.asp)

## How to create classes in JavaScript or before EcmaScript 5? \{#how-to-create-classes-in-javascript-or-before-ecmascript-5?\}

[https://www.phpied.com/3-ways-to-define-a-javascript-class/](https://www.phpied.com/3-ways-to-define-a-javascript-class/)

Class and OOP interview explanations are maintained in [Classes & OOP](./classes-oop.md). This page focuses on objects, object creation, property descriptors, prototype links, and prototype-chain behavior.

## Understanding Prototype in JavaScript \{#understanding-prototype-in-javascript\}

[https://medium.com/backticks-tildes/javascript-prototypes-ee46810e4866](https://medium.com/backticks-tildes/javascript-prototypes-ee46810e4866)  
[https://www.pluralsight.com/blog/software-development/understanding-javascript-prototypes](https://www.pluralsight.com/blog/software-development/understanding-javascript-prototypes)  
[https://hackernoon.com/understanding-javascript-prototype-and-inheritance-d55a9a23bde2](https://hackernoon.com/understanding-javascript-prototype-and-inheritance-d55a9a23bde2)

## In JavaScript, Objects are King. \{#in-javascript,-objects-are-king.\}

#### If you Understand Objects, you Understand JavaScript.

In JavaScript, almost "everything" is an object.

* Objects are objects  
* Maths are objects  
* Functions are objects  
* Dates are objects  
* Arrays are objects  
* Maps are objects  
* Sets are objects

All JavaScript values, except primitives, are objects.

## **Object Creation** \{#object-creation\}

* Object Literal  
* Constructor Function  
* Object.create()

## **📦 1\. Object Creation Methods** \{#📦-1.-object-creation-methods\}

In JavaScript, an object is a collection of key-value pairs. There are three primary ways to create them, each serving a different architectural purpose.

### **Method A: Object Literal** \{#method-a:-object-literal\}

The most common way to create an object using curly braces `\{\}`.

| const user \= \{   name: "Amit",   role: "Developer" \}; // NOTE: You can technically use \`new Object()\`, but it is a bad practice: const badExample \= new Object(\{ name: "Amit" \}); // Avoid this\! // Literal syntax is faster, cleaner, and preferred for readability. |
| :---- |

### **Method B: Constructor Functions & The `new` Keyword** \{#method-b:-constructor-functions-&-the-new-keyword\}

A constructor is a standard function used as a blueprint to stamp out multiple similar objects. Invoking it with the `new` keyword completely changes how it runs.

#### **🧠 What happens under the hood when you use `new`?**

When JavaScript hits the `new` keyword, it executes exactly **4 internal steps**:

1. It creates a brand-new, empty object instance: `\{\}`.  
2. It links this new object’s hidden prototype pointer (`__proto__`) directly to the constructor function’s `.prototype` object space.  
3. It points the `this` keyword to our newly created object and runs the code inside the function block.  
4. It automatically returns the newly created object, unless you manually return a different object.

| function Person(name, role) \{   // 'this' is automatically pointed to our new empty instance   this.name \= name;   this.role \= role;   // Automatically returns 'this' at the end \} const user1 \= new Person("Amit", "Developer"); |
| :---- |

### **Method C: `Object.create()`** \{#method-c:-object.create()\}

This creates a new object and allows you to manually specify its prototype link directly, bypassing the constructor function approach.

| const machineBlueprint \= \{   start() \{ return "Engine running..."; \} \}; // Create a new object whose \_\_proto\_\_ points directly to machineBlueprint const myCar \= Object.create(machineBlueprint); myCar.brand \= "Tesla"; console.log(myCar.start()); // "Engine running..." (Inherited via the chain) |
| :---- |

## **Object Manipulation** \{#object-manipulation\}

* Adding properties  
* Deleting properties  
* Object.keys()  
* Object.values()  
* Object.entries()

## **🔄 2\. Object Manipulation & Iteration Utilities** \{#🔄-2.-object-manipulation-&-iteration-utilities\}

### **Modifying Properties & `Object.assign()`** \{#modifying-properties-&-object.assign()\}

Properties can be added or updated dynamically using dot notation (`obj.prop`) or bracket notation (`obj["prop"]`). They can be permanently erased using the `delete` keyword.

| const player \= \{ name: "Virat" \}; player.score \= 100; // Adding a property delete player.score; // Deleting a property |
| :---- |

#### **Merging Objects with `Object.assign()`**

`Object.assign()` copies all properties from one or more *source* objects into a *target* object.

* **Syntax:** `Object.assign(target, ...sources)`

| const baseConfig \= \{ theme: "dark", notifications: true \}; const userConfig \= \{ notifications: false, status: "active" \}; // Warning: This updates baseConfig directly\! const finalConfig \= Object.assign(baseConfig, userConfig);  console.log(finalConfig); // \{ theme: "dark", notifications: false, status: "active" \} |
| :---- |

### **Object Iteration Utilities** \{#object-iteration-utilities\}

When you need to turn an object into an array structure for loops or filtering, JavaScript provides a matrix of native utilities:

| const product \= \{ id: 101, price: 500 \}; console.log(Object.keys(product));   // \["id", "price"\] (Array of keys) console.log(Object.values(product)); // \[101, 500\]      (Array of values) const entries \= Object.entries(product);  console.log(entries);                // \[ \["id", 101\], \["price", 500\] \] (Key-Value matrix) |
| :---- |

#### **🔄 Reversing the Matrix with `Object.fromEntries()`**

Introduced in ES2019, `Object.fromEntries()` does the exact opposite of `Object.entries()`. It takes an array matrix of key-value pairs and builds a standard object out of them.

| const technicalMatrix \= \[ \["role", "Lead"\], \["experience", 13\] \]; const engineerProfile \= Object.fromEntries(technicalMatrix); console.log(engineerProfile); // \{ role: "Lead", experience: 13 \} |
| :---- |

## **Property Descriptors** \{#property-descriptors\}

## **🔒 3\. Property Descriptors** \{#🔒-3.-property-descriptors\}

### **❓ What are they?** \{#❓-what-are-they?\}

Every property inside an object has a hidden configuration block called a **Property Descriptor**. This tells JavaScript exactly how you are allowed to interact with that property.

There are **four core attributes**:

1. `value`: The actual data stored inside the property.  
2. `writable`: If `false`, the property's value cannot be overwritten.  
3. `enumerable`: If `false`, the property is completely hidden from loops and `Object.keys()`.  
4. `configurable`: If `false`, the property cannot be deleted and its descriptor configurations cannot be altered.

#### **🛠️ How to define them manually**

| const bankUser \= \{\}; Object.defineProperty(bankUser, "accountNumber", \{   value: 987654321,   writable: false,      // Read-Only   enumerable: false,    // Hidden from loops/keys   configurable: false   // Permanent, cannot be deleted \}); bankUser.accountNumber \= 1111; // Fails silently (Throws error in Strict Mode) console.log(Object.keys(bankUser)); // \[\] (It is completely invisible) delete bankUser.accountNumber; // Fails silently |
| :---- |

## **🧬 5\. Prototypes & The Prototype Chain** \{#🧬-5.-prototypes-&-the-prototype-chain\}

Understanding Prototype in JavaScript  
[https://medium.com/backticks-tildes/javascript-prototypes-ee46810e4866](https://medium.com/backticks-tildes/javascript-prototypes-ee46810e4866)  
[https://www.pluralsight.com/blog/software-development/understanding-javascript-prototypes](https://www.pluralsight.com/blog/software-development/understanding-javascript-prototypes)  
[https://hackernoon.com/understanding-javascript-prototype-and-inheritance-d55a9a23bde2](https://hackernoon.com/understanding-javascript-prototype-and-inheritance-d55a9a23bde2)

### **❓ What are they?** \{#❓-what-are-they?-1\}

JavaScript uses a **prototype-based inheritance model**. Every object contains a hidden link (`__proto__` or accessed via `Object.getPrototypeOf()`) pointing to a parent **Prototype Object**.

#### **⛓️ How the Prototype Chain Works**

When you attempt to look up a property or run a method on an object:

1. JavaScript checks the current object directly.  
2. If it is missing, it travels up the hidden `__proto__` link to check the parent prototype.  
3. It repeats this search up the chain until it finds the property or hits `Object.prototype.__proto__`, which is `null`. If it hits `null` without finding it, it returns `undefined`.

#### **🛠️ Prototype Inheritance (The Classic Way)**

Before modern classes (`class`) were added to the language, senior developers handled inheritance manually using functions and prototype linkages:

| // 1\. Base Parent Constructor function Animal(name) \{   this.name \= name; \} Animal.prototype.eat \= function() \{   return \`$\{this.name\} is eating.\`; \}; // 2\. Child Constructor function Dog(name, breed) \{   Animal.call(this, name); // Step 1: Inherit base instance properties   this.breed \= breed; \} // Step 2: Link Dog's prototype to Animal's prototype chain Dog.prototype \= Object.create(Animal.prototype); // Step 3: Repair the constructor link (otherwise it points to Animal) Dog.prototype.constructor \= Dog; Dog.prototype.bark \= function() \{   return "Woof\!"; \}; const myPet \= new Dog("Bruno", "Labrador"); console.log(myPet.eat());  // "Bruno is eating." (Inherited) console.log(myPet.bark()); // "Woof\!" (Local prototype method) |
| :---- |

## **👥 6\. Deep Copy vs. Shallow Copy** \{#👥-6.-deep-copy-vs.-shallow-copy\}

### **Shallow Copy** \{#shallow-copy\}

Copies only the top-level keys. If an object contains nested objects, the copy merely copies the **memory addresses**, meaning both the original and copy point to the same internal data.

* **Built using:** `\{ ...obj \}` or `Object.assign(\{\}, obj)`.

| const original \= \{ name: "Alice", details: \{ age: 25 \} \}; const shallowCopy \= \{ ...original \}; shallowCopy.details.age \= 99; // Mutates the shared inner memory\! console.log(original.details.age); // 99 (The original was accidentally broken\!) |
| :---- |

### **Deep Copy** \{#deep-copy\}

Completely recreates all nested layers, splitting all memory references between the original and the new copy.

* **Built using:** `structuredClone(obj)` (Modern Native Browser API).  
* **Legacy Alternative:** `JSON.parse(JSON.stringify(obj))` (Be careful: this breaks if your object has functions, `undefined`, or `Map`/`Set` types).

| const originalData \= \{ name: "Alice", details: \{ age: 25 \} \}; const deepCopy \= structuredClone(originalData); deepCopy.details.age \= 99;  console.log(originalData.details.age); // 25 (The original remains safe\!) |
| :---- |

## **⚠️ 7\. High-Frequency Interview Corner Cases & Puzzles** \{#⚠️-7.-high-frequency-interview-corner-cases-&-puzzles\}

### **Puzzle 1: The `Object.assign()` Target Mutation Trap** \{#puzzle-1:-the-object.assign()-target-mutation-trap\}

**Question:** What does this code print? Explain the architectural bug.

| const defaults \= \{ host: "localhost" \}; const custom \= \{ port: 8080 \}; const config \= Object.assign(defaults, custom); config.host \= "production.com"; console.log(defaults.host); |
| :---- |

**Answer:** It prints `"production.com"`.

* **The Trap:** `Object.assign(target, source)` **mutates the first argument object directly** while running. Because `defaults` was passed first, it was permanently modified.  
* **The Fix:** Always pass an empty object `\{\}` as the very first argument to receive the values safely without altering your baseline templates.

| const config \= Object.assign(\{\}, defaults, custom); // Safe merge pattern |
| :---- |

### **Puzzle 2: Forgetting the `new` Keyword** \{#puzzle-2:-forgetting-the-new-keyword\}

**Question:** What happens if you run a constructor function but forget to include the `new` keyword?

| function Member(id) \{   this.id \= id; \} const currentMember \= Member(55); console.log(currentMember); console.log(window.id); |
| :---- |

**Answer:** `currentMember` becomes `undefined`, and `window.id` becomes `55`.

* **The Trap:** Without `new`, `Member` is called as a basic standalone function. Because of this, `this` defaults to the global `window` object. The function assigns `window.id = 55` and returns no value (`undefined`).

### **Puzzle 3: Filtering Object Fields with Matrices** \{#puzzle-3:-filtering-object-fields-with-matrices\}

**Question:** Take an inventory object and filter out any items whose stock value is lower than 100\. You must return a clean, unmutated object layout.

| const inventory \= \{ apples: 50, bananas: 200, oranges: 12 \}; // The Senior Engineer approach: Chain entries, filter, and fromEntries together const filteredInventory \= Object.fromEntries(   Object.entries(inventory).filter((\[key, value\]) \=\> value \>= 100\) ); console.log(filteredInventory); // \{ bananas: 200 \} |
| :---- |

* **Reasoning:** We break the object down into an array matrix using `Object.entries()`, apply standard array filtering on the values, and immediately pass that matrix back into `Object.fromEntries()` to rebuild the final object structure cleanly.

### **Puzzle 4: The Implicit Binding Loss** \{#puzzle-4:-the-implicit-binding-loss\}

**Question:** What is the output of this code, and why does it fail?

| const car \= \{   brand: "Toyota",   getBrand() \{ return this.brand; \} \}; const retrieveBrand \= car.getBrand; console.log(retrieveBrand()); |
| :---- |

**Answer:** It prints `undefined`.

* **Reasoning:** Although `retrieveBrand` references the `getBrand` method, it is ultimately executed on the final line as a plain, standalone function call (`retrieveBrand()`). Because there is no object dot `.` context attached to the execution line, it triggers **Default Binding**, causing `this` to point to the global object instead of `car`.

### **Puzzle 5: Deep Freezing Nested Objects** \{#puzzle-5:-deep-freezing-nested-objects\}

**Question:** If you apply `Object.freeze()` to an object containing nested structures, can you still modify the nested properties?

| const company \= \{ name: "TechCorp", location: \{ city: "NY" \} \}; Object.freeze(company); company.name \= "NewCorp";  company.location.city \= "LA";  console.log(company.name); console.log(company.location.city); |
| :---- |

**Answer:** Logs `"TechCorp"` and `"LA"`.

* **Reasoning:** `Object.freeze()` and `Object.seal()` are **shallow actions**. They lock only the top-level primitive values and reference pointers of an object. The internal properties of nested objects remain fully mutable unless you recursively travel through them and freeze every sub-layer individually.

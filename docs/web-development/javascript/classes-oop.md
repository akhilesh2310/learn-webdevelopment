---
title: Classes & OOP
sidebar_position: 15
---

# Classes & OOP

JavaScript supports object-oriented programming, but internally it is prototype-based. ES6 classes are cleaner syntax over the prototype model.

Key idea: classes look traditional, but behind the scenes JavaScript still uses prototypes.

Reference: [3 Ways to Define a JavaScript Class](https://www.phpied.com/3-ways-to-define-a-javascript-class/)

## ES6 Classes

A class is a blueprint for creating objects with shared properties and methods.

```js
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, ${this.name}`;
  }
}

const user = new User("Akhilesh");

console.log(user.greet());
// Hello, Akhilesh
```

Class methods are stored on the prototype, not copied into every object.

## Constructor

A constructor is a special method that runs automatically when an object is created with `new`.

```js
class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
}

const user = new User("Akhilesh", "Frontend Engineer");
```

Key points:

- A class can have only one constructor.
- The constructor runs once per object creation.
- If you do not define a constructor, JavaScript adds a default one.
- In a child class, call `super()` before using `this`.

```js
class Admin extends User {
  constructor(name, role, permissions) {
    super(name, role);
    this.permissions = permissions;
  }
}
```

Trap:

```js
class Admin extends User {
  constructor(name) {
    this.name = name;
    // ReferenceError: Must call super constructor before accessing 'this'

    super(name);
  }
}
```

## Inheritance

Inheritance means one class can reuse properties and methods from another class.

```js
class User {
  constructor(name) {
    this.name = name;
  }

  login() {
    return `${this.name} logged in`;
  }
}

class Admin extends User {
  deleteUser() {
    return `${this.name} deleted a user`;
  }
}

const admin = new Admin("Akhilesh");

console.log(admin.login());
console.log(admin.deleteUser());

// Akhilesh logged in
// Akhilesh deleted a user
```

Important terms:

- `extends` creates inheritance.
- `super()` calls the parent constructor.
- `super.methodName()` calls a parent method.

```js
class Admin extends User {
  login() {
    return `${super.login()} as admin`;
  }
}
```

Use inheritance for clear `is-a` relationships. Avoid deep inheritance chains because they become hard to maintain.

## Encapsulation

Encapsulation keeps data and related methods together while hiding internal details from outside code.

```js
class BankAccount {
  #balance = 0;

  deposit(amount) {
    if (amount <= 0) {
      return;
    }

    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount();

account.deposit(1000);

console.log(account.getBalance());
// 1000

// console.log(account.#balance);
// SyntaxError
```

Private fields such as `#balance` cannot be accessed directly from outside the class.

## Abstraction

Abstraction exposes a simple public API while hiding implementation details.

```js
class PaymentService {
  pay(amount) {
    this.validateAmount(amount);
    this.processPayment(amount);
  }

  validateAmount(amount) {
    if (amount <= 0) {
      throw new Error("Invalid amount");
    }
  }

  processPayment(amount) {
    console.log(`Paid ${amount}`);
  }
}

const payment = new PaymentService();

payment.pay(500);
```

The caller only needs `payment.pay(500)`. Validation and processing are internal details.

Encapsulation hides data. Abstraction hides complexity.

## Polymorphism

Polymorphism means different objects can expose the same method name but implement it differently.

```js
class Shape {
  area() {
    return 0;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}

const shapes = [new Circle(5), new Rectangle(4, 6)];

shapes.forEach((shape) => {
  console.log(shape.area());
});
```

Same interface, different behavior.

## Static Methods

Static methods belong to the class itself, not to class instances.

```js
class MathUtils {
  static add(a, b) {
    return a + b;
  }
}

console.log(MathUtils.add(2, 3));
// 5

const utils = new MathUtils();

console.log(utils.add(2, 3));
// TypeError: utils.add is not a function
```

Use static methods for helpers that do not need instance-specific data.

Examples:

```js
Array.isArray([]);
Object.keys({ name: "Akhilesh" });
Promise.resolve("done");
```

## Getters and Setters

Getters and setters let you read and update properties with controlled logic.

```js
class User {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(value) {
    const [firstName, lastName] = value.split(" ");
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

const user = new User("Akhilesh", "Bamhore");

console.log(user.fullName);
// Akhilesh Bamhore

user.fullName = "John Doe";

console.log(user.firstName);
console.log(user.lastName);

// John
// Doe
```

Setter trap:

```js
class User {
  set name(value) {
    this.name = value;
  }
}
```

This causes infinite recursion because setting `this.name` calls the same setter again.

Fix:

```js
class User {
  set name(value) {
    this._name = value;
  }

  get name() {
    return this._name;
  }
}
```

## Composition vs Inheritance

Inheritance reuses behavior through parent-child relationships.

```js
class Admin extends User {}
```

Composition builds objects by combining smaller reusable behaviors.

```js
const canLogin = {
  login() {
    return "Logged in";
  },
};

const canDeleteUser = {
  deleteUser() {
    return "Deleted user";
  },
};

const admin = {
  name: "Akhilesh",
  ...canLogin,
  ...canDeleteUser,
};

console.log(admin.login());
console.log(admin.deleteUser());
```

| Concept | Meaning | Best For |
| :---- | :---- | :---- |
| Inheritance | Reuse through parent-child relationship | Clear `is-a` relationship |
| Composition | Reuse by combining capabilities | Flexible behavior sharing |

Composition is often preferred in frontend architecture because it avoids deep inheritance chains and makes behavior easier to reuse.

## Class vs Prototype

Before ES6 classes, JavaScript objects were commonly created using constructor functions and prototypes.

```js
function User(name) {
  this.name = name;
}

User.prototype.greet = function () {
  return `Hello, ${this.name}`;
};

const user = new User("Akhilesh");

console.log(user.greet());
// Hello, Akhilesh
```

ES6 class version:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, ${this.name}`;
  }
}

const user = new User("Akhilesh");

console.log(user.greet());
// Hello, Akhilesh
```

Both use prototypes internally.

Important differences:

- Class code runs in strict mode by default.
- Class methods are non-enumerable.
- Class constructors cannot be called without `new`.
- Classes are hoisted but not initialized, like `let` and `const`.

```js
const user = new User();
// ReferenceError: Cannot access 'User' before initialization

class User {}
```

## OOP in JavaScript

OOP organizes code around objects that contain data and behavior.

JavaScript supports OOP using:

- Objects
- Prototypes
- Constructor functions
- ES6 classes
- Private fields
- `extends` inheritance
- Method overriding
- Composition

```js
class ReportWidget {
  #data = [];

  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async load() {
    this.#data = await this.apiClient.get("/reports");
  }

  render() {
    return this.#data.map((item) => item.name);
  }
}
```

This class combines encapsulation, abstraction, composition, and behavior.

## Common Interview Questions

### What Is the Difference Between Class and Prototype?

ES6 classes are cleaner syntax for working with prototypes. Internally, JavaScript still uses prototype-based inheritance.

### Is JavaScript Class-Based or Prototype-Based?

JavaScript is prototype-based. Classes make it look class-based, but objects still inherit through the prototype chain.

### How Did We Create Classes Before ES6?

The most common approach was the constructor plus prototype pattern.

```js
function User(name) {
  this.name = name;
}

User.prototype.greet = function () {
  return `Hello, ${this.name}`;
};

const user = new User("Akhilesh");

console.log(user.greet());
// Hello, Akhilesh
```

This stores instance data in the constructor and shared methods on the prototype.

### What Happens When We Use `new`?

When a function or class is called with `new`, JavaScript:

1. Creates a new empty object.
2. Links it to the constructor's prototype.
3. Binds `this` to the new object.
4. Executes the constructor.
5. Returns the object unless another object is explicitly returned.

### What Is the Difference Between `__proto__` and `prototype`?

`prototype` exists on constructor functions and classes. It defines methods shared by instances.

`__proto__` exists on objects. It points to the object's parent prototype.

```js
user.__proto__ === User.prototype;
// true
```

### Can You Call a Class Without `new`?

No.

```js
class User {}

User();
// TypeError: Class constructor User cannot be invoked without 'new'
```

### What Is Method Overriding?

Method overriding means a child class provides its own version of a parent class method.

```js
class User {
  login() {
    return "User login";
  }
}

class Admin extends User {
  login() {
    return "Admin login";
  }
}
```

## Interview Answer

JavaScript supports OOP, but it is prototype-based internally. ES6 classes provide cleaner syntax over prototypes. A class creates objects, a constructor initializes instance data, and methods are shared through the prototype. Inheritance uses `extends` and `super`, encapsulation can use private fields like `#balance`, abstraction hides internal complexity, polymorphism allows the same method name to behave differently, and static methods belong to the class itself. In modern frontend architecture, composition is often preferred when behavior needs to be reused flexibly.

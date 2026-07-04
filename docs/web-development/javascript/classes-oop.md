---
title: Classes & OOP
sidebar_position: 15
---

# Classes & OOP

# **JavaScript OOP, ES6 Classes**

JavaScript supports Object-Oriented Programming, but internally it is based on **prototypes**, not traditional class-based inheritance like Java or C\#.

ES6 classes are mostly cleaner syntax over JavaScript’s prototype-based model.

Key idea:

In JavaScript, classes look like traditional classes, but behind the scenes they still use prototypes.

---

# **1\. ES6 Classes**

A class is a blueprint for creating objects with shared properties and methods.

| console.log(name); // undefined var name \= "Akhilesh"; |
| :---- |

class User \{

  constructor(name) \{

    this.name \= name;

  \}

  greet() \{

    return \`Hello, $\{this.name\}\`;

  \}

\}

const user \= new User("Akhilesh");

console.log(user.greet()); // Hello, Akhilesh

Here, `User` is a class, and `user` is an object created from that class.

Important point:

Class methods are stored on the prototype, not copied into every object.

So this:

user.greet();

is found through the prototype chain.

---

# **2\. Constructor**

A constructor is a special method that runs automatically when we create an object using `new`.

| console.log(name); // undefined var name \= "Akhilesh"; |
| :---- |

class User \{

  constructor(name, role) \{

    this.name \= name;

    this.role \= role;

  \}

\}

const user \= new User("Akhilesh", "Frontend Engineer");

The constructor is mainly used to initialize object-specific data.

Key points:

* A class can have only one constructor.  
* Constructor runs once per object creation.  
* If you do not define a constructor, JavaScript adds a default one.  
* In a child class, you must call `super()` before using `this`.

class Admin extends User \{

  constructor(name, role, permissions) \{

    super(name, role);

    this.permissions \= permissions;

  \}

\}

Trap:

class Admin extends User \{

  constructor(name) \{

    this.name \= name; // ReferenceError: Must call super constructor in derived class before accessing 'this'

    super(name);

  \}

\}

---

# **3\. Inheritance**

Inheritance means one class can reuse properties and methods from another class.

class User \{

  constructor(name) \{

    this.name \= name;

  \}

  login() \{

    return \`$\{this.name\} logged in\`;

  \}

\}

class Admin extends User \{

  deleteUser() \{

    return \`$\{this.name\} deleted a user\`;

  \}

\}

const admin \= new Admin("Akhilesh");

console.log(admin.login()); // Akhilesh logged in

console.log(admin.deleteUser()); // Akhilesh deleted a user

Here, `Admin` inherits from `User`.

Important terms:

* `extends` creates inheritance.  
* `super()` calls the parent constructor.  
* `super.methodName()` can call a parent method.

class Admin extends User \{

  login() \{

    return \`$\{super.login()\} as admin\`;

  \}

\}

Trade-off:

Inheritance is useful for “is-a” relationships, but deep inheritance chains become hard to maintain.

Example:

Admin is a User → good use of inheritance

Button is a Theme is a Layout is a Component → can become messy

---

# **4\. Encapsulation**

Encapsulation means keeping data and related methods together, while hiding internal details from outside code.

Simple example:

class BankAccount \{

  \#balance \= 0;

  deposit(amount) \{

    if (amount \<= 0\) return;

    this.\#balance \+= amount;

  \}

  getBalance() \{

    return this.\#balance;

  \}

\}

const account \= new BankAccount();

account.deposit(1000);

console.log(account.getBalance()); // 1000

console.log(account.\#balance); // SyntaxError: Private field '\#balance' must be declared in an enclosing class

Here, `#balance` is a private field. It cannot be accessed directly from outside the class.

Why it matters:

Encapsulation protects object state from direct unwanted modification.

Without encapsulation:

account.balance \= \-5000;

With encapsulation, we control updates through methods like `deposit()` or `withdraw()`.

---

# **5\. Abstraction**

Abstraction means exposing only what is necessary and hiding implementation details.

Example:

class PaymentService \{

  pay(amount) \{

    this.validateAmount(amount);

    this.processPayment(amount);

  \}

  validateAmount(amount) \{

    if (amount \<= 0\) \{

      throw new Error("Invalid amount");

    \}

  \}

  processPayment(amount) \{

    console.log(\`Paid $\{amount\}\`);

  \}

\}

const payment \= new PaymentService();

payment.pay(500);

The user only needs to call:

payment.pay(500);

They do not need to know the internal steps like validation and processing.

Frontend example:

apiClient.get("/users");

You do not care internally whether it uses `fetch`, `axios`, retries, headers, or interceptors. That complexity is abstracted away.

Key idea:

Encapsulation hides data. Abstraction hides complexity.

---

# **6\. Polymorphism**

Polymorphism means different objects can have the same method name but behave differently.

class Shape \{

  area() \{

    return 0;

  \}

\}

class Circle extends Shape \{

  constructor(radius) \{

    super();

    this.radius \= radius;

  \}

  area() \{

    return Math.PI \* this.radius \* this.radius;

  \}

\}

class Rectangle extends Shape \{

  constructor(width, height) \{

    super();

    this.width \= width;

    this.height \= height;

  \}

  area() \{

    return this.width \* this.height;

  \}

\}

const shapes \= \[new Circle(5), new Rectangle(4, 6)\];

shapes.forEach((shape) \=\> \{

  console.log(shape.area());

\});

Both `Circle` and `Rectangle` have an `area()` method, but each calculates area differently.

Frontend example:

components.forEach((component) \=\> component.render());

Each component can have a `render()` method, but output can be different.

Key idea:

Same interface, different behavior.

---

# **7\. Static Methods**

Static methods belong to the class itself, not to class instances.

class MathUtils \{

  static add(a, b) \{

    return a \+ b;

  \}

\}

console.log(MathUtils.add(2, 3)); // 5

const utils \= new MathUtils();

console.log(utils.add(2, 3)); // TypeError: utils.add is not a function

Use static methods for utility/helper functions that do not need object-specific data.

Examples:

Array.isArray(\[\]);

Object.keys(\{ name: "Akhilesh" \});

Promise.resolve("done");

These are static methods because they are called directly on the class/object constructor.

Key point:

Static methods cannot directly access instance properties through `this`.

---

# **8\. Getters and Setters**

Getters and setters allow you to read and update object properties like normal properties, but with controlled logic behind the scenes.

class User \{

  constructor(firstName, lastName) \{

    this.firstName \= firstName;

    this.lastName \= lastName;

  \}

  get fullName() \{

    return \`$\{this.firstName\} $\{this.lastName\}\`;

  \}

  set fullName(value) \{

    const \[firstName, lastName\] \= value.split(" ");

    this.firstName \= firstName;

    this.lastName \= lastName;

  \}

\}

const user \= new User("Akhilesh", "Bamhore");

console.log(user.fullName); // Akhilesh Bamhore

user.fullName \= "John Doe";

console.log(user.firstName); // John

console.log(user.lastName); // Doe

Notice:

user.fullName;

looks like a property access, but internally it calls the getter.

And:

user.fullName \= "John Doe";

looks like assignment, but internally it calls the setter.

Use cases:

* computed values  
* validation before setting  
* hiding internal data format  
* exposing cleaner API

Trap:

class User \{

  set name(value) \{

    this.name \= value; // RangeError: Maximum call stack size exceeded

  \}

\}

This causes infinite recursion because setting `this.name` calls the same setter again.

Fix:

class User \{

  set name(value) \{

    this.\_name \= value;

  \}

  get name() \{

    return this.\_name;

  \}

\}

---

# **9\. Composition vs Inheritance**

Inheritance means building a class from another class.

class Admin extends User \{\}

Composition means building an object by combining smaller reusable behaviors.

const canLogin \= \{

  login() \{

    return "Logged in";

  \},

\};

const canDeleteUser \= \{

  deleteUser() \{

    return "Deleted user";

  \},

\};

const admin \= \{

  name: "Akhilesh",

  ...canLogin,

  ...canDeleteUser,

\};

console.log(admin.login()); // Logged in

console.log(admin.deleteUser()); // Deleted user

Simple comparison:

| Concept | Meaning | Best For |
| ----- | ----- | ----- |
| Inheritance | Reuse through parent-child relationship | Clear `is-a` relationship |
| Composition | Reuse by combining capabilities | Flexible behavior sharing |

Example:

Admin is a User → inheritance can work

User can login, can export reports, can manage billing → composition is often better

Why composition is often preferred:

* avoids deep inheritance chains  
* easier to test  
* easier to reuse small behaviors  
* more flexible for changing requirements

Key idea:

Prefer composition when behavior needs to be mixed and reused across unrelated objects.

---

# **10\. Class vs Prototype**

Before ES6 classes, JavaScript objects were commonly created using constructor functions and prototypes.

function User(name) \{

  this.name \= name;

\}

User.prototype.greet \= function () \{

  return \`Hello, $\{this.name\}\`;

\};

const user \= new User("Akhilesh");

console.log(user.greet()); // Hello, Akhilesh

ES6 class version:

class User \{

  constructor(name) \{

    this.name \= name;

  \}

  greet() \{

    return \`Hello, $\{this.name\}\`;

  \}

\}

const user \= new User("Akhilesh");

console.log(user.greet()); // Hello, Akhilesh

Both are using prototypes internally.

Key difference:

`class` is cleaner syntax, but JavaScript’s inheritance model is still prototype-based.

Important differences:

* Class code runs in strict mode by default.  
* Class methods are non-enumerable.  
* Class constructors cannot be called without `new`.  
* Classes are not hoisted like function declarations.

const user \= new User("Akhilesh"); // ReferenceError: Cannot access 'User' before initialization

class User \{

  constructor(name) \{

    this.name \= name;

  \}

\}

---

# **11\. OOP in JavaScript**

OOP means organizing code around objects that contain data and behavior.

JavaScript supports OOP using:

* objects  
* prototypes  
* constructor functions  
* ES6 classes  
* encapsulation with private fields  
* inheritance with `extends`  
* polymorphism through method overriding  
* composition through object combination

Example:

class ReportWidget \{

  \#data \= \[\];

  constructor(apiClient) \{

    this.apiClient \= apiClient;

  \}

  async load() \{

    this.\#data \= await this.apiClient.get("/reports");

  \}

  render() \{

    return this.\#data.map((item) \=\> item.name);

  \}

\}

This class combines:

* encapsulation: `#data`  
* abstraction: `load()` hides API logic  
* composition: `apiClient` is injected  
* behavior: `render()`

Frontend usage:

In frontend apps, OOP is useful for services, SDK clients, validators, state machines, models, and reusable business logic. React components themselves are mostly functional now, but OOP concepts still help in architecture.

---

# **Common Interview Questions**

## **1\. What is the difference between class and prototype in JavaScript?**

ES6 classes are cleaner syntax for working with prototypes. Internally, JavaScript still uses prototype-based inheritance. Before ES6, we used constructor functions and `Constructor.prototype`. With classes, the syntax is easier to read and closer to traditional OOP.

---

## **2\. Is JavaScript class-based or prototype-based?**

JavaScript is prototype-based. ES6 classes make it look class-based, but behind the scenes, objects still inherit from other objects through the prototype chain.

---

## **3\. How did we create classes before ES6?**

[https://www.phpied.com/3-ways-to-define-a-javascript-class/](https://www.phpied.com/3-ways-to-define-a-javascript-class/)

Before ES6 introduced the `class` keyword, JavaScript developers used a combination of **constructor functions**, **prototypes**, and sometimes **object literals** to achieve class-like behavior.

The most common pattern was the constructor \+ prototype pattern:

function User(name) \{

  this.name \= name;

\}

User.prototype.greet \= function () \{

  return \`Hello, $\{this.name\}\`;

\};

const user \= new User("Akhilesh");

console.log(user.greet()); // Hello, Akhilesh

Why this pattern was popular:

* Instance-specific data (`name`) was stored inside the constructor.  
* Shared methods (`greet`) were placed on the prototype.  
* All instances reused the same method instead of creating a new copy per object.

This is essentially what ES6 classes generate behind the scenes:

class User \{

  constructor(name) \{

    this.name \= name;

  \}

  greet() \{

    return \`Hello, $\{this.name\}\`;

  \}

\}

Historically, developers used three common approaches:

### **1\. Object Literal**

Useful for creating a single object.

const user \= \{

  name: "Akhilesh",

  greet() \{

    return \`Hello, $\{this.name\}\`;

  \},

\};

Limitation: not reusable for creating multiple similar objects.

### **2\. Constructor Function**

Useful for creating multiple instances.

function User(name) \{

  this.name \= name;

  this.greet \= function () \{

    return \`Hello, $\{this.name\}\`;

  \};

\}

Limitation: every instance gets its own copy of `greet()`, which wastes memory.

### **3\. Constructor \+ Prototype (Most Common)**

function User(name) \{

  this.name \= name;

\}

User.prototype.greet \= function () \{

  return \`Hello, $\{this.name\}\`;

\};

This pattern allowed object creation and method sharing before the `class` syntax was introduced.

---

## **4\. What happens when we use the `new` keyword?**

When we call a function or class with `new`, JavaScript:

1. creates a new empty object  
2. links it to the constructor’s prototype  
3. binds `this` to the new object  
4. executes the constructor  
5. returns the object automatically unless another object is explicitly returned

Example:

const user \= new User("Akhilesh");

---

## **5\. What is inheritance in JavaScript?**

Inheritance means one object or class can access properties and methods from another. In ES6, we use `extends`. Internally, JavaScript uses the prototype chain.

---

## **6\. What is the difference between `__proto__` and `prototype`?**

`prototype` exists on constructor functions and classes. It is used to define methods shared by instances.

`__proto__` exists on objects. It points to the object’s parent prototype.

user.\_\_proto\_\_ \=== User.prototype; // true

---

## **7\. What is encapsulation in JavaScript?**

Encapsulation means keeping data and behavior together and restricting direct access to internal data. In modern JavaScript, private fields using `#` provide real privacy.

class User \{

  \#token;

  setToken(token) \{

    this.\#token \= token;

  \}

\}

---

## **8\. What is abstraction in JavaScript?**

Abstraction means hiding internal implementation and exposing a simple public API.

Example: `apiClient.get("/users")` hides headers, tokens, retries, and fetch logic behind one simple method.

---

## **9\. What is polymorphism in JavaScript?**

Polymorphism means different objects can expose the same method but implement it differently.

Example: `Circle.area()` and `Rectangle.area()` both use `area()`, but each calculates it differently.

---

## **10\. What are static methods?**

Static methods belong to the class itself, not instances. They are useful for helper methods that do not depend on instance data.

class DateUtils \{

  static format(date) \{

    return date.toISOString();

  \}

\}

DateUtils.format(new Date());

---

## **11\. What are getters and setters?**

Getters and setters allow controlled access to object properties. They look like normal property access, but internally run functions.

user.fullName;

user.fullName \= "John Doe";

---

## **12\. Composition vs inheritance: which is better?**

Neither is always better. Inheritance is good for clear `is-a` relationships. Composition is better when you want to combine reusable behaviors flexibly.

In large frontend applications, composition is often preferred because requirements change often and deep inheritance becomes hard to maintain.

---

## **13\. Can you call a class without `new`?**

No.

class User \{\}

User(); // TypeError: Class constructor User cannot be invoked without 'new'

Class constructors must be called with `new`.

---

## **14\. Are classes hoisted in JavaScript?**

Classes are hoisted but not initialized, similar to `let` and `const`. Accessing them before declaration throws a ReferenceError.

const user \= new User(); // ReferenceError: Cannot access 'User' before initialization

class User \{\}

---

## **15\. What is method overriding?**

Method overriding means a child class provides its own version of a parent class method.

class User \{

  login() \{

    return "User login";

  \}

\}

class Admin extends User \{

  login() \{

    return "Admin login";

  \}

\}

Here, `Admin` overrides `login()`.

---

# **Compact Interview-Ready Answer**

JavaScript supports OOP, but it is prototype-based internally. ES6 classes provide a cleaner syntax over prototypes. A class is used to create objects, a constructor initializes instance data, and methods are shared through the prototype. Inheritance is done using `extends` and `super`, while encapsulation can be achieved using private fields like `#balance`. Abstraction hides internal complexity, polymorphism allows the same method name to behave differently, and static methods belong to the class itself. In modern JavaScript and frontend architecture, I prefer composition over inheritance when behavior needs to be reused flexibly.

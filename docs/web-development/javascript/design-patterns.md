---
title: Design Patterns
sidebar_position: 26
---

# Design Patterns

## Module Pattern

## Singleton Pattern

## Factory Pattern

## Observer Pattern

## Pub/Sub Pattern

## Strategy Pattern

## Common Interview Topics

* Observer vs Pub/Sub  
* Singleton implementation

Basics: [https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented\_JS](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS)   
Abstraction, Encapsulation, Inheritance & Polymorphism: [https://javascriptissexy.com/oop-in-javascript-what-you-need-to-know/](https://javascriptissexy.com/oop-in-javascript-what-you-need-to-know/)  
Inheritance & prototype  chain: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance\_and\_the\_prototype\_chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)   
SOLID Principals: [https://medium.com/@cramirez92/s-o-l-i-d-the-first-5-priciples-of-object-oriented-design-with-javascript-790f6ac9b9fa](https://medium.com/@cramirez92/s-o-l-i-d-the-first-5-priciples-of-object-oriented-design-with-javascript-790f6ac9b9fa)  
JavaScript Principals Design Patterns: [https://scotch.io/bar-talk/4-javascript-design-patterns-you-should-know](https://scotch.io/bar-talk/4-javascript-design-patterns-you-should-know)  

Oops concept Abstraction, Encapsulation, Inheritance & Polymorphism: [https://rachelappel.com/2015/01/02/write-object-oriented-javascript-with-typescript/](https://rachelappel.com/2015/01/02/write-object-oriented-javascript-with-typescript/)  
REST, default & optional params: [https://howtodoinjava.com/typescript/functions-rest-optional-default-params/](https://howtodoinjava.com/typescript/functions-rest-optional-default-params/)  
Overloading: [https://www.bennadel.com/blog/3339-using-method-and-function-overloading-in-typescript.htm](https://www.bennadel.com/blog/3339-using-method-and-function-overloading-in-typescript.htm)  
Iterators & decorators: [https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html)  
Intersections & union types: [https://www.typescriptlang.org/docs/handbook/advanced-types.html](https://www.typescriptlang.org/docs/handbook/advanced-types.html)  
Decorators: [https://www.typescriptlang.org/docs/handbook/decorators.html](https://www.typescriptlang.org/docs/handbook/decorators.html)

[https://github.com/sudheerj/design-patterns](https://github.com/sudheerj/design-patterns)

## Design Patterns in JavaScript

Design patterns are reusable solutions to common software design problems. In JavaScript and frontend apps, they help organize code, manage state, decouple modules, handle events, create flexible logic, and make large applications easier to maintain.

---

## 1. Module Pattern

The Module Pattern organizes related code into a single unit and hides internal implementation details.

## Simple meaning

It gives us private data and public methods.

const CounterModule \= (function () \{  
  let count \= 0;

  return \{  
    increment() \{  
      count++;  
    \},

    getCount() \{  
      return count;  
    \},  
  \};  
\})();

CounterModule.increment();

console.log(CounterModule.getCount()); // 1  
console.log(CounterModule.count); // undefined

## Key mental model

The inner variables stay private because of closures. Only returned methods can access them.

## How it works

Step by step:

* An IIFE runs immediately.  
* It creates private variables like `count`.  
* It returns an object with public methods.  
* Public methods close over private variables.  
* Outside code cannot directly access private variables.

## Modern JavaScript module version

// counter.js  
let count \= 0;

\export function increment() \{  
  count++;  
\}

\export function getCount() \{  
  return count;  
\}

// app.js  
\import \{ increment, getCount \} from "./counter.js";

increment();

console.log(getCount()); // 1

## Practical frontend example

A small analytics module:

const Analytics \= (function () \{  
  const events \= \[\];

  return \{  
    track(eventName) \{  
      events.push(\{  
        eventName,  
        time: Date.now(),  
      \});  
    \},

    getEvents() \{  
      return \[...events\];  
    \},  
  \};  
\})();

Analytics.track("button\_click");

console.log(Analytics.getEvents());  
// \[\{ eventName: "button\_click", time: 178... \}\]

## Trade-offs / common mistakes

* Good for encapsulation.  
* Can hide implementation details cleanly.  
* Too many module-level variables can create hidden shared state.  
* In modern apps, ES Modules usually replace classic IIFE module pattern.

## Interview-ready answer

The Module Pattern groups related code and hides private state using closures. It exposes only selected public methods. In older JavaScript, this was often done with IIFEs. In modern JavaScript, ES Modules provide module scope and are the preferred way to structure reusable code.

---

## 2. Singleton Pattern

The Singleton Pattern ensures only one instance of something exists and provides a global access point to it.

## Simple meaning

Create one shared instance and reuse it everywhere.

## Basic implementation

const AppConfig \= (function () \{  
  let instance;

  function createInstance() \{  
    return \{  
      apiBaseUrl: "/api",  
      theme: "dark",  
    \};  
  \}

  return \{  
    getInstance() \{  
      if (\!instance) \{  
        instance \= createInstance();  
      \}

      return instance;  
    \},  
  \};  
\})();

const config1 \= AppConfig.getInstance();  
const config2 \= AppConfig.getInstance();

console.log(config1 \=== config2); // true

## Key mental model

The first call creates the instance. Later calls return the same object.

## Class-based implementation

class Logger \{  
  static instance;

  constructor() \{  
    if (Logger.instance) \{  
      return Logger.instance;  
    \}

    this.logs \= \[\];  
    Logger.instance \= this;  
  \}

  log(message) \{  
    this.logs.push(message);  
  \}  
\}

const logger1 \= new Logger();  
const logger2 \= new Logger();

console.log(logger1 \=== logger2); // true

## Practical frontend use cases

* Logger.  
* App configuration.  
* Analytics client.  
* Feature flag client.  
* Shared cache.  
* API client instance.

## Trade-offs / common mistakes

Singletons can become hidden global state. This can make testing harder and create tight coupling.

Common mistake: Overusing Singleton for things that should be passed as dependencies.

## Interview-ready answer

The Singleton Pattern ensures a class or module has only one instance and provides a way to access it globally. It is useful for shared services like logger, config, analytics, or API clients, but it should be used carefully because it can create hidden global state and make testing harder.

---

## 3. Factory Pattern

The Factory Pattern creates objects without exposing the exact creation logic to the caller.

## Simple meaning

A factory function decides what object to create.

function createUser(type, name) \{  
  if (type \=== "admin") \{  
    return \{  
      name,  
      role: "admin",  
      canDelete: true,  
    \};  
  \}

  return \{  
    name,  
    role: "user",  
    canDelete: false,  
  \};  
\}

console.log(createUser("admin", "Akhilesh"));  
// \{ name: "Akhilesh", role: "admin", canDelete: true \}

## Key mental model

The caller asks for an object. The factory handles the creation details.

## Practical frontend example

Create notification objects based on type:

function createNotification(type, message) \{  
  const base \= \{  
    message,  
    createdAt: Date.now(),  
  \};

  if (type \=== "success") \{  
    return \{  
      ...base,  
      type,  
      icon: "✅",  
    \};  
  \}

  if (type \=== "error") \{  
    return \{  
      ...base,  
      type,  
      icon: "❌",  
    \};  
  \}

  return \{  
    ...base,  
    type: "info",  
    icon: "ℹ️",  
  \};  
\}

console.log(createNotification("error", "Failed to save"));  
// \{ message: "Failed to save", createdAt: 178..., type: "error", icon: "❌" \}

## Why it is useful

* Centralizes object creation.  
* Keeps caller code simple.  
* Hides creation complexity.  
* Useful when object shape depends on type/config.  
* Reduces repeated object creation logic.

## Trade-offs / common mistakes

* Too many `if/else` branches can become messy.  
* For many types, use a map-based factory.

const notificationFactory \= \{  
  success: (message) \=\> (\{ type: "success", icon: "✅", message \}),  
  error: (message) \=\> (\{ type: "error", icon: "❌", message \}),  
  info: (message) \=\> (\{ type: "info", icon: "ℹ️", message \}),  
\};

function createNotification(type, message) \{  
  const factory \= notificationFactory\[type\] || notificationFactory.info;

  return factory(message);  
\}

console.log(createNotification("success", "Saved"));  
// \{ type: "success", icon: "✅", message: "Saved" \}

## Interview-ready answer

The Factory Pattern centralizes object creation logic. Instead of callers directly creating different object types, they ask a factory function to create the right object based on input. It is useful when object creation depends on type, configuration, or environment.

---

## 4. Observer Pattern

The Observer Pattern allows one object, called the subject, to notify multiple observers when its state changes.

## Simple meaning

One source changes. Many listeners get notified.

## Basic implementation

class Subject \{  
  constructor() \{  
    this.observers \= \[\];  
  \}

  subscribe(observer) \{  
    this.observers.push(observer);  
  \}

  unsubscribe(observer) \{  
    this.observers \= this.observers.filter((item) \=\> item \!== observer);  
  \}

  notify(data) \{  
    this.observers.forEach((observer) \=\> observer(data));  
  \}  
\}

const subject \= new Subject();

function observer1(data) \{  
  console.log("Observer 1:", data);  
\}

function observer2(data) \{  
  console.log("Observer 2:", data);  
\}

subject.subscribe(observer1);  
subject.subscribe(observer2);

subject.notify("State changed");  
// "Observer 1: State changed"  
// "Observer 2: State changed"

## Key mental model

The subject knows who is observing it and directly notifies observers.

## Practical frontend examples

* Store subscriptions.  
* Form state listeners.  
* UI state updates.  
* Event listeners.  
* Reactive systems.  
* Observable streams.

## Real-world example

class Store \{  
  constructor(initialState) \{  
    this.state \= initialState;  
    this.listeners \= \[\];  
  \}

  subscribe(listener) \{  
    this.listeners.push(listener);

    return () \=\> \{  
      this.listeners \= this.listeners.filter((item) \=\> item \!== listener);  
    \};  
  \}

  setState(nextState) \{  
    this.state \= \{  
      ...this.state,  
      ...nextState,  
    \};

    this.listeners.forEach((listener) \=\> listener(this.state));  
  \}  
\}

const store \= new Store(\{ count: 0 \});

const unsubscribe \= store.subscribe((state) \=\> \{  
  console.log(state.count);  
\});

store.setState(\{ count: 1 \}); // 1

unsubscribe();

store.setState(\{ count: 2 \}); // No output

## Trade-offs / common mistakes

* Useful for one-to-many updates.  
* Can create memory leaks if observers are not unsubscribed.  
* Subject and observers are somewhat coupled because subject directly manages observers.  
* Notification order can matter in some cases.

## Interview-ready answer

The Observer Pattern defines a one-to-many relationship where a subject keeps a list of observers and notifies them when its state changes. It is useful for subscriptions, UI state updates, event listeners, and reactive systems. A common concern is cleanup, because forgetting to unsubscribe can cause memory leaks.

---

## 5. Pub/Sub Pattern

Pub/Sub stands for Publish/Subscribe. It allows publishers and subscribers to communicate through topics or events without directly knowing each other.

## Simple meaning

A publisher emits an event. Subscribers listening to that event get called.

## Basic implementation

class EventBus \{  
  constructor() \{  
    this.events \= \{\};  
  \}

  subscribe(eventName, callback) \{  
    if (\!this.events\[eventName\]) \{  
      this.events\[eventName\] \= \[\];  
    \}

    this.events\[eventName\].push(callback);

    return () \=\> \{  
      this.events\[eventName\] \= this.events\[eventName\].filter(  
        (item) \=\> item \!== callback  
      );  
    \};  
  \}

  publish(eventName, data) \{  
    const subscribers \= this.events\[eventName\] || \[\];

    subscribers.forEach((callback) \=\> callback(data));  
  \}  
\}

const eventBus \= new EventBus();

const unsubscribe \= eventBus.subscribe("user:login", (user) \=\> \{  
  console.log("User logged in:", user.name);  
\});

eventBus.publish("user:login", \{ name: "Akhilesh" \});  
// "User logged in: Akhilesh"

unsubscribe();

## Key mental model

Publisher and subscriber do not directly know each other. The event bus sits in between.

## Practical frontend examples

* Cross-module communication.  
* Microfrontend communication.  
* Analytics events.  
* Toast notifications.  
* Global app events.  
* Legacy app integration.

## Trade-offs / common mistakes

* Reduces direct coupling.  
* Good for cross-module communication.  
* Can become hard to debug if overused.  
* Event names can become unstructured.  
* Hidden data flow can make large apps harder to reason about.  
* Need cleanup/unsubscribe to avoid memory leaks.

## Interview-ready answer

Pub/Sub allows different parts of an app to communicate through events or topics without directly referencing each other. A publisher emits an event, and subscribers listening to that event receive the data. It is useful for decoupled communication, but overuse can create hidden data flow and debugging issues.

---

## 6. Strategy Pattern

The Strategy Pattern lets us define multiple algorithms and choose one at runtime.

## Simple meaning

Instead of many `if/else` conditions, put each behavior in a separate strategy and select the required one.

## Basic example

const paymentStrategies \= \{  
  card(amount) \{  
    return \`Paid $\{amount\} using card\`;  
  \},

  upi(amount) \{  
    return \`Paid $\{amount\} using UPI\`;  
  \},

  wallet(amount) \{  
    return \`Paid $\{amount\} using wallet\`;  
  \},  
\};

function pay(amount, method) \{  
  const strategy \= paymentStrategies\[method\];

  if (\!strategy) \{  
    throw new Error("Invalid payment method");  
  \}

  return strategy(amount);  
\}

console.log(pay(100, "upi")); // "Paid 100 using UPI"

## Key mental model

The caller chooses what behavior is needed, and the strategy map executes the right algorithm.

## Practical frontend example

Sorting with multiple strategies:

const sortStrategies \= \{  
  priceLowToHigh(products) \{  
    return \[...products\].sort((a, b) \=\> a.price \- b.price);  
  \},

  priceHighToLow(products) \{  
    return \[...products\].sort((a, b) \=\> b.price \- a.price);  
  \},

  rating(products) \{  
    return \[...products\].sort((a, b) \=\> b.rating \- a.rating);  
  \},  
\};

function sortProducts(products, sortBy) \{  
  const strategy \= sortStrategies\[sortBy\];

  if (\!strategy) \{  
    return products;  
  \}

  return strategy(products);  
\}

## Why it is useful

* Avoids long conditional logic.  
* Keeps algorithms separate.  
* Easy to add new behavior.  
* Makes testing easier.  
* Useful for sorting, filtering, validation, pricing, formatting, and feature-specific behavior.

## Trade-offs / common mistakes

* Good when algorithms vary.  
* Too much abstraction for simple cases can be unnecessary.  
* Strategy names should be clear and consistent.  
* Always handle invalid strategy safely.

## Interview-ready answer

The Strategy Pattern defines multiple interchangeable algorithms and selects one at runtime. It helps replace long `if/else` or `switch` blocks with a clean strategy map. It is useful for sorting, validation, filtering, pricing, formatting, and configurable business logic.

---

## Common Interview Topics / Questions

---

## 1. Observer vs Pub/Sub

## Simple answer

Observer has direct relationship between subject and observers. Pub/Sub uses an event bus or broker between publishers and subscribers.

## Comparison

| Point | Observer Pattern | Pub/Sub Pattern |
| ----- | ----- | ----- |
| Relationship | Subject directly manages observers | Publisher and subscriber communicate through event bus |
| Coupling | More direct coupling | More decoupled |
| Communication | Subject notifies observers | Publisher emits topic/event |
| Middle layer | Usually no broker | Has event bus/broker |
| Use case | State changes, store subscriptions | Cross-module or app-wide events |
| Debugging | Easier to trace | Can be harder if overused |

## Observer example

store.subscribe(listener);  
store.setState(\{ count: 1 \});

The store directly knows and notifies listeners.

## Pub/Sub example

eventBus.subscribe("user:login", listener);  
eventBus.publish("user:login", user);

The publisher does not know who is listening.

## Interview-ready answer

Observer and Pub/Sub both handle one-to-many communication, but the relationship is different. In Observer, the subject directly stores and notifies observers. In Pub/Sub, publishers and subscribers are decoupled through an event bus or broker. Observer is common for state subscriptions, while Pub/Sub is useful for cross-module communication.

---

## 2. Singleton Implementation

## Basic implementation using closure

const Singleton \= (function () \{  
  let instance;

  function createInstance() \{  
    return \{  
      createdAt: Date.now(),  
    \};  
  \}

  return \{  
    getInstance() \{  
      if (\!instance) \{  
        instance \= createInstance();  
      \}

      return instance;  
    \},  
  \};  
\})();

const a \= Singleton.getInstance();  
const b \= Singleton.getInstance();

console.log(a \=== b); // true

## Class-based implementation

class ApiClient \{  
  static instance;

  constructor(baseUrl) \{  
    if (ApiClient.instance) \{  
      return ApiClient.instance;  
    \}

    this.baseUrl \= baseUrl;  
    ApiClient.instance \= this;  
  \}

  get(path) \{  
    return fetch(\`$\{this.baseUrl\}$\{path\}\`);  
  \}  
\}

const client1 \= new ApiClient("/api");  
const client2 \= new ApiClient("/api");

console.log(client1 \=== client2); // true

## ES Module singleton

In modern frontend apps, ES Modules naturally behave like singletons because a module is evaluated once and then cached.

// logger.js  
class Logger \{  
  log(message) \{  
    console.log(message);  
  \}  
\}

\export const logger \= new Logger();

// app.js  
\import \{ logger \} from "./logger.js";

logger.log("App started");

## Interview-ready answer

A singleton ensures only one instance of a service exists. It can be implemented using closures, static class properties, or ES Module exports. In modern JavaScript, exporting a single instance from a module is often the cleanest approach. But singletons should be used carefully because they introduce shared state and can make testing harder.

---

## 3. Factory vs Strategy

## Simple answer

Factory is about object creation. Strategy is about choosing behavior.

// Factory  
createNotification("success", "Saved");

// Strategy  
sortProducts(products, "priceLowToHigh");

## Interview-ready answer

Factory Pattern centralizes how objects are created. Strategy Pattern centralizes interchangeable behaviors or algorithms. Factory answers “what object should I create?”, while Strategy answers “which behavior should I run?”

---

## 4. When should you avoid Pub/Sub?

## Answer

Avoid Pub/Sub when direct data flow is clearer.

Pub/Sub can become hard to debug if events are scattered across the app.

## Common issues

* Hidden data flow.  
* Hard-to-track event names.  
* Memory leaks from missed unsubscribe.  
* Duplicate event firing.  
* Difficult testing.  
* No clear ownership of data.

## Interview-ready answer

I avoid Pub/Sub for normal parent-child communication or simple state updates. It is better for cross-cutting events like analytics, notifications, or microfrontend communication. Overusing it can make data flow hidden and debugging difficult.

---

## 5. Where are these patterns used in frontend apps?

## Examples

| Pattern | Frontend use case |
| ----- | ----- |
| Module | Utility modules, service modules, feature modules |
| Singleton | Logger, analytics, config, API client |
| Factory | Create UI models, notifications, form fields |
| Observer | Store subscriptions, reactive state, event listeners |
| Pub/Sub | Event bus, microfrontends, app-wide notifications |
| Strategy | Sorting, filtering, validation, pricing, formatting |

## Interview-ready answer

In frontend apps, Module Pattern is used for code organization, Singleton for shared services, Factory for creating objects based on type, Observer for subscriptions and state updates, Pub/Sub for decoupled communication, and Strategy for runtime behavior selection like sorting, filtering, validation, or formatting.

---

## Quick Revision Summary

| Pattern | Key point |
| ----- | ----- |
| Module | Encapsulates code and private state |
| Singleton | One shared instance |
| Factory | Centralizes object creation |
| Observer | Subject directly notifies observers |
| Pub/Sub | Event bus decouples publisher and subscriber |
| Strategy | Selects algorithm/behavior at runtime |
| Observer concern | Must unsubscribe to avoid leaks |
| Pub/Sub concern | Hidden data flow if overused |
| Singleton concern | Shared global state, testing difficulty |
| Factory concern | Too many branches can get messy |
| Strategy concern | Avoid over-abstraction for simple logic |

---

## Final Interview-Ready Combined Answer

JavaScript design patterns help structure code in a reusable and maintainable way. The Module Pattern encapsulates private state and exposes public methods. Singleton ensures only one shared instance exists, commonly used for logger, config, analytics, or API clients. Factory centralizes object creation. Observer allows a subject to directly notify subscribers when state changes. Pub/Sub decouples publishers and subscribers using an event bus. Strategy defines multiple algorithms and selects one at runtime, replacing long conditional logic. In interviews, the most important comparison is Observer vs Pub/Sub, where Observer has direct subject-to-observer communication, while Pub/Sub uses an intermediate event bus.

---
title: Design Patterns
sidebar_position: 26
---

# Design Patterns

Design patterns are reusable solutions to common software design problems. In JavaScript and frontend apps, they help organize code, manage state, decouple modules, handle events, create flexible logic, and keep large applications maintainable.

## Helpful References

- [Object-oriented JavaScript basics](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS)
- [Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [JavaScript design patterns](https://github.com/sudheerj/design-patterns)

## Module Pattern

The Module Pattern groups related code and hides internal implementation details.

```js
const CounterModule = (function () {
  let count = 0;

  return {
    increment() {
      count += 1;
    },

    getCount() {
      return count;
    },
  };
})();

CounterModule.increment();

console.log(CounterModule.getCount()); // 1
console.log(CounterModule.count); // undefined
```

The inner variables stay private because of closures. Only returned methods can access them.

Modern ES Modules usually replace the older IIFE-style module pattern.

```js title="counter.js"
let count = 0;

export function increment() {
  count += 1;
}

export function getCount() {
  return count;
}
```

```js title="app.js"
import { increment, getCount } from "./counter.js";

increment();
console.log(getCount()); // 1
```

Interview answer:

> The Module Pattern groups related code and hides private state using closures. In older JavaScript this was often done with IIFEs. In modern JavaScript, ES Modules provide module scope and are usually preferred.

## Singleton Pattern

The Singleton Pattern ensures only one instance of something exists.

```js
const AppConfig = (function () {
  let instance;

  function createInstance() {
    return {
      apiBaseUrl: "/api",
      theme: "dark",
    };
  }

  return {
    getInstance() {
      if (!instance) {
        instance = createInstance();
      }

      return instance;
    },
  };
})();

const config1 = AppConfig.getInstance();
const config2 = AppConfig.getInstance();

console.log(config1 === config2); // true
```

Class-based version:

```js
class Logger {
  static instance;

  constructor() {
    if (Logger.instance) {
      return Logger.instance;
    }

    this.logs = [];
    Logger.instance = this;
  }

  log(message) {
    this.logs.push(message);
  }
}

const logger1 = new Logger();
const logger2 = new Logger();

console.log(logger1 === logger2); // true
```

In modern frontend apps, exporting one instance from an ES Module is often the cleanest singleton.

```js title="logger.js"
class Logger {
  log(message) {
    console.log(message);
  }
}

export const logger = new Logger();
```

Use cases include logger, app config, analytics client, feature flag client, shared cache, and API client instances.

Use singletons carefully because they can become hidden global state and make tests harder.

## Factory Pattern

The Factory Pattern centralizes object creation.

```js
function createUser(type, name) {
  if (type === "admin") {
    return {
      name,
      role: "admin",
      canDelete: true,
    };
  }

  return {
    name,
    role: "user",
    canDelete: false,
  };
}

console.log(createUser("admin", "Akhilesh"));
```

A map-based factory keeps many creation paths cleaner than a long `if/else` chain.

```js
const notificationFactory = {
  success: (message) => ({ type: "success", icon: "success", message }),
  error: (message) => ({ type: "error", icon: "error", message }),
  info: (message) => ({ type: "info", icon: "info", message }),
};

function createNotification(type, message) {
  const factory = notificationFactory[type] || notificationFactory.info;
  return factory(message);
}

console.log(createNotification("success", "Saved"));
```

Interview answer:

> The Factory Pattern hides object creation logic behind a function or class. Callers ask for an object, and the factory decides which shape or type to create based on input, configuration, or environment.

## Observer Pattern

The Observer Pattern allows one subject to notify many observers when state changes.

```js
class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);

    return () => {
      this.unsubscribe(observer);
    };
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((item) => item !== observer);
  }

  notify(data) {
    this.observers.forEach((observer) => observer(data));
  }
}

const subject = new Subject();

const unsubscribe = subject.subscribe((data) => {
  console.log("Observer:", data);
});

subject.notify("State changed");
unsubscribe();
```

Frontend uses:

- Store subscriptions.
- Form state listeners.
- UI state updates.
- Event listeners.
- Reactive systems.
- Observable streams.

The subject directly manages observers, so cleanup matters. Forgetting to unsubscribe can cause memory leaks.

## Pub/Sub Pattern

Pub/Sub allows publishers and subscribers to communicate through topics or events without directly knowing each other.

```js
class EventBus {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(callback);

    return () => {
      this.events[eventName] = this.events[eventName].filter(
        (item) => item !== callback
      );
    };
  }

  publish(eventName, data) {
    const subscribers = this.events[eventName] || [];
    subscribers.forEach((callback) => callback(data));
  }
}

const eventBus = new EventBus();

const unsubscribe = eventBus.subscribe("user:login", (user) => {
  console.log("User logged in:", user.name);
});

eventBus.publish("user:login", { name: "Akhilesh" });
unsubscribe();
```

Pub/Sub is useful for analytics events, toast notifications, microfrontend communication, app-wide events, and legacy integration. Avoid overusing it for simple parent-child data flow because it can hide ownership and make debugging harder.

## Strategy Pattern

The Strategy Pattern defines multiple algorithms and chooses one at runtime.

```js
const paymentStrategies = {
  card(amount) {
    return `Paid ${amount} using card`;
  },
  upi(amount) {
    return `Paid ${amount} using UPI`;
  },
  wallet(amount) {
    return `Paid ${amount} using wallet`;
  },
};

function pay(amount, method) {
  const strategy = paymentStrategies[method];

  if (!strategy) {
    throw new Error("Invalid payment method");
  }

  return strategy(amount);
}

console.log(pay(100, "upi"));
```

Frontend sorting example:

```js
const sortStrategies = {
  priceLowToHigh(products) {
    return [...products].sort((a, b) => a.price - b.price);
  },
  priceHighToLow(products) {
    return [...products].sort((a, b) => b.price - a.price);
  },
  rating(products) {
    return [...products].sort((a, b) => b.rating - a.rating);
  },
};

function sortProducts(products, sortBy) {
  const strategy = sortStrategies[sortBy];
  return strategy ? strategy(products) : products;
}
```

Strategy is useful for sorting, filtering, validation, pricing, formatting, and configurable business logic.

## Observer vs Pub/Sub

| Point | Observer Pattern | Pub/Sub Pattern |
| --- | --- | --- |
| Relationship | Subject directly manages observers | Publisher and subscriber communicate through an event bus |
| Coupling | More direct coupling | More decoupled |
| Communication | Subject notifies observers | Publisher emits topic/event |
| Middle layer | Usually no broker | Has event bus/broker |
| Use case | State changes and store subscriptions | Cross-module or app-wide events |
| Debugging | Easier to trace | Can be harder if overused |

Interview answer:

> Observer and Pub/Sub both support one-to-many communication. In Observer, the subject directly stores and notifies observers. In Pub/Sub, publishers and subscribers are decoupled through an event bus or broker.

## Factory vs Strategy

Factory is about object creation. Strategy is about choosing behavior.

```js
createNotification("success", "Saved"); // Factory
sortProducts(products, "priceLowToHigh"); // Strategy
```

Interview answer:

> Factory answers "what object should I create?" Strategy answers "which behavior should I run?"

## Frontend Usage Summary

| Pattern | Frontend use case |
| --- | --- |
| Module | Utility modules, service modules, feature modules |
| Singleton | Logger, analytics, config, API client |
| Factory | UI models, notifications, form fields |
| Observer | Store subscriptions, reactive state, event listeners |
| Pub/Sub | Event bus, microfrontends, app-wide notifications |
| Strategy | Sorting, filtering, validation, pricing, formatting |

## Quick Revision

| Pattern | Key point | Main concern |
| --- | --- | --- |
| Module | Encapsulates code and private state | Hidden shared state if overused |
| Singleton | One shared instance | Testing difficulty and global state |
| Factory | Centralizes object creation | Too many branches can get messy |
| Observer | Subject directly notifies observers | Must unsubscribe to avoid leaks |
| Pub/Sub | Event bus decouples sender and receiver | Hidden data flow if overused |
| Strategy | Selects behavior at runtime | Avoid unnecessary abstraction |

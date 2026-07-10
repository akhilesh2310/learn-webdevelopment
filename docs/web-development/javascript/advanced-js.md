---
title: Advanced JS
sidebar_position: 23
---

# Advanced JS

Advanced JavaScript topics usually test how well you understand functions, timing, caching, iteration, lazy computation, and object interception. In frontend work, these patterns appear in search inputs, scroll handlers, expensive calculations, API caching, reusable utilities, and framework internals.

## Currying

Currying transforms a function that takes multiple arguments into a sequence of functions that each take one argument.

```js
function add(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

console.log(add(1)(2)(3)); // 6
```

Currying works through closures. Each returned function remembers the values passed before it.

```js
const hasPermission = (requiredRole) => (user) => {
  return user.roles.includes(requiredRole);
};

const canEdit = hasPermission("editor");

console.log(canEdit({ roles: ["viewer", "editor"] })); // true
```

This is useful when you want to preconfigure a function and reuse it later.

```js
function buildApiUrl(baseUrl) {
  return function (version) {
    return function (endpoint) {
      return `${baseUrl}/${version}/${endpoint}`;
    };
  };
}

const productionGateway = buildApiUrl("https://api.production.com")("v1");

console.log(productionGateway("users"));
// "https://api.production.com/v1/users"
```

Currying is not the same as simply calling a normal function with fewer arguments.

```js
function add(a, b) {
  return a + b;
}

console.log(add(1)); // NaN
```

Interview answer:

> Currying converts a multi-argument function into a chain of single-argument functions. It works through closures and is useful for partial application, reusable validators, filters, and function composition.

### Infinite Currying

Infinite currying keeps collecting values until the caller explicitly ends the chain.

```js
function add(a) {
  return function next(b) {
    if (b === undefined) {
      return a;
    }

    return add(a + b);
  };
}

console.log(add(1)(2)(3)(4)(5)()); // 15
```

Another version uses JavaScript coercion hooks.

```js
function add(a) {
  function inner(b) {
    return add(a + b);
  }

  inner.valueOf = () => a;
  inner.toString = () => String(a);

  return inner;
}

console.log(add(1)(2)(3) == 6); // true
```

## Debouncing

Debouncing delays a function until a period of silence has passed after the last call.

Search input is the classic use case. Without debounce, every keystroke can trigger an API call. With debounce, the request runs after the user stops typing.

```js
function debounce(fn, delay) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const search = debounce(function (query) {
  console.log("Searching:", query);
}, 500);

search("r");
search("re");
search("react");

// After 500ms:
// "Searching: react"
```

How it works:

- Every call clears the previous timer.
- A new timer is scheduled.
- If another call happens before the delay, the timer resets.
- The function runs only after no new calls happen during the delay.

Good use cases:

- Search input.
- Auto-save draft.
- Resize event handling.
- Validation after typing stops.
- API calls after filter changes.

Interview answer:

> Debouncing delays execution until an event stops firing for a specified time. It is useful when only the final user action matters, such as search, auto-save, resize handling, or expensive validation.

## Throttling

Throttling limits how often a function can run over time.

```js
function throttle(fn, delay) {
  let lastRun = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastRun >= delay) {
      lastRun = now;
      fn.apply(this, args);
    }
  };
}

const onScroll = throttle(function () {
  console.log("Scroll position:", window.scrollY);
}, 200);

window.addEventListener("scroll", onScroll);
```

Throttle is useful for continuous events where you still need regular updates.

Good use cases:

- Scroll progress.
- Window resize.
- Mouse movement.
- Drag interactions.
- Infinite scroll checks.

### Debounce vs Throttle

| Topic | Debounce | Throttle |
| --- | --- | --- |
| Behavior | Runs after activity stops | Runs at most once per interval |
| Best for | Final action | Continuous updates |
| Example | Search input | Scroll listener |
| Mental model | Wait until quiet | Run regularly, but limited |

Interview answer:

> Debounce waits until events stop before running. Throttle runs at a controlled frequency while events continue. Search inputs usually use debounce, while scroll or resize listeners often use throttle.

## Memoization

Memoization caches the result of an expensive function call and returns the cached result when the same input appears again.

```js
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const slowAdd = memoize((a, b) => {
  console.log("Calculating...");
  return a + b;
});

console.log(slowAdd(2, 3)); // Calculates
console.log(slowAdd(2, 3)); // Uses cache
```

Memoization is useful for expensive pure functions. It is less safe when the function depends on time, random values, external state, or mutable objects.

Interview answer:

> Memoization stores function results by input. It improves performance for expensive pure functions because repeated calls can return cached values instead of recalculating.

## Lazy Evaluation

Lazy evaluation delays work until the result is actually needed.

```js
function createLazyValue(factory) {
  let calculated = false;
  let value;

  return function getValue() {
    if (!calculated) {
      value = factory();
      calculated = true;
    }

    return value;
  };
}

const getExpensiveValue = createLazyValue(() => {
  console.log("Calculating...");
  return 42;
});

console.log(getExpensiveValue()); // Calculates
console.log(getExpensiveValue()); // Reuses value
```

Lazy evaluation helps avoid unnecessary work, especially for expensive computations, optional features, and values that might never be used.

## Iterators

An iterator is an object with a `next()` method. Each call returns an object with `value` and `done`.

```js
function createCounter(limit) {
  let count = 0;

  return {
    next() {
      if (count < limit) {
        count += 1;
        return { value: count, done: false };
      }

      return { value: undefined, done: true };
    },
  };
}

const counter = createCounter(3);

console.log(counter.next()); // { value: 1, done: false }
console.log(counter.next()); // { value: 2, done: false }
console.log(counter.next()); // { value: 3, done: false }
console.log(counter.next()); // { value: undefined, done: true }
```

Objects become iterable when they implement `Symbol.iterator`.

```js
const range = {
  start: 1,
  end: 3,
  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;

    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        }

        return { value: undefined, done: true };
      },
    };
  },
};

for (const number of range) {
  console.log(number);
}
```

## Generators

A generator is a special function that can pause and resume execution using `yield`.

```js
function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}

const iterator = numbers();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

Generators are useful for lazy sequences.

```js
function* idGenerator() {
  let id = 1;

  while (true) {
    yield id++;
  }
}

const ids = idGenerator();

console.log(ids.next().value); // 1
console.log(ids.next().value); // 2
```

Interview answer:

> Generators are functions that can pause with `yield` and resume later. They return iterators and are useful for lazy sequences, custom iteration, and controlled asynchronous flows.

## Proxy

`Proxy` lets you intercept operations on an object, such as reading, writing, deleting, or checking properties.

```js
const user = {
  name: "Akhilesh",
  role: "admin",
};

const proxyUser = new Proxy(user, {
  get(target, property) {
    console.log(`Reading ${String(property)}`);
    return target[property];
  },
  set(target, property, value) {
    console.log(`Setting ${String(property)}`);
    target[property] = value;
    return true;
  },
});

console.log(proxyUser.name);
proxyUser.role = "editor";
```

Proxies are useful for validation, logging, reactive state systems, access control, and API wrappers.

```js
const settings = new Proxy(
  {},
  {
    get(target, property) {
      return property in target ? target[property] : "Not configured";
    },
  }
);

console.log(settings.theme); // "Not configured"
```

## Reflect

`Reflect` provides methods that mirror common object operations. It is often used inside proxy traps to preserve default behavior.

```js
const user = {
  name: "Akhilesh",
};

const proxyUser = new Proxy(user, {
  get(target, property, receiver) {
    console.log(`Reading ${String(property)}`);
    return Reflect.get(target, property, receiver);
  },
  set(target, property, value, receiver) {
    console.log(`Setting ${String(property)}`);
    return Reflect.set(target, property, value, receiver);
  },
});

console.log(proxyUser.name);
proxyUser.name = "Alex";
```

Interview answer:

> `Proxy` intercepts object operations. `Reflect` provides standard methods for those operations, which makes proxy traps easier to write correctly.

## Practice Implementations

These topics are commonly asked as coding tasks:

- Implement debounce.
- Implement throttle.
- Implement memoization.
- Implement currying.
- Implement infinite currying.
- Create a custom iterable.
- Use a generator for a lazy sequence.

See [JavaScript Coding Questions](./javascript-coding-questions.md) for implementation-focused practice.

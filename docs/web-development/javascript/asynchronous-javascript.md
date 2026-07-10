---
title: Asynchronous JavaScript
sidebar_position: 19
---

# Asynchronous JavaScript

Related canonical page: [Event Loop](event-loop.md).

References:

- [JavaScript.info Async](https://javascript.info/async)
- [JavaScript.info Promise Basics](https://javascript.info/promise-basics)
- [GeeksforGeeks Async/Await](https://www.geeksforgeeks.org/async-await-function-in-javascript/)

JavaScript is single-threaded, but it handles asynchronous work using browser/runtime APIs, queues, promises, and the event loop.

## Synchronous vs Asynchronous

Synchronous code runs line by line and blocks the next line until the current line finishes.

Asynchronous code starts now and finishes later, allowing JavaScript to continue running other code.

```js
console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

console.log("3");

// 1
// 3
// 2
```

JavaScript executes synchronous code first. Async callbacks run later when the call stack is empty.

## Callbacks

A callback is a function passed into another function to be executed later.

```js
function fetchUser(callback) {
  setTimeout(() => {
    callback({ id: 1, name: "Akhilesh" });
  }, 1000);
}

fetchUser((user) => {
  console.log(user.name);
});
```

Callbacks are common in events and older async APIs.

```js
button.addEventListener("click", () => {
  console.log("Button clicked");
});
```

Callback drawbacks:

- Can be called multiple times accidentally.
- Error handling can be awkward.
- Deep nesting becomes hard to maintain.
- Control flow becomes difficult in large async code.

## Callback Hell

Callback hell happens when async operations are nested deeply.

```js
getUser((user) => {
  getOrders(user.id, (orders) => {
    getPayment(orders[0].id, (payment) => {
      sendEmail(payment.id, () => {
        console.log("Done");
      });
    });
  });
});
```

Better with promises:

```js
getUser()
  .then((user) => getOrders(user.id))
  .then((orders) => getPayment(orders[0].id))
  .then((payment) => sendEmail(payment.id))
  .then(() => {
    console.log("Done");
  })
  .catch((error) => {
    console.error(error);
  });
```

Better with async/await:

```js
async function processOrder() {
  try {
    const user = await getUser();
    const orders = await getOrders(user.id);
    const payment = await getPayment(orders[0].id);

    await sendEmail(payment.id);

    console.log("Done");
  } catch (error) {
    console.error(error);
  }
}
```

## Promises

A promise represents the future result of an asynchronous operation.

```js
const promise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("Data loaded");
  } else {
    reject(new Error("Something went wrong"));
  }
});

promise.then((data) => {
  console.log(data);
});
```

Promise states:

- `pending`: operation is still running.
- `fulfilled`: operation completed successfully.
- `rejected`: operation failed.

Once a promise settles, its state cannot change.

```js
const promise = new Promise((resolve, reject) => {
  resolve("Success");
  reject(new Error("Error"));
});

promise.then(console.log);
// Success
```

## Promise Chaining

Each `.then()` receives the value returned from the previous `.then()`.

```js
Promise.resolve(10)
  .then((value) => value * 2)
  .then((value) => value + 5)
  .then((value) => {
    console.log(value);
  });

// 25
```

Returning a promise makes the next `.then()` wait.

```js
getUser()
  .then((user) => {
    return getOrders(user.id);
  })
  .then((orders) => {
    return getPayment(orders[0].id);
  })
  .then((payment) => {
    console.log(payment);
  });
```

Common trap:

```js
getUser()
  .then((user) => {
    getOrders(user.id);
  })
  .then((orders) => {
    console.log(orders);
  });

// orders is undefined
```

The promise was not returned from the first `.then()`.

## Promise Error Handling

Use `.catch()` to handle promise rejections.

```js
fetchUser()
  .then((user) => fetchOrders(user.id))
  .then((orders) => {
    console.log(orders);
  })
  .catch((error) => {
    console.error(error);
  });
```

A final `.catch()` can catch errors from previous steps.

```js
Promise.resolve()
  .then(() => {
    throw new Error("Step failed");
  })
  .then(() => {
    console.log("This will not run");
  })
  .catch((error) => {
    console.log(error.message);
  });

// Step failed
```

If `.catch()` returns a value, the chain recovers.

```js
Promise.reject("API failed")
  .catch((error) => {
    console.log(error);
    return "Fallback data";
  })
  .then((data) => {
    console.log(data);
  });

// API failed
// Fallback data
```

## Promise APIs

### `Promise.all()`

Runs promises in parallel and resolves when all fulfill. It rejects as soon as one promise rejects.

```js
const [profile, permissions, settings] = await Promise.all([
  fetchProfile(),
  fetchPermissions(),
  fetchSettings(),
]);
```

Trap:

```js
Promise.all([
  Promise.resolve("A"),
  Promise.reject("B failed"),
  Promise.resolve("C"),
]).catch((error) => {
  console.log(error);
});

// B failed
```

### `Promise.allSettled()`

Waits for all promises to settle, whether they fulfill or reject.

```js
const results = await Promise.allSettled([
  Promise.resolve("A"),
  Promise.reject("B failed"),
]);

console.log(results);
// [
//   { status: "fulfilled", value: "A" },
//   { status: "rejected", reason: "B failed" }
// ]
```

Use it when partial success is acceptable.

### `Promise.any()`

Resolves with the first fulfilled promise. If all promises reject, it rejects with `AggregateError`.

```js
const result = await Promise.any([
  Promise.reject("Server 1 failed"),
  Promise.resolve("Server 2 success"),
  Promise.resolve("Server 3 success"),
]);

console.log(result);
// Server 2 success
```

### `Promise.race()`

Settles as soon as the first promise settles, whether fulfilled or rejected.

```js
const result = await Promise.race([
  new Promise((resolve) => setTimeout(() => resolve("Fast"), 100)),
  new Promise((resolve) => setTimeout(() => resolve("Slow"), 500)),
]);

console.log(result);
// Fast
```

Timeout pattern:

```js
function timeout(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Request timed out")), ms);
  });
}

Promise.race([fetchData(), timeout(3000)]).catch((error) => {
  console.log(error.message);
});
```

`Promise.race()` does not cancel the losing promises. It only picks the first settled result.

## Async/Await

`async/await` is syntax built on top of promises.

```js
async function getUser() {
  const user = await fetchUser();

  return user;
}

getUser().then((user) => {
  console.log(user);
});
```

An async function always returns a promise. `await` pauses only that async function, not the whole JavaScript thread.

```js
async function demo() {
  console.log("1");

  await Promise.resolve();

  console.log("2");
}

demo();
console.log("3");

// 1
// 3
// 2
```

### Error Handling

```js
async function loadUser() {
  try {
    const user = await fetchUser();
    console.log(user);
  } catch (error) {
    console.error(error);
  }
}
```

### Sequential vs Parallel

Sequential:

```js
const user = await fetchUser();
const orders = await fetchOrders(user.id);
```

Parallel:

```js
const [user, orders] = await Promise.all([fetchUser(), fetchOrders()]);
```

Use sequential `await` when each request depends on the previous result. Use `Promise.all()` when requests are independent.

### Avoid `async` Inside `forEach`

```js
const ids = [1, 2, 3];

ids.forEach(async (id) => {
  await fetchUser(id);
});

console.log("Done");
```

`Done` logs before the fetches finish because `forEach` does not await async callbacks.

Parallel fix:

```js
await Promise.all(ids.map((id) => fetchUser(id)));

console.log("Done");
```

Sequential fix:

```js
for (const id of ids) {
  await fetchUser(id);
}

console.log("Done");
```

## Fetch API

`fetch` makes HTTP requests from the browser and returns a promise.

```js
async function getUsers() {
  const response = await fetch("/api/users");
  const data = await response.json();

  return data;
}
```

Important: `fetch()` rejects for network failures, but it does not reject for HTTP status codes like `404` or `500`.

```js
async function request(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return response.json();
}
```

POST request:

```js
async function createUser(user) {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return response.json();
}
```

## AbortController

`AbortController` cancels in-flight async operations, especially fetch requests.

```js
const controller = new AbortController();

fetch("/api/users", {
  signal: controller.signal,
});

controller.abort();
```

Search example:

```js
let controller;

async function searchUsers(query) {
  if (controller) {
    controller.abort();
  }

  controller = new AbortController();

  try {
    const response = await fetch(`/api/users?q=${query}`, {
      signal: controller.signal,
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Request was cancelled");
      return;
    }

    console.error(error);
  }
}
```

React cleanup example:

```js
useEffect(() => {
  const controller = new AbortController();

  async function loadData() {
    try {
      const response = await fetch("/api/users", {
        signal: controller.signal,
      });

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      if (error.name === "AbortError") {
        return;
      }

      setError(error.message);
    }
  }

  loadData();

  return () => {
    controller.abort();
  };
}, []);
```

## Microtasks vs Macrotasks

For the full browser event loop model, see [Event Loop](event-loop.md).

```js
console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve().then(() => {
  console.log("3");
});

console.log("4");

// 1
// 4
// 3
// 2
```

Promise callbacks run in the microtask queue. `setTimeout` callbacks run in the macrotask queue. Microtasks run before the next macrotask.

## Quick Revision Summary

| Topic | Key Point |
| :---- | :---- |
| Synchronous | Runs line by line |
| Asynchronous | Starts now, finishes later |
| Callback | Function passed to run later |
| Callback hell | Deeply nested async callbacks |
| Promise | Represents future async result |
| `.catch()` | Handles promise rejection |
| `Promise.all()` | All must succeed, fails fast |
| `Promise.allSettled()` | Waits for all results |
| `Promise.any()` | First successful promise wins |
| `Promise.race()` | First settled promise wins |
| `async/await` | Cleaner syntax over promises |
| `fetch` | Does not reject on HTTP `404` or `500` |
| `AbortController` | Cancels fetch requests |

## Interview Answer

JavaScript is single-threaded, but it handles asynchronous operations using runtime APIs, queues, promises, and the event loop. Callbacks were the older way to handle async logic, but they can lead to callback hell. Promises represent future success or failure, while `async/await` is cleaner syntax built on promises. `Promise.all`, `allSettled`, `any`, and `race` help manage multiple promises. For API calls, `fetch` returns a promise but does not reject on HTTP errors, so we check `response.ok`. `AbortController` cancels requests and helps prevent stale UI updates.

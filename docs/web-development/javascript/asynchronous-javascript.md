---
title: Asynchronous JavaScript
sidebar_position: 19
---

# Asynchronous JavaScript

## [**https://javascript.info/async**](https://javascript.info/async)

[https://chatgpt.com/c/6a32d66c-f7f8-83ee-9168-fd343d87ca68](https://chatgpt.com/c/6a32d66c-f7f8-83ee-9168-fd343d87ca68)

[https://javascript.info/promise-basics](https://javascript.info/promise-basics)

[https://www.geeksforgeeks.org/async-await-function-in-javascript/](https://www.geeksforgeeks.org/async-await-function-in-javascript/)

## **Synchronous vs Asynchronous**

## **Callbacks**

## **Callback Hell**

## **Promises**

* Promise States  
* Promise Chaining  
* Error Handling

## **Promise APIs**

* Promise.all()  
* Promise.allSettled()  
* Promise.any()  
* Promise.race()

## **Async/Await**

## **Fetch API**

## **AbortController**

## **Provide some Common Interview Topics/questions like below**

* Promise chaining  
* Async/Await flow

# **Synchronous vs Asynchronous JavaScript**

JavaScript is single-threaded, but it can handle asynchronous work using the browser/runtime APIs, callback queue, microtask queue, and event loop. This is why JavaScript can start an API call, timer, or file operation without blocking the main thread.

## **Simple meaning**

**Synchronous** code runs line by line and blocks the next line until the current line finishes.

**Asynchronous** code starts now but finishes later, allowing JavaScript to continue executing other code.

console.log("1");

setTimeout(() \=\> \{  
  console.log("2");  
\}, 0);

console.log("3");

// Output:  
// 1  
// 3  
// 2

## **Key mental model**

JavaScript executes synchronous code first. Async callbacks run later when the call stack is empty.

## **How it works**

* Synchronous code goes directly to the call stack.  
* Async work like `setTimeout`, fetch, DOM events, etc. is handled by browser/runtime APIs.  
* When async work completes, its callback waits in a queue.  
* The event loop pushes it back to the call stack when the stack is empty.

## **Practical frontend example**

When a user clicks “Search”, the UI should not freeze while the API call is running. JavaScript starts the request, keeps the page interactive, and updates the UI when the response arrives.

## **Common mistake**

Thinking asynchronous means multi-threaded JavaScript. JavaScript itself runs one piece of code at a time on the main thread, but async operations are handled outside the main call stack by the runtime.

## **Interview-ready answer**

Synchronous code runs line by line and blocks further execution. Asynchronous code starts an operation and continues executing other code while waiting for the result. JavaScript handles async behavior using runtime APIs, queues, and the event loop.

---

# **Callbacks**

A callback is a function passed into another function to be executed later. Callbacks are one of the oldest ways to handle asynchronous behavior in JavaScript.

## **Simple meaning**

A callback says: “When this work is done, call this function.”

function fetchUser(callback) \{  
  setTimeout(() \=\> \{  
    callback(\{ id: 1, name: "Akhilesh" \});  
  \}, 1000);  
\}

fetchUser((user) \=\> \{  
  console.log(user.name); // "Akhilesh"  
\});

## **Key mental model**

Callbacks allow us to continue logic after an async operation completes.

## **Practical frontend example**

button.addEventListener("click", () \=\> \{  
  console.log("Button clicked");  
\});

The function passed to `addEventListener` is a callback. It runs later when the user clicks.

## **Important edge cases / traps**

* Callback can be called multiple times accidentally.  
* Error handling is not always clean.  
* Nested callbacks become hard to read.  
* Control flow becomes difficult in large async code.

## **Interview-ready answer**

A callback is a function passed to another function and executed later. It is commonly used for events, timers, and async operations, but deeply nested callbacks can make code hard to maintain.

---

# **Callback Hell**

Callback hell happens when multiple asynchronous operations are nested inside each other, making code hard to read, debug, and maintain.

## **Simple meaning**

It is a pyramid of nested callbacks.

getUser((user) \=\> \{  
  getOrders(user.id, (orders) \=\> \{  
    getPayment(orders\[0\].id, (payment) \=\> \{  
      sendEmail(payment.id, () \=\> \{  
        console.log("Done");  
      \});  
    \});  
  \});  
\});

## **Key mental model**

Each next async task depends on the previous task, so we keep nesting callbacks.

## **Problems**

* Poor readability.  
* Difficult error handling.  
* Hard to reuse logic.  
* Hard to test.  
* Easy to create bugs.

## **Better with promises**

getUser()  
  .then((user) \=\> getOrders(user.id))  
  .then((orders) \=\> getPayment(orders\[0\].id))  
  .then((payment) \=\> sendEmail(payment.id))  
  .then(() \=\> \{  
    console.log("Done");  
  \})  
  .catch((error) \=\> \{  
    console.error(error);  
  \});

## **Better with async/await**

async function processOrder() \{  
  try \{  
    const user \= await getUser();  
    const orders \= await getOrders(user.id);  
    const payment \= await getPayment(orders\[0\].id);

    await sendEmail(payment.id);

    console.log("Done");  
  \} catch (error) \{  
    console.error(error);  
  \}  
\}

## **Interview-ready answer**

Callback hell happens when async callbacks are deeply nested. It makes code difficult to read, test, and handle errors. Promises and async/await solve this by making async flow more linear and easier to maintain.

---

# **Promises**

A Promise represents a value that may be available now, later, or never. It is used to handle asynchronous operations more cleanly than callbacks.

## **Simple meaning**

A promise is an object that represents the future result of an async operation.

const promise \= new Promise((resolve, reject) \=\> \{  
  const success \= true;

  if (success) \{  
    resolve("Data loaded");  
  \} else \{  
    reject("Something went wrong");  
  \}  
\});

promise.then((data) \=\> \{  
  console.log(data); // "Data loaded"  
\});

## **Key mental model**

Promise means: “I do not have the value yet, but I promise to either give you the result or an error later.”

## **Promise states**

A promise has three states:

* `pending`: initial state, operation is still running.  
* `fulfilled`: operation completed successfully.  
* `rejected`: operation failed.

Once fulfilled or rejected, the promise is settled and cannot change state again.

const promise \= new Promise((resolve, reject) \=\> \{  
  resolve("Success");  
  reject("Error");  
\});

promise.then(console.log); // "Success"

Answer: Only `"Success"` logs because the promise state is settled after the first `resolve`.

## **Interview-ready answer**

A promise is an object that represents the eventual success or failure of an asynchronous operation. It starts in the pending state, then becomes either fulfilled or rejected. Once settled, its state cannot change.

---

# **Promise Chaining**

Promise chaining means returning a value or another promise from `.then()` so the next `.then()` receives the result.

## **Simple meaning**

Each `.then()` can transform the result and pass it to the next step.

Promise.resolve(10)  
  .then((value) \=\> value \* 2\)  
  .then((value) \=\> value \+ 5\)  
  .then((value) \=\> \{  
    console.log(value); // 25  
  \});

## **Key mental model**

Whatever you return from one `.then()` becomes the input for the next `.then()`.

## **Returning a promise**

getUser()  
  .then((user) \=\> \{  
    return getOrders(user.id);  
  \})  
  .then((orders) \=\> \{  
    return getPayment(orders\[0\].id);  
  \})  
  .then((payment) \=\> \{  
    console.log(payment);  
  \});

The next `.then()` waits if the previous `.then()` returns a promise.

## **Common trap: missing return**

getUser()  
  .then((user) \=\> \{  
    getOrders(user.id);  
  \})  
  .then((orders) \=\> \{  
    console.log(orders); // undefined  
  \});

Why? `getOrders(user.id)` was not returned, so the next `.then()` receives `undefined`.

Correct:

getUser()  
  .then((user) \=\> \{  
    return getOrders(user.id);  
  \})  
  .then((orders) \=\> \{  
    console.log(orders);  
  \});

## **Interview-ready answer**

Promise chaining is used to run async steps in sequence. Each `.then()` receives the value returned from the previous `.then()`. If a `.then()` returns another promise, the next `.then()` waits for it. A common mistake is forgetting to return the promise inside `.then()`.

---

# **Promise Error Handling**

Promise errors are handled using `.catch()` or the second argument of `.then()`, but `.catch()` is usually cleaner.

## **Simple example**

fetchUser()  
  .then((user) \=\> fetchOrders(user.id))  
  .then((orders) \=\> \{  
    console.log(orders);  
  \})  
  .catch((error) \=\> \{  
    console.error(error);  
  \});

## **Key mental model**

One `.catch()` at the end can catch errors from any previous step in the chain.

Promise.resolve()  
  .then(() \=\> \{  
    throw new Error("Step failed");  
  \})  
  .then(() \=\> \{  
    console.log("This will not run");  
  \})  
  .catch((error) \=\> \{  
    console.log(error.message); // "Step failed"  
  \});

## **Recovering from an error**

Promise.reject("API failed")  
  .catch((error) \=\> \{  
    console.log(error); // "API failed"  
    return "Fallback data";  
  \})  
  .then((data) \=\> \{  
    console.log(data); // "Fallback data"  
  \});

Answer: After `.catch()` returns a value, the chain continues as fulfilled.

## **Common mistake**

Promise.reject("Failed")  
  .catch((error) \=\> \{  
    console.log(error); // "Failed"  
  \})  
  .then(() \=\> \{  
    console.log("Still runs");  
  \});

Answer: `"Still runs"` logs because `.catch()` handled the rejection and returned `undefined`.

## **Interview-ready answer**

Promise errors can be handled using `.catch()`. A `.catch()` at the end catches errors from the previous chain. If `.catch()` returns a value, the promise chain recovers and continues. If it throws again, the chain remains rejected.

---

# **Promise APIs**

JavaScript provides static promise methods to handle multiple promises together.

The most important ones are:

* `Promise.all()`  
* `Promise.allSettled()`  
* `Promise.any()`  
* `Promise.race()`

---

# **Promise.all()**

`Promise.all()` runs multiple promises in parallel and waits for all of them to fulfill.

## **Simple meaning**

Use it when all async operations are required.

const userPromise \= fetchUser();  
const ordersPromise \= fetchOrders();

Promise.all(\[userPromise, ordersPromise\])  
  .then((\[user, orders\]) \=\> \{  
    console.log(user, orders);  
  \})  
  .catch((error) \=\> \{  
    console.error(error);  
  \});

## **Key behavior**

* Returns results in the same order as input promises.  
* Fails fast if any promise rejects.  
* Good when all requests are mandatory.

Promise.all(\[  
  Promise.resolve("A"),  
  Promise.reject("B failed"),  
  Promise.resolve("C"),  
\])  
  .then((result) \=\> \{  
    console.log(result);  
  \})  
  .catch((error) \=\> \{  
    console.log(error); // "B failed"  
  \});

Answer: It rejects with `"B failed"` as soon as one promise rejects.

## **Practical frontend example**

Load dashboard data where all widgets are required.

const \[profile, permissions, settings\] \= await Promise.all(\[  
  fetchProfile(),  
  fetchPermissions(),  
  fetchSettings(),  
\]);

## **Interview-ready answer**

`Promise.all()` runs promises in parallel and resolves when all promises fulfill. It returns results in the same order as the input array. It rejects immediately if any promise rejects, so it is best when all async operations are required.

---

# **Promise.allSettled()**

`Promise.allSettled()` waits for all promises to finish, whether they succeed or fail.

## **Simple meaning**

Use it when you want results of all promises, even if some fail.

const results \= await Promise.allSettled(\[  
  Promise.resolve("A"),  
  Promise.reject("B failed"),  
\]);

console.log(results);  
// \[  
//   \{ status: "fulfilled", value: "A" \},  
//   \{ status: "rejected", reason: "B failed" \}  
// \]

## **Key behavior**

* Never fails fast.  
* Waits for all promises.  
* Returns status for each promise.  
* Useful for partial success UI.

## **Practical frontend example**

A dashboard has multiple independent widgets. If one API fails, still show other widgets.

const results \= await Promise.allSettled(\[  
  fetchRevenue(),  
  fetchCampaigns(),  
  fetchNotifications(),  
\]);

const successfulData \= results  
  .filter((result) \=\> result.status \=== "fulfilled")  
  .map((result) \=\> result.value);

## **Interview-ready answer**

`Promise.allSettled()` waits for all promises to settle and returns each result with a status of fulfilled or rejected. It is useful when operations are independent and partial success is acceptable.

---

# **Promise.any()**

`Promise.any()` resolves with the first fulfilled promise.

## **Simple meaning**

Use it when you only need the first successful result.

const result \= await Promise.any(\[  
  Promise.reject("Server 1 failed"),  
  Promise.resolve("Server 2 success"),  
  Promise.resolve("Server 3 success"),  
\]);

console.log(result); // "Server 2 success"

## **Key behavior**

* Resolves with the first successful promise.  
* Ignores rejected promises until all fail.  
* If all promises reject, it rejects with `AggregateError`.

Promise.any(\[  
  Promise.reject("A failed"),  
  Promise.reject("B failed"),  
\]).catch((error) \=\> \{  
  console.log(error instanceof AggregateError); // true  
\});

## **Practical frontend example**

Try multiple mirror endpoints/CDNs and use whichever succeeds first.

## **Promise.any vs Promise.race**

`Promise.any()` waits for first success. `Promise.race()` settles on first result, success or failure.

## **Interview-ready answer**

`Promise.any()` resolves with the first fulfilled promise. It ignores failures unless all promises fail, in which case it rejects with `AggregateError`. It is useful when any one successful result is enough.

---

# **Promise.race()**

`Promise.race()` settles as soon as the first promise settles, whether fulfilled or rejected.

## **Simple meaning**

Use it when the first completed result matters.

const result \= await Promise.race(\[  
  new Promise((resolve) \=\> setTimeout(() \=\> resolve("Fast"), 100)),  
  new Promise((resolve) \=\> setTimeout(() \=\> resolve("Slow"), 500)),  
\]);

console.log(result); // "Fast"

## **Key behavior**

* First settled promise wins.  
* Can resolve or reject.  
* Useful for timeout patterns.

## **Timeout example**

function timeout(ms) \{  
  return new Promise((\_, reject) \=\> \{  
    setTimeout(() \=\> reject(new Error("Request timed out")), ms);  
  \});  
\}

Promise.race(\[fetchData(), timeout(3000)\])  
  .then((data) \=\> \{  
    console.log(data);  
  \})  
  .catch((error) \=\> \{  
    console.log(error.message); // "Request timed out"  
  \});

## **Important trap**

`Promise.race()` does not automatically cancel other promises. It only decides which result to use first.

## **Interview-ready answer**

`Promise.race()` settles with the first promise that settles, whether it fulfills or rejects. It is useful for timeout handling or when only the fastest result matters, but it does not cancel the remaining promises automatically.

---

# **Async/Await**

`async/await` is syntax built on top of promises. It makes asynchronous code look and read like synchronous code.

## **Simple meaning**

`async` makes a function return a promise. `await` pauses execution inside that async function until the promise settles.

async function getUser() \{  
  const user \= await fetchUser();

  return user;  
\}

getUser().then((user) \=\> \{  
  console.log(user);  
\});

## **Key mental model**

`await` pauses only the async function, not the whole JavaScript thread.

async function demo() \{  
  console.log("1");

  await Promise.resolve();

  console.log("2");  
\}

demo();

console.log("3");

// Output:  
// 1  
// 3  
// 2

Why?

* `demo()` starts and logs `1`.  
* `await` pauses the rest of `demo`.  
* Global code continues and logs `3`.  
* After promise resolves, async function continues and logs `2`.

## **Error handling with async/await**

async function loadUser() \{  
  try \{  
    const user \= await fetchUser();  
    console.log(user);  
  \} catch (error) \{  
    console.error(error);  
  \}  
\}

## **Sequential vs parallel await**

Sequential:

const user \= await fetchUser();  
const orders \= await fetchOrders();

Here `fetchOrders()` starts after `fetchUser()` finishes.

Parallel:

const \[user, orders\] \= await Promise.all(\[  
  fetchUser(),  
  fetchOrders(),  
\]);

Here both requests start together.

## **Common mistake**

const users \= \[1, 2, 3\];

users.forEach(async (id) \=\> \{  
  await fetchUser(id);  
\});

console.log("Done");

Answer: `"Done"` logs before all users are fetched because `forEach` does not wait for async callbacks.

Correct:

const users \= \[1, 2, 3\];

await Promise.all(users.map((id) \=\> fetchUser(id)));

console.log("Done");

## **Interview-ready answer**

`async/await` is syntactic sugar over promises. An async function always returns a promise, and `await` pauses execution inside that async function until the promise settles. It improves readability, especially when async steps are dependent, but for independent tasks we should use `Promise.all()` to run them in parallel.

---

# **Fetch API**

The Fetch API is used to make HTTP requests from the browser. It returns a promise.

## **Simple example**

async function getUsers() \{  
  const response \= await fetch("/api/users");  
  const data \= await response.json();

  return data;  
\}

## **Key mental model**

`fetch()` resolves when the HTTP response is received. It does not reject for HTTP error status codes like `404` or `500`. It rejects only for network-level failures.

## **Important trap**

async function getUser() \{  
  const response \= await fetch("/api/user/123");

  console.log(response.ok); // false for 404/500

  const data \= await response.json();

  return data;  
\}

Answer: `fetch` does not automatically throw for `404` or `500`.

## **Better error handling**

async function request(url) \{  
  const response \= await fetch(url);

  if (\!response.ok) \{  
    throw new Error(\`HTTP error: $\{response.status\}\`);  
  \}

  return response.json();  
\}

request("/api/users")  
  .then((data) \=\> console.log(data))  
  .catch((error) \=\> console.error(error.message));

## **POST request**

async function createUser(user) \{  
  const response \= await fetch("/api/users", \{  
    method: "POST",  
    headers: \{  
      "Content-Type": "application/json",  
    \},  
    body: JSON.stringify(user),  
  \});

  if (\!response.ok) \{  
    throw new Error(\`HTTP error: $\{response.status\}\`);  
  \}

  return response.json();  
\}

## **Practical frontend example**

In React, use fetch inside `useEffect` or inside event handlers, manage loading/error/data states, and cancel stale requests when needed.

## **Interview-ready answer**

`fetch` is a browser API for making HTTP requests. It returns a promise. A key point is that `fetch` does not reject for HTTP error statuses like `404` or `500`; we need to check `response.ok` manually and throw an error if needed.

---

# **AbortController**

`AbortController` is used to cancel an in-flight async operation, especially a fetch request.

## **Simple meaning**

It lets us stop a request that is no longer needed.

const controller \= new AbortController();

fetch("/api/users", \{  
  signal: controller.signal,  
\});

controller.abort();

## **Practical frontend example**

Cancel previous search request when the user types again.

let controller;

async function searchUsers(query) \{  
  if (controller) \{  
    controller.abort();  
  \}

  controller \= new AbortController();

  try \{  
    const response \= await fetch(\`/api/users?q=$\{query\}\`, \{  
      signal: controller.signal,  
    \});

    const data \= await response.json();

    console.log(data);  
  \} catch (error) \{  
    if (error.name \=== "AbortError") \{  
      console.log("Request was cancelled");  
      return;  
    \}

    console.error(error);  
  \}  
\}

## **React example**

useEffect(() \=\> \{  
  const controller \= new AbortController();

  async function loadData() \{  
    try \{  
      const response \= await fetch("/api/users", \{  
        signal: controller.signal,  
      \});

      const data \= await response.json();

      setUsers(data);  
    \} catch (error) \{  
      if (error.name \=== "AbortError") return;

      setError(error.message);  
    \}  
  \}

  loadData();

  return () \=\> \{  
    controller.abort();  
  \};  
\}, \[\]);

## **Why it matters**

* Prevents unnecessary network work.  
* Avoids stale responses updating UI.  
* Helps cleanup when component unmounts.  
* Useful for search, filters, route changes, and tab switching.

## **Interview-ready answer**

`AbortController` is used to cancel fetch requests. We pass `controller.signal` to fetch and call `controller.abort()` when the request is no longer needed. In React, it is commonly used in `useEffect` cleanup to prevent stale or unnecessary requests from updating the UI.

---

# **Common Interview Topics / Questions**

---

# **1\. Explain Promise Chaining**

## **Answer**

Promise chaining means connecting multiple `.then()` calls where each step receives the result of the previous step.

getUser()  
  .then((user) \=\> \{  
    return getOrders(user.id);  
  \})  
  .then((orders) \=\> \{  
    return getPayment(orders\[0\].id);  
  \})  
  .then((payment) \=\> \{  
    console.log(payment);  
  \})  
  .catch((error) \=\> \{  
    console.error(error);  
  \});

## **Key points**

* Return value from one `.then()` goes to the next `.then()`.  
* If a promise is returned, the next `.then()` waits.  
* If an error occurs, control jumps to `.catch()`.  
* Missing `return` is a common bug.

## **Interview-ready answer**

Promise chaining lets us run async operations in sequence. Each `.then()` receives what the previous `.then()` returns. If a `.then()` returns a promise, the next step waits for it. Errors can be handled using a final `.catch()`.

---

# **2\. Explain Async/Await Flow**

## **Answer**

async function test() \{  
  console.log("A");

  await Promise.resolve();

  console.log("B");  
\}

test();

console.log("C");

// Output:  
// A  
// C  
// B

## **Why?**

Step by step:

* `test()` is called.  
* `"A"` logs synchronously.  
* `await Promise.resolve()` pauses the rest of `test`.  
* JavaScript continues outside the function and logs `"C"`.  
* The awaited promise continuation runs in the microtask queue.  
* `"B"` logs after the synchronous code completes.

## **Interview-ready answer**

`async/await` makes promise-based code easier to read. When JavaScript reaches `await`, it pauses the current async function and resumes it later through the microtask queue. It does not block the whole JavaScript thread.

---

# **3\. Difference between Promise and Async/Await**

## **Simple answer**

`async/await` is built on top of promises. It is mostly a cleaner syntax for writing promise-based code.

// Promise style  
fetchUser()  
  .then((user) \=\> fetchOrders(user.id))  
  .then((orders) \=\> console.log(orders))  
  .catch((error) \=\> console.error(error));

// async/await style  
async function loadData() \{  
  try \{  
    const user \= await fetchUser();  
    const orders \= await fetchOrders(user.id);

    console.log(orders);  
  \} catch (error) \{  
    console.error(error);  
  \}  
\}

## **Interview-ready answer**

Promises represent async results, while async/await is syntax built on top of promises. Async/await makes async code easier to read and error handling easier with `try/catch`, but internally it still uses promises.

---

# **4\. Promise.all vs Promise.allSettled**

## **Simple answer**

`Promise.all()` fails fast. `Promise.allSettled()` waits for all promises.

Promise.all(\[  
  Promise.resolve("A"),  
  Promise.reject("B failed"),  
\]).catch((error) \=\> \{  
  console.log(error); // "B failed"  
\});

Promise.allSettled(\[  
  Promise.resolve("A"),  
  Promise.reject("B failed"),  
\]).then((results) \=\> \{  
  console.log(results);  
\});  
// \[  
//   \{ status: "fulfilled", value: "A" \},  
//   \{ status: "rejected", reason: "B failed" \}  
// \]

## **Interview-ready answer**

Use `Promise.all()` when all operations are required and one failure should fail the whole result. Use `Promise.allSettled()` when operations are independent and we want both successful and failed results.

---

# **5\. Promise.any vs Promise.race**

## **Simple answer**

`Promise.any()` returns the first successful result. `Promise.race()` returns the first settled result, success or failure.

Promise.any(\[  
  Promise.reject("A failed"),  
  Promise.resolve("B success"),  
\]).then((result) \=\> \{  
  console.log(result); // "B success"  
\});

Promise.race(\[  
  Promise.reject("A failed"),  
  Promise.resolve("B success"),  
\]).catch((error) \=\> \{  
  console.log(error); // "A failed"  
\});

## **Interview-ready answer**

`Promise.any()` is useful when any successful response is enough. `Promise.race()` is useful when the fastest settled promise matters, whether it succeeds or fails.

---

# **6\. Why should we avoid async inside forEach?**

## **Problem**

const ids \= \[1, 2, 3\];

ids.forEach(async (id) \=\> \{  
  await fetchUser(id);  
\});

console.log("Done");

Answer: `"Done"` logs before all API calls finish.

## **Why?**

`forEach` does not wait for promises returned from its callback.

## **Correct parallel approach**

await Promise.all(ids.map((id) \=\> fetchUser(id)));

console.log("Done");

## **Correct sequential approach**

for (const id of ids) \{  
  await fetchUser(id);  
\}

console.log("Done");

## **Interview-ready answer**

`forEach` does not understand or await async callbacks. If we need parallel execution, we should use `Promise.all()` with `map`. If we need sequential execution, we should use `for...of` with `await`.

---

# **7\. Sequential vs Parallel API Calls**

## **Sequential**

Use when each request depends on the previous one.

const user \= await fetchUser();  
const orders \= await fetchOrders(user.id);

## **Parallel**

Use when requests are independent.

const \[profile, settings\] \= await Promise.all(\[  
  fetchProfile(),  
  fetchSettings(),  
\]);

## **Interview-ready answer**

If one API call depends on the previous result, use sequential `await`. If API calls are independent, start them together with `Promise.all()` to reduce total loading time.

---

# **8\. How do you handle API errors with fetch?**

## **Answer**

`fetch` does not throw for HTTP errors like `404` or `500`, so we manually check `response.ok`.

async function request(url) \{  
  const response \= await fetch(url);

  if (\!response.ok) \{  
    throw new Error(\`HTTP error: $\{response.status\}\`);  
  \}

  return response.json();  
\}

## **Interview-ready answer**

With `fetch`, I handle network errors using `try/catch`, and HTTP errors by checking `response.ok`. If it is false, I throw an error manually so the calling code can handle it consistently.

---

# **9\. How do you cancel an API request?**

## **Answer**

Use `AbortController`.

const controller \= new AbortController();

fetch("/api/users", \{  
  signal: controller.signal,  
\});

controller.abort();

## **React cleanup example**

useEffect(() \=\> \{  
  const controller \= new AbortController();

  fetch("/api/users", \{  
    signal: controller.signal,  
  \});

  return () \=\> \{  
    controller.abort();  
  \};  
\}, \[\]);

## **Interview-ready answer**

To cancel a fetch request, I use `AbortController`. I pass its `signal` to fetch and call `abort()` when the request is no longer needed, such as when a component unmounts or a newer search request replaces an older one.

---

# **10\. What is the difference between microtask and macrotask?**

## **Simple meaning**

Promises run in the microtask queue. `setTimeout` runs in the macrotask queue.

Microtasks are processed before the next macrotask.

console.log("1");

setTimeout(() \=\> \{  
  console.log("2");  
\}, 0);

Promise.resolve().then(() \=\> \{  
  console.log("3");  
\});

console.log("4");

// Output:  
// 1  
// 4  
// 3  
// 2

## **Why?**

Step by step:

* Synchronous code logs `1`.  
* `setTimeout` callback goes to macrotask queue.  
* Promise `.then()` goes to microtask queue.  
* Synchronous code logs `4`.  
* Microtask runs first and logs `3`.  
* Macrotask runs later and logs `2`.

## **Interview-ready answer**

Microtasks have higher priority than macrotasks. Promise callbacks go to the microtask queue, while `setTimeout` goes to the macrotask queue. After synchronous code finishes, JavaScript processes microtasks before moving to the next macrotask.

---

# **11\. What happens if async function throws an error?**

## **Answer**

An error thrown inside an async function becomes a rejected promise.

async function test() \{  
  throw new Error("Failed");  
\}

test().catch((error) \=\> \{  
  console.log(error.message); // "Failed"  
\});

## **Interview-ready answer**

An async function always returns a promise. If it returns a value, the promise resolves with that value. If it throws an error, the promise rejects with that error.

---

# **12\. What does await do with a non-promise value?**

## **Answer**

`await` wraps non-promise values in a resolved promise-like flow.

async function test() \{  
  const value \= await 10;

  console.log(value); // 10  
\}

test();

## **Interview-ready answer**

`await` can be used with non-promise values. JavaScript treats the value like an already resolved promise and continues execution asynchronously inside the async function.

---

# **Quick Revision Summary**

| Topic | Key point |
| ----- | ----- |
| Synchronous | Runs line by line and blocks next line |
| Asynchronous | Starts now, finishes later |
| Callback | Function passed to run later |
| Callback hell | Deeply nested async callbacks |
| Promise | Represents future async result |
| Pending | Promise still running |
| Fulfilled | Promise completed successfully |
| Rejected | Promise failed |
| Chaining | Return value/promise from one `.then()` goes to next |
| `.catch()` | Handles rejection in promise chain |
| `Promise.all()` | All must succeed, fails fast |
| `Promise.allSettled()` | Waits for all, gives success/failure status |
| `Promise.any()` | First successful promise wins |
| `Promise.race()` | First settled promise wins |
| `async/await` | Cleaner syntax over promises |
| `fetch` | Does not reject on HTTP `404/500` |
| `AbortController` | Cancels fetch requests |

---

# **Final Interview-Ready Combined Answer**

JavaScript is single-threaded, but it handles asynchronous operations using browser/runtime APIs, queues, and the event loop. Callbacks were the older way to handle async logic, but they can lead to callback hell. Promises provide a cleaner way to represent future success or failure with states like pending, fulfilled, and rejected. Promise chaining lets us run dependent async steps, while APIs like `Promise.all`, `allSettled`, `any`, and `race` help manage multiple promises. `async/await` is syntax built on promises and makes async code easier to read. For API calls, `fetch` returns a promise but does not reject on HTTP errors, so we should check `response.ok`. `AbortController` is used to cancel requests and avoid stale UI updates.

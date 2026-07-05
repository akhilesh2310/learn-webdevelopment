---
title: Error Handling
sidebar_position: 25
---

# Error Handling

## try...catch

## finally

## throw

## Custom Errors

## Error Propagation

## Async Error Handling

## Global Error Handling

## Common Interview Topics

* Error handling in async/await  
* Custom error classes

[https://javascript.info/debugging-chrome](https://javascript.info/debugging-chrome)  
[https://javascript.info/error-handling](https://javascript.info/error-handling)  
[https://www.tutorialspoint.com/javascript/javascript\_error\_handling.htm](https://www.tutorialspoint.com/javascript/javascript_error_handling.htm)

## JavaScript Error Handling

Error handling is about detecting failures, stopping incorrect execution, and recovering gracefully. In frontend apps, good error handling improves reliability, debugging, user experience, and observability. Common places where errors happen are API calls, async flows, JSON parsing, form submission, rendering logic, and third-party integrations.

---

## 1. `try...catch`

`try...catch` is used to handle runtime errors without crashing the whole flow.

## Simple meaning

Put risky code inside `try`. If an error happens, handle it inside `catch`.

try \{  
  const user \= JSON.parse("\{ invalid json \}");  
\} catch (error) \{  
  console.log(error.name); // "SyntaxError"  
\}

## Key mental model

`try` is for code that may fail. `catch` is for recovery, fallback, logging, or showing user-friendly messages.

function parseUser(json) \{  
  try \{  
    return JSON.parse(json);  
  \} catch (error) \{  
    return null;  
  \}  
\}

console.log(parseUser('\{"name":"Akhilesh"\}')); // \{ name: "Akhilesh" \}  
console.log(parseUser("\{bad json\}")); // null

## Important points

* `catch` catches synchronous runtime errors inside `try`.  
* It does not catch async errors from callbacks scheduled later.  
* `catch` receives the thrown error value.  
* Use `try...catch` where you can actually handle or add useful context.

## Important trap

try \{  
  setTimeout(() \=\> \{  
    throw new Error("Timer failed");  
  \}, 0);  
\} catch (error) \{  
  console.log("Caught");  
\}

Answer: `"Caught"` does not log. The error happens later, outside the original `try...catch` call stack.

Correct:

setTimeout(() \=\> \{  
  try \{  
    throw new Error("Timer failed");  
  \} catch (error) \{  
    console.log(error.message); // "Timer failed"  
  \}  
\}, 0);

## Interview-ready answer

`try...catch` handles runtime errors in synchronous code. Code that may fail goes inside `try`, and error handling or fallback logic goes inside `catch`. It only catches errors thrown during the current execution flow, not errors thrown later in async callbacks.

---

## 2. `finally`

`finally` runs after `try` and `catch`, whether an error happened or not.

## Simple meaning

Use `finally` for cleanup logic.

try \{  
  console.log("Loading data");  
\} catch (error) \{  
  console.log("Error");  
\} finally \{  
  console.log("Stop loading");  
\}

// "Loading data"  
// "Stop loading"

## Practical frontend example

async function loadUsers() \{  
  setLoading(true);

  try \{  
    const response \= await fetch("/api/users");  
    const data \= await response.json();

    setUsers(data);  
  \} catch (error) \{  
    setError("Failed to load users");  
  \} finally \{  
    setLoading(false);  
  \}  
\}

## Key mental model

`finally` is for work that must happen in both success and failure cases.

Common use cases:

* Stop loader.  
* Release resources.  
* Close connection.  
* Clear temporary state.  
* Unlock UI.  
* Reset flags.

## Important trap

If `finally` returns a value, it can override the `try` or `catch` return.

function test() \{  
  try \{  
    return "try";  
  \} finally \{  
    return "finally";  
  \}  
\}

console.log(test()); // "finally"

Common mistake: Returning from `finally` unnecessarily. Avoid it.

## Interview-ready answer

`finally` runs after `try` and `catch` regardless of success or failure. It is useful for cleanup like stopping loaders, clearing timers, closing resources, or resetting UI state. We should avoid returning from `finally` because it can override previous returns or thrown errors.

---

## 3. `throw`

`throw` is used to create and raise an error manually.

## Simple meaning

Use `throw` when code reaches an invalid or failed state and should not continue normally.

function divide(a, b) \{  
  if (b \=== 0\) \{  
    throw new Error("Cannot divide by zero");  
  \}

  return a / b;  
\}

try \{  
  console.log(divide(10, 0));  
\} catch (error) \{  
  console.log(error.message); // "Cannot divide by zero"  
\}

## Key mental model

`throw` stops the current normal flow and transfers control to the nearest error handler.

## Throwing custom values

JavaScript allows throwing anything.

throw "Something failed";

But prefer throwing `Error` objects.

throw new Error("Something failed");

Why? `Error` gives useful properties like `message`, `name`, and stack trace.

## Practical frontend example

async function request(url) \{  
  const response \= await fetch(url);

  if (\!response.ok) \{  
    throw new Error(\`HTTP error: $\{response.status\}\`);  
  \}

  return response.json();  
\}

## Interview-ready answer

`throw` raises an error and stops normal execution. It is best to throw `Error` objects instead of strings because they provide useful debugging information like message, name, and stack trace.

---

## 4. Custom Errors

Custom errors are error classes created for specific failure types.

## Simple meaning

Instead of throwing a generic `Error`, we create meaningful error types like `ValidationError`, `ApiError`, or `AuthError`.

class ValidationError extends Error \{  
  constructor(message) \{  
    super(message);  
    this.name \= "ValidationError";  
  \}  
\}

throw new ValidationError("Email is required");

## Key mental model

Custom errors help identify what kind of failure happened.

class ApiError extends Error \{  
  constructor(message, status) \{  
    super(message);  
    this.name \= "ApiError";  
    this.status \= status;  
  \}  
\}

async function request(url) \{  
  const response \= await fetch(url);

  if (\!response.ok) \{  
    throw new ApiError("Request failed", response.status);  
  \}

  return response.json();  
\}

## Handling custom errors

try \{  
  await request("/api/users");  
\} catch (error) \{  
  if (error instanceof ApiError) \{  
    console.log(error.status); // Example: 404  
  \} else \{  
    console.log("Unexpected error");  
  \}  
\}

## Practical frontend use cases

* `ValidationError`: invalid user input.  
* `ApiError`: failed HTTP response.  
* `AuthError`: user not authenticated/authorized.  
* `NetworkError`: request failed due to connectivity.  
* `TimeoutError`: request took too long.

## Important trap

When extending `Error`, call `super(message)` before using `this`.

class ApiError extends Error \{  
  constructor(message) \{  
    this.name \= "ApiError";  
    super(message);  
  \}  
\}  
// ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor

Correct:

class ApiError extends Error \{  
  constructor(message) \{  
    super(message);  
    this.name \= "ApiError";  
  \}  
\}

## Interview-ready answer

Custom errors are classes that extend `Error` and represent specific failure types. They make error handling cleaner because we can check `instanceof` and handle validation, API, auth, timeout, or network errors differently.

---

## 5. Error Propagation

Error propagation means an error moves up the call stack until it is handled.

## Simple meaning

If a function does not catch an error, the error goes to its caller.

function validateUser(user) \{  
  if (\!user.email) \{  
    throw new Error("Email is required");  
  \}  
\}

function submitForm(user) \{  
  validateUser(user);  
  console.log("Submitting form");  
\}

try \{  
  submitForm(\{\});  
\} catch (error) \{  
  console.log(error.message); // "Email is required"  
\}

## Key mental model

Errors bubble up through function calls until some `catch` handles them.

## Async propagation

async function fetchUser() \{  
  throw new Error("User API failed");  
\}

async function loadPage() \{  
  return fetchUser();  
\}

loadPage().catch((error) \=\> \{  
  console.log(error.message); // "User API failed"  
\});

## Rethrowing with context

function parseConfig(json) \{  
  try \{  
    return JSON.parse(json);  
  \} catch (error) \{  
    throw new Error(\`Invalid config: $\{error.message\}\`);  
  \}  
\}

try \{  
  parseConfig("\{bad json\}");  
\} catch (error) \{  
  console.log(error.message);  
  // "Invalid config: Expected property name or '\}' in JSON at position 1"  
\}

## Common mistake

Catching an error and silently ignoring it.

try \{  
  riskyOperation();  
\} catch (error) \{\}

This hides bugs and makes debugging difficult.

Better:

try \{  
  riskyOperation();  
\} catch (error) \{  
  console.error(error);  
  throw error;  
\}

## Interview-ready answer

Error propagation means an error moves up the call stack until it is caught. If a function cannot handle an error meaningfully, it should let it propagate or rethrow it with useful context instead of silently swallowing it.

---

## 6. Async Error Handling

Async error handling depends on whether we use promises or async/await.

## Simple meaning

Promise rejections are async errors. Handle them with `.catch()` or `try...catch` with `await`.

## Promise style

fetchUser()  
  .then((user) \=\> \{  
    console.log(user);  
  \})  
  .catch((error) \=\> \{  
    console.log(error.message);  
  \});

## Async/await style

async function loadUser() \{  
  try \{  
    const user \= await fetchUser();  
    console.log(user);  
  \} catch (error) \{  
    console.log(error.message);  
  \}  
\}

## Key mental model

`try...catch` catches promise rejections only when you `await` the promise inside the `try`.

async function loadUser() \{  
  try \{  
    fetchUser();  
  \} catch (error) \{  
    console.log("Caught");  
  \}  
\}

Answer: If `fetchUser()` rejects, `"Caught"` may not log because the promise was not awaited.

Correct:

async function loadUser() \{  
  try \{  
    await fetchUser();  
  \} catch (error) \{  
    console.log("Caught");  
  \}  
\}

## Multiple async calls

Sequential:

try \{  
  const user \= await fetchUser();  
  const orders \= await fetchOrders(user.id);  
\} catch (error) \{  
  console.log(error.message);  
\}

Parallel:

try \{  
  const \[user, settings\] \= await Promise.all(\[  
    fetchUser(),  
    fetchSettings(),  
  \]);  
\} catch (error) \{  
  console.log(error.message);  
\}

## Partial success

Use `Promise.allSettled()` when some requests can fail independently.

const results \= await Promise.allSettled(\[  
  fetchProfile(),  
  fetchNotifications(),  
  fetchRecommendations(),  
\]);

const successful \= results.filter((result) \=\> result.status \=== "fulfilled");

## Interview-ready answer

For async code, promise errors are handled with `.catch()` or with `try...catch` around an awaited promise. `try...catch` will not catch a rejected promise unless it is awaited or returned properly. For multiple promises, use `Promise.all` when all must succeed and `Promise.allSettled` when partial success is acceptable.

---

## 7. Global Error Handling

Global error handling catches errors that were not handled locally.

## Simple meaning

Use global handlers as a safety net, not as the main error handling strategy.

## Browser global error

window.addEventListener("error", (event) \=\> \{  
  console.log(event.message);  
  console.log(event.filename);  
  console.log(event.lineno);  
\});

## Unhandled promise rejection

window.addEventListener("unhandledrejection", (event) \=\> \{  
  console.log(event.reason);  
\});

## React error boundary

React Error Boundaries catch rendering errors in component trees.

class ErrorBoundary extends React.Component \{  
  state \= \{ hasError: false \};

  static getDerivedStateFromError(error) \{  
    return \{ hasError: true \};  
  \}

  componentDidCatch(error, info) \{  
    console.error(error, info);  
  \}

  render() \{  
    if (this.state.hasError) \{  
      return \<div\>Something went wrong\</div\>;  
    \}

    return this.props.children;  
  \}  
\}

## Important points

Global handlers are useful for:

* Logging unexpected errors.  
* Sending errors to monitoring tools.  
* Showing fallback UI.  
* Detecting unhandled promise rejections.

But they should not replace local error handling for expected failures like form validation or API errors.

## Important trap

React Error Boundaries do not catch:

* Errors inside event handlers.  
* Async errors.  
* Server-side rendering errors.  
* Errors thrown inside the error boundary itself.

For event handlers, use local `try...catch`.

function Button() \{  
  function handleClick() \{  
    try \{  
      riskyOperation();  
    \} catch (error) \{  
      console.error(error);  
    \}  
  \}

  return \<button onClick=\{handleClick\}\>Click\</button\>;  
\}

## Interview-ready answer

Global error handling is a safety net for uncaught errors and unhandled promise rejections. In the browser, we can use `window.onerror` or `window.addEventListener("error")`, and `unhandledrejection` for promise rejections. In React, Error Boundaries catch render-time errors, but not async errors or event handler errors.

---

## Common Interview Topics / Questions

---

## 1. Error handling in async/await

## Answer

Use `try...catch` around awaited async operations.

async function loadUser() \{  
  try \{  
    const response \= await fetch("/api/user");

    if (\!response.ok) \{  
      throw new Error(\`HTTP error: $\{response.status\}\`);  
    \}

    const user \= await response.json();

    return user;  
  \} catch (error) \{  
    console.error(error.message);  
    throw error;  
  \} finally \{  
    console.log("Request finished");  
  \}  
\}

## Key points

* `try...catch` catches errors thrown inside the block.  
* It catches rejected promises only when they are awaited.  
* Use `finally` for cleanup like stopping loaders.  
* Rethrow if the caller should handle the error too.

## Common trap

async function loadUser() \{  
  try \{  
    fetch("/api/user").then(() \=\> \{  
      throw new Error("Failed inside then");  
    \});  
  \} catch (error) \{  
    console.log("Caught");  
  \}  
\}

Answer: `"Caught"` does not log because the promise chain is not awaited or returned.

Correct:

async function loadUser() \{  
  try \{  
    await fetch("/api/user").then(() \=\> \{  
      throw new Error("Failed inside then");  
    \});  
  \} catch (error) \{  
    console.log(error.message); // "Failed inside then"  
  \}  
\}

## Interview-ready answer

In async/await, errors are handled using `try...catch`. A rejected promise is caught only if it is awaited inside the `try` block. For API calls, I check `response.ok`, throw an error for HTTP failures, handle it in `catch`, and use `finally` for cleanup like stopping a loader.

---

## 2. Custom error classes

## Answer

Custom errors extend the built-in `Error` class and add extra context.

class ApiError extends Error \{  
  constructor(message, status, details) \{  
    super(message);  
    this.name \= "ApiError";  
    this.status \= status;  
    this.details \= details;  
  \}  
\}

Usage:

async function request(url) \{  
  const response \= await fetch(url);

  if (\!response.ok) \{  
    throw new ApiError("API request failed", response.status, \{  
      url,  
    \});  
  \}

  return response.json();  
\}

try \{  
  await request("/api/users");  
\} catch (error) \{  
  if (error instanceof ApiError) \{  
    console.log(error.status);  
  \} else \{  
    console.log("Unexpected error");  
  \}  
\}

## Why useful?

* Clear error type.  
* Easier conditional handling.  
* More debugging context.  
* Better logging and monitoring.  
* Cleaner separation between validation, API, auth, and network errors.

## Interview-ready answer

Custom error classes are useful when different errors need different handling. They extend `Error`, call `super(message)`, set a meaningful `name`, and can store extra metadata like status code, error code, or details. Then we can use `instanceof` to handle specific error types.

---

## 3. Difference between throw and return error

## Answer

Returning an error treats it like a normal value. Throwing an error stops normal flow and moves control to the nearest error handler.

function validate(user) \{  
  if (\!user.email) \{  
    return new Error("Email is required");  
  \}

  return true;  
\}

const result \= validate(\{\});

console.log(result.message); // "Email is required"

Here the caller must manually check the returned value.

With throw:

function validate(user) \{  
  if (\!user.email) \{  
    throw new Error("Email is required");  
  \}

  return true;  
\}

try \{  
  validate(\{\});  
\} catch (error) \{  
  console.log(error.message); // "Email is required"  
\}

## Interview-ready answer

`return` gives back a normal value, even if that value is an Error object. `throw` signals an exceptional failure and transfers control to `catch`. Use return for expected validation results and throw for exceptional or failed execution paths.

---

## 4. How does error propagation work?

## Answer

If an error is not caught inside a function, it propagates to the caller.

function a() \{  
  throw new Error("Failed in a");  
\}

function b() \{  
  a();  
\}

try \{  
  b();  
\} catch (error) \{  
  console.log(error.message); // "Failed in a"  
\}

## Interview-ready answer

Error propagation means errors move up the call stack until they are caught. If a function cannot handle the error meaningfully, it should let it propagate or rethrow it with additional context.

---

## 5. How do you handle fetch errors?

## Answer

Handle both network errors and HTTP errors.

async function request(url) \{  
  try \{  
    const response \= await fetch(url);

    if (\!response.ok) \{  
      throw new ApiError("Request failed", response.status);  
    \}

    return await response.json();  
  \} catch (error) \{  
    console.error(error);  
    throw error;  
  \}  
\}

## Important point

`fetch` rejects for network failures, but not for HTTP statuses like `404` or `500`. So we must check `response.ok`.

## Interview-ready answer

For fetch, I handle network errors with `try...catch`, and HTTP errors by checking `response.ok`. If it is false, I throw a custom API error with the status code so the caller can show the correct UI message.

---

## 6. What is unhandled promise rejection?

## Answer

An unhandled promise rejection happens when a promise rejects and no `.catch()` or `try...catch` handles it.

Promise.reject(new Error("Failed"));

Better:

Promise.reject(new Error("Failed")).catch((error) \=\> \{  
  console.log(error.message); // "Failed"  
\});

With async/await:

async function load() \{  
  throw new Error("Failed");  
\}

load().catch((error) \=\> \{  
  console.log(error.message); // "Failed"  
\});

## Global handler

window.addEventListener("unhandledrejection", (event) \=\> \{  
  console.log(event.reason);  
\});

## Interview-ready answer

An unhandled promise rejection happens when a promise rejects and no error handler catches it. It should be avoided by using `.catch()` or `try...catch` with `await`. A global `unhandledrejection` handler can log unexpected missed rejections.

---

## 7. React error handling

## Answer

Use Error Boundaries for render-time errors and local `try...catch` for event handlers or async code.

class ErrorBoundary extends React.Component \{  
  state \= \{ hasError: false \};

  static getDerivedStateFromError() \{  
    return \{ hasError: true \};  
  \}

  componentDidCatch(error, info) \{  
    console.error(error, info);  
  \}

  render() \{  
    if (this.state.hasError) \{  
      return \<div\>Something went wrong\</div\>;  
    \}

    return this.props.children;  
  \}  
\}

## Important trap

Error Boundaries do not catch async errors or event handler errors.

function SaveButton() \{  
  async function handleClick() \{  
    try \{  
      await saveData();  
    \} catch (error) \{  
      console.error(error);  
    \}  
  \}

  return \<button onClick=\{handleClick\}\>Save\</button\>;  
\}

## Interview-ready answer

In React, Error Boundaries catch rendering errors in the component tree and show fallback UI. They do not catch event handler errors or async errors, so those should be handled locally with `try...catch` or promise `.catch()`.

---

## Quick Revision Summary

| Topic | Key point |
| ----- | ----- |
| `try...catch` | Handles synchronous runtime errors |
| `finally` | Runs cleanup regardless of success/failure |
| `throw` | Raises an error and stops normal flow |
| `Error` object | Preferred over throwing strings |
| Custom errors | Specific error classes with extra context |
| Error propagation | Error moves upward until caught |
| Async errors | Use `.catch()` or `try...catch` with `await` |
| Fetch error | Check `response.ok` manually |
| Global error | Safety net for uncaught errors |
| `unhandledrejection` | Catches missed promise rejections globally |
| React Error Boundary | Catches render-time component errors |
| Common trap | `try...catch` does not catch async callback errors scheduled later |

---

## Final Interview-Ready Combined Answer

JavaScript error handling uses `try...catch`, `finally`, and `throw` to handle failures and control error flow. `try...catch` catches synchronous errors, `finally` is useful for cleanup, and `throw` is used to raise meaningful errors. Custom error classes extend `Error` and help handle different failure types like API, validation, auth, or timeout errors. Error propagation means an error moves up the call stack until caught. For async code, rejected promises must be handled with `.catch()` or `try...catch` around `await`. In frontend apps, global handlers like `window.onerror`, `unhandledrejection`, and React Error Boundaries are useful safety nets, but expected errors should still be handled locally.

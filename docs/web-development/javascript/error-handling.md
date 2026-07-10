---
title: Error Handling
sidebar_position: 25
---

# Error Handling

Error handling is about detecting failures, stopping incorrect execution, and recovering gracefully. In frontend apps, good error handling improves reliability, debugging, user experience, and observability.

Common places where errors happen include API calls, async flows, JSON parsing, form submission, rendering logic, and third-party integrations.

## Helpful References

- [Debugging in Chrome](https://javascript.info/debugging-chrome)
- [Error handling](https://javascript.info/error-handling)
- [JavaScript error handling](https://www.tutorialspoint.com/javascript/javascript_error_handling.htm)

## `try...catch`

`try...catch` handles runtime errors without crashing the whole flow.

```js
try {
  const user = JSON.parse("{ invalid json }");
} catch (error) {
  console.log(error.name); // "SyntaxError"
}
```

Put risky code inside `try`. Put recovery, fallback, logging, or user-friendly messaging inside `catch`.

```js
function parseUser(json) {
  try {
    return JSON.parse(json);
  } catch (error) {
    return null;
  }
}

console.log(parseUser('{"name":"Akhilesh"}'));
console.log(parseUser("{bad json}")); // null
```

`catch` catches synchronous runtime errors inside the current execution flow. It does not catch errors thrown later in async callbacks.

```js
try {
  setTimeout(() => {
    throw new Error("Timer failed");
  }, 0);
} catch (error) {
  console.log("Caught");
}
```

`"Caught"` does not log because the timer callback runs later, outside the original `try...catch` call stack.

```js
setTimeout(() => {
  try {
    throw new Error("Timer failed");
  } catch (error) {
    console.log(error.message); // "Timer failed"
  }
}, 0);
```

Interview answer:

> `try...catch` handles synchronous runtime errors thrown during the current execution flow. It is useful for fallback logic, logging, and recovery, but it does not catch errors thrown later in asynchronous callbacks.

## `finally`

`finally` runs after `try` and `catch`, whether an error happened or not.

```js
try {
  console.log("Loading data");
} catch (error) {
  console.log("Error");
} finally {
  console.log("Stop loading");
}
```

Use `finally` for cleanup logic.

```js
async function loadUsers() {
  setLoading(true);

  try {
    const response = await fetch("/api/users");
    const data = await response.json();
    setUsers(data);
  } catch (error) {
    setError("Failed to load users");
  } finally {
    setLoading(false);
  }
}
```

Common uses:

- Stop loaders.
- Release resources.
- Close connections.
- Clear temporary state.
- Unlock UI.
- Reset flags.

Avoid returning from `finally`, because it can override a previous return or thrown error.

```js
function test() {
  try {
    return "try";
  } finally {
    return "finally";
  }
}

console.log(test()); // "finally"
```

## `throw`

`throw` creates and raises an error manually.

```js
function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }

  return a / b;
}

try {
  console.log(divide(10, 0));
} catch (error) {
  console.log(error.message); // "Cannot divide by zero"
}
```

JavaScript allows throwing anything, but prefer throwing `Error` objects because they provide `message`, `name`, and a stack trace.

```js
throw new Error("Something failed");
```

Frontend request example:

```js
async function request(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return response.json();
}
```

## Custom Errors

Custom errors are classes created for specific failure types.

```js
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

throw new ValidationError("Email is required");
```

Custom errors make conditional handling clearer.

```js
class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

async function request(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new ApiError("API request failed", response.status, { url });
  }

  return response.json();
}

try {
  await request("/api/users");
} catch (error) {
  if (error instanceof ApiError) {
    console.log(error.status);
  } else {
    console.log("Unexpected error");
  }
}
```

When extending `Error`, call `super(message)` before using `this`.

Common custom error types:

- `ValidationError`: invalid user input.
- `ApiError`: failed HTTP response.
- `AuthError`: user is not authenticated or authorized.
- `NetworkError`: request failed due to connectivity.
- `TimeoutError`: request took too long.

## Error Propagation

Error propagation means an error moves up the call stack until it is handled.

```js
function validateUser(user) {
  if (!user.email) {
    throw new Error("Email is required");
  }
}

function submitForm(user) {
  validateUser(user);
  console.log("Submitting form");
}

try {
  submitForm({});
} catch (error) {
  console.log(error.message); // "Email is required"
}
```

If a function cannot handle an error meaningfully, let it propagate or rethrow it with useful context.

```js
function parseConfig(json) {
  try {
    return JSON.parse(json);
  } catch (error) {
    throw new Error(`Invalid config: ${error.message}`);
  }
}
```

Do not silently swallow errors.

```js
try {
  riskyOperation();
} catch (error) {
  console.error(error);
  throw error;
}
```

## Async Error Handling

Promise rejections are async errors. Handle them with `.catch()` or with `try...catch` around an awaited promise.

```js
fetchUser()
  .then((user) => {
    console.log(user);
  })
  .catch((error) => {
    console.log(error.message);
  });
```

```js
async function loadUser() {
  try {
    const user = await fetchUser();
    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
}
```

`try...catch` catches promise rejections only when the promise is awaited or returned properly.

```js
async function loadUser() {
  try {
    fetchUser();
  } catch (error) {
    console.log("Caught");
  }
}
```

If `fetchUser()` rejects, `"Caught"` may not log because the promise was not awaited.

```js
async function loadUser() {
  try {
    await fetchUser();
  } catch (error) {
    console.log("Caught");
  }
}
```

Use `Promise.all` when all operations must succeed.

```js
try {
  const [user, settings] = await Promise.all([
    fetchUser(),
    fetchSettings(),
  ]);
} catch (error) {
  console.log(error.message);
}
```

Use `Promise.allSettled` when partial success is acceptable.

```js
const results = await Promise.allSettled([
  fetchProfile(),
  fetchNotifications(),
  fetchRecommendations(),
]);

const successful = results.filter((result) => result.status === "fulfilled");
```

## Global Error Handling

Global handlers are useful as a safety net for errors that were not handled locally.

```js
window.addEventListener("error", (event) => {
  console.log(event.message);
  console.log(event.filename);
  console.log(event.lineno);
});
```

```js
window.addEventListener("unhandledrejection", (event) => {
  console.log(event.reason);
});
```

React Error Boundaries catch rendering errors in component trees.

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong</div>;
    }

    return this.props.children;
  }
}
```

React Error Boundaries do not catch:

- Errors inside event handlers.
- Async errors.
- Server-side rendering errors.
- Errors thrown inside the error boundary itself.

For event handlers, use local error handling.

```jsx
function Button() {
  function handleClick() {
    try {
      riskyOperation();
    } catch (error) {
      console.error(error);
    }
  }

  return <button onClick={handleClick}>Click</button>;
}
```

## Throw vs Return Error

Returning an error treats it like a normal value. Throwing an error stops normal flow and moves control to the nearest error handler.

```js
function validate(user) {
  if (!user.email) {
    return new Error("Email is required");
  }

  return true;
}

const result = validate({});
console.log(result.message);
```

With `throw`, callers handle the failure through `catch`.

```js
function validate(user) {
  if (!user.email) {
    throw new Error("Email is required");
  }

  return true;
}

try {
  validate({});
} catch (error) {
  console.log(error.message); // "Email is required"
}
```

Use return values for expected validation results. Use `throw` for exceptional or failed execution paths.

## Fetch Error Handling

`fetch` rejects for network failures, but HTTP status errors like `404` or `500` still resolve. Check `response.ok`.

```js
async function request(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new ApiError("Request failed", response.status);
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
```

## Interview Checklist

- Explain what `try`, `catch`, `finally`, and `throw` do.
- Explain why async callbacks are not caught by an outer synchronous `try...catch`.
- Explain why rejected promises must be awaited or handled with `.catch()`.
- Show a custom error class.
- Compare throwing an error with returning an error value.
- Explain global browser handlers and React Error Boundaries.

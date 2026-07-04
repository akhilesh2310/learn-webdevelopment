---
title: 10. Error Handling in React
sidebar_position: 10
---

# 10. Error Handling in React

# **10\. Error Handling**

## **Error Boundaries**

## **Try Catch Limitations**

## **Async Error Handling**

## **API Error Handling**

## **Common Interview Topics**

* When Error Boundaries work

# **React Error Handling**

Error handling in React is about preventing one broken component, failed API call, or unexpected runtime issue from breaking the whole user experience. React error handling usually has three layers: **Error Boundaries for render errors**, **try/catch for event handlers and async code**, and **API-level error handling for server/network failures**.

---

# **1\. Error Boundaries**

## **Simple meaning**

An Error Boundary is a React component that catches rendering errors in its child component tree and shows fallback UI instead of crashing the whole app.

class ErrorBoundary extends React.Component \{  
  constructor(props) \{  
    super(props);

    this.state \= \{  
      hasError: false,  
    \};  
  \}

  static getDerivedStateFromError(error) \{  
    return \{  
      hasError: true,  
    \};  
  \}

  componentDidCatch(error, info) \{  
    console.error("Error caught by boundary:", error, info);  
  \}

  render() \{  
    if (this.state.hasError) \{  
      return \<h2\>Something went wrong.\</h2\>;  
    \}

    return this.props.children;  
  \}  
\}

Usage:

\<ErrorBoundary\>  
  \<UserDashboard /\>  
\</ErrorBoundary\>

## **Key mental model**

Error Boundary works like a safety wrapper around a part of the UI.

If a child component throws during rendering, React catches it and renders fallback UI.

## **What Error Boundaries catch**

Error Boundaries catch errors in:

* Rendering  
* Lifecycle methods  
* Constructors of child components

Example:

function UserProfile(\{ user \}) \{  
  return \<h1\>\{user.name.toUpperCase()\}\</h1\>;  
\}

\<ErrorBoundary\>  
  \<UserProfile user=\{null\} /\>  
\</ErrorBoundary\>;

If `user` is `null`, this throws during render. Error Boundary can catch it and show fallback UI.

## **What Error Boundaries do not catch**

Error Boundaries do not catch errors in:

* Event handlers  
* Async code  
* `setTimeout`  
* Promise callbacks  
* API failures directly  
* Server-side rendering  
* Errors thrown inside the Error Boundary itself

Example:

function SaveButton() \{  
  function handleClick() \{  
    throw new Error("Click failed");  
  \}

  return \<button onClick=\{handleClick\}\>Save\</button\>;  
\}

Answer: Error Boundary will not catch this because the error happens inside an event handler.

## **Interview-ready answer**

An Error Boundary is a React component that catches rendering errors in its child tree and displays fallback UI. It catches errors during render, lifecycle methods, and constructors, but it does not catch event handler errors, async errors, promise rejections, timers, or server-side rendering errors.

---

# **2\. Try Catch Limitations**

## **Simple meaning**

`try...catch` catches errors only in the code that runs inside the current execution flow.

It does not catch errors that happen later asynchronously unless those errors are awaited or handled inside that async callback.

## **Synchronous error**

try \{  
  throw new Error("Failed");  
\} catch (error) \{  
  console.log(error.message); // "Failed"  
\}

## **Async callback trap**

try \{  
  setTimeout(() \=\> \{  
    throw new Error("Timer failed");  
  \}, 1000);  
\} catch (error) \{  
  console.log("Caught");  
\}

Answer: `"Caught"` does not log because the error happens later, outside the current call stack.

Correct:

setTimeout(() \=\> \{  
  try \{  
    throw new Error("Timer failed");  
  \} catch (error) \{  
    console.log(error.message); // "Timer failed"  
  \}  
\}, 1000);

## **React event handler example**

function SaveButton() \{  
  function handleClick() \{  
    try \{  
      riskyOperation();  
    \} catch (error) \{  
      console.error(error);  
    \}  
  \}

  return \<button onClick=\{handleClick\}\>Save\</button\>;  
\}

## **Important point**

Error Boundaries and `try...catch` solve different problems.

* Error Boundary catches render tree errors.  
* `try...catch` catches event handler and imperative code errors.  
* Async errors need promise handling or `try...catch` with `await`.

## **Interview-ready answer**

`try...catch` catches synchronous errors in the current execution flow. It does not automatically catch errors inside timers, promises, or async callbacks unless those are handled inside the callback or awaited inside the `try` block. In React, event handler errors should be handled using local `try...catch`.

---

# **3\. Async Error Handling**

## **Simple meaning**

Async errors usually come from promises, API calls, timers, or async functions.

Handle them with `.catch()` or `try...catch` around `await`.

## **Async/await example**

async function loadUser() \{  
  try \{  
    const user \= await fetchUser();

    setUser(user);  
  \} catch (error) \{  
    setError("Failed to load user");  
  \} finally \{  
    setLoading(false);  
  \}  
\}

## **Promise example**

fetchUser()  
  .then((user) \=\> \{  
    setUser(user);  
  \})  
  .catch((error) \=\> \{  
    setError("Failed to load user");  
  \});

## **Important trap**

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

## **Async errors in React effects**

useEffect(() \=\> \{  
  async function loadUser() \{  
    try \{  
      const user \= await fetchUser();

      setUser(user);  
    \} catch (error) \{  
      setError("Failed to load user");  
    \}  
  \}

  loadUser();  
\}, \[\]);

Do not make the `useEffect` callback itself `async`.

useEffect(async () \=\> \{  
  await fetchUser();  
\}, \[\]);

Avoid this because `useEffect` expects either nothing or a cleanup function, not a promise.

## **Interview-ready answer**

Async errors should be handled using `.catch()` or `try...catch` with `await`. A common mistake is calling a promise inside `try` without awaiting it. In React effects, define an inner async function and handle errors inside it instead of making the effect callback itself async.

---

# **4\. API Error Handling**

## **Simple meaning**

API error handling means handling loading, success, HTTP errors, network errors, timeout/cancel cases, and user-friendly messages.

## **Basic fetch handling**

async function request(url) \{  
  const response \= await fetch(url);

  if (\!response.ok) \{  
    throw new Error(\`HTTP error: $\{response.status\}\`);  
  \}

  return response.json();  
\}

## **Important fetch behavior**

`fetch` rejects for network errors, but it does not reject automatically for HTTP errors like `400`, `404`, or `500`.

So we must check `response.ok`.

## **React API state example**

function UserPage() \{  
  const \[user, setUser\] \= React.useState(null);  
  const \[loading, setLoading\] \= React.useState(false);  
  const \[error, setError\] \= React.useState(null);

  React.useEffect(() \=\> \{  
    const controller \= new AbortController();

    async function loadUser() \{  
      setLoading(true);  
      setError(null);

      try \{  
        const response \= await fetch("/api/user", \{  
          signal: controller.signal,  
        \});

        if (\!response.ok) \{  
          throw new Error(\`HTTP error: $\{response.status\}\`);  
        \}

        const data \= await response.json();

        setUser(data);  
      \} catch (error) \{  
        if (error.name \=== "AbortError") return;

        setError("Unable to load user");  
      \} finally \{  
        setLoading(false);  
      \}  
    \}

    loadUser();

    return () \=\> \{  
      controller.abort();  
    \};  
  \}, \[\]);

  if (loading) return \<p\>Loading...\</p\>;  
  if (error) return \<p\>\{error\}\</p\>;  
  if (\!user) return null;

  return \<h1\>\{user.name\}\</h1\>;  
\}

## **Good API error handling includes**

* Loading state.  
* Error state.  
* Empty state.  
* Retry option.  
* User-friendly error message.  
* Technical logging for debugging.  
* `response.ok` check.  
* Request cancellation with `AbortController`.  
* Avoiding stale response updates.  
* Handling expected errors differently from unexpected errors.

## **Custom API error**

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

## **Interview-ready answer**

For API error handling, I handle both network errors and HTTP errors. Since `fetch` does not reject for `400` or `500`, I check `response.ok` and throw an error manually. In React, I usually maintain loading, error, data, and empty states, show user-friendly messages, log technical details, and cancel stale requests using `AbortController`.

---

# **5\. Global Error Handling**

## **Simple meaning**

Global error handling is a fallback layer for unexpected errors that were not handled locally.

## **Browser global error**

window.addEventListener("error", (event) \=\> \{  
  console.log(event.message);  
  console.log(event.filename);  
  console.log(event.lineno);  
\});

## **Unhandled promise rejection**

window.addEventListener("unhandledrejection", (event) \=\> \{  
  console.log(event.reason);  
\});

## **React application-level setup**

In a React app, common layers are:

* Error Boundaries for UI render crashes.  
* Local `try...catch` for event handlers and async code.  
* API error handling for expected server/network failures.  
* Global error listeners for logging unexpected issues.  
* Monitoring tools like Sentry, Datadog, New Relic, or similar.

## **Important point**

Global handlers should not replace local error handling. Expected errors should be handled close to where they happen.

## **Interview-ready answer**

Global error handling is a safety net for unexpected uncaught errors and unhandled promise rejections. In React apps, I combine global handlers with Error Boundaries, local async error handling, and proper API error states. Expected errors should still be handled locally.

---

# **Common Interview Topics / Questions**

---

# **1\. When do Error Boundaries work?**

## **Answer**

Error Boundaries work when errors happen during React rendering, lifecycle methods, or constructors of child components.

function BrokenComponent() \{  
  throw new Error("Render failed");

  return \<div\>Hello\</div\>;  
\}

\<ErrorBoundary\>  
  \<BrokenComponent /\>  
\</ErrorBoundary\>;

Answer: Error Boundary catches this because the error is thrown during render.

## **They work for**

* Render errors  
* Class lifecycle errors  
* Constructor errors  
* Child component tree errors

## **They do not work for**

* Event handlers  
* Async code  
* Promises  
* `setTimeout`  
* API failures directly  
* Server-side rendering  
* Errors inside the boundary itself

## **Interview-ready answer**

Error Boundaries work for errors thrown during rendering, lifecycle methods, and constructors of child components. They do not catch event handler errors, async errors, promise rejections, timers, API failures directly, server-side rendering errors, or errors inside the boundary itself.

---

# **2\. Why does Error Boundary not catch event handler errors?**

## **Answer**

Event handlers run after rendering, usually because of user interaction. They are not part of React’s render phase.

function Button() \{  
  function handleClick() \{  
    throw new Error("Click failed");  
  \}

  return \<button onClick=\{handleClick\}\>Click\</button\>;  
\}

Error Boundary will not catch this.

Correct handling:

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

## **Interview-ready answer**

Error Boundaries are designed to catch render-time errors in the component tree. Event handler errors happen later during user interaction, outside the render flow, so they should be handled with local `try...catch`.

---

# **3\. How do you handle async errors in React?**

## **Answer**

Use `try...catch` inside an async function, usually inside an effect or event handler.

useEffect(() \=\> \{  
  let cancelled \= false;

  async function loadData() \{  
    try \{  
      const data \= await fetchData();

      if (\!cancelled) \{  
        setData(data);  
      \}  
    \} catch (error) \{  
      if (\!cancelled) \{  
        setError("Failed to load data");  
      \}  
    \}  
  \}

  loadData();

  return () \=\> \{  
    cancelled \= true;  
  \};  
\}, \[\]);

Better with `AbortController` for fetch:

useEffect(() \=\> \{  
  const controller \= new AbortController();

  async function loadData() \{  
    try \{  
      const response \= await fetch("/api/data", \{  
        signal: controller.signal,  
      \});

      if (\!response.ok) \{  
        throw new Error(\`HTTP error: $\{response.status\}\`);  
      \}

      const data \= await response.json();

      setData(data);  
    \} catch (error) \{  
      if (error.name \=== "AbortError") return;

      setError("Failed to load data");  
    \}  
  \}

  loadData();

  return () \=\> \{  
    controller.abort();  
  \};  
\}, \[\]);

## **Interview-ready answer**

I handle async errors in React with `try...catch` around awaited promises, or `.catch()` for promise chains. In `useEffect`, I define an inner async function, handle loading/error states, and clean up using `AbortController` or a cancellation flag to avoid stale updates.

---

# **4\. Error Boundary vs try/catch**

## **Simple comparison**

| Point | Error Boundary | try/catch |
| ----- | ----- | ----- |
| Catches render errors | Yes | Not normally around JSX tree |
| Catches event handler errors | No | Yes |
| Catches async errors | No | Yes, with `await` |
| Shows fallback UI | Yes | Manually |
| Scope | Component subtree | Current code block |
| Common use | UI crash recovery | Imperative/async logic |

## **Interview-ready answer**

Error Boundaries catch render-time errors in a React subtree and show fallback UI. `try...catch` handles errors in imperative code like event handlers, async functions, API calls, and parsing logic. In a good React app, we use both because they solve different problems.

---

# **5\. How do you design error handling in a production React app?**

## **Answer**

I usually design error handling at multiple levels:

* Component level: local validation and user-friendly messages.  
* API layer: normalize API errors and throw custom errors.  
* Page level: loading, error, empty, success states.  
* Error Boundary level: fallback UI for render crashes.  
* Global level: log unexpected errors and unhandled promise rejections.  
* Observability: send errors with metadata to monitoring tools.

## **Example flow**

API fails  
  ↓  
API client throws normalized ApiError  
  ↓  
Page catches error  
  ↓  
UI shows friendly message  
  ↓  
Logger records technical details

## **Interview-ready answer**

In production, I handle expected errors close to where they happen and unexpected errors globally. API clients normalize server errors, components show loading/error/empty states, Error Boundaries catch render crashes, and global handlers log uncaught errors. This gives users a stable UI and gives engineers enough information to debug.

---

# **6\. Can hooks replace Error Boundaries?**

## **Answer**

Not fully.

Error Boundaries currently require class components in core React. However, many teams use small reusable Error Boundary components or libraries that expose hook-like APIs around class-based boundaries.

## **Interview-ready answer**

Hooks do not directly replace Error Boundaries in core React because Error Boundaries are implemented using class lifecycle methods like `getDerivedStateFromError` and `componentDidCatch`. In practice, teams often create a reusable ErrorBoundary component and wrap routes, pages, or risky widgets with it.

---

# **Quick Revision Summary**

| Topic | Key point |
| ----- | ----- |
| Error Boundary | Catches render/lifecycle/constructor errors in child tree |
| Fallback UI | UI shown when boundary catches an error |
| Does not catch | Events, async, promises, timers, SSR, own errors |
| try/catch | Handles synchronous imperative code |
| Async errors | Use `.catch()` or `try/catch` with `await` |
| Fetch errors | Check `response.ok` manually |
| API state | Loading, error, empty, success |
| AbortController | Cancels stale fetch requests |
| Global error | Safety net for uncaught errors |
| React production setup | Local handling \+ API layer \+ Error Boundary \+ logging |

---

# **Final Interview-Ready Combined Answer**

React error handling should be designed in layers. Error Boundaries catch render-time errors in a child component tree and show fallback UI, but they do not catch event handler errors, async errors, promises, timers, or API failures directly. Event handler and imperative errors should be handled with local `try...catch`. Async errors should be handled with `.catch()` or `try...catch` around `await`. API errors should be normalized in the API layer, with proper loading, error, empty, and success states in the UI. In production apps, Error Boundaries, local error handling, API error handling, global error listeners, and monitoring tools work together to make the app more reliable and debuggable.

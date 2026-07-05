---
title: React Hooks
sidebar_position: 3
---

# React Hooks

Related canonical page: [React Performance](../important/performance/react-performance.md) for optimization trade-offs around `React.memo`, `useMemo`, and `useCallback`.

## Ownership

Use this page for Hook API usage and examples.

Use [React Performance](../important/performance/react-performance.md) for optimization decisions, profiler-first guidance, and when `React.memo`, `useMemo`, or `useCallback` are worth using.

## 3\. React Hooks

## **useState**

## **useEffect**

### **Cleanup Function**

### **Dependency Array**

## **useRef**

## **useMemo**

## **useCallback**

## **useContext**

## **useReducer**

## **useLayoutEffect**

## **useImperativeHandle**

## **Custom Hooks**

## **Hook Rules**

## **Common Interview Topics**

* useEffect lifecycle  
* useMemo vs useCallback  
* useRef use cases

## React Hooks

React Hooks let functional components use React features like state, side effects, refs, context, reducers, memoization, and imperative handles. Hooks are the reason modern React mostly uses functional components instead of class components.

---

## 1\. useState

## **Simple meaning**

`useState` adds local state to a functional component.

function Counter() \{

  const \[count, setCount\] \= React.useState(0);

  return (

    \<button onClick=\{() \=\> setCount(count \+ 1)\}\>

      Count: \{count\}

    \</button\>

  );

\}

## **Key mental model**

State is a snapshot for the current render.

When we call `setState`, React schedules a new render with the updated state.

## **Functional update**

Use functional update when next state depends on previous state.

setCount((prev) \=\> prev \+ 1);

Important example:

setCount(count \+ 1);

setCount(count \+ 1);

This may increment by 1 because both updates use the same `count` from the current render.

Better:

setCount((prev) \=\> prev \+ 1);

setCount((prev) \=\> prev \+ 1);

This increments by 2\.

## **Lazy initialization**

Use lazy initialization when initial state is expensive to calculate.

const \[items, setItems\] \= React.useState(() \=\> \{

  return expensiveInitialCalculation();

\});

The function runs only during initial render.

## **Interview-ready answer**

`useState` is used to manage local component state. Updating state schedules a re-render. Since state values are snapshots for the current render, functional updates should be used when the next state depends on the previous state.

---

## 2\. useEffect

## **Simple meaning**

`useEffect` runs side effects after React renders and commits updates to the DOM.

Common side effects:

* API calls  
* Subscriptions  
* Timers  
* Event listeners  
* DOM integration  
* Syncing with external systems

React.useEffect(() \=\> \{

  document.title \= "Dashboard";

\}, \[\]);

## **Key mental model**

Rendering should be pure. Effects are for work that happens outside rendering.

Render UI

  ↓

Commit DOM changes

  ↓

Run useEffect

## **Basic example**

function UserPage() \{

  const \[user, setUser\] \= React.useState(null);

  React.useEffect(() \=\> \{

    async function loadUser() \{

      const response \= await fetch("/api/user");

      const data \= await response.json();

      setUser(data);

    \}

    loadUser();

  \}, \[\]);

  return \<div\>\{user?.name\}\</div\>;

\}

## **Interview-ready answer**

`useEffect` is used for side effects after rendering, such as API calls, subscriptions, timers, event listeners, and syncing with external systems. It runs after the DOM has been updated.

---

## 3\. useEffect Cleanup Function

## **Simple meaning**

The cleanup function removes or cancels the side effect created by the effect.

React.useEffect(() \=\> \{

  const intervalId \= setInterval(() \=\> \{

    console.log("Running");

  \}, 1000);

  return () \=\> \{

    clearInterval(intervalId);

  \};

\}, \[\]);

## **When cleanup runs**

Cleanup runs:

* Before the effect runs again because dependencies changed  
* When the component unmounts

## **Event listener cleanup**

React.useEffect(() \=\> \{

  function handleResize() \{

    console.log(window.innerWidth);

  \}

  window.addEventListener("resize", handleResize);

  return () \=\> \{

    window.removeEventListener("resize", handleResize);

  \};

\}, \[\]);

## **API cancellation cleanup**

React.useEffect(() \=\> \{

  const controller \= new AbortController();

  async function loadData() \{

    try \{

      const response \= await fetch("/api/data", \{

        signal: controller.signal,

      \});

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

## **StrictMode note**

In development StrictMode, React may run an extra setup plus cleanup cycle to find missing cleanup bugs. This is expected and does not happen in production.

## **Interview-ready answer**

The cleanup function in `useEffect` is used to clean subscriptions, timers, event listeners, observers, or pending requests. It runs before the effect re-runs and when the component unmounts. This prevents memory leaks and stale updates.

---

## 4\. useEffect Dependency Array

## **Simple meaning**

The dependency array controls when the effect runs.

## **No dependency array**

React.useEffect(() \=\> \{

  console.log("Runs after every render");

\});

## **Empty dependency array**

React.useEffect(() \=\> \{

  console.log("Runs after initial mount");

\}, \[\]);

## **With dependencies**

React.useEffect(() \=\> \{

  console.log("Runs when userId changes");

\}, \[userId\]);

## **Common trap: missing dependency**

React.useEffect(() \=\> \{

  fetchUser(userId);

\}, \[\]);

If `userId` changes, this effect will not re-run.

Correct:

React.useEffect(() \=\> \{

  fetchUser(userId);

\}, \[userId\]);

## **Common trap: object/function dependency**

const filters \= \{ status: "active" \};

React.useEffect(() \=\> \{

  fetchUsers(filters);

\}, \[filters\]);

`filters` is a new object on every render, so the effect runs every time.

Better:

const filters \= React.useMemo(() \=\> \{

  return \{ status: "active" \};

\}, \[\]);

React.useEffect(() \=\> \{

  fetchUsers(filters);

\}, \[filters\]);

## **Interview-ready answer**

The dependency array tells React when to re-run an effect. No array means after every render, empty array means after initial mount, and values inside the array mean the effect re-runs when those values change. Missing dependencies can cause stale data bugs, while unstable object/function dependencies can cause unnecessary effect runs.

---

## 5\. useRef

## **Simple meaning**

`useRef` stores a mutable value that persists across renders without causing re-render when changed.

const inputRef \= React.useRef(null);

## **DOM reference use case**

function SearchBox() \{

  const inputRef \= React.useRef(null);

  function focusInput() \{

    inputRef.current.focus();

  \}

  return (

    \<\>

      \<input ref=\{inputRef\} /\>

      \<button onClick=\{focusInput\}\>Focus\</button\>

    \</\>

  );

\}

## **Store mutable value without re-render**

function Timer() \{

  const timerIdRef \= React.useRef(null);

  function start() \{

    timerIdRef.current \= setInterval(() \=\> \{

      console.log("Running");

    \}, 1000);

  \}

  function stop() \{

    clearInterval(timerIdRef.current);

  \}

  return \<button onClick=\{start\}\>Start\</button\>;

\}

## **Previous value**

function Counter(\{ count \}) \{

  const previousCountRef \= React.useRef();

  React.useEffect(() \=\> \{

    previousCountRef.current \= count;

  \}, \[count\]);

  return \<p\>Previous: \{previousCountRef.current\}\</p\>;

\}

## **Important trap**

Changing `ref.current` does not trigger re-render.

ref.current \= 10;

The UI will not update just because this value changed.

## **Interview-ready answer**

`useRef` creates a mutable container that persists across renders. It is commonly used for DOM access, storing timer IDs, keeping previous values, storing mutable values without re-rendering, and integrating with third-party libraries. Updating `ref.current` does not cause a re-render.

---

## 6\. useMemo

## **Simple meaning**

`useMemo` caches the result of an expensive calculation between renders.

const filteredUsers \= React.useMemo(() \=\> \{

  return users.filter((user) \=\> user.isActive);

\}, \[users\]);

## **Key mental model**

`useMemo` memoizes a value.

Same dependencies \-\> reuse old value

Changed dependencies \-\> recalculate value

## **Practical use case**

function ProductList(\{ products, searchText \}) \{

  const filteredProducts \= React.useMemo(() \=\> \{

    return products.filter((product) \=\>

      product.name.toLowerCase().includes(searchText.toLowerCase())

    );

  \}, \[products, searchText\]);

  return \<List items=\{filteredProducts\} /\>;

\}

## **When to use**

Use `useMemo` when:

* Calculation is expensive  
* Same calculation repeats often  
* You need stable object/array reference  
* You pass derived data to memoized child components

## **Common mistake**

Do not use `useMemo` for every calculation.

const total \= React.useMemo(() \=\> a \+ b, \[a, b\]);

This is usually unnecessary because `a + b` is cheap.

## **Interview-ready answer**

`useMemo` caches a calculated value between renders and recalculates it only when dependencies change. It is useful for expensive derived data or stable object/array references, but it should not be used everywhere because memoization also has overhead.

---

## 7\. useCallback

## **Simple meaning**

`useCallback` caches a function reference between renders.

const handleClick \= React.useCallback(() \=\> \{

  console.log("Clicked");

\}, \[\]);

## **Key mental model**

`useCallback` memoizes a function.

It is similar to:

const handleClick \= React.useMemo(() \=\> \{

  return () \=\> \{

    console.log("Clicked");

  \};

\}, \[\]);

## **Practical use case with memoized child**

const Child \= React.memo(function Child(\{ onSave \}) \{

  console.log("Child rendered");

  return \<button onClick=\{onSave\}\>Save\</button\>;

\});

function Parent(\{ userId \}) \{

  const handleSave \= React.useCallback(() \=\> \{

    saveUser(userId);

  \}, \[userId\]);

  return \<Child onSave=\{handleSave\} /\>;

\}

Without `useCallback`, a new function is created on every parent render, which can cause memoized child components to re-render.

## **When to use**

Use `useCallback` when:

* Passing callback to `React.memo` child  
* Function is dependency of another hook  
* Custom hook returns stable functions  
* Avoiding unnecessary effect re-runs caused by function identity

## **Common mistake**

Using `useCallback` everywhere does not automatically improve performance.

It is useful when function identity matters.

## **Interview-ready answer**

`useCallback` caches a function reference between renders. It is useful when passing callbacks to memoized child components or when a function is used as a dependency in another hook. `useCallback` does not avoid creating logic; it avoids changing the function reference unless dependencies change.

---

## 8\. useMemo vs useCallback

## **Simple comparison**

| Point | useMemo | useCallback |
| ----- | ----- | ----- |
| Caches | Value/result | Function reference |
| Returns | Calculated value | Function |
| Common use | Expensive calculation | Stable callback |
| Example | Filtered list | `onClick` handler |
| Syntax | `useMemo(() => value, deps)` | `useCallback(fn, deps)` |

## **Example**

const visibleItems \= React.useMemo(() \=\> \{

  return filterItems(items, query);

\}, \[items, query\]);

const handleSelect \= React.useCallback((item) \=\> \{

  setSelectedItem(item);

\}, \[\]);

## **Interview-ready answer**

`useMemo` memoizes the result of a calculation, while `useCallback` memoizes a function reference. Use `useMemo` for expensive derived values and stable objects/arrays. Use `useCallback` when function identity matters, such as passing callbacks to memoized children or dependency arrays.

---

## 9\. useContext

## **Simple meaning**

`useContext` reads a value from React Context without prop drilling.

const ThemeContext \= React.createContext("light");

function Button() \{

  const theme \= React.useContext(ThemeContext);

  return \<button className=\{theme\}\>Click\</button\>;

\}

## **Provider example**

function App() \{

  return (

    \<ThemeContext.Provider value="dark"\>

      \<Button /\>

    \</ThemeContext.Provider\>

  );

\}

## **Key mental model**

Context is for values needed by many components at different levels.

Common examples:

* Theme  
* Auth user  
* Locale  
* Feature flags  
* App configuration

## **Important performance point**

When context value changes, all consumers using that context can re-render.

\<ThemeContext.Provider value=\{\{ theme, setTheme \}\}\>

  \{children\}

\</ThemeContext.Provider\>

This creates a new object every render.

Better:

const value \= React.useMemo(() \=\> \{

  return \{ theme, setTheme \};

\}, \[theme\]);

\<ThemeContext.Provider value=\{value\}\>

  \{children\}

\</ThemeContext.Provider\>;

## **Interview-ready answer**

`useContext` reads and subscribes to a context value. It helps avoid prop drilling for shared app-level data like theme, auth, locale, and feature flags. But context updates can re-render all consumers, so context should be split or memoized carefully for performance-sensitive state.

---

## 10\. useReducer

## **Simple meaning**

`useReducer` manages complex state using a reducer function.

function reducer(state, action) \{

  switch (action.type) \{

    case "increment":

      return \{ count: state.count \+ 1 \};

    case "decrement":

      return \{ count: state.count \- 1 \};

    default:

      return state;

  \}

\}

function Counter() \{

  const \[state, dispatch\] \= React.useReducer(reducer, \{ count: 0 \});

  return (

    \<button onClick=\{() \=\> dispatch(\{ type: "increment" \})\}\>

      \{state.count\}

    \</button\>

  );

\}

## **Key mental model**

Instead of directly setting state, we dispatch actions.

UI event \-\> dispatch action \-\> reducer calculates next state

## **When to use useReducer**

Use it when:

* State has multiple related fields  
* Next state depends on action type  
* State transition logic is complex  
* You want reducer logic to be testable  
* You want Redux-like local component state

## **Example: form reducer**

function formReducer(state, action) \{

  switch (action.type) \{

    case "change":

      return \{

        ...state,

        \[action.field\]: action.value,

      \};

    case "reset":

      return action.initialState;

    default:

      return state;

  \}

\}

## **Interview-ready answer**

`useReducer` is useful for complex state transitions. It uses a reducer function and dispatch actions to update state. I prefer `useState` for simple independent values and `useReducer` when state has multiple related fields or transition logic becomes complex.

---

## 11\. useLayoutEffect

## **Simple meaning**

`useLayoutEffect` is like `useEffect`, but it runs synchronously after DOM changes and before the browser paints.

React.useLayoutEffect(() \=\> \{

  const height \= ref.current.getBoundingClientRect().height;

  setTooltipHeight(height);

\}, \[\]);

## **Key mental model**

Use it when you must measure or update layout before the user sees the screen.

Render

  ↓

DOM update

  ↓

useLayoutEffect runs

  ↓

Browser paints

  ↓

useEffect runs later

## **Use cases**

* Measuring DOM size/position  
* Preventing visual flicker  
* Tooltip positioning  
* Scroll position adjustment  
* Layout-sensitive animations

## **Important trap**

`useLayoutEffect` blocks painting. Overusing it can hurt performance.

Use `useEffect` by default. Use `useLayoutEffect` only when visual correctness requires it.

## **Interview-ready answer**

`useLayoutEffect` runs after DOM mutations but before the browser paints. It is useful for layout measurements and preventing visual flicker. Since it blocks painting, it should be used carefully and `useEffect` should be preferred for normal side effects.

---

## 12\. useImperativeHandle

## **Simple meaning**

`useImperativeHandle` customizes what a parent can access through a ref.

It is usually used with `forwardRef`.

const CustomInput \= React.forwardRef(function CustomInput(props, ref) \{

  const inputRef \= React.useRef(null);

  React.useImperativeHandle(ref, () \=\> \{

    return \{

      focus() \{

        inputRef.current.focus();

      \},

      clear() \{

        inputRef.current.value \= "";

      \},

    \};

  \}, \[\]);

  return \<input ref=\{inputRef\} /\>;

\});

function Parent() \{

  const inputRef \= React.useRef(null);

  return (

    \<\>

      \<CustomInput ref=\{inputRef\} /\>

      \<button onClick=\{() \=\> inputRef.current.focus()\}\>

        Focus

      \</button\>

    \</\>

  );

\}

## **Key mental model**

Normally React prefers declarative data flow. `useImperativeHandle` is for rare cases where parent needs imperative methods.

## **Use cases**

* Expose `focus`  
* Expose `scrollToTop`  
* Expose `clear`  
* Integrate with third-party UI widgets  
* Build reusable form/input components

## **Interview-ready answer**

`useImperativeHandle` lets a child component expose a custom ref API to its parent. It is usually used with `forwardRef`. It should be used rarely, mainly for imperative actions like focus, clear, scroll, or third-party integration.

---

## 13\. Custom Hooks

## **Simple meaning**

A custom hook is a reusable function that uses React hooks.

Its name must start with `use`.

function useWindowSize() \{

  const \[size, setSize\] \= React.useState(\{

    width: window.innerWidth,

    height: window.innerHeight,

  \});

  React.useEffect(() \=\> \{

    function handleResize() \{

      setSize(\{

        width: window.innerWidth,

        height: window.innerHeight,

      \});

    \}

    window.addEventListener("resize", handleResize);

    return () \=\> \{

      window.removeEventListener("resize", handleResize);

    \};

  \}, \[\]);

  return size;

\}

Usage:

function App() \{

  const size \= useWindowSize();

  return \<p\>\{size.width\}\</p\>;

\}

## **API call custom hook**

function useFetch(url) \{

  const \[data, setData\] \= React.useState(null);

  const \[loading, setLoading\] \= React.useState(false);

  const \[error, setError\] \= React.useState(null);

  React.useEffect(() \=\> \{

    const controller \= new AbortController();

    async function load() \{

      setLoading(true);

      setError(null);

      try \{

        const response \= await fetch(url, \{

          signal: controller.signal,

        \});

        if (\!response.ok) \{

          throw new Error(\`HTTP error: $\{response.status\}\`);

        \}

        const result \= await response.json();

        setData(result);

      \} catch (error) \{

        if (error.name \!== "AbortError") \{

          setError(error);

        \}

      \} finally \{

        setLoading(false);

      \}

    \}

    load();

    return () \=\> \{

      controller.abort();

    \};

  \}, \[url\]);

  return \{ data, loading, error \};

\}

## **Why custom hooks are useful**

* Reuse stateful logic  
* Keep components clean  
* Share behavior across components  
* Encapsulate effects and cleanup  
* Easier testing of logic  
* Better separation of concerns

## **Interview-ready answer**

Custom hooks are reusable functions that encapsulate hook-based logic. They let us share stateful behavior like API fetching, window size tracking, localStorage sync, debounce, permissions, or form handling across components. A custom hook must start with `use` and follow the Rules of Hooks.

---

## 14\. Hook Rules

## **Rule 1: Call hooks only at the top level**

Do not call hooks inside:

* Conditions  
* Loops  
* Nested functions  
* Event handlers  
* `try/catch/finally`

Bad:

if (isLoggedIn) \{

  const \[user, setUser\] \= React.useState(null);

\}

Good:

const \[user, setUser\] \= React.useState(null);

if (\!isLoggedIn) \{

  return null;

\}

## **Rule 2: Call hooks only from React functions**

Hooks can be called from:

* React functional components  
* Custom hooks

Bad:

function normalUtility() \{

  const theme \= React.useContext(ThemeContext);

\}

Good:

function useThemeValue() \{

  return React.useContext(ThemeContext);

\}

## **Why rules exist**

React tracks hooks by call order.

If hook order changes between renders, React cannot correctly match state/effect positions.

## **Example problem**

function Component(\{ show \}) \{

  const \[count, setCount\] \= React.useState(0);

  if (show) \{

    const \[name, setName\] \= React.useState("");

  \}

  const \[flag, setFlag\] \= React.useState(false);

\}

When `show` changes, hook order changes. React may associate state with the wrong hook.

## **Interview-ready answer**

Hooks must be called at the top level of React components or custom hooks because React relies on consistent hook call order between renders. Calling hooks conditionally, inside loops, nested functions, event handlers, or try/catch can break that order and cause incorrect state matching.

---

## Common Interview Topics / Questions

---

## 1\. useEffect lifecycle

## **Simple answer**

`useEffect` runs after render and commit. Its cleanup runs before the effect re-runs and when the component unmounts.

## **Mount-like behavior**

React.useEffect(() \=\> \{

  console.log("Mounted");

  return () \=\> \{

    console.log("Unmounted");

  \};

\}, \[\]);

## **Update behavior**

React.useEffect(() \=\> \{

  console.log("userId changed:", userId);

  return () \=\> \{

    console.log("Cleanup for previous userId");

  \};

\}, \[userId\]);

## **No dependency array**

React.useEffect(() \=\> \{

  console.log("Runs after every render");

\});

## **Interview-ready answer**

`useEffect` runs after React commits DOM updates. With an empty dependency array, it runs after mount and cleanup runs on unmount. With dependencies, it runs after mount and whenever dependencies change, and cleanup runs before the next effect execution. Without dependency array, it runs after every render.

---

## 2\. useMemo vs useCallback

## **Answer**

`useMemo` caches a value. `useCallback` caches a function reference.

const filteredItems \= React.useMemo(() \=\> \{

  return filterItems(items, query);

\}, \[items, query\]);

const handleClick \= React.useCallback(() \=\> \{

  submitForm(id);

\}, \[id\]);

## **Interview-ready answer**

`useMemo` is for memoizing calculated values like filtered lists, sorted data, or stable objects. `useCallback` is for memoizing function references, usually when passing callbacks to memoized children or using functions in dependency arrays. Both should be used when they solve a real performance or stability problem, not by default everywhere.

---

## 3\. useRef use cases

## **Answer**

`useRef` is useful when we need a value that persists across renders but does not trigger re-render.

Common use cases:

* Access DOM nodes  
* Focus input  
* Store timer ID  
* Store previous value  
* Store latest callback  
* Store mutable object  
* Integrate third-party libraries  
* Avoid stale closure in some event listeners

## **Example: latest value ref**

function Component(\{ value \}) \{

  const latestValueRef \= React.useRef(value);

  React.useEffect(() \=\> \{

    latestValueRef.current \= value;

  \}, \[value\]);

  React.useEffect(() \=\> \{

    const intervalId \= setInterval(() \=\> \{

      console.log(latestValueRef.current);

    \}, 1000);

    return () \=\> clearInterval(intervalId);

  \}, \[\]);

  return null;

\}

## **Interview-ready answer**

`useRef` is used for DOM references and mutable values that should persist across renders without triggering re-render. It is useful for focusing inputs, storing timer IDs, keeping previous values, holding latest values for callbacks, and integrating with third-party libraries.

---

## 4\. useState vs useReducer

## **Simple comparison**

| Point | useState | useReducer |
| ----- | ----- | ----- |
| Best for | Simple state | Complex state |
| Update style | Setter | Dispatch action |
| Logic location | Inside component/event | Reducer function |
| Good for | Boolean, input, counter | Forms, state machines, complex transitions |
| Testability | Basic | Reducer is easy to test |

## **Interview-ready answer**

`useState` is best for simple independent state. `useReducer` is better when state has multiple related fields or complex transition logic. Reducers make state updates more predictable and easier to test.

---

## 5\. useEffect vs useLayoutEffect

## **Simple comparison**

| Point | useEffect | useLayoutEffect |
| ----- | ----- | ----- |
| Runs | After paint | Before paint |
| Blocks paint | No | Yes |
| Best for | API calls, subscriptions, timers | DOM measurement, layout correction |
| Default choice | Yes | Only when needed |

## **Interview-ready answer**

`useEffect` runs after the browser paints, so it is best for normal side effects like API calls and subscriptions. `useLayoutEffect` runs after DOM changes but before paint, so it is useful for measuring layout or preventing flicker. Since it blocks paint, use it only when necessary.

---

## 6\. Why hooks should not be called conditionally?

## **Answer**

React tracks hooks by their call order.

If hooks are called conditionally, the order can change between renders.

function Component(\{ enabled \}) \{

  const \[a, setA\] \= React.useState(0);

  if (enabled) \{

    const \[b, setB\] \= React.useState(0);

  \}

  const \[c, setC\] \= React.useState(0);

\}

If `enabled` changes, React cannot reliably know which state belongs to which hook.

## **Interview-ready answer**

Hooks cannot be called conditionally because React relies on the same hook call order on every render. If the order changes, React may connect the wrong internal state or effect to the wrong hook call.

---

## 7\. What is stale closure in hooks?

## **Simple meaning**

A stale closure happens when a function remembers old state or props from a previous render.

function Counter() \{

  const \[count, setCount\] \= React.useState(0);

  React.useEffect(() \=\> \{

    const intervalId \= setInterval(() \=\> \{

      console.log(count);

    \}, 1000);

    return () \=\> clearInterval(intervalId);

  \}, \[\]);

  return \<button onClick=\{() \=\> setCount(count \+ 1)\}\>+\</button\>;

\}

This logs the initial `count` because the effect captured the first render’s value.

## **Fix 1: Add dependency**

React.useEffect(() \=\> \{

  const intervalId \= setInterval(() \=\> \{

    console.log(count);

  \}, 1000);

  return () \=\> clearInterval(intervalId);

\}, \[count\]);

## **Fix 2: Use ref for latest value**

const countRef \= React.useRef(count);

React.useEffect(() \=\> \{

  countRef.current \= count;

\}, \[count\]);

React.useEffect(() \=\> \{

  const intervalId \= setInterval(() \=\> \{

    console.log(countRef.current);

  \}, 1000);

  return () \=\> clearInterval(intervalId);

\}, \[\]);

## **Interview-ready answer**

A stale closure happens when an effect, callback, or timer captures old state or props from a previous render. It can be fixed by adding correct dependencies, using functional state updates, or storing the latest value in a ref when needed.

---

## 8\. What makes a good custom hook?

## **Answer**

A good custom hook:

* Starts with `use`  
* Has a clear responsibility  
* Hides reusable stateful logic  
* Handles cleanup internally  
* Exposes a small clean API  
* Avoids unnecessary re-renders  
* Does not hide too much business logic unexpectedly

## **Example**

function useDebouncedValue(value, delay) \{

  const \[debouncedValue, setDebouncedValue\] \= React.useState(value);

  React.useEffect(() \=\> \{

    const timerId \= setTimeout(() \=\> \{

      setDebouncedValue(value);

    \}, delay);

    return () \=\> \{

      clearTimeout(timerId);

    \};

  \}, \[value, delay\]);

  return debouncedValue;

\}

Usage:

const debouncedSearch \= useDebouncedValue(searchText, 500);

## **Interview-ready answer**

A good custom hook extracts reusable hook-based logic behind a clean API. It should handle its own effects and cleanup, follow the Rules of Hooks, and make components easier to read without hiding important behavior.

---

## Quick Revision Summary

| Hook | Main purpose |
| ----- | ----- |
| useState | Local state |
| useEffect | Side effects after render |
| Cleanup | Remove/cancel previous side effect |
| Dependency array | Controls when effect re-runs |
| useRef | Mutable value or DOM ref without re-render |
| useMemo | Memoized calculated value |
| useCallback | Memoized function reference |
| useContext | Read shared context value |
| useReducer | Complex state transitions |
| useLayoutEffect | Layout effect before paint |
| useImperativeHandle | Custom ref API for parent |
| Custom Hook | Reusable hook-based logic |
| Hook Rules | Same hook order on every render |

---

## Final Interview-Ready Combined Answer

React Hooks allow functional components to use state, effects, refs, context, reducers, memoization, and reusable stateful logic. `useState` manages local state, `useEffect` handles side effects after render, and its cleanup prevents leaks from timers, subscriptions, listeners, and requests. The dependency array controls when effects re-run. `useRef` stores mutable values or DOM references without triggering re-render. `useMemo` caches calculated values, while `useCallback` caches function references. `useContext` reads shared context, `useReducer` handles complex state transitions, and `useLayoutEffect` is used for layout-sensitive work before paint. Custom hooks extract reusable hook logic. The most important rule is that hooks must be called at the top level because React depends on consistent hook call order across renders.

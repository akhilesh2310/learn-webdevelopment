---
title: Rendering Components
sidebar_position: 2
---

# Rendering Components

Related canonical pages: [React Fiber](fundamentals/react-fiber.md), [React Reconciliation](fundamentals/reconciliation-1.md), [React Under The Hood](react-under-the-hood.md), [React Performance](../important/performance/react-performance.md).

## Ownership

Use this page for component lifecycle, render phase, commit phase, re-render triggers, mounting, updating, unmounting, and cleanup.

Use [React Performance](../important/performance/react-performance.md) for optimization strategy and memoization decisions.

# **2\. Component Lifecycle & Rendering**

## **Render Phase**

## **Commit Phase**

## **Mounting**

## **Updating**

## **Unmounting**

## **React Rendering Flow**

## **Parent → Child Rendering**

## **Re-render Triggers**

## **Component Cleanup**

## **Common Interview Topics**

* Why component re-renders  
* Render vs Commit phase

# **Component Lifecycle & Rendering**

React component lifecycle means what happens when a component appears on screen, updates, and is removed from the screen.

In modern React, we usually explain lifecycle using functional components and hooks, but it is also useful to understand the older class component lifecycle terms.

The most important mental model is:

Mounting

→ Component appears first time

Updating

→ Component re-renders because state/props/context changed

Unmounting

→ Component is removed from UI

---

# **1\. React Rendering Flow**

## **Simple meaning**

React rendering means React calls your component function to calculate what the UI should look like.

function UserCard(\{ name \}) \{

  return \<h1\>\{name\}\</h1\>;

\}

When React renders this component, it calls `UserCard()` and gets React elements as output.

## **Full rendering flow**

State / props / context changes

      ↓

React schedules update

      ↓

Render phase starts

      ↓

React calls component functions

      ↓

Components return JSX

      ↓

JSX becomes React elements

      ↓

React reconciles old tree and new tree

      ↓

Commit phase applies DOM changes

      ↓

Browser paints updated screen

      ↓

useEffect runs after paint

## **Important point**

Rendering does not always mean DOM update.

A component can re-render, but if the output is the same, React may not change the real DOM.

## **Interview-ready answer**

React rendering is the process where React calls components to calculate the next UI. After rendering, React compares the new tree with the old tree and commits only the necessary DOM changes.

---

# **2\. Render Phase**

## **Simple meaning**

The render phase is where React calculates what the UI should look like.

During render phase:

* React calls component functions.  
* Components return JSX.  
* JSX becomes React elements.  
* React builds the next UI tree.  
* Reconciliation happens.  
* React figures out what changed.  
* No real DOM changes happen yet.

## **Example**

function Counter(\{ count \}) \{

  console.log("Rendering Counter");

  return \<h1\>\{count\}\</h1\>;

\}

When `Counter` renders, React is only calculating UI. It has not necessarily updated the DOM yet.

## **Render phase should be pure**

A component render should not cause side effects.

Bad:

function UserPage() \{

  localStorage.setItem("visited", "true"); // Avoid side effect during render

  return \<h1\>User Page\</h1\>;

\}

Better:

function UserPage() \{

  React.useEffect(() \=\> \{

    localStorage.setItem("visited", "true");

  \}, \[\]);

  return \<h1\>User Page\</h1\>;

\}

## **Why render should be pure**

React may call render more than once, especially in StrictMode or concurrent rendering.

If we perform side effects during render, they may run multiple times unexpectedly.

## **Interview-ready answer**

The render phase is where React calls components and calculates the next UI. It should be pure because React may pause, restart, or call rendering more than once. DOM changes and side effects should not happen during render.

---

# **3\. Commit Phase**

## **Simple meaning**

The commit phase is where React applies final changes to the real DOM.

During commit phase:

* DOM nodes are created, updated, or removed.  
* Refs are attached or detached.  
* `useLayoutEffect` runs.  
* Browser paints.  
* `useEffect` runs after paint.

## **Example**

Old UI: Count: 0

New UI: Count: 1

Commit phase:

React updates real DOM text from 0 to 1

## **Key mental model**

Render phase

→ calculate changes

Commit phase

→ apply changes

## **Important point**

The render phase can be interrupted in concurrent rendering.

The commit phase is synchronous because React must keep the DOM consistent.

## **Interview-ready answer**

The commit phase is where React applies the calculated changes to the real DOM. It updates DOM nodes, attaches refs, runs layout effects, and then normal effects run after paint. Render calculates; commit applies.

---

# **4\. Render Phase vs Commit Phase**

## **Simple comparison**

| Point | Render Phase | Commit Phase |
| ----- | ----- | ----- |
| Main job | Calculate next UI | Apply changes to DOM |
| Calls components | Yes | No |
| Updates real DOM | No | Yes |
| Can be interrupted | Yes, in concurrent rendering | No |
| Should be pure | Yes | Side effects/effects run here |
| Example work | Reconciliation, diffing | DOM mutations, refs, effects |

## **Interview-ready answer**

Render phase is the calculation phase where React calls components and figures out what changed. Commit phase is the mutation phase where React updates the real DOM and runs effects. Render can be interrupted, but commit is synchronous.

---

# **5\. Mounting**

## **Simple meaning**

Mounting means the component is added to the UI for the first time.

## **Functional component mounting**

function UserPage() \{

  React.useEffect(() \=\> \{

    console.log("Mounted");

    return () \=\> \{

      console.log("Unmounted");

    \};

  \}, \[\]);

  return \<h1\>User Page\</h1\>;

\}

With empty dependency array:

useEffect setup

→ runs after initial mount

cleanup

→ runs when component unmounts

## **Mounting flow**

Component is used first time

      ↓

React calls component

      ↓

Component returns JSX

      ↓

React creates DOM nodes

      ↓

DOM is inserted into page

      ↓

useLayoutEffect runs

      ↓

Browser paints

      ↓

useEffect runs

## **Class component equivalent**

class UserPage extends React.Component \{

  componentDidMount() \{

    console.log("Mounted");

  \}

  render() \{

    return \<h1\>User Page\</h1\>;

  \}

\}

## **Interview-ready answer**

Mounting is when a component appears on the screen for the first time. React renders it, commits DOM nodes, and then effects run. In functional components, mount-like behavior is usually handled with `useEffect(() => \{\}, [])`.

---

# **6\. Updating**

## **Simple meaning**

Updating means the component re-renders after state, props, or context changes.

## **Example**

function Counter() \{

  const \[count, setCount\] \= React.useState(0);

  React.useEffect(() \=\> \{

    console.log("Count changed:", count);

  \}, \[count\]);

  return (

    \<button onClick=\{() \=\> setCount((prev) \=\> prev \+ 1)\}\>

      Count: \{count\}

    \</button\>

  );

\}

When `count` changes:

setCount called

      ↓

Counter re-renders

      ↓

React calculates new UI

      ↓

DOM updates if needed

      ↓

Effect runs because count changed

## **Update flow**

State/props/context update

      ↓

React calls component again

      ↓

New JSX is returned

      ↓

React compares old and new tree

      ↓

DOM changes are committed

      ↓

Effects with changed dependencies run

## **Class component equivalent**

class Counter extends React.Component \{

  componentDidUpdate(prevProps, prevState) \{

    console.log("Component updated");

  \}

  render() \{

    return \<h1\>\{this.props.count\}\</h1\>;

  \}

\}

## **Interview-ready answer**

Updating happens when a component re-renders due to state, props, or context changes. React calls the component again, compares the new output with the previous output, and commits only the required DOM changes.

---

# **7\. Unmounting**

## **Simple meaning**

Unmounting means the component is removed from the UI.

This can happen when:

* Route changes.  
* Conditional rendering removes the component.  
* Parent unmounts.  
* List item is removed.  
* Key changes and React recreates component.

## **Example**

function Timer() \{

  React.useEffect(() \=\> \{

    const intervalId \= setInterval(() \=\> \{

      console.log("Running");

    \}, 1000);

    return () \=\> \{

      clearInterval(intervalId);

      console.log("Cleanup done");

    \};

  \}, \[\]);

  return \<h1\>Timer\</h1\>;

\}

When `Timer` unmounts, cleanup runs and clears the interval.

## **Class component equivalent**

class Timer extends React.Component \{

  componentWillUnmount() \{

    clearInterval(this.intervalId);

  \}

  render() \{

    return \<h1\>Timer\</h1\>;

  \}

\}

## **Interview-ready answer**

Unmounting happens when a component is removed from the UI. In functional components, cleanup is done by returning a function from `useEffect`. Cleanup is important for timers, subscriptions, event listeners, observers, and pending requests.

---

# **8\. Component Cleanup**

## **Simple meaning**

Cleanup means removing side effects created by a component.

## **Common cleanup use cases**

* Clear timers.  
* Remove event listeners.  
* Cancel API requests.  
* Disconnect WebSocket.  
* Unsubscribe from stores.  
* Disconnect observers.  
* Destroy third-party widget instances.

## **Event listener cleanup**

function WindowSizeLogger() \{

  React.useEffect(() \=\> \{

    function handleResize() \{

      console.log(window.innerWidth);

    \}

    window.addEventListener("resize", handleResize);

    return () \=\> \{

      window.removeEventListener("resize", handleResize);

    \};

  \}, \[\]);

  return null;

\}

## **API cleanup with AbortController**

function UserPage(\{ userId \}) \{

  const \[user, setUser\] \= React.useState(null);

  React.useEffect(() \=\> \{

    const controller \= new AbortController();

    async function loadUser() \{

      try \{

        const response \= await fetch(\`/api/users/$\{userId\}\`, \{

          signal: controller.signal,

        \});

        const data \= await response.json();

        setUser(data);

      \} catch (error) \{

        if (error.name \=== "AbortError") return;

        console.error(error);

      \}

    \}

    loadUser();

    return () \=\> \{

      controller.abort();

    \};

  \}, \[userId\]);

  return \<h1\>\{user?.name\}\</h1\>;

\}

## **When cleanup runs**

Cleanup runs:

Before effect runs again due to dependency change

When component unmounts

Example:

React.useEffect(() \=\> \{

  connect(roomId);

  return () \=\> \{

    disconnect(roomId);

  \};

\}, \[roomId\]);

When `roomId` changes:

disconnect old room

connect new room

## **Interview-ready answer**

Cleanup removes side effects created by a component. In `useEffect`, cleanup runs before the effect re-runs and when the component unmounts. It prevents memory leaks, duplicate subscriptions, stale network requests, and unexpected behavior.

---

# **9\. Parent → Child Rendering**

## **Simple meaning**

When a parent component re-renders, React also evaluates its child components by default.

## **Example**

function Parent() \{

  const \[count, setCount\] \= React.useState(0);

  return (

    \<\>

      \<button onClick=\{() \=\> setCount((prev) \=\> prev \+ 1)\}\>

        Update Parent

      \</button\>

      \<Child /\>

    \</\>

  );

\}

function Child() \{

  console.log("Child rendered");

  return \<p\>Child\</p\>;

\}

When parent state changes, `Parent` re-renders and `Child` also renders.

## **Key mental model**

Parent re-renders

      ↓

Parent returns child element again

      ↓

Child may also re-render

      ↓

React commits DOM only if output changed

## **Prevent unnecessary child re-renders**

Use `React.memo` when child props are stable and rendering is expensive.

const Child \= React.memo(function Child(\{ name \}) \{

  console.log("Child rendered");

  return \<p\>\{name\}\</p\>;

\});

## **Important point**

`React.memo` only helps when props are shallowly equal.

If parent passes a new object or function every render, memo may not help.

\<Child config=\{\{ theme: "dark" \}\} /\>

This creates a new object each render.

Better if needed:

const config \= React.useMemo(() \=\> \{

  return \{ theme: "dark" \};

\}, \[\]);

\<Child config=\{config\} /\>;

## **Interview-ready answer**

When a parent re-renders, its children are also evaluated by default. React may still avoid DOM changes if output is same. To reduce expensive child re-renders, use `React.memo`, stable props, `useMemo`, and `useCallback` where they solve a real performance issue.

---

# **10\. Re-render Triggers**

## **Simple meaning**

A component re-renders when React needs to calculate its UI again.

## **Common re-render triggers**

### **1\. State update**

setCount((prev) \=\> prev \+ 1);

### **2\. Props change**

\<UserCard user=\{newUser\} /\>

### **3\. Parent re-render**

Parent renders again

  ↓

Child may render again

### **4\. Context value change**

const theme \= React.useContext(ThemeContext);

If provider value changes, consumers can re-render.

### **5\. External store update**

Examples:

* Redux store update.  
* Zustand store update.  
* React Query cache update.  
* Custom external store.

### **6\. Key change**

\<UserForm key=\{userId\} userId=\{userId\} /\>

Changing `key` can force React to unmount old component and mount a new one.

## **What does not always trigger a re-render?**

### **Updating ref**

ref.current \= 10;

This does not trigger re-render.

### **Mutating object directly**

user.name \= "New Name";

setUser(user);

This may not work correctly because object reference is same.

Better:

setUser((prev) \=\> (\{

  ...prev,

  name: "New Name",

\}));

### **Setting same state value**

setCount(1);

setCount(1);

React may skip re-render if the next state is the same as current state.

## **Interview-ready answer**

A component re-renders when its state changes, its props change, its parent re-renders, a consumed context value changes, an external store subscription changes, or its key changes. Updating refs does not trigger re-render. Direct mutation should be avoided because React relies on state identity changes.

---

# **11\. Why Component Re-renders**

## **Simple answer**

A component re-renders because React needs to calculate whether its UI should change.

## **Example**

function UserPage(\{ user \}) \{

  console.log("render");

  return \<h1\>\{user.name\}\</h1\>;

\}

This component can re-render because:

Parent rendered again

Prop user changed

Context changed

State changed

External store changed

## **Important distinction**

Re-render is not always bad.

A re-render is just recalculation.

The expensive part can be:

* Heavy calculations during render.  
* Rendering very large lists.  
* Passing unstable props to memoized children.  
* Causing unnecessary DOM updates.  
* Running expensive effects too often.

## **How to reduce unnecessary re-renders**

Use:

* Better state placement.  
* Split components.  
* `React.memo` for expensive children.  
* `useMemo` for expensive derived values.  
* `useCallback` for stable callbacks.  
* Context splitting.  
* Selectors for global stores.  
* List virtualization for large lists.

## **Interview-ready answer**

A component re-renders when React needs to recalculate its output due to state, props, parent, context, or store changes. Re-rendering itself is not always a problem; performance issues happen when rendering is expensive or causes unnecessary work. Optimization should be based on measurement.

---

# **12\. Lifecycle Mapping: Class vs Functional Components**

## **Class component lifecycle**

Mount:

constructor

render

componentDidMount

Update:

render

componentDidUpdate

Unmount:

componentWillUnmount

## **Functional component lifecycle with hooks**

Mount:

function runs

DOM commits

useEffect runs

Update:

function runs again

DOM commits if needed

cleanup old effect if dependencies changed

new effect runs

Unmount:

cleanup function runs

## **Class example**

class UserPage extends React.Component \{

  componentDidMount() \{

    console.log("Mounted");

  \}

  componentDidUpdate() \{

    console.log("Updated");

  \}

  componentWillUnmount() \{

    console.log("Unmounted");

  \}

  render() \{

    return \<h1\>User Page\</h1\>;

  \}

\}

## **Functional example**

function UserPage(\{ userId \}) \{

  React.useEffect(() \=\> \{

    console.log("Mounted or userId changed");

    return () \=\> \{

      console.log("Cleanup before next effect or unmount");

    \};

  \}, \[userId\]);

  return \<h1\>User Page\</h1\>;

\}

## **Interview-ready answer**

Class components use lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`. Functional components use `useEffect` and cleanup functions to handle similar lifecycle behavior. However, hooks are better understood as synchronization with external systems, not exact lifecycle method replacements.

---

# **Common Interview Topics / Questions**

---

# **1\. Why does a component re-render?**

## **Answer**

A component re-renders when React needs to recalculate its UI.

Common reasons:

* Its state changed.  
* Its props changed.  
* Its parent re-rendered.  
* A context value it uses changed.  
* An external store subscription changed.  
* Its key changed.

## **Interview-ready answer**

A component re-renders when state, props, context, parent render, external store, or key changes require React to recalculate its UI. Re-rendering is not always bad; it becomes a problem only when the render work is expensive or unnecessary.

---

# **2\. Render phase vs Commit phase**

## **Answer**

Render phase calculates. Commit phase applies.

Render phase:

React calls components and figures out what changed

Commit phase:

React updates real DOM and runs effects

## **Interview-ready answer**

The render phase is where React calls components and calculates the next UI. It should be pure and can be interrupted. The commit phase applies DOM updates, updates refs, and runs effects. Commit is synchronous and should be fast.

---

# **3\. Does re-render always update the DOM?**

## **Answer**

No.

A component can re-render, but if React finds no actual DOM difference, it may not update the DOM.

function App(\{ name \}) \{

  return \<h1\>\{name\}\</h1\>;

\}

If `name` is still the same, React may render but commit no DOM change.

## **Interview-ready answer**

No, re-render does not always mean DOM update. Re-render means React recalculates UI. DOM update happens only if reconciliation finds a real change that needs to be committed.

---

# **4\. What happens when parent re-renders?**

## **Answer**

By default, React evaluates child components again.

Parent state changes

      ↓

Parent renders

      ↓

Children may render

      ↓

DOM updates only if output changed

## **Interview-ready answer**

When a parent re-renders, its child components are usually evaluated again. This does not always mean DOM updates. Expensive child renders can be optimized using `React.memo`, stable props, and better state placement.

---

# **5\. How do you prevent unnecessary re-renders?**

## **Answer**

Use the right optimization based on the cause.

Common options:

* Keep state close to where it is used.  
* Split large components.  
* Avoid unnecessary global state.  
* Use `React.memo` for expensive children.  
* Use `useMemo` for expensive calculations.  
* Use `useCallback` for stable callbacks.  
* Split context providers.  
* Use selectors in Redux/Zustand.  
* Virtualize large lists.

## **Interview-ready answer**

I prevent unnecessary re-renders by first identifying the cause using React DevTools Profiler. Then I optimize state placement, split components, memoize expensive children or calculations, stabilize props where needed, split context, and virtualize large lists.

---

# **6\. What is component cleanup?**

## **Answer**

Cleanup removes side effects before the component unmounts or before the effect runs again.

React.useEffect(() \=\> \{

  const id \= setInterval(() \=\> \{

    console.log("tick");

  \}, 1000);

  return () \=\> \{

    clearInterval(id);

  \};

\}, \[\]);

## **Interview-ready answer**

Component cleanup is used to remove side effects such as timers, subscriptions, event listeners, observers, WebSocket connections, and pending requests. In functional components, cleanup is returned from `useEffect`.

---

# **7\. What happens during mounting, updating, and unmounting?**

## **Answer**

Mounting:

Component appears first time

Updating:

Component re-renders due to state/props/context changes

Unmounting:

Component is removed and cleanup runs

## **Interview-ready answer**

During mounting, React renders the component and commits it to the DOM. During updating, React re-renders the component, reconciles the new tree, and commits required changes. During unmounting, React removes the component from the DOM and runs cleanup.

---

# **8\. Why should side effects not run during render?**

## **Answer**

React render can run multiple times.

Bad:

function Component() \{

  sendAnalytics();

  return \<h1\>Hello\</h1\>;

\}

This can send analytics multiple times.

Better:

function Component() \{

  React.useEffect(() \=\> \{

    sendAnalytics();

  \}, \[\]);

  return \<h1\>Hello\</h1\>;

\}

## **Interview-ready answer**

Side effects should not run during render because render should be pure and React may call it multiple times, restart it, or abandon it. Side effects belong in `useEffect`, `useLayoutEffect`, event handlers, or external side-effect handlers.

---

# **Quick Revision Summary**

| Topic | Key point |
| ----- | ----- |
| Render phase | React calculates next UI |
| Commit phase | React updates DOM |
| Mounting | Component appears first time |
| Updating | Component re-renders |
| Unmounting | Component is removed |
| Cleanup | Removes side effects |
| Parent render | Child may render too |
| Re-render trigger | State, props, parent, context, store, key |
| Re-render | UI recalculation |
| DOM update | Happens only during commit |
| useEffect cleanup | Before re-run and on unmount |
| useLayoutEffect | Runs before paint |
| useEffect | Runs after paint |

---

# **Final Interview-Ready Combined Answer**

React component lifecycle can be understood as mounting, updating, and unmounting. Mounting means the component appears for the first time. Updating means the component re-renders because state, props, context, parent render, external store, or key changed. Unmounting means the component is removed and cleanup runs. React updates happen in two main phases: the render phase and the commit phase. In the render phase, React calls components and calculates the next UI. This phase should be pure and can be interrupted. In the commit phase, React applies DOM changes, updates refs, and runs effects. A re-render does not always mean DOM update; it only means React recalculated the UI. DOM changes happen only if React finds actual differences during reconciliation.

---
title: Core Concept / Internals
sidebar_position: 8
---

# Core Concept / Internals

Related canonical pages: [React Fiber](fundamentals/react-fiber.md), [React Reconciliation](fundamentals/reconciliation-1.md), [Rendering Components](rendering-components.md), [React Under The Hood](react-under-the-hood.md).

## Status

This page is a legacy combined internals page.

Use these canonical pages for focused study:

- [React Fiber](fundamentals/react-fiber.md)
- [React Reconciliation](fundamentals/reconciliation-1.md)
- [Rendering Components](rendering-components.md)
- [React Under The Hood](react-under-the-hood.md)

The notes below are preserved for no-loss reference, but this page should not be the primary study path.

## 8. React Internals

## Fiber Architecture

## Reconciliation Algorithm

## Diffing Algorithm

## Scheduling

## Concurrent Rendering

## React Batching

## Automatic Batching

## Common Interview Topics

* Fiber
* Reconciliation

## React Internals

React internals explain how React updates UI behind the scenes. For interviews, you do not need to memorize every internal field, but you should understand the mental model: **state changes trigger rendering, Fiber breaks rendering work into units, reconciliation finds what changed, scheduling decides priority, and the commit phase updates the real DOM.**

---

## 1. Big Picture: What Happens When State Changes?

## Simple flow

State / props change

      ↓

React schedules an update

      ↓

React starts render phase

      ↓

Components are called again

      ↓

New React element tree is created

      ↓

Reconciliation compares old tree and new tree

      ↓

React builds work using Fiber

      ↓

Commit phase applies DOM changes

      ↓

Browser paints updated UI

## Key mental model

React update has two major phases:

### 1. Render phase

React calculates the next UI.

This phase can be paused, interrupted, restarted, or abandoned in concurrent rendering.

### 2. Commit phase

React applies final changes to the real DOM.

This phase is synchronous and should be fast.

## Interview-ready answer

When state or props change, React schedules an update, calls components to calculate the next UI, reconciles the new tree with the previous tree, and commits the required DOM updates. The render phase calculates changes, while the commit phase applies them to the DOM.

---

## 2. Fiber Architecture

## Simple meaning

Fiber is React’s internal architecture for rendering and scheduling UI updates.

A Fiber node represents a unit of work for a component or DOM element.

## Why Fiber was introduced

Before Fiber, React rendering was mostly synchronous. Once React started rendering a large tree, it could block the main thread until the work finished.

Fiber was introduced to make rendering more incremental and interruptible.

## Key mental model

Fiber allows React to split rendering work into small units.

Old model:

Render whole tree in one go

Fiber model:

Break rendering into small units of work

Prioritize important work

Pause/resume rendering when needed

Commit final result when ready

## What a Fiber node represents

A Fiber node is an internal object that represents work related to a component.

Conceptually, a Fiber node tracks things like:

* Component type
* Props
* State
* Parent fiber
* Child fiber
* Sibling fiber
* DOM node reference
* Pending updates
* Effects to apply
* Priority information

You do not need to memorize all fields for interviews. The important point is that Fiber turns the UI tree into a work tree.

## Fiber tree

React keeps internal trees to manage current UI and work-in-progress UI.

Current Fiber Tree

Represents what is currently on screen

Work-in-Progress Fiber Tree

Represents the next UI being prepared

Once the work-in-progress tree is ready, React commits it and it becomes the current tree.

## Interview-ready answer

Fiber is React’s internal rendering architecture. It represents each component or element as a unit of work, allowing React to split rendering into smaller pieces, prioritize updates, pause or resume work, and support concurrent rendering. Fiber is the foundation that makes modern React scheduling possible.

---

## 3. Reconciliation Algorithm

## Simple meaning

Reconciliation is the process of comparing the previous React tree with the new React tree to decide what changed.

## Key mental model

Reconciliation answers:

What is different between old UI description and new UI description?

## Example

function App(\{ isLoggedIn \}) \{

  return isLoggedIn ? \<Dashboard /\> : \<Login /\>;

\}

When `isLoggedIn` changes, React compares:

Old tree: \<Login /\>

New tree: \<Dashboard /\>

Because the component type changed, React replaces the old subtree.

## What React compares

React compares:

* Element type
* Props
* Children
* Keys in lists

## Same element type

\<div className="old"\>Hello\</div\>

\<div className="new"\>Hello\</div\>

Same element type: `div`

React keeps the DOM node and updates changed props.

## Different element type

\<div\>Hello\</div\>

\<span\>Hello\</span\>

Different element type: `div` vs `span`

React removes the old DOM node and creates a new one.

## Same component type

\<UserCard user=\{oldUser\} /\>

\<UserCard user=\{newUser\} /\>

Same component type: `UserCard`

React keeps the component instance/state and updates props.

## Different component type

\<UserCard /\>

\<AdminCard /\>

Different component type.

React unmounts old component and mounts the new one.

## Interview-ready answer

Reconciliation is React’s process of comparing the old React element tree with the new one. If element types are different, React replaces the subtree. If types are the same, React updates props and continues comparing children. For lists, React uses keys to match items correctly.

---

## 4. Diffing Algorithm

## Simple meaning

Diffing is the actual comparison step inside reconciliation.

It finds the difference between the old tree and the new tree.

## Why React does not use perfect tree diffing

Finding the minimum number of operations between two arbitrary trees is expensive.

React uses practical assumptions to make diffing fast enough for UI updates.

## React’s main assumptions

### 1. Different element types produce different trees

\<div /\>

\<span /\>

React does not deeply compare them. It replaces the old tree.

### 2. Keys help identify stable children

items.map((item) \=\> \<Row key=\{item.id\} item=\{item\} /\>);

Keys tell React which item is the same across renders.

## List diffing without good keys

items.map((item, index) \=\> \<Row key=\{index\} item=\{item\} /\>);

Using index as key can cause wrong component reuse when items are inserted, deleted, or reordered.

## Correct key usage

items.map((item) \=\> \<Row key=\{item.id\} item=\{item\} /\>);

Use a stable, unique key from the data.

## Key mental model

Keys are not just for avoiding warnings. They help React preserve identity.

Bad keys can cause:

* Wrong item state reuse
* Input value bugs
* Animation bugs
* Extra re-renders
* Incorrect UI behavior

## Interview-ready answer

React’s diffing algorithm compares old and new React trees using heuristics. If element types differ, React replaces the subtree. If types are same, it updates props and compares children. In lists, keys help React identify stable items. Good keys are important for correctness and performance.

---

## 5. Scheduling

## Simple meaning

Scheduling is how React decides when and in what priority to perform updates.

## Key mental model

Not all updates are equally urgent.

Typing in an input is urgent. Rendering a large filtered list is less urgent.

Urgent update:

User typing, clicking, selecting

Non-urgent update:

Filtering a huge list, switching heavy tab content

## Why scheduling matters

JavaScript runs on the main thread. If React does too much work at once, the UI can feel frozen.

Scheduling helps React:

* Prioritize urgent updates
* Delay less urgent updates
* Keep UI responsive
* Interrupt rendering work when needed
* Continue rendering later

## Example

const \[input, setInput\] \= useState("");

const \[listQuery, setListQuery\] \= useState("");

function handleChange(event) \{

  const value \= event.target.value;

  setInput(value); // urgent

  setListQuery(value); // could be expensive if it filters large list

\}

In modern React, we can mark expensive non-urgent updates as transitions.

const \[isPending, startTransition\] \= useTransition();

function handleChange(event) \{

  const value \= event.target.value;

  setInput(value);

  startTransition(() \=\> \{

    setListQuery(value);

  \});

\}

Now React can keep input responsive while rendering the expensive update with lower priority.

## Interview-ready answer

Scheduling is React’s ability to prioritize updates. User-blocking updates like typing and clicking should be handled quickly, while expensive non-urgent updates can be delayed or interrupted. Fiber enables React to split work into units and schedule them based on priority.

---

## 6. Concurrent Rendering

## Simple meaning

Concurrent rendering means React can prepare multiple UI updates without blocking the user interface.

It does not mean React runs JavaScript on multiple threads. It means React can interrupt, pause, resume, or discard rendering work.

## Key mental model

Concurrent rendering lets React work on the next UI in the background while keeping the current UI responsive.

Current UI remains visible

      ↓

React prepares next UI

      ↓

If urgent update comes, React can pause current work

      ↓

React resumes or restarts work later

      ↓

Final ready UI is committed

## Important point

Concurrent rendering affects the render phase, not the commit phase.

The commit phase is still synchronous because DOM changes must be applied consistently.

## Example with transition

const \[tab, setTab\] \= useState("home");

const \[isPending, startTransition\] \= useTransition();

function selectTab(nextTab) \{

  startTransition(() \=\> \{

    setTab(nextTab);

  \});

\}

If rendering the next tab is heavy, React can keep the UI responsive during the transition.

## What concurrent rendering helps with

* Keeping input responsive
* Heavy UI updates
* Transitions
* Suspense boundaries
* Avoiding blocked UI during large renders
* Preparing UI in the background

## Common misunderstanding

Concurrent rendering is not the same as parallel rendering.

React is still mostly running on the main JavaScript thread in the browser. The key benefit is interruptible rendering, not multi-threaded rendering.

## Interview-ready answer

Concurrent rendering allows React to prepare UI updates in an interruptible way. React can pause, resume, restart, or abandon render work based on update priority. It helps keep the UI responsive during heavy updates. It does not mean React renders on multiple threads; it means rendering work can be interrupted and scheduled.

---

## 7. React Batching

## Simple meaning

Batching means React groups multiple state updates into a single re-render.

## Why batching is useful

Without batching:

setA() \-\> render

setB() \-\> render

setC() \-\> render

With batching:

setA()

setB()

setC()

      ↓

one render

## Example

function Counter() \{

  const \[count, setCount\] \= useState(0);

  const \[flag, setFlag\] \= useState(false);

  function handleClick() \{

    setCount((prev) \=\> prev \+ 1);

    setFlag((prev) \=\> \!prev);

  \}

  return \<button onClick=\{handleClick\}\>Update\</button\>;

\}

React batches both updates and performs one render.

## Important trap

State values inside the same render are snapshots.

function handleClick() \{

  setCount(count \+ 1);

  setCount(count \+ 1);

\}

This may increment by 1 because both updates use the same `count` from the current render.

Correct:

function handleClick() \{

  setCount((prev) \=\> prev \+ 1);

  setCount((prev) \=\> prev \+ 1);

\}

This increments by 2 because each update receives the latest queued value.

## Interview-ready answer

Batching means React groups multiple state updates and processes them in a single render for better performance. Since state values are snapshots within a render, functional updates should be used when the next state depends on the previous state.

---

## 8. Automatic Batching

## Simple meaning

Automatic batching means React batches state updates automatically in more places.

In older React versions, batching mainly happened inside React event handlers.

In modern React with `createRoot`, batching also works in promises, timeouts, native events, and async callbacks.

## Example

setTimeout(() \=\> \{

  setCount((prev) \=\> prev \+ 1);

  setFlag((prev) \=\> \!prev);

\}, 1000);

In modern React, these updates are automatically batched into one render.

## Promise example

fetch("/api/user").then(() \=\> \{

  setUserLoaded(true);

  setLoading(false);

\});

These updates can also be batched.

## Opting out with `flushSync`

Sometimes we need React to apply an update immediately.

\import \{ flushSync \} from "react-dom";

flushSync(() \=\> \{

  setIsOpen(true);

\});

Use this rarely. Most of the time, automatic batching is better.

## Interview-ready answer

Automatic batching means React groups multiple state updates into one render not only in React event handlers, but also in promises, timeouts, native events, and async callbacks. This reduces unnecessary renders. If immediate DOM update is absolutely needed, `flushSync` can opt out, but it should be used rarely.

---

## 9. Render Phase vs Commit Phase

## Render phase

React calculates what the UI should look like.

In this phase:

* React calls components.
* New React elements are created.
* Reconciliation happens.
* Fiber work is prepared.
* Work may be paused or restarted in concurrent rendering.

Render phase should be pure.

Avoid:

function Component() \{

  localStorage.setItem("name", "Akhilesh"); // side effect during render

  return \<div\>Hello\</div\>;

\}

## Commit phase

React applies changes to the real DOM.

In this phase:

* DOM nodes are inserted/updated/removed.
* Refs are attached.
* Layout effects run.
* Browser can paint.
* Normal effects run after paint.

## Interview-ready answer

The render phase calculates the next UI and should be pure. It can be interrupted in concurrent rendering. The commit phase applies final DOM changes and runs effects. Commit is synchronous because React must keep the DOM consistent.

---

## Common Interview Topics / Questions

---

## 1. What is Fiber?

## Answer

Fiber is React’s internal architecture for rendering and scheduling.

It represents each component or element as a unit of work.

## Key points

* Breaks rendering into small units.
* Enables interruptible rendering.
* Supports scheduling and prioritization.
* Maintains current and work-in-progress trees.
* Powers concurrent rendering.
* Separates render work from commit work.

## Interview-ready answer

Fiber is React’s internal rendering architecture. It converts the component tree into units of work so React can pause, resume, prioritize, or discard rendering work. This makes modern features like scheduling and concurrent rendering possible.

---

## 2. What is Reconciliation?

## Answer

Reconciliation is React’s process of comparing the old React element tree with the new one and deciding what needs to change in the UI.

## Example

\<div className="old"\>Hello\</div\>

\<div className="new"\>Hello\</div\>

Same type, different prop. React updates the prop.

\<div\>Hello\</div\>

\<span\>Hello\</span\>

Different type. React replaces the element.

## Interview-ready answer

Reconciliation is the process where React compares the previous tree and the new tree after a state or props update. It decides whether to update, reuse, mount, or unmount parts of the tree. It uses element type and keys to make this process efficient.

---

## 3. Reconciliation vs Diffing

## Simple answer

Diffing is the comparison. Reconciliation is the full process of deciding and preparing updates.

| Concept | Meaning |
| ----- | ----- |
| Diffing | Compare old tree and new tree |
| Reconciliation | Use diff result to decide how to update UI |
| Commit | Apply final changes to DOM |

## Interview-ready answer

Diffing is the comparison between the old and new React trees. Reconciliation is the broader process where React uses that comparison to decide what should be reused, updated, mounted, or removed. Commit is when React applies those changes to the real DOM.

---

## 4. Why are keys important in React?

## Answer

Keys help React identify which list items are stable across renders.

users.map((user) \=\> \<UserRow key=\{user.id\} user=\{user\} /\>);

## Bad example

users.map((user, index) \=\> \<UserRow key=\{index\} user=\{user\} /\>);

Index keys are risky when list order can change.

## Interview-ready answer

Keys help React match children between renders. A stable key lets React preserve the correct component state and update only changed items. Bad keys, especially array indexes in dynamic lists, can cause wrong state reuse, input bugs, and unnecessary DOM work.

---

## 5. What is Concurrent Rendering?

## Answer

Concurrent rendering means React can prepare a new UI in an interruptible way without blocking urgent updates.

## Interview-ready answer

Concurrent rendering allows React to interrupt, pause, resume, or abandon render work based on priority. It helps keep the UI responsive during heavy updates. It is not multi-threading; it is interruptible rendering enabled by Fiber and scheduling.

---

## 6. What is React Scheduling?

## Answer

Scheduling is how React decides the priority and timing of updates.

## Interview-ready answer

React scheduling decides which updates are urgent and which can wait. For example, typing in an input is urgent, while rendering a huge filtered list can be treated as non-urgent using `startTransition`. Scheduling helps React keep the UI responsive.

---

## 7. What is Automatic Batching?

## Answer

Automatic batching means React groups multiple state updates into a single render, even across async callbacks like promises and timers.

setTimeout(() \=\> \{

  setCount((prev) \=\> prev \+ 1);

  setFlag((prev) \=\> \!prev);

\}, 1000);

## Interview-ready answer

Automatic batching reduces unnecessary renders by grouping multiple state updates into one render. In modern React, batching works not only in React event handlers but also in promises, timers, native events, and async callbacks.

---

## 8. What happens when `setState` is called?

## Answer

setState called

   ↓

React queues update

   ↓

React schedules render

   ↓

Component is called again

   ↓

New React elements are created

   ↓

Reconciliation compares old and new trees

   ↓

Commit phase updates DOM if needed

## Interview-ready answer

When `setState` is called, React queues the update and schedules a render. The component runs again with the new state, React creates a new element tree, reconciles it with the previous tree, and commits the necessary DOM changes.

---

## 9. Is Virtual DOM the same as Fiber?

## Answer

No.

Virtual DOM is the React element tree that describes the UI.

Fiber is React’s internal architecture and data structure used to manage rendering work.

## Simple comparison

| Concept | Meaning |
| ----- | ----- |
| Virtual DOM / React element tree | Description of UI |
| Fiber tree | Internal work structure used by React |
| Reconciliation | Comparing old and new UI descriptions |
| Commit | Applying changes to real DOM |

## Interview-ready answer

Virtual DOM and Fiber are related but not the same. The Virtual DOM is the UI description created from React elements. Fiber is React’s internal work architecture that tracks components, updates, effects, and priorities so React can render and schedule efficiently.

---

## Quick Revision Summary

| Topic | Key point |
| ----- | ----- |
| Fiber | Internal architecture for rendering work |
| Fiber node | Unit of work for component/element |
| Current tree | UI currently on screen |
| Work-in-progress tree | Next UI being prepared |
| Reconciliation | Compares old and new trees |
| Diffing | Finds differences between trees |
| Different type | Replace subtree |
| Same type | Reuse and update props/children |
| Keys | Preserve identity in lists |
| Scheduling | Prioritizes updates |
| Concurrent rendering | Interruptible rendering |
| Batching | Groups multiple state updates |
| Automatic batching | Batches updates across async boundaries |
| Render phase | Calculate next UI |
| Commit phase | Apply DOM changes |

---

## Final Interview-Ready Combined Answer

React Fiber is the internal architecture that represents each component or element as a unit of work. It allows React to split rendering into small pieces, prioritize updates, pause and resume work, and support concurrent rendering. Reconciliation is the process of comparing the old React tree with the new one to decide what changed. Diffing is the comparison step inside reconciliation. React uses practical heuristics: different element types create different trees, and keys help identify stable children in lists. Scheduling decides which updates are urgent and which can wait. Batching groups multiple state updates into one render, and automatic batching extends this behavior across promises, timers, native events, and async callbacks. In interviews, the strongest mental model is: state update → schedule work → render phase calculates UI → reconciliation/diffing finds changes → commit phase updates the DOM.

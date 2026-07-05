---
title: React Reconciliation
sidebar_position: 2
---

# React Reconciliation

Related canonical pages: [React Fiber](react-fiber.md), [Rendering Components](../rendering-components.md), [React Performance](../../important/performance/react-performance.md).

## React Reconciliation

React Reconciliation is the internal process React uses to compare the **previous React tree** with the **new React tree** after a component’s state or props change.

Based on this comparison, React decides what changes are required and then updates the real browser DOM during the **commit phase**.

Instead of destroying and rebuilding the entire DOM every time something changes, React re-renders components in memory, compares the old and new React trees, and updates only the parts of the real DOM that actually need to change.

**A very important point:**

* Re-rendering and DOM update are not the same thing.  
* A component may re-render, but React may still decide that no real DOM change is needed.

---

## Why Reconciliation Is Needed

Updating the real DOM is expensive compared to working with JavaScript objects.

If React recreated the full DOM tree on every state change, large applications would become slow.

So React uses reconciliation to answer:

* What changed in the UI?  
* Can React reuse the existing DOM node or component?  
* Should React update props, text, or children?  
* Should React preserve or reset component state?  
* Should React add, remove, or move list items?

---

## The Core Problem

Comparing two trees perfectly is expensive.

A generic tree comparison algorithm can have around **O(n³)** complexity, where `n` is the number of elements.

For a large UI, this would be too slow.

So React uses an **O(n) heuristic diffing algorithm** based on two main assumptions:

1. Elements of different types produce different trees.  
2. Developers can use stable `key` props to help React identify children across renders.

React’s reconciliation is efficient, but it is not guaranteed to always produce the mathematically minimum number of DOM operations. It produces a practical and efficient update plan based on these assumptions.

---

## How React’s Diffing Algorithm Works

React compares the old React tree and the new React tree from top to bottom.

It mainly follows these rules.

---

## 1. Different Element Types

If the element type changes, React destroys the old subtree and creates a new one.

Example:

Before:

\<div\>Hello\</div\>

After:

\<span\>Hello\</span\>

Here, the type changed from `div` to `span`.

React does not reuse the old `div`.

It removes the old DOM node and creates a new `span`.

Same idea applies to components.

Before:

\<UserProfile /\>

After:

\<AdminProfile /\>

React sees different component types.

So it unmounts `UserProfile` and mounts `AdminProfile`.

Result:

Old component is unmounted  
Cleanup effects run  
New component is mounted  
Old local state is lost  
---

## 2. Same DOM Element Type

If the DOM element type is the same, React reuses the existing DOM node and only updates the changed attributes.

Example:

// Before  
\<div className="before" title="Greeting" /\>

// After  
\<div className="after" title="Greeting" /\>

The type is still `div`.

React keeps the same DOM node and only updates:

className: "before" → "after"

The `title` is unchanged, so React does not touch it.

---

## 3. Same Component Type

If the component type is the same, React preserves the component identity and keeps its state.

Example:

function UserCard(\{ name \}) \{  
 return \<h2\>\{name\}\</h2\>;  
\}

// Before  
\<UserCard name="Akhilesh" /\>

// After  
\<UserCard name="Rahul" /\>

The component type is still `UserCard`.

React reuses the same component instance, passes new props, and re-renders its internal tree.

Result:

Component is reused  
Props are updated  
State is preserved  
Component re-renders  
---

## The Role of Keys in Lists

Keys are very important when React reconciles lists.

Without stable keys, React compares list items mainly by their position.

This can cause problems when items are inserted, deleted, sorted, or reordered.

Bad example:

items.map((item, index) \=\> (  
 \<li key=\{index\}\>\{item.text\}\</li\>  
));

Using index as key can cause wrong state preservation.

For example:

Wrong input value  
Wrong checkbox selected  
Wrong expanded row  
Wrong selected item  
Wrong local state attached to another row

Better example:

items.map((item) \=\> (  
 \<li key=\{item.id\}\>\{item.text\}\</li\>  
));

A stable unique key helps React understand that the same item still exists, even if its position changes.

Example:

Before:  
key=1 → Akhilesh  
key=2 → Rahul

After sorting:  
key=2 → Rahul  
key=1 → Akhilesh

React can correctly match the old and new items using keys.

Important point:

Keys do not automatically stop re-renders.

Keys help React preserve correct identity during reconciliation. They help React avoid incorrect reuse, unnecessary remounts, and wrong local state preservation.

---

## Why Index as Key Is Risky

Using index as key is risky when the list is dynamic.

Example:

Initial list:  
index 0 → Akhilesh  
index 1 → Rahul

After inserting Neha at the top:  
index 0 → Neha  
index 1 → Akhilesh  
index 2 → Rahul

React may reuse the old state based on index.

So the state that belonged to Akhilesh may now get attached to Neha.

This is why index keys are dangerous for dynamic lists.

Index as key is acceptable only when:

The list is static  
Items are never reordered  
Items are never inserted or removed from the middle  
Items do not have local state  
---

## State Preservation and State Reset

React preserves state when the component stays in the same position with the same type.

Example:

function App(\{ isAdmin \}) \{  
 return (  
   \<div\>  
     \{isAdmin ? \<UserForm /\> : \<UserForm /\>\}  
   \</div\>  
 );  
\}

Both branches render the same component type: `UserForm`.

So React preserves the state.

But if the component type changes:

function App(\{ isAdmin \}) \{  
 return (  
   \<div\>  
     \{isAdmin ? \<AdminForm /\> : \<UserForm /\>\}  
   \</div\>  
 );  
\}

React sees different component types.

So it unmounts one and mounts the other.

State is reset.

---

## Resetting State Using Key

Sometimes we intentionally want React to reset component state.

Example:

\<UserForm key=\{userId\} userId=\{userId\} /\>

When `userId` changes, the `key` changes.

React treats it as a new component.

Result:

Old UserForm is unmounted  
New UserForm is mounted  
Form state is reset

This is useful in:

Edit forms  
Profile pages  
Tabs  
Modals  
Detail pages  
Multi-step flows

Example:

function UserDetails(\{ userId \}) \{  
 return \<UserForm key=\{userId\} userId=\{userId\} /\>;  
\}

If the user switches from user `1` to user `2`, React creates a fresh form instead of keeping the old form state.

---

## Reconciliation vs Virtual DOM

Virtual DOM and reconciliation are related, but they are not the same thing.

The Virtual DOM is the lightweight JavaScript representation of the UI.

Example JSX:

\<h1\>Hello\</h1\>

Conceptually, React represents it as an object:

\{  
 type: "h1",  
 props: \{  
   children: "Hello"  
 \}  
\}

Reconciliation is the process of comparing the previous React tree with the new React tree.

Simple difference:

Virtual DOM \= UI representation  
Reconciliation \= comparison process  
---

## Reconciliation vs Diffing

These two terms are closely related but not exactly the same.

Reconciliation \= Overall process of updating the UI efficiently

Diffing \= The comparison algorithm used during reconciliation

So, diffing is part of reconciliation.

In interviews, you can say:

Reconciliation is the overall process, and diffing is the comparison step inside it.

---

## Where Reconciliation Fits in React Rendering

The flow looks like this:

State or props change  
      ↓  
React calls the component again  
      ↓  
Component returns new JSX  
      ↓  
JSX becomes a new React element tree  
      ↓  
React compares old tree and new tree  
      ↓  
React decides what changed  
      ↓  
React updates the real DOM

The step where React compares the old tree and new tree is called **Reconciliation**.

---

## Render Phase vs Commit Phase

React updates happen in two major phases.

---

## 1. Render Phase

In the render phase, React:

* Calls component functions  
* Creates the new React tree  
* Compares it with the previous tree  
* Figures out what changed

**Reconciliation mainly happens during the render phase.**

The render phase can be paused, restarted, or abandoned in modern React. That is why render logic should be pure and should not cause side effects.

Bad example:

function UserList() \{  
 localStorage.setItem("rendered", "true"); // avoid side effect during render

 return \<div\>User List\</div\>;  
\}

Better example:

function UserList() \{  
 React.useEffect(() \=\> \{  
   localStorage.setItem("rendered", "true");  
 \}, \[\]);

 return \<div\>User List\</div\>;  
\}  
---

## 2. Commit Phase

In the commit phase, React:

Applies DOM changes  
Updates refs  
Runs layout effects  
Runs effects after paint

The commit phase is synchronous because the real DOM must be updated consistently.

Simple flow:

State/props change  
     ↓  
Component re-render  
     ↓  
Reconciliation  
     ↓  
Commit DOM updates  
---

## React Fiber

React Fiber is the modern internal architecture behind React’s rendering and reconciliation system.

Before Fiber, React rendering was mostly synchronous. A large update could block the main thread until the whole tree was processed.

Fiber allows React to split rendering work into smaller units.

This helps React:

* Pause rendering work  
* Resume rendering work  
* Prioritize urgent updates  
* Discard outdated rendering work  
* Keep the UI responsive  
* Support concurrent rendering

Example:

Typing in an input should be treated as urgent.

Rendering a large filtered list can be treated as lower priority.

Fiber helps React support features like:

* Concurrent rendering  
* Transitions  
* Interruptible rendering  
* Priority scheduling  
* Better responsiveness

---

## Reconciliation and Fiber

React Fiber is the internal architecture that performs reconciliation.

Before Fiber, reconciliation was synchronous and could not be interrupted.

With Fiber, React can split reconciliation work into smaller units, pause it, resume it, prioritize it, or discard old work.

So the relationship is:

Fiber \= Internal engine / architecture

Reconciliation \= Process of comparing old and new UI trees

Diffing \= Algorithm used to find what changed

---

## Practical Example

function Counter() \{  
 const \[count, setCount\] \= React.useState(0);

 return (  
   \<div\>  
     \<h1\>Counter\</h1\>  
     \<p\>\{count\}\</p\>  
     \<button onClick=\{() \=\> setCount(count \+ 1)\}\>  
       Increment  
     \</button\>  
   \</div\>  
 );  
\}

When the button is clicked:

1\. setCount updates state.  
2\. Counter re-renders.  
3\. React creates a new React tree.  
4\. React compares old tree and new tree.  
5\. h1 is same.  
6\. button is same.  
7\. p text changed.  
8\. React updates only the text inside p.

React does not recreate the whole DOM.

---

## Reconciliation and Component Re-render

When a parent component re-renders, React also calls its child components by default.

But calling a component again does not always mean the real DOM will change.

Example:

function App() \{  
  const \[count, setCount\] \= useState(0);

  return \<Title text="Hello" /\>;  
\}

When `count` changes, `App` re-renders and `Title` may also be called again.

But if `Title` returns the same JSX as before, React may not update the real DOM.

Important mental model:

Re-render means React called the component again.

DOM update means React found an actual change and committed it.

These are not always the same thing.

---

## Real-World Example: Hotel Search Page

Imagine an Agoda-like hotel search page.

function HotelSearchPage() \{  
 const \[filters, setFilters\] \= React.useState(\{\});  
 const \[hotels, setHotels\] \= React.useState(\[\]);

 return (  
   \<div\>  
     \<FilterPanel filters=\{filters\} onChange=\{setFilters\} /\>  
     \<HotelList hotels=\{hotels\} /\>  
   \</div\>  
 );  
\}

When the user changes a filter:

1\. State changes.  
2\. HotelSearchPage re-renders.  
3\. React creates a new React tree.  
4\. React compares old and new tree.  
5\. FilterPanel props changed.  
6\. HotelList props may change if hotel data changed.  
7\. React commits only the required DOM updates.

For hotel cards, stable keys are important:

\{hotels.map((hotel) \=\> (  
 \<HotelCard key=\{hotel.id\} hotel=\{hotel\} /\>  
))\}

If the user sorts by price, rating, or distance, React can still identify each hotel correctly using `hotel.id`.

Bad version:

\{hotels.map((hotel, index) \=\> (  
 \<HotelCard key=\{index\} hotel=\{hotel\} /\>  
))\}

This can cause wrong state preservation when the order changes.

For example, if a hotel card has local state like expanded details, selected room, or image carousel position, that state may get attached to the wrong hotel.

---

## Practical Optimization Tips

Use stable keys in lists. Avoid `Math.random()`, `Date.now()`, or array index keys for dynamic lists.

Use `React.memo` when a child component receives the same props often and re-rendering it is expensive.

Use `useMemo` for expensive calculations.

Use `useCallback` when passing callback functions to memoized child components.

Keep state close to where it is needed, so unrelated parts of the tree do not re-render unnecessarily.

Avoid creating new object and array references unnecessarily when passing props to memoized children.

Use virtualization for very large lists instead of rendering hundreds or thousands of DOM nodes at once.

---

## Common Interview Traps

### Trap 1: Saying React updates the whole DOM

Incorrect:

React updates the entire DOM on every state change.

Correct:

React may re-render components in memory, but it updates only the necessary parts of the real DOM.  
---

### Trap 2: Saying Virtual DOM itself makes React fast

The Virtual DOM helps, but the full performance story includes:

* Reconciliation  
* Efficient diffing  
* Batched updates  
* Fiber scheduling  
* Memoization where needed  
* Stable keys  
* Avoiding unnecessary renders

Virtual DOM comparison also has a cost.

---

### Trap 3: Saying keys prevent re-rendering

Keys do not directly prevent re-rendering.

Keys help React identify items correctly during list reconciliation.

For preventing unnecessary child re-renders, tools like `React.memo`, `useMemo`, and `useCallback` may help, depending on the case.

---

### Trap 4: Confusing render phase and commit phase

**Render phase:** React calculates what changed. Reconciliation mainly happens during the render phase.

**Commit phase:** React applies changes to the real DOM.

---

## Compact Interview-Ready Answer

React Reconciliation is the process React uses to compare the previous React tree with the new React tree after state or props change. React uses an O(n) heuristic diffing algorithm instead of an expensive generic tree comparison. If element types are different, React replaces the subtree. If element types are the same, React reuses the existing DOM node or component instance and updates only the changed props or children. For lists, React uses keys to preserve correct item identity across insertions, deletions, and reordering. Reconciliation happens during the render phase, and actual DOM updates happen during the commit phase. React Fiber improves this process by allowing rendering work to be split, prioritized, paused, resumed, or discarded.

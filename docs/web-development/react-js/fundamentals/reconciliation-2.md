---
title: Reconciliation 2
sidebar_position: 3
---

# Reconciliation 2

# **React Reconciliation**

React Reconciliation is the process React uses to compare the previous UI tree with the new UI tree and decide what needs to change in the real DOM.

In simple words:

Reconciliation is React’s “difference finding” process.

When state or props change, React does not directly update the whole DOM. Instead, React creates a new React element tree, compares it with the previous tree, finds the minimum required changes, and then updates only the necessary parts of the real DOM.

---

## **Why Reconciliation Is Needed**

Updating the real DOM is expensive compared to working with JavaScript objects in memory.

If React updated the entire DOM every time something changed, applications would become slow.

Example:

function Counter() \{  
  const \[count, setCount\] \= useState(0);

  return \<h1\>Count: \{count\}\</h1\>;  
\}

When `count` changes from `0` to `1`, React does not recreate the whole page.

It compares the old UI:

\<h1\>Count: 0\</h1\>

with the new UI:

\<h1\>Count: 1\</h1\>

Then React updates only the changed text inside the `h1`.

That comparison process is called **reconciliation**.

---

## **Where Reconciliation Fits in React Rendering**

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

## **Reconciliation vs Diffing**

These two terms are closely related but not exactly the same.

Reconciliation \= Overall process of updating the UI efficiently

Diffing \= The comparison algorithm used during reconciliation

So, diffing is part of reconciliation.

In interviews, you can say:

Reconciliation is the overall process, and diffing is the comparison step inside it.

---

## **What React Compares**

React compares the previous React element tree with the new React element tree.

React mainly checks:

* Element type  
* Props  
* State  
* Children  
* Keys in lists

Based on this comparison, React decides whether it should:

* Reuse an existing DOM node  
* Update an existing DOM node  
* Create a new DOM node  
* Remove an old DOM node  
* Re-render a component  
* Preserve or reset component state

---

## **Important Rule 1: Different Element Type Means Recreate**

If the element type changes, React destroys the old tree and creates a new one.

Example:

// Old  
\<div\>  
  \<Counter /\>  
\</div\>

// New  
\<section\>  
  \<Counter /\>  
\</section\>

Here, the root element changed from `div` to `section`.

React treats this as a different tree. It removes the old `div` tree and creates a new `section` tree.

This can also reset component state inside that tree.

---

## **Important Rule 2: Same Element Type Means Reuse**

If the element type is the same, React reuses the existing DOM node and only updates the changed attributes or children.

Example:

// Old  
\<button className="primary"\>Save\</button\>

// New  
\<button className="disabled"\>Save\</button\>

The element type is still `button`.

React does not recreate the button. It only updates the `className`.

---

## **Important Rule 3: Same Component Type Means Preserve State**

If the component type stays the same, React keeps the component instance/state and updates its props.

Example:

\<Profile userId=\{1\} /\>  
\<Profile userId=\{2\} /\>

The component type is still `Profile`.

React reuses the same component and passes the new `userId` prop.

So the component’s local state is preserved unless React is forced to remount it.

---

## **Important Rule 4: Keys Help React Identify List Items**

Keys are very important in reconciliation.

React uses keys to identify which items changed, were added, removed, or moved.

Good example:

users.map(user \=\> (  
  \<UserCard key=\{user.id\} user=\{user\} /\>  
));

Here, `user.id` is stable and unique.

React can correctly match old and new items.

Bad example:

users.map((user, index) \=\> (  
  \<UserCard key=\{index\} user=\{user\} /\>  
));

Using index as key can cause bugs when items are added, removed, or reordered.

React may reuse the wrong component state because the index changes.

---

## **Example: Why Index Key Can Be Dangerous**

Imagine this list:

0 → Akhil  
1 → Rahul  
2 → Priya

Now a new item is added at the top:

0 → Neha  
1 → Akhil  
2 → Rahul  
3 → Priya

If index is used as key, React thinks:

Key 0 is same item  
Key 1 is same item  
Key 2 is same item

But the actual items shifted.

This can cause wrong input values, wrong selected items, or wrong local state in list rows.

That is why stable IDs are preferred as keys.

---

## **Reconciliation and Component Re-render**

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

## **Reconciliation and Fiber**

React Fiber is the internal architecture that performs reconciliation.

Before Fiber, reconciliation was synchronous and could not be interrupted.

With Fiber, React can split reconciliation work into smaller units, pause it, resume it, prioritize it, or discard old work.

So the relationship is:

Fiber \= Internal engine / architecture

Reconciliation \= Process of comparing old and new UI trees

Diffing \= Algorithm used to find what changed

---

## **Simple Interview Answer**

React Reconciliation is the process React uses to update the UI efficiently.

When state or props change, React calls the component again and creates a new React element tree. Then React compares this new tree with the previous tree to find what changed. This comparison process helps React update only the necessary parts of the real DOM instead of recreating the whole UI.

React uses a diffing algorithm during reconciliation. It compares element types, props, children, and keys.

If the element type changes, React recreates that part of the tree. If the element type is the same, React reuses the existing DOM node and updates only changed attributes or children. For lists, React uses keys to correctly identify items between renders.

In modern React, reconciliation is handled by the Fiber architecture, which allows React to split rendering work into smaller units and prioritize urgent updates.

So, reconciliation is the reason React can keep the UI in sync with state changes efficiently.

---
title: React Fiber
sidebar_position: 6
---

# React Fiber

# **React Fiberæ-**

React Fiber is the internal reconciliation engine introduced in React 16\. It completely changed how React manages UI updates internally.

The main purpose of Fiber is to enable **incremental rendering**. This means React can break large rendering work into smaller units, prioritize important updates, pause less important work, and continue later without blocking the browser for too long.

In simple words:

React Fiber helps React update the UI in a smarter, more controlled, and non-blocking way.

---

## **The Problem Fiber Solved**

Before React Fiber, React used the old **Stack Reconciler**.

The old reconciler worked synchronously, similar to a normal JavaScript call stack. Once React started rendering a component tree, it had to finish the entire work before the browser could handle anything else.

This created a problem for large applications.

For example, if a big component tree was updating, React could block the browser’s main thread. During that time, user interactions like typing, clicking, scrolling, or animations could feel slow, laggy, or frozen.

So the main problem was:

React rendering work was not interruptible.

React needed a way to split rendering work into smaller pieces and decide which work was urgent and which work could wait. Fiber solved this problem.

---

## **Key Capabilities of React Fiber**

React Fiber gives React more control over rendering work.

### **1\. Pause and Resume Work**

React can pause rendering work in the middle, allow the browser to handle urgent work like user input or painting, and then continue rendering later.

Example:

If the user is typing in an input while a large list is being rendered, React can prioritize the typing experience instead of blocking the UI.

---

### **2\. Task Prioritization**

React can assign different priorities to different updates.

High-priority updates:

* Typing in an input  
* Clicking a button  
* Hover interactions  
* Visible UI updates

Low-priority updates:

* Rendering a large background list  
* Updating offscreen UI  
* Non-urgent transitions

This helps React keep the application responsive.

---

### **3\. Discard and Restart Work**

If React is working on an update and a newer, more important update comes in, React can discard the old unfinished work and start again with the latest state.

Example:

If React is rendering search results for `"rea"` and the user quickly types `"react"`, React does not need to finish rendering the old `"rea"` results. It can abandon that work and render the latest result.

---

## **How Fiber Works Internally**

React Fiber introduced a new internal data structure and a new rendering model.

---

## **1\. Fiber Node Data Structure**

A **Fiber** is a plain JavaScript object that represents a unit of work in React.

React creates Fiber nodes to represent work for components, elements, and DOM nodes in the UI tree.

Each Fiber node contains useful information like:

* Component type  
* Props  
* State  
* Parent reference  
* Child reference  
* Sibling reference  
* Work priority  
* Effects to apply later

Unlike the old recursive stack-based approach, Fiber uses a linked structure.

Each Fiber node has pointers such as:

child    → first child  
sibling  → next sibling  
return   → parent

This structure allows React to manually walk through the tree, pause at a node, resume later, skip work, or restart work if needed.

That is why Fiber is sometimes described as a **custom virtual stack frame system** built by React.

---

## **2\. Two-Phase Rendering Cycle**

React Fiber works in two major phases:

State/props change  
      ↓  
Render Phase  
      ↓  
Commit Phase  
      ↓  
Browser paints updated UI

---

## **Render Phase**

The render phase is where React figures out what needs to change.

In this phase, React:

* Calls components  
* Creates a new work-in-progress Fiber tree  
* Compares old Fiber tree with the new Fiber tree  
* Performs reconciliation and diffing  
* Decides what DOM changes are needed

This phase happens in memory and does not directly update the real DOM.

Because the user cannot see this work yet, React can pause it, resume it, prioritize it, or discard it.

That is why the render phase is:

Asynchronous and interruptible in modern React.

---

## **Commit Phase**

The commit phase is where React applies the final changes to the real DOM.

Once React has finished calculating all required changes, it commits those changes in one go.

In this phase, React:

* Updates the real DOM  
* Runs layout effects  
* Updates refs  
* Makes the changes visible to the user

The commit phase must be fast and consistent, so React does not interrupt it.

That is why the commit phase is:

Synchronous and non-interruptible.

---

## **Render Phase vs Commit Phase**

Render Phase  
\- Happens in memory  
\- Builds work-in-progress tree  
\- Performs reconciliation and diffing  
\- Can be paused  
\- Can be restarted  
\- Can be discarded

Commit Phase  
\- Updates the real DOM  
\- Runs final side effects  
\- Cannot be paused  
\- Must complete once started

---

## **Double Buffering in React Fiber**

React Fiber uses a concept similar to **double buffering**.

React keeps two trees:

Current Tree  
The tree currently shown on the screen

Work-in-Progress Tree  
The new tree React is preparing in memory

React prepares the work-in-progress tree without affecting the current UI.

Once the work is complete, React commits the changes and the work-in-progress tree becomes the new current tree.

This helps React prepare updates safely before showing them to the user.

---

## **User-Facing Features Enabled by Fiber**

As a developer, we do not directly use Fiber. It is an internal React engine.

But many modern React features are built on top of Fiber.

### **1\. Concurrent Rendering**

Fiber allows React to prepare multiple rendering tasks with different priorities.

It does not mean React runs everything truly in parallel. Instead, React can pause, resume, interrupt, and prioritize rendering work.

---

### **2\. Suspense**

Suspense allows React to pause rendering while waiting for something, such as lazy-loaded components or async data.

Example:

\<Suspense fallback=\{\<Loader /\>\}\>  
  \<LazyComponent /\>  
\</Suspense\>

Fiber makes this kind of rendering control possible.

---

### **3\. Transitions**

`useTransition` allows us to mark some updates as non-urgent.

Example:

Typing in an input should be urgent, but rendering a large filtered list can be treated as less urgent.

const \[isPending, startTransition\] \= useTransition();

startTransition(() \=\> \{  
  setSearchResults(filteredResults);  
\});

This keeps the UI responsive.

---

### **4\. Error Boundaries**

Error Boundaries allow React to catch rendering errors in part of the component tree instead of crashing the entire application.

Fiber improved React’s ability to recover from rendering errors and safely update the remaining UI.

---

## **Simple Interview Answer**

React Fiber is React’s internal reconciliation engine introduced in React 16\. It replaced the old synchronous stack reconciler.

Before Fiber, once React started rendering a component tree, it had to finish the whole work without interruption. This could block the browser’s main thread and make large applications feel slow.

Fiber solves this by breaking rendering work into small units. React can pause, resume, prioritize, discard, or restart rendering work based on urgency.

Internally, Fiber represents the UI as a linked tree of Fiber nodes. React works in two phases: the render phase and the commit phase.

The render phase happens in memory, where React builds the work-in-progress tree and figures out what changed. This phase can be interrupted.

The commit phase applies the final changes to the real DOM. This phase is synchronous and cannot be interrupted.

Fiber is the foundation for modern React features like concurrent rendering, Suspense, transitions, and better error handling.

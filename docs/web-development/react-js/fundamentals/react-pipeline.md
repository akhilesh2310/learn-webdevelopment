---
title: React Pipeline
sidebar_position: 4
---

# React Pipeline

Think of this as the complete React pipeline:

Your state changes  
     ↓  
React schedules an update  
     ↓  
React Fiber starts work  
     ↓  
React calls your component again  
     ↓  
Component returns new JSX  
     ↓  
JSX becomes React elements / React tree  
     ↓  
React Fiber builds/updates the Fiber tree  
     ↓  
Reconciliation happens  
     ↓  
Diffing algorithm compares old tree and new tree  
     ↓  
React decides what changed  
     ↓  
React prepares DOM changes  
     ↓  
Commit phase starts  
     ↓  
React updates the real DOM  
     ↓  
Browser paints updated screen

Now let’s fit each term clearly.

---

## 1. Your state changes

Example:

setCount(count \+ 1);

This is the **trigger**.

React understands:

Some data changed.  
UI may need to change.  
Schedule an update.

Important: React does not immediately update the DOM here.

It first schedules work.

Related term:

State update  
Trigger  
Scheduling  
---

## 2. React schedules an update

After `setCount`, React creates an update request internally.

This update is added to React’s internal queue.

React decides:

Which component needs work?  
How urgent is this update?  
Can this update be batched with others?

Example:

setName("Akhilesh");  
setAge(34);  
setCity("Bengaluru");

React may batch these updates together instead of rendering three times separately.

Related terms:

Update scheduling  
Batching  
Priority  
Fiber lanes

At this point, **React Fiber** starts becoming important.

---

## 3. React Fiber starts work

React Fiber is React’s internal engine for managing rendering work.

Fiber helps React:

* Break rendering work into small units  
* Prioritize urgent updates  
* Pause work  
* Resume work  
* Discard outdated work  
* Keep UI responsive

Simple mental model:

Fiber \= React’s internal work manager

So after state changes, Fiber decides how to process the update.

Related term:

React Fiber  
Scheduler  
Lanes / priorities  
Work units

Example:

Typing in input \= high priority  
Rendering large filtered table \= lower priority

Fiber helps React avoid blocking the browser for too long.

---

## 4. React calls your component again

Now React enters the **render phase**.

React calls your component function again.

Example:

function Counter() \{  
 const \[count, setCount\] \= React.useState(0);

 return \<h1\>Count: \{count\}\</h1\>;  
\}

When count changes, React calls:

Counter()

again.

This is called a **re-render**.

Important:

Re-render \= component function runs again

It does not mean DOM changed.

Related terms:

Render phase  
Re-render  
Component execution  
Pure rendering  
---

## 5. Component returns new JSX

Your component returns JSX.

Example:

\<h1\>Count: \{count\}\</h1\>

If old count was `0`, old JSX was conceptually:

\<h1\>Count: 0\</h1\>

After state change, new JSX becomes:

\<h1\>Count: 1\</h1\>

JSX is just syntax.

It is not the real DOM.

Related term:

JSX  
---

## 6. JSX becomes React elements

JSX gets converted into React elements.

This:

\<h1\>Count: 1\</h1\>

conceptually becomes:

\{  
 type: "h1",  
 props: \{  
   children: "Count: 1"  
 \}  
\}

A React element is a plain JavaScript object describing the UI.

Related terms:

React element  
Virtual DOM  
React element tree

Important mental model:

JSX \= syntax you write  
React element \= object created from JSX  
Virtual DOM \= tree of React elements  
---

## 7. React creates a new React tree

After calling components, React gets a new tree.

Old tree:

div  
├── h1: Counter  
├── p: 0  
└── button: Increment

New tree:

div  
├── h1: Counter  
├── p: 1  
└── button: Increment

This new tree represents the UI React wants now.

Related terms:

Virtual DOM  
React tree  
React element tree  
---

## 8. React Fiber builds/updates the Fiber tree

This is where many people get confused.

React elements and Fiber are not exactly the same.

React elements are lightweight UI descriptions.

Fiber nodes are internal objects React uses to track work.

A Fiber node stores information like:

Component type  
Props  
State  
Parent  
Child  
Sibling  
DOM node reference  
Pending work  
Effects  
Priority  
Old fiber reference

Simple difference:

React element tree \= what the UI should look like  
Fiber tree \= how React tracks and processes work internally

React uses the new React elements to update the Fiber tree.

Related terms:

React Fiber  
Fiber tree  
Work-in-progress tree  
Current tree  
---

## 9. Reconciliation happens

Now React compares:

Previous tree  
New tree

This process is called **reconciliation**.

Reconciliation answers:

Can I reuse this component?  
Can I reuse this DOM node?  
Should I update props?  
Should I update text?  
Should I remove something?  
Should I add something?  
Should I preserve state?  
Should I reset state?

Related term:

Reconciliation

Important:

Reconciliation is the overall comparison process.  
---

## 10. Diffing algorithm compares old and new tree

Inside reconciliation, React uses a **diffing algorithm**.

Diffing means finding the difference between old tree and new tree.

React follows practical rules.

## Rule 1: Different type means replace

Old:

\<div\>Hello\</div\>

New:

\<span\>Hello\</span\>

React sees:

div changed to span

Decision:

Remove div  
Create span

## Rule 2: Same DOM type means reuse

Old:

\<button className="primary"\>Save\</button\>

New:

\<button className="secondary"\>Save\</button\>

React sees:

button is same  
className changed

Decision:

Reuse button  
Update className only

## Rule 3: Same component type means preserve state

Old:

\<UserCard name="Akhilesh" /\>

New:

\<UserCard name="Rahul" /\>

React sees:

UserCard is same component type

Decision:

Reuse component  
Update props  
Preserve state  
Re-render child tree

## Rule 4: Keys help with lists

Old:

key=1 Akhilesh  
key=2 Rahul

New:

key=2 Rahul  
key=1 Akhilesh

React understands:

Same items, only order changed

Without keys, React mostly compares by position, which can cause wrong state preservation.

Related term:

Diffing algorithm

Simple difference:

Reconciliation \= full process  
Diffing \= comparison rules used inside reconciliation  
---

## 11. React decides what changed

After diffing, React knows the required changes.

Example:

Old tree:

p: Count 0

New tree:

p: Count 1

React decides:

Only text changed

It does not update the whole DOM.

It prepares an internal list of changes.

Related terms:

Effect list  
DOM mutations  
Update flags

For interview, you do not need to go too deep into internal flags unless asked.

The simple idea is:

React prepares what needs to be committed to the DOM.  
---

## 12. Render phase completes

Everything until now happened in the **render phase**.

Render phase includes:

Calling components  
Creating new React elements  
Building/updating Fiber tree  
Reconciliation  
Diffing  
Preparing DOM changes

Important:

Render phase does not update the real DOM.

It only calculates what should change.

Mental model:

Render phase \= calculation phase

Related terms:

Render phase  
Re-render  
Virtual DOM  
Fiber  
Reconciliation  
Diffing  
---

## 13. Commit phase starts

Now React enters the **commit phase**.

This is where React applies changes to the real DOM.

If React found that only text changed:

p text: 0 → 1

Then during commit:

React updates only that text node in the real DOM.

Related term:

Commit phase

Important:

Commit phase \= DOM update phase  
---

## 14. React updates the real DOM

Now React touches the actual browser DOM.

Example:

Before real DOM:

\<p\>0\</p\>

After commit:

\<p\>1\</p\>

React may also:

Add DOM nodes  
Remove DOM nodes  
Update attributes  
Update text  
Attach refs  
Run layout effects

Related terms:

Real DOM  
DOM mutation  
Commit  
Refs  
useLayoutEffect  
---

## 15. Browser paints updated screen

After DOM updates, the browser may do:

Style recalculation  
Layout  
Paint  
Composite

Then the user sees the updated screen.

Related browser terms:

Layout  
Paint  
Composite  
Rendering pipeline

React’s job is mostly done once it commits DOM changes.

The browser then handles visual painting.

---

## Full mapping in one table

| Step | What happens | React term |
| ----- | ----- | ----- |
| 1 | State changes | State update / trigger |
| 2 | React queues the update | Scheduling / batching |
| 3 | React decides priority | Fiber / lanes |
| 4 | Component function runs again | Render / re-render |
| 5 | Component returns JSX | JSX |
| 6 | JSX becomes objects | React elements |
| 7 | New UI tree is created | Virtual DOM / React tree |
| 8 | React tracks work internally | Fiber tree |
| 9 | Old and new trees are compared | Reconciliation |
| 10 | Differences are found | Diffing algorithm |
| 11 | React prepares required changes | Effects / update plan |
| 12 | Calculation phase ends | Render phase complete |
| 13 | React applies changes | Commit phase |
| 14 | Real DOM changes | DOM mutation |
| 15 | Browser updates screen | Paint / browser rendering |

---

## Best mental model diagram

setState()  
 ↓  
Update is scheduled  
 ↓  
Fiber decides priority and starts work  
 ↓  
Render phase begins  
 ↓  
Component function is called again  
 ↓  
JSX is returned  
 ↓  
JSX becomes React elements  
 ↓  
New React element tree is created  
 ↓  
Fiber creates/updates work-in-progress tree  
 ↓  
Reconciliation compares old tree and new tree  
 ↓  
Diffing algorithm finds exact differences  
 ↓  
React prepares DOM update plan  
 ↓  
Render phase ends  
 ↓  
Commit phase begins  
 ↓  
React applies changes to real DOM  
 ↓  
Browser performs layout/paint if needed  
 ↓  
User sees updated UI  
---

## Very simple definitions inside this flow

## JSX

The syntax you write.

\<h1\>Hello\</h1\>

## React element

The JavaScript object created from JSX.

\{  
 type: "h1",  
 props: \{  
   children: "Hello"  
 \}  
\}

## Virtual DOM

The tree of React elements.

App  
└── div  
   └── h1

## Fiber

React’s internal work system that tracks, schedules, pauses, resumes, and commits updates.

Fiber \= work manager

## Render

React calls your component to calculate the next UI.

Render \= calculate UI

## Re-render

React calls the same component again after an update.

Re-render \= component function runs again

## Reconciliation

React compares old tree and new tree.

Reconciliation \= compare old UI with new UI

## Diffing

The actual comparison rules used during reconciliation.

Diffing \= find what exactly changed

## Commit

React applies changes to the real DOM.

Commit \= update DOM

## Paint

Browser displays the updated UI.

Paint \= browser shows final pixels  
---

## Most important takeaway

React update has two big parts:

1\. Render phase  
2\. Commit phase

Render phase:

React calculates what changed.

Commit phase:

React applies the changes to the DOM.

So the clean mental model is:

State changes  
     ↓  
React renders in memory  
     ↓  
React reconciles old and new trees  
     ↓  
React diffs to find changes  
     ↓  
React commits changes to the real DOM  
     ↓  
Browser paints

And where Fiber fits:

Fiber manages and schedules the render/reconciliation work.

So one final line:

Virtual DOM is the UI description, Fiber is the work engine, reconciliation is the comparison process, diffing is the comparison logic, render calculates the UI, commit updates the DOM, and browser paint shows it on screen.  
You mention Fiber tree so it fiber tree or virtula dom ?  
Thought for a second

Good question. The correct answer is:

**React has both concepts, but they are not the same thing.**

In common explanations, people say **Virtual DOM**, but internally React mainly works with a **Fiber tree**.

## Simple difference

Virtual DOM / React element tree \= description of what UI should look like

Fiber tree \= React’s internal work structure used to render, compare, schedule, and update UI

## 1. React element tree / Virtual DOM

When your component returns JSX:

function App() \{  
 return (  
   \<div\>  
     \<h1\>Hello\</h1\>  
     \<p\>Welcome\</p\>  
   \</div\>  
 );  
\}

JSX becomes React elements, conceptually like:

\{  
 type: "div",  
 props: \{  
   children: \[  
     \{ type: "h1", props: \{ children: "Hello" \} \},  
     \{ type: "p", props: \{ children: "Welcome" \} \}  
   \]  
 \}  
\}

This tree of React elements is commonly called the **Virtual DOM**.

It is basically:

What should the UI look like?

## 2. Fiber tree

React then uses those React elements to create/update its internal **Fiber tree**.

A Fiber node contains more information than a React element.

A Fiber node stores things like:

component type  
props  
state  
parent/child/sibling links  
DOM node reference  
pending updates  
effects  
priority information  
old fiber reference

So Fiber is not just “UI description”.

Fiber is React’s internal system for managing rendering work.

It answers:

What work needs to be done?  
Can this component be reused?  
What priority is this update?  
Should this work be paused/resumed?  
What DOM changes need to be committed?

## The best mental model

Use this:

JSX  
↓  
React Elements / Virtual DOM  
↓  
Fiber Tree  
↓  
Reconciliation \+ Diffing  
↓  
Commit changes to Real DOM

But more accurately, reconciliation happens while React is building/updating the Fiber tree.

## In one line

**Virtual DOM is the UI description. Fiber tree is React’s internal work tree built from that description.**

## Interview-safe answer

React elements, often called the Virtual DOM, describe what the UI should look like. React Fiber is the internal tree structure React uses to process those elements, track state and effects, schedule work, perform reconciliation, and commit DOM updates. So they are related, but not the same. Virtual DOM is the description; Fiber tree is the execution/work structure React uses internally.

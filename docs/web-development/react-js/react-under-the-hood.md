---
title: React Under The Hood
sidebar_position: 13
---

# React Under The Hood

Related canonical pages: [React Fiber](fundamentals/react-fiber.md), [React Reconciliation](fundamentals/reconciliation-1.md), [Rendering Components](rendering-components.md).

## How To Use This Page

Use this page as the advanced React internals hub.

- For Fiber basics and Fiber node details, start with [React Fiber](fundamentals/react-fiber.md).
- For diffing, keys, state preservation, and reconciliation rules, study [React Reconciliation](fundamentals/reconciliation-1.md).
- For render phase, commit phase, lifecycle, re-render triggers, and cleanup, study [Rendering Components](rendering-components.md).
- Use this page for Scheduler, lanes, concurrent rendering, Suspense internals, hydration, priorities, and the full mental model.

# **React Under The Hood**

## **React Fiber**

## **Scheduler**

## **Concurrent Rendering**

## **Render Priorities**

## **Suspense Internals**

## **Hydration**

## **Common Interview Topics**

* How React updates DOM

# **React Under The Hood**

React under the hood means understanding what React does internally when state changes, how it decides what to render, how it prioritizes work, how it updates the DOM, and how features like Suspense, concurrent rendering, Fiber Lanes, and hydration fit into the rendering pipeline.

For interviews, the most important mental model is:

State update

  ↓

React assigns a Lane (priority)

  ↓

React schedules work

  ↓

Render phase calculates next UI

  ↓

Reconciliation finds what changed

  ↓

Commit phase updates the DOM

  ↓

Browser paints

---

# **1\. How React Updates the DOM**

## **Simple meaning**

React does not directly update the DOM immediately for every state change. It first calculates what the UI should look like, compares it with the previous UI, and then applies only the required DOM changes.

## **Step-by-step flow**

User clicks button

  ↓

setState is called

  ↓

React queues the update

  ↓

React assigns a Lane (priority)

  ↓

React schedules render work

  ↓

React calls component again

  ↓

Component returns new JSX

  ↓

JSX becomes React elements

  ↓

React reconciles old tree and new tree

  ↓

React prepares DOM mutations

  ↓

React commits changes to real DOM

## **Example**

function Counter() \{

  const \[count, setCount\] \= React.useState(0);

  return (

    \<button onClick=\{() \=\> setCount((prev) \=\> prev \+ 1)\}\>

      Count: \{count\}

    \</button\>

  );

\}

When button is clicked:

setCount

  ↓

React assigns update priority

  ↓

Counter renders again

  ↓

New output: Count: 1

  ↓

React compares old and new output

  ↓

Only button text changes in DOM

## **Important distinction**

Rendering does not always mean DOM update.

A component can re-render, but if output is same, React may not change the DOM.

## **Interview-ready answer**

When state or props change, React schedules an update, assigns it a priority lane, calls the component again to calculate the next UI, reconciles the new React element tree with the previous one, and commits only the necessary DOM changes. Rendering calculates what should change; commit applies the change to the real DOM.

---

# **2\. React Fiber**

## **Simple meaning**

React Fiber is React’s internal architecture for rendering and scheduling UI work.

A Fiber is an internal object representing a unit of work for a component or DOM element.

## **Why Fiber exists**

Older React rendering was mostly synchronous. If a large component tree started rendering, React had to finish it before the browser could respond to user input.

Fiber was introduced so React can split rendering work into smaller units.

## **Key mental model**

Old model:

Render entire tree in one blocking pass

Fiber model:

Break UI work into small units

Prioritize urgent work

Pause/resume/restart rendering if needed

Commit only final result

## **What a Fiber node tracks conceptually**

You do not need to memorize internal fields, but conceptually a Fiber tracks:

* Component type  
* Props  
* State  
* Parent/child/sibling relationship  
* DOM node reference  
* Pending updates  
* Effects to run  
* Priority lanes  
* Alternate fiber for current vs work-in-progress tree

## **Current tree and work-in-progress tree**

Current Fiber Tree

→ What is currently shown on screen

Work-in-Progress Fiber Tree

→ Next UI React is preparing

When work is complete, React commits it and the work-in-progress tree becomes the current tree.

## **Fiber Lanes**

### **What are Lanes?**

Lanes are React's modern priority system.

Before React 18, React used expiration times to prioritize updates. Modern React uses **Lanes**, which are internally represented as bitmasks.

Think of a Lane as a "priority bucket" assigned to an update.

Update

  ↓

Assigned to a Lane

  ↓

Scheduler decides when to process it

### **Why Lanes exist**

Different updates have different urgency.

Typing in input

→ very urgent

Button click

→ urgent

Transition update

→ less urgent

Background work

→ lowest priority

Lanes allow React to:

* Track multiple pending updates simultaneously.  
* Merge compatible updates.  
* Interrupt lower-priority work.  
* Resume work later.  
* Support concurrent rendering efficiently.

### **Simplified Lane categories**

You do not need to memorize actual lane constants, but conceptually:

Sync Lane

→ Immediate updates

Input Lane

→ Typing and user interactions

Default Lane

→ Normal updates

Transition Lanes

→ startTransition updates

Idle Lane

→ Background work

### **Example**

function Search() \{

  const \[text, setText\] \= React.useState("");

  const \[results, setResults\] \= React.useState("");

  function handleChange(e) \{

    const value \= e.target.value;

    setText(value);

    React.startTransition(() \=\> \{

      setResults(value);

    \});

  \}

\}

Conceptually:

setText

→ Input Lane (high priority)

setResults

→ Transition Lane (lower priority)

React can render the input update first and delay the expensive results update.

## **Interview-ready answer**

Fiber is React’s internal rendering architecture. Each component is represented by a Fiber node that stores state, props, effects, and pending work. Modern React uses Fiber Lanes to assign priorities to updates. Lanes allow React to schedule urgent updates first, delay less important work, interrupt rendering when necessary, and support concurrent rendering.

---

# **3\. Scheduler**

## **Simple meaning**

The Scheduler helps React decide when to perform work and which update should be handled first.

## **Key mental model**

Not all updates have the same urgency.

Urgent:

typing, clicking, input updates

Less urgent:

filtering a huge list, rendering hidden tab content, loading non-critical UI

## **Why Scheduler matters**

JavaScript runs on the main thread. If React does heavy rendering continuously, the browser cannot respond quickly to user input.

Scheduler helps React:

* Prioritize urgent work.  
* Delay less important work.  
* Yield control back to the browser.  
* Keep the UI responsive.  
* Continue work later.  
* Avoid blocking user interactions.

## **Scheduler \+ Lanes**

The Scheduler works together with Fiber Lanes.

Update

  ↓

Assigned Lane

  ↓

Scheduler reads Lane priority

  ↓

React decides when to render

The Scheduler does not invent priorities itself. It uses the priorities represented by Lanes.

## **Example**

function SearchPage() \{

  const \[input, setInput\] \= React.useState("");

  const \[query, setQuery\] \= React.useState("");

  function handleChange(event) \{

    const value \= event.target.value;

    setInput(value); // urgent update

    React.startTransition(() \=\> \{

      setQuery(value); // non-urgent update

    \});

  \}

  return \<input value=\{input\} onChange=\{handleChange\} /\>;

\}

Here, typing stays responsive because the expensive result update can be treated as less urgent.

## **Interview-ready answer**

React Scheduler decides the timing of updates, while Fiber Lanes represent update priorities. Together they help React keep the UI responsive by prioritizing urgent updates like typing and clicking while delaying or interrupting less urgent rendering work such as transitions or expensive list filtering.

---

# **4\. Concurrent Rendering**

## **Simple meaning**

Concurrent rendering means React can prepare UI updates in an interruptible way.

It does not mean React renders on multiple threads. It means React can start rendering, pause, handle something more urgent, and then continue or restart.

## **Key mental model**

Current UI remains visible

  ↓

React prepares next UI in background

  ↓

Urgent update comes in

  ↓

React can pause current render work

  ↓

React handles urgent update

  ↓

React resumes or restarts less urgent work

## **How Lanes enable concurrency**

Concurrent rendering is largely powered by Fiber Lanes.

Transition Lane rendering

  ↓

User types in input

  ↓

Input Lane update arrives

  ↓

React pauses Transition Lane work

  ↓

Processes Input Lane first

  ↓

Returns to Transition Lane later

Without Lanes, React would have difficulty distinguishing which work should be interrupted.

## **Important point**

Concurrent rendering affects the render phase.

The commit phase is still synchronous because React must apply final DOM changes consistently.

## **Example with useTransition**

function Tabs() \{

  const \[tab, setTab\] \= React.useState("home");

  const \[isPending, startTransition\] \= React.useTransition();

  function selectTab(nextTab) \{

    startTransition(() \=\> \{

      setTab(nextTab);

    \});

  \}

  return (

    \<\>

      \{isPending && \<p\>Loading...\</p\>\}

      \<button onClick=\{() \=\> selectTab("reports")\}\>Reports\</button\>

      \<TabContent tab=\{tab\} /\>

    \</\>

  );

\}

If `TabContent` is heavy, React can keep the UI responsive while preparing the transition.

## **What concurrent rendering helps with**

* Heavy route changes.  
* Large filtered lists.  
* Slow tab switches.  
* Suspense loading.  
* Keeping input responsive.  
* Preparing UI without blocking urgent interaction.

## **Common misunderstanding**

Concurrent rendering is not parallel rendering.

React is still usually running JavaScript on the main thread. The benefit is interruptible and prioritized rendering.

## **Interview-ready answer**

Concurrent rendering lets React prepare UI updates without blocking urgent interactions. React can pause, resume, restart, or abandon render work based on Lane priority. It is not multi-threading; it is interruptible rendering enabled by Fiber, Lanes, and the Scheduler.

---

# **5\. Render Priorities**

## **Simple meaning**

Render priorities decide which updates should be handled first.

## **How React represents priorities**

Internally, React represents priorities using Fiber Lanes.

Update

  ↓

Assigned Lane

  ↓

Lane determines priority

## **Examples**

Highest priority:

Typing in an input, clicking a button

Medium priority:

Normal UI updates

Lower priority:

Transition updates, heavy list filtering, deferred rendering

Idle priority:

Non-urgent background work

## **Practical example**

function Search() \{

  const \[text, setText\] \= React.useState("");

  const \[resultsQuery, setResultsQuery\] \= React.useState("");

  function handleChange(event) \{

    const value \= event.target.value;

    setText(value);

    React.startTransition(() \=\> \{

      setResultsQuery(value);

    \});

  \}

  return (

    \<\>

      \<input value=\{text\} onChange=\{handleChange\} /\>

      \<SearchResults query=\{resultsQuery\} /\>

    \</\>

  );

\}

Here:

setText

→ Input Lane

→ urgent because input must update immediately

setResultsQuery

→ Transition Lane

→ lower priority because results can update slightly later

## **useDeferredValue**

`useDeferredValue` lets a non-critical value lag behind urgent UI.

function SearchPage(\{ query \}) \{

  const deferredQuery \= React.useDeferredValue(query);

  return \<SearchResults query=\{deferredQuery\} /\>;

\}

## **Key mental model**

Priorities help React decide:

Should this update block user interaction?

Or can it wait?

## **Interview-ready answer**

Render priorities are implemented internally using Fiber Lanes. Urgent updates such as typing are assigned higher-priority lanes, while transitions and deferred rendering use lower-priority lanes. React uses these lanes to decide which work should run first and which work can wait.

---

# **6\. Suspense Internals**

## **Simple meaning**

Suspense lets a component “wait” for something before rendering, and React shows fallback UI meanwhile.

\<Suspense fallback=\{\<p\>Loading...\</p\>\}\>

  \<UserProfile /\>

\</Suspense\>

## **Key mental model**

Suspense creates a boundary.

If something inside the boundary is not ready, React can show fallback UI instead of blocking the whole app.

Suspense Boundary

  ↓

Child is ready?

  → yes: show child

  → no: show fallback

## **Common use cases**

* Lazy-loaded components.  
* Streaming server rendering.  
* Selective hydration.  
* Framework-level data fetching.  
* Code splitting.

## **Lazy component example**

const ReportsPage \= React.lazy(() \=\> import("./ReportsPage"));

function App() \{

  return (

    \<React.Suspense fallback=\{\<p\>Loading reports...\</p\>\}\>

      \<ReportsPage /\>

    \</React.Suspense\>

  );

\}

## **What happens internally conceptually**

React tries to render child

  ↓

Child is not ready

  ↓

Child suspends

  ↓

React finds nearest Suspense boundary

  ↓

React renders fallback

  ↓

When child is ready, React retries rendering

  ↓

Real content replaces fallback

## **Suspense and concurrent rendering**

Suspense works well with concurrent rendering because React can keep already visible UI on screen while preparing the next UI.

Suspended work often remains associated with lower-priority lanes until React retries rendering.

## **Suspense and hydration**

With server rendering, Suspense boundaries help React hydrate parts of the page independently. This allows important parts of the UI to become interactive earlier.

## **Important clarification**

Suspense is not a generic error handler.

Errors are handled by Error Boundaries. Loading/waiting is handled by Suspense.

## **Interview-ready answer**

Suspense lets React show fallback UI while part of the component tree is not ready, such as a lazy-loaded component or framework-managed data dependency. Internally, React detects that a child suspended, finds the nearest Suspense boundary, renders fallback, and retries rendering when the dependency is ready. Suspense also supports streaming server rendering and selective hydration.

---

# **7\. Hydration**

## **Simple meaning**

Hydration is the process where React attaches event handlers and internal state to HTML that was already rendered on the server.

## **Key mental model**

Server sends HTML first.

Browser displays HTML quickly.

Then React loads JavaScript and hydrates the page to make it interactive.

Server renders HTML

  ↓

Browser displays HTML

  ↓

JS bundle loads

  ↓

React hydrates existing HTML

  ↓

Page becomes interactive

## **Example**

Server rendered HTML:

\<div id="root"\>

  \<button\>Click me\</button\>

\</div\>

Client hydration:

\import \{ hydrateRoot \} from "react-dom/client";

hydrateRoot(document.getElementById("root"), \<App /\>);

React reuses existing DOM instead of destroying and recreating it.

## **Why hydration matters**

* Faster first contentful paint.  
* Better SEO.  
* Better perceived performance.  
* Useful for SSR and static generation.  
* Allows HTML to be visible before JavaScript is fully ready.

## **Hydration mismatch**

A hydration mismatch happens when server-rendered HTML does not match the client’s first render.

Bad example:

function App() \{

  return \<p\>\{Date.now()\}\</p\>;

\}

Server value and client value may differ.

Better:

function App() \{

  const \[time, setTime\] \= React.useState(null);

  React.useEffect(() \=\> \{

    setTime(Date.now());

  \}, \[\]);

  return \<p\>\{time\}\</p\>;

\}

## **Selective hydration**

With Suspense boundaries, React can hydrate more important parts first and hydrate other parts later.

Example mental model:

Header hydrates first

Search box hydrates early

Comments section hydrates later

## **Interview-ready answer**

Hydration is when React attaches behavior to HTML that was generated on the server. React reuses the existing DOM and attaches event listeners so the page becomes interactive. Hydration improves initial load and SEO, but server and client output must match to avoid hydration mismatches.

---

# **8\. Render Phase vs Commit Phase**

## **Render phase**

React calculates the next UI.

During render phase:

* React calls components.  
* Components return React elements.  
* Reconciliation happens.  
* Fiber work is built.  
* Lane priorities are evaluated.  
* Work can be interrupted in concurrent rendering.  
* No DOM changes are applied yet.

Render must be pure.

Bad:

function Component() \{

  localStorage.setItem("key", "value");

  return \<div\>Hello\</div\>;

\}

Side effects should be in effects.

## **Commit phase**

React applies changes to the real DOM.

During commit phase:

* DOM nodes are inserted, updated, or removed.  
* Refs are attached/detached.  
* `useLayoutEffect` runs.  
* Browser may paint.  
* `useEffect` runs after paint.

## **Important point**

Render phase can be interrupted. Commit phase cannot be partially applied.

## **Interview-ready answer**

The render phase calculates what the UI should look like and can be interrupted in concurrent rendering. During rendering, React evaluates pending lanes and chooses which work to process. The commit phase applies final DOM changes and runs effects. Render should be pure; side effects belong in effects.

---

# **9\. Batching and DOM Updates**

## **Simple meaning**

Batching means React groups multiple state updates into one render.

function handleClick() \{

  setCount((prev) \=\> prev \+ 1);

  setFlag((prev) \=\> \!prev);

\}

React can batch both updates and render once.

## **Why batching helps**

Without batching:

setCount → render

setFlag → render

With batching:

setCount

setFlag

  ↓

one render

## **Automatic batching**

Modern React batches updates not only in React event handlers, but also in promises, timers, native events, and async callbacks.

setTimeout(() \=\> \{

  setCount((prev) \=\> prev \+ 1);

  setFlag((prev) \=\> \!prev);

\}, 1000);

These can be batched into one render.

## **Lanes and batching**

React can batch updates that belong to compatible lanes and process them together efficiently.

Multiple updates

  ↓

Grouped into lanes

  ↓

Rendered together when possible

## **When immediate DOM update is needed**

Use `flushSync` rarely.

\import \{ flushSync \} from "react-dom";

flushSync(() \=\> \{

  setOpen(true);

\});

Most apps should avoid this unless they must read updated DOM immediately.

## **Interview-ready answer**

React batches multiple state updates into a single render to reduce unnecessary work. Modern React supports automatic batching across event handlers, promises, timers, and async callbacks. Internally, Fiber Lanes help React group and prioritize updates efficiently. If immediate DOM update is absolutely required, `flushSync` can force it, but it should be used rarely.

---

# **10\. Putting It All Together**

## **Full internal mental model**

1\. Trigger

   setState, props change, context update, store update

2\. Assign Lane

   React assigns priority to update

3\. Schedule

   Scheduler decides when work should run

4\. Render phase

   React builds work-in-progress Fiber tree

   Components are called

   New React elements are produced

   Reconciliation compares old and new trees

5\. Complete work

   React prepares effect list and DOM mutations

6\. Commit phase

   React applies DOM mutations

   Refs update

   Layout effects run

7\. Paint

   Browser paints updated UI

8\. Passive effects

   useEffect runs after paint

## **Interview-ready answer**

React updates the DOM through a staged pipeline. A state update triggers scheduling. React assigns the update to a Fiber Lane, which represents its priority. The Scheduler uses those lanes to decide when work should run. React then builds a work-in-progress Fiber tree during the render phase, reconciles changes, and prepares DOM mutations. If rendering is concurrent, lower-priority lane work can be interrupted by higher-priority lane work. Once React has a final result, the commit phase synchronously applies DOM changes, updates refs, and runs effects. Suspense can pause parts of rendering and show fallback UI, while hydration attaches React behavior to server-rendered HTML.

---

# **Quick Revision Summary**

| Topic | Key point |
| ----- | ----- |
| React update | Trigger → lane → schedule → render → reconcile → commit |
| Fiber | Unit-of-work architecture |
| Fiber Lanes | Internal priority system |
| Scheduler | Uses lanes to decide when work runs |
| Concurrent rendering | Interruptible rendering |
| Render priority | Implemented using lanes |
| Transition | Uses lower-priority lanes |
| Suspense | Boundary for not-ready UI |
| Hydration | Attach React to server HTML |
| Selective hydration | Hydrate important parts earlier |
| Render phase | Calculates next UI |
| Commit phase | Applies DOM changes |
| Batching | Groups updates and lanes |
| Hydration mismatch | Server/client first render mismatch |

---

# **Final Interview-Ready Combined Answer**

React updates the DOM through a controlled internal pipeline. When state, props, or context changes, React assigns the update to a Fiber Lane, which represents its priority. Fiber represents the component tree as units of work, allowing React to split rendering, assign priorities, and support concurrent rendering. The Scheduler uses lane priorities to decide which updates are urgent and which can wait. During the render phase, React calls components, builds the

---

# **Common Interview Topics / Questions**

---

# **1\. How does React update the DOM?**

## **Answer**

React updates the DOM in two major phases: render and commit.

State update

  ↓

Render phase calculates next UI

  ↓

Reconciliation finds differences

  ↓

Commit phase updates DOM

## **Interview-ready answer**

When state changes, React schedules an update, calls components to produce a new React element tree, reconciles it with the previous tree, and commits only the necessary DOM changes. The render phase calculates changes, and the commit phase applies those changes to the real DOM.

---

# **2\. What is React Fiber?**

## **Answer**

Fiber is React’s internal architecture that represents UI work as small units.

## **Interview-ready answer**

Fiber is React’s internal data structure and rendering architecture. It lets React break rendering into small units of work, assign priorities, pause or resume rendering, and support concurrent rendering. Each Fiber represents work for a component or DOM element.

---

# **3\. What is the Scheduler in React?**

## **Answer**

The Scheduler decides when React should perform updates and which updates are more urgent.

## **Interview-ready answer**

The Scheduler helps React prioritize updates. Urgent updates like typing and clicking should happen quickly, while non-urgent updates like rendering a large filtered list can be delayed or interrupted. This keeps the UI responsive.

---

# **4\. What is concurrent rendering?**

## **Answer**

Concurrent rendering means React can prepare UI updates in an interruptible way.

## **Interview-ready answer**

Concurrent rendering allows React to start rendering an update, pause it if something more urgent happens, then resume, restart, or discard the work. It improves responsiveness for heavy UI updates. It is not multi-threading; it is interruptible rendering on the main thread.

---

# **5\. What are render priorities?**

## **Answer**

Render priorities tell React which updates should be handled first.

## **Interview-ready answer**

Render priorities help React separate urgent updates from non-urgent updates. Typing and clicks are urgent, while transitions and expensive list rendering can be lower priority. APIs like `startTransition`, `useTransition`, and `useDeferredValue` help mark updates as non-urgent.

---

# **6\. How does Suspense work internally?**

## **Answer**

Suspense creates a boundary that can show fallback UI while child content is not ready.

\<Suspense fallback=\{\<Loader /\>\}\>

  \<LazyPage /\>

\</Suspense\>

## **Interview-ready answer**

When a child inside Suspense is not ready, React treats that part of the tree as suspended, finds the nearest Suspense boundary, and shows fallback UI. When the dependency is ready, React retries rendering and replaces fallback with real content. Suspense also supports streaming server rendering and selective hydration.

---

# **7\. What is hydration?**

## **Answer**

Hydration is React attaching behavior to server-rendered HTML.

## **Interview-ready answer**

Hydration happens when React loads on the client and attaches event handlers and internal state to HTML that was already generated on the server. React reuses the existing DOM instead of recreating it. Hydration makes server-rendered pages interactive.

---

# **8\. What is hydration mismatch?**

## **Answer**

A hydration mismatch happens when server-rendered HTML differs from the first client render.

function App() \{

  return \<p\>\{Math.random()\}\</p\>;

\}

This can produce different values on server and client.

## **Interview-ready answer**

A hydration mismatch happens when the HTML generated on the server does not match the initial client render. Common causes are random values, dates, browser-only APIs, locale differences, or conditional rendering based on client-only data. The fix is to keep first render deterministic or move client-only logic into `useEffect`.

---

# **9\. Render phase vs commit phase**

## **Answer**

Render calculates the next UI. Commit applies DOM changes.

## **Interview-ready answer**

In the render phase, React calls components and builds the next UI. This phase should be pure and can be interrupted. In the commit phase, React applies DOM changes, updates refs, runs layout effects, and later runs passive effects. Commit is synchronous and should be fast.

---

# **10\. Why should render be pure?**

## **Answer**

Render can run more than once, especially in StrictMode and concurrent rendering.

Bad:

function Component() \{

  sendAnalyticsEvent();

  return \<div\>Hello\</div\>;

\}

This side effect may run multiple times.

Correct:

function Component() \{

  React.useEffect(() \=\> \{

    sendAnalyticsEvent();

  \}, \[\]);

  return \<div\>Hello\</div\>;

\}

## **Interview-ready answer**

Render should be pure because React may call components multiple times, restart rendering, or abandon work in concurrent mode. Side effects during render can run unexpectedly. Side effects should be placed in `useEffect` or `useLayoutEffect`.

---

# **Quick Revision Summary**

| Topic | Key point |
| ----- | ----- |
| React update | Trigger → schedule → render → reconcile → commit |
| Fiber | Unit-of-work architecture |
| Scheduler | Prioritizes when work runs |
| Concurrent rendering | Interruptible rendering |
| Render priority | Urgent vs non-urgent updates |
| Transition | Marks update as non-blocking |
| Suspense | Boundary for not-ready UI |
| Hydration | Attach React to server HTML |
| Selective hydration | Hydrate important parts earlier |
| Render phase | Calculates next UI |
| Commit phase | Applies DOM changes |
| Batching | Groups state updates |
| Hydration mismatch | Server/client first render mismatch |

---

# **Final Interview-Ready Combined Answer**

React updates the DOM through a controlled internal pipeline. When state, props, or context changes, React schedules an update. Fiber represents the component tree as units of work, allowing React to split rendering, assign priorities, and support concurrent rendering. The Scheduler decides which updates are urgent and which can wait. During the render phase, React calls components, builds the work-in-progress Fiber tree, and reconciles it with the current tree to calculate changes. During the commit phase, React synchronously applies DOM mutations, updates refs, and runs effects. Concurrent rendering allows React to pause, resume, restart, or abandon render work, but the commit phase remains synchronous. Suspense lets parts of the tree wait and show fallback UI, while hydration attaches React behavior to server-rendered HTML. In interviews, the core answer is: **React calculates UI changes in render phase, finds differences through reconciliation, and applies only necessary DOM updates in commit phase.**

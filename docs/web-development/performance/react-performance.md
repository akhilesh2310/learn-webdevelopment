---
title: React Performance
sidebar_position: 4
---

# React Performance

## 7. React Performance Optimization

## React.memo

## useMemo

## useCallback

## Code Splitting

## Lazy Loading

## Suspense

## Virtualization

* ### **react-window**

* ### **react-virtualized**

## Preventing Unnecessary Re-renders

## Memoization Strategies

## Senior / Staff React Topics

## Performance Profiling

## React DevTools Profiler

## Rendering Optimization

## Architecture Decisions

## Large Scale State Management

## Common Interview Topics

* React.memo vs useMemo
* Large list optimization
* Scaling React teams
* Frontend architecture decisions

## React Performance Optimization

React performance optimization means improving how fast the UI loads, renders, responds to user interactions, and handles large data. The most important rule is:

Measure first, then optimize.

Do not blindly add `React.memo`, `useMemo`, and `useCallback` everywhere. First identify the bottleneck using React DevTools Profiler, browser Performance tab, Lighthouse, bundle analyzer, or real user monitoring.

---

## 1. When Should You Optimize?

## Simple meaning

Optimize when users can feel slowness or metrics show a real issue.

Common signs:

* Page loads slowly.
* Typing feels laggy.
* Clicking button freezes UI.
* Large table scrolls slowly.
* Route change takes too long.
* Modal opens with delay.
* API response is fast but UI still slow.
* React DevTools shows expensive re-renders.
* Lighthouse/Core Web Vitals are poor.

## Do not optimize too early

Bad mindset:

Let me use memo everywhere.

Good mindset:

Where is the actual bottleneck?

What is re-rendering?

What is expensive?

Can I reduce work?

## Interview-ready answer

I optimize React apps when there is measurable or visible performance pain. I first profile the issue, identify whether the bottleneck is rendering, bundle size, API, state management, large lists, or expensive calculations, and then apply the right optimization.

---

## 2. Common React Performance Problems

## Common causes

Large bundle size

Unnecessary re-renders

Expensive calculations during render

Large lists rendered fully

Heavy components

Too much global state

Context causing many consumers to re-render

Unstable object/function props

No code splitting

Poor image optimization

Duplicate API calls

No server-state caching

Heavy third-party libraries

## Production examples

### Example 1: Large table

Rendering 10,000 rows directly:

\{rows.map((row) \=\> (

  \<Row key=\{row.id\} row=\{row\} /\>

))\}

This can freeze the UI.

Better:

Use virtualization.

### Example 2: Search input

Every keystroke filters a huge list.

Better:

Debounce search

Memoize expensive filtering

Use transition/deferred value if needed

Virtualize result list

### Example 3: Dashboard widgets

One widget updates every few seconds and causes the full dashboard to re-render.

Better:

Move state closer

Split components

Memoize stable widgets

Use selector-based state subscription

## Interview-ready answer

React apps usually become slow because of unnecessary re-renders, expensive render logic, large lists, large bundles, poor state design, repeated API calls, heavy third-party libraries, or missing caching. The solution depends on the root cause.

---

## 3. React.memo

## Simple meaning

`React.memo` memoizes a component.

It prevents a component from re-rendering when its props have not changed.

const UserCard \= React.memo(function UserCard(\{ name \}: \{ name: string \}) \{

  console.log("UserCard rendered");

  return \<h2\>\{name\}\</h2\>;

\});

## Example

function Parent() \{

  const \[count, setCount\] \= React.useState(0);

  return (

    \<\>

      \<button onClick=\{() \=\> setCount((prev) \=\> prev \+ 1)\}\>

        Update Parent: \{count\}

      \</button\>

      \<UserCard name="Akhilesh" /\>

    \</\>

  );

\}

If `UserCard` props are same, `React.memo` can skip its re-render.

## Key mental model

Same props

→ skip child render

Changed props

→ render child again

## Important trap

`React.memo` does shallow comparison.

This breaks memo benefit:

\<UserCard user=\{\{ name: "Akhilesh" \}\} /\>

A new object is created every render.

Better:

const user \= React.useMemo(() \=\> \{

  return \{ name: "Akhilesh" \};

\}, \[\]);

\<UserCard user=\{user\} /\>;

## When to use React.memo

Use it when:

* Component is expensive to render.
* Props are usually stable.
* Parent re-renders often.
* Child does not need to re-render every time.
* Profiling shows child render cost.

## When not to use

Avoid when:

* Component is cheap.
* Props always change.
* You are adding it everywhere without profiling.
* It makes code harder to read for no benefit.

## Interview-ready answer

`React.memo` is used to memoize a component and skip re-rendering when props are shallowly equal. It is useful for expensive child components whose props remain stable while the parent re-renders. It should be used based on profiling, not blindly.

---

## 4. useMemo

## Simple meaning

`useMemo` memoizes a calculated value.

const filteredUsers \= React.useMemo(() \=\> \{

  return users.filter((user) \=\> user.isActive);

\}, \[users\]);

## Key mental model

Same dependencies

→ reuse previous value

Dependencies changed

→ recalculate value

## Example: expensive filtering

function UserList(\{

  users,

  searchText,

\}: \{

  users: User\[\];

  searchText: string;

\}) \{

  const filteredUsers \= React.useMemo(() \=\> \{

    return users.filter((user) \=\>

      user.name.toLowerCase().includes(searchText.toLowerCase())

    );

  \}, \[users, searchText\]);

  return (

    \<ul\>

      \{filteredUsers.map((user) \=\> (

        \<li key=\{user.id\}\>\{user.name\}\</li\>

      ))\}

    \</ul\>

  );

\}

## Use cases

Use `useMemo` for:

* Expensive calculations.
* Filtering/sorting large lists.
* Derived data.
* Stable object/array props.
* Preventing unnecessary effect runs caused by unstable references.
* Passing stable values to memoized children.

## Bad use

const total \= React.useMemo(() \=\> a \+ b, \[a, b\]);

This is unnecessary because `a + b` is cheap.

## Interview-ready answer

`useMemo` caches the result of a calculation between renders. It is useful for expensive derived values or stable object/array references. It should be treated as a performance optimization, not a default coding habit.

---

## 5. useCallback

## Simple meaning

`useCallback` memoizes a function reference.

const handleSave \= React.useCallback(() \=\> \{

  saveUser(userId);

\}, \[userId\]);

## Key mental model

useMemo caches value

useCallback caches function reference

This:

const handleClick \= React.useCallback(() \=\> \{

  console.log("clicked");

\}, \[\]);

is similar to:

const handleClick \= React.useMemo(() \=\> \{

  return () \=\> \{

    console.log("clicked");

  \};

\}, \[\]);

## Example with React.memo child

const SaveButton \= React.memo(function SaveButton(\{

  onSave,

\}: \{

  onSave: () \=\> void;

\}) \{

  console.log("SaveButton rendered");

  return \<button onClick=\{onSave\}\>Save\</button\>;

\});

function Parent(\{ userId \}: \{ userId: string \}) \{

  const \[count, setCount\] \= React.useState(0);

  const handleSave \= React.useCallback(() \=\> \{

    saveUser(userId);

  \}, \[userId\]);

  return (

    \<\>

      \<button onClick=\{() \=\> setCount((prev) \=\> prev \+ 1)\}\>

        Count: \{count\}

      \</button\>

      \<SaveButton onSave=\{handleSave\} /\>

    \</\>

  );

\}

Without `useCallback`, `handleSave` gets a new function reference on every render, so `SaveButton` may re-render.

## When to use useCallback

Use it when:

* Passing function to a `React.memo` child.
* Function is dependency of `useEffect`.
* Custom hook returns stable handlers.
* Function identity matters.

## When not to use

Avoid when:

* Function is not passed anywhere.
* Child is not memoized.
* There is no performance issue.
* Code becomes harder to read.

## Interview-ready answer

`useCallback` memoizes a function reference. It is useful when passing callbacks to memoized children or when a function is used as a hook dependency. It does not make the function execution faster; it keeps the function identity stable.

---

## 6. React.memo vs useMemo vs useCallback

## Simple comparison

| API | What it memoizes | Use case |
| ----- | ----- | ----- |
| `React.memo` | Component render | Skip child re-render when props are same |
| `useMemo` | Calculated value | Cache expensive calculation or stable object |
| `useCallback` | Function reference | Keep callback reference stable |

## Example

const Child \= React.memo(function Child(\{

  items,

  onSelect,

\}: \{

  items: Item\[\];

  onSelect: (id: string) \=\> void;

\}) \{

  return \<div\>\{items.length\}\</div\>;

\});

function Parent(\{ items \}: \{ items: Item\[\] \}) \{

  const activeItems \= React.useMemo(() \=\> \{

    return items.filter((item) \=\> item.active);

  \}, \[items\]);

  const handleSelect \= React.useCallback((id: string) \=\> \{

    console.log(id);

  \}, \[\]);

  return \<Child items=\{activeItems\} onSelect=\{handleSelect\} /\>;

\}

## Interview-ready answer

`React.memo` memoizes a component, `useMemo` memoizes a calculated value, and `useCallback` memoizes a function reference. They are useful together when a memoized child receives expensive derived values or callback props.

---

## 7. Preventing Unnecessary Re-renders

## Common re-render triggers

A component re-renders when:

State changes

Props change

Parent re-renders

Context value changes

External store subscription changes

Key changes

## Techniques to prevent unnecessary re-renders

### 1. Keep state close to where it is used

Bad:

function App() \{

  const \[inputValue, setInputValue\] \= React.useState("");

  return (

    \<\>

      \<SearchBox value=\{inputValue\} onChange=\{setInputValue\} /\>

      \<HeavyDashboard /\>

    \</\>

  );

\}

Typing re-renders `App` and may re-render `HeavyDashboard`.

Better:

function SearchSection() \{

  const \[inputValue, setInputValue\] \= React.useState("");

  return \<SearchBox value=\{inputValue\} onChange=\{setInputValue\} /\>;

\}

function App() \{

  return (

    \<\>

      \<SearchSection /\>

      \<HeavyDashboard /\>

    \</\>

  );

\}

### 2. Split large components

Large component with many states can cause many unnecessary renders.

Better:

Split into smaller components.

Move state down.

Memoize expensive parts if needed.

### 3. Use React.memo for expensive children

const HeavyChart \= React.memo(function HeavyChart(\{ data \}: \{ data: Data\[\] \}) \{

  return \<Chart data=\{data\} /\>;

\});

### 4. Stabilize object/function props

const config \= React.useMemo(() \=\> \{

  return \{ theme: "dark", pageSize: 20 \};

\}, \[\]);

const handleClick \= React.useCallback(() \=\> \{

  console.log("clicked");

\}, \[\]);

### 5. Split context

Bad:

\<AppContext.Provider value=\{\{ user, theme, filters, notifications \}\}\>

Better:

\<AuthProvider\>

  \<ThemeProvider\>

    \<FilterProvider\>

      \{children\}

    \</FilterProvider\>

  \</ThemeProvider\>

\</AuthProvider\>

### 6. Use selectors in global state

Redux/Zustand components should subscribe only to the data they need.

const userName \= useSelector((state) \=\> state.user.name);

Do not select the whole store.

### 7. Virtualize large lists

Do not render thousands of rows at once.

## Interview-ready answer

To prevent unnecessary re-renders, I first identify why the component re-renders. Then I improve state placement, split components, memoize expensive children, stabilize props with `useMemo`/`useCallback`, split context, use selectors for global state, and virtualize large lists.

---

## 8. Memoization Strategies

## Simple meaning

Memoization means caching something so React does not repeat unnecessary work.

## What can be memoized?

Component → React.memo

Value → useMemo

Function → useCallback

Selector result → memoized selector

API data → server-state cache

Route chunk → lazy loading/code splitting

## Good memoization strategy

Use memoization when:

* Work is expensive.
* Same inputs repeat.
* Props need stable identity.
* Child component is memoized.
* Profiling shows repeated costly renders.

## Bad memoization strategy

Avoid:

Memoizing everything

Wrapping every component in React.memo

Adding useCallback for every function

Adding useMemo for cheap calculations

Ignoring actual bottleneck

## Senior-level point

Memoization also has cost.

It adds:

* Extra dependency tracking.
* Extra memory usage.
* More complex code.
* Possible stale dependency bugs.

## Interview-ready answer

Memoization should be used selectively. I memoize expensive calculations, stable props for memoized children, and costly components that re-render unnecessarily. I avoid memoizing cheap work because memoization itself has overhead.

---

## 9. Code Splitting

## Simple meaning

Code splitting means splitting the JavaScript bundle into smaller chunks and loading only what is needed.

## Why needed

Large apps can create huge bundles.

Huge bundle

→ slower initial load

→ slower parsing

→ slower time to interactive

Code splitting helps reduce initial load.

## Route-level code splitting

const ReportsPage \= React.lazy(() \=\> import("./ReportsPage"));

function App() \{

  return (

    \<React.Suspense fallback=\{\<p\>Loading...\</p\>\}\>

      \<Routes\>

        \<Route path="/reports" element=\{\<ReportsPage /\>\} /\>

      \</Routes\>

    \</React.Suspense\>

  );

\}

## Good candidates for code splitting

* Routes.
* Admin pages.
* Reports module.
* Heavy charts.
* Rich text editor.
* Date picker.
* Large modal.
* Rarely used feature.
* Third-party-heavy component.

## Interview-ready answer

Code splitting breaks the app bundle into smaller chunks so users do not download all code upfront. Route-level splitting is the most common approach. It improves initial load performance, especially in large React applications.

---

## 10. Lazy Loading

## Simple meaning

Lazy loading means loading code, images, or data only when needed.

## React.lazy

const SettingsPage \= React.lazy(() \=\> import("./SettingsPage"));

Usage:

\<React.Suspense fallback=\{\<p\>Loading settings...\</p\>\}\>

  \<SettingsPage /\>

\</React.Suspense\>

## Lazy loading images

\<img src="/hero.jpg" alt="Hero" loading="lazy" /\>

## Lazy loading heavy components

const Chart \= React.lazy(() \=\> import("./Chart"));

## Interview-ready answer

Lazy loading delays loading code or assets until they are needed. In React, `React.lazy` with `Suspense` is commonly used to lazy load route components or heavy UI modules. It reduces initial bundle size and improves first load performance.

---

## 11. Suspense

## Simple meaning

`Suspense` shows fallback UI while a lazy component or suspended resource is loading.

\<React.Suspense fallback=\{\<p\>Loading...\</p\>\}\>

  \<LazyComponent /\>

\</React.Suspense\>

## Common use

const Reports \= React.lazy(() \=\> import("./Reports"));

function App() \{

  return (

    \<React.Suspense fallback=\{\<PageLoader /\>\}\>

      \<Reports /\>

    \</React.Suspense\>

  );

\}

## Good fallback UX

Avoid layout jump.

Better:

Use skeleton loader

Reserve space

Show route-level loader

Keep previous UI when possible

## Suspense is not Error Boundary

Suspense handles loading.

Error Boundary handles errors.

Loading problem → Suspense fallback

Render error → Error Boundary fallback

## Interview-ready answer

Suspense lets React show fallback UI while a lazy-loaded component or suspended part of the tree is not ready. It is commonly used with `React.lazy` for code splitting. Suspense is for loading states, not error handling.

---

## 12. Virtualization

## Simple meaning

Virtualization means rendering only visible items from a large list instead of rendering the entire list.

## Problem

\{items.map((item) \=\> (

  \<Row key=\{item.id\} item=\{item\} /\>

))\}

If `items` has 50,000 rows, rendering all rows is expensive.

## Virtualized idea

Total rows: 50,000

Visible rows: 20

Render only 20-40 rows at a time

Fake full height using container

Update visible rows while scrolling

## When to use virtualization

Use it for:

* Large tables.
* Infinite lists.
* Logs.
* Search results.
* Dropdowns with many options.
* File explorer.
* Chat history.
* Grid/list views.

## Benefits

* Faster initial render.
* Less DOM memory.
* Smooth scrolling.
* Better responsiveness.
* Lower browser layout/paint cost.

## Trade-offs

* More implementation complexity.
* Dynamic row height is harder.
* Accessibility needs care.
* Browser find/search may not find non-rendered rows.
* SEO not suitable for all content lists.
* Keyboard navigation needs handling.

## Interview-ready answer

Virtualization improves large list performance by rendering only the visible rows instead of the entire list. It reduces DOM nodes, memory usage, layout cost, and rendering time. It is useful for tables, logs, search results, dropdowns, file explorers, and large feeds.

---

## 13. react-window

## Simple meaning

`react-window` is a lightweight virtualization library for rendering large lists and grids.

## Fixed size list example

\import \{ FixedSizeList as List \} from "react-window";

type RowProps \= \{

  index: number;

  style: React.CSSProperties;

\};

function Row(\{ index, style \}: RowProps) \{

  return (

    \<div style=\{style\}\>

      Row \{index\}

    \</div\>

  );

\}

function VirtualizedList() \{

  return (

    \<List

      height=\{400\}

      itemCount=\{10000\}

      itemSize=\{35\}

      width=\{300\}

    \>

      \{Row\}

    \</List\>

  );

\}

## Key point

The `style` prop is important.

\<div style=\{style\}\>Row content\</div\>

`react-window` uses it to position rows correctly.

## Use react-window when

* You need simple list/grid virtualization.
* Row height is fixed or manageable.
* You want lighter API.
* You do not need many advanced features.

## Interview-ready answer

`react-window` is a lightweight library for virtualizing large lists and grids. It renders only visible items and uses positioning styles internally. It is usually preferred when we need simple and fast virtualization with less overhead.

---

## 14. react-virtualized

## Simple meaning

`react-virtualized` is an older, feature-rich virtualization library.

It supports large lists, grids, tables, auto-sizing, cell measuring, and more advanced cases.

## Use react-virtualized when

* You need advanced table/grid features.
* Dynamic row heights are important.
* You need mature utilities like auto sizer or cell measurer.
* Existing project already uses it.

## react-window vs react-virtualized

| Point | react-window | react-virtualized |
| ----- | ----- | ----- |
| Size | Smaller | Larger |
| API | Simpler | More feature-rich |
| Best for | Simple lists/grids | Advanced grids/tables |
| Complexity | Lower | Higher |
| Modern preference | Often preferred for simple cases | Useful for complex legacy/advanced cases |

## Interview-ready answer

`react-window` is smaller and simpler, while `react-virtualized` is more feature-rich. For most simple large-list use cases, I would choose `react-window`. For complex grids, dynamic measurements, or existing legacy code, `react-virtualized` may still be useful.

---

## 15. Large List Optimization

## Problem

Rendering a huge list directly creates too many DOM nodes.

Bad:

function ProductList(\{ products \}: \{ products: Product\[\] \}) \{

  return (

    \<div\>

      \{products.map((product) \=\> (

        \<ProductCard key=\{product.id\} product=\{product\} /\>

      ))\}

    \</div\>

  );

\}

## Better options

Use:

Pagination

Infinite scrolling

Virtualization

Server-side filtering/sorting

Debounced search

Memoized row components

Stable keys

Avoid heavy logic inside row render

## Row optimization

const ProductRow \= React.memo(function ProductRow(\{

  product,

\}: \{

  product: Product;

\}) \{

  return \<div\>\{product.name\}\</div\>;

\});

## Stable key

\<ProductRow key=\{product.id\} product=\{product\} /\>

Avoid index keys if list can reorder.

## Interview-ready answer

For large lists, I avoid rendering all items at once. I use pagination, infinite scroll, or virtualization depending on UX. I keep row components lightweight, use stable keys, avoid expensive logic during row rendering, and memoize rows only when profiling shows benefit.

---

## 16. Performance Profiling

## Simple meaning

Performance profiling means measuring where time is spent before optimizing.

## What to check

Which component re-rendered?

Why did it re-render?

How long did rendering take?

Which interaction was slow?

Is the bottleneck React, JavaScript, network, layout, or bundle size?

## Tools

* React DevTools Profiler.
* Browser Performance tab.
* Lighthouse.
* Web Vitals.
* Bundle analyzer.
* Network tab.
* Real user monitoring.
* Logging/monitoring tools.

## Profiling process

1\. Reproduce slow interaction

2\. Record profile

3\. Find expensive components

4\. Check why they rendered

5\. Apply focused optimization

6\. Measure again

## Interview-ready answer

I profile before optimizing. I reproduce the slow interaction, record it with React DevTools Profiler or browser Performance tools, identify which components rendered and why, apply a targeted fix, and measure again to confirm improvement.

---

## 17. React DevTools Profiler

## Simple meaning

React DevTools Profiler helps identify component render performance issues.

## What it shows

* Which components rendered.
* How long each render took.
* Commit duration.
* Render frequency.
* Interaction causing updates.
* Components that rendered unnecessarily.

## How I use it

Open React DevTools Profiler

Start recording

Perform slow action

Stop recording

Inspect commits

Find expensive components

Check props/state/context changes

Optimize

Record again

## Common findings

Parent re-render caused expensive child re-render

Context update re-rendered many consumers

Large list rendered too many rows

Expensive filtering happened on every render

Unstable object/function props broke memoization

## Interview-ready answer

React DevTools Profiler helps measure rendering performance. It shows which components rendered, how long they took, and which commits were expensive. I use it to verify the actual bottleneck before applying memoization or architectural changes.

---

## 18. Rendering Optimization

## Simple meaning

Rendering optimization means reducing unnecessary render work or making render work cheaper.

## Techniques

### 1. Keep render pure and light

Avoid expensive work directly inside render.

Bad:

const sortedUsers \= users.sort(sortByName);

This mutates and recalculates during render.

Better:

const sortedUsers \= React.useMemo(() \=\> \{

  return \[...users\].sort(sortByName);

\}, \[users\]);

### 2. Split components

Move frequently changing state down.

### 3. Memoize expensive children

Use `React.memo`.

### 4. Avoid unstable props

Use stable objects/functions where needed.

### 5. Use context carefully

Split context by update frequency.

### 6. Use transitions for non-urgent updates

const \[isPending, startTransition\] \= React.useTransition();

startTransition(() \=\> \{

  setSearchQuery(value);

\});

### 7. Use deferred values for expensive results

const deferredQuery \= React.useDeferredValue(query);

## Interview-ready answer

Rendering optimization means reducing render frequency and render cost. I keep render logic pure and cheap, move state closer to usage, split components, memoize expensive subtrees, stabilize props, split context, virtualize large lists, and use transitions for non-urgent rendering.

---

## 19. Architecture Decisions for Performance

## Simple meaning

Performance is not only hooks. Architecture affects performance more.

## Good architecture decisions

### 1. Route-level code splitting

Large features should load only when needed.

### 2. Feature-based structure

Keeps state and code scoped to features.

### 3. Server-state caching

Use tools like RTK Query, React Query, SWR, or Apollo.

### 4. State ownership

Do not put everything in global state.

### 5. Design system

Shared optimized components prevent duplicate poor implementations.

### 6. Bundle governance

Track bundle size and avoid heavy dependencies.

### 7. Microfrontend boundaries

Avoid duplicating React and shared libraries across MFEs.

### 8. Performance budgets

Define acceptable bundle size, render time, and Core Web Vitals targets.

## Interview-ready answer

At senior level, React performance is not just `useMemo`. Architecture decisions like route splitting, state boundaries, server-state caching, bundle governance, design-system quality, and microfrontend dependency sharing have a bigger long-term impact.

---

## 20. Large Scale State Management

## Performance problem

Bad state management can cause wide re-renders.

Example:

\<AppContext.Provider value=\{\{ user, theme, filters, notifications \}\}\>

Any value change can re-render many consumers.

## Better options

### Split context

\<AuthProvider\>

  \<ThemeProvider\>

    \<FilterProvider\>

      \{children\}

    \</FilterProvider\>

  \</ThemeProvider\>

\</AuthProvider\>

### Use selectors

const userName \= useSelector((state) \=\> state.user.name);

### Use server-state tools

API data

→ React Query / RTK Query / SWR / Apollo

UI/client state

→ useState / useReducer / Context / Redux / Zustand

### Keep state local when possible

Modal open state should not be global unless many features need it.

## Interview-ready answer

For large-scale state performance, I separate client state from server state, keep state as local as possible, split contexts, use selectors in Redux/Zustand, and avoid making every update global. This reduces unnecessary re-renders and keeps the app easier to maintain.

---

## 21. Scaling React Teams

## Simple meaning

Scaling performance also means scaling engineering practices.

## Team-level practices

* Feature ownership.
* Shared component library.
* Design system.
* Performance budgets.
* Bundle analysis in CI.
* Code review checklist.
* Storybook for UI components.
* Testing standards.
* Monitoring dashboards.
* Clear state management rules.
* Architecture decision records.
* Avoid uncontrolled dependency growth.

## Example code review checklist

Is this state local or unnecessarily global?

Does this route need lazy loading?

Is this list too large to render directly?

Are we passing unstable props to memoized children?

Is context too broad?

Is this dependency heavy?

Did we measure before optimizing?

## Interview-ready answer

Scaling React teams requires technical and process decisions. I use feature ownership, design-system components, shared performance guidelines, bundle budgets, profiling practices, code review checklists, and clear state management rules so performance does not depend only on individual developers.

---

## Common Interview Topics / Questions

---

## 1. React.memo vs useMemo

## Answer

`React.memo` memoizes a component. `useMemo` memoizes a value.

const UserCard \= React.memo(function UserCard(\{ user \}: \{ user: User \}) \{

  return \<h2\>\{user.name\}\</h2\>;

\});

const activeUsers \= React.useMemo(() \=\> \{

  return users.filter((user) \=\> user.active);

\}, \[users\]);

## Interview-ready answer

`React.memo` is used to skip re-rendering a component when props are unchanged. `useMemo` is used inside a component to cache the result of an expensive calculation or keep an object/array reference stable. One works at component level, the other works at value level.

---

## 2. useMemo vs useCallback

## Answer

`useMemo` caches a value. `useCallback` caches a function reference.

const filteredUsers \= React.useMemo(() \=\> \{

  return users.filter((user) \=\> user.active);

\}, \[users\]);

const handleClick \= React.useCallback(() \=\> \{

  console.log("clicked");

\}, \[\]);

## Interview-ready answer

`useMemo` returns a memoized value, while `useCallback` returns a memoized function. Use `useMemo` for expensive calculations and stable objects. Use `useCallback` when function identity matters, usually with memoized child components or dependency arrays.

---

## 3. How do you optimize a large list?

## Answer

For large lists, I use:

Pagination

Infinite scroll

Virtualization

Stable keys

Lightweight row components

Memoized rows if needed

Server-side filtering/sorting

Debounced search

Avoid expensive row render logic

## Interview-ready answer

I avoid rendering thousands of DOM nodes at once. I use virtualization with libraries like `react-window` or `react-virtualized`, or pagination/infinite scroll depending on UX. I keep row components light, use stable keys, avoid expensive logic in rows, and measure performance before and after.

---

## 4. How do you identify unnecessary re-renders?

## Answer

Use React DevTools Profiler.

Check:

Which component rendered?

Why did it render?

How long did it take?

Did props/state/context change?

Is parent causing child re-render?

## Interview-ready answer

I use React DevTools Profiler to record the slow interaction and inspect render commits. It shows which components rendered and how expensive they were. Then I check whether the re-render was caused by state, props, parent render, context, or unstable references.

---

## 5. How do you optimize route loading?

## Answer

Use route-level code splitting.

const ReportsPage \= React.lazy(() \=\> import("./ReportsPage"));

Wrap with Suspense.

\<React.Suspense fallback=\{\<PageLoader /\>\}\>

  \<ReportsPage /\>

\</React.Suspense\>

## Interview-ready answer

I optimize route loading by splitting large route components into separate chunks using `React.lazy` and `Suspense`. This reduces the initial bundle and loads heavy pages only when users visit them.

---

## 6. How do you optimize context performance?

## Answer

Avoid one huge context. Split providers by purpose and update frequency.

Bad:

\<AppContext.Provider value=\{\{ user, theme, filters, cart \}\}\>

Better:

\<AuthProvider\>

  \<ThemeProvider\>

    \<CartProvider\>\{children\}\</CartProvider\>

  \</ThemeProvider\>

\</AuthProvider\>

## Interview-ready answer

Context updates can re-render all consumers using that context. To optimize it, I split contexts by domain and update frequency, memoize provider values, and avoid putting frequently changing large state into one global context.

---

## 7. How do senior engineers approach React performance?

## Answer

Senior engineers optimize at multiple levels:

Component level

State level

Route/bundle level

API/cache level

Architecture level

Team/process level

## Interview-ready answer

At senior level, I do not jump directly to hooks. I first measure, then identify whether the bottleneck is rendering, state design, API calls, bundle size, list size, or architecture. Then I choose the right fix and validate with profiling.

---

## 8. How do you make architecture decisions for frontend performance?

## Answer

I consider:

* User impact.
* Data size.
* Team ownership.
* Bundle size.
* Runtime cost.
* State scope.
* Reusability.
* Maintainability.
* Monitoring.
* Future scale.

## Interview-ready answer

Frontend architecture decisions should balance performance and maintainability. I choose local state over global when possible, server-state tools for API data, route splitting for large features, design-system components for consistency, and microfrontends only when team ownership and independent deployment justify the complexity.

---

## Quick Revision Summary

| Topic | Key point |
| ----- | ----- |
| React.memo | Memoizes component |
| useMemo | Memoizes calculated value |
| useCallback | Memoizes function reference |
| Code splitting | Split bundle into chunks |
| Lazy loading | Load code/assets when needed |
| Suspense | Loading fallback boundary |
| Virtualization | Render only visible list rows |
| react-window | Lightweight virtualization |
| react-virtualized | Feature-rich virtualization |
| Re-render prevention | State placement, memo, stable props |
| Profiling | Measure before optimizing |
| DevTools Profiler | Find expensive renders |
| Rendering optimization | Reduce render count/cost |
| Architecture decisions | State, bundle, cache, ownership |
| Large scale state | Split state and use selectors |
| Scaling teams | Standards, budgets, ownership |

---

## Final Interview-Ready Combined Answer

React performance optimization starts with measurement. I first use React DevTools Profiler, browser Performance tools, Lighthouse, bundle analyzer, or monitoring data to find the real bottleneck. At component level, I use `React.memo` to skip expensive child re-renders, `useMemo` to cache expensive calculated values, and `useCallback` to keep function references stable when needed. For loading performance, I use code splitting, lazy loading, and Suspense. For large lists, I use pagination, infinite scroll, or virtualization with tools like `react-window` or `react-virtualized`. To prevent unnecessary re-renders, I improve state placement, split components, split context, use selectors, and avoid unstable props. At senior/staff level, performance is also an architecture topic: route-level splitting, server-state caching, bundle governance, design-system quality, scalable state management, and team-wide performance standards matter more than blindly adding memoization.

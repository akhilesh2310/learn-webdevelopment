---
title: Component Communication Patterns
sidebar_position: 6
---

# Component Communication Patterns

Related pages: [State Management](state-management.md), [Advanced React Patterns](advanced-react-patterns.md), [React Hooks](react-hooks.md).

## Ownership

Use this page for communication decisions: parent to child, child to parent, siblings, Context, refs, cross-component communication, and when to lift state or use global state.

Use [Advanced React Patterns](advanced-react-patterns.md) for deep reusable pattern design such as compound components, provider pattern, headless components, and custom hooks.

## 6. Component Communication Patterns

## Parent to Child

## Child to Parent

## Sibling Communication

## Context Communication

## Ref Communication

## Compound Components

## Common Interview Topics

* Cross-component communication

## Component Communication Patterns in React

Component communication means how data, events, and behavior move between components. In React, the default model is **one-way data flow**: parent passes data down using props, and child sends events up using callbacks.

The most common communication patterns are:

Parent to Child

Child to Parent

Sibling Communication

Context Communication

Ref Communication

Compound Components

---

## 1. Parent to Child Communication

## Simple meaning

Parent passes data to child using props.

function Parent() \{

  const user \= \{

    name: "Akhilesh",

    role: "Admin",

  \};

  return \<UserCard user=\{user\} /\>;

\}

function UserCard(\{ user \}) \{

  return (

    \<div\>

      \<h2\>\{user.name\}\</h2\>

      \<p\>\{user.role\}\</p\>

    \</div\>

  );

\}

## Key mental model

Parent owns data

      ↓

Child receives data as props

Props are read-only from the child’s perspective.

## Passing functions as props

Parent can also pass functions to child.

function Parent() \{

  function handleSave() \{

    console.log("Saved");

  \}

  return \<SaveButton onSave=\{handleSave\} /\>;

\}

function SaveButton(\{ onSave \}) \{

  return \<button onClick=\{onSave\}\>Save\</button\>;

\}

## Interview-ready answer

Parent-to-child communication happens through props. The parent owns the data and passes it to the child. The child should treat props as read-only and use them to render UI or call callback functions.

---

## 2. Child to Parent Communication

## Simple meaning

Child communicates with parent by calling a callback function passed by the parent.

function Parent() \{

  const \[message, setMessage\] \= React.useState("");

  function handleMessageChange(value) \{

    setMessage(value);

  \}

  return (

    \<\>

      \<Child onMessageChange=\{handleMessageChange\} /\>

      \<p\>Message: \{message\}\</p\>

    \</\>

  );

\}

function Child(\{ onMessageChange \}) \{

  return (

    \<input

      onChange=\{(event) \=\> onMessageChange(event.target.value)\}

    /\>

  );

\}

## Key mental model

Parent passes callback

      ↓

Child calls callback

      ↓

Parent updates state

      ↓

Updated state flows down again

## Practical example

function TodoPage() \{

  const \[todos, setTodos\] \= React.useState(\[\]);

  function addTodo(title) \{

    setTodos((prev) \=\> \[...prev, \{ id: Date.now(), title \}\]);

  \}

  return \<TodoForm onAddTodo=\{addTodo\} /\>;

\}

function TodoForm(\{ onAddTodo \}) \{

  const \[title, setTitle\] \= React.useState("");

  function handleSubmit(event) \{

    event.preventDefault();

    onAddTodo(title);

    setTitle("");

  \}

  return (

    \<form onSubmit=\{handleSubmit\}\>

      \<input

        value=\{title\}

        onChange=\{(event) \=\> setTitle(event.target.value)\}

      /\>

      \<button\>Add\</button\>

    \</form\>

  );

\}

## Interview-ready answer

Child-to-parent communication is done by passing a callback from the parent to the child. The child calls the callback with data, and the parent updates its state. This keeps state ownership clear and follows React’s one-way data flow.

---

## 3. Sibling Communication

## Simple meaning

Sibling components cannot directly communicate with each other. Their shared state should usually be moved to the nearest common parent.

## Problem

SearchInput       ResultsList

    ↓                 ↑

Needs to share search query

## Solution: lift state up

function SearchPage() \{

  const \[query, setQuery\] \= React.useState("");

  return (

    \<\>

      \<SearchInput query=\{query\} onQueryChange=\{setQuery\} /\>

      \<ResultsList query=\{query\} /\>

    \</\>

  );

\}

function SearchInput(\{ query, onQueryChange \}) \{

  return (

    \<input

      value=\{query\}

      onChange=\{(event) \=\> onQueryChange(event.target.value)\}

    /\>

  );

\}

function ResultsList(\{ query \}) \{

  return \<p\>Showing results for: \{query\}\</p\>;

\}

## Key mental model

Sibling A event

      ↓

Parent state update

      ↓

Sibling B receives updated props

## When lifting state is enough

Use this when:

* Siblings are close in the component tree.
* Only a few components need the shared state.
* State is not truly global.
* Data flow is still easy to understand.

## Interview-ready answer

Sibling communication usually happens by lifting state to the nearest common parent. One sibling updates the parent through a callback, and the parent passes the updated state to the other sibling through props.

---

## 4. Context Communication

## Simple meaning

Context allows deeply nested components to access shared data without passing props through every level.

## Basic example

const ThemeContext \= React.createContext("light");

function App() \{

  return (

    \<ThemeContext.Provider value="dark"\>

      \<Layout /\>

    \</ThemeContext.Provider\>

  );

\}

function Layout() \{

  return \<Header /\>;

\}

function Header() \{

  return \<ThemeButton /\>;

\}

function ThemeButton() \{

  const theme \= React.useContext(ThemeContext);

  return \<button className=\{theme\}\>Theme: \{theme\}\</button\>;

\}

## Key mental model

Context solves prop drilling.

Instead of passing props through many intermediate components, deeply nested components can directly read shared context.

Provider

  ↓

Any nested consumer can read value

## Good use cases

* Theme
* Auth user
* Locale/language
* Permissions
* Feature flags
* App configuration
* Design system settings

## Common mistake

Do not use one huge context for frequently changing state.

\<AppContext.Provider value=\{\{ user, theme, filters, cart, notifications \}\}\>

This can cause unnecessary re-renders.

Better:

\<AuthProvider\>

  \<ThemeProvider\>

    \<CartProvider\>\{children\}\</CartProvider\>

  \</ThemeProvider\>

\</AuthProvider\>

## Memoize context value

function AuthProvider(\{ children \}) \{

  const \[user, setUser\] \= React.useState(null);

  const value \= React.useMemo(() \=\> \{

    return \{ user, setUser \};

  \}, \[user\]);

  return (

    \<AuthContext.Provider value=\{value\}\>

      \{children\}

    \</AuthContext.Provider\>

  );

\}

## Interview-ready answer

Context is used for deeply shared values and avoiding prop drilling. It is good for theme, auth, locale, permissions, and configuration. But it should not be overused for frequently changing large state because context updates can re-render many consumers.

---

## 5. Ref Communication

## Simple meaning

Refs allow a parent to directly access a DOM node or imperative methods exposed by a child.

React prefers declarative communication through props, but refs are useful for specific imperative actions.

## DOM ref example

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

## Parent accessing child with forwardRef

const CustomInput \= React.forwardRef(function CustomInput(props, ref) \{

  return \<input ref=\{ref\} /\>;

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

## Exposing custom methods with useImperativeHandle

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

      \<button onClick=\{() \=\> inputRef.current.clear()\}\>

        Clear

      \</button\>

    \</\>

  );

\}

## Good use cases

* Focus an input.
* Scroll to an element.
* Measure DOM size.
* Control media player.
* Integrate third-party libraries.
* Expose limited imperative methods from reusable components.

## Common mistake

Do not use refs to replace normal React data flow.

Bad:

childRef.current.setUser(user);

Better:

\<Child user=\{user\} /\>

## Interview-ready answer

Ref communication is used for imperative actions like focus, scroll, measuring DOM, media controls, or third-party integrations. For normal data flow, props and state should be preferred. If a child needs to expose limited methods, use `forwardRef` with `useImperativeHandle`.

---

## 6. Compound Components

## Simple meaning

Compound components are components that work together under one parent and share internal state implicitly.

Example API:

\<Tabs\>

  \<Tabs.List\>

    \<Tabs.Tab value="profile"\>Profile\</Tabs.Tab\>

    \<Tabs.Tab value="settings"\>Settings\</Tabs.Tab\>

  \</Tabs.List\>

  \<Tabs.Panel value="profile"\>Profile content\</Tabs.Panel\>

  \<Tabs.Panel value="settings"\>Settings content\</Tabs.Panel\>

\</Tabs\>

## Key mental model

Compound components make related components feel like one flexible component system.

The parent manages state. Child components communicate through context.

## Basic implementation

const TabsContext \= React.createContext(null);

function Tabs(\{ children, defaultValue \}) \{

  const \[activeTab, setActiveTab\] \= React.useState(defaultValue);

  const value \= React.useMemo(() \=\> \{

    return \{

      activeTab,

      setActiveTab,

    \};

  \}, \[activeTab\]);

  return (

    \<TabsContext.Provider value=\{value\}\>

      \{children\}

    \</TabsContext.Provider\>

  );

\}

function Tab(\{ value, children \}) \{

  const context \= React.useContext(TabsContext);

  const isActive \= context.activeTab \=== value;

  return (

    \<button

      type="button"

      aria-selected=\{isActive\}

      onClick=\{() \=\> context.setActiveTab(value)\}

    \>

      \{children\}

    \</button\>

  );

\}

function Panel(\{ value, children \}) \{

  const context \= React.useContext(TabsContext);

  if (context.activeTab \!== value) \{

    return null;

  \}

  return \<div\>\{children\}\</div\>;

\}

Tabs.Tab \= Tab;

Tabs.Panel \= Panel;

Usage:

function App() \{

  return (

    \<Tabs defaultValue="profile"\>

      \<Tabs.Tab value="profile"\>Profile\</Tabs.Tab\>

      \<Tabs.Tab value="settings"\>Settings\</Tabs.Tab\>

      \<Tabs.Panel value="profile"\>Profile content\</Tabs.Panel\>

      \<Tabs.Panel value="settings"\>Settings content\</Tabs.Panel\>

    \</Tabs\>

  );

\}

## Why compound components are useful

* Clean component API.
* Flexible composition.
* Avoids prop drilling.
* Parent manages shared state.
* Children stay declarative.
* Useful for design systems.

## Common use cases

* Tabs
* Accordion
* Menu
* Select
* Modal
* Dropdown
* Stepper
* Radio group
* Carousel

## Interview-ready answer

Compound components are a pattern where related components work together under a shared parent. The parent manages shared state, and child components access it through context. This creates a flexible and readable API, commonly used in design systems for tabs, accordions, menus, dropdowns, and modals.

---

## 7. Cross-Component Communication

## Simple meaning

Cross-component communication means sharing data or events between components that may not have a direct parent-child relationship.

## Common options

Nearby components

→ Lift state up

Deeply nested components

→ Context

Complex global client state

→ Redux / Zustand

Server state

→ React Query / RTK Query / SWR / Apollo

Imperative DOM action

→ Refs

Decoupled events

→ Event bus / PubSub

Microfrontends

→ Shared store / events / platform contract

## Example decision

### Case 1: Parent controls modal

function Page() \{

  const \[isOpen, setIsOpen\] \= React.useState(false);

  return (

    \<\>

      \<button onClick=\{() \=\> setIsOpen(true)\}\>Open\</button\>

      \<Modal isOpen=\{isOpen\} onClose=\{() \=\> setIsOpen(false)\} /\>

    \</\>

  );

\}

Use props because parent owns the modal state.

### Case 2: Theme used everywhere

Use Context.

\<ThemeProvider\>

  \<App /\>

\</ThemeProvider\>

### Case 3: Cart state used across app

Use Zustand/Redux/Context depending on complexity.

### Case 4: API data used across pages

Use server-state library like React Query, RTK Query, SWR, or Apollo.

## Interview-ready answer

For cross-component communication, I choose the simplest pattern based on scope. If components are close, I lift state up. If deeply nested components need shared low-frequency data, I use Context. For complex global client state, I use Redux Toolkit or Zustand. For server state, I prefer React Query, RTK Query, SWR, or Apollo. For imperative cases, I use refs, and for decoupled app-wide events, I may use an event bus carefully.

---

## Common Interview Topics / Questions

---

## 1. How do React components communicate?

## Answer

React components communicate mainly through props, callbacks, context, refs, and shared state.

## Interview-ready answer

Parent-to-child communication happens through props. Child-to-parent communication happens through callback props. Sibling communication usually happens by lifting state to the nearest common parent. Deep communication can use Context. Imperative communication can use refs. Complex cross-feature communication may use Redux, Zustand, event bus, or server-state tools depending on the use case.

---

## 2. What is cross-component communication?

## Answer

Cross-component communication means sharing data, updates, or events between components that are not directly connected.

## Interview-ready answer

Cross-component communication can be handled by lifting state up, Context API, global state libraries like Redux or Zustand, refs for imperative actions, or event bus patterns for decoupled communication. The correct choice depends on how far the components are, how frequently data changes, and who should own the state.

---

## 3. How does child update parent state?

## Answer

The parent passes a callback to the child. The child calls that callback.

function Parent() \{

  const \[value, setValue\] \= React.useState("");

  return \<Child onChange=\{setValue\} /\>;

\}

function Child(\{ onChange \}) \{

  return (

    \<input onChange=\{(event) \=\> onChange(event.target.value)\} /\>

  );

\}

## Interview-ready answer

A child cannot directly modify parent state. The parent passes a callback, and the child calls it with the required data. The parent updates its state and passes the new value back down as props.

---

## 4. How do siblings communicate?

## Answer

Siblings communicate through their common parent.

Sibling A → Parent state → Sibling B

## Interview-ready answer

Sibling components should communicate by lifting shared state to their nearest common parent. One sibling triggers state changes using a callback, and the other sibling receives updated data through props.

---

## 5. When should you use Context?

## Answer

Use Context when many deeply nested components need the same shared value.

Good examples:

* Theme
* Auth
* Locale
* Feature flags
* Permissions
* App config

## Interview-ready answer

Context is useful when prop drilling becomes painful for shared values used across many levels. I use it for low-frequency global values like theme, auth, locale, permissions, and app configuration. I avoid putting frequently changing large state into one context because it can cause unnecessary re-renders.

---

## 6. When should you use refs for communication?

## Answer

Use refs for imperative actions, not normal data flow.

Good examples:

* Focus input
* Scroll to section
* Measure DOM
* Play/pause video
* Clear an input
* Integrate third-party widget

## Interview-ready answer

Refs are useful when the parent needs to perform an imperative action on a child or DOM node. For normal data communication, props and state should be preferred. Refs should be used carefully because they bypass React’s normal declarative data flow.

---

## 7. What are compound components?

## Answer

Compound components are related components that share state under a common parent and provide a clean, flexible API.

Example:

\<Tabs defaultValue="profile"\>

  \<Tabs.Tab value="profile"\>Profile\</Tabs.Tab\>

  \<Tabs.Panel value="profile"\>Profile content\</Tabs.Panel\>

\</Tabs\>

## Interview-ready answer

Compound components are a composition pattern where a parent component manages shared state and child components access it, usually through context. This pattern is useful for building flexible design-system components like Tabs, Accordion, Select, Dropdown, Menu, Modal, and Stepper.

---

## 8. Props drilling vs Context

## Simple comparison

| Point | Prop Drilling | Context |
| ----- | ----- | ----- |
| Data passing | Through each level | Direct from provider |
| Best for | Few levels | Deeply nested consumers |
| Explicitness | Very explicit | Less explicit |
| Re-render control | Easier to localize | Needs care |
| Use case | Normal parent-child flow | Theme, auth, locale |

## Interview-ready answer

Prop drilling means passing props through intermediate components that do not need the data. Context avoids this by allowing deeply nested components to read data from a provider. Props are still preferred for normal direct communication because they are explicit. Context is better for deeply shared values.

---

## 9. Event bus in React: good or bad?

## Answer

Event bus can be useful, but overuse makes data flow hidden.

Good use cases:

* Analytics events
* Toast notifications
* Microfrontend communication
* Legacy integration
* Cross-cutting app events

Avoid it for normal parent-child or sibling communication.

## Interview-ready answer

An event bus can help with decoupled cross-module communication, but it should be used carefully. For normal React data flow, props, callbacks, Context, or state management libraries are usually better. Overusing event bus can make the app harder to debug because data flow becomes hidden.

---

## Quick Revision Summary

| Pattern | Best use case |
| ----- | ----- |
| Parent to child | Pass data using props |
| Child to parent | Pass callback from parent |
| Sibling communication | Lift state to common parent |
| Context | Deep shared values |
| Ref communication | Imperative actions |
| Compound components | Flexible reusable component APIs |
| Redux/Zustand | Complex global client state |
| React Query/RTK Query | Server state |
| Event bus | Decoupled app-wide events |
| Prop drilling | Passing props through many levels |

---

## Final Interview-Ready Combined Answer

React component communication follows one-way data flow. Parent-to-child communication happens through props. Child-to-parent communication happens through callback props. Sibling communication usually happens by lifting state to the nearest common parent. Context is useful when deeply nested components need shared values like theme, auth, locale, permissions, or configuration. Refs are used for imperative actions like focus, scroll, measuring DOM, or exposing limited child methods with `forwardRef` and `useImperativeHandle`. Compound components use a shared parent and context to create flexible APIs for components like Tabs, Accordion, Select, Menu, and Modal. For complex cross-component communication, choose the simplest solution based on scope: lift state up for nearby components, Context for deep shared values, Redux/Zustand for global client state, server-state tools for API data, and event bus only for carefully controlled decoupled events.

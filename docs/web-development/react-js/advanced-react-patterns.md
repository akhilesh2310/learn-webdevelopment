---
title: Advanced React Patterns
sidebar_position: 9
---

# Advanced React Patterns

Related pages: [Component Communication Patterns](component-communication-patterns.md), [React Hooks](react-hooks.md), [React Architecture](react-architecture.md).

## Ownership

Use this page for reusable React patterns such as HOC, render props, custom hooks, compound components, provider pattern, controlled component pattern, and headless components.

Use [Component Communication Patterns](component-communication-patterns.md) for deciding how components pass data, callbacks, refs, context, or events between each other.

# **9\. Advanced React Patterns**

## **Higher Order Components (HOC)**

## **Render Props**

## **Compound Components**

## **Custom Hooks Pattern**

## **Provider Pattern**

## **Controlled Component Pattern**

## **Headless Components**

## **Common Interview Topics**

* HOC vs Custom Hooks  
* Render Props

# **Advanced React Patterns**

Advanced React patterns help us reuse logic, compose flexible components, and separate behavior from UI. In modern React, **custom hooks and composition are usually preferred**, but older patterns like **HOC** and **Render Props** are still important because many libraries and legacy codebases use them.

---

# **1\. Higher Order Components**

## **Simple meaning**

A Higher Order Component, or HOC, is a function that takes a component and returns a new enhanced component.

const EnhancedComponent \= withFeature(BaseComponent);

## **Basic example**

function withLogger(WrappedComponent) \{  
  return function EnhancedComponent(props) \{  
    console.log("Props:", props);

    return \<WrappedComponent \{...props\} /\>;  
  \};  
\}

function UserCard(\{ name \}) \{  
  return \<h2\>\{name\}\</h2\>;  
\}

const UserCardWithLogger \= withLogger(UserCard);

Usage:

\<UserCardWithLogger name="Akhilesh" /\>

## **Key mental model**

HOC wraps a component and adds extra behavior.

Original Component  
      ↓  
HOC adds behavior  
      ↓  
Enhanced Component

## **Practical use cases**

* Authentication wrapper.  
* Permission-based rendering.  
* Logging.  
* Analytics.  
* Feature flags.  
* Error tracking.  
* Injecting common props.  
* Legacy code reuse.

## **Example: auth HOC**

function withAuth(WrappedComponent) \{  
  return function AuthenticatedComponent(props) \{  
    const user \= useAuthUser();

    if (\!user) \{  
      return \<p\>Please login\</p\>;  
    \}

    return \<WrappedComponent \{...props\} user=\{user\} /\>;  
  \};  
\}

## **Common problems with HOC**

* Wrapper hell.  
* Prop name collisions.  
* Harder debugging.  
* Component tree becomes deeper.  
* Static methods need hoisting.  
* TypeScript typing can become complex.

## **Interview-ready answer**

A Higher Order Component is a function that takes a component and returns a new component with added behavior. HOCs are useful for cross-cutting concerns like auth, permissions, logging, and feature flags, but in modern React, custom hooks are often preferred because they reuse logic without adding wrapper components.

---

# **2\. Render Props**

## **Simple meaning**

Render Props is a pattern where a component receives a function prop and uses that function to decide what to render.

\<DataProvider render=\{(data) \=\> \<UI data=\{data\} /\>\} /\>

## **Basic example**

function MouseTracker(\{ render \}) \{  
  const \[position, setPosition\] \= React.useState(\{  
    x: 0,  
    y: 0,  
  \});

  function handleMouseMove(event) \{  
    setPosition(\{  
      x: event.clientX,  
      y: event.clientY,  
    \});  
  \}

  return (  
    \<div onMouseMove=\{handleMouseMove\}\>  
      \{render(position)\}  
    \</div\>  
  );  
\}

Usage:

\<MouseTracker  
  render=\{(position) \=\> (  
    \<p\>  
      X: \{position.x\}, Y: \{position.y\}  
    \</p\>  
  )\}  
/\>

## **Children as function**

Render props are often written using `children`.

function Toggle(\{ children \}) \{  
  const \[isOn, setIsOn\] \= React.useState(false);

  return children(\{  
    isOn,  
    toggle: () \=\> setIsOn((prev) \=\> \!prev),  
  \});  
\}

Usage:

\<Toggle\>  
  \{(\{ isOn, toggle \}) \=\> (  
    \<button onClick=\{toggle\}\>  
      \{isOn ? "ON" : "OFF"\}  
    \</button\>  
  )\}  
\</Toggle\>

## **Key mental model**

The component owns behavior. The caller controls rendering.

Component provides state/logic  
      ↓  
Render function decides UI

## **Practical use cases**

* Reusable state logic.  
* Flexible UI rendering.  
* Library components.  
* Data fetching wrappers.  
* Toggle/dropdown/tooltip behavior.  
* Older code before hooks.

## **Common problems**

* Nested render props can become hard to read.  
* Inline render functions can affect memoization.  
* Custom hooks are usually simpler now.

## **Interview-ready answer**

Render Props is a pattern where a component shares logic by calling a function prop to render UI. It gives flexibility because the component controls behavior while the consumer controls the rendered output. In modern React, custom hooks often replace render props for logic reuse.

---

# **3\. Compound Components**

## **Simple meaning**

Compound components are multiple components that work together under one parent.

Example API:

\<Tabs defaultValue="profile"\>  
  \<Tabs.List\>  
    \<Tabs.Tab value="profile"\>Profile\</Tabs.Tab\>  
    \<Tabs.Tab value="settings"\>Settings\</Tabs.Tab\>  
  \</Tabs.List\>

  \<Tabs.Panel value="profile"\>Profile content\</Tabs.Panel\>  
  \<Tabs.Panel value="settings"\>Settings content\</Tabs.Panel\>  
\</Tabs\>

## **Key mental model**

Parent manages shared state. Children communicate through context.

Tabs parent owns activeTab  
      ↓  
Tabs.Tab updates activeTab  
      ↓  
Tabs.Panel reads activeTab

## **Basic example**

const TabsContext \= React.createContext(null);

function Tabs(\{ defaultValue, children \}) \{  
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

## **Good use cases**

* Tabs.  
* Accordion.  
* Menu.  
* Dropdown.  
* Modal.  
* Stepper.  
* Select.  
* Radio group.  
* Carousel.

## **Why useful**

* Clean API.  
* Flexible composition.  
* Less prop drilling.  
* Good for design systems.  
* Parent-child relationship is clear.

## **Interview-ready answer**

Compound Components are a pattern where related components work together under a shared parent. The parent manages common state, and children access it through context. This pattern is useful for flexible design-system components like Tabs, Accordion, Menu, Select, and Modal.

---

# **4\. Custom Hooks Pattern**

## **Simple meaning**

A custom hook is a reusable function that contains hook-based logic.

Its name must start with `use`.

function useToggle(initialValue \= false) \{  
  const \[value, setValue\] \= React.useState(initialValue);

  const toggle \= React.useCallback(() \=\> \{  
    setValue((prev) \=\> \!prev);  
  \}, \[\]);

  return \{  
    value,  
    setValue,  
    toggle,  
  \};  
\}

Usage:

function ToggleButton() \{  
  const \{ value, toggle \} \= useToggle();

  return (  
    \<button onClick=\{toggle\}\>  
      \{value ? "ON" : "OFF"\}  
    \</button\>  
  );  
\}

## **Key mental model**

Custom hooks reuse logic, not UI.

Custom Hook \= reusable stateful behavior  
Component \= UI

## **Common custom hook examples**

* `useFetch`  
* `useDebounce`  
* `useLocalStorage`  
* `useWindowSize`  
* `usePrevious`  
* `useAuth`  
* `usePermissions`  
* `useOutsideClick`  
* `useInfiniteScroll`

## **Example: `useDebounce`**

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

## **Why useful**

* Reuses stateful logic.  
* Keeps components clean.  
* Easier testing.  
* Avoids wrapper hell.  
* Works well with TypeScript.  
* Better than HOC/render props for most logic reuse.

## **Interview-ready answer**

Custom hooks are reusable functions that extract hook-based logic from components. They are the preferred modern React pattern for sharing behavior like API fetching, debounce, permissions, localStorage sync, and event listeners. They reuse logic without adding extra components to the tree.

---

# **5\. Provider Pattern**

## **Simple meaning**

The Provider Pattern makes shared data available to many nested components using Context.

\<AuthProvider\>  
  \<App /\>  
\</AuthProvider\>

## **Basic example**

const AuthContext \= React.createContext(null);

function AuthProvider(\{ children \}) \{  
  const \[user, setUser\] \= React.useState(null);

  const login \= React.useCallback((userData) \=\> \{  
    setUser(userData);  
  \}, \[\]);

  const logout \= React.useCallback(() \=\> \{  
    setUser(null);  
  \}, \[\]);

  const value \= React.useMemo(() \=\> \{  
    return \{  
      user,  
      login,  
      logout,  
    \};  
  \}, \[user, login, logout\]);

  return (  
    \<AuthContext.Provider value=\{value\}\>  
      \{children\}  
    \</AuthContext.Provider\>  
  );  
\}

function useAuth() \{  
  const context \= React.useContext(AuthContext);

  if (\!context) \{  
    throw new Error("useAuth must be used inside AuthProvider");  
  \}

  return context;  
\}

Usage:

function Header() \{  
  const \{ user, logout \} \= useAuth();

  return (  
    \<header\>  
      \<span\>\{user?.name\}\</span\>  
      \<button onClick=\{logout\}\>Logout\</button\>  
    \</header\>  
  );  
\}

## **Key mental model**

Provider owns shared state. Custom hook exposes clean access.

Provider stores shared value  
      ↓  
Context makes it available  
      ↓  
Custom hook reads it safely

## **Good use cases**

* Auth.  
* Theme.  
* Locale.  
* Permissions.  
* Feature flags.  
* Design system configuration.  
* App shell settings.

## **Common mistake**

Putting too much frequently changing state in one provider can cause unnecessary re-renders.

## **Interview-ready answer**

The Provider Pattern uses Context to provide shared data or behavior to nested components. A common modern approach is to combine a Provider with a custom hook, such as `AuthProvider` and `useAuth`, to keep usage clean and safe.

---

# **6\. Controlled Component Pattern**

## **Simple meaning**

The Controlled Component Pattern means the parent controls the state, and the child receives value and change handler as props.

function Parent() \{  
  const \[value, setValue\] \= React.useState("");

  return (  
    \<TextInput  
      value=\{value\}  
      onChange=\{setValue\}  
    /\>  
  );  
\}

function TextInput(\{ value, onChange \}) \{  
  return (  
    \<input  
      value=\{value\}  
      onChange=\{(event) \=\> onChange(event.target.value)\}  
    /\>  
  );  
\}

## **Key mental model**

Parent owns state. Child displays value and reports changes.

Parent state  
  ↓  
value prop  
  ↓  
Child UI  
  ↓  
onChange callback  
  ↓  
Parent updates state

## **Useful for reusable components**

function Modal(\{ open, onOpenChange, children \}) \{  
  if (\!open) return null;

  return (  
    \<div role="dialog"\>  
      \{children\}  
      \<button onClick=\{() \=\> onOpenChange(false)\}\>  
        Close  
      \</button\>  
    \</div\>  
  );  
\}

Usage:

function Page() \{  
  const \[open, setOpen\] \= React.useState(false);

  return (  
    \<Modal open=\{open\} onOpenChange=\{setOpen\}\>  
      Content  
    \</Modal\>  
  );  
\}

## **Controlled \+ uncontrolled support**

Reusable libraries often support both.

function Toggle(\{  
  checked,  
  defaultChecked \= false,  
  onCheckedChange,  
\}) \{  
  const \[internalChecked, setInternalChecked\] \=  
    React.useState(defaultChecked);

  const isControlled \= checked \!== undefined;  
  const actualChecked \= isControlled ? checked : internalChecked;

  function updateChecked(nextValue) \{  
    if (\!isControlled) \{  
      setInternalChecked(nextValue);  
    \}

    onCheckedChange?.(nextValue);  
  \}

  return (  
    \<button onClick=\{() \=\> updateChecked(\!actualChecked)\}\>  
      \{actualChecked ? "ON" : "OFF"\}  
    \</button\>  
  );  
\}

## **Interview-ready answer**

The Controlled Component Pattern lets the parent own the state and pass `value` plus `onChange` to the child. It makes reusable components predictable and easy to integrate with forms, filters, modals, tabs, and design-system components.

---

# **7\. Headless Components**

## **Simple meaning**

Headless components provide behavior and state but do not enforce UI styling.

They let the consumer control the markup and design.

## **Key mental model**

Headless component \= logic without visual opinion.

Library/component provides behavior  
Consumer provides UI

## **Example: headless toggle with render prop**

function HeadlessToggle(\{ children \}) \{  
  const \[checked, setChecked\] \= React.useState(false);

  const toggle \= () \=\> setChecked((prev) \=\> \!prev);

  return children(\{  
    checked,  
    toggle,  
  \});  
\}

Usage:

\<HeadlessToggle\>  
  \{(\{ checked, toggle \}) \=\> (  
    \<button onClick=\{toggle\}\>  
      \{checked ? "Enabled" : "Disabled"\}  
    \</button\>  
  )\}  
\</HeadlessToggle\>

## **Example: headless hook**

function useToggle(initialValue \= false) \{  
  const \[checked, setChecked\] \= React.useState(initialValue);

  const toggle \= React.useCallback(() \=\> \{  
    setChecked((prev) \=\> \!prev);  
  \}, \[\]);

  return \{  
    checked,  
    setChecked,  
    toggle,  
  \};  
\}

Usage:

function CustomToggle() \{  
  const \{ checked, toggle \} \= useToggle();

  return (  
    \<button  
      className=\{checked ? "active" : ""\}  
      onClick=\{toggle\}  
    \>  
      \{checked ? "ON" : "OFF"\}  
    \</button\>  
  );  
\}

## **Real use cases**

* Headless dropdown.  
* Headless select.  
* Headless modal.  
* Headless tabs.  
* Headless tooltip.  
* Headless table.  
* Headless form controls.

## **Why useful**

* Full styling control.  
* Good for design systems.  
* Logic is reusable.  
* UI is not locked to one design.  
* Works well across products with different themes.

## **Trade-offs**

* Consumer writes more UI code.  
* Accessibility must be handled carefully.  
* API design must be very clear.  
* More flexible but sometimes more complex.

## **Interview-ready answer**

Headless Components separate behavior from presentation. They provide state, interactions, accessibility logic, and APIs, while the consumer controls the markup and styling. This pattern is useful for design systems and reusable UI primitives like dropdowns, modals, tabs, and tables.

---

# **Common Interview Topics / Questions**

---

# **1\. HOC vs Custom Hooks**

## **Simple comparison**

| Point | HOC | Custom Hook |
| ----- | ----- | ----- |
| Reuses | Component behavior | Stateful logic |
| Output | New wrapped component | Values/functions |
| Adds wrapper | Yes | No |
| Prop collision risk | Yes | No |
| Tree depth | Increases | No extra tree |
| Modern preference | Less common | Preferred |
| Good for | Legacy, wrappers, auth gates | Logic reuse |

## **HOC example**

const ProtectedPage \= withAuth(Page);

## **Custom hook example**

function Page() \{  
  const user \= useAuthUser();

  if (\!user) \{  
    return \<Login /\>;  
  \}

  return \<Dashboard /\>;  
\}

## **Interview-ready answer**

HOCs wrap components and return enhanced components, while custom hooks extract reusable stateful logic. HOCs can add wrapper hell and prop collisions. Custom hooks are usually preferred in modern React because they reuse logic without adding extra components. HOCs are still useful in legacy code or when a wrapper component is required.

---

# **2\. Render Props**

## **Answer**

Render Props is a pattern where a component receives a function and calls it to render UI.

\<Toggle\>  
  \{(\{ isOn, toggle \}) \=\> (  
    \<button onClick=\{toggle\}\>  
      \{isOn ? "ON" : "OFF"\}  
    \</button\>  
  )\}  
\</Toggle\>

## **Why useful**

* Shares behavior.  
* Consumer controls UI.  
* Flexible rendering.  
* Useful before hooks.  
* Still appears in some libraries.

## **Interview-ready answer**

Render Props share logic by passing a function as a prop or child. The component owns the behavior and calls the function to render UI. It is flexible, but nested render props can become hard to read. In modern React, custom hooks often solve the same problem more cleanly.

---

# **3\. HOC vs Render Props**

## **Simple comparison**

| Point | HOC | Render Props |
| ----- | ----- | ----- |
| Pattern | Wrap component | Pass render function |
| Reuse style | Enhancement | Flexible rendering |
| Output | Enhanced component | UI from render function |
| Problem | Wrapper hell | Nested function nesting |
| Modern alternative | Custom hooks | Custom hooks |

## **Interview-ready answer**

HOCs reuse logic by wrapping a component, while Render Props reuse logic by passing a function that controls rendering. HOCs can create wrapper hell and prop collision issues. Render Props can create nested callback structures. Custom hooks are usually the modern replacement for both when the goal is logic reuse.

---

# **4\. What are Compound Components?**

## **Answer**

Compound components are related components that share state under a parent.

\<Tabs defaultValue="profile"\>  
  \<Tabs.Tab value="profile"\>Profile\</Tabs.Tab\>  
  \<Tabs.Panel value="profile"\>Profile content\</Tabs.Panel\>  
\</Tabs\>

## **Interview-ready answer**

Compound Components are useful when multiple related components need to work together as one unit. The parent manages shared state, and children access it through context. This creates a flexible API for components like Tabs, Accordion, Select, Menu, and Modal.

---

# **5\. What is the Provider Pattern?**

## **Answer**

The Provider Pattern uses Context to provide shared data or behavior to nested components.

\<AuthProvider\>  
  \<App /\>  
\</AuthProvider\>

## **Interview-ready answer**

The Provider Pattern is commonly used for app-wide or feature-wide state such as auth, theme, locale, permissions, and feature flags. A good implementation usually exposes a custom hook like `useAuth` to make consumption safe and clean.

---

# **6\. What are Headless Components?**

## **Answer**

Headless Components provide logic and behavior without enforcing UI.

## **Interview-ready answer**

Headless Components separate behavior from presentation. They are useful when we want reusable accessible behavior but full control over markup and styling. This pattern is common in design systems for dropdowns, modals, tabs, tables, and form controls.

---

# **7\. Controlled vs Uncontrolled reusable components**

## **Answer**

A controlled reusable component receives state from parent. An uncontrolled reusable component manages its own internal state.

\<Toggle checked=\{checked\} onCheckedChange=\{setChecked\} /\>

Controlled.

\<Toggle defaultChecked=\{true\} /\>

Uncontrolled.

## **Interview-ready answer**

Controlled reusable components are better when the parent needs full control over state. Uncontrolled components are simpler when the component can manage its own state. Good design-system components often support both controlled and uncontrolled usage.

---

# **8\. Which advanced pattern is preferred today?**

## **Answer**

For logic reuse, prefer custom hooks.

For flexible component APIs, use compound components or headless components.

For app-wide data, use provider pattern.

Use HOC and render props when working with legacy code, library APIs, or cases where those patterns fit naturally.

## **Interview-ready answer**

In modern React, custom hooks are usually preferred for reusable logic. Compound and headless components are preferred for flexible UI primitives and design systems. Provider Pattern is useful for shared app-level data. HOCs and Render Props are still important to understand because older libraries and legacy code often use them.

---

# **Quick Revision Summary**

| Pattern | Main idea |
| ----- | ----- |
| HOC | Function takes component, returns enhanced component |
| Render Props | Function prop controls what gets rendered |
| Compound Components | Related components share parent state |
| Custom Hooks | Reusable hook-based logic |
| Provider Pattern | Context provides shared value |
| Controlled Pattern | Parent controls component state |
| Headless Components | Behavior without fixed UI |
| HOC issue | Wrapper hell, prop collision |
| Render Props issue | Nested callbacks |
| Custom Hooks benefit | Logic reuse without wrapper |
| Headless benefit | Flexible design-system primitives |

---

# **Final Interview-Ready Combined Answer**

Advanced React patterns help reuse logic and create flexible component APIs. HOCs wrap components to add behavior, but they can cause wrapper hell and prop collisions. Render Props share logic by passing a render function, but nested render props can become hard to read. Custom hooks are the modern preferred pattern for logic reuse because they do not add extra components to the tree. Compound Components use a shared parent and context to build flexible APIs like Tabs, Accordion, Select, and Modal. The Provider Pattern uses Context to share app-level state like auth, theme, locale, and permissions. Controlled Component Pattern lets the parent own state and pass value/change handlers. Headless Components separate behavior from styling, making them useful for design systems. For interviews, the key comparison is: **HOC and Render Props were common before hooks, but Custom Hooks are usually preferred today for reusable logic.**

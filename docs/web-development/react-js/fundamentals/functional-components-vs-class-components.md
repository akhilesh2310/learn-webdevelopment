---
title: Functional Components vs Class Components
sidebar_position: 5
---

# Functional Components vs Class Components

## **Functional Components vs Class Components**

React components can mainly be written in two ways:

1\. Functional components  
2\. Class components

Both can render UI, receive props, and manage state. But in modern React, **functional components are preferred** because they are simpler and work with Hooks.

React’s official docs say class components are still supported, but they do not recommend using them for new code. They recommend defining components as functions instead.

---

# **1\. Functional Components**

A functional component is a normal JavaScript function that returns JSX.

function UserCard(\{ name, role \}) \{  
 return (  
   \<div\>  
     \<h2\>\{name\}\</h2\>  
     \<p\>\{role\}\</p\>  
   \</div\>  
 );  
\}

Usage:

\<UserCard name="Akhilesh" role="Staff Engineer" /\>

Simple mental model:

Functional component \= function that takes props and returns UI

Earlier, functional components were mostly used for simple UI. But after Hooks, functional components can handle state, side effects, refs, memoization, context, reducers, and custom reusable logic.

Example with state:

function Counter() \{  
 const \[count, setCount\] \= React.useState(0);

 return (  
   \<button onClick=\{() \=\> setCount(count \+ 1)\}\>  
     Count: \{count\}  
   \</button\>  
 );  
\}

Here:

useState gives local state  
setCount updates state  
State update triggers re-render  
---

# **2\. Class Components**

A class component is written using JavaScript class syntax and extends `React.Component`.

class Counter extends React.Component \{  
 constructor(props) \{  
   super(props);

   this.state \= \{  
     count: 0  
   \};  
 \}

 render() \{  
   return (  
     \<button onClick=\{() \=\> this.setState(\{ count: this.state.count \+ 1 \})\}\>  
       Count: \{this.state.count\}  
     \</button\>  
   );  
 \}  
\}

Simple mental model:

Class component \= class that extends React.Component and has a render method

Class components use:

this.props  
this.state  
this.setState()  
lifecycle methods

Common lifecycle methods:

componentDidMount  
componentDidUpdate  
componentWillUnmount  
shouldComponentUpdate  
render

Example:

class UserList extends React.Component \{  
 componentDidMount() \{  
   // API call after component mounts  
 \}

 componentDidUpdate(prevProps) \{  
   // run logic when props/state update  
 \}

 componentWillUnmount() \{  
   // cleanup before component unmounts  
 \}

 render() \{  
   return \<div\>User List\</div\>;  
 \}  
\}  
---

# **3\. Same Example: Functional vs Class**

## **Functional component version**

function UserProfile(\{ userId \}) \{  
 const \[user, setUser\] \= React.useState(null);

 React.useEffect(() \=\> \{  
   fetch(\`/api/users/$\{userId\}\`)  
     .then(res \=\> res.json())  
     .then(data \=\> setUser(data));  
 \}, \[userId\]);

 if (\!user) return \<p\>Loading...\</p\>;

 return \<h1\>\{user.name\}\</h1\>;  
\}

## **Class component version**

class UserProfile extends React.Component \{  
 constructor(props) \{  
   super(props);

   this.state \= \{  
     user: null  
   \};  
 \}

 componentDidMount() \{  
   fetch(\`/api/users/$\{this.props.userId\}\`)  
     .then(res \=\> res.json())  
     .then(data \=\> this.setState(\{ user: data \}));  
 \}

 componentDidUpdate(prevProps) \{  
   if (prevProps.userId \!== this.props.userId) \{  
     fetch(\`/api/users/$\{this.props.userId\}\`)  
       .then(res \=\> res.json())  
       .then(data \=\> this.setState(\{ user: data \}));  
   \}  
 \}

 render() \{  
   if (\!this.state.user) return \<p\>Loading...\</p\>;

   return \<h1\>\{this.state.user.name\}\</h1\>;  
 \}  
\}

In the functional version, related logic is together inside `useEffect`.

In the class version, related logic is split across `componentDidMount` and `componentDidUpdate`.

That is one big reason functional components are easier to maintain.

---

# **4\. Lifecycle Mapping**

Class components use lifecycle methods.

Functional components use Hooks.

Class component                 Functional component

constructor                     useState / useReducer  
componentDidMount               useEffect(() \=\> \{\}, \[\])  
componentDidUpdate              useEffect(() \=\> \{\}, \[dependencies\])  
componentWillUnmount            cleanup function inside useEffect  
shouldComponentUpdate           React.memo  
createRef                       useRef  
componentDidCatch               Error Boundary class component

Example cleanup in functional component:

function ChatRoom() \{  
 React.useEffect(() \=\> \{  
   const unsubscribe \= subscribeToMessages();

   return () \=\> \{  
     unsubscribe();  
   \};  
 \}, \[\]);

 return \<h1\>Chat Room\</h1\>;  
\}

Equivalent class version:

class ChatRoom extends React.Component \{  
 componentDidMount() \{  
   this.unsubscribe \= subscribeToMessages();  
 \}

 componentWillUnmount() \{  
   this.unsubscribe();  
 \}

 render() \{  
   return \<h1\>Chat Room\</h1\>;  
 \}  
\}

React docs describe `useEffect` as the Hook used to synchronize a component with an external system, such as subscriptions, timers, browser APIs, or network-related effects.

---

# **5\. Main Differences**

| Area | Functional Component | Class Component |
| ----- | ----- | ----- |
| Syntax | JavaScript function | ES6 class |
| State | `useState`, `useReducer` | `this.state` |
| State update | `setCount()` | `this.setState()` |
| Side effects | `useEffect` | Lifecycle methods |
| Refs | `useRef` | `createRef` |
| Reusable logic | Custom Hooks | HOC/render props/mixins historically |
| Boilerplate | Less | More |
| `this` binding | No `this` | Uses `this` |
| Modern React | Preferred | Supported but not preferred |
| Learning curve | Easier after Hooks basics | More class/lifecycle concepts |
| Error boundaries | Cannot fully replace class error boundaries yet | Still commonly class-based |

---

# **6\. Why Functional Components Are Preferred**

## **1\. Less boilerplate**

Functional component:

function Button(\{ label, onClick \}) \{  
 return \<button onClick=\{onClick\}\>\{label\}\</button\>;  
\}

Class component:

class Button extends React.Component \{  
 render() \{  
   return (  
     \<button onClick=\{this.props.onClick\}\>  
       \{this.props.label\}  
     \</button\>  
   );  
 \}  
\}

The functional version is shorter and easier to read.

---

## **2\. No `this` confusion**

In class components, you need to understand `this`.

Example:

class Counter extends React.Component \{  
 constructor(props) \{  
   super(props);  
   this.state \= \{ count: 0 \};

   this.handleClick \= this.handleClick.bind(this);  
 \}

 handleClick() \{  
   this.setState(\{ count: this.state.count \+ 1 \});  
 \}

 render() \{  
   return \<button onClick=\{this.handleClick\}\>Increment\</button\>;  
 \}  
\}

If you forget binding, `this` can be undefined in event handlers.

Functional components avoid this problem:

function Counter() \{  
 const \[count, setCount\] \= React.useState(0);

 function handleClick() \{  
   setCount(prev \=\> prev \+ 1);  
 \}

 return \<button onClick=\{handleClick\}\>Increment\</button\>;  
\}

No `this`.

No binding.

Cleaner mental model.

---

## **3\. Hooks make state and side effects simpler**

Functional components use Hooks.

Common Hooks:

useState → local state  
useEffect → side effects  
useRef → mutable reference  
useMemo → cache expensive calculation  
useCallback → cache function reference  
useReducer → complex state updates  
useContext → consume context

React docs define Hooks as special functions that let you use React features from components, and custom Hooks allow you to reuse logic across components.

---

## **4\. Related logic stays together**

This is a very important real-world reason.

In class components, one feature’s logic can be split across lifecycle methods.

Example:

componentDidMount → fetch user  
componentDidUpdate → refetch user when userId changes  
componentWillUnmount → cleanup request/subscription

In functional components, this can stay inside one `useEffect`.

function UserProfile(\{ userId \}) \{  
 React.useEffect(() \=\> \{  
   const controller \= new AbortController();

   fetch(\`/api/users/$\{userId\}\`, \{  
     signal: controller.signal  
   \});

   return () \=\> \{  
     controller.abort();  
   \};  
 \}, \[userId\]);

 return \<div\>User Profile\</div\>;  
\}

Everything related to the `userId` side effect is together.

This makes code easier to reason about.

---

## **5\. Custom Hooks make logic reuse easier**

Suppose multiple components need current window size.

With functional components, we can write a custom Hook:

function useWindowSize() \{  
 const \[size, setSize\] \= React.useState(\{  
   width: window.innerWidth,  
   height: window.innerHeight  
 \});

 React.useEffect(() \=\> \{  
   function handleResize() \{  
     setSize(\{  
       width: window.innerWidth,  
       height: window.innerHeight  
     \});  
   \}

   window.addEventListener("resize", handleResize);

   return () \=\> \{  
     window.removeEventListener("resize", handleResize);  
   \};  
 \}, \[\]);

 return size;  
\}

Use it anywhere:

function Dashboard() \{  
 const size \= useWindowSize();

 return \<p\>Width: \{size.width\}\</p\>;  
\}

In class components, reusable stateful logic was usually handled with patterns like Higher-Order Components or render props, which often made the component tree more nested and harder to read.

Custom Hooks are one of the biggest advantages of functional components.

---

## **6\. Better aligned with modern React**

Modern React features and docs are centered around function components and Hooks.

The official React documentation teaches modern React with function components and Hooks.

Examples:

useTransition  
useDeferredValue  
useId  
useSyncExternalStore  
useOptimistic  
React Server Components patterns  
Custom Hooks

Most new React libraries and examples are also written with functional components.

---

## **7\. Easier to split and test**

Functional components are usually easier to test because they are plain functions from props/state to UI.

Example:

function PriceLabel(\{ price \}) \{  
 return \<span\>₹\{price\}\</span\>;  
\}

This is simple to test.

For complex behavior, custom Hooks can also be tested separately.

---

# **7\. Is There Any Reason to Use Class Components Today?**

Mostly for legacy codebases.

You may still see class components in older projects.

Use class components when:

You are maintaining old React code  
The project already follows class component style  
You need an error boundary and your codebase does not use a library/helper

Important point:

Error boundaries are still commonly implemented using class components.

Example:

class ErrorBoundary extends React.Component \{  
 constructor(props) \{  
   super(props);

   this.state \= \{  
     hasError: false  
   \};  
 \}

 static getDerivedStateFromError(error) \{  
   return \{  
     hasError: true  
   \};  
 \}

 componentDidCatch(error, info) \{  
   console.error(error, info);  
 \}

 render() \{  
   if (this.state.hasError) \{  
     return \<h1\>Something went wrong.\</h1\>;  
   \}

   return this.props.children;  
 \}  
\}

So it is useful to understand class components, but for most new UI code, use functional components.

---

# **8\. Important Trap: Functional Does Not Mean Stateless**

Older React interviews sometimes say:

Functional components are stateless.  
Class components are stateful.

That was true before Hooks.

Now it is outdated.

Today, functional components can have state:

function Counter() \{  
 const \[count, setCount\] \= React.useState(0);

 return \<p\>\{count\}\</p\>;  
\}

Correct statement:

Before Hooks, class components were used for state and lifecycle.  
After Hooks, functional components can handle state, lifecycle-like effects, refs, context, and reusable logic.  
---

# **9\. Another Trap: useEffect Is Not Exactly Lifecycle**

Many people say:

useEffect is componentDidMount \+ componentDidUpdate \+ componentWillUnmount.

This is okay as a beginner mapping, but not fully accurate.

Better explanation:

useEffect runs after render/paint to synchronize your component with an external system.  
The dependency array controls when it re-runs.  
The cleanup function runs before the next effect or when the component unmounts.

Example:

React.useEffect(() \=\> \{  
 const unsubscribe \= subscribe(userId);

 return () \=\> \{  
   unsubscribe();  
 \};  
\}, \[userId\]);

This means:

Subscribe for current userId  
If userId changes, cleanup old subscription  
Then create new subscription  
Cleanup when component unmounts

This mental model is stronger than memorizing lifecycle equivalents.

---

# **10\. Which One Should You Use?**

For new React development:

Use functional components.

Because they are:

Simpler  
Less verbose  
No this binding  
Use Hooks  
Better for reusable logic  
Aligned with modern React  
Preferred by official docs  
Easier to compose

For old React code:

Understand class components so you can maintain and migrate them.  
---

# **11\. Compact Interview-Ready Answer**

Functional components are JavaScript functions that receive props and return JSX. With Hooks, they can manage state, side effects, refs, context, memoization, and reusable logic. Class components are ES6 classes that extend `React.Component`, use `this.props`, `this.state`, `this.setState`, and lifecycle methods like `componentDidMount` and `componentWillUnmount`.

Modern React prefers functional components because they are simpler, require less boilerplate, avoid `this` binding issues, keep related logic together using Hooks, and make reusable logic easier through custom Hooks. Class components are still supported and are common in legacy codebases, but they are generally not recommended for new React code.

---

# **12\. One-Line Summary**

Class components organize logic around lifecycle methods; functional components organize logic around features using Hooks.

That is the key mental model.

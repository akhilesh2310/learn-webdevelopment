---
title: 1. Fundamentals
sidebar_position: 1
---

# 1. Fundamentals

# **1\. React Fundamentals**

## **What is React?**

## **SPA vs MPA**

## **Virtual DOM**

## **Real DOM vs Virtual DOM**

## **React Reconciliation**

## **React Rendering Process**

## **JSX**

## **React Elements**

## **Components**

### **Functional Components**

### **Class Components**

## **Props**

## **State**

## **One-way Data Flow**

## **Common Interview Topics/Questions please**

* Virtual DOM  
* Why React is fast  
* Props vs State  
* StringMode

React.isStringMode

​React Strict Mode is a developer tool highlighting potential bugs or issues in a React application's codebase. It provides warnings to developers as feedback for errors that occur in an application, with no effect on the result because it does not render any visible UI.

# **React Fundamentals**

## **1\. What is React?**

React is a JavaScript library for building user interfaces. It helps us build UI using small reusable pieces called components. Instead of manually writing DOM manipulation code like this:

document.getElementById("title").innerText \= "Hello";

document.getElementById("button").disabled \= true;

In React, we describe what the UI should look like for a given state:

function App() \{

 const \[count, setCount\] \= React.useState(0);

 return (

   \<div\>

     \<h1\>Count: \{count\}\</h1\>

     \<button onClick=\{() \=\> setCount(count \+ 1)\}\>

       Increment

     \</button\>

   \</div\>

 );

\}

React takes care of updating the browser DOM when the state changes. Official React docs describe React screen updates as happening through trigger, render, and commit phases, and React does not touch the DOM if the rendering result is same as before.

The main idea is:

State changes → React re-renders component → React updates required DOM changes

React is not a full framework like Angular. It mainly focuses on the view layer. For routing, data fetching, forms, state management, and build setup, we usually combine React with other libraries or frameworks like React Router, Redux, Zustand, TanStack Query, Next.js, Vite, etc.

### **Why React became popular**

React became popular because it gives a clean way to build complex UIs.

Its strengths are:

* Component-based architecture  
* Declarative UI  
* Reusable components  
* Strong ecosystem  
* Good performance model  
* Unidirectional data flow  
* Works well for large applications  
* Can be used with TypeScript  
* Can support SPA, SSR, SSG, and hybrid apps through frameworks like Next.js

### **Simple real-world example**

In an ad-tech dashboard, you may have:

CampaignList

CampaignFilters

CampaignDetails

CreativeReviewPanel

ReportsChart

NotificationBell

Each part can be a separate React component.

So instead of building one large page with mixed HTML, JavaScript, and DOM manipulation, React lets you split the UI into meaningful pieces.

### **Compact interview-ready answer**

React is a JavaScript library for building user interfaces using reusable components. It lets us describe the UI declaratively based on state and props. When data changes, React re-renders the affected components, compares the new UI tree with the previous one, and updates only the necessary parts of the real DOM. React is mainly focused on the view layer and is commonly used to build SPAs, dashboards, forms, portals, and large-scale web applications.

---

# **2\. SPA vs MPA**

## **What is SPA?**

SPA means Single Page Application.

In an SPA, the browser usually loads one main HTML page initially. After that, JavaScript handles navigation and updates the UI without doing a full page reload.

Example:

/user

/user/settings

/dashboard

/reports

In an SPA, moving between these routes does not necessarily reload the full page from the server. The React app handles routing on the client side.

Example:

\<Route path="/dashboard" element=\{\<Dashboard /\>\} /\>

\<Route path="/reports" element=\{\<Reports /\>\} /\>

When the user moves from dashboard to reports:

Browser does not reload the full page

React changes the component tree

Only required UI changes happen

## **What is MPA?**

MPA means Multi Page Application.

In an MPA, every route usually loads a separate HTML page from the server.

Example:

/products.html

/about.html

/contact.html

/login.html

When the user navigates from one page to another:

Browser sends request to server

Server returns a new HTML page

Browser reloads the page

JavaScript and CSS may reload depending on caching

Traditional websites, server-rendered apps, old PHP/JSP/Rails/Django apps often work like MPAs.

## **SPA flow**

Initial request → Server sends HTML \+ JS bundle

User clicks route → React Router changes view

API call fetches data

React updates UI

No full page reload

## **MPA flow**

User opens page → Server sends full HTML

User clicks another page → Browser requests another HTML page

Full page reload happens

## **SPA advantages**

SPA is good when the app is highly interactive.

Examples:

Admin dashboards

Ad-tech platforms

Email clients

Project management tools

Analytics portals

Internal tools

Booking flows

Advantages:

Smooth navigation

Better app-like experience

Less full-page reload

Good for highly interactive UI

Client-side state can be preserved between route changes

## **SPA disadvantages**

Initial JavaScript bundle can be large

SEO needs extra care

Performance can suffer if code splitting is poor

Browser does more work

Requires client-side routing

More responsibility on frontend

## **MPA advantages**

Good SEO by default

Faster first page HTML in many cases

Simpler for mostly static/content-heavy websites

Less JavaScript needed

Server controls routing naturally

## **MPA disadvantages**

Full page reload between pages

Less app-like experience

Shared client-side state is harder

Repeated server rendering for navigation

## **Modern reality**

Today, the line between SPA and MPA is not always strict.

Frameworks like Next.js can support:

* Server-side rendering  
* Static generation  
* Client-side navigation  
* Partial hydration  
* API routes  
* Streaming  
* Hybrid pages

So a modern React app may behave like an SPA after initial load, but still use server rendering for performance and SEO.

## **Compact interview-ready answer**

An SPA loads a single HTML page and then updates the UI on the client side using JavaScript routing. It gives a smooth app-like experience and is good for dashboards and interactive applications. An MPA loads a new HTML page from the server for each route, which is simpler and naturally SEO-friendly but causes full page reloads. Modern React frameworks like Next.js can combine both approaches using SSR, SSG, and client-side navigation.

---

# **3\. Virtual DOM**

## **Simple meaning**

The Virtual DOM is a lightweight JavaScript representation of the UI.

When we write JSX:

\<h1\>Hello Akhilesh\</h1\>

React internally represents it like an object:

\{

 type: "h1",

 props: \{

   children: "Hello Akhilesh"

 \}

\}

This object is not the real browser DOM.

It is just React’s description of what the UI should look like.

## **Why Virtual DOM exists**

Direct DOM operations can be expensive when done frequently and poorly.

For example:

document.querySelector("\#title").innerText \= "New Title";

document.querySelector("\#card").style.display \= "none";

document.querySelector("\#list").appendChild(item);

In a large app, manually managing all DOM updates becomes complex.

React solves this by letting us write declarative UI:

function Greeting(\{ name \}) \{

 return \<h1\>Hello \{name\}\</h1\>;

\}

We describe the final UI. React figures out how to update the real DOM.

## **How Virtual DOM works conceptually**

When state changes:

1\. React re-renders the component.

2\. React creates a new Virtual DOM tree.

3\. React compares it with the previous tree.

4\. React calculates what changed.

5\. React updates the real DOM only where needed.

This comparison process is called reconciliation.

## **Important clarification**

Virtual DOM itself is not magic.

React is efficient because of a combination of:

Virtual DOM representation

Reconciliation

Efficient diffing

Batched updates

Fiber scheduling

Stable component model

Memoization when needed

Good state placement

Virtual DOM comparison also has a cost. So we should not say “React is always fast because of Virtual DOM.” A badly structured React app can still be slow.

## **Example**

function Counter() \{

 const \[count, setCount\] \= React.useState(0);

 return \<h1\>Count: \{count\}\</h1\>;

\}

Initial render:

\<h1\>Count: 0\</h1\>

After click:

\<h1\>Count: 1\</h1\>

React compares old and new UI descriptions and sees that only the text changed.

So it updates only the text inside the real DOM node.

## **Compact interview-ready answer**

The Virtual DOM is React’s lightweight JavaScript representation of the UI. When state or props change, React creates a new Virtual DOM tree, compares it with the previous one using reconciliation, and updates only the necessary parts of the real DOM. It helps React manage UI updates declaratively, but React performance also depends on diffing, batching, Fiber scheduling, stable keys, and good component design.

---

# **4\. Real DOM vs Virtual DOM**

## **Real DOM**

The Real DOM is the actual browser Document Object Model.

It represents the real HTML elements on the page.

Example:

\<div\>

 \<h1\>Hello\</h1\>

 \<button\>Click\</button\>

\</div\>

The browser creates DOM nodes for these elements.

JavaScript can directly update these nodes:

document.querySelector("h1").innerText \= "Updated";

When the DOM changes, the browser may need to recalculate layout, repaint pixels, and update the screen.

## **Virtual DOM**

The Virtual DOM is React’s in-memory JavaScript representation of the UI.

Example:

\{

 type: "div",

 props: \{

   children: \[

     \{ type: "h1", props: \{ children: "Hello" \} \},

     \{ type: "button", props: \{ children: "Click" \} \}

   \]

 \}

\}

React uses it to calculate what should change before touching the real DOM.

## **Difference**

Real DOM:

Actual browser UI tree

Directly affects screen

DOM updates can be expensive

Managed by browser

Virtual DOM:

JavaScript representation of UI

Does not directly affect screen

Used by React for comparison

Managed by React

## **Important point**

The Virtual DOM is not faster than the Real DOM in every situation.

Creating and comparing Virtual DOM objects also takes time.

React’s benefit is that it gives a predictable programming model and batches/optimizes updates so developers do not manually manage DOM changes.

## **Example**

Suppose we update one counter value.

With manual DOM:

document.getElementById("count").innerText \= count;

With React:

\<p\>\{count\}\</p\>

React handles the update for us.

The React way is not just about performance. It is also about maintainability.

In a large app, managing every DOM update manually becomes difficult. React gives a cleaner model:

State → UI

## **Compact interview-ready answer**

The Real DOM is the actual browser DOM that appears on the screen. The Virtual DOM is React’s JavaScript representation of the UI. React updates the Virtual DOM first, compares it with the previous version, and then commits only necessary changes to the Real DOM. The main benefit is not only performance, but also a predictable and maintainable way to build complex UIs.

---

# **5\. React Reconciliation**

## **Simple meaning**

React Reconciliation is the process React uses to compare the previous React tree with the new React tree after state or props change.

Based on this comparison, React decides what changes are required in the real DOM.

## **Why it is needed**

React does not blindly recreate the full DOM whenever something changes.

Instead:

State/props change

     ↓

Component re-renders

     ↓

New React tree is created

     ↓

React compares old tree and new tree

     ↓

React updates only necessary DOM changes

This comparison process is reconciliation.

## **The core problem**

A perfect tree comparison algorithm can be expensive. React uses a practical O(n) heuristic diffing algorithm based on assumptions such as different element types producing different trees and stable keys helping identify children. This is consistent with React’s model of preserving or resetting state based on element type, position, and keys.

## **Main reconciliation rules**

### **1\. Different element type means replace**

// Before

\<div\>Hello\</div\>

// After

\<span\>Hello\</span\>

React sees different element types.

So it removes the old `div` and creates a new `span`.

Same with components:

// Before

\<UserProfile /\>

// After

\<AdminProfile /\>

React unmounts `UserProfile` and mounts `AdminProfile`.

Old local state is lost.

### **2\. Same DOM element type means reuse DOM node**

// Before

\<button className="primary"\>Save\</button\>

// After

\<button className="secondary"\>Save\</button\>

React keeps the same `button` DOM node and only updates `className`.

### **3\. Same component type means preserve state**

\<UserCard name="Akhilesh" /\>

\<UserCard name="Rahul" /\>

The component type is still `UserCard`.

React reuses the component and updates props.

State is preserved.

## **Keys in reconciliation**

Keys help React identify list items.

Bad:

items.map((item, index) \=\> (

 \<Todo key=\{index\} item=\{item\} /\>

));

Good:

items.map((item) \=\> (

 \<Todo key=\{item.id\} item=\{item\} /\>

));

Index keys can cause wrong state preservation when items are inserted, deleted, sorted, or reordered.

For example:

Wrong checkbox selected

Wrong input value

Wrong expanded row

Wrong local state attached to wrong item

## **Render vs commit**

Reconciliation mainly happens during the render phase.

DOM updates happen during the commit phase.

React’s official model explains screen updates as trigger, render, and commit. It also notes that React does not touch the DOM if the render result is same as before.

## **Compact interview-ready answer**

React Reconciliation is the process React uses to compare the previous React tree with the new React tree after state or props change. If element types are different, React replaces the subtree. If element types are the same, React reuses the DOM node or component instance and updates changed props or children. For lists, React uses keys to preserve correct item identity. Reconciliation happens during the render phase, and actual DOM updates happen during the commit phase.

---

# **6\. React Rendering Process**

## **Simple meaning**

React rendering is the process where React calls your components to figure out what the UI should look like.

Rendering does not always mean updating the DOM.

This is a very important point.

Render \= React calculates UI

Commit \= React updates DOM

Official React docs explain that any screen update happens in three steps: trigger, render, and commit.

## **React update flow**

1\. Trigger

2\. Render

3\. Commit

## **1\. Trigger phase**

A render is triggered when something changes.

Common triggers:

State update

Props change from parent

Context value change

Parent component re-render

External store update

Route change

Example:

setCount(count \+ 1);

This triggers React to render again.

## **2\. Render phase**

During render, React calls your component function.

Example:

function Counter(\{ count \}) \{

 return \<h1\>\{count\}\</h1\>;

\}

React calls:

Counter(\{ count: 1 \})

The component returns JSX.

React builds a new React tree and compares it with the previous one.

This is where reconciliation happens.

Important:

Render phase should be pure.

Do not cause side effects during render.

Bad:

function UserList() \{

 localStorage.setItem("visited", "true"); // bad during render

 return \<div\>User List\</div\>;

\}

Better:

function UserList() \{

 React.useEffect(() \=\> \{

   localStorage.setItem("visited", "true");

 \}, \[\]);

 return \<div\>User List\</div\>;

\}

React docs also emphasize that rendering should be pure and components should return JSX without changing existing objects or variables during render.

## **3\. Commit phase**

In the commit phase, React applies final changes to the real DOM.

It also:

Updates refs

Runs layout effects

Runs effects after paint

## **Simple example**

function App() \{

 const \[name, setName\] \= React.useState("Akhilesh");

 return (

   \<div\>

     \<h1\>Hello \{name\}\</h1\>

     \<button onClick=\{() \=\> setName("Rahul")\}\>

       Change

     \</button\>

   \</div\>

 );

\}

When button is clicked:

1\. setName triggers update.

2\. App renders again.

3\. React creates new tree.

4\. React compares old and new tree.

5\. Only h1 text changed.

6\. React commits text update to DOM.

## **Re-render does not mean DOM update**

Example:

function App() \{

 const \[count, setCount\] \= React.useState(0);

 return \<h1\>Static Title\</h1\>;

\}

Even if state changes and component re-renders, the output is still:

\<h1\>Static Title\</h1\>

React may not update the DOM because the rendered output did not change.

## **Compact interview-ready answer**

React rendering is the process where React calls components to calculate what the UI should look like. A render can be triggered by state changes, props changes, context changes, or parent re-renders. During the render phase, React builds a new React tree and reconciles it with the previous tree. During the commit phase, React applies the required changes to the real DOM. Rendering should be pure, and DOM updates happen only when the final output changes.

---

# **7\. JSX**

## **Simple meaning**

JSX stands for JavaScript XML.

It lets us write HTML-like syntax inside JavaScript.

Example:

const element \= \<h1\>Hello Akhilesh\</h1\>;

This is not actual HTML.

It is syntax that gets transformed into JavaScript.

Conceptually:

\<h1\>Hello\</h1\>

becomes something like:

React.createElement("h1", null, "Hello");

In modern React setups, we do not always need to import React manually for JSX, depending on the compiler setup. But conceptually, JSX still becomes JavaScript that React can understand.

## **Why JSX is useful**

JSX keeps UI structure and UI logic close.

Example:

function UserCard(\{ user \}) \{

 return (

   \<div className="card"\>

     \<h2\>\{user.name\}\</h2\>

     \<p\>\{user.role\}\</p\>

   \</div\>

 );

\}

This is easier to read than manually creating DOM nodes.

## **JSX can use JavaScript expressions**

Use `\{\}` to write JavaScript expressions inside JSX.

const name \= "Akhilesh";

return \<h1\>Hello \{name\}\</h1\>;

Output:

Hello Akhilesh

You can use expressions:

\<p\>Total: \{price \* quantity\}\</p\>

You can use conditional rendering:

\{isLoggedIn ? \<Dashboard /\> : \<Login /\>\}

You can use array mapping:

\{users.map(user \=\> (

 \<UserCard key=\{user.id\} user=\{user\} /\>

))\}

## **JSX rules**

### **1\. Return one parent element**

Bad:

return (

 \<h1\>Hello\</h1\>

 \<p\>Welcome\</p\>

);

Good:

return (

 \<\>

   \<h1\>Hello\</h1\>

   \<p\>Welcome\</p\>

 \</\>

);

### **2\. Use className instead of class**

\<div className="container"\>Hello\</div\>

### **3\. Use htmlFor instead of for**

\<label htmlFor="email"\>Email\</label\>

\<input id="email" /\>

### **4\. Close all tags**

\<img src="/logo.png" alt="Logo" /\>

\<input type="text" /\>

### **5\. Use camelCase for most DOM props**

\<button onClick=\{handleClick\}\>Click\</button\>

React supports built-in browser HTML and SVG components with props and events, including React-specific props like `ref`.

## **JSX is safe from basic injection by default**

This:

const value \= "\<script\>alert('hack')\</script\>";

return \<div\>\{value\}\</div\>;

React renders it as text, not as executable script.

But this is dangerous:

\<div dangerouslySetInnerHTML=\{\{ \_\_html: value \}\} /\>

Use `dangerouslySetInnerHTML` carefully.

## **Compact interview-ready answer**

JSX is a syntax extension that lets us write HTML-like UI code inside JavaScript. JSX is not HTML; it gets compiled into JavaScript objects that React uses to build the UI. JSX supports JavaScript expressions inside curly braces, conditional rendering, list rendering, and component composition. It makes React code easier to read because the UI structure stays close to the logic that controls it.

---

# **8\. React Elements**

## **Simple meaning**

A React element is a plain JavaScript object that describes what should appear on the screen.

Example:

const element \= \<h1\>Hello\</h1\>;

This creates a React element.

Conceptually:

\{

 type: "h1",

 props: \{

   children: "Hello"

 \}

\}

React elements are lightweight descriptions.

They are not real DOM nodes.

## **React element vs DOM element**

React element:

Plain JavaScript object

Created by JSX or React.createElement

Used by React internally

Cheap to create

DOM element:

Real browser node

Created in the actual DOM

Can be expensive to update frequently

Visible on the screen

## **React element vs component**

This is a common confusion.

Component:

function Welcome() \{

 return \<h1\>Hello\</h1\>;

\}

Element:

\<Welcome /\>

The component is the function or class.

The element is the object created when you use that component.

Simple difference:

Component \= blueprint/function

Element \= description/object returned from JSX

## **Example**

function Button() \{

 return \<button\>Save\</button\>;

\}

const element \= \<Button /\>;

Here:

Button \= component

\<Button /\> \= React element

\<button\>Save\</button\> \= React element returned by Button

## **Elements are immutable**

Once a React element is created, you do not change it directly.

Instead, React creates a new element tree on every render.

Example:

\<h1\>Count: 0\</h1\>

After state change:

\<h1\>Count: 1\</h1\>

React does not mutate the old element. It creates a new one and compares.

## **Compact interview-ready answer**

A React element is a plain JavaScript object that describes what should be rendered on the screen. JSX creates React elements. A component is a function or class that returns React elements. React elements are not real DOM nodes; they are lightweight descriptions used by React during rendering and reconciliation.

---

# **9\. Components**

## **Simple meaning**

A component is a reusable piece of UI.

Example:

function UserCard() \{

 return (

   \<div\>

     \<h2\>Akhilesh\</h2\>

     \<p\>Staff Software Engineer\</p\>

   \</div\>

 );

\}

Now you can use it like this:

\<UserCard /\>

## **Why components are useful**

Components help us split a large UI into smaller understandable pieces.

Instead of building one huge page:

DashboardPage with 3000 lines

We split it into:

DashboardPage

Header

Sidebar

FilterPanel

ReportChart

CampaignTable

Pagination

NotificationBell

Each component has a clear responsibility.

## **Component should ideally be focused**

Good:

UserAvatar → shows avatar

UserName → shows name

UserCard → combines avatar and name

UserList → renders multiple user cards

Bad:

One component handles API calls, filters, table, modal, chart, export, permissions, and styling

Large components become hard to test, reuse, and debug.

## **Types of components**

Common categories:

Presentational components

Container components

Page components

Layout components

Reusable UI components

Feature components

Provider components

### **Presentational component**

Focuses on UI.

function Button(\{ label, onClick \}) \{

 return \<button onClick=\{onClick\}\>\{label\}\</button\>;

\}

### **Container component**

Handles data and passes it down.

function UserContainer() \{

 const \[users, setUsers\] \= React.useState(\[\]);

 return \<UserList users=\{users\} /\>;

\}

## **Component composition**

React prefers composition.

Example:

function Card(\{ children \}) \{

 return \<div className="card"\>\{children\}\</div\>;

\}

function App() \{

 return (

   \<Card\>

     \<h2\>Campaign Performance\</h2\>

     \<p\>CTR: 2.4%\</p\>

   \</Card\>

 );

\}

This makes components flexible.

## **Compact interview-ready answer**

A React component is a reusable unit of UI. Components let us break large interfaces into smaller, manageable pieces. A component can receive data through props, manage local state, return JSX, and be composed with other components. Good React architecture depends heavily on creating focused, reusable, and predictable components.

---

# **10\. Functional Components**

## **Simple meaning**

A functional component is a JavaScript function that returns JSX.

Example:

function Greeting() \{

 return \<h1\>Hello\</h1\>;

\}

With props:

function Greeting(\{ name \}) \{

 return \<h1\>Hello \{name\}\</h1\>;

\}

Usage:

\<Greeting name="Akhilesh" /\>

## **Functional components with state**

Earlier, functional components were mostly used for simple UI.

Now, with Hooks, they can manage state, effects, refs, memoization, context, and more.

Example:

function Counter() \{

 const \[count, setCount\] \= React.useState(0);

 return (

   \<button onClick=\{() \=\> setCount(count \+ 1)\}\>

     Count: \{count\}

   \</button\>

 );

\}

## **Why functional components are preferred**

Functional components are preferred in modern React because they are:

Simpler to read

Easier to test

Less boilerplate

Work naturally with Hooks

Better aligned with modern React patterns

## **Hooks in functional components**

Common Hooks:

useState → local state

useEffect → side effects

useMemo → memoize expensive value

useCallback → memoize function reference

useRef → store mutable reference

useContext → consume context

useReducer → complex state logic

## **Important rule**

Functional components should be pure.

Same props, state, and context should produce the same JSX output. React’s docs mention this purity assumption and Strict Mode helps detect accidental impurities by calling some pure functions twice in development.

Good:

function Total(\{ price, quantity \}) \{

 return \<p\>\{price \* quantity\}\</p\>;

\}

Bad:

function Total(\{ price \}) \{

 window.total \= price; // side effect during render

 return \<p\>\{price\}\</p\>;

\}

## **Compact interview-ready answer**

A functional component is a JavaScript function that returns JSX. In modern React, functional components are the preferred way to build UI because Hooks allow them to manage state, effects, refs, context, and memoization. They are simpler than class components and align better with React’s current model of pure rendering and composition.

---

# **11\. Class Components**

## **Simple meaning**

A class component is a React component written using JavaScript class syntax.

Example:

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

Before Hooks, class components were used when we needed state or lifecycle methods.

## **Class component lifecycle**

Common lifecycle methods:

componentDidMount

componentDidUpdate

componentWillUnmount

render

shouldComponentUpdate

Example:

class UserList extends React.Component \{

 componentDidMount() \{

   // API call

 \}

 componentWillUnmount() \{

   // cleanup

 \}

 render() \{

   return \<div\>User List\</div\>;

 \}

\}

## **Functional equivalent**

function UserList() \{

 React.useEffect(() \=\> \{

   // API call

   return () \=\> \{

     // cleanup

   \};

 \}, \[\]);

 return \<div\>User List\</div\>;

\}

## **Are class components still used?**

Yes, many old React codebases still use class components.

But for new development, functional components with Hooks are usually preferred.

## **Class components vs functional components**

Class components:

Use class syntax

Use this.state and this.setState

Use lifecycle methods

More boilerplate

Still found in legacy codebases

Functional components:

Use functions

Use Hooks

Less boilerplate

Preferred in modern React

Better for composition

## **StrictMode behavior**

In development, StrictMode can intentionally call lifecycle-related behavior extra times to help find missing cleanup logic. For class components, React docs mention that in StrictMode, React may call `componentDidMount`, then `componentWillUnmount`, then `componentDidMount` again in development to help detect cleanup issues.

## **Compact interview-ready answer**

Class components are React components written using ES6 classes. They use `this.state`, `this.setState`, and lifecycle methods like `componentDidMount` and `componentWillUnmount`. Before Hooks, class components were required for stateful logic. In modern React, functional components with Hooks are preferred, but understanding class components is still useful for maintaining legacy codebases.

---

# **12\. Props**

## **Simple meaning**

Props are inputs passed from a parent component to a child component.

Example:

function UserCard(\{ name, role \}) \{

 return (

   \<div\>

     \<h2\>\{name\}\</h2\>

     \<p\>\{role\}\</p\>

   \</div\>

 );

\}

function App() \{

 return \<UserCard name="Akhilesh" role="Staff Engineer" /\>;

\}

Here:

name and role are props

App passes props

UserCard receives props

## **Props are read-only**

A child component should not modify its props.

Bad:

function UserCard(\{ user \}) \{

 user.name \= "Changed"; // bad

 return \<h2\>\{user.name\}\</h2\>;

\}

Good:

function UserCard(\{ user \}) \{

 return \<h2\>\{user.name\}\</h2\>;

\}

If data needs to change, the parent should own the state and pass a callback.

function Parent() \{

 const \[name, setName\] \= React.useState("Akhilesh");

 return \<Child name=\{name\} onChangeName=\{setName\} /\>;

\}

function Child(\{ name, onChangeName \}) \{

 return (

   \<button onClick=\{() \=\> onChangeName("Rahul")\}\>

     Change \{name\}

   \</button\>

 );

\}

## **Props can pass anything**

Props can pass:

Strings

Numbers

Booleans

Arrays

Objects

Functions

React elements

Components

Example passing function:

\<Button onClick=\{handleSave\} /\>

Example passing children:

\<Card\>

 \<h2\>Report\</h2\>

 \<p\>Revenue details\</p\>

\</Card\>

## **Props help reuse components**

Instead of writing separate components:

PrimaryButton

SecondaryButton

DangerButton

We can write:

function Button(\{ variant, children \}) \{

 return \<button className=\{variant\}\>\{children\}\</button\>;

\}

Usage:

\<Button variant="primary"\>Save\</Button\>

\<Button variant="danger"\>Delete\</Button\>

## **Props and re-rendering**

When parent re-renders, child may also re-render.

If child receives new prop references like new objects/functions every time, memoized children may still re-render.

Example:

\<UserCard config=\{\{ showRole: true \}\} /\>

This creates a new object on every render.

Better if needed:

const config \= React.useMemo(() \=\> (\{ showRole: true \}), \[\]);

\<UserCard config=\{config\} /\>

## **Compact interview-ready answer**

Props are read-only inputs passed from a parent component to a child component. They allow components to be reusable and configurable. Props can contain values, objects, functions, React elements, or children. A child should not mutate props. If child needs to update data, the parent should pass a callback that updates parent state.

---

# **13\. State**

## **Simple meaning**

State is data that belongs to a component and can change over time.

When state changes, React re-renders the component.

Example:

function Counter() \{

 const \[count, setCount\] \= React.useState(0);

 return (

   \<button onClick=\{() \=\> setCount(count \+ 1)\}\>

     Count: \{count\}

   \</button\>

 );

\}

Here:

count \= current state value

setCount \= function to update state

## **State is used for interactive UI**

Examples of state:

Input value

Modal open/close

Selected tab

Expanded row

Form data

Current page number

Filter value

API loading status

Error message

Selected hotel

Selected campaign

## **State update triggers render**

setCount(count \+ 1);

This tells React:

State changed

Render this component again

Update UI if output changed

## **State should not be mutated directly**

Bad:

const \[user, setUser\] \= React.useState(\{ name: "Akhilesh" \});

user.name \= "Rahul"; // bad

setUser(user);

Good:

setUser(\{

 ...user,

 name: "Rahul"

\});

Why?

React compares references. If we mutate the same object, React may not detect the change correctly, and the code becomes unpredictable.

## **State updates can be asynchronous/batched**

React may batch multiple state updates together for performance.

Bad when depending on previous value:

setCount(count \+ 1);

setCount(count \+ 1);

If `count` is `0`, this may result in `1`, not `2`.

Better:

setCount(prev \=\> prev \+ 1);

setCount(prev \=\> prev \+ 1);

Answer: Final count becomes `2`.

## **State preservation**

React keeps track of which state belongs to which component based on its position in the UI tree. React docs explain that state is isolated between components and React tracks state based on where the component sits in the UI tree.

Example:

\{isOpen && \<Modal /\>\}

If `Modal` is removed from the tree, its state is destroyed.

If it appears again, it starts fresh.

## **Local state vs global state**

Use local state when only one component or a small subtree needs the data.

Example:

Dropdown open/close

Input value

Current tab

Modal visibility

Use shared/global state when many unrelated components need the same data.

Example:

Logged-in user

Theme

Permissions

Cart

Notifications

Feature flags

## **Compact interview-ready answer**

State is data owned by a component that can change over time. When state changes, React re-renders the component and updates the UI if needed. State should be treated as immutable, so we should update objects and arrays by creating new references. Local state is best for UI-specific data, while shared state is used when multiple parts of the app need the same data.

---

# **14\. One-way Data Flow**

## **Simple meaning**

One-way data flow means data flows from parent to child through props.

Parent state → Child props → UI

Child components do not directly change parent state.

Instead, parent passes a callback function to the child.

## **Example**

function Parent() \{

 const \[count, setCount\] \= React.useState(0);

 return (

   \<Child count=\{count\} onIncrement=\{() \=\> setCount(count \+ 1)\} /\>

 );

\}

function Child(\{ count, onIncrement \}) \{

 return (

   \<button onClick=\{onIncrement\}\>

     Count: \{count\}

   \</button\>

 );

\}

Here:

Parent owns state

Parent passes count to Child

Child calls onIncrement

Parent updates state

React re-renders UI

The child does not directly modify `count`.

## **Why one-way data flow is useful**

It makes the app easier to understand.

When something changes, we know where to look:

Who owns this state?

Who passes it down?

Who updates it?

This avoids unpredictable changes from multiple places.

## **Real-world example**

Suppose we have a filter panel and hotel list.

function HotelSearchPage() \{

 const \[filters, setFilters\] \= React.useState(\{\});

 return (

   \<\>

     \<FilterPanel filters=\{filters\} onChange=\{setFilters\} /\>

     \<HotelList filters=\{filters\} /\>

   \</\>

 );

\}

Data flow:

HotelSearchPage owns filters

FilterPanel receives filters and onChange

HotelList receives filters

When user changes filter, parent state updates

Both children get updated data

This is predictable.

## **One-way flow vs two-way binding**

In two-way binding, UI and data can update each other more directly.

React usually avoids automatic two-way binding.

React prefers explicit updates:

value comes from state

onChange updates state

Example:

function InputBox() \{

 const \[name, setName\] \= React.useState("");

 return (

   \<input

     value=\{name\}

     onChange=\{(e) \=\> setName(e.target.value)\}

   /\>

 );

\}

This is called a controlled component.

## **Compact interview-ready answer**

One-way data flow means data moves from parent to child through props. A child cannot directly modify parent state. If a child needs to trigger a change, the parent passes a callback function. This makes React apps predictable because state ownership is clear and UI updates follow a simple flow: state changes, props update, components re-render.

---

# **15\. Why React is Fast**

## **Important correction**

React is not automatically fast.

React gives us a good performance model, but we can still build a slow React app.

React is efficient because of several design choices.

## **1\. Declarative UI**

We describe what UI should look like.

\<h1\>\{count\}\</h1\>

We do not manually write all DOM update steps.

React handles updates.

This reduces bugs and avoids unnecessary manual DOM manipulation.

## **2\. Virtual DOM and reconciliation**

React creates a new UI tree after state changes and compares it with the old one.

Then it updates only necessary DOM parts.

## **3\. Batched updates**

React can group multiple state updates into fewer renders.

Example:

setName("Akhilesh");

setAge(34);

setCity("Bengaluru");

React can batch these updates instead of rendering separately for each update.

## **4\. Fiber scheduling**

React Fiber allows React to break rendering work into smaller units.

This helps React prioritize urgent updates, pause/resume work, and keep UI responsive.

## **5\. Component model**

React lets us split UI into components.

If state is placed properly, only relevant parts of the app need to update.

## **6\. Memoization options**

React provides tools like:

React.memo

useMemo

useCallback

React docs explain that `memo` allows React to skip re-rendering a component when its props have not changed, though it can still re-render if its own state or used context changes.

## **7\. Lazy loading and code splitting**

React supports lazy loading components with `React.lazy`, and the docs explain that lazy returns a component that can be rendered while code is being loaded, usually together with `Suspense`.

Example:

const ReportsPage \= React.lazy(() \=\> import("./ReportsPage"));

This helps avoid loading all code upfront.

## **8\. Good ecosystem**

Tools like Vite, Next.js, React Query, virtualization libraries, and bundlers help optimize React apps.

## **But React can be slow if:**

Large components re-render frequently

State is placed too high

Huge lists are rendered without virtualization

Expensive calculations happen during render

Unstable props break memoization

Too much context causes broad re-renders

Keys are unstable

Bundle size is too large

Images are not optimized

## **Compact interview-ready answer**

React is fast because it uses declarative UI, Virtual DOM, reconciliation, batched updates, Fiber scheduling, and a component-based architecture. It updates only necessary DOM changes instead of manually rebuilding the full UI. However, React is not automatically fast. Performance also depends on good state placement, stable keys, memoization where needed, code splitting, virtualization, and avoiding expensive render logic.

---

# **16\. Props vs State**

## **Simple meaning**

Props are data passed into a component.

State is data managed inside a component.

Props \= input from parent

State \= internal changing data

## **Props example**

function UserCard(\{ name \}) \{

 return \<h2\>\{name\}\</h2\>;

\}

\<UserCard name="Akhilesh" /\>

`name` is a prop.

The child receives it from parent.

## **State example**

function Counter() \{

 const \[count, setCount\] \= React.useState(0);

 return \<button\>\{count\}\</button\>;

\}

`count` is state.

The component owns it and can update it.

## **Comparison**

Props:

Passed from parent

Read-only inside child

Used to configure component

Changes when parent sends new value

State:

Owned by component

Can be updated by component

Used for interactive data

Changes cause re-render

## **Real-world example**

function CampaignCard(\{ campaign \}) \{

 const \[expanded, setExpanded\] \= React.useState(false);

 return (

   \<div\>

     \<h2\>\{campaign.name\}\</h2\>

     \<button onClick=\{() \=\> setExpanded(\!expanded)\}\>

       Toggle Details

     \</button\>

     \{expanded && \<p\>\{campaign.description\}\</p\>\}

   \</div\>

 );

\}

Here:

campaign \= prop

expanded \= state

The campaign data comes from parent.

The expanded/collapsed status belongs to this card.

## **When to use props**

Use props when:

Parent has data

Child needs to display it

Child needs configuration

Child needs callback from parent

## **When to use state**

Use state when:

Data changes over time

Component needs to remember something

User interaction changes UI

Component owns the data

## **Common mistake**

Do not copy props into state unless you really need to.

Bad:

function UserCard(\{ name \}) \{

 const \[localName, setLocalName\] \= React.useState(name);

 return \<h2\>\{localName\}\</h2\>;

\}

This can become stale if `name` prop changes later.

Better:

function UserCard(\{ name \}) \{

 return \<h2\>\{name\}\</h2\>;

\}

Use local state only if the component truly needs independent editable data.

## **Compact interview-ready answer**

Props are read-only inputs passed from parent to child. State is data owned and managed by a component. Props make components reusable and configurable. State is used for data that changes over time, usually because of user interaction or async updates. Props flow downward, while state updates trigger re-rendering.

---

# **17\. StrictMode**

You wrote “StringMode”, but the React concept is **StrictMode**.

## **Simple meaning**

StrictMode is a development-only tool in React that helps find potential bugs in components.

You use it like this:

\<React.StrictMode\>

 \<App /\>

\</React.StrictMode\>

It does not render any visible UI.

It does not affect production behavior.

It only adds extra checks during development.

React docs explain that StrictMode helps find bugs caused by impure rendering by calling certain pure functions twice in development.

## **Why StrictMode exists**

React expects components to be pure.

That means:

Same props \+ same state \+ same context \= same JSX output

Bad component:

let count \= 0;

function CounterLabel() \{

 count++;

 return \<p\>\{count\}\</p\>;

\}

This component is impure because it changes external variable during render.

StrictMode helps expose such issues.

## **Common StrictMode behaviors**

In development, StrictMode may:

Render components twice

Run effects setup and cleanup extra times

Detect unsafe lifecycle usage

Detect missing cleanup

Help find accidental side effects

For Effects, React docs mention that StrictMode runs one extra development-only setup and cleanup cycle before the first real setup to stress-test cleanup logic.

Example:

function ChatRoom() \{

 React.useEffect(() \=\> \{

   const connection \= connect();

   return () \=\> \{

     connection.disconnect();

   \};

 \}, \[\]);

 return \<h1\>Chat\</h1\>;

\}

StrictMode helps check whether cleanup is correct.

## **Why API calls may appear twice in development**

Sometimes developers see API calls happening twice in development.

This can happen because StrictMode intentionally re-runs certain logic to reveal bugs.

This does not mean production will also call it twice.

But it does mean your effect should be written safely.

Bad:

React.useEffect(() \=\> \{

 subscribeToSocket();

\}, \[\]);

If cleanup is missing, duplicate subscriptions can happen.

Better:

React.useEffect(() \=\> \{

 const unsubscribe \= subscribeToSocket();

 return () \=\> \{

   unsubscribe();

 \};

\}, \[\]);

## **Should we remove StrictMode?**

Usually, no.

StrictMode helps catch problems early.

Removing it may hide bugs that can appear later with concurrent rendering, remounting, or lifecycle issues.

## **Compact interview-ready answer**

StrictMode is a development-only React tool that helps detect potential bugs. It does not affect production UI. In development, it may intentionally render components twice or run effects setup and cleanup extra times to find impure rendering and missing cleanup logic. It is useful because React components should be pure and effects should clean up properly.

---

# **18\. Common Interview Topics and Questions**

## **1\. What is React?**

React is a JavaScript library for building user interfaces using reusable components. It lets us describe UI declaratively based on state and props. When data changes, React re-renders components, compares the new UI tree with the old one, and updates only the necessary DOM parts.

## **2\. What is Virtual DOM?**

Virtual DOM is React’s lightweight JavaScript representation of the UI. React creates a new Virtual DOM tree after state or props change, compares it with the previous tree, and then updates the real DOM where needed.

## **3\. Real DOM vs Virtual DOM?**

The Real DOM is the actual browser DOM. The Virtual DOM is a JavaScript representation of the UI. React uses the Virtual DOM to calculate changes before committing updates to the Real DOM.

## **4\. What is reconciliation?**

Reconciliation is the process where React compares the old React tree with the new React tree and decides what needs to change in the real DOM.

## **5\. What causes a React component to re-render?**

Common causes:

* State update  
* Parent re-render  
* Props change  
* Context value change  
* External store update  
* Route change

## **6\. Does re-render always mean DOM update?**

No. A component may re-render, but if the resulting UI is same, React may not update the DOM.

## **7\. Why are keys important?**

Keys help React identify list items across renders. They preserve correct component identity when items are inserted, deleted, sorted, or reordered.

## **8\. Why should we avoid index as key?**

Index as key can cause wrong state preservation when list order changes. It can attach input values, checkbox states, expanded states, or selected states to the wrong item.

## **9\. What is JSX?**

JSX is a syntax extension that lets us write HTML-like code inside JavaScript. It gets compiled into React elements.

## **10\. What is a React element?**

A React element is a plain JavaScript object that describes what should be rendered. It is not the same as a real DOM node.

## **11\. What is a component?**

A component is a reusable piece of UI. It can receive props, manage state, return JSX, and be composed with other components.

## **12\. Functional vs class components?**

Functional components are JavaScript functions that return JSX and use Hooks for state/effects. Class components use ES6 classes, `this.state`, `this.setState`, and lifecycle methods. Modern React mostly prefers functional components.

## **13\. Props vs state?**

Props are read-only inputs passed from parent to child. State is data owned by a component and can change over time.

## **14\. What is one-way data flow?**

Data flows from parent to child through props. If child wants to update parent data, parent passes a callback.

## **15\. Why is React fast?**

React is efficient because of declarative UI, Virtual DOM, reconciliation, batched updates, Fiber scheduling, stable component model, and optimization tools like memoization and lazy loading. But React apps can still be slow if designed poorly.

## **16\. What is StrictMode?**

StrictMode is a development-only tool that helps detect bugs like impure rendering and missing cleanup. It may intentionally render components or run effects extra times in development.

---

# **Final Compact Revision**

React is a JavaScript library for building UI using reusable components.

A React app is built using components, props, and state.

Props are read-only inputs from parent to child.

State is internal data that changes over time and triggers re-rendering.

JSX lets us write HTML-like syntax inside JavaScript.

JSX creates React elements, which are lightweight JavaScript objects describing the UI.

When state or props change, React re-renders components and creates a new React tree.

React then performs reconciliation, where it compares the old tree with the new tree.

If element types are different, React replaces the subtree.

If element types are same, React reuses the DOM node or component and updates changed props or children.

For lists, React uses keys to preserve correct item identity.

After reconciliation, React commits the required changes to the real DOM.

This is why rendering and DOM updates are not the same thing.

React’s update flow is:

Trigger → Render → Reconciliation → Commit

React is efficient because of declarative UI, reconciliation, batched updates, Fiber scheduling, memoization options, lazy loading, and good component architecture.

StrictMode helps catch bugs during development by exposing impure rendering and missing cleanup logic.

Final mental model:

UI \= function of state

State changes

     ↓

React renders

     ↓

React compares

     ↓

React updates DOM

This is the foundation of React.

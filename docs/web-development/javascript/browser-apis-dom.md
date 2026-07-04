---
title: Browser APIs & DOM
sidebar_position: 24
---

# Browser APIs & DOM

## **DOM Basics**

## **DOM Traversal**

## **DOM Manipulation**

## **Event Handling**

[https://javascript.info/introduction-browser-events](https://javascript.info/introduction-browser-events)

## **Event Bubbling & Event Capturing**

[https://javascript.info/bubbling-and-capturing](https://javascript.info/bubbling-and-capturing)

## **Event Delegation**

[https://javascript.info/event-delegation](https://javascript.info/event-delegation)

## **Web APIs**

* ## **LocalStorage & SessionStorage**

  * https://javascript.info/localstorage

* ## **Cookies**

  * https://javascript.info/cookie

* ## **IndexedDB**

* ## **Web Workers**

* ## **Service Workers**

## **Fetch API**

https://javascript.info/fetch-api

## **Timers**

* setTimeout  
* setInterval

[https://javascript.info/settimeout-setinterval](https://javascript.info/settimeout-setinterval)

## **Geolocation API**

## **Intersection Observer**

## **Mutation Observer**

https://javascript.info/mutation-observer

## **Common Interview Topics**

* Event delegation  
* localStorage vs sessionStorage vs cookies

## **1\. Storage Mechanisms: LocalStorage vs. SessionStorage vs. Cookies vs. IndexedDB**

These four APIs handle data persistence on the client side, but they serve fundamentally different architectural purposes.

### **Architectural & Performance Breakdown**

| Feature | LocalStorage | SessionStorage | Cookies | IndexedDB |
| :---- | :---- | :---- | :---- | :---- |
| **Capacity** | \~5MB – 10MB | \~5MB | \~4KB (per cookie) | Variable (often 50%+ of free disk space) |
| **API Type** | Synchronous, Key-Value | Synchronous, Key-Value | Synchronous, Text String | Asynchronous, Event-driven, NoSQL |
| **Thread** | Main Thread (Blocking) | Main Thread (Blocking) | Main Thread (Blocking) | Non-blocking (Asynchronous) |
| **Data Types** | Strings only | Strings only | Strings only | Structured objects, Blobs, Files |
| **Network Transfer** | Manual | Manual | Automatic via HTTP headers | Manual |
| **Lifecycle** | Persistent until deleted | Tab/Window lifetime | Defined by Expires/Max-Age | Persistent until deleted |

### 

### **Deep-Dive & Security Aspects**

#### 

#### **LocalStorage & SessionStorage (Web Storage)**

* **The Mechanism:** Both share the same Storage interface. LocalStorage persists globally across tabs sharing the same origin. SessionStorage is scoped strictly to the specific top-level browsing context (tab); even if two tabs have the same URL, they get separate SessionStorage instances.  
* **Performance Hit:** Because both APIs are **synchronous**, reading or writing large payloads blocks the main execution thread, potentially degrading UI rendering frame rates.  
* **Security:** Highly vulnerable to **Cross-Site Scripting (XSS)**. If an attacker injects a malicious script, they can instantly steal everything via JSON.stringify(localStorage). **Never store JWTs, access tokens, or sensitive PII here.**

#### **Cookies**

* **The Mechanism:** Primarily designed for session management and server-side read access. They are automatically appended to every outgoing HTTP request matching the cookie's domain/path rules.  
* **Security (The Hardening Layer):** Unlike Web Storage, cookies can be effectively hardened against XSS and **Cross-Site Request Forgery (CSRF)** using specific flags:  
  * HttpOnly: Prevents client-side JavaScript from accessing the cookie (document.cookie returns empty for it), neutralizing XSS token theft.  
  * Secure: Ensures the cookie is only transmitted over encrypted (HTTPS) connections.  
  * SameSite: Controls cross-origin transmission to mitigate **CSRF attacks**.   
    * Options are   
      * Strict (never send on cross-site requests),   
      * Lax (sent on top-level navigations), or   
      * None (requires Secure).

#### **IndexedDB**

* **The Mechanism:** A full transactional, object-oriented database embedded in the browser. It handles massive, structured datasets, supports indexing, and processes queries asynchronously using a request-based workflow (or wrapped in Promise-based libraries like idb).  
* **Use Cases:** PWA offline synchronization, caching large structured application states, storing media assets as Blobs.  
* **Security:** Governed by the **Same-Origin Policy (SOP)**. However, because it is accessible via client-side JS, it is still vulnerable to XSS extraction. If an attacker gains script execution, they can open your database and cursor through all stored records.

## **2\. Background Processing: Web Workers vs. Service Workers**

While the storage APIs hold state, Workers give us multi-threading capabilities, moving heavy lift operations off the main execution thread.

### **Architectural & Performance Breakdown**

| Feature | Web Workers (Dedicated) | Service Workers |
| :---- | :---- | :---- |
| **Intent / Focus** | Parallelism & heavy computation | Network proxying, offline support, background tasks |
| **Instance Scope** | 1:1 with the script/tab that spawned it | 1:Many (Controls all tabs within its domain scope) |
| **Lifecycle** | Tied to the tab; dies when tab closes | Independent; spins up/down on demand/events |
| **Network Interception** | No | Yes (via the fetch event) |
| **DOM Access** | No | No |
| **Communication** | postMessage API | postMessage API or BroadcastChannel |

### 

### **Deep-Dive & Security Aspects**

#### 

#### **Web Workers**

* **The Mechanism:** Standard OS-level OS threading simulated via the browser environment. They do not share memory with the main thread (unless using SharedArrayBuffer with atomics), meaning data passed via postMessage is deep-copied using the **Structured Clone Algorithm**, which can incur a performance overhead for massive payloads.  
* **Use Cases:** Image/video manipulation, heavy cryptographic math, parsing massive JSON payloads, canvas rendering via OffscreenCanvas.  
* **Security:** They run in an isolated execution context but share the same origin. Content Security Policies (CSP) must explicitly configure the worker-src directive to control which scripts can be spawned as workers, preventing attackers from launching unauthorized background execution threads.

#### **Service Workers**

* **The Mechanism:** A specialized type of worker that acts as a programmable network proxy sitting between your web app, the browser cache, and the network. Because they run independently of the UI lifecycle, they can wake up in the background even when your website is completely closed.  
* **Use Cases:** Progressive Web Apps (PWAs), offline fallback strategies, advanced asset caching (Cache Storage API), background data synchronization (SyncManager), and push notifications.  
* **Security:** \* **HTTPS Only:** Because Service Workers can intercept and modify *all* network requests (including authentication headers and API responses), they require a secure context (HTTPS) to prevent Man-in-the-Middle (MITM) attacks.  
  * **Scope Constraints:** A service worker cannot intercept requests above its directory path unless the server explicitly sends a Service-Worker-Allowed HTTP response header.  
  * **Cache Poisoning:** If your application is compromised via XSS, an attacker could programmatically manipulate the Service Worker's cache to permanently serve malicious versions of your JS/HTML files, surviving subsequent deployments.

## **Architecture Synthesis: Choosing Your Tech Stack**

When designing a modern, highly secure web application, these APIs are usually orchestrated together rather than used in isolation:

1. **Authentication & Sessions:** Store your short-lived access tokens in application memory (JS variables) and your refresh tokens in an HttpOnly, Secure, SameSite=Strict **Cookie**. Avoid LocalStorage for session-critical data.  
2. **App State & User Prefs:** Use **LocalStorage** for non-sensitive, low-footprint configurations (e.g., UI theme preferences, sidebar toggle states).  
3. **Heavy Processing:** If you need to encrypt large files client-side before upload or run client-side analytics, spin up a **Web Worker** so your UI doesn't stutter.  
4. **Offline Capability & Speed:** Implement a **Service Worker** to intercept network calls, serving UI assets instantly from the Cache Storage API, while querying **IndexedDB** for cached, structured business data.

# **DOM, Events, and Web APIs**

DOM and Web APIs are important frontend interview topics because they test how the browser exposes the page to JavaScript. React handles a lot of DOM work for us, but senior frontend interviews still expect strong understanding of DOM traversal, manipulation, event propagation, browser storage, timers, fetch, observers, and workers.

---

# **1\. DOM Basics**

DOM stands for **Document Object Model**. It is the browser’s object-based representation of an HTML document.

## **Simple meaning**

The browser converts HTML into a tree of nodes. JavaScript can read, update, add, or remove those nodes.

\<div id="app"\>  
  \<h1\>Hello\</h1\>  
\</div\>

const app \= document.getElementById("app");

console.log(app.tagName); // "DIV"

## **Key mental model**

HTML is the source text. DOM is the live object tree created by the browser.

If JavaScript changes the DOM, the visible page can update.

## **Common node types**

* `document`: root entry point.  
* `Element`: HTML elements like `div`, `button`, `input`.  
* `Text`: text inside elements.  
* `Comment`: HTML comments.  
* `DocumentFragment`: lightweight container for DOM nodes.

## **Common selection methods**

document.getElementById("app");  
document.querySelector(".card");  
document.querySelectorAll(".item");  
document.getElementsByClassName("item");  
document.getElementsByTagName("div");

## **Important trap**

`querySelectorAll` returns a static `NodeList`, while methods like `getElementsByClassName` return a live `HTMLCollection`.

const items \= document.querySelectorAll(".item");

console.log(items.length); // Static length at query time

## **Interview-ready answer**

DOM is the browser’s live object representation of HTML. JavaScript can use DOM APIs to select, traverse, update, create, and remove elements. React abstracts most direct DOM manipulation, but understanding DOM is still important for events, refs, portals, accessibility, and browser APIs.

---

# **2\. DOM Traversal**

DOM traversal means moving between nodes in the DOM tree.

## **Simple meaning**

Once we select an element, we can move to its parent, children, siblings, or closest matching ancestor.

const item \= document.querySelector(".item");

console.log(item.parentElement);  
console.log(item.children);  
console.log(item.nextElementSibling);

## **Common traversal APIs**

element.parentElement;  
element.children;  
element.firstElementChild;  
element.lastElementChild;  
element.previousElementSibling;  
element.nextElementSibling;  
element.closest(".container");  
element.matches(".active");

## **Practical example**

const button \= event.target.closest("button");

if (\!button) return;

console.log(button.dataset.action);

This is commonly used in event delegation.

## **`children` vs `childNodes`**

const container \= document.querySelector("\#container");

console.log(container.children); // Only element nodes  
console.log(container.childNodes); // Elements, text nodes, comments

## **Important trap**

Whitespace in HTML can create text nodes. So `childNodes` may include text nodes for spaces/new lines.

## **Interview-ready answer**

DOM traversal means navigating between DOM nodes using APIs like `parentElement`, `children`, `nextElementSibling`, `closest`, and `matches`. In real frontend code, `closest` and `matches` are especially useful for event delegation and finding relevant parent elements.

---

# **3\. DOM Manipulation**

DOM manipulation means changing the page using JavaScript.

## **Simple meaning**

We can create, update, insert, remove, or replace elements.

const title \= document.querySelector("h1");

title.textContent \= "Updated title";

## **Common APIs**

document.createElement("div");  
element.textContent \= "Hello";  
element.innerHTML \= "\<strong\>Hello\</strong\>";  
element.classList.add("active");  
element.classList.remove("hidden");  
element.setAttribute("aria-expanded", "true");  
element.append(child);  
element.prepend(child);  
element.remove();

## **Create and append element**

const li \= document.createElement("li");

li.textContent \= "New item";

document.querySelector("ul").append(li);

## **`textContent` vs `innerHTML`**

element.textContent \= userInput;

Use `textContent` for plain text.

element.innerHTML \= "\<strong\>Hello\</strong\>";

Use `innerHTML` only when you intentionally want to parse HTML.

## **Important security trap**

Never put untrusted user input directly into `innerHTML`.

element.innerHTML \= userInput; // XSS risk

Better:

element.textContent \= userInput;

## **Performance trap**

Frequent DOM updates can cause layout/reflow cost. Batch updates when possible.

const fragment \= document.createDocumentFragment();

items.forEach((item) \=\> \{  
  const li \= document.createElement("li");  
  li.textContent \= item;  
  fragment.append(li);  
\});

list.append(fragment);

## **Interview-ready answer**

DOM manipulation means changing elements, attributes, classes, text, or structure using JavaScript. We should prefer safe APIs like `textContent` for user text, avoid unnecessary direct DOM updates, batch changes when possible, and be careful with `innerHTML` because it can create XSS risks.

---

# **4\. Event Handling**

Events are signals that something happened in the browser, like a click, key press, form submit, page load, or mouse movement.

## **Simple meaning**

An event handler is a function that runs when an event happens.

const button \= document.querySelector("button");

button.addEventListener("click", function () \{  
  console.log("Clicked");  
\});

## **Common event types**

* Mouse: `click`, `mousedown`, `mouseup`, `mousemove`  
* Keyboard: `keydown`, `keyup`  
* Form: `submit`, `input`, `change`, `focus`, `blur`  
* Document: `DOMContentLoaded`  
* CSS: `transitionend`

## **`onclick` vs `addEventListener`**

button.onclick \= function () \{  
  console.log("One handler only");  
\};

`onclick` can be overwritten.

button.addEventListener("click", handler1);  
button.addEventListener("click", handler2);

`addEventListener` supports multiple handlers and options.

## **Event object**

button.addEventListener("click", function (event) \{  
  console.log(event.type); // "click"  
  console.log(event.target);  
  console.log(event.currentTarget);  
\});

## **`target` vs `currentTarget`**

parent.addEventListener("click", function (event) \{  
  console.log(event.target); // Actual clicked element  
  console.log(event.currentTarget); // Element where listener is attached  
\});

## **Remove event listener**

function handleClick() \{  
  console.log("Clicked");  
\}

button.addEventListener("click", handleClick);  
button.removeEventListener("click", handleClick);

## **Important trap**

This does not remove the listener:

button.addEventListener("click", () \=\> console.log("Clicked"));  
button.removeEventListener("click", () \=\> console.log("Clicked"));

Answer: Both arrow functions are different references.

## **Interview-ready answer**

Event handling means responding to browser events using handlers. `addEventListener` is preferred because it supports multiple handlers and options like `capture`, `once`, and `passive`. A common trap is that `removeEventListener` needs the same function reference that was used while adding the listener.

---

# **5\. Event Bubbling and Event Capturing**

Events move through the DOM in phases.

## **Simple meaning**

When an event happens on an element, it does not only belong to that element. It travels through the DOM tree.

## **Event phases**

1. **Capturing phase:** event travels from document/root down to the target.  
2. **Target phase:** event reaches the actual target element.  
3. **Bubbling phase:** event travels back up from target to ancestors.

## **Example**

\<div id="parent"\>  
  \<button id="child"\>Click\</button\>  
\</div\>

parent.addEventListener("click", () \=\> \{  
  console.log("Parent clicked");  
\});

child.addEventListener("click", () \=\> \{  
  console.log("Child clicked");  
\});

When clicking the button:

// "Child clicked"  
// "Parent clicked"

Why? The event happens on child, then bubbles up to parent.

## **Capturing example**

parent.addEventListener(  
  "click",  
  () \=\> \{  
    console.log("Parent capture");  
  \},  
  true  
);

child.addEventListener("click", () \=\> \{  
  console.log("Child");  
\});

Output:

// "Parent capture"  
// "Child"

## **Stop bubbling**

child.addEventListener("click", (event) \=\> \{  
  event.stopPropagation();  
  console.log("Child clicked");  
\});

Now parent click handler will not run for this click.

## **Important trap**

Use `stopPropagation()` carefully. It can break parent-level handlers, analytics, modals, dropdown closing, or event delegation.

## **Interview-ready answer**

Event capturing is the phase where an event travels from the root down to the target. Event bubbling is the phase where it travels back from the target to its ancestors. By default, most event listeners run in the bubbling phase. We can listen during capture by passing `\{ capture: true \}` or `true`.

---

# **6\. Event Delegation**

Event delegation means attaching one event listener to a parent instead of attaching listeners to many child elements.

## **Simple meaning**

Handle child events from a common parent using event bubbling.

\<ul id="list"\>  
  \<li data-id="1"\>Item 1\</li\>  
  \<li data-id="2"\>Item 2\</li\>  
\</ul\>

const list \= document.querySelector("\#list");

list.addEventListener("click", function (event) \{  
  const item \= event.target.closest("li");

  if (\!item) return;

  console.log(item.dataset.id);  
\});

## **Key mental model**

Because clicks bubble up, the parent can catch clicks from its children.

## **Why event delegation is useful**

* Fewer event listeners.  
* Better performance for large lists.  
* Works for dynamically added items.  
* Cleaner event management.  
* Useful for tables, menus, dropdowns, lists, and grids.

## **Practical frontend example**

Instead of adding one listener to every row in a table, add one listener to the table body and detect which row was clicked.

tableBody.addEventListener("click", (event) \=\> \{  
  const row \= event.target.closest("tr");

  if (\!row) return;

  console.log(row.dataset.rowId);  
\});

## **Important traps**

Always check that the matched element belongs to the intended container.

const button \= event.target.closest("button");

if (\!button || \!container.contains(button)) return;

Some events do not bubble normally, like `focus` and `blur`. Use `focusin` and `focusout` if delegation is needed.

## **Interview-ready answer**

Event delegation uses event bubbling to handle events from child elements at a parent level. It reduces the number of listeners and works well for dynamic lists or tables. We usually use `event.target`, `closest`, and `dataset` to identify the clicked child.

---

# **7\. LocalStorage and SessionStorage**

`localStorage` and `sessionStorage` are browser storage APIs for storing string key-value data.

## **Simple meaning**

They let us store small amounts of data in the browser.

localStorage.setItem("theme", "dark");

console.log(localStorage.getItem("theme")); // "dark"

## **localStorage**

Data remains even after closing and reopening the browser.

localStorage.setItem("token", "abc");  
localStorage.removeItem("token");  
localStorage.clear();

## **sessionStorage**

Data remains only for the current tab session. It is cleared when the tab is closed.

sessionStorage.setItem("step", "2");

console.log(sessionStorage.getItem("step")); // "2"

## **Important points**

* Stores only strings.  
* Use `JSON.stringify` for objects.  
* Use `JSON.parse` while reading objects.  
* Synchronous API.  
* Not secure for sensitive data.  
* Can be accessed by JavaScript, so it is vulnerable if XSS exists.

const user \= \{ id: 1, name: "Akhilesh" \};

localStorage.setItem("user", JSON.stringify(user));

const savedUser \= JSON.parse(localStorage.getItem("user"));

console.log(savedUser.name); // "Akhilesh"

## **Practical frontend use cases**

* Theme preference.  
* Language preference.  
* Non-sensitive UI preferences.  
* Draft form state.  
* Recently viewed items.  
* Feature flags cached locally.

## **Common mistake**

Do not store access tokens or sensitive information in localStorage if avoidable, because JavaScript can read it and XSS can steal it.

## **Interview-ready answer**

`localStorage` and `sessionStorage` store string key-value data in the browser. `localStorage` persists across browser sessions, while `sessionStorage` is scoped to the current tab session. Both are synchronous and accessible by JavaScript, so they should not store sensitive data.

---

# **8\. Cookies**

Cookies are small key-value data stored by the browser and commonly sent with HTTP requests.

## **Simple meaning**

Cookies are mainly used for session management, authentication, tracking preferences, and server-client communication.

document.cookie \= "theme=dark";  
console.log(document.cookie);

## **Cookie attributes**

Common attributes:

* `Expires` / `Max-Age`: controls expiry.  
* `Path`: controls where cookie is available.  
* `Domain`: controls which domain can access it.  
* `Secure`: sent only over HTTPS.  
* `HttpOnly`: not accessible by JavaScript, set by server.  
* `SameSite`: controls cross-site sending behavior.

## **Important security point**

`HttpOnly` cookies cannot be read by JavaScript. This helps protect tokens from XSS stealing.

Example server-set cookie:

Set-Cookie: sessionId=abc123; HttpOnly; Secure; SameSite=Lax

## **Practical frontend point**

Frontend JavaScript can create/read normal cookies using `document.cookie`, but cannot read or create `HttpOnly` cookies.

## **Cookies vs localStorage**

Cookies can be automatically sent with HTTP requests. `localStorage` is not automatically sent.

## **Common mistake**

Storing sensitive tokens in JavaScript-readable cookies or localStorage can be risky. For secure auth, `HttpOnly`, `Secure`, and `SameSite` cookies are generally preferred.

## **Interview-ready answer**

Cookies are small browser-stored values that can be sent automatically with HTTP requests. They are commonly used for sessions and authentication. Security attributes like `HttpOnly`, `Secure`, and `SameSite` are important. Unlike localStorage, cookies can be automatically included in requests, but they have smaller storage limits and need careful security configuration.

---

# **9\. IndexedDB**

IndexedDB is a browser database for storing larger and more structured client-side data.

## **Simple meaning**

Use IndexedDB when localStorage is too small or too simple.

## **Key mental model**

`localStorage` is simple string storage. IndexedDB is an async database in the browser.

## **Good use cases**

* Offline-first apps.  
* Large cached API responses.  
* Files/blobs.  
* Complex structured data.  
* Background sync queues.  
* Progressive Web Apps.  
* Large forms or drafts.

## **Important points**

* Asynchronous API.  
* Stores objects, files, blobs, and structured data.  
* Supports indexes and transactions.  
* More powerful but more complex than localStorage.  
* Often used through helper libraries like `idb`.

## **Interview-ready answer**

IndexedDB is a client-side database for storing large and structured data in the browser. It is asynchronous and supports transactions, indexes, objects, and blobs. It is useful for offline-first apps, large caches, and PWAs, but it is more complex than localStorage.

---

# **10\. Web Workers**

Web Workers allow JavaScript to run code in a background thread separate from the main UI thread.

## **Simple meaning**

Use Web Workers for heavy work that should not freeze the UI.

## **Key mental model**

Main thread handles UI. Worker handles CPU-heavy tasks.

const worker \= new Worker("worker.js");

worker.postMessage(\{ numbers: \[1, 2, 3\] \});

worker.onmessage \= function (event) \{  
  console.log(event.data);  
\};

// worker.js  
self.onmessage \= function (event) \{  
  const result \= event.data.numbers.reduce((sum, n) \=\> sum \+ n, 0);

  self.postMessage(result);  
\};

## **Practical frontend use cases**

* Large data processing.  
* CSV parsing.  
* Image processing.  
* Search indexing.  
* Compression.  
* Heavy calculations.  
* Avoiding UI jank.

## **Important limitations**

* Workers cannot directly access the DOM.  
* Communication happens using `postMessage`.  
* Data is copied or transferred.  
* Setup adds complexity.

## **Interview-ready answer**

Web Workers run JavaScript in a background thread, which helps keep the UI responsive during heavy computation. They communicate with the main thread using `postMessage`, but they cannot directly access or manipulate the DOM.

---

# **11\. Service Workers**

A Service Worker is a browser background script that can intercept network requests, cache resources, and enable offline behavior.

## **Simple meaning**

Service Workers sit between the web app and network.

## **Key mental model**

The page asks for a resource. The Service Worker can decide to serve from cache, go to network, or update cache.

## **Common use cases**

* Offline support.  
* Asset caching.  
* PWA behavior.  
* Background sync.  
* Push notifications.  
* Network request caching.

## **Basic registration**

if ("serviceWorker" in navigator) \{  
  navigator.serviceWorker.register("/service-worker.js");  
\}

## **Important points**

* Runs separately from the page.  
* Requires HTTPS, except localhost.  
* Cannot directly access the DOM.  
* Uses Cache API for caching resources.  
* Can intercept fetch requests.  
* Lifecycle includes install, activate, and fetch events.

## **Interview-ready answer**

A Service Worker is a background script that can intercept network requests and cache resources. It is commonly used for PWAs, offline support, push notifications, and improving repeat-load performance. It cannot directly access the DOM and usually requires HTTPS.

---

# **12\. Fetch API**

Fetch is a browser API for making HTTP requests. It returns a promise.

## **Simple meaning**

Use `fetch` to call APIs.

async function getUsers() \{  
  const response \= await fetch("/api/users");  
  const data \= await response.json();

  return data;  
\}

## **Important behavior**

`fetch` rejects on network failure, but it does not automatically reject for HTTP status codes like `404` or `500`.

async function request(url) \{  
  const response \= await fetch(url);

  if (\!response.ok) \{  
    throw new Error(\`HTTP error: $\{response.status\}\`);  
  \}

  return response.json();  
\}

## **POST example**

async function createUser(user) \{  
  const response \= await fetch("/api/users", \{  
    method: "POST",  
    headers: \{  
      "Content-Type": "application/json",  
    \},  
    body: JSON.stringify(user),  
  \});

  if (\!response.ok) \{  
    throw new Error(\`HTTP error: $\{response.status\}\`);  
  \}

  return response.json();  
\}

## **Practical frontend points**

* Manage loading, success, and error states.  
* Handle `response.ok`.  
* Use `AbortController` to cancel stale requests.  
* Avoid duplicate API calls.  
* Handle retries and timeouts where needed.

## **Interview-ready answer**

Fetch is a promise-based browser API for HTTP requests. It rejects for network errors, but not for HTTP error statuses like `404` or `500`, so we should check `response.ok` manually. It is commonly used with `async/await`, error handling, and `AbortController`.

---

# **13\. Timers: `setTimeout` and `setInterval`**

Timers schedule code to run later.

## **`setTimeout`**

Runs code once after a delay.

const timerId \= setTimeout(() \=\> \{  
  console.log("Runs once");  
\}, 1000);

clearTimeout(timerId);

## **`setInterval`**

Runs code repeatedly after every delay.

const intervalId \= setInterval(() \=\> \{  
  console.log("Runs repeatedly");  
\}, 1000);

clearInterval(intervalId);

## **Key mental model**

Timers do not guarantee exact execution time. They schedule callbacks after at least the given delay, but the callback runs only when the call stack is free.

## **Important trap**

`setInterval` can cause overlapping or delayed execution if the callback takes longer than the interval.

Better for polling in some cases:

function poll() \{  
  setTimeout(async () \=\> \{  
    await fetchData();

    poll();  
  \}, 5000);  
\}

poll();

This schedules the next call after the previous work finishes.

## **React cleanup**

useEffect(() \=\> \{  
  const intervalId \= setInterval(() \=\> \{  
    console.log("Polling");  
  \}, 5000);

  return () \=\> \{  
    clearInterval(intervalId);  
  \};  
\}, \[\]);

## **Interview-ready answer**

`setTimeout` runs a callback once after a delay, while `setInterval` runs repeatedly. Timers are not exact because callbacks wait for the call stack to be free. In React or long-lived pages, timers should be cleaned up to avoid memory leaks.

---

# **14\. Geolocation API**

The Geolocation API allows the browser to get the user’s location with permission.

## **Simple meaning**

Use it when the app needs the user’s current location.

navigator.geolocation.getCurrentPosition(  
  (position) \=\> \{  
    console.log(position.coords.latitude);  
    console.log(position.coords.longitude);  
  \},  
  (error) \=\> \{  
    console.log(error.message);  
  \}  
);

## **Common use cases**

* Nearby stores.  
* Ride booking.  
* Weather apps.  
* Delivery address suggestions.  
* Maps and navigation.

## **Important points**

* Requires user permission.  
* Usually requires secure context.  
* Can fail if user denies permission.  
* Location may be inaccurate.  
* Should handle loading, success, and error states.

## **Watch location**

const watchId \= navigator.geolocation.watchPosition((position) \=\> \{  
  console.log(position.coords.latitude);  
\});

navigator.geolocation.clearWatch(watchId);

## **Interview-ready answer**

The Geolocation API provides access to the user’s location after permission. It is useful for maps, nearby search, delivery, and ride apps. We must handle permission denial, errors, accuracy issues, and cleanup when using `watchPosition`.

---

# **15\. Intersection Observer**

Intersection Observer watches when an element enters or leaves the viewport or another container.

## **Simple meaning**

Use it to detect visibility without manually listening to scroll events.

const observer \= new IntersectionObserver((entries) \=\> \{  
  entries.forEach((entry) \=\> \{  
    if (entry.isIntersecting) \{  
      console.log("Element visible");  
    \}  
  \});  
\});

observer.observe(document.querySelector("\#target"));

## **Practical frontend use cases**

* Lazy loading images.  
* Infinite scroll.  
* Triggering animations on visibility.  
* Tracking ad impressions.  
* Loading sections only when visible.

## **Important options**

const observer \= new IntersectionObserver(callback, \{  
  root: null,  
  rootMargin: "0px",  
  threshold: 0.5,  
\});

* `root`: viewport or scroll container.  
* `rootMargin`: margin around root.  
* `threshold`: how much visibility is required.

## **Cleanup**

observer.unobserve(element);  
observer.disconnect();

## **Interview-ready answer**

Intersection Observer detects when an element becomes visible or hidden relative to the viewport or a container. It is better than manually handling scroll for use cases like lazy loading, infinite scroll, animations, and impression tracking.

---

# **16\. Mutation Observer**

Mutation Observer watches changes in the DOM.

## **Simple meaning**

Use it when you need to react to DOM changes like added nodes, removed nodes, or attribute changes.

const observer \= new MutationObserver((mutations) \=\> \{  
  mutations.forEach((mutation) \=\> \{  
    console.log(mutation.type);  
  \});  
\});

observer.observe(document.body, \{  
  childList: true,  
  subtree: true,  
  attributes: true,  
\});

## **Common mutation types**

* `childList`: child nodes added or removed.  
* `attributes`: attributes changed.  
* `characterData`: text content changed.  
* `subtree`: observe descendants too.

## **Practical frontend use cases**

* Integrating with third-party scripts.  
* Tracking DOM changes outside React.  
* Observing injected widgets.  
* Detecting dynamically added elements.  
* Custom analytics/debugging tools.

## **Cleanup**

observer.disconnect();

## **Important trap**

Mutation Observer can become expensive if observing a large subtree with many changes. Keep observation scope narrow.

## **Interview-ready answer**

Mutation Observer watches DOM changes such as added nodes, removed nodes, attribute changes, or text changes. It is useful when DOM changes happen outside our direct control, such as third-party scripts, injected widgets, or legacy integrations. Always disconnect it when no longer needed.

---

# **Common Interview Topics / Questions**

---

# **1\. Explain Event Delegation**

## **Answer**

Event delegation means adding a single listener to a parent and handling events from child elements using event bubbling.

const list \= document.querySelector("\#list");

list.addEventListener("click", (event) \=\> \{  
  const item \= event.target.closest("li");

  if (\!item || \!list.contains(item)) return;

  console.log(item.dataset.id);  
\});

## **Why it is useful**

* Fewer event listeners.  
* Better for large lists.  
* Works with dynamically added children.  
* Easier cleanup.  
* Useful for tables, menus, lists, dropdowns, and grids.

## **Interview-ready answer**

Event delegation uses event bubbling to handle child element events at a parent level. Instead of attaching listeners to every child, we attach one listener to the parent and identify the actual target using `event.target`, `closest`, or `dataset`. It improves performance and works well for dynamic elements.

---

# **2\. localStorage vs sessionStorage vs cookies**

## **Simple comparison**

| Feature | localStorage | sessionStorage | Cookies |
| ----- | ----- | ----- | ----- |
| Lifetime | Persists until cleared | Until tab/session closes | Based on expiry |
| Sent with requests | No | No | Yes, if matching domain/path |
| JavaScript access | Yes | Yes | Yes, unless `HttpOnly` |
| Storage type | String key-value | String key-value | String key-value |
| Typical use | Preferences, non-sensitive cache | Per-tab temporary data | Sessions, auth, server communication |
| Sensitive data | Avoid | Avoid | Prefer `HttpOnly Secure SameSite` |

## **Examples**

localStorage.setItem("theme", "dark");  
sessionStorage.setItem("step", "2");  
document.cookie \= "theme=dark";

## **Security point**

For authentication, `HttpOnly`, `Secure`, and `SameSite` cookies are generally safer than JavaScript-readable storage because JavaScript cannot read `HttpOnly` cookies.

## **Interview-ready answer**

`localStorage` persists across browser sessions, `sessionStorage` lasts only for the current tab session, and cookies can be sent automatically with HTTP requests. localStorage and sessionStorage are accessible by JavaScript and should not store sensitive data. For authentication, server-set `HttpOnly`, `Secure`, and `SameSite` cookies are generally safer.

---

# **3\. What is Event Bubbling?**

## **Answer**

Event bubbling means an event starts from the target element and moves upward through its ancestors.

child.addEventListener("click", () \=\> \{  
  console.log("child");  
\});

parent.addEventListener("click", () \=\> \{  
  console.log("parent");  
\});

Clicking child logs:

// child  
// parent

## **Interview-ready answer**

Event bubbling is the phase where an event moves from the target element up through its parent elements. It allows parent elements to listen for child events and is the foundation of event delegation.

---

# **4\. What is Event Capturing?**

## **Answer**

Event capturing is the phase where the event travels from the root down to the target before bubbling back up.

parent.addEventListener(  
  "click",  
  () \=\> \{  
    console.log("parent capture");  
  \},  
  true  
);

## **Interview-ready answer**

Event capturing is the phase where an event travels from the root down to the target element. We can listen in the capture phase by passing `true` or `\{ capture: true \}` to `addEventListener`.

---

# **5\. target vs currentTarget**

## **Answer**

`event.target` is the actual element where the event started. `event.currentTarget` is the element where the listener is attached.

parent.addEventListener("click", (event) \=\> \{  
  console.log(event.target); // clicked child  
  console.log(event.currentTarget); // parent  
\});

## **Interview-ready answer**

`event.target` points to the actual clicked element, while `event.currentTarget` points to the element whose event handler is currently running. This difference is important in event delegation.

---

# **6\. What is the difference between preventDefault and stopPropagation?**

## **Answer**

`preventDefault()` stops the browser’s default behavior. `stopPropagation()` stops the event from moving further through the DOM.

link.addEventListener("click", (event) \=\> \{  
  event.preventDefault(); // Stops navigation  
\});

button.addEventListener("click", (event) \=\> \{  
  event.stopPropagation(); // Stops bubbling  
\});

## **Interview-ready answer**

`preventDefault()` prevents the browser’s default action, such as form submit or link navigation. `stopPropagation()` stops the event from bubbling or capturing further. They solve different problems.

---

# **7\. Why use Intersection Observer instead of scroll event?**

## **Answer**

Scroll events can fire very frequently and require manual calculations. Intersection Observer is browser-optimized and tells us when an element enters or leaves the viewport.

## **Interview-ready answer**

Intersection Observer is preferred for visibility detection because it is more efficient and cleaner than manually listening to scroll events and calculating positions. It is useful for lazy loading, infinite scroll, animations, and impression tracking.

---

# **8\. When would you use IndexedDB over localStorage?**

## **Answer**

Use IndexedDB when data is large, structured, or needs async database-like behavior.

## **Interview-ready answer**

I use localStorage for small non-sensitive string preferences. I use IndexedDB for large structured data, offline-first apps, cached API responses, files, blobs, or complex client-side storage requirements.

---

# **9\. Web Worker vs Service Worker**

## **Simple comparison**

| Point | Web Worker | Service Worker |
| ----- | ----- | ----- |
| Purpose | Run heavy JS off main thread | Intercept network/cache requests |
| DOM access | No | No |
| Communication | `postMessage` | Events, Cache API, clients |
| Use case | CPU-heavy computation | PWA, offline, caching, push |
| Lifetime | Usually tied to page | Can run independently from page |

## **Interview-ready answer**

A Web Worker is used to run CPU-heavy JavaScript in a background thread so the UI does not freeze. A Service Worker is used as a network proxy for caching, offline support, push notifications, and PWA behavior.

---

# **10\. setTimeout vs setInterval**

## **Answer**

`setTimeout` runs once after a delay. `setInterval` runs repeatedly after every delay.

setTimeout(() \=\> \{  
  console.log("Once");  
\}, 1000);

setInterval(() \=\> \{  
  console.log("Repeated");  
\}, 1000);

## **Interview-ready answer**

`setTimeout` schedules a callback once, while `setInterval` repeats it. Timers are not exact because callbacks run only when the call stack is free. For polling, recursive `setTimeout` is often safer than `setInterval` because it waits for the previous work to finish before scheduling the next call.

---

# **Quick Revision Summary**

| Topic | Key point |
| ----- | ----- |
| DOM | Browser’s object representation of HTML |
| Traversal | Move between parent, child, sibling, closest nodes |
| Manipulation | Create, update, remove, and modify elements |
| Events | Browser signals handled by callbacks |
| Bubbling | Event moves from target to ancestors |
| Capturing | Event moves from root to target |
| Delegation | Parent handles child events through bubbling |
| localStorage | Persistent string storage |
| sessionStorage | Per-tab temporary string storage |
| Cookies | Small data sent with HTTP requests |
| IndexedDB | Async browser database |
| Web Worker | Background thread for heavy computation |
| Service Worker | Network proxy for caching/offline/PWA |
| Fetch | Promise-based HTTP API |
| Timers | Schedule code using timeout/interval |
| Geolocation | User location with permission |
| Intersection Observer | Detect element visibility |
| Mutation Observer | Detect DOM changes |

---

# **Final Interview-Ready Combined Answer**

The DOM is the browser’s live object representation of HTML. JavaScript can traverse, manipulate, and listen to events on DOM nodes. Events move through capturing, target, and bubbling phases, and event delegation uses bubbling to handle child events from a parent listener. For browser storage, `localStorage` persists across sessions, `sessionStorage` lasts for a tab session, cookies can be sent with HTTP requests, and IndexedDB handles large structured data. Web Workers run heavy JavaScript off the main thread, while Service Workers help with caching, offline support, and PWAs. Fetch is used for HTTP requests, timers schedule delayed or repeated work, and observer APIs like Intersection Observer and Mutation Observer help efficiently react to visibility and DOM changes.

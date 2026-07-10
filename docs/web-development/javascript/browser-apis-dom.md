---
title: Browser APIs & DOM
sidebar_position: 24
---

# Browser APIs & DOM

DOM and Web APIs are important because they show how the browser exposes a page to JavaScript. React abstracts many direct DOM operations, but frontend engineers still need to understand selection, traversal, events, storage, fetch, timers, observers, and workers.

## Helpful References

- [Browser events](https://javascript.info/introduction-browser-events)
- [Bubbling and capturing](https://javascript.info/bubbling-and-capturing)
- [Event delegation](https://javascript.info/event-delegation)
- [LocalStorage and SessionStorage](https://javascript.info/localstorage)
- [Cookies](https://javascript.info/cookie)
- [Fetch API](https://javascript.info/fetch-api)
- [Timers](https://javascript.info/settimeout-setinterval)
- [Mutation Observer](https://javascript.info/mutation-observer)

## DOM Basics

DOM stands for Document Object Model. It is the browser's object-based representation of an HTML document.

```html
<div id="app">
  <h1>Hello</h1>
</div>
```

```js
const app = document.getElementById("app");

console.log(app.tagName); // "DIV"
```

HTML is source text. The DOM is the live object tree created by the browser. JavaScript can read, update, add, and remove nodes from this tree.

Common node types:

- `document`: root entry point.
- `Element`: HTML elements like `div`, `button`, and `input`.
- `Text`: text inside elements.
- `Comment`: HTML comments.
- `DocumentFragment`: lightweight container for DOM nodes.

Common selection APIs:

```js
document.getElementById("app");
document.querySelector(".card");
document.querySelectorAll(".item");
document.getElementsByClassName("item");
document.getElementsByTagName("div");
```

Important trap:

```js
const items = document.querySelectorAll(".item");

console.log(items.length); // Static length at query time
```

`querySelectorAll` returns a static `NodeList`, while methods like `getElementsByClassName` return a live `HTMLCollection`.

## DOM Traversal

DOM traversal means moving between nodes in the DOM tree.

```js
const item = document.querySelector(".item");

console.log(item.parentElement);
console.log(item.children);
console.log(item.nextElementSibling);
```

Common traversal APIs:

```js
element.parentElement;
element.children;
element.firstElementChild;
element.lastElementChild;
element.previousElementSibling;
element.nextElementSibling;
element.closest(".container");
element.matches(".active");
```

`closest` and `matches` are especially useful in event delegation.

```js
const button = event.target.closest("button");

if (!button) {
  return;
}

console.log(button.dataset.action);
```

`children` returns only element nodes. `childNodes` returns elements, text nodes, and comments.

```js
const container = document.querySelector("#container");

console.log(container.children);
console.log(container.childNodes);
```

Whitespace in HTML can create text nodes, so `childNodes` may include spaces and line breaks.

## DOM Manipulation

DOM manipulation means changing the page using JavaScript.

```js
const list = document.querySelector("#todo-list");
const item = document.createElement("li");

item.textContent = "Learn DOM";
item.classList.add("todo-item");

list.append(item);
```

Common APIs:

```js
element.textContent = "Updated";
element.innerHTML = "<strong>Updated</strong>";
element.setAttribute("aria-expanded", "true");
element.classList.add("active");
element.classList.remove("hidden");
element.remove();
```

Prefer `textContent` when inserting plain text. Avoid assigning untrusted strings to `innerHTML` because it can create XSS risks.

For multiple nodes, `DocumentFragment` can reduce repeated DOM updates.

```js
const fragment = document.createDocumentFragment();

for (const label of ["HTML", "CSS", "JavaScript"]) {
  const li = document.createElement("li");
  li.textContent = label;
  fragment.append(li);
}

document.querySelector("#topics").append(fragment);
```

## Event Handling

Events let JavaScript respond to user actions and browser activity.

```js
const button = document.querySelector("button");

button.addEventListener("click", (event) => {
  console.log("Clicked", event.target);
});
```

Common event methods:

```js
event.preventDefault();
event.stopPropagation();
event.stopImmediatePropagation();
```

`preventDefault` stops the browser's default behavior. `stopPropagation` prevents the event from continuing through the propagation chain.

## Bubbling and Capturing

Most DOM events travel in three phases:

1. Capturing phase: from `window` down toward the target.
2. Target phase: event reaches the target element.
3. Bubbling phase: event moves back up toward `window`.

```js
parent.addEventListener(
  "click",
  () => {
    console.log("capturing");
  },
  true
);

child.addEventListener("click", () => {
  console.log("target or bubbling");
});
```

By default, `addEventListener` listens during bubbling. Passing `true` or `{ capture: true }` listens during capture.

## Event Delegation

Event delegation attaches one listener to a parent and handles events from matching children.

```html
<ul id="menu">
  <li><button data-action="save">Save</button></li>
  <li><button data-action="delete">Delete</button></li>
</ul>
```

```js
const menu = document.querySelector("#menu");

menu.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button || !menu.contains(button)) {
    return;
  }

  console.log(button.dataset.action);
});
```

Event delegation is useful for dynamic lists because newly added children do not need their own listeners.

## Browser Storage

Browser storage APIs keep data on the client, but they serve different purposes.

| Feature | LocalStorage | SessionStorage | Cookies | IndexedDB |
| --- | --- | --- | --- | --- |
| Capacity | Usually around 5-10 MB | Usually around 5 MB | Around 4 KB per cookie | Much larger, browser-dependent |
| API type | Synchronous key-value | Synchronous key-value | String-based | Asynchronous database |
| Data type | Strings | Strings | Strings | Structured data, blobs, files |
| Lifetime | Until deleted | Current tab session | Expiry or session | Until deleted |
| Sent to server | No | No | Yes, automatically | No |
| Best for | Small preferences | Tab-scoped state | Sessions/server reads | Offline structured data |

Security notes:

- Avoid storing access tokens or sensitive PII in `localStorage` or `sessionStorage`.
- Cookies used for auth should generally be `HttpOnly`, `Secure`, and `SameSite`.
- IndexedDB is still accessible to injected JavaScript, so XSS protection matters.

```js
localStorage.setItem("theme", "dark");
console.log(localStorage.getItem("theme"));

sessionStorage.setItem("draftId", "123");
```

## Web Workers and Service Workers

Workers move work away from the main UI thread, but Web Workers and Service Workers have different jobs.

| Feature | Web Worker | Service Worker |
| --- | --- | --- |
| Main purpose | Heavy computation | Network proxy, offline support, background events |
| Lifecycle | Tied to the page | Independent, event-driven |
| DOM access | No | No |
| Network interception | No | Yes |
| Communication | `postMessage` | `postMessage`, `BroadcastChannel`, events |

Web Worker example:

```js title="app.js"
const worker = new Worker("./worker.js");

worker.postMessage({ numbers: [1, 2, 3] });

worker.onmessage = (event) => {
  console.log(event.data);
};
```

```js title="worker.js"
self.onmessage = (event) => {
  const total = event.data.numbers.reduce((sum, number) => sum + number, 0);
  self.postMessage(total);
};
```

Service Workers are commonly used for Progressive Web Apps, offline fallback, caching, push notifications, and background sync. They require a secure context such as HTTPS, except on local development hosts.

## Fetch API

`fetch` makes HTTP requests and returns a promise.

```js
async function loadUsers() {
  const response = await fetch("/api/users");

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}
```

For `POST` requests, pass method, headers, and body.

```js
async function createUser(user) {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return response.json();
}
```

`fetch` only rejects for network failures. HTTP error statuses like `404` or `500` still resolve, so check `response.ok`.

## Timers

`setTimeout` runs once after a delay. `setInterval` repeats at an interval.

```js
const timeoutId = setTimeout(() => {
  console.log("Run once");
}, 1000);

clearTimeout(timeoutId);
```

```js
const intervalId = setInterval(() => {
  console.log("Run repeatedly");
}, 1000);

clearInterval(intervalId);
```

Timer delays are not guaranteed to be exact. The event loop, nested timers, background tabs, and long-running JavaScript can delay callbacks.

## Geolocation API

The Geolocation API asks the browser for the user's location. It requires user permission.

```js
navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
  },
  (error) => {
    console.error(error.message);
  }
);
```

Use it only when location is needed for a clear user-facing reason.

## Intersection Observer

Intersection Observer watches when an element enters or leaves a container or viewport.

```js
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      console.log("Visible:", entry.target);
    }
  }
});

observer.observe(document.querySelector("#sentinel"));
```

Common use cases include lazy loading, infinite scrolling, analytics visibility tracking, and reveal animations.

## Mutation Observer

Mutation Observer watches DOM changes.

```js
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    console.log(mutation.type);
  }
});

observer.observe(document.querySelector("#app"), {
  childList: true,
  subtree: true,
});
```

Use it when you must react to DOM changes you do not directly control. Disconnect observers when they are no longer needed.

```js
observer.disconnect();
```

## Interview Checklist

- Explain the DOM as a live object tree.
- Compare `children` and `childNodes`.
- Explain event bubbling, capturing, and delegation.
- Compare `localStorage`, `sessionStorage`, cookies, and IndexedDB.
- Compare Web Workers and Service Workers.
- Explain why `fetch` needs `response.ok` checks.
- Explain common uses for Intersection Observer and Mutation Observer.

---
title: Rendering Performance
sidebar_position: 3
---

# Rendering Performance

## ⚙️ Types of Rendering in Modern Web Apps

|  | Rendering Type | Description | Use Cases | Tools/Frameworks |
| ----- | ----- | ----- | ----- | ----- |
| **1** | **CSR (Client-Side Rendering)** | The HTML shell is sent; JS loads and renders on the client. | Apps that don’t need SEO (e.g., dashboards) | React, Vue (default mode) |
| **2** | **SSR (Server-Side Rendering)** | HTML is rendered on the server *per request*. | SEO-heavy pages (e.g., blogs, ecommerce), personalized content | Next.js, Nuxt |
| **3** | **SSG (Static Site Generation)** | HTML is pre-rendered *at build time*. | Static content that rarely changes (e.g., docs, blogs) | Next.js, Gatsby, Astro |
| **4** | **ISR (Incremental Static Regeneration)** | SSG \+ background re-generation on request. | Hybrid of SSG \+ real-time updates (e.g., ecommerce with live pricing) | Next.js |
| **5** | **Streaming / RSC (React Server Components)** | Streams HTML chunks progressively from server. | Faster perceived load for large or dynamic pages | Next.js (app router) |
|  | **Hydration** | Process of attaching interactivity to pre-rendered HTML | Used with SSR/SSG to enable client-side behavior | React, Vue, Svelte |

## ✅ When to Use What?

### 1. SSR (Server-Side Rendering)

* **Choose when**:

  * You need real-time or personalized data per user.

  * You care about SEO and the content changes often.

* **Examples**:

  * News sites, user dashboards, authenticated apps.

* **Tradeoffs**:

  * Slower TTFB (time to first byte).

  * Higher server load.

### 2. SSG (Static Site Generation)

* **Choose when**:

  * Content doesn't change often or can be updated during builds.

  * Pages need to load fast and rank well on search engines.

* **Examples**:

  * Marketing sites, documentation, blogs.

* **Tradeoffs**:

  * Longer build times with lots of pages.

  * Not ideal for user-specific data.

### 3. ISR (Incremental Static Regeneration) *(Next.js only)*

* **Choose when**:

  * You want fast static pages *with the ability to update content* on request (without a full rebuild).

* **Examples**:

  * Ecommerce product pages, blog posts with comments.

* **Tradeoffs**:

  * Slight complexity in caching and consistency.

### 4. CSR (Client-Side Rendering)

* **Choose when**:

  * SEO is not a priority.

  * You’re building a SPA with dynamic, app-like behavior.

* **Examples**:

  * Admin dashboards, internal tools.

* **Tradeoffs**:

  * Slower initial load; poor SEO if not handled properly.

### 5. Streaming / React Server Components (RSC)

* **Choose when**:

  * You want to progressively stream HTML to users.

  * Ideal for complex UIs where time-to-interactive is critical.

* **Examples**:

  * Data-heavy landing pages, large e-commerce pages.

* **Tradeoffs**:

  * Cutting-edge; only works with frameworks like Next.js (app router).

---

## 💡 Decision Tree

```ts
Is SEO critical?
├─ Yes ─> Is content dynamic?
│        ├─ Yes ─> Use SSR
│        └─ No ─> Use SSG or ISR
└─ No ─> Use CSR
```
---

## 🔍 What Is Hydration?

**Hydration** is the process by which a **client-side JavaScript framework (like React)** takes over a **pre-rendered HTML page** (from SSR or SSG) and "activates" it by:

* **Attaching event listeners**

* **Rebuilding the component state tree**

* **Wiring up interactivity**

It essentially turns a **static HTML page** into a **fully interactive web app**.

---

## 🔁 Hydration Lifecycle

1. **The server renders** the initial HTML on the backend (SSR or SSG).

2. **Client downloads**:

   * HTML (already rendered)

   * JavaScript bundle (for interactivity)

3. **React boots up** on the client:

   * Parses the HTML DOM

   * Builds a virtual DOM from JS

   * Compares it with the existing DOM (this is a no-op if nothing changed)

   * **Attaches event listeners** and other logic

4. Now the page is “hydrated” and behaves like a SPA.

---

## 📦 Example in React

```ts
// Server renders this component
function Button() {
const [count, setCount] = useState(0);
return <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>;
}
```

* **Server output:** `<button>Clicked 0 times</button>`

* **After hydration on client:** Clicking updates count.

---

## 🤯 Why Is Hydration Necessary?

Without hydration:

* The HTML looks fine but won’t respond to user interaction.

* No JavaScript \= no interactivity.

---

## ⚠️ Common Hydration Issues

### 1. Mismatch Between Server and Client Render

* Server renders different content than client.

* React will warn: “Text content did not match. Server: ‘A’ Client: ‘B’”

* Causes:

  * `useEffect` changing the DOM

  * Using browser-only APIs (e.g., `window`) during SSR

### 2. Performance Bottlenecks

* Hydration can be **slow** for large pages.

* Especially bad if hydration blocks the main thread.

### 3. Redundant Work

* React rebuilds the virtual DOM even though the HTML is already there.

* It's often a no-op diff, but still happens.

---

## 🧠 Advanced Topics

### 🔹 Partial Hydration

* Only some parts of the page are hydrated.

* Tools: Astro, Qwik

* Benefit: dramatically reduces JS sent to client.

### 🔹 Progressive Hydration

* Hydrate parts of the page as needed, not all at once.

* Frameworks like React 18 and Next.js App Router do this with `React.lazy` and `Suspense`.

### 🔹 Streaming \+ Hydration (React 18\)

* Server can stream HTML chunks and hydrate progressively.

* Improves time-to-interactive.

---

## 🧪 Interview Follow-Up Questions (with Short Answers)

### Q1: What’s the performance impact of hydration?

* It blocks the main thread; large apps can feel sluggish before hydration completes.

* Optimization: split bundles, lazy load, progressive hydration.

### Q2: How do you debug hydration issues?

* Look for console warnings like “Text content did not match.”

* Audit for browser-only logic in components that run on the server.

### Q3: Can you avoid hydration entirely?

* Yes, if the page is **purely static**, or by using **partial or island-based hydration** (e.g., Astro).

* But for interactive apps, hydration is typically required.

### Q4: How does hydration differ from client-side rendering?

* CSR renders nothing on server — blank HTML shell.

* Hydration uses pre-rendered HTML and **activates** it on the client.

---

## ✅ Summary

Hydration is:

* **Essential** for making SSR/SSG apps interactive.

* **Costly** in terms of performance if not optimized.

* The **bridge** between server-rendered HTML and client-side interactivity.

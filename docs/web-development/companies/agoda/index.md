---
title: Agoda
sidebar_position: 1
---

# Agoda

Related canonical pages: [Event Loop](../../javascript/event-loop.md), [React Performance](../../important/performance/react-performance.md), [React Fiber](../../react-js/fundamentals/react-fiber.md), [React Reconciliation](../../react-js/fundamentals/reconciliation-1.md), [XSS](../../important/security/xss-cross-site-scripting.md), [JWT & CSRF](../../important/security/jwt-csrf.md).

Agoda Prep doc:  
[https://docs.google.com/document/d/1yX\_jfwpp8W7Y8D8VpaXFFl-CyOUZtW5p3yQ2EN-9hX8/edit?tab=t.0](https://docs.google.com/document/d/1yX_jfwpp8W7Y8D8VpaXFFl-CyOUZtW5p3yQ2EN-9hX8/edit?tab=t.0)

Web Protocols & Security  
Core Web Development Concepts  
Performance Optimization  
Testing Strategy

# **Questions Recently Asked in Agoda Platform Round**

## **Web Fundamentals**

Candidates reported questions like:

* What happens when you type a URL? **\- Done**  
  * How does DNS resolution work**? \- Done**  
* How does a browser render a page?  **\- Done**  
  * Explain the Critical Rendering Path.  
  * Reflow vs Repaint.  
  * What causes layout shifts?  
  * Why is transform faster than top/left?  
  * What is GPU acceleration?  
  * What is Layout Thrashing?  
* HTTP vs HTTPS.  
* HTTP/1.1 vs HTTP/2 vs HTTP/3.  
* Cookies vs LocalStorage vs SessionStorage.  
* CDN architecture.  
* Browser caching strategies.  
* ETag vs Cache-Control.  
* Service Workers.

These were explicitly mentioned by candidates who recently completed Platform rounds.

---

## 

## 

## **Performance Optimization**

This seems to be Agoda's favorite area.

Reported questions:

* What are Core Web Vitals?  
  * Explain LCP.  
  * Explain CLS.  
  * Explain INP.  
* How would you improve page performance?  
* How do bundlers affect performance?  
* Tree shaking.  
* Code splitting.  
* Lazy loading.  
* Image optimization.  
* Virtualization for large lists.  
* Bundle analysis techniques.

Several candidates specifically mentioned deep discussions on performance metrics.

---

## **React Deep Dive – In Progress study**

For Answers: [https://chatgpt.com/c/6a3118c5-0154-83ee-9c8d-7afa069c08f4](https://chatgpt.com/c/6a3118c5-0154-83ee-9c8d-7afa069c08f4)

Questions reported:

* Virtual DOM. **\- done**  
  * [https://www.greatfrontend.com/questions/quiz/what-is-virtual-dom-in-react](https://www.greatfrontend.com/questions/quiz/what-is-virtual-dom-in-react)  
  * React Reconciliation. **\- done**  
  * React diffing algorithm. **\- done**  
  * React Fiber. **\- done**  
* React.memo.  
* useMemo.  
* useCallback.  
* Why components re-render.  
* Context vs Redux.  
* State management tradeoffs.  
* Controlled vs uncontrolled components.  
* Hooks internals.  
* Performance pitfalls in React.

One candidate explicitly mentioned React Fiber, memoization pitfalls, optimization techniques, Context API vs Redux, and React fundamentals.

1️⃣ "Explain React reconciliation. What is the virtual DOM actually doing?"

→ They don't want: "It's a lightweight copy of the real DOM."

→ They want: Diffing algorithm, fiber architecture, how React decides which components to re-render and which to skip.

↳ Follow-up: "When does React bail out of re-rendering?"

2️⃣ "useMemo vs useCallback — and when does useMemo HURT performance?"

→ useMemo caches a computed VALUE. useCallback caches a FUNCTION REFERENCE.

→ The trap: Memoizing cheap calculations costs MORE than just recalculating (memo overhead \> calculation cost).

↳ Follow-up: "How would you decide what to memoize in a large app?"

3️⃣ "Context API vs Redux — what would you choose for an enterprise app?"

→ Context: Re-renders ALL consumers when value changes. Fine for theme/locale. Terrible for high-frequency state.

→ Redux: Selectors prevent unnecessary re-renders. Better for complex state.

↳ Follow-up: "What about Zustand or Jotai?" — Shows you're aware of modern alternatives

4️⃣ "Client-side vs Server-side routing — trade-offs?"

→ CSR: Faster navigation after initial load. But SEO is terrible.

→ SSR: Better SEO, slower transitions. Next.js gives you both.

↳ Follow-up: "When would you use SSG over SSR?"

5️⃣ "How would you optimize a React app that's rendering 10,000 list items?"

→ Virtualization (react-window / react-virtualized) — only render visible items

→ Code splitting with React.lazy \+ Suspense

→ Debounce search inputs, memoize expensive computations

↳ Follow-up: "Walk me through your performance profiling workflow"

6️⃣ "Explain the JavaScript event loop. How does async work?"

→ Call Stack → Web APIs → Callback Queue → Microtask Queue (Promises) → Event Loop

→ The key: Microtasks (Promises) execute BEFORE macrotasks (setTimeout)

↳ Follow-up: Output-based question testing Promise vs setTimeout ordering

1. React Render vs Commit Phase  
2. Concurrent Rendering  
3. Suspense Internals  
4. React Fiber Lanes & Scheduling  
5. Server Components  
6. SSR vs CSR vs SSG vs ISR  
7. React Context Performance Patterns  
8. React Profiler Deep Dive  
9. State Colocation vs Global State  
10. React 18 Architecture Changes

---

## **JavaScript Deep Dive**

Questions reported:

* Event Loop.  
* Closures.  
* Hoisting.  
* Scope.  
* Promises.  
* Async/Await.  
* Microtask Queue.  
* Macro Task Queue.  
* Debounce.  
* Throttle.  
* Memoization.  
* Prototypal Inheritance.

A recent Agoda frontend candidate specifically mentioned closures, cache/memoization, event loop, and advanced JS topics.

---

## **Security**

Questions reported:

* HTTPS handshake.  
* Authentication vs Authorization.  
* JWT.  
* XSS.  
* CSRF.  
* CORS.  
* SameSite Cookies.  
* Content Security Policy.

Multiple candidates mentioned web security as a dedicated section of the platform interview.

---

## **Testing**

Candidates reported:

* Unit Testing.  
* Integration Testing.  
* E2E Testing.  
* Jest.  
* Mocking.  
* Testing Pyramid.  
* Frontend testing strategy.

---
title: Basic Concepts
sidebar_position: 2
---

# Basic Concepts

Related canonical pages: [Event Loop](../web-development/javascript/event-loop.md), [Browser Rendering Pipeline](../web-development/javascript/javascript-under-the-hood/browser-rendering-pipeline.md), [React Reconciliation](../web-development/react-js/fundamentals/reconciliation-1.md), [XSS](../web-development/important/security/xss-cross-site-scripting.md), [JWT & CSRF](../web-development/important/security/jwt-csrf.md), [Security Headers](../web-development/important/security/security-headers.md).

### **1\. How does a Web Browser Work?**

**Answer:**

A web browser works in several stages:

1. **URL Resolution:** When a user enters a URL, DNS resolves it to an IP address.

2. **HTTP Request:** The browser sends an HTTP/HTTPS request to the server.

3. **Server Response:** The server responds with HTML, CSS, JS, etc.

4. **HTML Parsing:** The browser parses the HTML into a **DOM tree**.

5. **CSS Parsing:** CSS is parsed into a **CSSOM (CSS Object Model)**.

6. **Render Tree Construction:** DOM \+ CSSOM \= Render Tree.

7. **Layout:** Calculates each element’s position on the screen.

8. **Painting:** Draws pixels on the screen using the render tree.

9. **JavaScript Execution:** JS engine (like V8 or SpiderMonkey) executes JS.

10. **Reflows & Repaints:** Any DOM changes might trigger re-layout and repaint.

---

### **2\. How Does React Work Under the Hood?**

**Answer:**

React operates using the following core concepts:

1. **Virtual DOM:** React maintains a lightweight copy of the real DOM.

2. **Reconciliation:** When state/props change, a new Virtual DOM is created and compared (diffing) with the previous one.

3. **Fiber Architecture:** React uses a fiber data structure to break rendering work into chunks to enable async rendering.

4. **Component Lifecycle:** React components go through lifecycle methods (like `componentDidMount`, `useEffect`).

5. **ReactDOM:** Converts Virtual DOM changes to actual DOM updates efficiently.

---

### **3\. What is V8 Engine?**

**Answer:**

* V8 is Google’s open-source high-performance JavaScript and WebAssembly engine.

* Used in Chrome and Node.js.

* Written in C++.

* **Key features:**

  * Compiles JS to native machine code using **Just-In-Time (JIT) compilation**.

  * Has a garbage collector and memory management.

  * Uses **Ignition** (interpreter) and **TurboFan** (compiler) for performance.

---

### **4\. What is SpiderMonkey?**

**Answer:**

* SpiderMonkey is Mozilla’s JavaScript engine, used in Firefox.

* The first JavaScript engine ever created.

* Supports modern JavaScript (ES6+), garbage collection, and JIT compilation.

* Like V8, it uses **bytecode interpretation** and **baseline & optimizing compilers**.

---

### **5\. What is the Difference Between Synchronous and Asynchronous JavaScript?**

**Answer:**

* **Synchronous:** Code runs line by line, blocking the execution until each operation finishes.

* **Asynchronous:** Non-blocking; uses callbacks, promises, async/await to handle operations like API calls, timers.

* JavaScript uses the **Event Loop** and **callback queue** to handle async tasks.

---

### **6\. How Does the JavaScript Event Loop Work?**

**Answer:**

JavaScript handles asynchronous browser work through the call stack, runtime APIs, task queues, microtask queue, and the Event Loop. Promise callbacks run as microtasks before timer callbacks such as `setTimeout`.

For the full browser JavaScript Event Loop explanation and execution-order examples, see [Event Loop](../web-development/javascript/event-loop.md).

---

### **7\. What is the Role of the DOM and BOM in a Web Browser?**

**Answer:**

* **DOM (Document Object Model):** Represents HTML structure in a tree format. Manipulated using JS to change content.

* **BOM (Browser Object Model):** Provides access to browser features like `window`, `navigator`, `location`, etc.

---

### **8\. How Does Node.js Work Under the Hood?**

**Answer:**

* Built on top of V8.

* Uses **libuv** to provide an event-driven, non-blocking I/O model.

* Has its own **event loop** to handle async operations.

* Uses **C++ bindings** to perform system-level tasks like file I/O, network.

---

### **9\. What is WebAssembly and How Does it Work?**

**Answer:**

* WebAssembly (WASM) is a binary instruction format.

* Enables running compiled code (like C/C++) in the browser.

* Runs at near-native speed.

* Works alongside JS and uses the same Web APIs.

---

### **10\. How Do Modern JavaScript Frameworks Improve Performance?**

**Answer:**

* Use **Virtual DOM** for efficient updates.

* Employ **tree shaking** to remove unused code.

* Support **code-splitting** for lazy loading.

* Use **memoization** and **reconciliation** to reduce unnecessary renders.

---

### **What is a Render Tree in a Web Browser?**

The Render Tree is the browser's visible rendering structure created from the DOM and CSSOM. In system design discussions, it matters because layout, paint, and composite work can affect frontend performance.

For the full Render Tree flow, examples, and reflow/repaint/composite details, see [Browser Rendering Pipeline](../web-development/javascript/javascript-under-the-hood/browser-rendering-pipeline.md).

## **1\. Client-Side Storage**

| Area | Risk | Mitigation |
| ----- | ----- | ----- |
| `localStorage` / `sessionStorage` | Accessible via JS & vulnerable to XSS | Avoid storing tokens or PII |
| `IndexedDB` / `WebSQL` | Same risk as above | Only store non-sensitive data |
| Browser Cache | Caches sensitive data | Set `Cache-Control: no-store` for sensitive routes |

---

## **2\. Authentication & Session Management**

| Area | Risk | Mitigation |
| ----- | ----- | ----- |
| Passwords | Weak storage / transmission | Always hash (bcrypt), use HTTPS |
| JWT Tokens | Stored in `localStorage` / leaked | Use **httpOnly** cookies, short expiry |
| Session IDs | Session hijacking | Regenerate on login, use secure, httpOnly cookies |
| Remember Me | Persistent tokens leaked | Secure them properly (refresh token rotation, fingerprinting) |

---

## **3\. Input Fields & Forms**

| Area | Risk | Mitigation |
| ----- | ----- | ----- |
| User Inputs | XSS, SQL Injection | Sanitize, validate inputs |
| File Uploads | Malware or DoS | Validate file type, size, scan for malware |
| Hidden Fields | Tampering | Don’t rely on client data for critical logic |

---

## **4\. API and Backend**

| Area | Risk | Mitigation |
| ----- | ----- | ----- |
| Open APIs | Unauthorized access | Use rate-limiting, API keys, JWT, OAuth2 |
| CORS Configuration | Overly permissive | Use strict CORS rules |
| Mass Assignment | Unintended fields updated | Use strong parameter whitelisting (e.g., `params.require.permit` in Rails) |

---

## **5\. Sensitive Data Handling**

| Area | Risk | Mitigation |
| ----- | ----- | ----- |
| PII (Emails, Phone Numbers) | Leaks | Store encrypted, access-controlled |
| Payment Info | PCI DSS violations | Use secure gateways (Stripe), don’t store card info yourself |
| Logs | Logging secrets | Mask tokens, passwords in logs |

---

## **6\. Third-Party Scripts and Dependencies**

| Area | Risk | Mitigation |
| ----- | ----- | ----- |
| CDN-loaded scripts | Can be compromised | Use Subresource Integrity (SRI) |
| npm packages | Vulnerable libraries | Use `npm audit`, Snyk, keep dependencies updated |
| Analytics / Ads scripts | Data leakage | Load asynchronously, audit regularly |

---

## **7\. Browser-Level Issues**

| Area | Risk | Mitigation |
| ----- | ----- | ----- |
| Autofill | Autofills sensitive data in wrong fields | Use `autocomplete="off"` where necessary |
| Clickjacking | UI redressing attacks | Set `X-Frame-Options: DENY` |
| Clipboard Hijacking | Stealing copied data | Monitor and sanitize input fields with JS |

---

## **8\. DevOps / Deployment**

| Area | Risk | Mitigation |
| ----- | ----- | ----- |
| Environment Variables | Exposed in front-end builds | Never expose `.env` in client apps |
| Build Artifacts | Leaked secrets or debug info | Clean builds, avoid bundling `.env`, use `.gitignore` properly |
| Secrets Management | Hardcoded API keys | Use secret managers (Vault, AWS Secrets Manager) |

---

## **9\. HTTP Headers**

Set proper headers to protect against various attacks:

* `Content-Security-Policy` – prevent XSS

* `Strict-Transport-Security` – enforce HTTPS

* `X-Frame-Options` – prevent clickjacking

* `Referrer-Policy` – avoid leaking referrer

* `X-Content-Type-Options: nosniff` – prevent MIME sniffing

---

## **10\. Admin Panels & Dashboards**

| Area | Risk | Mitigation |
| ----- | ----- | ----- |
| Public access | Brute force, data leaks | IP whitelisting, MFA, strong passwords |
| Lack of audit trails | No trace of admin actions | Log all critical admin actions |

---

## **Bonus: Codebase Risks**

| Area | Risk | Mitigation |
| ----- | ----- | ----- |
| Exposed `.git` folders | Leak of source code | Prevent access to `.git` via server config |
| Public S3 buckets / storage | Data exposure | Enforce access policies and encryption |
| GitHub Secrets | Leaked via public repos | Use secret scanning and environment variables |

---

## **Secure These 10 Key Areas**

1. **Client-side storage** (never store tokens in localStorage)

2. **Authentication/session management**

3. **User input validation and sanitization**

4. **Secure API design & access control**

5. **Data protection (PII, tokens, logs)**

6. **Third-party scripts and dependencies**

7. **Browser and UI level hardening**

8. **DevOps & secrets management**

9. **Security headers**

10. **Admin interfaces & access control**

---

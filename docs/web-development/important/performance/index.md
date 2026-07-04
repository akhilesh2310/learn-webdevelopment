---
title: Performance
sidebar_position: 1
---

# Performance

### **✅ Generic Web Application Performance Optimization**

#### **1\. Efficient Asset Loading**

* **Minify and compress** HTML, CSS, JavaScript.

* Use **image compression** (WebP, AVIF) and responsive image formats (`srcset`).

* **Lazy load** images, videos, and third-party scripts.

* Use **HTTP/2 or HTTP/3** to improve parallel requests.

#### **2\. Caching Strategy**

* Implement **browser caching** and **content delivery networks (CDN)** for static assets.

* Use **server-side caching** (Redis, Memcached) for frequent API responses.

#### **3\. Reduce Server Response Time**

* Optimize database queries (indexes, proper joins).

* Use pagination for large data sets.

* Enable **compression (e.g., Gzip, Brotli)** on the server.

#### **4\. Minimize Render-blocking Resources**

* Defer or async-load non-critical JavaScript.

* Inline critical CSS or use tools like CriticalCSS.

#### **5\. Security & Performance**

* Avoid unnecessary third-party scripts.

* Implement rate limiting and API throttling.

#### **6\. Monitoring & Profiling**

* Use tools like **Lighthouse**, **New Relic**, or **Datadog** to find bottlenecks.

* **Log and monitor performance issues using Sentry or LogRocket.**

7\. **Observability:**

* Google Analytics or FullStory to track user events

---

### **⚛️ Performance Optimization in React Applications**

#### **1\. Component Optimization**

* Use **React.memo** and **PureComponent** to prevent unnecessary re-renders.

* Use **key props** correctly in lists.

* Split large components into smaller, focused components.

#### **2\. Code Splitting**

* Use **dynamic imports (`React.lazy` \+ `Suspense`)** to load parts of the app only when needed.

* Implement **route-based code splitting** using libraries like React Router with lazy loading.

#### **3\. Virtualization**

* Use libraries like **react-window** or **react-virtualized** to efficiently render large lists.

#### **4\. Avoid State Bloat**

* Avoid lifting the state too high unnecessarily.

* Use **local state** wisely and consider **useReducer** for complex state.

#### **5\. Efficient State Management**

* Use **React Context sparingly** as it can cause unnecessary renders.

* Use **Recoil**, **Zustand**, or **Redux Toolkit** with good memoization and selectors.

#### **6\. Use Effect and Dependency Optimization**

* Properly manage **`useEffect` dependencies** to avoid infinite loops and unnecessary calls.

* Debounce or throttle user input to avoid excessive re-rendering or API calls.

#### **7\. Tree Shaking & Bundle Optimization**

* Remove unused code using **tree shaking** (with modern bundlers like Webpack, Vite).

* Analyze and reduce bundle size using **webpack-bundle-analyzer**.

#### **8\. Lazy Load Images and Assets**

* Use libraries like **react-lazyload** or native `loading="lazy"` attribute.

---

### **🚀 Final Checklist for a High-Performance Web App**

| Area | Key Action |
| ----- | ----- |
| **Assets** | Compress, lazy-load, CDN |
| **Rendering** | SSR/CSR/ISR depending on use case |
| **Data Fetching** | Pagination, caching, and batching |
| **Code Splitting** | Dynamic imports, tree shaking |
| **Monitoring** | Lighthouse, Performance tab, APM |
| **UX** | Avoid layout shifts, show skeletons/loaders |

### **🔍 What is Lighthouse?**

Lighthouse analyzes your web app or webpage and provides a detailed report with **performance scores (0–100)** in key categories:

* **Performance**

* **Accessibility**

* **Best Practices**

* **SEO**

* **Progressive Web App (PWA)**

You can run Lighthouse in:

* **Chrome DevTools** (Audits tab)

* **Lighthouse CLI** (Node.js)

* **PageSpeed Insights**

* **Lighthouse CI** (for integration with CI/CD pipelines)

---

### **🚀 How Lighthouse Helps Improve Performance**

#### **1\. Page Load Performance Metrics**

Lighthouse measures **core web vitals**:

* **First Contentful Paint (FCP)** – when the first text/image is visible.

* **Largest Contentful Paint (LCP)** – when the main content is visible.

* **Time to Interactive (TTI)** – when the page is fully usable.

* **Total Blocking Time (TBT)** – time the page is unresponsive.

* **Cumulative Layout Shift (CLS)** – visual stability of the page.

**Cumulative Layout Shift (CLS)** is a Core Web Vital metric from Google that measures the **visual stability** of a webpage. It tracks how much visible content **unexpectedly shifts** during page load.

---

### **📌 What is CLS?**

CLS quantifies how often and how drastically elements **move around** on the screen without user interaction — e.g., text jumping, buttons shifting, or images pushing content.

---

### **🧠 Why CLS Happens:**

* Images or ads without set width/height.

* Fonts loading late and causing reflow.

* DOM elements injected above visible content.

* Asynchronous content (e.g., iframes, banners) causing re-layout.

---

### **🧪 How CLS is Calculated:**

Each unexpected layout shift is scored by:

`CLS = impact fraction × distance fraction`

* **Impact fraction:** How much of the viewport was affected.

* **Distance fraction:** How far elements moved.

Then, CLS is the **sum of all these shift scores** during the page lifecycle (especially the first few seconds).

---

### **✅ Good vs Poor CLS:**

| CLS Score | Experience |
| ----- | ----- |
| ≤ 0.1 | Good |
| ≤ 0.25 | Needs improvement |
| \> 0.25 | Poor |

---

### **🛡️ How to Fix CLS:**

1. **Always set width and height** on images and videos.

2. **Reserve space** for ads, embeds, and iframes.

3. **Avoid inserting elements above existing content**, unless in response to user interaction.

4. **Use `font-display: swap`** to minimize font shifts.

5. **Preload fonts and important assets**.

6. **Use skeleton loaders** or placeholders for dynamic content.

---

### **💡 Real-World Example:**

`<!-- BAD: No size defined -->`

`<img src="hero.jpg">`

`<!-- GOOD: Reserved space prevents shift -->`

`<img src="hero.jpg" width="600" height="400">`

---

CLS is critical for **user experience**, especially on mobile. A low CLS means your layout feels **predictable and stable**, reducing frustration.

✅ *You get actionable feedback to optimize critical rendering path, reduce JS blocking time, and improve perceived speed.*

---

#### **2\. Opportunities & Diagnostics**

It gives clear suggestions like:

* Serve images in next-gen formats (e.g., WebP)

* Remove unused JavaScript/CSS

* Reduce render-blocking resources

* Minimize main-thread work

* Efficiently encode images

* Enable text compression (Gzip, Brotli)

* Avoid large layout shifts

✅ *Each suggestion includes estimated savings in load time.*

---

#### **3\. JavaScript & Network Optimization**

* Shows total JS size, unused JS, and execution time.

* Highlights large dependencies or third-party scripts.

* Helps you eliminate unnecessary polyfills and libraries.

✅ *Guides you to reduce bundle size and JS parsing time.*

---

#### **4\. Best Practices & Accessibility**

* Warns about unsafe links, insecure connections, deprecated APIs.

* Checks for proper labels, alt attributes, color contrast, etc.

✅ *Helps ensure robust, user-friendly, and compliant apps.*

---

### **📈 Use Case in Real Workflows**

* **During development**: Run audits locally before deploying.

* **In CI/CD pipelines**: Use Lighthouse CI to block regressions.

* **Post-deployment**: Monitor with **PageSpeed Insights** or **Web Vitals** dashboard.

---

### **✅ Sample Workflow**

1. Run Lighthouse via Chrome DevTools on your app.

2. Review performance score and "Opportunities".

3. Apply suggestions: code splitting, lazy loading, image optimization, etc.

4. Re-run and compare results.

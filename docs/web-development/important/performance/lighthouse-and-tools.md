---
title: Lighthouse & Tools
sidebar_position: 4
---

# Lighthouse & Tools

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

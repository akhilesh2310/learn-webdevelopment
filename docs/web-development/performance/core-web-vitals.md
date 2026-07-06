---
title: Core Web Vitals
sidebar_position: 2
---

# Core Web Vitals

Related canonical pages: [Browser Rendering Pipeline](../web-fundamentals/browser-rendering-pipeline.md), [React Performance](react-performance.md).

## Core Web Vitals and Google Lighthouse Notes

## 1. Simple Meaning

**Core Web Vitals** are Google’s key user experience metrics for checking whether a web page feels fast, responsive, and stable for real users.

The current Core Web Vitals are:

1. **LCP (Largest Contentful Paint)**: How fast the main content loads.  
2. **INP (Interaction to Next Paint)** : How quickly the page responds to user interaction.  
3. **CLS (Cumulative Layout Shift)**: How stable the page layout is while loading.

Earlier, **FID** was used for interactivity, but **INP replaced FID as a Core Web Vital on March 12, 2024**. So in interviews, we should talk about **INP**, not FID, unless we are explaining the historical difference.

---

## 2. Why Core Web Vitals Matter

Core Web Vitals matter because they directly connect technical performance with real user experience.

A page may technically load, but if:

* the main content appears late,  
* the button click feels slow,  
* the layout jumps suddenly,

then the user feels the website is slow or broken.

Google also uses Core Web Vitals as part of its ranking systems, but good Core Web Vitals alone do not guarantee top ranking. Content quality, relevance, mobile experience, and other SEO factors still matter.

**Simple interview answer:**

Core Web Vitals help us measure real user experience. They tell us whether the page loads quickly, responds quickly, and stays visually stable. I use them not only for SEO, but also to improve conversion, engagement, and overall product experience.

---

## 3. Current Core Web Vitals Metrics

## 3.1 LCP: Largest Contentful Paint

**LCP measures loading performance.**

It tells us when the largest visible content element in the viewport is rendered. This is usually:

* hero image,  
* banner,  
* large heading,  
* large text block,  
* video poster image.

**Good score:** LCP should be **2.5 seconds or less** for a good user experience. Google recommends checking this at the **75th percentile**, separately for mobile and desktop users.

### Why LCP matters

LCP is important because it tells us when the user feels that the main page content is ready.

For example, if a product listing page opens but the product cards or hero content appear after 5 seconds, the user feels the page is slow.

### Common reasons for poor LCP

* Large hero image.  
* Slow server response.  
* Render-blocking CSS or JavaScript.  
* Heavy client-side rendering.  
* Too much JavaScript before showing content.  
* Fonts blocking text rendering.  
* API response needed before rendering above-the-fold content.

### How to improve LCP

* Optimize hero images using WebP or AVIF.  
* Use responsive images with correct sizes.  
* Use CDN for static assets.  
* Preload the critical hero image when required.  
* Avoid lazy loading the main hero image.  
* Reduce render-blocking CSS and JavaScript.  
* Use SSR, SSG, ISR, or streaming rendering where useful.  
* Cache API responses where possible.  
* Reduce initial JavaScript bundle size.  
* Split code by route and load only what is needed.  
* Improve backend response time and use edge caching.

### React / Next.js example

In React SPAs, LCP can be poor because the browser first downloads JavaScript, parses it, runs it, fetches data, and then renders UI.

In Next.js, SSR, SSG, or ISR can improve LCP because the browser receives meaningful HTML earlier instead of waiting for full client-side rendering.

---

## 3.2 INP: Interaction to Next Paint

**INP measures responsiveness.**

It checks how quickly the page gives visual feedback after a user interaction like:

* click,  
* tap,  
* keyboard input.

**Good score:** INP should be **200 ms or less**.  
**Needs improvement:** Above 200 ms and up to 500 ms.  
**Poor:** Above 500 ms.

### Why INP replaced FID

FID only measured the delay of the **first interaction**.

INP is better because it observes interactions throughout the page lifecycle. It includes input delay, event handler execution time, and the time until the browser paints the next frame.

### Simple difference between FID and INP

**FID:**  
How long did the browser take to start handling the first user interaction?

**INP:**  
How long did the page take to visually respond to user interactions during the full visit?

So INP is more practical for modern web apps because users interact with the page multiple times, not just once.

### Common reasons for poor INP

* Long JavaScript tasks blocking the main thread.  
* Heavy click handlers.  
* Large React re-renders after interaction.  
* Expensive calculations on input change.  
* Large lists rendering without virtualization.  
* Too many state updates.  
* Heavy third-party scripts.  
* Poor memoization.  
* Layout thrashing due to repeated DOM reads and writes.  
* Running analytics, validation, or formatting logic synchronously during user input.

### How to improve INP

* Break long JavaScript tasks into smaller chunks.  
* Reduce unnecessary React re-renders.  
* Use `React.memo` carefully for stable components.  
* Use `useMemo` only for expensive calculations.  
* Use `useCallback` when function reference stability matters.  
* Use virtualization for large lists.  
* Debounce expensive input logic.  
* Move heavy computation to Web Workers.  
* Use `startTransition` for non-urgent UI updates in React.  
* Lazy load non-critical components.  
* Delay or async-load third-party scripts.  
* Avoid doing heavy work directly inside click or input handlers.

### React example

Bad pattern:

const handleSearch \= (value: string) \=\> \{  
  setSearch(value);  
  runHeavyFiltering(value);  
  updateAnalytics(value);  
\};

Better pattern:

const handleSearch \= (value: string) \=\> \{  
  setSearch(value);  
  debouncedFilter(value);  
  queueAnalytics(value);  
\};

The idea is simple: keep the user interaction fast and move expensive work away from the critical interaction path.

---

## 3.3 CLS: Cumulative Layout Shift

**CLS measures visual stability.**

It tells us how much visible content unexpectedly moves on the page.

**Good score:** CLS should be **0.1 or less**.  
**Poor score:** Above **0.25**.

### Why CLS matters

CLS is painful for users because it causes accidental clicks and frustration.

Example:

A user is about to click “Buy Now”, but suddenly an ad or banner loads above it and pushes the button down. The user clicks the wrong thing.

### Common reasons for poor CLS

* Images without width and height.  
* Ads loading without reserved space.  
* Banners inserted above existing content.  
* Fonts loading late and changing text size.  
* Skeleton loaders with different size than final content.  
* Dynamic content injected above the fold.  
* Cookie banners or notification bars pushing layout.

### How to improve CLS

* Always provide `width` and `height` for images.  
* Use CSS `aspect-ratio` for responsive media.  
* Reserve fixed space for ads, banners, and iframes.  
* Avoid inserting new content above existing content.  
* Use proper skeleton placeholders.  
* Preload important fonts.  
* Use `font-display` carefully.  
* Keep fallback font and final font visually similar.  
* Use overlays for banners instead of pushing layout.

---

## 4. Other Important Web Performance Metrics

Core Web Vitals are the main metrics, but interviews often include related metrics.

## 4.1 FCP: First Contentful Paint

**FCP measures when the first visible content appears.**

This could be:

* text,  
* image,  
* SVG,  
* canvas.

### FCP vs LCP

**FCP:** When the user sees the first content.  
**LCP:** When the main/largest content is visible.

Example:

If a small logo appears after 1 second, FCP is good.  
But if the main product list appears after 5 seconds, LCP is poor.

So FCP tells us the page started rendering, but LCP tells us whether the useful main content is visible.

---

## 4.2 TBT: Total Blocking Time

**TBT measures how much time the main thread was blocked during page load.**

It is a lab metric used by Lighthouse. It is closely related to responsiveness because if the main thread is blocked, user interactions are delayed.

Lighthouse performance score uses multiple lab metrics. In Lighthouse 10 scoring, the largest weights are TBT, LCP, and CLS.

### Why TBT is useful

TBT helps debug JavaScript-heavy pages.

If TBT is high, it usually means:

* too much JavaScript,  
* large bundle size,  
* expensive hydration,  
* heavy third-party scripts,  
* long synchronous tasks.

---

## 4.3 Speed Index

**Speed Index measures how quickly visible content appears during loading.**

It is useful for understanding visual progress. A page that gradually shows useful content feels faster than a page that stays blank and then suddenly renders everything.

---

## 5. Google Lighthouse

## 5.1 What is Lighthouse?

**Google Lighthouse is an open-source automated tool for auditing web pages.**

It checks areas like:

* Performance,  
* Accessibility,  
* SEO,  
* Best Practices,  
* Progressive Web App related checks,  
* other quality signals.

You can run Lighthouse from Chrome DevTools, command line, Node module, or Lighthouse CI.

---

## 5.2 Lighthouse vs Core Web Vitals

This is very important for interviews.

**Core Web Vitals** are user-centric metrics, usually best measured from real users.

**Lighthouse** is a lab tool. It runs tests in a controlled environment and gives suggestions.

So Lighthouse is great for debugging, but it may not exactly match real user data.

Google’s own guidance says Core Web Vitals are best measured in the field because lab tools run under predefined conditions and may not reflect what real users experience.

### Simple interview answer

Lighthouse helps me identify performance issues in a controlled test environment. But for actual Core Web Vitals, I trust field data from real users, like CrUX, Search Console, PageSpeed Insights field data, or our own RUM setup.

---

## 5.3 Lighthouse Score Is Not the Same as Core Web Vitals

A common mistake is saying:

“My Lighthouse score is 95, so my Core Web Vitals are good.”

That is not always true.

Why?

Because Lighthouse runs in a lab environment. Real users may have:

* slower devices,  
* slower networks,  
* different browsers,  
* different locations,  
* personalized content,  
* ads,  
* logged-in states,  
* A/B test variants.

So a good Lighthouse score is useful, but production field data is more reliable.

---

## 6. Field Data vs Lab Data

## Field Data

Field data comes from real users.

Examples:

* Chrome UX Report,  
* Google Search Console,  
* PageSpeed Insights field data,  
* Web Vitals library,  
* internal RUM dashboards.

CrUX is Google’s dataset showing how real Chrome users experience popular websites. It includes Core Web Vitals and is used in Google tools.

### Field data answers

“What are real users experiencing?”

## Lab Data

Lab data comes from controlled tests.

Examples:

* Lighthouse,  
* Chrome DevTools Performance panel,  
* WebPageTest,  
* local performance testing.

### Lab data answers

“What could be causing the issue?”

## Best workflow

1. Use field data to identify the real problem.  
2. Segment by page type, device, browser, and geography.  
3. Use Lighthouse and DevTools to debug.  
4. Apply fixes.  
5. Monitor field data again after release.

---

## 7. Tools to Measure Core Web Vitals

## 7.1 PageSpeed Insights

Use it for quick analysis.

It provides:

* field data from CrUX when available,  
* lab data from Lighthouse,  
* improvement suggestions.

## 7.2 Google Search Console

Use it for SEO and production monitoring.

It groups URLs by:

* Good,  
* Needs Improvement,  
* Poor.

It uses real-world usage data and reports issues for LCP, INP, and CLS.

## 7.3 Lighthouse

Use it during development and debugging.

Best for:

* finding render-blocking resources,  
* checking unused JavaScript,  
* checking image optimization,  
* checking accessibility,  
* checking SEO basics.

## 7.4 Chrome DevTools Performance Panel

Use it for deep debugging.

Best for:

* long tasks,  
* scripting cost,  
* rendering cost,  
* layout shifts,  
* expensive event handlers,  
* React rendering issues.

## 7.5 Web Vitals Library

Use it for production RUM.

It helps collect real user performance data and send it to analytics or observability tools.

---

## 8. How to Optimize Each Metric

## 8.1 LCP Optimization Checklist

Use this when the page loads slowly.

### Frontend fixes

* Reduce JavaScript bundle size.  
* Code split by route.  
* Lazy load below-the-fold components.  
* Avoid lazy loading the LCP image.  
* Preload important fonts and images.  
* Remove unused CSS.  
* Inline critical CSS if required.  
* Use responsive images.  
* Use WebP or AVIF.  
* Avoid blocking scripts in the head.

### Backend / platform fixes

* Improve server response time.  
* Use CDN caching.  
* Use SSR or SSG for important landing pages.  
* Cache API responses.  
* Use edge rendering where useful.  
* Compress responses using gzip or Brotli.  
* Use HTTP/2 or HTTP/3 where possible.

### React / Next.js fixes

* Use SSG or ISR for mostly static pages.  
* Use SSR for dynamic SEO pages where data changes often.  
* Use streaming and Suspense carefully.  
* Avoid large client-only rendering for above-the-fold content.  
* Keep the initial route bundle small.

---

## 8.2 INP Optimization Checklist

Use this when clicks, typing, filters, dropdowns, or buttons feel slow.

### Frontend fixes

* Reduce long tasks.  
* Avoid heavy synchronous work in event handlers.  
* Split expensive work.  
* Use debounce or throttle.  
* Use Web Workers for heavy computation.  
* Virtualize large lists.  
* Avoid unnecessary re-renders.  
* Memoize expensive calculations.  
* Keep component state local where possible.  
* Avoid global state updates for small UI interactions.  
* Lazy load non-critical logic.

### React-specific fixes

* Use React Profiler to identify slow renders.  
* Avoid passing unstable props to memoized children.  
* Avoid creating large objects/functions on every render when it affects child rendering.  
* Use `useTransition` for non-urgent updates.  
* Use `useDeferredValue` for expensive filtered views.  
* Avoid rendering huge lists directly.  
* Avoid controlled input lag by separating input state from expensive derived state.

---

## 8.3 CLS Optimization Checklist

Use this when layout jumps.

### Frontend fixes

* Add `width` and `height` to images.  
* Use `aspect-ratio`.  
* Reserve space for ads and iframes.  
* Match skeleton size with final content.  
* Avoid inserting banners above content.  
* Avoid late-loading fonts that change text layout.  
* Use stable containers for dynamic content.  
* Prefer overlays for popups or cookie banners.

---

## 9. SSR, SSG, ISR and Core Web Vitals

## SSR: Server-Side Rendering

SSR can improve LCP because the server sends rendered HTML to the browser.

Good for:

* dynamic SEO pages,  
* personalized pages,  
* pages where data changes frequently.

Trade-off:

* If server response is slow, SSR can hurt performance.  
* Needs caching strategy.

## SSG: Static Site Generation

SSG pre-builds HTML at build time.

Good for:

* marketing pages,  
* blogs,  
* documentation,  
* landing pages,  
* pages where data does not change often.

Trade-off:

* Freshness depends on rebuild or regeneration.

## ISR: Incremental Static Regeneration

ISR gives static performance with controlled freshness.

Good for:

* product detail pages,  
* content pages,  
* catalog pages,  
* pages that need periodic updates.

Trade-off:

* Need to handle stale content properly.

## Simple interview answer

SSR, SSG, and ISR can improve LCP because the browser gets meaningful HTML earlier. But they do not automatically fix everything. INP still depends heavily on JavaScript execution, hydration cost, and how much work happens after user interaction.

---

## 10. SEO and Lighthouse

Lighthouse SEO audit checks basic technical SEO items like:

* title tag,  
* meta description,  
* viewport meta tag,  
* crawlable links,  
* image alt text,  
* valid canonical tags,  
* mobile-friendly layout,  
* readable font sizes,  
* tap target sizes.

But Lighthouse SEO score is not a complete SEO strategy.

It does not fully judge:

* content quality,  
* keyword intent,  
* backlinks,  
* authority,  
* internal linking depth,  
* search competition,  
* structured content quality.

### Simple interview answer

Lighthouse SEO is useful for technical SEO checks, but it is not a complete SEO audit. For real SEO, we also need content quality, page intent, internal linking, structured data, crawlability, and Search Console data.

---

## 11. Accessibility and Lighthouse

Lighthouse also checks common accessibility issues like:

* missing labels,  
* poor color contrast,  
* missing image alt text,  
* incorrect heading order,  
* buttons without accessible names,  
* form controls without labels.

But Lighthouse cannot catch all accessibility issues.

Manual testing is still needed for:

* keyboard navigation,  
* screen reader flow,  
* focus management,  
* modal accessibility,  
* dynamic content announcements,  
* real user journeys.

### Interview point

I use Lighthouse accessibility as a baseline, but I do not treat it as full accessibility coverage. For production apps, I combine automated checks with manual keyboard and screen reader testing.

---

## 12. Common Interview Questions and Answers

## Q1. What are Core Web Vitals?

Core Web Vitals are Google’s main user experience metrics for web pages. They measure loading performance using LCP, responsiveness using INP, and visual stability using CLS. These metrics help us understand how fast, responsive, and stable the page feels to real users.

---

## Q2. What changed recently in Core Web Vitals?

The important change is that FID is no longer the current Core Web Vital for interactivity. INP replaced FID in March 2024\. FID only measured the first interaction delay, but INP measures responsiveness across user interactions during the page lifecycle.

---

## Q3. What is the difference between FCP and LCP?

FCP tells us when the first visible content appears.

LCP tells us when the main or largest visible content appears.

FCP is useful for knowing when rendering starts, but LCP is more meaningful for user experience because it tells us when the important content is visible.

---

## Q4. How would you improve poor LCP?

First, I would identify the LCP element using Lighthouse, PageSpeed Insights, or DevTools. Then I would check whether the problem is image size, slow server response, render-blocking resources, or heavy client-side rendering.

Common fixes include image optimization, CDN caching, preloading critical assets, reducing JavaScript, using SSR or SSG, improving API response time, and avoiding lazy loading of the main hero image.

---

## Q5. How would you improve poor INP?

I would start by checking which interaction is slow. Then I would use DevTools Performance panel and React Profiler to identify long tasks, expensive event handlers, unnecessary re-renders, or heavy third-party scripts.

Fixes include splitting long tasks, reducing JavaScript, virtualizing large lists, debouncing expensive logic, using Web Workers, memoizing expensive calculations, and avoiding heavy work inside click or input handlers.

---

## Q6. How would you improve poor CLS?

I would check which elements are shifting. Then I would reserve space for images, ads, banners, iframes, and skeleton loaders. I would also fix font loading issues and avoid inserting dynamic content above existing content.

---

## Q7. Is Lighthouse score enough to confirm good performance?

No. Lighthouse is useful, but it is lab data. Real users may have different devices, networks, browsers, locations, and content variations. For real Core Web Vitals, I would use field data from Search Console, CrUX, PageSpeed Insights field data, or internal RUM.

---

## Q8. Why can Lighthouse and Search Console show different results?

Lighthouse runs a test in a controlled lab environment.

Search Console uses real user data collected over time.

So they can differ because real users may have slower devices, slower networks, different locations, logged-in content, ads, and A/B test variations.

---

## Q9. How do Core Web Vitals affect SEO?

Core Web Vitals are part of Google’s page experience signals and are used by ranking systems. But they are not the only ranking factor. Good content, relevance, crawlability, links, and overall page quality are still very important.

---

## Q10. How would you set up Core Web Vitals monitoring in production?

I would collect real user metrics using the Web Vitals library or a RUM tool. I would send metrics like LCP, INP, and CLS to an analytics or observability system. Then I would segment the data by route, device, browser, network, geography, and app version. I would also track p75 values because Core Web Vitals are usually evaluated at the 75th percentile.

---

## 13. Staff Engineer Level Answer

If I am asked this in a senior or staff-level interview, I would answer like this:

Core Web Vitals are not just frontend metrics. I treat them as product experience metrics. First, I check real user data to understand which page type and user segment is impacted. Then I use Lighthouse, DevTools, React Profiler, and bundle analyzer to identify root causes.

For LCP, I focus on server response, critical rendering path, image optimization, caching, and rendering strategy like SSR, SSG, or ISR.

For INP, I focus on main-thread blocking, JavaScript execution, event handlers, React re-renders, third-party scripts, and large UI updates.

For CLS, I focus on layout stability, reserved space, images, ads, fonts, skeletons, and dynamic content.

Finally, I would add performance budgets in CI/CD, monitor p75 metrics in production, and treat regressions like product quality issues.

---

## 14. Practical Performance Budget Example

For a React or Next.js application, I would define budgets like:

* LCP below 2.5 seconds for important pages.  
* INP below 200 ms at p75.  
* CLS below 0.1.  
* JavaScript bundle size limit per route.  
* No unexpected layout shifts above the fold.  
* Lighthouse performance score threshold for PR checks.  
* Separate budgets for mobile and desktop.  
* Alerting if production p75 metrics degrade after release.

---

## 15. Quick Revision Summary

Remember this:

* **LCP \= loading**  
* **INP \= interaction responsiveness**  
* **CLS \= layout stability**  
* **FID is old, INP is current**  
* **Lighthouse \= lab/debugging tool**  
* **Search Console/CrUX/RUM \= field data**  
* **Good LCP \= 2.5s or less**  
* **Good INP \= 200ms or less**  
* **Good CLS \= 0.1 or less**  
* **Good Lighthouse score does not always mean real users are happy**  
* **Always debug using both lab and field data**

---

## 16. Best Short Interview Answer

Core Web Vitals are Google’s user experience metrics for measuring how fast, responsive, and stable a page feels. The current metrics are LCP for loading, INP for responsiveness, and CLS for visual stability. Earlier FID was used, but INP replaced it because INP measures responsiveness across the page lifecycle, not only the first interaction.

I use Lighthouse for lab debugging, but I rely on field data like Search Console, CrUX, PageSpeed Insights field data, or RUM for real user experience. For optimization, I focus on reducing LCP through better rendering, caching, and image optimization; improving INP by reducing main-thread blocking and unnecessary re-renders; and improving CLS by reserving layout space and avoiding unexpected shifts.

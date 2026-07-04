---
title: Browser Rendering Pipeline
sidebar_position: 4
---

# Browser Rendering Pipeline

# **Browser Rendering Pipeline**

## **High-Level Flow**

![][image3]

# **1\. DOM Construction**

## The browser receives HTML and parses it into a **DOM (Document Object Model)**.

| HTML \<body\>   \<h1\>Hello\</h1\>   \<p\>Welcome\</p\> \</body\> DOM Tree Document  └── body       ├── h1       │    └── "Hello"       └── p            └── "Welcome" |
| :---- |

### **Key Points**

* ## DOM is an N-ary tree structure.

* ## Every element becomes a node.

* ## Parent-child relationships are maintained.

* ## Browsers maintain internal indexes for fast lookups like:

| document.getElementById("header"); // which is typically close to O(1). |
| :---- |

## ---

# **2\. CSSOM Construction**

## The browser parses all CSS files and style tags into the **CSS Object Model (CSSOM)**.

| CSS h1 \{   color: blue; \} p \{   color: gray; \} CSSOM Stylesheet  ├── h1 → color: blue  └── p  → color: gray |
| :---- |

### **Key Points**

* ## CSSOM contains styling rules.

* ## CSS is **render-blocking because the browser needs styles before rendering.**

* ## CSS inheritance and specificity are resolved here.

## ---

# **3\. Render Tree Generation**

### **Render Tree**

* **Data Structure:** **Hierarchical Layout Object Tree** (Internally tracked as RenderObject / LayoutObject).  
* **Characteristics:** Maps structural content directly to its corresponding computed display styles. It contains only nodes that affect visual output.

## The browser combines:

| DOM \+ CSSOM \= Render Tree |
| :---- |

## The Render Tree contains only elements that need to be displayed.

### **Example**

| \<div\>Hello\</div\> \<div style="display:none"\>   Hidden \</div\> |
| :---- |

## Render Tree:

| div → Hello |
| :---- |

## The hidden element is excluded.

| Trait | DOM Tree | Render Tree |
| :---- | :---- | :---- |
| **Node Scope** | Contains *all* structural elements. | Contains *only* visible elements. |
| **Structural Match** | Includes \<head\>, \<script\>, display: none. | Drops hidden elements completely. |
| **Visibility Elements** | Includes elements with visibility: hidden. | Includes visibility: hidden (allocates layout space). |
| **Style Context** | Raw structural layout node data. | Embedded with explicit, calculated, computed styles. |

## 

### ---

# **4\. Layout (Reflow)**

## The browser calculates the exact size and position of every visible element.

### **Questions Answered During Layout**

* ## Where should the element appear?

* ## How wide should it be?

* ## How tall should it be?

* ## How much space does it occupy?

### **Example**

| Button → X \= 50px, Y \= 100px, Width \= 200px, Height \= 40px |
| :---- |

### **Why It Is Expensive**

## A change in one element can affect:

* ## Parent

* ## Children

* ## Siblings

## Therefore, the browser may need to recalculate large portions of the page.

---

# **5\. Paint**

## Once the layout is complete, the browser paints pixels. Paint Includes

| Text, Colors, Borders, Backgrounds, Shadows, Images |
| :---- |

## Think of Paint as: "Fill pixels onto layers." No position calculations happen here.

## ---

## **6\. Composite**

## The browser combines painted layers and sends them to the GPU.

| Layer 1 Layer 2 Layer 3    ↓ Composite    ↓ Screen |
| :---- |

### **Why It Is Fast**

## The browser avoids: ❌ Layout , ❌ Paint, and simply moves existing layers.

## GPU acceleration is heavily used here.

## ---

# **Rendering Pipeline Summary**

| HTML  ↓ DOM  ↓ CSSOM  ↓ Render Tree  ↓ Layout  ↓ Paint  ↓ Composite  ↓ Screen |
| :---: |

## ---

# **Reflow vs Repaint vs Composite**

## This is one of the most common senior frontend interview questions.

## **1\. Reflow (Layout):** Triggers anything that changes geometry.

| element.style.width \= "200px"; element.style.height \= "100px"; element.style.margin \= "20px"; |
| :---- |

### **Pipeline:** Layout \> Paint \> Composite   **Cost:** 🔥 Highest

## ---

## **2\. Repaint**: **Triggers** visual changes only.

| element.style.color \= "red"; element.style.background \= "blue"; |
| :---- |

### **Pipeline:** Paint \>  Composite **Cost:** Medium

## ---

## **3\. Composite:** Triggers GPU-friendly properties.

| transform opacity |
| :---- |

Example:

| element.style.transform \= "translateX(100px)"; |
| :---- |

**Pipeline**: Composite **Cost**: Lowest

## ---

# **Animation Performance Rule**

Bad

| element.style.left \= "100px"; |
| :---- |

### **Pipeline**: Layout \> Paint \> Composite

### **Good**

| element.style.transform \= "translateX(100px)"; |
| :---- |

## **Pipeline**: Composite Only

### **Interview One-Liner**

## For smooth animations, prefer `transform` and `opacity` because they can run entirely in the compositing stage without triggering layout or paint.

## ---

# **Layout Thrashing (Forced Synchronous Reflow)**

## A very common performance problem.

Bad Example

| for (const el of elements) \{   const width \= el.offsetWidth;   el.style.width \= width \+ 10 \+ "px"; \} What Happens Read Layout  ↓ Write Layout  ↓ Read Layout  ↓ Write Layout  ↓ Read Layout  ↓ Write Layout The browser repeatedly recalculates the layout. Result ❌ Jank ❌ FPS drops ❌ Slow UI |
| :---- |

## ---

## **Fix 1: Batch Reads and Writes**

| const widths \= elements.map(el \=\> el.offsetWidth); elements.forEach((el, i) \=\> \{   el.style.width \=     widths\[i\] \+ 10 \+ "px"; \}); Optimized Flow Read Read Read Read Write Write Write Write |
| :---- |

## ---

## **Fix 2: requestAnimationFrame**

| requestAnimationFrame(() \=\> \{   elements.forEach(el \=\> \{     el.style.transform \=       "translateX(10px)";   \}); \}); |
| :---- |

## This schedules updates before the next paint cycle.

## ---

# **Cumulative Layout Shift (CLS)**

## CLS measures unexpected visual movement of content while the page is loading.

| Bad Example: \<img src="hotel.jpg" /\> |
| :---- |

## The browser doesn't know the image dimensions initially.

## When the image loads:

* ## Text shifts downward

* ## **CLS increases. Score must be less than 0.1**

## ---

| Good Example : \<img src="hotel.jpg" width="300" height="200"/\> |
| :---- |

## The browser reserves space before loading the image.

### **Common CLS Causes**

* ## Images without dimensions, videos & iframe

* ## Ads injected dynamically

* ## Lazy-loaded content

* ## Third-party widgets

### **Fixes**

* ## Set width/height

* ## Use aspect-ratio

* ## Reserve space for ads and dynamic content

## ---

# **Senior-Level Interview Answer (2-Min Version)**

## When a browser receives HTML, it parses it into a DOM tree. CSS is parsed into a CSSOM tree. These are combined to form the Render Tree, which contains only visible elements. The browser then performs Layout to calculate positions and dimensions, Paint to draw pixels, and Composite to combine layers using the GPU and display them on the screen.

## For performance, I avoid triggering Layout whenever possible. Properties like width, height, margin, and left cause reflow and are expensive. For animations, I prefer transform and opacity because they typically run in **the compositing stage and are GPU-accelerated**. I also **avoid layout thrashing by batching DOM reads and writes** and **using requestAnimationFrame when updating the UI.**

## ---

### **![][image4]**

---

# **1\. Reflow vs Repaint**

## **Reflow (Layout)**

Reflow happens when the browser must recalculate the size and position of elements.

The browser needs to determine:

* Width  
* Height  
* Position  
* Margins  
* Padding

### **Examples**

div.style.width \= "500px";  
div.style.height \= "200px";

document.body.appendChild(newElement);

div.style.display \= "none";

These changes affect layout, so the browser performs:

Style  
 ↓  
Layout (Reflow)  
 ↓  
Paint  
 ↓  
Composite

Reflow is expensive because it may affect many elements.

---

## **Repaint**

Repaint happens when appearance changes but layout remains unchanged.

### **Examples**

div.style.backgroundColor \= "red";

div.style.color \= "blue";

div.style.visibility \= "hidden";

Browser only needs:

Style  
 ↓  
Paint  
 ↓  
Composite

No layout calculation required.

---

## **Interview Answer**

Reflow recalculates element geometry such as size and position, while repaint only updates visual appearance. Reflow is generally more expensive because it may trigger repaint and compositing as well.

---

# **2\. Layout Thrashing**

One of the most important performance topics.

## **What is it?**

Layout Thrashing happens when JavaScript repeatedly:

1. Writes DOM changes  
2. Reads layout information  
3. Writes again  
4. Reads again

This forces the browser to perform multiple synchronous layouts.

---

## **Bad Example**

for (let i \= 0; i \< items.length; i++) \{  
  items\[i\].style.width \= "100px";

  console.log(items\[i\].offsetWidth);  
\}

### **What happens?**

Write width  
 ↓  
Force Layout  
 ↓  
Read offsetWidth  
 ↓  
Write width  
 ↓  
Force Layout  
 ↓  
Read offsetWidth

Repeated reflows.

---

## **Better**

const widths \= \[\];

for (const item of items) \{  
  widths.push(item.offsetWidth);  
\}

for (const item of items) \{  
  item.style.width \= "100px";  
\}

Read first, write later.

---

## **Interview Answer**

Layout thrashing occurs when code alternates between DOM reads and writes, forcing synchronous reflow multiple times. The optimization is to batch reads and writes separately.

---

# **3\. Composite Layers**

Modern browsers split the page into layers.

Instead of repainting the whole screen, the browser can update individual layers.

---

## **Example**

\<div class="header"\>\</div\>  
\<div class="sidebar"\>\</div\>  
\<div class="modal"\>\</div\>

Browser may create:

Layer 1 → Header  
Layer 2 → Sidebar  
Layer 3 → Modal

When modal moves:

Only modal layer updates

instead of repainting the entire page.

---

## **Layer Promotion**

Elements often get their own layer when using:

transform  
opacity  
will-change  
position: fixed  
video  
canvas

---

## **Interview Answer**

Composite layers allow browsers to isolate portions of the page so they can be moved or animated independently without repainting the entire screen.

---

# **4\. GPU Acceleration**

Normally rendering happens on CPU.

For some operations browser can delegate work to GPU.

GPU excels at:

* Transformations  
* Scaling  
* Rotation  
* Opacity  
* Compositing

---

## **Example**

transform: translateX(200px);

Browser can move pixels using GPU.

---

## **Not GPU Friendly**

width: 500px;

Requires layout recalculation.

height: 500px;

Requires layout recalculation.

---

## **Interview Answer**

GPU acceleration allows browsers to offload compositing and transform operations to the graphics processor, resulting in smoother animations and reduced CPU workload.

---

# **5\. Why is transform Faster than top/left?**

This is asked extremely often.

---

## **Using top/left**

position: absolute;  
left: 200px;

Browser must:

Style  
 ↓  
Layout  
 ↓  
Paint  
 ↓  
Composite

Position changes affect layout.

---

## **Using Transform**

transform: translateX(200px);

Browser can often skip:

Layout  
Paint

and only do:

Composite

---

## **Visual Pipeline**

### **top/left**

Style  
 ↓  
Layout  
 ↓  
Paint  
 ↓  
Composite

### **transform**

Composite Only

---

## **Interview Answer**

transform is faster because it usually updates only the compositing stage, while top/left affects layout and may trigger reflow and repaint.

---

# **6\. How Browser Paints Pixels?**

After layout is complete:

---

## **Step 1**

Browser creates paint records.

Example:

\<div style="background:red"\>\</div\>

Paint command:

Draw red rectangle

---

## **Step 2**

Commands are sent to rasterization.

Rasterization converts commands into actual pixels.

Draw Rectangle  
↓  
Pixel Buffer

---

## **Step 3**

GPU combines layers.

Header Layer  
Sidebar Layer  
Content Layer

↓

Final Screen

---

## **Complete Rendering Pipeline**

HTML  
 ↓  
DOM

CSS  
 ↓  
CSSOM

DOM \+ CSSOM  
 ↓  
Render Tree

Layout  
 ↓  
Paint  
 ↓  
Rasterization  
 ↓  
Compositing  
 ↓  
Screen Pixels

---

## **Interview Answer**

The browser paints pixels by generating paint commands, rasterizing them into pixel buffers, and then compositing layers together to produce the final image shown on screen.

---

# **7\. What Causes Layout Shifts?**

Layout Shift means content unexpectedly moves after it has already appeared.

---

## **Example**

Page loads:

Title  
Button

Then image loads:

Image  
Title  
Button

Everything jumps down.

---

## **Common Causes**

### **Images without dimensions**

Bad:

\<img src="banner.jpg"\>

Good:

\<img  
  src="banner.jpg"  
  width="800"  
  height="400"  
/\>

---

### **Ads**

Ad loads later.

Content  
↓  
Ad inserted  
↓  
Content pushed down

---

### **Dynamic Content**

container.prepend(notification);

---

### **Web Fonts**

Font changes after loading.

Fallback Font  
↓  
Custom Font  
↓  
Text reflows

---

## **Interview Answer**

Layout shifts occur when elements change position unexpectedly during page load, commonly due to images without reserved space, ads, dynamically injected content, or **font swaps.**

---

# **8\. What is CLS?**

CLS stands for:

Cumulative Layout Shift

A Core Web Vital from [Google Web Vitals](https://web.dev/vitals/?utm_source=chatgpt.com).

CLS measures visual stability.

---

## **Formula**

CLS \= Impact Fraction × Distance Fraction

CLS \= Impact\\ Fraction \\times Distance\\ Fraction

Where:

### **Impact Fraction**

How much of viewport shifted.

### **Distance Fraction**

How far it shifted.

---

## **CLS Scores**

| Score | Meaning |
| ----- | ----- |
| ≤ 0.1 | Good |
| 0.1 \- 0.25 | Needs Improvement |
| \> 0.25 | Poor |

---

## **How to Reduce CLS**

### **Reserve image space**

\<img  
  width="800"  
  height="400"  
/\>

### **Reserve ad space**

.ad-slot \{  
  min-height: 250px;  
\}

### **Avoid inserting content above existing content**

Bad:

container.prepend(element);

### **Use font-display**

font-display: swap;

---

## **Senior-Level Interview Summary**

When asked all these topics together, connect them into a single story:

DOM/CSS Changes  
        ↓  
Style Recalculation  
        ↓  
Layout (Reflow)  
        ↓  
Paint (Repaint)  
        ↓  
Rasterization  
        ↓  
Compositing  
        ↓  
GPU  
        ↓  
Pixels on Screen

* Reflow \= recalculates geometry.  
* Repaint \= redraws visuals.  
* Layout Thrashing \= repeated forced layouts.  
* Composite Layers \= isolate updates.  
* GPU Acceleration \= faster compositing.  
* transform \= composite-only updates.  
* Layout Shifts \= visual movement after render.  
* CLS \= metric measuring layout stability.

This level of explanation is typically expected for Staff Engineer or Senior Frontend interviews.

##

[image3]: /img/docs/web-development/javascript/javascript-under-the-hood/browser-rendering-pipeline/browser-rendering-pipeline-01.png
[image4]: /img/docs/web-development/javascript/javascript-under-the-hood/browser-rendering-pipeline/browser-rendering-pipeline-02.png

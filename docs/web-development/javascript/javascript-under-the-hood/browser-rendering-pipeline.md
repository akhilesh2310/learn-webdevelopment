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

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN4AAAIkCAYAAABx8ZXhAAAf9ElEQVR4Xu3dj29V9f348c9fQEpBqDAyKgOcQhw/QyRmBBZwQhw/dAmsboBgxFgoggTZFPYDmfIjtERWdAiT8cOii5sIRQg/VJYgg0wZAxQsP0pHgTSlA9pFk/c3r2PO+Z7zfp+enrbn9H17+7zJIz3n/T7n3P64z557b3vb/1NcuHBp88v/6QMtvXzzzTfqzp076r///S+AJrQqPD20r7/+2vG///0PQIQWhecGJ28JDWi+ZoUnOxAc0Hqxw3PvTspjOf0gAJonVngSnL4jgJZrMjzOckDyIsMjOiAdjYbH3UsgPaHhybOW+oYAkhManvvDcH1jAMkwwpPo5KJvCCA5gfBkgMd2QPoC4fEsJtA2jPD0DQAkzwtPnwCQHi887mYCbScQnj4JIB2phvfee++pgQMHBsZk/dKlS6qwsNBZDvPggw+qkSNHOvz7yvqKFSuc5VOnThnHBtoLJzz3zzbok621ZcsW1alTp8CYrFdUVKjz58+rf/7znw4ZW7lypbd+8uRJZyw/P1/dvn3b2W/dunXO+rPPPuusnzhxwjg20F444clCQ0ODMdlaUeHpY1u3bjXGDhw4oGbPnu2tz5gxg/CQFZzw0jjbCTc8OWu5mhOe3J1045KzHeEhWzjhpfW7mW54uuaE9+ijj6oXX3zROfsRHrKFF54+kYTW3tWU8K5eveodg/CQLTI+PP8Y4SFbEB5gQbsPT+ffHshUqYYHIBzhARYQHmAB4QEWEB5gAeEBFhAeYAHhARZkRHhTpkxR1dXVxjiQrTIivCFDhqiqqipjHMhWhAdYQHiABYQHWEB4gAWEB1hAeIAFhAdYQHiABYQHWEB4gAWEB1hAeIAFhAdYQHiABRkRXllZmaqrqzPGgWyVEeEBHQ3hARYQHmAB4QEWEB5gAeEBFhAeYAHhARYQHmCBtfDk3yoXFBQ0St8eyCbWwjt//rzx/8td27ZtM7YHsom18ETnzp2JDh2S1fDCznr6NkA2shqe8J/1tm/fbswD2ch6eP6znj4HZCvr4Qk56+3YscMYB7JVRoQnZz19DMhmGREe0NEQHmAB4QEWEB5gAeEBFhAeYAHhARYQHmAB4QEWEB5gQUaEd/36dWMMyGaphrdly5bAa+3kvwL55+Uflch4r169nLeDBw/25vRXLFy8eNFZf/bZZ43r0emv8fM7duyYsT3Q1tokPHd94sSJ6t577/XW+/btq375y19667Ltv/71L2953rx5as+ePc766NGj1RNPPBErPL9hw4Y1ex8gbW0anvCvy3J9fb23/thjjzmBuXOnTp1SPXv29NblDyQ1N6Ko8OSYmzdv9s6Gzz//vDeXl5fnjcv+tbW13px7pnatX7/eODYQxUp4NTU13rJ/bunSpap79+7enISXk5OjTp8+rebOnZtKeEVFRd66+/IkeR8kSP92/vdVlj///PPA+o0bN4zjA42xEt6JEye8Zf/c2rVrnbFr16554W3atEnl5uY6Z8Y0wtPH3PGSkhLP1KlTvW1v3boVmC8uLlYjRoxwvmnoxwEaYyW8sGUxf/587zGgG54sT58+3XnbFuE1NDQ44+Xl5QaZP3ToUOi8+80EiKNNw6uoqDDCc59MEffcc48qLCz05tzwXG0RXtR43HmgKW0S3s2bN9XOnTud5TVr1njzElm3bt2c5erqaiNKW+ENHTpUTZkyxVs/e/asWrx4sbfetWtXtWzZMm/98OHDzseoHwdoTJuEJ3HJjwIqKyuNbeQGLtuIkydPeuM2wxO/+MUvvPerf//+zt1g//yoUaO8+QcffFDduXPHOAbQmFTDAxCO8AALCA+wgPAACwgPsIDwAAsID7CA8AALMiI8+SG6/OaKPg5kq4wIT16ZXlVVZYwD2YrwAAsID7CA8AALCA+wgPAACwgPsIDwAAsID7CA8AALCA+wgPAACwgPsIDwAAsID7AgI8IrKytz/vWVPg5kq4wID+hoCA+wgPAACwgPsCAjwuNZTXQ0hAdYQHiABYQHWEB4gAWEB1hAeIAFhAdYkDHhderUqUPr1auXMdYWmnu9RUVFxtcPzZcx4Z09e9b5j0FxXL582RhzXblyxRiLu29rRV13U9dbWVlpjMUVdb1Naep6/e/3pk2bCC8hGRMedzUz344dOwgvIYSH2AgvOYSH2AgvOYSH2AgvOYSH2AgvOYSH2AgvORkRHtDREB5gAeEBFhAeYEFGhDdlyhTnV5L0cWSW8vJytWLFCmMczZcR4fGsZvvAs5rJITzERnjJITzERnjJITzERnjJITzERnjJITzERnjJITzERnjJITzERnjJITzERnjJITzERnjJITzERnjJITzERnjJITzERnjJ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>
[image4]: <data:image/png;base64,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>

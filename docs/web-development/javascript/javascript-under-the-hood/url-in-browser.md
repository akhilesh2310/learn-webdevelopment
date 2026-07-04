---
title: URL in Browser
sidebar_position: 3
---

# URL in Browser

# **What Happens When You Enter a URL in the Browser?**

Suppose the user enters: [https://www.agoda.com](https://www.agoda.com)

# **High-Level Flow**

1\. URL Parsing  
2\. DNS Resolution  
3\. TCP Connection  
4\. TLS Handshake  
5\. HTTP Request  
6\. Server Processing  
7\. HTTP Response  
8\. Browser Rendering  
9\. JavaScript Execution  
10\. Page Becomes Interactive

---

# **Step 1: URL Parsing**

Browser first parses: https://www.agoda.com/search?city=bangkok

Components:

* Protocol: https  
* Host: www.agoda.com  
* Path: /search  
* Query: city=bangkok

Browser validates the URL and checks whether it already knows the IP address.

---

# **Step 2: DNS Resolution**

Goal: →  [www.agoda.com](http://www.agoda.com) → IP Address

Example: [www.agoda.com](http://www.agoda.com) → 104.x.x.x

**Browser checks caches in order:**

* ### **Browser Cache:** Chrome DNS Cache

* ### **OS Cache:** Operating System DNS Cache

* ### **Router Cache:** Home/Office Router

* ### **ISP DNS Server**

**If not found:** Recursive resolver eventually queries:

Root Server → .com TLD Server → agoda.com Name Server → Returns IP address.  
---

## **Follow-Up Question**

**Why is DNS caching important?**

Answer:

* Reduces latency  
* Reduces DNS traffic  
* Improves page load speed

---

# **Step 3: TCP Connection**

Once IP is known: Browser establishes TCP connection. Uses 3-Way Handshake.

* Client → SYN  
* Server → SYN ACK  
* Client → ACK

Connection established.

Purpose:

* Reliable communication  
* Packet ordering  
* Error recovery

---

## **Follow-Up**

**Why not send data immediately?**

Because both sides need to agree on:

* Connection setup  
* Sequence numbers  
* Communication parameters

---

# **Step 4: TLS (Transport Layer Security Handshake) (HTTPS)**

For HTTPS: [https://www.agoda.com](https://www.agoda.com), Browser performs TLS handshake.

Purpose: Encryption, Authentication, Integrity

The browser verifies the server certificate. Checks: Certificate validity, Certificate Authority, Domain matching, then session keys are created. After this, Traffic becomes encrypted

---

## **Follow-Up**

**Why HTTPS instead of HTTP?**

HTTP:

* Plain text

HTTPS:

* Encrypted  
* Secure  
* Tamper resistant

---

# **Step 5: HTTP Request**

Browser sends:

GET /search HTTP/1.1  
Host: www.agoda.com

Along with:

* Cookies  
* Headers  
* Authentication Tokens

Example:

Authorization: Bearer xxxx  
Accept: application/json

---

## **Follow-Up**

**What else is sent?**

Typically:

* Cookies  
* Language preferences  
* User Agent  
* Cache headers

---

# **Step 6: Server Processing**

Server receives request. Possible flow:

Load Balancer → API Gateway → Backend Services → Database

Server generates response.

---

# **Step 7: HTTP Response**

Example:

200 OK  
Content-Type: text/html

Body contains:

\<html\>  
 ...  
\</html\>

Or for SPA:

\<div id="root"\>\</div\>  
\<script src="main.js"\>\</script\>

---

# **Step 8: Browser Rendering Pipeline**

This is where interviewers often spend most of the time.

---

## **HTML Parsing**

The browser reads HTML.

Creates:

DOM Tree

Example:

\<body\>  
  \<h1\>Hello\</h1\>  
\</body\>

Produces:

Document  
 └─ body  
     └─ h1

---

## **CSS Parsing**

Browser parses CSS.

Creates:

CSSOM

---

## **Render Tree**

Combines:

DOM  
\+  
CSSOM

Result:

Render Tree

Only visible elements participate.

Example:

display:none

Not included.

---

## **Layout**

Browser computes:

Position  
Width  
Height

For every visible element.

Also called:

Reflow

---

## **Paint**

Browser converts elements into pixels.

Text  
Colors  
Borders  
Images

---

## **Composite**

GPU combines layers.

Final screen appears.

---

# **Follow-Up Question**

## **Reflow vs Repaint**

### **Reflow**

Layout recalculation.

Example:

element.style.width \= "500px";

Browser recalculates layout.

Expensive.

---

### **Repaint**

Only visual changes.

Example:

element.style.background \= "red";

No layout change.

Only repaint.

Cheaper.

---

# **Step 9: JavaScript Execution**

When browser encounters:

\<script src="app.js"\>\</script\>

JavaScript engine executes.

For Chrome:

V8

Tasks:

Parse  
Compile  
Execute

JavaScript may:

Modify DOM  
Fetch APIs  
Add Event Listeners

---

## **Follow-Up**

**Why can JavaScript delay rendering?**

Traditional scripts:

\<script src="main.js"\>\</script\>

Block HTML parsing.

Solutions:

\<script defer\>

or

\<script async\>

Use defer if your script needs to manipulate the DOM or relies on other scripts. Use async if the script is completely independent (like analytics) and you want it to execute as fast as possible.

Quick Selection Guide

| Attribute | HTML Parsing | Execution Timing | Execution Order | Best Used For |
| ----- | ----- | ----- | ----- | ----- |
| async | Not blocked during download. Blocked *only* during execution. | Executes the exact moment it finishes downloading. | Independent of order. Smaller/faster scripts run first. | Independent scripts like [Google Analytics](https://www.w3schools.com/tags/att_script_async.asp), ads, or tracking pixels. |
| defer | Never blocked. | Executes only after the entire HTML document is fully parsed. | Strict document order. Scripts run exactly how they are ordered in the code. | Core application scripts, UI initializers, or any script interacting with DOM elements. |

---

Key Behavioral Differences

**1\. Impact on HTML Parsing**

* async: The browser downloads the script file in the background while parsing HTML. However, as soon as the download finishes, the browser pauses HTML parsing to execute the script, then resumes parsing afterward.  
* defer: The browser downloads the script file in the background. It never interrupts the HTML parser. The script waits patiently and runs only after the full DOM tree is built.

2\. Execution Order

* async: Zero order guarantee. If you have script1.js followed by script2.js, but script2.js is a smaller file and finishes downloading first, script2.js will execute first.  
* defer: Strict sequential guarantee. Even if script2.js finishes downloading way before script1.js, the browser forces it to wait until script1.js has finished executing.

---

# **Step 10: Page Becomes Interactive**

React application starts.

Example:

ReactDOM.createRoot(...)

React attaches:

* Event handlers  
* State  
* Components

This process is called: **Hydration (SSR apps)** or **Client-side rendering,** depending on the architecture.

---

# **IC4-Level Performance Talking Points**

If the interviewer asks:

**"How would you make this process faster?"**

Mention:

### **Network**

* DNS caching  
* HTTP/2  
* HTTP/3  
* CDN

### **Assets**

* Compression (Brotli, Gzip)  
* Image optimization  
* Lazy loading

### **JavaScript**

* Code splitting  
* Tree shaking  
* Dynamic imports

### **Rendering**

* Minimize reflows  
* Virtualization  
* Memoization

---

# **A Strong 2-Minute Interview Answer**

When a user enters a URL, the browser first parses it and resolves the domain through DNS to obtain an IP address. It then establishes a TCP connection and, for HTTPS, performs a TLS handshake to create a secure encrypted connection. The browser sends an HTTP request, and the server responds with HTML, CSS, JavaScript, and other assets. The browser parses HTML into a DOM tree and CSS into a CSSOM tree, combines them into a render tree, performs layout calculations, paints pixels, and composites layers to display the page. JavaScript is then executed, which can modify the DOM and make additional network requests. Finally, frameworks like React hydrate or render the UI and attach event handlers, making the page fully interactive.  
---

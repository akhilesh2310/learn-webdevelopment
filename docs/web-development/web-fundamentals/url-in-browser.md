---
title: URL in Browser
sidebar_position: 3
---

# URL in Browser

Related canonical page: [Browser Rendering Pipeline](browser-rendering-pipeline.md).

## What Happens When You Enter a URL in the Browser?

Suppose the user enters:

```text
https://www.agoda.com/search?city=bangkok
```

## High-Level Flow

1. URL parsing
2. DNS resolution
3. TCP connection
4. TLS handshake
5. HTTP request
6. Server processing
7. HTTP response
8. Browser rendering
9. JavaScript execution
10. Page becomes interactive

## Step 1: URL Parsing

The browser first parses the URL into its components:

- Protocol: `https`
- Host: `www.agoda.com`
- Path: `/search`
- Query: `city=bangkok`

The browser validates the URL and checks whether it already knows the IP address.

## Step 2: DNS Resolution

The browser resolves the domain name to an IP address.

```text
www.agoda.com -> 104.x.x.x
```

### Browser Checks Caches in Order

1. Browser DNS cache
2. Operating system DNS cache
3. Router cache
4. ISP DNS server

If the IP is not found, the recursive resolver eventually queries:

```text
Root server -> .com TLD server -> agoda.com name server -> IP address
```

### Follow-Up: Why Is DNS Caching Important?

- Reduces latency
- Reduces DNS traffic
- Improves page load speed

## Step 3: TCP Connection

Once the IP address is known, the browser establishes a TCP connection using a three-way handshake.

```text
Client -> SYN
Server -> SYN ACK
Client -> ACK
```

TCP provides:

- Reliable communication
- Packet ordering
- Error recovery

### Follow-Up: Why Not Send Data Immediately?

Both sides first need to agree on:

- Connection setup
- Sequence numbers
- Communication parameters

## Step 4: TLS Handshake

For HTTPS, the browser performs a TLS handshake before sending sensitive data.

TLS provides:

- Encryption
- Authentication
- Integrity

The browser verifies the server certificate by checking certificate validity, certificate authority, and domain matching. After this, session keys are created and traffic becomes encrypted.

### Follow-Up: Why HTTPS Instead of HTTP?

HTTP sends data as plain text. HTTPS encrypts the data, protects it from tampering, and verifies that the browser is talking to the expected server.

## Step 5: HTTP Request

The browser sends an HTTP request.

```http
GET /search HTTP/1.1
Host: www.agoda.com
```

The request may include:

- Cookies
- Headers
- Authentication tokens
- Language preferences
- User-Agent
- Cache headers

Example headers:

```http
Authorization: Bearer xxxx
Accept: application/json
```

## Step 6: Server Processing

The server receives the request. A common backend flow looks like this:

```text
Load balancer -> API gateway -> Backend services -> Database
```

The server then generates a response.

## Step 7: HTTP Response

Example response headers:

```http
HTTP/1.1 200 OK
Content-Type: text/html
```

Example HTML body:

```html
<html>
  ...
</html>
```

For a single-page application, the response often includes a root element and a script bundle.

```html
<div id="root"></div>
<script src="main.js"></script>
```

## Step 8: Browser Rendering Pipeline

This is where interviewers often spend most of the time.

### HTML Parsing

The browser reads HTML and creates the DOM tree.

```html
<body>
  <h1>Hello</h1>
</body>
```

```text
Document
└── body
    └── h1
```

### CSS Parsing

The browser parses CSS and creates the CSSOM.

### Render Tree

The browser combines the DOM and CSSOM to create the render tree. Only visible elements participate.

```css
display: none;
```

Elements with `display: none` are not included in the render tree.

### Layout

The browser computes each visible element's position, width, and height. This is also called reflow.

### Paint

The browser converts elements into pixels, including text, colors, borders, and images.

### Composite

The GPU combines layers and the final screen appears.

## Follow-Up: Reflow vs Repaint

### Reflow

Reflow is a layout recalculation.

```js
element.style.width = "500px";
```

The browser recalculates layout, so reflow is expensive.

### Repaint

Repaint updates visual appearance without changing layout.

```js
element.style.background = "red";
```

No layout change is needed, so repaint is cheaper than reflow.

## Step 9: JavaScript Execution

When the browser encounters a script tag, the JavaScript engine executes it.

```html
<script src="app.js"></script>
```

In Chrome, the JavaScript engine is V8.

JavaScript execution includes:

- Parse
- Compile
- Execute

JavaScript may:

- Modify the DOM
- Fetch APIs
- Add event listeners

### Follow-Up: Why Can JavaScript Delay Rendering?

Traditional scripts block HTML parsing while they download and execute.

```html
<script src="main.js"></script>
```

Use `defer` if the script needs the DOM or depends on other scripts. Use `async` if the script is independent and should execute as soon as possible.

```html
<script src="main.js" defer></script>
<script src="analytics.js" async></script>
```

### Quick Selection Guide

| Attribute | HTML Parsing | Execution Timing | Execution Order | Best Used For |
| :---- | :---- | :---- | :---- | :---- |
| `async` | Not blocked during download; blocked only during execution. | Executes as soon as it finishes downloading. | No order guarantee. | Independent scripts like analytics, ads, or tracking pixels. |
| `defer` | Never blocked. | Executes after the HTML document is parsed. | Preserves document order. | Core application scripts, UI initializers, and DOM-dependent scripts. |

### Key Behavioral Differences

**Impact on HTML parsing**

- `async`: downloads in the background, then pauses HTML parsing when it executes.
- `defer`: downloads in the background and waits until the DOM is fully parsed.

**Execution order**

- `async`: no order guarantee. Smaller or faster scripts can run first.
- `defer`: strict document order.

## Step 10: Page Becomes Interactive

For React applications, React starts and attaches interactivity.

```js
ReactDOM.createRoot(rootElement).render(<App />);
```

React attaches:

- Event handlers
- State
- Components

This process is called **hydration** for SSR apps or **client-side rendering** for client-rendered apps.

## IC4-Level Performance Talking Points

If the interviewer asks, "How would you make this process faster?", mention the following areas.

### Network

- DNS caching
- HTTP/2
- HTTP/3
- CDN

### Assets

- Compression with Brotli or Gzip
- Image optimization
- Lazy loading

### JavaScript

- Code splitting
- Tree shaking
- Dynamic imports

### Rendering

- Minimize reflows
- Virtualization
- Memoization

## Strong 2-Minute Interview Answer

When a user enters a URL, the browser first parses it and resolves the domain through DNS to obtain an IP address. It then establishes a TCP connection and, for HTTPS, performs a TLS handshake to create a secure encrypted connection. The browser sends an HTTP request, and the server responds with HTML, CSS, JavaScript, and other assets.

The browser parses HTML into a DOM tree and CSS into a CSSOM tree, combines them into a render tree, performs layout calculations, paints pixels, and composites layers to display the page. JavaScript is then executed, which can modify the DOM and make additional network requests. Finally, frameworks like React hydrate or render the UI and attach event handlers, making the page fully interactive.

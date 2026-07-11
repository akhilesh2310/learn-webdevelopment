---
title: iFrame and Clickjacking Protection
sidebar_position: 4
---

# iFrame and Clickjacking Protection

Related canonical page: [Security Headers](security-headers.md).

## iFrame Protection

## 1. What is iFrame Protection?

iFrame Protection refers to techniques and best practices used to **prevent a web page from being embedded inside an `<iframe>`** on another (potentially malicious) site, thus **protecting against attacks** like *clickjacking*, *phishing overlays*, or *data leakage*.
 It also ensures **embedded content behaves safely** when using iframes intentionally.

## 2. When does it occur?

Vulnerabilities around iframe usage occur when:

* Your application can be loaded inside an iframe **without restriction**.

* An attacker **embeds your site** inside their malicious site to **trick users** into unintended actions (like clicking on buttons unknowingly).

* If **external content** is embedded into your site via iframes **without proper validation**.

## 3. How does it happen?

* Lack of HTTP security headers (like `X-Frame-Options` or `Content-Security-Policy: frame-ancestors`) allows **unrestricted iframe embedding**.

* Malicious sites create an invisible iframe overlay to **hijack user interactions** ("Clickjacking").

* Developers **embed external resources** via iframes without sandboxing or origin validation, introducing potential **third-party vulnerabilities**.

## 4. Why is it dangerous?

* **Clickjacking**: Users are tricked into clicking hidden buttons (e.g., "transfer money", "share location", "like page").

* **Phishing**: Malicious websites display your legitimate app in a frame, spoofing trust.

* **Session Hijacking**: Combined with other attacks, it may lead to unauthorized access.

* **Data Leakage**: Sensitive information may be exposed to the parent page or manipulated externally.

* **Reputation Risk**: Exploits can degrade user trust and brand reputation.

## 5. Example

### Generic Web Application

Imagine you have a banking web app `https://securebank.com`.
 Without iframe protection:

```html
<!-- Malicious Site -->
<iframe src="https://securebank.com/transfer-money" style="opacity:0; position:absolute; top:0; left:0; width:100%; height:100%;"></iframe>
<button style="position:absolute; top:50px; left:100px;">Click here to win a prize!</button>
```

* User thinks they're clicking a prize button but actually clicks inside your bank's iframe, unknowingly transferring money.

### ReactJS Application

React apps are still normal web apps under the hood. If a React app (`https://myreactapp.com`) doesn't set iframe protections:

```jsx
<iframe src="https://myreactapp.com" style={{opacity:0, pointerEvents:"none"}} />
```

* Attackers could load your entire React app and misuse forms or authenticated sessions without users realizing it.

---

## 6. 🛡️ How to Prevent/Fix

### 6.1 In a Generic Web Application

✅ Set HTTP headers:

* **`X-Frame-Options: DENY`**
   Completely disallow framing by any site.

* **`X-Frame-Options: SAMEORIGIN`**
   Allow framing only by your own site.

✅ Use Content Security Policy (CSP):

http
```text
Content-Security-Policy: frame-ancestors 'self';
```

* `'self'` allows only your domain to frame your app.

* You can also allow trusted partners specifically: `'self' https://trustedpartner.com`

✅ Validate and sandbox third-party iframes:

```html
<iframe src="https://example.com" sandbox="allow-scripts allow-same-origin"></iframe>
```

* Use the `sandbox` attribute to limit iframe permissions.

✅ Monitor and Audit:

* Regularly check if your pages are being embedded externally.

---

### 6.2 In ReactJS

✅ Configure HTTP headers at server level:

* If you're using **Node.js/Express** backend for React deployment:

```js
app.use((req, res, next) => {
res.setHeader("X-Frame-Options", "DENY");
res.setHeader("Content-Security-Policy", "frame-ancestors 'self'");
next();
});
```

✅ If hosting on Vercel/Netlify:

* Configure `headers` in `vercel.json` or `_headers` file:

```text
/*
X-Frame-Options: DENY
Content-Security-Policy: frame-ancestors 'self'
```

✅ For iframe embeds you create:

* Always use **sandboxed iframes**:

```jsx
<iframe
src="https://trustedcontent.com"
sandbox="allow-scripts allow-same-origin"
title="Trusted Content"
/>
```

✅ Use CSP meta tag in HTML when possible:

```html
<meta http-equiv="Content-Security-Policy" content="frame-ancestors 'self';" />
```

*(Useful when server-side headers are hard to configure.)*

---

## 7. ✅ Summary

| Aspect | Solution |
| ----- | ----- |
| Block framing | `X-Frame-Options: DENY` or `SAMEORIGIN` |
| Advanced control | `Content-Security-Policy: frame-ancestors` |
| For iframes you embed | Use `sandbox` attribute |
| React server-side config | Set headers at API server/deploy |
| React client-side embed | `<iframe>` with `sandbox` |
| Regular Monitoring | External iframe load check |

## 📋 iFrame Protection Cheatsheet

| Scenario | Security Header to Use | Example Configuration | Notes |
| ----- | ----- | ----- | ----- |
| ❌ Block all iframe embedding (highest security) | `X-Frame-Options: DENY` | `X-Frame-Options: DENY` | No site (including your own) can embed your page. |
| ✅ Allow only your own site to embed | `X-Frame-Options: SAMEORIGIN` | `X-Frame-Options: SAMEORIGIN` | Only pages from the **same origin** can embed your app. |
| 🎯 Allow specific trusted partners | `Content-Security-Policy: frame-ancestors` | `Content-Security-Policy: frame-ancestors 'self' https://trustedpartner.com;` | Allows your own site and a specific external domain. |
| 🔒 Protect admin panel only, public pages open | Set headers **only on sensitive routes** | E.g., `/admin/*` gets `X-Frame-Options: DENY` | Configure server to selectively apply headers. |
| 🎯 Embedding external iframes safely inside your app | Use `sandbox` attribute on `<iframe>` | `<iframe src="..." sandbox="allow-scripts allow-same-origin"></iframe>` | Restricts capabilities inside iframe. Remove `allow-same-origin` if you can. |
| 🚨 Absolute maximum protection | Both `X-Frame-Options` \+ `Content-Security-Policy` | Set both headers together | Defense in depth — in case some browsers ignore one. |

---

## ⚡ Quick Code Snippets for Different Setups

## Node.js/Express Server Example

```js
app.use((req, res, next) => {
res.setHeader("X-Frame-Options", "DENY"); // Highest protection
res.setHeader("Content-Security-Policy", "frame-ancestors 'self';"); // Modern protection
next();
});
```

## Netlify / Vercel `_headers` File Example

```bash
/*
X-Frame-Options: SAMEORIGIN
Content-Security-Policy: frame-ancestors 'self' https://partner.example.com;
```

## React `<iframe>` Safe Embed Example

```jsx
<iframe
src="https://trustedcontent.com"
sandbox="allow-scripts allow-same-origin"
title="Safe Embed"
/>
```

---

## 🧠 Pro Tips

* **Prefer CSP (`frame-ancestors`)** over `X-Frame-Options` when possible — it’s newer and more flexible.

* **Don't blindly allow `allow-same-origin` in sandbox** unless absolutely needed.

* **Always test headers** after deployment using tools like [SecurityHeaders.com](https://securityheaders.com/).

* **Apply different iframe policies for different routes** if needed (especially admin vs public pages).

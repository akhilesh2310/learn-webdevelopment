---
title: Security Headers
sidebar_position: 6
---

# Security Headers

Related canonical pages: [XSS](xss-cross-site-scripting.md), [iFrame Protection](iframe-clickjacking-protection.md).

## Security Headers

## 1. What is Security Headers?

Security headers are HTTP response headers used to enhance the security of a web application by instructing the browser on how to handle certain aspects of web page behavior, security policies, and resource access. These headers help to protect the application from various vulnerabilities like Cross-Site Scripting (XSS), Clickjacking, and other malicious attacks.

## 2. When does it occur?

Security headers should be implemented as soon as you start working on a web application, ideally in the early stages of development or during the configuration of your web server. It's critical to continuously review and update these headers to adapt to emerging threats and to ensure ongoing protection. A lack of proper security headers can expose your web application to attacks and vulnerabilities.

## 3. How does it happen?

Security headers are not set by default in most web servers and applications. Without these headers, browsers may interpret content in an unsafe way, potentially allowing attackers to exploit vulnerabilities. The absence of certain security headers, like Content Security Policy (CSP), can leave your site vulnerable to XSS or other injection attacks.

For example, if an attacker can inject malicious scripts into your application, a lack of a CSP header might allow the browser to execute it, leading to data theft or unauthorized actions.

## 4. Why is it dangerous?

Without security headers, attackers may be able to bypass certain browser protections, which can result in a range of issues, such as:

* **Cross-Site Scripting (XSS)**: Malicious scripts executed in the browser.

* **Clickjacking**: Malicious page overlays trick users into clicking on hidden elements.

* **Man-in-the-middle (MITM) Attacks**: Interception of sensitive data transmitted between client and server.

In short, failing to set proper security headers exposes your app to a variety of common attacks, compromising the safety of your users and application.

## 5. Example

### In a Generic Web Application:

Imagine a banking application where an attacker might inject malicious JavaScript to steal login credentials. If a **Content Security Policy (CSP)** header isn’t set, this malicious script may be executed by the browser, compromising the user's data.

### In ReactJS:

In a ReactJS app, imagine if you allow inline script execution through React's dangerouslySetInnerHTML without a proper CSP. This could enable an attacker to inject harmful scripts, risking XSS vulnerabilities.

## 6. 🛡️ How to Prevent/Fix

### 6.1 In a Generic Web Application

* **Content Security Policy (CSP)**: Define which resources can be loaded and executed by the browser, reducing the risk of XSS attacks.

Example header:
`Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.com;`

* **Strict-Transport-Security (HSTS)**: Force the browser to only communicate with your site over HTTPS to prevent MITM attacks.

Example header:
`Strict-Transport-Security: max-age=31536000; includeSubDomains`

* **X-Content-Type-Options**: Prevent browsers from interpreting files as a different MIME type (e.g., treating an HTML file as a script).

Example header:

 pgsql
```text
X-Content-Type-Options: nosniff
```

*
* **X-Frame-Options**: Prevent your site from being embedded within an iframe, which helps to avoid clickjacking attacks.

Example header:
`X-Frame-Options: DENY`

* **Referrer-Policy**: Control the information sent in the Referer header when a user clicks on a link.

Example header:

 pgsql
```text
Referrer-Policy: no-referrer-when-downgrade
```

*
* **Feature-Policy**: Restrict access to certain features in the browser (like geolocation, camera, microphone).

Example header:

 pgsql
```text
Feature-Policy: geolocation 'self'; microphone 'none';
```

*

### 6.2 In ReactJS

**Set Headers in the Server Configuration**: If your React app is served via an Express.js backend or similar, you can set these headers in your server configuration. Example with Express:

```js
app.use((req, res, next) => {
res.setHeader('Content-Security-Policy', "default-src 'self'");
res.setHeader('Strict-Transport-Security', 'max-age=31536000');
res.setHeader('X-Content-Type-Options', 'nosniff');
res.setHeader('X-Frame-Options', 'DENY');
next();
});
```

*

**Use Helmet**: In a Node.js application using React (e.g., with Express), you can use the `helmet` middleware to automatically set various HTTP headers:

```js
const helmet = require('helmet');
app.use(helmet());
```

*

**React CSP with Meta Tags**: If your React app is entirely client-side, use meta tags for CSP (though not as secure as HTTP headers):

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://trusted.com;">
```

*

## 7. ✅ Summary

| Security Header | Purpose | Example Header |
| ----- | ----- | ----- |
| **Content-Security-Policy** | Prevents XSS and unauthorized resource loading. | `Content-Security-Policy: default-src 'self';` |
| **Strict-Transport-Security** | Forces HTTPS communication for secure connections. | `Strict-Transport-Security: max-age=31536000;` |
| **X-Content-Type-Options** | Prevents MIME-type sniffing and enforces correct file type. | `X-Content-Type-Options: nosniff` |
| **X-Frame-Options** | Prevents clickjacking by blocking embedding of your site. | `X-Frame-Options: DENY` |
| **Referrer-Policy** | Controls referrer information for privacy. | `Referrer-Policy: no-referrer-when-downgrade` |
| **Feature-Policy** | Restricts access to certain browser features. | `Feature-Policy: geolocation 'self'; microphone 'none';` |

Implementing these headers significantly enhances the security of your application and mitigates common web security risks.

4o mini

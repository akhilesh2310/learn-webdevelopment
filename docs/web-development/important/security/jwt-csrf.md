---
title: JWT & CSRF
sidebar_position: 2
---

# JWT & CSRF

**React applications require CSRF (Cross-Site Request Forgery) protection when using cookie-based session authentication.** Because browsers automatically attach cookies to cross-origin requests, a malicious website could trick a logged-in user into making unauthorized backend state changes (like `POST`, `PUT`, or `DELETE`). 

If your React app uses `Authorization: Bearer <token>` headers instead of cookies, it is generally safe from CSRF.

---

## How CSRF Protection Works in a React Single Page Application (SPA)

Since React runs completely in the browser and cannot use traditional server-side template tags like Django's `\{% csrf_token %\}`, the recommended solution is the **Double Submit Cookie pattern**. 

**The Server Sets a Cookie:** Upon login or initial page load, the backend sets an `XSRF-TOKEN` cookie. This specific cookie must **not** be `HttpOnly` so that React can read it via JavaScript.

1. **React Reads and Sends the Token:** Your React application reads this token value and attaches it as a custom HTTP header (e.g., `X-XSRF-TOKEN` or `X-CSRF-Token`) on every state-changing request. \[1, 2\]  
2. **The Backend Validates:** The backend compares the token received in the custom header with the token inside the cookie. Since malicious third-party sites cannot read your cookies due to the [Same-Origin Policy (SOP)](https://www.stackhawk.com/blog/react-csrf-protection-guide-examples-and-how-to-enable-it/), they cannot supply the correct header, and the attack fails.

---

## Implementation Options in React

## Option 1: Automatic Handling via Axios \[6\]

If you use Axios for API calls, it has built-in support for the Double Submit Cookie pattern. It automatically looks for the `XSRF-TOKEN` cookie and attaches it to the `X-XSRF-TOKEN` header. \[6, 7, 8\]

You only need to configure your global Axios instance:

\import axios from 'axios';

*// Tell Axios to accept cookies from cross-origin backend servers if applicable*

axios.defaults.withCredentials \= true; 

*// These are the default values, but specifying them ensures alignment with your backend*

axios.defaults.xsrfCookieName \= 'XSRF-TOKEN';

axios.defaults.xsrfHeaderName \= 'X-XSRF-TOKEN';

## Option 2: Manual Handling with the Fetch API

If you are using the native `fetch` API, you must manually extract the token from the browser cookies using a utility function and include it in your request headers. \[1, 3\]

*// Utility helper to extract a specific cookie value*

const getCookie \= (name) \=\> \{

  const value \= \`; $\{document.cookie\}\`;

  const parts \= value.split(\`; $\{name\}=\`);

  if (parts.length \=== 2) return parts.pop().split(';').shift();

\};

*// Making a protected state-changing request*

const updateUserData \= async (data) \=\> \{

  const csrfToken \= getCookie('XSRF-TOKEN'); *// Read the CSRF token from cookies*

  const response \= await fetch('/api/user/update', \{

    method: 'POST',

    headers: \{

      'Content-Type': 'application/json',

      'X-XSRF-TOKEN': csrfToken *// Send token back in a custom header*

    \},

    body: JSON.stringify(data)

  \});

  return response.json();

\};

## Option 3: Initial Fetch Pattern

If your backend does not automatically drop a CSRF cookie on initial load (common in headless REST APIs), your React app must deliberately fetch it when initializing or during the login phase. \[1, 2\]

\import \{ useEffect, useState \} from 'react';

function App() \{

  const \[csrfToken, setCsrfToken\] \= useState('');

  useEffect(() \=\> \{

    *// Warm up the session and fetch the token from the backend*

    fetch('/api/csrf-token')

      .then(res \=\> res.json())

      .then(data \=\> setCsrfToken(data.token)); *// Keep it in state or context*

  \}, \[\]);

\}

---

## Key Backend Requirements

For this setup to successfully defend your application, ensure your server configuration satisfies these criteria: \[9\]

* **Cookie Flags:** Ensure your authentication session cookie uses `HttpOnly`, `Secure`, and `SameSite=Lax` (or `Strict`) flags.  
* **CSRF Cookie Permissions:** The designated CSRF token cookie must **not** be `HttpOnly` so your React application can access it using `document.cookie`.  
* **CORS Settings:** Do not use wildcard (`*`) origins. Explicitly whitelist your React application's exact domain URL and set `Access-Control-Allow-Credentials` to `true`. \[1, 2, 10, 11\]

If you'd like to tailor this protection to your current tech stack, please tell me:

* What **backend framework or language** (e.g., Node/Express, Django, Spring Boot, Laravel) are you running?  
* How are you managing user **authentication**? (e.g., Session cookies, HTTP-only JWT cookies, or local storage tokens?) \[2, 3, 5, 12, 13, 14\]

You actually need to think about this differently, because **JWT and CSRF tokens are not** **mutually exclusive.** They solve two completely different problems in an authentication system.

The correct answer depends on **where you store your JWT**.

Here is the breakdown of how they interact and which one you need.

## ---

**The Short Answer**

* **JWT (JSON Web Token)** is an **Authentication Mechanism**. It tells the server *who* the user is.  
* **CSRF Token** is a **Security Guard**. It proves that the request came from *your* React app, and not a malicious site.

If you store your JWT in a **browser cookie** (the most secure method), you **must use both a JWT and a CSRF token**.

## ---

**Comparison: JWT vs. CSRF Token**

| Feature \[11, 12, 13, 14, 15\] | JWT (JSON Web Token) | CSRF Token |
| :---- | :---- | :---- |
| **Primary Purpose** | **Identity:** Proves a user's identity and permissions. | **Origin:** Proves the request came from your trusted frontend. |
| **What it contains** | User data (User ID, roles, expiration date). | A random, unpredictable string. |
| **How it's validated** | Cryptographically verified by the server. | Compared against a token stored in the session or a cookie. |

## ---

**Scenario 1: JWT stored in an HTTP-Only Cookie (Recommended)** 

Storing a JWT in a cookie with the HttpOnly flag protects it from XSS (Cross-Site Scripting) attacks because JavaScript cannot read it. However, because it is a cookie, the browser automatically sends it with every request, making it vulnerable to CSRF attacks.

* **Do you use a JWT?** Yes, to authenticate the user.  
* **Do you need a CSRF Token?** **Yes.** You must implement a CSRF token to protect that cookie.

## Scenario 2: JWT stored in LocalStorage / SessionStorage

If your React app stores the JWT in localStorage and manually attaches it to the HTTP header (Authorization: Bearer \<your-jwt\>), your app is completely immune to CSRF. Browsers do not automatically attach localStorage data to cross-origin requests.

* **Do you use a JWT?** Yes, to authenticate the user.  
* **Do you need a CSRF Token?** **No.** CSRF protection is unnecessary here.  
* *Warning:* While safe from CSRF, localStorage is highly vulnerable to XSS attacks. If an attacker injects malicious JavaScript, they can steal the JWT instant

**Summary Checklist: What should you build?**

1. **If you want maximum security:** Store your **JWT inside an HTTP-Only, Secure, SameSite Cookie**, and implement a **CSRF Token** (using the Double Submit Cookie pattern) to protect it.  
2. **If you want maximum simplicity:** Store your **JWT in React state/memory** and fetch a new one via a refresh token, or use localStorage (acknowledging the XSS risks), and **skip the CSRF token**.

If you want to map out the exact code for your project, let me know:

* Where do you currently **plan to store your JWT** (Cookies or LocalStorage)?  
* Do you have **XSS countermeasures** in place, like a strict Content Security Policy (CSP)?

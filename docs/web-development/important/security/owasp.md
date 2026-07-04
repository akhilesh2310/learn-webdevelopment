---
title: OWASP
sidebar_position: 3
---

# OWASP

The Open Worldwide Application Security Project is an online community that produces freely available articles, methodologies, documentation, tools, and technologies in the fields of IoT, system software and web application security. 

The **OWASP Top 10** primarily targets web application security concerns, and while many are server-side, several are highly relevant to **frontend engineers**—especially those building in **React, Angular, Vue, or plain JS/TS**. Here's a list of the **most frontend-relevant OWASP Top 10 items (2021 version)** with explanations:

---

### **🔟 Key OWASP Top 10 Items (Frontend-Relevant)**

1. **A01: Broken Access Control**

   * **Relevance**: Relying solely on client-side checks (like hiding UI elements) for access control can be bypassed.

   * **Frontend Mitigation**: Do not trust the client for enforcing permissions. Always enforce roles and permissions server-side.

2. **A03: Injection (including XSS)**

   * **Relevance**: Frontend code can introduce **Cross-Site Scripting (XSS)** vulnerabilities, especially via unsafe HTML rendering (`dangerouslySetInnerHTML` in React, `innerHTML`, etc.).

   * **Frontend Mitigation**:

     * Sanitize inputs.

     * Avoid unsafe DOM manipulations.

     * Use frameworks with built-in XSS protections.

     * Escape dynamic data in templates.

3. **A05: Security Misconfiguration**

   * **Relevance**: Exposing stack traces, debug tools, verbose error messages, or using default configs in production frontend builds.

   * **Frontend Mitigation**:

     * Remove dev tools in production.

     * Use proper build configurations (e.g., `NODE_ENV=production`).

     * Avoid exposing sensitive env variables.

4. **A07: Identification and Authentication Failures**

   * **Relevance**: Storing tokens insecurely in localStorage/sessionStorage is prone to XSS attacks.

   * **Frontend Mitigation**:

     * Use **HTTP-only cookies** where possible for storing tokens.

     * Avoid exposing sensitive auth flows or logic on the client.

5. **A08: Software and Data Integrity Failures**

   * **Relevance**: Loading frontend libraries from untrusted CDNs or using unsigned scripts can be hijacked.

   * **Frontend Mitigation**:

     * Use **Subresource Integrity (SRI)** tags when linking external scripts.

     * Lock package versions (`package-lock.json`, `yarn.lock`).

6. **A09: Security Logging and Monitoring Failures**

   * **Relevance**: Errors thrown in frontend apps often go unnoticed, which delays attack detection.

   * **Frontend Mitigation**:

     * Integrate client-side monitoring tools (e.g., Sentry, LogRocket).

     * Log suspicious activities like brute force patterns or script injections.

7. **A10: Server-Side Request Forgery (SSRF)** *(less relevant but still noteworthy)*

   * **Relevance**: Not directly triggered from frontend, but misuse of input (e.g., user-supplied URLs) can indirectly lead to SSRF.

   * **Frontend Mitigation**:

     * Validate and sanitize URLs before sending to backend APIs.

---

### **Bonus: Additional Concerns Not in OWASP but Frontend-Relevant**

* **Content Security Policy (CSP)**: Helps mitigate XSS by whitelisting allowed sources.

* **Clickjacking Protections**: Use `X-Frame-Options: DENY` headers to prevent UI redress attacks.

* **DOM Clobbering / Prototype Pollution**: Be cautious when parsing or applying user-controlled HTML.

### **🔐 1\. Cross-Site Scripting (XSS) – \[A03: Injection\]**

#### **🔸 React**

React automatically escapes content, but **`dangerouslySetInnerHTML`** is unsafe.

tsx

CopyEdit

`// ❌ UNSAFE`

`<div dangerouslySetInnerHTML=\{\{ __html: userInput \}\} />`

`// ✅ SAFE (prefer escaping or sanitizing)`

`<div>\{userInput\}</div>`

✅ Use libraries like `DOMPurify` if you must render HTML:

tsx

CopyEdit

`import DOMPurify from 'dompurify';`

`<div dangerouslySetInnerHTML=\{\{ __html: DOMPurify.sanitize(userInput) \}\} />`

#### **🔸 Angular**

Angular templates are also auto-sanitized, but **bypassing security** is dangerous.

ts

CopyEdit

`// ❌ UNSAFE`

`this.sanitizer.bypassSecurityTrustHtml(userInput);`

✅ Use Angular’s built-in sanitization (`[innerHtml]` auto-sanitizes):

html

CopyEdit

`<div [innerHtml]="userInput"></div>`

---

### **🔐 2\. Broken Access Control – \[A01\]**

**Never hide UI elements assuming that means security.**

`// ❌ Only hiding is not enough`

`\{user.isAdmin && <button>Delete User</button>\}`

`// ✅ Always enforce on the backend too`

`// Block unauthorized actions even if the button is clicked via dev tools`

🔐 **Frontend is for UX, not security enforcement.**

---

### **🔐 3\. Token Storage & Auth – \[A07: Identification & Authentication Failures\]**

#### **❌ Risky Token Storage:**

ts

CopyEdit

`localStorage.setItem("accessToken", token); // vulnerable to XSS`

#### **✅ Recommended:**

* Use **HttpOnly cookies** for storing tokens — frontend JS can’t access them.

* If using `localStorage` or `sessionStorage`, **enable strong CSP** and **sanitize inputs** thoroughly.

---

### **🔐 4\. Loading External Scripts – \[A08: Integrity Failures\]**

Use **Subresource Integrity (SRI)** when loading from CDNs.

`<script src="https://cdn.example.com/lib.js"`

        `integrity="sha384-xyz123"`

        `crossorigin="anonymous"></script>`

✅ Also pin dependency versions in `package.json` and use `npm audit` or `yarn audit`.

---

### **🔐 5\. Error Handling – \[A09: Logging and Monitoring Failures\]**

#### **✅ In React:**

`import * as Sentry from "@sentry/react";`

`<Sentry.ErrorBoundary fallback=\{<Fallback />\}>`

  `<App />`

`</Sentry.ErrorBoundary>`

🔍 Log unhandled promise rejections or suspicious behavior.

---

### **🔐 6\. Content Security Policy (CSP) (XSS prevention layer)**

Set in server response headers:

`Content-Security-Policy: default-src 'self'; script-src 'self'`

✅ Disallow inline scripts unless strictly required.

---

### **🔐 7\. Prevent Clickjacking**

Add header via backend:

mathematica

CopyEdit

`X-Frame-Options: DENY`

---

### **✅ Secure Coding Checklist (Frontend)**

| 🔧 Area | ✅ Safe Practice |
| ----- | ----- |
| DOM | No `dangerouslySetInnerHTML` without sanitizing |
| Tokens | Use HttpOnly cookies over `localStorage` |
| APIs | Never trust the frontend for access control |
| Errors | Don't expose stack traces to users |
| Dependencies | Lock versions, audit regularly |
| External JS | Use SRI with `integrity` and `crossorigin` |
| HTML Templates | Auto-sanitized by framework – do not bypass |
| Network | Enforce HTTPS, CSP headers, and X-Frame-Options |

### **🔍 How Clickjacking Works:**

A common clickjacking attack involves:

1. **Embedding a legitimate site (e.g., a bank or social media site) in an invisible iframe** on a malicious web page.

2. **Overlaying fake UI elements** (like buttons or links) that the user sees and interacts with.

3. **User clicks**, thinking they’re clicking the visible UI, but actually interacting with the hidden iframe.

---

### **💡 Example Scenario:**

Suppose you're logged into your bank account in another tab.

1. You visit a malicious site with a “Play” button on a game.

2. The malicious site overlays the “Play” button over an invisible iframe that points to the “Transfer Money” button of your bank site.

3. You click “Play”, but it actually clicks the “Transfer” button on your bank’s interface.

---

### **🔒 How to Prevent Clickjacking:**

Web developers can prevent clickjacking using:

* **`X-Frame-Options` HTTP Header**

  * `DENY` – Page cannot be displayed in a frame, regardless of the site.

  * `SAMEORIGIN` – Page can only be displayed in a frame on the same origin.

* **`Content-Security-Policy` (CSP) frame-ancestors directive**

Example:

 http  
CopyEdit  
`Content-Security-Policy: frame-ancestors 'self'`

*   
* **JavaScript frame busting (less secure)**

Detect if your page is inside an iframe and break out:

 javascript  
CopyEdit  
`if (top !== self) \{`

  `top.location = self.location;`

`\}`

* 

---

## **🔥 1\. What is XSS (Cross-Site Scripting)?**

**XSS** is a security vulnerability that allows attackers to **inject malicious JavaScript** into web pages viewed by other users. It's usually used to steal cookies, session tokens, or perform actions on behalf of a user.

---

### **⚙️ How XSS Works:**

1. An attacker inputs a malicious script into a form, comment field, URL, or other input that the server or frontend renders without validation or escaping.

2. That script is stored or reflected in the web page and executed in the browser of users who visit the page.

3. The script can:

   * Steal session cookies (`document.cookie`)

   * Modify DOM

   * Redirect users

   * Log keystrokes

---

### **🧪 Example of XSS Attack:**

Suppose a blog shows comments without escaping:

Attacker posts:

html

CopyEdit

`<script>alert('Hacked!');</script>`

When any user views the comment, the script runs.

---

### **✅ How to Prevent XSS:**

* Always **escape HTML special characters** (`<`, `>`, `"`).

* Use frameworks/libraries that **auto-escape outputs** (e.g., React, Angular).

* Use **Content Security Policy (CSP)** headers.

* Sanitize inputs using libraries like **DOMPurify**.

---

## **💣 2\. What is SQL Injection?**

**SQL Injection** is an attack that lets an attacker execute **malicious SQL queries** on your database by injecting code into user input fields.

---

### **⚙️ How SQL Injection Works:**

1. Application dynamically builds SQL queries using unsanitized user input.

2. Attacker manipulates the input to **inject malicious SQL** commands.

---

### **🧪 Example of SQL Injection:**

Suppose your login form runs:

sql

CopyEdit

`SELECT * FROM users WHERE username = '$username' AND password = '$password'`

An attacker enters:

* `username`: `' OR 1=1 --`

* `password`: `anything`

Final query:

sql

CopyEdit

`SELECT * FROM users WHERE username = '' OR 1=1 --' AND password = 'anything'`

* `--` comments out the rest of the query.

* `OR 1=1` is always true → attacker is logged in without credentials.

---

### **✅ How to Prevent SQL Injection:**

**Use prepared statements** / parameterized queries:

 java  
CopyEdit  
`PreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE username=? AND password=?");`

`ps.setString(1, username);`

`ps.setString(2, password);`

*   
* **Avoid string concatenation** in queries.

* Use ORM frameworks (like Sequelize, Hibernate).

* Validate and sanitize user inputs.

* Apply **least privilege** to DB accounts.

### **🔐 A01:2021 – Broken Access Control**

* **What it is:** Occurs when restrictions on authenticated users are not properly enforced, allowing unauthorized actions.

* **How it works:** Attackers exploit flaws to gain unauthorized access to functions or data, such as modifying user IDs in URLs to access other users' information.

* **Example:** Changing a URL from `/user/123/profile` to `/user/124/profile` and accessing another user's profile without authorization.

* **Prevention:**

  * Implement role-based access control (RBAC).

  * Deny access by default and explicitly grant permissions.

  * Regularly audit and test access controls.

---

### **🔐 A02:2021 – Cryptographic Failures**

* **What it is:** Previously known as "Sensitive Data Exposure," this involves failures in cryptographic systems leading to data breaches.[Medium+1OWASP+1](https://medium.com/%40ajay.monga73/comparison-of-the-first-owasp-top-10-and-owasp-top-10-2021-995c8729c054?utm_source=chatgpt.com)

* **How it works:** Inadequate encryption, weak algorithms, or poor key management expose sensitive data to unauthorized parties.

* **Example:** Storing passwords in plaintext or using outdated encryption methods like MD5.

* **Prevention:**

  * Use strong, up-to-date encryption algorithms (e.g., AES-256).

  * Implement proper key management practices.

  * Ensure data is encrypted both at rest and in transit.

---

### **💣 A03:2021 – Injection**

* **What it is:** Occurs when untrusted data is sent to an interpreter as part of a command or query, leading to unintended execution.

* **How it works:** Attackers inject malicious code into inputs that are then executed by the application.

* **Example:** SQL Injection: Entering `' OR '1'='1` in a login field to bypass authentication.

* **Prevention:**

  * Use parameterized queries or prepared statements.

  * Validate and sanitize all user inputs.

  * Employ ORM frameworks to abstract database interactions.

---

### **🛠️ A04:2021 – Insecure Design**

* **What it is:** Introduced in 2021, this refers to security flaws resulting from inadequate design and architectural decisions.

* **How it works:** Lack of secure design patterns or threat modeling leads to vulnerabilities that are hard to fix post-implementation.[OWASP+1Medium+1](https://owasp.org/Top10/?utm_source=chatgpt.com)

* **Example:** Designing an application without considering user role segregation, leading to privilege escalation.

* **Prevention:**

  * Incorporate security requirements during the design phase.

  * Perform threat modeling and risk assessments.

  * Adopt secure design patterns and principles.[OWASP](https://owasp.org/Top10/?utm_source=chatgpt.com)

---

### **⚙️ A05:2021 – Security Misconfiguration**

* **What it is:** Refers to improper configurations that leave the application vulnerable to attacks.[Wikipedia+1Wikipedia+1](https://en.wikipedia.org/wiki/Application_security?utm_source=chatgpt.com)

* **How it works:** Default settings, unnecessary features, or verbose error messages can provide attackers with valuable information.

* **Example:** Leaving default admin credentials unchanged or exposing stack traces in error messages.

* **Prevention:**

  * Regularly review and update configurations.

  * Disable unnecessary features and services.

  * Implement security hardening practices.

---

### **🧱 A06:2021 – Vulnerable and Outdated Components**

* **What it is:** Using components with known vulnerabilities can compromise the entire application.[Medium+2OWASP+2OWASP+2](https://owasp.org/Top10/?utm_source=chatgpt.com)

* **How it works:** Attackers exploit known flaws in outdated libraries, frameworks, or software components.

* **Example:** Using an outdated version of a JavaScript library with known security issues.

* **Prevention:**

  * Maintain an inventory of all components and their versions.

  * Regularly update and patch components.

  * Monitor for known vulnerabilities in third-party components.

---

### **🔑 A07:2021 – Identification and Authentication Failures**

* **What it is:** Previously "Broken Authentication," this involves flaws in identity verification mechanisms.

* **How it works:** Weak password policies, session management issues, or lack of multi-factor authentication can be exploited.

* **Example:** Allowing unlimited login attempts without account lockout, enabling brute-force attacks.

* **Prevention:**

  * Implement strong password policies and hashing algorithms.

  * Use multi-factor authentication.

  * Secure session management practices.

---

### **🧩 A08:2021 – Software and Data Integrity Failures**

* **What it is:** Introduced in 2021, this pertains to code and infrastructure that do not protect against integrity violations.

* **How it works:** Lack of verification for software updates or critical data can lead to unauthorized changes.

* **Example:** Downloading and executing software updates over unsecured channels without verifying integrity.

* **Prevention:**

  * Use digital signatures to verify software integrity.

  * Implement secure update mechanisms.

  * Employ dependency management tools to monitor for tampering.

---

### **📋 A09:2021 – Security Logging and Monitoring Failures**

* **What it is:** Insufficient logging and monitoring can delay detection of breaches and hinder incident response.

* **How it works:** Without proper logs, malicious activities may go unnoticed, allowing attackers to maintain persistence.

* **Example:** Failing to log failed login attempts, missing signs of a brute-force attack.

* **Prevention:**

  * Implement comprehensive logging of security-relevant events.

  * Regularly monitor and analyze logs.

  * Establish incident response procedures.

---

### **🌐 A10:2021 – Server-Side Request Forgery (SSRF)**

* **What it is:** Occurs when an application fetches a remote resource without validating the user-supplied URL, leading to internal resource access.

* **How it works:** Attackers manipulate URLs to make the server initiate requests to unintended destinations, potentially accessing internal systems.

* **Example:** Submitting a URL like `http://localhost/admin` to access internal admin interfaces.

* **Prevention:**

  * Validate and sanitize all user-supplied URLs.

  * Implement network segmentation and firewall rules.

  * Avoid exposing internal services to external inputs.

---

For more detailed information and resources, you can visit the official OWASP Top 10 page: [OWASP Top 10:2021](https://owasp.org/Top10/).

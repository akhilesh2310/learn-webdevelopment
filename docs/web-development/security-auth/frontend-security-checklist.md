---
title: Frontend Security Checklist
sidebar_position: 1
---

# Frontend Security Checklist

Related canonical pages: [XSS](xss-cross-site-scripting.md), [JWT & CSRF](jwt-csrf-token-storage.md), [Security Headers](security-headers.md), [iFrame Protection](iframe-clickjacking-protection.md).

## Security

* XSS
* CSRF
* Content Security Policy (CSP)
* Secure Storage Practices

## [A10 Server Side Request Forgery (SSRF) \- OWASP Top 10:2021](https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/)

## 1. Client-Side Storage

| Area | Risk | Mitigation |
| ----- | ----- | ----- |
| `localStorage` / `sessionStorage` | Accessible via JS & vulnerable to XSS | Avoid storing tokens or PII |
| `IndexedDB` / `WebSQL` | Same risk as above | Only store non-sensitive data |
| Browser Cache | Caches sensitive data | Set `Cache-Control: no-store` for sensitive routes |

---

## 2. Authentication & Session Management

| Area | Risk | Mitigation |
| ----- | ----- | ----- |
| Passwords | Weak storage / transmission | Always hash (bcrypt), use HTTPS |
| JWT Tokens | Stored in `localStorage` / leaked | Use **httpOnly** cookies, short expiry |
| Session IDs | Session hijacking | Regenerate on login, use secure, httpOnly cookies |
| Remember Me | Persistent tokens leaked | Secure them properly (refresh token rotation, fingerprinting) |

---

## 3. Input Fields & Forms

| Area | Risk | Mitigation |
| ----- | ----- | ----- |
| User Inputs | XSS, SQL Injection | Sanitize, validate inputs |
| File Uploads | Malware or DoS | Validate file type, size, scan for malware |
| Hidden Fields | Tampering | Don’t rely on client data for critical logic |

---

## 4. API and Backend

| Area | Risk | Mitigation |
| ----- | ----- | ----- |
| Open APIs | Unauthorized access | Use rate-limiting, API keys, JWT, OAuth2 |
| CORS Configuration | Overly permissive | Use strict CORS rules |
| Mass Assignment | Unintended fields updated | Use strong parameter whitelisting (e.g., `params.require.permit` in Rails) |

---

## 5. Sensitive Data Handling

| Area | Risk | Mitigation |
| ----- | ----- | ----- |
| PII (Emails, Phone Numbers) | Leaks | Store encrypted, access-controlled |
| Payment Info | PCI DSS violations | Use secure gateways (Stripe), don’t store card info yourself |
| Logs | Logging secrets | Mask tokens, passwords in logs |

---

## 6. Third-Party Scripts and Dependencies

| Area | Risk | Mitigation |
| ----- | ----- | ----- |
| CDN-loaded scripts | Can be compromised | Use Subresource Integrity (SRI) |
| npm packages | Vulnerable libraries | Use `npm audit`, Snyk, keep dependencies updated |
| Analytics / Ads scripts | Data leakage | Load asynchronously, audit regularly |

---

## 7. Browser-Level Issues

| Area | Risk | Mitigation |
| ----- | ----- | ----- |
| Autofill | Autofills sensitive data in wrong fields | Use `autocomplete="off"` where necessary |
| Clickjacking | UI redressing attacks | Set `X-Frame-Options: DENY` |
| Clipboard Hijacking | Stealing copied data | Monitor and sanitize input fields with JS |

---

## 8. DevOps / Deployment

| Area | Risk | Mitigation |
| ----- | ----- | ----- |
| Environment Variables | Exposed in front-end builds | Never expose `.env` in client apps |
| Build Artifacts | Leaked secrets or debug info | Clean builds, avoid bundling `.env`, use `.gitignore` properly |
| Secrets Management | Hardcoded API keys | Use secret managers (Vault, AWS Secrets Manager) |

---

## 9. HTTP Headers

Set proper headers to protect against various attacks:

* `Content-Security-Policy` – prevent XSS

* `Strict-Transport-Security` – enforce HTTPS

* `X-Frame-Options` – prevent clickjacking

* `Referrer-Policy` – avoid leaking referrer

* `X-Content-Type-Options: nosniff` – prevent MIME sniffing

---

## 10. Admin Panels & Dashboards

| Area | Risk | Mitigation |
| ----- | ----- | ----- |
| Public access | Brute force, data leaks | IP whitelisting, MFA, strong passwords |
| Lack of audit trails | No trace of admin actions | Log all critical admin actions |

---

## Bonus: Codebase Risks

| Area | Risk | Mitigation |
| ----- | ----- | ----- |
| Exposed `.git` folders | Leak of source code | Prevent access to `.git` via server config |
| Public S3 buckets / storage | Data exposure | Enforce access policies and encryption |
| GitHub Secrets | Leaked via public repos | Use secret scanning and environment variables |

---

## Secure These 10 Key Areas

1. **Client-side storage** (never store tokens in localStorage)

2. **Authentication/session management**

3. **User input validation and sanitization**

4. **Secure API design & access control**

5. **Data protection (PII, tokens, logs)**

6. **Third-party scripts and dependencies**

7. **Browser and UI level hardening**

8. **DevOps & secrets management**

9. **Security headers**

10. **Admin interfaces & access control**

---

Security Topics:

Understand the nuances of \[Next Topic Name\], exploring its what, when, how, why, and examples, specifically in the context of both a generic web application and a ReactJS application.

Discover the nuances of \[Next Topic Name\], understanding its what, when, how, why, examples, and solutions to fix/prevent vulnerabilities, in the context of both a generic web application and ReactJS.

* Cross-site Scripting (XSS): Discover the nuances of XSS vulnerabilities, empowering you to fortify your frontend against malicious script injections that threaten user security.
* iFrame Protection: Secure your frontend against iFrame0based threats by mastering techniques to safeguard embedded content and prevent potential vulnerabilities.
* Security Headers: Implement security headers effectively to fortify your frontend against various threats, leveraging key configurations for enhanced protection.
* Client-side Security: Master best practices and tools for ensuring robust client-side security in your frontend architecture.
* Secure Communication (HTTPs): Safeguard data transfer using advanced HTTP security measures, ensuring secure communication in your frontend applications.
* Dependency Security: Learn to identify and mitigate vulnerabilities in third-party dependencies, fortifying your frontend against potential risks.
* Compliance & Regulation: Navigate complex compliance standards, ensuring your frontend adheres to regulations, mitigating legal and security risks effectively.
* Input Validation and Sanitization: Master the art of input validation and sanitization, safeguarding your frontend against various security threats originating from user inputs.
* Server-Side Request Forgery (SSRF): Identify and counter SSRF threats, ensuring robust security for your frontend servers against unauthorized requests.
* Feature Policy | Permissions-Policy: Leverage feature and permissions policies for strengthened frontend security, managing browser behaviors and permission effectively.
* Sub resource Integrity (SRI): Ensure resource integrity by implementing SRI, safeguarding resources loaded into your frontend against tampering.
* Cross-Origin Resource Sharing (CORS): Manage CORS effectively for secure cross-origin data sharing withing your frontend applications.
* Cross-Site Request Forgery (CSRF): Prevent cross-site request forgery (CSRF) attacks for enhanced security.

## ✨ Template for the Next Topic

I am preparing for interview with 13 years of experience as UI architect and I would to learn about security topic for better explaining to interviewer.

**"Discover the nuances of “**Security Headers: Implement security headers effectively to fortify your frontend against various threats, leveraging key configurations for enhanced protection.**”, understanding its what, when, how, why, examples, and solutions to fix or prevent vulnerabilities, explained in the context of both a generic web application and ReactJS."**

**Answer in the following template format:**
`# [Topic Name]`

`## 1. What is [Topic Name]?`
`(Explain what it is.)`

`## 2. When does it occur?`
`(Explain when the vulnerability/problem occurs and when we need to fix it.)`

`## 3. How does it happen?`
`(Describe the mechanisms or scenarios how this happens and how to fix it.)`

`## 4. Why is it dangerous?`
`(Explain the risks and consequences and why we need to fix it.)`

`## 5. Example`
`(Provide examples in both generic web app and ReactJS.)`

`## 6. 🛡️ How to Prevent/Fix`

`### 6.1 In a Generic Web Application`
`- (List steps.)`

`### 6.2 In ReactJS`
`- (List steps.)`

`## 7. ✅ Summary`
`(Quick table or bullet points.)`

---

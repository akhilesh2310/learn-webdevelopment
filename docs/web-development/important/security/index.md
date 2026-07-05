---
title: Security & Auth
sidebar_position: 1
---

# Security & Auth

This is the entry point for frontend security and authentication study.

## Study Path

1. [OWASP](./owasp.md)
2. [XSS (Cross-Site Scripting)](./xss-cross-site-scripting.md)
3. [JWT & CSRF](./jwt-csrf.md)
4. [Security Headers](./security-headers.md)
5. [iFrame Protection](./iframe-protection.md)
6. [React Security](./react-security.md)
7. [Frontend Security Checklist](./frontend-security-checklist.md)

## Ownership

- XSS details live in [XSS (Cross-Site Scripting)](./xss-cross-site-scripting.md).
- Token storage and CSRF tradeoffs live in [JWT & CSRF](./jwt-csrf.md).
- CSP, HSTS, X-Frame-Options, and related headers live in [Security Headers](./security-headers.md).
- Clickjacking and frame protection live in [iFrame Protection](./iframe-protection.md).
- React-specific security guidance lives in [React Security](./react-security.md).
- Broad checklist-style review stays in [Frontend Security Checklist](./frontend-security-checklist.md).

## Quick Revision

- Do not trust client-side authorization.
- Avoid storing sensitive tokens in JavaScript-readable storage.
- Use `HttpOnly`, `Secure`, and `SameSite` cookies where appropriate.
- Sanitize and validate untrusted input.
- Avoid unsafe HTML rendering.
- Use strong security headers.
- Lock and audit third-party dependencies.
- Avoid exposing secrets in frontend builds.
- Log and monitor suspicious client-side behavior.

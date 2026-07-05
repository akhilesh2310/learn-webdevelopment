---
title: Accessibility
sidebar_position: 4
---

# Accessibility

### How would you test accessibility?

## Expected:

* # axe

* # Lighthouse

## 🎯 What is Web Accessibility (WCAG)?

**Web Accessibility** means making your websites **usable by everyone**, including people with:

* Vision impairments (blindness, low vision, color blindness)

* Hearing impairments (deafness, hard of hearing)

* Motor impairments (difficulty using a mouse, etc.)

* Cognitive impairments (memory, attention, learning disabilities)

The **WCAG** (**Web Content Accessibility Guidelines**) are the official **international standards** created to guide developers and designers on **how to build accessible websites**.

---

## ❓ Why is Accessibility Important?

| Why | Explanation |
| ----- | ----- |
| 🌎 Inclusivity | 1 in 6 people globally have disabilities. |
| ⚖️ Legal Compliance | Accessibility lawsuits are rising (ex: ADA in USA, RPWD in India, EN 301 549 in EU). |
| 🚀 SEO Benefits | Google favors accessible sites (good semantics, headings, alt text). |
| 🤝 Better UX | Accessibility often means better usability for everyone (like mobile users, seniors, etc.). |
| 💖 Social Responsibility | It's simply the right thing to do. |

---

## 🧩 WCAG is Based on 4 Main Principles ("POUR")

| Principle | Meaning | Example |
| ----- | ----- | ----- |
| **P**erceivable | Users must be able to perceive content. | Provide alt text for images. |
| **O**perable | Users must be able to interact with it. | Make buttons keyboard accessible. |
| **U**nderstandable | Users must be able to understand content and UI. | Forms show clear errors. |
| **R**obust | Works across all browsers and assistive technologies. | Use valid HTML. |

---

## 🔥 How to Implement WCAG Accessibility in React.js

Here’s a structured approach:

---

## 1. Semantic HTML First

React lets you render any element — **use the correct HTML tag**:

| Instead of | Use |
| ----- | ----- |
| `<div onClick=\{...\}>` | `<button onClick=\{...\}>` |
| `<div>` | `<header>`, `<nav>`, `<main>`, `<footer>`, etc. |
| `<div>` for a list | `<ul>` \+ `<li>` |
| `<b>` | `<strong>`, `<em>` |

✅ Screen readers understand semantic tags better\!

Example:

jsx  
CopyEdit  
`<header>`  
  `<h1>Welcome to My App</h1>`  
`</header>`

---

## 2. Keyboard Navigation Support

✅ Make sure users can:

* Tab through links, buttons, inputs

* Activate buttons using **Enter** / **Space**

React Tip:

* Use `tabIndex` for custom focusable elements

* Use real buttons/links, not divs

Example (Custom Div Acting as Button — Bad):

jsx  
CopyEdit  
`<div onClick=\{handleClick\}>Submit</div>` 

Better (Semantic Button):

jsx  
CopyEdit  
`<button onClick=\{handleClick\}>Submit</button>`

Even Custom Components Should Pass Keyboard Events:

jsx  
CopyEdit  
`<div`  
  `role="button"`  
  `tabIndex=\{0\}`  
  `onKeyDown=\{(e) => (e.key === 'Enter' || e.key === ' ') && handleClick()\}`  
  `onClick=\{handleClick\}`  
`>`  
  `Submit`  
`</div>`

---

## 3. Provide Alt Text for Images

✅ Always add `alt` attributes to `<img>`.

jsx  
CopyEdit  
`<img src="dog.jpg" alt="Golden Retriever puppy playing" />`

If it's decorative only:

jsx  
CopyEdit  
`<img src="divider.png" alt="" aria-hidden="true" />`

---

## 4. Use ARIA Only When Necessary

✅ **ARIA** \= Accessible Rich Internet Applications attributes.

Use it carefully — **native HTML** is always better.

Examples:

* `aria-label="Close Modal"`

* `role="dialog"`

* `aria-expanded="true/false"` on dropdowns

React Example:

jsx  
CopyEdit  
`<button aria-label="Close" onClick=\{handleClose\}>`  
  `❌`  
`</button>`

---

## 5. Color Contrast and Font Sizes

✅ Text should have **sufficient contrast** from background.

WCAG requires:

* **Normal text:** Contrast ratio **≥ 4.5:1**

* **Large text:** Contrast ratio **≥ 3:1**

👉 Tools to check:

* WebAIM Contrast Checker

* Chrome Lighthouse audit

✅ Also:

* Minimum readable font-size ≈ **16px**.

* Avoid only color to convey meaning (ex: red text for error ➔ add an icon).

---

## 6. Form Accessibility

✅ Key rules for forms:

* Label every input using `<label>` and `htmlFor`

* Group radio buttons with `<fieldset>` and `<legend>`

* Provide error messages that are programmatically connected to inputs

Example:

jsx  
CopyEdit  
`<label htmlFor="email">Email Address</label>`  
`<input id="email" name="email" type="email" required />`

`<span id="emailError" role="alert">Invalid email address</span>`

---

## 7. Accessible Modals, Dialogs, and Dropdowns

✅ When a modal opens:

* Trap focus inside modal

* Pressing `Escape` closes it

* Announce modal content using ARIA

For dropdowns, use:

* `aria-expanded`

* `aria-controls`

Example:

jsx  
CopyEdit  
`<button aria-haspopup="true" aria-expanded="false">`  
  `Open Menu`  
`</button>`

---

## 8. Testing Accessibility

✅ Always test\!

Tools:

* Chrome Lighthouse (Accessibility Audit)

* axe DevTools

* \[Screen Readers\](like NVDA, VoiceOver)

In React:

bash  
CopyEdit  
`npm install @axe-core/react`

Then in dev mode:

jsx  
CopyEdit  
`import React from 'react';`  
`import ReactDOM from 'react-dom';`  
`import App from './App';`  
`import axe from '@axe-core/react';`

`if (process.env.NODE_ENV !== 'production') \{`  
  `axe(React, ReactDOM, 1000);`  
`\}`

This will log accessibility violations in console during development\!

---

## 🧠 Quick Mental Checklist for Developers:

✅ Use semantic HTML  
 ✅ Label everything (images, forms)  
 ✅ Full keyboard support  
 ✅ Check color contrast  
 ✅ Handle errors accessibly  
 ✅ Test with screen readers and audits

---

## 🔥 Summary

|  |  |
| ----- | ----- |
| **What** | Web Accessibility \= Building for everyone including people with disabilities. |
| **Why** | It's the law, improves UX, and is ethically correct. |
| **How** | Follow WCAG: use semantic HTML, proper labels, alt text, keyboard support, contrast, test regularly. |

---

Would you like me to also give you a **React.js Accessibility Starter Template** you can use directly? 🎯  
 (Meaning: ready-to-go setup with accessible Button, Modal, Input components — production ready.)  
 If yes, I’ll quickly generate that too\! 🚀  
 Would you like that?

4o

##### You said:

Exaplin different level of accessibility

###### ChatGPT said:

Of course\! Let’s dive into it step-by-step:

---

## 🎯 Accessibility Levels Explained (WCAG Levels A, AA, AAA)

In **WCAG guidelines**, accessibility is **organized into three levels** of conformance:

| Level | Name | Meaning | Goal |
| ----- | ----- | ----- | ----- |
| **A** | Minimum (Basic) Accessibility | The absolute **bare minimum** requirements. | Make sure the site is **somewhat accessible**. |
| **AA** | Mid-range (Industry Standard) | **Stronger**, more user-friendly requirements. | Sites are **usable by most people**, including many disabilities. |
| **AAA** | Highest (Advanced) Accessibility | **Very strict** accessibility requirements. | Aim for **maximum accessibility**. |

---

## 🛡️ 1. Level A (Minimum Compliance)

* 🧠 **Focus:**

  * Basic functionality works for assistive technologies (screen readers, keyboard users, etc.)

* 🔥 **Examples:**

  * Provide text alternatives (`alt`) for non-text content (images, videos).

  * All functionality must be operable via keyboard (no mouse-only actions).

  * Users can pause, stop, or adjust time limits on content.

* ❗ Not enough for most public-facing websites.

---

## 🛡️ 2. Level AA (Most Common Target)

* 🧠 **Focus:**

  * **Major barriers are removed**.

  * Covers more disabilities and realistic user scenarios.

* 🔥 **Examples:**

  * Sufficient contrast between text and background (minimum 4.5:1 contrast ratio).

  * Responsive text that resizes without breaking layout (up to 200% zoom).

  * Clear focus indicators when navigating via keyboard.

  * Consistent navigation (menu locations stay the same page-to-page).

  * Error messages that explain how to fix a form input mistake.

* ✅ **Most companies**, governments, and industries **must meet Level AA** by law.

  * Example: **ADA Compliance** (USA), **EN 301 549** (Europe), **RPWD Act** (India).

---

## 🛡️ 3. Level AAA (Highest Standard, Very Hard to Achieve)

* 🧠 **Focus:**

  * **Everything is super-accessible**, even in **edge cases** and for people with **very severe disabilities**.

* 🔥 **Examples:**

  * Very high contrast text (7:1 contrast ratio).

  * Sign language interpretation provided for video content.

  * No time limits on tasks, or a way to extend them indefinitely.

  * Reading level targeted at lower secondary school level.

  * Live audio content also provided in text (real-time captions).

* ❗ **Very difficult** to achieve across all content types.

* ❗ **Not required by most laws**, but some critical applications (like healthcare, banking) may aim for AAA in parts.

---

## 🎨 Easy Visual Summary

pgsql  
CopyEdit  
`Level A   - Basic | Must work at minimum`  
`Level AA  - Strong | Should be usable by most people (standard target)`  
`Level AAA - Exceptional | Ideal for full, global inclusivity but very hard`

---

## 🚀 Example in Real Life

| Level | Example |
| ----- | ----- |
| **A** | An image has alt text. |
| **AA** | A button has visible focus styles, and text has good color contrast. |
| **AAA** | A live webinar provides real-time sign language interpretation and easy-to-read captions. |

---

## 📜 In Short

|  |  |
| ----- | ----- |
| **Level A** | Minimal access. Important issues only. |
| **Level AA** | Real-world usable. Most common legal standard. |
| **Level AAA** | Maximal access. Idealistic, aspirational. |

## 💡 Pro Tip for Developers

When building React apps:

* **Always target Level AA** as the default standard.

* Try to **enhance some parts** to AAA where possible (for example, adding captions to videos).

---

Would you also like me to show you:

* ✅ How companies **audit** their web apps for Level AA compliance?

* ✅ A checklist table for Level A vs AA vs AAA to use while developing?

It'll be super handy if you want to ensure your React apps are compliant from the start. 🚀  
 Would you like me to continue with that?

4o

##### You said:

yes

###### ChatGPT said:

Awesome\! Let’s continue 🔥  
 I’ll break this down clearly so you can **directly apply** it in your projects.

---

## 🛡️ How Companies Audit Web Accessibility (Level A / AA / AAA)

### 1. Automated Testing (First Pass)

* **Tools like:**

  * 🛠️ axe (browser extension / npm package)

  * 🛠️ Lighthouse (built into Chrome DevTools → Audits tab → Accessibility)

  * 🛠️ Pa11y, Wave, Deque, Evinced

* **Purpose:**

  * Quickly catch obvious accessibility issues like:

    * Missing alt attributes

    * Color contrast problems

    * Missing labels on forms

    * Improper heading structures

⚡ These tools help find about **30–50%** of issues.

---

### 2. Manual Testing (Deep Audit)

* **Real user-like testing:**

  * Navigate only with a **keyboard** (Tab, Enter, Arrow keys, Spacebar).

  * Test with a **Screen Reader** (like NVDA, JAWS, or VoiceOver on Mac).

  * Zoom text to **200%** and check layout stability.

  * Simulate color-blindness or low-vision using tools.

🔥 Manual testing is critical to catch what automation **misses**\!

---

### 3. Assistive Technology Testing

* **Devices like:**

  * Screen readers

  * Braille displays

  * Voice input systems

* Companies **test critical user flows** (login, checkout, search, forms) with these tools.

---

### 4. Create an Accessibility Report

* Lists all issues with:

  * Severity (Critical, Serious, Minor, Suggestion)

  * WCAG criteria violated

  * Screenshot / URL / Recommendation

Example:

| Issue | WCAG Violation | Severity | Suggestion |
| ----- | ----- | ----- | ----- |
| Image missing `alt` | 1.1.1 Non-text Content | Serious | Add a meaningful alt attribute. |
| Button with no label | 2.4.4 Link Purpose | Critical | Add accessible name (aria-label or visible text). |

---

## 📋 Practical WCAG Checklist for Developers

| Feature | Level A | Level AA | Level AAA |
| ----- | ----- | ----- | ----- |
| Images | Alt text | Alt text | Detailed, context-specific alt text |
| Color contrast | Somewhat visible | 4.5:1 minimum | 7:1 minimum |
| Keyboard navigation | Basic | Smooth, logical | Extremely predictable |
| Video captions | Recommended | Required | Captions \+ Sign language |
| Forms | Labels exist | Error messages clear | Extra help text provided |
| Navigation | Consistent | Clear heading structure | Fully context-aware |
| Live audio | Not required | Transcript later | Real-time text alternative |

---

## 🎯 Tips to Integrate Accessibility from Day 1 (React.js)

1. **Use semantic HTML**:

   * Use `<button>`, `<nav>`, `<section>`, `<header>` correctly.

   * Avoid `<div>` and `<span>` for interactive elements\!

2. **Use ARIA wisely**:

   * Only **add `aria-` attributes** when semantic HTML can't handle it.

3. **Keyboard accessible components**:

   * Custom dropdowns, modals, carousels MUST be navigable with just a keyboard.

4. **Focus Management**:

   * Trap focus inside modals.

   * Return focus to the trigger element when closing.

5. **Skip Links**:

   * Add "Skip to Main Content" links at the top.

6. **Color & Text**:

   * Check your color palette early for contrast ratios.

   * Never use color as the **only** way to convey information.

7. **Form Validation**:

   * Always announce errors politely.

   * Use `aria-describedby` to link input fields with helper/error texts.

---

## 🛡️ Quick Example in React

jsx  
CopyEdit  
`// GOOD Example: Accessible button`  
`<button`  
  `onClick=\{handleClick\}`  
  `aria-label="Submit the registration form"`  
`>`  
  `Submit`  
`</button>`

jsx  
CopyEdit  
`// BAD Example: Non-semantic`  
`<div onClick=\{handleClick\}>`  
  `Submit`  
`</div>`

---

## ✨ Why Accessibility Matters

|  |  |
| ----- | ----- |
| **Moral** | It's the right thing to do. Everyone deserves access to the web. |
| **Legal** | Can avoid costly lawsuits (e.g., ADA, Section 508, EAA). |
| **SEO** | Accessible websites rank better in Google\! |
| **User Reach** | 15%+ of the world’s population has a disability. Huge audience\! |

---

## ✅ Quick Summary

* **Always aim for Level AA** by default.

* **Use automated \+ manual testing** both.

* **Design accessibly from the start** (semantic HTML, ARIA, focus management).

* **Accessibility is usability** for everyone, not just people with disabilities.

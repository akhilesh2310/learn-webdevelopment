---
title: Question Bank
sidebar_position: 1
---

# Question Bank

Mock System Design Interview

[https://careersonair.withgoogle.com/events/mock-interview-workshop/watch?talk=system-design](https://careersonair.withgoogle.com/events/mock-interview-workshop/watch?talk=system-design)

These questions assess **architecture, scalability, UX, and engineering leadership**. These will prepare you for both whiteboard/system design rounds and cross-functional discussions.

---

## **🧠 Google L6 Frontend System Design Questions (Practice List)**

### **🔹 High-Impact Application Design**

These are open-ended system design questions with strong frontend focus.

1. **Design Google Docs (collaborative editor)**

2. **Design a scalable dashboard for real-time analytics**

3. **Design YouTube’s homepage/feed UI**

4. **Design a live commenting/chat system for YouTube Live**

5. **Design a responsive and accessible calendar (like Google Calendar)**

6. **Design a file browser (like Google Drive)**

7. **Design a document viewer (PDF, images, files) with annotations**

8. **Design a responsive photo gallery with lazy loading and offline support**

9. **Design a mobile-first Progressive Web App (PWA)**

10. **Design a spreadsheet app (like Google Sheets)**

11. **Design an internal design system that supports 10+ frontend teams**

12. **Design a localization/internationalization framework across large-scale frontend apps**

---

### **🔹 Performance & Rendering-Oriented**

These evaluate your skills in optimizing large-scale frontend apps.

13. How would you design for **fast loading** and **Time to Interactive (TTI)** on low-end devices?

14. How would you build a **skeleton loader and prefetching** for dynamic content?

15. How do you handle **long lists or infinite scroll** efficiently?

16. How do you structure **lazy loading, code splitting, and hydration** in a React app?

17. How would you **measure and improve Core Web Vitals**?

---

### **🔹 Frontend Infrastructure & Tooling**

Evaluate leadership on codebase scalability and team productivity.

18. Design a **microfrontend architecture** for a multi-team product

19. How would you migrate from **monolith to microfrontends** safely?

20. How do you **enforce consistency** across frontend teams (linting, testing, CI/CD)?

21. How would you set up a **component library shared across teams**?

22. Design a **feature flag system** on the frontend

---

### **🔹 Real-Time & Collaborative Apps**

Assess CRDT/OT usage, state sync, and multi-user experience.

23. How would you enable **cursor sharing and live typing** in a shared document?

24. Design a **collaborative whiteboard** app (like Miro)

25. How would you implement **real-time notifications and toast systems**?

---

### **🔹 Scalability, Fault Tolerance, and Testing**

Explore how you'd future-proof frontend apps.

26. How would you design for **offline-first editing**?

27. How do you approach **frontend observability** (errors, performance)?

28. Design a **progressive rendering** pipeline for long documents

29. How would you **test** a mission-critical multi-user UI?

30. How would you implement **rollbacks, logging, and safe deployments** in frontend?

---

### **🔹 Leadership & Communication-Based**

Google L6 roles expect collaboration and cross-org impact.

31. How do you **align multiple frontend teams** to use a shared platform?

32. How do you influence architectural decisions when backend teams resist?

33. What tradeoffs would you consider between **UX polish vs. time to market**?

---

## **✅ Preparation Plan to Cover Them**

If you're preparing one-by-one, here’s a smart path to follow:

| Week | Focus Area | Sample Questions |
| ----- | ----- | ----- |
| 1 | Document & Dashboard Design | 1, 2, 5 |
| 2 | Real-Time & Multi-User UIs | 3, 4, 23 |
| 3 | Performance \+ Optimization | 13, 14, 16 |
| 4 | Microfrontends & Infra | 18, 19, 21 |
| 5 | Accessibility \+ PWA | 9, 12, 6 |
| 6 | Leadership & Strategy | 31, 32, 33 |
| 7 | Testing \+ Observability | 27, 29, 30 |

## **🧩 Component/System-Level Frontend Design Questions (Google L6 Focus)**

These often come up as:

“Design a reusable component/system for X that works at scale, is performant, accessible, and flexible.”

### **🔹 UI Component/System Design**

These are typically asked to test:

* Your understanding of component design patterns

* Internal state vs controlled input

* Keyboard & screen reader accessibility

* Performance for large-scale datasets

* Customizability and reusability

---

### **✅ Component-Level Design Questions:**

| Component | Follow-up Challenges |
| ----- | ----- |
| **1\. Autocomplete/Search Suggest** | Async fetching, debouncing, keyboard nav, highlighting matches, handling loading states, accessibility |
| **2\. Virtualized List/Grid** | Smooth scroll, infinite load, dynamic row height, re-rendering optimization |
| **3\. Modal/Drawer System** | Focus trap, accessibility, stacking context, body scroll locking |
| **4\. Date Picker/Calendar** | Keyboard accessibility, localization, disabled states, mobile vs desktop UX |
| **5\. Toast Notification System** | Auto-dismiss, stacking toasts, accessibility (aria-live), custom styling |
| **6\. File Upload UI** | Drag-drop, multi-file, progress bars, error handling, retries |
| **7\. Tabs/Accordion UI** | ARIA roles, keyboard interactions, controlled/uncontrolled patterns |
| **8\. Table with Pagination & Sorting** | Column resizing, virtualization, sorting/filtering, responsive design |
| **9\. Multi-Select Dropdown** | Chip UI, keyboard navigation, grouping, filtering, lazy options load |
| **10\. In-Place Editable Table** | Form state management, undo/redo, accessibility, async save feedback |
| **11\. Notification Bell Dropdown** | Real-time updates (polling/WebSocket), unread indicators, infinite scroll |
| **12\. Tooltip System** | Positioning, viewport collision detection, delay handling, mobile fallback |
| **13\. Global Search Bar** | Shortcut activation, keyboard navigation, result categorization |
| **14\. Theme Switcher / Dark Mode** | Persistence, SSR compatibility, CSS variable strategy |
| **15\. Form Builder UI** | Dynamic schema-based rendering, validation, conditional fields |

---

### **✅ System-Oriented Follow-up Scenarios:**

These simulate how you'd build a scalable and reusable *system*, not just a component:

* “Design a **global notification system** that works across microfrontends.”

* “How would you implement **autocomplete for 10M+ items** with instant response?”

* “How do you create an **accessible modal system** usable by multiple teams?”

* “How do you **test and rollout a new version** of your shared component library?”

---

### **💡 Pro Tips for Answering Component Design:**

* **Start with UX expectations:** who uses it, where, on what device

* **Discuss the API/Props**: controlled/uncontrolled, configuration flexibility

* **Accessibility matters**: ARIA, tabIndex, screen readers

* **State & side effects**: internal state vs global context

* **Styling strategy**: Tailwind, CSS modules, custom themes

* **Performance**: debouncing, memoization, virtualization

* **Reusability**: generic typing, slots/children, composability

* **Testing strategy**: Unit \+ visual regression (Storybook \+ Chromatic)

* **Versioning / rollout**: How to ship with confidence

---

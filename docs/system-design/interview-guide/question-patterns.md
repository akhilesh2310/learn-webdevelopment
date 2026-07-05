---
title: Question Patterns
sidebar_position: 7
---

# Question Patterns

For a **Staff Software Engineer (L6) – Frontend Role**, **System Design Interviews** focus on your ability to design scalable, maintainable, performant, and user-centric frontend systems. The expectation is **architect-level thinking**, balancing tradeoffs across **UX, performance, scalability, security, and maintainability**, especially at large scale.

Here’s a breakdown of the **interview question patterns**, with categories and examples tailored for L6 **Frontend System Design** interviews:

---

## Open-Ended Product/System Design Questions

These test your ability to design end-to-end systems with frontend as a key focus.

**Examples:**

* Design a **dashboard for real-time data visualization** (e.g., analytics or stock market)

* Design **Google Docs/Notion-like collaborative editing**

* Design a **video streaming platform's frontend**

* Build the **frontend architecture of a design system** for 100+ engineers

* Design the **checkout flow of an e-commerce site** (with responsiveness, accessibility, and fallbacks)

* Design **a platform like YouTube** from the frontend POV

**What they assess:**

* Product sense

* Component architecture

* Handling real-time updates

* State management and sync across clients

* Performance & responsiveness

* Web accessibility

* SSR/CSR/hydration strategies

---

## Frontend Architecture & Component Design

You’ll be asked to dive into frontend architecture details or low-level component architecture.

**Examples:**

* How would you structure a **microfrontend architecture** for a large-scale app?

* Design a **reactive state management system**

* What is your approach to **code-splitting and lazy loading**?

* How do you handle **design systems** across multiple teams?

* How would you implement **feature flags** at scale?

* Discuss the **pros and cons of monorepo vs polyrepo** for frontend teams

**What they assess:**

* Deep knowledge of scalable frontend design

* Communication with backend and design teams

* Design system ownership

* Maintenance and tech debt handling

---

## Performance Optimization Design

Expect questions about identifying and fixing performance bottlenecks.

**Examples:**

* How would you reduce the **Time to Interactive (TTI)** on a complex app?

* How would you design for **progressive rendering** or **lazy hydration**?

* How would you approach **Web Vitals** improvement on an e-commerce platform?

* Optimize a page with **infinite scroll and heavy DOM**

**What they assess:**

* Real-world performance strategies

* Browser internals awareness

* Experience with performance profiling tools

* Caching strategies, prefetching, CDNs

---

## Collaboration & Trade-off Questions

These explore your ability to lead technical direction across teams and balance trade-offs.

**Examples:**

* How would you collaborate with backend engineers on API contracts?

* What tradeoffs would you make between **SSR and CSR** in a hybrid application?

* How would you handle **accessibility vs pixel-perfect design**?

* What would you do if design and performance goals conflicted?

**What they assess:**

* Communication with cross-functional teams

* Decision-making under ambiguity

* Prioritization of scalability vs DX vs UX

---

## API + Data Flow Design

Expect detailed questions on how the frontend interacts with backend and external APIs.

**Examples:**

* How would you design a **client-side caching layer**?

* How do you deal with **graphQL over-fetching/under-fetching**?

* How would you structure the **data layer** (Redux, SWR, RTK, custom cache)?

* Describe how you would handle **partial page updates** via REST APIs

**What they assess:**

* API contract clarity

* Data fetching patterns (polling, websockets, subscriptions)

* Caching and invalidation strategies

* Error handling and fallback UI

---

## Real-Time / Collaborative Frontend Systems

These questions explore your depth in building rich, interactive systems with high complexity.

**Examples:**

* Design a **collaborative whiteboard app** (e.g., Miro, Figma)

* How would you handle **cursor movement sharing** in a real-time tool?

* How to sync data between **multiple users** editing a document?

**What they assess:**

* WebSocket handling

* CRDTs, OT basics

* Frontend consistency vs latency

* Conflict resolution strategies

---

## Tooling & Build System Design

You may be asked about how to scale frontend workflows and builds.

**Examples:**

* How would you set up a **build pipeline for a monorepo**?

* How do you ensure **consistent code quality** across 10+ frontend teams?

* What’s your approach to **incremental builds or deployment** in frontend?

**What they assess:**

* Experience with Webpack, esbuild, Vite, etc.

* CI/CD pipelines for web apps

* DX tooling and linting strategies

* Storybook, Chromatic, visual regression

---

## Scalability & Reliability

System design must be production-grade. Expect questions on:

**Examples:**

* How to ensure a **mission-critical dashboard** doesn’t crash under load?

* How would you handle **feature rollout to millions of users**?

* How do you ensure **error logging and recovery**?

**What they assess:**

* Observability (logs, metrics, tracing)

* Error boundaries

* Load testing for the frontend

* Rollback mechanisms and safe deployments

---

## Patterns & Pro Tips

| Interview Phase | What They Look For |
| ----- | ----- |
| **Initial Clarification** | Ability to define scope and ask clarifying questions |
| **High-Level Design** | Modular, scalable component/system architecture |
| **Low-Level Details** | APIs, data flow, error handling, reusability |
| **Tech Stack Decisions** | Tradeoffs for React vs Angular, GraphQL vs REST, etc. |
| **Constraints Handling** | Mobile responsiveness, performance, localization |
| **User-Centric Thinking** | UX decisions, accessibility, loading strategy |
| **Leadership** | Cross-team alignment, mentorship experience, long-term thinking |

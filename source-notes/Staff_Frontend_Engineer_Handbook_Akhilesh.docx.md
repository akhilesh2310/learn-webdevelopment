# **Staff Frontend Engineer Handbook**

## *Web Development Lifecycle, Frontend Platform, Release Engineering, Observability, Performance, Security, and Staff-Level Interview Vocabulary*

Prepared for Akhilesh Bamhore | Staff Frontend / UI Architect / Frontend Platform interviews

**Purpose:** This handbook is a compact, structured revision guide covering approximately 300+ engineering concepts from planning to production. It is designed to help you recall the right words in interviews and connect them to real engineering decisions.

**How to revise:** Read by lifecycle order. For every concept, practice a 30-second answer: definition, problem solved, when to use it, trade-offs, metrics, rollback, and one real project example.

**Coverage:** 16 modules and 340 topics, plus project examples and interview templates.

# **How to answer any concept in a Staff interview**

**•** 1\. Define the term in one or two simple lines.

**•** 2\. Explain the problem it solves.

**•** 3\. Mention when you would use it and when you would avoid it.

**•** 4\. Cover trade-offs, risks, and failure modes.

**•** 5\. Explain rollout, monitoring, and rollback where relevant.

**•** 6\. Tie the answer to a real example from your project experience.

# **Reusable project examples from your experience**

**• Legacy UI/API decoupling:** Use a strangler approach: keep the legacy app running, create API contracts, introduce BFF where needed, move one module at a time, and route selected paths or users to the new UI.

**• Microfrontend migration:** Split the monolithic UI into domain-based modules, keep a shell app for navigation/auth/composition, use Module Federation or Single-SPA, and monitor shared dependency/versioning risk.

**• GraphQL reporting:** Use GraphQL when dashboards need flexible data composition and over-fetching is high. Keep schema ownership, authorization, query complexity, and caching in mind.

**• Ephemeral E2E environments:** Run Cypress smoke/regression flows against isolated seeded environments per PR to avoid test data collisions and improve confidence before merge.

**• Component library with Storybook:** Document states, variants, accessibility notes, design tokens, usage guidelines, and versioning rules so teams consume components consistently.

**• Performance optimization:** Measure first, identify bottlenecks, then optimize data loading, rendering, bundle size, table virtualization/progressive rendering, and Core Web Vitals.

**• CI/CD optimization:** Use Docker caching, multi-stage builds, affected builds, reusable workflows, artifact promotion, and deployment automation to reduce pipeline time and risk.

# **Topic Index**

**1\. Planning & Discovery:** Business Requirements, Functional Requirements, Non-Functional Requirements (NFRs), User Story, Acceptance Criteria, Epic, Backlog Grooming, Prioritization, Stakeholder Mapping, Impact Analysis, Risk Analysis, Assumptions, Constraints, Dependencies, Scope Creep, Spike, Proof of Concept (PoC), RFC, ADR, Capacity Planning

**2\. Architecture Patterns & Migration:** High-Level Design (HLD), Low-Level Design (LLD), Architecture Diagram, Domain Modeling, Bounded Context, Monolith, Modular Monolith, Microservices, Microfrontends, Layered Architecture, Clean Architecture, Hexagonal Architecture, Backend for Frontend (BFF), API Gateway, Service Mesh, Event-Driven Architecture, Pub/Sub, CQRS, Event Sourcing, Strangler Pattern

**3\. Frontend Architecture & Rendering:** Single Page Application (SPA), Multi Page Application (MPA), Client-Side Rendering (CSR), Server-Side Rendering (SSR), Static Site Generation (SSG), Incremental Static Regeneration (ISR), Hydration, Progressive Hydration, Streaming, Islands Architecture, Routing, Route-Based Code Splitting, Shell/Container App, Remote Module, Shared Dependencies, Design Tokens, Theming, Accessibility-First Architecture, Internationalization (i18n), Progressive Enhancement

**4\. React & Next.js:** React Components, Props, State, Controlled Components, Uncontrolled Components, Hooks, useState, useEffect, useMemo, useCallback, useRef, useReducer, Context API, Error Boundaries, Suspense, Lazy Loading, React.memo, Reconciliation, Virtual DOM, Fiber, Concurrent Rendering, Server Components, Client Components, Next.js App Router, Metadata API

**5\. JavaScript Core:** Execution Context, Call Stack, Scope, Lexical Scope, Closure, Hoisting, Temporal Dead Zone (TDZ), this Binding, Prototype Chain, Classes, Event Loop, Microtasks, Macrotasks, Promise, async/await, Generator, Iterator, ES Modules, Memory Leak, Garbage Collection

**6\. TypeScript & Code Quality:** Static Typing, Type Inference, Interface, Type Alias, Union Types, Intersection Types, Generics, Utility Types, Mapped Types, Conditional Types, Discriminated Union, Type Guards, never, unknown, any, Strict Mode, ESLint, Prettier, SonarQube, Code Smell

**7\. API Design & Integration:** REST, GraphQL, gRPC, OpenAPI/Swagger, API Contract, Contract-First Design, API Versioning, Pagination, Offset Pagination, Cursor Pagination, Filtering and Sorting, Error Model, Request Validation, Response Normalization, Idempotency, Rate Limiting, Retry, Exponential Backoff, Circuit Breaker, Webhook

**8\. State, Data Fetching & Caching:** Client State, Server State, Global State, Local Component State, Derived State, Redux, Redux Toolkit (RTK), Context API, Zustand, React Query, RTK Query, SWR, Cache Invalidation, Optimistic Updates, Pessimistic Updates, Normalized Store, Selectors, Middleware, Persistence, Offline Support

**9\. Testing & Quality Engineering:** Test Pyramid, Unit Testing, Integration Testing, End-to-End Testing, Component Testing, Contract Testing, Smoke Testing, Sanity Testing, Regression Testing, Visual Regression Testing, Snapshot Testing, Accessibility Testing, Performance Testing, Load Testing, Stress Testing, Chaos Testing, Mocking, Stubbing, Spying, Fake Timers, MSW, Jest/Vitest, React Testing Library, Cypress, Playwright

**10\. CI/CD, Build & Tooling:** Continuous Integration (CI), Continuous Delivery, Continuous Deployment, Pipeline, Build Artifact, Docker Image, Image Registry, Multi-Stage Docker Build, Dependency Caching, Monorepo Builds, Nx Affected, Turborepo Cache, Semantic Versioning, Changesets, Release Notes, GitHub Actions, Jenkins, Helm Chart, Kubernetes Namespace, Artifact Promotion

**11\. Deployment & Release Strategies:** Rolling Deployment, Canary Deployment, Blue-Green Deployment, Feature Flag Rollout, Dark Launch, A/B Testing, Shadow Traffic, Traffic Splitting, Zero-Downtime Deployment, Rollback, Roll Forward, Immutable Deployment, Environment Promotion, Production Readiness Checklist, Release Train, Hotfix, Kill Switch, Backward Compatibility, Database Migration, API Compatibility

**12\. Infrastructure, Scalability & Reliability:** CDN, Reverse Proxy, NGINX, Load Balancer, API Gateway, Edge Computing, Horizontal Scaling, Vertical Scaling, Auto Scaling, Kubernetes Ingress, Service Discovery, Health Check, Readiness Probe, Liveness Probe, Timeout, Bulkhead, Failover, Disaster Recovery, RTO, RPO

**13\. Web Performance & Core Web Vitals:** Core Web Vitals, Largest Contentful Paint (LCP), Interaction to Next Paint (INP), Cumulative Layout Shift (CLS), Time to First Byte (TTFB), First Contentful Paint (FCP), Bundle Size, Tree Shaking, Code Splitting, Lazy Loading, Preload, Prefetch, Brotli/Gzip, Image Optimization, Font Optimization, Virtualization, Memoization, Web Workers, Service Workers, Lighthouse

**14\. Security & Privacy:** Authentication, Authorization, OAuth2, OIDC, JWT, Refresh Token, Session Cookie, SameSite Cookie, Secure/HttpOnly Cookie, LocalStorage Risk, XSS, CSRF, CORS, CSP, HSTS, Clickjacking, SQL Injection, Dependency Vulnerability, Secrets Management, PII Handling

**15\. Observability & Production Operations:** Observability, Monitoring, Logging, Metrics, Distributed Tracing, APM, RUM, Synthetic Monitoring, Sentry, Prometheus, Grafana, ELK, OpenTelemetry, Alerting, Dashboard, SLI, SLO, SLA, Error Budget, Incident Postmortem

**16\. Platform Engineering, Design Systems & Staff Leadership:** Internal Developer Platform, Golden Path, Self-Service, Scaffolding, Internal CLI, Design System, Component Library, Storybook, Component API Design, Accessibility Standards, Versioned Packages, Backward Compatibility, Deprecation Policy, Governance Model, Developer Experience (DX), Documentation, Ownership Model, Technical Roadmap, Architecture Review, Build vs Buy, Technical Debt, Migration Strategy, Stakeholder Alignment, Influence Without Authority, Mentoring, Decision Log, Engineering Metrics, Cost Optimization, Incident Leadership, Platform Adoption

# **1\. Planning & Discovery**

Before implementation, Staff engineers clarify what problem is being solved, what success means, what risks exist, and how teams will make decisions.

**Staff mental model:** connect this to scope clarity, risk reduction, success metrics, and stakeholder alignment.

## **Concepts**

**1.1. Business Requirements**

**What:** Business needs or outcomes the product must support, such as revenue, adoption, compliance, or operational efficiency.

**Interview hook:** Mention Business Requirements when discussing planning & discovery decisions, and explain trade-offs, risk, ownership, and measurable impact.

**1.2. Functional Requirements**

**What:** Specific behaviors the system must provide, such as search, login, reporting, export, filtering, or approval workflows.

**Interview hook:** Mention Functional Requirements when discussing planning & discovery decisions, and explain trade-offs, risk, ownership, and measurable impact.

**1.3. Non-Functional Requirements (NFRs)**

**What:** Quality attributes like performance, reliability, scalability, accessibility, privacy, security, maintainability, and cost.

**Interview hook:** Mention Non-Functional Requirements (NFRs) when discussing planning & discovery decisions, and explain trade-offs, risk, ownership, and measurable impact.

**1.4. User Story**

**What:** A small requirement framed from a user perspective, usually describing who needs what and why.

**Interview hook:** Mention User Story when discussing planning & discovery decisions, and explain trade-offs, risk, ownership, and measurable impact.

**1.5. Acceptance Criteria**

**What:** Clear conditions that define when a story is complete and testable.

**Interview hook:** Mention Acceptance Criteria when discussing planning & discovery decisions, and explain trade-offs, risk, ownership, and measurable impact.

**1.6. Epic**

**What:** A larger body of work broken into multiple stories, usually spanning several iterations or teams.

**Interview hook:** Mention Epic when discussing planning & discovery decisions, and explain trade-offs, risk, ownership, and measurable impact.

**1.7. Backlog Grooming**

**What:** The process of refining, estimating, splitting, and prioritizing future work.

**Interview hook:** Mention Backlog Grooming when discussing planning & discovery decisions, and explain trade-offs, risk, ownership, and measurable impact.

**1.8. Prioritization**

**What:** Choosing what to build first based on impact, risk, effort, urgency, and dependencies.

**Interview hook:** Mention Prioritization when discussing planning & discovery decisions, and explain trade-offs, risk, ownership, and measurable impact.

**1.9. Stakeholder Mapping**

**What:** Identifying decision makers, users, dependent teams, and people impacted by the change.

**Interview hook:** Mention Stakeholder Mapping when discussing planning & discovery decisions, and explain trade-offs, risk, ownership, and measurable impact.

**1.10. Impact Analysis**

**What:** Understanding which systems, teams, users, flows, data models, and operational processes will be affected.

**Interview hook:** Mention Impact Analysis when discussing planning & discovery decisions, and explain trade-offs, risk, ownership, and measurable impact.

**1.11. Risk Analysis**

**What:** Identifying failure modes, rollout risks, security risks, performance risks, and mitigation plans before delivery.

**Interview hook:** Mention Risk Analysis when discussing planning & discovery decisions, and explain trade-offs, risk, ownership, and measurable impact.

**1.12. Assumptions**

**What:** Things treated as true until validated, such as expected traffic, API behavior, user permissions, or data availability.

**Interview hook:** Mention Assumptions when discussing planning & discovery decisions, and explain trade-offs, risk, ownership, and measurable impact.

**1.13. Constraints**

**What:** Known limits such as timeline, platform restrictions, legacy dependencies, compliance needs, or budget.

**Interview hook:** Mention Constraints when discussing planning & discovery decisions, and explain trade-offs, risk, ownership, and measurable impact.

**1.14. Dependencies**

**What:** External teams, APIs, libraries, infrastructure, approvals, or data sources required to deliver a feature.

**Interview hook:** Mention Dependencies when discussing planning & discovery decisions, and explain trade-offs, risk, ownership, and measurable impact.

**1.15. Scope Creep**

**What:** Uncontrolled growth of requirements after work starts, usually increasing risk and timeline.

**Interview hook:** Mention Scope Creep when discussing planning & discovery decisions, and explain trade-offs, risk, ownership, and measurable impact.

**1.16. Spike**

**What:** A time-boxed technical investigation to reduce uncertainty before committing to implementation.

**Interview hook:** Mention Spike when discussing planning & discovery decisions, and explain trade-offs, risk, ownership, and measurable impact.

**1.17. Proof of Concept (PoC)**

**What:** A small build used to prove feasibility, not necessarily production quality.

**Interview hook:** Mention Proof of Concept (PoC) when discussing planning & discovery decisions, and explain trade-offs, risk, ownership, and measurable impact.

**1.18. RFC**

**What:** A written proposal used to gather feedback before making an important technical decision.

**Interview hook:** Mention RFC when discussing planning & discovery decisions, and explain trade-offs, risk, ownership, and measurable impact.

**1.19. ADR**

**What:** Architecture Decision Record, a lightweight document capturing a decision, context, options, and consequences.

**Interview hook:** Mention ADR when discussing planning & discovery decisions, and explain trade-offs, risk, ownership, and measurable impact.

**1.20. Capacity Planning**

**What:** Estimating traffic, team bandwidth, infrastructure needs, and operational capacity before scaling or launch.

**Interview hook:** Mention Capacity Planning when discussing planning & discovery decisions, and explain trade-offs, risk, ownership, and measurable impact.

## **Common interview questions**

**•** How do you clarify vague requirements before implementation?

**•** How do you identify NFRs for a frontend platform?

**•** How do you handle scope creep?

**•** When would you run a spike or PoC?

**•** What do you document in an ADR?

# **2\. Architecture Patterns & Migration**

Architecture is about boundaries, ownership, deployment independence, coupling, and evolution. Staff-level answers should show trade-offs, not just names.

**Staff mental model:** discuss boundaries, coupling, ownership, deployment independence, migration risk, and trade-offs.

## **Concepts**

**2.1. High-Level Design (HLD)**

**What:** A system-level design showing major components, data flow, dependencies, and deployment boundaries.

**Interview hook:** Mention High-Level Design (HLD) when discussing architecture patterns & migration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**2.2. Low-Level Design (LLD)**

**What:** A detailed design of modules, classes, interfaces, APIs, data models, and edge cases.

**Interview hook:** Mention Low-Level Design (LLD) when discussing architecture patterns & migration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**2.3. Architecture Diagram**

**What:** A visual representation of components, relationships, traffic flow, deployment, and ownership boundaries.

**Interview hook:** Mention Architecture Diagram when discussing architecture patterns & migration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**2.4. Domain Modeling**

**What:** Representing business concepts, relationships, rules, and workflows in the system design.

**Interview hook:** Mention Domain Modeling when discussing architecture patterns & migration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**2.5. Bounded Context**

**What:** A domain boundary where a model has a clear meaning and ownership, reducing cross-team ambiguity.

**Interview hook:** Mention Bounded Context when discussing architecture patterns & migration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**2.6. Monolith**

**What:** A single deployable application where UI, business logic, and data access may be tightly connected.

**Interview hook:** Mention Monolith when discussing architecture patterns & migration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**2.7. Modular Monolith**

**What:** A monolith organized into strong internal modules, improving maintainability without distributed-system complexity.

**Interview hook:** Mention Modular Monolith when discussing architecture patterns & migration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**2.8. Microservices**

**What:** Backend architecture where business capabilities are split into independently deployable services.

**Interview hook:** Mention Microservices when discussing architecture patterns & migration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**2.9. Microfrontends**

**What:** Frontend architecture where UI features are split into independently owned and deployable applications.

**Interview hook:** Mention Microfrontends when discussing architecture patterns & migration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**2.10. Layered Architecture**

**What:** A design that separates concerns into layers such as UI, business logic, service, and data access.

**Interview hook:** Mention Layered Architecture when discussing architecture patterns & migration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**2.11. Clean Architecture**

**What:** A design approach where business rules stay independent of frameworks, UI, and infrastructure.

**Interview hook:** Mention Clean Architecture when discussing architecture patterns & migration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**2.12. Hexagonal Architecture**

**What:** An architecture that isolates core business logic from external systems using ports and adapters.

**Interview hook:** Mention Hexagonal Architecture when discussing architecture patterns & migration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**2.13. Backend for Frontend (BFF)**

**What:** A backend layer tailored to frontend needs, aggregating and transforming APIs for a specific UI.

**Interview hook:** Mention Backend for Frontend (BFF) when discussing architecture patterns & migration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**2.14. API Gateway**

**What:** A centralized entry point for routing, authentication, rate limiting, observability, and policy enforcement.

**Interview hook:** Mention API Gateway when discussing architecture patterns & migration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**2.15. Service Mesh**

**What:** Infrastructure layer for service-to-service traffic management, security, retries, telemetry, and routing.

**Interview hook:** Mention Service Mesh when discussing architecture patterns & migration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**2.16. Event-Driven Architecture**

**What:** A design where services communicate through events instead of direct synchronous calls.

**Interview hook:** Mention Event-Driven Architecture when discussing architecture patterns & migration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**2.17. Pub/Sub**

**What:** A messaging pattern where publishers emit messages and subscribers consume them independently.

**Interview hook:** Mention Pub/Sub when discussing architecture patterns & migration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**2.18. CQRS**

**What:** Command Query Responsibility Segregation, separating write models from read models for scalability and clarity.

**Interview hook:** Mention CQRS when discussing architecture patterns & migration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**2.19. Event Sourcing**

**What:** Persisting state as a sequence of events rather than only storing the latest state.

**Interview hook:** Mention Event Sourcing when discussing architecture patterns & migration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**2.20. Strangler Pattern**

**What:** A migration pattern where legacy functionality is replaced gradually by routing selected parts to a new system.

**Interview hook:** Mention Strangler Pattern when discussing architecture patterns & migration decisions, and explain trade-offs, risk, ownership, and measurable impact.

## **Common interview questions**

**•** How would you decouple a legacy UI and API?

**•** Monolith vs modular monolith vs microservices?

**•** When would you use BFF?

**•** How do you migrate safely using the strangler pattern?

**•** What are the risks of microfrontends?

# **3\. Frontend Architecture & Rendering**

Frontend architecture decisions affect load time, SEO, team ownership, release independence, and long-term maintainability.

**Staff mental model:** discuss boundaries, coupling, ownership, deployment independence, migration risk, and trade-offs.

## **Concepts**

**3.1. Single Page Application (SPA)**

**What:** A web app where routing and rendering happen mainly in the browser after an initial page load.

**Interview hook:** Mention Single Page Application (SPA) when discussing frontend architecture & rendering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**3.2. Multi Page Application (MPA)**

**What:** A web app where the server returns a new page for most navigation events.

**Interview hook:** Mention Multi Page Application (MPA) when discussing frontend architecture & rendering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**3.3. Client-Side Rendering (CSR)**

**What:** Rendering UI in the browser using JavaScript after downloading the application bundle.

**Interview hook:** Mention Client-Side Rendering (CSR) when discussing frontend architecture & rendering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**3.4. Server-Side Rendering (SSR)**

**What:** Rendering HTML on the server for each request, improving first load and SEO for dynamic pages.

**Interview hook:** Mention Server-Side Rendering (SSR) when discussing frontend architecture & rendering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**3.5. Static Site Generation (SSG)**

**What:** Generating HTML at build time for fast, cacheable pages.

**Interview hook:** Mention Static Site Generation (SSG) when discussing frontend architecture & rendering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**3.6. Incremental Static Regeneration (ISR)**

**What:** Regenerating static pages after deployment based on time or demand, common in Next.js.

**Interview hook:** Mention Incremental Static Regeneration (ISR) when discussing frontend architecture & rendering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**3.7. Hydration**

**What:** The browser attaches JavaScript behavior to server-rendered HTML so the UI becomes interactive.

**Interview hook:** Mention Hydration when discussing frontend architecture & rendering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**3.8. Progressive Hydration**

**What:** Hydrating parts of the page gradually instead of making the whole page interactive at once.

**Interview hook:** Mention Progressive Hydration when discussing frontend architecture & rendering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**3.9. Streaming**

**What:** Sending HTML or data progressively to the client so users see useful content sooner.

**Interview hook:** Mention Streaming when discussing frontend architecture & rendering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**3.10. Islands Architecture**

**What:** Rendering mostly static pages with isolated interactive components, reducing JavaScript shipped to users.

**Interview hook:** Mention Islands Architecture when discussing frontend architecture & rendering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**3.11. Routing**

**What:** Mapping URLs to application screens, layouts, data loading, and navigation behavior.

**Interview hook:** Mention Routing when discussing frontend architecture & rendering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**3.12. Route-Based Code Splitting**

**What:** Splitting JavaScript by routes so users download code only for the screen they visit.

**Interview hook:** Mention Route-Based Code Splitting when discussing frontend architecture & rendering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**3.13. Shell/Container App**

**What:** The host application that owns layout, navigation, authentication context, and composition of microfrontends.

**Interview hook:** Mention Shell/Container App when discussing frontend architecture & rendering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**3.14. Remote Module**

**What:** A separately built and deployed frontend module loaded by a shell, commonly through Module Federation.

**Interview hook:** Mention Remote Module when discussing frontend architecture & rendering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**3.15. Shared Dependencies**

**What:** Libraries reused across applications, such as React, design system packages, utilities, or analytics SDKs.

**Interview hook:** Mention Shared Dependencies when discussing frontend architecture & rendering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**3.16. Design Tokens**

**What:** Named design values such as color, spacing, typography, radius, and elevation shared across platforms.

**Interview hook:** Mention Design Tokens when discussing frontend architecture & rendering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**3.17. Theming**

**What:** The ability to switch visual styles, brands, or modes while reusing the same component architecture.

**Interview hook:** Mention Theming when discussing frontend architecture & rendering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**3.18. Accessibility-First Architecture**

**What:** Designing components, routing, focus handling, and testing so accessibility is built in by default.

**Interview hook:** Mention Accessibility-First Architecture when discussing frontend architecture & rendering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**3.19. Internationalization (i18n)**

**What:** Preparing an application for multiple languages, date formats, currencies, directions, and locale rules.

**Interview hook:** Mention Internationalization (i18n) when discussing frontend architecture & rendering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**3.20. Progressive Enhancement**

**What:** Building a baseline experience first, then enhancing with JavaScript and advanced browser capabilities.

**Interview hook:** Mention Progressive Enhancement when discussing frontend architecture & rendering decisions, and explain trade-offs, risk, ownership, and measurable impact.

## **Common interview questions**

**•** CSR vs SSR vs SSG?

**•** How do you decide rendering strategy in Next.js?

**•** How do you split frontend apps by route or domain?

**•** How do you share dependencies across microfrontends?

**•** How do you design for accessibility from the start?

# **4\. React & Next.js**

For Staff frontend roles, React knowledge should cover component design, rendering behavior, data boundaries, performance, and maintainability.

**Staff mental model:** explain not only how it works, but when it creates maintainability or performance trade-offs.

## **Concepts**

**4.1. React Components**

**What:** Reusable UI building blocks that receive inputs and return a description of the UI.

**Interview hook:** Mention React Components when discussing react & next.js decisions, and explain trade-offs, risk, ownership, and measurable impact.

**4.2. Props**

**What:** Inputs passed from parent components to child components; they should usually be treated as immutable.

**Interview hook:** Mention Props when discussing react & next.js decisions, and explain trade-offs, risk, ownership, and measurable impact.

**4.3. State**

**What:** Data owned by a component or store that can change over time and trigger re-rendering.

**Interview hook:** Mention State when discussing react & next.js decisions, and explain trade-offs, risk, ownership, and measurable impact.

**4.4. Controlled Components**

**What:** Form elements whose value is controlled by React state.

**Interview hook:** Mention Controlled Components when discussing react & next.js decisions, and explain trade-offs, risk, ownership, and measurable impact.

**4.5. Uncontrolled Components**

**What:** Form elements where the DOM keeps the current value, usually accessed through refs.

**Interview hook:** Mention Uncontrolled Components when discussing react & next.js decisions, and explain trade-offs, risk, ownership, and measurable impact.

**4.6. Hooks**

**What:** Functions that let React components use state, lifecycle behavior, refs, and other React features.

**Interview hook:** Mention Hooks when discussing react & next.js decisions, and explain trade-offs, risk, ownership, and measurable impact.

**4.7. useState**

**What:** A hook for local component state that triggers re-rendering when updated.

**Interview hook:** Mention useState when discussing react & next.js decisions, and explain trade-offs, risk, ownership, and measurable impact.

**4.8. useEffect**

**What:** A hook for synchronizing with external systems such as APIs, subscriptions, timers, or DOM APIs.

**Interview hook:** Mention useEffect when discussing react & next.js decisions, and explain trade-offs, risk, ownership, and measurable impact.

**4.9. useMemo**

**What:** A hook that memoizes expensive computed values between renders when dependencies do not change.

**Interview hook:** Mention useMemo when discussing react & next.js decisions, and explain trade-offs, risk, ownership, and measurable impact.

**4.10. useCallback**

**What:** A hook that memoizes function references, often used with memoized children or dependency arrays.

**Interview hook:** Mention useCallback when discussing react & next.js decisions, and explain trade-offs, risk, ownership, and measurable impact.

**4.11. useRef**

**What:** A hook that stores mutable values without causing re-rendering, often used for DOM references.

**Interview hook:** Mention useRef when discussing react & next.js decisions, and explain trade-offs, risk, ownership, and measurable impact.

**4.12. useReducer**

**What:** A hook for managing complex local state transitions using reducer-style actions.

**Interview hook:** Mention useReducer when discussing react & next.js decisions, and explain trade-offs, risk, ownership, and measurable impact.

**4.13. Context API**

**What:** A React mechanism to pass data through the component tree without prop drilling.

**Interview hook:** Mention Context API when discussing react & next.js decisions, and explain trade-offs, risk, ownership, and measurable impact.

**4.14. Error Boundaries**

**What:** React components that catch render-time errors in child trees and display fallback UI.

**Interview hook:** Mention Error Boundaries when discussing react & next.js decisions, and explain trade-offs, risk, ownership, and measurable impact.

**4.15. Suspense**

**What:** A React mechanism for showing fallback UI while code or data dependencies are loading.

**Interview hook:** Mention Suspense when discussing react & next.js decisions, and explain trade-offs, risk, ownership, and measurable impact.

**4.16. Lazy Loading**

**What:** Loading components only when needed, often using React.lazy and dynamic imports.

**Interview hook:** Mention Lazy Loading when discussing react & next.js decisions, and explain trade-offs, risk, ownership, and measurable impact.

**4.17. React.memo**

**What:** A higher-order component that skips re-rendering when props are shallowly equal.

**Interview hook:** Mention React.memo when discussing react & next.js decisions, and explain trade-offs, risk, ownership, and measurable impact.

**4.18. Reconciliation**

**What:** React's process of comparing old and new element trees to decide what changed.

**Interview hook:** Mention Reconciliation when discussing react & next.js decisions, and explain trade-offs, risk, ownership, and measurable impact.

**4.19. Virtual DOM**

**What:** An in-memory representation of UI that React uses to calculate efficient updates.

**Interview hook:** Mention Virtual DOM when discussing react & next.js decisions, and explain trade-offs, risk, ownership, and measurable impact.

**4.20. Fiber**

**What:** React's internal architecture for scheduling, prioritizing, and interrupting rendering work.

**Interview hook:** Mention Fiber when discussing react & next.js decisions, and explain trade-offs, risk, ownership, and measurable impact.

**4.21. Concurrent Rendering**

**What:** React's ability to prepare multiple UI updates without blocking urgent user interactions.

**Interview hook:** Mention Concurrent Rendering when discussing react & next.js decisions, and explain trade-offs, risk, ownership, and measurable impact.

**4.22. Server Components**

**What:** React components that render on the server and do not ship their JavaScript to the client.

**Interview hook:** Mention Server Components when discussing react & next.js decisions, and explain trade-offs, risk, ownership, and measurable impact.

**4.23. Client Components**

**What:** React components that run in the browser and can use state, effects, refs, and event handlers.

**Interview hook:** Mention Client Components when discussing react & next.js decisions, and explain trade-offs, risk, ownership, and measurable impact.

**4.24. Next.js App Router**

**What:** Next.js routing model based on the app directory, layouts, server components, and nested routes.

**Interview hook:** Mention Next.js App Router when discussing react & next.js decisions, and explain trade-offs, risk, ownership, and measurable impact.

**4.25. Metadata API**

**What:** Next.js API for defining title, description, Open Graph, and other SEO-related metadata.

**Interview hook:** Mention Metadata API when discussing react & next.js decisions, and explain trade-offs, risk, ownership, and measurable impact.

## **Common interview questions**

**•** Explain React reconciliation and Fiber.

**•** When should a component be server-side or client-side?

**•** React.memo vs useMemo vs useCallback?

**•** How do you prevent unnecessary renders?

**•** How do error boundaries work?

# **5\. JavaScript Core**

JavaScript fundamentals matter because most frontend performance, bugs, async behavior, and interview coding rounds depend on them.

**Staff mental model:** use it to reason about async bugs, rendering delays, memory issues, and coding-round correctness.

## **Concepts**

**5.1. Execution Context**

**What:** The environment where JavaScript code runs, including variables, functions, scope, and this binding.

**Interview hook:** Mention Execution Context when discussing javascript core decisions, and explain trade-offs, risk, ownership, and measurable impact.

**5.2. Call Stack**

**What:** The stack structure JavaScript uses to track currently executing function calls.

**Interview hook:** Mention Call Stack when discussing javascript core decisions, and explain trade-offs, risk, ownership, and measurable impact.

**5.3. Scope**

**What:** The area where variables and functions are accessible.

**Interview hook:** Mention Scope when discussing javascript core decisions, and explain trade-offs, risk, ownership, and measurable impact.

**5.4. Lexical Scope**

**What:** Scope determined by where code is written, not where functions are called.

**Interview hook:** Mention Lexical Scope when discussing javascript core decisions, and explain trade-offs, risk, ownership, and measurable impact.

**5.5. Closure**

**What:** A function retaining access to variables from its outer lexical scope after that scope has executed.

**Interview hook:** Mention Closure when discussing javascript core decisions, and explain trade-offs, risk, ownership, and measurable impact.

**5.6. Hoisting**

**What:** JavaScript's behavior of processing declarations before execution, with different behavior for var, let, const, and functions.

**Interview hook:** Mention Hoisting when discussing javascript core decisions, and explain trade-offs, risk, ownership, and measurable impact.

**5.7. Temporal Dead Zone (TDZ)**

**What:** The period where let or const variables exist but cannot be accessed before initialization.

**Interview hook:** Mention Temporal Dead Zone (TDZ) when discussing javascript core decisions, and explain trade-offs, risk, ownership, and measurable impact.

**5.8. this Binding**

**What:** The value of this depends on how a function is called, except for arrow functions which capture lexical this.

**Interview hook:** Mention this Binding when discussing javascript core decisions, and explain trade-offs, risk, ownership, and measurable impact.

**5.9. Prototype Chain**

**What:** JavaScript's inheritance mechanism where objects delegate property lookup to their prototypes.

**Interview hook:** Mention Prototype Chain when discussing javascript core decisions, and explain trade-offs, risk, ownership, and measurable impact.

**5.10. Classes**

**What:** Syntactic sugar over prototypes for creating constructor-based object patterns.

**Interview hook:** Mention Classes when discussing javascript core decisions, and explain trade-offs, risk, ownership, and measurable impact.

**5.11. Event Loop**

**What:** The runtime mechanism that coordinates call stack, tasks, microtasks, rendering, and async callbacks.

**Interview hook:** Mention Event Loop when discussing javascript core decisions, and explain trade-offs, risk, ownership, and measurable impact.

**5.12. Microtasks**

**What:** High-priority async callbacks such as promise reactions that run before the next macrotask.

**Interview hook:** Mention Microtasks when discussing javascript core decisions, and explain trade-offs, risk, ownership, and measurable impact.

**5.13. Macrotasks**

**What:** Task queue callbacks such as timers, events, and network callbacks handled by the event loop.

**Interview hook:** Mention Macrotasks when discussing javascript core decisions, and explain trade-offs, risk, ownership, and measurable impact.

**5.14. Promise**

**What:** An object representing a future value or failure from an asynchronous operation.

**Interview hook:** Mention Promise when discussing javascript core decisions, and explain trade-offs, risk, ownership, and measurable impact.

**5.15. async/await**

**What:** Syntax for writing promise-based asynchronous code in a more synchronous-looking style.

**Interview hook:** Mention async/await when discussing javascript core decisions, and explain trade-offs, risk, ownership, and measurable impact.

**5.16. Generator**

**What:** A function that can pause and resume execution using yield.

**Interview hook:** Mention Generator when discussing javascript core decisions, and explain trade-offs, risk, ownership, and measurable impact.

**5.17. Iterator**

**What:** An object that defines a next method and returns sequential values.

**Interview hook:** Mention Iterator when discussing javascript core decisions, and explain trade-offs, risk, ownership, and measurable impact.

**5.18. ES Modules**

**What:** The standard JavaScript module system using import and export.

**Interview hook:** Mention ES Modules when discussing javascript core decisions, and explain trade-offs, risk, ownership, and measurable impact.

**5.19. Memory Leak**

**What:** Memory that is no longer needed but remains referenced, preventing garbage collection.

**Interview hook:** Mention Memory Leak when discussing javascript core decisions, and explain trade-offs, risk, ownership, and measurable impact.

**5.20. Garbage Collection**

**What:** Automatic memory management that reclaims unreachable objects.

**Interview hook:** Mention Garbage Collection when discussing javascript core decisions, and explain trade-offs, risk, ownership, and measurable impact.

## **Common interview questions**

**•** Explain closures with a practical example.

**•** What is TDZ and why does closure not bypass it?

**•** Explain event loop, microtasks, and macrotasks.

**•** What causes memory leaks in frontend apps?

**•** How does this binding work?

# **6\. TypeScript & Code Quality**

TypeScript and code quality practices reduce runtime defects, improve team velocity, and make large frontend systems safer to evolve.

**Staff mental model:** show how types and quality gates prevent defects across large teams and shared packages.

## **Concepts**

**6.1. Static Typing**

**What:** Checking types before runtime so many defects are caught during development or CI.

**Interview hook:** Mention Static Typing when discussing typescript & code quality decisions, and explain trade-offs, risk, ownership, and measurable impact.

**6.2. Type Inference**

**What:** TypeScript automatically determining types based on assigned values and usage.

**Interview hook:** Mention Type Inference when discussing typescript & code quality decisions, and explain trade-offs, risk, ownership, and measurable impact.

**6.3. Interface**

**What:** A TypeScript structure describing the shape of objects and contracts.

**Interview hook:** Mention Interface when discussing typescript & code quality decisions, and explain trade-offs, risk, ownership, and measurable impact.

**6.4. Type Alias**

**What:** A named type definition that can represent primitives, unions, intersections, objects, or functions.

**Interview hook:** Mention Type Alias when discussing typescript & code quality decisions, and explain trade-offs, risk, ownership, and measurable impact.

**6.5. Union Types**

**What:** A value that can be one of multiple types, such as string or number.

**Interview hook:** Mention Union Types when discussing typescript & code quality decisions, and explain trade-offs, risk, ownership, and measurable impact.

**6.6. Intersection Types**

**What:** A type combining multiple types into one value requiring all properties.

**Interview hook:** Mention Intersection Types when discussing typescript & code quality decisions, and explain trade-offs, risk, ownership, and measurable impact.

**6.7. Generics**

**What:** Reusable type parameters that make functions, components, and utilities type-safe across many shapes.

**Interview hook:** Mention Generics when discussing typescript & code quality decisions, and explain trade-offs, risk, ownership, and measurable impact.

**6.8. Utility Types**

**What:** Built-in helpers like Partial, Pick, Omit, Record, Required, and ReturnType.

**Interview hook:** Mention Utility Types when discussing typescript & code quality decisions, and explain trade-offs, risk, ownership, and measurable impact.

**6.9. Mapped Types**

**What:** Types created by transforming properties of another type.

**Interview hook:** Mention Mapped Types when discussing typescript & code quality decisions, and explain trade-offs, risk, ownership, and measurable impact.

**6.10. Conditional Types**

**What:** Types that choose one branch or another based on type relationships.

**Interview hook:** Mention Conditional Types when discussing typescript & code quality decisions, and explain trade-offs, risk, ownership, and measurable impact.

**6.11. Discriminated Union**

**What:** A union type where each variant has a common literal field used for safe narrowing.

**Interview hook:** Mention Discriminated Union when discussing typescript & code quality decisions, and explain trade-offs, risk, ownership, and measurable impact.

**6.12. Type Guards**

**What:** Runtime checks that help TypeScript narrow a value to a more specific type.

**Interview hook:** Mention Type Guards when discussing typescript & code quality decisions, and explain trade-offs, risk, ownership, and measurable impact.

**6.13. never**

**What:** A type representing values that should never occur, useful for exhaustive checks.

**Interview hook:** Mention never when discussing typescript & code quality decisions, and explain trade-offs, risk, ownership, and measurable impact.

**6.14. unknown**

**What:** A safer alternative to any when a value's type is not yet known.

**Interview hook:** Mention unknown when discussing typescript & code quality decisions, and explain trade-offs, risk, ownership, and measurable impact.

**6.15. any**

**What:** A type escape hatch that disables type checking and should be used carefully.

**Interview hook:** Mention any when discussing typescript & code quality decisions, and explain trade-offs, risk, ownership, and measurable impact.

**6.16. Strict Mode**

**What:** TypeScript compiler settings that enforce stronger type safety.

**Interview hook:** Mention Strict Mode when discussing typescript & code quality decisions, and explain trade-offs, risk, ownership, and measurable impact.

**6.17. ESLint**

**What:** A static analysis tool that catches code quality, correctness, and style issues.

**Interview hook:** Mention ESLint when discussing typescript & code quality decisions, and explain trade-offs, risk, ownership, and measurable impact.

**6.18. Prettier**

**What:** A formatter that removes formatting debates by applying consistent code style.

**Interview hook:** Mention Prettier when discussing typescript & code quality decisions, and explain trade-offs, risk, ownership, and measurable impact.

**6.19. SonarQube**

**What:** A quality platform for code smells, bugs, vulnerabilities, coverage, and maintainability gates.

**Interview hook:** Mention SonarQube when discussing typescript & code quality decisions, and explain trade-offs, risk, ownership, and measurable impact.

**6.20. Code Smell**

**What:** A code pattern that may not be a bug today but signals maintainability or design risk.

**Interview hook:** Mention Code Smell when discussing typescript & code quality decisions, and explain trade-offs, risk, ownership, and measurable impact.

## **Common interview questions**

**•** How do generics help component design?

**•** Interface vs type alias?

**•** How do you model API states with discriminated unions?

**•** How do you enforce code quality in large teams?

**•** When is any acceptable?

# **7\. API Design & Integration**

Good API design reduces frontend complexity, prevents contract drift, and makes systems easier to test, monitor, and evolve.

**Staff mental model:** focus on contracts, compatibility, failure handling, and reducing frontend-backend coordination cost.

## **Concepts**

**7.1. REST**

**What:** An API style based on resources, HTTP methods, status codes, and stateless communication.

**Interview hook:** Mention REST when discussing api design & integration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**7.2. GraphQL**

**What:** A query language and runtime where clients request exactly the data they need from a typed schema.

**Interview hook:** Mention GraphQL when discussing api design & integration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**7.3. gRPC**

**What:** A high-performance RPC framework using protocol buffers, often used for service-to-service communication.

**Interview hook:** Mention gRPC when discussing api design & integration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**7.4. OpenAPI/Swagger**

**What:** A machine-readable specification for REST APIs that supports documentation, mocks, and code generation.

**Interview hook:** Mention OpenAPI/Swagger when discussing api design & integration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**7.5. API Contract**

**What:** An agreement between API providers and consumers on request, response, errors, auth, and behavior.

**Interview hook:** Mention API Contract when discussing api design & integration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**7.6. Contract-First Design**

**What:** Defining API contracts before implementation so frontend and backend can work in parallel.

**Interview hook:** Mention Contract-First Design when discussing api design & integration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**7.7. API Versioning**

**What:** Managing breaking changes by using versions in URLs, headers, schemas, or compatibility rules.

**Interview hook:** Mention API Versioning when discussing api design & integration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**7.8. Pagination**

**What:** Splitting large result sets into smaller pages to reduce load and improve usability.

**Interview hook:** Mention Pagination when discussing api design & integration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**7.9. Offset Pagination**

**What:** Pagination using limit and offset, simple but less stable for changing datasets.

**Interview hook:** Mention Offset Pagination when discussing api design & integration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**7.10. Cursor Pagination**

**What:** Pagination using a cursor or token, better for large or frequently changing datasets.

**Interview hook:** Mention Cursor Pagination when discussing api design & integration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**7.11. Filtering and Sorting**

**What:** API capabilities that let clients request relevant data without downloading everything.

**Interview hook:** Mention Filtering and Sorting when discussing api design & integration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**7.12. Error Model**

**What:** A consistent structure for API errors including code, message, details, and traceability.

**Interview hook:** Mention Error Model when discussing api design & integration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**7.13. Request Validation**

**What:** Validating incoming payloads to protect services and return predictable errors.

**Interview hook:** Mention Request Validation when discussing api design & integration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**7.14. Response Normalization**

**What:** Shaping API responses consistently so clients can consume data with less transformation.

**Interview hook:** Mention Response Normalization when discussing api design & integration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**7.15. Idempotency**

**What:** Ensuring repeated identical operations have the same effect, important for retries and payments.

**Interview hook:** Mention Idempotency when discussing api design & integration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**7.16. Rate Limiting**

**What:** Restricting request volume to protect systems from abuse or overload.

**Interview hook:** Mention Rate Limiting when discussing api design & integration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**7.17. Retry**

**What:** Repeating a failed operation, usually only when the failure is temporary and safe to retry.

**Interview hook:** Mention Retry when discussing api design & integration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**7.18. Exponential Backoff**

**What:** Retrying with increasing delays to reduce pressure on overloaded systems.

**Interview hook:** Mention Exponential Backoff when discussing api design & integration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**7.19. Circuit Breaker**

**What:** Stopping calls to an unhealthy dependency temporarily to prevent cascading failures.

**Interview hook:** Mention Circuit Breaker when discussing api design & integration decisions, and explain trade-offs, risk, ownership, and measurable impact.

**7.20. Webhook**

**What:** An HTTP callback sent by one system to notify another system about an event.

**Interview hook:** Mention Webhook when discussing api design & integration decisions, and explain trade-offs, risk, ownership, and measurable impact.

## **Common interview questions**

**•** How do you design an API contract?

**•** REST vs GraphQL for reporting dashboards?

**•** How do you handle retries safely?

**•** Offset vs cursor pagination?

**•** How do you design consistent error responses?

# **8\. State, Data Fetching & Caching**

A strong frontend engineer separates server state, client state, UI state, cache, and derived values instead of putting everything into one global store.

**Staff mental model:** separate server state, client state, cache, and UI state before choosing a library.

## **Concepts**

**8.1. Client State**

**What:** State owned by the browser UI, such as selected tab, modal open state, or form draft.

**Interview hook:** Mention Client State when discussing state, data fetching & caching decisions, and explain trade-offs, risk, ownership, and measurable impact.

**8.2. Server State**

**What:** Remote data owned by backend systems, such as users, campaigns, reports, and permissions.

**Interview hook:** Mention Server State when discussing state, data fetching & caching decisions, and explain trade-offs, risk, ownership, and measurable impact.

**8.3. Global State**

**What:** State shared widely across the app, such as auth user, tenant, theme, or feature flags.

**Interview hook:** Mention Global State when discussing state, data fetching & caching decisions, and explain trade-offs, risk, ownership, and measurable impact.

**8.4. Local Component State**

**What:** State used only by one component or a small subtree.

**Interview hook:** Mention Local Component State when discussing state, data fetching & caching decisions, and explain trade-offs, risk, ownership, and measurable impact.

**8.5. Derived State**

**What:** Values computed from existing state instead of stored separately.

**Interview hook:** Mention Derived State when discussing state, data fetching & caching decisions, and explain trade-offs, risk, ownership, and measurable impact.

**8.6. Redux**

**What:** A predictable global state container based on actions, reducers, store, and one-way data flow.

**Interview hook:** Mention Redux when discussing state, data fetching & caching decisions, and explain trade-offs, risk, ownership, and measurable impact.

**8.7. Redux Toolkit (RTK)**

**What:** The recommended Redux approach that reduces boilerplate and adds practical defaults.

**Interview hook:** Mention Redux Toolkit (RTK) when discussing state, data fetching & caching decisions, and explain trade-offs, risk, ownership, and measurable impact.

**8.8. Context API**

**What:** A way to provide shared values through React's tree, best for stable or low-frequency updates.

**Interview hook:** Mention Context API when discussing state, data fetching & caching decisions, and explain trade-offs, risk, ownership, and measurable impact.

**8.9. Zustand**

**What:** A small state management library with simple stores and less boilerplate than Redux.

**Interview hook:** Mention Zustand when discussing state, data fetching & caching decisions, and explain trade-offs, risk, ownership, and measurable impact.

**8.10. React Query**

**What:** A server-state library for fetching, caching, synchronization, retries, and background updates.

**Interview hook:** Mention React Query when discussing state, data fetching & caching decisions, and explain trade-offs, risk, ownership, and measurable impact.

**8.11. RTK Query**

**What:** Redux Toolkit's data fetching and caching layer built on top of Redux.

**Interview hook:** Mention RTK Query when discussing state, data fetching & caching decisions, and explain trade-offs, risk, ownership, and measurable impact.

**8.12. SWR**

**What:** A data fetching pattern and library based on stale-while-revalidate caching.

**Interview hook:** Mention SWR when discussing state, data fetching & caching decisions, and explain trade-offs, risk, ownership, and measurable impact.

**8.13. Cache Invalidation**

**What:** Deciding when cached data is stale and must be refreshed.

**Interview hook:** Mention Cache Invalidation when discussing state, data fetching & caching decisions, and explain trade-offs, risk, ownership, and measurable impact.

**8.14. Optimistic Updates**

**What:** Updating UI before the server confirms success, then rolling back if the request fails.

**Interview hook:** Mention Optimistic Updates when discussing state, data fetching & caching decisions, and explain trade-offs, risk, ownership, and measurable impact.

**8.15. Pessimistic Updates**

**What:** Waiting for the server response before updating UI state.

**Interview hook:** Mention Pessimistic Updates when discussing state, data fetching & caching decisions, and explain trade-offs, risk, ownership, and measurable impact.

**8.16. Normalized Store**

**What:** Storing entities by ID to avoid duplication and simplify updates.

**Interview hook:** Mention Normalized Store when discussing state, data fetching & caching decisions, and explain trade-offs, risk, ownership, and measurable impact.

**8.17. Selectors**

**What:** Functions that read and derive data from state, often memoized for performance.

**Interview hook:** Mention Selectors when discussing state, data fetching & caching decisions, and explain trade-offs, risk, ownership, and measurable impact.

**8.18. Middleware**

**What:** A layer that intercepts actions or requests to handle logging, async work, auth, or side effects.

**Interview hook:** Mention Middleware when discussing state, data fetching & caching decisions, and explain trade-offs, risk, ownership, and measurable impact.

**8.19. Persistence**

**What:** Saving selected state to storage so it survives refreshes or sessions.

**Interview hook:** Mention Persistence when discussing state, data fetching & caching decisions, and explain trade-offs, risk, ownership, and measurable impact.

**8.20. Offline Support**

**What:** Allowing selected features to work without network and sync when connectivity returns.

**Interview hook:** Mention Offline Support when discussing state, data fetching & caching decisions, and explain trade-offs, risk, ownership, and measurable impact.

## **Common interview questions**

**•** Redux vs Context API?

**•** What is server state vs client state?

**•** When would you use React Query?

**•** How do you handle cache invalidation?

**•** How do optimistic updates work?

# **9\. Testing & Quality Engineering**

Testing strategy is about confidence, speed, cost, and risk. Staff engineers choose the right test type for the right failure mode.

**Staff mental model:** choose tests based on risk, speed, confidence, ownership, and maintenance cost.

## **Concepts**

**9.1. Test Pyramid**

**What:** A testing model with many fast unit tests, fewer integration tests, and a small number of E2E tests.

**Interview hook:** Mention Test Pyramid when discussing testing & quality engineering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**9.2. Unit Testing**

**What:** Testing a small isolated function, hook, reducer, utility, or component behavior.

**Interview hook:** Mention Unit Testing when discussing testing & quality engineering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**9.3. Integration Testing**

**What:** Testing how multiple modules or services work together.

**Interview hook:** Mention Integration Testing when discussing testing & quality engineering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**9.4. End-to-End Testing**

**What:** Testing a complete user journey through the real application stack as much as practical.

**Interview hook:** Mention End-to-End Testing when discussing testing & quality engineering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**9.5. Component Testing**

**What:** Testing UI components with props, state, interactions, and accessibility behavior.

**Interview hook:** Mention Component Testing when discussing testing & quality engineering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**9.6. Contract Testing**

**What:** Testing that providers and consumers follow agreed API contracts.

**Interview hook:** Mention Contract Testing when discussing testing & quality engineering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**9.7. Smoke Testing**

**What:** A small set of critical tests to confirm the app is basically working after deployment.

**Interview hook:** Mention Smoke Testing when discussing testing & quality engineering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**9.8. Sanity Testing**

**What:** A quick focused check that a particular change or fix behaves as expected.

**Interview hook:** Mention Sanity Testing when discussing testing & quality engineering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**9.9. Regression Testing**

**What:** Testing that existing behavior has not broken after new changes.

**Interview hook:** Mention Regression Testing when discussing testing & quality engineering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**9.10. Visual Regression Testing**

**What:** Comparing screenshots to detect unintended UI changes.

**Interview hook:** Mention Visual Regression Testing when discussing testing & quality engineering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**9.11. Snapshot Testing**

**What:** Saving rendered output and comparing future output, useful but risky if snapshots are reviewed casually.

**Interview hook:** Mention Snapshot Testing when discussing testing & quality engineering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**9.12. Accessibility Testing**

**What:** Checking keyboard support, screen reader semantics, focus order, contrast, labels, and ARIA correctness.

**Interview hook:** Mention Accessibility Testing when discussing testing & quality engineering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**9.13. Performance Testing**

**What:** Measuring speed, responsiveness, memory, and resource cost under realistic conditions.

**Interview hook:** Mention Performance Testing when discussing testing & quality engineering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**9.14. Load Testing**

**What:** Testing behavior under expected or high traffic volume.

**Interview hook:** Mention Load Testing when discussing testing & quality engineering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**9.15. Stress Testing**

**What:** Pushing a system beyond normal limits to understand breaking points.

**Interview hook:** Mention Stress Testing when discussing testing & quality engineering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**9.16. Chaos Testing**

**What:** Intentionally introducing failures to validate resilience and recovery.

**Interview hook:** Mention Chaos Testing when discussing testing & quality engineering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**9.17. Mocking**

**What:** Replacing a real dependency with a controlled fake implementation during tests.

**Interview hook:** Mention Mocking when discussing testing & quality engineering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**9.18. Stubbing**

**What:** Providing predefined responses for dependencies or functions.

**Interview hook:** Mention Stubbing when discussing testing & quality engineering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**9.19. Spying**

**What:** Observing calls to functions or modules without necessarily replacing behavior.

**Interview hook:** Mention Spying when discussing testing & quality engineering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**9.20. Fake Timers**

**What:** Controlling timers in tests to avoid waiting for real time.

**Interview hook:** Mention Fake Timers when discussing testing & quality engineering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**9.21. MSW**

**What:** Mock Service Worker, a network-level API mocking tool useful for frontend tests and Storybook.

**Interview hook:** Mention MSW when discussing testing & quality engineering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**9.22. Jest/Vitest**

**What:** JavaScript test runners used for unit and component testing.

**Interview hook:** Mention Jest/Vitest when discussing testing & quality engineering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**9.23. React Testing Library**

**What:** A testing library focused on testing UI the way users interact with it.

**Interview hook:** Mention React Testing Library when discussing testing & quality engineering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**9.24. Cypress**

**What:** A browser-based testing tool often used for E2E and component testing.

**Interview hook:** Mention Cypress when discussing testing & quality engineering decisions, and explain trade-offs, risk, ownership, and measurable impact.

**9.25. Playwright**

**What:** A modern browser automation tool for cross-browser E2E testing.

**Interview hook:** Mention Playwright when discussing testing & quality engineering decisions, and explain trade-offs, risk, ownership, and measurable impact.

## **Common interview questions**

**•** Why not write everything as E2E tests?

**•** Cypress vs Playwright?

**•** Where does MSW fit?

**•** How do you test microfrontends?

**•** What is a good testing strategy for critical journeys?

# **10\. CI/CD, Build & Tooling**

CI/CD converts code into validated, deployable artifacts. Staff engineers optimize pipelines for speed, reliability, traceability, and rollback.

**Staff mental model:** optimize for fast feedback, traceable artifacts, secure gates, and reliable release automation.

## **Concepts**

**10.1. Continuous Integration (CI)**

**What:** Automatically building and testing code changes frequently to detect problems early.

**Interview hook:** Mention Continuous Integration (CI) when discussing ci/cd, build & tooling decisions, and explain trade-offs, risk, ownership, and measurable impact.

**10.2. Continuous Delivery**

**What:** Keeping software always releasable, with production deployment still manually approved.

**Interview hook:** Mention Continuous Delivery when discussing ci/cd, build & tooling decisions, and explain trade-offs, risk, ownership, and measurable impact.

**10.3. Continuous Deployment**

**What:** Automatically deploying every successful change to production.

**Interview hook:** Mention Continuous Deployment when discussing ci/cd, build & tooling decisions, and explain trade-offs, risk, ownership, and measurable impact.

**10.4. Pipeline**

**What:** Automated workflow steps such as install, lint, test, build, scan, package, and deploy.

**Interview hook:** Mention Pipeline when discussing ci/cd, build & tooling decisions, and explain trade-offs, risk, ownership, and measurable impact.

**10.5. Build Artifact**

**What:** The immutable output of a build, such as static assets, package, or container image.

**Interview hook:** Mention Build Artifact when discussing ci/cd, build & tooling decisions, and explain trade-offs, risk, ownership, and measurable impact.

**10.6. Docker Image**

**What:** A packaged filesystem and runtime configuration used to run an application consistently.

**Interview hook:** Mention Docker Image when discussing ci/cd, build & tooling decisions, and explain trade-offs, risk, ownership, and measurable impact.

**10.7. Image Registry**

**What:** A storage system for container images, such as JFrog Artifactory, Docker Hub, or ECR.

**Interview hook:** Mention Image Registry when discussing ci/cd, build & tooling decisions, and explain trade-offs, risk, ownership, and measurable impact.

**10.8. Multi-Stage Docker Build**

**What:** A Docker approach where build dependencies stay in one stage and production runtime stays smaller.

**Interview hook:** Mention Multi-Stage Docker Build when discussing ci/cd, build & tooling decisions, and explain trade-offs, risk, ownership, and measurable impact.

**10.9. Dependency Caching**

**What:** Reusing downloaded dependencies between pipeline runs to reduce build time.

**Interview hook:** Mention Dependency Caching when discussing ci/cd, build & tooling decisions, and explain trade-offs, risk, ownership, and measurable impact.

**10.10. Monorepo Builds**

**What:** Building multiple apps or packages from one repository while controlling affected scope.

**Interview hook:** Mention Monorepo Builds when discussing ci/cd, build & tooling decisions, and explain trade-offs, risk, ownership, and measurable impact.

**10.11. Nx Affected**

**What:** Nx feature that detects which projects are impacted by a change and runs only needed tasks.

**Interview hook:** Mention Nx Affected when discussing ci/cd, build & tooling decisions, and explain trade-offs, risk, ownership, and measurable impact.

**10.12. Turborepo Cache**

**What:** A build cache that avoids rerunning unchanged tasks in monorepos.

**Interview hook:** Mention Turborepo Cache when discussing ci/cd, build & tooling decisions, and explain trade-offs, risk, ownership, and measurable impact.

**10.13. Semantic Versioning**

**What:** Versioning scheme major.minor.patch where major signals breaking changes.

**Interview hook:** Mention Semantic Versioning when discussing ci/cd, build & tooling decisions, and explain trade-offs, risk, ownership, and measurable impact.

**10.14. Changesets**

**What:** A tool/process for managing package versioning, changelogs, and releases in multi-package repos.

**Interview hook:** Mention Changesets when discussing ci/cd, build & tooling decisions, and explain trade-offs, risk, ownership, and measurable impact.

**10.15. Release Notes**

**What:** Human-readable summary of changes, fixes, risks, and rollout notes for a release.

**Interview hook:** Mention Release Notes when discussing ci/cd, build & tooling decisions, and explain trade-offs, risk, ownership, and measurable impact.

**10.16. GitHub Actions**

**What:** GitHub's workflow automation platform for CI/CD tasks.

**Interview hook:** Mention GitHub Actions when discussing ci/cd, build & tooling decisions, and explain trade-offs, risk, ownership, and measurable impact.

**10.17. Jenkins**

**What:** A widely used automation server for building, testing, and deploying software.

**Interview hook:** Mention Jenkins when discussing ci/cd, build & tooling decisions, and explain trade-offs, risk, ownership, and measurable impact.

**10.18. Helm Chart**

**What:** A package format for defining and deploying Kubernetes resources.

**Interview hook:** Mention Helm Chart when discussing ci/cd, build & tooling decisions, and explain trade-offs, risk, ownership, and measurable impact.

**10.19. Kubernetes Namespace**

**What:** A logical isolation boundary inside a Kubernetes cluster.

**Interview hook:** Mention Kubernetes Namespace when discussing ci/cd, build & tooling decisions, and explain trade-offs, risk, ownership, and measurable impact.

**10.20. Artifact Promotion**

**What:** Promoting the same validated artifact across environments instead of rebuilding for each environment.

**Interview hook:** Mention Artifact Promotion when discussing ci/cd, build & tooling decisions, and explain trade-offs, risk, ownership, and measurable impact.

## **Common interview questions**

**•** How do you speed up frontend CI pipelines?

**•** How do you manage build artifacts?

**•** How do you release a shared component package?

**•** What is artifact promotion?

**•** How do monorepo affected builds work?

# **11\. Deployment & Release Strategies**

Release strategy controls risk. The strongest answers combine rollout method, metrics, rollback, compatibility, and ownership.

**Staff mental model:** include rollout strategy, compatibility, monitoring, rollback, and user/business impact.

## **Concepts**

**11.1. Rolling Deployment**

**What:** Replacing application instances gradually so some old and some new versions run during rollout.

**Interview hook:** Mention Rolling Deployment when discussing deployment & release strategies decisions, and explain trade-offs, risk, ownership, and measurable impact.

**11.2. Canary Deployment**

**What:** Sending a small percentage of production traffic to a new version first, then increasing gradually if metrics are healthy.

**Interview hook:** Mention Canary Deployment when discussing deployment & release strategies decisions, and explain trade-offs, risk, ownership, and measurable impact.

**11.3. Blue-Green Deployment**

**What:** Maintaining two environments and switching traffic from old to new after validation.

**Interview hook:** Mention Blue-Green Deployment when discussing deployment & release strategies decisions, and explain trade-offs, risk, ownership, and measurable impact.

**11.4. Feature Flag Rollout**

**What:** Using runtime configuration to enable a feature for selected users without redeploying.

**Interview hook:** Mention Feature Flag Rollout when discussing deployment & release strategies decisions, and explain trade-offs, risk, ownership, and measurable impact.

**11.5. Dark Launch**

**What:** Deploying code to production while keeping the user-facing feature hidden.

**Interview hook:** Mention Dark Launch when discussing deployment & release strategies decisions, and explain trade-offs, risk, ownership, and measurable impact.

**11.6. A/B Testing**

**What:** Showing different variants to user groups to compare business or UX outcomes.

**Interview hook:** Mention A/B Testing when discussing deployment & release strategies decisions, and explain trade-offs, risk, ownership, and measurable impact.

**11.7. Shadow Traffic**

**What:** Mirroring real production traffic to a new system without affecting user responses.

**Interview hook:** Mention Shadow Traffic when discussing deployment & release strategies decisions, and explain trade-offs, risk, ownership, and measurable impact.

**11.8. Traffic Splitting**

**What:** Dividing requests between versions based on percentage, path, header, cookie, region, or user segment.

**Interview hook:** Mention Traffic Splitting when discussing deployment & release strategies decisions, and explain trade-offs, risk, ownership, and measurable impact.

**11.9. Zero-Downtime Deployment**

**What:** Deploying without making the service unavailable to users.

**Interview hook:** Mention Zero-Downtime Deployment when discussing deployment & release strategies decisions, and explain trade-offs, risk, ownership, and measurable impact.

**11.10. Rollback**

**What:** Returning traffic or code to a previous stable version after problems appear.

**Interview hook:** Mention Rollback when discussing deployment & release strategies decisions, and explain trade-offs, risk, ownership, and measurable impact.

**11.11. Roll Forward**

**What:** Fixing production by deploying a newer version instead of reverting.

**Interview hook:** Mention Roll Forward when discussing deployment & release strategies decisions, and explain trade-offs, risk, ownership, and measurable impact.

**11.12. Immutable Deployment**

**What:** Deploying new artifacts or infrastructure rather than mutating existing running systems.

**Interview hook:** Mention Immutable Deployment when discussing deployment & release strategies decisions, and explain trade-offs, risk, ownership, and measurable impact.

**11.13. Environment Promotion**

**What:** Moving the same artifact through dev, QA, staging, and production with increasing confidence.

**Interview hook:** Mention Environment Promotion when discussing deployment & release strategies decisions, and explain trade-offs, risk, ownership, and measurable impact.

**11.14. Production Readiness Checklist**

**What:** A checklist covering observability, rollback, security, testing, capacity, and support before launch.

**Interview hook:** Mention Production Readiness Checklist when discussing deployment & release strategies decisions, and explain trade-offs, risk, ownership, and measurable impact.

**11.15. Release Train**

**What:** A predictable scheduled release model where changes ship on fixed dates.

**Interview hook:** Mention Release Train when discussing deployment & release strategies decisions, and explain trade-offs, risk, ownership, and measurable impact.

**11.16. Hotfix**

**What:** An urgent production fix released outside the normal process.

**Interview hook:** Mention Hotfix when discussing deployment & release strategies decisions, and explain trade-offs, risk, ownership, and measurable impact.

**11.17. Kill Switch**

**What:** A mechanism to quickly disable a feature or integration in production.

**Interview hook:** Mention Kill Switch when discussing deployment & release strategies decisions, and explain trade-offs, risk, ownership, and measurable impact.

**11.18. Backward Compatibility**

**What:** Ensuring new versions work with older clients, APIs, data, or deployments during transition.

**Interview hook:** Mention Backward Compatibility when discussing deployment & release strategies decisions, and explain trade-offs, risk, ownership, and measurable impact.

**11.19. Database Migration**

**What:** Changing database schema or data safely while applications continue to run.

**Interview hook:** Mention Database Migration when discussing deployment & release strategies decisions, and explain trade-offs, risk, ownership, and measurable impact.

**11.20. API Compatibility**

**What:** Keeping API changes safe for existing consumers through additive changes or versioning.

**Interview hook:** Mention API Compatibility when discussing deployment & release strategies decisions, and explain trade-offs, risk, ownership, and measurable impact.

## **Common interview questions**

**•** What is canary deployment?

**•** Canary vs blue-green vs rolling deployment?

**•** How do feature flags reduce release risk?

**•** How do you roll back safely?

**•** What is shadow traffic?

# **12\. Infrastructure, Scalability & Reliability**

Scalability is not only adding servers. It includes traffic distribution, safe failure, capacity, latency, and recovery planning.

**Staff mental model:** discuss scaling, failure isolation, latency, capacity, and recovery objectives.

## **Concepts**

**12.1. CDN**

**What:** A content delivery network that caches static or edge-rendered content close to users.

**Interview hook:** Mention CDN when discussing infrastructure, scalability & reliability decisions, and explain trade-offs, risk, ownership, and measurable impact.

**12.2. Reverse Proxy**

**What:** A server that receives client requests and forwards them to backend services or apps.

**Interview hook:** Mention Reverse Proxy when discussing infrastructure, scalability & reliability decisions, and explain trade-offs, risk, ownership, and measurable impact.

**12.3. NGINX**

**What:** A common web server and reverse proxy used for routing, caching, TLS termination, and static hosting.

**Interview hook:** Mention NGINX when discussing infrastructure, scalability & reliability decisions, and explain trade-offs, risk, ownership, and measurable impact.

**12.4. Load Balancer**

**What:** A component that distributes traffic across multiple instances to improve availability and capacity.

**Interview hook:** Mention Load Balancer when discussing infrastructure, scalability & reliability decisions, and explain trade-offs, risk, ownership, and measurable impact.

**12.5. API Gateway**

**What:** A managed or custom entry point for APIs, often handling auth, routing, throttling, and observability.

**Interview hook:** Mention API Gateway when discussing infrastructure, scalability & reliability decisions, and explain trade-offs, risk, ownership, and measurable impact.

**12.6. Edge Computing**

**What:** Running logic near the user to reduce latency or personalize responses before origin servers.

**Interview hook:** Mention Edge Computing when discussing infrastructure, scalability & reliability decisions, and explain trade-offs, risk, ownership, and measurable impact.

**12.7. Horizontal Scaling**

**What:** Adding more machines, pods, or instances to handle more traffic.

**Interview hook:** Mention Horizontal Scaling when discussing infrastructure, scalability & reliability decisions, and explain trade-offs, risk, ownership, and measurable impact.

**12.8. Vertical Scaling**

**What:** Increasing CPU, memory, or resources on existing machines.

**Interview hook:** Mention Vertical Scaling when discussing infrastructure, scalability & reliability decisions, and explain trade-offs, risk, ownership, and measurable impact.

**12.9. Auto Scaling**

**What:** Automatically increasing or decreasing capacity based on load or metrics.

**Interview hook:** Mention Auto Scaling when discussing infrastructure, scalability & reliability decisions, and explain trade-offs, risk, ownership, and measurable impact.

**12.10. Kubernetes Ingress**

**What:** Kubernetes resource for exposing services to external traffic through routing rules.

**Interview hook:** Mention Kubernetes Ingress when discussing infrastructure, scalability & reliability decisions, and explain trade-offs, risk, ownership, and measurable impact.

**12.11. Service Discovery**

**What:** A mechanism for services to find and communicate with each other dynamically.

**Interview hook:** Mention Service Discovery when discussing infrastructure, scalability & reliability decisions, and explain trade-offs, risk, ownership, and measurable impact.

**12.12. Health Check**

**What:** A request or probe used to verify that a service is healthy.

**Interview hook:** Mention Health Check when discussing infrastructure, scalability & reliability decisions, and explain trade-offs, risk, ownership, and measurable impact.

**12.13. Readiness Probe**

**What:** A Kubernetes check that determines whether a pod is ready to receive traffic.

**Interview hook:** Mention Readiness Probe when discussing infrastructure, scalability & reliability decisions, and explain trade-offs, risk, ownership, and measurable impact.

**12.14. Liveness Probe**

**What:** A Kubernetes check that determines whether a pod should be restarted.

**Interview hook:** Mention Liveness Probe when discussing infrastructure, scalability & reliability decisions, and explain trade-offs, risk, ownership, and measurable impact.

**12.15. Timeout**

**What:** A limit on how long a request waits before failing.

**Interview hook:** Mention Timeout when discussing infrastructure, scalability & reliability decisions, and explain trade-offs, risk, ownership, and measurable impact.

**12.16. Bulkhead**

**What:** Isolating resources so failure in one area does not consume capacity everywhere.

**Interview hook:** Mention Bulkhead when discussing infrastructure, scalability & reliability decisions, and explain trade-offs, risk, ownership, and measurable impact.

**12.17. Failover**

**What:** Switching to a backup system or region when the primary fails.

**Interview hook:** Mention Failover when discussing infrastructure, scalability & reliability decisions, and explain trade-offs, risk, ownership, and measurable impact.

**12.18. Disaster Recovery**

**What:** A plan for restoring service after major failure such as region outage or data loss.

**Interview hook:** Mention Disaster Recovery when discussing infrastructure, scalability & reliability decisions, and explain trade-offs, risk, ownership, and measurable impact.

**12.19. RTO**

**What:** Recovery Time Objective, the maximum acceptable time to restore service.

**Interview hook:** Mention RTO when discussing infrastructure, scalability & reliability decisions, and explain trade-offs, risk, ownership, and measurable impact.

**12.20. RPO**

**What:** Recovery Point Objective, the maximum acceptable amount of data loss measured in time.

**Interview hook:** Mention RPO when discussing infrastructure, scalability & reliability decisions, and explain trade-offs, risk, ownership, and measurable impact.

## **Common interview questions**

**•** How would you handle millions of requests?

**•** Why use CDN and static hosting for React apps?

**•** How do load balancers work?

**•** What is failover and disaster recovery?

**•** How do timeouts and bulkheads prevent cascading failures?

# **13\. Web Performance & Core Web Vitals**

Frontend performance needs measurement, prioritization, and trade-offs. Staff engineers connect technical metrics to user and business outcomes.

**Staff mental model:** tie optimization to measured bottlenecks, user impact, business metrics, and long-term guardrails.

## **Concepts**

**13.1. Core Web Vitals**

**What:** Google's key user experience metrics focused on loading, interactivity, and visual stability.

**Interview hook:** Mention Core Web Vitals when discussing web performance & core web vitals decisions, and explain trade-offs, risk, ownership, and measurable impact.

**13.2. Largest Contentful Paint (LCP)**

**What:** Measures how quickly the main visible content loads.

**Interview hook:** Mention Largest Contentful Paint (LCP) when discussing web performance & core web vitals decisions, and explain trade-offs, risk, ownership, and measurable impact.

**13.3. Interaction to Next Paint (INP)**

**What:** Measures responsiveness by tracking interaction latency across the page.

**Interview hook:** Mention Interaction to Next Paint (INP) when discussing web performance & core web vitals decisions, and explain trade-offs, risk, ownership, and measurable impact.

**13.4. Cumulative Layout Shift (CLS)**

**What:** Measures unexpected visual movement during page load and interaction.

**Interview hook:** Mention Cumulative Layout Shift (CLS) when discussing web performance & core web vitals decisions, and explain trade-offs, risk, ownership, and measurable impact.

**13.5. Time to First Byte (TTFB)**

**What:** Time from request start until the browser receives the first byte from the server.

**Interview hook:** Mention Time to First Byte (TTFB) when discussing web performance & core web vitals decisions, and explain trade-offs, risk, ownership, and measurable impact.

**13.6. First Contentful Paint (FCP)**

**What:** Time until the browser renders the first visible content.

**Interview hook:** Mention First Contentful Paint (FCP) when discussing web performance & core web vitals decisions, and explain trade-offs, risk, ownership, and measurable impact.

**13.7. Bundle Size**

**What:** Amount of JavaScript, CSS, and assets shipped to the browser.

**Interview hook:** Mention Bundle Size when discussing web performance & core web vitals decisions, and explain trade-offs, risk, ownership, and measurable impact.

**13.8. Tree Shaking**

**What:** Removing unused exports from bundles during build.

**Interview hook:** Mention Tree Shaking when discussing web performance & core web vitals decisions, and explain trade-offs, risk, ownership, and measurable impact.

**13.9. Code Splitting**

**What:** Splitting code into smaller chunks loaded only when needed.

**Interview hook:** Mention Code Splitting when discussing web performance & core web vitals decisions, and explain trade-offs, risk, ownership, and measurable impact.

**13.10. Lazy Loading**

**What:** Deferring non-critical code, images, routes, or components until required.

**Interview hook:** Mention Lazy Loading when discussing web performance & core web vitals decisions, and explain trade-offs, risk, ownership, and measurable impact.

**13.11. Preload**

**What:** A resource hint to fetch critical resources earlier.

**Interview hook:** Mention Preload when discussing web performance & core web vitals decisions, and explain trade-offs, risk, ownership, and measurable impact.

**13.12. Prefetch**

**What:** A resource hint to fetch likely future resources when the browser is idle.

**Interview hook:** Mention Prefetch when discussing web performance & core web vitals decisions, and explain trade-offs, risk, ownership, and measurable impact.

**13.13. Brotli/Gzip**

**What:** Compression algorithms that reduce transfer size of text resources.

**Interview hook:** Mention Brotli/Gzip when discussing web performance & core web vitals decisions, and explain trade-offs, risk, ownership, and measurable impact.

**13.14. Image Optimization**

**What:** Reducing image cost through sizing, compression, modern formats, responsive images, and lazy loading.

**Interview hook:** Mention Image Optimization when discussing web performance & core web vitals decisions, and explain trade-offs, risk, ownership, and measurable impact.

**13.15. Font Optimization**

**What:** Reducing font loading impact through preload, subset, display strategy, and fewer font variants.

**Interview hook:** Mention Font Optimization when discussing web performance & core web vitals decisions, and explain trade-offs, risk, ownership, and measurable impact.

**13.16. Virtualization**

**What:** Rendering only visible rows/items in large lists to reduce DOM and rendering cost.

**Interview hook:** Mention Virtualization when discussing web performance & core web vitals decisions, and explain trade-offs, risk, ownership, and measurable impact.

**13.17. Memoization**

**What:** Caching computed values or component output to avoid unnecessary work.

**Interview hook:** Mention Memoization when discussing web performance & core web vitals decisions, and explain trade-offs, risk, ownership, and measurable impact.

**13.18. Web Workers**

**What:** Running CPU-heavy JavaScript off the main thread.

**Interview hook:** Mention Web Workers when discussing web performance & core web vitals decisions, and explain trade-offs, risk, ownership, and measurable impact.

**13.19. Service Workers**

**What:** Browser scripts that enable caching, offline support, and request interception.

**Interview hook:** Mention Service Workers when discussing web performance & core web vitals decisions, and explain trade-offs, risk, ownership, and measurable impact.

**13.20. Lighthouse**

**What:** A tool for auditing performance, accessibility, SEO, and best practices.

**Interview hook:** Mention Lighthouse when discussing web performance & core web vitals decisions, and explain trade-offs, risk, ownership, and measurable impact.

## **Common interview questions**

**•** How do you optimize a slow React app?

**•** How do you measure LCP, INP, and CLS?

**•** When should you use virtualization?

**•** How do you reduce bundle size?

**•** How do you optimize images and fonts?

# **14\. Security & Privacy**

Security answers should cover prevention, containment, monitoring, and user data protection. Frontend security is shared responsibility, not only backend work.

**Staff mental model:** cover prevention, secure defaults, data protection, monitoring, and team-wide guardrails.

## **Concepts**

**14.1. Authentication**

**What:** Verifying who the user is.

**Interview hook:** Mention Authentication when discussing security & privacy decisions, and explain trade-offs, risk, ownership, and measurable impact.

**14.2. Authorization**

**What:** Verifying what the authenticated user is allowed to do.

**Interview hook:** Mention Authorization when discussing security & privacy decisions, and explain trade-offs, risk, ownership, and measurable impact.

**14.3. OAuth2**

**What:** An authorization framework for delegated access using tokens and flows.

**Interview hook:** Mention OAuth2 when discussing security & privacy decisions, and explain trade-offs, risk, ownership, and measurable impact.

**14.4. OIDC**

**What:** An identity layer on top of OAuth2 used for login and user identity information.

**Interview hook:** Mention OIDC when discussing security & privacy decisions, and explain trade-offs, risk, ownership, and measurable impact.

**14.5. JWT**

**What:** A signed token format commonly used to carry claims between systems.

**Interview hook:** Mention JWT when discussing security & privacy decisions, and explain trade-offs, risk, ownership, and measurable impact.

**14.6. Refresh Token**

**What:** A long-lived token used to obtain new access tokens without asking the user to log in again.

**Interview hook:** Mention Refresh Token when discussing security & privacy decisions, and explain trade-offs, risk, ownership, and measurable impact.

**14.7. Session Cookie**

**What:** A cookie used to associate browser requests with a server-side or token-backed session.

**Interview hook:** Mention Session Cookie when discussing security & privacy decisions, and explain trade-offs, risk, ownership, and measurable impact.

**14.8. SameSite Cookie**

**What:** A cookie setting that controls whether cookies are sent on cross-site requests.

**Interview hook:** Mention SameSite Cookie when discussing security & privacy decisions, and explain trade-offs, risk, ownership, and measurable impact.

**14.9. Secure/HttpOnly Cookie**

**What:** Cookie flags that restrict transport to HTTPS and prevent JavaScript access.

**Interview hook:** Mention Secure/HttpOnly Cookie when discussing security & privacy decisions, and explain trade-offs, risk, ownership, and measurable impact.

**14.10. LocalStorage Risk**

**What:** Risk from storing sensitive tokens in localStorage because XSS can read them.

**Interview hook:** Mention LocalStorage Risk when discussing security & privacy decisions, and explain trade-offs, risk, ownership, and measurable impact.

**14.11. XSS**

**What:** Cross-site scripting, where attacker-controlled scripts run in a user's browser.

**Interview hook:** Mention XSS when discussing security & privacy decisions, and explain trade-offs, risk, ownership, and measurable impact.

**14.12. CSRF**

**What:** Cross-site request forgery, where a malicious site causes a browser to make authenticated requests.

**Interview hook:** Mention CSRF when discussing security & privacy decisions, and explain trade-offs, risk, ownership, and measurable impact.

**14.13. CORS**

**What:** Browser security mechanism controlling which origins can read cross-origin responses.

**Interview hook:** Mention CORS when discussing security & privacy decisions, and explain trade-offs, risk, ownership, and measurable impact.

**14.14. CSP**

**What:** Content Security Policy, a browser policy that restricts allowed scripts, styles, images, and connections.

**Interview hook:** Mention CSP when discussing security & privacy decisions, and explain trade-offs, risk, ownership, and measurable impact.

**14.15. HSTS**

**What:** HTTP Strict Transport Security, forcing browsers to use HTTPS for a domain.

**Interview hook:** Mention HSTS when discussing security & privacy decisions, and explain trade-offs, risk, ownership, and measurable impact.

**14.16. Clickjacking**

**What:** Tricking users into clicking hidden or framed UI from another site.

**Interview hook:** Mention Clickjacking when discussing security & privacy decisions, and explain trade-offs, risk, ownership, and measurable impact.

**14.17. SQL Injection**

**What:** Injecting malicious SQL through unsafely handled input.

**Interview hook:** Mention SQL Injection when discussing security & privacy decisions, and explain trade-offs, risk, ownership, and measurable impact.

**14.18. Dependency Vulnerability**

**What:** Security risk introduced by third-party packages or transitive dependencies.

**Interview hook:** Mention Dependency Vulnerability when discussing security & privacy decisions, and explain trade-offs, risk, ownership, and measurable impact.

**14.19. Secrets Management**

**What:** Protecting API keys, tokens, certificates, and credentials from code and logs.

**Interview hook:** Mention Secrets Management when discussing security & privacy decisions, and explain trade-offs, risk, ownership, and measurable impact.

**14.20. PII Handling**

**What:** Protecting personally identifiable information through minimization, masking, access control, and retention rules.

**Interview hook:** Mention PII Handling when discussing security & privacy decisions, and explain trade-offs, risk, ownership, and measurable impact.

## **Common interview questions**

**•** Where should JWT and refresh tokens be stored?

**•** How do you prevent XSS and CSRF?

**•** What is CSP?

**•** How do SameSite and HttpOnly cookies help?

**•** How do you secure frontend deployments?

# **15\. Observability & Production Operations**

Production quality depends on knowing what is happening, detecting issues early, and learning from incidents.

**Staff mental model:** explain what you measure, when you alert, who owns response, and how learning feeds prevention.

## **Concepts**

**15.1. Observability**

**What:** The ability to understand system behavior from external signals such as logs, metrics, and traces.

**Interview hook:** Mention Observability when discussing observability & production operations decisions, and explain trade-offs, risk, ownership, and measurable impact.

**15.2. Monitoring**

**What:** Collecting and checking known signals to detect unhealthy behavior.

**Interview hook:** Mention Monitoring when discussing observability & production operations decisions, and explain trade-offs, risk, ownership, and measurable impact.

**15.3. Logging**

**What:** Recording structured events and context for debugging and auditability.

**Interview hook:** Mention Logging when discussing observability & production operations decisions, and explain trade-offs, risk, ownership, and measurable impact.

**15.4. Metrics**

**What:** Numerical measurements such as latency, error rate, throughput, CPU, and memory.

**Interview hook:** Mention Metrics when discussing observability & production operations decisions, and explain trade-offs, risk, ownership, and measurable impact.

**15.5. Distributed Tracing**

**What:** Following a request across services to understand latency and failures.

**Interview hook:** Mention Distributed Tracing when discussing observability & production operations decisions, and explain trade-offs, risk, ownership, and measurable impact.

**15.6. APM**

**What:** Application Performance Monitoring tools that track application latency, errors, and dependencies.

**Interview hook:** Mention APM when discussing observability & production operations decisions, and explain trade-offs, risk, ownership, and measurable impact.

**15.7. RUM**

**What:** Real User Monitoring, collecting performance and error data from actual users' browsers.

**Interview hook:** Mention RUM when discussing observability & production operations decisions, and explain trade-offs, risk, ownership, and measurable impact.

**15.8. Synthetic Monitoring**

**What:** Scripted monitoring that simulates user journeys from controlled locations.

**Interview hook:** Mention Synthetic Monitoring when discussing observability & production operations decisions, and explain trade-offs, risk, ownership, and measurable impact.

**15.9. Sentry**

**What:** A tool commonly used for frontend and backend error tracking.

**Interview hook:** Mention Sentry when discussing observability & production operations decisions, and explain trade-offs, risk, ownership, and measurable impact.

**15.10. Prometheus**

**What:** A metrics collection and querying system commonly used with Kubernetes.

**Interview hook:** Mention Prometheus when discussing observability & production operations decisions, and explain trade-offs, risk, ownership, and measurable impact.

**15.11. Grafana**

**What:** A dashboarding and visualization tool for metrics, logs, and traces.

**Interview hook:** Mention Grafana when discussing observability & production operations decisions, and explain trade-offs, risk, ownership, and measurable impact.

**15.12. ELK**

**What:** Elasticsearch, Logstash, and Kibana stack for log collection, search, and analysis.

**Interview hook:** Mention ELK when discussing observability & production operations decisions, and explain trade-offs, risk, ownership, and measurable impact.

**15.13. OpenTelemetry**

**What:** A standard for collecting traces, metrics, and logs across systems.

**Interview hook:** Mention OpenTelemetry when discussing observability & production operations decisions, and explain trade-offs, risk, ownership, and measurable impact.

**15.14. Alerting**

**What:** Notifying teams when metrics or errors cross defined thresholds.

**Interview hook:** Mention Alerting when discussing observability & production operations decisions, and explain trade-offs, risk, ownership, and measurable impact.

**15.15. Dashboard**

**What:** A visual summary of health, performance, traffic, errors, and business signals.

**Interview hook:** Mention Dashboard when discussing observability & production operations decisions, and explain trade-offs, risk, ownership, and measurable impact.

**15.16. SLI**

**What:** Service Level Indicator, a measured signal such as availability or latency.

**Interview hook:** Mention SLI when discussing observability & production operations decisions, and explain trade-offs, risk, ownership, and measurable impact.

**15.17. SLO**

**What:** Service Level Objective, a target for an SLI such as 99.9% availability.

**Interview hook:** Mention SLO when discussing observability & production operations decisions, and explain trade-offs, risk, ownership, and measurable impact.

**15.18. SLA**

**What:** Service Level Agreement, a customer-facing commitment often tied to consequences.

**Interview hook:** Mention SLA when discussing observability & production operations decisions, and explain trade-offs, risk, ownership, and measurable impact.

**15.19. Error Budget**

**What:** The allowed amount of unreliability within an SLO period.

**Interview hook:** Mention Error Budget when discussing observability & production operations decisions, and explain trade-offs, risk, ownership, and measurable impact.

**15.20. Incident Postmortem**

**What:** A blameless review of what happened, why, impact, and how to prevent recurrence.

**Interview hook:** Mention Incident Postmortem when discussing observability & production operations decisions, and explain trade-offs, risk, ownership, and measurable impact.

## **Common interview questions**

**•** What metrics would you monitor after release?

**•** SLI vs SLO vs SLA?

**•** How do you handle a production incident?

**•** How do RUM and synthetic monitoring differ?

**•** What should go into an incident postmortem?

# **16\. Platform Engineering, Design Systems & Staff Leadership**

Platform work succeeds when it improves developer experience, reduces duplication, and creates safe, scalable defaults for many teams.

**Staff mental model:** show how platforms create paved roads, improve DX, reduce duplication, and scale engineering practices.

## **Concepts**

**16.1. Internal Developer Platform**

**What:** A set of tools and services that help teams build, test, deploy, and operate software with less friction.

**Interview hook:** Mention Internal Developer Platform when discussing platform engineering, design systems & staff leadership decisions, and explain trade-offs, risk, ownership, and measurable impact.

**16.2. Golden Path**

**What:** A recommended paved path for building and shipping software using approved tools and practices.

**Interview hook:** Mention Golden Path when discussing platform engineering, design systems & staff leadership decisions, and explain trade-offs, risk, ownership, and measurable impact.

**16.3. Self-Service**

**What:** Capabilities teams can use without waiting on platform engineers for every change.

**Interview hook:** Mention Self-Service when discussing platform engineering, design systems & staff leadership decisions, and explain trade-offs, risk, ownership, and measurable impact.

**16.4. Scaffolding**

**What:** Generating a standardized project, component, service, or package structure.

**Interview hook:** Mention Scaffolding when discussing platform engineering, design systems & staff leadership decisions, and explain trade-offs, risk, ownership, and measurable impact.

**16.5. Internal CLI**

**What:** A command-line tool that automates common development or platform workflows.

**Interview hook:** Mention Internal CLI when discussing platform engineering, design systems & staff leadership decisions, and explain trade-offs, risk, ownership, and measurable impact.

**16.6. Design System**

**What:** A shared system of design standards, tokens, components, patterns, and governance.

**Interview hook:** Mention Design System when discussing platform engineering, design systems & staff leadership decisions, and explain trade-offs, risk, ownership, and measurable impact.

**16.7. Component Library**

**What:** Reusable implemented UI components distributed as packages or shared modules.

**Interview hook:** Mention Component Library when discussing platform engineering, design systems & staff leadership decisions, and explain trade-offs, risk, ownership, and measurable impact.

**16.8. Storybook**

**What:** A tool for developing, documenting, testing, and reviewing UI components in isolation.

**Interview hook:** Mention Storybook when discussing platform engineering, design systems & staff leadership decisions, and explain trade-offs, risk, ownership, and measurable impact.

**16.9. Component API Design**

**What:** Designing component props, events, variants, states, and extension points for reuse.

**Interview hook:** Mention Component API Design when discussing platform engineering, design systems & staff leadership decisions, and explain trade-offs, risk, ownership, and measurable impact.

**16.10. Accessibility Standards**

**What:** Rules and checks that ensure components and flows work for users with disabilities.

**Interview hook:** Mention Accessibility Standards when discussing platform engineering, design systems & staff leadership decisions, and explain trade-offs, risk, ownership, and measurable impact.

**16.11. Versioned Packages**

**What:** Publishing libraries with explicit versions so consumers can upgrade safely.

**Interview hook:** Mention Versioned Packages when discussing platform engineering, design systems & staff leadership decisions, and explain trade-offs, risk, ownership, and measurable impact.

**16.12. Backward Compatibility**

**What:** Ensuring changes do not break existing consumers unexpectedly.

**Interview hook:** Mention Backward Compatibility when discussing platform engineering, design systems & staff leadership decisions, and explain trade-offs, risk, ownership, and measurable impact.

**16.13. Deprecation Policy**

**What:** A clear process for warning consumers before removing or changing APIs.

**Interview hook:** Mention Deprecation Policy when discussing platform engineering, design systems & staff leadership decisions, and explain trade-offs, risk, ownership, and measurable impact.

**16.14. Governance Model**

**What:** Decision-making structure for ownership, contribution, review, and standards.

**Interview hook:** Mention Governance Model when discussing platform engineering, design systems & staff leadership decisions, and explain trade-offs, risk, ownership, and measurable impact.

**16.15. Developer Experience (DX)**

**What:** How easy, fast, and safe it is for engineers to build and operate software.

**Interview hook:** Mention Developer Experience (DX) when discussing platform engineering, design systems & staff leadership decisions, and explain trade-offs, risk, ownership, and measurable impact.

**16.16. Documentation**

**What:** Practical written guidance that helps teams use systems correctly without repeated support.

**Interview hook:** Mention Documentation when discussing platform engineering, design systems & staff leadership decisions, and explain trade-offs, risk, ownership, and measurable impact.

**16.17. Ownership Model**

**What:** Clear responsibility for code, services, incidents, roadmap, and support.

**Interview hook:** Mention Ownership Model when discussing platform engineering, design systems & staff leadership decisions, and explain trade-offs, risk, ownership, and measurable impact.

**16.18. Technical Roadmap**

**What:** A forward-looking plan that aligns technical investments with product and business goals.

**Interview hook:** Mention Technical Roadmap when discussing platform engineering, design systems & staff leadership decisions, and explain trade-offs, risk, ownership, and measurable impact.

**16.19. Architecture Review**

**What:** A review process to validate important designs, risks, alternatives, and long-term impact.

**Interview hook:** Mention Architecture Review when discussing platform engineering, design systems & staff leadership decisions, and explain trade-offs, risk, ownership, and measurable impact.

**16.20. Build vs Buy**

**What:** Decision framework for whether to build internally, adopt open source, or purchase a tool.

**Interview hook:** Mention Build vs Buy when discussing platform engineering, design systems & staff leadership decisions, and explain trade-offs, risk, ownership, and measurable impact.

**16.21. Technical Debt**

**What:** Known suboptimal design or implementation that slows future delivery or increases risk.

**Interview hook:** Mention Technical Debt when discussing platform engineering, design systems & staff leadership decisions, and explain trade-offs, risk, ownership, and measurable impact.

**16.22. Migration Strategy**

**What:** A planned approach for moving from old to new systems with minimized business disruption.

**Interview hook:** Mention Migration Strategy when discussing platform engineering, design systems & staff leadership decisions, and explain trade-offs, risk, ownership, and measurable impact.

**16.23. Stakeholder Alignment**

**What:** Creating shared understanding and agreement across product, engineering, design, QA, security, and leadership.

**Interview hook:** Mention Stakeholder Alignment when discussing platform engineering, design systems & staff leadership decisions, and explain trade-offs, risk, ownership, and measurable impact.

**16.24. Influence Without Authority**

**What:** Driving decisions and outcomes through trust, clarity, data, and collaboration rather than direct reporting control.

**Interview hook:** Mention Influence Without Authority when discussing platform engineering, design systems & staff leadership decisions, and explain trade-offs, risk, ownership, and measurable impact.

**16.25. Mentoring**

**What:** Helping engineers grow through review, coaching, examples, and feedback.

**Interview hook:** Mention Mentoring when discussing platform engineering, design systems & staff leadership decisions, and explain trade-offs, risk, ownership, and measurable impact.

**16.26. Decision Log**

**What:** A record of key decisions so future teams understand context and trade-offs.

**Interview hook:** Mention Decision Log when discussing platform engineering, design systems & staff leadership decisions, and explain trade-offs, risk, ownership, and measurable impact.

**16.27. Engineering Metrics**

**What:** Signals such as lead time, deployment frequency, change failure rate, MTTR, quality, and reliability.

**Interview hook:** Mention Engineering Metrics when discussing platform engineering, design systems & staff leadership decisions, and explain trade-offs, risk, ownership, and measurable impact.

**16.28. Cost Optimization**

**What:** Reducing infrastructure, build, tooling, or operational cost without harming reliability or velocity.

**Interview hook:** Mention Cost Optimization when discussing platform engineering, design systems & staff leadership decisions, and explain trade-offs, risk, ownership, and measurable impact.

**16.29. Incident Leadership**

**What:** Coordinating response during production issues, communicating clearly, and driving follow-up improvements.

**Interview hook:** Mention Incident Leadership when discussing platform engineering, design systems & staff leadership decisions, and explain trade-offs, risk, ownership, and measurable impact.

**16.30. Platform Adoption**

**What:** Getting teams to actually use platform capabilities by solving real pain points and reducing migration cost.

**Interview hook:** Mention Platform Adoption when discussing platform engineering, design systems & staff leadership decisions, and explain trade-offs, risk, ownership, and measurable impact.

## **Common interview questions**

**•** How do you drive adoption of a design system?

**•** How do you design a reusable component API?

**•** What is a golden path?

**•** How do you influence teams without authority?

**•** How do you balance roadmap work and technical debt?

# **Appendix A: 30-second interview templates**

## **Canary deployment**

A canary deployment releases a new version to a small percentage of production traffic first. I would start with a low percentage, monitor error rate, latency, JavaScript errors, Core Web Vitals, and business metrics, then gradually increase traffic if healthy. If metrics degrade, I would route traffic back to the previous version or disable the feature using a kill switch.

## **Decoupling legacy UI and API**

I would avoid a big-bang rewrite. I would assess coupling, define API contracts, introduce a BFF if legacy APIs are not frontend-friendly, move business logic to backend services, migrate module by module using the strangler pattern, route selected paths through a gateway or reverse proxy, and validate with contract tests, E2E smoke tests, observability, and rollback.

## **Why not all E2E tests**

E2E tests give high confidence but are slower, more expensive, and more fragile. I would cover critical user journeys with E2E, use integration tests for module boundaries, unit tests for pure logic, component tests for UI states, and contract tests for API compatibility. This balances speed, coverage, and maintainability.

## **CDN and static hosting for React**

A React production build is mostly static assets, so hosting it on object storage plus CDN improves latency, scalability, caching, and cost. The CDN serves assets from edge locations, handles compression and cache headers, and reduces load on origin. APIs still go through gateway/backend services with auth, rate limiting, and observability.

## **Feature flags**

Feature flags let us decouple deployment from release. Code can be deployed safely but exposed only to selected users, tenants, regions, or percentages. I would use flags for progressive rollout, kill switch, experimentation, and migration, but I would also manage flag lifecycle to avoid long-term complexity.

## **Microfrontend migration**

I would split by business domain, not by technical component. The shell owns shared concerns like auth, navigation, layout, and telemetry. Each remote owns its domain UI and release cycle. I would define shared contracts, avoid runtime dependency conflicts, monitor bundle cost, and migrate incrementally rather than rewriting everything at once.

## **Frontend observability**

For frontend observability, I would track JavaScript errors, API failures, Core Web Vitals, route-level performance, user/session context, release version, and business flow failures. I would connect client logs to backend traces where possible and define alerts around user impact, not just technical noise.

## **Performance optimization**

I would first measure using RUM, Lighthouse, profiler, bundle analyzer, and backend timings. Then I would identify whether the bottleneck is network, JavaScript execution, rendering, API latency, images, fonts, or data volume. I would optimize the highest-impact area, add performance budgets, and monitor regression after release.

# **Appendix B: Compact glossary by lifecycle**

## **1\. Planning & Discovery**

Business Requirements, Functional Requirements, Non-Functional Requirements (NFRs), User Story, Acceptance Criteria, Epic, Backlog Grooming, Prioritization, Stakeholder Mapping, Impact Analysis, Risk Analysis, Assumptions, Constraints, Dependencies, Scope Creep, Spike, Proof of Concept (PoC), RFC, ADR, Capacity Planning

## **2\. Architecture Patterns & Migration**

High-Level Design (HLD), Low-Level Design (LLD), Architecture Diagram, Domain Modeling, Bounded Context, Monolith, Modular Monolith, Microservices, Microfrontends, Layered Architecture, Clean Architecture, Hexagonal Architecture, Backend for Frontend (BFF), API Gateway, Service Mesh, Event-Driven Architecture, Pub/Sub, CQRS, Event Sourcing, Strangler Pattern

## **3\. Frontend Architecture & Rendering**

Single Page Application (SPA), Multi Page Application (MPA), Client-Side Rendering (CSR), Server-Side Rendering (SSR), Static Site Generation (SSG), Incremental Static Regeneration (ISR), Hydration, Progressive Hydration, Streaming, Islands Architecture, Routing, Route-Based Code Splitting, Shell/Container App, Remote Module, Shared Dependencies, Design Tokens, Theming, Accessibility-First Architecture, Internationalization (i18n), Progressive Enhancement

## **4\. React & Next.js**

React Components, Props, State, Controlled Components, Uncontrolled Components, Hooks, useState, useEffect, useMemo, useCallback, useRef, useReducer, Context API, Error Boundaries, Suspense, Lazy Loading, React.memo, Reconciliation, Virtual DOM, Fiber, Concurrent Rendering, Server Components, Client Components, Next.js App Router, Metadata API

## **5\. JavaScript Core**

Execution Context, Call Stack, Scope, Lexical Scope, Closure, Hoisting, Temporal Dead Zone (TDZ), this Binding, Prototype Chain, Classes, Event Loop, Microtasks, Macrotasks, Promise, async/await, Generator, Iterator, ES Modules, Memory Leak, Garbage Collection

## **6\. TypeScript & Code Quality**

Static Typing, Type Inference, Interface, Type Alias, Union Types, Intersection Types, Generics, Utility Types, Mapped Types, Conditional Types, Discriminated Union, Type Guards, never, unknown, any, Strict Mode, ESLint, Prettier, SonarQube, Code Smell

## **7\. API Design & Integration**

REST, GraphQL, gRPC, OpenAPI/Swagger, API Contract, Contract-First Design, API Versioning, Pagination, Offset Pagination, Cursor Pagination, Filtering and Sorting, Error Model, Request Validation, Response Normalization, Idempotency, Rate Limiting, Retry, Exponential Backoff, Circuit Breaker, Webhook

## **8\. State, Data Fetching & Caching**

Client State, Server State, Global State, Local Component State, Derived State, Redux, Redux Toolkit (RTK), Context API, Zustand, React Query, RTK Query, SWR, Cache Invalidation, Optimistic Updates, Pessimistic Updates, Normalized Store, Selectors, Middleware, Persistence, Offline Support

## **9\. Testing & Quality Engineering**

Test Pyramid, Unit Testing, Integration Testing, End-to-End Testing, Component Testing, Contract Testing, Smoke Testing, Sanity Testing, Regression Testing, Visual Regression Testing, Snapshot Testing, Accessibility Testing, Performance Testing, Load Testing, Stress Testing, Chaos Testing, Mocking, Stubbing, Spying, Fake Timers, MSW, Jest/Vitest, React Testing Library, Cypress, Playwright

## **10\. CI/CD, Build & Tooling**

Continuous Integration (CI), Continuous Delivery, Continuous Deployment, Pipeline, Build Artifact, Docker Image, Image Registry, Multi-Stage Docker Build, Dependency Caching, Monorepo Builds, Nx Affected, Turborepo Cache, Semantic Versioning, Changesets, Release Notes, GitHub Actions, Jenkins, Helm Chart, Kubernetes Namespace, Artifact Promotion

## **11\. Deployment & Release Strategies**

Rolling Deployment, Canary Deployment, Blue-Green Deployment, Feature Flag Rollout, Dark Launch, A/B Testing, Shadow Traffic, Traffic Splitting, Zero-Downtime Deployment, Rollback, Roll Forward, Immutable Deployment, Environment Promotion, Production Readiness Checklist, Release Train, Hotfix, Kill Switch, Backward Compatibility, Database Migration, API Compatibility

## **12\. Infrastructure, Scalability & Reliability**

CDN, Reverse Proxy, NGINX, Load Balancer, API Gateway, Edge Computing, Horizontal Scaling, Vertical Scaling, Auto Scaling, Kubernetes Ingress, Service Discovery, Health Check, Readiness Probe, Liveness Probe, Timeout, Bulkhead, Failover, Disaster Recovery, RTO, RPO

## **13\. Web Performance & Core Web Vitals**

Core Web Vitals, Largest Contentful Paint (LCP), Interaction to Next Paint (INP), Cumulative Layout Shift (CLS), Time to First Byte (TTFB), First Contentful Paint (FCP), Bundle Size, Tree Shaking, Code Splitting, Lazy Loading, Preload, Prefetch, Brotli/Gzip, Image Optimization, Font Optimization, Virtualization, Memoization, Web Workers, Service Workers, Lighthouse

## **14\. Security & Privacy**

Authentication, Authorization, OAuth2, OIDC, JWT, Refresh Token, Session Cookie, SameSite Cookie, Secure/HttpOnly Cookie, LocalStorage Risk, XSS, CSRF, CORS, CSP, HSTS, Clickjacking, SQL Injection, Dependency Vulnerability, Secrets Management, PII Handling

## **15\. Observability & Production Operations**

Observability, Monitoring, Logging, Metrics, Distributed Tracing, APM, RUM, Synthetic Monitoring, Sentry, Prometheus, Grafana, ELK, OpenTelemetry, Alerting, Dashboard, SLI, SLO, SLA, Error Budget, Incident Postmortem

## **16\. Platform Engineering, Design Systems & Staff Leadership**

Internal Developer Platform, Golden Path, Self-Service, Scaffolding, Internal CLI, Design System, Component Library, Storybook, Component API Design, Accessibility Standards, Versioned Packages, Backward Compatibility, Deprecation Policy, Governance Model, Developer Experience (DX), Documentation, Ownership Model, Technical Roadmap, Architecture Review, Build vs Buy, Technical Debt, Migration Strategy, Stakeholder Alignment, Influence Without Authority, Mentoring, Decision Log, Engineering Metrics, Cost Optimization, Incident Leadership, Platform Adoption
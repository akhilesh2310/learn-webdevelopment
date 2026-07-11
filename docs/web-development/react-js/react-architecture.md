---
title: React Architecture
sidebar_position: 12
---

# React Architecture

Related pages: [Frontend Architecture](../frontend-architecture/), [Folder Structure](../frontend-architecture/folder-structure.md), [State Management](state-management.md), [Advanced React Patterns](advanced-react-patterns.md), [Micro Frontends](../frontend-architecture/micro-frontends.md).

## Ownership

Use this page for scalable React architecture, feature/domain structure, monorepos, design systems, shared component libraries, micro frontends, and senior/staff-level architecture answers.

## React Architecture

## Feature Based Structure

## Domain Driven Structure

## Monorepo

## Design Systems

## Shared Component Libraries

## Micro Frontends

## Common Interview Topics

* Scaling React applications

## React Architecture

React architecture means how we organize components, state, routes, APIs, shared utilities, design system, build system, testing, and deployment so the app can scale with features, teams, and business complexity.

For senior/staff interviews, the best answer is not just folder structure. The best answer should cover:

Code organization
Feature ownership
Shared components
State boundaries
API layer
Performance
Testing
Deployment
Team scalability

---

## 1. What is React Architecture?

## Simple meaning

React architecture is the structure and design of a React application so it remains maintainable as it grows.

A small React app can survive with simple folders like:

components/
pages/
utils/

But a large app needs clearer boundaries:

features/
shared/
app/
services/
design-system/

## Good React architecture should solve

* Where should components live?
* Where should API calls live?
* How should state be managed?
* How do teams own features?
* How do we reuse components?
* How do we avoid duplicate code?
* How do we test features?
* How do we split bundles?
* How do we deploy independently if needed?
* How do we keep UI consistent?

## Interview-ready answer

React architecture is about organizing the application around clear boundaries so it can scale. It includes folder structure, feature ownership, shared components, state management, API layer, routing, testing, performance, design system, and deployment strategy.

---

## 2. Feature-Based Structure

## Simple meaning

Feature-based structure organizes code by business feature instead of technical type.

Instead of this:

components/
hooks/
services/
utils/
pages/

Use this:

features/
  campaigns/
  reports/
  creatives/
  users/
shared/
app/

## Example structure

src/
  app/
    routes/
    providers/
    store/
    App.tsx

  features/
    campaigns/
      components/
      hooks/
      api/
      types/
      utils/
      pages/
      index.ts

    reports/
      components/
      hooks/
      api/
      types/
      pages/
      index.ts

  shared/
    components/
    hooks/
    utils/
    api/
    types/

## Key mental model

Keep feature-specific code inside the feature.

Campaign-specific table → features/campaigns/components
Campaign-specific API → features/campaigns/api
Campaign-specific hooks → features/campaigns/hooks
Reusable Button → shared/components

## Why feature-based structure scales well

* Easier feature ownership.
* Easier onboarding.
* Less confusion about where code belongs.
* Reduces accidental coupling.
* Easier deletion of old features.
* Easier lazy loading by feature.
* Works well for team-based development.

## Common mistake

Putting everything into `shared`.

Bad:

shared/
  components/
    CampaignTable.tsx
    ReportFilters.tsx
    CreativeReviewModal.tsx

These are not truly shared. They belong to their feature.

## Rule of thumb

Move code to `shared` only after it is reused by multiple features and has a stable generic API.

## Interview-ready answer

Feature-based structure organizes code by business capability. Each feature owns its components, hooks, API calls, types, and pages. Shared code is kept separately only when it is truly reusable. This scales better than grouping everything by technical folder because ownership and boundaries are clearer.

---

## 3. Domain-Driven Structure

## Simple meaning

Domain-driven structure organizes frontend code around business domains.

It is similar to feature-based structure but more focused on business concepts and boundaries.

Example domains:

campaigns
creatives
reports
billing
users
permissions
inventory

## Example

src/
  domains/
    campaign/
      model/
      api/
      ui/
      hooks/
      routes/

    creative/
      model/
      api/
      ui/
      hooks/
      routes/

    reporting/
      model/
      api/
      ui/
      hooks/
      routes/

  shared/
    ui/
    lib/
    config/

## Key mental model

Domain-driven frontend architecture asks:

What business area owns this logic?

Not:

Is this a component or hook?

## Domain layer examples

domain/campaign/model
→ Campaign types, campaign status, campaign validation

domain/campaign/api
→ Campaign API functions

domain/campaign/ui
→ Campaign-specific UI components

domain/campaign/hooks
→ Campaign-specific hooks

## Why useful

* Good for large business apps.
* Aligns code with product/domain language.
* Helps teams own business areas.
* Reduces cross-domain coupling.
* Easier to reason about complex workflows.
* Works well with microfrontends and monorepos.

## Common mistake

Over-engineering domain structure for small apps.

For small apps, simple feature-based structure is enough. Domain-driven structure is more useful when the business complexity is high.

## Interview-ready answer

Domain-driven React structure organizes code around business domains like campaigns, reports, users, or billing. It helps large teams align frontend code with product ownership and business language. It is useful when the app has complex business workflows and multiple teams owning different domains.

---

## 4. Feature-Based vs Domain-Driven Structure

## Simple comparison

| Point | Feature-Based | Domain-Driven |
| ----- | ----- | ----- |
| Focus | UI/product features | Business domains |
| Best for | Medium to large apps | Large complex business apps |
| Ownership | Feature teams | Domain teams |
| Example | `features/search` | `domains/booking` |
| Complexity | Moderate | Higher |
| Risk | Shared folder misuse | Over-engineering |

## Interview-ready answer

Feature-based structure groups code by product features, while domain-driven structure groups code by business domains. Both are better than purely technical folders for large apps. I would choose feature-based for most React apps and move toward domain-driven boundaries when business complexity and team ownership grow.

---

## 5. Monorepo

## Simple meaning

A monorepo keeps multiple apps and packages in one repository.

Example:

repo/
  apps/
    admin-portal/
    customer-web/
    storybook/

  packages/
    ui/
    eslint-config/
    ts-config/
    utils/
    api-client/
    design-tokens/

## Key mental model

One repository, many projects.

A monorepo is useful when multiple apps share code, tooling, components, and standards.

## Common monorepo tools

* Nx
* Turborepo
* pnpm workspaces
* Yarn workspaces
* npm workspaces

## Why monorepo is useful

* Shared components.
* Shared TypeScript config.
* Shared ESLint/prettier config.
* Shared utility packages.
* Shared API clients.
* Consistent tooling.
* Easier cross-package refactoring.
* Better visibility across teams.
* Build caching and affected builds with tools like Nx/Turborepo.

## Example packages

packages/
  ui/
    Button.tsx
    Modal.tsx
    DataTable.tsx

  api-client/
    campaignApi.ts
    reportingApi.ts

  design-tokens/
    colors.ts
    spacing.ts

  utils/
    date.ts
    formatCurrency.ts

## Monorepo trade-offs

* Requires strong ownership.
* Build pipeline can become complex.
* Versioning strategy is important.
* Bad boundaries can create tight coupling.
* CI/CD must support affected builds.
* Large repo can slow down without caching.

## Interview-ready answer

A monorepo stores multiple apps and shared packages in one repository. It is useful when teams need shared components, utilities, design tokens, API clients, and consistent tooling. For large apps, monorepo tools like Nx or Turborepo help with dependency graph, build caching, affected builds, and scalable CI. The main challenge is maintaining clear package boundaries and ownership.

---

## 6. Design Systems

## Simple meaning

A design system is a collection of reusable UI components, design tokens, guidelines, and patterns that keep product UI consistent.

## Design system includes

Design tokens
Reusable components
Accessibility rules
Component documentation
Usage guidelines
Theming
Testing
Versioning

## Design tokens

Design tokens are reusable design values.

\export const tokens \= \{
  colors: \{
    primary: "\#2563eb",
    danger: "\#dc2626",
  \},
  spacing: \{
    sm: "8px",
    md: "16px",
    lg: "24px",
  \},
\};

## Component examples

Button
Input
Select
Modal
Tooltip
Tabs
DataTable
DatePicker
Toast
Drawer
Pagination

## Why design systems matter

* UI consistency.
* Faster development.
* Better accessibility.
* Less duplicate UI code.
* Easier theming.
* Shared language between design and engineering.
* Better quality through reusable tested components.

## Storybook

Storybook is commonly used to document and test design-system components.

Good Storybook setup includes:

* Component examples.
* Props documentation.
* Interaction states.
* Accessibility checks.
* Visual regression testing.
* Usage guidelines.

## Common mistake

A design system should not become a dumping ground for feature-specific components.

Bad:

design-system/
  CampaignApprovalTable.tsx
  HotelSearchWidget.tsx

Better:

design-system/
  Button.tsx
  DataTable.tsx
  Modal.tsx

features/
  campaigns/
    CampaignApprovalTable.tsx

## Interview-ready answer

A design system provides reusable components, design tokens, accessibility standards, and documentation to keep UI consistent across products. It improves development speed and quality, but it must stay generic. Feature-specific components should remain inside features, not inside the design system.

---

## 7. Shared Component Libraries

## Simple meaning

A shared component library is a reusable package of components used across multiple apps or features.

Example:

@company/ui
@company/design-tokens
@company/icons

## Good shared component design

A shared component should be:

* Reusable.
* Accessible.
* Well-typed.
* Theme-aware.
* Tested.
* Documented.
* Not tightly coupled to one feature.
* Flexible enough without becoming too complex.

## Example

type ButtonProps \= \{
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () \=\> void;
\};

function Button(\{
  variant \= "primary",
  size \= "md",
  disabled,
  children,
  onClick,
\}: ButtonProps) \{
  return (
    \<button
      className=\{\`btn btn-$\{variant\} btn-$\{size\}\`\}
      disabled=\{disabled\}
      onClick=\{onClick\}
    \>
      \{children\}
    \</button\>
  );
\}

## Versioning approaches

### In monorepo

Shared packages can be consumed through workspace references.

apps/admin imports packages/ui

### In separate package

Publish to private npm registry.

@company/ui@1.4.0

## Challenges

* Breaking changes.
* Version mismatch.
* Component API design.
* Theme customization.
* Accessibility ownership.
* Design-engineering sync.
* Documentation maintenance.
* Backward compatibility.

## Interview-ready answer

A shared component library provides reusable UI components across apps or teams. A good shared component is generic, accessible, typed, documented, tested, and theme-aware. The main challenge is API stability and versioning because many apps may depend on the same component.

---

## 8. Micro Frontends

## Simple meaning

Micro Frontends split a large frontend application into smaller independently owned and deployable frontend applications.

Shell App
  ├── Campaign MFE
  ├── Reports MFE
  ├── Creative Review MFE
  └── Admin MFE

## Key mental model

Micro Frontends are like microservices for frontend teams.

Each team owns one vertical slice of the frontend.

## Common implementation approaches

* Module Federation
* Single-SPA
* Web Components
* iframe-based integration
* Build-time integration through packages
* Route-level app composition

## Shell and remote model

Shell / Container App
  → handles routing, layout, auth, navigation

Remote Apps
  → own feature-specific UI and logic

Example:

/admin/campaigns → Campaign MFE
/admin/reports   → Reports MFE
/admin/creatives → Creative Review MFE

## Why use Micro Frontends

Use Micro Frontends when:

* App is very large.
* Multiple teams need independent ownership.
* Teams need independent deployments.
* Different features have different release cycles.
* Legacy migration is needed.
* Large monolith UI slows development.
* Teams need strong domain boundaries.

## Benefits

* Independent development.
* Independent deployment.
* Clear team ownership.
* Smaller domain-specific apps.
* Easier legacy migration.
* Fault isolation at feature level.
* Teams can scale independently.

## Challenges

* Shared dependency management.
* Bundle size duplication.
* Runtime integration complexity.
* Cross-MFE communication.
* Routing coordination.
* Authentication sharing.
* Design consistency.
* Version mismatch.
* Testing across MFEs.
* Deployment orchestration.
* Performance monitoring.

## Cross-MFE communication

Prefer clear contracts.

Options:

Props from shell
Shared auth/session service
Custom events
Shared event bus
Shared store carefully
URL/query params
Backend/API as source of truth

Avoid random global variables and hidden coupling.

## Module Federation example mental model

Shell imports remote module at runtime

campaignApp/CampaignRoutes
reportsApp/ReportsRoutes

## What should be shared?

Usually share:

* React and React DOM as singleton
* Design system
* Design tokens
* Auth utilities
* API client contracts
* Logging/monitoring utilities

Do not over-share feature logic across MFEs because it creates coupling.

## Interview-ready answer

Micro Frontends split a large frontend into independently owned and deployable applications. A shell app handles common layout, routing, auth, and integration, while remote apps own domain features. They are useful for large organizations and independent teams, but they add complexity around shared dependencies, routing, communication, performance, testing, and design consistency.

---

## 9. Scaling React Applications

## Simple meaning

Scaling a React app means keeping it maintainable and performant as features, codebase, teams, and users grow.

## Key areas to scale

### 1. Code organization

Use feature/domain structure.

features/
shared/
app/

### 2. State management

Choose state based on ownership.

Local state → useState/useReducer
Shared app state → Context/Redux/Zustand
Server state → React Query/RTK Query/SWR/Apollo

### 3. API layer

Do not scatter fetch calls everywhere.

Better:

features/reports/api/reportApi.ts
shared/api/httpClient.ts

### 4. Component architecture

Separate:

Page components
Feature components
Shared UI components
Design-system components

### 5. Performance

Use:

* Code splitting.
* Lazy loading.
* Memoization where needed.
* List virtualization.
* Bundle analysis.
* Image optimization.
* Avoid unnecessary re-renders.
* Proper server-state caching.

### 6. Testing

Use test pyramid:

Unit tests
Integration tests
E2E tests
Visual regression tests
Accessibility tests

### 7. Build and deployment

For large apps:

* CI/CD pipeline.
* Build caching.
* Affected builds.
* Preview environments.
* Automated smoke tests.
* Versioned packages.
* Monitoring and rollback.

### 8. Team ownership

Define boundaries:

Team A owns campaigns
Team B owns reports
Team C owns design system
Team D owns platform shell

## Interview-ready answer

To scale a React app, I organize code by feature or domain, keep shared code generic, use a design system for consistency, separate client state from server state, define a clean API layer, lazy load large routes, optimize performance with measurement, and enforce testing and CI/CD. At team scale, clear ownership and boundaries are as important as technical choices.

---

## 10. Architecture Decision Guide

## Simple decision table

| Problem | Recommended approach |
| ----- | ----- |
| Small app | Simple feature-based structure |
| Medium app | Feature-based \+ shared layer |
| Complex business app | Domain-driven structure |
| Multiple apps sharing code | Monorepo |
| UI consistency issue | Design system |
| Reused generic components | Shared component library |
| Large teams independent deployment | Micro Frontends |
| API data complexity | Server-state library |
| Performance issue | Measure first, then optimize |
| Team ownership issue | Domain boundaries |

## Interview-ready answer

Architecture should match the problem size. I would not start with microfrontends for a small app. I would start with feature-based structure, add shared packages and a design system as reuse grows, use a monorepo when multiple apps share code, and consider microfrontends only when independent team ownership and deployment become important.

---

## Common Interview Topics / Questions

---

## 1. How do you scale a React application?

## Answer

I scale React applications across code, state, performance, testing, and team ownership.

Key points:

* Organize code by feature/domain.
* Keep shared code truly reusable.
* Use design system for consistency.
* Separate client state and server state.
* Use route-based code splitting.
* Use lazy loading for heavy features.
* Use React Query/RTK Query for server state.
* Use Redux/Zustand only when global client state needs it.
* Use Storybook for shared components.
* Add unit, integration, E2E, visual, and accessibility testing.
* Use CI/CD, linting, type checks, and bundle analysis.
* Define ownership boundaries for teams.

## Interview-ready answer

To scale a React app, I start with feature-based architecture, clear state ownership, reusable shared components, and a clean API layer. As the app grows, I introduce a design system, monorepo packages, server-state caching, route-level code splitting, and strong testing/CI. For very large team-owned domains, I may consider microfrontends.

---

## 2. Feature-based vs technical folder structure

## Technical structure

components/
hooks/
utils/
api/

This is fine for small apps.

## Feature-based structure

features/
  reports/
    components/
    hooks/
    api/
    types/

Better for large apps.

## Interview-ready answer

Technical folders group files by file type, which works for small apps. Feature-based folders group files by business feature, which works better for large apps because related components, hooks, APIs, and types stay together. This improves ownership, maintainability, and feature deletion.

---

## 3. What should go into shared folder?

## Answer

Only generic reusable code should go into shared.

Good shared examples:

Button
Modal
useDebounce
formatDate
httpClient
types shared across domains

Bad shared examples:

CampaignApprovalModal
HotelSearchFilter
ReportSpecificTable

## Interview-ready answer

Shared should contain stable reusable code used by multiple features. Feature-specific components should stay inside their feature. Moving code to shared too early creates coupling and makes the shared layer messy.

---

## 4. How do you design a component library?

## Answer

A component library should include:

* Reusable generic components.
* Design tokens.
* TypeScript types.
* Accessibility support.
* Theming support.
* Storybook documentation.
* Unit and interaction tests.
* Visual regression tests.
* Versioning and changelog.
* Clear contribution guidelines.

## Interview-ready answer

I design a component library as a product. Components should be accessible, typed, documented, theme-aware, tested, and stable. Storybook helps with documentation and review. Versioning and backward compatibility are important because many apps may consume the same components.

---

## 5. Design System vs Component Library

## Simple comparison

| Point | Design System | Component Library |
| ----- | ----- | ----- |
| Scope | Design \+ engineering system | Code components |
| Includes | Tokens, guidelines, patterns, components | React components |
| Audience | Designers \+ developers | Mostly developers |
| Example | Color rules, spacing, UX patterns | Button, Modal, Input |
| Goal | Consistency | Reuse |

## Interview-ready answer

A component library is the coded implementation of reusable components. A design system is broader: it includes design tokens, UX guidelines, accessibility standards, patterns, documentation, and components. The component library is one part of the design system.

---

## 6. Monorepo vs Polyrepo

## Simple comparison

| Point | Monorepo | Polyrepo |
| ----- | ----- | ----- |
| Code location | One repo | Many repos |
| Sharing | Easier | Requires package publishing |
| Refactoring | Easier across packages | Harder across repos |
| Tooling consistency | Easier | Needs duplication |
| CI complexity | Needs affected builds/cache | Smaller isolated CI |
| Ownership | Needs boundaries | Clear repo ownership |

## Interview-ready answer

A monorepo is useful when multiple apps share components, utilities, configs, and API clients. It improves consistency and cross-package refactoring. A polyrepo gives stronger isolation but makes sharing and coordinated changes harder. For large frontend platforms, monorepo works well if boundaries, ownership, and CI caching are properly handled.

---

## 7. When should you use Micro Frontends?

## Answer

Use microfrontends when organizational scale needs it, not just because it sounds modern.

Use them when:

* Multiple teams own different domains.
* Independent deployment is required.
* The frontend monolith is too large.
* Legacy migration needs gradual replacement.
* Different features have separate release cycles.
* Strong domain isolation is needed.

Avoid them when:

* One small team owns the app.
* Deployment can remain unified.
* Shared state is tightly coupled.
* App complexity does not justify runtime integration cost.

## Interview-ready answer

I would use microfrontends when team independence, domain ownership, and independent deployments are more important than the added integration complexity. I would avoid them for small teams or apps where a modular monolith is enough.

---

## 8. Micro Frontends challenges

## Answer

Main challenges:

* Shared dependency versioning.
* Runtime failures.
* Bundle duplication.
* Routing integration.
* Auth/session sharing.
* Cross-app communication.
* Design consistency.
* Testing full user journeys.
* Deployment coordination.
* Monitoring and rollback.

## Interview-ready answer

Microfrontends solve team-scaling problems but add runtime integration complexity. The main challenges are shared dependency management, cross-MFE communication, routing, auth, design consistency, testing, bundle size, and deployment coordination. A strong shell architecture and clear contracts are essential.

---

## 9. How do you handle shared state in Micro Frontends?

## Answer

Avoid too much shared client state.

Prefer:

* URL params for navigation state.
* Backend/API as source of truth.
* Shell-provided auth/session.
* Custom events for decoupled events.
* Shared store only for truly global state.
* Clear contracts between shell and remotes.

## Interview-ready answer

In microfrontends, I avoid a large shared global store because it couples teams. I prefer URL state, backend APIs, shell-provided auth/session, and event-based communication for cross-MFE events. If shared state is needed, it should be small, stable, and contract-driven.

---

## 10. How do you prevent architecture from becoming messy?

## Answer

Use rules and boundaries:

* Feature ownership.
* Shared code review.
* Dependency rules.
* Lint boundaries.
* TypeScript strict mode.
* Storybook for shared UI.
* Testing standards.
* Architecture decision records.
* Code owners.
* Bundle budgets.
* Regular cleanup.

## Interview-ready answer

Architecture stays clean when boundaries are enforced. I use feature/domain ownership, shared code guidelines, lint rules, code owners, TypeScript, testing standards, Storybook, bundle budgets, and architecture decision records. Without governance, even good architecture becomes messy over time.

---

## Quick Revision Summary

| Topic | Key point |
| ----- | ----- |
| React architecture | Structure for scalable UI development |
| Feature-based | Organize by product feature |
| Domain-driven | Organize by business domain |
| Monorepo | Multiple apps/packages in one repo |
| Design system | Tokens, guidelines, components, patterns |
| Component library | Reusable coded UI components |
| Micro Frontends | Independently owned/deployed frontend apps |
| Shell app | Hosts layout, routing, auth, integration |
| Shared folder | Only stable reusable code |
| Server state | Use query/cache tools |
| Scaling | Code, state, performance, testing, teams |
| Governance | Boundaries, ownership, standards |

---

## Final Interview-Ready Combined Answer

To scale React applications, I start with clear feature-based or domain-driven architecture. Feature-specific code stays inside its feature, while truly reusable components, hooks, utilities, and API clients go into shared packages. For UI consistency, I introduce a design system with tokens, reusable components, accessibility rules, and Storybook documentation. If multiple apps share code, a monorepo helps manage shared libraries, configs, and build caching. For very large organizations, microfrontends can provide independent team ownership and deployment, but they add complexity in routing, shared dependencies, communication, testing, and performance. A strong React architecture is not only about folders; it is about boundaries, ownership, state strategy, performance, testing, CI/CD, and long-term maintainability.

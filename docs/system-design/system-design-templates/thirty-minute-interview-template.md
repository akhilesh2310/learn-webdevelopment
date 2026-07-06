---
title: "30-Minute Interview Template"
sidebar_position: 3
---

# 30-Minute Interview Template

## Mock System Design Prompt

### Design a Collaborative Document Editor (Like Google Docs)

Practice prompt: **"Design a Collaborative Document Editor (like Google Docs)"** — focused on the **Frontend** for a Staff Software Engineer (L6) interview.

For the full problem-specific prompt, requirements, solution outline, and notes, see [Google Docs](../frontend-system-design/design-google-docs.md).

## Pro Tips for Answering Component Design

* **Start with UX expectations:** who uses it, where, on what device

* **Discuss the API/Props**: controlled/uncontrolled, configuration flexibility

* **Accessibility matters**: ARIA, tabIndex, screen readers

* **State & side effects**: internal state vs global context

* **Styling strategy**: Tailwind, CSS modules, custom themes

* **Performance**: debouncing, memoization, virtualization

* **Reusability**: generic typing, slots/children, composability

* **Testing strategy**: Unit + visual regression (Storybook + Chromatic)

* **Versioning / rollout**: How to ship with confidence

---

## Evaluation Rubric for L6 Frontend System Design

| Category | What to Demonstrate | Excellent Criteria |
| ----- | ----- | ----- |
| **Problem Framing** | Asking clarifying questions, scoping | Clear, structured narrowing of scope with assumptions listed |
| **Frontend Architecture** | Component decomposition, app structure | Modular, scalable, well-separated layers (presentation, data, state) |
| **Real-Time Collaboration** | Sync model, performance, UX | CRDT/OT tradeoffs, latency handling, UX for collisions |
| **State Management** | Handling local/global/shared state | Thoughtful use of libraries/tools, normalized and performant |
| **Performance** | Lazy loading, rendering strategy | Concrete strategies with justifications and trade-offs |
| **Accessibility & UX** | Inclusiveness, responsiveness | ARIA, keyboard support, responsive layout decisions |
| **Communication** | Explaining trade-offs, visual aid use | Clear articulation + Google Drawings (or whiteboard) |
| **Leadership** | Mentorship, cross-team thinking | Proactive collaboration & scale implications, long-term vision |

---

## Want to Practice Now?

Start with the [Question Bank](../system-design-question-bank/index.md), then open a dedicated design problem page for a full solution.

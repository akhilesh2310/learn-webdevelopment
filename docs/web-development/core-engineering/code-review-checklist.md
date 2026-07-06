---
title: Code Review Checklist
sidebar_position: 12
---

# Code Review Checklist

For code review, I don’t only check whether the code works. I review it from multiple angles: correctness, readability, maintainability, performance, security, testing, and long-term impact on the codebase.

For a React or full-stack app, my code review checklist usually includes:

1\. Requirement and correctness

\- Does the code actually solve the requirement?

\- Are edge cases handled?

\- Are loading, empty, error, and success states covered?

\- Is the API contract followed correctly?

2\. React component quality

\- Is the component small and focused?

\- Are props clear and typed properly?

\- Is state kept at the right level?

\- Are unnecessary re-renders avoided?

\- Are hooks used correctly?

\- Is business logic separated from UI where needed?

3\. Code readability and maintainability

\- Is the code easy to understand?

\- Are names meaningful?

\- Is there duplicate code?

\- Can future developers safely extend this?

\- Is the folder structure consistent with the project?

4\. Performance

\- Are expensive calculations memoized when needed?

\- Are large lists virtualized if required?

\- Are unnecessary API calls avoided?

\- Are assets optimized?

\- Is code splitting or lazy loading needed?

5\. Accessibility

\- Are semantic HTML elements used?

\- Are labels, alt text, keyboard navigation, and focus states handled?

\- Are ARIA attributes used only when needed?

\- Can the feature work without a mouse?

6\. Security

\- Are user inputs validated?

\- Is XSS avoided?

\- Are tokens handled safely?

\- Is sensitive data not exposed in logs or frontend code?

\- Are APIs protected with proper auth and authorization checks?

7\. API and backend review

\- Are API responses consistent?

\- Are errors handled properly?

\- Is validation done on the server side?

\- Are DB queries optimized?

\- Are transactions used where data consistency matters?

\- Are proper HTTP status codes used?

8\. Testing

\- Are unit tests added for pure logic?

\- Are component tests added for important UI behavior?

\- Are integration tests added for API/UI flow?

\- Are critical user journeys covered in E2E?

\- Are mocks realistic, for example using MSW?

9\. Observability

\- Are useful logs added where needed?

\- Are errors captured properly?

\- Are important events measurable?

\- Are we avoiding noisy logs?

10\. Review behavior

\- I keep comments respectful and specific.

\- I explain why something should change, not just what is wrong.

\- I separate blocking issues from suggestions.

\- I try to catch architectural problems early, not only syntax issues.

In code review, I check correctness first, then maintainability, performance, security, accessibility, testing, and consistency with our architecture.

For React apps, I look at component responsibility, state placement, hook usage, rendering performance, accessibility, and reusable patterns.

For full-stack apps, I also review API contracts, validation, authorization, error handling, database queries, transactions, and observability.

I also focus on review quality. I give clear, respectful feedback, mark what is blocking versus optional, and explain the reason behind my suggestions. The goal is not just to approve code, but to improve code quality and team standards over time.

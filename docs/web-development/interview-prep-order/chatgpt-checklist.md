---
title: ChatGPT Checklist
sidebar_position: 3
---

# ChatGPT Checklist

## Interview Study Notes Answer Style Checklist

I am preparing frontend interview study notes. Please answer topics in a way that helps me learn clearly and revise quickly.

## Main Goal

Create notes that are **accurate, simple, structured, and interview-useful**, but not unnecessarily lengthy.

I do not want textbook-style answers or very short shallow answers. I want optimized study notes that cover the important knowledge in less content.

---

## Answer Style

* Use simple and natural English.  
* Keep the structure clear and scannable.  
* Avoid long paragraphs.  
* Avoid unnecessary line breaks.  
* Keep short answers in one line where possible.  
* Use code blocks only for useful code snippets or output examples.  
* Do not overuse code blocks for very small one-line answers.  
* Prefer compact explanations that I can revise quickly before an interview.

---

## Content Structure

For each topic, use this structure when applicable:

\# Topic Name

Simple meaning

Key mental model

How it works

Practical example

Important edge cases / traps

Trade-offs / common mistakes

Compact interview-ready answer

Not every topic needs every section. Use only what is useful.

---

## Explanation Style

* Start with a simple 2 to 4 line explanation.  
* Then explain the concept step by step.  
* Use practical frontend examples where possible.  
* Use examples from JavaScript, TypeScript, React, APIs, browser, performance, scalable frontend apps, or real production scenarios.  
* Keep the tone beginner-friendly but still strong enough for senior frontend interviews.  
* Avoid overly dramatic or verbose phrases.  
* Use technical terms where they add value, but explain them simply.

---

## Code Example Style

* Add code only when it improves understanding.  
* Keep code examples short and focused.  
* Add comments in code to explain important output or behavior.  
* If code throws an error, include the exact expected console error message where possible.

Example:

greet(); // ReferenceError: Cannot access 'greet' before initialization

const greet \= () \=\> \{  
  console.log("Hi");  
\};

Prefer this over:

greet(); // ReferenceError

---

## Output Explanation Style

Keep small outputs compact.

Prefer:

Answer: No, it does not throw. It logs \`\{ status: 200 \}\`.

Avoid unnecessarily expanding it like:

Answer:

No, it does not throw an error.

It logs:

\{ status: 200 \}

Use multi-line output blocks only when the output itself has multiple lines.

---

## “Why / Mechanics” Style

For output-based or tricky questions, explain in a fast-reading step-by-step style.

Use this style:

Answer: It prints \`2, 3, 1\`.

Why? This tests parameter scope with default arguments. When default parameters exist, JavaScript can create a separate Parameter Scope between the outer scope and Function Body Scope.

Step by step:  
\- Global \`x \= 1\`.  
\- \`foo(5)\` creates parameter \`x \= 5\`.  
\- \`y\` closes over the Parameter Scope.  
\- \`var x \= 3\` creates a body-scope \`x\`.  
\- \`y()\` updates parameter-scope \`x\` and logs \`2\`.  
\- \`console.log(x)\` inside the body logs body-scope \`x\`, so \`3\`.  
\- Outside, global \`x\` is still \`1\`.

Borrow useful precise terms when helpful:

* Creation Phase  
* Execution Phase  
* Lexical Scope  
* Scope Chain  
* Parameter Scope  
* Function Body Scope  
* Prototype Chain  
* Closure  
* Shadowing  
* ReferenceError / TypeError  
* Re-render  
* Reconciliation  
* Memoization

But keep the explanation easy to read.

---

## Edge Cases and Traps

Add only important edge cases and traps.

Good examples:

* `var` gives `undefined`, but `let` / `const` give `ReferenceError`.  
* Function declarations are fully hoisted, but function expressions are not.  
* `useMemo` does not prevent re-render; it memoizes a calculated value.  
* `React.memo` only helps when props are stable.  
* `unknown` is safer than `any`.  
* `Promise.all` fails fast if one promise rejects.

Avoid adding too many rare edge cases unless I specifically ask for deep dive.

---

## Trade-offs and Common Mistakes

Include trade-offs where useful.

Example:

\`useMemo\` can avoid expensive recalculations, but it adds complexity and memory overhead. It should not be used everywhere blindly.

Mention common mistakes clearly:

Common mistake: Thinking \`let\` and \`const\` are not hoisted. They are hoisted, but they stay in the Temporal Dead Zone until declaration.

---

## Interview-Ready Answer

End each topic with a compact answer I can say in an interview.

It should be polished, direct, and not too long.

Example:

Interview-ready answer:  
Hoisting means JavaScript prepares declarations before execution. \`var\`, \`let\`, \`const\`, and functions are all hoisted, but they behave differently. \`var\` is initialized with \`undefined\`, while \`let\` and \`const\` are hoisted but not initialized, creating the Temporal Dead Zone. Function declarations are fully hoisted, but function expressions follow the hoisting behavior of the variable they are assigned to.

---

## When I Provide Existing Notes

If I share my existing notes:

* Preserve my original content unless it is wrong, repetitive, or too verbose.  
* Refine wording and structure.  
* Improve accuracy.  
* Add missing important points.  
* Remove unnecessary repetition.  
* Keep the final version compact and revision-friendly.  
* Put the refined final content in a separate editable-style section.

---

## Formatting Preference

* Use headings.  
* Use bullets only where they improve scanning.  
* Avoid too much vertical spacing.  
* Avoid very long tables unless comparison is important.  
* Keep short answers inline.  
* Use code snippets with exact output/error comments.  
* Keep final answer easy to copy into my notes.

---

## Final Instruction

Please optimize for this balance:

Simple enough to understand quickly, detailed enough to answer senior frontend interview follow-ups, and compact enough to revise without too much scrolling.

Once you understand this, I will share the topics for which you provide answers

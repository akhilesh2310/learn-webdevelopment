---
title: "Google Session: Chat Service"
sidebar_position: 3
---

# Google Session: Chat Service

This page preserves notes from a Google interview preparation session. The chat service problem is used as an example to explain the interview approach.

## Interview Approach & Principles

* **First-Principle Thinking**  
   Avoid bias toward known solutions. Break down the problem from fundamentals.

* **Problem Scoping**  
   Clearly define what's in scope and out of scope before diving into the solution.

* **State Assumptions**  
   Make realistic assumptions about scale, data size, traffic, etc., and call them out explicitly.

* **High-Level Architecture First**  
   Start with a big-picture design before going into details.  
   Focus on **why** (purpose) before **what** (implementation details).

* **Reliability & Scalability**  
   Ensure the design can handle growth, failures, and high availability.

* **Deep Dive / Technical Depth**  
   Explain:

  * **Why** this design works.

  * **What** alternatives exist.

  * **Then what** trade-offs you considered.

* **Trade-Off Analysis & Design Choices**  
   Highlight pros/cons of each approach and justify your final decision.

* **Efficacy & Time Management**  
   Target: Solve in **\~1 hour** efficiently.  
   Structure your solution and present it logically.

## Problem: Design a Chat Service

---

### Scope: Functional Requirements

**In Scope**

* 1:1 text messaging

* 1:2 text messaging (small multi-user but not full group chat)

**Out of Scope**

* Group messaging

* Multimedia (images/videos)

* Advanced scenarios (e.g., offline device sync)

---

### Scope: Non-Functional Requirements

* **Low latency**

* **Availability vs Consistency** (make a clear choice & explain)

* **Scalable & Fault Tolerant**

---

## Back-of-the-Envelope Estimations

* Make rough scale assumptions (users, messages/sec, storage, etc.)

* Use **T-shirt sizing** (Small/Medium/Large)

* Spend minimal time (don’t over-optimize this step)

---

## Session Diagrams

![][image7]

![][image8]

![][image9]  
![][image10]  

## Raw Session Notes

The text below is preserved from rough session notes and needs manual cleanup later.

> On that but you are all we want to reduce the latency but may be like save for that you may have to choose like less integrated but you are taking that is it as a design you if you can show that it is like really giving you good saving on the leader is very very important system ID

![][image11]

> I will put a cash should not be even li messageke I have to make it like less contin message that is
>
> message that is
>
> ing

![][image12]

[image7]: /img/docs/system-design/worked-22nd-aug/worked-22nd-aug-01.png
[image8]: /img/docs/system-design/worked-22nd-aug/worked-22nd-aug-02.png
[image9]: /img/docs/system-design/worked-22nd-aug/worked-22nd-aug-03.png
[image10]: /img/docs/system-design/worked-22nd-aug/worked-22nd-aug-04.png
[image11]: /img/docs/system-design/worked-22nd-aug/worked-22nd-aug-05.png
[image12]: /img/docs/system-design/worked-22nd-aug/worked-22nd-aug-06.png

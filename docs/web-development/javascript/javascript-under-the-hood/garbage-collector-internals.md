---
title: Garbage Collector Internals
sidebar_position: 5
---

# Garbage Collector Internals

## Garbage Collector (GC) Internals

---

## Why Do We Need Garbage Collection?

**JavaScript automatically manages memory.**

When objects are no longer needed, the JavaScript engine reclaims that memory so it can be reused.

Without garbage collection:

function createUser() \{  
 const user \= \{  
   name: "Akhilesh",  
   age: 34  
 \};  
\}

Every function call would keep consuming memory forever.

Eventually:

Application Crash  
↓  
Out Of Memory Error

Garbage Collection solves this problem.

---

## What is Garbage Collection?

Garbage Collection (GC) is the process of:

Identify Unused Objects  
       ↓  
Free Their Memory  
       ↓  
Reuse Memory Later  
---

## Reachability Concept

The most important concept in Garbage Collection is:

## **Reachable vs Unreachable Objects**

### **Reachable Object**

An object is considered alive if it can be reached from a root reference.

Example:

const user \= \{  
 name: "John"  
\};  
Global Object  
     │  
     ▼  
   user  
     │  
     ▼  
\{name:"John"\}

Object is reachable.

**GC will NOT remove it.**

---

### **Unreachable Object**

let user \= \{  
 name: "John"  
\};

user \= null;

Now:

Global Object

user → null

\{name:"John"\}

No references remain.

Object becomes:

UNREACHABLE

**GC can safely remove it.**

---

## V8 Memory Architecture

V8 does not store all objects in a single memory area.

Instead, memory is divided into generations.

---

## **Why Generations?**

V8 is built around an important observation:

Most objects die young.

Example:

function handleClick() \{  
 const tempData \= \{\};  
\}

The object exists for only a few milliseconds.

Most objects never survive long enough to become long-term data.

Because of this, V8 separates memory into:

Heap  
│  
├── New Space (Young Generation)  
│  
└── Old Space (Old Generation)  
---

## V8 Heap Structure

\+--------------------------------+  
|             HEAP                 |  
\+--------------------------------+  
|                                        |  
|  New Space (Young Generation)  |  
|                                        |  
\+--------------------------------+  
|                                        |  
|  Old Space (Long-lived Objects)|  
|                                        |  
\+--------------------------------+  
---

## New Space (Young Generation)

---

## **Purpose**

Stores:

* Newly created objects  
* Temporary objects  
* Short-lived allocations

Example:

function calculate() \{  
 const temp \= \{\};  
\}

Most objects created here die quickly.

---

## **Characteristics**

| Property | Value |
| ----- | ----- |
| Size | Small |
| Allocation Speed | Very Fast |
| Object Lifetime | Short |
| Collection Frequency | Frequent |

---

## New Space Collector

New Space uses:

## **Scavenger Collector**

Based on:

## **Cheney's Copying Algorithm**

---

## Cheney's Copying Algorithm

New Space is divided into:

New Space  
│  
├── From Space  
│  
└── To Space

Both are equal-sized memory regions.

---

## **Initial State**

From Space

\[A\]  
\[B\]  
\[C\]  
\[D\]

To Space

\[Empty\]

Objects are allocated inside:

From Space  
---

## GC Cycle Begins

Suppose:

A → Reachable  
C → Reachable

B → Dead  
D → Dead  
---

## Step 1: Mark Live Objects

Engine identifies:

Live Objects

A  
C  
---

## Step 2: Copy Survivors

Only live objects are copied into To Space.

From Space

\[A\]  
\[B\]  
\[C\]  
\[D\]

To Space

\[A\]  
\[C\]

Dead objects disappear automatically.

---

## Step 3: Swap Spaces

Before

From Space → Active  
To Space   → Empty

After:

From Space → Empty  
To Space   → Active

Roles are swapped.

---

## Result

Before

\[A\]\[B\]\[C\]\[D\]

After

\[A\]\[C\]

Benefits:

* Dead objects removed  
* Memory compacted automatically  
* No fragmentation

---

## Why is Scavenger Fast?

Instead of scanning the entire heap:

Copy Live Objects  
Ignore Dead Objects

Most young objects die quickly.

So copying cost remains very low.

---

## Object Promotion

Some objects survive multiple GC cycles.

These are considered long-lived.

---

## **Promotion Rule**

Typically:

Survive GC  
     ↓  
Survive GC Again  
     ↓  
Promote To Old Space  
---

Example:

const appState \= \{  
 currentUser: \{\}  
\};

Application state remains alive for a long time.

Eventually moves into:

Old Space  
---

## Old Space

---

## **Purpose**

Stores:

* Long-lived objects  
* Application state  
* Cached data  
* Large data structures

Examples:

Redux Store  
React Context  
Global Config  
Cache Objects  
---

## **Characteristics**

| Property | Value |
| ----- | ----- |
| Size | Large |
| Collection Frequency | Low |
| Collection Cost | High |
| Object Lifetime | Long |

---

## Major Garbage Collection

Old Space uses:

## **Mark-Sweep-Compact**

This is much more sophisticated than Scavenger.

---

## Mark-Sweep-Compact Overview

Mark  
 ↓  
Sweep  
 ↓  
Compact  
---

## Phase 1: Mark

Goal:

Find all reachable objects.

---

## **Root References**

Marking starts from roots.

Examples:

Window Object  
Global Variables  
Call Stack  
DOM References  
Closures  
---

Example:

const user \= \{  
 profile: \{  
   name: "John"  
 \}  
\};

Graph:

Window  
 │  
 ▼  
user  
 │  
 ▼  
profile  
 │  
 ▼  
name

All are reachable.

Marked as alive.

---

## Three Color Marking Algorithm

V8 internally uses:

White  
Grey  
Black  
---

## **White**

Not Visited  
Potentially Dead  
---

## **Grey**

Visited  
Children Not Processed Yet  
---

## **Black**

Visited  
Children Already Processed  
---

Example:

White  
↓  
Grey  
↓  
Black

After traversal:

Black \= Alive  
White \= Garbage  
---

## Phase 2: Sweep

After marking:

Black Objects → Keep

White Objects → Delete  
---

Example

Before:

\[A\]\[B\]\[C\]\[D\]

Marked:

A \= Alive  
C \= Alive

Sweep:

\[A\]\[ \]\[C\]\[ \]

Freed memory becomes available.

---

## Free Lists

Instead of immediately reallocating memory:

V8 stores free blocks in:

Free Lists

Example:

\[A\]\[ \]\[C\]\[ \]

Available regions:

Free Block 1  
Free Block 2

Future allocations reuse them.

---

## Problem: Fragmentation

After many GC cycles:

\[A\]\[ \]\[ \]\[B\]\[ \]\[C\]

Memory becomes fragmented.

---

## **Why Fragmentation is Bad**

Need:

Large Object \= 3 Blocks

Available:

1 Block  
1 Block  
1 Block

Enough memory exists.

But not contiguous.

Allocation fails.

---

## Phase 3: Compact

Compaction solves fragmentation.

Before:

\[A\]\[ \]\[ \]\[B\]\[ \]\[C\]

After:

\[A\]\[B\]\[C\]\[ \]\[ \]\[ \]

Benefits:

* Faster allocation  
* Better cache locality  
* Reduced fragmentation

---

## Interview Callout

### **Difference Between Sweep and Compact**

#### **Sweep**

Removes Dead Objects

#### **Compact**

Moves Live Objects Together

to eliminate fragmentation.

---

## Orinoco Garbage Collector

Modern V8 GC framework.

Introduced to reduce:

Stop-The-World Pauses  
---

## What is Stop-The-World?

During GC:

JavaScript Execution  
       STOPS

User interactions freeze temporarily.

Goal:

Reduce pause time as much as possible.

---

## Orinoco Optimizations

---

## **1\. Parallel GC**

Uses multiple CPU threads.

Thread 1  
Thread 2  
Thread 3  
Thread 4

Work happens simultaneously.

Benefits:

* Faster GC completion  
* Better CPU utilization

---

## **2\. Incremental GC**

Instead of:

200ms Pause

V8 performs:

20ms  
20ms  
20ms  
20ms

small chunks.

---

### **Traditional GC**

App Runs  
     ↓  
STOP 200ms  
     ↓  
Continue  
---

### **Incremental GC**

App  
↓  
GC Slice  
↓  
App  
↓  
GC Slice  
↓  
App

Much smoother.

---

## **3\. Concurrent GC**

Background threads perform GC work while JavaScript continues executing.

Main Thread  
  │  
Application Running  
Background Thread  
  │  
Marking  
Sweeping

Simultaneously.

---

## Complete V8 GC Flow

Object Created  
      │  
      ▼  
  New Space  
      │  
      ▼  
Scavenger GC  
      │  
      ▼  
Survives?  
  │  
  ├─ No → Delete  
  │  
  └─ Yes  
        │  
        ▼  
  Promote  
        │  
        ▼  
   Old Space  
        │  
        ▼  
Mark  
Sweep  
Compact  
---

## Senior-Level Interview Questions

---

## **Q1: Why does V8 use Generational GC?**

**Answer:**

Because most objects die young.

By separating short-lived and long-lived objects:

* Young generation collections remain very fast.  
* Old generation collections happen less frequently.  
* Overall GC cost is significantly reduced.

---

## **Q2: Explain Cheney's Copying Algorithm.**

**Answer:**

New Space is divided into From Space and To Space.

During GC:

1. Live objects are copied to To Space.  
2. Dead objects are ignored.  
3. Spaces are swapped.

Benefits:

* Fast cleanup  
* Automatic compaction  
* No fragmentation

---

## **Q3: Explain Mark-Sweep-Compact.**

**Answer:**

**Mark**

* Find reachable objects.

**Sweep**

* Remove unreachable objects.

**Compact**

* Move surviving objects together to remove fragmentation.

---

## **Q4: What is Orinoco?**

**Answer:**

Orinoco is V8's modern garbage collection framework that reduces pause times using:

* Parallel GC  
* Incremental GC  
* Concurrent GC

This allows applications to remain responsive while memory is being reclaimed.

---

## Quick Revision Sheet

Heap  
│  
├── New Space  
│     └── Scavenger  
│           └── Cheney Copying  
│  
└── Old Space  
     └── Mark  
         Sweep  
         Compact

### **Key Concepts**

* Reachable vs Unreachable  
* Generational GC  
* From Space / To Space  
* Promotion  
* Three Color Marking  
* Free Lists  
* Fragmentation  
* Compaction  
* Orinoco  
* Parallel GC  
* Incremental GC  
* Concurrent GC

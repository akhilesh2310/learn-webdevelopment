---
title: Garbage Collector Internals
sidebar_position: 5
---

# Garbage Collector Internals

JavaScript automatically manages memory. When objects are no longer reachable, the engine can reclaim their memory and reuse it later.

Without garbage collection, every allocation would keep consuming memory until the application eventually crashed.

```js
function createUser() {
  const user = {
    name: "Akhilesh",
    age: 34,
  };
}
```

After `createUser` finishes, `user` is no longer reachable from the active program, so its object can be collected.

## Garbage Collection Basics

Garbage collection is the process of identifying unused objects, freeing their memory, and making that memory reusable.

```text
Identify unused objects
        |
        v
Free their memory
        |
        v
Reuse memory later
```

The key concept is reachability.

## Reachable vs Unreachable

An object is alive if it can be reached from a root reference.

```js
const user = {
  name: "John",
};
```

Conceptually:

```text
Global object
    |
    v
  user
    |
    v
{ name: "John" }
```

Because the object is reachable, the garbage collector will not remove it.

If the reference is removed, the object can become unreachable.

```js
let user = {
  name: "John",
};

user = null;
```

No references remain to the original object, so it can be collected.

Common roots include:

- Global object references.
- Local variables on the call stack.
- Closures.
- DOM references.
- Active timers and event listeners.

## V8 Memory Architecture

V8 divides heap memory into generations because most objects die young.

```text
Heap
├── New Space (young generation)
└── Old Space (old generation)
```

Short-lived objects start in New Space. Objects that survive enough collections can be promoted to Old Space.

## New Space

New Space stores newly created and short-lived objects.

```js
function handleClick() {
  const tempData = {};
}
```

`tempData` usually dies quickly, so collecting it in a small young-generation space is efficient.

| Property | New Space |
| --- | --- |
| Size | Small |
| Allocation speed | Very fast |
| Object lifetime | Usually short |
| Collection frequency | Frequent |

## Scavenger and Cheney's Copying Algorithm

New Space uses a Scavenger collector based on Cheney's copying algorithm. New Space is split into two equal regions: From Space and To Space.

```text
New Space
├── From Space
└── To Space
```

Initial state:

```text
From Space: [A][B][C][D]
To Space:   [empty]
```

If `A` and `C` are reachable while `B` and `D` are dead, GC copies only the live objects.

```text
From Space: [A][B][C][D]
To Space:   [A][C]
```

Then the spaces swap roles.

```text
Before:
From Space -> active
To Space   -> empty

After:
From Space -> empty
To Space   -> active
```

Benefits:

- Dead objects disappear quickly.
- Memory is compacted automatically.
- Fragmentation is avoided in young generation collection.

Scavenger is fast because it focuses on copying live young objects, and most young objects die quickly.

## Object Promotion

Objects that survive multiple young-generation collections are considered long-lived and can be promoted to Old Space.

```text
Survive GC
    |
    v
Survive GC again
    |
    v
Promote to Old Space
```

Example long-lived data:

```js
const appState = {
  currentUser: {},
};
```

Application state, caches, global config, and large persistent structures often move into Old Space.

## Old Space

Old Space stores long-lived objects.

| Property | Old Space |
| --- | --- |
| Size | Larger |
| Object lifetime | Long |
| Collection frequency | Lower |
| Collection cost | Higher |

Old Space uses Mark-Sweep-Compact.

```text
Mark -> Sweep -> Compact
```

### Mark

Marking finds all reachable objects by starting from root references and traversing references.

```js
const user = {
  profile: {
    name: "John",
  },
};
```

```text
Window
  |
  v
user
  |
  v
profile
  |
  v
name
```

All reachable objects are marked alive.

V8 uses a three-color marking model:

| Color | Meaning |
| --- | --- |
| White | Not visited, potentially dead |
| Grey | Visited, children not processed yet |
| Black | Visited, children processed |

After traversal, black objects are alive and remaining white objects are garbage.

### Sweep

Sweep removes unreachable objects and records the freed memory.

```text
Before: [A][B][C][D]
Alive:   A     C
After:  [A][ ][C][ ]
```

Free blocks are placed into free lists so future allocations can reuse them.

### Compact

After many GC cycles, memory can become fragmented.

```text
Fragmented: [A][ ][ ][B][ ][C]
Compacted:  [A][B][C][ ][ ][ ]
```

Compaction moves live objects together to create larger contiguous free regions.

Benefits:

- Faster allocation.
- Better cache locality.
- Less fragmentation.

## Orinoco Garbage Collector

Orinoco is V8's modern garbage collection framework. Its goal is to reduce stop-the-world pauses.

During a stop-the-world pause, JavaScript execution pauses while GC work happens. Long pauses can make user interactions feel frozen.

Orinoco reduces pause time through:

- Parallel GC: multiple threads work on GC at the same time.
- Incremental GC: GC work is split into smaller chunks.
- Concurrent GC: background threads perform GC work while JavaScript continues running.

Conceptually:

```text
Traditional:
App runs -> GC pause -> App continues

Incremental:
App -> GC slice -> App -> GC slice -> App

Concurrent:
Main thread:       Application running
Background thread: Marking and sweeping
```

## Complete V8 GC Flow

```text
Object created
      |
      v
  New Space
      |
      v
Scavenger GC
      |
      v
Survives?
  |       |
  no      yes
  |       |
  v       v
delete  promote
          |
          v
       Old Space
          |
          v
 Mark -> Sweep -> Compact
```

## Senior Interview Questions

### Why does V8 use generational GC?

V8 uses generational GC because most objects die young. Separating short-lived and long-lived objects keeps young-generation collections fast and makes expensive old-generation collections less frequent.

### Explain Cheney's copying algorithm.

New Space is divided into From Space and To Space. During GC, live objects are copied to To Space, dead objects are ignored, and the two spaces swap roles. This gives fast cleanup and automatic compaction.

### Explain Mark-Sweep-Compact.

Mark finds reachable objects. Sweep removes unreachable objects. Compact moves surviving objects together to reduce fragmentation.

### What is Orinoco?

Orinoco is V8's modern GC framework. It reduces pause times using parallel, incremental, and concurrent garbage collection.

## Quick Revision

```text
Heap
├── New Space
│   └── Scavenger
│       └── Cheney copying
└── Old Space
    └── Mark-Sweep-Compact
```

Key concepts:

- Reachable vs unreachable.
- Generational GC.
- From Space and To Space.
- Promotion.
- Three-color marking.
- Free lists.
- Fragmentation.
- Compaction.
- Orinoco.
- Parallel, incremental, and concurrent GC.

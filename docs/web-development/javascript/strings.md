---
title: Strings
sidebar_position: 17
---

# Strings

Strings store and work with text data. In JavaScript, strings are primitive values and immutable, so string methods return new strings instead of modifying the original.

## String Basics

A string is a sequence of characters.

```js
const name = "Akhilesh";

console.log(name[0]);
// A

console.log(name.length);
// 8
```

Strings can be created using single quotes, double quotes, or template literals.

```js
const a = "Hello";
const b = "Hello";
const c = `Hello ${name}`;
```

Strings are zero-indexed and iterable.

```js
for (const char of "abc") {
  console.log(char);
}

// a
// b
// c
```

## String Immutability

You can read characters by index, but you cannot update the original string directly.

```js
const str = "hello";

str[1] = "a";

console.log(str);
// hello
```

String methods return new strings.

```js
let email = "  TEST@MAIL.COM  ";

email.trim().toLowerCase();

console.log(email);
// "  TEST@MAIL.COM  "

email = email.trim().toLowerCase();

console.log(email);
// "test@mail.com"
```

## Common String Methods

### `length`

```js
const str = "React";

console.log(str.length);
// 5
```

### `charAt()` and Index Access

```js
const str = "React";

console.log(str.charAt(0));
// R

console.log(str[0]);
// R

console.log(str.charAt(10));
// ""

console.log(str[10]);
// undefined
```

### `includes`

```js
const text = "Frontend Engineer";

console.log(text.includes("Engineer"));
// true
```

### `startsWith` and `endsWith`

```js
const file = "profile.png";

console.log(file.startsWith("profile"));
// true

console.log(file.endsWith(".png"));
// true
```

### `indexOf` and `lastIndexOf`

```js
const text = "banana";

console.log(text.indexOf("a"));
// 1

console.log(text.lastIndexOf("a"));
// 5

console.log(text.indexOf("z"));
// -1
```

### `slice`

`slice(start, end)` extracts part of a string. The end index is excluded.

```js
const str = "JavaScript";

console.log(str.slice(0, 4));
// Java

console.log(str.slice(4));
// Script

console.log(str.slice(-6));
// Script
```

### `substring`

`substring` is similar to `slice`, but negative indexes are treated as `0`.

```js
const str = "JavaScript";

console.log(str.substring(0, 4));
// Java

console.log(str.substring(-4));
// JavaScript
```

### Case and Trim Methods

```js
const email = "AKHIL@TEST.COM";
console.log(email.toLowerCase());
// akhil@test.com

const input = "  hello  ";
console.log(input.trim());
// hello

console.log(input.trimStart());
// "hello  "

console.log(input.trimEnd());
// "  hello"
```

### `replace` and `replaceAll`

```js
const text = "apple banana apple";

console.log(text.replace("apple", "orange"));
// orange banana apple

console.log(text.replaceAll("apple", "orange"));
// orange banana orange
```

### `split` and `repeat`

```js
const csv = "react,js,ts";

console.log(csv.split(","));
// ["react", "js", "ts"]

console.log("*".repeat(5));
// *****
```

## String Manipulation Patterns

### Clean User Input

```js
const input = "  Akhilesh@Email.COM  ";
const normalized = input.trim().toLowerCase();

console.log(normalized);
// akhilesh@email.com
```

### Create Initials

```js
const name = "Akhilesh Bamhore";

const initials = name
  .split(" ")
  .map((word) => word[0])
  .join("");

console.log(initials);
// AB
```

### Capitalize First Letter

```js
function capitalize(str) {
  if (!str) {
    return "";
  }

  return str[0].toUpperCase() + str.slice(1);
}

console.log(capitalize("react"));
// React
```

## Reverse String

```js
function reverseString(str) {
  return str.split("").reverse().join("");
}

console.log(reverseString("hello"));
// olleh
```

Manual approach:

```js
function reverseString(str) {
  let result = "";

  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }

  return result;
}
```

Two-pointer approach:

```js
function reverseString(str) {
  const chars = str.split("");
  let left = 0;
  let right = chars.length - 1;

  while (left < right) {
    [chars[left], chars[right]] = [chars[right], chars[left]];
    left++;
    right--;
  }

  return chars.join("");
}
```

## Palindrome

A palindrome reads the same forward and backward.

```js
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  let left = 0;
  let right = cleaned.length - 1;

  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

console.log(isPalindrome("A man, a plan, a canal: Panama"));
// true
```

## Anagram

Two strings are anagrams if they contain the same characters with the same frequencies.

```js
function isAnagram(s1, s2) {
  const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, "");

  const a = normalize(s1);
  const b = normalize(s2);

  if (a.length !== b.length) {
    return false;
  }

  const freq = {};

  for (const char of a) {
    freq[char] = (freq[char] || 0) + 1;
  }

  for (const char of b) {
    if (!freq[char]) {
      return false;
    }

    freq[char]--;
  }

  return true;
}

console.log(isAnagram("listen", "silent"));
// true
```

## Character Frequency

```js
function charFrequency(str) {
  const freq = {};

  for (const char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }

  return freq;
}

console.log(charFrequency("banana"));
// { b: 1, a: 3, n: 2 }
```

Using `Map`:

```js
function charFrequency(str) {
  const map = new Map();

  for (const char of str) {
    map.set(char, (map.get(char) || 0) + 1);
  }

  return map;
}
```

## First Non-Repeating Character

```js
function firstNonRepeatingChar(str) {
  const freq = {};

  for (const char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }

  for (const char of str) {
    if (freq[char] === 1) {
      return char;
    }
  }

  return null;
}

console.log(firstNonRepeatingChar("swiss"));
// w
```

## Duplicate Characters

```js
function duplicateChars(str) {
  const freq = {};
  const result = [];

  for (const char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }

  for (const char in freq) {
    if (freq[char] > 1) {
      result.push(char);
    }
  }

  return result;
}

console.log(duplicateChars("programming"));
// ["r", "g", "m"]
```

## Important Traps

### `split("")` with Unicode

```js
console.log("😊".split(""));
// ["\ud83d", "\ude0a"]

console.log([..."😊"]);
// ["😊"]
```

`split("")` can break emojis because some characters are represented using surrogate pairs.

### `replace` vs `replaceAll`

```js
const text = "one one one";

console.log(text.replace("one", "two"));
// two one one

console.log(text.replaceAll("one", "two"));
// two two two
```

### Methods Do Not Mutate

```js
let input = "  hello  ";

input.trim();

console.log(input);
// "  hello  "

input = input.trim();

console.log(input);
// hello
```

## Quick Revision Summary

| Topic | Key Point |
| :---- | :---- |
| String basics | Strings are indexed, have length, and are iterable |
| Immutability | Original string cannot be changed |
| `slice` | Supports negative indexes |
| `substring` | Negative indexes become `0` |
| `replace` | Replaces first match only |
| `replaceAll` | Replaces all matches |
| `split` | Converts string to array |
| Reverse string | Use built-ins, loop, or two-pointer approach |
| Palindrome | Normalize and compare both ends |
| Anagram | Use sorting or frequency map |
| Character frequency | Use object or `Map` |
| Unicode trap | `split("")` can break emojis |

## Interview Answer

Strings in JavaScript are immutable sequences of characters. We can access characters by index and use methods like `slice`, `split`, `replace`, `trim`, `toLowerCase`, and `includes`, but these methods return new strings instead of changing the original. For interview problems, common patterns include reversing strings, palindrome checks, anagram checks, and character frequency counting. For stronger answers, two-pointer and frequency-map approaches are usually preferred.

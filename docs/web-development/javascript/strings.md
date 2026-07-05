---
title: Strings
sidebar_position: 17
---

# Strings

## JavaScript Strings

Strings are used to store and work with text data. In JavaScript, strings are **primitive values** and are **immutable**, meaning once created, the original string cannot be changed. String methods usually return a new string instead of modifying the existing one.

---

## 1. String Basics

## Simple meaning

A string is a sequence of characters.

const name \= "Akhilesh";  
console.log(name\[0\]); // "A"  
console.log(name.length); // 8

Strings can be created using single quotes, double quotes, or template literals.

const a \= "Hello";  
const b \= 'Hello';  
const c \= \`Hello $\{name\}\`;

## Key mental model

Think of a string as an **immutable character sequence**.

You can read characters using index, but you cannot directly update them.

const str \= "hello";

console.log(str\[1\]); // "e"

str\[1\] \= "a";

console.log(str); // "hello"

Answer: No error in non-strict mode, but the string does not change.

## Important points

* Strings are zero-indexed.  
* `length` gives the number of UTF-16 code units, not always user-visible characters.  
* Strings are immutable.  
* Most string methods return a new string.  
* Strings can be iterated using `for...of`.

for (const char of "abc") \{  
  console.log(char);  
\}  
// "a"  
// "b"  
// "c"

## Interview-ready answer

A string in JavaScript is an immutable sequence of characters. We can access characters by index and use string methods for searching, slicing, replacing, and transforming, but these methods return new strings instead of modifying the original string.

---

## 2. Common String Methods

## Simple meaning

String methods help us search, extract, transform, replace, split, and clean text.

## Common methods

### `length`

const str \= "React";

console.log(str.length); // 5

### `charAt(index)` and index access

const str \= "React";

console.log(str.charAt(0)); // "R"  
console.log(str\[0\]); // "R"

Difference:

const str \= "React";

console.log(str.charAt(10)); // ""  
console.log(str\[10\]); // undefined

### `includes`

Checks whether a substring exists.

const text \= "Frontend Engineer";

console.log(text.includes("Engineer")); // true

### `startsWith` / `endsWith`

const file \= "profile.png";

console.log(file.startsWith("profile")); // true  
console.log(file.endsWith(".png")); // true

### `indexOf` / `lastIndexOf`

const text \= "banana";

console.log(text.indexOf("a")); // 1  
console.log(text.lastIndexOf("a")); // 5  
console.log(text.indexOf("z")); // \-1

### `slice(start, end)`

Extracts part of a string. End index is excluded.

const str \= "JavaScript";

console.log(str.slice(0, 4)); // "Java"  
console.log(str.slice(4)); // "Script"  
console.log(str.slice(-6)); // "Script"

### `substring(start, end)`

Similar to `slice`, but negative indexes are treated as `0`.

const str \= "JavaScript";

console.log(str.substring(0, 4)); // "Java"  
console.log(str.substring(-4)); // "JavaScript"

### `toLowerCase` / `toUpperCase`

const email \= "AKHIL@TEST.COM";

console.log(email.toLowerCase()); // "akhil@test.com"

### `trim`, `trimStart`, `trimEnd`

const input \= "  hello  ";

console.log(input.trim()); // "hello"  
console.log(input.trimStart()); // "hello  "  
console.log(input.trimEnd()); // "  hello"

### `replace` and `replaceAll`

const text \= "apple banana apple";

console.log(text.replace("apple", "orange")); // "orange banana apple"  
console.log(text.replaceAll("apple", "orange")); // "orange banana orange"

### `split`

Converts a string into an array.

const csv \= "react,js,ts";

console.log(csv.split(",")); // \["react", "js", "ts"\]

### `repeat`

console.log("\*".repeat(5)); // "\*\*\*\*\*"

## Important traps

`slice`, `substring`, and `substr` are different. `substr` is older and generally avoided.

const str \= "JavaScript";

console.log(str.slice(4, 10)); // "Script"  
console.log(str.substring(4, 10)); // "Script"  
console.log(str.substr(4, 6)); // "Script"

Common mistake: Assuming `replace` replaces all matches. It only replaces the first match unless using `replaceAll` or regex with global flag.

const text \= "a-b-c";

console.log(text.replace("-", "\_")); // "a\_b-c"  
console.log(text.replaceAll("-", "\_")); // "a\_b\_c"

## Interview-ready answer

Common string methods include `includes`, `indexOf`, `slice`, `substring`, `split`, `replace`, `replaceAll`, `trim`, `toLowerCase`, and `toUpperCase`. Most of these methods return a new string because strings are immutable.

---

## 3. String Immutability

## Simple meaning

String immutability means once a string is created, the original value cannot be changed.

Any operation that looks like it modifies a string actually creates a new string.

let str \= "hello";

str.toUpperCase();

console.log(str); // "hello"

Correct:

let str \= "hello";

str \= str.toUpperCase();

console.log(str); // "HELLO"

## Key mental model

String methods do not modify the existing string. They return a new string.

let text \= "React";

const updated \= text.replace("R", "F");

console.log(text); // "React"  
console.log(updated); // "Feact"

## Important trap

const str \= "hello";

str\[0\] \= "H";

console.log(str); // "hello"

Answer: The original string does not change because strings are immutable.

## Why this matters in frontend

When cleaning form input, always assign the result.

let email \= "  TEST@MAIL.COM  ";

email.trim().toLowerCase();

console.log(email); // "  TEST@MAIL.COM  "

Correct:

let email \= "  TEST@MAIL.COM  ";

email \= email.trim().toLowerCase();

console.log(email); // "test@mail.com"

## Interview-ready answer

Strings in JavaScript are immutable. We cannot modify a string in place. Methods like `trim`, `replace`, and `toUpperCase` return a new string, so we need to store or return the updated value.

---

## 4. String Manipulation

## Simple meaning

String manipulation means changing, extracting, formatting, or analyzing text.

In interviews, string manipulation is commonly used for problems like reversing strings, checking palindromes, counting characters, validating input, and comparing words.

## Practical examples

### Clean user input

const input \= "  Akhilesh@Email.COM  ";

const normalized \= input.trim().toLowerCase();

console.log(normalized); // "akhilesh@email.com"

### Create initials

const name \= "Akhilesh Bamhore";

const initials \= name  
  .split(" ")  
  .map((word) \=\> word\[0\])  
  .join("");

console.log(initials); // "AB"

### Capitalize first letter

function capitalize(str) \{  
  if (\!str) return "";

  return str\[0\].toUpperCase() \+ str.slice(1);  
\}

console.log(capitalize("react")); // "React"

### Convert sentence to words

const sentence \= "React is powerful";

console.log(sentence.split(" ")); // \["React", "is", "powerful"\]

## Common mistakes

* Forgetting that strings are immutable.  
* Using `split("")` blindly for Unicode characters like emojis.  
* Not normalizing case before comparison.  
* Not removing spaces or punctuation when checking palindrome/anagram.  
* Using nested loops where frequency map would be cleaner.

## Interview-ready answer

String manipulation involves operations like trimming, normalizing, splitting, joining, replacing, reversing, and counting characters. In frontend work, it is useful for form cleanup, search, validation, formatting labels, generating slugs, and processing API text.

---

## 5. Reverse String

## Simple meaning

Reversing a string means returning characters in the opposite order.

function reverseString(str) \{  
  return str.split("").reverse().join("");  
\}

console.log(reverseString("hello")); // "olleh"

## How it works

Step by step:

"hello".split(""); // \["h", "e", "l", "l", "o"\]  
\["h", "e", "l", "l", "o"\].reverse(); // \["o", "l", "l", "e", "h"\]  
\["o", "l", "l", "e", "h"\].join(""); // "olleh"

## Manual approach

function reverseString(str) \{  
  let result \= "";

  for (let i \= str.length \- 1; i \>= 0; i--) \{  
    result \+= str\[i\];  
  \}

  return result;  
\}

console.log(reverseString("React")); // "tcaeR"

## Two-pointer approach

Strings are immutable, so convert to array first.

function reverseString(str) \{  
  const chars \= str.split("");

  let left \= 0;  
  let right \= chars.length \- 1;

  while (left \< right) \{  
    \[chars\[left\], chars\[right\]\] \= \[chars\[right\], chars\[left\]\];  
    left++;  
    right--;  
  \}

  return chars.join("");  
\}

console.log(reverseString("hello")); // "olleh"

## Edge cases / traps

* Empty string should return `""`.  
* Single character should return same character.  
* Case is preserved.  
* `split("")` may not correctly handle some emojis or complex Unicode characters.

console.log(reverseString("")); // ""  
console.log(reverseString("a")); // "a"

## Interview-ready answer

To reverse a string, I usually convert it to an array, reverse the array, and join it back. Since strings are immutable in JavaScript, direct in-place reversal is not possible. For interviews, I can also implement it manually using a loop or two-pointer approach.

---

## 6. Palindrome

## Simple meaning

A palindrome is a string that reads the same forward and backward.

Examples: `"madam"`, `"racecar"`, `"level"`.

## Basic solution

function isPalindrome(str) \{  
  const reversed \= str.split("").reverse().join("");

  return str \=== reversed;  
\}

console.log(isPalindrome("madam")); // true  
console.log(isPalindrome("hello")); // false

## Better solution with normalization

For real interview problems, normalize the string first.

function isPalindrome(str) \{  
  const cleaned \= str.toLowerCase().replace(/\[^a-z0-9\]/g, "");  
  const reversed \= cleaned.split("").reverse().join("");

  return cleaned \=== reversed;  
\}

console.log(isPalindrome("A man, a plan, a canal: Panama")); // true

## Two-pointer solution

More efficient because it avoids creating a reversed string.

function isPalindrome(str) \{  
  const cleaned \= str.toLowerCase().replace(/\[^a-z0-9\]/g, "");

  let left \= 0;  
  let right \= cleaned.length \- 1;

  while (left \< right) \{  
    if (cleaned\[left\] \!== cleaned\[right\]) return false;

    left++;  
    right--;  
  \}

  return true;  
\}

console.log(isPalindrome("racecar")); // true  
console.log(isPalindrome("React")); // false

## Edge cases / traps

* Case sensitivity: `"Madam"` should usually be treated as palindrome after lowercasing.  
* Spaces/punctuation may need to be ignored.  
* Empty string is usually considered palindrome.  
* Clarify whether only alphanumeric characters should be checked.

## Interview-ready answer

A palindrome is a string that reads the same forward and backward. I usually normalize it by lowercasing and removing non-alphanumeric characters, then compare characters using two pointers from both ends.

---

## 7. Anagram

## Simple meaning

Two strings are anagrams if they contain the same characters with the same frequency, but possibly in a different order.

Examples: `"listen"` and `"silent"`.

## Sorting approach

function isAnagram(s1, s2) \{  
  const normalize \= (str) \=\>  
    str.toLowerCase().replace(/\[^a-z0-9\]/g, "").split("").sort().join("");

  return normalize(s1) \=== normalize(s2);  
\}

console.log(isAnagram("listen", "silent")); // true  
console.log(isAnagram("hello", "world")); // false

## Frequency map approach

Better for performance because sorting is usually `O(n log n)`.

function isAnagram(s1, s2) \{  
  const a \= s1.toLowerCase().replace(/\[^a-z0-9\]/g, "");  
  const b \= s2.toLowerCase().replace(/\[^a-z0-9\]/g, "");

  if (a.length \!== b.length) return false;

  const freq \= \{\};

  for (const char of a) \{  
    freq\[char\] \= (freq\[char\] || 0\) \+ 1;  
  \}

  for (const char of b) \{  
    if (\!freq\[char\]) return false;  
    freq\[char\]--;  
  \}

  return true;  
\}

console.log(isAnagram("listen", "silent")); // true  
console.log(isAnagram("rat", "car")); // false

## How it works

Step by step:

* Normalize both strings.  
* If lengths differ, return `false`.  
* Count characters from the first string.  
* Decrease counts using the second string.  
* If a character is missing or count becomes invalid, return `false`.

## Edge cases / traps

* Normalize case.  
* Decide whether spaces and punctuation should be ignored.  
* Frequency matters: `"aab"` and `"ab"` are not anagrams.  
* Same characters but different counts are not enough.

console.log(isAnagram("aab", "aba")); // true  
console.log(isAnagram("aab", "abb")); // false

## Interview-ready answer

Two strings are anagrams if they have the same characters with the same frequencies. A simple solution is to sort both strings and compare them. A better solution is to use a frequency map, which avoids sorting and works in linear time.

---

## 8. Character Frequency

## Simple meaning

Character frequency means counting how many times each character appears in a string.

function charFrequency(str) \{  
  const freq \= \{\};

  for (const char of str) \{  
    freq\[char\] \= (freq\[char\] || 0\) \+ 1;  
  \}

  return freq;  
\}

console.log(charFrequency("banana"));  
// \{ b: 1, a: 3, n: 2 \}

## With normalization

function charFrequency(str) \{  
  const cleaned \= str.toLowerCase().replace(/\\s/g, "");  
  const freq \= \{\};

  for (const char of cleaned) \{  
    freq\[char\] \= (freq\[char\] || 0\) \+ 1;  
  \}

  return freq;  
\}

console.log(charFrequency("Hello World"));  
// \{ h: 1, e: 1, l: 3, o: 2, w: 1, r: 1, d: 1 \}

## Using `Map`

function charFrequency(str) \{  
  const map \= new Map();

  for (const char of str) \{  
    map.set(char, (map.get(char) || 0\) \+ 1);  
  \}

  return map;  
\}

console.log(charFrequency("banana"));  
// Map(3) \{ "b" \=\> 1, "a" \=\> 3, "n" \=\> 2 \}

## Practical use cases

* Anagram checking.  
* Finding duplicate characters.  
* Finding first non-repeating character.  
* Search ranking.  
* Input validation.  
* Text analytics.

## Example: first non-repeating character

function firstNonRepeatingChar(str) \{  
  const freq \= \{\};

  for (const char of str) \{  
    freq\[char\] \= (freq\[char\] || 0\) \+ 1;  
  \}

  for (const char of str) \{  
    if (freq\[char\] \=== 1\) return char;  
  \}

  return null;  
\}

console.log(firstNonRepeatingChar("swiss")); // "w"

## Interview-ready answer

Character frequency is usually solved using an object or `Map`. We iterate through the string and count each character. This pattern is useful for anagrams, duplicate checks, first non-repeating character, and many string interview problems.

---

## 9. Common Interview Topics / Questions

## 1. How do you reverse a string?

Use `split("").reverse().join("")` for a simple solution, or use a manual loop/two-pointer approach to show deeper understanding.

function reverseString(str) \{  
  return str.split("").reverse().join("");  
\}

console.log(reverseString("hello")); // "olleh"

## 2. How do you check if a string is a palindrome?

Normalize the string, then compare from both ends using two pointers.

function isPalindrome(str) \{  
  const cleaned \= str.toLowerCase().replace(/\[^a-z0-9\]/g, "");

  let left \= 0;  
  let right \= cleaned.length \- 1;

  while (left \< right) \{  
    if (cleaned\[left\] \!== cleaned\[right\]) return false;  
    left++;  
    right--;  
  \}

  return true;  
\}

console.log(isPalindrome("Madam")); // true

## 3. How do you check if two strings are anagrams?

Use a frequency map.

function isAnagram(s1, s2) \{  
  if (s1.length \!== s2.length) return false;

  const freq \= \{\};

  for (const char of s1) \{  
    freq\[char\] \= (freq\[char\] || 0\) \+ 1;  
  \}

  for (const char of s2) \{  
    if (\!freq\[char\]) return false;  
    freq\[char\]--;  
  \}

  return true;  
\}

console.log(isAnagram("listen", "silent")); // true

## 4. How do you count character frequency?

Use an object or `Map`.

function charFrequency(str) \{  
  const freq \= \{\};

  for (const char of str) \{  
    freq\[char\] \= (freq\[char\] || 0\) \+ 1;  
  \}

  return freq;  
\}

console.log(charFrequency("banana"));  
// \{ b: 1, a: 3, n: 2 \}

## 5. How do you find duplicate characters?

function duplicateChars(str) \{  
  const freq \= \{\};  
  const result \= \[\];

  for (const char of str) \{  
    freq\[char\] \= (freq\[char\] || 0\) \+ 1;  
  \}

  for (const char in freq) \{  
    if (freq\[char\] \> 1\) result.push(char);  
  \}

  return result;  
\}

console.log(duplicateChars("programming")); // \["r", "g", "m"\]

## 6. How do you find the first non-repeating character?

function firstNonRepeatingChar(str) \{  
  const freq \= \{\};

  for (const char of str) \{  
    freq\[char\] \= (freq\[char\] || 0\) \+ 1;  
  \}

  for (const char of str) \{  
    if (freq\[char\] \=== 1\) return char;  
  \}

  return null;  
\}

console.log(firstNonRepeatingChar("aabbcdd")); // "c"

---

## 10. Important String Method Traps

## `split("")` with emojis

console.log("😊".split("")); // \["\\ud83d", "\\ude0a"\]

This happens because emojis can be represented using surrogate pairs.

Better:

console.log(\[..."😊"\]); // \["😊"\]

## `replace` vs `replaceAll`

const text \= "one one one";

console.log(text.replace("one", "two")); // "two one one"  
console.log(text.replaceAll("one", "two")); // "two two two"

## `trim` does not mutate

let input \= "  hello  ";

input.trim();

console.log(input); // "  hello  "

Correct:

let input \= "  hello  ";

input \= input.trim();

console.log(input); // "hello"

## `toLowerCase` does not mutate

let email \= "TEST@MAIL.COM";

email.toLowerCase();

console.log(email); // "TEST@MAIL.COM"

Correct:

let email \= "TEST@MAIL.COM";

email \= email.toLowerCase();

console.log(email); // "test@mail.com"

---

## 11. Quick Revision Summary

| Topic | Key point |
| ----- | ----- |
| String basics | Strings are indexed, have length, and are iterable |
| Immutability | Original string cannot be changed |
| `slice` | Supports negative indexes |
| `substring` | Negative indexes become `0` |
| `replace` | Replaces first match only |
| `replaceAll` | Replaces all matches |
| `split` | Converts string to array |
| `join` | Converts array to string |
| Reverse string | `split`, `reverse`, `join` or two-pointer |
| Palindrome | Normalize and compare both ends |
| Anagram | Use sorting or frequency map |
| Character frequency | Use object or `Map` |
| Unicode trap | `split("")` can break emojis |

---

## Final Interview-Ready Combined Answer

Strings in JavaScript are immutable sequences of characters. We can access characters by index and use methods like `slice`, `split`, `replace`, `trim`, `toLowerCase`, and `includes`, but these methods return new strings instead of changing the original. For interview problems, common patterns include reversing strings, palindrome checks, anagram checks, and character frequency counting. For simple problems, built-in methods are fine, but for stronger answers, two-pointer and frequency map approaches are usually preferred.

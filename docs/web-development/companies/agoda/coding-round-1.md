---
title: Coding Round 1
sidebar_position: 2
---

# Coding Round 1

function canPrintInDays(books, days, dailyLimit) \{  
  let currentDay \= 1;  
  let printedToday \= 0;

  for (let pages of books) \{  
    if (pages \> dailyLimit) return false;

    if (printedToday \+ pages \<= dailyLimit) \{  
      printedToday \+= pages;  
    \} else \{  
      currentDay++;  
      printedToday \= pages;  
    \}  
  \}

  return currentDay \<= days;  
\}

// Test  
let books \= \[100, 200, 300, 400\];  
let days \= 3;  
let dailyLimit \= 500;

console.log(canPrintInDays(books, days, dailyLimit)); // true

function removeByK(str, k) \{  
  let stack \= \[\];

  for (let ch of str) \{  
    let top \= stack\[stack.length \- 1\];

    if (top && top.char \=== ch) \{  
      top.count++;  
    \} else \{  
      stack.push(\{ char: ch, count: 1 \});  
    \}

    if (stack\[stack.length \- 1\].count \=== k) \{  
      stack.pop();  
    \}  
  \}

  return stack.map(item \=\> item.char.repeat(item.count)).join("");  
\}

console.log(removeByK("Abbcccb", 3)); // A  
console.log(removeByK("deeedbbcccbdaa", 3)); // aa

---
title: Recently Asked
sidebar_position: 3
---

# Recently Asked

Frequently?Recently Asked

```js
function canPrintInDays(books, days, dailyLimit) {  
  let currentDay \= 1;  
  let printedToday \= 0;

  for (let pages of books) {  
    if (pages \> dailyLimit) return false;

    if (printedToday \+ pages \<= dailyLimit) {  
      printedToday \+= pages;  
    } else {  
      currentDay++;  
      printedToday \= pages;  
    }  
  }

  return currentDay \<= days;  
}

// Test  
let books \= \[100, 200, 300, 400\];  
let days \= 3;  
let dailyLimit \= 500;

console.log(canPrintInDays(books, days, dailyLimit)); // true
```

```js
function removeByK(str, k) {  
  let stack \= \[\];

  for (let ch of str) {  
    let top \= stack\[stack.length \- 1\];

    if (top && top.char \=== ch) {  
      top.count++;  
    } else {  
      stack.push({ char: ch, count: 1 });  
    }

    if (stack\[stack.length \- 1\].count \=== k) {  
      stack.pop();  
    }  
  }

  return stack.map(item \=\> item.char.repeat(item.count)).join("");  
}

console.log(removeByK("Abbcccb", 3)); // A  
console.log(removeByK("deeedbbcccbdaa", 3)); // aa
```

// Optimized: O(n)

```js
function removeByK(str, k) {  
  let stack \= \[\];

  for (let char of str) {  
    let last \= stack\[stack.length \- 1\];

    if (last && last.char \=== char) {  
      last.count++;  
    } else {  
      stack.push({ char: char, count: 1 });  
    }

    if (stack\[stack.length \- 1\].count \=== k) {  
      stack.pop();  
    }  
  }

  let result \= "";

  for (let item of stack) {  
    result \+= item.char.repeat(item.count);  
  }

  return result;  
}

// Test  
console.log(removeByK("Abbcccb", 3)); // A  
console.log(removeByK("deeedbbcccbdaa", 3)); // aa
```

### **Problem Summary**

You are given a maximum time difference limit called gap, an array of requestIds, and an array of timestamps sorted in increasing order. A **retry** occurs when two consecutive logs for the **same** requestId occur within a time difference of **at most gap**. Find the total number of retries across all request IDs.

### **Test Case 1**

* **Input:**  
  * gap \= 10  
  * requestIds \= \["r1", "r1", "r1", "r2", "r2"\]  
  * timestamps \= \[100, 105, 200, 300, 302\]  
* **Evaluation:**  
  * **r1**: Pairs are $(100, 105\) \\rightarrow \\text\{diff \} 5 \\le 10$ (**Retry**) and $(105, 200\) \\rightarrow \\text\{diff \} 95 \> 10$ (No).  
  * **r2**: Pair is $(300, 302\) \\rightarrow \\text\{diff \} 2 \\le 10$ (**Retry**).  
* **Output:** 2

### **Test Case 2**

* **Input:**  
  * gap \= 5  
  * requestIds \= \["a", "b", "a", "b"\]  
  * timestamps \= \[10, 12, 14, 20\]  
* **Evaluation:**  
  * **a**: Consecutive logs are at $10$ and $14 \\rightarrow \\text\{diff \} 4 \\le 5$ (**Retry**).  
  * **b**: Consecutive logs are at $12$ and $20 \\rightarrow \\text\{diff \} 8 \> 5$ (No).  
* **Output:** 1

```js
function getRetryCount(gap, requests, timestamps) {  
    const lastTimestamp \= new Map();  
    let retryCount \= 0;

    for (let i \= 0; i \< requests.length; i++) {  
        const requestId \= requests\[i\];  
        const currentTime \= timestamps\[i\];

        if (  
            lastTimestamp.has(requestId) &&  
            currentTime \- lastTimestamp.get(requestId) \<= gap  
        ) {  
            retryCount++;  
        }

        lastTimestamp.set(requestId, currentTime);  
    }

    return retryCount;  
}
```

### **Problem Summary**

You are given a binary string $s$ of '0's and '1's. You want to shift all '1's to the right side (segregating the string) to achieve the **maximum possible total cost**.

* You can move a '1' rightward across a block of consecutive zeros until it hits another '1' or the end of the string.  
* Moving a '1' past $k$ consecutive zeros in a single shift costs: $\\text\{Cost\} \= 1 \+ k$.

### **Test Case 1**

* **Input:** s \= "110100"  
* **Optimal Moves:**  
  1. Move the '1' at index 1 past the zero at index 2 $\\rightarrow$ "101100" ($\\text\{cost\} \= 1 \+ 1 \= 2$).  
  2. Move the '1' at index 0 past the zero at index 1 $\\rightarrow$ "011100" ($\\text\{cost\} \= 1 \+ 1 \= 2$).  
  3. Move the three consecutive '1's past the final two zeros one by one $\\rightarrow$ each moves 2 places ($\\text\{cost\} \= (1 \+ 2\) \\times 3 \= 9$).  
* **Output:** 13 ($2 \+ 2 \+ 9$)

### **Test Case 2**

* **Input:** s \= "101"  
* **Optimal Moves:**  
  * Move the first '1' past the single zero to bunch up with the second '1' $\\rightarrow$ "011".  
  * It moves 1 position past 1 zero, so the cost is $1 \+ 1 \= 2$.  
* **Output:** 2

```js
function getMaxCost(s) {  
    let totalCost \= 0;  
    let ones \= 0;  
    let inZeroBlock \= false;

    for (let i \= 0; i \< s.length; i++) {  
        if (s\[i\] \=== '1') {  
            ones++;  
            inZeroBlock \= false;  
        } else { // s\[i\] \=== '0'  
            if (ones \> 0\) {  
                // 1\. Add 'ones' for the current zero  
                totalCost \+= ones;

                // 2\. If this starts a new consecutive block of zeros,  
                // add 'ones' an extra time.  
                if (\!inZeroBlock) {  
                    totalCost \+= ones;  
                    inZeroBlock \= true;  
                }  
            }  
        }  
    }

    return totalCost;  
}

// \--- Verification with Example \---  
console.log(getMaxCost("110100")); // Output: 13
```

### **Complexity Analysis:**

* **Time Complexity:** $O(N)$ because we iterate through the string exactly once.  
* **Space Complexity**

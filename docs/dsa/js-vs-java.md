---
title: JS vs JAVA
sidebar_position: 4
---

# JS vs JAVA

### **🧠 Core Data Structures You Should Master**

| Category | Data Structure | Common Use Cases |
| ----- | ----- | ----- |
| 🔢 Array | `int[]`, `let arr = []` | Storing values in order, direct index access |
| 📋 Dynamic Array | `ArrayList`, `push/pop` | When size changes dynamically |
| 🔁 Looping | `for`, `while`, `for-each` | Traversing data |
| 🔣 String | `String`, string methods | Pattern problems, palindromes, substring search |
| 📚 HashMap | `Map`, `HashMap` | Frequency count, lookup, mapping key-value |
| 🧺 Set | `Set`, `HashSet` | Unique values, duplicates handling |
| 🏗 Stack | `Stack`, array with push/pop | Balanced parentheses, recursion |
| 📥 Queue | `Queue`, `LinkedList`, `Deque` | BFS, task scheduling |
| 🌳 Tree | `TreeNode` class, recursion | Binary trees, BSTs, traversals |
| 📊 Graph | Adjacency list/map | BFS, DFS, shortest path, cycles |
| 🔗 Linked List | `Node` class, pointers | Custom data structures, reversing |

## **✅ 1\. Array**

Used for storing a fixed-size sequence of elements with index-based access.

| JavaScript | Java |
| ----- | ----- |
| `let arr = [1, 2, 3];` | `int[] arr = {1, 2, 3};` |
| `arr[0] = 10;` | `arr[0] = 10;` |
| `arr.length` | `arr.length` |

---

## **✅ 2\. Dynamic Array (ArrayList in Java)**

Automatically resizable array used for dynamic data storage and manipulation.

| JavaScript | Java |
| ----- | ----- |
| `let arr = [];` | `ArrayList<Integer> arr = new ArrayList<>();` |
| `arr.push(10);` | `arr.add(10);` |
| `arr.pop();` | `arr.remove(arr.size() - 1);` |
| `arr.length` | `arr.size();` |
| `arr[0]` | `arr.get(0);` |

---

## **✅ 3\. Loops**

Control structures to iterate over arrays, lists, or any iterable data.

| JavaScript | Java |
| ----- | ----- |
| `for (let i = 0; i < n; i++) {}` | `for (int i = 0; i < n; i++) {}` |
| `for (let num of arr) {}` | `for (int num : arr) {}` |
| `while (condition) {}` | `while (condition) {}` |

---

## **✅ 4\. String**

Immutable sequence of characters used for text and pattern manipulation.

| JavaScript | Java |
| ----- | ----- |
| `let str = "hello";` | `String str = "hello";` |
| `str.length` | `str.length()` |
| `str.charAt(0)` | `str.charAt(0)` |
| `str.substring(1, 3)` | `str.substring(1, 3)` |
| `str.split('')` | `str.toCharArray()` |

---

## **✅ 5\. HashMap (Map)**

Key-value pair structure for fast lookup, insert, and delete operations.

| JavaScript | Java |
| ----- | ----- |
| `let map = new Map();` | `HashMap<Integer, String> map = new HashMap<>();` |
| `map.set(1, "a");` | `map.put(1, "a");` |
| `map.get(1);` | `map.get(1);` |
| `map.has(1);` | `map.containsKey(1);` |
| `map.delete(1);` | `map.remove(1);` |

---

## **✅ 6\. Set (HashSet)**

Stores unique values without any duplicates; supports fast add and lookup.

| JavaScript | Java |
| ----- | ----- |
| `let set = new Set();` | `HashSet<Integer> set = new HashSet<>();` |
| `set.add(10);` | `set.add(10);` |
| `set.has(10);` | `set.contains(10);` |
| `set.delete(10);` | `set.remove(10);` |

---

## **✅ 7\. Stack**

LIFO (Last-In-First-Out) structure used in recursion, parsing, and backtracking.

| JavaScript (using array) | Java |
| ----- | ----- |
| `let stack = [];` | `Stack<Integer> stack = new Stack<>();` |
| `stack.push(5);` | `stack.push(5);` |
| `stack.pop();` | `stack.pop();` |
| `stack[stack.length - 1]` | `stack.peek();` |
| `stack.length` | `stack.size();` |

---

## **✅ 8\. Queue**

FIFO (First-In-First-Out) structure used in BFS, task scheduling, etc.

| JavaScript (array or lib) | Java |
| ----- | ----- |
| `let queue = [];` | `Queue<Integer> queue = new LinkedList<>();` |
| `queue.push(1);` | `queue.add(1);` |
| `queue.shift();` | `queue.poll();` |
| `queue[0]` | `queue.peek();` |

---

## **✅ 9\. Tree (Binary Tree Node)**

Hierarchical structure used in binary trees, BSTs, and recursive algorithms.

| JavaScript | Java |
| :---: | :---: |

js  
CopyEdit  
`class TreeNode {`  
  `constructor(val) {`  
    `this.val = val;`  
    `this.left = null;`  
    `this.right = null;`  
  `}`  
`}`

|

java  
CopyEdit  
`class TreeNode {`  
  `int val;`  
  `TreeNode left, right;`  
  `TreeNode(int val) {`  
    `this.val = val;`  
  `}`  
`}`  
```` ``` | ````

`---`

`## ✅ 10. **Graph (Adjacency List)**`    
`Represents connections between nodes, used in DFS, BFS, shortest path algorithms.`

`| JavaScript | Java |`  
`|------------|------|`  
```` ```js ````  
`let graph = new Map();`  
`graph.set(0, [1, 2]);`

|

java  
CopyEdit  
`Map<Integer, List<Integer>> graph = new HashMap<>();`  
`graph.put(0, Arrays.asList(1, 2));`  
```` ``` | ````

`---`

`## ✅ 11. **Linked List Node**`    
`Linear structure made of nodes with references; useful in custom data structures.`

`| JavaScript | Java |`  
`|------------|------|`  
```` ```js ````  
`class ListNode {`  
  `constructor(val) {`  
    `this.val = val;`  
    `this.next = null;`  
  `}`  
`}`

|

java  
CopyEdit  
`class ListNode {`  
  `int val;`  
  `ListNode next;`  
  `ListNode(int val) {`  
    `this.val = val;`  
  `}`  
`}`  
```` ``` | ````

`---`

`Would you like me to generate this as a **PDF cheat sheet** or **code snippet folder** so you can refer to it offline as well?`

### **🔁 Functions**

| JavaScript | Java |
| ----- | ----- |
| `function add(a, b) { return a + b; }` | `int add(int a, int b) { return a + b; }` |

| JavaScript | Java |
| ----- | ----- |
| `const obj = {}` | `Map<Character, Character> map = new HashMap<>();` |
| `let stack = []` | `Stack<Character> stack = new Stack<>();` |
| `for (let char of str)` | `for (char ch : str.toCharArray())` |
| `stack.length` | `stack.size()` or `stack.isEmpty()` |
| `stack.pop()` | `stack.pop()` |
| `obj[char]` | `map.get(ch)` |
| `if (obj[char])` | `if (map.containsKey(ch))` |

### **📦 Helper Tools**

For easier DSA coding in Java:

* Use `import java.util.*;`

* Create a template class with `main()` method and commonly used methods like `inputArray`, `printArray`, etc.

* Use `Scanner sc = new Scanner(System.in);` for input.

| JavaScript | Java |
| :---- | :---- |
| class Solution \{     // Function to return a list containing the DFS traversal of the graph.          nodeList \= \[\]; // 0, 2, 3, 1     visited \= \{\}; // "0": true, '2': true, 3,1          helperDFS(adj, node) \{         this.nodeList.push(node);         this.visited\[node\] \= true;                  for (let nextNode of adj\[node\]) \{ // node 0, \[2,3,1\]                          if (\!this.visited\[nextNode\]) \{                                  this.helperDFS(adj, nextNode);                              \}                      \}              \}          dfs(adj) \{         // code here         this.helperDFS(adj, 0);         return this.nodeList;     \}      \} // let obj \= new Solution(); let ans \= obj.dfs(adj);  | import java.util.\*; class Solution \{     // Function to return a list containing the DFS traversal of the graph.     public ArrayList\<Integer\> dfsOfGraph(int V, ArrayList\<ArrayList\<Integer\>\> adj) \{                  boolean\[\] visited \= new boolean\[V\];         ArrayList\<Integer\> dfs \= new ArrayList\<\>();                         dfs(0, visited, dfs, adj);         return dfs;     \}          public void dfs(int node, boolean\[\] visited, ArrayList\<Integer\> dfs, ArrayList\<ArrayList\<Integer\>\> adj) \{         visited\[node\] \= true;         dfs.add(node);                        for (int i: adj.get(node)) \{                    if (\!visited\[i\]) \{                            dfs(i, visited, dfs, adj);                        \}              \}              \} \}  /// Solution sol \= new Solution();         List\<Integer\> result \= sol.dfs(V, adj);         System.out.println(result); // Output: \[0, 2, 3, 1\]  |
|  |  |
| class Solution \{     isBalanced(s) \{         // code here         const map \= \{             '(' : ')', '\{' : '\}', '\[' : '\]'         \}         const stack \= \[\];                  for (const char of s) \{             if(map\[char\]) \{                 stack.push(char);             \} else if (char \=== ')' || char \=== '\}' || char \=== '\]') \{                 if (stack.length \=== 0 || map\[stack.pop()\] \!== char) \{                     return false;                 \}             \}         \}         return stack.length \=== 0;     \} \}  | class Solution \{     //Function to check if brackets are balanced or not.     static boolean isBalanced(String x)     \{         // add your code here                  Map\<Character, Character\> map \= new HashMap\<\>();         map.put('(', ')');         map.put('\{', '\}');         map.put('\[', '\]');         Stack\<Character\> stack \= new Stack\<\>();         for (char ch : x.toCharArray()) \{             if (map.containsKey(ch)) \{                 stack.push(ch);             \} else if (ch \== ')' || ch \== '\}' || ch \== '\]') \{                 if (stack.isEmpty() || map.get(stack.pop()) \!= ch) \{                     return false;                 \}             \}         \}         return stack.isEmpty();     \} \}   |
| JavaScript BFS | Java BFS |
| // User function Template for javascript class Solution \{     // Function to return Breadth First Search Traversal of the given graph.          visited \= \{\};     queue \= \[\];     nodeList \= \[\];          bfs(adj) \{         // Code here         this.visited\[0\] \= true;         this.queue.push(0);              while (this.queue.length) \{                          const frontNode \= this.queue.shift();             this.nodeList.push(frontNode);                           for (let nextNode of adj\[frontNode\]) \{                                  if (\!this.visited\[nextNode\]) \{                     this.visited\[nextNode\] \= true;                     this.queue.push(nextNode);                 \}                  \}         \};                  return this.nodeList;     \} \}  | // User function Template for Java class Solution \{     // Function to return Breadth First Search Traversal of given graph.     public ArrayList\<Integer\> bfs(ArrayList\<ArrayList\<Integer\>\> adj) \{         // code here         int V \= adj.size();  // total number of vertices         boolean\[\] visited \= new boolean\[V\];         ArrayList\<Integer\> nodeList \= new ArrayList\<\>();         Queue\<Integer\> queue \= new LinkedList\<\>();                  visited\[0\] \= true;         queue.add(0);                  while (\!queue.isEmpty()) \{                          int node \= queue.poll();             nodeList.add(node);                          for (int adjNode : adj.get(node)) \{                 if (\!visited\[adjNode\]) \{                     visited\[adjNode\] \= true;                     queue.add(adjNode);                 \}                              \}                      \}                  return nodeList;              \} \}   |

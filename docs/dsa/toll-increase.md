---
title: Toll Increase
sidebar_position: 5
---

# Toll Increase

### **Structured Problem Statement**

#### **Problem Name:**

Dynamic Toll Road Network with Incremental Toll Tax

#### **Description:**

You are given a road network of `N` cities labeled from `0` to `N-1`. Initially, there are `K` bidirectional roads. Each road connects two cities and has an associated toll cost.

Your task is to calculate the **minimum toll cost** to travel from city `A` to city `B`. However, the toll tax on each road increases by a fixed amount after each iteration (like a day or time unit).

* You are to return the minimum cost to go from city `A` to city `B` in the following scenarios:

  1. Before any toll increases (initial cost).

  2. After the first toll increment (each toll increases by `inc`).

  3. After the second toll increment (again, all tolls increase by `inc`), and so on...

  4. This continues for `M` iterations (so you'll return `M+1` values).

Additionally, **new roads can be added dynamically before the toll increases**.

#### **Input:**

* `N` \- Number of cities (0 to N-1)

* `K` \- Number of initial roads

* `roads` \- A list of `K` roads, where each road is in format `[u, v, cost]`

* `M` \- Number of toll increments

* `inc` \- Amount by which each toll increases every iteration

* `newRoads` \- A list of roads to be added before toll increases. Each element is `[x, y, cost]`

* `A` \- Source city

* `B` \- Destination city

#### **Output:**

* Return an array of length `M+1` where `i-th` element is the minimum toll to go from `A` to `B` after `i` increments (0 \<= i \<= M)

### **Example Input:**

```js
N = 4
K = 4
roads = [[0,1,5], [1,2,10], [2,3,5], [0,3,20]]
M = 2
inc = 2
newRoads = [[1,3,7]]
A = 0
B = 3
```

### **Expected Output:**

```js
[15, 21, 27]  // Initial, after 1st increment, after 2nd increment
```

Explanation:

* Initial: Path 0 → 1 → 2 → 3: 5 \+ 10 \+ 5 \= 20 OR 0 → 1 → 3 (after adding new road): 5 \+ 7 \= **12**
   So shortest becomes 12

* After 1st increment: Each toll increases by 2: new costs become 7 \+ 9 \= 16
   So 5+2=7, 7+2=9 → 7+9 \= **16**

* After 2nd increment: 7+2=9, 9+2=11 → 9 \+ 11 \= **20**

### **Solution Strategy:**

1. **Model the graph using adjacency list**.

2. **Add new roads before starting toll increments**.

3. Run **Dijkstra’s algorithm** `M+1` times:

   * Once for the base case (no increment).

   * For each iteration, update each edge cost by adding `inc` to each road’s toll.

### **Similar Problems You Can Practice:**

1. **Cheapest Flights Within K Stops (Leetcode 787\)**

2. **Network Delay Time (Leetcode 743\)**

3. **\[Dijkstra Variation with Dynamic Weights (Advanced)**

```java
import java.util.\*;

class TollPathFinder {

    static class Edge {
        int to, cost;
        Edge(int to, int cost) {
            this.to \= to;
            this.cost \= cost;
        }
    }

    static class Node implements Comparable\<Node\> {
        int city, cost;
        Node(int city, int cost) {
            this.city \= city;
            this.cost \= cost;
        }
        public int compareTo(Node other) {
            return this.cost \- other.cost;
        }
    }

    public static List\<Integer\> minTollCosts(int N, List\<int\[\]\> roads, int M, int inc, List\<int\[\]\> newRoads, int A, int B) {
        // Initial graph
        List\<List\<Edge\>\> graph \= new ArrayList\<\>();
        for (int i \= 0; i \< N; i++) graph.add(new ArrayList\<\>());

        // Add initial roads
        for (int\[\] road : roads) {
            int u \= road\[0\], v \= road\[1\], cost \= road\[2\];
            graph.get(u).add(new Edge(v, cost));
            graph.get(v).add(new Edge(u, cost));
        }

        // Add new roads before toll increment
        for (int\[\] road : newRoads) {
            int u \= road\[0\], v \= road\[1\], cost \= road\[2\];
            graph.get(u).add(new Edge(v, cost));
            graph.get(v).add(new Edge(u, cost));
        }

        List\<Integer\> result \= new ArrayList\<\>();
        for (int m \= 0; m \<= M; m++) {
            int minCost \= dijkstra(graph, A, B, m \* inc);
            result.add(minCost);
        }

        return result;
    }

    // Dijkstra with added toll increment
    private static int dijkstra(List\<List\<Edge\>\> graph, int start, int end, int tollIncrease) {
        int\[\] dist \= new int\[graph.size()\];
        Arrays.fill(dist, Integer.MAX\_VALUE);
        dist\[start\] \= 0;

        PriorityQueue\<Node\> pq \= new PriorityQueue\<\>();
        pq.offer(new Node(start, 0));

        while (\!pq.isEmpty()) {
            Node curr \= pq.poll();
            int city \= curr.city, cost \= curr.cost;

            if (city \== end) return cost;

            if (cost \> dist\[city\]) continue;

            for (Edge edge : graph.get(city)) {
                int next \= edge.to;
                int nextCost \= edge.cost \+ tollIncrease;
                if (dist\[next\] \> cost \+ nextCost) {
                    dist\[next\] \= cost \+ nextCost;
                    pq.offer(new Node(next, dist\[next\]));
                }
            }
        }
        return \-1; // No path found
    }

    // Example usage
    public static void main(String\[\] args) {
        int N \= 4;
        List\<int\[\]\> roads \= Arrays.asList(
                new int\[\]{0, 1, 5},
                new int\[\]{1, 2, 10},
                new int\[\]{2, 3, 5},
                new int\[\]{0, 3, 20}
        );
        int M \= 2, inc \= 2;
        List\<int\[\]\> newRoads \= Arrays.asList(
                new int\[\]{1, 3, 7}
        );
        int A \= 0, B \= 3;

        List\<Integer\> result \= minTollCosts(N, roads, M, inc, newRoads, A, B);
        System.out.println(result);  // Output: \[12, 16, 20\]
    }
}

public void calculate(int sCity, int eCity, int M, int\[\] incrementToll, int\[\] Rat) {
    int tollInc \= 0;
    for (int m \= 0; m \<= M; m++) {
        if (m \> 0\) tollInc \+= incrementToll\[m \- 1\];
        Rat\[m\] \= dijkstra(sCity, eCity, tollInc);
    }
}
```

​​

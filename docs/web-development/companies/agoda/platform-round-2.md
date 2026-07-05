---
title: Platform Round 2
sidebar_position: 3
---

# Platform Round 2

System Design Question asked:

![][image1]  
![][image2]

Google Gimini Answered like below:  
[https://gemini.google.com/app/462f8a58b17d82c5](https://gemini.google.com/app/462f8a58b17d82c5)

Chat GPT answer: [https://chatgpt.com/c/6a3b83ab-7134-83ee-830d-4a76fad9d544](https://chatgpt.com/c/6a3b83ab-7134-83ee-830d-4a76fad9d544)  
Important: [https://chatgpt.com/c/6a3a4887-29f4-83e8-b768-be4f4a7d6ac2](https://chatgpt.com/c/6a3a4887-29f4-83e8-b768-be4f4a7d6ac2)

[https://www.youtube.com/watch?v=bLPNfs2SkWQ](https://www.youtube.com/watch?v=bLPNfs2SkWQ)  
[https://www.youtube.com/watch?v=s9Qh9fWeOAk](https://www.youtube.com/watch?v=s9Qh9fWeOAk)

## 1. Architecture

To handle high read traffic (browsing) alongside highly concurrent, real-time write spikes (last-minute bidding), a **Microservices Architecture** with an **Event-Driven core** is ideal.

### Core Components

* **API Gateway:** Acts as the entry point. It handles routing, rate limiting, and forwards public traffic (browsing) or authenticated traffic (bidding) to respective microservices.  
* **Product/Listing Service:** Manages auction items, descriptions, and initial details. Highly optimized for read-heavy operations.  
* **Bidding Service:** A high-throughput, low-latency service handling bid placement, validation, and race conditions.  
* **Real-time Update Service (WebSocket/SSE Gateway):** Manages open persistent connections with clients to push live updates (new highest bids, time changes) instantly.  
* **Notification/Worker Service:** Processes asynchronous tasks like handling expired auctions, charging winners, or sending "outbid" emails.

### Real-Time Synchronization Strategy

To keep the countdown timer and current highest bid synchronized across all clients without destroying the database:

* **Client-Side:** The frontend runs a local countdown timer initialized by the server's authoritative `end_time` and synced periodically with a server timestamp to adjust for local clock drift.  
* **Server-Side:** When a valid bid is processed, the **Bidding Service** publishes an event to a Message Broker. The **WebSocket Gateway** consumes this event and broadcasts the updated `current_highest_bid` to all clients viewing that specific product ID.

## 2. Tooling & Tech Stack

| Layer | Recommended Technology | Reason for Choice |
| ----- | ----- | ----- |
| **Frontend** | React / Next.js | Excellent state management for real-time UI updates and SSR capabilities for SEO on public product listings. |
| **Backend Services** | Go (Golang) or Node.js (TypeScript) | Go offers incredible concurrency handling and minimal memory footprint for handling massive WebSocket pools. |
| **Database (Primary)** | PostgreSQL or MySQL | Strict ACID compliance is mandatory for ensuring financial/transactional integrity during bid placement. |
| **In-Memory Cache / Queue** | Redis | Used for caching read-heavy product pages and leveraging Redis `WATCH`/Multi commands for atomic bid increments. |
| **Message Broker** | Apache Kafka or RabbitMQ | Distributes bid events to real-time sync workers asynchronously without blocking the user. |

## 3. Security

Security must be multi-layered to handle the distinct separation between unauthenticated and authenticated flows.

* **Authentication & Session Management:** Use stateless **JWTs (JSON Web Tokens)** stored in `HttpOnly, Secure, SameSite=Strict` cookies. Unauthenticated users browsing the site have no token; endpoints for placing bids reject requests lacking a valid token.  
* **API Authorization:** Enforce strict access control lists (ACLs). The system must verify that the user ID inside the JWT is active and not blacklisted before accepting a bid.  
* **Input Validation & Business Logic Protection:**  
  * Sanitize inputs against SQL Injection and XSS.  
  * **Server-Side Bid Verification:** Never trust the frontend. The server must check: `Is auction_end_time > current_time?` and `Is new_bid_amount >= current_highest_bid + minimum_increment?`.  
* **Rate Limiting & Bot Mitigation:** Implement Token Bucket rate limiting at the API Gateway level (e.g., max 5 bid attempts per second per user) to mitigate automated sniping scripts and DDoS attacks.

## 4. Data Model

A relational schema ensures data integrity and prevents duplicate or conflicting bid states.

### `users` Table

SQL  
CREATE TABLE users (  
    id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),  
    email VARCHAR(255) UNIQUE NOT NULL,  
    password\_hash VARCHAR(255) NOT NULL,  
    created\_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()  
);

### `products` Table

SQL  
CREATE TABLE products (  
    id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),  
    title VARCHAR(255) NOT NULL,  
    description TEXT,  
    starting\_price NUMERIC(12, 2\) NOT NULL,  
    current\_highest\_bid NUMERIC(12, 2\) DEFAULT 0.00,  
    start\_time TIMESTAMP WITH TIME ZONE NOT NULL,  
    end\_time TIMESTAMP WITH TIME ZONE NOT NULL,  
    status VARCHAR(20) DEFAULT 'active', \-- active, completed, cancelled  
    version INT DEFAULT 1 \-- Used for optimistic locking  
);  
CREATE INDEX idx\_products\_status\_end\_time ON products(status, end\_time);

### `bids` Table

SQL  
CREATE TABLE bids (  
    id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),  
    product\_id UUID REFERENCES products(id) ON DELETE CASCADE,  
    user\_id UUID REFERENCES users(id),  
    amount NUMERIC(12, 2\) NOT NULL,  
    bid\_time TIMESTAMP WITH TIME ZONE DEFAULT NOW()  
);  
CREATE INDEX idx\_bids\_product\_amount ON bids(product\_id, amount DESC);

## 5. Performance & Scalability

The primary challenge of a bidding site is the **"Sniper Effect"**—thousands of users bidding on the same item in the final seconds of an auction.

### Handling Race Conditions (Concurrency)

If two users bid $100 at the exact same millisecond, only one should succeed.

* **Option A (Database Level \- Optimistic Locking):** \`\`\`sql UPDATE products SET current\_highest\_bid \= 100, version \= version \+ 1 WHERE id \= 'prod\_uuid' AND version \= current\_version AND end\_time \> NOW();

If another transaction updated the version first, this query fails, and the application safely rejects the second bid.

*   
*   
* **Option B (In-Memory Distributed Lock \- Redis):** Use Redis to process bids for a specific `product_id` sequentially using Lua scripts. This offloads transactional strain from your primary SQL database during peak traffic.

### Caching Strategy

* **Unauthenticated Browsing:** Cache the main product catalog page entirely using a CDN (like Cloudflare) or Redis. Cache invalidation happens only when a new item is added or every few minutes.  
* **Active Bid Pages:** Serve the static layout immediately. Fetch the dynamic state (`current_highest_bid` and `end_time`) via a fast API call, then hand off updates entirely to the WebSocket pool.

## 6. Testing

* **Unit Testing:** Focus closely on the core validation engine. Write test cases for bid amounts below the threshold, bids submitted exactly at `end_time`, and bids submitted a millisecond after closure.  
* **Concurrency & Race Condition Testing:** Write multi-threaded integration tests where 100 virtual users attempt to place a bid on the same item simultaneously. Assert that your database versioning/locking mechanism allows exactly one bid to win a specific spot and rejects the other 99\.  
* **Load & Stress Testing:** Use tools like **K6** or **Locust** to simulate thousands of concurrent unauthenticated connections browsing pages while hundreds of authenticated users bombard the WebSocket/Bidding endpoint to discover where bottlenecks occur.

## 7. Monitoring & Observability

* **Metrics Collection (Prometheus & Grafana):**  
  * Monitor the number of active, open WebSocket connections.  
  * Track **p99 latency** for the `placeBid` API endpoint (it should ideally remain under 50ms).  
  * Monitor database lock durations and connection pool saturation.  
* **Distributed Tracing (Jaeger / OpenTelemetry):** Crucial for tracking a bid’s lifecycle across boundaries—from the moment a user clicks "Submit Bid", through the API Gateway, into the Bidding Service, and out to the WebSocket broadcast.  
* **Alerting Rules:** Set up immediate notifications (e.g., Slack/PagerDuty) if the API error rate exceeds 1% or if the message broker's lag spikes significantly, which indicates real-time updates are falling behind.

[image1]: /img/docs/web-development/companies/agoda/platform-round-2/platform-round-2-01.png
[image2]: /img/docs/web-development/companies/agoda/platform-round-2/platform-round-2-02.png

---
title: Node.js Interview Q&A
sidebar_position: 2
---

# Node.js Interview Q&A

Related canonical pages: [JWT & CSRF](../security-auth/jwt-csrf-token-storage.md), [XSS](../security-auth/xss-cross-site-scripting.md). For browser JavaScript scheduling, see [Event Loop](../javascript/event-loop.md).

- [https://chatgpt.com/c/6a360edc-0a54-83e8-a26b-bb8c318e5252](https://chatgpt.com/c/6a360edc-0a54-83e8-a26b-bb8c318e5252)

- [https://chatgpt.com/share/6a360f76-7f40-83ee-bae2-a1d29ff5047b](https://chatgpt.com/share/6a360f76-7f40-83ee-bae2-a1d29ff5047b)

Below is a **practical Node.js interview preparation guide** with the most commonly asked and important questions. I’m keeping it focused for frontend/full-stack interviews, especially where Node.js is used for **BFF, APIs, caching, authentication, rate limiting, and scalable services**.

\# Node.js Interview Questions and Answers

\#\# 1\. What is Node.js?

Node.js is a JavaScript runtime built on Chrome’s V8 engine. It allows JavaScript to run outside the browser, mainly on the server side.

In simple terms, Node.js lets us build backend services using JavaScript.

\#\#\# Why Node.js is popular

\- Uses JavaScript for backend
\- Good for I/O-heavy applications
\- Non-blocking and asynchronous by default
\- Great for APIs, BFF layers, real-time apps, streaming, and microservices
\- Large npm ecosystem

\#\#\# Interview-ready answer

Node.js is a server-side JavaScript runtime built on V8. It is commonly used to build APIs, BFF services, real-time applications, and microservices. Its main strength is non-blocking I/O, which allows it to handle many concurrent requests efficiently.

\---

\#\# 2\. Is Node.js single-threaded?

Yes and no.

The JavaScript execution in Node.js runs on a single main thread, but Node.js internally uses multiple threads through libuv for tasks like file system operations, DNS lookup, crypto, and compression.

\#\#\# Simple explanation

Your JavaScript code runs on one main thread.

But Node.js delegates expensive async work to the background thread pool or operating system, then continues processing other requests.

\#\#\# Example

\`\`\`js
const fs \= require("fs");

console.log("Start");

fs.readFile("data.txt", "utf8", () \=\> \{
 console.log("File read completed");
\});

console.log("End");

Output:

Start
End
File read completed

Node.js does not wait for file reading to complete. It registers the callback and continues.

### Interview-ready answer

Node.js has a single-threaded event loop for executing JavaScript, but internally it uses libuv and a thread pool for certain asynchronous operations. This makes Node.js efficient for I/O-bound workloads.

---

## 3. What is the Event Loop in Node.js?

The event loop is the mechanism that allows Node.js to perform non-blocking operations even though JavaScript runs on a single thread.

It continuously checks whether the call stack is empty and then picks pending callbacks from different queues.

### Mental model

Node.js does not create one thread per request.

Instead:

1. Request comes in.
2. If it is async I/O, Node.js delegates it.
3. Main thread becomes free.
4. When I/O is done, callback is pushed to a queue.
5. Event loop picks it and executes it.

### Interview-ready answer

The event loop is the core mechanism that allows Node.js to handle asynchronous operations. It manages callback execution from different queues and ensures that non-blocking operations like timers, network calls, and file reads are handled efficiently.

---

## 4. What are the phases of the Node.js Event Loop?

The main phases are:

1. Timers
2. Pending callbacks
3. Idle/prepare
4. Poll
5. Check
6. Close callbacks

### Important ones for interviews

#### Timers phase

Executes callbacks scheduled by:

setTimeout()
setInterval()

#### Poll phase

Handles I/O callbacks such as file system and network callbacks.

#### Check phase

Executes:

setImmediate()

#### Close callbacks

Handles close events like socket close.

### Interview-ready answer

The event loop has multiple phases like timers, poll, check, and close callbacks. Timers handle `setTimeout` and `setInterval`, poll handles I/O callbacks, check handles `setImmediate`, and close callbacks handle cleanup events.

---

## 5. Difference between setTimeout, setImmediate, and process.nextTick

### setTimeout

Runs after the given delay, but not exactly guaranteed.

setTimeout(() \=\> \{
 console.log("timeout");
\}, 0);

### setImmediate

Runs in the check phase of the event loop.

setImmediate(() \=\> \{
 console.log("immediate");
\});

### process.nextTick

Runs before the event loop continues to the next phase.

process.nextTick(() \=\> \{
 console.log("nextTick");
\});

### Example

console.log("start");

setTimeout(() \=\> console.log("timeout"), 0);

setImmediate(() \=\> console.log("immediate"));

process.nextTick(() \=\> console.log("nextTick"));

Promise.resolve().then(() \=\> console.log("promise"));

console.log("end");

Output:

start
end
nextTick
promise
timeout / immediate

`setTimeout` and `setImmediate` order can vary depending on context.

### Interview-ready answer

`process.nextTick` runs before the event loop moves to the next phase. Promise callbacks run in the microtask queue. `setTimeout` runs in the timers phase, while `setImmediate` runs in the check phase. Their order can vary depending on where they are scheduled.

---

## 6. What is non-blocking I/O?

Non-blocking I/O means Node.js does not wait for an operation to complete before moving to the next task.

### Blocking example

const fs \= require("fs");

const data \= fs.readFileSync("data.txt", "utf8");
console.log(data);

console.log("Next line");

Here, Node.js waits until the file is read.

### Non-blocking example

const fs \= require("fs");

fs.readFile("data.txt", "utf8", (err, data) \=\> \{
 console.log(data);
\});

console.log("Next line");

Here, Node.js continues execution without waiting.

### Interview-ready answer

Non-blocking I/O means long-running operations like file reads, database calls, or network requests do not block the main thread. Node.js registers a callback or promise and continues executing other work.

---

## 7. Why is Node.js good for I/O-heavy applications?

Node.js is good for I/O-heavy applications because most of the time backend services wait for external systems such as databases, APIs, caches, and file systems.

Node.js can handle many concurrent requests without blocking one request behind another.

### Good use cases

* REST APIs
* BFF layer
* Chat apps
* Notification systems
* Streaming
* Real-time dashboards
* API gateway
* Microservices

### Not ideal for

* Heavy CPU computation
* Image/video processing
* Large mathematical calculations
* ML model execution

### Interview-ready answer

Node.js is very efficient for I/O-heavy workloads because it uses non-blocking I/O and an event loop. It can serve many concurrent requests while waiting for databases, APIs, or file systems. But for CPU-heavy tasks, we may need worker threads, queues, or separate services.

---

## 8. What is callback hell?

Callback hell happens when multiple async operations are nested inside each other, making code hard to read and maintain.

### Example

getUser(userId, (user) \=\> \{
 getOrders(user.id, (orders) \=\> \{
   getPayment(orders\[0\].id, (payment) \=\> \{
     sendEmail(payment, () \=\> \{
       console.log("Done");
     \});
   \});
 \});
\});

### Better approach using async/await

async function processOrder(userId) \{
 const user \= await getUser(userId);
 const orders \= await getOrders(user.id);
 const payment \= await getPayment(orders\[0\].id);
 await sendEmail(payment);

 console.log("Done");
\}

### Interview-ready answer

Callback hell is deeply nested callback-based async code. It makes error handling and readability difficult. We can avoid it using promises, async/await, modular functions, and proper error handling.

---

## 9. What is the difference between callback, promise, and async/await?

### Callback

A function passed to another function and called later.

fs.readFile("file.txt", (err, data) \=\> \{
 if (err) return console.error(err);
 console.log(data);
\});

### Promise

Represents a future value.

fetchUser()
 .then((user) \=\> console.log(user))
 .catch((err) \=\> console.error(err));

### async/await

Cleaner syntax over promises.

async function loadUser() \{
 try \{
   const user \= await fetchUser();
   console.log(user);
 \} catch (err) \{
   console.error(err);
 \}
\}

### Interview-ready answer

Callbacks were the older way to handle async operations. Promises improved readability and error handling. Async/await is syntax built on top of promises that makes async code look synchronous and easier to maintain.

---

## 10. How does error handling work in Node.js?

Error handling depends on the style of code.

### Callback style

fs.readFile("data.txt", (err, data) \=\> \{
 if (err) \{
   return console.error(err);
 \}

 console.log(data);
\});

Node.js usually follows the error-first callback pattern.

### Promise style

fetchUser()
 .then((user) \=\> console.log(user))
 .catch((err) \=\> console.error(err));

### async/await style

async function getUser() \{
 try \{
   const user \= await fetchUser();
   return user;
 \} catch (err) \{
   console.error(err);
   throw err;
 \}
\}

### Express error middleware

app.use((err, req, res, next) \=\> \{
 console.error(err);

 res.status(500).json(\{
   message: "Something went wrong",
 \});
\});

### Interview-ready answer

In Node.js, error handling can be done using error-first callbacks, promise `.catch()`, or `try/catch` with async/await. In Express, centralized error-handling middleware is commonly used to avoid repeating error logic in every route.

---

## 11. What is Express.js?

Express.js is a lightweight web framework for Node.js.

It helps us build APIs and web servers easily.

### Example

const express \= require("express");

const app \= express();

app.get("/health", (req, res) \=\> \{
 res.json(\{ status: "ok" \});
\});

app.listen(3000, () \=\> \{
 console.log("Server running on port 3000");
\});

### Why Express is used

* Routing
* Middleware
* Request/response handling
* Error handling
* API creation
* Authentication integration

### Interview-ready answer

Express is a minimal Node.js framework used to build REST APIs and web servers. It provides routing, middleware support, request parsing, response handling, and centralized error handling.

---

## 12. What is middleware in Express?

Middleware is a function that runs between the request and response cycle.

It can modify the request, modify the response, end the request, or pass control to the next middleware.

### Example

function logger(req, res, next) \{
 console.log(\`$\{req.method\} $\{req.url\}\`);
 next();
\}

app.use(logger);

### Common middleware examples

* Authentication
* Authorization
* Logging
* Request validation
* Rate limiting
* CORS
* JSON body parsing
* Error handling

### Interview-ready answer

Middleware is a function that sits in the request-response pipeline. It can process requests, add data to `req`, validate input, check authentication, log requests, or handle errors before passing control using `next()`.

---

## 13. What is the difference between app.use and app.get?

### app.use

Used to register middleware.

app.use(express.json());

It can run for all HTTP methods.

### app.get

Used to register a route handler for GET requests.

app.get("/users", getUsers);

### Interview-ready answer

`app.use` is used for middleware and can apply to all HTTP methods or route prefixes. `app.get` is used specifically to handle GET requests for a route.

---

## 14. What is REST API in Node.js?

A REST API exposes resources using HTTP methods.

### Example

GET /users        \-\> get users
GET /users/:id    \-\> get one user
POST /users       \-\> create user
PUT /users/:id    \-\> replace user
PATCH /users/:id  \-\> partially update user
DELETE /users/:id \-\> delete user

### Example route

app.get("/users/:id", async (req, res, next) \=\> \{
 try \{
   const user \= await userService.getUser(req.params.id);
   res.json(user);
 \} catch (err) \{
   next(err);
 \}
\});

### Interview-ready answer

A REST API uses HTTP methods and URLs to perform operations on resources. In Node.js, we commonly build REST APIs using Express with routes, controllers, services, validation, and error middleware.

---

## 15. How would you structure a Node.js project?

A clean structure could look like this:

src/
 config/
   env.js
   db.js
 routes/
   user.routes.js
 controllers/
   user.controller.js
 services/
   user.service.js
 repositories/
   user.repository.js
 middlewares/
   auth.middleware.js
   error.middleware.js
   rateLimit.middleware.js
 validators/
   user.validator.js
 utils/
   logger.js
 app.js
 server.js

### Responsibilities

`routes` define API endpoints.

`controllers` handle request and response.

`services` contain business logic.

`repositories` handle database queries.

`middlewares` handle cross-cutting concerns.

`config` stores environment and setup logic.

### Interview-ready answer

I usually structure a Node.js app by separating routes, controllers, services, repositories, middleware, config, and utilities. This keeps request handling, business logic, and data access separate, which makes the code easier to test and maintain.

---

## 16. What is package.json?

`package.json` is the metadata file of a Node.js project.

It contains:

* Project name and version
* Scripts
* Dependencies
* Dev dependencies
* Entry point
* Node/npm version config

### Example

\{
 "scripts": \{
   "start": "node src/server.js",
   "dev": "nodemon src/server.js",
   "test": "jest"
 \},
 "dependencies": \{
   "express": "^4.18.0"
 \},
 "devDependencies": \{
   "nodemon": "^3.0.0"
 \}
\}

### Interview-ready answer

`package.json` manages project metadata, dependencies, scripts, and configuration. It is the central file npm uses to install packages and run project commands.

---

## 17. Difference between dependencies and devDependencies

### dependencies

Required to run the application in production.

Examples:

express
mongoose
jsonwebtoken
axios

### devDependencies

Required only during development or build/test time.

Examples:

nodemon
jest
eslint
prettier
typescript

### Interview-ready answer

`dependencies` are needed at runtime in production, while `devDependencies` are only needed for development, testing, linting, or building the application.

---

## 18. What is npm?

npm is the package manager for Node.js.

It is used to:

* Install packages
* Manage dependencies
* Run scripts
* Publish packages

### Example

npm install express
npm run dev
npm test

### Interview-ready answer

npm is Node’s package manager. It helps install third-party packages, manage dependencies, run scripts, and publish reusable packages.

---

## 19. What is CommonJS vs ES Modules?

Node.js supports two module systems.

### CommonJS

Older Node.js style.

const express \= require("express");

module.exports \= app;

### ES Modules

Modern JavaScript module syntax.

\import express from "express";

\export default app;

### Key difference

CommonJS loads modules synchronously.

ES Modules support static analysis and are standard JavaScript modules.

### Interview-ready answer

CommonJS uses `require` and `module.exports`, while ES Modules use `import` and `export`. ES Modules are the standard JavaScript module system, while CommonJS is the older Node.js module format.

---

## 20. What is CORS?

CORS means Cross-Origin Resource Sharing.

It is a browser security mechanism that controls whether a frontend from one origin can access resources from another origin.

### Example

Frontend:

- https://app.example.com

Backend:

- https://api.example.com

This is cross-origin because the subdomain is different.

### Express setup

const cors \= require("cors");

app.use(
 cors(\{
   origin: "https://app.example.com",
   credentials: true,
 \})
);

### Interview-ready answer

CORS is a browser security policy that controls cross-origin API access. In Node.js/Express, we configure allowed origins, methods, headers, and credentials using CORS middleware. CORS is enforced by browsers, not by tools like Postman.

---

## 21. How do you implement authentication in Node.js?

Authentication verifies who the user is.

Common flow:

1. User logs in with email/password.
2. Server validates credentials.
3. Server creates access token.
4. Client sends token in future requests.
5. Server validates token and allows access.

### JWT example

const jwt \= require("jsonwebtoken");

const token \= jwt.sign(
 \{ userId: user.id, role: user.role \},
 process.env.JWT\_SECRET,
 \{ expiresIn: "15m" \}
);

### Middleware

function authMiddleware(req, res, next) \{
 const authHeader \= req.headers.authorization;

 if (\!authHeader) \{
   return res.status(401).json(\{ message: "Token missing" \});
 \}

 const token \= authHeader.split(" ")\[1\];

 try \{
   const payload \= jwt.verify(token, process.env.JWT\_SECRET);
   req.user \= payload;
   next();
 \} catch \{
   res.status(401).json(\{ message: "Invalid token" \});
 \}
\}

### Interview-ready answer

In Node.js, authentication is commonly implemented using sessions or JWTs. For JWT-based auth, the server validates credentials, issues a token, and protects routes using middleware that verifies the token on every request.

---

## 22. Authentication vs Authorization

### Authentication

Checks who the user is.

Example:

Is this user logged in?

### Authorization

Checks what the user is allowed to do.

Example:

Can this user delete this record?

### Interview-ready answer

Authentication verifies identity, while authorization verifies permissions. Login is authentication. Role-based access like admin, editor, or viewer is authorization.

---

## 23. How do you implement authorization in Node.js?

Authorization is usually implemented using middleware.

### Example

function requireRole(role) \{
 return function (req, res, next) \{
   if (req.user.role \!== role) \{
     return res.status(403).json(\{ message: "Forbidden" \});
   \}

   next();
 \};
\}

app.delete("/users/:id", authMiddleware, requireRole("admin"), deleteUser);

### Interview-ready answer

Authorization can be implemented using role-based or permission-based middleware. After authentication, we check the user’s role or permissions before allowing access to a route or operation.

---

## 24. What is JWT?

JWT means JSON Web Token.

It is a compact token format used to securely transfer claims between client and server.

A JWT has three parts:

header.payload.signature

### Important point

JWT is signed, not encrypted by default.

That means anyone can decode the payload, but they cannot modify it without invalidating the signature.

### Interview-ready answer

JWT is a signed token format used for stateless authentication. It contains claims like user ID and role. The server verifies the signature to ensure the token was not modified. Sensitive information should not be stored in JWT payload because it is only base64 encoded, not encrypted.

---

## 25. How do refresh tokens work?

Access tokens are short-lived.

Refresh tokens are longer-lived and used to get new access tokens.

### Flow

1. User logs in.
2. Server returns access token and refresh token.
3. Access token expires after a short time.
4. Client sends refresh token to get a new access token.
5. Server validates refresh token and issues new access token.

### Interview-ready answer

Refresh tokens are used to renew short-lived access tokens without asking the user to log in again. They should be stored securely, rotated when possible, and invalidated during logout or suspicious activity.

---

## 26. Where should tokens be stored?

### Common options

#### HttpOnly Secure cookies

More secure against XSS because JavaScript cannot read them.

#### LocalStorage

Easy to use but vulnerable to XSS because JavaScript can access it.

#### In-memory

Safer from persistent theft but lost on page refresh.

### Interview-ready answer

For security-sensitive apps, HttpOnly Secure SameSite cookies are preferred because JavaScript cannot access them. LocalStorage is convenient but more exposed to XSS. Token storage depends on the security requirements and architecture.

---

## 27. How do you handle file uploads in Node.js?

Commonly using middleware like `multer`.

### Example

const multer \= require("multer");

const upload \= multer(\{
 dest: "uploads/",
\});

app.post("/upload", upload.single("file"), (req, res) \=\> \{
 res.json(\{
   filename: req.file.filename,
   size: req.file.size,
 \});
\});

### Production considerations

* Validate file type
* Limit file size
* Scan for malware if needed
* Store in object storage like S3
* Do not trust original filename
* Use signed URLs for download

### Interview-ready answer

File uploads in Node.js are usually handled using middleware like multer. In production, we validate file type and size, store files in object storage like S3, avoid trusting user filenames, and use signed URLs for controlled access.

---

## 28. How do you implement rate limiting in Node.js?

Rate limiting controls how many requests a user/IP can make in a given time.

### Simple Express example

const rateLimit \= require("express-rate-limit");

const limiter \= rateLimit(\{
 windowMs: 60 \* 1000,
 max: 100,
 message: "Too many requests, please try again later",
\});

app.use(limiter);

### In distributed systems

Use Redis because multiple Node.js instances need shared state.

### Interview-ready answer

Rate limiting protects APIs from abuse and accidental overuse. For a single instance, in-memory rate limiting may work. For production with multiple instances, Redis-based rate limiting is better because all servers share the same counter.

---

## 29. How would you implement caching in Node.js?

Caching can be done at multiple levels.

### Common caching options

* In-memory cache
* Redis cache
* CDN cache
* Browser cache
* Database query cache

### Example using Redis mental model

async function getUser(userId) \{
 const cacheKey \= \`user:$\{userId\}\`;

 const cachedUser \= await redis.get(cacheKey);

 if (cachedUser) \{
   return JSON.parse(cachedUser);
 \}

 const user \= await db.users.findById(userId);

 await redis.set(cacheKey, JSON.stringify(user), \{
   EX: 300,
 \});

 return user;
\}

### Interview-ready answer

In Node.js, caching can be implemented using in-memory cache for simple cases or Redis for distributed systems. The common pattern is cache-aside: first check cache, if not found fetch from DB/API, store in cache with TTL, and return response.

---

## 30. What is BFF in Node.js?

BFF means Backend for Frontend.

It is a backend layer designed specifically for a frontend application.

### Why BFF is useful

Frontend may need data from multiple services.

Instead of the frontend calling many APIs, the BFF aggregates and transforms data.

### Example

For a dashboard page, frontend needs:

/user-profile
/orders
/recommendations
/notifications

BFF can expose one API:

GET /dashboard

Internally, it calls multiple services and returns UI-friendly data.

### Interview-ready answer

A BFF is a backend layer created for a specific frontend experience. In Node.js, a BFF can aggregate multiple backend APIs, transform data for UI needs, handle authentication, caching, error normalization, and reduce frontend complexity.

---

## 31. Why use Node.js for BFF?

Node.js is a good fit for BFF because:

* Frontend and BFF can share JavaScript/TypeScript knowledge
* Good for API aggregation
* Handles I/O-heavy calls well
* Easy to shape responses for UI
* Works well with GraphQL or REST
* Can add caching, rate limiting, and auth logic

### Interview-ready answer

Node.js is useful for BFF because BFFs are usually I/O-heavy. They call multiple downstream APIs, aggregate data, and return UI-specific responses. Node’s non-blocking model handles this well, and frontend teams can maintain it more easily using JavaScript or TypeScript.

---

## 32. How do you handle multiple API calls in a BFF?

Use parallel calls where possible.

### Example

async function getDashboard(req, res, next) \{
 try \{
   const \[profile, orders, notifications\] \= await Promise.all(\[
     userService.getProfile(req.user.id),
     orderService.getOrders(req.user.id),
     notificationService.getNotifications(req.user.id),
   \]);

   res.json(\{
     profile,
     orders,
     notifications,
   \});
 \} catch (err) \{
   next(err);
 \}
\}

### But handle partial failures carefully

Sometimes one API failure should not fail the whole page.

const results \= await Promise.allSettled(\[
 userService.getProfile(userId),
 orderService.getOrders(userId),
 notificationService.getNotifications(userId),
\]);

### Interview-ready answer

In a BFF, I use `Promise.all` when all APIs are mandatory and `Promise.allSettled` when partial response is acceptable. I also apply timeouts, retries, caching, and fallback responses to avoid one slow service breaking the entire frontend.

---

## 33. How do you handle timeout in Node.js API calls?

Timeout prevents the server from waiting forever for a slow downstream service.

### Example using AbortController

async function fetchWithTimeout(url, timeoutMs \= 3000\) \{
 const controller \= new AbortController();

 const timerId \= setTimeout(() \=\> \{
   controller.abort();
 \}, timeoutMs);

 try \{
   const response \= await fetch(url, \{
     signal: controller.signal,
   \});

   return response.json();
 \} finally \{
   clearTimeout(timerId);
 \}
\}

### Interview-ready answer

Timeouts are important when Node.js calls downstream APIs. Without timeout, requests can hang and consume resources. I usually configure request timeout, retry only safe failures, and return fallback or partial data where possible.

---

## 34. How do you implement retries in Node.js?

Retries should be used carefully.

Retry is useful for temporary failures like:

* Network timeout
* 502
* 503
* 504

Avoid retrying:

* 400
* 401
* 403
* Validation errors
* Non-idempotent POST without safeguards

### Simple retry example

async function retry(fn, retries \= 3\) \{
 let lastError;

 for (let i \= 0; i \< retries; i++) \{
   try \{
     return await fn();
   \} catch (err) \{
     lastError \= err;
   \}
 \}

 throw lastError;
\}

### Interview-ready answer

Retries should be used for transient failures, not all failures. I would retry timeouts or 5xx errors with exponential backoff and jitter, but avoid retrying validation errors or unsafe non-idempotent operations.

---

## 35. How do you prevent duplicate API requests in Node.js?

There are multiple approaches.

### Request deduplication

If the same request is already in progress, return the same promise.

const inFlightRequests \= new Map();

async function getCachedUser(userId) \{
 const key \= \`user:$\{userId\}\`;

 if (inFlightRequests.has(key)) \{
   return inFlightRequests.get(key);
 \}

 const promise \= userService.getUser(userId).finally(() \=\> \{
   inFlightRequests.delete(key);
 \});

 inFlightRequests.set(key, promise);

 return promise;
\}

### Other options

* Cache response with TTL
* Idempotency key
* Debounce on frontend
* Queue duplicate jobs
* Use database constraints

### Interview-ready answer

Duplicate requests can be handled using caching, request deduplication, idempotency keys, or database constraints. For read APIs, I may use in-flight promise deduplication. For write APIs, I prefer idempotency keys to avoid duplicate actions.

---

## 36. What is idempotency?

Idempotency means making the same request multiple times has the same final result.

### Example

DELETE /user/123

Calling it once or multiple times should result in the user being deleted.

### Payment example

For payments, if the user clicks “Pay” multiple times, we should not charge multiple times.

Client sends:

Idempotency-Key: abc-123

Server stores the result for that key and returns the same result for duplicate requests.

### Interview-ready answer

Idempotency means repeated execution of the same request produces the same outcome. It is important for payment, booking, order creation, and retry-safe APIs. We can implement it using idempotency keys stored in Redis or database.

---

## 37. How do you secure a Node.js API?

Important practices:

* Validate input
* Sanitize user data
* Use authentication and authorization
* Use HTTPS
* Use Helmet for security headers
* Configure CORS properly
* Rate limit APIs
* Avoid leaking stack traces
* Store secrets in environment variables or secret manager
* Hash passwords using bcrypt/argon2
* Prevent SQL/NoSQL injection
* Keep dependencies updated
* Use logging and monitoring

### Example

const helmet \= require("helmet");

app.use(helmet());
app.use(express.json(\{ limit: "1mb" \}));

### Interview-ready answer

To secure a Node.js API, I validate inputs, enforce authentication and authorization, configure CORS correctly, use HTTPS, rate limiting, security headers with Helmet, safe password hashing, secret management, and avoid exposing internal errors to clients.

---

## 38. What is Helmet in Node.js?

Helmet is Express middleware that sets security-related HTTP headers.

### Example

const helmet \= require("helmet");

app.use(helmet());

### It helps with headers like

* Content-Security-Policy
* X-Content-Type-Options
* X-Frame-Options
* Referrer-Policy

### Interview-ready answer

Helmet is an Express middleware that improves security by setting HTTP headers. It helps protect against common web vulnerabilities like clickjacking, MIME sniffing, and weak browser security defaults.

---

## 39. How do you validate requests in Node.js?

Use a validation library like Joi, Zod, or express-validator.

### Example with Zod

const \{ z \} \= require("zod");

const createUserSchema \= z.object(\{
 name: z.string().min(1),
 email: z.string().email(),
\});

function validateCreateUser(req, res, next) \{
 const result \= createUserSchema.safeParse(req.body);

 if (\!result.success) \{
   return res.status(400).json(\{
     message: "Invalid request",
     errors: result.error.errors,
   \});
 \}

 req.body \= result.data;
 next();
\}

### Interview-ready answer

Request validation should happen at the API boundary before business logic. I usually validate body, params, and query using libraries like Zod or Joi and return clear 400 responses for invalid input.

---

## 40. How do you handle logging in Node.js?

Use structured logging.

Common libraries:

* Winston
* Pino
* Bunyan

### Example log

logger.info(\{
 message: "Order created",
 orderId,
 userId,
 requestId,
\});

### Good logs include

* Timestamp
* Request ID
* User ID if safe
* Route
* Status code
* Error stack for server logs
* Latency

### Interview-ready answer

In production, I use structured logging with a request ID so logs can be traced across services. I avoid logging sensitive data like passwords, tokens, and personal information.

---

## 41. How do you monitor a Node.js application?

Important things to monitor:

* Error rate
* Latency
* Throughput
* CPU usage
* Memory usage
* Event loop lag
* Database latency
* External API latency
* Cache hit/miss ratio

### Tools

* Prometheus
* Grafana
* ELK
* Datadog
* New Relic
* OpenTelemetry

### Interview-ready answer

I monitor Node.js apps using logs, metrics, and traces. Important metrics include request latency, error rate, throughput, CPU, memory, event loop lag, database latency, and external service failures.

---

## 42. What is event loop lag?

Event loop lag means the event loop is blocked and cannot process callbacks on time.

### Common causes

* Heavy CPU work
* Large JSON parsing
* Synchronous file operations
* Blocking loops
* Large encryption/compression work

### Example bad code

for (let i \= 0; i \< 1e10; i++) \{
 // blocks event loop
\}

During this time, Node.js cannot respond to other requests.

### Interview-ready answer

Event loop lag happens when the Node.js main thread is blocked by CPU-heavy or synchronous work. It affects latency because pending callbacks and requests cannot be processed on time.

---

## 43. How do you handle CPU-heavy work in Node.js?

Options:

* Worker Threads
* Child processes
* Job queue
* Separate microservice
* Move heavy work to background processing

### Worker thread example

const \{ Worker \} \= require("worker\_threads");

function runWorker(data) \{
 return new Promise((resolve, reject) \=\> \{
   const worker \= new Worker("./worker.js", \{
     workerData: data,
   \});

   worker.on("message", resolve);
   worker.on("error", reject);
 \});
\}

### Interview-ready answer

For CPU-heavy tasks, I avoid blocking the event loop. I move the work to worker threads, child processes, queues, or separate services depending on the workload and scaling needs.

---

## 44. What are Worker Threads?

Worker Threads allow Node.js to run JavaScript in separate threads.

They are useful for CPU-intensive work.

### Good use cases

* Image processing
* Data transformation
* Compression
* Encryption
* Large calculations

### Interview-ready answer

Worker Threads allow CPU-heavy JavaScript work to run outside the main event loop. They help keep the main Node.js thread responsive while heavy computation runs in parallel.

---

## 45. What is clustering in Node.js?

Clustering allows Node.js to use multiple CPU cores by running multiple worker processes.

### Why needed?

A single Node.js process runs JavaScript on one main thread. On a multi-core machine, clustering helps utilize more CPU cores.

### Interview-ready answer

Clustering means running multiple Node.js worker processes to use multiple CPU cores. It improves throughput, but shared state should be externalized using Redis, database, or another shared store.

---

## 46. How do you scale Node.js applications?

Common ways:

* Run multiple instances
* Use load balancer
* Use clustering or containers
* Use Redis for shared cache/session
* Use database connection pooling
* Use queues for async work
* Add CDN for static content
* Horizontal scaling with Kubernetes
* Monitor bottlenecks

### Interview-ready answer

Node.js apps are usually scaled horizontally by running multiple instances behind a load balancer. Shared state like sessions, cache, and rate-limit counters should be moved to Redis or database. For background work, queues are used.

---

## 47. What is a memory leak in Node.js?

A memory leak happens when memory is no longer needed but is still referenced, so garbage collection cannot clean it.

### Common causes

* Global variables
* Unbounded cache
* Event listeners not removed
* Large objects stored in closures
* Timers not cleared
* Maps that keep growing forever

### Example

const cache \= new Map();

app.get("/user/:id", async (req, res) \=\> \{
 const user \= await getUser(req.params.id);

 cache.set(req.params.id, user); // grows forever

 res.json(user);
\});

### Fix

Use TTL or LRU cache.

### Interview-ready answer

A memory leak happens when unused objects are still referenced. In Node.js, common causes include unbounded caches, global variables, uncleared timers, and event listeners. I detect leaks using memory profiling, heap snapshots, and monitoring memory growth over time.

---

## 48. What is connection pooling?

Connection pooling means reusing database connections instead of creating a new connection for every request.

### Why useful?

Creating database connections is expensive.

A pool keeps a fixed number of reusable connections.

### Interview-ready answer

Connection pooling improves performance by reusing database connections. It avoids the overhead of creating a new connection for every request and protects the database from too many connections.

---

## 49. How do you handle database queries in Node.js?

Good practices:

* Use parameterized queries
* Avoid SQL injection
* Use indexes
* Use pagination
* Avoid N+1 queries
* Use connection pooling
* Set query timeout
* Handle transactions carefully

### Interview-ready answer

For database queries, I use parameterized queries or ORM-safe methods, connection pooling, pagination, indexes, and proper error handling. For complex operations, I use transactions to maintain consistency.

---

## 50. What is SQL injection and how do you prevent it?

SQL injection happens when user input is directly inserted into SQL queries.

### Bad example

const query \= \`SELECT \* FROM users WHERE email \= '$\{email\}'\`;

An attacker can modify the query using malicious input.

### Safe example

const result \= await db.query(
 "SELECT \* FROM users WHERE email \= $1",
 \[email\]
);

### Interview-ready answer

SQL injection happens when unsafe user input becomes part of a database query. It can be prevented using parameterized queries, ORM-safe methods, input validation, and avoiding string concatenation for queries.

---

## 51. What is NoSQL injection?

NoSQL injection happens when user input manipulates MongoDB queries.

### Bad example

User.findOne(\{
 email: req.body.email,
 password: req.body.password,
\});

If attacker sends an object instead of string:

\{
 "email": \{ "$ne": null \},
 "password": \{ "$ne": null \}
\}

It may bypass checks if not validated.

### Prevention

* Validate input types
* Sanitize request body
* Use schema validation
* Avoid passing raw user objects to queries

### Interview-ready answer

NoSQL injection happens when user-controlled objects manipulate MongoDB query operators. We prevent it using strict validation, sanitization, and by never passing raw request bodies directly into database queries.

---

## 52. What is streaming in Node.js?

Streams allow processing data piece by piece instead of loading everything into memory.

### Example

const fs \= require("fs");

fs.createReadStream("large-file.txt")
 .pipe(fs.createWriteStream("copy.txt"));

### Why useful?

For large files, streaming avoids memory overload.

### Types of streams

* Readable
* Writable
* Duplex
* Transform

### Interview-ready answer

Streams allow Node.js to process large data in chunks. They are useful for large files, uploads, downloads, logs, and video processing because they avoid loading the entire data into memory.

---

## 53. What is buffer in Node.js?

Buffer is used to handle binary data.

### Used in

* File operations
* Streams
* TCP packets
* Image/video data
* Binary protocols

### Example

const buffer \= Buffer.from("Hello");

console.log(buffer);
console.log(buffer.toString());

Output:

\<Buffer 48 65 6c 6c 6f\>
Hello

### Interview-ready answer

Buffer is Node.js’s way of handling binary data. It is commonly used with streams, files, network packets, and binary content.

---

## 54. What is process.env?

`process.env` contains environment variables.

### Example

const port \= process.env.PORT || 3000;
const dbUrl \= process.env.DATABASE\_URL;

### Why useful?

Environment variables help avoid hardcoding secrets and environment-specific config.

### Interview-ready answer

`process.env` is used to access environment variables in Node.js. It helps manage environment-specific values like port, database URL, API keys, and secrets without hardcoding them.

---

## 55. How do you manage secrets in Node.js?

Do not hardcode secrets.

Use:

* Environment variables
* Secret managers
* Vault
* AWS Secrets Manager
* Kubernetes secrets

### Avoid

const secret \= "my-hardcoded-secret";

### Interview-ready answer

Secrets should not be committed in code. They should be managed using environment variables or secret managers like AWS Secrets Manager, Vault, or Kubernetes secrets. Logs should never expose secrets or tokens.

---

## 56. What is graceful shutdown?

Graceful shutdown means safely stopping the server without abruptly killing active requests.

### Example

const server \= app.listen(3000);

process.on("SIGTERM", () \=\> \{
 console.log("SIGTERM received");

 server.close(() \=\> \{
   console.log("Server closed");
   process.exit(0);
 \});
\});

### In production, also close

* Database connections
* Redis connections
* Message queue consumers
* Background jobs

### Interview-ready answer

Graceful shutdown allows the app to stop accepting new requests, complete existing requests, close database/cache connections, and exit safely. It is important for deployments and containerized environments like Kubernetes.

---

## 57. What is the difference between PUT and PATCH?

### PUT

Replaces the full resource.

PUT /users/1

### PATCH

Partially updates the resource.

PATCH /users/1

### Interview-ready answer

PUT is used to replace the complete resource, while PATCH is used for partial updates. In practice, PATCH is better when updating only a few fields.

---

## 58. How do you handle pagination in Node.js APIs?

Common approaches:

### Offset-based pagination

GET /users?page=2\&limit=20

Easy to implement, but can become slow for large datasets.

### Cursor-based pagination

GET /users?cursor=abc\&limit=20

Better for large and frequently changing datasets.

### Interview-ready answer

Pagination prevents returning too much data at once. Offset pagination is simple but can be inefficient for large datasets. Cursor pagination is better for high-scale or real-time data because it is more stable and efficient.

---

## 59. How do you handle API versioning in Node.js?

Common options:

### URL versioning

/api/v1/users
/api/v2/users

### Header versioning

Accept-Version: v1

### Interview-ready answer

API versioning helps evolve APIs without breaking existing clients. The most common approach is URL versioning like `/api/v1`, while header-based versioning is cleaner but slightly harder to debug.

---

## 60. How do you test Node.js APIs?

Common tools:

* Jest
* Supertest
* Mocha
* Chai
* Sinon

### Example with Jest and Supertest

const request \= require("supertest");
const app \= require("../src/app");

test("GET /health should return ok", async () \=\> \{
 const response \= await request(app).get("/health");

 expect(response.status).toBe(200);
 expect(response.body).toEqual(\{ status: "ok" \});
\});

### Interview-ready answer

I test Node.js APIs using unit tests for services, integration tests for routes and database interactions, and contract or E2E tests for important flows. For Express APIs, Jest with Supertest is commonly used.

---

## Most Important Node.js Topics to Revise Before Interview

## Must know

* Node.js runtime
* Event loop
* Async programming
* Promises and async/await
* Express middleware
* REST API design
* Error handling
* Authentication and authorization
* JWT and refresh tokens
* CORS
* Rate limiting
* Caching
* BFF pattern
* Security basics
* Logging and monitoring
* Scaling Node.js

## Good to know

* Worker threads
* Clustering
* Streams
* Buffers
* Graceful shutdown
* Memory leaks
* Connection pooling
* API versioning
* Testing with Jest and Supertest

## Compact Interview Introduction for Node.js Experience

I have used Node.js mainly for building API and BFF layers where the frontend needs aggregated, UI-specific data from multiple backend services. Node.js works well for this because most BFF workloads are I/O-heavy, and its non-blocking model helps handle concurrent API calls efficiently. In a production setup, I would structure the app with routes, controllers, services, repositories, middleware, and config layers. I would also add authentication, authorization, caching, rate limiting, request validation, centralized error handling, logging, monitoring, and graceful shutdown for reliability.

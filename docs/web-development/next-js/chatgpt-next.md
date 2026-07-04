---
title: ChatGPT Next
sidebar_position: 2
---

# ChatGPT Next

Related canonical pages: [JWT & CSRF](../important/security/jwt-csrf.md), [Security Headers](../important/security/security-headers.md).

# **Next.js Interview Questions and Answers**

IMP: [https://chatgpt.com/c/6a3612d1-fd74-83ee-b7e4-4e0b2a84922b](https://chatgpt.com/c/6a3612d1-fd74-83ee-b7e4-4e0b2a84922b)

## **1\. What is Next.js?**

Next.js is a React framework used to build production-ready web applications.

React mainly focuses on building UI, while Next.js adds important production features like:

* File-based routing  
* Server-side rendering  
* Static site generation  
* API routes / route handlers  
* Image optimization  
* SEO support  
* Code splitting  
* Caching  
* Middleware  
* Full-stack capabilities

**Simple answer:**

Next.js is a framework built on top of React that helps us build fast, SEO-friendly, scalable applications with routing, rendering, data fetching, caching, and backend-like capabilities included.

---

## **2\. Why use Next.js instead of plain React?**

Plain React usually renders mostly on the client side. That means the browser downloads JavaScript, runs it, and then creates the page.

Next.js gives more rendering options:

* Render at build time  
* Render on every request  
* Render on the server  
* Render on the client  
* Mix server and client components

This improves:

* Initial page load  
* SEO  
* Performance  
* Developer experience  
* Routing structure  
* Production scalability

**Interview answer:**

I use Next.js when the application needs better SEO, faster initial load, server-side rendering, static generation, optimized routing, and production-ready features. React is mainly a UI library, but Next.js provides the architecture around React.

---

## **3\. What is file-based routing in Next.js?**

In Next.js, routes are created based on files and folders.

In App Router:

app/  
 page.tsx              \-\> /  
 about/  
   page.tsx            \-\> /about  
 products/  
   page.tsx            \-\> /products  
 products/\[id\]/  
   page.tsx            \-\> /products/:id

The folder structure becomes the route structure.

**Interview answer:**

File-based routing means we do not manually configure routes like React Router. Next.js automatically creates routes based on the folder and file structure.

---

## **4\. What is the difference between App Router and Pages Router?**

**Pages Router** uses the `pages` directory.

pages/  
 index.tsx  
 about.tsx  
 products/\[id\].tsx

It uses APIs like:

getServerSideProps  
getStaticProps  
getStaticPaths

**App Router** uses the `app` directory.

app/  
 page.tsx  
 layout.tsx  
 products/\[id\]/page.tsx

It supports:

* React Server Components  
* Nested layouts  
* Streaming  
* Suspense  
* Server Actions / Server Functions  
* Route Handlers

The App Router is the newer router and supports newer React features like Server Components and Suspense.

**Interview answer:**

Pages Router is the older routing model based on the `pages` folder. App Router is the newer model based on the `app` folder and supports React Server Components, layouts, streaming, Suspense, and Server Functions.

---

## **5\. What are Server Components in Next.js?**

Server Components are React components that render on the server.

By default, components inside the App Router are Server Components unless we add:

'use client';

Server Components can:

* Fetch data directly on the server  
* Access backend resources  
* Reduce client-side JavaScript  
* Improve performance  
* Keep sensitive logic away from the browser

Example:

\export default async function ProductsPage() \{  
 const res \= await fetch('https://api.example.com/products');  
 const products \= await res.json();

 return (  
   \<div\>  
     \{products.map((product: any) \=\> (  
       \<p key=\{product.id\}\>\{product.name\}\</p\>  
     ))\}  
   \</div\>  
 );  
\}

**Important:**

Server Components cannot use browser-only hooks like:

useState  
useEffect  
useRef

**Interview answer:**

Server Components are rendered on the server and are useful for data fetching, reducing client JavaScript, improving performance, and keeping server-only logic secure.

---

## **6\. What are Client Components in Next.js?**

Client Components run in the browser.

We create a Client Component by adding:

'use client';

\import \{ useState \} from 'react';

\export default function Counter() \{  
 const \[count, setCount\] \= useState(0);

 return \<button onClick=\{() \=\> setCount(count \+ 1)\}\>\{count\}\</button\>;  
\}

Client Components are needed when we use:

* `useState`  
* `useEffect`  
* Event handlers  
* Browser APIs  
* Form interactions  
* Animations  
* Client-side libraries

**Interview answer:**

Client Components are used when we need interactivity in the browser. Server Components are better for data fetching and static rendering, while Client Components are needed for user interactions and browser APIs.

---

## **7\. Server Component vs Client Component**

| Area | Server Component | Client Component |
| ----- | ----- | ----- |
| Runs where? | Server | Browser |
| Can fetch data directly? | Yes | Usually through API/client fetch |
| Can use `useState`? | No | Yes |
| Can use `useEffect`? | No | Yes |
| Can access DB directly? | Yes | No |
| Bundle impact | Less JS sent to the browser | More JS sent to the browser |
| Best for | Data-heavy UI | Interactive UI |

**Interview answer:**

I prefer Server Components for data fetching, static UI, and secure server logic. I use Client Components only where interactivity is required.

---

## **8\. What is SSR in Next.js?**

SSR means **Server-Side Rendering**.

In SSR, the page is rendered on the server for every request.

In Pages Router:

\export async function getServerSideProps() \{  
 const res \= await fetch('https://api.example.com/user');  
 const user \= await res.json();

 return \{  
   props: \{ user \},  
 \};  
\}

`getServerSideProps` fetches data and renders the page at request time.

**Use SSR when:**

* Data changes frequently  
* Page is user-specific  
* SEO is required  
* Data must be fresh on every request

Example:

* Booking details page  
* User dashboard  
* Price availability page  
* Order summary page

**Interview answer:**

SSR renders the page on the server for each request. It is useful when data must be fresh or user-specific, but it can be slower than static generation because the server works on every request.

---

## **9\. What is SSG in Next.js?**

SSG means **Static Site Generation**.

The HTML is generated at build time and served as a static file.

In Pages Router:

\export async function getStaticProps() \{  
 const res \= await fetch('https://api.example.com/blogs');  
 const blogs \= await res.json();

 return \{  
   props: \{ blogs \},  
 \};  
\}

`getStaticProps` is used to fetch data and generate static pages.

**Use SSG when:**

* Data does not change frequently  
* Page can be generated before users request it  
* Speed is important

Example:

* Blog pages  
* Documentation  
* Marketing pages  
* Product landing pages

**Interview answer:**

SSG generates pages at build time. It is very fast because the page is already built and can be served from CDN.

---

## **10\. What is ISR in Next.js?**

ISR means **Incremental Static Regeneration**.

It allows static pages to be regenerated after deployment without rebuilding the whole app.

Example in Pages Router:

\export async function getStaticProps() \{  
 const data \= await getProducts();

 return \{  
   props: \{ data \},  
   revalidate: 60,  
 \};  
\}

This means the page can be regenerated after 60 seconds.

**Use ISR when:**

* You want static performance  
* Data changes occasionally  
* Full rebuild is expensive

Example:

* Product listing  
* Hotel details  
* News article  
* Category pages

**Interview answer:**

ISR gives the performance of static pages with the ability to update them after a fixed interval. It is useful when data changes periodically but does not need to be fresh on every request.

---

## **11\. SSR vs SSG vs ISR**

| Rendering | When generated? | Best for |
| ----- | ----- | ----- |
| SSR | On every request | Fresh/user-specific data |
| SSG | At build time | Static content |
| ISR | Static \+ regenerated later | Mostly static but periodically updated data |
| CSR | In browser | Highly interactive/private UI |

**Interview answer:**

I choose SSR for fresh data, SSG for static pages, ISR for pages that need periodic updates, and CSR for highly interactive or user-specific sections that do not need SEO.

---

## **12\. What is CSR in Next.js?**

CSR means **Client-Side Rendering**.

The page renders in the browser after JavaScript loads.

Example:

'use client';

\import \{ useEffect, useState \} from 'react';

\export default function UserProfile() \{  
 const \[user, setUser\] \= useState\<any\>(null);

 useEffect(() \=\> \{  
   fetch('/api/user')  
     .then((res) \=\> res.json())  
     .then(setUser);  
 \}, \[\]);

 if (\!user) return \<p\>Loading...\</p\>;

 return \<p\>\{user.name\}\</p\>;  
\}

**Use CSR when:**

* Data is private  
* SEO is not important  
* UI is highly interactive  
* Data depends on browser state

Example:

* User preferences  
* Internal dashboard widgets  
* Filters  
* Charts

**Interview answer:**

CSR is useful for interactive browser-only parts of the app, but I avoid using it for SEO-critical content because initial HTML may not contain meaningful page content.

---

## **13\. How does data fetching work in App Router?**

In App Router, Server Components can fetch data directly using async/await.

\export default async function Page() \{  
 const res \= await fetch('https://api.example.com/products');  
 const products \= await res.json();

 return \<ProductList products=\{products\} /\>;  
\}

Next.js supports fetching data in Server Components using `fetch`, ORMs, or databases.

**Interview answer:**

In App Router, data fetching is usually done inside Server Components. This keeps fetching close to the component, avoids unnecessary client JavaScript, and improves performance.

---

## **14\. What is caching in Next.js?**

Caching means storing data or rendered output so future requests can be served faster.

Next.js has caching at different levels:

* Request memoization  
* Data cache  
* Full route cache  
* Router cache  
* CDN cache

In newer Next.js versions, caching behavior has changed in some areas. For example, Next.js 15 changed some defaults for GET Route Handlers and Client Router Cache from cached by default to uncached by default.

**Interview answer:**

Caching in Next.js helps avoid repeated data fetching and rendering. It improves performance, but we must choose the correct cache strategy based on how fresh the data needs to be.

---

## **15\. How do you disable caching for a fetch request?**

const res \= await fetch('https://api.example.com/products', \{  
 cache: 'no-store',  
\});

Use this when data should always be fresh.

Example:

* User balance  
* Live booking price  
* Payment status  
* Admin dashboard

**Interview answer:**

I use `cache: 'no-store'` when I want the data to be fetched fresh on every request.

---

## **16\. How do you revalidate cached data?**

const res \= await fetch('https://api.example.com/products', \{  
 next: \{  
   revalidate: 60,  
 \},  
\});

This means cached data can be revalidated after 60 seconds.

**Interview answer:**

I use `next.revalidate` when the data can be cached for some time but should eventually refresh. It is useful for product listings, hotel pages, blogs, and catalog pages.

---

## **17\. What is `layout.tsx` in Next.js?**

`layout.tsx` defines shared UI for a route segment.

Example:

\export default function DashboardLayout(\{  
 children,  
\}: \{  
 children: React.ReactNode;  
\}) \{  
 return (  
   \<div\>  
     \<aside\>Sidebar\</aside\>  
     \<main\>\{children\}\</main\>  
   \</div\>  
 );  
\}

Layouts are useful for:

* Common header  
* Sidebar  
* Footer  
* Navigation  
* Providers  
* Shared page shell

**Interview answer:**

`layout.tsx` is used to create shared UI across routes. Unlike normal components, layouts can preserve state during navigation.

---

## **18\. What is `template.tsx`?**

`template.tsx` is similar to layout, but it creates a new instance on navigation.

Use it when you want:

* Page transition reset  
* Animation restart  
* Component remount  
* State reset between routes

**Interview answer:**

`layout.tsx` preserves state between route changes, while `template.tsx` remounts on navigation.

---

## **19\. What is `loading.tsx`?**

`loading.tsx` shows a loading UI while a route segment is loading.

\export default function Loading() \{  
 return \<p\>Loading products...\</p\>;  
\}

It is built on React Suspense.

**Interview answer:**

`loading.tsx` provides instant loading UI for a route segment while server data or components are loading.

---

## **20\. What is `error.tsx`?**

`error.tsx` handles runtime errors for a route segment.

'use client';

\export default function Error(\{  
 error,  
 reset,  
\}: \{  
 error: Error;  
 reset: () \=\> void;  
\}) \{  
 return (  
   \<div\>  
     \<p\>Something went wrong\</p\>  
     \<button onClick=\{reset\}\>Try again\</button\>  
   \</div\>  
 );  
\}

**Interview answer:**

`error.tsx` is used to handle errors locally for a route segment instead of crashing the entire app.

---

## **21\. What is `not-found.tsx`?**

`not-found.tsx` renders custom 404 UI for a route segment.

\export default function NotFound() \{  
 return \<h1\>Product not found\</h1\>;  
\}

You can trigger it using:

\import \{ notFound \} from 'next/navigation';

if (\!product) \{  
 notFound();  
\}

**Interview answer:**

`not-found.tsx` is used to show a custom 404 page for missing resources.

---

## **22\. What are dynamic routes in Next.js?**

Dynamic routes allow route parameters.

app/products/\[id\]/page.tsx

URL:

/products/123

Access param:

\export default function ProductPage(\{  
 params,  
\}: \{  
 params: \{ id: string \};  
\}) \{  
 return \<p\>Product ID: \{params.id\}\</p\>;  
\}

**Interview answer:**

Dynamic routes are used when part of the URL is variable, such as product ID, user ID, blog slug, or order ID.

---

## **23\. What are catch-all routes?**

Catch-all routes match multiple path segments.

app/docs/\[...slug\]/page.tsx

Matches:

/docs/react  
/docs/react/hooks  
/docs/react/hooks/use-state

Example:

\export default function DocsPage(\{  
 params,  
\}: \{  
 params: \{ slug: string\[\] \};  
\}) \{  
 return \<p\>\{params.slug.join('/')\}\</p\>;  
\}

**Interview answer:**

Catch-all routes are useful for nested paths like documentation, category trees, CMS pages, and file explorers.

---

## **24\. What is `generateStaticParams`?**

`generateStaticParams` is used in App Router to generate static pages for dynamic routes.

\export async function generateStaticParams() \{  
 const products \= await getProducts();

 return products.map((product) \=\> (\{  
   id: product.id,  
 \}));  
\}

**Interview answer:**

`generateStaticParams` tells Next.js which dynamic routes should be statically generated at build time.

---

## **25\. What is metadata in Next.js?**

Metadata is used for SEO and social sharing.

Example:

\export const metadata \= \{  
 title: 'Products',  
 description: 'Browse all products',  
\};

Dynamic metadata:

\export async function generateMetadata(\{  
 params,  
\}: \{  
 params: \{ id: string \};  
\}) \{  
 const product \= await getProduct(params.id);

 return \{  
   title: product.name,  
   description: product.description,  
 \};  
\}

**Interview answer:**

Metadata in Next.js helps manage SEO fields like title, description, Open Graph tags, and social preview information.

---

## **26\. What are Route Handlers in Next.js?**

Route Handlers allow us to create backend-like API endpoints inside the App Router.

app/api/products/route.ts  
\export async function GET() \{  
 return Response.json(\[  
   \{ id: 1, name: 'Laptop' \},  
   \{ id: 2, name: 'Phone' \},  
 \]);  
\}

POST example:

\export async function POST(request: Request) \{  
 const body \= await request.json();

 return Response.json(\{  
   message: 'Product created',  
   data: body,  
 \});  
\}

**Interview answer:**

Route Handlers are used to create API endpoints in Next.js. They are useful for backend-for-frontend logic, webhooks, authentication callbacks, and proxying backend APIs.

---

## **27\. What are Server Actions / Server Functions?**

Server Actions, now commonly described in docs as React Server Functions, allow us to run server-side functions directly from components. They are useful for mutations like form submissions.

Example:

async function createUser(formData: FormData) \{  
 'use server';

 const name \= formData.get('name');

 await db.user.create(\{  
   data: \{ name: String(name) \},  
 \});  
\}

\export default function Page() \{  
 return (  
   \<form action=\{createUser\}\>  
     \<input name="name" /\>  
     \<button type="submit"\>Create\</button\>  
   \</form\>  
 );  
\}

**Interview answer:**

Server Actions allow us to execute server-side logic directly from forms or components without manually creating an API endpoint for every mutation.

---

## **28\. Route Handler vs Server Action**

| Area | Route Handler | Server Action |
| ----- | ----- | ----- |
| Purpose | API endpoint | Server-side mutation/function |
| Called by | Client, external services, frontend | Forms/components |
| Good for | Public APIs, webhooks, BFF endpoints | Form actions, internal mutations |
| HTTP control | Full control | Less explicit |
| Reusability outside app | Better | Mostly app-specific |

**Interview answer:**

I use Route Handlers when I need a real HTTP endpoint, like webhooks or APIs consumed by external clients. I use Server Actions for internal mutations such as submitting forms or updating server data from the UI.

---

## **29\. How does authentication work in Next.js?**

Authentication can be implemented using:

* HttpOnly cookies  
* Session-based auth  
* JWT  
* NextAuth/Auth.js  
* Custom auth service  
* Middleware for route protection

Common flow:

1. User logs in.  
2. Server validates credentials.  
3. Server sets secure HttpOnly cookie.  
4. Middleware or server checks session.  
5. Protected pages render only for authenticated users.

**Interview answer:**

For secure authentication, I prefer HttpOnly secure cookies because tokens are not directly accessible from JavaScript. Then I validate the session on the server or in middleware before rendering protected pages.

---

## **30\. How do you protect routes in Next.js?**

Using middleware:

\import \{ NextResponse \} from 'next/server';  
\import type \{ NextRequest \} from 'next/server';

\export function middleware(request: NextRequest) \{  
 const token \= request.cookies.get('token');

 if (\!token) \{  
   return NextResponse.redirect(new URL('/login', request.url));  
 \}

 return NextResponse.next();  
\}

\export const config \= \{  
 matcher: \['/dashboard/:path\*'\],  
\};

**Interview answer:**

I protect routes using middleware for request-level checks and server-side validation for sensitive data. Middleware is good for redirects, but final authorization should still be enforced on the server/API layer.

---

## **31\. What is Middleware in Next.js?**

Middleware runs before a request is completed.

It can be used for:

* Authentication redirects  
* Localization  
* A/B testing  
* URL rewrites  
* Bot detection  
* Geo-based routing

**Interview answer:**

Middleware is useful when we need to intercept a request before it reaches the route. It is commonly used for auth checks, redirects, rewrites, and localization.

---

## **32\. What is image optimization in Next.js?**

Next.js provides the `Image` component.

\import Image from 'next/image';

\export default function ProductImage() \{  
 return (  
   \<Image  
     src="/product.png"  
     alt="Product"  
     width=\{400\}  
     height=\{300\}  
   /\>  
 );  
\}

Benefits:

* Lazy loading  
* Responsive images  
* Size optimization  
* Better performance  
* Prevents layout shift when dimensions are provided

**Interview answer:**

`next/image` optimizes images automatically and improves performance by serving properly sized images, lazy loading them, and reducing layout shift.

---

## **33\. What is `next/link`?**

`next/link` is used for client-side navigation.

\import Link from 'next/link';

\<Link href="/products"\>Products\</Link\>

It avoids full page reloads and improves navigation performance.

**Interview answer:**

`next/link` enables fast client-side navigation between routes without reloading the full page.

---

## **34\. What is `next/navigation`?**

`next/navigation` provides navigation hooks for App Router.

Example:

'use client';

\import \{ useRouter \} from 'next/navigation';

\export default function Button() \{  
 const router \= useRouter();

 return \<button onClick=\{() \=\> router.push('/dashboard')\}\>Go\</button\>;  
\}

Common APIs:

useRouter  
usePathname  
useSearchParams  
redirect  
notFound

**Interview answer:**

`next/navigation` is used in App Router for programmatic navigation, reading pathname/search params, redirects, and triggering 404 behavior.

---

## **35\. What is code splitting in Next.js?**

Next.js automatically splits JavaScript by route.

This means each page loads only the JavaScript needed for that page.

Dynamic import example:

\import dynamic from 'next/dynamic';

const HeavyChart \= dynamic(() \=\> import('./HeavyChart'), \{  
 ssr: false,  
\});

\export default function Dashboard() \{  
 return \<HeavyChart /\>;  
\}

**Interview answer:**

Code splitting reduces initial bundle size by loading only the code required for the current route. For heavy components like charts, editors, or maps, I use dynamic imports.

---

## **36\. What is `dynamic()` in Next.js?**

`dynamic()` allows lazy loading components.

Use it for:

* Heavy charts  
* Rich text editors  
* Maps  
* Modals  
* Large dashboards  
* Browser-only libraries

Example:

const Map \= dynamic(() \=\> import('./Map'), \{  
 ssr: false,  
\});

**Interview answer:**

`dynamic()` helps reduce initial bundle size by loading heavy components only when needed.

---

## **37\. What does `ssr: false` mean?**

const ClientOnlyMap \= dynamic(() \=\> import('./Map'), \{  
 ssr: false,  
\});

It means the component will not be rendered on the server.

Use it when a library depends on browser-only APIs like:

window  
document  
localStorage  
navigator

**Interview answer:**

`ssr: false` disables server-side rendering for that component. I use it only for browser-dependent components, not for SEO-critical content.

---

## **38\. How do you handle environment variables in Next.js?**

Server-only variable:

DATABASE\_URL=postgres://...

Client-exposed variable:

NEXT\_PUBLIC\_API\_URL=https://api.example.com

Only variables prefixed with `NEXT_PUBLIC_` are available in the browser.

**Interview answer:**

I keep secrets in server-only environment variables. Anything exposed to the browser must use `NEXT_PUBLIC_`, but it should never contain secrets.

---

## **39\. How do you improve performance in a Next.js app?**

Important techniques:

* Prefer Server Components where possible  
* Use static rendering or ISR for stable pages  
* Avoid unnecessary Client Components  
* Use `next/image`  
* Use dynamic imports for heavy components  
* Cache API responses carefully  
* Use streaming and Suspense  
* Reduce third-party scripts  
* Analyze bundle size  
* Avoid large global providers  
* Use pagination or virtualization for large lists

**Interview answer:**

I optimize Next.js apps by reducing client-side JavaScript, using Server Components, choosing the right rendering strategy, optimizing images, caching data properly, splitting heavy code, and measuring with Lighthouse or Web Vitals.

---

## **40\. How do you handle SEO in Next.js?**

Next.js helps SEO through:

* Server-rendered HTML  
* Static generation  
* Metadata API  
* Dynamic metadata  
* Open Graph tags  
* Sitemap  
* Robots.txt  
* Canonical URLs

Example:

\export const metadata \= \{  
 title: 'Best Hotels in Bangalore',  
 description: 'Find the best hotels in Bangalore',  
\};

**Interview answer:**

Next.js improves SEO because content can be rendered on the server or generated statically. I also use metadata, structured data, sitemap, robots.txt, canonical URLs, and optimized page performance.

---

## **41\. What is hydration?**

Hydration is the process where React attaches event handlers and makes server-rendered HTML interactive in the browser.

Example:

Server sends HTML:

\<button\>Like\</button\>

Browser loads JavaScript, React attaches:

onClick=\{() \=\> setLiked(true)\}

**Interview answer:**

Hydration means converting server-rendered HTML into an interactive React application in the browser.

---

## **42\. What causes hydration errors?**

Common causes:

* Different server and client output  
* Using `window` during server rendering  
* Random values during render  
* Time-based values during render  
* Browser extensions modifying HTML  
* Invalid HTML nesting  
* Different locale formatting

Bad example:

\export default function Page() \{  
 return \<p\>\{Date.now()\}\</p\>;  
\}

Server and client values may differ.

Better:

'use client';

\import \{ useEffect, useState \} from 'react';

\export default function Time() \{  
 const \[time, setTime\] \= useState\<number | null\>(null);

 useEffect(() \=\> \{  
   setTime(Date.now());  
 \}, \[\]);

 return \<p\>\{time\}\</p\>;  
\}

**Interview answer:**

Hydration errors happen when server-rendered HTML does not match the client-rendered output. I avoid browser-only logic, random values, and time-based values during server rendering.

---

## **43\. What is streaming in Next.js?**

Streaming allows parts of the UI to be sent to the browser as soon as they are ready.

Instead of waiting for the whole page, faster parts can render first.

Example:

\import \{ Suspense \} from 'react';

\export default function Page() \{  
 return (  
   \<\>  
     \<Header /\>  
     \<Suspense fallback=\{\<p\>Loading products...\</p\>\}\>  
       \<Products /\>  
     \</Suspense\>  
   \</\>  
 );  
\}

**Interview answer:**

Streaming improves perceived performance by allowing the server to send UI in chunks. Slow sections can load later with Suspense fallback.

---

## **44\. What is Suspense used for in Next.js?**

Suspense is used to show fallback UI while async components load.

\<Suspense fallback=\{\<ProductSkeleton /\>\}\>  
 \<ProductList /\>  
\</Suspense\>

**Interview answer:**

Suspense lets us show loading UI for async server components or lazy-loaded components while keeping the rest of the page responsive.

---

## **45\. How do you structure a large Next.js app?**

Example structure:

src/  
 app/  
   layout.tsx  
   page.tsx  
   dashboard/  
     page.tsx  
     loading.tsx  
     error.tsx

 components/  
   ui/  
   shared/

 features/  
   products/  
     components/  
     hooks/  
     services/  
     types.ts

 lib/  
   api.ts  
   auth.ts  
   utils.ts

 server/  
   db.ts  
   actions/

 styles/  
 types/

**Interview answer:**

For large apps, I structure by features, keep reusable UI in shared components, keep server logic separate, avoid huge global stores, and keep route-level files inside the `app` directory.

---

## **46\. How do you handle state management in Next.js?**

State can be divided into:

**Local UI state**

useState  
useReducer

**Server state**

React Query  
SWR  
Server Components  
fetch

**Global client state**

Context  
Redux  
Zustand

**URL state**

searchParams  
useSearchParams

**Interview answer:**

I avoid putting everything in global state. Server data should stay on the server or in server-state tools. Local UI state stays local. Global state is only for truly shared client-side state like auth UI, theme, selected filters, or cross-page workflows.

---

## **47\. How do you handle forms in Next.js?**

Options:

* Normal React form with client submit  
* React Hook Form  
* Server Actions  
* Route Handler API  
* Zod/Yup validation

Example with Server Action:

async function submitForm(formData: FormData) \{  
 'use server';

 const email \= formData.get('email');  
 // validate and save  
\}

\export default function Page() \{  
 return (  
   \<form action=\{submitForm\}\>  
     \<input name="email" /\>  
     \<button\>Submit\</button\>  
   \</form\>  
 );  
\}

**Interview answer:**

For simple server mutations, Server Actions are clean. For complex client validation and dynamic forms, I use React Hook Form with schema validation and submit to an API or Server Action.

---

## **48\. How do you handle API errors in Next.js?**

Good practices:

* Use `try/catch`  
* Return proper status codes  
* Show error boundaries  
* Use `error.tsx`  
* Log errors on the server  
* Avoid exposing sensitive errors to users

Route Handler example:

\export async function GET() \{  
 try \{  
   const data \= await getData();  
   return Response.json(data);  
 \} catch \{  
   return Response.json(  
     \{ message: 'Failed to fetch data' \},  
     \{ status: 500 \}  
   );  
 \}  
\}

**Interview answer:**

I handle errors at multiple levels: API layer with proper status codes, UI layer with error states, route level with `error.tsx`, and observability layer with logs and monitoring.

---

## **49\. How do you handle loading states?**

Options:

* `loading.tsx`  
* Suspense fallback  
* Skeleton UI  
* Button-level loading state  
* React Query loading states

Example:

\export default function Loading() \{  
 return \<ProductSkeleton /\>;  
\}

**Interview answer:**

For route-level loading, I use `loading.tsx`. For component-level async sections, I use Suspense. For client interactions like form submit, I use button-level loading states.

---

## **50\. How do you handle redirects?**

Server redirect:

\import \{ redirect \} from 'next/navigation';

\export default function Page() \{  
 const isLoggedIn \= false;

 if (\!isLoggedIn) \{  
   redirect('/login');  
 \}

 return \<p\>Dashboard\</p\>;  
\}

Client redirect:

'use client';

\import \{ useRouter \} from 'next/navigation';

const router \= useRouter();  
router.push('/login');

**Interview answer:**

I prefer server redirects for auth and data-based redirects because they avoid rendering protected UI first. I use client redirects for user interactions.

---

## **51\. What is the difference between `redirect()` and `router.push()`?**

| API | Used where? | Purpose |
| ----- | ----- | ----- |
| `redirect()` | Server Components / Server Actions | Server-side redirect |
| `router.push()` | Client Components | Client-side navigation |

**Interview answer:**

`redirect()` is for server-side navigation decisions. `router.push()` is for client-side navigation after user interactions.

---

## **52\. How do you use search params in Next.js?**

Server Component:

\export default function Page(\{  
 searchParams,  
\}: \{  
 searchParams: \{ q?: string \};  
\}) \{  
 return \<p\>Search: \{searchParams.q\}\</p\>;  
\}

Client Component:

'use client';

\import \{ useSearchParams \} from 'next/navigation';

\export default function SearchText() \{  
 const searchParams \= useSearchParams();  
 return \<p\>\{searchParams.get('q')\}\</p\>;  
\}

**Interview answer:**

I use `searchParams` for URL-driven state like filters, search query, sorting, and pagination because it makes the state shareable and bookmarkable.

---

## **53\. How do you implement pagination in Next.js?**

Use URL query params:

/products?page=2\&limit=20

Server Component:

\export default async function ProductsPage(\{  
 searchParams,  
\}: \{  
 searchParams: \{ page?: string \};  
\}) \{  
 const page \= Number(searchParams.page || 1);  
 const products \= await getProducts(\{ page \});

 return \<ProductList products=\{products\} /\>;  
\}

**Interview answer:**

I prefer URL-based pagination because it supports browser navigation, sharing, bookmarking, SSR, and SEO.

---

## **54\. How do you implement filtering and sorting?**

URL:

/hotels?city=bangalore\&sort=price

Server:

\export default async function HotelsPage(\{  
 searchParams,  
\}: \{  
 searchParams: \{ city?: string; sort?: string \};  
\}) \{  
 const hotels \= await getHotels(searchParams);

 return \<HotelList hotels=\{hotels\} /\>;  
\}

**Interview answer:**

For filters and sorting, I prefer keeping state in the URL. It improves shareability, back/forward navigation, analytics, and server-side fetching.

---

## **55\. How do you secure a Next.js app?**

Important points:

* Use HttpOnly secure cookies  
* Validate auth on server  
* Validate authorization in APIs/server actions  
* Never expose secrets with `NEXT_PUBLIC_`  
* Sanitize user-generated content  
* Use CSRF protection where needed  
* Use security headers  
* Validate input with Zod/Yup  
* Avoid trusting client-side checks only

Next.js docs mention that Server Action requests compare origin with host to help prevent CSRF, and extra allowed origins can be configured.

**Interview answer:**

I secure Next.js apps by keeping secrets on the server, using HttpOnly cookies, validating every server mutation, protecting routes with middleware, validating input, and applying proper security headers.

---

## **56\. How do you handle role-based access control?**

Example:

\export default async function AdminPage() \{  
 const user \= await getCurrentUser();

 if (user.role \!== 'admin') \{  
   redirect('/unauthorized');  
 \}

 return \<AdminDashboard /\>;  
\}

**Interview answer:**

RBAC should be enforced on the server, not only in the UI. The UI can hide buttons, but APIs and server actions must check permissions before performing sensitive operations.

---

## **57\. How do you deploy Next.js?**

Common deployment options:

* Vercel  
* AWS  
* Docker  
* Kubernetes  
* Netlify  
* Node server  
* Static export for static sites

**Interview answer:**

Deployment depends on the rendering features used. Static sites can be exported, but SSR, middleware, route handlers, and server actions need a server or platform that supports Next.js runtime features.

---

## **58\. What is Edge Runtime in Next.js?**

Edge Runtime allows code to run closer to users at edge locations.

Useful for:

* Middleware  
* Lightweight auth checks  
* Redirects  
* A/B testing  
* Geo-based personalization

But it has limitations compared to Node.js runtime.

**Interview answer:**

Edge Runtime is useful for low-latency request processing close to the user, but I avoid using it for heavy backend logic or Node-specific APIs.

---

## **59\. What are common production issues in Next.js?**

Common issues:

* Hydration mismatch  
* Too many Client Components  
* Large JavaScript bundle  
* Incorrect caching  
* Stale data  
* Slow SSR pages  
* Exposed environment variables  
* Middleware doing too much work  
* Unoptimized images  
* Third-party scripts blocking rendering

**Interview answer:**

Most Next.js production issues come from incorrect rendering strategy, overusing client components, bad caching decisions, hydration mismatches, and large bundles.

---

## **60\. How would you design a scalable Next.js application?**

For a scalable app, I would focus on:

* App Router with feature-based structure  
* Server Components by default  
* Client Components only for interactivity  
* URL-driven filters and pagination  
* Route-level loading and error boundaries  
* Proper caching and revalidation  
* Auth enforced on server  
* Observability and error logging  
* Bundle analysis  
* Reusable design system  
* CI/CD and testing strategy

**Interview answer:**

I would design a scalable Next.js app by separating server and client concerns clearly, choosing the right rendering strategy per route, keeping state minimal, using caching carefully, enforcing security on the server, and organizing code by features.

---

# **Senior-Level Follow-Up Questions**

## **61\. When should you not use Next.js?**

Next.js may not be necessary when:

* App is fully internal and SEO does not matter  
* App is purely client-side dashboard  
* Team does not need SSR/SSG  
* Backend/frontend separation is strict  
* Static Vite React app is enough

**Answer:**

I would not choose Next.js only because it is popular. If the app is a private dashboard with no SEO need and mostly client-side interactions, a Vite React app may be simpler.

---

## **62\. How do you decide rendering strategy route by route?**

Example:

| Page | Strategy |
| ----- | ----- |
| Marketing page | SSG |
| Blog | SSG/ISR |
| Product listing | ISR/SSR |
| Booking checkout | SSR/no-store |
| User dashboard | SSR/CSR |
| Admin charts | CSR \+ API |
| Search page | SSR with URL params |

**Answer:**

I decide based on freshness, SEO, personalization, and performance. Static where possible, SSR where fresh data is required, CSR where the UI is highly interactive or private.

---

## **63\. Why should we avoid making everything a Client Component?**

Because Client Components increase JavaScript sent to the browser.

More client JS means:

* Slower load  
* More hydration cost  
* Bigger bundle  
* More browser work  
* More chances of hydration issues

**Answer:**

I avoid unnecessary Client Components because they increase client-side JavaScript and hydration cost. In App Router, I keep components server-side by default and move only interactive parts to the client.

---

## **64\. How would you optimize a slow Next.js page?**

I would check:

1. Is the page SSR when it could be static?  
2. Are we fetching too much data?  
3. Are API calls sequential instead of parallel?  
4. Are too many components marked `'use client'`?  
5. Are images optimized?  
6. Is bundle size large?  
7. Are third-party scripts blocking?  
8. Is caching configured correctly?  
9. Are large lists virtualized?

**Answer:**

I first measure using Lighthouse, Web Vitals, server logs, and bundle analyzer. Then I optimize rendering strategy, data fetching, caching, image loading, JavaScript bundle size, and slow components.

---

## **65\. How do you prevent duplicate API calls in Next.js?**

Approaches:

* Fetch in Server Component and pass data down  
* Use request memoization  
* Use React Query/SWR on client  
* Avoid fetching same data in multiple child components  
* Centralize shared data fetching  
* Cache stable data

**Answer:**

I prevent duplicate calls by fetching data at the right level, reusing server-fetched data, using caching, and using React Query/SWR for client-side deduplication.

---

## **66\. How do you handle real-time data in Next.js?**

Options:

* WebSocket  
* Server-Sent Events  
* Polling  
* React Query refetch intervals  
* External real-time services

Example use cases:

* Notification system  
* Live booking status  
* Chat  
* Ad campaign metrics  
* Stock/price updates

**Answer:**

Next.js can render the initial page, but real-time updates usually happen on the client using WebSocket, SSE, or polling depending on the use case.

---

## **67\. How do you test a Next.js application?**

Testing strategy:

* Unit tests for utilities  
* Component tests with React Testing Library  
* Integration tests for forms and flows  
* E2E tests with Playwright or Cypress  
* API/Route Handler tests  
* Visual regression for UI-critical pages

**Answer:**

I test business logic with unit tests, UI behavior with React Testing Library, critical user journeys with Playwright/Cypress, and route handlers or server actions with integration tests.

---

# **Compact Interview Revision Answer**

Next.js is a React framework for building production-ready applications. It provides file-based routing, server-side rendering, static generation, incremental static regeneration, API routes, image optimization, metadata support, middleware, caching, and full-stack capabilities.

In modern Next.js, App Router is preferred for new applications because it supports React Server Components, nested layouts, Suspense, streaming, Server Functions, and route handlers. I use Server Components by default for data fetching and static UI, and Client Components only when I need interactivity like state, effects, event handlers, or browser APIs.

For rendering, I choose SSG for static content, SSR for fresh or user-specific data, ISR for mostly static pages that need periodic updates, and CSR for highly interactive private UI. In production, I focus on correct caching, route-level loading/error states, secure authentication with HttpOnly cookies, server-side authorization, optimized images, dynamic imports, bundle analysis, and observability.

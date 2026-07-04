---
title: 11. React Router
sidebar_position: 11
---

# 11. React Router

# **11\. React Router**

## **Routing Fundamentals**

## **Nested Routes**

## **Dynamic Routes**

## **Protected Routes**

## **Route Parameters**

## **Navigation**

## **Common Interview Topics**

* Protected routing

# **React Router**

React Router is used to handle navigation in React applications. It lets us map URLs to components, build nested layouts, read route parameters, navigate programmatically, and protect routes based on authentication or authorization.

---

# **1\. Routing Fundamentals**

## **Simple meaning**

Routing means showing different UI based on the current URL.

Example:

/              \-\> Home page

/about         \-\> About page

/dashboard     \-\> Dashboard page

/users/10      \-\> User details page

## **Basic setup**

\import \{

  BrowserRouter,

  Routes,

  Route,

  Link,

\} from "react-router-dom";

function App() \{

  return (

    \<BrowserRouter\>

      \<nav\>

        \<Link to="/"\>Home\</Link\>

        \<Link to="/about"\>About\</Link\>

      \</nav\>

      \<Routes\>

        \<Route path="/" element=\{\<Home /\>\} /\>

        \<Route path="/about" element=\{\<About /\>\} /\>

      \</Routes\>

    \</BrowserRouter\>

  );

\}

function Home() \{

  return \<h1\>Home\</h1\>;

\}

function About() \{

  return \<h1\>About\</h1\>;

\}

## **Key mental model**

React Router keeps UI in sync with the URL.

URL changes

  ↓

Router matches route

  ↓

Matched component renders

## **Common router components**

| Component / Hook | Purpose |
| ----- | ----- |
| `BrowserRouter` | Enables browser URL-based routing |
| `Routes` | Wrapper for route definitions |
| `Route` | Maps path to component |
| `Link` | Client-side navigation |
| `NavLink` | Link with active state |
| `Outlet` | Renders nested child route |
| `Navigate` | Redirect component |
| `useNavigate` | Programmatic navigation |
| `useParams` | Reads dynamic route params |
| `useSearchParams` | Reads/updates query params |
| `useLocation` | Reads current location object |

## **Interview-ready answer**

React Router maps URLs to React components. It allows SPA navigation without full page reloads by rendering the matching component for the current path. It supports normal routes, nested routes, dynamic routes, route params, redirects, and programmatic navigation.

---

# **2\. Nested Routes**

## **Simple meaning**

Nested routes allow child routes to render inside a parent layout.

Example:

/dashboard

/dashboard/profile

/dashboard/settings

All routes can share the same dashboard layout.

## **Example**

\import \{ Routes, Route, Outlet, Link \} from "react-router-dom";

function App() \{

  return (

    \<Routes\>

      \<Route path="/dashboard" element=\{\<DashboardLayout /\>\}\>

        \<Route index element=\{\<DashboardHome /\>\} /\>

        \<Route path="profile" element=\{\<Profile /\>\} /\>

        \<Route path="settings" element=\{\<Settings /\>\} /\>

      \</Route\>

    \</Routes\>

  );

\}

function DashboardLayout() \{

  return (

    \<div\>

      \<h1\>Dashboard\</h1\>

      \<nav\>

        \<Link to="/dashboard"\>Home\</Link\>

        \<Link to="/dashboard/profile"\>Profile\</Link\>

        \<Link to="/dashboard/settings"\>Settings\</Link\>

      \</nav\>

      \<Outlet /\>

    \</div\>

  );

\}

## **Key mental model**

`Outlet` is the placeholder where child routes render.

DashboardLayout

  ↓

\<Outlet /\>

  ↓

DashboardHome / Profile / Settings

## **Index route**

An index route is the default child route.

\<Route index element=\{\<DashboardHome /\>\} /\>

This renders when the URL is exactly:

/dashboard

## **Why nested routes are useful**

* Shared layouts.  
* Dashboard pages.  
* Account sections.  
* Admin modules.  
* Settings pages.  
* Master-detail screens.  
* Route-based code organization.

## **Interview-ready answer**

Nested routes allow a parent route to render a layout and child routes to render inside it using `Outlet`. This is useful for dashboards, settings pages, admin sections, and any UI where multiple pages share the same layout.

---

# **3\. Dynamic Routes**

## **Simple meaning**

Dynamic routes are routes with variable parts in the URL.

/users/:userId

/products/:productId

## **Example**

\<Route path="/users/:userId" element=\{\<UserDetails /\>\} /\>

If URL is:

/users/101

Then `userId` is:

101

## **Reading dynamic params**

\import \{ useParams \} from "react-router-dom";

function UserDetails() \{

  const \{ userId \} \= useParams();

  return \<h1\>User ID: \{userId\}\</h1\>;

\}

## **Multiple dynamic params**

\<Route

  path="/categories/:categoryId/products/:productId"

  element=\{\<ProductDetails /\>\}

/\>

function ProductDetails() \{

  const \{ categoryId, productId \} \= useParams();

  return (

    \<div\>

      \<p\>Category: \{categoryId\}\</p\>

      \<p\>Product: \{productId\}\</p\>

    \</div\>

  );

\}

## **Practical example**

/hotels/123

/bookings/ABC123

/campaigns/999/report

/users/42/edit

## **Important point**

Route params are strings.

const \{ userId \} \= useParams();

const numericUserId \= Number(userId);

## **Interview-ready answer**

Dynamic routes use URL parameters like `/users/:userId`. React Router extracts the dynamic part and makes it available through `useParams`. Route params are useful for details pages, edit pages, reports, booking IDs, product IDs, and other entity-specific screens.

---

# **4\. Route Parameters**

## **Simple meaning**

Route parameters are dynamic values taken from the URL path.

\<Route path="/orders/:orderId" element=\{\<OrderDetails /\>\} /\>

function OrderDetails() \{

  const \{ orderId \} \= useParams();

  return \<h1\>Order: \{orderId\}\</h1\>;

\}

## **Route params vs query params**

/users/101

`101` is a route param.

/users?status=active\&page=2

`status` and `page` are query params.

## **Query params with useSearchParams**

\import \{ useSearchParams \} from "react-router-dom";

function UsersPage() \{

  const \[searchParams, setSearchParams\] \= useSearchParams();

  const status \= searchParams.get("status") || "all";

  function showActiveUsers() \{

    setSearchParams(\{ status: "active" \});

  \}

  return (

    \<button onClick=\{showActiveUsers\}\>

      Current status: \{status\}

    \</button\>

  );

\}

## **When to use route params**

Use route params for identity.

/users/:userId

/products/:productId

/bookings/:bookingId

## **When to use query params**

Use query params for filtering, sorting, pagination, and UI state that should be shareable in URL.

/hotels?city=bangalore\&sort=price\&page=2

## **Interview-ready answer**

Route params represent identity in the URL, like user ID or product ID. Query params represent optional state like filters, sorting, pagination, and search text. Use `useParams` for route params and `useSearchParams` for query params.

---

# **5\. Navigation**

## **Simple meaning**

Navigation means moving from one route to another.

React Router supports declarative navigation and programmatic navigation.

## **Link**

Use `Link` for normal navigation.

\import \{ Link \} from "react-router-dom";

\<Link to="/dashboard"\>Dashboard\</Link\>

`Link` avoids full page reload and performs client-side navigation.

## **NavLink**

Use `NavLink` when active styling is needed.

\import \{ NavLink \} from "react-router-dom";

\<NavLink

  to="/dashboard"

  className=\{(\{ isActive \}) \=\> (isActive ? "active" : "")\}

\>

  Dashboard

\</NavLink\>

## **useNavigate**

Use `useNavigate` for navigation from code.

\import \{ useNavigate \} from "react-router-dom";

function LoginPage() \{

  const navigate \= useNavigate();

  function handleLogin() \{

    // after successful login

    navigate("/dashboard");

  \}

  return \<button onClick=\{handleLogin\}\>Login\</button\>;

\}

## **Replace navigation**

Use `replace` when you do not want the user to go back to the previous page.

navigate("/dashboard", \{ replace: true \});

Common after login/logout.

## **Navigate back**

navigate(-1);

Useful for close modal/back button behavior, but use carefully because browser history may not always contain the expected page.

## **Navigate component**

\import \{ Navigate \} from "react-router-dom";

function OldRoute() \{

  return \<Navigate to="/new-route" replace /\>;

\}

## **Interview-ready answer**

React Router supports navigation using `Link`, `NavLink`, `Navigate`, and `useNavigate`. Use `Link` for normal navigation, `NavLink` when active styling is needed, and `useNavigate` for programmatic navigation after actions like login, logout, form submit, or wizard step completion.

---

# **6\. Protected Routes**

## **Simple meaning**

Protected routes are routes that should be accessible only when the user is authenticated or authorized.

Example:

/dashboard       \-\> only logged-in users

/admin           \-\> only admin users

/settings        \-\> only logged-in users

## **Basic protected route**

\import \{ Navigate, Outlet \} from "react-router-dom";

function ProtectedRoute() \{

  const \{ user, loading \} \= useAuth();

  if (loading) \{

    return \<p\>Checking authentication...\</p\>;

  \}

  if (\!user) \{

    return \<Navigate to="/login" replace /\>;

  \}

  return \<Outlet /\>;

\}

Usage:

\<Routes\>

  \<Route path="/login" element=\{\<Login /\>\} /\>

  \<Route element=\{\<ProtectedRoute /\>\}\>

    \<Route path="/dashboard" element=\{\<Dashboard /\>\} /\>

    \<Route path="/settings" element=\{\<Settings /\>\} /\>

  \</Route\>

\</Routes\>

## **Key mental model**

Protected route is a wrapper route.

User opens /dashboard

  ↓

ProtectedRoute checks auth

  ↓

If logged in → render Outlet

  ↓

If not logged in → redirect to /login

## **Preserve intended destination**

When redirecting to login, store where the user came from.

\import \{ Navigate, Outlet, useLocation \} from "react-router-dom";

function ProtectedRoute() \{

  const \{ user, loading \} \= useAuth();

  const location \= useLocation();

  if (loading) \{

    return \<p\>Checking authentication...\</p\>;

  \}

  if (\!user) \{

    return (

      \<Navigate

        to="/login"

        replace

        state=\{\{ from: location \}\}

      /\>

    );

  \}

  return \<Outlet /\>;

\}

After login:

function Login() \{

  const navigate \= useNavigate();

  const location \= useLocation();

  const from \= location.state?.from?.pathname || "/dashboard";

  async function handleLogin() \{

    await login();

    navigate(from, \{ replace: true \});

  \}

  return \<button onClick=\{handleLogin\}\>Login\</button\>;

\}

## **Role-based protected route**

function RoleProtectedRoute(\{ allowedRoles \}) \{

  const \{ user, loading \} \= useAuth();

  if (loading) \{

    return \<p\>Checking permissions...\</p\>;

  \}

  if (\!user) \{

    return \<Navigate to="/login" replace /\>;

  \}

  if (\!allowedRoles.includes(user.role)) \{

    return \<Navigate to="/unauthorized" replace /\>;

  \}

  return \<Outlet /\>;

\}

Usage:

\<Route element=\{\<RoleProtectedRoute allowedRoles=\{\["admin"\]\} /\>\}\>

  \<Route path="/admin" element=\{\<AdminPage /\>\} /\>

\</Route\>

## **Important security point**

Protected routes improve frontend UX, but they are not real security by themselves.

Backend APIs must still validate authentication and authorization.

A user can inspect frontend code or call APIs directly.

## **Interview-ready answer**

Protected routing means checking whether a user is authenticated or authorized before rendering a route. If the user is allowed, render `Outlet`; otherwise redirect to login or unauthorized page using `Navigate`. Frontend route protection is for UX, but backend authorization is still mandatory for real security.

---

# **7\. Layout Routes**

## **Simple meaning**

A layout route renders common UI around child pages.

Common examples:

* App shell  
* Header  
* Sidebar  
* Footer  
* Auth layout  
* Dashboard layout

function AppLayout() \{

  return (

    \<\>

      \<Header /\>

      \<Sidebar /\>

      \<main\>

        \<Outlet /\>

      \</main\>

    \</\>

  );

\}

Usage:

\<Route element=\{\<AppLayout /\>\}\>

  \<Route path="/dashboard" element=\{\<Dashboard /\>\} /\>

  \<Route path="/reports" element=\{\<Reports /\>\} /\>

\</Route\>

## **Interview-ready answer**

Layout routes let multiple pages share common UI like header, sidebar, and footer. The parent layout renders `Outlet`, and the matched child route appears inside it.

---

# **8\. Not Found Route**

## **Simple meaning**

A not found route handles unmatched URLs.

\<Routes\>

  \<Route path="/" element=\{\<Home /\>\} /\>

  \<Route path="/dashboard" element=\{\<Dashboard /\>\} /\>

  \<Route path="\*" element=\{\<NotFound /\>\} /\>

\</Routes\>

function NotFound() \{

  return \<h1\>404 \- Page Not Found\</h1\>;

\}

## **Interview-ready answer**

A wildcard route using `path="*"` catches unmatched routes and renders a 404 page. It should usually be placed after specific routes.

---

# **9\. Lazy Loading Routes**

## **Simple meaning**

Lazy loading routes means loading route components only when needed.

const Dashboard \= React.lazy(() \=\> import("./Dashboard"));

function App() \{

  return (

    \<React.Suspense fallback=\{\<p\>Loading...\</p\>\}\>

      \<Routes\>

        \<Route path="/dashboard" element=\{\<Dashboard /\>\} /\>

      \</Routes\>

    \</React.Suspense\>

  );

\}

## **Why useful**

* Reduces initial bundle size.  
* Improves first load performance.  
* Good for large apps.  
* Useful for admin, reports, dashboards, and rarely visited pages.

## **Interview-ready answer**

Route lazy loading splits the app by route and loads a page component only when the user visits that route. It improves initial load performance, especially in large React applications.

---

# **Common Interview Topics / Questions**

---

# **1\. Protected Routing**

## **Answer**

Protected routing checks authentication or authorization before rendering a route.

function ProtectedRoute() \{

  const \{ user, loading \} \= useAuth();

  if (loading) \{

    return \<p\>Checking authentication...\</p\>;

  \}

  if (\!user) \{

    return \<Navigate to="/login" replace /\>;

  \}

  return \<Outlet /\>;

\}

Usage:

\<Route element=\{\<ProtectedRoute /\>\}\>

  \<Route path="/dashboard" element=\{\<Dashboard /\>\} /\>

\</Route\>

## **Interview-ready answer**

Protected routing is implemented by wrapping private routes inside a guard component. The guard checks auth state. If the user is authenticated, it renders `Outlet`; otherwise it redirects to login using `Navigate`. For role-based access, also check user roles or permissions. Backend authorization is still required because frontend route guards alone are not secure.

---

# **2\. How do nested routes work?**

## **Answer**

Nested routes render child routes inside a parent route using `Outlet`.

\<Route path="/dashboard" element=\{\<DashboardLayout /\>\}\>

  \<Route index element=\{\<DashboardHome /\>\} /\>

  \<Route path="settings" element=\{\<Settings /\>\} /\>

\</Route\>

function DashboardLayout() \{

  return (

    \<\>

      \<Sidebar /\>

      \<Outlet /\>

    \</\>

  );

\}

## **Interview-ready answer**

Nested routes allow child pages to render inside a shared parent layout. The parent route renders `Outlet`, and React Router places the matched child route there.

---

# **3\. How do dynamic routes work?**

## **Answer**

Dynamic routes use `:paramName` in the path.

\<Route path="/users/:userId" element=\{\<UserDetails /\>\} /\>

Read the param:

const \{ userId \} \= useParams();

## **Interview-ready answer**

Dynamic routes allow variable URL segments using `:paramName`. React Router extracts these values and exposes them through `useParams`. They are commonly used for details, edit, and report pages.

---

# **4\. Route params vs query params**

## **Simple comparison**

| Point | Route params | Query params |
| ----- | ----- | ----- |
| Example | `/users/101` | `/users?page=2` |
| Purpose | Resource identity | Filters/options |
| Hook | `useParams` | `useSearchParams` |
| Use case | User ID, product ID | Search, sort, filter, pagination |

## **Interview-ready answer**

Route params identify the main resource, like `/users/:userId`. Query params represent optional UI state like filters, sorting, search text, and pagination. Use `useParams` for route params and `useSearchParams` for query params.

---

# **5\. Link vs NavLink vs useNavigate**

## **Simple comparison**

| API | Use case |
| ----- | ----- |
| `Link` | Normal navigation |
| `NavLink` | Navigation with active styling |
| `useNavigate` | Programmatic navigation |
| `Navigate` | Redirect from render |

## **Interview-ready answer**

Use `Link` for normal navigation, `NavLink` when active link styling is needed, `useNavigate` for navigation after actions like login or submit, and `Navigate` for redirecting during render.

---

# **6\. BrowserRouter vs HashRouter**

## **BrowserRouter**

Uses clean URLs.

/dashboard

/users/10

Requires server configuration to serve `index.html` for unknown routes.

## **HashRouter**

Uses hash-based URLs.

/\#/dashboard

/\#/users/10

Does not need special server rewrite configuration.

## **Interview-ready answer**

`BrowserRouter` uses the HTML5 history API and gives clean URLs, but the server must be configured to fallback to `index.html` for client routes. `HashRouter` stores route state after `#` and works without server configuration, but URLs are less clean.

---

# **7\. How do you handle 404 routes?**

## **Answer**

Use wildcard route.

\<Route path="\*" element=\{\<NotFound /\>\} /\>

## **Interview-ready answer**

A `path="*"` route catches unmatched paths and renders a 404 page. It should be placed after specific route definitions.

---

# **8\. Where should API calls happen: component or route loader?**

## **Answer**

In simple React Router setups, API calls often happen inside components using `useEffect` or data-fetching libraries.

In data-router setups, route loaders can fetch data before rendering the route.

## **Interview-ready answer**

For simple apps, fetching inside components or using React Query/RTK Query is common. In React Router data-router architecture, loaders can fetch route data before rendering and can redirect early. The best choice depends on the app architecture and data-fetching strategy.

---

# **9\. How do you design routing in a large React app?**

## **Answer**

For large apps:

* Group routes by feature.  
* Use layout routes.  
* Lazy load route components.  
* Protect private sections.  
* Keep route constants centralized if needed.  
* Use dynamic params for entity pages.  
* Use query params for filters/search/pagination.  
* Add 404 and unauthorized pages.  
* Track navigation analytics.  
* Handle loading and error states.  
* Keep routing consistent with permissions.

## **Interview-ready answer**

In large React apps, I organize routes by feature, use nested layout routes for shared UI, lazy load large pages, protect authenticated and role-based routes, use params and search params properly, and include 404/unauthorized handling. For route data, I choose between loaders, React Query, RTK Query, or another data layer based on architecture.

---

# **Quick Revision Summary**

| Topic | Key point |
| ----- | ----- |
| Routing | URL decides which component renders |
| `BrowserRouter` | Browser history-based routing |
| `Routes` | Holds route definitions |
| `Route` | Maps path to element |
| Nested routes | Parent layout \+ child routes |
| `Outlet` | Placeholder for child route |
| Dynamic route | Uses `:param` |
| `useParams` | Reads route params |
| `useSearchParams` | Reads/writes query params |
| `Link` | Client-side navigation |
| `NavLink` | Active navigation link |
| `useNavigate` | Programmatic navigation |
| `Navigate` | Redirect component |
| Protected route | Auth/role guard |
| Layout route | Shared UI wrapper |
| `path="*"` | 404 route |
| Lazy routes | Load page code on demand |

---

# **Final Interview-Ready Combined Answer**

React Router is used to map URLs to React components in a single-page application. Basic routing uses `BrowserRouter`, `Routes`, and `Route`. Nested routes allow shared layouts using `Outlet`. Dynamic routes use `:paramName`, and values are read using `useParams`. Query params are handled using `useSearchParams` and are useful for filters, sorting, search, and pagination. Navigation is done using `Link`, `NavLink`, `Navigate`, and `useNavigate`. Protected routing is implemented by wrapping private routes in a guard component that checks authentication or authorization and either renders `Outlet` or redirects to login/unauthorized page. In large apps, routes should be feature-organized, layout-based, lazy-loaded where useful, and protected according to user permissions.

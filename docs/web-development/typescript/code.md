---
title: Code
sidebar_position: 4
---

# Code

## Quick React / Next.js TypeScript Examples

## 1. Basic types

let age: number \= 32;
let name: string \= "Akhilesh";
let isActive: boolean \= true;

let value: unknown \= "hello"; // safer than any
let anything: any \= "hello";  // avoid unless necessary

let nothing: null \= null;
let notDefined: undefined \= undefined;

function logMessage(message: string): void \{
  console.log(message);
\}

function throwError(message: string): never \{
  throw new Error(message);
\}

---

## 2. Object type

type User \= \{
  id: number;
  name: string;
  email?: string; // optional
  readonly createdAt: string;
\};

const user: User \= \{
  id: 1,
  name: "Akhilesh",
  createdAt: "2026-06-22",
\};

---

## 3. Interface example

interface Product \{
  id: number;
  title: string;
  price: number;
\}

interface DiscountedProduct extends Product \{
  discount: number;
\}

Use `type` most of the time. Use `interface` when defining extendable object contracts.

---

## 4. Array types

type User \= \{
  id: number;
  name: string;
\};

const users: User\[\] \= \[
  \{ id: 1, name: "Akhilesh" \},
  \{ id: 2, name: "Rahul" \},
\];

const numbers: number\[\] \= \[1, 2, 3\];

const names: Array\<string\> \= \["React", "Next.js"\];

---

## 5. Nested object type

type Address \= \{
  city: string;
  state: string;
  pincode: number;
\};

type User \= \{
  id: number;
  name: string;
  address: Address;
\};

const user: User \= \{
  id: 1,
  name: "Akhilesh",
  address: \{
    city: "Bengaluru",
    state: "Karnataka",
    pincode: 560036,
  \},
\};

---

## 6. Tree / recursive data type

type TreeNode \= \{
  id: string;
  label: string;
  children?: TreeNode\[\];
\};

const fileTree: TreeNode\[\] \= \[
  \{
    id: "1",
    label: "src",
    children: \[
      \{
        id: "2",
        label: "components",
        children: \[
          \{
            id: "3",
            label: "Button.tsx",
          \},
        \],
      \},
    \],
  \},
\];

Useful for file explorer, menu tree, comment thread, category tree.

---

## 7. Function types

type Add \= (a: number, b: number) \=\> number;

const add: Add \= (a, b) \=\> \{
  return a \+ b;
\};

type OnSave \= (id: number, name: string) \=\> void;

const handleSave: OnSave \= (id, name) \=\> \{
  console.log(id, name);
\};

---

## 8. Component props

type ButtonProps \= \{
  label: string;
  disabled?: boolean;
  onClick: () \=\> void;
\};

function Button(\{ label, disabled, onClick \}: ButtonProps) \{
  return (
    \<button disabled=\{disabled\} onClick=\{onClick\}\>
      \{label\}
    \</button\>
  );
\}

---

## 9. Children prop

type CardProps \= \{
  title: string;
  children: React.ReactNode;
\};

function Card(\{ title, children \}: CardProps) \{
  return (
    \<div\>
      \<h2\>\{title\}\</h2\>
      \{children\}
    \</div\>
  );
\}

---

## 10. useState types

type User \= \{
  id: number;
  name: string;
\};

const \[count, setCount\] \= React.useState\<number\>(0);

const \[name, setName\] \= React.useState\<string\>("");

const \[loading, setLoading\] \= React.useState\<boolean\>(false);

const \[user, setUser\] \= React.useState\<User | null\>(null);

const \[users, setUsers\] \= React.useState\<User\[\]\>(\[\]);

type Status \= "idle" | "loading" | "success" | "error";

const \[status, setStatus\] \= React.useState\<Status\>("idle");

---

## 11. Passing setState as prop

type SearchProps \= \{
  searchText: string;
  setSearchText: React.Dispatch\<React.SetStateAction\<string\>\>;
\};

function SearchBox(\{ searchText, setSearchText \}: SearchProps) \{
  return (
    \<input
      value=\{searchText\}
      onChange=\{(event) \=\> setSearchText(event.target.value)\}
    /\>
  );
\}

Simpler version:

type SearchProps \= \{
  searchText: string;
  onSearchChange: (value: string) \=\> void;
\};

---

## 12. Form event types

function handleChange(event: React.ChangeEvent\<HTMLInputElement\>) \{
  console.log(event.target.value);
\}

function handleTextAreaChange(event: React.ChangeEvent\<HTMLTextAreaElement\>) \{
  console.log(event.target.value);
\}

function handleSelectChange(event: React.ChangeEvent\<HTMLSelectElement\>) \{
  console.log(event.target.value);
\}

function handleSubmit(event: React.FormEvent\<HTMLFormElement\>) \{
  event.preventDefault();
\}

---

## 13. Mouse and keyboard events

function handleClick(event: React.MouseEvent\<HTMLButtonElement\>) \{
  console.log("Button clicked");
\}

function handleDivClick(event: React.MouseEvent\<HTMLDivElement\>) \{
  console.log("Div clicked");
\}

function handleKeyDown(event: React.KeyboardEvent\<HTMLInputElement\>) \{
  if (event.key \=== "Enter") \{
    console.log("Enter pressed");
  \}
\}

---

## 14. useRef types

const inputRef \= React.useRef\<HTMLInputElement | null\>(null);

function focusInput() \{
  inputRef.current?.focus();
\}

const divRef \= React.useRef\<HTMLDivElement | null\>(null);

const timerRef \= React.useRef\<number | null\>(null);

For browser timer:

const timerRef \= React.useRef\<ReturnType\<typeof setTimeout\> | null\>(null);

---

## 15. API response type

type ApiResponse\<T\> \= \{
  data: T;
  success: boolean;
  message?: string;
\};

type User \= \{
  id: number;
  name: string;
\};

type UserResponse \= ApiResponse\<User\>;
type UsersResponse \= ApiResponse\<User\[\]\>;

Usage:

async function fetchUser(): Promise\<User\> \{
  const response \= await fetch("/api/user");
  return response.json();
\}

---

## 16. Union type

type ButtonVariant \= "primary" | "secondary" | "danger";

type ButtonProps \= \{
  variant: ButtonVariant;
  label: string;
\};

function Button(\{ variant, label \}: ButtonProps) \{
  return \<button className=\{variant\}\>\{label\}\</button\>;
\}

---

## 17. Discriminated union

type ApiState\<T\> \=
  | \{ status: "idle" \}
  | \{ status: "loading" \}
  | \{ status: "success"; data: T \}
  | \{ status: "error"; error: string \};

type User \= \{
  id: number;
  name: string;
\};

const \[state, setState\] \= React.useState\<ApiState\<User\[\]\>\>(\{
  status: "idle",
\});

Usage:

if (state.status \=== "success") \{
  console.log(state.data);
\}

if (state.status \=== "error") \{
  console.log(state.error);
\}

---

## 18. Record / object map

type Role \= "admin" | "user" | "guest";

const permissions: Record\<Role, string\[\]\> \= \{
  admin: \["create", "edit", "delete"\],
  user: \["read"\],
  guest: \[\],
\};

Dynamic object:

type UserMap \= Record\<string, User\>;

---

## 19. Tuple

type Coordinates \= \[number, number\];

const location: Coordinates \= \[12.9716, 77.5946\];

Useful when position/order matters.

---

## 20. Utility types

type User \= \{
  id: number;
  name: string;
  email: string;
  password: string;
\};

type UserPreview \= Pick\<User, "id" | "name"\>;

type UserWithoutPassword \= Omit\<User, "password"\>;

type PartialUser \= Partial\<User\>;

type RequiredUser \= Required\<User\>;

type ReadonlyUser \= Readonly\<User\>;

---

## 21. useReducer types

type State \= \{
  count: number;
\};

type Action \=
  | \{ type: "increment" \}
  | \{ type: "decrement" \}
  | \{ type: "reset"; payload: number \};

function reducer(state: State, action: Action): State \{
  switch (action.type) \{
    case "increment":
      return \{ count: state.count \+ 1 \};

    case "decrement":
      return \{ count: state.count \- 1 \};

    case "reset":
      return \{ count: action.payload \};

    default:
      return state;
  \}
\}

const \[state, dispatch\] \= React.useReducer(reducer, \{ count: 0 \});

---

## 22. Context type

type AuthContextValue \= \{
  user: User | null;
  login: (user: User) \=\> void;
  logout: () \=\> void;
\};

const AuthContext \= React.createContext\<AuthContextValue | null\>(null);

function useAuth() \{
  const context \= React.useContext(AuthContext);

  if (\!context) \{
    throw new Error("useAuth must be used inside AuthProvider");
  \}

  return context;
\}

---

## 23. Next.js page params

type PageProps \= \{
  params: \{
    id: string;
  \};
\};

\export default function Page(\{ params \}: PageProps) \{
  return \<h1\>User ID: \{params.id\}\</h1\>;
\}

With search params:

type PageProps \= \{
  searchParams: \{
    page?: string;
    query?: string;
  \};
\};

\export default function Page(\{ searchParams \}: PageProps) \{
  return \<h1\>Search: \{searchParams.query\}\</h1\>;
\}

---

## 24. Nullable and optional data

type User \= \{
  id: number;
  name: string;
  email?: string;
\};

const \[user, setUser\] \= React.useState\<User | null\>(null);

console.log(user?.name);

Use:

email?: string;

when property may be missing.

Use:

User | null;

when the whole value may not exist yet.

---

## 25. Generic component

type ListProps\<T\> \= \{
  items: T\[\];
  renderItem: (item: T) \=\> React.ReactNode;
\};

function List\<T\>(\{ items, renderItem \}: ListProps\<T\>) \{
  return \<ul\>\{items.map((item) \=\> \<li\>\{renderItem(item)\}\</li\>)\}\</ul\>;
\}

Usage:

\<List
  items=\{users\}
  renderItem=\{(user) \=\> user.name\}
/\>

---

## Quick Rule

Object data          → type User \= \{ ... \}
Component props      → type Props \= \{ ... \}
Array                → User\[\]
Can be missing       → User | null
Optional field       → email?: string
Children             → React.ReactNode
Click event          → React.MouseEvent\<HTMLButtonElement\>
Input change event   → React.ChangeEvent\<HTMLInputElement\>
Form submit event    → React.FormEvent\<HTMLFormElement\>
DOM ref              → useRef\<HTMLInputElement | null\>(null)
API response         → ApiResponse\<T\>
Dynamic object       → Record\<string, Value\>
Tree data            → recursive type with children?: SameType\[\]
Status values        → union type
Complex state        → discriminated union or useReducer

```tsx
// 1. Basic object
type User = {
  id: number;
  name: string;
  email?: string; // optional
};

// 2. Component props
type ButtonProps = {
  label: string;
  disabled?: boolean;
  onClick: () => void;
};

function Button({ label, disabled, onClick }: ButtonProps) {
  return (
    <button disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
}

// 3. Children prop
type CardProps = {
  title: string;
  children: React.ReactNode;
};

function Card({ title, children }: CardProps) {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

// 4. Array type
type UserListProps = {
  users: User[];
};

// 5. API response type
type ApiResponse<T> = {
  data: T;
  success: boolean;
  message?: string;
};

type UserResponse = ApiResponse<User>;

// 6. useState type
const [user, setUser] = useState<User | null>(null);
const [users, setUsers] = useState<User[]>([]);
const [loading, setLoading] = useState<boolean>(false);

// 7. Event type
function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  console.log(event.target.value);
}

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
}

// 8. Button click event
function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
  console.log("clicked");
}

// 9. Union type
type Status = "idle" | "loading" | "success" | "error";
const [status, setStatus] = useState<Status>("idle");

// 10. Next.js page params
type PageProps = {
  params: {
    id: string;
  };
};

export default function Page({ params }: PageProps) {
  return <h1>User ID: {params.id}</h1>;
}
```

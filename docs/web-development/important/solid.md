---
title: SOLID
sidebar_position: 7
---

# SOLID

The **SOLID** design principles are a set of five key principles intended to make software designs more understandable, flexible, and maintainable — especially in object-oriented programming. They're often applied to backend and architecture decisions but can also guide front-end and UI engineering decisions, especially in large-scale applications.

Here's a breakdown:

---

### **S — Single Responsibility Principle (SRP)**

**"A class/module/component should have only one reason to change."**

* ✅ Do one thing and do it well.

* 👎 Don’t mix UI rendering, business logic, and data fetching in one component.

* ✅ Example in React:

  * Keep presentational and container components separate.

  * Split a large `UserProfile` component into smaller ones: `UserAvatar`, `UserDetails`, `UserActions`.

---

### **O — Open/Closed Principle (OCP)**

**"Software entities should be open for extension, but closed for modification."**

* ✅ You should be able to add new features without altering existing tested code.

* ✅ Use interfaces, composition, higher-order components, or hooks to extend functionality.

* 👎 Avoid hardcoding logic that forces you to rewrite instead of extending.

---

### **L — Liskov Substitution Principle (LSP)**

**"Subtypes must be substitutable for their base types."**

* ✅ Components or classes should behave correctly when replaced by their child classes or similar components.

* 👎 Don’t break expected behavior when extending components or types.

* ✅ If `Dropdown` extends `Select`, both should accept the same prop interface and work as expected.

---

### **I — Interface Segregation Principle (ISP)**

**"Clients should not be forced to depend on interfaces they do not use."**

* ✅ Use smaller, specific interfaces rather than one big fat interface or prop object.

* ✅ Break down props into meaningful units (e.g., `WithLoadingProps`, `WithAuthProps`) for better composability.

---

### **D — Dependency Inversion Principle (DIP)**

**"High-level modules should not depend on low-level modules; both should depend on abstractions."**

* ✅ Use dependency injection, interfaces, or contexts to abstract functionality.

* 👎 Don’t tightly couple components to data-fetching logic or concrete APIs.

* ✅ For example, pass a `fetchData` prop instead of hardcoding `axios.get` in your component.

---

### **🔁 Real-world UI Use Case**

In a React app:

* **SRP**: `ProductCard` handles only UI, not fetching product data.

* **OCP**: Extend `Button` to create `IconButton` without modifying `Button`.

* **LSP**: All form input types (`TextInput`, `DateInput`, etc.) inherit from a `BaseInput`.

* **ISP**: Components consume only the props they need, not an entire global state object.

* **DIP**: Use React Context or dependency injection for themes, auth, or API clients.

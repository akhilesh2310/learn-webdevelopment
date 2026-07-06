---
title: Design System Architecture
sidebar_position: 2
---

# Design System Architecture

### What is a Design System?

A **Design System** is a **collection of reusable components**, **guided by clear standards**, that can be **assembled together** to build consistent and scalable user interfaces (UIs).

It typically includes:

* **Design tokens**: Colors, typography, spacing, shadows, etc.

* **Components**: Buttons, inputs, modals, forms, etc.

* **Guidelines**: How components should be used, accessibility rules, branding guidelines, tone of voice.

* **Documentation**: A single source of truth (like a website or repository) explaining usage, best practices, and examples.

🔹 **Why use a Design System?**

* **Consistency** across products and teams.

* **Faster development** (reuse components instead of building from scratch).

* **Better collaboration** between design and development.

* **Easier scalability** as the product grows.

Examples of famous design systems:

* Google's **Material Design**

* Microsoft's **Fluent UI**

* Salesforce's **Lightning Design System**

---

### What is Atomic Design Paradigm?

**Atomic Design** is a **methodology** for **creating design systems** proposed by Brad Frost.

It breaks UI down into a **hierarchy of components**, inspired by chemistry:

| Level | Description | Example |
| ----- | ----- | ----- |
| **Atoms** | Basic building blocks, cannot be broken down further | Label, Input, Button, Icon |
| **Molecules** | Group of atoms working together as a unit | Input \+ Label \+ Error message \= Form Field |
| **Organisms** | Groups of molecules forming distinct sections of a UI | Navigation bar, Product card, Footer section |
| **Templates** | Page-level structures showing the layout | Layout skeletons with placeholder content |
| **Pages** | Final product with real content, representing specific views | Home page, Profile page |

🔹 **Why is Atomic Design useful?**

* Encourages thinking **systematically**.

* Helps **build complex UIs from simple components**.

* **Promotes reuse**, which speeds up development and reduces inconsistency.

---

### In short:

* A **Design System** organizes components, standards, and guidelines to build consistent UIs.

* **Atomic Design** is a way to **structure** those components from small to large to make a **scalable and maintainable design system**.

---

Would you also like me to show you a **visual diagram** or a **real-world example** applying Atomic Design to something simple like a Login Page? 🚀 (It makes understanding much easier\!)

4o

##### You said:

How to create and use it in react js ?

###### ChatGPT said:

Good question\! Let’s go step-by-step:

---

## How to Create and Use a Design System in React.js

Think of it like **building a Lego set**:  
 You create small blocks (components) → combine them → build pages → create a consistent product.

---

### 1. Set Up Your Project

You need a **React app**.

```bash
npx create-react-app my-design-system
cd my-design-system
```

You can later move the design system to a **separate package/repo** if you want it reusable across multiple projects.

---

### 2. Plan your Atomic Structure

Organize your folder like this (Atomic Design structure):

```text
/src
/components
/atoms
- Button.jsx
- Input.jsx
- Label.jsx
/molecules
- FormField.jsx
- Card.jsx
/organisms
- Header.jsx
- Footer.jsx
/templates
- MainLayout.jsx
/pages
- HomePage.jsx
```

🔵 **Atoms** \= Smallest (Button, Input)  
 🟢 **Molecules** \= Group of Atoms (Input \+ Label \= FormField)  
 🟣 **Organisms** \= Group of Molecules (Navbar, Footer)  
 🟠 **Templates** \= Page Skeletons  
 🟡 **Pages** \= Fully ready pages with real data

---

### 3. Create Reusable Atoms

Example: **Button**

```jsx
// src/components/atoms/Button.jsx
import React from 'react';

const Button = ({ type = 'button', onClick, children, variant = 'primary' }) => {
const styles = {
primary: { backgroundColor: '#007bff', color: '#fff', padding: '8px 16px', border: 'none', borderRadius: '4px' },
secondary: { backgroundColor: '#6c757d', color: '#fff', padding: '8px 16px', border: 'none', borderRadius: '4px' },
};

return (
<button type={type} onClick={onClick} style={styles[variant]}>
{children}
</button>
);
};

export default Button;
```

Use in another component:

```jsx
import Button from '../components/atoms/Button';

function HomePage() {
return (
<div>
<h1>Welcome!</h1>
<Button variant="primary">Get Started</Button>
</div>
);
}
```

---

### 4. Create Molecules

Example: **FormField**

```jsx
// src/components/molecules/FormField.jsx
import React from 'react';
import Label from '../atoms/Label';
import Input from '../atoms/Input';

const FormField = ({ label, type = 'text', value, onChange }) => (
<div>
<Label text={label} />
<Input type={type} value={value} onChange={onChange} />
</div>
);

export default FormField;
```

---

### 5. Create Organisms

Example: **Header**

```jsx
// src/components/organisms/Header.jsx
import React from 'react';
import Button from '../atoms/Button';

const Header = () => (
<header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f5f5f5' }}>
<h1>MyApp</h1>
<Button variant="secondary">Login</Button>
</header>
);

export default Header;
```

---

### 6. Create Templates and Pages

Templates are layouts you reuse.

Example:

```jsx
// src/components/templates/MainLayout.jsx
import React from 'react';
import Header from '../organisms/Header';

const MainLayout = ({ children }) => (
<>
<Header />
<main>{children}</main>
</>
);

export default MainLayout;
```

Then **Pages** use Templates.

```jsx
// src/components/pages/HomePage.jsx
import React from 'react';
import MainLayout from '../templates/MainLayout';

const HomePage = () => (
<MainLayout>
<h2>Welcome to Home Page!</h2>
</MainLayout>
);

export default HomePage;
```

---

### 7. Bonus: Use Style Libraries for Scalability

Instead of inline styles, you can later use:

* **CSS Modules**

* **Styled Components**

* **Tailwind CSS**

* **Sass / SCSS**

For example, with **Styled Components**:

```bash
npm install styled-components
```

and

```jsx
import styled from 'styled-components';

` const StyledButton = styled.button` `
background: #007bff;
color: white;
padding: 8px 16px;
border-radius: 4px;
border: none;
` `; `
```

---

## Summary:

| Step | Action |
| ----- | ----- |
| 1 | Create basic atoms (Button, Input, etc.) |
| 2 | Combine them into molecules (FormField, etc.) |
| 3 | Group molecules into organisms (Header, Footer) |
| 4 | Use organisms inside templates (layouts) |
| 5 | Build final pages from templates |
| 6 | Style consistently (tokens, theming) |

---

✅ **This way, you create a Design System in React using Atomic Design principles.**  
 ✅ **You can reuse components everywhere, change styles easily, and work faster across your team.**

---

Would you also like me to show how to **separate your design system into a private NPM package** (so you can install and use it across multiple React projects)? 🚀  
 It’s a real-world next step\!

4o

##### You said:

yes

###### ChatGPT said:

Awesome\! 🚀  
 Let's take it step-by-step on **how to separate your React Design System into a reusable private NPM package**:

---

## 📦 How to Create a Reusable Design System as a Private NPM Package

---

## 1. Move Your Design System into a Separate Repo

Create a new project (could be on GitHub, GitLab, Bitbucket, etc.).

```bash
mkdir my-design-system
cd my-design-system
npm init --yes
```

✅ This will create a `package.json`.

---

## 2. Set up the Project for Components

Install **React**, **React DOM**, and **build tools** because you are building a library.

```bash
npm install react react-dom
npm install --save-dev vite typescript @vitejs/plugin-react
```

Or if you prefer CRA:

```bash
npx create-react-library my-design-system
```

You **only export components**, not run an app here.

Folder Structure:

```text
/my-design-system
/src
/components
/atoms
/molecules
/organisms
index.js
package.json
vite.config.js or rollup.config.js
```

---

## 3. Write an `index.js` to Export Everything

```js
// src/index.js

export { default as Button } from './components/atoms/Button';
export { default as Input } from './components/atoms/Input';
export { default as FormField } from './components/molecules/FormField';
export { default as Header } from './components/organisms/Header';
// Keep adding exports
```

---

## 4. Build Your Library

Set up a simple Vite/Rollup build to bundle your components.

Example: `vite.config.js`

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
plugins: [react()],
build: {
lib: {
entry: './src/index.js',
name: 'MyDesignSystem',
`fileName: (format) => `my-design-system.${format}.js`,`
},
rollupOptions: {
external: ['react', 'react-dom'],
output: {
globals: {
react: 'React',
'react-dom': 'ReactDOM',
},
},
},
},
});
```

To build:

```bash
npm run build
```

It generates the `/dist` folder with bundle files.

---

## 5. Publish it Privately (Options)

### a) If you want to publish to npm private

Set your `package.json`:

```json
{
"name": "@your-scope/my-design-system",
"version": "1.0.0",
"private": false,
"publishConfig": {
"access": "restricted"
}
}
```

Login to npm:

```bash
npm login
```

Publish:

```bash
npm publish --access restricted
```

🔒 This makes it **private**, only accessible by your npm account or your organization.

---

### b) OR GitHub Packages

You can publish to GitHub Packages too:

Add this to `.npmrc`:

less  
```text
@your-github-username:registry=https://npm.pkg.github.com
```

Then:

```bash
npm publish
```

---

## 6. How to Use It in Another React Project

Install your design system in any React app:

```bash
npm install @your-scope/my-design-system
```

or if using GitHub URL:

```bash
npm install git+https://github.com/your-username/my-design-system.git
```

Then import your components:

```jsx
import { Button, Input, Header } from '@your-scope/my-design-system';

function App() {
return (
<div>
<Header />
<Button variant="primary">Click Me!</Button>
</div>
);
}
```

---

## 7. Bonus Tips for Production-Ready Design Systems

| Item | Purpose |
| ----- | ----- |
| TypeScript support | Add `.tsx` types for better DX |
| Storybook | Document components visually |
| Jest/React Testing Library | Unit test components |
| ESLint \+ Prettier | Code quality & formatting |
| Rollup.js | If you need an alternative to Vite |
| Theming | Create light/dark/brand theme support |

---

## ✨ Quick Overview

| Step | Action |
| ----- | ----- |
| 1 | Create separate repo/project |
| 2 | Export all components from `index.js` |
| 3 | Build with Vite/Rollup |
| 4 | Publish to npm or GitHub |
| 5 | Install and use in any React app |

## 🎯 First: What is Storybook?

**Storybook** is a **UI development environment** and **component explorer** for frontend developers.

In simple words:

|  |  |
| ----- | ----- |
| 🔍 | It lets you **build and test your React components individually** without running your full app. |
| 📚 | Each component becomes a **"story"**, showing how it looks with different props, states, etc. |
| 🧪 | You can **visually test**, **document**, and **share** your components easily. |

👉 It's like having a **mini live preview** playground for every button, card, header, etc.

**Example:** If you have a `<Button>` component, Storybook can show:

* Primary button

* Secondary button

* Disabled button

* Button with loading spinner without writing an entire app around it.

It looks something like this:

---

## 🛠 How to Add Storybook to Your Design System Project

Let's continue building your design system.

---

## 1. Install Storybook

Inside your `my-design-system` project:

```bash
npx storybook@latest init
```

✅ This auto-detects React and configures Storybook for you.

It creates a `.storybook` folder and some example stories inside `/stories`.

---

## 2. Create Stories for Your Components

Let's say you have a `Button` component at:

```bash
/src/components/atoms/Button.jsx
```

Create a new file:

```bash
/src/components/atoms/Button.stories.jsx
```

Example content:

```jsx
import React from 'react';
import Button from './Button';

// Default export (Storybook config for this component)
export default {
title: 'Atoms/Button',
component: Button,
tags: ['autodocs'], // optional
};

// Named exports (each export becomes a story)
export const Primary = () => <Button variant="primary">Primary Button</Button>;

export const Secondary = () => <Button variant="secondary">Secondary Button</Button>;

export const Disabled = () => <Button variant="primary" disabled>Disabled Button</Button>;
```

✅ Now Storybook will auto-detect and show "Atoms ➔ Button" in sidebar.

Each named export (`Primary`, `Secondary`, etc.) will appear as separate live examples\!

---

## 3. Run Storybook

```bash
npm run storybook
```

It will start a local server at:

```text
http://localhost:6006/
```

🎨 You can now browse and test all your components live\!

---

## 4. Organize Your Stories Smartly

Organize based on **Atomic Design** categories:

| Category | Folder |
| ----- | ----- |
| Atoms | Simple elements like Button, Input, Label |
| Molecules | Group of atoms like FormField (Label \+ Input) |
| Organisms | Bigger sections like Navbar, Footer |

Each can have its own `.stories.jsx` file.

Example Sidebar structure in Storybook:

```css
Atoms
➔ Button
➔ Input
Molecules
➔ FormField
Organisms
➔ Header
```

---

## 🎨 Bonus: Add Light/Dark Theme Switching to Your Design System

In your `my-design-system`, you can build **theming** using simple CSS variables or a library like `styled-components` or `tailwindcss`.

Basic idea:

1. Define a **theme provider**.

2. Set **CSS variables** for light/dark colors.

3. Create a `ThemeContext` to switch themes dynamically.

Example (very simple):

```css
/* light.css */
:root {
--bg-color: #ffffff;
--text-color: #000000;
}

/* dark.css */
:root[data-theme='dark'] {
--bg-color: #000000;
--text-color: #ffffff;
}
```

Then in your components:

```jsx
` const StyledDiv = styled.div` `
background-color: var(--bg-color);
color: var(--text-color);
` `; `
```

✅ You can create a simple button inside Storybook to **toggle light/dark mode**.

**Pro Tip:** Storybook also supports Themes Addon to easily switch themes at the click of a button\!

---

## 🔥 Final Architecture

| Folder | What it contains |
| ----- | ----- |
| /src/components/atoms | Small building blocks (Button, Input) |
| /src/components/molecules | Group of atoms (FormField, SearchBox) |
| /src/components/organisms | Big sections (Navbar, Footer) |
| /src/index.js | Export everything |
| /.storybook | Storybook configuration |
| /stories | Stories showing all components individually |

You will have:

* 📦 A **Design System NPM package**

* 🎨 **Storybook** to preview/test components

* 🌗 Optional **theming support** for Light/Dark mode

---

## ✅ Summary

| Step | Goal |
| ----- | ----- |
| Create design system repo | Separate and clean components |
| Add Storybook | Visualize and test components easily |
| Write stories | For each Atom, Molecule, Organism |
| Build and publish | Private NPM package |
| Use in other apps | Import and reuse your design system |

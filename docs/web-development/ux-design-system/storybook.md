---
title: Storybook
sidebar_position: 2
---

# Storybook

### Interview question and Answers: [https://chatgpt.com/c/6a3a89a1-31dc-83e8-adf4-8f042f8480c6](https://chatgpt.com/c/6a3a89a1-31dc-83e8-adf4-8f042f8480c6)

### 1. What is Storybook?

Storybook is a frontend workshop for building, testing, and documenting UI components in isolation. Instead of running the full application, developers can open a component directly in Storybook and test all important states such as default, loading, disabled, error, empty, responsive, and permission-based states. Storybook officially describes this as a way to build UI components and pages in isolation, especially for hard-to-reach states and edge cases.

**Interview-ready answer:**

We used Storybook as the single source of truth for our reusable components. Every shared component had stories for different states, props, variants, accessibility behavior, and usage guidelines. This helped developers, designers, and QA validate components without depending on the full application flow.

---

### 2. Why use Storybook in a Design System?

Storybook is useful because it gives a common place to build, review, test, and document components.

Main benefits:

* Build components independently from the application.  
* Document props, variants, design rules, and usage examples.  
* Validate accessibility early.  
* Review UI changes with designers before integration.  
* Reduce duplicate components across teams.  
* Improve consistency across products.  
* Use stories as test cases for visual, interaction, and accessibility testing.

**Staff-level answer:**

Storybook was not just a component preview tool for us. We treated it as a design system governance platform. Before a component was added to the shared library, it needed proper stories, documented variants, accessibility checks, token-based styling, and versioned release notes. This reduced UI inconsistency and made adoption easier across multiple teams.

---

### 3. Recommended Folder Structure

design-system/  
 src/  
   components/  
     Button/  
       Button.tsx  
       Button.types.ts  
       Button.styles.ts  
       Button.stories.tsx  
       Button.test.tsx  
       index.ts  
     Input/  
       Input.tsx  
       Input.types.ts  
       Input.styles.ts  
       Input.stories.tsx  
       Input.test.tsx  
       index.ts

   tokens/  
     colors.ts  
     typography.ts  
     spacing.ts  
     shadows.ts  
     radius.ts  
     index.ts

   themes/  
     light.ts  
     dark.ts  
     brandA.ts  
     brandB.ts

   hooks/  
   utils/

   index.ts

 .storybook/  
   main.ts  
   preview.ts  
   manager.ts

 package.json  
 tsconfig.json  
 vite.config.ts

For a design system, I would prefer **component-based folders** over only atomic folders because each component keeps its source, stories, tests, styles, and exports together.

Example:

components/Button/Button.tsx  
components/Button/Button.stories.tsx  
components/Button/Button.test.tsx  
components/Button/index.ts

This scales better when the component library becomes large.

---

### 4. Storybook Story Naming Convention

Use predictable naming so teams can quickly find components.

Foundation/Colors  
Foundation/Typography  
Components/Button  
Components/Input  
Components/Modal  
Patterns/SearchBox  
Layouts/AppShell

Example:

const meta \= \{  
 title: 'Components/Button',  
 component: Button,  
 tags: \['autodocs'\],  
\} satisfies Meta\<typeof Button\>;

\export default meta;

Storybook supports `autodocs` tags to automatically generate documentation from stories, props, args, and metadata.

---

### 5. What Stories Should Every Component Have?

For each reusable component, create stories for all important states.

Example for `Button`:

Button  
 Default  
 Primary  
 Secondary  
 Disabled  
 Loading  
 WithIcon  
 FullWidth  
 Small  
 Medium  
 Large

For form components:

Input  
 Default  
 WithPlaceholder  
 Disabled  
 ReadOnly  
 Error  
 Success  
 WithHelperText  
 Required

For data components:

Table  
 Default  
 Loading  
 Empty  
 Error  
 WithPagination  
 WithSorting  
 WithSelection  
 Responsive

**Good interview line:**

We made sure every component had stories for happy path, edge cases, accessibility states, loading state, error state, empty state, and responsive behavior.

---

### 6. Example Storybook Story

\import type \{ Meta, StoryObj \} from '@storybook/react';  
\import \{ Button \} from './Button';

const meta \= \{  
 title: 'Components/Button',  
 component: Button,  
 tags: \['autodocs'\],  
 args: \{  
   children: 'Click Me',  
   variant: 'primary',  
   size: 'medium',  
 \},  
 argTypes: \{  
   variant: \{  
     control: 'select',  
     options: \['primary', 'secondary', 'danger'\],  
   \},  
   size: \{  
     control: 'select',  
     options: \['small', 'medium', 'large'\],  
   \},  
 \},  
\} satisfies Meta\<typeof Button\>;

\export default meta;

type Story \= StoryObj\<typeof meta\>;

\export const Primary: Story \= \{\};

\export const Disabled: Story \= \{  
 args: \{  
   disabled: true,  
   children: 'Disabled Button',  
 \},  
\};

\export const Loading: Story \= \{  
 args: \{  
   loading: true,  
   children: 'Saving...',  
 \},  
\};  
---

### 7. Documentation Guidelines for Each Component

Every component should document:

Component name  
Purpose  
When to use  
When not to use  
Props API  
Variants  
Accessibility behavior  
Keyboard behavior  
Design token usage  
Responsive behavior  
Do and Don't examples  
Code examples  
Known limitations  
Changelog/version notes

Example:

\# Button

\#\# Purpose  
Use Button to trigger an action such as submit, save, cancel, or navigate.

\#\# When to use  
Use for important user actions.

\#\# When not to use  
Do not use Button for simple navigation text. Use Link instead.

\#\# Accessibility  
\- Must have readable text or aria-label.  
\- Must support keyboard focus.  
\- Disabled state should be visually clear.  
\- Loading state should prevent duplicate submission.

\#\# Variants  
\- primary  
\- secondary  
\- danger  
\- ghost  
---

### 8. Accessibility Guidelines in Storybook

Accessibility should be part of the Storybook checklist, not an afterthought.

For every component:

* Use semantic HTML first.  
* Support keyboard navigation.  
* Provide visible focus state.  
* Use proper ARIA only when needed.  
* Check color contrast.  
* Test screen-reader labels for icon-only buttons.  
* Validate disabled, error, and loading states.  
* Avoid inaccessible custom controls.

Storybook supports accessibility testing through its testing flow. Accessibility tests can run in the Storybook UI and CI, and violations can be inspected in the Accessibility panel.

**Interview-ready answer:**

For accessibility, we added Storybook stories for keyboard states, focus states, disabled states, error states, and screen-reader labels. We also used Storybook accessibility checks to catch common WCAG issues early before components were consumed by applications.

---

### 9. Interaction Testing in Storybook

For interactive components, stories should also test behavior.

Example cases:

Dropdown opens on click  
Modal closes on Escape  
Form shows error after invalid submit  
Tabs switch with keyboard  
Autocomplete filters results

Storybook interaction tests are written inside stories using a `play` function. The play function can simulate user actions like click, type, and submit, then assert the expected result. These tests can be debugged in the Storybook UI and automated through Vitest or CI.

Example:

\export const FilledForm: Story \= \{  
 play: async (\{ canvas, userEvent \}) \=\> \{  
   await userEvent.type(canvas.getByLabelText('Email'), 'test@example.com');  
   await userEvent.click(canvas.getByRole('button', \{ name: 'Submit' \}));

   await expect(canvas.getByText('Form submitted')).toBeInTheDocument();  
 \},  
\};  
---

### 10. SEO Guidelines for Storybook Components

SEO is not relevant for every component, but it matters for layout, content, navigation, and page-level components.

For SEO-sensitive components:

* Use semantic HTML: `header`, `nav`, `main`, `section`, `article`, `footer`.  
* Use proper heading hierarchy: only one logical `h1` per page.  
* Avoid rendering important content only after client-side interaction.  
* Use accessible links instead of clickable `div`s.  
* Support SSR where needed.  
* Avoid layout shifts for images, cards, banners, and skeletons.  
* Provide alt text guidelines for image components.  
* Ensure components do not break metadata or structured content.

**Interview-ready line:**

For SEO, we mainly applied guidelines at page-level and content-heavy components. We ensured semantic HTML, proper heading hierarchy, accessible links, image alt text, SSR compatibility, and minimal layout shift.

---

### 11. Design Token Usage

Do not hardcode values inside components.

Avoid:

color: '\#1976d2';  
padding: '12px';  
border-radius: '4px';

Prefer:

color: tokens.colors.primary\[600\];  
padding: tokens.spacing.md;  
borderRadius: tokens.radius.sm;

Design tokens should cover:

colors  
typography  
spacing  
border radius  
shadows  
z-index  
breakpoints  
motion  
opacity

**Interview answer:**

We used design tokens to avoid hardcoded colors, spacing, typography, and shadows. This helped us support theming, brand consistency, dark mode, and easier design updates without touching every component.

---

### 12. Version Management

For a reusable component library, versioning is important.

Recommended approach:

Patch: bug fix, no breaking change  
Minor: new component or backward-compatible feature  
Major: breaking API or visual behavior change

Example:

1.0.0 \-\> initial release  
1.0.1 \-\> fixed button disabled style  
1.1.0 \-\> added loading variant  
2.0.0 \-\> changed Button prop from type to variant

Use:

Semantic Versioning  
Changesets  
Changelog  
Release notes  
NPM/GitHub package registry  
CI pipeline for publishing

**Interview-ready answer:**

We followed semantic versioning for the component library. Bug fixes were patch releases, backward-compatible additions were minor releases, and breaking API changes were major releases. We maintained changelogs so consuming teams could upgrade safely.

---

### 13. Pull Request Checklist for New Components

Before adding a new component to the design system, I would check:

Component follows design tokens  
Props are typed properly  
No hardcoded styles  
Stories cover all important states  
Autodocs enabled  
Accessibility checked  
Keyboard behavior verified  
Responsive behavior covered  
Unit/interaction tests added where needed  
Component is reusable, not product-specific  
API is simple and stable  
Changelog entry added  
Design review completed

**Strong Staff-level answer:**

We did not allow random product-specific components into the shared design system. A component had to be generic, token-based, accessible, documented in Storybook, tested, and reviewed from both design and engineering perspectives before release.

---

### 14. Storybook Addons/Tools I Would Use

@storybook/addon-docs       \-\> documentation  
@storybook/addon-a11y       \-\> accessibility checks  
@storybook/addon-controls   \-\> live prop editing  
@storybook/test             \-\> interaction testing  
MSW                         \-\> mock API responses  
Chromatic or visual testing \-\> visual regression

Storybook also supports tags such as `dev`, `test`, and `autodocs`, which help control whether stories appear in the sidebar, are included in tests, or generate documentation.

---

## Final Interview Summary

You can answer like this:

In our design system, Storybook was the central place to build, test, review, and document reusable components. Every component had stories for different variants, states, accessibility behavior, and edge cases. We used design tokens for colors, spacing, typography, and theming instead of hardcoded values.

Before adding a component, we checked whether it was generic, reusable, accessible, responsive, well-typed, documented, and covered with tests. For accessibility, we validated keyboard support, focus state, ARIA usage, contrast, disabled state, and screen-reader behavior. For versioning, we followed semantic versioning with changelogs so consuming teams could upgrade safely.

At Staff Engineer level, I would treat Storybook not just as a preview tool, but as a design system governance layer that improves consistency, collaboration, testing, and adoption across multiple teams.

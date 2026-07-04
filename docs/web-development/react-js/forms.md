---
title: 5. Forms
sidebar_position: 5
---

# 5. Forms

# **5\. Forms & Controlled Components**

## **Controlled Components**

## **Uncontrolled Components**

## **Form Validation**

## **React Hook Form**

## **Formik**

## **Dynamic Forms**

## **Common Interview Topics**

* Controlled vs Uncontrolled

# **Forms and Controlled Components in React**

Forms are one of the most important React interview topics because they test state management, event handling, validation, performance, accessibility, and library decisions. In React, forms can be built using controlled components, uncontrolled components, or form libraries like React Hook Form and Formik.

---

# **1\. Controlled Components**

## **Simple meaning**

A controlled component is a form element whose value is controlled by React state.

function LoginForm() \{  
  const \[email, setEmail\] \= React.useState("");

  return (  
    \<input  
      value=\{email\}  
      onChange=\{(event) \=\> setEmail(event.target.value)\}  
    /\>  
  );  
\}

## **Key mental model**

React state is the source of truth.

User types  
  ↓  
onChange runs  
  ↓  
React state updates  
  ↓  
Input value comes from React state

## **Example: controlled form**

function LoginForm() \{  
  const \[form, setForm\] \= React.useState(\{  
    email: "",  
    password: "",  
  \});

  function handleChange(event) \{  
    const \{ name, value \} \= event.target;

    setForm((prev) \=\> (\{  
      ...prev,  
      \[name\]: value,  
    \}));  
  \}

  function handleSubmit(event) \{  
    event.preventDefault();

    console.log(form);  
  \}

  return (  
    \<form onSubmit=\{handleSubmit\}\>  
      \<input  
        name="email"  
        value=\{form.email\}  
        onChange=\{handleChange\}  
      /\>

      \<input  
        name="password"  
        type="password"  
        value=\{form.password\}  
        onChange=\{handleChange\}  
      /\>

      \<button type="submit"\>Login\</button\>  
    \</form\>  
  );  
\}

## **Why controlled components are useful**

* Easy validation while typing.  
* Easy to disable/enable submit button.  
* Easy to show live preview.  
* Easy to conditionally render fields.  
* Form value is always available in React state.  
* Predictable data flow.

## **Common mistake**

Do not pass `value` without `onChange`.

\<input value=\{email\} /\>

This makes the input read-only.

Correct:

\<input  
  value=\{email\}  
  onChange=\{(event) \=\> setEmail(event.target.value)\}  
/\>

## **Another common mistake**

Do not switch from uncontrolled to controlled.

const \[email, setEmail\] \= React.useState(undefined);

\<input value=\{email\} onChange=\{(e) \=\> setEmail(e.target.value)\} /\>;

Better:

const \[email, setEmail\] \= React.useState("");

## **Interview-ready answer**

A controlled component is a form element whose value is controlled by React state. The input value comes from state, and every change updates state using `onChange`. Controlled components are predictable and useful for validation, conditional UI, disabling buttons, and live form updates.

---

# **2\. Uncontrolled Components**

## **Simple meaning**

An uncontrolled component keeps its value in the DOM instead of React state.

React reads the value when needed using a ref.

function LoginForm() \{  
  const emailRef \= React.useRef(null);

  function handleSubmit(event) \{  
    event.preventDefault();

    console.log(emailRef.current.value);  
  \}

  return (  
    \<form onSubmit=\{handleSubmit\}\>  
      \<input ref=\{emailRef\} /\>  
      \<button type="submit"\>Submit\</button\>  
    \</form\>  
  );  
\}

## **Key mental model**

DOM is the source of truth.

User types  
  ↓  
DOM input value changes  
  ↓  
React does not update state on every keystroke  
  ↓  
Read value from ref when needed

## **Default value**

For uncontrolled inputs, use `defaultValue`.

\<input defaultValue="Akhilesh" /\>

For uncontrolled checkbox:

\<input type="checkbox" defaultChecked=\{true\} /\>

## **Good use cases**

* Simple forms.  
* One-time value reading on submit.  
* File inputs.  
* Performance-sensitive large forms.  
* Integration with non-React code.  
* Forms managed by libraries like React Hook Form.

## **File input example**

File input is usually uncontrolled.

function UploadForm() \{  
  const fileRef \= React.useRef(null);

  function handleSubmit(event) \{  
    event.preventDefault();

    const file \= fileRef.current.files\[0\];  
    console.log(file);  
  \}

  return (  
    \<form onSubmit=\{handleSubmit\}\>  
      \<input type="file" ref=\{fileRef\} /\>  
      \<button type="submit"\>Upload\</button\>  
    \</form\>  
  );  
\}

## **Interview-ready answer**

An uncontrolled component stores its value in the DOM instead of React state. We usually access the value using refs during submit or when needed. It can be useful for simple forms, file inputs, third-party integrations, and large forms where updating React state on every keystroke is unnecessary.

---

# **3\. Controlled vs Uncontrolled Components**

## **Simple comparison**

| Point | Controlled | Uncontrolled |
| ----- | ----- | ----- |
| Source of truth | React state | DOM |
| Value prop | `value` / `checked` | `defaultValue` / `defaultChecked` |
| Updates | On every change | DOM updates itself |
| Validation | Easy live validation | Usually submit-time validation |
| Performance | More React updates | Fewer React updates |
| Ref needed | Usually no | Usually yes |
| Best for | Dynamic UI and validation | Simple or large forms |

## **Controlled example**

\<input  
  value=\{email\}  
  onChange=\{(event) \=\> setEmail(event.target.value)\}  
/\>

## **Uncontrolled example**

\<input ref=\{emailRef\} defaultValue="" /\>

## **Which one should we use?**

Use controlled components when:

* Value affects UI immediately.  
* You need live validation.  
* You need conditional fields.  
* You need disabled/enabled submit logic.  
* You need predictable state-driven behavior.

Use uncontrolled components when:

* You only need value on submit.  
* Form is very large.  
* You want fewer re-renders.  
* You are using libraries like React Hook Form.  
* You are working with file inputs or third-party DOM widgets.

## **Interview-ready answer**

Controlled components use React state as the source of truth, while uncontrolled components use the DOM as the source of truth. Controlled components are better for dynamic validation and state-driven UI. Uncontrolled components are simpler and can perform better for large forms because React does not update state on every keystroke.

---

# **4\. Form Validation**

## **Simple meaning**

Form validation checks whether user input is correct before submitting or processing it.

## **Common validation types**

* Required field.  
* Email format.  
* Password length.  
* Confirm password match.  
* Number range.  
* Date range.  
* Custom business rules.  
* Async validation, like checking username availability.

## **Controlled validation example**

function SignupForm() \{  
  const \[email, setEmail\] \= React.useState("");  
  const \[error, setError\] \= React.useState("");

  function handleChange(event) \{  
    const value \= event.target.value;

    setEmail(value);

    if (\!value.includes("@")) \{  
      setError("Enter a valid email");  
    \} else \{  
      setError("");  
    \}  
  \}

  function handleSubmit(event) \{  
    event.preventDefault();

    if (\!email.includes("@")) \{  
      setError("Enter a valid email");  
      return;  
    \}

    console.log("Submit:", email);  
  \}

  return (  
    \<form onSubmit=\{handleSubmit\}\>  
      \<input value=\{email\} onChange=\{handleChange\} /\>

      \{error && \<p role="alert"\>\{error\}\</p\>\}

      \<button disabled=\{\!\!error\}\>Submit\</button\>  
    \</form\>  
  );  
\}

## **Validation timing**

Common options:

* On change: validate while user types.  
* On blur: validate after user leaves field.  
* On submit: validate only when user submits.  
* Async validation: validate with API, usually debounced.

## **Good validation UX**

* Show clear error messages.  
* Do not show too many errors before user interacts.  
* Disable submit only when needed.  
* Highlight invalid fields.  
* Use accessible error text.  
* Keep server-side validation also.

## **Important point**

Frontend validation improves user experience, but backend validation is still required for security and correctness.

## **Interview-ready answer**

Form validation checks whether input is valid before submission. It can happen on change, blur, submit, or asynchronously. Frontend validation improves UX, but backend validation is still required because users can bypass frontend code.

---

# **5\. React Hook Form**

## **Simple meaning**

React Hook Form is a popular form library that focuses on simple APIs, validation, and performance.

It commonly uses uncontrolled inputs internally, which reduces re-renders.

## **Basic example**

\import \{ useForm \} from "react-hook-form";

function LoginForm() \{  
  const \{  
    register,  
    handleSubmit,  
    formState: \{ errors \},  
  \} \= useForm();

  function onSubmit(data) \{  
    console.log(data);  
  \}

  return (  
    \<form onSubmit=\{handleSubmit(onSubmit)\}\>  
      \<input  
        \{...register("email", \{  
          required: "Email is required",  
        \})\}  
      /\>

      \{errors.email && \<p\>\{errors.email.message\}\</p\>\}

      \<input  
        type="password"  
        \{...register("password", \{  
          required: "Password is required",  
        \})\}  
      /\>

      \{errors.password && \<p\>\{errors.password.message\}\</p\>\}

      \<button type="submit"\>Login\</button\>  
    \</form\>  
  );  
\}

## **Key mental model**

React Hook Form registers fields and tracks their values without forcing every keystroke into React component state.

## **Why React Hook Form is useful**

* Less boilerplate.  
* Good performance for large forms.  
* Built-in validation support.  
* Easy integration with schema validators.  
* Works well with uncontrolled inputs.  
* Supports controlled components using `Controller`.  
* Good for dynamic forms with field arrays.

## **Controlled component integration**

Some UI libraries expose controlled components only. Use `Controller`.

\import \{ Controller, useForm \} from "react-hook-form";

function FormWithSelect() \{  
  const \{ control, handleSubmit \} \= useForm();

  return (  
    \<form onSubmit=\{handleSubmit(console.log)\}\>  
      \<Controller  
        name="role"  
        control=\{control\}  
        defaultValue=""  
        render=\{(\{ field \}) \=\> (  
          \<select \{...field\}\>  
            \<option value=""\>Select role\</option\>  
            \<option value="admin"\>Admin\</option\>  
            \<option value="user"\>User\</option\>  
          \</select\>  
        )\}  
      /\>

      \<button type="submit"\>Submit\</button\>  
    \</form\>  
  );  
\}

## **Field array example**

\import \{ useFieldArray, useForm \} from "react-hook-form";

function SkillsForm() \{  
  const \{ register, control, handleSubmit \} \= useForm(\{  
    defaultValues: \{  
      skills: \[\{ name: "" \}\],  
    \},  
  \});

  const \{ fields, append, remove \} \= useFieldArray(\{  
    control,  
    name: "skills",  
  \});

  return (  
    \<form onSubmit=\{handleSubmit(console.log)\}\>  
      \{fields.map((field, index) \=\> (  
        \<div key=\{field.id\}\>  
          \<input \{...register(\`skills.$\{index\}.name\`)\} /\>

          \<button type="button" onClick=\{() \=\> remove(index)\}\>  
            Remove  
          \</button\>  
        \</div\>  
      ))\}

      \<button type="button" onClick=\{() \=\> append(\{ name: "" \})\}\>  
        Add Skill  
      \</button\>

      \<button type="submit"\>Submit\</button\>  
    \</form\>  
  );  
\}

## **Interview-ready answer**

React Hook Form is a form library that reduces boilerplate and improves performance by relying heavily on uncontrolled inputs. It provides APIs like `register`, `handleSubmit`, validation, `Controller` for controlled UI components, and `useFieldArray` for dynamic fields.

---

# **6\. Formik**

## **Simple meaning**

Formik is a React form library that helps manage form values, validation, touched fields, errors, and submission.

## **Basic example**

\import \{ Formik, Form, Field, ErrorMessage \} from "formik";

function LoginForm() \{  
  return (  
    \<Formik  
      initialValues=\{\{  
        email: "",  
        password: "",  
      \}\}  
      validate=\{(values) \=\> \{  
        const errors \= \{\};

        if (\!values.email) \{  
          errors.email \= "Email is required";  
        \}

        if (\!values.password) \{  
          errors.password \= "Password is required";  
        \}

        return errors;  
      \}\}  
      onSubmit=\{(values) \=\> \{  
        console.log(values);  
      \}\}  
    \>  
      \<Form\>  
        \<Field name="email" /\>  
        \<ErrorMessage name="email" component="p" /\>

        \<Field name="password" type="password" /\>  
        \<ErrorMessage name="password" component="p" /\>

        \<button type="submit"\>Login\</button\>  
      \</Form\>  
    \</Formik\>  
  );  
\}

## **Key mental model**

Formik keeps form state in React and provides helpers for values, errors, touched fields, validation, and submit handling.

## **Why Formik is useful**

* Clear form state model.  
* Handles values, errors, touched, and submit state.  
* Good for controlled-form style.  
* Works well with schema validation like Yup.  
* Easy to understand for many teams.  
* Useful in existing/legacy apps already using Formik.

## **Trade-offs**

* Can cause more re-renders compared to uncontrolled-first libraries.  
* More boilerplate than React Hook Form in many cases.  
* For very large forms, performance needs more care.

## **Interview-ready answer**

Formik is a React form library that manages form values, validation errors, touched fields, and submission state. It is easy to understand and useful for controlled-form style apps, but for very large forms React Hook Form is often preferred because it can reduce re-renders.

---

# **7\. Dynamic Forms**

## **Simple meaning**

Dynamic forms are forms where fields are added, removed, shown, hidden, or changed based on user input or configuration.

## **Common examples**

* Add multiple skills.  
* Add/remove passengers.  
* Dynamic survey questions.  
* Conditional fields based on selected role.  
* Form generated from backend schema.  
* Multi-step forms.

## **Basic dynamic fields example**

function SkillsForm() \{  
  const \[skills, setSkills\] \= React.useState(\[""\]);

  function updateSkill(index, value) \{  
    setSkills((prev) \=\>  
      prev.map((skill, skillIndex) \=\>  
        skillIndex \=== index ? value : skill  
      )  
    );  
  \}

  function addSkill() \{  
    setSkills((prev) \=\> \[...prev, ""\]);  
  \}

  function removeSkill(index) \{  
    setSkills((prev) \=\> prev.filter((\_, skillIndex) \=\> skillIndex \!== index));  
  \}

  return (  
    \<form\>  
      \{skills.map((skill, index) \=\> (  
        \<div key=\{index\}\>  
          \<input  
            value=\{skill\}  
            onChange=\{(event) \=\> updateSkill(index, event.target.value)\}  
          /\>

          \<button type="button" onClick=\{() \=\> removeSkill(index)\}\>  
            Remove  
          \</button\>  
        \</div\>  
      ))\}

      \<button type="button" onClick=\{addSkill\}\>  
        Add Skill  
      \</button\>  
    \</form\>  
  );  
\}

## **Important key issue**

Using index as key can cause bugs when removing/reordering fields.

Better use stable IDs.

const \[skills, setSkills\] \= React.useState(\[  
  \{ id: crypto.randomUUID(), name: "" \},  
\]);

Render:

\{skills.map((skill) \=\> (  
  \<input key=\{skill.id\} value=\{skill.name\} /\>  
))\}

## **Conditional fields example**

function UserForm() \{  
  const \[role, setRole\] \= React.useState("user");

  return (  
    \<form\>  
      \<select value=\{role\} onChange=\{(event) \=\> setRole(event.target.value)\}\>  
        \<option value="user"\>User\</option\>  
        \<option value="admin"\>Admin\</option\>  
      \</select\>

      \{role \=== "admin" && (  
        \<input placeholder="Admin access reason" /\>  
      )\}  
    \</form\>  
  );  
\}

## **Dynamic form challenges**

* Stable keys.  
* Nested state updates.  
* Conditional validation.  
* Performance for many fields.  
* Preserving values when fields hide/show.  
* Field array add/remove/reorder.  
* Backend schema mapping.  
* Accessibility and error linking.

## **Interview-ready answer**

Dynamic forms are forms where fields change based on user actions or configuration. They require careful state structure, stable keys, conditional validation, and good performance handling. For complex dynamic forms, React Hook Form’s `useFieldArray` or a schema-driven approach can reduce boilerplate.

---

# **Common Interview Topics / Questions**

---

# **1\. Controlled vs Uncontrolled Components**

## **Answer**

Controlled components use React state as the source of truth. Uncontrolled components use the DOM as the source of truth.

// Controlled  
\<input value=\{email\} onChange=\{(e) \=\> setEmail(e.target.value)\} /\>

// Uncontrolled  
\<input ref=\{emailRef\} defaultValue="" /\>

## **Interview-ready answer**

Controlled components store form values in React state and update state on every change. They are predictable and good for live validation and dynamic UI. Uncontrolled components store values in the DOM and are read using refs. They are simpler and can be more performant for large forms or submit-only value reading.

---

# **2\. Why should we avoid switching between controlled and uncontrolled?**

## **Answer**

React expects an input to stay either controlled or uncontrolled for its lifetime.

Bad:

const \[value, setValue\] \= React.useState(undefined);

\<input value=\{value\} onChange=\{(e) \=\> setValue(e.target.value)\} /\>;

Initially, the value is `undefined`, so it behaves uncontrolled. Later, when value becomes a string, it becomes controlled.

Better:

const \[value, setValue\] \= React.useState("");

\<input value=\{value\} onChange=\{(e) \=\> setValue(e.target.value)\} /\>;

## **Interview-ready answer**

Switching between controlled and uncontrolled can create inconsistent input behavior. If an input is controlled, initialize it with a proper value like empty string for text, `false` for checkbox, or an empty array for multi-select.

---

# **3\. How do you handle form validation?**

## **Answer**

I handle validation based on the UX requirement.

* On change for live feedback.  
* On blur when user leaves the field.  
* On submit for final validation.  
* Async validation for server checks like username availability.  
* Backend validation always for security.

## **Interview-ready answer**

Form validation can be done on change, blur, submit, or asynchronously. I keep error messages user-friendly, accessible, and tied to the relevant field. Frontend validation improves user experience, but backend validation is still mandatory.

---

# **4\. React Hook Form vs Formik**

## **Simple comparison**

| Point | React Hook Form | Formik |
| ----- | ----- | ----- |
| Main style | Uncontrolled-first | Controlled/state-first |
| Performance | Usually better for large forms | Can need optimization |
| Boilerplate | Usually less | More structured |
| Dynamic fields | `useFieldArray` | FieldArray |
| UI library support | `Controller` | Field/custom components |
| Best for | Large/performance-sensitive forms | Existing apps/simple structured forms |

## **Interview-ready answer**

React Hook Form is usually better for performance-sensitive or large forms because it relies more on uncontrolled inputs and reduces re-renders. Formik is easy to understand and manages form state explicitly, but it can be heavier for large forms. In new React apps, I would usually prefer React Hook Form unless the team already has strong Formik conventions.

---

# **5\. How do you design a large form?**

## **Answer**

For a large form, I focus on:

* Form library selection.  
* Field-level validation.  
* Schema validation.  
* Avoiding unnecessary re-renders.  
* Splitting sections into components.  
* Dynamic field arrays.  
* Draft saving.  
* API error mapping.  
* Accessibility.  
* Server-side validation.  
* Dirty/touched tracking.  
* Submit/loading/error state.

## **Interview-ready answer**

For large forms, I avoid putting every keystroke into a high-level parent state. I use a form library like React Hook Form, split the form into sections, validate at field/schema level, handle dynamic arrays carefully, map API errors back to fields, and ensure accessibility and performance.

---

# **6\. How do you handle API errors in forms?**

## **Answer**

API errors can be global or field-specific.

Example:

400 Bad Request  
\{  
  "errors": \{  
    "email": "Email already exists"  
  \}  
\}

Map field errors to the right input.

setError("email", \{  
  type: "server",  
  message: "Email already exists",  
\});

## **Interview-ready answer**

For API errors, I separate field-level errors and form-level errors. Field errors are shown near the relevant input, while general errors are shown at the top or near submit. I also keep backend validation because frontend validation can be bypassed.

---

# **Quick Revision Summary**

| Topic | Key point |
| ----- | ----- |
| Controlled component | React state is source of truth |
| Uncontrolled component | DOM is source of truth |
| `value` | Used for controlled input |
| `defaultValue` | Used for uncontrolled input |
| Validation | Change, blur, submit, async |
| React Hook Form | Uncontrolled-first, performant |
| Formik | Controlled-form state management |
| Dynamic forms | Add/remove/conditional fields |
| Stable keys | Important for dynamic fields |
| File input | Usually uncontrolled |
| Large forms | Prefer form library and avoid unnecessary re-renders |

---

# **Final Interview-Ready Combined Answer**

Controlled components keep form values in React state, making them predictable and useful for live validation, conditional UI, and state-driven behavior. Uncontrolled components keep values in the DOM and are accessed using refs, which can be simpler and more performant for large or submit-only forms. Form validation can happen on change, blur, submit, or asynchronously, but backend validation is still required. React Hook Form is commonly preferred for large or performance-sensitive forms because it is uncontrolled-first and reduces re-renders. Formik manages values, errors, touched fields, and submission state in a controlled-form style and is common in existing applications. For dynamic forms, use stable keys, carefully manage nested state, handle conditional validation, and consider libraries like React Hook Form with `useFieldArray`.

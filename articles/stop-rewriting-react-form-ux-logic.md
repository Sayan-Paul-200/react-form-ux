---
title: Stop Rewriting This React Form UX Logic
published: false
description: A small open-source utility that handles the form UX problems you keep solving from scratch — focusing errors, scrolling to validation failures, and accessible error summaries.
tags: react, javascript, webdev, opensource
cover_image:
---

# Stop Rewriting This React Form UX Logic

You've built the form. You've wired up the validation. Zod or Yup catches every invalid field perfectly.

Then a user submits and… nothing visible happens.

The errors exist in state, sure. But the first invalid field is somewhere off-screen. The user has no idea what went wrong or where to look.

So you start writing the logic you've written a dozen times before:

- Focus the first invalid input
- Scroll the page to the error
- Maybe render a summary of what needs fixing

This is the part of form UX that no one talks about — and everyone keeps reimplementing.

---

## The Hidden Problem

Libraries like React Hook Form and Formik are excellent at what they do. They manage form state, track dirty fields, and run validation. But they intentionally stop short of one thing: **what happens in the DOM after validation fails.**

That responsibility falls on you every single time.

It usually starts small:

```javascript
const firstError = document.querySelector("[aria-invalid='true']");
firstError?.focus();
```

Then you need scrolling. Then you need to handle nested field paths. Then someone asks for an accessible error summary at the top of the form.

Before long, you've got a custom utility file full of DOM-querying logic, tightly coupled to one project and never reused.

---

## A Small Reusable Solution

I ran into this pattern enough times that I extracted it into a tiny open-source package called **[react-form-ux](https://github.com/Sayan-Paul-200/react-form-ux)**.

The idea is simple: provide a few focused UX primitives for forms, and nothing else.

Current features:

- **`focusFirstError()`** — focuses the first invalid input in the DOM
- **`scrollToError()`** — smooth-scrolls to the first validation error
- **`getErrorFields()`** — returns an array of field names that have errors (supports nested paths)
- **`<ErrorSummary />`** — renders an accessible, clickable list of errors

The library is **headless**. It doesn't ship any CSS or UI opinions. It doesn't care whether you're using React Hook Form, Formik, or a completely custom setup.

You pass it an errors object, and it handles the DOM behavior.

At a glance, the library helps you:

- guide users to the first validation error
- focus the correct input automatically
- scroll long forms to the relevant field
- render accessible error summaries

---

## Demo

Submitting an invalid form automatically scrolls to the first error and focuses the field.

![react-form-ux demo](./docs/demo.gif)

---

## Code Example

Here's how it looks with React Hook Form and Zod:

```tsx
import { useForm } from "react-hook-form";
import { useFormUX, ErrorSummary } from "react-form-ux";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

export function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const { focusFirstError, scrollToError } = useFormUX({ errors });

  const onSubmit = (data: z.infer<typeof schema>) => console.log(data);

  const onError = () => {
    setTimeout(() => {
      scrollToError();
      focusFirstError();
    }, 100);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <ErrorSummary errors={errors} />

      <input {...register("email")} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}

      <input {...register("password")} type="password" placeholder="Password" />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">Sign Up</button>
    </form>
  );
}
```

The `setTimeout` gives React a moment to paint the error elements before the scroll and focus kick in. That's the only gotcha.

---

## Why This Exists

This package is **not** trying to replace your form library. The responsibilities are separate:

- **Form libraries** handle validation, state, and data.
- **react-form-ux** handles the UX behavior after validation fails.

By splitting these concerns, your form components stay clean and your users actually see what went wrong.

---

## Installation

```bash
npm install react-form-ux
```

- 📦 [npm package](https://www.npmjs.com/package/react-form-ux)
- 🔗 [GitHub repository](https://github.com/Sayan-Paul-200/react-form-ux)

---

## Early Stage — Feedback Welcome

This project is still evolving. The current feature set is intentionally small, but there's room to grow.

If you've been writing this kind of form UX logic yourself, give the package a try. I'd genuinely appreciate:

- Feedback on the API design
- Suggestions for new features
- Bug reports via [GitHub Issues](https://github.com/Sayan-Paul-200/react-form-ux/issues)

If this solves a problem you've run into, feel free to try it out and let me know what you think.

Thanks for reading. Hope this saves you from writing `document.querySelector` in a form component ever again.

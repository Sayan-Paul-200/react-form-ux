# react-form-ux

Fix common React form UX problems in seconds.

`react-form-ux` is a lightweight utility library that improves the user experience of React forms by handling common UX tasks like:

- focusing the first invalid field
- scrolling to validation errors
- generating accessible error summaries

The library is headless and framework-agnostic, so it works with any React form solution.

## Problem

Most React form libraries focus on **form state and validation**, but developers still need to manually implement UX behaviors such as:

- focusing the first invalid input after submit
- scrolling long forms to the first error
- showing accessible error summaries
- guiding the user to fix validation issues

Example of common ad-hoc code developers write repeatedly:

```javascript
const firstError = document.querySelector("[aria-invalid='true']");
firstError?.focus();
```

These patterns get duplicated across projects.

`react-form-ux` provides **reusable UX primitives** to solve these problems consistently.

## Quick Example

```javascript
import { useFormUX } from "react-form-ux";

function MyForm({ errors }) {
  const { focusFirstError } = useFormUX({ errors });

  const handleSubmit = () => {
    if (Object.keys(errors).length > 0) {
      focusFirstError();
    }
  };

  return <form onSubmit={handleSubmit}>{/* form inputs */}</form>;
}
```

## Installation

```bash
npm install react-form-ux
```

or

```bash
yarn add react-form-ux
```

## Usage

Basic usage with any form library:

```javascript
import { useFormUX } from "react-form-ux";

const { focusFirstError, scrollToError } = useFormUX({
  errors,
});
```

Available helpers:

| Function          | Description                                   |
| ----------------- | --------------------------------------------- |
| focusFirstError() | Focus the first invalid input field           |
| scrollToError()   | Scroll smoothly to the first validation error |
| getErrorFields()  | Get a list of fields with validation errors   |

## Example with React Hook Form

```javascript
import { useForm } from "react-hook-form";
import { useFormUX } from "react-form-ux";

function SignupForm() {
  const { register, handleSubmit, formState } = useForm();

  const { focusFirstError } = useFormUX({
    errors: formState.errors,
  });

  const onSubmit = () => {};

  const onError = () => {
    focusFirstError();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <input {...register("email")} />
      <input {...register("password")} />

      <button type="submit">Submit</button>
    </form>
  );
}
```

## Compatibility

`react-form-ux` works with:

- React 18+
- React Hook Form
- Formik
- Custom React forms

The library does not depend on any specific form framework.

## Status

🚧 Early development.

The first release will include:

- focusFirstError
- scrollToError
- getErrorFields
- ErrorSummary component

## License

MIT License

## Contributing

Contributions, ideas, and feedback are welcome.

Please open an issue if you would like to suggest improvements.

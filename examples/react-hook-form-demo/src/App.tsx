import { useForm } from "react-hook-form";
import { ErrorSummary, useFormUX } from "react-form-ux";

type FormData = {
  email: string;
  password: string;
};

export default function App() {
  const { register, handleSubmit, formState } = useForm<FormData>();
  const { errors } = formState;

  const { focusFirstError, scrollToError } = useFormUX({
    errors,
  });

  const onSubmit = (data: FormData) => {
    alert("Form submitted successfully!\n" + JSON.stringify(data, null, 2));
  };

  const onError = () => {
    scrollToError();
    focusFirstError();
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "420px",
        margin: "0 auto",
        padding: "32px",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "24px", fontSize: "28px" }}>
        Signup Form
      </h1>

      <div style={{ marginBottom: "24px" }}>
        <ErrorSummary 
          errors={errors} 
          title="Please fix the following errors:"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: 600,
              fontSize: "14px",
              color: "#333",
            }}
          >
            Email
          </label>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Enter your email"
            style={{
              width: "100%",
              padding: "12px 14px",
              border: errors.email ? "2px solid #ef4444" : "1px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "16px",
              boxSizing: "border-box",
              outline: "none",
            }}
          />
          {errors.email && (
            <span style={{ color: "#ef4444", fontSize: "13px", marginTop: "6px", display: "block" }}>
              {errors.email.message}
            </span>
          )}
        </div>

        <div style={{ marginBottom: "32px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: 600,
              fontSize: "14px",
              color: "#333",
            }}
          >
            Password
          </label>
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Enter your password"
            style={{
              width: "100%",
              padding: "12px 14px",
              border: errors.password ? "2px solid #ef4444" : "1px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "16px",
              boxSizing: "border-box",
              outline: "none",
            }}
          />
          {errors.password && (
            <span style={{ color: "#ef4444", fontSize: "13px", marginTop: "6px", display: "block" }}>
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
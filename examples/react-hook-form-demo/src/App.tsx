import { useForm } from "react-hook-form";
import { ErrorSummary, useFormUX } from "react-form-ux";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  firstName: z.string().min(1, "First Name is required").max(50),
  lastName: z.string().min(1, "Last Name is required").max(50),
  dob: z.string().min(1, "Date of birth is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Please enter a valid address"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters"),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type FormData = z.infer<typeof schema>;

export default function App() {
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { errors } = formState;

  const { focusFirstError, scrollToError } = useFormUX({
    errors,
  });

  const onSubmit = (data: FormData) => {
    alert("Form submitted successfully!\n" + JSON.stringify(data, null, 2));
  };

  const onError = () => {
    setTimeout(() => {
      scrollToError();
      focusFirstError();
    }, 100);
  };

  return (
    <div style={{ padding: "40px 20px" }}>
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          margin: "0 auto",
          padding: "40px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "8px", fontSize: "32px", color: "#111" }}>
          Create an Account
        </h1>
        <p style={{ textAlign: "center", color: "#666", marginBottom: "32px" }}>
          Join us today! Please fill out your details.
        </p>

        <div style={{ marginBottom: "32px" }}>
          <ErrorSummary 
            errors={errors} 
            title="Please fix the following errors:"
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit, onError)}>
          
          <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
            {/* FIRST NAME */}
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, fontSize: "14px", color: "#333" }}>
                First Name
              </label>
              <input
                {...register("firstName")}
                type="text"
                placeholder="John"
                style={{
                  width: "100%", padding: "12px 14px",
                  border: errors.firstName ? "2px solid #ef4444" : "1px solid #d1d5db",
                  borderRadius: "8px", fontSize: "16px", boxSizing: "border-box", outline: "none",
                }}
              />
              {errors.firstName && <span style={{ color: "#ef4444", fontSize: "13px", marginTop: "6px", display: "block" }}>{errors.firstName.message}</span>}
            </div>

            {/* LAST NAME */}
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, fontSize: "14px", color: "#333" }}>
                Last Name
              </label>
              <input
                {...register("lastName")}
                type="text"
                placeholder="Doe"
                style={{
                  width: "100%", padding: "12px 14px",
                  border: errors.lastName ? "2px solid #ef4444" : "1px solid #d1d5db",
                  borderRadius: "8px", fontSize: "16px", boxSizing: "border-box", outline: "none",
                }}
              />
              {errors.lastName && <span style={{ color: "#ef4444", fontSize: "13px", marginTop: "6px", display: "block" }}>{errors.lastName.message}</span>}
            </div>
          </div>

          {/* DATE OF BIRTH */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, fontSize: "14px", color: "#333" }}>
              Date of Birth
            </label>
            <input
              {...register("dob")}
              type="date"
              style={{
                width: "100%", padding: "12px 14px",
                border: errors.dob ? "2px solid #ef4444" : "1px solid #d1d5db",
                borderRadius: "8px", fontSize: "16px", boxSizing: "border-box", outline: "none",
                fontFamily: "inherit",
              }}
            />
            {errors.dob && <span style={{ color: "#ef4444", fontSize: "13px", marginTop: "6px", display: "block" }}>{errors.dob.message}</span>}
          </div>

          {/* PHONE NUMBER */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, fontSize: "14px", color: "#333" }}>
              Phone Number
            </label>
            <input
              {...register("phone")}
              type="tel"
              placeholder="+1 (555) 000-0000"
              style={{
                width: "100%", padding: "12px 14px",
                border: errors.phone ? "2px solid #ef4444" : "1px solid #d1d5db",
                borderRadius: "8px", fontSize: "16px", boxSizing: "border-box", outline: "none",
              }}
            />
            {errors.phone && <span style={{ color: "#ef4444", fontSize: "13px", marginTop: "6px", display: "block" }}>{errors.phone.message}</span>}
          </div>

          {/* ADDRESS */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, fontSize: "14px", color: "#333" }}>
              Street Address
            </label>
            <input
              {...register("address")}
              type="text"
              placeholder="123 Main St, Apt 4"
              style={{
                width: "100%", padding: "12px 14px",
                border: errors.address ? "2px solid #ef4444" : "1px solid #d1d5db",
                borderRadius: "8px", fontSize: "16px", boxSizing: "border-box", outline: "none",
              }}
            />
            {errors.address && <span style={{ color: "#ef4444", fontSize: "13px", marginTop: "6px", display: "block" }}>{errors.address.message}</span>}
          </div>

          {/* EMAIL */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, fontSize: "14px", color: "#333" }}>
              Email Address
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="john@example.com"
              style={{
                width: "100%", padding: "12px 14px",
                border: errors.email ? "2px solid #ef4444" : "1px solid #d1d5db",
                borderRadius: "8px", fontSize: "16px", boxSizing: "border-box", outline: "none",
              }}
            />
            {errors.email && <span style={{ color: "#ef4444", fontSize: "13px", marginTop: "6px", display: "block" }}>{errors.email.message}</span>}
          </div>

          {/* PASSWORD */}
          <div style={{ marginBottom: "28px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, fontSize: "14px", color: "#333" }}>
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="Create a strong password"
              style={{
                width: "100%", padding: "12px 14px",
                border: errors.password ? "2px solid #ef4444" : "1px solid #d1d5db",
                borderRadius: "8px", fontSize: "16px", boxSizing: "border-box", outline: "none",
              }}
            />
            {errors.password && <span style={{ color: "#ef4444", fontSize: "13px", marginTop: "6px", display: "block" }}>{errors.password.message}</span>}
          </div>

          {/* TERMS OF SERVICE */}
          <div style={{ marginBottom: "40px" }}>
            <label style={{ display: "flex", alignItems: "flex-start", cursor: "pointer" }}>
              <input 
                {...register("terms")}
                type="checkbox" 
                style={{ marginTop: "4px", marginRight: "12px", width: "18px", height: "18px" }} 
              />
              <span style={{ fontSize: "14px", color: "#555", lineHeight: "1.5" }}>
                I agree to the <a href="#" style={{ color: "#2563eb", textDecoration: "none" }}>Terms of Service</a> and <a href="#" style={{ color: "#2563eb", textDecoration: "none" }}>Privacy Policy</a>.
              </span>
            </label>
            {errors.terms && <span style={{ color: "#ef4444", fontSize: "13px", marginTop: "8px", display: "block" }}>{errors.terms.message}</span>}
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "16px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background-color 0.2s",
              boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)"
            }}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
import { useForm } from "react-hook-form"
import { ErrorSummary, useFormUX } from "react-form-ux"

type FormData = {
  email: string
  password: string
}

function App() {
  const { register, handleSubmit, formState } = useForm<FormData>()

  const { focusFirstError } = useFormUX({
    errors: formState.errors
  })

  const onSubmit = (data: FormData) => {
    alert(JSON.stringify(data))
  }

  const onError = () => {
    focusFirstError()
  }

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>React Form UX Demo</h2>

      <ErrorSummary errors={formState.errors} />

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div>
          <label>Email</label>
          <input
            {...register("email", { required: "Email is required" })}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            {...register("password", {
              required: "Password is required"
            })}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App
import { describe, it, expect } from "vitest"
import { focusFirstError } from "../src/utils/focusFirstError"

describe("focusFirstError", () => {
  it("focuses the first error field", () => {
    document.body.innerHTML = `
      <input name="email" />
      <input name="password" />
    `

    const errors = {
      email: { message: "Required" }
    }

    focusFirstError(errors)

    const active = document.activeElement as HTMLInputElement

    expect(active.name).toBe("email")
  })
})
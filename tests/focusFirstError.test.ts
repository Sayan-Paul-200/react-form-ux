import { describe, it, expect, beforeEach } from "vitest"
import { focusFirstError } from "../src/utils/focusFirstError"

describe("focusFirstError", () => {
  beforeEach(() => {
    document.body.innerHTML = ""
  })

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

  it("does nothing when errors object is empty", () => {
    document.body.innerHTML = `<input name="email" />`

    focusFirstError({})

    // No element should be focused (activeElement defaults to <body>)
    expect(document.activeElement).toBe(document.body)
  })

  it("falls back to id-based lookup when name not found", () => {
    document.body.innerHTML = `<input id="username" />`

    const errors = {
      username: { message: "Required" }
    }

    focusFirstError(errors)

    expect(document.activeElement).toBe(document.getElementById("username"))
  })

  it("handles nested error paths", () => {
    document.body.innerHTML = `<input name="address.city" />`

    const errors = {
      address: {
        city: { message: "City is required" }
      }
    }

    focusFirstError(errors)

    const active = document.activeElement as HTMLInputElement
    expect(active.getAttribute("name")).toBe("address.city")
  })

  it("handles missing DOM elements gracefully without throwing", () => {
    document.body.innerHTML = `<input name="other" />`

    const errors = {
      nonexistent: { message: "Error" }
    }

    // Should not throw
    expect(() => focusFirstError(errors)).not.toThrow()
  })
})
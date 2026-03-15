import { describe, it, expect, beforeEach } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useFormUX } from "../src/hooks/useFormUX"

describe("useFormUX", () => {
  beforeEach(() => {
    document.body.innerHTML = ""
  })

  it("returns focusFirstError, scrollToError, getErrorFields functions", () => {
    const { result } = renderHook(() =>
      useFormUX({ errors: {} })
    )

    expect(typeof result.current.focusFirstError).toBe("function")
    expect(typeof result.current.scrollToError).toBe("function")
    expect(typeof result.current.getErrorFields).toBe("function")
  })

  it("returns stable function references across re-renders", () => {
    const { result, rerender } = renderHook(
      ({ errors }) => useFormUX({ errors }),
      { initialProps: { errors: { email: { message: "Required" } } as Record<string, unknown> } }
    )

    const firstFocus = result.current.focusFirstError
    const firstScroll = result.current.scrollToError
    const firstGetErrors = result.current.getErrorFields

    rerender({ errors: { password: { message: "Too short" } } })

    expect(result.current.focusFirstError).toBe(firstFocus)
    expect(result.current.scrollToError).toBe(firstScroll)
    expect(result.current.getErrorFields).toBe(firstGetErrors)
  })

  it("uses latest errors via ref when callback is invoked after re-render", () => {
    const { result, rerender } = renderHook(
      ({ errors }) => useFormUX({ errors }),
      { initialProps: { errors: { email: { message: "Required" } } as Record<string, unknown> } }
    )

    // Re-render with new errors
    rerender({ errors: { password: { message: "Too short" } } })

    // getErrorFields should reflect the NEW errors, not the initial ones
    const fields = result.current.getErrorFields()
    expect(fields).toEqual(["password"])
  })

  it("focusFirstError works when invoked from hook return", () => {
    document.body.innerHTML = `<input name="email" />`

    const errors = { email: { message: "Required" } }

    const { result } = renderHook(() => useFormUX({ errors }))

    act(() => {
      result.current.focusFirstError()
    })

    const active = document.activeElement as HTMLInputElement
    expect(active.getAttribute("name")).toBe("email")
  })

  it("getErrorFields returns correct fields from hook return", () => {
    const errors = {
      email: { message: "Required" },
      password: { message: "Too short" }
    }

    const { result } = renderHook(() => useFormUX({ errors }))

    const fields = result.current.getErrorFields()
    expect(fields).toEqual(["email", "password"])
  })
})

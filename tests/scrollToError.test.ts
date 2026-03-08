import { describe, it, expect, vi } from "vitest"
import { scrollToError } from "../src/utils/scrollToError"

describe("scrollToError", () => {
  it("scrolls to the first error element", () => {
    const scrollMock = vi.fn()

    document.body.innerHTML = `
      <input name="email" />
    `

    const element = document.querySelector("input")!
    element.scrollIntoView = scrollMock

    scrollToError({
      email: { message: "Required" }
    })

    expect(scrollMock).toHaveBeenCalled()
  })
})
import { describe, it, expect, vi, beforeEach } from "vitest"
import { scrollToError } from "../src/utils/scrollToError"

describe("scrollToError", () => {
  beforeEach(() => {
    document.body.innerHTML = ""
  })

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

  it("does nothing when errors object is empty", () => {
    document.body.innerHTML = `<input name="email" />`
    const element = document.querySelector("input")!
    const scrollMock = vi.fn()
    element.scrollIntoView = scrollMock

    scrollToError({})

    expect(scrollMock).not.toHaveBeenCalled()
  })

  it("falls back to id-based lookup when name not found", () => {
    const scrollMock = vi.fn()

    document.body.innerHTML = `<input id="username" />`
    const element = document.getElementById("username")!
    element.scrollIntoView = scrollMock

    scrollToError({
      username: { message: "Required" }
    })

    expect(scrollMock).toHaveBeenCalled()
  })

  it("calls scrollIntoView with smooth behavior and center block", () => {
    const scrollMock = vi.fn()

    document.body.innerHTML = `<input name="email" />`
    const element = document.querySelector("input")!
    element.scrollIntoView = scrollMock

    scrollToError({
      email: { message: "Required" }
    })

    expect(scrollMock).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "center"
    })
  })
})
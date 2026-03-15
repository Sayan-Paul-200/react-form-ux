import { describe, it, expect, beforeEach } from "vitest"
import { findFieldElement } from "../src/utils/findFieldElement"

describe("findFieldElement", () => {
  beforeEach(() => {
    document.body.innerHTML = ""
  })

  it("finds element by name attribute", () => {
    document.body.innerHTML = `<input name="email" />`

    const result = findFieldElement("email")

    expect(result).toBe(document.querySelector('input'))
    expect(result?.getAttribute("name")).toBe("email")
  })

  it("falls back to id when name not found", () => {
    document.body.innerHTML = `<input id="username" />`

    const result = findFieldElement("username")

    expect(result).toBe(document.getElementById("username"))
  })

  it("returns null when no matching element exists", () => {
    document.body.innerHTML = `<input name="other" />`

    const result = findFieldElement("nonexistent")

    expect(result).toBeNull()
  })

  it("handles field names with special characters safely", () => {
    // Characters that would break querySelector but are safe with getElementsByName
    document.body.innerHTML = `<input name='items[0].email' />`

    const result = findFieldElement("items[0].email")

    expect(result).not.toBeNull()
    expect(result?.getAttribute("name")).toBe("items[0].email")
  })
})

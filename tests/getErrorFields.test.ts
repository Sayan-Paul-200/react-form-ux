import { describe, it, expect } from "vitest"
import { getErrorFields } from "../src/utils/getErrorFields"

describe("getErrorFields", () => {
  it("returns top level fields", () => {
    const errors = {
      email: { message: "Required" },
      password: { message: "Too short" }
    }

    const result = getErrorFields(errors)

    expect(result).toEqual(["email", "password"])
  })

  it("supports nested fields", () => {
    const errors = {
      user: {
        email: { message: "Required" }
      }
    }

    const result = getErrorFields(errors)

    expect(result).toEqual(["user.email"])
  })

  it("returns empty array for empty errors object", () => {
    const result = getErrorFields({})

    expect(result).toEqual([])
  })

  it("handles array-indexed fields with bracket notation", () => {
    const errors = {
      items: {
        0: {
          name: { message: "Required" }
        },
        1: {
          price: { message: "Must be positive" }
        }
      }
    }

    const result = getErrorFields(errors)

    expect(result).toEqual(["items[0].name", "items[1].price"])
  })

  it("handles string-type errors (Formik format)", () => {
    const errors = {
      email: "Email is required",
      password: "Too short"
    }

    const result = getErrorFields(errors)

    expect(result).toEqual(["email", "password"])
  })

  it("handles error objects with message property set to undefined", () => {
    const errors = {
      email: { type: "required", message: undefined }
    }

    const result = getErrorFields(errors)

    // Should treat as a leaf because "message" key exists (even if undefined)
    expect(result).toEqual(["email"])
  })

  it("handles deeply nested errors (3+ levels)", () => {
    const errors = {
      company: {
        address: {
          city: { message: "City is required" }
        }
      }
    }

    const result = getErrorFields(errors)

    expect(result).toEqual(["company.address.city"])
  })

  it("does not iterate prototype properties", () => {
    const errors = Object.create({ inherited: { message: "Should not appear" } })
    errors.email = { message: "Required" }

    const result = getErrorFields(errors)

    expect(result).toEqual(["email"])
  })
})
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
})
import { describe, it, expect, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import React from "react"
import { ErrorSummary } from "../src/components/ErrorSummary"

describe("ErrorSummary", () => {
  beforeEach(() => {
    document.body.innerHTML = ""
  })

  it("renders nothing when errors is empty", () => {
    const { container } = render(<ErrorSummary errors={{}} />)

    expect(container.innerHTML).toBe("")
  })

  it("renders a list of error messages", () => {
    const errors = {
      email: { message: "Email is required" },
      password: { message: "Password is too short" }
    }

    render(<ErrorSummary errors={errors} />)

    expect(screen.getByText("Email is required")).toBeTruthy()
    expect(screen.getByText("Password is too short")).toBeTruthy()
  })

  it("renders the custom title prop", () => {
    const errors = {
      email: { message: "Required" }
    }

    render(<ErrorSummary errors={errors} title="Fix these errors:" />)

    expect(screen.getByText("Fix these errors:")).toBeTruthy()
  })

  it("renders default title when no title provided", () => {
    const errors = {
      email: { message: "Required" }
    }

    render(<ErrorSummary errors={errors} />)

    expect(screen.getByText("Please fix the following errors:")).toBeTruthy()
  })

  it("focuses the correct field when an error button is clicked", () => {
    // Create a form field in the real DOM for findFieldElement to find
    const input = document.createElement("input")
    input.setAttribute("name", "email")
    document.body.appendChild(input)

    const errors = {
      email: { message: "Email is required" }
    }

    render(<ErrorSummary errors={errors} />)

    const button = screen.getByText("Email is required")
    fireEvent.click(button)

    expect(document.activeElement).toBe(input)
  })

  it("has role='alert' and aria-live='assertive'", () => {
    const errors = {
      email: { message: "Required" }
    }

    render(<ErrorSummary errors={errors} />)

    const alertElement = screen.getByRole("alert")
    expect(alertElement).toBeTruthy()
    expect(alertElement.getAttribute("aria-live")).toBe("assertive")
  })

  it("handles array-indexed paths in error messages", () => {
    const errors = {
      items: {
        0: {
          name: { message: "Item name is required" }
        }
      }
    }

    render(<ErrorSummary errors={errors} />)

    expect(screen.getByText("Item name is required")).toBeTruthy()
  })
})

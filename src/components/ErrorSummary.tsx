import React from "react"
import { ErrorSummaryProps } from "../types/formUX.types"
import { getErrorFields } from "../utils/getErrorFields"

export function ErrorSummary({
  errors,
  title = "Please fix the following errors:"
}: ErrorSummaryProps) {
  const fields = getErrorFields(errors)

  if (!fields.length) return null

  return (
    <div role="alert" aria-live="assertive">
      <strong>{title}</strong>

      <ul>
      {fields.map((field) => {
          const parts = field.split(".")
          let error: any = errors
          for (const part of parts) {
            error = error?.[part]
          }
          const message = error?.message ?? "Invalid field"

          return (
            <li key={field}>
              <button
                type="button"
                onClick={() => {
                  const element = document.querySelector(
                    `[name="${field}"]`
                  ) as HTMLElement | null
                    ?? document.querySelector(
                    `[id="${field}"]`
                  ) as HTMLElement | null

                  element?.focus()
                }}
              >
                {message}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
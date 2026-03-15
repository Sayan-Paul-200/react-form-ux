import { getErrorFields } from "./getErrorFields"

export function focusFirstError(errors: Record<string, unknown>) {
  const fields = getErrorFields(errors)

  if (!fields.length) return

  const firstField = fields[0]

  const element = document.querySelector(
    `[name="${firstField}"]`
  ) as HTMLElement | null
    ?? document.querySelector(
    `[id="${firstField}"]`
  ) as HTMLElement | null

  element?.focus()
}
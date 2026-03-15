import { getErrorFields } from "./getErrorFields"
import { findFieldElement } from "./findFieldElement"

export function focusFirstError(errors: Record<string, unknown>) {
  const fields = getErrorFields(errors)

  if (!fields.length) return

  const element = findFieldElement(fields[0])

  element?.focus()
}
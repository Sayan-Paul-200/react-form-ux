import { getErrorFields } from "./getErrorFields"
import { findFieldElement } from "./findFieldElement"

export function scrollToError(errors: Record<string, unknown>) {
  const fields = getErrorFields(errors)

  if (!fields.length) return

  const element = findFieldElement(fields[0])

  element?.scrollIntoView({
    behavior: "smooth",
    block: "center"
  })
}
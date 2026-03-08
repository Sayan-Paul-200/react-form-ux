import { getErrorFields } from "./getErrorFields"

export function scrollToError(errors: Record<string, unknown>) {
  const fields = getErrorFields(errors)

  if (!fields.length) return

  const firstField = fields[0]

  const element = document.querySelector(
    `[name="${firstField}"]`
  )

  element?.scrollIntoView({
    behavior: "smooth",
    block: "center"
  })
}
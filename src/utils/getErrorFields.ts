export function getErrorFields(
  errors: Record<string, any>,
  parent = ""
): string[] {
  const fields: string[] = []

  for (const key in errors) {
    const value = errors[key]

    const path = parent ? `${parent}.${key}` : key

    if (value && typeof value === "object" && !value.message) {
      fields.push(...getErrorFields(value, path))
    } else {
      fields.push(path)
    }
  }

  return fields
}
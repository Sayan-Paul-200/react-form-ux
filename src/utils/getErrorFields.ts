export function getErrorFields(
  errors: Record<string, any>,
  parent = ""
): string[] {
  const fields: string[] = []

  for (const key of Object.keys(errors)) {
    const value = errors[key]

    const path = parent
      ? /^\d+$/.test(key)
        ? `${parent}[${key}]`
        : `${parent}.${key}`
      : key

    if (value && typeof value === "object" && !("message" in value)) {
      fields.push(...getErrorFields(value, path))
    } else {
      fields.push(path)
    }
  }

  return fields
}
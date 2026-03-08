export function getErrorFields(errors: Record<string, unknown>): string[] {
  return Object.keys(errors || {})
}
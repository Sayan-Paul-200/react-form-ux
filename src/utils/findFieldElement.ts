/**
 * Finds a form field element in the DOM by its name or id.
 *
 * Uses getElementsByName (safe from CSS selector injection)
 * with a fallback to getElementById.
 */
export function findFieldElement(fieldName: string): HTMLElement | null {
  const byName = document.getElementsByName(fieldName)
  if (byName.length > 0) return byName[0] as HTMLElement

  return document.getElementById(fieldName)
}

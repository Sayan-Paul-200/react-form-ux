export interface UseFormUXOptions {
  errors: Record<string, unknown>
}

export interface UseFormUXReturn {
  focusFirstError: () => void
  scrollToError: () => void
  getErrorFields: () => string[]
}
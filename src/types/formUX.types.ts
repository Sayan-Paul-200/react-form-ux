export interface UseFormUXOptions {
  errors: Record<string, unknown>
}

export interface UseFormUXReturn {
  focusFirstError: () => void
  scrollToError: () => void
  getErrorFields: () => string[]
}

export interface ErrorSummaryProps {
  errors: Record<string, any>
  title?: string
}
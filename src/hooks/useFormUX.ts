import { UseFormUXOptions, UseFormUXReturn } from "../types/formUX.types"
import { focusFirstError } from "../utils/focusFirstError"
import { scrollToError } from "../utils/scrollToError"
import { getErrorFields } from "../utils/getErrorFields"

export function useFormUX(options: UseFormUXOptions): UseFormUXReturn {
  const { errors } = options

  return {
    focusFirstError: () => focusFirstError(errors),
    scrollToError: () => scrollToError(errors),
    getErrorFields: () => getErrorFields(errors)
  }
}
import { useEffect, useRef, useCallback } from "react"
import { UseFormUXOptions, UseFormUXReturn } from "../types/formUX.types"
import { focusFirstError } from "../utils/focusFirstError"
import { scrollToError } from "../utils/scrollToError"
import { getErrorFields } from "../utils/getErrorFields"

export function useFormUX(options: UseFormUXOptions): UseFormUXReturn {
  const { errors } = options
  
  // Keep a mutable reference to the latest errors so callbacks don't use stale closures
  const errorsRef = useRef(errors)

  useEffect(() => {
    errorsRef.current = errors
  }, [errors])

  return {
    focusFirstError: useCallback(() => focusFirstError(errorsRef.current), []),
    scrollToError: useCallback(() => scrollToError(errorsRef.current), []),
    getErrorFields: useCallback(() => getErrorFields(errorsRef.current), [])
  }
}
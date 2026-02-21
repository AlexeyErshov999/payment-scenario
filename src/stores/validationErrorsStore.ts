import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useValidationErrorsStore = defineStore('validationErrors', () => {
  const errors = ref<Record<string, string[]>>({})

  const hasErrors = computed<boolean>(() => {
    return Object.values(errors.value).some(fieldErrors => fieldErrors.length > 0)
  })

  const allErrors = computed<Record<string, string[]>>(() => errors.value || {})

  const errorsCount = computed<number>(() => {
    return Object.values(errors.value).reduce((count, fieldErrors) => count + fieldErrors.length, 0)
  })

  const errorsList = computed<string[]>(() => {
    return Object.values(errors.value).flat()
  })

  function addError(field: string, error: string): void {
    if (!errors.value[field]) {
      errors.value[field] = []
    }
    if (!errors.value[field].includes(error)) {
      errors.value[field].push(error)
    }
  }

  function getFieldErrors(field: string): string[] {
    return errors.value[field] || []
  }

  function getFirstError(field: string): string | undefined {
    return errors.value[field]?.[0]
  }

  function clearFieldErrors(field: string): void {
    if (errors.value[field]) {
      errors.value[field] = []
    }
  }

  function clearAllErrors(): void {
    errors.value = {}
  }

  function removeError(field: string, error: string): void {
    if (errors.value[field]) {
      errors.value[field] = errors.value[field].filter(e => e !== error)
      if (errors.value[field].length === 0) {
        delete errors.value[field]
      }
    }
  }

  function hasFieldErrors(field: string): boolean {
    return !!(errors.value[field] && errors.value[field].length > 0)
  }

  return {
    errors,

    hasErrors,
    allErrors,
    errorsCount,
    errorsList,

    addError,
    getFieldErrors,
    getFirstError,
    clearFieldErrors,
    clearAllErrors,
    removeError,
    hasFieldErrors
  }
})

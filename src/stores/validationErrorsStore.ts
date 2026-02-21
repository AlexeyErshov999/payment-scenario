import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useValidationErrorsStore = defineStore('validationErrors', () => {
  const errors = ref<Record<string, string>>({})

  const getError = computed(() => (fieldName: string) => {
    return errors.value[fieldName] || ''
  })

  const setError = (fieldName: string, errorMessage: string) => {
    errors.value[fieldName] = errorMessage
  }

  const clearError = (fieldName: string) => {
    delete errors.value[fieldName]
  }

  const clearAllErrors = () => {
    errors.value = {}
  }

  const hasErrors = computed(() => Object.keys(errors.value).length > 0)

  const allErrors = computed(() => errors.value)

  return {
    errors,
    getError,
    setError,
    clearError,
    clearAllErrors,
    hasErrors,
    allErrors,
  }
})

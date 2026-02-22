import { validateCardNumber, validatePrice, validateExpireDate, isValidEmail } from './validators'
import { VALIDATION_MESSAGES } from './messages'
import { formatPrice, parsePrice } from '../format/price'
import { parseExpireDate } from '../format/expireDate'

type ValidationRule = (value: string) => string | boolean

/** Фабрика правил валидации суммы для полей с format/parse */
export const createPriceRules = (
  min = 0,
  max = Infinity,
  required = true
): ValidationRule[] => [
  (value: string) => {
    if (!value || !value.trim()) {
      return required ? VALIDATION_MESSAGES.AMOUNT_REQUIRED : true
    }
    return validatePrice(value, parsePrice, formatPrice, min, max)
  },
]

/** Правила для поля суммы в форме заказа */
export const amountRules: ValidationRule[] = [
  (value: string) => {
    if (!value) return VALIDATION_MESSAGES.AMOUNT_REQUIRED
    if (isNaN(Number(value))) return VALIDATION_MESSAGES.AMOUNT_INTEGER
    if (Number(value) <= 0) return VALIDATION_MESSAGES.AMOUNT_POSITIVE
    return true
  },
]

export const emailRules: ValidationRule[] = [
  (value: string) => {
    if (!value) return VALIDATION_MESSAGES.EMAIL_REQUIRED
    if (!isValidEmail(value)) return VALIDATION_MESSAGES.EMAIL_INVALID
    return true
  },
]

export const descriptionRules: ValidationRule[] = [
  (value: string) => {
    if (!value) return VALIDATION_MESSAGES.DESCRIPTION_REQUIRED
    if (value.length < 10) return VALIDATION_MESSAGES.DESCRIPTION_MIN
    if (value.length > 500) return VALIDATION_MESSAGES.DESCRIPTION_MAX
    return true
  },
]

export const cardNumberRules: ValidationRule[] = [validateCardNumber]

/** Правила для поля срока действия карты */
export const expireDateRules: ValidationRule[] = [
  (value: string) => validateExpireDate(value, parseExpireDate),
]

/** Запуск правил, возвращает первую ошибку или true */
export const runRules = (value: string, rules: ValidationRule[]): string | true => {
  for (const rule of rules) {
    const result = rule(value)
    if (typeof result === 'string') return result
  }
  return true
}

/** Результат валидации формы заказа */
export type OrderFormValidationResult =
  | { valid: true; data: { amount: number; email: string; description: string } }
  | { valid: false; errors: Record<string, string> }

/**
 * Валидация данных формы создания заказа
 * Использует те же правила, что и поля формы
 */
export const validateOrderFormData = (
  data: { amount: string; email: string; description: string }
): OrderFormValidationResult => {
  const errors: Record<string, string> = {}

  const amountResult = runRules(data.amount, amountRules)
  if (amountResult !== true) errors.amount = amountResult

  const emailResult = runRules(data.email.trim(), emailRules)
  if (emailResult !== true) errors.email = emailResult

  const descResult = runRules(data.description.trim(), descriptionRules)
  if (descResult !== true) errors.description = descResult

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors }
  }

  const cleanedAmount = data.amount.replace(/\s/g, '').replace(',', '.')
  const amount = parseFloat(cleanedAmount)

  return {
    valid: true,
    data: {
      amount,
      email: data.email.trim(),
      description: data.description.trim(),
    },
  }
}

import { VALIDATION_MESSAGES } from './messages'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Проверка email на соответствие формату */
export const isValidEmail = (email: string): boolean => EMAIL_REGEX.test(email)

/** Валидация номера карты */
export const validateCardNumber = (value: string): string | boolean => {
  const digits = value.replace(/\D/g, '')

  if (!digits) return VALIDATION_MESSAGES.CARD_REQUIRED
  if (digits.length !== 16) return VALIDATION_MESSAGES.CARD_LENGTH
  if (!luhnCheck(digits)) return VALIDATION_MESSAGES.CARD_INVALID

  return true
}

// Проверка по алгоритму Луна
function luhnCheck(cardNumber: string): boolean {
  let sum = 0
  let shouldDouble = false

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i))

    if (shouldDouble) {
      digit *= 2
      if (digit > 9) digit -= 9
    }

    sum += digit
    shouldDouble = !shouldDouble
  }

  return sum % 10 === 0
}

type PriceParser = (value: string) => string
type PriceFormatter = (value: string) => string

/**
 * Валидация суммы в поле ввода цены
 * @param value — сырое значение из поля
 * @param parsePrice — функция парсинга значения
 * @param formatPrice — функция форматирования для сообщений
 * @param min — минимальная сумма (включительно)
 * @param max — максимальная сумма (включительно)
 */
export const validatePrice = (
  value: string,
  parsePrice: PriceParser,
  formatPrice: PriceFormatter,
  min: number,
  max: number
): string | boolean => {
  const parsed = parsePrice(value)
  if (!parsed) {
    return VALIDATION_MESSAGES.AMOUNT_INTEGER
  }

  const normalized = parsed.replace(',', '.')
  const num = Number(normalized)

  if (!Number.isFinite(num)) {
    return VALIDATION_MESSAGES.AMOUNT_INTEGER
  }
  if (num < 0) {
    return VALIDATION_MESSAGES.AMOUNT_NOT_NEGATIVE
  }

  if (num < min || num > max) {
    const minFormatted = formatPrice(min.toString())
    const maxFormatted = formatPrice(max.toString())
    return VALIDATION_MESSAGES.AMOUNT_RANGE(minFormatted, maxFormatted)
  }

  return true
}

/**
 * Валидация срока действия карты (ММ/ГГ)
 * @param value — значение из поля (форматированное)
 * @param parseExpireDate — функция парсинга в 4 цифры (ММГГ)
 */
export const validateExpireDate = (
  value: string,
  parseExpireDate: (value: string) => string
): string | boolean => {
  const digits = parseExpireDate(value)

  if (!digits) return VALIDATION_MESSAGES.EXPIRE_REQUIRED
  if (digits.length !== 4) return VALIDATION_MESSAGES.EXPIRE_FORMAT

  const month = parseInt(digits.slice(0, 2), 10)
  if (month < 1 || month > 12) return VALIDATION_MESSAGES.EXPIRE_MONTH_INVALID

  const year = parseInt(digits.slice(2), 10)
  const now = new Date()
  const currentYear = now.getFullYear() % 100
  const currentMonth = now.getMonth() + 1

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return VALIDATION_MESSAGES.EXPIRE_EXPIRED
  }

  return true
}

/** Валидация CVV/CVC (3–4 цифры, только цифры) */
export const validateCvv = (value: string): string | boolean => {
  const digits = value.replace(/\D/g, '')

  if (!digits) return VALIDATION_MESSAGES.CVV_REQUIRED
  if (digits.length < 3) return VALIDATION_MESSAGES.CVV_MIN

  return true
}

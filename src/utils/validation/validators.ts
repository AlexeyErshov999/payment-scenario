// Проверки на валидность введенного значения
export const isValidEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Валидация номера карты
export const validateCardNumber = (value: string): string | boolean => {
  const digits = value.replace(/\D/g, '')

  if (!digits) {
    return 'Введите номер карты'
  }

  if (digits.length !== 16) {
    return 'Номер карты должен содержать 16 цифр'
  }

  if (!luhnCheck(digits)) {
    return 'Недействительный номер карты'
  }

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

// Валидация цены в поле ввода цены
export const validatePrice = (value: string, parsePrice: (value: string) => string, formatPrice: (value: string) => string, max: number, min: number): string | boolean => {
  const parsed = parsePrice(value)
  if (!/^\d+$/.test(parsed)) {
    return 'Введите целое число'
  }
  const number = Number(parsed)
  if (!Number.isInteger(number)) {
    return 'Сумма должна быть целым числом'
  }
  if (number < min) {
    return `Сумма должна быть не менее ${formatPrice(min.toString())}`
  }
  if (number > max) {
    return `Сумма должна быть не более ${formatPrice(max.toString())}`
  }
  if (number < 0) {
    return 'Сумма не может быть отрицательной'
  }
  return true
}

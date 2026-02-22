import { validateCardNumber } from "./validators"

// Правила валидации полей формы создания заказа
export const amountRules = [
  (value: string) => {
    if (!value) return 'Сумма обязательна'
    if (isNaN(Number(value))) return 'Введите число'
    if (Number(value) <= 0) return 'Сумма должна быть больше 0'
    return true
  },
]

export const emailRules = [
  (value: string) => {
    if (!value) return 'Email обязателен'
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!re.test(value)) return 'Введите корректный email'
    return true
  },
]

export const descriptionRules = [
  (value: string) => {
    if (!value) return 'Описание обязательно'
    if (value.length < 10) return 'Описание должно быть не менее 10 символов'
    if (value.length > 500) return 'Описание должно быть не более 500 символов'
    return true
  },
]

export const cardNumberRules = [validateCardNumber]

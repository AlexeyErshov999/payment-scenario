export const VALIDATION_MESSAGES = {
  // Общие
  REQUIRED: (field: string) => `${field} обязателен`,
  ENTER_VALUE: (field: string) => `Введите ${field}`,

  // Карта
  CARD_REQUIRED: 'Обязательное поле',
  CARD_LENGTH: 'Должно быть 16 цифр',
  CARD_INVALID: 'Неверный номер',

  // Сумма
  AMOUNT_REQUIRED: 'Введите сумму',
  AMOUNT_INTEGER: 'Введите корректную сумму',
  AMOUNT_POSITIVE: 'Сумма должна быть больше 0',
  AMOUNT_NOT_NEGATIVE: 'Сумма не может быть отрицательной',
  AMOUNT_MIN: (min: string) => `Сумма должна быть не менее ${min}`,
  AMOUNT_MAX: (max: string) => `Сумма должна быть не более ${max}`,
  AMOUNT_RANGE: (min: string, max: string) => `Сумма должна быть от ${min} до ${max}₽`,

  // Email
  EMAIL_REQUIRED: 'Email обязателен',
  EMAIL_INVALID: 'Введите корректный email',

  // Описание
  DESCRIPTION_REQUIRED: 'Описание обязательно',
  DESCRIPTION_MIN: 'Описание должно быть не менее 10 символов',
  DESCRIPTION_MAX: 'Описание должно быть не более 200 символов',

  // Срок действия карты
  EXPIRE_REQUIRED: 'Обязательное поле',
  EXPIRE_FORMAT: 'Формат: ММ/ГГ',
  EXPIRE_MONTH_INVALID: 'Неверный месяц',
  EXPIRE_EXPIRED: 'Карта просрочена',

  // CVV/CVC
  CVV_REQUIRED: 'Обязательное поле',
  CVV_MIN: 'Минимум 3 цифры',
} as const

export const PAYMENT_RESULT_MESSAGES = {
  SUCCESS: 'Успешная оплата!',
  FAILED: 'Не удалось оплатить',
  SERVICE_ERROR: 'Упс! Все сломалось... Попробуйте позже'
} as const

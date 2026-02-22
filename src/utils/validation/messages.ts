export const VALIDATION_MESSAGES = {
  // Общие
  REQUIRED: (field: string) => `${field} обязателен`,
  ENTER_VALUE: (field: string) => `Введите ${field}`,

  // Карта
  CARD_REQUIRED: 'Введите номер карты',
  CARD_LENGTH: 'Номер карты должен содержать 16 цифр',
  CARD_INVALID: 'Недействительный номер карты',

  // Сумма
  AMOUNT_REQUIRED: 'Введите сумму',
  AMOUNT_INTEGER: 'Введите целое число',
  AMOUNT_POSITIVE: 'Сумма должна быть больше 0',
  AMOUNT_NOT_NEGATIVE: 'Сумма не может быть отрицательной',
  AMOUNT_MIN: (min: string) => `Сумма должна быть не менее ${min}`,
  AMOUNT_MAX: (max: string) => `Сумма должна быть не более ${max}`,

  // Email
  EMAIL_REQUIRED: 'Email обязателен',
  EMAIL_INVALID: 'Введите корректный email',

  // Описание
  DESCRIPTION_REQUIRED: 'Описание обязательно',
  DESCRIPTION_MIN: 'Описание должно быть не менее 10 символов',
  DESCRIPTION_MAX: 'Описание должно быть не более 500 символов',

  // Срок действия карты
  EXPIRE_REQUIRED: 'Введите срок действия карты',
  EXPIRE_FORMAT: 'Введите дату в формате ММ/ГГ',
  EXPIRE_MONTH_INVALID: 'Некорректный месяц',
  EXPIRE_EXPIRED: 'Срок действия карты истёк',
} as const

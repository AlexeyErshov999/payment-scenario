interface FormatPriceOptions {
  showCurrency?: boolean
  currency?: string
}

interface ParsePriceOptions {
  currency?: string
}

/**
 * Форматирует цену с разделителями тысяч и опциональной валютой
 * Поддерживает копейки, разделённые запятой или точкой
 * @param value - сырое значение
 * @param options - опции форматирования
 * @returns отформатированная строка
 */
export const formatPrice = (value: string, options: FormatPriceOptions = {}): string => {
  const {
    showCurrency = false,
    currency = '₽'
  } = options

  if (!value) return ''

  const stringValue = value.toString().replace(/\s/g, '').replace('.', ',')
  const [integerPartRaw, decimalPartRaw = ''] = stringValue.split(',')
  const hasTrailingComma = stringValue.endsWith(',')

  const cleanedInteger = integerPartRaw.replace(/\D/g, '')
  if (!cleanedInteger) return ''

  const integer = cleanedInteger.replace(/^0+/, '') || '0'
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

  let result = formattedInteger

  const cleanedDecimal = decimalPartRaw.replace(/\D/g, '').slice(0, 2)
  if (hasTrailingComma && !cleanedDecimal) {
    result += ','
  } else if (cleanedDecimal) {
    result += `,${cleanedDecimal}`
  }

  if (showCurrency) {
    return `${currency} ${result}`
  }

  return result
}

/**
 * Парсит отформатированную цену обратно в сырое значение
 * Возвращает строку с целой частью и, при наличии, копейками через запятую
 * @param value - отформатированная строка с ценой
 * @param options - опции парсинга
 * @returns сырое значение
 */
export const parsePrice = (value: string, options: ParsePriceOptions = {}): string => {
  const {
    currency = '₽'
  } = options
  if (!value) return ''
  let cleaned = value.replace(currency, '').trim()
  cleaned = cleaned.replace(/\s/g, '')
  cleaned = cleaned.replace('.', ',')

  // Оставляем только цифры и запятую
  cleaned = cleaned.replace(/[^0-9,]/g, '')

  if (!cleaned) return ''

  const parts = cleaned.split(',')
  const integerPartRaw = parts[0] || '0'
  const integer = integerPartRaw.replace(/^0+/, '') || '0'

  let decimalPart = ''
  if (parts.length > 1) {
    decimalPart = parts[1].replace(/\D/g, '').slice(0, 2)
  }

  if (parts.length > 1 && cleaned.endsWith(',') && !decimalPart) {
    return `${integer},`
  }

  return decimalPart ? `${integer},${decimalPart}` : integer
}

/**
 * Форматирует число в цену
 * @param number - число
 * @param options - опции форматирования
 * @returns отформатированная строка
 */
export const formatNumberAsPrice = (number: number, options: FormatPriceOptions = {}): string => {
  return formatPrice(number.toString(), options)
}

/**
 * Парсит цену в число
 * @param value - отформатированная строка с ценой
 * @param options - опции парсинга
 * @returns число или NaN
 */
export const parsePriceToNumber = (value: string, options: ParsePriceOptions = {}): number => {
  const parsed = parsePrice(value, options)
  if (!parsed) return NaN
  const normalized = parsed.replace(',', '.')
  const num = parseFloat(normalized)
  return Number.isFinite(num) ? num : NaN
}

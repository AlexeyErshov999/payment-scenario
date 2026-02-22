interface FormatPriceOptions {
  showCurrency?: boolean
  currency?: string
}

interface ParsePriceOptions {
  currency?: string
}

/**
 * Форматирует цену с разделителями тысяч и валютой (только целые числа)
 * @param value - сырое значение (только цифры)
 * @param options - опции форматирования
 * @returns отформатированная строка
 */
export const formatPrice = (value: string, options: FormatPriceOptions = {}): string => {
  const {
    showCurrency = false,
    currency = '₽'
  } = options
  if (!value) return ''
  const cleaned = value.replace(/\D/g, '')
  if (!cleaned) return ''
  const integer = cleaned.replace(/^0+/, '') || '0'
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  if (showCurrency) {
    return currency + ' ' + formattedInteger
  }
  return formattedInteger
}

/**
 * Парсит отформатированную цену обратно в сырое значение (только цифры)
 * @param value - отформатированная строка с ценой
 * @param options - опции парсинга
 * @returns сырое значение (только цифры)
 */
export const parsePrice = (value: string, options: ParsePriceOptions = {}): string => {
  const {
    currency = '₽'
  } = options
  if (!value) return ''
  let cleaned = value.replace(currency, '').trim()
  cleaned = cleaned.replace(/\s/g, '')
  cleaned = cleaned.replace(/\D/g, '')
  return cleaned
}

/**
 * Форматирует число в цену (только целые числа)
 * @param number - целое число
 * @param options - опции форматирования
 * @returns отформатированная строка
 */
export const formatNumberAsPrice = (number: number, options: FormatPriceOptions = {}): string => {
  const integer = Math.round(number)
  return formatPrice(integer.toString(), options)
}

/**
 * Парсит цену в число (только целые числа)
 * @param value - отформатированная строка с ценой
 * @param options - опции парсинга
 * @returns целое число или NaN
 */
export const parsePriceToNumber = (value: string, options: ParsePriceOptions = {}): number => {
  const parsed = parsePrice(value, options)
  return parsed ? parseInt(parsed, 10) : NaN
}

/** Оставляет только цифры, максимум 4 (Amex — 4, остальные — 3) */
export const parseCvv = (value: string): string => {
  return value.replace(/\D/g, '').slice(0, 4)
}

export const formatCvv = (value: string): string => {
  return value.replace(/\D/g, '')
}

export const parseCardNumber = (value: string): string => {
  return value.replace(/\s/g, '')
}

export const formatCardNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '')
  const groups = digits.match(/.{1,4}/g) || []
  return groups.join(' ').substr(0, 19)
}

export const parseExpireDate = (value: string): string => {
  return value.replace(/\D/g, '').slice(0, 4)
}

export const formatExpireDate = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 4)

  if (digits.length < 2) {
    return digits
  }

  if (digits.length === 2) {
    return `${digits} / `
  }

  return `${digits.slice(0, 2)} / ${digits.slice(2)}`
}

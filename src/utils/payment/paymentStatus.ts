export type PaymentStatus = 'success' | 'failed' | 'service_error';

const STATUSES: PaymentStatus[] = ['success', 'failed', 'service_error']

export const getRandomPaymentStatus = (): PaymentStatus => {
  const index = Math.floor(Math.random() * STATUSES.length)
  return STATUSES[index]!
}


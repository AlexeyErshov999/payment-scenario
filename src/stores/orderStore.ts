import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { type PaymentStatus } from '../utils/payment/paymentStatus'

export interface OrderData {
  amount: number | string
  email: string
  description: string
  orderId?: string
  createdAt?: string
}

export const useOrderStore = defineStore('order', () => {
  const orderData = ref<OrderData | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const paymentStatus = ref<string>('success')
  const isPaymentPassed = ref<boolean>(false)

  const hasOrderData = computed<boolean>(() => !!orderData.value)

  const orderSummary = computed(() => {
    if (!orderData.value) return null
    return {
      amount: orderData.value.amount,
      email: orderData.value.email,
      description: orderData.value.description
    }
  })

  function setOrderData(data: OrderData): void {
    const orderId = data.orderId ?? String(100000 + Math.floor(Math.random() * 900000))
    orderData.value = {
      ...data,
      orderId,
      createdAt: new Date().toISOString()
    }

    try {
      localStorage.setItem('orderData', JSON.stringify(orderData.value))
      console.log('order added' + String(orderData.value))
    } catch (e) {
      console.error('Failed to save order data to localStorage', e)
    }
  }

  function setPaymentStatus(status: PaymentStatus) {
    paymentStatus.value = status
  }

  function getPaymentStatus() {
    return paymentStatus.value
  }

  function setPaymentPassed(isPassed: boolean) {
    isPaymentPassed.value = isPassed
  }

  function getPaymentPassed() {
    return isPaymentPassed.value
  }

  function clearOrderData(): void {
    orderData.value = null
    localStorage.removeItem('orderData')
  }

  function loadOrderDataFromStorage(): void {
    try {
      const savedData = localStorage.getItem('orderData')
      if (savedData) {
        orderData.value = JSON.parse(savedData) as OrderData
      }
    } catch (e) {
      console.error('Failed to load order data from localStorage', e)
    }
  }

  loadOrderDataFromStorage()

  return {
    orderData,
    loading,
    error,

    hasOrderData,
    orderSummary,

    setOrderData,
    setPaymentStatus,
    setPaymentPassed,
    getPaymentPassed,
    getPaymentStatus,
    clearOrderData,
    loadOrderDataFromStorage
  }
})

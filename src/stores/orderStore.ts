import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface OrderData {
  amount: number | string
  email: string
  description: string
  createdAt?: string
}

export const useOrderStore = defineStore('order', () => {
  const orderData = ref<OrderData | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

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
    orderData.value = {
      ...data,
      createdAt: new Date().toISOString()
    }

    try {
      localStorage.setItem('orderData', JSON.stringify(orderData.value))
      console.log('order added' + String(orderData.value))
    } catch (e) {
      console.error('Failed to save order data to localStorage', e)
    }
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
    clearOrderData,
    loadOrderDataFromStorage
  }
})

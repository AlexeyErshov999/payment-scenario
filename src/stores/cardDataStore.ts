import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface CardData {
  cardNum: string
  expired: {
    month: string,
    year: string
  }
}

// Стор будет хранить данные карты, если проставили чекбокс запомнить карту
// !!! CVV код намеренно не сохраняется !!!
export const useCardDataStore = defineStore('cardData', () => {
  const cardData = ref<CardData | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const hasCardData = computed<boolean>(() => !!cardData.value)

  function setCardData(data: CardData): void {
    cardData.value = {
      ...data
    }
  }

  function clearCardData(): void {
    cardData.value = null
  }

  return {
    cardData,
    loading,
    error,

    hasCardData,

    setCardData,
    clearCardData
  }
})

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import CardNumberInput from '../components/inputs/CardNumberInput.vue'
import FormCard from '../components/base/FormCard.vue'
import ExpireDateInput from '../components/inputs/ExpireDateInput.vue'
import CvvInput from '../components/inputs/CvvInput.vue'
import FormCheckbox from '../components/base/FormCheckbox.vue'
import FormText from '../components/base/FormText.vue'
import SubmitButton from '../components/base/SubmitButton.vue'
import PaymentFooter from '../components/payment/PaymentFooter.vue'
import { useOrderStore } from '../stores/orderStore'
import { useValidationErrorsStore } from '../stores/validationErrorsStore'
import { formatNumberAsPrice } from '../utils/format/price'
import { useRouter } from 'vue-router'
import { useCardDataStore } from '../stores/cardDataStore'
import { getRandomPaymentStatus } from '../utils/payment/paymentStatus'

const cardDataStore = useCardDataStore()

const router = useRouter()

const saveCard = ref(false)
const isSubmitting = ref(false)
const cardNumber = ref('')
const cardDate = ref('')
const cvv = ref('')
const orderStore = useOrderStore()
const validationStore = useValidationErrorsStore()

const isFormFilled = computed(() => {
  const cn = (cardNumber.value || '').replace(/\s/g, '')
  const cd = (cardDate.value || '').replace(/\s/g, '')
  return cn.length >= 16 && cd.length >= 4 && (cvv.value || '').replace(/\D/g, '').length >= 3
})

const fillForm = () => {
  const cardData = localStorage.getItem('cardData')
  if (cardData) {
    const parsedData = JSON.parse(cardData)
    cardNumber.value = parsedData.cardNumber
  } else {
    return
  }
}

onMounted(() => {
  fillForm()
})

const formattedAmount = computed(() => {
  const amount = orderStore.orderData?.amount
  if (amount == null) return ''
  const num = typeof amount === 'string' ? parseInt(amount, 10) : amount
  return isNaN(num) ? '' : formatNumberAsPrice(num) + ' ₽'
})

const payButtonText = computed(() => {
  const amount = formattedAmount.value
  return amount ? `Оплатить ${amount}` : 'Оплатить'
})

const canPay = computed(
  () => !isSubmitting.value && isFormFilled.value && !validationStore.hasErrors,
)

const handlePay = async () => {
  if (!canPay.value) return
  isSubmitting.value = true
  cardDataStore.loading = true

  try {
    if (saveCard.value) {
      localStorage.setItem(
        'cardData',
        JSON.stringify({
          cardNumber: cardNumber.value,
        }),
      )
    }
    const status = getRandomPaymentStatus()
    orderStore.setPaymentStatus(status)
    orderStore.setPaymentPassed(true)
    // Имитирую задержку сети, чтобы на кнопке появился лоадер
    await new Promise((resolve) => setTimeout(resolve, 2000))
    await router.push('/payment-result')
  } finally {
    isSubmitting.value = false
    cardDataStore.loading = false
  }
}
</script>

<template>
  <div class="order-payment-root">
    <div class="order-payment-root__main">
      <div class="order-payment-page">
        <div class="order-payment-page__main">
          <div class="payment-layout">
            <FormCard :has-shadow="true">
              <template #logo>
                <img
                  class="card__logo-placeholder"
                  src="../assets/icons/bank_logo.svg"
                  alt="Bank logo"
                />
              </template>
              <div class="payment-form">
                <CardNumberInput
                  v-model="cardNumber"
                  name="card-number"
                  label="Номер карты"
                  placeholder="1234 5678 9012 9999"
                />
                <div class="form-row">
                  <ExpireDateInput
                    v-model="cardDate"
                    name="card-date"
                    label="Месяц / год"
                    placeholder="12 / 24"
                  />
                  <CvvInput v-model="cvv" name="cvv" placeholder="123" />
                </div>
              </div>
            </FormCard>
            <div class="save-card-row">
              <FormCheckbox v-model="saveCard">
                <FormText>Сохранить карту для следующих покупок</FormText>
              </FormCheckbox>
            </div>
            <div class="pay-section">
              <SubmitButton
                :text="isSubmitting ? 'Обработка...' : payButtonText"
                :loading="cardDataStore.loading"
                :disabled="!canPay"
                :has-form-errors="validationStore.hasErrors"
                @click="handlePay"
              />
              <p class="disclaimer">
                Нажимая на кнопку «Оплатить», вы соглашаетесь с
                <a href="#" class="disclaimer__link">условиями оферты</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PaymentFooter :order-number="orderStore.orderData?.orderId" />
  </div>
</template>

<style lang="scss" scoped>
.order-payment-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.order-payment-root__main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  box-sizing: border-box;
}

.order-payment-page {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
}

.order-payment-page__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.payment-layout {
  width: 100%;
  max-width: 20rem;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 640px) {
    max-width: 28rem;
  }

  @media (min-width: 1024px) {
    max-width: 32rem;
  }

  @media (max-width: 480px) {
    max-width: 100%;
  }
}

.payment-form {
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
}

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 0;

  > * {
    flex: 1;
    min-width: 0;
  }

  .input-wrapper {
    margin-bottom: 16px;
  }
}

.save-card-row {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 1.75rem;
  padding-top: 0.75rem;

  @media (max-width: 374px) {
    margin-top: 1.5rem;
    padding-top: 0.5rem;
  }

  @media (min-width: 640px) {
    margin-top: 2rem;
    padding-top: 1rem;
  }
}

.pay-section {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.75rem;
  margin-top: 1.75rem;
  width: 100%;

  :deep(.submit-button) {
    width: 100%;
  }

  @media (max-width: 374px) {
    margin-top: 1.5rem;
    gap: 0.5rem;
  }

  @media (min-width: 640px) {
    margin-top: 2rem;
    gap: 1rem;
  }
}

.disclaimer {
  margin: 0;
  font-size: 11px;
  line-height: 1.4;
  color: #a6a6a6;
  text-align: center;

  @media (min-width: 640px) {
    font-size: 12px;
  }

  @media (min-width: 1024px) {
    font-size: 13px;
  }
}

.disclaimer__link {
  color: inherit;
  text-decoration: underline;
}

@media (max-width: 360px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }
}

.card__logo-placeholder {
  width: 100%;
  height: 100%;
  min-width: 55px;
  min-height: 47px;
  object-fit: cover;
}
</style>

<script setup lang="ts">
import { computed } from 'vue';
import FormText from '../components/base/FormText.vue';
import { useOrderStore } from '../stores/orderStore';
import PaymentFooter from '../components/payment/PaymentFooter.vue';
import { PAYMENT_RESULT_MESSAGES } from '../utils/validation/messages';
import successImage from '@/assets/images/success.png'
import failedImage from '@/assets/images/failed.png'
import serviceErrorImage from '@/assets/images/service_error.png'

const orderStore = useOrderStore()
const paymentStatus = orderStore.getPaymentStatus()

const resultText = computed(() => {
  switch (paymentStatus) {
    case 'success':
      return PAYMENT_RESULT_MESSAGES.SUCCESS
    case 'failed':
      return PAYMENT_RESULT_MESSAGES.FAILED
    case 'service_error':
      return PAYMENT_RESULT_MESSAGES.SERVICE_ERROR
    default:
      return ''
  }
})

const resultImage = computed(() => {
  switch (paymentStatus) {
    case 'success':
      return successImage
    case 'failed':
      return failedImage
    case 'service_error':
      return serviceErrorImage
    default:
      return '@/assets/images/success.png'
  }
})
</script>

<template>
  <div class="payment-result-root">
    <div class="payment-result-root__main">
      <div class="payment-result-content">
        <img :src="resultImage" alt="Эмодзи, отражающий результат оплаты" />
        <FormText class="result__text">
          {{ resultText }}
        </FormText>
      </div>
    </div>
    <PaymentFooter :order-number="orderStore.orderData?.orderId" />
  </div>
</template>

<style lang="scss" scoped>
.payment-result-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.payment-result-root__main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  box-sizing: border-box;
}

.payment-result-content {
  width: 100%;
  max-width: 20rem;
  margin-inline: auto;
  text-align: center;
}

.payment-result-content img {
  display: block;
  margin: 0 auto 1.75rem;
}

.result__text {
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
}
</style>

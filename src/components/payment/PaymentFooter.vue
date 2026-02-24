<template>
  <footer class="payment-footer">
    <div class="payment-footer__content">
      <PaymentSystemsLogos />
      <p class="payment-footer__security">
        <img src="@/assets/icons/lock.svg" class="payment-footer__lock" />
        <span>Данные банковской карты будут переданы в зашифрованном виде</span>
      </p>
      <p v-if="orderNumber" class="payment-footer__order">
        Заказ №{{ orderNumber }}
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import PaymentSystemsLogos from './PaymentSystemsLogos.vue'

defineProps<{
  orderNumber?: string
}>()
</script>

<style lang="scss" scoped>
@import '@/styles/variables/index.scss';

.payment-footer {
  width: 100%;
  box-sizing: border-box;
  padding-top: 1.5rem;
  padding-bottom: 1rem;
  background-color: $gray-page;
  border-top: 1px solid $gray-border;
}

.payment-footer__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-align: center;
  padding-inline: 1rem;

  @media (min-width: 640px) {
    gap: 1rem;
    padding-inline: 1.5rem;
  }
}

.payment-footer__security {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 0;
  font-size: 11px;
  line-height: 1.4;
  color: $gray-medium;

  @media (min-width: 640px) {
    font-size: 12px;
  }
}

.payment-footer__lock {
  color: $gray-medium;
}

.payment-footer__order {
  margin: 0;
  font-size: 11px;
  line-height: 1.4;
  color: $gray-dark;

  @media (min-width: 640px) {
    font-size: 12px;
  }
}
</style>

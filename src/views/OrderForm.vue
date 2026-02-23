<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import PageContainer from '../components/base/PageContainer.vue'
import FormCard from '../components/base/FormCard.vue'
import SubmitButton from '../components/base/SubmitButton.vue'
import FormInput from '../components/base/FormInput.vue'
import { useValidationErrorsStore } from '../stores/validationErrorsStore'
import { useOrderStore } from '../stores/orderStore'
import {
  emailRules,
  descriptionRules,
  validateOrderFormData,
} from '../utils/validation/validationRules'
import PriceInput from '../components/inputs/PriceInput.vue'

// Чищу данные о заказе в localStorage, чтобы приложение корректно работало при новом заказе
localStorage.removeItem('orderData')

const router = useRouter()

const validationStore = useValidationErrorsStore()
const orderStore = useOrderStore()

const formData = reactive({
  amount: '',
  email: '',
  description: ''
})

const isSubmitting = ref(false)
const submitError = ref<string | null>(null)

const getFormData = (): { amount: number; email: string; description: string } | null => {
  const result = validateOrderFormData(formData)

  if (!result.valid) {
    for (const [field, message] of Object.entries(result.errors)) {
      validationStore.addError(field, message)
    }
    return null
  }

  return result.data
}

const submitForm = async () => {
  isSubmitting.value = true
  orderStore.loading = true
  submitError.value = null

  try {
    validationStore.clearAllErrors()

    const amountInput = document.querySelector('[name="amount"]') as HTMLElement
    const emailInput = document.querySelector('[name="email"]') as HTMLElement
    const descriptionInput = document.querySelector('[name="description"]') as HTMLElement

    amountInput?.blur()
    emailInput?.blur()
    descriptionInput?.blur()

    if (validationStore.hasErrors) {
      console.log('Ошибки валидации:', validationStore.allErrors)
      return
    }

    const orderData = getFormData()

    if (!orderData) {
      return
    }

    orderStore.setOrderData(orderData)

    console.log('Заказ успешно создан:', orderData)

    // Имитирую задержку сети, чтобы на кнопке появился лоадер
    await new Promise(resolve => setTimeout(resolve, 2000))
    await router.push('/payment')

  } catch (error) {
    console.error('Ошибка при создании заказа:', error)
    submitError.value = 'Произошла ошибка при создании заказа. Пожалуйста, попробуйте снова.'
  } finally {
    isSubmitting.value = false
    orderStore.loading = false
  }
}
</script>

<template>
  <PageContainer full-viewport>
    <FormCard :has-shadow="true" title="Создание заказа">
      <form @submit.prevent="submitForm" class="form">
        <PriceInput
          v-model="formData.amount"
          name="amount"
          label="Введите сумму заказа"
          placeholder="0"
          icon="₽"
        />

        <FormInput
          v-model="formData.email"
          name="email"
          label="Email"
          type="email"
          placeholder="example@mail.com"
          :rules="emailRules"
        />

        <FormInput
          v-model="formData.description"
          name="description"
          label="Описание"
          type="text"
          placeholder="Что-то о заказе"
          :max-lines="3"
          :rules="descriptionRules"
        />

        <SubmitButton
          text="Создать"
          type="submit"
          :disabled="isSubmitting"
          :has-form-errors="validationStore.hasErrors"
          :loading="orderStore.loading"
        />
      </form>
    </FormCard>
  </PageContainer>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;

  @media (max-width: 374px) {
    gap: 10px;
  }

  @media (min-width: 640px) {
    gap: 16px;
  }

  @media (min-width: 1024px) {
    gap: 20px;
  }

  @media (max-height: 500px) and (max-width: 640px) {
    gap: 8px;
  }
}

.error-message {
  color: #ff4444;
  font-size: 13px;
  padding: 8px;
  background-color: rgba(255, 68, 68, 0.1);
  border-radius: 4px;
  text-align: center;

  @media (min-width: 640px) {
    font-size: 14px;
    padding: 10px;
  }
}

.reset-btn {
  background: none;
  border: 1px solid #ccc;
  color: #666;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #f5f5f5;
  }

  @media (max-width: 374px) {
    padding: 10px 12px;
    font-size: 13px;
  }
}

.debug-info,
.debug-errors {
  margin-top: 20px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
  font-size: 12px;

  pre {
    margin: 5px 0 0;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  @media (max-width: 374px) {
    padding: 8px;
    font-size: 11px;
  }
}

.debug-errors {
  background-color: #fff3f3;
  color: #c00;
}
</style>

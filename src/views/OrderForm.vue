<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import PageContainer from '../components/ui/PageContainer.vue'
import FormCard from '../components/ui/FormCard.vue'
import SubmitButton from '../components/ui/SubmitButton.vue'
import FormInput from '../components/ui/FormInput.vue'
import { useValidationErrorsStore } from '../stores/validationErrorsStore'
import { useOrderStore } from '../stores/orderStore'
import { amountRules, emailRules, descriptionRules } from '../utils/validationRules'

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
  const cleanedAmount = formData.amount.replace(/\s/g, '').replace(',', '.')
  const amount = parseFloat(cleanedAmount)

  if (isNaN(amount) || amount <= 0) {
    validationStore.addError('amount', 'Сумма должна быть положительным числом')
    return null
  }

  if (!formData.email.trim()) {
    validationStore.addError('email', 'Email обязателен')
    return null
  }

  if (!formData.description.trim()) {
    validationStore.addError('description', 'Описание обязательно')
    return null
  }

  return {
    amount,
    email: formData.email.trim(),
    description: formData.description.trim()
  }
}

const submitForm = async () => {
  isSubmitting.value = true
  submitError.value = null

  try {
    validationStore.clearAllErrors()

    await new Promise(resolve => setTimeout(resolve, 50))

    const amountInput = document.querySelector('[name="amount"]') as HTMLElement
    const emailInput = document.querySelector('[name="email"]') as HTMLElement
    const descriptionInput = document.querySelector('[name="description"]') as HTMLElement

    amountInput?.blur()
    emailInput?.blur()
    descriptionInput?.blur()

    await new Promise(resolve => setTimeout(resolve, 100))

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

    await router.push('/payment')

  } catch (error) {
    console.error('Ошибка при создании заказа:', error)
    submitError.value = 'Произошла ошибка при создании заказа. Пожалуйста, попробуйте снова.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <PageContainer full-viewport>
    <FormCard :has-shadow="true" title="Создание заказа">
      <form @submit.prevent="submitForm" class="form">
        <FormInput
          v-model="formData.amount"
          name="amount"
          label="Введите сумму заказа"
          type="text"
          placeholder="0"
          icon="RUB"
          :rules="amountRules"
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

        <div v-if="submitError" class="error-message">
          {{ submitError }}
        </div>

        <SubmitButton
          :text="isSubmitting ? 'Создание...' : 'Создать'"
          type="submit"
          :disabled="isSubmitting"
          :has-form-errors="validationStore.hasErrors"
          redirect-to="/payment"
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
}

.error-message {
  color: #ff4444;
  font-size: 14px;
  padding: 8px;
  background-color: rgba(255, 68, 68, 0.1);
  border-radius: 4px;
  text-align: center;
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
}

.debug-errors {
  background-color: #fff3f3;
  color: #c00;
}
</style>

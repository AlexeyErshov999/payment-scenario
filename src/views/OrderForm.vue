<script setup lang="ts">
import { ref } from 'vue'
import PageContainer from '../components/ui/PageContainer.vue'
import FormCard from '../components/ui/FormCard.vue'
import SubmitButton from '../components/ui/SubmitButton.vue'
import FormInput from '../components/ui/FormInput.vue'
import { useValidationErrorsStore } from '../stores/validationErrorsStore'
import { amountRules, emailRules, descriptionRules } from '../utils/validationRules'

const validationStore = useValidationErrorsStore()

const submitForm = () => {
  validationStore.clearAllErrors()
  if (validationStore.hasErrors) {
    console.log('Есть ошибки валидации:', validationStore.allErrors)
  }
}
</script>

<template>
  <PageContainer full-viewport>
    <FormCard :has-shadow="true" title="Создание заказа">
      <form @submit.prevent="submitForm" class="form">
        <FormInput
          name="amount"
          label="Введите сумму заказа"
          type="text"
          placeholder="0"
          icon="RUB"
          :rules="amountRules"
        />

        <FormInput
          name="email"
          label="Email"
          type="email"
          placeholder="example@mail.com"
          :rules="emailRules"
        />

        <FormInput
          name="description"
          label="Описание"
          type="text"
          placeholder="Что-то о заказе"
          :max-lines="3"
          :rules="descriptionRules"
        />

        <SubmitButton text="12 000" type="submit" :has-form-errors="validationStore.hasErrors" />
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
</style>

<script setup lang="ts">
import PageContainer from '../components/ui/PageContainer.vue'
import FormCard from '../components/ui/FormCard.vue'
import SubmitButton from '../components/ui/SubmitButton.vue'
import FormInput from '../components/ui/FormInput.vue'
</script>

<template>
  <PageContainer full-viewport>
    <FormCard :has-shadow="true" title="Создание заказа">
      <FormInput
        label="Сумма"
        type="text"
        placeholder="Введите сумму"
        icon="Р"
        error="Ошибка валидации"
      />
      <FormInput
        label="Email"
        type="email"
        placeholder="Введите email"
        error="Ошибка валидации"
      />
      <FormInput
        label="Описание"
        type="text"
        placeholder="Введите описание"
        :max-lines="3"
        error="Ошибка валидации"
      />
      <SubmitButton text="12 000" />
    </FormCard>
  </PageContainer>
</template>

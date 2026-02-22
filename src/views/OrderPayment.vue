<script setup lang="ts">
import CardNumberInput from '../components/inputs/CardNumberInput.vue';
import PageContainer from '../components/base/PageContainer.vue';
import FormCard from '../components/base/FormCard.vue';
import ExpireDateInput from '../components/inputs/ExpireDateInput.vue'
</script>

<template>
  <PageContainer full-viewport>
    <FormCard :has-shadow="true">
      <CardNumberInput
        name="card-number"
        label="Номер карты"
        type="cardNumber"
        placeholder="1234 5678 1234 5678"
      />
      <ExpireDateInput name="card-date" label="Месяц / год" placeholder="ММ / ГГ"/>
    </FormCard>
  </PageContainer>
</template>

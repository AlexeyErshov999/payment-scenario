<script setup lang="ts">
import CardNumberInput from '../components/inputs/CardNumberInput.vue';
import PageContainer from '../components/base/PageContainer.vue';
import FormCard from '../components/base/FormCard.vue';
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
    </FormCard>
  </PageContainer>
</template>

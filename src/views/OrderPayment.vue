<script setup lang="ts">
import CardNumberInput from '../components/inputs/CardNumberInput.vue';
import PageContainer from '../components/base/PageContainer.vue';
import FormCard from '../components/base/FormCard.vue';
import ExpireDateInput from '../components/inputs/ExpireDateInput.vue';
import CvvInput from '../components/inputs/CvvInput.vue';
</script>

<template>
  <PageContainer full-viewport>
    <FormCard :has-shadow="true">
      <template #logo>
        <img class="card__logo-placeholder" src="../assets/icons/bank_logo.svg"/>
      </template>
      <CardNumberInput
        name="card-number"
        label="Номер карты"
        placeholder="1234 5678 9012 9999"
      />
      <div class="form-row">
        <ExpireDateInput name="card-date" label="Месяц / год" placeholder="12 / 24" />
        <CvvInput name="cvv" placeholder="123" />
      </div>
    </FormCard>
  </PageContainer>
</template>

<style lang="scss" scoped>
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

@media (max-width: 360px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }
}

.card__logo-placeholder {
  width: 100%;
  height: 100%;
  min-width: 48px;
  min-height: 48px;
  object-fit: contain;
}
</style>

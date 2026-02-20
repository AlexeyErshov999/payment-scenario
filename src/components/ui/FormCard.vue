<script setup lang="ts">
defineProps<{
  title?: string
  hasShadow?: boolean
}>()
</script>

<template>
  <div class="card" :class="{ 'card--has-shadow': hasShadow }">
    <h1 v-if="title" class="card__title">{{ title }}</h1>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables/index.scss';
@import '@/styles/mixins/responsive.scss';

.card {
  --card-padding-block: 1rem;
  --card-padding-inline: 1.25rem;
  --card-title-size: 1.25rem;
  --card-title-margin: 0.875rem;

  width: 100%;
  max-width: 20rem;
  background: white;
  border-radius: $border-radius-default;
  padding-block: var(--card-padding-block);
  padding-inline: var(--card-padding-inline);
  display: flex;
  flex-direction: column;
  margin-inline: auto;

  &--has-shadow {
    box-shadow: 0 4px 16px $gray-medium;
  }

  &__title {
    font-size: var(--card-title-size);
    margin-block-end: var(--card-title-margin);
    color: black;
    font-weight: 600;
  }
}

@media (min-width: #{$breakpoint-md}) and (max-width: #{$breakpoint-lg}) {
  .card {
    --card-padding-block: 1.25rem;
    --card-padding-inline: 1.75rem;
    --card-title-size: 1.35rem;
    --card-title-margin: 1rem;

    max-width: 23rem;
  }
}

@media (min-width: #{$breakpoint-lg}) and (max-width: #{$breakpoint-xl}) {
  .card {
    --card-padding-block: 1.5rem;
    --card-padding-inline: 2rem;
    --card-title-size: 1.5rem;
    --card-title-margin: 1.25rem;

    max-width: 25.75rem;
  }
}

@media (min-width: #{$breakpoint-xl}) and (max-width: #{$breakpoint-2xl}) {
  .card {
    --card-padding-block: 1.5rem;
    --card-padding-inline: 2rem;
    --card-title-size: 1.5rem;
    --card-title-margin: 1.25rem;

    max-width: 26.5rem;
  }
}

@media (min-width: #{$breakpoint-2xl}) {
  .card {
    --card-padding-block: 1.75rem;
    --card-padding-inline: 2.25rem;
    --card-title-size: 1.6rem;
    --card-title-margin: 1.5rem;

    max-width: 28rem;
  }
}
</style>

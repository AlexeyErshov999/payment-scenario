<script setup lang="ts">
defineProps<{
  title?: string
  hasShadow?: boolean
}>()
</script>

<template>
  <div class="card" :class="{ 'card--has-shadow': hasShadow }">
    <div v-if="$slots.logo" class="card__logo">
      <slot name="logo" />
    </div>
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

  position: relative;
  width: 100%;
  min-width: 0;
  max-width: 20rem;
  background: $white;
  border-radius: $border-radius-default;
  padding: 1.5rem 1.25rem;
  margin-inline: auto;
  box-sizing: border-box;

  &--has-shadow {
    box-shadow: 0 4px 16px $gray-medium;
  }

  @media (min-width: 640px) {
    padding: $padding-vertical-form $padding-horizontal-form;
    max-width: 28rem;
  }

  @media (min-width: 1024px) {
    max-width: 32rem;
  }

  @media (max-width: 480px) {
    padding: 1.25rem 1rem;
    width: 100%;
    max-width: 100%;
    border-radius: 12px;
  }

  &__title {
    font-size: 24px;
    line-height: 32px;
    color: $gray-dark;
    margin-block-end: var(--card-title-margin);
    font-weight: 600;
  }

  &__logo {
    position: absolute;
    top: 0;
    right: 0;
    width: 48px;
    height: 48px;
  }
}
</style>

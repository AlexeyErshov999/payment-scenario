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
  min-width: 412px;
  max-width: 20rem;
  background: $white;
  border-radius: $border-radius-default;
  padding-block: $padding-vertical-form;
  padding-inline: $padding-horizontal-form;
  margin-inline: auto;

  &--has-shadow {
    box-shadow: 0 4px 16px $gray-medium;
  }

  &__title {
    font-size: 24px;
    line-height: 32px;
    color: $gray-dark;
    margin-block-end: var(--card-title-margin);
    font-weight: 600;
  }
}
</style>

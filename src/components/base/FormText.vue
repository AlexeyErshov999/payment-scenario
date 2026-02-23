<template>
  <span class="form-text" :class="variantClass">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: 'body' | 'small' | 'muted'
  }>(),
  { variant: 'body' }
)

const variantClass = computed(() => `form-text--${props.variant}`)
</script>

<style lang="scss" scoped>
@import '@/styles/variables/index.scss';

.form-text {
  font-family: $font-family-sans;
  font-weight: $font-weight-default;
  line-height: 1.4;

  &--body {
    font-size: 14px;
    color: $gray-dark;

    @media (max-width: 374px) {
      font-size: 13px;
    }

    @media (min-width: 640px) {
      font-size: 15px;
    }
  }

  &--small {
    font-size: 12px;
    color: $gray-dark;

    @media (min-width: 640px) {
      font-size: 13px;
    }
  }

  &--muted {
    font-size: 14px;
    color: $gray-medium;

    @media (min-width: 640px) {
      font-size: 15px;
    }
  }
}
</style>

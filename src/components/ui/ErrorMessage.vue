<template>
  <span v-if="text" class="validation-error">
    {{ text }}
  </span>
  <span v-else-if="$slots.default" class="validation-error">
    <slot />
  </span>
</template>

<script setup lang="ts">
defineProps<{
  text?: string
}>()
</script>

<style lang="scss" scoped>
@import '@/styles/variables/index.scss';
@import '@/styles/mixins/responsive.scss';

.validation-error {
  display: block;
  color: #FF3B30;
  font-weight: 400;
  font-size: 12px;
  line-height: 13px;
  letter-spacing: 0.3px;

  margin-block-start: calc(var(--card-padding-block, 1rem) * 0.25);

  @include mobile-only {
    font-size: 11px;
    line-height: 12px;
    letter-spacing: 0.2px;
    margin-block-start: calc(var(--card-padding-block, 1rem) * 0.2);
  }

  @media (min-width: #{$breakpoint-2xl}) {
    font-size: 13px;
    line-height: 14px;
    letter-spacing: 0.3px;
  }
}
</style>

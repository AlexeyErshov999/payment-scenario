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
  color: $error;
  font-weight: 400;
  font-size: 12px;
  line-height: 13px;
  letter-spacing: 0.3px;
}
</style>

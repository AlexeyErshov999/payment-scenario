<template>
  <div class="center" :class="{ 'full-viewport': fullViewport }">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  fullViewport?: boolean
}>()
</script>

<style lang="scss" scoped>
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &.full-viewport {
    block-size: 100vh;
  }
}
</style>

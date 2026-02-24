<template>
  <div class="center">
    <div class="center__inner">
      <slot />
    </div>
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
  box-sizing: border-box;
  block-size: 100vh;
}

.center__inner {
  width: 100%;
  max-width: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

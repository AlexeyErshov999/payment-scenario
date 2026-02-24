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
  min-height: 100vh;
  min-height: 100dvh;
  padding: 1rem;
}

.center__inner {
  width: 100%;
  max-width: 32rem;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

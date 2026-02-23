<template>
  <div class="center" :class="{ 'full-viewport': fullViewport }">
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
  padding: 1rem;
  box-sizing: border-box;

  &.full-viewport {
    block-size: 100vh;
  }
}

.center__inner {
  width: 100%;
  max-width: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  .center.full-viewport & {
    flex: 1;
    min-height: 0;
    align-self: stretch;
  }

  @media (min-width: 640px) {
    padding: 0 0.5rem;
  }
}
</style>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import helpIcon from '../../assets/icons/help.svg'
import helpActiveIcon from '../../assets/icons/help_active.svg'

defineProps<{
  text: string
}>()

const isOpen = ref(false)
const triggerRef = ref<HTMLElement | null>(null)

const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as Node
  if (triggerRef.value && !triggerRef.value.contains(target)) {
    isOpen.value = false
  }
}

const toggle = () => {
  isOpen.value = !isOpen.value
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <span ref="triggerRef" class="help-tooltip">
    <button
      type="button"
      class="help-tooltip__trigger"
      :class="{ 'help-tooltip__trigger--active': isOpen }"
      :aria-label="text"
      :aria-expanded="isOpen"
      @click.stop="toggle"
    >
      <img
        :src="isOpen ? helpActiveIcon : helpIcon"
        alt=""
        class="help-tooltip__icon"
      />
    </button>
    <Transition name="tooltip">
      <div v-show="isOpen" class="help-tooltip__bubble" role="tooltip">
        {{ text }}
      </div>
    </Transition>
  </span>
</template>

<style lang="scss" scoped>
@import '@/styles/variables/index.scss';

.help-tooltip {
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-left: 0;
  vertical-align: middle;
}

.help-tooltip__trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background-color: $gray-light;
  color: $white;
  cursor: pointer;

  &--active {
    background: $gray-medium;
    color: $white;
  }

  .help-tooltip__icon {
    flex-shrink: 0;
    width: 12px;
    height: 12px;
    display: block;
  }
}

.help-tooltip__bubble {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  min-width: 180px;
  max-width: 240px;
  padding: 8px 12px;
  background: $gray-dark;
  color: $white;
  font-size: 12px;
  line-height: 1.4;
  font-weight: 400;
  border-radius: 6px;
  white-space: normal;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: $gray-dark;
  }
}

.tooltip-enter-active,
.tooltip-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(4px);
}
</style>

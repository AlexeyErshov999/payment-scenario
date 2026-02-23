<template>
  <label class="checkbox" @click="handleLabelClick">
    <input
      ref="inputRef"
      type="checkbox"
      class="checkbox__input"
      :checked="modelValue"
      @change="handleChange"
    />
    <span class="checkbox__box" aria-hidden="true">
      <svg class="checkbox__check" :class="{ 'checkbox__check--visible': modelValue }" viewBox="0 0 12 10" fill="none">
        <path
          d="M1 5.5L4.5 9L11 1.5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <span v-if="$slots.default || label" class="checkbox__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

const props = defineProps<{
  modelValue: boolean
  label?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}

const handleLabelClick = (event: MouseEvent) => {
  event.preventDefault()
  emit('update:modelValue', !props.modelValue)
  nextTick(() => {
    inputRef.value?.focus({ preventScroll: true })
  })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables/index.scss';

.checkbox {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
  contain: layout;
}

.checkbox__input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
  overflow-anchor: none;

  &:focus-visible + .checkbox__box {
    outline: 2px solid $accent-color;
    outline-offset: 2px;
  }
}

.checkbox__box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border: 2px solid $gray-medium;
  border-radius: 4px;
  background-color: $white;
  transition: border-color 0.2s, background-color 0.2s;

  .checkbox__input:checked + & {
    background-color: $accent-color;
    border-color: $accent-color;
  }
}

.checkbox__check {
  width: 12px;
  height: 10px;
  color: $white;
  opacity: 0;
  transition: opacity 0.2s;

  &--visible {
    opacity: 1;
  }
}

.checkbox__label {
  flex: 1;
  min-width: 0;
  font-size: 14px;
  line-height: 1.4;
  color: $gray-dark;

  @media (max-width: 374px) {
    font-size: 13px;
  }

  @media (min-width: 640px) {
    font-size: 15px;
  }
}
</style>

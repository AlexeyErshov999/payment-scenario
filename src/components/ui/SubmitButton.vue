<script setup lang="ts">
import { useRouter } from 'vue-router'

interface Props {
  text: string
  loading?: boolean
  disabled?: boolean
  redirectTo?: string
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  loading: false,
  disabled: false,
  redirectTo: '',
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): Promise<void> | void
}>()

const router = useRouter()

const handleClick = async (event: MouseEvent) => {
  if (props.disabled || props.loading) return

  try {
    await emit('click', event)

    if (props.redirectTo) {
      await router.push(props.redirectTo)
    }
  } catch (error) {
    console.error('Ошибка:', error)
  }
}
</script>

<template>
  <button
    class="submit-button"
    :class="{ 'is-loading': loading }"
    :disabled="disabled"
    @click="handleClick"
  >
    <span v-if="loading" class="spinner" />
    <span :class="{ 'visually-hidden': loading }">{{ text }}</span>
  </button>
</template>

<style lang="scss" scoped>
@import '@/styles/variables/index.scss';
@import '@/styles/mixins/responsive.scss';

.submit-button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $accent-color;
  border-radius: $border-radius-l;
  color: $white;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  position: relative;
  padding-inline: $padding-h-submit-button;
  padding-block: $padding-v-submit-button;

  transition: all 0.3s ease;

  &:hover:not(:disabled):not(.is-loading) {
    background-color: $button-hover-color;
    box-shadow: 0 0 $shadow-blur-size $button-hover-color;
  }

  &:active:not(:disabled):not(.is-loading) {
    background-color: $button-active-color;
    box-shadow: none;
  }

  &:focus-visible {
    outline: 2px solid $accent-color;
    outline-offset: 2px;
  }

  &:disabled {
    background-color: $gray-medium;
    cursor: not-allowed;

    &:hover {
      box-shadow: none;
    }
  }

  &.is-loading {
    background-color: $accent-color;
    cursor: wait;

    &:hover {
      background-color: $accent-color;
      box-shadow: none;
    }
  }
}

.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: $white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

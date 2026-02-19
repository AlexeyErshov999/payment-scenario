<script setup lang="ts">
import { useRouter } from 'vue-router'

interface Props {
  text: string
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
  disabled?: boolean
  redirectTo?: string
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  type: 'button',
  loading: false,
  disabled: true,
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
    :disabled="disabled || loading" 
    @click="handleClick"
  >
    <span v-if="loading" class="spinner" />
    <span :class="{ 'visually-hidden': loading }">{{ text }}</span>
  </button>
</template>

<style lang="scss" scoped>
@import '@/styles/variables/index.scss';
@import '@/styles/mixins/responsive';

.submit-button {
  display: flex;
  justify-content: center;
  align-items: center;
  inline-size: 100%;
  height: 50px;
  background-color: $accent-color;
  border-radius: $border-radius-l;
  color: $white;
  max-inline-size: 50rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  position: relative;
  
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
    opacity: 0.6;
    
    &:hover {
      box-shadow: none;
    }
  }
  
  &.is-loading {
    background-color: $accent-color;
    cursor: wait;
    opacity: 0.8;
    
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
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.visually-hidden {
  opacity: 0;
  width: 0;
  margin: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
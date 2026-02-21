<template>
  <div class="input-wrapper">
    <label class="input__label">{{ label }}</label>
    <div class="input-container" :class="{ 'has-icon': icon }">
      <input
        class="input"
        :type="type"
        v-model="text"
        :placeholder="placeholder"
        :style="{ paddingRight: icon ? '30px' : '12px' }"
      />
      <span v-if="icon" class="input__icon" v-html="icon"></span>
    </div>
    <ErrorMessage v-if="error" :text="error" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ErrorMessage from './ErrorMessage.vue'

interface IFormInputProps {
  label: string
  type: 'text' | 'email' | 'password' | 'tel' | 'number'
  placeholder?: string
  icon?: string
  error?: string
}

defineProps<IFormInputProps>()

const text = ref('')
</script>

<style lang="scss" scoped>
@import '@/styles/variables/index.scss';
@import '@/styles/mixins/responsive.scss';

.input-wrapper {
  width: 100%;
  margin-bottom: 16px;
}

.input__label {
  display: block;
  margin-bottom: 4px;
  color: $gray-medium;
  font-size: 12px;
  line-height: 13px;
  font-weight: 500;
}

.input-container {
  position: relative;
  width: 100%;
}

.input {
  width: 100%;
  padding: 3px 0;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: $gray-dark;
  margin-bottom: 5px;
  border: none;
  border-bottom: 1px solid $gray-light;
  outline: none;
  transition: border-color 0.2s ease;
  background: transparent;

  &::placeholder {
    color: $gray-light;
    font-weight: 400;
    font-size: 16px;
  }

  caret-color: $accent-color;

  &:focus {
    border-bottom-color: $accent-color;
  }

  &:hover:not(:focus) {
    border-bottom-color: darken($gray-light, 10%);
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: $gray-dark;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset;
    transition: background-color 5000s ease-in-out 0s;
  }
}

.input__icon {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 13px;
  height: 22px;
  color: $gray-medium;
  pointer-events: none;

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
}
</style>

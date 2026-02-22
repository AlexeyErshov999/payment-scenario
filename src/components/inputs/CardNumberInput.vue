<template>
  <FormInput
    :name="name"
    :label="label"
    type="text"
    :placeholder="placeholder || '0000 0000 0000 0000'"
    :icon="icon"
    :error="error"
    :rules="cardNumberRules"
    :model-value="modelValue"
    :formatter="formatCardNumber"
    :parser="parseCardNumber"
    @update:model-value="$emit('update:modelValue', $event)"
    @input="$emit('input', $event)"
    v-bind="$attrs"
    class="card-number-input"
  />
</template>

<script setup lang="ts">
import { formatCardNumber, parseCardNumber } from '../../utils/format/cardNumber'
import { cardNumberRules } from '../../utils/validation/validationRules'
import FormInput from '../base/FormInput.vue'

interface ICardNumberInputProps {
  name: string
  label: string
  placeholder?: string
  icon?: string
  error?: string
  modelValue?: string | number
  required?: boolean
}

defineProps<ICardNumberInputProps>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'input', value: string): void
}>()
</script>

<style lang="scss" scoped>
.card-number-input {
  :deep(.input) {
    letter-spacing: 1px;
  }
}
</style>

<template>
  <FormInput
    :name="name"
    :label="label"
    type="text"
    inputmode="numeric"
    autocomplete="cc-exp"
    :placeholder="placeholder || 'MM / ГГ'"
    :icon="icon"
    :error="error"
    :rules="expireDateRules"
    :model-value="modelValue"
    :formatter="formatExpireDate"
    :parser="parseExpireDate"
    @update:model-value="$emit('update:modelValue', $event)"
    @input="$emit('input', $event)"
    v-bind="$attrs"
    class="expire-date-input"
  />
</template>

<script setup lang="ts">
import { formatExpireDate, parseExpireDate } from '../../utils/format/expireDate'
import { expireDateRules } from '../../utils/validation/validationRules'
import FormInput from '../base/FormInput.vue'

interface IExpireDateInputProps {
  name: string
  label: string
  placeholder?: string
  icon?: string
  error?: string
  modelValue?: string | number
  required?: boolean
}

defineProps<IExpireDateInputProps>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'input', value: string): void
}>()
</script>

<style lang="scss" scoped>
.expire-date-input {
  :deep(.input) {
    letter-spacing: 1px;
  }
}
</style>

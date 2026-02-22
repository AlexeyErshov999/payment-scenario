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

const validateExpireDate = (value: string): string | boolean => {
  const digits = parseExpireDate(value)

  if (!digits) {
    return 'Введите срок действия карты'
  }

  if (digits.length !== 4) {
    return 'Введите дату в формате ММ/ГГ'
  }

  const month = parseInt(digits.slice(0, 2), 10)
  if (month < 1 || month > 12) {
    return 'Некорректный месяц'
  }

  const year = parseInt(digits.slice(2), 10)
  const currentYear = new Date().getFullYear() % 100
  const currentMonth = new Date().getMonth() + 1

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return 'Срок действия карты истёк'
  }

  return true
}

const expireDateRules = [validateExpireDate]
</script>

<style lang="scss" scoped>
.expire-date-input {
  :deep(.input) {
    letter-spacing: 1px;
  }
}
</style>

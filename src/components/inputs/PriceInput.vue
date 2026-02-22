<template>
  <FormInput
    :name="name"
    :label="label"
    type="text"
    :placeholder="placeholder || '0'"
    :icon="icon"
    :error="error"
    :rules="priceRules"
    :model-value="modelValue"
    :formatter="formatPrice"
    :parser="parsePrice"
    @update:model-value="$emit('update:modelValue', $event)"
    @input="$emit('input', $event)"
    v-bind="$attrs"
    class="price-input"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import FormInput from '../base/FormInput.vue'
import { formatPrice, parsePrice } from '../../utils/format/price'

interface IPriceInputProps {
  name: string
  label: string
  placeholder?: string
  icon?: string
  error?: string
  modelValue?: string | number
  required?: boolean
  min?: number
  max?: number
  currency?: string
  showCurrency?: boolean
}

const props = withDefaults(defineProps<IPriceInputProps>(), {
  currency: '₽',
  showCurrency: true,
  min: 0,
  max: Infinity
})

defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'input', value: string): void
}>()

const validatePrice = (value: string): string | boolean => {
  if (!value) {
    return props.required ? 'Введите сумму' : true
  }
  const parsed = parsePrice(value)
  if (parsed && isNaN(Number(parsed))) {
    return 'Введите корректную сумму'
  }
  const number = Number(parsed)
  if (number < props.min) {
    return `Сумма должна быть не менее ${formatPrice(props.min.toString())}`
  }
  if (number > props.max) {
    return `Сумма должна быть не более ${formatPrice(props.max.toString())}`
  }
  return true
}

const validatePositive = (value: string): string | boolean => {
  if (!value) return true

  const number = Number(parsePrice(value))
  if (number < 0) {
    return 'Сумма не может быть отрицательной'
  }

  return true
}

const priceRules = computed(() => {
  const rules = [validatePrice, validatePositive]
  return rules
})
</script>

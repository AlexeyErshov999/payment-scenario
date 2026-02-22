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
import { createPriceRules } from '../../utils/validation/validationRules'

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
  max: Infinity,
  required: true,
})

defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'input', value: string): void
}>()

const priceRules = computed(() => createPriceRules(props.min, props.max, props.required))
</script>

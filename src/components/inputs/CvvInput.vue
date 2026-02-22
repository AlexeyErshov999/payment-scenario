<template>
  <FormInput
    :name="name"
    :label="label"
    type="text"
    inputmode="numeric"
    autocomplete="cc-csc"
    :placeholder="placeholder || '123'"
    :error="error"
    :rules="cvvRules"
    :model-value="modelValue"
    :formatter="formatCvv"
    :parser="parseCvv"
    maxlength="4"
    @update:model-value="$emit('update:modelValue', $event)"
    @input="$emit('input', $event)"
    v-bind="$attrs"
    class="cvv-input"
  >
    <template #labelSuffix>
      <HelpTooltip :text="tooltipText" />
    </template>
  </FormInput>
</template>

<script setup lang="ts">
import { formatCvv, parseCvv } from '../../utils/format/cvv'
import { cvvRules } from '../../utils/validation/validationRules'
import FormInput from '../base/FormInput.vue'
import HelpTooltip from '../base/HelpTooltip.vue'

interface ICvvInputProps {
  name: string
  label?: string
  placeholder?: string
  tooltipText?: string
  error?: string
  modelValue?: string | number
}

withDefaults(defineProps<ICvvInputProps>(), {
  label: 'CVV / CVC',
  tooltipText: 'Три цифры с обратной стороны карты',
})

defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'input', value: string): void
}>()
</script>

<style lang="scss" scoped>
.cvv-input {
  :deep(.input) {
    letter-spacing: 1px;
  }
}
</style>

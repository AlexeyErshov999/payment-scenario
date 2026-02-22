<template>
  <div class="input-wrapper">
    <label class="input__label" :class="{ 'input__label--error': localError }">{{ label }}</label>
    <div class="input-container" :class="{ 'has-icon': icon }">
      <textarea
        v-if="maxLines && maxLines > 1"
        class="input textarea"
        :class="{ 'input--error': localError }"
        v-model="inputValue"
        :placeholder="placeholder"
        :rows="maxLines"
        :style="{ paddingRight: icon ? '30px' : '12px' }"
        @input="autoResize"
        @blur="validateField"
        ref="textareaRef"
      ></textarea>

      <input
        v-else
        class="input"
        :class="{ 'input--error': localError }"
        :type="type"
        v-model="inputValue"
        :placeholder="placeholder"
        :style="{ paddingRight: icon ? '30px' : '12px' }"
        @input="handleInput"
        @blur="validateField"
        v-bind="$attrs"
      />

      <span v-if="icon" class="input__icon" :class="{ 'input__icon--error': localError }" v-html="icon"></span>
    </div>
    <ErrorMessage v-if="localError" :text="localError" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, computed, onUnmounted } from 'vue'
import ErrorMessage from './ErrorMessage.vue'
import { useValidationErrorsStore } from '../../stores/validationErrorsStore'

interface IBaseInputProps {
  name: string
  label: string
  type?: 'text' | 'email' | 'password' | 'tel' | 'number'
  placeholder?: string
  icon?: string
  error?: string
  maxLines?: number
  rules?: Array<(value: string) => string | boolean>
  modelValue?: string | number
  formatter?: (value: string) => string
  parser?: (value: string) => string
}

const props = withDefaults(defineProps<IBaseInputProps>(), {
  type: 'text',
  formatter: (value: string) => value,
  parser: (value: string) => value
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'input', value: string): void
}>()

const text = ref(props.modelValue?.toString() || '')
const textareaRef = ref<HTMLTextAreaElement | null>(null)

const validationStore = useValidationErrorsStore()

const localError = computed(() => {
  if (props.error) return props.error
  const fieldErrors = validationStore.allErrors[props.name]
  return fieldErrors && fieldErrors.length > 0 ? fieldErrors[0] : undefined
})

const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  const cursorPosition = input.selectionStart

  const rawValue = input.value
  const parsedValue = props.parser(rawValue)
  const formattedValue = props.formatter(parsedValue)

  if (formattedValue !== rawValue) {
    input.value = formattedValue

    if (cursorPosition !== null) {
      const diff = formattedValue.length - rawValue.length
      nextTick(() => {
        input.setSelectionRange(cursorPosition + diff, cursorPosition + diff)
      })
    }
  }

  text.value = parsedValue
  emit('update:modelValue', parsedValue)
  emit('input', parsedValue)

  if ((validationStore.allErrors[props.name] || []).length > 0) {
    validationStore.clearFieldErrors(props.name)
  }
}

const inputValue = computed({
  get: () => props.formatter(text.value),
  set: (value) => {
    const parsed = props.parser(value)
    text.value = parsed
    emit('update:modelValue', parsed)
    emit('input', parsed)

    if ((validationStore.allErrors[props.name] || []).length > 0) {
      validationStore.clearFieldErrors(props.name)
    }
  }
})

const validateField = () => {
  validationStore.clearFieldErrors(props.name)

  if (props.rules && props.rules.length > 0) {
    for (const rule of props.rules) {
      const result = rule(text.value)
      if (typeof result === 'string') {
        validationStore.addError(props.name, result)
        return
      }
    }
  }
}

const autoResize = () => {
  if (textareaRef.value && props.maxLines && props.maxLines > 1) {
    const textarea = textareaRef.value

    textarea.style.height = 'auto'

    const lineHeight = 22
    const padding = 6
    const maxHeight = (props.maxLines * lineHeight) + padding

    const scrollHeight = textarea.scrollHeight
    textarea.style.height = Math.min(scrollHeight, maxHeight) + 'px'

    if (scrollHeight > maxHeight) {
      textarea.style.overflowY = 'auto'
    } else {
      textarea.style.overflowY = 'hidden'
    }
  }
}

watch(() => props.modelValue, (newVal) => {
  if (newVal !== undefined) {
    text.value = newVal.toString()
  }
})

watch(text, () => {
  if (props.maxLines && props.maxLines > 1) {
    nextTick(() => {
      autoResize()
    })
  }
})

watch(() => props.maxLines, () => {
  if (props.maxLines && props.maxLines > 1 && textareaRef.value) {
    nextTick(() => {
      autoResize()
    })
  }
}, { immediate: true })

onUnmounted(() => {
  validationStore.clearFieldErrors(props.name)
})
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
  font-weight: 400;

  &--error {
    color: $error
  }
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
  border: none;
  border-bottom: 1px solid $gray-light;
  margin-bottom: 4px;
  outline: none;
  transition: border-color 0.2s ease;
  background: transparent;
  resize: none;

  &::placeholder {
    color: $gray-light;
    font-weight: 400;
    font-size: 16px;
    font-family: inherit;
  }

  caret-color: $accent-color;

  &:focus {
    border-bottom-color: $accent-color;
  }

  &:hover:not(:focus) {
    border-bottom-color: darken($gray-light, 10%);
  }

  &--error {
    color: $error;
    border-bottom-color: $error !important;

    &:focus {
      border-bottom-color: $error;
    }
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: $gray-dark;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset;
    transition: background-color 5000s ease-in-out 0s;
  }
}

/* Специальные стили для textarea */
.textarea {
  min-height: 28px;
  overflow-y: hidden;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: inherit;

  &[rows="2"] {
    max-height: 50px;
  }

  &[rows="3"] {
    max-height: 72px;
  }

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: $gray-light;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: $gray-medium;
    border-radius: 2px;

    &:hover {
      background: $gray-dark;
    }
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

  &--error {
    color: $error;
  }
}

.textarea + .input__icon {
  top: 15px;
}
</style>

<template>
  <div class="input-wrapper">
    <label class="input__label">{{ label }}</label>
    <div class="input-container" :class="{ 'has-icon': icon }">
      <!-- Используем textarea для многострочного ввода -->
      <textarea
        v-if="maxLines && maxLines > 1"
        class="input textarea"
        v-model="text"
        :placeholder="placeholder"
        :rows="maxLines"
        :style="{ paddingRight: icon ? '30px' : '12px' }"
        @input="autoResize"
        ref="textareaRef"
      ></textarea>

      <!-- Обычный input для одной строки -->
      <input
        v-else
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
import { ref, watch, nextTick } from 'vue'
import ErrorMessage from './ErrorMessage.vue'

interface IFormInputProps {
  label: string
  type?: 'text' | 'email' | 'password' | 'tel' | 'number'
  placeholder?: string
  icon?: string
  error?: string
  maxLines?: number // 1, 2 или 3 строки максимум
}

const props = defineProps<IFormInputProps>()

const text = ref('')
const textareaRef = ref<HTMLTextAreaElement | null>(null)

// Функция для авто-изменения высоты textarea
const autoResize = () => {
  if (textareaRef.value && props.maxLines && props.maxLines > 1) {
    const textarea = textareaRef.value

    // Сбрасываем высоту для правильного расчета
    textarea.style.height = 'auto'

    // Вычисляем высоту одной строки
    const lineHeight = 22 // из line-height: 22px
    const padding = 6 // верхний и нижний padding (3px сверху + 3px снизу)

    // Максимальная высота = (количество строк * line-height) + padding
    const maxHeight = (props.maxLines * lineHeight) + padding

    // Устанавливаем высоту, но не больше максимальной
    const scrollHeight = textarea.scrollHeight
    textarea.style.height = Math.min(scrollHeight, maxHeight) + 'px'

    // Если контент превышает максимальную высоту, включаем скролл
    if (scrollHeight > maxHeight) {
      textarea.style.overflowY = 'auto'
    } else {
      textarea.style.overflowY = 'hidden'
    }
  }
}

// Следим за изменением текста для авто-подстройки высоты
watch(text, () => {
  if (props.maxLines && props.maxLines > 1) {
    nextTick(() => {
      autoResize()
    })
  }
})

// Устанавливаем начальную высоту при монтировании
watch(() => props.maxLines, () => {
  if (props.maxLines && props.maxLines > 1 && textareaRef.value) {
    nextTick(() => {
      autoResize()
    })
  }
}, { immediate: true })
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
  border: none;
  border-bottom: 1px solid $gray-light;
  outline: none;
  transition: border-color 0.2s ease;
  background: transparent;
  resize: none; /* Запрещаем ручное изменение размера */

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

/* Специальные стили для textarea */
.textarea {
  min-height: 28px; /* 1 строка + padding */
  overflow-y: hidden;
  white-space: pre-wrap;
  word-wrap: break-word;

  /* Для 2 строк */
  &[rows="2"] {
    max-height: 50px; /* 2 строки * 22px + 6px padding */
  }

  /* Для 3 строк */
  &[rows="3"] {
    max-height: 72px; /* 3 строки * 22px + 6px padding */
  }

  /* Стили для скролла, если текст превышает лимит */
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
}

/* Для textarea корректируем позицию иконки */
.textarea + .input__icon {
  top: 15px; /* Примерная позиция для многострочного ввода */
}
</style>

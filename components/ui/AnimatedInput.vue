<template>
  <div class="w-full" v-bind="$attrs">
    <!-- Label -->
    <label 
      v-if="label"
      :for="inputId"
      class="block text-sm font-bold text-gray-700 mb-2 ml-1"
    >
      {{ label }}
    </label>

    <div class="relative group">
      <!-- Input / Textarea -->
      <textarea
        v-if="type === 'textarea'"
        :id="inputId"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :rows="rows"
        class="w-full py-4 px-5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-sm resize-none font-medium placeholder:text-gray-300"
        :class="[
          disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : '',
          (hasError || (errorMessage && showError)) ? 'border-red-400 ring-1 ring-red-400' : ''
        ]"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      
      <div v-else class="relative">
        <input
          :id="inputId"
          ref="inputRef"
          :type="computedType" 
          :value="modelValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly || isPickerType"
          :autocomplete="autocomplete"
          class="w-full py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-sm font-medium placeholder:text-gray-300"
          :class="[
            type === 'password' ? 'pl-5 pr-12' : 'px-5',
            disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : '',
            isPickerType ? 'cursor-pointer pr-12' : '',
            (hasError || (errorMessage && showError)) ? 'border-red-400 ring-1 ring-red-400' : ''
          ]"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @click="handleInputClick"
        />

        <!-- Password Toggle -->
        <button 
          v-if="type === 'password'"
          type="button" 
          @click="togglePasswordVisibility" 
          class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors p-1"
        >
          <Eye v-if="!showPassword" class="w-4 h-4" />
          <EyeOff v-else class="w-4 h-4" />
        </button>

        <!-- Picker Icons -->
        <div v-if="isPickerType" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Calendar v-if="type === 'date'" class="w-4 h-4" />
          <Clock v-if="type === 'time'" class="w-4 h-4" />
          <Calendar v-if="type === 'datetime-local'" class="w-4 h-4" />
        </div>
      </div>
    </div>
    
    <!-- Error Message -->
    <Transition name="slide-fade">
      <div v-if="errorMessage && showError" class="mt-2 flex items-center text-red-500 text-sm font-black  gap-1.5 ml-1">
        <AlertCircle class="w-3.5 h-3.5" />
        {{ errorMessage }}
      </div>
    </Transition>

    <!-- Date Picker Overlay (Simplified for Student App) -->
    <!-- Custom Date/Time implementations can be added here if needed, 
         for now we use native inputs but styled professionally -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed, useId } from 'vue'
import { Eye, EyeOff, Calendar, Clock, AlertCircle } from 'lucide-vue-next'

defineOptions({
  inheritAttrs: false
})

interface Props {
  modelValue?: string | number
  label?: string
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search' | 'number' | 'date' | 'time' | 'datetime-local' | 'textarea'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  autocomplete?: string
  errorMessage?: string
  showError?: boolean
  hasError?: boolean
  rows?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  type: 'text',
  placeholder: '',
  disabled: false,
  readonly: false,
  autocomplete: 'off',
  errorMessage: '',
  showError: true,
  hasError: false,
  rows: 4
})

const emit = defineEmits(['update:modelValue', 'input', 'focus', 'blur'])

const isFocused = ref(false)
const showPassword = ref(false)
const inputId = useId()
const inputRef = ref<HTMLInputElement | null>(null)

const computedType = computed(() => {
  if (props.type === 'password') return showPassword.value ? 'text' : 'password'
  return props.type
})

const isPickerType = computed(() => ['date', 'time', 'datetime-local'].includes(props.type || ''))

const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  emit('update:modelValue', value)
  emit('input', e)
}

const handleFocus = (e: FocusEvent) => {
  isFocused.value = true
  emit('focus', e)
}

const handleBlur = (e: FocusEvent) => {
  isFocused.value = false
  emit('blur', e)
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleInputClick = () => {
  if (isPickerType.value && inputRef.value) {
    (inputRef.value as any).showPicker?.()
  }
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.1s ease-in;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-4px);
  opacity: 0;
}
</style>
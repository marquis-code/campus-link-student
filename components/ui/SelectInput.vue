<template>
  <div class="w-full">
    <div class="relative" ref="containerRef">
      <!-- Label -->
      <label
        v-if="label"
        :for="inputId"
        class="block text-sm font-bold text-gray-700 mb-2 ml-1"
      >
        {{ label }}
      </label>

      <!-- Select trigger -->
      <div
        @click="toggleDropdown"
        :class="[
          'w-full py-4 px-5 bg-white border rounded-2xl flex justify-between items-center cursor-pointer transition-all text-sm font-medium',
          disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'hover:border-gray-300',
          showDropdown ? 'border-black ring-1 ring-black' : 'border-gray-200',
          (hasError || (errorMessage && showError)) ? 'border-red-400 ring-1 ring-red-400' : ''
        ]"
      >
        <span :class="selectedLabel ? 'text-gray-900' : 'text-gray-400'">
          <slot 
            v-if="slots['selected-label'] && selectedOption" 
            name="selected-label" 
            :option="selectedOption"
          />
          <template v-else>
            {{ selectedLabel || placeholder }}
          </template>
        </span>
        <ChevronDown
          class="w-4 h-4 text-gray-400 transition-transform duration-300"
          :class="{ 'rotate-180': showDropdown }"
        />
      </div>

      <!-- Dropdown -->
      <Transition name="dropdown">
        <div
          v-if="showDropdown"
          class="absolute z-50 mt-2 w-full bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-2xl"
        >
          <!-- Search -->
          <div class="p-3 border-b border-gray-50">
            <div class="relative">
              <Search 
                class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" 
              />
              <input
                ref="searchInputRef"
                v-model="searchQuery"
                type="text"
                placeholder="Search options..."
                class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl outline-none text-sm text-gray-900 focus:bg-white focus:border-gray-200 transition-all placeholder:text-gray-400 font-medium"
                @click.stop
              />
            </div>
          </div>
          
          <!-- Options -->
          <div class="max-h-60 overflow-y-auto overscroll-contain no-scrollbar">
            <div
              v-for="(option, index) in filteredOptions"
              :key="index"
              @click="selectOption(option)"
              class="px-5 py-4 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors flex items-center justify-between group border-b border-gray-50 last:border-0"
            >
              <div class="flex-1 font-medium">
                <slot v-if="slots.default" :option="option" :index="index" />
                <template v-else>
                  {{ getLabel(option) }}
                </template>
              </div>
              <div v-if="getValue(option) === modelValue" class="text-black">
                <Check class="w-4 h-4 stroke-[3]" />
              </div>
            </div>
            
            <div 
              v-if="filteredOptions.length === 0" 
              class="p-10 text-center text-sm text-gray-400 font-bold"
            >
              No results for "{{ searchQuery }}"
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Error -->
    <Transition name="fade">
      <div v-if="errorMessage && showError" class="mt-2 flex items-center text-red-500 text-[10px] font-black uppercase tracking-wider gap-1.5 ml-1">
        <AlertCircle class="w-3.5 h-3.5" />
        {{ errorMessage }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, useId, onMounted, onUnmounted, nextTick } from 'vue'
import { ChevronDown, Search, Check, AlertCircle } from 'lucide-vue-next'

interface Props {
  modelValue?: string | number
  label?: string
  options?: Array<string | { label?: string, value?: string, name?: string, code?: string, [key: string]: any }>
  placeholder?: string
  disabled?: boolean
  errorMessage?: string
  showError?: boolean
  hasError?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  options: () => [],
  placeholder: 'Select option',
  disabled: false,
  errorMessage: '',
  showError: true,
  hasError: false,
})

const slots = defineSlots<{
  default?: (props: { option: any, index: number }) => any
  'selected-label'?: (props: { option: any }) => any
}>()

const emit = defineEmits(['update:modelValue'])

const showDropdown = ref(false)
const containerRef = ref<HTMLElement | null>(null)
const searchInputRef = ref<HTMLInputElement | null>(null)
const searchQuery = ref('')
const inputId = useId()

const toggleDropdown = async () => {
  if (!props.disabled) {
    showDropdown.value = !showDropdown.value
    if (showDropdown.value) {
      await nextTick()
      searchInputRef.value?.focus()
    } else {
      searchQuery.value = ''
    }
  }
}

const selectOption = (option: any) => {
  let val = getValue(option)
  emit('update:modelValue', val)
  showDropdown.value = false
  searchQuery.value = ''
}

const getLabel = (option: any): string => {
  if (typeof option === 'string') return option
  return option.label || option.name || option.value || option.code || String(option)
}

const getValue = (option: any): string | number => {
  if (typeof option === 'string') return option
  return option.value ?? option.code ?? option.name ?? option
}

const selectedLabel = computed(() => {
  const found = props.options.find((opt) => getValue(opt) === props.modelValue)
  return found ? getLabel(found) : ''
})

const selectedOption = computed(() => {
  return props.options.find((opt) => getValue(opt) === props.modelValue)
})

const filteredOptions = computed(() => {
  if (!searchQuery.value.trim()) return props.options
  const query = searchQuery.value.toLowerCase()
  return props.options.filter((option) => {
    const label = getLabel(option).toLowerCase()
    return label.includes(query)
  })
})

const handleClickOutside = (event: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    showDropdown.value = false
    searchQuery.value = ''
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.dropdown-enter-active, .dropdown-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.dropdown-enter-from, .dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
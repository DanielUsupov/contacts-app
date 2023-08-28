<script setup lang="ts">
import { ref } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { debounce } from '../utils/debounce'

withDefaults(defineProps<{
  placeholder?: string
}>(), {
  placeholder: 'Search...',
})
const emit = defineEmits<{
  (event: 'search', value: string): void
}>()

const searchQuery = ref('')
// Debounce the input handler using a delay of 300 milliseconds
const debouncedSearch = debounce(() => {
  // Emit the search query to the parent component
  emit('search', searchQuery.value)
}, 300)

// Handle input changes
function handleInput() {
  debouncedSearch()
}

// Clear the search query
function clearSearch() {
  searchQuery.value = ''
  emit('search', '')
}
</script>

<template>
  <div class="relative">
    <input
      v-model="searchQuery"
      class="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      :placeholder="placeholder"
      @input="handleInput"
    >
    <button
      v-if="searchQuery"
      class="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
      @click="clearSearch"
    >
      <XMarkIcon class="h-6 w-6" aria-hidden="true" />
    </button>
  </div>
</template>

<style scoped>
/* You can customize the styling using Tailwind CSS classes */
</style>

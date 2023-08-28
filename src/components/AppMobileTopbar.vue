<script setup lang="ts">
import { Bars3Icon } from '@heroicons/vue/24/outline'

interface Props {
  isSidebarOpen: boolean
}
defineProps<Props>()
const emit = defineEmits(['openSidebar'])
</script>

<template>
  <div class="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
    <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="emit('openSidebar')">
      <span class="sr-only">Open sidebar</span>
      <Bars3Icon class="h-6 w-6" aria-hidden="true" />
    </button>
    <div class="flex-1 font-semibold leading-6 text-gray-900">
      <slot>Dashboard</slot>
    </div>
    <slot name="actions" />
  </div>
</template>

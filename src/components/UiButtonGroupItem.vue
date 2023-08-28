<script setup lang="ts">
interface Props {
  isFirst?: boolean
  isLast?: boolean
  selected?: boolean
}
defineProps<Props>()
</script>

<template>
  <button
    type="button"
    class="relative inline-flex items-center gap-x-1.5 px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10"
    :class="[{ 'rounded-l-md': isFirst, 'rounded-r-md': isLast, '-ml-px': !isFirst }, selected ? 'bg-indigo-600 text-white' : 'bg-white text-gray-900 hover:bg-gray-50']"
  >
    <slot />
  </button>
</template>

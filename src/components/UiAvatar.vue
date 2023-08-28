<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ name: string }>()

const initials = computed(() => `${props.name.split(' ')[0].slice(0, 1)}${props.name.split(' ')[1].slice(0, 1)}`)
</script>

<template>
  <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
    <span class="text-sm font-medium leading-none text-white">{{ initials }}</span>
  </span>
</template>

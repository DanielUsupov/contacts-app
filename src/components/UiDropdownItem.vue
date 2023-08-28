<script setup lang="ts">
import { MenuItem } from '@headlessui/vue'
</script>

<template>
  <MenuItem v-slot="{ active }">
    <slot
      :active="active" :item-class="[
        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
        'group flex items-center w-full px-4 py-2 text-sm',
      ]"
    />
  </MenuItem>
</template>

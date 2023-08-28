<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div>
    <div class="flex flex-wrap items-center gap-6 sm:flex-nowrap mb-5">
      <h1 class="text-xl font-semibold leading-7 text-gray-900">
        {{ title }}
      </h1>

      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/20/solid'
import type { Contact } from '../types/contacts'
import { phoneFormat } from '../utils/phoneFormat'
import UiAvatar from './UiAvatar.vue'
import UiBadge from './UiBadge.vue'

interface Props {
  contact: Contact
}
defineProps<Props>()
</script>

<template>
  <div class="flex items-center min-w-0 gap-x-4">
    <UiAvatar :name="contact.name" />
    <div class="min-w-0 flex-auto">
      <p class="text-sm font-semibold leading-6 text-gray-900">
        {{ contact.name }}
      </p>
      <p class="mt-1 flex sm:hidden text-xs leading-5 text-gray-500">
        <a :href="`tel:+${contact.phone}`" class="relative truncate hover:underline">{{ phoneFormat(contact.phone) }}</a>
      </p>
      <p class="flex sm:hidden text-xs leading-5 text-gray-500">
        <a :href="`mailto:${contact.email}`" class="relative truncate hover:underline">{{ contact.email }}</a>
      </p>
      <p class="flex space-x-2 mt-1 text-xs leading-5 text-gray-500">
        <UiBadge v-for="tag in contact.tags" :key="tag">
          {{ tag }}
        </UiBadge>
      </p>
    </div>
  </div>
  <div class="flex shrink-0 items-center gap-x-4">
    <div class="hidden sm:flex sm:flex-col sm:items-end">
      <p class="text-sm leading-6 text-gray-900">
        <a :href="`tel:+${contact.phone}`" class="relative truncate hover:underline">{{ phoneFormat(contact.phone) }}</a>
      </p>
      <p class="mt-1 text-xs leading-5 text-gray-500">
        <a :href="`mailto:${contact.email}`" class="relative truncate hover:underline">{{ contact.email }}</a>
      </p>
    </div>
    <router-link :to="`/contacts/${contact.id}`">
      <ChevronRightIcon class="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
    </router-link>
  </div>
</template>

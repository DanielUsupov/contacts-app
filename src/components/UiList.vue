<script setup lang="ts" generic="T extends object">
import { computed, ref } from 'vue'
import UiPagination from './Ui.Pagination.vue'

interface Props {
  items: T[]
  itemsCount: number
  itemKey?: string
  itemClass?: string
  noDataText?: string
}
const props = withDefaults(defineProps<Props>(), {
  itemKey: 'id',
  itemClass: '',
  noDataText: 'No data existed',
})

const page = ref(1)
const OFFSET = 5
const itemsByPage = computed(() => props.items.slice((page.value - 1) * OFFSET, (page.value - 1) * OFFSET + OFFSET))

function getItemKey(item: T, index: number) {
  return props.itemKey in item ? (item as Record<string, any>)[props.itemKey] as string : index
}
</script>

<template>
  <ul role="list" class="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
    <li v-for="(item, index) in itemsByPage" :key="getItemKey(item, index)" :class="itemClass">
      <slot name="item" :item="item" />
    </li>
    <li v-if="!items.length" :class="itemClass">
      <span class="w-full text-center text-sm text-gray-500">{{ noDataText }}</span>
    </li>
    <!-- <li v-for="contact in contacts" :key="contact.email" class="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">

    </li> -->
  </ul>
  <UiPagination v-if="items.length" v-model="page" :items-count="itemsCount" :offset="OFFSET" />
</template>

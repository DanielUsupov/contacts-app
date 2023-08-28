<script setup lang="ts">
import range from 'lodash.range'
import { computed } from 'vue'

interface Props {
  modelValue: number
  offset?: number
  itemsCount?: number
  totalVisible?: number
}
const props = withDefaults(defineProps<Props>(), {
  offset: 5,
  itemsCount: 1,
  totalVisible: 3,
})
const emit = defineEmits(['update:modelValue'])

const length = computed(() => Math.ceil(props.itemsCount / props.offset))
const sections = computed(() => Math.ceil(length.value / props.totalVisible))
const section = computed(() => Math.ceil(props.modelValue / props.totalVisible))
const lastPage = computed(() => {
  const last = (section.value - 1) * props.totalVisible + props.totalVisible
  return section.value === sections.value ? length.value : last
})
const pages = computed(() =>
  range((section.value - 1) * props.totalVisible + 1, lastPage.value + 1),
)

function getFirstPageOfSection(sectionNumber: number) {
  return (sectionNumber - 1) * props.totalVisible + 1
}

function getLastPageOfSection(sectionNumber: number) {
  return getFirstPageOfSection(sectionNumber) + props.totalVisible - 1
}

function goForwardSection() {
  emit('update:modelValue', getFirstPageOfSection(section.value + 1))
}

function goBackwardSection() {
  emit('update:modelValue', getLastPageOfSection(section.value - 1))
}
</script>

<template>
  <div class="flex items-center justify-between py-6">
    <div>
      <p class="text-sm text-gray-700">
        Showing
        <span class="font-medium text-gray-800">{{ (modelValue - 1) * offset + 1 }}</span>
        to
        <span class="font-medium text-gray-800">{{
          modelValue * offset > itemsCount ? itemsCount : modelValue * offset
        }}</span>
        of
        <span class="font-medium text-gray-800">{{ itemsCount }}</span>
        results
      </p>
    </div>
    <div class="text-right">
      <nav
        class="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
        aria-label="Pagination"
      >
        <button
          type="button"
          class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
          :disabled="Number(modelValue) === 1"
          @click="emit('update:modelValue', +modelValue - 1)"
        >
          <span class="sr-only">Previous</span>

          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <template v-if="section > 1">
          <button
            type="button"
            aria-current="page"
            class="relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20"
            :class="
              Number(modelValue) === 1
                ? 'z-10 border-blue-500 bg-blue-50 text-blue-600'
                : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
            "
            @click="emit('update:modelValue', 1)"
          >
            1
          </button>
          <button
            type="button"
            class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            @click="goBackwardSection"
          >
            ...
          </button>
        </template>

        <button
          v-for="page in pages"
          :key="page"
          type="button"
          aria-current="page"
          class="relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20"
          :class="
            page === Number(modelValue)
              ? 'z-10 border-blue-500 bg-blue-50 text-blue-600'
              : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
          "
          @click="emit('update:modelValue', page)"
        >
          {{ page }}
        </button>
        <template v-if="section < sections">
          <button
            type="button"
            class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            @click="goForwardSection"
          >
            ...
          </button>
          <button
            type="button"
            aria-current="page"
            class="relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20"
            :class="
              Number(modelValue) === length
                ? 'z-10 border-blue-500 bg-blue-50 text-blue-600'
                : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
            "
            @click="emit('update:modelValue', length)"
          >
            {{ length }}
          </button>
        </template>

        <button
          type="button"
          class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
          :disabled="Number(modelValue) >= length"
          @click="emit('update:modelValue', +modelValue + 1)"
        >
          <span class="sr-only">Next</span>

          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </nav>
    </div>
  </div>
</template>

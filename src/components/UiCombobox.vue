<script setup lang="ts" generic="T">
import { computed, ref } from 'vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue'

export type ComboboxFilterFunction<U> = (items: U[], searchQuery: string) => U[]

interface Props {
  modelValue: object | string | null
  label: string
  items: T[]
  itemKey: keyof T
  valueKey?: keyof T
  textKey: keyof T
  filterFunction?: ComboboxFilterFunction<T>
}

const props = withDefaults(defineProps<Props>(), {
  filterFunction: (items: T[]) => items,
})
const emit = defineEmits(['update:modelValue'])

const searchQuery = ref('')

const filteredItems = computed(() => {
  const filtered = props.filterFunction(props.items, searchQuery.value)
  return filtered
})

function getItemKey(item: T, index: number) {
  return props.itemKey ? item[props.itemKey] as string : index
}

function getItemValue(item: T) {
  return props.valueKey ? item[props.valueKey] as string : item as object
}

function displayValue(item: unknown) {
  return item ? (item as T)[props.textKey] as string : ''
}
</script>

<template>
  <Combobox :model-value="modelValue" as="div" @update:model-value="value => emit('update:modelValue', value)">
    <ComboboxLabel class="block text-sm font-medium leading-6 text-gray-900">
      {{ label }}
    </ComboboxLabel>
    <div class="relative mt-2">
      <ComboboxInput
        class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        :display-value="displayValue"
        @change="searchQuery = $event.target.value"
      />
      <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </ComboboxButton>

      <ComboboxOptions v-if="filteredItems.length > 0" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
        <ComboboxOption v-for="(item, index) in filteredItems" :key="getItemKey(item, index)" v-slot="{ active, selected }" :value="getItemValue(item)" as="template">
          <li class="relative cursor-default select-none py-2 pl-8 pr-4" :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900']">
            <span class="block truncate" :class="[selected && 'font-semibold']">
              {{ displayValue(item) }}
            </span>

            <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-1.5" :class="[active ? 'text-white' : 'text-indigo-600']">
              <CheckIcon class="h-5 w-5" aria-hidden="true" />
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>

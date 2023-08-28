<script setup lang="ts">
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import HighOrderFloat from './HighOrderFloat'

interface Props {
  text: string
}
defineProps<Props>()
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <HighOrderFloat placement="bottom-end">
      <slot name="open-button">
        <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {{ text }}
          <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </MenuButton>
      </slot>

      <MenuItems class="z-10 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div class="py-1">
          <slot />
        </div>
      </MenuItems>
    </HighOrderFloat>
  </Menu>
</template>

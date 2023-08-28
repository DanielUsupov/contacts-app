<script setup lang="ts">
import { ListBulletIcon, Squares2X2Icon } from '@heroicons/vue/24/outline'
import { computed, ref } from 'vue'
import { UserPlusIcon } from '@heroicons/vue/20/solid'
import UiButtonGroup from '../components/UiButtonGroup.vue'
import UiButtonGroupItem from '../components/UiButtonGroupItem.vue'
import UiDropdown from '../components/UiDropdown.vue'
import UiDropdownItem from '../components/UiDropdownItem.vue'
import UiList from '../components/UiList.vue'
import ContactsListItem from '../components/ContactsListItem.vue'
import type { Contact } from '../types/contacts'
import { type ComboboxFilterFunction } from '../components/UiCombobox.vue'
import UiSearchInput from '../components/UiSearchInput.vue'
import AppPageHeader from '../components/AppPageHeader.vue'
import DefaultLayout from '../layouts/default.vue'
import { useContactStore } from '../store/contacts'

const listStyle = ref<'column' | 'grid'>('column')

const searchQuery = ref('')
const contactStore = useContactStore()

const filterFunction: ComboboxFilterFunction<Contact> = (contacts, searchQuery: string) => {
  const query = searchQuery.toLowerCase()
  return query === ''
    ? contacts
    : contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(query)
    || contact.phone.includes(query)
    || contact.email.toLowerCase().includes(query)
    || contact.tags.some(tag => tag.toLowerCase().includes(query)),
    )
}

const filteredContacts = computed(() => filterFunction(contactStore.contacts, searchQuery.value))
function onSearch(value: string) {
  searchQuery.value = value
}
</script>

<template>
  <DefaultLayout>
    <template #topbar-actions>
      <router-link to="/contacts/new" class="ml-auto flex items-center gap-x-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        <UserPlusIcon class="-ml-1.5 h-5 w-5" aria-hidden="true" />
        New contact
      </router-link>
    </template>
    <main class="h-full py-5 lg:pl-72">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="mt-2">
          <AppPageHeader title="Contacts" class="hidden lg:block">
            <template #actions>
              <router-link to="/contacts/new" class="ml-auto flex items-center gap-x-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <UserPlusIcon class="-ml-1.5 h-5 w-5" aria-hidden="true" />
                New contact
              </router-link>
            </template>
          </AppPageHeader>
          <div class="min-w-0 flex-1">
            <div class="flex">
              <UiSearchInput class="flex-1" placeholder="Search contacts" @search="onSearch" />
            </div>
          </div>
          <div class="mt-4 flex justify-between flex-shrink-0">
            <UiDropdown text="Sort by">
              <UiDropdownItem v-slot="{ itemClass }">
                <button type="button" :class="itemClass">
                  Name
                </button>
              </UiDropdownItem>
              <UiDropdownItem v-slot="{ itemClass }">
                <button type="button" :class="itemClass">
                  Phone
                </button>
              </UiDropdownItem>
              <UiDropdownItem v-slot="{ itemClass }">
                <button type="button" :class="itemClass">
                  Email
                </button>
              </UiDropdownItem>
            </UiDropdown>
            <UiButtonGroup>
              <UiButtonGroupItem is-first :selected="listStyle === 'column'" @click="listStyle = 'column'">
                <ListBulletIcon class="h-5 w-5" aria-hidden="true" />
              </UiButtonGroupItem>
              <UiButtonGroupItem is-last :selected="listStyle === 'grid'" @click="listStyle = 'grid'">
                <Squares2X2Icon class="h-5 w-5" aria-hidden="true" />
              </UiButtonGroupItem>
            </UiButtonGroup>
          </div>

          <div class="mt-4">
            <UiList :items="filteredContacts" :items-count="filteredContacts.length" item-key="name" item-class="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
              <template #item="{ item: contact }">
                <ContactsListItem :contact="contact" />
              </template>
            </UiList>
          </div>
        </div>
      </div>
    </main>
  </DefaultLayout>
</template>

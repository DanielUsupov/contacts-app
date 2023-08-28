<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { ArrowLeftIcon, ChevronLeftIcon, PencilIcon } from '@heroicons/vue/20/solid'
import { XCircleIcon } from '@heroicons/vue/24/outline'
import DefaultLayout from '../layouts/default.vue'
import { useContactStore } from '../store/contacts'
import AppPageHeader from '../components/AppPageHeader.vue'
import { phoneFormat } from '../utils/phoneFormat'
import UiBadge from '../components/UiBadge.vue'
import ContactInfoForm from '../components/ContactInfoForm.vue'
import type { ContactPayload } from '../types/contacts'

const contactStore = useContactStore()
const route = useRoute()
const router = useRouter()
const contact = computed(() => contactStore.contacts.find(contact => contact.id === +route.params.id))
const editing = ref(false)

function editContact(payload: ContactPayload) {
  contactStore.editContact({ ...payload, id: contact.value!.id })
  editing.value = false
}

function deleteContact() {
  contactStore.deleteContact(contact.value!.id)
  router.push('/contacts')
}
</script>

<template>
  <DefaultLayout>
    <template #topbar-title>
      {{ contact?.name ?? route.name }}
    </template>
    <template v-if="contact" #topbar-actions>
      <button type="button" class="ml-auto flex items-center gap-x-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click="editing = true">
        <PencilIcon class="-ml-1.5 h-4 w-4" aria-hidden="true" />
        Edit contact
      </button>
    </template>
    <main class="h-full py-5 lg:pl-72">
      <div class="px-4 sm:px-6 lg:px-8">
        <div v-if="contact" class="mt-2">
          <AppPageHeader :title="contact.name" class="hidden lg:block">
            <template #actions>
              <button v-if="!editing" type="button" class="ml-auto flex items-center gap-x-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click="editing = true">
                <PencilIcon class="-ml-1.5 h-4 w-4" aria-hidden="true" />
                Edit contact
              </button>
            </template>
          </AppPageHeader>
          <nav class="sm:hidden" aria-label="Back">
            <router-link to="/contacts" class="mb-4 flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
              <ChevronLeftIcon class="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              Back
            </router-link>
          </nav>
          <div class="p-4 rounded bg-white shadow sm:p-6">
            <h2 class="text-base font-semibold leading-7 text-gray-900">
              Contact Information
            </h2>
            <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
              Use tags to separate them later.
            </p>

            <ContactInfoForm v-if="editing" :contact="contact" @cancel="editing = false" @submit="editContact" />
            <div v-else class="mt-6 border-t border-gray-100">
              <dl class="divide-y divide-gray-100">
                <div class="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt class="text-sm font-medium leading-6 text-gray-900">
                    Full name
                  </dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {{ contact.name }}
                  </dd>
                </div>
                <div class="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt class="text-sm font-medium leading-6 text-gray-900">
                    Phone number
                  </dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {{ phoneFormat(contact.phone) }}
                  </dd>
                </div>
                <div class="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt class="text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {{ contact.email }}
                  </dd>
                </div>
                <div class="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt class="text-sm font-medium leading-6 text-gray-900">
                    Tags
                  </dt>
                  <dd class="flex space-x-2 mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <UiBadge v-for="tag in contact.tags" :key="tag">
                      {{ tag }}
                    </UiBadge>
                    <span v-if="!contact.tags.length">No tags</span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div class="mt-10 bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-base font-semibold leading-6 text-gray-900">
                Delete contact
              </h3>
              <div class="mt-2 sm:flex sm:items-start sm:justify-between">
                <div class="max-w-xl text-sm text-gray-500">
                  <p>The contact will be deleted forever. You can't revert this action</p>
                </div>
                <div class="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center">
                  <button type="button" class="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500" @click="deleteContact">
                    Delete contact
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center">
          <XCircleIcon class="mx-auto h-16 w-16 text-gray-400" aria-hidden="true" />
          <!-- <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg> -->
          <h3 class="mt-2 text-sm font-semibold text-gray-900">
            No contact found
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            Go back to contacts list
          </p>
          <div class="mt-6">
            <router-link to="/contacts" class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <ArrowLeftIcon class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              Contacts list
            </router-link>
          </div>
        </div>
      </div>
    </main>
  </DefaultLayout>
</template>

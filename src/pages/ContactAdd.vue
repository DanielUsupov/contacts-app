<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import DefaultLayout from '../layouts/default.vue'
import { useContactStore } from '../store/contacts'
import AppPageHeader from '../components/AppPageHeader.vue'
import ContactInfoForm from '../components/ContactInfoForm.vue'
import type { ContactPayload } from '../types/contacts'

const contactStore = useContactStore()
const route = useRoute()
const router = useRouter()
const editing = ref(false)

function addContact(payload: ContactPayload) {
  contactStore.addContact(payload)
  router.push('/contacts')
}
</script>

<template>
  <DefaultLayout>
    <template #topbar-title>
      {{ route.name }}
    </template>
    <main class="h-full py-5 lg:pl-72">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="mt-2">
          <AppPageHeader :title="route.name as string" class="hidden lg:block" />
          <div class="p-4 rounded bg-white shadow sm:p-6">
            <h2 class="text-base font-semibold leading-7 text-gray-900">
              Contact Information
            </h2>
            <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
              Use tags to separate them later.
            </p>

            <ContactInfoForm @cancel="editing = false" @submit="addContact" />
          </div>
        </div>
      </div>
    </main>
  </DefaultLayout>
</template>
